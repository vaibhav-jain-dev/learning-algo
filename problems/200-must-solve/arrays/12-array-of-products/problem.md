# Array of Products

**Difficulty:** Medium

## Problem Statement

Write a function that takes in a non-empty array of integers and returns an array of the same length, where each element in the output array is equal to the product of every other number in the input array.

In other words, the value at `output[i]` is equal to the product of every number in the input array other than `input[i]`.

**Important:** Solve this problem without using division.

## Examples

**Example 1:**
```
Input: array = [5, 1, 4, 2]
Output: [8, 40, 10, 20]
Explanation:
- output[0] = 1 * 4 * 2 = 8
- output[1] = 5 * 4 * 2 = 40
- output[2] = 5 * 1 * 2 = 10
- output[3] = 5 * 1 * 4 = 20
```

**Example 2:**
```
Input: array = [1, 2, 3, 4, 5]
Output: [120, 60, 40, 30, 24]
```

**Example 3:**
```
Input: array = [-5, 2, -4, 14, -6]
Output: [672, -1680, 840, -240, 560]
```

## Constraints

- The input array has at least 2 elements
- The array can contain positive, negative integers and zeros

---

## Thought Process & Pattern Recognition

<details>
<summary><strong>Click to reveal thinking pattern</strong></summary>

### Step 1: Understand the Core Problem
**Question to ask yourself:** "How can I compute the product of all elements except the current one without using division?"

If we could use division:
- Total product = product of all elements
- output[i] = total_product / array[i]

But we CAN'T use division, so we need another approach.

### Step 2: Key Insight - Prefix and Suffix Products
For each position i, the product of all other elements equals:
- (product of all elements to the LEFT of i) * (product of all elements to the RIGHT of i)

```
Array: [5, 1, 4, 2]

For index 2 (value 4):
- Left product:  5 * 1 = 5
- Right product: 2
- Result: 5 * 2 = 10
```

### Step 3: Algorithm Pattern
1. Build array of "left products" (running product from left)
2. Build array of "right products" (running product from right)
3. Result[i] = left[i] * right[i]

### Step 4: Space Optimization
Instead of two arrays, we can:
1. First pass: Build result with left products
2. Second pass: Multiply by right products on the fly

</details>

---

## Visual Diagram: How It Works

<details>
<summary><strong>Click to see step-by-step visualization</strong></summary>

### Two-Pass Approach

```
Array: [5, 1, 4, 2]

STEP 1: Calculate LEFT products (product of all elements to the left)
+-------+-------+-------+-------+
|   0   |   1   |   2   |   3   |
+-------+-------+-------+-------+
|   5   |   1   |   4   |   2   |  <- Original array
+-------+-------+-------+-------+
|   1   |   5   |  5*1  | 5*1*4 |  <- Left products
|       |       |  =5   | =20   |
+-------+-------+-------+-------+
|   1   |   5   |   5   |  20   |  <- left[]

STEP 2: Calculate RIGHT products (product of all elements to the right)
+-------+-------+-------+-------+
|   0   |   1   |   2   |   3   |
+-------+-------+-------+-------+
|   5   |   1   |   4   |   2   |  <- Original array
+-------+-------+-------+-------+
| 1*4*2 |  4*2  |   2   |   1   |  <- Right products
|  =8   |  =8   |       |       |
+-------+-------+-------+-------+
|   8   |   8   |   2   |   1   |  <- right[]

STEP 3: Multiply left[i] * right[i]
+-------+-------+-------+-------+
| left  |   1   |   5   |   5   |  20   |
+-------+-------+-------+-------+-------+
| right |   8   |   8   |   2   |   1   |
+-------+-------+-------+-------+-------+
| result|  1*8  |  5*8  |  5*2  | 20*1  |
|       |  =8   | =40   | =10   | =20   |
+-------+-------+-------+-------+-------+

Output: [8, 40, 10, 20]
```

### Space-Optimized Single Result Array

```
Array: [5, 1, 4, 2]

Pass 1 (Left to Right): Build left products in result
result = [1, 5, 5, 20]

Pass 2 (Right to Left): Multiply by right products
- i=3: result[3] = 20 * 1 = 20, rightProduct = 2
- i=2: result[2] = 5 * 2 = 10, rightProduct = 8
- i=1: result[1] = 5 * 8 = 40, rightProduct = 8
- i=0: result[0] = 1 * 8 = 8

Output: [8, 40, 10, 20]
```

</details>

---

## Solution Approaches

### Approach 1: Two Arrays (Left and Right Products)

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why This Approach?
- **Easy to understand** - Clear separation of concerns
- **O(n) time** - Three passes through array
- **Good for learning** - Shows the core concept

#### How It Works
1. Create left[] array: left[i] = product of all elements before i
2. Create right[] array: right[i] = product of all elements after i
3. result[i] = left[i] * right[i]

#### Complexity Analysis
```
TIME:  O(n) - Three passes through array
SPACE: O(n) - Two extra arrays of size n
```

</details>

---

### Approach 2: Optimized Space (Single Array)

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why This Approach?
- **Optimal space** - Only O(1) extra space (output doesn't count)
- **Same time complexity** - O(n)
- **Interview favorite** - Shows optimization skills

#### How It Works
1. First pass (left to right): Store left products in result array
2. Second pass (right to left): Multiply by right products using a single variable

#### Complexity Analysis
```
TIME:  O(n) - Two passes through array
SPACE: O(1) - Only one variable for running right product
       (Output array doesn't count as extra space)
```

</details>

---

### Approach 3: Brute Force

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why Consider This Approach?
- **Simplest to understand** - Direct translation of problem
- **Good starting point** - Before optimization

#### How It Works
1. For each position i
2. Multiply all elements except array[i]

#### Complexity Analysis
```
TIME:  O(n^2) - For each of n elements, multiply n-1 others
SPACE: O(1)   - No extra space (besides output)
```

</details>

---

## Approach Comparison Summary

```
+---------------------+----------+----------+------------------+
|      Approach       |   Time   |  Space   |  Recommendation  |
+---------------------+----------+----------+------------------+
| 1. Two Arrays       |   O(n)   |   O(n)   |  Good for learn  |
| 2. Single Array     |   O(n)   |   O(1)   |  BEST CHOICE     |
| 3. Brute Force      |  O(n^2)  |   O(1)   |  Not recommended |
+---------------------+----------+----------+------------------+
```

---

## Hints

<details>
<summary>Hint 1</summary>
Think about this: for any position i, what you need is the product of all elements BEFORE i multiplied by the product of all elements AFTER i.
</details>

<details>
<summary>Hint 2</summary>
Can you precompute prefix products (running product from left) and suffix products (running product from right)?
</details>

<details>
<summary>Hint 3</summary>
For optimal space, first fill the result array with left products, then traverse from right to left, multiplying by the running right product.
</details>

---

## Time and Space Complexity

**Optimal Solution:**
- **Time Complexity:** O(n) - Two passes through the array
- **Space Complexity:** O(1) - Only constant extra space (output array doesn't count)
