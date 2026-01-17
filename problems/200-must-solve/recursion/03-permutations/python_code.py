"""
Permutations - Python Solution

Generate all permutations of an array of unique integers.
"""

from typing import List


def permutations(array: List[int]) -> List[List[int]]:
    """
    Generate all permutations using backtracking with swap approach.

    Args:
        array: List of unique integers

    Returns:
        List of all permutations

    Example:
        >>> permutations([1, 2, 3])
        [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
    """
    if not array:
        return []

    result: List[List[int]] = []

    def backtrack(start: int) -> None:
        if start == len(array):
            result.append(array[:])  # Make a copy
            return

        for i in range(start, len(array)):
            # Swap
            array[start], array[i] = array[i], array[start]
            # Recurse
            backtrack(start + 1)
            # Backtrack
            array[start], array[i] = array[i], array[start]

    backtrack(0)
    return result


def permutations_with_used(array: List[int]) -> List[List[int]]:
    """
    Generate permutations using a boolean used array.

    More intuitive approach: build permutation element by element.
    """
    if not array:
        return []

    result: List[List[int]] = []
    used = [False] * len(array)
    current: List[int] = []

    def generate() -> None:
        if len(current) == len(array):
            result.append(current[:])
            return

        for i, num in enumerate(array):
            if used[i]:
                continue

            used[i] = True
            current.append(num)

            generate()

            current.pop()
            used[i] = False

    generate()
    return result


if __name__ == "__main__":
    # Test case 1
    array1 = [1, 2, 3]
    print(f"Input: {array1}")
    print(f"Output: {permutations(array1)}")

    # Test case 2
    array2 = [1]
    print(f"\nInput: {array2}")
    print(f"Output: {permutations(array2)}")

    # Test case 3
    array3 = []
    print(f"\nInput: {array3}")
    print(f"Output: {permutations(array3)}")
