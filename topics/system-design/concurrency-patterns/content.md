# Concurrency Patterns

## Overview

Concurrency patterns are battle-tested solutions for managing multiple tasks executing simultaneously. They help you write code that is fast, safe, and doesn't crash at 3 AM when two threads try to modify the same data.

Think of concurrency as a busy kitchen with multiple chefs. Without coordination, they'll bump into each other, grab the same ingredients, and create chaos. Concurrency patterns are the kitchen rules that keep everyone in sync.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 16px;">The Core Challenge</div>
  <div style="display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;">
    <div style="text-align: center;">
      <div style="background: #dbeafe; border-radius: 12px; padding: 16px 24px; border: 2px solid #3b82f6;">
        <div style="color: #1e40af; font-weight: 600;">Multiple Threads</div>
        <div style="color: #64748b; font-size: 13px;">Running simultaneously</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; color: #64748b; font-size: 24px;">+</div>
    <div style="text-align: center;">
      <div style="background: #fef3c7; border-radius: 12px; padding: 16px 24px; border: 2px solid #f59e0b;">
        <div style="color: #92400e; font-weight: 600;">Shared Resources</div>
        <div style="color: #64748b; font-size: 13px;">Data, connections, files</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; color: #64748b; font-size: 24px;">=</div>
    <div style="text-align: center;">
      <div style="background: #fee2e2; border-radius: 12px; padding: 16px 24px; border: 2px solid #ef4444;">
        <div style="color: #991b1b; font-weight: 600;">Potential Chaos</div>
        <div style="color: #64748b; font-size: 13px;">Race conditions, deadlocks</div>
      </div>
    </div>
  </div>
</div>

---

## Why This Matters

### Real Company Examples

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #bbf7d0;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
    <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #86efac;">
      <div style="color: #166534; font-weight: 700; font-size: 16px; margin-bottom: 8px;">Netflix</div>
      <div style="color: #334155; font-size: 14px;">Uses thread pools to handle millions of concurrent video streams. Each pool is tuned for specific workloads (API calls, encoding, recommendations).</div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #86efac;">
      <div style="color: #166534; font-weight: 700; font-size: 16px; margin-bottom: 8px;">Discord</div>
      <div style="color: #334155; font-size: 14px;">Handles 19 million concurrent users with lock-free data structures and message passing to avoid contention on chat updates.</div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #86efac;">
      <div style="color: #166534; font-weight: 700; font-size: 16px; margin-bottom: 8px;">Uber</div>
      <div style="color: #334155; font-size: 14px;">Uses read-write locks for location data: many drivers reading nearby riders, few writes when positions update.</div>
    </div>
  </div>
</div>

---

## Core Concepts

### The Restaurant Kitchen Analogy

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
    <div style="background: white; border-radius: 12px; padding: 16px; border-left: 4px solid #3b82f6;">
      <div style="color: #1e40af; font-weight: 600; margin-bottom: 4px;">Chef = Thread</div>
      <div style="color: #64748b; font-size: 13px;">Worker that executes tasks</div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 16px; border-left: 4px solid #8b5cf6;">
      <div style="color: #5b21b6; font-weight: 600; margin-bottom: 4px;">Order = Task</div>
      <div style="color: #64748b; font-size: 13px;">Work to be completed</div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 16px; border-left: 4px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 600; margin-bottom: 4px;">Oven = Shared Resource</div>
      <div style="color: #64748b; font-size: 13px;">Needs coordination to use</div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 16px; border-left: 4px solid #10b981;">
      <div style="color: #065f46; font-weight: 600; margin-bottom: 4px;">Kitchen Stations = Thread Pool</div>
      <div style="color: #64748b; font-size: 13px;">Fixed number of workers</div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 16px; border-left: 4px solid #ec4899;">
      <div style="color: #9d174d; font-weight: 600; margin-bottom: 4px;">Order Queue = Work Queue</div>
      <div style="color: #64748b; font-size: 13px;">Pending tasks waiting</div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 16px; border-left: 4px solid #06b6d4;">
      <div style="color: #0e7490; font-weight: 600; margin-bottom: 4px;">Lock = "Occupied" Sign</div>
      <div style="color: #64748b; font-size: 13px;">Only one at a time</div>
    </div>
  </div>
