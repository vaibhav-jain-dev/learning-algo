# Reverse Alternating K Nodes

**Difficulty:** Hard

## Problem Statement

Given the head of a linked list and an integer `k`, reverse the first `k` nodes, then skip the next `k` nodes, then reverse the next `k` nodes, and so on.

If there are fewer than `k` nodes remaining (either for reversing or skipping), handle them accordingly:
- If reversing: reverse all remaining nodes
- If skipping: skip all remaining nodes

## Examples

**Example 1:**
```
Input: head = [1,2,3,4,5,6,7,8], k = 2
Output: [2,1,3,4,6,5,7,8]
Explanation:
- Reverse first 2: [1,2] -> [2,1]
- Skip next 2: [3,4] stays [3,4]
- Reverse next 2: [5,6] -> [6,5]
- Skip next 2: [7,8] stays [7,8]
```

**Example 2:**
```
Input: head = [1,2,3,4,5,6,7,8,9,10], k = 3
Output: [3,2,1,4,5,6,9,8,7,10]
Explanation:
- Reverse first 3: [1,2,3] -> [3,2,1]
- Skip next 3: [4,5,6] stays [4,5,6]
- Reverse next 3: [7,8,9] -> [9,8,7]
- Skip remaining: [10] stays [10]
```

**Example 3:**
```
Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]
Explanation:
- Reverse first 3: [1,2,3] -> [3,2,1]
- Skip next 2: [4,5] stays [4,5] (less than k nodes)
```

## Constraints

- Number of nodes: [1, 10^4]
- Node values: [1, 10^5]
- 1 <= k <= n

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Challenge

**Question to ask yourself:** "How do I alternate between reversing and skipping?"

Key operations needed:
1. Reverse k nodes (or remaining if < k)
2. Skip k nodes (or remaining if < k)
3. Alternate between these operations
4. Properly connect segments

### Step 2: Identify the Pattern

**Key insight:** This is an **Alternating Group Operations** problem:
- Similar to "Reverse K Group" but with skip phase
- Need state to track whether we're reversing or skipping
- Handle partial groups at the end

### Step 3: Key Techniques

1. **Iterative with flag**: Toggle between reverse and skip modes
2. **Recursive**: Process one reverse+skip cycle, recurse
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
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">7</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">8</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">9</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">10</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Green</span> = Reverse (1st group)
<span style="background: #ffc107; color: black; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Yellow</span> = Skip (2nd group)
<span style="background: #17a2b8; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Cyan</span> = Reverse (3rd group)
<span style="background: #dc3545; color: white; padding: 3px 8px; border-radius: 4px; margin-right: 10px;">Red</span> = Skip (partial)
</div>

### Step-by-Step Execution

**Step 1:** Reverse first k=3 nodes

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #28a745; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #28a745; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">6</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">7</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">...</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>REVERSE:</strong> [1,2,3] &#8594; [3,2,1]
</div>

**Step 2:** Skip next k=3 nodes

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px dashed #d39e00;">4</span>
<span style="color: #ffc107; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px dashed #d39e00;">5</span>
<span style="color: #ffc107; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace; border: 3px dashed #d39e00;">6</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">7</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #6c757d; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">...</span>
</div>

<div style="background: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>SKIP:</strong> [4,5,6] stays unchanged
</div>

**Step 3:** Reverse next k=3 nodes

<div style="display: flex; align-items: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">6</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">9</span>
<span style="color: #17a2b8; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">8</span>
<span style="color: #17a2b8; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">7</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">10</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>REVERSE:</strong> [7,8,9] &#8594; [9,8,7]
</div>

**Step 4:** Skip remaining node (partial group)

<div style="background: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>SKIP:</strong> [10] stays unchanged (less than k nodes)
</div>

### Final Result

<div style="display: flex; align-items: center; gap: 5px; margin: 20px 0; flex-wrap: wrap;">
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">3</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">2</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #28a745; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">1</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">4</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">5</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #ffc107; color: black; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">6</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">9</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">8</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #17a2b8; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">7</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="background: #dc3545; color: white; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-family: monospace;">10</span>
<span style="color: #6c757d; font-size: 20px;">&#8594;</span>
<span style="color: #6c757d; font-style: italic;">null</span>
</div>

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Output: 3 -> 2 -> 1 -> 4 -> 5 -> 6 -> 9 -> 8 -> 7 -> 10</strong>
</div>

---

## Solution Approaches

### Approach 1: Iterative with Toggle - RECOMMENDED

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Why this is best:**
- Single pass through the list
- Constant extra space
- Clear alternating logic

### Approach 2: Recursive

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n/k) recursion stack |

**When to use:** When recursive logic feels more natural.

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| Iterative Toggle | O(n) | O(1) | BEST |
| Recursive | O(n) | O(n/k) | Alternative |

