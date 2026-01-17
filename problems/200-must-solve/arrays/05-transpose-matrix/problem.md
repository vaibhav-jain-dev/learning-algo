# Transpose Matrix

**Difficulty:** Easy (Green)

## Problem Statement

You're given a 2D array of integers `matrix`. Write a function that returns the transpose of the matrix.

The transpose of a matrix is a flipped version of the original matrix across its main diagonal (which runs from top-left to bottom-right); it switches the row and column indices of the original matrix.

## Examples

**Example 1:**
```
Input: matrix = [
    [1, 2],
    [3, 4],
    [5, 6]
]
Output: [
    [1, 3, 5],
    [2, 4, 6]
]
```

**Example 2:**
```
Input: matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
Output: [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
]
```

## Constraints

- Matrix dimensions: rows >= 1, cols >= 1
- Original matrix has dimensions m x n
- Transposed matrix has dimensions n x m

## Hints

<details>
<summary>Hint 1</summary>
The element at position (i, j) in the original matrix goes to position (j, i) in the transpose.
</details>

<details>
<summary>Hint 2</summary>
Create a new matrix with dimensions swapped (n x m instead of m x n).
</details>

<details>
<summary>Hint 3</summary>
Iterate through the original matrix and place each element in its new position.
</details>

## Approach

### Direct Construction
1. Get dimensions: rows = m, cols = n
2. Create new matrix with dimensions n x m
3. For each element at (i, j) in original:
   - Place it at (j, i) in transpose
4. Return the new matrix

**Time Complexity:** O(m * n) where m is rows and n is columns
**Space Complexity:** O(m * n) for the output matrix

---

## Similar Problems (Harder)

### 1. Rotate Matrix 90 Degrees
**Difficulty:** Medium

Rotate a square matrix 90 degrees clockwise in-place.

```
Input: [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
```

### 2. Spiral Matrix Transpose
**Difficulty:** Medium

Given a matrix, first traverse it in spiral order, then arrange the elements into a transposed matrix shape.

```
Input: [[1,2,3],[4,5,6],[7,8,9]]
Spiral: [1,2,3,6,9,8,7,4,5]
Output as 3x3 transpose: [[1,6,7],[2,9,4],[3,8,5]]
```

### 3. Block Matrix Transpose
**Difficulty:** Hard

Transpose a matrix divided into blocks, where each block is also transposed independently.

```
Input: 4x4 matrix with 2x2 blocks
Output: Blocks rearranged AND each block internally transposed
```
