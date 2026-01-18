"""
Maximum Depth of Nested Arrays - Python Solutions

Find the maximum nesting depth of a nested array structure.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Union, List
from collections import deque

# Type alias for nested array elements
NestedList = List[Union[int, "NestedList"]]


# ============================================================================
# APPROACH 1: Recursive DFS (Optimal)
# ============================================================================
# Time Complexity:  O(n) where n = total number of elements
# Space Complexity: O(d) where d = maximum depth (recursion stack)
#
# WHY THIS IS BEST:
# - Natural fit for tree-like nested structure
# - Clean, Pythonic code
# - Optimal time complexity
# ============================================================================

def max_depth(arr: NestedList) -> int:
    """
    Find the maximum depth of a nested array.

    Depth is defined as:
    - A flat array (no nested arrays) has depth 1
    - Each level of nesting adds 1 to the depth

    Args:
        arr: A nested list of integers and/or lists

    Returns:
        The maximum nesting depth

    Examples:
        >>> max_depth([1, [2, [3, 4]]])
        3
        >>> max_depth([1, 2, 3])
        1
    """
    max_child_depth = 0

    for elem in arr:
        if isinstance(elem, list):
            child_depth = max_depth(elem)
            max_child_depth = max(max_child_depth, child_depth)

    return 1 + max_child_depth


# ============================================================================
# APPROACH 2: Recursive with max() and Generator
# ============================================================================
# More Pythonic one-liner style
# ============================================================================

def max_depth_pythonic(arr: NestedList) -> int:
    """
    Pythonic recursive solution using generator expression.

    More concise but equivalent to the explicit version.
    """
    nested_depths = (max_depth_pythonic(elem) for elem in arr if isinstance(elem, list))
    return 1 + max(nested_depths, default=0)


# ============================================================================
# APPROACH 3: Iterative with Stack (DFS)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) worst case
#
# WHEN TO USE:
# - When recursion depth might cause stack overflow
# - For very deeply nested structures
# ============================================================================

def max_depth_iterative(arr: NestedList) -> int:
    """
    Iterative DFS using explicit stack.

    Avoids recursion limit issues for deeply nested arrays.
    """
    if not arr:
        return 1  # Empty array still has depth 1

    stack = [(arr, 1)]  # (array, current_depth)
    max_depth_found = 1

    while stack:
        current_arr, depth = stack.pop()
        max_depth_found = max(max_depth_found, depth)

        for elem in current_arr:
            if isinstance(elem, list):
                stack.append((elem, depth + 1))

    return max_depth_found


# ============================================================================
# APPROACH 4: BFS with Queue (Level Order)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(w) where w = maximum width at any level
#
# Alternative approach using breadth-first search.
# ============================================================================

def max_depth_bfs(arr: NestedList) -> int:
    """
    BFS approach using queue.

    Processes arrays level by level.
    """
    if not arr:
        return 1

    queue = deque([(arr, 1)])
    max_depth_found = 1

    while queue:
        current_arr, depth = queue.popleft()
        max_depth_found = max(max_depth_found, depth)

        for elem in current_arr:
            if isinstance(elem, list):
                queue.append((elem, depth + 1))

    return max_depth_found


# ============================================================================
# APPROACH 5: Using reduce (Functional Style)
# ============================================================================
# Functional programming approach for those who prefer it.
# ============================================================================

def max_depth_functional(arr: NestedList) -> int:
    """
    Functional approach using reduce.

    Less readable but demonstrates functional programming patterns.
    """
    from functools import reduce

    def depth_of_element(elem: Union[int, NestedList]) -> int:
        if isinstance(elem, list):
            return max_depth_functional(elem)
        return 0

    return 1 + reduce(
        lambda acc, elem: max(acc, depth_of_element(elem)),
        arr,
        0
    )


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests() -> None:
    """Run comprehensive tests for all approaches."""

    test_cases = [
        ([1, [2, [3, 4]]], 3, "[1, [2, [3, 4]]] - depth 3"),
        ([1, 2, 3], 1, "[1, 2, 3] - flat array"),
        ([[[[]]]], 4, "[[[[]]]] - 4 levels of nesting"),
        ([1, [2, 3], [4, [5]]], 3, "[1, [2, 3], [4, [5]]] - multiple branches"),
        ([], 1, "[] - empty array"),
        ([[1], [2], [3]], 2, "[[1], [2], [3]] - wide, shallow"),
    ]

    approaches = [
        ("Recursive DFS", max_depth),
        ("Pythonic Recursive", max_depth_pythonic),
        ("Iterative Stack", max_depth_iterative),
        ("BFS Queue", max_depth_bfs),
        ("Functional Reduce", max_depth_functional),
    ]

    print("=" * 70)
    print("MAXIMUM DEPTH OF NESTED ARRAYS - TEST RESULTS")
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

    print("\nInput: [1, [2, [3, 4]]]")
    print(f"Output: {max_depth([1, [2, [3, 4]]])}")

    print("\nInput: [1, 2, 3]")
    print(f"Output: {max_depth([1, 2, 3])}")

    print("\nInput: [[[[]]]]")
    print(f"Output: {max_depth([[[[]]]])}")
