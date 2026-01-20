<div id="viz-config" style="display:none">
{"name":"Average of Levels in Binary Tree","algorithm":"tree-bfs","complexity":{"time":"O(n)","space":"O(w)"},"examples":[{"input":{"tree":{"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},"output":[3.0,14.5,11.0],"inputRaw":"tree = {3,9,20,#,#,15,7}","outputRaw":"[3.0, 14.5, 11.0]"},{"input":{"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"right":{"value":6}}}},"output":[1.0,2.5,5.0],"inputRaw":"tree = {1,2,3,4,5,#,6}","outputRaw":"[1.0, 2.5, 5.0]"}]}
</div>

# Average of Levels in Binary Tree

**Difficulty:** Easy

## Problem Statement

Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10^-5 of the actual answer will be accepted.

## Examples

**Example 1:**
```
Input:
    3
   / \
  9  20
    /  \
   15   7

Output: [3.0, 14.5, 11.0]
Explanation:
- Level 0: Average of [3] = 3.0
- Level 1: Average of [9, 20] = 14.5
- Level 2: Average of [15, 7] = 11.0
```

**Example 2:**
```
Input:
    1
   / \
  2   3
 / \   \
4   5   6

Output: [1.0, 2.5, 5.0]
Explanation:
- Level 0: Average of [1] = 1.0
- Level 1: Average of [2, 3] = 2.5
- Level 2: Average of [4, 5, 6] = 5.0
```

**Example 3:**
```
Input:
  1
 /
2

Output: [1.0, 2.0]
```

## Constraints

- The number of nodes in the tree is in the range [1, 10000]
- -2^31 <= Node.value <= 2^31 - 1

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How do I process nodes level by level?"

Key insight: This is a classic BFS (level-order traversal) problem where we need to:
- Group nodes by their level
- Calculate the average for each group
- Store results in order

### Step 2: Identify the Pattern

**Key insight:** This uses **BFS (Breadth-First Search)**:
- Process all nodes at the same level together
- Track level boundaries using queue size
- Calculate average before moving to next level

### Step 3: Define the Algorithm

```
averageOfLevels(root):
    result = []
    queue = [root]
    while queue is not empty:
        level_size = len(queue)
        level_sum = 0
        for i in range(level_size):
            node = queue.pop(0)
            level_sum += node.value
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level_sum / level_size)
    return result
```

---

## Visual Diagram: How It Works

### Input Tree

<div style="display: flex; flex-direction: column; align-items: center; font-family: Arial, sans-serif; padding: 20px;">
  <div style="display: flex; flex-direction: column; align-items: center;">
    <!-- Root Level -->
    <div style="display: flex; align-items: center; gap: 20px;">
      <span style="background: #e3f2fd; padding: 5px 15px; border-radius: 15px; font-size: 14px; color: #1565c0;">Level 0</span>
      <div style="width: 55px; height: 55px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">3</div>
      <span style="background: #c8e6c9; padding: 5px 10px; border-radius: 8px; font-size: 12px;">avg = 3.0</span>
    </div>

    <!-- Connectors Level 1 -->
    <div style="display: flex; width: 180px; justify-content: center; margin: 5px 0;">
      <div style="width: 2px; height: 35px; background: #667eea; transform: rotate(-35deg); margin-right: 40px;"></div>
      <div style="width: 2px; height: 35px; background: #667eea; transform: rotate(35deg); margin-left: 40px;"></div>
    </div>

    <!-- Level 1 -->
    <div style="display: flex; align-items: center; gap: 20px;">
      <span style="background: #e8f5e9; padding: 5px 15px; border-radius: 15px; font-size: 14px; color: #2e7d32;">Level 1</span>
      <div style="display: flex; gap: 80px;">
        <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">9</div>
        <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">20</div>
      </div>
      <span style="background: #c8e6c9; padding: 5px 10px; border-radius: 8px; font-size: 12px;">avg = 14.5</span>
    </div>

    <!-- Connectors Level 2 -->
    <div style="display: flex; margin-left: 90px; margin-top: 5px;">
      <div style="width: 2px; height: 35px; background: #38ef7d; transform: rotate(-30deg); margin-right: 20px;"></div>
      <div style="width: 2px; height: 35px; background: #38ef7d; transform: rotate(30deg); margin-left: 20px;"></div>
    </div>

    <!-- Level 2 -->
    <div style="display: flex; align-items: center; gap: 20px;">
      <span style="background: #fff3e0; padding: 5px 15px; border-radius: 15px; font-size: 14px; color: #e65100;">Level 2</span>
      <div style="display: flex; gap: 25px; margin-left: 50px;">
        <div style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">15</div>
        <div style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">7</div>
      </div>
      <span style="background: #c8e6c9; padding: 5px 10px; border-radius: 8px; font-size: 12px;">avg = 11.0</span>
    </div>
  </div>
</div>

### BFS Level Processing Visualization

<div style="background: #f5f5f5; padding: 20px; border-radius: 12px; margin: 20px 0;">

<div style="display: flex; flex-direction: column; gap: 20px;">

<!-- Step 1 -->
<div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
  <div style="font-weight: bold; color: #667eea; margin-bottom: 10px;">Step 1: Process Level 0</div>
  <div style="display: flex; align-items: center; gap: 15px;">
    <span style="background: #e3f2fd; padding: 5px 10px; border-radius: 5px;">Queue:</span>
    <div style="display: flex; gap: 5px;">
      <span style="background: #667eea; color: white; padding: 8px 15px; border-radius: 50%; font-weight: bold;">3</span>
    </div>
  </div>
  <div style="margin-top: 10px; font-family: monospace; background: #f8f9fa; padding: 10px; border-radius: 5px;">
    sum = 3, count = 1 -> average = 3.0
  </div>
</div>

<!-- Step 2 -->
<div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #4facfe;">
  <div style="font-weight: bold; color: #4facfe; margin-bottom: 10px;">Step 2: Process Level 1</div>
  <div style="display: flex; align-items: center; gap: 15px;">
    <span style="background: #e3f2fd; padding: 5px 10px; border-radius: 5px;">Queue:</span>
    <div style="display: flex; gap: 5px;">
      <span style="background: #4facfe; color: white; padding: 8px 15px; border-radius: 50%; font-weight: bold;">9</span>
      <span style="background: #38ef7d; color: white; padding: 8px 12px; border-radius: 50%; font-weight: bold;">20</span>
    </div>
  </div>
  <div style="margin-top: 10px; font-family: monospace; background: #f8f9fa; padding: 10px; border-radius: 5px;">
    sum = 9 + 20 = 29, count = 2 -> average = 14.5
  </div>
</div>

<!-- Step 3 -->
<div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #f5576c;">
  <div style="font-weight: bold; color: #f5576c; margin-bottom: 10px;">Step 3: Process Level 2</div>
  <div style="display: flex; align-items: center; gap: 15px;">
    <span style="background: #e3f2fd; padding: 5px 10px; border-radius: 5px;">Queue:</span>
    <div style="display: flex; gap: 5px;">
      <span style="background: #f5576c; color: white; padding: 8px 12px; border-radius: 50%; font-weight: bold;">15</span>
      <span style="background: #fee140; color: #333; padding: 8px 15px; border-radius: 50%; font-weight: bold;">7</span>
    </div>
  </div>
  <div style="margin-top: 10px; font-family: monospace; background: #f8f9fa; padding: 10px; border-radius: 5px;">
    sum = 15 + 7 = 22, count = 2 -> average = 11.0
  </div>
</div>

</div>
</div>

### Final Result

<div style="background: #e8f5e9; padding: 20px; border-radius: 12px; margin: 20px 0; border: 2px solid #4caf50;">
  <div style="font-size: 18px; font-weight: bold; color: #2e7d32; margin-bottom: 15px;">Result: [3.0, 14.5, 11.0]</div>
  <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
    <tr style="background: #c8e6c9;">
      <th style="padding: 10px; text-align: left; border: 1px solid #a5d6a7;">Level</th>
      <th style="padding: 10px; text-align: left; border: 1px solid #a5d6a7;">Nodes</th>
      <th style="padding: 10px; text-align: left; border: 1px solid #a5d6a7;">Sum</th>
      <th style="padding: 10px; text-align: left; border: 1px solid #a5d6a7;">Count</th>
      <th style="padding: 10px; text-align: left; border: 1px solid #a5d6a7;">Average</th>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #a5d6a7;">0</td>
      <td style="padding: 10px; border: 1px solid #a5d6a7;">[3]</td>
      <td style="padding: 10px; border: 1px solid #a5d6a7;">3</td>
      <td style="padding: 10px; border: 1px solid #a5d6a7;">1</td>
      <td style="padding: 10px; border: 1px solid #a5d6a7;"><strong>3.0</strong></td>
    </tr>
    <tr style="background: #f1f8e9;">
      <td style="padding: 10px; border: 1px solid #a5d6a7;">1</td>
      <td style="padding: 10px; border: 1px solid #a5d6a7;">[9, 20]</td>
      <td style="padding: 10px; border: 1px solid #a5d6a7;">29</td>
      <td style="padding: 10px; border: 1px solid #a5d6a7;">2</td>
      <td style="padding: 10px; border: 1px solid #a5d6a7;"><strong>14.5</strong></td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #a5d6a7;">2</td>
      <td style="padding: 10px; border: 1px solid #a5d6a7;">[15, 7]</td>
      <td style="padding: 10px; border: 1px solid #a5d6a7;">22</td>
      <td style="padding: 10px; border: 1px solid #a5d6a7;">2</td>
      <td style="padding: 10px; border: 1px solid #a5d6a7;"><strong>11.0</strong></td>
    </tr>
  </table>
</div>

---

## Solution Approaches

### Approach 1: BFS with Level Tracking (Recommended)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) - visit each node once |
| Space Complexity | O(w) - where w is max width of tree |

**Why this is best:**
- Natural fit for level-order processing
- Easy to track level boundaries
- Simple to calculate running sum per level

### Approach 2: DFS with Level Mapping

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(h) for recursion + O(n) for level storage |

**When to use:** When you prefer recursive solutions.

### Approach 3: BFS with Two Queues

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(w) |

**When to use:** Alternative implementation style.

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| BFS Level Tracking | O(n) | O(w) | Best - most natural |
| DFS with Mapping | O(n) | O(h + n) | Good - recursive style |
| Two Queues | O(n) | O(w) | Alternative |

---

## Key Insights

1. **BFS is natural for level problems**: When you need to process by levels, BFS with queue size tracking is ideal
2. **Track level boundaries**: Use `level_size = len(queue)` at the start of each level
3. **Handle integer overflow**: For large trees, sum might overflow - use appropriate data types
4. **Edge cases**: Single node tree, skewed trees, negative values
