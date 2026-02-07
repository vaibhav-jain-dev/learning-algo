/**
 * Airport Connections
 * Category: graphs
 * Difficulty: Very
 * Algorithm: graph-connections
 */
(function() {
    'use strict';

    const problem = {
        name: 'Airport Connections',
        difficulty: 'Very',
        algorithm: 'graph-connections',
        description: 'You\'re given a list of airports (represented as three-letter codes), a list of one-way flight routes connecting these airports, and a starting airport. Write a function that returns the minimum number of additional one-way routes that need to be added so that you can reach any airport from the starting airport. Note that routes are one-way (directed), so just because you can fly from airport A to airport B doesn\'t mean you can fly from B to A.',
        problem: 'Model the problem as a graph traversal. Choose the appropriate traversal strategy (DFS/BFS) based on whether you need depth exploration or shortest paths. Track visited nodes to handle cycles. This achieves O(A * (A + R)) time with O(A + R) space.',
        hints: [
            'Choose the right graph representation: adjacency list vs adjacency matrix.',
            'Consider whether the graph is directed or undirected, weighted or unweighted.',
            'Track visited nodes to handle cycles and avoid infinite loops.',
            'Think about which graph traversal algorithm best fits this problem: DFS, BFS, or something else.'
        ],

        complexity: {
            time: 'O(A * (A + R))',
            space: 'O(A + R)'
        },
        examples: [
    {
        input: {
        "airports": [
                "BGI",
                "CDG",
                "DEL",
                "DOH",
                "DSM",
                "EWR",
                "EYW",
                "HND",
                "ICN",
                "JFK",
                "LGA",
                "LHR",
                "ORD",
                "SAN",
                "SFO",
                "SIN",
                "TLV",
                "BUD"
        ],
        "routes": [
                [
                        "DSM",
                        "ORD"
                ],
                [
                        "ORD",
                        "BGI"
                ],
                [
                        "BGI",
                        "LGA"
                ],
                [
                        "SIN",
                        "CDG"
                ],
                [
                        "CDG",
                        "SIN"
                ],
                [
                        "CDG",
                        "BUD"
                ],
                [
                        "DEL",
                        "DOH"
                ],
                [
                        "DEL",
                        "CDG"
                ],
                [
                        "TLV",
                        "DEL"
                ],
                [
                        "EWR",
                        "HND"
                ],
                [
                        "HND",
                        "ICN"
                ],
                [
                        "HND",
                        "JFK"
                ],
                [
                        "ICN",
                        "JFK"
                ],
                [
                        "JFK",
                        "LGA"
                ],
                [
                        "EYW",
                        "LHR"
                ],
                [
                        "LHR",
                        "SFO"
                ],
                [
                        "SFO",
                        "SAN"
                ],
                [
                        "SFO",
                        "DSM"
                ],
                [
                        "SAN",
                        "EYW"
                ]
        ],
        "startingAirport": "LGA"
},
        output: 3,
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    }
        ],
        twists: [
            { id: '10-airport-connections/twist-01-bidirectional-routes', name: 'Bidirectional Routes', difficulty: 'Medium' },
            { id: '10-airport-connections/twist-02-weighted-routes', name: 'Weighted Routes', difficulty: 'Hard' },
            { id: '10-airport-connections/twist-03-remove-routes-instead', name: 'Remove Routes Instead', difficulty: 'Hard' },
            { id: '10-airport-connections/twist-04-two-starting-airports', name: 'Two Starting Airports', difficulty: 'Very Hard' },
            { id: '10-airport-connections/twist-05-route-capacity', name: 'Route Capacity', difficulty: 'Hard' }
        ],
        similar: [
    { id: '10-airport-connections/01-critical-connections', name: 'Critical Connections in a Network', difficulty: 'Hard' },
    { id: '10-airport-connections/02-min-cost-connect-points', name: 'Min Cost to Connect Points', difficulty: 'Medium' },
    { id: '10-airport-connections/03-network-delay-time', name: 'Network Delay Time', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections'] = problem;

})();
