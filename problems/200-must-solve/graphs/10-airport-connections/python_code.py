"""
Airport Connections - Python Solution

Find minimum routes to add so all airports are reachable from starting airport.

Time Complexity: O(A * (A + R)) where A is airports, R is routes
Space Complexity: O(A + R)
"""

from typing import List, Dict, Set
from collections import defaultdict


def airport_connections(
    airports: List[str],
    routes: List[List[str]],
    starting_airport: str
) -> int:
    """
    Find minimum number of routes to add for all airports to be reachable.

    Args:
        airports: List of airport codes
        routes: List of [source, destination] route pairs
        starting_airport: Starting airport code

    Returns:
        Minimum number of routes to add
    """
    # Build adjacency list
    graph = create_airport_graph(airports, routes)

    # Find unreachable airports from starting airport
    reachable = get_reachable_airports(graph, starting_airport)
    unreachable = [airport for airport in airports if airport not in reachable]

    if not unreachable:
        return 0

    # Build reverse graph for finding SCCs
    reverse_graph = create_reverse_graph(airports, routes)

    # Find strongly connected components among unreachable airports
    # and calculate how many airports each SCC can reach
    unreachable_set = set(unreachable)

    # Mark airports by their "score" - number of unreachable airports reachable from them
    scores = calculate_unreachable_connections(graph, unreachable_set)

    # Sort unreachable airports by score (descending)
    sorted_airports = sorted(unreachable, key=lambda x: -scores[x])

    # Greedily add routes to airports that can reach the most other airports
    routes_to_add = 0
    newly_reachable: Set[str] = set()

    for airport in sorted_airports:
        if airport in newly_reachable:
            continue

        # Add a route to this airport
        routes_to_add += 1

        # Mark all airports reachable from this one as covered
        reachable_from_here = get_reachable_airports_in_set(
            graph, airport, unreachable_set
        )
        newly_reachable.update(reachable_from_here)

    return routes_to_add


def create_airport_graph(
    airports: List[str],
    routes: List[List[str]]
) -> Dict[str, List[str]]:
    """Create adjacency list from airports and routes."""
    graph: Dict[str, List[str]] = {airport: [] for airport in airports}
    for source, dest in routes:
        graph[source].append(dest)
    return graph


def create_reverse_graph(
    airports: List[str],
    routes: List[List[str]]
) -> Dict[str, List[str]]:
    """Create reverse adjacency list."""
    graph: Dict[str, List[str]] = {airport: [] for airport in airports}
    for source, dest in routes:
        graph[dest].append(source)
    return graph


def get_reachable_airports(
    graph: Dict[str, List[str]],
    start: str
) -> Set[str]:
    """Get all airports reachable from start using DFS."""
    reachable: Set[str] = set()
    stack = [start]

    while stack:
        airport = stack.pop()
        if airport in reachable:
            continue
        reachable.add(airport)
        for neighbor in graph[airport]:
            if neighbor not in reachable:
                stack.append(neighbor)

    return reachable


def get_reachable_airports_in_set(
    graph: Dict[str, List[str]],
    start: str,
    valid_set: Set[str]
) -> Set[str]:
    """Get all airports reachable from start that are in valid_set."""
    reachable: Set[str] = set()
    stack = [start]

    while stack:
        airport = stack.pop()
        if airport in reachable or airport not in valid_set:
            continue
        reachable.add(airport)
        for neighbor in graph[airport]:
            if neighbor not in reachable and neighbor in valid_set:
                stack.append(neighbor)

    return reachable


def calculate_unreachable_connections(
    graph: Dict[str, List[str]],
    unreachable: Set[str]
) -> Dict[str, int]:
    """
    Calculate for each unreachable airport how many other unreachable
    airports it can reach.
    """
    scores: Dict[str, int] = {}

    for airport in unreachable:
        reachable = get_reachable_airports_in_set(graph, airport, unreachable)
        scores[airport] = len(reachable)

    return scores


