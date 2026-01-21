"""
Three Sum With Duplicates

Given an integer array nums that may contain duplicates, return all unique triplets
that sum to target. The solution set must not contain duplicate triplets.

Time Complexity: O(n^2) - sort is O(n log n), then O(n^2) for nested loops
Space Complexity: O(1) - excluding output space
"""

def three_sum_duplicates(nums: list[int], target: int) -> list[list[int]]:
    """
    Find all unique triplets that sum to target.

    Approach:
    1. Sort the array to enable two-pointer technique and duplicate detection
    2. For each element as first number, use two pointers for remaining pair
    3. Skip duplicates at all three positions to avoid duplicate triplets
    """
    nums.sort()
    n = len(nums)
    result = []

    for i in range(n - 2):
        # Skip duplicate first elements
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        left, right = i + 1, n - 1
        remaining = target - nums[i]

        while left < right:
            current_sum = nums[left] + nums[right]

            if current_sum == remaining:
                result.append([nums[i], nums[left], nums[right]])

                # Skip duplicates for left pointer
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                # Skip duplicates for right pointer
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1

                left += 1
                right -= 1
            elif current_sum < remaining:
                left += 1
            else:
                right -= 1

    return result


def three_sum_duplicates_set(nums: list[int], target: int) -> list[list[int]]:
    """
    Alternative approach using set to handle duplicates.
    Time: O(n^2), Space: O(n) for the set
    """
    nums.sort()
    n = len(nums)
    seen = set()
    result = []

    for i in range(n - 2):
        left, right = i + 1, n - 1
        remaining = target - nums[i]

        while left < right:
            current_sum = nums[left] + nums[right]

            if current_sum == remaining:
                triplet = (nums[i], nums[left], nums[right])
                if triplet not in seen:
                    seen.add(triplet)
                    result.append(list(triplet))
                left += 1
                right -= 1
            elif current_sum < remaining:
                left += 1
            else:
                right -= 1

    return result


# Test cases
def run_tests():
    test_cases = [
        ([1, 1, 1, 2, 2, 3], 6, [[1, 2, 3]]),
        ([-1, 0, 1, 2, -1, -4], 0, [[-1, -1, 2], [-1, 0, 1]]),
        ([0, 0, 0, 0], 0, [[0, 0, 0]]),
        ([1, 2, -2, -1], 0, []),
        ([-2, 0, 0, 2, 2], 0, [[-2, 0, 2]]),
    ]

    print("Testing Three Sum With Duplicates")
    print("=" * 50)

    for nums, target, expected in test_cases:
        result = three_sum_duplicates(nums.copy(), target)
        # Sort for comparison
        result_sorted = sorted([sorted(t) for t in result])
        expected_sorted = sorted([sorted(t) for t in expected])
        status = "PASS" if result_sorted == expected_sorted else "FAIL"
        print(f"{status}: nums={nums}, target={target}")
        print(f"       Expected: {expected}")
        print(f"       Got:      {result}")
        print()


if __name__ == "__main__":
    run_tests()
