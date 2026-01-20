<div id="viz-config" style="display:none">
{"name":"Tournament Winner","algorithm":"hash-counting","complexity":{"time":"O(n)","space":"O(k)"},"examples":[{"input":{"competitions":[["HTML","C#"],["C#","Python"],["Python","HTML"]],"results":[0,0,1]},"output":"Python","inputRaw":"competitions=[['HTML','C#'],['C#','Python'],['Python','HTML']], results=[0,0,1]","outputRaw":"Python"},{"input":{"competitions":[["A","B"],["B","C"],["C","A"]],"results":[1,1,1]},"output":"A","inputRaw":"competitions=[['A','B'],['B','C'],['C','A']], results=[1,1,1]","outputRaw":"A"}]}
</div>

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

---

## 🧠 Thought Process & Pattern Recognition

### Recognizing the Problem Type

This is a **"counting/aggregation"** problem where we need to:
1. Process a stream of events (competition results)
2. Aggregate data (total points per team)
3. Find the maximum (best team)

### The "Aha!" Moment

**Key Insight:** We need to maintain a running count and track the current best.

**Why HashMap?**
- We need to associate each team name with its score
- Team names are strings (not indices)
- Fast O(1) lookup and update

**Optimization:** Track best team AS WE GO, not in a second pass!

```
Without tracking:
1. Process all competitions → O(n)
2. Find max in hashmap   → O(k)   extra pass!

With tracking:
1. Process + update best → O(n)   single pass!
```

---

## 📊 Visual Diagram: How It Works

```
competitions = [["HTML","C#"], ["C#","Python"], ["Python","HTML"]]
results      = [      0,            0,              1         ]

Step-by-step processing:

Competition 1: HTML vs C# (result=0 → away wins → C# wins)
┌──────────────────────────────────────────────────────────┐
│  scores = {"C#": 3}                                      │
│  bestTeam = "C#", bestScore = 3                          │
└──────────────────────────────────────────────────────────┘

Competition 2: C# vs Python (result=0 → away wins → Python wins)
┌──────────────────────────────────────────────────────────┐
│  scores = {"C#": 3, "Python": 3}                         │
│  bestTeam = "C#", bestScore = 3  (no change, scores tie) │
└──────────────────────────────────────────────────────────┘

Competition 3: Python vs HTML (result=1 → home wins → Python wins)
┌──────────────────────────────────────────────────────────┐
│  scores = {"C#": 3, "Python": 6}                         │
│  bestTeam = "Python", bestScore = 6  ← Python takes lead │
└──────────────────────────────────────────────────────────┘

Final Answer: "Python" with 6 points ✓
```

---

## 🔄 Solution Approaches

### Approach 1: HashMap with Running Best ⭐ RECOMMENDED

**Time Complexity:** O(n) - single pass through competitions
**Space Complexity:** O(k) - k unique teams in hashmap

**Why This is Best:**
- Single pass through data
- No need to iterate hashmap at the end
- Clean and efficient
- Optimal time complexity

```
Core Logic:
For each competition:
  1. Determine winner from result
  2. Add 3 points to winner's score
  3. If winner's score > bestScore:
       Update bestTeam and bestScore
```

### Approach 2: HashMap + Max at End

**Time Complexity:** O(n + k) - process competitions + find max
**Space Complexity:** O(k) - k unique teams

**When to Use:**
- When you need full standings, not just winner
- When processing and aggregation are separate steps
- Conceptually simpler for some

```
Two-phase approach:
Phase 1: Process all competitions, build scores hashmap
Phase 2: Iterate hashmap to find team with max score
```

### Approach 3: Sorting-Based (Overkill)

**Time Complexity:** O(n + k log k) - process + sort all teams
**Space Complexity:** O(k)

**When to Use:**
- When you need ranked standings
- When multiple tiebreakers exist

```
Process competitions → Build scores → Sort by score → Return first
```

---

## 📊 Approach Comparison Summary

```
┌───────────────────────────┬──────────┬──────────┬──────────────────┐
│         Approach          │   Time   │  Space   │  Recommendation  │
├───────────────────────────┼──────────┼──────────┼──────────────────┤
│ 1. HashMap + Running Best │   O(n)   │   O(k)   │  ⭐ BEST CHOICE  │
│ 2. HashMap + Max at End   │  O(n+k)  │   O(k)   │  ✓ Also good     │
│ 3. Sorting-Based          │O(n+klogk)│   O(k)   │  ⚠️ Overkill     │
└───────────────────────────┴──────────┴──────────┴──────────────────┘

Where:
  n = number of competitions
  k = number of unique teams
```

---

## Key Implementation Details

### Decoding Results
```
result = 1 → Home team wins (competitions[i][0])
result = 0 → Away team wins (competitions[i][1])
```

### Points System
```
Win  = 3 points
Lose = 0 points
```

---

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
