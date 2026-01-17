"""
Product Sum - Python Solution

Compute the product sum of a "special" array where nested arrays
are multiplied by their depth level.
"""

from typing import Union

# Type alias for special array elements
SpecialArray = list[Union[int, "SpecialArray"]]


def product_sum(array: SpecialArray, depth: int = 1) -> int:
    """
    Compute the product sum of a special array.

    Args:
        array: A special array containing integers or nested arrays
        depth: Current depth level (starts at 1)

    Returns:
        The product sum where nested arrays are multiplied by depth

    Example:
        >>> product_sum([5, 2, [7, -1], 3, [6, [-13, 8], 4]])
        12
    """
    total = 0

    for element in array:
        if isinstance(element, list):
            # Nested array - recurse with increased depth
            total += product_sum(element, depth + 1)
        else:
            # Integer element - add directly
            total += element

    # Multiply by current depth
    return total * depth


if __name__ == "__main__":
    # Test case 1: Complex nested array
    array1 = [5, 2, [7, -1], 3, [6, [-13, 8], 4]]
    print(f"Input: {array1}")
    print(f"Output: {product_sum(array1)}")  # Expected: 12

    # Test case 2: Simple array
    array2 = [1, 2, 3]
    print(f"\nInput: {array2}")
    print(f"Output: {product_sum(array2)}")  # Expected: 6

    # Test case 3: Single nested array
    array3 = [[1, 2], 3]
    print(f"\nInput: {array3}")
    print(f"Output: {product_sum(array3)}")  # Expected: 9
