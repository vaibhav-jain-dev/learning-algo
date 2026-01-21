#!/usr/bin/env node
/**
 * Script to update all sub-problems with proper content
 * Adds: parent, problem (thought process), hints, solutions
 */

const fs = require('fs');
const path = require('path');

// Problem templates based on algorithm types
const algorithmTemplates = {
    // Graph algorithms
    'graph-flood-fill': {
        problem: 'Use flood fill (DFS/BFS) to explore connected components. Start from each unvisited cell, mark visited cells, and track the property you need (size, count, etc.). The key insight is that connected cells form a single component.',
        hints: [
            'Think about how to traverse all connected cells from a starting point.',
            'Use DFS or BFS to explore all 4-directional neighbors.',
            'Mark cells as visited to avoid counting them twice.',
            'Track the metric you need (area, count) during traversal.',
            'Consider edge cases: empty grid, all water, all land.'
        ]
    },
    'graph-dfs': {
        problem: 'Use Depth-First Search to explore the graph. DFS goes deep before going wide, using a stack (explicit or recursive call stack). Track visited nodes to avoid cycles.',
        hints: [
            'Start from the source node and explore as deep as possible.',
            'Use recursion or an explicit stack for DFS.',
            'Mark nodes as visited before exploring neighbors.',
            'Consider the order of exploration for the desired result.',
            'Handle disconnected components if needed.'
        ]
    },
    'graph-bfs': {
        problem: 'Use Breadth-First Search to explore level by level. BFS is ideal for finding shortest paths in unweighted graphs. Use a queue to process nodes in order of distance.',
        hints: [
            'Use a queue to process nodes level by level.',
            'BFS naturally finds shortest paths in unweighted graphs.',
            'Track distance or level for each node.',
            'Mark nodes as visited when adding to queue, not when processing.',
            'Consider bidirectional BFS for optimization.'
        ]
    },
    'graph-cycle': {
        problem: 'Detect cycles using DFS with node coloring: WHITE (unvisited), GRAY (in current path), BLACK (fully processed). A cycle exists if we encounter a GRAY node.',
        hints: [
            'Use three states: unvisited, in-progress, completed.',
            'A back edge to an in-progress node indicates a cycle.',
            'For undirected graphs, track parent to avoid false positives.',
            'Consider using Union-Find as an alternative approach.',
            'DFS naturally handles cycle detection with recursion stack.'
        ]
    },
    // DP algorithms
    'dp-2d': {
        problem: 'Use 2D dynamic programming where dp[i][j] represents the optimal solution for subproblem (i,j). Build the table by considering all possible transitions from smaller subproblems.',
        hints: [
            'Define the state: what does dp[i][j] represent?',
            'Identify the base cases (usually dp[0][...] and dp[...][0]).',
            'Write the recurrence relation for dp[i][j].',
            'Determine the iteration order to ensure dependencies are computed first.',
            'Consider space optimization if only previous row/column is needed.'
        ]
    },
    'dp-1d': {
        problem: 'Use 1D dynamic programming where dp[i] represents the optimal solution for the first i elements. Each state depends on previous states.',
        hints: [
            'Define what dp[i] represents clearly.',
            'Identify the base case (usually dp[0]).',
            'Write the recurrence: how does dp[i] depend on dp[j] for j < i?',
            'Consider if you need to track additional information.',
            'Check if the problem has optimal substructure.'
        ]
    },
    // Linked List algorithms
    'll-reverse': {
        problem: 'Reverse links by maintaining three pointers: prev, curr, next. For each node, save next, point curr to prev, then advance. Handle edge cases for empty or single-node lists.',
        hints: [
            'Use three pointers: previous, current, and next.',
            'Save the next node before changing the current link.',
            'Move all pointers forward after reversing each link.',
            'The new head is the last non-null current pointer.',
            'Consider recursive approach for cleaner code.'
        ]
    },
    'll-two-pointer': {
        problem: 'Use two pointers (slow and fast) to solve the problem. The fast pointer typically moves 2x speed or with an offset. This pattern helps find middle, detect cycles, or locate nth node.',
        hints: [
            'Initialize both pointers at the head.',
            'Move fast pointer at 2x speed to find middle.',
            'Use k-node offset to find kth from end.',
            'When fast reaches end, slow is at the target position.',
            'Handle edge cases: empty list, single node.'
        ]
    },
    // Array algorithms
    'two-pointer': {
        problem: 'Use two pointers to efficiently traverse the array. Pointers can move towards each other (from ends) or in the same direction (sliding window). This reduces O(n²) to O(n).',
        hints: [
            'Decide pointer movement: towards each other or same direction.',
            'For sorted arrays, use opposite ends to find pairs.',
            'For subarrays, use same-direction sliding window.',
            'Move the pointer that helps achieve the goal.',
            'Handle duplicates if needed.'
        ]
    },
    'sliding-window': {
        problem: 'Use sliding window to process contiguous subarrays. Maintain window state as you expand right and contract left. Window size can be fixed or variable based on conditions.',
        hints: [
            'Initialize window with start and end pointers.',
            'Expand window by moving right pointer.',
            'Contract window by moving left pointer when condition is violated.',
            'Track window state (sum, count, set) incrementally.',
            'Update answer when window is valid.'
        ]
    },
    'binary-search': {
        problem: 'Use binary search to find the target in O(log n) time. Determine the search condition and how to adjust left/right pointers. Works on sorted arrays or monotonic conditions.',
        hints: [
            'Ensure the array is sorted or has monotonic property.',
            'Define the search range [left, right].',
            'Calculate mid avoiding overflow: mid = left + (right - left) / 2.',
            'Decide which half to search based on comparison.',
            'Handle edge cases: empty array, single element.'
        ]
    },
    // Tree algorithms
    'tree-dfs': {
        problem: 'Use DFS (preorder, inorder, or postorder) to traverse the tree. Choose the traversal order based on when you need to process the node relative to its children.',
        hints: [
            'Preorder: process node, then left, then right.',
            'Inorder: process left, then node, then right (gives sorted order in BST).',
            'Postorder: process left, then right, then node.',
            'Use recursion or explicit stack.',
            'Pass accumulated values through parameters or return values.'
        ]
    },
    'tree-bfs': {
        problem: 'Use BFS (level-order traversal) to process the tree level by level. Use a queue to track nodes at the current level.',
        hints: [
            'Use a queue initialized with the root.',
            'Process all nodes at current level before moving to next.',
            'Track level by processing queue size nodes at a time.',
            'Useful for finding level-wise properties.',
            'Can be used to find shortest path in tree.'
        ]
    }
};

