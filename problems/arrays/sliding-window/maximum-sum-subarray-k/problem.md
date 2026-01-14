# Maximum Sum Subarray of Size K

## Problem Description

Given an array of integers and a positive integer `k`, find the maximum sum of any contiguous subarray of size `k`.

## Examples

### Example 1
```
Input: arr = [2, 1, 5, 1, 3, 2], k = 3
Output: 9
Explanation: Subarray [5, 1, 3] has the maximum sum of 9.
```

### Example 2
```
Input: arr = [2, 3, 4, 1, 5], k = 2
Output: 7
Explanation: Subarray [3, 4] has the maximum sum of 7.
```

### Example 3
```
Input: arr = [1, 1, 1, 1, 1], k = 3
Output: 3
Explanation: All subarrays of size 3 have sum 3.
```

## Constraints

- 1 <= k <= arr.length
- -10^4 <= arr[i] <= 10^4

## Hints

<details>
<summary>Hint 1</summary>
Think about what changes when you move from one window to the next. You add one element and remove one element.
</details>

<details>
<summary>Hint 2</summary>
Instead of recalculating the sum of each window from scratch, can you update the sum incrementally?
</details>

<details>
<summary>Hint 3</summary>
Use a sliding window of fixed size k. Maintain the current window sum and update it by subtracting the element that leaves and adding the element that enters.
</details>

## Approach

### Brute Force Approach
Calculate the sum of every subarray of size k and return the maximum. This takes O(n*k) time.

### Optimal Sliding Window Approach

1. **Initialize**: Calculate the sum of the first k elements (first window).
2. **Slide the window**: For each new position:
   - Subtract the element going out of the window (leftmost element)
   - Add the element coming into the window (new rightmost element)
   - Update the maximum sum if current sum is greater
3. **Return**: The maximum sum found.

### Time Complexity
- O(n) where n is the length of the array

### Space Complexity
- O(1) - only using a few variables

### Key Insight
The sliding window technique works because consecutive windows share k-1 elements. By maintaining a running sum and just updating the difference (one element out, one element in), we avoid redundant calculations.
