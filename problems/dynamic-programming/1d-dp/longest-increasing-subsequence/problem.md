# Longest Increasing Subsequence (LIS)

## Problem Description

Given an integer array `nums`, return the length of the longest strictly increasing subsequence.

A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.

## Examples

### Example 1
```
Input: nums = [10, 9, 2, 5, 3, 7, 101, 18]
Output: 4
Explanation: The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4.
```

### Example 2
```
Input: nums = [0, 1, 0, 3, 2, 3]
Output: 4
Explanation: The longest increasing subsequence is [0, 1, 2, 3].
```

### Example 3
```
Input: nums = [7, 7, 7, 7, 7, 7, 7]
Output: 1
Explanation: All elements are the same, so LIS has length 1.
```

### Example 4
```
Input: nums = [1, 3, 6, 7, 9, 4, 10, 5, 6]
Output: 6
Explanation: The longest increasing subsequence is [1, 3, 6, 7, 9, 10].
```

## Constraints

- `1 <= nums.length <= 2500`
- `-10^4 <= nums[i] <= 10^4`

## Hints

<details>
<summary>Hint 1</summary>
Think about ending the LIS at each position. For position i, what information do you need from previous positions?
</details>

<details>
<summary>Hint 2</summary>
For each element, look at all previous elements. If a previous element is smaller, then the current element can extend that subsequence.
</details>

<details>
<summary>Hint 3</summary>
For an O(n log n) solution, maintain a sorted array of the smallest tail elements for all increasing subsequences with different lengths.
</details>

## Approach

### Approach 1: Standard DP - O(n^2)

#### DP State Definition
- `dp[i]` = length of the longest increasing subsequence ending at index `i`

#### Base Case
- `dp[i] = 1` for all i (each element alone is a subsequence of length 1)

#### State Transition
```
dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]
```

For each position `i`, we look at all previous positions `j`. If `nums[j] < nums[i]`, we can extend the LIS ending at `j` by adding `nums[i]`.

### Approach 2: Binary Search - O(n log n)

Maintain an array `tails` where `tails[i]` is the smallest tail element of all increasing subsequences of length `i+1`.

For each element:
- If it's larger than all tails, append it (extend LIS)
- Otherwise, binary search to find the first tail >= element, and replace it

The length of `tails` array at the end is the LIS length.

### Time Complexity
- O(n^2) for standard DP
- O(n log n) for binary search approach

### Space Complexity
- O(n) for both approaches
