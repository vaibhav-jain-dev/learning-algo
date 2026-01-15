"""
Contiguous Array (Longest Subarray with Equal 0s and 1s)

Given a binary array nums, return the maximum length of a contiguous
subarray with an equal number of 0s and 1s.

Time Complexity: O(n)
Space Complexity: O(n)
"""

from typing import List


def find_max_length(nums: List[int]) -> int:
    """
    Find the maximum length of contiguous subarray with equal 0s and 1s.

    Approach: Replace 0 with -1, then find longest subarray with sum = 0.

    Args:
        nums: Binary array (contains only 0s and 1s)

    Returns:
        Maximum length of subarray with equal 0s and 1s
    """
    # Map to store first occurrence of each prefix sum
    # Initialize with {0: -1} to handle subarrays starting from index 0
    sum_index = {0: -1}

    max_length = 0
    running_sum = 0

    for i, num in enumerate(nums):
        # Treat 0 as -1
        running_sum += 1 if num == 1 else -1

        if running_sum in sum_index:
            # Found a subarray with sum 0 (equal 0s and 1s)
            length = i - sum_index[running_sum]
            max_length = max(max_length, length)
        else:
            # Store first occurrence of this sum
            sum_index[running_sum] = i

    return max_length


def find_max_length_brute_force(nums: List[int]) -> int:
    """
    Brute force approach - O(n^2) time complexity.
    Included for verification.
    """
    n = len(nums)
    max_length = 0

    for i in range(n):
        zeros = 0
        ones = 0
        for j in range(i, n):
            if nums[j] == 0:
                zeros += 1
            else:
                ones += 1

            if zeros == ones:
                max_length = max(max_length, j - i + 1)

    return max_length


def run_tests():
    """Run test cases for contiguous array."""
    test_cases = [
        # (nums, expected)
        ([0, 1], 2),
        ([0, 1, 0], 2),
        ([0, 0, 1, 0, 0, 0, 1, 1], 6),
        ([0, 1, 1, 0, 1, 1, 1, 0], 4),
        ([0], 0),
        ([1], 0),
        ([0, 0, 0, 1, 1, 1], 6),
        ([1, 1, 1, 1], 0),
        ([0, 0, 0, 0], 0),
        ([0, 1, 0, 1], 4),
        ([1, 0, 1, 0, 1, 0], 6),
        ([0, 0, 1, 1, 0, 0, 1, 1], 8),
        ([1, 1, 0, 1, 0, 0, 1], 6),
    ]

    print("=" * 60)
    print("CONTIGUOUS ARRAY - TEST RESULTS")
    print("=" * 60)

    all_passed = True
    for i, (nums, expected) in enumerate(test_cases, 1):
        result = find_max_length(nums)
        brute_result = find_max_length_brute_force(nums)
        status = "PASS" if result == expected else "FAIL"

        if result != expected:
            all_passed = False

        print(f"\nTest {i}: {status}")
        print(f"  Input: nums = {nums}")
        print(f"  Expected: {expected}")
        print(f"  Got (optimal): {result}")
        print(f"  Got (brute force): {brute_result}")

        if result != brute_result:
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
    nums = [0, 1, 0, 0, 1, 1]

    print("\n" + "=" * 60)
    print("ALGORITHM DEMONSTRATION")
    print("=" * 60)
    print(f"Input: nums = {nums}")
    print("\nKey insight: Replace 0 with -1, find longest subarray with sum = 0")

    print("\n" + "-" * 40)
    print("Step-by-step execution")
    print("-" * 40)

    sum_index = {0: -1}
    max_length = 0
    running_sum = 0

    print(f"\nInitial state: sum_index = {sum_index}, max_length = 0")
    print("\nProcessing each element:")

    for i, num in enumerate(nums):
        contribution = 1 if num == 1 else -1
        old_sum = running_sum
        running_sum += contribution

        print(f"\nIndex {i}, value = {num} (treated as {contribution}):")
        print(f"  running_sum = {old_sum} + ({contribution}) = {running_sum}")

        if running_sum in sum_index:
            length = i - sum_index[running_sum]
            print(f"  Found running_sum = {running_sum} at index {sum_index[running_sum]}")
            print(f"  Subarray length = {i} - ({sum_index[running_sum]}) = {length}")
            if length > max_length:
                max_length = length
                print(f"  -> New max_length = {max_length}")
            else:
                print(f"  -> max_length unchanged = {max_length}")
        else:
            sum_index[running_sum] = i
            print(f"  First occurrence of sum = {running_sum}, storing index {i}")
            print(f"  sum_index = {sum_index}")

    print(f"\nFinal result: max_length = {max_length}")

    # Verify the result
    if max_length > 0:
        print("\n" + "-" * 40)
        print("Verification")
        print("-" * 40)

        # Find the actual subarray
        sum_index = {0: -1}
        running_sum = 0
        best_start = 0
        best_end = 0

        for i, num in enumerate(nums):
            running_sum += 1 if num == 1 else -1
            if running_sum in sum_index:
                length = i - sum_index[running_sum]
                if length == max_length:
                    best_start = sum_index[running_sum] + 1
                    best_end = i
            else:
                sum_index[running_sum] = i

        subarray = nums[best_start:best_end + 1]
        zeros = subarray.count(0)
        ones = subarray.count(1)
        print(f"\nLongest subarray: {subarray}")
        print(f"Indices: {best_start} to {best_end}")
        print(f"Count: {zeros} zeros, {ones} ones")
        print(f"Equal? {zeros == ones}")


if __name__ == "__main__":
    run_tests()
    demonstrate_algorithm()
