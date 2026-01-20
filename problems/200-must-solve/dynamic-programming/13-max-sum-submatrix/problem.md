# Maximum Sum Submatrix

**Difficulty:** Very Hard (Black)

## Problem Statement

Given a 2D matrix of integers and a positive integer size, write a function that returns the maximum sum of any size x size submatrix within the given matrix.

## Examples

**Example 1:**
```
Input: matrix = [
  [5, 3, -1, 5],
  [-7, 3, 7, 4],
  [12, 8, 0, 0],
  [1, -8, -8, 2]
], size = 2

Output: 18
Explanation: The 2x2 submatrix with max sum is:
  [3, 7]
  [8, 0]
  Sum = 3 + 7 + 8 + 0 = 18
```

**Example 2:**
```
Input: matrix = [
  [1, 2],
  [3, 4]
], size = 1

Output: 4
Explanation: The maximum single element is 4
```

**Example 3:**
```
Input: matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
], size = 2

Output: 28
Explanation: The 2x2 submatrix [5,6,8,9] has sum 28
```

## Constraints

- Matrix is non-empty
- 1 <= size <= min(rows, cols)
- Matrix can contain negative integers
- Return the maximum sum (not the submatrix itself)

## Hints

<details>
<summary>Hint 1</summary>
Precompute prefix sums for the entire matrix to enable O(1) submatrix sum queries.
</details>

<details>
<summary>Hint 2</summary>
prefix[i][j] = sum of all elements in submatrix from (0,0) to (i-1,j-1).
</details>

<details>
<summary>Hint 3</summary>
Sum of submatrix from (r1,c1) to (r2,c2) = prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1].
</details>

## Approach

### Prefix Sum
1. Build prefix sum matrix where prefix[i][j] = sum of all elements in matrix[0:i][0:j]
2. For each valid top-left corner (r, c) of a size x size submatrix:
   - Calculate sum using prefix sums in O(1)
   - Update maximum if current sum is larger
3. Return maximum sum found

**Time Complexity:** O(rows * cols) to build prefix + O((rows-size+1) * (cols-size+1)) to find max
**Space Complexity:** O(rows * cols) for prefix sum matrix

---

## Similar Problems (Harder)

### 1. Maximum Submatrix Sum (Any Size)
**Difficulty:** Very Hard

Find the submatrix of any size with maximum sum (Kadane's 2D).

### 2. Maximum Sum Rectangle No Larger Than K
**Difficulty:** Very Hard

Find the maximum sum rectangle whose sum is at most K.

### 3. Count Submatrices with All Ones
**Difficulty:** Hard

Count submatrices containing only 1s in a binary matrix.
