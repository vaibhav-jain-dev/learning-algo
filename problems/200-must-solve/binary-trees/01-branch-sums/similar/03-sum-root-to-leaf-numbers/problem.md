# Sum Root to Leaf Numbers

**Difficulty:** Medium

## Problem Statement

You are given the root of a binary tree containing digits from 0 to 9 only. Each root-to-leaf path in the tree represents a number formed by concatenating the digits.

Return the total sum of all root-to-leaf numbers.

## Examples

**Example 1:**
```
Input:
    1
   / \
  2   3

Output: 25
Explanation:
- Path 1 -> 2 represents number 12
- Path 1 -> 3 represents number 13
- Total = 12 + 13 = 25
```

**Example 2:**
```
Input:
        4
       / \
      9   0
     / \
    5   1

Output: 1026
Explanation:
- Path 4 -> 9 -> 5 represents 495
- Path 4 -> 9 -> 1 represents 491
- Path 4 -> 0 represents 40
- Total = 495 + 491 + 40 = 1026
```

**Example 3:**
```
Input:
    9

Output: 9
Explanation: Single node represents the number 9
```

## Constraints

- The number of nodes in the tree is in the range [1, 1000]
- 0 <= Node.value <= 9
- The depth of the tree will not exceed 10

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How do I build a number as I traverse?"

Key insight: When moving from parent to child:
- Multiply current number by 10
- Add the child's digit
- Example: 4 -> 9 means: 4 * 10 + 9 = 49

### Step 2: Identify the Pattern

**Key insight:** This uses **DFS with Accumulated Value**:
- Pass the "number so far" to each recursive call
- At leaf nodes, add the complete number to total
- Similar to Branch Sums but building numbers instead

### Step 3: Define the Recurrence

```
DFS(node, currentNumber):
    if node is null: return 0

    newNumber = currentNumber * 10 + node.value

    if node is LEAF:
        return newNumber

    return DFS(node.left, newNumber) + DFS(node.right, newNumber)
```

---

## Visual Diagram: How It Works

### Input Tree

<div style="display: flex; flex-direction: column; align-items: center; font-family: Arial, sans-serif; padding: 20px;">
  <div style="display: flex; flex-direction: column; align-items: center;">
    <!-- Root Level -->
    <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">4</div>

    <!-- Connectors Level 1 -->
    <div style="display: flex; width: 180px; justify-content: center; margin: 5px 0;">
      <div style="width: 2px; height: 35px; background: #667eea; transform: rotate(-35deg); margin-right: 40px;"></div>
      <div style="width: 2px; height: 35px; background: #667eea; transform: rotate(35deg); margin-left: 40px;"></div>
    </div>

    <!-- Level 1 -->
    <div style="display: flex; gap: 80px; margin-top: 10px;">
      <div style="width: 55px; height: 55px; border-radius: 50%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 22px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">9</div>
      <div style="width: 55px; height: 55px; border-radius: 50%; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 22px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); border: 3px solid #ffd700;">0</div>
    </div>

    <!-- Connectors Level 2 -->
    <div style="display: flex; margin-right: 90px; margin-top: 5px;">
      <div style="width: 2px; height: 35px; background: #f5576c; transform: rotate(-30deg); margin-right: 25px;"></div>
      <div style="width: 2px; height: 35px; background: #f5576c; transform: rotate(30deg); margin-left: 25px;"></div>
    </div>

    <!-- Level 2 -->
    <div style="display: flex; gap: 30px; margin-right: 90px; margin-top: 10px;">
      <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); border: 3px solid #ffd700;">5</div>
      <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); border: 3px solid #ffd700;">1</div>
    </div>
  </div>
</div>

<div style="background: #fff9c4; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #ffd700;">
<strong>Leaf nodes</strong> (with <span style="border: 3px solid #ffd700; padding: 2px 8px; border-radius: 4px;">gold border</span>) form complete numbers.
</div>

### Number Building Process

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); padding: 20px; border-radius: 12px; text-align: center;">
<div style="font-size: 14px; color: #1565c0; margin-bottom: 10px;">Path 1</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 15px;">
  <span style="background: #667eea; color: white; padding: 8px 14px; border-radius: 20px; font-weight: bold;">4</span>
  <span style="color: #667eea; font-size: 18px;">-></span>
  <span style="background: #f5576c; color: white; padding: 8px 14px; border-radius: 20px; font-weight: bold;">9</span>
  <span style="color: #f5576c; font-size: 18px;">-></span>
  <span style="background: #4facfe; color: white; padding: 8px 14px; border-radius: 20px; font-weight: bold;">5</span>
