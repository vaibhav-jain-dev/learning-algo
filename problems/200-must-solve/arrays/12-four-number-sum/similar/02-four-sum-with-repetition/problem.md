# Four Sum with Repetition

**Difficulty:** Hard

## Problem Statement

Given an array and a target sum, find all quadruplets where the same element can be used multiple times (with different indices treated as same).

## Examples

**Example 1:**
```
Input: array = [1, 2], targetSum = 6
Output: [[1, 1, 2, 2]]
Explanation: Using 1 twice and 2 twice
```

**Example 2:**
```
Input: array = [2, 3], targetSum = 10
Output: [[2, 2, 3, 3]]
```

---

## Visual Diagram

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Key Difference:</strong> Unlike regular 4-sum, elements can repeat.<br>
Use hash map to store all pair sums, allowing same element in pairs.
</div>

---

## Solution

| Metric | Value |
|--------|-------|
| Time Complexity | O(n^2) |
| Space Complexity | O(n^2) |
