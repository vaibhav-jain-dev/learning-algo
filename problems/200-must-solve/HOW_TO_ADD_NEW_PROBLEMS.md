# How to Add New Problems to the 200 Questions Dashboard

This guide explains how to add new algorithm problems and their visualizations to the 200 Must-Solve Problems dashboard.

## Quick Start

1. Create problem definition JS file in `/frontend/static/js/problems/{category}/`
2. Create solution files (Python & Go) in `/problems/200-must-solve/{category}/{problem-id}/`
3. Register with the ProblemRenderer
4. Update the category's `_loader.js`

## Directory Structure Overview

```
learning-algo/
├── frontend/static/js/problems/     # Problem definitions (JS)
│   ├── arrays/
│   │   ├── _loader.js
│   │   ├── 01-validate-subsequence.js
│   │   └── ...
│   └── {other-categories}/
│
└── problems/200-must-solve/         # Solution code (Python/Go)
    ├── arrays/
    │   ├── 01-validate-subsequence/
    │   │   ├── python_code.py
    │   │   ├── golang_code.go
    │   │   └── similar/
    │   └── ...
    └── {other-categories}/
```

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

---

## Solution File Format (Python/Go)

Solution files contain the actual code implementations with multiple approaches. The UI parses these files to display collapsible approach cards with explanations.

### File Location

```
/problems/200-must-solve/{category}/{problem-id}/
├── python_code.py
├── golang_code.go
└── similar/           # Optional: similar harder problems
```

### Approach Header Format

Each approach MUST follow this header structure:

```python
# ============================================================================
# APPROACH 1: Descriptive Name ⭐ RECOMMENDED (optional star for best approach)
# ============================================================================
# Time Complexity:  O(n) - explanation of why
# Space Complexity: O(1) - explanation of why
#
# WHY THIS IS BEST: (or WHEN TO USE THIS)
# - Reason 1
# - Reason 2
# - Comparison with other approaches
# ============================================================================

def function_name(params) -> ReturnType:
    """
    Brief description of what this function does.

    How it works:
    1. Step 1 explanation
    2. Step 2 explanation
    3. Step 3 explanation

    Visual: (optional ASCII diagram)
        array:    [5, 1, 22, 25, 6, -1, 8, 10]
        sequence: [1, 6, -1, 10]

        Matching: 5≠1, 1=1✓, 22≠6, 25≠6, 6=6✓, -1=-1✓, 8≠10, 10=10✓

    Edge Cases:
    - Empty array: return False
    - Single element: check direct match
    - Sequence longer than array: return False

    Best Performance:
    - When sequence elements are at the beginning of array
    - When sequence is very short

    Worst Performance:
    - When sequence elements are at the end of array
    - When many near-matches exist
    """
    # Implementation code here
    pass
```

### UI Display Sections

The Solutions tab in the UI displays each approach as a collapsible card with these sections:

| Section | Source | Description |
|---------|--------|-------------|
| **Flow Explanation** | Docstring "How it works" | Step-by-step algorithm walkthrough |
| **Time Complexity** | Header comment | Big-O notation with reasoning |
| **Space Complexity** | Header comment | Memory usage analysis |
| **Edge Cases** | Docstring "Edge Cases" | Boundary conditions to handle |
| **Best Performance** | Docstring "Best Performance" | When algorithm excels |
| **Worst Performance** | Docstring "Worst Performance" | When algorithm struggles |
| **Why Better** | Header "WHY THIS IS BEST" | Comparison with other approaches |

### Complete Solution File Example

