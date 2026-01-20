# Tournament Bracket Winner

**Difficulty:** Medium (Yellow)

## Problem Statement

You are organizing a single-elimination tournament bracket. In a single-elimination tournament, teams are paired up and compete against each other. The loser of each match is immediately eliminated from the tournament, while the winner advances to the next round. This process continues until only one team remains - the tournament champion.

Given:
- A 2D array `bracket` representing the tournament rounds, where each inner array contains pairs of teams competing against each other in that round
- A 2D array `results` where `results[round][match]` indicates the winner (1 = first team wins, 0 = second team wins)
- An integer `finals_result` indicating the winner of the final match

Write a function that simulates the tournament and returns the name of the tournament champion.

## Examples

**Example 1:**
```
Input:
bracket = [["A", "B"], ["C", "D"]]  # Round 1: A vs B, C vs D
results = [[1, 0]]                   # Round 1: A wins, D wins
finals_result = 1                    # A wins the final

Output: "A"

Explanation:
- Round 1: A beats B, D beats C
- Finals: A beats D
- Champion: A
```

**Example 2:**
```
Input:
bracket = [["Alpha", "Beta"], ["Gamma", "Delta"], ["Epsilon", "Zeta"], ["Eta", "Theta"]]
results = [[1, 0, 1, 0], [0, 1]]    # Round 1 results, then Round 2 results
finals_result = 1

Output: "Delta"

Explanation:
- Round 1: Alpha wins, Delta wins, Epsilon wins, Theta wins
- Round 2: Delta beats Alpha, Theta beats Epsilon
- Finals: Delta beats Theta
- Champion: Delta
```

**Example 3:**
```
Input:
bracket = [["Team1", "Team2"]]       # Only 2 teams
results = []                          # No preliminary rounds
finals_result = 0                     # Team2 wins

Output: "Team2"

Explanation: Direct final between Team1 and Team2, Team2 wins.
```

## Constraints

- Number of teams is always a power of 2 (2, 4, 8, 16, ...)
- 1 <= number of teams <= 64
- Each team name is a non-empty string
- results[i][j] is either 0 or 1
- finals_result is either 0 or 1

---

## Thought Process & Pattern Recognition

### Recognizing the Problem Type

This is a **simulation/bracket progression** problem where we need to:
1. Track which teams advance through each round
2. Pair up winners for the next round
3. Continue until we have a final winner

### The "Aha!" Moment

**Key Insight:** The number of teams halves each round, and we can simulate this by processing matches and collecting winners.

**Why Simulation?**
- Each round's results depend on the previous round's winners
- We need to maintain the bracket structure (pairing winners correctly)
- Natural fit for iterative processing

```
8 teams -> 4 winners -> 2 finalists -> 1 champion
```

---

## Visual Diagram: How It Works

```
Initial Bracket (8 teams):
                          CHAMPION
                              |
              +---------[Finals]----------+
              |                           |
        [Semi 1]                    [Semi 2]
         /    \                      /    \
    [Q1]      [Q2]              [Q3]      [Q4]
    /  \      /  \              /  \      /  \
   A    B    C    D            E    F    G    H

Example simulation with results:
Round 1: A>B, D>C, E>F, H>G  -->  Winners: [A, D, E, H]
Round 2: A>D, H>E            -->  Winners: [A, H]
Finals:  A>H                 -->  Champion: A
```

---

## Solution Approaches

### Approach 1: Round-by-Round Simulation - RECOMMENDED

**Time Complexity:** O(n) where n = number of teams
**Space Complexity:** O(n) for storing current round participants

**Why This is Best:**
- Follows natural tournament structure
- Easy to understand and implement
- Handles any number of rounds automatically

```
Core Logic:
1. Start with initial bracket pairs
2. For each round:
   - Process matches, collect winners
   - Winners become next round's participants
3. Final two teams play finals
4. Return finals winner
```

### Approach 2: Recursive Tree Traversal

**Time Complexity:** O(n)
**Space Complexity:** O(log n) recursion stack

**When to Use:**
- When bracket is given as a tree structure
- When you need to compute winner from any subtree

### Approach 3: Single Pass with Index Mapping

**Time Complexity:** O(n)
**Space Complexity:** O(n)

**When to Use:**
- When bracket is represented as a flat array
- When match indices follow a specific pattern

---

## Approach Comparison Summary

```
+-------------------------------+----------+----------+------------------+
|          Approach             |   Time   |  Space   |  Recommendation  |
+-------------------------------+----------+----------+------------------+
| 1. Round-by-Round Simulation  |   O(n)   |   O(n)   |  BEST CHOICE     |
| 2. Recursive Tree Traversal   |   O(n)   | O(log n) |  Good for trees  |
| 3. Single Pass Index Mapping  |   O(n)   |   O(n)   |  For flat arrays |
+-------------------------------+----------+----------+------------------+

Where: n = number of teams
```

---

## Key Implementation Details

### Understanding the Bracket Structure
```
- Teams are paired: [team1, team2], [team3, team4], ...
- Result = 1: First team in pair wins
- Result = 0: Second team in pair wins
- Winners of adjacent pairs meet in next round
```

### Handling Different Round Counts
```
2 teams  = 0 preliminary rounds + finals
4 teams  = 1 preliminary round + finals
8 teams  = 2 preliminary rounds + finals
n teams  = log2(n) - 1 preliminary rounds + finals
```

---

## Hints

<details>
<summary>Hint 1</summary>
Track the current participants. After each round, the winners become the new participants.
</details>

<details>
<summary>Hint 2</summary>
Process pairs of participants - match 0 and 1, match 2 and 3, etc.
</details>

<details>
<summary>Hint 3</summary>
The finals are just another match between the last two remaining participants.
</details>
