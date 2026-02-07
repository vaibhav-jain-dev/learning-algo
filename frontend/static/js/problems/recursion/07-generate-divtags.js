/**
 * Generate Divtags
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Generate Divtags',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Write a function that takes in a positive integer numberOfTags and returns a list of all valid strings that you can generate with that number of matched <div></div> tags. A string is valid and contains matched <div></div> tags if for every opening tag <div>, there is a closing tag </div> that comes after it and isn\'t used as a match for a previously occurring opening tag. Each output string should contain exactly numberOfTags opening tags and numberOfTags closing tags.',
        problem: 'Analyze the problem structure to identify the right approach. Consider the constraints to determine the target complexity. Implement the algorithm step by step, handling edge cases carefully. This achieves O(n) time with O(1) space.',
        hints: [
            'Break down the problem into smaller subproblems. What is the simplest case you can solve?',
            'Consider what data structure would help you efficiently track the information you need.',
            'Think about the time-space tradeoff. Can you trade extra memory for better time complexity?',
            'Walk through a small example by hand. What steps do you take? Can you formalize that into an algorithm?'
        ],

        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "numberOfTags = 2"
},
        output: "[\"<div><div></div></div>\", \"<div></div><div></div>\"]",
        explanation: 'Given the input, the algorithm processes it to produce ["<div><div></div></div>", "<div></div><div></div>"]'
    },
    {
        input: {
        "raw": "numberOfTags = 1"
},
        output: "[\"<div></div>\"]",
        explanation: 'Given the input, the algorithm processes it to produce ["<div></div>"]'
    },
    {
        input: {
        "raw": "numberOfTags = 3"
},
        output: "[\n  \"<div><div><div></div></div></div>\",\n  \"<div><div></div><div></div></div>\",\n  \"<div><div></div></div><div></div>\",\n  \"<div></div><div><div></div></div>\",\n  \"<div></div><div></div><div></div>\"\n]",
        explanation: 'Given the input, the algorithm processes it to produce [\n  "<div><div><div></div></div></div>",\n  "<div><div></div><div></div></div>",\n  "<div><div></div></div><div></div>",\n  "<div></div><div><div></div></div>",\n  "<div></div><div></div><div></div>"\n]'
    }
        ],
        twists: [
            { id: '07-generate-divtags/twist-01-multiple-tag-types', name: 'Multiple Tag Types', difficulty: 'Hard' },
            { id: '07-generate-divtags/twist-02-count-valid-arrangements', name: 'Count Valid Arrangements', difficulty: 'Medium' },
            { id: '07-generate-divtags/twist-03-self-closing-tags-mixed', name: 'Self-Closing Tags Mixed', difficulty: 'Hard' },
            { id: '07-generate-divtags/twist-04-parentheses-variant', name: 'Parentheses Variant', difficulty: 'Medium' },
            { id: '07-generate-divtags/twist-05-maximum-nesting-depth', name: 'Maximum Nesting Depth', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '07-generate-divtags', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/07-generate-divtags'] = problem;

})();
