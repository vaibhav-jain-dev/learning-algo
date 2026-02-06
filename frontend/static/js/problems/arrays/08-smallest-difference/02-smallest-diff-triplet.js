/**
 * Smallest Diff Triplet
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Smallest Diff Triplet',
        difficulty: 'Hard',
        algorithm: 'two-pointer-diff',
        parent: '08-smallest-difference',
        description: 'Given three sorted arrays, find one element from each such that (max - min) is minimized.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
          "arr1": [
            1,
            4,
            5
          ],
          "arr2": [
            10,
            20
          ],
          "arr3": [
            14,
            19
          ]
        },
        output: "[5, 10, 14] (max-min = 14-5 = 9)",
        explanation: 'Given the input, the algorithm processes it to produce [5, 10, 14] (max-min = 14-5 = 9)'
    },
    {
        input: {
          "arr1": [
            1,
            2,
            3
          ],
          "arr2": [
            2,
            3,
            4
          ],
          "arr3": [
            3,
            4,
            5
          ]
        },
        output: "[3, 3, 3] or [3, 4, 3] (range = 0 or 1)",
        explanation: 'Given the input, the algorithm processes it to produce [3, 3, 3] or [3, 4, 3] (range = 0 or 1)'
    }
        ],
        solutions: {
            python: `def smallestDiffTriplet(arr1, arr2, arr3):
    """
    Smallest Diff Triplet - Find triplet from 3 sorted arrays minimizing (max - min).

    Time: O(n1 + n2 + n3) - Single pass using three pointers
    Space: O(1) - Only store pointers and result
    """
    i, j, k = 0, 0, 0
    minRange = float('inf')
    result = []

    while i < len(arr1) and j < len(arr2) and k < len(arr3):
        a, b, c = arr1[i], arr2[j], arr3[k]

        # Calculate range (max - min) for current triplet
        currentMin = min(a, b, c)
        currentMax = max(a, b, c)
        currentRange = currentMax - currentMin

        if currentRange < minRange:
            minRange = currentRange
            result = [a, b, c]

        # If range is 0, we found optimal solution
        if minRange == 0:
            break

        # Move pointer of the minimum element to try to reduce range
        if currentMin == a:
            i += 1
        elif currentMin == b:
            j += 1
        else:
            k += 1

    return result


# Test
if __name__ == "__main__":
    print(smallestDiffTriplet([1, 4, 5], [10, 20], [14, 19]))
    # Output: [5, 10, 14] (max-min = 14-5 = 9)
    print(smallestDiffTriplet([1, 2, 3], [2, 3, 4], [3, 4, 5]))
    # Output: [3, 3, 3] (range = 0)`,
            go: `package main

import "fmt"

// SmallestDiffTriplet finds triplet from 3 sorted arrays minimizing (max - min).
// Time: O(n1 + n2 + n3), Space: O(1)
func SmallestDiffTriplet(arr1, arr2, arr3 []int) []int {
    i, j, k := 0, 0, 0
    minRange := int(^uint(0) >> 1) // Max int
    var result []int

    for i < len(arr1) && j < len(arr2) && k < len(arr3) {
        a, b, c := arr1[i], arr2[j], arr3[k]

        // Calculate range for current triplet
        currentMin := min(a, min(b, c))
        currentMax := max(a, max(b, c))
        currentRange := currentMax - currentMin

        if currentRange < minRange {
            minRange = currentRange
            result = []int{a, b, c}
        }

        // If range is 0, we found optimal solution
        if minRange == 0 {
            break
        }

        // Move pointer of minimum element
        if currentMin == a {
            i++
        } else if currentMin == b {
            j++
        } else {
            k++
        }
    }

    return result
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func main() {
    fmt.Println(SmallestDiffTriplet([]int{1, 4, 5}, []int{10, 20}, []int{14, 19}))
    // Output: [5 10 14]
    fmt.Println(SmallestDiffTriplet([]int{1, 2, 3}, []int{2, 3, 4}, []int{3, 4, 5}))
    // Output: [3 3 3]
}`
        },
        twists: [
            { id: '08-smallest-difference/02-smallest-diff-triplet/twist-01-maximize-triplet-range', name: 'Maximize Triplet Range', difficulty: 'Hard' },
            { id: '08-smallest-difference/02-smallest-diff-triplet/twist-02-smallest-diff-quadruplet', name: 'Smallest Diff Quadruplet', difficulty: 'Very Hard' },
            { id: '08-smallest-difference/02-smallest-diff-triplet/twist-03-k-closest-triplets', name: 'K Closest Triplets', difficulty: 'Very Hard' },
            { id: '08-smallest-difference/02-smallest-diff-triplet/twist-04-unsorted-input-arrays', name: 'Unsorted Input Arrays', difficulty: 'Hard' },
            { id: '08-smallest-difference/02-smallest-diff-triplet/twist-05-triplet-within-threshold', name: 'Triplet Within Threshold', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 08-smallest-difference
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '08-smallest-difference/02-smallest-diff-triplet', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/08-smallest-difference/02-smallest-diff-triplet'] = problem;

})();
