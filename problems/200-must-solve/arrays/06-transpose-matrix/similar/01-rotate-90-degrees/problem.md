# Rotate Matrix 90 Degrees Clockwise

**Difficulty:** Medium (Yellow)

## Problem Statement

Given an `n x n` 2D square matrix representing an image, rotate the matrix by 90 degrees clockwise **in-place**.

You must modify the input matrix directly. Do NOT allocate another 2D matrix for the rotation.

## Examples

**Example 1:**
```
Input: matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
Output: [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3]
]
```

**Example 2:**
```
Input: matrix = [
    [1,  2,  3,  4],
    [5,  6,  7,  8],
    [9,  10, 11, 12],
    [13, 14, 15, 16]
]
Output: [
    [13, 9,  5, 1],
    [14, 10, 6, 2],
    [15, 11, 7, 3],
    [16, 12, 8, 4]
]
```

## Constraints

- Matrix is always square: n x n
- 1 <= n <= 20
- -1000 <= matrix[i][j] <= 1000
- Must be done in-place (O(1) extra space)

---

## Thought Process & Pattern Recognition

### Understanding 90-Degree Rotation

**What happens to each element?**
- Element at position (i, j) moves to position (j, n-1-i)
- The first row becomes the last column
- The last row becomes the first column

```
Original:                   After 90 CW:
     col 0  col 1  col 2         col 0  col 1  col 2
    +------+------+------+      +------+------+------+
row 0|  1   |  2   |  3   | row 0|  7   |  4   |  1   |
    +------+------+------+      +------+------+------+
row 1|  4   |  5   |  6   | row 1|  8   |  5   |  2   |
    +------+------+------+      +------+------+------+
row 2|  7   |  8   |  9   | row 2|  9   |  6   |  3   |
    +------+------+------+      +------+------+------+

Element mappings:
  (0,0)->1 goes to (0,2)
  (0,1)->2 goes to (1,2)
  (0,2)->3 goes to (2,2)
  (1,0)->4 goes to (0,1)
  ...
```

### The Key Insight: Transpose + Reverse

**90 degrees clockwise = Transpose + Reverse each row**

```
Step 1: Transpose (swap across diagonal)
    [1, 2, 3]      [1, 4, 7]
    [4, 5, 6]  ->  [2, 5, 8]
    [7, 8, 9]      [3, 6, 9]

Step 2: Reverse each row
    [1, 4, 7]      [7, 4, 1]
    [2, 5, 8]  ->  [8, 5, 2]
    [3, 6, 9]      [9, 6, 3]
```

**Why does this work?**
- Transpose: (i, j) -> (j, i)
- Reverse row: (j, i) -> (j, n-1-i)
- Combined: (i, j) -> (j, n-1-i) = 90 CW rotation!

---

## Visual Diagram: Rotation Process

```
Original Matrix:           Transpose Step:            Reverse Rows:
+---+---+---+             +---+---+---+              +---+---+---+
| 1 | 2 | 3 |             | 1 | 4 | 7 |              | 7 | 4 | 1 |
+---+---+---+    swap     +---+---+---+    reverse   +---+---+---+
| 4 | 5 | 6 |   ------>   | 2 | 5 | 8 |   ------->  | 8 | 5 | 2 |
+---+---+---+   across    +---+---+---+    each     +---+---+---+
| 7 | 8 | 9 |   diagonal  | 3 | 6 | 9 |    row      | 9 | 6 | 3 |
+---+---+---+             +---+---+---+              +---+---+---+

For 4x4 matrix - Layer by layer rotation:
+----+----+----+----+
| A1 | A2 | A3 | A4 |   Layer 0 (outer): A1->A4, A4->A16, A16->A13, A13->A1
+----+----+----+----+
| B1 | C1 | C2 | B2 |   Layer 1 (inner): C1->C2, C2->C4, C4->C3, C3->C1
+----+----+----+----+
| B4 | C3 | C4 | B3 |
+----+----+----+----+
| A13| A14| A15| A16|
+----+----+----+----+
```

---

## Solution Approaches

### Approach 1: Transpose + Reverse (RECOMMENDED)

**Time Complexity:** O(n^2) - visit each element once for transpose, once for reverse
**Space Complexity:** O(1) - in-place modification

**Why This is Best:**
- Two simple, well-understood operations
- Easy to implement correctly
- Clear separation of concerns

```
Algorithm:
1. Transpose the matrix (swap matrix[i][j] with matrix[j][i] for i < j)
2. Reverse each row
```

### Approach 2: Four-Way Swap (Layer by Layer)

**Time Complexity:** O(n^2)
**Space Complexity:** O(1)

**When to Use:**
- Understanding how rotation fundamentally works
- Interview discussions about alternative approaches

```
Rotate layer by layer from outside to inside:
- For each layer, rotate 4 elements at a time
- temp = top-left
- top-left = bottom-left
- bottom-left = bottom-right
- bottom-right = top-right
- top-right = temp
```

### Approach 3: Reverse + Transpose (90 Counter-Clockwise)

**Time Complexity:** O(n^2)
**Space Complexity:** O(1)

**Note:** This gives 90 degrees counter-clockwise, not clockwise!

```
For 90 CCW: Reverse each row FIRST, then transpose
For 90 CW:  Transpose FIRST, then reverse each row
```

---

## Approach Comparison Summary

```
+---------------------------+---------+----------+-------------------+
|        Approach           |  Time   |  Space   |   Recommendation  |
+---------------------------+---------+----------+-------------------+
| 1. Transpose + Reverse    |  O(n^2) |   O(1)   |  BEST CHOICE      |
| 2. Four-Way Swap          |  O(n^2) |   O(1)   |  Good alternative |
| 3. Reverse + Transpose    |  O(n^2) |   O(1)   |  90 CCW rotation  |
+---------------------------+---------+----------+-------------------+
```

---

## Edge Cases to Consider

1. **1x1 matrix:** [[5]] -> [[5]] (no change)
2. **2x2 matrix:** Simplest non-trivial case
3. **Odd dimension:** Center element stays in place
4. **Even dimension:** No fixed center element

---

## Hints

<details>
<summary>Hint 1</summary>
Observe what happens to the first row after rotation - it becomes the last column.
</details>

<details>
<summary>Hint 2</summary>
Try breaking down 90-degree rotation into two simpler operations: transpose and reverse.
</details>

<details>
<summary>Hint 3</summary>
For transpose, only swap elements above the diagonal to avoid double-swapping.
</details>

---

## Related Problems

- Rotate Image (LeetCode 48)
- Rotate Matrix 180 Degrees
- Rotate Matrix 90 Degrees Counter-Clockwise
