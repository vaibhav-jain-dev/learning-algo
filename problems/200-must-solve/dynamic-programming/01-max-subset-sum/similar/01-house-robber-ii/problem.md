<div id="viz-config" style="display:none">
{"name":"House Robber II","algorithm":"dp-max-subset","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"nums":[2,3,2]},"output":3,"inputRaw":"nums = [2, 3, 2]","outputRaw":"3"},{"input":{"nums":[1,2,3,1]},"output":4,"inputRaw":"nums = [1, 2, 3, 1]","outputRaw":"4"},{"input":{"nums":[1,2,3]},"output":3,"inputRaw":"nums = [1, 2, 3]","outputRaw":"3"}]}
</div>

# House Robber II (Circular Array)

**Difficulty:** Medium

## Problem Statement

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle**. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police**.

## Examples

**Example 1:**
```
Input: nums = [2, 3, 2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses (circular).
```

**Example 2:**
```
Input: nums = [1, 2, 3, 1]
Output: 4
Explanation: Rob house 1 (money = 1) and house 3 (money = 3). Total = 4.
```

**Example 3:**
```
Input: nums = [1, 2, 3]
Output: 3
```

## Constraints

- 1 <= nums.length <= 100
- 0 <= nums[i] <= 1000

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How does the circular constraint affect the original house robber problem?"

The key insight is:
- If we rob house 0, we CANNOT rob house n-1 (they're adjacent in a circle)
- If we rob house n-1, we CANNOT rob house 0

### Step 2: Identify the Pattern

**Key insight:** This is the original House Robber problem with ONE extra constraint (circular). We can break it into two subproblems:

1. Rob houses `[0, n-2]` (exclude last house)
2. Rob houses `[1, n-1]` (exclude first house)

The answer is the maximum of these two cases.

### Step 3: Define the Recurrence

For each linear subproblem:
```
dp[i] = max(dp[i-1], dp[i-2] + nums[i])
```

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>nums = [2, 3, 2]</code>
</div>

### The Circular Constraint

<div style="display: flex; justify-content: center; margin: 20px 0;">
<div style="position: relative; width: 200px; height: 200px;">
<div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); background: #28a745; color: white; padding: 15px 20px; border-radius: 50%; font-weight: bold;">2</div>
<div style="position: absolute; bottom: 30px; left: 0; background: #007bff; color: white; padding: 15px 20px; border-radius: 50%; font-weight: bold;">3</div>
<div style="position: absolute; bottom: 30px; right: 0; background: #dc3545; color: white; padding: 15px 20px; border-radius: 50%; font-weight: bold;">2</div>
<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 12px; color: #666;">CIRCLE</div>
</div>
</div>

<div style="background: #fff3cd; color: #856404; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Constraint:</strong> House 0 (green) and House 2 (red) are ADJACENT in the circle!
</div>

### Breaking Into Two Cases

<table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 15px; text-align: center;">Case</th>
<th style="border: 1px solid #dee2e6; padding: 15px; text-align: center;">Houses Considered</th>
<th style="border: 1px solid #dee2e6; padding: 15px; text-align: center;">Visualization</th>
<th style="border: 1px solid #dee2e6; padding: 15px; text-align: center;">Max Robbery</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"><strong>Case 1</strong></td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;">nums[0:n-1] = [2, 3]</td>
<td style="border: 1px solid #dee2e6; padding: 15px;">
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">2</span>
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">3</span>
<span style="background: #6c757d; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px; opacity: 0.5;">2</span>
</td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center; background: #d4edda;"><strong>3</strong></td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"><strong>Case 2</strong></td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;">nums[1:n] = [3, 2]</td>
<td style="border: 1px solid #dee2e6; padding: 15px;">
<span style="background: #6c757d; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px; opacity: 0.5;">2</span>
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">3</span>
<span style="background: #dc3545; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">2</span>
</td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center; background: #d4edda;"><strong>3</strong></td>
</tr>
</table>

### DP Table for Example: nums = [1, 2, 3, 1]

**Case 1: Houses [0, 1, 2] (excluding last)**

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px; width: 80px;">Index</th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 60px;">0</th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 60px;">1</th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 60px;">2</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;"><strong>nums</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">3</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;"><strong>dp</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;"><strong>4</strong></td>
</tr>
</table>

<div style="background: #cce5ff; color: #004085; padding: 10px; border-radius: 5px; margin: 10px 0;">
dp[2] = max(dp[1], dp[0] + nums[2]) = max(2, 1+3) = <strong>4</strong>
</div>

**Case 2: Houses [1, 2, 3] (excluding first)**

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px; width: 80px;">Index</th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 60px;">1</th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 60px;">2</th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 60px;">3</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;"><strong>nums</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;"><strong>dp</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;"><strong>4</strong></td>
</tr>
</table>

<div style="background: #cce5ff; color: #004085; padding: 10px; border-radius: 5px; margin: 10px 0;">
dp[3] = max(dp[2], dp[1] + nums[3]) = max(3, 2+1) = <strong>4</strong> (chose not to rob house 3)
</div>

### Final Result

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Answer = max(Case 1, Case 2) = max(4, 4) = 4</strong>
</div>

---

## Solution Approaches

### Approach 1: Two-Pass Linear DP

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Strategy:**
1. Run House Robber on `nums[0:n-1]`
2. Run House Robber on `nums[1:n]`
3. Return maximum

### Approach 2: Single Pass with State Tracking

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Strategy:** Track two separate DP states simultaneously.

---

## Complexity Comparison

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| Two-Pass DP | O(n) | O(1) | Simple, clear |
| Single Pass | O(n) | O(1) | Slightly faster (one loop) |
