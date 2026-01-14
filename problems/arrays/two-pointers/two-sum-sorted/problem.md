# Two Sum II - Input Array Is Sorted

## Problem Description

Given a **1-indexed** array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number.

Return the indices of the two numbers (1-indexed) as an integer array `[index1, index2]` where `1 <= index1 < index2 <= numbers.length`.

You may not use the same element twice and the solution is guaranteed to be unique.

**Constraints:**
- 2 <= numbers.length <= 3 * 10^4
- -1000 <= numbers[i] <= 1000
- numbers is sorted in non-decreasing order
- -1000 <= target <= 1000
- Only one valid answer exists

## Examples

### Example 1:
```
Input: numbers = [2, 7, 11, 15], target = 9
Output: [1, 2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2.
```

### Example 2:
```
Input: numbers = [2, 3, 4], target = 6
Output: [1, 3]
Explanation: The sum of 2 and 4 is 6. Therefore, index1 = 1, index2 = 3.
```

### Example 3:
```
Input: numbers = [-1, 0], target = -1
Output: [1, 2]
Explanation: The sum of -1 and 0 is -1. Therefore, index1 = 1, index2 = 2.
```

## Hints

<details>
<summary>Hint 1</summary>
Since the array is sorted, can you use this property to efficiently find two numbers?
</details>

<details>
<summary>Hint 2</summary>
Try using two pointers - one at the beginning and one at the end of the array.
</details>

<details>
<summary>Hint 3</summary>
If the sum is too large, move the right pointer left. If too small, move the left pointer right.
</details>

## Approach

The two-pointer technique works perfectly here:
1. Initialize two pointers: `left` at index 0 and `right` at the last index
2. Calculate the sum of elements at both pointers
3. If sum equals target, return the indices (1-indexed)
4. If sum is less than target, move left pointer right (to increase sum)
5. If sum is greater than target, move right pointer left (to decrease sum)
6. Repeat until a solution is found

**Time Complexity:** O(n)
**Space Complexity:** O(1)
