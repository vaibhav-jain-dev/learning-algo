"""
Tournament Winner - Python Solutions

Determine the winner of a round-robin tournament based on competition results.

This file contains MULTIPLE solution approaches with explanations.
"""

from typing import List, Tuple, Dict


# ============================================================================
# APPROACH 1: HashMap with Running Best ⭐ RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - single pass through competitions
# Space Complexity: O(k) - k unique teams in hashmap
#
# WHY THIS IS BEST:
# - Single pass through data
# - No need to iterate hashmap at the end
# - Clean and efficient
# - Optimal time complexity
# ============================================================================

def tournament_winner(competitions: List[List[str]], results: List[int]) -> str:
    """
    Find the tournament winner using hashmap with running best tracking.

    How it works:
    1. Maintain a hashmap of team -> score
    2. For each competition, determine winner and add 3 points
    3. After each update, check if this team is now the best
    4. Return best team (no second pass needed!)

    Visual:
        competitions = [["A","B"], ["A","C"], ["B","C"]]
        results      = [   1,         1,         0    ]

        Process:
        A wins vs B → scores={A:3}, best=A(3)
        A wins vs C → scores={A:6}, best=A(6)
        C wins vs B → scores={A:6,C:3}, best=A(6)  ← A still best

        Return: "A"
    """
    HOME_TEAM_WON = 1
    POINTS_FOR_WIN = 3

    scores: Dict[str, int] = {}
    best_team = ""
    best_score = 0

    for i, competition in enumerate(competitions):
        home_team, away_team = competition
        result = results[i]

        # Determine winner based on result
        winner = home_team if result == HOME_TEAM_WON else away_team

        # Update winner's score
        scores[winner] = scores.get(winner, 0) + POINTS_FOR_WIN

        # Update best team if this winner now has the highest score
        if scores[winner] > best_score:
            best_score = scores[winner]
            best_team = winner

    return best_team


# ============================================================================
# APPROACH 2: HashMap + Max at End
# ============================================================================
# Time Complexity:  O(n + k) - process competitions + find max in hashmap
# Space Complexity: O(k) - k unique teams
#
# WHEN TO USE:
# - When you need full standings, not just winner
# - When processing and aggregation are separate steps
# - Conceptually simpler for some people
# ============================================================================

def tournament_winner_two_pass(competitions: List[List[str]], results: List[int]) -> str:
    """
    Find winner by building hashmap first, then finding max.

    How it works:
    Phase 1: Process all competitions, build complete scores hashmap
    Phase 2: Iterate through hashmap to find team with maximum score

    This is slightly less efficient but conceptually clearer:
    - First loop: focus only on counting points
    - Second loop: focus only on finding maximum
    """
    scores: Dict[str, int] = {}

    # Phase 1: Build scores hashmap
    for i, competition in enumerate(competitions):
        home_team, away_team = competition
        winner = home_team if results[i] == 1 else away_team
        scores[winner] = scores.get(winner, 0) + 3

    # Phase 2: Find team with maximum score
    best_team = ""
    best_score = 0
    for team, score in scores.items():
        if score > best_score:
            best_score = score
            best_team = team

    return best_team


# ============================================================================
# APPROACH 3: With Full Standings (Sorting-Based)
# ============================================================================
# Time Complexity:  O(n + k log k) - process + sort all teams
# Space Complexity: O(k)
#
# WHEN TO USE:
# - When you need ranked standings, not just winner
# - When displaying leaderboard
# - When there are tiebreakers
# ============================================================================

def tournament_winner_with_standings(
    competitions: List[List[str]],
    results: List[int]
) -> Tuple[str, List[Tuple[str, int]]]:
    """
    Find winner AND return full standings sorted by score.

    Returns:
        Tuple of (winner_name, sorted_standings)
        where standings is [(team, score), ...] sorted by score descending

    Use case: When you need to display a leaderboard, not just the winner.
    """
    scores: Dict[str, int] = {}

    # Initialize all teams with 0 points (to include losers in standings)
    for home, away in competitions:
        scores.setdefault(home, 0)
        scores.setdefault(away, 0)

    # Process competitions
    for i, (home, away) in enumerate(competitions):
        winner = home if results[i] == 1 else away
        scores[winner] += 3

    # Sort by score descending, then by name for stability
    standings = sorted(scores.items(), key=lambda x: (-x[1], x[0]))

    return standings[0][0], standings


# ============================================================================
# ALTERNATIVE: Using collections.Counter
# ============================================================================

from collections import Counter

def tournament_winner_counter(competitions: List[List[str]], results: List[int]) -> str:
    """
    Pythonic solution using Counter.

    Counter is a specialized dict for counting - cleaner syntax.
    """
    scores = Counter()
    best_team = ""
    best_score = 0

    for i, (home, away) in enumerate(competitions):
        winner = home if results[i] == 1 else away
        scores[winner] += 3

        if scores[winner] > best_score:
            best_score = scores[winner]
            best_team = winner

    return best_team


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (competitions, results, expected, description)
        (
            [["HTML", "C#"], ["C#", "Python"], ["Python", "HTML"]],
            [0, 0, 1],
            "Python",
            "Basic tournament"
        ),
        (
            [["A", "B"], ["A", "C"], ["A", "D"]],
            [1, 1, 1],
            "A",
            "Clear winner - all wins"
        ),
        (
            [["Bulls", "Eagles"], ["Bulls", "Bears"], ["Bears", "Eagles"]],
            [0, 0, 0],
            "Eagles",
            "Away team dominance"
        ),
        (
            [["Team1", "Team2"]],
            [1],
            "Team1",
            "Single competition"
        ),
        (
            [["X", "Y"], ["Y", "Z"], ["Z", "X"]],
            [1, 1, 1],
            "X",
            "Circular results"
        ),
    ]

    approaches = [
        ("HashMap + Running Best (Recommended)", tournament_winner),
        ("HashMap + Max at End", tournament_winner_two_pass),
        ("Using Counter", tournament_winner_counter),
    ]

    print("=" * 70)
    print("TOURNAMENT WINNER - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for competitions, results, expected, desc in test_cases:
            result = func(competitions, results)
            status = "✓" if result == expected else "✗"
            if result != expected:
                all_passed = False
            print(f"  {status} {desc}: {result}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")

    # Test standings approach separately
    print("\n\nWith Standings Approach:")
    print("-" * 50)
    winner, standings = tournament_winner_with_standings(
        [["HTML", "C#"], ["C#", "Python"], ["Python", "HTML"]],
        [0, 0, 1]
    )
    print(f"  Winner: {winner}")
    print(f"  Standings: {standings}")

    print("\n" + "=" * 70)
    print("COMPLEXITY COMPARISON")
    print("=" * 70)
    print("""
    ┌───────────────────────────┬──────────┬──────────┬──────────────────┐
    │         Approach          │   Time   │  Space   │  Recommendation  │
    ├───────────────────────────┼──────────┼──────────┼──────────────────┤
    │ 1. HashMap + Running Best │   O(n)   │   O(k)   │  ⭐ BEST CHOICE  │
    │ 2. HashMap + Max at End   │  O(n+k)  │   O(k)   │  ✓ Also good     │
    │ 3. Sorting-Based          │O(n+klogk)│   O(k)   │  ⚠️ For standings │
    └───────────────────────────┴──────────┴──────────┴──────────────────┘

    Where: n = competitions, k = unique teams
    """)


if __name__ == "__main__":
    run_tests()
