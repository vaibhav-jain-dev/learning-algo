"""
Largest Rectangle in Histogram

Given an array of integers heights representing the histogram's bar height,
return the area of the largest rectangle in the histogram.
"""

from typing import List, Tuple


def largest_rectangle_area(heights: List[int]) -> int:
    """
    Find the largest rectangle area in a histogram using monotonic stack.

    Uses a monotonic increasing stack to efficiently find, for each bar,
    how far it can extend left and right while being the minimum height.

    Time Complexity: O(n) - each element pushed and popped at most once
    Space Complexity: O(n) - for the stack
    """
    stack = []  # Stack of indices (heights at these indices are in increasing order)
    max_area = 0
    n = len(heights)

    for i in range(n + 1):
        # Use 0 as sentinel for processing remaining bars at the end
        current_height = heights[i] if i < n else 0

        while stack and current_height < heights[stack[-1]]:
            height = heights[stack.pop()]
            # Width calculation:
            # If stack is empty, this bar extends from index 0 to i-1
            # Otherwise, it extends from stack[-1]+1 to i-1
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)

        stack.append(i)

    return max_area


def largest_rectangle_area_brute_force(heights: List[int]) -> int:
    """
    Brute force approach - for each bar, expand left and right.
    Time Complexity: O(n^2)
    Space Complexity: O(1)

    Included for comparison and understanding.
    """
    max_area = 0
    n = len(heights)

    for i in range(n):
        # Find how far left we can extend
        left = i
        while left > 0 and heights[left - 1] >= heights[i]:
            left -= 1

        # Find how far right we can extend
        right = i
        while right < n - 1 and heights[right + 1] >= heights[i]:
            right += 1

        width = right - left + 1
        area = heights[i] * width
        max_area = max(max_area, area)

    return max_area


def largest_rectangle_area_two_pass(heights: List[int]) -> int:
    """
    Two-pass approach using precomputed left and right boundaries.

    First pass: For each bar, find the first smaller bar to the left.
    Second pass: For each bar, find the first smaller bar to the right.
    Then calculate area for each bar.

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    n = len(heights)
    if n == 0:
        return 0

    # left[i] = index of first bar shorter than heights[i] to the left (-1 if none)
    left = [-1] * n
    stack = []

    for i in range(n):
        while stack and heights[stack[-1]] >= heights[i]:
            stack.pop()
        left[i] = stack[-1] if stack else -1
        stack.append(i)

    # right[i] = index of first bar shorter than heights[i] to the right (n if none)
    right = [n] * n
    stack = []

    for i in range(n - 1, -1, -1):
        while stack and heights[stack[-1]] >= heights[i]:
            stack.pop()
        right[i] = stack[-1] if stack else n
        stack.append(i)

    # Calculate max area
    max_area = 0
    for i in range(n):
        width = right[i] - left[i] - 1
        area = heights[i] * width
        max_area = max(max_area, area)

    return max_area


def largest_rectangle_with_details(heights: List[int]) -> Tuple[int, dict]:
    """
    Extended version that returns area and details about the rectangle.
    """
    stack = []
    max_area = 0
    best_rect = {'height': 0, 'width': 0, 'left': 0, 'right': 0}
    n = len(heights)

    for i in range(n + 1):
        current_height = heights[i] if i < n else 0

        while stack and current_height < heights[stack[-1]]:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            area = height * width

            if area > max_area:
                max_area = area
                left_idx = 0 if not stack else stack[-1] + 1
                best_rect = {
                    'height': height,
                    'width': width,
                    'left': left_idx,
                    'right': i - 1,
                    'area': area
                }

        stack.append(i)

    return max_area, best_rect


def largest_rectangle_with_trace(heights: List[int]) -> Tuple[int, List[str]]:
    """
    Version that returns execution trace for understanding the algorithm.
    """
    stack = []
    max_area = 0
    trace = []
    n = len(heights)

    for i in range(n + 1):
        current_height = heights[i] if i < n else 0
        trace.append(f"\nIndex {i}: Current height = {current_height}")
        trace.append(f"  Stack (indices): {stack}")

        while stack and current_height < heights[stack[-1]]:
            popped_idx = stack.pop()
            height = heights[popped_idx]
            width = i if not stack else i - stack[-1] - 1
            area = height * width
            trace.append(f"  Pop index {popped_idx} (height {height}): width={width}, area={area}")
            if area > max_area:
                max_area = area
                trace.append(f"    New max area: {max_area}")

        if i < n:
            stack.append(i)
            trace.append(f"  Push index {i}")

    return max_area, trace


def run_tests():
    """Run comprehensive tests for largest rectangle area."""
    test_cases = [
        # (input, expected, description)
        ([2, 1, 5, 6, 2, 3], 10, "Example 1"),
        ([2, 4], 4, "Two bars"),
        ([1, 1, 1, 1], 4, "All equal"),
        ([5, 4, 3, 2, 1], 9, "Decreasing"),
        ([1, 2, 3, 4, 5], 9, "Increasing"),
        ([1], 1, "Single bar"),
        ([0], 0, "Single zero"),
        ([2, 1, 2], 3, "Valley"),
        ([1, 2, 1], 3, "Peak"),
        ([4, 2, 0, 3, 2, 5], 6, "With zero"),
        ([6, 2, 5, 4, 5, 1, 6], 12, "Complex 1"),
        ([2, 1, 5, 6, 2, 3], 10, "Example from problem"),
        ([3, 6, 5, 7, 4, 8, 1, 0], 20, "Complex 2"),
        ([0, 9], 9, "Zero and large"),
    ]

    print("Testing largest_rectangle_area function:")
    print("=" * 70)

    all_passed = True
    for i, (heights, expected, description) in enumerate(test_cases, 1):
        result = largest_rectangle_area(heights)
        status = "PASS" if result == expected else "FAIL"
        if result != expected:
            all_passed = False

        heights_str = str(heights) if len(str(heights)) <= 35 else str(heights)[:32] + "..."
        print(f"Test {i:2}: {description}")
        print(f"         Input: {heights_str}")
        print(f"         Result: {result}, Expected: {expected} [{status}]")
        print()

    print("=" * 70)
    print(f"All tests passed: {all_passed}")
    print()

    # Compare all implementations
    print("Comparing all implementations:")
    print("=" * 70)

    all_match = True
    for heights, expected, description in test_cases:
        result1 = largest_rectangle_area(heights)
        result2 = largest_rectangle_area_brute_force(heights)
        result3 = largest_rectangle_area_two_pass(heights)

        if not (result1 == result2 == result3 == expected):
            all_match = False
            print(f"MISMATCH for {description}: stack={result1}, brute={result2}, two_pass={result3}")

    if all_match:
        print("All implementations produce identical correct results!")
    print()

    # Demonstrate detailed results
    print("Demonstrating detailed rectangle information:")
    print("=" * 70)

    demo_heights = [2, 1, 5, 6, 2, 3]
    area, details = largest_rectangle_with_details(demo_heights)
    print(f"Heights: {demo_heights}")
    print(f"Largest area: {area}")
    print(f"Rectangle details:")
    for key, value in details.items():
        print(f"  {key}: {value}")
    print()

    # Demonstrate trace
    print("Algorithm trace for [2, 1, 5, 6, 2, 3]:")
    print("=" * 70)

    area, trace = largest_rectangle_with_trace(demo_heights)
    for line in trace:
        print(line)
    print(f"\nFinal largest area: {area}")


if __name__ == "__main__":
    run_tests()
