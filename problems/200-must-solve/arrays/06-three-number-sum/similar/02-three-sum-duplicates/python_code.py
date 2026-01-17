"""
Three Sum with Duplicates - Python Solution

Find all unique triplets that sum to target in an array with duplicates.

Time Complexity: O(n^2)
Space Complexity: O(1) excluding output
"""

from typing import List


def three_sum_duplicates_brute(array: List[int], target: int) -> List[List[int]]:
    """
    Brute Force with Set for deduplication.

    Time: O(n^3), Space: O(k) for result set
    """
    n = len(array)
    result_set = set()

    for i in range(n - 2):
        for j in range(i + 1, n - 1):
            for k in range(j + 1, n):
                if array[i] + array[j] + array[k] == target:
                    # Sort triplet and add as tuple for set deduplication
                    triplet = tuple(sorted([array[i], array[j], array[k]]))
                    result_set.add(triplet)

    return [list(t) for t in result_set]


def three_sum_duplicates(array: List[int], target: int) -> List[List[int]]:
    """
    RECOMMENDED: Sort + Two Pointers with Skip Duplicates.

    Find all unique triplets that sum to target.

    Args:
        array: List of integers (may contain duplicates)
        target: Target sum to find

    Returns:
        List[List[int]]: All unique triplets summing to target

    Time: O(n^2), Space: O(1) excluding output
    """
    array.sort()
    n = len(array)
    triplets = []

    for i, first in enumerate(array[:-2]):
        # Skip duplicate first elements
        if i > 0 and first == array[i - 1]:
            continue

        left, right = i + 1, n - 1

        while left < right:
            current_sum = first + array[left] + array[right]

            if current_sum == target:
                triplets.append([first, array[left], array[right]])

                # Move pointers and skip duplicates
                left += 1
                right -= 1

                # Skip duplicate second elements
                while left < right and array[left] == array[left - 1]:
                    left += 1

                # Skip duplicate third elements
                while left < right and array[right] == array[right + 1]:
                    right -= 1

            elif current_sum < target:
                left += 1
            else:
                right -= 1

    return triplets


def three_sum_duplicates_hash(array: List[int], target: int) -> List[List[int]]:
    """
    Hash Set approach with tuple-based deduplication.

    Time: O(n^2), Space: O(n) for seen set + O(k) for results
    """
    array.sort()
    n = len(array)
    result_set = set()

    for i in range(n - 2):
        # Skip duplicate first elements
        if i > 0 and array[i] == array[i - 1]:
            continue

        seen = set()
        complement = target - array[i]

        for j in range(i + 1, n):
            needed = complement - array[j]
            if needed in seen:
                # Triplet is already sorted since array is sorted
                result_set.add((array[i], needed, array[j]))
            seen.add(array[j])

    return [list(t) for t in result_set]


def three_sum_duplicates_comprehensive(array: List[int], target: int) -> List[List[int]]:
    """
    Comprehensive solution with detailed skip logic.

    This version is more explicit about the skip conditions.
    """
    if len(array) < 3:
        return []

    array.sort()
    result = []
    n = len(array)

    for i in range(n - 2):
        # Optimization: if smallest possible sum > target, no solution
        if array[i] + array[i + 1] + array[i + 2] > target:
            break

        # Optimization: if largest possible sum with current i < target, skip
        if array[i] + array[n - 2] + array[n - 1] < target:
            continue

        # Skip duplicate first elements
        if i > 0 and array[i] == array[i - 1]:
            continue

        left, right = i + 1, n - 1

        while left < right:
            total = array[i] + array[left] + array[right]

            if total == target:
                result.append([array[i], array[left], array[right]])

                # Skip all duplicates from left
                val_left = array[left]
                while left < right and array[left] == val_left:
                    left += 1

                # Skip all duplicates from right
                val_right = array[right]
                while left < right and array[right] == val_right:
                    right -= 1

            elif total < target:
                left += 1
            else:
                right -= 1

    return result


