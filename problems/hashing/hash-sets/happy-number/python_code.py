"""
Happy Number

This solution uses a hash set to detect cycles.
"""


def is_happy(n: int) -> bool:
    """
    Determine if n is a happy number.

    Args:
        n: Positive integer

    Returns:
        True if n is happy, False otherwise
    """
    def sum_of_squares(num: int) -> int:
        total = 0
        while num > 0:
            digit = num % 10
            total += digit * digit
            num //= 10
        return total

    seen = set()

    while n != 1 and n not in seen:
        seen.add(n)
        n = sum_of_squares(n)

    return n == 1


def is_happy_floyd(n: int) -> bool:
    """
    Floyd's cycle detection approach - O(1) space.
    """
    def sum_of_squares(num: int) -> int:
        total = 0
        while num > 0:
            digit = num % 10
            total += digit * digit
            num //= 10
        return total

    slow = n
    fast = sum_of_squares(n)

    while fast != 1 and slow != fast:
        slow = sum_of_squares(slow)
        fast = sum_of_squares(sum_of_squares(fast))

    return fast == 1


def is_happy_string(n: int) -> bool:
    """
    Alternative using string conversion for digit extraction.
    """
    seen = set()

    while n != 1 and n not in seen:
        seen.add(n)
        n = sum(int(d) ** 2 for d in str(n))

    return n == 1


def run_tests():
    """Run test cases to verify the solution."""
    test_cases = [
        # (n, expected)
        (19, True),
        (2, False),
        (7, True),
        (1, True),
        (10, True),     # 1 + 0 = 1
        (100, True),    # 1 + 0 + 0 = 1
        (13, True),     # 1 + 9 = 10 -> 1
        (4, False),     # Enters cycle
        (89, False),    # Part of the unhappy cycle
        (82, True),     # Part of 19's path
        (1111111, True),# 7 * 1 = 7 -> happy
    ]

    print("=" * 60)
    print("HAPPY NUMBER - Test Results")
    print("=" * 60)

    all_passed = True
    for i, (n, expected) in enumerate(test_cases, 1):
        result = is_happy(n)
        passed = result == expected
        status = "PASS" if passed else "FAIL"

        if not passed:
            all_passed = False

        print(f"\nTest {i}: {status}")
        print(f"  Input: n = {n}")
        print(f"  Output: {result}")
        print(f"  Expected: {expected}")

    print("\n" + "=" * 60)
    print(f"Overall: {'ALL TESTS PASSED' if all_passed else 'SOME TESTS FAILED'}")
    print("=" * 60)


def demonstrate_approach():
    """Demonstrate how the algorithm works step by step."""
    examples = [19, 2]

    print("\n" + "=" * 60)
    print("STEP-BY-STEP DEMONSTRATION")
    print("=" * 60)

    def sum_of_squares(num: int) -> int:
        total = 0
        original = num
        while num > 0:
            digit = num % 10
            total += digit * digit
            num //= 10
        return total

    for n in examples:
        print(f"\nChecking if {n} is happy:")
        print("-" * 40)

        seen = set()
        current = n
        step = 0

        while current != 1 and current not in seen:
            step += 1
            seen.add(current)

            # Show calculation
            digits = [int(d) for d in str(current)]
            squares = [d * d for d in digits]
            calc = " + ".join(f"{d}^2" for d in digits)
            sum_calc = " + ".join(str(s) for s in squares)
            next_val = sum(squares)

            print(f"Step {step}: {current}")
            print(f"  {calc} = {sum_calc} = {next_val}")

            current = next_val

            if len(seen) > 20:  # Prevent infinite display
                print("  ... (continuing)")
                break

        if current == 1:
            print(f"\nReached 1! {n} is HAPPY")
        else:
            print(f"\nCycle detected at {current}! {n} is NOT HAPPY")


def demonstrate_floyd():
    """Demonstrate Floyd's cycle detection."""
    print("\n" + "=" * 60)
    print("FLOYD'S CYCLE DETECTION DEMONSTRATION")
    print("=" * 60)

    def sum_of_squares(num: int) -> int:
        total = 0
        while num > 0:
            digit = num % 10
            total += digit * digit
            num //= 10
        return total

    n = 2  # Not happy, will cycle

    print(f"\nChecking n = {n} using Floyd's algorithm:")
    print("-" * 40)

    slow = n
    fast = sum_of_squares(n)
    step = 0

    print(f"Initial: slow = {slow}, fast = {fast}")

    while fast != 1 and slow != fast:
        step += 1
        slow = sum_of_squares(slow)
        fast = sum_of_squares(sum_of_squares(fast))
        print(f"Step {step}: slow = {slow}, fast = {fast}")

        if step > 20:
            print("... (continuing)")
            break

    if fast == 1:
        print(f"\nfast reached 1! {n} is HAPPY")
    else:
        print(f"\nslow == fast at {slow}! Cycle detected, {n} is NOT HAPPY")


if __name__ == "__main__":
    run_tests()
    demonstrate_approach()
    demonstrate_floyd()
