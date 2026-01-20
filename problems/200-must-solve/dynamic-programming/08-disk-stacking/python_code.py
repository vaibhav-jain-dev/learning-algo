"""
Disk Stacking - Python Solution

Find the stack of disks with maximum total height where each disk
must be strictly smaller in all dimensions than the disk below it.

Time Complexity: O(n^2)
Space Complexity: O(n)
"""

from typing import List


def disk_stacking(disks: List[List[int]]) -> List[List[int]]:
    """
    Find the maximum height stack of disks using bottom-up DP.

    Args:
        disks: List of [width, depth, height] for each disk

    Returns:
        List of disks forming the maximum height stack
    """
    if not disks:
        return []

    # Sort disks by height (or any dimension) to ensure valid ordering
    sorted_disks = sorted(disks, key=lambda x: x[2])

    n = len(sorted_disks)

    # dp[i] = maximum height achievable ending with disk i
    dp = [disk[2] for disk in sorted_disks]

    # prev[i] = index of previous disk in the optimal stack ending at i
    prev = [-1] * n

    # Fill DP table
    for i in range(1, n):
        for j in range(i):
            # Check if disk j can go below disk i
            if can_stack(sorted_disks[j], sorted_disks[i]):
                if dp[j] + sorted_disks[i][2] > dp[i]:
                    dp[i] = dp[j] + sorted_disks[i][2]
                    prev[i] = j

    # Find the disk with maximum height
    max_height = max(dp)
    max_idx = dp.index(max_height)

    # Backtrack to build the stack
    stack = []
    current = max_idx
    while current != -1:
        stack.append(sorted_disks[current])
        current = prev[current]

    stack.reverse()
    return stack


def can_stack(below: List[int], above: List[int]) -> bool:
    """
    Check if 'above' disk can be placed on top of 'below' disk.
    All dimensions of 'above' must be strictly less than 'below'.

    Args:
        below: [width, depth, height] of bottom disk
        above: [width, depth, height] of top disk

    Returns:
        True if above can be stacked on below
    """
    return (below[0] < above[0] and
            below[1] < above[1] and
            below[2] < above[2])


def disk_stacking_max_height(disks: List[List[int]]) -> int:
    """
    Return only the maximum stack height (simpler version).

    Args:
        disks: List of [width, depth, height] for each disk

    Returns:
        Maximum achievable stack height
    """
    if not disks:
        return 0

    sorted_disks = sorted(disks, key=lambda x: x[2])
    n = len(sorted_disks)

    dp = [disk[2] for disk in sorted_disks]

    for i in range(1, n):
        for j in range(i):
            if can_stack(sorted_disks[j], sorted_disks[i]):
                dp[i] = max(dp[i], dp[j] + sorted_disks[i][2])

    return max(dp)


def disk_stacking_recursive(disks: List[List[int]]) -> List[List[int]]:
    """
    Top-down recursive approach with memoization.

    Args:
        disks: List of [width, depth, height] for each disk

    Returns:
        List of disks forming the maximum height stack
    """
    if not disks:
        return []

    sorted_disks = sorted(disks, key=lambda x: x[2])
    n = len(sorted_disks)
    memo = {}

    def dp(i: int) -> int:
        """Returns max height achievable ending at disk i."""
        if i in memo:
            return memo[i]

        result = sorted_disks[i][2]

        for j in range(i):
            if can_stack(sorted_disks[j], sorted_disks[i]):
                result = max(result, dp(j) + sorted_disks[i][2])

        memo[i] = result
        return result

    # Compute dp for all disks
    max_height = 0
    max_idx = 0
    for i in range(n):
        val = dp(i)
        if val > max_height:
            max_height = val
            max_idx = i

    # Reconstruct stack
    stack = []
    current_height = max_height
    current_idx = max_idx

    while current_idx >= 0:
        disk = sorted_disks[current_idx]
        if memo[current_idx] == current_height:
            stack.append(disk)
            current_height -= disk[2]
            # Find previous disk
            found = False
            for j in range(current_idx - 1, -1, -1):
                if (can_stack(sorted_disks[j], disk) and
                        memo[j] == current_height):
                    current_idx = j
                    found = True
                    break
            if not found:
                break
        else:
            current_idx -= 1

    stack.reverse()
    return stack


def disk_stacking_with_count(disks: List[List[int]]) -> dict:
    """
    Returns detailed information about the solution.

    Args:
        disks: List of [width, depth, height] for each disk

    Returns:
        Dictionary with solution details
    """
    stack = disk_stacking(disks)
    total_height = sum(disk[2] for disk in stack)

    return {
        'stack': stack,
        'num_disks': len(stack),
        'total_height': total_height,
        'original_count': len(disks)
    }


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    disks1 = [[2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [1, 3, 1], [4, 4, 5]]
    result1 = disk_stacking(disks1)
    print(f"Test 1: disks = {disks1}")
    print(f"  Stack: {result1}")
    print(f"  Height: {sum(d[2] for d in result1)}")
    # Expected: [[2, 1, 2], [3, 2, 3], [4, 4, 5]], height = 10

    # Test 2: Single disk
    disks2 = [[2, 1, 2]]
    result2 = disk_stacking(disks2)
    print(f"\nTest 2: disks = {disks2}")
    print(f"  Stack: {result2}")
    # Expected: [[2, 1, 2]]

    # Test 3: All stackable
    disks3 = [[1, 1, 1], [2, 2, 2], [3, 3, 3]]
    result3 = disk_stacking(disks3)
    print(f"\nTest 3: disks = {disks3}")
    print(f"  Stack: {result3}")
    print(f"  Height: {sum(d[2] for d in result3)}")
    # Expected: [[1, 1, 1], [2, 2, 2], [3, 3, 3]], height = 6

    # Test 4: No stacking possible (all same dimensions)
    disks4 = [[2, 2, 2], [2, 2, 2], [2, 2, 2]]
    result4 = disk_stacking(disks4)
    print(f"\nTest 4: disks = {disks4}")
    print(f"  Stack: {result4}")
    # Expected: single disk

    # Test 5: Empty input
    disks5 = []
    result5 = disk_stacking(disks5)
    print(f"\nTest 5: disks = {disks5}")
    print(f"  Stack: {result5}")
    # Expected: []

    # Test 6: Compare methods
    disks6 = [[2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [1, 3, 1], [4, 4, 5]]
    print(f"\nTest 6 - Method comparison:")
    print(f"  Bottom-up: {disk_stacking(disks6)}")
    print(f"  Recursive: {disk_stacking_recursive(disks6)}")
    print(f"  Max height only: {disk_stacking_max_height(disks6)}")

    # Test 7: Detailed output
    disks7 = [[2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [1, 3, 1], [4, 4, 5]]
    detail = disk_stacking_with_count(disks7)
    print(f"\nTest 7 - Detailed output:")
    for key, val in detail.items():
        print(f"  {key}: {val}")

    # Test 8: More complex case
    disks8 = [[3, 3, 4], [2, 2, 3], [1, 1, 2], [4, 4, 5], [5, 5, 6]]
    result8 = disk_stacking(disks8)
    print(f"\nTest 8: disks = {disks8}")
    print(f"  Stack: {result8}")
    print(f"  Height: {sum(d[2] for d in result8)}")
    # Expected: all 5 disks stacked, height = 20

    print("\nAll tests completed!")
