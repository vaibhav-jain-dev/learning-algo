"""
Validate Subsequence - Python Solutions

Given two arrays, determine if the second is a subsequence of the first.
A subsequence maintains relative order but doesn't need to be contiguous.

This file contains MULTIPLE solution approaches with explanations.
"""

from typing import List


# ============================================================================
# APPROACH 1: Two-Pointer (For-Each Loop) ⭐ RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) where n is length of main array
# Space Complexity: O(1) - only one pointer variable
#
# WHY THIS IS BEST:
# - Simplest implementation with single pointer
# - Most readable and maintainable
# - Optimal time and space complexity
# - Pythonic - uses natural iteration
# ============================================================================

def validate_subsequence(array: List[int], sequence: List[int]) -> bool:
    """
    Validates if sequence is a subsequence of array using for-each loop.

    How it works:
    1. Track position in sequence with seq_idx pointer
    2. Iterate through main array
    3. On match, advance sequence pointer
    4. Return true if all sequence elements found

    Visual:
        array:    [5, 1, 22, 25, 6, -1, 8, 10]
        sequence: [1, 6, -1, 10]

        Step through array, matching sequence elements in order:
        5≠1, 1=1✓, 22≠6, 25≠6, 6=6✓, -1=-1✓, 8≠10, 10=10✓
        Found all 4 elements → True
    """
    seq_idx = 0

    for num in array:
        # Early exit if we've found all sequence elements
        if seq_idx == len(sequence):
            break
        # Match found - advance sequence pointer
        if num == sequence[seq_idx]:
            seq_idx += 1

    return seq_idx == len(sequence)


# ============================================================================
# APPROACH 2: Two-Pointer (While Loop)
# ============================================================================
# Time Complexity:  O(n) - same as Approach 1
# Space Complexity: O(1) - two pointer variables
#
# WHEN TO USE THIS INSTEAD:
# - When you need explicit index access
# - When interviewer requests "two-pointer" solution
# - When modifying to track match positions
# ============================================================================

def validate_subsequence_while(array: List[int], sequence: List[int]) -> bool:
    """
    Validates subsequence using explicit while loop with two pointers.

    How it works:
    1. Two pointers: arr_idx for array, seq_idx for sequence
    2. Both start at 0
    3. Always advance arr_idx
    4. Advance seq_idx only on match
    5. Stop when either reaches end

    Comparison with Approach 1:
    ┌─────────────────────────────────────────────────────────┐
    │  Approach 1 (for-each)    │  Approach 2 (while)        │
    ├─────────────────────────────────────────────────────────┤
    │  Implicit array index     │  Explicit arr_idx          │
    │  Single pointer           │  Two pointers              │
    │  More Pythonic            │  More explicit control     │
    │  Same O(n) time           │  Same O(n) time            │
    └─────────────────────────────────────────────────────────┘
    """
    arr_idx = 0
    seq_idx = 0

    while arr_idx < len(array) and seq_idx < len(sequence):
        if array[arr_idx] == sequence[seq_idx]:
            seq_idx += 1
        arr_idx += 1

    return seq_idx == len(sequence)


# ============================================================================
# APPROACH 3: Recursive Solution
# ============================================================================
# Time Complexity:  O(n) - each element processed once
# Space Complexity: O(n) - call stack depth ⚠️ WORSE THAN ITERATIVE
#
# WHEN TO USE:
# - Learning recursion concepts
# - Building toward DP solutions (LCS, Edit Distance)
# - When problem naturally fits recursive structure
#
# WHEN NOT TO USE:
# - Large arrays (stack overflow risk)
# - Performance critical code
# - Memory constrained environments
# ============================================================================

def validate_subsequence_recursive(array: List[int], sequence: List[int]) -> bool:
    """
    Validates subsequence using recursion.

    How it works:
    Base Cases:
        - Empty sequence → True (found everything)
        - Empty array with non-empty sequence → False

    Recursive Case:
        - Match: Check remaining array AND remaining sequence
        - No match: Check remaining array with SAME sequence

    Recursion Tree Example:
    validate([5,1,22,6], [1,6])
    │
    ├── 5≠1: validate([1,22,6], [1,6])
    │   │
    │   └── 1=1: validate([22,6], [6])
    │       │
    │       └── 22≠6: validate([6], [6])
    │           │
    │           └── 6=6: validate([], [])
    │               │
    │               └── Empty sequence → True ✓
    """
    return _recursive_helper(array, sequence, 0, 0)


