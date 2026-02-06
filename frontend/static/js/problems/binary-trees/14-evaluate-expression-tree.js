/**
 * Evaluate Expression Tree
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-expression
 */
(function() {
    'use strict';

    const problem = {
        name: 'Evaluate Expression Tree',
        difficulty: 'Easy',
        algorithm: 'tree-expression',
        description: 'Write a function that takes in a binary expression tree and evaluates it. The tree represents a mathematical expression where: - **Leaf nodes** contain integer operands (positive or negative numbers) - **Internal nodes** contain operators: +, -, *, / (represented as -1, -2, -3, -4 respectively) The function should return the result of evaluating the expression. For division, use integer division that truncates toward zero.',
        complexity: {
            time: 'O(n)',
            space: 'O(h)'
        },
        examples: [
    {
        input: {
        "tree": {
                "value": -1,
                "left": {
                        "value": -2,
                        "left": {
                                "value": 2
                        },
                        "right": {
                                "value": 3
                        }
                },
                "right": {
                        "value": -3,
                        "left": {
                                "value": 4
                        },
                        "right": {
                                "value": 5
                        }
                }
        }
},
        output: 19,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': -1, \'left\': {\'value\': -2, \'left\': {\'value\': 2}, \'right\': {\'value\': 3}}, \'right\': {\'value\': -3, \'left\': {\'value\': 4}, \'right\': {\'value\': 5}}}, the result is 19.'
    },
    {
        input: {
        "tree": {
                "value": -1,
                "left": {
                        "value": 5
                },
                "right": {
                        "value": 7
                }
        }
},
        output: 12,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': -1, \'left\': {\'value\': 5}, \'right\': {\'value\': 7}}, the result is 12.'
    }
        ],
        twists: [
            {
                title: 'Expression Tree to String',
                difficulty: 'Medium',
                description: 'Instead of evaluating the expression tree, convert it to a fully parenthesized infix string representation.',
                whyDifferent: 'Evaluation uses postorder (compute children first, then apply operator). String conversion uses inorder (left, operator, right) with parentheses, requiring different traversal order and string concatenation logic.',
                example: 'Tree: + at root, * (left: 2, right: 3), - (left: 4, right: 5). Output: "((2 * 3) + (4 - 5))" = "((2*3)+(4-5))".'
            },
            {
                title: 'Evaluate with Variables',
                difficulty: 'Medium',
                description: 'Leaf nodes can contain variable names (strings) in addition to numbers. Given a dictionary mapping variable names to values, evaluate the expression tree.',
                whyDifferent: 'Leaf node handling branches: if it is a number, use it directly; if it is a variable, look it up. This adds a lookup layer and error handling for undefined variables to the base case.',
                example: 'Tree: + at root, left leaf "x", right leaf 3. Variables: {x: 7}. Result: 7 + 3 = 10.'
            },
            {
                title: 'Build Expression Tree from Postfix',
                difficulty: 'Hard',
                description: 'Given a postfix (reverse Polish notation) expression as an array of tokens, build the corresponding expression tree.',
                whyDifferent: 'This is the inverse problem: construction instead of evaluation. You use a stack to build the tree bottom-up, pushing operand nodes and popping two children when you encounter an operator, which is a different mental model.',
                example: 'Postfix: ["2", "3", "*", "4", "5", "-", "+"]. Build tree: + at root, * (left: 2, right: 3), - (left: 4, right: 5).'
            },
            {
                title: 'Evaluate with Short-Circuit',
                difficulty: 'Hard',
                description: 'Add logical operators AND (&&) and OR (||) to the expression tree. Implement short-circuit evaluation: AND returns 0 immediately if left is 0, OR returns 1 immediately if left is 1.',
                whyDifferent: 'Standard arithmetic always evaluates both children. Short-circuit evaluation conditionally skips the right subtree based on the left result, introducing lazy evaluation into the tree traversal.',
                example: 'Tree: AND at root, left: 0, right: (expensive computation). Short-circuit returns 0 without evaluating the right subtree at all.'
            },
            {
                title: 'Simplify Expression Tree',
                difficulty: 'Very Hard',
                description: 'Simplify the expression tree by applying algebraic rules: x*1=x, x*0=0, x+0=x, x-0=x. Return the simplified tree (not a value).',
                whyDifferent: 'Instead of computing a numeric result, you transform the tree structure. Some subtrees collapse into single nodes, others remain unchanged. This requires pattern matching at each node and deciding whether to prune subtrees.',
                example: 'Tree: * at root, + (left: x, right: 0), 1. Simplify x+0 to x, then x*1 to x. Result is a single leaf node x.'
            },
            {
                title: 'Evaluate with Modular Arithmetic',
                difficulty: 'Medium',
                description: 'Evaluate the expression tree where all operations are performed modulo a given prime p. Division becomes modular inverse multiplication.',
                whyDifferent: 'Addition, subtraction, and multiplication mod p are straightforward. Division requires computing the modular multiplicative inverse using Fermat little theorem or extended Euclidean algorithm, which is a number theory concept overlaid on tree evaluation.',
                example: 'Tree: / at root, left: 7, right: 3. Mod 11. 3 inverse mod 11 is 4 (since 3*4=12 mod 11=1). Result: 7*4 mod 11 = 28 mod 11 = 6.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '14-evaluate-expression-tree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/14-evaluate-expression-tree'] = problem;

})();
