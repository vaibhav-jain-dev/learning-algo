# Binary Search Trees (BST)

## Overview

A Binary Search Tree is a binary tree where for each node, all values in the left subtree are less than the node's value, and all values in the right subtree are greater. This property enables efficient searching, insertion, and deletion operations.

## Key Concepts & Terminology

### Core Properties
- **BST Property**: Left child < Parent < Right child
- **In-order traversal** yields sorted sequence
- **Height**: Maximum edges from root to leaf
- **Balanced BST**: Height is O(log n)

### Time Complexities
| Operation | Average | Worst (Unbalanced) |
|-----------|---------|-------------------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |
| Min/Max | O(log n) | O(n) |

### Traversal Types
- **In-order**: Left → Root → Right (gives sorted order)
- **Pre-order**: Root → Left → Right (useful for copying)
- **Post-order**: Left → Right → Root (useful for deletion)

### Common Patterns
1. **Recursion** with left/right subtree exploration
2. **Range validation** for BST verification
3. **In-order successor/predecessor** finding
4. **Iterative traversal** using stack

### Boundary Conditions
1. Empty tree (root is null)
2. Single node tree
3. Skewed tree (all left or all right)
4. Duplicate values handling

---

## Problems

### 1. Find Closest Value In BST

**Difficulty:** Easy

**Problem Statement:**
Given a BST and a target integer value, find the value in the BST closest to the target.

**Example:**
```
        10
       /  \
      5    15
     / \   / \
    2   5 13  22
   /       \
  1        14

Target: 12
Output: 13
```

<details>
<summary><strong>Hints</strong></summary>

1. Start at root and track closest value found
2. Move left if target < current, right if target > current
3. Update closest when current is closer to target

</details>

<details>
<summary><strong>Solution</strong></summary>

**Approach:** Iterative Traversal

```python
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def findClosestValueInBst(tree, target):
    """
    Time Complexity: O(log n) average, O(n) worst
    Space Complexity: O(1)
    """
    closest = tree.value
    current = tree

    while current is not None:
        if abs(target - current.value) < abs(target - closest):
            closest = current.value

        if target < current.value:
            current = current.left
        elif target > current.value:
            current = current.right
        else:
            return current.value  # Exact match

    return closest

# Test
root = BST(10)
root.left = BST(5)
root.right = BST(15)
root.left.left = BST(2)
root.left.right = BST(5)
root.right.left = BST(13)
root.right.right = BST(22)

print(findClosestValueInBst(root, 12))  # 13
```

```go
package main

import (
    "fmt"
    "math"
)

type BST struct {
    Value int
    Left  *BST
    Right *BST
}

func findClosestValueInBst(tree *BST, target int) int {
    closest := tree.Value
    current := tree

    for current != nil {
        if abs(target-current.Value) < abs(target-closest) {
            closest = current.Value
        }

        if target < current.Value {
            current = current.Left
        } else if target > current.Value {
            current = current.Right
        } else {
            return current.Value
        }
    }

    return closest
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}

func main() {
    root := &BST{Value: 10}
    root.Left = &BST{Value: 5}
    root.Right = &BST{Value: 15}
    fmt.Println(findClosestValueInBst(root, 12))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Closest Binary Search Tree Value II** - Find k closest values
2. **Search in BST** - Find exact value
3. **Minimum Absolute Difference in BST** - Min diff between any two nodes

</details>

---

### 2. Validate BST

**Difficulty:** Easy

**Problem Statement:**
Determine if a binary tree is a valid Binary Search Tree.

**Example:**
```
Valid BST:          Invalid BST:
    10                  10
   /  \                /  \
  5    15             5    15
 / \   / \           / \   / \
