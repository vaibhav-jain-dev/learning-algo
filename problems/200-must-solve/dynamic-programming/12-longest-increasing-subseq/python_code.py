"""
Longest Increasing Subsequence - Python Solution

Find the longest strictly increasing subsequence in an array.

Time Complexity: O(n^2) for DP, O(n log n) for binary search
Space Complexity: O(n)
"""

from typing import List
import bisect


def longest_increasing_subsequence(array: List[int]) -> List[int]:
    """
    Find LIS using bottom-up DP (O(n^2)).

    Args:
        array: List of integers

    Returns:
        List representing the longest increasing subsequence
    """
    if not array:
        return []

    n = len(array)

    # dp[i] = length of LIS ending at index i
    dp = [1] * n

    # prev[i] = index of previous element in LIS ending at i
    prev = [-1] * n

    # Fill DP table
    for i in range(1, n):
        for j in range(i):
            if array[j] < array[i] and dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
                prev[i] = j

    # Find index with maximum LIS length
    max_length = max(dp)
    max_idx = dp.index(max_length)

    # Reconstruct LIS
    lis = []
    current = max_idx
    while current != -1:
        lis.append(array[current])
        current = prev[current]

    lis.reverse()
    return lis


def longest_increasing_subsequence_binary(array: List[int]) -> List[int]:
    """
    Find LIS using binary search (O(n log n)).

    Args:
        array: List of integers

    Returns:
        List representing the longest increasing subsequence
    """
    if not array:
        return []

    n = len(array)

    # tails[i] = smallest ending element of all LIS of length i+1
    tails = []

    # For reconstruction
    # prev[i] = index of previous element for array[i] in LIS
    # pos[i] = position (length-1) of array[i] in tails
    prev = [-1] * n
    indices = []  # indices[i] = index in array for tails[i]

    for i in range(n):
        # Binary search for position
        pos = bisect.bisect_left(tails, array[i])

        if pos == len(tails):
            tails.append(array[i])
            indices.append(i)
        else:
            tails[pos] = array[i]
            indices[pos] = i

        # Update previous pointer
        if pos > 0:
            prev[i] = indices[pos - 1]

    # Reconstruct LIS
    lis = []
    current = indices[-1]
    while current != -1:
        lis.append(array[current])
        current = prev[current]

    lis.reverse()
    return lis


def lis_length(array: List[int]) -> int:
    """
    Return only the length of LIS (O(n log n)).

    Args:
        array: List of integers

    Returns:
        Length of LIS
    """
    if not array:
        return 0

    tails = []

    for num in array:
        pos = bisect.bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num

    return len(tails)


def lis_recursive(array: List[int]) -> List[int]:
    """
    Top-down recursive approach with memoization.

    Args:
        array: List of integers

    Returns:
        List representing the longest increasing subsequence
    """
    if not array:
        return []

    n = len(array)
    memo = {}

    def dp(i: int) -> int:
        """Returns length of LIS ending at index i."""
        if i in memo:
            return memo[i]

        result = 1

        for j in range(i):
            if array[j] < array[i]:
                result = max(result, dp(j) + 1)

        memo[i] = result
        return result

    # Compute dp for all indices
    max_length = 0
    max_idx = 0
    for i in range(n):
        length = dp(i)
        if length > max_length:
            max_length = length
            max_idx = i

    # Reconstruct LIS
    lis = []
    current_length = max_length
    current_idx = max_idx

    while current_idx >= 0 and current_length > 0:
        if memo[current_idx] == current_length:
            lis.append(array[current_idx])
            current_length -= 1
            # Find previous element
            for j in range(current_idx - 1, -1, -1):
                if array[j] < array[current_idx] and memo[j] == current_length:
                    current_idx = j
                    break
            else:
                break
        else:
            current_idx -= 1

    lis.reverse()
    return lis


def count_lis(array: List[int]) -> int:
    """
    Count the number of longest increasing subsequences.

    Args:
        array: List of integers

    Returns:
        Number of LIS with maximum length
    """
    if not array:
        return 0

    n = len(array)

    # dp[i] = length of LIS ending at i
    dp = [1] * n

    # count[i] = number of LIS of length dp[i] ending at i
    count = [1] * n

    for i in range(1, n):
        for j in range(i):
            if array[j] < array[i]:
                if dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
                    count[i] = count[j]
                elif dp[j] + 1 == dp[i]:
                    count[i] += count[j]

    max_length = max(dp)
    return sum(count[i] for i in range(n) if dp[i] == max_length)


