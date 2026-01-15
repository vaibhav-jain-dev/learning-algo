# Concurrency Patterns

## Overview

Concurrency patterns help manage multiple tasks executing simultaneously. Understanding these patterns is critical for writing scalable, deadlock-free, and race-condition-free code.

## The Intuitive Mental Model: Restaurant Kitchen

Think of concurrency like a restaurant kitchen:

```
Single-Threaded (One Chef):
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Order 1 → Prep → Cook → Plate → Done                           │
│                                  ↓                              │
│  Order 2 → Prep → Cook → Plate → Done                           │
│                                  ↓                              │
│  Order 3 → Prep → Cook → Plate → Done                           │
│                                                                 │
│  Total time: 30 minutes (10 min × 3)                            │
│  Problem: Orders wait in queue                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Multi-Threaded (Multiple Chefs):
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Chef 1: Order 1 → Prep → Cook → Plate → Done                   │
│  Chef 2: Order 2 → Prep → Cook → Plate → Done  (parallel!)      │
│  Chef 3: Order 3 → Prep → Cook → Plate → Done  (parallel!)      │
│                                                                 │
│  Total time: 10 minutes (all run simultaneously)                │
│                                                                 │
│  New problems:                                                  │
│  - Who uses the single oven? (Resource contention)              │
│  - Don't use the same knife simultaneously! (Race condition)    │
│  - Chef A waits for B's pan, B waits for A's knife (Deadlock)   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Mapping the Metaphor

| Kitchen | Concurrency | Purpose |
|---------|-------------|---------|
| Chef | Thread/Worker | Executor of work |
| Order | Task/Job | Work to be done |
| Kitchen station | Thread pool | Fixed number of workers |
| Shared oven | Shared resource | Needs synchronization |
| Recipe | Function | Instructions to execute |
| Order queue | Work queue | Pending tasks |
| Head chef | Scheduler | Assigns work |

---

## 20-Year Insight: What Experience Teaches

### What Junior Developers Think:
> "I'll just add threads to make it faster."

### What Senior Developers Know:
> "Concurrency makes code harder to reason about, test, and debug. The performance gain must justify the complexity cost. Often, the simplest concurrent code is no concurrent code at all—batch instead."

### The Deeper Truth:
After 20+ years of debugging production concurrency issues:
1. **Locks are the enemy** - The more locks, the more deadlocks
2. **Share nothing** - Isolated workers > shared state
3. **Message passing > shared memory** - Channels and queues are safer
4. **Concurrency bugs are Heisenbugs** - They disappear when you observe them

---

## Thread Pool Pattern

### Why Thread Pools?

```
Without pool (create/destroy threads):
┌─────────────────────────────────────────────────────────────────┐
│  Request 1 → Create Thread → Execute → Destroy Thread           │
│  Request 2 → Create Thread → Execute → Destroy Thread           │
│  Request 3 → Create Thread → Execute → Destroy Thread           │
│                                                                 │
│  Thread creation: ~1ms each                                     │
│  1000 requests = 1000ms of overhead!                            │
└─────────────────────────────────────────────────────────────────┘

With pool (reuse threads):
┌─────────────────────────────────────────────────────────────────┐
│  Pool: [Thread1, Thread2, Thread3, Thread4]                     │
│                                                                 │
│  Request 1 → Thread1 (from pool) → Execute → Return to pool     │
│  Request 2 → Thread2 (from pool) → Execute → Return to pool     │
│  Request 3 → Thread3 (from pool) → Execute → Return to pool     │
│                                                                 │
│  Thread creation: 0ms (already created)                         │
│  Overhead eliminated!                                           │
└─────────────────────────────────────────────────────────────────┘
```

### Python - Production Thread Pool

```python
import threading
import queue
import time
import logging
from concurrent.futures import ThreadPoolExecutor, Future
from dataclasses import dataclass, field
from typing import Callable, Any, Optional, List
from contextlib import contextmanager
import traceback

logger = logging.getLogger(__name__)


@dataclass
class Task:
    """A task to be executed by the thread pool."""
    func: Callable
    args: tuple = ()
    kwargs: dict = field(default_factory=dict)
    callback: Optional[Callable] = None
    error_callback: Optional[Callable] = None
    priority: int = 0
    created_at: float = field(default_factory=time.time)
    id: str = ""

    def __lt__(self, other):
        # For priority queue (lower = higher priority)
        return self.priority < other.priority


