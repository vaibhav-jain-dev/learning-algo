<div id="viz-config" style="display:none">
{"name":"First Duplicate Value","algorithm":"index-marking","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"array":[2,1,5,2,3,3,4]},"output":2,"inputRaw":"array=[2,1,5,2,3,3,4]","outputRaw":"2"},{"input":{"array":[2,1,5,3,3,2,4]},"output":3,"inputRaw":"array=[2,1,5,3,3,2,4]","outputRaw":"3"},{"input":{"array":[1,2,3,4,5]},"output":-1,"inputRaw":"array=[1,2,3,4,5]","outputRaw":"-1 (no duplicates)"},{"input":{"array":[1,1,2,3,3,2,2]},"output":1,"inputRaw":"array=[1,1,2,3,3,2,2]","outputRaw":"1"}]}
</div>

# First Duplicate Value

**Difficulty:** Medium

## Problem Statement

Given an array of integers between 1 and n (inclusive), where n is the length of the array, write a function that returns the first integer that appears more than once (when the array is read from left to right).

In other words, out of all the integers that might occur more than once in the input array, your function should return the one whose second occurrence has the minimum index.

If no integer appears more than once, your function should return -1.

**Note:** You're allowed to mutate the input array.

## Examples

**Example 1:**
```
Input: array = [2, 1, 5, 2, 3, 3, 4]
Output: 2
Explanation: 2 is the first integer that appears more than once.
             2's second occurrence is at index 3.
             3's second occurrence is at index 5.
             Since 3 < 5, 2 is the answer.
```

**Example 2:**
```
Input: array = [2, 1, 5, 3, 3, 2, 4]
Output: 3
Explanation: Both 2 and 3 appear twice, but 3's second occurrence (index 4)
             comes before 2's second occurrence (index 5).
```

**Example 3:**
```
Input: array = [1, 2, 3, 4, 5]
Output: -1
Explanation: No duplicates exist.
```

**Example 4:**
```
Input: array = [1, 1, 2, 3, 3, 2, 2]
Output: 1
```

## Constraints

- Array length n >= 1
- All integers are between 1 and n (inclusive)
- There can be duplicate integers

---

## Thought Process & Pattern Recognition

<details>
<summary><strong>Click to reveal thinking pattern</strong></summary>

### Step 1: Understand the Core Problem
**Question to ask yourself:** "How do I detect when I see a number for the second time?"

Key observation: We need to find the FIRST duplicate (minimum index of second occurrence), not just any duplicate.

### Step 2: Key Insight - Array as Hash Map
Since values are between 1 and n (where n is array length):
- We can use the array indices as a "hash map"
- For value `v`, we can use index `v-1` to store information
- By negating values, we can mark "seen" without extra space

### Step 3: Algorithm Pattern - Negative Marking
For each value `v`:
1. Go to index `abs(v) - 1`
2. If value at that index is negative, we've seen `v` before -> return `v`
3. Otherwise, negate the value at that index to mark `v` as seen

### Step 4: Why This Works
```
Array: [2, 1, 5, 2, 3, 3, 4]
Values are 1-7, indices are 0-6

v=2: Check index 1, mark as seen by negating
v=1: Check index 0, mark as seen by negating
v=5: Check index 4, mark as seen by negating
v=2: Check index 1, already negative! -> Return 2
```

</details>

---

## Visual Diagram: How It Works

<details>
<summary><strong>Click to see step-by-step visualization</strong></summary>

### Negative Marking Approach (O(1) Space)

```
Array: [2, 1, 5, 2, 3, 3, 4]
Index:  0  1  2  3  4  5  6

STEP 1: Process value 2
        - Check index |2|-1 = 1
        - array[1] = 1 (positive) -> not seen before
        - Mark: array[1] = -1
        Array: [2, -1, 5, 2, 3, 3, 4]

STEP 2: Process value -1 (take absolute: 1)
        - Check index |1|-1 = 0
        - array[0] = 2 (positive) -> not seen before
        - Mark: array[0] = -2
        Array: [-2, -1, 5, 2, 3, 3, 4]

STEP 3: Process value 5
        - Check index |5|-1 = 4
        - array[4] = 3 (positive) -> not seen before
        - Mark: array[4] = -3
        Array: [-2, -1, 5, 2, -3, 3, 4]

STEP 4: Process value 2
        - Check index |2|-1 = 1
        - array[1] = -1 (NEGATIVE!) -> 2 was seen before!
        - Return 2

Answer: 2
```

### Hash Set Approach Visualization

```
Array: [2, 1, 5, 2, 3, 3, 4]

i=0, v=2: seen={}, 2 not in seen, add 2. seen={2}
i=1, v=1: seen={2}, 1 not in seen, add 1. seen={2,1}
i=2, v=5: seen={2,1}, 5 not in seen, add 5. seen={2,1,5}
i=3, v=2: seen={2,1,5}, 2 IS in seen! Return 2

Answer: 2
```

</details>

---

## Solution Approaches

### Approach 1: Hash Set

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why This Approach?
- **Simple to implement** - Standard pattern
- **Easy to understand** - Clear logic
- **Works for any array** - No constraints on values

#### How It Works
1. Initialize empty hash set
2. For each element, check if in set
3. If yes, return it (first duplicate found)
4. If no, add to set

#### Complexity Analysis
```
TIME:  O(n) - Single pass through array
SPACE: O(n) - Hash set stores up to n elements
```

</details>

---

### Approach 2: Negative Marking (O(1) Space) - RECOMMENDED

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why This Approach?
- **Optimal space** - O(1) extra space
- **Clever technique** - Uses array as implicit hash map
- **Interview favorite** - Shows creative thinking

#### How It Works
Since values are 1 to n:
1. For value `v`, use index `abs(v) - 1` as marker
2. If value at marker index is negative, `v` is duplicate
3. Otherwise, negate value at marker index

#### Complexity Analysis
```
TIME:  O(n) - Single pass through array
SPACE: O(1) - No extra space (mutates input)
```

#### Important Note
This approach mutates the input array. If you need to preserve the original, use the hash set approach.

</details>

---

### Approach 3: Brute Force

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why Consider This Approach?
- **Simplest logic** - Check all pairs
- **No extra space** - O(1) space without mutation
- **Good starting point** - Before optimization

#### How It Works
1. For each element at index i
2. Check all elements at index j > i
3. If match found, track minimum second occurrence index

#### Complexity Analysis
```
TIME:  O(n^2) - Nested loops
SPACE: O(1)   - No extra space
```

</details>

---

## Approach Comparison Summary

```
+---------------------+----------+----------+------------------+
|      Approach       |   Time   |  Space   |  Recommendation  |
+---------------------+----------+----------+------------------+
| 1. Hash Set         |   O(n)   |   O(n)   |  Safe choice     |
| 2. Negative Marking |   O(n)   |   O(1)   |  BEST CHOICE     |
| 3. Brute Force      |  O(n^2)  |   O(1)   |  Not recommended |
+---------------------+----------+----------+------------------+

Note: Approach 2 requires values to be 1 to n and allows mutation.
```

---

## Hints

<details>
<summary>Hint 1</summary>
The simplest approach uses a hash set to track seen values. When you see a value that's already in the set, you've found the first duplicate.
</details>

<details>
<summary>Hint 2</summary>
For O(1) space: Since values are between 1 and n, you can use the array itself as a hash map. The value `v` can be "stored" at index `v-1`.
</details>

<details>
<summary>Hint 3</summary>
Mark a value as "seen" by negating the element at its corresponding index. If you find an already-negative value, you've found a duplicate.
</details>

---

## Time and Space Complexity

**Optimal Solution (Negative Marking):**
- **Time Complexity:** O(n) - Single pass through the array
- **Space Complexity:** O(1) - Uses the array itself as storage

**Hash Set Solution:**
- **Time Complexity:** O(n)
- **Space Complexity:** O(n)
