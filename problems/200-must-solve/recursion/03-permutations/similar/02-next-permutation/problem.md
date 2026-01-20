<div id="viz-config" style="display:none">
{"name":"Next Permutation","algorithm":"recursion-permutations","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"nums":[1,2,3]},"output":[1,3,2],"inputRaw":"nums = [1, 2, 3]","outputRaw":"[1, 3, 2]"}]}
</div>

# Next Permutation

**Difficulty:** Medium

## Problem Statement

A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

The **next permutation** of an array of integers is the next lexicographically greater permutation of its integer. If the array is already at its largest permutation, rearrange it to the smallest permutation (sorted in ascending order).

The replacement must be in place and use only constant extra memory.

## Examples

**Example 1:**
```
Input: nums = [1, 2, 3]
Output: [1, 3, 2]
Explanation: The next permutation of [1,2,3] is [1,3,2]
```

**Example 2:**
```
Input: nums = [3, 2, 1]
Output: [1, 2, 3]
Explanation: [3,2,1] is the largest permutation, so we return the smallest: [1,2,3]
```

**Example 3:**
```
Input: nums = [1, 1, 5]
Output: [1, 5, 1]
```

**Example 4:**
```
Input: nums = [1, 3, 2]
Output: [2, 1, 3]
```

## Constraints

- 1 <= nums.length <= 100
- 0 <= nums[i] <= 100

---

## Thought Process & Pattern Recognition

### Step 1: Understand Lexicographic Order

**Question to ask yourself:** "What makes one permutation 'greater' than another?"

Lexicographic order is like dictionary order:
- [1, 2, 3] < [1, 3, 2] (at position 1: 2 < 3)
- [1, 3, 2] < [2, 1, 3] (at position 0: 1 < 2)
- [3, 2, 1] is largest (descending order)

### Step 2: Find the Pattern

**Key Observation:**
- If suffix is descending, it's already at its local maximum
- We need to find the rightmost position that can be increased
- Then make the smallest possible increase

### Step 3: The Algorithm

1. **Find pivot:** Scan right-to-left, find first element where `nums[i] < nums[i+1]`
2. **Find successor:** Find smallest element greater than pivot (in the suffix)
3. **Swap:** Exchange pivot with successor
4. **Reverse suffix:** Make suffix smallest by reversing (it's still descending after swap)

---

## Visual Diagram: Algorithm Steps

### Complete Example: [1, 5, 8, 4, 7, 6, 5, 3, 1]

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 20px;">
<strong>Finding Next Permutation</strong>
</div>

<!-- Step 1: Find Pivot -->
<div style="margin: 20px 0; padding: 15px; border-left: 4px solid #007bff; background: #e7f1ff;">
<strong>Step 1: Find the Pivot</strong>
<div style="font-size: 13px; color: #555; margin: 5px 0;">Scan right-to-left, find first i where nums[i] < nums[i+1]</div>

<div style="display: flex; gap: 5px; margin: 15px 0; justify-content: center;">
  <span style="padding: 10px 15px; background: #6c757d; color: white; border-radius: 5px;">1</span>
  <span style="padding: 10px 15px; background: #6c757d; color: white; border-radius: 5px;">5</span>
  <span style="padding: 10px 15px; background: #6c757d; color: white; border-radius: 5px;">8</span>
  <span style="padding: 10px 15px; background: #dc3545; color: white; border-radius: 5px; border: 3px solid #000;"><strong>4</strong></span>
  <span style="padding: 10px 15px; background: #ffc107; color: black; border-radius: 5px;">7</span>
  <span style="padding: 10px 15px; background: #ffc107; color: black; border-radius: 5px;">6</span>
  <span style="padding: 10px 15px; background: #ffc107; color: black; border-radius: 5px;">5</span>
  <span style="padding: 10px 15px; background: #ffc107; color: black; border-radius: 5px;">3</span>
  <span style="padding: 10px 15px; background: #ffc107; color: black; border-radius: 5px;">1</span>
</div>

<div style="display: flex; gap: 5px; justify-content: center; font-size: 12px;">
  <span style="width: 42px; text-align: center;">0</span>
  <span style="width: 42px; text-align: center;">1</span>
  <span style="width: 42px; text-align: center;">2</span>
  <span style="width: 42px; text-align: center;"><strong>3</strong></span>
  <span style="width: 42px; text-align: center;">4</span>
  <span style="width: 42px; text-align: center;">5</span>
  <span style="width: 42px; text-align: center;">6</span>
  <span style="width: 42px; text-align: center;">7</span>
  <span style="width: 42px; text-align: center;">8</span>
</div>

<div style="margin-top: 10px; font-size: 13px;">
  <span style="background: #dc3545; color: white; padding: 2px 8px; border-radius: 3px;">Pivot = 4</span> at index 3
  <span style="background: #ffc107; color: black; padding: 2px 8px; border-radius: 3px; margin-left: 10px;">Suffix is descending: [7,6,5,3,1]</span>
</div>
</div>

<!-- Step 2: Find Successor -->
<div style="margin: 20px 0; padding: 15px; border-left: 4px solid #28a745; background: #e8f5e9;">
<strong>Step 2: Find the Successor</strong>
<div style="font-size: 13px; color: #555; margin: 5px 0;">Find smallest element in suffix that is greater than pivot (4)</div>

<div style="display: flex; gap: 5px; margin: 15px 0; justify-content: center;">
  <span style="padding: 10px 15px; background: #6c757d; color: white; border-radius: 5px;">1</span>
  <span style="padding: 10px 15px; background: #6c757d; color: white; border-radius: 5px;">5</span>
  <span style="padding: 10px 15px; background: #6c757d; color: white; border-radius: 5px;">8</span>
  <span style="padding: 10px 15px; background: #dc3545; color: white; border-radius: 5px;"><strong>4</strong></span>
  <span style="padding: 10px 15px; background: #e9ecef; color: #999; border-radius: 5px;">7</span>
  <span style="padding: 10px 15px; background: #e9ecef; color: #999; border-radius: 5px;">6</span>
  <span style="padding: 10px 15px; background: #28a745; color: white; border-radius: 5px; border: 3px solid #000;"><strong>5</strong></span>
  <span style="padding: 10px 15px; background: #e9ecef; color: #999; border-radius: 5px;">3</span>
  <span style="padding: 10px 15px; background: #e9ecef; color: #999; border-radius: 5px;">1</span>
</div>

<div style="margin-top: 10px; font-size: 13px;">
  Checking from right: 1 < 4, 3 < 4, <span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 3px;">5 > 4</span> Found!
</div>
</div>

<!-- Step 3: Swap -->
<div style="margin: 20px 0; padding: 15px; border-left: 4px solid #fd7e14; background: #fff3e0;">
<strong>Step 3: Swap Pivot and Successor</strong>

<div style="display: flex; align-items: center; justify-content: center; gap: 30px; margin: 15px 0;">
  <div>
    <div style="font-size: 12px; color: #666; margin-bottom: 5px;">Before:</div>
    <div style="display: flex; gap: 5px;">
      <span style="padding: 8px 12px; background: #6c757d; color: white; border-radius: 5px;">1</span>
      <span style="padding: 8px 12px; background: #6c757d; color: white; border-radius: 5px;">5</span>
      <span style="padding: 8px 12px; background: #6c757d; color: white; border-radius: 5px;">8</span>
      <span style="padding: 8px 12px; background: #dc3545; color: white; border-radius: 5px;">4</span>
      <span style="padding: 8px 12px; background: #ffc107; color: black; border-radius: 5px;">7</span>
      <span style="padding: 8px 12px; background: #ffc107; color: black; border-radius: 5px;">6</span>
      <span style="padding: 8px 12px; background: #28a745; color: white; border-radius: 5px;">5</span>
      <span style="padding: 8px 12px; background: #ffc107; color: black; border-radius: 5px;">3</span>
      <span style="padding: 8px 12px; background: #ffc107; color: black; border-radius: 5px;">1</span>
    </div>
  </div>
  <div style="font-size: 24px;">&#8594;</div>
  <div>
    <div style="font-size: 12px; color: #666; margin-bottom: 5px;">After swap:</div>
    <div style="display: flex; gap: 5px;">
      <span style="padding: 8px 12px; background: #6c757d; color: white; border-radius: 5px;">1</span>
      <span style="padding: 8px 12px; background: #6c757d; color: white; border-radius: 5px;">5</span>
      <span style="padding: 8px 12px; background: #6c757d; color: white; border-radius: 5px;">8</span>
      <span style="padding: 8px 12px; background: #28a745; color: white; border-radius: 5px;">5</span>
      <span style="padding: 8px 12px; background: #ffc107; color: black; border-radius: 5px;">7</span>
      <span style="padding: 8px 12px; background: #ffc107; color: black; border-radius: 5px;">6</span>
      <span style="padding: 8px 12px; background: #dc3545; color: white; border-radius: 5px;">4</span>
      <span style="padding: 8px 12px; background: #ffc107; color: black; border-radius: 5px;">3</span>
      <span style="padding: 8px 12px; background: #ffc107; color: black; border-radius: 5px;">1</span>
    </div>
  </div>
</div>

<div style="margin-top: 10px; font-size: 13px;">
  Note: Suffix [7, 6, 4, 3, 1] is still descending!
</div>
</div>

<!-- Step 4: Reverse Suffix -->
<div style="margin: 20px 0; padding: 15px; border-left: 4px solid #17a2b8; background: #e3f2fd;">
<strong>Step 4: Reverse the Suffix</strong>
<div style="font-size: 13px; color: #555; margin: 5px 0;">To make suffix smallest, reverse it (converts descending to ascending)</div>

<div style="display: flex; align-items: center; justify-content: center; gap: 30px; margin: 15px 0;">
  <div>
    <div style="font-size: 12px; color: #666; margin-bottom: 5px;">Before reverse:</div>
    <div style="display: flex; gap: 5px;">
      <span style="padding: 8px 12px; background: #6c757d; color: white; border-radius: 5px;">1</span>
      <span style="padding: 8px 12px; background: #6c757d; color: white; border-radius: 5px;">5</span>
      <span style="padding: 8px 12px; background: #6c757d; color: white; border-radius: 5px;">8</span>
      <span style="padding: 8px 12px; background: #28a745; color: white; border-radius: 5px;">5</span>
      <span style="padding: 8px 12px; background: #17a2b8; color: white; border-radius: 5px;">7</span>
      <span style="padding: 8px 12px; background: #17a2b8; color: white; border-radius: 5px;">6</span>
      <span style="padding: 8px 12px; background: #17a2b8; color: white; border-radius: 5px;">4</span>
      <span style="padding: 8px 12px; background: #17a2b8; color: white; border-radius: 5px;">3</span>
      <span style="padding: 8px 12px; background: #17a2b8; color: white; border-radius: 5px;">1</span>
    </div>
  </div>
  <div style="font-size: 24px;">&#8594;</div>
  <div>
    <div style="font-size: 12px; color: #666; margin-bottom: 5px;">Final result:</div>
    <div style="display: flex; gap: 5px;">
      <span style="padding: 8px 12px; background: #6c757d; color: white; border-radius: 5px;">1</span>
      <span style="padding: 8px 12px; background: #6c757d; color: white; border-radius: 5px;">5</span>
      <span style="padding: 8px 12px; background: #6c757d; color: white; border-radius: 5px;">8</span>
      <span style="padding: 8px 12px; background: #28a745; color: white; border-radius: 5px;">5</span>
      <span style="padding: 8px 12px; background: #17a2b8; color: white; border-radius: 5px;">1</span>
      <span style="padding: 8px 12px; background: #17a2b8; color: white; border-radius: 5px;">3</span>
      <span style="padding: 8px 12px; background: #17a2b8; color: white; border-radius: 5px;">4</span>
      <span style="padding: 8px 12px; background: #17a2b8; color: white; border-radius: 5px;">6</span>
      <span style="padding: 8px 12px; background: #17a2b8; color: white; border-radius: 5px;">7</span>
    </div>
  </div>
</div>
</div>

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; text-align: center;">
<strong>Result: [1, 5, 8, 5, 1, 3, 4, 6, 7]</strong><br>
This is the next lexicographically greater permutation!
</div>

</div>

---

## Visual: Edge Case - Already Maximum

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 15px;">
<strong>Input: [3, 2, 1] - Already the largest permutation</strong>
</div>

<!-- Step 1 -->
<div style="margin: 15px 0; padding: 10px; border-left: 4px solid #dc3545; background: #f8d7da;">
<strong>Step 1: Find Pivot</strong>
<div style="display: flex; gap: 5px; margin: 10px 0; justify-content: center;">
  <span style="padding: 10px 20px; background: #dc3545; color: white; border-radius: 5px;">3</span>
  <span style="padding: 10px 20px; background: #dc3545; color: white; border-radius: 5px;">2</span>
  <span style="padding: 10px 20px; background: #dc3545; color: white; border-radius: 5px;">1</span>
</div>
<div style="font-size: 13px;">
  Entire array is descending - <strong>No pivot found!</strong><br>
  This means the array is the largest permutation.
</div>
</div>

<!-- Result -->
<div style="margin: 15px 0; padding: 10px; border-left: 4px solid #28a745; background: #d4edda;">
<strong>Action: Reverse entire array</strong>
<div style="display: flex; gap: 5px; margin: 10px 0; justify-content: center;">
  <span style="padding: 10px 20px; background: #28a745; color: white; border-radius: 5px;">1</span>
  <span style="padding: 10px 20px; background: #28a745; color: white; border-radius: 5px;">2</span>
  <span style="padding: 10px 20px; background: #28a745; color: white; border-radius: 5px;">3</span>
</div>
<div style="font-size: 13px;">
  Wrap around to the smallest permutation: [1, 2, 3]
</div>
</div>

</div>

---

## Visual: Simple Example Step-by-Step

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 15px;">
<strong>Input: [1, 3, 2]</strong>
</div>

<div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px;">

<!-- Step 1 -->
<div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); min-width: 200px;">
<div style="font-weight: bold; color: #007bff; margin-bottom: 10px;">1. Find Pivot</div>
<div style="display: flex; gap: 5px; justify-content: center; margin: 10px 0;">
  <span style="padding: 8px 15px; background: #dc3545; color: white; border-radius: 5px;"><strong>1</strong></span>
  <span style="padding: 8px 15px; background: #ffc107; color: black; border-radius: 5px;">3</span>
  <span style="padding: 8px 15px; background: #ffc107; color: black; border-radius: 5px;">2</span>
</div>
<div style="font-size: 12px; text-align: center;">pivot = 1 (index 0)</div>
</div>

<!-- Step 2 -->
<div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); min-width: 200px;">
<div style="font-weight: bold; color: #28a745; margin-bottom: 10px;">2. Find Successor</div>
<div style="display: flex; gap: 5px; justify-content: center; margin: 10px 0;">
  <span style="padding: 8px 15px; background: #dc3545; color: white; border-radius: 5px;">1</span>
  <span style="padding: 8px 15px; background: #e9ecef; color: #999; border-radius: 5px;">3</span>
  <span style="padding: 8px 15px; background: #28a745; color: white; border-radius: 5px;"><strong>2</strong></span>
