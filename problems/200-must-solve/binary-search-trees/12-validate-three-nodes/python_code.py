"""
Validate Three Nodes - Python Solution

Given three nodes in a BST, check if one of nodeOne or nodeThree is an
ancestor of nodeTwo and the other is a descendant of nodeTwo.

Time Complexity: O(h) where h is height of tree
Space Complexity: O(1)
"""

from typing import Optional


class BST:
    def __init__(self, value: int):
        self.value = value
        self.left: Optional[BST] = None
        self.right: Optional[BST] = None


def validate_three_nodes(node_one: BST, node_two: BST, node_three: BST) -> bool:
    """
    Check if one of nodeOne/nodeThree is ancestor of nodeTwo and other is descendant.

    Uses simple two-pass approach: check both possible configurations.

    Args:
        node_one: First node
        node_two: Middle node (potential connection point)
        node_three: Third node

    Returns:
        True if valid ancestor-descendant relationship exists
    """
    # Case 1: nodeOne is ancestor of nodeTwo, nodeThree is descendant of nodeTwo
    if is_descendant(node_two, node_one) and is_descendant(node_three, node_two):
        return True

    # Case 2: nodeThree is ancestor of nodeTwo, nodeOne is descendant of nodeTwo
    if is_descendant(node_two, node_three) and is_descendant(node_one, node_two):
        return True

    return False


def is_descendant(target: BST, node: BST) -> bool:
    """
    Check if target is a descendant of node (or target == node).

    Traverses from node following BST property until we find target or reach None.
    """
    while node is not None:
        if node == target:
            return True

        # Use BST property to navigate
        if target.value < node.value:
            node = node.left
        else:
            node = node.right

    return False


def validate_three_nodes_optimized(node_one: BST, node_two: BST, node_three: BST) -> bool:
    """
    Optimized version that searches from both ends simultaneously.

    This can be faster when one of the nodes is much closer to nodeTwo than the other.

    We search from nodeOne towards nodeTwo, and from nodeThree towards nodeTwo.
    We stop when:
    1. One pointer reaches nodeTwo (then verify the other relationship)
    2. One pointer reaches the other (meaning they're on the same path)
    """
    searching_from_one = node_one
    searching_from_three = node_three

    while True:
        # Check if we found nodeTwo from either direction
        found_from_one = searching_from_one == node_two
        found_from_three = searching_from_three == node_two

        # If nodeOne reaches nodeTwo, check if nodeThree is descendant of nodeTwo
        if found_from_one:
            return is_descendant(node_three, node_two)

        # If nodeThree reaches nodeTwo, check if nodeOne is descendant of nodeTwo
        if found_from_three:
            return is_descendant(node_one, node_two)

        # Check if pointers meet each other (not at nodeTwo)
        # This means they're on the same branch, wrong configuration
        if searching_from_one == searching_from_three:
            return False

        # Check if one pointer reaches the other
        if searching_from_one == node_three:
            # nodeOne is ancestor of nodeThree, check if nodeTwo is between them
            return is_descendant(node_two, node_one) and is_descendant(node_three, node_two)

        if searching_from_three == node_one:
            # nodeThree is ancestor of nodeOne, check if nodeTwo is between them
            return is_descendant(node_two, node_three) and is_descendant(node_one, node_two)

        # Move pointers towards nodeTwo
        if searching_from_one is not None:
            if node_two.value < searching_from_one.value:
                searching_from_one = searching_from_one.left
            else:
                searching_from_one = searching_from_one.right

        if searching_from_three is not None:
            if node_two.value < searching_from_three.value:
                searching_from_three = searching_from_three.left
            else:
                searching_from_three = searching_from_three.right

        # Both reached None without finding nodeTwo
        if searching_from_one is None and searching_from_three is None:
            return False


def validate_three_nodes_v2(node_one: BST, node_two: BST, node_three: BST) -> bool:
    """
    Alternative cleaner implementation of the optimized approach.

    Search from nodeOne and nodeThree towards nodeTwo simultaneously.
    """
    p1, p3 = node_one, node_three

    while p1 is not node_two and p3 is not node_two:
        # Check if pointers reached each other
        if p1 is node_three:
            # nodeOne -> nodeThree path exists, check if nodeTwo is between
            return search_target_from_source(node_one, node_two, node_three)
        if p3 is node_one:
            # nodeThree -> nodeOne path exists, check if nodeTwo is between
            return search_target_from_source(node_three, node_two, node_one)

        # Move pointers towards nodeTwo
        p1 = get_next_node(p1, node_two) if p1 else None
        p3 = get_next_node(p3, node_two) if p3 else None

    # One of them reached nodeTwo
    if p1 is node_two:
        # nodeOne is ancestor of nodeTwo, check if nodeThree is descendant
        return is_descendant(node_three, node_two)
    else:
        # nodeThree is ancestor of nodeTwo, check if nodeOne is descendant
        return is_descendant(node_one, node_two)


def get_next_node(current: BST, target: BST) -> Optional[BST]:
    """Get next node on path from current towards target using BST property."""
    if current is None:
        return None
    if target.value < current.value:
        return current.left
    return current.right


