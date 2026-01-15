package main

import (
	"container/heap"
	"fmt"
	"strings"
)

// leastInterval calculates minimum time to complete all tasks with cooldown constraint.
// Uses mathematical formula based on the most frequent task.
//
// Time Complexity: O(n) where n is the number of tasks
// Space Complexity: O(1) - at most 26 different tasks
func leastInterval(tasks []byte, n int) int {
	// Count frequency of each task
	taskCounts := make(map[byte]int)
	for _, task := range tasks {
		taskCounts[task]++
	}

	// Find the maximum frequency
	maxCount := 0
	for _, count := range taskCounts {
		if count > maxCount {
			maxCount = count
		}
	}

	// Count how many tasks have the maximum frequency
	numMaxTasks := 0
	for _, count := range taskCounts {
		if count == maxCount {
			numMaxTasks++
		}
	}

	// Calculate minimum time using formula
	formulaResult := (maxCount-1)*(n+1) + numMaxTasks

	// If we have enough tasks to fill all slots, no idle time needed
	if len(tasks) > formulaResult {
		return len(tasks)
	}
	return formulaResult
}

// TaskHeap is a max heap for task counts
type TaskHeap []int

func (h TaskHeap) Len() int           { return len(h) }
func (h TaskHeap) Less(i, j int) bool { return h[i] > h[j] } // Max heap
func (h TaskHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *TaskHeap) Push(x interface{}) {
	*h = append(*h, x.(int))
}

func (h *TaskHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

// CooldownItem represents a task in cooldown
type CooldownItem struct {
	count         int
	timeAvailable int
}

// leastIntervalHeap is an alternative approach using a max heap and queue simulation.
// Time Complexity: O(n * log(26)) = O(n)
// Space Complexity: O(26) = O(1)
func leastIntervalHeap(tasks []byte, n int) int {
	// Count frequency of each task
	taskCounts := make(map[byte]int)
	for _, task := range tasks {
		taskCounts[task]++
	}

	// Max heap with task counts
	maxHeap := &TaskHeap{}
	heap.Init(maxHeap)
	for _, count := range taskCounts {
		heap.Push(maxHeap, count)
	}

	// Queue for tasks in cooldown
	cooldownQueue := make([]CooldownItem, 0)

	time := 0

	for maxHeap.Len() > 0 || len(cooldownQueue) > 0 {
		time++

		if maxHeap.Len() > 0 {
			count := heap.Pop(maxHeap).(int) - 1

			if count > 0 {
				cooldownQueue = append(cooldownQueue, CooldownItem{count, time + n})
			}
		}

		// Check if any task's cooldown has finished
		if len(cooldownQueue) > 0 && cooldownQueue[0].timeAvailable == time {
			heap.Push(maxHeap, cooldownQueue[0].count)
			cooldownQueue = cooldownQueue[1:]
		}
	}

	return time
}

// leastIntervalSimulation uses simulation approach
// Time Complexity: O(total_time * 26)
// Space Complexity: O(26)
func leastIntervalSimulation(tasks []byte, n int) int {
	taskCounts := make(map[byte]int)
	for _, task := range tasks {
		taskCounts[task]++
	}

	lastUsed := make(map[byte]int)
	time := 0
	tasksDone := 0
	totalTasks := len(tasks)

	for tasksDone < totalTasks {
		time++

		var bestTask byte = 0
		bestCount := 0

		for task, count := range taskCounts {
			if count > 0 {
				last, exists := lastUsed[task]
				if !exists || time-last > n {
					if count > bestCount {
						bestCount = count
						bestTask = task
					}
				}
			}
		}

		if bestTask != 0 {
			taskCounts[bestTask]--
			lastUsed[bestTask] = time
			tasksDone++
		}
	}

	return time
}

// ScheduleResult holds the time and schedule
type ScheduleResult struct {
	Time     int
	Schedule []string
}

// TaskHeapWithName is a max heap for (count, task name)
type TaskHeapWithName []struct {
	count int
	task  byte
}

func (h TaskHeapWithName) Len() int           { return len(h) }
func (h TaskHeapWithName) Less(i, j int) bool { return h[i].count > h[j].count }
func (h TaskHeapWithName) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *TaskHeapWithName) Push(x interface{}) {
	*h = append(*h, x.(struct {
		count int
		task  byte
	}))
}

func (h *TaskHeapWithName) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

// leastIntervalWithSchedule returns both minimum time and actual schedule
func leastIntervalWithSchedule(tasks []byte, n int) ScheduleResult {
	taskCounts := make(map[byte]int)
	for _, task := range tasks {
		taskCounts[task]++
	}

	maxHeap := &TaskHeapWithName{}
	heap.Init(maxHeap)
	for task, count := range taskCounts {
		heap.Push(maxHeap, struct {
			count int
			task  byte
		}{count, task})
	}

	type cooldownEntry struct {
		count         int
		task          byte
		timeAvailable int
	}
	cooldownQueue := make([]cooldownEntry, 0)
	schedule := make([]string, 0)
	time := 0

	for maxHeap.Len() > 0 || len(cooldownQueue) > 0 {
		time++

		if maxHeap.Len() > 0 {
			item := heap.Pop(maxHeap).(struct {
				count int
				task  byte
			})
			count := item.count - 1
			task := item.task
			schedule = append(schedule, string(task))

			if count > 0 {
				cooldownQueue = append(cooldownQueue, cooldownEntry{count, task, time + n})
			}
		} else {
			schedule = append(schedule, "idle")
		}

		if len(cooldownQueue) > 0 && cooldownQueue[0].timeAvailable == time {
			entry := cooldownQueue[0]
			cooldownQueue = cooldownQueue[1:]
			heap.Push(maxHeap, struct {
				count int
				task  byte
			}{entry.count, entry.task})
		}
	}

	return ScheduleResult{time, schedule}
}

