# Longest Common Subsequence

**Difficulty:** Medium

## Problem Statement

Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

## Examples

**Example 1:**
```
Input: text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The longest common subsequence is "ace" with length 3.
```

**Example 2:**
```
Input: text1 = "abc", text2 = "abc"
Output: 3
```

**Example 3:**
```
Input: text1 = "abc", text2 = "def"
Output: 0
```

## Constraints

- 1 <= text1.length, text2.length <= 1000
- text1 and text2 consist of lowercase English characters only

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "What decisions do I make for each character?"

For each pair of characters (text1[i], text2[j]):
- If they **MATCH**: This character is part of LCS, extend from previous LCS
- If they **DON'T MATCH**: Take the better of two options (skip char from text1 OR text2)

### Step 2: Identify the Pattern

**Key insight:** This is a classic **Dynamic Programming** problem because:
- Optimal substructure: LCS of full strings depends on LCS of prefixes
- Overlapping subproblems: Same prefixes are computed multiple times

### Step 3: Define the Recurrence

```
If text1[i] == text2[j]:
    dp[i][j] = dp[i-1][j-1] + 1    // Match! Extend LCS
Else:
    dp[i][j] = max(dp[i-1][j], dp[i][j-1])  // Take best without this char
```

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>text1 = "abcde"</code><br>
<code>text2 = "ace"</code>
</div>

### DP Table Construction

The table below shows how we build `dp[i][j]` = LCS length for `text1[0:i]` and `text2[0:j]`:

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px; width: 50px;"></th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 50px;">""</th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 50px;">a</th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 50px;">c</th>
<th style="border: 1px solid #dee2e6; padding: 10px; width: 50px;">e</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef; font-weight: bold;">""</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef; font-weight: bold;">a</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda; color: #155724;"><strong>1</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef; font-weight: bold;">b</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef; font-weight: bold;">c</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda; color: #155724;"><strong>2</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">2</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef; font-weight: bold;">d</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">2</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef; font-weight: bold;">e</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda; color: #155724;"><strong>3</strong></td>
</tr>
</table>

<div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Answer:</strong> dp[5][3] = 3 → LCS = "ace"
</div>

### Step-by-Step Execution

**Step 1:** Compare `a` with `a`

<div style="display: flex; gap: 10px; margin: 15px 0;">
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">a</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">b</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">c</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">d</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">e</span>
<span style="margin: 0 10px;">←</span>
<span style="font-style: italic;">text1</span>
</div>

<div style="display: flex; gap: 10px; margin: 15px 0;">
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">a</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">c</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">e</span>
<span style="margin: 0 10px;">←</span>
<span style="font-style: italic;">text2</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
✓ <strong>MATCH!</strong> → dp[1][1] = dp[0][0] + 1 = <strong>1</strong>
</div>

---

**Step 2:** Compare `c` with `c`

<div style="display: flex; gap: 10px; margin: 15px 0;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">a</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">b</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">c</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">d</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">e</span>
</div>

<div style="display: flex; gap: 10px; margin: 15px 0;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">a</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">c</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">e</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
✓ <strong>MATCH!</strong> → dp[3][2] = dp[2][1] + 1 = <strong>2</strong>
</div>

---

**Step 3:** Compare `e` with `e`

<div style="display: flex; gap: 10px; margin: 15px 0;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">a</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">b</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">c</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">d</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">e</span>
</div>

<div style="display: flex; gap: 10px; margin: 15px 0;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">a</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">c</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">e</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
✓ <strong>MATCH!</strong> → dp[5][3] = dp[4][2] + 1 = <strong>3</strong>
</div>

---

### Final Result

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>LCS = "ace"</strong><br>
<strong>Length = 3</strong>
</div>

---

## Solution Approaches

### Approach 1: Dynamic Programming (2D Table) ⭐ RECOMMENDED

| Metric | Value |
|--------|-------|
| Time Complexity | O(m × n) |
| Space Complexity | O(m × n) |

**Why this is best:**
- Clear visualization of subproblem relationships
- Easy to understand and debug
- Can reconstruct the actual LCS string if needed

### Approach 2: Space-Optimized DP

| Metric | Value |
|--------|-------|
| Time Complexity | O(m × n) |
| Space Complexity | O(min(m, n)) |

**When to use:** Memory is constrained, only need the length.

### Approach 3: Recursive with Memoization

| Metric | Value |
|--------|-------|
| Time Complexity | O(m × n) |
| Space Complexity | O(m × n) |

**When to use:** More intuitive top-down thinking.

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| 2D DP Table | O(m × n) | O(m × n) | ⭐ BEST |
| Space-Optimized DP | O(m × n) | O(min(m,n)) | ✓ Low memory |
| Recursive + Memo | O(m × n) | O(m × n) | ✓ Intuitive |
