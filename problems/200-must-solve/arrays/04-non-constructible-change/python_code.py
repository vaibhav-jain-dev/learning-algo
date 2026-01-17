"""
Non-Constructible Change - Python Solution

Find the minimum amount of change that cannot be created from given coins.

Time Complexity: O(n log n) for sorting
Space Complexity: O(1) - sorting in place
"""

def non_constructible_change(coins):
    """
    Find minimum change that cannot be created.

    Args:
        coins: List of positive integers representing coin values

    Returns:
        int: Minimum amount of change that cannot be created
    """
    if not coins:
        return 1

    coins.sort()
    current_change = 0

    for coin in coins:
        # If current coin is larger than current_change + 1,
        # we cannot make current_change + 1
        if coin > current_change + 1:
            return current_change + 1

        # We can extend our range by adding this coin
        current_change += coin

    # We can make all values from 1 to current_change
    # So the answer is current_change + 1
    return current_change + 1


def non_constructible_change_explained(coins):
    """Same algorithm with detailed explanation."""
    if not coins:
        return 1

    coins.sort()
    print(f"Sorted coins: {coins}")

    current_change = 0
    print(f"Initially can make: 0")

    for coin in coins:
        if coin > current_change + 1:
            print(f"Coin {coin} > {current_change + 1}, cannot make {current_change + 1}")
            return current_change + 1

        current_change += coin
        print(f"Added coin {coin}, can now make 1 to {current_change}")

    return current_change + 1


# Test cases
if __name__ == "__main__":
    # Test 1: Example from problem
    coins1 = [5, 7, 1, 1, 2, 3, 22]
    result1 = non_constructible_change(coins1)
    print(f"Test 1: {result1}")  # Expected: 20

    # Test 2: All ones
    coins2 = [1, 1, 1, 1, 1]
    result2 = non_constructible_change(coins2)
    print(f"Test 2: {result2}")  # Expected: 6

    # Test 3: Mixed coins
    coins3 = [1, 5, 1, 1, 1, 10, 15, 20, 100]
    result3 = non_constructible_change(coins3)
    print(f"Test 3: {result3}")  # Expected: 55

    # Test 4: Empty array
    coins4 = []
    result4 = non_constructible_change(coins4)
    print(f"Test 4: {result4}")  # Expected: 1

    # Test 5: No coin of value 1
    coins5 = [2, 3, 5]
    result5 = non_constructible_change(coins5)
    print(f"Test 5: {result5}")  # Expected: 1

    # Test 6: Single coin
    coins6 = [1]
    result6 = non_constructible_change(coins6)
    print(f"Test 6: {result6}")  # Expected: 2

    # Test 7: Perfect sequence
    coins7 = [1, 2, 4]
    result7 = non_constructible_change(coins7)
    print(f"Test 7: {result7}")  # Expected: 8 (can make 1-7)

    print("\n--- Detailed walkthrough ---")
    non_constructible_change_explained([1, 1, 2, 3, 5, 7, 22])

    print("\nAll tests completed!")
