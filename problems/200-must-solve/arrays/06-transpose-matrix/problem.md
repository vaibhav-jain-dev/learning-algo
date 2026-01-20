<div id="viz-config" style="display:none">
{"name":"Transpose Matrix","algorithm":"matrix-transpose","complexity":{"time":"O(m*n)","space":"O(m*n)"},"examples":[{"input":{"matrix":[[1,2],[3,4],[5,6]]},"output":[[1,3,5],[2,4,6]],"inputRaw":"3x2 matrix","outputRaw":"2x3 matrix"},{"input":{"matrix":[[1,2,3],[4,5,6],[7,8,9]]},"output":[[1,4,7],[2,5,8],[3,6,9]],"inputRaw":"3x3 matrix","outputRaw":"3x3 matrix"}]}
</div>

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

---

## 🧠 Thought Process & Pattern Recognition

### Understanding Transpose

**What is a transpose?**
- Rows become columns, columns become rows
- Element at position (i, j) moves to position (j, i)
- A 3×2 matrix becomes a 2×3 matrix

```
Original (3×2):          Transpose (2×3):
┌─────┬─────┐           ┌─────┬─────┬─────┐
│ 1   │ 2   │           │ 1   │ 3   │ 5   │
├─────┼─────┤    →      ├─────┼─────┼─────┤
│ 3   │ 4   │           │ 2   │ 4   │ 6   │
├─────┼─────┤           └─────┴─────┴─────┘
│ 5   │ 6   │
└─────┴─────┘

Row 0 of original becomes Column 0 of transpose
Row 1 of original becomes Column 1 of transpose
```

### The Key Insight

**Position Mapping:** `result[j][i] = original[i][j]`

This is the entire algorithm! Just copy elements with swapped indices.

### Why Not In-Place for Non-Square?

For a non-square matrix (m ≠ n), the dimensions change:
- Original: m × n
- Transpose: n × m

You can't do this in-place because the memory layout changes!

For square matrices (m = m), in-place transpose IS possible.

---

## 📊 Visual Diagram: How It Works

```
Original Matrix (3 rows × 2 cols):

     col 0    col 1
    ┌────────┬────────┐
row 0│   1    │   2    │  →  becomes column 0
    ├────────┼────────┤
row 1│   3    │   4    │  →  becomes column 1
    ├────────┼────────┤
row 2│   5    │   6    │  →  becomes column 2
    └────────┴────────┘

Transposed Matrix (2 rows × 3 cols):

     col 0    col 1    col 2
    ┌────────┬────────┬────────┐
row 0│   1    │   3    │   5    │  ← was column 0
    ├────────┼────────┼────────┤
row 1│   2    │   4    │   6    │  ← was column 1
    └────────┴────────┴────────┘

Element Mapping:
  original[0][0]=1 → transpose[0][0]=1
  original[0][1]=2 → transpose[1][0]=2
  original[1][0]=3 → transpose[0][1]=3
  original[1][1]=4 → transpose[1][1]=4
  original[2][0]=5 → transpose[0][2]=5
  original[2][1]=6 → transpose[1][2]=6
```

---

## 🔄 Solution Approaches

### Approach 1: Direct Construction ⭐ RECOMMENDED

**Time Complexity:** O(m × n) - visit each element once
**Space Complexity:** O(m × n) - for the output matrix

**Why This is Best:**
- Simple and intuitive
- Single pass through all elements
- Works for any matrix dimensions
- No extra space beyond output

```
Algorithm:
1. Get dimensions: m rows, n cols
2. Create new matrix: n rows, m cols
3. For each (i, j) in original:
   Set transpose[j][i] = original[i][j]
4. Return transpose
```

### Approach 2: Column Extraction

**Time Complexity:** O(m × n)
**Space Complexity:** O(m × n)

**When to Use:**
- When thinking row-by-row feels more natural
- Building result row by row

```
Think of it as: Each column of original becomes a row of result

For j = 0 to cols-1:
    result[j] = [original[0][j], original[1][j], ..., original[m-1][j]]
```

### Approach 3: In-Place for Square Matrix

**Time Complexity:** O(n²)
**Space Complexity:** O(1) - truly in-place!

**When to Use:**
- Only for SQUARE matrices (m = n)
- When memory is critical
- Interview follow-up question

```
For square matrix only:
For i = 0 to n-1:
    For j = i+1 to n-1:  # Only upper triangle!
        Swap matrix[i][j] with matrix[j][i]
```

### Approach 4: Language-Specific (Pythonic)

**Time Complexity:** O(m × n)
**Space Complexity:** O(m × n)

**Python Magic:**
```python
# Using zip(*matrix) unpacks rows, zip collects by position
transpose = [list(row) for row in zip(*matrix)]
```

---

## 📊 Approach Comparison Summary

```
┌──────────────────────────┬─────────┬──────────┬──────────────────┐
│        Approach          │  Time   │  Space   │  Recommendation  │
├──────────────────────────┼─────────┼──────────┼──────────────────┤
│ 1. Direct Construction   │ O(m×n)  │  O(m×n)  │  ⭐ BEST CHOICE  │
│ 2. Column Extraction     │ O(m×n)  │  O(m×n)  │  ✓ Alternative   │
│ 3. In-Place (square)     │ O(n²)   │   O(1)   │  ⚠️ Square only  │
│ 4. Pythonic (zip)        │ O(m×n)  │  O(m×n)  │  ✓ Python only   │
└──────────────────────────┴─────────┴──────────┴──────────────────┘
```

---

## Edge Cases to Consider

1. **Single element:** [[5]] → [[5]]
2. **Row vector:** [[1,2,3]] → [[1],[2],[3]]
3. **Column vector:** [[1],[2],[3]] → [[1,2,3]]
4. **Square matrix:** Can be done in-place

---

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

---

## Similar Problems (Harder)

### 1. Rotate Matrix 90 Degrees
**Difficulty:** Medium

Rotate a square matrix 90 degrees clockwise in-place.

```
Input: [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
```

**Hint:** Transpose + Reverse each row = 90° clockwise

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
