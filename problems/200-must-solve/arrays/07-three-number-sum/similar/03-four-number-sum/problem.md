# Four Number Sum

**Difficulty:** Hard (Red)

## Problem Statement

Find all unique quadruplets in the array that sum to a target value.

## Examples

**Example 1:**
```
Input: array = [7, 6, 4, -1, 1, 2], target = 16
Output: [[7, 6, 4, -1], [7, 6, 1, 2]]
```

**Example 2:**
```
Input: array = [1, 0, -1, 0, -2, 2], target = 0
Output: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
```

## Constraints

- 4 <= array.length <= 200
- -10^9 <= array[i] <= 10^9
- Each quadruplet should be unique

---

## 🧠 Thought Process & Pattern Recognition

<details>
<summary><strong>Click to reveal thinking pattern</strong></summary>

### Step 1: Relate to Known Problems
**Question:** "How is this similar to Three Sum?"

Four Sum = Three Sum + One More Loop
- Three Sum: Fix one, two-pointer for remaining two
- Four Sum: Fix two, two-pointer for remaining two

### Step 2: Identify the Pattern
**Key insight:** Reduce 4-Sum to 2-Sum using two nested loops:
1. Fix first number (outer loop)
2. Fix second number (inner loop)
3. Two pointers for third and fourth

### Step 3: Handle Duplicates
Sort first, then skip duplicate values at each level:
```
for i in range(n-3):
    if i > 0 and nums[i] == nums[i-1]: continue  # Skip duplicate first
    for j in range(i+1, n-2):
        if j > i+1 and nums[j] == nums[j-1]: continue  # Skip duplicate second
        # Two pointer for remaining...
```

### Step 4: Alternative - HashMap Approach
Store all pair sums, then look for complement pairs:
- Time: O(n²) average
- Space: O(n²) for storing pairs

</details>

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>array = [7, 6, 4, -1, 1, 2]</code><br>
<code>target = 16</code><br>
<code>After sorting: [-1, 1, 2, 4, 6, 7]</code>
</div>

---

### Two Pointers Approach (O(n^3))

**Step 1:** Fix i=0 (-1), Fix j=1 (1), Two pointers for remaining

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">-1 (i)</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">1 (j)</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">2 (L)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">6</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">7 (R)</span>
</div>

<div style="background: #fff3cd; color: #856404; padding: 10px; border-radius: 5px; margin: 10px 0;">
Need: L + R = 16 - (-1) - 1 = 16<br>
Current: 2 + 7 = 9 < 16 → Move L right
</div>

---

### Finding First Quadruplet

**Fix i=0 (-1), Fix j=3 (4):**

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">-1 (i)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">4 (j)</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">6 (L)</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">7 (R)</span>
</div>

<div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin: 10px 0;">
Need: L + R = 16 - (-1) - 4 = 13<br>
Check: 6 + 7 = 13 = 13 ✓ MATCH!<br>
<strong>Quadruplet found: [-1, 4, 6, 7]</strong>
</div>

---

### Finding Second Quadruplet

**Fix i=1 (1), Fix j=2 (2):**

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">-1</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">1 (i)</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2 (j)</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">4 (L)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">6</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">7 (R)</span>
</div>

<div style="background: #fff3cd; color: #856404; padding: 10px; border-radius: 5px; margin: 10px 0;">
Need: L + R = 16 - 1 - 2 = 13<br>
Check: 4 + 7 = 11 < 13 → Move L
</div>

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">-1</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">1 (i)</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2 (j)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">6 (L)</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">7 (R)</span>
</div>

<div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin: 10px 0;">
Check: 6 + 7 = 13 = 13 ✓ MATCH!<br>
<strong>Quadruplet found: [1, 2, 6, 7]</strong>
</div>

---

### HashMap Approach (O(n^2) average)

**Phase 1:** Build pair sums hash

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px;">Sum</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Pairs</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">6</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">[(-1, 7)]</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">5</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">[(-1, 6)]</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;">3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #d4edda;">[(-1, 4)]</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">8</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">[(1, 7)]</td>
</tr>
</table>

**Phase 2:** For pair (6, 7), sum = 13

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
Need complement: 16 - 13 = <strong>3</strong><br>
Check pairSums[3] = [(-1, 4)] ✓<br>
<strong>Quadruplet: [-1, 4, 6, 7]</strong>
</div>

---

---

## Solution Approaches

### Approach 1: Two Nested Loops + Two Pointers ⭐ RECOMMENDED

**Time Complexity:** O(n³)
**Space Complexity:** O(k) where k is number of quadruplets

**Why this is best:**
- Simple to understand
- Guaranteed to find all solutions
- Lower space than hashmap approach

### Approach 2: HashMap for Pairs

**Time Complexity:** O(n²) average
**Space Complexity:** O(n²)

**When to use:**
- When average case performance matters more
- When n is very large

---

## 📈 Complexity Comparison

```
┌─────────────────────────────┬──────────────┬──────────────┬────────────────┐
│         Approach            │     Time     │    Space     │  Recommendation │
├─────────────────────────────┼──────────────┼──────────────┼────────────────┤
│ Two Loops + Two Pointers    │    O(n³)     │    O(k)      │  ⭐ BEST       │
│ HashMap Pairs               │ O(n²) avg    │    O(n²)     │  ✓ Large n     │
└─────────────────────────────┴──────────────┴──────────────┴────────────────┘
```