2   5 13  22        2   5 10  22
```

<details>
<summary><strong>Hints</strong></summary>

1. Each node must satisfy: min < node.value < max
2. Pass valid range to recursive calls
3. Update range when going left (max = node.value) or right (min = node.value)

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def validateBst(tree):
    """
    Time Complexity: O(n)
    Space Complexity: O(h) where h is height
    """
    return validateBstHelper(tree, float('-inf'), float('inf'))

def validateBstHelper(node, min_val, max_val):
    if node is None:
        return True

    if node.value < min_val or node.value >= max_val:
        return False

    return (validateBstHelper(node.left, min_val, node.value) and
            validateBstHelper(node.right, node.value, max_val))

# Test
root = BST(10)
root.left = BST(5)
root.right = BST(15)
print(validateBst(root))  # True
```

```go
package main

import (
    "fmt"
    "math"
)

type BST struct {
    Value int
    Left  *BST
    Right *BST
}

func validateBst(tree *BST) bool {
    return validateBstHelper(tree, math.MinInt64, math.MaxInt64)
}

func validateBstHelper(node *BST, minVal, maxVal int) bool {
    if node == nil {
        return true
    }

    if node.Value < minVal || node.Value >= maxVal {
        return false
    }

    return validateBstHelper(node.Left, minVal, node.Value) &&
           validateBstHelper(node.Right, node.Value, maxVal)
}

func main() {
    root := &BST{Value: 10}
    root.Left = &BST{Value: 5}
    root.Right = &BST{Value: 15}
    fmt.Println(validateBst(root)) // true
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Recover Binary Search Tree** - Fix two swapped nodes
2. **Validate Binary Tree Nodes** - Check if valid binary tree
3. **Check Completeness of Binary Tree** - Validate complete tree

</details>

---

### 3. BST Traversal

**Difficulty:** Easy

**Problem Statement:**
Implement in-order, pre-order, and post-order traversal of a BST.

**Example:**
```
        10
       /  \
      5    15
     / \
    2   5

In-order:  [2, 5, 5, 10, 15]
Pre-order: [10, 5, 2, 5, 15]
Post-order: [2, 5, 5, 15, 10]
```

<details>
<summary><strong>Hints</strong></summary>

1. In-order: Left → Node → Right
2. Pre-order: Node → Left → Right
3. Post-order: Left → Right → Node

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def inOrderTraverse(tree, array):
    """In-order: Left -> Root -> Right"""
    if tree is not None:
        inOrderTraverse(tree.left, array)
        array.append(tree.value)
        inOrderTraverse(tree.right, array)
    return array

def preOrderTraverse(tree, array):
    """Pre-order: Root -> Left -> Right"""
    if tree is not None:
        array.append(tree.value)
        preOrderTraverse(tree.left, array)
        preOrderTraverse(tree.right, array)
    return array

def postOrderTraverse(tree, array):
    """Post-order: Left -> Right -> Root"""
    if tree is not None:
        postOrderTraverse(tree.left, array)
        postOrderTraverse(tree.right, array)
        array.append(tree.value)
    return array

# Test
root = BST(10)
root.left = BST(5)
root.right = BST(15)
root.left.left = BST(2)
root.left.right = BST(5)

print(inOrderTraverse(root, []))   # [2, 5, 5, 10, 15]
print(preOrderTraverse(root, []))  # [10, 5, 2, 5, 15]
print(postOrderTraverse(root, [])) # [2, 5, 5, 15, 10]
```

