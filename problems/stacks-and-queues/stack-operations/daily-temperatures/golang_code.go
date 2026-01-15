package main

import (
	"fmt"
	"reflect"
	"strings"
)

// dailyTemperatures finds days until warmer temperature using a monotonic decreasing stack.
// The stack stores indices of temperatures in decreasing order.
// When we find a warmer temperature, we resolve all pending colder days.
//
// Time Complexity: O(n) - each element pushed and popped at most once
// Space Complexity: O(n) - for the stack and result array
func dailyTemperatures(temperatures []int) []int {
	n := len(temperatures)
	result := make([]int, n)
	stack := make([]int, 0) // Stack of indices

	for i := 0; i < n; i++ {
		// While current temperature is warmer than temperature at stack's top index
		for len(stack) > 0 && temperatures[i] > temperatures[stack[len(stack)-1]] {
			prevIndex := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			result[prevIndex] = i - prevIndex
		}
		stack = append(stack, i)
	}

	// Remaining indices in stack have no warmer future day (already 0)
	return result
}

// dailyTemperaturesBruteForce is the brute force approach - check every future day.
// Time Complexity: O(n^2)
// Space Complexity: O(n) for result array
func dailyTemperaturesBruteForce(temperatures []int) []int {
	n := len(temperatures)
	result := make([]int, n)

	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if temperatures[j] > temperatures[i] {
				result[i] = j - i
				break
			}
		}
	}

	return result
}

// dailyTemperaturesReverse processes from right to left.
// Uses the result array to jump ahead and find the next warmer day.
//
// Time Complexity: O(n) - amortized
// Space Complexity: O(n) for result array (no extra stack needed)
func dailyTemperaturesReverse(temperatures []int) []int {
	n := len(temperatures)
	result := make([]int, n)

	for i := n - 2; i >= 0; i-- {
		j := i + 1

		for j < n {
			if temperatures[j] > temperatures[i] {
				result[i] = j - i
				break
			} else if result[j] == 0 {
				// No warmer day exists after j
				break
			} else {
				// Jump ahead using result[j]
				j += result[j]
			}
		}
	}

	return result
}

// TraceResult holds the result and execution trace
type TraceResult struct {
	Result []int
	Trace  []string
}

// dailyTemperaturesWithTrace returns result with execution trace
func dailyTemperaturesWithTrace(temperatures []int) TraceResult {
	n := len(temperatures)
	result := make([]int, n)
	stack := make([]int, 0)
	trace := make([]string, 0)

	for i := 0; i < n; i++ {
		trace = append(trace, fmt.Sprintf("\nDay %d: Temperature = %d", i, temperatures[i]))

		stackInfo := make([]string, len(stack))
		for j, idx := range stack {
			stackInfo[j] = fmt.Sprintf("(%d, %d)", idx, temperatures[idx])
		}
		trace = append(trace, fmt.Sprintf("  Stack before: [%s]", strings.Join(stackInfo, ", ")))

		for len(stack) > 0 && temperatures[i] > temperatures[stack[len(stack)-1]] {
			prevIndex := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			result[prevIndex] = i - prevIndex
			trace = append(trace, fmt.Sprintf("  Pop index %d (temp %d): Wait %d days",
				prevIndex, temperatures[prevIndex], result[prevIndex]))
		}

		stack = append(stack, i)
		trace = append(trace, fmt.Sprintf("  Push index %d", i))

		stackInfoAfter := make([]string, len(stack))
		for j, idx := range stack {
			stackInfoAfter[j] = fmt.Sprintf("(%d, %d)", idx, temperatures[idx])
		}
		trace = append(trace, fmt.Sprintf("  Stack after: [%s]", strings.Join(stackInfoAfter, ", ")))
		trace = append(trace, fmt.Sprintf("  Result so far: %v", result))
	}

	return TraceResult{Result: result, Trace: trace}
}

