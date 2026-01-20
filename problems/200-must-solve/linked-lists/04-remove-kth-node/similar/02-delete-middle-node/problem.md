<div id="viz-config" style="display:none">
{"name":"Delete the Middle Node of a Linked List","algorithm":"ll-remove-kth","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"list":[1,3,4,7,1,2,6]},"output":[1,3,4,1,2,6],"inputRaw":"1 -> 3 -> 4 -> 7 -> 1 -> 2 -> 6","outputRaw":"1 -> 3 -> 4 -> 1 -> 2 -> 6"},{"input":{"list":[1,2,3,4]},"output":[1,2,4],"inputRaw":"1 -> 2 -> 3 -> 4","outputRaw":"1 -> 2 -> 4"},{"input":{"list":[2,1]},"output":[2],"inputRaw":"2 -> 1","outputRaw":"2"},{"input":{"list":[1]},"output":[],"inputRaw":"1","outputRaw":"(empty)"}]}
</div>

# Delete the Middle Node of a Linked List

**Difficulty:** Medium

## Problem Statement

Given the head of a singly linked list, delete the **middle node** and return the head of the modified list.

The middle node of a linked list of size `n` is the `floor(n/2)`-th node from the start (0-indexed).

For a list with `n` nodes:
- If `n` is odd: delete the exact middle node
- If `n` is even: delete the second of the two middle nodes

## Examples

**Example 1:**
```
Input: 1 -> 3 -> 4 -> 7 -> 1 -> 2 -> 6
Output: 1 -> 3 -> 4 -> 1 -> 2 -> 6
Explanation: 7 nodes, middle index = 3, delete node with value 7
```

**Example 2:**
```
Input: 1 -> 2 -> 3 -> 4
Output: 1 -> 2 -> 4
Explanation: 4 nodes, middle index = 2, delete node with value 3
```

**Example 3:**
```
Input: 2 -> 1
Output: 2
Explanation: 2 nodes, middle index = 1, delete node with value 1
```

**Example 4:**
```
Input: 1
Output: (empty)
Explanation: Single node is the middle, delete it.
```

## Constraints

- Number of nodes: [1, 10^5]
- Node values: [1, 10^5]

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Challenge

**Question to ask yourself:** "How do I find the middle without knowing the length?"

Two approaches:
1. Count length first, then traverse to middle - O(2n) time
2. Use slow/fast pointers - O(n) time, single pass

### Step 2: Identify the Pattern

**Key insight:** This is a **Fast and Slow Pointers** problem because:
- Fast pointer moves 2x speed of slow
- When fast reaches end, slow is at middle
- Classic tortoise and hare technique

### Step 3: Edge Cases

- Single node: delete it, return null
- Two nodes: delete second, return first
- Need to track node BEFORE middle to delete middle

---

## Visual Diagram: How It Works

### Input List (7 nodes)

<div style="display: flex; align-items: center; gap: 5px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">7</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">6</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">
<span style="background: #dc3545; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Red</span> = Middle node to delete (index 3)
</div>

### Step-by-Step: Fast and Slow Pointers

**Step 1:** Initialize pointers (use dummy node)

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #e0a800;">D</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">7</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">...</span>
</div>

<div style="background: #e7f3ff; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Slow:</strong> At dummy (D)<br>
<strong>Fast:</strong> At head (1)
</div>

**Step 2:** Move slow 1 step, fast 2 steps

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">D</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #1e7e34;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #117a8b;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">7</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">...</span>
</div>

<div style="background: #e7f3ff; padding: 10px; border-radius: 5px; margin: 10px 0;">
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 4px;">Slow</span> at node 1
<span style="background: #17a2b8; color: white; padding: 3px 8px; border-radius: 4px; margin-left: 10px;">Fast</span> at node 4
</div>

**Step 3:** Continue moving

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">D</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #1e7e34;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">7</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #117a8b;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">6</span>
</div>

<div style="background: #e7f3ff; padding: 10px; border-radius: 5px; margin: 10px 0;">
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 4px;">Slow</span> at node 3
<span style="background: #17a2b8; color: white; padding: 3px 8px; border-radius: 4px; margin-left: 10px;">Fast</span> at node 2
</div>

**Step 4:** Final position

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">D</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #1e7e34;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px dashed #721c24;">7</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #117a8b;">6</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="background: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Fast reached near end!</strong><br>
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 4px;">Slow</span> is at node BEFORE middle (4)<br>
<span style="background: #dc3545; color: white; padding: 3px 8px; border-radius: 4px;">Delete</span> slow.next (7)
</div>

**Step 5:** Delete middle node

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #28a745; font-size: 20px; font-weight: bold;">&#8594;&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">6</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>slow.next = slow.next.next</strong><br>
<strong>Output: 1 -> 3 -> 4 -> 1 -> 2 -> 6</strong>
</div>

---

## Solution Approaches

### Approach 1: Fast and Slow Pointers - RECOMMENDED

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Why this is best:**
- Single pass through the list
- Constant extra space
- Elegant and intuitive

### Approach 2: Count Length First

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**When to use:** When you need the length for other purposes.

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| Fast/Slow Pointers | O(n) | O(1) | BEST |
| Count Length | O(n) | O(1) | Alternative |

