# Permutations with Duplicates

**Difficulty:** Medium

## Problem Statement

Given an array of numbers that may contain duplicates, return all possible unique permutations in any order.

Unlike the basic permutations problem where all elements are unique, this problem requires handling duplicate elements to avoid generating duplicate permutations.

## Examples

**Example 1:**
```
Input: nums = [1, 1, 2]
Output: [[1, 1, 2], [1, 2, 1], [2, 1, 1]]
```

**Example 2:**
```
Input: nums = [1, 2, 3]
Output: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
```

**Example 3:**
```
Input: nums = [1, 1, 1]
Output: [[1, 1, 1]]
```

## Constraints

- 1 <= nums.length <= 8
- -10 <= nums[i] <= 10

---

## Thought Process & Pattern Recognition

### Step 1: Understand Why Duplicates Matter

**Question to ask yourself:** "What happens if we use the standard permutation algorithm?"

With input `[1, 1, 2]`, naive approach generates:
- Treating first `1` and second `1` as different would give duplicates

**Key Insight:** When we have duplicate values, swapping them creates the same permutation visually but our algorithm sees them as different.

### Step 2: Identify the Pattern

**The Deduplication Strategy:**
1. **Sort the array first** - brings duplicates together
2. **Skip duplicates at the same recursion level** - if we already used value X at this position, don't use another X

### Step 3: Choose the Right Approach

**Best approach:** Sort + Skip duplicates with `used` array
- Sort to group duplicates together
- Only use a duplicate if the previous duplicate was already used
- This ensures we use duplicates in order, preventing duplicate permutations

---

## Visual Diagram: Recursion Tree

### Why Naive Approach Fails

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 15px;">
<strong>Input: [1, 1, 2] - Naive approach (WRONG)</strong>
</div>

<!-- Level 0 -->
<div style="display: flex; justify-content: center; margin: 10px 0;">
  <div style="background: #dc3545; color: white; padding: 10px 20px; border-radius: 8px; font-weight: bold;">
    Start: []
  </div>
</div>

<div style="text-align: center; font-size: 12px; color: #6c757d; margin: 5px 0;">Pick first element</div>

<!-- Level 1 -->
<div style="display: flex; justify-content: center; gap: 20px; margin: 10px 0;">
  <div style="background: #fd7e14; color: white; padding: 8px 16px; border-radius: 8px;">[1<sub>a</sub>]</div>
  <div style="background: #fd7e14; color: white; padding: 8px 16px; border-radius: 8px;">[1<sub>b</sub>]</div>
  <div style="background: #28a745; color: white; padding: 8px 16px; border-radius: 8px;">[2]</div>
</div>

<div style="text-align: center; font-size: 12px; color: #6c757d; margin: 5px 0;">Both 1's treated as different!</div>

<!-- Problem illustration -->
<div style="display: flex; justify-content: center; gap: 10px; margin: 15px 0; flex-wrap: wrap;">
  <div style="background: #ffc107; padding: 6px 12px; border-radius: 6px; font-size: 14px;">[1<sub>a</sub>, 1<sub>b</sub>, 2]</div>
  <div style="background: #ffc107; padding: 6px 12px; border-radius: 6px; font-size: 14px;">[1<sub>b</sub>, 1<sub>a</sub>, 2]</div>
</div>

<div style="background: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; margin-top: 15px; text-align: center;">
<strong>Problem:</strong> [1, 1, 2] appears TWICE!<br>
These are the same permutation but we generated it twice.
</div>

</div>

### Correct Approach: Sort + Skip Duplicates

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 15px;">
<strong>Input: [1, 1, 2] (sorted) - With Deduplication</strong>
</div>

<!-- Algorithm steps -->
<div style="background: #e9ecef; padding: 10px; border-radius: 5px; margin-bottom: 15px;">
<strong>Rule:</strong> For duplicates, only use nums[i] if nums[i-1] is already used
</div>

<!-- Level 0 -->
<div style="display: flex; justify-content: center; margin: 10px 0;">
  <div style="background: #007bff; color: white; padding: 10px 20px; border-radius: 8px; font-weight: bold;">
    perm = []
  </div>
