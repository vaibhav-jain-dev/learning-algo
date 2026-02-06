/**
 * All First Duplicates
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: index-marking
 * Parent: 13-first-duplicate-value
 */
(function() {
    'use strict';

    const problem = {
        name: 'All First Duplicates',
        difficulty: 'Medium',
        algorithm: 'index-marking',
        parent: '13-first-duplicate-value',
        description: 'Return all values that are duplicates, in the order their second occurrence appears when scanning left to right.',
        problem: 'Scan left to right with a seen set. Each time a value is already in the set, add it to the result list (only on first duplicate detection).',
        hints: ["Use a seen set and a duplicates-found set.", "When a value is seen again and not yet in duplicates, add it to result.", "Continue scanning entire array to find all duplicates.", "Order is determined by when the second occurrence appears."],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            { input: {"array": [2, 1, 5, 2, 3, 3, 4]}, output: [2, 3], explanation: '2 duplicated at index 3, 3 duplicated at index 5. Order: [2, 3].' },
            { input: {"array": [1, 3, 2, 1, 3, 2]}, output: [1, 3, 2], explanation: 'All three values duplicate. Order of second occurrences: 1 at 3, 3 at 4, 2 at 5.' },
            { input: {"array": [1, 2, 3]}, output: [], explanation: 'No duplicates.' }
        ],
        solutions: {
            python: `def all_first_duplicates(array):
    seen = set()
    found = set()
    result = []
    for val in array:
        if val in seen and val not in found:
            result.append(val)
            found.add(val)
        seen.add(val)
    return result

if __name__=="__main__":
    print(all_first_duplicates([2,1,5,2,3,3,4]))  # [2, 3]
    print(all_first_duplicates([1,3,2,1,3,2]))  # [1, 3, 2]`,
            go: `package main
import "fmt"
func allFirstDuplicates(array []int) []int {
    seen := map[int]bool{}
    found := map[int]bool{}
    result := []int{}
    for _, val := range array {
        if seen[val] && !found[val] { result=append(result,val); found[val]=true }
        seen[val] = true
    }
    return result
}
func main() { fmt.Println(allFirstDuplicates([]int{2,1,5,2,3,3,4})) }`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '13-first-duplicate-value/twist-05-all-first-duplicates', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/13-first-duplicate-value/twist-05-all-first-duplicates'] = problem;
})();
