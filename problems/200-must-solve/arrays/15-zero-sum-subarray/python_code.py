# Zero Sum Subarray
# Time: O(n) | Space: O(n)

def zeroSumSubarray(nums):
    """
    Determines if there exists a contiguous subarray that sums to zero.
    Uses prefix sum with hash set for O(n) solution.

    Key insight: If prefix sum repeats, the subarray between equals 0.
    """
    # Start with 0 to handle subarray starting at index 0
    prefix_sums = {0}
    current_sum = 0

    for num in nums:
        current_sum += num
        # If we've seen this prefix sum before, found zero sum subarray
        if current_sum in prefix_sums:
            return True
        prefix_sums.add(current_sum)

    return False


# Alternative: Return the subarray indices
def zeroSumSubarrayWithIndices(nums):
    """
    Returns the start and end indices of a zero-sum subarray, or None if not found.
    """
    prefix_sums = {0: -1}  # Maps prefix sum to its first occurrence index
    current_sum = 0

    for i, num in enumerate(nums):
        current_sum += num
        if current_sum in prefix_sums:
            # Found! Subarray is from prefix_sums[current_sum]+1 to i
            start = prefix_sums[current_sum] + 1
            return (start, i)
        prefix_sums[current_sum] = i

    return None


# Test cases
if __name__ == "__main__":
    # Test 1: Has zero sum subarray
    print(zeroSumSubarray([1, 2, -2, 3]))  # True (subarray [2, -2])

    # Test 2: No zero sum subarray
    print(zeroSumSubarray([1, 2, 3, 4, 5]))  # False

    # Test 3: Zero sum from start
    print(zeroSumSubarray([-5, 5, 2, -3, 1]))  # True (subarray [-5, 5])

    # Test 4: Single zero
    print(zeroSumSubarray([1, 0, 3]))  # True (subarray [0])

    # Test with indices
    print(zeroSumSubarrayWithIndices([1, 2, -2, 3]))  # (1, 2)
