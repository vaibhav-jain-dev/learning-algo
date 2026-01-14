# Subarray Sum Equals K

## Problem Description

Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.

A subarray is a contiguous non-empty sequence of elements within an array.

## Examples

### Example 1
```
Input: nums = [1, 1, 1], k = 2
Output: 2
Explanation: The subarrays [1, 1] (index 0-1) and [1, 1] (index 1-2) both sum to 2.
```

### Example 2
```
Input: nums = [1, 2, 3], k = 3
Output: 2
Explanation: The subarrays [1, 2] (index 0-1) and [3] (index 2) both sum to 3.
```

### Example 3
```
Input: nums = [1, -1, 0], k = 0
Output: 3
Explanation: The subarrays [1, -1], [-1, 0, 1] wait... let me recalculate.
Actually: [1, -1] sums to 0, [0] sums to 0, and [1, -1, 0] sums to 0.
```

### Example 4
```
Input: nums = [3, 4, 7, 2, -3, 1, 4, 2], k = 7
Output: 4
Explanation: Subarrays that sum to 7: [3, 4], [7], [7, 2, -3, 1], [1, 4, 2]
```

## Constraints

- 1 <= nums.length <= 2 * 10^4
- -1000 <= nums[i] <= 1000
- -10^7 <= k <= 10^7

## Hints

<details>
<summary>Hint 1</summary>
A brute force approach would check all possible subarrays, but this would be O(n^2). Can you think of a way to use prefix sums to optimize?
</details>

<details>
<summary>Hint 2</summary>
If prefix_sum[j] - prefix_sum[i] = k, then the subarray from index i+1 to j has sum k. This means we're looking for prefix_sum[i] = prefix_sum[j] - k.
</details>

<details>
<summary>Hint 3</summary>
Use a hash map to store the frequency of each prefix sum. For each new prefix sum, check how many times (prefix_sum - k) has appeared before.
</details>

## Approach

### Prefix Sum with Hash Map (Optimal Solution)

**Key Insight:** If we have a running prefix sum and we want to find subarrays that sum to `k`, we need to find how many previous prefix sums equal `current_prefix_sum - k`.

**Algorithm:**
1. Initialize a hash map with `{0: 1}` (empty prefix sum appears once - handles subarrays starting from index 0)
2. Maintain a running prefix sum
3. For each element:
   - Add it to the prefix sum
   - Check if `prefix_sum - k` exists in the hash map; if so, add its count to result
   - Add current prefix_sum to hash map (increment its count)

**Why this works:**
- If `prefix_sum[j] - prefix_sum[i] = k`, the subarray from `i+1` to `j` sums to `k`
- By storing prefix sum frequencies, we efficiently count all valid subarrays ending at each position

**Time Complexity:** O(n) - single pass through the array
**Space Complexity:** O(n) - hash map storage for prefix sums

### Visual Example

```
nums = [1, 2, 3], k = 3

Index:      0    1    2
Value:      1    2    3
PrefixSum:  1    3    6

At index 0: prefix_sum = 1, looking for 1-3 = -2 (not found), map = {0:1, 1:1}
At index 1: prefix_sum = 3, looking for 3-3 = 0 (found 1 time!), map = {0:1, 1:1, 3:1}
At index 2: prefix_sum = 6, looking for 6-3 = 3 (found 1 time!), map = {0:1, 1:1, 3:1, 6:1}

Total count = 2 (subarrays [1,2] and [3])
```
