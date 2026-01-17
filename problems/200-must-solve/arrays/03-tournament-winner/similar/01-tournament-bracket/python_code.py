"""
Tournament Bracket Winner - Python Solutions

Determine the winner of a single-elimination tournament bracket.

This file contains MULTIPLE solution approaches with explanations.
"""

from typing import List


# ============================================================================
# APPROACH 1: Round-by-Round Simulation - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - process all n teams across all rounds
# Space Complexity: O(n) - store current round participants
#
# WHY THIS IS BEST:
# - Follows natural tournament structure
# - Easy to understand and implement
# - Handles any power-of-2 number of teams
# - Clear separation of rounds
# ============================================================================

def tournament_bracket_winner(
    bracket: List[List[str]],
    results: List[List[int]],
    finals_result: int
) -> str:
    """
    Find the tournament champion using round-by-round simulation.

    How it works:
    1. Start with initial bracket pairs as current participants
    2. For each round in results:
       - Process matches using that round's results
       - Collect winners as next round's participants
    3. Final two remaining teams play finals
    4. Return finals winner based on finals_result

    Visual:
        bracket = [["A","B"], ["C","D"]]
        results = [[1, 0]]  # A wins, D wins
        finals_result = 1   # First finalist wins

        Round 1: A vs B (1->A wins), C vs D (0->D wins)
        Participants after R1: [A, D]
        Finals: A vs D (1->A wins)
        Return: "A"
    """
    # Flatten initial bracket to get participants
    participants = [team for pair in bracket for team in pair]

    # If only 2 teams, go directly to finals
    if len(participants) == 2:
        return participants[0] if finals_result == 1 else participants[1]

    # Process each round
    for round_idx, round_results in enumerate(results):
        winners = []
        for match_idx, result in enumerate(round_results):
            team1 = participants[match_idx * 2]
            team2 = participants[match_idx * 2 + 1]
            winner = team1 if result == 1 else team2
            winners.append(winner)
        participants = winners

    # Finals between last two participants
    return participants[0] if finals_result == 1 else participants[1]


# ============================================================================
# APPROACH 2: Recursive Tree Simulation
# ============================================================================
# Time Complexity:  O(n) - visit each team once
# Space Complexity: O(log n) - recursion depth equals rounds
#
# WHEN TO USE:
# - When thinking of bracket as a binary tree
# - When you need to find winner of any sub-bracket
# - Elegant recursive solution
# ============================================================================

def tournament_bracket_winner_recursive(
    bracket: List[List[str]],
    results: List[List[int]],
    finals_result: int
) -> str:
    """
    Find the tournament champion using recursive simulation.

    Treats the bracket as a binary tree where each internal node
    is a match, and leaves are the initial teams.
    """
    participants = [team for pair in bracket for team in pair]

    # Combine results: all rounds + finals
    all_results = results + [[finals_result]]

    def get_winner(teams: List[str], round_idx: int, match_offset: int) -> str:
        """Recursively determine winner from a subset of teams."""
        if len(teams) == 2:
            # Base case: direct match
            result = all_results[round_idx][match_offset]
            return teams[0] if result == 1 else teams[1]

        # Split teams into two halves
        mid = len(teams) // 2
        left_teams = teams[:mid]
        right_teams = teams[mid:]

        # Recursively find winners of each half
        # Calculate match offset for this round
        matches_per_half = len(teams) // 4 if len(teams) > 2 else 1
        left_winner = get_winner(left_teams, round_idx, match_offset)
        right_winner = get_winner(right_teams, round_idx, match_offset + matches_per_half)

        # These winners compete in next round
        next_match_offset = match_offset // 2
        result = all_results[round_idx + 1][next_match_offset] if round_idx + 1 < len(all_results) else finals_result
        return left_winner if result == 1 else right_winner

    # Start recursion - but this approach needs different structure
    # Let's use iterative approach in helper instead
    return simulate_bracket_recursive(participants, all_results)


def simulate_bracket_recursive(teams: List[str], all_results: List[List[int]]) -> str:
    """Helper for recursive bracket simulation."""
    round_idx = 0

    def advance_round(current_teams: List[str], r_idx: int) -> str:
        if len(current_teams) == 1:
            return current_teams[0]

        winners = []
        for i in range(0, len(current_teams), 2):
            match_idx = i // 2
            result = all_results[r_idx][match_idx]
            winner = current_teams[i] if result == 1 else current_teams[i + 1]
            winners.append(winner)

        return advance_round(winners, r_idx + 1)

    return advance_round(teams, round_idx)


# ============================================================================
# APPROACH 3: Single Pass with Match Tracking
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - When you want to track full tournament history
# - When you need to record all match results
# ============================================================================

