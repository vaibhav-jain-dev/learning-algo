# BST Iterator

**Difficulty:** Medium (Blue)

## Problem Statement

Implement the BSTIterator class that represents an iterator over the inorder traversal of a Binary Search Tree (BST):

- `BSTIterator(TreeNode root)` - Initializes the iterator with the root of the BST. The pointer should be initialized to a non-existent number smaller than any element in the BST.
- `boolean hasNext()` - Returns true if there exists a number in the traversal to the right of the pointer, otherwise returns false.
- `int next()` - Moves the pointer to the right, then returns the number at the pointer.

Notice that by initializing the pointer to a non-existent smallest number, the first call to `next()` will return the smallest element in the BST.

You may assume that `next()` calls will always be valid (i.e., there will be at least one next number when `next()` is called).

## Examples

**Example:**
```
Input: BST =     7
               /   \
              3     15
                   /  \
                  9    20

Operations:
  BSTIterator(root)
  next()    -> 3
  next()    -> 7
  hasNext() -> true
  next()    -> 9
  hasNext() -> true
  next()    -> 15
  hasNext() -> true
  next()    -> 20
  hasNext() -> false
```

## Constraints

- The number of nodes in the tree is in range [1, 100000]
- 0 <= Node.val <= 1000000
- At most 100000 calls will be made to hasNext and next
- next() and hasNext() should run in average O(1) time and use O(h) memory, where h is the height of the tree

## Hints

<details>
<summary>Hint 1</summary>
You could flatten the BST into an array using inorder traversal, but that uses O(n) space.
</details>

<details>
<summary>Hint 2</summary>
Use a stack to simulate the inorder traversal. Push all left nodes onto stack initially.
</details>

<details>
<summary>Hint 3</summary>
When next() is called, pop from stack, process that node, then push all left children of its right child.
</details>

## Approach

### Controlled Inorder Traversal with Stack
1. Initialize: Push all left nodes from root onto stack
2. hasNext(): Check if stack is non-empty
3. next():
   - Pop top node from stack (this is the next smallest)
   - If popped node has right child, push all left descendants of right child
   - Return popped node's value

**Time Complexity:** O(1) average for both next() and hasNext()
**Space Complexity:** O(h) where h is the height of the tree

---

## Similar Problems (Harder)

### 1. BST Iterator with Prev Operation
**Difficulty:** Medium

Extend the iterator to also support `prev()` to go backwards.

```
Operations: next() -> 3, next() -> 7, prev() -> 3, prev() -> (error or -1)
```

### 2. BST Iterator with Peek
**Difficulty:** Medium

Add `peek()` operation that returns next value without advancing the iterator.

```
Operations: peek() -> 3, next() -> 3, peek() -> 7
```

### 3. Merge K BST Iterators
**Difficulty:** Hard

Given K BST iterators, implement a merged iterator that returns elements in sorted order.

```
Input: Iterator1 over [1,3,5], Iterator2 over [2,4,6]
Operations: next() -> 1, next() -> 2, next() -> 3, next() -> 4, ...
```