// TestCase represents a single test case
type TestCase struct {
	temperatures []int
	expected     []int
	description  string
}

func runTests() {
	testCases := []TestCase{
		{[]int{73, 74, 75, 71, 69, 72, 76, 73}, []int{1, 1, 4, 2, 1, 1, 0, 0}, "Example 1"},
		{[]int{30, 40, 50, 60}, []int{1, 1, 1, 0}, "Strictly increasing"},
		{[]int{30, 60, 90}, []int{1, 1, 0}, "Example 3"},
		{[]int{90, 80, 70, 60}, []int{0, 0, 0, 0}, "Strictly decreasing"},
		{[]int{70, 70, 70, 70}, []int{0, 0, 0, 0}, "All equal"},
		{[]int{50}, []int{0}, "Single element"},
		{[]int{50, 60}, []int{1, 0}, "Two elements - increasing"},
		{[]int{60, 50}, []int{0, 0}, "Two elements - decreasing"},
		{[]int{55, 38, 53, 81, 61, 93, 97, 32, 43, 78}, []int{3, 1, 1, 2, 1, 1, 0, 1, 1, 0}, "Complex case"},
		{[]int{89, 62, 70, 58, 47, 47, 46, 76, 100, 70}, []int{8, 1, 5, 4, 3, 2, 1, 1, 0, 0}, "Another complex case"},
	}

	fmt.Println("Testing dailyTemperatures function:")
	fmt.Println(strings.Repeat("=", 70))

	allPassed := true
	for i, tc := range testCases {
		result := dailyTemperatures(tc.temperatures)
		status := "PASS"
		if !reflect.DeepEqual(result, tc.expected) {
			status = "FAIL"
			allPassed = false
		}

		tempsStr := fmt.Sprintf("%v", tc.temperatures)
		if len(tempsStr) > 40 {
			tempsStr = tempsStr[:37] + "..."
		}
		fmt.Printf("Test %2d: %s\n", i+1, tc.description)
		fmt.Printf("         Input: %s\n", tempsStr)
		fmt.Printf("         Result: %v\n", result)
		fmt.Printf("         Expected: %v [%s]\n\n", tc.expected, status)
	}

	fmt.Println(strings.Repeat("=", 70))
	fmt.Printf("All tests passed: %v\n\n", allPassed)

	// Test all implementations give same results
	fmt.Println("Comparing all implementations:")
	fmt.Println(strings.Repeat("=", 70))

	allMatch := true
	for _, tc := range testCases {
		result1 := dailyTemperatures(tc.temperatures)
		result2 := dailyTemperaturesBruteForce(tc.temperatures)
		result3 := dailyTemperaturesReverse(tc.temperatures)

		if !reflect.DeepEqual(result1, result2) || !reflect.DeepEqual(result2, result3) || !reflect.DeepEqual(result1, tc.expected) {
			allMatch = false
			fmt.Printf("MISMATCH for %s:\n", tc.description)
			fmt.Printf("  Monotonic stack: %v\n", result1)
			fmt.Printf("  Brute force: %v\n", result2)
			fmt.Printf("  Reverse: %v\n", result3)
			fmt.Printf("  Expected: %v\n", tc.expected)
		}
	}

	if allMatch {
		fmt.Println("All implementations produce identical correct results!")
	}
	fmt.Println()

	// Demonstrate trace functionality
	fmt.Println("Demonstrating algorithm trace:")
	fmt.Println(strings.Repeat("=", 70))

	demoTemps := []int{73, 74, 75, 71, 69, 72, 76, 73}
	traceResult := dailyTemperaturesWithTrace(demoTemps)

	fmt.Printf("Input: %v\n", demoTemps)
	fmt.Println("\nExecution trace:")
	for _, line := range traceResult.Trace {
		fmt.Println(line)
	}

	fmt.Printf("\nFinal result: %v\n", traceResult.Result)
}

func main() {
	runTests()
}
