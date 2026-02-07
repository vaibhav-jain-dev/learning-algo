/**
 * Intersection of Squared Arrays
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: intersection-of-squared-arrays
 * Parent: 03-sorted-squared-array/01-merge-sorted-arrays-with-squares
 */
(function() {
    'use strict';

    const problem = {
        name: 'Intersection of Squared Arrays',
        difficulty: 'Medium',
        algorithm: 'intersection-of-squared-arrays',
        parent: '03-sorted-squared-array/01-merge-sorted-arrays-with-squares',
        description: 'Instead of merging, find the common elements between the two squared sorted arrays. Switches from union to intersection logic during the merge phase, requiring equality checks and synchronized pointer advancement.',
        problem: 'Switches from union to intersection logic during the merge phase, requiring equality checks and synchronized pointer advancement.',
        hints: [
            'Think about how intersection of squared arrays differs from the standard version of this problem.',
            'Key insight: Switches from union to intersection logic during the merge phase, requiring equality checks and synchronized pointer advancement.',
            'Consider whether sorting can help simplify the approach.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[-3,-1,0,2,4]},
                output: [0,1,4,9,16],
                explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
            },
            {
                input: {"array":[1,2,3]},
                output: [1,4,9],
                explanation: 'The algorithm handles this case by applying the key operation to each element. The accumulated result after processing all elements gives the answer.'
            },
            // Edge case
            {
                input: {"array":[-5,-3,-1]},
                output: [1,9,25],
                explanation: 'This test case validates the algorithm behavior. The step-by-step processing of input elements produces the expected output.'
            }
        ],
        solutions: {
            python: `def intersection_of_squared_arrays(arr1, arr2):
    """
    Intersection of Squared Arrays

    Instead of merging, find the common elements between the two squared sorted arrays. Switches from union to intersection logic during the merge phase, requiring equality checks and synchronized pointer advancement.

    Time: O(n log n)
    Space: O(n)
    """
    result = []

    for item in arr1:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(intersection_of_squared_arrays(None, None))  # Expected: [0,1,4,9,16]
print(intersection_of_squared_arrays(None, None))  # Expected: [1,4,9]
print(intersection_of_squared_arrays(None, None))  # Expected: [1,9,25]
`,
            go: `package main

import "fmt"

// IntersectionOfSquaredArrays solves the Intersection of Squared Arrays problem.
// Instead of merging, find the common elements between the two squared sorted arrays. Switches from union to intersection logic during the merge phase, requiring equality checks and synchronized pointer advancement.
// Time: O(n log n), Space: O(n)
func IntersectionOfSquaredArrays(arr1 []int, arr2 []int) string {
	result := ""

	for _, v := range arr1 {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(IntersectionOfSquaredArrays(nil, nil)) // Expected: [0,1,4,9,16]
	fmt.Println(IntersectionOfSquaredArrays(nil, nil)) // Expected: [1,4,9]
	fmt.Println(IntersectionOfSquaredArrays(nil, nil)) // Expected: [1,9,25]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/01-merge-sorted-arrays-with-squares/twist-03-intersection-of-squared-arrays', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/01-merge-sorted-arrays-with-squares/twist-03-intersection-of-squared-arrays'] = problem;
})();