```go
package main

import "fmt"

type BST struct {
    Value int
    Left  *BST
    Right *BST
}

func inOrderTraverse(tree *BST, array []int) []int {
    if tree != nil {
        array = inOrderTraverse(tree.Left, array)
        array = append(array, tree.Value)
        array = inOrderTraverse(tree.Right, array)
    }
    return array
}

func preOrderTraverse(tree *BST, array []int) []int {
    if tree != nil {
        array = append(array, tree.Value)
        array = preOrderTraverse(tree.Left, array)
        array = preOrderTraverse(tree.Right, array)
    }
    return array
}

func postOrderTraverse(tree *BST, array []int) []int {
    if tree != nil {
        array = postOrderTraverse(tree.Left, array)
        array = postOrderTraverse(tree.Right, array)
        array = append(array, tree.Value)
    }
    return array
}

func main() {
    root := &BST{Value: 10}
    root.Left = &BST{Value: 5}
    root.Right = &BST{Value: 15}

    fmt.Println(inOrderTraverse(root, []int{}))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Binary Tree Level Order Traversal** - BFS traversal
2. **Binary Tree Zigzag Level Order** - Alternating direction
3. **Vertical Order Traversal** - Column-based traversal

</details>

---

### 4. Min Height BST

**Difficulty:** Medium

**Problem Statement:**
Given a sorted array of distinct integers, construct a BST with minimum height.

**Example:**
```
Input: [1, 2, 5, 7, 10, 13, 14, 15, 22]
Output: BST with height 3
        10
       /  \
      2    14
     / \   / \
    1   5 13  15
         \     \
          7    22
```

<details>
<summary><strong>Hints</strong></summary>

1. Use binary search approach
2. Middle element becomes root
3. Left half → left subtree, right half → right subtree
4. Recursively build subtrees

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def minHeightBst(array):
    """
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    return buildMinHeightBst(array, 0, len(array) - 1)

def buildMinHeightBst(array, start, end):
    if start > end:
        return None

    mid = (start + end) // 2
    node = BST(array[mid])

    node.left = buildMinHeightBst(array, start, mid - 1)
    node.right = buildMinHeightBst(array, mid + 1, end)

    return node

# Test
array = [1, 2, 5, 7, 10, 13, 14, 15, 22]
root = minHeightBst(array)
print(root.value)  # 10
```

```go
package main

import "fmt"

type BST struct {
    Value int
    Left  *BST
    Right *BST
}

func minHeightBst(array []int) *BST {
    return buildMinHeightBst(array, 0, len(array)-1)
}

func buildMinHeightBst(array []int, start, end int) *BST {
    if start > end {
        return nil
    }

    mid := (start + end) / 2
    node := &BST{Value: array[mid]}

    node.Left = buildMinHeightBst(array, start, mid-1)
    node.Right = buildMinHeightBst(array, mid+1, end)

    return node
}

func main() {
    array := []int{1, 2, 5, 7, 10, 13, 14, 15, 22}
    root := minHeightBst(array)
    fmt.Println(root.Value) // 10
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Convert Sorted List to BST** - Same but with linked list
2. **Balance a BST** - Rebalance an existing BST
3. **Serialize and Deserialize BST** - Encoding/decoding

</details>

---

### 5. Find Kth Largest Value In BST

**Difficulty:** Medium

**Problem Statement:**
Find the kth largest value in a BST.

**Example:**
```
        15
       /  \
      5    20
     / \   / \
    2   5 17  22
   /
  1

k = 3
Output: 17 (22, 20, 17 are largest three)
```

<details>
<summary><strong>Hints</strong></summary>

1. Reverse in-order traversal gives descending order
2. Right → Node → Left
3. Stop when k nodes visited

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def findKthLargestValueInBst(tree, k):
    """
    Time Complexity: O(h + k)
    Space Complexity: O(h)
    """
    result = {'count': 0, 'value': None}
    reverseInOrder(tree, k, result)
    return result['value']

def reverseInOrder(node, k, result):
    if node is None or result['count'] >= k:
        return

    # Visit right first (larger values)
    reverseInOrder(node.right, k, result)

    if result['count'] < k:
        result['count'] += 1
        if result['count'] == k:
            result['value'] = node.value
            return

    # Then visit left
    reverseInOrder(node.left, k, result)

# Test
root = BST(15)
root.left = BST(5)
root.right = BST(20)
root.left.left = BST(2)
root.left.right = BST(5)
root.right.left = BST(17)
root.right.right = BST(22)

print(findKthLargestValueInBst(root, 3))  # 17
```