</div>
<div style="font-size: 24px; font-weight: bold; color: #1565c0;">495</div>
</div>

<div style="background: linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%); padding: 20px; border-radius: 12px; text-align: center;">
<div style="font-size: 14px; color: #c2185b; margin-bottom: 10px;">Path 2</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 15px;">
  <span style="background: #667eea; color: white; padding: 8px 14px; border-radius: 20px; font-weight: bold;">4</span>
  <span style="color: #667eea; font-size: 18px;">-></span>
  <span style="background: #f5576c; color: white; padding: 8px 14px; border-radius: 20px; font-weight: bold;">9</span>
  <span style="color: #f5576c; font-size: 18px;">-></span>
  <span style="background: #fa709a; color: white; padding: 8px 14px; border-radius: 20px; font-weight: bold;">1</span>
</div>
<div style="font-size: 24px; font-weight: bold; color: #c2185b;">491</div>
</div>

<div style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); padding: 20px; border-radius: 12px; text-align: center;">
<div style="font-size: 14px; color: #2e7d32; margin-bottom: 10px;">Path 3</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 15px;">
  <span style="background: #667eea; color: white; padding: 8px 14px; border-radius: 20px; font-weight: bold;">4</span>
  <span style="color: #667eea; font-size: 18px;">-></span>
  <span style="background: #38ef7d; color: white; padding: 8px 14px; border-radius: 20px; font-weight: bold;">0</span>
</div>
<div style="font-size: 24px; font-weight: bold; color: #2e7d32;">40</div>
</div>

</div>

### Step-by-Step Number Construction

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
<tr style="background: #e8eaf6;">
  <th style="padding: 12px; border: 1px solid #c5cae9; text-align: left;">Node</th>
  <th style="padding: 12px; border: 1px solid #c5cae9; text-align: left;">Incoming Value</th>
  <th style="padding: 12px; border: 1px solid #c5cae9; text-align: left;">Calculation</th>
  <th style="padding: 12px; border: 1px solid #c5cae9; text-align: left;">New Value</th>
  <th style="padding: 12px; border: 1px solid #c5cae9; text-align: left;">Is Leaf?</th>
</tr>
<tr>
  <td style="padding: 12px; border: 1px solid #c5cae9;"><strong>4</strong> (root)</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">0</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">0 * 10 + 4</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">4</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">No</td>
</tr>
<tr style="background: #f5f5f5;">
  <td style="padding: 12px; border: 1px solid #c5cae9;"><strong>9</strong></td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">4</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">4 * 10 + 9</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">49</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">No</td>
</tr>
<tr style="background: #c8e6c9;">
  <td style="padding: 12px; border: 1px solid #c5cae9;"><strong>5</strong></td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">49</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">49 * 10 + 5</td>
  <td style="padding: 12px; border: 1px solid #c5cae9; background: #a5d6a7;"><strong>495</strong></td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">Yes - Add!</td>
</tr>
<tr style="background: #c8e6c9;">
  <td style="padding: 12px; border: 1px solid #c5cae9;"><strong>1</strong></td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">49</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">49 * 10 + 1</td>
  <td style="padding: 12px; border: 1px solid #c5cae9; background: #a5d6a7;"><strong>491</strong></td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">Yes - Add!</td>
</tr>
<tr style="background: #c8e6c9;">
  <td style="padding: 12px; border: 1px solid #c5cae9;"><strong>0</strong></td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">4</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">4 * 10 + 0</td>
  <td style="padding: 12px; border: 1px solid #c5cae9; background: #a5d6a7;"><strong>40</strong></td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">Yes - Add!</td>
</tr>
</table>

<div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 10px 0; text-align: center;">
<div style="font-size: 18px; margin-bottom: 10px;">Final Calculation</div>
<div style="font-size: 28px; font-weight: bold; color: #2e7d32;">
495 + 491 + 40 = <span style="color: #1b5e20;">1026</span>
</div>
</div>

---

## Solution Approaches

### Approach 1: Recursive DFS (Recommended)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) - visit each node once |
| Space Complexity | O(h) - recursion depth |

**Why this is best:**
- Clean and concise
- Natural fit for tree traversal
- Easy to understand number building

### Approach 2: Iterative with Stack

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**When to use:** When recursion depth is a concern.

### Approach 3: Morris Traversal

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**When to use:** When space is extremely limited.

---

## Key Insights

1. **Number Building:** Multiply by 10 and add digit
2. **Return vs Accumulate:** Return sum from leaves, don't use global
3. **Handle Zero:** Leading zeros are valid (node value 0)
4. **Relation to Branch Sums:** Same DFS pattern, different accumulation
