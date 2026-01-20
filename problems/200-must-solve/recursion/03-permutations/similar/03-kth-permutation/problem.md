<div id="viz-config" style="display:none">
{"name":"Kth Permutation Sequence","algorithm":"recursion-permutations","complexity":{"time":"O(n^2)","space":"O(n)"},"examples":[{"input":{"n":3,"k":3},"output":"213","inputRaw":"n = 3, k = 3","outputRaw":"\"213\""}]}
</div>

# Kth Permutation Sequence

**Difficulty:** Hard

## Problem Statement

The set `[1, 2, 3, ..., n]` contains a total of `n!` unique permutations.

By listing and labeling all of the permutations in order, we get the following sequence for n = 3:

1. "123"
2. "132"
3. "213"
4. "231"
5. "312"
6. "321"

Given `n` and `k`, return the `k`th permutation sequence (1-indexed).

## Examples

**Example 1:**
```
Input: n = 3, k = 3
Output: "213"
```

**Example 2:**
```
Input: n = 4, k = 9
Output: "2314"
```

**Example 3:**
```
Input: n = 3, k = 1
Output: "123"
```

## Constraints

- 1 <= n <= 9
- 1 <= k <= n!

---

## Thought Process & Pattern Recognition

### Step 1: Why Not Generate All Permutations?

**Naive approach:** Generate all permutations, sort them, return the k-th one.
- Time: O(n! * n) - way too slow for n = 9 (362,880 permutations!)

**Key insight:** We can directly calculate the k-th permutation without generating all of them.

### Step 2: Understand the Pattern

For n = 4, permutations are grouped by their first digit:
- Starting with 1: 6 permutations (3! = 6)
- Starting with 2: 6 permutations
- Starting with 3: 6 permutations
- Starting with 4: 6 permutations

**Pattern:** With n-1 remaining digits, there are (n-1)! permutations starting with each digit.

### Step 3: The Algorithm

To find the k-th permutation:
1. Determine which digit goes in position 0 using `k / (n-1)!`
2. Recurse for remaining positions with updated k
3. Convert 1-indexed k to 0-indexed for easier math

---

## Visual Diagram: Understanding the Structure

### Permutation Groups for n = 4

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 20px;">
<strong>24 Permutations of [1, 2, 3, 4] grouped by first digit</strong>
</div>

<div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 15px;">

<!-- Group 1 -->
<div style="background: #e3f2fd; padding: 15px; border-radius: 8px; min-width: 140px;">
<div style="font-weight: bold; color: #1976d2; margin-bottom: 10px; text-align: center;">Starting with 1</div>
<div style="font-size: 13px;">
1. <span style="background: #1976d2; color: white; padding: 2px 6px; border-radius: 3px;">1</span>234<br>
2. <span style="background: #1976d2; color: white; padding: 2px 6px; border-radius: 3px;">1</span>243<br>
3. <span style="background: #1976d2; color: white; padding: 2px 6px; border-radius: 3px;">1</span>324<br>
4. <span style="background: #1976d2; color: white; padding: 2px 6px; border-radius: 3px;">1</span>342<br>
5. <span style="background: #1976d2; color: white; padding: 2px 6px; border-radius: 3px;">1</span>423<br>
6. <span style="background: #1976d2; color: white; padding: 2px 6px; border-radius: 3px;">1</span>432
</div>
<div style="margin-top: 10px; font-size: 12px; color: #666; text-align: center;">k = 1 to 6</div>
</div>

<!-- Group 2 -->
<div style="background: #e8f5e9; padding: 15px; border-radius: 8px; min-width: 140px;">
<div style="font-weight: bold; color: #388e3c; margin-bottom: 10px; text-align: center;">Starting with 2</div>
<div style="font-size: 13px;">
7. <span style="background: #388e3c; color: white; padding: 2px 6px; border-radius: 3px;">2</span>134<br>
8. <span style="background: #388e3c; color: white; padding: 2px 6px; border-radius: 3px;">2</span>143<br>
<strong>9. <span style="background: #ff5722; color: white; padding: 2px 6px; border-radius: 3px;">2</span>314</strong><br>
10. <span style="background: #388e3c; color: white; padding: 2px 6px; border-radius: 3px;">2</span>341<br>
11. <span style="background: #388e3c; color: white; padding: 2px 6px; border-radius: 3px;">2</span>413<br>
12. <span style="background: #388e3c; color: white; padding: 2px 6px; border-radius: 3px;">2</span>431
</div>
<div style="margin-top: 10px; font-size: 12px; color: #666; text-align: center;">k = 7 to 12</div>
</div>

