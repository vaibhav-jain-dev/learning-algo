# Task Scheduler

## Problem Statement

Design a task scheduler that executes tasks at specified times or intervals. Support one-time tasks, recurring tasks, and task dependencies.

## Requirements

- Schedule one-time tasks for future execution
- Support recurring tasks (cron-like)
- Handle task priorities
- Support task cancellation
- Thread-safe execution

---

## Solution Breakdown

### Part 1: Understanding the Core Challenge

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">
**The Key Challenge**: We need to efficiently:
1. **Store tasks** ordered by execution time (when should this run?)
2. **Execute tasks** at the right time without busy-waiting
3. **Handle priorities** when multiple tasks are due simultaneously
4. **Support recurring** tasks that reschedule themselves
**Why is this tricky?**
- Simple polling (check every second) wastes CPU
- Sleeping until next task ignores new high-priority tasks
- Thread-safety when multiple workers grab tasks
</div>

### Part 2: Task Lifecycle State Machine

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center; font-size: 16px;">Task State Transitions</h4>
<div style="display: flex; justify-content: center; align-items: center; gap: 16px; flex-wrap: wrap;">
<!-- PENDING State -->
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #ffa657 0%, #f78166 100%); padding: 16px 20px; border-radius: 12px;">
<div style="color: #fff; font-size: 20px;">⏳</div>
<div style="color: #fff; font-weight: bold; font-size: 12px;">PENDING</div>
</div>
<div style="color: #8b949e; font-size: 10px; margin-top: 4px;">In queue</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
<div style="color: #7ee787; font-size: 10px;">Time reached</div>
<div style="color: #7ee787; font-size: 20px;">→</div>
</div>
<!-- RUNNING State -->
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 16px 20px; border-radius: 12px;">
<div style="color: #fff; font-size: 20px;">⚡</div>
<div style="color: #fff; font-weight: bold; font-size: 12px;">RUNNING</div>
</div>
<div style="color: #8b949e; font-size: 10px; margin-top: 4px;">Executing</div>
</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="display: flex; align-items: center; gap: 4px;">
<div style="color: #7ee787; font-size: 20px;">→</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 8px 12px; border-radius: 8px;">
<div style="color: #fff; font-size: 10px;">✓ COMPLETED</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 4px;">
<div style="color: #f85149; font-size: 20px;">→</div>
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); padding: 8px 12px; border-radius: 8px;">
<div style="color: #fff; font-size: 10px;">✗ FAILED</div>
</div>
</div>
</div>
</div>
<!-- Cancel path -->
<div style="display: flex; justify-content: center; margin-top: 16px;">
<div style="background: #21262d; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="color: #ffa657; font-size: 11px;">PENDING → CANCELLED (on cancel() call)</div>
<div style="color: #a371f7; font-size: 11px; margin-top: 4px;">COMPLETED → PENDING (if recurring task)</div>
</div>
</div>
</div>

### Part 3: Why a Min-Heap for Scheduling?

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">
**Data Structure Comparison:**
| Structure | Get Next Task | Insert Task | Cancel Task |
|-----------|--------------|-------------|-------------|
| **Sorted List** | O(1) | O(n) | O(n) |
| **Min-Heap** | O(1) peek, O(log n) pop | O(log n) | O(n) |
| **Sorted Map** | O(log n) | O(log n) | O(log n) |
**Why Min-Heap wins:**
- We frequently need the **earliest** task (smallest timestamp) → peek is O(1)
- Tasks are inserted sporadically → O(log n) insert is acceptable
- Cancel is rare → O(n) is tolerable
- Python's `heapq` is highly optimized
**The Heap Ordering:**
```
Task comparison: (scheduled_time, -priority)
- First by time: earlier tasks float to top
- Then by priority: higher priority (lower -priority value) wins ties
```
</div>

### Part 4: Worker Thread Synchronization

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #a371f7; margin: 0 0 24px 0; text-align: center; font-size: 16px;">Condition Variable Pattern</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 12px;">Producer (schedule)</div>
<div style="color: #c9d1d9; font-size: 11px; font-family: monospace; line-height: 1.6;">
1. Acquire lock<br>
2. Add task to heap<br>
3. <span style="color: #ffa657;">condition.notify()</span><br>
4. Release lock
</div>
</div>
<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 13px; margin-bottom: 12px;">Consumer (worker)</div>
<div style="color: #c9d1d9; font-size: 11px; font-family: monospace; line-height: 1.6;">
1. Acquire lock<br>
2. <span style="color: #ffa657;">condition.wait(timeout)</span><br>
   &nbsp;&nbsp;- Sleeps until notified<br>
   &nbsp;&nbsp;- Or until timeout<br>
