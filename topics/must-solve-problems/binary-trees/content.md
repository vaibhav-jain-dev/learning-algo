# Binary Trees - Interview Mastery Guide

## Category Overview

A Binary Tree is one of the most important data structures in computer science, forming the foundation for countless algorithms and applications. Unlike Binary Search Trees, general binary trees have no ordering constraint - each node simply has at most two children (left and right). This fundamental structure appears everywhere from expression parsing to file systems to machine learning decision trees.

Binary trees are hierarchical, recursive structures where each subtree is itself a binary tree. This recursive nature makes them ideal for recursive algorithms, though iterative solutions using stacks and queues are equally important to master.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Binary Tree Fundamentals</h3>
<div style="color: #334155;">
<ul>
<li><strong>Root</strong>: The topmost node (has no parent)</li>
<li><strong>Leaf</strong>: A node with no children</li>
<li><strong>Internal Node</strong>: A node with at least one child</li>
<li><strong>Height</strong>: Longest path from root to any leaf</li>
<li><strong>Depth</strong>: Distance from root to a specific node</li>
<li><strong>Level</strong>: All nodes at the same depth</li>
</ul>
</div>
</div>

**Interview Frequency**: Binary tree problems appear in **25-30%** of all coding interviews. They are favorites at Google, Meta, Amazon, Microsoft, and Apple because they test recursion, tree traversal, and problem decomposition skills.

## Key Patterns

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Binary Tree Pattern Recognition</h3>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155; overflow-x: auto;">
+----------------------+-----------------------------+-------------------------+
|      Pattern         |       When to Use           |   Example Problems      |
+----------------------+-----------------------------+-------------------------+
| Recursive DFS        | Most tree problems, path    | Branch Sums, Max Depth, |
|                      | sums, tree properties       | Diameter, Validate BST  |
+----------------------+-----------------------------+-------------------------+
| Iterative DFS        | Stack overflow concerns,    | Iterative Traversals,   |
| (with Stack)         | explicit control needed     | Morris Traversal        |
+----------------------+-----------------------------+-------------------------+
| BFS (with Queue)     | Level-order problems,       | Level Order Traversal,  |
|                      | shortest path in tree       | Right Side View         |
+----------------------+-----------------------------+-------------------------+
| Post-Order Pattern   | Need children's info first  | Height, Diameter,       |
|                      | before processing node      | Max Path Sum            |
+----------------------+-----------------------------+-------------------------+
| Parent Pointers      | Need to traverse upward,    | Find Successor, LCA,    |
|                      | find ancestors              | Nodes at Distance K     |
+----------------------+-----------------------------+-------------------------+
</pre>
</div>

### Tree Types Reference

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Special Binary Tree Types</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
FULL BINARY TREE:
Every node has 0 or 2 children (never just 1)
        1
       / \
      2   3       Valid Full Tree
     / \
    4   5

COMPLETE BINARY TREE:
All levels filled except possibly last, which is left-aligned
        1
       / \
      2   3       Valid Complete Tree
     / \  /
    4  5 6

PERFECT BINARY TREE:
All internal nodes have 2 children, all leaves at same level
        1
       / \
      2   3       Valid Perfect Tree (also full and complete)
     / \ / \
    4  5 6  7

BALANCED BINARY TREE:
Height difference between left and right subtrees <= 1 for all nodes
Height = O(log n), guaranteeing efficient operations
</pre>
</div>

### Traversal Methods Visualization

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">DFS Traversal Orders</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Tree:
        1
       / \
      2   3
     / \   \
    4   5   6

PRE-ORDER (Root -> Left -> Right): 1, 2, 4, 5, 3, 6
  - Process node BEFORE children
  - Use: Copying tree, serialization

IN-ORDER (Left -> Root -> Right): 4, 2, 5, 1, 3, 6
  - Process node BETWEEN children
  - Use: BST gives sorted order

POST-ORDER (Left -> Right -> Root): 4, 5, 2, 6, 3, 1
  - Process node AFTER children
  - Use: Deletion, calculating heights

LEVEL-ORDER (BFS): 1, 2, 3, 4, 5, 6
  - Process level by level
  - Use: Finding shortest path, level-based operations
