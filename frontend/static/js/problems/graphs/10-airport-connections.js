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
        twists: [
            { title: 'Bidirectional Routes', difficulty: 'Medium', description: 'All routes are bidirectional instead of one-way. Find the minimum additional bidirectional routes needed.', whyDifferent: 'In undirected graphs, reachability is symmetric. You just need to connect all components to the starting airport component, simplifying to counting disconnected components minus 1.', example: '5 airports in 3 connected components. Need 2 additional bidirectional routes to connect them all.' },
            { title: 'Weighted Routes', difficulty: 'Hard', description: 'Each new route has a construction cost proportional to the distance between airports. Minimize total cost of new routes.', whyDifferent: 'Instead of minimizing route count, you minimize total cost. This becomes a minimum spanning tree problem connecting unreachable components to the starting airport.', example: 'Three unreachable airports at distances 100, 200, 50 from starting airport. Optimal cost: add routes to closest airports first.' },
            { title: 'Remove Routes Instead', difficulty: 'Hard', description: 'All airports are currently reachable. Find the maximum number of existing routes you can remove while keeping all airports reachable from the starting airport.', whyDifferent: 'This is the inverse problem: find the minimum routes to keep (a spanning arborescence), and remove the rest. The answer is total routes minus (N-1).', example: '18 airports with 19 routes. Minimum routes to keep: 17. Maximum removable: 19-17=2.' },
            { title: 'Two Starting Airports', difficulty: 'Very Hard', description: 'There are two starting airports. Every other airport must be reachable from at least one starting airport. Minimize new routes.', whyDifferent: 'Unreachable components can be connected to either starting airport. You must optimally assign each component to one of the two starts, a set cover variant.', example: '3 unreachable components. Assign 2 to start A and 1 to start B. Total new routes: 3.' },
            { title: 'Route Capacity', difficulty: 'Hard', description: 'Each route can handle at most K flights per day. Find minimum new routes so that starting airport can send at least one flight path to every other airport.', whyDifferent: 'Capacity constraints turn this into a network flow problem. You must ensure sufficient flow paths exist, not just reachability.', example: 'Route A->B has capacity 1, but 3 airports are reachable only through B. Need parallel routes or alternative paths.' }
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
