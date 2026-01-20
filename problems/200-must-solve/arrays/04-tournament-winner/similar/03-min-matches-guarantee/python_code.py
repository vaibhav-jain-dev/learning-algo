"""
Minimum Matches to Guarantee Winner - Python Solutions

Given n teams and current scores, find minimum remaining matches
to guarantee a single winner.
"""

from typing import List


# ============================================================================
# APPROACH 1: Greedy Elimination ⭐ RECOMMENDED
# ============================================================================

def min_matches_to_guarantee_winner(scores: List[int]) -> int:
    """Find minimum matches needed to guarantee a winner."""
    if len(scores) <= 1:
        return 0

    sorted_scores = sorted(scores, reverse=True)
    max_score = sorted_scores[0]
    matches = 0

    # Check if anyone can catch the leader
    for score in sorted_scores[1:]:
        if score + 3 >= max_score:
            # This team can still potentially tie/win
            matches += 1
            max_score += 3

    return matches


# ============================================================================
# TEST CASES
# ============================================================================

if __name__ == "__main__":
    print("=" * 70)
    print("MINIMUM MATCHES TO GUARANTEE WINNER - TEST RESULTS")
    print("=" * 70)

    test_cases = [
        ([10, 7, 5], 1, "Leader needs 1 win"),
        ([6, 6, 6], 2, "Three-way tie"),
        ([10, 3, 2], 0, "Already guaranteed"),
        ([5], 0, "Single team"),
    ]

    for scores, expected, desc in test_cases:
        result = min_matches_to_guarantee_winner(scores.copy())
        status = "✓" if result == expected else "✗"
        print(f"{status} {desc}: scores={scores} → {result} matches")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    scores = [10, 7, 5]
    print(f"\nInput: scores = {scores}")
    print(f"Output: {min_matches_to_guarantee_winner(scores)}")
