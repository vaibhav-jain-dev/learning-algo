# Non-Constructible Change

**Difficulty:** Easy (Green)

## Problem Statement

Given an array of positive integers representing the values of coins in your possession, write a function that returns the minimum amount of change (the minimum sum of money) that you cannot create.

The given coins can have any positive integer value and aren't necessarily unique (i.e., you can have multiple coins of the same value).

## Examples

**Example 1:**
```
Input: coins = [5, 7, 1, 1, 2, 3, 22]
Output: 20

Explanation:
After sorting: [1, 1, 2, 3, 5, 7, 22]
We can make: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
We cannot make: 20 (we'd need to skip 22 which is too big)
```

**Example 2:**
```
Input: coins = [1, 1, 1, 1, 1]
Output: 6
```

**Example 3:**
```
Input: coins = [1, 5, 1, 1, 1, 10, 15, 20, 100]
Output: 55
```

## Constraints

- All coin values are positive integers
- The array may be empty (return 1 in this case)
- Coins are not necessarily unique

## Hints

<details>
<summary>Hint 1</summary>
Sort the coins in ascending order first.
</details>

<details>
<summary>Hint 2</summary>
If you can make all values from 1 to N, and the next coin has value <= N+1, then you can make all values from 1 to N + coin.
</details>

<details>
<summary>Hint 3</summary>
If the next coin is greater than N+1, then N+1 is the answer (you can't make it).
</details>

## Approach

### Greedy with Sorting
1. Sort the coins in ascending order
2. Initialize `change = 0` (represents max change we can create)
3. For each coin:
   - If `coin > change + 1`, we can't make `change + 1`, return it
   - Otherwise, add coin to change: `change += coin`
4. Return `change + 1` (the next value we can't make)

**Time Complexity:** O(n log n) for sorting
**Space Complexity:** O(1) or O(n) depending on sort implementation

---

## Similar Problems (Harder)

### 1. Minimum Coins to Add
**Difficulty:** Medium

Given coins and a target, find the minimum number of coins to add so you can make all values from 1 to target.

```
Input: coins = [1, 3], target = 6
Output: 1 (add coin with value 2 to make all values 1-6)
```

### 2. Maximum Constructible Value
**Difficulty:** Medium

Given coins and a budget of K additional coins (each value 1), find the maximum consecutive range starting from 1 you can construct.

```
Input: coins = [1, 5, 10], budget = 2
Output: 8 (add two 1s to make [1,1,1,5,10], can make 1-8)
```

### 3. All Non-Constructible Values
**Difficulty:** Hard

Find all values up to a limit that cannot be constructed from the given coins.

```
Input: coins = [1, 3, 6, 10], limit = 25
Output: [15, 17, 19, 21, 22, 23, 24, 25]
```