3. Pop task from heap<br>
4. Release lock, execute task
</div>
</div>
</div>
<div style="background: #238636; padding: 16px; border-radius: 8px; margin-top: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Why condition.wait(timeout)?</div>
<div style="color: #d1f5d3; font-size: 11px;">
• <strong>timeout = next_task.scheduled_time - now</strong>: Wakes exactly when task is due<br>
• <strong>notify()</strong>: Wakes worker if new urgent task arrives<br>
• No busy-waiting, no missed tasks, no wasted CPU
</div>
</div>
</div>

### Part 5: Recurring Task Rescheduling

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
**After a recurring task completes:**
```python
if task.recurrence == RecurrenceType.INTERVAL:
    task.scheduled_time = time.time() + task.interval
    task.status = TaskStatus.PENDING
    heapq.heappush(self.task_queue, task)  # Re-add to heap
```
**Key insight**: The same Task object is reused, just with:
- Updated `scheduled_time`
- Reset `status` to PENDING
- Pushed back onto the heap
This allows tracking total executions, cumulative results, etc.
</div>

---

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| `schedule()` | O(log n) | O(1) |
| `cancel()` | O(1) lookup + O(n) worst case for removal | O(1) |
| Get next task | O(log n) | O(1) |
| **Total Space** | - | O(n) tasks |

---

## Solution

### Python