</pre>
</div>

## Must-Know Problems with Solutions

### Problem 1: Branch Sums

**Problem**: Calculate the sum of values along each root-to-leaf path.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Branch Sums Visualization</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
        1
       / \
      2   3
     / \ / \
    4  5 6  7
   / \
  8   9

Paths (left to right):
1 -> 2 -> 4 -> 8 = 15
1 -> 2 -> 4 -> 9 = 16
1 -> 2 -> 5     = 8
1 -> 3 -> 6     = 10
1 -> 3 -> 7     = 11

Output: [15, 16, 8, 10, 11]
</pre>
</div>

```python
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def branch_sums(root):
    """
    Time: O(n) - visit each node once
    Space: O(n) - output list + O(h) recursion stack

    Pass running sum down to children.
    When reaching a leaf, add the sum to results.
    """
    sums = []
    calculate_branch_sums(root, 0, sums)
    return sums

def calculate_branch_sums(node, running_sum, sums):
    if node is None:
        return

    new_sum = running_sum + node.value

    # If leaf node, we've completed a branch
    if node.left is None and node.right is None:
        sums.append(new_sum)
        return

    # Recurse to children
    calculate_branch_sums(node.left, new_sum, sums)
    calculate_branch_sums(node.right, new_sum, sums)
```

---

### Problem 2: Node Depths

**Problem**: Calculate the sum of depths of all nodes in the tree.

```python
def node_depths(root, depth=0):
    """
    Time: O(n) | Space: O(h)

    Each node contributes its depth to the total.
    Depth increases by 1 as we go down each level.
    """
    if root is None:
        return 0

    return (depth +
            node_depths(root.left, depth + 1) +
            node_depths(root.right, depth + 1))

# Iterative version using stack
def node_depths_iterative(root):
    if root is None:
        return 0

    total = 0
    stack = [(root, 0)]  # (node, depth)

    while stack:
        node, depth = stack.pop()
        total += depth

        if node.left:
            stack.append((node.left, depth + 1))
        if node.right:
            stack.append((node.right, depth + 1))

    return total
```

---

### Problem 3: Binary Tree Diameter

**Problem**: Find the diameter - the longest path between any two nodes (not necessarily through root).

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Diameter Visualization</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
        1
       / \
      3   2
     / \
    7   4
   /     \
  8       5
           \
            6

Diameter path: 8 -> 7 -> 3 -> 4 -> 5 -> 6
Length: 6 edges (or 7 nodes, depending on definition)

Key Insight:
- Diameter through a node = left_height + right_height
- Global diameter = max of all local diameters
- We calculate height while tracking maximum diameter
</pre>
</div>

```python
def binary_tree_diameter(tree):
    """
    Time: O(n) | Space: O(h)

    At each node, diameter = left_height + right_height
    Track maximum diameter seen across all nodes.
    """
    max_diameter = [0]  # Using list for mutable reference

    def get_height(node):
        if node is None:
            return 0

        left_height = get_height(node.left)
        right_height = get_height(node.right)

        # Diameter through current node
        diameter = left_height + right_height
        max_diameter[0] = max(max_diameter[0], diameter)

        # Return height for parent's calculation
        return 1 + max(left_height, right_height)

    get_height(tree)
    return max_diameter[0]
```

---

### Problem 4: Invert Binary Tree

**Problem**: Swap left and right children for all nodes (mirror the tree).

```python
def invert_binary_tree(tree):
    """
    Time: O(n) | Space: O(h)

    At each node, swap its children.
    Recursively invert the subtrees.
    """
    if tree is None:
        return None

    # Swap children
    tree.left, tree.right = tree.right, tree.left

    # Recursively invert subtrees
    invert_binary_tree(tree.left)
    invert_binary_tree(tree.right)

    return tree

# BFS approach
from collections import deque

def invert_binary_tree_bfs(tree):
    if tree is None:
        return None

    queue = deque([tree])

    while queue:
        node = queue.popleft()
        node.left, node.right = node.right, node.left

        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)

    return tree
```

---

### Problem 5: Max Path Sum

**Problem**: Find the maximum sum path in the tree. Path can start and end at any nodes.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Max Path Sum Logic</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
        1
       / \
      2   3
     / \   \
    4   5   6
       / \
      7   8