```python
"""
Two Number Sum - Python Solutions

Given an array of integers and a target sum, return the pair of numbers
that add up to the target.

This file contains MULTIPLE solution approaches with explanations.
"""

from typing import List, Optional, Tuple


# ============================================================================
# APPROACH 1: Hash Table ⭐ RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - single pass through array
# Space Complexity: O(n) - hash table stores up to n elements
#
# WHY THIS IS BEST:
# - Optimal O(n) time complexity
# - Simple and clean implementation
# - Works for unsorted arrays
# - Easy to extend for k-sum problems
# ============================================================================

def two_number_sum(array: List[int], target_sum: int) -> List[int]:
    """
    Find two numbers that sum to target using hash table.

    How it works:
    1. Create empty hash set to store seen numbers
    2. For each number, calculate complement (target - number)
    3. If complement exists in hash set, return pair
    4. Otherwise, add current number to hash set
    5. If no pair found, return empty list

    Visual:
        array = [3, 5, -4, 8, 11, 1, -1, 6], target = 10

        Step 1: num=3,  need=7,  seen={}        → add 3
        Step 2: num=5,  need=5,  seen={3}       → add 5
        Step 3: num=-4, need=14, seen={3,5}     → add -4
        Step 4: num=8,  need=2,  seen={3,5,-4}  → add 8
        Step 5: num=11, need=-1, seen={...}     → -1 not found, add 11
        Step 6: num=1,  need=9,  seen={...}     → add 1
        Step 7: num=-1, need=11, seen={...,-1}  → 11 FOUND! Return [-1, 11]

    Edge Cases:
    - Empty array: return []
    - Single element: return [] (need two numbers)
    - No valid pair exists: return []
    - Multiple valid pairs: return first found
    - Negative numbers: handled naturally

    Best Performance:
    - When target pair is near the end (early exit)
    - Dense arrays with many potential matches

    Worst Performance:
    - When no valid pair exists (must scan entire array)
    - Very sparse arrays with few potential matches
    """
    seen = set()

    for num in array:
        complement = target_sum - num
        if complement in seen:
            return [complement, num]
        seen.add(num)

    return []


# ============================================================================
# APPROACH 2: Two Pointer (Sorted Array)
# ============================================================================
# Time Complexity:  O(n log n) - dominated by sorting
# Space Complexity: O(1) - in-place if allowed to modify, O(n) otherwise
#
# WHEN TO USE THIS:
# - When array is already sorted
# - When you need to find ALL pairs (not just one)
# - When space is extremely limited
# ============================================================================

def two_number_sum_sorted(array: List[int], target_sum: int) -> List[int]:
    """
    Find two numbers using two pointers on sorted array.

    How it works:
    1. Sort the array (or assume sorted)
    2. Place left pointer at start, right pointer at end
    3. Calculate sum of elements at both pointers
    4. If sum equals target, return pair
    5. If sum < target, move left pointer right (need larger)
    6. If sum > target, move right pointer left (need smaller)

    Visual:
        sorted = [-4, -1, 1, 3, 5, 6, 8, 11], target = 10

        L=0, R=7: -4 + 11 = 7  < 10 → move L right
        L=1, R=7: -1 + 11 = 10 = 10 → FOUND! Return [-1, 11]

    Edge Cases:
    - Already sorted input: skip sort step
    - Duplicates: works correctly
    - All same elements: works correctly

    Best Performance:
    - Array already sorted (skip O(n log n) sort)
    - Target pair near middle of sorted array

    Worst Performance:
    - Unsorted array (must sort first)
    - Target pair at extremes
    """
    array.sort()
    left, right = 0, len(array) - 1

    while left < right:
        current_sum = array[left] + array[right]
        if current_sum == target_sum:
            return [array[left], array[right]]
        elif current_sum < target_sum:
            left += 1
        else:
            right -= 1

    return []
```

### Go Solution Format

Go solutions follow the same structure with Go-style comments:

```go
package main

// ============================================================================
// APPROACH 1: Hash Table ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - single pass through array
// Space Complexity: O(n) - hash map stores up to n elements
//
// WHY THIS IS BEST:
// - Optimal O(n) time complexity
// - Idiomatic Go with map usage
// - Works for unsorted arrays
// ============================================================================

// TwoNumberSum finds two numbers that sum to target using hash table.
//
// How it works:
// 1. Create map to store seen numbers
// 2. For each number, check if complement exists
// 3. Return pair if found, empty slice otherwise
//
// Edge Cases:
// - Empty slice: return nil
// - No valid pair: return nil
func TwoNumberSum(array []int, target int) []int {
    seen := make(map[int]bool)

    for _, num := range array {
        complement := target - num
        if seen[complement] {
            return []int{complement, num}
        }
        seen[num] = true
    }

    return nil
}
```

---

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

### Problem Definition (JS)
- [ ] Created problem JS file in `/frontend/static/js/problems/{category}/`
- [ ] Added all required fields (name, difficulty, algorithm, description, complexity, examples)
- [ ] Each example has input, output, and explanation
- [ ] Updated category `_loader.js` to include new problem
- [ ] Registered with `ProblemRenderer`

### Solution Files (Python/Go)
- [ ] Created folder `/problems/200-must-solve/{category}/{problem-id}/`
- [ ] Created `python_code.py` with multiple approaches
- [ ] Created `golang_code.go` with multiple approaches
- [ ] Each approach has header with:
  - [ ] `APPROACH N:` title
  - [ ] Time Complexity with explanation
  - [ ] Space Complexity with explanation
  - [ ] `WHY THIS IS BEST` or `WHEN TO USE THIS` section
- [ ] Each function has docstring with:
  - [ ] `How it works:` step-by-step explanation
  - [ ] `Edge Cases:` list of boundary conditions
  - [ ] `Best Performance:` when algorithm excels
  - [ ] `Worst Performance:` when algorithm struggles
  - [ ] Optional: `Visual:` ASCII diagram

### Testing
- [ ] Tested visualization in browser (Visualize tab)
- [ ] Tested Solutions tab shows all approaches with explanations
- [ ] Tested Python/Go tabs display correctly
- [ ] Verified code runs without errors
- [ ] Verified all examples work correctly

## Migration from MD to JS

All 259 problems have been migrated from Markdown to JS format. The old `problem.md` files have been removed. Use the existing JS files in `/frontend/static/js/problems/` as reference for the new format.

## Questions?

For questions or issues, check the existing problem files for examples or open an issue in the repository.
