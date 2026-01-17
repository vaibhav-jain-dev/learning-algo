"""
Delete and Earn - Python Solutions

Pick numbers to earn points. When you pick x, all x-1 and x+1 are deleted.
Maximize total points earned.

Key insight: This is House Robber in disguise!

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from collections import Counter


# ============================================================================
# APPROACH 1: Transform to House Robber
# ============================================================================
# Time Complexity:  O(n + max_val)
# Space Complexity: O(max_val)
#
# WHY THIS IS BEST:
# - Clean transformation to known problem
# - Simple implementation
# - Works well when value range is reasonable
# ============================================================================

def delete_and_earn(nums: list[int]) -> int:
    """
    Find maximum points using transformation to House Robber.

    Key Insight: Transform to points[x] = x * count(x), then solve House Robber.
    If we pick any occurrence of x, we should pick ALL of them (no extra penalty).

    Visual for nums = [2, 2, 3, 3, 3, 4]:

        points = [0, 0, 4, 9, 4]  (value 2 appears 2x, value 3 appears 3x, etc.)
        Apply House Robber: can't take adjacent values
        Answer: max(take 2+4=8, take 3=9) = 9
    """
    if not nums:
        return 0

    max_val = max(nums)

    # Build points array: points[x] = x * count(x)
    points = [0] * (max_val + 1)
    for num in nums:
        points[num] += num

    # Apply House Robber DP
    if max_val == 0:
        return 0
    if max_val == 1:
        return points[1]

    prev2 = points[0]
    prev1 = max(points[0], points[1])

    for i in range(2, max_val + 1):
        curr = max(prev1, prev2 + points[i])
        prev2, prev1 = prev1, curr

    return prev1


# ============================================================================
# APPROACH 2: Using Counter (Pythonic)
# ============================================================================
# Time Complexity:  O(n + max_val)
# Space Complexity: O(max_val)
#
# WHEN TO USE:
# - More Pythonic approach using Counter
# - Cleaner for interviews
# ============================================================================

def delete_and_earn_counter(nums: list[int]) -> int:
    """
    Pythonic solution using Counter from collections.

    Same logic but uses Counter for cleaner counting.
    """
    if not nums:
        return 0

    count = Counter(nums)
    max_val = max(nums)

    # Build points array
    points = [i * count[i] for i in range(max_val + 1)]

    # House Robber DP
    prev2, prev1 = 0, points[0]

    for i in range(1, max_val + 1):
        curr = max(prev1, prev2 + points[i])
        prev2, prev1 = prev1, curr

    return prev1


# ============================================================================
# APPROACH 3: HashMap with Sorted Keys (Sparse)
# ============================================================================
# Time Complexity:  O(n + k log k) where k = unique values
# Space Complexity: O(k)
#
# WHEN TO USE:
# - When value range is very large but sparse
# - Example: nums = [1, 1000000] would waste space with Approach 1
# ============================================================================

def delete_and_earn_sparse(nums: list[int]) -> int:
    """
    Handle sparse value ranges efficiently.

    Only process values that actually exist in the input.
    """
    if not nums:
        return 0

    count = Counter(nums)
    values = sorted(count.keys())

    # DP with handling for gaps
    prev2, prev1 = 0, values[0] * count[values[0]]

    for i in range(1, len(values)):
        curr = values[i] * count[values[i]]

        if values[i] == values[i - 1] + 1:
            # Adjacent values - can't take both
            new_prev1 = max(prev1, prev2 + curr)
            prev2 = prev1
            prev1 = new_prev1
        else:
            # Gap exists - can take both
            new_prev1 = prev1 + curr
            prev2 = prev1
            prev1 = new_prev1

    return prev1


# ============================================================================
# APPROACH 4: DP with Trace (for visualization)
# ============================================================================
# Time Complexity:  O(n + max_val)
# Space Complexity: O(max_val)
#
# WHEN TO USE:
# - Debugging and understanding the solution
# - Need to trace which values were chosen
# ============================================================================

def delete_and_earn_with_trace(nums: list[int]) -> tuple[int, list[int]]:
    """
    Return max points and which values were chosen.

    Useful for understanding and debugging.
    """
    if not nums:
        return 0, []

    max_val = max(nums)
    count = Counter(nums)

    # Build points array
    points = [i * count[i] for i in range(max_val + 1)]

    # DP array and choice tracking
    dp = [0] * (max_val + 1)
    chosen = [False] * (max_val + 1)

    dp[0] = points[0]
    chosen[0] = points[0] > 0

    if max_val >= 1:
        if points[1] > points[0]:
            dp[1] = points[1]
            chosen[1] = True
        else:
            dp[1] = points[0]

    for i in range(2, max_val + 1):
        if dp[i - 2] + points[i] > dp[i - 1]:
            dp[i] = dp[i - 2] + points[i]
            chosen[i] = True
        else:
            dp[i] = dp[i - 1]

    # Trace back which values were chosen
    chosen_values = []
    i = max_val
    while i >= 0:
        if chosen[i]:
            if points[i] > 0:  # Only add if actually in input
                chosen_values.insert(0, i)
            i -= 2
        else:
            i -= 1

    return dp[max_val], chosen_values


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (nums, expected, description)
        ([3, 4, 2], 6, "Basic case"),
        ([2, 2, 3, 3, 3, 4], 9, "Multiple same values"),
        ([1, 1, 1, 2, 4, 5, 5, 5, 6], 18, "Complex case"),
        ([8, 3, 4, 7, 6, 6, 9, 2, 5, 8, 2, 4, 9, 5, 9, 1, 5, 7, 1, 4], 61, "Large case"),
        ([1], 1, "Single element"),
        ([1, 1], 2, "Two same elements"),
        ([1, 2], 2, "Two adjacent"),
        ([1, 3, 5], 9, "Non-adjacent values"),
    ]

    approaches = [
        ("Transform to House Robber", delete_and_earn),
        ("Using Counter", delete_and_earn_counter),
        ("Sparse (Sorted Keys)", delete_and_earn_sparse),
    ]

    print("=" * 70)
    print("DELETE AND EARN - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for nums, expected, desc in test_cases:
            result = func(nums)
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  [{status}] {desc}: got {result}, expected {expected}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")


# ============================================================================
# SAMPLE INPUT (matches problem examples)
# ============================================================================

if __name__ == "__main__":
    run_tests()

    # Show trace example
    print("\n" + "=" * 70)
    print("TRACE EXAMPLE")
    print("=" * 70)
    nums = [2, 2, 3, 3, 3, 4]
    points, chosen_values = delete_and_earn_with_trace(nums)
    print(f"\nnums = {nums}")
    print(f"Max points = {points}")
    print(f"Values chosen = {chosen_values}")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    nums = [3, 4, 2]
    print(f"\nInput: nums = {nums}")
    print(f"Output: {delete_and_earn(nums)}")

    # Sample Input 2
    nums = [2, 2, 3, 3, 3, 4]
    print(f"\nInput: nums = {nums}")
    print(f"Output: {delete_and_earn(nums)}")
