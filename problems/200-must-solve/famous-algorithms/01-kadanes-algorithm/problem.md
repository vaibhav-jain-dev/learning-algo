<div id="viz-config" style="display:none">
{"name":"Maximum Subarray Sum","algorithm":"kadanes-algorithm","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"nums":[-2,1,-3,4,-1,2,1,-5,4]},"output":6,"inputRaw":"nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]","outputRaw":"6"}]}
</div>

# Kadane's Algorithm - Maximum Subarray Sum

**Difficulty:** Medium

## Problem Statement

Given an array of integers (which may contain both positive and negative numbers), find the contiguous subarray with the largest sum. Return the maximum sum.

This is the classic problem solved efficiently by Kadane's Algorithm, which uses dynamic programming to track the maximum subarray ending at each position.

## Examples

**Example 1:**
```
Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
Explanation: The subarray [4, -1, 2, 1] has the largest sum = 6
```

**Example 2:**
```
Input: nums = [1]
Output: 1
```

**Example 3:**
```
Input: nums = [5, 4, -1, 7, 8]
Output: 23
Explanation: The entire array has the largest sum = 23
```

## Visual Explanation

### Algorithm Step-by-Step Execution

For input `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`:

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Index</th>
<th style="border: 1px solid #ddd; padding: 10px;">Value</th>
<th style="border: 1px solid #ddd; padding: 10px;">Current Sum</th>
<th style="border: 1px solid #ddd; padding: 10px;">Max Sum</th>
<th style="border: 1px solid #ddd; padding: 10px;">Decision</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">-2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">-2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">-2</td>
<td style="border: 1px solid #ddd; padding: 10px;">Start with -2</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">1</td>
<td style="border: 1px solid #ddd; padding: 10px;">max(1, -2+1) = 1 (restart)</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">-3</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">-2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">1</td>
<td style="border: 1px solid #ddd; padding: 10px;">max(-3, 1-3) = -2 (extend)</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #c3e6cb;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">4</td>
<td style="border: 1px solid #ddd; padding: 10px;">max(4, -2+4) = 4 (restart)</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #c3e6cb;">-1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">4</td>
<td style="border: 1px solid #ddd; padding: 10px;">max(-1, 4-1) = 3 (extend)</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">5</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #c3e6cb;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">5</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">5</td>
<td style="border: 1px solid #ddd; padding: 10px;">max(2, 3+2) = 5 (extend)</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">6</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #c3e6cb;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">6</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">6</td>
<td style="border: 1px solid #ddd; padding: 10px;">max(1, 5+1) = 6 (extend)</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">7</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">-5</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">6</td>
<td style="border: 1px solid #ddd; padding: 10px;">max(-5, 6-5) = 1 (extend)</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">8</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">5</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">6</td>
<td style="border: 1px solid #ddd; padding: 10px;">max(4, 1+4) = 5 (extend)</td>
</tr>
</table>

### Visual Array Representation

```
Array:  [-2]  [1]  [-3]  [4]  [-1]  [2]  [1]  [-5]  [4]
Index:    0    1     2    3     4    5    6     7    8
                          |___________________|
                           Maximum Subarray = 6
```

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>Key Insight:</strong> At each position, we decide whether to:
<ul>
<li>Start a new subarray (if current element > current_sum + current element)</li>
<li>Extend the existing subarray (otherwise)</li>
</ul>
</div>

### Core Formula

```
current_sum = max(nums[i], current_sum + nums[i])
max_sum = max(max_sum, current_sum)
```

## Constraints

- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4

## Hints

<details>
<summary>Hint 1</summary>
Think about the problem as making a decision at each element: should you start fresh from this element or continue the previous subarray?
</details>

<details>
<summary>Hint 2</summary>
If the current running sum becomes negative, it's always better to start fresh from the next element.
</details>

<details>
<summary>Hint 3</summary>
You only need O(1) space - just track the current sum and the maximum sum seen so far.
</details>

## Approach

### Kadane's Algorithm

1. Initialize `current_sum` and `max_sum` to the first element
2. For each subsequent element:
   - `current_sum = max(element, current_sum + element)`
   - `max_sum = max(max_sum, current_sum)`
3. Return `max_sum`

**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## Similar Problems

### 1. Maximum Sum Circular Subarray
**Difficulty:** Medium

Find the maximum sum of a non-empty subarray in a circular array.

### 2. Maximum Product Subarray
**Difficulty:** Medium

Find the contiguous subarray with the largest product.

### 3. Maximum Sum with at Least K Elements
**Difficulty:** Medium

Find the maximum sum of a subarray containing at least K elements.
