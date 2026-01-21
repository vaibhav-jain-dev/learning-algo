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
