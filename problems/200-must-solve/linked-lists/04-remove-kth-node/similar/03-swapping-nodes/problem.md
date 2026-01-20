<div id="viz-config" style="display:none">
{"name":"Swapping Nodes in a Linked List","algorithm":"ll-remove-kth","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"list":[1,2,3,4,5],"k":2},"output":[1,4,3,2,5],"inputRaw":"[1,2,3,4,5], k = 2","outputRaw":"[1,4,3,2,5]"},{"input":{"list":[7,9,6,6,7,8,3,0,9,5],"k":5},"output":[7,9,6,6,8,7,3,0,9,5],"inputRaw":"[7,9,6,6,7,8,3,0,9,5], k = 5","outputRaw":"[7,9,6,6,8,7,3,0,9,5]"},{"input":{"list":[1],"k":1},"output":[1],"inputRaw":"[1], k = 1","outputRaw":"[1]"},{"input":{"list":[1,2],"k":1},"output":[2,1],"inputRaw":"[1,2], k = 1","outputRaw":"[2,1]"}]}
</div>

# Swapping Nodes in a Linked List

**Difficulty:** Medium

## Problem Statement

Given the head of a linked list and an integer `k`, return the head of the linked list after swapping the **values** of the `k`-th node from the beginning and the `k`-th node from the end (the list is 1-indexed).

## Examples

**Example 1:**
```
Input: head = [1,2,3,4,5], k = 2
Output: [1,4,3,2,5]
Explanation: Swap 2nd from start (value 2) with 2nd from end (value 4)
```

**Example 2:**
```
Input: head = [7,9,6,6,7,8,3,0,9,5], k = 5
Output: [7,9,6,6,8,7,3,0,9,5]
Explanation: Swap 5th from start (value 7) with 5th from end (value 8)
```

**Example 3:**
```
Input: head = [1], k = 1
Output: [1]
Explanation: Single node, swap with itself, no change.
```

**Example 4:**
```
Input: head = [1,2], k = 1
Output: [2,1]
Explanation: Swap first and last (both are k=1 from their respective ends).
```

## Constraints

- Number of nodes: [1, 10^5]
- Node values: [0, 100]
- 1 <= k <= n (number of nodes)

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Challenge

**Question to ask yourself:** "How do I find the k-th node from the end efficiently?"

Key insight: The k-th node from the end is the same as (n-k+1)-th from the start.

Two approaches:
1. Count length first, then find both positions - O(2n)
2. Use two pointers with k-gap - O(n)

### Step 2: Identify the Pattern

**Key insight:** This is a **Two Pointers with Gap** problem because:
- First pointer finds k-th from start
- Second pointer follows with k-gap to find k-th from end
- Same pattern as "Remove N-th Node from End"

### Step 3: Simplification

We only need to swap VALUES, not the actual nodes!
This makes the problem much simpler.

---

## Visual Diagram: How It Works

### Input List (k = 2)

<div style="display: flex; align-items: center; gap: 5px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Green</span> = k-th from start (position 2, value 2)
<br><br>
<span style="background: #ffc107; color: black; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Yellow</span> = k-th from end (position 4, value 4)
</div>

### Step-by-Step: Two Pointer Approach

**Step 1:** Move first pointer k steps from head

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #1e7e34;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #117a8b;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
</div>

<div style="background: #e7f3ff; padding: 10px; border-radius: 5px; margin: 10px 0;">
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 4px;">First node found</span> = node at index k (value 2) - save this!<br>
<span style="background: #17a2b8; color: white; padding: 3px 8px; border-radius: 4px; margin-top: 5px;">Current pointer</span> = at node 3 (after k steps)
</div>

**Step 2:** Start second pointer at head, move both until first reaches end

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #117a8b;">5</span>
</div>

<div style="display: flex; align-items: center; gap: 40px; margin: 15px 0;">
<div style="background: #e7f3ff; padding: 10px; border-radius: 5px;">
<strong>Second pointer position</strong>
</div>
</div>

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #b02a37;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
</div>

**Step 3:** Continue until first pointer reaches end

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #d39e00;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 8px 12px; border-radius: 4px; font-style: italic;">null (first)</span>
</div>

<div style="background: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>First pointer reached null!</strong><br>
<span style="background: #ffc107; color: black; padding: 3px 8px; border-radius: 4px;">Second pointer</span> is at k-th from end (value 4)
</div>

**Step 4:** Swap values

<div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin: 20px 0;">
<div style="text-align: center;">
  <div style="background: #28a745; color: white; padding: 15px 25px; border-radius: 8px; font-weight: bold; font-size: 20px;">2</div>
  <div style="margin-top: 5px; font-size: 12px;">k-th from start</div>
</div>
<div style="font-size: 30px;">&#8596;</div>
<div style="text-align: center;">
  <div style="background: #ffc107; color: black; padding: 15px 25px; border-radius: 8px; font-weight: bold; font-size: 20px;">4</div>
  <div style="margin-top: 5px; font-size: 12px;">k-th from end</div>
</div>
</div>

### Final Result

<div style="display: flex; align-items: center; gap: 5px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
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

### Approach 1: Two Pointers (Single Pass) - RECOMMENDED

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Why this is best:**
- Single pass finds both nodes
- Constant extra space
- Clean and efficient

### Approach 2: Count Length First

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**When to use:** When code clarity is preferred over single pass.

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| Two Pointers | O(n) | O(1) | BEST |
| Count Length | O(n) | O(1) | Alternative |

