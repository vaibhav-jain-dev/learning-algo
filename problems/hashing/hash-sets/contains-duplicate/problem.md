# Contains Duplicate

## Problem Description

Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

## Examples

### Example 1
```
Input: nums = [1, 2, 3, 1]
Output: true
Explanation: The element 1 appears twice at indices 0 and 3.
```

### Example 2
```
Input: nums = [1, 2, 3, 4]
Output: false
Explanation: All elements are distinct.
```

### Example 3
```
Input: nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
Output: true
Explanation: Multiple elements appear more than once.
```

## Constraints

- 1 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9

## Hints

<details>
<summary>Hint 1</summary>
A brute force approach would check every pair of elements - what's the time complexity of that?
</details>

<details>
<summary>Hint 2</summary>
What data structure allows you to check if an element has been seen before in O(1) time?
</details>

<details>
<summary>Hint 3</summary>
Use a hash set! Add elements as you see them, and if you try to add an element that already exists, you've found a duplicate.
</details>

## Approach

### Hash Set Approach - O(n) Time, O(n) Space

1. Create an empty hash set
2. Iterate through the array:
   - If the current element is in the set, return true (duplicate found)
   - Otherwise, add it to the set
3. Return false (no duplicates)

### Alternative Approaches

**Sorting Approach - O(n log n) Time, O(1) Space:**
1. Sort the array
2. Check adjacent elements for duplicates

**Brute Force - O(n^2) Time, O(1) Space:**
1. For each element, check all other elements
2. Not recommended for large inputs

### Why Hash Set?

- Hash sets provide O(1) average time for both insertion and lookup
- Perfect for checking membership/existence
- Trade-off: Uses O(n) extra space

### Complexity Analysis

- **Time Complexity**: O(n) - Single pass through the array
- **Space Complexity**: O(n) - In the worst case (no duplicates), we store all n elements

### Set Size Optimization

You can also check if the set size equals the array length:
```
return len(set(nums)) != len(nums)
```
This is concise but creates the entire set upfront, missing the early termination benefit.
