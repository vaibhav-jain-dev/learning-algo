"""
Max Profit With K Transactions - Python Solution

Find the maximum profit from at most k stock buy-sell transactions.

Time Complexity: O(n * k)
Space Complexity: O(n * k), can be optimized to O(n)
"""

from typing import List, Tuple


def max_profit_with_k_transactions(prices: List[int], k: int) -> int:
    """
    Find maximum profit with at most k transactions using bottom-up DP.

    Args:
        prices: List of stock prices
        k: Maximum number of transactions allowed

    Returns:
        Maximum profit achievable
    """
    if not prices or k <= 0:
        return 0

    n = len(prices)

    # If k >= n/2, we can make as many transactions as we want
    # Use greedy approach - capture all positive differences
    if k >= n // 2:
        return sum(max(0, prices[i + 1] - prices[i]) for i in range(n - 1))

    # dp[t][d] = max profit with at most t transactions by end of day d
    dp = [[0] * n for _ in range(k + 1)]

    for t in range(1, k + 1):
        # maxSoFar tracks max(dp[t-1][j] - prices[j]) for optimization
        max_so_far = dp[t - 1][0] - prices[0]

        for d in range(1, n):
            # Either don't trade on day d, or sell on day d
            dp[t][d] = max(dp[t][d - 1], prices[d] + max_so_far)

            # Update max_so_far for next iteration
            max_so_far = max(max_so_far, dp[t - 1][d] - prices[d])

    return dp[k][n - 1]


def max_profit_with_k_transactions_basic(prices: List[int], k: int) -> int:
    """
    Basic O(n^2 * k) version without optimization for clarity.

    Args:
        prices: List of stock prices
        k: Maximum number of transactions allowed

    Returns:
        Maximum profit achievable
    """
    if not prices or k <= 0:
        return 0

    n = len(prices)
    dp = [[0] * n for _ in range(k + 1)]

    for t in range(1, k + 1):
        for d in range(1, n):
            # Option 1: Don't trade on day d
            dp[t][d] = dp[t][d - 1]

            # Option 2: Sell on day d, having bought on some day j
            for j in range(d):
                profit_if_buy_on_j = prices[d] - prices[j]
                profit_before = dp[t - 1][j - 1] if j > 0 else 0
                dp[t][d] = max(dp[t][d], profit_if_buy_on_j + profit_before)

    return dp[k][n - 1]


def max_profit_recursive(prices: List[int], k: int) -> int:
    """
    Top-down recursive approach with memoization.

    Args:
        prices: List of stock prices
        k: Maximum number of transactions allowed

    Returns:
        Maximum profit achievable
    """
    if not prices or k <= 0:
        return 0

    n = len(prices)
    memo = {}

    def dp(day: int, transactions_left: int, holding: bool) -> int:
        """
        Returns max profit from day onwards.
        holding: True if currently holding a stock
        """
        if day >= n or transactions_left <= 0:
            return 0

        key = (day, transactions_left, holding)
        if key in memo:
            return memo[key]

        # Option 1: Do nothing
        result = dp(day + 1, transactions_left, holding)

        if holding:
            # Option 2: Sell
            result = max(result, prices[day] + dp(day + 1, transactions_left - 1, False))
        else:
            # Option 2: Buy
            result = max(result, -prices[day] + dp(day + 1, transactions_left, True))

        memo[key] = result
        return result

    return dp(0, k, False)


def max_profit_with_transactions(prices: List[int], k: int) -> Tuple[int, List[Tuple[int, int]]]:
    """
    Return both max profit and the buy-sell day pairs.

    Args:
        prices: List of stock prices
        k: Maximum number of transactions allowed

    Returns:
        Tuple of (max_profit, list of (buy_day, sell_day) pairs)
    """
    if not prices or k <= 0:
        return (0, [])

    n = len(prices)

    # For unlimited transactions case
    if k >= n // 2:
        transactions = []
        profit = 0
        i = 0
        while i < n - 1:
            # Find local minimum (buy point)
            while i < n - 1 and prices[i + 1] <= prices[i]:
                i += 1
            buy = i

            # Find local maximum (sell point)
            while i < n - 1 and prices[i + 1] >= prices[i]:
                i += 1
            sell = i

            if buy < sell:
                profit += prices[sell] - prices[buy]
                transactions.append((buy, sell))

        return (profit, transactions)

    # Track the decision for reconstruction
    dp = [[0] * n for _ in range(k + 1)]
    decision = [[None] * n for _ in range(k + 1)]  # (action, buy_day)

    for t in range(1, k + 1):
        max_so_far = -prices[0]
        best_buy_day = 0

        for d in range(1, n):
            if dp[t][d - 1] >= prices[d] + max_so_far:
                dp[t][d] = dp[t][d - 1]
                decision[t][d] = ('hold', None)
            else:
                dp[t][d] = prices[d] + max_so_far
                decision[t][d] = ('sell', best_buy_day)

            if dp[t - 1][d] - prices[d] > max_so_far:
                max_so_far = dp[t - 1][d] - prices[d]
                best_buy_day = d

    # Reconstruct transactions
    transactions = []
    t = k
    d = n - 1

    while t > 0 and d > 0:
        if decision[t][d] and decision[t][d][0] == 'sell':
            buy_day = decision[t][d][1]
            transactions.append((buy_day, d))
            d = buy_day - 1
            t -= 1
        else:
            d -= 1

    transactions.reverse()

    return (dp[k][n - 1], transactions)


