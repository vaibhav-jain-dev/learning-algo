# Max Consecutive Ones III

## Problem Description

Given a binary array `nums` and an integer `k`, return the maximum number of consecutive 1's in the array if you can flip at most `k` 0's.

## Examples

### Example 1
```
Input: nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], k = 2
Output: 6
Explanation: [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1]
                         ^-flipped      ^-flipped
Bolded numbers were flipped from 0 to 1. The longest subarray is from index 5 to 10.
```

### Example 2
```
Input: nums = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], k = 3
Output: 10
Explanation: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1]
                         ^     ^              ^
The longest subarray is from index 2 to 11 (flip zeros at indices 4, 5, 9).
```

### Example 3
```
Input: nums = [1, 1, 1, 1, 1], k = 0
Output: 5
Explanation: No flips needed, all elements are already 1.
```

### Example 4
```
Input: nums = [0, 0, 0, 0], k = 2
Output: 2
Explanation: We can flip at most 2 zeros to get [0, 1, 1, 0] or [1, 1, 0, 0] etc.
```

## Constraints

- 1 <= nums.length <= 10^5
- nums[i] is either 0 or 1
- 0 <= k <= nums.length

## Hints

<details>
<summary>Hint 1</summary>
Think of this as finding the longest subarray with at most k zeros.
</details>

<details>
<summary>Hint 2</summary>
Use a sliding window. The window is valid as long as the count of zeros in it is <= k.
</details>

<details>
<summary>Hint 3</summary>
Expand the window by moving right pointer. When zeros exceed k, shrink from left.
</details>

<details>
<summary>Hint 4</summary>
You don't actually need to flip the zeros - just count them to know if your window is valid.
</details>

## Approach

### Sliding Window Approach

The key insight is to reframe the problem: instead of "maximum consecutive 1s after flipping k zeros", think of it as "longest subarray containing at most k zeros".

1. **Initialize**: Two pointers (left, right), zero counter, max length
2. **Expand window** (move right pointer):
   - If current element is 0, increment zero counter
3. **Contract window when invalid** (zeros > k):
   - While zeros > k:
     - If element at left is 0, decrement zero counter
     - Move left pointer
4. **Update result**: Track maximum window size
5. **Return**: Maximum window size found

### Time Complexity
- O(n) where n is the length of the array
- Each element is visited at most twice

### Space Complexity
- O(1) - only using a few variables

### Alternative: Never Shrink Approach

There's an optimized approach where the window never shrinks, only shifts:
- When zeros exceed k, move both left and right together
- This maintains the maximum window size seen so far
- The final window size is the answer

### Key Insight

We don't actually perform any flips. We're just finding the longest window that has at most k zeros. In such a window, if we flip all zeros to ones, we get the maximum consecutive ones.