def search_target_from_source(source: BST, target: BST, stop: BST) -> bool:
    """
    Search for target starting from source, stopping if we hit stop node.
    Returns True if target is found before hitting stop.
    """
    current = source
    while current is not None and current is not stop:
        if current is target:
            return True
        current = get_next_node(current, target)

    # Check if we stopped at stop node AND it was our target
    return current is target


# Helper function to build test trees
def build_tree() -> tuple:
    """
    Build the test tree:
           5
         /   \
        2     7
      /   \  /  \
     1    4 6    8
    /   /
   0   3
    """
    node0 = BST(0)
    node1 = BST(1)
    node2 = BST(2)
    node3 = BST(3)
    node4 = BST(4)
    node5 = BST(5)
    node6 = BST(6)
    node7 = BST(7)
    node8 = BST(8)

    node5.left = node2
    node5.right = node7
    node2.left = node1
    node2.right = node4
    node1.left = node0
    node4.left = node3
    node7.left = node6
    node7.right = node8

    return node5, {
        0: node0, 1: node1, 2: node2, 3: node3, 4: node4,
        5: node5, 6: node6, 7: node7, 8: node8
    }


# Test cases
if __name__ == "__main__":
    root, nodes = build_tree()

    print("=== Validate Three Nodes Tests ===\n")

    # Test 1: nodeOne=5, nodeTwo=2, nodeThree=3
    # 5 is ancestor of 2, 3 is descendant of 2 -> True
    result = validate_three_nodes(nodes[5], nodes[2], nodes[3])
    print(f"Test 1: nodeOne=5, nodeTwo=2, nodeThree=3")
    print(f"  Result: {result}, Expected: True")
    assert result == True

    # Test 2: nodeOne=5, nodeTwo=3, nodeThree=2
    # 5 is ancestor of 3, but 2 is NOT descendant of 3 -> False
    result = validate_three_nodes(nodes[5], nodes[3], nodes[2])
    print(f"\nTest 2: nodeOne=5, nodeTwo=3, nodeThree=2")
    print(f"  Result: {result}, Expected: False")
    assert result == False

    # Test 3: nodeOne=0, nodeTwo=1, nodeThree=2
    # 2 is ancestor of 1, 0 is descendant of 1 -> True
    result = validate_three_nodes(nodes[0], nodes[1], nodes[2])
    print(f"\nTest 3: nodeOne=0, nodeTwo=1, nodeThree=2")
    print(f"  Result: {result}, Expected: True")
    assert result == True

    # Test 4: nodeOne=1, nodeTwo=2, nodeThree=4
    # Neither 1 nor 4 is ancestor of 2 (both are descendants) -> False
    result = validate_three_nodes(nodes[1], nodes[2], nodes[4])
    print(f"\nTest 4: nodeOne=1, nodeTwo=2, nodeThree=4")
    print(f"  Result: {result}, Expected: False")
    assert result == False

    # Test 5: nodeOne=5, nodeTwo=7, nodeThree=8
    # 5 is ancestor of 7, 8 is descendant of 7 -> True
    result = validate_three_nodes(nodes[5], nodes[7], nodes[8])
    print(f"\nTest 5: nodeOne=5, nodeTwo=7, nodeThree=8")
    print(f"  Result: {result}, Expected: True")
    assert result == True

    # Test 6: nodeOne=8, nodeTwo=7, nodeThree=5
    # 5 is ancestor of 7, 8 is descendant of 7 -> True
    result = validate_three_nodes(nodes[8], nodes[7], nodes[5])
    print(f"\nTest 6: nodeOne=8, nodeTwo=7, nodeThree=5")
    print(f"  Result: {result}, Expected: True")
    assert result == True

    # Test 7: nodeOne=2, nodeTwo=5, nodeThree=7
    # Neither 2 nor 7 is ancestor of 5 (2 is descendant, 7 is also descendant) -> False
    result = validate_three_nodes(nodes[2], nodes[5], nodes[7])
    print(f"\nTest 7: nodeOne=2, nodeTwo=5, nodeThree=7")
    print(f"  Result: {result}, Expected: False")
    assert result == False

    print("\n=== Testing Optimized Version ===\n")

    # Run same tests with optimized version
    test_cases = [
        (5, 2, 3, True),
        (5, 3, 2, False),
        (0, 1, 2, True),
        (1, 2, 4, False),
        (5, 7, 8, True),
        (8, 7, 5, True),
        (2, 5, 7, False),
    ]

    for i, (n1, n2, n3, expected) in enumerate(test_cases, 1):
        result = validate_three_nodes_optimized(nodes[n1], nodes[n2], nodes[n3])
        status = "PASS" if result == expected else "FAIL"
        print(f"Test {i}: ({n1}, {n2}, {n3}) -> {result} (expected {expected}) [{status}]")

    print("\n=== Testing V2 Version ===\n")

    for i, (n1, n2, n3, expected) in enumerate(test_cases, 1):
        result = validate_three_nodes_v2(nodes[n1], nodes[n2], nodes[n3])
        status = "PASS" if result == expected else "FAIL"
        print(f"Test {i}: ({n1}, {n2}, {n3}) -> {result} (expected {expected}) [{status}]")

    print("\nAll tests completed!")
