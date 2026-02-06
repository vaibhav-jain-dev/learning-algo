/**
 * K-th Duplicate Value
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: index-marking
 * Parent: 13-first-duplicate-value
 */
(function() {
    'use strict';

    const problem = {
        name: 'K-th Duplicate Value',
        difficulty: 'Hard',
        algorithm: 'index-marking',
        parent: '13-first-duplicate-value',
        description: 'Find the K-th value to appear as a duplicate when scanning left to right. K=1 is the original first-duplicate problem.',
        problem: 'Scan left to right with a seen set. Each time a duplicate is found, increment a counter. Return the value when counter reaches K.',
        hints: ["Maintain a set of seen values and a duplicate counter.", "When a value is already in the set, increment the counter.", "Return the value when counter equals K.", "Return -1 if fewer than K duplicates exist."],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            { input: {"array": [2, 1, 5, 2, 3, 3, 4], "k": 2}, output: 3, explanation: '1st duplicate: 2 (index 3). 2nd duplicate: 3 (index 5). Return 3.' },
            { input: {"array": [2, 1, 5, 2, 3, 3, 4], "k": 1}, output: 2, explanation: 'K=1 is the standard first duplicate.' },
            { input: {"array": [1, 2, 3], "k": 1}, output: -1, explanation: 'No duplicates exist.' }
        ],
        solutions: {
            python: `def kth_duplicate_value(array, k):
    seen = set()
    count = 0
    for val in array:
        if val in seen:
            count += 1
            if count == k:
                return val
        seen.add(val)
    return -1

if __name__=="__main__":
    print(kth_duplicate_value([2,1,5,2,3,3,4], 2))  # 3
    print(kth_duplicate_value([2,1,5,2,3,3,4], 1))  # 2`,
            go: `package main
import "fmt"
func kthDuplicateValue(array []int, k int) int {
    seen := map[int]bool{}
    count := 0
    for _, val := range array {
        if seen[val] { count++; if count==k { return val } }
        seen[val] = true
    }
    return -1
}
func main() { fmt.Println(kthDuplicateValue([]int{2,1,5,2,3,3,4}, 2)) }`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '13-first-duplicate-value/twist-03-kth-duplicate-value', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/13-first-duplicate-value/twist-03-kth-duplicate-value'] = problem;
})();
