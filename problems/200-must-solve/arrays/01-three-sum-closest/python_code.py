"""
Three Sum Closest

Given an integer array nums of length n and an integer target, find three integers
in nums such that the sum is closest to target. Return the sum of the three integers.

Time Complexity: O(n^2) - sort is O(n log n), then O(n^2) for nested loops
Space Complexity: O(1) - only using pointers and variables
"""

def three_sum_closest(nums: list[int], target: int) -> int:
    """
    Find three numbers whose sum is closest to target.

    Approach:
    1. Sort the array to enable two-pointer technique
    2. For each element, use two pointers to find best pair
    3. Track the closest sum found
    """
    nums.sort()
    n = len(nums)
    closest_sum = float('inf')

    for i in range(n - 2):
        # Skip duplicates for optimization (optional)
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        left, right = i + 1, n - 1

        while left < right:
            current_sum = nums[i] + nums[left] + nums[right]

            # Update closest if this sum is closer to target
            if abs(current_sum - target) < abs(closest_sum - target):
                closest_sum = current_sum

            # Found exact match
            if current_sum == target:
                return current_sum
            elif current_sum < target:
                left += 1  # Need larger sum
            else:
                right -= 1  # Need smaller sum

    return closest_sum


def three_sum_closest_brute(nums: list[int], target: int) -> int:
    """
    Brute force approach - check all triplets.
    Time: O(n^3), Space: O(1)
    """
    n = len(nums)
    closest_sum = float('inf')

    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                current_sum = nums[i] + nums[j] + nums[k]
                if abs(current_sum - target) < abs(closest_sum - target):
                    closest_sum = current_sum

    return closest_sum


# Test cases
def run_tests():
    test_cases = [
        ([-1, 2, 1, -4], 1, 2),
        ([0, 0, 0], 1, 0),
        ([1, 1, 1, 0], -100, 2),
        ([4, 0, 5, -5, 3, 3, 0, -4, -5], -2, -2),
        ([1, 2, 3], 6, 6),
    ]

    print("Testing Three Sum Closest")
    print("=" * 50)

    for nums, target, expected in test_cases:
        result = three_sum_closest(nums.copy(), target)
        status = "PASS" if result == expected else "FAIL"
        print(f"{status}: nums={nums}, target={target}")
        print(f"       Expected: {expected}, Got: {result}")
        print()


if __name__ == "__main__":
    run_tests()
