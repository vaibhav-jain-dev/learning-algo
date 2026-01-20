"""
Merge Overlapping Intervals - Python Solutions

Merge overlapping intervals and return non-overlapping intervals.

This file contains MULTIPLE solution approaches with explanations.
"""

from typing import List


# ============================================================================
# APPROACH 1: Sort and Merge - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n log n) - dominated by sorting
# Space Complexity: O(n) - result array
#
# WHY THIS IS BEST:
# - Optimal time complexity (can't do better than O(n log n))
# - Simple and clean implementation
# - Standard technique for interval problems
# ============================================================================

def merge_overlapping_intervals(intervals: List[List[int]]) -> List[List[int]]:
    """
    Merge overlapping intervals using sort and merge approach.

    How it works:
    1. Sort intervals by start time
    2. Initialize result with first interval
    3. For each subsequent interval:
       - If overlaps with last in result: merge (update end)
       - If no overlap: add as new interval

    Visual:
        intervals = [[1,2], [3,5], [4,7], [6,8], [9,10]]

        sorted = [[1,2], [3,5], [4,7], [6,8], [9,10]]

        result = [[1,2]]
        [3,5]: 3 > 2, no overlap -> result = [[1,2], [3,5]]
        [4,7]: 4 <= 5, overlap -> merge to [3,7], result = [[1,2], [3,7]]
        [6,8]: 6 <= 7, overlap -> merge to [3,8], result = [[1,2], [3,8]]
        [9,10]: 9 > 8, no overlap -> result = [[1,2], [3,8], [9,10]]
    """
    # Sort by start time
    sorted_intervals = sorted(intervals, key=lambda x: x[0])

    # Initialize result with first interval
    merged = [sorted_intervals[0]]

    for current_start, current_end in sorted_intervals[1:]:
        last_start, last_end = merged[-1]

        # Check if current interval overlaps with last merged interval
        if current_start <= last_end:
            # Overlap: merge by extending the end
            merged[-1][1] = max(last_end, current_end)
        else:
            # No overlap: add as new interval
            merged.append([current_start, current_end])

    return merged


# ============================================================================
# APPROACH 2: In-Place Sort and Merge
# ============================================================================
# Time Complexity:  O(n log n) - dominated by sorting
# Space Complexity: O(1) - modifies input in place (not counting output)
#
# WHEN TO USE:
# - When you can modify input array
# - When minimizing memory allocation matters
# ============================================================================

def merge_overlapping_intervals_in_place(intervals: List[List[int]]) -> List[List[int]]:
    """
    Merge overlapping intervals, modifying input in place.

    Same algorithm as above but sorts input directly.
    """
    # Sort in place by start time
    intervals.sort(key=lambda x: x[0])

    # Use a write pointer to track merged position
    write_idx = 0

    for i in range(1, len(intervals)):
        # Check if current interval overlaps with last merged
        if intervals[i][0] <= intervals[write_idx][1]:
            # Overlap: extend the end of merged interval
            intervals[write_idx][1] = max(intervals[write_idx][1], intervals[i][1])
        else:
            # No overlap: move to next position
            write_idx += 1
            intervals[write_idx] = intervals[i]

    # Return only the merged portion
    return intervals[:write_idx + 1]


# ============================================================================
# APPROACH 3: Brute Force (Educational)
# ============================================================================
# Time Complexity:  O(n^2) - repeated scanning
# Space Complexity: O(n) - result array
#
# EDUCATIONAL VALUE:
# - Shows iterative merging approach
# - Demonstrates why sorting helps
# ============================================================================

def merge_overlapping_intervals_brute_force(intervals: List[List[int]]) -> List[List[int]]:
    """
    Merge intervals using brute force - repeatedly find and merge overlaps.

    How it works:
    1. Copy intervals to result
    2. Repeatedly scan for overlapping pairs
    3. When found, merge them and restart scan
    4. Stop when no overlaps found

    Why it's slow:
        Each merge may require O(n) scan
        Worst case: n merges * n scans = O(n^2)
    """
    result = [interval[:] for interval in intervals]

    def overlaps(int1, int2):
        """Check if two intervals overlap."""
        return max(int1[0], int2[0]) <= min(int1[1], int2[1])

    def merge_two(int1, int2):
        """Merge two overlapping intervals."""
        return [min(int1[0], int2[0]), max(int1[1], int2[1])]

    # Keep merging until no changes
    changed = True
    while changed:
        changed = False
        i = 0
        while i < len(result):
            j = i + 1
            while j < len(result):
                if overlaps(result[i], result[j]):
                    # Merge and remove one
                    result[i] = merge_two(result[i], result[j])
                    result.pop(j)
                    changed = True
                else:
                    j += 1
            i += 1

    return result


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (intervals, expected, description)
        ([[1, 2], [3, 5], [4, 7], [6, 8], [9, 10]],
         [[1, 2], [3, 8], [9, 10]], "Standard case"),
        ([[1, 3], [2, 8], [9, 10]],
         [[1, 8], [9, 10]], "Two overlapping"),
        ([[1, 10], [2, 3], [4, 5], [6, 7]],
         [[1, 10]], "One contains all"),
        ([[1, 2], [3, 4], [5, 6]],
         [[1, 2], [3, 4], [5, 6]], "No overlaps"),
        ([[1, 3], [2, 4], [3, 5]],
         [[1, 5]], "Chain overlap"),
        ([[6, 8], [1, 9], [2, 4], [4, 7]],
         [[1, 9]], "Unsorted, all merge"),
        ([[1, 2]],
         [[1, 2]], "Single interval"),
        ([[1, 4], [4, 5]],
         [[1, 5]], "Touching intervals"),
        ([[1, 5], [6, 10]],
         [[1, 5], [6, 10]], "Adjacent but not touching"),
    ]

    def intervals_equal(a, b):
        """Compare two lists of intervals (order independent)."""
        return sorted(a) == sorted(b)

    print("=" * 70)
    print("MERGE OVERLAPPING INTERVALS - TEST RESULTS")
    print("=" * 70)

    approaches = [
        ("Sort and Merge (Recommended)", merge_overlapping_intervals),
        ("In-Place Sort and Merge", merge_overlapping_intervals_in_place),
        ("Brute Force", merge_overlapping_intervals_brute_force),
    ]

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for intervals, expected, desc in test_cases:
            # Deep copy input
            input_copy = [interval[:] for interval in intervals]
            result = func(input_copy)
            status = "PASS" if intervals_equal(result, expected) else "FAIL"
            if not intervals_equal(result, expected):
                all_passed = False
            print(f"  [{status}] {desc}")
            if status == "FAIL":
                print(f"         Expected: {expected}")
                print(f"         Got:      {result}")

        if all_passed:
            print("  All tests passed!")

    print("\n" + "=" * 70)
    print("COMPLEXITY COMPARISON")
    print("=" * 70)
    print("""
    +---------------------+------------+----------+------------------+
    |      Approach       |    Time    |  Space   |  Recommendation  |
    +---------------------+------------+----------+------------------+
    | 1. Sort and Merge   | O(n log n) |   O(n)   |  BEST CHOICE     |
    | 2. In-Place         | O(n log n) |   O(1)   |  If can mutate   |
    | 3. Brute Force      |   O(n^2)   |   O(n)   |  Not recommended |
    +---------------------+------------+----------+------------------+
    """)


if __name__ == "__main__":
    run_tests()
