"""
Nested List Weighted Sum II - Python Solutions

Sum of all integers weighted by INVERSE depth (deeper = less weight).

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Union, List, Tuple
from collections import deque

# Type alias for nested array elements
NestedList = List[Union[int, "NestedList"]]


# ============================================================================
# APPROACH 1: BFS with Level-Sum Trick (Optimal)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# WHY THIS IS BEST:
# - Single pass through all elements
# - No need to pre-calculate max depth
# - Elegant: each element gets added once per remaining level
# ============================================================================

def depth_sum_inverse(arr: NestedList) -> int:
    """
    Compute weighted sum where deeper elements have LESS weight.

    The trick: Use BFS level by level. Maintain a running sum that
    carries forward. Elements at shallower levels get added more times.

    Args:
        arr: A nested list of integers

    Returns:
        The inverse depth-weighted sum

    Examples:
        >>> depth_sum_inverse([[1, 1], 2, [1, 1]])
        8
        >>> depth_sum_inverse([1, [4, [6]]])
        17
    """
    if not arr:
        return 0

    total = 0
    level_sum = 0
    queue = list(arr)  # Start with outermost level

    while queue:
        next_level = []

        for elem in queue:
            if isinstance(elem, list):
                next_level.extend(elem)
            else:
                level_sum += elem

        # Add current running sum to total
        # (each element contributes once per level it's carried through)
        total += level_sum
        queue = next_level

    return total


# ============================================================================
# APPROACH 2: Two-Pass DFS
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(d) where d = max depth
#
# WHEN TO USE:
# - When code clarity is more important than the clever trick
# - Easier to understand and debug
# ============================================================================

def depth_sum_inverse_two_pass(arr: NestedList) -> int:
    """
    Two-pass solution: first find max depth, then compute weighted sum.

    More intuitive but requires two traversals.
    """
    def find_max_depth(arr: NestedList, depth: int) -> int:
        """Find the maximum depth in the nested list."""
        max_d = depth
        for elem in arr:
            if isinstance(elem, list):
                max_d = max(max_d, find_max_depth(elem, depth + 1))
        return max_d

    def compute_weighted_sum(arr: NestedList, depth: int, max_depth: int) -> int:
        """Compute sum with inverse depth weights."""
        total = 0
        weight = max_depth - depth + 1

        for elem in arr:
            if isinstance(elem, list):
                total += compute_weighted_sum(elem, depth + 1, max_depth)
            else:
                total += elem * weight

        return total

    max_depth = find_max_depth(arr, 1)
    return compute_weighted_sum(arr, 1, max_depth)


# ============================================================================
# APPROACH 3: DFS with Value Collection + Post-Processing
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# Collect (value, depth) pairs, then compute after knowing max depth.
# ============================================================================

def depth_sum_inverse_collect(arr: NestedList) -> int:
    """
    Collect all (value, depth) pairs, then compute with known max depth.

    Flexible approach that allows various post-processing options.
    """
    pairs: List[Tuple[int, int]] = []
    max_depth = 0

    def collect(arr: NestedList, depth: int) -> None:
        nonlocal max_depth
        max_depth = max(max_depth, depth)

        for elem in arr:
            if isinstance(elem, list):
                collect(elem, depth + 1)
            else:
                pairs.append((elem, depth))

    collect(arr, 1)

    # Compute weighted sum
    return sum(value * (max_depth - depth + 1) for value, depth in pairs)


# ============================================================================
# APPROACH 4: Single DFS with Mathematical Trick
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(d)
#
# Use the formula: InverseSum = (maxDepth + 1) * unweightedSum - normalSum
# where normalSum uses depth as weight (like regular product sum).
# ============================================================================

def depth_sum_inverse_math(arr: NestedList) -> int:
    """
    Use mathematical relationship between regular and inverse weighted sums.

    Formula: InverseSum = (maxDepth + 1) * unweightedSum - normalSum

    Proof:
    - normalSum = sum(v * d) for each value v at depth d
    - inverseSum = sum(v * (maxD - d + 1)) = sum(v * (maxD + 1)) - sum(v * d)
                 = (maxD + 1) * sum(v) - normalSum
    """
    def compute_sums(arr: NestedList, depth: int) -> Tuple[int, int, int]:
        """Return (unweighted_sum, depth_weighted_sum, max_depth)."""
        unweighted = 0
        weighted = 0
        max_d = depth

        for elem in arr:
            if isinstance(elem, list):
                uw, w, md = compute_sums(elem, depth + 1)
                unweighted += uw
                weighted += w
                max_d = max(max_d, md)
            else:
                unweighted += elem
                weighted += elem * depth

        return unweighted, weighted, max_d

    unweighted_sum, depth_weighted_sum, max_depth = compute_sums(arr, 1)
    return (max_depth + 1) * unweighted_sum - depth_weighted_sum


# ============================================================================
# APPROACH 5: BFS with Deque (More Pythonic)
# ============================================================================
# Same as Approach 1 but using collections.deque for clarity.
# ============================================================================

def depth_sum_inverse_deque(arr: NestedList) -> int:
    """
    BFS approach using deque for clearer level-by-level processing.
    """
    if not arr:
        return 0

    total = 0
    level_sum = 0
    queue = deque([arr])

    while queue:
        level_size = len(queue)

        for _ in range(level_size):
            current = queue.popleft()

            for elem in current:
                if isinstance(elem, list):
                    queue.append(elem)
                else:
                    level_sum += elem

        total += level_sum

    return total


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests() -> None:
    """Run comprehensive tests for all approaches."""

    test_cases = [
        ([[1, 1], 2, [1, 1]], 8, "[[1, 1], 2, [1, 1]]"),
        ([1, [4, [6]]], 17, "[1, [4, [6]]]"),
        ([1, 2, 3], 6, "[1, 2, 3] - flat"),
        ([[[1]]], 1, "[[[1]]] - deeply nested single"),
        ([1, [-1]], 1, "[1, [-1]] - with negative"),
    ]

    approaches = [
        ("BFS Level-Sum (Optimal)", depth_sum_inverse),
        ("Two-Pass DFS", depth_sum_inverse_two_pass),
        ("Collect + Post-Process", depth_sum_inverse_collect),
        ("Mathematical Trick", depth_sum_inverse_math),
        ("BFS with Deque", depth_sum_inverse_deque),
    ]

    print("=" * 70)
    print("NESTED LIST WEIGHTED SUM II - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for arr, expected, desc in test_cases:
            result = func(arr)
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  [{status}] {desc}: got {result}, expected {expected}")

        if all_passed:
            print("  All tests passed!")


if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("SAMPLE OUTPUT")
    print("=" * 70)

    print("\nInput: [[1, 1], 2, [1, 1]]")
    print(f"Output: {depth_sum_inverse([[1, 1], 2, [1, 1]])}")

    print("\nInput: [1, [4, [6]]]")
    print(f"Output: {depth_sum_inverse([1, [4, [6]]])}")

    print("\n" + "=" * 70)
    print("WEIGHT CALCULATION BREAKDOWN")
    print("=" * 70)

    print("\nFor [1, [4, [6]]] with maxDepth = 3:")
    print("  - 1 at depth 1: weight = 3-1+1 = 3, contribution = 1*3 = 3")
    print("  - 4 at depth 2: weight = 3-2+1 = 2, contribution = 4*2 = 8")
    print("  - 6 at depth 3: weight = 3-3+1 = 1, contribution = 6*1 = 6")
    print("  - Total = 3 + 8 + 6 = 17")
