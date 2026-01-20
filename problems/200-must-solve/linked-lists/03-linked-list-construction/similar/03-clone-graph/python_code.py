"""
Clone Graph - Python Solutions

Given a reference to a node in a connected undirected graph, return a deep copy (clone).

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from __future__ import annotations
from typing import Optional
from collections import deque


class Node:
    """Represents a node in an undirected graph."""

    def __init__(self, val: int = 0, neighbors: Optional[list[Node]] = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


# ============================================================================
# APPROACH 1: DFS with HashMap - RECOMMENDED
# ============================================================================
# Time Complexity:  O(N + E) - visit each node and edge once
# Space Complexity: O(N) - hash map stores all cloned nodes
#
# WHY THIS IS BEST:
# - Natural recursive structure matches graph traversal
# - HashMap ensures each node is cloned exactly once
# - Clean and easy to understand
# ============================================================================


def clone_graph_dfs(node: Optional[Node]) -> Optional[Node]:
    """
    Clone graph using DFS with memoization.

    Key Insight: Use hash map to track cloned nodes, avoiding cycles.

    Visual:
        Original:     Cloned:
        1 -- 2        1' -- 2'
        |    |   =>   |     |
        4 -- 3        4' -- 3'
    """
    if not node:
        return None

    # Maps original node -> cloned node
    cloned: dict[Node, Node] = {}

    def dfs(original: Node) -> Node:
        # If already cloned, return the clone
        if original in cloned:
            return cloned[original]

        # Create clone (without neighbors initially)
        clone = Node(original.val)
        cloned[original] = clone

        # Recursively clone all neighbors
        for neighbor in original.neighbors:
            clone.neighbors.append(dfs(neighbor))

        return clone

    return dfs(node)


# ============================================================================
# APPROACH 2: BFS with HashMap
# ============================================================================
# Time Complexity:  O(N + E) - visit each node and edge once
# Space Complexity: O(N) - hash map + queue
#
# WHEN TO USE:
# - Prefer iterative over recursive
# - Very deep graphs (avoid stack overflow)
# ============================================================================


def clone_graph_bfs(node: Optional[Node]) -> Optional[Node]:
    """
    Clone graph using BFS (iterative).

    Process nodes level by level, cloning as we go.

    Visual (BFS order):
        Level 0: Clone node 1
        Level 1: Clone neighbors 2, 4
        Level 2: Clone neighbor 3 (already seen: 1, 4)
    """
    if not node:
        return None

    # Maps original node -> cloned node
    cloned: dict[Node, Node] = {}

    # Start with first node
    cloned[node] = Node(node.val)
    queue: deque[Node] = deque([node])

    while queue:
        current = queue.popleft()

        for neighbor in current.neighbors:
            if neighbor not in cloned:
                # Clone neighbor and add to queue
                cloned[neighbor] = Node(neighbor.val)
                queue.append(neighbor)

            # Connect clone to its neighbor's clone
            cloned[current].neighbors.append(cloned[neighbor])

    return cloned[node]


# ============================================================================
# APPROACH 3: DFS Iterative with Stack
# ============================================================================
# Time Complexity:  O(N + E)
# Space Complexity: O(N)
#
# WHEN TO USE:
# - Want iterative DFS (different traversal order than BFS)
# ============================================================================


def clone_graph_iterative_dfs(node: Optional[Node]) -> Optional[Node]:
    """
    Clone graph using iterative DFS with explicit stack.
    """
    if not node:
        return None

    cloned: dict[Node, Node] = {}
    cloned[node] = Node(node.val)
    stack: list[Node] = [node]

    while stack:
        current = stack.pop()

        for neighbor in current.neighbors:
            if neighbor not in cloned:
                cloned[neighbor] = Node(neighbor.val)
                stack.append(neighbor)

            cloned[current].neighbors.append(cloned[neighbor])

    return cloned[node]


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================


def build_graph(adj_list: list[list[int]]) -> Optional[Node]:
    """
    Build graph from adjacency list.

    adj_list[i] contains neighbors of node (i+1).
    """
    if not adj_list:
        return None

    n = len(adj_list)
    nodes: dict[int, Node] = {i: Node(i) for i in range(1, n + 1)}

    for i, neighbors in enumerate(adj_list, start=1):
        nodes[i].neighbors = [nodes[j] for j in neighbors]

    return nodes[1]


def graph_to_adj_list(node: Optional[Node]) -> list[list[int]]:
    """Convert graph back to adjacency list for testing."""
    if not node:
        return []

    visited: set[Node] = set()
    nodes: dict[int, Node] = {}
    queue: deque[Node] = deque([node])

    # Collect all nodes
    while queue:
        current = queue.popleft()
        if current in visited:
            continue
        visited.add(current)
        nodes[current.val] = current
        for neighbor in current.neighbors:
            if neighbor not in visited:
                queue.append(neighbor)

    if not nodes:
        return []

    max_val = max(nodes.keys())
    result = [[] for _ in range(max_val)]

    for val in sorted(nodes.keys()):
        result[val - 1] = sorted([n.val for n in nodes[val].neighbors])

    return result


def print_graph(node: Optional[Node], name: str = "Graph") -> None:
    """Print graph structure."""
    adj_list = graph_to_adj_list(node)
    print(f"{name}:")
    if not adj_list:
        print("  (empty)")
        return
    for i, neighbors in enumerate(adj_list, start=1):
        print(f"  Node {i} -> {neighbors}")


def verify_deep_copy(original: Optional[Node], clone: Optional[Node]) -> bool:
    """Verify that clone is a true deep copy."""
    if original is None and clone is None:
        return True
    if original is None or clone is None:
        return False

    orig_nodes: set[int] = set()
    clone_nodes: set[int] = set()

    # Collect original node ids
    queue: deque[Node] = deque([original])
    visited: set[Node] = set()
    while queue:
        curr = queue.popleft()
        if curr in visited:
            continue
        visited.add(curr)
        orig_nodes.add(id(curr))
        for n in curr.neighbors:
            if n not in visited:
                queue.append(n)

    # Collect clone node ids
    queue = deque([clone])
    visited = set()
    while queue:
        curr = queue.popleft()
        if curr in visited:
            continue
        visited.add(curr)
        clone_nodes.add(id(curr))
        for n in curr.neighbors:
            if n not in visited:
                queue.append(n)

    # No shared object references means true deep copy
    return len(orig_nodes & clone_nodes) == 0


# ============================================================================
# TEST CASES
# ============================================================================


def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (adjacency_list, description)
        ([[2, 4], [1, 3], [2, 4], [1, 3]], "Square graph"),
        ([[]], "Single node, no neighbors"),
        ([], "Empty graph"),
        ([[2], [1]], "Two connected nodes"),
        ([[2, 3, 4], [1], [1], [1]], "Star graph"),
    ]

    approaches = [
        ("DFS Recursive (Recommended)", clone_graph_dfs),
        ("BFS Iterative", clone_graph_bfs),
        ("DFS Iterative", clone_graph_iterative_dfs),
    ]

    print("=" * 70)
    print("CLONE GRAPH - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for adj_list, desc in test_cases:
            # Build original graph
            original = build_graph(adj_list)

            # Clone it
            clone = func(original)

            # Verify structure matches
            original_adj = graph_to_adj_list(original)
            clone_adj = graph_to_adj_list(clone)

            structure_match = original_adj == clone_adj
            is_deep_copy = verify_deep_copy(original, clone)

            passed = structure_match and is_deep_copy
            status = "PASS" if passed else "FAIL"
            if not passed:
                all_passed = False

            print(f"  [{status}] {desc}")
            print(f"         Input:      {adj_list}")
            print(f"         Clone adj:  {clone_adj}")
            print(f"         Deep copy:  {is_deep_copy}")

        if all_passed:
            print("  All tests passed!")


if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("VISUAL DEMONSTRATION")
    print("=" * 70)

    # Build sample graph
    adj_list = [[2, 4], [1, 3], [2, 4], [1, 3]]
    print(f"\nAdjacency list: {adj_list}")

    original = build_graph(adj_list)
    print_graph(original, "\nOriginal Graph")

    clone = clone_graph_dfs(original)
    print_graph(clone, "\nCloned Graph")

    print(f"\nOriginal and Clone are independent: {verify_deep_copy(original, clone)}")
