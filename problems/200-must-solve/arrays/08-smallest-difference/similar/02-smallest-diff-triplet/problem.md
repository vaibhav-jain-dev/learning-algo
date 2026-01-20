# Smallest Difference Triplet

**Difficulty:** Hard (Red)

## Problem Statement

Given three sorted arrays, find one element from each such that (max - min) is minimized.

## Examples

**Example 1:**
```
Input: arr1 = [1, 4, 5], arr2 = [10, 20], arr3 = [14, 19]
Output: [5, 10, 14] (max-min = 14-5 = 9)
```

**Example 2:**
```
Input: arr1 = [1, 2, 3], arr2 = [2, 3, 4], arr3 = [3, 4, 5]
Output: [3, 3, 3] or [3, 4, 3] (range = 0 or 1)
```

## Constraints

- Arrays are non-empty
- 1 <= array.length <= 10^5

---

## 🧠 Thought Process & Pattern Recognition

<details>
<summary><strong>Click to reveal thinking pattern</strong></summary>

### Step 1: Understand the Objective
**Question:** "What makes the range small?"

The range (max - min) is minimized when all three numbers are as close as possible.

### Step 2: Key Insight
**Observation:** To reduce the range, we should try to increase the smallest number!
- If we increase the largest, range stays same or increases
- If we increase the smallest, range decreases or stays same

### Step 3: The Algorithm
1. Sort all three arrays
2. Start with pointers at the beginning of each
3. Find current min and max
4. Move the pointer that has the minimum value
5. Repeat until one array is exhausted

### Step 4: Why This Works
Moving the minimum pointer always gives us the best chance of reducing the range. The minimum can only increase (or stay same), while max might decrease.

</details>

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>arr1 = [1, 4, 5]</code><br>
<code>arr2 = [10, 20]</code><br>
<code>arr3 = [14, 19]</code>
</div>

---

### Three Pointers Approach

**Step 1:** Initialize pointers at start of each array

<div style="display: flex; gap: 20px; margin: 15px 0; flex-wrap: wrap;">
<div>
<strong>arr1:</strong>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">1</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">4</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">5</span>
</div>
<div>
<strong>arr2:</strong>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">10</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">20</span>
</div>
<div>
<strong>arr3:</strong>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">14</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">19</span>
</div>
</div>

<div style="background: #fff3cd; color: #856404; padding: 10px; border-radius: 5px; margin: 10px 0;">
Triplet: (1, 10, 14) → min = 1, max = 14, <strong>range = 13</strong><br>
Minimum is in arr1 → Move arr1 pointer
</div>

---

**Step 2:** After moving arr1 pointer

<div style="display: flex; gap: 20px; margin: 15px 0; flex-wrap: wrap;">
<div>
<strong>arr1:</strong>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">1</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">4</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">5</span>
</div>
<div>
<strong>arr2:</strong>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">10</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">20</span>
</div>
<div>
<strong>arr3:</strong>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">14</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">19</span>
</div>
</div>

<div style="background: #e7f3ff; padding: 10px; border-radius: 5px; margin: 10px 0;">
Triplet: (4, 10, 14) → min = 4, max = 14, <strong>range = 10</strong> (improved!)
</div>

---

**Step 3:** After moving arr1 pointer again

<div style="display: flex; gap: 20px; margin: 15px 0; flex-wrap: wrap;">
<div>
<strong>arr1:</strong>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">1</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">4</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">5</span>
</div>
<div>
<strong>arr2:</strong>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">10</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">20</span>
</div>
<div>
<strong>arr3:</strong>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">14</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">19</span>
</div>
</div>

<div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin: 10px 0;">
Triplet: (5, 10, 14) → min = 5, max = 14, <strong>range = 9</strong> (best!)<br>
arr1 exhausted → <strong>DONE</strong>
</div>

---

### Why Move Minimum?

Consider triplet (5, 10, 14):

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace; width: 100%;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px;">Option</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Move</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Next Value</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">New Range</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Result</th>
</tr>
<tr style="background: #d4edda;">
<td style="border: 1px solid #dee2e6; padding: 10px;">A</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">Minimum (5)</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">6, 7, 8...</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">14-6=8, 14-7=7...</td>
<td style="border: 1px solid #dee2e6; padding: 10px; color: #155724;"><strong>Decreases ✓</strong></td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px;">B</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">Maximum (14)</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">19</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">19-5=14</td>
<td style="border: 1px solid #dee2e6; padding: 10px; color: #dc3545;">Increases ✗</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px;">C</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">Middle (10)</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">20</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">20-5=15</td>
<td style="border: 1px solid #dee2e6; padding: 10px; color: #dc3545;">Increases ✗</td>
</tr>
</table>

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 8px; margin: 10px 0; text-align: center;">
<strong>Conclusion:</strong> Always move the minimum for best chance to reduce range!
</div>

---

---

## Solution Approaches

### Approach 1: Three Pointers ⭐ RECOMMENDED

**Time Complexity:** O(p + q + r) after sorting = O(max(p,q,r) log max(p,q,r))
**Space Complexity:** O(1)

**Why this is best:**
- Simple greedy approach
- Guaranteed to find optimal solution
- Linear time after sorting

---

## 📈 Complexity Comparison

```
┌─────────────────────────────┬──────────────────────────────┬──────────────┐
│         Approach            │            Time              │    Space     │
├─────────────────────────────┼──────────────────────────────┼──────────────┤
│ Three Pointers              │ O(p log p + q log q + r log r)│    O(1)     │
│ Brute Force                 │        O(p × q × r)          │    O(1)     │
└─────────────────────────────┴──────────────────────────────┴──────────────┘
```