</div>

### The Three Deadly Problems

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #fecaca;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
    <div style="background: white; border-radius: 12px; padding: 20px; border: 2px solid #f87171;">
      <div style="color: #b91c1c; font-weight: 700; font-size: 16px; margin-bottom: 8px;">1. Race Condition</div>
      <div style="color: #334155; font-size: 14px; margin-bottom: 12px;">Two threads modify the same data simultaneously, causing corruption.</div>
      <div style="background: #fef2f2; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 12px; color: #991b1b;">
        Thread A: balance = 100<br/>
        Thread B: balance = 100<br/>
        Both: balance -= 50<br/>
        Result: 50 (should be 0!)
      </div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 20px; border: 2px solid #f87171;">
      <div style="color: #b91c1c; font-weight: 700; font-size: 16px; margin-bottom: 8px;">2. Deadlock</div>
      <div style="color: #334155; font-size: 14px; margin-bottom: 12px;">Threads wait forever for each other's resources.</div>
      <div style="background: #fef2f2; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 12px; color: #991b1b;">
        Thread A: holds Lock1, wants Lock2<br/>
        Thread B: holds Lock2, wants Lock1<br/>
        Both: waiting forever...
      </div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 20px; border: 2px solid #f87171;">
      <div style="color: #b91c1c; font-weight: 700; font-size: 16px; margin-bottom: 8px;">3. Starvation</div>
      <div style="color: #334155; font-size: 14px; margin-bottom: 12px;">Some threads never get a chance to run.</div>
      <div style="background: #fef2f2; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 12px; color: #991b1b;">
        High-priority threads: always running<br/>
        Low-priority thread: waiting...<br/>
        Still waiting... forever...
      </div>
    </div>
  </div>
</div>

---

## How It Works

### Pattern 1: Thread Pool

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <div style="text-align: center; color: #1e293b; font-size: 16px; font-weight: 600; margin-bottom: 20px;">Thread Pool: Reuse Workers Instead of Creating New Ones</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div style="background: #fee2e2; border-radius: 12px; padding: 20px; border: 2px solid #fca5a5;">
      <div style="color: #991b1b; font-weight: 600; margin-bottom: 12px;">Without Pool</div>
      <div style="font-family: monospace; font-size: 12px; color: #334155; line-height: 1.8;">
        Request 1 -> Create Thread -> Execute -> Destroy<br/>
        Request 2 -> Create Thread -> Execute -> Destroy<br/>
        Request 3 -> Create Thread -> Execute -> Destroy<br/>
      </div>
      <div style="margin-top: 12px; color: #991b1b; font-size: 13px; font-weight: 500;">Overhead: ~1ms per thread creation</div>
    </div>
    <div style="background: #dcfce7; border-radius: 12px; padding: 20px; border: 2px solid #86efac;">
      <div style="color: #166534; font-weight: 600; margin-bottom: 12px;">With Pool</div>
      <div style="font-family: monospace; font-size: 12px; color: #334155; line-height: 1.8;">
        Request 1 -> Borrow Thread -> Execute -> Return<br/>
        Request 2 -> Borrow Thread -> Execute -> Return<br/>
        Request 3 -> Borrow Thread -> Execute -> Return<br/>
      </div>
      <div style="margin-top: 12px; color: #166534; font-size: 13px; font-weight: 500;">Overhead: ~0ms (threads already exist)</div>
    </div>
  </div>
</div>

