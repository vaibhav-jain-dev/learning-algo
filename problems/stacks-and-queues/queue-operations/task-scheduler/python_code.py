"""
Task Scheduler

Given tasks and a cooldown period n between same tasks,
return the minimum time to complete all tasks.
"""

from typing import List
from collections import Counter, deque
import heapq


def least_interval(tasks: List[str], n: int) -> int:
    """
    Calculate minimum time to complete all tasks with cooldown constraint.

    Uses mathematical formula based on the most frequent task.

    Time Complexity: O(n) where n is the number of tasks
    Space Complexity: O(1) - at most 26 different tasks
    """
    # Count frequency of each task
    task_counts = Counter(tasks)

    # Find the maximum frequency
    max_count = max(task_counts.values())

    # Count how many tasks have the maximum frequency
    num_max_tasks = sum(1 for count in task_counts.values() if count == max_count)

    # Calculate minimum time using formula
    # (max_count - 1) full cycles of (n + 1) slots + final partial cycle with max tasks
    formula_result = (max_count - 1) * (n + 1) + num_max_tasks

    # If we have enough tasks to fill all slots, no idle time needed
    return max(formula_result, len(tasks))


def least_interval_heap(tasks: List[str], n: int) -> int:
    """
    Alternative approach using a max heap and queue simulation.

    Uses a heap to always process the most frequent remaining task,
    and a queue to track tasks in cooldown.

    Time Complexity: O(n * log(26)) = O(n)
    Space Complexity: O(26) = O(1)
    """
    # Count frequency of each task
    task_counts = Counter(tasks)

    # Max heap (use negative values for max behavior)
    max_heap = [-count for count in task_counts.values()]
    heapq.heapify(max_heap)

    # Queue stores (count, time_available) for tasks in cooldown
    cooldown_queue = deque()

    time = 0

    while max_heap or cooldown_queue:
        time += 1

        if max_heap:
            # Execute the task with highest remaining count
            count = heapq.heappop(max_heap) + 1  # Add 1 because counts are negative

            if count < 0:  # Still have more of this task
                # Add to cooldown queue (will be available at time + n)
                cooldown_queue.append((count, time + n))

        # Check if any task's cooldown has finished
        if cooldown_queue and cooldown_queue[0][1] == time:
            count, _ = cooldown_queue.popleft()
            heapq.heappush(max_heap, count)

    return time


def least_interval_simulation(tasks: List[str], n: int) -> int:
    """
    Simulation approach - actually schedule tasks.

    Less efficient but more intuitive and produces actual schedule.

    Time Complexity: O(total_time * 26)
    Space Complexity: O(26)
    """
    task_counts = Counter(tasks)
    last_used = {}  # task -> last time it was used

    time = 0
    tasks_done = 0
    total_tasks = len(tasks)

    while tasks_done < total_tasks:
        time += 1

        # Find best task to execute (most frequent that's available)
        best_task = None
        best_count = 0

        for task, count in task_counts.items():
            if count > 0:
                # Check if task is available (cooldown passed)
                if task not in last_used or time - last_used[task] > n:
                    if count > best_count:
                        best_count = count
                        best_task = task

        if best_task:
            task_counts[best_task] -= 1
            last_used[best_task] = time
            tasks_done += 1
        # else: idle

    return time


def least_interval_with_schedule(tasks: List[str], n: int) -> tuple:
    """
    Returns both minimum time and an actual valid schedule.
    """
    task_counts = Counter(tasks)
    max_heap = [(-count, task) for task, count in task_counts.items()]
    heapq.heapify(max_heap)

    cooldown_queue = deque()  # (count, task, time_available)
    schedule = []
    time = 0

    while max_heap or cooldown_queue:
        time += 1

        if max_heap:
            count, task = heapq.heappop(max_heap)
            count += 1  # Increment (remember it's negative)
            schedule.append(task)

            if count < 0:
                cooldown_queue.append((count, task, time + n))
        else:
            schedule.append("idle")

        if cooldown_queue and cooldown_queue[0][2] == time:
            count, task, _ = cooldown_queue.popleft()
            heapq.heappush(max_heap, (count, task))

    return time, schedule