def three_sum_zero(array: List[int]) -> List[List[int]]:
    """
    Classic LeetCode 3Sum: Find triplets summing to 0.

    This is a common interview variant.
    """
    return three_sum_duplicates(array, 0)


# Test cases
if __name__ == "__main__":
    # Test 1: Basic case with duplicates
    array1 = [1, 1, 1, 2, 2, 3]
    target1 = 6
    result1 = three_sum_duplicates(array1, target1)
    print(f"Test 1: array={array1}, target={target1}")
    print(f"  Result: {result1}")
    print(f"  Expected: [[1, 2, 3]]")

    # Test 2: Classic 3Sum example
    array2 = [-1, 0, 1, 2, -1, -4]
    target2 = 0
    result2 = three_sum_duplicates(array2, target2)
    print(f"\nTest 2: array={array2}, target={target2}")
    print(f"  Result: {result2}")
    print(f"  Expected: [[-1, -1, 2], [-1, 0, 1]]")

    # Test 3: All zeros
    array3 = [0, 0, 0, 0]
    target3 = 0
    result3 = three_sum_duplicates(array3, target3)
    print(f"\nTest 3: array={array3}, target={target3}")
    print(f"  Result: {result3}")
    print(f"  Expected: [[0, 0, 0]]")

    # Test 4: No valid triplets
    array4 = [1, 2, -2, -1]
    target4 = 0
    result4 = three_sum_duplicates(array4, target4)
    print(f"\nTest 4: array={array4}, target={target4}")
    print(f"  Result: {result4}")
    print(f"  Expected: []")

    # Test 5: Multiple duplicates
    array5 = [-2, 0, 0, 2, 2]
    target5 = 0
    result5 = three_sum_duplicates(array5, target5)
    print(f"\nTest 5: array={array5}, target={target5}")
    print(f"  Result: {result5}")
    print(f"  Expected: [[-2, 0, 2]]")

    # Test 6: Larger array with many duplicates
    array6 = [-4, -1, -1, 0, 1, 2, 2, 2]
    target6 = 1
    result6 = three_sum_duplicates(array6, target6)
    print(f"\nTest 6: array={array6}, target={target6}")
    print(f"  Result: {result6}")
    print(f"  Expected: [[-1, 0, 2]]")

    # Test 7: Compare all approaches
    array7 = [-2, -1, -1, 0, 1, 1, 2, 2]
    target7 = 0
    result7_brute = sorted([sorted(t) for t in three_sum_duplicates_brute(array7, target7)])
    result7_two_ptr = three_sum_duplicates(array7, target7)
    result7_hash = sorted([sorted(t) for t in three_sum_duplicates_hash(array7, target7)])
    result7_comp = three_sum_duplicates_comprehensive(array7, target7)
    print(f"\nTest 7 (compare approaches): array={array7}, target={target7}")
    print(f"  Brute force:   {result7_brute}")
    print(f"  Two-pointer:   {result7_two_ptr}")
    print(f"  Hash method:   {result7_hash}")
    print(f"  Comprehensive: {result7_comp}")

    # Test 8: Empty and small arrays
    print(f"\nTest 8: Edge cases")
    print(f"  Empty array: {three_sum_duplicates([], 0)}")
    print(f"  Single element: {three_sum_duplicates([1], 1)}")
    print(f"  Two elements: {three_sum_duplicates([1, 2], 3)}")
    print(f"  Three elements match: {three_sum_duplicates([1, 2, 3], 6)}")
    print(f"  Three elements no match: {three_sum_duplicates([1, 2, 3], 10)}")

    # Test 9: All same elements
    array9 = [3, 3, 3, 3, 3]
    target9 = 9
    result9 = three_sum_duplicates(array9, target9)
    print(f"\nTest 9: array={array9}, target={target9}")
    print(f"  Result: {result9}")
    print(f"  Expected: [[3, 3, 3]]")

    print("\nAll tests completed!")
