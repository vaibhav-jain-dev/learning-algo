"""
Power of N - Calculate x^n Efficiently

This module demonstrates multiple approaches to calculate x^n:
1. Naive approach (O(n) time)
2. Recursive exponentiation by squaring (O(log n) time)
3. Iterative exponentiation by squaring (O(log n) time, O(1) space)
"""


def power_naive(x: float, n: int) -> float:
    """
    Calculate x^n using naive multiplication.

    Time Complexity: O(n)
    Space Complexity: O(1)

    Args:
        x: The base
        n: The exponent

    Returns:
        x raised to the power n
    """
    if n == 0:
        return 1.0

    if n < 0:
        x = 1 / x
        n = -n

    result = 1.0
    for _ in range(n):
        result *= x

    return result


def power_recursive(x: float, n: int) -> float:
    """
    Calculate x^n using recursive exponentiation by squaring.

    Time Complexity: O(log n)
    Space Complexity: O(log n) - recursion stack

    The key insight:
    - x^n = (x^(n/2))^2 when n is even
    - x^n = x * x^(n-1) when n is odd
    """
    # Base cases
    if n == 0:
        return 1.0

    # Handle negative exponents
    if n < 0:
        return 1.0 / power_recursive(x, -n)

    # Recursive case
    if n % 2 == 0:
        # n is even: x^n = (x^(n/2))^2
        half = power_recursive(x, n // 2)
        return half * half
    else:
        # n is odd: x^n = x * x^(n-1)
        return x * power_recursive(x, n - 1)


def power_iterative(x: float, n: int) -> float:
    """
    Calculate x^n using iterative exponentiation by squaring.

    Time Complexity: O(log n)
    Space Complexity: O(1) - most efficient!

    This approach uses binary representation of n.
    """
    if n == 0:
        return 1.0

    # Handle negative exponents
    if n < 0:
        x = 1 / x
        n = -n

    result = 1.0

    while n > 0:
        # If current bit is 1, multiply result by current x
        if n % 2 == 1:
            result *= x

        # Square x for next bit
        x *= x

        # Move to next bit
        n //= 2

    return result


def power_with_trace(x: float, n: int, depth: int = 0) -> float:
    """
    Calculate x^n with detailed trace output for learning purposes.
    """
    indent = "  " * depth

    print(f"{indent}power({x}, {n})")

    # Base case
    if n == 0:
        print(f"{indent}  -> Base case: return 1.0")
        return 1.0

    # Handle negative exponents
    if n < 0:
        print(f"{indent}  -> Negative exponent: computing 1/power({x}, {-n})")
        result = 1.0 / power_with_trace(x, -n, depth + 1)
        print(f"{indent}  -> Result: {result}")
        return result

    # Recursive case
    if n % 2 == 0:
        print(f"{indent}  -> Even exponent: computing power({x}, {n//2})^2")
        half = power_with_trace(x, n // 2, depth + 1)
        result = half * half
        print(f"{indent}  -> {half}^2 = {result}")
        return result
    else:
        print(f"{indent}  -> Odd exponent: computing {x} * power({x}, {n-1})")
        rest = power_with_trace(x, n - 1, depth + 1)
        result = x * rest
        print(f"{indent}  -> {x} * {rest} = {result}")
        return result


def test_power():
    """Run comprehensive tests for all power implementations."""

    print("=" * 60)
    print("POWER OF N - CALCULATE x^n EFFICIENTLY")
    print("=" * 60)

    # Test cases: (x, n, expected)
    test_cases = [
        (2.0, 0, 1.0),
        (2.0, 1, 2.0),
        (2.0, 10, 1024.0),
        (2.0, -2, 0.25),
        (3.0, 3, 27.0),
        (5.0, 4, 625.0),
        (-2.0, 3, -8.0),
        (-2.0, 4, 16.0),
        (0.5, 3, 0.125),
        (2.0, 20, 1048576.0),
    ]

    # Test recursive approach
    print("\n1. Testing Recursive Exponentiation by Squaring:")
    print("-" * 50)
    for x, n, expected in test_cases:
        result = power_recursive(x, n)
        status = "PASS" if abs(result - expected) < 1e-9 else "FAIL"
        print(f"   {x}^{n} = {result:.6f} [{status}]")

    # Test iterative approach
    print("\n2. Testing Iterative Exponentiation by Squaring:")
    print("-" * 50)
    for x, n, expected in test_cases:
        result = power_iterative(x, n)
        status = "PASS" if abs(result - expected) < 1e-9 else "FAIL"
        print(f"   {x}^{n} = {result:.6f} [{status}]")

    # Demonstrate the trace
    print("\n3. Trace of power(2, 10):")
    print("-" * 50)
    result = power_with_trace(2.0, 10)
    print(f"\nFinal Result: 2^10 = {result}")

    # Demonstrate with negative exponent
    print("\n4. Trace of power(2, -3):")
    print("-" * 50)
    result = power_with_trace(2.0, -3)
    print(f"\nFinal Result: 2^(-3) = {result}")

    # Compare efficiency
    print("\n5. Efficiency Comparison (computing 2^30):")
    print("-" * 50)
    import time

    # Count multiplications for naive
    naive_count = 30  # n multiplications

    # Count multiplications for recursive
    # 2^30 -> 2^15 -> 2^14 -> 2^7 -> 2^6 -> 2^3 -> 2^2 -> 2^1 -> 2^0
    # That's about log2(30) = ~5 multiplications

    print(f"   Naive approach: ~{naive_count} multiplications")
    print(f"   Squaring approach: ~{30 .bit_length()} multiplications")

    # Time comparison for large exponent
    n_large = 10000

    start = time.perf_counter()
    result_iter = power_iterative(1.0001, n_large)
    time_iter = time.perf_counter() - start

    print(f"\n   Computing 1.0001^{n_large}:")
    print(f"   Iterative squaring: {time_iter*1000:.4f} ms")
    print(f"   Result: {result_iter:.6f}")

    # Edge cases
    print("\n6. Edge Cases:")
    print("-" * 50)
    edge_cases = [
        (0, 5, "0^5"),
        (1, 1000000, "1^1000000"),
        (2, 0, "2^0"),
        (-1, 100, "(-1)^100"),
        (-1, 101, "(-1)^101"),
    ]

    for x, n, desc in edge_cases:
        result = power_recursive(float(x), n)
        print(f"   {desc} = {result}")

    print("\n" + "=" * 60)
    print("ALL TESTS COMPLETED!")
    print("=" * 60)


if __name__ == "__main__":
    test_power()
