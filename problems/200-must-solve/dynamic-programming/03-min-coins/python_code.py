"""
Min Number Of Coins For Change - Python Solution

Find minimum coins needed to make a target amount.

Time Complexity: O(n * d) where d is number of denominations
Space Complexity: O(n)
"""

def min_number_of_coins_for_change(n, denoms):
    """
    Find minimum coins to make target amount.

    Args:
        n: Target amount
        denoms: List of coin denominations

    Returns:
        int: Minimum coins needed, or -1 if impossible
    """
    # dp[i] = min coins to make amount i
    dp = [float('inf')] * (n + 1)
    dp[0] = 0  # Base case: 0 coins for amount 0

    for amount in range(1, n + 1):
        for coin in denoms:
            if coin <= amount and dp[amount - coin] != float('inf'):
                dp[amount] = min(dp[amount], dp[amount - coin] + 1)

    return dp[n] if dp[n] != float('inf') else -1


def min_coins_with_solution(n, denoms):
    """Return both min coins and the actual coins used."""
    dp = [float('inf')] * (n + 1)
    parent = [-1] * (n + 1)
    dp[0] = 0

    for amount in range(1, n + 1):
        for coin in denoms:
            if coin <= amount and dp[amount - coin] != float('inf'):
                if dp[amount - coin] + 1 < dp[amount]:
                    dp[amount] = dp[amount - coin] + 1
                    parent[amount] = coin

    if dp[n] == float('inf'):
        return -1, []

    # Reconstruct solution
    coins_used = []
    current = n
    while current > 0:
        coin = parent[current]
        coins_used.append(coin)
        current -= coin

    return dp[n], coins_used


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    result1 = min_number_of_coins_for_change(7, [1, 5, 10])
    print(f"Test 1 (n=7, [1,5,10]): {result1}")  # Expected: 3 (5+1+1)

    # Test 2: Optimal uses larger coins
    result2 = min_number_of_coins_for_change(6, [1, 2, 4])
    print(f"Test 2 (n=6, [1,2,4]): {result2}")  # Expected: 2 (4+2)

    # Test 3: Impossible
    result3 = min_number_of_coins_for_change(3, [2])
    print(f"Test 3 (n=3, [2]): {result3}")  # Expected: -1

    # Test 4: Zero amount
    result4 = min_number_of_coins_for_change(0, [1, 2, 3])
    print(f"Test 4 (n=0, [1,2,3]): {result4}")  # Expected: 0

    # Test 5: Exact match with one coin
    result5 = min_number_of_coins_for_change(10, [1, 5, 10])
    print(f"Test 5 (n=10, [1,5,10]): {result5}")  # Expected: 1

    # Test 6: Only single denomination
    result6 = min_number_of_coins_for_change(12, [3])
    print(f"Test 6 (n=12, [3]): {result6}")  # Expected: 4

    # Test 7: Classic coin change
    result7 = min_number_of_coins_for_change(11, [1, 5, 6, 9])
    print(f"Test 7 (n=11, [1,5,6,9]): {result7}")  # Expected: 2 (5+6)

    # Test 8: With solution reconstruction
    n8 = 15
    denoms8 = [1, 5, 10, 25]
    count, coins = min_coins_with_solution(n8, denoms8)
    print(f"\nTest 8 (n={n8}, {denoms8}):")
    print(f"  Min coins: {count}")
    print(f"  Coins used: {coins}")
    print(f"  Sum: {sum(coins)}")

    # Test 9: Greedy doesn't work
    result9 = min_number_of_coins_for_change(6, [1, 3, 4])
    print(f"\nTest 9 (n=6, [1,3,4]): {result9}")  # Expected: 2 (3+3)
    # Note: Greedy would give 3 (4+1+1)

    print("\nAll tests completed!")