```python
import heapq
import threading
import time
from dataclasses import dataclass, field
from typing import Callable, Optional, List, Dict
from enum import Enum
from datetime import datetime, timedelta
import uuid


class TaskStatus(Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class RecurrenceType(Enum):
    ONCE = "once"
    INTERVAL = "interval"  # Every N seconds
    DAILY = "daily"
    WEEKLY = "weekly"


@dataclass(order=True)
class Task:
    scheduled_time: float
    priority: int = field(compare=True)
    task_id: str = field(compare=False, default_factory=lambda: str(uuid.uuid4())[:8])
    name: str = field(compare=False, default="")
    func: Callable = field(compare=False, default=None)
    args: tuple = field(compare=False, default=())
    kwargs: dict = field(compare=False, default_factory=dict)
    recurrence: RecurrenceType = field(compare=False, default=RecurrenceType.ONCE)
    interval: float = field(compare=False, default=0)
    status: TaskStatus = field(compare=False, default=TaskStatus.PENDING)
    result: any = field(compare=False, default=None)
    error: str = field(compare=False, default=None)

    def __post_init__(self):
        # Lower number = higher priority (for min-heap)
        self.priority = -self.priority


class TaskScheduler:
    def __init__(self, num_workers: int = 4):
        self.task_queue: List[Task] = []  # Min-heap
        self.tasks: Dict[str, Task] = {}
        self.lock = threading.Lock()
        self.condition = threading.Condition(self.lock)
        self.running = False
        self.num_workers = num_workers
        self.workers: List[threading.Thread] = []

    def schedule(self, func: Callable, delay: float = 0,
                 priority: int = 0, name: str = "",
                 recurrence: RecurrenceType = RecurrenceType.ONCE,
                 interval: float = 0, *args, **kwargs) -> str:
        """Schedule a task for execution."""
        scheduled_time = time.time() + delay

        task = Task(
            scheduled_time=scheduled_time,
            priority=priority,
            name=name or func.__name__,
            func=func,
            args=args,
            kwargs=kwargs,
            recurrence=recurrence,
            interval=interval
        )

        with self.condition:
            heapq.heappush(self.task_queue, task)
            self.tasks[task.task_id] = task
            self.condition.notify()

        return task.task_id

    def schedule_at(self, func: Callable, run_at: datetime,
                    priority: int = 0, name: str = "", *args, **kwargs) -> str:
        """Schedule a task for a specific datetime."""
        delay = (run_at - datetime.now()).total_seconds()
        return self.schedule(func, delay, priority, name,
                           RecurrenceType.ONCE, 0, *args, **kwargs)

    def schedule_recurring(self, func: Callable, interval: float,
                          priority: int = 0, name: str = "",
                          start_delay: float = 0, *args, **kwargs) -> str:
        """Schedule a recurring task."""
        return self.schedule(func, start_delay, priority, name,
                           RecurrenceType.INTERVAL, interval, *args, **kwargs)

    def cancel(self, task_id: str) -> bool:
        """Cancel a scheduled task."""
        with self.lock:
            if task_id in self.tasks:
                task = self.tasks[task_id]
                if task.status == TaskStatus.PENDING:
                    task.status = TaskStatus.CANCELLED
                    return True
        return False

    def get_status(self, task_id: str) -> Optional[Dict]:
        """Get task status and details."""
        with self.lock:
            task = self.tasks.get(task_id)
            if task:
                return {
                    'task_id': task.task_id,
                    'name': task.name,
                    'status': task.status.value,
                    'scheduled_time': datetime.fromtimestamp(task.scheduled_time).isoformat(),
                    'result': task.result,
                    'error': task.error
                }
        return None

    def _worker(self):
        """Worker thread that executes tasks."""
        while self.running:
            task = None

            with self.condition:
                while self.running and (not self.task_queue or
                       self.task_queue[0].scheduled_time > time.time()):
                    if self.task_queue:
                        wait_time = self.task_queue[0].scheduled_time - time.time()
                        self.condition.wait(timeout=max(0, wait_time))
                    else:
                        self.condition.wait(timeout=1.0)

                if not self.running:
                    break

                if self.task_queue and self.task_queue[0].scheduled_time <= time.time():
                    task = heapq.heappop(self.task_queue)

            if task and task.status == TaskStatus.PENDING:
                self._execute_task(task)

    def _execute_task(self, task: Task):
        """Execute a single task."""
        task.status = TaskStatus.RUNNING

        try:
            result = task.func(*task.args, **task.kwargs)
            task.result = result
            task.status = TaskStatus.COMPLETED
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Task '{task.name}' completed: {result}")
        except Exception as e:
            task.error = str(e)
            task.status = TaskStatus.FAILED
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Task '{task.name}' failed: {e}")

        # Reschedule recurring tasks
        if task.recurrence == RecurrenceType.INTERVAL and task.status == TaskStatus.COMPLETED:
            self._reschedule_recurring(task)

    def _reschedule_recurring(self, task: Task):
        """Reschedule a recurring task."""
        new_task = Task(
            scheduled_time=time.time() + task.interval,
            priority=-task.priority,  # Restore original priority
            name=task.name,
            func=task.func,
            args=task.args,
            kwargs=task.kwargs,
            recurrence=task.recurrence,
            interval=task.interval
        )

        with self.condition:
            heapq.heappush(self.task_queue, new_task)
            self.tasks[new_task.task_id] = new_task
            self.condition.notify()

    def start(self):
        """Start the scheduler."""
        self.running = True
        for i in range(self.num_workers):
            worker = threading.Thread(target=self._worker, name=f"Worker-{i}")
            worker.daemon = True
            worker.start()
            self.workers.append(worker)
        print(f"Scheduler started with {self.num_workers} workers")

    def stop(self):
        """Stop the scheduler."""
        self.running = False
        with self.condition:
            self.condition.notify_all()
        for worker in self.workers:
            worker.join(timeout=2.0)
        print("Scheduler stopped")

    def pending_count(self) -> int:
        """Get count of pending tasks."""
        with self.lock:
            return sum(1 for t in self.tasks.values() if t.status == TaskStatus.PENDING)


# Usage
def send_email(to: str, subject: str):
    return f"Email sent to {to}: {subject}"

def process_data(data: list):
    return f"Processed {len(data)} items"

def heartbeat():
    return "alive"


scheduler = TaskScheduler(num_workers=2)
scheduler.start()

# Schedule one-time tasks
task1 = scheduler.schedule(send_email, delay=1, priority=10,
                          name="send_welcome_email",
                          to="user@example.com", subject="Welcome!")

task2 = scheduler.schedule(process_data, delay=2, priority=5,
                          name="batch_process",
                          data=[1, 2, 3, 4, 5])

# Schedule recurring task
task3 = scheduler.schedule_recurring(heartbeat, interval=3,
                                    name="heartbeat_check")

# Let tasks run
time.sleep(10)

# Check status
print(scheduler.get_status(task1))
print(scheduler.get_status(task2))

scheduler.stop()
```

### Go

