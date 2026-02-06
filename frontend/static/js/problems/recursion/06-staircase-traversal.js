/**
 * Staircase Traversal
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-staircase
 */
(function() {
    'use strict';

    const problem = {
        name: 'Staircase Traversal',
        difficulty: 'Medium',
        algorithm: 'recursion-staircase',
        description: 'You\'re given two positive integers representing the height of a staircase and the maximum number of steps you can advance up the staircase at a time. Write a function that returns the number of distinct ways to climb the staircase. For example, if you were given a staircase of height = 3 and maxSteps = 2, you could climb the staircase in 3 ways: - 1 step, 1 step, 1 step - 1 step, 2 steps - 2 steps, 1 step',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "height": 4,
        "maxSteps": 2
},
        output: 5,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input height=4, maxSteps=2, the result is 5.'
    }
        ],
        twists: [
            { title: 'Weighted Steps', difficulty: 'Hard', description: 'Each step size has a different cost. Find the minimum cost to reach the top, where step i costs cost[i].', whyDifferent: 'Changes from counting paths to optimizing cost, requiring dynamic programming with min instead of sum operations.', example: 'For height=4, maxSteps=2, costs=[0,3,2], taking two 2-steps costs 4, while four 1-steps costs 12. Minimum is 4.' },
            { title: 'List All Paths', difficulty: 'Medium', description: 'Instead of counting the number of ways, return all distinct sequences of steps that reach the top.', whyDifferent: 'Shifts from counting to enumeration, requiring actual path construction and storage rather than just accumulating a count.', example: 'For height=3, maxSteps=2, return [[1,1,1],[1,2],[2,1]] -- all step sequences that sum to 3.' },
            { title: 'Variable Step Sizes', difficulty: 'Medium', description: 'Instead of steps 1 through maxSteps, you are given an arbitrary set of allowed step sizes (e.g., [1,3,5]).', whyDifferent: 'The sliding window optimization no longer applies since step sizes are not consecutive, requiring a direct DP approach summing over the allowed set.', example: 'For height=6 and allowed steps [1,3,5], count paths: you can reach 6 via 1+5, 3+3, 1+1+1+3, etc.' },
            { title: 'Circular Staircase', difficulty: 'Hard', description: 'The staircase wraps around -- after reaching the top, you continue from step 0 again. Count paths that take exactly k total steps.', whyDifferent: 'Introduces modular arithmetic into the recurrence, fundamentally changing the problem from a linear DP to one involving cycles.', example: 'For height=4 (circular), maxSteps=2, exactly k=5 total step units: count paths that wrap around once.' },
            { title: 'Minimum Steps to Top', difficulty: 'Easy', description: 'Find the minimum number of individual steps needed to reach the top of the staircase.', whyDifferent: 'Simplifies from counting all paths to a greedy approach -- always take the largest step possible, making it a simple division problem.', example: 'For height=10, maxSteps=3, minimum steps is ceil(10/3) = 4 (three 3-steps and one 1-step).' },
            { title: 'Probability of Reaching Top', difficulty: 'Hard', description: 'At each position, you randomly choose a step size uniformly from 1 to maxSteps. What is the probability of landing exactly on the top?', whyDifferent: 'Converts the counting problem into a probability problem where each branch has weight 1/maxSteps instead of 1, requiring floating-point DP.', example: 'For height=3, maxSteps=2, P(reach 3 exactly) = P(1,1,1) + P(1,2) + P(2,1) = (1/2)^3 + (1/2)^2 + (1/2)^2 = 0.625.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '06-staircase-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/06-staircase-traversal'] = problem;

})();
