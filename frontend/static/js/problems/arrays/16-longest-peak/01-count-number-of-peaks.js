/**
 * Count Number Of Peaks
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Number Of Peaks',
        difficulty: 'Medium',
        algorithm: 'peak-expansion',
        parent: '16-longest-peak',
        description: 'Given an array of integers, count the total number of valid peaks. A peak is an element that is strictly greater than both its neighbors. Edge elements cannot be peaks.',
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
          "array": [
            1,
            3,
            2,
            4,
            1,
            5,
            2
          ]
        },
        output: "3\nExplanation: Peaks at indices 1 (3), 3 (4), and 5 (5)",
        explanation: 'Given the input, the algorithm processes it to produce 3\nExplanation: Peaks at indices 1 (3), 3 (4), and 5 (5)'
    },
    {
        input: {
          "array": [
            1,
            2,
            3,
            4,
            5
          ]
        },
        output: "0\nExplanation: No element is greater than both neighbors",
        explanation: 'Given the input, the algorithm processes it to produce 0\nExplanation: No element is greater than both neighbors'
    },
    {
        input: {
          "array": [
            5,
            4,
            3,
            4,
            5
          ]
        },
        output: "0\nExplanation: 5 at index 4 is at the edge, not a valid peak",
        explanation: 'Given the input, the algorithm processes it to produce 0\nExplanation: 5 at index 4 is at the edge, not a valid peak'
    }
        ],
        solutions: {
            python: `def countNumberOfPeaks(array):
    """
    Count Number Of Peaks

    A peak is an element strictly greater than both neighbors.
    Edge elements cannot be peaks.

    Time: O(n)
    Space: O(1)
    """
    if len(array) < 3:
        return 0

    count = 0
    for i in range(1, len(array) - 1):
        if array[i] > array[i - 1] and array[i] > array[i + 1]:
            count += 1

    return count


# Test
if __name__ == "__main__":
    print(countNumberOfPeaks([1, 3, 2, 4, 1, 5, 2]))  # 3
    print(countNumberOfPeaks([1, 2, 3, 4, 5]))  # 0
    print(countNumberOfPeaks([5, 4, 3, 4, 5]))  # 0`,
            go: `package main

import "fmt"

// CountNumberOfPeaks counts the number of peaks in an array.
// A peak is an element strictly greater than both its neighbors.
// Time: O(n), Space: O(1)
func CountNumberOfPeaks(array []int) int {
    if len(array) < 3 {
        return 0
    }

    count := 0
    for i := 1; i < len(array)-1; i++ {
        if array[i] > array[i-1] && array[i] > array[i+1] {
            count++
        }
    }

    return count
}

func main() {
    fmt.Println(CountNumberOfPeaks([]int{1, 3, 2, 4, 1, 5, 2}))  // 3
    fmt.Println(CountNumberOfPeaks([]int{1, 2, 3, 4, 5}))  // 0
    fmt.Println(CountNumberOfPeaks([]int{5, 4, 3, 4, 5}))  // 0
}`
        },
        twists: [
            { name: 'Count Peaks and Valleys', difficulty: 'Medium', description: 'Count both peaks (element greater than both neighbors) and valleys (element less than both neighbors). Return both counts.', whyDifferent: 'Must check both conditions simultaneously and handle edge cases where a peak and valley are adjacent.', example: 'array = [1, 3, 2, 4, 1]. Peaks: 3 and 4 (count 2). Valleys: 2 and 1 (count 1, but 1 is edge). Return {peaks: 2, valleys: 1}.' },
            { name: 'Count Prominent Peaks', difficulty: 'Hard', description: 'A prominent peak has a prominence of at least K: the minimum drop on either side before reaching a higher peak. Count such peaks.', whyDifferent: 'Prominence requires looking beyond immediate neighbors to find how far each peak stands above surrounding terrain.', example: 'array = [1, 5, 3, 8, 2], K = 3. Peak 5 has prominence 2 (drops to 3). Peak 8 has prominence 6. Only 8 counts for K=3.' },
            { name: 'Peaks in 2D Grid', difficulty: 'Hard', description: 'Given a 2D matrix of heights, count cells that are strictly greater than all 4 adjacent neighbors (up, down, left, right).', whyDifferent: 'Extends from 1D to 2D, requiring 4-neighbor comparisons and boundary handling for edge and corner cells.', example: 'matrix = [[1,4,3],[6,5,2],[7,3,1]]. Peak at (1,0) value 6: greater than 1, 5, 7? No (7>6). Check all cells.' },
            { name: 'Minimum Distance Between Peaks', difficulty: 'Medium', description: 'Find the minimum index distance between any two peaks in the array.', whyDifferent: 'After finding all peak indices, compute the minimum gap between consecutive peaks, a post-processing step.', example: 'array = [1, 3, 2, 4, 1, 5, 2]. Peaks at indices 1, 3, 5. Min distance = 2.' },
            { name: 'Count Peaks in Sliding Window', difficulty: 'Hard', description: 'For each window of size W sliding across the array, count how many peaks exist within that window.', whyDifferent: 'Peaks must be recounted as the window slides, requiring efficient addition/removal of peak status at window boundaries.', example: 'array = [1, 3, 2, 4, 1, 5, 2], W = 3. Windows: [1,3,2]->1 peak, [3,2,4]->0, [2,4,1]->1, etc.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 16-longest-peak
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '16-longest-peak/01-count-number-of-peaks', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/16-longest-peak/01-count-number-of-peaks'] = problem;

})();
