# Merge Overlapping Intervals

**Difficulty:** Medium

## Problem Statement

Write a function that takes in a non-empty array of arbitrary intervals, merges any overlapping intervals, and returns the new intervals in no particular order.

Each interval `interval` is an array of two integers, with `interval[0]` as the start of the interval and `interval[1]` as the end of the interval.

Note that back-to-back intervals aren't considered to be overlapping. For example, `[1, 5]` and `[6, 7]` aren't overlapping; however, `[1, 6]` and `[6, 7]` are indeed overlapping.

Also note that the start of any particular interval will always be less than or equal to the end of that interval.

## Examples

**Example 1:**
```
Input: intervals = [[1, 2], [3, 5], [4, 7], [6, 8], [9, 10]]
Output: [[1, 2], [3, 8], [9, 10]]
Explanation:
- [1, 2] has no overlap
- [3, 5], [4, 7], [6, 8] overlap -> merge to [3, 8]
- [9, 10] has no overlap
```

**Example 2:**
```
Input: intervals = [[1, 3], [2, 8], [9, 10]]
Output: [[1, 8], [9, 10]]
```

**Example 3:**
```
Input: intervals = [[1, 10], [2, 3], [4, 5], [6, 7]]
Output: [[1, 10]]
Explanation: [1, 10] contains all other intervals
```

**Example 4:**
```
Input: intervals = [[1, 2], [3, 4], [5, 6]]
Output: [[1, 2], [3, 4], [5, 6]]
Explanation: No overlaps, return as is
```

## Constraints

- The input array contains at least one interval
- Each interval has exactly two elements [start, end]
- start <= end for each interval

---

## Thought Process & Pattern Recognition

<details>
<summary><strong>Click to reveal thinking pattern</strong></summary>

### Step 1: Understand the Core Problem
**Question to ask yourself:** "When do two intervals overlap?"

Two intervals [a, b] and [c, d] overlap if and only if:
- The start of one is within the other's range
- Specifically: `max(a, c) <= min(b, d)`

Or more simply, after sorting by start: if `c <= b`, they overlap.

### Step 2: Key Insight - Sort First
If we sort intervals by start time, overlapping intervals become adjacent!

```
Unsorted: [[3,5], [1,2], [4,7], [6,8], [9,10]]
Sorted:   [[1,2], [3,5], [4,7], [6,8], [9,10]]

Now we can process left to right:
- [1,2] starts. No overlap with next (3 > 2).
- [3,5] starts. [4,7] overlaps (4 <= 5). Merge to [3,7].
- [3,7] current. [6,8] overlaps (6 <= 7). Merge to [3,8].
- [3,8] current. [9,10] no overlap (9 > 8).
```

### Step 3: Algorithm Pattern
1. Sort intervals by start time
2. Initialize result with first interval
3. For each subsequent interval:
   - If it overlaps with last result interval, merge them
   - Otherwise, add as new interval to result

### Step 4: Merging Logic
Two intervals [a, b] and [c, d] merge to:
- start = min(a, c) = a (since sorted)
- end = max(b, d)

</details>

---

## Visual Diagram: How It Works

<details>
<summary><strong>Click to see step-by-step visualization</strong></summary>

### Timeline Visualization

```
Input: [[1, 2], [3, 5], [4, 7], [6, 8], [9, 10]]

Timeline:
1   2   3   4   5   6   7   8   9   10
|---|                                    [1, 2]
        |-------|                        [3, 5]
            |----------|                 [4, 7]
                    |-------|            [6, 8]
                                |---|    [9, 10]

After merging:
1   2   3   4   5   6   7   8   9   10
|---|                                    [1, 2]
        |-------------------|            [3, 8]
                                |---|    [9, 10]
```

### Step-by-Step Algorithm

```
Sorted intervals: [[1,2], [3,5], [4,7], [6,8], [9,10]]

STEP 1: Initialize result with first interval
        result = [[1, 2]]
        current_last = [1, 2]

STEP 2: Process [3, 5]
        Does 3 <= 2? NO -> No overlap
        Add to result
        result = [[1, 2], [3, 5]]

STEP 3: Process [4, 7]
        Does 4 <= 5? YES -> Overlap!
        Merge: new_end = max(5, 7) = 7
        Update last interval: [3, 7]
        result = [[1, 2], [3, 7]]

STEP 4: Process [6, 8]
        Does 6 <= 7? YES -> Overlap!
        Merge: new_end = max(7, 8) = 8
        Update last interval: [3, 8]
        result = [[1, 2], [3, 8]]

STEP 5: Process [9, 10]
        Does 9 <= 8? NO -> No overlap
        Add to result
        result = [[1, 2], [3, 8], [9, 10]]

Output: [[1, 2], [3, 8], [9, 10]]
```

</details>

---

## Solution Approaches

### Approach 1: Sort and Merge (Optimal)

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why This Approach?
- **Optimal time** - O(n log n) due to sorting
- **Simple logic** - Linear scan after sorting
- **Standard technique** - Common pattern for interval problems

#### How It Works
1. Sort intervals by start time
2. Initialize result with first interval
3. For each interval, check if it overlaps with last in result
4. If overlap: merge by updating end
5. If no overlap: add as new interval

#### Complexity Analysis
```
TIME:  O(n log n) - Dominated by sorting
SPACE: O(n) - Result array (O(log n) for sorting if in-place)
```

</details>

---

### Approach 2: Brute Force

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why Consider This Approach?
- **Shows the problem** - Understand what needs to be done
- **Starting point** - Before optimization

#### How It Works
1. Repeatedly scan all pairs of intervals
2. If any two overlap, merge them
3. Continue until no more merges possible

#### Complexity Analysis
```
TIME:  O(n^2) - May need multiple passes
SPACE: O(n)   - Result array
```

</details>

---

## Approach Comparison Summary

```
+---------------------+------------+----------+------------------+
|      Approach       |    Time    |  Space   |  Recommendation  |
+---------------------+------------+----------+------------------+
| 1. Sort and Merge   | O(n log n) |   O(n)   |  BEST CHOICE     |
| 2. Brute Force      |   O(n^2)   |   O(n)   |  Not recommended |
+---------------------+------------+----------+------------------+
```

---

## Hints

<details>
<summary>Hint 1</summary>
The key insight is that if you sort intervals by their start time, overlapping intervals will be adjacent to each other.
</details>

<details>
<summary>Hint 2</summary>
After sorting, two adjacent intervals [a, b] and [c, d] overlap if c <= b. When they overlap, the merged interval is [a, max(b, d)].
</details>

<details>
<summary>Hint 3</summary>
Use a result array. For each interval, either merge it with the last interval in result (if overlap) or add it as a new interval.
</details>

---

## Time and Space Complexity

**Optimal Solution:**
- **Time Complexity:** O(n log n) - Dominated by sorting
- **Space Complexity:** O(n) - For the result array
