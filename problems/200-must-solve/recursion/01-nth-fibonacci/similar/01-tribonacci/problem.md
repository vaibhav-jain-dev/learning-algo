# N-th Tribonacci Number

**Difficulty:** Medium

## Problem Statement

The Tribonacci sequence Tn is defined as follows:

T0 = 0, T1 = 1, T2 = 1, and Tn = Tn-1 + Tn-2 + Tn-3 for n >= 3.

Given n, return the value of Tn.

## Examples

**Example 1:**
```
Input: n = 4
Output: 4
Explanation:
T3 = 0 + 1 + 1 = 2
T4 = 1 + 1 + 2 = 4
```

**Example 2:**
```
Input: n = 25
Output: 1389537
```

**Example 3:**
```
Input: n = 0
Output: 0
```

## Constraints

- 0 <= n <= 37
- The answer is guaranteed to fit within a 32-bit integer

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How does this relate to regular Fibonacci?"

Key differences from Fibonacci:
- **Fibonacci:** F(n) = F(n-1) + F(n-2) - uses last **2** values
- **Tribonacci:** T(n) = T(n-1) + T(n-2) + T(n-3) - uses last **3** values

### Step 2: Identify the Pattern

**Key insight:** This is a linear recurrence problem:
- Same structure as Fibonacci, just with one more term
- We need to track 3 previous values instead of 2
- Can use the same optimization techniques (iteration, matrix exponentiation)

### Step 3: Choose the Right Approach

For small n (n <= 37): **Iterative approach** is optimal
- O(n) time, O(1) space
- Simple to implement

For very large n: **Matrix exponentiation** gives O(log n) time

---

## Visual Diagram: Recursion Tree

### Naive Recursion (Why It's Slow)

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 20px;">
<strong>Computing T(5) with naive recursion:</strong>
</div>

<!-- Level 0 -->
<div style="display: flex; justify-content: center; margin: 10px 0;">
  <div style="background: #dc3545; color: white; padding: 10px 20px; border-radius: 8px; font-weight: bold;">
    T(5)
  </div>
</div>

<!-- Arrow -->
<div style="text-align: center; font-size: 20px; color: #6c757d;">|</div>
<div style="text-align: center; font-size: 12px; color: #6c757d; margin-bottom: 5px;">needs T(4) + T(3) + T(2)</div>

<!-- Level 1 -->
<div style="display: flex; justify-content: center; gap: 30px; margin: 10px 0;">
  <div style="background: #fd7e14; color: white; padding: 8px 16px; border-radius: 8px;">T(4)</div>
  <div style="background: #fd7e14; color: white; padding: 8px 16px; border-radius: 8px;">T(3)</div>
  <div style="background: #fd7e14; color: white; padding: 8px 16px; border-radius: 8px;">T(2)</div>
</div>

<!-- Arrow -->
<div style="text-align: center; font-size: 12px; color: #6c757d; margin: 5px 0;">each branches into 3 more calls...</div>

<!-- Level 2 -->
<div style="display: flex; justify-content: center; gap: 15px; margin: 10px 0; flex-wrap: wrap;">
  <div style="background: #ffc107; color: black; padding: 6px 12px; border-radius: 6px; font-size: 14px;">T(3)</div>
  <div style="background: #ffc107; color: black; padding: 6px 12px; border-radius: 6px; font-size: 14px;">T(2)</div>
  <div style="background: #ffc107; color: black; padding: 6px 12px; border-radius: 6px; font-size: 14px;">T(1)</div>
  <div style="background: #ffc107; color: black; padding: 6px 12px; border-radius: 6px; font-size: 14px;">T(2)</div>
  <div style="background: #ffc107; color: black; padding: 6px 12px; border-radius: 6px; font-size: 14px;">T(1)</div>
  <div style="background: #ffc107; color: black; padding: 6px 12px; border-radius: 6px; font-size: 14px;">T(0)</div>
  <div style="background: #28a745; color: white; padding: 6px 12px; border-radius: 6px; font-size: 14px;">1</div>
</div>

