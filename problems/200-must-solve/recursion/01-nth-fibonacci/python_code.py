"""
Nth Fibonacci - Python Solution

Compute the nth Fibonacci number.

Time Complexity: O(n) iterative, O(2^n) naive recursive
Space Complexity: O(1) iterative
"""

def get_nth_fib(n):
    """
    Get nth Fibonacci number (1-indexed).
    F1=0, F2=1, F3=1, F4=2, F5=3, F6=5...

    Args:
        n: Position in Fibonacci sequence (1-indexed)

    Returns:
        int: The nth Fibonacci number
    """
    if n == 1:
        return 0
    if n == 2:
        return 1

    prev_prev = 0
    prev = 1

    for _ in range(3, n + 1):
        current = prev + prev_prev
        prev_prev = prev
        prev = current

    return prev


def get_nth_fib_recursive(n, memo=None):
    """Recursive with memoization - O(n) time, O(n) space."""
    if memo is None:
        memo = {}

    if n in memo:
        return memo[n]
    if n == 1:
        return 0
    if n == 2:
        return 1

    memo[n] = get_nth_fib_recursive(n - 1, memo) + get_nth_fib_recursive(n - 2, memo)
    return memo[n]


def get_nth_fib_naive(n):
    """Naive recursive - O(2^n) time. Only for small n."""
    if n == 1:
        return 0
    if n == 2:
        return 1
    return get_nth_fib_naive(n - 1) + get_nth_fib_naive(n - 2)


# Test cases
if __name__ == "__main__":
    # Test 1: n = 6
    result1 = get_nth_fib(6)
    print(f"Test 1 (n=6): {result1}")  # Expected: 5

    # Test 2: n = 1
    result2 = get_nth_fib(1)
    print(f"Test 2 (n=1): {result2}")  # Expected: 0

    # Test 3: n = 2
    result3 = get_nth_fib(2)
    print(f"Test 3 (n=2): {result3}")  # Expected: 1

    # Test 4: n = 10
    result4 = get_nth_fib(10)
    print(f"Test 4 (n=10): {result4}")  # Expected: 34

    # Test 5: First 15 Fibonacci numbers
    print("\nFirst 15 Fibonacci numbers:")
    fibs = [get_nth_fib(i) for i in range(1, 16)]
    print(f"  {fibs}")
    # Expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]

    # Test 6: Compare methods
    n = 20
    print(f"\nTest 6 - Compare methods for n={n}:")
    print(f"  Iterative: {get_nth_fib(n)}")
    print(f"  Memoized:  {get_nth_fib_recursive(n)}")
    print(f"  Naive:     {get_nth_fib_naive(n)}")  # Still OK for n=20

    # Test 7: Large n
    result7 = get_nth_fib(50)
    print(f"\nTest 7 (n=50): {result7}")  # Expected: 7778742049

    print("\nAll tests completed!")
