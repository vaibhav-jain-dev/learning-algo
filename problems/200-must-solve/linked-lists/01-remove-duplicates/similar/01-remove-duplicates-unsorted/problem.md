<div id="viz-config" style="display:none">
{"name":"Remove Duplicates from Unsorted Linked List","algorithm":"ll-remove-duplicates","complexity":{"time":"O(n)","space":"O(n)"},"examples":[{"input":{"list":[3,2,2,1,3,2,4]},"output":[3,2,1,4],"inputRaw":"3 -> 2 -> 2 -> 1 -> 3 -> 2 -> 4","outputRaw":"3 -> 2 -> 1 -> 4"},{"input":{"list":[1,1,1,1]},"output":[1],"inputRaw":"1 -> 1 -> 1 -> 1","outputRaw":"1"},{"input":{"list":[5,4,3,2,1]},"output":[5,4,3,2,1],"inputRaw":"5 -> 4 -> 3 -> 2 -> 1","outputRaw":"5 -> 4 -> 3 -> 2 -> 1"}]}
</div>

# Remove Duplicates from Unsorted Linked List

**Difficulty:** Medium

## Problem Statement

Given the head of an **unsorted** singly linked list, remove all duplicate values, keeping only the first occurrence of each value.

Return the head of the modified linked list.

## Examples

**Example 1:**
```
Input: 3 -> 2 -> 2 -> 1 -> 3 -> 2 -> 4
Output: 3 -> 2 -> 1 -> 4
Explanation: Keep first occurrence of each value, remove all subsequent duplicates.
```

**Example 2:**
```
Input: 1 -> 1 -> 1 -> 1
Output: 1
```

**Example 3:**
```
Input: 5 -> 4 -> 3 -> 2 -> 1
Output: 5 -> 4 -> 3 -> 2 -> 1
Explanation: No duplicates to remove.
```

## Constraints

- The number of nodes is in range [0, 10000]
- Node values are in range [-10000, 10000]
- List is NOT sorted

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Challenge

**Question to ask yourself:** "Why is unsorted harder than sorted?"

In a sorted list, duplicates are **adjacent** - we just compare neighbors.
In an unsorted list, duplicates can be **anywhere** - we need to track what we've seen.

### Step 2: Identify the Pattern

**Key insight:** This is a **Hash Set Tracking** problem because:
- We need O(1) lookup to check if a value was seen before
- We can't sort first (would require extra pass and potentially change node order requirements)

### Step 3: Alternative Without Extra Space

**Follow-up:** What if we can't use extra memory?
- Use two pointers: for each node, scan the rest of the list
- Time becomes O(n^2) but space is O(1)

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>3 -> 2 -> 2 -> 1 -> 3 -> 2 -> 4</code>
</div>

### Linked List Visualization

<div style="display: flex; align-items: center; gap: 5px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; text-decoration: line-through;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; text-decoration: line-through;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; text-decoration: line-through;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">
<span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Blue</span> = First occurrence (keep)
<br><br>
<span style="background: #dc3545; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px; text-decoration: line-through;">Red</span> = Duplicate (remove)
</div>

### Step-by-Step Execution with Hash Set

**Step 1:** Visit node 3

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #0056b3;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">...</span>
</div>

<div style="background: #e7f3ff; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Seen set:</strong> {3}<br>
<strong>Action:</strong> 3 not in set, add to set, keep node
</div>

**Step 2:** Visit node 2

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #1e7e34;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">...</span>
</div>

<div style="background: #e7f3ff; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Seen set:</strong> {3, 2}<br>
<strong>Action:</strong> 2 not in set, add to set, keep node
</div>

**Step 3:** Visit duplicate 2

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #b02a37;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">...</span>
</div>

<div style="background: #f8d7da; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Seen set:</strong> {3, 2}<br>
<strong>Action:</strong> 2 already in set, REMOVE this node!
</div>

### Final Result

<div style="display: flex; align-items: center; gap: 5px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Output: 3 -> 2 -> 1 -> 4</strong>
</div>

---

## Solution Approaches

### Approach 1: Hash Set (Single Pass) - RECOMMENDED

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**Why this is best:**
- Single pass through the list
- O(1) lookup for duplicates
- Simple and clean implementation

### Approach 2: Two Pointers (No Extra Space)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n^2) |
| Space Complexity | O(1) |

**When to use:** When memory is extremely constrained.

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| Hash Set | O(n) | O(n) | BEST |
| Two Pointers | O(n^2) | O(1) | Memory constrained |
