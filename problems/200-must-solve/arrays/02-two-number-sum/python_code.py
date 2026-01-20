"""
Two Number Sum - Python Solutions

Find two numbers in an array that sum to a target value.

This file contains MULTIPLE solution approaches with explanations.
"""

from typing import List


# ============================================================================
# APPROACH 1: Hash Table (One Pass) - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - single pass through array
# Space Complexity: O(n) - hash set stores seen numbers
#
# WHY THIS IS BEST:
# - Optimal O(n) time complexity
# - Simple, clean implementation
# - Works on unsorted arrays
# ============================================================================

def two_number_sum(array: List[int], target_sum: int) -> List[int]:
    """
    Find two numbers that sum to target using hash table.

    How it works:
    1. For each number, calculate its complement (target - number)
    2. Check if complement exists in our set of seen numbers
    3. If yes, we found our pair
    4. If no, add current number to seen set

    Visual:
        array = [3, 5, -4, 8, 11, 1, -1, 6], target = 10

        num=3:  need 7,  seen={} -> add 3
        num=5:  need 5,  seen={3} -> add 5
        num=-4: need 14, seen={3,5} -> add -4
        num=8:  need 2,  seen={3,5,-4} -> add 8
        num=11: need -1, seen={3,5,-4,8} -> add 11
        num=1:  need 9,  seen={3,5,-4,8,11} -> add 1
        num=-1: need 11, seen={3,5,-4,8,11,1} -> 11 FOUND!
        Return [-1, 11]
    """
    seen = set()

    for num in array:
        complement = target_sum - num
        if complement in seen:
            return [complement, num]
        seen.add(num)

    return []


# ============================================================================
# APPROACH 2: Two Pointers (Sort First)
# ============================================================================
# Time Complexity:  O(n log n) - dominated by sorting
# Space Complexity: O(1) - if sorting in place (O(n) if not)
#
# WHEN TO USE:
# - When array is already sorted
# - When you can't use extra space
# - When interviewer asks for different approach
# ============================================================================

def two_number_sum_two_pointers(array: List[int], target_sum: int) -> List[int]:
    """
    Find two numbers that sum to target using two pointers.

    How it works:
    1. Sort the array
    2. Left pointer at start, right pointer at end
    3. Calculate sum of elements at both pointers
    4. If sum == target: found it!
    5. If sum < target: move left pointer right (need bigger sum)
    6. If sum > target: move right pointer left (need smaller sum)

    Visual:
        array = [3, 5, -4, 8, 11, 1, -1, 6], target = 10
        sorted = [-4, -1, 1, 3, 5, 6, 8, 11]

        L=0, R=7: -4 + 11 = 7 < 10 -> L++
        L=1, R=7: -1 + 11 = 10 == target -> FOUND!
        Return [-1, 11]
    """
    array.sort()
    left = 0
    right = len(array) - 1

    while left < right:
        current_sum = array[left] + array[right]

        if current_sum == target_sum:
            return [array[left], array[right]]
        elif current_sum < target_sum:
            left += 1
        else:
            right -= 1

    return []


# ============================================================================
# APPROACH 3: Brute Force
# ============================================================================
# Time Complexity:  O(n^2) - nested loops
# Space Complexity: O(1) - no extra space
#
# EDUCATIONAL VALUE:
# - Simplest to understand and implement
# - Shows why optimization is needed
# - Good baseline for comparison
# ============================================================================

def two_number_sum_brute_force(array: List[int], target_sum: int) -> List[int]:
    """
    Find two numbers that sum to target using brute force.

    How it works:
    1. For each element at index i
    2. Check all elements at index j > i
    3. If array[i] + array[j] == target, return pair

    Why it's slower:
        For each of n elements, we check up to n-1 other elements
        Total comparisons: n * (n-1) / 2 = O(n^2)
    """
    n = len(array)

    for i in range(n - 1):
        for j in range(i + 1, n):
            if array[i] + array[j] == target_sum:
                return [array[i], array[j]]

    return []


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (array, target_sum, description)
        ([3, 5, -4, 8, 11, 1, -1, 6], 10, "Standard case"),
        ([1, 2, 3, 4, 5], 10, "No valid pair"),
        ([4, 6], 10, "Two element array"),
        ([4, 6, 1, -3], 3, "Negative numbers"),
        ([1, 2, 3, 4, 5, 6, 7, 8, 9], 17, "Large array"),
        ([5, 5], 10, "Same numbers (but distinct in problem)"),
        ([-1, -2, -3, -4, -5], -8, "All negative"),
        ([14], 15, "Single element"),
    ]

    approaches = [
        ("Hash Table (Recommended)", two_number_sum),
        ("Two Pointers", two_number_sum_two_pointers),
        ("Brute Force", two_number_sum_brute_force),
    ]

    print("=" * 70)
    print("TWO NUMBER SUM - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)

        for array, target, desc in test_cases:
            # Copy array to avoid modification issues
            arr_copy = array.copy()
            result = func(arr_copy, target)

            # Validate result
            valid = False
            if len(result) == 2:
                valid = result[0] + result[1] == target
            elif len(result) == 0:
                # Check that no valid pair exists
                valid = True
                for i in range(len(array)):
                    for j in range(i + 1, len(array)):
                        if array[i] + array[j] == target:
                            valid = False
                            break

            status = "PASS" if valid else "FAIL"
            print(f"  [{status}] {desc}: {result}")

    print("\n" + "=" * 70)
    print("COMPLEXITY COMPARISON")
    print("=" * 70)
    print("""
    +-------------------+------------+----------+------------------+
    |     Approach      |    Time    |  Space   |  Recommendation  |
    +-------------------+------------+----------+------------------+
    | 1. Hash Table     |    O(n)    |   O(n)   |  BEST CHOICE     |
    | 2. Two Pointers   | O(n log n) |   O(1)   |  Good if sorted  |
    | 3. Brute Force    |   O(n^2)   |   O(1)   |  Learning only   |
    +-------------------+------------+----------+------------------+
    """)


if __name__ == "__main__":
    run_tests()
