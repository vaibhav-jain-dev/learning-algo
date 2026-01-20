"""
Three Sum Closest - Python Solution

Find three numbers whose sum is closest to the target.

Time Complexity: O(n^2)
Space Complexity: O(1) excluding sorting
"""

from typing import List


def three_sum_closest_brute(array: List[int], target: int) -> int:
    """
    Brute Force: Check all possible triplets.

    Time: O(n^3), Space: O(1)
    """
    n = len(array)
    closest_sum = float('inf')

    for i in range(n - 2):
        for j in range(i + 1, n - 1):
            for k in range(j + 1, n):
                current_sum = array[i] + array[j] + array[k]
                if abs(current_sum - target) < abs(closest_sum - target):
                    closest_sum = current_sum

    return closest_sum


def three_sum_closest(array: List[int], target: int) -> int:
    """
    RECOMMENDED: Sort + Two Pointers approach.

    Find three numbers whose sum is closest to target.

    Args:
        array: List of integers (length >= 3)
        target: Target sum to get close to

    Returns:
        int: Sum of three numbers closest to target

    Time: O(n^2), Space: O(1)
    """
    # Sort to enable two-pointer technique
    array = sorted(array)
    n = len(array)
    closest_sum = array[0] + array[1] + array[2]  # Initialize with first triplet

    for i, first in enumerate(array[:-2]):
        # Two pointers for remaining elements
        left, right = i + 1, n - 1

        while left < right:
            current_sum = first + array[left] + array[right]

            # Update closest if this sum is better
            if abs(current_sum - target) < abs(closest_sum - target):
                closest_sum = current_sum

            # Early termination: exact match found
            if current_sum == target:
                return current_sum

            # Move pointers based on comparison
            if current_sum < target:
                left += 1  # Need larger sum
            else:
                right -= 1  # Need smaller sum

    return closest_sum


def three_sum_closest_optimized(array: List[int], target: int) -> int:
    """
    Optimized version with early termination and duplicate skipping.

    Time: O(n^2), Space: O(1)
    """
    array = sorted(array)
    n = len(array)
    closest_sum = array[0] + array[1] + array[2]

    for i in range(n - 2):
        # Skip duplicates for outer loop (optional optimization)
        if i > 0 and array[i] == array[i - 1]:
            continue

        left, right = i + 1, n - 1

        while left < right:
            current_sum = array[i] + array[left] + array[right]

            # Exact match - can't get closer
            if current_sum == target:
                return target

            # Update closest
            if abs(current_sum - target) < abs(closest_sum - target):
                closest_sum = current_sum

            if current_sum < target:
                left += 1
            else:
                right -= 1

    return closest_sum


def three_sum_closest_with_details(array: List[int], target: int) -> tuple:
    """
    Returns both the closest sum and the triplet that produces it.

    Useful for debugging and understanding the solution.
    """
    array_sorted = sorted(array)
    n = len(array_sorted)

    closest_sum = array_sorted[0] + array_sorted[1] + array_sorted[2]
    closest_triplet = (array_sorted[0], array_sorted[1], array_sorted[2])

    for i, first in enumerate(array_sorted[:-2]):
        left, right = i + 1, n - 1

        while left < right:
            current_sum = first + array_sorted[left] + array_sorted[right]

            if abs(current_sum - target) < abs(closest_sum - target):
                closest_sum = current_sum
                closest_triplet = (first, array_sorted[left], array_sorted[right])

            if current_sum == target:
                return current_sum, closest_triplet
            elif current_sum < target:
                left += 1
            else:
                right -= 1

    return closest_sum, closest_triplet


# Test cases
if __name__ == "__main__":
    # Test 1: Basic case
    array1 = [-1, 2, 1, -4]
    target1 = 1
    result1 = three_sum_closest(array1, target1)
    print(f"Test 1: array={array1}, target={target1}")
    print(f"  Result: {result1}")
    print(f"  Expected: 2 (sum of -1 + 2 + 1)")
    assert result1 == 2

    # Test 2: All zeros
    array2 = [0, 0, 0]
    target2 = 1
    result2 = three_sum_closest(array2, target2)
    print(f"\nTest 2: array={array2}, target={target2}")
    print(f"  Result: {result2}")
    print(f"  Expected: 0")
    assert result2 == 0

    # Test 3: Exact match exists
    array3 = [1, 2, 3, 4, 5]
    target3 = 9
    result3 = three_sum_closest(array3, target3)
    print(f"\nTest 3: array={array3}, target={target3}")
    print(f"  Result: {result3}")
    print(f"  Expected: 9 (sum of 1 + 3 + 5 or 2 + 3 + 4)")
    assert result3 == 9

    # Test 4: Negative target
    array4 = [1, 1, 1, 0]
    target4 = -100
    result4 = three_sum_closest(array4, target4)
    print(f"\nTest 4: array={array4}, target={target4}")
    print(f"  Result: {result4}")
    print(f"  Expected: 2 (closest possible)")
    assert result4 == 2

    # Test 5: Mixed positive and negative
    array5 = [4, 0, 5, -5, 3, 3, 0, -4, -5]
    target5 = -2
    result5 = three_sum_closest(array5, target5)
    print(f"\nTest 5: array={array5}, target={target5}")
    print(f"  Result: {result5}")
    print(f"  Expected: -2 (exact match)")
    assert result5 == -2

    # Test 6: With details
    array6 = [-1, 2, 1, -4]
    target6 = 1
    sum6, triplet6 = three_sum_closest_with_details(array6, target6)
    print(f"\nTest 6 (with details): array={array6}, target={target6}")
    print(f"  Closest sum: {sum6}, Triplet: {triplet6}")

    # Test 7: Compare all approaches
    array7 = [1, 2, 4, 8, 16, 32, 64, 128]
    target7 = 82
    result7_brute = three_sum_closest_brute(array7, target7)
    result7_two_ptr = three_sum_closest(array7, target7)
    result7_opt = three_sum_closest_optimized(array7, target7)
    print(f"\nTest 7 (compare approaches): array={array7}, target={target7}")
    print(f"  Brute force: {result7_brute}")
    print(f"  Two-pointer: {result7_two_ptr}")
    print(f"  Optimized:   {result7_opt}")
    assert result7_brute == result7_two_ptr == result7_opt

    print("\nAll tests passed!")
