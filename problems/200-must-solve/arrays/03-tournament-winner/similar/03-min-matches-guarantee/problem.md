# Minimum Matches to Guarantee Winner

**Difficulty:** Hard

## Problem Statement

Given n teams and their current scores, find the minimum number of remaining matches needed to guarantee a single winner.

## Examples

**Example 1:**
```
Input: scores = [10, 7, 5]
Output: 1
Explanation: Leader needs 1 more win to be uncatchable.
```

**Example 2:**
```
Input: scores = [6, 6, 6]
Output: 2
Explanation: Two matches needed to break the tie.
```

## Constraints

- 1 <= scores.length <= 10^5
- 0 <= scores[i] <= 10^9
