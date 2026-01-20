<div id="viz-config" style="display:none">
{"name":"Circular Array Loop","algorithm":"fast-slow-pointer","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"nums":[2,-1,1,2,2]},"output":true,"inputRaw":"nums = [2, -1, 1, 2, 2]","outputRaw":"true"}]}
</div>

# Circular Array Loop

**Difficulty:** Medium

## Problem Statement

You are playing a game involving a circular array of non-zero integers `nums`. Each `nums[i]` denotes the number of indices forward/backward you must move if you are located at index `i`:

- If `nums[i]` is positive, move `nums[i]` steps forward
- If `nums[i]` is negative, move `|nums[i]|` steps backward

Since the array is circular, you may assume that moving forward from the last element puts you on the first element, and moving backwards from the first element puts you on the last element.

A cycle in the array consists of a sequence of indices `seq` of length `k` where:
- Following the movement rules above results in the repeating index sequence `seq[0] -> seq[1] -> ... -> seq[k-1] -> seq[0] -> ...`
- Every `nums[seq[j]]` is either all positive or all negative
- `k > 1` (cycle length must be greater than 1)

Return `true` if there is a cycle in `nums`, or `false` otherwise.

## Examples

**Example 1:**
```
Input: nums = [2,-1,1,2,2]
Output: true
Explanation: There is a cycle: 0 -> 2 -> 3 -> 0 (all positive)
```

**Example 2:**
```
Input: nums = [-1,2]
Output: false
Explanation: The cycle 1 -> 1 has length 1, not valid
```

**Example 3:**
```
Input: nums = [-2,1,-1,-2,-2]
Output: false
Explanation: Any cycle would have mixed directions
```

## Visual Explanation

### Valid Cycle Detection

```
nums = [2, -1, 1, 2, 2]
index:  0   1  2  3  4

From index 0: move +2 -> index 2
From index 2: move +1 -> index 3
From index 3: move +2 -> index 0 (wrap: (3+2) % 5 = 0)

Cycle: 0 -> 2 -> 3 -> 0
All movements positive? Yes ✓
Length > 1? Yes (length = 3) ✓

Valid cycle found!
```

### Invalid Cases

```
Self-loop (length = 1):
nums = [-1, 2]
From index 1: move +2 -> index 1 (wrap: (1+2) % 2 = 1)
Length = 1, not valid

Mixed directions:
nums = [-2, 1, -1, -2, -2]
From 0: -2 (negative)
From 3: -2 (negative)
From 1: +1 (positive) <- Direction change!
Not a valid cycle
```

## Constraints

- 1 <= nums.length <= 5000
- -1000 <= nums[i] <= 1000
- nums[i] != 0

## Hints

<details>
<summary>Hint 1</summary>
Use fast and slow pointers starting from each index.
</details>

<details>
<summary>Hint 2</summary>
Check that all elements in the potential cycle have the same sign.
</details>

<details>
<summary>Hint 3</summary>
Mark visited elements to avoid rechecking - if a starting point leads to a visited non-cycle element, skip it.
</details>

## Approach

### Fast-Slow Pointer with Direction Check

1. For each starting index, use fast/slow pointers
2. Ensure same direction throughout
3. Check cycle length > 1
4. Mark elements leading to no cycle

**Time Complexity:** O(n)
**Space Complexity:** O(1)
