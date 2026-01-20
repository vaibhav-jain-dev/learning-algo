"""
Youngest Common Ancestor - Python Solution

Find the youngest (lowest) common ancestor of two descendants in an ancestral tree.

Time Complexity: O(D) where D is the depth of the deeper descendant
Space Complexity: O(1) for the optimal approach
"""

from __future__ import annotations
from typing import Optional


class AncestralTree:
    """Node in an ancestral tree with a name and reference to its ancestor."""

    def __init__(self, name: str) -> None:
        self.name = name
        self.ancestor: Optional[AncestralTree] = None


def get_youngest_common_ancestor(
    top_ancestor: AncestralTree,
    descendant_one: AncestralTree,
    descendant_two: AncestralTree
) -> AncestralTree:
    """
    Find the youngest common ancestor of two descendants.

    Uses the two-pointer technique: equalize depths, then move up together.

    Args:
        top_ancestor: The root/top of the ancestral tree
        descendant_one: First descendant node
        descendant_two: Second descendant node

    Returns:
        The youngest (lowest) common ancestor node
    """
    # Calculate depths of both descendants
    depth_one = get_depth(descendant_one, top_ancestor)
    depth_two = get_depth(descendant_two, top_ancestor)

    # Bring the deeper one up to the same level
    if depth_one > depth_two:
        return backtrack_to_common(descendant_one, descendant_two, depth_one - depth_two)
    else:
        return backtrack_to_common(descendant_two, descendant_one, depth_two - depth_one)


def get_depth(descendant: AncestralTree, top_ancestor: AncestralTree) -> int:
    """Calculate the depth of a node from the top ancestor."""
    depth = 0
    current = descendant
    while current != top_ancestor:
        depth += 1
        current = current.ancestor
    return depth


def backtrack_to_common(
    lower_descendant: AncestralTree,
    higher_descendant: AncestralTree,
    diff: int
) -> AncestralTree:
    """
    Move the lower descendant up by diff levels, then move both up together
    until they meet.
    """
    # Bring lower descendant up to the same level
    while diff > 0:
        lower_descendant = lower_descendant.ancestor
        diff -= 1

    # Move both up simultaneously until they meet
    while lower_descendant != higher_descendant:
        lower_descendant = lower_descendant.ancestor
        higher_descendant = higher_descendant.ancestor

    return lower_descendant


def get_youngest_common_ancestor_set(
    top_ancestor: AncestralTree,
    descendant_one: AncestralTree,
    descendant_two: AncestralTree
) -> AncestralTree:
    """
    Find youngest common ancestor using a set to store ancestors.

    Time: O(D), Space: O(D)

    Args:
        top_ancestor: The root/top of the ancestral tree
        descendant_one: First descendant node
        descendant_two: Second descendant node

    Returns:
        The youngest (lowest) common ancestor node
    """
    # Store all ancestors of descendant_one in a set
    ancestors = set()
    current = descendant_one
    while current is not None:
        ancestors.add(current)
        current = current.ancestor

    # Find first ancestor of descendant_two that's in the set
    current = descendant_two
    while current not in ancestors:
        current = current.ancestor

    return current


def build_tree(structure: dict[str, list[str]]) -> dict[str, AncestralTree]:
    """
    Build an ancestral tree from a structure dictionary.

    Args:
        structure: Dict mapping parent names to list of child names

    Returns:
        Dictionary mapping names to AncestralTree nodes
    """
    nodes: dict[str, AncestralTree] = {}

    # Create all nodes
    for parent, children in structure.items():
        if parent not in nodes:
            nodes[parent] = AncestralTree(parent)
        for child in children:
            if child not in nodes:
                nodes[child] = AncestralTree(child)
            nodes[child].ancestor = nodes[parent]

    return nodes


# Test cases
if __name__ == "__main__":
    # Build the ancestral tree:
    #          A
    #        /   \
    #       B     C
    #      / \   / \
    #     D   E F   G
    #    / \
    #   H   I

    tree_structure = {
        "A": ["B", "C"],
        "B": ["D", "E"],
        "C": ["F", "G"],
        "D": ["H", "I"]
    }
    nodes = build_tree(tree_structure)

    # Test 1: E and I -> should be B
    result1 = get_youngest_common_ancestor(nodes["A"], nodes["E"], nodes["I"])
    print(f"Test 1 (E, I): {result1.name}")  # Expected: B
    assert result1.name == "B"

    # Test 2: H and G -> should be A
    result2 = get_youngest_common_ancestor(nodes["A"], nodes["H"], nodes["G"])
    print(f"Test 2 (H, G): {result2.name}")  # Expected: A
    assert result2.name == "A"

    # Test 3: D and E -> should be B
    result3 = get_youngest_common_ancestor(nodes["A"], nodes["D"], nodes["E"])
    print(f"Test 3 (D, E): {result3.name}")  # Expected: B
    assert result3.name == "B"

    # Test 4: H and I -> should be D
    result4 = get_youngest_common_ancestor(nodes["A"], nodes["H"], nodes["I"])
    print(f"Test 4 (H, I): {result4.name}")  # Expected: D
    assert result4.name == "D"

    # Test 5: B and H -> should be B (node is its own ancestor)
    result5 = get_youngest_common_ancestor(nodes["A"], nodes["B"], nodes["H"])
    print(f"Test 5 (B, H): {result5.name}")  # Expected: B
    assert result5.name == "B"

    # Test 6: Same node (I and I) -> should be I
    result6 = get_youngest_common_ancestor(nodes["A"], nodes["I"], nodes["I"])
    print(f"Test 6 (I, I): {result6.name}")  # Expected: I
    assert result6.name == "I"

    # Test 7: Root and any node -> should be root
    result7 = get_youngest_common_ancestor(nodes["A"], nodes["A"], nodes["H"])
    print(f"Test 7 (A, H): {result7.name}")  # Expected: A
    assert result7.name == "A"

    # Test set-based approach
    print("\n--- Testing Set-Based Approach ---")
    result_set1 = get_youngest_common_ancestor_set(nodes["A"], nodes["E"], nodes["I"])
    print(f"Set Test (E, I): {result_set1.name}")  # Expected: B
    assert result_set1.name == "B"

    result_set2 = get_youngest_common_ancestor_set(nodes["A"], nodes["H"], nodes["G"])
    print(f"Set Test (H, G): {result_set2.name}")  # Expected: A
    assert result_set2.name == "A"

    print("\nAll tests passed!")
