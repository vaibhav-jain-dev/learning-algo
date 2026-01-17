"""
Four Number Sum - Python Solutions

Find all unique quadruplets that sum to a target value.
"""

from typing import List
from collections import defaultdict


# ============================================================================
# APPROACH 1: Two Pointers with Two Loops ⭐ RECOMMENDED
# ============================================================================

def four_number_sum(array: List[int], target_sum: int) -> List[List[int]]:
    """Find all quadruplets summing to target using two pointers."""
    array.sort()
    result = []
    n = len(array)

    for i in range(n - 3):
        # Skip duplicates
        if i > 0 and array[i] == array[i - 1]:
            continue

        for j in range(i + 1, n - 2):
            # Skip duplicates
            if j > i + 1 and array[j] == array[j - 1]:
                continue

            left, right = j + 1, n - 1
            target = target_sum - array[i] - array[j]

            while left < right:
                current_sum = array[left] + array[right]

                if current_sum == target:
                    result.append([array[i], array[j], array[left], array[right]])

                    # Skip duplicates
                    while left < right and array[left] == array[left + 1]:
                        left += 1
                    while left < right and array[right] == array[right - 1]:
                        right -= 1

                    left += 1
                    right -= 1
                elif current_sum < target:
                    left += 1
                else:
                    right -= 1

    return result


# ============================================================================
# APPROACH 2: HashMap for Pairs
# ============================================================================

def four_number_sum_hash(array: List[int], target_sum: int) -> List[List[int]]:
    """Use hashmap to store pair sums."""
    pair_sums = defaultdict(list)
    result = []
    seen = set()

    for i in range(1, len(array)):
        # Check for complements
        for j in range(i + 1, len(array)):
            current_sum = array[i] + array[j]
            complement = target_sum - current_sum

            for pair in pair_sums[complement]:
                quad = sorted([pair[0], pair[1], array[i], array[j]])
                key = tuple(quad)
                if key not in seen:
                    result.append(quad)
                    seen.add(key)

        # Add pairs ending at i
        for k in range(i):
            pair_sum = array[k] + array[i]
            pair_sums[pair_sum].append([array[k], array[i]])

    return result


# ============================================================================
# TEST CASES
# ============================================================================

if __name__ == "__main__":
    print("=" * 70)
    print("FOUR NUMBER SUM - TEST RESULTS")
    print("=" * 70)

    test_cases = [
        ([7, 6, 4, -1, 1, 2], 16, "Standard case"),
        ([1, 2, 3, 4, 5, 6, 7], 10, "Consecutive"),
        ([1, 0, -1, 0, -2, 2], 0, "With zeros"),
        ([2, 2, 2, 2, 2], 8, "All same"),
    ]

    for array, target, desc in test_cases:
        result = four_number_sum(array.copy(), target)
        print(f"\n{desc}:")
        print(f"  Input: array={array}, target={target}")
        print(f"  Output: {result}")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    array = [7, 6, 4, -1, 1, 2]
    target = 16
    print(f"\nInput: array = {array}, target = {target}")
    print(f"Output: {four_number_sum(array, target)}")