def tournament_bracket_winner_with_history(
    bracket: List[List[str]],
    results: List[List[int]],
    finals_result: int
) -> tuple:
    """
    Find the tournament champion and return full match history.

    Returns:
        Tuple of (champion_name, match_history)
        where match_history is list of (winner, loser) for each match
    """
    participants = [team for pair in bracket for team in pair]
    match_history = []

    # Process preliminary rounds
    for round_results in results:
        winners = []
        for match_idx, result in enumerate(round_results):
            team1 = participants[match_idx * 2]
            team2 = participants[match_idx * 2 + 1]
            if result == 1:
                winners.append(team1)
                match_history.append((team1, team2))
            else:
                winners.append(team2)
                match_history.append((team2, team1))
        participants = winners

    # Finals
    finalist1, finalist2 = participants[0], participants[1]
    if finals_result == 1:
        champion = finalist1
        match_history.append((finalist1, finalist2))
    else:
        champion = finalist2
        match_history.append((finalist2, finalist1))

    return champion, match_history


# ============================================================================
# APPROACH 4: Using Deque for Efficient Pop
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - When you prefer queue-based processing
# - More Pythonic for some tastes
# ============================================================================

from collections import deque


def tournament_bracket_winner_deque(
    bracket: List[List[str]],
    results: List[List[int]],
    finals_result: int
) -> str:
    """
    Find the tournament champion using deque for participant management.

    Uses deque.popleft() for O(1) removal from front.
    """
    participants = deque(team for pair in bracket for team in pair)

    # Flatten all results including finals
    all_results = deque()
    for round_results in results:
        all_results.extend(round_results)
    all_results.append(finals_result)

    # Process until one winner remains
    while len(participants) > 1:
        team1 = participants.popleft()
        team2 = participants.popleft()
        result = all_results.popleft()
        winner = team1 if result == 1 else team2
        participants.append(winner)

    return participants[0]


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (bracket, results, finals_result, expected, description)
        (
            [["A", "B"], ["C", "D"]],
            [[1, 0]],
            1,
            "A",
            "4 teams - A beats B, D beats C, A beats D"
        ),
        (
            [["A", "B"], ["C", "D"]],
            [[1, 0]],
            0,
            "D",
            "4 teams - A beats B, D beats C, D beats A"
        ),
        (
            [["Team1", "Team2"]],
            [],
            1,
            "Team1",
            "2 teams - direct finals, Team1 wins"
        ),
        (
            [["Team1", "Team2"]],
            [],
            0,
            "Team2",
            "2 teams - direct finals, Team2 wins"
        ),
        (
            [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"]],
            [[1, 1, 0, 0], [1, 0]],
            1,
            "A",
            "8 teams - A wins tournament"
        ),
        (
            [["Alpha", "Beta"], ["Gamma", "Delta"], ["Epsilon", "Zeta"], ["Eta", "Theta"]],
            [[1, 0, 1, 0], [0, 1]],
            1,
            "Delta",
            "8 teams with names - Delta wins"
        ),
        (
            [["X", "Y"], ["Z", "W"], ["P", "Q"], ["R", "S"]],
            [[0, 0, 0, 0], [0, 0]],
            0,
            "S",
            "8 teams - all second teams win"
        ),
    ]

    approaches = [
        ("Round-by-Round Simulation (Recommended)", tournament_bracket_winner),
        ("Recursive Simulation", lambda b, r, f: simulate_bracket_recursive(
            [team for pair in b for team in pair],
            r + [[f]]
        )),
        ("Deque-based Processing", tournament_bracket_winner_deque),
    ]

    print("=" * 70)
    print("TOURNAMENT BRACKET WINNER - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for bracket, results, finals_result, expected, desc in test_cases:
            try:
                result = func(bracket, results, finals_result)
                status = "PASS" if result == expected else "FAIL"
                if result != expected:
                    all_passed = False
                print(f"  [{status}] {desc}")
                if result != expected:
                    print(f"         Expected: {expected}, Got: {result}")
            except Exception as e:
                all_passed = False
                print(f"  [ERROR] {desc}: {e}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")

    # Test with history approach
    print("\n\nWith History Approach:")
    print("-" * 50)
    champion, history = tournament_bracket_winner_with_history(
        [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"]],
        [[1, 1, 0, 0], [1, 0]],
        1
    )
    print(f"  Champion: {champion}")
    print(f"  Match History:")
    for i, (winner, loser) in enumerate(history, 1):
        print(f"    Match {i}: {winner} defeated {loser}")

    print("\n" + "=" * 70)
    print("COMPLEXITY COMPARISON")
    print("=" * 70)
    print("""
    +-------------------------------+----------+----------+------------------+
    |          Approach             |   Time   |  Space   |  Recommendation  |
    +-------------------------------+----------+----------+------------------+
    | 1. Round-by-Round Simulation  |   O(n)   |   O(n)   |  BEST CHOICE     |
    | 2. Recursive Tree Simulation  |   O(n)   | O(log n) |  Good for trees  |
    | 3. With History Tracking      |   O(n)   |   O(n)   |  For full record |
    | 4. Deque-based Processing     |   O(n)   |   O(n)   |  Queue style     |
    +-------------------------------+----------+----------+------------------+

    Where: n = number of teams
    """)


if __name__ == "__main__":
    run_tests()
