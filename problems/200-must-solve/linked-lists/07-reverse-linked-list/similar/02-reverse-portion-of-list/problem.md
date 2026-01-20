<div id="viz-config" style="display:none">
{"name":"Reverse Linked List II (Reverse Portion)","algorithm":"ll-reverse","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"list":[1,2,3,4,5],"left":2,"right":4},"output":[1,4,3,2,5],"inputRaw":"[1,2,3,4,5], left = 2, right = 4","outputRaw":"[1,4,3,2,5]"},{"input":{"list":[5],"left":1,"right":1},"output":[5],"inputRaw":"[5], left = 1, right = 1","outputRaw":"[5]"},{"input":{"list":[1,2,3,4,5],"left":1,"right":5},"output":[5,4,3,2,1],"inputRaw":"[1,2,3,4,5], left = 1, right = 5","outputRaw":"[5,4,3,2,1]"},{"input":{"list":[1,2,3,4,5],"left":3,"right":4},"output":[1,2,4,3,5],"inputRaw":"[1,2,3,4,5], left = 3, right = 4","outputRaw":"[1,2,4,3,5]"}]}
</div>

# Reverse Linked List II (Reverse Portion)

**Difficulty:** Medium

## Problem Statement

Given the head of a singly linked list and two integers `left` and `right` where `left <= right`, reverse the nodes of the list from position `left` to position `right`, and return the reversed list.

Positions are 1-indexed.

## Examples

**Example 1:**
```
Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]
Explanation: Reverse nodes from position 2 to 4
```

**Example 2:**
```
Input: head = [5], left = 1, right = 1
Output: [5]
Explanation: Single node, nothing to reverse.
```

**Example 3:**
```
Input: head = [1,2,3,4,5], left = 1, right = 5
Output: [5,4,3,2,1]
Explanation: Reverse entire list.
```

**Example 4:**
```
Input: head = [1,2,3,4,5], left = 3, right = 4
Output: [1,2,4,3,5]
Explanation: Reverse only nodes 3 and 4.
```

## Constraints

- Number of nodes: [1, 500]
- Node values: [-500, 500]
- 1 <= left <= right <= n

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Challenge

**Question to ask yourself:** "How do I reverse only a portion while keeping connections?"

Key operations needed:
1. Find the node before position `left`
2. Reverse nodes from `left` to `right`
3. Reconnect the reversed portion to the rest

### Step 2: Identify the Pattern

**Key insight:** This is a **Partial Reversal with Boundary Tracking** problem:
- Need to track the node BEFORE the reversal starts
- Need to track the first node of reversal (becomes last after)
- Standard reversal for the portion
- Reconnect boundaries

### Step 3: Edge Cases

- left = 1: Reverse starts from head (use dummy node)
- left = right: Nothing to reverse
- Reverse entire list: left = 1, right = n

---

## Visual Diagram: How It Works

### Input List (left=2, right=4)

<div style="display: flex; align-items: center; gap: 5px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">
<span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Blue</span> = Keep as-is
<span style="background: #ffc107; color: black; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Yellow</span> = Portion to reverse (positions 2-4)
</div>

### Step-by-Step Reversal

**Step 1:** Find node before position `left` (use dummy)

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px dashed #1e7e34;">D</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #1e7e34;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
</div>

<div style="background: #e7f3ff; padding: 10px; border-radius: 5px; margin: 10px 0;">
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 4px;">prev</span> = Node 1 (node before reversal zone)<br>
<span style="background: #ffc107; color: black; padding: 3px 8px; border-radius: 4px; margin-top: 5px;">start</span> = Node 2 (first node to reverse, will become last)
</div>

**Step 2:** Reverse nodes 2, 3, 4 using "insert at front" technique

<div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 15px 0;">
<p><strong>Technique:</strong> Move each node after `start` to right after `prev`</p>
</div>

**Iteration 1:** Move 3 after 1

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">D</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #28a745; font-size: 20px; font-weight: bold;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
</div>

<div style="background: #e7f3ff; padding: 10px; border-radius: 5px; margin: 10px 0;">
Node 3 moved to right after prev (node 1)
</div>

**Iteration 2:** Move 4 after 1

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">D</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #28a745; font-size: 20px; font-weight: bold;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="background: #e7f3ff; padding: 10px; border-radius: 5px; margin: 10px 0;">
Node 4 moved to right after prev (node 1)<br>
<strong>Done!</strong> We've reversed (right - left) = 2 times
</div>

### Final Result

<div style="display: flex; align-items: center; gap: 5px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Output: 1 -> 4 -> 3 -> 2 -> 5</strong>
</div>

---

## Solution Approaches

### Approach 1: One-Pass with Insert at Front - RECOMMENDED

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Why this is best:**
- Single pass through the list
- Constant extra space
- Clean in-place modification

### Approach 2: Standard Reversal

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**When to use:** When you prefer traditional reverse logic.

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| Insert at Front | O(n) | O(1) | BEST |
| Standard Reversal | O(n) | O(1) | Alternative |

