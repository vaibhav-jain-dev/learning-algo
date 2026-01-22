# Arrays - Interview Mastery Guide

## Overview

Arrays are the most fundamental data structure in computer science, storing elements in contiguous memory locations with O(1) index-based access. They form the foundation for understanding more complex data structures and are the **most commonly tested topic** in coding interviews.

An array provides:
- **Random Access**: Access any element by index in O(1) time
- **Cache Efficiency**: Contiguous memory means better cache performance
- **Simple Structure**: Building block for stacks, queues, heaps, and more

## Why This Matters for Interviews

**Frequency**: Arrays appear in **40-50%** of all coding interview questions

**Companies that heavily test arrays**:
- Google (sliding window, two pointers)
- Amazon (subarray problems, sorting)
- Meta (optimization problems)
- Microsoft (matrix operations)
- Apple (in-place modifications)

**Why interviewers love array problems**:
1. Easy to understand problem statements
2. Multiple solution approaches (brute force to optimal)
3. Tests fundamental algorithmic thinking
4. Reveals optimization skills

## Core Patterns

The main patterns to recognize and master:

### Pattern 1: Two Pointers
**When to use**: Sorted arrays, finding pairs, palindrome checking, partitioning
**Example problems**: Two Sum (sorted), Three Sum, Container With Most Water

### Pattern 2: Sliding Window
**When to use**: Contiguous subarrays, substring problems, fixed or variable window
**Example problems**: Maximum Subarray Sum, Longest Substring Without Repeating

### Pattern 3: Hash Map/Set
**When to use**: Finding pairs, counting occurrences, checking duplicates
**Example problems**: Two Sum, First Duplicate, Subarray Sum Equals K

### Pattern 4: Prefix Sum
**When to use**: Range sum queries, subarray sums
**Example problems**: Zero Sum Subarray, Contiguous Array

### Pattern 5: In-Place Modification
**When to use**: O(1) space requirement, marking visited elements
**Example problems**: Move Zeroes, First Duplicate Value

### Pattern 6: Binary Search
**When to use**: Sorted arrays, searching, finding boundaries
**Example problems**: Search Insert Position, Find First and Last Position

## Visual Explanation

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Two Pointers Pattern</h3>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Sorted Array: [1, 2, 3, 4, 6, 8, 9, 14, 15]
Target Sum: 13

Step 1:  L                          R
         [1, 2, 3, 4, 6, 8, 9, 14, 15]
         Sum = 1 + 15 = 16 > 13, move R left

Step 2:  L                      R
         [1, 2, 3, 4, 6, 8, 9, 14, 15]
         Sum = 1 + 14 = 15 > 13, move R left

Step 3:  L                  R
         [1, 2, 3, 4, 6, 8, 9, 14, 15]
         Sum = 1 + 9 = 10 < 13, move L right

Step 4:     L              R
         [1, 2, 3, 4, 6, 8, 9, 14, 15]
         Sum = 2 + 9 = 11 < 13, move L right

Step 5:        L           R
         [1, 2, 3, 4, 6, 8, 9, 14, 15]
         Sum = 3 + 9 = 12 < 13, move L right

Step 6:           L        R
         [1, 2, 3, 4, 6, 8, 9, 14, 15]
         Sum = 4 + 9 = 13 = target! Found!
</pre>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Sliding Window Pattern</h3>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Find max sum of subarray of size 3:
Array: [2, 1, 5, 1, 3, 2]

Window 1: [2, 1, 5] 1, 3, 2    Sum = 8
Window 2:  2 [1, 5, 1] 3, 2    Sum = 7  (subtract 2, add 1)
Window 3:  2, 1 [5, 1, 3] 2    Sum = 9  (subtract 1, add 3) MAX!
Window 4:  2, 1, 5 [1, 3, 2]   Sum = 6  (subtract 5, add 2)

Answer: 9

Key insight: Instead of recalculating sum each time O(k),
slide the window by subtracting left, adding right O(1)
</pre>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Prefix Sum Pattern</h3>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Array:      [3, 1, 2, 5, 4]
Prefix Sum: [3, 4, 6, 11, 15]

To find sum from index 1 to 3:
  prefix[3] - prefix[0] = 11 - 3 = 8
  Verify: 1 + 2 + 5 = 8

