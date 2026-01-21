/**
 * Graph Algorithm Visualizations
 *
 * This file contains visualization handlers for all graph problems.
 */
(function() {
    'use strict';

    if (!window.VizUtils) {
        console.error('[GraphsViz] VizUtils not loaded yet!');
        return;
    }

    // =========================================================================
    // HELPER: Flatten tree structure for graph visualization
    // =========================================================================
    function flattenGraphTree(node, nodes, edges, parentId) {
        if (!node) return;
        const nodeId = node.name || node.id || ('node_' + nodes.length);
        nodes.push({ id: nodeId, label: nodeId, value: node.value });
        if (parentId !== null) {
            edges.push({ from: parentId, to: nodeId });
        }
        if (node.children) {
            node.children.forEach(child => flattenGraphTree(child, nodes, edges, nodeId));
        }
    }

    // =========================================================================
    // GRAPH DFS
    // =========================================================================
    function runGraphDFS(example, config, complexity) {
        const steps = [];
        const tree = example.input.tree || example.input.graph;
        if (!tree) return window.VizUtils.runGenericVisualization(example, config, complexity);

        const nodes = [];
        const edges = [];
        flattenGraphTree(tree, nodes, edges, null);

        const visited = [];
        const stack = [nodes[0].id];
        const result = [];

        steps.push({
            vizType: 'graph',
            nodes: nodes,
            edges: edges,
            visited: [],
            current: null,
            stack: stack.slice(),
            result: [],
            status: 'Initialize DFS',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Algorithm:</strong> Depth First Search<br>' +
                '<strong>Expected:</strong> ' + JSON.stringify(example.output) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        while (stack.length > 0 && steps.length < 20) {
            const current = stack.pop();
            if (visited.indexOf(current) !== -1) continue;

            visited.push(current);
            result.push(current);

            const children = edges
                .filter(e => e.from === current)
                .map(e => e.to)
                .reverse();

            children.forEach(child => {
                if (visited.indexOf(child) === -1) {
                    stack.push(child);
                }
            });

            steps.push({
                vizType: 'graph',
                nodes: nodes,
                edges: edges,
                visited: visited.slice(),
                current: current,
                stack: stack.slice(),
                result: result.slice(),
                status: 'Visit: ' + current,
                explanation: '<strong>Visit node ' + current + '</strong><br><br>' +
                    '- Added to result<br>' +
                    '- Stack: [' + stack.join(', ') + ']<br>' +
                    '- Result: [' + result.join(' -> ') + ']'
            });
        }

        steps.push({
            vizType: 'graph',
            nodes: nodes,
            edges: edges,
            visited: visited,
            current: null,
            stack: [],
            result: result,
            status: 'DFS Complete!',
            explanation: '<strong>DFS Complete!</strong><br><br>' +
                '- Visited all reachable nodes<br>' +
                '- Result: [' + result.join(' -> ') + ']'
        });

        return steps;
    }

    // =========================================================================
    // GRAPH BFS
    // =========================================================================
    function runGraphBFS(example, config, complexity) {
        const steps = [];
        const tree = example.input.tree || example.input.graph;
        if (!tree) return window.VizUtils.runGenericVisualization(example, config, complexity);

        const nodes = [];
        const edges = [];
        flattenGraphTree(tree, nodes, edges, null);

        const visited = [];
        const queue = [nodes[0].id];
        const result = [];

        steps.push({
            vizType: 'graph',
            nodes: nodes,
            edges: edges,
            visited: [],
            current: null,
            queue: queue.slice(),
            result: [],
            status: 'Initialize BFS',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Algorithm:</strong> Breadth First Search<br>' +
                '<strong>Expected:</strong> ' + JSON.stringify(example.output) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        while (queue.length > 0 && steps.length < 20) {
            const current = queue.shift();
            if (visited.indexOf(current) !== -1) continue;

            visited.push(current);
            result.push(current);

            const children = edges
                .filter(e => e.from === current)
                .map(e => e.to);

            children.forEach(child => {
                if (visited.indexOf(child) === -1 && queue.indexOf(child) === -1) {
                    queue.push(child);
                }
            });

            steps.push({
                vizType: 'graph',
                nodes: nodes,
                edges: edges,
                visited: visited.slice(),
                current: current,
                queue: queue.slice(),
                result: result.slice(),
                status: 'Visit: ' + current,
                explanation: '<strong>Visit node ' + current + '</strong><br><br>' +
                    '- Process level by level<br>' +
                    '- Queue: [' + queue.join(', ') + ']<br>' +
                    '- Result: [' + result.join(' -> ') + ']'
            });
        }

        steps.push({
            vizType: 'graph',
            nodes: nodes,
            edges: edges,
            visited: visited,
            current: null,
            queue: [],
            result: result,
            status: 'BFS Complete!',
            explanation: '<strong>BFS Complete!</strong><br><br>' +
                '- Visited all reachable nodes level by level<br>' +
                '- Result: [' + result.join(' -> ') + ']'
        });

        return steps;
    }

    // =========================================================================
    // GENERIC GRAPH (handles multiple input formats)
    // =========================================================================
    function runGraphGeneric(example, config, complexity) {
        const steps = [];
        const tree = example.input.tree || example.input.graph || example.input.root;
        const grid = example.input.grid || example.input.matrix || example.input.board;
        const adjList = example.input.edges || example.input.adjList;
        const exchangeRates = example.input.exchangeRates;

        // Handle exchange rates matrix (for arbitrage detection)
        if (exchangeRates && Array.isArray(exchangeRates) && Array.isArray(exchangeRates[0])) {
            const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];
            const numCurrencies = exchangeRates.length;
            const nodes = [];
            const edges = [];

            for (let i = 0; i < numCurrencies; i++) {
                nodes.push({ id: 'currency_' + i, label: currencies[i] || ('C' + i), value: i });
            }

            for (let i = 0; i < numCurrencies; i++) {
                for (let j = 0; j < numCurrencies; j++) {
                    if (i !== j && exchangeRates[i][j] !== 1) {
                        edges.push({
                            from: 'currency_' + i,
                            to: 'currency_' + j,
                            weight: exchangeRates[i][j].toFixed(4)
                        });
                    }
                }
            }

            steps.push({
                vizType: 'graph',
                nodes: nodes,
                edges: edges,
                visited: [],
                queue: [],
                status: config.name + ' - Initialize',
                explanation: '<strong>' + config.name + '</strong><br><br>' +
                    '<strong>Algorithm:</strong> Bellman-Ford for negative cycle detection<br>' +
                    '<strong>Currencies:</strong> ' + numCurrencies + '<br>' +
                    '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            // Show checking steps
            for (let i = 0; i < numCurrencies; i++) {
                steps.push({
                    vizType: 'graph',
                    nodes: nodes,
                    edges: edges,
                    visited: nodes.slice(0, i + 1).map(n => n.id),
                    current: 'currency_' + i,
                    status: 'Check rates from ' + (currencies[i] || ('C' + i)),
                    explanation: '<strong>Checking exchange rates from ' + (currencies[i] || ('C' + i)) + '</strong>'
                });
            }

            const hasArbitrage = example.output === true;
            steps.push({
                vizType: 'graph',
                nodes: nodes,
                edges: edges,
                visited: nodes.map(n => n.id),
                status: hasArbitrage ? 'Arbitrage Found!' : 'No Arbitrage',
                explanation: hasArbitrage ?
                    '<strong>Arbitrage Opportunity Detected!</strong>' :
                    '<strong>No Arbitrage Opportunity</strong>'
            });

            return steps;
        }

        // Handle 2D grid format
        if (grid && Array.isArray(grid) && Array.isArray(grid[0])) {
            const rows = grid.length;
            const cols = grid[0].length;

            steps.push({
                vizType: 'matrix',
                matrix: grid,
                currentRow: -1,
                currentCol: -1,
                status: config.name,
                explanation: '<strong>' + config.name + '</strong><br><br>' +
                    '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                    '<strong>Grid Size:</strong> ' + rows + ' x ' + cols + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            const maxCells = Math.min(rows * cols, 6);
            for (let i = 0; i < maxCells; i++) {
                const r = Math.floor(i / cols) % rows;
                const c = i % cols;
                steps.push({
                    vizType: 'matrix',
                    matrix: grid,
                    currentRow: r,
                    currentCol: c,
                    status: 'Checking cell (' + r + ',' + c + ')',
                    explanation: '<strong>Processing cell (' + r + ',' + c + ')</strong><br>Value: ' + grid[r][c]
                });
            }

            steps.push({
                vizType: 'matrix',
                matrix: grid,
                currentRow: -1,
                currentCol: -1,
                status: 'Result: ' + JSON.stringify(example.output),
                explanation: '<strong>Result:</strong> ' + JSON.stringify(example.output)
            });

            return steps;
        }

        // Handle adjacency list format
        if (adjList && Array.isArray(adjList) && Array.isArray(adjList[0])) {
            const nodes = [];
            const edges = [];

            for (let i = 0; i < adjList.length; i++) {
                nodes.push({ id: 'node_' + i, label: String(i), value: i });
            }

            for (let i = 0; i < adjList.length; i++) {
                const neighbors = adjList[i];
                for (let j = 0; j < neighbors.length; j++) {
                    edges.push({ from: 'node_' + i, to: 'node_' + neighbors[j] });
                }
            }

            steps.push({
                vizType: 'graph',
                nodes: nodes,
                edges: edges,
                visited: [],
                status: 'Graph: ' + config.name,
                explanation: '<strong>' + config.name + '</strong><br><br>' +
                    '<strong>Nodes:</strong> ' + nodes.length + '<br>' +
                    '<strong>Edges:</strong> ' + edges.length + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            for (let i = 0; i < Math.min(nodes.length, 8); i++) {
                steps.push({
                    vizType: 'graph',
                    nodes: nodes,
                    edges: edges,
                    visited: nodes.slice(0, i + 1).map(n => n.id),
                    current: 'node_' + i,
                    status: 'Visiting node ' + i,
                    explanation: '<strong>Processing node ' + i + '</strong>'
                });
            }

            steps.push({
                vizType: 'graph',
                nodes: nodes,
                edges: edges,
                visited: nodes.map(n => n.id),
                status: 'Result: ' + JSON.stringify(example.output),
                explanation: '<strong>Result:</strong> ' + JSON.stringify(example.output)
            });

            return steps;
        }

        // Handle tree format
        if (tree && typeof tree === 'object') {
            const nodes = [];
            const edges = [];
            flattenGraphTree(tree, nodes, edges, null);

            steps.push({
                vizType: 'graph',
                nodes: nodes,
                edges: edges,
                visited: [],
                current: null,
                status: 'Graph: ' + config.name,
                explanation: '<strong>' + config.name + '</strong><br><br>' +
                    '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                    '<strong>Nodes:</strong> ' + nodes.length + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            const maxSteps = Math.min(nodes.length, 6);
            for (let i = 0; i < maxSteps; i++) {
                steps.push({
                    vizType: 'graph',
                    nodes: nodes,
                    edges: edges,
                    visited: nodes.slice(0, i + 1).map(n => n.id),
                    current: nodes[i].id,
                    status: 'Visit: ' + nodes[i].label,
                    explanation: '<strong>Processing node ' + nodes[i].label + '</strong>'
                });
            }

            steps.push({
                vizType: 'graph',
                nodes: nodes,
                edges: edges,
                visited: nodes.map(n => n.id),
                status: 'Result: ' + JSON.stringify(example.output),
                explanation: '<strong>Result:</strong> ' + JSON.stringify(example.output)
            });

            return steps;
        }

        return window.VizUtils.runGenericVisualization(example, config, complexity);
    }

    // =========================================================================
    // REGISTER ALL GRAPH VISUALIZATIONS
    // =========================================================================
    window.VizUtils.register('graph-dfs', runGraphDFS);
    window.VizUtils.register('graph-bfs', runGraphBFS);
    window.VizUtils.register('flood-fill', runGraphGeneric);
    window.VizUtils.register('cycle-detection', runGraphGeneric);
    window.VizUtils.register('graph-cycle', runGraphGeneric);
    window.VizUtils.register('graph-coloring', runGraphGeneric);
    window.VizUtils.register('graph-flood-fill', runGraphGeneric);
    window.VizUtils.register('graph-ancestor', runGraphGeneric);
    window.VizUtils.register('graph-arbitrage', runGraphGeneric);
    window.VizUtils.register('graph-min-passes', runGraphGeneric);
    window.VizUtils.register('graph-boggle', runGraphGeneric);
    window.VizUtils.register('bellman-ford', runGraphGeneric);
    window.VizUtils.register('bellman-ford-dijkstra', runGraphGeneric);
    window.VizUtils.register('floyd-cycle-detection', runGraphGeneric);
    window.VizUtils.register('dijkstra-modified', runGraphGeneric);
    window.VizUtils.register('minimum-spanning-tree', runGraphGeneric);
    window.VizUtils.register('graph-connections', runGraphGeneric);

    window.GraphsViz = {
        runGraphDFS,
        runGraphBFS,
        runGraphGeneric,
        flattenGraphTree
    };

    console.log('[GraphsViz] Graph visualization handlers loaded');

})();