```go
package main

import "fmt"

type BST struct {
    Value int
    Left  *BST
    Right *BST
}

type Result struct {
    count int
    value int
}

func findKthLargestValueInBst(tree *BST, k int) int {
    result := &Result{count: 0, value: -1}
    reverseInOrder(tree, k, result)
    return result.value
}

func reverseInOrder(node *BST, k int, result *Result) {
    if node == nil || result.count >= k {
        return
    }

    reverseInOrder(node.Right, k, result)

    if result.count < k {
        result.count++
        if result.count == k {
            result.value = node.Value
            return
        }
    }

    reverseInOrder(node.Left, k, result)
}

func main() {
    root := &BST{Value: 15}
    root.Left = &BST{Value: 5}
    root.Right = &BST{Value: 20}
    root.Right.Left = &BST{Value: 17}
    root.Right.Right = &BST{Value: 22}

    fmt.Println(findKthLargestValueInBst(root, 3)) // 17
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Kth Smallest Element in BST** - Regular in-order traversal
2. **Second Minimum Node** - Find second smallest
3. **Kth Largest Element in Stream** - Dynamic kth largest

</details>

---

### 6. Reconstruct BST

**Difficulty:** Medium

**Problem Statement:**
Given the pre-order traversal of a BST, reconstruct the original BST.

**Example:**
```
Input: [10, 4, 2, 1, 5, 17, 19, 18]
Output:
        10
       /  \
      4    17
     / \     \
    2   5    19
   /        /
  1        18
```

<details>
<summary><strong>Hints</strong></summary>

1. First element is always root
2. Elements less than root form left subtree
3. Elements greater than root form right subtree
4. Use range validation for efficiency

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BST:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

def reconstructBst(preOrderTraversalValues):
    """
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    if not preOrderTraversalValues:
        return None

    idx = {'current': 0}
    return buildBst(preOrderTraversalValues, idx, float('-inf'), float('inf'))

def buildBst(values, idx, min_val, max_val):
    if idx['current'] >= len(values):
        return None

    value = values[idx['current']]
    if value < min_val or value >= max_val:
        return None

    idx['current'] += 1
    node = BST(value)

    node.left = buildBst(values, idx, min_val, value)
    node.right = buildBst(values, idx, value, max_val)

    return node

# Test
preorder = [10, 4, 2, 1, 5, 17, 19, 18]
root = reconstructBst(preorder)
print(root.value)  # 10
print(root.left.value)  # 4
print(root.right.value)  # 17
```

```go
package main

import (
    "fmt"
    "math"
)

type BST struct {
    Value int
    Left  *BST
    Right *BST
}

func reconstructBst(preOrder []int) *BST {
    if len(preOrder) == 0 {
        return nil
    }

    idx := 0
    return buildBst(preOrder, &idx, math.MinInt64, math.MaxInt64)
}

func buildBst(values []int, idx *int, minVal, maxVal int) *BST {
    if *idx >= len(values) {
        return nil
    }

    value := values[*idx]
    if value < minVal || value >= maxVal {
        return nil
    }

    *idx++
    node := &BST{Value: value}

    node.Left = buildBst(values, idx, minVal, value)
    node.Right = buildBst(values, idx, value, maxVal)

    return node
}

func main() {
    preorder := []int{10, 4, 2, 1, 5, 17, 19, 18}
    root := reconstructBst(preorder)
    fmt.Println(root.Value) // 10
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Construct BST from Preorder and Inorder** - Two arrays
2. **Construct BST from Postorder** - Post-order input
3. **Verify Preorder Sequence in BST** - Check if valid

</details>

---

### 7. Same BSTs

**Difficulty:** Hard

**Problem Statement:**
Given two arrays that could represent the same BST (without building the trees), determine if they represent the same BST.

**Example:**
```
arrayOne = [10, 15, 8, 12, 94, 81, 5, 2, 11]
arrayTwo = [10, 8, 5, 15, 2, 12, 11, 94, 81]
Output: true (both would create the same BST)
```

<details>
<summary><strong>Hints</strong></summary>

1. First elements must be equal (root)
2. Elements smaller than root form left subtree
3. Elements larger than root form right subtree
4. Recursively check left and right subtrees

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def sameBsts(arrayOne, arrayTwo):
    """
    Time Complexity: O(n²)
    Space Complexity: O(n²) for creating subarrays

    Optimized: O(n²) time, O(d) space with index tracking
    """
    if len(arrayOne) != len(arrayTwo):
        return False

    if len(arrayOne) == 0:
        return True

    if arrayOne[0] != arrayTwo[0]:
        return False

    # Separate into smaller and larger elements
    leftOne = [x for x in arrayOne[1:] if x < arrayOne[0]]
    leftTwo = [x for x in arrayTwo[1:] if x < arrayTwo[0]]

    rightOne = [x for x in arrayOne[1:] if x >= arrayOne[0]]
    rightTwo = [x for x in arrayTwo[1:] if x >= arrayTwo[0]]

    return sameBsts(leftOne, leftTwo) and sameBsts(rightOne, rightTwo)

# Test
arrayOne = [10, 15, 8, 12, 94, 81, 5, 2, 11]
arrayTwo = [10, 8, 5, 15, 2, 12, 11, 94, 81]
print(sameBsts(arrayOne, arrayTwo))  # True
```

