"""
Sorted Squared Array - Python Solution

Given a sorted array, return a new sorted array of the squares.
The challenge is handling negative numbers efficiently.

Time Complexity: O(n)
Space Complexity: O(n)
"""

def sorted_squared_array(array):
    """
    Return sorted array of squares using two-pointer technique.

    Args:
        array: Sorted array of integers (can include negatives)

    Returns:
        List[int]: Sorted array of squared values
    """
    n = len(array)
    result = [0] * n
    left = 0
    right = n - 1

    # Fill from the end (largest values first)
    for i in range(n - 1, -1, -1):
        left_val = abs(array[left])
        right_val = abs(array[right])

        if left_val > right_val:
            result[i] = left_val * left_val
            left += 1
        else:
            result[i] = right_val * right_val
            right -= 1

    return result


def sorted_squared_array_simple(array):
    """Simple solution using built-in sort - O(n log n)."""
    return sorted([x * x for x in array])


# Test cases
if __name__ == "__main__":
    # Test 1: All positive
    array1 = [1, 2, 3, 5, 6, 8, 9]
    result1 = sorted_squared_array(array1)
    print(f"Test 1: {result1}")
    # Expected: [1, 4, 9, 25, 36, 64, 81]

    # Test 2: All negative
    array2 = [-5, -4, -3, -2, -1]
    result2 = sorted_squared_array(array2)
    print(f"Test 2: {result2}")
    # Expected: [1, 4, 9, 16, 25]

    # Test 3: Mixed positive and negative
    array3 = [-7, -3, 1, 9, 22, 30]
    result3 = sorted_squared_array(array3)
    print(f"Test 3: {result3}")
    # Expected: [1, 9, 49, 81, 484, 900]

    # Test 4: Including zero
    array4 = [-4, -2, 0, 1, 3]
    result4 = sorted_squared_array(array4)
    print(f"Test 4: {result4}")
    # Expected: [0, 1, 4, 9, 16]

    # Test 5: Single element
    array5 = [-5]
    result5 = sorted_squared_array(array5)
    print(f"Test 5: {result5}")
    # Expected: [25]

    # Test 6: Symmetric around zero
    array6 = [-3, -2, -1, 0, 1, 2, 3]
    result6 = sorted_squared_array(array6)
    print(f"Test 6: {result6}")
    # Expected: [0, 1, 1, 4, 4, 9, 9]

    print("\nAll tests completed!")
