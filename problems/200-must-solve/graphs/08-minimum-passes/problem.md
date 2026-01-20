<div id="viz-config" style="display:none">
{"name":"Minimum Passes of Matrix","algorithm":"graph-min-passes","complexity":{"time":"O(N * M)","space":"O(N * M)"},"examples":[{"input":{"matrix":[[0,-1,-3,2,0],[1,-2,-5,-1,-3],[3,0,0,-4,-1]]},"output":3,"inputRaw":"3x5 matrix with negatives","outputRaw":"3"},{"input":{"matrix":[[1,0,0,-2,-3],[-4,-5,-6,-2,-1],[0,0,0,0,-1],[1,2,3,0,-2]]},"output":-1,"inputRaw":"4x5 matrix with unreachable negatives","outputRaw":"-1"}]}
</div>

# Minimum Passes of Matrix

**Difficulty:** Medium (Yellow)

## Problem Statement

Write a function that takes in an integer matrix and returns the minimum number of passes required to convert all negative integers to positive integers.

A negative integer in the matrix can only be converted to a positive integer if one or more of its adjacent elements (horizontally or vertically adjacent, not diagonally) is positive. A pass consists of converting all negative integers that can be converted at that time.

Note that 0 is neither positive nor negative, meaning it cannot convert an adjacent negative integer.

If it's impossible to convert all negative integers to positive integers, the function should return -1.

## Examples

**Example 1:**
```
Input: matrix = [
    [0, -1, -3, 2, 0],
    [1, -2, -5, -1, -3],
    [3, 0, 0, -4, -1]
]

Output: 3

Explanation:
Pass 1: Convert -1 (adjacent to 2), -2 (adjacent to 1), -4 (adjacent to 3)
        Matrix becomes:
        [0, 1, -3, 2, 0]
        [1, 2, -5, 1, -3]
        [3, 0, 0, 4, -1]

Pass 2: Convert -3 (adjacent to 1), -5 (adjacent to 2), -3 (adjacent to 1), -1 (adjacent to 4)
        Matrix becomes:
        [0, 1, 3, 2, 0]
        [1, 2, 5, 1, 3]
        [3, 0, 0, 4, 1]

Pass 3: Matrix is already all non-negative

Actually it takes 3 passes total.
```

**Example 2:**
```
Input: matrix = [
    [1, 0, 0, -2, -3],
    [-4, -5, -6, -2, -1],
    [0, 0, 0, 0, -1],
    [1, 2, 3, 0, -2]
]

Output: -1

Explanation: Some negative values cannot be reached by positive values.
```

## Constraints

- Matrix contains integers (positive, negative, or zero)
- Adjacency is only horizontal and vertical (not diagonal)
- 0 cannot convert negative numbers
- Each pass converts all convertible negatives simultaneously

## Hints

<details>
<summary>Hint 1</summary>
Use BFS starting from all positive numbers simultaneously. Each BFS level represents one pass.
</details>

<details>
<summary>Hint 2</summary>
Keep track of the number of remaining negative integers. If BFS completes but negatives remain, return -1.
</details>

<details>
<summary>Hint 3</summary>
Initialize the queue with all positive integers, then process level by level, converting adjacent negatives.
</details>

## Approach

### Multi-source BFS
1. Find all positive integers and add them to a queue
2. Count total negative integers
3. Perform BFS level by level:
   - For each positive in current level, check adjacent cells
   - If adjacent cell is negative, convert it (make positive) and add to next level
   - Decrement negative count for each conversion
4. Count passes (BFS levels that converted at least one negative)
5. If negatives remain after BFS, return -1

**Time Complexity:** O(n * m) where n is rows and m is columns
**Space Complexity:** O(n * m) for the queue in worst case

---

## Similar Problems (Harder)

### 1. Minimum Passes with Obstacles
**Difficulty:** Hard

Some cells are obstacles that block conversion propagation. Find minimum passes considering obstacles.

### 2. Weighted Conversion Passes
**Difficulty:** Hard

Each negative has a "resistance" value. A negative can only be converted if the sum of adjacent positive values exceeds its resistance. Find minimum passes.

### 3. Conversion with Limited Range
**Difficulty:** Hard

Positive integers can only convert negatives within a certain Manhattan distance. Find minimum passes.
