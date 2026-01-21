"""
Closest Sum Target (Two Arrays)

Given two sorted arrays arr1 and arr2, find one element from each array such that
their sum is closest to a given target value. Return the pair of elements.

Time Complexity: O(n log n + m log m) for sorting, O(n + m) for two-pointer traversal
Space Complexity: O(1) - only using pointers and variables
"""

def closest_sum_target(arr1: list[int], arr2: list[int], target: int) -> list[int]:
    """
    Find one element from each array whose sum is closest to target.

    Approach:
    1. Sort both arrays if not already sorted
    2. Use two pointers: left starts at arr1[0], right starts at arr2[-1]
    3. If sum < target, move left right; if sum > target, move right left
    4. Track the minimum difference and corresponding pair
    """
    arr1.sort()
    arr2.sort()

    left = 0
    right = len(arr2) - 1
    closest_pair = [arr1[0], arr2[0]]
    min_diff = float('inf')

    while left < len(arr1) and right >= 0:
        current_sum = arr1[left] + arr2[right]
        current_diff = abs(current_sum - target)

        if current_diff < min_diff:
            min_diff = current_diff
            closest_pair = [arr1[left], arr2[right]]

        # Found exact match
        if current_sum == target:
            return closest_pair
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum

    return closest_pair


def closest_sum_target_brute(arr1: list[int], arr2: list[int], target: int) -> list[int]:
    """
    Brute force approach - check all pairs.
    Time: O(n * m), Space: O(1)
    """
    closest_pair = [arr1[0], arr2[0]]
    min_diff = float('inf')

    for a in arr1:
        for b in arr2:
            current_diff = abs(a + b - target)
            if current_diff < min_diff:
                min_diff = current_diff
                closest_pair = [a, b]

    return closest_pair


def closest_sum_target_binary_search(arr1: list[int], arr2: list[int], target: int) -> list[int]:
    """
    Binary search approach - for each element in arr1, binary search in arr2.
    Time: O(n log m) or O(m log n), Space: O(1)
    """
    import bisect

    arr1.sort()
    arr2.sort()

    closest_pair = [arr1[0], arr2[0]]
    min_diff = float('inf')

    for a in arr1:
        complement = target - a

        # Find position where complement would be inserted
        idx = bisect.bisect_left(arr2, complement)

        # Check element at idx and idx-1
        for i in [idx - 1, idx]:
            if 0 <= i < len(arr2):
                current_diff = abs(a + arr2[i] - target)
                if current_diff < min_diff:
                    min_diff = current_diff
                    closest_pair = [a, arr2[i]]

    return closest_pair


# Test cases
def run_tests():
    test_cases = [
        ([1, 3, 5, 7], [2, 4, 6, 8], 10, 10),  # Expected sum
        ([-1, 3, 8, 12], [2, 4, 9, 15], 7, 7),
        ([1, 4, 5, 7], [10, 20, 30, 40], 32, 31),  # Closest is 31
        ([-5, -2, 0, 3], [-3, 1, 4, 8], 1, 1),
    ]

    print("Testing Closest Sum Target (Two Arrays)")
    print("=" * 50)

    for arr1, arr2, target, expected_sum in test_cases:
        result = closest_sum_target(arr1.copy(), arr2.copy(), target)
        actual_sum = result[0] + result[1]
        status = "PASS" if actual_sum == expected_sum else "FAIL"
        print(f"{status}: arr1={arr1}, arr2={arr2}, target={target}")
        print(f"       Expected sum: {expected_sum}")
        print(f"       Got pair: {result} (sum={actual_sum})")
        print()


if __name__ == "__main__":
    run_tests()
