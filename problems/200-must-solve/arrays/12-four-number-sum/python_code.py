"""
Four Number Sum - Python Solution

Find all quadruplets that sum to a target value.
Uses hash table to store pair sums.

Time Complexity: O(n²) average, O(n³) worst case
Space Complexity: O(n²)
"""

def four_number_sum(array, target_sum):
    """
    Find all quadruplets summing to target_sum.

    Args:
        array: List of distinct integers
        target_sum: Target sum to find

    Returns:
        List[List[int]]: All quadruplets summing to target
    """
    pair_sums = {}  # sum -> list of [num1, num2] pairs
    quadruplets = []

    for i in range(1, len(array) - 1):
        # First: look for complementary pairs in hash table
        for j in range(i + 1, len(array)):
            current_sum = array[i] + array[j]
            difference = target_sum - current_sum

            if difference in pair_sums:
                for pair in pair_sums[difference]:
                    quadruplets.append(pair + [array[i], array[j]])

        # Then: add all pairs ending at i to hash table
        for k in range(0, i):
            current_sum = array[k] + array[i]
            if current_sum not in pair_sums:
                pair_sums[current_sum] = []
            pair_sums[current_sum].append([array[k], array[i]])

    return quadruplets


def four_number_sum_brute(array, target_sum):
    """Brute force O(n⁴) solution for verification."""
    n = len(array)
    quadruplets = []

    for i in range(n - 3):
        for j in range(i + 1, n - 2):
            for k in range(j + 1, n - 1):
                for l in range(k + 1, n):
                    if array[i] + array[j] + array[k] + array[l] == target_sum:
                        quadruplets.append([array[i], array[j], array[k], array[l]])

    return quadruplets


def four_number_sum_two_pointer(array, target_sum):
    """Two-pointer approach with sorted array."""
    array.sort()
    quadruplets = []
    n = len(array)

    for i in range(n - 3):
        for j in range(i + 1, n - 2):
            left = j + 1
            right = n - 1

            while left < right:
                current_sum = array[i] + array[j] + array[left] + array[right]

                if current_sum == target_sum:
                    quadruplets.append([array[i], array[j], array[left], array[right]])
                    left += 1
                    right -= 1
                elif current_sum < target_sum:
                    left += 1
                else:
                    right -= 1

    return quadruplets


# Test cases
if __name__ == "__main__":
    # Test 1: Multiple quadruplets
    arr1 = [7, 6, 4, -1, 1, 2]
    target1 = 16
    result1 = four_number_sum(arr1, target1)
    print(f"Test 1: {result1}")
    # Expected: [[7, 6, 4, -1], [7, 6, 1, 2]]

    # Test 2: Single quadruplet
    arr2 = [1, 2, 3, 4, 5, 6, 7]
    target2 = 10
    result2 = four_number_sum(arr2, target2)
    print(f"Test 2: {result2}")
    # Expected: [[1, 2, 3, 4]]

    # Test 3: No quadruplets
    arr3 = [1, 2, 3, 4]
    target3 = 100
    result3 = four_number_sum(arr3, target3)
    print(f"Test 3: {result3}")
    # Expected: []

    # Test 4: With negative numbers
    arr4 = [-2, -1, 1, 2, 3, 4, 5, 6]
    target4 = 10
    result4 = four_number_sum(arr4, target4)
    print(f"Test 4: {result4}")

    # Test 5: Compare methods
    arr5 = [1, 2, 3, 4, 5, -5, 6, -6]
    target5 = 5
    result5a = four_number_sum(arr5, target5)
    result5b = four_number_sum_two_pointer(arr5.copy(), target5)
    print(f"\nTest 5 - Comparison:")
    print(f"  Hash table: {sorted([sorted(q) for q in result5a])}")
    print(f"  Two pointer: {sorted([sorted(q) for q in result5b])}")

    # Test 6: Larger test
    arr6 = [5, 3, -2, 10, 7, 1, 4, -5, 8]
    target6 = 12
    result6 = four_number_sum(arr6, target6)
    print(f"\nTest 6: Found {len(result6)} quadruplets")
    for q in result6:
        print(f"  {q} = {sum(q)}")

    print("\nAll tests completed!")
