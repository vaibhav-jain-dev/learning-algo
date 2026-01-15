"""
Product of Array Except Self

Given an integer array nums, return an array answer such that answer[i]
is equal to the product of all the elements of nums except nums[i].

Must run in O(n) time without using division.

Time Complexity: O(n)
Space Complexity: O(1) extra space (output array doesn't count)
"""

from typing import List


def product_except_self(nums: List[int]) -> List[int]:
    """
    Compute product of array except self using O(1) extra space.

    Args:
        nums: List of integers

    Returns:
        List where each element is product of all other elements
    """
    n = len(nums)
    result = [1] * n

    # First pass: compute left products
    # result[i] = product of all elements to the left of i
    left_product = 1
    for i in range(n):
        result[i] = left_product
        left_product *= nums[i]

    # Second pass: multiply by right products
    # Compute right product on the fly and multiply with result
    right_product = 1
    for i in range(n - 1, -1, -1):
        result[i] *= right_product
        right_product *= nums[i]

    return result


def product_except_self_two_arrays(nums: List[int]) -> List[int]:
    """
    Alternative solution using two separate arrays for clarity.
    Uses O(n) extra space.
    """
    n = len(nums)
    left = [1] * n
    right = [1] * n

    # Build left products array
    for i in range(1, n):
        left[i] = left[i - 1] * nums[i - 1]

    # Build right products array
    for i in range(n - 2, -1, -1):
        right[i] = right[i + 1] * nums[i + 1]

    # Combine left and right products
    result = [left[i] * right[i] for i in range(n)]
    return result


def product_except_self_with_division(nums: List[int]) -> List[int]:
    """
    Solution using division (not allowed by problem, but for reference).
    Handles zeros as a special case.
    """
    zero_count = nums.count(0)
    n = len(nums)

    if zero_count > 1:
        return [0] * n

    if zero_count == 1:
        # Only the position with zero gets a non-zero result
        zero_idx = nums.index(0)
        product = 1
        for i, num in enumerate(nums):
            if i != zero_idx:
                product *= num
        result = [0] * n
        result[zero_idx] = product
        return result

    # No zeros - can use division
    total_product = 1
    for num in nums:
        total_product *= num
    return [total_product // num for num in nums]


def run_tests():
    """Run test cases for product except self."""
    test_cases = [
        # (nums, expected)
        ([1, 2, 3, 4], [24, 12, 8, 6]),
        ([-1, 1, 0, -3, 3], [0, 0, 9, 0, 0]),
        ([2, 3, 4, 5], [60, 40, 30, 24]),
        ([1, 1, 1, 1], [1, 1, 1, 1]),
        ([2, 2], [2, 2]),
        ([0, 0], [0, 0]),
        ([1, 0], [0, 1]),
        ([-1, -1, -1, -1], [-1, -1, -1, -1]),
        ([1, 2, 0, 4], [0, 0, 8, 0]),
        ([5, 2, 3, 4], [24, 60, 40, 30]),
    ]

    print("=" * 60)
    print("PRODUCT OF ARRAY EXCEPT SELF - TEST RESULTS")
    print("=" * 60)

    all_passed = True
    for i, (nums, expected) in enumerate(test_cases, 1):
        result = product_except_self(nums)
        result_two_arrays = product_except_self_two_arrays(nums)
        status = "PASS" if result == expected else "FAIL"

        if result != expected:
            all_passed = False

        print(f"\nTest {i}: {status}")
        print(f"  Input: nums = {nums}")
        print(f"  Expected: {expected}")
        print(f"  Got (O(1) space): {result}")
        print(f"  Got (two arrays): {result_two_arrays}")

        if result != result_two_arrays:
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
    nums = [1, 2, 3, 4]

    print("\n" + "=" * 60)
    print("ALGORITHM DEMONSTRATION")
    print("=" * 60)
    print(f"Input: nums = {nums}")
    print("\n" + "-" * 40)
    print("PASS 1: Building left products")
    print("-" * 40)

    n = len(nums)
    result = [1] * n
    left_product = 1

    for i in range(n):
        print(f"\nIndex {i}:")
        print(f"  result[{i}] = left_product = {left_product}")
        result[i] = left_product
        left_product *= nums[i]
        print(f"  left_product *= nums[{i}] = {left_product}")
        print(f"  Current result: {result}")

    print("\n" + "-" * 40)
    print("PASS 2: Multiplying by right products")
    print("-" * 40)

    right_product = 1
    for i in range(n - 1, -1, -1):
        print(f"\nIndex {i}:")
        print(f"  result[{i}] = {result[i]} * right_product({right_product}) = ", end="")
        result[i] *= right_product
        print(f"{result[i]}")
        right_product *= nums[i]
        print(f"  right_product *= nums[{i}] = {right_product}")
        print(f"  Current result: {result}")

    print(f"\nFinal result: {result}")


if __name__ == "__main__":
    run_tests()
    demonstrate_algorithm()
