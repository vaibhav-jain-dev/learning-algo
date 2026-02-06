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
            { id: '14-evaluate-expression-tree/twist-01-expression-tree-to-string', name: 'Expression Tree to String', difficulty: 'Medium' },
            { id: '14-evaluate-expression-tree/twist-02-evaluate-with-variables', name: 'Evaluate with Variables', difficulty: 'Medium' },
            { id: '14-evaluate-expression-tree/twist-03-build-expression-tree-from-postfix', name: 'Build Expression Tree from Postfix', difficulty: 'Hard' },
            { id: '14-evaluate-expression-tree/twist-04-evaluate-with-short-circuit', name: 'Evaluate with Short-Circuit', difficulty: 'Hard' },
            { id: '14-evaluate-expression-tree/twist-05-simplify-expression-tree', name: 'Simplify Expression Tree', difficulty: 'Very Hard' },
            { id: '14-evaluate-expression-tree/twist-06-evaluate-with-modular-arithmetic', name: 'Evaluate with Modular Arithmetic', difficulty: 'Medium' }
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
