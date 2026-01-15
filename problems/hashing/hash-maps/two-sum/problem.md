# Two Sum

## Problem Description

Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

## Examples

### Example 1
```
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

### Example 2
```
Input: nums = [3, 2, 4], target = 6
Output: [1, 2]
Explanation: Because nums[1] + nums[2] == 6, we return [1, 2].
```

### Example 3
```
Input: nums = [3, 3], target = 6
Output: [0, 1]
Explanation: Because nums[0] + nums[1] == 6, we return [0, 1].
```

## Constraints

- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.

## Hints

<details>
<summary>Hint 1</summary>
A brute force approach would be to check every pair of numbers, but this would be O(n^2).
</details>

<details>
<summary>Hint 2</summary>
For each number, you need to find if (target - number) exists in the array. What data structure allows O(1) lookup?
</details>

<details>
<summary>Hint 3</summary>
Use a hash map to store numbers you've seen along with their indices. For each number, check if its complement exists in the map.
</details>

## Approach

### Hash Map Approach - O(n) Time, O(n) Space

1. Create an empty hash map to store each number and its index
2. Iterate through the array:
   - Calculate the complement: `complement = target - nums[i]`
   - Check if the complement exists in the hash map
   - If it does, return `[map[complement], i]`
   - If not, add the current number and its index to the hash map
3. Return empty array if no solution found (though problem guarantees one exists)

### Why Hash Map?

The key insight is that for each number `x`, we need to check if `target - x` exists in the array. A hash map provides O(1) average lookup time, reducing the overall time complexity from O(n^2) to O(n).

### Complexity Analysis

- **Time Complexity**: O(n) - We traverse the array once, and each lookup/insertion in the hash map is O(1)
- **Space Complexity**: O(n) - In the worst case, we store all n elements in the hash map
