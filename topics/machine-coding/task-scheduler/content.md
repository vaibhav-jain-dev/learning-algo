# Task Scheduler

## Problem Statement

Design a task scheduler that executes tasks at specified times or intervals. Support one-time tasks, recurring tasks with cron expressions, distributed execution across multiple nodes, failure recovery, and idempotent operations.

---

## Core Concepts Deep Dive

### 1. Priority Queue Internals

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

**Why Priority Queues are Fundamental to Scheduling**

A task scheduler's primary operation is answering: "What task should run next?" This requires constant access to the minimum element (earliest scheduled time), making [[priority-queues]](/data-structures/priority-queue) the natural choice.

**Internal Mechanism: Binary Heap**

The min-heap maintains the **heap invariant**: every parent node has a smaller (or equal) key than its children. For task scheduling, the key is a composite: `(scheduled_time, -priority, insertion_order)`.

**Why Three Components?**
1. **scheduled_time**: Primary ordering - earlier tasks execute first
2. **-priority**: Tie-breaker - higher priority wins when times match (negated for min-heap)
3. **insertion_order**: Stability - FIFO for identical time+priority (prevents starvation)

</div>

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 16px;">Heap Operations Visualized</h4>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 12px;">Insert (Push)</div>
<div style="color: #c9d1d9; font-size: 11px; line-height: 1.8;">
1. Add element at end<br>
2. <span style="color: #ffa657;">Bubble-up</span>: swap with parent while smaller<br>
3. Stop when heap invariant restored
</div>
<div style="color: #8b949e; font-size: 10px; margin-top: 8px;">Time: O(log n)</div>
</div>

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #f85149; font-weight: bold; font-size: 13px; margin-bottom: 12px;">Extract-Min (Pop)</div>
<div style="color: #c9d1d9; font-size: 11px; line-height: 1.8;">
1. Remove root (min element)<br>
2. Move last element to root<br>
3. <span style="color: #ffa657;">Bubble-down</span>: swap with smaller child
</div>
<div style="color: #8b949e; font-size: 10px; margin-top: 8px;">Time: O(log n)</div>
</div>

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #a371f7; font-weight: bold; font-size: 13px; margin-bottom: 12px;">Peek</div>
<div style="color: #c9d1d9; font-size: 11px; line-height: 1.8;">
1. Return root element<br>
2. No modification needed<br>
3. Heap unchanged
</div>
<div style="color: #8b949e; font-size: 10px; margin-top: 8px;">Time: O(1)</div>
</div>

</div>

<div style="background: #161b22; padding: 16px; border-radius: 8px; margin-top: 16px;">
<div style="color: #ffa657; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Critical Insight: Decrease-Key Problem</div>
<div style="color: #c9d1d9; font-size: 11px;">
Standard binary heaps lack efficient decrease-key (needed for task rescheduling). Solutions:
<ul style="margin: 8px 0 0 16px; padding: 0;">
<li><strong>Lazy deletion</strong>: Mark old entry invalid, insert new one. O(1) update but O(n) space waste</li>
<li><strong>Index tracking</strong>: Maintain position map. O(log n) update with O(n) extra space</li>
<li><strong>Fibonacci heap</strong>: O(1) amortized decrease-key but complex implementation</li>
</ul>
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">

**Assumption**: Tasks arrive independently and uniformly over time.

**Trade-off Analysis: Data Structure Selection**

| Structure | Peek | Insert | Delete | Decrease-Key | Use Case |
|-----------|------|--------|--------|--------------|----------|
| Binary Heap | O(1) | O(log n) | O(n)* | O(n) | General purpose |
| Indexed Heap | O(1) | O(log n) | O(log n) | O(log n) | Frequent updates |
| Skip List | O(1) | O(log n) | O(log n) | O(log n) | Concurrent access |
| Timing Wheel | O(1) | O(1) | O(1) | O(1) | Fixed granularity |

*Delete requires finding the element first

**Design Choice**: For most schedulers, a binary heap with lazy deletion provides the best simplicity-to-performance ratio. Use timing wheels when you have millions of tasks with second-level granularity (like network timeouts).

</div>

#### Interview Questions: Priority Queue

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

**Level 1**: Why use a min-heap instead of a sorted array for task scheduling?

<details>
<summary style="color: #a371f7; cursor: pointer;">Answer</summary>

Sorted arrays have O(n) insertion (shifting elements) but O(1) removal of minimum. Min-heaps have O(log n) for both. Since schedulers frequently insert new tasks, the heap's balanced performance wins. With 10,000 tasks, heap insertion takes ~13 comparisons vs 5,000 average shifts for sorted arrays.

</details>

**Level 2**: How would you handle efficient task cancellation in a heap-based scheduler?

<details>
<summary style="color: #a371f7; cursor: pointer;">Answer</summary>

Three approaches:
1. **Lazy deletion**: Mark task as cancelled, skip during extraction. Pros: O(1) cancel. Cons: Memory bloat, requires periodic cleanup.
2. **Index map**: Maintain `task_id -> heap_index` map. On cancel, swap with last element, bubble up/down. Pros: O(log n) cancel. Cons: Complex index maintenance.
3. **Soft state**: Store tasks in both heap and hash map. Hash map is source of truth for status. Heap position doesn't matter for cancelled tasks.

Production systems typically use lazy deletion with periodic compaction when cancelled tasks exceed a threshold (e.g., 20% of heap).

</details>

**Level 3**: Design a priority queue that supports O(1) insertion for tasks scheduled within the next hour, while maintaining correctness for all tasks.

<details>
<summary style="color: #a371f7; cursor: pointer;">Answer</summary>

Use a **Hierarchical Timing Wheel** combined with a heap:

1. **Near-future tasks (0-60 min)**: Timing wheel with 60 slots (1-minute granularity). Insert is O(1) - hash timestamp to slot.
2. **Far-future tasks (>60 min)**: Standard min-heap for arbitrary future times.
3. **Overflow handling**: Background thread moves tasks from heap to wheel as they enter the 60-minute window.

This exploits the observation that most scheduled tasks execute within a short horizon. Netflix's scheduling system uses this pattern, achieving 99th percentile insert latency under 100 microseconds for millions of concurrent timers.

The wheel "ticks" every minute, promoting slot tasks to execution queue. Heap only consulted when wheel slots empty and we need to refill from far-future tasks.

</details>

</div>

---

### 2. Cron Expression Parsing

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

**The Cron Expression Format**

Standard cron: `minute hour day-of-month month day-of-week`

Extended (6-field): `second minute hour day-of-month month day-of-week`

```
 ┌───────────── minute (0-59)
 │ ┌───────────── hour (0-23)
 │ │ ┌───────────── day of month (1-31)
 │ │ │ ┌───────────── month (1-12)
 │ │ │ │ ┌───────────── day of week (0-6, Sunday=0)
 │ │ │ │ │
 * * * * *
```

**Special Characters**:
- `*` - Any value
- `,` - Value list separator (`1,3,5`)
- `-` - Range (`1-5`)
- `/` - Step values (`*/15` = every 15)
- `L` - Last (last day of month/week)
- `W` - Nearest weekday
- `#` - Nth occurrence (`2#3` = third Monday)

</div>

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 16px;">Cron Parser State Machine</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">TOKENIZE</div>
<div style="color: #d1f5d3; font-size: 9px;">Split by spaces</div>
</div>

<div style="color: #7ee787; font-size: 20px;">&#8594;</div>

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">PARSE FIELD</div>
<div style="color: #a5d6ff; font-size: 9px;">Handle *, ranges, steps</div>
</div>

<div style="color: #58a6ff; font-size: 20px;">&#8594;</div>

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">EXPAND</div>
<div style="color: #eddeff; font-size: 9px;">Generate value sets</div>
</div>

<div style="color: #a371f7; font-size: 20px;">&#8594;</div>

<div style="background: linear-gradient(135deg, #ffa657 0%, #f78166 100%); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">VALIDATE</div>
<div style="color: #fff; font-size: 9px;">Check bounds</div>
</div>

</div>

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #ffa657; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Example: Parsing "*/15 9-17 * * MON-FRI"</div>
<div style="color: #c9d1d9; font-size: 11px; font-family: monospace; line-height: 1.8;">
minute: */15 &#8594; {0, 15, 30, 45}<br>
hour: 9-17 &#8594; {9, 10, 11, 12, 13, 14, 15, 16, 17}<br>
day: * &#8594; {1, 2, ..., 31}<br>
month: * &#8594; {1, 2, ..., 12}<br>
dow: MON-FRI &#8594; {1, 2, 3, 4, 5}
</div>
</div>

</div>
</div>

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">

**Assumption**: Server timezone is consistent. Daylight saving time transitions are handled.

**The Next Execution Time Algorithm**

Given current time and cron expression, find the next valid execution time:

```python
def next_execution(cron, from_time):
    """
    Strategy: Increment smallest unit until all constraints satisfied.
    Key insight: Search space is bounded - at most 4 years forward
    (handles Feb 29 edge case).
    """
    t = from_time + timedelta(minutes=1)  # Start from next minute
    t = t.replace(second=0, microsecond=0)  # Align to minute boundary

    for _ in range(4 * 366 * 24 * 60):  # Max iterations safety
        if matches_all_fields(cron, t):
            return t
        t = increment_to_next_candidate(cron, t)

    raise ValueError("No valid execution time in next 4 years")
```

**Trade-off**: Naive iteration vs smart jumping

- **Naive**: Check every minute. Simple but slow for sparse schedules (`0 0 29 2 *` runs once every ~4 years)
- **Smart jumping**: Skip to next valid value per field. Complex but O(fields) per calculation

**Design Choice**: Most production cron libraries use smart jumping with field-by-field advancement. When a field doesn't match, jump to its next valid value and reset all smaller fields.

</div>

<div style="background: linear-gradient(135deg, #3d1a1a 0%, #5a2d2d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #f85149;">

**Edge Cases That Break Naive Implementations**

1. **February 30th**: `0 0 30 2 *` - Never fires. Must detect impossible schedules.

2. **DST Spring Forward**: 2:30 AM doesn't exist on spring-forward day. Options:
   - Skip the execution entirely
   - Execute at 3:00 AM instead
   - Execute at 1:59 AM (before gap)

3. **DST Fall Back**: 1:30 AM occurs twice. Options:
   - Execute twice (dangerous for non-idempotent tasks)
   - Execute on first occurrence only
   - Execute on second occurrence only

4. **Day-of-month AND Day-of-week**: Does `0 0 15 * MON` mean "15th AND Monday" or "15th OR Monday"?
   - Original cron: OR semantics
   - Quartz scheduler: AND semantics
   - Must document clearly!

