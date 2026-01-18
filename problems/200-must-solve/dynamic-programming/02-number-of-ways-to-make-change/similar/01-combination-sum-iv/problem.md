# Combination Sum IV

**Difficulty:** Medium

## Problem Statement

Given an array of **distinct** integers `nums` and a target integer `target`, return the number of possible combinations that add up to `target`.

**Note:** The different sequences are counted as different combinations (this is counting **permutations**, not combinations).

## Examples

**Example 1:**
```
Input: nums = [1, 2, 3], target = 4
Output: 7
Explanation:
(1,1,1,1)
(1,1,2)
(1,2,1)
(2,1,1)
(2,2)
(1,3)
(3,1)
```

**Example 2:**
```
Input: nums = [9], target = 3
Output: 0
```

## Constraints

- 1 <= nums.length <= 200
- 1 <= nums[i] <= 1000
- All elements of nums are unique
- 1 <= target <= 1000

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Key Difference

**Question:** How is this different from "Number of Ways to Make Change"?

| Problem | Order Matters? | Count Type |
|---------|---------------|------------|
| Coin Change (ways) | No | Combinations |
| Combination Sum IV | Yes | Permutations |

Example: For target=3 with [1,2]:
- Coin Change: 2 ways → {1,1,1} and {1,2}
- Combination Sum IV: 3 ways → (1,1,1), (1,2), (2,1)

### Step 2: Identify the Pattern Change

**Key insight:** In Coin Change, we iterate coins in the outer loop to avoid counting same coins in different order.

For permutations, we iterate **amounts in the outer loop** and coins in the inner loop.

### Step 3: Define the Recurrence

```
dp[0] = 1  (one way to make 0 - use nothing)
dp[amount] = sum(dp[amount - num] for num in nums if amount >= num)
```

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>nums = [1, 2, 3], target = 4</code>
</div>

### The Key Difference: Loop Order

<div style="display: flex; gap: 20px; margin: 20px 0; flex-wrap: wrap;">
<div style="flex: 1; min-width: 280px; padding: 15px; background: #cce5ff; border-radius: 8px;">
<strong>Coin Change (Combinations)</strong>
<pre style="background: #e7f3ff; padding: 10px; border-radius: 5px; margin-top: 10px;">
for coin in coins:        # Outer
    for amount in range:  # Inner
        dp[amount] += dp[amount-coin]
</pre>
<div style="margin-top: 10px;">Result: {1,2} and {2,1} count as ONE</div>
</div>
<div style="flex: 1; min-width: 280px; padding: 15px; background: #d4edda; border-radius: 8px;">
<strong>Combination Sum IV (Permutations)</strong>
<pre style="background: #e8f5e9; padding: 10px; border-radius: 5px; margin-top: 10px;">
for amount in range:      # Outer
    for num in nums:      # Inner
        dp[amount] += dp[amount-num]
</pre>
<div style="margin-top: 10px;">Result: {1,2} and {2,1} count as TWO</div>
</div>
</div>

### DP Table Construction

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 12px;">Target</th>
<th style="border: 1px solid #dee2e6; padding: 12px;">0</th>
<th style="border: 1px solid #dee2e6; padding: 12px;">1</th>
<th style="border: 1px solid #dee2e6; padding: 12px;">2</th>
<th style="border: 1px solid #dee2e6; padding: 12px;">3</th>
<th style="border: 1px solid #dee2e6; padding: 12px;">4</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 12px; background: #e9ecef;"><strong>dp</strong></td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #d4edda;">1</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">2</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">4</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #d4edda;"><strong>7</strong></td>
</tr>
</table>

### Step-by-Step Calculation

<div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">

**dp[0] = 1** (base case: one way to make 0)

**dp[1]:**
<div style="margin-left: 20px; background: #fff; padding: 10px; border-radius: 5px; margin: 5px 0;">
= dp[1-1] (use 1) = dp[0] = <strong>1</strong>
<div style="color: #666; font-size: 12px;">Sequences: (1)</div>
</div>

**dp[2]:**
<div style="margin-left: 20px; background: #fff; padding: 10px; border-radius: 5px; margin: 5px 0;">
= dp[2-1] + dp[2-2] = dp[1] + dp[0] = 1 + 1 = <strong>2</strong>
<div style="color: #666; font-size: 12px;">Sequences: (1,1), (2)</div>
</div>

**dp[3]:**
<div style="margin-left: 20px; background: #fff; padding: 10px; border-radius: 5px; margin: 5px 0;">
= dp[3-1] + dp[3-2] + dp[3-3] = dp[2] + dp[1] + dp[0] = 2 + 1 + 1 = <strong>4</strong>
<div style="color: #666; font-size: 12px;">Sequences: (1,1,1), (1,2), (2,1), (3)</div>
</div>

**dp[4]:**
<div style="margin-left: 20px; background: #fff; padding: 10px; border-radius: 5px; margin: 5px 0;">
= dp[4-1] + dp[4-2] + dp[4-3] = dp[3] + dp[2] + dp[1] = 4 + 2 + 1 = <strong>7</strong>
<div style="color: #666; font-size: 12px;">Sequences: (1,1,1,1), (1,1,2), (1,2,1), (2,1,1), (2,2), (1,3), (3,1)</div>
</div>

</div>

### Visualization: All 7 Permutations for Target = 4

<div style="display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0;">
<div style="background: #f8f9fa; padding: 10px 15px; border-radius: 8px; border: 1px solid #dee2e6;">
<span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">1</span>
<span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">1</span>
<span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">1</span>
<span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">1</span>
</div>
<div style="background: #f8f9fa; padding: 10px 15px; border-radius: 8px; border: 1px solid #dee2e6;">
<span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">1</span>
<span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">1</span>
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">2</span>
</div>
<div style="background: #f8f9fa; padding: 10px 15px; border-radius: 8px; border: 1px solid #dee2e6;">
<span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">1</span>
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">2</span>
<span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">1</span>
</div>
<div style="background: #f8f9fa; padding: 10px 15px; border-radius: 8px; border: 1px solid #dee2e6;">
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">2</span>
<span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">1</span>
<span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">1</span>
</div>
<div style="background: #f8f9fa; padding: 10px 15px; border-radius: 8px; border: 1px solid #dee2e6;">
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">2</span>
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">2</span>
</div>
<div style="background: #f8f9fa; padding: 10px 15px; border-radius: 8px; border: 1px solid #dee2e6;">
<span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">1</span>
<span style="background: #dc3545; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">3</span>
</div>
<div style="background: #f8f9fa; padding: 10px 15px; border-radius: 8px; border: 1px solid #dee2e6;">
<span style="background: #dc3545; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">3</span>
<span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 3px; margin: 2px;">1</span>
</div>
</div>

### Final Result

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Answer = 7 permutations</strong>
</div>

---

## Solution Approaches

### Approach 1: Bottom-Up DP

| Metric | Value |
|--------|-------|
| Time Complexity | O(target * n) |
| Space Complexity | O(target) |

**Strategy:** Iterate amounts in outer loop, nums in inner loop.

### Approach 2: Top-Down with Memoization

| Metric | Value |
|--------|-------|
| Time Complexity | O(target * n) |
| Space Complexity | O(target) |

**Strategy:** Recursive with caching.

---

## Complexity Comparison

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| Bottom-Up DP | O(target * n) | O(target) | Simple, iterative |
| Top-Down Memo | O(target * n) | O(target) | More intuitive |
