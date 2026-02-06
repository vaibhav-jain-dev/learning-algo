/**
 * Output Prediction
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 01-kadanes-algorithm/03-max-sum-k-elements
 */
(function() {
    'use strict';
    const problem = {
        name: 'Output Prediction',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm/03-max-sum-k-elements',
        description: 'Without running the algorithm, predict the output for: nums = [10, -20, 5, 5, 5, -30, 15, 15], k = 3. Trace through all possible windows and extensions manually.',
        problem: 'Forces manual simulation of the algorithm to build intuition. You must consider every possible starting point and extension, not just the obvious candidates.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Key windows of size 3: [5,5,5]=15, [5,-30,15]=-10, [-30,15,15]=0, [15,15,_]. Extension from [5,5,5]: extend left with max(0, -20+10)=0. Best: [5,5,5]=15 or [15,15]+extend. Answer: 30 from [15,15] with k=3 not valid, need [5,-30,15,15]=5 or [5,5,5]=15. Answer: 15.' },
                output: 'See example',
                explanation: 'Key windows of size 3: [5,5,5]=15, [5,-30,15]=-10, [-30,15,15]=0, [15,15,_]. Extension from [5,5,5]: extend left with max(0, -20+10)=0. Best: [5,5,5]=15 or [15,15]+extend. Answer: 30 from [15,15] with k=3 not valid, need [5,-30,15,15]=5 or [5,5,5]=15. Answer: 15.'
            }
        ],
        solutions: {
            python: `# Output Prediction
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 01-kadanes-algorithm/03-max-sum-k-elements

def solve():
    """
    Without running the algorithm, predict the output for: nums = [10, -20, 5, 5, 5, -30, 15, 15], k = 3. Trace through all possible windows and extensions manually.

    Key insight: Forces manual simulation of the algorithm to build intuition. You must consider every possible starting point and extension, not just the obvious candidates.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Output Prediction problem.
// Without running the algorithm, predict the output for: nums = [10, -20, 5, 5, 5, -30, 15, 15], k = 3. Trace through all possible windows and extensions manually.
// Key insight: Forces manual simulation of the algorithm to build intuition. You must consider every possible starting point and extension, not just the obvious candidates.
func Solve() interface{} {
    // TODO: Implement solution
    return nil
}

func main() {
    fmt.Println(Solve())
}
`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/03-max-sum-k-elements/twist-05-output-prediction', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/03-max-sum-k-elements/twist-05-output-prediction'] = problem;
})();
