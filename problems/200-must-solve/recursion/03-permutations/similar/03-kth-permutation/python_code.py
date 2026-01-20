"""
Kth Permutation Sequence - Python Solutions

Given n and k, return the k-th permutation sequence of [1, 2, ..., n].

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List
from math import factorial


# ============================================================================
# APPROACH 1: Factorial Number System (Optimal)
# ============================================================================
# Time Complexity:  O(n^2) - n iterations, each with O(n) list removal
# Space Complexity: O(n) - for available list and result
#
# WHY THIS IS BEST:
# - Directly calculates the k-th permutation without generating all permutations
# - Much faster than naive approach for large n
# - Clean mathematical solution
# ============================================================================

def get_permutation(n: int, k: int) -> str:
    """
    Return the k-th permutation sequence of [1, 2, ..., n].

    Uses the factorial number system to directly calculate each digit.

    The key insight is that permutations are grouped by their first digit:
    - With n-1 remaining digits, there are (n-1)! permutations starting with each digit
    - We can determine which digit goes in each position using integer division

    Args:
        n: Number of elements (1 to n)
        k: 1-indexed position of the desired permutation

    Returns:
        The k-th permutation as a string

    Examples:
        >>> get_permutation(3, 3)
        '213'
        >>> get_permutation(4, 9)
        '2314'
    """
    # Precompute factorials
    factorials = [1] * (n + 1)
    for i in range(1, n + 1):
        factorials[i] = factorials[i - 1] * i

    # Available digits to choose from
    available = list(range(1, n + 1))

    # Convert to 0-indexed for easier math
    k -= 1

    result = []

    for i in range(n):
        # Size of each block at this level
        block_size = factorials[n - 1 - i]

        # Which block does k fall into?
        index = k // block_size

        # Pick the digit at that index
        result.append(str(available[index]))

        # Remove the picked digit from available
        available.pop(index)

        # Update k to position within the block
        k %= block_size

    return ''.join(result)


# ============================================================================
# APPROACH 2: Recursive Solution
# ============================================================================
# Time Complexity:  O(n^2)
# Space Complexity: O(n) for recursion stack
#
# WHEN TO USE:
# - When recursive thinking is more intuitive
# - Same logic, different implementation
# ============================================================================

def get_permutation_recursive(n: int, k: int) -> str:
    """
    Recursive version of the factorial number system approach.
    """
    factorials = [1] * (n + 1)
    for i in range(1, n + 1):
        factorials[i] = factorials[i - 1] * i

    available = list(range(1, n + 1))

    def solve(remaining: int, k: int) -> str:
        if remaining == 0:
            return ""

        # Block size for current position
        block_size = factorials[remaining - 1]

        # Which digit to pick
        index = k // block_size
        digit = available[index]

        # Remove picked digit
        available.pop(index)

        # Recurse for remaining positions
        return str(digit) + solve(remaining - 1, k % block_size)

    return solve(n, k - 1)  # Convert to 0-indexed


# ============================================================================
# APPROACH 3: Using Python's math.factorial
# ============================================================================
# Time Complexity:  O(n^2)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - When you want cleaner code using built-in functions
# - Slightly less efficient due to repeated factorial calls
# ============================================================================

def get_permutation_builtin(n: int, k: int) -> str:
    """
    Version using Python's built-in factorial function.
    """
    available = list(range(1, n + 1))
    k -= 1  # 0-indexed
    result = []

    for i in range(n, 0, -1):
        # i is the count of remaining digits
        block_size = factorial(i - 1)
        index = k // block_size
        result.append(str(available.pop(index)))
        k %= block_size

    return ''.join(result)


# ============================================================================
# APPROACH 4: Naive - Generate All Permutations (Educational)
# ============================================================================
# Time Complexity:  O(n! * n) - generates all permutations
# Space Complexity: O(n! * n) - stores all permutations
#
# WHEN TO USE:
# - Only for educational purposes or very small n
# - Demonstrates why the optimized approach is necessary
# ============================================================================

def get_permutation_naive(n: int, k: int) -> str:
    """
    Generate all permutations and return the k-th one.

    WARNING: This is extremely slow for n > 8!
    Only use for understanding or small inputs.
    """
    from itertools import permutations

    # Generate all permutations in lexicographic order
    all_perms = sorted(permutations(range(1, n + 1)))

    # Return the k-th one (1-indexed)
    return ''.join(map(str, all_perms[k - 1]))


# ============================================================================
# UTILITY: Explain the Calculation
# ============================================================================

def explain_permutation(n: int, k: int) -> None:
    """
    Step-by-step explanation of how to find the k-th permutation.
    """
    print(f"\nFinding the {k}th permutation of [1, 2, ..., {n}]")
    print("=" * 50)

    # Precompute factorials
    factorials = [1] * (n + 1)
    for i in range(1, n + 1):
        factorials[i] = factorials[i - 1] * i

    print(f"\nFactorials: {factorials[:n+1]}")

    available = list(range(1, n + 1))
    print(f"Available digits: {available}")

    # Convert to 0-indexed
    k_orig = k
    k -= 1
    print(f"\nConvert to 0-indexed: k = {k}")

    result = []

    for i in range(n):
        block_size = factorials[n - 1 - i]
        index = k // block_size

        print(f"\nPosition {i}:")
        print(f"  Block size = {n - 1 - i}! = {block_size}")
        print(f"  Index = {k} // {block_size} = {index}")
        print(f"  Available = {available}")
        print(f"  Pick available[{index}] = {available[index]}")

        result.append(str(available[index]))
        available.pop(index)

        k %= block_size
        print(f"  Update k = {k}, remaining = {available}")
        print(f"  Result so far: {''.join(result)}")

    print(f"\nFinal Answer: {''.join(result)}")
    print(f"\nThe {k_orig}th permutation of [1..{n}] is {''.join(result)}")


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests() -> None:
    """Run comprehensive tests for all approaches."""

    test_cases = [
        (3, 3, "213", "n=3, k=3"),
        (4, 9, "2314", "n=4, k=9"),
        (3, 1, "123", "First permutation"),
        (3, 6, "321", "Last permutation of n=3"),
        (4, 1, "1234", "First permutation of n=4"),
        (4, 24, "4321", "Last permutation of n=4"),
        (2, 1, "12", "n=2, k=1"),
        (2, 2, "21", "n=2, k=2"),
        (1, 1, "1", "Single element"),
    ]

    approaches = [
        ("Factorial System (Optimal)", get_permutation),
        ("Recursive", get_permutation_recursive),
        ("Using builtin factorial", get_permutation_builtin),
        ("Naive (small n only)", get_permutation_naive),
    ]

    print("=" * 70)
    print("KTH PERMUTATION SEQUENCE - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for n, k, expected, desc in test_cases:
            # Skip naive for larger inputs
            if "Naive" in name and n > 6:
                print(f"  [SKIP] {desc}: n={n} too large for naive approach")
                continue

            result = func(n, k)
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  [{status}] {desc}: got '{result}', expected '{expected}'")

        if all_passed:
            print("  All tests passed!")


def show_all_permutations_ordered() -> None:
    """Show all permutations with their indices."""

    print("\n" + "=" * 70)
    print("ALL PERMUTATIONS IN ORDER (n=3)")
    print("=" * 70)

    n = 3
    print(f"\nPermutations of [1, 2, ..., {n}]:")
    for k in range(1, factorial(n) + 1):
        perm = get_permutation(n, k)
        print(f"  k={k}: {perm}")


def demonstrate_grouping() -> None:
    """Show how permutations are grouped."""

    print("\n" + "=" * 70)
    print("PERMUTATION GROUPING (n=4)")
    print("=" * 70)

    n = 4
    group_size = factorial(n - 1)  # 3! = 6

    print(f"\nTotal permutations: {factorial(n)}")
    print(f"Permutations per first digit: {group_size}")

    for digit in range(1, n + 1):
        start_k = (digit - 1) * group_size + 1
        end_k = digit * group_size
        print(f"\nStarting with {digit} (k = {start_k} to {end_k}):")

        for k in range(start_k, min(end_k + 1, start_k + 3)):
            print(f"  k={k}: {get_permutation(n, k)}")
        if end_k - start_k >= 3:
            print(f"  ...")
            print(f"  k={end_k}: {get_permutation(n, end_k)}")


if __name__ == "__main__":
    run_tests()
    show_all_permutations_ordered()
    demonstrate_grouping()

    print("\n" + "=" * 70)
    print("STEP-BY-STEP EXPLANATION")
    print("=" * 70)
    explain_permutation(4, 9)

    print("\n" + "=" * 70)
    print("SAMPLE OUTPUT")
    print("=" * 70)

    print("\nInput: n = 3, k = 3")
    print(f"Output: {get_permutation(3, 3)}")

    print("\nInput: n = 4, k = 9")
    print(f"Output: {get_permutation(4, 9)}")

    print("\nInput: n = 3, k = 1")
    print(f"Output: {get_permutation(3, 1)}")