<!-- Group 3 -->
<div style="background: #fff3e0; padding: 15px; border-radius: 8px; min-width: 140px;">
<div style="font-weight: bold; color: #f57c00; margin-bottom: 10px; text-align: center;">Starting with 3</div>
<div style="font-size: 13px;">
13. <span style="background: #f57c00; color: white; padding: 2px 6px; border-radius: 3px;">3</span>124<br>
14. <span style="background: #f57c00; color: white; padding: 2px 6px; border-radius: 3px;">3</span>142<br>
15. <span style="background: #f57c00; color: white; padding: 2px 6px; border-radius: 3px;">3</span>214<br>
16. <span style="background: #f57c00; color: white; padding: 2px 6px; border-radius: 3px;">3</span>241<br>
17. <span style="background: #f57c00; color: white; padding: 2px 6px; border-radius: 3px;">3</span>412<br>
18. <span style="background: #f57c00; color: white; padding: 2px 6px; border-radius: 3px;">3</span>421
</div>
<div style="margin-top: 10px; font-size: 12px; color: #666; text-align: center;">k = 13 to 18</div>
</div>

<!-- Group 4 -->
<div style="background: #fce4ec; padding: 15px; border-radius: 8px; min-width: 140px;">
<div style="font-weight: bold; color: #c2185b; margin-bottom: 10px; text-align: center;">Starting with 4</div>
<div style="font-size: 13px;">
19. <span style="background: #c2185b; color: white; padding: 2px 6px; border-radius: 3px;">4</span>123<br>
20. <span style="background: #c2185b; color: white; padding: 2px 6px; border-radius: 3px;">4</span>132<br>
21. <span style="background: #c2185b; color: white; padding: 2px 6px; border-radius: 3px;">4</span>213<br>
22. <span style="background: #c2185b; color: white; padding: 2px 6px; border-radius: 3px;">4</span>231<br>
23. <span style="background: #c2185b; color: white; padding: 2px 6px; border-radius: 3px;">4</span>312<br>
24. <span style="background: #c2185b; color: white; padding: 2px 6px; border-radius: 3px;">4</span>321
</div>
<div style="margin-top: 10px; font-size: 12px; color: #666; text-align: center;">k = 19 to 24</div>
</div>

</div>

<div style="background: #fff3cd; padding: 10px; border-radius: 5px; margin-top: 20px; text-align: center;">
<strong>Key Insight:</strong> Each group has exactly 3! = 6 permutations<br>
To find k=9: index = (9-1) / 6 = 1, so first digit is 2
</div>

</div>

---

## Visual: Step-by-Step Calculation for n=4, k=9

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 20px;">
<strong>Finding the 9th permutation of [1, 2, 3, 4]</strong>
</div>

<!-- Initial state -->
<div style="background: #e9ecef; padding: 10px; border-radius: 5px; margin-bottom: 15px;">
<strong>Initial:</strong> available = [1, 2, 3, 4], k = 9, result = ""
<br><em>Convert to 0-indexed: k = 8</em>
</div>

<!-- Step 1 -->
<div style="margin: 15px 0; padding: 15px; border-left: 4px solid #007bff; background: #e7f1ff;">
<strong>Step 1: Position 0</strong>
<div style="margin: 10px 0;">
<span style="background: #007bff; color: white; padding: 4px 10px; border-radius: 4px;">Block size = 3! = 6</span>
</div>

<div style="margin: 10px 0;">
<strong>Calculation:</strong> index = k / 6 = 8 / 6 = <strong>1</strong>
</div>

<div style="display: flex; gap: 10px; margin: 10px 0;">
  <span style="padding: 8px 15px; background: #e9ecef; border-radius: 5px;">1</span>
  <span style="padding: 8px 15px; background: #28a745; color: white; border-radius: 5px; font-weight: bold;">2</span>
  <span style="padding: 8px 15px; background: #e9ecef; border-radius: 5px;">3</span>
  <span style="padding: 8px 15px; background: #e9ecef; border-radius: 5px;">4</span>
</div>

<div style="margin-top: 10px;">
<strong>Pick:</strong> available[1] = <span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 3px;">2</span><br>
<strong>Update:</strong> k = 8 % 6 = <strong>2</strong>, available = [1, 3, 4], result = "2"
</div>
</div>

<!-- Step 2 -->
<div style="margin: 15px 0; padding: 15px; border-left: 4px solid #17a2b8; background: #e3f2fd;">
<strong>Step 2: Position 1</strong>
<div style="margin: 10px 0;">
<span style="background: #17a2b8; color: white; padding: 4px 10px; border-radius: 4px;">Block size = 2! = 2</span>
</div>

<div style="margin: 10px 0;">
<strong>Calculation:</strong> index = k / 2 = 2 / 2 = <strong>1</strong>
</div>

<div style="display: flex; gap: 10px; margin: 10px 0;">
  <span style="padding: 8px 15px; background: #e9ecef; border-radius: 5px;">1</span>
  <span style="padding: 8px 15px; background: #17a2b8; color: white; border-radius: 5px; font-weight: bold;">3</span>
  <span style="padding: 8px 15px; background: #e9ecef; border-radius: 5px;">4</span>
</div>

<div style="margin-top: 10px;">
<strong>Pick:</strong> available[1] = <span style="background: #17a2b8; color: white; padding: 2px 8px; border-radius: 3px;">3</span><br>
<strong>Update:</strong> k = 2 % 2 = <strong>0</strong>, available = [1, 4], result = "23"
</div>
</div>

