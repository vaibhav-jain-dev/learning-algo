# Binary Trees

## Overview

A Binary Tree is a hierarchical data structure where each node has at most two children (left and right). Unlike BSTs, there's no ordering constraint between nodes. Binary trees form the foundation for many advanced data structures.

## Key Concepts & Terminology

### Core Terminology
- **Root**: Topmost node
- **Leaf**: Node with no children
- **Internal Node**: Node with at least one child
- **Height**: Longest path from root to leaf
- **Depth**: Distance from root to a node
- **Level**: All nodes at same depth

### Tree Types
| Type | Property |
|------|----------|
| Full Binary Tree | Every node has 0 or 2 children |
| Complete Binary Tree | All levels filled except possibly last (left-aligned) |
| Perfect Binary Tree | All internal nodes have 2 children, all leaves at same level |
| Balanced Binary Tree | Height difference of subtrees ≤ 1 |

### Traversal Methods
- **DFS**: Pre-order, In-order, Post-order
- **BFS**: Level-order

### Common Patterns
1. **Recursive DFS** - Most tree problems
2. **Iterative with Stack** - When recursion depth is a concern
3. **BFS with Queue** - Level-order problems
4. **Parent Pointers** - Finding ancestors

### Boundary Conditions
1. Null/empty tree
2. Single node tree
3. Skewed tree (like a linked list)
4. Very deep trees (stack overflow risk)

---

## Problems

### 1. Branch Sums

**Difficulty:** Easy

**Problem Statement:**
Calculate the sum of values along each branch (root-to-leaf path) from left to right.

**Example:**
```
        1
       / \
      2   3
     / \ / \
    4  5 6  7
   / \
  8   9

Output: [15, 16, 8, 10, 11]
Paths: 1->2->4->8, 1->2->4->9, 1->2->5, 1->3->6, 1->3->7
```

<details>
<summary><strong>Hints</strong></summary>

1. Use DFS to traverse each branch
2. Pass running sum to each recursive call
3. Add to result when reaching a leaf

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def branchSums(root):
    """
    Time Complexity: O(n)
    Space Complexity: O(n) for output + O(h) for recursion
    """
    sums = []
    calculateBranchSums(root, 0, sums)
    return sums

def calculateBranchSums(node, running_sum, sums):
    if node is None:
        return

    new_sum = running_sum + node.value

    # If leaf node, add to results
    if node.left is None and node.right is None:
        sums.append(new_sum)
        return

    calculateBranchSums(node.left, new_sum, sums)
    calculateBranchSums(node.right, new_sum, sums)

# Test
root = BinaryTree(1)
root.left = BinaryTree(2)
root.right = BinaryTree(3)
root.left.left = BinaryTree(4)
root.left.right = BinaryTree(5)

print(branchSums(root))  # [7, 8, 4]
```

```go
package main

import "fmt"

type BinaryTree struct {
    Value int
    Left  *BinaryTree
    Right *BinaryTree
}

func branchSums(root *BinaryTree) []int {
    sums := []int{}
    calculateBranchSums(root, 0, &sums)
    return sums
}

func calculateBranchSums(node *BinaryTree, runningSum int, sums *[]int) {
    if node == nil {
        return
    }

    newSum := runningSum + node.Value

    if node.Left == nil && node.Right == nil {
        *sums = append(*sums, newSum)
        return
    }

    calculateBranchSums(node.Left, newSum, sums)
    calculateBranchSums(node.Right, newSum, sums)
}