def run_tests():
    """Run comprehensive tests for task scheduler."""
    test_cases = [
        # (tasks, n, expected, description)
        (["A", "A", "A", "B", "B", "B"], 2, 8, "Example 1"),
        (["A", "A", "A", "B", "B", "B"], 0, 6, "No cooldown"),
        (["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2, 16, "Example 3"),
        (["A", "B", "C", "D", "E", "F"], 2, 6, "All different tasks"),
        (["A", "A", "A", "B", "B", "B", "C", "C", "C"], 2, 9, "Three equal tasks"),
        (["A"], 2, 1, "Single task"),
        (["A", "A"], 2, 4, "Two same tasks with cooldown"),
        (["A", "A", "A"], 2, 7, "Three same tasks"),
        (["A", "B"], 2, 2, "Two different tasks"),
        (["A", "A", "B", "B"], 1, 4, "Cooldown 1"),
        (["A", "A", "A", "B", "B", "B", "C", "C", "C", "D", "D", "E"], 2, 12, "Complex case"),
    ]

    print("Testing least_interval function:")
    print("=" * 70)

    all_passed = True
    for i, (tasks, n, expected, description) in enumerate(test_cases, 1):
        result = least_interval(tasks, n)
        status = "PASS" if result == expected else "FAIL"
        if result != expected:
            all_passed = False

        tasks_str = str(tasks) if len(str(tasks)) <= 35 else str(tasks)[:32] + "..."
        print(f"Test {i:2}: {description}")
        print(f"         Input: tasks={tasks_str}, n={n}")
        print(f"         Result: {result}, Expected: {expected} [{status}]")
        print()

    print("=" * 70)
    print(f"All tests passed: {all_passed}")
    print()

    # Compare all implementations
    print("Comparing all implementations:")
    print("=" * 70)

    all_match = True
    for tasks, n, expected, description in test_cases:
        result1 = least_interval(tasks, n)
        result2 = least_interval_heap(tasks, n)
        result3 = least_interval_simulation(tasks, n)

        if not (result1 == result2 == result3 == expected):
            all_match = False
            print(f"MISMATCH for {description}:")
            print(f"  Formula: {result1}, Heap: {result2}, Simulation: {result3}")

    if all_match:
        print("All implementations produce identical correct results!")
    print()

    # Demonstrate schedule generation
    print("Demonstrating schedule generation:")
    print("=" * 70)

    demo_cases = [
        (["A", "A", "A", "B", "B", "B"], 2),
        (["A", "A", "A", "B", "B", "B", "C", "C", "C"], 2),
        (["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2),
    ]

    for tasks, n in demo_cases:
        time, schedule = least_interval_with_schedule(tasks, n)
        print(f"Tasks: {tasks}")
        print(f"Cooldown: {n}")
        print(f"Time: {time}")
        print(f"Schedule: {' -> '.join(schedule)}")
        print()

    # Explain the mathematical approach
    print("Mathematical approach explanation:")
    print("=" * 70)
    tasks = ["A", "A", "A", "B", "B", "B"]
    n = 2

    task_counts = Counter(tasks)
    max_count = max(task_counts.values())
    num_max_tasks = sum(1 for c in task_counts.values() if c == max_count)

    print(f"Tasks: {tasks}, n = {n}")
    print(f"Task counts: {dict(task_counts)}")
    print(f"Max frequency (maxCount): {max_count}")
    print(f"Tasks with max frequency: {num_max_tasks}")
    print(f"\nFrame structure (n + 1 = {n + 1} slots per frame):")
    print(f"  Frame 1: A _ _")
    print(f"  Frame 2: A _ _")
    print(f"  Frame 3: A B (partial)")
    print(f"\nFormula: (maxCount - 1) * (n + 1) + numMaxTasks")
    print(f"       = ({max_count} - 1) * ({n} + 1) + {num_max_tasks}")
    print(f"       = {(max_count - 1) * (n + 1) + num_max_tasks}")


if __name__ == "__main__":
    run_tests()
