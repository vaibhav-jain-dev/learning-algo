"""
Three Number Sum - Python Solution

Find all triplets that sum to a target value.
Uses sorting and two-pointer technique.

Time Complexity: O(n²)
Space Complexity: O(n) for output
"""

def three_number_sum(array, target_sum):
    """
    Find all triplets that sum to target_sum.

    Args:
        array: List of distinct integers
        target_sum: Target sum to find

    Returns:
        List[List[int]]: All triplets summing to target, sorted
    """
    array.sort()
    triplets = []

    for i in range(len(array) - 2):
        left = i + 1
        right = len(array) - 1

        while left < right:
            current_sum = array[i] + array[left] + array[right]

            if current_sum == target_sum:
                triplets.append([array[i], array[left], array[right]])
                left += 1
                right -= 1
            elif current_sum < target_sum:
                left += 1
            else:
                right -= 1

    return triplets


def three_number_sum_hash(array, target_sum):
    """Alternative solution using hash set - different approach."""
    array.sort()
    triplets = []

    for i in range(len(array) - 2):
        seen = set()
        target = target_sum - array[i]

        for j in range(i + 1, len(array)):
            complement = target - array[j]
            if complement in seen:
                triplets.append([array[i], complement, array[j]])
            seen.add(array[j])

    return triplets


# Test cases
if __name__ == "__main__":
    # Test 1: Multiple triplets
    array1 = [12, 3, 1, 2, -6, 5, -8, 6]
    target1 = 0
    result1 = three_number_sum(array1, target1)
    print(f"Test 1: {result1}")
    # Expected: [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]

    # Test 2: Single triplet
    array2 = [1, 2, 3]
    target2 = 6
    result2 = three_number_sum(array2, target2)
    print(f"Test 2: {result2}")
    # Expected: [[1, 2, 3]]

    # Test 3: No triplets
    array3 = [1, 2, 3, 4, 5]
    target3 = 100
    result3 = three_number_sum(array3, target3)
    print(f"Test 3: {result3}")
    # Expected: []

    # Test 4: Negative numbers
    array4 = [-5, -3, -1, 0, 1, 3, 5]
    target4 = 0
    result4 = three_number_sum(array4, target4)
    print(f"Test 4: {result4}")
    # Expected: [[-5, 0, 5], [-3, -1, 4], [-3, 0, 3], [-1, 0, 1]]

    # Test 5: Two methods comparison
    array5 = [8, 10, -2, 49, 14]
    target5 = 57
    result5a = three_number_sum(array5, target5)
    result5b = three_number_sum_hash(array5, target5)
    print(f"Test 5:")
    print(f"  Two-pointer: {result5a}")
    print(f"  Hash method: {result5b}")

    # Test 6: Larger array
    array6 = [-1, 0, 1, 2, -1, -4, 3, 5]
    target6 = 4
    result6 = three_number_sum(array6, target6)
    print(f"Test 6: {result6}")

    print("\nAll tests completed!")