### Pattern 2: Producer-Consumer

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #bfdbfe;">
  <div style="text-align: center; color: #1e40af; font-size: 16px; font-weight: 600; margin-bottom: 20px;">Producers Create Work, Consumers Process It</div>
  <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
    <div style="background: #dbeafe; border-radius: 12px; padding: 16px; text-align: center; border: 2px solid #3b82f6;">
      <div style="color: #1e40af; font-weight: 600;">Producers</div>
      <div style="color: #64748b; font-size: 12px;">Generate tasks</div>
    </div>
    <div style="color: #3b82f6; font-size: 24px;">-></div>
    <div style="background: #fef3c7; border-radius: 12px; padding: 16px 32px; text-align: center; border: 2px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 600;">Queue</div>
      <div style="color: #64748b; font-size: 12px;">[Task][Task][Task]</div>
    </div>
    <div style="color: #3b82f6; font-size: 24px;">-></div>
    <div style="background: #dcfce7; border-radius: 12px; padding: 16px; text-align: center; border: 2px solid #22c55e;">
      <div style="color: #166534; font-weight: 600;">Consumers</div>
      <div style="color: #64748b; font-size: 12px;">Process tasks</div>
    </div>
  </div>
  <div style="margin-top: 16px; text-align: center; color: #334155; font-size: 13px;">
    Queue acts as a buffer - producers don't wait for consumers, consumers don't wait for producers
  </div>
</div>

### Pattern 3: Read-Write Lock

<div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e9d5ff;">
  <div style="text-align: center; color: #7c3aed; font-size: 16px; font-weight: 600; margin-bottom: 20px;">Multiple Readers OR Single Writer</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div style="background: white; border-radius: 12px; padding: 20px; border: 2px solid #a78bfa;">
      <div style="color: #5b21b6; font-weight: 600; margin-bottom: 12px;">Read Mode</div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <div style="background: #dbeafe; padding: 8px 12px; border-radius: 6px; color: #1e40af; font-size: 12px;">Reader 1</div>
        <div style="background: #dbeafe; padding: 8px 12px; border-radius: 6px; color: #1e40af; font-size: 12px;">Reader 2</div>
        <div style="background: #dbeafe; padding: 8px 12px; border-radius: 6px; color: #1e40af; font-size: 12px;">Reader 3</div>
      </div>
      <div style="margin-top: 8px; color: #64748b; font-size: 12px;">All readers can access simultaneously</div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 20px; border: 2px solid #a78bfa;">
      <div style="color: #5b21b6; font-weight: 600; margin-bottom: 12px;">Write Mode</div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <div style="background: #fef3c7; padding: 8px 12px; border-radius: 6px; color: #92400e; font-size: 12px;">Writer 1</div>
        <div style="background: #f1f5f9; padding: 8px 12px; border-radius: 6px; color: #94a3b8; font-size: 12px;">Blocked</div>
        <div style="background: #f1f5f9; padding: 8px 12px; border-radius: 6px; color: #94a3b8; font-size: 12px;">Blocked</div>
      </div>
      <div style="margin-top: 8px; color: #64748b; font-size: 12px;">Only one writer, everyone else waits</div>
    </div>
  </div>
</div>

---

## Real-Life Failure Story

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 2px solid #fca5a5;">
  <div style="color: #991b1b; font-weight: 700; font-size: 18px; margin-bottom: 16px;">The Knight Capital Disaster ($440 Million in 45 Minutes)</div>

  <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
    <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">What Happened:</div>
    <div style="color: #334155; font-size: 14px; line-height: 1.7;">
      On August 1, 2012, Knight Capital deployed new trading software. A race condition caused the system to execute millions of unintended trades. Old code was accidentally activated on one server, while new code ran on others. The inconsistency caused the system to buy high and sell low repeatedly.
    </div>
  </div>

  <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
    <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">The Concurrency Bug:</div>
    <div style="color: #334155; font-size: 14px; line-height: 1.7;">
      A feature flag was repurposed without removing old code. When the flag was set, some servers ran legacy "power peg" code that was never meant for production. The lack of proper synchronization between deployment and feature flags created a race condition that cascaded into disaster.
    </div>
  </div>

  <div style="background: #dcfce7; border-radius: 12px; padding: 16px; border: 1px solid #86efac;">
    <div style="color: #166534; font-weight: 600; margin-bottom: 4px;">The Lesson:</div>
    <div style="color: #334155; font-size: 14px;">Always ensure atomic deployments. Use proper feature flag management with kill switches. Test concurrent scenarios in staging that mirror production topology.</div>
  </div>
