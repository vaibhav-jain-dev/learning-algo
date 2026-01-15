"""
Three Sum Problem

Find all unique triplets in the array that sum to zero.
Uses the two-pointer technique after sorting the array.

Time Complexity: O(n^2)
Space Complexity: O(1) excluding the output array
"""

from typing import List


def three_sum(nums: List[int]) -> List[List[int]]:
    """
    Find all unique triplets that sum to zero.

    Args:
        nums: List of integers

    Returns:
        List of triplets, where each triplet sums to zero
    """
    result = []
    n = len(nums)

    # Edge case: need at least 3 numbers
    if n < 3:
        return result

    # Sort the array to enable two-pointer technique
    nums.sort()

    for i in range(n - 2):
        # Early termination: if smallest number is positive, no solution possible
        if nums[i] > 0:
            break

        # Skip duplicate values for the first element
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        # Two-pointer search for the remaining two elements
        left = i + 1
        right = n - 1
        target = -nums[i]

        while left < right:
            current_sum = nums[left] + nums[right]

            if current_sum < target:
                # Sum too small, need larger values
                left += 1
            elif current_sum > target:
                # Sum too large, need smaller values
                right -= 1
            else:
                # Found a valid triplet
                result.append([nums[i], nums[left], nums[right]])

                # Skip duplicates for left pointer
                while left < right and nums[left] == nums[left + 1]:
                    left += 1

                # Skip duplicates for right pointer
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1

                # Move both pointers inward
                left += 1
                right -= 1

    return result


def three_sum_with_details(nums: List[int]) -> List[List[int]]:
    """
    Same as three_sum but with detailed step-by-step output for learning.
    """
    result = []
    n = len(nums)

    if n < 3:
        print("Array too small, need at least 3 elements")
        return result

    nums_sorted = sorted(nums)
    print(f"Original array: {nums}")
    print(f"Sorted array: {nums_sorted}")
    print("-" * 50)

    for i in range(n - 2):
        if nums_sorted[i] > 0:
            print(f"i={i}: nums[i]={nums_sorted[i]} > 0, breaking early")
            break

        if i > 0 and nums_sorted[i] == nums_sorted[i - 1]:
            print(f"i={i}: Skipping duplicate value {nums_sorted[i]}")
            continue

        print(f"\ni={i}, fixed element: {nums_sorted[i]}, looking for pairs summing to {-nums_sorted[i]}")

        left = i + 1
        right = n - 1
        target = -nums_sorted[i]

        while left < right:
            current_sum = nums_sorted[left] + nums_sorted[right]
            print(f"  left={left} ({nums_sorted[left]}), right={right} ({nums_sorted[right]}), sum={current_sum}")

            if current_sum < target:
                print(f"    Sum {current_sum} < target {target}, moving left pointer right")
                left += 1
            elif current_sum > target:
                print(f"    Sum {current_sum} > target {target}, moving right pointer left")
                right -= 1
            else:
                triplet = [nums_sorted[i], nums_sorted[left], nums_sorted[right]]
                print(f"    Found triplet: {triplet}")
                result.append(triplet)

                while left < right and nums_sorted[left] == nums_sorted[left + 1]:
                    left += 1
                    print(f"    Skipping duplicate left value")

                while left < right and nums_sorted[right] == nums_sorted[right - 1]:
                    right -= 1
                    print(f"    Skipping duplicate right value")

                left += 1
                right -= 1

    print("-" * 50)
    print(f"Final result: {result}")
    return result


# Test cases
def run_tests():
    """Run test cases to verify the solution."""
    print("=" * 60)
    print("Running Three Sum Tests")
    print("=" * 60)

    test_cases = [
        # (input, expected_output)
        ([-1, 0, 1, 2, -1, -4], [[-1, -1, 2], [-1, 0, 1]]),
        ([0, 1, 1], []),
        ([0, 0, 0], [[0, 0, 0]]),
        ([0, 0, 0, 0], [[0, 0, 0]]),
        ([-2, 0, 1, 1, 2], [[-2, 0, 2], [-2, 1, 1]]),
        ([1, 2, -2, -1], []),
        ([-1, 0, 1, 0], [[-1, 0, 1]]),
        ([-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6],
         [[-4, -2, 6], [-4, 0, 4], [-4, 1, 3], [-4, 2, 2], [-2, -2, 4], [-2, 0, 2]]),
    ]

    all_passed = True

    for i, (nums, expected) in enumerate(test_cases, 1):
        # Make a copy since the function sorts in place
        nums_copy = nums.copy()
        result = three_sum(nums_copy)

        # Sort both for comparison (order doesn't matter)
        result_sorted = sorted([sorted(t) for t in result])
        expected_sorted = sorted([sorted(t) for t in expected])

        passed = result_sorted == expected_sorted
        status = "PASS" if passed else "FAIL"

        print(f"\nTest {i}: {status}")
        print(f"  Input: {nums}")
        print(f"  Expected: {expected}")
        print(f"  Got: {result}")

        if not passed:
            all_passed = False

    print("\n" + "=" * 60)
    if all_passed:
        print("All tests passed!")
    else:
        print("Some tests failed!")
    print("=" * 60)

    return all_passed


def demo_with_details():
    """Demonstrate the algorithm with detailed output."""
    print("\n" + "=" * 60)
    print("Detailed Walkthrough Demo")
    print("=" * 60)

    # Example with multiple triplets
    print("\nExample 1: [-1, 0, 1, 2, -1, -4]")
    print("-" * 50)
    three_sum_with_details([-1, 0, 1, 2, -1, -4])

    print("\n\nExample 2: [-2, 0, 1, 1, 2]")
    print("-" * 50)
    three_sum_with_details([-2, 0, 1, 1, 2])


if __name__ == "__main__":
    # Run the test suite
    run_tests()

    # Show detailed walkthrough
    demo_with_details()