def all_lis(array: List[int]) -> List[List[int]]:
    """
    Return all longest increasing subsequences.

    Args:
        array: List of integers

    Returns:
        List of all LIS
    """
    if not array:
        return [[]]

    n = len(array)
    dp = [1] * n
    prev_list = [[] for _ in range(n)]

    for i in range(1, n):
        for j in range(i):
            if array[j] < array[i]:
                if dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
                    prev_list[i] = [j]
                elif dp[j] + 1 == dp[i]:
                    prev_list[i].append(j)

    max_length = max(dp)
    max_indices = [i for i in range(n) if dp[i] == max_length]

    def backtrack(idx: int) -> List[List[int]]:
        if not prev_list[idx]:
            return [[array[idx]]]

        results = []
        for prev_idx in prev_list[idx]:
            for seq in backtrack(prev_idx):
                results.append(seq + [array[idx]])

        return results

    all_sequences = []
    for idx in max_indices:
        all_sequences.extend(backtrack(idx))

    return all_sequences


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    arr1 = [5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35]
    result1 = longest_increasing_subsequence(arr1)
    print(f"Test 1: {arr1}")
    print(f"  LIS: {result1} (length {len(result1)})")
    # Expected: [-24, 2, 3, 5, 6, 35] or similar

    # Test 2: Another case
    arr2 = [10, 9, 2, 5, 3, 7, 101, 18]
    result2 = longest_increasing_subsequence(arr2)
    print(f"\nTest 2: {arr2}")
    print(f"  LIS: {result2} (length {len(result2)})")
    # Expected: [2, 3, 7, 101] or [2, 3, 7, 18] or similar

    # Test 3: With zeros
    arr3 = [0, 1, 0, 3, 2, 3]
    result3 = longest_increasing_subsequence(arr3)
    print(f"\nTest 3: {arr3}")
    print(f"  LIS: {result3} (length {len(result3)})")
    # Expected: [0, 1, 2, 3]

    # Test 4: All same
    arr4 = [5, 5, 5, 5]
    result4 = longest_increasing_subsequence(arr4)
    print(f"\nTest 4: {arr4}")
    print(f"  LIS: {result4} (length {len(result4)})")
    # Expected: [5] (length 1)

    # Test 5: Decreasing
    arr5 = [5, 4, 3, 2, 1]
    result5 = longest_increasing_subsequence(arr5)
    print(f"\nTest 5: {arr5}")
    print(f"  LIS: {result5} (length {len(result5)})")
    # Expected: any single element

    # Test 6: Compare methods
    arr6 = [5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35]
    print(f"\nTest 6 - Method comparison for {arr6}:")
    print(f"  DP (O(n^2)): {longest_increasing_subsequence(arr6)}")
    print(f"  Binary (O(n log n)): {longest_increasing_subsequence_binary(arr6)}")
    print(f"  Recursive: {lis_recursive(arr6)}")
    print(f"  Length only: {lis_length(arr6)}")

    # Test 7: Count LIS
    arr7 = [1, 3, 5, 4, 7]
    count = count_lis(arr7)
    print(f"\nTest 7 - Count LIS for {arr7}:")
    print(f"  Number of LIS: {count}")
    # Expected: 2 ([1, 3, 5, 7] and [1, 3, 4, 7])

    # Test 8: All LIS
    arr8 = [1, 3, 5, 4, 7]
    all_sequences = all_lis(arr8)
    print(f"\nTest 8 - All LIS for {arr8}:")
    for seq in all_sequences:
        print(f"  {seq}")

    # Test 9: Single element
    arr9 = [42]
    result9 = longest_increasing_subsequence(arr9)
    print(f"\nTest 9: {arr9}")
    print(f"  LIS: {result9}")
    # Expected: [42]

    # Test 10: Empty
    arr10 = []
    result10 = longest_increasing_subsequence(arr10)
    print(f"\nTest 10: {arr10}")
    print(f"  LIS: {result10}")
    # Expected: []

    print("\nAll tests completed!")
