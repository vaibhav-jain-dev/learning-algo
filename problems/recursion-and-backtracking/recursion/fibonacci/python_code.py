"""
Fibonacci Number with Memoization

This module demonstrates multiple approaches to calculate Fibonacci numbers:
1. Naive recursion (exponential time)
2. Memoization with dictionary (linear time)
3. Memoization with functools.lru_cache (linear time)
4. Iterative approach (linear time, constant space)
"""

from functools import lru_cache
from typing import Dict


def fibonacci_naive(n: int) -> int:
    """
    Calculate nth Fibonacci number using naive recursion.

    Time Complexity: O(2^n) - exponential
    Space Complexity: O(n) - recursion stack

    WARNING: Very slow for n > 35
    """
    if n <= 0:
        return 0
    if n == 1:
        return 1
    return fibonacci_naive(n - 1) + fibonacci_naive(n - 2)


def fibonacci_memo(n: int, memo: Dict[int, int] = None) -> int:
    """
    Calculate nth Fibonacci number using memoization with a dictionary.

    Time Complexity: O(n)
    Space Complexity: O(n)

    Args:
        n: The index of the Fibonacci number to calculate
        memo: Dictionary to store computed values

    Returns:
        The nth Fibonacci number
    """
    if memo is None:
        memo = {}

    # Base cases
    if n <= 0:
        return 0
    if n == 1:
        return 1

    # Check if already computed
    if n in memo:
        return memo[n]

    # Compute and store in memo
    memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)

    return memo[n]


@lru_cache(maxsize=None)
def fibonacci_lru(n: int) -> int:
    """
    Calculate nth Fibonacci number using Python's built-in lru_cache.

    Time Complexity: O(n)
    Space Complexity: O(n)

    The @lru_cache decorator automatically handles memoization.
    """
    if n <= 0:
        return 0
    if n == 1:
        return 1
    return fibonacci_lru(n - 1) + fibonacci_lru(n - 2)


def fibonacci_iterative(n: int) -> int:
    """
    Calculate nth Fibonacci number iteratively.

    Time Complexity: O(n)
    Space Complexity: O(1) - most efficient!

    This approach only keeps track of the last two numbers.
    """
    if n <= 0:
        return 0
    if n == 1:
        return 1

    prev2, prev1 = 0, 1

    for _ in range(2, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current

    return prev1


def fibonacci_with_trace(n: int, memo: Dict[int, int] = None, depth: int = 0) -> int:
    """
    Calculate Fibonacci with detailed trace output for learning purposes.
    """
    indent = "  " * depth

    if memo is None:
        memo = {}

    if n <= 0:
        print(f"{indent}fib({n}) = 0 [base case]")
        return 0
    if n == 1:
        print(f"{indent}fib({n}) = 1 [base case]")
        return 1

    if n in memo:
        print(f"{indent}fib({n}) = {memo[n]} [cached]")
        return memo[n]

    print(f"{indent}Computing fib({n})...")

    result1 = fibonacci_with_trace(n - 1, memo, depth + 1)
    result2 = fibonacci_with_trace(n - 2, memo, depth + 1)

    memo[n] = result1 + result2
    print(f"{indent}fib({n}) = {memo[n]} [computed: {result1} + {result2}]")

    return memo[n]


def test_fibonacci():
    """Run comprehensive tests for all Fibonacci implementations."""

    print("=" * 60)
    print("FIBONACCI NUMBER WITH MEMOIZATION")
    print("=" * 60)

    # Test cases
    test_cases = [
        (0, 0),
        (1, 1),
        (2, 1),
        (5, 5),
        (10, 55),
        (20, 6765),
        (30, 832040),
        (40, 102334155),
    ]

    # Test memoization approach
    print("\n1. Testing Memoization Approach:")
    print("-" * 40)
    for n, expected in test_cases:
        result = fibonacci_memo(n)
        status = "PASS" if result == expected else "FAIL"
        print(f"   fib({n}) = {result} [{status}]")

    # Test LRU cache approach
    print("\n2. Testing LRU Cache Approach:")
    print("-" * 40)
    fibonacci_lru.cache_clear()  # Clear cache for fresh test
    for n, expected in test_cases:
        result = fibonacci_lru(n)
        status = "PASS" if result == expected else "FAIL"
        print(f"   fib({n}) = {result} [{status}]")

    # Test iterative approach
    print("\n3. Testing Iterative Approach:")
    print("-" * 40)
    for n, expected in test_cases:
        result = fibonacci_iterative(n)
        status = "PASS" if result == expected else "FAIL"
        print(f"   fib({n}) = {result} [{status}]")

    # Demonstrate the trace
    print("\n4. Trace of fib(6) with Memoization:")
    print("-" * 40)
    result = fibonacci_with_trace(6)
    print(f"\nFinal Result: fib(6) = {result}")

    # Show first 15 Fibonacci numbers
    print("\n5. First 15 Fibonacci Numbers:")
    print("-" * 40)
    fib_sequence = [fibonacci_memo(i) for i in range(15)]
    print(f"   {fib_sequence}")

    # Large number test
    print("\n6. Large Number Test:")
    print("-" * 40)
    large_n = 100
    result = fibonacci_memo(large_n)
    print(f"   fib({large_n}) = {result}")

    print("\n" + "=" * 60)
    print("ALL TESTS COMPLETED!")
    print("=" * 60)


if __name__ == "__main__":
    test_fibonacci()
