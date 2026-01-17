# Three Sum with Duplicates

**Difficulty:** Medium-Hard

## Problem Statement

Given an array of integers that may contain duplicates, find all unique triplets in the array which give the sum of the target value.

**Important:** The solution set must not contain duplicate triplets.

## Examples

**Example 1:**
```
Input: array = [1, 1, 1, 2, 2, 3], target = 6
Output: [[1, 2, 3]]
Explanation: Only one unique triplet sums to 6. Although there are multiple 1s and 2s,
             we only report [1, 2, 3] once.
```

**Example 2:**
```
Input: array = [-1, 0, 1, 2, -1, -4], target = 0
Output: [[-1, -1, 2], [-1, 0, 1]]
Explanation: Two unique triplets sum to 0.
```

**Example 3:**
```
Input: array = [0, 0, 0, 0], target = 0
Output: [[0, 0, 0]]
Explanation: Only one unique triplet possible.
```

**Example 4:**
```
Input: array = [1, 2, -2, -1], target = 0
Output: []
Explanation: No triplet sums to 0.
```

**Example 5:**
```
Input: array = [-2, 0, 0, 2, 2], target = 0
Output: [[-2, 0, 2]]
Explanation: Although there are multiple 0s and 2s, only one unique triplet.
```

## Constraints

- Array may contain duplicate values
- Array length is at least 0
- Return empty array if no valid triplets exist
- Each triplet should be sorted in ascending order
- The list of triplets should not contain duplicates

---

## Solution Approaches

### Approach 1: Brute Force with Set for Deduplication

#### How It Works
```
1. Generate all possible triplets
2. Sort each triplet and add to a set
3. Convert set back to list
```

#### Complexity
```
Time: O(n^3) for generation + O(k) for deduplication
Space: O(k) where k is number of unique triplets
```

---

### Approach 2: Sort + Two Pointers + Skip Duplicates (RECOMMENDED)

#### Why This Approach is Best
- **O(n^2) time** - Same as basic three sum
- **Handles duplicates elegantly** - Skip logic prevents duplicates naturally
- **No extra set needed** - Deduplication happens during search

#### How It Works
```
1. Sort the array
2. For each element at index i:
   - SKIP if array[i] == array[i-1] (avoid duplicate first elements)
   - Use two pointers (left, right)
   - When match found:
     - Add triplet
     - SKIP duplicates on left: while left < right and array[left] == array[left-1]: left++
     - SKIP duplicates on right: while left < right and array[right] == array[right+1]: right--
     - Move both pointers
```

#### Visual Example
```
Array: [-1, 0, 1, 2, -1, -4], Target: 0

Step 0: Sort -> [-4, -1, -1, 0, 1, 2]
                  0   1   2  3  4  5

i=0 (-4): left=1, right=5
  -4 + -1 + 2 = -3 < 0, move left
  -4 + -1 + 2 = -3 < 0, move left
  -4 + 0 + 2 = -2 < 0, move left
  -4 + 1 + 2 = -1 < 0, move left
  left >= right, done

i=1 (-1): left=2, right=5
  -1 + -1 + 2 = 0 = 0  FOUND: [-1, -1, 2]
  Skip duplicate left (-1): left=3
  Skip duplicate right: none
  -1 + 0 + 1 = 0 = 0  FOUND: [-1, 0, 1]
  left=4, right=4, done

i=2 (-1): SKIP because array[2] == array[1] (both -1)

i=3 (0): left=4, right=5
  0 + 1 + 2 = 3 > 0, move right
  left >= right, done

Result: [[-1, -1, 2], [-1, 0, 1]]
```

#### Key Skip Logic Explained
```
1. Skip duplicate first element:
   if i > 0 and array[i] == array[i-1]: continue

2. After finding match, skip duplicate second element:
   while left < right and array[left] == array[left-1]: left++

3. After finding match, skip duplicate third element:
   while left < right and array[right] == array[right+1]: right--
```

#### Complexity Analysis
```
Time Complexity: O(n^2)
  - Sorting: O(n log n)
  - Two nested loops: O(n^2)
  - Skip operations are O(n) total, absorbed by main loop

Space Complexity: O(1) excluding output
  - Only pointer variables
  - Sorting typically in-place
```

---

### Approach 3: Hash Set for Both Lookup and Deduplication

#### How It Works
```
1. Sort the array
2. Use a set to store found triplets (as tuples)
3. For each pair, use hash set to find complement
4. Convert set to list at the end
```

#### Complexity
```
Time: O(n^2)
Space: O(n) for hash set + O(k) for result set
```

Note: More space than two-pointer approach.

---

## Approach Comparison

```
+-------------------+----------+--------+--------------------+
|     Approach      |   Time   | Space  |   Recommendation   |
+-------------------+----------+--------+--------------------+
| Brute + Set       |   O(n^3) |  O(k)  |   Too slow         |
| Sort + 2-Ptr+Skip |   O(n^2) |  O(1)  |   RECOMMENDED      |
| Hash + Set        |   O(n^2) | O(n+k) |   More space       |
+-------------------+----------+--------+--------------------+
```

---

## Common Mistakes

1. **Forgetting to skip duplicates at ALL levels**
   - Must skip duplicates for first, second, AND third elements

2. **Off-by-one in skip logic**
   ```python
   # WRONG: This skips the first occurrence too!
   while left < right and array[left] == array[left+1]: left++

   # CORRECT: Only skip AFTER using the value
   left++  # Use the value first
   while left < right and array[left] == array[left-1]: left++
   ```

3. **Not moving pointers after finding match**
   - Must move BOTH left and right after finding a triplet

---

## Key Insights

1. **Sorting is essential** - Enables both two-pointer and duplicate detection
2. **Skip after, not before** - Use the value, then skip duplicates
3. **Triple-level deduplication** - Check duplicates at each position
4. **Sorted output comes free** - Array is already sorted

---

## Hints

<details>
<summary>Hint 1</summary>
Sort the array first. This helps with both two-pointer technique and duplicate detection.
</details>

<details>
<summary>Hint 2</summary>
When iterating through the first element, skip if it's the same as the previous element.
</details>

<details>
<summary>Hint 3</summary>
After finding a valid triplet, skip over duplicate values for both the left and right pointers.
</details>

---

## Related Problems

- Three Number Sum (distinct elements)
- Three Sum Closest
- Four Sum (same concept, one more element)
