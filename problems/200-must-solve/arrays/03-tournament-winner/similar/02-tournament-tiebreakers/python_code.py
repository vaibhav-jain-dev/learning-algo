"""
Tournament with Tiebreakers - Python Solutions

Same as tournament winner but with tiebreaker rules: if points are equal,
the team with more head-to-head wins against tied opponents wins.
"""

from typing import List, Dict
from collections import defaultdict


# ============================================================================
# APPROACH 1: HashMap with Head-to-Head Tracking ⭐ RECOMMENDED
# ============================================================================

def tournament_winner_with_tiebreakers(
    competitions: List[List[str]], results: List[int]
) -> str:
    """Find winner using head-to-head tiebreaker."""
    stats: Dict[str, Dict] = defaultdict(lambda: {"points": 0, "head_to_head": defaultdict(int)})

    # Process all competitions
    for (home, away), result in zip(competitions, results):
        winner = home if result == 1 else away
        loser = away if result == 1 else home

        stats[winner]["points"] += 3
        stats[winner]["head_to_head"][loser] += 1
        _ = stats[loser]  # Ensure loser exists

    # Find teams with max points
    max_points = max(s["points"] for s in stats.values())
    tied_teams = [team for team, s in stats.items() if s["points"] == max_points]

    if len(tied_teams) == 1:
        return tied_teams[0]

    # Head-to-head tiebreaker among tied teams
    tied_set = set(tied_teams)
    head_to_head_wins = {}

    for team in tied_teams:
        wins = sum(
            stats[team]["head_to_head"][opp]
            for opp in stats[team]["head_to_head"]
            if opp in tied_set
        )
        head_to_head_wins[team] = wins

    # Return team with best head-to-head record
    return max(tied_teams, key=lambda t: head_to_head_wins[t])


# ============================================================================
# TEST CASES
# ============================================================================

if __name__ == "__main__":
    print("=" * 70)
    print("TOURNAMENT WITH TIEBREAKERS - TEST RESULTS")
    print("=" * 70)

    # Test: A, B, C circular but A wins more head-to-head
    competitions = [["A", "B"], ["B", "C"], ["C", "A"], ["A", "B"], ["B", "C"], ["C", "A"]]
    results = [1, 1, 0, 1, 1, 0]

    print(f"\nCompetitions: {competitions}")
    print(f"Results: {results}")
    print(f"Winner: {tournament_winner_with_tiebreakers(competitions, results)}")

    # Sample Input
    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    competitions = [["A", "B"], ["B", "C"], ["A", "C"]]
    results = [1, 1, 1]
    print(f"\nInput: competitions = {competitions}, results = {results}")
    print(f"Output: {tournament_winner_with_tiebreakers(competitions, results)}")
