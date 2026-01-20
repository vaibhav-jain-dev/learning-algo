<div id="viz-config" style="display:none">
{"name":"Two Number Sum","algorithm":"hash-table-two-sum","complexity":{"time":"O(n)","space":"O(n)"},"examples":[{"input":{"array":[3,5,-4,8,11,1,-1,6],"targetSum":10},"output":[-1,11],"inputRaw":"array=[3,5,-4,8,11,1,-1,6], targetSum=10","outputRaw":"[-1,11]"},{"input":{"array":[1,2,3,4,5],"targetSum":10},"output":[],"inputRaw":"array=[1,2,3,4,5], targetSum=10","outputRaw":"[]"},{"input":{"array":[4,6],"targetSum":10},"output":[4,6],"inputRaw":"array=[4,6], targetSum=10","outputRaw":"[4,6]"},{"input":{"array":[4,6,1,-3],"targetSum":3},"output":[6,-3],"inputRaw":"array=[4,6,1,-3], targetSum=3","outputRaw":"[6,-3]"}]}
</div>

# Two Number Sum

**Difficulty:** Easy

## Problem Statement

Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. If any two numbers in the input array sum up to the target sum, the function should return them in an array, in any order. If no two numbers sum up to the target sum, the function should return an empty array.

Note that the target sum has to be obtained by summing two different integers in the array; you can't add a single integer to itself in order to obtain the target sum.

You can assume that there will be at most one pair of numbers summing up to the target sum.

## Examples

**Example 1:**
```
Input: array = [3, 5, -4, 8, 11, 1, -1, 6], targetSum = 10
Output: [-1, 11] (or [11, -1])
Explanation: -1 + 11 = 10
```

**Example 2:**
```
Input: array = [1, 2, 3, 4, 5], targetSum = 10
Output: []
Explanation: No two numbers sum to 10
```

**Example 3:**
```
Input: array = [4, 6], targetSum = 10
Output: [4, 6]
```

**Example 4:**
```
Input: array = [4, 6, 1, -3], targetSum = 3
Output: [6, -3]
```

## Constraints

- The array contains at least one integer
- All integers in the array are distinct
- There is at most one valid pair

---

## Thought Process & Pattern Recognition

<details>
<summary><strong>Click to reveal thinking pattern</strong></summary>

### Step 1: Understand the Core Problem
**Question to ask yourself:** "For each number, what other number do I need?"
- If we have a number `x` and target is `T`, we need `T - x`
- This is a classic "complement" problem

### Step 2: Identify the Pattern
**Key insight:** For every number, we can calculate its complement and check if it exists.

```
Array: [3, 5, -4, 8, 11, 1, -1, 6], Target: 10

For 3:  need 10-3 = 7   -> not in array
For 5:  need 10-5 = 5   -> can't use same number
For -4: need 10-(-4)=14 -> not in array
For 8:  need 10-8 = 2   -> not in array
For 11: need 10-11 = -1 -> YES! -1 is in array!
```

### Step 3: Recognize Algorithm Patterns
This can be solved with:
1. **Brute Force** - Check all pairs O(n^2)
2. **Hash Table** - Store seen numbers, check complement O(n)
3. **Two Pointers** - Sort first, then use pointers O(n log n)

### Step 4: Choose Optimal Solution
- Hash table approach is optimal for unsorted input: O(n) time, O(n) space
- Two pointer is good if array is already sorted or we can't use extra space

</details>

---

## Visual Diagram: How It Works

<details>
<summary><strong>Click to see step-by-step visualization</strong></summary>

### Hash Table Approach

```
Array: [3, 5, -4, 8, 11, 1, -1, 6]
Target: 10

Step 1: num=3, need=7
        seen = {}
        7 not in seen
        seen = {3}

Step 2: num=5, need=5
        5 not in seen
        seen = {3, 5}

Step 3: num=-4, need=14
        14 not in seen
        seen = {3, 5, -4}

Step 4: num=8, need=2
        2 not in seen
        seen = {3, 5, -4, 8}

Step 5: num=11, need=-1
        -1 not in seen
        seen = {3, 5, -4, 8, 11}

Step 6: num=1, need=9
        9 not in seen
        seen = {3, 5, -4, 8, 11, 1}

Step 7: num=-1, need=11
        11 IS in seen! FOUND IT!
        Return [-1, 11]
```

### Two Pointer Approach (after sorting)

```
Sorted: [-4, -1, 1, 3, 5, 6, 8, 11]
Target: 10

         L                       R
        [-4, -1, 1, 3, 5, 6, 8, 11]

Sum = -4 + 11 = 7 < 10 -> move L right

             L                   R
        [-4, -1, 1, 3, 5, 6, 8, 11]

Sum = -1 + 11 = 10 = Target! FOUND!
Return [-1, 11]
```

</details>

---

## Solution Approaches

### Approach 1: Hash Table (One Pass)

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why This Approach?
- **Optimal time complexity** - O(n) single pass
- **Simple logic** - Check complement in hash table
- **Works on unsorted arrays** - No preprocessing needed

#### How It Works
1. Initialize empty hash set for seen numbers
2. For each number, calculate complement (target - number)
3. If complement in set, return pair
4. Otherwise, add current number to set

#### Complexity Analysis
```
TIME:  O(n) - Single pass through array
SPACE: O(n) - Hash set stores up to n elements
```

</details>

---

### Approach 2: Two Pointers (Sort First)

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why This Approach?
- **No extra space needed** (if we can modify input)
- **Good when array is already sorted**
- **Intuitive pointer movement**

#### How It Works
1. Sort the array
2. Place left pointer at start, right at end
3. If sum equals target, return pair
4. If sum < target, move left pointer right
5. If sum > target, move right pointer left

#### Complexity Analysis
```
TIME:  O(n log n) - Due to sorting
SPACE: O(1) or O(n) - Depends on sort implementation
```

</details>

---

### Approach 3: Brute Force

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why Consider This Approach?
- **Simplest to implement** - Good for understanding
- **No extra space** - O(1) space
- **Good starting point** - Before optimization

#### How It Works
1. For each element at index i
2. Check all elements at index j > i
3. If sum equals target, return pair

#### Complexity Analysis
```
TIME:  O(n^2) - Nested loops
SPACE: O(1)   - No extra space
```

</details>

---

## Approach Comparison Summary

```
+-------------------+------------+----------+------------------+
|     Approach      |    Time    |  Space   |  Recommendation  |
+-------------------+------------+----------+------------------+
| 1. Hash Table     |    O(n)    |   O(n)   |  BEST CHOICE     |
| 2. Two Pointers   | O(n log n) |   O(1)   |  Good if sorted  |
| 3. Brute Force    |   O(n^2)   |   O(1)   |  Learning only   |
+-------------------+------------+----------+------------------+
```

---

## Hints

<details>
<summary>Hint 1</summary>
Try using a hash table to store the numbers you've seen so far.
</details>

<details>
<summary>Hint 2</summary>
For each number x, you're looking for (targetSum - x). Can you check if this complement exists in O(1) time?
</details>

<details>
<summary>Hint 3</summary>
Alternatively, sort the array first. Then use two pointers - one at start, one at end. How should you move them based on the current sum?
</details>

---

## Time and Space Complexity

**Optimal Solution (Hash Table):**
- **Time Complexity:** O(n) - Single pass through the array
- **Space Complexity:** O(n) - Hash set to store seen numbers

**Two Pointer Solution:**
- **Time Complexity:** O(n log n) - Dominated by sorting
- **Space Complexity:** O(1) - If sorting in place