```go
package main

import (
	"container/heap"
	"fmt"
	"sync"
	"time"
)

type TaskStatus string

const (
	StatusPending   TaskStatus = "pending"
	StatusRunning   TaskStatus = "running"
	StatusCompleted TaskStatus = "completed"
	StatusFailed    TaskStatus = "failed"
	StatusCancelled TaskStatus = "cancelled"
)

type Task struct {
	ID            string
	Name          string
	ScheduledTime time.Time
	Priority      int
	Func          func() (interface{}, error)
	Status        TaskStatus
	Result        interface{}
	Error         error
	Recurring     bool
	Interval      time.Duration
	index         int // for heap
}

type TaskQueue []*Task

func (pq TaskQueue) Len() int { return len(pq) }

func (pq TaskQueue) Less(i, j int) bool {
	if pq[i].ScheduledTime.Equal(pq[j].ScheduledTime) {
		return pq[i].Priority > pq[j].Priority
	}
	return pq[i].ScheduledTime.Before(pq[j].ScheduledTime)
}

func (pq TaskQueue) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].index = i
	pq[j].index = j
}

func (pq *TaskQueue) Push(x interface{}) {
	n := len(*pq)
	task := x.(*Task)
	task.index = n
	*pq = append(*pq, task)
}

func (pq *TaskQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	task := old[n-1]
	old[n-1] = nil
	task.index = -1
	*pq = old[0 : n-1]
	return task
}

type Scheduler struct {
	queue    TaskQueue
	tasks    map[string]*Task
	mu       sync.Mutex
	cond     *sync.Cond
	running  bool
	taskID   int
	wg       sync.WaitGroup
	workers  int
}

func NewScheduler(workers int) *Scheduler {
	s := &Scheduler{
		queue:   make(TaskQueue, 0),
		tasks:   make(map[string]*Task),
		workers: workers,
	}
	s.cond = sync.NewCond(&s.mu)
	heap.Init(&s.queue)
	return s
}

func (s *Scheduler) Schedule(name string, delay time.Duration, priority int,
	fn func() (interface{}, error)) string {
	return s.scheduleTask(name, delay, priority, fn, false, 0)
}

func (s *Scheduler) ScheduleRecurring(name string, interval time.Duration,
	priority int, fn func() (interface{}, error)) string {
	return s.scheduleTask(name, 0, priority, fn, true, interval)
}

func (s *Scheduler) scheduleTask(name string, delay time.Duration, priority int,
	fn func() (interface{}, error), recurring bool, interval time.Duration) string {

	s.mu.Lock()
	defer s.mu.Unlock()

	s.taskID++
	taskID := fmt.Sprintf("task-%d", s.taskID)

	task := &Task{
		ID:            taskID,
		Name:          name,
		ScheduledTime: time.Now().Add(delay),
		Priority:      priority,
		Func:          fn,
		Status:        StatusPending,
		Recurring:     recurring,
		Interval:      interval,
	}

	heap.Push(&s.queue, task)
	s.tasks[taskID] = task
	s.cond.Signal()

	return taskID
}

func (s *Scheduler) Cancel(taskID string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()

	if task, exists := s.tasks[taskID]; exists {
		if task.Status == StatusPending {
			task.Status = StatusCancelled
			return true
		}
	}
	return false
}

func (s *Scheduler) GetStatus(taskID string) *Task {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.tasks[taskID]
}

func (s *Scheduler) worker(id int) {
	defer s.wg.Done()

	for {
		s.mu.Lock()

		for s.running && (len(s.queue) == 0 ||
			s.queue[0].ScheduledTime.After(time.Now())) {

			if len(s.queue) > 0 {
				waitTime := time.Until(s.queue[0].ScheduledTime)
				if waitTime > 0 {
					// Wait with timeout
					timer := time.AfterFunc(waitTime, func() {
						s.cond.Signal()
					})
					s.cond.Wait()
					timer.Stop()
				}
			} else {
				s.cond.Wait()
			}

			if !s.running {
				s.mu.Unlock()
				return
			}
		}

		if !s.running {
			s.mu.Unlock()
			return
		}

		var task *Task
		if len(s.queue) > 0 && !s.queue[0].ScheduledTime.After(time.Now()) {
			task = heap.Pop(&s.queue).(*Task)
		}
		s.mu.Unlock()

		if task != nil && task.Status == StatusPending {
			s.executeTask(task)
		}
	}
}

func (s *Scheduler) executeTask(task *Task) {
	task.Status = StatusRunning

	result, err := task.Func()

	s.mu.Lock()
	if err != nil {
		task.Status = StatusFailed
		task.Error = err
		fmt.Printf("[%s] Task '%s' failed: %v\n",
			time.Now().Format("15:04:05"), task.Name, err)
	} else {
		task.Status = StatusCompleted
		task.Result = result
		fmt.Printf("[%s] Task '%s' completed: %v\n",
			time.Now().Format("15:04:05"), task.Name, result)
	}

	// Reschedule recurring tasks
	if task.Recurring && task.Status == StatusCompleted {
		newTask := &Task{
			ID:            fmt.Sprintf("%s-next", task.ID),
			Name:          task.Name,
			ScheduledTime: time.Now().Add(task.Interval),
			Priority:      task.Priority,
			Func:          task.Func,
			Status:        StatusPending,
			Recurring:     true,
			Interval:      task.Interval,
		}
		heap.Push(&s.queue, newTask)
		s.tasks[newTask.ID] = newTask
	}
	s.mu.Unlock()
}

func (s *Scheduler) Start() {
	s.mu.Lock()
	s.running = true
	s.mu.Unlock()

	for i := 0; i < s.workers; i++ {
		s.wg.Add(1)
		go s.worker(i)
	}
	fmt.Printf("Scheduler started with %d workers\n", s.workers)
}

func (s *Scheduler) Stop() {
	s.mu.Lock()
	s.running = false
	s.cond.Broadcast()
	s.mu.Unlock()

	s.wg.Wait()
	fmt.Println("Scheduler stopped")
}

func main() {
	scheduler := NewScheduler(2)
	scheduler.Start()

	// Schedule tasks
	scheduler.Schedule("send_email", time.Second, 10, func() (interface{}, error) {
		return "Email sent!", nil
	})

	scheduler.Schedule("process_data", 2*time.Second, 5, func() (interface{}, error) {
		return "Processed 100 items", nil
	})

	scheduler.ScheduleRecurring("heartbeat", 3*time.Second, 1, func() (interface{}, error) {
		return "alive", nil
	})

	time.Sleep(10 * time.Second)
	scheduler.Stop()
}
```