```go
package main

import "fmt"

func sameBsts(arrayOne, arrayTwo []int) bool {
    if len(arrayOne) != len(arrayTwo) {
        return false
    }

    if len(arrayOne) == 0 {
        return true
    }

    if arrayOne[0] != arrayTwo[0] {
        return false
    }

    leftOne := getSmaller(arrayOne)
    leftTwo := getSmaller(arrayTwo)
    rightOne := getLargerOrEqual(arrayOne)
    rightTwo := getLargerOrEqual(arrayTwo)

    return sameBsts(leftOne, leftTwo) && sameBsts(rightOne, rightTwo)
}

func getSmaller(array []int) []int {
    result := []int{}
    for i := 1; i < len(array); i++ {
        if array[i] < array[0] {
            result = append(result, array[i])
        }
    }
    return result
}

func getLargerOrEqual(array []int) []int {
    result := []int{}
    for i := 1; i < len(array); i++ {
        if array[i] >= array[0] {
            result = append(result, array[i])
        }
    }
    return result
}

func main() {
    arrayOne := []int{10, 15, 8, 12, 94, 81, 5, 2, 11}
    arrayTwo := []int{10, 8, 5, 15, 2, 12, 11, 94, 81}
    fmt.Println(sameBsts(arrayOne, arrayTwo)) // true
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Same Tree** - Check if two trees are identical
2. **Subtree of Another Tree** - Check if one is subtree of other
3. **Flip Equivalent Binary Trees** - Trees equivalent after flips

</details>

---

### 8. Validate Three Nodes

**Difficulty:** Hard

**Problem Statement:**
Given three nodes in a BST, determine if one of them is an ancestor of another and that other is an ancestor of the third.

**Example:**
```
        5
       / \
      2   7
     / \ / \
    1  4 6  8
       /
      3

