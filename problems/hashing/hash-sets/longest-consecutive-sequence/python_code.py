"""
Longest Consecutive Sequence

This solution uses a hash set to achieve O(n) time complexity.
"""

from typing import List


def longest_consecutive(nums: List[int]) -> int:
    """
    Find the length of the longest consecutive sequence.

    Args:
        nums: Unsorted list of integers

    Returns:
        Length of the longest consecutive sequence
    """
    if not nums:
        return 0

    # Convert to set for O(1) lookup
    num_set = set(nums)
    max_length = 0

    for num in num_set:
        # Only start counting if this is the beginning of a sequence
        if num - 1 not in num_set:
            current_num = num
            current_length = 1

            # Count consecutive numbers
            while current_num + 1 in num_set:
                current_num += 1
                current_length += 1

            max_length = max(max_length, current_length)

    return max_length


def longest_consecutive_sorting(nums: List[int]) -> int:
    """
    Sorting approach - O(n log n) time.
    """
    if not nums:
        return 0

    nums = sorted(set(nums))  # Remove duplicates and sort

    max_length = 1
    current_length = 1

    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1] + 1:
            current_length += 1
            max_length = max(max_length, current_length)
        else:
            current_length = 1

    return max_length


def run_tests():
    """Run test cases to verify the solution."""
    test_cases = [
        # (nums, expected)
        ([100, 4, 200, 1, 3, 2], 4),
        ([0, 3, 7, 2, 5, 8, 4, 6, 0, 1], 9),
        ([1, 2, 0, 1], 3),
        ([], 0),
        ([1], 1),
        ([1, 3, 5, 7], 1),              # No consecutive
        ([1, 2, 3, 4, 5], 5),            # All consecutive
        ([-1, 0, 1, 2], 4),              # Negative numbers
        ([9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6], 7),  # 3,4,5,6,7,8,9
        ([1, 1, 1, 1], 1),              # All duplicates
    ]

    print("=" * 60)
    print("LONGEST CONSECUTIVE SEQUENCE - Test Results")
    print("=" * 60)

    all_passed = True
    for i, (nums, expected) in enumerate(test_cases, 1):
        result = longest_consecutive(nums)
        passed = result == expected
        status = "PASS" if passed else "FAIL"

        if not passed:
            all_passed = False

        display_nums = str(nums) if len(nums) <= 10 else f"{nums[:5]}...({len(nums)} elements)"
        print(f"\nTest {i}: {status}")
        print(f"  Input: nums = {display_nums}")
        print(f"  Output: {result}")
        print(f"  Expected: {expected}")

    print("\n" + "=" * 60)
    print(f"Overall: {'ALL TESTS PASSED' if all_passed else 'SOME TESTS FAILED'}")
    print("=" * 60)


def demonstrate_approach():
    """Demonstrate how the algorithm works step by step."""
    nums = [100, 4, 200, 1, 3, 2]

    print("\n" + "=" * 60)
    print("STEP-BY-STEP DEMONSTRATION")
    print("=" * 60)
    print(f"Input: nums = {nums}")

    # Convert to set
    num_set = set(nums)
    print(f"\nStep 1: Convert to set -> {num_set}")

    print("\nStep 2: Find sequence starts and count lengths")
    max_length = 0

    for num in sorted(num_set):  # Sorted for clearer demonstration
        is_start = (num - 1) not in num_set
        print(f"\n  Number: {num}")
        print(f"    {num - 1} in set? {num - 1 in num_set}")
        print(f"    Is sequence start? {is_start}")

        if is_start:
            current_num = num
            current_length = 1
            sequence = [num]

            while current_num + 1 in num_set:
                current_num += 1
                current_length += 1
                sequence.append(current_num)

            print(f"    Sequence: {sequence}")
            print(f"    Length: {current_length}")
            max_length = max(max_length, current_length)
        else:
            print("    Skipping (not a sequence start)")

    print(f"\nMax consecutive sequence length: {max_length}")


def explain_time_complexity():
    """Explain why the algorithm is O(n)."""
    print("\n" + "=" * 60)
    print("TIME COMPLEXITY EXPLANATION")
    print("=" * 60)

    explanation = """
    Why is this O(n) and not O(n^2)?

    At first glance, we have:
    - Outer loop: iterates through all n elements
    - Inner while loop: could potentially iterate many times

    However, the key insight is:

    1. Each number is only counted ONCE as part of a sequence
       - We only start counting from sequence beginnings (num-1 not in set)
       - A number can only be the start of one sequence

    2. Example with [100, 4, 200, 1, 3, 2]:
       - 100: Is start (99 not in set), sequence [100], count 1 number
       - 200: Is start (199 not in set), sequence [200], count 1 number
       - 1:   Is start (0 not in set), sequence [1,2,3,4], count 4 numbers
       - 2:   Not start (1 is in set), skip
       - 3:   Not start (2 is in set), skip
       - 4:   Not start (3 is in set), skip

    Total numbers counted: 1 + 1 + 4 = 6 = n

    The while loop in total across ALL iterations of the outer loop
    visits each element at most once!
    """
    print(explanation)


if __name__ == "__main__":
    run_tests()
    demonstrate_approach()
    explain_time_complexity()