Zero Sum Subarray Detection:
Array:      [4, 2, -3, 1, 6]
Prefix Sum: [4, 6,  3, 4, 10]
                       ^
Same prefix sum (4) appears twice!
Subarray between indices sums to 0: [2, -3, 1] = 0
</pre>
</div>

## Must-Know Problems

### Problem 1: Two Number Sum

**Problem**: Find two numbers in an array that add up to a target sum.

**Approach 1 - Hash Set (Optimal)**:
- For each number, check if (target - number) exists in set
- Time: O(n), Space: O(n)

**Approach 2 - Two Pointers (if sorted)**:
- Sort array, use left/right pointers
- Time: O(n log n), Space: O(1)

```python
def two_number_sum(array, target_sum):
    """
    Time: O(n) | Space: O(n)
    """
    seen = set()
    for num in array:
        complement = target_sum - num
        if complement in seen:
            return [complement, num]
        seen.add(num)
    return []

# Example
array = [3, 5, -4, 8, 11, 1, -1, 6]
print(two_number_sum(array, 10))  # [-1, 11]
```

---

### Problem 2: Three Number Sum

**Problem**: Find all unique triplets that sum to a target.

**Approach**: Sort + Two Pointers
- Fix one element, use two pointers for remaining two
- Time: O(n^2), Space: O(n) for output

```python
def three_number_sum(array, target_sum):
    """
    Time: O(n^2) | Space: O(n)
    """
    array.sort()
    triplets = []

    for i in range(len(array) - 2):
        left = i + 1
        right = len(array) - 1

        while left < right:
            current_sum = array[i] + array[left] + array[right]

            if current_sum == target_sum:
                triplets.append([array[i], array[left], array[right]])
                left += 1
                right -= 1
            elif current_sum < target_sum:
                left += 1
            else:
                right -= 1

    return triplets

# Example
array = [12, 3, 1, 2, -6, 5, -8, 6]
print(three_number_sum(array, 0))  # [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]
```

---

### Problem 3: Maximum Subarray (Kadane's Algorithm)

**Problem**: Find the contiguous subarray with the largest sum.

**Approach**: Track current sum, reset if negative
- Time: O(n), Space: O(1)

```python
def max_subarray_sum(array):
    """
    Kadane's Algorithm
    Time: O(n) | Space: O(1)
    """
    max_sum = array[0]
    current_sum = array[0]

    for i in range(1, len(array)):
        # Either extend current subarray or start new
        current_sum = max(array[i], current_sum + array[i])
        max_sum = max(max_sum, current_sum)

    return max_sum

# Example
array = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
print(max_subarray_sum(array))  # 6 (subarray [4, -1, 2, 1])
```

---

### Problem 4: Move Element To End

**Problem**: Move all instances of a target to the end of array in-place.

**Approach**: Two pointers from both ends
- Time: O(n), Space: O(1)

```python
def move_element_to_end(array, to_move):
    """
    Time: O(n) | Space: O(1)
    """
    left = 0
    right = len(array) - 1

    while left < right:
        # Find next target from right that's not to_move
        while left < right and array[right] == to_move:
            right -= 1

        # If left has target, swap with right
        if array[left] == to_move:
            array[left], array[right] = array[right], array[left]

        left += 1

    return array

# Example
array = [2, 1, 2, 2, 2, 3, 4, 2]
print(move_element_to_end(array, 2))  # [4, 1, 3, 2, 2, 2, 2, 2]
```

---

### Problem 5: Merge Overlapping Intervals

**Problem**: Given intervals, merge all overlapping ones.

**Approach**: Sort by start, merge greedily
- Time: O(n log n), Space: O(n)

```python
def merge_overlapping_intervals(intervals):
    """
    Time: O(n log n) | Space: O(n)
    """
    if not intervals:
        return []

    # Sort by start time
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for current in intervals[1:]:
        last = merged[-1]

        if current[0] <= last[1]:  # Overlapping
            last[1] = max(last[1], current[1])
        else:
            merged.append(current)

    return merged

# Example
intervals = [[1, 2], [3, 5], [4, 7], [6, 8], [9, 10]]
print(merge_overlapping_intervals(intervals))  # [[1, 2], [3, 8], [9, 10]]
```

---

### Problem 6: First Duplicate Value

**Problem**: Find the first duplicate in an array of integers 1 to n.