// TestCase represents a single test case
type TestCase struct {
	tasks       []byte
	n           int
	expected    int
	description string
}

func runTests() {
	testCases := []TestCase{
		{[]byte{'A', 'A', 'A', 'B', 'B', 'B'}, 2, 8, "Example 1"},
		{[]byte{'A', 'A', 'A', 'B', 'B', 'B'}, 0, 6, "No cooldown"},
		{[]byte{'A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'}, 2, 16, "Example 3"},
		{[]byte{'A', 'B', 'C', 'D', 'E', 'F'}, 2, 6, "All different tasks"},
		{[]byte{'A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'C'}, 2, 9, "Three equal tasks"},
		{[]byte{'A'}, 2, 1, "Single task"},
		{[]byte{'A', 'A'}, 2, 4, "Two same tasks with cooldown"},
		{[]byte{'A', 'A', 'A'}, 2, 7, "Three same tasks"},
		{[]byte{'A', 'B'}, 2, 2, "Two different tasks"},
		{[]byte{'A', 'A', 'B', 'B'}, 1, 4, "Cooldown 1"},
		{[]byte{'A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'C', 'D', 'D', 'E'}, 2, 12, "Complex case"},
	}

	fmt.Println("Testing leastInterval function:")
	fmt.Println(strings.Repeat("=", 70))

	allPassed := true
	for i, tc := range testCases {
		result := leastInterval(tc.tasks, tc.n)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}

		tasksStr := string(tc.tasks)
		if len(tasksStr) > 35 {
			tasksStr = tasksStr[:32] + "..."
		}
		fmt.Printf("Test %2d: %s\n", i+1, tc.description)
		fmt.Printf("         Input: tasks=%s, n=%d\n", tasksStr, tc.n)
		fmt.Printf("         Result: %d, Expected: %d [%s]\n\n", result, tc.expected, status)
	}

	fmt.Println(strings.Repeat("=", 70))
	fmt.Printf("All tests passed: %v\n\n", allPassed)

	// Compare all implementations
	fmt.Println("Comparing all implementations:")
	fmt.Println(strings.Repeat("=", 70))

	allMatch := true
	for _, tc := range testCases {
		result1 := leastInterval(tc.tasks, tc.n)
		result2 := leastIntervalHeap(tc.tasks, tc.n)
		result3 := leastIntervalSimulation(tc.tasks, tc.n)

		if result1 != result2 || result2 != result3 || result1 != tc.expected {
			allMatch = false
			fmt.Printf("MISMATCH for %s:\n", tc.description)
			fmt.Printf("  Formula: %d, Heap: %d, Simulation: %d\n", result1, result2, result3)
		}
	}

	if allMatch {
		fmt.Println("All implementations produce identical correct results!")
	}
	fmt.Println()

	// Demonstrate schedule generation
	fmt.Println("Demonstrating schedule generation:")
	fmt.Println(strings.Repeat("=", 70))

	demoCases := []struct {
		tasks []byte
		n     int
	}{
		{[]byte{'A', 'A', 'A', 'B', 'B', 'B'}, 2},
		{[]byte{'A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'C'}, 2},
	}

	for _, demo := range demoCases {
		result := leastIntervalWithSchedule(demo.tasks, demo.n)
		fmt.Printf("Tasks: %s\n", string(demo.tasks))
		fmt.Printf("Cooldown: %d\n", demo.n)
		fmt.Printf("Time: %d\n", result.Time)
		fmt.Printf("Schedule: %s\n\n", strings.Join(result.Schedule, " -> "))
	}

	// Explain the mathematical approach
	fmt.Println("Mathematical approach explanation:")
	fmt.Println(strings.Repeat("=", 70))

	tasks := []byte{'A', 'A', 'A', 'B', 'B', 'B'}
	n := 2

	taskCounts := make(map[byte]int)
	for _, task := range tasks {
		taskCounts[task]++
	}

	maxCount := 0
	for _, count := range taskCounts {
		if count > maxCount {
			maxCount = count
		}
	}

	numMaxTasks := 0
	for _, count := range taskCounts {
		if count == maxCount {
			numMaxTasks++
		}
	}

	fmt.Printf("Tasks: %s, n = %d\n", string(tasks), n)
	fmt.Printf("Task counts: %v\n", taskCounts)
	fmt.Printf("Max frequency (maxCount): %d\n", maxCount)
	fmt.Printf("Tasks with max frequency: %d\n", numMaxTasks)
	fmt.Println("\nFrame structure (n + 1 =", n+1, "slots per frame):")
	fmt.Println("  Frame 1: A _ _")
	fmt.Println("  Frame 2: A _ _")
	fmt.Println("  Frame 3: A B (partial)")
	fmt.Println("\nFormula: (maxCount - 1) * (n + 1) + numMaxTasks")
	fmt.Printf("       = (%d - 1) * (%d + 1) + %d\n", maxCount, n, numMaxTasks)
	fmt.Printf("       = %d\n", (maxCount-1)*(n+1)+numMaxTasks)
}

func main() {
	runTests()
}
