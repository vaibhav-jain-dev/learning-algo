"""
Max Subset Sum No Adjacent - Python Solution

Find maximum sum of non-adjacent elements.

Time Complexity: O(n)
Space Complexity: O(1)
"""

def max_subset_sum_no_adjacent(array):
    """
    Find maximum sum of non-adjacent elements.

    Args:
        array: List of positive integers

    Returns:
        int: Maximum sum of non-adjacent elements
    """
    if not array:
        return 0
    if len(array) == 1:
        return array[0]

    # prev_prev: max sum ending 2 positions back
    # prev: max sum ending 1 position back
    prev_prev = array[0]
    prev = max(array[0], array[1])

    for i in range(2, len(array)):
        current = max(prev, prev_prev + array[i])
        prev_prev = prev
        prev = current

    return prev


def max_subset_sum_dp_array(array):
    """Alternative with full DP array for clarity."""
    if not array:
        return 0
    if len(array) == 1:
        return array[0]

    dp = [0] * len(array)
    dp[0] = array[0]
    dp[1] = max(array[0], array[1])

    for i in range(2, len(array)):
        dp[i] = max(dp[i-1], dp[i-2] + array[i])

    return dp[-1]


def max_subset_with_indices(array):
    """Return both max sum and the indices used."""
    if not array:
        return 0, []
    if len(array) == 1:
        return array[0], [0]

    n = len(array)
    dp = [0] * n
    dp[0] = array[0]
    dp[1] = max(array[0], array[1])

    for i in range(2, n):
        dp[i] = max(dp[i-1], dp[i-2] + array[i])

    # Backtrack to find indices
    indices = []
    i = n - 1
    while i >= 0:
        if i == 0:
            indices.append(0)
            break
        elif i == 1:
            if dp[1] == array[1]:
                indices.append(1)
            else:
                indices.append(0)
            break
        elif dp[i] == dp[i-2] + array[i]:
            indices.append(i)
            i -= 2
        else:
            i -= 1

    return dp[-1], list(reversed(indices))


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    arr1 = [75, 105, 120, 75, 90, 135]
    result1 = max_subset_sum_no_adjacent(arr1)
    print(f"Test 1: {result1}")  # Expected: 330 (75 + 120 + 135)

    # Test 2: Another case
    arr2 = [7, 10, 12, 7, 9, 14]
    result2 = max_subset_sum_no_adjacent(arr2)
    print(f"Test 2: {result2}")  # Expected: 33 (7 + 12 + 14)

    # Test 3: Empty array
    arr3 = []
    result3 = max_subset_sum_no_adjacent(arr3)
    print(f"Test 3: {result3}")  # Expected: 0

    # Test 4: Single element
    arr4 = [5]
    result4 = max_subset_sum_no_adjacent(arr4)
    print(f"Test 4: {result4}")  # Expected: 5

    # Test 5: Two elements
    arr5 = [5, 10]
    result5 = max_subset_sum_no_adjacent(arr5)
    print(f"Test 5: {result5}")  # Expected: 10

    # Test 6: All same values
    arr6 = [10, 10, 10, 10]
    result6 = max_subset_sum_no_adjacent(arr6)
    print(f"Test 6: {result6}")  # Expected: 20 (10 + 10)

    # Test 7: With indices
    arr7 = [75, 105, 120, 75, 90, 135]
    max_sum, indices = max_subset_with_indices(arr7)
    print(f"\nTest 7 - With indices:")
    print(f"  Array: {arr7}")
    print(f"  Max sum: {max_sum}")
    print(f"  Indices: {indices}")
    print(f"  Values: {[arr7[i] for i in indices]}")

    # Test 8: Compare methods
    arr8 = [4, 1, 1, 4, 2, 1]
    result8a = max_subset_sum_no_adjacent(arr8)
    result8b = max_subset_sum_dp_array(arr8)
    print(f"\nTest 8 - Method comparison:")
    print(f"  Optimized: {result8a}")
    print(f"  Full DP: {result8b}")

    print("\nAll tests completed!")