</div>
<div style="font-size: 12px; text-align: center;">successor = 2 (smallest > 1)</div>
</div>

<!-- Step 3 -->
<div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); min-width: 200px;">
<div style="font-weight: bold; color: #fd7e14; margin-bottom: 10px;">3. Swap</div>
<div style="display: flex; gap: 5px; justify-content: center; margin: 10px 0;">
  <span style="padding: 8px 15px; background: #28a745; color: white; border-radius: 5px;"><strong>2</strong></span>
  <span style="padding: 8px 15px; background: #ffc107; color: black; border-radius: 5px;">3</span>
  <span style="padding: 8px 15px; background: #dc3545; color: white; border-radius: 5px;"><strong>1</strong></span>
</div>
<div style="font-size: 12px; text-align: center;">[2, 3, 1]</div>
</div>

<!-- Step 4 -->
<div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); min-width: 200px;">
<div style="font-weight: bold; color: #17a2b8; margin-bottom: 10px;">4. Reverse Suffix</div>
<div style="display: flex; gap: 5px; justify-content: center; margin: 10px 0;">
  <span style="padding: 8px 15px; background: #28a745; color: white; border-radius: 5px;">2</span>
  <span style="padding: 8px 15px; background: #17a2b8; color: white; border-radius: 5px;"><strong>1</strong></span>
  <span style="padding: 8px 15px; background: #17a2b8; color: white; border-radius: 5px;"><strong>3</strong></span>
</div>
<div style="font-size: 12px; text-align: center;">[2, 1, 3] - Final!</div>
</div>

</div>

</div>

---

## Solution Approach

### The Algorithm (In-Place, O(n))

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Steps:**
1. Find largest i where `nums[i] < nums[i+1]` (pivot)
2. Find largest j where `nums[j] > nums[i]` (successor)
3. Swap `nums[i]` and `nums[j]`
4. Reverse suffix starting at `i+1`

**Why it works:**
- The suffix after pivot is descending (already at max)
- Swapping with successor makes smallest valid increase
- Reversing makes the suffix smallest possible

---

## Key Insight

<div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">

**Why does reversing the suffix work?**

After swapping pivot with its successor:
- The suffix is STILL in descending order (because we picked the smallest number greater than pivot from a descending sequence)
- Reversing descending = ascending = smallest arrangement

This is why the algorithm is O(n) - we don't need to sort, just reverse!

</div>

---

## Complexity Analysis

| Operation | Time |
|-----------|------|
| Find pivot | O(n) |
| Find successor | O(n) |
| Swap | O(1) |
| Reverse suffix | O(n) |
| **Total** | **O(n)** |

Space: O(1) - all operations are in-place
