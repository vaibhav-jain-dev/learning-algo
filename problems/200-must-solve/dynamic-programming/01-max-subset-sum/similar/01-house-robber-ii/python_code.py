"""
House Robber II (Circular Array) - Python Solutions

Rob houses arranged in a circle. Adjacent houses cannot be robbed.
This means first and last houses are also adjacent.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""


# ============================================================================
# APPROACH 1: Two-Pass Linear DP
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# WHY THIS IS BEST:
# - Reuses the simple House Robber solution
# - Clear separation of the two cases
# - Easy to understand and verify
# ============================================================================

def rob(nums: list[int]) -> int:
    """
    Find maximum money that can be robbed from circular houses.

    Key Insight: Since first and last are adjacent in a circle,
    we can't rob both. Break into two subproblems:
        1. Rob houses 0 to n-2 (exclude last)
        2. Rob houses 1 to n-1 (exclude first)
    Answer is the maximum of these two.

    Visual for nums = [2, 3, 2]:
        Case 1: [2, 3] -> max = 3
        Case 2: [3, 2] -> max = 3
        Answer: max(3, 3) = 3
    """
    n = len(nums)

    # Edge cases
    if n == 0:
        return 0
    if n == 1:
        return nums[0]
    if n == 2:
        return max(nums[0], nums[1])

    # Two cases: exclude last OR exclude first
    return max(
        rob_linear(nums, 0, n - 2),
        rob_linear(nums, 1, n - 1)
    )


def rob_linear(nums: list[int], start: int, end: int) -> int:
    """Solve original House Robber for range [start, end]."""
    prev2 = 0              # dp[i-2]
    prev1 = nums[start]    # dp[i-1]

    for i in range(start + 1, end + 1):
        curr = max(prev1, prev2 + nums[i])
        prev2, prev1 = prev1, curr

    return prev1


# ============================================================================
# APPROACH 2: Single Pass with Dual State
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# WHEN TO USE:
# - Want to minimize passes through the array
# - Interview optimization question
# ============================================================================

def rob_single_pass(nums: list[int]) -> int:
    """
    Track both cases in a single iteration.

    Slightly more complex but only one pass through the array.
    """
    n = len(nums)

    if n == 0:
        return 0
    if n == 1:
        return nums[0]
    if n == 2:
        return max(nums[0], nums[1])

    # Case 1: Include first, exclude last
    # Case 2: Exclude first, include last possibility
    prev2_case1, prev1_case1 = 0, nums[0]
    prev2_case2, prev1_case2 = 0, nums[1]

    for i in range(1, n):
        # Case 1: process indices 0 to n-2
        if i < n - 1:
            curr_case1 = max(prev1_case1, prev2_case1 + nums[i])
            prev2_case1, prev1_case1 = prev1_case1, curr_case1

        # Case 2: process indices 1 to n-1
        if i > 1:
            curr_case2 = max(prev1_case2, prev2_case2 + nums[i])
            prev2_case2, prev1_case2 = prev1_case2, curr_case2

    return max(prev1_case1, prev1_case2)


# ============================================================================
# APPROACH 3: DP Array (for visualization/debugging)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - Debugging or understanding the problem
# - Need to trace back which houses were robbed
# ============================================================================

def rob_with_trace(nums: list[int]) -> tuple[int, list[int]]:
    """
    Return max money and which houses were robbed.

    Useful for debugging and understanding the solution.
    """
    n = len(nums)

    if n == 0:
        return 0, []
    if n == 1:
        return nums[0], [0]

    # Solve both cases and track which houses were robbed
    money1, houses1 = rob_linear_with_trace(nums, 0, n - 2)
    money2, houses2 = rob_linear_with_trace(nums, 1, n - 1)

    if money1 >= money2:
        return money1, houses1
    return money2, houses2


def rob_linear_with_trace(nums: list[int], start: int, end: int) -> tuple[int, list[int]]:
    """Solve House Robber with trace of which houses were robbed."""
    size = end - start + 1
    dp = [0] * size
    robbed = [False] * size

    dp[0] = nums[start]
    robbed[0] = True

    if size > 1:
        if nums[start + 1] > nums[start]:
            dp[1] = nums[start + 1]
            robbed[1] = True
        else:
            dp[1] = nums[start]

    for i in range(2, size):
        if dp[i - 2] + nums[start + i] > dp[i - 1]:
            dp[i] = dp[i - 2] + nums[start + i]
            robbed[i] = True
        else:
            dp[i] = dp[i - 1]

    # Trace back which houses were robbed
    houses = []
    i = size - 1
    while i >= 0:
        if robbed[i]:
            houses.insert(0, start + i)
            i -= 2
        else:
            i -= 1

    return dp[size - 1], houses


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (nums, expected, description)
        ([2, 3, 2], 3, "Basic circular"),
        ([1, 2, 3, 1], 4, "Four houses"),
        ([1, 2, 3], 3, "Three houses"),
        ([1], 1, "Single house"),
        ([1, 2], 2, "Two houses"),
        ([], 0, "Empty array"),
        ([200, 3, 140, 20, 10], 340, "First+Third optimal"),
        ([1, 3, 1, 3, 100], 103, "Last house valuable"),
    ]

    approaches = [
        ("Two-Pass DP", rob),
        ("Single Pass", rob_single_pass),
    ]

    print("=" * 70)
    print("HOUSE ROBBER II (CIRCULAR) - TEST RESULTS")
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
    nums = [1, 2, 3, 1]
    money, houses = rob_with_trace(nums)
    print(f"\nnums = {nums}")
    print(f"Max money = {money}")
    print(f"Houses robbed = {houses}")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    nums = [2, 3, 2]
    print(f"\nInput: nums = {nums}")
    print(f"Output: {rob(nums)}")

    # Sample Input 2
    nums = [1, 2, 3, 1]
    print(f"\nInput: nums = {nums}")
    print(f"Output: {rob(nums)}")

    # Sample Input 3
    nums = [1, 2, 3]
    print(f"\nInput: nums = {nums}")
    print(f"Output: {rob(nums)}")