</div>

---

## What to Watch Out For

<div style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #fde68a;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
    <div style="background: white; border-radius: 12px; padding: 16px; border-left: 4px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Lock Granularity</div>
      <div style="color: #334155; font-size: 13px;">Too coarse = poor performance. Too fine = complex and bug-prone. Start coarse, optimize with metrics.</div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 16px; border-left: 4px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Hidden Shared State</div>
      <div style="color: #334155; font-size: 13px;">Static variables, singletons, global caches - all need synchronization you might forget.</div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 16px; border-left: 4px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Lock Ordering</div>
      <div style="color: #334155; font-size: 13px;">Always acquire locks in the same order everywhere. Document it. Enforce it in code review.</div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 16px; border-left: 4px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Testing Blindness</div>
      <div style="color: #334155; font-size: 13px;">Race conditions often don't appear in tests. Use thread sanitizers and stress tests with randomized timing.</div>
    </div>
  </div>
</div>

---

## Interview Deep Dive

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <div style="margin-bottom: 24px;">
    <div style="color: #1e40af; font-weight: 700; font-size: 15px; margin-bottom: 12px;">Q: How do you choose between threads, async/await, and multiprocessing?</div>
    <div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0;">
      <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px; color: #1e293b; font-weight: 600;">Threads</td>
          <td style="padding: 8px; color: #334155;">I/O-bound work (network, disk). Shared memory. Limited by GIL in Python.</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px; color: #1e293b; font-weight: 600;">Async/Await</td>
          <td style="padding: 8px; color: #334155;">Many concurrent I/O operations. Single thread, no parallelism. Great for high-concurrency servers.</td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #1e293b; font-weight: 600;">Multiprocessing</td>
          <td style="padding: 8px; color: #334155;">CPU-bound work. True parallelism. Higher memory overhead (separate memory spaces).</td>
        </tr>
      </table>
    </div>
  </div>

  <div style="margin-bottom: 24px;">
    <div style="color: #1e40af; font-weight: 700; font-size: 15px; margin-bottom: 12px;">Q: How many threads should a thread pool have?</div>
    <div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0; color: #334155; font-size: 14px;">
      <div style="margin-bottom: 8px;"><strong>CPU-bound:</strong> threads = number of CPU cores</div>
      <div style="margin-bottom: 8px;"><strong>I/O-bound:</strong> threads = CPU cores x (1 + wait_time / compute_time)</div>
      <div><strong>Mixed:</strong> Start with 2x CPU cores, then benchmark and adjust</div>
    </div>
  </div>

  <div>
    <div style="color: #1e40af; font-weight: 700; font-size: 15px; margin-bottom: 12px;">Q: How do you prevent deadlocks?</div>
    <div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0; color: #334155; font-size: 14px;">
      <div style="margin-bottom: 8px;"><strong>1. Lock ordering:</strong> Always acquire locks in consistent order (e.g., alphabetically by resource name)</div>
      <div style="margin-bottom: 8px;"><strong>2. Timeout:</strong> Use try-lock with timeout, back off and retry</div>
      <div style="margin-bottom: 8px;"><strong>3. Lock hierarchy:</strong> Assign levels to locks, only acquire lower-to-higher</div>
      <div><strong>4. Avoid holding locks:</strong> Keep critical sections small, don't call external code while holding locks</div>
    </div>
  </div>
</div>

---

## Code Implementation

### Thread Pool with Metrics

