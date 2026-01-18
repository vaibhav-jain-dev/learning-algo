"""
Flatten Nested List - Python Solutions

Flatten a nested list of integers into a single-level list.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Union, List, Iterator
from collections import deque

# Type alias for nested array elements
NestedList = List[Union[int, "NestedList"]]


# ============================================================================
# APPROACH 1: Recursive with Result Accumulation
# ============================================================================
# Time Complexity:  O(n) where n = total number of elements
# Space Complexity: O(d) where d = maximum depth (recursion stack)
#
# WHY THIS IS BEST:
# - In-place accumulation avoids extra memory allocations
# - Single pass through all elements
# - Clean recursive structure
# ============================================================================

def flatten(arr: NestedList) -> List[int]:
    """
    Flatten a nested list into a single-level list.

    Args:
        arr: A nested list of integers and/or lists

    Returns:
        A flat list containing all integers in order

    Examples:
        >>> flatten([[1, 2], [3, [4, 5]], 6])
        [1, 2, 3, 4, 5, 6]
        >>> flatten([1, [2, [3, [4, [5]]]]])
        [1, 2, 3, 4, 5]
    """
    result: List[int] = []
    _flatten_helper(arr, result)
    return result


def _flatten_helper(arr: NestedList, result: List[int]) -> None:
    """Helper function that accumulates results."""
    for elem in arr:
        if isinstance(elem, list):
            _flatten_helper(elem, result)
        else:
            result.append(elem)


# ============================================================================
# APPROACH 2: Recursive with List Concatenation
# ============================================================================
# Time Complexity:  O(n^2) worst case due to list concatenation
# Space Complexity: O(n) for intermediate lists
#
# Pythonic but less efficient due to concatenation overhead.
# ============================================================================

def flatten_concat(arr: NestedList) -> List[int]:
    """
    Flatten using list concatenation.

    More Pythonic but less efficient for deeply nested lists.
    """
    result: List[int] = []
    for elem in arr:
        if isinstance(elem, list):
            result.extend(flatten_concat(elem))
        else:
            result.append(elem)
    return result


# ============================================================================
# APPROACH 3: Generator/Iterator Pattern
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(d) for recursion stack
#
# WHEN TO USE:
# - When you need lazy evaluation
# - For streaming/pipeline processing
# - Memory-efficient iteration
# ============================================================================

def flatten_generator(arr: NestedList) -> Iterator[int]:
    """
    Generator that yields flattened elements one at a time.

    Memory-efficient: doesn't create intermediate lists.
    Lazy evaluation: only processes elements as needed.
    """
    for elem in arr:
        if isinstance(elem, list):
            yield from flatten_generator(elem)
        else:
            yield elem


def flatten_with_generator(arr: NestedList) -> List[int]:
    """Convert generator to list."""
    return list(flatten_generator(arr))


# ============================================================================
# APPROACH 4: Iterative with Stack (DFS)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - When recursion depth might cause stack overflow
# - For very deeply nested structures
# ============================================================================

def flatten_iterative(arr: NestedList) -> List[int]:
    """
    Iterative flattening using explicit stack.

    Avoids recursion limit for deeply nested lists.
    """
    result: List[int] = []

    # Stack holds (array, index) pairs
    stack: List[tuple[NestedList, int]] = [(arr, 0)]

    while stack:
        current_arr, idx = stack[-1]

        # If we've processed all elements, pop this level
        if idx >= len(current_arr):
            stack.pop()
            continue

        # Process current element
        elem = current_arr[idx]
        stack[-1] = (current_arr, idx + 1)  # Increment index

        if isinstance(elem, list):
            stack.append((elem, 0))
        else:
            result.append(elem)

    return result


# ============================================================================
# APPROACH 5: Iterative with Reverse Stack
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# Alternative that maintains natural left-to-right order.
# ============================================================================

def flatten_iterative_reverse(arr: NestedList) -> List[int]:
    """
    Iterative approach using reversed element order on stack.

    Elements are pushed in reverse order so they pop in correct order.
    """
    result: List[int] = []
    stack = list(reversed(arr))

    while stack:
        elem = stack.pop()

        if isinstance(elem, list):
            # Add elements in reverse order
            stack.extend(reversed(elem))
        else:
            result.append(elem)

    return result


# ============================================================================
# APPROACH 6: Using Sum with Generator (One-Liner)
# ============================================================================
# Clever but not recommended for production code.
# ============================================================================

def flatten_oneliner(arr: NestedList) -> List[int]:
    """
    One-liner solution using sum to concatenate lists.

    Clever but has O(n^2) time complexity due to repeated concatenation.
    """
    return sum(
        (flatten_oneliner(elem) if isinstance(elem, list) else [elem] for elem in arr),
        []
    )


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests() -> None:
    """Run comprehensive tests for all approaches."""

    test_cases = [
        ([[1, 2], [3, [4, 5]], 6], [1, 2, 3, 4, 5, 6], "[[1, 2], [3, [4, 5]], 6]"),
        ([1, [2, [3, [4, [5]]]]], [1, 2, 3, 4, 5], "Deep nesting"),
        ([[[1]], [[2]], [[3]]], [1, 2, 3], "[[[1]], [[2]], [[3]]]"),
        ([1, 2, 3], [1, 2, 3], "Already flat"),
        ([], [], "Empty array"),
        ([[], 1, [], 2, []], [1, 2], "With empty arrays"),
    ]

    approaches = [
        ("Recursive Accumulation", flatten),
        ("Recursive Concatenation", flatten_concat),
        ("Generator Pattern", flatten_with_generator),
        ("Iterative Stack", flatten_iterative),
        ("Iterative Reverse", flatten_iterative_reverse),
    ]

    print("=" * 70)
    print("FLATTEN NESTED LIST - TEST RESULTS")
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

    print("\nInput: [[1, 2], [3, [4, 5]], 6]")
    print(f"Output: {flatten([[1, 2], [3, [4, 5]], 6])}")

    print("\nInput: [1, [2, [3, [4, [5]]]]]")
    print(f"Output: {flatten([1, [2, [3, [4, [5]]]]])}")

    print("\n" + "=" * 70)
    print("GENERATOR EXAMPLE - Lazy Evaluation")
    print("=" * 70)

    nested = [[1, 2], [3, [4, 5]], 6]
    print(f"\nIterating over flatten_generator({nested}):")
    for i, val in enumerate(flatten_generator(nested)):
        print(f"  Yielded element {i}: {val}")