nodeOne = 5, nodeTwo = 2, nodeThree = 3
Output: true (5 is ancestor of 2, 2 is ancestor of 3)
```

<details>
<summary><strong>Hints</strong></summary>

1. Check both orderings: 1→2→3 and 3→2→1
2. Helper to check if A is descendant of B
3. Consider that nodeTwo must be in between

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def validateThreeNodes(nodeOne, nodeTwo, nodeThree):
    """
    Time Complexity: O(h) where h is height
    Space Complexity: O(1)
    """
    # Check if nodeTwo is between nodeOne and nodeThree
    # Case 1: nodeOne -> nodeTwo -> nodeThree
    # Case 2: nodeThree -> nodeTwo -> nodeOne

    if isDescendant(nodeTwo, nodeOne):
        return isDescendant(nodeThree, nodeTwo)
    elif isDescendant(nodeTwo, nodeThree):
        return isDescendant(nodeOne, nodeTwo)
    return False

def isDescendant(node, target):
    """Check if target is a descendant of node"""
    current = node
    while current is not None and current != target:
        if target.value < current.value:
            current = current.left
        else:
            current = current.right
    return current == target

# Test
root = BST(5)
root.left = BST(2)
root.right = BST(7)
root.left.left = BST(1)
root.left.right = BST(4)
root.left.right.left = BST(3)

print(validateThreeNodes(root, root.left, root.left.right.left))  # True
```

```go
package main

import "fmt"

type BST struct {
    Value int
    Left  *BST
    Right *BST
}

func validateThreeNodes(nodeOne, nodeTwo, nodeThree *BST) bool {
    if isDescendant(nodeTwo, nodeOne) {
        return isDescendant(nodeThree, nodeTwo)
    } else if isDescendant(nodeTwo, nodeThree) {
        return isDescendant(nodeOne, nodeTwo)
    }
    return false
}

func isDescendant(node, target *BST) bool {
    current := node
    for current != nil && current != target {
        if target.Value < current.Value {
            current = current.Left
        } else {
            current = current.Right
        }
    }
    return current == target
}

func main() {
    root := &BST{Value: 5}
    root.Left = &BST{Value: 2}
    root.Right = &BST{Value: 7}
    root.Left.Left = &BST{Value: 1}
    root.Left.Right = &BST{Value: 4}
    root.Left.Right.Left = &BST{Value: 3}

    fmt.Println(validateThreeNodes(root, root.Left, root.Left.Right.Left)) // true
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Lowest Common Ancestor of BST** - Find LCA of two nodes
2. **Distance Between Two Nodes** - Find path length
3. **All Nodes Distance K** - Nodes at distance K

</details>

---

### 9. Repair BST

**Difficulty:** Hard

**Problem Statement:**
Two nodes in a BST have been swapped by mistake. Recover the tree without changing its structure.

**Example:**
```
Before:        After (repaired):
    3              2
   / \            / \
  1   4          1   4
     /              /
    2              3
```

<details>
<summary><strong>Hints</strong></summary>

1. In-order traversal should be sorted
2. Find the two nodes that are out of order
3. Swap their values

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def repairBst(tree):
    """
    Time Complexity: O(n)
    Space Complexity: O(h) for recursion stack
    """
    state = {
        'first': None,
        'second': None,
        'prev': None
    }

    inorderFind(tree, state)

    # Swap the values
    if state['first'] and state['second']:
        state['first'].value, state['second'].value = \
            state['second'].value, state['first'].value

    return tree

def inorderFind(node, state):
    if node is None:
        return

    inorderFind(node.left, state)

    # Check if current node violates BST property
    if state['prev'] and state['prev'].value > node.value:
        if state['first'] is None:
            state['first'] = state['prev']
        state['second'] = node

    state['prev'] = node

    inorderFind(node.right, state)

# Test
root = BST(3)
root.left = BST(1)
root.right = BST(4)
root.right.left = BST(2)

repairBst(root)
print(root.value)  # 2
```

