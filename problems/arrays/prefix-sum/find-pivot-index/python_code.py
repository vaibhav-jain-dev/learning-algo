"""
Find Pivot Index

Given an array of integers nums, calculate the pivot index of this array.
The pivot index is the index where the sum of all the numbers strictly
to the left equals the sum of all the numbers strictly to the right.

Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import List


def pivot_index(nums: List[int]) -> int:
    """
    Find the leftmost pivot index where left sum equals right sum.

    Args:
        nums: List of integers

    Returns:
        The leftmost pivot index, or -1 if no pivot exists
    """
    total_sum = sum(nums)
    left_sum = 0

    for i, num in enumerate(nums):
        # Check if current index is the pivot
        # left_sum == right_sum
        # left_sum == total_sum - left_sum - nums[i]
        # 2 * left_sum + nums[i] == total_sum
        if 2 * left_sum + num == total_sum:
            return i

        left_sum += num

    return -1


def pivot_index_with_prefix_array(nums: List[int]) -> int:
    """
    Alternative solution using prefix sum array.
    Uses O(n) extra space but is more intuitive.
    """
    n = len(nums)
    prefix = [0] * (n + 1)

    # Build prefix sum array
    for i in range(n):
        prefix[i + 1] = prefix[i] + nums[i]

    total = prefix[n]

    for i in range(n):
        left_sum = prefix[i]
        right_sum = total - prefix[i + 1]

        if left_sum == right_sum:
            return i

    return -1


def pivot_index_brute_force(nums: List[int]) -> int:
    """
    Brute force approach - O(n^2) time complexity.
    Included for verification.
    """
    n = len(nums)

    for i in range(n):
        left_sum = sum(nums[:i])
        right_sum = sum(nums[i + 1:])

        if left_sum == right_sum:
            return i

    return -1


def run_tests():
    """Run test cases for find pivot index."""
    test_cases = [
        # (nums, expected)
        ([1, 7, 3, 6, 5, 6], 3),
        ([1, 2, 3], -1),
        ([2, 1, -1], 0),
        ([-1, -1, -1, -1, -1, 0], 2),
        ([1], 0),  # Single element: left = 0, right = 0
        ([1, 0], 0),  # left = 0, right = 0
        ([0, 1], 1),  # left = 0, right = 0
        ([1, -1, 2], 2),  # left = 0, right = 0 at index 2
        ([-1, -1, 0, 1, 1, 0], 0),
        ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], -1),
        ([10, 5, 5], 0),
        ([5, 10, 5], 1),
        ([5, 5, 10], 2),
    ]

    print("=" * 60)
    print("FIND PIVOT INDEX - TEST RESULTS")
    print("=" * 60)

    all_passed = True
    for i, (nums, expected) in enumerate(test_cases, 1):
        result = pivot_index(nums)
        prefix_result = pivot_index_with_prefix_array(nums)
        brute_result = pivot_index_brute_force(nums)
        status = "PASS" if result == expected else "FAIL"

        if result != expected:
            all_passed = False

        print(f"\nTest {i}: {status}")
        print(f"  Input: nums = {nums}")
        print(f"  Expected: {expected}")
        print(f"  Got (optimal): {result}")
        print(f"  Got (prefix array): {prefix_result}")
        print(f"  Got (brute force): {brute_result}")

        # Verify all solutions match
        if not (result == prefix_result == brute_result):
            print(f"  WARNING: Solutions differ!")

    print("\n" + "=" * 60)
    if all_passed:
        print("ALL TESTS PASSED!")
    else:
        print("SOME TESTS FAILED!")
    print("=" * 60)

    return all_passed


def demonstrate_algorithm():
    """Step-by-step demonstration of the algorithm."""
    nums = [1, 7, 3, 6, 5, 6]

    print("\n" + "=" * 60)
    print("ALGORITHM DEMONSTRATION")
    print("=" * 60)
    print(f"Input: nums = {nums}")

    print("\n" + "-" * 40)
    print("Step 1: Calculate total sum")
    print("-" * 40)

    total_sum = sum(nums)
    print(f"total_sum = {' + '.join(map(str, nums))} = {total_sum}")

    print("\n" + "-" * 40)
    print("Step 2: Find pivot index")
    print("-" * 40)
    print("\nFor each index, check if 2*left_sum + nums[i] == total_sum")

    left_sum = 0
    pivot = -1

    for i, num in enumerate(nums):
        check = 2 * left_sum + num
        is_pivot = check == total_sum

        print(f"\nIndex {i}, nums[{i}] = {num}:")
        print(f"  left_sum = {left_sum}")
        print(f"  Check: 2*{left_sum} + {num} = {check}")
        print(f"  total_sum = {total_sum}")
        print(f"  Equal? {is_pivot}")

        if is_pivot:
            pivot = i
            print(f"  -> PIVOT FOUND at index {i}!")
            break

        left_sum += num
        print(f"  Update left_sum = {left_sum}")

    print(f"\nResult: pivot index = {pivot}")

    if pivot != -1:
        print("\n" + "-" * 40)
        print("Verification")
        print("-" * 40)

        left = nums[:pivot]
        right = nums[pivot + 1:]
        left_sum = sum(left)
        right_sum = sum(right)

        print(f"\nAt pivot index {pivot}:")
        print(f"  Element at pivot: {nums[pivot]}")
        print(f"  Left elements: {left}")
        print(f"  Left sum: {' + '.join(map(str, left)) if left else '0'} = {left_sum}")
        print(f"  Right elements: {right}")
        print(f"  Right sum: {' + '.join(map(str, right)) if right else '0'} = {right_sum}")
        print(f"  Left sum == Right sum? {left_sum == right_sum}")


if __name__ == "__main__":
    run_tests()
    demonstrate_algorithm()
