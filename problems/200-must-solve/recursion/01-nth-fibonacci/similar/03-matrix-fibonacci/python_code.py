"""
Fibonacci with Matrix Exponentiation - Python Solutions

Compute F(n) mod (10^9 + 7) for very large n using O(log n) algorithms.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Tuple, List
from functools import lru_cache

MOD = 10**9 + 7


# ============================================================================
# APPROACH 1: Matrix Exponentiation (Optimal)
# ============================================================================
# Time Complexity:  O(log n)
# Space Complexity: O(1)
#
# WHY THIS IS BEST:
# - Handles n up to 10^18 efficiently
# - Uses binary exponentiation for matrix powers
# - Essential technique for competitive programming
# ============================================================================

def fibonacci_matrix(n: int) -> int:
    """
    Compute F(n) mod MOD using matrix exponentiation.

    Key insight:
    [F(n+1) F(n)  ]   [1 1]^n
    [F(n)   F(n-1)] = [1 0]

    Therefore: F(n) = (base^n)[0][1] or [1][0]

    Args:
        n: The Fibonacci index to compute

    Returns:
        F(n) mod 10^9 + 7

    Examples:
        >>> fibonacci_matrix(10)
        55
        >>> fibonacci_matrix(1000000000) # Computed in microseconds!
        21
    """
    if n == 0:
        return 0
    if n <= 2:
        return 1

    def matrix_mult(a: List[List[int]], b: List[List[int]]) -> List[List[int]]:
        """Multiply two 2x2 matrices with modulo."""
        return [
            [
                (a[0][0] * b[0][0] + a[0][1] * b[1][0]) % MOD,
                (a[0][0] * b[0][1] + a[0][1] * b[1][1]) % MOD,
            ],
            [
                (a[1][0] * b[0][0] + a[1][1] * b[1][0]) % MOD,
                (a[1][0] * b[0][1] + a[1][1] * b[1][1]) % MOD,
            ],
        ]

    def matrix_pow(m: List[List[int]], power: int) -> List[List[int]]:
        """Compute matrix^power using binary exponentiation."""
        # Identity matrix
        result = [[1, 0], [0, 1]]

        while power > 0:
            if power % 2 == 1:
                result = matrix_mult(result, m)
            m = matrix_mult(m, m)
            power //= 2

        return result

    # Base transformation matrix
    base = [[1, 1], [1, 0]]

    # Compute base^(n-1)
    result = matrix_pow(base, n - 1)

    # F(n) is at position [0][0] after raising to power n-1
    return result[0][0]


# ============================================================================
# APPROACH 2: Fast Doubling (Recursive)
# ============================================================================
# Time Complexity:  O(log n)
# Space Complexity: O(log n) for recursion stack
#
# Uses mathematical identities:
# F(2k) = F(k) * [2*F(k+1) - F(k)]
# F(2k+1) = F(k+1)^2 + F(k)^2
# ============================================================================

def fibonacci_fast_doubling(n: int) -> int:
    """
    Compute F(n) using the fast doubling method.

    Mathematical identities used:
    - F(2k) = F(k) * [2*F(k+1) - F(k)]
    - F(2k+1) = F(k+1)^2 + F(k)^2
    """
    if n == 0:
        return 0

    def fib(k: int) -> Tuple[int, int]:
        """Returns (F(k), F(k+1))"""
        if k == 0:
            return 0, 1

        # Get F(k/2) and F(k/2 + 1)
        a, b = fib(k // 2)

        # F(2k) = F(k) * [2*F(k+1) - F(k)]
        c = a * (2 * b - a) % MOD

        # F(2k+1) = F(k+1)^2 + F(k)^2
        d = (a * a + b * b) % MOD

        if k % 2 == 0:
            return c, d
        return d, (c + d) % MOD

    return fib(n)[0]


# ============================================================================
# APPROACH 3: Fast Doubling (Iterative)
# ============================================================================
# Time Complexity:  O(log n)
# Space Complexity: O(1)
#
# Same as fast doubling but iterative using bit manipulation.
# ============================================================================

def fibonacci_iterative_fast(n: int) -> int:
    """
    Iterative fast doubling using bit manipulation.

    No recursion stack needed - true O(1) space.
    """
    if n == 0:
        return 0

    # Find the highest bit position
    high_bit = 1
    while high_bit <= n // 2:
        high_bit <<= 1

    a, b = 0, 1  # F(0), F(1)

    while high_bit > 0:
        # Fast doubling formulas
        d = a * (2 * b - a) % MOD
        e = (a * a + b * b) % MOD

        a, b = d, e

        if n & high_bit:
            # Add 1 to the index
            a, b = b, (a + b) % MOD

        high_bit >>= 1

    return a


# ============================================================================
# APPROACH 4: Using Python's pow() with numpy (Alternative)
# ============================================================================
# For environments with numpy available, this can be even faster
# due to optimized matrix operations.
# ============================================================================

def fibonacci_numpy(n: int) -> int:
    """
    Matrix exponentiation using numpy (if available).

    Note: This is shown for reference; the pure Python version
    is preferred for portability.
    """
    try:
        import numpy as np

        if n == 0:
            return 0
        if n <= 2:
            return 1

        def matrix_pow_np(m, power):
            result = np.array([[1, 0], [0, 1]], dtype=object)
            m = np.array(m, dtype=object)

            while power > 0:
                if power % 2 == 1:
                    result = np.dot(result, m) % MOD
                m = np.dot(m, m) % MOD
                power //= 2

            return result

        base = [[1, 1], [1, 0]]
        result = matrix_pow_np(base, n - 1)
        return int(result[0][0])

    except ImportError:
        # Fallback to pure Python version
        return fibonacci_matrix(n)


# ============================================================================
# APPROACH 5: Standard Iterative (For Comparison)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# Only works for smaller n values.
# ============================================================================

def fibonacci_standard(n: int) -> int:
    """
    Standard iterative Fibonacci - O(n) time.

    Only use for small n values. Shown for comparison.
    """
    if n == 0:
        return 0
    if n <= 2:
        return 1

    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, (a + b) % MOD

    return b


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests() -> None:
    """Run comprehensive tests for all approaches."""

    test_cases = [
        (0, 0, "F(0)"),
        (1, 1, "F(1)"),
        (2, 1, "F(2)"),
        (10, 55, "F(10)"),
        (20, 6765, "F(20)"),
        (50, 12586269025 % MOD, "F(50)"),
        (100, 687995182, "F(100) mod 10^9+7"),
    ]

    approaches = [
        ("Matrix Exponentiation", fibonacci_matrix),
        ("Fast Doubling (Recursive)", fibonacci_fast_doubling),
        ("Fast Doubling (Iterative)", fibonacci_iterative_fast),
        ("Standard Iterative", fibonacci_standard),
    ]

    print("=" * 70)
    print("FIBONACCI WITH MATRIX EXPONENTIATION - TEST RESULTS")
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


def demo_large_n() -> None:
    """Demonstrate computation for very large n values."""
    print("\n" + "=" * 70)
    print("LARGE N DEMONSTRATION (Matrix Exponentiation)")
    print("=" * 70)

    large_n = [1000, 1_000_000, 1_000_000_000, 1_000_000_000_000]

    for n in large_n:
        result = fibonacci_matrix(n)
        print(f"\nF({n:,}) mod 10^9+7 = {result}")


if __name__ == "__main__":
    run_tests()
    demo_large_n()

    print("\n" + "=" * 70)
    print("SAMPLE OUTPUT")
    print("=" * 70)

    print("\nInput: n = 10")
    print(f"Output: {fibonacci_matrix(10)}")

    print("\nInput: n = 1000000000")
    print(f"Output: {fibonacci_matrix(1_000_000_000)}")

    print("\nInput: n = 0")
    print(f"Output: {fibonacci_matrix(0)}")
