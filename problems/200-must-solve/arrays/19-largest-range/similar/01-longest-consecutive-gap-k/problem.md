<div id="viz-config" style="display:none">
{"name":"Longest Consecutive with Gap K","algorithm":"hash-set","complexity":{"time":"O(n)","space":"O(n)"},"examples":[{"input":{"nums":[1,3,5,7,9,2,4],"k":2},"output":5,"inputRaw":"nums = [1, 3, 5, 7, 9, 2, 4], k = 2","outputRaw":"5"}]}
</div>

# Longest Consecutive Sequence with Gap K

**Difficulty:** Medium

## Problem Statement

Given an unsorted array of integers `nums` and a positive integer `k`, find the length of the longest sequence where consecutive elements differ by exactly `k`.

Unlike the classic longest consecutive sequence problem (where the gap is 1), this variant requires finding sequences with a custom gap value.

## Examples

**Example 1:**
```
Input: nums = [1, 3, 5, 7, 9, 2, 4], k = 2
Output: 5
Explanation: The sequence [1, 3, 5, 7, 9] has consecutive elements differing by 2
```

**Example 2:**
```
Input: nums = [1, 5, 9, 13, 2, 6, 10], k = 4
Output: 4
Explanation: The sequence [1, 5, 9, 13] has consecutive elements differing by 4
```

**Example 3:**
```
Input: nums = [1, 2, 3, 4, 5], k = 1
Output: 5
Explanation: Standard consecutive sequence with gap 1
```

## Visual Explanation

### Example with k = 2

```
Input: [1, 3, 5, 7, 9, 2, 4]

HashSet: {1, 2, 3, 4, 5, 7, 9}

Finding sequences with gap k=2:

Starting from 1:
1 -> 3 -> 5 -> 7 -> 9  (length 5) ✓

Starting from 2:
2 -> 4 -> (6 not found)  (length 2)

Longest sequence with gap 2: [1, 3, 5, 7, 9] = 5
```

## Constraints

- 1 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9
- 1 <= k <= 10^6

## Hints

<details>
<summary>Hint 1</summary>
Store all elements in a hash set for O(1) lookup.
</details>

<details>
<summary>Hint 2</summary>
Only start counting from elements that are sequence starts (where num - k is not in the set).
</details>

<details>
<summary>Hint 3</summary>
For each sequence start, keep adding k and checking if the next element exists.
</details>

## Approach

### Hash Set Approach

1. Add all elements to a hash set
2. For each element, check if it's a sequence start (num - k not in set)
3. If it's a start, count how long the sequence extends
4. Track the maximum length found

**Time Complexity:** O(n)
**Space Complexity:** O(n)
