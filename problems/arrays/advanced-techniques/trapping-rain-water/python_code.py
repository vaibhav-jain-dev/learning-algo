"""
Trapping Rain Water - Multiple Solutions
LeetCode 42 (Hard)

This problem is a classic that tests understanding of:
- Two pointers technique
- Dynamic programming
- Monotonic stacks

Time Complexity Analysis:
- Brute Force: O(n²) - TLE
- DP: O(n) time, O(n) space
- Two Pointers: O(n) time, O(1) space (Optimal)
- Stack: O(n) time, O(n) space
"""

from typing import List


class Solution:
    def trap_brute_force(self, height: List[int]) -> int:
        """
        Approach 1: Brute Force

        For each position, scan left and right to find max heights.
        Water at position i = min(maxLeft, maxRight) - height[i]

        Time: O(n²) - For each position, scan entire array
        Space: O(1)

        Learning: Understand the core formula first, then optimize
        """
        if not height:
            return 0

        n = len(height)
        total_water = 0

        for i in range(n):
            # Find max height to the left (including current)
            max_left = 0
            for j in range(i + 1):
                max_left = max(max_left, height[j])

            # Find max height to the right (including current)
            max_right = 0
            for j in range(i, n):
                max_right = max(max_right, height[j])

            # Water at this position
            water_at_i = min(max_left, max_right) - height[i]
            total_water += water_at_i

        return total_water

    def trap_dp(self, height: List[int]) -> int:
        """
        Approach 2: Dynamic Programming (Precomputation)

        Observation: We're recalculating maxLeft and maxRight repeatedly.
        Solution: Precompute them!

        Time: O(n) - 3 passes through array
        Space: O(n) - Two extra arrays

        Trade-off: Space for time
        """
        if not height:
            return 0

        n = len(height)

        # Precompute max height to the left of each position
        max_left = [0] * n
        max_left[0] = height[0]
        for i in range(1, n):
            max_left[i] = max(max_left[i - 1], height[i])

        # Precompute max height to the right of each position
        max_right = [0] * n
        max_right[n - 1] = height[n - 1]
        for i in range(n - 2, -1, -1):
            max_right[i] = max(max_right[i + 1], height[i])

        # Calculate water at each position
        total_water = 0
        for i in range(n):
            water_at_i = min(max_left[i], max_right[i]) - height[i]
            total_water += water_at_i

        return total_water

    def trap(self, height: List[int]) -> int:
        """
        Approach 3: Two Pointers (Optimal)

        Key Insight: We only need to know the max on the SHORTER side.

        If height[left] < height[right]:
            - There's definitely something >= height[left] on the right
            - So water at left is bounded by maxLeft, not maxRight
            - Process left side

        If height[right] <= height[left]:
            - There's definitely something >= height[right] on the left
            - So water at right is bounded by maxRight, not maxLeft
            - Process right side

        Time: O(n) - Single pass
        Space: O(1) - Only pointers and max trackers

        This is the optimal solution!
        """
        if not height:
            return 0

        left, right = 0, len(height) - 1
        max_left, max_right = 0, 0
        total_water = 0

        while left < right:
            if height[left] < height[right]:
                # Process left side
                # We know there's something taller on the right
                if height[left] >= max_left:
                    # This bar is the new max, no water here
                    max_left = height[left]
                else:
                    # Water can be trapped here
                    total_water += max_left - height[left]
                left += 1
            else:
                # Process right side
                # We know there's something taller on the left
                if height[right] >= max_right:
                    # This bar is the new max, no water here
                    max_right = height[right]
                else:
                    # Water can be trapped here
                    total_water += max_right - height[right]
                right -= 1

        return total_water

    def trap_stack(self, height: List[int]) -> int:
        """
        Approach 4: Monotonic Stack

        Maintain a stack of indices in decreasing height order.
        When we see a taller bar, calculate water that can be trapped.

        Intuition: We're computing water in horizontal layers.

        Time: O(n) - Each element pushed and popped at most once
        Space: O(n) - Stack can hold all elements

        Useful when: You need to find the next greater element pattern
        """
        if not height:
            return 0

        stack = []  # Stack of indices (heights in decreasing order)
        total_water = 0

        for current in range(len(height)):
            # While current bar is taller than stack top
            while stack and height[current] > height[stack[-1]]:
                mid = stack.pop()  # The bar that will be "flooded"

                if not stack:
                    break  # No left boundary, can't trap water

                # Calculate water trapped between stack top and current
                left = stack[-1]
                width = current - left - 1
                bounded_height = min(height[current], height[left]) - height[mid]

                total_water += width * bounded_height

            stack.append(current)

        return total_water


def visualize_problem(height: List[int], water: int = None):
    """Visualize the trapping rain water problem."""
    if not height:
        print("Empty array")
        return

    max_h = max(height)
    n = len(height)

    print(f"\nInput: {height}")
    print(f"Visualization (█ = bar, ~ = water):\n")

    for level in range(max_h, 0, -1):
        row = ""
        for i in range(n):
            if height[i] >= level:
                row += "█ "
            else:
                row += "  "
        print(f"  {row}")

    # Print base
    print("  " + "─ " * n)
    print("  " + " ".join(str(h) for h in height))

    if water is not None:
        print(f"\nWater trapped: {water} units")


def main():
    """Test all approaches with various inputs."""
    solution = Solution()

    test_cases = [
        [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],  # Classic example
        [4, 2, 0, 3, 2, 5],                     # Another classic
        [4, 2, 3],                               # Small example
        [1, 2, 3, 4, 5],                         # Monotonic increasing
        [5, 4, 3, 2, 1],                         # Monotonic decreasing
        [2, 0, 2],                               # Simple valley
        [5, 2, 1, 2, 1, 5],                      # Symmetric
        [],                                      # Empty
        [0],                                     # Single element
    ]

    print("=" * 70)
    print("TRAPPING RAIN WATER - Testing All Approaches")
    print("=" * 70)

    for i, height in enumerate(test_cases):
        print(f"\n{'='*50}")
        print(f"Test Case {i + 1}")
        print(f"{'='*50}")

        # Test all approaches
        if height:
            result_dp = solution.trap_dp(height)
            result_two_ptr = solution.trap(height)
            result_stack = solution.trap_stack(height)

            # Verify all approaches give same result
            assert result_dp == result_two_ptr == result_stack, \
                f"Mismatch! DP: {result_dp}, Two Pointers: {result_two_ptr}, Stack: {result_stack}"

            visualize_problem(height, result_two_ptr)
        else:
            print(f"\nInput: {height}")
            print("Result: 0 (empty array)")

    print("\n" + "=" * 70)
    print("All test cases passed!")
    print("=" * 70)


if __name__ == "__main__":
    main()
