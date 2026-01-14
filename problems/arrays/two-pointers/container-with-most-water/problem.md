# Container With Most Water

## Problem Description

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i-th` line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

**Note:** You may not slant the container.

**Constraints:**
- n == height.length
- 2 <= n <= 10^5
- 0 <= height[i] <= 10^4

## Examples

### Example 1:
```
Input: height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
Output: 49
Explanation: The vertical lines are drawn at positions 0-8.
The max area is between lines at index 1 (height=8) and index 8 (height=7).
Area = min(8, 7) * (8 - 1) = 7 * 7 = 49
```

### Example 2:
```
Input: height = [1, 1]
Output: 1
Explanation: Area = min(1, 1) * (1 - 0) = 1
```

### Example 3:
```
Input: height = [4, 3, 2, 1, 4]
Output: 16
Explanation: Area = min(4, 4) * (4 - 0) = 4 * 4 = 16
```

## Hints

<details>
<summary>Hint 1</summary>
Start with the widest container possible (first and last lines).
</details>

<details>
<summary>Hint 2</summary>
The area is limited by the shorter line. Moving the shorter line inward might find a taller line.
</details>

<details>
<summary>Hint 3</summary>
Use two pointers and always move the pointer pointing to the shorter line.
</details>

## Approach

Two-pointer greedy approach:
1. Start with pointers at both ends (maximum width)
2. Calculate area using minimum height and width
3. Move the pointer with smaller height inward
4. Why? Moving the taller line can only decrease area (width decreases, height can't increase beyond the shorter line)
5. Track maximum area throughout

**Time Complexity:** O(n)
**Space Complexity:** O(1)
