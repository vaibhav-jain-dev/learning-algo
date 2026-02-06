/**
 * First Duplicate Without Mutation
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: index-marking
 * Parent: 13-first-duplicate-value
 */
(function() {
    'use strict';

    const problem = {
        name: 'First Duplicate Without Mutation',
        difficulty: 'Medium',
        algorithm: 'index-marking',
        parent: '13-first-duplicate-value',
        description: 'Find the first duplicate value in an array of integers between 1 and n without modifying the input array. Use Floyd cycle detection treating array values as next-pointers.',
        problem: 'Treat array as a linked list where value at index i points to index array[i]. Use slow/fast pointers to detect a cycle, then find the cycle entrance which is the duplicate.',
        hints: ["Values are 1 to n in an array of length n - this guarantees a cycle exists if theres a duplicate.", "Use slow pointer (moves 1 step) and fast pointer (moves 2 steps).", "After they meet, reset one pointer to start and advance both by 1 until they meet again.", "The meeting point is the duplicate value."],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            { input: {"array": [2, 1, 5, 2, 3, 3, 4]}, output: 2, explanation: 'Floyd detection finds 2 as the first cycle entry = duplicate.' },
            { input: {"array": [1, 3, 4, 2, 2]}, output: 2, explanation: 'Cycle: 1->3->2->4->2. Duplicate is 2.' },
            { input: {"array": [3, 1, 3, 4, 2]}, output: 3, explanation: 'Cycle entrance at value 3.' }
        ],
        solutions: {
            python: `def first_duplicate_no_mutation(array):
    slow = array[0]
    fast = array[array[0]]
    while slow != fast:
        slow = array[slow]
        fast = array[array[fast]]
    slow = 0
    while slow != fast:
        slow = array[slow]
        fast = array[fast]
    return slow

if __name__=="__main__":
    print(first_duplicate_no_mutation([2,1,5,2,3,3,4]))  # 2
    print(first_duplicate_no_mutation([1,3,4,2,2]))  # 2`,
            go: `package main
import "fmt"
func firstDuplicateNoMutation(array []int) int {
    slow := array[0]; fast := array[array[0]]
    for slow != fast { slow=array[slow]; fast=array[array[fast]] }
    slow = 0
    for slow != fast { slow=array[slow]; fast=array[fast] }
    return slow
}
func main() { fmt.Println(firstDuplicateNoMutation([]int{2,1,5,2,3,3,4})) }`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '13-first-duplicate-value/twist-01-first-duplicate-without-mutation', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/13-first-duplicate-value/twist-01-first-duplicate-without-mutation'] = problem;
})();
