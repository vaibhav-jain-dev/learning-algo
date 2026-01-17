"""
Depth First Search - Python Solution

Traverse a graph/tree using DFS and collect node names.

Time Complexity: O(v + e) where v is vertices, e is edges
Space Complexity: O(v) for the result and call stack
"""

class Node:
    def __init__(self, name):
        self.name = name
        self.children = []

    def add_child(self, name):
        self.children.append(Node(name))
        return self

    def depth_first_search(self, array):
        """
        Traverse tree using DFS, collecting node names.

        Args:
            array: List to store node names

        Returns:
            List[str]: Array with all node names in DFS order
        """
        array.append(self.name)
        for child in self.children:
            child.depth_first_search(array)
        return array


def dfs_iterative(root):
    """Iterative DFS using explicit stack."""
    if root is None:
        return []

    result = []
    stack = [root]

    while stack:
        node = stack.pop()
        result.append(node.name)
        # Add children in reverse order so leftmost is processed first
        for child in reversed(node.children):
            stack.append(child)

    return result


# Test cases
if __name__ == "__main__":
    # Build test tree:
    #        A
    #      / | \
    #     B  C  D
    #    / \   / \
    #   E   F G   H
    #      / \  \
    #     I   J  K

    root = Node("A")
    root.add_child("B").add_child("C").add_child("D")
    root.children[0].add_child("E").add_child("F")
    root.children[0].children[1].add_child("I").add_child("J")
    root.children[2].add_child("G").add_child("H")
    root.children[2].children[0].add_child("K")

    # Test 1: Recursive DFS
    result1 = root.depth_first_search([])
    print(f"Test 1 (Recursive DFS): {result1}")
    # Expected: ["A", "B", "E", "F", "I", "J", "C", "D", "G", "K", "H"]

    # Test 2: Iterative DFS
    result2 = dfs_iterative(root)
    print(f"Test 2 (Iterative DFS): {result2}")

    # Test 3: Single node
    single = Node("X")
    result3 = single.depth_first_search([])
    print(f"Test 3 (Single node): {result3}")
    # Expected: ["X"]

    # Test 4: Linear tree
    linear = Node("1")
    current = linear
    for i in range(2, 6):
        current.children.append(Node(str(i)))
        current = current.children[0]
    result4 = linear.depth_first_search([])
    print(f"Test 4 (Linear tree): {result4}")
    # Expected: ["1", "2", "3", "4", "5"]

    # Test 5: Wide tree
    wide = Node("ROOT")
    for i in range(5):
        wide.add_child(f"CHILD_{i}")
    result5 = wide.depth_first_search([])
    print(f"Test 5 (Wide tree): {result5}")
    # Expected: ["ROOT", "CHILD_0", "CHILD_1", "CHILD_2", "CHILD_3", "CHILD_4"]

    print("\nAll tests completed!")
