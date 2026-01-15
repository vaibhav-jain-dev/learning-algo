"""
Build Min Heap

Build a min heap from an array in-place using bottom-up heapify.
"""

from typing import List


def build_min_heap(arr: List[int]) -> List[int]:
    """
    Build a min heap from the given array in-place.

    Args:
        arr: Input array of integers

    Returns:
        The same array transformed into a min heap
    """
    n = len(arr)

    # Start from the last non-leaf node and heapify each node
    # Last non-leaf node is at index (n // 2) - 1
    for i in range(n // 2 - 1, -1, -1):
        heapify_down(arr, n, i)

    return arr


def heapify_down(arr: List[int], n: int, i: int) -> None:
    """
    Heapify down operation for min heap.

    Args:
        arr: The heap array
        n: Size of the heap
        i: Index to heapify from
    """
    smallest = i
    left = 2 * i + 1
    right = 2 * i + 2

    # Check if left child exists and is smaller than current smallest
    if left < n and arr[left] < arr[smallest]:
        smallest = left

    # Check if right child exists and is smaller than current smallest
    if right < n and arr[right] < arr[smallest]:
        smallest = right

    # If smallest is not the current node, swap and continue heapifying
    if smallest != i:
        arr[i], arr[smallest] = arr[smallest], arr[i]
        heapify_down(arr, n, smallest)


def heapify_down_iterative(arr: List[int], n: int, i: int) -> None:
    """
    Iterative version of heapify down (O(1) space).

    Args:
        arr: The heap array
        n: Size of the heap
        i: Index to heapify from
    """
    while True:
        smallest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[left] < arr[smallest]:
            smallest = left

        if right < n and arr[right] < arr[smallest]:
            smallest = right

        if smallest == i:
            break

        arr[i], arr[smallest] = arr[smallest], arr[i]
        i = smallest


def is_valid_min_heap(arr: List[int]) -> bool:
    """
    Verify if the array represents a valid min heap.

    Args:
        arr: Array to verify

    Returns:
        True if valid min heap, False otherwise
    """
    n = len(arr)
    for i in range(n // 2):
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[i] > arr[left]:
            return False
        if right < n and arr[i] > arr[right]:
            return False

    return True


# Additional heap operations for completeness

def insert(arr: List[int], value: int) -> None:
    """Insert a new value into the min heap."""
    arr.append(value)
    heapify_up(arr, len(arr) - 1)


def heapify_up(arr: List[int], i: int) -> None:
    """Heapify up from index i."""
    while i > 0:
        parent = (i - 1) // 2
        if arr[parent] > arr[i]:
            arr[parent], arr[i] = arr[i], arr[parent]
            i = parent
        else:
            break


def extract_min(arr: List[int]) -> int:
    """Extract and return the minimum element."""
    if not arr:
        raise IndexError("Heap is empty")

    min_val = arr[0]
    arr[0] = arr[-1]
    arr.pop()

    if arr:
        heapify_down(arr, len(arr), 0)

    return min_val


def test_build_min_heap():
    """Test cases for build_min_heap function."""

    # Test case 1: Basic example
    arr1 = [4, 10, 3, 5, 1]
    result1 = build_min_heap(arr1.copy())
    print(f"Test 1: {arr1}")
    print(f"Result: {result1}")
    print(f"Is valid min heap: {is_valid_min_heap(result1)}")
    print(f"Min element at root: {result1[0] == min(arr1)}")
    print()

    # Test case 2: Another example
    arr2 = [9, 6, 5, 2, 3]
    result2 = build_min_heap(arr2.copy())
    print(f"Test 2: {arr2}")
    print(f"Result: {result2}")
    print(f"Is valid min heap: {is_valid_min_heap(result2)}")
    print(f"Min element at root: {result2[0] == min(arr2)}")
    print()

    # Test case 3: Already sorted ascending (already a min heap)
    arr3 = [1, 2, 3, 4, 5]
    result3 = build_min_heap(arr3.copy())
    print(f"Test 3: {arr3}")
    print(f"Result: {result3}")
    print(f"Is valid min heap: {is_valid_min_heap(result3)}")
    print()

    # Test case 4: Sorted descending (worst case)
    arr4 = [5, 4, 3, 2, 1]
    result4 = build_min_heap(arr4.copy())
    print(f"Test 4: {arr4}")
    print(f"Result: {result4}")
    print(f"Is valid min heap: {is_valid_min_heap(result4)}")
    print(f"Min element at root: {result4[0] == min(arr4)}")
    print()

    # Test case 5: Single element
    arr5 = [42]
    result5 = build_min_heap(arr5.copy())
    print(f"Test 5: {arr5}")
    print(f"Result: {result5}")
    print(f"Is valid min heap: {is_valid_min_heap(result5)}")
    print()

    # Test case 6: Two elements
    arr6 = [10, 5]
    result6 = build_min_heap(arr6.copy())
    print(f"Test 6: {arr6}")
    print(f"Result: {result6}")
    print(f"Is valid min heap: {is_valid_min_heap(result6)}")
    print()

    # Test case 7: With negative numbers
    arr7 = [3, -1, 4, -5, 9, -2, 6]
    result7 = build_min_heap(arr7.copy())
    print(f"Test 7: {arr7}")
    print(f"Result: {result7}")
    print(f"Is valid min heap: {is_valid_min_heap(result7)}")
    print(f"Min element at root: {result7[0] == min(arr7)}")
    print()

    # Test case 8: With duplicates
    arr8 = [5, 3, 5, 3, 5, 3]
    result8 = build_min_heap(arr8.copy())
    print(f"Test 8: {arr8}")
    print(f"Result: {result8}")
    print(f"Is valid min heap: {is_valid_min_heap(result8)}")
    print()

    # Test case 9: Test insert and extract_min operations
    print("Test 9: Insert and Extract operations")
    heap = []
    for val in [5, 3, 8, 1, 9, 2]:
        insert(heap, val)
        print(f"  After inserting {val}: {heap}")

    print("  Extracting mins:")
    while heap:
        min_val = extract_min(heap)
        print(f"    Extracted {min_val}, heap: {heap}")
    print()

    print("All tests completed!")


if __name__ == "__main__":
    test_build_min_heap()
