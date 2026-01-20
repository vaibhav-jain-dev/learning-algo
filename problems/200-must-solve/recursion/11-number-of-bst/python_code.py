"""
Number of Binary Search Trees - Python Solution

Count structurally unique BSTs that can store values 1 to n.
"""

from typing import Dict
from math import factorial


def number_of_bst(n: int) -> int:
    """
    Count unique BSTs using dynamic programming.

    Args:
        n: Number of nodes (values 1 to n)

    Returns:
        Number of structurally unique BSTs

    Example:
        >>> number_of_bst(3)
        5
    """
    # dp[i] = number of unique BSTs with i nodes
    dp = [0] * (n + 1)

    # Base cases
    dp[0] = 1  # Empty tree
    dp[1] = 1  # Single node

    # Fill for each number of nodes
    for nodes in range(2, n + 1):
        # Try each node as root
        for root in range(1, nodes + 1):
            left_nodes = root - 1
            right_nodes = nodes - root
            dp[nodes] += dp[left_nodes] * dp[right_nodes]

    return dp[n]


def number_of_bst_recursive(n: int) -> int:
    """
    Count unique BSTs using memoized recursion.
    """
    memo: Dict[int, int] = {0: 1, 1: 1}

    def count_trees(num_nodes: int) -> int:
        """Count BSTs with num_nodes nodes."""
        if num_nodes in memo:
            return memo[num_nodes]

        total = 0
        for root in range(1, num_nodes + 1):
            left = count_trees(root - 1)
            right = count_trees(num_nodes - root)
            total += left * right

        memo[num_nodes] = total
        return total

    return count_trees(n)


def number_of_bst_catalan(n: int) -> int:
    """
    Calculate using Catalan number formula.

    C(n) = (2n)! / ((n+1)! * n!)

    This is mathematically equivalent to the DP solution.
    """
    return factorial(2 * n) // (factorial(n + 1) * factorial(n))


def number_of_bst_catalan_optimized(n: int) -> int:
    """
    Calculate Catalan number using iterative formula to avoid large factorials.

    C(n) = C(n-1) * 2(2n-1) / (n+1)
    """
    if n <= 1:
        return 1

    catalan = 1
    for i in range(1, n + 1):
        catalan = catalan * 2 * (2 * i - 1) // (i + 1)

    return catalan


def generate_catalan_sequence(limit: int) -> list:
    """Generate first 'limit' Catalan numbers."""
    return [number_of_bst(i) for i in range(limit)]


if __name__ == "__main__":
    # Test case 1
    n1 = 3
    print(f"n = {n1}")
    print(f"DP:                {number_of_bst(n1)}")
    print(f"Recursive:         {number_of_bst_recursive(n1)}")
    print(f"Catalan:           {number_of_bst_catalan(n1)}")
    print(f"Catalan Optimized: {number_of_bst_catalan_optimized(n1)}")

    # Test case 2
    n2 = 5
    print(f"\nn = {n2}")
    print(f"Result: {number_of_bst(n2)}")

    # Test case 3
    n3 = 10
    print(f"\nn = {n3}")
    print(f"Result: {number_of_bst(n3)}")

    # Display Catalan sequence
    print("\nCatalan number sequence (number of unique BSTs):")
    sequence = generate_catalan_sequence(11)
    for i, count in enumerate(sequence):
        print(f"  n={i}: {count} unique BSTs")

    # Verify all methods give same result
    print("\nVerification (all methods should match):")
    for n in range(1, 10):
        dp = number_of_bst(n)
        rec = number_of_bst_recursive(n)
        cat = number_of_bst_catalan(n)
        cat_opt = number_of_bst_catalan_optimized(n)
        match = "OK" if dp == rec == cat == cat_opt else "MISMATCH"
        print(f"  n={n}: {dp} [{match}]")
