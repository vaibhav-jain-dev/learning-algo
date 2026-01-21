/**
 * Visualization Index
 *
 * Provides an index of all visualization files and their status.
 * Allows browsing all visualizations and checking which problems have custom animations.
 */
(function() {
    'use strict';

    // All visualization files in the system
    const VIZ_FILES = [
        { file: 'arrays_viz.js', category: 'Arrays', algorithms: [
            'two-pointer-subsequence', 'hash-table-two-sum', 'two-pointer-sorted-squared',
            'two-pointer-move', 'sort-three-sum', 'spiral-matrix', 'hash-counting',
            'greedy-change', 'sort-merge', 'hash-expansion', 'linear-scan', 'hash-prefix-sum'
        ]},
        { file: 'graphs_viz.js', category: 'Graphs', algorithms: [
            'graph-dfs', 'graph-bfs', 'flood-fill', 'cycle-detection', 'graph-cycle',
            'graph-coloring', 'graph-flood-fill', 'graph-ancestor', 'graph-arbitrage',
            'graph-min-passes', 'graph-boggle', 'bellman-ford', 'dijkstra-modified',
            'minimum-spanning-tree', 'graph-connections'
        ]},
        { file: 'linked_lists_viz.js', category: 'Linked Lists', algorithms: [
            'll-remove-duplicates', 'll-reverse', 'll-merge', 'll-find-loop',
            'll-remove', 'll-middle', 'll-construction', 'll-remove-kth',
            'll-sum', 'll-shift', 'll-lru-cache', 'll-rearrange'
        ]},
        { file: 'trees_viz.js', category: 'Binary Trees', algorithms: [
            'tree-dfs', 'tree-bfs', 'tree-balance', 'tree-balanced', 'tree-invert',
            'tree-diameter', 'tree-successor', 'tree-flatten', 'tree-height-balanced',
            'tree-symmetrical', 'tree-symmetry', 'tree-merge', 'tree-evaluate',
            'tree-expression', 'tree-compare-leaves', 'tree-right-sibling',
            'tree-sibling', 'tree-max-path', 'tree-distance-k', 'tree-distance',
            'tree-inorder-iterative', 'tree-iterative'
        ]},
        { file: 'bst_viz.js', category: 'Binary Search Trees', algorithms: [
            'bst-search', 'bst-construction', 'bst-construction-balanced', 'bst-validate',
            'bst-validation', 'bst-validation-nodes', 'bst-traversal', 'bst-min-height',
            'bst-kth-largest', 'bst-reconstruction', 'bst-comparison', 'bst-augmented',
            'bst-range', 'bst-iterator', 'bst-repair', 'bst-sum'
        ]},
        { file: 'recursion_viz.js', category: 'Recursion', algorithms: [
            'recursion-fibonacci', 'recursion-permutations', 'recursion-powerset',
            'recursion-sudoku', 'recursion-backtrack', 'recursion-divide',
            'recursion-product-sum', 'recursion-phone', 'recursion-staircase',
            'recursion-divtags', 'recursion-measurements', 'recursion-interweaving',
            'recursion-count-bst', 'recursion-probability', 'recursion-manager',
            'recursion-minesweeper'
        ]},
        { file: 'dp_viz.js', category: 'Dynamic Programming', algorithms: [
            'dp-coin-change', 'dp-lcs', 'dp-edit', 'dp-edit-distance', 'dp-knapsack',
            'dp-max-sum', 'dp-max-subset', 'dp-lis', 'dp-increasing-subseq',
            'dp-matrix', 'dp-disk-stacking', 'dp-pi-numbers', 'dp-transactions',
            'dp-palindrome', 'dp-string-chain', 'dp-square-zeroes',
            'dp-graph-traversal', 'dp-jumps'
        ]},
        { file: 'famous_viz.js', category: 'Famous Algorithms', algorithms: [
            'dijkstra', 'dijkstras-algorithm', 'kruskal', 'kruskals-algorithm',
            'prim', 'prims-algorithm', 'a-star', 'bfs-astar', 'a-star-bfs',
            'topological-sort', 'union-find', 'kadane', 'kadanes-algorithm',
            'kmp', 'kmp-algorithm'
        ]}
    ];

    /**
     * Get all visualization files info
     */
    function getVizFiles() {
        return VIZ_FILES;
    }

    /**
     * Get total count of registered algorithms
     */
    function getTotalAlgorithms() {
        return VIZ_FILES.reduce((sum, f) => sum + f.algorithms.length, 0);
    }

    /**
     * Find which file handles a given algorithm
     */
    function findAlgorithmFile(algorithm) {
        for (const file of VIZ_FILES) {
            if (file.algorithms.includes(algorithm)) {
                return file;
            }
        }
        return null;
    }

    /**
     * Check if an algorithm has visualization
     */
    function hasVisualization(algorithm) {
        return findAlgorithmFile(algorithm) !== null;
    }

    /**
     * Generate HTML for the index modal
     */
    function generateIndexHTML() {
        let html = '<div class="viz-index-container">';
        html += '<div class="viz-index-header">';
        html += '<h3>Visualization Index</h3>';
        html += '<p>Total: <strong>' + getTotalAlgorithms() + '</strong> algorithm visualizations across <strong>' + VIZ_FILES.length + '</strong> categories</p>';
        html += '</div>';

        for (const file of VIZ_FILES) {
            html += '<div class="viz-index-category">';
            html += '<div class="viz-index-category-header" onclick="this.parentElement.classList.toggle(\'expanded\')">';
            html += '<span class="viz-index-arrow">&#9654;</span>';
            html += '<strong>' + file.category + '</strong>';
            html += '<span class="viz-index-count">' + file.algorithms.length + ' algorithms</span>';
            html += '<span class="viz-index-file">' + file.file + '</span>';
            html += '</div>';
            html += '<div class="viz-index-algorithms">';
            for (const alg of file.algorithms) {
                const registered = window.VizUtils && window.VizUtils.hasVisualization(alg);
                html += '<div class="viz-index-algorithm ' + (registered ? 'registered' : 'pending') + '">';
                html += '<span class="viz-index-status">' + (registered ? '&#10004;' : '&#9675;') + '</span>';
                html += '<code>' + alg + '</code>';
                html += '</div>';
            }
            html += '</div>';
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    /**
     * Show the index modal
     */
    function showIndexModal() {
        let modal = document.getElementById('viz-index-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'viz-index-modal';
            modal.className = 'viz-index-modal';
            modal.innerHTML = `
                <div class="viz-index-modal-overlay" onclick="window.VizIndex.hideModal()"></div>
                <div class="viz-index-modal-content">
                    <div class="viz-index-modal-header">
                        <h2>Visualization Files Index</h2>
                        <button class="viz-index-modal-close" onclick="window.VizIndex.hideModal()">&times;</button>
                    </div>
                    <div class="viz-index-modal-body">
                        ${generateIndexHTML()}
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        modal.classList.add('visible');
    }

    /**
     * Hide the index modal
     */
    function hideIndexModal() {
        const modal = document.getElementById('viz-index-modal');
        if (modal) {
            modal.classList.remove('visible');
        }
    }

    // Export
    window.VizIndex = {
        files: VIZ_FILES,
        getFiles: getVizFiles,
        getTotal: getTotalAlgorithms,
        findFile: findAlgorithmFile,
        hasViz: hasVisualization,
        generateHTML: generateIndexHTML,
        showModal: showIndexModal,
        hideModal: hideIndexModal
    };

    console.log('[VizIndex] Visualization index loaded with ' + getTotalAlgorithms() + ' algorithms');

})();
