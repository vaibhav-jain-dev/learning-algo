/**
 * First Triplicate Value
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: index-marking
 * Parent: 13-first-duplicate-value
 */
(function() {
    'use strict';

    const problem = {
        name: 'First Triplicate Value',
        difficulty: 'Medium',
        algorithm: 'index-marking',
        parent: '13-first-duplicate-value',
        description: 'Find the first value that appears at least three times in the array. Return the value whose third occurrence has the minimum index.',
        problem: 'Track count per value using a hash map. When any value count reaches 3, return it immediately.',
        hints: ["Use a hash map to count occurrences of each value.", "Scan left to right, incrementing counts.", "Return the first value whose count reaches 3.", "Cannot use simple negation marking - need actual counts."],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            { input: {"array": [2, 1, 2, 3, 2, 1, 1]}, output: 2, explanation: 'Value 2 appears at indices 0,2,4. Third occurrence at index 4 is earliest triplicate.' },
            { input: {"array": [1, 1, 2, 2, 1, 2]}, output: 1, explanation: '1 appears 3rd time at index 4, 2 appears 3rd time at index 5. 1 is first.' },
            { input: {"array": [1, 2, 3, 4]}, output: -1, explanation: 'No value appears 3 times.' }
        ],
        solutions: {
            python: `def first_triplicate_value(array):
    counts = {}
    for val in array:
        counts[val] = counts.get(val, 0) + 1
        if counts[val] == 3:
            return val
    return -1

if __name__=="__main__":
    print(first_triplicate_value([2,1,2,3,2,1,1]))  # 2
    print(first_triplicate_value([1,2,3,4]))  # -1`,
            go: `package main
import "fmt"
func firstTriplicateValue(array []int) int {
    counts := map[int]int{}
    for _, val := range array {
        counts[val]++
        if counts[val] == 3 { return val }
    }
    return -1
}
func main() { fmt.Println(firstTriplicateValue([]int{2,1,2,3,2,1,1})) }`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '13-first-duplicate-value/twist-04-first-triplicate-value', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/13-first-duplicate-value/twist-04-first-triplicate-value'] = problem;
})();