```go
package main

import "fmt"

type BST struct {
    Value int
    Left  *BST
    Right *BST
}

type State struct {
    first  *BST
    second *BST
    prev   *BST
}

func repairBst(tree *BST) *BST {
    state := &State{}
    inorderFind(tree, state)

    if state.first != nil && state.second != nil {
        state.first.Value, state.second.Value = state.second.Value, state.first.Value
    }

    return tree
}

func inorderFind(node *BST, state *State) {
    if node == nil {
        return
    }

    inorderFind(node.Left, state)

    if state.prev != nil && state.prev.Value > node.Value {
        if state.first == nil {
            state.first = state.prev
        }
        state.second = node
    }

    state.prev = node

    inorderFind(node.Right, state)
}

func main() {
    root := &BST{Value: 3}
    root.Left = &BST{Value: 1}
    root.Right = &BST{Value: 4}
    root.Right.Left = &BST{Value: 2}

    repairBst(root)
    fmt.Println(root.Value) // 2
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Recover Binary Search Tree (LeetCode)** - Identical problem
2. **Find Wrong Element** - Just identify the wrong elements
3. **Correct BST** - Multiple swaps correction

</details>

---

### 10. Sum BSTs

**Difficulty:** Hard

**Problem Statement:**
Given a binary tree (not necessarily a BST), find the maximum sum of all keys in any subtree that is also a valid BST.

**Example:**
```
        1
       / \
      4   3
     / \ / \
    2  4 2  5
            /\
           4  6

Output: 20 (subtree rooted at 3: 3 + 2 + 5 + 4 + 6 = 20)
```

<details>
<summary><strong>Hints</strong></summary>

1. Post-order traversal to check subtrees first
2. Track: isBST, min value, max value, sum for each subtree
3. Update maximum sum when valid BST found

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def maxSumBST(root):
    """
    Time Complexity: O(n)
    Space Complexity: O(h)
    """
    result = {'max_sum': 0}

    def postorder(node):
        # Returns: (is_bst, min_val, max_val, sum)
        if node is None:
            return (True, float('inf'), float('-inf'), 0)

        left = postorder(node.left)
        right = postorder(node.right)

        is_left_bst, left_min, left_max, left_sum = left
        is_right_bst, right_min, right_max, right_sum = right

        # Check if current subtree is BST
        if (is_left_bst and is_right_bst and
            left_max < node.value < right_min):

            current_sum = left_sum + right_sum + node.value
            result['max_sum'] = max(result['max_sum'], current_sum)

            return (True,
                    min(left_min, node.value),
                    max(right_max, node.value),
                    current_sum)

        return (False, 0, 0, 0)

    postorder(root)
    return result['max_sum']

# Test
root = BinaryTree(1)
root.left = BinaryTree(4)
root.right = BinaryTree(3)
root.right.left = BinaryTree(2)
root.right.right = BinaryTree(5)
root.right.right.left = BinaryTree(4)
root.right.right.right = BinaryTree(6)

print(maxSumBST(root))  # 20
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

type SubtreeInfo struct {
    isBST  bool
    minVal int
    maxVal int
    sum    int
}

func maxSumBST(root *BinaryTree) int {
    maxSum := 0
    postorder(root, &maxSum)
    return maxSum
}

func postorder(node *BinaryTree, maxSum *int) SubtreeInfo {
    if node == nil {
        return SubtreeInfo{true, math.MaxInt64, math.MinInt64, 0}
    }

    left := postorder(node.Left, maxSum)
    right := postorder(node.Right, maxSum)

    if left.isBST && right.isBST &&
        left.maxVal < node.Value && node.Value < right.minVal {

        currentSum := left.sum + right.sum + node.Value
        if currentSum > *maxSum {
            *maxSum = currentSum
        }

        return SubtreeInfo{
            true,
            min(left.minVal, node.Value),
            max(right.maxVal, node.Value),
            currentSum,
        }
    }

    return SubtreeInfo{false, 0, 0, 0}
}

func min(a, b int) int {
    if a < b { return a }
    return b
}

func max(a, b int) int {
    if a > b { return a }
    return b
}

func main() {
    root := &BinaryTree{Value: 1}
    root.Right = &BinaryTree{Value: 3}
    root.Right.Right = &BinaryTree{Value: 5}
    root.Right.Right.Right = &BinaryTree{Value: 6}

    fmt.Println(maxSumBST(root))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Maximum Sum BST in Binary Tree (LeetCode)** - Identical problem
2. **Largest BST Subtree** - Find size of largest BST subtree
3. **Count BST Subtrees** - Count all valid BST subtrees

</details>

---

### 11. Right Smaller Than

**Difficulty:** Very Hard

**Problem Statement:**
Given an array of integers, for each element find the number of elements to its right that are smaller than it.

**Example:**
```
Input: [8, 5, 11, -1, 3, 4, 2]
Output: [5, 4, 4, 0, 1, 1, 0]

