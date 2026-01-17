# Remove Duplicates Keeping At Most K Occurrences

**Difficulty:** Hard

## Problem Statement

Given the head of a **sorted** linked list and an integer `k`, remove duplicates such that each element appears at most `k` times. Return the linked list sorted.

## Examples

**Example 1:**
```
Input: 1 -> 1 -> 1 -> 2 -> 2 -> 3, k = 2
Output: 1 -> 1 -> 2 -> 2 -> 3
Explanation: Keep at most 2 of each value.
```

**Example 2:**
```
Input: 1 -> 1 -> 1 -> 1 -> 2 -> 2 -> 2, k = 1
Output: 1 -> 2
Explanation: k=1 means keep only unique values.
```

**Example 3:**
```
Input: 1 -> 2 -> 3 -> 3 -> 3 -> 3 -> 4, k = 3
Output: 1 -> 2 -> 3 -> 3 -> 3 -> 4
Explanation: Only node with value 3 had more than 3 occurrences.
```

## Constraints

- The number of nodes is in range [0, 300]
- Node values are in range [-100, 100]
- List is sorted in ascending order
- 1 <= k <= 100

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Challenge

**Question to ask yourself:** "How do I track occurrences of the current value?"

Since the list is sorted:
- Same values are contiguous
- We can count as we traverse
- When count exceeds k, skip the node

### Step 2: Identify the Pattern

**Key insight:** This is a **Counting with Sliding Window** pattern:
- Track the current value and its count
- Reset count when value changes
- Skip nodes when count > k

### Step 3: The Algorithm

```
1. Use dummy node (first node might be removed if k=0)
2. Track: current value being counted, count of that value
3. For each node:
   - If same value as previous: increment count
   - If different value: reset count to 1
   - If count <= k: keep node (move prev forward)
   - If count > k: skip node (don't move prev)
```

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>1 -> 1 -> 1 -> 2 -> 2 -> 3</code>, k = 2
</div>

### Linked List with Occurrence Count

<div style="display: flex; align-items: center; gap: 5px; margin: 20px 0; flex-wrap: wrap;">
<div style="display: flex; flex-direction: column; align-items: center;">
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="font-size: 12px; color: #6c757d;">#1</span>
</div>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<div style="display: flex; flex-direction: column; align-items: center;">
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="font-size: 12px; color: #6c757d;">#2</span>
</div>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<div style="display: flex; flex-direction: column; align-items: center;">
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; text-decoration: line-through;">1</span>
<span style="font-size: 12px; color: #dc3545;">#3 > k!</span>
</div>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<div style="display: flex; flex-direction: column; align-items: center;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="font-size: 12px; color: #6c757d;">#1</span>
</div>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<div style="display: flex; flex-direction: column; align-items: center;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="font-size: 12px; color: #6c757d;">#2</span>
</div>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<div style="display: flex; flex-direction: column; align-items: center;">
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="font-size: 12px; color: #6c757d;">#1</span>
</div>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Green</span> = Keep (count <= k)
<br><br>
<span style="background: #dc3545; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px; text-decoration: line-through;">Red</span> = Remove (count > k)
</div>

### Step-by-Step Execution

**Step 1:** Process first 1 (count = 1)

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 2px dashed;">D</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #1e7e34;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">...</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Value:</strong> 1 | <strong>Count:</strong> 1 | <strong>k:</strong> 2<br>
<strong>Action:</strong> 1 <= 2, KEEP this node, move prev forward
</div>

**Step 2:** Process second 1 (count = 2)

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 2px dashed;">D</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #1e7e34;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">...</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Value:</strong> 1 | <strong>Count:</strong> 2 | <strong>k:</strong> 2<br>
<strong>Action:</strong> 2 <= 2, KEEP this node, move prev forward
</div>

**Step 3:** Process third 1 (count = 3) - EXCEEDS K!

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">D</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #0056b3;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">...</span>
</div>

<div style="background: #f8d7da; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Value:</strong> 1 | <strong>Count:</strong> 3 | <strong>k:</strong> 2<br>
<strong>Action:</strong> 3 > 2, SKIP this node! Connect prev.next to node after.
</div>

**Step 4:** Process 2 (new value, count resets to 1)

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">D</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #0056b3;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Value:</strong> 2 (NEW!) | <strong>Count:</strong> 1 | <strong>k:</strong> 2<br>
<strong>Action:</strong> 1 <= 2, KEEP this node
</div>

### Final Result

<div style="display: flex; align-items: center; gap: 5px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Output: 1 -> 1 -> 2 -> 2 -> 3</strong><br>
Each value appears at most k=2 times!
</div>

---

## Solution Approaches

### Approach 1: Single Pass with Counter - RECOMMENDED

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Why this is best:**
- Single traversal
- No extra data structures
- Elegant counting logic

### Approach 2: Two Pointers (Look-Ahead)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**When to use:** Alternative perspective on the same problem.

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| Counter-based | O(n) | O(1) | BEST |
| Look-ahead | O(n) | O(1) | Alternative |
