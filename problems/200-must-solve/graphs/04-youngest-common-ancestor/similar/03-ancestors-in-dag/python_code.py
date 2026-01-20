"""
All Ancestors of a Node in a DAG - Python Solutions

Find all ancestors for each node in a Directed Acyclic Graph.
An ancestor of node v is any node u that can reach v.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from collections import defaultdict, deque
from typing import List


# ============================================================================
# APPROACH 1: Topological Sort + Set Propagation
# ============================================================================
# Time Complexity:  O(n^2 + n*E) - propagating sets
# Space Complexity: O(n^2) for ancestor sets
#
# WHY THIS IS BEST:
# - Process nodes in dependency order
# - Each node inherits all ancestors from parents
# - Natural for DAG problems
# ============================================================================

def get_ancestors_topo(n: int, edges: List[List[int]]) -> List[List[int]]:
    """
    Find ancestors using topological sort.

    Process nodes in topological order.
    Each node's ancestors = union of (parent's ancestors + parent) for all parents.
    """
    # Build graph and in-degree
    graph = defaultdict(list)  # child -> parents (reverse direction)
    out_graph = defaultdict(list)  # parent -> children
    in_degree = [0] * n

    for parent, child in edges:
        graph[child].append(parent)
        out_graph[parent].append(child)
        in_degree[child] += 1

    # Topological sort using Kahn's algorithm
    queue = deque([i for i in range(n) if in_degree[i] == 0])
    topo_order = []

    while queue:
        node = queue.popleft()
        topo_order.append(node)
        for child in out_graph[node]:
            in_degree[child] -= 1
            if in_degree[child] == 0:
                queue.append(child)

    # Propagate ancestors in topological order
    ancestors = [set() for _ in range(n)]

    for node in topo_order:
        for parent in graph[node]:
            # Add parent and all of parent's ancestors
            ancestors[node].add(parent)
            ancestors[node].update(ancestors[parent])

    # Convert to sorted lists
    return [sorted(anc) for anc in ancestors]


# ============================================================================
# APPROACH 2: Reverse Graph DFS
# ============================================================================
# Time Complexity:  O(n * (V + E))
# Space Complexity: O(V + E) for reverse graph
#
# WHEN TO USE:
# - When you need ancestors for specific nodes
# - Simpler to understand
# ============================================================================

def get_ancestors_dfs(n: int, edges: List[List[int]]) -> List[List[int]]:
    """
    Find ancestors by DFS in reverse graph.

    For each node, traverse reverse graph to find all ancestors.
    """
    # Build reverse graph
    reverse_graph = defaultdict(list)
    for parent, child in edges:
        reverse_graph[child].append(parent)

    def find_ancestors(node: int, visited: set) -> None:
        """DFS to find all ancestors of a node."""
        for parent in reverse_graph[node]:
            if parent not in visited:
                visited.add(parent)
                find_ancestors(parent, visited)

    result = []
    for node in range(n):
        ancestors = set()
        find_ancestors(node, ancestors)
        result.append(sorted(ancestors))

    return result


# ============================================================================
# APPROACH 3: BFS from Each Source
# ============================================================================
# Time Complexity:  O(n * (V + E))
# Space Complexity: O(V + E)
#
# ALTERNATIVE VIEW:
# - Instead of finding what reaches each node
# - Find what each node can reach, then invert
# ============================================================================

def get_ancestors_bfs(n: int, edges: List[List[int]]) -> List[List[int]]:
    """
    Find ancestors using BFS from each source.

    For each node, BFS to mark all reachable nodes.
    If node A can reach node B, then A is ancestor of B.
    """
    # Build graph
    graph = defaultdict(list)
    for parent, child in edges:
        graph[parent].append(child)

    # For each node, find all nodes it can reach
    ancestors = [set() for _ in range(n)]

    for start in range(n):
        # BFS from start
        visited = set()
        queue = deque([start])

        while queue:
            node = queue.popleft()
            for child in graph[node]:
                if child not in visited:
                    visited.add(child)
                    ancestors[child].add(start)  # start is ancestor of child
                    queue.append(child)

    return [sorted(anc) for anc in ancestors]


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        (
            8,
            [[0, 3], [0, 4], [1, 3], [2, 4], [2, 7], [3, 5], [3, 6], [3, 7], [4, 6]],
            [[], [], [], [0, 1], [0, 2], [0, 1, 3], [0, 1, 2, 3, 4], [0, 1, 2, 3]],
            "Complex DAG"
        ),
        (
            5,
            [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]],
            [[], [0], [0, 1], [0, 1, 2], [0, 1, 2, 3]],
            "Linear chain with extra edges"
        ),
        (
            3,
            [[0, 1], [1, 2]],
            [[], [0], [0, 1]],
            "Simple chain"
        ),
        (
            3,
            [],
            [[], [], []],
            "No edges"
        ),
    ]

    approaches = [
        ("Topological Sort", get_ancestors_topo),
        ("Reverse Graph DFS", get_ancestors_dfs),
        ("BFS from Sources", get_ancestors_bfs),
    ]

    print("=" * 70)
    print("ALL ANCESTORS IN DAG - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for n, edges, expected, desc in test_cases:
            result = func(n, edges)
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  [{status}] {desc}")
            if result != expected:
                print(f"       Got: {result}")
                print(f"       Expected: {expected}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")


# ============================================================================
# SAMPLE INPUT
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("SAMPLE INPUT EXAMPLES")
    print("=" * 70)

    # Example 1
    print("\nExample 1:")
    print("  n = 8")
    print("  edges = [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]")
    result = get_ancestors_topo(
        8,
        [[0, 3], [0, 4], [1, 3], [2, 4], [2, 7], [3, 5], [3, 6], [3, 7], [4, 6]]
    )
    print(f"  Output: {result}")

    # Example 2
    print("\nExample 2:")
    print("  n = 5")
    print("  edges = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]")
    result = get_ancestors_topo(
        5,
        [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
    )
    print(f"  Output: {result}")

    print("\nAll examples completed!")
