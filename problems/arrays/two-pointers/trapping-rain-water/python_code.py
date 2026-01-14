"""
Trapping Rain Water - Two Pointer Approach

Problem: Given n non-negative integers representing an elevation map where
the width of each bar is 1, compute how much water it can trap after raining.

Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import List


def trap(height: List[int]) -> int:
    """
    Calculate the amount of water that can be trapped using two pointers.

    The key insight is that at any position, water level is determined by
    the minimum of max heights on both sides. We process the smaller side
    first since it's the limiting factor.

    Args:
        height: List of non-negative integers representing elevation map

    Returns:
        Total units of water that can be trapped
    """
    if not height or len(height) < 3:
        return 0

    left = 0
    right = len(height) - 1
    left_max = 0
    right_max = 0
    water = 0

    while left < right:
        if height[left] < height[right]:
            # Left side is the limiting factor
            if height[left] >= left_max:
                # Current position is a new max, no water can be trapped
                left_max = height[left]
            else:
                # Water can be trapped: left_max - current height
                water += left_max - height[left]
            left += 1
        else:
            # Right side is the limiting factor
            if height[right] >= right_max:
                # Current position is a new max, no water can be trapped
                right_max = height[right]
            else:
                # Water can be trapped: right_max - current height
                water += right_max - height[right]
            right -= 1

    return water


def trap_with_arrays(height: List[int]) -> int:
    """
    Alternative approach using precomputed left_max and right_max arrays.

    Time Complexity: O(n)
    Space Complexity: O(n)

    This is easier to understand but uses more space.
    """
    if not height or len(height) < 3:
        return 0

    n = len(height)

    # left_max[i] = maximum height from index 0 to i
    left_max = [0] * n
    left_max[0] = height[0]
    for i in range(1, n):
        left_max[i] = max(left_max[i - 1], height[i])

    # right_max[i] = maximum height from index i to n-1
    right_max = [0] * n
    right_max[n - 1] = height[n - 1]
    for i in range(n - 2, -1, -1):
        right_max[i] = max(right_max[i + 1], height[i])

    # Calculate water at each position
    water = 0
    for i in range(n):
        water_level = min(left_max[i], right_max[i])
        water += water_level - height[i]

    return water


def visualize(height: List[int], water: int) -> str:
    """
    Create a visual representation of the elevation map with trapped water.
    """
    if not height:
        return "Empty input"

    max_height = max(height)
    n = len(height)

    # Calculate water at each position for visualization
    left_max = [0] * n
    right_max = [0] * n

    left_max[0] = height[0]
    for i in range(1, n):
        left_max[i] = max(left_max[i - 1], height[i])

    right_max[n - 1] = height[n - 1]
    for i in range(n - 2, -1, -1):
        right_max[i] = max(right_max[i + 1], height[i])

    water_levels = [min(left_max[i], right_max[i]) for i in range(n)]

    # Build visual representation
    lines = []
    for level in range(max_height, 0, -1):
        row = ""
        for i in range(n):
            if height[i] >= level:
                row += "#"
            elif water_levels[i] >= level:
                row += "~"
            else:
                row += " "
        lines.append(row)

    # Add base with heights
    lines.append("-" * n)
    lines.append("".join(str(h % 10) for h in height))

    return "\n".join(lines)


def run_tests():
    """Run test cases for the trapping rain water solutions."""

    test_cases = [
        # (input, expected_output, description)
        ([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], 6, "Classic example"),
        ([4, 2, 0, 3, 2, 5], 9, "Simple case"),
        ([1, 0, 2, 0, 1], 2, "Small symmetric case"),
        ([3, 2, 1], 0, "Descending - no water"),
        ([1, 2, 3], 0, "Ascending - no water"),
        ([5, 4, 1, 2], 1, "Water at single position"),
        ([2, 0, 2], 2, "Simple pool"),
        ([3, 0, 0, 2, 0, 4], 10, "Deep pool"),
        ([], 0, "Empty array"),
        ([1], 0, "Single element"),
        ([1, 2], 0, "Two elements"),
        ([0, 0, 0], 0, "All zeros"),
        ([5, 5, 5, 5], 0, "Flat surface"),
        ([0, 7, 1, 4, 6], 7, "Uneven terrain"),
        ([4, 2, 3], 1, "Small valley"),
    ]

    print("=" * 70)
    print("TRAPPING RAIN WATER - Test Results")
    print("=" * 70)

    all_passed = True

    for i, (height, expected, description) in enumerate(test_cases, 1):
        # Test two-pointer approach
        result1 = trap(height)
        # Test array approach
        result2 = trap_with_arrays(height)

        passed = result1 == expected and result2 == expected
        status = "PASS" if passed else "FAIL"

        if not passed:
            all_passed = False

        print(f"\nTest {i}: {description}")
        print(f"  Input:    {height}")
        print(f"  Expected: {expected}")
        print(f"  Got (two-pointer): {result1}")
        print(f"  Got (array):       {result2}")
        print(f"  Status:   [{status}]")

        # Show visualization for some interesting cases
        if height and len(height) <= 15 and max(height) <= 10:
            print(f"\n  Visualization:")
            viz = visualize(height, result1)
            for line in viz.split("\n"):
                print(f"    {line}")

    print("\n" + "=" * 70)
    if all_passed:
        print("All tests passed!")
    else:
        print("Some tests failed!")
    print("=" * 70)

    return all_passed


def demo_step_by_step():
    """Demonstrate the two-pointer algorithm step by step."""

    height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]

    print("\n" + "=" * 70)
    print("STEP-BY-STEP WALKTHROUGH")
    print("=" * 70)
    print(f"\nInput: {height}")
    print("\nTwo-pointer algorithm trace:\n")

    left = 0
    right = len(height) - 1
    left_max = 0
    right_max = 0
    water = 0
    step = 0

    while left < right:
        step += 1
        print(f"Step {step}:")
        print(f"  left={left}, right={right}")
        print(f"  height[left]={height[left]}, height[right]={height[right]}")
        print(f"  left_max={left_max}, right_max={right_max}")

        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
                print(f"  -> Update left_max to {left_max}")
            else:
                added = left_max - height[left]
                water += added
                print(f"  -> Add water: {left_max} - {height[left]} = {added}")
            left += 1
            print(f"  -> Move left to {left}")
        else:
            if height[right] >= right_max:
                right_max = height[right]
                print(f"  -> Update right_max to {right_max}")
            else:
                added = right_max - height[right]
                water += added
                print(f"  -> Add water: {right_max} - {height[right]} = {added}")
            right -= 1
            print(f"  -> Move right to {right}")

        print(f"  Total water so far: {water}\n")

    print(f"Final answer: {water} units of water")


if __name__ == "__main__":
    # Run all tests
    run_tests()

    # Show step-by-step demonstration
    demo_step_by_step()
