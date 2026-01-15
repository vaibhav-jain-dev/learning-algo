# Longest Consecutive Sequence

## Problem Description

Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

## Examples

### Example 1
```
Input: nums = [100, 4, 200, 1, 3, 2]
Output: 4
Explanation: The longest consecutive sequence is [1, 2, 3, 4]. Its length is 4.
```

### Example 2
```
Input: nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
Output: 9
Explanation: The longest consecutive sequence is [0, 1, 2, 3, 4, 5, 6, 7, 8]. Its length is 9.
```

### Example 3
```
Input: nums = [1, 2, 0, 1]
Output: 3
Explanation: The longest consecutive sequence is [0, 1, 2]. Its length is 3.
Note: Duplicates don't extend the sequence.
```

## Constraints

- 0 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9

## Hints

<details>
<summary>Hint 1</summary>
Sorting would give O(n log n). To achieve O(n), think about what data structure gives O(1) lookup.
</details>

<details>
<summary>Hint 2</summary>
Use a hash set for O(1) lookup. For each number, you can check if num+1, num+2, etc. exist.
</details>

<details>
<summary>Hint 3</summary>
To avoid redundant work, only start counting from a number that is the START of a sequence (i.e., num-1 doesn't exist in the set).
</details>

## Approach

### Hash Set Approach - O(n) Time, O(n) Space

1. Convert the array to a hash set for O(1) lookups
2. For each number in the set:
   - Check if it's the START of a sequence (num - 1 is not in the set)
   - If yes, count consecutive numbers (num, num+1, num+2, ...)
   - Track the maximum sequence length
3. Return the maximum length

### Key Insight

The crucial optimization is **only starting from sequence beginnings**. If we try to count from every number, we'd have O(n^2) worst case. But by checking if (num - 1) exists, we ensure each element is only visited once as part of a sequence.

### Why O(n)?

- Converting to set: O(n)
- For each number, we check if it's a sequence start: O(1)
- The total counting across all sequences visits each number at most once: O(n)
- Total: O(n)

### Alternative: Sorting Approach - O(n log n)

1. Sort the array
2. Iterate through, counting consecutive elements
3. Handle duplicates by skipping them

### Complexity Analysis

**Hash Set Approach:**
- **Time Complexity**: O(n) - Each element is visited at most twice (once for set lookup, once during sequence counting)
- **Space Complexity**: O(n) - Storing all elements in a set
