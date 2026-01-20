"""
Ways To Traverse Graph - Python Solution

Count the number of ways to traverse from top-left to bottom-right
of a grid, moving only right or down.

Time Complexity: O(width * height) for DP, O(width + height) for math
Space Complexity: O(width) for optimized DP, O(1) for math
"""

def ways_to_traverse_graph(width, height):
    """
    Find number of ways to traverse grid using space-optimized DP.

    Args:
        width: Number of columns in the grid
        height: Number of rows in the grid

    Returns:
        int: Number of unique paths from top-left to bottom-right
    """
    # Use 1D array - only need current row
    dp = [1] * width  # First row: only 1 way to reach each cell

    for row in range(1, height):
        for col in range(1, width):
            # Current cell = cell above (dp[col]) + cell to left (dp[col-1])
            dp[col] = dp[col] + dp[col - 1]

    return dp[width - 1]


def ways_to_traverse_graph_2d(width, height):
    """
    Find number of ways using 2D DP table (easier to understand).

    Args:
        width: Number of columns in the grid
        height: Number of rows in the grid

    Returns:
        int: Number of unique paths from top-left to bottom-right
    """
    # Create 2D table
    dp = [[0] * width for _ in range(height)]

    # Base case: first row - only one way to reach each cell (go right)
    for col in range(width):
        dp[0][col] = 1

    # Base case: first column - only one way to reach each cell (go down)
    for row in range(height):
        dp[row][0] = 1

    # Fill the rest of the table
    for row in range(1, height):
        for col in range(1, width):
            dp[row][col] = dp[row - 1][col] + dp[row][col - 1]

    return dp[height - 1][width - 1]


def ways_to_traverse_graph_math(width, height):
    """
    Find number of ways using mathematical combinatorics.

    The path requires (width-1) right moves and (height-1) down moves.
    Total moves = width + height - 2
    We need to choose which moves are "right" (or "down").
    Answer = C(width + height - 2, width - 1)

    Args:
        width: Number of columns in the grid
        height: Number of rows in the grid

    Returns:
        int: Number of unique paths from top-left to bottom-right
    """
    # Calculate C(n, r) = n! / (r! * (n-r)!)
    # where n = width + height - 2, r = width - 1

    # Use the smaller value for r to minimize calculations
    x_dist = width - 1
    y_dist = height - 1

    # Choose smaller of x_dist and y_dist for efficiency
    if x_dist < y_dist:
        x_dist, y_dist = y_dist, x_dist

    # Calculate C(x_dist + y_dist, y_dist)
    # = (x_dist + y_dist)! / (x_dist! * y_dist!)
    # = (x_dist + 1) * (x_dist + 2) * ... * (x_dist + y_dist) / y_dist!

    numerator = 1
    denominator = 1

    for i in range(1, y_dist + 1):
        numerator *= (x_dist + i)
        denominator *= i

    return numerator // denominator


def ways_to_traverse_recursive(width, height, memo=None):
    """
    Find number of ways using recursion with memoization.

    Args:
        width: Number of columns remaining
        height: Number of rows remaining
        memo: Memoization dictionary

    Returns:
        int: Number of unique paths
    """
    if memo is None:
        memo = {}

    # Base cases
    if width == 1 or height == 1:
        return 1

    # Check memo
    key = (width, height)
    if key in memo:
        return memo[key]

    # Recursive case: sum of going right and going down
    result = (ways_to_traverse_recursive(width - 1, height, memo) +
              ways_to_traverse_recursive(width, height - 1, memo))

    memo[key] = result
    return result


# Test cases
if __name__ == "__main__":
    # Test 1: Example from problem
    result1 = ways_to_traverse_graph(4, 3)
    print(f"Test 1 (4x3 grid): {result1}")  # Expected: 10

    # Test 2: 2x2 grid
    result2 = ways_to_traverse_graph(2, 2)
    print(f"Test 2 (2x2 grid): {result2}")  # Expected: 2

    # Test 3: 3x3 grid
    result3 = ways_to_traverse_graph(3, 3)
    print(f"Test 3 (3x3 grid): {result3}")  # Expected: 6

    # Test 4: Single column
    result4 = ways_to_traverse_graph(1, 5)
    print(f"Test 4 (1x5 grid): {result4}")  # Expected: 1

    # Test 5: Single row
    result5 = ways_to_traverse_graph(5, 1)
    print(f"Test 5 (5x1 grid): {result5}")  # Expected: 1

    # Test 6: 1x1 grid (just start = end)
    result6 = ways_to_traverse_graph(1, 1)
    print(f"Test 6 (1x1 grid): {result6}")  # Expected: 1

    # Test 7: Larger grid
    result7 = ways_to_traverse_graph(5, 5)
    print(f"Test 7 (5x5 grid): {result7}")  # Expected: 70

    # Test 8: 2x3 grid (from problem description)
    result8 = ways_to_traverse_graph(2, 3)
    print(f"Test 8 (2x3 grid): {result8}")  # Expected: 3

    # Verify all approaches give same result
    print("\n--- Verifying all approaches ---")
    test_width, test_height = 6, 4
    r1 = ways_to_traverse_graph(test_width, test_height)
    r2 = ways_to_traverse_graph_2d(test_width, test_height)
    r3 = ways_to_traverse_graph_math(test_width, test_height)
    r4 = ways_to_traverse_recursive(test_width, test_height)
    print(f"Grid {test_width}x{test_height}:")
    print(f"  Space-optimized DP: {r1}")
    print(f"  2D DP: {r2}")
    print(f"  Mathematical: {r3}")
    print(f"  Recursive with memo: {r4}")
    print(f"  All match: {r1 == r2 == r3 == r4}")

    # Test 9: Large grid to demonstrate efficiency
    result9 = ways_to_traverse_graph_math(20, 20)
    print(f"\nTest 9 (20x20 grid): {result9}")  # Expected: 35345263800

    print("\nAll tests completed!")
