# How to Add New Problems to the 200 Questions Dashboard

This guide explains how to add new algorithm problems and their visualizations to the 200 Must-Solve Problems dashboard using the new JS-only format.

## Quick Start

1. Create a new JS file in the appropriate category folder
2. Define the problem configuration with input, output, and explanation
3. Register with the ProblemRenderer

## File Structure

Problems are organized by category in `/frontend/static/js/problems/`:

```
frontend/static/js/problems/
├── _main-loader.js           # Loads all categories
├── problem-renderer.js       # Generic rendering utility
├── arrays/
│   ├── _loader.js            # Category loader
│   ├── 01-validate-subsequence.js
│   ├── 02-two-number-sum.js
│   └── ...
├── graphs/
├── dynamic-programming/
├── binary-trees/
├── binary-search-trees/
├── linked-lists/
├── recursion/
└── famous-algorithms/
```

## Problem JS File Format

Each problem is defined in a single JS file with the following structure:

```javascript
/**
 * Problem Name
 * Category: category-name
 * Difficulty: Easy/Medium/Hard
 * Algorithm: algorithm-identifier
 */
(function() {
    'use strict';

    const problem = {
        // Required: Display name of the problem
        name: 'Two Number Sum',

        // Required: Difficulty level (Easy, Medium, Hard)
        difficulty: 'Easy',

        // Required: Algorithm identifier for visualization lookup
        // This maps to visualizers in /frontend/static/js/viz/
        algorithm: 'hash-table-two-sum',

        // Required: Problem description
        description: 'Given an array of integers and a target sum, return the pair of numbers that add up to the target.',

        // Required: Time and space complexity
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },

        // Required: At least one example with input, output, and explanation
        examples: [
            {
                // Input object with named parameters
                input: {
                    array: [3, 5, -4, 8, 11, 1, -1, 6],
                    targetSum: 10
                },
                // Expected output
                output: [-1, 11],
                // Explanation of how input transforms to output
                explanation: 'Using a hash table, we store each number and check if (target - current) exists. When we reach 11, we find that -1 (10-11) is in our hash, so we return [-1, 11].'
            },
            {
                input: {
                    array: [1, 2, 3, 4, 5],
                    targetSum: 10
                },
                output: [],
                explanation: 'No two numbers in the array sum to 10, so we return an empty array.'
            }
        ],

        // Optional: List of similar/harder problems
        similar: [
            { id: '01-three-sum', name: 'Three Sum', difficulty: 'Medium' },
            { id: '02-four-sum', name: 'Four Sum', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer (required)
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum', problem);
    }

    // Export for direct access (optional but recommended)
    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum'] = problem;

})();
```

## Input/Output Guidelines

### Input Format

Use descriptive keys that match the problem parameters:

```javascript
// Array problems
input: { array: [1, 2, 3], target: 5 }

// Graph problems
input: {
    nodes: ['A', 'B', 'C'],
    edges: [['A', 'B'], ['B', 'C']]
}

// Tree problems
input: {
    tree: { value: 1, left: { value: 2 }, right: { value: 3 } }
}

// String problems
input: { string: 'hello', pattern: 'll' }
```

### Output Format

Match the expected return type:

```javascript
// Boolean
output: true

// Number
output: 42

// Array
output: [1, 2, 3]

// Nested array
output: [[1, 2], [3, 4]]

// Object
output: { start: 0, end: 5 }
```

### Explanation Format

Write clear explanations that connect input to output:

```javascript
explanation: 'Starting with array [1, 2, 3] and target 5, we use two pointers. ' +
             'Left pointer at index 0 (value 1), right pointer at index 2 (value 3). ' +
             '1 + 3 = 4 < 5, so we move left pointer. ' +
             '2 + 3 = 5 = target! Return [2, 3].'
```

## Adding Visualization Support

The visualization system uses the `algorithm` field to look up the appropriate visualizer.

### Available Algorithm Identifiers

