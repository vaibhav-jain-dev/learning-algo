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
        twists: [
            { title: 'Multiple Tag Types', difficulty: 'Hard', description: 'Generate valid strings using multiple tag types (e.g., <div>, <span>, <p>) where each type has a specified count and tags must be properly nested.', whyDifferent: 'Increases the branching factor at each step -- you can open or close any valid tag type, and closing must match the most recently opened unclosed tag (stack-based validation).', example: 'For 1 div and 1 span, valid outputs include "<div><span></span></div>" and "<span><div></div></span>" and "<div></div><span></span>", etc.' },
            { title: 'Count Valid Arrangements', difficulty: 'Medium', description: 'Return only the count of valid tag arrangements without generating the actual strings.', whyDifferent: 'Transforms into computing Catalan numbers, requiring mathematical insight rather than string construction and backtracking.', example: 'For numberOfTags=3, return 5 (the 3rd Catalan number) without generating the strings.' },
            { title: 'Self-Closing Tags Mixed', difficulty: 'Hard', description: 'In addition to paired <div></div> tags, you also have a count of self-closing tags like <br/> that can be placed anywhere valid.', whyDifferent: 'Self-closing tags can be inserted at any point without affecting the nesting structure, adding an interleaving dimension to the generation.', example: 'For 1 div and 1 br, valid outputs include "<div><br/></div>", "<br/><div></div>", "<div></div><br/>".' },
            { title: 'Parentheses Variant', difficulty: 'Medium', description: 'Generate all valid combinations of n pairs of parentheses, with multiple types: (), [], {}, where different types cannot interleave incorrectly.', whyDifferent: 'Multiple bracket types add ordering constraints -- you cannot close a [ if a ( was opened more recently, requiring stack-based tracking.', example: 'For 1 of each type, "([{}])" is valid but "([)]" is not. Generate all valid orderings.' },
            { title: 'Maximum Nesting Depth', difficulty: 'Hard', description: 'Generate only valid tag arrangements where the maximum nesting depth does not exceed a given limit d.', whyDifferent: 'Adds a depth constraint to the recursion that prunes branches when the current nesting level reaches d, restricting which states can open new tags.', example: 'For numberOfTags=3 and maxDepth=2, exclude deeply nested strings like "<div><div><div></div></div></div>".' }
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