At each node, we consider:
1. max_path_through_node = node + max(left_gain, 0) + max(right_gain, 0)
   - This is a potential answer (path that passes through this node)

2. max_gain_to_parent = node + max(left_gain, right_gain, 0)
   - What we can contribute to parent (can only go one direction)

Key: Negative gains are ignored (we can choose to not extend that way)
</pre>
</div>

```python
def max_path_sum(tree):
    """
    Time: O(n) | Space: O(h)

    At each node:
    - Calculate max path sum THROUGH this node (potential answer)
    - Return max gain TO parent (can only use one child path)
    """
    max_sum = [float('-inf')]

    def max_gain(node):
        if node is None:
            return 0

        # Get max gain from children (ignore negative contributions)
        left_gain = max(max_gain(node.left), 0)
        right_gain = max(max_gain(node.right), 0)

        # Path through current node (potential global maximum)
        path_sum = node.value + left_gain + right_gain
        max_sum[0] = max(max_sum[0], path_sum)

        # Return max gain to parent (can only go one direction)
        return node.value + max(left_gain, right_gain)

    max_gain(tree)
    return max_sum[0]
```

---

### Problem 6: Height Balanced Binary Tree

**Problem**: Determine if a tree is height-balanced (subtree heights differ by at most 1 for all nodes).

```python
def height_balanced_binary_tree(tree):
    """
    Time: O(n) | Space: O(h)

    A tree is balanced if:
    1. Left subtree is balanced
    2. Right subtree is balanced
    3. Heights differ by at most 1
    """
    def get_height_and_balance(node):
        """Returns (is_balanced, height)"""
        if node is None:
            return (True, 0)

        left_balanced, left_height = get_height_and_balance(node.left)
        right_balanced, right_height = get_height_and_balance(node.right)

        is_balanced = (left_balanced and
                       right_balanced and
                       abs(left_height - right_height) <= 1)

        height = 1 + max(left_height, right_height)

        return (is_balanced, height)

    return get_height_and_balance(tree)[0]
```

---

### Problem 7: Find Nodes Distance K

**Problem**: Find all nodes at distance K from a target node.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Distance K Strategy</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
        1
       / \
      2   3
     / \
    4   5

Target: node 2, K: 2

Nodes at distance 2 from node 2:
- Down path: 4, 5 (distance 1 each, but we need K=2, none here)
- Up path: 2 -> 1 -> 3 (distance 2) -> node 3

Key Insight: Treat tree as undirected graph
1. Build parent pointers (or adjacency map)
2. BFS from target node
3. Track visited to avoid cycles
</pre>
</div>

```python
from collections import deque

def find_nodes_distance_k(tree, target, k):
    """
    Time: O(n) | Space: O(n)

    Convert tree to graph (add parent pointers), then BFS.
    """
    # Build parent mapping
    parents = {}
    build_parents(tree, None, parents)

    # BFS from target
    queue = deque([(target, 0)])
    visited = {target}
    result = []

    while queue:
        node, distance = queue.popleft()

        if distance == k:
            result.append(node.value)
        elif distance < k:
            # Explore all neighbors (children + parent)
            neighbors = [node.left, node.right, parents.get(node)]
            for neighbor in neighbors:
                if neighbor and neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, distance + 1))

    return result

def build_parents(node, parent, parents):
    if node:
        parents[node] = parent
        build_parents(node.left, node, parents)
        build_parents(node.right, node, parents)
```

---

### Problem 8: Lowest Common Ancestor

**Problem**: Find the lowest (deepest) node that is an ancestor of both given nodes.

```python
def lowest_common_ancestor(root, p, q):
    """
    Time: O(n) | Space: O(h)

    Three cases:
    1. Both nodes in left subtree -> LCA is in left
    2. Both nodes in right subtree -> LCA is in right
    3. One in each subtree (or current is one of them) -> current is LCA
    """
    if root is None or root == p or root == q:
        return root

    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)

    # If both subtrees returned a node, current is LCA
    if left and right:
        return root

    # Otherwise, return whichever subtree found something
    return left if left else right
```