```python
import threading
import queue
import time
from dataclasses import dataclass, field
from typing import Callable, Any, Optional, List
from contextlib import contextmanager
import logging

logger = logging.getLogger(__name__)


@dataclass
class Task:
    """A unit of work for the thread pool."""
    func: Callable
    args: tuple = ()
    kwargs: dict = field(default_factory=dict)
    callback: Optional[Callable] = None
    error_callback: Optional[Callable] = None
    priority: int = 0  # Lower = higher priority
    created_at: float = field(default_factory=time.time)

    def __lt__(self, other):
        return self.priority < other.priority


class ThreadPool:
    """
    Production-ready thread pool with:
    - Priority queue support
    - Graceful shutdown
    - Metrics collection
    - Auto-scaling (min/max workers)
    """

    def __init__(
        self,
        name: str = "pool",
        min_workers: int = 2,
        max_workers: int = 10,
        queue_size: int = 1000
    ):
        self.name = name
        self.min_workers = min_workers
        self.max_workers = max_workers

        self.task_queue = queue.PriorityQueue(maxsize=queue_size)
        self.workers: List[threading.Thread] = []
        self._shutdown = threading.Event()
        self._lock = threading.Lock()

        # Metrics
        self.tasks_submitted = 0
        self.tasks_completed = 0
        self.tasks_failed = 0

        # Start minimum workers
        for _ in range(min_workers):
            self._start_worker()

    def _start_worker(self):
        """Start a new worker thread."""
        worker = threading.Thread(
            target=self._worker_loop,
            daemon=True,
            name=f"{self.name}-worker-{len(self.workers)}"
        )
        worker.start()
        self.workers.append(worker)

    def _worker_loop(self):
        """Main worker loop - fetch and execute tasks."""
        while not self._shutdown.is_set():
            try:
                # Block for 1 second, then check shutdown flag
                priority, task = self.task_queue.get(timeout=1.0)
            except queue.Empty:
                continue

            try:
                result = task.func(*task.args, **task.kwargs)
                self.tasks_completed += 1

                if task.callback:
                    task.callback(result)

            except Exception as e:
                self.tasks_failed += 1
                logger.error(f"Task failed: {e}")

                if task.error_callback:
                    task.error_callback(e)
            finally:
                self.task_queue.task_done()

    def submit(
        self,
        func: Callable,
        *args,
        priority: int = 0,
        callback: Callable = None,
        error_callback: Callable = None,
        **kwargs
    ) -> bool:
        """
        Submit a task to the pool.
        Returns True if queued, False if queue is full.
        """
        if self._shutdown.is_set():
            raise RuntimeError("Pool is shut down")

        task = Task(
            func=func,
            args=args,
            kwargs=kwargs,
            callback=callback,
            error_callback=error_callback,
            priority=priority
        )

        try:
            self.task_queue.put_nowait((priority, task))
            self.tasks_submitted += 1

            # Auto-scale if needed
            with self._lock:
                if (self.task_queue.qsize() > len(self.workers)
                    and len(self.workers) < self.max_workers):
                    self._start_worker()

            return True
        except queue.Full:
            return False

    def map(self, func: Callable, items: list, timeout: float = None) -> List[Any]:
        """Execute func for each item and collect results."""
        results = [None] * len(items)
        completed = threading.Event()
        remaining = [len(items)]
        lock = threading.Lock()

        def on_complete(idx, result):
            results[idx] = result
            with lock:
                remaining[0] -= 1
                if remaining[0] == 0:
                    completed.set()

        for i, item in enumerate(items):
            self.submit(
                func, item,
                callback=lambda r, i=i: on_complete(i, r)
            )

        completed.wait(timeout=timeout)
        return results

    def get_metrics(self) -> dict:
        """Return current pool metrics."""
        return {
            "workers": len(self.workers),
            "queue_size": self.task_queue.qsize(),
            "tasks_submitted": self.tasks_submitted,
            "tasks_completed": self.tasks_completed,
            "tasks_failed": self.tasks_failed,
        }

    def shutdown(self, wait: bool = True, timeout: float = 30.0):
        """Gracefully shut down the pool."""
        self._shutdown.set()

        if wait:
            deadline = time.time() + timeout
            for worker in self.workers:
                remaining = deadline - time.time()
                if remaining > 0:
                    worker.join(timeout=remaining)


# === Thread-Safe Counter ===

class SafeCounter:
    """Thread-safe counter using a lock."""

    def __init__(self):
        self._value = 0
        self._lock = threading.Lock()

    def increment(self) -> int:
        with self._lock:
            self._value += 1
            return self._value

    def get(self) -> int:
        with self._lock:
            return self._value


# === Read-Write Lock ===

class ReadWriteLock:
    """
    Allow multiple readers OR single writer.
    Writers have priority to prevent starvation.
    """

    def __init__(self):
        self._read_ready = threading.Condition(threading.Lock())
        self._readers = 0
        self._writers_waiting = 0
        self._writer_active = False

    @contextmanager
    def read_lock(self):
        """Acquire read lock (shared access)."""
        with self._read_ready:
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


# === Usage Example ===

if __name__ == "__main__":
    # Create thread pool
    pool = ThreadPool(name="demo", min_workers=4, max_workers=16)

    def process(x):
        time.sleep(0.1)  # Simulate work
        return x * 2

    # Submit tasks
    for i in range(20):
        pool.submit(process, i, callback=lambda r: print(f"Result: {r}"))

    time.sleep(3)
    print(pool.get_metrics())
    pool.shutdown()
```

