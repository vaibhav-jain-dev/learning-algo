/**
 * 200 Must Solve Problems - Interactive UI
 */
(function() {
    'use strict';

    const STATE_KEY = 'dsalgo_200_problems_state';
    let currentCategory = null;
    let currentProblem = null;
    let currentLanguage = 'python';
    let editor = null;
    let editorInitialized = false;
    let originalCode = { python: '', go: '' };
    let currentCode = { python: '', go: '' };

    // Problem data by category
    const problemsData = {
        'arrays': [
            { id: '01-validate-subsequence', name: 'Validate Subsequence', difficulty: 'easy', tags: ['Two Pointers'] },
            { id: '02-sorted-squared-array', name: 'Sorted Squared Array', difficulty: 'easy', tags: ['Two Pointers'] },
            { id: '03-tournament-winner', name: 'Tournament Winner', difficulty: 'easy', tags: ['Hash Map'] },
            { id: '04-non-constructible-change', name: 'Non-Constructible Change', difficulty: 'easy', tags: ['Sorting'] },
            { id: '05-transpose-matrix', name: 'Transpose Matrix', difficulty: 'easy', tags: ['Matrix'] },
            { id: '06-three-number-sum', name: 'Three Number Sum', difficulty: 'medium', tags: ['Two Pointers', 'Sorting'] },
            { id: '07-smallest-difference', name: 'Smallest Difference', difficulty: 'medium', tags: ['Two Pointers', 'Sorting'] },
            { id: '08-move-element-to-end', name: 'Move Element To End', difficulty: 'medium', tags: ['Two Pointers'] },
            { id: '09-monotonic-array', name: 'Monotonic Array', difficulty: 'medium', tags: ['Array'] },
            { id: '10-spiral-traverse', name: 'Spiral Traverse', difficulty: 'medium', tags: ['Matrix'] },
            { id: '11-longest-peak', name: 'Longest Peak', difficulty: 'medium', tags: ['Array'] },
            { id: '12-four-number-sum', name: 'Four Number Sum', difficulty: 'hard', tags: ['Hash Map'] },
            { id: '13-subarray-sort', name: 'Subarray Sort', difficulty: 'hard', tags: ['Array'] },
            { id: '14-largest-range', name: 'Largest Range', difficulty: 'hard', tags: ['Hash Map'] }
        ],
        'binary-search-trees': [
            { id: '01-find-closest-value', name: 'Find Closest Value in BST', difficulty: 'easy', tags: ['BST'] },
            { id: '02-bst-construction', name: 'BST Construction', difficulty: 'medium', tags: ['BST'] },
            { id: '03-validate-bst', name: 'Validate BST', difficulty: 'medium', tags: ['BST', 'DFS'] },
            { id: '04-bst-traversal', name: 'BST Traversal', difficulty: 'medium', tags: ['BST', 'DFS'] },
            { id: '05-min-height-bst', name: 'Min Height BST', difficulty: 'medium', tags: ['BST'] },
            { id: '06-find-kth-largest', name: 'Find Kth Largest in BST', difficulty: 'medium', tags: ['BST'] },
            { id: '07-reconstruct-bst', name: 'Reconstruct BST', difficulty: 'medium', tags: ['BST'] },
            { id: '08-invert-bst', name: 'Invert BST', difficulty: 'easy', tags: ['BST'] },
            { id: '09-sum-bsts', name: 'Sum of BSTs', difficulty: 'hard', tags: ['BST'] },
            { id: '10-validate-three-nodes', name: 'Validate Three Nodes', difficulty: 'hard', tags: ['BST'] },
            { id: '11-same-bsts', name: 'Same BSTs', difficulty: 'hard', tags: ['BST'] }
        ],
        'binary-trees': [
            { id: '01-branch-sums', name: 'Branch Sums', difficulty: 'easy', tags: ['DFS'] },
            { id: '02-node-depths', name: 'Node Depths', difficulty: 'easy', tags: ['DFS'] },
            { id: '03-invert-binary-tree', name: 'Invert Binary Tree', difficulty: 'easy', tags: ['DFS'] },
            { id: '04-binary-tree-diameter', name: 'Binary Tree Diameter', difficulty: 'medium', tags: ['DFS'] },
            { id: '05-find-successor', name: 'Find Successor', difficulty: 'medium', tags: ['DFS'] },
            { id: '06-height-balanced-tree', name: 'Height Balanced Binary Tree', difficulty: 'medium', tags: ['DFS'] },
            { id: '07-max-path-sum', name: 'Max Path Sum', difficulty: 'hard', tags: ['DFS'] },
            { id: '08-find-nodes-distance-k', name: 'Find Nodes Distance K', difficulty: 'hard', tags: ['BFS'] },
            { id: '09-iterative-traversal', name: 'Iterative In-Order Traversal', difficulty: 'hard', tags: ['Stack'] },
            { id: '10-flatten-binary-tree', name: 'Flatten Binary Tree', difficulty: 'hard', tags: ['DFS'] },
            { id: '11-right-sibling-tree', name: 'Right Sibling Tree', difficulty: 'hard', tags: ['DFS'] },
            { id: '12-all-kinds-node-depths', name: 'All Kinds of Node Depths', difficulty: 'very-hard', tags: ['DFS'] },
            { id: '13-compare-leaf-traversal', name: 'Compare Leaf Traversal', difficulty: 'very-hard', tags: ['DFS'] }
        ],
        'dynamic-programming': [
            { id: '01-max-subset-sum', name: 'Max Subset Sum No Adjacent', difficulty: 'medium', tags: ['DP'] },
            { id: '02-number-of-ways-to-make-change', name: 'Number of Ways to Make Change', difficulty: 'medium', tags: ['DP'] },
            { id: '03-min-coins', name: 'Min Number of Coins for Change', difficulty: 'medium', tags: ['DP'] },
            { id: '04-levenshtein-distance', name: 'Levenshtein Distance', difficulty: 'medium', tags: ['DP'] },
            { id: '05-number-of-ways-traverse-graph', name: 'Number of Ways to Traverse Graph', difficulty: 'medium', tags: ['DP'] },
            { id: '06-max-sum-increasing-subsequence', name: 'Max Sum Increasing Subsequence', difficulty: 'hard', tags: ['DP'] },
            { id: '07-longest-common-subsequence', name: 'Longest Common Subsequence', difficulty: 'hard', tags: ['DP'] },
            { id: '08-min-number-of-jumps', name: 'Min Number of Jumps', difficulty: 'hard', tags: ['DP', 'Greedy'] },
            { id: '09-water-area', name: 'Water Area', difficulty: 'hard', tags: ['DP'] },
            { id: '10-knapsack-problem', name: 'Knapsack Problem', difficulty: 'hard', tags: ['DP'] },
            { id: '11-disk-stacking', name: 'Disk Stacking', difficulty: 'hard', tags: ['DP'] },
            { id: '12-numbers-in-pi', name: 'Numbers in Pi', difficulty: 'hard', tags: ['DP'] },
            { id: '13-max-profit-with-k-transactions', name: 'Max Profit with K Transactions', difficulty: 'very-hard', tags: ['DP'] },
            { id: '14-palindrome-partitioning', name: 'Palindrome Partitioning Min Cuts', difficulty: 'very-hard', tags: ['DP'] },
            { id: '15-longest-string-chain', name: 'Longest String Chain', difficulty: 'hard', tags: ['DP', 'Hash Map'] }
        ],
        'graphs': [
            { id: '01-depth-first-search', name: 'Depth First Search', difficulty: 'easy', tags: ['DFS'] },
            { id: '02-breadth-first-search', name: 'Breadth First Search', difficulty: 'medium', tags: ['BFS'] },
            { id: '03-single-cycle-check', name: 'Single Cycle Check', difficulty: 'medium', tags: ['Graph'] },
            { id: '04-river-sizes', name: 'River Sizes', difficulty: 'medium', tags: ['DFS', 'BFS'] },
            { id: '05-youngest-common-ancestor', name: 'Youngest Common Ancestor', difficulty: 'medium', tags: ['Graph'] },
            { id: '06-remove-islands', name: 'Remove Islands', difficulty: 'medium', tags: ['DFS'] },
            { id: '07-cycle-in-graph', name: 'Cycle in Graph', difficulty: 'medium', tags: ['DFS'] },
            { id: '08-minimum-passes-matrix', name: 'Minimum Passes of Matrix', difficulty: 'medium', tags: ['BFS'] },
            { id: '09-boggle-board', name: 'Boggle Board', difficulty: 'hard', tags: ['DFS', 'Trie'] },
            { id: '10-rectangle-mania', name: 'Rectangle Mania', difficulty: 'very-hard', tags: ['Graph'] },
            { id: '11-airport-connections', name: 'Airport Connections', difficulty: 'very-hard', tags: ['Graph', 'DFS'] }
        ],
        'linked-lists': [
            { id: '01-remove-duplicates', name: 'Remove Duplicates', difficulty: 'easy', tags: ['Linked List'] },
            { id: '02-linked-list-construction', name: 'Linked List Construction', difficulty: 'easy', tags: ['Linked List'] },
            { id: '03-remove-kth-node', name: 'Remove Kth Node From End', difficulty: 'medium', tags: ['Two Pointers'] },
            { id: '04-sum-linked-lists', name: 'Sum of Linked Lists', difficulty: 'medium', tags: ['Linked List'] },
            { id: '05-find-loop', name: 'Find Loop', difficulty: 'hard', tags: ['Two Pointers'] },
            { id: '06-reverse-linked-list', name: 'Reverse Linked List', difficulty: 'medium', tags: ['Linked List'] },
            { id: '07-merge-linked-lists', name: 'Merge Linked Lists', difficulty: 'medium', tags: ['Linked List'] },
            { id: '08-shift-linked-list', name: 'Shift Linked List', difficulty: 'hard', tags: ['Linked List'] },
            { id: '09-lru-cache', name: 'LRU Cache', difficulty: 'hard', tags: ['Linked List', 'Hash Map'] },
            { id: '10-rearrange-linked-list', name: 'Rearrange Linked List', difficulty: 'hard', tags: ['Linked List'] }
        ],
        'recursion': [
            { id: '01-nth-fibonacci', name: 'Nth Fibonacci', difficulty: 'easy', tags: ['Recursion', 'DP'] },
            { id: '02-product-sum', name: 'Product Sum', difficulty: 'easy', tags: ['Recursion'] },
            { id: '03-permutations', name: 'Permutations', difficulty: 'medium', tags: ['Recursion'] },
            { id: '04-powerset', name: 'Powerset', difficulty: 'medium', tags: ['Recursion'] },
            { id: '05-phone-number-mnemonics', name: 'Phone Number Mnemonics', difficulty: 'medium', tags: ['Recursion'] },
            { id: '06-staircase-traversal', name: 'Staircase Traversal', difficulty: 'medium', tags: ['Recursion', 'DP'] },
            { id: '07-lowest-common-manager', name: 'Lowest Common Manager', difficulty: 'hard', tags: ['Recursion'] },
            { id: '08-interweaving-strings', name: 'Interweaving Strings', difficulty: 'hard', tags: ['Recursion', 'DP'] },
            { id: '09-solve-sudoku', name: 'Solve Sudoku', difficulty: 'hard', tags: ['Backtracking'] },
            { id: '10-generate-div-tags', name: 'Generate Div Tags', difficulty: 'hard', tags: ['Recursion'] },
            { id: '11-ambiguous-measurements', name: 'Ambiguous Measurements', difficulty: 'hard', tags: ['Recursion'] }
        ],
        'famous-algorithms': [
            { id: '01-kadanes-algorithm', name: "Kadane's Algorithm", difficulty: 'medium', tags: ['DP'] },
            { id: '02-dijkstras-algorithm', name: "Dijkstra's Algorithm", difficulty: 'hard', tags: ['Graph'] },
            { id: '03-topological-sort', name: 'Topological Sort', difficulty: 'hard', tags: ['Graph'] },
            { id: '04-knuth-morris-pratt', name: 'Knuth-Morris-Pratt', difficulty: 'very-hard', tags: ['String'] },
            { id: '05-a-star-algorithm', name: 'A* Algorithm', difficulty: 'very-hard', tags: ['Graph'] },
            { id: '06-union-find', name: 'Union Find', difficulty: 'medium', tags: ['Union Find'] },
            { id: '07-kruskals-algorithm', name: "Kruskal's Algorithm", difficulty: 'hard', tags: ['Graph'] },
            { id: '08-prims-algorithm', name: "Prim's Algorithm", difficulty: 'hard', tags: ['Graph'] }
        ]
    };

    const categoryNames = {
        'arrays': 'Arrays',
        'binary-search-trees': 'Binary Search Trees',
        'binary-trees': 'Binary Trees',
        'dynamic-programming': 'Dynamic Programming',
        'graphs': 'Graphs',
        'linked-lists': 'Linked Lists',
        'recursion': 'Recursion',
        'famous-algorithms': 'Famous Algorithms'
    };

    window.showCategory = function(category) {
        currentCategory = category;
        const panel = document.getElementById('problem-panel');
        const title = document.getElementById('panel-title');
        const content = document.getElementById('panel-content');

        title.textContent = categoryNames[category] || category;

        const problems = problemsData[category] || [];
        let html = '<div class="problem-list">';

        problems.forEach(function(p, idx) {
            const tags = p.tags.map(function(t) { return '<span class="problem-tag">' + t + '</span>'; }).join('');
            html += '\n                <div class="problem-item" onclick="window.openProblem(\'' + category + '\', \'' + p.id + '\')">\n                    <div class="problem-number">' + (idx + 1) + '</div>\n                    <div class="problem-info">\n                        <div class="problem-name">' + p.name + '</div>\n                        <div class="problem-tags">' + tags + '</div>\n                    </div>\n                    <span class="problem-diff ' + p.difficulty + '">' + capitalize(p.difficulty) + '</span>\n                </div>\n            ';
        });

        if (problems.length === 0) {
            html += '<div style="text-align:center;padding:3rem;color:#888;">Problems coming soon...</div>';
        }

        html += '</div>';
        content.innerHTML = html;
        panel.classList.add('active');
    };

    window.hideCategory = function() {
        document.getElementById('problem-panel').classList.remove('active');
        currentCategory = null;
    };

    window.openProblem = function(category, problemId) {
        currentProblem = { category: category, id: problemId };
        const editorView = document.getElementById('editor-view');

        // Load problem content
        fetch('/htmx/200-problem-content/' + category + '/' + problemId)
            .then(function(r) { return r.text(); })
            .then(function(html) {
                document.getElementById('description-content').innerHTML = html;
                // Highlight code blocks
                if (typeof hljs !== 'undefined') {
                    document.querySelectorAll('#description-content pre code').forEach(function(block) {
                        hljs.highlightElement(block);
                    });
                }
            });

        // Load code
        loadProblemCode(category, problemId);

        // Find problem info
        const problems = problemsData[category] || [];
        const prob = problems.find(function(p) { return p.id === problemId; });
        if (prob) {
            document.getElementById('problem-title').textContent = prob.name;
            const diffEl = document.getElementById('problem-difficulty');
            diffEl.textContent = capitalize(prob.difficulty);
            diffEl.className = 'problem-difficulty ' + prob.difficulty;
        }

        editorView.classList.add('active');
        initEditor();
    };

    window.hideEditor = function() {
        document.getElementById('editor-view').classList.remove('active');
        currentProblem = null;
    };

    function loadProblemCode(category, problemId) {
        // Load Python code
        fetch('/problems/200-must-solve/' + category + '/' + problemId + '/python_code.py')
            .then(function(r) { return r.ok ? r.text() : getDefaultCode('python'); })
            .then(function(code) {
                originalCode.python = code;
                currentCode.python = code;
                if (currentLanguage === 'python' && editor) {
                    editor.setValue(code);
                }
            })
            .catch(function() {
                originalCode.python = getDefaultCode('python');
                currentCode.python = originalCode.python;
            });

        // Load Go code
        fetch('/problems/200-must-solve/' + category + '/' + problemId + '/golang_code.go')
            .then(function(r) { return r.ok ? r.text() : getDefaultCode('go'); })
            .then(function(code) {
                originalCode.go = code;
                currentCode.go = code;
                if (currentLanguage === 'go' && editor) {
                    editor.setValue(code);
                }
            })
            .catch(function() {
                originalCode.go = getDefaultCode('go');
                currentCode.go = originalCode.go;
            });
    }

    function getDefaultCode(lang) {
        if (lang === 'python') {
            return 'def solution():\n    # Write your solution here\n    pass\n\nif __name__ == "__main__":\n    solution()';
        } else {
            return 'package main\n\nimport "fmt"\n\nfunc solution() {\n    // Write your solution here\n}\n\nfunc main() {\n    solution()\n    fmt.Println("Done")\n}';
        }
    }

    function initEditor() {
        if (editorInitialized) return;

        var wrapper = document.getElementById('code-editor-wrapper');
        if (!wrapper || typeof CodeMirror === 'undefined') {
            // Try to load CodeMirror via LazyLoader
            if (typeof LazyLoader !== 'undefined') {
                LazyLoader.loadCodeMirror().then(function() {
                    createEditor(wrapper);
                });
            }
            return;
        }

        createEditor(wrapper);
    }

    function createEditor(wrapper) {
        if (!wrapper || typeof CodeMirror === 'undefined') return;

        try {
            editor = CodeMirror(wrapper, {
                value: currentCode[currentLanguage] || getDefaultCode(currentLanguage),
                mode: currentLanguage === 'go' ? 'text/x-go' : 'python',
                theme: 'material-darker',
                lineNumbers: true,
                indentUnit: 4,
                tabSize: 4,
                matchBrackets: true,
                autoCloseBrackets: true,
                extraKeys: {
                    'Ctrl-Enter': function() { window.runCode(); },
                    'Cmd-Enter': function() { window.runCode(); }
                }
            });

            editor.setSize('100%', '100%');
            editor.on('change', function() {
                currentCode[currentLanguage] = editor.getValue();
            });

            window.editor = editor;
            editorInitialized = true;
        } catch(e) {
            console.error('Editor init failed:', e);
        }
    }

    window.setLanguage = function(lang) {
        if (editor) {
            currentCode[currentLanguage] = editor.getValue();
        }
        currentLanguage = lang;

        document.querySelectorAll('.lang-btn').forEach(function(b) { b.classList.remove('active'); });
        var activeBtn = document.querySelector('.lang-btn[data-lang="' + lang + '"]');
        if (activeBtn) activeBtn.classList.add('active');

        if (editor) {
            editor.setOption('mode', lang === 'go' ? 'text/x-go' : 'python');
            editor.setValue(currentCode[lang] || originalCode[lang] || getDefaultCode(lang));
        }
    };

    window.resetCode = function() {
        var code = originalCode[currentLanguage] || getDefaultCode(currentLanguage);
        if (editor) editor.setValue(code);
        currentCode[currentLanguage] = code;
    };

    window.formatCode = function() {
        // Simple format - in production use proper formatter
        if (editor) {
            var code = editor.getValue();
            editor.setValue(code);
        }
    };

    window.runCode = function() {
        var code = editor ? editor.getValue() : '';
        var output = document.getElementById('output-content');

        output.innerHTML = '<div style="color:#888;">Running...</div>';

        fetch('/htmx/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'code=' + encodeURIComponent(code) + '&language=' + currentLanguage
        })
        .then(function(r) { return r.text(); })
        .then(function(html) {
            output.innerHTML = html;
        })
        .catch(function(err) {
            output.innerHTML = '<div style="color:#f44;">Error: ' + err.message + '</div>';
        });
    };

    window.clearOutput = function() {
        document.getElementById('output-content').innerHTML = '<div class="output-placeholder">Run your code to see output here</div>';
    };

    window.showDescTab = function(tab) {
        document.querySelectorAll('.desc-tab').forEach(function(t) { t.classList.remove('active'); });
        var clickedTab = document.querySelector('.desc-tab[data-tab="' + tab + '"]');
        if (clickedTab) clickedTab.classList.add('active');

        // Hide all content panels
        var descContent = document.getElementById('description-content');
        var solContent = document.getElementById('solutions-content');
        var vizContent = document.getElementById('visualization-content');

        if (descContent) descContent.style.display = 'none';
        if (solContent) solContent.style.display = 'none';
        if (vizContent) vizContent.style.display = 'none';

        // Show selected tab content
        if (tab === 'problem' && descContent) {
            descContent.style.display = 'block';
        } else if (tab === 'solutions' && solContent) {
            solContent.style.display = 'block';
            loadSolutions();
        } else if (tab === 'visualize' && vizContent) {
            vizContent.style.display = 'block';
            loadVisualization();
        } else if (tab === 'hints' && descContent) {
            descContent.style.display = 'block';
            // TODO: Load hints
        }
    };

    function loadSolutions() {
        if (!currentProblem) return;
        var solContent = document.getElementById('solutions-content');
        if (!solContent) return;

        // Fetch solutions markdown/content
        fetch('/htmx/200-problem-solutions/' + currentProblem.category + '/' + currentProblem.id)
            .then(function(r) { return r.ok ? r.text() : '<p>No solutions available yet.</p>'; })
            .then(function(html) {
                solContent.innerHTML = html;
                if (typeof hljs !== 'undefined') {
                    solContent.querySelectorAll('pre code').forEach(function(block) {
                        hljs.highlightElement(block);
                    });
                }
            })
            .catch(function() {
                solContent.innerHTML = '<p>No solutions available yet.</p>';
            });
    }

    function loadVisualization() {
        var vizContent = document.getElementById('visualization-content');
        if (!vizContent) return;
        vizContent.innerHTML = '<p style="color:#888;text-align:center;padding:2rem;">Visualization coming soon...</p>';
    }

    function capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        console.log('200 Problems UI initialized');
    });
})();
