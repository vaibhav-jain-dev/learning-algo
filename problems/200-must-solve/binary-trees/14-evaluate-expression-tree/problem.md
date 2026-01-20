<div id="viz-config" style="display:none">
{"name":"Evaluate Expression Tree","algorithm":"tree-expression","complexity":{"time":"O(n)","space":"O(h)"},"examples":[{"input":{"tree":{"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}}},"output":19,"inputRaw":"tree = {-1(+),-2(-),-3(*),2,3,4,5}","outputRaw":"19 (explanation: (2-3) + (4*5) = -1 + 20 = 19)"},{"input":{"tree":{"value":-1,"left":{"value":5},"right":{"value":7}}},"output":12,"inputRaw":"tree = {-1(+),5,7}","outputRaw":"12 (explanation: 5 + 7 = 12)"}]}
</div>

# Evaluate Expression Tree

**Difficulty:** Easy (Green)

## Problem Statement

Write a function that takes in a binary expression tree and evaluates it. The tree represents a mathematical expression where:

- **Leaf nodes** contain integer operands (positive or negative numbers)
- **Internal nodes** contain operators: `+`, `-`, `*`, `/` (represented as -1, -2, -3, -4 respectively)

The function should return the result of evaluating the expression.

For division, use integer division that truncates toward zero.

## Operator Encoding

| Operator | Value |
|----------|-------|
| +        | -1    |
| -        | -2    |
| *        | -3    |
| /        | -4    |

## Examples

**Example 1:**
```
Input:
           -1 (+)
          /     \
       -2 (-)    -3 (*)
       /   \     /   \
      2     3   4     5

Output: 19
Explanation:
- Left subtree: 2 - 3 = -1
- Right subtree: 4 * 5 = 20
- Root: -1 + 20 = 19
```

**Example 2:**
```
Input:
           -4 (/)
          /     \
       -3 (*)   2
       /   \
      6     3

Output: 9
Explanation:
- Left subtree: 6 * 3 = 18
- Result: 18 / 2 = 9
```

**Example 3:**
```
Input:
           -1 (+)
          /     \
         5       7

Output: 12
Explanation: 5 + 7 = 12
```

## Constraints

- The tree will always be a valid expression tree
- Internal nodes always have exactly two children
- Leaf nodes have no children
- Division by zero will not occur in test cases
- Node values: -4 <= operator values <= -1, operands can be any integer

## Hints

<details>
<summary>Hint 1</summary>
Use post-order traversal: evaluate left subtree, evaluate right subtree, then apply the operator at the current node.
</details>

<details>
<summary>Hint 2</summary>
Base case: if a node is a leaf (value >= 0 or it has no children), return its value directly.
</details>

<details>
<summary>Hint 3</summary>
Recursively evaluate children first, then combine results using the operator stored in the current node.
</details>

## Approach

1. Use recursive post-order traversal
2. Base case: if node is a leaf (no children), return its value
3. Recursively evaluate left and right subtrees
4. Apply the operator at the current node to the two results
5. Return the computed value

**Time Complexity:** O(n) where n is the number of nodes
**Space Complexity:** O(h) where h is the height of the tree (recursion stack)

---

## Similar Problems (Harder)

### 1. Build Expression Tree from Postfix
**Difficulty:** Medium

Given a postfix expression, construct the corresponding expression tree.

### 2. Expression Tree with Variables
**Difficulty:** Medium

Evaluate expression tree where leaves can be variables with given values.

### 3. Serialize and Deserialize Expression Tree
**Difficulty:** Hard

Convert expression tree to string and back while preserving structure.
