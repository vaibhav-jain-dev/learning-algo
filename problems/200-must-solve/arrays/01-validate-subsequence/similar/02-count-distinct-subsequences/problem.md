# Count Distinct Subsequences

**Difficulty:** Hard (Red)

## Problem Statement

Given two strings `s` and `t`, return the number of distinct subsequences of `s` which equals `t`.

A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

## Examples

**Example 1:**
```
Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation: There are 3 ways to choose "rabbit" from "rabbbit"
```

**Example 2:**
```
Input: s = "babgbag", t = "bag"
Output: 5
Explanation: 5 different ways to form "bag" from "babgbag"
```

## Constraints

- 1 <= s.length, t.length <= 1000
- s and t consist of English letters

---

## 🧠 Thought Process & Pattern Recognition

<details>
<summary><strong>Click to reveal thinking pattern</strong></summary>

### Step 1: Understand the Core Problem
**Question:** "For each character, what choices do I have?"

At each position in `s`:
- If s[i] == t[j]: TWO choices!
  1. USE this match (move both pointers)
  2. SKIP this match (maybe better match later)
- If s[i] != t[j]: Only ONE choice - skip this character

### Step 2: Identify the Pattern
**Key insight:** This is **DP with counting**, not optimization:
- We ADD ways (not max/min)
- Each match gives us two paths to explore

### Step 3: Define the Recurrence
```
If s[i-1] == t[j-1]:
    dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
              (use match)    (skip match)
Else:
    dp[i][j] = dp[i-1][j]   // skip s[i-1]
```

### Step 4: Base Case
- `dp[i][0] = 1` for all i (empty t can be formed in exactly 1 way)
- `dp[0][j] = 0` for j > 0 (can't form non-empty t from empty s)

</details>

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>s = "rabbbit"</code><br>
<code>t = "rabbit"</code>
</div>

### DP Table Construction

The table shows `dp[i][j]` = number of ways to form `t[0:j]` from `s[0:i]`:

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px; width: 50px;"></th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 50px;">""</th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 50px;">r</th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 50px;">a</th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 50px;">b</th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 50px;">b</th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 50px;">i</th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 50px;">t</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef; font-weight: bold;">""</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef; font-weight: bold;">r</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda; color: #155724;"><strong>1</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef; font-weight: bold;">a</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda; color: #155724;"><strong>1</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef; font-weight: bold;">b</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda; color: #155724;"><strong>1</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef; font-weight: bold;">b</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #fff3cd; color: #856404;"><strong>2</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda; color: #155724;"><strong>1</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef; font-weight: bold;">b</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #fff3cd; color: #856404;"><strong>3</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #fff3cd; color: #856404;"><strong>3</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef; font-weight: bold;">i</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda; color: #155724;"><strong>3</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef; font-weight: bold;">t</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda; color: #155724;"><strong>3</strong></td>
</tr>
</table>

<div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Answer:</strong> dp[7][6] = 3 ways to form "rabbit" from "rabbbit"
</div>

---

### Key Insight: The Three B's

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>s = "r a b1 b2 b3 i t"</code><br>
<code>t = "r a b  b  i  t"</code>
</div>

**Three ways to pick two b's from three b's:**

**Way 1:** Use b1 and b2

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">r</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">a</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">b1</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">b2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">b3</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">i</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">t</span>
</div>

**Way 2:** Use b1 and b3

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">r</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">a</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">b1</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">b2</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">b3</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">i</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">t</span>
</div>

**Way 3:** Use b2 and b3

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">r</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">a</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">b1</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">b2</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">b3</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">i</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">t</span>
</div>

---

### Why dp[5][4] = 3?

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
At s[4]='b3' and t[3]='b' (second 'b' in target):<br><br>
<code>dp[5][4] = dp[4][3] + dp[4][4]</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = (use b3) + (skip b3)</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = 2 + 1 = 3</code>
</div>

---

---

## Solution Approaches

### Approach 1: Dynamic Programming (2D Table) ⭐ RECOMMENDED

**Time Complexity:** O(m × n)
**Space Complexity:** O(m × n)

**Why this is best:**
- Clear counting logic
- Easy to trace and debug
- Handles large inputs well

### Approach 2: Space-Optimized DP

**Time Complexity:** O(m × n)
**Space Complexity:** O(n)

**Key trick:** Process right-to-left to avoid using updated values.

### Approach 3: Recursive with Memoization

**Time Complexity:** O(m × n)
**Space Complexity:** O(m × n)

**When to use:** More intuitive top-down thinking.

---

## 📈 Complexity Comparison

```
┌─────────────────────────────┬──────────────┬──────────────┬────────────────┐
│         Approach            │     Time     │    Space     │  Recommendation │
├─────────────────────────────┼──────────────┼──────────────┼────────────────┤
│ 2D DP Table                 │   O(m × n)   │   O(m × n)   │  ⭐ BEST       │
│ Space-Optimized DP          │   O(m × n)   │    O(n)      │  ✓ Low memory  │
│ Recursive + Memo            │   O(m × n)   │   O(m × n)   │  ✓ Intuitive   │
└─────────────────────────────┴──────────────┴──────────────┴────────────────┘
```
