"""
Smallest Difference - Python Solution

Find pair from two arrays with smallest absolute difference.
Uses sorting and two-pointer technique.

Time Complexity: O(n log n + m log m)
Space Complexity: O(1)
"""

def smallest_difference(array_one, array_two):
    """
    Find pair with smallest absolute difference.

    Args:
        array_one: First array of integers
        array_two: Second array of integers

    Returns:
        List[int]: Pair [num_from_arr1, num_from_arr2] with smallest diff
    """
    array_one.sort()
    array_two.sort()

    i, j = 0, 0
    smallest = float('inf')
    result = []

    while i < len(array_one) and j < len(array_two):
        first = array_one[i]
        second = array_two[j]
        current_diff = abs(first - second)

        if current_diff < smallest:
            smallest = current_diff
            result = [first, second]

        # Optimal case
        if first == second:
            return [first, second]

        # Move pointer of smaller element to try to reduce difference
        if first < second:
            i += 1
        else:
            j += 1

    return result


def smallest_difference_brute(array_one, array_two):
    """Brute force O(n*m) solution for comparison."""
    smallest = float('inf')
    result = []

    for num1 in array_one:
        for num2 in array_two:
            diff = abs(num1 - num2)
            if diff < smallest:
                smallest = diff
                result = [num1, num2]

    return result


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    arr1_1 = [-1, 5, 10, 20, 28, 3]
    arr2_1 = [26, 134, 135, 15, 17]
    result1 = smallest_difference(arr1_1.copy(), arr2_1.copy())
    print(f"Test 1: {result1}")  # Expected: [28, 26]

    # Test 2: Close large numbers
    arr1_2 = [10, 1000]
    arr2_2 = [1001, 11]
    result2 = smallest_difference(arr1_2.copy(), arr2_2.copy())
    print(f"Test 2: {result2}")  # Expected: [1000, 1001]

    # Test 3: Exact match exists
    arr1_3 = [1, 3, 5, 7]
    arr2_3 = [2, 4, 5, 8]
    result3 = smallest_difference(arr1_3.copy(), arr2_3.copy())
    print(f"Test 3: {result3}")  # Expected: [5, 5]

    # Test 4: Negative numbers
    arr1_4 = [-10, -5, 0, 5]
    arr2_4 = [-8, -3, 2, 7]
    result4 = smallest_difference(arr1_4.copy(), arr2_4.copy())
    print(f"Test 4: {result4}")  # Expected: [-5, -3] diff=2 or similar

    # Test 5: Single element arrays
    arr1_5 = [1]
    arr2_5 = [100]
    result5 = smallest_difference(arr1_5.copy(), arr2_5.copy())
    print(f"Test 5: {result5}")  # Expected: [1, 100]

    # Test 6: Verify both methods give same result
    arr1_6 = [10, 5, 40, 79, 90]
    arr2_6 = [7, 62, 25, 80, 12]
    result6a = smallest_difference(arr1_6.copy(), arr2_6.copy())
    result6b = smallest_difference_brute(arr1_6.copy(), arr2_6.copy())
    print(f"Test 6:")
    print(f"  Two-pointer: {result6a}")
    print(f"  Brute force: {result6b}")

    print("\nAll tests completed!")
