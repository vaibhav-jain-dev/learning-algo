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
        description: 'There\'s an algorithms tournament taking place in which teams of programmers compete against each other to solve algorithmic problems as fast as possible. Teams compete in a round robin, where each team faces off against all other teams. Only two teams compete against each other at a time, and for each competition, one team is designated the home team, while the other team is the away team. In each competition there\'s always one winner and one loser; there are no ties. A team receives 3 points for a win.',
        problem: 'Use a hash table to track each team\'s total points. Iterate through competitions and results together. For each match, determine the winner (home team if result is 1, away team if result is 0) and add 3 points to their score. Track the current leader as you go to avoid a second pass through the hash table.',
        hints: [
            'You need to count points for each team. What data structure allows O(1) updates and lookups by team name?',
            'The result array tells you who won: 1 means home team (index 0), 0 means away team (index 1).',
            'Use a hash map: key = team name, value = total points. Add 3 to winner\'s score for each match.',
            'Optimization: track the current leader as you iterate, so you don\'t need to scan the map at the end.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(k)'
        },
        examples: [
    {
        input: {
        "competitions": [["HTML", "C#"], ["C#", "Python"], ["Python", "HTML"]],
        "results": [0, 0, 1]
        },
        output: "Python",
        explanation: 'Match 1: result=0, away team C# wins, C#:3. Match 2: result=0, away team Python wins, Python:3. Match 3: result=1, home team Python wins, Python:6. Python has most points (6).'
    },
    {
        input: {
        "competitions": [["A", "B"], ["B", "C"], ["C", "A"]],
        "results": [1, 1, 1]
        },
        output: "A",
        explanation: 'All results are 1, so home teams always win. Match 1: A wins (A:3). Match 2: B wins (B:3). Match 3: C wins (C:3). Tie at 3 points each, but A was first to reach 3, so A wins.'
    }
        ],
        similar: [
    { id: '04-tournament-winner/01-tournament-bracket', name: '01 Tournament Bracket', difficulty: 'Medium' },
    { id: '04-tournament-winner/02-tournament-tiebreakers', name: '02 Tournament Tiebreakers', difficulty: 'Medium' },
    { id: '04-tournament-winner/03-min-matches-guarantee', name: '03 Min Matches Guarantee', difficulty: 'Hard' }
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
