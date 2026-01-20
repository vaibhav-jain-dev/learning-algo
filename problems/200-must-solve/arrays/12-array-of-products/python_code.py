"""
Array of Products - Python Solutions

Return array where each element is product of all other elements (without division).

This file contains MULTIPLE solution approaches with explanations.
"""

from typing import List


# ============================================================================
# APPROACH 1: Two Arrays (Left and Right Products)
# ============================================================================
# Time Complexity:  O(n) - three passes through array
# Space Complexity: O(n) - two extra arrays
#
# WHY THIS APPROACH:
# - Easy to understand
# - Clear separation of prefix and suffix products
# - Good for learning the concept
# ============================================================================

def array_of_products_two_arrays(array: List[int]) -> List[int]:
    """
    Calculate product of all other elements using left and right product arrays.

    How it works:
    1. left[i] = product of all elements before index i
    2. right[i] = product of all elements after index i
    3. result[i] = left[i] * right[i]

    Visual:
        array = [5, 1, 4, 2]

        left  = [1, 5, 5, 20]     (products from left)
        right = [8, 8, 2, 1]     (products from right)
        result = [8, 40, 10, 20] (left * right)
    """
    n = len(array)

    # Build left products: left[i] = product of array[0..i-1]
    left = [1] * n
    for i in range(1, n):
        left[i] = left[i - 1] * array[i - 1]

    # Build right products: right[i] = product of array[i+1..n-1]
    right = [1] * n
    for i in range(n - 2, -1, -1):
        right[i] = right[i + 1] * array[i + 1]

    # Combine: result[i] = left[i] * right[i]
    result = [left[i] * right[i] for i in range(n)]

    return result


# ============================================================================
# APPROACH 2: Optimized Space (Single Array) - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - two passes through array
# Space Complexity: O(1) - only constant extra space
#
# WHY THIS IS BEST:
# - Optimal space complexity
# - Same time complexity as two-array approach
# - Shows optimization skill in interviews
# ============================================================================

def array_of_products(array: List[int]) -> List[int]:
    """
    Calculate product of all other elements with O(1) extra space.

    How it works:
    1. First pass (left to right): Fill result with left products
    2. Second pass (right to left): Multiply by right products using running variable

    Visual:
        array = [5, 1, 4, 2]

        Pass 1 (left products in result):
        result = [1, 5, 5, 20]

        Pass 2 (multiply by right products):
        i=3: result[3] = 20 * 1 = 20, right_product = 2
        i=2: result[2] = 5 * 2 = 10, right_product = 8
        i=1: result[1] = 5 * 8 = 40, right_product = 8
        i=0: result[0] = 1 * 8 = 8

        Final: [8, 40, 10, 20]
    """
    n = len(array)
    result = [1] * n

    # Pass 1: Fill result with left products
    left_product = 1
    for i in range(n):
        result[i] = left_product
        left_product *= array[i]

    # Pass 2: Multiply by right products
    right_product = 1
    for i in range(n - 1, -1, -1):
        result[i] *= right_product
        right_product *= array[i]

    return result


# ============================================================================
# APPROACH 3: Brute Force
# ============================================================================
# Time Complexity:  O(n^2) - for each element, multiply n-1 others
# Space Complexity: O(1) - no extra space
#
# EDUCATIONAL VALUE:
# - Direct translation of problem statement
# - Shows why optimization is needed
# ============================================================================

def array_of_products_brute_force(array: List[int]) -> List[int]:
    """
    Calculate product using brute force - multiply all others for each position.

    How it works:
    For each position i:
        Multiply all elements except array[i]

    Why it's slow:
        n positions * (n-1) multiplications = O(n^2)
    """
    n = len(array)
    result = []

    for i in range(n):
        product = 1
        for j in range(n):
            if i != j:
                product *= array[j]
        result.append(product)

    return result


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (array, expected, description)
        ([5, 1, 4, 2], [8, 40, 10, 20], "Standard case"),
        ([1, 2, 3, 4, 5], [120, 60, 40, 30, 24], "Sequential numbers"),
        ([-5, 2, -4, 14, -6], [672, -1680, 840, -240, 560], "Negative numbers"),
        ([1, 1, 1, 1], [1, 1, 1, 1], "All ones"),
        ([0, 1, 2, 3], [6, 0, 0, 0], "Contains zero"),
        ([0, 0, 1, 2], [0, 0, 0, 0], "Multiple zeros"),
        ([2, 3], [3, 2], "Two elements"),
        ([10, 0, 5], [0, 50, 0], "Zero in middle"),
    ]

    approaches = [
        ("Two Arrays", array_of_products_two_arrays),
        ("Optimized (Recommended)", array_of_products),
        ("Brute Force", array_of_products_brute_force),
    ]

    print("=" * 70)
    print("ARRAY OF PRODUCTS - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for array, expected, desc in test_cases:
            result = func(array.copy())
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  [{status}] {desc}")
            if result != expected:
                print(f"         Expected: {expected}")
                print(f"         Got:      {result}")

        if all_passed:
            print("  All tests passed!")

    print("\n" + "=" * 70)
    print("COMPLEXITY COMPARISON")
    print("=" * 70)
    print("""
    +---------------------+----------+----------+------------------+
    |      Approach       |   Time   |  Space   |  Recommendation  |
    +---------------------+----------+----------+------------------+
    | 1. Two Arrays       |   O(n)   |   O(n)   |  Good for learn  |
    | 2. Single Array     |   O(n)   |   O(1)   |  BEST CHOICE     |
    | 3. Brute Force      |  O(n^2)  |   O(1)   |  Not recommended |
    +---------------------+----------+----------+------------------+
    """)


if __name__ == "__main__":
    run_tests()