def max_profit_space_optimized(prices: List[int], k: int) -> int:
    """
    Space-optimized version using O(k) space.

    Args:
        prices: List of stock prices
        k: Maximum number of transactions allowed

    Returns:
        Maximum profit achievable
    """
    if not prices or k <= 0:
        return 0

    n = len(prices)

    if k >= n // 2:
        return sum(max(0, prices[i + 1] - prices[i]) for i in range(n - 1))

    # buy[t] = max profit after buying for transaction t
    # sell[t] = max profit after selling for transaction t
    buy = [float('-inf')] * (k + 1)
    sell = [0] * (k + 1)

    for price in prices:
        for t in range(1, k + 1):
            buy[t] = max(buy[t], sell[t - 1] - price)
            sell[t] = max(sell[t], buy[t] + price)

    return sell[k]


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    prices1 = [5, 11, 3, 50, 60, 90]
    k1 = 2
    result1 = max_profit_with_k_transactions(prices1, k1)
    print(f"Test 1: prices={prices1}, k={k1}")
    print(f"  Max profit: {result1}")
    # Expected: 93 (buy at 5, sell at 11, buy at 3, sell at 90)

    # Test 2: Single transaction
    prices2 = [3, 2, 5, 7, 1, 3]
    k2 = 1
    result2 = max_profit_with_k_transactions(prices2, k2)
    print(f"\nTest 2: prices={prices2}, k={k2}")
    print(f"  Max profit: {result2}")
    # Expected: 5 (buy at 2, sell at 7)

    # Test 3: Increasing prices
    prices3 = [1, 2, 3, 4, 5]
    k3 = 2
    result3 = max_profit_with_k_transactions(prices3, k3)
    print(f"\nTest 3: prices={prices3}, k={k3}")
    print(f"  Max profit: {result3}")
    # Expected: 4 (buy at 1, sell at 5)

    # Test 4: Decreasing prices (no profit)
    prices4 = [5, 4, 3, 2, 1]
    k4 = 2
    result4 = max_profit_with_k_transactions(prices4, k4)
    print(f"\nTest 4: prices={prices4}, k={k4}")
    print(f"  Max profit: {result4}")
    # Expected: 0

    # Test 5: Compare methods
    prices5 = [5, 11, 3, 50, 60, 90]
    k5 = 2
    print(f"\nTest 5 - Method comparison for prices={prices5}, k={k5}:")
    print(f"  Optimized: {max_profit_with_k_transactions(prices5, k5)}")
    print(f"  Basic: {max_profit_with_k_transactions_basic(prices5, k5)}")
    print(f"  Recursive: {max_profit_recursive(prices5, k5)}")
    print(f"  Space optimized: {max_profit_space_optimized(prices5, k5)}")

    # Test 6: Get actual transactions
    prices6 = [5, 11, 3, 50, 60, 90]
    k6 = 2
    profit, transactions = max_profit_with_transactions(prices6, k6)
    print(f"\nTest 6 - With transactions for prices={prices6}, k={k6}:")
    print(f"  Max profit: {profit}")
    print(f"  Transactions: {transactions}")
    for buy, sell in transactions:
        print(f"    Buy on day {buy} at ${prices6[buy]}, sell on day {sell} at ${prices6[sell]}")

    # Test 7: Large k (unlimited transactions)
    prices7 = [1, 5, 2, 8, 3, 10]
    k7 = 100
    result7 = max_profit_with_k_transactions(prices7, k7)
    print(f"\nTest 7: prices={prices7}, k={k7}")
    print(f"  Max profit: {result7}")
    # Expected: (5-1) + (8-2) + (10-3) = 4 + 6 + 7 = 17

    # Test 8: Empty/edge cases
    print(f"\nTest 8 - Edge cases:")
    print(f"  Empty prices: {max_profit_with_k_transactions([], 2)}")
    print(f"  k=0: {max_profit_with_k_transactions([1, 2, 3], 0)}")
    print(f"  Single price: {max_profit_with_k_transactions([5], 2)}")

    print("\nAll tests completed!")
