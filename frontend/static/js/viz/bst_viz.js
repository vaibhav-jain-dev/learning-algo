/**
 * Binary Search Tree Algorithm Visualizations
 */
(function() {
    'use strict';

    if (!window.VizUtils) {
        console.error('[BSTViz] VizUtils not loaded yet!');
        return;
    }

    function flattenBST(node, nodes, edges, parentId, position) {
        if (!node) return;
        const nodeId = 'node_' + nodes.length;
        const nodeValue = node.value !== undefined ? node.value : node.val;
        nodes.push({ id: nodeId, value: nodeValue, label: String(nodeValue), position: position });
        if (parentId !== null) {
            edges.push({ from: parentId, to: nodeId, direction: position });
        }
        if (node.left) flattenBST(node.left, nodes, edges, nodeId, 'left');
        if (node.right) flattenBST(node.right, nodes, edges, nodeId, 'right');
    }

    function runBSTSearch(example, config, complexity) {
        const steps = [];
        const tree = example.input.tree || example.input.root;
        const target = example.input.target || example.input.value;
        if (!tree) return window.VizUtils.runGenericVisualization(example, config, complexity);

        const nodes = [];
        const edges = [];
        flattenBST(tree, nodes, edges, null, 'root');

        steps.push({
            vizType: 'tree',
            nodes: nodes,
            edges: edges,
            visited: [],
            current: null,
            target: target,
            status: 'BST Search for ' + target,
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Target:</strong> ' + target + '<br>' +
                '<strong>Expected:</strong> ' + JSON.stringify(example.output) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Simulate BST search path
        let current = tree;
        const visited = [];
        let stepCount = 0;
        while (current && stepCount < 10) {
            const currentValue = current.value !== undefined ? current.value : current.val;
            const nodeId = nodes.find(n => n.value === currentValue)?.id;
            if (nodeId) visited.push(nodeId);

            const direction = target < currentValue ? 'left' : target > currentValue ? 'right' : 'found';
            steps.push({
                vizType: 'tree',
                nodes: nodes,
                edges: edges,
                visited: visited.slice(),
                current: nodeId,
                target: target,
                status: direction === 'found' ? 'Found: ' + currentValue : 'Go ' + direction + ' from ' + currentValue,
                explanation: direction === 'found' ?
                    '<strong>Found target ' + target + '!</strong>' :
                    '<strong>At node ' + currentValue + '</strong><br>' + target + (target < currentValue ? ' < ' : ' > ') + currentValue + ' -> go ' + direction
            });

            if (direction === 'found') break;
            current = direction === 'left' ? current.left : current.right;
            stepCount++;
        }

        steps.push({
            vizType: 'tree',
            nodes: nodes,
            edges: edges,
            visited: visited,
            status: 'Result: ' + JSON.stringify(example.output),
            explanation: '<strong>Result:</strong> ' + JSON.stringify(example.output)
        });

        return steps;
    }

    function runBSTGeneric(example, config, complexity) {
        const steps = [];
        const tree = example.input.tree || example.input.root || example.input.bst;

        if (!tree) return window.VizUtils.runGenericVisualization(example, config, complexity);

        const nodes = [];
        const edges = [];
        flattenBST(tree, nodes, edges, null, 'root');

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
            status: 'Result: ' + (example.outputRaw || JSON.stringify(example.output)),
            explanation: '<strong>Result:</strong> ' + (example.outputRaw || JSON.stringify(example.output))
        });

        return steps;
    }

    // Register BST visualizations
    window.VizUtils.register('bst-search', runBSTSearch);
    window.VizUtils.register('bst-construction', runBSTGeneric);
    window.VizUtils.register('bst-construction-balanced', runBSTGeneric);
    window.VizUtils.register('bst-validate', runBSTGeneric);
    window.VizUtils.register('bst-validation', runBSTGeneric);
    window.VizUtils.register('bst-validation-nodes', runBSTGeneric);
    window.VizUtils.register('bst-traversal', runBSTGeneric);
    window.VizUtils.register('bst-min-height', runBSTGeneric);
    window.VizUtils.register('bst-kth-largest', runBSTGeneric);
    window.VizUtils.register('bst-reconstruction', runBSTGeneric);
    window.VizUtils.register('bst-comparison', runBSTGeneric);
    window.VizUtils.register('bst-augmented', runBSTGeneric);
    window.VizUtils.register('bst-range', runBSTGeneric);
    window.VizUtils.register('bst-iterator', runBSTGeneric);
    window.VizUtils.register('bst-repair', runBSTGeneric);
    window.VizUtils.register('bst-sum', runBSTGeneric);

    window.BSTViz = { runBSTSearch, runBSTGeneric, flattenBST };
    console.log('[BSTViz] BST visualization handlers loaded');
})();
