<div id="viz-config" style="display:none">
{"name":"Reverse Linked List in Groups of K","algorithm":"ll-reverse","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"list":[1,2,3,4,5],"k":2},"output":[2,1,4,3,5],"inputRaw":"[1,2,3,4,5], k = 2","outputRaw":"[2,1,4,3,5]"},{"input":{"list":[1,2,3,4,5],"k":3},"output":[3,2,1,4,5],"inputRaw":"[1,2,3,4,5], k = 3","outputRaw":"[3,2,1,4,5]"},{"input":{"list":[1,2,3,4,5,6,7,8],"k":3},"output":[3,2,1,6,5,4,7,8],"inputRaw":"[1,2,3,4,5,6,7,8], k = 3","outputRaw":"[3,2,1,6,5,4,7,8]"}]}
</div>

# Reverse Linked List in Groups of K

**Difficulty:** Hard

## Problem Statement

Given the head of a linked list, reverse the nodes of the list `k` at a time, and return the modified list.

`k` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of `k`, the left-out nodes at the end should remain as they are.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

## Examples

**Example 1:**
```
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
Explanation: Reverse in groups of 2
```

**Example 2:**
```
Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]
Explanation: Reverse first 3, leave remaining 2 as-is
```

**Example 3:**
```
Input: head = [1,2,3,4,5,6,7,8], k = 3
Output: [3,2,1,6,5,4,7,8]
Explanation: Reverse [1,2,3] -> [3,2,1], [4,5,6] -> [6,5,4], [7,8] remains
```

## Constraints

- Number of nodes: [1, 5000]
- Node values: [0, 1000]
- 1 <= k <= n

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Challenge

**Question to ask yourself:** "How do I reverse exactly k nodes, then connect to next group?"

Key operations needed:
1. Count k nodes (check if group is complete)
2. Reverse those k nodes
3. Connect reversed group to next group
4. Repeat

### Step 2: Identify the Pattern

**Key insight:** This is a **Iterative Group Reversal** problem because:
- Each group is reversed independently
- Need to track group boundaries
- Handle edge case of incomplete last group

### Step 3: Key Techniques

1. **Iterative approach**: Use pointers to track group boundaries
2. **Recursive approach**: Reverse k, recursively handle rest
3. Use a **dummy node** to simplify head handling

---

## Visual Diagram: How It Works

### Input List (k = 3)

<div style="display: flex; align-items: center; gap: 5px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">6</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">7</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">8</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Green</span> = Group 1 (reverse)
<span style="background: #ffc107; color: black; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Yellow</span> = Group 2 (reverse)
<span style="background: #dc3545; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Red</span> = Remaining (keep as-is)
</div>

### Step-by-Step: Reverse Group 1

**Step 1:** Identify first k nodes

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #1e7e34;">1</span>
<span style="color: #28a745; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #1e7e34;">2</span>
<span style="color: #28a745; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #1e7e34;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">...</span>
</div>

**Step 2:** Reverse within group

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
<span>Before:</span>
<span style="background: #28a745; color: white; padding: 5px 12px; border-radius: 4px;">1</span>
<span>&#8594;</span>
<span style="background: #28a745; color: white; padding: 5px 12px; border-radius: 4px;">2</span>
<span>&#8594;</span>
<span style="background: #28a745; color: white; padding: 5px 12px; border-radius: 4px;">3</span>
</div>
<div style="display: flex; align-items: center; gap: 10px;">
<span>After:&nbsp;</span>
<span style="background: #28a745; color: white; padding: 5px 12px; border-radius: 4px;">3</span>
<span>&#8594;</span>
<span style="background: #28a745; color: white; padding: 5px 12px; border-radius: 4px;">2</span>
<span>&#8594;</span>
<span style="background: #28a745; color: white; padding: 5px 12px; border-radius: 4px;">1</span>
</div>
</div>

**Step 3:** Connect to next group

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #28a745; font-size: 20px; font-weight: bold;">&#8594;&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">6</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">7</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">8</span>
</div>

<div style="background: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Key:</strong> Node 1 (tail of reversed group) connects to node 4 (head of next group)
</div>

### After Reversing Group 2

<div style="display: flex; align-items: center; gap: 5px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">6</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">7</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">8</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="background: #f8d7da; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Note:</strong> Remaining nodes (7, 8) are less than k=3, so they stay in original order.
</div>

### Final Result

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Output: 3 -> 2 -> 1 -> 6 -> 5 -> 4 -> 7 -> 8</strong>
</div>

---

## Solution Approaches

### Approach 1: Iterative with Dummy Node - RECOMMENDED

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Why this is best:**
- Single pass through the list
- Constant extra space
- Handles all edge cases cleanly

### Approach 2: Recursive

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n/k) recursion stack |

**When to use:** When recursive logic is clearer.

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| Iterative | O(n) | O(1) | BEST |
| Recursive | O(n) | O(n/k) | Alternative |

