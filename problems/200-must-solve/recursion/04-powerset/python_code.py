"""
Powerset - Python Solution

Generate all subsets (powerset) of an array of unique integers.
"""

from typing import List


def powerset(array: List[int]) -> List[List[int]]:
    """
    Generate powerset using iterative approach.

    For each element, add it to all existing subsets to create new subsets.

    Args:
        array: List of unique integers

    Returns:
        List of all subsets (powerset)

    Example:
        >>> powerset([1, 2, 3])
        [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
    """
    subsets: List[List[int]] = [[]]  # Start with empty subset

    for element in array:
        # For each existing subset, create a new subset that includes this element
        new_subsets = []
        for subset in subsets:
            new_subsets.append(subset + [element])
        subsets.extend(new_subsets)

    return subsets


def powerset_recursive(array: List[int]) -> List[List[int]]:
    """
    Generate powerset using recursive include/exclude approach.

    For each element, we either include it or exclude it.
    """
    result: List[List[int]] = []

    def generate(index: int, current: List[int]) -> None:
        """Recursively generate subsets."""
        if index == len(array):
            result.append(current[:])  # Add a copy
            return

        # Option 1: Include current element
        current.append(array[index])
        generate(index + 1, current)

        # Option 2: Exclude current element (backtrack)
        current.pop()
        generate(index + 1, current)

    generate(0, [])
    return result


def powerset_bitmask(array: List[int]) -> List[List[int]]:
    """
    Generate powerset using bitmask approach.

    Each number from 0 to 2^n - 1 represents a subset,
    where bit i indicates whether element i is included.
    """
    n = len(array)
    result: List[List[int]] = []

    # Iterate through all 2^n possible subsets
    for mask in range(1 << n):  # 1 << n == 2^n
        subset = []
        for i in range(n):
            # Check if bit i is set
            if mask & (1 << i):
                subset.append(array[i])
        result.append(subset)

    return result


if __name__ == "__main__":
    # Test case 1
    array1 = [1, 2, 3]
    print(f"Input: {array1}")
    print(f"Iterative: {powerset(array1)}")
    print(f"Recursive: {powerset_recursive(array1)}")
    print(f"Bitmask:   {powerset_bitmask(array1)}")

    # Test case 2
    array2 = [1, 2]
    print(f"\nInput: {array2}")
    print(f"Output: {powerset(array2)}")

    # Test case 3: Empty array
    array3 = []
    print(f"\nInput: {array3}")
    print(f"Output: {powerset(array3)}")
