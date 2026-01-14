"""
Subarray Sum Equals K

Given an array of integers nums and an integer k, return the total number
of subarrays whose sum equals to k.

Time Complexity: O(n)
Space Complexity: O(n)
"""

from typing import List
from collections import defaultdict


def subarray_sum(nums: List[int], k: int) -> int:
    """
    Count subarrays with sum equal to k using prefix sum and hash map.

    Args:
        nums: List of integers
        k: Target sum

    Returns:
        Number of subarrays with sum equal to k
    """
    count = 0
    prefix_sum = 0
    # Map to store frequency of prefix sums
    # Initialize with {0: 1} to handle subarrays starting from index 0
    prefix_count = defaultdict(int)
    prefix_count[0] = 1

    for num in nums:
        prefix_sum += num

        # If (prefix_sum - k) exists in map, we found subarrays ending here
        # that sum to k
        if prefix_sum - k in prefix_count:
            count += prefix_count[prefix_sum - k]

        # Add current prefix_sum to the map
        prefix_count[prefix_sum] += 1

    return count


def subarray_sum_brute_force(nums: List[int], k: int) -> int:
    """
    Brute force approach - O(n^2) time complexity.
    Included for comparison and understanding.
    """
    count = 0
    n = len(nums)

    for i in range(n):
        current_sum = 0
        for j in range(i, n):
            current_sum += nums[j]
            if current_sum == k:
                count += 1

    return count


def run_tests():
    """Run test cases for subarray sum equals k."""
    test_cases = [
        # (nums, k, expected)
        ([1, 1, 1], 2, 2),
        ([1, 2, 3], 3, 2),
        ([1, -1, 0], 0, 3),
        ([3, 4, 7, 2, -3, 1, 4, 2], 7, 4),
        ([1], 1, 1),
        ([1], 0, 0),
        ([-1, -1, 1], 0, 1),
        ([0, 0, 0, 0, 0], 0, 15),  # All subarrays sum to 0
        ([1, 2, 1, 2, 1], 3, 4),
        ([100, -100, 100, -100], 0, 4),
    ]

    print("=" * 60)
    print("SUBARRAY SUM EQUALS K - TEST RESULTS")
    print("=" * 60)

    all_passed = True
    for i, (nums, k, expected) in enumerate(test_cases, 1):
        result = subarray_sum(nums, k)
        brute_result = subarray_sum_brute_force(nums, k)
        status = "PASS" if result == expected else "FAIL"

        if result != expected:
            all_passed = False

        print(f"\nTest {i}: {status}")
        print(f"  Input: nums = {nums}, k = {k}")
        print(f"  Expected: {expected}")
        print(f"  Got (optimal): {result}")
        print(f"  Got (brute force): {brute_result}")

        # Verify brute force matches optimal
        if result != brute_result:
            print(f"  WARNING: Brute force and optimal solutions differ!")

    print("\n" + "=" * 60)
    if all_passed:
        print("ALL TESTS PASSED!")
    else:
        print("SOME TESTS FAILED!")
    print("=" * 60)

    return all_passed


def demonstrate_algorithm():
    """Step-by-step demonstration of the algorithm."""
    nums = [1, 2, 3]
    k = 3

    print("\n" + "=" * 60)
    print("ALGORITHM DEMONSTRATION")
    print("=" * 60)
    print(f"Input: nums = {nums}, k = {k}")
    print("\nStep-by-step execution:")
    print("-" * 40)

    prefix_sum = 0
    prefix_count = defaultdict(int)
    prefix_count[0] = 1
    count = 0

    print(f"Initial state: prefix_count = {{0: 1}}, count = 0")

    for i, num in enumerate(nums):
        prefix_sum += num
        found = prefix_count.get(prefix_sum - k, 0)

        print(f"\nIndex {i}, value = {num}:")
        print(f"  prefix_sum = {prefix_sum}")
        print(f"  Looking for prefix_sum - k = {prefix_sum} - {k} = {prefix_sum - k}")
        print(f"  Found {found} times in prefix_count")

        if found > 0:
            count += found
            print(f"  -> Adding {found} to count, count = {count}")

        prefix_count[prefix_sum] += 1
        print(f"  Updated prefix_count = {dict(prefix_count)}")

    print(f"\nFinal count: {count}")


if __name__ == "__main__":
    run_tests()
    demonstrate_algorithm()
