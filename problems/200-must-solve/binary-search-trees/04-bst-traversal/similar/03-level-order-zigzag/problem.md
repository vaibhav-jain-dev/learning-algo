<div id="viz-config" style="display:none">
{"name":"Binary Tree Zigzag Level Order Traversal","algorithm":"bst-traversal","complexity":{"time":"O(n)","space":"O(n)"},"examples":[{"input":{"tree":[3,9,20,null,null,15,7]},"output":[[3],[20,9],[15,7]],"inputRaw":"tree = [3,9,20,null,null,15,7]","outputRaw":"[[3], [20, 9], [15, 7]]"},{"input":{"tree":[1,2,3,4,5,6,7]},"output":[[1],[3,2],[4,5,6,7]],"inputRaw":"tree = [1,2,3,4,5,6,7]","outputRaw":"[[1], [3, 2], [4, 5, 6, 7]]"}]}
</div>

# Binary Tree Zigzag Level Order Traversal

**Difficulty:** Medium

## Problem Statement

Given the root of a binary tree, return the **zigzag level order traversal** of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

## Examples

**Example 1:**
```
Input: root = [3, 9, 20, null, null, 15, 7]
      3
     / \
    9  20
       / \
      15  7

Output: [[3], [20, 9], [15, 7]]

Explanation:
- Level 0: left to right  -> [3]
- Level 1: right to left  -> [20, 9]
- Level 2: left to right  -> [15, 7]
```

**Example 2:**
```
Input: root = [1, 2, 3, 4, 5, 6, 7]
         1
        / \
       2   3
      / \ / \
     4  5 6  7

Output: [[1], [3, 2], [4, 5, 6, 7]]
```

**Example 3:**
```
Input: root = [1]
Output: [[1]]
```

## Constraints

- The number of nodes in the tree is in the range `[0, 2000]`
- `-100 <= Node.val <= 100`

---

## Visual Diagram: How It Works

### Input Tree

<div style="background: #fff; padding: 20px; border-radius: 8px; margin: 10px 0; text-align: center;">
<table style="margin: 0 auto; border-collapse: collapse;">
<tr>
<td colspan="7" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #007bff; color: white; line-height: 45px; font-weight: bold;">1</div>
<div style="font-size: 11px; color: #007bff;">Level 0</div>
</td>
</tr>
<tr>
<td colspan="3" style="text-align: right; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold;">2</div>
</td>
<td style="width: 40px;"></td>
<td colspan="3" style="text-align: left; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold;">3</div>
</td>
</tr>
<tr>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #ffc107; color: black; line-height: 40px; font-weight: bold;">4</div>
</td>
<td style="width: 20px;"></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #ffc107; color: black; line-height: 40px; font-weight: bold;">5</div>
</td>
<td style="width: 40px;"></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #ffc107; color: black; line-height: 40px; font-weight: bold;">6</div>
</td>
<td style="width: 20px;"></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #ffc107; color: black; line-height: 40px; font-weight: bold;">7</div>
</td>
</tr>
</table>
<div style="margin-top: 15px; font-size: 12px;">
<span style="background: #007bff; color: white; padding: 3px 10px; border-radius: 5px;">Level 0</span>
<span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 5px;">Level 1</span>
<span style="background: #ffc107; color: black; padding: 3px 10px; border-radius: 5px;">Level 2</span>
</div>
</div>

