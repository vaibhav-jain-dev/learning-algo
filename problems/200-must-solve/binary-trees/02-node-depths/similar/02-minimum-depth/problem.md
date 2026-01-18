# Minimum Depth of Binary Tree

**Difficulty:** Easy

## Problem Statement

Given a binary tree, find its minimum depth. The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

**Note:** A leaf is a node with no children.

## Examples

**Example 1:**
```
Input:
    3
   / \
  9  20
    /  \
   15   7

Output: 2
Explanation: Shortest path is 3 -> 9, which has 2 nodes.
```

**Example 2:**
```
Input:
  2
   \
    3
     \
      4
       \
        5
         \
          6

Output: 5
Explanation: Only path is 2 -> 3 -> 4 -> 5 -> 6
```

**Example 3:**
```
Input:
    1
   /
  2

Output: 2
Explanation: Node 1 is NOT a leaf (it has a child), so min depth is 2.
```

## Constraints

- The number of nodes in the tree is in the range [0, 100000]
- -1000 <= Node.value <= 1000

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "What makes this different from Maximum Depth?"

**Critical insight:** A node with only one child is NOT a leaf!
- For max depth: We take max of children
- For min depth: We CANNOT just take min (a null child gives 0)

### Step 2: Identify the Pattern

**Key insight:** This requires **careful handling of one-child nodes**:
- If a node has no left child, depth comes from right subtree
- If a node has no right child, depth comes from left subtree
- Only if BOTH exist do we take the minimum

### Step 3: Define the Recurrence

```
minDepth(node):
    if node is null: return 0
    if node is LEAF: return 1

    if left is null:  return 1 + minDepth(right)
    if right is null: return 1 + minDepth(left)

    return 1 + min(minDepth(left), minDepth(right))
```

---

## Visual Diagram: How It Works

### The Tricky Case

<div style="display: flex; gap: 40px; justify-content: center; margin: 20px 0;">

<div style="display: flex; flex-direction: column; align-items: center;">
<div style="font-weight: bold; color: #c62828; margin-bottom: 15px;">WRONG Approach</div>
<div style="display: flex; flex-direction: column; align-items: center;">
  <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">1</div>
  <div style="width: 2px; height: 30px; background: #667eea; margin-left: -40px; transform: rotate(-20deg);"></div>
  <div style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-left: -40px;">2</div>
</div>
<div style="background: #ffcdd2; padding: 10px; border-radius: 8px; margin-top: 15px; text-align: center;">
min(0, 1) + 1 = <strong style="color: #c62828;">1</strong><br>
<span style="font-size: 12px;">(Node 1 is NOT a leaf!)</span>
</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center;">
<div style="font-weight: bold; color: #2e7d32; margin-bottom: 15px;">CORRECT Approach</div>
<div style="display: flex; flex-direction: column; align-items: center;">
  <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">1</div>
  <div style="width: 2px; height: 30px; background: #667eea; margin-left: -40px; transform: rotate(-20deg);"></div>
  <div style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-left: -40px; border: 3px solid #ffd700;">2</div>
</div>
<div style="background: #c8e6c9; padding: 10px; border-radius: 8px; margin-top: 15px; text-align: center;">
Only right is null, use left: 1 + 1 = <strong style="color: #2e7d32;">2</strong><br>
<span style="font-size: 12px;">(Node 2 is the leaf)</span>
</div>
</div>

</div>

### Standard Example

<div style="display: flex; flex-direction: column; align-items: center; font-family: Arial, sans-serif; padding: 20px;">
  <div style="display: flex; flex-direction: column; align-items: center;">
    <!-- Root Level -->
    <div style="width: 55px; height: 55px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">3</div>

    <!-- Connectors Level 1 -->
    <div style="display: flex; width: 180px; justify-content: center; margin: 5px 0;">
      <div style="width: 2px; height: 35px; background: #4caf50; transform: rotate(-35deg); margin-right: 40px;"></div>
      <div style="width: 2px; height: 35px; background: #667eea; transform: rotate(35deg); margin-left: 40px;"></div>
    </div>

    <!-- Level 1 -->
    <div style="display: flex; gap: 80px; margin-top: 10px;">
      <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); border: 4px solid #ffd700;">9</div>
      <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">20</div>
    </div>

    <!-- Connectors Level 2 -->
    <div style="display: flex; margin-left: 90px; margin-top: 5px;">
      <div style="width: 2px; height: 35px; background: #4facfe; transform: rotate(-30deg); margin-right: 20px;"></div>
      <div style="width: 2px; height: 35px; background: #4facfe; transform: rotate(30deg); margin-left: 20px;"></div>
    </div>

    <!-- Level 2 -->
    <div style="display: flex; gap: 25px; margin-left: 90px; margin-top: 10px;">
      <div style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">15</div>
      <div style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">7</div>
    </div>
  </div>
</div>

<div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #4caf50;">
<strong>Minimum Depth = 2</strong><br>
Nearest leaf <span style="border: 4px solid #ffd700; padding: 2px 8px; border-radius: 4px;">9</span> is at depth 2.<br>
<span style="color: #4caf50;">Green path</span> shows shortest route to leaf.
</div>

### BFS Advantage for Min Depth

<div style="background: #e3f2fd; padding: 20px; border-radius: 12px; margin: 20px 0;">
<div style="font-weight: bold; color: #1565c0; margin-bottom: 15px;">Why BFS is Optimal Here</div>

<p>BFS processes nodes level-by-level. The <strong>first leaf encountered</strong> is guaranteed to be at minimum depth!</p>

<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
  <div style="display: flex; align-items: center; gap: 10px;">
    <span style="background: #1565c0; color: white; padding: 5px 12px; border-radius: 5px;">Level 1</span>
    <span style="background: #667eea; color: white; padding: 8px 15px; border-radius: 50%;">3</span>
    <span style="color: #666; font-style: italic;">Not a leaf, continue...</span>
  </div>
  <div style="display: flex; align-items: center; gap: 10px;">
    <span style="background: #2e7d32; color: white; padding: 5px 12px; border-radius: 5px;">Level 2</span>
    <span style="background: #38ef7d; color: white; padding: 8px 15px; border-radius: 50%; border: 2px solid #ffd700;">9</span>
    <span style="background: #4facfe; color: white; padding: 8px 12px; border-radius: 50%;">20</span>
    <span style="color: #2e7d32; font-weight: bold;">Found leaf 9! Return 2</span>
  </div>
</div>

<p style="margin-top: 15px; color: #1565c0;"><strong>No need to explore level 3!</strong></p>
</div>

---

## Solution Approaches

### Approach 1: BFS (Recommended for Min Depth)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) worst case, often better |
| Space Complexity | O(w) where w is max width |

**Why this is best:**
- Stops as soon as first leaf found
- No need to traverse entire tree
- Most efficient for finding minimum

### Approach 2: Recursive DFS with Null Check

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(h) |

**When to use:** When tree is very narrow (low branching factor).

### Approach 3: Iterative DFS

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(h) |

**When to use:** When avoiding recursion.

---

## Key Pitfall

<div style="background: #ffebee; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #c62828;">
<strong style="color: #c62828;">Common Mistake</strong><br><br>
<code>return 1 + min(left, right)</code> is WRONG!<br><br>
If one child is null (returns 0), this incorrectly counts a non-leaf as the minimum.<br><br>
<strong>Correct:</strong> Check if children are null before taking minimum.
</div>
