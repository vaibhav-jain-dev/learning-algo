# Disk Stacking

**Difficulty:** Hard (Red)

## Problem Statement

You are given an array of disks where each disk is represented as an array of three values: [width, depth, height]. Write a function that returns an array representing the disks in a stack that has the maximum height.

A disk can only be placed on top of another disk if its width, depth, and height are all strictly less than the other disk's corresponding dimensions. The stack must maintain this property from bottom to top.

## Examples

**Example 1:**
```
Input: disks = [[2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [1, 3, 1], [4, 4, 5]]
Output: [[2, 1, 2], [3, 2, 3], [4, 4, 5]]
Explanation: Total height = 2 + 3 + 5 = 10
```

**Example 2:**
```
Input: disks = [[2, 1, 2]]
Output: [[2, 1, 2]]
Explanation: Single disk, height = 2
```

**Example 3:**
```
Input: disks = [[1, 1, 1], [2, 2, 2], [3, 3, 3]]
Output: [[1, 1, 1], [2, 2, 2], [3, 3, 3]]
Explanation: All disks can be stacked, total height = 6
```

## Constraints

- Each disk is represented as [width, depth, height]
- All dimensions are positive integers
- A disk can be on top only if ALL three dimensions are strictly smaller
- Return the actual disks in the stack (not just indices or height)

## Hints

<details>
<summary>Hint 1</summary>
Sort the disks by one dimension (e.g., height) first. This ensures that a valid disk to stack below is always processed before.
</details>

<details>
<summary>Hint 2</summary>
This is similar to Longest Increasing Subsequence, but with 3D comparison.
</details>

<details>
<summary>Hint 3</summary>
Use dp[i] to track the maximum height achievable ending with disk i. Track the previous disk to reconstruct the stack.
</details>

## Approach

### Dynamic Programming
1. Sort disks by height (or any dimension)
2. For each disk i:
   - Check all previous disks j
   - If disk j can go below disk i (all dimensions smaller):
     - Update dp[i] = max(dp[i], dp[j] + height[i])
     - Track the previous disk
3. Find the disk with maximum dp value
4. Backtrack to build the stack

**Time Complexity:** O(n^2) where n is the number of disks
**Space Complexity:** O(n)

---

## Similar Problems (Harder)

### 1. Box Stacking (Rotations Allowed)
**Difficulty:** Hard

Each box can be rotated to use different faces as the base.

### 2. Russian Doll Envelopes
**Difficulty:** Hard

2D version: envelope [w, h] fits in another only if both dimensions are smaller.

### 3. Maximum Height Cuboids
**Difficulty:** Very Hard

Similar to disk stacking but with cuboids that can be rotated.
