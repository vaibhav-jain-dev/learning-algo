"""
Copy List with Random Pointer - Python Solutions

Deep copy a linked list where each node has a random pointer.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from __future__ import annotations
from typing import Optional


class Node:
    """Represents a node with val, next, and random pointers."""

    def __init__(
        self,
        val: int = 0,
        next: Optional[Node] = None,
        random: Optional[Node] = None,
    ):
        self.val = val
        self.next = next
        self.random = random


# ============================================================================
# APPROACH 1: Hash Map (Two Pass) - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - two passes through the list
# Space Complexity: O(n) - hash map storing n nodes
#
# WHY THIS IS BEST:
# - Clear and intuitive logic
# - Easy to understand and implement
# - Works for any graph-like structure
# ============================================================================


def copy_random_list_hashmap(head: Optional[Node]) -> Optional[Node]:
    """
    Create a deep copy using a hash map.

    Key Insight: Map original nodes to copies, then set all pointers.

    Visual:
        Pass 1: Create all copy nodes and build map
                Original(7) -> Copy(7)
                Original(13) -> Copy(13)
                ...

        Pass 2: Use map to set next and random pointers
                copy.next = map[original.next]
                copy.random = map[original.random]
    """
    if not head:
        return None

    # Map original nodes to their copies
    node_map: dict[Node, Node] = {}

    # First pass: create all copy nodes
    current = head
    while current:
        node_map[current] = Node(val=current.val)
        current = current.next

    # Second pass: set next and random pointers
    current = head
    while current:
        copy = node_map[current]

        if current.next:
            copy.next = node_map[current.next]
        if current.random:
            copy.random = node_map[current.random]

        current = current.next

    return node_map[head]


# ============================================================================
# APPROACH 2: Single Pass Hash Map
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# More Pythonic: Use defaultdict with factory function.
# ============================================================================


def copy_random_list_single_pass(head: Optional[Node]) -> Optional[Node]:
    """
    Single pass approach using getdefault pattern.

    Creates nodes on-demand when first encountered.
    """
    if not head:
        return None

    node_map: dict[Node, Node] = {}

    def get_or_create(node: Optional[Node]) -> Optional[Node]:
        """Get existing copy or create new one."""
        if node is None:
            return None

        if node not in node_map:
            node_map[node] = Node(val=node.val)

        return node_map[node]

    current = head
    while current:
        copy = get_or_create(current)
        copy.next = get_or_create(current.next)
        copy.random = get_or_create(current.random)
        current = current.next

    return node_map[head]


# ============================================================================
# APPROACH 3: Interleaving (O(1) Space)
# ============================================================================
# Time Complexity:  O(n) - three passes
# Space Complexity: O(1) - no extra data structures (besides output)
#
# WHEN TO USE:
# - When space is constrained
# - Classic interview optimization technique
# ============================================================================


def copy_random_list_interleave(head: Optional[Node]) -> Optional[Node]:
    """
    Use interleaving technique for O(1) extra space.

    Step 1: Insert copy nodes after originals
            A -> A' -> B -> B' -> C -> C' -> null

    Step 2: Set random pointers
            copy.random = original.random.next

    Step 3: Separate the two lists
    """
    if not head:
        return None

    # Step 1: Insert copy nodes after each original
    current = head
    while current:
        copy_node = Node(val=current.val, next=current.next)
        current.next = copy_node
        current = copy_node.next

    # Step 2: Set random pointers for copy nodes
    current = head
    while current:
        copy_node = current.next
        if current.random:
            # The copy of current.random is current.random.next
            copy_node.random = current.random.next
        current = copy_node.next

    # Step 3: Separate the two lists
    current = head
    copy_head = head.next

    while current:
        copy_node = current.next
        current.next = copy_node.next

        if copy_node.next:
            copy_node.next = copy_node.next.next

        current = current.next

    return copy_head


# ============================================================================
# APPROACH 4: Recursive with Memoization
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) - recursion stack + memo
#
# WHEN TO USE:
# - When you prefer recursive thinking
# - Handles cycles naturally with memoization
# ============================================================================


def copy_random_list_recursive(head: Optional[Node]) -> Optional[Node]:
    """
    Recursive approach with memoization.

    Natural handling of the graph-like structure.
    """
    visited: dict[Node, Node] = {}

    def clone(node: Optional[Node]) -> Optional[Node]:
        if node is None:
            return None

        # Check if already copied
        if node in visited:
            return visited[node]

        # Create new node
        copy = Node(val=node.val)
        visited[node] = copy

        # Recursively copy next and random
        copy.next = clone(node.next)
        copy.random = clone(node.random)

        return copy

    return clone(head)


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================


def create_list_from_pairs(pairs: list[tuple[int, int | None]]) -> Optional[Node]:
    """
    Create a list from [(value, random_index), ...] pairs.
    random_index = None means no random pointer.
    """
    if not pairs:
        return None

    # Create all nodes first
    nodes = [Node(val=val) for val, _ in pairs]

    # Connect next pointers
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]

    # Set random pointers
    for i, (_, random_idx) in enumerate(pairs):
        if random_idx is not None and 0 <= random_idx < len(nodes):
            nodes[i].random = nodes[random_idx]

    return nodes[0]


def validate_copy(original: Optional[Node], copy: Optional[Node]) -> bool:
    """Check if the copy is correct and independent."""
    orig_nodes: set[Node] = set()
    copy_nodes: set[Node] = set()

    # Collect all original nodes
    n = original
    while n:
        orig_nodes.add(n)
        n = n.next

    # Collect all copy nodes and verify they're different
    n = copy
    while n:
        if n in orig_nodes:
            return False  # Copy node points to original!
        copy_nodes.add(n)
        n = n.next

    # Verify structure matches
    orig = original
    cop = copy
    while orig and cop:
        if orig.val != cop.val:
            return False

        # Check random pointers point to correct copies
        if orig.random is not None and cop.random is not None:
            if orig.random.val != cop.random.val:
                return False
        elif (orig.random is not None) != (cop.random is not None):
            return False

        orig = orig.next
        cop = cop.next

    return orig is None and cop is None


def print_list(head: Optional[Node]) -> None:
    """Print the list with random pointer info."""
    if not head:
        print("empty")
        return

    # First, index all nodes
    node_index: dict[Node, int] = {}
    idx = 0
    n = head
    while n:
        node_index[n] = idx
        idx += 1
        n = n.next

    # Print with random info
    parts = []
    n = head
    while n:
        random_idx = node_index.get(n.random, -1) if n.random else -1
        if random_idx == -1:
            parts.append(f"[{n.val},null]")
        else:
            parts.append(f"[{n.val},{random_idx}]")
        n = n.next

    print(" -> ".join(parts))


# ============================================================================
# TEST CASES
# ============================================================================


def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (pairs, description)
        ([(7, None), (13, 0), (11, 4), (10, 2), (1, 0)], "Standard case"),
        ([(1, 1), (2, 1)], "Random points to same node"),
        ([(3, None), (3, 0), (3, None)], "Same values"),
        ([(1, None)], "Single node, no random"),
        ([(1, 0)], "Single node, random to self"),
        ([], "Empty list"),
    ]

    approaches = [
        ("Hash Map (Recommended)", copy_random_list_hashmap),
        ("Single Pass", copy_random_list_single_pass),
        ("Interleaving", copy_random_list_interleave),
        ("Recursive", copy_random_list_recursive),
    ]

    print("=" * 70)
    print("COPY LIST WITH RANDOM POINTER - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for pairs, desc in test_cases:
            original = create_list_from_pairs(pairs)
            copy = func(original)

            # Handle empty list case
            if original is None and copy is None:
                print(f"  [PASS] {desc}")
                continue

            passed = validate_copy(original, copy)
            status = "PASS" if passed else "FAIL"
            if not passed:
                all_passed = False

            print(f"  [{status}] {desc}")
            print("         Original: ", end="")
            print_list(original)
            print("         Copy:     ", end="")
            print_list(copy)

        if all_passed:
            print("  All tests passed!")


if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("VISUAL DEMONSTRATION")
    print("=" * 70)

    demo = [(7, None), (13, 0), (11, 4), (10, 2), (1, 0)]
    original = create_list_from_pairs(demo)
    print("\nOriginal: ", end="")
    print_list(original)

    copy = copy_random_list_hashmap(original)
    print("Deep Copy: ", end="")
    print_list(copy)

    print("\nNote: The copy is completely independent from the original!")
