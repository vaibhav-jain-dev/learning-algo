"""
Quick Sort Implementation with Step-by-Step Visualization

Quick Sort is a divide-and-conquer algorithm that:
1. Selects a pivot element
2. Partitions array around the pivot
3. Recursively sorts sub-arrays

Time Complexity: O(n log n) average, O(n^2) worst
Space Complexity: O(log n) for recursion stack
"""

from typing import List, Tuple
import random


class QuickSortVisualizer:
    """Quick Sort with detailed step-by-step visualization."""

    def __init__(self):
        self.steps = []
        self.depth = 0

    def sort(self, arr: List[int]) -> List[int]:
        """Sort array using quick sort with visualization."""
        result = arr.copy()
        self.steps = []
        self.depth = 0
        self._quick_sort(result, 0, len(result) - 1)
        return result

    def _quick_sort(self, arr: List[int], low: int, high: int) -> None:
        """Recursive quick sort implementation."""
        indent = "  " * self.depth

        if low < high:
            self.steps.append(f"{indent}Sorting range [{low}:{high}]: {arr[low:high+1]}")

            # Partition and get pivot index
            pivot_idx = self._partition(arr, low, high)

            self.steps.append(f"{indent}After partition: {arr[low:high+1]}")
            self.steps.append(f"{indent}Pivot {arr[pivot_idx]} is at final position {pivot_idx}")

            # Recursively sort elements before and after partition
            self.depth += 1
            self._quick_sort(arr, low, pivot_idx - 1)
            self._quick_sort(arr, pivot_idx + 1, high)
            self.depth -= 1

    def _partition(self, arr: List[int], low: int, high: int) -> int:
        """Lomuto partition scheme."""
        pivot = arr[high]
        i = low - 1

        for j in range(low, high):
            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]

        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        return i + 1

    def print_steps(self) -> None:
        """Print all recorded steps."""
        print("\n=== Quick Sort Steps ===")
        for step in self.steps:
            print(step)


def quick_sort(arr: List[int]) -> List[int]:
    """
    Basic quick sort implementation (returns new sorted list).

    Args:
        arr: List of integers to sort

    Returns:
        New sorted list
    """
    if len(arr) <= 1:
        return arr.copy()

    result = arr.copy()
    _quick_sort_helper(result, 0, len(result) - 1)
    return result


def _quick_sort_helper(arr: List[int], low: int, high: int) -> None:
    """Helper function for quick sort."""
    if low < high:
        pivot_idx = _partition_lomuto(arr, low, high)
        _quick_sort_helper(arr, low, pivot_idx - 1)
        _quick_sort_helper(arr, pivot_idx + 1, high)


def _partition_lomuto(arr: List[int], low: int, high: int) -> int:
    """
    Lomuto partition scheme.
    Uses last element as pivot.
    """
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1


def quick_sort_hoare(arr: List[int]) -> List[int]:
    """Quick sort using Hoare partition scheme."""
    result = arr.copy()
    _quick_sort_hoare_helper(result, 0, len(result) - 1)
    return result


def _quick_sort_hoare_helper(arr: List[int], low: int, high: int) -> None:
    """Helper for Hoare partition quick sort."""
    if low < high:
        pivot_idx = _partition_hoare(arr, low, high)
        _quick_sort_hoare_helper(arr, low, pivot_idx)
        _quick_sort_hoare_helper(arr, pivot_idx + 1, high)


def _partition_hoare(arr: List[int], low: int, high: int) -> int:
    """
    Hoare partition scheme.
    Uses first element as pivot, two pointers from both ends.
    """
    pivot = arr[low]
    i = low - 1
    j = high + 1

    while True:
        i += 1
        while arr[i] < pivot:
            i += 1

        j -= 1
        while arr[j] > pivot:
            j -= 1

        if i >= j:
            return j

        arr[i], arr[j] = arr[j], arr[i]


def quick_sort_3way(arr: List[int]) -> List[int]:
    """
    Three-way quick sort (Dutch National Flag).
    Excellent for arrays with many duplicates.
    """
    result = arr.copy()
    _quick_sort_3way_helper(result, 0, len(result) - 1)
    return result


def _quick_sort_3way_helper(arr: List[int], low: int, high: int) -> None:
    """Three-way partition quick sort helper."""
    if low >= high:
        return

    lt, gt = _partition_3way(arr, low, high)
    _quick_sort_3way_helper(arr, low, lt - 1)
    _quick_sort_3way_helper(arr, gt + 1, high)


def _partition_3way(arr: List[int], low: int, high: int) -> Tuple[int, int]:
    """
    Three-way partition (Dutch National Flag).
    Returns (lt, gt) where:
    - arr[low..lt-1] < pivot
    - arr[lt..gt] == pivot
    - arr[gt+1..high] > pivot
    """
    pivot = arr[low]
    lt = low
    gt = high
    i = low + 1

    while i <= gt:
        if arr[i] < pivot:
            arr[lt], arr[i] = arr[i], arr[lt]
            lt += 1
            i += 1
        elif arr[i] > pivot:
            arr[gt], arr[i] = arr[i], arr[gt]
            gt -= 1
        else:
            i += 1

    return lt, gt


def quick_sort_random(arr: List[int]) -> List[int]:
    """Quick sort with random pivot selection."""
    result = arr.copy()
    _quick_sort_random_helper(result, 0, len(result) - 1)
    return result


def _quick_sort_random_helper(arr: List[int], low: int, high: int) -> None:
    """Quick sort with random pivot."""
    if low < high:
        # Random pivot selection
        pivot_idx = random.randint(low, high)
        arr[pivot_idx], arr[high] = arr[high], arr[pivot_idx]

        pivot_idx = _partition_lomuto(arr, low, high)
        _quick_sort_random_helper(arr, low, pivot_idx - 1)
        _quick_sort_random_helper(arr, pivot_idx + 1, high)


