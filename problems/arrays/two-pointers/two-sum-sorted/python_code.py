"""
Two Sum II - Input Array Is Sorted
Using Two Pointers Approach
"""

def two_sum(numbers: list[int], target: int) -> list[int]:
    """
    Find two numbers in sorted array that sum to target.
    Returns 1-indexed positions.
    """
    left = 0
    right = len(numbers) - 1

    while left < right:
        current_sum = numbers[left] + numbers[right]

        if current_sum == target:
            # Return 1-indexed positions
            return [left + 1, right + 1]
        elif current_sum < target:
            # Sum too small, need larger number
            left += 1
        else:
            # Sum too large, need smaller number
            right -= 1

    return []  # No solution found


def main():
    # Test cases
    test_cases = [
        ([2, 7, 11, 15], 9),
        ([2, 3, 4], 6),
        ([-1, 0], -1),
        ([1, 2, 3, 4, 5, 6], 11),
        ([-5, -3, 0, 2, 4, 6, 8], 5),
    ]

    print("Two Sum II - Sorted Array")
    print("=" * 50)

    for numbers, target in test_cases:
        result = two_sum(numbers, target)
        print(f"\nArray: {numbers}")
        print(f"Target: {target}")
        print(f"Result indices: {result}")
        if result:
            print(f"Values: {numbers[result[0]-1]} + {numbers[result[1]-1]} = {target}")
        print("-" * 30)


if __name__ == "__main__":
    main()
