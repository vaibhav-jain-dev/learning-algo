"""
Range Sum Query - Immutable

Given an integer array nums, handle multiple queries to calculate the sum
of elements between indices left and right (inclusive).

Time Complexity:
  - Initialization: O(n)
  - Each query: O(1)
Space Complexity: O(n)
"""

from typing import List


class NumArray:
    """
    Range sum query class using prefix sums for O(1) queries.
    """

    def __init__(self, nums: List[int]):
        """
        Initialize the NumArray with the given array.

        Args:
            nums: List of integers
        """
        n = len(nums)
        # prefix[i] = sum of nums[0] to nums[i-1]
        # prefix[0] = 0 (sum of no elements)
        self.prefix = [0] * (n + 1)

        for i in range(n):
            self.prefix[i + 1] = self.prefix[i] + nums[i]

    def sumRange(self, left: int, right: int) -> int:
        """
        Return the sum of elements from index left to right (inclusive).

        Args:
            left: Starting index (inclusive)
            right: Ending index (inclusive)

        Returns:
            Sum of nums[left] + nums[left+1] + ... + nums[right]
        """
        return self.prefix[right + 1] - self.prefix[left]


class NumArrayNaive:
    """
    Naive implementation that computes sum for each query.
    O(n) per query - included for comparison.
    """

    def __init__(self, nums: List[int]):
        self.nums = nums

    def sumRange(self, left: int, right: int) -> int:
        return sum(self.nums[left:right + 1])


def run_tests():
    """Run test cases for range sum query."""

    print("=" * 60)
    print("RANGE SUM QUERY - TEST RESULTS")
    print("=" * 60)

    all_passed = True

    # Test Case 1
    print("\nTest Case 1:")
    nums1 = [-2, 0, 3, -5, 2, -1]
    print(f"  nums = {nums1}")

    num_array = NumArray(nums1)
    num_array_naive = NumArrayNaive(nums1)

    queries1 = [(0, 2, 1), (2, 5, -1), (0, 5, -3)]

    for left, right, expected in queries1:
        result = num_array.sumRange(left, right)
        naive_result = num_array_naive.sumRange(left, right)
        status = "PASS" if result == expected else "FAIL"

        if result != expected:
            all_passed = False

        print(f"  sumRange({left}, {right}): {status}")
        print(f"    Expected: {expected}, Got: {result}, Naive: {naive_result}")

    # Test Case 2
    print("\nTest Case 2:")
    nums2 = [1, 2, 3, 4, 5]
    print(f"  nums = {nums2}")

    num_array = NumArray(nums2)
    num_array_naive = NumArrayNaive(nums2)

    queries2 = [(0, 4, 15), (1, 3, 9), (2, 2, 3)]

    for left, right, expected in queries2:
        result = num_array.sumRange(left, right)
        naive_result = num_array_naive.sumRange(left, right)
        status = "PASS" if result == expected else "FAIL"

        if result != expected:
            all_passed = False

        print(f"  sumRange({left}, {right}): {status}")
        print(f"    Expected: {expected}, Got: {result}, Naive: {naive_result}")

    # Test Case 3 - Single element
    print("\nTest Case 3 (Single element queries):")
    nums3 = [10, -5, 3, 8, -2, 7]
    print(f"  nums = {nums3}")

    num_array = NumArray(nums3)
    num_array_naive = NumArrayNaive(nums3)

    queries3 = [(0, 0, 10), (5, 5, 7), (0, 5, 21), (1, 4, 4)]

    for left, right, expected in queries3:
        result = num_array.sumRange(left, right)
        naive_result = num_array_naive.sumRange(left, right)
        status = "PASS" if result == expected else "FAIL"

        if result != expected:
            all_passed = False

        print(f"  sumRange({left}, {right}): {status}")
        print(f"    Expected: {expected}, Got: {result}, Naive: {naive_result}")

    # Test Case 4 - All same elements
    print("\nTest Case 4 (All same elements):")
    nums4 = [5, 5, 5, 5, 5]
    print(f"  nums = {nums4}")

    num_array = NumArray(nums4)

    queries4 = [(0, 0, 5), (0, 4, 25), (2, 3, 10)]

    for left, right, expected in queries4:
        result = num_array.sumRange(left, right)
        status = "PASS" if result == expected else "FAIL"

        if result != expected:
            all_passed = False

        print(f"  sumRange({left}, {right}): {status}")
        print(f"    Expected: {expected}, Got: {result}")

    print("\n" + "=" * 60)
    if all_passed:
        print("ALL TESTS PASSED!")
    else:
        print("SOME TESTS FAILED!")
    print("=" * 60)

    return all_passed


def demonstrate_algorithm():
    """Step-by-step demonstration of the algorithm."""
    nums = [-2, 0, 3, -5, 2, -1]

    print("\n" + "=" * 60)
    print("ALGORITHM DEMONSTRATION")
    print("=" * 60)
    print(f"Input: nums = {nums}")

    print("\n" + "-" * 40)
    print("Building Prefix Sum Array")
    print("-" * 40)

    n = len(nums)
    prefix = [0] * (n + 1)

    print(f"\nInitial prefix array: {prefix}")
    print("\nBuilding prefix sums:")

    for i in range(n):
        prefix[i + 1] = prefix[i] + nums[i]
        print(f"  prefix[{i + 1}] = prefix[{i}] + nums[{i}]")
        print(f"         = {prefix[i]} + ({nums[i]}) = {prefix[i + 1]}")

    print(f"\nFinal prefix array: {prefix}")

    print("\n" + "-" * 40)
    print("Answering Queries")
    print("-" * 40)

    queries = [(0, 2), (2, 5), (0, 5)]

    for left, right in queries:
        result = prefix[right + 1] - prefix[left]
        print(f"\nsumRange({left}, {right}):")
        print(f"  = prefix[{right + 1}] - prefix[{left}]")
        print(f"  = {prefix[right + 1]} - {prefix[left]}")
        print(f"  = {result}")

        # Verify with actual sum
        actual = sum(nums[left:right + 1])
        elements = nums[left:right + 1]
        print(f"  Verify: {' + '.join(map(str, elements))} = {actual}")


if __name__ == "__main__":
    run_tests()
    demonstrate_algorithm()
