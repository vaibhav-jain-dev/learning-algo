# Block Matrix Transpose

**Difficulty:** Hard

## Problem Statement

Transpose a matrix where elements are grouped into blocks of size k×k.

## Examples

**Example 1:**
```
Input (4x4 with 2x2 blocks):
  [[1, 2, 5, 6],
   [3, 4, 7, 8],
   [9, 10, 13, 14],
   [11, 12, 15, 16]]

Block structure:
  [A, B]    A=[1,2,3,4], B=[5,6,7,8]
  [C, D]    C=[9,10,11,12], D=[13,14,15,16]

Output (blocks transposed):
  [A^T, C^T]
  [B^T, D^T]
```

## Constraints

- Matrix dimensions are multiples of block_size
- 1 <= block_size <= min(rows, cols)
