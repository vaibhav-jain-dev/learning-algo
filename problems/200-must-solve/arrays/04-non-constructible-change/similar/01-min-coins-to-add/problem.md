# Minimum Coins to Add

**Difficulty:** Medium

## Problem Statement

Given an array of coins (positive integers) and a target value, find the minimum number of coins you need to add so that you can construct every value from 1 to target (inclusive).

## Examples

**Example 1:**
```
Input: coins = [1, 3], target = 6
Output: 1
Explanation: Add coin with value 2. Now with [1, 2, 3] you can make all values 1-6.
```

**Example 2:**
```
Input: coins = [1, 5, 10], target = 20
Output: 2
Explanation: Add coins with values 2 and 4. Now you can make all values 1-20.
```

**Example 3:**
```
Input: coins = [1, 2, 5], target = 10
Output: 0
Explanation: With [1, 2, 5] you can already make all values 1-10.
```

## Constraints

- 0 <= coins.length <= 10^5
- 1 <= coins[i] <= target
- 1 <= target <= 10^5

## Key Insight

This problem extends the "Non-Constructible Change" concept. If we can currently construct values [1, reachable] and the next coin is greater than reachable+1, we have a gap. To optimally fill this gap, we add a coin of value (reachable+1), which doubles our reachable range.

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy with Gap Analysis | O(n log n) | O(1) |

Where n is the number of coins.
