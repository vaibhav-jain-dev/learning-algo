"""
Clone Graph - Python Solutions

Given a reference to a node in a connected undirected graph,
return a deep copy (clone) of the graph.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from collections import deque
from typing import Optional, List, Dict


class Node:
    """Graph node with value and list of neighbors."""

    def __init__(self, val: int = 0, neighbors: Optional[List['Node']] = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


# ============================================================================
# APPROACH 1: DFS with HashMap
# ============================================================================
# Time Complexity:  O(N + E) where N is nodes, E is edges
# Space Complexity: O(N) for the HashMap and recursion stack
#
# WHY THIS IS BEST:
# - Natural recursive structure for graph traversal
# - HashMap prevents infinite loops in cyclic graphs
# - Clean and intuitive implementation
# ============================================================================

def clone_graph_dfs(node: Optional[Node]) -> Optional[Node]:
    """
    Clone graph using recursive DFS with memoization.

    Key Insight: Use HashMap to track which nodes have been cloned.
    If a node is already in the map, return its clone (avoid duplicates).

    Visual:
        Original: 1 -- 2       Clone: 1' -- 2'
                  |    |              |     |
                  4 -- 3              4' -- 3'

        HashMap tracks: {1->1', 2->2', 3->3', 4->4'}
    """
    if not node:
        return None

    # Map from original node to its clone
    visited: Dict[Node, Node] = {}

    def dfs(n: Node) -> Node:
        # If already cloned, return the clone
        if n in visited:
            return visited[n]

        # Create clone of current node
        clone = Node(n.val)
        visited[n] = clone

        # Recursively clone all neighbors
        for neighbor in n.neighbors:
            clone.neighbors.append(dfs(neighbor))

        return clone

    return dfs(node)


# ============================================================================
# APPROACH 2: BFS with HashMap
# ============================================================================
# Time Complexity:  O(N + E)
# Space Complexity: O(N) for HashMap and queue
#
# WHEN TO USE:
# - Prefer iterative solutions
# - Avoid potential stack overflow
# - Level-by-level processing
# ============================================================================

def clone_graph_bfs(node: Optional[Node]) -> Optional[Node]:
    """
    Clone graph using iterative BFS.

    Process nodes level by level, cloning as we go.
    HashMap ensures each node is cloned exactly once.
    """
    if not node:
        return None

    # Map from original node to its clone
    visited: Dict[Node, Node] = {}

    # Create clone of starting node
    visited[node] = Node(node.val)

    # BFS queue
    queue = deque([node])

    while queue:
        current = queue.popleft()

        # Process all neighbors
        for neighbor in current.neighbors:
            # If neighbor hasn't been cloned yet
            if neighbor not in visited:
                # Create clone and add to queue
                visited[neighbor] = Node(neighbor.val)
                queue.append(neighbor)

            # Add cloned neighbor to current clone's neighbors
            visited[current].neighbors.append(visited[neighbor])

    return visited[node]


# ============================================================================
# APPROACH 3: DFS Iterative with Stack
# ============================================================================
# Time Complexity:  O(N + E)
# Space Complexity: O(N) for HashMap and stack
#
# WHEN TO USE:
# - Want DFS behavior but avoid recursion
# - Large graphs that might cause stack overflow
# ============================================================================

def clone_graph_iterative_dfs(node: Optional[Node]) -> Optional[Node]:
    """
    Clone graph using iterative DFS with explicit stack.

    Same traversal as recursive DFS but with manual stack management.
    """
    if not node:
        return None

    # Map from original node to its clone
    visited: Dict[Node, Node] = {node: Node(node.val)}

    # Stack for DFS
    stack = [node]

    while stack:
        current = stack.pop()

        for neighbor in current.neighbors:
            if neighbor not in visited:
                # Create clone
                visited[neighbor] = Node(neighbor.val)
                stack.append(neighbor)

            # Link clones
            visited[current].neighbors.append(visited[neighbor])

    return visited[node]


# ============================================================================
# APPROACH 4: Array-based (when values are 1 to N)
# ============================================================================
# Time Complexity:  O(N + E)
# Space Complexity: O(N) for the clone array
#
# WHEN TO USE:
# - Node values are guaranteed to be 1 to N
# - Slightly more memory efficient than HashMap
# ============================================================================

def clone_graph_array(node: Optional[Node]) -> Optional[Node]:
    """
    Clone graph using array indexing when values are 1 to N.

    Uses node.val as index instead of HashMap for O(1) lookups.
    """
    if not node:
        return None

    # First pass: find max value to size array
    max_val = 0
    visited_find = set()

    def find_max(n: Node) -> None:
        nonlocal max_val
        if n in visited_find:
            return
        visited_find.add(n)
        max_val = max(max_val, n.val)
        for neighbor in n.neighbors:
            find_max(neighbor)

    find_max(node)

    # Array to store clones (1-indexed, so size = max_val + 1)
    clones: List[Optional[Node]] = [None] * (max_val + 1)

    def dfs(n: Node) -> Node:
        # Already cloned
        if clones[n.val] is not None:
            return clones[n.val]

        # Create clone
        clone = Node(n.val)
        clones[n.val] = clone

        # Clone neighbors
        for neighbor in n.neighbors:
            clone.neighbors.append(dfs(neighbor))

        return clone

    return dfs(node)


# ============================================================================
# HELPER: Build graph from adjacency list
# ============================================================================

def build_graph(adj_list: List[List[int]]) -> Optional[Node]:
    """
    Build graph from adjacency list.
    adj_list[i] contains neighbors of node i+1 (1-indexed nodes).
    """
    if not adj_list:
        return None

    # Create all nodes first (1-indexed)
    nodes = [None] + [Node(i) for i in range(1, len(adj_list) + 1)]

    # Add neighbors
    for i, neighbors in enumerate(adj_list):
        node_idx = i + 1  # 1-indexed
        for neighbor_val in neighbors:
            nodes[node_idx].neighbors.append(nodes[neighbor_val])

    return nodes[1]


# ============================================================================
# HELPER: Convert graph to adjacency list
# ============================================================================

def graph_to_adj_list(node: Optional[Node]) -> List[List[int]]:
    """Convert graph back to adjacency list for verification."""
    if not node:
        return []

    visited = set()
    result: Dict[int, List[int]] = {}
    max_node = 0

    def dfs(n: Node) -> None:
        nonlocal max_node
        if n in visited:
            return
        visited.add(n)
        max_node = max(max_node, n.val)

        result[n.val] = [neighbor.val for neighbor in n.neighbors]
        for neighbor in n.neighbors:
            dfs(neighbor)

    dfs(node)

    # Convert to list
    return [result.get(i, []) for i in range(1, max_node + 1)]


# ============================================================================
# HELPER: Verify clone is deep copy
# ============================================================================

def is_deep_copy(original: Optional[Node], clone: Optional[Node]) -> bool:
    """Verify that clone has no shared references with original."""
    if original is None and clone is None:
        return True
    if original is None or clone is None:
        return False

    orig_nodes = set()
    clone_nodes = set()

    def collect(n: Node, nodes: set) -> None:
        if n in nodes:
            return
        nodes.add(n)
        for neighbor in n.neighbors:
            collect(neighbor, nodes)

    collect(original, orig_nodes)
    collect(clone, clone_nodes)

    # No shared references
    return len(orig_nodes & clone_nodes) == 0


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        ([[2, 4], [1, 3], [2, 4], [1, 3]], "4-node cycle"),
        ([[]], "Single node, no neighbors"),
        ([[2], [1, 3], [2]], "Linear 3-node graph"),
        ([[2, 3], [1, 3], [1, 2]], "Triangle graph"),
    ]

    approaches = [
        ("DFS with HashMap", clone_graph_dfs),
        ("BFS with HashMap", clone_graph_bfs),
        ("Iterative DFS", clone_graph_iterative_dfs),
        ("Array-based", clone_graph_array),
    ]

    print("=" * 70)
    print("CLONE GRAPH - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)

        for adj_list, desc in test_cases:
            original = build_graph(adj_list)
            clone = func(original)

            # Verify structure matches
            orig_adj = graph_to_adj_list(original)
            clone_adj = graph_to_adj_list(clone)

            structure_match = orig_adj == clone_adj
            is_deep = is_deep_copy(original, clone)

            status = "PASS" if structure_match and is_deep else "FAIL"
            print(f"  [{status}] {desc}: structure={structure_match}, deep_copy={is_deep}")

    # Test nil case
    print("\nEdge Case - None input:")
    print("-" * 50)
    none_clone = clone_graph_dfs(None)
    status = "PASS" if none_clone is None else "FAIL"
    print(f"  [{status}] None input returns None: {none_clone is None}")


# ============================================================================
# SAMPLE INPUT
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("SAMPLE INPUT EXAMPLE")
    print("=" * 70)

    # Example from problem
    adj_list = [[2, 4], [1, 3], [2, 4], [1, 3]]
    print("\nInput adjacency list: [[2,4],[1,3],[2,4],[1,3]]")
    print("This represents a 4-node graph:")
    print("  Node 1 connects to: 2, 4")
    print("  Node 2 connects to: 1, 3")
    print("  Node 3 connects to: 2, 4")
    print("  Node 4 connects to: 1, 3")

    original = build_graph(adj_list)
    clone = clone_graph_dfs(original)

    print(f"\nCloned adjacency list: {graph_to_adj_list(clone)}")
    print(f"Is deep copy (no shared refs): {is_deep_copy(original, clone)}")

    print("\nAll tests completed!")
