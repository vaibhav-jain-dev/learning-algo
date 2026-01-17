# Tournament Winner

**Difficulty:** Easy (Green)

## Problem Statement

There's an algorithms tournament taking place in which teams of programmers compete against each other to solve algorithmic problems as fast as possible. Teams compete in a round robin, where each team faces off against all other teams.

Only two teams compete against each other at a time, and for each competition, one team is designated the home team, while the other team is the away team. In each competition there's always one winner and one loser; there are no ties. A team receives 3 points if it wins and 0 points if it loses. The winner of the tournament is the team that receives the most points.

Given an array of pairs representing the teams that have competed against each other and an array containing the results of each competition, write a function that returns the winner of the tournament.

## Examples

**Example 1:**
```
Input:
competitions = [
    ["HTML", "C#"],
    ["C#", "Python"],
    ["Python", "HTML"]
]
results = [0, 0, 1]

Output: "Python"

Explanation:
- HTML vs C#: C# wins (result=0 means away team wins)
- C# vs Python: Python wins
- Python vs HTML: Python wins
Python has 6 points (2 wins), C# has 3 points, HTML has 0 points
```

## Constraints

- competitions[i] = [homeTeam, awayTeam]
- results[i] = 1 means home team won, 0 means away team won
- Only one team will win the tournament
- Each team competes against all other teams exactly once

## Hints

<details>
<summary>Hint 1</summary>
Use a hash map/dictionary to keep track of each team's score.
</details>

<details>
<summary>Hint 2</summary>
Iterate through all competitions, determine the winner, and update their score.
</details>

<details>
<summary>Hint 3</summary>
Track the current best team as you go to avoid a second pass through the hash map.
</details>

## Approach

### Hash Map Solution
1. Create a dictionary to store team scores
2. Initialize variables to track the best team and best score
3. For each competition:
   - Determine winner based on result (1 = home wins, 0 = away wins)
   - Add 3 points to winner's score
   - Update best team if current winner's score exceeds best score
4. Return the best team

**Time Complexity:** O(n) where n is number of competitions
**Space Complexity:** O(k) where k is number of teams

---

## Similar Problems (Harder)

### 1. Tournament Bracket Winner
**Difficulty:** Medium

Given a single-elimination tournament bracket and match results, determine the winner. Teams are eliminated after one loss.

```
Input: bracket = [["A","B"],["C","D"]], results = [[1,0],[0,1]], finals_result = 1
Output: "A" (A beats B, D beats C, A beats D in finals)
```

### 2. Tournament with Tiebreakers
**Difficulty:** Medium

Same as tournament winner but with tiebreaker rules: if points are equal, the team with more head-to-head wins against tied opponents wins.

```
Input: competitions with circular ties
Output: Team with best tiebreaker record
```

### 3. Minimum Matches to Guarantee Winner
**Difficulty:** Hard

Given n teams and their current scores, determine the minimum number of remaining matches needed to guarantee a single winner.

```
Input: scores = {"A": 6, "B": 6, "C": 3}, remaining = [["A","B"],["B","C"]]
Output: 1 (just A vs B decides it)
```
