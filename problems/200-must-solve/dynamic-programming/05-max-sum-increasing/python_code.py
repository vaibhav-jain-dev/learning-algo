"""
Max Sum Increasing Subsequence - Python Solution

Find the greatest sum from a strictly increasing subsequence and return
the indices of elements in that subsequence.

Time Complexity: O(n^2)
Space Complexity: O(n)
"""

from typing import List, Tuple


def max_sum_increasing_subsequence(array: List[int]) -> Tuple[int, List[int]]:
    """
    Find the maximum sum increasing subsequence with indices.

    Args:
        array: List of integers

    Returns:
        Tuple of (max_sum, list_of_indices)
    """
    if not array:
        return (0, [])

    n = len(array)

    # dp[i] = maximum sum of increasing subsequence ending at index i
    dp = array[:]  # Initialize with each element as its own subsequence

    # prev[i] = index of previous element in the optimal subsequence ending at i
    prev = [None] * n

    # Build the DP table
    for i in range(1, n):
        for j in range(i):
            # If array[j] < array[i], we can extend the subsequence
            if array[j] < array[i]:
                if dp[j] + array[i] > dp[i]:
                    dp[i] = dp[j] + array[i]
                    prev[i] = j

    # Find the index with maximum sum
    max_sum = max(dp)
    max_idx = dp.index(max_sum)

    # Backtrack to reconstruct the subsequence
    indices = []
    current = max_idx
    while current is not None:
        indices.append(current)
        current = prev[current]

    indices.reverse()

    return (max_sum, indices)


def max_sum_increasing_subsequence_values(array: List[int]) -> Tuple[int, List[int]]:
    """
    Returns the actual values instead of indices.

    Args:
        array: List of integers

    Returns:
        Tuple of (max_sum, list_of_values)
    """
    max_sum, indices = max_sum_increasing_subsequence(array)
    values = [array[i] for i in indices]
    return (max_sum, values)


def max_sum_increasing_dp_only(array: List[int]) -> int:
    """
    Simplified version that only returns the maximum sum.

    Args:
        array: List of integers

    Returns:
        Maximum sum of increasing subsequence
    """
    if not array:
        return 0

    n = len(array)
    dp = array[:]

    for i in range(1, n):
        for j in range(i):
            if array[j] < array[i]:
                dp[i] = max(dp[i], dp[j] + array[i])

    return max(dp)


def max_sum_increasing_recursive(array: List[int]) -> Tuple[int, List[int]]:
    """
    Top-down recursive approach with memoization.

    Args:
        array: List of integers

    Returns:
        Tuple of (max_sum, list_of_indices)
    """
    if not array:
        return (0, [])

    n = len(array)
    memo = {}

    def dp(idx: int) -> int:
        """Returns max sum of increasing subsequence ending at idx."""
        if idx in memo:
            return memo[idx]

        result = array[idx]

        for j in range(idx):
            if array[j] < array[idx]:
                result = max(result, dp(j) + array[idx])

        memo[idx] = result
        return result

    # Compute dp values for all indices
    max_sum = float('-inf')
    max_idx = 0
    for i in range(n):
        val = dp(i)
        if val > max_sum:
            max_sum = val
            max_idx = i

    # Reconstruct the subsequence by backtracking
    indices = []
    current_val = max_sum
    current_idx = max_idx

    while current_idx >= 0:
        if memo[current_idx] == current_val:
            indices.append(current_idx)
            current_val -= array[current_idx]
            # Find previous element
            found = False
            for j in range(current_idx - 1, -1, -1):
                if array[j] < array[current_idx] and memo[j] == current_val:
                    current_idx = j
                    found = True
                    break
            if not found:
                break
        else:
            current_idx -= 1

    indices.reverse()
    return (max_sum, indices)


