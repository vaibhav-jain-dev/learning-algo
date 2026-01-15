"""
Maximum Sum Subarray of Size K

Given an array of integers and a positive integer k, find the maximum sum
of any contiguous subarray of size k.

Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import List


def max_sum_subarray_k(arr: List[int], k: int) -> int:
    """
    Find the maximum sum of any contiguous subarray of size k.

    Args:
        arr: List of integers
        k: Size of the subarray

    Returns:
        Maximum sum of any subarray of size k
    """
    if not arr or k <= 0 or k > len(arr):
        return 0

    n = len(arr)

    # Calculate sum of first window
    window_sum = sum(arr[:k])
    max_sum = window_sum

    # Slide the window from left to right
    for i in range(k, n):
        # Add the new element entering the window
        # Subtract the element leaving the window
        window_sum = window_sum + arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)

    return max_sum


def max_sum_subarray_k_brute_force(arr: List[int], k: int) -> int:
    """
    Brute force approach - O(n*k) time complexity.
    Calculate sum of each window separately.
    """
    if not arr or k <= 0 or k > len(arr):
        return 0

    n = len(arr)
    max_sum = float('-inf')

    for i in range(n - k + 1):
        current_sum = sum(arr[i:i + k])
        max_sum = max(max_sum, current_sum)

    return max_sum


def run_tests():
    """Run test cases to verify the solution."""

    test_cases = [
        # (arr, k, expected)
        ([2, 1, 5, 1, 3, 2], 3, 9),
        ([2, 3, 4, 1, 5], 2, 7),
        ([1, 1, 1, 1, 1], 3, 3),
        ([5], 1, 5),
        ([1, 2, 3, 4, 5], 5, 15),
        ([-1, -2, -3, -4], 2, -3),
        ([4, -1, 2, 1, 6], 3, 9),
        ([1, 4, 2, 10, 23, 3, 1, 0, 20], 4, 39),
    ]

    print("Testing Maximum Sum Subarray of Size K")
    print("=" * 50)

    all_passed = True

    for i, (arr, k, expected) in enumerate(test_cases, 1):
        result = max_sum_subarray_k(arr, k)
        status = "PASS" if result == expected else "FAIL"

        if result != expected:
            all_passed = False

        print(f"Test {i}: {status}")
        print(f"  Input: arr={arr}, k={k}")
        print(f"  Expected: {expected}, Got: {result}")
        print()

    # Also verify brute force gives same results
    print("Verifying brute force approach matches...")
    for arr, k, expected in test_cases:
        bf_result = max_sum_subarray_k_brute_force(arr, k)
        opt_result = max_sum_subarray_k(arr, k)
        if bf_result != opt_result:
            print(f"  Mismatch! BF={bf_result}, Optimal={opt_result}")
            all_passed = False
    print("  All brute force results match optimal solution!")
    print()

    if all_passed:
        print("All tests PASSED!")
    else:
        print("Some tests FAILED!")

    return all_passed


if __name__ == "__main__":
    run_tests()
