"""
Staircase Traversal - Python Solution

Count distinct ways to climb a staircase with variable step sizes.
"""

from typing import Dict


def staircase_traversal(height: int, max_steps: int) -> int:
    """
    Count ways to climb staircase using dynamic programming.

    Args:
        height: Number of steps to climb
        max_steps: Maximum steps you can take at once

    Returns:
        Number of distinct ways to climb

    Example:
        >>> staircase_traversal(4, 2)
        5
    """
    # dp[i] = number of ways to reach step i
    dp = [0] * (height + 1)
    dp[0] = 1  # One way to stay at ground (take no steps)

    for current_step in range(1, height + 1):
        # Sum all ways to reach current step from previous steps
        for step_size in range(1, min(max_steps, current_step) + 1):
            dp[current_step] += dp[current_step - step_size]

    return dp[height]


def staircase_traversal_optimized(height: int, max_steps: int) -> int:
    """
    Count ways using sliding window optimization.

    Maintain running sum instead of recalculating each time.

    Time: O(n), Space: O(n)
    """
    if height <= 1:
        return 1

    dp = [0] * (height + 1)
    dp[0] = 1

    window_sum = 0  # Sum of last max_steps dp values

    for i in range(1, height + 1):
        # Add the previous dp value to window
        start_of_window = i - max_steps - 1

        window_sum += dp[i - 1]

        # Remove value that's now outside window
        if start_of_window >= 0:
            window_sum -= dp[start_of_window]

        dp[i] = window_sum

    return dp[height]


def staircase_traversal_recursive(height: int, max_steps: int) -> int:
    """
    Count ways using memoized recursion.
    """
    memo: Dict[int, int] = {}

    def count_ways(remaining: int) -> int:
        """Count ways to climb remaining steps."""
        if remaining == 0:
            return 1
        if remaining < 0:
            return 0

        if remaining in memo:
            return memo[remaining]

        total = 0
        for step_size in range(1, min(max_steps, remaining) + 1):
            total += count_ways(remaining - step_size)

        memo[remaining] = total
        return total

    return count_ways(height)


def staircase_traversal_space_optimized(height: int, max_steps: int) -> int:
    """
    Count ways using O(maxSteps) space.

    Only keep track of the last max_steps values.
    """
    if height <= 1:
        return 1

    # Circular buffer of size max_steps + 1
    window = [0] * (max_steps + 1)
    window[0] = 1

    window_sum = 1

    for i in range(1, height + 1):
        # Current position in circular buffer
        current_idx = i % (max_steps + 1)

        # The value being replaced exits the window
        old_value = window[current_idx]

        # New value is the current window sum
        window[current_idx] = window_sum

        # Update window sum: add new value, prepare to remove oldest
        # The sum for next iteration
        window_sum = window_sum + window[current_idx] - old_value

    return window[height % (max_steps + 1)]


if __name__ == "__main__":
    # Test case 1
    height1, max_steps1 = 4, 2
    print(f"Height: {height1}, Max Steps: {max_steps1}")
    print(f"DP:          {staircase_traversal(height1, max_steps1)}")
    print(f"Optimized:   {staircase_traversal_optimized(height1, max_steps1)}")
    print(f"Recursive:   {staircase_traversal_recursive(height1, max_steps1)}")

    # Test case 2
    height2, max_steps2 = 3, 3
    print(f"\nHeight: {height2}, Max Steps: {max_steps2}")
    print(f"Output: {staircase_traversal(height2, max_steps2)}")

    # Test case 3
    height3, max_steps3 = 10, 3
    print(f"\nHeight: {height3}, Max Steps: {max_steps3}")
    print(f"Output: {staircase_traversal(height3, max_steps3)}")

    # Test case 4: Large input
    height4, max_steps4 = 20, 5
    print(f"\nHeight: {height4}, Max Steps: {max_steps4}")
    print(f"Output: {staircase_traversal(height4, max_steps4)}")
