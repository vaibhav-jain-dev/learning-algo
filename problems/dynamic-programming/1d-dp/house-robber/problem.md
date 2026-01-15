# House Robber

## Problem Description

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. The only constraint stopping you from robbing each of them is that adjacent houses have security systems connected - if two adjacent houses are robbed on the same night, the police will be alerted.

Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

## Examples

### Example 1
```
Input: nums = [1, 2, 3, 1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount = 1 + 3 = 4.
```

### Example 2
```
Input: nums = [2, 7, 9, 3, 1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount = 2 + 9 + 1 = 12.
```

### Example 3
```
Input: nums = [2, 1, 1, 2]
Output: 4
Explanation: Rob house 1 (money = 2) and house 4 (money = 2).
Total amount = 2 + 2 = 4.
```

## Constraints

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`

## Hints

<details>
<summary>Hint 1</summary>
For each house, you have two choices: rob it or skip it. If you rob the current house, you cannot rob the previous house.
</details>

<details>
<summary>Hint 2</summary>
Think about the subproblem: What's the maximum money you can get considering only the first i houses?
</details>

<details>
<summary>Hint 3</summary>
At house i, you either:
- Skip it and take the best solution from house i-1
- Rob it and add its value to the best solution from house i-2
</details>

## Approach

### DP State Definition
- `dp[i]` = maximum money that can be robbed from the first `i` houses

### Base Cases
- `dp[0] = nums[0]` (only one house, rob it)
- `dp[1] = max(nums[0], nums[1])` (two houses, rob the richer one)

### State Transition
```
dp[i] = max(dp[i-1], dp[i-2] + nums[i])
```

For house `i`, we choose the maximum of:
1. Skip house `i`: take `dp[i-1]` (best from first i-1 houses)
2. Rob house `i`: take `dp[i-2] + nums[i]` (best from first i-2 houses plus current house)

### Time Complexity
- O(n) - single pass through the array

### Space Complexity
- O(n) with full DP array
- O(1) with space optimization (only storing last two values)
