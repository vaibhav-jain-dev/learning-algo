"""
Move Element to End (Preserve Order) - Python Solutions

Move all instances of target value to end while preserving relative order
of non-target elements.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List


# ============================================================================
# APPROACH 1: Write Pointer (Recommended)
# ============================================================================
# Time Complexity:  O(n) - single pass
# Space Complexity: O(1) - in-place modification
#
# WHY THIS IS BEST:
# - Single pass through array
# - In-place modification
# - Preserves relative order naturally
# ============================================================================

def move_element_preserve_order(array: List[int], to_move: int) -> List[int]:
    """
    Move all instances of to_move to end, preserving order of other elements.

    Uses write pointer technique:
    - Read through array left to right
    - Write non-target elements to current write position
    - Fill remaining positions with target value

    Visual for [2, 1, 2, 3, 2, 4], to_move=2:

        Read: 2 (skip), 1 (write), 2 (skip), 3 (write), 2 (skip), 4 (write)
        Write positions: 0, 1, 2 get values 1, 3, 4
        Fill positions 3, 4, 5 with 2

        Result: [1, 3, 4, 2, 2, 2]
    """
    write_idx = 0

    # First pass: write all non-target elements
    for val in array:
        if val != to_move:
            array[write_idx] = val
            write_idx += 1

    # Second pass: fill remaining with target value
    while write_idx < len(array):
        array[write_idx] = to_move
        write_idx += 1

    return array


# ============================================================================
# APPROACH 2: Count and Rebuild
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# WHEN TO USE:
# - When you want explicit counting
# - Same performance as approach 1
# ============================================================================

def move_element_count_rebuild(array: List[int], to_move: int) -> List[int]:
    """
    Alternative: Count targets first, then rebuild array.

    Steps:
    1. Count how many targets exist
    2. Write non-targets to front
    3. Fill end with counted targets
    """
    target_count = sum(1 for x in array if x == to_move)

    write_idx = 0
    for val in array:
        if val != to_move:
            array[write_idx] = val
            write_idx += 1

    # Fill remaining positions with target
    for i in range(write_idx, len(array)):
        array[i] = to_move

    return array


# ============================================================================
# APPROACH 3: List Comprehension (New List)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) - creates new list
#
# WHEN TO USE:
# - When in-place modification not required
# - More readable, Pythonic
# ============================================================================

def move_element_new_list(array: List[int], to_move: int) -> List[int]:
    """
    Create new list with non-targets first, targets last.

    Not in-place but very Pythonic and readable.
    """
    non_targets = [x for x in array if x != to_move]
    targets = [x for x in array if x == to_move]
    return non_targets + targets


# ============================================================================
# APPROACH 4: Using filter (Functional Style)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - Functional programming preference
# - Immutable data requirements
# ============================================================================

def move_element_functional(array: List[int], to_move: int) -> List[int]:
    """
    Functional approach using filter.
    """
    non_targets = list(filter(lambda x: x != to_move, array))
    target_count = len(array) - len(non_targets)
    return non_targets + [to_move] * target_count


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (array, to_move, expected, description)
        ([2, 1, 2, 3, 2, 4], 2, [1, 3, 4, 2, 2, 2], "Standard case"),
        ([1, 2, 3, 4, 5], 3, [1, 2, 4, 5, 3], "Single target"),
        ([2, 2, 2], 2, [2, 2, 2], "All targets"),
        ([1, 2, 3], 4, [1, 2, 3], "No targets"),
        ([], 1, [], "Empty array"),
        ([1], 1, [1], "Single element is target"),
        ([5, 1, 5, 2, 5, 3], 5, [1, 2, 3, 5, 5, 5], "Multiple at start"),
    ]

    # Test in-place approaches with copies
    approaches = [
        ("Write Pointer (Recommended)", lambda a, t: move_element_preserve_order(a.copy(), t)),
        ("Count and Rebuild", lambda a, t: move_element_count_rebuild(a.copy(), t)),
        ("New List", move_element_new_list),
        ("Functional", move_element_functional),
    ]

    print("=" * 70)
    print("MOVE ELEMENT TO END (PRESERVE ORDER) - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for array, to_move, expected, desc in test_cases:
            result = func(array.copy(), to_move)
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  {status}: {desc}")
            if result != expected:
                print(f"        Got: {result}, Expected: {expected}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")


# ============================================================================
# SAMPLE INPUT (matches problem examples)
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    array = [2, 1, 2, 3, 2, 4]
    to_move = 2
    print(f"\nInput: array = {array}, toMove = {to_move}")
    result = move_element_preserve_order(array.copy(), to_move)
    print(f"Output: {result}")

    # Sample Input 2
    array = [1, 2, 3, 4, 5]
    to_move = 3
    print(f"\nInput: array = {array}, toMove = {to_move}")
    result = move_element_preserve_order(array.copy(), to_move)
    print(f"Output: {result}")

    # Sample Input 3
    array = [2, 2, 2]
    to_move = 2
    print(f"\nInput: array = {array}, toMove = {to_move}")
    result = move_element_preserve_order(array.copy(), to_move)
    print(f"Output: {result}")