</div>

<!-- Level 1 -->
<div style="text-align: center; font-size: 12px; color: #6c757d; margin: 10px 0;">Position 0: Try each unique value</div>

<div style="display: flex; justify-content: center; gap: 40px; margin: 10px 0;">
  <div style="text-align: center;">
    <div style="background: #28a745; color: white; padding: 8px 16px; border-radius: 8px;">[1]</div>
    <div style="font-size: 11px; color: #28a745; margin-top: 5px;">Use first 1</div>
  </div>
  <div style="text-align: center;">
    <div style="background: #dc3545; color: white; padding: 8px 16px; border-radius: 8px; text-decoration: line-through;">[1]</div>
    <div style="font-size: 11px; color: #dc3545; margin-top: 5px;">Skip! Same as prev</div>
  </div>
  <div style="text-align: center;">
    <div style="background: #28a745; color: white; padding: 8px 16px; border-radius: 8px;">[2]</div>
    <div style="font-size: 11px; color: #28a745; margin-top: 5px;">Use 2</div>
  </div>
</div>

<!-- Level 2 from [1] -->
<div style="text-align: center; font-size: 12px; color: #6c757d; margin: 15px 0;">From [1], position 1:</div>

<div style="display: flex; justify-content: center; gap: 30px; margin: 10px 0;">
  <div style="text-align: center;">
    <div style="background: #17a2b8; color: white; padding: 8px 16px; border-radius: 8px;">[1, 1]</div>
    <div style="font-size: 11px; color: #17a2b8; margin-top: 5px;">Use second 1</div>
  </div>
  <div style="text-align: center;">
    <div style="background: #17a2b8; color: white; padding: 8px 16px; border-radius: 8px;">[1, 2]</div>
    <div style="font-size: 11px; color: #17a2b8; margin-top: 5px;">Use 2</div>
  </div>
</div>

<!-- Final results -->
<div style="margin-top: 20px;">
<div style="background: #e9ecef; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
<strong>Final Unique Permutations:</strong>
</div>
<div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
  <div style="background: #28a745; color: white; padding: 8px 16px; border-radius: 5px;">[1, 1, 2]</div>
  <div style="background: #28a745; color: white; padding: 8px 16px; border-radius: 5px;">[1, 2, 1]</div>
  <div style="background: #28a745; color: white; padding: 8px 16px; border-radius: 5px;">[2, 1, 1]</div>
</div>
</div>

<div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin-top: 15px; text-align: center;">
<strong>Result:</strong> 3 unique permutations (not 6!)
</div>

</div>

---

## Visual: Backtracking with Used Array

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 15px;">
<strong>Tracking State: nums = [1, 1, 2], used = [F, F, F]</strong>
</div>

<!-- Step 1 -->
<div style="margin: 15px 0; padding: 10px; border-left: 4px solid #007bff;">
<strong>Step 1:</strong> Pick index 0 (value 1)
<div style="display: flex; gap: 20px; margin-top: 10px; align-items: center;">
  <div>
    <div style="font-size: 12px; color: #666;">nums:</div>
    <div style="display: flex; gap: 5px;">
      <span style="background: #28a745; color: white; padding: 4px 10px; border-radius: 4px;">1</span>
      <span style="background: #e9ecef; padding: 4px 10px; border-radius: 4px;">1</span>
      <span style="background: #e9ecef; padding: 4px 10px; border-radius: 4px;">2</span>
    </div>
  </div>
  <div>
    <div style="font-size: 12px; color: #666;">used:</div>
    <div style="display: flex; gap: 5px;">
      <span style="background: #28a745; color: white; padding: 4px 10px; border-radius: 4px;">T</span>
      <span style="background: #e9ecef; padding: 4px 10px; border-radius: 4px;">F</span>
      <span style="background: #e9ecef; padding: 4px 10px; border-radius: 4px;">F</span>
    </div>
  </div>
  <div>perm: <strong>[1]</strong></div>
</div>
</div>