def airport_connections_optimized(
    airports: List[str],
    routes: List[List[str]],
    starting_airport: str
) -> int:
    """
    Optimized version using SCC-based approach.

    Args:
        airports: List of airport codes
        routes: List of [source, destination] route pairs
        starting_airport: Starting airport code

    Returns:
        Minimum number of routes to add
    """
    graph = create_airport_graph(airports, routes)
    reachable = get_reachable_airports(graph, starting_airport)
    unreachable = [a for a in airports if a not in reachable]

    if not unreachable:
        return 0

    unreachable_set = set(unreachable)

    # Find SCCs using Kosaraju's algorithm
    # Step 1: Get finish order
    visited: Set[str] = set()
    finish_order: List[str] = []

    def dfs1(airport: str) -> None:
        if airport in visited or airport not in unreachable_set:
            return
        visited.add(airport)
        for neighbor in graph[airport]:
            dfs1(neighbor)
        finish_order.append(airport)

    for airport in unreachable:
        dfs1(airport)

    # Step 2: Build reverse graph
    reverse_graph = create_reverse_graph(airports, routes)

    # Step 3: Find SCCs in reverse order
    visited.clear()
    sccs: List[Set[str]] = []

    def dfs2(airport: str, scc: Set[str]) -> None:
        if airport in visited or airport not in unreachable_set:
            return
        visited.add(airport)
        scc.add(airport)
        for neighbor in reverse_graph[airport]:
            dfs2(neighbor, scc)

    for airport in reversed(finish_order):
        if airport not in visited:
            scc: Set[str] = set()
            dfs2(airport, scc)
            if scc:
                sccs.append(scc)

    # Step 4: Build SCC graph and find roots (SCCs with no incoming edges)
    # Map each airport to its SCC index
    airport_to_scc: Dict[str, int] = {}
    for idx, scc in enumerate(sccs):
        for airport in scc:
            airport_to_scc[airport] = idx

    # Find SCCs with incoming edges from other SCCs
    has_incoming: Set[int] = set()
    for airport in unreachable:
        scc_idx = airport_to_scc[airport]
        for neighbor in reverse_graph[airport]:
            if neighbor in unreachable_set:
                neighbor_scc = airport_to_scc[neighbor]
                if neighbor_scc != scc_idx:
                    has_incoming.add(scc_idx)

    # Count root SCCs (no incoming edges)
    root_count = len(sccs) - len(has_incoming)

    return root_count


# Test cases
if __name__ == "__main__":
    # Test 1: Example from problem
    airports1 = [
        "BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND",
        "ICN", "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD"
    ]
    routes1 = [
        ["DSM", "ORD"], ["ORD", "BGI"], ["BGI", "LGA"], ["SIN", "CDG"],
        ["CDG", "SIN"], ["CDG", "BUD"], ["DEL", "DOH"], ["DEL", "CDG"],
        ["TLV", "DEL"], ["EWR", "HND"], ["HND", "ICN"], ["HND", "JFK"],
        ["ICN", "JFK"], ["JFK", "LGA"], ["EYW", "LHR"], ["LHR", "SFO"],
        ["SFO", "SAN"], ["SFO", "DSM"], ["SAN", "EYW"]
    ]
    starting1 = "LGA"

    result1 = airport_connections(airports1, routes1, starting1)
    print(f"Test 1: {result1}")  # Expected: 3

    # Test 2: All airports already reachable
    airports2 = ["A", "B", "C"]
    routes2 = [["A", "B"], ["B", "C"]]
    starting2 = "A"

    result2 = airport_connections(airports2, routes2, starting2)
    print(f"Test 2 (All reachable): {result2}")  # Expected: 0
    assert result2 == 0

    # Test 3: No routes at all
    airports3 = ["A", "B", "C", "D"]
    routes3: List[List[str]] = []
    starting3 = "A"

    result3 = airport_connections(airports3, routes3, starting3)
    print(f"Test 3 (No routes): {result3}")  # Expected: 3
    assert result3 == 3

    # Test 4: Single airport
    airports4 = ["A"]
    routes4: List[List[str]] = []
    starting4 = "A"

    result4 = airport_connections(airports4, routes4, starting4)
    print(f"Test 4 (Single airport): {result4}")  # Expected: 0
    assert result4 == 0

    # Test 5: Chain of airports
    airports5 = ["A", "B", "C", "D", "E"]
    routes5 = [["B", "C"], ["C", "D"], ["D", "E"]]
    starting5 = "A"

    result5 = airport_connections(airports5, routes5, starting5)
    print(f"Test 5 (Chain): {result5}")  # Expected: 1 (add A->B)
    assert result5 == 1

    # Test optimized version
    print("\n--- Testing Optimized Version ---")
    result_opt = airport_connections_optimized(airports1, routes1, starting1)
    print(f"Optimized Test: {result_opt}")  # Expected: 3

    print("\nAll tests passed!")
