"""
BST Construction - Python Solution

Implement a Binary Search Tree with insert, contains, and remove operations.

Time Complexity: O(log n) average, O(n) worst case
Space Complexity: O(1)
"""

class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    def insert(self, value):
        """Insert a value into the BST."""
        current = self
        while True:
            if value < current.value:
                if current.left is None:
                    current.left = BST(value)
                    break
                current = current.left
            else:
                if current.right is None:
                    current.right = BST(value)
                    break
                current = current.right
        return self

    def contains(self, value):
        """Check if value exists in BST."""
        current = self
        while current is not None:
            if value < current.value:
                current = current.left
            elif value > current.value:
                current = current.right
            else:
                return True
        return False

    def remove(self, value, parent=None):
        """Remove a value from BST."""
        current = self
        while current is not None:
            if value < current.value:
                parent = current
                current = current.left
            elif value > current.value:
                parent = current
                current = current.right
            else:
                # Found the node to remove
                # Case 1: Two children
                if current.left is not None and current.right is not None:
                    current.value = current.right.get_min_value()
                    current.right.remove(current.value, current)
                # Case 2: Root node (no parent)
                elif parent is None:
                    if current.left is not None:
                        current.value = current.left.value
                        current.right = current.left.right
                        current.left = current.left.left
                    elif current.right is not None:
                        current.value = current.right.value
                        current.left = current.right.left
                        current.right = current.right.right
                    else:
                        # Single node tree, can't remove
                        pass
                # Case 3: One child or no children
                elif parent.left == current:
                    parent.left = current.left if current.left else current.right
                elif parent.right == current:
                    parent.right = current.left if current.left else current.right
                break
        return self

    def get_min_value(self):
        """Get minimum value in this subtree."""
        current = self
        while current.left is not None:
            current = current.left
        return current.value

    def inorder_traversal(self):
        """Return inorder traversal as list."""
        result = []
        self._inorder_helper(result)
        return result

    def _inorder_helper(self, result):
        if self.left:
            self.left._inorder_helper(result)
        result.append(self.value)
        if self.right:
            self.right._inorder_helper(result)


# Test cases
if __name__ == "__main__":
    # Test 1: Build BST
    bst = BST(10)
    bst.insert(5).insert(15).insert(2).insert(5).insert(1).insert(22)
    print(f"Test 1 - Initial tree (inorder): {bst.inorder_traversal()}")
    # Expected: [1, 2, 5, 5, 10, 15, 22]

    # Test 2: Contains
    print(f"\nTest 2 - Contains:")
    print(f"  contains(15): {bst.contains(15)}")  # True
    print(f"  contains(5): {bst.contains(5)}")    # True
    print(f"  contains(100): {bst.contains(100)}")  # False

    # Test 3: Insert new value
    bst.insert(12)
    print(f"\nTest 3 - After insert(12): {bst.inorder_traversal()}")
    # Expected: [1, 2, 5, 5, 10, 12, 15, 22]

    # Test 4: Remove leaf node
    bst.remove(1)
    print(f"\nTest 4 - After remove(1): {bst.inorder_traversal()}")
    # Expected: [2, 5, 5, 10, 12, 15, 22]

    # Test 5: Remove node with one child
    bst.remove(2)
    print(f"\nTest 5 - After remove(2): {bst.inorder_traversal()}")

    # Test 6: Remove node with two children
    bst_test = BST(10)
    bst_test.insert(5).insert(15).insert(12).insert(20).insert(11).insert(14)
    print(f"\nTest 6 - Before remove(15): {bst_test.inorder_traversal()}")
    bst_test.remove(15)
    print(f"After remove(15): {bst_test.inorder_traversal()}")

    # Test 7: Remove root
    bst_root = BST(10)
    bst_root.insert(5).insert(15)
    print(f"\nTest 7 - Before remove(10): {bst_root.inorder_traversal()}")
    bst_root.remove(10)
    print(f"After remove(10): {bst_root.inorder_traversal()}")

    # Test 8: Comprehensive test
    print("\n--- Comprehensive Test ---")
    tree = BST(50)
    for val in [25, 75, 10, 30, 60, 90, 5, 20, 80]:
        tree.insert(val)
    print(f"Built tree: {tree.inorder_traversal()}")
    print(f"Contains 30: {tree.contains(30)}")
    print(f"Contains 55: {tree.contains(55)}")
    tree.remove(25)
    print(f"After removing 25: {tree.inorder_traversal()}")

    print("\nAll tests completed!")
