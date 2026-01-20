<div id="viz-config" style="display:none">
{"name":"Partition Equal Subset Sum","algorithm":"dp-coin-change","complexity":{"time":"O(n * sum)","space":"O(sum)"},"examples":[{"input":{"nums":[1,5,11,5]},"output":true,"inputRaw":"nums = [1, 5, 11, 5]","outputRaw":"true"},{"input":{"nums":[1,2,3,5]},"output":false,"inputRaw":"nums = [1, 2, 3, 5]","outputRaw":"false"}]}
</div>

# Partition Equal Subset Sum

**Difficulty:** Medium

## Problem Statement

Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or `false` otherwise.

## Examples

**Example 1:**
```
Input: nums = [1, 5, 11, 5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
```

**Example 2:**
```
Input: nums = [1, 2, 3, 5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
```

## Constraints

- 1 <= nums.length <= 200
- 1 <= nums[i] <= 100

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question:** "When is equal partition possible?"

For two subsets to have equal sum:
- Total sum must be EVEN
- Each subset must sum to `totalSum / 2`

**Key Realization:** This is a **Subset Sum** decision problem:
- Can we find a subset that sums to exactly `totalSum / 2`?

### Step 2: Transform to Known Problem

This relates to coin change problems:
- "Number of Ways to Make Change" asks "how many ways?"
- This problem asks "is there at least one way?"

### Step 3: Define the Recurrence

```
dp[s] = true if we can make sum s using available numbers
dp[0] = true (empty subset has sum 0)
dp[s] = dp[s] OR dp[s - num] for each num
```

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>nums = [1, 5, 11, 5]</code>
</div>

### Step 1: Check Total Sum

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
<div>Total Sum = 1 + 5 + 11 + 5 = <strong>22</strong></div>
<div style="background: #d4edda; padding: 5px 15px; border-radius: 5px;">22 is EVEN - Possible!</div>
</div>
<div style="margin-top: 10px;">
Target for each subset: 22 / 2 = <strong>11</strong>
</div>
</div>

### Step 2: Find Subset Summing to 11

<div style="background: #fff3cd; color: #856404; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Question:</strong> Can we select numbers that sum to exactly 11?
</div>

### DP Table Construction

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>dp[s]</strong> = Can we form sum s? (true/false)
</div>

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace; font-size: 14px;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 8px;">After</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">0</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">1</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">2</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">3</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">4</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">5</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">6</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">7</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">8</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">9</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">10</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">11</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 8px; background: #e9ecef;"><strong>Init</strong></td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #d4edda;">T</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 8px; background: #e9ecef;"><strong>num=1</strong></td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #d4edda;">T</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #cce5ff;">T</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 8px; background: #e9ecef;"><strong>num=5</strong></td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #d4edda;">T</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #d4edda;">T</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #cce5ff;">T</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #cce5ff;">T</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 8px; background: #e9ecef;"><strong>num=11</strong></td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #d4edda;">T</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #d4edda;">T</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #d4edda;">T</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #d4edda;">T</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #cce5ff;">T</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 8px; background: #e9ecef;"><strong>num=5</strong></td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #d4edda;">T</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #d4edda;">T</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #d4edda;">T</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #d4edda;">T</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #cce5ff;">T</td>
<td style="border: 1px solid #dee2e6; padding: 8px; text-align: center; background: #d4edda;"><strong>T</strong></td>
</tr>
</table>

### Partition Visualization

<div style="display: flex; justify-content: center; gap: 40px; margin: 30px 0; flex-wrap: wrap;">
<div style="text-align: center; padding: 20px; background: #cce5ff; border-radius: 10px; min-width: 150px;">
<div style="font-weight: bold; margin-bottom: 10px;">Subset 1</div>
<div style="display: flex; gap: 10px; justify-content: center;">
<span style="background: #007bff; color: white; padding: 10px 15px; border-radius: 5px;">1</span>
<span style="background: #007bff; color: white; padding: 10px 15px; border-radius: 5px;">5</span>
<span style="background: #007bff; color: white; padding: 10px 15px; border-radius: 5px;">5</span>
</div>
<div style="margin-top: 10px;">Sum = <strong>11</strong></div>
</div>
<div style="display: flex; align-items: center; font-size: 24px;">=</div>
<div style="text-align: center; padding: 20px; background: #d4edda; border-radius: 10px; min-width: 150px;">
<div style="font-weight: bold; margin-bottom: 10px;">Subset 2</div>
<div style="display: flex; gap: 10px; justify-content: center;">
<span style="background: #28a745; color: white; padding: 10px 15px; border-radius: 5px;">11</span>
</div>
<div style="margin-top: 10px;">Sum = <strong>11</strong></div>
</div>
</div>

### Example 2: Why [1, 2, 3, 5] Fails

<div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; margin: 15px 0;">
<div>Total Sum = 1 + 2 + 3 + 5 = 11</div>
<div style="margin-top: 10px;"><strong>11 is ODD</strong> - Cannot partition into equal halves!</div>
</div>

### Final Result

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Answer = true</strong>
<br>
<small>Partitions: {1, 5, 5} and {11}, both sum to 11</small>
</div>

---

## Solution Approaches

### Approach 1: 1D DP (Space-Optimized)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n * sum) |
| Space Complexity | O(sum) |

**Strategy:** Boolean DP array where dp[s] = "can we make sum s?"

### Approach 2: Bitset Optimization

| Metric | Value |
|--------|-------|
| Time Complexity | O(n * sum / 64) |
| Space Complexity | O(sum / 64) |

**Strategy:** Use bitwise operations for faster subset sum.

### Approach 3: Recursive with Memoization

| Metric | Value |
|--------|-------|
| Time Complexity | O(n * sum) |
| Space Complexity | O(n * sum) |

**Strategy:** Top-down exploration of include/exclude choices.

---

## Edge Cases

| Case | Result | Reason |
|------|--------|--------|
| Odd total sum | false | Can't split evenly |
| Single element | false | One subset would be empty |
| All zeros | true | Both subsets sum to 0 |
| Two equal elements | true | One in each subset |

---

## Complexity Comparison

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| 1D DP | O(n * sum) | O(sum) | Best practical choice |
| Bitset | O(n * sum / 64) | O(sum / 64) | Fastest with bit ops |
| Recursive | O(n * sum) | O(n * sum) | Most intuitive |