---

## Quick Reference Card

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
    <div>
      <div style="color: #1e40af; font-weight: 700; margin-bottom: 12px; font-size: 15px;">Pattern Selection</div>
      <div style="background: white; border-radius: 8px; padding: 12px; font-size: 13px; color: #334155;">
        <div style="margin-bottom: 6px;"><strong>Thread Pool:</strong> Fixed number of tasks, reuse threads</div>
        <div style="margin-bottom: 6px;"><strong>Producer-Consumer:</strong> Decouple generation from processing</div>
        <div style="margin-bottom: 6px;"><strong>Read-Write Lock:</strong> Many readers, few writers</div>
        <div><strong>Mutex:</strong> Simple exclusive access</div>
      </div>
    </div>
    <div>
      <div style="color: #1e40af; font-weight: 700; margin-bottom: 12px; font-size: 15px;">Common Pitfalls</div>
      <div style="background: white; border-radius: 8px; padding: 12px; font-size: 13px; color: #334155;">
        <div style="margin-bottom: 6px;">Forgetting to release locks in error paths</div>
        <div style="margin-bottom: 6px;">Unbounded queues causing OOM</div>
        <div style="margin-bottom: 6px;">Nested locks without consistent ordering</div>
        <div>Shared mutable state in closures</div>
      </div>
    </div>
    <div>
      <div style="color: #1e40af; font-weight: 700; margin-bottom: 12px; font-size: 15px;">Thread Pool Sizing</div>
      <div style="background: white; border-radius: 8px; padding: 12px; font-size: 13px; color: #334155;">
        <div style="margin-bottom: 6px;"><strong>CPU-bound:</strong> N = CPU cores</div>
        <div style="margin-bottom: 6px;"><strong>I/O-bound:</strong> N = cores x (1 + W/C)</div>
        <div><strong>Mixed:</strong> Start at 2x cores, benchmark</div>
      </div>
    </div>
    <div>
      <div style="color: #1e40af; font-weight: 700; margin-bottom: 12px; font-size: 15px;">Deadlock Prevention</div>
      <div style="background: white; border-radius: 8px; padding: 12px; font-size: 13px; color: #334155;">
        <div style="margin-bottom: 6px;">1. Consistent lock ordering</div>
        <div style="margin-bottom: 6px;">2. Timeout on lock acquisition</div>
        <div style="margin-bottom: 6px;">3. Lock hierarchy levels</div>
        <div>4. Minimize lock scope</div>
      </div>
    </div>
  </div>
</div>

---

## Related Topics

- [Connection Pooling](/topic/system-design/connection-pooling)
- [Message Queues](/topic/system-design/message-queues)
- [Distributed Locking](/topic/system-design/distributed-locking)
