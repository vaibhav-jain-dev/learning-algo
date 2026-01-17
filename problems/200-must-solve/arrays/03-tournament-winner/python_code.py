"""
Tournament Winner - Python Solution

Determine the winner of a round-robin tournament based on competition results.

Time Complexity: O(n) where n is number of competitions
Space Complexity: O(k) where k is number of teams
"""

def tournament_winner(competitions, results):
    """
    Find the tournament winner based on competition results.

    Args:
        competitions: List of [homeTeam, awayTeam] pairs
        results: List of results (1 = home wins, 0 = away wins)

    Returns:
        str: Name of the winning team
    """
    HOME_TEAM_WON = 1
    POINTS_FOR_WIN = 3

    scores = {}
    best_team = ""
    best_score = 0

    for i, competition in enumerate(competitions):
        home_team, away_team = competition
        result = results[i]

        # Determine winner
        winner = home_team if result == HOME_TEAM_WON else away_team

        # Update score
        scores[winner] = scores.get(winner, 0) + POINTS_FOR_WIN

        # Update best team if needed
        if scores[winner] > best_score:
            best_score = scores[winner]
            best_team = winner

    return best_team


def tournament_winner_detailed(competitions, results):
    """Alternative solution that returns full standings."""
    scores = {}

    for i, (home, away) in enumerate(competitions):
        winner = home if results[i] == 1 else away
        scores[winner] = scores.get(winner, 0) + 3

    # Sort by score descending
    standings = sorted(scores.items(), key=lambda x: -x[1])
    return standings[0][0], standings


# Test cases
if __name__ == "__main__":
    # Test 1: Basic tournament
    competitions1 = [
        ["HTML", "C#"],
        ["C#", "Python"],
        ["Python", "HTML"]
    ]
    results1 = [0, 0, 1]
    winner1 = tournament_winner(competitions1, results1)
    print(f"Test 1: {winner1}")  # Expected: Python

    # Test 2: Clear winner with all wins
    competitions2 = [
        ["A", "B"],
        ["A", "C"],
        ["A", "D"]
    ]
    results2 = [1, 1, 1]
    winner2 = tournament_winner(competitions2, results2)
    print(f"Test 2: {winner2}")  # Expected: A

    # Test 3: Away team dominance
    competitions3 = [
        ["Bulls", "Eagles"],
        ["Bulls", "Bears"],
        ["Bears", "Eagles"]
    ]
    results3 = [0, 0, 0]
    winner3 = tournament_winner(competitions3, results3)
    print(f"Test 3: {winner3}")  # Expected: Eagles

    # Test 4: Single competition
    competitions4 = [["Team1", "Team2"]]
    results4 = [1]
    winner4 = tournament_winner(competitions4, results4)
    print(f"Test 4: {winner4}")  # Expected: Team1

    # Test 5: Larger tournament
    competitions5 = [
        ["A", "B"], ["C", "D"], ["E", "F"],
        ["A", "C"], ["B", "D"], ["E", "A"],
        ["F", "B"], ["C", "E"], ["D", "F"]
    ]
    results5 = [1, 1, 1, 0, 1, 0, 1, 1, 0]
    winner5, standings = tournament_winner_detailed(competitions5, results5)
    print(f"Test 5: {winner5}")
    print(f"Standings: {standings}")

    print("\nAll tests completed!")
