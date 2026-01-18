"""
Partition Equal Subset Sum - Python Solutions

Determine if array can be partitioned into two subsets with equal sum.

Key insight: This is a subset sum decision problem.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from functools import lru_cache


# ============================================================================
# APPROACH 1: 1D Dynamic Programming
# ============================================================================
# Time Complexity:  O(n * sum)
# Space Complexity: O(sum)
#
# WHY THIS IS BEST:
# - Optimal space complexity
# - Clear and efficient
# - Standard subset sum pattern
# ============================================================================

def can_partition(nums: list[int]) -> bool:
    """
    Determine if array can be partitioned into equal sum subsets.

    Key Insight: If total sum is S, we need subset summing to S/2.
    This is the 0/1 Knapsack variant: can we fill capacity S/2 exactly?

    Visual for nums = [1, 5, 11, 5]:
        Total = 22, target = 11
        After processing: dp[11] = True
        Partition: {1,5,5} and {11}
    """
    total_sum = sum(nums)

    # If sum is odd, can't partition equally
    if total_sum % 2 != 0:
        return False

    target = total_sum // 2

    # dp[s] = can we make sum s?
    dp = [False] * (target + 1)
    dp[0] = True  # Can always make sum 0 (empty subset)

    for num in nums:
        # Iterate backwards to avoid using same number twice
        for s in range(target, num - 1, -1):
            dp[s] = dp[s] or dp[s - num]

        # Early termination
        if dp[target]:
            return True

    return dp[target]


# ============================================================================
# APPROACH 2: Bitset Optimization (Pythonic)
# ============================================================================
# Time Complexity:  O(n * sum / word_size) effectively
# Space Complexity: O(sum / word_size)
#
# WHEN TO USE:
# - Need maximum speed
# - Python's arbitrary precision integers make this elegant
# ============================================================================

def can_partition_bitset(nums: list[int]) -> bool:
    """
    Use Python's arbitrary precision integer as a bitset.

    Bit i being set means we can make sum i.
    For each num, shift left and OR to add num to all possible sums.
    """
    total_sum = sum(nums)

    if total_sum % 2 != 0:
        return False

    target = total_sum // 2

    # bits is an integer where bit i = "can we make sum i?"
    bits = 1  # Can make sum 0

    for num in nums:
        # Shift bits left by num and OR with current
        # This adds num to all currently achievable sums
        bits |= bits << num

    # Check if target bit is set
    return bool(bits & (1 << target))


# ============================================================================
# APPROACH 3: Recursive with Memoization
# ============================================================================
# Time Complexity:  O(n * sum)
# Space Complexity: O(n * sum) for memo
#
# WHEN TO USE:
# - More intuitive top-down thinking
# - Debugging and understanding
# ============================================================================

def can_partition_memo(nums: list[int]) -> bool:
    """
    Top-down DP with memoization using lru_cache.

    For each number, decide to include or exclude from subset.
    """
    total_sum = sum(nums)

    if total_sum % 2 != 0:
        return False

    target = total_sum // 2

    @lru_cache(maxsize=None)
    def can_reach(idx: int, remaining: int) -> bool:
        # Base cases
        if remaining == 0:
            return True
        if remaining < 0 or idx >= len(nums):
            return False

        # Include or exclude current number
        return (can_reach(idx + 1, remaining - nums[idx]) or
                can_reach(idx + 1, remaining))

    return can_reach(0, target)


# ============================================================================
# APPROACH 4: Using Set (Alternative)
# ============================================================================
# Time Complexity:  O(n * number_of_sums)
# Space Complexity: O(number_of_sums)
#
# WHEN TO USE:
# - When unique sums are much fewer than target
# - More intuitive for some
# ============================================================================

def can_partition_set(nums: list[int]) -> bool:
    """
    Track achievable sums using a set.

    More intuitive but may be slower for dense sum ranges.
    """
    total_sum = sum(nums)

    if total_sum % 2 != 0:
        return False

    target = total_sum // 2

    # achievable_sums contains all sums we can make
    achievable_sums = {0}

    for num in nums:
        # Add num to all existing sums
        new_sums = set()
        for s in achievable_sums:
            new_sum = s + num
            if new_sum == target:
                return True
            if new_sum < target:
                new_sums.add(new_sum)
        achievable_sums.update(new_sums)

    return target in achievable_sums


# ============================================================================
# BONUS: Find the actual partition
# ============================================================================

def can_partition_with_sets(nums: list[int]) -> tuple[bool, list[int], list[int]]:
    """
    Return the partition if it exists.

    Uses 2D DP to enable backtracking.
    """
    total_sum = sum(nums)

    if total_sum % 2 != 0:
        return False, [], []

    target = total_sum // 2
    n = len(nums)

    # dp[i][s] = can we make sum s using first i numbers?
    dp = [[False] * (target + 1) for _ in range(n + 1)]
    dp[0][0] = True

    for i in range(1, n + 1):
        for s in range(target + 1):
            dp[i][s] = dp[i - 1][s]
            if s >= nums[i - 1]:
                dp[i][s] = dp[i][s] or dp[i - 1][s - nums[i - 1]]

    if not dp[n][target]:
        return False, [], []

    # Backtrack to find the partition
    subset1 = []
    subset2 = []
    s = target

    for i in range(n, 0, -1):
        if s >= nums[i - 1] and dp[i - 1][s - nums[i - 1]]:
            subset1.append(nums[i - 1])
            s -= nums[i - 1]
        else:
            subset2.append(nums[i - 1])

    return True, subset1, subset2


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (nums, expected, description)
        ([1, 5, 11, 5], True, "Example 1"),
        ([1, 2, 3, 5], False, "Example 2 - odd sum"),
        ([1, 1], True, "Two equal elements"),
        ([1, 2, 5], False, "Cannot partition"),
        ([2, 2, 2, 2], True, "All same elements"),
        ([100], False, "Single element"),
        ([1, 2, 3, 4, 5, 6, 7], True, "1-7 sum to 28"),
        ([14, 9, 8, 4, 3, 2], True, "Mixed numbers"),
    ]

    approaches = [
        ("1D DP", can_partition),
        ("Bitset", can_partition_bitset),
        ("Memoization", can_partition_memo),
        ("Set", can_partition_set),
    ]

    print("=" * 70)
    print("PARTITION EQUAL SUBSET SUM - TEST RESULTS")
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

    # Show partition
    print("\n" + "=" * 70)
    print("PARTITION EXAMPLE")
    print("=" * 70)
    nums = [1, 5, 11, 5]
    can_part, set1, set2 = can_partition_with_sets(nums)
    print(f"\nnums = {nums}")
    print(f"Can partition: {can_part}")
    if can_part:
        print(f"Subset 1: {set1} (sum={sum(set1)})")
        print(f"Subset 2: {set2} (sum={sum(set2)})")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    nums = [1, 5, 11, 5]
    print(f"\nInput: nums = {nums}")
    print(f"Output: {can_partition(nums)}")

    # Sample Input 2
    nums = [1, 2, 3, 5]
    print(f"\nInput: nums = {nums}")
    print(f"Output: {can_partition(nums)}")
