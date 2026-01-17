# Remove All Nodes with Duplicate Values

**Difficulty:** Medium

## Problem Statement

Given the head of a **sorted** linked list, delete all nodes that have duplicate values, leaving only **distinct** values from the original list. Return the linked list sorted as well.

**Key Difference:** Remove ALL occurrences of duplicated values, not just the extras.

## Examples

**Example 1:**
```
Input: 1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5
Output: 1 -> 2 -> 5
Explanation: 3 and 4 appear more than once, remove ALL occurrences.
```

**Example 2:**
```
Input: 1 -> 1 -> 1 -> 2 -> 3
Output: 2 -> 3
Explanation: 1 appears multiple times, remove all 1s.
```

**Example 3:**
```
Input: 1 -> 1 -> 2 -> 2
Output: empty
Explanation: All values are duplicated.
```

## Constraints

- The number of nodes is in range [0, 300]
- Node values are in range [-100, 100]
- List is sorted in ascending order

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Challenge

**Question to ask yourself:** "How is this different from regular duplicate removal?"

Regular: Keep first occurrence, remove extras.
This problem: If any duplicates exist, remove ALL including the first!

### Step 2: Identify the Pattern

**Key insight:** This requires a **Dummy Node Pattern** because:
- The head itself might need to be deleted
- We need to track the node BEFORE a sequence of duplicates
- Sorted list means duplicates are contiguous

### Step 3: The Algorithm

```
1. Use dummy node pointing to head
2. For each node, check if next nodes have same value
3. If duplicates found, skip ALL nodes with that value
4. Otherwise, move forward normally
```

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5</code>
</div>

### Initial State with Dummy Node

<div style="display: flex; align-items: center; gap: 5px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 2px dashed #495057;">D</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">
<span style="background: #6c757d; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px; border: 2px dashed #495057;">D</span> = Dummy node
<br><br>
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Green</span> = Unique values (keep)
<br><br>
<span style="background: #dc3545; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Red</span> = Duplicated values (remove ALL)
</div>

### Step-by-Step Execution

**Step 1:** Check node 1 - unique, keep it

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #0056b3;">D</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">...</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Check:</strong> 1 != 2 (next value)<br>
<strong>Action:</strong> 1 is unique, move prev forward
</div>

**Step 2:** Check node 2 - unique, keep it

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">D</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #0056b3;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">...</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Check:</strong> 2 != 3 (next value)<br>
<strong>Action:</strong> 2 is unique, move prev forward
</div>

**Step 3:** Check node 3 - DUPLICATE FOUND!

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">D</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #0056b3;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">...</span>
</div>

<div style="background: #f8d7da; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Check:</strong> 3 == 3 (next value) - DUPLICATE!<br>
<strong>Action:</strong> Skip ALL nodes with value 3, connect 2 directly to 4
</div>

**After skipping 3s:**

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">D</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #007bff; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px solid #0056b3;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

**Step 4:** Check 4 - DUPLICATE FOUND! Skip all 4s.

### Final Result

<div style="display: flex; align-items: center; gap: 5px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Output: 1 -> 2 -> 5</strong><br>
All duplicated values (3, 4) completely removed!
</div>

---

## Solution Approaches

### Approach 1: Dummy Node with Skip Pattern - RECOMMENDED

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Why this is best:**
- Handles head deletion cleanly
- Single pass through the list
- Constant extra space

### Approach 2: Two Pass (Count then Remove)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**When to use:** When logic clarity is more important than space.

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| Dummy Node + Skip | O(n) | O(1) | BEST |
| Two Pass | O(n) | O(n) | More intuitive |