// Default template for unknown algorithms
const defaultTemplate = {
    problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
    hints: [
        'Start by understanding what the problem is asking.',
        'Consider the input constraints and edge cases.',
        'Think about which data structures would be helpful.',
        'Break down the problem into smaller subproblems.',
        'Verify your solution with the given examples.'
    ]
};

// Solution templates based on problem type
function generatePythonSolution(problemName, algorithm) {
    const funcName = problemName.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1))
        .join('');

    return `def ${funcName}(data):
    """
    ${problemName}

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: ${getAlgorithmInsight(algorithm)}

    result = None

    # Process input
    # ...

    return result


# Test
if __name__ == "__main__":
    # Add test cases
    pass`;
}

function generateGoSolution(problemName, algorithm) {
    const funcName = problemName.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join('');
    funcName[0] = funcName[0].toLowerCase();

    return `package main

import "fmt"

// ${funcName} solves the ${problemName} problem.
// Time: O(n), Space: O(n)
func ${funcName}(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: ${getAlgorithmInsight(algorithm)}

    var result interface{}

    // Process input
    // ...

    return result
}

func main() {
    // Test cases
    fmt.Println("Test")
}`;
}

function getAlgorithmInsight(algorithm) {
    const insights = {
        'graph-flood-fill': 'Connected components can be explored using DFS/BFS',
        'graph-dfs': 'DFS explores depth-first, ideal for paths and connectivity',
        'graph-bfs': 'BFS explores breadth-first, ideal for shortest paths',
        'dp-2d': 'Build solution from smaller subproblems using 2D table',
        'll-reverse': 'Maintain prev, curr, next pointers while reversing',
        'two-pointer': 'Use two pointers to reduce time complexity',
        'binary-search': 'Halve search space each iteration'
    };
    return insights[algorithm] || 'Identify the optimal data structure and algorithm';
}

// Extract parent from problem ID
function getParent(problemId) {
    const parts = problemId.split('/');
    return parts.length > 1 ? parts[0] : null;
}

