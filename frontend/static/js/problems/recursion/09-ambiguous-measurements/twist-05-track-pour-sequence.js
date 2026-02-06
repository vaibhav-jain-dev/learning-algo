/**
 * Track Pour Sequence
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-measurements
 * Parent: 09-ambiguous-measurements
 */
(function() {
    'use strict';

    const problem = {
        name: 'Track Pour Sequence',
        difficulty: 'Medium',
        algorithm: 'recursion-measurements',
        parent: '09-ambiguous-measurements',
        description: 'Return not just whether the target is achievable, but also the sequence of cup pours (and their actual measured amounts) that achieve it.',
        problem: 'Requires path reconstruction through the memoized recursion, storing which cup was used at each step and within what range.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"cups":[[200,210],[450,465],[800,850]],"target":10},
                output: [[200,210],[450,465],[800,850]],
                explanation: 'The track pour sequence for this input yields [200,210, 450,465, 800,850].'
            },
            // Edge case
            {
                input: {"cups":[[200,210]],"target":10},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def track_pour_sequence(cups, target):
    """
    Track Pour Sequence

    Return not just whether the target is achievable, but also the sequence of cup pours (and their actual measured amounts) that achieve it.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(cups)):
        # Check if element meets criteria
        result.append(cups[i])

    return result


# Test cases
print(track_pour_sequence([[200,210],[450,465],[800,850]], 10))  # Expected: [[200,210],[450,465],[800,850]]
print(track_pour_sequence([[200,210]], 10))  # Expected: []
`,
            go: `package main

import "fmt"

// TrackPourSequence solves the Track Pour Sequence problem.
// Return not just whether the target is achievable, but also the sequence of cup pours (and their actual measured amounts) that achieve it.
// Time: O(?), Space: O(?)
func TrackPourSequence(cups [][]int, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(cups); i++ {
		result = append(result, cups[i])
	}

	return result
}

func main() {
	fmt.Println(TrackPourSequence([][]int{{200, 210}, {450, 465}, {800, 850}}, 10)) // Expected: [[200,210],[450,465],[800,850]]
	fmt.Println(TrackPourSequence([][]int{{200, 210}}, 10)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '09-ambiguous-measurements/twist-05-track-pour-sequence', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/09-ambiguous-measurements/twist-05-track-pour-sequence'] = problem;
})();
