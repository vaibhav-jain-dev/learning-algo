"""
Transpose Matrix - Python Solution

Return the transpose of a 2D matrix.
Element at (i, j) moves to (j, i).

Time Complexity: O(m * n)
Space Complexity: O(m * n)
"""

def transpose_matrix(matrix):
    """
    Return the transpose of the given matrix.

    Args:
        matrix: 2D list of integers (m x n)

    Returns:
        List[List[int]]: Transposed matrix (n x m)
    """
    if not matrix or not matrix[0]:
        return []

    rows = len(matrix)
    cols = len(matrix[0])

    # Create new matrix with swapped dimensions
    transposed = [[0] * rows for _ in range(cols)]

    for i in range(rows):
        for j in range(cols):
            transposed[j][i] = matrix[i][j]

    return transposed


def transpose_matrix_pythonic(matrix):
    """Pythonic one-liner using zip."""
    return [list(row) for row in zip(*matrix)]


def transpose_matrix_list_comp(matrix):
    """Using list comprehension."""
    if not matrix or not matrix[0]:
        return []

    rows = len(matrix)
    cols = len(matrix[0])

    return [[matrix[i][j] for i in range(rows)] for j in range(cols)]


def print_matrix(matrix, name="Matrix"):
    """Helper function to print matrix nicely."""
    print(f"{name}:")
    for row in matrix:
        print(f"  {row}")


# Test cases
if __name__ == "__main__":
    # Test 1: 3x2 matrix
    matrix1 = [
        [1, 2],
        [3, 4],
        [5, 6]
    ]
    result1 = transpose_matrix(matrix1)
    print("Test 1:")
    print_matrix(matrix1, "Original")
    print_matrix(result1, "Transposed")
    # Expected: [[1,3,5], [2,4,6]]
    print()

    # Test 2: 3x3 square matrix
    matrix2 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    result2 = transpose_matrix(matrix2)
    print("Test 2:")
    print_matrix(matrix2, "Original")
    print_matrix(result2, "Transposed")
    # Expected: [[1,4,7], [2,5,8], [3,6,9]]
    print()

    # Test 3: 1x3 row vector
    matrix3 = [[1, 2, 3]]
    result3 = transpose_matrix(matrix3)
    print("Test 3:")
    print_matrix(matrix3, "Original")
    print_matrix(result3, "Transposed")
    # Expected: [[1], [2], [3]]
    print()

    # Test 4: 3x1 column vector
    matrix4 = [[1], [2], [3]]
    result4 = transpose_matrix(matrix4)
    print("Test 4:")
    print_matrix(matrix4, "Original")
    print_matrix(result4, "Transposed")
    # Expected: [[1, 2, 3]]
    print()

    # Test 5: 1x1 matrix
    matrix5 = [[5]]
    result5 = transpose_matrix(matrix5)
    print(f"Test 5: {matrix5} -> {result5}")
    # Expected: [[5]]

    # Test 6: Pythonic version comparison
    matrix6 = [[1, 2], [3, 4], [5, 6]]
    result6a = transpose_matrix(matrix6)
    result6b = transpose_matrix_pythonic(matrix6)
    print(f"\nTest 6 - Methods comparison:")
    print(f"Standard: {result6a}")
    print(f"Pythonic: {result6b}")

    print("\nAll tests completed!")
