<div id="viz-config" style="display:none">
{"name":"Target Sum","algorithm":"dp-coin-change","complexity":{"time":"O(n * sum)","space":"O(sum)"},"examples":[{"input":{"nums":[1,1,1,1,1],"target":3},"output":5,"inputRaw":"nums = [1, 1, 1, 1, 1], target = 3","outputRaw":"5"},{"input":{"nums":[1],"target":1},"output":1,"inputRaw":"nums = [1], target = 1","outputRaw":"1"}]}
</div>

# Target Sum

**Difficulty:** Medium

## Problem Statement

You are given an integer array `nums` and an integer `target`.

You want to build an **expression** out of nums by adding one of the symbols `'+'` and `'-'` before each integer in nums and then concatenate all the integers.

Return the number of different expressions that you can build, which evaluates to `target`.

## Examples

**Example 1:**
```
Input: nums = [1, 1, 1, 1, 1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols:
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
```

**Example 2:**
```
Input: nums = [1], target = 1
Output: 1
```

## Constraints

- 1 <= nums.length <= 20
- 0 <= nums[i] <= 1000
- 0 <= sum(nums) <= 1000
- -1000 <= target <= 1000

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question:** "How can I transform this into a known problem?"

Let P = sum of numbers with `+` sign
Let N = sum of numbers with `-` sign

Then:
- P + N = total_sum
- P - N = target

From these equations:
- P = (total_sum + target) / 2

**Key insight:** Finding ways to reach target is equivalent to finding subsets that sum to `(total_sum + target) / 2`.

### Step 2: Transform to Subset Sum

This is now a **counting subset sum** problem:
- Count subsets of `nums` that sum to `(total_sum + target) / 2`
- This is similar to "Number of Ways to Make Change"!

### Step 3: Define the Recurrence

```
dp[0] = 1  (one way to make sum 0 - take nothing)
dp[s] = dp[s] + dp[s - num]  for each num
```

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>nums = [1, 1, 1, 1, 1], target = 3</code>
</div>

### Mathematical Transformation

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<div style="margin-bottom: 10px;">
<strong>Given:</strong>
<ul>
<li>total_sum = 1 + 1 + 1 + 1 + 1 = 5</li>
<li>target = 3</li>
</ul>
</div>
<div style="margin-bottom: 10px;">
<strong>Transformation:</strong>
<ul>
<li>P (positives) + N (negatives) = 5</li>
<li>P - N = 3</li>
<li>Solving: P = (5 + 3) / 2 = 4</li>
</ul>
</div>
<div style="background: #d4edda; padding: 10px; border-radius: 5px;">
<strong>New Problem:</strong> Find subsets that sum to 4
</div>
</div>

### All 5 Valid Assignments

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace; width: 100%;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px;">#</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Expression</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Positive Set (P)</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">P Sum</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">-1 +1 +1 +1 +1</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">{idx 1,2,3,4}</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;">4</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">+1 -1 +1 +1 +1</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">{idx 0,2,3,4}</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;">4</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">+1 +1 -1 +1 +1</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">{idx 0,1,3,4}</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;">4</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">4</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">+1 +1 +1 -1 +1</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">{idx 0,1,2,4}</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;">4</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">5</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">+1 +1 +1 +1 -1</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">{idx 0,1,2,3}</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;">4</td>
</tr>
</table>

### DP Table Construction (Subset Sum to 4)

<div style="background: #fff3cd; color: #856404; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>dp[s]</strong> = number of ways to select subsets summing to s
</div>

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px;">After</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">dp[0]</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">dp[1]</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">dp[2]</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">dp[3]</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">dp[4]</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;">Initial</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;">num=1 (#1)</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;">num=1 (#2)</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;">num=1 (#3)</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;">num=1 (#4)</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">4</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">6</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">4</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">1</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;">num=1 (#5)</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">5</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">10</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">10</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;"><strong>5</strong></td>
</tr>
</table>

### Edge Cases to Check

<div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>Invalid cases (return 0):</strong>
<ul>
<li>If (total_sum + target) is odd: Can't divide evenly</li>
<li>If target > total_sum: Can't reach target even with all positive</li>
<li>If target < -total_sum: Can't reach target even with all negative</li>
</ul>
</div>

### Final Result

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Answer = 5 ways</strong>
</div>

---

## Solution Approaches

### Approach 1: Subset Sum DP (Optimal)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n * sum) |
| Space Complexity | O(sum) |

**Strategy:** Transform to subset sum counting problem.

### Approach 2: 2D DP with Offset

| Metric | Value |
|--------|-------|
| Time Complexity | O(n * sum) |
| Space Complexity | O(n * sum) |

**Strategy:** dp[i][s+offset] = ways to reach sum s using first i numbers.

### Approach 3: Recursive with Memoization

| Metric | Value |
|--------|-------|
| Time Complexity | O(n * sum) |
| Space Complexity | O(n * sum) |

**Strategy:** Top-down approach exploring all +/- choices.

---

## Complexity Comparison

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| Subset Sum | O(n * sum) | O(sum) | Best space |
| 2D DP | O(n * sum) | O(n * sum) | Easier to understand |
| Recursive | O(n * sum) | O(n * sum) | Most intuitive |
