# Contiguous Array (Longest Subarray with Equal 0s and 1s)

## Problem Description

Given a binary array `nums`, return the maximum length of a contiguous subarray with an equal number of 0s and 1s.

## Examples

### Example 1
```
Input: nums = [0, 1]
Output: 2
Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0s and 1s.
```

### Example 2
```
Input: nums = [0, 1, 0]
Output: 2
Explanation: [0, 1] (or [1, 0]) is the longest subarray with equal 0s and 1s.
The entire array [0, 1, 0] has two 0s and one 1, so it doesn't qualify.
```

### Example 3
```
Input: nums = [0, 0, 1, 0, 0, 0, 1, 1]
Output: 6
Explanation: The subarray [0, 1, 0, 0, 1, 1] (indices 1-6) has three 0s and three 1s.
```

### Example 4
```
Input: nums = [0, 1, 1, 0, 1, 1, 1, 0]
Output: 4
Explanation: The subarray [0, 1, 1, 0] (indices 0-3) or [1, 0, 1, 1, 1, 0] wait...
Let me recalculate: [0, 1, 1, 0] has two 0s and two 1s - length 4.
```

## Constraints

- 1 <= nums.length <= 10^5
- nums[i] is either 0 or 1

## Hints

<details>
<summary>Hint 1</summary>
Consider replacing all 0s with -1s. Now the problem becomes finding the longest subarray with sum equal to 0.
</details>

<details>
<summary>Hint 2</summary>
Use a running sum (prefix sum). When you see the same sum value at two different indices, the subarray between those indices has a sum of 0.
</details>

<details>
<summary>Hint 3</summary>
Use a hash map to store the first occurrence of each prefix sum. When you encounter a sum you've seen before, calculate the length of the subarray.
</details>

## Approach

### Transform + Prefix Sum with Hash Map

**Key Insight:** Replace 0 with -1. Now we need to find the longest subarray with sum = 0. If the prefix sum at index j equals the prefix sum at index i (where i < j), then the subarray from i+1 to j has sum 0.

**Algorithm:**
1. Replace all 0s with -1s (or treat 0 as -1 during calculation)
2. Maintain a running sum (prefix sum)
3. Use a hash map to store the first index where each prefix sum occurs
4. Initialize with `{0: -1}` to handle subarrays starting from index 0
5. For each index:
   - Update the running sum
   - If sum exists in map, calculate length = current_index - map[sum]
   - Update max_length if necessary
   - If sum not in map, store it with current index

**Why this works:**
- When count(1s) = count(0s) in a subarray:
  - With 0 replaced by -1: sum = count(1s) + count(-1s) = count(1s) - count(0s) = 0
- Two equal prefix sums indicate a zero-sum subarray between them

**Time Complexity:** O(n)
**Space Complexity:** O(n) for the hash map

### Visual Example

```
Original: nums = [0, 1, 0, 0, 1, 1]
Transform: treat 0 as -1

Index:      0   1   2   3   4   5
Value:      0   1   0   0   1   1
As -1/+1:  -1  +1  -1  -1  +1  +1

Running Sum:
  Index -1: sum = 0 (initialize map with {0: -1})
  Index 0:  sum = 0 + (-1) = -1
  Index 1:  sum = -1 + 1 = 0    <- Same as index -1!
  Index 2:  sum = 0 + (-1) = -1 <- Same as index 0!
  Index 3:  sum = -1 + (-1) = -2
  Index 4:  sum = -2 + 1 = -1   <- Same as index 0!
  Index 5:  sum = -1 + 1 = 0    <- Same as index -1!

Hash Map (first occurrence of each sum):
{0: -1, -1: 0, -2: 3}

At index 1: sum = 0, found at -1, length = 1 - (-1) = 2
At index 2: sum = -1, found at 0, length = 2 - 0 = 2
At index 4: sum = -1, found at 0, length = 4 - 0 = 4
At index 5: sum = 0, found at -1, length = 5 - (-1) = 6

Maximum length = 6
Subarray from index 0 to 5: [0, 1, 0, 0, 1, 1]
Count: 3 zeros, 3 ones ✓
```

### Why Store First Occurrence?

We want the LONGEST subarray, so we need the earliest index where a particular sum occurred. Later occurrences of the same sum would give shorter subarrays.
