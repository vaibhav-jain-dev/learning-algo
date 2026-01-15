"""
Merge Sort Implementation with Step-by-Step Visualization

Merge Sort is a divide-and-conquer algorithm that:
1. Divides the array into two halves
2. Recursively sorts each half
3. Merges the two sorted halves

Time Complexity: O(n log n) - all cases
Space Complexity: O(n) - for temporary array
"""

from typing import List


class MergeSortVisualizer:
    """Merge Sort with detailed step-by-step visualization."""

    def __init__(self):
        self.steps = []
        self.depth = 0

    def sort(self, arr: List[int]) -> List[int]:
        """Sort array using merge sort with visualization."""
        if len(arr) <= 1:
            return arr.copy()

        result = arr.copy()
        self.steps = []
        self.depth = 0
        self._merge_sort(result, 0, len(result) - 1)
        return result

    def _merge_sort(self, arr: List[int], left: int, right: int) -> None:
        """Recursive merge sort implementation."""
        indent = "  " * self.depth

        if left < right:
            mid = (left + right) // 2

            self.steps.append(f"{indent}Dividing: {arr[left:right+1]} into {arr[left:mid+1]} and {arr[mid+1:right+1]}")

            # Recursively sort first and second halves
            self.depth += 1
            self._merge_sort(arr, left, mid)
            self._merge_sort(arr, mid + 1, right)
            self.depth -= 1

            # Merge the sorted halves
            self._merge(arr, left, mid, right)
            self.steps.append(f"{indent}Merged: {arr[left:right+1]}")

    def _merge(self, arr: List[int], left: int, mid: int, right: int) -> None:
        """Merge two sorted subarrays."""
        # Create temporary arrays
        left_arr = arr[left:mid + 1]
        right_arr = arr[mid + 1:right + 1]

        i = j = 0  # Initial indices for left and right subarrays
        k = left   # Initial index for merged subarray

        # Merge the temp arrays back into arr[left..right]
        while i < len(left_arr) and j < len(right_arr):
            if left_arr[i] <= right_arr[j]:
                arr[k] = left_arr[i]
                i += 1
            else:
                arr[k] = right_arr[j]
                j += 1
            k += 1

        # Copy remaining elements of left_arr, if any
        while i < len(left_arr):
            arr[k] = left_arr[i]
            i += 1
            k += 1

        # Copy remaining elements of right_arr, if any
        while j < len(right_arr):
            arr[k] = right_arr[j]
            j += 1
            k += 1

    def print_steps(self) -> None:
        """Print all recorded steps."""
        print("\n=== Merge Sort Steps ===")
        for step in self.steps:
            print(step)


def merge_sort(arr: List[int]) -> List[int]:
    """
    Basic merge sort implementation (non-visualizing).

    Args:
        arr: List of integers to sort

    Returns:
        New sorted list
    """
    if len(arr) <= 1:
        return arr.copy()

    mid = len(arr) // 2
    left_half = merge_sort(arr[:mid])
    right_half = merge_sort(arr[mid:])

    return merge(left_half, right_half)


def merge(left: List[int], right: List[int]) -> List[int]:
    """Merge two sorted arrays into one sorted array."""
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])

    return result


def merge_sort_in_place(arr: List[int]) -> None:
    """
    In-place merge sort (modifies original array).

    Args:
        arr: List of integers to sort in place
    """
    if len(arr) <= 1:
        return

    _merge_sort_helper(arr, 0, len(arr) - 1)


def _merge_sort_helper(arr: List[int], left: int, right: int) -> None:
    """Helper function for in-place merge sort."""
    if left < right:
        mid = (left + right) // 2
        _merge_sort_helper(arr, left, mid)
        _merge_sort_helper(arr, mid + 1, right)
        _merge_in_place(arr, left, mid, right)


def _merge_in_place(arr: List[int], left: int, mid: int, right: int) -> None:
    """Merge two sorted portions of an array in place."""
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]

    i = j = 0
    k = left

    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1

    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1

    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1


