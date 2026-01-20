<div id="viz-config" style="display:none">
{"name":"Spiral Traverse","algorithm":"spiral-matrix","complexity":{"time":"O(n)","space":"O(n)"},"examples":[{"input":{"matrix":[[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]]},"output":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"inputRaw":"4x4 matrix","outputRaw":"[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]"},{"input":{"matrix":[[1,2,3],[8,9,4],[7,6,5]]},"output":[1,2,3,4,5,6,7,8,9],"inputRaw":"3x3 matrix","outputRaw":"[1,2,3,4,5,6,7,8,9]"}]}
</div>

# Spiral Traverse

**Difficulty:** Medium (Blue)

## Problem Statement

Write a function that takes in an n x m two-dimensional array (that can be square-shaped when n == m) and returns a one-dimensional array of all the array's elements in spiral order.

Spiral order starts at the top left corner of the two-dimensional array, goes to the right, and proceeds in a spiral pattern all the way until every element has been visited.

## Examples

**Example 1:**
```
Input: array = [
    [1,  2,  3,  4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10, 9,  8,  7]
]
Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
```

**Example 2:**
```
Input: array = [
    [1, 2, 3],
    [8, 9, 4],
    [7, 6, 5]
]
Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Constraints

- Matrix can be non-square (n x m)
- Matrix will have at least one element
- Elements can be any integers

## Hints

<details>
<summary>Hint 1</summary>
Think of it as peeling layers from the outside to the inside.
</details>

<details>
<summary>Hint 2</summary>
Track boundaries: startRow, endRow, startCol, endCol. Shrink them after each full spiral.
</details>

<details>
<summary>Hint 3</summary>
Handle the edge cases for single row or single column remaining.
</details>

## Approach

### Layer by Layer (Iterative)
1. Initialize boundaries: startRow=0, endRow=n-1, startCol=0, endCol=m-1
2. While startRow <= endRow AND startCol <= endCol:
   - Traverse right: startRow from startCol to endCol
   - Traverse down: endCol from startRow+1 to endRow
   - Traverse left: endRow from endCol-1 to startCol (if startRow < endRow)
   - Traverse up: startCol from endRow-1 to startRow+1 (if startCol < endCol)
   - Shrink boundaries
3. Return the result array

**Time Complexity:** O(n * m)
**Space Complexity:** O(n * m) for output

---

## Similar Problems (Harder)

### 1. Spiral Matrix II (Generate)
**Difficulty:** Medium

Generate an n x n matrix filled with elements 1 to n² in spiral order.

```
Input: n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]
```

### 2. Spiral Matrix III (Starting Point)
**Difficulty:** Medium

Start from a given cell and visit all cells in spiral order, returning coordinates in visit order.

```
Input: rows = 5, cols = 6, rStart = 1, cStart = 4
Output: [[1,4],[1,5],[2,5],[2,4],...all cells]
```

### 3. Anti-Spiral Traverse
**Difficulty:** Hard

Traverse matrix in anti-spiral order (counterclockwise from center outward).

```
Input: 3x3 matrix
Output: Center first, then counterclockwise expanding spiral
```
