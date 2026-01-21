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
        algorithm: 'general',
        description: 'You are organizing a single-elimination tournament bracket. In a single-elimination tournament, teams are paired up and compete against each other. The loser of each match is immediately eliminated from the tournament, while the winner advances to the next round. This process continues until only one team remains - the tournament champion. Given: - A 2D array bracket representing the tournament rounds, where each inner array contains pairs of teams competing against each other in that round - A ',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
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
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-tournament-bracket', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/01-tournament-bracket'] = problem;

})();