func main() {
    root := &BinaryTree{Value: 1}
    root.Left = &BinaryTree{Value: 2}
    root.Right = &BinaryTree{Value: 3}
    fmt.Println(branchSums(root)) // [3 4]
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Path Sum** - Check if any branch sums to target
2. **Path Sum II** - Return all paths that sum to target
3. **Sum Root to Leaf Numbers** - Treat path as number

</details>

---

### 2. Node Depths

**Difficulty:** Easy

**Problem Statement:**
Calculate the sum of depths of all nodes in a binary tree.

**Example:**
```
        1         depth 0
       / \
      2   3       depth 1
     / \ / \
    4  5 6  7     depth 2
   /\
  8  9            depth 3

Output: 16 (0 + 1 + 1 + 2 + 2 + 2 + 2 + 3 + 3)
```

<details>
<summary><strong>Hints</strong></summary>

1. Track depth while traversing
2. Add current depth to running sum
3. Recursively process children with depth + 1

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def nodeDepths(root, depth=0):
    """
    Time Complexity: O(n)
    Space Complexity: O(h)
    """
    if root is None:
        return 0

    return depth + nodeDepths(root.left, depth + 1) + nodeDepths(root.right, depth + 1)

# Iterative version using stack
def nodeDepthsIterative(root):
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

# Test
root = BinaryTree(1)
root.left = BinaryTree(2)
root.right = BinaryTree(3)
root.left.left = BinaryTree(4)
root.left.right = BinaryTree(5)

print(nodeDepths(root))  # 6
```

```go
package main

import "fmt"

type BinaryTree struct {
    Value int
    Left  *BinaryTree
    Right *BinaryTree
}

func nodeDepths(root *BinaryTree) int {
    return nodeDepthsHelper(root, 0)
}

func nodeDepthsHelper(node *BinaryTree, depth int) int {
    if node == nil {
        return 0
    }

    return depth +
        nodeDepthsHelper(node.Left, depth+1) +
        nodeDepthsHelper(node.Right, depth+1)
}

func main() {
    root := &BinaryTree{Value: 1}
    root.Left = &BinaryTree{Value: 2}
    root.Right = &BinaryTree{Value: 3}
    root.Left.Left = &BinaryTree{Value: 4}

    fmt.Println(nodeDepths(root)) // 4
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Maximum Depth of Binary Tree** - Find deepest node
2. **Minimum Depth of Binary Tree** - Find shallowest leaf
3. **Average of Levels** - Average value at each depth

</details>

---

### 3. Evaluate Expression Tree

**Difficulty:** Easy

**Problem Statement:**
Evaluate an expression tree where leaves are operands and internal nodes are operators (-1: +, -2: -, -3: *, -4: /).

**Example:**
```
        -1 (+)
       /      \
    -2 (-)   -3 (*)
    /   \    /    \
   2     3  8      3

Output: ((2-3) + (8*3)) = -1 + 24 = 23
```

<details>
<summary><strong>Hints</strong></summary>

1. Post-order traversal (evaluate children first)
2. Leaf nodes return their value
3. Internal nodes apply operation to children's results

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def evaluateExpressionTree(tree):
    """
    Time Complexity: O(n)
    Space Complexity: O(h)
    """
    # Leaf node (operand)
    if tree.value >= 0:
        return tree.value

    left_value = evaluateExpressionTree(tree.left)
    right_value = evaluateExpressionTree(tree.right)

    if tree.value == -1:  # Addition
        return left_value + right_value
    elif tree.value == -2:  # Subtraction
        return left_value - right_value
    elif tree.value == -3:  # Multiplication
        return left_value * right_value
    elif tree.value == -4:  # Division
        return int(left_value / right_value)

    return 0

# Test
root = BinaryTree(-1)
root.left = BinaryTree(-2)
root.right = BinaryTree(-3)
root.left.left = BinaryTree(2)
root.left.right = BinaryTree(3)
root.right.left = BinaryTree(8)
root.right.right = BinaryTree(3)

print(evaluateExpressionTree(root))  # 23
```

```go
package main

import "fmt"

type BinaryTree struct {
    Value int
    Left  *BinaryTree
    Right *BinaryTree
}

func evaluateExpressionTree(tree *BinaryTree) int {
    if tree.Value >= 0 {
        return tree.Value
    }

    leftValue := evaluateExpressionTree(tree.Left)
    rightValue := evaluateExpressionTree(tree.Right)

    switch tree.Value {
    case -1:
        return leftValue + rightValue
    case -2:
        return leftValue - rightValue
    case -3:
        return leftValue * rightValue
    case -4:
        return leftValue / rightValue
    }

    return 0
}

func main() {
    root := &BinaryTree{Value: -1}
    root.Left = &BinaryTree{Value: 2}
    root.Right = &BinaryTree{Value: 3}

    fmt.Println(evaluateExpressionTree(root)) // 5
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Evaluate Reverse Polish Notation** - Stack-based evaluation
2. **Basic Calculator** - Parse and evaluate string expression
3. **Design Expression Tree** - Build tree from expression

</details>

---

### 4. Invert Binary Tree

**Difficulty:** Medium

**Problem Statement:**
Invert a binary tree (swap left and right children for all nodes).

**Example:**
```
Before:          After:
    1               1
   / \             / \
  2   3           3   2
 / \             / \
4   5           5   4
```

<details>
<summary><strong>Hints</strong></summary>

1. Swap left and right children at each node
2. Recursively invert subtrees
3. Can use BFS or DFS

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def invertBinaryTree(tree):
    """
    Time Complexity: O(n)
    Space Complexity: O(h)
    """
    if tree is None:
        return None

    # Swap children
    tree.left, tree.right = tree.right, tree.left

    # Recursively invert subtrees
    invertBinaryTree(tree.left)
    invertBinaryTree(tree.right)

    return tree

# BFS Approach
from collections import deque

def invertBinaryTreeBFS(tree):
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

# Test
root = BinaryTree(1)
root.left = BinaryTree(2)
root.right = BinaryTree(3)
root.left.left = BinaryTree(4)
root.left.right = BinaryTree(5)

invertBinaryTree(root)
print(root.left.value)  # 3
print(root.right.value)  # 2
```

```go
package main

import "fmt"

type BinaryTree struct {
    Value int
    Left  *BinaryTree
    Right *BinaryTree
}

func invertBinaryTree(tree *BinaryTree) *BinaryTree {
    if tree == nil {
        return nil
    }

    tree.Left, tree.Right = tree.Right, tree.Left

    invertBinaryTree(tree.Left)
    invertBinaryTree(tree.Right)

    return tree
}

func main() {
    root := &BinaryTree{Value: 1}
    root.Left = &BinaryTree{Value: 2}
    root.Right = &BinaryTree{Value: 3}

    invertBinaryTree(root)
    fmt.Println(root.Left.Value)  // 3
    fmt.Println(root.Right.Value) // 2
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Symmetric Tree** - Check if tree is mirror of itself
2. **Same Tree** - Check if two trees are identical
3. **Flip Equivalent Binary Trees** - Check equivalence after flips

</details>

---

### 5. Binary Tree Diameter

**Difficulty:** Medium

**Problem Statement:**
Find the diameter of a binary tree - the longest path between any two nodes.

**Example:**
```
        1
       / \
      3   2
     / \
    7   4
   /     \
  8       5
           \
            6

Diameter: 6 (path: 8->7->3->4->5->6)
```

<details>
<summary><strong>Hints</strong></summary>

1. Diameter through a node = left height + right height
2. Track maximum diameter seen so far
3. Return height at each node, update diameter

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def binaryTreeDiameter(tree):
    """
    Time Complexity: O(n)
    Space Complexity: O(h)
    """
    max_diameter = [0]

    def getHeight(node):
        if node is None:
            return 0

        left_height = getHeight(node.left)
        right_height = getHeight(node.right)

        # Diameter through current node
        diameter = left_height + right_height
        max_diameter[0] = max(max_diameter[0], diameter)

        return 1 + max(left_height, right_height)

    getHeight(tree)
    return max_diameter[0]

# Test
root = BinaryTree(1)
root.left = BinaryTree(3)
root.right = BinaryTree(2)
root.left.left = BinaryTree(7)
root.left.right = BinaryTree(4)

print(binaryTreeDiameter(root))  # 3
```

```go
package main

import "fmt"

type BinaryTree struct {
    Value int
    Left  *BinaryTree
    Right *BinaryTree
}

func binaryTreeDiameter(tree *BinaryTree) int {
    maxDiameter := 0
    getHeight(tree, &maxDiameter)
    return maxDiameter
}

func getHeight(node *BinaryTree, maxDiameter *int) int {
    if node == nil {
        return 0
    }

    leftHeight := getHeight(node.Left, maxDiameter)
    rightHeight := getHeight(node.Right, maxDiameter)

    diameter := leftHeight + rightHeight
    if diameter > *maxDiameter {
        *maxDiameter = diameter
    }

    if leftHeight > rightHeight {
        return 1 + leftHeight
    }
    return 1 + rightHeight
}

func main() {
    root := &BinaryTree{Value: 1}
    root.Left = &BinaryTree{Value: 3}
    root.Right = &BinaryTree{Value: 2}

    fmt.Println(binaryTreeDiameter(root)) // 2
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Diameter of N-ary Tree** - N children per node
2. **Longest Path in Graph** - General graph version
3. **Longest Univalue Path** - Path with same values

</details>

---

### 6. Find Successor

**Difficulty:** Medium

**Problem Statement:**
Find the in-order successor of a node in a binary tree with parent pointers.

**Example:**
```
        1
       / \
      2   3
     / \
    4   5

Successor of 2 is 5
Successor of 5 is 1
Successor of 3 is None
```

<details>
<summary><strong>Hints</strong></summary>

1. If node has right subtree, successor is leftmost node in right subtree
2. Otherwise, go up to find first ancestor where current node is in left subtree

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
        self.parent = None

def findSuccessor(tree, node):
    """
    Time Complexity: O(h)
    Space Complexity: O(1)
    """
    # If right subtree exists, find leftmost node
    if node.right is not None:
        return getLeftmostChild(node.right)

    # Otherwise, go up to find successor
    return getRightmostParent(node)

def getLeftmostChild(node):
    current = node
    while current.left is not None:
        current = current.left
    return current

def getRightmostParent(node):
    current = node
    while current.parent is not None and current.parent.right == current:
        current = current.parent
    return current.parent

# Test
root = BinaryTree(1)
root.left = BinaryTree(2)
root.right = BinaryTree(3)
root.left.parent = root
root.right.parent = root
root.left.left = BinaryTree(4)
root.left.right = BinaryTree(5)
root.left.left.parent = root.left
root.left.right.parent = root.left

print(findSuccessor(root, root.left).value)  # 5
print(findSuccessor(root, root.left.right).value)  # 1
```

```go
package main

import "fmt"

type BinaryTree struct {
    Value  int
    Left   *BinaryTree
    Right  *BinaryTree
    Parent *BinaryTree
}

func findSuccessor(tree, node *BinaryTree) *BinaryTree {
    if node.Right != nil {
        return getLeftmostChild(node.Right)
    }
    return getRightmostParent(node)
}

func getLeftmostChild(node *BinaryTree) *BinaryTree {
    current := node
    for current.Left != nil {
        current = current.Left
    }
    return current
}

func getRightmostParent(node *BinaryTree) *BinaryTree {
    current := node
    for current.Parent != nil && current.Parent.Right == current {
        current = current.Parent
    }
    return current.Parent
}

func main() {
    root := &BinaryTree{Value: 1}
    root.Left = &BinaryTree{Value: 2, Parent: root}
    root.Right = &BinaryTree{Value: 3, Parent: root}

    result := findSuccessor(root, root.Left)
    if result != nil {
        fmt.Println(result.Value)
    }
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Inorder Successor in BST** - Without parent pointer
2. **Inorder Predecessor** - Find previous node
3. **Populating Next Right Pointers** - Connect level siblings

</details>

---

### 7. Height Balanced Binary Tree

**Difficulty:** Medium

**Problem Statement:**
Determine if a binary tree is height-balanced (heights of subtrees differ by at most 1).

**Example:**
```
Balanced:           Not Balanced:
    1                    1
   / \                  /
  2   3                2
 / \                  /
4   5                3
```

<details>
<summary><strong>Hints</strong></summary>

1. Calculate height while checking balance
2. Return -1 if subtree is unbalanced
3. Check: abs(left_height - right_height) <= 1

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def heightBalancedBinaryTree(tree):
    """
    Time Complexity: O(n)
    Space Complexity: O(h)
    """
    return getHeightAndBalance(tree)[0]

def getHeightAndBalance(node):
    """Returns (is_balanced, height)"""
    if node is None:
        return (True, 0)

    left_balanced, left_height = getHeightAndBalance(node.left)
    right_balanced, right_height = getHeightAndBalance(node.right)

    is_balanced = (left_balanced and
                   right_balanced and
                   abs(left_height - right_height) <= 1)

    height = 1 + max(left_height, right_height)

    return (is_balanced, height)

# Test
root = BinaryTree(1)
root.left = BinaryTree(2)
root.right = BinaryTree(3)
root.left.left = BinaryTree(4)

print(heightBalancedBinaryTree(root))  # True
```

```go
package main

import "fmt"

type BinaryTree struct {
    Value int
    Left  *BinaryTree
    Right *BinaryTree
}

type TreeInfo struct {
    IsBalanced bool
    Height     int
}

func heightBalancedBinaryTree(tree *BinaryTree) bool {
    return getHeightAndBalance(tree).IsBalanced
}

func getHeightAndBalance(node *BinaryTree) TreeInfo {
    if node == nil {
        return TreeInfo{true, 0}
    }

    left := getHeightAndBalance(node.Left)
    right := getHeightAndBalance(node.Right)

    isBalanced := left.IsBalanced && right.IsBalanced &&
                  abs(left.Height-right.Height) <= 1

    height := 1 + max(left.Height, right.Height)

    return TreeInfo{isBalanced, height}
}

func abs(x int) int {
    if x < 0 { return -x }
    return x
}

func max(a, b int) int {
    if a > b { return a }
    return b
}

func main() {
    root := &BinaryTree{Value: 1}
    root.Left = &BinaryTree{Value: 2}
    root.Right = &BinaryTree{Value: 3}

    fmt.Println(heightBalancedBinaryTree(root)) // true
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Check if Binary Tree is Perfect** - All levels filled
2. **Check if Binary Tree is Complete** - Levels filled left to right
3. **Balance a BST** - Rebalance an unbalanced BST

</details>

---

### 8. Merge Binary Trees

**Difficulty:** Medium

**Problem Statement:**
Merge two binary trees by adding overlapping node values, or use the non-null node.

**Example:**
```
Tree 1:       Tree 2:       Merged:
    1             2             3
   / \           / \           / \
  3   2         1   3         4   5
 /               \   \       / \   \
5                 4   7     5   4   7
```

<details>
<summary><strong>Hints</strong></summary>

1. If both nodes exist, add values
2. If only one exists, use that node
3. Recursively merge children

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def mergeBinaryTrees(tree1, tree2):
    """
    Time Complexity: O(min(n1, n2))
    Space Complexity: O(min(h1, h2))
    """
    if tree1 is None:
        return tree2
    if tree2 is None:
        return tree1

    tree1.value += tree2.value
    tree1.left = mergeBinaryTrees(tree1.left, tree2.left)
    tree1.right = mergeBinaryTrees(tree1.right, tree2.right)

    return tree1

# Test
tree1 = BinaryTree(1)
tree1.left = BinaryTree(3)
tree1.right = BinaryTree(2)

tree2 = BinaryTree(2)
tree2.left = BinaryTree(1)
tree2.right = BinaryTree(3)

merged = mergeBinaryTrees(tree1, tree2)
print(merged.value)  # 3
print(merged.left.value)  # 4
```

```go
package main

import "fmt"

type BinaryTree struct {
    Value int
    Left  *BinaryTree
    Right *BinaryTree
}

func mergeBinaryTrees(tree1, tree2 *BinaryTree) *BinaryTree {
    if tree1 == nil {
        return tree2
    }
    if tree2 == nil {
        return tree1
    }

    tree1.Value += tree2.Value
    tree1.Left = mergeBinaryTrees(tree1.Left, tree2.Left)
    tree1.Right = mergeBinaryTrees(tree1.Right, tree2.Right)

    return tree1
}

func main() {
    tree1 := &BinaryTree{Value: 1}
    tree1.Left = &BinaryTree{Value: 3}

    tree2 := &BinaryTree{Value: 2}
    tree2.Left = &BinaryTree{Value: 1}

    merged := mergeBinaryTrees(tree1, tree2)
    fmt.Println(merged.Value) // 3
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Same Tree** - Check if identical
2. **Subtree of Another Tree** - Check containment
3. **Clone Binary Tree with Random Pointer**

</details>

---

### 9. Max Path Sum In Binary Tree

**Difficulty:** Hard

**Problem Statement:**
Find the maximum path sum in a binary tree. A path can start and end at any node.

**Example:**
```
        1
       / \
      2   3
     / \   \
    4   5   6
       / \
      7   8

Maximum path sum: 7 + 5 + 2 + 1 + 3 + 6 = 24
Or simpler path: 5->2->1->3->6 = 17
```

<details>
<summary><strong>Hints</strong></summary>

1. At each node, consider: max path through this node
2. Track max single path (can extend to parent) vs max any path
3. Use post-order traversal

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def maxPathSum(tree):
    """
    Time Complexity: O(n)
    Space Complexity: O(h)
    """
    max_sum = [float('-inf')]

    def maxGain(node):
        if node is None:
            return 0

        # Get max gain from children (ignore negative)
        left_gain = max(maxGain(node.left), 0)
        right_gain = max(maxGain(node.right), 0)

        # Path through current node
        path_sum = node.value + left_gain + right_gain
        max_sum[0] = max(max_sum[0], path_sum)

        # Return max gain to parent (can only go one direction)
        return node.value + max(left_gain, right_gain)

    maxGain(tree)
    return max_sum[0]

# Test
root = BinaryTree(1)
root.left = BinaryTree(2)
root.right = BinaryTree(3)
root.left.left = BinaryTree(4)
root.left.right = BinaryTree(5)

print(maxPathSum(root))  # 11 (4+2+1+3+? or 5+2+1+3)
```

```go
package main

import (
    "fmt"
    "math"
)

type BinaryTree struct {
    Value int
    Left  *BinaryTree
    Right *BinaryTree
}

func maxPathSum(tree *BinaryTree) int {
    maxSum := math.MinInt64
    maxGain(tree, &maxSum)
    return maxSum
}

func maxGain(node *BinaryTree, maxSum *int) int {
    if node == nil {
        return 0
    }

    leftGain := max(maxGain(node.Left, maxSum), 0)
    rightGain := max(maxGain(node.Right, maxSum), 0)

    pathSum := node.Value + leftGain + rightGain
    if pathSum > *maxSum {
        *maxSum = pathSum
    }

    return node.Value + max(leftGain, rightGain)
}

func max(a, b int) int {
    if a > b { return a }
    return b
}

func main() {
    root := &BinaryTree{Value: 1}
    root.Left = &BinaryTree{Value: 2}
    root.Right = &BinaryTree{Value: 3}

    fmt.Println(maxPathSum(root)) // 6
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Longest Path with Same Value** - Consecutive same values
2. **Binary Tree Maximum Path Sum** - LeetCode version
3. **House Robber III** - Non-adjacent nodes

</details>

---

### 10. Find Nodes Distance K

**Difficulty:** Hard

**Problem Statement:**
Find all nodes at distance K from a target node.

**Example:**
```
        1
       / \
      2   3
     / \
    4   5

Target: 2, K: 2
Output: [3, 4, 5]
```

<details>
<summary><strong>Hints</strong></summary>

1. Build parent pointers or graph
2. BFS from target node
3. Track visited nodes to avoid cycles

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
from collections import deque

class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def findNodesDistanceK(tree, target, k):
    """
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    # Build parent mapping
    parents = {}
    buildParents(tree, None, parents)

    # BFS from target
    queue = deque([(target, 0)])
    visited = {target}
    result = []

    while queue:
        node, distance = queue.popleft()

        if distance == k:
            result.append(node.value)
        elif distance < k:
            # Explore neighbors
            neighbors = [node.left, node.right, parents.get(node)]
            for neighbor in neighbors:
                if neighbor and neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, distance + 1))

    return result

def buildParents(node, parent, parents):
    if node:
        parents[node] = parent
        buildParents(node.left, node, parents)
        buildParents(node.right, node, parents)

# Test
root = BinaryTree(1)
root.left = BinaryTree(2)
root.right = BinaryTree(3)
root.left.left = BinaryTree(4)
root.left.right = BinaryTree(5)

print(findNodesDistanceK(root, root.left, 2))  # [1, 4, 5] or [3, 4, 5]
```

```go
package main

import "fmt"

type BinaryTree struct {
    Value int
    Left  *BinaryTree
    Right *BinaryTree
}

func findNodesDistanceK(tree, target *BinaryTree, k int) []int {
    parents := make(map[*BinaryTree]*BinaryTree)
    buildParents(tree, nil, parents)

    type QueueItem struct {
        node     *BinaryTree
        distance int
    }

    queue := []QueueItem{{target, 0}}
    visited := make(map[*BinaryTree]bool)
    visited[target] = true
    result := []int{}

    for len(queue) > 0 {
        item := queue[0]
        queue = queue[1:]

        if item.distance == k {
            result = append(result, item.node.Value)
        } else if item.distance < k {
            neighbors := []*BinaryTree{item.node.Left, item.node.Right, parents[item.node]}
            for _, neighbor := range neighbors {
                if neighbor != nil && !visited[neighbor] {
                    visited[neighbor] = true
                    queue = append(queue, QueueItem{neighbor, item.distance + 1})
                }
            }
        }
    }

    return result
}

func buildParents(node, parent *BinaryTree, parents map[*BinaryTree]*BinaryTree) {
    if node != nil {
        parents[node] = parent
        buildParents(node.Left, node, parents)
        buildParents(node.Right, node, parents)
    }
}

func main() {
    root := &BinaryTree{Value: 1}
    root.Left = &BinaryTree{Value: 2}
    root.Right = &BinaryTree{Value: 3}

    fmt.Println(findNodesDistanceK(root, root.Left, 1)) // [1 or values at distance 1]
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **All Nodes Distance K in Binary Tree** - LeetCode version
2. **Closest Leaf in Binary Tree** - Find nearest leaf
3. **Amount of Time for Binary Tree to Be Infected**

</details>

---

### 11-13. Advanced Problems (Very Hard)

<details>
<summary><strong>Iterative In-Order Traversal</strong></summary>

```python
def iterativeInOrderTraversal(tree, callback):
    """Traverse without recursion"""
    stack = []
    current = tree

    while current or stack:
        while current:
            stack.append(current)
            current = current.left

        current = stack.pop()
        callback(current)
        current = current.right
```

**Similar Problems:**
1. Binary Tree Morris Traversal
2. N-ary Tree Iterative Traversal
3. BST Iterator

</details>

<details>
<summary><strong>Flatten Binary Tree</strong></summary>

```python
def flattenBinaryTree(root):
    """Flatten to linked list in-place (in-order)"""
    leftmost, _ = flattenHelper(root)
    return leftmost

def flattenHelper(node):
    if node is None:
        return (None, None)

    if node.left is None and node.right is None:
        return (node, node)

    left_head, left_tail = flattenHelper(node.left)
    right_head, right_tail = flattenHelper(node.right)

    if left_tail:
        left_tail.right = node
        node.left = left_tail

    if right_head:
        node.right = right_head
        right_head.left = node

    head = left_head if left_head else node
    tail = right_tail if right_tail else node

    return (head, tail)
```

**Similar Problems:**
1. Flatten Binary Tree to Linked List
2. Convert BST to Sorted Doubly Linked List
3. Serialize and Deserialize Binary Tree

</details>

<details>
<summary><strong>Right Sibling Tree</strong></summary>

```python
def rightSiblingTree(root):
    """Connect right siblings at same level"""
    mutate(root, None, False)
    return root

def mutate(node, parent, is_left_child):
    if node is None:
        return

    left, right = node.left, node.right
    mutate(left, node, True)

    if parent is None:
        node.right = None
    elif is_left_child:
        node.right = parent.right
    else:
        if parent.right is None:
            node.right = None
        else:
            node.right = parent.right.left

    mutate(right, node, False)
```

**Similar Problems:**
1. Populating Next Right Pointers
2. Connect Nodes at Same Level
3. Binary Tree Right Side View

</details>

---

## Practice Tips

### Tree Problem Patterns

| Pattern | Use Case |
|---------|----------|
| DFS Recursive | Most tree problems |
| DFS Iterative | Stack overflow concerns |
| BFS | Level-order, shortest path |
| Post-order | Need children info first |
| Parent pointers | Upward traversal |

### Common Mistakes

1. Forgetting base case (null node)
2. Not handling single-child nodes
3. Confusing height vs depth
4. Stack overflow on deep trees