**Approach**: Use array as hash map (negate values as markers)
- Time: O(n), Space: O(1)

```python
def first_duplicate_value(array):
    """
    Time: O(n) | Space: O(1)
    Uses array values as indices (values are 1 to n)
    """
    for value in array:
        abs_value = abs(value)
        index = abs_value - 1

        if array[index] < 0:
            return abs_value

        array[index] *= -1

    return -1

# Example
array = [2, 1, 5, 2, 3, 3, 4]
print(first_duplicate_value(array))  # 2
```

---

### Problem 7: Spiral Matrix Traversal

**Problem**: Return all elements in spiral order.

**Approach**: Track four boundaries (top, bottom, left, right)
- Time: O(n), Space: O(n)

```python
def spiral_traverse(matrix):
    """
    Time: O(n) | Space: O(n)
    """
    if not matrix:
        return []

    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        # Traverse right
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1

        # Traverse down
        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1

        # Traverse left (if rows remain)
        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1

        # Traverse up (if columns remain)
        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1

    return result

# Example
matrix = [
    [1, 2, 3, 4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10, 9, 8, 7]
]
print(spiral_traverse(matrix))  # [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
```

## Common Mistakes

1. **Off-by-one errors**: Forgetting that arrays are 0-indexed
2. **Not handling empty arrays**: Always check `if not array` first
3. **Modifying array while iterating**: Use indices or iterate over copy
4. **Integer overflow**: Large sums may overflow in some languages
5. **Forgetting to sort**: Two-pointer on unsorted array doesn't work
6. **Not considering negatives**: Affects min/max logic in Kadane's
7. **Using wrong comparison**: `<=` vs `<` in boundary conditions

## Interview Tips

### How to approach unknown array problems:

1. **Clarify constraints**: Size of array? Range of values? Sorted? Duplicates?
2. **Start with brute force**: Explain O(n^2) or O(n^3) approach first
3. **Identify the pattern**: Two pointers? Hash map? Sliding window?
4. **Optimize step by step**: Show your thought process

### Time management:
- **0-5 min**: Understand problem, ask questions
- **5-10 min**: Discuss approaches, pick optimal
- **10-30 min**: Implement solution
- **30-35 min**: Test with examples, edge cases

### Communication tips:
- "Let me think about the brute force first..."
- "I notice this is sorted, so two pointers might work..."
- "To optimize from O(n^2) to O(n), I can use a hash map..."
- "Let me trace through this example to verify..."

## Practice Problems (Easy to Hard)

### Easy
1. Two Number Sum
2. Validate Subsequence
3. Sorted Squared Array
4. Tournament Winner

### Medium
5. Three Number Sum
6. Smallest Difference
7. Move Element To End
8. Monotonic Array
9. Spiral Traverse
10. Longest Peak
11. Array Of Products
12. First Duplicate Value
13. Merge Overlapping Intervals
14. Zero Sum Subarray

### Hard
15. Four Number Sum
16. Subarray Sort
17. Largest Range
18. Min Rewards
19. Zigzag Traverse

### Very Hard
20. Apartment Hunting
21. Calendar Matching
22. Waterfall Streams

## Quick Reference Card

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Array Cheat Sheet</h3>
<table style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 8px;">
<tr style="background: #f1f5f9;">
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Pattern</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Time</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">When to Use</th>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Two Pointers</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Sorted array, pairs, partitioning</td>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Sliding Window</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Contiguous subarray, fixed/variable size</td>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Hash Map</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Find pairs, count occurrences</td>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Prefix Sum</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">O(n) + O(1) query</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Range sum queries</td>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Sort First</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">O(n log n)</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Finding pairs, intervals, greedy</td>
</tr>
<tr>
<td style="padding: 12px;">Binary Search</td>
<td style="padding: 12px;">O(log n)</td>
<td style="padding: 12px;">Sorted array, finding boundary</td>
</tr>
</table>

<h4 style="color: #1e293b; margin-top: 20px;">Key Formulas</h4>
<ul style="color: #334155;">
<li><strong>Kadane's</strong>: current = max(arr[i], current + arr[i])</li>
<li><strong>Prefix Sum</strong>: prefix[i] = prefix[i-1] + arr[i]</li>
<li><strong>Range Sum</strong>: sum(i,j) = prefix[j] - prefix[i-1]</li>
</ul>
</div>