def visualize_partition(arr: List[int]) -> None:
    """Visualize the partition process step by step."""
    print(f"\n=== Partition Visualization ===")
    print(f"Input: {arr}")

    arr = arr.copy()
    low, high = 0, len(arr) - 1
    pivot = arr[high]
    print(f"Pivot: {pivot} (last element)")
    print("-" * 50)

    i = low - 1
    step = 1

    for j in range(low, high):
        print(f"\nStep {step}: j={j}, examining arr[{j}]={arr[j]}")

        # Visual representation
        visual = []
        for k, val in enumerate(arr):
            if k == j:
                visual.append(f"[{val}]")  # Current element
            elif k <= i and i >= 0:
                visual.append(f"({val})")  # In "less than pivot" region
            elif k == high:
                visual.append(f"<{val}>")  # Pivot
            else:
                visual.append(str(val))

        print(f"  Array: {' '.join(visual)}")
        print(f"  i={i} (boundary), j={j} (scanner)")

        if arr[j] <= pivot:
            i += 1
            if i != j:
                arr[i], arr[j] = arr[j], arr[i]
                print(f"  {arr[j-1]} <= {pivot}: Swap arr[{i}] and arr[{j}]")
                print(f"  After swap: {arr}")
            else:
                print(f"  {arr[j]} <= {pivot}: Increment i (no swap needed)")
        else:
            print(f"  {arr[j]} > {pivot}: Skip")

        step += 1

    # Final swap: put pivot in correct position
    print(f"\nFinal: Swap pivot with arr[{i+1}]")
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    print(f"Result: {arr}")
    print(f"Pivot {pivot} is now at index {i+1}")


# ==================== Test Cases ====================

def test_quick_sort():
    """Comprehensive test cases for quick sort."""
    print("=" * 60)
    print("QUICK SORT TEST CASES")
    print("=" * 60)

    test_cases = [
        ([10, 7, 8, 9, 1, 5], [1, 5, 7, 8, 9, 10], "Example 1"),
        ([64, 34, 25, 12, 22, 11, 90], [11, 12, 22, 25, 34, 64, 90], "Example 2"),
        ([3, 2, 1], [1, 2, 3], "Reverse sorted"),
        ([5, 5, 5, 5], [5, 5, 5, 5], "All same"),
        ([1], [1], "Single element"),
        ([], [], "Empty array"),
        ([1, 2, 3, 4, 5], [1, 2, 3, 4, 5], "Already sorted"),
        ([-5, 3, -2, 8, -1, 0], [-5, -2, -1, 0, 3, 8], "Negative numbers"),
        ([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5], [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9], "Many duplicates"),
    ]

    all_passed = True

    for arr, expected, description in test_cases:
        # Test all implementations
        results = {
            "Lomuto": quick_sort(arr),
            "Hoare": quick_sort_hoare(arr),
            "3-Way": quick_sort_3way(arr),
            "Random": quick_sort_random(arr),
        }

        passed = all(r == expected for r in results.values())
        all_passed = all_passed and passed

        status = "PASS" if passed else "FAIL"
        print(f"\n{status}: {description}")
        print(f"  Input:    {arr}")
        print(f"  Expected: {expected}")

        for name, result in results.items():
            if result == expected:
                print(f"  {name}: OK")
            else:
                print(f"  {name}: FAIL - got {result}")

    print("\n" + "=" * 60)
    print(f"Overall: {'ALL TESTS PASSED' if all_passed else 'SOME TESTS FAILED'}")
    print("=" * 60)

    return all_passed


def demo_visualization():
    """Demonstrate the step-by-step visualization."""
    print("\n" + "=" * 60)
    print("QUICK SORT VISUALIZATION DEMO")
    print("=" * 60)

    # Demo 1: Full sort visualization
    arr = [10, 7, 8, 9, 1, 5]
    print(f"\nSorting array: {arr}")

    visualizer = QuickSortVisualizer()
    result = visualizer.sort(arr)
    visualizer.print_steps()

    print(f"\nFinal result: {result}")

    # Demo 2: Detailed partition visualization
    print("\n" + "-" * 60)
    print("DETAILED PARTITION OPERATION")
    print("-" * 60)

    visualize_partition([10, 7, 8, 9, 1, 5])


def demo_3way_partition():
    """Demonstrate three-way partition for duplicates."""
    print("\n" + "=" * 60)
    print("THREE-WAY PARTITION DEMO (Dutch National Flag)")
    print("=" * 60)

    arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
    print(f"\nOriginal: {arr}")
    print("This array has many duplicates (multiple 1s, 3s, 5s)")

    result = quick_sort_3way(arr)
    print(f"Sorted:   {result}")

    print("\nThree-way partition is efficient here because:")
    print("- Elements equal to pivot don't need further sorting")
    print("- Reduces number of recursive calls significantly")


def demo_worst_case():
    """Demonstrate worst case and how to avoid it."""
    print("\n" + "=" * 60)
    print("WORST CASE DEMONSTRATION")
    print("=" * 60)

    # Already sorted array - worst case for basic quicksort
    arr = list(range(1, 11))
    print(f"\nAlready sorted array: {arr}")
    print("With last-element pivot, each partition only removes 1 element")
    print("This gives O(n^2) time complexity!")

    print("\nSolution: Use random pivot selection")
    result = quick_sort_random(arr)
    print(f"Result with random pivot: {result}")
    print("Random pivot gives expected O(n log n) even for sorted input")


if __name__ == "__main__":
    test_quick_sort()
    demo_visualization()
    demo_3way_partition()
    demo_worst_case()
