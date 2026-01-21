/**
 * Binary Tree Algorithm Visualizations
 */
(function() {
    'use strict';

    if (!window.VizUtils) {
        console.error('[TreesViz] VizUtils not loaded yet!');
        return;
    }

    // =========================================================================
    // HELPER: Flatten binary tree for visualization
    // =========================================================================
    function flattenBinaryTree(node, nodes, edges, parentId, position) {
        if (!node) return;
        const nodeId = 'node_' + nodes.length;
        const nodeValue = node.value !== undefined ? node.value : node.val;
        nodes.push({ id: nodeId, value: nodeValue, label: String(nodeValue), position: position });

        if (parentId !== null) {
            edges.push({ from: parentId, to: nodeId, direction: position });
        }

        if (node.left) flattenBinaryTree(node.left, nodes, edges, nodeId, 'left');
        if (node.right) flattenBinaryTree(node.right, nodes, edges, nodeId, 'right');
    }

    // =========================================================================
    // TREE DFS
    // =========================================================================
    function runTreeDFS(example, config, complexity) {
        const steps = [];
        const tree = example.input.tree || example.input.root;
        if (!tree) return window.VizUtils.runGenericVisualization(example, config, complexity);

        const nodes = [];
        const edges = [];
        flattenBinaryTree(tree, nodes, edges, null, 'root');

        const visited = [];
        const result = [];

        steps.push({
            vizType: 'tree',
            nodes: nodes,
            edges: edges,
            visited: [],
            current: null,
            result: [],
            status: 'Initialize Tree DFS',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Algorithm:</strong> Tree Depth First Search<br>' +
                '<strong>Expected:</strong> ' + JSON.stringify(example.output) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Simulate DFS traversal
        const maxSteps = Math.min(nodes.length, 8);
        for (let i = 0; i < maxSteps; i++) {
            visited.push(nodes[i].id);
            result.push(nodes[i].value);
            steps.push({
                vizType: 'tree',
                nodes: nodes,
                edges: edges,
                visited: visited.slice(),
                current: nodes[i].id,
                result: result.slice(),
                status: 'Visit: ' + nodes[i].value,
                explanation: '<strong>Visit node ' + nodes[i].value + '</strong><br>Result: [' + result.join(', ') + ']'
            });
        }

        steps.push({
            vizType: 'tree',
            nodes: nodes,
            edges: edges,
            visited: nodes.map(n => n.id),
            result: result,
            status: 'DFS Complete!',
            explanation: '<strong>Result:</strong> ' + JSON.stringify(example.output)
        });

        return steps;
    }

    // =========================================================================
    // TREE BFS
    // =========================================================================
    function runTreeBFS(example, config, complexity) {
        const steps = [];
        const tree = example.input.tree || example.input.root;
        if (!tree) return window.VizUtils.runGenericVisualization(example, config, complexity);

        const nodes = [];
        const edges = [];
        flattenBinaryTree(tree, nodes, edges, null, 'root');

        const visited = [];
        const result = [];

        steps.push({
            vizType: 'tree',
            nodes: nodes,
            edges: edges,
            visited: [],
            current: null,
            result: [],
            status: 'Initialize Tree BFS',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Algorithm:</strong> Tree Breadth First Search (Level Order)<br>' +
                '<strong>Expected:</strong> ' + JSON.stringify(example.output) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        const maxSteps = Math.min(nodes.length, 8);
        for (let i = 0; i < maxSteps; i++) {
            visited.push(nodes[i].id);
            result.push(nodes[i].value);
            steps.push({
                vizType: 'tree',
                nodes: nodes,
                edges: edges,
                visited: visited.slice(),
                current: nodes[i].id,
                result: result.slice(),
                status: 'Level ' + Math.floor(Math.log2(i + 1)) + ': ' + nodes[i].value,
                explanation: '<strong>Visit node ' + nodes[i].value + '</strong> (Level order)<br>Result: [' + result.join(', ') + ']'
            });
        }

        steps.push({
            vizType: 'tree',
            nodes: nodes,
            edges: edges,
            visited: nodes.map(n => n.id),
            result: result,
            status: 'BFS Complete!',
            explanation: '<strong>Result:</strong> ' + JSON.stringify(example.output)
        });

        return steps;
    }

    // =========================================================================
    // GENERIC TREE
    // =========================================================================
    function runTreeGeneric(example, config, complexity) {
        const steps = [];
        const tree = example.input.tree || example.input.root || example.input.treeOne;

        if (!tree) {
            return window.VizUtils.runGenericVisualization(example, config, complexity);
        }

        const nodes = [];
        const edges = [];
        flattenBinaryTree(tree, nodes, edges, null, 'root');

        steps.push({
            vizType: 'tree',
            nodes: nodes,
            edges: edges,
            visited: [],
            current: null,
            status: config.name,
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                '<strong>Nodes:</strong> ' + nodes.length + '<br>' +
                '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        const maxSteps = Math.min(nodes.length, 6);
        for (let i = 0; i < maxSteps; i++) {
            steps.push({
                vizType: 'tree',
                nodes: nodes,
                edges: edges,
                visited: nodes.slice(0, i + 1).map(n => n.id),
                current: nodes[i].id,
                status: 'Process: ' + nodes[i].value,
                explanation: '<strong>Processing node ' + nodes[i].value + '</strong>'
            });
        }

        steps.push({
            vizType: 'tree',
            nodes: nodes,
            edges: edges,
            visited: nodes.map(n => n.id),
            current: null,
            status: 'Result: ' + (example.outputRaw || JSON.stringify(example.output)),
            explanation: '<strong>Result:</strong> ' + (example.outputRaw || JSON.stringify(example.output))
        });

        return steps;
    }

    // =========================================================================
    // REGISTER TREE VISUALIZATIONS
    // =========================================================================
    window.VizUtils.register('tree-dfs', runTreeDFS);
    window.VizUtils.register('tree-bfs', runTreeBFS);
    window.VizUtils.register('tree-balance', runTreeGeneric);
    window.VizUtils.register('tree-balanced', runTreeGeneric);
    window.VizUtils.register('tree-invert', runTreeGeneric);
    window.VizUtils.register('tree-diameter', runTreeGeneric);
    window.VizUtils.register('tree-successor', runTreeGeneric);
    window.VizUtils.register('tree-flatten', runTreeGeneric);
    window.VizUtils.register('tree-height-balanced', runTreeGeneric);
    window.VizUtils.register('tree-symmetrical', runTreeGeneric);
    window.VizUtils.register('tree-symmetry', runTreeGeneric);
    window.VizUtils.register('tree-merge', runTreeGeneric);
    window.VizUtils.register('tree-evaluate', runTreeGeneric);
    window.VizUtils.register('tree-expression', runTreeGeneric);
    window.VizUtils.register('tree-compare-leaves', runTreeGeneric);
    window.VizUtils.register('tree-right-sibling', runTreeGeneric);
    window.VizUtils.register('tree-sibling', runTreeGeneric);
    window.VizUtils.register('tree-max-path', runTreeGeneric);
    window.VizUtils.register('tree-distance-k', runTreeGeneric);
    window.VizUtils.register('tree-distance', runTreeGeneric);
    window.VizUtils.register('tree-inorder-iterative', runTreeGeneric);
    window.VizUtils.register('tree-iterative', runTreeGeneric);

    window.TreesViz = {
        runTreeDFS,
        runTreeBFS,
        runTreeGeneric,
        flattenBinaryTree
    };

    console.log('[TreesViz] Tree visualization handlers loaded');

})();
