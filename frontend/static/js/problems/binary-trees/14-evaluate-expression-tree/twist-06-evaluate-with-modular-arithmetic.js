/**
 * Evaluate with Modular Arithmetic
 * Category: binary-trees
 * Difficulty: Medium
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
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: / at root, left: 7, right: 3' },
                output: 'See explanation',
                explanation: 'Tree: / at root, left: 7, right: 3. Mod 11. 3 inverse mod 11 is 4 (since 3*4=12 mod 11=1). Result: 7*4 mod 11 = 28 mod 11 = 6.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def evaluate_with_modular_arithmetic(data):
    """
    Evaluate with Modular Arithmetic

    Evaluate the expression tree where all operations are performed modulo a given prime p.
     Division becomes modular inverse multiplication.

    Approach: Addition, subtraction, and multiplication mod p are straightforward

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Addition, subtraction, and multiplication mod p are straightforward

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Evaluate with Modular Arithmetic
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: / at root, left: 7, right: 3
    print("See problem description for test cases")`,
            go: `package main

import "fmt"

// TreeNode represents a node in the binary tree
type TreeNode struct {
    Value int
    Left  *TreeNode
    Right *TreeNode
}

func buildTree(data map[string]interface{}) *TreeNode {
    if data == nil {
        return nil
    }
    node := &TreeNode{Value: int(data["value"].(float64))}
    if left, ok := data["left"].(map[string]interface{}); ok {
        node.Left = buildTree(left)
    }
    if right, ok := data["right"].(map[string]interface{}); ok {
        node.Right = buildTree(right)
    }
    return node
}

// EvaluateWithModularArithmetic solves: Evaluate with Modular Arithmetic
// Addition, subtraction, and multiplication mod p are straightforward
// Time: O(n), Space: O(n)
func EvaluateWithModularArithmetic(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Evaluate with Modular Arithmetic
    var solve func(node *TreeNode) interface{}
    solve = func(node *TreeNode) interface{} {
        if node == nil {
            return nil
        }

        solve(node.Left)
        solve(node.Right)

        return nil
    }

    return solve(root)
}

func main() {
    // Example: Tree: / at root, left: 7, right: 3
    fmt.Println("See problem description for test cases")
}`
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
