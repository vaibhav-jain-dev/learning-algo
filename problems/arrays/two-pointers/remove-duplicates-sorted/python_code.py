"""
Remove Duplicates from Sorted Array

Problem: Given a sorted array, remove duplicates in-place and return the new length.
Technique: Two-pointer (slow-fast pointer) approach.

Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import List


def remove_duplicates(nums: List[int]) -> int:
    """
    Remove duplicates from sorted array in-place.

    Args:
        nums: A sorted list of integers (modified in-place)

    Returns:
        The number of unique elements
    """
    # Edge case: empty array
    if not nums:
        return 0

    # Slow pointer - tracks position of last unique element
    slow = 0

    # Fast pointer - scans through the array
    for fast in range(1, len(nums)):
        # Found a new unique element
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]

    # Return count of unique elements (slow is index, so add 1)
    return slow + 1


def remove_duplicates_verbose(nums: List[int]) -> int:
    """
    Same algorithm with detailed print statements for learning.
    """
    if not nums:
        print("Empty array, returning 0")
        return 0

    print(f"Initial array: {nums}")
    print(f"Length: {len(nums)}")
    print("-" * 50)

    slow = 0

    for fast in range(1, len(nums)):
        print(f"fast={fast}, slow={slow}")
        print(f"Comparing nums[{fast}]={nums[fast]} with nums[{slow}]={nums[slow]}")

        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
            print(f"  -> Found unique! Moved to position {slow}")
            print(f"  -> Array now: {nums}")
        else:
            print(f"  -> Duplicate, skipping")
        print()

    print("-" * 50)
    print(f"Final array: {nums}")
    print(f"Unique elements (first {slow + 1}): {nums[:slow + 1]}")

    return slow + 1


# ============== Test Cases ==============

def run_tests():
    """Run comprehensive test cases."""

    print("=" * 60)
    print("REMOVE DUPLICATES FROM SORTED ARRAY - TEST CASES")
    print("=" * 60)

    test_cases = [
        # (input, expected_length, expected_prefix)
        ([1, 1, 2], 2, [1, 2]),
        ([0, 0, 1, 1, 1, 2, 2, 3, 3, 4], 5, [0, 1, 2, 3, 4]),
        ([1, 2, 3], 3, [1, 2, 3]),
        ([], 0, []),
        ([1], 1, [1]),
        ([1, 1, 1, 1, 1], 1, [1]),
        ([-3, -1, -1, 0, 0, 0, 1, 2, 2], 5, [-3, -1, 0, 1, 2]),
        ([1, 2], 2, [1, 2]),
    ]

    all_passed = True

    for i, (input_arr, expected_len, expected_prefix) in enumerate(test_cases, 1):
        # Make a copy since we modify in-place
        nums = input_arr.copy()
        original = input_arr.copy()

        result_len = remove_duplicates(nums)
        result_prefix = nums[:result_len]

        passed = (result_len == expected_len) and (result_prefix == expected_prefix)
        status = "PASS" if passed else "FAIL"

        print(f"\nTest {i}: {status}")
        print(f"  Input:    {original}")
        print(f"  Expected: length={expected_len}, prefix={expected_prefix}")
        print(f"  Got:      length={result_len}, prefix={result_prefix}")

        if not passed:
            all_passed = False

    print("\n" + "=" * 60)
    if all_passed:
        print("ALL TESTS PASSED!")
    else:
        print("SOME TESTS FAILED!")
    print("=" * 60)

    return all_passed


def demonstrate_verbose():
    """Demonstrate the algorithm step by step."""
    print("\n" + "=" * 60)
    print("STEP-BY-STEP DEMONSTRATION")
    print("=" * 60 + "\n")

    nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
    result = remove_duplicates_verbose(nums)
    print(f"\nReturned length: {result}")


if __name__ == "__main__":
    # Run test cases
    run_tests()

    # Show verbose demonstration
    demonstrate_verbose()
