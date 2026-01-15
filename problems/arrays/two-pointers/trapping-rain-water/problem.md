# Trapping Rain Water

## Problem Statement

Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

## Examples

### Example 1

```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6

Visual representation:
       #
   #~~~##~#
 #~##~#####
0102101321 21

Legend: # = elevation block, ~ = trapped water
```

**Explanation:** The elevation map (shown as bars) traps 6 units of rain water.

### Example 2

```
Input: height = [4,2,0,3,2,5]
Output: 9

Visual representation:
#       #
#   #   #
# # # # #
# # # # #
4 2 0 3 2 5
```

**Explanation:**
- Between index 0 and 5, water is trapped at various levels
- At index 1: min(4,5) - 2 = 2 units
- At index 2: min(4,5) - 0 = 4 units
- At index 3: min(4,5) - 3 = 1 unit
- At index 4: min(4,5) - 2 = 2 units
- Total: 2 + 4 + 1 + 2 = 9 units

### Example 3

```
Input: height = [1,0,2,0,1]
Output: 2

Explanation:
- At index 1: min(1,2) - 0 = 1 unit
- At index 3: min(2,1) - 0 = 1 unit
- Total: 2 units
```

### Example 4 (Edge Case)

```
Input: height = [3,2,1]
Output: 0

Explanation: Water cannot be trapped as there's no right boundary higher than any position.
```

## Constraints

- `n == height.length`
- `1 <= n <= 2 * 10^4`
- `0 <= height[i] <= 10^5`

## Hints

<details>
<summary>Hint 1: Think about what determines water level</summary>

For any position, the water level is determined by the minimum of:
- The maximum height to its left
- The maximum height to its right

Water trapped = water level - current height (if positive)
</details>

<details>
<summary>Hint 2: Brute Force Approach</summary>

For each element, find the maximum element on its left and right. The water at that position = min(left_max, right_max) - height[i].

This takes O(n^2) time. Can we do better?
</details>

<details>
<summary>Hint 3: Precomputation Approach</summary>

Precompute left_max[] and right_max[] arrays:
- left_max[i] = max height from index 0 to i
- right_max[i] = max height from index i to n-1

Then water at position i = min(left_max[i], right_max[i]) - height[i]

This is O(n) time but O(n) space. Can we reduce space?
</details>

<details>
<summary>Hint 4: Two Pointer Optimization</summary>

Use two pointers from both ends. The key insight is:
- If left_max < right_max, water at left depends only on left_max
- If right_max <= left_max, water at right depends only on right_max

We only need to track left_max and right_max as single variables!
</details>

## Approach: Two Pointers

### Intuition

The key insight is that at any position, the water level is determined by the **minimum** of the maximum heights on both sides. Using two pointers, we can process the side with the smaller maximum first, because we know for certain that side is the limiting factor.

### Algorithm

1. Initialize two pointers: `left = 0` and `right = n - 1`
2. Initialize `left_max = 0` and `right_max = 0`
3. While `left < right`:
   - If `height[left] < height[right]`:
     - If `height[left] >= left_max`: update `left_max`
     - Else: add `left_max - height[left]` to result (water trapped)
     - Move `left` pointer right
   - Else:
     - If `height[right] >= right_max`: update `right_max`
     - Else: add `right_max - height[right]` to result (water trapped)
     - Move `right` pointer left

### Why This Works

- When `height[left] < height[right]`, we know `right_max >= height[right] > height[left]`
- So the water at `left` is bounded by `left_max` (the smaller side)
- Similarly for the right side when `height[right] <= height[left]`

### Complexity Analysis

- **Time Complexity:** O(n) - each element is visited at most once
- **Space Complexity:** O(1) - only using a constant number of variables

### Visual Walkthrough

```
height = [0,1,0,2,1,0,1,3,2,1,2,1]

Step-by-step:
left=0, right=11, left_max=0, right_max=0, water=0
  height[0]=0 < height[11]=1
  left_max = max(0,0) = 0
  water += 0 - 0 = 0
  left = 1

left=1, right=11, left_max=0, right_max=0, water=0
  height[1]=1 >= height[11]=1
  right_max = max(0,1) = 1
  water += 1 - 1 = 0
  right = 10

left=1, right=10, left_max=0, right_max=1, water=0
  height[1]=1 < height[10]=2
  left_max = max(0,1) = 1
  water += 0
  left = 2

... (continues until left meets right)

Final water = 6
```

## Related Problems

- Container With Most Water
- Product of Array Except Self
- Maximum Subarray

## Tags

`Array` `Two Pointers` `Dynamic Programming` `Stack` `Monotonic Stack`