<div style="background: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; margin-top: 15px; text-align: center;">
<strong>Problem:</strong> T(3), T(2), T(1) are computed MULTIPLE times!<br>
Time Complexity: O(3^n) - Exponential!
</div>

</div>

### Optimal Iterative Approach

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 15px;">
<strong>Computing T(5) iteratively with 3 variables:</strong>
</div>

<!-- Initial State -->
<div style="margin: 15px 0;">
<div style="background: #e9ecef; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
<strong>Initial:</strong>
</div>
<div style="display: flex; gap: 20px; justify-content: center;">
  <div style="background: #007bff; color: white; padding: 10px 20px; border-radius: 5px;">a = 0<br><small>T(0)</small></div>
  <div style="background: #007bff; color: white; padding: 10px 20px; border-radius: 5px;">b = 1<br><small>T(1)</small></div>
  <div style="background: #007bff; color: white; padding: 10px 20px; border-radius: 5px;">c = 1<br><small>T(2)</small></div>
</div>
</div>

<!-- Step 1 -->
<div style="margin: 15px 0;">
<div style="background: #e9ecef; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
<strong>Step 1 (i=3):</strong> T(3) = 0 + 1 + 1 = 2
</div>
<div style="display: flex; gap: 20px; justify-content: center;">
  <div style="background: #6c757d; color: white; padding: 10px 20px; border-radius: 5px;">a = 1<br><small>T(1)</small></div>
  <div style="background: #6c757d; color: white; padding: 10px 20px; border-radius: 5px;">b = 1<br><small>T(2)</small></div>
  <div style="background: #28a745; color: white; padding: 10px 20px; border-radius: 5px;">c = 2<br><small>T(3)</small></div>
</div>
</div>

<!-- Step 2 -->
<div style="margin: 15px 0;">
<div style="background: #e9ecef; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
<strong>Step 2 (i=4):</strong> T(4) = 1 + 1 + 2 = 4
</div>
<div style="display: flex; gap: 20px; justify-content: center;">
  <div style="background: #6c757d; color: white; padding: 10px 20px; border-radius: 5px;">a = 1<br><small>T(2)</small></div>
  <div style="background: #6c757d; color: white; padding: 10px 20px; border-radius: 5px;">b = 2<br><small>T(3)</small></div>
  <div style="background: #28a745; color: white; padding: 10px 20px; border-radius: 5px;">c = 4<br><small>T(4)</small></div>
</div>
</div>

<!-- Step 3 -->
<div style="margin: 15px 0;">
<div style="background: #e9ecef; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
<strong>Step 3 (i=5):</strong> T(5) = 1 + 2 + 4 = 7
</div>
<div style="display: flex; gap: 20px; justify-content: center;">
  <div style="background: #6c757d; color: white; padding: 10px 20px; border-radius: 5px;">a = 2<br><small>T(3)</small></div>
  <div style="background: #6c757d; color: white; padding: 10px 20px; border-radius: 5px;">b = 4<br><small>T(4)</small></div>
  <div style="background: #28a745; color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold;">c = 7<br><small>T(5)</small></div>
</div>
</div>

<div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin-top: 15px; text-align: center;">
<strong>Answer: T(5) = 7</strong><br>
Time: O(n) | Space: O(1)
</div>

</div>

---

## Solution Approaches

### Approach 1: Iterative (Optimal)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Why this is best:**
- Constant space using only 3 variables
- Simple sliding window of values
- No recursion overhead

### Approach 2: Memoization

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**When to use:** When you prefer top-down thinking or need to compute sparse values.

### Approach 3: Matrix Exponentiation

| Metric | Value |
|--------|-------|
| Time Complexity | O(log n) |
| Space Complexity | O(1) |

**When to use:** For extremely large n values where O(n) is too slow.

---

## Complexity Comparison

| Approach | Time | Space | Best For |
|----------|------|-------|----------|
| Naive Recursion | O(3^n) | O(n) | Never use |
| Memoization | O(n) | O(n) | Learning |
| Iterative | O(n) | O(1) | Most cases |
| Matrix Exponentiation | O(log n) | O(1) | Very large n |
