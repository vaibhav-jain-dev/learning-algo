# Sliding Window Maximum

## Problem Description

You are given an array of integers `nums`, and there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.

Return the maximum value in each sliding window.

## Examples

### Example 1
```
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]

Explanation:
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

### Example 2
```
Input: nums = [1], k = 1
Output: [1]
```

### Example 3
```
Input: nums = [1,-1], k = 1
Output: [1,-1]
Explanation: Window size is 1, so max in each window is the element itself.
```

### Example 4
```
Input: nums = [9,11], k = 2
Output: [11]
Explanation: Only one window [9, 11] with max 11.
```

### Example 5
```
Input: nums = [4,3,2,1], k = 2
Output: [4,3,2]
Explanation: Windows are [4,3], [3,2], [2,1] with maxes 4, 3, 2.
```

## Constraints
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `1 <= k <= nums.length`

## Hints

<details>
<summary>Hint 1</summary>
A brute force solution would scan each window to find the maximum, giving O(n*k) time. Can we do better?
</details>

<details>
<summary>Hint 2</summary>
Consider using a deque (double-ended queue) to maintain useful elements in the current window.
</details>

<details>
<summary>Hint 3</summary>
The deque should store indices, and maintain elements in decreasing order. The front of the deque is always the maximum.
</details>

<details>
<summary>Hint 4</summary>
Before adding a new element, remove all elements from the back that are smaller (they can never be the maximum while the new element is in the window).
</details>

## Approach

### Monotonic Deque Solution

Use a **monotonic decreasing deque** that stores indices:

1. **Initialize**: Create an empty deque and result array.

2. **For each element at index i**:
   - **Remove outdated indices**: If the front of deque is outside the current window (index < i - k + 1), remove it.
   - **Maintain decreasing order**: Remove all indices from the back where the corresponding value is less than nums[i]. These elements can never be the maximum while nums[i] is in the window.
   - **Add current index** to the back of deque.
   - **Record maximum**: If we have processed at least k elements, the front of deque is the index of the maximum element in the current window.

### Why This Works

- The deque always contains indices in decreasing order of their values
- The front is always the maximum in the current window
- Smaller elements that came before a larger element are useless (they exit the window before the larger element)
- We remove outdated elements when they leave the window

### Visual Example

For `[1, 3, -1, -3, 5, 3, 6, 7]`, k = 3:

```
i=0: nums[0]=1, deque=[0]
i=1: nums[1]=3 > nums[0], remove 0, deque=[1]
i=2: nums[2]=-1 < nums[1], deque=[1,2], window complete, max=nums[1]=3
i=3: nums[3]=-3 < nums[2], deque=[1,2,3], 1 is valid, max=nums[1]=3
i=4: nums[4]=5 > all, clear deque, deque=[4], max=nums[4]=5
i=5: nums[5]=3 < nums[4], deque=[4,5], max=nums[4]=5
i=6: nums[6]=6 > 3, > 5, clear deque, deque=[6], max=nums[6]=6
i=7: nums[7]=7 > 6, deque=[7], max=nums[7]=7
```

### Time Complexity
- **O(n)** - each element is added and removed from deque at most once

### Space Complexity
- **O(k)** - deque contains at most k elements