| Algorithm Pattern | Identifier | Visualizer File |
|-------------------|------------|-----------------|
| Two Pointer | `two-pointer-*` | arrays_viz.js |
| Hash Table | `hash-table-*` | arrays_viz.js |
| Sorting | `sort-*` | arrays_viz.js |
| DFS | `graph-dfs`, `tree-dfs` | graphs_viz.js, trees_viz.js |
| BFS | `graph-bfs`, `tree-bfs` | graphs_viz.js, trees_viz.js |
| Dynamic Programming | `dp-*` | dp_viz.js |
| Union Find | `union-find` | famous_viz.js |
| Linked List | `ll-*` | linked_lists_viz.js |
| BST | `bst-*` | bst_viz.js |
| Recursion | `recursion-*` | recursion_viz.js |

### Creating a New Visualizer

If no existing visualizer fits, add one to the appropriate `*_viz.js` file:

```javascript
function runMyNewAlgorithm(example, config, complexity) {
    const steps = [];

    // Step 1: Introduction
    steps.push({
        vizType: 'array-hash',  // Type of visualization
        array: example.input.array.slice(),
        status: 'Initialize',
        explanation: '<strong>' + config.name + '</strong><br>' +
            'Input: [' + example.input.array.join(', ') + ']<br>' +
            'Expected: ' + example.output
    });

    // Step 2-N: Algorithm steps
    // ... add more steps showing the algorithm progress

    // Final step: Result
    steps.push({
        vizType: 'array-hash',
        status: 'Complete!',
        explanation: '<strong>Result:</strong> ' + JSON.stringify(example.output)
    });

    return steps;
}

// Register the visualizer
window.VizUtils.register('my-new-algorithm', runMyNewAlgorithm);
```

## Naming Conventions

### File Names
- Use kebab-case: `01-two-number-sum.js`
- Prefix with number for ordering: `01-`, `02-`, etc.

### Problem IDs
- Match file name without `.js`: `01-two-number-sum`

### Algorithm Identifiers
- Use descriptive, hyphenated names: `two-pointer-subsequence`
- Include algorithm family: `hash-table-two-sum`, `dp-knapsack`

## Updating Category Loader

After adding a new problem, update the category's `_loader.js`:

```javascript
// In _loader.js
const PROBLEMS = [
    '01-validate-subsequence',
    '02-two-number-sum',
    '03-new-problem',  // Add new problem here
];
```

## Testing Your Changes

1. Add the JS file to the category folder
2. Update the category's `_loader.js` to include the new problem
3. Open the 200 Problems dashboard in a browser
4. Verify the problem appears and visualization works

### Browser Console

Check for errors in the browser console (F12 > Console):
- Missing required fields
- Invalid vizType
- Handler registration errors

## Example: Adding a New Array Problem

```javascript
// File: frontend/static/js/problems/arrays/20-container-with-most-water.js

/**
 * Container With Most Water
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-pointer-container
 */
(function() {
    'use strict';

    const problem = {
        name: 'Container With Most Water',
        difficulty: 'Medium',
        algorithm: 'two-pointer-container',
        description: 'Given n non-negative integers representing the height of vertical lines, find two lines that together with the x-axis form a container that holds the most water.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            {
                input: {
                    heights: [1, 8, 6, 2, 5, 4, 8, 3, 7]
                },
                output: 49,
                explanation: 'The max area is between index 1 (height 8) and index 8 (height 7). Width = 8-1 = 7, height = min(8,7) = 7. Area = 7 * 7 = 49.'
            }
        ],
        similar: [
            { id: '01-trapping-rain-water', name: 'Trapping Rain Water', difficulty: 'Hard' }
        ]
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '20-container-with-most-water', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/20-container-with-most-water'] = problem;

})();
```

## Checklist for New Problems

- [ ] Created problem JS file with correct naming
- [ ] Added all required fields (name, difficulty, algorithm, description, complexity, examples)
- [ ] Each example has input, output, and explanation
- [ ] Updated category _loader.js
- [ ] Registered visualization handler (if custom visualization needed)
- [ ] Tested visualization in browser
- [ ] Verified all examples work correctly

## Migration from MD to JS

All 259 problems have been migrated from Markdown to JS format. The old `problem.md` files have been removed. Use the existing JS files in `/frontend/static/js/problems/` as reference for the new format.

## Questions?

For questions or issues, check the existing problem files for examples or open an issue in the repository.
