"""
Intersection of Two Arrays

This solution uses hash sets to find common elements efficiently.
"""

from typing import List


def intersection(nums1: List[int], nums2: List[int]) -> List[int]:
    """
    Find intersection of two arrays (unique elements).

    Args:
        nums1: First integer array
        nums2: Second integer array

    Returns:
        List of unique elements present in both arrays
    """
    # Convert to sets
    set1 = set(nums1)
    set2 = set(nums2)

    # Find intersection by iterating smaller set
    if len(set1) <= len(set2):
        return [x for x in set1 if x in set2]
    else:
        return [x for x in set2 if x in set1]


def intersection_builtin(nums1: List[int], nums2: List[int]) -> List[int]:
    """
    Using Python's built-in set intersection.
    """
    return list(set(nums1) & set(nums2))


def intersection_two_sets(nums1: List[int], nums2: List[int]) -> List[int]:
    """
    Two sets approach - clearer logic.
    """
    set1 = set(nums1)
    result = set()

    for num in nums2:
        if num in set1:
            result.add(num)

    return list(result)


def intersection_sorted(nums1: List[int], nums2: List[int]) -> List[int]:
    """
    Two pointers approach for sorted arrays.
    Time: O(n log n + m log m) due to sorting
    Space: O(1) excluding output
    """
    nums1 = sorted(nums1)
    nums2 = sorted(nums2)

    result = []
    i, j = 0, 0

    while i < len(nums1) and j < len(nums2):
        if nums1[i] == nums2[j]:
            # Avoid duplicates in result
            if not result or result[-1] != nums1[i]:
                result.append(nums1[i])
            i += 1
            j += 1
        elif nums1[i] < nums2[j]:
            i += 1
        else:
            j += 1

    return result


def run_tests():
    """Run test cases to verify the solution."""
    test_cases = [
        # (nums1, nums2, expected)
        ([1, 2, 2, 1], [2, 2], [2]),
        ([4, 9, 5], [9, 4, 9, 8, 4], [4, 9]),
        ([1, 2, 3], [4, 5, 6], []),
        ([1], [1], [1]),
        ([1, 2], [1, 2], [1, 2]),
        ([], [1, 2, 3], []),
        ([1, 2, 3], [], []),
        ([1, 1, 1], [1, 1, 1], [1]),
        ([1, 2, 3, 4, 5], [3, 4, 5, 6, 7], [3, 4, 5]),
    ]

    print("=" * 60)
    print("INTERSECTION OF TWO ARRAYS - Test Results")
    print("=" * 60)

    all_passed = True
    for i, (nums1, nums2, expected) in enumerate(test_cases, 1):
        result = intersection(nums1, nums2)
        # Sort both for comparison (order doesn't matter)
        passed = sorted(result) == sorted(expected)
        status = "PASS" if passed else "FAIL"

        if not passed:
            all_passed = False

        print(f"\nTest {i}: {status}")
        print(f"  nums1 = {nums1}")
        print(f"  nums2 = {nums2}")
        print(f"  Output: {result}")
        print(f"  Expected: {expected}")

    print("\n" + "=" * 60)
    print(f"Overall: {'ALL TESTS PASSED' if all_passed else 'SOME TESTS FAILED'}")
    print("=" * 60)


def demonstrate_approach():
    """Demonstrate how the algorithm works step by step."""
    nums1 = [4, 9, 5]
    nums2 = [9, 4, 9, 8, 4]

    print("\n" + "=" * 60)
    print("STEP-BY-STEP DEMONSTRATION")
    print("=" * 60)
    print(f"nums1 = {nums1}")
    print(f"nums2 = {nums2}")

    # Step 1: Convert to sets
    print("\n--- Step 1: Convert to Sets ---")
    set1 = set(nums1)
    set2 = set(nums2)
    print(f"set1 = {set1}")
    print(f"set2 = {set2}")

    # Step 2: Find intersection
    print("\n--- Step 2: Find Intersection ---")
    print(f"Iterating through smaller set: set1 (size {len(set1)})")

    result = []
    for num in set1:
        in_set2 = num in set2
        print(f"  Checking {num}: in set2? {in_set2}")
        if in_set2:
            result.append(num)

    print(f"\nResult: {result}")


def demonstrate_sorted_approach():
    """Demonstrate the two-pointer approach for sorted arrays."""
    nums1 = [1, 2, 2, 3, 4]
    nums2 = [2, 2, 3, 5]

    print("\n" + "=" * 60)
    print("TWO POINTERS DEMONSTRATION (Sorted Arrays)")
    print("=" * 60)
    print(f"nums1 (sorted) = {nums1}")
    print(f"nums2 (sorted) = {nums2}")
    print()

    result = []
    i, j = 0, 0

    while i < len(nums1) and j < len(nums2):
        print(f"i={i} (nums1[i]={nums1[i]}), j={j} (nums2[j]={nums2[j]})", end="")

        if nums1[i] == nums2[j]:
            if not result or result[-1] != nums1[i]:
                result.append(nums1[i])
                print(f" -> EQUAL, add {nums1[i]} to result")
            else:
                print(f" -> EQUAL but {nums1[i]} already in result, skip")
            i += 1
            j += 1
        elif nums1[i] < nums2[j]:
            print(f" -> nums1[i] < nums2[j], i++")
            i += 1
        else:
            print(f" -> nums1[i] > nums2[j], j++")
            j += 1

    print(f"\nFinal result: {result}")


if __name__ == "__main__":
    run_tests()
    demonstrate_approach()
    demonstrate_sorted_approach()
