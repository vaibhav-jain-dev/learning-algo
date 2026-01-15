"""
Two Sum - Find two numbers that add up to target

This solution uses a hash map to achieve O(n) time complexity.
"""

from typing import List


def two_sum(nums: List[int], target: int) -> List[int]:
    """
    Find indices of two numbers that add up to target.

    Args:
        nums: List of integers
        target: Target sum

    Returns:
        List containing indices of the two numbers
    """
    # Hash map to store number -> index mapping
    num_to_index = {}

    for i, num in enumerate(nums):
        # Calculate what number we need to find
        complement = target - num

        # Check if complement exists in our map
        if complement in num_to_index:
            return [num_to_index[complement], i]

        # Store current number and its index
        num_to_index[num] = i

    # No solution found (problem guarantees one exists)
    return []


def two_sum_brute_force(nums: List[int], target: int) -> List[int]:
    """
    Brute force approach - O(n^2) time complexity.
    Included for comparison.
    """
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []


def run_tests():
    """Run test cases to verify the solution."""
    test_cases = [
        # (nums, target, expected_output)
        ([2, 7, 11, 15], 9, [0, 1]),
        ([3, 2, 4], 6, [1, 2]),
        ([3, 3], 6, [0, 1]),
        ([1, 5, 3, 7, 8, 2, 4], 9, [1, 5]),  # 5 + 4 = 9
        ([-1, -2, -3, -4, -5], -8, [2, 4]),  # -3 + -5 = -8
        ([0, 4, 3, 0], 0, [0, 3]),  # 0 + 0 = 0
        ([1, 2], 3, [0, 1]),  # Minimum size array
    ]

    print("=" * 60)
    print("TWO SUM - Test Results")
    print("=" * 60)

    all_passed = True
    for i, (nums, target, expected) in enumerate(test_cases, 1):
        result = two_sum(nums.copy(), target)

        # Verify the result is valid (sums to target)
        is_valid = (len(result) == 2 and
                   nums[result[0]] + nums[result[1]] == target and
                   result[0] != result[1])

        # Check if result matches expected (or is valid alternative)
        passed = is_valid
        status = "PASS" if passed else "FAIL"

        if not passed:
            all_passed = False

        print(f"\nTest {i}: {status}")
        print(f"  Input: nums = {nums}, target = {target}")
        print(f"  Output: {result}")
        print(f"  Expected: {expected}")
        if is_valid:
            print(f"  Verification: nums[{result[0]}] + nums[{result[1]}] = "
                  f"{nums[result[0]]} + {nums[result[1]]} = {target}")

    print("\n" + "=" * 60)
    print(f"Overall: {'ALL TESTS PASSED' if all_passed else 'SOME TESTS FAILED'}")
    print("=" * 60)


def demonstrate_approach():
    """Demonstrate how the algorithm works step by step."""
    nums = [2, 7, 11, 15]
    target = 9

    print("\n" + "=" * 60)
    print("STEP-BY-STEP DEMONSTRATION")
    print("=" * 60)
    print(f"Input: nums = {nums}, target = {target}")
    print("\nProcess:")

    num_to_index = {}

    for i, num in enumerate(nums):
        complement = target - num
        print(f"\nStep {i + 1}: Processing nums[{i}] = {num}")
        print(f"  Complement needed: {target} - {num} = {complement}")
        print(f"  Current hash map: {num_to_index}")

        if complement in num_to_index:
            print(f"  Found! {complement} exists at index {num_to_index[complement]}")
            print(f"  Return [{num_to_index[complement]}, {i}]")
            break
        else:
            print(f"  {complement} not found, adding {num} -> {i} to map")
            num_to_index[num] = i


if __name__ == "__main__":
    run_tests()
    demonstrate_approach()
