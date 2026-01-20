"""
K-Sum (Generalized) - Python Solutions

Find all unique k numbers that sum to target.
"""

from typing import List


def k_sum(nums: List[int], k: int, target: int) -> List[List[int]]:
    """
    Find all unique combinations of k numbers that sum to target.

    Recursively reduces to 2-sum:
    - K-sum: Fix one, solve (k-1)-sum
    - 2-sum: Use two pointers

    Time: O(n^(k-1)), Space: O(k)
    """
    nums.sort()
    result = []

    def two_sum(start: int, target: int) -> List[List[int]]:
        """Two-sum using two pointers."""
        res = []
        left, right = start, len(nums) - 1

        while left < right:
            curr_sum = nums[left] + nums[right]
            if curr_sum < target:
                left += 1
            elif curr_sum > target:
                right -= 1
            else:
                res.append([nums[left], nums[right]])
                left += 1
                right -= 1
                # Skip duplicates
                while left < right and nums[left] == nums[left - 1]:
                    left += 1

        return res

    def k_sum_helper(start: int, k: int, target: int) -> List[List[int]]:
        """Recursive k-sum helper."""
        if k == 2:
            return two_sum(start, target)

        res = []
        for i in range(start, len(nums) - k + 1):
            # Skip duplicates
            if i > start and nums[i] == nums[i - 1]:
                continue

            # Recursively solve (k-1)-sum
            for subset in k_sum_helper(i + 1, k - 1, target - nums[i]):
                res.append([nums[i]] + subset)

        return res

    return k_sum_helper(0, k, target)


def run_tests():
    test_cases = [
        ([1, 2, 3, 4, 5], 3, 9, [[1, 3, 5], [2, 3, 4]], "3-sum"),
        ([1, 0, -1, 0, -2, 2], 4, 0, [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]], "4-sum"),
        ([1, 2, 3], 2, 5, [[2, 3]], "2-sum"),
    ]

    print("=" * 60)
    print("K-SUM (GENERALIZED) - TEST RESULTS")
    print("=" * 60)

    for nums, k, target, expected, desc in test_cases:
        result = k_sum(nums.copy(), k, target)
        # Sort for comparison
        result_sorted = sorted([sorted(x) for x in result])
        expected_sorted = sorted([sorted(x) for x in expected])
        status = "PASS" if result_sorted == expected_sorted else "FAIL"
        print(f"  {status}: {desc}: {result}")


if __name__ == "__main__":
    run_tests()

    print("\n--- Sample Input ---")
    nums = [1, 2, 3, 4, 5]
    k, target = 3, 9
    print(f"Array: {nums}, k={k}, target={target}")
    print(f"Result: {k_sum(nums.copy(), k, target)}")