## Complexity Analysis Summary

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Binary Tree Operations Complexity</h3>
<table style="width: 100%; border-collapse: collapse; color: #334155;">
<tr style="background: #e2e8f0;">
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Operation</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Time</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Space</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Notes</th>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">DFS Traversal</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(h)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">h = height (log n to n)</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">BFS Traversal</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(w)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">w = max width</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Height/Depth</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(h)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Visit all nodes</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Diameter</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(h)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Calculate height while tracking max</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Max Path Sum</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(h)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Similar to diameter approach</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">LCA</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(h)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">May need to visit all nodes</td>
</tr>
</table>
</div>

## Common Mistakes

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Pitfalls to Avoid</h3>
<div style="color: #334155;">

1. **Forgetting Base Case**: Always check `if node is None` before accessing properties

2. **Confusing Height vs Depth**:
   - Height: Longest path DOWN to a leaf (root has max height)
   - Depth: Distance UP from root (root has depth 0)

3. **Not Handling Single-Child Nodes**: A node with only left or only right child is not a leaf

4. **Stack Overflow on Deep Trees**: Consider iterative solutions for very deep trees

5. **Returning Wrong Value**: In post-order problems, make sure to return what parent needs, not what you calculated locally

6. **Off-by-One in Path Problems**: Clarify if counting edges or nodes

7. **Modifying Tree During Traversal**: Can lead to infinite loops or missed nodes

8. **BFS vs DFS Confusion**:
   - BFS for level-order, shortest path
   - DFS for path problems, tree properties

</div>
</div>

## Interview Tips

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Problem-Solving Framework for Trees</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Step 1: Understand what information flows
  - Top-down: Parent to children (depth, running sum, constraints)
  - Bottom-up: Children to parent (height, subtree results)

Step 2: Identify the pattern
  - Need all nodes? -> Full traversal
  - Need level info? -> BFS
  - Need path info? -> DFS with tracking
  - Need subtree info first? -> Post-order

Step 3: Design recursion
  - What's the base case? (usually null node)
  - What does each call return?
  - What does each call need from children?

Step 4: Consider edge cases
  - Empty tree
  - Single node
  - Skewed tree (linked list)
  - All same values

Time Allocation (35-min problem):
0-3 min:  Draw example, understand problem
3-8 min:  Identify pattern, design approach
8-28 min: Implement solution
28-35 min: Test with examples
</pre>
</div>

### Key Communication Phrases

- "I'll use a recursive DFS approach since I need to process subtrees first..."
- "This is a post-order problem because I need children's info before processing the parent..."
- "I'll pass the running sum down as a parameter..."
- "Let me track the maximum globally while returning height locally..."
- "The base case is when the node is null, returning 0 (or appropriate value)..."

## Practice Problems

### Easy
1. Branch Sums
2. Node Depths
3. Evaluate Expression Tree
4. Tree Includes (search for value)

### Medium
5. Invert Binary Tree
6. Binary Tree Diameter
7. Find Successor
8. Height Balanced Binary Tree
9. Merge Binary Trees
10. Symmetrical Tree

### Hard
11. Max Path Sum in Binary Tree
12. Find Nodes Distance K
13. Lowest Common Ancestor
14. Flatten Binary Tree

### Very Hard
15. Iterative In-Order Traversal
16. Right Sibling Tree
17. All Kinds of Node Depths
18. Compare Leaf Traversal

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Quick Reference</h3>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Traversal Templates:

def preorder(node):           def inorder(node):
    if not node: return           if not node: return
    process(node)                 inorder(node.left)
    preorder(node.left)           process(node)
    preorder(node.right)          inorder(node.right)

def postorder(node):          def levelorder(root):
    if not node: return           queue = [root]
    postorder(node.left)          while queue:
    postorder(node.right)             node = queue.pop(0)
    process(node)                     process(node)
                                      if node.left: queue.append(node.left)
                                      if node.right: queue.append(node.right)

Tree Properties:
  - Perfect tree with height h: 2^(h+1) - 1 nodes
  - Complete tree with n nodes: height = floor(log2(n))
  - Max nodes at level k: 2^k
  - Leaves in full tree: (n + 1) / 2
</pre>
</div>
