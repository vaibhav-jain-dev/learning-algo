"""
Ambiguous Measurements - Python Solution

Determine if a target volume can be measured using cups with ambiguous markings.
"""

from typing import List, Dict, Tuple


def ambiguous_measurements(cups: List[List[int]], target: int) -> bool:
    """
    Determine if target can be measured using cups with ranges.

    Each cup measures between [low, high] ml. A measurement is successful
    if target falls within the achievable range.

    Args:
        cups: List of [low, high] measurement ranges
        target: Target volume to measure

    Returns:
        True if target can be measured, False otherwise

    Example:
        >>> ambiguous_measurements([[200, 210], [450, 465], [800, 850]], 2100)
        True
    """
    # Memoization: (currentLow, currentHigh) -> bool
    memo: Dict[Tuple[int, int], bool] = {}

    def can_measure(current_low: int, current_high: int) -> bool:
        """
        Check if target can be reached from current range.

        Args:
            current_low: Minimum achievable volume
            current_high: Maximum achievable volume
        """
        # Success: target is within achievable range
        if current_low <= target <= current_high:
            return True

        # Pruning: overshot, can't go back down
        if current_low > target:
            return False

        # Check memo
        state = (current_low, current_high)
        if state in memo:
            return memo[state]

        # Try adding each cup
        for low, high in cups:
            if can_measure(current_low + low, current_high + high):
                memo[state] = True
                return True

        memo[state] = False
        return False

    return can_measure(0, 0)


def ambiguous_measurements_iterative(cups: List[List[int]], target: int) -> bool:
    """
    Iterative BFS approach to find if target is achievable.
    """
    from collections import deque

    # State: (currentLow, currentHigh)
    visited = set()
    queue = deque([(0, 0)])
    visited.add((0, 0))

    while queue:
        current_low, current_high = queue.popleft()

        # Success check
        if current_low <= target <= current_high:
            return True

        # Skip if overshot
        if current_low > target:
            continue

        # Try adding each cup
        for low, high in cups:
            new_state = (current_low + low, current_high + high)
            if new_state not in visited:
                visited.add(new_state)
                queue.append(new_state)

    return False


def ambiguous_measurements_dp(cups: List[List[int]], target: int) -> bool:
    """
    Dynamic programming approach using achievable ranges.

    Track all achievable (low, high) pairs up to target.
    """
    # Set of achievable (low, high) ranges
    achievable = {(0, 0)}

    # Keep expanding until no new ranges are found
    changed = True
    while changed:
        changed = False
        new_ranges = set()

        for current_low, current_high in achievable:
            # Check if we've found the target
            if current_low <= target <= current_high:
                return True

            # Skip if already overshot
            if current_low > target:
                continue

            # Try adding each cup
            for low, high in cups:
                new_range = (current_low + low, current_high + high)
                if new_range not in achievable and new_range[0] <= target:
                    new_ranges.add(new_range)
                    changed = True

        achievable.update(new_ranges)

    # Final check
    for current_low, current_high in achievable:
        if current_low <= target <= current_high:
            return True

    return False


if __name__ == "__main__":
    # Test case 1
    cups1 = [[200, 210], [450, 465], [800, 850]]
    target1 = 2100
    print(f"Cups: {cups1}")
    print(f"Target: {target1}")
    print(f"Recursive: {ambiguous_measurements(cups1, target1)}")
    print(f"Iterative: {ambiguous_measurements_iterative(cups1, target1)}")

    # Test case 2
    cups2 = [[100, 150]]
    target2 = 200
    print(f"\nCups: {cups2}")
    print(f"Target: {target2}")
    print(f"Result: {ambiguous_measurements(cups2, target2)}")

    # Test case 3
    cups3 = [[50, 60]]
    target3 = 75
    print(f"\nCups: {cups3}")
    print(f"Target: {target3}")
    print(f"Result: {ambiguous_measurements(cups3, target3)}")

    # Test case 4
    cups4 = [[1, 2], [3, 5]]
    target4 = 10
    print(f"\nCups: {cups4}")
    print(f"Target: {target4}")
    print(f"Result: {ambiguous_measurements(cups4, target4)}")
