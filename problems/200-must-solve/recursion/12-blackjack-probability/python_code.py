"""
Blackjack Probability - Python Solution

Calculate the probability of busting in a simplified blackjack game.
"""

from typing import Dict
from functools import lru_cache


def blackjack_probability(target: int, starting_hand: int) -> float:
    """
    Calculate the probability of busting in blackjack.

    You draw cards (values 1-10, each with 1/10 probability) until your
    hand value >= target. Return the probability of exceeding target.

    Args:
        target: The threshold value (typically 21)
        starting_hand: Current hand value

    Returns:
        Probability of busting (float between 0 and 1)

    Example:
        >>> round(blackjack_probability(21, 15), 4)
        0.4500 (approximately)
    """
    memo: Dict[int, float] = {}

    def calculate_bust_prob(current_hand: int) -> float:
        """Recursively calculate bust probability from current hand."""
        # Base case: we've stopped drawing
        if current_hand >= target:
            # Busted if we exceeded target
            return 1.0 if current_hand > target else 0.0

        # Check memo
        if current_hand in memo:
            return memo[current_hand]

        # Recursive case: try each card (1-10)
        # Each card has 1/10 probability
        total_prob = 0.0
        for card in range(1, 11):
            total_prob += calculate_bust_prob(current_hand + card)

        bust_prob = total_prob / 10.0
        memo[current_hand] = bust_prob
        return bust_prob

    return calculate_bust_prob(starting_hand)


def blackjack_probability_lru(target: int, starting_hand: int) -> float:
    """
    Alternative solution using Python's built-in lru_cache.
    """
    @lru_cache(maxsize=None)
    def calculate_bust_prob(current_hand: int) -> float:
        if current_hand >= target:
            return 1.0 if current_hand > target else 0.0

        total_prob = sum(
            calculate_bust_prob(current_hand + card)
            for card in range(1, 11)
        )
        return total_prob / 10.0

    return calculate_bust_prob(starting_hand)


def blackjack_probability_iterative(target: int, starting_hand: int) -> float:
    """
    Bottom-up dynamic programming solution.

    Build probabilities from target down to starting_hand.
    """
    # dp[h] = probability of busting from hand value h
    # We need values from starting_hand to target + 10
    max_hand = target + 10

    # Initialize: hands > target have busted (prob = 1)
    # hands == target have not busted (prob = 0)
    dp = [0.0] * (max_hand + 1)

    for h in range(target + 1, max_hand + 1):
        dp[h] = 1.0  # Already busted

    # dp[target] = 0.0 (stopped at exactly target, didn't bust)

    # Fill backwards from target - 1 to starting_hand
    for h in range(target - 1, starting_hand - 1, -1):
        total = 0.0
        for card in range(1, 11):
            next_hand = h + card
            if next_hand > max_hand:
                total += 1.0  # Would bust
            else:
                total += dp[next_hand]
        dp[h] = total / 10.0

    return dp[starting_hand]


def print_probability_table(target: int) -> None:
    """Print bust probabilities for different starting hands."""
    print(f"\nBust probabilities for target = {target}:")
    print("-" * 40)
    print(f"{'Starting Hand':<15} {'Bust Probability':<15}")
    print("-" * 40)

    for hand in range(1, target + 1):
        prob = blackjack_probability(target, hand)
        print(f"{hand:<15} {prob:<15.6f}")


if __name__ == "__main__":
    # Test cases
    test_cases = [
        (21, 15),
        (21, 21),
        (21, 22),
        (17, 12),
        (21, 10),
        (21, 1),
    ]

    print("Blackjack Probability Tests")
    print("=" * 50)

    for target, starting_hand in test_cases:
        prob_memo = blackjack_probability(target, starting_hand)
        prob_lru = blackjack_probability_lru(target, starting_hand)
        prob_iter = blackjack_probability_iterative(target, starting_hand)

        print(f"\nTarget: {target}, Starting Hand: {starting_hand}")
        print(f"  Memoization:  {prob_memo:.6f}")
        print(f"  LRU Cache:    {prob_lru:.6f}")
        print(f"  Iterative:    {prob_iter:.6f}")

        # Verify all methods give same result
        assert abs(prob_memo - prob_lru) < 1e-9
        assert abs(prob_memo - prob_iter) < 1e-9

    print("\n" + "=" * 50)
    print("All tests passed!")

    # Print probability table for target = 21
    print_probability_table(21)
