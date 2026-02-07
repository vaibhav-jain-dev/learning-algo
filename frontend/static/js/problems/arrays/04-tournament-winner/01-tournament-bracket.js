/**
 * Tournament Bracket
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Tournament Bracket',
        difficulty: 'Medium',
        algorithm: 'hash-counting',
        parent: '04-tournament-winner',
        description: 'You are organizing a single-elimination tournament bracket. In a single-elimination tournament, teams are paired up and compete against each other. The loser of each match is immediately eliminated from the tournament, while the winner advances to the next round. This process continues until only one team remains - the tournament champion. Given: - A 2D array bracket representing the tournament rounds, where each inner array contains pairs of teams competing against each other in that round - A .',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "raw": "bracket = [[\"A\", \"B\"], [\"C\", \"D\"]]  # Round 1: A vs B, C vs D\nresults = [[1, 0]]                   # Round 1: A wins, D wins\nfinals_result = 1                    # A wins the final"
},
        output: "\"A\"\n\nExplanation:\n- Round 1: A beats B, D beats C\n- Finals: A beats D\n- Champion: A",
        explanation: 'Given the input, the algorithm processes it to produce "A"\n\nExplanation:\n- Round 1: A beats B, D beats C\n- Finals: A beats D\n- Champion: A'
    },
    {
        input: {
        "raw": "bracket = [[\"Alpha\", \"Beta\"], [\"Gamma\", \"Delta\"], [\"Epsilon\", \"Zeta\"], [\"Eta\", \"Theta\"]]\nresults = [[1, 0, 1, 0], [0, 1]]    # Round 1 results, then Round 2 results\nfinals_result = 1"
},
        output: "\"Delta\"\n\nExplanation:\n- Round 1: Alpha wins, Delta wins, Epsilon wins, Theta wins\n- Round 2: Delta beats Alpha, Theta beats Epsilon\n- Finals: Delta beats Theta\n- Champion: Delta",
        explanation: 'Given the input, the algorithm processes it to produce "Delta"\n\nExplanation:\n- Round 1: Alpha wins, Delta wins, Epsilon wins, Theta wins\n- Round 2: Delta beats Alpha, Theta beats Epsilon\n- Finals: Delta beats Theta\n- Champion: Delta'
    },
    {
        input: {
        "raw": "bracket = [[\"Team1\", \"Team2\"]]       # Only 2 teams\nresults = []                          # No preliminary rounds\nfinals_result = 0                     # Team2 wins"
},
        output: "\"Team2\"\n\nExplanation: Direct final between Team1 and Team2, Team2 wins.",
        explanation: 'Given the input, the algorithm processes it to produce "Team2"\n\nExplanation: Direct final between Team1 and Team2, Team2 wins.'
    }
        ],
        solutions: {
            python: `def tournamentBracket(bracket, results, finals_result):
    """
    Tournament Bracket - Single elimination tournament simulation

    Time: O(n) where n is total number of matches
    Space: O(n) for storing advancing teams

    Args:
        bracket: List of [team1, team2] pairs for initial round
        results: List of lists, each inner list has 1/0 for each match result
        finals_result: 1 if first team wins final, 0 if second team wins

    Returns:
        The name of the tournament champion
    """
    # Start with initial bracket teams
    current_round = []
    for pair in bracket:
        current_round.append(pair)

    # Process each round using the results
    for round_results in results:
        next_round = []
        for i, result in enumerate(round_results):
            # result = 1 means first team wins, 0 means second team wins
            winner = current_round[i][0] if result == 1 else current_round[i][1]
            next_round.append(winner)

        # Pair up winners for next round
        current_round = []
        for i in range(0, len(next_round), 2):
            if i + 1 < len(next_round):
                current_round.append([next_round[i], next_round[i + 1]])
            else:
                current_round.append([next_round[i]])

    # Handle finals
    if len(current_round) == 1 and len(current_round[0]) == 2:
        # Two teams in final
        return current_round[0][0] if finals_result == 1 else current_round[0][1]
    elif len(current_round) == 1 and len(current_round[0]) == 1:
        # Only one team left (already determined)
        return current_round[0][0]
    else:
        # Direct final from initial bracket
        return bracket[0][0] if finals_result == 1 else bracket[0][1]


# Test
if __name__ == "__main__":
    # Test case 1
    bracket = [["A", "B"], ["C", "D"]]
    results = [[1, 0]]  # A wins, D wins
    finals_result = 1   # A wins final
    print(tournamentBracket(bracket, results, finals_result))  # "A"

    # Test case 2: Direct final
    bracket = [["Team1", "Team2"]]
    results = []
    finals_result = 0  # Team2 wins
    print(tournamentBracket(bracket, results, finals_result))  # "Team2"`,
            go: `package main

import "fmt"

// TournamentBracket simulates a single-elimination tournament
// Time: O(n), Space: O(n)
func TournamentBracket(bracket [][]string, results [][]int, finalsResult int) string {
    // Start with initial bracket
    currentRound := make([][]string, len(bracket))
    copy(currentRound, bracket)

    // Process each round
    for _, roundResults := range results {
        var nextRound []string
        for i, result := range roundResults {
            var winner string
            if result == 1 {
                winner = currentRound[i][0]
            } else {
                winner = currentRound[i][1]
            }
            nextRound = append(nextRound, winner)
        }

        // Pair up winners for next round
        currentRound = [][]string{}
        for i := 0; i < len(nextRound); i += 2 {
            if i+1 < len(nextRound) {
                currentRound = append(currentRound, []string{nextRound[i], nextRound[i+1]})
            } else {
                currentRound = append(currentRound, []string{nextRound[i]})
            }
        }
    }

    // Handle finals
    if len(currentRound) == 1 && len(currentRound[0]) == 2 {
        if finalsResult == 1 {
            return currentRound[0][0]
        }
        return currentRound[0][1]
    } else if len(currentRound) == 1 && len(currentRound[0]) == 1 {
        return currentRound[0][0]
    }

    // Direct final from initial bracket
    if finalsResult == 1 {
        return bracket[0][0]
    }
    return bracket[0][1]
}

func main() {
    // Test case 1
    bracket := [][]string{{"A", "B"}, {"C", "D"}}
    results := [][]int{{1, 0}}
    fmt.Println(TournamentBracket(bracket, results, 1)) // "A"

    // Test case 2
    bracket2 := [][]string{{"Team1", "Team2"}}
    fmt.Println(TournamentBracket(bracket2, [][]int{}, 0)) // "Team2"
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 04-tournament-winner
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '04-tournament-winner/01-tournament-bracket', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/04-tournament-winner/01-tournament-bracket'] = problem;

})();
