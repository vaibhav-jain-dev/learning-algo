/**
 * 200 Must Solve Problems - Interactive UI with Visualizations
 */
(function() {
    'use strict';

    let currentCategory = null;
    let currentProblem = null;
    let currentLanguage = 'python';
    let editor = null;
    let editorInitialized = false;
    let originalCode = { python: '', go: '' };
    let currentCode = { python: '', go: '' };

    // Actual problem data matching the filesystem
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
            { id: '15-longest-string-chain', name: 'Longest String Chain', difficulty: 'hard', tags: ['DP', 'Hash Map'] },
            { id: '16-square-of-zeroes', name: 'Square of Zeroes', difficulty: 'very-hard', tags: ['DP'] }
        ],
        'graphs': [
            { id: '01-depth-first-search', name: 'Depth First Search', difficulty: 'easy', tags: ['DFS'] },
            { id: '02-breadth-first-search', name: 'Breadth First Search', difficulty: 'medium', tags: ['BFS'] },
            { id: '03-cycle-in-graph', name: 'Cycle in Graph', difficulty: 'medium', tags: ['DFS'] },
            { id: '04-youngest-common-ancestor', name: 'Youngest Common Ancestor', difficulty: 'medium', tags: ['Graph'] },
            { id: '05-river-sizes', name: 'River Sizes', difficulty: 'medium', tags: ['DFS', 'BFS'] },
            { id: '06-remove-islands', name: 'Remove Islands', difficulty: 'medium', tags: ['DFS'] },
            { id: '07-single-cycle-check', name: 'Single Cycle Check', difficulty: 'medium', tags: ['Graph'] },
            { id: '08-minimum-passes', name: 'Minimum Passes of Matrix', difficulty: 'medium', tags: ['BFS'] },
            { id: '09-two-colorable', name: 'Two-Colorable', difficulty: 'medium', tags: ['DFS'] },
            { id: '10-airport-connections', name: 'Airport Connections', difficulty: 'very-hard', tags: ['Graph', 'DFS'] },
            { id: '11-boggle-board', name: 'Boggle Board', difficulty: 'hard', tags: ['DFS', 'Trie'] }
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
            { id: '05-union-find', name: 'Union Find', difficulty: 'medium', tags: ['Union Find'] },
            { id: '06-kruskals-algorithm', name: "Kruskal's Algorithm", difficulty: 'hard', tags: ['Graph'] },
            { id: '07-prims-algorithm', name: "Prim's Algorithm", difficulty: 'hard', tags: ['Graph'] },
            { id: '08-a-star-algorithm', name: 'A* Algorithm', difficulty: 'very-hard', tags: ['Graph'] }
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

    function capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
    }

    function getDifficultyClass(diff) {
        const classes = {
            'easy': 'background: #28a745; color: white;',
            'medium': 'background: #007bff; color: white;',
            'hard': 'background: #dc3545; color: white;',
            'very-hard': 'background: #343a40; color: white;'
        };
        return classes[diff] || 'background: #6c757d; color: white;';
    }

    window.showCategory = function(category) {
        currentCategory = category;
        var panel = document.getElementById('problem-panel');
        var title = document.getElementById('panel-title');
        var content = document.getElementById('panel-content');

        if (!panel) return;

        title.textContent = categoryNames[category] || category;

        var problems = problemsData[category] || [];
        var html = '<div class="problem-list">';

        problems.forEach(function(p, idx) {
            var tags = p.tags.map(function(t) { return '<span class="problem-tag" style="font-size: 0.75rem; padding: 0.2rem 0.5rem; background: #e9ecef; border-radius: 4px; margin-right: 0.25rem;">' + t + '</span>'; }).join('');
            html += '<div class="problem-item" onclick="window.openProblem(\'' + category + '\', \'' + p.id + '\')" style="background: white; border-radius: 8px; padding: 1rem 1.5rem; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 1rem; cursor: pointer; border: 2px solid transparent; transition: all 0.2s;" onmouseover="this.style.borderColor=\'#667eea\'" onmouseout="this.style.borderColor=\'transparent\'">' +
                '<div class="problem-number" style="width: 40px; height: 40px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #667eea;">' + (idx + 1) + '</div>' +
                '<div class="problem-info" style="flex: 1;">' +
                    '<div class="problem-name" style="font-weight: 600; color: #333; margin-bottom: 0.25rem;">' + p.name + '</div>' +
                    '<div class="problem-tags">' + tags + '</div>' +
                '</div>' +
                '<span class="problem-diff" style="padding: 0.4rem 0.9rem; border-radius: 1rem; font-size: 0.8rem; font-weight: 600; ' + getDifficultyClass(p.difficulty) + '">' + capitalize(p.difficulty) + '</span>' +
            '</div>';
        });

        if (problems.length === 0) {
            html += '<div style="text-align:center;padding:3rem;color:#888;">Problems coming soon...</div>';
        }

        html += '</div>';
        content.innerHTML = html;
        panel.classList.add('active');
    };

    window.hideCategory = function() {
        var panel = document.getElementById('problem-panel');
        if (panel) panel.classList.remove('active');
        currentCategory = null;
    };

    window.openProblem = function(category, problemId) {
        currentProblem = { category: category, id: problemId };
        var editorView = document.getElementById('editor-view');

        // Load problem content from backend
        fetch('/htmx/200-problem-content/' + category + '/' + problemId)
            .then(function(r) { return r.ok ? r.text() : '<p>Problem content loading...</p>'; })
            .then(function(html) {
                var descContent = document.getElementById('description-content');
                if (descContent) {
                    descContent.innerHTML = html;
                    // Highlight code blocks
                    if (typeof hljs !== 'undefined') {
                        descContent.querySelectorAll('pre code').forEach(function(block) {
                            hljs.highlightElement(block);
                        });
                    }
                }
            })
            .catch(function() {
                var descContent = document.getElementById('description-content');
                if (descContent) descContent.innerHTML = '<p>Error loading problem content.</p>';
            });

        // Load code files
        loadProblemCode(category, problemId);

        // Find problem info
        var problems = problemsData[category] || [];
        var prob = problems.find(function(p) { return p.id === problemId; });
        if (prob) {
            var titleEl = document.getElementById('problem-title');
            var diffEl = document.getElementById('problem-difficulty');
            if (titleEl) titleEl.textContent = prob.name;
            if (diffEl) {
                diffEl.textContent = capitalize(prob.difficulty);
                diffEl.style.cssText = getDifficultyClass(prob.difficulty) + ' padding: 0.35rem 0.85rem; border-radius: 1rem; font-size: 0.8rem; font-weight: 600;';
            }
        }

        if (editorView) editorView.classList.add('active');
        initEditor();
    };

    window.hideEditor = function() {
        var editorView = document.getElementById('editor-view');
        if (editorView) editorView.classList.remove('active');
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
            return 'def solution():\n    # Write your solution here\n    pass\n\nif __name__ == "__main__":\n    result = solution()\n    print(result)';
        } else {
            return 'package main\n\nimport "fmt"\n\nfunc solution() interface{} {\n    // Write your solution here\n    return nil\n}\n\nfunc main() {\n    result := solution()\n    fmt.Println(result)\n}';
        }
    }

    function initEditor() {
        if (editorInitialized) return;

        var wrapper = document.getElementById('code-editor-wrapper');
        if (!wrapper) return;

        // Try to use CodeMirror if available
        if (typeof CodeMirror !== 'undefined') {
            createCodeMirrorEditor(wrapper);
        } else if (typeof LazyLoader !== 'undefined') {
            LazyLoader.loadCodeMirror().then(function() {
                createCodeMirrorEditor(wrapper);
            });
        } else {
            // Fallback to textarea
            wrapper.innerHTML = '<textarea id="code-fallback" style="width: 100%; height: 100%; font-family: monospace; padding: 1rem; border: none; background: #1e1e1e; color: #d4d4d4; resize: none;">' + (currentCode[currentLanguage] || getDefaultCode(currentLanguage)) + '</textarea>';
        }
    }

    function createCodeMirrorEditor(wrapper) {
        if (editorInitialized || !wrapper) return;

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
            console.error('CodeMirror init failed:', e);
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
        } else {
            var fallback = document.getElementById('code-fallback');
            if (fallback) fallback.value = currentCode[lang] || originalCode[lang] || getDefaultCode(lang);
        }
    };

    window.resetCode = function() {
        var code = originalCode[currentLanguage] || getDefaultCode(currentLanguage);
        if (editor) editor.setValue(code);
        else {
            var fallback = document.getElementById('code-fallback');
            if (fallback) fallback.value = code;
        }
        currentCode[currentLanguage] = code;
    };

    window.formatCode = function() {
        if (editor) {
            // Basic auto-indent
            var totalLines = editor.lineCount();
            for (var i = 0; i < totalLines; i++) {
                editor.indentLine(i);
            }
        }
    };

    window.runCode = function() {
        var code = editor ? editor.getValue() : (document.getElementById('code-fallback') || {}).value || '';
        var output = document.getElementById('output-content');

        if (output) output.innerHTML = '<div style="color:#888;">Running...</div>';

        fetch('/htmx/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'code=' + encodeURIComponent(code) + '&language=' + currentLanguage
        })
        .then(function(r) { return r.text(); })
        .then(function(html) {
            if (output) output.innerHTML = html;
        })
        .catch(function(err) {
            if (output) output.innerHTML = '<div style="color:#f44;">Error: ' + err.message + '</div>';
        });
    };

    window.clearOutput = function() {
        var output = document.getElementById('output-content');
        if (output) output.innerHTML = '<div class="output-placeholder">Run your code to see output here</div>';
    };

    window.showDescTab = function(tab) {
        document.querySelectorAll('.desc-tab').forEach(function(t) { t.classList.remove('active'); });
        var clickedTab = document.querySelector('.desc-tab[data-tab="' + tab + '"]');
        if (clickedTab) clickedTab.classList.add('active');
        if (event && event.target) event.target.classList.add('active');

        var descContent = document.getElementById('description-content');
        var solContent = document.getElementById('solutions-content');
        var vizContent = document.getElementById('visualization-content');

        if (descContent) descContent.style.display = 'none';
        if (solContent) solContent.style.display = 'none';
        if (vizContent) vizContent.style.display = 'none';

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
        }
    };

    function loadSolutions() {
        if (!currentProblem) return;
        var solContent = document.getElementById('solutions-content');
        if (!solContent) return;

        solContent.innerHTML = '<div style="color:#888;padding:1rem;">Loading solutions...</div>';

        // Try to load Python solution
        fetch('/problems/200-must-solve/' + currentProblem.category + '/' + currentProblem.id + '/python_code.py')
            .then(function(r) { return r.ok ? r.text() : null; })
            .then(function(pythonCode) {
                var html = '<h3 style="color:white;margin-bottom:1rem;">Python Solution</h3>';
                if (pythonCode) {
                    html += '<pre style="background:#1e1e1e;padding:1rem;border-radius:8px;overflow-x:auto;"><code class="language-python">' + escapeHtml(pythonCode) + '</code></pre>';
                } else {
                    html += '<p>No Python solution available.</p>';
                }
                solContent.innerHTML = html;

                if (typeof hljs !== 'undefined') {
                    solContent.querySelectorAll('pre code').forEach(function(block) {
                        hljs.highlightElement(block);
                    });
                }
            });
    }

    function loadVisualization() {
        if (!currentProblem) return;
        var vizContent = document.getElementById('visualization-content');
        if (!vizContent) return;

        // Generate visualization based on problem type
        var category = currentProblem.category;
        var html = '<div style="padding:1rem;">';

        if (category === 'arrays') {
            html += generateArrayVisualization();
        } else if (category === 'binary-trees' || category === 'binary-search-trees') {
            html += generateTreeVisualization();
        } else if (category === 'graphs') {
            html += generateGraphVisualization();
        } else if (category === 'dynamic-programming') {
            html += generateDPVisualization();
        } else if (category === 'linked-lists') {
            html += generateLinkedListVisualization();
        } else {
            html += '<p style="color:#888;">Visualization for this problem type coming soon...</p>';
        }

        html += '</div>';
        vizContent.innerHTML = html;
    }

    function generateArrayVisualization() {
        return '<h3 style="color:white;margin-bottom:1rem;">Array Visualization</h3>' +
            '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1rem;">' +
            [5, 2, 8, 1, 9, 3, 7, 4, 6].map(function(n, i) {
                return '<div style="width:50px;height:50px;background:linear-gradient(135deg,#667eea,#764ba2);color:white;display:flex;align-items:center;justify-content:center;border-radius:8px;font-weight:bold;animation:fadeIn 0.3s ease ' + (i * 0.1) + 's both;">' + n + '</div>';
            }).join('') +
            '</div>' +
            '<p style="color:#d4d4d4;">Click elements to see sorting/searching animations.</p>' +
            '<style>@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}</style>';
    }

    function generateTreeVisualization() {
        return '<h3 style="color:white;margin-bottom:1rem;">Binary Tree Visualization</h3>' +
            '<svg viewBox="0 0 400 200" style="width:100%;max-width:400px;">' +
            '<circle cx="200" cy="30" r="20" fill="#667eea"/><text x="200" y="35" fill="white" text-anchor="middle" font-weight="bold">8</text>' +
            '<line x1="200" y1="50" x2="120" y2="80" stroke="#667eea" stroke-width="2"/>' +
            '<line x1="200" y1="50" x2="280" y2="80" stroke="#667eea" stroke-width="2"/>' +
            '<circle cx="120" cy="100" r="20" fill="#764ba2"/><text x="120" y="105" fill="white" text-anchor="middle" font-weight="bold">4</text>' +
            '<circle cx="280" cy="100" r="20" fill="#764ba2"/><text x="280" y="105" fill="white" text-anchor="middle" font-weight="bold">12</text>' +
            '<line x1="120" y1="120" x2="80" y2="150" stroke="#764ba2" stroke-width="2"/>' +
            '<line x1="120" y1="120" x2="160" y2="150" stroke="#764ba2" stroke-width="2"/>' +
            '<circle cx="80" cy="170" r="20" fill="#28a745"/><text x="80" y="175" fill="white" text-anchor="middle" font-weight="bold">2</text>' +
            '<circle cx="160" cy="170" r="20" fill="#28a745"/><text x="160" y="175" fill="white" text-anchor="middle" font-weight="bold">6</text>' +
            '</svg>';
    }

    function generateGraphVisualization() {
        return '<h3 style="color:white;margin-bottom:1rem;">Graph Visualization</h3>' +
            '<svg viewBox="0 0 400 300" style="width:100%;max-width:400px;">' +
            '<line x1="100" y1="50" x2="200" y2="100" stroke="#667eea" stroke-width="2"/>' +
            '<line x1="200" y1="100" x2="300" y2="50" stroke="#667eea" stroke-width="2"/>' +
            '<line x1="100" y1="50" x2="50" y2="150" stroke="#667eea" stroke-width="2"/>' +
            '<line x1="200" y1="100" x2="200" y2="200" stroke="#667eea" stroke-width="2"/>' +
            '<line x1="300" y1="50" x2="350" y2="150" stroke="#667eea" stroke-width="2"/>' +
            '<line x1="50" y1="150" x2="150" y2="250" stroke="#667eea" stroke-width="2"/>' +
            '<line x1="200" y1="200" x2="150" y2="250" stroke="#667eea" stroke-width="2"/>' +
            '<line x1="200" y1="200" x2="250" y2="250" stroke="#667eea" stroke-width="2"/>' +
            '<line x1="350" y1="150" x2="250" y2="250" stroke="#667eea" stroke-width="2"/>' +
            '<circle cx="100" cy="50" r="20" fill="#667eea"/><text x="100" y="55" fill="white" text-anchor="middle" font-weight="bold">A</text>' +
            '<circle cx="200" cy="100" r="20" fill="#667eea"/><text x="200" y="105" fill="white" text-anchor="middle" font-weight="bold">B</text>' +
            '<circle cx="300" cy="50" r="20" fill="#667eea"/><text x="300" y="55" fill="white" text-anchor="middle" font-weight="bold">C</text>' +
            '<circle cx="50" cy="150" r="20" fill="#764ba2"/><text x="50" y="155" fill="white" text-anchor="middle" font-weight="bold">D</text>' +
            '<circle cx="200" cy="200" r="20" fill="#764ba2"/><text x="200" y="205" fill="white" text-anchor="middle" font-weight="bold">E</text>' +
            '<circle cx="350" cy="150" r="20" fill="#764ba2"/><text x="350" y="155" fill="white" text-anchor="middle" font-weight="bold">F</text>' +
            '<circle cx="150" cy="250" r="20" fill="#28a745"/><text x="150" y="255" fill="white" text-anchor="middle" font-weight="bold">G</text>' +
            '<circle cx="250" cy="250" r="20" fill="#28a745"/><text x="250" y="255" fill="white" text-anchor="middle" font-weight="bold">H</text>' +
            '</svg>';
    }

    function generateDPVisualization() {
        return '<h3 style="color:white;margin-bottom:1rem;">DP Table Visualization</h3>' +
            '<table style="border-collapse:collapse;margin:15px 0;">' +
            '<tr><th style="border:1px solid #555;padding:12px;background:#333;color:#fff;">i\\j</th>' +
            [0,1,2,3,4].map(function(j) { return '<th style="border:1px solid #555;padding:12px;background:#333;color:#fff;">' + j + '</th>'; }).join('') +
            '</tr>' +
            [0,1,2,3].map(function(i) {
                return '<tr><td style="border:1px solid #555;padding:12px;background:#333;color:#fff;font-weight:bold;">' + i + '</td>' +
                    [0,1,2,3,4].map(function(j) {
                        var val = Math.min(i, j);
                        var bg = val === 0 ? '#d4edda' : (val === i ? '#cce5ff' : '#f8f9fa');
                        return '<td style="border:1px solid #555;padding:12px;background:' + bg + ';color:#333;text-align:center;">' + val + '</td>';
                    }).join('') +
                '</tr>';
            }).join('') +
            '</table>' +
            '<p style="color:#d4d4d4;">Green = Base case, Blue = Current cell being computed</p>';
    }

    function generateLinkedListVisualization() {
        return '<h3 style="color:white;margin-bottom:1rem;">Linked List Visualization</h3>' +
            '<div style="display:flex;align-items:center;gap:0;overflow-x:auto;padding:1rem 0;">' +
            [1, 2, 3, 4, 5].map(function(n, i) {
                return '<div style="display:flex;align-items:center;">' +
                    '<div style="width:60px;height:40px;background:linear-gradient(135deg,#667eea,#764ba2);color:white;display:flex;align-items:center;justify-content:center;border-radius:8px;font-weight:bold;">' + n + '</div>' +
                    (i < 4 ? '<div style="width:30px;height:2px;background:#667eea;position:relative;"><div style="position:absolute;right:-5px;top:-4px;border:5px solid transparent;border-left:8px solid #667eea;"></div></div>' : '') +
                '</div>';
            }).join('') +
            '<div style="padding:0 10px;color:#28a745;font-weight:bold;">NULL</div>' +
            '</div>';
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        console.log('200 Problems UI initialized with ' + Object.keys(problemsData).length + ' categories');
    });
})();
