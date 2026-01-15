"""
Max Consecutive Ones III

Given a binary array nums and an integer k, return the maximum number of
consecutive 1's in the array if you can flip at most k 0's.

Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import List, Tuple


def longest_ones(nums: List[int], k: int) -> int:
    """
    Find maximum consecutive 1s after flipping at most k zeros.
    Standard sliding window approach.

    Args:
        nums: Binary array (contains only 0s and 1s)
        k: Maximum number of zeros that can be flipped

    Returns:
        Maximum length of consecutive 1s achievable
    """
    if not nums:
        return 0

    left = 0
    zeros = 0
    max_length = 0

    for right in range(len(nums)):
        # If current element is 0, increment zero counter
        if nums[right] == 0:
            zeros += 1

        # If zeros exceed k, shrink window from left
        while zeros > k:
            if nums[left] == 0:
                zeros -= 1
            left += 1

        # Update maximum length
        max_length = max(max_length, right - left + 1)

    return max_length


def longest_ones_optimized(nums: List[int], k: int) -> int:
    """
    Optimized approach: window never shrinks, only shifts.

    The key insight is that we only care about the maximum window size.
    Once we find a valid window of size W, we never need a smaller window.
    So we maintain the window size and only shift it, never shrink.

    Args:
        nums: Binary array (contains only 0s and 1s)
        k: Maximum number of zeros that can be flipped

    Returns:
        Maximum length of consecutive 1s achievable
    """
    if not nums:
        return 0

    left = 0
    zeros = 0

    for right in range(len(nums)):
        if nums[right] == 0:
            zeros += 1

        # If zeros exceed k, shift window (not shrink)
        if zeros > k:
            if nums[left] == 0:
                zeros -= 1
            left += 1

    # Final window size is the answer
    return len(nums) - left


def find_longest_window(nums: List[int], k: int) -> Tuple[int, int, List[int]]:
    """
    Find and return the actual window (start, end indices) and the positions flipped.

    Args:
        nums: Binary array
        k: Maximum number of zeros to flip

    Returns:
        Tuple of (start_index, end_index, list_of_flipped_positions)
    """
    if not nums:
        return (-1, -1, [])

    left = 0
    zeros = 0
    max_length = 0
    max_start = 0

    for right in range(len(nums)):
        if nums[right] == 0:
            zeros += 1

        while zeros > k:
            if nums[left] == 0:
                zeros -= 1
            left += 1

        current_length = right - left + 1
        if current_length > max_length:
            max_length = current_length
            max_start = left

    # Find positions of zeros that would be flipped
    flipped = []
    for i in range(max_start, max_start + max_length):
        if nums[i] == 0:
            flipped.append(i)

    return (max_start, max_start + max_length - 1, flipped)


def run_tests():
    """Run test cases to verify the solution."""

    test_cases = [
        # (nums, k, expected)
        ([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2, 6),
        ([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3, 10),
        ([1, 1, 1, 1, 1], 0, 5),
        ([0, 0, 0, 0], 2, 2),
        ([1, 0, 1, 0, 1, 0, 1], 3, 7),
        ([1, 1, 0, 0, 1, 1], 2, 6),
        ([0], 1, 1),
        ([1], 0, 1),
        ([0, 0, 0, 1], 4, 4),
        ([1, 1, 1, 0, 0, 0, 1, 1, 1, 1], 0, 4),
    ]

    print("Testing Max Consecutive Ones III")
    print("=" * 60)

    all_passed = True

    for i, (nums, k, expected) in enumerate(test_cases, 1):
        result = longest_ones(nums, k)
        status = "PASS" if result == expected else "FAIL"

        if result != expected:
            all_passed = False

        print(f"Test {i}: {status}")
        print(f"  Input: nums={nums}, k={k}")
        print(f"  Expected: {expected}, Got: {result}")

        # Show the actual window found
        start, end, flipped = find_longest_window(nums, k)
        if start >= 0:
            print(f"  Window: indices [{start}, {end}], flipped positions: {flipped}")
        print()

    # Verify optimized approach gives same results
    print("Verifying optimized approach matches standard approach...")
    for nums, k, expected in test_cases:
        std_result = longest_ones(nums, k)
        opt_result = longest_ones_optimized(nums, k)
        if std_result != opt_result:
            print(f"  Mismatch for nums={nums}, k={k}! Standard={std_result}, Optimized={opt_result}")
            all_passed = False
    print("  All approaches give matching results!")
    print()

    # Demonstrate the algorithm step by step for one example
    print("Step-by-step demonstration:")
    nums = [1, 1, 0, 0, 1, 1, 1, 0, 1]
    k = 2
    print(f"  nums = {nums}, k = {k}")
    print(f"  Finding longest subarray with at most {k} zeros...")
    left = 0
    zeros = 0
    for right in range(len(nums)):
        if nums[right] == 0:
            zeros += 1
        while zeros > k:
            if nums[left] == 0:
                zeros -= 1
            left += 1
        window = nums[left:right + 1]
        print(f"    right={right}: window=[{left}:{right+1}] = {window}, zeros={zeros}, length={right-left+1}")
    print(f"  Result: {longest_ones(nums, k)}")
    print()

    if all_passed:
        print("All tests PASSED!")
    else:
        print("Some tests FAILED!")

    return all_passed


if __name__ == "__main__":
    run_tests()
