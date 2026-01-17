"""
Spiral Traverse - Python Solution

Traverse a 2D matrix in spiral order and return elements as 1D array.

Time Complexity: O(n * m)
Space Complexity: O(n * m) for output
"""

def spiral_traverse(array):
    """
    Traverse matrix in spiral order.

    Args:
        array: 2D list of integers

    Returns:
        List[int]: Elements in spiral order
    """
    if not array or not array[0]:
        return []

    result = []
    start_row, end_row = 0, len(array) - 1
    start_col, end_col = 0, len(array[0]) - 1

    while start_row <= end_row and start_col <= end_col:
        # Traverse right
        for col in range(start_col, end_col + 1):
            result.append(array[start_row][col])

        # Traverse down
        for row in range(start_row + 1, end_row + 1):
            result.append(array[row][end_col])

        # Traverse left (if there's still a row to traverse)
        if start_row < end_row:
            for col in range(end_col - 1, start_col - 1, -1):
                result.append(array[end_row][col])

        # Traverse up (if there's still a column to traverse)
        if start_col < end_col:
            for row in range(end_row - 1, start_row, -1):
                result.append(array[row][start_col])

        # Shrink boundaries
        start_row += 1
        end_row -= 1
        start_col += 1
        end_col -= 1

    return result


def spiral_traverse_recursive(array):
    """Recursive approach."""
    result = []
    spiral_helper(array, 0, len(array) - 1, 0, len(array[0]) - 1, result)
    return result


def spiral_helper(array, start_row, end_row, start_col, end_col, result):
    if start_row > end_row or start_col > end_col:
        return

    # Traverse right
    for col in range(start_col, end_col + 1):
        result.append(array[start_row][col])

    # Traverse down
    for row in range(start_row + 1, end_row + 1):
        result.append(array[row][end_col])

    # Traverse left
    if start_row < end_row:
        for col in range(end_col - 1, start_col - 1, -1):
            result.append(array[end_row][col])

    # Traverse up
    if start_col < end_col:
        for row in range(end_row - 1, start_row, -1):
            result.append(array[row][start_col])

    spiral_helper(array, start_row + 1, end_row - 1, start_col + 1, end_col - 1, result)


# Test cases
if __name__ == "__main__":
    # Test 1: 4x4 matrix
    matrix1 = [
        [1, 2, 3, 4],
        [12, 13, 14, 5],
        [11, 16, 15, 6],
        [10, 9, 8, 7]
    ]
    result1 = spiral_traverse(matrix1)
    print(f"Test 1: {result1}")
    # Expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

    # Test 2: 3x3 matrix
    matrix2 = [
        [1, 2, 3],
        [8, 9, 4],
        [7, 6, 5]
    ]
    result2 = spiral_traverse(matrix2)
    print(f"Test 2: {result2}")
    # Expected: [1, 2, 3, 4, 5, 6, 7, 8, 9]

    # Test 3: Single row
    matrix3 = [[1, 2, 3, 4, 5]]
    result3 = spiral_traverse(matrix3)
    print(f"Test 3: {result3}")
    # Expected: [1, 2, 3, 4, 5]

    # Test 4: Single column
    matrix4 = [[1], [2], [3], [4]]
    result4 = spiral_traverse(matrix4)
    print(f"Test 4: {result4}")
    # Expected: [1, 2, 3, 4]

    # Test 5: 2x3 rectangle
    matrix5 = [
        [1, 2, 3],
        [6, 5, 4]
    ]
    result5 = spiral_traverse(matrix5)
    print(f"Test 5: {result5}")
    # Expected: [1, 2, 3, 4, 5, 6]

    # Test 6: 3x2 rectangle
    matrix6 = [
        [1, 2],
        [6, 3],
        [5, 4]
    ]
    result6 = spiral_traverse(matrix6)
    print(f"Test 6: {result6}")
    # Expected: [1, 2, 3, 4, 5, 6]

    # Test 7: Single element
    matrix7 = [[42]]
    result7 = spiral_traverse(matrix7)
    print(f"Test 7: {result7}")
    # Expected: [42]

    # Test 8: Compare iterative and recursive
    matrix8 = [
        [1, 2, 3, 4],
        [10, 11, 12, 5],
        [9, 8, 7, 6]
    ]
    result8a = spiral_traverse(matrix8)
    result8b = spiral_traverse_recursive(matrix8)
    print(f"\nTest 8 - Comparison:")
    print(f"  Iterative: {result8a}")
    print(f"  Recursive: {result8b}")

    print("\nAll tests completed!")
