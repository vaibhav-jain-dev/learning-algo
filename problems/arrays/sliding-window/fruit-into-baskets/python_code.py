"""
Fruit Into Baskets

You are visiting a farm with fruit trees. Find the maximum number of fruits
you can pick with 2 baskets (each basket holds one type of fruit).

This is equivalent to: longest subarray with at most 2 distinct elements.

Time Complexity: O(n)
Space Complexity: O(1) - at most 3 distinct elements in the map
"""

from typing import List
from collections import defaultdict


def total_fruit(fruits: List[int]) -> int:
    """
    Find maximum fruits that can be picked with 2 baskets.

    Args:
        fruits: List of fruit types at each tree position

    Returns:
        Maximum number of fruits that can be picked
    """
    if not fruits:
        return 0

    # Count of each fruit type in current window
    fruit_count = defaultdict(int)
    max_fruits = 0
    left = 0

    for right in range(len(fruits)):
        # Add fruit at right to the basket
        fruit_count[fruits[right]] += 1

        # If we have more than 2 types, shrink window from left
        while len(fruit_count) > 2:
            fruit_count[fruits[left]] -= 1
            if fruit_count[fruits[left]] == 0:
                del fruit_count[fruits[left]]
            left += 1

        # Update maximum
        max_fruits = max(max_fruits, right - left + 1)

    return max_fruits


def total_fruit_k_distinct(fruits: List[int], k: int = 2) -> int:
    """
    Generalized version: longest subarray with at most k distinct elements.

    Args:
        fruits: List of fruit types at each tree position
        k: Maximum number of distinct fruit types allowed

    Returns:
        Maximum number of fruits that can be picked
    """
    if not fruits or k <= 0:
        return 0

    fruit_count = defaultdict(int)
    max_fruits = 0
    left = 0

    for right in range(len(fruits)):
        fruit_count[fruits[right]] += 1

        while len(fruit_count) > k:
            fruit_count[fruits[left]] -= 1
            if fruit_count[fruits[left]] == 0:
                del fruit_count[fruits[left]]
            left += 1

        max_fruits = max(max_fruits, right - left + 1)

    return max_fruits


def find_longest_subarray(fruits: List[int]) -> List[int]:
    """
    Find and return the actual longest subarray (not just length).

    Args:
        fruits: List of fruit types at each tree position

    Returns:
        The longest subarray with at most 2 distinct elements
    """
    if not fruits:
        return []

    fruit_count = defaultdict(int)
    max_length = 0
    max_start = 0
    left = 0

    for right in range(len(fruits)):
        fruit_count[fruits[right]] += 1

        while len(fruit_count) > 2:
            fruit_count[fruits[left]] -= 1
            if fruit_count[fruits[left]] == 0:
                del fruit_count[fruits[left]]
            left += 1

        current_length = right - left + 1
        if current_length > max_length:
            max_length = current_length
            max_start = left

    return fruits[max_start:max_start + max_length]


def run_tests():
    """Run test cases to verify the solution."""

    test_cases = [
        # (fruits, expected)
        ([1, 2, 1], 3),
        ([0, 1, 2, 2], 3),
        ([1, 2, 3, 2, 2], 4),
        ([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4], 5),
        ([1], 1),
        ([1, 1, 1, 1], 4),
        ([1, 2, 1, 2, 1, 2, 1], 7),
        ([1, 0, 1, 4, 1, 4, 1, 2, 3], 5),
        ([0], 1),
        ([1, 2], 2),
        ([1, 2, 3, 4, 5], 2),
    ]

    print("Testing Fruit Into Baskets")
    print("=" * 60)

    all_passed = True

    for i, (fruits, expected) in enumerate(test_cases, 1):
        result = total_fruit(fruits)
        status = "PASS" if result == expected else "FAIL"

        if result != expected:
            all_passed = False

        print(f"Test {i}: {status}")
        print(f"  Input: fruits={fruits}")
        print(f"  Expected: {expected}, Got: {result}")

        # Show the actual subarray found
        subarray = find_longest_subarray(fruits)
        print(f"  Longest subarray: {subarray}")
        print()

    # Verify generalized version gives same results when k=2
    print("Verifying generalized k-distinct solution matches...")
    for fruits, expected in test_cases:
        result1 = total_fruit(fruits)
        result2 = total_fruit_k_distinct(fruits, k=2)
        if result1 != result2:
            print(f"  Mismatch for {fruits}! Regular={result1}, K-Distinct={result2}")
            all_passed = False
    print("  All approaches give matching results!")
    print()

    # Test with different k values
    print("Testing with different k values:")
    test_arr = [1, 2, 3, 4, 1, 2, 3, 4, 5]
    for k in [1, 2, 3, 4]:
        result = total_fruit_k_distinct(test_arr, k)
        print(f"  k={k}: max length = {result}")
    print()

    if all_passed:
        print("All tests PASSED!")
    else:
        print("Some tests FAILED!")

    return all_passed


if __name__ == "__main__":
    run_tests()
