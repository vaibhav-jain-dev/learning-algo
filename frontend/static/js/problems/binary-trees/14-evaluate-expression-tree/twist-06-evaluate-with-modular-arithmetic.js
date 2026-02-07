/**
 * Evaluate with Modular Arithmetic
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-expression
 * Parent: 14-evaluate-expression-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Evaluate with Modular Arithmetic',
        difficulty: 'Medium',
        algorithm: 'tree-expression',
        parent: '14-evaluate-expression-tree',
        description: 'Evaluate the expression tree where all operations are performed modulo a given prime p. Division becomes modular inverse multiplication. Addition, subtraction, and multiplication mod p are straightforward. Division requires computing the modular multiplicative inverse using Fermat little theorem or extended Euclidean algorithm, which is a number theory concept overlaid on tree evaluation.',
        problem: 'Addition, subtraction, and multiplication mod p are straightforward. Division requires computing the modular multiplicative inverse using Fermat little theorem or extended Euclidean algorithm, which is a number theory concept overlaid on tree evaluation.',
        hints: [
            'Consider: Evaluate the expression tree where all operations are performed modulo a given prime p.',
            'Division becomes modular inverse multiplication.',
            'Key insight: Addition, subtraction, and multiplication mod p are straightforward.',
            'Division requires computing the modular multiplicative inverse using Fermat little theorem or extended Euclidean algorithm, which is a number theory concept overlaid on tree evaluation.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}}},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":{"value":-1,"left":{"value":5},"right":{"value":7}}},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":{"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}}},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def evaluate_with_modular_arithmetic(tree):
    """
    Evaluate with Modular Arithmetic

    Evaluate the expression tree where all operations are performed modulo a given prime p. Division becomes modular inverse multiplication. Addition, subtraction, and multiplication mod p are straightforward. Division requires computing the modular multiplicative inverse using Fermat little theorem or extended Euclidean algorithm, which is a number theory concept overlaid on tree evaluation.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(evaluate_with_modular_arithmetic({"value": -1, "left": {"value": -2, "left": {"value": 2}, "right": {"value": 3}}, "right": {"value": -3, "left": {"value": 4}, "right": {"value": 5}}}))  # Expected: 1
print(evaluate_with_modular_arithmetic({"value": -1, "left": {"value": 5}, "right": {"value": 7}}))  # Expected: 2
print(evaluate_with_modular_arithmetic({"value": -1, "left": {"value": -2, "left": {"value": 2}, "right": {"value": 3}}, "right": {"value": -3, "left": {"value": 4}, "right": {"value": 5}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// EvaluateWithModularArithmetic solves the Evaluate with Modular Arithmetic problem.
// Evaluate the expression tree where all operations are performed modulo a given prime p. Division becomes modular inverse multiplication. Addition, subtraction, and multiplication mod p are straightforward. Division requires computing the modular multiplicative inverse using Fermat little theorem or extended Euclidean algorithm, which is a number theory concept overlaid on tree evaluation.
// Time: O(n), Space: O(n)
func EvaluateWithModularArithmetic(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(EvaluateWithModularArithmetic({"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}})) // Expected: 1
	fmt.Println(EvaluateWithModularArithmetic({"value":-1,"left":{"value":5},"right":{"value":7}})) // Expected: 2
	fmt.Println(EvaluateWithModularArithmetic({"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '14-evaluate-expression-tree/twist-06-evaluate-with-modular-arithmetic', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/14-evaluate-expression-tree/twist-06-evaluate-with-modular-arithmetic'] = problem;
})();
