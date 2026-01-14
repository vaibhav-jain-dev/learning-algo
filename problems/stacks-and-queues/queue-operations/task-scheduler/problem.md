# Task Scheduler

## Problem Description

Given a characters array `tasks`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer `n` that represents the cooldown period between two **same tasks** (the same letter in the array), that is, there must be at least `n` units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.

## Examples

### Example 1
```
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation:
A -> B -> idle -> A -> B -> idle -> A -> B
There is at least 2 units of time between any two same tasks.
```

### Example 2
```
Input: tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
Explanation:
On this case any permutation of size 6 would work since n = 0.
["A","A","A","B","B","B"]
["A","B","A","B","A","B"]
["B","B","B","A","A","A"]
...
And so on.
```

### Example 3
```
Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
Output: 16
Explanation:
One possible solution is:
A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A
```

### Example 4
```
Input: tasks = ["A","B","C","D","E","F"], n = 2
Output: 6
Explanation: All tasks are different, so no cooldown needed.
```

### Example 5
```
Input: tasks = ["A","A","A","B","B","B","C","C","C"], n = 2
Output: 9
Explanation:
A -> B -> C -> A -> B -> C -> A -> B -> C
No idle time needed because we have 3 different tasks.
```

## Constraints
- `1 <= task.length <= 10^4`
- `tasks[i]` is an uppercase English letter.
- The integer `n` is in the range `[0, 100]`.

## Hints

<details>
<summary>Hint 1</summary>
Think about the task that appears most frequently. This task determines the minimum number of "frames" or "cycles" needed.
</details>

<details>
<summary>Hint 2</summary>
If the most frequent task appears `maxCount` times, you need at least `maxCount` cycles. The length of each cycle is `n + 1`.
</details>

<details>
<summary>Hint 3</summary>
Calculate the number of idle slots needed. Start with the maximum possible idle time, then subtract as you fill slots with other tasks.
</details>

<details>
<summary>Hint 4</summary>
The answer is either: (maxCount - 1) * (n + 1) + countOfMaxTasks, OR the total number of tasks (whichever is larger).
</details>

## Approach

### Mathematical Formula Approach

The key insight is to think about "cycles" based on the most frequent task:

1. **Find the maximum frequency** (`maxCount`) among all tasks.

2. **Count tasks with maximum frequency** (`numMaxTasks`).

3. **Calculate minimum time**:
   - We need `maxCount - 1` full cycles of length `n + 1`
   - Plus one final partial cycle with `numMaxTasks` tasks
   - Formula: `(maxCount - 1) * (n + 1) + numMaxTasks`

4. **Handle the case when we have enough tasks**:
   - If we have enough different tasks to fill all slots, no idle time is needed
   - Return `max(formula_result, total_tasks)`

### Visual Example

For `["A","A","A","B","B","B"]`, n = 2:

```
Max frequency: 3 (both A and B appear 3 times)
Tasks with max frequency: 2 (A and B)

Frame structure (n + 1 = 3 slots per frame):
Frame 1: A _ _
Frame 2: A _ _
Frame 3: A B    (partial - only tasks with max frequency)

Fill in B:
Frame 1: A B _
Frame 2: A B _
Frame 3: A B

Result: A B idle | A B idle | A B = 8 time units

Formula: (3 - 1) * 3 + 2 = 8
```

### Heap/Queue Approach (Alternative)

Use a max heap and queue to simulate the process:
1. Put task counts in a max heap
2. Each iteration, pop tasks with highest counts, execute them
3. Put tasks in a cooldown queue
4. After cooldown, add them back to heap
5. Continue until all tasks done

### Time Complexity
- Mathematical approach: **O(n)** where n is the number of tasks
- Heap approach: **O(n log 26)** = **O(n)**

### Space Complexity
- **O(1)** - at most 26 different tasks (uppercase letters)