5. **Leap seconds**: 23:59:60 exists on some days. Most systems ignore this.

</div>

#### Interview Questions: Cron Expressions

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

**Level 1**: Parse the cron expression `0 */2 * * *` and explain when it fires.

<details>
<summary style="color: #a371f7; cursor: pointer;">Answer</summary>

- minute: 0 (exactly on the hour)
- hour: */2 = {0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22} (every 2 hours)
- day/month/dow: * (any)

Fires at: 00:00, 02:00, 04:00, 06:00, 08:00, 10:00, 12:00, 14:00, 16:00, 18:00, 20:00, 22:00 every day.

</details>

**Level 2**: How would you handle timezone-aware cron scheduling when users are in different timezones?

<details>
<summary style="color: #a371f7; cursor: pointer;">Answer</summary>

Store and compute in UTC internally, convert for user display:

1. **Storage**: Store cron expression + user's timezone (e.g., "America/New_York")
2. **Calculation**:
   ```python
   user_tz = pytz.timezone(task.timezone)
   now_in_user_tz = datetime.now(user_tz)
   next_fire_user_tz = calculate_next(cron, now_in_user_tz)
   next_fire_utc = next_fire_user_tz.astimezone(pytz.UTC)
   ```
3. **DST handling**: Use timezone-aware libraries (pytz, java.time.ZonedDateTime) that handle DST transitions.

Critical: Never store just UTC offset (-05:00). Store timezone name so DST rules apply correctly.

</details>

**Level 3**: Design an efficient data structure to support querying "which tasks fire in the next N minutes" across 1 million cron-scheduled tasks.

<details>
<summary style="color: #a371f7; cursor: pointer;">Answer</summary>

**Problem**: Computing next-fire for 1M tasks on every query is too slow.

**Solution**: Pre-computed timeline with lazy refresh

1. **Background worker**: Continuously computes next-fire times and maintains a sorted index:
   ```
   next_fire_index: SortedDict[timestamp] -> Set[task_ids]
   ```

2. **Query "tasks in next N minutes"**:
   ```python
   now = time.time()
   return next_fire_index.range(now, now + N*60)
   ```
   Time: O(log M + K) where M = unique timestamps, K = matching tasks

3. **Index maintenance**:
   - After task executes: Calculate new next-fire, insert into index
   - Periodic cleanup: Remove past timestamps
   - On cron update: Remove old entry, calculate new, insert

4. **Memory optimization**: Only index next 24 hours. Tasks beyond that use on-demand calculation with caching.

Airflow uses a similar approach with a "next_dagrun" precomputed column that's updated after each run.

</details>

</div>

---

### 3. Distributed Scheduling

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

**The Distributed Scheduling Challenge**

Single-node schedulers don't scale. Multiple scheduler nodes introduce:
- **Consistency**: Same task might be picked by multiple nodes
- **Availability**: Node failure shouldn't stop task execution
- **Partition tolerance**: Network splits shouldn't cause duplicate execution

This is a classic [[CAP theorem]](/system-design/cap-theorem) trade-off scenario.

</div>

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 16px;">Distributed Scheduling Architectures</h4>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

<div style="background: #21262d; padding: 20px; border-radius: 12px;">
<div style="color: #7ee787; font-weight: bold; font-size: 14px; margin-bottom: 16px;">Leader-Based (Active-Passive)</div>

<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">LEADER</div>
<div style="color: #d1f5d3; font-size: 9px;">Schedules all tasks</div>
</div>
<div style="display: flex; justify-content: center; gap: 8px;">
<div style="background: #30363d; padding: 10px; border-radius: 6px; text-align: center;">
<div style="color: #8b949e; font-size: 10px;">Follower 1</div>
<div style="color: #6e7681; font-size: 8px;">Standby</div>
</div>
<div style="background: #30363d; padding: 10px; border-radius: 6px; text-align: center;">
<div style="color: #8b949e; font-size: 10px;">Follower 2</div>
<div style="color: #6e7681; font-size: 8px;">Standby</div>
</div>
</div>
</div>

<div style="color: #c9d1d9; font-size: 11px; margin-top: 12px;">
<strong>Pros</strong>: Simple, no coordination<br>
<strong>Cons</strong>: Leader bottleneck, failover delay
</div>
</div>

<div style="background: #21262d; padding: 20px; border-radius: 12px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 14px; margin-bottom: 16px;">Partition-Based (Active-Active)</div>

<div style="display: flex; justify-content: space-around; gap: 8px;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">Node 1</div>
<div style="color: #a5d6ff; font-size: 9px;">Tasks 0-999</div>
</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">Node 2</div>
<div style="color: #eddeff; font-size: 9px;">Tasks 1000-1999</div>
</div>
<div style="background: linear-gradient(135deg, #ffa657 0%, #f78166 100%); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">Node 3</div>
<div style="color: #fff; font-size: 9px;">Tasks 2000-2999</div>
</div>
</div>

<div style="color: #c9d1d9; font-size: 11px; margin-top: 12px;">
<strong>Pros</strong>: Scales horizontally, no SPOF<br>
<strong>Cons</strong>: Rebalancing complexity on node changes
</div>
</div>

</div>

<div style="background: #161b22; padding: 16px; border-radius: 8px; margin-top: 20px;">
<div style="color: #ffa657; font-weight: bold; font-size: 12px; margin-bottom: 12px;">Coordination Mechanisms</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
<div style="text-align: center;">
<div style="color: #7ee787; font-size: 11px; font-weight: bold;">[[ZooKeeper]](/system-design/zookeeper)</div>
<div style="color: #8b949e; font-size: 9px;">Leader election, distributed locks</div>
</div>
<div style="text-align: center;">
<div style="color: #58a6ff; font-size: 11px; font-weight: bold;">[[Redis]](/databases/redis)</div>
<div style="color: #8b949e; font-size: 9px;">SETNX for locks, Redlock for safety</div>
</div>
<div style="text-align: center;">
<div style="color: #a371f7; font-size: 11px; font-weight: bold;">[[etcd]](/system-design/etcd)</div>
<div style="color: #8b949e; font-size: 9px;">Lease-based locking, watch API</div>
</div>
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">

**Assumption**: Network partitions are possible but rare. Clocks are synchronized within acceptable bounds (NTP).

**The Lock-Based Approach (Pessimistic)**

```python
def try_execute_task(task_id):
    lock_key = f"task_lock:{task_id}"

    # Try to acquire distributed lock
    if redis.set(lock_key, node_id, nx=True, ex=300):  # 5-min TTL
        try:
            execute_task(task_id)
            mark_completed(task_id)
        finally:
            redis.delete(lock_key)
        return True
    return False  # Another node has the lock
```

**Trade-off**: Lock granularity
- **Task-level locks**: High parallelism but many lock operations
- **Partition-level locks**: Fewer locks but reduced parallelism
- **Global lock**: Simplest but defeats the purpose of distribution

**Design Choice**: Task-level locks with lock pooling. Maintain a connection pool to Redis/ZooKeeper to amortize connection overhead.

</div>

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #a371f7; margin: 0 0 24px 0; font-size: 16px;">Database-Based Scheduling with Row Locking</h4>

