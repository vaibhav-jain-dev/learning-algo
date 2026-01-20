"""
Longest Consecutive Sequence with Gap K - Python Solution

Find the longest sequence where consecutive elements differ by exactly k.

Time Complexity: O(n)
Space Complexity: O(n)
"""

from typing import List


def longest_consecutive_gap_k(nums: List[int], k: int) -> int:
    """
    Find length of longest sequence with gap k between consecutive elements.

    Args:
        nums: List of integers
        k: Required gap between consecutive elements

    Returns:
        Length of longest sequence with gap k
    """
    if not nums:
        return 0

    num_set = set(nums)
    max_length = 0

    for num in num_set:
        # Only start from sequence beginnings
        if num - k not in num_set:
            current = num
            length = 1

            while current + k in num_set:
                current += k
                length += 1

            max_length = max(max_length, length)

    return max_length


def longest_consecutive_gap_k_with_sequence(nums: List[int], k: int) -> tuple:
    """
    Find longest sequence with gap k and return the actual sequence.

    Args:
        nums: List of integers
        k: Required gap between consecutive elements

    Returns:
        Tuple of (length, sequence)
    """
    if not nums:
        return 0, []

    num_set = set(nums)
    max_length = 0
    best_sequence = []

    for num in num_set:
        if num - k not in num_set:
            current = num
            sequence = [current]

            while current + k in num_set:
                current += k
                sequence.append(current)

            if len(sequence) > max_length:
                max_length = len(sequence)
                best_sequence = sequence

    return max_length, best_sequence


# Test cases
if __name__ == "__main__":
    # Test 1: Gap of 2
    nums1 = [1, 3, 5, 7, 9, 2, 4]
    result1 = longest_consecutive_gap_k(nums1, 2)
    print(f"Test 1: {result1}")
    assert result1 == 5, f"Expected 5, got {result1}"

    # Test 2: Gap of 4
    nums2 = [1, 5, 9, 13, 2, 6, 10]
    result2 = longest_consecutive_gap_k(nums2, 4)
    print(f"Test 2: {result2}")
    assert result2 == 4, f"Expected 4, got {result2}"

    # Test 3: Gap of 1 (standard consecutive)
    nums3 = [1, 2, 3, 4, 5]
    result3 = longest_consecutive_gap_k(nums3, 1)
    print(f"Test 3: {result3}")
    assert result3 == 5, f"Expected 5, got {result3}"

    # Test 4: With sequence
    length4, seq4 = longest_consecutive_gap_k_with_sequence([1, 3, 5, 7, 9, 2, 4], 2)
    print(f"Test 4: Length={length4}, Sequence={seq4}")
    assert length4 == 5
    assert seq4 == [1, 3, 5, 7, 9]

    # Test 5: No valid sequence
    nums5 = [1, 10, 20, 30]
    result5 = longest_consecutive_gap_k(nums5, 2)
    print(f"Test 5: {result5}")
    assert result5 == 1, f"Expected 1, got {result5}"

    # Test 6: Negative numbers
    nums6 = [-5, -3, -1, 1, 3, 5]
    result6 = longest_consecutive_gap_k(nums6, 2)
    print(f"Test 6: {result6}")
    assert result6 == 6, f"Expected 6, got {result6}"

    print("\nAll tests passed!")
