"""
Paint House - Python Solutions

Paint n houses with 3 colors such that no two adjacent houses have the same color.
Minimize total painting cost.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

import math


# ============================================================================
# APPROACH 1: Dynamic Programming (Space-Optimized)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1) - only track 3 values
#
# WHY THIS IS BEST:
# - Optimal time and space complexity
# - Clean transition logic
# - Easy to understand
# ============================================================================

def min_cost(costs: list[list[int]]) -> int:
    """
    Find minimum cost to paint all houses.

    Key Insight: For each house and color, the cost is:
        cost[i][c] + min(dp[i-1][other colors])

    We only need the previous house's costs, so O(1) space.

    Visual for costs = [[17,2,17],[16,16,5],[14,3,19]]:
        House 0: R=17, B=2, G=17
        House 1: R=16+min(2,17)=18, B=16+min(17,17)=33, G=5+min(17,2)=7
        House 2: R=14+min(33,7)=21, B=3+min(18,7)=10, G=19+min(18,33)=37
        Answer: min(21, 10, 37) = 10
    """
    if not costs:
        return 0

    n = len(costs)

    # Previous house costs for each color
    prev_red = costs[0][0]
    prev_blue = costs[0][1]
    prev_green = costs[0][2]

    for i in range(1, n):
        # Current costs (must use different color from previous)
        curr_red = costs[i][0] + min(prev_blue, prev_green)
        curr_blue = costs[i][1] + min(prev_red, prev_green)
        curr_green = costs[i][2] + min(prev_red, prev_blue)

        prev_red, prev_blue, prev_green = curr_red, curr_blue, curr_green

    return min(prev_red, prev_blue, prev_green)


# ============================================================================
# APPROACH 2: DP with Full Table (for path reconstruction)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - Need to know which color was used for each house
# - Debugging and visualization
# ============================================================================

def min_cost_with_path(costs: list[list[int]]) -> tuple[int, list[str]]:
    """
    Return minimum cost and the colors used for each house.

    Useful for understanding and debugging.
    """
    if not costs:
        return 0, []

    n = len(costs)
    colors = ["Red", "Blue", "Green"]

    # dp[i][c] = minimum cost to paint houses 0..i with house i being color c
    dp = [[0] * 3 for _ in range(n)]

    # Base case
    dp[0][0] = costs[0][0]
    dp[0][1] = costs[0][1]
    dp[0][2] = costs[0][2]

    # Fill DP table
    for i in range(1, n):
        dp[i][0] = costs[i][0] + min(dp[i - 1][1], dp[i - 1][2])
        dp[i][1] = costs[i][1] + min(dp[i - 1][0], dp[i - 1][2])
        dp[i][2] = costs[i][2] + min(dp[i - 1][0], dp[i - 1][1])

    # Find minimum and trace back
    min_cost_val = min(dp[n - 1])
    last_color = dp[n - 1].index(min_cost_val)

    # Trace back the path
    path = [""] * n
    path[n - 1] = colors[last_color]
    curr_color = last_color

    for i in range(n - 2, -1, -1):
        # Find which color was used
        for c in range(3):
            if c != curr_color and dp[i][c] + costs[i + 1][curr_color] == dp[i + 1][curr_color]:
                path[i] = colors[c]
                curr_color = c
                break

    return min_cost_val, path


# ============================================================================
# APPROACH 3: Paint House II (K Colors)
# ============================================================================
# Time Complexity:  O(n * k)
# Space Complexity: O(k)
#
# EXTENSION: When there are k colors instead of 3.
# Optimization: Track min and second-min to avoid O(k^2).
# ============================================================================

def min_cost_k(costs: list[list[int]]) -> int:
    """
    Handle k colors efficiently.

    Key Optimization: For each house, we only need:
    - The minimum cost from previous house
    - The second minimum cost (in case min color is the same)

    This reduces from O(n*k^2) to O(n*k).
    """
    if not costs:
        return 0

    n = len(costs)
    k = len(costs[0])

    if k == 0:
        return 0
    if k == 1:
        return costs[0][0] if n == 1 else -1  # Impossible

    # Track minimum, second minimum, and the index of minimum
    prev_min = 0
    prev_second_min = 0
    prev_min_idx = -1

    # Initialize from first house
    for c in range(k):
        if prev_min_idx == -1 or costs[0][c] < prev_min:
            prev_second_min = prev_min
            prev_min = costs[0][c]
            prev_min_idx = c
        elif costs[0][c] < prev_second_min:
            prev_second_min = costs[0][c]

    # Process each house
    for i in range(1, n):
        curr_min = math.inf
        curr_second_min = math.inf
        curr_min_idx = -1

        for c in range(k):
            # If this color is same as prev min, use second min
            if c == prev_min_idx:
                cost = costs[i][c] + prev_second_min
            else:
                cost = costs[i][c] + prev_min

            # Update current min/secondMin
            if cost < curr_min:
                curr_second_min = curr_min
                curr_min = cost
                curr_min_idx = c
            elif cost < curr_second_min:
                curr_second_min = cost

        prev_min = curr_min
        prev_second_min = curr_second_min
        prev_min_idx = curr_min_idx

    return prev_min


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (costs, expected, description)
        ([[17, 2, 17], [16, 16, 5], [14, 3, 19]], 10, "Example 1"),
        ([[7, 6, 2]], 2, "Single house"),
        ([[1, 2, 3], [1, 2, 3]], 3, "Two houses"),
        ([[5, 8, 6], [19, 14, 13], [7, 5, 12], [14, 15, 17], [3, 20, 10]], 43, "Five houses"),
        ([], 0, "Empty"),
        ([[1, 1, 1], [1, 1, 1], [1, 1, 1]], 3, "All same cost"),
    ]

    print("=" * 70)
    print("PAINT HOUSE - TEST RESULTS")
    print("=" * 70)

    approaches = [
        ("Space-Optimized DP", min_cost),
        ("K Colors Version", min_cost_k),
    ]

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for costs, expected, desc in test_cases:
            result = func(costs)
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  [{status}] {desc}: got {result}, expected {expected}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")


# ============================================================================
# SAMPLE INPUT (matches problem examples)
# ============================================================================

if __name__ == "__main__":
    run_tests()

    # Show path example
    print("\n" + "=" * 70)
    print("PATH RECONSTRUCTION EXAMPLE")
    print("=" * 70)
    costs = [[17, 2, 17], [16, 16, 5], [14, 3, 19]]
    min_cost_val, path = min_cost_with_path(costs)
    print(f"\ncosts = {costs}")
    print(f"Minimum cost = {min_cost_val}")
    print(f"Colors used = {path}")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    costs = [[17, 2, 17], [16, 16, 5], [14, 3, 19]]
    print(f"\nInput: costs = {costs}")
    print(f"Output: {min_cost(costs)}")

    # Sample Input 2
    costs = [[7, 6, 2]]
    print(f"\nInput: costs = {costs}")
    print(f"Output: {min_cost(costs)}")