def all_max_sum_increasing_subsequences(array: List[int]) -> List[List[int]]:
    """
    Find all subsequences that achieve the maximum sum.

    Args:
        array: List of integers

    Returns:
        List of all optimal subsequences (as index lists)
    """
    if not array:
        return [[]]

    n = len(array)
    dp = array[:]
    prev_lists = [[] for _ in range(n)]

    for i in range(1, n):
        for j in range(i):
            if array[j] < array[i]:
                if dp[j] + array[i] > dp[i]:
                    dp[i] = dp[j] + array[i]
                    prev_lists[i] = [j]
                elif dp[j] + array[i] == dp[i]:
                    prev_lists[i].append(j)

    max_sum = max(dp)
    max_indices = [i for i in range(n) if dp[i] == max_sum]

    def backtrack(idx: int) -> List[List[int]]:
        if not prev_lists[idx]:
            return [[idx]]

        results = []
        for prev_idx in prev_lists[idx]:
            for path in backtrack(prev_idx):
                results.append(path + [idx])
        return results

    all_subsequences = []
    for idx in max_indices:
        all_subsequences.extend(backtrack(idx))

    return all_subsequences


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    arr1 = [10, 70, 20, 30, 50, 11, 30]
    result1 = max_sum_increasing_subsequence(arr1)
    print(f"Test 1: {arr1}")
    print(f"  Result: sum={result1[0]}, indices={result1[1]}")
    print(f"  Values: {[arr1[i] for i in result1[1]]}")
    # Expected: sum=110, indices=[0, 2, 3, 4] (10+20+30+50)

    # Test 2: Another case
    arr2 = [8, 12, 2, 3, 15, 5, 7]
    result2 = max_sum_increasing_subsequence(arr2)
    print(f"\nTest 2: {arr2}")
    print(f"  Result: sum={result2[0]}, indices={result2[1]}")
    print(f"  Values: {[arr2[i] for i in result2[1]]}")
    # Expected: sum=35, indices=[0, 1, 4] (8+12+15)

    # Test 3: All increasing
    arr3 = [1, 2, 3, 4, 5]
    result3 = max_sum_increasing_subsequence(arr3)
    print(f"\nTest 3: {arr3}")
    print(f"  Result: sum={result3[0]}, indices={result3[1]}")
    # Expected: sum=15, indices=[0, 1, 2, 3, 4]

    # Test 4: All decreasing
    arr4 = [5, 4, 3, 2, 1]
    result4 = max_sum_increasing_subsequence(arr4)
    print(f"\nTest 4: {arr4}")
    print(f"  Result: sum={result4[0]}, indices={result4[1]}")
    # Expected: sum=5, indices=[0]

    # Test 5: Single element
    arr5 = [10]
    result5 = max_sum_increasing_subsequence(arr5)
    print(f"\nTest 5: {arr5}")
    print(f"  Result: sum={result5[0]}, indices={result5[1]}")
    # Expected: sum=10, indices=[0]

    # Test 6: With negative numbers
    arr6 = [-1, 5, 2, 3, 10, 4]
    result6 = max_sum_increasing_subsequence(arr6)
    print(f"\nTest 6: {arr6}")
    print(f"  Result: sum={result6[0]}, indices={result6[1]}")
    print(f"  Values: {[arr6[i] for i in result6[1]]}")

    # Test 7: Compare methods
    arr7 = [10, 70, 20, 30, 50, 11, 30]
    print(f"\nTest 7 - Method comparison for {arr7}:")
    print(f"  DP: {max_sum_increasing_subsequence(arr7)}")
    print(f"  Values: {max_sum_increasing_subsequence_values(arr7)}")
    print(f"  Sum only: {max_sum_increasing_dp_only(arr7)}")

    # Test 8: All optimal subsequences
    arr8 = [1, 2, 10, 3, 4, 5]
    all_seqs = all_max_sum_increasing_subsequences(arr8)
    print(f"\nTest 8 - All optimal subsequences for {arr8}:")
    for seq in all_seqs:
        print(f"  Indices: {seq}, Values: {[arr8[i] for i in seq]}")

    print("\nAll tests completed!")