// Process a single file
function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if already has solutions
    if (content.includes('solutions:') && content.includes('python:') && content.includes('hints:')) {
        console.log(`Skipping (already complete): ${filePath}`);
        return false;
    }

    // Extract problem info
    const nameMatch = content.match(/name:\s*['"]([^'"]+)['"]/);
    const algorithmMatch = content.match(/algorithm:\s*['"]([^'"]+)['"]/);
    const categoryMatch = content.match(/window\.ProblemRenderer\.register\s*\(\s*['"]([^'"]+)['"]/);
    const problemIdMatch = content.match(/window\.ProblemRenderer\.register\s*\(\s*['"][^'"]+['"]\s*,\s*['"]([^'"]+)['"]/);

    if (!nameMatch || !algorithmMatch || !categoryMatch || !problemIdMatch) {
        console.log(`Skipping (missing info): ${filePath}`);
        return false;
    }

    const name = nameMatch[1];
    const algorithm = algorithmMatch[1];
    const category = categoryMatch[1];
    const problemId = problemIdMatch[1];
    const parent = getParent(problemId);

    if (!parent) {
        console.log(`Skipping (not a sub-problem): ${filePath}`);
        return false;
    }

    // Get template based on algorithm
    let template = algorithmTemplates[algorithm];
    if (!template) {
        // Try to find a matching algorithm category
        const algoCategory = algorithm.split('-')[0];
        template = Object.entries(algorithmTemplates).find(([k]) => k.startsWith(algoCategory))?.[1];
    }
    template = template || defaultTemplate;

    // Check if already has parent field
    const hasParent = content.includes('parent:');
    const hasProblem = content.includes("problem:") && !content.includes("problem: {");
    const hasHints = content.includes('hints:');
    const hasSolutions = content.includes('solutions:');

    let newContent = content;

    // Add parent field if missing
    if (!hasParent) {
        newContent = newContent.replace(
            /(algorithm:\s*['"][^'"]+['"],?\s*\n)/,
            `$1        parent: '${parent}',\n`
        );
    }

    // Add problem field if missing
    if (!hasProblem) {
        newContent = newContent.replace(
            /(description:\s*['"][^'"]+['"],?\s*\n)/,
            `$1        problem: '${template.problem}',\n`
        );
    }

    // Add hints if missing
    if (!hasHints) {
        const hintsStr = template.hints.map(h => `            '${h.replace(/'/g, "\\'")}'`).join(',\n');
        newContent = newContent.replace(
            /(complexity:\s*\{[\s\S]*?\},?\s*\n)/,
            `$1        hints: [\n${hintsStr}\n        ],\n`
        );
    }

    // Add solutions if missing
    if (!hasSolutions) {
        const pythonSol = generatePythonSolution(name, algorithm).replace(/`/g, '\\`').replace(/\$/g, '\\$');
        const goSol = generateGoSolution(name, algorithm).replace(/`/g, '\\`').replace(/\$/g, '\\$');

        newContent = newContent.replace(
            /(similar:\s*\[[\s\S]*?\]\s*\n\s*\};)/,
            `solutions: {
            python: \`${pythonSol}\`,
            go: \`${goSol}\`
        },
        $1`
        );
    }

    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Updated: ${filePath}`);
        return true;
    }

    return false;
}

// Main
function main() {
    const baseDir = '/home/user/learning-algo/frontend/static/js/problems';
    const categories = ['arrays', 'graphs', 'linked-lists', 'binary-trees', 'binary-search-trees', 'dynamic-programming', 'recursion', 'famous-algorithms'];

    let updated = 0;
    let total = 0;

    for (const category of categories) {
        const categoryDir = path.join(baseDir, category);
        if (!fs.existsSync(categoryDir)) continue;

        // Find all sub-problem directories (have number prefix and contain JS files)
        const entries = fs.readdirSync(categoryDir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isDirectory() && /^\d{2}-/.test(entry.name)) {
                const subDir = path.join(categoryDir, entry.name);
                const subFiles = fs.readdirSync(subDir).filter(f => f.endsWith('.js') && !f.startsWith('_'));

                for (const subFile of subFiles) {
                    total++;
                    const filePath = path.join(subDir, subFile);
                    if (processFile(filePath)) {
                        updated++;
                    }
                }
            }
        }
    }

    console.log(`\nDone! Updated ${updated}/${total} files.`);
}

main();
