/**
 * Lexicographically First Order
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 03-topological-sort/02-alien-dictionary
 */
(function() {
    'use strict';
    const problem = {
        name: 'Lexicographically First Order',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/02-alien-dictionary',
        description: 'Among all valid orderings consistent with the word list, return the lexicographically smallest one (by English alphabet).',
        problem: 'Requires using a min-heap instead of a regular queue in the topological sort to always pick the smallest (by English alphabet) available character.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'If both "a" and "c" have zero in-degree, choose "a" first to get the lexicographically smallest valid alien ordering.' },
                output: 'See example',
                explanation: 'If both "a" and "c" have zero in-degree, choose "a" first to get the lexicographically smallest valid alien ordering.'
            }
        ],
        solutions: {
            python: `# Lexicographically First Order
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 03-topological-sort/02-alien-dictionary

def solve():
    """
    Among all valid orderings consistent with the word list, return the lexicographically smallest one (by English alphabet).

    Key insight: Requires using a min-heap instead of a regular queue in the topological sort to always pick the smallest (by English alphabet) available character.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Lexicographically First Order problem.
// Among all valid orderings consistent with the word list, return the lexicographically smallest one (by English alphabet).
// Key insight: Requires using a min-heap instead of a regular queue in the topological sort to always pick the smallest (by English alphabet) available character.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/02-alien-dictionary/twist-05-lexicographically-first-order', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/02-alien-dictionary/twist-05-lexicographically-first-order'] = problem;
})();