Explanation:
- 8 has 5 smaller elements to right: [5, -1, 3, 4, 2]
- 5 has 4 smaller elements to right: [-1, 3, 4, 2]
```

<details>
<summary><strong>Hints</strong></summary>

1. Process array from right to left
2. Use BST to track elements seen so far
3. When inserting, count nodes smaller than current

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class SpecialBST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
        self.left_subtree_size = 0

def rightSmallerThan(array):
    """
    Time Complexity: O(n log n) average, O(n²) worst
    Space Complexity: O(n)
    """
    if not array:
        return []

    result = [0] * len(array)
    root = SpecialBST(array[-1])

    for i in range(len(array) - 2, -1, -1):
        result[i] = insertAndCount(root, array[i])

    return result

def insertAndCount(root, value):
    smaller_count = 0
    current = root

    while True:
        if value <= current.value:
            current.left_subtree_size += 1
            if current.left is None:
                current.left = SpecialBST(value)
                break
            current = current.left
        else:
            smaller_count += current.left_subtree_size + 1
            if current.right is None:
                current.right = SpecialBST(value)
                break
            current = current.right

    return smaller_count

# Test
array = [8, 5, 11, -1, 3, 4, 2]
print(rightSmallerThan(array))  # [5, 4, 4, 0, 1, 1, 0]
```

```go
package main

import "fmt"

type SpecialBST struct {
    Value           int
    Left            *SpecialBST
    Right           *SpecialBST
    LeftSubtreeSize int
}

func rightSmallerThan(array []int) []int {
    if len(array) == 0 {
        return []int{}
    }

    result := make([]int, len(array))
    root := &SpecialBST{Value: array[len(array)-1]}

    for i := len(array) - 2; i >= 0; i-- {
        result[i] = insertAndCount(root, array[i])
    }

    return result
}

func insertAndCount(root *SpecialBST, value int) int {
    smallerCount := 0
    current := root

    for {
        if value <= current.Value {
            current.LeftSubtreeSize++
            if current.Left == nil {
                current.Left = &SpecialBST{Value: value}
                break
            }
            current = current.Left
        } else {
            smallerCount += current.LeftSubtreeSize + 1
            if current.Right == nil {
                current.Right = &SpecialBST{Value: value}
                break
            }
            current = current.Right
        }
    }

    return smallerCount
}

func main() {
    array := []int{8, 5, 11, -1, 3, 4, 2}
    fmt.Println(rightSmallerThan(array)) // [5 4 4 0 1 1 0]
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Count of Smaller Numbers After Self** - LeetCode version
2. **Reverse Pairs** - Count pairs where i < j and nums[i] > 2*nums[j]
3. **Count Inversions** - Classic merge sort problem

</details>

---

## Practice Tips

### BST Problem Patterns

1. **Search/Validation**: Use range checking (min, max bounds)
2. **Construction**: Use recursion with divide and conquer
3. **Traversal**: Choose appropriate order for the task
4. **Augmentation**: Add extra info (subtree size, sum, etc.)

### Common Mistakes

1. Forgetting to handle equal values (left vs right)
2. Not considering empty tree/null nodes
3. Assuming tree is balanced (worst case analysis)
4. Off-by-one errors in range validation

### Complexity Analysis

| Structure | Average | Worst |
|-----------|---------|-------|
| BST Search | O(log n) | O(n) |
| BST Insert | O(log n) | O(n) |
| BST Delete | O(log n) | O(n) |
| Balanced BST (all ops) | O(log n) | O(log n) |