def _recursive_helper(array: List[int], sequence: List[int],
                      arr_idx: int, seq_idx: int) -> bool:
    """Helper to avoid array slicing (more efficient)."""
    # Base case: found all sequence elements
    if seq_idx == len(sequence):
        return True

    # Base case: array exhausted but sequence remains
    if arr_idx == len(array):
        return False

    # Recursive case
    if array[arr_idx] == sequence[seq_idx]:
        # Match - advance both pointers
        return _recursive_helper(array, sequence, arr_idx + 1, seq_idx + 1)
    else:
        # No match - only advance array pointer
        return _recursive_helper(array, sequence, arr_idx + 1, seq_idx)


# ============================================================================
# APPROACH 4: Index Finding (Less Optimal)
# ============================================================================
# Time Complexity:  O(n * m) worst case ⚠️ SUBOPTIMAL
# Space Complexity: O(1)
#
# WHY IT'S SUBOPTIMAL:
# - May re-scan portions of array multiple times
# - O(n*m) vs O(n) for two-pointer approach
#
# EDUCATIONAL VALUE:
# - Shows common beginner approach
# - Demonstrates why two-pointer is better
# - Still correct, just slower
# ============================================================================

def validate_subsequence_index_find(array: List[int], sequence: List[int]) -> bool:
    """
    Validates subsequence by finding each element's index.

    How it works:
    1. For each sequence element
    2. Find it in array (starting after previous found position)
    3. If not found, return False
    4. Update search start position

    Why it's slower:
    ┌─────────────────────────────────────────────────────────┐
    │  Array: [1, 1, 1, 1, 1, 2]                              │
    │  Sequence: [1, 1, 1, 1, 2]                              │
    │                                                         │
    │  Two-pointer: Scans array ONCE → O(n)                   │
    │  Index-find:  Multiple index() calls → O(n*m)           │
    └─────────────────────────────────────────────────────────┘
    """
    search_start = 0

    for target in sequence:
        try:
            # Find target in remaining portion of array
            found_idx = array.index(target, search_start)
            # Update start position for next search
            search_start = found_idx + 1
        except ValueError:
            # Target not found in remaining array
            return False

    return True


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (array, sequence, expected, description)
        ([5, 1, 22, 25, 6, -1, 8, 10], [1, 6, -1, 10], True, "Standard case"),
        ([5, 1, 22, 25, 6, -1, 8, 10], [5, 1, 22, 25, 6, -1, 8, 10], True, "Full array"),
        ([5, 1, 22, 25, 6, -1, 8, 10], [5, 1, 22, 6, -1, 8, 10], True, "Skip elements"),
        ([5, 1, 22, 25, 6, -1, 8, 10], [1, 6, 10, -1], False, "Wrong order"),
        ([1, 2, 3, 4], [2, 4], True, "Simple case"),
        ([1, 2, 3, 4], [5], False, "Element not present"),
        ([1], [1], True, "Single element match"),
        ([1], [2], False, "Single element no match"),
        ([1, 1, 1, 1], [1, 1], True, "Duplicates"),
        ([-5, -4, -3], [-5, -3], True, "Negative numbers"),
    ]

    approaches = [
        ("For-Each (Recommended)", validate_subsequence),
        ("While Loop", validate_subsequence_while),
        ("Recursive", validate_subsequence_recursive),
        ("Index Finding", validate_subsequence_index_find),
    ]

    print("=" * 70)
    print("VALIDATE SUBSEQUENCE - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for array, sequence, expected, desc in test_cases:
            result = func(array.copy(), sequence.copy())
            status = "✓" if result == expected else "✗"
            if result != expected:
                all_passed = False
            print(f"  {status} {desc}: {result}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")

    print("\n" + "=" * 70)
    print("COMPLEXITY COMPARISON")
    print("=" * 70)
    print("""
    ┌───────────────────┬──────────┬──────────┬──────────────────┐
    │     Approach      │   Time   │  Space   │  Recommendation  │
    ├───────────────────┼──────────┼──────────┼──────────────────┤
    │ 1. For-Each Loop  │   O(n)   │   O(1)   │  ⭐ BEST CHOICE  │
    │ 2. While Loop     │   O(n)   │   O(1)   │  ✓ Also great    │
    │ 3. Recursive      │   O(n)   │   O(n)   │  ⚠️ Learning only│
    │ 4. Index Finding  │  O(n*m)  │   O(1)   │  ✗ Not optimal   │
    └───────────────────┴──────────┴──────────┴──────────────────┘
    """)


if __name__ == "__main__":
    run_tests()
