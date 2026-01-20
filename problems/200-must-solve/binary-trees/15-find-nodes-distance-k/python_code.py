"""
Find Nodes Distance K - Python Solution

Find all nodes at distance K from a target node in a binary tree.

Time Complexity: O(n)
Space Complexity: O(n)
"""

from collections import deque


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def find_nodes_distance_k(tree, target, k):
    """
    Find all nodes at exactly distance k from the target node.

    Args:
        tree: Root of binary tree
        target: Target node value
        k: Distance from target

    Returns:
        List[int]: Values of nodes at distance k from target
    """
    # Build parent map
    parent_map = {}
    target_node = build_parent_map(tree, None, target, parent_map)

    if target_node is None:
        return []

    # BFS from target node
    return bfs_find_distance_k(target_node, parent_map, k)


def build_parent_map(node, parent, target_value, parent_map):
    """Build map of node -> parent and find target node."""
    if node is None:
        return None

    parent_map[node] = parent
    target_node = None

    if node.value == target_value:
        target_node = node

    # Search in children
    left_result = build_parent_map(node.left, node, target_value, parent_map)
    right_result = build_parent_map(node.right, node, target_value, parent_map)

    return target_node or left_result or right_result


def bfs_find_distance_k(target_node, parent_map, k):
    """Use BFS to find all nodes at distance k from target."""
    queue = deque([(target_node, 0)])
    visited = {target_node}
    result = []

    while queue:
        node, distance = queue.popleft()

        if distance == k:
            result.append(node.value)
            continue  # Don't explore further from this node

        # Explore neighbors: left, right, and parent
        neighbors = [node.left, node.right, parent_map.get(node)]

        for neighbor in neighbors:
            if neighbor is not None and neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, distance + 1))

    return result


def find_nodes_distance_k_dfs(tree, target, k):
    """
    Alternative DFS approach without modifying tree structure.

    This approach finds distance to target during DFS and explores
    "other" subtrees at appropriate distances while backtracking.
    """
    result = []

    def dfs(node, target_value):
        """
        Returns distance from this node to target, or -1 if target not in subtree.
        Also populates result with nodes at distance k from target.
        """
        if node is None:
            return -1

        if node.value == target_value:
            # Found target, collect descendants at distance k
            add_subtree_at_distance(node, k, result)
            return 0

        # Check left subtree
        left_distance = dfs(node.left, target_value)
        if left_distance >= 0:
            # Target was in left subtree
            if left_distance + 1 == k:
                result.append(node.value)
            # Search right subtree for nodes at remaining distance
            add_subtree_at_distance(node.right, k - left_distance - 2, result)
            return left_distance + 1

        # Check right subtree
        right_distance = dfs(node.right, target_value)
        if right_distance >= 0:
            # Target was in right subtree
            if right_distance + 1 == k:
                result.append(node.value)
            # Search left subtree for nodes at remaining distance
            add_subtree_at_distance(node.left, k - right_distance - 2, result)
            return right_distance + 1

        return -1

    def add_subtree_at_distance(node, distance, result):
        """Add all nodes in subtree that are exactly 'distance' edges away."""
        if node is None or distance < 0:
            return

        if distance == 0:
            result.append(node.value)
            return

        add_subtree_at_distance(node.left, distance - 1, result)
        add_subtree_at_distance(node.right, distance - 1, result)

    dfs(tree, target)
    return result


# Test cases
if __name__ == "__main__":
    # Test 1: Example from problem
    #         1
    #       /   \
    #      2     3
    #     / \     \
    #    4   5     6
    #       / \
    #      7   8
    # Target: 5, K: 2
    # Expected: [1, 7, 8] (any order)

    root1 = BinaryTree(1)
    root1.left = BinaryTree(2)
    root1.right = BinaryTree(3)
    root1.left.left = BinaryTree(4)
    root1.left.right = BinaryTree(5)
    root1.right.right = BinaryTree(6)
    root1.left.right.left = BinaryTree(7)
    root1.left.right.right = BinaryTree(8)

    result1 = find_nodes_distance_k(root1, 5, 2)
    print(f"Test 1: {sorted(result1)}")
    # Expected: [1, 4]

    # Test 2: Root as target
    #         1
    #       /   \
    #      2     3
    # Target: 1, K: 1
    # Expected: [2, 3]

    root2 = BinaryTree(1)
    root2.left = BinaryTree(2)
    root2.right = BinaryTree(3)

    result2 = find_nodes_distance_k(root2, 1, 1)
    print(f"Test 2: {sorted(result2)}")
    # Expected: [2, 3]

    # Test 3: Leaf target, need to go up
    #         1
    #       /   \
    #      2     3
    #     /
    #    4
    # Target: 4, K: 3
    # Expected: [3]

    root3 = BinaryTree(1)
    root3.left = BinaryTree(2)
    root3.right = BinaryTree(3)
    root3.left.left = BinaryTree(4)

    result3 = find_nodes_distance_k(root3, 4, 3)
    print(f"Test 3: {result3}")
    # Expected: [3]

    # Test 4: K = 0 (return target itself)
    result4 = find_nodes_distance_k(root1, 5, 0)
    print(f"Test 4 (k=0): {result4}")
    # Expected: [5]

    # Test 5: No nodes at distance k
    result5 = find_nodes_distance_k(root2, 1, 5)
    print(f"Test 5 (no nodes): {result5}")
    # Expected: []

    # Test 6: Single node tree
    root6 = BinaryTree(42)
    result6 = find_nodes_distance_k(root6, 42, 0)
    print(f"Test 6 (single node, k=0): {result6}")
    # Expected: [42]

    result6b = find_nodes_distance_k(root6, 42, 1)
    print(f"Test 6b (single node, k=1): {result6b}")
    # Expected: []

    # Test 7: DFS approach verification
    result7 = find_nodes_distance_k_dfs(root1, 5, 2)
    print(f"Test 7 (DFS approach): {sorted(result7)}")
    # Expected: [1, 4]

    # Test 8: Larger tree
    #              1
    #           /     \
    #          2       3
    #         / \     / \
    #        4   5   6   7
    #       /
    #      8
    # Target: 2, K: 2
    # Expected: [8, 6, 7] (descendants of distance 2 OR ancestors' other children)

    root8 = BinaryTree(1)
    root8.left = BinaryTree(2)
    root8.right = BinaryTree(3)
    root8.left.left = BinaryTree(4)
    root8.left.right = BinaryTree(5)
    root8.right.left = BinaryTree(6)
    root8.right.right = BinaryTree(7)
    root8.left.left.left = BinaryTree(8)

    result8 = find_nodes_distance_k(root8, 2, 2)
    print(f"Test 8: {sorted(result8)}")
    # Expected: [3, 8] - node 8 is distance 2 down, node 3 is distance 2 up

    # Test 9: K = 1 from middle node
    result9 = find_nodes_distance_k(root8, 2, 1)
    print(f"Test 9 (k=1 from node 2): {sorted(result9)}")
    # Expected: [1, 4, 5]

    print("\nAll tests completed!")
