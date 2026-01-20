"""
Min Number Of Jumps - Python Solution

Find the minimum number of jumps needed to reach the last index,
where each element represents the maximum jump length from that position.

Time Complexity: O(n) for greedy, O(n^2) for DP
Space Complexity: O(1) for greedy, O(n) for DP
"""

def min_number_of_jumps(array):
    """
    Find minimum jumps to reach end using greedy approach (optimal).

    Args:
        array: List of integers where each represents max jump length

    Returns:
        int: Minimum number of jumps to reach the last index, or -1 if impossible
    """
    n = len(array)

    # Edge case: already at the end
    if n == 1:
        return 0

    # Edge case: can't move from start
    if array[0] == 0:
        return -1

    jumps = 0           # Number of jumps made
    current_end = 0     # Farthest index reachable with current number of jumps
    farthest = 0        # Farthest index reachable overall

    # Iterate through array (don't need to process last element)
    for i in range(n - 1):
        # Update the farthest we can reach from index i
        farthest = max(farthest, i + array[i])

        # When we reach the end of current jump range
        if i == current_end:
            jumps += 1
            current_end = farthest

            # If we can already reach or pass the last index
            if current_end >= n - 1:
                return jumps

            # If farthest hasn't moved beyond current position, we're stuck
            if current_end == i:
                return -1

    return jumps


def min_number_of_jumps_dp(array):
    """
    Find minimum jumps using dynamic programming approach.

    Args:
        array: List of integers where each represents max jump length

    Returns:
        int: Minimum number of jumps to reach the last index, or -1 if impossible
    """
    n = len(array)

    # Edge case: already at the end
    if n == 1:
        return 0

    # dp[i] = minimum jumps to reach index i
    dp = [float('inf')] * n
    dp[0] = 0  # No jumps needed to reach start

    for i in range(n):
        if dp[i] == float('inf'):
            continue  # Can't reach this index

        # Try all possible jumps from index i
        max_reach = min(i + array[i], n - 1)
        for j in range(i + 1, max_reach + 1):
            dp[j] = min(dp[j], dp[i] + 1)

    return dp[n - 1] if dp[n - 1] != float('inf') else -1


def min_jumps_with_path(array):
    """
    Find minimum jumps and return the actual path taken.

    Args:
        array: List of integers where each represents max jump length

    Returns:
        tuple: (min_jumps, path_indices) or (-1, []) if impossible
    """
    n = len(array)

    if n == 1:
        return 0, [0]

    if array[0] == 0:
        return -1, []

    # dp[i] = minimum jumps to reach index i
    # parent[i] = index we jumped from to reach i optimally
    dp = [float('inf')] * n
    parent = [-1] * n
    dp[0] = 0

    for i in range(n):
        if dp[i] == float('inf'):
            continue

        max_reach = min(i + array[i], n - 1)
        for j in range(i + 1, max_reach + 1):
            if dp[i] + 1 < dp[j]:
                dp[j] = dp[i] + 1
                parent[j] = i

    if dp[n - 1] == float('inf'):
        return -1, []

    # Reconstruct path
    path = []
    current = n - 1
    while current != -1:
        path.append(current)
        current = parent[current]

    path.reverse()
    return dp[n - 1], path


# Test cases
if __name__ == "__main__":
    # Test 1: Main example
    arr1 = [3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3]
    result1 = min_number_of_jumps(arr1)
    print(f"Test 1: {result1}")  # Expected: 4

    # Test 2: Can reach in one jump
    arr2 = [2, 1, 1]
    result2 = min_number_of_jumps(arr2)
    print(f"Test 2: {result2}")  # Expected: 1

    # Test 3: Must jump one at a time
    arr3 = [1, 1, 1, 1]
    result3 = min_number_of_jumps(arr3)
    print(f"Test 3: {result3}")  # Expected: 3

    # Test 4: Two elements
    arr4 = [3, 1]
    result4 = min_number_of_jumps(arr4)
    print(f"Test 4: {result4}")  # Expected: 1

    # Test 5: Impossible case
    arr5 = [1, 0, 1]
    result5 = min_number_of_jumps(arr5)
    print(f"Test 5: {result5}")  # Expected: -1

    # Test 6: Single element
    arr6 = [5]
    result6 = min_number_of_jumps(arr6)
    print(f"Test 6: {result6}")  # Expected: 0

    # Test 7: Large jumps available
    arr7 = [5, 1, 1, 1, 1]
    result7 = min_number_of_jumps(arr7)
    print(f"Test 7: {result7}")  # Expected: 1

    # Test 8: Need to be strategic
    arr8 = [2, 3, 1, 1, 4]
    result8 = min_number_of_jumps(arr8)
    print(f"Test 8: {result8}")  # Expected: 2 (0->1->4)

    # Test 9: Start with zero (impossible)
    arr9 = [0, 1, 2, 3]
    result9 = min_number_of_jumps(arr9)
    print(f"Test 9: {result9}")  # Expected: -1

    # Verify both approaches match
    print("\n--- Verifying both approaches ---")
    test_arrays = [
        [3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3],
        [2, 1, 1],
        [1, 1, 1, 1],
        [3, 1],
        [1, 0, 1],
        [5],
        [5, 1, 1, 1, 1],
        [2, 3, 1, 1, 4],
    ]

    for arr in test_arrays:
        greedy = min_number_of_jumps(arr)
        dp = min_number_of_jumps_dp(arr)
        match = "OK" if greedy == dp else "MISMATCH"
        print(f"Array {arr}: Greedy={greedy}, DP={dp} [{match}]")

    # Test with path reconstruction
    print("\n--- Path reconstruction ---")
    arr_path = [3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3]
    jumps, path = min_jumps_with_path(arr_path)
    print(f"Array: {arr_path}")
    print(f"Min jumps: {jumps}")
    print(f"Path (indices): {path}")
    print(f"Values at path: {[arr_path[i] for i in path]}")

    print("\nAll tests completed!")
