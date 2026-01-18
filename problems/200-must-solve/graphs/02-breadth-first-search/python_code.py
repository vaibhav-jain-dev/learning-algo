"""
Breadth First Search - Python Solution

Traverse a graph/tree using BFS and collect node names.

Time Complexity: O(v + e) where v is vertices, e is edges
Space Complexity: O(v) for the queue and result
"""

from collections import deque
from typing import List, Optional


class Node:
    def __init__(self, name: str):
        self.name = name
        self.children: List[Node] = []

    def add_child(self, name: str) -> 'Node':
        self.children.append(Node(name))
        return self

    def breadth_first_search(self, array: List[str]) -> List[str]:
        """
        Traverse tree using BFS, collecting node names.

        Args:
            array: List to store node names

        Returns:
            List[str]: Array with all node names in BFS order
        """
        queue = deque([self])

        while queue:
            current = queue.popleft()
            array.append(current.name)

            for child in current.children:
                queue.append(child)

        return array


def bfs_level_order(root: Optional[Node]) -> List[List[str]]:
    """Return nodes grouped by level."""
    if root is None:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level = []

        for _ in range(level_size):
            current = queue.popleft()
            level.append(current.name)

            for child in current.children:
                queue.append(child)

        result.append(level)

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

    # Test 1: BFS
    result1 = root.breadth_first_search([])
    print(f"Test 1 (BFS): {result1}")
    # Expected: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]

    # Test 2: Level Order
    result2 = bfs_level_order(root)
    print(f"Test 2 (Level Order): {result2}")
    # Expected: [["A"], ["B", "C", "D"], ["E", "F", "G", "H"], ["I", "J", "K"]]

    # Test 3: Single node
    single = Node("X")
    result3 = single.breadth_first_search([])
    print(f"Test 3 (Single node): {result3}")
    # Expected: ["X"]

    # Test 4: Wide tree
    wide = Node("ROOT")
    for i in range(5):
        wide.add_child(f"CHILD_{i}")
    result4 = wide.breadth_first_search([])
    print(f"Test 4 (Wide tree): {result4}")
    # Expected: ["ROOT", "CHILD_0", "CHILD_1", "CHILD_2", "CHILD_3", "CHILD_4"]

    print("\nAll tests completed!")
