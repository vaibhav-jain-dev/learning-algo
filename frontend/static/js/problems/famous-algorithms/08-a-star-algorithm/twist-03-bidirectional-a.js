/**
 * Bidirectional A*
 * Category: famous-algorithms
 * Difficulty: Very Hard
 * Parent: 08-a-star-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'Bidirectional A*',
        difficulty: 'Very Hard',
        algorithm: 'a-star',
        parent: '08-a-star-algorithm',
        description: 'Run A* simultaneously from start and end, meeting in the middle, to reduce the search space.',
        problem: 'Requires running two A* instances with consistent heuristics and detecting when they meet, which is more complex than the simple unidirectional approach.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Forward A* from start and backward A* from end. When both have explored a common node, check if the combined path is optimal.' },
                output: 'See example',
                explanation: 'Forward A* from start and backward A* from end. When both have explored a common node, check if the combined path is optimal.'
            }
        ],
        solutions: {
            python: `# Bidirectional A*
# Category: famous-algorithms
# Difficulty: Very Hard
# Parent: 08-a-star-algorithm

def solve():
    """
    Run A* simultaneously from start and end, meeting in the middle, to reduce the search space.

    Key insight: Requires running two A* instances with consistent heuristics and detecting when they meet, which is more complex than the simple unidirectional approach.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Bidirectional A* problem.
// Run A* simultaneously from start and end, meeting in the middle, to reduce the search space.
// Key insight: Requires running two A* instances with consistent heuristics and detecting when they meet, which is more complex than the simple unidirectional approach.
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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/twist-03-bidirectional-a', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/twist-03-bidirectional-a'] = problem;
})();
