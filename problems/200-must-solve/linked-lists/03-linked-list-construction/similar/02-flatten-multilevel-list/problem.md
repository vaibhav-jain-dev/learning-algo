# Flatten a Multilevel Doubly Linked List

**Difficulty:** Medium

## Problem Statement

You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional **child pointer**. This child pointer may or may not point to a separate doubly linked list, also containing these special nodes. These child lists may have one or more children of their own, and so on, to produce a **multilevel data structure**.

**Flatten** the list so that all the nodes appear in a single-level, doubly linked list. You are given the head of the first level of the list.

## Examples

**Example 1:**
```
Input:
 1---2---3---4---5---6--NULL
         |
         7---8---9---10--NULL
             |
             11--12--NULL

Output: 1-2-3-7-8-11-12-9-10-4-5-6
```

**Example 2:**
```
Input:
 1---2---NULL
 |
 3---NULL

Output: 1-3-2
```

## Constraints

- The number of nodes will not exceed 1000
- Node values are in range [1, 10^6]

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Challenge

**Question to ask yourself:** "When I encounter a child, what order should I process?"

Key insight: When we see a child, we should:
1. Insert the entire child branch BETWEEN current and next
2. Then continue from where we left off

### Step 2: Identify the Pattern

**Key insight:** This is a **DFS Traversal** problem because:
- When we encounter a child, we go "deeper" first
- Similar to tree pre-order traversal
- Can be solved iteratively with a stack or recursively

### Step 3: The Algorithm

```
1. Traverse the list
2. When we find a node with a child:
   a. Save the next node (to reconnect later)
   b. Connect current to child
   c. Find the tail of the child branch
   d. Connect tail to the saved next
3. Continue until done
```

---

## Visual Diagram: How It Works

### Input Structure (3 Levels)

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

<div style="margin-bottom: 10px; color: #6c757d;"><strong>Level 1:</strong></div>
<div style="display: flex; align-items: center; gap: 5px; margin-bottom: 20px;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border-bottom: 3px solid #28a745;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">6</span>
</div>

<div style="margin-left: 130px; color: #28a745; font-size: 16px;">&#8595; child</div>

<div style="margin-bottom: 10px; color: #6c757d; margin-left: 100px;"><strong>Level 2:</strong></div>
<div style="display: flex; align-items: center; gap: 5px; margin-bottom: 20px; margin-left: 100px;">
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">7</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border-bottom: 3px solid #ffc107;">8</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">9</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">10</span>
</div>

<div style="margin-left: 170px; color: #ffc107; font-size: 16px;">&#8595; child</div>

<div style="margin-bottom: 10px; color: #6c757d; margin-left: 140px;"><strong>Level 3:</strong></div>
<div style="display: flex; align-items: center; gap: 5px; margin-left: 140px;">
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">11</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">12</span>
</div>

</div>

### Step-by-Step Flattening

**Step 1:** Traverse until we find a child (at node 3)

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #dc3545;">3</span>
<span style="color: #dc3545; font-weight: bold;">&#8592; has child!</span>
</div>

<div style="background: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Action:</strong> Save node 4, connect 3 -> 7, find tail of child branch
</div>

**Step 2:** Connect node 3 to child (node 7)

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #28a745; font-size: 20px;">&#8596;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">7</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #dc3545;">8</span>
<span style="color: #dc3545; font-weight: bold;">&#8592; has child!</span>
</div>

**Step 3:** Process node 8's child (nodes 11, 12)

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">...</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">8</span>
<span style="color: #ffc107; font-size: 20px;">&#8596;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">11</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">12</span>
<span style="color: #28a745; font-size: 20px;">&#8596;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">9</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">10</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">...</span>
</div>

### Final Flattened Result

<div style="display: flex; align-items: center; gap: 3px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 8px 14px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 16px;">&#8596;</span>
<span style="background: #007bff; color: white; padding: 8px 14px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 16px;">&#8596;</span>
<span style="background: #007bff; color: white; padding: 8px 14px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 16px;">&#8596;</span>
<span style="background: #28a745; color: white; padding: 8px 14px; border-radius: 8px; font-weight: bold; font-family: monospace;">7</span>
<span style="color: #6c757d; font-size: 16px;">&#8596;</span>
<span style="background: #28a745; color: white; padding: 8px 14px; border-radius: 8px; font-weight: bold; font-family: monospace;">8</span>
<span style="color: #6c757d; font-size: 16px;">&#8596;</span>
<span style="background: #ffc107; color: black; padding: 8px 14px; border-radius: 8px; font-weight: bold; font-family: monospace;">11</span>
<span style="color: #6c757d; font-size: 16px;">&#8596;</span>
<span style="background: #ffc107; color: black; padding: 8px 14px; border-radius: 8px; font-weight: bold; font-family: monospace;">12</span>
<span style="color: #6c757d; font-size: 16px;">&#8596;</span>
<span style="background: #28a745; color: white; padding: 8px 14px; border-radius: 8px; font-weight: bold; font-family: monospace;">9</span>
<span style="color: #6c757d; font-size: 16px;">&#8596;</span>
<span style="background: #28a745; color: white; padding: 8px 14px; border-radius: 8px; font-weight: bold; font-family: monospace;">10</span>
<span style="color: #6c757d; font-size: 16px;">&#8596;</span>
<span style="background: #007bff; color: white; padding: 8px 14px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 16px;">&#8596;</span>
<span style="background: #007bff; color: white; padding: 8px 14px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 16px;">&#8596;</span>
<span style="background: #007bff; color: white; padding: 8px 14px; border-radius: 8px; font-weight: bold; font-family: monospace;">6</span>
</div>

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Output: 1 - 2 - 3 - 7 - 8 - 11 - 12 - 9 - 10 - 4 - 5 - 6</strong><br>
All child pointers are now null!
</div>

---

## Solution Approaches

### Approach 1: Iterative with Stack - RECOMMENDED

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(depth) |

**Why this is best:**
- Clear iterative logic
- Stack naturally handles nesting
- Easy to understand

### Approach 2: Iterative without Stack

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**When to use:** When space is critical.

### Approach 3: Recursive DFS

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(depth) |

**When to use:** More intuitive recursive thinking.

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| Stack-based | O(n) | O(depth) | BEST |
| No Stack | O(n) | O(1) | Memory constrained |
| Recursive | O(n) | O(depth) | Intuitive |
