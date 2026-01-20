<div id="viz-config" style="display:none">
{"name":"Count Distinct Ranges","algorithm":"sorting","complexity":{"time":"O(n log n)","space":"O(n)"},"examples":[{"input":{"nums":[1,2,3,5,6,8,10,11,12]},"output":4,"inputRaw":"nums = [1, 2, 3, 5, 6, 8, 10, 11, 12]","outputRaw":"4"}]}
</div>

# Count Distinct Consecutive Ranges

**Difficulty:** Medium

## Problem Statement

Given an unsorted array of integers, count the number of distinct consecutive ranges. A consecutive range is a sequence of consecutive integers.

For example, `[1, 2, 3]` forms one range, `[5, 6]` forms another range.

## Examples

**Example 1:**
```
Input: nums = [1, 2, 3, 5, 6, 8, 10, 11, 12]
Output: 4
Explanation: Ranges are [1-3], [5-6], [8], [10-12]
```

**Example 2:**
```
Input: nums = [1, 3, 5, 7]
Output: 4
Explanation: Each number forms its own range (no consecutive numbers)
```

**Example 3:**
```
Input: nums = [1, 2, 3, 4, 5]
Output: 1
Explanation: All numbers form a single consecutive range [1-5]
```

## Visual Explanation

### Range Identification

```
Input: [1, 2, 3, 5, 6, 8, 10, 11, 12]

After sorting: [1, 2, 3, 5, 6, 8, 10, 11, 12]

Range 1: [1, 2, 3]      -> 1-3
         ↓  ↓  ↓
         consecutive

Range 2: [5, 6]         -> 5-6
         ↓  ↓
         consecutive

Range 3: [8]            -> 8 (single element)

Range 4: [10, 11, 12]   -> 10-12
         ↓   ↓   ↓
         consecutive

Total distinct ranges: 4
```

## Constraints

- 1 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9
- All elements are distinct

## Hints

<details>
<summary>Hint 1</summary>
Sort the array first to easily identify consecutive sequences.
</details>

<details>
<summary>Hint 2</summary>
A new range starts whenever the current element is not consecutive to the previous one.
</details>

<details>
<summary>Hint 3</summary>
Count transitions where nums[i] != nums[i-1] + 1.
</details>

## Approach

### Sorting Approach

1. Sort the array
2. Initialize range count to 1 (first element starts first range)
3. Iterate through sorted array
4. When current element is not prev + 1, increment range count
5. Return total count

**Time Complexity:** O(n log n) - dominated by sorting
**Space Complexity:** O(n) or O(1) depending on sorting implementation
