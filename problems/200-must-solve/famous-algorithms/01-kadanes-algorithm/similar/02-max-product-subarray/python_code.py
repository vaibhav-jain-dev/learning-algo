"""
Maximum Product Subarray - Python Solution

Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import List


def max_product(nums: List[int]) -> int:
    """
    Find maximum product subarray.

    Track both max and min because negative * negative = positive.
    """
    if not nums:
        return 0

    max_prod = min_prod = result = nums[0]

    for num in nums[1:]:
        # If negative, max becomes min and vice versa
        if num < 0:
            max_prod, min_prod = min_prod, max_prod

        max_prod = max(num, max_prod * num)
        min_prod = min(num, min_prod * num)

        result = max(result, max_prod)

    return result


# Test cases
if __name__ == "__main__":
    print(f"Test 1: {max_product([2, 3, -2, 4])}")  # Expected: 6
    print(f"Test 2: {max_product([-2, 0, -1])}")  # Expected: 0
    print(f"Test 3: {max_product([-2, 3, -4])}")  # Expected: 24
    print(f"Test 4: {max_product([0, 2])}")  # Expected: 2
    print("\nAll tests completed!")
