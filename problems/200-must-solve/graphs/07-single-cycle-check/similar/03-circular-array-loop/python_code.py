"""
Circular Array Loop - Python Solution

Detect valid cycle in circular array with same-direction constraint.

Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import List


def circular_array_loop(nums: List[int]) -> bool:
    """
    Detect if circular array has valid cycle.

    A valid cycle:
    - Has length > 1
    - All elements have same sign (all positive or all negative)

    Args:
        nums: Array of non-zero integers

    Returns:
        True if valid cycle exists
    """
    n = len(nums)

    def get_next(idx: int) -> int:
        """Get next index with circular wrap."""
        return (idx + nums[idx]) % n

    def same_direction(idx1: int, idx2: int) -> bool:
        """Check if two indices have same direction."""
        return (nums[idx1] > 0) == (nums[idx2] > 0)

    for i in range(n):
        # Skip if already processed (marked as 0)
        if nums[i] == 0:
            continue

        slow = i
        fast = i

        # Check if cycle has consistent direction
        while same_direction(slow, get_next(slow)) and \
              same_direction(fast, get_next(fast)) and \
              same_direction(get_next(fast), get_next(get_next(fast))):

            slow = get_next(slow)
            fast = get_next(get_next(fast))

            if slow == fast:
                # Check cycle length > 1
                if slow == get_next(slow):
                    break  # Self-loop, invalid
                return True

        # Mark all elements in this path as visited
        # They cannot form a valid cycle
        j = i
        val = nums[i]
        while nums[j] != 0 and (nums[j] > 0) == (val > 0):
            next_j = get_next(j)
            nums[j] = 0
            j = next_j

    return False


def circular_array_loop_v2(nums: List[int]) -> bool:
    """
    Alternative implementation with clearer logic.

    Args:
        nums: Array of non-zero integers

    Returns:
        True if valid cycle exists
    """
    n = len(nums)
    nums = nums.copy()  # Don't modify original

    def next_idx(idx: int) -> int:
        return (idx + nums[idx]) % n

    for i in range(n):
        if nums[i] == 0:
            continue

        is_forward = nums[i] > 0
        slow, fast = i, i

        while True:
            # Move slow one step
            next_slow = next_idx(slow)
            if nums[next_slow] == 0 or (nums[next_slow] > 0) != is_forward:
                break

            # Move fast two steps
            next_fast = next_idx(fast)
            if nums[next_fast] == 0 or (nums[next_fast] > 0) != is_forward:
                break

            fast = next_fast
            next_fast = next_idx(fast)
            if nums[next_fast] == 0 or (nums[next_fast] > 0) != is_forward:
                break

            slow = next_slow
            fast = next_fast

            if slow == fast:
                # Verify cycle length > 1
                if next_idx(slow) != slow:
                    return True
                break

        # Mark path as invalid
        j = i
        while nums[j] != 0 and (nums[j] > 0) == is_forward:
            next_j = next_idx(j)
            nums[j] = 0
            j = next_j

    return False


def find_cycle_indices(nums: List[int]) -> List[int]:
    """
    Find the indices that form a valid cycle.

    Args:
        nums: Array of non-zero integers

    Returns:
        List of indices in the cycle, or empty list
    """
    n = len(nums)

    def get_next(idx: int) -> int:
        return (idx + nums[idx]) % n

    def same_direction(idx1: int, idx2: int) -> bool:
        return (nums[idx1] > 0) == (nums[idx2] > 0)

    for i in range(n):
        slow = i
        fast = i
        is_forward = nums[i] > 0

        while True:
            next_slow = get_next(slow)
            if (nums[next_slow] > 0) != is_forward:
                break

            next_fast = get_next(fast)
            if (nums[next_fast] > 0) != is_forward:
                break

            fast = next_fast
            next_fast = get_next(fast)
            if (nums[next_fast] > 0) != is_forward:
                break

            slow = next_slow
            fast = next_fast

            if slow == fast:
                if get_next(slow) == slow:
                    break  # Self-loop

                # Collect cycle indices
                cycle = [slow]
                current = get_next(slow)
                while current != slow:
                    cycle.append(current)
                    current = get_next(current)
                return cycle

    return []


# Test cases
if __name__ == "__main__":
    # Test 1: Valid cycle
    nums1 = [2, -1, 1, 2, 2]
    result1 = circular_array_loop(nums1.copy())
    print(f"Test 1: {result1}")
    assert result1 == True, f"Expected True, got {result1}"

    # Test 2: Self-loop (invalid)
    nums2 = [-1, 2]
    result2 = circular_array_loop(nums2.copy())
    print(f"Test 2: {result2}")
    assert result2 == False, f"Expected False, got {result2}"

    # Test 3: Mixed directions
    nums3 = [-2, 1, -1, -2, -2]
    result3 = circular_array_loop(nums3.copy())
    print(f"Test 3: {result3}")
    assert result3 == False, f"Expected False, got {result3}"

    # Test 4: Another valid cycle
    nums4 = [1, 1, 1, 1, 1]
    result4 = circular_array_loop(nums4.copy())
    print(f"Test 4: {result4}")
    assert result4 == True, f"Expected True, got {result4}"

    # Test 5: Negative cycle
    nums5 = [-1, -2, -3, -4, -5]
    result5 = circular_array_loop(nums5.copy())
    print(f"Test 5: {result5}")

    # Test 6: Find cycle indices
    nums6 = [2, -1, 1, 2, 2]
    cycle_indices = find_cycle_indices(nums6)
    print(f"Test 6: Cycle indices = {cycle_indices}")

    # Test 7: V2 implementation
    result7 = circular_array_loop_v2([2, -1, 1, 2, 2])
    print(f"Test 7 (V2): {result7}")
    assert result7 == True

    print("\nAll tests passed!")