def visualize_merge_step(left: List[int], right: List[int]) -> None:
    """Visualize a single merge operation step by step."""
    print(f"\nMerging: {left} and {right}")
    print("-" * 40)

    result = []
    i = j = 0
    step = 1

    while i < len(left) and j < len(right):
        left_display = [f"[{x}]" if idx == i else str(x) for idx, x in enumerate(left)]
        right_display = [f"[{x}]" if idx == j else str(x) for idx, x in enumerate(right)]

        print(f"Step {step}: Compare {left[i]} vs {right[j]}")
        print(f"  Left:  {' '.join(left_display)}")
        print(f"  Right: {' '.join(right_display)}")

        if left[i] <= right[j]:
            result.append(left[i])
            print(f"  Pick {left[i]} from left")
            i += 1
        else:
            result.append(right[j])
            print(f"  Pick {right[j]} from right")
            j += 1

        print(f"  Result so far: {result}")
        step += 1

    # Add remaining elements
    if i < len(left):
        print(f"\nCopy remaining from left: {left[i:]}")
        result.extend(left[i:])
    if j < len(right):
        print(f"\nCopy remaining from right: {right[j:]}")
        result.extend(right[j:])

    print(f"\nFinal merged result: {result}")


# ==================== Test Cases ====================

def test_merge_sort():
    """Comprehensive test cases for merge sort."""
    print("=" * 60)
    print("MERGE SORT TEST CASES")
    print("=" * 60)

    test_cases = [
        ([38, 27, 43, 3, 9, 82, 10], [3, 9, 10, 27, 38, 43, 82], "Example 1"),
        ([5, 2, 8, 12, 1, 6], [1, 2, 5, 6, 8, 12], "Example 2"),
        ([1], [1], "Single element"),
        ([3, 3, 3, 1, 1, 2, 2], [1, 1, 2, 2, 3, 3, 3], "Duplicates"),
        ([], [], "Empty array"),
        ([5, 4, 3, 2, 1], [1, 2, 3, 4, 5], "Reverse sorted"),
        ([1, 2, 3, 4, 5], [1, 2, 3, 4, 5], "Already sorted"),
        ([-5, 3, -2, 8, -1, 0], [-5, -2, -1, 0, 3, 8], "Negative numbers"),
        ([1000000, -1000000, 0], [-1000000, 0, 1000000], "Large values"),
    ]

    all_passed = True

    for arr, expected, description in test_cases:
        # Test functional version
        result = merge_sort(arr)
        passed = result == expected
        all_passed = all_passed and passed

        status = "PASS" if passed else "FAIL"
        print(f"\n{status}: {description}")
        print(f"  Input:    {arr}")
        print(f"  Expected: {expected}")
        print(f"  Got:      {result}")

        # Also test in-place version
        arr_copy = arr.copy()
        merge_sort_in_place(arr_copy)
        if arr_copy != expected:
            print(f"  WARNING: In-place version got: {arr_copy}")
            all_passed = False

    print("\n" + "=" * 60)
    print(f"Overall: {'ALL TESTS PASSED' if all_passed else 'SOME TESTS FAILED'}")
    print("=" * 60)

    return all_passed


def demo_visualization():
    """Demonstrate the step-by-step visualization."""
    print("\n" + "=" * 60)
    print("MERGE SORT VISUALIZATION DEMO")
    print("=" * 60)

    # Demo 1: Full sort visualization
    arr = [38, 27, 43, 3, 9, 82, 10]
    print(f"\nSorting array: {arr}")

    visualizer = MergeSortVisualizer()
    result = visualizer.sort(arr)
    visualizer.print_steps()

    print(f"\nFinal result: {result}")

    # Demo 2: Single merge step visualization
    print("\n" + "-" * 60)
    print("DETAILED MERGE OPERATION")
    print("-" * 60)

    visualize_merge_step([3, 27, 38, 43], [9, 10, 82])


def demo_stability():
    """Demonstrate that merge sort is stable."""
    print("\n" + "=" * 60)
    print("STABILITY DEMONSTRATION")
    print("=" * 60)

    # Using tuples (value, original_index) to show stability
    arr = [(3, 'a'), (1, 'b'), (3, 'c'), (1, 'd'), (2, 'e')]
    print(f"\nOriginal: {arr}")
    print("(Sorting by first element only)")

    # Sort only by first element (value)
    def merge_sort_stable(arr):
        if len(arr) <= 1:
            return arr.copy()
        mid = len(arr) // 2
        left = merge_sort_stable(arr[:mid])
        right = merge_sort_stable(arr[mid:])

        result = []
        i = j = 0
        while i < len(left) and j < len(right):
            if left[i][0] <= right[j][0]:  # Compare only values
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
        result.extend(left[i:])
        result.extend(right[j:])
        return result

    result = merge_sort_stable(arr)
    print(f"Sorted:   {result}")
    print("\nNotice: Elements with equal values maintain their relative order")
    print("  - (1, 'b') comes before (1, 'd') - original order preserved")
    print("  - (3, 'a') comes before (3, 'c') - original order preserved")


if __name__ == "__main__":
    test_merge_sort()
    demo_visualization()
    demo_stability()
