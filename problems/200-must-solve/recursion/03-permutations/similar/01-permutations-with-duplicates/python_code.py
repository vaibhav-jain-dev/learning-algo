"""
Permutations with Duplicates - Python Solutions

Given an array that may contain duplicates, return all unique permutations.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List
from collections import Counter


# ============================================================================
# APPROACH 1: Sort + Used Array (Recommended)
# ============================================================================
# Time Complexity:  O(n! * n) - generate up to n! permutations, each of length n
# Space Complexity: O(n) - recursion stack and used array
#
# WHY THIS IS BEST:
# - Clean and intuitive deduplication logic
# - Sorting brings duplicates together
# - Skip rule is easy to understand: use duplicates in order
# ============================================================================

def permute_unique(nums: List[int]) -> List[List[int]]:
    """
    Generate all unique permutations of an array with possible duplicates.

    Key insight: Sort the array, then skip duplicates at the same recursion
    level by only using a duplicate if its predecessor is already used.

    Args:
        nums: List of integers (may contain duplicates)

    Returns:
        List of all unique permutations

    Examples:
        >>> sorted(permute_unique([1, 1, 2]))
        [[1, 1, 2], [1, 2, 1], [2, 1, 1]]
        >>> permute_unique([1, 1, 1])
        [[1, 1, 1]]
    """
    result: List[List[int]] = []
    nums.sort()  # Critical: sort to bring duplicates together
    used = [False] * len(nums)

    def backtrack(current: List[int]) -> None:
        # Base case: permutation is complete
        if len(current) == len(nums):
            result.append(current[:])  # Make a copy
            return

        for i in range(len(nums)):
            # Skip if already used in current permutation
            if used[i]:
                continue

            # Skip duplicates: only use nums[i] if nums[i-1] is already used
            # This ensures we use duplicates in left-to-right order
            if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]:
                continue

            # Choose
            used[i] = True
            current.append(nums[i])

            # Explore
            backtrack(current)

            # Unchoose (backtrack)
            current.pop()
            used[i] = False

    backtrack([])
    return result


# ============================================================================
# APPROACH 2: Counter/Frequency Map
# ============================================================================
# Time Complexity:  O(n! * n)
# Space Complexity: O(n) for recursion and counter
#
# WHEN TO USE:
# - When you want to avoid sorting
# - When elements are not easily sortable
# - More intuitive for frequency-based thinking
# ============================================================================

def permute_unique_counter(nums: List[int]) -> List[List[int]]:
    """
    Generate unique permutations using a frequency counter.

    Instead of tracking used indices, track remaining counts of each value.
    """
    result: List[List[int]] = []
    counter = Counter(nums)

    def backtrack(current: List[int]) -> None:
        if len(current) == len(nums):
            result.append(current[:])
            return

        # Try each unique value that still has remaining count
        for num in counter:
            if counter[num] > 0:
                # Choose
                counter[num] -= 1
                current.append(num)

                # Explore
                backtrack(current)

                # Unchoose
                current.pop()
                counter[num] += 1

    backtrack([])
    return result


# ============================================================================
# APPROACH 3: Swap-based with Set Deduplication
# ============================================================================
# Time Complexity:  O(n! * n)
# Space Complexity: O(n) for recursion, O(n) for set at each level
#
# WHEN TO USE:
# - When you prefer the swap-based approach
# - Note: slightly less efficient due to set operations
# ============================================================================

def permute_unique_swap(nums: List[int]) -> List[List[int]]:
    """
    Generate unique permutations using swaps with set-based deduplication.

    At each position, track which values we've already placed there.
    """
    result: List[List[int]] = []
    nums = nums[:]  # Work on a copy

    def backtrack(start: int) -> None:
        if start == len(nums):
            result.append(nums[:])
            return

        seen = set()  # Track values placed at position 'start'

        for i in range(start, len(nums)):
            if nums[i] in seen:
                continue  # Skip if we already placed this value here

            seen.add(nums[i])

            # Swap
            nums[start], nums[i] = nums[i], nums[start]

            # Recurse
            backtrack(start + 1)

            # Swap back
            nums[start], nums[i] = nums[i], nums[start]

    backtrack(0)
    return result


# ============================================================================
# APPROACH 4: Iterative with Insertion
# ============================================================================
# Time Complexity:  O(n! * n^2)
# Space Complexity: O(n!) to store all permutations
#
# WHEN TO USE:
# - When you prefer iterative over recursive
# - Educational purposes to understand permutation generation
# ============================================================================

def permute_unique_iterative(nums: List[int]) -> List[List[int]]:
    """
    Generate unique permutations iteratively by inserting each element.

    Build permutations by inserting each number at all valid positions.
    """
    nums.sort()
    perms = [[]]

    for num in nums:
        new_perms = []
        for perm in perms:
            # Insert num at each position
            for i in range(len(perm) + 1):
                new_perms.append(perm[:i] + [num] + perm[i:])
                # Stop early if we encounter same number (deduplication)
                if i < len(perm) and perm[i] == num:
                    break
        perms = new_perms

    return perms


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests() -> None:
    """Run comprehensive tests for all approaches."""

    test_cases = [
        ([1, 1, 2], [[1, 1, 2], [1, 2, 1], [2, 1, 1]], "Basic duplicates"),
        ([1, 2, 3], [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]], "No duplicates"),
        ([1, 1, 1], [[1, 1, 1]], "All same"),
        ([1], [[1]], "Single element"),
        ([2, 2], [[2, 2]], "Two same elements"),
        ([1, 2, 2], [[1, 2, 2], [2, 1, 2], [2, 2, 1]], "Two duplicates"),
    ]

    approaches = [
        ("Sort + Used Array", permute_unique),
        ("Counter/Frequency Map", permute_unique_counter),
        ("Swap with Set", permute_unique_swap),
        ("Iterative", permute_unique_iterative),
    ]

    print("=" * 70)
    print("PERMUTATIONS WITH DUPLICATES - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for nums, expected, desc in test_cases:
            # Sort both for comparison (order doesn't matter)
            result = sorted([sorted(p) for p in func(nums[:])])
            expected_sorted = sorted([sorted(p) for p in expected])

            status = "PASS" if result == expected_sorted else "FAIL"
            if result != expected_sorted:
                all_passed = False
                print(f"  [{status}] {desc}: nums={nums}")
                print(f"         Got: {result}")
                print(f"         Expected: {expected_sorted}")
            else:
                print(f"  [{status}] {desc}: nums={nums}, count={len(result)}")

        if all_passed:
            print("  All tests passed!")


def demonstrate_deduplication() -> None:
    """Show the difference between naive and deduplicated approaches."""

    print("\n" + "=" * 70)
    print("DEMONSTRATION: Why Deduplication Matters")
    print("=" * 70)

    nums = [1, 1, 2]

    # Naive approach (treating elements as unique by index)
    def naive_permute(arr):
        result = []
        def backtrack(current, remaining_indices):
            if not remaining_indices:
                result.append([arr[i] for i in current])
                return
            for i in remaining_indices:
                backtrack(current + [i], [j for j in remaining_indices if j != i])
        backtrack([], list(range(len(arr))))
        return result

    naive_result = naive_permute(nums)
    correct_result = permute_unique(nums[:])

    print(f"\nInput: {nums}")
    print(f"\nNaive approach (wrong):")
    print(f"  Generated {len(naive_result)} permutations:")
    for p in naive_result:
        print(f"    {p}")

    print(f"\nWith deduplication (correct):")
    print(f"  Generated {len(correct_result)} unique permutations:")
    for p in correct_result:
        print(f"    {p}")

    print(f"\n  Saved {len(naive_result) - len(correct_result)} duplicate permutations!")


if __name__ == "__main__":
    run_tests()
    demonstrate_deduplication()

    print("\n" + "=" * 70)
    print("SAMPLE OUTPUT")
    print("=" * 70)

    print("\nInput: nums = [1, 1, 2]")
    result = permute_unique([1, 1, 2])
    print(f"Output: {result}")

    print("\nInput: nums = [1, 2, 3]")
    result = permute_unique([1, 2, 3])
    print(f"Output: {result}")

    print("\nInput: nums = [1, 1, 1]")
    result = permute_unique([1, 1, 1])
    print(f"Output: {result}")
