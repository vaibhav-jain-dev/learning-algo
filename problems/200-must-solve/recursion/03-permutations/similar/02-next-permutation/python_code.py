"""
Next Permutation - Python Solutions

Find the next lexicographically greater permutation of an array.
If already at maximum, return the smallest permutation.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List


# ============================================================================
# APPROACH 1: In-Place Algorithm (Optimal)
# ============================================================================
# Time Complexity:  O(n) - single pass to find pivot, another for successor
# Space Complexity: O(1) - all operations in-place
#
# WHY THIS IS BEST:
# - Optimal time and space complexity
# - Works directly on the array
# - Clean, well-understood algorithm
# ============================================================================

def next_permutation(nums: List[int]) -> None:
    """
    Modify nums in-place to be the next lexicographically greater permutation.

    Algorithm:
    1. Find the largest index i such that nums[i] < nums[i + 1]
       (this is the "pivot" - the rightmost position we can increase)
    2. Find the largest index j such that nums[j] > nums[i]
       (this is the "successor" - smallest value greater than pivot)
    3. Swap nums[i] and nums[j]
    4. Reverse the suffix starting at nums[i + 1]

    Args:
        nums: List of integers to modify in-place

    Examples:
        >>> nums = [1, 2, 3]
        >>> next_permutation(nums)
        >>> nums
        [1, 3, 2]

        >>> nums = [3, 2, 1]
        >>> next_permutation(nums)
        >>> nums
        [1, 2, 3]
    """
    n = len(nums)
    if n <= 1:
        return

    # Step 1: Find the pivot (rightmost element that can be increased)
    # Look for first decreasing element from right
    pivot = -1
    for i in range(n - 2, -1, -1):
        if nums[i] < nums[i + 1]:
            pivot = i
            break

    # If no pivot found, array is in descending order (max permutation)
    # Just reverse to get the smallest permutation
    if pivot == -1:
        nums.reverse()
        return

    # Step 2: Find the successor (smallest element greater than pivot in suffix)
    # Since suffix is descending, search from right for first element > nums[pivot]
    for j in range(n - 1, pivot, -1):
        if nums[j] > nums[pivot]:
            # Step 3: Swap pivot and successor
            nums[pivot], nums[j] = nums[j], nums[pivot]
            break

    # Step 4: Reverse the suffix to make it smallest
    # Use two-pointer technique for in-place reverse
    left, right = pivot + 1, n - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1


# ============================================================================
# APPROACH 2: Using Helper Functions (More Readable)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# WHEN TO USE:
# - When you want more modular, readable code
# - Same algorithm, just broken into helper functions
# ============================================================================

def next_permutation_modular(nums: List[int]) -> None:
    """
    Same algorithm but with helper functions for clarity.
    """

    def find_pivot(arr: List[int]) -> int:
        """Find rightmost index where arr[i] < arr[i+1], or -1 if not found."""
        for i in range(len(arr) - 2, -1, -1):
            if arr[i] < arr[i + 1]:
                return i
        return -1

    def find_successor(arr: List[int], pivot: int) -> int:
        """Find rightmost index j > pivot where arr[j] > arr[pivot]."""
        for j in range(len(arr) - 1, pivot, -1):
            if arr[j] > arr[pivot]:
                return j
        return -1  # Should never happen if pivot is valid

    def reverse_suffix(arr: List[int], start: int) -> None:
        """Reverse arr[start:] in-place."""
        end = len(arr) - 1
        while start < end:
            arr[start], arr[end] = arr[end], arr[start]
            start += 1
            end -= 1

    # Main algorithm
    pivot = find_pivot(nums)

    if pivot == -1:
        # Already at max permutation, wrap to smallest
        reverse_suffix(nums, 0)
        return

    successor = find_successor(nums, pivot)
    nums[pivot], nums[successor] = nums[successor], nums[pivot]
    reverse_suffix(nums, pivot + 1)


# ============================================================================
# APPROACH 3: Pythonic with Slicing (Less Efficient but Concise)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) due to slicing
#
# WHEN TO USE:
# - When memory is not a concern
# - When you want more Pythonic code
# - Note: This creates new lists during reversal
# ============================================================================

def next_permutation_pythonic(nums: List[int]) -> None:
    """
    More Pythonic version using slicing (not truly in-place).
    """
    n = len(nums)
    if n <= 1:
        return

    # Find pivot
    pivot = next((i for i in range(n - 2, -1, -1) if nums[i] < nums[i + 1]), -1)

    if pivot == -1:
        nums[:] = nums[::-1]  # Reverse using slice assignment
        return

    # Find successor
    successor = next(j for j in range(n - 1, pivot, -1) if nums[j] > nums[pivot])

    # Swap
    nums[pivot], nums[successor] = nums[successor], nums[pivot]

    # Reverse suffix using slice assignment
    nums[pivot + 1:] = nums[pivot + 1:][::-1]


# ============================================================================
# UTILITY: Generate All Permutations in Order
# ============================================================================

def generate_all_permutations_in_order(nums: List[int]) -> List[List[int]]:
    """
    Generate all permutations in lexicographic order using next_permutation.

    This demonstrates how next_permutation can be used to enumerate all permutations.
    """
    # Start with smallest permutation
    nums = sorted(nums)
    result = [nums[:]]

    # Keep getting next permutation until we wrap around
    while True:
        prev = nums[:]
        next_permutation(nums)
        if nums <= prev:  # Wrapped around to smallest
            break
        result.append(nums[:])

    return result


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests() -> None:
    """Run comprehensive tests for all approaches."""

    test_cases = [
        ([1, 2, 3], [1, 3, 2], "Basic ascending"),
        ([3, 2, 1], [1, 2, 3], "Descending (wrap around)"),
        ([1, 1, 5], [1, 5, 1], "With duplicates"),
        ([1, 3, 2], [2, 1, 3], "Mixed"),
        ([1], [1], "Single element"),
        ([1, 2], [2, 1], "Two elements"),
        ([2, 1], [1, 2], "Two elements (wrap)"),
        ([1, 5, 8, 4, 7, 6, 5, 3, 1], [1, 5, 8, 5, 1, 3, 4, 6, 7], "Long example"),
        ([2, 3, 1], [3, 1, 2], "Another mixed"),
    ]

    approaches = [
        ("In-Place (Optimal)", next_permutation),
        ("Modular", next_permutation_modular),
        ("Pythonic", next_permutation_pythonic),
    ]

    print("=" * 70)
    print("NEXT PERMUTATION - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for nums, expected, desc in test_cases:
            test_nums = nums[:]  # Make a copy
            func(test_nums)

            status = "PASS" if test_nums == expected else "FAIL"
            if test_nums != expected:
                all_passed = False
                print(f"  [{status}] {desc}")
                print(f"         Input:    {nums}")
                print(f"         Got:      {test_nums}")
                print(f"         Expected: {expected}")
            else:
                print(f"  [{status}] {desc}: {nums} -> {test_nums}")

        if all_passed:
            print("  All tests passed!")


def demonstrate_algorithm() -> None:
    """Visualize the algorithm step by step."""

    print("\n" + "=" * 70)
    print("ALGORITHM DEMONSTRATION")
    print("=" * 70)

    nums = [1, 5, 8, 4, 7, 6, 5, 3, 1]
    print(f"\nInput: {nums}")

    # Step 1: Find pivot
    pivot = -1
    for i in range(len(nums) - 2, -1, -1):
        if nums[i] < nums[i + 1]:
            pivot = i
            break
    print(f"\nStep 1: Find pivot")
    print(f"  Pivot found at index {pivot}, value = {nums[pivot]}")
    print(f"  Suffix {nums[pivot+1:]} is descending")

    # Step 2: Find successor
    successor = -1
    for j in range(len(nums) - 1, pivot, -1):
        if nums[j] > nums[pivot]:
            successor = j
            break
    print(f"\nStep 2: Find successor")
    print(f"  Successor found at index {successor}, value = {nums[successor]}")
    print(f"  (Smallest value in suffix greater than {nums[pivot]})")

    # Step 3: Swap
    nums[pivot], nums[successor] = nums[successor], nums[pivot]
    print(f"\nStep 3: Swap pivot and successor")
    print(f"  After swap: {nums}")

    # Step 4: Reverse suffix
    left, right = pivot + 1, len(nums) - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
    print(f"\nStep 4: Reverse suffix")
    print(f"  Final result: {nums}")


def show_all_permutations() -> None:
    """Show all permutations generated in order."""

    print("\n" + "=" * 70)
    print("ALL PERMUTATIONS IN LEXICOGRAPHIC ORDER")
    print("=" * 70)

    nums = [1, 2, 3]
    print(f"\nInput: {nums}")
    print("\nAll permutations:")
    all_perms = generate_all_permutations_in_order(nums)
    for i, perm in enumerate(all_perms, 1):
        print(f"  {i}. {perm}")


if __name__ == "__main__":
    run_tests()
    demonstrate_algorithm()
    show_all_permutations()

    print("\n" + "=" * 70)
    print("SAMPLE OUTPUT")
    print("=" * 70)

    print("\nInput: nums = [1, 2, 3]")
    nums = [1, 2, 3]
    next_permutation(nums)
    print(f"Output: {nums}")

    print("\nInput: nums = [3, 2, 1]")
    nums = [3, 2, 1]
    next_permutation(nums)
    print(f"Output: {nums}")

    print("\nInput: nums = [1, 1, 5]")
    nums = [1, 1, 5]
    next_permutation(nums)
    print(f"Output: {nums}")