<!-- Step 3 -->
<div style="margin: 15px 0; padding: 15px; border-left: 4px solid #fd7e14; background: #fff3e0;">
<strong>Step 3: Position 2</strong>
<div style="margin: 10px 0;">
<span style="background: #fd7e14; color: white; padding: 4px 10px; border-radius: 4px;">Block size = 1! = 1</span>
</div>

<div style="margin: 10px 0;">
<strong>Calculation:</strong> index = k / 1 = 0 / 1 = <strong>0</strong>
</div>

<div style="display: flex; gap: 10px; margin: 10px 0;">
  <span style="padding: 8px 15px; background: #fd7e14; color: white; border-radius: 5px; font-weight: bold;">1</span>
  <span style="padding: 8px 15px; background: #e9ecef; border-radius: 5px;">4</span>
</div>

<div style="margin-top: 10px;">
<strong>Pick:</strong> available[0] = <span style="background: #fd7e14; color: white; padding: 2px 8px; border-radius: 3px;">1</span><br>
<strong>Update:</strong> k = 0 % 1 = <strong>0</strong>, available = [4], result = "231"
</div>
</div>

<!-- Step 4 -->
<div style="margin: 15px 0; padding: 15px; border-left: 4px solid #6f42c1; background: #f3e5f5;">
<strong>Step 4: Position 3</strong>
<div style="margin: 10px 0;">
<span style="background: #6f42c1; color: white; padding: 4px 10px; border-radius: 4px;">Block size = 0! = 1</span>
</div>

<div style="margin: 10px 0;">
<strong>Calculation:</strong> index = k / 1 = 0 / 1 = <strong>0</strong>
</div>

<div style="display: flex; gap: 10px; margin: 10px 0;">
  <span style="padding: 8px 15px; background: #6f42c1; color: white; border-radius: 5px; font-weight: bold;">4</span>
</div>

<div style="margin-top: 10px;">
<strong>Pick:</strong> available[0] = <span style="background: #6f42c1; color: white; padding: 2px 8px; border-radius: 3px;">4</span><br>
<strong>Final:</strong> result = "2314"
</div>
</div>

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; text-align: center;">
<strong>Answer: "2314"</strong><br>
The 9th permutation of [1, 2, 3, 4]
</div>

</div>

---

## Visual: The Recursion Tree

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 15px;">
<strong>Recursion Tree for n=4, k=9</strong>
</div>

<div style="text-align: center;">

<!-- Level 0 -->
<div style="display: inline-block; padding: 10px 20px; background: #007bff; color: white; border-radius: 8px; margin: 10px;">
n=4, k=8<br>
pick(8/6=1)=2
</div>

<div style="text-align: center;">|</div>

<!-- Level 1 -->
<div style="display: inline-block; padding: 10px 20px; background: #17a2b8; color: white; border-radius: 8px; margin: 10px;">
n=3, k=2<br>
pick(2/2=1)=3
</div>

<div style="text-align: center;">|</div>

<!-- Level 2 -->
<div style="display: inline-block; padding: 10px 20px; background: #fd7e14; color: white; border-radius: 8px; margin: 10px;">
n=2, k=0<br>
pick(0/1=0)=1
</div>

<div style="text-align: center;">|</div>

<!-- Level 3 -->
<div style="display: inline-block; padding: 10px 20px; background: #6f42c1; color: white; border-radius: 8px; margin: 10px;">
n=1, k=0<br>
pick(0/1=0)=4
</div>

<div style="text-align: center;">|</div>

<!-- Result -->
<div style="display: inline-block; padding: 10px 20px; background: #28a745; color: white; border-radius: 8px; margin: 10px;">
<strong>Result: "2314"</strong>
</div>

</div>

</div>

---

## Solution Approach

### Factorial Number System / Direct Calculation

| Metric | Value |
|--------|-------|
| Time Complexity | O(n^2) |
| Space Complexity | O(n) |

**Why O(n^2)?**
- n iterations to pick each digit
- Each iteration may take O(n) to remove from available list

**Algorithm:**
1. Precompute factorials: `[1, 1, 2, 6, 24, ...]`
2. Create list of available digits: `[1, 2, ..., n]`
3. Convert k to 0-indexed: `k = k - 1`
4. For each position:
   - `index = k / factorial[remaining - 1]`
   - Pick `available[index]`, remove it
   - `k = k % factorial[remaining - 1]`

---

## Key Formula

<div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">

**For position i (0-indexed):**

```
index = k / (n - 1 - i)!
k = k % (n - 1 - i)!
```

**Where:**
- `index` tells us which available digit to pick
- Updated `k` tells us which permutation within that group

</div>

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Generate all perms | O(n! * n) | O(n!) |
| Direct calculation | O(n^2) | O(n) |
| With balanced BST | O(n log n) | O(n) |

**Trade-off:** Direct calculation is much faster for large n because we don't generate unnecessary permutations.
