/**
 * Last Duplicate Value
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: index-marking
 * Parent: 13-first-duplicate-value
 */
(function() {
    'use strict';

    const problem = {
        name: 'Last Duplicate Value',
        difficulty: 'Medium',
        algorithm: 'index-marking',
        parent: '13-first-duplicate-value',
        description: 'Find the integer whose last duplicate occurrence (rightmost second appearance) comes latest in the array. Scan from right to left, returning the first duplicate found.',
        problem: 'Scan from right to left using a seen set. The first value already in the set when scanning right-to-left is the last duplicate.',
        hints: ["Iterate from the end of the array to the beginning.", "Maintain a set of seen values.", "The first repeated value found is the last duplicate in the original left-to-right sense.", "Return -1 if no duplicates exist."],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            { input: {"array": [2, 1, 5, 2, 3, 3, 4]}, output: 3, explanation: 'Scanning right-to-left: 4,3,3(dup!). Last duplicate occurrence is 3 at index 5.' },
            { input: {"array": [1, 2, 1, 3, 2]}, output: 2, explanation: 'Right-to-left: 2,3,1,2(dup!). 2 at index 4 is the last duplicate.' },
            { input: {"array": [1, 2, 3]}, output: -1, explanation: 'No duplicates.' }
        ],
        solutions: {
            python: `def last_duplicate_value(array):
    seen = set()
    for i in range(len(array)-1, -1, -1):
        if array[i] in seen:
            return array[i]
        seen.add(array[i])
    return -1

if __name__=="__main__":
    print(last_duplicate_value([2,1,5,2,3,3,4]))  # 3
    print(last_duplicate_value([1,2,3]))  # -1`,
            go: `package main
import "fmt"
func lastDuplicateValue(array []int) int {
    seen := map[int]bool{}
    for i:=len(array)-1;i>=0;i-- {
        if seen[array[i]] { return array[i] }
        seen[array[i]] = true
    }
    return -1
}
func main() { fmt.Println(lastDuplicateValue([]int{2,1,5,2,3,3,4})) }`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '13-first-duplicate-value/twist-02-last-duplicate-value', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/13-first-duplicate-value/twist-02-last-duplicate-value'] = problem;
})();
