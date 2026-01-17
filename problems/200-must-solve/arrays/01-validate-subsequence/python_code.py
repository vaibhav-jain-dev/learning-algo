"""
Validate Subsequence - Python Solution

Given two arrays, determine if the second is a subsequence of the first.
A subsequence maintains relative order but doesn't need to be contiguous.

Time Complexity: O(n) where n is length of main array
Space Complexity: O(1)
"""

def validate_subsequence(array, sequence):
    """
    Check if sequence is a valid subsequence of array.

    Args:
        array: The main array to search in
        sequence: The subsequence to validate

    Returns:
        bool: True if sequence is a valid subsequence of array
    """
    seq_idx = 0

    for num in array:
        if seq_idx == len(sequence):
            break
        if num == sequence[seq_idx]:
            seq_idx += 1

    return seq_idx == len(sequence)


def validate_subsequence_while(array, sequence):
    """Alternative solution using while loop with two pointers."""
    arr_idx = 0
    seq_idx = 0

    while arr_idx < len(array) and seq_idx < len(sequence):
        if array[arr_idx] == sequence[seq_idx]:
            seq_idx += 1
        arr_idx += 1

    return seq_idx == len(sequence)


# Test cases
if __name__ == "__main__":
    # Test 1: Basic subsequence
    array1 = [5, 1, 22, 25, 6, -1, 8, 10]
    sequence1 = [1, 6, -1, 10]
    result1 = validate_subsequence(array1, sequence1)
    print(f"Test 1: {result1}")  # Expected: True

    # Test 2: Full array as subsequence
    array2 = [5, 1, 22, 25, 6, -1, 8, 10]
    sequence2 = [5, 1, 22, 25, 6, -1, 8, 10]
    result2 = validate_subsequence(array2, sequence2)
    print(f"Test 2: {result2}")  # Expected: True

    # Test 3: Partial subsequence
    array3 = [5, 1, 22, 25, 6, -1, 8, 10]
    sequence3 = [5, 1, 22, 6, -1, 8, 10]
    result3 = validate_subsequence(array3, sequence3)
    print(f"Test 3: {result3}")  # Expected: True

    # Test 4: Wrong order - not a subsequence
    array4 = [5, 1, 22, 25, 6, -1, 8, 10]
    sequence4 = [1, 6, 10, -1]  # -1 comes before 10 in original
    result4 = validate_subsequence(array4, sequence4)
    print(f"Test 4: {result4}")  # Expected: False

    # Test 5: Single element
    array5 = [1, 2, 3]
    sequence5 = [2]
    result5 = validate_subsequence(array5, sequence5)
    print(f"Test 5: {result5}")  # Expected: True

    # Test 6: Not present
    array6 = [1, 2, 3]
    sequence6 = [4]
    result6 = validate_subsequence(array6, sequence6)
    print(f"Test 6: {result6}")  # Expected: False

    print("\nAll tests completed!")
