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

---

## 🧠 Thought Process & Pattern Recognition

### Why This Problem Seems Hard

At first, you might think:
- "I need to try all combinations of coins" → 2^n combinations!
- "Maybe dynamic programming for subset sum?" → Still expensive

But there's a **beautiful greedy insight** that makes this O(n log n).

### The "Aha!" Moment

**Key Observation:** If you can make all values from 1 to N, what happens when you add a new coin?

```
Can make: 1, 2, 3, 4, 5  (1 to N where N=5)
Add coin with value 3

New possibilities:
- 1+3=4, 2+3=5, 3+3=6, 4+3=7, 5+3=8
- Plus old: 1, 2, 3, 4, 5
- Together: 1, 2, 3, 4, 5, 6, 7, 8  (1 to N+coin = 8)

Can make: 1 to (N + coin) = 1 to 8 ✓
```

**The Magic Rule:**
```
If you can make 1 to N, and next coin C ≤ N + 1:
   → You can make 1 to (N + C)

If next coin C > N + 1:
   → You CANNOT make (N + 1)  ← This is the answer!
```

### Why Must We Sort?

We need to process smaller coins first to build up our range.

```
Unsorted: [5, 1, 1, 2]
- Start: can make 0
- Coin 5: 5 > 0+1=1 → Can't make 1!  WRONG ANSWER!

Sorted: [1, 1, 2, 5]
- Start: can make 0
- Coin 1: 1 ≤ 1 → can make 1 to 1
- Coin 1: 1 ≤ 2 → can make 1 to 2
- Coin 2: 2 ≤ 3 → can make 1 to 4
- Coin 5: 5 ≤ 5 → can make 1 to 9
- Answer: 10 ✓
```

---

## 📊 Visual Diagram: How It Works

```
coins = [5, 7, 1, 1, 2, 3, 22]
After sorting: [1, 1, 2, 3, 5, 7, 22]

Building the range step by step:

Start: can_make = 0 (nothing yet)
┌────────────────────────────────────────────────────────┐
│  Range: [nothing]                                      │
└────────────────────────────────────────────────────────┘

Coin 1: Is 1 ≤ 0+1? YES (1 ≤ 1) → can_make = 0 + 1 = 1
┌────────────────────────────────────────────────────────┐
│  Range: [1]                                            │
└────────────────────────────────────────────────────────┘

Coin 1: Is 1 ≤ 1+1? YES (1 ≤ 2) → can_make = 1 + 1 = 2
┌────────────────────────────────────────────────────────┐
│  Range: [1, 2]                                         │
└────────────────────────────────────────────────────────┘

Coin 2: Is 2 ≤ 2+1? YES (2 ≤ 3) → can_make = 2 + 2 = 4
┌────────────────────────────────────────────────────────┐
│  Range: [1, 2, 3, 4]                                   │
└────────────────────────────────────────────────────────┘

Coin 3: Is 3 ≤ 4+1? YES (3 ≤ 5) → can_make = 4 + 3 = 7
┌────────────────────────────────────────────────────────┐
│  Range: [1, 2, 3, 4, 5, 6, 7]                          │
└────────────────────────────────────────────────────────┘

Coin 5: Is 5 ≤ 7+1? YES (5 ≤ 8) → can_make = 7 + 5 = 12
┌────────────────────────────────────────────────────────┐
│  Range: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]        │
└────────────────────────────────────────────────────────┘

Coin 7: Is 7 ≤ 12+1? YES (7 ≤ 13) → can_make = 12 + 7 = 19
┌────────────────────────────────────────────────────────┐
│  Range: [1...19]                                       │
└────────────────────────────────────────────────────────┘

Coin 22: Is 22 ≤ 19+1? NO! (22 > 20) → STOP!
┌────────────────────────────────────────────────────────┐
│  Cannot make 20!  ← ANSWER                             │
│  The coin 22 is too big, it "jumps over" 20            │
└────────────────────────────────────────────────────────┘
```

---

## 🔄 Solution Approaches

### Approach 1: Greedy with Sorting ⭐ RECOMMENDED

**Time Complexity:** O(n log n) - dominated by sorting
**Space Complexity:** O(1) - in-place sorting, or O(n) for some languages

**Why This is Best:**
- Elegant single-pass solution after sorting
- No DP table or recursion needed
- Simple to implement and understand once you get the insight

```
Algorithm:
1. Sort coins ascending
2. Track current_change = 0 (max we can make)
3. For each coin:
   - If coin > current_change + 1 → return current_change + 1
   - Else: current_change += coin
4. Return current_change + 1
```

### Approach 2: Dynamic Programming (Subset Sum)

**Time Complexity:** O(n * S) where S is sum of all coins
**Space Complexity:** O(S)

**When to Consider:**
- If you need to track WHICH amounts are constructible
- Educational to understand the connection to subset sum

```
DP Approach (less efficient):
1. Create boolean array dp[0...sum] where dp[i] = can we make i?
2. dp[0] = True (we can make 0 with no coins)
3. For each coin, update dp from right to left
4. Find smallest i where dp[i] is False
```

### Approach 3: Brute Force (Exponential)

**Time Complexity:** O(2^n) - all subsets
**Space Complexity:** O(n) - recursion depth

**Don't Use This:**
- Only for understanding why greedy is better
- Impractical for n > 20

```
Try all 2^n subsets of coins
Track all achievable sums
Find smallest missing positive integer
```

---

## 📊 Approach Comparison Summary

```
┌────────────────────────┬───────────┬──────────┬──────────────────┐
│       Approach         │   Time    │  Space   │  Recommendation  │
├────────────────────────┼───────────┼──────────┼──────────────────┤
│ 1. Greedy + Sort       │ O(n log n)│   O(1)   │  ⭐ BEST CHOICE  │
│ 2. Dynamic Programming │  O(n * S) │   O(S)   │  ⚠️ Overkill     │
│ 3. Brute Force         │   O(2^n)  │   O(n)   │  ✗ Don't use     │
└────────────────────────┴───────────┴──────────┴──────────────────┘

Where: n = number of coins, S = sum of all coin values
```

---

## Edge Cases to Consider

1. **Empty array:** Return 1 (can't make any change)
2. **No coin of value 1:** Return 1 (can't make 1)
3. **All coins are 1:** Return n+1 (can make 1 to n)
4. **Perfect powers of 2:** [1,2,4,8] → can make 1-15, return 16

---

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
