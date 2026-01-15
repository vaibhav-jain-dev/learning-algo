"""
Heap Sort Implementation

Implement heap sort to sort an array in ascending order.
"""

from typing import List


def heap_sort(arr: List[int]) -> List[int]:
    """
    Sort the array using heap sort algorithm.

    Args:
        arr: Input array of integers

    Returns:
        The same array sorted in ascending order
    """
    n = len(arr)

    # Step 1: Build a max heap
    # Start from the last non-leaf node and heapify each node
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # Step 2: Extract elements one by one
    for i in range(n - 1, 0, -1):
        # Move current root (maximum) to the end
        arr[0], arr[i] = arr[i], arr[0]

        # Heapify the reduced heap
        heapify(arr, i, 0)

    return arr


def heapify(arr: List[int], n: int, i: int) -> None:
    """
    Heapify a subtree rooted at index i (max heap).

    Args:
        arr: The array
        n: Size of the heap
        i: Index of the root of the subtree
    """
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    # Check if left child exists and is larger than root
    if left < n and arr[left] > arr[largest]:
        largest = left

    # Check if right child exists and is larger than current largest
    if right < n and arr[right] > arr[largest]:
        largest = right

    # If largest is not root, swap and continue heapifying
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)


def heap_sort_iterative(arr: List[int]) -> List[int]:
    """
    Heap sort with iterative heapify (O(1) space).

    Args:
        arr: Input array of integers

    Returns:
        The same array sorted in ascending order
    """
    n = len(arr)

    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify_iterative(arr, n, i)

    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify_iterative(arr, i, 0)

    return arr


def heapify_iterative(arr: List[int], n: int, i: int) -> None:
    """
    Iterative version of heapify.

    Args:
        arr: The array
        n: Size of the heap
        i: Index to heapify from
    """
    while True:
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[left] > arr[largest]:
            largest = left

        if right < n and arr[right] > arr[largest]:
            largest = right

        if largest == i:
            break

        arr[i], arr[largest] = arr[largest], arr[i]
        i = largest


def heap_sort_descending(arr: List[int]) -> List[int]:
    """
    Sort the array in descending order using a min heap.

    Args:
        arr: Input array of integers

    Returns:
        The same array sorted in descending order
    """
    n = len(arr)

    # Build min heap
    for i in range(n // 2 - 1, -1, -1):
        min_heapify(arr, n, i)

    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        min_heapify(arr, i, 0)

    return arr


def min_heapify(arr: List[int], n: int, i: int) -> None:
    """Min heapify operation."""
    smallest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] < arr[smallest]:
        smallest = left

    if right < n and arr[right] < arr[smallest]:
        smallest = right

    if smallest != i:
        arr[i], arr[smallest] = arr[smallest], arr[i]
        min_heapify(arr, n, smallest)


def visualize_heap_sort(arr: List[int]) -> None:
    """
    Visualize the heap sort process step by step.

    Args:
        arr: Input array
    """
    print(f"Original array: {arr}")
    n = len(arr)
    arr = arr.copy()

    # Build heap phase
    print("\n--- Building Max Heap ---")
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
        print(f"After heapifying index {i}: {arr}")

    print(f"\nMax heap built: {arr}")

    # Extraction phase
    print("\n--- Extraction Phase ---")
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        print(f"Swapped root with index {i}: {arr[:i]} | sorted: {arr[i:]}")
        heapify(arr, i, 0)
        print(f"After heapify: {arr[:i]} | sorted: {arr[i:]}")

    print(f"\nFinal sorted array: {arr}")


def test_heap_sort():
    """Test cases for heap sort."""

    # Test case 1: Basic example
    arr1 = [12, 11, 13, 5, 6, 7]
    result1 = heap_sort(arr1.copy())
    expected1 = sorted(arr1)
    print(f"Test 1: {arr1}")
    print(f"Result: {result1}")
    print(f"Expected: {expected1}")
    print(f"Pass: {result1 == expected1}")
    print()

    # Test case 2: Another example
    arr2 = [4, 10, 3, 5, 1]
    result2 = heap_sort(arr2.copy())
    expected2 = sorted(arr2)
    print(f"Test 2: {arr2}")
    print(f"Result: {result2}")
    print(f"Expected: {expected2}")
    print(f"Pass: {result2 == expected2}")
    print()

    # Test case 3: Single element
    arr3 = [1]
    result3 = heap_sort(arr3.copy())
    print(f"Test 3: {arr3}")
    print(f"Result: {result3}")
    print(f"Pass: {result3 == [1]}")
    print()

    # Test case 4: Already sorted
    arr4 = [1, 2, 3, 4, 5]
    result4 = heap_sort(arr4.copy())
    expected4 = sorted(arr4)
    print(f"Test 4: {arr4}")
    print(f"Result: {result4}")
    print(f"Pass: {result4 == expected4}")
    print()

    # Test case 5: Reverse sorted
    arr5 = [5, 4, 3, 2, 1]
    result5 = heap_sort(arr5.copy())
    expected5 = sorted(arr5)
    print(f"Test 5: {arr5}")
    print(f"Result: {result5}")
    print(f"Pass: {result5 == expected5}")
    print()

    # Test case 6: With duplicates
    arr6 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
    result6 = heap_sort(arr6.copy())
    expected6 = sorted(arr6)
    print(f"Test 6: {arr6}")
    print(f"Result: {result6}")
    print(f"Pass: {result6 == expected6}")
    print()

    # Test case 7: With negative numbers
    arr7 = [-3, 5, -1, 0, 2, -4, 1]
    result7 = heap_sort(arr7.copy())
    expected7 = sorted(arr7)
    print(f"Test 7: {arr7}")
    print(f"Result: {result7}")
    print(f"Pass: {result7 == expected7}")
    print()

    # Test case 8: All same elements
    arr8 = [5, 5, 5, 5, 5]
    result8 = heap_sort(arr8.copy())
    print(f"Test 8: {arr8}")
    print(f"Result: {result8}")
    print(f"Pass: {result8 == [5, 5, 5, 5, 5]}")
    print()

    # Test case 9: Iterative version
    arr9 = [64, 34, 25, 12, 22, 11, 90]
    result9 = heap_sort_iterative(arr9.copy())
    expected9 = sorted(arr9)
    print(f"Test 9 (iterative): {arr9}")
    print(f"Result: {result9}")
    print(f"Pass: {result9 == expected9}")
    print()

    # Test case 10: Descending order
    arr10 = [4, 10, 3, 5, 1]
    result10 = heap_sort_descending(arr10.copy())
    expected10 = sorted(arr10, reverse=True)
    print(f"Test 10 (descending): {arr10}")
    print(f"Result: {result10}")
    print(f"Expected: {expected10}")
    print(f"Pass: {result10 == expected10}")
    print()

    # Visualization
    print("=" * 50)
    print("Visualization of Heap Sort:")
    print("=" * 50)
    visualize_heap_sort([4, 10, 3, 5, 1])

    print("\nAll tests completed!")


if __name__ == "__main__":
    test_heap_sort()
