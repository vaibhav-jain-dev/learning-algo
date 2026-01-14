"""
Contains Duplicate

This solution uses a hash set to detect duplicates in O(n) time.
"""

from typing import List


def contains_duplicate(nums: List[int]) -> bool:
    """
    Check if any value appears at least twice in the array.

    Args:
        nums: List of integers

    Returns:
        True if duplicates exist, False otherwise
    """
    seen = set()

    for num in nums:
        if num in seen:
            return True
        seen.add(num)

    return False


def contains_duplicate_set_size(nums: List[int]) -> bool:
    """
    Concise solution comparing set size to list length.
    """
    return len(set(nums)) != len(nums)


def contains_duplicate_sorting(nums: List[int]) -> bool:
    """
    Sorting approach - O(n log n) time, O(1) space (if in-place sort).
    """
    nums_sorted = sorted(nums)
    for i in range(1, len(nums_sorted)):
        if nums_sorted[i] == nums_sorted[i - 1]:
            return True
    return False


def contains_duplicate_brute_force(nums: List[int]) -> bool:
    """
    Brute force approach - O(n^2) time, O(1) space.
    """
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] == nums[j]:
                return True
    return False


def run_tests():
    """Run test cases to verify the solution."""
    test_cases = [
        # (nums, expected)
        ([1, 2, 3, 1], True),
        ([1, 2, 3, 4], False),
        ([1, 1, 1, 3, 3, 4, 3, 2, 4, 2], True),
        ([1], False),                          # Single element
        ([1, 1], True),                        # Two same elements
        ([1, 2], False),                       # Two different elements
        ([], False),                           # Empty array
        (list(range(10000)), False),           # Large array, no duplicates
        (list(range(9999)) + [0], True),       # Large array with one duplicate
        ([-1, -2, -3, -1], True),              # Negative numbers
        ([0, 0, 0, 0], True),                  # All same
    ]

    print("=" * 60)
    print("CONTAINS DUPLICATE - Test Results")
    print("=" * 60)

    all_passed = True
    for i, (nums, expected) in enumerate(test_cases, 1):
        result = contains_duplicate(nums)
        passed = result == expected
        status = "PASS" if passed else "FAIL"

        if not passed:
            all_passed = False

        display_nums = str(nums) if len(nums) <= 10 else f"{nums[:5]}...({len(nums)} elements)"
        print(f"\nTest {i}: {status}")
        print(f"  Input: nums = {display_nums}")
        print(f"  Output: {result}")
        print(f"  Expected: {expected}")

    print("\n" + "=" * 60)
    print(f"Overall: {'ALL TESTS PASSED' if all_passed else 'SOME TESTS FAILED'}")
    print("=" * 60)


def demonstrate_approach():
    """Demonstrate how the algorithm works step by step."""
    examples = [
        [1, 2, 3, 1],  # Has duplicate
        [1, 2, 3, 4],  # No duplicate
    ]

    print("\n" + "=" * 60)
    print("STEP-BY-STEP DEMONSTRATION")
    print("=" * 60)

    for nums in examples:
        print(f"\nChecking: nums = {nums}")
        print("-" * 40)

        seen = set()
        found_duplicate = False

        for i, num in enumerate(nums):
            print(f"Step {i + 1}: Processing nums[{i}] = {num}")
            print(f"  Current set: {seen}")

            if num in seen:
                print(f"  {num} is in the set -> DUPLICATE FOUND!")
                found_duplicate = True
                break
            else:
                seen.add(num)
                print(f"  {num} not in set, adding it")

        if not found_duplicate:
            print(f"\nProcessed all elements. Final set: {seen}")
            print("No duplicates found.")

        print(f"\nResult: {found_duplicate}")


def compare_approaches():
    """Compare performance of different approaches."""
    import time

    # Test with a medium-sized array
    test_array = list(range(10000)) + [5000]  # Duplicate in the middle

    approaches = [
        ("Hash Set", contains_duplicate),
        ("Set Size", contains_duplicate_set_size),
        ("Sorting", contains_duplicate_sorting),
    ]

    print("\n" + "=" * 60)
    print("PERFORMANCE COMPARISON")
    print("=" * 60)
    print(f"Array size: {len(test_array)}")

    for name, func in approaches:
        start = time.perf_counter()
        result = func(test_array.copy())
        end = time.perf_counter()
        print(f"{name}: {(end - start) * 1000:.3f}ms, Result: {result}")


if __name__ == "__main__":
    run_tests()
    demonstrate_approach()
    compare_approaches()