## Design Considerations

### Priority Queue Implementation

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 8px 0; text-align: center; font-size: 14px;">Task Queue (Min-Heap)</h4>
<div style="color: #8b949e; font-size: 11px; text-align: center; margin-bottom: 24px;">Ordered by scheduled_time, then priority</div>
<!-- Heap Structure -->
<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
<!-- Root Node -->
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 14px 20px; border-radius: 10px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 12px;">task1</div>
<div style="color: #d1f5d3; font-size: 10px;">10:00, p=5</div>
</div>
<!-- Connector Lines -->
<div style="display: flex; justify-content: center; gap: 60px;">
<div style="color: #30363d; font-size: 20px;">╱</div>
<div style="color: #30363d; font-size: 20px;">╲</div>
</div>
<!-- Child Nodes -->
<div style="display: flex; justify-content: center; gap: 24px;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 14px 20px; border-radius: 10px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 12px;">task2</div>
<div style="color: #a5d6ff; font-size: 10px;">10:01, p=3</div>
</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 14px 20px; border-radius: 10px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 12px;">task3</div>
<div style="color: #eddeff; font-size: 10px;">10:02, p=8</div>
</div>
</div>
</div>
<!-- Legend -->
<div style="display: flex; justify-content: center; gap: 16px; margin-top: 24px; flex-wrap: wrap;">
<div style="background: #21262d; padding: 8px 14px; border-radius: 6px;">
<span style="color: #7ee787; font-size: 10px;">Root = Next task to execute</span>
</div>
<div style="background: #21262d; padding: 8px 14px; border-radius: 6px;">
<span style="color: #ffa657; font-size: 10px;">p = priority (higher = more urgent)</span>
</div>
</div>
</div>

### Cron Expression Support

For production systems, consider supporting cron expressions:
- `0 0 * * *` - Daily at midnight
- `*/5 * * * *` - Every 5 minutes
- `0 9-17 * * MON-FRI` - Hourly during work hours

## Interview Tips

- Discuss thread-safety mechanisms
- Explain priority queue vs sorted list tradeoffs
- Consider distributed scheduling (e.g., with Redis/Zookeeper)
- Handle missed schedules gracefully
- Discuss idempotency for recurring tasks
