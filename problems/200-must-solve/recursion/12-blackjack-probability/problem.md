<div id="viz-config" style="display:none">
{"name":"Blackjack Probability","algorithm":"recursion-probability","complexity":{"time":"O(target - startingHand)","space":"O(target - startingHand)"},"examples":[{"input":{"target":21,"startingHand":15},"output":0.45,"inputRaw":"target = 21, startingHand = 15","outputRaw":"0.4500 (approximately)"}]}
</div>

# Blackjack Probability

**Difficulty:** Medium

## Problem Statement

In a simplified blackjack game, you are given a `target` value (the maximum hand value before busting, typically 21) and your current hand value `startingHand`.

Your goal is to calculate the probability that you will "bust" (exceed the target) if you keep drawing cards until your hand value is greater than or equal to `target`.

The deck has an infinite number of cards with values 1 through 10, and each card has an equal probability (1/10) of being drawn.

Write a function that returns the probability of busting given the `target` and `startingHand`.

## Examples

**Example 1:**
```
Input: target = 21, startingHand = 15
Output: 0.4500 (approximately)

Explanation:
- If you draw 1-6 (60% chance), you reach 16-21 and stop without busting
- If you draw 7-10 (40% chance), you bust immediately
- But from hands 16-20, you might still bust on subsequent draws
- The exact probability considers all these recursive cases
```

**Example 2:**
```
Input: target = 21, startingHand = 21
Output: 0.0

Explanation: Your hand equals target, so you stop drawing immediately.
```

**Example 3:**
```
Input: target = 21, startingHand = 22
Output: 1.0

Explanation: Your hand already exceeds target, so you've already busted.
```

**Example 4:**
```
Input: target = 17, startingHand = 12
Output: ~0.4556

Explanation: With a lower target, the probability of busting changes.
```

## Constraints

- 1 <= target <= 21
- 0 <= startingHand <= target + 10
- Each card value (1-10) has equal probability 1/10
- Drawing stops when hand >= target

## Hints

<details>
<summary>Hint 1</summary>
Think recursively: the probability of busting from hand value h is the average of probabilities after drawing each possible card (1-10).
</details>

<details>
<summary>Hint 2</summary>
Base cases: If hand >= target, return 0 (stopped before bust). If hand > target, return 1 (already busted).
</details>

<details>
<summary>Hint 3</summary>
Use memoization! The same hand value will be reached through different paths, and recomputing wastes time.
</details>

<details>
<summary>Hint 4</summary>
The recurrence is: P(bust | hand) = (1/10) * sum of P(bust | hand + card) for card in 1..10
</details>

## Approach

### Recursive Solution with Memoization

1. **Base Cases:**
   - If `currentHand > target`: return 1.0 (already busted)
   - If `currentHand >= target`: return 0.0 (stopped drawing, didn't bust)

   Wait - these seem contradictory! The key insight:
   - We stop drawing when `currentHand >= target`
   - We bust when `currentHand > target`
   - So the correct base case is: if `currentHand >= target`, return 1.0 if `currentHand > target`, else 0.0

2. **Recursive Case:**
   - For each possible card draw (1 through 10), calculate the probability of busting
   - Average these probabilities: `P(bust) = (1/10) * sum(P(bust | hand + card))`

3. **Memoization:**
   - Cache results for each hand value to avoid recomputation
   - Key observation: only hand values from startingHand to target + 10 matter

### Formula

```
P(bust | h) = 0                                      if h == target
P(bust | h) = 1                                      if h > target
P(bust | h) = (1/10) * SUM(P(bust | h+c)) for c=1..10   otherwise
```

**Time Complexity:** O(target - startingHand) with memoization, as each state is computed once
**Space Complexity:** O(target - startingHand) for memoization cache and recursion stack

---

## Similar Problems

### 1. New 21 Game (LeetCode 837)
Similar probability calculation but with different stopping conditions and card values.
- **Key difference:** Drawing stops at K or more points, win if not exceeding N.

### 2. Knight Probability in Chessboard
Calculate probability that a knight stays on board after k moves.
- **Key difference:** 2D grid state space with 8 possible moves instead of 10 cards.

### 3. Dice Roll Simulation
Calculate probabilities of reaching certain sums with dice rolls.
- **Key difference:** May have constraints on consecutive rolls.
