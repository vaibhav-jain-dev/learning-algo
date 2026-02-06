/**
 * Lowest Common Manager
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-manager
 */
(function() {
    'use strict';

    const problem = {
        name: 'Lowest Common Manager',
        difficulty: 'Hard',
        algorithm: 'recursion-manager',
        description: 'You\'re given three inputs: the top manager of an organization (the root of an organizational chart), and two employees that are guaranteed to be in the organization. Write a function that returns the lowest common manager of the two employees. The "lowest common manager" is the deepest manager (furthest from the top) that has both employees as subordinates (directly or indirectly through other managers). Each employee has: - A name (unique identifier) - A list of direct reports (subordinates) An',
        complexity: {
            time: 'O(n)',
            space: 'O(h)'
        },
        examples: [
    {
        input: {
        "topManager": "A",
        "employee1": "E",
        "employee2": "G"
},
        output: "A",
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input topManager=A, employee1=E, employee2=G, the result is A.'
    }
        ],
        twists: [
            { title: 'Lowest Common Manager of K Employees', difficulty: 'Hard', description: 'Extend to find the lowest common manager of k employees instead of just two.', whyDifferent: 'The two-target approach of returning when both are found generalizes to tracking a count of found targets across all subtrees, requiring different aggregation logic.', example: 'For employees [E, G, I] in an org chart, find the deepest manager who has all three as subordinates.' },
            { title: 'Distance to Common Manager', difficulty: 'Medium', description: 'Find the lowest common manager and also return the distances from each employee to that manager.', whyDifferent: 'Adds depth tracking to the recursion -- when the LCM is found, compute the path lengths back to each target employee.', example: 'If LCM of E and G is A, and E is 2 levels below A while G is 3 levels below, return {manager: "A", distE: 2, distG: 3}.' },
            { title: 'Path Between Employees', difficulty: 'Medium', description: 'Find the full path from employee1 to employee2 through their lowest common manager.', whyDifferent: 'Requires finding the LCM first, then constructing the path by going up from each employee to the LCM and joining the paths.', example: 'Path from E to G through LCM A might be: E -> B -> A -> C -> G.' },
            { title: 'All Ancestors of an Employee', difficulty: 'Easy', description: 'Given an employee, return all their managers (ancestors) from direct manager up to the top manager.', whyDifferent: 'Simplifies to a single-target search but requires collecting the entire path from root to target rather than identifying a meeting point.', example: 'For employee G in a tree A->B->E, A->C->G, the ancestors of G are [C, A].' },
            { title: 'LCM with Parent Pointers', difficulty: 'Medium', description: 'Solve the LCM problem when each employee node has a parent pointer instead of only having downward child references.', whyDifferent: 'Enables an upward traversal approach similar to finding the intersection of two linked lists, which is fundamentally different from the top-down recursive approach.', example: 'Starting from E and G, walk up to root from each, then find where paths converge -- similar to intersecting linked lists.' },
            { title: 'Organizational Distance', difficulty: 'Medium', description: 'Compute the organizational distance between two employees, defined as the number of edges in the path between them through the org chart.', whyDifferent: 'Once the LCM is identified, the distance is the sum of depths of both employees minus twice the depth of the LCM, requiring depth computation.', example: 'If E is at depth 3 and G is at depth 4 with LCM at depth 1, the distance is (3-1) + (4-1) = 5 edges.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '14-lowest-common-manager', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/14-lowest-common-manager'] = problem;

})();