@dataclass
class PoolMetrics:
    """Thread pool metrics for monitoring."""
    tasks_submitted: int = 0
    tasks_completed: int = 0
    tasks_failed: int = 0
    active_threads: int = 0
    queue_size: int = 0
    avg_wait_time_ms: float = 0.0
    avg_execution_time_ms: float = 0.0


class ThreadPool:
    """
    Production-grade thread pool with:
    - Bounded queue (backpressure)
    - Priority support
    - Graceful shutdown
    - Comprehensive metrics
    - Error handling
    """

    def __init__(
        self,
        name: str,
        min_workers: int = 2,
        max_workers: int = 10,
        queue_size: int = 1000,
        idle_timeout: float = 60.0,
    ):
        self.name = name
        self.min_workers = min_workers
        self.max_workers = max_workers
        self.idle_timeout = idle_timeout

        # Use priority queue for task prioritization
        self.task_queue: queue.PriorityQueue = queue.PriorityQueue(maxsize=queue_size)

        self.workers: List[threading.Thread] = []
        self.active_count = 0
        self.metrics = PoolMetrics()

        self._lock = threading.Lock()
        self._shutdown = threading.Event()
        self._wait_times: List[float] = []
        self._exec_times: List[float] = []

        # Start minimum workers
        self._ensure_workers()

    def _ensure_workers(self):
        """Ensure minimum workers are running."""
        with self._lock:
            while len(self.workers) < self.min_workers:
                self._start_worker()

    def _start_worker(self):
        """Start a new worker thread."""
        worker = threading.Thread(
            target=self._worker_loop,
            name=f"{self.name}-worker-{len(self.workers)}",
            daemon=True,
        )
        worker.start()
        self.workers.append(worker)
        logger.debug(f"Started worker: {worker.name}")

    def _worker_loop(self):
        """Main worker loop."""
        while not self._shutdown.is_set():
            try:
                # Wait for task with timeout (allows checking shutdown)
                try:
                    priority, task = self.task_queue.get(timeout=1.0)
                except queue.Empty:
                    # Check if we should scale down
                    with self._lock:
                        if (len(self.workers) > self.min_workers and
                            self.active_count < len(self.workers) // 2):
                            # Remove self from workers list
                            self.workers = [w for w in self.workers
                                          if w is not threading.current_thread()]
                            return
                    continue

                # Execute task
                with self._lock:
                    self.active_count += 1
                    self.metrics.active_threads = self.active_count

                wait_time = time.time() - task.created_at
                self._wait_times.append(wait_time * 1000)

                start_time = time.time()
                try:
                    result = task.func(*task.args, **task.kwargs)
                    exec_time = (time.time() - start_time) * 1000
                    self._exec_times.append(exec_time)

                    self.metrics.tasks_completed += 1

                    if task.callback:
                        try:
                            task.callback(result)
                        except Exception as e:
                            logger.error(f"Callback error: {e}")

                except Exception as e:
                    self.metrics.tasks_failed += 1
                    logger.error(f"Task {task.id} failed: {e}\n{traceback.format_exc()}")

                    if task.error_callback:
                        try:
                            task.error_callback(e)
                        except Exception as cb_error:
                            logger.error(f"Error callback failed: {cb_error}")

                finally:
                    with self._lock:
                        self.active_count -= 1
                        self.metrics.active_threads = self.active_count

                    self.task_queue.task_done()
                    self._update_metrics()

            except Exception as e:
                logger.error(f"Worker error: {e}")

    def _update_metrics(self):
        """Update rolling metrics."""
        # Keep last 100 measurements
        if len(self._wait_times) > 100:
            self._wait_times = self._wait_times[-100:]
        if len(self._exec_times) > 100:
            self._exec_times = self._exec_times[-100:]

        if self._wait_times:
            self.metrics.avg_wait_time_ms = sum(self._wait_times) / len(self._wait_times)
        if self._exec_times:
            self.metrics.avg_execution_time_ms = sum(self._exec_times) / len(self._exec_times)

        self.metrics.queue_size = self.task_queue.qsize()

    def submit(
        self,
        func: Callable,
        *args,
        priority: int = 0,
        callback: Callable = None,
        error_callback: Callable = None,
        timeout: float = None,
        **kwargs,
    ) -> bool:
        """
        Submit a task to the pool.

        Returns True if task was queued, False if queue is full.
        """
        if self._shutdown.is_set():
            raise RuntimeError("Pool is shut down")

        task = Task(
            func=func,
            args=args,
            kwargs=kwargs,
            callback=callback,
            error_callback=error_callback,
            priority=priority,
            id=f"{self.name}-{self.metrics.tasks_submitted}",
        )

        try:
            self.task_queue.put((priority, task), timeout=timeout)
            self.metrics.tasks_submitted += 1

            # Scale up if needed
            with self._lock:
                if (self.task_queue.qsize() > len(self.workers) and
                    len(self.workers) < self.max_workers):
                    self._start_worker()

            return True

        except queue.Full:
            logger.warning(f"Pool {self.name}: Queue full, task rejected")
            return False

    def map(self, func: Callable, items: list, timeout: float = None) -> List[Any]:
        """Execute function for each item and collect results."""
        results = [None] * len(items)
        errors = [None] * len(items)
        completed = threading.Event()
        pending = [len(items)]
        lock = threading.Lock()

        def on_complete(idx, result):
            results[idx] = result
            with lock:
                pending[0] -= 1
                if pending[0] == 0:
                    completed.set()

        def on_error(idx, error):
            errors[idx] = error
            with lock:
                pending[0] -= 1
                if pending[0] == 0:
                    completed.set()

        for i, item in enumerate(items):
            self.submit(
                func,
                item,
                callback=lambda r, i=i: on_complete(i, r),
                error_callback=lambda e, i=i: on_error(i, e),
            )

        completed.wait(timeout=timeout)

        # Check for errors
        for i, error in enumerate(errors):
            if error:
                raise RuntimeError(f"Task {i} failed: {error}")

        return results

    def get_metrics(self) -> dict:
        """Get current pool metrics."""
        with self._lock:
            return {
                "name": self.name,
                "workers": len(self.workers),
                "active_threads": self.metrics.active_threads,
                "queue_size": self.task_queue.qsize(),
                "tasks_submitted": self.metrics.tasks_submitted,
                "tasks_completed": self.metrics.tasks_completed,
                "tasks_failed": self.metrics.tasks_failed,
                "avg_wait_time_ms": round(self.metrics.avg_wait_time_ms, 2),
                "avg_execution_time_ms": round(self.metrics.avg_execution_time_ms, 2),
            }

    def shutdown(self, wait: bool = True, timeout: float = 30.0):
        """Shutdown the pool."""
        logger.info(f"Shutting down pool {self.name}")
        self._shutdown.set()

        if wait:
            # Wait for queue to drain
            deadline = time.time() + timeout
            while not self.task_queue.empty() and time.time() < deadline:
                time.sleep(0.1)

            # Wait for workers
            for worker in self.workers:
                remaining = deadline - time.time()
                if remaining > 0:
                    worker.join(timeout=remaining)

        logger.info(f"Pool {self.name} shut down")


# ============ Usage Examples ============

# Create pool
pool = ThreadPool(
    name="worker-pool",
    min_workers=4,
    max_workers=16,
    queue_size=1000,
)

# Submit single task
def process_item(item):
    time.sleep(0.1)  # Simulate work
    return item * 2

pool.submit(process_item, 42, callback=print)

# Submit with priority (lower = higher priority)
pool.submit(process_item, 100, priority=0)  # High priority
pool.submit(process_item, 200, priority=10)  # Low priority

# Map over items
results = pool.map(process_item, [1, 2, 3, 4, 5])

# Shutdown
pool.shutdown(wait=True)
```

### Go - Worker Pool

```go
package workerpool

import (
	"context"
	"fmt"
	"sync"
	"sync/atomic"
	"time"
)

// Task represents a unit of work
type Task struct {
	ID       string
	Func     func() (interface{}, error)
	Callback func(interface{}, error)
	Priority int
	Created  time.Time
}

// Metrics holds pool metrics
type Metrics struct {
	TasksSubmitted int64
	TasksCompleted int64
	TasksFailed    int64
	ActiveWorkers  int64
	QueueSize      int64
}

// Pool is a worker pool
type Pool struct {
	name       string
	minWorkers int
	maxWorkers int
	tasks      chan *Task
	metrics    Metrics
	wg         sync.WaitGroup
	ctx        context.Context
	cancel     context.CancelFunc
	mu         sync.Mutex
	workers    int32
}

// New creates a new worker pool
func New(name string, minWorkers, maxWorkers, queueSize int) *Pool {
	ctx, cancel := context.WithCancel(context.Background())

	p := &Pool{
		name:       name,
		minWorkers: minWorkers,
		maxWorkers: maxWorkers,
		tasks:      make(chan *Task, queueSize),
		ctx:        ctx,
		cancel:     cancel,
	}

	// Start minimum workers
	for i := 0; i < minWorkers; i++ {
		p.startWorker()
	}

	return p
}

func (p *Pool) startWorker() {
	atomic.AddInt32(&p.workers, 1)
	p.wg.Add(1)

	go func() {
		defer p.wg.Done()
		defer atomic.AddInt32(&p.workers, -1)

		for {
			select {
			case <-p.ctx.Done():
				return
			case task, ok := <-p.tasks:
				if !ok {
					return
				}
				p.executeTask(task)
			}
		}
	}()
}

func (p *Pool) executeTask(task *Task) {
	atomic.AddInt64(&p.metrics.ActiveWorkers, 1)
	defer atomic.AddInt64(&p.metrics.ActiveWorkers, -1)

	result, err := task.Func()

	if err != nil {
		atomic.AddInt64(&p.metrics.TasksFailed, 1)
	} else {
		atomic.AddInt64(&p.metrics.TasksCompleted, 1)
	}

	if task.Callback != nil {
		task.Callback(result, err)
	}
}

// Submit adds a task to the pool
func (p *Pool) Submit(task *Task) error {
	select {
	case <-p.ctx.Done():
		return fmt.Errorf("pool is shut down")
	default:
	}

	task.Created = time.Now()
	atomic.AddInt64(&p.metrics.TasksSubmitted, 1)

	// Try to scale up if queue is growing
	queueLen := len(p.tasks)
	workers := atomic.LoadInt32(&p.workers)
	if queueLen > int(workers) && int(workers) < p.maxWorkers {
		p.startWorker()
	}

	select {
	case p.tasks <- task:
		return nil
	default:
		return fmt.Errorf("queue is full")
	}
}

// SubmitFunc is a convenience method
func (p *Pool) SubmitFunc(fn func() (interface{}, error)) error {
	return p.Submit(&Task{Func: fn})
}

// GetMetrics returns current metrics
func (p *Pool) GetMetrics() Metrics {
	return Metrics{
		TasksSubmitted: atomic.LoadInt64(&p.metrics.TasksSubmitted),
		TasksCompleted: atomic.LoadInt64(&p.metrics.TasksCompleted),
		TasksFailed:    atomic.LoadInt64(&p.metrics.TasksFailed),
		ActiveWorkers:  atomic.LoadInt64(&p.metrics.ActiveWorkers),
		QueueSize:      int64(len(p.tasks)),
	}
}

// Shutdown gracefully shuts down the pool
func (p *Pool) Shutdown(timeout time.Duration) {
	p.cancel()
	close(p.tasks)

	done := make(chan struct{})
	go func() {
		p.wg.Wait()
		close(done)
	}()

	select {
	case <-done:
	case <-time.After(timeout):
		fmt.Println("Pool shutdown timed out")
	}
}
```

---

## Race Conditions

### What is a Race Condition?

```
Thread A                   Thread B                 Counter
───────                   ────────                 ───────
Read counter (= 0)                                    0
                          Read counter (= 0)          0
Increment (local = 1)                                 0
                          Increment (local = 1)       0
Write counter (= 1)                                   1
                          Write counter (= 1)         1

Expected: 2
Actual: 1  ← RACE CONDITION!
```

### Fixing Race Conditions

```python
import threading
from threading import Lock
from dataclasses import dataclass


# BAD: Race condition
class UnsafeCounter:
    def __init__(self):
        self.count = 0

    def increment(self):
        # Not atomic! Read + Increment + Write
        self.count += 1


# GOOD: Thread-safe with lock
class SafeCounter:
    def __init__(self):
        self.count = 0
        self._lock = Lock()

    def increment(self):
        with self._lock:
            self.count += 1

    def get(self) -> int:
        with self._lock:
            return self.count


# BETTER: Use atomic operations where possible
import threading

class AtomicCounter:
    """Counter using atomic operations (Python 3.12+)."""

    def __init__(self):
        self._count = 0
        self._lock = threading.Lock()

    def increment(self) -> int:
        with self._lock:
            self._count += 1
            return self._count


# Test for race conditions
def test_counter(counter_class, iterations: int = 10000, threads: int = 10):
    counter = counter_class()

    def worker():
        for _ in range(iterations):
            counter.increment()

    thread_list = [threading.Thread(target=worker) for _ in range(threads)]
    for t in thread_list:
        t.start()
    for t in thread_list:
        t.join()

    expected = iterations * threads
    actual = counter.count if hasattr(counter, 'count') else counter.get()
    print(f"{counter_class.__name__}: Expected {expected}, Got {actual}, "
          f"{'PASS' if expected == actual else 'FAIL'}")


# UnsafeCounter will fail, SafeCounter will pass
```

### Common Race Condition Patterns

```python
# Pattern 1: Check-then-act
# BAD
if key not in cache:      # Thread A checks
    cache[key] = compute()  # Thread B also checks before A writes
# Both threads compute!

# GOOD
with lock:
    if key not in cache:
        cache[key] = compute()


# Pattern 2: Read-modify-write
# BAD
balance = get_balance()    # Thread A reads 100
balance -= 50              # Thread B also reads 100
save_balance(balance)      # Both write 50, but should be 0

# GOOD
with lock:
    balance = get_balance()
    balance -= 50
    save_balance(balance)


# Pattern 3: Lazy initialization
# BAD
class Singleton:
    _instance = None

    @classmethod
    def get(cls):
        if cls._instance is None:  # Race: both threads see None
            cls._instance = cls()
        return cls._instance

# GOOD
class Singleton:
    _instance = None
    _lock = Lock()

    @classmethod
    def get(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:  # Double-checked locking
                    cls._instance = cls()
        return cls._instance
```

---

## Deadlocks

### What is a Deadlock?

```
Thread A                    Thread B
────────                    ────────
Acquires Lock 1
                            Acquires Lock 2
Waits for Lock 2 ←────────────────→ Waits for Lock 1
        ↓                           ↓
     BLOCKED                     BLOCKED

Both threads wait forever = DEADLOCK
```

### The Four Conditions for Deadlock

1. **Mutual Exclusion**: Resources can't be shared
2. **Hold and Wait**: Holding one resource while waiting for another
3. **No Preemption**: Can't forcibly take resources
4. **Circular Wait**: A → B → C → A chain of waiting

### Preventing Deadlocks

```python
import threading
from contextlib import contextmanager
from typing import List


# Strategy 1: Lock ordering (prevent circular wait)
class OrderedLocks:
    """Always acquire locks in consistent order."""

    def __init__(self):
        self.lock_a = threading.Lock()
        self.lock_b = threading.Lock()

    @contextmanager
    def acquire_both(self):
        # Always acquire in alphabetical order
        with self.lock_a:
            with self.lock_b:
                yield


# Strategy 2: Try-lock with timeout
class TimeoutLocks:
    """Use timeouts to detect potential deadlocks."""

    def __init__(self):
        self.lock_a = threading.Lock()
        self.lock_b = threading.Lock()

    def acquire_both(self, timeout: float = 5.0) -> bool:
        deadline = time.time() + timeout

        while time.time() < deadline:
            if self.lock_a.acquire(timeout=0.1):
                try:
                    if self.lock_b.acquire(timeout=0.1):
                        return True
                    # Couldn't get B, release A and retry
                finally:
                    if not self.lock_b.locked():
                        self.lock_a.release()

            time.sleep(0.01)  # Small delay before retry

        return False  # Timeout - potential deadlock detected


# Strategy 3: Lock hierarchy
class HierarchicalLock:
    """Enforce lock acquisition order via hierarchy."""

    _lock_order = {}
    _thread_locks = threading.local()

    def __init__(self, name: str, level: int):
        self.name = name
        self.level = level
        self._lock = threading.Lock()
        HierarchicalLock._lock_order[name] = level

    def acquire(self):
        if not hasattr(self._thread_locks, 'held'):
            self._thread_locks.held = []

        # Check hierarchy
        for held_lock in self._thread_locks.held:
            if held_lock.level >= self.level:
                raise RuntimeError(
                    f"Lock hierarchy violation: {held_lock.name} "
                    f"(level {held_lock.level}) held while acquiring "
                    f"{self.name} (level {self.level})"
                )

        self._lock.acquire()
        self._thread_locks.held.append(self)

    def release(self):
        self._lock.release()
        self._thread_locks.held.remove(self)


# Usage
db_lock = HierarchicalLock("database", level=1)
cache_lock = HierarchicalLock("cache", level=2)

# This works (lower to higher)
db_lock.acquire()
cache_lock.acquire()
cache_lock.release()
db_lock.release()

# This raises exception (higher to lower)
# cache_lock.acquire()
# db_lock.acquire()  # RuntimeError!
```

### Deadlock Detection

```python
import threading
import time
from typing import Dict, Set


class DeadlockDetector:
    """Detect potential deadlocks by tracking lock ownership."""

    def __init__(self):
        self._owners: Dict[int, Set[str]] = {}  # thread_id -> held locks
        self._waiters: Dict[int, str] = {}  # thread_id -> waiting for lock
        self._lock = threading.Lock()

    def acquired(self, lock_name: str):
        thread_id = threading.current_thread().ident
        with self._lock:
            if thread_id not in self._owners:
                self._owners[thread_id] = set()
            self._owners[thread_id].add(lock_name)
            if thread_id in self._waiters:
                del self._waiters[thread_id]

    def released(self, lock_name: str):
        thread_id = threading.current_thread().ident
        with self._lock:
            if thread_id in self._owners:
                self._owners[thread_id].discard(lock_name)

    def waiting_for(self, lock_name: str):
        thread_id = threading.current_thread().ident
        with self._lock:
            self._waiters[thread_id] = lock_name
            self._check_deadlock()

    def _check_deadlock(self):
        """Check for circular wait conditions."""
        # Build wait graph
        # If cycle exists, we have a deadlock
        # This is a simplified check
        for waiter_id, wanted_lock in self._waiters.items():
            # Find who holds the wanted lock
            for holder_id, held_locks in self._owners.items():
                if wanted_lock in held_locks:
                    # Check if holder is waiting for something we hold
                    if holder_id in self._waiters:
                        holder_wants = self._waiters[holder_id]
                        if waiter_id in self._owners:
                            if holder_wants in self._owners[waiter_id]:
                                print(f"DEADLOCK DETECTED!")
                                print(f"Thread {waiter_id} holds locks "
                                      f"{self._owners[waiter_id]} and wants {wanted_lock}")
                                print(f"Thread {holder_id} holds locks "
                                      f"{held_locks} and wants {holder_wants}")


# Monitored lock wrapper
class MonitoredLock:
    detector = DeadlockDetector()

    def __init__(self, name: str):
        self.name = name
        self._lock = threading.Lock()

    def acquire(self, timeout: float = -1):
        MonitoredLock.detector.waiting_for(self.name)
        result = self._lock.acquire(timeout=timeout if timeout >= 0 else None)
        if result:
            MonitoredLock.detector.acquired(self.name)
        return result

    def release(self):
        self._lock.release()
        MonitoredLock.detector.released(self.name)

    def __enter__(self):
        self.acquire()
        return self

    def __exit__(self, *args):
        self.release()
```

---

## Producer-Consumer Pattern

```python
import threading
import queue
import time
from typing import Any, Callable, Optional


class ProducerConsumer:
    """
    Classic producer-consumer pattern with bounded buffer.
    """

    def __init__(self, buffer_size: int = 100, num_consumers: int = 4):
        self.buffer = queue.Queue(maxsize=buffer_size)
        self.num_consumers = num_consumers
        self.consumers: list = []
        self._shutdown = threading.Event()

    def start(self, handler: Callable[[Any], None]):
        """Start consumer threads."""
        for i in range(self.num_consumers):
            t = threading.Thread(
                target=self._consumer_loop,
                args=(handler,),
                name=f"consumer-{i}",
                daemon=True,
            )
            t.start()
            self.consumers.append(t)

    def _consumer_loop(self, handler: Callable):
        while not self._shutdown.is_set():
            try:
                item = self.buffer.get(timeout=1.0)
                try:
                    handler(item)
                except Exception as e:
                    print(f"Handler error: {e}")
                finally:
                    self.buffer.task_done()
            except queue.Empty:
                continue

    def produce(self, item: Any, timeout: float = None) -> bool:
        """Add item to buffer. Returns False if buffer is full."""
        try:
            self.buffer.put(item, timeout=timeout)
            return True
        except queue.Full:
            return False

    def wait_completion(self):
        """Wait for all items to be processed."""
        self.buffer.join()

    def shutdown(self, wait: bool = True):
        """Shutdown consumers."""
        self._shutdown.set()
        if wait:
            for c in self.consumers:
                c.join(timeout=5.0)


# Usage
def process_item(item):
    print(f"Processing: {item}")
    time.sleep(0.1)

pc = ProducerConsumer(buffer_size=50, num_consumers=4)
pc.start(process_item)

# Produce items
for i in range(100):
    pc.produce(i)

# Wait for completion
pc.wait_completion()
pc.shutdown()
```

---

## Read-Write Lock Pattern

```python
import threading
from contextlib import contextmanager


class ReadWriteLock:
    """
    Allow multiple readers OR single writer.

    Useful when reads are much more common than writes.
    """

    def __init__(self):
        self._read_ready = threading.Condition(threading.Lock())
        self._readers = 0
        self._writers_waiting = 0
        self._writer_active = False

    @contextmanager
    def read_lock(self):
        """Acquire read lock (allows concurrent reads)."""
        with self._read_ready:
            # Wait if writer is active or waiting
            while self._writer_active or self._writers_waiting > 0:
                self._read_ready.wait()
            self._readers += 1

        try:
            yield
        finally:
            with self._read_ready:
                self._readers -= 1
                if self._readers == 0:
                    self._read_ready.notify_all()

    @contextmanager
    def write_lock(self):
        """Acquire write lock (exclusive access)."""
        with self._read_ready:
            self._writers_waiting += 1
            try:
                while self._readers > 0 or self._writer_active:
                    self._read_ready.wait()
                self._writer_active = True
            finally:
                self._writers_waiting -= 1

        try:
            yield
        finally:
            with self._read_ready:
                self._writer_active = False
                self._read_ready.notify_all()


# Usage
class ThreadSafeCache:
    def __init__(self):
        self._data = {}
        self._lock = ReadWriteLock()

    def get(self, key: str) -> Any:
        with self._lock.read_lock():
            return self._data.get(key)

    def set(self, key: str, value: Any):
        with self._lock.write_lock():
            self._data[key] = value

    def get_many(self, keys: list) -> dict:
        with self._lock.read_lock():
            return {k: self._data.get(k) for k in keys}
```

---

## Production War Stories

### War Story 1: The Silent Corruption

**The Scenario**:
User balance updates in a fintech app. Multiple services could update balance.

**What Happened**:
```python
# The bug
def transfer(from_user, to_user, amount):
    from_balance = get_balance(from_user)
    to_balance = get_balance(to_user)

    if from_balance >= amount:
        set_balance(from_user, from_balance - amount)
        set_balance(to_user, to_balance + amount)
```

Two simultaneous transfers created money out of thin air due to race condition.

**The Fix**:
```python
def transfer(from_user, to_user, amount):
    # Order locks to prevent deadlock
    users = sorted([from_user, to_user])

    with user_lock(users[0]):
        with user_lock(users[1]):
            from_balance = get_balance(from_user)
            to_balance = get_balance(to_user)

            if from_balance >= amount:
                set_balance(from_user, from_balance - amount)
                set_balance(to_user, to_balance + amount)
```

**20-Year Lesson**: Financial operations need serializable transactions. Never trust read-then-write patterns.

---

### War Story 2: The Memory Leak Thread Pool

**The Scenario**:
Thread pool for processing background jobs. Pool size was 100 threads.

**What Happened**:
1. Jobs took 1-5 seconds each
2. Traffic spike: 10,000 jobs/second
3. Jobs queued up (unbounded queue)
4. Queue grew to 1 million items
5. OOM crash

**The Fix**:
```python
# Use bounded queue with backpressure
pool = ThreadPool(
    max_workers=100,
    queue_size=1000,  # BOUNDED!
)

# Callers must handle rejection
if not pool.submit(job):
    # Queue full - apply backpressure
    return {"status": "busy", "retry_after": 60}
```

**20-Year Lesson**: Unbounded queues are memory leaks waiting to happen. Always bound your queues.

---

### War Story 3: The Deadlock That Only Happened on Tuesdays

**The Scenario**:
Weekly report generation deadlocked, but only on Tuesdays.

**What Happened**:
1. Report A locked resource 1, then resource 2
2. Report B locked resource 2, then resource 1
3. On Tuesdays, both reports ran at the same time (cron collision)
4. Classic deadlock

**The Fix**:
```python
# Enforce consistent lock ordering
def generate_reports():
    # Always lock in alphabetical order
    resources = sorted(['resource_1', 'resource_2'])

    with acquire_locks(resources):
        generate_report_a()
        generate_report_b()
```

**20-Year Lesson**: Deadlocks often depend on timing. They hide in production until conditions align.

---

## Expert FAQs

### Q: Threads vs Async/Await vs Multiprocessing?

**A**:
| Approach | Best For | Limitation |
|----------|----------|------------|
| Threads | I/O-bound (network, disk) | GIL in Python |
| Async/Await | Many concurrent I/O ops | No CPU parallelism |
| Multiprocessing | CPU-bound | Memory overhead |

```python
# I/O-bound: Use threads or async
import asyncio

async def fetch_all(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [session.get(url) for url in urls]
        return await asyncio.gather(*tasks)

# CPU-bound: Use multiprocessing
from multiprocessing import Pool

def process_all(items):
    with Pool(processes=8) as pool:
        return pool.map(cpu_intensive_function, items)
```

### Q: How many threads should my pool have?

**A**:
- **CPU-bound work**: threads = CPU cores
- **I/O-bound work**: threads = CPU cores × (1 + wait_time/compute_time)
- **Mixed work**: Start with 2 × CPU cores, benchmark

```python
import os

cpu_count = os.cpu_count()

# CPU-bound
cpu_pool = ThreadPool(max_workers=cpu_count)

# I/O-bound (assume 90% wait, 10% compute)
io_pool = ThreadPool(max_workers=cpu_count * 10)

# Mixed (start conservative)
mixed_pool = ThreadPool(max_workers=cpu_count * 2)
```

### Q: How do I test concurrent code?

**A**:
```python
import threading
import random
import time


def stress_test_concurrent(func, args_list, num_threads=100, iterations=1000):
    """Stress test for race conditions."""
    errors = []

    def worker():
        for _ in range(iterations):
            args = random.choice(args_list)
            try:
                func(*args)
            except Exception as e:
                errors.append(e)

    threads = [threading.Thread(target=worker) for _ in range(num_threads)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()

    return errors


# Test thread-safe counter
counter = SafeCounter()
errors = stress_test_concurrent(
    counter.increment,
    [()],  # No args
    num_threads=50,
    iterations=1000,
)

expected = 50 * 1000
actual = counter.get()
print(f"Expected: {expected}, Actual: {actual}")
```

### Q: When should I use locks vs lock-free data structures?

**A**:
- **Use locks when**: Simple, low contention, correctness matters most
- **Use lock-free when**: High contention, performance critical, expert implementer

```python
# Lock-free counter using atomic operations (simplified)
from threading import Lock


class LockFreeCounter:
    """
    Note: Python doesn't have true atomic operations,
    this is illustrative. Use `threading.Lock` in practice.
    """

    def __init__(self):
        self._value = 0
        self._lock = Lock()  # In practice, still need this in Python

    def increment(self):
        # In languages with CAS (Compare-and-Swap), this would be:
        # while True:
        #     old = self._value
        #     new = old + 1
        #     if CAS(self._value, old, new):
        #         break
        with self._lock:
            self._value += 1
```

---

## Related Topics

- [Thread Pool Pattern](/topic/design-patterns/thread-pool)
- [Producer-Consumer](/topic/design-patterns/producer-consumer)
- [Distributed Locking](/topic/system-design/distributed-locking)
- [Message Queues](/topic/system-design/message-queues)