<!-- Step 2 -->
<div style="margin: 15px 0; padding: 10px; border-left: 4px solid #17a2b8;">
<strong>Step 2:</strong> Pick index 1 (value 1) - OK because used[0]=T
<div style="display: flex; gap: 20px; margin-top: 10px; align-items: center;">
  <div>
    <div style="font-size: 12px; color: #666;">nums:</div>
    <div style="display: flex; gap: 5px;">
      <span style="background: #28a745; color: white; padding: 4px 10px; border-radius: 4px;">1</span>
      <span style="background: #17a2b8; color: white; padding: 4px 10px; border-radius: 4px;">1</span>
      <span style="background: #e9ecef; padding: 4px 10px; border-radius: 4px;">2</span>
    </div>
  </div>
  <div>
    <div style="font-size: 12px; color: #666;">used:</div>
    <div style="display: flex; gap: 5px;">
      <span style="background: #28a745; color: white; padding: 4px 10px; border-radius: 4px;">T</span>
      <span style="background: #17a2b8; color: white; padding: 4px 10px; border-radius: 4px;">T</span>
      <span style="background: #e9ecef; padding: 4px 10px; border-radius: 4px;">F</span>
    </div>
  </div>
  <div>perm: <strong>[1, 1]</strong></div>
</div>
</div>

<!-- Step 3 -->
<div style="margin: 15px 0; padding: 10px; border-left: 4px solid #ffc107;">
<strong>Step 3:</strong> Pick index 2 (value 2) - Complete!
<div style="display: flex; gap: 20px; margin-top: 10px; align-items: center;">
  <div>
    <div style="font-size: 12px; color: #666;">nums:</div>
    <div style="display: flex; gap: 5px;">
      <span style="background: #28a745; color: white; padding: 4px 10px; border-radius: 4px;">1</span>
      <span style="background: #17a2b8; color: white; padding: 4px 10px; border-radius: 4px;">1</span>
      <span style="background: #ffc107; color: black; padding: 4px 10px; border-radius: 4px;">2</span>
    </div>
  </div>
  <div>
    <div style="font-size: 12px; color: #666;">used:</div>
    <div style="display: flex; gap: 5px;">
      <span style="background: #28a745; color: white; padding: 4px 10px; border-radius: 4px;">T</span>
      <span style="background: #17a2b8; color: white; padding: 4px 10px; border-radius: 4px;">T</span>
      <span style="background: #ffc107; color: black; padding: 4px 10px; border-radius: 4px;">T</span>
    </div>
  </div>
  <div>perm: <strong>[1, 1, 2]</strong> - ADD TO RESULT!</div>
</div>
</div>

<!-- Backtrack -->
<div style="margin: 15px 0; padding: 10px; border-left: 4px solid #dc3545;">
<strong>Backtrack:</strong> Remove 2, try other options...
<div style="font-size: 12px; color: #dc3545; margin-top: 5px;">Continue exploring other branches</div>
</div>

</div>

---

## The Key Skip Condition

<div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">

**Skip Condition Explained:**

```python
if i > 0 and nums[i] == nums[i-1] and not used[i-1]:
    continue  # Skip this duplicate
```

**Why this works:**
- `nums[i] == nums[i-1]`: Current element is same as previous
- `not used[i-1]`: Previous duplicate is NOT in current permutation
- This means we're trying to use a later duplicate before an earlier one
- **Skip it!** - We should use duplicates in order (left to right)

</div>

---

## Solution Approaches

### Approach 1: Sort + Used Array (Recommended)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n! * n) |
| Space Complexity | O(n) |

**Why this is best:**
- Clean deduplication logic
- Easy to understand and debug
- Works for any comparable elements

### Approach 2: Counter/Frequency Map

| Metric | Value |
|--------|-------|
| Time Complexity | O(n! * n) |
| Space Complexity | O(n) |

**When to use:** When elements aren't easily sortable or you want to avoid sorting.

---

## Complexity Analysis

| Aspect | With Duplicates | Without Duplicates |
|--------|-----------------|-------------------|
| Unique Perms of [1,1,2] | 3 | 6 |
| Unique Perms of [1,1,1] | 1 | 6 |
| Formula | n! / (d1! * d2! * ...) | n! |

Where `d1, d2, ...` are frequencies of each duplicate value.
