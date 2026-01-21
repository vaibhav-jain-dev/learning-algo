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
        explanation: 'Exploring the graph structure, we find the required path or value. For input airports=[BGI, CDG, ..., BUD] (length 18), routes=[[\'DSM\', \'ORD\'], [\'ORD\', \'BGI\'], ..., [\'SAN\', \'EYW\']] (length 19), startingAirport=LGA, the result is 3.'
    }
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