### Zigzag Direction Pattern

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #e9ecef;">
<th style="padding: 10px;">Level</th>
<th style="padding: 10px;">Direction</th>
<th style="padding: 10px;">Nodes (Natural Order)</th>
<th style="padding: 10px;">Zigzag Output</th>
</tr>
<tr style="background: #cce5ff;">
<td style="padding: 10px; text-align: center;">0</td>
<td style="padding: 10px;"><span style="color: #007bff;">Left -> Right</span></td>
<td style="padding: 10px;">[1]</td>
<td style="padding: 10px; font-weight: bold;">[1]</td>
</tr>
<tr style="background: #d4edda;">
<td style="padding: 10px; text-align: center;">1</td>
<td style="padding: 10px;"><span style="color: #28a745;">Right -> Left</span></td>
<td style="padding: 10px;">[2, 3]</td>
<td style="padding: 10px; font-weight: bold;">[3, 2]</td>
</tr>
<tr style="background: #fff3cd;">
<td style="padding: 10px; text-align: center;">2</td>
<td style="padding: 10px;"><span style="color: #856404;">Left -> Right</span></td>
<td style="padding: 10px;">[4, 5, 6, 7]</td>
<td style="padding: 10px; font-weight: bold;">[4, 5, 6, 7]</td>
</tr>
</table>
</div>

### Step-by-Step BFS with Zigzag

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #e9ecef;">
<th style="padding: 10px;">Step</th>
<th style="padding: 10px;">Queue State</th>
<th style="padding: 10px;">Processing</th>
<th style="padding: 10px;">Level Result</th>
</tr>
<tr>
<td style="padding: 10px;">1</td>
<td style="padding: 10px;"><span style="background: #007bff; color: white; padding: 2px 8px; border-radius: 3px;">1</span></td>
<td style="padding: 10px;">Dequeue 1, enqueue 2, 3</td>
<td style="padding: 10px;">[1] (L->R)</td>
</tr>
<tr>
<td style="padding: 10px;">2</td>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 3px;">2</span> <span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 3px;">3</span></td>
<td style="padding: 10px;">Dequeue 2 & 3, enqueue children</td>
<td style="padding: 10px;">[3, 2] (R->L)</td>
</tr>
<tr>
<td style="padding: 10px;">3</td>
<td style="padding: 10px;"><span style="background: #ffc107; color: black; padding: 2px 8px; border-radius: 3px;">4</span> <span style="background: #ffc107; color: black; padding: 2px 8px; border-radius: 3px;">5</span> <span style="background: #ffc107; color: black; padding: 2px 8px; border-radius: 3px;">6</span> <span style="background: #ffc107; color: black; padding: 2px 8px; border-radius: 3px;">7</span></td>
<td style="padding: 10px;">Dequeue all 4 nodes</td>
<td style="padding: 10px;">[4, 5, 6, 7] (L->R)</td>
</tr>
</table>
</div>

### Final Result

<div style="background: #d4edda; padding: 15px; border-radius: 8px; margin: 10px 0; text-align: center;">
<p style="font-weight: bold; color: #155724;">Zigzag Level Order Traversal:</p>
<div style="margin: 10px 0;">
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px; margin: 5px;">[1]</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px; margin: 5px;">[3, 2]</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px; margin: 5px;">[4, 5, 6, 7]</span>
</div>
</div>

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How is this different from regular level order traversal?"

Key observations:
- Same BFS traversal, just alternate direction each level
- Even levels: left to right
- Odd levels: right to left

### Step 2: Identify the Pattern

**Pattern:** This is "Level Order Traversal with Direction Toggle"

Two approaches to handle direction:
1. **Reverse on odd levels:** Collect normally, reverse if needed
2. **Deque with direction-aware insertion:** Insert at front or back based on direction

### Step 3: Choose Your Strategy

**Strategy A (Simple - Post-process):**
- Standard BFS level order
- Reverse alternate levels after collection

**Strategy B (Efficient - Direction-aware):**
- Use deque for current level
- Add to front or back based on direction flag

---

## Solution Approaches

### Approach 1: BFS with Reverse

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**Why this works:**
- Simple to implement
- Reversing a level is O(level_size)
- Total reversal cost is still O(n)

### Approach 2: BFS with Deque Direction Control

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**Why this might be preferred:**
- No extra reversal step
- Slightly more elegant

### Approach 3: Two Stacks (Alternative)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**Interesting approach:**
- Use two stacks alternating
- Natural reversal through stack LIFO property
