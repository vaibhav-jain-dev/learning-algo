/**
 * Tournament Winner
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: hash-counting
 */
(function() {
    'use strict';

    const problem = {
        name: 'Tournament Winner',
        difficulty: 'Easy',
        algorithm: 'hash-counting',
        description: 'There\'s an algorithms tournament taking place in which teams of programmers compete against each other to solve algorithmic problems as fast as possible. Teams compete in a round robin, where each team faces off against all other teams. Only two teams compete against each other at a time, and for each competition, one team is designated the home team, while the other team is the away team. In each competition there\'s always one winner and one loser; there are no ties. A team receives 3 points if',
        complexity: {
            time: 'O(n)',
            space: 'O(k)'
        },
        examples: [
    {
        input: {
        "competitions": [
                [
                        "HTML",
                        "C#"
                ],
                [
                        "C#",
                        "Python"
                ],
                [
                        "Python",
                        "HTML"
                ]
        ],
        "results": [
                0,
                0,
                1
        ]
},
        output: "Python",
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input competitions=[[\'HTML\', \'C#\'], [\'C#\', \'Python\'], [\'Python\', \'HTML\']], results=[0, 0, 1], the result is Python.'
    },
    {
        input: {
        "competitions": [
                [
                        "A",
                        "B"
                ],
                [
                        "B",
                        "C"
                ],
                [
                        "C",
                        "A"
                ]
        ],
        "results": [
                1,
                1,
                1
        ]
},
        output: "A",
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input competitions=[[\'A\', \'B\'], [\'B\', \'C\'], [\'C\', \'A\']], results=[1, 1, 1], the result is A.'
    }
        ],
        similar: [
    { id: '01-tournament-bracket', name: '01 Tournament Bracket', difficulty: 'Medium' },
    { id: '02-tournament-tiebreakers', name: '02 Tournament Tiebreakers', difficulty: 'Medium' },
    { id: '03-min-matches-guarantee', name: '03 Min Matches Guarantee', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '04-tournament-winner', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/04-tournament-winner'] = problem;

})();
