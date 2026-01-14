"""
Set Mismatch - Find duplicate and missing number

This solution uses a hash set to find the duplicate and math for the missing number.
"""

from typing import List


def find_error_nums(nums: List[int]) -> List[int]:
    """
    Find the duplicate and missing number.

    Args:
        nums: Array with one duplicate and one missing number

    Returns:
        [duplicate, missing]
    """
    n = len(nums)
    seen = set()
    duplicate = -1

    # Find duplicate using set
    for num in nums:
        if num in seen:
            duplicate = num
        seen.add(num)

    # Find missing using math
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    missing = expected_sum - actual_sum + duplicate

    return [duplicate, missing]


def find_error_nums_frequency(nums: List[int]) -> List[int]:
    """
    Frequency count approach using array.
    """
    n = len(nums)
    count = [0] * (n + 1)

    for num in nums:
        count[num] += 1

    duplicate = missing = -1
    for i in range(1, n + 1):
        if count[i] == 2:
            duplicate = i
        elif count[i] == 0:
            missing = i

    return [duplicate, missing]


def find_error_nums_marking(nums: List[int]) -> List[int]:
    """
    O(1) space approach using marking.
    Modifies the input array.
    """
    n = len(nums)
    duplicate = missing = -1

    # Mark visited indices as negative
    for i in range(n):
        idx = abs(nums[i]) - 1
        if nums[idx] < 0:
            duplicate = abs(nums[i])
        else:
            nums[idx] = -nums[idx]

    # Find the index that's still positive (missing number)
    for i in range(n):
        if nums[i] > 0:
            missing = i + 1
            break

    return [duplicate, missing]


def run_tests():
    """Run test cases to verify the solution."""
    test_cases = [
        # (nums, expected)
        ([1, 2, 2, 4], [2, 3]),
        ([1, 1], [1, 2]),
        ([3, 2, 2], [2, 1]),
        ([2, 2], [2, 1]),
        ([1, 2, 3, 4, 4], [4, 5]),
        ([1, 5, 3, 2, 2, 7, 6, 4], [2, 8]),
        ([2, 3, 4, 5, 5], [5, 1]),
        ([1, 2, 3, 3], [3, 4]),
    ]

    print("=" * 60)
    print("SET MISMATCH - Test Results")
    print("=" * 60)

    all_passed = True
    for i, (nums, expected) in enumerate(test_cases, 1):
        result = find_error_nums(nums.copy())
        passed = result == expected
        status = "PASS" if passed else "FAIL"

        if not passed:
            all_passed = False

        print(f"\nTest {i}: {status}")
        print(f"  Input: nums = {nums}")
        print(f"  Output: {result}")
        print(f"  Expected: {expected}")
        if passed:
            print(f"  Verification: duplicate={result[0]}, missing={result[1]}")

    print("\n" + "=" * 60)
    print(f"Overall: {'ALL TESTS PASSED' if all_passed else 'SOME TESTS FAILED'}")
    print("=" * 60)


def demonstrate_approach():
    """Demonstrate how the algorithm works step by step."""
    nums = [1, 2, 2, 4]

    print("\n" + "=" * 60)
    print("STEP-BY-STEP DEMONSTRATION")
    print("=" * 60)
    print(f"Input: nums = {nums}")
    print(f"Expected: numbers 1 to {len(nums)}")

    # Step 1: Find duplicate using set
    print("\n--- Step 1: Find Duplicate Using Set ---")
    seen = set()
    duplicate = -1

    for i, num in enumerate(nums):
        print(f"  Processing nums[{i}] = {num}")
        print(f"    Current seen: {seen}")
        if num in seen:
            print(f"    {num} already in set -> DUPLICATE FOUND!")
            duplicate = num
        else:
            seen.add(num)
            print(f"    Added {num} to seen")

    print(f"\nDuplicate: {duplicate}")

    # Step 2: Find missing using math
    print("\n--- Step 2: Find Missing Using Math ---")
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)

    print(f"  n = {n}")
    print(f"  Expected sum (1 to {n}): {n} * ({n}+1) / 2 = {expected_sum}")
    print(f"  Actual sum: {' + '.join(map(str, nums))} = {actual_sum}")
    print(f"  Difference: {expected_sum} - {actual_sum} = {expected_sum - actual_sum}")

    missing = expected_sum - actual_sum + duplicate
    print(f"  Missing = expected - actual + duplicate")
    print(f"  Missing = {expected_sum} - {actual_sum} + {duplicate} = {missing}")

    print(f"\nResult: [duplicate={duplicate}, missing={missing}]")


def demonstrate_marking_approach():
    """Demonstrate the O(1) space marking approach."""
    nums = [1, 2, 2, 4]

    print("\n" + "=" * 60)
    print("MARKING APPROACH DEMONSTRATION (O(1) Space)")
    print("=" * 60)
    print(f"Input: nums = {nums}")
    print("Idea: Mark visited indices as negative")

    nums_copy = nums.copy()
    duplicate = missing = -1

    print("\n--- Marking Phase ---")
    for i in range(len(nums_copy)):
        idx = abs(nums_copy[i]) - 1
        print(f"  i={i}, value={abs(nums_copy[i])}, target index={idx}")
        print(f"    nums before: {nums_copy}")

        if nums_copy[idx] < 0:
            print(f"    nums[{idx}] is negative -> DUPLICATE: {abs(nums_copy[i])}")
            duplicate = abs(nums_copy[i])
        else:
            nums_copy[idx] = -nums_copy[idx]
            print(f"    Marked nums[{idx}] as negative")
        print(f"    nums after:  {nums_copy}")

    print("\n--- Finding Missing ---")
    for i in range(len(nums_copy)):
        print(f"  nums[{i}] = {nums_copy[i]}", end="")
        if nums_copy[i] > 0:
            missing = i + 1
            print(f" -> POSITIVE! Missing number: {missing}")
            break
        else:
            print(" -> negative, continue")

    print(f"\nResult: [duplicate={duplicate}, missing={missing}]")


if __name__ == "__main__":
    run_tests()
    demonstrate_approach()
    demonstrate_marking_approach()
