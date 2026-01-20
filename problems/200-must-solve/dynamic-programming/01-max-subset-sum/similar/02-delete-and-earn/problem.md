<div id="viz-config" style="display:none">
{"name":"Delete and Earn","algorithm":"dp-max-subset","complexity":{"time":"O(n + max_val)","space":"O(max_val)"},"examples":[{"input":{"nums":[3,4,2]},"output":6,"inputRaw":"nums = [3, 4, 2]","outputRaw":"6"},{"input":{"nums":[2,2,3,3,3,4]},"output":9,"inputRaw":"nums = [2, 2, 3, 3, 3, 4]","outputRaw":"9"}]}
</div>

# Delete and Earn

**Difficulty:** Medium

## Problem Statement

You are given an integer array `nums`. You want to maximize the number of points you get by performing the following operation any number of times:

- Pick any `nums[i]` and delete it to earn `nums[i]` points.
- Afterwards, you must delete **every** element equal to `nums[i] - 1` and **every** element equal to `nums[i] + 1`.

Return the **maximum number of points** you can earn by applying the above operation some number of times.

## Examples

**Example 1:**
```
Input: nums = [3, 4, 2]
Output: 6
Explanation:
- Delete 4 to earn 4 points. Consequently, 3 is also deleted. nums = [2].
- Delete 2 to earn 2 points. nums = [].
Total points earned = 6.
```

**Example 2:**
```
Input: nums = [2, 2, 3, 3, 3, 4]
Output: 9
Explanation:
- Delete all 3s to earn 3*3 = 9 points. This deletes all 2s and 4s.
Total points earned = 9.
```

## Constraints

- 1 <= nums.length <= 2 * 10^4
- 1 <= nums[i] <= 10^4

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "What happens when I pick a number?"

When you pick number `x`:
- You earn `x` points for EACH occurrence of `x`
- ALL numbers `x-1` and `x+1` are deleted (can't earn from them)

**Key Realization:** If you pick any occurrence of `x`, you should pick ALL occurrences of `x` (since they give points without extra penalty).

### Step 2: Transform to a Familiar Problem

**Brilliant Insight:** This is House Robber in disguise!

1. First, compute `points[x]` = sum of all `x` values = `x * count(x)`
2. Now the problem becomes: pick values such that no two adjacent values are picked
3. This is exactly House Robber!

### Step 3: Define the Recurrence

After transformation:
```
dp[x] = max(dp[x-1], dp[x-2] + points[x])
```

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>nums = [2, 2, 3, 3, 3, 4]</code>
</div>

### Step 1: Transform to Points Array

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>Transformation:</strong> points[x] = x * count(x)
</div>

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 12px;">Value (x)</th>
<th style="border: 1px solid #dee2e6; padding: 12px;">Count</th>
<th style="border: 1px solid #dee2e6; padding: 12px;">Points = x * count</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">2</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">2</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #fff3cd;">4</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">3</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">3</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #d4edda;"><strong>9</strong></td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">4</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #fff3cd;">4</td>
</tr>
</table>

<div style="background: #cce5ff; color: #004085; padding: 10px; border-radius: 5px; margin: 10px 0;">
Points array: [0, 0, 4, 9, 4] (indices 0, 1, 2, 3, 4)
</div>

### Step 2: Apply House Robber Logic

<div style="background: #fff3cd; color: #856404; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>Constraint:</strong> If we take points[3] = 9, we cannot take points[2] or points[4]!
<br>This is exactly like houses that can't be adjacent.
</div>

### DP Table Construction

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px;">Value</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">0</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">1</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">2</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">3</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">4</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;"><strong>points</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">4</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">9</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">4</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;"><strong>dp</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">4</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;"><strong>9</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;"><strong>9</strong></td>
</tr>
</table>

### Step-by-Step DP Filling

<div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">

**Value 2:**
<div style="margin-left: 20px;">
dp[2] = max(dp[1], dp[0] + points[2]) = max(0, 0 + 4) = <strong>4</strong>
</div>

**Value 3:**
<div style="margin-left: 20px;">
dp[3] = max(dp[2], dp[1] + points[3]) = max(4, 0 + 9) = <strong>9</strong>
<div style="color: #155724; margin-top: 5px;">Choosing 3s is better than choosing 2s!</div>
</div>

**Value 4:**
<div style="margin-left: 20px;">
dp[4] = max(dp[3], dp[2] + points[4]) = max(9, 4 + 4) = <strong>9</strong>
<div style="color: #155724; margin-top: 5px;">Keeping 3s (9) is better than 2s+4s (8)!</div>
</div>

</div>

### Decision Visualization

<div style="display: flex; gap: 20px; margin: 20px 0; flex-wrap: wrap;">
<div style="flex: 1; min-width: 200px; padding: 15px; background: #f8d7da; border-radius: 8px;">
<strong>Option A: Take 2s and 4s</strong>
<div style="margin-top: 10px;">
<span style="background: #dc3545; color: white; padding: 5px 10px; border-radius: 5px;">2+2</span>
+
<span style="background: #dc3545; color: white; padding: 5px 10px; border-radius: 5px;">4</span>
= 8 points
</div>
</div>
<div style="flex: 1; min-width: 200px; padding: 15px; background: #d4edda; border-radius: 8px;">
<strong>Option B: Take all 3s</strong>
<div style="margin-top: 10px;">
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px;">3+3+3</span>
= 9 points
</div>
</div>
</div>

### Final Result

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Maximum Points = 9</strong>
<br>
<small>(Take all 3s, which deletes 2s and 4s)</small>
</div>

---

## Solution Approaches

### Approach 1: Transform + House Robber

| Metric | Value |
|--------|-------|
| Time Complexity | O(n + max_val) |
| Space Complexity | O(max_val) |

**Strategy:**
1. Build points array where `points[x] = x * count(x)`
2. Apply House Robber DP on points array

### Approach 2: HashMap + Sorted Keys

| Metric | Value |
|--------|-------|
| Time Complexity | O(n + k log k) where k = unique values |
| Space Complexity | O(k) |

**Strategy:** Only process values that exist, handle gaps explicitly.

---

## Complexity Comparison

| Approach | Time | Space | Best For |
|----------|------|-------|----------|
| Points Array | O(n + max_val) | O(max_val) | Dense value range |
| HashMap + Sort | O(n + k log k) | O(k) | Sparse value range |
