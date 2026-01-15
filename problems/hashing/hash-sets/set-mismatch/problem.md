# Set Mismatch

## Problem Description

You have a set of integers `s`, which originally contains all the numbers from `1` to `n`. Unfortunately, due to some error, one of the numbers in `s` got duplicated to another number in the set, which results in repetition of one number and loss of another number.

You are given an integer array `nums` representing the data status of this set after the error.

Find the number that occurs twice and the number that is missing and return them in the form of an array.

## Examples

### Example 1
```
Input: nums = [1, 2, 2, 4]
Output: [2, 3]
Explanation:
  - The number 2 occurs twice (duplicate)
  - The number 3 is missing
```

### Example 2
```
Input: nums = [1, 1]
Output: [1, 2]
Explanation:
  - The number 1 occurs twice (duplicate)
  - The number 2 is missing
```

### Example 3
```
Input: nums = [3, 2, 2]
Output: [2, 1]
Explanation:
  - The number 2 occurs twice (duplicate)
  - The number 1 is missing
```

## Constraints

- 2 <= nums.length <= 10^4
- 1 <= nums[i] <= nums.length

## Hints

<details>
<summary>Hint 1</summary>
Use a hash set to find the duplicate number - add each number to the set, and if you try to add one that already exists, that's the duplicate.
</details>

<details>
<summary>Hint 2</summary>
Once you know the duplicate, you can find the missing number using math: expected_sum - actual_sum + duplicate = missing.
</details>

<details>
<summary>Hint 3</summary>
Alternative: Count frequency of each number using a hash map or array. The number with count 2 is the duplicate, and the number with count 0 is missing.
</details>

## Approach

### Hash Set + Math Approach - O(n) Time, O(n) Space

1. Use a hash set to find the duplicate number
2. Calculate expected sum: n * (n + 1) / 2
3. Calculate actual sum of array
4. Missing = expected_sum - actual_sum + duplicate

### Frequency Count Approach - O(n) Time, O(n) Space

1. Create a frequency array/map
2. Count occurrences of each number
3. Find number with count 2 (duplicate) and count 0 (missing)

### Marking Approach - O(n) Time, O(1) Space

1. Use the array itself to mark visited indices
2. For each number, mark nums[abs(num) - 1] as negative
3. If already negative, that index+1 is the duplicate
4. After processing, the positive index+1 is the missing number

### XOR Approach - O(n) Time, O(1) Space

1. XOR all numbers in array with 1 to n
2. Result gives XOR of duplicate and missing
3. Use bit manipulation to separate them

### Complexity Analysis

**Hash Set Approach:**
- **Time Complexity**: O(n) - Single pass to find duplicate, O(1) math for missing
- **Space Complexity**: O(n) - Hash set stores up to n elements

**Marking Approach:**
- **Time Complexity**: O(n) - Two passes through the array
- **Space Complexity**: O(1) - Uses input array for marking