<div style="background: #21262d; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 8px;">The "Claim" Pattern</div>
<div style="color: #c9d1d9; font-size: 11px; font-family: monospace; line-height: 1.8;">
<span style="color: #ffa657;">-- Atomic claim: only one node succeeds</span><br>
UPDATE tasks<br>
SET status = 'running',<br>
&nbsp;&nbsp;&nbsp;&nbsp;claimed_by = 'node-1',<br>
&nbsp;&nbsp;&nbsp;&nbsp;claimed_at = NOW()<br>
WHERE id = (SELECT id FROM tasks<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WHERE status = 'pending'<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AND scheduled_time <= NOW()<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ORDER BY scheduled_time, priority DESC<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LIMIT 1<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #f85149;">FOR UPDATE SKIP LOCKED</span>)<br>
RETURNING *;
</div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: #238636; padding: 12px; border-radius: 8px;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">SKIP LOCKED Advantage</div>
<div style="color: #d1f5d3; font-size: 10px; margin-top: 4px;">Nodes don't block each other. If row is locked, skip to next candidate.</div>
</div>
<div style="background: #f85149; padding: 12px; border-radius: 8px;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">Without SKIP LOCKED</div>
<div style="color: #ffd7d5; font-size: 10px; margin-top: 4px;">Nodes serialize on same row. Throughput collapses under load.</div>
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #3d1a1a 0%, #5a2d2d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #f85149;">

**Critical Distributed Scheduling Pitfalls**

1. **Clock Skew**: Node A's clock is 5 seconds ahead. It picks up tasks "early" before they're due on other nodes. Solution: Use server-side timestamps (DB/Redis), not client timestamps.

2. **Split Brain**: Two nodes both believe they're the leader. Both execute the same task. Solution: Fencing tokens - each task execution includes a monotonic token; storage rejects older tokens.

3. **Zombie Workers**: Node claims task, dies, task stays "running" forever. Solution: Heartbeat + timeout-based recovery (covered in failure recovery section).

4. **Thundering Herd**: All N nodes poll database simultaneously on each tick. Solution: Jittered polling intervals, claim batches of tasks.

5. **Rebalancing Storms**: Node joins/leaves, all partitions reassign, massive state transfer. Solution: Consistent hashing with virtual nodes for minimal reassignment.

</div>

#### Interview Questions: Distributed Scheduling

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

**Level 1**: Why can't we simply use a shared database table with optimistic locking for distributed task scheduling?

<details>
<summary style="color: #a371f7; cursor: pointer;">Answer</summary>

Optimistic locking (version numbers/timestamps) causes high contention:

1. Node A reads task with version=1
2. Node B reads same task with version=1
3. Node A updates with version=2, succeeds
4. Node B's update fails (version mismatch), must retry

With N nodes and M due tasks, collision rate approaches 100% as N grows. Each collision wastes a round trip. Pessimistic locking (`SELECT FOR UPDATE SKIP LOCKED`) or distributed locks are preferred because they prevent the conflict upfront.

</details>

**Level 2**: How would you implement leader election for a scheduler cluster using Redis?

<details>
<summary style="color: #a371f7; cursor: pointer;">Answer</summary>

```python
class RedisLeaderElection:
    def __init__(self, redis_client, key, node_id, ttl=30):
        self.redis = redis_client
        self.key = key
        self.node_id = node_id
        self.ttl = ttl
        self.is_leader = False

    def try_become_leader(self):
        # SETNX with expiry - atomic
        acquired = self.redis.set(
            self.key, self.node_id,
            nx=True,  # Only if not exists
            ex=self.ttl
        )
        self.is_leader = acquired
        return acquired

    def maintain_leadership(self):
        """Call periodically (every ttl/3 seconds)"""
        if self.is_leader:
            # Refresh only if we still own the lock
            # Lua script for atomicity
            script = """
            if redis.call('get', KEYS[1]) == ARGV[1] then
                return redis.call('expire', KEYS[1], ARGV[2])
            else
                return 0
            end
            """
            result = self.redis.eval(script, 1, self.key, self.node_id, self.ttl)
            self.is_leader = (result == 1)
        else:
            self.try_become_leader()
        return self.is_leader
```

Critical: Use Lua script for refresh to ensure atomicity. Otherwise another node might acquire between GET and EXPIRE.

</details>

**Level 3**: Design a scheduler that guarantees exactly-once execution even during network partitions, without relying on distributed transactions.

<details>
<summary style="color: #a371f7; cursor: pointer;">Answer</summary>

**Approach: Idempotent execution + outbox pattern + deduplication**

1. **Task state machine with fencing**:
   ```sql
   ALTER TABLE tasks ADD COLUMN fence_token BIGINT;
   -- Monotonically increasing, assigned by coordinator
   ```

2. **Claim with fence token**:
   ```sql
   UPDATE tasks
   SET status = 'claimed',
       fence_token = (SELECT MAX(fence_token) + 1 FROM tasks),
       claimed_by = ?
   WHERE id = ? AND status = 'pending'
   RETURNING fence_token;
   ```

3. **Execution wrapper**:
   ```python
   def execute_with_fence(task, fence_token):
       # All downstream writes include fence_token
       # Storage systems reject writes with stale tokens
       result = task.func(fence_token=fence_token)

       # Completion uses same fence
       db.execute("""
           UPDATE tasks SET status = 'completed'
           WHERE id = ? AND fence_token = ?
       """, task.id, fence_token)
   ```

4. **Downstream idempotency**:
   ```python
   def process_payment(order_id, fence_token):
       # Check if already processed with same or higher fence
       existing = db.query(
           "SELECT fence_token FROM payments WHERE order_id = ?",
           order_id
       )
       if existing and existing.fence_token >= fence_token:
           return existing.result  # Idempotent return

       # Process and record fence
       result = charge_card(order_id)
       db.execute(
           "INSERT INTO payments (order_id, fence_token, result) VALUES (?, ?, ?)",
           order_id, fence_token, result
       )
       return result
   ```

This ensures that even if two nodes somehow both try to execute (partition scenario), only the one with the valid fence token succeeds at writes. The other's writes are rejected, and its completion update fails.

</details>

</div>

---

### 4. Failure Recovery

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

**Failure Modes in Task Scheduling**

| Failure Type | Symptom | Recovery Strategy |
|-------------|---------|-------------------|
| Worker crash | Task stuck in "running" | Timeout-based detection, reassignment |
| Network partition | Worker alive but unreachable | Heartbeat failure, may cause duplicate |
| Task timeout | Execution exceeds limit | Kill task, mark failed, optional retry |
| Dependency failure | Upstream task failed | Skip dependent tasks or wait |
| Resource exhaustion | OOM, disk full | Graceful degradation, alerting |

</div>

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 16px;">Heartbeat-Based Failure Detection</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; flex-wrap: wrap;">

<div style="flex: 1; min-width: 200px; background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">Worker Heartbeat Loop</div>
<div style="color: #c9d1d9; font-size: 10px; font-family: monospace; line-height: 1.8;">
while running:<br>
&nbsp;&nbsp;send_heartbeat(worker_id, current_task)<br>
&nbsp;&nbsp;sleep(heartbeat_interval)
</div>
</div>

<div style="flex: 1; min-width: 200px; background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #f85149; font-weight: bold; font-size: 12px; margin-bottom: 12px;">Recovery Monitor Loop</div>
<div style="color: #c9d1d9; font-size: 10px; font-family: monospace; line-height: 1.8;">
while running:<br>
&nbsp;&nbsp;stale = find_stale_heartbeats(threshold)<br>
&nbsp;&nbsp;for worker in stale:<br>
&nbsp;&nbsp;&nbsp;&nbsp;recover_tasks(worker)<br>
&nbsp;&nbsp;sleep(check_interval)
</div>
</div>

</div>

<div style="background: #161b22; padding: 16px; border-radius: 8px;">
<div style="color: #ffa657; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Tuning Heartbeat Parameters</div>
<div style="color: #c9d1d9; font-size: 11px;">
<strong>heartbeat_interval</strong>: 10-30 seconds typical. Too fast = network overhead. Too slow = delayed detection.<br>
<strong>failure_threshold</strong>: Usually 3x heartbeat_interval. Accounts for network jitter, GC pauses.<br>
<strong>check_interval</strong>: heartbeat_interval / 2. Ensures timely detection.
</div>
</div>

</div>
</div>

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">

**Assumption**: Task execution is either idempotent or has built-in deduplication.

**Retry Strategies with [[Exponential Backoff]](/algorithms/exponential-backoff)**

```python
def calculate_retry_delay(attempt, base_delay=1, max_delay=3600, jitter=True):
    """
    Exponential backoff with optional jitter.
    attempt: 0-indexed retry count
    """
    delay = min(base_delay * (2 ** attempt), max_delay)

    if jitter:
        # Full jitter: random between 0 and calculated delay
        delay = random.uniform(0, delay)

    return delay

# Retry schedule for base_delay=1, max_delay=3600:
# Attempt 0: ~0-1s
# Attempt 1: ~0-2s
# Attempt 2: ~0-4s
# Attempt 3: ~0-8s
# ...
# Attempt 12+: ~0-3600s (capped)
```

**Trade-off**: Retry policy options

| Policy | Behavior | Use Case |
|--------|----------|----------|
| Fixed delay | Same wait between retries | Idempotent, predictable failures |
| Linear backoff | Delay increases by fixed amount | Rate-limited APIs |
| Exponential backoff | Delay doubles each time | Transient failures, overload |
| Exponential + jitter | Randomized exponential | Thundering herd prevention |

**Design Choice**: Exponential backoff with full jitter is the default for modern systems. It spreads retry load over time, preventing synchronized retry storms after an outage recovers.

</div>

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #a371f7; margin: 0 0 24px 0; font-size: 16px;">Dead Letter Queue Pattern</h4>

<div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">

<div style="flex: 2; min-width: 250px;">
<div style="display: flex; flex-direction: column; gap: 12px;">

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 10px 14px; border-radius: 8px;">
<div style="color: #fff; font-size: 10px; font-weight: bold;">Main Queue</div>
</div>
<div style="color: #7ee787;">&#8594;</div>
<div style="background: #21262d; padding: 10px 14px; border-radius: 8px;">
<div style="color: #c9d1d9; font-size: 10px;">Process Task</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 12px; margin-left: 120px;">
<div style="color: #f85149;">&#8595; failure</div>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: linear-gradient(135deg, #ffa657 0%, #f78166 100%); padding: 10px 14px; border-radius: 8px;">
<div style="color: #fff; font-size: 10px; font-weight: bold;">Retry Queue</div>
</div>
<div style="color: #ffa657;">&#8594;</div>
<div style="background: #21262d; padding: 10px 14px; border-radius: 8px;">
<div style="color: #c9d1d9; font-size: 10px;">Retry (with backoff)</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 12px; margin-left: 120px;">
<div style="color: #f85149;">&#8595; max retries exceeded</div>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); padding: 10px 14px; border-radius: 8px;">
<div style="color: #fff; font-size: 10px; font-weight: bold;">Dead Letter Queue</div>
</div>
<div style="color: #f85149;">&#8594;</div>
<div style="background: #21262d; padding: 10px 14px; border-radius: 8px;">
<div style="color: #c9d1d9; font-size: 10px;">Manual review / Alert</div>
</div>
</div>

</div>
</div>

<div style="flex: 1; min-width: 180px; background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 8px;">DLQ Contents</div>
<div style="color: #c9d1d9; font-size: 10px; line-height: 1.6;">
- Original task payload<br>
- All retry attempt logs<br>
- Final error message<br>
- Stack trace<br>
- Timestamp of each attempt<br>
- Related task IDs
</div>
</div>

</div>
</div>

<div style="background: linear-gradient(135deg, #3d1a1a 0%, #5a2d2d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #f85149;">

**The "Stuck Task" Problem**

Scenario: Worker claims task, starts execution, hangs indefinitely (deadlock, infinite loop, waiting on external resource).

**Detection Approaches**:

1. **Heartbeat-based**: Worker sends periodic "I'm alive and working on task X" messages. Absence indicates death.

2. **Visibility timeout**: Task becomes invisible to other workers for T seconds. If not completed within T, becomes visible again for retry. (SQS model)

3. **Lease-based**: Worker acquires time-limited lease. Must renew periodically. Expired lease = task available for reprocessing.

**Recovery Approaches**:

1. **Timeout + Retry**: After visibility timeout, another worker picks up. Original might still be running (duplicate risk).

2. **Process killing**: Monitor sends SIGTERM to stuck process, waits, then SIGKILL. Requires process visibility.

3. **Checkpoint-resume**: Task periodically saves progress. On recovery, resume from last checkpoint rather than restart.

</div>

#### Interview Questions: Failure Recovery

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

**Level 1**: What's the difference between at-least-once and at-most-once task execution semantics?

<details>
<summary style="color: #a371f7; cursor: pointer;">Answer</summary>

**At-most-once**: Task executed 0 or 1 times. Achieved by acknowledging before execution. If worker dies during execution, task is lost. Use for: logging, metrics, non-critical notifications.

**At-least-once**: Task executed 1 or more times. Achieved by acknowledging after execution. If worker dies after execution but before ack, task is re-executed. Use for: payments (with idempotency), order processing.

**Exactly-once**: Task executed exactly 1 time. Requires idempotent operations + at-least-once delivery + deduplication. Hardest to achieve.

</details>

**Level 2**: Design a visibility timeout mechanism for a database-backed task queue.

<details>
<summary style="color: #a371f7; cursor: pointer;">Answer</summary>

```sql
-- Schema
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    payload JSONB,
    status VARCHAR(20) DEFAULT 'pending',
    visible_after TIMESTAMP DEFAULT NOW(),
    attempts INT DEFAULT 0,
    max_attempts INT DEFAULT 3,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tasks_pending ON tasks(visible_after)
    WHERE status = 'pending';

-- Claim task (makes it invisible)
UPDATE tasks
SET status = 'processing',
    visible_after = NOW() + INTERVAL '5 minutes',
    attempts = attempts + 1
WHERE id = (
    SELECT id FROM tasks
    WHERE status IN ('pending', 'processing')
    AND visible_after <= NOW()
    AND attempts < max_attempts
    ORDER BY visible_after
    LIMIT 1
    FOR UPDATE SKIP LOCKED
)
RETURNING *;

-- Complete task
UPDATE tasks SET status = 'completed' WHERE id = ?;

-- Background recovery (runs every minute)
-- No action needed! Stale tasks automatically become
-- visible when visible_after passes
```

The key insight: `visible_after` serves dual purpose - scheduling AND failure recovery. Processing tasks with old `visible_after` are implicitly "timed out" and become claimable.

</details>

**Level 3**: How would you implement checkpoint-based recovery for long-running tasks that process millions of records?

<details>
<summary style="color: #a371f7; cursor: pointer;">Answer</summary>

```python
class CheckpointedTask:
    def __init__(self, task_id, checkpoint_store):
        self.task_id = task_id
        self.store = checkpoint_store  # Redis, DB, or file

    def execute(self, records):
        # Load checkpoint
        checkpoint = self.store.get(self.task_id)
        start_offset = checkpoint.get('offset', 0) if checkpoint else 0
        accumulated_state = checkpoint.get('state', {}) if checkpoint else {}

        batch_size = 1000
        for i in range(start_offset, len(records), batch_size):
            batch = records[i:i+batch_size]

            # Process batch
            for record in batch:
                accumulated_state = self.process_record(record, accumulated_state)

            # Checkpoint after each batch
            self.store.set(self.task_id, {
                'offset': i + batch_size,
                'state': accumulated_state,
                'last_checkpoint': time.time()
            })

        # Task completed - clean up checkpoint
        self.store.delete(self.task_id)
        return accumulated_state

    def process_record(self, record, state):
        # Business logic here
        state['count'] = state.get('count', 0) + 1
        state['sum'] = state.get('sum', 0) + record['value']
        return state
```

**Checkpoint design considerations**:

1. **Frequency**: Every N records or every T seconds. Balance between recovery granularity and checkpoint overhead.

2. **Atomicity**: If processing and checkpointing aren't atomic, records between last checkpoint and failure may be processed twice. Solution: Process batch, checkpoint, then commit batch to output.

3. **Checkpoint storage**:
   - Redis: Fast but volatile. Use for short-lived tasks.
   - Database: Durable. Use for critical long-running tasks.
   - Object storage (S3): For very large state that doesn't fit in Redis/DB.

4. **Checkpoint compaction**: For tasks that run forever (streams), periodically compact old checkpoints to prevent unbounded growth.

</details>

</div>

---

### 5. Idempotency

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

**Why Idempotency is Non-Negotiable for Schedulers**

In distributed systems, exactly-once delivery is a myth. Networks fail, workers crash, retries happen. Your system WILL execute the same task multiple times. The question is: will that break things?

**Definition**: An operation is idempotent if executing it multiple times has the same effect as executing it once.

**Idempotent operations**:
- `SET user.email = 'new@email.com'` (absolute assignment)
- `DELETE FROM users WHERE id = 5`
- `PUT /api/users/5` (full replacement)

**Non-idempotent operations**:
- `INCREMENT user.balance BY 100` (additive)
- `INSERT INTO orders (...)` (creates new row each time)
- `POST /api/orders` (creates new resource)

</div>

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 16px;">Idempotency Key Pattern</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">The Pattern</div>
<div style="color: #c9d1d9; font-size: 11px; font-family: monospace; line-height: 1.8;">
<span style="color: #ffa657;">def</span> process_with_idempotency(idempotency_key, operation):<br>
&nbsp;&nbsp;<span style="color: #8b949e;"># Check if already processed</span><br>
&nbsp;&nbsp;existing = idempotency_store.get(idempotency_key)<br>
&nbsp;&nbsp;<span style="color: #ffa657;">if</span> existing:<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ffa657;">return</span> existing.result &nbsp;<span style="color: #8b949e;"># Return cached result</span><br>
<br>
&nbsp;&nbsp;<span style="color: #8b949e;"># Execute operation</span><br>
&nbsp;&nbsp;result = operation()<br>
<br>
&nbsp;&nbsp;<span style="color: #8b949e;"># Store result (with TTL for cleanup)</span><br>
&nbsp;&nbsp;idempotency_store.set(idempotency_key, result, ttl=<span style="color: #a5d6ff;">86400</span>)<br>
<br>
&nbsp;&nbsp;<span style="color: #ffa657;">return</span> result
</div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">

<div style="background: #238636; padding: 12px; border-radius: 8px;">
<div style="color: #fff; font-weight: bold; font-size: 11px; margin-bottom: 4px;">Good Idempotency Keys</div>
<div style="color: #d1f5d3; font-size: 10px;">
- task_id + scheduled_time<br>
- order_id + action + timestamp<br>
- user_id + operation + date
</div>
</div>

<div style="background: #f85149; padding: 12px; border-radius: 8px;">
<div style="color: #fff; font-weight: bold; font-size: 11px; margin-bottom: 4px;">Bad Idempotency Keys</div>
<div style="color: #ffd7d5; font-size: 10px;">
- Random UUID (different each retry)<br>
- Timestamp only (too granular)<br>
- Mutable fields (user can change)
</div>
</div>

</div>

</div>
</div>

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">

**Assumption**: Idempotency keys are unique per logical operation instance.

**Trade-off**: Idempotency storage strategies

| Strategy | Pros | Cons |
|----------|------|------|
| In-memory cache | Fast, simple | Lost on restart, limited size |
| Redis | Fast, distributed | Extra infrastructure, TTL management |
| Database table | Durable, queryable | Slower writes, storage growth |
| Request log + hash | Full audit trail | Highest overhead |

**Design Choice**: Use Redis with 24-hour TTL for most scheduled tasks. Tasks that run daily have natural idempotency keys (task_id + date). For critical financial operations, use database with indefinite retention.

</div>

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #a371f7; margin: 0 0 24px 0; font-size: 16px;">Making Non-Idempotent Operations Idempotent</h4>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #f85149; font-weight: bold; font-size: 12px; margin-bottom: 12px;">Problem: Additive Operations</div>
<div style="color: #c9d1d9; font-size: 10px; font-family: monospace; line-height: 1.6;">
<span style="color: #8b949e;">-- Non-idempotent: runs twice = double credit</span><br>
UPDATE accounts<br>
SET balance = balance + 100<br>
WHERE user_id = 5;
</div>
</div>

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">Solution: Transaction Log</div>
<div style="color: #c9d1d9; font-size: 10px; font-family: monospace; line-height: 1.6;">
<span style="color: #8b949e;">-- Idempotent: unique constraint prevents duplicate</span><br>
INSERT INTO transactions<br>
&nbsp;&nbsp;(id, user_id, amount, idempotency_key)<br>
VALUES (gen_id(), 5, 100, 'task-123-2024-01-15')<br>
ON CONFLICT (idempotency_key) DO NOTHING;<br><br>
<span style="color: #8b949e;">-- Balance computed from transactions</span><br>
SELECT SUM(amount) FROM transactions<br>
WHERE user_id = 5;
</div>
</div>

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #f85149; font-weight: bold; font-size: 12px; margin-bottom: 12px;">Problem: External API Calls</div>
<div style="color: #c9d1d9; font-size: 10px; font-family: monospace; line-height: 1.6;">
<span style="color: #8b949e;"># Non-idempotent: duplicate emails</span><br>
email_api.send(<br>
&nbsp;&nbsp;to='user@example.com',<br>
&nbsp;&nbsp;subject='Your order shipped'<br>
)
</div>
</div>

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">Solution: Check-then-send with Lock</div>
<div style="color: #c9d1d9; font-size: 10px; font-family: monospace; line-height: 1.6;">
<span style="color: #8b949e;"># Idempotent: check before sending</span><br>
key = f'email_sent:{order_id}:shipped'<br>
if not redis.setnx(key, '1', ex=86400):<br>
&nbsp;&nbsp;return <span style="color: #8b949e;"># Already sent</span><br><br>
email_api.send(...)<br>
<span style="color: #8b949e;"># If send fails, key expires, retry works</span>
</div>
</div>

</div>
</div>

<div style="background: linear-gradient(135deg, #3d1a1a 0%, #5a2d2d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #f85149;">

**The Idempotency-Atomicity Gap**

Dangerous pattern:
```python
def process_order(order_id, idempotency_key):
    if is_processed(idempotency_key):
        return get_cached_result(idempotency_key)

    result = charge_payment(order_id)      # Step 1
    update_inventory(order_id)              # Step 2
    # CRASH HERE
    mark_processed(idempotency_key, result) # Step 3 - never executes
```

On retry: `is_processed` returns False, payment charged again!

**Solution: Transactional outbox**

```python
def process_order(order_id, idempotency_key):
    with db.transaction():
        if is_processed(idempotency_key):
            return get_cached_result(idempotency_key)

        # All state changes in same transaction
        record_payment_intent(order_id)
        update_inventory(order_id)
        mark_processed(idempotency_key)

    # Async: separate process reads outbox, calls payment API
    # Payment API must also be idempotent (Stripe idempotency keys)
```

</div>

#### Interview Questions: Idempotency

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

**Level 1**: Why is `INSERT INTO table VALUES (...)` not idempotent, and how would you make it idempotent?

<details>
<summary style="color: #a371f7; cursor: pointer;">Answer</summary>

Each INSERT creates a new row with a new auto-generated ID. Running twice = two rows.

**Solutions**:

1. **Natural key constraint**:
   ```sql
   CREATE UNIQUE INDEX ON orders(customer_id, order_date, product_id);
   INSERT INTO orders (...) ON CONFLICT DO NOTHING;
   ```

2. **Idempotency key column**:
   ```sql
   ALTER TABLE orders ADD COLUMN idempotency_key VARCHAR UNIQUE;
   INSERT INTO orders (..., idempotency_key)
   VALUES (..., 'task-123')
   ON CONFLICT (idempotency_key) DO NOTHING;
   ```

3. **UPSERT pattern**:
   ```sql
   INSERT INTO orders (...) VALUES (...)
   ON CONFLICT (order_id) DO UPDATE SET updated_at = NOW();
   ```

</details>

**Level 2**: How do you handle idempotency when your task calls multiple external services sequentially?

<details>
<summary style="color: #a371f7; cursor: pointer;">Answer</summary>

**Saga pattern with compensation**:

```python
class OrderSaga:
    def execute(self, order_id, idempotency_key):
        # Track progress in saga state
        saga_state = self.load_or_create_state(idempotency_key)

        try:
            # Step 1: Reserve inventory
            if not saga_state.inventory_reserved:
                inventory_service.reserve(
                    order_id,
                    idempotency_key=f"{idempotency_key}:inventory"
                )
                saga_state.inventory_reserved = True
                self.save_state(saga_state)

            # Step 2: Charge payment
            if not saga_state.payment_charged:
                payment_service.charge(
                    order_id,
                    idempotency_key=f"{idempotency_key}:payment"
                )
                saga_state.payment_charged = True
                self.save_state(saga_state)

            # Step 3: Ship order
            if not saga_state.shipment_created:
                shipping_service.create_shipment(
                    order_id,
                    idempotency_key=f"{idempotency_key}:shipping"
                )
                saga_state.shipment_created = True
                saga_state.completed = True
                self.save_state(saga_state)

        except Exception as e:
            self.compensate(saga_state, order_id, idempotency_key)
            raise

    def compensate(self, saga_state, order_id, idempotency_key):
        # Undo in reverse order
        if saga_state.payment_charged:
            payment_service.refund(order_id, idempotency_key=f"{idempotency_key}:refund")
        if saga_state.inventory_reserved:
            inventory_service.release(order_id, idempotency_key=f"{idempotency_key}:release")
```

Key insight: Each external call has its own idempotency key derived from the parent. Saga state tracks which steps completed, enabling retry from any failure point.

</details>

**Level 3**: Design an idempotency system that handles concurrent duplicate requests arriving within milliseconds of each other.

<details>
<summary style="color: #a371f7; cursor: pointer;">Answer</summary>

**Problem**: Two requests with same idempotency key arrive simultaneously. Both check "is processed?" -> both get "no" -> both execute.

**Solution: Distributed lock with request coalescing**

```python
class IdempotencyService:
    def __init__(self, redis_client, db):
        self.redis = redis_client
        self.db = db

    def execute_idempotent(self, idempotency_key, operation, timeout=30):
        # Phase 1: Check completed results
        completed = self.db.query(
            "SELECT result FROM idempotency_results WHERE key = %s",
            idempotency_key
        )
        if completed:
            return completed.result

        # Phase 2: Try to acquire execution lock
        lock_key = f"idempotency_lock:{idempotency_key}"
        lock_acquired = self.redis.set(
            lock_key,
            "1",
            nx=True,  # Only if not exists
            ex=timeout
        )

        if lock_acquired:
            try:
                # We own the lock - execute
                result = operation()

                # Store result atomically
                self.db.execute(
                    """INSERT INTO idempotency_results (key, result, created_at)
                       VALUES (%s, %s, NOW())
                       ON CONFLICT (key) DO NOTHING""",
                    idempotency_key, json.dumps(result)
                )
                return result
            finally:
                self.redis.delete(lock_key)
        else:
            # Another request is executing - wait for result
            return self._wait_for_result(idempotency_key, timeout)

    def _wait_for_result(self, idempotency_key, timeout):
        """Poll for result with exponential backoff"""
        deadline = time.time() + timeout
        delay = 0.01  # Start with 10ms

        while time.time() < deadline:
            result = self.db.query(
                "SELECT result FROM idempotency_results WHERE key = %s",
                idempotency_key
            )
            if result:
                return json.loads(result.result)

            time.sleep(delay)
            delay = min(delay * 2, 1.0)  # Cap at 1 second

        raise TimeoutError(f"Idempotency result not available for {idempotency_key}")
```

**Race condition eliminated**:
1. First request acquires lock, executes, stores result
2. Concurrent requests see lock exists, wait for result
3. All requests return same result

**Bonus optimization**: Use Redis pub/sub to notify waiters instead of polling.

</details>

</div>

---

## Complete Implementation

### Python (Production-Ready)

```python
import heapq
import threading
import time
import hashlib
import json
import re
from dataclasses import dataclass, field
from typing import Callable, Optional, List, Dict, Set, Any
from enum import Enum
from datetime import datetime, timedelta
from abc import ABC, abstractmethod
import uuid
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TaskStatus(Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"
    RETRYING = "retrying"


class RecurrenceType(Enum):
    ONCE = "once"
    INTERVAL = "interval"
    CRON = "cron"


# ============================================================
# Cron Expression Parser
# ============================================================

class CronField:
    """Represents a single field in a cron expression."""

    def __init__(self, expr: str, min_val: int, max_val: int, aliases: Dict[str, int] = None):
        self.min_val = min_val
        self.max_val = max_val
        self.aliases = aliases or {}
        self.values: Set[int] = self._parse(expr)

    def _parse(self, expr: str) -> Set[int]:
        """Parse cron field expression into set of valid values."""
        expr = expr.upper()

        # Apply aliases (JAN->1, MON->1, etc.)
        for alias, value in self.aliases.items():
            expr = expr.replace(alias, str(value))

        values = set()

        for part in expr.split(','):
            if '/' in part:
                # Step values: */5 or 1-10/2
                range_part, step = part.split('/')
                step = int(step)
                if range_part == '*':
                    start, end = self.min_val, self.max_val
                else:
                    start, end = self._parse_range(range_part)
                values.update(range(start, end + 1, step))
            elif '-' in part:
                # Range: 1-5
                start, end = self._parse_range(part)
                values.update(range(start, end + 1))
            elif part == '*':
                values.update(range(self.min_val, self.max_val + 1))
            else:
                # Single value
                values.add(int(part))

        return values

    def _parse_range(self, expr: str) -> tuple:
        parts = expr.split('-')
        return int(parts[0]), int(parts[1])

    def matches(self, value: int) -> bool:
        return value in self.values

    def next_value(self, current: int) -> Optional[int]:
        """Find next valid value >= current, or None if wrapped."""
        for v in sorted(self.values):
            if v >= current:
                return v
        return None


class CronExpression:
    """
    Parse and evaluate cron expressions.
    Format: minute hour day-of-month month day-of-week
    """

    MONTH_ALIASES = {
        'JAN': 1, 'FEB': 2, 'MAR': 3, 'APR': 4, 'MAY': 5, 'JUN': 6,
        'JUL': 7, 'AUG': 8, 'SEP': 9, 'OCT': 10, 'NOV': 11, 'DEC': 12
    }
    DOW_ALIASES = {
        'SUN': 0, 'MON': 1, 'TUE': 2, 'WED': 3, 'THU': 4, 'FRI': 5, 'SAT': 6
    }

    def __init__(self, expression: str):
        parts = expression.strip().split()
        if len(parts) != 5:
            raise ValueError(f"Cron expression must have 5 fields, got {len(parts)}")

        self.minute = CronField(parts[0], 0, 59)
        self.hour = CronField(parts[1], 0, 23)
        self.day = CronField(parts[2], 1, 31)
        self.month = CronField(parts[3], 1, 12, self.MONTH_ALIASES)
        self.dow = CronField(parts[4], 0, 6, self.DOW_ALIASES)
        self.expression = expression

    def next_execution(self, from_time: datetime = None) -> datetime:
        """Calculate next execution time after from_time."""
        if from_time is None:
            from_time = datetime.now()

        # Start from next minute
        t = from_time.replace(second=0, microsecond=0) + timedelta(minutes=1)

        # Search for up to 4 years (handles Feb 29)
        max_iterations = 4 * 366 * 24 * 60

        for _ in range(max_iterations):
            if self._matches(t):
                return t
            t = self._advance(t)

        raise ValueError(f"No valid execution time found for: {self.expression}")

    def _matches(self, t: datetime) -> bool:
        """Check if datetime matches cron expression."""
        return (
            self.minute.matches(t.minute) and
            self.hour.matches(t.hour) and
            self.day.matches(t.day) and
            self.month.matches(t.month) and
            self.dow.matches(t.weekday())  # Monday=0 in Python
        )

    def _advance(self, t: datetime) -> datetime:
        """Advance to next candidate time."""
        # Simple advancement: next minute
        # Production systems use smarter jumping
        return t + timedelta(minutes=1)


# ============================================================
# Idempotency Manager
# ============================================================

class IdempotencyStore(ABC):
    @abstractmethod
    def check_and_set(self, key: str, ttl: int = 86400) -> bool:
        """Return True if key was set (first execution), False if already exists."""
        pass

    @abstractmethod
    def get_result(self, key: str) -> Optional[Any]:
        """Get cached result for idempotency key."""
        pass

    @abstractmethod
    def set_result(self, key: str, result: Any, ttl: int = 86400) -> None:
        """Cache result for idempotency key."""
        pass


class InMemoryIdempotencyStore(IdempotencyStore):
    """Simple in-memory idempotency store for single-node deployments."""

    def __init__(self):
        self._keys: Dict[str, float] = {}  # key -> expiry_time
        self._results: Dict[str, Any] = {}
        self._lock = threading.Lock()

    def check_and_set(self, key: str, ttl: int = 86400) -> bool:
        with self._lock:
            self._cleanup_expired()
            if key in self._keys:
                return False
            self._keys[key] = time.time() + ttl
            return True

    def get_result(self, key: str) -> Optional[Any]:
        with self._lock:
            if key in self._keys and self._keys[key] > time.time():
                return self._results.get(key)
            return None

    def set_result(self, key: str, result: Any, ttl: int = 86400) -> None:
        with self._lock:
            self._keys[key] = time.time() + ttl
            self._results[key] = result

    def _cleanup_expired(self):
        now = time.time()
        expired = [k for k, v in self._keys.items() if v <= now]
        for k in expired:
            del self._keys[k]
            self._results.pop(k, None)


# ============================================================
# Task Definition
# ============================================================

@dataclass
class Task:
    task_id: str
    name: str
    func: Callable
    args: tuple = ()
    kwargs: dict = field(default_factory=dict)
    scheduled_time: float = field(default_factory=time.time)
    priority: int = 0
    recurrence: RecurrenceType = RecurrenceType.ONCE
    interval: float = 0
    cron_expr: Optional[CronExpression] = None
    max_retries: int = 3
    retry_count: int = 0
    retry_delay_base: float = 1.0
    status: TaskStatus = TaskStatus.PENDING
    result: Any = None
    error: Optional[str] = None
    idempotency_key: Optional[str] = None
    timeout: float = 300  # 5 minutes default
    created_at: float = field(default_factory=time.time)
    started_at: Optional[float] = None
    completed_at: Optional[float] = None

    def __lt__(self, other):
        # For heap comparison: (scheduled_time, -priority)
        if self.scheduled_time != other.scheduled_time:
            return self.scheduled_time < other.scheduled_time
        return self.priority > other.priority  # Higher priority wins ties

    def generate_idempotency_key(self) -> str:
        """Generate deterministic idempotency key for this task execution."""
        if self.idempotency_key:
            return self.idempotency_key

        # Combine task_id with scheduled execution time
        key_data = f"{self.task_id}:{int(self.scheduled_time)}"
        return hashlib.sha256(key_data.encode()).hexdigest()[:16]


# ============================================================
# Task Scheduler
# ============================================================

class TaskScheduler:
    """
    Production-ready task scheduler with:
    - Priority queue based scheduling
    - Cron expression support
    - Failure recovery with retries
    - Idempotent execution
    - Thread-safe operations
    """

    def __init__(
        self,
        num_workers: int = 4,
        idempotency_store: Optional[IdempotencyStore] = None
    ):
        self.task_queue: List[Task] = []
        self.tasks: Dict[str, Task] = {}
        self.lock = threading.Lock()
        self.condition = threading.Condition(self.lock)
        self.running = False
        self.num_workers = num_workers
        self.workers: List[threading.Thread] = []
        self.idempotency_store = idempotency_store or InMemoryIdempotencyStore()

        # Heartbeat tracking for failure detection
        self.worker_heartbeats: Dict[int, float] = {}
        self.heartbeat_interval = 10  # seconds
        self.heartbeat_timeout = 30  # seconds

    def schedule(
        self,
        func: Callable,
        delay: float = 0,
        priority: int = 0,
        name: str = "",
        max_retries: int = 3,
        timeout: float = 300,
        idempotency_key: str = None,
        *args,
        **kwargs
    ) -> str:
        """Schedule a one-time task."""
        task = Task(
            task_id=str(uuid.uuid4())[:8],
            name=name or func.__name__,
            func=func,
            args=args,
            kwargs=kwargs,
            scheduled_time=time.time() + delay,
            priority=priority,
            max_retries=max_retries,
            timeout=timeout,
            idempotency_key=idempotency_key
        )

        return self._add_task(task)

    def schedule_recurring(
        self,
        func: Callable,
        interval: float,
        priority: int = 0,
        name: str = "",
        start_delay: float = 0,
        max_retries: int = 3,
        *args,
        **kwargs
    ) -> str:
        """Schedule a recurring task with fixed interval."""
        task = Task(
            task_id=str(uuid.uuid4())[:8],
            name=name or func.__name__,
            func=func,
            args=args,
            kwargs=kwargs,
            scheduled_time=time.time() + start_delay,
            priority=priority,
            recurrence=RecurrenceType.INTERVAL,
            interval=interval,
            max_retries=max_retries
        )

        return self._add_task(task)

    def schedule_cron(
        self,
        func: Callable,
        cron_expression: str,
        priority: int = 0,
        name: str = "",
        max_retries: int = 3,
        *args,
        **kwargs
    ) -> str:
        """Schedule a task with cron expression."""
        cron = CronExpression(cron_expression)
        next_run = cron.next_execution()

        task = Task(
            task_id=str(uuid.uuid4())[:8],
            name=name or func.__name__,
            func=func,
            args=args,
            kwargs=kwargs,
            scheduled_time=next_run.timestamp(),
            priority=priority,
            recurrence=RecurrenceType.CRON,
            cron_expr=cron,
            max_retries=max_retries
        )

        return self._add_task(task)

    def _add_task(self, task: Task) -> str:
        """Add task to queue with thread safety."""
        with self.condition:
            heapq.heappush(self.task_queue, task)
            self.tasks[task.task_id] = task
            self.condition.notify()
            logger.info(f"Scheduled task '{task.name}' ({task.task_id}) for {datetime.fromtimestamp(task.scheduled_time)}")

        return task.task_id

    def cancel(self, task_id: str) -> bool:
        """Cancel a pending task."""
        with self.lock:
            if task_id in self.tasks:
                task = self.tasks[task_id]
                if task.status == TaskStatus.PENDING:
                    task.status = TaskStatus.CANCELLED
                    logger.info(f"Cancelled task '{task.name}' ({task_id})")
                    return True
        return False

    def get_status(self, task_id: str) -> Optional[Dict]:
        """Get detailed task status."""
        with self.lock:
            task = self.tasks.get(task_id)
            if task:
                return {
                    'task_id': task.task_id,
                    'name': task.name,
                    'status': task.status.value,
                    'scheduled_time': datetime.fromtimestamp(task.scheduled_time).isoformat(),
                    'retry_count': task.retry_count,
                    'max_retries': task.max_retries,
                    'result': task.result,
                    'error': task.error,
                    'created_at': datetime.fromtimestamp(task.created_at).isoformat(),
                    'started_at': datetime.fromtimestamp(task.started_at).isoformat() if task.started_at else None,
                    'completed_at': datetime.fromtimestamp(task.completed_at).isoformat() if task.completed_at else None
                }
        return None

    def _worker(self, worker_id: int):
        """Worker thread that processes tasks."""
        logger.info(f"Worker-{worker_id} started")

        while self.running:
            task = None

            with self.condition:
                # Update heartbeat
                self.worker_heartbeats[worker_id] = time.time()

                # Wait for task to be due
                while self.running:
                    if not self.task_queue:
                        self.condition.wait(timeout=1.0)
                        continue

                    next_task = self.task_queue[0]
                    wait_time = next_task.scheduled_time - time.time()

                    if wait_time <= 0:
                        # Task is due
                        task = heapq.heappop(self.task_queue)
                        break
                    else:
                        # Wait until task is due or new task arrives
                        self.condition.wait(timeout=min(wait_time, 1.0))

                if not self.running:
                    break

            if task and task.status == TaskStatus.PENDING:
                self._execute_task(task, worker_id)

    def _execute_task(self, task: Task, worker_id: int):
        """Execute a task with idempotency and retry handling."""
        idempotency_key = task.generate_idempotency_key()

        # Check idempotency
        if not self.idempotency_store.check_and_set(idempotency_key):
            cached_result = self.idempotency_store.get_result(idempotency_key)
            logger.info(f"Task '{task.name}' already executed (idempotent), returning cached result")
            task.result = cached_result
            task.status = TaskStatus.COMPLETED
            return

        task.status = TaskStatus.RUNNING
        task.started_at = time.time()

        try:
            logger.info(f"Worker-{worker_id} executing task '{task.name}' ({task.task_id})")
            result = task.func(*task.args, **task.kwargs)

            task.result = result
            task.status = TaskStatus.COMPLETED
            task.completed_at = time.time()

            # Cache result for idempotency
            self.idempotency_store.set_result(idempotency_key, result)

            logger.info(f"Task '{task.name}' completed successfully: {result}")

            # Schedule next occurrence for recurring tasks
            self._schedule_next_occurrence(task)

        except Exception as e:
            task.error = str(e)
            logger.error(f"Task '{task.name}' failed: {e}")

            # Retry logic
            if task.retry_count < task.max_retries:
                self._schedule_retry(task)
            else:
                task.status = TaskStatus.FAILED
                task.completed_at = time.time()
                logger.error(f"Task '{task.name}' exhausted retries, marked as FAILED")

    def _schedule_retry(self, task: Task):
        """Schedule task retry with exponential backoff."""
        task.retry_count += 1

        # Exponential backoff with jitter
        delay = task.retry_delay_base * (2 ** (task.retry_count - 1))
        delay = delay * (0.5 + 0.5 * (hash(task.task_id) % 100) / 100)  # Add jitter

        task.scheduled_time = time.time() + delay
        task.status = TaskStatus.RETRYING
        task.error = None

        with self.condition:
            heapq.heappush(self.task_queue, task)
            self.condition.notify()

        logger.info(f"Scheduled retry {task.retry_count}/{task.max_retries} for task '{task.name}' in {delay:.1f}s")

    def _schedule_next_occurrence(self, task: Task):
        """Schedule next occurrence for recurring tasks."""
        if task.recurrence == RecurrenceType.ONCE:
            return

        # Create new task instance for next occurrence
        if task.recurrence == RecurrenceType.INTERVAL:
            next_time = time.time() + task.interval
        elif task.recurrence == RecurrenceType.CRON:
            next_time = task.cron_expr.next_execution().timestamp()
        else:
            return

        new_task = Task(
            task_id=str(uuid.uuid4())[:8],
            name=task.name,
            func=task.func,
            args=task.args,
            kwargs=task.kwargs,
            scheduled_time=next_time,
            priority=task.priority,
            recurrence=task.recurrence,
            interval=task.interval,
            cron_expr=task.cron_expr,
            max_retries=task.max_retries
        )

        with self.condition:
            heapq.heappush(self.task_queue, new_task)
            self.tasks[new_task.task_id] = new_task
            self.condition.notify()

        logger.info(f"Scheduled next occurrence of '{task.name}' for {datetime.fromtimestamp(next_time)}")

    def start(self):
        """Start the scheduler."""
        self.running = True

        for i in range(self.num_workers):
            worker = threading.Thread(
                target=self._worker,
                args=(i,),
                name=f"Worker-{i}",
                daemon=True
            )
            worker.start()
            self.workers.append(worker)

        logger.info(f"Scheduler started with {self.num_workers} workers")

    def stop(self, timeout: float = 5.0):
        """Stop the scheduler gracefully."""
        logger.info("Stopping scheduler...")
        self.running = False

        with self.condition:
            self.condition.notify_all()

        for worker in self.workers:
            worker.join(timeout=timeout)

        self.workers.clear()
        logger.info("Scheduler stopped")

    def get_stats(self) -> Dict:
        """Get scheduler statistics."""
        with self.lock:
            status_counts = {}
            for task in self.tasks.values():
                status = task.status.value
                status_counts[status] = status_counts.get(status, 0) + 1

            return {
                'total_tasks': len(self.tasks),
                'pending_in_queue': len(self.task_queue),
                'status_breakdown': status_counts,
                'active_workers': len(self.workers)
            }


# ============================================================
# Usage Example
# ============================================================

if __name__ == "__main__":
    # Define task functions
    def send_notification(user_id: int, message: str) -> str:
        time.sleep(0.5)  # Simulate work
        return f"Notification sent to user {user_id}: {message}"

    def process_batch(batch_id: int) -> Dict:
        time.sleep(1)  # Simulate work
        return {"batch_id": batch_id, "processed": 100}

    def health_check() -> str:
        return f"healthy at {datetime.now().isoformat()}"

    def flaky_task() -> str:
        import random
        if random.random() < 0.7:  # 70% failure rate
            raise Exception("Random failure!")
        return "Success!"

    # Create and start scheduler
    scheduler = TaskScheduler(num_workers=2)
    scheduler.start()

    # Schedule various tasks
    task1 = scheduler.schedule(
        send_notification,
        delay=1,
        priority=10,
        name="welcome_notification",
        user_id=123,
        message="Welcome to the platform!"
    )

    task2 = scheduler.schedule(
        process_batch,
        delay=2,
        priority=5,
        name="batch_processing",
        batch_id=456
    )

    # Recurring task with interval
    task3 = scheduler.schedule_recurring(
        health_check,
        interval=5,
        name="health_monitor"
    )

    # Cron-scheduled task (every minute)
    task4 = scheduler.schedule_cron(
        lambda: logger.info("Cron task executed!"),
        "* * * * *",
        name="minutely_task"
    )

    # Task with retries
    task5 = scheduler.schedule(
        flaky_task,
        delay=3,
        name="flaky_operation",
        max_retries=5
    )

    # Let tasks run
    time.sleep(20)

    # Check statistics
    print("\n--- Scheduler Stats ---")
    print(scheduler.get_stats())

    # Check individual task status
    print("\n--- Task Status ---")
    for task_id in [task1, task2, task5]:
        status = scheduler.get_status(task_id)
        if status:
            print(f"{status['name']}: {status['status']}")

    scheduler.stop()
```

### Go Implementation

```go
package main

import (
	"container/heap"
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"log"
	"math"
	"math/rand"
	"strconv"
	"strings"
	"sync"
	"time"
)

// TaskStatus represents the current state of a task
type TaskStatus string

const (
	StatusPending   TaskStatus = "pending"
	StatusRunning   TaskStatus = "running"
	StatusCompleted TaskStatus = "completed"
	StatusFailed    TaskStatus = "failed"
	StatusCancelled TaskStatus = "cancelled"
	StatusRetrying  TaskStatus = "retrying"
)

// RecurrenceType defines how a task recurs
type RecurrenceType string

const (
	RecurrenceOnce     RecurrenceType = "once"
	RecurrenceInterval RecurrenceType = "interval"
	RecurrenceCron     RecurrenceType = "cron"
)

// ============================================================
// Cron Expression Parser
// ============================================================

// CronField represents a single field in a cron expression
type CronField struct {
	values map[int]bool
	min    int
	max    int
}

func NewCronField(expr string, min, max int, aliases map[string]int) (*CronField, error) {
	cf := &CronField{
		values: make(map[int]bool),
		min:    min,
		max:    max,
	}

	expr = strings.ToUpper(expr)
	for alias, val := range aliases {
		expr = strings.ReplaceAll(expr, alias, strconv.Itoa(val))
	}

	parts := strings.Split(expr, ",")
	for _, part := range parts {
		if err := cf.parsePart(part); err != nil {
			return nil, err
		}
	}

	return cf, nil
}

func (cf *CronField) parsePart(part string) error {
	if strings.Contains(part, "/") {
		// Step values: */5 or 1-10/2
		segments := strings.Split(part, "/")
		step, _ := strconv.Atoi(segments[1])

		var start, end int
		if segments[0] == "*" {
			start, end = cf.min, cf.max
		} else {
			rangeParts := strings.Split(segments[0], "-")
			start, _ = strconv.Atoi(rangeParts[0])
			end, _ = strconv.Atoi(rangeParts[1])
		}

		for i := start; i <= end; i += step {
			cf.values[i] = true
		}
	} else if strings.Contains(part, "-") {
		// Range: 1-5
		rangeParts := strings.Split(part, "-")
		start, _ := strconv.Atoi(rangeParts[0])
		end, _ := strconv.Atoi(rangeParts[1])
		for i := start; i <= end; i++ {
			cf.values[i] = true
		}
	} else if part == "*" {
		for i := cf.min; i <= cf.max; i++ {
			cf.values[i] = true
		}
	} else {
		val, _ := strconv.Atoi(part)
		cf.values[val] = true
	}
	return nil
}

func (cf *CronField) Matches(value int) bool {
	return cf.values[value]
}

// CronExpression parses and evaluates cron expressions
type CronExpression struct {
	minute *CronField
	hour   *CronField
	day    *CronField
	month  *CronField
	dow    *CronField
	expr   string
}

var monthAliases = map[string]int{
	"JAN": 1, "FEB": 2, "MAR": 3, "APR": 4, "MAY": 5, "JUN": 6,
	"JUL": 7, "AUG": 8, "SEP": 9, "OCT": 10, "NOV": 11, "DEC": 12,
}

var dowAliases = map[string]int{
	"SUN": 0, "MON": 1, "TUE": 2, "WED": 3, "THU": 4, "FRI": 5, "SAT": 6,
}

func NewCronExpression(expression string) (*CronExpression, error) {
	parts := strings.Fields(expression)
	if len(parts) != 5 {
		return nil, fmt.Errorf("cron expression must have 5 fields, got %d", len(parts))
	}

	minute, _ := NewCronField(parts[0], 0, 59, nil)
	hour, _ := NewCronField(parts[1], 0, 23, nil)
	day, _ := NewCronField(parts[2], 1, 31, nil)
	month, _ := NewCronField(parts[3], 1, 12, monthAliases)
	dow, _ := NewCronField(parts[4], 0, 6, dowAliases)

	return &CronExpression{
		minute: minute,
		hour:   hour,
		day:    day,
		month:  month,
		dow:    dow,
		expr:   expression,
	}, nil
}

func (ce *CronExpression) NextExecution(from time.Time) time.Time {
	t := from.Truncate(time.Minute).Add(time.Minute)

	maxIterations := 4 * 366 * 24 * 60
	for i := 0; i < maxIterations; i++ {
		if ce.matches(t) {
			return t
		}
		t = t.Add(time.Minute)
	}

	return time.Time{}
}

func (ce *CronExpression) matches(t time.Time) bool {
	return ce.minute.Matches(t.Minute()) &&
		ce.hour.Matches(t.Hour()) &&
		ce.day.Matches(t.Day()) &&
		ce.month.Matches(int(t.Month())) &&
		ce.dow.Matches(int(t.Weekday()))
}

// ============================================================
// Idempotency Store
// ============================================================

type IdempotencyStore interface {
	CheckAndSet(key string, ttl time.Duration) bool
	GetResult(key string) (interface{}, bool)
	SetResult(key string, result interface{}, ttl time.Duration)
}

type InMemoryIdempotencyStore struct {
	mu      sync.RWMutex
	keys    map[string]time.Time
	results map[string]interface{}
}

func NewInMemoryIdempotencyStore() *InMemoryIdempotencyStore {
	return &InMemoryIdempotencyStore{
		keys:    make(map[string]time.Time),
		results: make(map[string]interface{}),
	}
}

func (s *InMemoryIdempotencyStore) CheckAndSet(key string, ttl time.Duration) bool {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.cleanupExpired()

	if _, exists := s.keys[key]; exists {
		return false
	}

	s.keys[key] = time.Now().Add(ttl)
	return true
}

func (s *InMemoryIdempotencyStore) GetResult(key string) (interface{}, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	if expiry, exists := s.keys[key]; exists && expiry.After(time.Now()) {
		result, ok := s.results[key]
		return result, ok
	}
	return nil, false
}

func (s *InMemoryIdempotencyStore) SetResult(key string, result interface{}, ttl time.Duration) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.keys[key] = time.Now().Add(ttl)
	s.results[key] = result
}

func (s *InMemoryIdempotencyStore) cleanupExpired() {
	now := time.Now()
	for k, expiry := range s.keys {
		if expiry.Before(now) {
			delete(s.keys, k)
			delete(s.results, k)
		}
	}
}

// ============================================================
// Task Definition
// ============================================================

type Task struct {
	ID             string
	Name           string
	Func           func() (interface{}, error)
	ScheduledTime  time.Time
	Priority       int
	Recurrence     RecurrenceType
	Interval       time.Duration
	CronExpr       *CronExpression
	MaxRetries     int
	RetryCount     int
	RetryDelayBase time.Duration
	Status         TaskStatus
	Result         interface{}
	Error          error
	IdempotencyKey string
	Timeout        time.Duration
	CreatedAt      time.Time
	StartedAt      time.Time
	CompletedAt    time.Time
	index          int // for heap
}

func (t *Task) GenerateIdempotencyKey() string {
	if t.IdempotencyKey != "" {
		return t.IdempotencyKey
	}
	data := fmt.Sprintf("%s:%d", t.ID, t.ScheduledTime.Unix())
	hash := sha256.Sum256([]byte(data))
	return hex.EncodeToString(hash[:])[:16]
}

// TaskQueue implements heap.Interface
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

// ============================================================
// Task Scheduler
// ============================================================

type Scheduler struct {
	queue            TaskQueue
	tasks            map[string]*Task
	mu               sync.Mutex
	cond             *sync.Cond
	running          bool
	numWorkers       int
	wg               sync.WaitGroup
	idempotencyStore IdempotencyStore
	ctx              context.Context
	cancel           context.CancelFunc
	taskIDCounter    int
}

func NewScheduler(numWorkers int) *Scheduler {
	s := &Scheduler{
		queue:            make(TaskQueue, 0),
		tasks:            make(map[string]*Task),
		numWorkers:       numWorkers,
		idempotencyStore: NewInMemoryIdempotencyStore(),
	}
	s.cond = sync.NewCond(&s.mu)
	heap.Init(&s.queue)
	return s
}

func (s *Scheduler) generateTaskID() string {
	s.taskIDCounter++
	return fmt.Sprintf("task-%d", s.taskIDCounter)
}

func (s *Scheduler) Schedule(name string, delay time.Duration, priority int, fn func() (interface{}, error)) string {
	s.mu.Lock()
	defer s.mu.Unlock()

	task := &Task{
		ID:             s.generateTaskID(),
		Name:           name,
		Func:           fn,
		ScheduledTime:  time.Now().Add(delay),
		Priority:       priority,
		Recurrence:     RecurrenceOnce,
		MaxRetries:     3,
		RetryDelayBase: time.Second,
		Status:         StatusPending,
		Timeout:        5 * time.Minute,
		CreatedAt:      time.Now(),
	}

	heap.Push(&s.queue, task)
	s.tasks[task.ID] = task
	s.cond.Signal()

	log.Printf("Scheduled task '%s' (%s) for %v", task.Name, task.ID, task.ScheduledTime)
	return task.ID
}

func (s *Scheduler) ScheduleRecurring(name string, interval time.Duration, priority int, fn func() (interface{}, error)) string {
	s.mu.Lock()
	defer s.mu.Unlock()

	task := &Task{
		ID:             s.generateTaskID(),
		Name:           name,
		Func:           fn,
		ScheduledTime:  time.Now(),
		Priority:       priority,
		Recurrence:     RecurrenceInterval,
		Interval:       interval,
		MaxRetries:     3,
		RetryDelayBase: time.Second,
		Status:         StatusPending,
		Timeout:        5 * time.Minute,
		CreatedAt:      time.Now(),
	}

	heap.Push(&s.queue, task)
	s.tasks[task.ID] = task
	s.cond.Signal()

	log.Printf("Scheduled recurring task '%s' (%s) with interval %v", task.Name, task.ID, interval)
	return task.ID
}

func (s *Scheduler) ScheduleCron(name string, cronExpr string, priority int, fn func() (interface{}, error)) (string, error) {
	cron, err := NewCronExpression(cronExpr)
	if err != nil {
		return "", err
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	nextRun := cron.NextExecution(time.Now())

	task := &Task{
		ID:             s.generateTaskID(),
		Name:           name,
		Func:           fn,
		ScheduledTime:  nextRun,
		Priority:       priority,
		Recurrence:     RecurrenceCron,
		CronExpr:       cron,
		MaxRetries:     3,
		RetryDelayBase: time.Second,
		Status:         StatusPending,
		Timeout:        5 * time.Minute,
		CreatedAt:      time.Now(),
	}

	heap.Push(&s.queue, task)
	s.tasks[task.ID] = task
	s.cond.Signal()

	log.Printf("Scheduled cron task '%s' (%s) for %v", task.Name, task.ID, nextRun)
	return task.ID, nil
}

func (s *Scheduler) Cancel(taskID string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()

	if task, exists := s.tasks[taskID]; exists {
		if task.Status == StatusPending {
			task.Status = StatusCancelled
			log.Printf("Cancelled task '%s' (%s)", task.Name, taskID)
			return true
		}
	}
	return false
}

func (s *Scheduler) GetStatus(taskID string) map[string]interface{} {
	s.mu.Lock()
	defer s.mu.Unlock()

	task, exists := s.tasks[taskID]
	if !exists {
		return nil
	}

	return map[string]interface{}{
		"task_id":        task.ID,
		"name":           task.Name,
		"status":         task.Status,
		"scheduled_time": task.ScheduledTime,
		"retry_count":    task.RetryCount,
		"max_retries":    task.MaxRetries,
		"result":         task.Result,
		"error":          task.Error,
	}
}

func (s *Scheduler) worker(id int) {
	defer s.wg.Done()
	log.Printf("Worker-%d started", id)

	for {
		s.mu.Lock()

		for s.running && (len(s.queue) == 0 || s.queue[0].ScheduledTime.After(time.Now())) {
			if len(s.queue) > 0 {
				waitTime := time.Until(s.queue[0].ScheduledTime)
				if waitTime > 0 {
					timer := time.AfterFunc(waitTime, func() {
						s.cond.Broadcast()
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
			s.executeTask(task, id)
		}
	}
}

func (s *Scheduler) executeTask(task *Task, workerID int) {
	idempotencyKey := task.GenerateIdempotencyKey()

	// Check idempotency
	if !s.idempotencyStore.CheckAndSet(idempotencyKey, 24*time.Hour) {
		if result, ok := s.idempotencyStore.GetResult(idempotencyKey); ok {
			log.Printf("Task '%s' already executed (idempotent), returning cached result", task.Name)
			task.Result = result
			task.Status = StatusCompleted
			return
		}
	}

	task.Status = StatusRunning
	task.StartedAt = time.Now()

	log.Printf("Worker-%d executing task '%s' (%s)", workerID, task.Name, task.ID)

	result, err := task.Func()

	s.mu.Lock()
	if err != nil {
		task.Error = err
		log.Printf("Task '%s' failed: %v", task.Name, err)

		if task.RetryCount < task.MaxRetries {
			s.scheduleRetry(task)
		} else {
			task.Status = StatusFailed
			task.CompletedAt = time.Now()
			log.Printf("Task '%s' exhausted retries, marked as FAILED", task.Name)
		}
	} else {
		task.Result = result
		task.Status = StatusCompleted
		task.CompletedAt = time.Now()

		s.idempotencyStore.SetResult(idempotencyKey, result, 24*time.Hour)

		log.Printf("Task '%s' completed successfully: %v", task.Name, result)

		s.scheduleNextOccurrence(task)
	}
	s.mu.Unlock()
}

func (s *Scheduler) scheduleRetry(task *Task) {
	task.RetryCount++

	// Exponential backoff with jitter
	delay := float64(task.RetryDelayBase) * math.Pow(2, float64(task.RetryCount-1))
	jitter := 0.5 + 0.5*rand.Float64()
	delay = delay * jitter

	task.ScheduledTime = time.Now().Add(time.Duration(delay))
	task.Status = StatusRetrying
	task.Error = nil

	heap.Push(&s.queue, task)
	s.cond.Signal()

	log.Printf("Scheduled retry %d/%d for task '%s' in %v",
		task.RetryCount, task.MaxRetries, task.Name, time.Duration(delay))
}

func (s *Scheduler) scheduleNextOccurrence(task *Task) {
	if task.Recurrence == RecurrenceOnce {
		return
	}

	var nextTime time.Time
	if task.Recurrence == RecurrenceInterval {
		nextTime = time.Now().Add(task.Interval)
	} else if task.Recurrence == RecurrenceCron {
		nextTime = task.CronExpr.NextExecution(time.Now())
	} else {
		return
	}

	newTask := &Task{
		ID:             s.generateTaskID(),
		Name:           task.Name,
		Func:           task.Func,
		ScheduledTime:  nextTime,
		Priority:       task.Priority,
		Recurrence:     task.Recurrence,
		Interval:       task.Interval,
		CronExpr:       task.CronExpr,
		MaxRetries:     task.MaxRetries,
		RetryDelayBase: task.RetryDelayBase,
		Status:         StatusPending,
		Timeout:        task.Timeout,
		CreatedAt:      time.Now(),
	}

	heap.Push(&s.queue, newTask)
	s.tasks[newTask.ID] = newTask
	s.cond.Signal()

	log.Printf("Scheduled next occurrence of '%s' for %v", task.Name, nextTime)
}

func (s *Scheduler) Start() {
	s.mu.Lock()
	s.running = true
	s.ctx, s.cancel = context.WithCancel(context.Background())
	s.mu.Unlock()

	for i := 0; i < s.numWorkers; i++ {
		s.wg.Add(1)
		go s.worker(i)
	}

	log.Printf("Scheduler started with %d workers", s.numWorkers)
}

func (s *Scheduler) Stop() {
	s.mu.Lock()
	s.running = false
	s.cancel()
	s.cond.Broadcast()
	s.mu.Unlock()

	s.wg.Wait()
	log.Println("Scheduler stopped")
}

func (s *Scheduler) GetStats() map[string]interface{} {
	s.mu.Lock()
	defer s.mu.Unlock()

	statusCounts := make(map[TaskStatus]int)
	for _, task := range s.tasks {
		statusCounts[task.Status]++
	}

	return map[string]interface{}{
		"total_tasks":      len(s.tasks),
		"pending_in_queue": len(s.queue),
		"status_breakdown": statusCounts,
		"active_workers":   s.numWorkers,
	}
}

// ============================================================
// Main
// ============================================================

func main() {
	scheduler := NewScheduler(2)
	scheduler.Start()

	// One-time task
	scheduler.Schedule("send_notification", time.Second, 10, func() (interface{}, error) {
		return "Notification sent!", nil
	})

	// Recurring task
	scheduler.ScheduleRecurring("health_check", 5*time.Second, 5, func() (interface{}, error) {
		return fmt.Sprintf("healthy at %v", time.Now().Format("15:04:05")), nil
	})

	// Cron task (every minute)
	scheduler.ScheduleCron("minutely_report", "* * * * *", 3, func() (interface{}, error) {
		return "Minutely report generated", nil
	})

	// Flaky task to demonstrate retries
	scheduler.Schedule("flaky_operation", 2*time.Second, 5, func() (interface{}, error) {
		if rand.Float64() < 0.7 {
			return nil, fmt.Errorf("random failure")
		}
		return "Success!", nil
	})

	time.Sleep(30 * time.Second)

	fmt.Println("\n--- Scheduler Stats ---")
	stats := scheduler.GetStats()
	fmt.Printf("%+v\n", stats)

	scheduler.Stop()
}
```

---

## Design Considerations Summary

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 16px;">Architecture Decision Matrix</h4>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Single Node</div>
<div style="color: #c9d1d9; font-size: 10px; line-height: 1.6;">
Use when: < 10K tasks, simple ops<br>
Data structure: Binary min-heap<br>
Concurrency: Condition variables<br>
Recovery: Process restart
</div>
</div>

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Multi-Node (Leader)</div>
<div style="color: #c9d1d9; font-size: 10px; line-height: 1.6;">
Use when: Need HA, < 100K tasks<br>
Coordination: ZooKeeper/etcd<br>
Concurrency: Leader election<br>
Recovery: Automatic failover
</div>
</div>

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #a371f7; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Multi-Node (Partitioned)</div>
<div style="color: #c9d1d9; font-size: 10px; line-height: 1.6;">
Use when: > 100K tasks, horizontal scale<br>
Coordination: Consistent hashing<br>
Concurrency: Partition locks<br>
Recovery: Partition rebalancing
</div>
</div>

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #ffa657; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Database-Backed</div>
<div style="color: #c9d1d9; font-size: 10px; line-height: 1.6;">
Use when: Durability critical, audit needed<br>
Data structure: Indexed table<br>
Concurrency: SKIP LOCKED<br>
Recovery: Transaction rollback
</div>
</div>

</div>
</div>

---

## Related Topics

- [[Priority Queues]](/data-structures/priority-queue) - Heap data structure internals
- [[Distributed Locks]](/system-design/distributed-locking) - Lock implementation patterns
- [[Rate Limiting]](/system-design/rate-limiting) - Token bucket and leaky bucket
- [[Message Queues]](/system-design/message-queues) - Pub/sub and work queues
- [[CAP Theorem]](/system-design/cap-theorem) - Distributed systems trade-offs
- [[Exponential Backoff]](/algorithms/exponential-backoff) - Retry strategy algorithms
