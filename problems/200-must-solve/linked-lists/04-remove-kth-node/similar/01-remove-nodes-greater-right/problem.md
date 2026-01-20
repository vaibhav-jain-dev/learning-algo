# Remove Nodes With Greater Value on Right

**Difficulty:** Medium

## Problem Statement

Given the head of a singly linked list, remove all nodes that have a node with a **strictly greater value** anywhere to their right side.

Return the head of the modified linked list.

## Examples

**Example 1:**
```
Input: 5 -> 2 -> 13 -> 3 -> 8
Output: 13 -> 8
Explanation:
- 5 is removed because 13 > 5 is on its right
- 2 is removed because 13 > 2 is on its right
- 13 is kept (no greater value on right)
- 3 is removed because 8 > 3 is on its right
- 8 is kept (no nodes on right)
```

**Example 2:**
```
Input: 1 -> 1 -> 1 -> 1
Output: 1 -> 1 -> 1 -> 1
Explanation: No node has a strictly greater value on its right.
```

**Example 3:**
```
Input: 5 -> 4 -> 3 -> 2 -> 1
Output: 5 -> 4 -> 3 -> 2 -> 1
Explanation: Strictly decreasing list, all nodes kept.
```

**Example 4:**
```
Input: 1 -> 2 -> 3 -> 4 -> 5
Output: 5
Explanation: All nodes except the last are removed.
```

## Constraints

- Number of nodes: [1, 10^5]
- Node values: [1, 10^5]

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Challenge

**Question to ask yourself:** "How do I efficiently know the maximum value to the right of each node?"

Naive approach: For each node, scan all nodes to its right - O(n^2).
Better approach: Process from right to left, tracking the running maximum.

### Step 2: Identify the Pattern

**Key insight:** This is a **Reverse Traversal + Monotonic Stack** problem because:
- We need information from the right side
- Process in reverse order (or reverse the list)
- Keep track of maximum value seen so far

### Step 3: Key Techniques

1. **Reverse the list**, process left-to-right (now seeing right-to-left), then reverse again
2. **Use recursion** - process right subtree first, then decide about current node
3. **Stack-based** - push all nodes, pop and build result

---

## Visual Diagram: How It Works

### Input List

<div style="display: flex; align-items: center; gap: 5px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">13</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">8</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Green</span> = Keep (no greater value on right)
<br><br>
<span style="background: #dc3545; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Red</span> = Remove (has greater value on right)
</div>

### Step-by-Step: Process Right to Left

**Step 1:** Start from rightmost node (8)

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">13</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #1e7e34;">8</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Max from right:</strong> 8<br>
<strong>8 >= 8:</strong> KEEP (nothing greater on right)
</div>

**Step 2:** Process node 3

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">13</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #b02a37;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">8</span>
</div>

<div style="background: #f8d7da; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Max from right:</strong> 8<br>
<strong>3 < 8:</strong> REMOVE (8 > 3 on its right)
</div>

**Step 3:** Process node 13

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #1e7e34;">13</span>
<span style="color: #6c757d; font-size: 20px;"> </span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; opacity: 0.4; text-decoration: line-through;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">8</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Max from right:</strong> 8<br>
<strong>13 >= 8:</strong> KEEP (no greater value on right)<br>
<strong>Update max:</strong> 13
</div>

**Step 4:** Process remaining nodes (5 and 2)

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; text-decoration: line-through;">5</span>
<span style="color: #6c757d; font-size: 20px;"> </span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; text-decoration: line-through;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">13</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">8</span>
</div>

<div style="background: #f8d7da; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Max from right:</strong> 13<br>
<strong>5 < 13 and 2 < 13:</strong> Both REMOVED
</div>

### Final Result

<div style="display: flex; align-items: center; gap: 5px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">13</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">8</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Output: 13 -> 8</strong>
</div>

---

## Solution Approaches

### Approach 1: Reverse, Filter, Reverse - RECOMMENDED

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Why this is best:**
- O(1) extra space
- Three simple passes, each O(n)
- Easy to understand and implement

### Approach 2: Recursion (Process Right First)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) recursion stack |

**When to use:** When list is not too deep.

### Approach 3: Stack-Based

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**When to use:** When you prefer iterative with explicit stack.

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| Reverse-Filter-Reverse | O(n) | O(1) | BEST |
| Recursion | O(n) | O(n) | Simple, but stack limited |
| Stack | O(n) | O(n) | Clear logic |

