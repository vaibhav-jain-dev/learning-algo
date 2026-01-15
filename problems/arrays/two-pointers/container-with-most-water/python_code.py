"""
Container With Most Water
Using Two Pointers Greedy Approach
"""

def max_area(height: list[int]) -> int:
    """
    Find maximum water container area.
    Area = min(height[left], height[right]) * (right - left)
    """
    left = 0
    right = len(height) - 1
    max_water = 0

    while left < right:
        # Calculate current area
        width = right - left
        current_height = min(height[left], height[right])
        current_area = width * current_height

        max_water = max(max_water, current_area)

        # Move pointer with smaller height
        # Moving taller one can't improve area
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_water


def max_area_with_visualization(height: list[int]) -> tuple[int, tuple[int, int]]:
    """
    Returns max area and the indices of the optimal container.
    """
    left = 0
    right = len(height) - 1
    max_water = 0
    best_left, best_right = 0, 0

    while left < right:
        width = right - left
        current_height = min(height[left], height[right])
        current_area = width * current_height

        if current_area > max_water:
            max_water = current_area
            best_left, best_right = left, right

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_water, (best_left, best_right)


def main():
    test_cases = [
        [1, 8, 6, 2, 5, 4, 8, 3, 7],
        [1, 1],
        [4, 3, 2, 1, 4],
        [1, 2, 4, 3],
        [2, 3, 4, 5, 18, 17, 6],
    ]

    print("Container With Most Water")
    print("=" * 50)

    for height in test_cases:
        area, (left, right) = max_area_with_visualization(height)
        print(f"\nHeights: {height}")
        print(f"Maximum Area: {area}")
        print(f"Best container: indices [{left}, {right}]")
        print(f"Heights at container: [{height[left]}, {height[right]}]")
        print(f"Width: {right - left}, Height: {min(height[left], height[right])}")
        print("-" * 30)


if __name__ == "__main__":
    main()
