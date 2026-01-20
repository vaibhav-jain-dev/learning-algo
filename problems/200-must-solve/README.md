# 200 Must-Solve Problems Bank

This directory contains a curated collection of 200 essential algorithmic problems organized by topic, each with complete solutions in Python and Go.

## Directory Structure

```
200-must-solve/
├── arrays/                    # Array manipulation problems
├── binary-search-trees/       # BST operations and traversals
├── binary-trees/              # General binary tree problems
├── dynamic-programming/       # DP problems (memoization, tabulation)
├── famous-algorithms/         # Classic algorithms (Dijkstra, KMP, etc.)
├── graphs/                    # Graph traversal and algorithms
├── linked-lists/              # Linked list operations
├── recursion/                 # Recursive problem solving
└── README.md                  # This file
```

## Problem Format

Each problem follows this structure:

```
XX-problem-name/
├── problem.md          # Problem description with examples, hints, and approach
├── python_code.py      # Python solution with tests
├── golang_code.go      # Go solution with tests
└── similar/            # (Optional) Related harder problems
    ├── 1/
    │   ├── problem.md
    │   ├── python_code.py
    │   └── golang_code.go
    ├── 2/
    └── 3/
```

## Adding a New Problem

### 1. Create the Problem Directory

```bash
mkdir -p problems/200-must-solve/{category}/{XX-problem-name}
```

Use the format `XX-` where `XX` is a two-digit number (01, 02, etc.) for ordering.

### 2. Create problem.md

The `problem.md` file should contain:

```markdown
# Problem Name

**Difficulty:** Easy/Medium/Hard/Very Hard (Color: Green/Yellow/Orange/Purple)

## Problem Statement

Clear description of the problem.

## Examples

**Example 1:**
```
Input: ...
Output: ...
Explanation: (optional)
```

## Constraints

- Constraint 1
- Constraint 2

## Hints

<details>
<summary>Hint 1</summary>
First hint text here.
</details>

<details>
<summary>Hint 2</summary>
Second hint text here.
</details>

<details>
<summary>Hint 3</summary>
Third hint text here.
</details>

## Approach

### Approach Name
Description of the approach.

**Time Complexity:** O(...)
**Space Complexity:** O(...)

---

## Similar Problems (Harder)

### 1. Similar Problem Name
**Difficulty:** Medium/Hard

Description of the similar problem.
```

### 3. Create python_code.py

```python
"""
Problem Name - Python Solution

Brief description of the solution approach.

Time Complexity: O(...)
Space Complexity: O(...)
"""

from typing import List


def solution_function(params) -> ReturnType:
    """
    Main solution function.

    Args:
        params: Description

    Returns:
        Description of return value
    """
    # Implementation here
    pass


# Test cases
if __name__ == "__main__":
    # Test 1: Basic case
    result1 = solution_function(test_input1)
    print(f"Test 1: {result1}")  # Expected: ...
    assert result1 == expected1

    # Test 2: Edge case
    result2 = solution_function(test_input2)
    print(f"Test 2: {result2}")  # Expected: ...
    assert result2 == expected2

    print("\nAll tests passed!")
```

### 4. Create golang_code.go

```go
/*
Problem Name - Go Solution

Brief description of the solution approach.

Time Complexity: O(...)
Space Complexity: O(...)
*/

package main

import (
    "fmt"
)

// SolutionFunction solves the problem
func SolutionFunction(params Type) ReturnType {
    // Implementation here
    return result
}

func main() {
    // Test 1: Basic case
    result1 := SolutionFunction(testInput1)
    fmt.Printf("Test 1: %v\n", result1) // Expected: ...

    // Test 2: Edge case
    result2 := SolutionFunction(testInput2)
    fmt.Printf("Test 2: %v\n", result2) // Expected: ...

    fmt.Println("\nAll tests completed!")
}
```

### 5. (Optional) Add Similar Problems

For each similar (harder) problem, create a numbered subdirectory under `similar/`:

```bash
mkdir -p problems/200-must-solve/{category}/{XX-problem-name}/similar/{1,2,3}
```

Each similar problem directory should have the same structure (problem.md, python_code.py, golang_code.go).

## File Requirements

### problem.md
- **Required sections:** Problem Statement, Examples, Constraints
- **Optional but recommended:** Hints (as collapsible details), Approach, Similar Problems
- Hints should use `<details>` tags for progressive disclosure
- Include time and space complexity analysis

### python_code.py
- Must be valid, runnable Python 3 code
- Include type hints where applicable
- Include docstrings for main functions
- Include test cases at the bottom with assertions
- All tests should pass when running `python python_code.py`

### golang_code.go
- Must be valid, compilable Go code
- Use package `main` with a `main()` function
- Include comments documenting the approach
- Include test cases in main() function
- All tests should pass when running `go run golang_code.go`

## Naming Conventions

- **Directories:** lowercase with hyphens (e.g., `01-validate-subsequence`)
- **Python functions:** snake_case (e.g., `validate_subsequence`)
- **Go functions:** PascalCase for exported (e.g., `ValidateSubsequence`)
- **Problem numbers:** Two-digit prefix (01, 02, ... 99)

## Difficulty Levels

| Level | Color | Description |
|-------|-------|-------------|
| Easy | Green | Basic data structure operations, simple algorithms |
| Medium | Yellow | Requires understanding of patterns, moderate complexity |
| Hard | Orange | Complex algorithms, optimization required |
| Very Hard | Purple | Advanced techniques, multiple concepts combined |

## Categories

### Arrays (14 problems)
Basic array operations, two pointers, sliding window, sorting.

### Binary Search Trees (11 problems)
BST construction, validation, traversal, searching.

### Binary Trees (13 problems)
Tree traversal, depth calculations, tree manipulation.

### Dynamic Programming (15 problems)
Memoization, tabulation, optimization problems.

### Graphs (11 problems)
DFS, BFS, cycle detection, connected components.

### Linked Lists (10 problems)
List manipulation, fast/slow pointers, reversal.

### Recursion (11 problems)
Recursive patterns, backtracking, permutations.

### Famous Algorithms (8 problems)
Kadane's, Dijkstra's, Topological Sort, KMP, Union Find.

## Integration with Frontend

The frontend automatically:
1. Reads problem.md and renders it with syntax highlighting
2. Loads python_code.py and golang_code.go for the code editor
3. Extracts hints from problem.md for the Hints tab
4. Shows solutions in the Solutions tab

### Visualization System

For problems that benefit from visualization:
1. The visualization is auto-generated based on problem category
2. Custom visualizations can be added by extending the JS in `200-problems.js`
3. Supported visualization types: arrays, trees, graphs, DP tables, linked lists

## Running Tests

### Python
```bash
python problems/200-must-solve/{category}/{problem}/python_code.py
```

### Go
```bash
go run problems/200-must-solve/{category}/{problem}/golang_code.go
```

## Contributing

When adding new problems:
1. Follow the file structure and naming conventions above
2. Ensure all test cases pass
3. Include at least 3 test cases (basic, edge, complex)
4. Add complexity analysis
5. Consider adding 1-3 similar harder problems for practice progression
