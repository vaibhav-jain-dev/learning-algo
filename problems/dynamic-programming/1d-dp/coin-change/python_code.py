"""
Coin Change - Dynamic Programming Solution

Problem: Find the minimum number of coins needed to make up a given amount.
Return -1 if it's not possible.
"""

from typing import List


def coin_change_dp(coins: List[int], amount: int) -> int:
    """
    Bottom-up DP solution.

    Time Complexity: O(amount * len(coins))
    Space Complexity: O(amount)
    """
    # dp[i] = minimum coins needed for amount i
    # Initialize with amount + 1 (impossible value)
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0  # 0 coins needed for amount 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] <= amount else -1


def coin_change_memo(coins: List[int], amount: int) -> int:
    """
    Top-down DP with memoization.

    Time Complexity: O(amount * len(coins))
    Space Complexity: O(amount)
    """
    memo = {}

    def helper(remaining: int) -> int:
        if remaining == 0:
            return 0
        if remaining < 0:
            return float('inf')

        if remaining in memo:
            return memo[remaining]

        min_coins = float('inf')
        for coin in coins:
            result = helper(remaining - coin)
            if result != float('inf'):
                min_coins = min(min_coins, result + 1)

        memo[remaining] = min_coins
        return min_coins

    result = helper(amount)
    return result if result != float('inf') else -1


def coin_change_bfs(coins: List[int], amount: int) -> int:
    """
    BFS solution - finds minimum coins as shortest path.

    Time Complexity: O(amount * len(coins))
    Space Complexity: O(amount)
    """
    if amount == 0:
        return 0

    from collections import deque

    visited = set([0])
    queue = deque([(0, 0)])  # (current_amount, num_coins)

    while queue:
        current, num_coins = queue.popleft()

        for coin in coins:
            new_amount = current + coin

            if new_amount == amount:
                return num_coins + 1

            if new_amount < amount and new_amount not in visited:
                visited.add(new_amount)
                queue.append((new_amount, num_coins + 1))

    return -1


# Test cases
def run_tests():
    test_cases = [
        ([1, 2, 5], 11, 3),
        ([2], 3, -1),
        ([1], 0, 0),
        ([1, 5, 10, 25], 30, 2),
        ([1], 1, 1),
        ([1], 2, 2),
        ([2, 5, 10, 1], 27, 4),  # 10 + 10 + 5 + 2
        ([186, 419, 83, 408], 6249, 20),
        ([1, 2, 5], 100, 20),  # 20 * 5
        ([3, 7], 11, -1),  # Cannot make 11 with 3s and 7s
    ]

    print("=" * 60)
    print("COIN CHANGE - Test Results")
    print("=" * 60)

    for coins, amount, expected in test_cases:
        result_dp = coin_change_dp(coins, amount)
        result_memo = coin_change_memo(coins, amount)
        result_bfs = coin_change_bfs(coins, amount)

        status = "PASS" if result_dp == expected else "FAIL"
        print(f"\ncoins = {coins}, amount = {amount}")
        print(f"  Expected: {expected}")
        print(f"  DP:       {result_dp}")
        print(f"  Memoized: {result_memo}")
        print(f"  BFS:      {result_bfs}")
        print(f"  Status:   {status}")

        assert result_dp == expected, f"DP failed for coins={coins}, amount={amount}"
        assert result_memo == expected, f"Memoized failed for coins={coins}, amount={amount}"
        assert result_bfs == expected, f"BFS failed for coins={coins}, amount={amount}"

    print("\n" + "=" * 60)
    print("All tests passed!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
