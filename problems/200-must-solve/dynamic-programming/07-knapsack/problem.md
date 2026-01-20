<div id="viz-config" style="display:none">
{"name":"0/1 Knapsack Problem","algorithm":"dp-knapsack","complexity":{"time":"O(n * capacity)","space":"O(n * capacity)"},"examples":[{"input":{"items":[[1,2],[4,3],[5,6],[6,7]],"capacity":10},"output":[10,[1,3]],"inputRaw":"items = [[1, 2], [4, 3], [5, 6], [6, 7]], capacity = 10","outputRaw":"[10, [1, 3]]"},{"input":{"items":[[60,10],[100,20],[120,30]],"capacity":50},"output":[220,[1,2]],"inputRaw":"items = [[60, 10], [100, 20], [120, 30]], capacity = 50","outputRaw":"[220, [1, 2]]"},{"input":{"items":[[10,5],[40,4],[30,6],[50,3]],"capacity":10},"output":[90,[1,3]],"inputRaw":"items = [[10, 5], [40, 4], [30, 6], [50, 3]], capacity = 10","outputRaw":"[90, [1, 3]]"}]}
</div>

# 0/1 Knapsack Problem

**Difficulty:** Hard (Red)

## Problem Statement

You are given an array of items where each item has a weight and a value, and a knapsack with a maximum weight capacity. Write a function that returns the maximum value that can be obtained by selecting items to put in the knapsack without exceeding its capacity.

Each item can only be selected once (0/1 property).

Also return the indices of the items that achieve this maximum value.

## Examples

**Example 1:**
```
Input: items = [[1, 2], [4, 3], [5, 6], [6, 7]], capacity = 10
       (items as [value, weight])
Output: [10, [0, 2, 3]]
Explanation: Select items with values 1, 5, 6 (weights 2, 6, 7 don't fit)
             Actually: items 0 (v=1,w=2), 2 (v=5,w=6) total = 6, weight = 8
             Or items 1 (v=4,w=3) + 2 (v=5,w=6) = 9, weight = 9
             Best: items 0 + 1 + 2 = 1+4+5=10, weight = 2+3+6=11 (too heavy)
             Best: items 1 + 3 = 4+6=10, weight = 3+7=10
```

**Example 2:**
```
Input: items = [[60, 10], [100, 20], [120, 30]], capacity = 50
Output: [220, [1, 2]]
Explanation: Select items with values 100, 120 (weight = 20 + 30 = 50)
```

**Example 3:**
```
Input: items = [[10, 5], [40, 4], [30, 6], [50, 3]], capacity = 10
Output: [90, [1, 3]]
Explanation: Select items with values 40, 50 (weight = 4 + 3 = 7)
```

## Constraints

- All weights and values are positive integers
- Each item can only be used once
- Capacity is a non-negative integer
- Return both maximum value and list of indices

## Hints

<details>
<summary>Hint 1</summary>
Use a 2D DP table where dp[i][w] represents the maximum value using first i items with capacity w.
</details>

<details>
<summary>Hint 2</summary>
For each item, decide whether to include it or not: dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])
</details>

<details>
<summary>Hint 3</summary>
Backtrack through the DP table to find which items were selected.
</details>

## Approach

### Dynamic Programming (Bottom-Up)
1. Create a 2D DP table of size (n+1) x (capacity+1)
2. Base case: dp[0][w] = 0 (no items means no value)
3. Recurrence for each item i:
   - If weight[i] > w: dp[i][w] = dp[i-1][w] (can't include)
   - Else: dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])
4. Backtrack from dp[n][capacity] to find selected items

**Time Complexity:** O(n * capacity)
**Space Complexity:** O(n * capacity), can be optimized to O(capacity)

---

## Similar Problems (Harder)

### 1. Unbounded Knapsack
**Difficulty:** Medium-Hard

Items can be selected multiple times (infinite supply).

### 2. Knapsack with Item Quantities
**Difficulty:** Hard

Each item has a limited quantity available.

### 3. Multi-Dimensional Knapsack
**Difficulty:** Very Hard

Multiple constraints (e.g., both weight and volume limits).
