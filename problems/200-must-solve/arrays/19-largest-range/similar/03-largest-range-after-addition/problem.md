<div id="viz-config" style="display:none">
{"name":"Largest Range After Addition","algorithm":"hash-set","complexity":{"time":"O(n)","space":"O(n)"},"examples":[{"input":{"nums":[1,3,5,7],"additions":1},"output":4,"inputRaw":"nums = [1, 3, 5, 7], additions = 1","outputRaw":"4"}]}
</div>

# Largest Range After K Additions

**Difficulty:** Hard

## Problem Statement

Given an array of integers `nums` and an integer `k` representing the number of elements you can add to the array, find the length of the largest consecutive range possible after adding at most `k` elements.

You can add any integer to the array to fill gaps in consecutive sequences.

## Examples

**Example 1:**
```
Input: nums = [1, 3, 5, 7], k = 1
Output: 4
Explanation: Add 2 to get [1, 2, 3] or add 4 to get [3, 4, 5], etc.
             Best: add 2 to make [1, 2, 3] plus 5 and 7 can form [5, 6, 7] with 6 added
             Actually, add 4 to get sequence [3, 4, 5] of length 3, but adding 2 gives [1, 2, 3] length 3
             With 1 addition, longest is 3 consecutive (adding one gap filler)
             Wait - with k=1, we can add 2 to get [1,2,3] = length 3, or add 6 to extend, etc.
             Best strategy: add 4 to get [3,4,5,7] - no, still gaps
             Actually [1,3,5,7] with k=1, add 2: [1,2,3] length 3, or add 6: [5,6,7] length 3
             Best achievable is 3
Output: 3 (corrected)
```

**Example 2:**
```
Input: nums = [1, 2, 4, 5, 8], k = 1
Output: 5
Explanation: Add 3 to get consecutive range [1, 2, 3, 4, 5] of length 5
```

**Example 3:**
```
Input: nums = [1, 10, 20], k = 2
Output: 3
Explanation: Add 2 and 3 to get [1, 2, 3] of length 3
             Or add 11 and 12 to get [10, 11, 12] of length 3
```

## Visual Explanation

### Gap Analysis

```
Input: nums = [1, 2, 4, 5, 8], k = 1

Original array with gaps:
1 - 2 - [3] - 4 - 5 - [6] - [7] - 8
        ↑           ↑      ↑
       gap         gap    gap

With k=1 (can add 1 element):
- Add 3: [1, 2, 3, 4, 5] -> length 5 ✓
- Add 6: [4, 5, 6] -> length 3
- Add 7: [5, 7, 8] -> not consecutive

Best choice: Add 3 to get range [1-5] = length 5
```

## Constraints

- 1 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9
- 0 <= k <= 10^5

## Hints

<details>
<summary>Hint 1</summary>
Sort the array first to work with consecutive elements easily.
</details>

<details>
<summary>Hint 2</summary>
Use a sliding window approach - for each window, calculate how many additions are needed to make all elements consecutive.
</details>

<details>
<summary>Hint 3</summary>
The number of additions needed for a range [i, j] is: (nums[j] - nums[i]) - (j - i)
</details>

## Approach

### Sliding Window Approach

1. Sort the array
2. Use two pointers to define a window
3. For each window, calculate gaps = (nums[right] - nums[left]) - (right - left)
4. If gaps <= k, expand window; otherwise shrink
5. Track maximum window size where gaps <= k

**Time Complexity:** O(n log n) - dominated by sorting
**Space Complexity:** O(n) for sorting
