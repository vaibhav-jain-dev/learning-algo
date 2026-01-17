"""
N-th Tribonacci Number - Python Solutions

T(n) = T(n-1) + T(n-2) + T(n-3) with T(0)=0, T(1)=1, T(2)=1

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from functools import lru_cache
from typing import List


# ============================================================================
# APPROACH 1: Iterative (Optimal) - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# WHY THIS IS BEST:
# - Only uses 3 variables (constant space)
# - Simple sliding window technique
# - No recursion overhead or stack space
# ============================================================================

def tribonacci(n: int) -> int:
    """
    Compute the n-th Tribonacci number iteratively.

    Key insight: We only need the last 3 values at any point.
    Use tuple unpacking for elegant sliding window.

    Args:
        n: The index of the Tribonacci number to compute (0-indexed)

    Returns:
        The n-th Tribonacci number

    Examples:
        >>> tribonacci(4)
        4
        >>> tribonacci(25)
        1389537
    """
    if n == 0:
        return 0
    if n <= 2:
        return 1

    # Track last 3 values using tuple unpacking
    a, b, c = 0, 1, 1

    for _ in range(3, n + 1):
        # Pythonic tuple assignment for sliding window
        a, b, c = b, c, a + b + c

    return c


# ============================================================================
# APPROACH 2: Memoization with lru_cache
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) for cache
#
# WHEN TO USE:
# - When top-down thinking is more intuitive
# - Python's lru_cache makes this very clean
# ============================================================================

def tribonacci_memo(n: int) -> int:
    """
    Compute Tribonacci using memoization.

    Uses Python's functools.lru_cache for automatic memoization.
    """
    @lru_cache(maxsize=None)
    def dp(i: int) -> int:
        if i == 0:
            return 0
        if i <= 2:
            return 1
        return dp(i - 1) + dp(i - 2) + dp(i - 3)

    return dp(n)


# ============================================================================
# APPROACH 3: Matrix Exponentiation - O(log n)
# ============================================================================
# Time Complexity:  O(log n)
# Space Complexity: O(1)
#
# WHEN TO USE:
# - When n is extremely large (millions or billions)
# - When O(n) is too slow
# ============================================================================

def tribonacci_matrix(n: int) -> int:
    """
    Compute T(n) in O(log n) time using matrix exponentiation.

    The recurrence can be expressed as matrix multiplication:
    [T(n+2)]   [1 1 1]^n   [T(2)]
    [T(n+1)] = [1 0 0]   * [T(1)]
    [T(n)  ]   [0 1 0]     [T(0)]
    """
    if n == 0:
        return 0
    if n <= 2:
        return 1

    def matrix_mult(a: List[List[int]], b: List[List[int]]) -> List[List[int]]:
        """Multiply two 3x3 matrices."""
        result = [[0] * 3 for _ in range(3)]
        for i in range(3):
            for j in range(3):
                for k in range(3):
                    result[i][j] += a[i][k] * b[k][j]
        return result

    def matrix_pow(m: List[List[int]], power: int) -> List[List[int]]:
        """Compute matrix^power using binary exponentiation."""
        # Identity matrix
        result = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

        while power > 0:
            if power % 2 == 1:
                result = matrix_mult(result, m)
            m = matrix_mult(m, m)
            power //= 2

        return result

    # Transformation matrix
    m = [[1, 1, 1], [1, 0, 0], [0, 1, 0]]

    # Compute M^(n-2)
    result = matrix_pow(m, n - 2)

    # T(n) = result[0][0]*1 + result[0][1]*1 + result[0][2]*0
    return result[0][0] + result[0][1]


# ============================================================================
# APPROACH 4: Dynamic Programming with Array
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - When you need to access all values T(0) to T(n)
# - More intuitive for beginners
# ============================================================================

def tribonacci_dp_array(n: int) -> int:
    """
    Compute Tribonacci using a DP array.

    Useful when you need all intermediate values.
    """
    if n == 0:
        return 0
    if n <= 2:
        return 1

    dp = [0] * (n + 1)
    dp[1] = dp[2] = 1

    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3]

    return dp[n]


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests() -> None:
    """Run comprehensive tests for all approaches."""

    test_cases = [
        (0, 0, "T(0) = 0"),
        (1, 1, "T(1) = 1"),
        (2, 1, "T(2) = 1"),
        (3, 2, "T(3) = 0+1+1 = 2"),
        (4, 4, "T(4) = 1+1+2 = 4"),
        (5, 7, "T(5) = 1+2+4 = 7"),
        (10, 149, "T(10)"),
        (25, 1389537, "T(25) - larger value"),
    ]

    approaches = [
        ("Iterative (Optimal)", tribonacci),
        ("Memoization", tribonacci_memo),
        ("Matrix Exponentiation", tribonacci_matrix),
        ("DP Array", tribonacci_dp_array),
    ]

    print("=" * 70)
    print("N-TH TRIBONACCI NUMBER - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for n, expected, desc in test_cases:
            result = func(n)
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  [{status}] {desc}: got {result}, expected {expected}")

        if all_passed:
            print("  All tests passed!")


if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("SAMPLE OUTPUT")
    print("=" * 70)

    print("\nInput: n = 4")
    print(f"Output: {tribonacci(4)}")

    print("\nInput: n = 25")
    print(f"Output: {tribonacci(25)}")

    print("\nInput: n = 0")
    print(f"Output: {tribonacci(0)}")
