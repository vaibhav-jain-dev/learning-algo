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
            { id: '08-same-bsts', name: 'Same BSTs', difficulty: 'hard', tags: ['BST'] },
            { id: '09-right-smaller-than', name: 'Right Smaller Than', difficulty: 'hard', tags: ['BST'] },
            { id: '10-range-sum-bst', name: 'Range Sum of BST', difficulty: 'medium', tags: ['BST', 'DFS'] },
            { id: '11-bst-iterator', name: 'BST Iterator', difficulty: 'medium', tags: ['BST', 'Stack'] }
        ],
        'binary-trees': [
            { id: '01-branch-sums', name: 'Branch Sums', difficulty: 'easy', tags: ['DFS'] },
            { id: '02-node-depths', name: 'Node Depths', difficulty: 'easy', tags: ['DFS'] },
            { id: '03-invert-tree', name: 'Invert Binary Tree', difficulty: 'easy', tags: ['DFS'] },
            { id: '04-binary-tree-diameter', name: 'Binary Tree Diameter', difficulty: 'medium', tags: ['DFS'] },
            { id: '05-find-successor', name: 'Find Successor', difficulty: 'medium', tags: ['DFS'] },
            { id: '06-height-balanced', name: 'Height Balanced Binary Tree', difficulty: 'medium', tags: ['DFS'] },
            { id: '07-max-path-sum', name: 'Max Path Sum', difficulty: 'hard', tags: ['DFS'] },
            { id: '08-flatten-tree', name: 'Flatten Binary Tree', difficulty: 'hard', tags: ['DFS'] },
            { id: '09-right-sibling-tree', name: 'Right Sibling Tree', difficulty: 'hard', tags: ['DFS'] },
            { id: '10-all-kinds-node-depths', name: 'All Kinds of Node Depths', difficulty: 'very-hard', tags: ['DFS'] },
            { id: '11-compare-leaf-traversal', name: 'Compare Leaf Traversal', difficulty: 'very-hard', tags: ['DFS'] },
            { id: '12-merge-binary-trees', name: 'Merge Binary Trees', difficulty: 'medium', tags: ['DFS'] },
            { id: '13-symmetrical-tree', name: 'Symmetrical Tree', difficulty: 'medium', tags: ['DFS'] }
        ],
        'dynamic-programming': [
            { id: '01-max-subset-sum', name: 'Max Subset Sum No Adjacent', difficulty: 'medium', tags: ['DP'] },
            { id: '02-number-of-ways-to-make-change', name: 'Number of Ways to Make Change', difficulty: 'medium', tags: ['DP'] },
            { id: '03-min-coins', name: 'Min Number of Coins for Change', difficulty: 'medium', tags: ['DP'] },
            { id: '04-levenshtein-distance', name: 'Levenshtein Distance', difficulty: 'medium', tags: ['DP'] },
            { id: '05-max-sum-increasing', name: 'Max Sum Increasing Subsequence', difficulty: 'hard', tags: ['DP'] },
            { id: '06-longest-common-subseq', name: 'Longest Common Subsequence', difficulty: 'hard', tags: ['DP'] },
            { id: '07-knapsack', name: 'Knapsack Problem', difficulty: 'hard', tags: ['DP'] },
            { id: '08-disk-stacking', name: 'Disk Stacking', difficulty: 'hard', tags: ['DP'] },
            { id: '09-numbers-in-pi', name: 'Numbers in Pi', difficulty: 'hard', tags: ['DP'] },
            { id: '10-max-profit-k-transactions', name: 'Max Profit with K Transactions', difficulty: 'very-hard', tags: ['DP'] },
            { id: '11-palindrome-partitioning', name: 'Palindrome Partitioning Min Cuts', difficulty: 'very-hard', tags: ['DP'] },
            { id: '12-longest-increasing-subseq', name: 'Longest Increasing Subsequence', difficulty: 'hard', tags: ['DP'] },
            { id: '13-max-sum-submatrix', name: 'Max Sum Submatrix', difficulty: 'very-hard', tags: ['DP'] },
            { id: '14-longest-string-chain', name: 'Longest String Chain', difficulty: 'hard', tags: ['DP', 'Hash Map'] },
            { id: '15-square-of-zeroes', name: 'Square of Zeroes', difficulty: 'very-hard', tags: ['DP'] }
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
            { id: '04-sum-of-linked-lists', name: 'Sum of Linked Lists', difficulty: 'medium', tags: ['Linked List'] },
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
            { id: '05-phone-mnemonics', name: 'Phone Number Mnemonics', difficulty: 'medium', tags: ['Recursion'] },
            { id: '06-staircase-traversal', name: 'Staircase Traversal', difficulty: 'medium', tags: ['Recursion', 'DP'] },
            { id: '07-generate-divtags', name: 'Generate Div Tags', difficulty: 'hard', tags: ['Recursion'] },
            { id: '08-solve-sudoku', name: 'Solve Sudoku', difficulty: 'hard', tags: ['Backtracking'] },
            { id: '09-ambiguous-measurements', name: 'Ambiguous Measurements', difficulty: 'hard', tags: ['Recursion'] },
            { id: '10-interweaving-strings', name: 'Interweaving Strings', difficulty: 'hard', tags: ['Recursion', 'DP'] },
            { id: '11-number-of-bst', name: 'Number of Binary Search Trees', difficulty: 'hard', tags: ['Recursion', 'DP'] }
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

    window.openProblem = function(category, problemId, similarIdx, section) {
        // Reset visualization state completely when opening a new problem
        if (vizState.intervalId) {
            clearInterval(vizState.intervalId);
            vizState.intervalId = null;
        }
        vizState.isPlaying = false;
        vizState.currentStep = 0;
        vizState.steps = [];
        vizState.totalSteps = 0;
        vizState.currentProblemKey = null;  // Clear the problem key to force re-init

        // Clear visualization content immediately
        var vizContent = document.getElementById('visualization-content');
        if (vizContent) vizContent.innerHTML = '<p style="color:#888;padding:1rem;">Loading visualization...</p>';

        currentProblem = { category: category, id: problemId, similarIdx: similarIdx || null };
        var editorView = document.getElementById('editor-view');

        // Update URL with history API
        var urlPath = '/200-problems/' + problemId;
        var urlParams = new URLSearchParams();
        urlParams.set('category', category);
        if (similarIdx) urlParams.set('similar', similarIdx);
        if (section) urlParams.set('section', section);
        var newUrl = urlPath + '?' + urlParams.toString();
        history.pushState({ category: category, problemId: problemId, similarIdx: similarIdx }, '', newUrl);

        // Build the correct path for the problem
        var basePath = '/htmx/200-problem-content/' + category + '/' + problemId;
        if (similarIdx) {
            basePath += '/similar/' + similarIdx;
        }

        // Load problem content from backend
        fetch(basePath)
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

        // Load code files (with similar problem support)
        loadProblemCode(category, problemId, similarIdx);

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

        // If section specified, switch to that tab
        if (section) {
            window.showDescTab(section);
        }
    };

    window.hideEditor = function() {
        var editorView = document.getElementById('editor-view');
        if (editorView) editorView.classList.remove('active');
        currentProblem = null;
    };

    function loadProblemCode(category, problemId, similarIdx) {
        // Build base path (supports similar problems)
        var basePath = '/problems/200-must-solve/' + category + '/' + problemId;
        if (similarIdx) {
            basePath += '/similar/' + similarIdx;
        }

        // Load Python code
        fetch(basePath + '/python_code.py')
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
        fetch(basePath + '/golang_code.go')
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
        var codePanel = document.querySelector('.code-panel');
        var descPanel = document.querySelector('.description-panel');
        var editorLayout = document.querySelector('.editor-layout');

        if (descContent) descContent.style.display = 'none';
        if (solContent) solContent.style.display = 'none';
        if (vizContent) vizContent.style.display = 'none';

        // Update URL with section parameter
        if (currentProblem) {
            var url = new URL(window.location);
            url.searchParams.set('section', tab);
            history.replaceState(history.state, '', url.toString());
        }

        if (tab === 'problem' && descContent) {
            descContent.style.display = 'block';
            // Show code panel, restore split layout
            if (codePanel) codePanel.style.display = 'flex';
            if (editorLayout) editorLayout.style.gridTemplateColumns = '1fr 1fr';
        } else if (tab === 'solutions' && solContent) {
            solContent.style.display = 'block';
            loadSolutions();
            // Show code panel, restore split layout
            if (codePanel) codePanel.style.display = 'flex';
            if (editorLayout) editorLayout.style.gridTemplateColumns = '1fr 1fr';
        } else if (tab === 'visualize' && vizContent) {
            vizContent.style.display = 'block';
            loadVisualization();
            // Hide code panel, make visualization full width
            if (codePanel) codePanel.style.display = 'none';
            if (editorLayout) editorLayout.style.gridTemplateColumns = '1fr';
        } else if (tab === 'hints' && descContent) {
            descContent.style.display = 'block';
            // Show code panel, restore split layout
            if (codePanel) codePanel.style.display = 'flex';
            if (editorLayout) editorLayout.style.gridTemplateColumns = '1fr 1fr';
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

    // ============================================
    // VISUALIZATION SYSTEM
    // ============================================
    var vizState = {
        isPlaying: false,
        currentStep: 0,
        totalSteps: 10,
        speed: 1000,
        intervalId: null,
        steps: [],
        currentProblemKey: null  // Track which problem visualization is loaded for
    };

    function loadVisualization() {
        if (!currentProblem) return;
        var vizContent = document.getElementById('visualization-content');
        if (!vizContent) return;

        var category = currentProblem.category;
        var problemId = currentProblem.id;
        var problemKey = category + '/' + problemId + (currentProblem.similarIdx || '');

        // Always stop any running animation
        if (vizState.intervalId) {
            clearInterval(vizState.intervalId);
            vizState.intervalId = null;
        }

        // Force complete reset of visualization state
        vizState.isPlaying = false;
        vizState.currentStep = 0;
        vizState.steps = [];
        vizState.totalSteps = 0;
        vizState.currentProblemKey = problemKey;

        // Build the visualization container
        var html = buildVisualizationContainer(category, problemId);
        vizContent.innerHTML = html;

        // Initialize the visualization with fresh data
        initializeVisualization(category, problemId);
    }

    function buildVisualizationContainer(category, problemId) {
        var animType = getAnimationType(category, problemId);

        return '<div style="background:#0d1117;border-radius:12px;padding:1.5rem;color:#c9d1d9;">' +
            // Header
            '<h3 style="color:#58a6ff;margin:0 0 1rem 0;display:flex;align-items:center;gap:0.5rem;">' +
            '<span style="font-size:1.2rem;">🎯</span> Algorithm Visualization</h3>' +

            // Animation Type Badge
            '<div style="background:#161b22;border-left:3px solid #f0883e;padding:0.75rem 1rem;margin-bottom:1rem;border-radius:0 8px 8px 0;">' +
            '<span style="color:#8b949e;">Animation Type:</span> <span style="color:#f0883e;font-weight:600;">' + animType + '</span></div>' +

            // Controls
            '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap;">' +
            '<button onclick="window.vizPlay()" id="viz-play-btn" style="background:#238636;color:white;border:none;padding:0.6rem 1.2rem;border-radius:6px;cursor:pointer;font-weight:600;display:flex;align-items:center;gap:0.5rem;"><span>▶</span> Play</button>' +
            '<button onclick="window.vizPause()" id="viz-pause-btn" style="background:#6e7681;color:white;border:none;padding:0.6rem 1.2rem;border-radius:6px;cursor:pointer;font-weight:600;display:flex;align-items:center;gap:0.5rem;"><span>⏸</span> Pause</button>' +
            '<button onclick="window.vizReset()" style="background:#21262d;color:#c9d1d9;border:1px solid #30363d;padding:0.6rem 1.2rem;border-radius:6px;cursor:pointer;font-weight:600;display:flex;align-items:center;gap:0.5rem;"><span>↻</span> Reset</button>' +
            '<button onclick="window.vizStepBack()" style="background:#21262d;color:#c9d1d9;border:1px solid #30363d;padding:0.6rem 1rem;border-radius:6px;cursor:pointer;font-weight:600;">◀ Prev</button>' +
            '<button onclick="window.vizStepForward()" style="background:#21262d;color:#c9d1d9;border:1px solid #30363d;padding:0.6rem 1rem;border-radius:6px;cursor:pointer;font-weight:600;">Next ▶</button>' +
            '<div style="display:flex;align-items:center;gap:0.5rem;margin-left:auto;">' +
            '<span style="color:#8b949e;">Speed:</span>' +
            '<input type="range" id="viz-speed" min="100" max="2000" value="1000" style="width:120px;accent-color:#58a6ff;" onchange="window.vizSetSpeed(this.value)">' +
            '</div></div>' +

            // Visualization Area (scrollable)
            '<div id="viz-main-area" style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:1.5rem;min-height:200px;max-height:400px;overflow-y:auto;margin-bottom:1rem;"></div>' +

            // Status Line
            '<div id="viz-status" style="color:#8b949e;margin-bottom:1rem;font-family:monospace;"></div>' +

            // Progress Bar
            '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">' +
            '<div style="flex:1;background:#21262d;border-radius:4px;height:8px;overflow:hidden;">' +
            '<div id="viz-progress-bar" style="width:0%;height:100%;background:linear-gradient(90deg,#238636,#58a6ff);transition:width 0.3s;"></div></div>' +
            '<span id="viz-step-counter" style="color:#58a6ff;font-weight:600;min-width:80px;text-align:right;">Step 0 / 0</span></div>' +

            '</div>' +

            // Step-by-Step Explanation Section
            '<div style="background:#0d1117;border-radius:12px;padding:1.5rem;color:#c9d1d9;margin-top:1.5rem;">' +
            '<h3 style="color:#3fb950;margin:0 0 1rem 0;display:flex;align-items:center;gap:0.5rem;">' +
            '<span style="font-size:1.2rem;">📝</span> Step-by-Step Explanation</h3>' +
            '<div id="viz-explanation" style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:1rem;max-height:300px;overflow-y:auto;"></div>' +
            '</div>' +

            // Call Stack Section
            '<div style="background:#0d1117;border-radius:12px;padding:1.5rem;color:#c9d1d9;margin-top:1.5rem;">' +
            '<h3 style="color:#f0883e;margin:0 0 1rem 0;display:flex;align-items:center;gap:0.5rem;">' +
            '<span style="font-size:1.2rem;">📚</span> Call Stack</h3>' +
            '<div id="viz-call-stack" style="display:flex;flex-direction:column;gap:0.5rem;"></div>' +
            '</div>';
    }

    function getAnimationType(category, problemId) {
        // Problem-specific types (check these first before generic category)
        if (problemId) {
            if (problemId.includes('topological')) return 'topological-sort';
            if (problemId.includes('dijkstra')) return 'shortest-path';
            if (problemId.includes('bfs') || problemId.includes('breadth')) return 'bfs';
            if (problemId.includes('dfs') || problemId.includes('depth')) return 'dfs';
            if (problemId.includes('fibonacci')) return 'memoization';
            if (problemId.includes('binary-search') && !problemId.includes('tree')) return 'binary-search';
        }

        var types = {
            'arrays': 'array-traversal',
            'binary-search-trees': 'tree-traversal',
            'binary-trees': 'tree-traversal',
            'graphs': 'graph-search',
            'dynamic-programming': 'dp-table',
            'linked-lists': 'pointer-manipulation',
            'recursion': 'recursion-tree',
            'famous-algorithms': 'algorithm-specific'
        };

        return types[category] || 'step-by-step';
    }

    function initializeVisualization(category, problemId) {
        // Clear any existing state completely
        vizState.steps = [];
        vizState.currentStep = 0;
        vizState.totalSteps = 0;

        // Generate steps based on problem type (use problemId for specificity)
        vizState.steps = generateSteps(category, problemId);
        vizState.totalSteps = vizState.steps.length;
        vizState.currentStep = 0;

        updateVisualization();
        updateCallStack();
    }

    function generateSteps(category, problemId) {
        // Check problemId first for specific algorithm visualizations
        if (problemId) {
            if (problemId.includes('topological')) return generateTopologicalSortSteps();
            if (problemId.includes('dijkstra')) return generateDijkstraSteps();
        }

        // Fall back to category-based generation
        if (category === 'graphs' || category === 'famous-algorithms') {
            return generateGraphSteps(problemId);
        } else if (category === 'arrays') {
            return generateArraySteps(problemId);
        } else if (category === 'binary-trees' || category === 'binary-search-trees') {
            return generateTreeSteps(problemId);
        } else if (category === 'dynamic-programming') {
            return generateDPSteps(problemId);
        } else if (category === 'linked-lists') {
            return generateLinkedListSteps(problemId);
        } else if (category === 'recursion') {
            return generateRecursionSteps(problemId);
        }
        return generateGenericSteps();
    }

    function generateTopologicalSortSteps() {
        // Topological Sort using Kahn's Algorithm (BFS-based)
        return [
            {
                nodes: {A:0, B:0, C:1, D:2, E:1},
                edges: [['A','C'],['B','C'],['B','D'],['C','E'],['D','E']],
                queue: ['A', 'B'],
                result: [],
                current: null,
                action: 'Calculate in-degrees, find nodes with 0 in-degree',
                explanation: '📊 <strong>Step 1: Initialize</strong><br><br>' +
                    '• Calculate in-degree for each node<br>' +
                    '• A: 0 (no incoming edges)<br>' +
                    '• B: 0 (no incoming edges)<br>' +
                    '• C: 2 (from A, B)<br>' +
                    '• D: 1 (from B)<br>' +
                    '• E: 2 (from C, D)<br>' +
                    '• <span style="color:#3fb950;">Queue nodes with in-degree 0: [A, B]</span><br><br>' +
                    '<strong style="color:#58a6ff;">Python (Kahn\'s Algorithm):</strong><br>' +
                    '<code style="color:#c9d1d9;background:#21262d;padding:0.5rem;display:block;border-radius:4px;margin-top:0.5rem;">' +
                    'from collections import deque, defaultdict<br><br>' +
                    'def topological_sort(graph):<br>' +
                    '&nbsp;&nbsp;in_degree = defaultdict(int)<br>' +
                    '&nbsp;&nbsp;for node in graph:<br>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;for neighbor in graph[node]:<br>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in_degree[neighbor] += 1<br>' +
                    '&nbsp;&nbsp;# Start with nodes having 0 in-degree<br>' +
                    '&nbsp;&nbsp;queue = deque([n for n in graph if in_degree[n] == 0])</code>'
            },
            {
                nodes: {A:0, B:0, C:0, D:2, E:1},
                edges: [['B','C'],['B','D'],['C','E'],['D','E']],
                queue: ['B', 'C'],
                result: ['A'],
                current: 'A',
                action: 'Process A, reduce in-degrees of neighbors',
                explanation: '➡️ <strong>Step 2: Process A</strong><br><br>' +
                    '• Dequeue <span style="color:#3fb950;">A</span><br>' +
                    '• Add A to result: [A]<br>' +
                    '• Reduce in-degree of C (A→C edge)<br>' +
                    '• C in-degree: 2→1<br>' +
                    '• Queue: [B, C]'
            },
            {
                nodes: {A:0, B:0, C:0, D:1, E:1},
                edges: [['C','E'],['D','E']],
                queue: ['C', 'D'],
                result: ['A', 'B'],
                current: 'B',
                action: 'Process B, reduce in-degrees of C and D',
                explanation: '➡️ <strong>Step 3: Process B</strong><br><br>' +
                    '• Dequeue <span style="color:#3fb950;">B</span><br>' +
                    '• Add B to result: [A, B]<br>' +
                    '• Reduce in-degree of C (B→C): 1→0 ✓<br>' +
                    '• Reduce in-degree of D (B→D): 2→1<br>' +
                    '• C now has in-degree 0, add to queue<br>' +
                    '• Queue: [C, D]'
            },
            {
                nodes: {A:0, B:0, C:0, D:1, E:0},
                edges: [['D','E']],
                queue: ['D', 'E'],
                result: ['A', 'B', 'C'],
                current: 'C',
                action: 'Process C, reduce in-degree of E',
                explanation: '➡️ <strong>Step 4: Process C</strong><br><br>' +
                    '• Dequeue <span style="color:#3fb950;">C</span><br>' +
                    '• Add C to result: [A, B, C]<br>' +
                    '• Reduce in-degree of E (C→E): 2→1<br>' +
                    '• Queue: [D]'
            },
            {
                nodes: {A:0, B:0, C:0, D:0, E:0},
                edges: [],
                queue: ['E'],
                result: ['A', 'B', 'C', 'D'],
                current: 'D',
                action: 'Process D, reduce in-degree of E',
                explanation: '➡️ <strong>Step 5: Process D</strong><br><br>' +
                    '• Dequeue <span style="color:#3fb950;">D</span><br>' +
                    '• Add D to result: [A, B, C, D]<br>' +
                    '• Reduce in-degree of E (D→E): 1→0 ✓<br>' +
                    '• E now has in-degree 0, add to queue<br>' +
                    '• Queue: [E]'
            },
            {
                nodes: {A:0, B:0, C:0, D:0, E:0},
                edges: [],
                queue: [],
                result: ['A', 'B', 'C', 'D', 'E'],
                current: 'E',
                action: 'Process E - Complete!',
                explanation: '✅ <strong>Step 6: Complete!</strong><br><br>' +
                    '• Dequeue <span style="color:#3fb950;">E</span><br>' +
                    '• Add E to result: [A, B, C, D, E]<br>' +
                    '• Queue empty - done!<br><br>' +
                    '• <strong>Topological Order: A → B → C → D → E</strong><br>' +
                    '• All dependencies satisfied!<br><br>' +
                    '<strong style="color:#f0883e;">Go (Kahn\'s Algorithm):</strong><br>' +
                    '<code style="color:#c9d1d9;background:#21262d;padding:0.5rem;display:block;border-radius:4px;margin-top:0.5rem;">' +
                    'func topoSort(graph map[string][]string) []string {<br>' +
                    '&nbsp;&nbsp;inDegree := make(map[string]int)<br>' +
                    '&nbsp;&nbsp;for _, neighbors := range graph {<br>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;for _, n := range neighbors {<br>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;inDegree[n]++<br>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;}<br>' +
                    '&nbsp;&nbsp;}<br>' +
                    '&nbsp;&nbsp;var queue, result []string<br>' +
                    '&nbsp;&nbsp;for node := range graph {<br>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;if inDegree[node] == 0 {<br>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;queue = append(queue, node)<br>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;}<br>' +
                    '&nbsp;&nbsp;}<br>' +
                    '&nbsp;&nbsp;// Process queue...<br>' +
                    '}</code>'
            }
        ];
    }

    function generateDijkstraSteps() {
        return generateGraphSteps('dijkstra');
    }

    function generateArraySteps(problemId) {
        var arr = [3, 5, -4, 8, 11, 1, -1, 6];
        var target = 10;
        var steps = [];
        var hashSet = [];

        for (var i = 0; i < arr.length; i++) {
            var need = target - arr[i];
            var found = hashSet.indexOf(need) !== -1;
            steps.push({
                array: arr.slice(),
                currentIndex: i,
                hashTable: hashSet.slice(),
                checking: arr[i],
                need: need,
                found: found,
                status: found ? 'Found pair: ' + arr[i] + ' + ' + need + ' = ' + target : 'Need: ' + need + '. Found: NO',
                explanation: found ?
                    '✅ <strong>SUCCESS!</strong> We found the complement!<br><br>' +
                    '• Current element: <span style="color:#3fb950;">' + arr[i] + '</span><br>' +
                    '• We need: <span style="color:#f0883e;">' + need + '</span> to reach target ' + target + '<br>' +
                    '• Hash table contains ' + need + '!<br>' +
                    '• <strong>Pair found:</strong> ' + arr[i] + ' + ' + need + ' = ' + target + '<br><br>' +
                    '<strong style="color:#58a6ff;">Python (idiomatic):</strong><br>' +
                    '<code style="color:#c9d1d9;background:#21262d;padding:0.5rem;display:block;border-radius:4px;margin-top:0.5rem;">' +
                    'for i, num in enumerate(arr):<br>' +
                    '&nbsp;&nbsp;complement = target - num<br>' +
                    '&nbsp;&nbsp;if complement in seen:  # O(1) lookup<br>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;return [complement, num]<br>' +
                    '&nbsp;&nbsp;seen.add(num)</code>' :
                    '🔍 <strong>Step ' + (i + 1) + ':</strong> Checking element at index ' + i + '<br><br>' +
                    '• Current element: <span style="color:#3fb950;">' + arr[i] + '</span><br>' +
                    '• Target sum: ' + target + '<br>' +
                    '• Complement needed: ' + target + ' - ' + arr[i] + ' = <span style="color:#f0883e;">' + need + '</span><br>' +
                    '• Is ' + need + ' in hash table? <span style="color:#da3633;">NO</span><br>' +
                    '• Action: Add ' + arr[i] + ' to hash table<br>' +
                    '• Hash table now: {' + hashSet.concat([arr[i]]).join(', ') + '}<br><br>' +
                    '<strong style="color:#58a6ff;">Python:</strong> <code style="color:#3fb950;">for i, num in enumerate(arr):</code><br>' +
                    '<strong style="color:#f0883e;">Go:</strong> <code style="color:#3fb950;">for i, num := range arr</code>'
            });
            if (found) break;
            hashSet.push(arr[i]);
        }
        return steps;
    }

    function generateTreeSteps(problemId) {
        return [
            { nodes: [{id:1,val:10,x:200,y:30,active:true}], visited: [10], action: 'Visit root: 10',
              explanation: '🌳 <strong>Step 1: Start at Root</strong><br><br>' +
                '• Begin DFS traversal at root node<br>' +
                '• Current node: <span style="color:#3fb950;">10</span><br>' +
                '• In BST, root is the entry point for all operations<br>' +
                '• Visited: [10]' },
            { nodes: [{id:1,val:10,x:200,y:30},{id:2,val:5,x:120,y:100,active:true}], visited: [10,5], action: 'Visit left: 5',
              explanation: '⬅️ <strong>Step 2: Go Left</strong><br><br>' +
                '• From node 10, move to left child<br>' +
                '• Current node: <span style="color:#3fb950;">5</span><br>' +
                '• Left subtree contains smaller values (BST property)<br>' +
                '• Visited: [10, 5]' },
            { nodes: [{id:1,val:10,x:200,y:30},{id:2,val:5,x:120,y:100},{id:3,val:2,x:70,y:170,active:true}], visited: [10,5,2], action: 'Visit left: 2',
              explanation: '⬅️ <strong>Step 3: Continue Left</strong><br><br>' +
                '• From node 5, move to left child<br>' +
                '• Current node: <span style="color:#3fb950;">2</span><br>' +
                '• This is a leaf node (no children)<br>' +
                '• Visited: [10, 5, 2]' },
            { nodes: [{id:1,val:10,x:200,y:30},{id:2,val:5,x:120,y:100},{id:3,val:2,x:70,y:170},{id:4,val:7,x:170,y:170,active:true}], visited: [10,5,2,7], action: 'Backtrack, visit right: 7',
              explanation: '↩️ <strong>Step 4: Backtrack & Go Right</strong><br><br>' +
                '• Node 2 is complete, backtrack to node 5<br>' +
                '• Visit right child of node 5<br>' +
                '• Current node: <span style="color:#3fb950;">7</span><br>' +
                '• Visited: [10, 5, 2, 7]' },
            { nodes: [{id:1,val:10,x:200,y:30},{id:2,val:5,x:120,y:100},{id:5,val:15,x:280,y:100,active:true}], visited: [10,5,2,7,15], action: 'Backtrack to root, visit right: 15',
              explanation: '↩️ <strong>Step 5: Back to Root, Go Right</strong><br><br>' +
                '• Left subtree complete, backtrack to root<br>' +
                '• Now explore right subtree<br>' +
                '• Current node: <span style="color:#3fb950;">15</span><br>' +
                '• Right subtree contains larger values<br>' +
                '• Visited: [10, 5, 2, 7, 15]' },
            { nodes: [{id:1,val:10,x:200,y:30},{id:5,val:15,x:280,y:100},{id:6,val:13,x:230,y:170,active:true}], visited: [10,5,2,7,15,13], action: 'Visit left: 13',
              explanation: '⬅️ <strong>Step 6: Go Left from 15</strong><br><br>' +
                '• From node 15, visit left child<br>' +
                '• Current node: <span style="color:#3fb950;">13</span><br>' +
                '• 13 < 15, so it is correctly placed as left child<br>' +
                '• Visited: [10, 5, 2, 7, 15, 13]' },
            { nodes: [{id:1,val:10,x:200,y:30},{id:5,val:15,x:280,y:100},{id:7,val:20,x:330,y:170,active:true}], visited: [10,5,2,7,15,13,20], action: 'Backtrack, visit right: 20',
              explanation: '✅ <strong>Step 7: Complete Traversal</strong><br><br>' +
                '• Backtrack and visit right child of 15<br>' +
                '• Current node: <span style="color:#3fb950;">20</span><br>' +
                '• This completes the DFS traversal<br>' +
                '• <strong>Final order:</strong> [10, 5, 2, 7, 15, 13, 20]' }
        ];
    }

    function generateDPSteps(problemId) {
        // LCS or similar DP problem
        var str1 = 'ABCD';
        var str2 = 'AEBD';
        var m = str1.length;
        var n = str2.length;
        var steps = [];
        var dp = [];

        // Initialize DP table
        for (var i = 0; i <= m; i++) {
            dp[i] = [];
            for (var j = 0; j <= n; j++) {
                dp[i][j] = 0;
            }
        }

        steps.push({ table: JSON.parse(JSON.stringify(dp)), row: 0, col: 0, action: 'Initialize DP table with zeros' });

        for (var i = 1; i <= m; i++) {
            for (var j = 1; j <= n; j++) {
                if (str1[i-1] === str2[j-1]) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                }
                steps.push({
                    table: JSON.parse(JSON.stringify(dp)),
                    row: i,
                    col: j,
                    char1: str1[i-1],
                    char2: str2[j-1],
                    match: str1[i-1] === str2[j-1],
                    action: str1[i-1] === str2[j-1] ?
                        'Match! dp[' + i + '][' + j + '] = dp[' + (i-1) + '][' + (j-1) + '] + 1 = ' + dp[i][j] :
                        'No match. dp[' + i + '][' + j + '] = max(' + dp[i-1][j] + ', ' + dp[i][j-1] + ') = ' + dp[i][j]
                });
            }
        }
        return steps;
    }

    function generateLinkedListSteps(problemId) {
        return [
            { nodes: [1,2,3,4,5], pointers: {head:0,current:0}, action: 'Initialize: head at node 1',
              explanation: '🔗 <strong>Step 1: Initialize</strong><br><br>' +
                '• Set up head pointer at first node<br>' +
                '• Current: <span style="color:#3fb950;">1</span><br>' +
                '• We will traverse to find node to remove<br><br>' +
                '<strong style="color:#58a6ff;">Python (Node class):</strong><br>' +
                '<code style="color:#c9d1d9;background:#21262d;padding:0.5rem;display:block;border-radius:4px;margin-top:0.5rem;">' +
                'class ListNode:<br>' +
                '&nbsp;&nbsp;def __init__(self, val=0, next=None):<br>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;self.val = val<br>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;self.next = next<br><br>' +
                '# Traverse: use while loop<br>' +
                'curr = head<br>' +
                'while curr:</code>' },
            { nodes: [1,2,3,4,5], pointers: {head:0,current:1,prev:0}, action: 'Move to node 2, save prev',
              explanation: '➡️ <strong>Step 2: Move Forward</strong><br><br>' +
                '• Move current pointer to next node<br>' +
                '• Current: <span style="color:#3fb950;">2</span><br>' +
                '• Previous: <span style="color:#f0883e;">1</span><br>' +
                '• We track prev to reconnect nodes later' },
            { nodes: [1,2,3,4,5], pointers: {head:0,current:2,prev:1}, action: 'Move to node 3',
              explanation: '➡️ <strong>Step 3: Continue Traversal</strong><br><br>' +
                '• Continue moving through list<br>' +
                '• Current: <span style="color:#3fb950;">3</span><br>' +
                '• Previous: <span style="color:#f0883e;">2</span>' },
            { nodes: [1,2,3,4,5], pointers: {head:0,current:3,prev:2}, action: 'Move to node 4',
              explanation: '➡️ <strong>Step 4: Found Target</strong><br><br>' +
                '• Current: <span style="color:#3fb950;">4</span> (target to remove)<br>' +
                '• Previous: <span style="color:#f0883e;">3</span><br>' +
                '• Next step: reconnect prev.next to current.next' },
            { nodes: [1,2,3,4,5], pointers: {head:0,current:4,prev:3}, action: 'Reached node 5 (target)',
              explanation: '🎯 <strong>Step 5: At End</strong><br><br>' +
                '• Reached end of list<br>' +
                '• Current: <span style="color:#3fb950;">5</span><br>' +
                '• Now perform the removal operation' },
            { nodes: [1,2,3,5], pointers: {head:0}, action: 'Remove node 4, link 3→5',
              explanation: '✅ <strong>Step 6: Removal Complete</strong><br><br>' +
                '• Node 4 removed from list<br>' +
                '• Set node 3.next = node 5<br>' +
                '• Final list: <span style="color:#3fb950;">1 → 2 → 3 → 5 → NULL</span><br><br>' +
                '<strong style="color:#58a6ff;">Python:</strong> <code style="color:#3fb950;">prev.next = curr.next</code><br>' +
                '<strong style="color:#f0883e;">Go:</strong><br>' +
                '<code style="color:#c9d1d9;background:#21262d;padding:0.5rem;display:block;border-radius:4px;margin-top:0.5rem;">' +
                'type ListNode struct {<br>' +
                '&nbsp;&nbsp;Val  int<br>' +
                '&nbsp;&nbsp;Next *ListNode<br>' +
                '}<br><br>' +
                '// Remove: prev.Next = curr.Next<br>' +
                'prev.Next = curr.Next</code>' }
        ];
    }

    function generateRecursionSteps(problemId) {
        return [
            { depth: 0, call: 'fib(5)', stack: ['fib(5)'], result: null,
              explanation: '📥 <strong>Step 1: Initial Call</strong><br><br>' +
                '• Call fib(5) - we want the 5th Fibonacci number<br>' +
                '• fib(n) = fib(n-1) + fib(n-2)<br>' +
                '• Stack depth: 0<br>' +
                '• This will recursively call fib(4) and fib(3)<br><br>' +
                '<strong style="color:#58a6ff;">Python (with memoization):</strong><br>' +
                '<code style="color:#c9d1d9;background:#21262d;padding:0.5rem;display:block;border-radius:4px;margin-top:0.5rem;">' +
                'from functools import lru_cache<br><br>' +
                '@lru_cache(maxsize=None)<br>' +
                'def fib(n: int) -> int:<br>' +
                '&nbsp;&nbsp;if n <= 1:<br>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;return n<br>' +
                '&nbsp;&nbsp;return fib(n-1) + fib(n-2)</code>' },
            { depth: 1, call: 'fib(4) + fib(3)', stack: ['fib(5)', 'fib(4)'], result: null,
              explanation: '📥 <strong>Step 2: Recurse on fib(4)</strong><br><br>' +
                '• fib(5) calls fib(4)<br>' +
                '• Stack depth: 1<br>' +
                '• fib(4) = fib(3) + fib(2)<br>' +
                '• Continue recursing...<br><br>' +
                '<strong style="color:#f0883e;">Go (with memo map):</strong><br>' +
                '<code style="color:#c9d1d9;background:#21262d;padding:0.5rem;display:block;border-radius:4px;margin-top:0.5rem;">' +
                'memo := make(map[int]int)<br>' +
                'var fib func(n int) int<br>' +
                'fib = func(n int) int {<br>' +
                '&nbsp;&nbsp;if n <= 1 { return n }<br>' +
                '&nbsp;&nbsp;if v, ok := memo[n]; ok { return v }<br>' +
                '&nbsp;&nbsp;memo[n] = fib(n-1) + fib(n-2)<br>' +
                '&nbsp;&nbsp;return memo[n]<br>' +
                '}</code>' },
            { depth: 2, call: 'fib(3) + fib(2)', stack: ['fib(5)', 'fib(4)', 'fib(3)'], result: null,
              explanation: '📥 <strong>Step 3: Recurse on fib(3)</strong><br><br>' +
                '• fib(4) calls fib(3)<br>' +
                '• Stack depth: 2<br>' +
                '• fib(3) = fib(2) + fib(1)<br>' +
                '• Getting closer to base cases...' },
            { depth: 3, call: 'fib(2) + fib(1)', stack: ['fib(5)', 'fib(4)', 'fib(3)', 'fib(2)'], result: null,
              explanation: '📥 <strong>Step 4: Recurse on fib(2)</strong><br><br>' +
                '• fib(3) calls fib(2)<br>' +
                '• Stack depth: 3 (deepest)<br>' +
                '• fib(2) = fib(1) + fib(0) = 1 + 0 = 1<br>' +
                '• We hit base cases!' },
            { depth: 3, call: 'fib(2) = 1', stack: ['fib(5)', 'fib(4)', 'fib(3)'], result: 1,
              explanation: '📤 <strong>Step 5: Return fib(2) = 1</strong><br><br>' +
                '• Base case reached!<br>' +
                '• fib(2) returns <span style="color:#3fb950;">1</span><br>' +
                '• Pop from stack, return to fib(3)<br>' +
                '• Stack depth: 2' },
            { depth: 2, call: 'fib(3) = 2', stack: ['fib(5)', 'fib(4)'], result: 2, memo: true,
              explanation: '📤 <strong>Step 6: Return fib(3) = 2</strong><br><br>' +
                '• fib(3) = fib(2) + fib(1) = 1 + 1 = <span style="color:#3fb950;">2</span><br>' +
                '• <span style="color:#f0883e;">Memoized!</span> Store result for reuse<br>' +
                '• Return to fib(4)<br>' +
                '• Stack depth: 1<br><br>' +
                '<strong style="color:#58a6ff;">Python:</strong> <code style="color:#3fb950;">memo[3] = 2</code> (auto via @lru_cache)<br>' +
                '<strong style="color:#f0883e;">Go:</strong> <code style="color:#3fb950;">memo[3] = 2</code>' },
            { depth: 1, call: 'fib(4) = 3', stack: ['fib(5)'], result: 3, memo: true,
              explanation: '📤 <strong>Step 7: Return fib(4) = 3</strong><br><br>' +
                '• fib(4) = fib(3) + fib(2) = 2 + 1 = <span style="color:#3fb950;">3</span><br>' +
                '• <span style="color:#f0883e;">Memoized!</span> Store result<br>' +
                '• Return to fib(5)<br>' +
                '• Stack depth: 0' },
            { depth: 0, call: 'fib(5) = 5', stack: [], result: 5, memo: true,
              explanation: '✅ <strong>Step 8: Final Result</strong><br><br>' +
                '• fib(5) = fib(4) + fib(3) = 3 + 2 = <span style="color:#3fb950;">5</span><br>' +
                '• All recursive calls complete<br>' +
                '• Stack empty<br>' +
                '• <strong>Answer: fib(5) = 5</strong><br><br>' +
                '<strong style="color:#58a6ff;">Time Complexity:</strong> O(n) with memoization<br>' +
                '<strong style="color:#f0883e;">Space Complexity:</strong> O(n) for call stack + memo' }
        ];
    }

    function generateGraphSteps(problemId) {
        return [
            { nodes: ['A','B','C','D','E'], edges: [['A','B'],['A','C'],['B','D'],['C','D'],['D','E']], visited: ['A'], current: 'A', queue: ['B','C'], action: 'Start BFS from A',
              explanation: '🚀 <strong>Step 1: Start BFS</strong><br><br>' +
                '• Begin at source node <span style="color:#3fb950;">A</span><br>' +
                '• Mark A as visited<br>' +
                '• Add neighbors to queue: [B, C]<br>' +
                '• BFS explores level by level<br><br>' +
                '<strong style="color:#58a6ff;">Python (using collections.deque):</strong><br>' +
                '<code style="color:#c9d1d9;background:#21262d;padding:0.5rem;display:block;border-radius:4px;margin-top:0.5rem;">' +
                'from collections import deque<br><br>' +
                'def bfs(graph, start):<br>' +
                '&nbsp;&nbsp;visited = set([start])<br>' +
                '&nbsp;&nbsp;queue = deque([start])<br>' +
                '&nbsp;&nbsp;while queue:<br>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;node = queue.popleft()  # O(1)<br>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;for neighbor in graph[node]:<br>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if neighbor not in visited:<br>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;visited.add(neighbor)<br>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;queue.append(neighbor)</code>' },
            { nodes: ['A','B','C','D','E'], edges: [['A','B'],['A','C'],['B','D'],['C','D'],['D','E']], visited: ['A','B'], current: 'B', queue: ['C','D'], action: 'Visit B, add D to queue',
              explanation: '➡️ <strong>Step 2: Visit B</strong><br><br>' +
                '• Dequeue <span style="color:#3fb950;">B</span> (first in queue)<br>' +
                '• Mark B as visited<br>' +
                '• B\'s neighbor D added to queue<br>' +
                '• Queue: [C, D]' },
            { nodes: ['A','B','C','D','E'], edges: [['A','B'],['A','C'],['B','D'],['C','D'],['D','E']], visited: ['A','B','C'], current: 'C', queue: ['D'], action: 'Visit C (D already in queue)',
              explanation: '➡️ <strong>Step 3: Visit C</strong><br><br>' +
                '• Dequeue <span style="color:#3fb950;">C</span><br>' +
                '• Mark C as visited<br>' +
                '• C\'s neighbor D already in queue (skip)<br>' +
                '• Queue: [D]' },
            { nodes: ['A','B','C','D','E'], edges: [['A','B'],['A','C'],['B','D'],['C','D'],['D','E']], visited: ['A','B','C','D'], current: 'D', queue: ['E'], action: 'Visit D, add E to queue',
              explanation: '➡️ <strong>Step 4: Visit D</strong><br><br>' +
                '• Dequeue <span style="color:#3fb950;">D</span><br>' +
                '• Mark D as visited<br>' +
                '• Add neighbor E to queue<br>' +
                '• Queue: [E]' },
            { nodes: ['A','B','C','D','E'], edges: [['A','B'],['A','C'],['B','D'],['C','D'],['D','E']], visited: ['A','B','C','D','E'], current: 'E', queue: [], action: 'Visit E. BFS complete!',
              explanation: '✅ <strong>Step 5: BFS Complete!</strong><br><br>' +
                '• Dequeue <span style="color:#3fb950;">E</span><br>' +
                '• Mark E as visited<br>' +
                '• Queue empty - traversal done<br>' +
                '• <strong>Visit order: A → B → C → D → E</strong>' }
        ];
    }

    function generateGenericSteps() {
        return [
            { action: 'Step 1: Initialize variables', explanation: '🔧 <strong>Initialization</strong><br><br>Set up required variables and data structures.' },
            { action: 'Step 2: Process input', explanation: '📥 <strong>Process Input</strong><br><br>Parse and validate the input data.' },
            { action: 'Step 3: Apply algorithm', explanation: '⚙️ <strong>Apply Algorithm</strong><br><br>Execute the main algorithm logic.' },
            { action: 'Step 4: Return result', explanation: '📤 <strong>Return Result</strong><br><br>Format and return the final output.' }
        ];
    }

    function updateVisualization() {
        var mainArea = document.getElementById('viz-main-area');
        var statusEl = document.getElementById('viz-status');
        var progressBar = document.getElementById('viz-progress-bar');
        var stepCounter = document.getElementById('viz-step-counter');
        var explanationEl = document.getElementById('viz-explanation');

        if (!mainArea || vizState.steps.length === 0) return;

        var step = vizState.steps[vizState.currentStep];
        var category = currentProblem ? currentProblem.category : 'arrays';
        var problemId = currentProblem ? currentProblem.id : '';

        // Render based on problem type (check problemId first for specific algorithms)
        if (problemId && problemId.includes('topological')) {
            mainArea.innerHTML = renderTopologicalSortVisualization(step);
        } else if (category === 'graphs' || category === 'famous-algorithms') {
            mainArea.innerHTML = renderGraphVisualization(step);
        } else if (category === 'arrays') {
            mainArea.innerHTML = renderArrayVisualization(step);
        } else if (category === 'binary-trees' || category === 'binary-search-trees') {
            mainArea.innerHTML = renderTreeVisualization(step);
        } else if (category === 'dynamic-programming') {
            mainArea.innerHTML = renderDPVisualization(step);
        } else if (category === 'linked-lists') {
            mainArea.innerHTML = renderLinkedListVisualization(step);
        } else if (category === 'recursion') {
            mainArea.innerHTML = renderRecursionVisualization(step);
        } else {
            mainArea.innerHTML = '<p style="color:#8b949e;">' + (step.action || 'Processing...') + '</p>';
        }

        // Update status
        if (statusEl) statusEl.textContent = step.status || step.action || '';

        // Update step-by-step explanation
        if (explanationEl) {
            explanationEl.innerHTML = step.explanation || '<p style="color:#8b949e;">No explanation available for this step.</p>';
        }

        // Update progress
        var progress = ((vizState.currentStep + 1) / vizState.totalSteps) * 100;
        if (progressBar) progressBar.style.width = progress + '%';
        if (stepCounter) stepCounter.textContent = 'Step ' + (vizState.currentStep + 1) + ' / ' + vizState.totalSteps;
    }

    function renderArrayVisualization(step) {
        if (!step || !step.array) return '<p>No data</p>';

        var html = '<div style="margin-bottom:1rem;">' +
            '<span style="color:#f0883e;font-weight:600;">Checking: ' + step.checking + '</span></div>';

        // Array
        html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Array:</div>';
        html += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1.5rem;">';
        step.array.forEach(function(val, idx) {
            var isActive = idx === step.currentIndex;
            var bg = isActive ? 'linear-gradient(135deg,#238636,#2ea043)' : '#21262d';
            var border = isActive ? '2px solid #3fb950' : '2px solid #30363d';
            html += '<div style="width:70px;height:50px;background:' + bg + ';border:' + border + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:bold;font-size:1.1rem;transition:all 0.3s;">' + val + '</div>';
        });
        html += '</div>';

        // Hash Table
        html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Hash Table:</div>';
        html += '<div style="display:inline-block;background:#21262d;border:2px solid #238636;border-radius:6px;padding:0.75rem 1rem;color:#3fb950;font-family:monospace;">';
        html += '{ ' + step.hashTable.join(', ') + ' }';
        html += '</div>';

        return html;
    }

    function renderTreeVisualization(step) {
        var html = '<svg viewBox="0 0 400 220" style="width:100%;max-width:450px;">';

        // Draw edges
        var edges = [
            [200,50,120,110], [200,50,280,110],
            [120,130,70,180], [120,130,170,180],
            [280,130,230,180], [280,130,330,180]
        ];
        edges.forEach(function(e) {
            html += '<line x1="'+e[0]+'" y1="'+e[1]+'" x2="'+e[2]+'" y2="'+e[3]+'" stroke="#30363d" stroke-width="2"/>';
        });

        // Draw nodes
        var nodes = [
            {x:200,y:30,val:10}, {x:120,y:100,val:5}, {x:280,y:100,val:15},
            {x:70,y:170,val:2}, {x:170,y:170,val:7}, {x:230,y:170,val:13}, {x:330,y:170,val:20}
        ];

        var visited = step.visited || [];
        nodes.forEach(function(n) {
            var isVisited = visited.indexOf(n.val) !== -1;
            var isActive = step.nodes && step.nodes.some(function(sn) { return sn.active && sn.val === n.val; });
            var fill = isActive ? '#238636' : (isVisited ? '#58a6ff' : '#21262d');
            var stroke = isActive ? '#3fb950' : (isVisited ? '#58a6ff' : '#30363d');
            html += '<circle cx="'+n.x+'" cy="'+n.y+'" r="22" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2"/>';
            html += '<text x="'+n.x+'" y="'+(n.y+5)+'" fill="white" text-anchor="middle" font-weight="bold" font-size="14">'+n.val+'</text>';
        });

        html += '</svg>';
        html += '<div style="margin-top:1rem;color:#8b949e;">' + (step.action || '') + '</div>';
        html += '<div style="margin-top:0.5rem;color:#58a6ff;">Visited: [' + (step.visited || []).join(' → ') + ']</div>';

        return html;
    }

    function renderDPVisualization(step) {
        if (!step || !step.table) return '<p>No data</p>';

        var str1 = 'ABCD';
        var str2 = 'AEBD';

        var html = '<div style="overflow-x:auto;">';
        html += '<table style="border-collapse:collapse;font-family:monospace;">';

        // Header row
        html += '<tr><th style="border:1px solid #30363d;padding:10px;background:#21262d;color:#8b949e;"></th>';
        html += '<th style="border:1px solid #30363d;padding:10px;background:#21262d;color:#8b949e;">""</th>';
        for (var j = 0; j < str2.length; j++) {
            html += '<th style="border:1px solid #30363d;padding:10px;background:#21262d;color:#f0883e;">' + str2[j] + '</th>';
        }
        html += '</tr>';

        // Data rows
        for (var i = 0; i <= str1.length; i++) {
            html += '<tr>';
            html += '<th style="border:1px solid #30363d;padding:10px;background:#21262d;color:#f0883e;">' + (i === 0 ? '""' : str1[i-1]) + '</th>';
            for (var j = 0; j <= str2.length; j++) {
                var isActive = step.row === i && step.col === j;
                var bg = isActive ? '#238636' : (step.table[i][j] > 0 ? '#1f6feb33' : '#0d1117');
                var border = isActive ? '2px solid #3fb950' : '1px solid #30363d';
                html += '<td style="border:' + border + ';padding:10px;background:' + bg + ';color:#c9d1d9;text-align:center;min-width:40px;">' + step.table[i][j] + '</td>';
            }
            html += '</tr>';
        }
        html += '</table></div>';

        html += '<div style="margin-top:1rem;color:#8b949e;">' + (step.action || '') + '</div>';

        return html;
    }

    function renderLinkedListVisualization(step) {
        if (!step || !step.nodes) return '<p>No data</p>';

        var html = '<div style="display:flex;align-items:center;gap:0;overflow-x:auto;padding:1rem 0;">';

        step.nodes.forEach(function(val, idx) {
            var isCurrent = step.pointers && step.pointers.current === idx;
            var isHead = step.pointers && step.pointers.head === idx;
            var isPrev = step.pointers && step.pointers.prev === idx;

            var bg = isCurrent ? 'linear-gradient(135deg,#238636,#2ea043)' : '#21262d';
            var border = isCurrent ? '2px solid #3fb950' : '2px solid #30363d';

            html += '<div style="display:flex;flex-direction:column;align-items:center;">';
            if (isHead) html += '<div style="color:#58a6ff;font-size:0.75rem;margin-bottom:4px;">HEAD</div>';
            else if (isPrev) html += '<div style="color:#f0883e;font-size:0.75rem;margin-bottom:4px;">PREV</div>';
            else if (isCurrent) html += '<div style="color:#3fb950;font-size:0.75rem;margin-bottom:4px;">CURR</div>';
            else html += '<div style="height:18px;"></div>';

            html += '<div style="display:flex;align-items:center;">';
            html += '<div style="width:50px;height:50px;background:' + bg + ';border:' + border + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:8px;font-weight:bold;font-size:1.2rem;">' + val + '</div>';

            if (idx < step.nodes.length - 1) {
                html += '<div style="width:40px;height:3px;background:#30363d;position:relative;">' +
                    '<div style="position:absolute;right:-6px;top:-5px;width:0;height:0;border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:10px solid #30363d;"></div></div>';
            }
            html += '</div></div>';
        });

        html += '<div style="margin-left:8px;color:#3fb950;font-weight:bold;font-size:0.9rem;">NULL</div>';
        html += '</div>';

        html += '<div style="margin-top:1rem;color:#8b949e;">' + (step.action || '') + '</div>';

        return html;
    }

    function renderTopologicalSortVisualization(step) {
        if (!step) return '<p>No data</p>';

        var positions = { A: [60,40], B: [180,40], C: [120,110], D: [240,110], E: [180,180] };

        var html = '<svg viewBox="0 0 300 220" style="width:100%;max-width:400px;">';

        // Draw edges (directed arrows)
        var allEdges = [['A','C'],['B','C'],['B','D'],['C','E'],['D','E']];
        allEdges.forEach(function(e) {
            var p1 = positions[e[0]];
            var p2 = positions[e[1]];
            if (p1 && p2) {
                var isActive = step.edges && step.edges.some(function(se) {
                    return se[0] === e[0] && se[1] === e[1];
                });
                var color = isActive ? '#30363d' : '#1a1e24';
                // Draw arrow
                html += '<line x1="'+p1[0]+'" y1="'+p1[1]+'" x2="'+p2[0]+'" y2="'+p2[1]+'" stroke="'+color+'" stroke-width="2" marker-end="url(#arrowhead)"/>';
            }
        });

        // Arrow marker definition
        html += '<defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#30363d"/></marker></defs>';

        // Draw nodes
        ['A','B','C','D','E'].forEach(function(n) {
            var pos = positions[n];
            var inDegree = step.nodes ? step.nodes[n] : 0;
            var isInResult = (step.result || []).indexOf(n) !== -1;
            var isCurrent = step.current === n;
            var isInQueue = (step.queue || []).indexOf(n) !== -1;

            var fill = isCurrent ? '#238636' : (isInResult ? '#58a6ff' : (isInQueue ? '#f0883e' : '#21262d'));
            var stroke = isCurrent ? '#3fb950' : (isInResult ? '#58a6ff' : (isInQueue ? '#f0883e' : '#30363d'));

            html += '<circle cx="'+pos[0]+'" cy="'+pos[1]+'" r="24" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2"/>';
            html += '<text x="'+pos[0]+'" y="'+(pos[1]+5)+'" fill="white" text-anchor="middle" font-weight="bold" font-size="14">'+n+'</text>';
            // Show in-degree
            html += '<text x="'+(pos[0]+20)+'" y="'+(pos[1]-20)+'" fill="#8b949e" font-size="10">in:'+inDegree+'</text>';
        });

        html += '</svg>';

        // Legend
        html += '<div style="display:flex;gap:1.5rem;margin-top:1rem;flex-wrap:wrap;">';
        html += '<div style="display:flex;align-items:center;gap:0.5rem;"><div style="width:16px;height:16px;background:#f0883e;border-radius:50%;"></div><span style="color:#8b949e;font-size:0.85rem;">In Queue</span></div>';
        html += '<div style="display:flex;align-items:center;gap:0.5rem;"><div style="width:16px;height:16px;background:#238636;border-radius:50%;"></div><span style="color:#8b949e;font-size:0.85rem;">Processing</span></div>';
        html += '<div style="display:flex;align-items:center;gap:0.5rem;"><div style="width:16px;height:16px;background:#58a6ff;border-radius:50%;"></div><span style="color:#8b949e;font-size:0.85rem;">Completed</span></div>';
        html += '</div>';

        // Queue display
        html += '<div style="margin-top:1rem;">';
        html += '<span style="color:#8b949e;">Queue: </span><span style="color:#f0883e;font-family:monospace;">[' + (step.queue || []).join(', ') + ']</span>';
        html += '</div>';

        // Result display
        html += '<div style="margin-top:0.5rem;">';
        html += '<span style="color:#8b949e;">Result: </span><span style="color:#3fb950;font-family:monospace;">[' + (step.result || []).join(' → ') + ']</span>';
        html += '</div>';

        return html;
    }

    function renderGraphVisualization(step) {
        if (!step) return '<p>No data</p>';

        var positions = { A: [100,50], B: [50,120], C: [150,120], D: [100,190], E: [200,190] };

        var html = '<svg viewBox="0 0 300 250" style="width:100%;max-width:350px;">';

        // Draw edges
        (step.edges || []).forEach(function(e) {
            var p1 = positions[e[0]];
            var p2 = positions[e[1]];
            if (p1 && p2) {
                html += '<line x1="'+p1[0]+'" y1="'+p1[1]+'" x2="'+p2[0]+'" y2="'+p2[1]+'" stroke="#30363d" stroke-width="2"/>';
            }
        });

        // Draw nodes
        (step.nodes || []).forEach(function(n) {
            var pos = positions[n];
            if (!pos) return;
            var isVisited = (step.visited || []).indexOf(n) !== -1;
            var isCurrent = step.current === n;
            var fill = isCurrent ? '#238636' : (isVisited ? '#58a6ff' : '#21262d');
            var stroke = isCurrent ? '#3fb950' : (isVisited ? '#58a6ff' : '#30363d');
            html += '<circle cx="'+pos[0]+'" cy="'+pos[1]+'" r="24" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2"/>';
            html += '<text x="'+pos[0]+'" y="'+(pos[1]+5)+'" fill="white" text-anchor="middle" font-weight="bold" font-size="14">'+n+'</text>';
        });

        html += '</svg>';

        html += '<div style="margin-top:1rem;">';
        html += '<span style="color:#8b949e;">Queue: </span><span style="color:#f0883e;">[' + (step.queue || []).join(', ') + ']</span>';
        html += '</div>';
        html += '<div style="color:#8b949e;margin-top:0.5rem;">' + (step.action || '') + '</div>';

        return html;
    }

    function updateCallStack() {
        var callStackEl = document.getElementById('viz-call-stack');
        if (!callStackEl || vizState.steps.length === 0) return;

        var step = vizState.steps[vizState.currentStep];
        var category = currentProblem ? currentProblem.category : 'recursion';

        var html = '';

        if (category === 'recursion' && step.stack) {
            step.stack.forEach(function(call, idx) {
                var isTop = idx === step.stack.length - 1;
                var bg = isTop ? '#238636' : '#21262d';
                var border = isTop ? '#3fb950' : '#30363d';
                html += '<div style="background:' + bg + ';border:1px solid ' + border + ';border-radius:6px;padding:0.75rem 1rem;">';
                html += '<span style="color:#f0883e;">Depth ' + idx + ':</span> <span style="color:#58a6ff;font-family:monospace;">' + call + '</span>';
                html += '</div>';
            });

            if (step.result !== null && step.result !== undefined) {
                html += '<div style="background:#1f6feb33;border:1px solid #58a6ff;border-radius:6px;padding:0.75rem 1rem;margin-top:0.5rem;">';
                html += '<span style="color:#3fb950;">Result:</span> <span style="color:#c9d1d9;font-family:monospace;">' + step.call + '</span>';
                if (step.memo) html += ' <span style="color:#f0883e;">(memoized)</span>';
                html += '</div>';
            }
        } else if (step.queue !== undefined && step.result !== undefined) {
            // Graph algorithms (BFS, Topological Sort, etc.)
            html += '<div style="background:#21262d;border:1px solid #30363d;border-radius:6px;padding:0.75rem 1rem;margin-bottom:0.5rem;">';
            html += '<span style="color:#f0883e;">Algorithm State</span>';
            html += '</div>';

            html += '<div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:0.75rem 1rem;margin-bottom:0.5rem;">';
            html += '<span style="color:#8b949e;">Queue:</span> <span style="color:#f0883e;font-family:monospace;">[' + (step.queue || []).join(', ') + ']</span>';
            html += '</div>';

            html += '<div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:0.75rem 1rem;margin-bottom:0.5rem;">';
            html += '<span style="color:#8b949e;">Processing:</span> <span style="color:#3fb950;font-family:monospace;">' + (step.current || 'None') + '</span>';
            html += '</div>';

            html += '<div style="background:#1f6feb33;border:1px solid #58a6ff;border-radius:6px;padding:0.75rem 1rem;">';
            html += '<span style="color:#58a6ff;">Result:</span> <span style="color:#c9d1d9;font-family:monospace;">[' + (step.result || []).join(' → ') + ']</span>';
            html += '</div>';
        } else if (step.hashTable !== undefined) {
            // Array with hash table (Two Sum, etc.)
            html += '<div style="background:#21262d;border:1px solid #30363d;border-radius:6px;padding:0.75rem 1rem;margin-bottom:0.5rem;">';
            html += '<span style="color:#f0883e;">Hash Table Lookup</span>';
            html += '</div>';

            html += '<div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:0.75rem 1rem;margin-bottom:0.5rem;">';
            html += '<span style="color:#8b949e;">Current:</span> <span style="color:#3fb950;font-family:monospace;">' + step.checking + '</span>';
            html += '</div>';

            html += '<div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:0.75rem 1rem;margin-bottom:0.5rem;">';
            html += '<span style="color:#8b949e;">Need:</span> <span style="color:#f0883e;font-family:monospace;">' + step.need + '</span>';
            html += '</div>';

            html += '<div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:0.75rem 1rem;">';
            html += '<span style="color:#8b949e;">In Hash?</span> <span style="color:' + (step.found ? '#3fb950' : '#da3633') + ';font-family:monospace;">' + (step.found ? 'YES ✓' : 'NO') + '</span>';
            html += '</div>';
        } else {
            // Generic display with action
            html += '<div style="background:#21262d;border:1px solid #30363d;border-radius:6px;padding:0.75rem 1rem;">';
            html += '<span style="color:#f0883e;">Step ' + (vizState.currentStep + 1) + ':</span> <span style="color:#c9d1d9;">' + (step.action || 'Processing...') + '</span>';
            html += '</div>';
        }

        callStackEl.innerHTML = html;
    }

    // Visualization controls
    window.vizPlay = function() {
        if (vizState.isPlaying) return;
        vizState.isPlaying = true;

        var playBtn = document.getElementById('viz-play-btn');
        var pauseBtn = document.getElementById('viz-pause-btn');
        if (playBtn) playBtn.style.background = '#6e7681';
        if (pauseBtn) pauseBtn.style.background = '#da3633';

        vizState.intervalId = setInterval(function() {
            if (vizState.currentStep < vizState.totalSteps - 1) {
                vizState.currentStep++;
                updateVisualization();
                updateCallStack();
            } else {
                window.vizPause();
            }
        }, vizState.speed);
    };

    window.vizPause = function() {
        vizState.isPlaying = false;
        if (vizState.intervalId) {
            clearInterval(vizState.intervalId);
            vizState.intervalId = null;
        }

        var playBtn = document.getElementById('viz-play-btn');
        var pauseBtn = document.getElementById('viz-pause-btn');
        if (playBtn) playBtn.style.background = '#238636';
        if (pauseBtn) pauseBtn.style.background = '#6e7681';
    };

    window.vizReset = function() {
        window.vizPause();
        vizState.currentStep = 0;
        updateVisualization();
        updateCallStack();
    };

    window.vizSetSpeed = function(val) {
        vizState.speed = 2100 - parseInt(val); // Invert so higher = faster
        if (vizState.isPlaying) {
            window.vizPause();
            window.vizPlay();
        }
    };

    window.vizStepForward = function() {
        window.vizPause();
        if (vizState.currentStep < vizState.totalSteps - 1) {
            vizState.currentStep++;
            updateVisualization();
            updateCallStack();
        }
    };

    window.vizStepBack = function() {
        window.vizPause();
        if (vizState.currentStep > 0) {
            vizState.currentStep--;
            updateVisualization();
            updateCallStack();
        }
    };

    function renderRecursionVisualization(step) {
        if (!step) return '<p>No data</p>';

        var html = '<div style="text-align:center;margin-bottom:1rem;">';
        html += '<div style="font-size:1.5rem;color:#58a6ff;font-family:monospace;margin-bottom:1rem;">' + step.call + '</div>';

        // Recursion tree visualization
        html += '<div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;">';

        if (step.stack && step.stack.length > 0) {
            step.stack.forEach(function(call, idx) {
                var isTop = idx === step.stack.length - 1;
                var indent = idx * 30;
                html += '<div style="display:flex;align-items:center;gap:0.5rem;margin-left:' + indent + 'px;">';
                if (idx > 0) {
                    html += '<div style="color:#30363d;">↳</div>';
                }
                html += '<div style="background:' + (isTop ? '#238636' : '#21262d') + ';border:1px solid ' + (isTop ? '#3fb950' : '#30363d') + ';border-radius:6px;padding:0.5rem 1rem;font-family:monospace;color:#c9d1d9;">';
                html += call;
                html += '</div></div>';
            });
        }

        html += '</div>';

        if (step.result !== null && step.result !== undefined) {
            html += '<div style="margin-top:1.5rem;padding:1rem;background:#1f6feb33;border:1px solid #58a6ff;border-radius:8px;">';
            html += '<span style="color:#3fb950;font-size:1.2rem;">Return: ' + step.result + '</span>';
            if (step.memo) html += ' <span style="color:#f0883e;background:#f0883e22;padding:0.2rem 0.5rem;border-radius:4px;font-size:0.85rem;">memoized</span>';
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Parse URL and open problem if specified
    function parseUrlAndOpenProblem() {
        var path = window.location.pathname;
        var params = new URLSearchParams(window.location.search);

        // Check if URL is like /200-problems/problem-id
        var match = path.match(/\/200-problems\/([^\/]+)/);
        if (match && match[1]) {
            var problemId = match[1];
            var category = params.get('category');
            var similar = params.get('similar');
            var section = params.get('section') || 'problem';

            // If no category specified, find it from problemsData
            if (!category) {
                Object.keys(problemsData).forEach(function(cat) {
                    var found = problemsData[cat].find(function(p) { return p.id === problemId; });
                    if (found) category = cat;
                });
            }

            if (category) {
                window.openProblem(category, problemId, similar, section);
            }
        }
    }

    // Handle browser back/forward
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.problemId) {
            window.openProblem(
                event.state.category,
                event.state.problemId,
                event.state.similarIdx,
                new URLSearchParams(window.location.search).get('section')
            );
        } else {
            // Close problem view, go back to category list
            window.hideEditor();
        }
    });

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        console.log('200 Problems UI initialized with ' + Object.keys(problemsData).length + ' categories');
        // Check URL for direct problem link
        parseUrlAndOpenProblem();
    });
})();
