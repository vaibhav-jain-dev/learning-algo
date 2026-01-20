# Copy List with Random Pointer

**Difficulty:** Medium

## Problem Statement

A linked list of length `n` is given such that each node contains an additional **random pointer**, which could point to any node in the list, or `null`.

Construct a **deep copy** of the list. The deep copy should consist of exactly `n` brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the `next` and `random` pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state.

None of the pointers in the new list should point to nodes in the original list.

## Examples

**Example 1:**
```
Input: [[7,null],[13,0],[11,4],[10,2],[1,0]]
       (Each element is [val, random_index])
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
```

**Example 2:**
```
Input: [[1,1],[2,1]]
Output: [[1,1],[2,1]]
Explanation: Node 0's random points to node 1
             Node 1's random also points to node 1
```

**Example 3:**
```
Input: [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]
```

## Constraints

- 0 <= n <= 1000
- -10^4 <= Node.val <= 10^4
- random is null or points to a node in the list

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Challenge

**Question to ask yourself:** "Why can't we just traverse and copy like a regular list?"

The problem: Random pointers can point to nodes we haven't created yet!
If node 1's random points to node 5, we need node 5 to exist before we can set the random pointer.

### Step 2: Identify the Pattern

**Key insight:** This is a **Node Mapping** problem because:
- We need to map original nodes to their copies
- When setting random pointers, we look up the mapped copy

**Two approaches:**
1. **Hash Map:** Map old nodes to new nodes
2. **Interleaving:** Weave new nodes between old ones

### Step 3: The Algorithm (Hash Map Approach)

```
1. First pass: Create all new nodes, map old -> new
2. Second pass: Set next and random pointers using the map
3. Return the copy of head
```

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>[[7,null],[13,0],[11,4],[10,2],[1,0]]</code>
</div>

### Original List Structure

<div style="display: flex; flex-direction: column; gap: 20px; margin: 20px 0;">
<div style="display: flex; align-items: center; gap: 5px; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 12px 20px; border-radius: 8px; font-weight: bold; font-family: monospace; min-width: 40px; text-align: center;">7</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 12px 20px; border-radius: 8px; font-weight: bold; font-family: monospace; min-width: 40px; text-align: center;">13</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 12px 20px; border-radius: 8px; font-weight: bold; font-family: monospace; min-width: 40px; text-align: center;">11</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 12px 20px; border-radius: 8px; font-weight: bold; font-family: monospace; min-width: 40px; text-align: center;">10</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 12px 20px; border-radius: 8px; font-weight: bold; font-family: monospace; min-width: 40px; text-align: center;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>
</div>

### Random Pointer Visualization

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
<div style="display: flex; justify-content: space-around; margin-bottom: 15px;">
<div style="text-align: center;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold;">7</span>
<div style="margin-top: 5px; color: #6c757d; font-size: 12px;">random: null</div>
</div>
<div style="text-align: center;">
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold;">13</span>
<div style="margin-top: 5px; color: #28a745; font-size: 12px;">random: 7</div>
</div>
<div style="text-align: center;">
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold;">11</span>
<div style="margin-top: 5px; color: #dc3545; font-size: 12px;">random: 1</div>
</div>
<div style="text-align: center;">
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold;">10</span>
<div style="margin-top: 5px; color: #ffc107; font-size: 12px;">random: 11</div>
</div>
<div style="text-align: center;">
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold;">1</span>
<div style="margin-top: 5px; color: #007bff; font-size: 12px;">random: 7</div>
</div>
</div>
</div>

### Step-by-Step: Hash Map Approach

**Step 1:** Create mapping (old node -> new node)

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>HashMap Contents:</strong><br><br>
<table style="border-collapse: collapse; margin: 10px 0;">
<tr style="background: #dee2e6;">
<th style="border: 1px solid #adb5bd; padding: 8px;">Original Node</th>
<th style="border: 1px solid #adb5bd; padding: 8px;">New Copy</th>
</tr>
<tr>
<td style="border: 1px solid #adb5bd; padding: 8px; text-align: center;">Node(7)</td>
<td style="border: 1px solid #adb5bd; padding: 8px; text-align: center;">Node'(7)</td>
</tr>
<tr>
<td style="border: 1px solid #adb5bd; padding: 8px; text-align: center;">Node(13)</td>
<td style="border: 1px solid #adb5bd; padding: 8px; text-align: center;">Node'(13)</td>
</tr>
<tr>
<td style="border: 1px solid #adb5bd; padding: 8px; text-align: center;">Node(11)</td>
<td style="border: 1px solid #adb5bd; padding: 8px; text-align: center;">Node'(11)</td>
</tr>
<tr>
<td style="border: 1px solid #adb5bd; padding: 8px; text-align: center;">Node(10)</td>
<td style="border: 1px solid #adb5bd; padding: 8px; text-align: center;">Node'(10)</td>
</tr>
<tr>
<td style="border: 1px solid #adb5bd; padding: 8px; text-align: center;">Node(1)</td>
<td style="border: 1px solid #adb5bd; padding: 8px; text-align: center;">Node'(1)</td>
</tr>
</table>
</div>

**Step 2:** Connect pointers in copied list

<div style="background: #d4edda; padding: 15px; border-radius: 8px; margin: 15px 0;">
For each original node:<br>
<code>copy.next = map[original.next]</code><br>
<code>copy.random = map[original.random]</code>
</div>

### Interleaving Approach Visualization

**Step 1:** Weave new nodes into original list

<div style="display: flex; align-items: center; gap: 3px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 8px; font-weight: bold; font-family: monospace;">7</span>
<span style="color: #6c757d; font-size: 16px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 2px dashed white;">7'</span>
<span style="color: #6c757d; font-size: 16px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 8px; font-weight: bold; font-family: monospace;">13</span>
<span style="color: #6c757d; font-size: 16px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 2px dashed white;">13'</span>
<span style="color: #6c757d; font-size: 16px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 8px; font-weight: bold; font-family: monospace;">11</span>
<span style="color: #6c757d; font-size: 16px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 2px dashed black;">11'</span>
<span style="color: #6c757d; font-size: 16px;">&#8594;</span>
<span style="color: #6c757d;">...</span>
</div>

<div style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">
<span style="border: 2px dashed #6c757d; padding: 2px 6px; border-radius: 4px; margin-right: 5px;">Dashed</span> = Newly created copy nodes
</div>

**Step 2:** Set random pointers

<div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>Key insight:</strong> <code>copy.random = original.random.next</code><br>
Because each copy is placed right after its original!
</div>

**Step 3:** Separate the two lists

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Result: Deep copy with all pointers correctly set!</strong>
</div>

---

## Solution Approaches

### Approach 1: Hash Map (Two Pass) - RECOMMENDED

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**Why this is best:**
- Clear and intuitive
- Easy to understand and implement
- Works for any graph-like structure

### Approach 2: Interleaving (O(1) Space)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**When to use:** When space is a constraint.

### Approach 3: Recursive with Memoization

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**When to use:** More intuitive for tree-like thinking.

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| Hash Map | O(n) | O(n) | BEST for clarity |
| Interleaving | O(n) | O(1) | BEST for space |
| Recursive | O(n) | O(n) | Intuitive |
