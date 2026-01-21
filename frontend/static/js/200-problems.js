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

    // Store parsed examples from problem.md
    let currentExamples = [];
    let selectedExampleIndex = 0;

    // Store embedded visualization config from problem.md script tag
    let vizConfig = null;

    // Read embedded visualization config from loaded problem content
    function extractVizConfig(htmlContent) {
        // Try multiple approaches to find viz-config
        console.log('[VizConfig] Searching for config in HTML content (length=' + htmlContent.length + ')');

        // Approach 1: Look for <div id="viz-config" style="display:none"> (primary - most reliable)
        var divMatch = htmlContent.match(/<div[^>]*id=["']viz-config["'][^>]*>([\s\S]*?)<\/div>/i);
        if (divMatch) {
            console.log('[VizConfig] Found div match, raw content:', divMatch[1].substring(0, 100) + '...');
            try {
                // The content might be HTML encoded, decode it
                var decoded = divMatch[1]
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&amp;/g, '&')
                    .replace(/&quot;/g, '"')
                    .replace(/&#34;/g, '"')
                    .replace(/&#39;/g, "'")
                    .trim();
                var config = JSON.parse(decoded);
                console.log('[VizConfig] Successfully parsed config:', config.name, '| Algorithm:', config.algorithm);
                return config;
            } catch (e) {
                console.error('[VizConfig] Failed to parse viz-config from div:', e, 'Content:', divMatch[1].substring(0, 200));
            }
        }

        // Approach 2: Look for <script type="application/json" id="viz-config">
        var scriptMatch = htmlContent.match(/<script[^>]*id=["']viz-config["'][^>]*>([\s\S]*?)<\/script>/i);
        if (scriptMatch) {
            console.log('[VizConfig] Found script match');
            try {
                var config = JSON.parse(scriptMatch[1]);
                console.log('[VizConfig] Successfully parsed config from script:', config.name);
                return config;
            } catch (e) {
                console.error('[VizConfig] Failed to parse viz-config from script:', e);
            }
        }

        // Approach 3: Look for JSON object at the very start of the HTML (raw JSON)
        var jsonStart = htmlContent.trim();
        if (jsonStart.startsWith('{') && jsonStart.indexOf('"algorithm"') !== -1) {
            // Find end of first JSON object
            var braceCount = 0;
            var jsonEnd = -1;
            for (var i = 0; i < jsonStart.length && i < 5000; i++) {
                if (jsonStart[i] === '{') braceCount++;
                if (jsonStart[i] === '}') {
                    braceCount--;
                    if (braceCount === 0) {
                        jsonEnd = i + 1;
                        break;
                    }
                }
            }
            if (jsonEnd > 0) {
                try {
                    var config = JSON.parse(jsonStart.substring(0, jsonEnd));
                    console.log('[VizConfig] Successfully parsed raw JSON config:', config.name);
                    return config;
                } catch (e) {
                    // Not valid JSON, continue
                }
            }
        }

        console.log('[VizConfig] No config found in HTML');
        return null;
    }

    // Generate visualization steps from embedded config
    function generateStepsFromConfig(config, exampleIndex) {
        if (!config || !config.examples || !config.examples[exampleIndex]) {
            console.log('[VizConfig] No config or example found');
            return null;
        }

        var example = config.examples[exampleIndex];
        var algorithm = config.algorithm || 'generic';
        var complexity = config.complexity || { time: 'O(n)', space: 'O(1)' };

        console.log('[VizConfig] Running algorithm:', algorithm, 'with example:', example);

        // Run the appropriate algorithm based on config
        switch (algorithm) {
            case 'two-pointer-subsequence':
                return runValidateSubsequence(example, config, complexity);
            case 'hash-table-two-sum':
                return runTwoNumberSum(example, config, complexity);
            case 'two-pointer-move':
                return runMoveElementToEnd(example, config, complexity);
            case 'two-pointer-sorted-squared':
                return runSortedSquaredArray(example, config, complexity);
            case 'sort-three-sum':
                return runThreeNumberSum(example, config, complexity);
            case 'spiral-matrix':
                return runSpiralTraverse(example, config, complexity);
            case 'hash-counting':
                return runTournamentWinner(example, config, complexity);
            case 'greedy-change':
                return runNonConstructibleChange(example, config, complexity);
            case 'matrix-transpose':
                return runMatrixTranspose(example, config, complexity);
            case 'two-pointer-diff':
                return runSmallestDifference(example, config, complexity);
            case 'linear-scan':
                return runMonotonicArray(example, config, complexity);
            case 'prefix-suffix':
                return runArrayOfProducts(example, config, complexity);
            case 'index-marking':
                return runFirstDuplicateValue(example, config, complexity);
            case 'sort-merge':
                return runMergeIntervals(example, config, complexity);
            case 'peak-expansion':
                return runLongestPeak(example, config, complexity);
            case 'hash-prefix-sum':
                return runZeroSumSubarray(example, config, complexity);

            // Graph algorithms
            case 'graph-dfs':
                return runGraphDFS(example, config, complexity);
            case 'graph-bfs':
                return runGraphBFS(example, config, complexity);
            case 'flood-fill':
            case 'cycle-detection':
            case 'graph-cycle':
            case 'graph-coloring':
            case 'graph-flood-fill':
            case 'graph-ancestor':
            case 'graph-arbitrage':
            case 'graph-min-passes':
            case 'graph-boggle':
            case 'graph-word-search':
            case 'graph-largest-island':
            case 'graph-single-cycle':
            case 'bellman-ford':
            case 'bellman-ford-dijkstra':
            case 'floyd-cycle-detection':
            case 'fast-slow-pointer':
            case 'dijkstra-modified':
            case 'minimum-spanning-tree':
            case 'graph-connections':
                return runGraphGeneric(example, config, complexity);

            // Linked List algorithms
            case 'll-remove-duplicates':
                return runLinkedListRemoveDuplicates(example, config, complexity);
            case 'll-reverse':
                return runLinkedListReverse(example, config, complexity);
            case 'll-merge':
            case 'll-find-loop':
            case 'll-remove':
            case 'll-middle':
            case 'll-construction':
            case 'll-remove-kth':
            case 'll-sum':
            case 'll-shift':
            case 'll-lru-cache':
            case 'll-rearrange':
                return runLinkedListGeneric(example, config, complexity);

            // Binary Tree algorithms
            case 'tree-dfs':
                return runTreeDFS(example, config, complexity);
            case 'tree-bfs':
                return runTreeBFS(example, config, complexity);
            case 'tree-balance':
            case 'tree-balanced':
            case 'tree-invert':
            case 'tree-diameter':
            case 'tree-successor':
            case 'tree-flatten':
            case 'tree-height-balanced':
            case 'tree-symmetrical':
            case 'tree-symmetry':
            case 'tree-merge':
            case 'tree-evaluate':
            case 'tree-expression':
            case 'tree-compare-leaves':
            case 'tree-right-sibling':
            case 'tree-sibling':
            case 'tree-max-path':
            case 'tree-distance-k':
            case 'tree-distance':
            case 'tree-inorder-iterative':
            case 'tree-iterative':
                return runTreeGeneric(example, config, complexity);

            // Recursion algorithms
            case 'recursion-fibonacci':
                return runRecursionFibonacci(example, config, complexity);
            case 'recursion-permutations':
            case 'recursion-powerset':
            case 'recursion-sudoku':
            case 'recursion-backtrack':
            case 'recursion-divide':
            case 'recursion-product-sum':
            case 'recursion-phone':
            case 'recursion-staircase':
            case 'recursion-divtags':
            case 'recursion-measurements':
            case 'recursion-interweaving':
            case 'recursion-count-bst':
            case 'recursion-probability':
            case 'recursion-manager':
                return runRecursionGeneric(example, config, complexity);
            case 'recursion-minesweeper':
                return runMinesweeperVisualization(example, config, complexity);

            // Dynamic Programming algorithms
            case 'dp-coin-change':
                return runDPCoinChange(example, config, complexity);
            case 'dp-lcs':
                return runDPLCS(example, config, complexity);
            case 'dp-edit':
            case 'dp-edit-distance':
            case 'dp-knapsack':
            case 'dp-max-sum':
            case 'dp-max-subset':
            case 'dp-lis':
            case 'dp-increasing-subseq':
            case 'dp-matrix':
            case 'dp-disk-stacking':
            case 'dp-pi-numbers':
            case 'dp-transactions':
            case 'dp-palindrome':
            case 'dp-string-chain':
            case 'dp-square-zeroes':
            case 'dp-graph-traversal':
            case 'dp-jumps':
                return runDPGeneric(example, config, complexity);

            // BST algorithms
            case 'bst-search':
                return runBSTSearch(example, config, complexity);
            case 'bst-construction':
            case 'bst-construction-balanced':
            case 'bst-validate':
            case 'bst-validation':
            case 'bst-validation-nodes':
            case 'bst-traversal':
            case 'bst-min-height':
            case 'bst-kth-largest':
            case 'bst-reconstruction':
            case 'bst-comparison':
            case 'bst-augmented':
            case 'bst-range':
            case 'bst-iterator':
            case 'bst-repair':
            case 'bst-sum':
                return runBSTGeneric(example, config, complexity);

            // Famous algorithms
            case 'dijkstra':
            case 'dijkstras-algorithm':
            case 'kruskal':
            case 'kruskals-algorithm':
            case 'prim':
            case 'prims-algorithm':
            case 'a-star':
            case 'bfs-astar':
            case 'a-star-bfs':
            case 'topological-sort':
            case 'union-find':
            case 'kadane':
            case 'kadanes-algorithm':
            case 'kmp':
            case 'kmp-algorithm':
                return runFamousAlgorithm(example, config, complexity);

            case 'hash-expansion':
                return runLargestRange(example, config, complexity);

            case 'hash-pair-sum':
            case 'out-of-order-bounds':
            case 'hash-set':
            case 'sorting':
            default:
                // Generic visualization for algorithms without specific runners
                return runGenericVisualization(example, config, complexity);
        }
    }

    // Generic visualization that shows input/output/complexity
    function runGenericVisualization(example, config, complexity) {
        var steps = [];
        var inputStr = JSON.stringify(example.input, null, 2);
        var outputStr = JSON.stringify(example.output);

        steps.push({
            vizType: 'generic',
            status: 'Problem: ' + config.name,
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Algorithm:</strong> ' + config.algorithm + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>Time: <code>' + complexity.time + '</code><br>Space: <code>' + complexity.space + '</code></div>'
        });

        steps.push({
            vizType: 'generic',
            input: example.input,
            status: 'Input',
            explanation: '📥 <strong>Input:</strong><br><pre style="background:#161b22;padding:0.5rem;border-radius:4px;overflow-x:auto;">' +
                (example.inputRaw || inputStr) + '</pre>'
        });

        steps.push({
            vizType: 'generic',
            output: example.output,
            status: 'Processing...',
            explanation: '⚙️ <strong>Algorithm executing...</strong><br><br>' +
                'The algorithm processes the input according to the ' + config.algorithm + ' pattern.'
        });

        steps.push({
            vizType: 'generic',
            output: example.output,
            status: 'Output: ' + (example.outputRaw || outputStr),
            explanation: '📤 <strong>Output:</strong><br><pre style="background:#161b22;padding:0.5rem;border-radius:4px;overflow-x:auto;">' +
                (example.outputRaw || outputStr) + '</pre><br><br>' +
                '✅ <strong>Complete!</strong>'
        });

        return steps;
    }

    // Algorithm: Largest Range (Hash Expansion)
    function runLargestRange(example, config, complexity) {
        var steps = [];
        var arr = example.input.array;
        if (!arr || !Array.isArray(arr) || arr.length < 4) {
            // For small arrays, create a sample with more elements
            arr = arr || [1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6];
        }

        var expected = example.output || [0, 7];

        // Step 1: Introduction
        steps.push({
            vizType: 'array-hash',
            array: arr.slice(),
            hashTable: [],
            currentIndex: -1,
            status: 'Initialize: ' + config.name,
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> [' + arr.join(', ') + ']<br>' +
                '<strong>Expected:</strong> [' + expected.join(', ') + ']<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Step 2: Build hash set
        var numSet = {};
        arr.forEach(function(num) { numSet[num] = true; });
        var hashKeys = Object.keys(numSet).map(Number).sort(function(a,b){ return a-b; });

        steps.push({
            vizType: 'array-hash',
            array: arr.slice(),
            hashTable: hashKeys.slice(0, 8).map(function(n) { return n; }),
            currentIndex: -1,
            status: 'Build hash set',
            explanation: '🔧 <strong>Step 1: Build Hash Set</strong><br><br>' +
                '• Add all numbers to a hash set for O(1) lookups<br>' +
                '• This allows us to quickly check if a number exists<br><br>' +
                '<code>nums = {' + hashKeys.slice(0, 10).join(', ') + (hashKeys.length > 10 ? '...' : '') + '}</code>'
        });

        // Step 3: Find a starting number (e.g., the start of expected range)
        var startNum = expected[0];
        var startIdx = arr.indexOf(startNum);
        if (startIdx === -1) startIdx = 0;

        steps.push({
            vizType: 'array-hash',
            array: arr.slice(),
            hashTable: hashKeys.slice(0, 8),
            currentIndex: startIdx,
            checking: startNum,
            status: 'Check: ' + startNum,
            explanation: '🔍 <strong>Step 2: Find Range Start</strong><br><br>' +
                '• For each number, check if it\'s the start of a range<br>' +
                '• A number is a range start if (num - 1) doesn\'t exist in the set<br><br>' +
                '• Checking <strong>' + startNum + '</strong>: is <strong>' + (startNum - 1) + '</strong> in set? ' +
                (numSet[startNum - 1] ? 'Yes (not a start)' : '<span style="color:#3fb950;">No - this is a range start!</span>')
        });

        // Step 4: Expand the range
        var left = startNum;
        var right = startNum;
        while (numSet[left - 1]) left--;
        while (numSet[right + 1]) right++;

        var rangeNums = [];
        for (var i = left; i <= right; i++) rangeNums.push(i);

        steps.push({
            vizType: 'array-hash',
            array: arr.slice(),
            hashTable: rangeNums.slice(0, 10),
            currentIndex: startIdx,
            checking: startNum,
            status: 'Expand range: [' + left + ', ' + right + ']',
            explanation: '🔄 <strong>Step 3: Expand Range</strong><br><br>' +
                '• Starting from <strong>' + startNum + '</strong>, expand in both directions<br>' +
                '• Expand left: ' + startNum + ' → ' + left + '<br>' +
                '• Expand right: ' + startNum + ' → ' + right + '<br><br>' +
                '• Found range: <strong>[' + left + ', ' + right + ']</strong><br>' +
                '• Range values: {' + rangeNums.join(', ') + '}<br>' +
                '• Range length: <strong>' + (right - left + 1) + '</strong>'
        });

        // Step 5: Mark visited and track best
        var visitedNums = rangeNums.map(function(n) { return n + '✓'; });

        steps.push({
            vizType: 'array-hash',
            array: arr.slice(),
            hashTable: visitedNums.slice(0, 10),
            currentIndex: -1,
            status: 'Mark visited, track best',
            explanation: '📝 <strong>Step 4: Mark & Track</strong><br><br>' +
                '• Mark all numbers in range as visited<br>' +
                '• Update best range if current is longer<br><br>' +
                '• Visited: {' + rangeNums.join(', ') + '}<br>' +
                '• Best range so far: <strong>[' + left + ', ' + right + ']</strong> (length ' + (right - left + 1) + ')'
        });

        // Step 6: Continue checking other numbers (show one more example if there are other ranges)
        var otherNum = arr.find(function(n) { return n < left || n > right; });
        if (otherNum !== undefined) {
            var otherIdx = arr.indexOf(otherNum);
            steps.push({
                vizType: 'array-hash',
                array: arr.slice(),
                hashTable: visitedNums.slice(0, 10),
                currentIndex: otherIdx,
                checking: otherNum,
                status: 'Check: ' + otherNum,
                explanation: '🔍 <strong>Step 5: Check Other Numbers</strong><br><br>' +
                    '• Continue checking unvisited numbers<br>' +
                    '• Checking <strong>' + otherNum + '</strong><br><br>' +
                    '• If it forms a smaller range or is already visited, skip it<br>' +
                    '• Current best range: [' + expected[0] + ', ' + expected[1] + '] (length ' + (expected[1] - expected[0] + 1) + ')'
            });
        }

        // Step 7: Final result
        steps.push({
            vizType: 'array-hash',
            array: arr.slice(),
            hashTable: ['Best: [' + expected[0] + ',' + expected[1] + ']'],
            currentIndex: -1,
            status: 'Result: [' + expected[0] + ', ' + expected[1] + ']',
            explanation: '✅ <strong>Complete!</strong><br><br>' +
                '• Largest range found: <strong>[' + expected[0] + ', ' + expected[1] + ']</strong><br>' +
                '• Range length: <strong>' + (expected[1] - expected[0] + 1) + '</strong><br><br>' +
                '• All numbers in range: {' + (function() {
                    var r = [];
                    for (var i = expected[0]; i <= expected[1]; i++) r.push(i);
                    return r.join(', ');
                })() + '}'
        });

        return steps;
    }

    // Algorithm: Validate Subsequence (Two Pointer)
    function runValidateSubsequence(example, config, complexity) {
        // Defensive checks for required properties
        if (!example || !example.input || !example.input.array || !example.input.sequence) {
            console.error('[runValidateSubsequence] Missing required input properties');
            return null;
        }
        var arr = example.input.array;
        var seq = example.input.sequence;
        var expected = example.output;
        var steps = [];
        var seqIdx = 0;

        steps.push({
            array: arr.slice(),
            sequence: seq.slice(),
            arrIdx: -1,
            seqIdx: 0,
            vizType: 'two-arrays',
            status: 'Initialize: Check if sequence is subsequence',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> array=[' + arr.join(', ') + '], sequence=[' + seq.join(', ') + ']<br>' +
                '<strong>Expected:</strong> ' + expected + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (var i = 0; i < arr.length && seqIdx < seq.length; i++) {
            var match = arr[i] === seq[seqIdx];
            steps.push({
                array: arr.slice(),
                sequence: seq.slice(),
                arrIdx: i,
                seqIdx: seqIdx,
                match: match,
                vizType: 'two-arrays',
                status: match ? '✓ Match: ' + arr[i] : '✗ arr[' + i + ']=' + arr[i] + ' ≠ seq[' + seqIdx + ']=' + seq[seqIdx],
                explanation: match ?
                    '✅ <strong>Match!</strong> arr[' + i + ']=' + arr[i] + ' == seq[' + seqIdx + ']=' + seq[seqIdx] + '<br>Move seqIdx: ' + seqIdx + ' → ' + (seqIdx + 1) :
                    '❌ No match. arr[' + i + ']=' + arr[i] + ' ≠ seq[' + seqIdx + ']=' + seq[seqIdx] + '<br>Continue scanning...'
            });
            if (match) seqIdx++;
        }

        var result = seqIdx === seq.length;
        steps.push({
            array: arr.slice(),
            sequence: seq.slice(),
            arrIdx: arr.length,
            seqIdx: seqIdx,
            vizType: 'two-arrays',
            status: result ? '✓ Valid Subsequence!' : '✗ Invalid',
            explanation: result ?
                '✅ <strong>Result: true</strong><br>All ' + seq.length + ' elements matched in order!' :
                '❌ <strong>Result: false</strong><br>Only matched ' + seqIdx + '/' + seq.length + ' elements'
        });

        return steps;
    }

    // Algorithm: Two Number Sum (Hash Table)
    function runTwoNumberSum(example, config, complexity) {
        if (!example || !example.input || !example.input.array || example.input.targetSum === undefined) {
            console.error('[runTwoNumberSum] Missing required input properties');
            return null;
        }
        var arr = example.input.array;
        var target = example.input.targetSum;
        var expected = example.output;
        var steps = [];
        var hashSet = [];

        steps.push({
            array: arr.slice(),
            currentIndex: -1,
            hashTable: [],
            vizType: 'array-hash',
            status: 'Initialize: target = ' + target,
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> array=[' + arr.join(', ') + '], target=' + target + '<br>' +
                '<strong>Expected:</strong> [' + (Array.isArray(expected) ? expected.join(', ') : expected) + ']<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

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
                vizType: 'array-hash',
                status: found ? '✓ Found! ' + arr[i] + '+' + need + '=' + target : 'Check ' + arr[i] + ', need ' + need,
                explanation: found ?
                    '✅ <strong>Found pair!</strong><br>' + arr[i] + ' + ' + need + ' = ' + target + '<br>Result: [' + need + ', ' + arr[i] + ']' :
                    '🔍 <strong>Step ' + (i+1) + '</strong><br>Current: ' + arr[i] + ', Need: ' + need + '<br>' + need + ' not in hash. Add ' + arr[i] + '<br>Hash: {' + hashSet.concat([arr[i]]).join(', ') + '}'
            });

            if (found) break;
            hashSet.push(arr[i]);
        }

        return steps;
    }

    // Algorithm: Move Element To End (Two Pointers)
    function runMoveElementToEnd(example, config, complexity) {
        if (!example || !example.input || !example.input.array || example.input.toMove === undefined) {
            return null;
        }
        var arr = example.input.array.slice();
        var toMove = example.input.toMove;
        var expected = example.output;
        var steps = [];
        var left = 0;
        var right = arr.length - 1;

        steps.push({
            array: arr.slice(),
            left: left,
            right: right,
            toMove: toMove,
            vizType: 'two-pointer',
            status: 'Move all ' + toMove + 's to end',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> array=[' + arr.join(', ') + '], toMove=' + toMove + '<br>' +
                '<strong>Expected:</strong> [' + expected.join(', ') + ']<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        while (left < right) {
            while (left < right && arr[right] === toMove) right--;
            if (arr[left] === toMove) {
                var temp = arr[left];
                arr[left] = arr[right];
                arr[right] = temp;
                steps.push({
                    array: arr.slice(),
                    left: left,
                    right: right,
                    toMove: toMove,
                    vizType: 'two-pointer',
                    status: 'Swap: positions ' + left + ' ↔ ' + right,
                    explanation: '🔄 <strong>Swap!</strong><br>arr[' + left + '] ↔ arr[' + right + ']<br>Array: [' + arr.join(', ') + ']'
                });
            }
            left++;
        }

        steps.push({
            array: arr.slice(),
            left: left,
            right: right,
            toMove: toMove,
            vizType: 'two-pointer',
            status: 'Complete!',
            explanation: '✅ <strong>Done!</strong><br>All ' + toMove + 's moved to end<br>Result: [' + arr.join(', ') + ']'
        });

        return steps;
    }

    // Algorithm: Sorted Squared Array
    function runSortedSquaredArray(example, config, complexity) {
        if (!example || !example.input || !example.input.array) return null;
        var arr = example.input.array;
        var expected = example.output;
        var result = new Array(arr.length);
        var left = 0, right = arr.length - 1;
        var steps = [];

        steps.push({
            array: arr.slice(),
            result: [],
            left: left,
            right: right,
            vizType: 'two-pointer-result',
            status: 'Two pointers from ends',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> [' + arr.join(', ') + ']<br>' +
                '<strong>Expected:</strong> [' + expected.join(', ') + ']<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (var i = arr.length - 1; i >= 0; i--) {
            var leftSq = arr[left] * arr[left];
            var rightSq = arr[right] * arr[right];
            var useLeft = leftSq > rightSq;
            result[i] = useLeft ? leftSq : rightSq;

            steps.push({
                array: arr.slice(),
                result: result.slice(),
                left: left,
                right: right,
                insertIdx: i,
                vizType: 'two-pointer-result',
                status: arr[useLeft ? left : right] + '² = ' + result[i] + ' → result[' + i + ']',
                explanation: '🔄 left²=' + leftSq + ', right²=' + rightSq + '<br>Place ' + result[i] + ' at index ' + i
            });

            if (useLeft) left++; else right--;
        }

        return steps;
    }

    // Algorithm: Three Number Sum (Sort + Two Pointers)
    function runThreeNumberSum(example, config, complexity) {
        if (!example || !example.input || !example.input.array || example.input.targetSum === undefined) return null;
        var arr = example.input.array.slice().sort(function(a, b) { return a - b; });
        var target = example.input.targetSum;
        var expected = example.output;
        var steps = [];
        var triplets = [];

        steps.push({
            array: arr,
            triplets: [],
            vizType: 'three-pointer',
            status: 'Sort array, then fix i, use two pointers',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Sorted:</strong> [' + arr.join(', ') + ']<br>' +
                '<strong>Target:</strong> ' + target + '<br>' +
                '<strong>Expected:</strong> ' + JSON.stringify(expected) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (var i = 0; i < arr.length - 2; i++) {
            var left = i + 1;
            var right = arr.length - 1;

            while (left < right) {
                var sum = arr[i] + arr[left] + arr[right];
                var found = sum === target;

                if (found) {
                    triplets.push([arr[i], arr[left], arr[right]]);
                }

                steps.push({
                    array: arr,
                    i: i,
                    left: left,
                    right: right,
                    sum: sum,
                    triplets: triplets.slice(),
                    vizType: 'three-pointer',
                    status: found ? '✓ Found: [' + arr[i] + ',' + arr[left] + ',' + arr[right] + ']' : 'Sum=' + sum + (sum < target ? ' < ' : ' > ') + target,
                    explanation: found ?
                        '✅ <strong>Triplet Found!</strong><br>' + arr[i] + ' + ' + arr[left] + ' + ' + arr[right] + ' = ' + target :
                        '🔍 i=' + i + ' (' + arr[i] + '), L=' + left + ' (' + arr[left] + '), R=' + right + ' (' + arr[right] + ')<br>Sum=' + sum + (sum < target ? ' → move L right' : ' → move R left')
                });

                if (sum === target) { left++; right--; }
                else if (sum < target) { left++; }
                else { right--; }

                if (steps.length > 20) break; // Limit steps for large arrays
            }
            if (steps.length > 20) break;
        }

        steps.push({
            array: arr,
            triplets: triplets,
            vizType: 'three-pointer',
            status: 'Result: ' + triplets.length + ' triplets',
            explanation: '✅ <strong>Result:</strong> ' + JSON.stringify(triplets)
        });

        return steps;
    }

    // Algorithm: Spiral Traverse
    function runSpiralTraverse(example, config, complexity) {
        if (!example || !example.input || !example.input.matrix) return null;
        var matrix = example.input.matrix;
        var expected = example.output;
        var steps = [];
        var result = [];

        var startRow = 0, endRow = matrix.length - 1;
        var startCol = 0, endCol = matrix[0].length - 1;

        steps.push({
            matrix: matrix,
            result: [],
            vizType: 'spiral-matrix',
            status: 'Spiral from outside to inside',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Matrix:</strong> ' + matrix.length + 'x' + matrix[0].length + '<br>' +
                '<strong>Expected:</strong> [' + expected.join(', ') + ']<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        while (startRow <= endRow && startCol <= endCol) {
            // Right
            for (var col = startCol; col <= endCol; col++) {
                result.push(matrix[startRow][col]);
            }
            startRow++;

            // Down
            for (var row = startRow; row <= endRow; row++) {
                result.push(matrix[row][endCol]);
            }
            endCol--;

            if (startRow <= endRow) {
                // Left
                for (var col = endCol; col >= startCol; col--) {
                    result.push(matrix[endRow][col]);
                }
                endRow--;
            }

            if (startCol <= endCol) {
                // Up
                for (var row = endRow; row >= startRow; row--) {
                    result.push(matrix[row][startCol]);
                }
                startCol++;
            }

            steps.push({
                matrix: matrix,
                result: result.slice(),
                bounds: { startRow: startRow, endRow: endRow, startCol: startCol, endCol: endCol },
                vizType: 'spiral-matrix',
                status: 'Layer complete: ' + result.length + ' elements',
                explanation: '🔄 <strong>Layer Done</strong><br>Result so far: [' + result.slice(-8).join(', ') + (result.length > 8 ? '...' : '') + ']'
            });

            if (steps.length > 10) break;
        }

        steps.push({
            matrix: matrix,
            result: result,
            vizType: 'spiral-matrix',
            status: 'Complete!',
            explanation: '✅ <strong>Result:</strong> [' + result.join(', ') + ']'
        });

        return steps;
    }

    // Algorithm: Tournament Winner (Hash Counting)
    function runTournamentWinner(example, config, complexity) {
        if (!example || !example.input || !example.input.competitions || !example.input.results) return null;
        var competitions = example.input.competitions;
        var results = example.input.results;
        var expected = example.output;
        var steps = [];
        var scores = {};
        var currentBest = '';

        steps.push({
            vizType: 'hash-table',
            scores: {},
            status: 'Initialize tournament scoring',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Competitions:</strong> ' + competitions.length + ' matches<br>' +
                '<strong>Expected Winner:</strong> ' + expected + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (var i = 0; i < competitions.length; i++) {
            var home = competitions[i][0];
            var away = competitions[i][1];
            var winner = results[i] === 1 ? home : away;

            scores[winner] = (scores[winner] || 0) + 3;
            if (!currentBest || scores[winner] > scores[currentBest]) {
                currentBest = winner;
            }

            steps.push({
                vizType: 'hash-table',
                scores: Object.assign({}, scores),
                currentBest: currentBest,
                match: { home: home, away: away, winner: winner },
                status: 'Match ' + (i + 1) + ': ' + winner + ' wins!',
                explanation: '🏆 <strong>Match ' + (i + 1) + ':</strong> ' + home + ' vs ' + away + '<br>' +
                    'Winner: <strong>' + winner + '</strong> (+3 points)<br>' +
                    'Current scores: ' + JSON.stringify(scores) + '<br>' +
                    'Current leader: <strong>' + currentBest + '</strong>'
            });
        }

        steps.push({
            vizType: 'hash-table',
            scores: scores,
            currentBest: currentBest,
            status: 'Winner: ' + currentBest,
            explanation: '🏆 <strong>Tournament Complete!</strong><br><br>Final scores: ' + JSON.stringify(scores) + '<br><br>Winner: <strong>' + currentBest + '</strong>'
        });

        return steps;
    }

    // Algorithm: Non-Constructible Change (Greedy)
    function runNonConstructibleChange(example, config, complexity) {
        if (!example || !example.input || !example.input.coins) return null;
        var coins = example.input.coins.slice().sort(function(a, b) { return a - b; });
        var expected = example.output;
        var steps = [];
        var currentChange = 0;

        steps.push({
            vizType: 'array-scan',
            array: coins,
            currentChange: 0,
            status: 'Sort coins: [' + coins.join(', ') + ']',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Sorted coins:</strong> [' + coins.join(', ') + ']<br>' +
                '<strong>Expected:</strong> ' + expected + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (var i = 0; i < coins.length; i++) {
            if (coins[i] > currentChange + 1) {
                steps.push({
                    vizType: 'array-scan',
                    array: coins,
                    currentIdx: i,
                    currentChange: currentChange,
                    status: 'Found! Cannot make ' + (currentChange + 1),
                    explanation: '❌ <strong>Gap found!</strong><br>Coin ' + coins[i] + ' > ' + (currentChange + 1) + '<br>Cannot make: <strong>' + (currentChange + 1) + '</strong>'
                });
                return steps;
            }
            currentChange += coins[i];
            steps.push({
                vizType: 'array-scan',
                array: coins,
                currentIdx: i,
                currentChange: currentChange,
                status: 'Can make 1 to ' + currentChange,
                explanation: '✅ Added coin ' + coins[i] + '<br>Can now make: 1 to ' + currentChange
            });
        }

        steps.push({
            vizType: 'array-scan',
            array: coins,
            currentChange: currentChange,
            status: 'Result: ' + (currentChange + 1),
            explanation: '✅ <strong>Complete!</strong><br>Cannot make: <strong>' + (currentChange + 1) + '</strong>'
        });

        return steps;
    }

    // Algorithm: Matrix Transpose
    function runMatrixTranspose(example, config, complexity) {
        if (!example || !example.input || !example.input.matrix) return null;
        var matrix = example.input.matrix;
        var expected = example.output;
        var steps = [];
        var rows = matrix.length;
        var cols = matrix[0].length;
        var result = [];

        for (var i = 0; i < cols; i++) {
            result.push(new Array(rows));
        }

        steps.push({
            vizType: 'matrix',
            matrix: matrix,
            result: result,
            status: 'Transpose ' + rows + 'x' + cols + ' → ' + cols + 'x' + rows,
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Original:</strong> ' + rows + 'x' + cols + '<br>' +
                '<strong>Transposed:</strong> ' + cols + 'x' + rows + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                result[j][i] = matrix[i][j];
            }
            steps.push({
                vizType: 'matrix',
                matrix: matrix,
                result: result.map(function(r) { return r.slice(); }),
                currentRow: i,
                status: 'Row ' + i + ' → Column ' + i,
                explanation: '🔄 Copying row ' + i + ' to column ' + i + '<br>result[j][' + i + '] = matrix[' + i + '][j]'
            });
        }

        steps.push({
            vizType: 'matrix',
            matrix: matrix,
            result: result,
            status: 'Complete!',
            explanation: '✅ <strong>Transposed!</strong><br>' + JSON.stringify(result)
        });

        return steps;
    }

    // Algorithm: Smallest Difference (Two Pointer)
    function runSmallestDifference(example, config, complexity) {
        if (!example || !example.input || !example.input.arrayOne || !example.input.arrayTwo) return null;
        var arr1 = example.input.arrayOne.slice().sort(function(a, b) { return a - b; });
        var arr2 = example.input.arrayTwo.slice().sort(function(a, b) { return a - b; });
        var expected = example.output;
        var steps = [];
        var i = 0, j = 0;
        var smallest = Infinity;
        var pair = [];

        steps.push({
            vizType: 'two-arrays',
            arr1: arr1,
            arr2: arr2,
            status: 'Sort both arrays',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Sorted arr1:</strong> [' + arr1.join(', ') + ']<br>' +
                '<strong>Sorted arr2:</strong> [' + arr2.join(', ') + ']<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        while (i < arr1.length && j < arr2.length) {
            var diff = Math.abs(arr1[i] - arr2[j]);
            if (diff < smallest) {
                smallest = diff;
                pair = [arr1[i], arr2[j]];
            }

            steps.push({
                vizType: 'two-arrays',
                arr1: arr1,
                arr2: arr2,
                idx1: i,
                idx2: j,
                smallest: smallest,
                pair: pair.slice(),
                status: '|' + arr1[i] + ' - ' + arr2[j] + '| = ' + diff,
                explanation: '🔍 Comparing arr1[' + i + ']=' + arr1[i] + ' and arr2[' + j + ']=' + arr2[j] + '<br>Difference: ' + diff + '<br>Best so far: ' + smallest + ' → [' + pair.join(', ') + ']'
            });

            if (arr1[i] < arr2[j]) i++;
            else if (arr1[i] > arr2[j]) j++;
            else break;

            if (steps.length > 15) break;
        }

        steps.push({
            vizType: 'two-arrays',
            arr1: arr1,
            arr2: arr2,
            pair: pair,
            smallest: smallest,
            status: 'Result: [' + pair.join(', ') + ']',
            explanation: '✅ <strong>Complete!</strong><br>Smallest difference: ' + smallest + '<br>Pair: [' + pair.join(', ') + ']'
        });

        return steps;
    }

    // Algorithm: Monotonic Array (Linear Scan)
    function runMonotonicArray(example, config, complexity) {
        if (!example || !example.input || !example.input.array) return null;
        var arr = example.input.array;
        var expected = example.output;
        var steps = [];
        var isIncreasing = true;
        var isDecreasing = true;

        steps.push({
            vizType: 'array-scan',
            array: arr,
            status: 'Check if monotonic',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Array:</strong> [' + arr.join(', ') + ']<br>' +
                '<strong>Expected:</strong> ' + expected + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > arr[i-1]) isDecreasing = false;
            if (arr[i] < arr[i-1]) isIncreasing = false;

            steps.push({
                vizType: 'array-scan',
                array: arr,
                currentIdx: i,
                isIncreasing: isIncreasing,
                isDecreasing: isDecreasing,
                status: arr[i-1] + (arr[i] > arr[i-1] ? ' < ' : arr[i] < arr[i-1] ? ' > ' : ' = ') + arr[i],
                explanation: '🔍 Compare arr[' + (i-1) + ']=' + arr[i-1] + ' and arr[' + i + ']=' + arr[i] + '<br>' +
                    'Still increasing: ' + isIncreasing + '<br>Still decreasing: ' + isDecreasing
            });

            if (!isIncreasing && !isDecreasing) break;
        }

        var result = isIncreasing || isDecreasing;
        steps.push({
            vizType: 'array-scan',
            array: arr,
            isIncreasing: isIncreasing,
            isDecreasing: isDecreasing,
            status: result ? 'Yes! Monotonic' : 'No! Not monotonic',
            explanation: result ?
                '✅ <strong>Monotonic!</strong><br>' + (isIncreasing ? 'Non-decreasing' : 'Non-increasing') :
                '❌ <strong>Not monotonic</strong><br>Array goes both up and down'
        });

        return steps;
    }

    // Algorithm: Array of Products (Prefix-Suffix)
    function runArrayOfProducts(example, config, complexity) {
        if (!example || !example.input || !example.input.array) return null;
        var arr = example.input.array;
        var expected = example.output;
        var steps = [];
        var n = arr.length;
        var result = new Array(n).fill(1);
        var prefix = 1;

        steps.push({
            vizType: 'array-products',
            array: arr,
            result: result.slice(),
            status: 'Calculate prefix products',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Array:</strong> [' + arr.join(', ') + ']<br>' +
                '<strong>Expected:</strong> [' + expected.join(', ') + ']<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Left pass
        for (var i = 0; i < n; i++) {
            result[i] = prefix;
            prefix *= arr[i];
            steps.push({
                vizType: 'array-products',
                array: arr,
                result: result.slice(),
                currentIdx: i,
                status: 'Left pass: result[' + i + '] = ' + result[i],
                explanation: '→ <strong>Left pass</strong><br>result[' + i + '] = ' + result[i] + ' (product of left elements)'
            });
        }

        // Right pass
        var suffix = 1;
        for (var i = n - 1; i >= 0; i--) {
            result[i] *= suffix;
            suffix *= arr[i];
            steps.push({
                vizType: 'array-products',
                array: arr,
                result: result.slice(),
                currentIdx: i,
                status: 'Right pass: result[' + i + '] = ' + result[i],
                explanation: '← <strong>Right pass</strong><br>result[' + i + '] = ' + result[i] + ' (multiplied by right products)'
            });
        }

        steps.push({
            vizType: 'array-products',
            array: arr,
            result: result,
            status: 'Complete!',
            explanation: '✅ <strong>Result:</strong> [' + result.join(', ') + ']'
        });

        return steps;
    }

    // Algorithm: First Duplicate Value (Index Marking)
    function runFirstDuplicateValue(example, config, complexity) {
        if (!example || !example.input || !example.input.array) return null;
        var arr = example.input.array.slice();
        var expected = example.output;
        var steps = [];

        steps.push({
            vizType: 'array-marking',
            array: arr.slice(),
            status: 'Find first duplicate',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Array:</strong> [' + arr.join(', ') + ']<br>' +
                '<strong>Expected:</strong> ' + expected + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (var i = 0; i < arr.length; i++) {
            var absVal = Math.abs(arr[i]);
            var idx = absVal - 1;

            if (arr[idx] < 0) {
                steps.push({
                    vizType: 'array-marking',
                    array: arr.slice(),
                    currentIdx: i,
                    found: absVal,
                    status: 'Found duplicate: ' + absVal,
                    explanation: '✅ <strong>Found!</strong><br>Value ' + absVal + ' seen before (arr[' + idx + '] is negative)'
                });
                return steps;
            }

            arr[idx] = -arr[idx];
            steps.push({
                vizType: 'array-marking',
                array: arr.slice(),
                currentIdx: i,
                marked: idx,
                status: 'Mark index ' + idx + ' (value ' + absVal + ')',
                explanation: '🔖 Marking index ' + idx + ' as seen (negating arr[' + idx + '])'
            });
        }

        steps.push({
            vizType: 'array-marking',
            array: arr,
            status: 'No duplicates: -1',
            explanation: '❌ <strong>No duplicates found</strong><br>Result: -1'
        });

        return steps;
    }

    // Algorithm: Merge Intervals (Sort and Merge)
    function runMergeIntervals(example, config, complexity) {
        if (!example || !example.input || !example.input.intervals) return null;
        var intervals = example.input.intervals.slice().sort(function(a, b) { return a[0] - b[0]; });
        var expected = example.output;
        var steps = [];
        var merged = [intervals[0].slice()];

        steps.push({
            vizType: 'intervals',
            intervals: intervals,
            merged: merged.slice(),
            status: 'Sort by start time',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Sorted intervals:</strong> ' + JSON.stringify(intervals) + '<br>' +
                '<strong>Expected:</strong> ' + JSON.stringify(expected) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (var i = 1; i < intervals.length; i++) {
            var last = merged[merged.length - 1];
            var curr = intervals[i];

            if (curr[0] <= last[1]) {
                last[1] = Math.max(last[1], curr[1]);
                steps.push({
                    vizType: 'intervals',
                    intervals: intervals,
                    merged: merged.map(function(m) { return m.slice(); }),
                    currentIdx: i,
                    status: 'Merge: [' + last[0] + ',' + last[1] + ']',
                    explanation: '🔗 <strong>Merge!</strong><br>[' + curr[0] + ',' + curr[1] + '] overlaps with [' + last[0] + ',' + last[1] + ']'
                });
            } else {
                merged.push(curr.slice());
                steps.push({
                    vizType: 'intervals',
                    intervals: intervals,
                    merged: merged.map(function(m) { return m.slice(); }),
                    currentIdx: i,
                    status: 'Add: [' + curr[0] + ',' + curr[1] + ']',
                    explanation: '➕ <strong>No overlap</strong><br>Add [' + curr[0] + ',' + curr[1] + '] as new interval'
                });
            }
        }

        steps.push({
            vizType: 'intervals',
            merged: merged,
            status: 'Result: ' + merged.length + ' intervals',
            explanation: '✅ <strong>Complete!</strong><br>Merged: ' + JSON.stringify(merged)
        });

        return steps;
    }

    // Algorithm: Longest Peak
    function runLongestPeak(example, config, complexity) {
        if (!example || !example.input || !example.input.array) return null;
        var arr = example.input.array;
        var expected = example.output;
        var steps = [];
        var longestPeak = 0;

        steps.push({
            vizType: 'array-peak',
            array: arr,
            status: 'Find longest peak',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Array:</strong> [' + arr.join(', ') + ']<br>' +
                '<strong>Expected:</strong> ' + expected + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (var i = 1; i < arr.length - 1; i++) {
            if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
                // Found a peak tip
                var left = i - 1;
                var right = i + 1;

                while (left > 0 && arr[left] > arr[left - 1]) left--;
                while (right < arr.length - 1 && arr[right] > arr[right + 1]) right++;

                var peakLen = right - left + 1;
                if (peakLen > longestPeak) {
                    longestPeak = peakLen;
                }

                steps.push({
                    vizType: 'array-peak',
                    array: arr,
                    peakTip: i,
                    peakStart: left,
                    peakEnd: right,
                    longestPeak: longestPeak,
                    status: 'Peak at ' + i + ', length ' + peakLen,
                    explanation: '⛰️ <strong>Peak found!</strong><br>Tip at index ' + i + ' (value ' + arr[i] + ')<br>Range: [' + left + ',' + right + '], Length: ' + peakLen + '<br>Longest so far: ' + longestPeak
                });

                i = right;
            }
        }

        steps.push({
            vizType: 'array-peak',
            array: arr,
            longestPeak: longestPeak,
            status: 'Result: ' + longestPeak,
            explanation: '✅ <strong>Complete!</strong><br>Longest peak length: ' + longestPeak
        });

        return steps;
    }

    // Algorithm: Zero Sum Subarray (Hash + Prefix Sum)
    function runZeroSumSubarray(example, config, complexity) {
        if (!example || !example.input || !example.input.nums) return null;
        var nums = example.input.nums;
        var expected = example.output;
        var steps = [];
        var prefixSum = 0;
        var seen = [0]; // Start with 0 to handle subarray from index 0
        var found = false;

        steps.push({
            array: nums.slice(),
            currentIdx: -1,
            prefixSum: 0,
            seen: seen.slice(),
            vizType: 'array-scan',
            status: 'Initialize: seen = {0}',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> nums=[' + nums.join(', ') + ']<br>' +
                '<strong>Expected:</strong> ' + expected + '<br><br>' +
                '<strong>Key Insight:</strong> If prefix sum repeats, the subarray between equals 0!<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (var i = 0; i < nums.length && !found; i++) {
            prefixSum += nums[i];

            if (seen.indexOf(prefixSum) !== -1) {
                found = true;
                steps.push({
                    array: nums.slice(),
                    currentIdx: i,
                    prefixSum: prefixSum,
                    seen: seen.slice(),
                    vizType: 'array-scan',
                    status: '✓ Found! prefixSum=' + prefixSum + ' already in seen',
                    explanation: '✅ <strong>Zero Sum Subarray Found!</strong><br><br>' +
                        '• Current index: ' + i + ', value: ' + nums[i] + '<br>' +
                        '• Prefix sum: ' + prefixSum + '<br>' +
                        '• <span style="color:#3fb950;">' + prefixSum + ' is already in seen!</span><br>' +
                        '• This means a subarray sums to 0'
                });
            } else {
                seen.push(prefixSum);
                steps.push({
                    array: nums.slice(),
                    currentIdx: i,
                    prefixSum: prefixSum,
                    seen: seen.slice(),
                    vizType: 'array-scan',
                    status: 'idx=' + i + ': prefixSum=' + prefixSum,
                    explanation: '🔍 <strong>Step ' + (i + 1) + ':</strong><br><br>' +
                        '• nums[' + i + '] = ' + nums[i] + '<br>' +
                        '• Prefix sum: ' + prefixSum + '<br>' +
                        '• Not in seen, adding to set<br>' +
                        '• seen = {' + seen.join(', ') + '}'
                });
            }
        }

        if (!found) {
            steps.push({
                array: nums.slice(),
                currentIdx: nums.length,
                prefixSum: prefixSum,
                seen: seen.slice(),
                vizType: 'array-scan',
                status: '✗ No zero sum subarray found',
                explanation: '❌ <strong>Result: false</strong><br><br>' +
                    '• Scanned entire array<br>' +
                    '• No repeated prefix sums<br>' +
                    '• No zero sum subarray exists'
            });
        }

        return steps;
    }

    // =========================================================================
    // GRAPH ALGORITHMS
    // =========================================================================

    // Helper: Flatten tree structure for graph visualization
    function flattenGraphTree(node, nodes, edges, parentId) {
        if (!node) return;
        var nodeId = node.name || node.id || ('node_' + nodes.length);
        nodes.push({ id: nodeId, label: nodeId, value: node.value });
        if (parentId !== null) {
            edges.push({ from: parentId, to: nodeId });
        }
        if (node.children) {
            node.children.forEach(function(child) {
                flattenGraphTree(child, nodes, edges, nodeId);
            });
        }
    }

    // Graph DFS Visualization
    function runGraphDFS(example, config, complexity) {
        var steps = [];
        var tree = example.input.tree || example.input.graph;
        if (!tree) return runGenericVisualization(example, config, complexity);

        // Flatten tree to nodes/edges
        var nodes = [];
        var edges = [];
        flattenGraphTree(tree, nodes, edges, null);

        var visited = [];
        var stack = [nodes[0].id];
        var result = [];

        steps.push({
            vizType: 'graph',
            nodes: nodes,
            edges: edges,
            visited: [],
            current: null,
            stack: stack.slice(),
            result: [],
            status: 'Initialize DFS',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Algorithm:</strong> Depth First Search<br>' +
                '<strong>Expected:</strong> ' + JSON.stringify(example.output) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Simulate DFS
        while (stack.length > 0 && steps.length < 20) {
            var current = stack.pop();
            if (visited.indexOf(current) !== -1) continue;

            visited.push(current);
            result.push(current);

            // Find children (edges from current)
            var children = edges
                .filter(function(e) { return e.from === current; })
                .map(function(e) { return e.to; })
                .reverse(); // Reverse so leftmost is processed first

            children.forEach(function(child) {
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
                explanation: '🔍 <strong>Visit node ' + current + '</strong><br><br>' +
                    '• Added to result<br>' +
                    '• Stack: [' + stack.join(', ') + ']<br>' +
                    '• Result: [' + result.join(' → ') + ']'
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
            explanation: '✅ <strong>DFS Complete!</strong><br><br>' +
                '• Visited all reachable nodes<br>' +
                '• Result: [' + result.join(' → ') + ']'
        });

        return steps;
    }

    // Graph BFS Visualization
    function runGraphBFS(example, config, complexity) {
        var steps = [];
        var tree = example.input.tree || example.input.graph;
        if (!tree) return runGenericVisualization(example, config, complexity);

        var nodes = [];
        var edges = [];
        flattenGraphTree(tree, nodes, edges, null);

        var visited = [];
        var queue = [nodes[0].id];
        var result = [];

        steps.push({
            vizType: 'graph',
            nodes: nodes,
            edges: edges,
            visited: [],
            current: null,
            queue: queue.slice(),
            result: [],
            status: 'Initialize BFS',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Algorithm:</strong> Breadth First Search<br>' +
                '<strong>Expected:</strong> ' + JSON.stringify(example.output) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        while (queue.length > 0 && steps.length < 20) {
            var current = queue.shift();
            if (visited.indexOf(current) !== -1) continue;

            visited.push(current);
            result.push(current);

            var children = edges
                .filter(function(e) { return e.from === current; })
                .map(function(e) { return e.to; });

            children.forEach(function(child) {
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
                explanation: '🔍 <strong>Visit node ' + current + '</strong><br><br>' +
                    '• Process level by level<br>' +
                    '• Queue: [' + queue.join(', ') + ']<br>' +
                    '• Result: [' + result.join(' → ') + ']'
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
            explanation: '✅ <strong>BFS Complete!</strong><br><br>' +
                '• Visited all reachable nodes level by level<br>' +
                '• Result: [' + result.join(' → ') + ']'
        });

        return steps;
    }

    // Generic Graph Visualization
    function runGraphGeneric(example, config, complexity) {
        var steps = [];
        var tree = example.input.tree || example.input.graph || example.input.root;
        var grid = example.input.grid || example.input.matrix || example.input.board || example.input.rooms;
        var adjList = example.input.edges || example.input.adjList; // Adjacency list format
        var arr = example.input.array || example.input.nums; // Array format for cycle detection
        var linkedList = example.input.head || example.input.list; // Linked list format
        var exchangeRates = example.input.exchangeRates; // Exchange rates matrix for arbitrage

        // Handle exchange rates matrix (for arbitrage detection)
        if (exchangeRates && Array.isArray(exchangeRates) && Array.isArray(exchangeRates[0])) {
            var currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'MXN'];
            var numCurrencies = exchangeRates.length;
            var nodes = [];
            var edges = [];

            // Create currency nodes
            for (var i = 0; i < numCurrencies; i++) {
                nodes.push({
                    id: 'currency_' + i,
                    label: currencies[i] || ('C' + i),
                    value: i
                });
            }

            // Create edges with exchange rates as weights
            for (var i = 0; i < numCurrencies; i++) {
                for (var j = 0; j < numCurrencies; j++) {
                    if (i !== j && exchangeRates[i][j] !== 1) {
                        edges.push({
                            from: 'currency_' + i,
                            to: 'currency_' + j,
                            weight: exchangeRates[i][j].toFixed(4),
                            label: exchangeRates[i][j].toFixed(4)
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
                explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                    '<strong>Algorithm:</strong> Bellman-Ford for negative cycle detection<br>' +
                    '<strong>Currencies:</strong> ' + numCurrencies + '<br>' +
                    '<strong>Input:</strong> ' + numCurrencies + 'x' + numCurrencies + ' exchange rate matrix<br>' +
                    '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            // Simulate checking for arbitrage - convert to log space and run Bellman-Ford
            var visitedSoFar = [];
            for (var i = 0; i < numCurrencies; i++) {
                visitedSoFar.push('currency_' + i);
                var currencyName = currencies[i] || ('C' + i);

                // Show rates from this currency
                var ratesFrom = [];
                for (var j = 0; j < numCurrencies; j++) {
                    if (i !== j) {
                        ratesFrom.push((currencies[j] || ('C' + j)) + ': ' + exchangeRates[i][j].toFixed(4));
                    }
                }

                steps.push({
                    vizType: 'graph',
                    nodes: nodes,
                    edges: edges,
                    visited: visitedSoFar.slice(),
                    current: 'currency_' + i,
                    queue: [],
                    status: 'Check rates from ' + currencyName,
                    explanation: '🔍 <strong>Checking exchange rates from ' + currencyName + '</strong><br><br>' +
                        'Rates: ' + ratesFrom.slice(0, 3).join(', ') + (ratesFrom.length > 3 ? '...' : '') + '<br><br>' +
                        '• Looking for cycles where product of rates > 1<br>' +
                        '• Using -log(rate) to convert to shortest path problem'
                });
            }

            // Final result
            var hasArbitrage = example.output === true;
            steps.push({
                vizType: 'graph',
                nodes: nodes,
                edges: edges,
                visited: nodes.map(function(n) { return n.id; }),
                queue: [],
                status: hasArbitrage ? 'Arbitrage Found!' : 'No Arbitrage',
                explanation: hasArbitrage ?
                    '✅ <strong>Arbitrage Opportunity Detected!</strong><br><br>' +
                    'A cycle exists where the product of exchange rates > 1<br>' +
                    'This means we can profit by trading currencies in a cycle.' :
                    '❌ <strong>No Arbitrage Opportunity</strong><br><br>' +
                    'No profitable cycle found in the exchange rate graph.'
            });

            return steps;
        }

        // Handle linked list format (e.g., floyd cycle detection on linked lists)
        if (linkedList && Array.isArray(linkedList)) {
            var nodes = linkedList.map(function(val, idx) {
                return { value: val, next: idx < linkedList.length - 1 ? idx + 1 : null };
            });

            steps.push({
                vizType: 'linked-list',
                nodes: nodes,
                current: -1,
                status: config.name,
                explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                    '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                    '<strong>Input:</strong> ' + (example.inputRaw || linkedList.join(' → ')) + '<br>' +
                    '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            // Show traversal
            for (var i = 0; i < Math.min(nodes.length, 6); i++) {
                steps.push({
                    vizType: 'linked-list',
                    nodes: nodes,
                    current: i,
                    status: 'Check node ' + linkedList[i],
                    explanation: '🔍 <strong>Processing node ' + linkedList[i] + '</strong>'
                });
            }

            steps.push({
                vizType: 'linked-list',
                nodes: nodes,
                current: -1,
                status: 'Result: ' + (example.outputRaw || JSON.stringify(example.output)),
                explanation: '✅ <strong>Result:</strong> ' + (example.outputRaw || JSON.stringify(example.output))
            });

            return steps;
        }

        // Handle 2D grid format (e.g., Number of Islands, Flood Fill)
        if (grid && Array.isArray(grid) && Array.isArray(grid[0])) {
            var rows = grid.length;
            var cols = grid[0].length;

            steps.push({
                vizType: 'matrix',
                matrix: grid,
                currentRow: -1,
                currentCol: -1,
                status: config.name,
                explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                    '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                    '<strong>Grid Size:</strong> ' + rows + ' x ' + cols + '<br>' +
                    '<strong>Input:</strong> ' + (example.inputRaw || rows + 'x' + cols + ' grid') + '<br>' +
                    '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            // Show traversal animation (visit some cells)
            var maxCells = Math.min(rows * cols, 6);
            for (var i = 0; i < maxCells; i++) {
                var r = Math.floor(i / cols) % rows;
                var c = i % cols;
                var cellVal = grid[r] && grid[r][c] !== undefined ? grid[r][c] : '?';
                steps.push({
                    vizType: 'matrix',
                    matrix: grid,
                    currentRow: r,
                    currentCol: c,
                    status: 'Checking cell (' + r + ',' + c + ')',
                    explanation: '🔍 <strong>Processing cell (' + r + ',' + c + ')</strong><br>Value: ' + cellVal
                });
            }

            steps.push({
                vizType: 'matrix',
                matrix: example.output && Array.isArray(example.output) && Array.isArray(example.output[0]) ? example.output : grid,
                currentRow: -1,
                currentCol: -1,
                status: 'Result: ' + (example.outputRaw || JSON.stringify(example.output)),
                explanation: '✅ <strong>Result:</strong> ' + (example.outputRaw || JSON.stringify(example.output))
            });

            return steps;
        }

        // Handle adjacency list format (e.g., edges = [[1,3],[2,3,4],[0],[],[2,5],[]])
        if (adjList && Array.isArray(adjList) && Array.isArray(adjList[0])) {
            var nodes = [];
            var edges = [];

            // Create nodes for each index in adjacency list
            for (var i = 0; i < adjList.length; i++) {
                nodes.push({ id: 'node_' + i, label: String(i), value: i });
            }

            // Create edges from adjacency list
            for (var i = 0; i < adjList.length; i++) {
                var neighbors = adjList[i];
                for (var j = 0; j < neighbors.length; j++) {
                    edges.push({ from: 'node_' + i, to: 'node_' + neighbors[j] });
                }
            }

            steps.push({
                vizType: 'graph',
                nodes: nodes,
                edges: edges,
                visited: [],
                queue: [],
                status: 'Graph: ' + config.name,
                explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                    '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                    '<strong>Nodes:</strong> ' + nodes.length + '<br>' +
                    '<strong>Edges:</strong> ' + edges.length + '<br>' +
                    '<strong>Input:</strong> ' + (example.inputRaw || JSON.stringify(example.input)) + '<br>' +
                    '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            // Show traversal animation
            for (var i = 0; i < Math.min(nodes.length, 8); i++) {
                var visitedSoFar = [];
                for (var k = 0; k <= i; k++) {
                    visitedSoFar.push('node_' + k);
                }
                steps.push({
                    vizType: 'graph',
                    nodes: nodes,
                    edges: edges,
                    visited: visitedSoFar,
                    current: 'node_' + i,
                    queue: [],
                    status: 'Visiting node ' + i,
                    explanation: '🔍 <strong>Processing node ' + i + '</strong><br>Checking neighbors: [' + adjList[i].join(', ') + ']'
                });
            }

            steps.push({
                vizType: 'graph',
                nodes: nodes,
                edges: edges,
                visited: nodes.map(function(n) { return n.id; }),
                queue: [],
                status: 'Result: ' + (example.outputRaw || JSON.stringify(example.output)),
                explanation: '✅ <strong>Result:</strong> ' + (example.outputRaw || JSON.stringify(example.output))
            });

            return steps;
        }

        if (tree && typeof tree === 'object') {
            var nodes = [];
            var edges = [];
            flattenGraphTree(tree, nodes, edges, null);

            steps.push({
                vizType: 'graph',
                nodes: nodes,
                edges: edges,
                visited: [],
                current: null,
                status: 'Graph: ' + config.name,
                explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                    '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                    '<strong>Nodes:</strong> ' + nodes.length + '<br>' +
                    '<strong>Expected:</strong> ' + JSON.stringify(example.output) + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            // Add progressive traversal steps
            var maxSteps = Math.min(nodes.length, 6);
            for (var i = 0; i < maxSteps; i++) {
                var visitedSoFar = nodes.slice(0, i + 1).map(function(n) { return n.id; });
                var currentNode = nodes[i];
                var nodeLabel = currentNode.label || currentNode.name || currentNode.id;
                if (typeof nodeLabel === 'object') {
                    nodeLabel = nodeLabel.name || JSON.stringify(nodeLabel);
                }

                steps.push({
                    vizType: 'graph',
                    nodes: nodes,
                    edges: edges,
                    visited: visitedSoFar,
                    current: currentNode.id,
                    status: 'Visit: ' + nodeLabel,
                    explanation: '🔍 <strong>Processing node ' + nodeLabel + '</strong><br><br>' +
                        '• Visited ' + (i + 1) + ' of ' + nodes.length + ' nodes'
                });
            }

            steps.push({
                vizType: 'graph',
                nodes: nodes,
                edges: edges,
                visited: nodes.map(function(n) { return n.id; }),
                current: null,
                status: 'Result: ' + JSON.stringify(example.output),
                explanation: '✅ <strong>Result:</strong> ' + JSON.stringify(example.output)
            });
        } else if (arr && Array.isArray(arr)) {
            // Handle array format (e.g., single-cycle-check, find-duplicate)
            steps.push({
                vizType: 'array',
                array: arr,
                current: -1,
                status: config.name,
                explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                    '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                    '<strong>Input:</strong> [' + arr.join(', ') + ']<br>' +
                    '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            // Show traversal animation
            var maxSteps = Math.min(arr.length, 8);
            for (var i = 0; i < maxSteps; i++) {
                steps.push({
                    vizType: 'array',
                    array: arr,
                    current: i,
                    status: 'Index ' + i + ': ' + arr[i],
                    explanation: '🔍 <strong>Processing index ' + i + '</strong><br>Value: ' + arr[i]
                });
            }

            steps.push({
                vizType: 'array',
                array: arr,
                current: -1,
                status: 'Result: ' + (example.outputRaw || JSON.stringify(example.output)),
                explanation: '✅ <strong>Result:</strong> ' + (example.outputRaw || JSON.stringify(example.output))
            });
        } else {
            return runGenericVisualization(example, config, complexity);
        }

        return steps;
    }

    // =========================================================================
    // LINKED LIST ALGORITHMS
    // =========================================================================

    // Linked List Remove Duplicates
    function runLinkedListRemoveDuplicates(example, config, complexity) {
        var steps = [];
        var list = example.input.list;
        if (!list || !Array.isArray(list)) return runGenericVisualization(example, config, complexity);

        var nodes = list.map(function(val, idx) {
            return { value: val, next: idx < list.length - 1 ? idx + 1 : null };
        });

        steps.push({
            vizType: 'linked-list',
            nodes: nodes.map(function(n) { return { value: n.value, next: n.next }; }),
            current: -1,
            pointers: { current: 0 },
            status: 'Initialize',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> ' + (example.inputRaw || list.join(' → ')) + '<br>' +
                '<strong>Expected:</strong> ' + (example.outputRaw || example.output.join(' → ')) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Simulate removal
        var resultNodes = [];
        var prevValue = null;
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].value !== prevValue) {
                resultNodes.push({ value: nodes[i].value, next: null });
                if (resultNodes.length > 1) {
                    resultNodes[resultNodes.length - 2].next = resultNodes.length - 1;
                }
                prevValue = nodes[i].value;

                steps.push({
                    vizType: 'linked-list',
                    nodes: nodes.map(function(n) { return { value: n.value, next: n.next }; }),
                    current: i,
                    pointers: { current: i },
                    resultNodes: resultNodes.map(function(n) { return { value: n.value, next: n.next }; }),
                    status: 'Keep: ' + nodes[i].value,
                    explanation: '✓ <strong>Keep node ' + nodes[i].value + '</strong><br>First occurrence or distinct value'
                });
            } else {
                steps.push({
                    vizType: 'linked-list',
                    nodes: nodes.map(function(n) { return { value: n.value, next: n.next }; }),
                    current: i,
                    pointers: { current: i },
                    skip: true,
                    resultNodes: resultNodes.map(function(n) { return { value: n.value, next: n.next }; }),
                    status: 'Skip: ' + nodes[i].value,
                    explanation: '✗ <strong>Skip duplicate ' + nodes[i].value + '</strong><br>Already have this value'
                });
            }
        }

        steps.push({
            vizType: 'linked-list',
            nodes: resultNodes,
            current: -1,
            pointers: {},
            status: 'Complete!',
            explanation: '✅ <strong>Duplicates removed!</strong><br><br>' +
                'Result: ' + resultNodes.map(function(n) { return n.value; }).join(' → ')
        });

        return steps;
    }

    // Linked List Reverse
    function runLinkedListReverse(example, config, complexity) {
        var steps = [];
        var list = example.input.list || example.input.head;
        if (!list || !Array.isArray(list)) return runGenericVisualization(example, config, complexity);

        var nodes = list.map(function(val, idx) {
            return { value: val, next: idx < list.length - 1 ? idx + 1 : null };
        });

        steps.push({
            vizType: 'linked-list',
            nodes: nodes.map(function(n) { return { value: n.value, next: n.next }; }),
            current: 0,
            pointers: { prev: null, current: 0, next: 1 },
            status: 'Start reversing',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> ' + list.join(' → ') + '<br>' +
                '<strong>Expected:</strong> ' + list.slice().reverse().join(' → ') + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Simulate reversal
        var reversedNodes = [];
        for (var i = list.length - 1; i >= 0; i--) {
            reversedNodes.push({ value: list[i], next: reversedNodes.length > 0 ? reversedNodes.length - 1 : null });

            steps.push({
                vizType: 'linked-list',
                nodes: nodes.map(function(n) { return { value: n.value, next: n.next }; }),
                current: list.length - 1 - i,
                pointers: { current: list.length - 1 - i },
                status: 'Reverse pointer at ' + list[list.length - 1 - i],
                explanation: '🔄 <strong>Reverse pointer</strong><br>Node ' + list[list.length - 1 - i] + ' now points backward'
            });
        }

        // Fix result nodes next pointers
        var finalNodes = list.slice().reverse().map(function(val, idx, arr) {
            return { value: val, next: idx < arr.length - 1 ? idx + 1 : null };
        });

        steps.push({
            vizType: 'linked-list',
            nodes: finalNodes,
            current: -1,
            pointers: {},
            status: 'Reversed!',
            explanation: '✅ <strong>List reversed!</strong><br><br>' +
                'Result: ' + list.slice().reverse().join(' → ')
        });

        return steps;
    }

    // Generic Linked List Visualization
    function runLinkedListGeneric(example, config, complexity) {
        var steps = [];
        var list = example.input.list || example.input.head || example.input.linkedList || example.input.initialList || example.input.list1;

        // Helper to safely get displayable value
        function getDisplayValue(val) {
            if (val === undefined || val === null) return 'null';
            if (typeof val === 'object') return val.value !== undefined ? val.value : JSON.stringify(val);
            return val;
        }

        // Handle LRU Cache operations format
        if (example.input.capacity !== undefined && example.input.operations) {
            var capacity = example.input.capacity;
            var operations = example.input.operations;
            var cache = []; // Array of {key, value} from MRU to LRU
            var cacheMap = {}; // key -> value for quick lookup
            var hits = 0;
            var misses = 0;

            steps.push({
                vizType: 'lru-cache',
                capacity: capacity,
                items: [],
                operation: 'Initialize',
                hits: 0,
                misses: 0,
                status: config.name + ' - Initialize',
                explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                    '<strong>Capacity:</strong> ' + capacity + '<br>' +
                    '<strong>Operations:</strong> ' + operations.length + ' total<br>' +
                    '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            // Process each operation
            for (var i = 0; i < operations.length; i++) {
                var op = operations[i];
                var opType = op[0];
                var key = op[1];
                var value = op.length > 2 ? op[2] : null;
                var opString = opType + '(' + key + (value !== null ? ',' + value : '') + ')';
                var newItem = -1;
                var accessedItem = -1;
                var evictingItem = -1;

                if (opType === 'put') {
                    // Check if key exists
                    var existingIdx = -1;
                    for (var j = 0; j < cache.length; j++) {
                        if (cache[j].key === key) {
                            existingIdx = j;
                            break;
                        }
                    }

                    if (existingIdx !== -1) {
                        // Update existing - move to front (MRU)
                        cache.splice(existingIdx, 1);
                        cache.unshift({ key: key, value: value });
                        accessedItem = 0;
                    } else {
                        // Add new
                        if (cache.length >= capacity) {
                            // Evict LRU (last item)
                            var evicted = cache.pop();
                            delete cacheMap[evicted.key];
                            evictingItem = cache.length;
                        }
                        cache.unshift({ key: key, value: value });
                        newItem = 0;
                    }
                    cacheMap[key] = value;

                    steps.push({
                        vizType: 'lru-cache',
                        capacity: capacity,
                        items: cache.map(function(item) { return { key: item.key, value: item.value }; }),
                        operation: opString,
                        newItem: newItem,
                        accessed: accessedItem,
                        evicting: evictingItem,
                        hits: hits,
                        misses: misses,
                        status: opString,
                        explanation: '📥 <strong>' + opString + '</strong><br><br>' +
                            (newItem !== -1 ? '• Added new entry to cache (MRU position)<br>' : '') +
                            (accessedItem !== -1 ? '• Updated existing key, moved to MRU<br>' : '') +
                            (evictingItem !== -1 ? '• Evicted LRU entry to make room<br>' : '') +
                            '• Cache size: ' + cache.length + '/' + capacity
                    });
                } else if (opType === 'get') {
                    var foundIdx = -1;
                    for (var j = 0; j < cache.length; j++) {
                        if (cache[j].key === key) {
                            foundIdx = j;
                            break;
                        }
                    }

                    var result = -1;
                    if (foundIdx !== -1) {
                        // Move to front (MRU)
                        var item = cache.splice(foundIdx, 1)[0];
                        cache.unshift(item);
                        result = item.value;
                        accessedItem = 0;
                        hits++;
                    } else {
                        misses++;
                    }

                    steps.push({
                        vizType: 'lru-cache',
                        capacity: capacity,
                        items: cache.map(function(item) { return { key: item.key, value: item.value }; }),
                        operation: opString + ' → ' + result,
                        accessed: accessedItem,
                        hits: hits,
                        misses: misses,
                        status: opString + ' → ' + result,
                        explanation: '🔍 <strong>' + opString + '</strong><br><br>' +
                            (foundIdx !== -1 ?
                                '✅ Cache HIT! Found value: ' + result + '<br>• Moved to MRU position' :
                                '❌ Cache MISS! Key not found<br>• Returned -1') +
                            '<br><br>Hits: ' + hits + ' | Misses: ' + misses
                    });
                }
            }

            // Final state
            steps.push({
                vizType: 'lru-cache',
                capacity: capacity,
                items: cache.map(function(item) { return { key: item.key, value: item.value }; }),
                operation: 'Final State',
                hits: hits,
                misses: misses,
                status: 'Complete',
                explanation: '✅ <strong>All Operations Complete!</strong><br><br>' +
                    '• Final cache: {' + cache.map(function(item) { return item.key; }).join(', ') + '}<br>' +
                    '• Total hits: ' + hits + '<br>' +
                    '• Total misses: ' + misses + '<br>' +
                    '• Hit rate: ' + (hits + misses > 0 ? ((hits / (hits + misses)) * 100).toFixed(1) : 0) + '%'
            });

            return steps;
        }

        if (list && Array.isArray(list) && list.length > 0) {
            var nodes = list.map(function(val, idx) {
                return { value: val, next: idx < list.length - 1 ? idx + 1 : null };
            });

            // Create display string for list
            var listDisplay = list.map(function(v) { return getDisplayValue(v); }).join(' → ');

            steps.push({
                vizType: 'linked-list',
                nodes: nodes,
                current: -1,
                pointers: { head: 0 },
                status: config.name,
                explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                    '<strong>Input:</strong> ' + (example.inputRaw || listDisplay) + '<br>' +
                    '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            // Special handling for middle-node problem using slow/fast pointers
            if (config.algorithm === 'll-middle') {
                // Show slow/fast pointer technique
                var slow = 0, fast = 0;

                steps.push({
                    vizType: 'linked-list',
                    nodes: nodes,
                    pointers: { slow: 0, fast: 0 },
                    status: 'Initialize pointers',
                    explanation: '🚀 <strong>Two Pointer Technique</strong><br><br>' +
                        '• <span style="color:#a855f7;">SLOW</span> pointer moves 1 step at a time<br>' +
                        '• <span style="color:#f97316;">FAST</span> pointer moves 2 steps at a time<br>' +
                        '• When FAST reaches the end, SLOW will be at the middle'
                });

                // Simulate slow/fast pointer traversal
                while (fast < nodes.length - 1 && fast + 1 < nodes.length) {
                    slow++;
                    fast += 2;
                    if (fast >= nodes.length) fast = nodes.length - 1;

                    steps.push({
                        vizType: 'linked-list',
                        nodes: nodes,
                        pointers: { slow: slow, fast: Math.min(fast, nodes.length - 1) },
                        status: 'Move pointers',
                        explanation: '🔄 <strong>Moving pointers</strong><br>' +
                            '• SLOW at index ' + slow + ' (value: ' + getDisplayValue(nodes[slow].value) + ')<br>' +
                            '• FAST at index ' + Math.min(fast, nodes.length - 1) + ' (value: ' + getDisplayValue(nodes[Math.min(fast, nodes.length - 1)].value) + ')'
                    });
                }

                // Show final result - middle node
                var middleIdx = slow;
                var middleValue = getDisplayValue(nodes[middleIdx].value);
                steps.push({
                    vizType: 'linked-list',
                    nodes: nodes,
                    pointers: { current: middleIdx },
                    status: 'Middle Node Found!',
                    explanation: '✅ <strong>Middle node found!</strong><br><br>' +
                        '• Middle node is at index ' + middleIdx + '<br>' +
                        '• Value: <strong style="color:#3fb950;">' + middleValue + '</strong><br><br>' +
                        'When FAST reaches the end, SLOW is at the middle.'
                });
            } else {
                // Generic traversal for other linked list problems
                var maxTraversal = Math.max(4, Math.min(nodes.length, 10));
                for (var i = 0; i < Math.min(nodes.length, maxTraversal); i++) {
                    var nodeValue = getDisplayValue(nodes[i].value);
                    steps.push({
                        vizType: 'linked-list',
                        nodes: nodes,
                        current: i,
                        pointers: { current: i },
                        status: 'Process node ' + nodeValue,
                        explanation: '🔍 Processing node with value <strong>' + nodeValue + '</strong>'
                    });
                }

                var outputNodes = example.output;
                if (Array.isArray(outputNodes)) {
                    var resultNodes = outputNodes.map(function(val, idx) {
                        return { value: val, next: idx < outputNodes.length - 1 ? idx + 1 : null };
                    });
                    steps.push({
                        vizType: 'linked-list',
                        nodes: resultNodes,
                        current: -1,
                        pointers: {},
                        status: 'Result',
                        explanation: '✅ <strong>Result:</strong> ' + outputNodes.join(' → ')
                    });
                } else {
                    steps.push({
                        vizType: 'linked-list',
                        nodes: nodes,
                        current: -1,
                        status: 'Result: ' + example.output,
                        explanation: '✅ <strong>Result:</strong> ' + example.output
                    });
                }
            }
        } else {
            return runGenericVisualization(example, config, complexity);
        }

        return steps;
    }

    // =========================================================================
    // BINARY TREE ALGORITHMS
    // =========================================================================

    // Helper: Flatten binary tree for visualization
    function flattenBinaryTree(node, nodes, edges, parentId, direction) {
        if (!node) return;
        var nodeId = 'node_' + nodes.length;
        nodes.push({ id: nodeId, label: String(node.value), value: node.value });
        if (parentId !== null) {
            edges.push({ from: parentId, to: nodeId, direction: direction });
        }
        flattenBinaryTree(node.left, nodes, edges, nodeId, 'left');
        flattenBinaryTree(node.right, nodes, edges, nodeId, 'right');
    }

    // Tree DFS (Branch Sums, etc.)
    function runTreeDFS(example, config, complexity) {
        var steps = [];
        var tree = example.input.tree;
        if (!tree) return runGenericVisualization(example, config, complexity);

        var nodes = [];
        var edges = [];
        flattenBinaryTree(tree, nodes, edges, null, null);

        var visited = [];
        var stack = [{ node: nodes[0], sum: nodes[0].value, path: [nodes[0].label] }];
        var branchSums = [];

        steps.push({
            vizType: 'tree',
            nodes: nodes,
            edges: edges,
            visited: [],
            current: null,
            status: 'Initialize Tree DFS',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Algorithm:</strong> Tree DFS Traversal<br>' +
                '<strong>Expected:</strong> ' + JSON.stringify(example.output) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Simulate DFS with running sum
        function dfsSimulate(nodeIdx, runningSum, path) {
            if (nodeIdx >= nodes.length || steps.length > 15) return;

            var node = nodes[nodeIdx];
            visited.push(node.id);

            // Check if leaf (no children)
            var children = edges.filter(function(e) { return e.from === node.id; });
            var isLeaf = children.length === 0;

            steps.push({
                vizType: 'tree',
                nodes: nodes,
                edges: edges,
                visited: visited.slice(),
                current: node.id,
                runningSum: runningSum,
                path: path,
                branchSums: branchSums.slice(),
                status: isLeaf ? 'Leaf! Sum=' + runningSum : 'Visit: ' + node.label,
                explanation: isLeaf ?
                    '🍃 <strong>Leaf node ' + node.label + '</strong><br>Path: ' + path.join(' → ') + '<br>Branch sum: ' + runningSum :
                    '🔍 <strong>Visit node ' + node.label + '</strong><br>Running sum: ' + runningSum
            });

            if (isLeaf) {
                branchSums.push(runningSum);
            }
        }

        // Simple traversal for visualization
        for (var i = 0; i < Math.min(nodes.length, 12); i++) {
            dfsSimulate(i, nodes.slice(0, i + 1).reduce(function(s, n) { return s + n.value; }, 0), nodes.slice(0, i + 1).map(function(n) { return n.label; }));
        }

        steps.push({
            vizType: 'tree',
            nodes: nodes,
            edges: edges,
            visited: visited,
            current: null,
            branchSums: example.output,
            status: 'Complete!',
            explanation: '✅ <strong>Tree DFS Complete!</strong><br><br>' +
                'Result: ' + JSON.stringify(example.output)
        });

        return steps;
    }

    // Tree BFS
    function runTreeBFS(example, config, complexity) {
        var steps = [];
        var tree = example.input.tree;
        if (!tree) return runGenericVisualization(example, config, complexity);

        var nodes = [];
        var edges = [];
        flattenBinaryTree(tree, nodes, edges, null, null);

        var visited = [];
        var queue = [nodes[0].id];
        var result = [];

        steps.push({
            vizType: 'tree',
            nodes: nodes,
            edges: edges,
            visited: [],
            current: null,
            queue: queue.slice(),
            status: 'Initialize Tree BFS',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Algorithm:</strong> Tree BFS (Level Order)<br>' +
                '<strong>Expected:</strong> ' + JSON.stringify(example.output) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        while (queue.length > 0 && steps.length < 15) {
            var current = queue.shift();
            var nodeData = nodes.find(function(n) { return n.id === current; });
            visited.push(current);
            result.push(nodeData.label);

            var children = edges
                .filter(function(e) { return e.from === current; })
                .map(function(e) { return e.to; });

            children.forEach(function(c) { queue.push(c); });

            steps.push({
                vizType: 'tree',
                nodes: nodes,
                edges: edges,
                visited: visited.slice(),
                current: current,
                queue: queue.slice(),
                result: result.slice(),
                status: 'Visit: ' + nodeData.label,
                explanation: '🔍 <strong>Visit node ' + nodeData.label + '</strong><br>' +
                    'Queue: [' + queue.map(function(q) { return nodes.find(function(n) { return n.id === q; }).label; }).join(', ') + ']'
            });
        }

        steps.push({
            vizType: 'tree',
            nodes: nodes,
            edges: edges,
            visited: visited,
            current: null,
            result: result,
            status: 'BFS Complete!',
            explanation: '✅ <strong>Tree BFS Complete!</strong><br>Level order: [' + result.join(', ') + ']'
        });

        return steps;
    }

    // Generic Tree Visualization
    function runTreeGeneric(example, config, complexity) {
        var steps = [];
        var tree = example.input.tree || example.input.tree1 || example.input.root;

        if (tree) {
            var nodes = [];
            var edges = [];
            flattenBinaryTree(tree, nodes, edges, null, null);

            // Step 1: Introduction
            steps.push({
                vizType: 'tree',
                nodes: nodes,
                edges: edges,
                visited: [],
                current: null,
                status: config.name,
                explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                    '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                    '<strong>Nodes:</strong> ' + nodes.length + '<br>' +
                    '<strong>Expected:</strong> ' + JSON.stringify(example.output) + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            // Step 2: Start at root
            if (nodes.length > 0) {
                steps.push({
                    vizType: 'tree',
                    nodes: nodes,
                    edges: edges,
                    visited: [],
                    current: nodes[0].id,
                    status: 'Start at root',
                    explanation: '🌳 <strong>Starting traversal</strong><br><br>' +
                        '• Begin at root node: <strong>' + (nodes[0].label || nodes[0].value || nodes[0].id) + '</strong><br>' +
                        '• Will traverse the tree according to the algorithm'
                });
            }

            // Step 3-N: Show progressive traversal (visit nodes one by one up to 6 nodes)
            var maxSteps = Math.min(nodes.length, 6);
            for (var i = 1; i <= maxSteps; i++) {
                var visitedSoFar = nodes.slice(0, i).map(function(n) { return n.id; });
                var currentNode = nodes[i - 1];
                var nodeLabel = currentNode.label || currentNode.value || currentNode.id;
                if (typeof nodeLabel === 'object') {
                    nodeLabel = nodeLabel.value || JSON.stringify(nodeLabel);
                }

                steps.push({
                    vizType: 'tree',
                    nodes: nodes,
                    edges: edges,
                    visited: visitedSoFar,
                    current: currentNode.id,
                    status: 'Visit: ' + nodeLabel,
                    explanation: '🔍 <strong>Processing node ' + nodeLabel + '</strong><br><br>' +
                        '• Visited ' + i + ' of ' + nodes.length + ' nodes<br>' +
                        '• Progress: [' + visitedSoFar.map(function(id) {
                            var n = nodes.find(function(node) { return node.id === id; });
                            var label = n ? (n.label || n.value || n.id) : id;
                            if (typeof label === 'object') label = label.value || '?';
                            return label;
                        }).join(', ') + ']'
                });
            }

            // Final step: Show all nodes as visited with result
            steps.push({
                vizType: 'tree',
                nodes: nodes,
                edges: edges,
                visited: nodes.map(function(n) { return n.id; }),
                current: null,
                status: 'Result: ' + JSON.stringify(example.output),
                explanation: '✅ <strong>Complete!</strong><br><br>' +
                    '• All nodes processed<br>' +
                    '• Result: ' + JSON.stringify(example.output)
            });
        } else {
            return runGenericVisualization(example, config, complexity);
        }

        return steps;
    }

    // =========================================================================
    // RECURSION ALGORITHMS
    // =========================================================================

    // Recursion Fibonacci with Call Stack
    function runRecursionFibonacci(example, config, complexity) {
        var steps = [];
        var n = example.input.n;
        if (n === undefined) return runGenericVisualization(example, config, complexity);

        var memo = {};
        var callStack = [];

        steps.push({
            vizType: 'recursion',
            call: 'fib(' + n + ')',
            stack: ['fib(' + n + ')'],
            memo: {},
            result: null,
            status: 'Start: fib(' + n + ')',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> n = ' + n + '<br>' +
                '<strong>Expected:</strong> ' + example.output + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Generate Fibonacci recursion tree (limited for visualization)
        function genFibSteps(n, depth) {
            if (steps.length > 12 || depth > 5) return memo[n] || 0;
            if (n <= 1) {
                memo[n] = n === 0 ? 0 : 1;
                callStack.push('fib(' + n + ')');
                steps.push({
                    vizType: 'recursion',
                    call: 'fib(' + n + ')',
                    stack: callStack.slice(),
                    memo: Object.assign({}, memo),
                    result: memo[n],
                    status: 'Base case: fib(' + n + ') = ' + memo[n],
                    explanation: '📌 <strong>Base case</strong><br>fib(' + n + ') = ' + memo[n]
                });
                callStack.pop();
                return memo[n];
            }
            if (memo[n] !== undefined) {
                steps.push({
                    vizType: 'recursion',
                    call: 'fib(' + n + ')',
                    stack: callStack.slice(),
                    memo: Object.assign({}, memo),
                    result: memo[n],
                    memoHit: true,
                    status: 'Memo hit: fib(' + n + ') = ' + memo[n],
                    explanation: '📦 <strong>Memo hit!</strong><br>fib(' + n + ') = ' + memo[n] + ' (cached)'
                });
                return memo[n];
            }

            callStack.push('fib(' + n + ')');
            steps.push({
                vizType: 'recursion',
                call: 'fib(' + n + ')',
                stack: callStack.slice(),
                memo: Object.assign({}, memo),
                result: null,
                status: 'Call: fib(' + n + ')',
                explanation: '🔄 <strong>Recursive call</strong><br>fib(' + n + ') = fib(' + (n-1) + ') + fib(' + (n-2) + ')'
            });

            var left = genFibSteps(n - 1, depth + 1);
            var right = genFibSteps(n - 2, depth + 1);
            memo[n] = left + right;

            steps.push({
                vizType: 'recursion',
                call: 'fib(' + n + ')',
                stack: callStack.slice(),
                memo: Object.assign({}, memo),
                result: memo[n],
                status: 'Return: fib(' + n + ') = ' + memo[n],
                explanation: '⬆️ <strong>Return</strong><br>fib(' + n + ') = ' + left + ' + ' + right + ' = ' + memo[n]
            });
            callStack.pop();
            return memo[n];
        }

        genFibSteps(Math.min(n, 6), 0);

        steps.push({
            vizType: 'recursion',
            call: 'fib(' + n + ')',
            stack: [],
            memo: memo,
            result: example.output,
            status: 'Result: ' + example.output,
            explanation: '✅ <strong>Result:</strong> fib(' + n + ') = ' + example.output
        });

        return steps;
    }

    // Generic Recursion Visualization
    function runRecursionGeneric(example, config, complexity) {
        var steps = [];

        // Safely get output value
        var outputVal = example.output;
        var outputStr = (outputVal !== undefined && outputVal !== null) ? JSON.stringify(outputVal) : 'N/A';

        steps.push({
            vizType: 'recursion',
            call: config.name + '()',
            stack: [config.name + '()'],
            memo: {},
            result: null,
            status: 'Recursion: ' + config.name,
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                '<strong>Input:</strong> ' + (example.inputRaw || JSON.stringify(example.input || {})) + '<br>' +
                '<strong>Expected:</strong> ' + (example.outputRaw || outputStr) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Show recursive structure
        steps.push({
            vizType: 'recursion',
            call: config.name + '(input)',
            stack: [config.name + '()', '  └─ subproblem()', '      └─ base case'],
            memo: {},
            result: null,
            status: 'Building recursive tree',
            explanation: '🔄 <strong>Recursion Pattern</strong><br>' +
                '• Break problem into subproblems<br>' +
                '• Solve subproblems recursively<br>' +
                '• Combine results'
        });

        // Add intermediate step for better animation
        steps.push({
            vizType: 'recursion',
            call: 'Processing...',
            stack: [config.name + '()', '  └─ processing...'],
            memo: {},
            result: null,
            status: 'Processing subproblems',
            explanation: '⚙️ <strong>Processing</strong><br>' +
                '• Solving each subproblem<br>' +
                '• Building up the solution'
        });

        steps.push({
            vizType: 'recursion',
            call: 'Complete',
            stack: [],
            memo: {},
            result: outputVal !== undefined ? outputVal : 'Complete',
            status: 'Result: ' + (example.outputRaw || outputStr),
            explanation: '✅ <strong>Result:</strong> ' + (example.outputRaw || outputStr)
        });

        return steps;
    }

    // Minesweeper Board Visualization
    function runMinesweeperVisualization(example, config, complexity) {
        var steps = [];
        var board = example.input.board;
        var click = example.input.click;
        var output = example.output;

        if (!board || !Array.isArray(board)) {
            return runGenericVisualization(example, config, complexity);
        }

        // Initial board state
        steps.push({
            vizType: 'matrix',
            matrix: board,
            currentRow: click ? click[0] : -1,
            currentCol: click ? click[1] : -1,
            status: config.name,
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Board Size:</strong> ' + board.length + ' x ' + board[0].length + '<br>' +
                '<strong>Click Position:</strong> [' + (click ? click.join(', ') : 'none') + ']<br>' +
                '<strong>Expected:</strong> ' + (example.outputRaw || 'Revealed board') + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Show click position
        if (click) {
            steps.push({
                vizType: 'matrix',
                matrix: board,
                currentRow: click[0],
                currentCol: click[1],
                status: 'Click at [' + click[0] + ', ' + click[1] + ']',
                explanation: '🖱️ <strong>Processing click at [' + click[0] + ', ' + click[1] + ']</strong><br>' +
                    'Cell value: <code>' + board[click[0]][click[1]] + '</code><br>' +
                    (board[click[0]][click[1]] === 'M' ? '💥 Mine clicked! Game over.' : 'Starting flood fill reveal...')
            });
        }

        // Show flood fill progress (simulated)
        steps.push({
            vizType: 'matrix',
            matrix: board,
            currentRow: -1,
            currentCol: -1,
            status: 'Revealing cells...',
            explanation: '🔄 <strong>Flood Fill in Progress</strong><br>' +
                '• Recursively reveal adjacent empty cells<br>' +
                '• Stop at cells with adjacent mines<br>' +
                '• Count adjacent mines for border cells'
        });

        // Show result
        if (output && Array.isArray(output)) {
            steps.push({
                vizType: 'matrix',
                matrix: output,
                result: output,
                currentRow: -1,
                currentCol: -1,
                status: 'Board Revealed',
                explanation: '✅ <strong>Result: ' + (example.outputRaw || 'Revealed board') + '</strong><br><br>' +
                    'Legend:<br>' +
                    '• <code>B</code> - Blank (no adjacent mines)<br>' +
                    '• <code>1-8</code> - Number of adjacent mines<br>' +
                    '• <code>M</code> - Unrevealed mine<br>' +
                    '• <code>X</code> - Revealed mine (game over)'
            });
        }

        return steps;
    }

    // =========================================================================
    // DYNAMIC PROGRAMMING ALGORITHMS
    // =========================================================================

    // DP Coin Change
    function runDPCoinChange(example, config, complexity) {
        var steps = [];
        var amount = example.input.n || example.input.amount;
        var coins = example.input.denoms || example.input.coins;
        if (amount === undefined || !coins) return runGenericVisualization(example, config, complexity);

        var dp = new Array(amount + 1).fill(Infinity);
        dp[0] = 0;

        steps.push({
            vizType: 'dp-table',
            table: [dp.slice()],
            rowHeaders: ['min coins'],
            colHeaders: Array.from({length: amount + 1}, function(_, i) { return i; }),
            computing: null,
            status: 'Initialize DP table',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Amount:</strong> ' + amount + '<br>' +
                '<strong>Coins:</strong> [' + coins.join(', ') + ']<br>' +
                '<strong>Expected:</strong> ' + example.output + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Build DP table
        for (var i = 1; i <= Math.min(amount, 10) && steps.length < 15; i++) {
            for (var j = 0; j < coins.length; j++) {
                if (coins[j] <= i) {
                    var newVal = dp[i - coins[j]] + 1;
                    if (newVal < dp[i]) {
                        dp[i] = newVal;
                    }
                }
            }

            steps.push({
                vizType: 'dp-table',
                table: [dp.slice()],
                rowHeaders: ['min coins'],
                colHeaders: Array.from({length: amount + 1}, function(_, k) { return k; }),
                computing: [0, i],
                status: 'dp[' + i + '] = ' + (dp[i] === Infinity ? '∞' : dp[i]),
                explanation: '🔍 <strong>Computing dp[' + i + ']</strong><br>' +
                    'Minimum coins for amount ' + i + ': ' + (dp[i] === Infinity ? '∞ (impossible)' : dp[i])
            });
        }

        // Complete remaining if needed
        for (var i = 11; i <= amount; i++) {
            for (var j = 0; j < coins.length; j++) {
                if (coins[j] <= i && dp[i - coins[j]] + 1 < dp[i]) {
                    dp[i] = dp[i - coins[j]] + 1;
                }
            }
        }

        steps.push({
            vizType: 'dp-table',
            table: [dp.slice(0, Math.min(amount + 1, 15))],
            rowHeaders: ['min coins'],
            colHeaders: Array.from({length: Math.min(amount + 1, 15)}, function(_, i) { return i; }),
            result: dp[amount] === Infinity ? -1 : dp[amount],
            status: 'Result: ' + (dp[amount] === Infinity ? -1 : dp[amount]),
            explanation: '✅ <strong>Result:</strong> ' + (dp[amount] === Infinity ? '-1 (impossible)' : dp[amount] + ' coins')
        });

        return steps;
    }

    // DP LCS (Longest Common Subsequence)
    function runDPLCS(example, config, complexity) {
        var steps = [];
        var str1 = example.input.str1 || example.input.s1 || '';
        var str2 = example.input.str2 || example.input.s2 || '';
        if (!str1 || !str2) return runGenericVisualization(example, config, complexity);

        var m = str1.length;
        var n = str2.length;
        var dp = [];
        for (var i = 0; i <= m; i++) {
            dp.push(new Array(n + 1).fill(0));
        }

        steps.push({
            vizType: 'dp-table',
            table: dp.map(function(row) { return row.slice(); }),
            rowHeaders: [''].concat(str1.split('')),
            colHeaders: [''].concat(str2.split('')),
            computing: null,
            status: 'Initialize LCS table',
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>String 1:</strong> "' + str1 + '"<br>' +
                '<strong>String 2:</strong> "' + str2 + '"<br>' +
                '<strong>Expected:</strong> ' + JSON.stringify(example.output) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Fill DP table
        for (var i = 1; i <= m && steps.length < 12; i++) {
            for (var j = 1; j <= n; j++) {
                if (str1[i-1] === str2[j-1]) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                }
            }

            steps.push({
                vizType: 'dp-table',
                table: dp.map(function(row) { return row.slice(); }),
                rowHeaders: [''].concat(str1.split('')),
                colHeaders: [''].concat(str2.split('')),
                row: i,
                col: n,
                char1: str1[i-1],
                match: false,
                computing: [i, n],
                status: 'Row ' + i + ': "' + str1[i-1] + '"',
                explanation: '🔍 <strong>Processing row ' + i + '</strong><br>Character: "' + str1[i-1] + '"'
            });
        }

        steps.push({
            vizType: 'dp-table',
            table: dp.map(function(row) { return row.slice(); }),
            rowHeaders: [''].concat(str1.split('')),
            colHeaders: [''].concat(str2.split('')),
            result: dp[m][n],
            status: 'LCS Length: ' + dp[m][n],
            explanation: '✅ <strong>LCS Complete!</strong><br>Longest Common Subsequence length: ' + dp[m][n]
        });

        return steps;
    }

    // Generic DP Visualization
    function runDPGeneric(example, config, complexity) {
        var steps = [];

        steps.push({
            vizType: 'dp-table',
            table: [[0, 0, 0], [0, '?', '?'], [0, '?', '?']],
            rowHeaders: ['', 'a', 'b'],
            colHeaders: ['', 'x', 'y'],
            status: config.name,
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                '<strong>Input:</strong> ' + (example.inputRaw || JSON.stringify(example.input)) + '<br>' +
                '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        steps.push({
            vizType: 'dp-table',
            table: [[0, 0, 0], [0, 1, 1], [0, 1, 2]],
            rowHeaders: ['', 'a', 'b'],
            colHeaders: ['', 'x', 'y'],
            status: 'Building DP table',
            explanation: '🔄 <strong>DP Pattern</strong><br>' +
                '• Build solution bottom-up<br>' +
                '• dp[i][j] depends on previous cells<br>' +
                '• Optimal substructure'
        });

        steps.push({
            vizType: 'dp-table',
            table: [[0, 0, 0], [0, 1, 1], [0, 1, 2]],
            rowHeaders: ['', 'a', 'b'],
            colHeaders: ['', 'x', 'y'],
            result: example.output,
            status: 'Result: ' + JSON.stringify(example.output),
            explanation: '✅ <strong>Result:</strong> ' + JSON.stringify(example.output)
        });

        return steps;
    }

    // =========================================================================
    // BST ALGORITHMS
    // =========================================================================

    // BST Search
    function runBSTSearch(example, config, complexity) {
        var steps = [];
        var tree = example.input.tree;
        var target = example.input.target;
        if (!tree || target === undefined) return runGenericVisualization(example, config, complexity);

        // Handle array representation of BST
        var nodes = [];
        var edges = [];

        if (Array.isArray(tree)) {
            // Build tree from level-order array
            tree.forEach(function(val, idx) {
                if (val !== null) {
                    nodes.push({ id: 'n' + idx, label: String(val), value: val });
                }
            });
            // Add edges based on array indices
            tree.forEach(function(val, idx) {
                if (val !== null) {
                    var leftIdx = 2 * idx + 1;
                    var rightIdx = 2 * idx + 2;
                    if (leftIdx < tree.length && tree[leftIdx] !== null) {
                        edges.push({ from: 'n' + idx, to: 'n' + leftIdx, direction: 'left' });
                    }
                    if (rightIdx < tree.length && tree[rightIdx] !== null) {
                        edges.push({ from: 'n' + idx, to: 'n' + rightIdx, direction: 'right' });
                    }
                }
            });
        } else {
            flattenBinaryTree(tree, nodes, edges, null, null);
        }

        var visited = [];
        var closest = nodes[0].value;
        var path = [];

        steps.push({
            vizType: 'tree',
            nodes: nodes,
            edges: edges,
            visited: [],
            current: null,
            target: target,
            status: 'Search for closest to ' + target,
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Target:</strong> ' + target + '<br>' +
                '<strong>Expected:</strong> ' + example.output + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Simulate BST search
        var currentIdx = 0;
        while (currentIdx < nodes.length && steps.length < 10) {
            var current = nodes[currentIdx];
            visited.push(current.id);
            path.push(current.value);

            if (Math.abs(current.value - target) < Math.abs(closest - target)) {
                closest = current.value;
            }

            steps.push({
                vizType: 'tree',
                nodes: nodes,
                edges: edges,
                visited: visited.slice(),
                current: current.id,
                target: target,
                closest: closest,
                status: 'Check ' + current.value + ', closest=' + closest,
                explanation: '🔍 <strong>Visit node ' + current.value + '</strong><br>' +
                    'Distance to ' + target + ': |' + current.value + ' - ' + target + '| = ' + Math.abs(current.value - target) + '<br>' +
                    'Closest so far: ' + closest
            });

            if (current.value === target) break;

            // Find next node
            var childEdges = edges.filter(function(e) { return e.from === current.id; });
            var nextIdx = -1;
            if (target < current.value) {
                var leftEdge = childEdges.find(function(e) { return e.direction === 'left'; });
                if (leftEdge) {
                    nextIdx = nodes.findIndex(function(n) { return n.id === leftEdge.to; });
                }
            } else {
                var rightEdge = childEdges.find(function(e) { return e.direction === 'right'; });
                if (rightEdge) {
                    nextIdx = nodes.findIndex(function(n) { return n.id === rightEdge.to; });
                }
            }

            if (nextIdx === -1) break;
            currentIdx = nextIdx;
        }

        steps.push({
            vizType: 'tree',
            nodes: nodes,
            edges: edges,
            visited: visited,
            current: null,
            target: target,
            closest: closest,
            status: 'Found: ' + closest,
            explanation: '✅ <strong>Closest value found!</strong><br>' +
                'Closest to ' + target + ' is ' + closest
        });

        return steps;
    }

    // Generic BST Visualization
    function runBSTGeneric(example, config, complexity) {
        var steps = [];
        var tree = example.input.tree;
        var arr = example.input.array || example.input.nums || example.input.preorderTraversalValues;

        // Handle Same BSTs problem with arrayOne and arrayTwo
        if (example.input.arrayOne && example.input.arrayTwo) {
            var arrayOne = example.input.arrayOne;
            var arrayTwo = example.input.arrayTwo;

            // Build a BST from arrayOne for visualization
            function buildBSTFromArray(arr) {
                if (!arr || arr.length === 0) return { nodes: [], edges: [] };

                var nodes = [];
                var edges = [];
                var nodeMap = {};

                // Helper to insert a value into BST
                function insert(val, nodeId) {
                    if (nodes.length === 0) {
                        var id = 'n0';
                        nodes.push({ id: id, label: String(val), value: val });
                        nodeMap[val] = id;
                        return;
                    }

                    var currIdx = 0;
                    while (true) {
                        var currNode = nodes[currIdx];
                        if (val < currNode.value) {
                            // Go left
                            var leftEdge = edges.find(function(e) { return e.from === currNode.id && e.direction === 'left'; });
                            if (leftEdge) {
                                currIdx = nodes.findIndex(function(n) { return n.id === leftEdge.to; });
                            } else {
                                // Insert here
                                var id = 'n' + nodes.length;
                                nodes.push({ id: id, label: String(val), value: val });
                                edges.push({ from: currNode.id, to: id, direction: 'left' });
                                nodeMap[val] = id;
                                break;
                            }
                        } else {
                            // Go right
                            var rightEdge = edges.find(function(e) { return e.from === currNode.id && e.direction === 'right'; });
                            if (rightEdge) {
                                currIdx = nodes.findIndex(function(n) { return n.id === rightEdge.to; });
                            } else {
                                // Insert here
                                var id = 'n' + nodes.length;
                                nodes.push({ id: id, label: String(val), value: val });
                                edges.push({ from: currNode.id, to: id, direction: 'right' });
                                nodeMap[val] = id;
                                break;
                            }
                        }
                    }
                }

                for (var i = 0; i < arr.length; i++) {
                    insert(arr[i], i);
                }

                return { nodes: nodes, edges: edges, nodeMap: nodeMap };
            }

            var bst1 = buildBSTFromArray(arrayOne);
            var callStack = [];

            steps.push({
                vizType: 'tree',
                nodes: bst1.nodes,
                edges: bst1.edges,
                visited: [],
                callStack: [],
                callStackHistory: [],
                status: config.name + ' - Initialize',
                explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                    '<strong>Array 1:</strong> [' + arrayOne.slice(0, 8).join(', ') + (arrayOne.length > 8 ? '...' : '') + ']<br>' +
                    '<strong>Array 2:</strong> [' + arrayTwo.slice(0, 8).join(', ') + (arrayTwo.length > 8 ? '...' : '') + ']<br>' +
                    '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            // Show BST construction from arrayOne
            callStack = ['sameBSTs(arr1, arr2)'];
            steps.push({
                vizType: 'tree',
                nodes: bst1.nodes,
                edges: bst1.edges,
                visited: bst1.nodes.map(function(n) { return n.id; }),
                callStack: callStack.slice(),
                callStackHistory: [],
                status: 'BST from Array 1',
                explanation: '🌳 <strong>BST built from Array 1</strong><br><br>' +
                    'Root: ' + arrayOne[0] + '<br>' +
                    'Insertion order: [' + arrayOne.slice(0, 6).join(' → ') + (arrayOne.length > 6 ? '...' : '') + ']'
            });

            // Compare with arrayTwo - show the comparison process step by step
            var rootNode = bst1.nodeMap[arrayOne[0]];
            var previousNodeId = null;
            var currentNodeId = rootNode;
            var nextNodeId = null;
            var callStackHistory = [];

            // Step 1: Compare roots
            callStack.push('  └─ compare roots');
            steps.push({
                vizType: 'tree',
                nodes: bst1.nodes,
                edges: bst1.edges,
                visited: bst1.nodes.map(function(n) { return n.id; }),
                current: currentNodeId,
                previous: previousNodeId,
                next: nextNodeId,
                callStack: callStack.slice(),
                callStackHistory: callStackHistory.slice(),
                status: 'Compare roots',
                explanation: '🔍 <strong>Comparing roots</strong><br><br>' +
                    '<span style="color:#3fb950;">● Current:</span> ' + arrayOne[0] + '<br>' +
                    'Array 1 root: ' + arrayOne[0] + '<br>' +
                    'Array 2 root: ' + arrayTwo[0] + '<br>' +
                    (arrayOne[0] === arrayTwo[0] ? '✅ Roots match!' : '❌ Roots differ!')
            });

            // Get smaller and bigger elements for both arrays
            var getSmaller = function(arr, val) {
                return arr.filter(function(x) { return x < val; });
            };
            var getBigger = function(arr, val) {
                return arr.filter(function(x) { return x >= val && x !== val; });
            };

            // Step 2: Recursively compare left subtrees
            var smaller1 = getSmaller(arrayOne.slice(1), arrayOne[0]);
            var smaller2 = getSmaller(arrayTwo.slice(1), arrayTwo[0]);
            callStackHistory.push(callStack.slice());
            callStack = ['sameBSTs(arr1, arr2)', '  └─ sameBSTs(smaller1, smaller2)'];

            if (smaller1.length > 0 && bst1.nodeMap[smaller1[0]]) {
                previousNodeId = currentNodeId;
                currentNodeId = bst1.nodeMap[smaller1[0]];
                var bigger1 = getBigger(arrayOne.slice(1), arrayOne[0]);
                nextNodeId = bigger1.length > 0 && bst1.nodeMap[bigger1[0]] ? bst1.nodeMap[bigger1[0]] : null;

                steps.push({
                    vizType: 'tree',
                    nodes: bst1.nodes,
                    edges: bst1.edges,
                    visited: bst1.nodes.map(function(n) { return n.id; }),
                    current: currentNodeId,
                    previous: previousNodeId,
                    next: nextNodeId,
                    callStack: callStack.slice(),
                    callStackHistory: callStackHistory.slice(),
                    status: 'Compare left subtrees',
                    explanation: '🔍 <strong>Comparing left subtrees</strong><br><br>' +
                        '<span style="color:#f0883e;">● Previous:</span> ' + arrayOne[0] + '<br>' +
                        '<span style="color:#3fb950;">● Current:</span> ' + smaller1[0] + '<br>' +
                        (nextNodeId ? '<span style="color:#58a6ff;">● Next:</span> ' + bigger1[0] + '<br>' : '') +
                        'Smaller elements from arr1: [' + smaller1.slice(0, 5).join(', ') + ']<br>' +
                        'Smaller elements from arr2: [' + smaller2.slice(0, 5).join(', ') + ']'
                });
            }

            // Step 3: Recursively compare right subtrees
            var bigger1 = getBigger(arrayOne.slice(1), arrayOne[0]);
            var bigger2 = getBigger(arrayTwo.slice(1), arrayTwo[0]);
            callStackHistory.push(callStack.slice());
            callStack = ['sameBSTs(arr1, arr2)', '  └─ sameBSTs(bigger1, bigger2)'];

            if (bigger1.length > 0 && bst1.nodeMap[bigger1[0]]) {
                previousNodeId = bst1.nodeMap[arrayOne[0]];
                currentNodeId = bst1.nodeMap[bigger1[0]];
                nextNodeId = null;

                steps.push({
                    vizType: 'tree',
                    nodes: bst1.nodes,
                    edges: bst1.edges,
                    visited: bst1.nodes.map(function(n) { return n.id; }),
                    current: currentNodeId,
                    previous: previousNodeId,
                    next: nextNodeId,
                    callStack: callStack.slice(),
                    callStackHistory: callStackHistory.slice(),
                    status: 'Compare right subtrees',
                    explanation: '🔍 <strong>Comparing right subtrees</strong><br><br>' +
                        '<span style="color:#f0883e;">● Previous:</span> ' + arrayOne[0] + '<br>' +
                        '<span style="color:#3fb950;">● Current:</span> ' + bigger1[0] + '<br>' +
                        'Bigger elements from arr1: [' + bigger1.slice(0, 5).join(', ') + ']<br>' +
                        'Bigger elements from arr2: [' + bigger2.slice(0, 5).join(', ') + ']'
                });
            }

            // Final result
            var sameBST = example.output === true;
            callStackHistory.push(callStack.slice());
            callStack = ['sameBSTs(arr1, arr2) → ' + sameBST];

            steps.push({
                vizType: 'tree',
                nodes: bst1.nodes,
                edges: bst1.edges,
                visited: bst1.nodes.map(function(n) { return n.id; }),
                callStack: callStack.slice(),
                callStackHistory: callStackHistory.slice(),
                status: sameBST ? 'Same BST!' : 'Different BSTs',
                explanation: sameBST ?
                    '✅ <strong>Both arrays produce the same BST!</strong><br><br>' +
                    'The relative ordering of elements in both arrays results in identical tree structure.<br><br>' +
                    '<strong>Key insight:</strong> For same BST, both arrays must have:<br>' +
                    '• Same root element<br>' +
                    '• Same elements smaller than root (left subtree)<br>' +
                    '• Same elements bigger than root (right subtree)' :
                    '❌ <strong>Arrays produce different BSTs!</strong><br><br>' +
                    'The different ordering causes different tree structures.'
            });

            return steps;
        }

        // If we have an array, show array visualization for array-based BST problems
        if (!tree && arr && Array.isArray(arr)) {
            steps.push({
                vizType: 'array',
                array: arr,
                current: -1,
                status: config.name,
                explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                    '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                    '<strong>Input:</strong> [' + arr.slice(0, 10).join(', ') + (arr.length > 10 ? '...' : '') + ']<br>' +
                    '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            steps.push({
                vizType: 'array',
                array: arr,
                current: -1,
                status: 'Result: ' + (example.outputRaw || JSON.stringify(example.output)),
                explanation: '✅ <strong>Result:</strong> ' + (example.outputRaw || JSON.stringify(example.output))
            });

            return steps;
        }

        if (tree) {
            var nodes = [];
            var edges = [];

            if (Array.isArray(tree)) {
                tree.forEach(function(val, idx) {
                    if (val !== null) {
                        nodes.push({ id: 'n' + idx, label: String(val), value: val });
                    }
                });
                tree.forEach(function(val, idx) {
                    if (val !== null) {
                        var leftIdx = 2 * idx + 1;
                        var rightIdx = 2 * idx + 2;
                        if (leftIdx < tree.length && tree[leftIdx] !== null) {
                            edges.push({ from: 'n' + idx, to: 'n' + leftIdx });
                        }
                        if (rightIdx < tree.length && tree[rightIdx] !== null) {
                            edges.push({ from: 'n' + idx, to: 'n' + rightIdx });
                        }
                    }
                });
            } else {
                flattenBinaryTree(tree, nodes, edges, null, null);
            }

            steps.push({
                vizType: 'tree',
                nodes: nodes,
                edges: edges,
                visited: [],
                status: 'BST: ' + config.name,
                explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                    '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                    '<strong>Input:</strong> ' + (example.inputRaw || JSON.stringify(example.input)) + '<br>' +
                    '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            steps.push({
                vizType: 'tree',
                nodes: nodes,
                edges: edges,
                visited: nodes.map(function(n) { return n.id; }),
                status: 'Result: ' + JSON.stringify(example.output),
                explanation: '✅ <strong>Result:</strong> ' + JSON.stringify(example.output)
            });
        } else {
            return runGenericVisualization(example, config, complexity);
        }

        return steps;
    }

    // =========================================================================
    // FAMOUS ALGORITHMS
    // =========================================================================

    function runFamousAlgorithm(example, config, complexity) {
        var steps = [];
        var algName = config.algorithm;

        // Handle Kruskal's/Prim's algorithm with weighted edges
        if ((algName.indexOf('kruskal') !== -1 || algName.indexOf('prim') !== -1) && example.input.V && example.input.edges) {
            var V = example.input.V;
            var weightedEdges = example.input.edges;
            var nodes = [];
            var edges = [];

            // Create nodes
            for (var i = 0; i < V; i++) {
                nodes.push({ id: 'node_' + i, label: String(i), value: i });
            }

            // Create edges with weights
            for (var i = 0; i < weightedEdges.length; i++) {
                var e = weightedEdges[i];
                edges.push({ from: 'node_' + e[0], to: 'node_' + e[1], weight: e[2] });
            }

            steps.push({
                vizType: 'graph',
                nodes: nodes,
                edges: edges,
                visited: [],
                queue: [],
                status: config.name,
                explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                    '<strong>Algorithm:</strong> ' + algName + '<br>' +
                    '<strong>Vertices:</strong> ' + V + ', <strong>Edges:</strong> ' + weightedEdges.length + '<br>' +
                    '<strong>Input:</strong> ' + (example.inputRaw || JSON.stringify(example.input)) + '<br>' +
                    '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                    '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                    '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
            });

            // Sort edges by weight for Kruskal's
            var sortedEdges = weightedEdges.slice().sort(function(a, b) { return a[2] - b[2]; });

            // Show sorting step
            steps.push({
                vizType: 'graph',
                nodes: nodes,
                edges: edges,
                visited: [],
                queue: sortedEdges.map(function(e) { return '(' + e[0] + ',' + e[1] + ')=' + e[2]; }),
                status: 'Sorting edges by weight',
                explanation: '🔄 <strong>Step 1: Sort edges by weight</strong><br>' +
                    'Sorted: ' + sortedEdges.map(function(e) { return '(' + e[0] + '-' + e[1] + ': ' + e[2] + ')'; }).join(', ')
            });

            // Show MST construction (simplified)
            var mstEdges = example.output.mstEdges || [];
            var visitedNodes = [];
            for (var i = 0; i < Math.min(mstEdges.length, 5); i++) {
                var e = mstEdges[i];
                if (visitedNodes.indexOf('node_' + e[0]) === -1) visitedNodes.push('node_' + e[0]);
                if (visitedNodes.indexOf('node_' + e[1]) === -1) visitedNodes.push('node_' + e[1]);

                steps.push({
                    vizType: 'graph',
                    nodes: nodes,
                    edges: edges,
                    visited: visitedNodes.slice(),
                    queue: ['Adding edge (' + e[0] + ',' + e[1] + ') weight=' + e[2]],
                    status: 'Adding edge to MST',
                    explanation: '🔗 <strong>Adding edge (' + e[0] + ' - ' + e[1] + ') with weight ' + e[2] + '</strong><br>' +
                        'This edge connects components without forming a cycle.'
                });
            }

            steps.push({
                vizType: 'graph',
                nodes: nodes,
                edges: edges,
                visited: nodes.map(function(n) { return n.id; }),
                queue: [],
                status: 'MST Complete - Total weight: ' + (example.output.totalWeight || ''),
                explanation: '✅ <strong>MST Complete!</strong><br>' +
                    'Edges: ' + mstEdges.map(function(e) { return '(' + e[0] + '-' + e[1] + ': ' + e[2] + ')'; }).join(', ') + '<br>' +
                    '<strong>Total weight:</strong> ' + (example.output.totalWeight || JSON.stringify(example.output))
            });

            return steps;
        }

        steps.push({
            vizType: 'famous-algorithm',
            algorithm: algName,
            status: config.name,
            explanation: '📋 <strong>' + config.name + '</strong><br><br>' +
                '<strong>Algorithm:</strong> ' + algName + '<br>' +
                '<strong>Input:</strong> ' + (example.inputRaw || JSON.stringify(example.input)) + '<br>' +
                '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Add algorithm-specific visualization based on type
        if (algName.indexOf('dijkstra') !== -1) {
            steps.push({
                vizType: 'famous-algorithm',
                algorithm: algName,
                phase: 'processing',
                status: 'Processing graph...',
                explanation: '🔍 <strong>Graph Algorithm</strong><br>' +
                    '• Processing vertices and edges<br>' +
                    '• Building optimal solution'
            });
        } else if (algName.indexOf('kadane') !== -1) {
            steps.push({
                vizType: 'famous-algorithm',
                algorithm: algName,
                phase: 'processing',
                status: 'Scanning array...',
                explanation: '🔍 <strong>Kadane\'s Algorithm</strong><br>' +
                    '• Track current sum and max sum<br>' +
                    '• Reset when sum goes negative'
            });
        } else {
            steps.push({
                vizType: 'famous-algorithm',
                algorithm: algName,
                phase: 'processing',
                status: 'Processing...',
                explanation: '🔍 <strong>Algorithm executing</strong><br>' +
                    '• Processing input data<br>' +
                    '• Building solution'
            });
        }

        steps.push({
            vizType: 'famous-algorithm',
            algorithm: algName,
            result: example.output,
            status: 'Result: ' + (example.outputRaw || JSON.stringify(example.output)),
            explanation: '✅ <strong>Result:</strong> ' + (example.outputRaw || JSON.stringify(example.output))
        });

        return steps;
    }

    // Parse examples from problem.md content
    function parseExamplesFromContent(htmlContent) {
        var examples = [];
        // Match Example blocks with Input/Output
        var exampleRegex = /\*\*Example\s*(\d+):\*\*[\s\S]*?```[\s\S]*?Input:\s*([\s\S]*?)Output:\s*([\s\S]*?)(?:Explanation:\s*([\s\S]*?))?```/gi;
        var match;

        // Try to find examples in the HTML content
        var textContent = htmlContent.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ');

        while ((match = exampleRegex.exec(textContent)) !== null) {
            var inputStr = match[2].trim();
            var outputStr = match[3].trim();
            var explanation = match[4] ? match[4].trim() : '';

            // Parse input parameters
            var parsedInput = parseInputString(inputStr);
            var parsedOutput = parseOutputString(outputStr);

            examples.push({
                number: parseInt(match[1]),
                inputRaw: inputStr,
                outputRaw: outputStr,
                explanation: explanation,
                input: parsedInput,
                output: parsedOutput
            });
        }

        // If no examples found, try alternate parsing
        if (examples.length === 0) {
            examples = parseExamplesAlternate(textContent);
        }

        return examples;
    }

    function parseInputString(inputStr) {
        var result = {};
        // Parse array = [...], targetSum = N format
        var arrayMatch = inputStr.match(/array\s*=\s*\[([\d\s,\-]+)\]/i);
        if (arrayMatch) {
            result.array = arrayMatch[1].split(',').map(function(s) { return parseInt(s.trim()); });
        }

        var targetMatch = inputStr.match(/targetSum\s*=\s*(-?\d+)/i);
        if (targetMatch) {
            result.targetSum = parseInt(targetMatch[1]);
        }

        // Parse sequence for validate subsequence
        var seqMatch = inputStr.match(/sequence\s*=\s*\[([\d\s,\-]+)\]/i);
        if (seqMatch) {
            result.sequence = seqMatch[1].split(',').map(function(s) { return parseInt(s.trim()); });
        }

        // Parse intervals
        var intervalsMatch = inputStr.match(/intervals\s*=\s*(\[\[[\d\s,\[\]]+\]\])/i);
        if (intervalsMatch) {
            try {
                result.intervals = JSON.parse(intervalsMatch[1]);
            } catch(e) {}
        }

        // Parse coins and amount for coin change
        var coinsMatch = inputStr.match(/coins\s*=\s*\[([\d\s,]+)\]/i);
        if (coinsMatch) {
            result.coins = coinsMatch[1].split(',').map(function(s) { return parseInt(s.trim()); });
        }

        var amountMatch = inputStr.match(/amount\s*=\s*(\d+)/i);
        if (amountMatch) {
            result.amount = parseInt(amountMatch[1]);
        }

        // Parse n for fibonacci
        var nMatch = inputStr.match(/n\s*=\s*(\d+)/i);
        if (nMatch) {
            result.n = parseInt(nMatch[1]);
        }

        return result;
    }

    function parseOutputString(outputStr) {
        // Try to parse as array
        var arrMatch = outputStr.match(/\[([\d\s,\-]*)\]/);
        if (arrMatch) {
            if (arrMatch[1].trim() === '') return [];
            return arrMatch[1].split(',').map(function(s) { return parseInt(s.trim()); });
        }
        // Try to parse as number
        var numMatch = outputStr.match(/^(-?\d+)$/);
        if (numMatch) {
            return parseInt(numMatch[1]);
        }
        // Try boolean
        if (outputStr.toLowerCase().includes('true')) return true;
        if (outputStr.toLowerCase().includes('false')) return false;
        return outputStr;
    }

    function parseExamplesAlternate(content) {
        var examples = [];
        // Look for code blocks with Input/Output
        var lines = content.split('\n');
        var currentExample = null;
        var inExample = false;

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (line.match(/Example\s*\d+/i)) {
                if (currentExample) examples.push(currentExample);
                currentExample = { number: examples.length + 1, input: {}, output: null, inputRaw: '', outputRaw: '' };
                inExample = true;
            } else if (inExample && line.startsWith('Input:')) {
                currentExample.inputRaw = line.replace('Input:', '').trim();
                currentExample.input = parseInputString(currentExample.inputRaw);
            } else if (inExample && line.startsWith('Output:')) {
                currentExample.outputRaw = line.replace('Output:', '').trim();
                currentExample.output = parseOutputString(currentExample.outputRaw);
            }
        }
        if (currentExample) examples.push(currentExample);
        return examples;
    }

    // Get selected example input for visualization
    function getSelectedExampleInput() {
        if (currentExamples.length > 0 && currentExamples[selectedExampleIndex]) {
            return currentExamples[selectedExampleIndex].input;
        }
        return null;
    }

    // Change selected example and reinitialize visualization
    window.selectVisualizationExample = function(index) {
        // Stop any running animation first
        window.vizPause();

        selectedExampleIndex = parseInt(index);

        // Reset visualization state
        vizState.currentStep = 0;
        vizState.isPlaying = false;

        if (currentProblem) {
            // Reinitialize with new example
            initializeVisualization(currentProblem.category, currentProblem.id);

            // Update the input/output display
            var vizContent = document.getElementById('visualization-content');
            if (vizContent && currentExamples.length > 0 && currentExamples[selectedExampleIndex]) {
                var ex = currentExamples[selectedExampleIndex];
                var inputOutputDiv = vizContent.querySelector('[style*="grid-template-columns: 1fr 1fr"]');
                if (inputOutputDiv && inputOutputDiv.parentElement) {
                    inputOutputDiv.parentElement.innerHTML =
                        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">' +
                        '<div><span style="color:#58a6ff;font-weight:600;">Input:</span> <code style="color:#3fb950;">' + (ex.inputRaw || 'N/A') + '</code></div>' +
                        '<div><span style="color:#f0883e;font-weight:600;">Expected Output:</span> <code style="color:#3fb950;">' + (ex.outputRaw || 'N/A') + '</code></div>' +
                        '</div>';
                }
            }
        }
    };

    // Actual problem data matching the filesystem
    const problemsData = {
        'arrays': [
            { id: '01-validate-subsequence', name: 'Validate Subsequence', difficulty: 'easy', tags: ['Two Pointers'] },
            { id: '02-two-number-sum', name: 'Two Number Sum', difficulty: 'easy', tags: ['Hash Map'] },
            { id: '03-sorted-squared-array', name: 'Sorted Squared Array', difficulty: 'easy', tags: ['Two Pointers'] },
            { id: '04-tournament-winner', name: 'Tournament Winner', difficulty: 'easy', tags: ['Hash Map'] },
            { id: '05-non-constructible-change', name: 'Non-Constructible Change', difficulty: 'easy', tags: ['Sorting'] },
            { id: '06-transpose-matrix', name: 'Transpose Matrix', difficulty: 'easy', tags: ['Matrix'] },
            { id: '07-three-number-sum', name: 'Three Number Sum', difficulty: 'medium', tags: ['Two Pointers', 'Sorting'] },
            { id: '08-smallest-difference', name: 'Smallest Difference', difficulty: 'medium', tags: ['Two Pointers', 'Sorting'] },
            { id: '09-move-element-to-end', name: 'Move Element To End', difficulty: 'medium', tags: ['Two Pointers'] },
            { id: '10-monotonic-array', name: 'Monotonic Array', difficulty: 'medium', tags: ['Array'] },
            { id: '11-spiral-traverse', name: 'Spiral Traverse', difficulty: 'medium', tags: ['Matrix'] },
            { id: '12-array-of-products', name: 'Array Of Products', difficulty: 'medium', tags: ['Array'] },
            { id: '13-first-duplicate-value', name: 'First Duplicate Value', difficulty: 'medium', tags: ['Array'] },
            { id: '14-merge-overlapping-intervals', name: 'Merge Overlapping Intervals', difficulty: 'medium', tags: ['Sorting'] },
            { id: '15-zero-sum-subarray', name: 'Zero Sum Subarray', difficulty: 'medium', tags: ['Hash Map'] },
            { id: '16-longest-peak', name: 'Longest Peak', difficulty: 'medium', tags: ['Array'] },
            { id: '17-four-number-sum', name: 'Four Number Sum', difficulty: 'hard', tags: ['Hash Map'] },
            { id: '18-subarray-sort', name: 'Subarray Sort', difficulty: 'hard', tags: ['Array'] },
            { id: '19-largest-range', name: 'Largest Range', difficulty: 'hard', tags: ['Hash Map'] }
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
            { id: '11-bst-iterator', name: 'BST Iterator', difficulty: 'medium', tags: ['BST', 'Stack'] },
            { id: '12-validate-three-nodes', name: 'Validate Three Nodes', difficulty: 'hard', tags: ['BST'] },
            { id: '13-repair-bst', name: 'Repair BST', difficulty: 'hard', tags: ['BST'] },
            { id: '14-sum-bsts', name: 'Sum BSTs', difficulty: 'very-hard', tags: ['BST', 'DP'] }
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
            { id: '13-symmetrical-tree', name: 'Symmetrical Tree', difficulty: 'medium', tags: ['DFS'] },
            { id: '14-evaluate-expression-tree', name: 'Evaluate Expression Tree', difficulty: 'easy', tags: ['DFS'] },
            { id: '15-find-nodes-distance-k', name: 'Find Nodes Distance K', difficulty: 'hard', tags: ['DFS', 'BFS'] },
            { id: '16-iterative-inorder-traversal', name: 'Iterative In-Order Traversal', difficulty: 'very-hard', tags: ['DFS', 'Morris'] }
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
            { id: '15-square-of-zeroes', name: 'Square of Zeroes', difficulty: 'very-hard', tags: ['DP'] },
            { id: '16-ways-to-traverse-graph', name: 'Ways To Traverse Graph', difficulty: 'medium', tags: ['DP'] },
            { id: '17-min-number-of-jumps', name: 'Min Number Of Jumps', difficulty: 'hard', tags: ['DP'] }
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
            { id: '11-detect-arbitrage', name: 'Detect Arbitrage', difficulty: 'hard', tags: ['Graph'] },
            { id: '12-boggle-board', name: 'Boggle Board', difficulty: 'hard', tags: ['DFS', 'Trie'] },
            { id: '13-largest-island', name: 'Largest Island', difficulty: 'hard', tags: ['DFS', 'Union Find'] }
        ],
        'linked-lists': [
            { id: '01-remove-duplicates', name: 'Remove Duplicates', difficulty: 'easy', tags: ['Linked List'] },
            { id: '02-middle-node', name: 'Middle Node', difficulty: 'easy', tags: ['Two Pointers'] },
            { id: '03-linked-list-construction', name: 'Linked List Construction', difficulty: 'medium', tags: ['Linked List'] },
            { id: '04-remove-kth-node', name: 'Remove Kth Node From End', difficulty: 'medium', tags: ['Two Pointers'] },
            { id: '05-sum-of-linked-lists', name: 'Sum of Linked Lists', difficulty: 'medium', tags: ['Linked List'] },
            { id: '06-find-loop', name: 'Find Loop', difficulty: 'hard', tags: ['Two Pointers'] },
            { id: '07-reverse-linked-list', name: 'Reverse Linked List', difficulty: 'medium', tags: ['Linked List'] },
            { id: '08-merge-linked-lists', name: 'Merge Linked Lists', difficulty: 'medium', tags: ['Linked List'] },
            { id: '09-shift-linked-list', name: 'Shift Linked List', difficulty: 'hard', tags: ['Linked List'] },
            { id: '10-lru-cache', name: 'LRU Cache', difficulty: 'hard', tags: ['Linked List', 'Hash Map'] },
            { id: '11-rearrange-linked-list', name: 'Rearrange Linked List', difficulty: 'hard', tags: ['Linked List'] }
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
            { id: '11-number-of-bst', name: 'Number of Binary Search Trees', difficulty: 'hard', tags: ['Recursion', 'DP'] },
            { id: '12-blackjack-probability', name: 'Blackjack Probability', difficulty: 'medium', tags: ['Recursion', 'DP'] },
            { id: '13-reveal-minesweeper', name: 'Reveal Minesweeper', difficulty: 'hard', tags: ['Recursion', 'BFS'] },
            { id: '14-lowest-common-manager', name: 'Lowest Common Manager', difficulty: 'hard', tags: ['Recursion', 'DFS'] }
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

    // Track loaded problem scripts to avoid duplicate loading
    var loadedProblemScripts = {};

    /**
     * Load problem content from JS ProblemRenderer with dynamic script loading
     * Falls back to backend fetch if JS problem not available
     */
    function loadProblemFromJS(category, problemId, similarIdx, fallbackPath) {
        var descContent = document.getElementById('description-content');

        // Helper function to render problem from ProblemRenderer
        function renderFromProblemRenderer() {
            var fullId = category + '/' + problemId;
            var problem = window.ProblemRenderer && window.ProblemRenderer.get(fullId);

            if (problem) {
                console.log('[ProblemLoader] Found problem in ProblemRenderer:', fullId);

                // Generate HTML from JS problem data
                var html = window.ProblemRenderer.renderHTML(problem);

                if (descContent) {
                    descContent.innerHTML = html;
                    // Highlight code blocks
                    if (typeof hljs !== 'undefined') {
                        descContent.querySelectorAll('pre code').forEach(function(block) {
                            hljs.highlightElement(block);
                        });
                    }
                }

                // Extract viz config from rendered HTML (contains the viz-config div)
                vizConfig = extractVizConfig(html);
                console.log('[ProblemLoader] Viz config:', vizConfig);

                // Set examples from problem data
                if (problem.examples && problem.examples.length > 0) {
                    currentExamples = problem.examples.map(function(ex, i) {
                        return {
                            number: i + 1,
                            inputRaw: window.ProblemRenderer.formatInput(ex.input),
                            outputRaw: window.ProblemRenderer.formatOutput(ex.output),
                            input: ex.input,
                            output: ex.output,
                            explanation: ex.explanation
                        };
                    });
                } else {
                    currentExamples = [];
                }
                selectedExampleIndex = 0;
                console.log('[ProblemLoader] Parsed examples:', currentExamples);

                return true;
            }
            return false;
        }

        // Helper function to fall back to backend
        function fallbackToBackend() {
            console.log('[ProblemLoader] Falling back to backend fetch:', fallbackPath);
            fetch(fallbackPath)
                .then(function(r) { return r.ok ? r.text() : '<p>Problem content loading...</p>'; })
                .then(function(html) {
                    if (descContent) {
                        descContent.innerHTML = html;
                        if (typeof hljs !== 'undefined') {
                            descContent.querySelectorAll('pre code').forEach(function(block) {
                                hljs.highlightElement(block);
                            });
                        }
                    }

                    vizConfig = extractVizConfig(html);
                    console.log('Viz config:', vizConfig);

                    if (vizConfig && vizConfig.examples) {
                        currentExamples = vizConfig.examples.map(function(ex, i) {
                            return {
                                number: i + 1,
                                inputRaw: ex.inputRaw || JSON.stringify(ex.input),
                                outputRaw: ex.outputRaw || JSON.stringify(ex.output),
                                input: ex.input,
                                output: ex.output
                            };
                        });
                    } else {
                        currentExamples = parseExamplesFromContent(html);
                    }
                    selectedExampleIndex = 0;
                    console.log('Parsed examples:', currentExamples);
                })
                .catch(function() {
                    if (descContent) descContent.innerHTML = '<p>Error loading problem content.</p>';
                    currentExamples = [];
                    vizConfig = null;
                });
        }

        // First, check if ProblemRenderer exists and has this problem
        if (window.ProblemRenderer) {
            var fullId = category + '/' + problemId;

            // Check if already registered
            if (window.ProblemRenderer.get(fullId)) {
                if (renderFromProblemRenderer()) {
                    return;
                }
            }

            // Try to dynamically load the problem JS file
            var scriptPath = '/static/js/problems/' + category + '/' + problemId + '.js';

            if (!loadedProblemScripts[scriptPath]) {
                loadedProblemScripts[scriptPath] = 'loading';
                console.log('[ProblemLoader] Loading problem script:', scriptPath);

                var script = document.createElement('script');
                script.src = scriptPath;
                script.onload = function() {
                    loadedProblemScripts[scriptPath] = 'loaded';
                    console.log('[ProblemLoader] Script loaded:', scriptPath);

                    // Give it a moment to register
                    setTimeout(function() {
                        if (!renderFromProblemRenderer()) {
                            console.log('[ProblemLoader] Problem not in renderer after script load, using backend');
                            fallbackToBackend();
                        }
                    }, 50);
                };
                script.onerror = function() {
                    loadedProblemScripts[scriptPath] = 'error';
                    console.log('[ProblemLoader] Script load failed:', scriptPath);
                    fallbackToBackend();
                };
                document.head.appendChild(script);
            } else if (loadedProblemScripts[scriptPath] === 'loaded') {
                // Script already loaded, try to render
                if (!renderFromProblemRenderer()) {
                    fallbackToBackend();
                }
            } else {
                // Script loading or errored, fall back
                fallbackToBackend();
            }
        } else {
            // No ProblemRenderer, use backend
            console.log('[ProblemLoader] ProblemRenderer not available, using backend');
            fallbackToBackend();
        }
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
            var tags = p.tags.map(function(t) { return '<span class="problem-tag" style="font-size: 0.75rem; padding: 0.2rem 0.5rem; background: #21262d; color: #8b949e; border-radius: 4px; margin-right: 0.25rem;">' + t + '</span>'; }).join('');

            // Check if this problem has similar problems in the JS registry
            var fullId = category + '/' + p.id;
            var problemData = window.ProblemRenderer ? window.ProblemRenderer.get(fullId) : null;
            var hasSimilar = problemData && problemData.similar && problemData.similar.length > 0;

            // Main problem item
            html += '<div class="problem-group" style="margin-bottom: 0.75rem;">';
            html += '<div class="problem-item" style="background: #161b22; border-radius: 8px; padding: 1rem 1.5rem; display: flex; align-items: center; gap: 1rem; border: 1px solid #30363d; transition: all 0.2s;">';

            // Problem number
            html += '<div class="problem-number" style="width: 40px; height: 40px; background: #21262d; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #58a6ff;">' + (idx + 1) + '</div>';

            // Problem info (clickable)
            html += '<div class="problem-info" onclick="window.openProblem(\'' + category + '\', \'' + p.id + '\')" style="flex: 1; cursor: pointer;" onmouseover="this.querySelector(\'.problem-name\').style.color=\'#58a6ff\'" onmouseout="this.querySelector(\'.problem-name\').style.color=\'#e6edf3\'">';
            html += '<div class="problem-name" style="font-weight: 600; color: #e6edf3; margin-bottom: 0.25rem; transition: color 0.2s;">' + p.name + '</div>';
            html += '<div class="problem-tags">' + tags + '</div>';
            html += '</div>';

            // Difficulty badge
            html += '<span class="problem-diff" style="padding: 0.4rem 0.9rem; border-radius: 1rem; font-size: 0.8rem; font-weight: 600; ' + getDifficultyClass(p.difficulty) + '">' + capitalize(p.difficulty) + '</span>';

            // Similar problems toggle button (if has similar)
            if (hasSimilar) {
                html += '<button onclick="event.stopPropagation(); toggleSimilarInList(\'' + p.id + '\')" id="similar-btn-' + p.id + '" style="background: #238636; color: white; border: none; padding: 0.4rem 0.75rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.25rem; white-space: nowrap;" title="Show related problems">';
                html += '<span style="font-size: 0.85rem;">▶</span> +' + problemData.similar.length;
                html += '</button>';
            }

            html += '</div>';

            // Similar problems container (hidden by default)
            if (hasSimilar) {
                html += '<div id="similar-list-' + p.id + '" style="display: none; margin-left: 2.5rem; margin-top: 0.5rem; border-left: 2px solid #30363d; padding-left: 1rem;">';
                html += '<div style="color: #8b949e; font-size: 0.75rem; margin-bottom: 0.5rem; padding: 0.25rem 0;">Related harder problems:</div>';

                problemData.similar.forEach(function(sim, simIdx) {
                    var simDiffStyle = getDifficultyClass(sim.difficulty.toLowerCase());
                    html += '<div class="similar-item" onclick="window.open(\'/200-problems/' + sim.id + '?category=' + category + '\', \'_blank\')" style="background: #0d1117; border-radius: 6px; padding: 0.75rem 1rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.75rem; cursor: pointer; border: 1px solid #21262d; transition: all 0.2s;" onmouseover="this.style.borderColor=\'#58a6ff\';this.style.background=\'#161b22\'" onmouseout="this.style.borderColor=\'#21262d\';this.style.background=\'#0d1117\'">';
                    html += '<span style="color: #6e7681; font-size: 0.8rem; width: 20px;">' + (simIdx + 1) + '.</span>';
                    html += '<span style="color: #c9d1d9; flex: 1; font-size: 0.9rem;">' + sim.name + '</span>';
                    html += '<span style="' + simDiffStyle + ' padding: 0.2rem 0.5rem; border-radius: 0.5rem; font-size: 0.7rem; font-weight: 600;">' + sim.difficulty + '</span>';
                    html += '<span style="color: #58a6ff; font-size: 0.9rem;">↗</span>';
                    html += '</div>';
                });

                html += '</div>';
            }

            html += '</div>'; // close problem-group
        });

        if (problems.length === 0) {
            html += '<div style="text-align:center;padding:3rem;color:#8b949e;">Problems coming soon...</div>';
        }

        html += '</div>';
        content.innerHTML = html;
        panel.classList.add('active');
    };

    // Toggle similar problems in the category list
    window.toggleSimilarInList = function(problemId) {
        var container = document.getElementById('similar-list-' + problemId);
        var btn = document.getElementById('similar-btn-' + problemId);
        if (!container || !btn) return;

        if (container.style.display === 'none') {
            container.style.display = 'block';
            btn.style.background = '#1f6feb';
            btn.querySelector('span').textContent = '▼';
        } else {
            container.style.display = 'none';
            btn.style.background = '#238636';
            btn.querySelector('span').textContent = '▶';
        }
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

        // Try to load problem from JS ProblemRenderer first
        loadProblemFromJS(category, problemId, similarIdx, basePath);

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

        // Always switch to the specified tab (default to 'problem' if none specified)
        // This ensures proper content loading for each tab
        window.showDescTab(section || 'problem');
    };

    window.hideEditor = function() {
        var editorView = document.getElementById('editor-view');
        if (editorView) editorView.classList.remove('active');
        currentProblem = null;
    };

    // Store full solutions separately for Solutions tab
    var fullSolutions = { python: '', go: '' };

    function loadProblemCode(category, problemId, similarIdx) {
        // Build base path (supports similar problems)
        var basePath = '/problems/200-must-solve/' + category + '/' + problemId;
        if (similarIdx) {
            basePath += '/similar/' + similarIdx;
        }

        // Load Python code (for Solutions tab reference only)
        fetch(basePath + '/python_code.py')
            .then(function(r) { return r.ok ? r.text() : null; })
            .then(function(code) {
                if (code) {
                    fullSolutions.python = code;
                    // Extract template from solution
                    var template = extractTemplate(code, 'python', problemId);
                    originalCode.python = template;
                    currentCode.python = template;
                } else {
                    originalCode.python = getDefaultCode('python', problemId);
                    currentCode.python = originalCode.python;
                }
                if (currentLanguage === 'python' && editor) {
                    editor.setValue(currentCode.python);
                }
            })
            .catch(function() {
                originalCode.python = getDefaultCode('python', problemId);
                currentCode.python = originalCode.python;
            });

        // Load Go code (for Solutions tab reference only)
        fetch(basePath + '/golang_code.go')
            .then(function(r) { return r.ok ? r.text() : null; })
            .then(function(code) {
                if (code) {
                    fullSolutions.go = code;
                    // Extract template from solution
                    var template = extractTemplate(code, 'go', problemId);
                    originalCode.go = template;
                    currentCode.go = template;
                } else {
                    originalCode.go = getDefaultCode('go', problemId);
                    currentCode.go = originalCode.go;
                }
                if (currentLanguage === 'go' && editor) {
                    editor.setValue(currentCode.go);
                }
            })
            .catch(function() {
                originalCode.go = getDefaultCode('go', problemId);
                currentCode.go = originalCode.go;
            });
    }

    // Extract function template from solution code (keeps signature, removes implementation)
    function extractTemplate(code, lang, problemId) {
        if (!code) return getDefaultCode(lang, problemId);

        if (lang === 'python') {
            // Find the main function definition
            var funcMatch = code.match(/^(def\s+\w+\s*\([^)]*\)(?:\s*->\s*[^:]+)?:)/m);
            if (funcMatch) {
                var funcName = funcMatch[1];
                // Get docstring if present
                var docMatch = code.match(/^def\s+\w+[^:]+:\s*\n(\s+"""[\s\S]*?"""|\s+'''[\s\S]*?''')/m);
                var docstring = docMatch ? '\n' + docMatch[1] : '';
                return funcName + docstring + '\n    # Write your solution here\n    pass\n\nif __name__ == "__main__":\n    # Test your solution\n    pass';
            }
        } else if (lang === 'go') {
            // Find the main exported function (capitalized)
            var funcMatch = code.match(/^(func\s+[A-Z]\w*\s*\([^)]*\)\s*(?:\([^)]*\)|[^{]+)?)\s*\{/m);
            if (funcMatch) {
                var funcSignature = funcMatch[1].trim();
                return 'package main\n\nimport "fmt"\n\n// ' + funcSignature.replace(/^func\s+/, '') + '\n' + funcSignature + ' {\n\t// Write your solution here\n\treturn nil\n}\n\nfunc main() {\n\t// Test your solution\n\tfmt.Println("Test")\n}';
            }
        }

        return getDefaultCode(lang, problemId);
    }

    function getDefaultCode(lang, problemId) {
        var funcName = problemId ? problemId.replace(/^\d+-/, '').replace(/-/g, '_') : 'solution';
        // Convert to appropriate case
        if (lang === 'python') {
            return 'def ' + funcName + '():\n    """\n    Write your solution here.\n    """\n    pass\n\nif __name__ == "__main__":\n    result = ' + funcName + '()\n    print(result)';
        } else {
            // Go uses PascalCase
            var goFuncName = funcName.split('_').map(function(w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join('');
            return 'package main\n\nimport "fmt"\n\nfunc ' + goFuncName + '() interface{} {\n\t// Write your solution here\n\treturn nil\n}\n\nfunc main() {\n\tresult := ' + goFuncName + '()\n\tfmt.Println(result)\n}';
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
            wrapper.innerHTML = '<textarea id="code-fallback" style="width: 100%; height: 100%; font-family: monospace; padding: 1rem; border: none; background: #fafafa; color: #333; resize: none;">' + (currentCode[currentLanguage] || getDefaultCode(currentLanguage)) + '</textarea>';
        }
    }

    // Register autocomplete hints for Python
    function registerPythonHints() {
        if (typeof CodeMirror === 'undefined' || !CodeMirror.registerHelper) return;

        var pythonKeywords = [
            'def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or',
            'True', 'False', 'None', 'class', 'import', 'from', 'as', 'try', 'except', 'finally',
            'raise', 'with', 'pass', 'break', 'continue', 'lambda', 'yield', 'global', 'nonlocal',
            'assert', 'del', 'is', 'async', 'await'
        ];
        var pythonBuiltins = [
            'print', 'len', 'range', 'list', 'dict', 'set', 'tuple', 'str', 'int', 'float', 'bool',
            'max', 'min', 'sum', 'abs', 'sorted', 'reversed', 'enumerate', 'zip', 'map', 'filter',
            'any', 'all', 'isinstance', 'type', 'input', 'open', 'append', 'extend', 'pop', 'remove',
            'insert', 'index', 'count', 'sort', 'reverse', 'copy', 'clear', 'keys', 'values', 'items',
            'get', 'update', 'add', 'discard', 'union', 'intersection', 'difference'
        ];
        var allPython = pythonKeywords.concat(pythonBuiltins);

        CodeMirror.registerHelper('hint', 'python', function(editor) {
            var cur = editor.getCursor();
            var token = editor.getTokenAt(cur);
            var start = token.start;
            var end = cur.ch;
            var word = token.string.slice(0, end - start);

            var matches = allPython.filter(function(w) {
                return w.toLowerCase().indexOf(word.toLowerCase()) === 0;
            });

            return {
                list: matches.length > 0 ? matches : allPython,
                from: CodeMirror.Pos(cur.line, start),
                to: CodeMirror.Pos(cur.line, end)
            };
        });
    }

    // Register autocomplete hints for Go
    function registerGoHints() {
        if (typeof CodeMirror === 'undefined' || !CodeMirror.registerHelper) return;

        var goKeywords = [
            'package', 'import', 'func', 'return', 'if', 'else', 'for', 'range', 'switch', 'case',
            'default', 'break', 'continue', 'var', 'const', 'type', 'struct', 'interface', 'map',
            'chan', 'go', 'defer', 'select', 'fallthrough', 'goto', 'nil', 'true', 'false', 'make',
            'new', 'append', 'copy', 'delete', 'len', 'cap', 'close', 'panic', 'recover'
        ];
        var goTypes = [
            'int', 'int8', 'int16', 'int32', 'int64', 'uint', 'uint8', 'uint16', 'uint32', 'uint64',
            'float32', 'float64', 'complex64', 'complex128', 'byte', 'rune', 'string', 'bool', 'error'
        ];
        var goBuiltins = [
            'fmt.Println', 'fmt.Printf', 'fmt.Sprintf', 'fmt.Errorf',
            'sort.Ints', 'sort.Strings', 'sort.Slice', 'sort.Search',
            'math.Max', 'math.Min', 'math.Abs', 'math.Sqrt',
            'strings.Contains', 'strings.Split', 'strings.Join', 'strings.Replace',
            'strconv.Itoa', 'strconv.Atoi'
        ];
        var allGo = goKeywords.concat(goTypes).concat(goBuiltins);

        CodeMirror.registerHelper('hint', 'go', function(editor) {
            var cur = editor.getCursor();
            var token = editor.getTokenAt(cur);
            var start = token.start;
            var end = cur.ch;
            var word = token.string.slice(0, end - start);

            var matches = allGo.filter(function(w) {
                return w.toLowerCase().indexOf(word.toLowerCase()) === 0;
            });

            return {
                list: matches.length > 0 ? matches : allGo.slice(0, 20),
                from: CodeMirror.Pos(cur.line, start),
                to: CodeMirror.Pos(cur.line, end)
            };
        });
    }

    function createCodeMirrorEditor(wrapper) {
        if (editorInitialized || !wrapper) return;

        try {
            // Register hint helpers first
            registerPythonHints();
            registerGoHints();

            editor = CodeMirror(wrapper, {
                value: currentCode[currentLanguage] || getDefaultCode(currentLanguage),
                mode: currentLanguage === 'go' ? 'text/x-go' : 'python',
                theme: 'eclipse',
                lineNumbers: true,
                indentUnit: 4,
                tabSize: 4,
                indentWithTabs: false,
                smartIndent: true,
                electricChars: true,
                matchBrackets: true,
                autoCloseBrackets: true,
                lineWrapping: false,
                foldGutter: true,
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                styleActiveLine: true,
                highlightSelectionMatches: { showToken: true },
                extraKeys: {
                    'Ctrl-Enter': function() { window.runCode(); },
                    'Cmd-Enter': function() { window.runCode(); },
                    'Ctrl-Space': function(cm) {
                        var mode = cm.getOption('mode');
                        var hintType = mode === 'text/x-go' ? 'go' : 'python';
                        cm.showHint({ hint: CodeMirror.hint[hintType], completeSingle: false });
                    },
                    'Tab': function(cm) {
                        if (cm.somethingSelected()) {
                            cm.indentSelection('add');
                        } else {
                            cm.replaceSelection('    ', 'end');
                        }
                    },
                    'Shift-Tab': function(cm) {
                        cm.indentSelection('subtract');
                    },
                    'Ctrl-/': function(cm) {
                        cm.toggleComment();
                    },
                    'Cmd-/': function(cm) {
                        cm.toggleComment();
                    },
                    'Ctrl-D': function(cm) {
                        var cursor = cm.getCursor();
                        var line = cm.getLine(cursor.line);
                        cm.replaceRange(line + '\n', {line: cursor.line, ch: 0});
                    }
                }
            });

            editor.setSize('100%', '100%');
            editor.on('change', function() {
                currentCode[currentLanguage] = editor.getValue();
            });

            // Auto-show hints on typing
            editor.on('inputRead', function(cm, change) {
                if (change.text[0].match(/[a-zA-Z_]/)) {
                    var mode = cm.getOption('mode');
                    var hintType = mode === 'text/x-go' ? 'go' : 'python';
                    if (CodeMirror.hint && CodeMirror.hint[hintType]) {
                        setTimeout(function() {
                            cm.showHint({ hint: CodeMirror.hint[hintType], completeSingle: false });
                        }, 100);
                    }
                }
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

    // Copy solution to code editor
    window.copyToEditor = function(lang) {
        var code = fullSolutions[lang];
        if (!code) {
            alert('No ' + lang + ' solution available');
            return;
        }

        // Switch to the correct language
        window.setLanguage(lang);

        // Set the code in editor
        if (editor) {
            editor.setValue(code);
            currentCode[lang] = code;
        } else {
            var fallback = document.getElementById('code-fallback');
            if (fallback) {
                fallback.value = code;
                currentCode[lang] = code;
            }
        }

        // Switch to Problem tab to show the editor
        window.showDescTab('problem');

        // Show feedback
        var output = document.getElementById('output-content');
        if (output) {
            output.innerHTML = '<div style="color:#3fb950;padding:0.5rem;">✓ ' + (lang === 'python' ? 'Python' : 'Go') + ' solution copied to editor. Press Run to execute!</div>';
        }
    };

    // Store original description content for filtering
    var originalDescription = '';

    window.showDescTab = function(tab) {
        document.querySelectorAll('.desc-tab').forEach(function(t) { t.classList.remove('active'); });
        var clickedTab = document.querySelector('.desc-tab[data-tab="' + tab + '"]');
        if (clickedTab) clickedTab.classList.add('active');

        var descContent = document.getElementById('description-content');
        var hintsContent = document.getElementById('hints-content');
        var solContent = document.getElementById('solutions-content');
        var vizContent = document.getElementById('visualization-content');
        var codePanel = document.querySelector('.code-panel');
        var descPanel = document.querySelector('.description-panel');
        var editorLayout = document.querySelector('.editor-layout');

        if (descContent) descContent.style.display = 'none';
        if (hintsContent) hintsContent.style.display = 'none';
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
            // Filter out hints section from description
            filterDescriptionContent(descContent, false);
            // Show code panel, restore split layout
            if (codePanel) codePanel.style.display = 'flex';
            if (editorLayout) editorLayout.style.gridTemplateColumns = '1fr 1fr';
        } else if (tab === 'hints' && hintsContent) {
            hintsContent.style.display = 'block';
            // Load hints content
            loadHintsContent(hintsContent);
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
        }
    };

    // Filter hints out of description content when showing Problem tab
    function filterDescriptionContent(descContent, showHints) {
        if (!descContent) return;

        // Hide any elements containing hints
        var allDetails = descContent.querySelectorAll('details');
        allDetails.forEach(function(detail) {
            var summary = detail.querySelector('summary');
            if (summary) {
                var summaryText = summary.textContent.toLowerCase();
                if (summaryText.includes('hint')) {
                    detail.style.display = showHints ? 'block' : 'none';
                }
            }
        });

        // Hide the Hints header and following content
        var allHeaders = descContent.querySelectorAll('h2, h3');
        allHeaders.forEach(function(header) {
            if (header.textContent.toLowerCase().trim() === 'hints') {
                header.style.display = 'none';
                // Hide siblings until next header
                var sibling = header.nextElementSibling;
                while (sibling && !sibling.matches('h2, h3, hr')) {
                    if (sibling.tagName === 'DETAILS') {
                        var summary = sibling.querySelector('summary');
                        if (summary && summary.textContent.toLowerCase().includes('hint')) {
                            sibling.style.display = 'none';
                        }
                    }
                    sibling = sibling.nextElementSibling;
                }
            }
        });
    }

    // Load hints content from the description
    function loadHintsContent(hintsContent) {
        if (!hintsContent) return;

        var descContent = document.getElementById('description-content');
        if (!descContent) {
            hintsContent.innerHTML = '<p style="color:#8b949e;padding:1rem;">No hints available.</p>';
            return;
        }

        // Extract hints from description
        var hints = [];
        var allDetails = descContent.querySelectorAll('details');
        allDetails.forEach(function(detail) {
            var summary = detail.querySelector('summary');
            if (summary) {
                var summaryText = summary.textContent.toLowerCase();
                if (summaryText.includes('hint')) {
                    hints.push(detail.cloneNode(true));
                }
            }
        });

        if (hints.length === 0) {
            hintsContent.innerHTML = '<div style="padding:1.5rem;"><h3 style="color:#58a6ff;margin-bottom:1rem;">💡 Hints</h3><p style="color:#8b949e;">No hints available for this problem.</p></div>';
            return;
        }

        var html = '<div style="padding:1.5rem;">';
        html += '<h3 style="color:#58a6ff;margin-bottom:1.5rem;">💡 Hints</h3>';
        html += '<div style="display:flex;flex-direction:column;gap:1rem;">';

        hints.forEach(function(hint, idx) {
            var summary = hint.querySelector('summary');
            var content = hint.innerHTML.replace(/<summary>[\s\S]*?<\/summary>/, '');
            html += '<div style="background:#21262d;border-radius:8px;padding:1rem;border:1px solid #30363d;">';
            html += '<div style="display:flex;align-items:center;gap:0.5rem;cursor:pointer;color:#c9d1d9;" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === \'none\' ? \'block\' : \'none\'; this.querySelector(\'.hint-arrow\').textContent = this.nextElementSibling.style.display === \'none\' ? \'▶\' : \'▼\';">';
            html += '<span class="hint-arrow" style="color:#58a6ff;">▶</span>';
            html += '<span style="font-weight:600;">Hint ' + (idx + 1) + '</span>';
            html += '</div>';
            html += '<div style="display:none;margin-top:1rem;color:#c9d1d9;line-height:1.6;">' + content + '</div>';
            html += '</div>';
        });

        html += '</div></div>';
        hintsContent.innerHTML = html;
    }

    // Filter out test code from solution (remove if __name__ == "__main__" and func main())
    function filterSolutionCode(code, lang) {
        if (!code) return code;

        if (lang === 'python') {
            // Remove if __name__ == "__main__": block and everything after
            var mainMatch = code.match(/^([\s\S]*?)(\n\s*if\s+__name__\s*==\s*["']__main__["']\s*:[\s\S]*$)/m);
            if (mainMatch) {
                code = mainMatch[1].trim();
            }
            // Also remove standalone run_tests() calls
            code = code.replace(/\n\s*run_tests\(\)\s*$/gm, '').trim();
        } else if (lang === 'go') {
            // Remove func main() block
            var lines = code.split('\n');
            var result = [];
            var inMain = false;
            var braceCount = 0;

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                if (line.match(/^func\s+main\s*\(\s*\)/)) {
                    inMain = true;
                    braceCount = 0;
                }

                if (inMain) {
                    braceCount += (line.match(/{/g) || []).length;
                    braceCount -= (line.match(/}/g) || []).length;
                    if (braceCount <= 0 && line.includes('}')) {
                        inMain = false;
                    }
                    continue;
                }
                result.push(line);
            }
            code = result.join('\n').trim();
        }

        return code;
    }

    function loadSolutions() {
        if (!currentProblem) return;
        var solContent = document.getElementById('solutions-content');
        if (!solContent) return;

        solContent.innerHTML = '<div style="color:#666;padding:1rem;">Loading solutions...</div>';

        var basePath = '/problems/200-must-solve/' + currentProblem.category + '/' + currentProblem.id;
        if (currentProblem.similarIdx) {
            basePath += '/similar/' + currentProblem.similarIdx;
        }

        // Load both Python and Go solutions
        Promise.all([
            fetch(basePath + '/python_code.py').then(function(r) { return r.ok ? r.text() : null; }),
            fetch(basePath + '/golang_code.go').then(function(r) { return r.ok ? r.text() : null; })
        ]).then(function(results) {
            var pythonCode = filterSolutionCode(results[0], 'python');
            var goCode = filterSolutionCode(results[1], 'go');

            var html = '<div style="display:flex;flex-direction:column;gap:1.5rem;">';

            // Python Solution
            html += '<div style="background:#f8f9fa;border-radius:8px;padding:1rem;border:1px solid #e0e0e0;">';
            html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">';
            html += '<h3 style="color:#306998;margin:0;font-size:1rem;display:flex;align-items:center;gap:0.5rem;">🐍 Python Solution</h3>';
            if (pythonCode) {
                html += '<button onclick="window.copyToEditor(\'python\')" style="background:#306998;color:white;border:none;padding:0.4rem 0.8rem;border-radius:4px;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;gap:0.3rem;">📋 Copy to Editor</button>';
            }
            html += '</div>';
            if (pythonCode) {
                html += '<pre style="background:#282c34;color:#abb2bf;padding:1rem;border-radius:6px;overflow-x:auto;max-height:400px;overflow-y:auto;margin:0;font-size:0.85rem;line-height:1.5;"><code class="language-python">' + escapeHtml(pythonCode) + '</code></pre>';
            } else {
                html += '<p style="color:#888;margin:0;">No Python solution available.</p>';
            }
            html += '</div>';

            // Go Solution
            html += '<div style="background:#f0f5f9;border-radius:8px;padding:1rem;border:1px solid #e0e0e0;">';
            html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">';
            html += '<h3 style="color:#00ADD8;margin:0;font-size:1rem;display:flex;align-items:center;gap:0.5rem;">🔵 Go Solution</h3>';
            if (goCode) {
                html += '<button onclick="window.copyToEditor(\'go\')" style="background:#00ADD8;color:white;border:none;padding:0.4rem 0.8rem;border-radius:4px;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;gap:0.3rem;">📋 Copy to Editor</button>';
            }
            html += '</div>';
            if (goCode) {
                html += '<pre style="background:#282c34;color:#abb2bf;padding:1rem;border-radius:6px;overflow-x:auto;max-height:400px;overflow-y:auto;margin:0;font-size:0.85rem;line-height:1.5;"><code class="language-go">' + escapeHtml(goCode) + '</code></pre>';
            } else {
                html += '<p style="color:#888;margin:0;">No Go solution available.</p>';
            }
            html += '</div>';

            html += '</div>';
            solContent.innerHTML = html;

            // Apply syntax highlighting
            if (typeof hljs !== 'undefined') {
                solContent.querySelectorAll('pre code').forEach(function(block) {
                    hljs.highlightElement(block);
                });
            }
        }).catch(function(err) {
            solContent.innerHTML = '<p style="color:#c62828;padding:1rem;">Error loading solutions: ' + err.message + '</p>';
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

        // Build example selector dropdown with distinct labels
        var exampleSelectorHtml = '';
        if (currentExamples.length > 0) {
            exampleSelectorHtml = '<select id="viz-example-selector" onchange="window.selectVisualizationExample(this.value)" ' +
                'style="background:#21262d;color:#c9d1d9;border:1px solid #30363d;padding:0.4rem 0.6rem;border-radius:4px;font-size:0.85rem;cursor:pointer;max-width:250px;">';
            for (var i = 0; i < currentExamples.length; i++) {
                var ex = currentExamples[i];
                var label = 'Ex ' + (i + 1);

                // Create distinctive labels showing both key input AND output
                var inputPart = '';
                var outputPart = '';

                // Get distinctive input part
                if (ex.inputRaw) {
                    var inStr = ex.inputRaw.toString();
                    // Try to extract the most distinctive part
                    if (inStr.includes('sequence=')) {
                        var seqMatch = inStr.match(/sequence=\[([^\]]{0,15})/);
                        if (seqMatch) inputPart = 'seq=[' + seqMatch[1] + (seqMatch[1].length >= 15 ? '...' : '') + ']';
                    } else if (inStr.includes('targetSum=')) {
                        var targetMatch = inStr.match(/targetSum=(\d+)/);
                        if (targetMatch) inputPart = 'target=' + targetMatch[1];
                    } else if (inStr.includes('toMove=')) {
                        var moveMatch = inStr.match(/toMove=(\d+)/);
                        if (moveMatch) inputPart = 'move=' + moveMatch[1];
                    } else {
                        // Generic: show first 15 chars
                        inputPart = inStr.length > 15 ? inStr.substring(0, 15) + '...' : inStr;
                    }
                }

                // Get output part
                if (ex.outputRaw !== undefined && ex.outputRaw !== null) {
                    var outStr = ex.outputRaw.toString();
                    outputPart = outStr.length > 12 ? outStr.substring(0, 12) + '...' : outStr;
                } else if (ex.output !== undefined && ex.output !== null) {
                    var outStr2 = JSON.stringify(ex.output);
                    outputPart = outStr2.length > 12 ? outStr2.substring(0, 12) + '...' : outStr2;
                }

                // Build label
                if (inputPart && outputPart) {
                    label += ': ' + inputPart + ' → ' + outputPart;
                } else if (outputPart) {
                    label += ' → ' + outputPart;
                } else if (inputPart) {
                    label += ': ' + inputPart;
                }

                exampleSelectorHtml += '<option value="' + i + '"' + (i === selectedExampleIndex ? ' selected' : '') + '>' + escapeHtml(label) + '</option>';
            }
            exampleSelectorHtml += '</select>';
        }

        // Show current input/output info
        var inputOutputHtml = '';
        if (currentExamples.length > 0 && currentExamples[selectedExampleIndex]) {
            var ex = currentExamples[selectedExampleIndex];
            inputOutputHtml = '<div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:0.75rem;margin-bottom:1rem;font-size:0.85rem;">' +
                '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">' +
                '<div><span style="color:#58a6ff;font-weight:600;">Input:</span> <code style="color:#3fb950;">' + (ex.inputRaw || 'N/A') + '</code></div>' +
                '<div><span style="color:#f0883e;font-weight:600;">Expected Output:</span> <code style="color:#3fb950;">' + (ex.outputRaw || 'N/A') + '</code></div>' +
                '</div></div>';
        }

        return '<div style="background:#0d1117;border-radius:12px;padding:1rem;color:#c9d1d9;">' +
            // Header with controls on same row
            '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:0.5rem;">' +
            '<div style="display:flex;align-items:center;gap:0.5rem;">' +
            '<span style="color:#58a6ff;font-weight:600;">🎯 ' + animType + '</span>' +
            exampleSelectorHtml +
            '<span id="viz-step-counter" style="color:#8b949e;font-size:0.9rem;">Step 0 / 0</span>' +
            '</div>' +
            // Controls
            '<div style="display:flex;align-items:center;gap:0.5rem;">' +
            '<button onclick="window.vizStepBack()" style="background:#21262d;color:#c9d1d9;border:1px solid #30363d;padding:0.4rem 0.8rem;border-radius:4px;cursor:pointer;font-size:0.85rem;">◀</button>' +
            '<button onclick="window.vizPlay()" id="viz-play-btn" style="background:#238636;color:white;border:none;padding:0.4rem 0.8rem;border-radius:4px;cursor:pointer;font-size:0.85rem;">▶ Play</button>' +
            '<button onclick="window.vizPause()" id="viz-pause-btn" style="background:#6e7681;color:white;border:none;padding:0.4rem 0.8rem;border-radius:4px;cursor:pointer;font-size:0.85rem;">⏸</button>' +
            '<button onclick="window.vizStepForward()" style="background:#21262d;color:#c9d1d9;border:1px solid #30363d;padding:0.4rem 0.8rem;border-radius:4px;cursor:pointer;font-size:0.85rem;">▶</button>' +
            '<button onclick="window.vizReset()" style="background:#21262d;color:#c9d1d9;border:1px solid #30363d;padding:0.4rem 0.8rem;border-radius:4px;cursor:pointer;font-size:0.85rem;">↻</button>' +
            '<input type="range" id="viz-speed" min="100" max="2000" value="1000" style="width:80px;accent-color:#58a6ff;" onchange="window.vizSetSpeed(this.value)">' +
            '</div></div>' +

            // Input/Output display
            inputOutputHtml +

            // Progress Bar
            '<div style="background:#21262d;border-radius:4px;height:4px;overflow:hidden;margin-bottom:1rem;">' +
            '<div id="viz-progress-bar" style="width:0%;height:100%;background:linear-gradient(90deg,#238636,#58a6ff);transition:width 0.3s;"></div></div>' +

            // Main content: 2-column layout (Visualization Left, Call Stack Right)
            '<div style="display:grid;grid-template-columns:2fr 1fr;gap:1rem;margin-bottom:1rem;">' +

            // LEFT: Visualization Area
            '<div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:1rem;min-height:250px;">' +
            '<div style="color:#58a6ff;font-size:0.8rem;margin-bottom:0.5rem;font-weight:600;">VISUALIZATION</div>' +
            '<div id="viz-main-area"></div>' +
            '<div id="viz-status" style="color:#8b949e;margin-top:0.5rem;font-family:monospace;font-size:0.85rem;"></div>' +
            '</div>' +

            // RIGHT: Call Stack
            '<div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:1rem;min-height:250px;">' +
            '<div style="color:#f0883e;font-size:0.8rem;margin-bottom:0.5rem;font-weight:600;">📚 CALL STACK / STATE</div>' +
            '<div id="viz-call-stack" style="display:flex;flex-direction:column;gap:0.5rem;"></div>' +
            '</div>' +

            '</div>' +

            // BOTTOM: Full-width Explanation
            '<div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:1rem;">' +
            '<div style="color:#3fb950;font-size:0.8rem;margin-bottom:0.5rem;font-weight:600;">📝 STEP EXPLANATION</div>' +
            '<div id="viz-explanation" style="color:#c9d1d9;line-height:1.6;"></div>' +
            '</div>' +

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

        // Try to generate steps from embedded viz-config first
        if (vizConfig) {
            try {
                var configSteps = generateStepsFromConfig(vizConfig, selectedExampleIndex);
                if (configSteps && configSteps.length > 0) {
                    vizState.steps = configSteps;
                    vizState.totalSteps = configSteps.length;
                    vizState.currentStep = 0;
                    updateVisualization();
                    updateCallStack();
                    return;
                }
            } catch (e) {
                console.error('[VizConfig] Error generating steps from config:', e);
            }
        }

        // Fallback to hardcoded step generators
        try {
            vizState.steps = generateSteps(category, problemId);
        } catch (e) {
            console.error('[Viz] Error generating steps:', e);
            vizState.steps = [];
        }

        // Ensure we always have at least one step
        if (vizState.steps.length === 0) {
            vizState.steps = [{
                vizType: 'generic',
                status: 'Visualization loading...',
                explanation: '<p style="color:#8b949e;">Select an example and click Play to start the visualization.</p>'
            }];
        }

        vizState.totalSteps = vizState.steps.length;
        vizState.currentStep = 0;

        updateVisualization();
        updateCallStack();
    }

    // Problem-specific visualization configurations with complexity info
    var problemVisualizations = {
        // Arrays
        '01-validate-subsequence': {
            name: 'Validate Subsequence',
            complexity: { time: 'O(n)', space: 'O(1)' },
            generator: function() { return generateValidateSubsequenceSteps(); }
        },
        '02-two-number-sum': {
            name: 'Two Number Sum',
            complexity: { time: 'O(n)', space: 'O(n)' },
            generator: function() { return generateTwoNumberSumSteps(); }
        },
        '03-sorted-squared-array': {
            name: 'Sorted Squared Array',
            complexity: { time: 'O(n)', space: 'O(n)' },
            generator: function() { return generateSortedSquaredSteps(); }
        },
        '04-tournament-winner': {
            name: 'Tournament Winner',
            complexity: { time: 'O(n)', space: 'O(k)' },
            generator: function() { return generateTournamentWinnerSteps(); }
        },
        '05-non-constructible-change': {
            name: 'Non-Constructible Change',
            complexity: { time: 'O(n log n)', space: 'O(1)' },
            generator: function() { return generateNonConstructibleChangeSteps(); }
        },
        '07-three-number-sum': {
            name: 'Three Number Sum',
            complexity: { time: 'O(n²)', space: 'O(n)' },
            generator: function() { return generateThreeNumberSumSteps(); }
        },
        '09-move-element-to-end': {
            name: 'Move Element To End',
            complexity: { time: 'O(n)', space: 'O(1)' },
            generator: function() { return generateMoveElementSteps(); }
        },
        '11-spiral-traverse': {
            name: 'Spiral Traverse',
            complexity: { time: 'O(n)', space: 'O(n)' },
            generator: function() { return generateSpiralTraverseSteps(); }
        },
        '12-array-of-products': {
            name: 'Array of Products',
            complexity: { time: 'O(n)', space: 'O(n)' },
            generator: function() { return generateArrayOfProductsSteps(); }
        },
        '14-merge-overlapping-intervals': {
            name: 'Merge Overlapping Intervals',
            complexity: { time: 'O(n log n)', space: 'O(n)' },
            generator: function() { return generateMergeIntervalsSteps(); }
        },
        // Binary Search Trees
        '01-find-closest-value': {
            name: 'Find Closest Value in BST',
            complexity: { time: 'O(log n) avg, O(n) worst', space: 'O(1)' },
            generator: function() { return generateFindClosestValueSteps(); }
        },
        '03-validate-bst': {
            name: 'Validate BST',
            complexity: { time: 'O(n)', space: 'O(d)' },
            generator: function() { return generateValidateBSTSteps(); }
        },
        // Binary Trees
        '01-branch-sums': {
            name: 'Branch Sums',
            complexity: { time: 'O(n)', space: 'O(n)' },
            generator: function() { return generateBranchSumsSteps(); }
        },
        '03-invert-tree': {
            name: 'Invert Binary Tree',
            complexity: { time: 'O(n)', space: 'O(d)' },
            generator: function() { return generateInvertTreeSteps(); }
        },
        // Linked Lists
        '02-middle-node': {
            name: 'Middle Node',
            complexity: { time: 'O(n)', space: 'O(1)' },
            generator: function() { return generateMiddleNodeSteps(); }
        },
        '07-reverse-linked-list': {
            name: 'Reverse Linked List',
            complexity: { time: 'O(n)', space: 'O(1)' },
            generator: function() { return generateReverseLinkedListSteps(); }
        },
        // DP
        '01-max-subset-sum': {
            name: 'Max Subset Sum No Adjacent',
            complexity: { time: 'O(n)', space: 'O(1)' },
            generator: function() { return generateMaxSubsetSumSteps(); }
        },
        '03-min-coins': {
            name: 'Min Number of Coins',
            complexity: { time: 'O(n × d)', space: 'O(n)' },
            generator: function() { return generateMinCoinsSteps(); }
        },
        // Graphs
        '01-depth-first-search': {
            name: 'Depth First Search',
            complexity: { time: 'O(V + E)', space: 'O(V)' },
            generator: function() { return generateDFSSteps(); }
        },
        '02-breadth-first-search': {
            name: 'Breadth First Search',
            complexity: { time: 'O(V + E)', space: 'O(V)' },
            generator: function() { return generateBFSSteps(); }
        },
        '03-topological-sort': {
            name: 'Topological Sort',
            complexity: { time: 'O(V + E)', space: 'O(V)' },
            generator: function() { return generateTopologicalSortSteps(); }
        },
        '02-dijkstras-algorithm': {
            name: "Dijkstra's Algorithm",
            complexity: { time: 'O((V + E) log V)', space: 'O(V)' },
            generator: function() { return generateDijkstraSteps(); }
        },
        // Recursion
        '01-nth-fibonacci': {
            name: 'Nth Fibonacci',
            complexity: { time: 'O(n)', space: 'O(1)' },
            generator: function() { return generateFibonacciSteps(); }
        },
        '03-permutations': {
            name: 'Permutations',
            complexity: { time: 'O(n! × n)', space: 'O(n! × n)' },
            generator: function() { return generatePermutationsSteps(); }
        }
    };

    function generateSteps(category, problemId) {
        // Check for problem-specific visualization first
        if (problemId && problemVisualizations[problemId]) {
            return problemVisualizations[problemId].generator();
        }

        // Check problemId for partial matches (for algorithms with numbered prefixes)
        if (problemId) {
            if (problemId.includes('topological')) return generateTopologicalSortSteps();
            if (problemId.includes('dijkstra')) return generateDijkstraSteps();
            if (problemId.includes('two-number-sum')) return generateTwoNumberSumSteps();
            if (problemId.includes('validate-subsequence')) return generateValidateSubsequenceSteps();
            if (problemId.includes('sorted-squared')) return generateSortedSquaredSteps();
            if (problemId.includes('three-number-sum')) return generateThreeNumberSumSteps();
            if (problemId.includes('spiral-traverse')) return generateSpiralTraverseSteps();
            if (problemId.includes('merge-overlapping') || problemId.includes('merge-intervals')) return generateMergeIntervalsSteps();
            if (problemId.includes('reverse-linked')) return generateReverseLinkedListSteps();
            if (problemId.includes('middle-node')) return generateMiddleNodeSteps();
            if (problemId.includes('branch-sums')) return generateBranchSumsSteps();
            if (problemId.includes('invert-tree') || problemId.includes('invert-binary')) return generateInvertTreeSteps();
            if (problemId.includes('fibonacci')) return generateFibonacciSteps();
            if (problemId.includes('permutation')) return generatePermutationsSteps();
            if (problemId.includes('depth-first') || problemId.includes('dfs')) return generateDFSSteps();
            if (problemId.includes('breadth-first') || problemId.includes('bfs')) return generateBFSSteps();
            if (problemId.includes('min-coins')) return generateMinCoinsSteps();
            if (problemId.includes('max-subset')) return generateMaxSubsetSumSteps();
            if (problemId.includes('array-of-products')) return generateArrayOfProductsSteps();
            if (problemId.includes('move-element')) return generateMoveElementSteps();
            if (problemId.includes('find-closest')) return generateFindClosestValueSteps();
            if (problemId.includes('validate-bst')) return generateValidateBSTSteps();
        }

        // Fall back to category-based generation with generic visualization
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

    // Get complexity info for current problem
    function getComplexityInfo(problemId) {
        if (problemId && problemVisualizations[problemId]) {
            return problemVisualizations[problemId].complexity;
        }
        return null;
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

    // ===== PROBLEM-SPECIFIC STEP GENERATORS =====

    // Two Number Sum - Hash Table approach (uses selected example)
    function generateTwoNumberSumSteps() {
        // Get input from selected example or use default
        var exampleInput = getSelectedExampleInput();
        var arr = (exampleInput && exampleInput.array) ? exampleInput.array : [3, 5, -4, 8, 11, 1, -1, 6];
        var target = (exampleInput && exampleInput.targetSum !== undefined) ? exampleInput.targetSum : 10;
        var steps = [];
        var hashSet = [];

        // Get expected output
        var expectedOutput = currentExamples[selectedExampleIndex] ? currentExamples[selectedExampleIndex].output : null;

        steps.push({
            array: arr.slice(),
            currentIndex: -1,
            hashTable: [],
            checking: null,
            status: 'Initialize: target = ' + target,
            vizType: 'array-hash',
            explanation: '📋 <strong>Two Number Sum</strong><br><br>' +
                '<strong>Problem:</strong> Find two numbers that sum to target<br>' +
                '<strong>Approach:</strong> Hash Table (one-pass)<br><br>' +
                '• Array: [' + arr.join(', ') + ']<br>' +
                '• Target: ' + target + '<br>' +
                (expectedOutput ? '• Expected: [' + (Array.isArray(expectedOutput) ? expectedOutput.join(', ') : expectedOutput) + ']<br>' : '') + '<br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n) - single pass<br>' +
                '• Space: O(n) - hash table</div>'
        });

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
                vizType: 'array-hash',
                status: found ? 'Found pair: ' + arr[i] + ' + ' + need + ' = ' + target : 'Need: ' + need,
                explanation: found ?
                    '✅ <strong>SUCCESS!</strong><br><br>' +
                    '• Current: <span style="color:#3fb950;">' + arr[i] + '</span><br>' +
                    '• Need: <span style="color:#f0883e;">' + need + '</span><br>' +
                    '• Found in hash table!<br><br>' +
                    '<strong>Result:</strong> [' + need + ', ' + arr[i] + ']<br><br>' +
                    '<code style="color:#c9d1d9;background:#21262d;padding:0.5rem;display:block;border-radius:4px;">' +
                    'if complement in seen:<br>&nbsp;&nbsp;return [complement, num]</code>' :
                    '🔍 <strong>Step ' + (i + 1) + '</strong><br><br>' +
                    '• Current: <span style="color:#3fb950;">' + arr[i] + '</span><br>' +
                    '• Need: ' + target + ' - ' + arr[i] + ' = <span style="color:#f0883e;">' + need + '</span><br>' +
                    '• In hash? <span style="color:#da3633;">NO</span><br>' +
                    '• Add ' + arr[i] + ' to hash table'
            });
            if (found) break;
            hashSet.push(arr[i]);
        }
        return steps;
    }

    // Validate Subsequence - Two Pointers (uses selected example)
    function generateValidateSubsequenceSteps() {
        // Get input from selected example or use default
        var exampleInput = getSelectedExampleInput();
        var arr = (exampleInput && exampleInput.array) ? exampleInput.array : [5, 1, 22, 25, 6, -1, 8, 10];
        var seq = (exampleInput && exampleInput.sequence) ? exampleInput.sequence : [1, 6, -1, 10];
        var steps = [];
        var seqIdx = 0;

        // Get expected output
        var expectedOutput = currentExamples[selectedExampleIndex] ? currentExamples[selectedExampleIndex].output : null;

        steps.push({
            array: arr.slice(),
            sequence: seq.slice(),
            arrIdx: -1,
            seqIdx: 0,
            vizType: 'two-arrays',
            status: 'Initialize pointers',
            explanation: '📋 <strong>Validate Subsequence</strong><br><br>' +
                '<strong>Problem:</strong> Check if sequence is subsequence of array<br>' +
                '<strong>Approach:</strong> Two Pointers<br><br>' +
                '• Array: [' + arr.join(', ') + ']<br>' +
                '• Sequence: [' + seq.join(', ') + ']<br>' +
                (expectedOutput !== null ? '• Expected: ' + expectedOutput + '<br>' : '') + '<br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n)<br>' +
                '• Space: O(1)</div>'
        });

        for (var i = 0; i < arr.length && seqIdx < seq.length; i++) {
            var match = arr[i] === seq[seqIdx];
            steps.push({
                array: arr.slice(),
                sequence: seq.slice(),
                arrIdx: i,
                seqIdx: seqIdx,
                match: match,
                vizType: 'two-arrays',
                status: match ? 'Match! seq[' + seqIdx + '] = ' + seq[seqIdx] : 'No match',
                explanation: match ?
                    '✅ <strong>Match Found!</strong><br><br>' +
                    '• arr[' + i + '] = <span style="color:#3fb950;">' + arr[i] + '</span><br>' +
                    '• seq[' + seqIdx + '] = <span style="color:#3fb950;">' + seq[seqIdx] + '</span><br>' +
                    '• Move sequence pointer forward<br>' +
                    '• Matched: ' + (seqIdx + 1) + '/' + seq.length :
                    '❌ <strong>No Match</strong><br><br>' +
                    '• arr[' + i + '] = <span style="color:#f0883e;">' + arr[i] + '</span><br>' +
                    '• seq[' + seqIdx + '] = <span style="color:#58a6ff;">' + seq[seqIdx] + '</span><br>' +
                    '• Continue to next array element'
            });
            if (match) seqIdx++;
        }

        steps.push({
            array: arr.slice(),
            sequence: seq.slice(),
            arrIdx: arr.length,
            seqIdx: seqIdx,
            vizType: 'two-arrays',
            status: seqIdx === seq.length ? 'Valid Subsequence!' : 'Invalid',
            explanation: seqIdx === seq.length ?
                '✅ <strong>Valid Subsequence!</strong><br><br>' +
                '• All elements matched in order<br>' +
                '• Result: <span style="color:#3fb950;">true</span>' :
                '❌ <strong>Invalid Subsequence</strong>'
        });

        return steps;
    }

    // Sorted Squared Array - Two Pointers
    function generateSortedSquaredSteps() {
        var arr = [-4, -1, 0, 3, 10];
        var result = new Array(arr.length);
        var left = 0, right = arr.length - 1;
        var steps = [];

        steps.push({
            array: arr.slice(),
            result: result.slice(),
            left: left,
            right: right,
            insertIdx: arr.length - 1,
            vizType: 'two-pointer-result',
            status: 'Initialize: left=0, right=' + right,
            explanation: '📋 <strong>Sorted Squared Array</strong><br><br>' +
                '<strong>Problem:</strong> Square each element, return sorted<br>' +
                '<strong>Approach:</strong> Two Pointers from ends<br><br>' +
                '• Input: [' + arr.join(', ') + ']<br>' +
                '• Use two pointers since largest squares are at ends<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n)<br>' +
                '• Space: O(n)</div>'
        });

        for (var i = arr.length - 1; i >= 0; i--) {
            var leftSq = arr[left] * arr[left];
            var rightSq = arr[right] * arr[right];
            var useLeft = leftSq > rightSq;
            result[i] = useLeft ? leftSq : rightSq;

            steps.push({
                array: arr.slice(),
                result: result.slice(),
                left: left,
                right: right,
                insertIdx: i,
                leftSq: leftSq,
                rightSq: rightSq,
                vizType: 'two-pointer-result',
                status: (useLeft ? 'Left' : 'Right') + ': ' + result[i],
                explanation: '🔄 <strong>Compare Squares</strong><br><br>' +
                    '• left[' + left + ']² = ' + arr[left] + '² = <span style="color:#58a6ff;">' + leftSq + '</span><br>' +
                    '• right[' + right + ']² = ' + arr[right] + '² = <span style="color:#f0883e;">' + rightSq + '</span><br>' +
                    '• Larger: <span style="color:#3fb950;">' + result[i] + '</span> → result[' + i + ']<br>' +
                    '• Move ' + (useLeft ? 'left' : 'right') + ' pointer'
            });

            if (useLeft) left++; else right--;
        }

        return steps;
    }

    // Three Number Sum - Sort + Two Pointers
    function generateThreeNumberSumSteps() {
        var arr = [-8, -6, 1, 2, 3, 5, 6, 12];
        var target = 0;
        var steps = [];

        steps.push({
            array: arr.slice(),
            i: -1,
            left: -1,
            right: -1,
            triplets: [],
            vizType: 'three-pointer',
            status: 'Sorted array, target = ' + target,
            explanation: '📋 <strong>Three Number Sum</strong><br><br>' +
                '<strong>Problem:</strong> Find all triplets that sum to target<br>' +
                '<strong>Approach:</strong> Sort + Two Pointers<br><br>' +
                '• Sorted: [' + arr.join(', ') + ']<br>' +
                '• Target: ' + target + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n²)<br>' +
                '• Space: O(n) for result</div>'
        });

        var triplets = [];
        // Show a few key steps
        steps.push({
            array: arr.slice(),
            i: 0, left: 1, right: 7,
            current: arr[0],
            triplets: [],
            vizType: 'three-pointer',
            status: 'i=0: -8, searching...',
            explanation: '🔍 <strong>Fix i=0, Two Pointers</strong><br><br>' +
                '• Fixed: <span style="color:#f0883e;">-8</span><br>' +
                '• left=1: -6, right=7: 12<br>' +
                '• Sum: -8 + (-6) + 12 = -2 < 0<br>' +
                '• Move left pointer right'
        });

        steps.push({
            array: arr.slice(),
            i: 1, left: 2, right: 7,
            triplets: [[-6, 1, 5]],
            vizType: 'three-pointer',
            status: 'Found: [-6, 1, 5]',
            explanation: '✅ <strong>Triplet Found!</strong><br><br>' +
                '• Fixed: <span style="color:#f0883e;">-6</span><br>' +
                '• -6 + 1 + 5 = <span style="color:#3fb950;">0</span><br>' +
                '• Add [-6, 1, 5] to result'
        });

        steps.push({
            array: arr.slice(),
            i: 2, left: 3, right: 5,
            triplets: [[-6, 1, 5], [1, 2, -3]],
            vizType: 'three-pointer',
            status: 'Complete',
            explanation: '✅ <strong>All Triplets Found</strong><br><br>' +
                'Result: [[-6, 1, 5], ...]<br><br>' +
                '<code style="background:#21262d;padding:0.5rem;display:block;border-radius:4px;">' +
                'for i in range(len(arr) - 2):<br>' +
                '&nbsp;&nbsp;left, right = i + 1, len(arr) - 1<br>' +
                '&nbsp;&nbsp;while left < right:<br>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;# Two pointer logic</code>'
        });

        return steps;
    }

    // Spiral Traverse
    function generateSpiralTraverseSteps() {
        var matrix = [[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]];
        var steps = [];
        var result = [];

        steps.push({
            matrix: matrix,
            result: [],
            direction: 'right',
            row: 0, col: 0,
            vizType: 'matrix',
            status: 'Start spiral traversal',
            explanation: '📋 <strong>Spiral Traverse</strong><br><br>' +
                '<strong>Problem:</strong> Traverse matrix in spiral order<br>' +
                '<strong>Approach:</strong> Track boundaries, shrink inward<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n) where n = total elements<br>' +
                '• Space: O(n) for result</div>'
        });

        // Simulate spiral
        var order = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
        var positions = [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3],[3,3],[3,2],[3,1],[3,0],[2,0],[1,0],[1,1],[1,2],[2,2],[2,1]];
        var dirs = ['→','→','→','↓','↓','↓','←','←','←','↑','↑','→','→','↓','←'];

        for (var i = 0; i < 6; i++) {
            result.push(order[i]);
            steps.push({
                matrix: matrix,
                result: result.slice(),
                row: positions[i][0],
                col: positions[i][1],
                direction: dirs[i],
                vizType: 'matrix',
                status: 'Visit ' + order[i] + ' ' + dirs[i],
                explanation: '➡️ <strong>Step ' + (i+1) + '</strong><br><br>' +
                    '• Position: [' + positions[i][0] + ',' + positions[i][1] + ']<br>' +
                    '• Value: <span style="color:#3fb950;">' + order[i] + '</span><br>' +
                    '• Direction: ' + dirs[i] + '<br>' +
                    '• Result: [' + result.join(', ') + ']'
            });
        }

        result = order;
        steps.push({
            matrix: matrix,
            result: result,
            vizType: 'matrix',
            status: 'Complete!',
            explanation: '✅ <strong>Spiral Complete!</strong><br><br>' +
                'Result: [' + result.join(', ') + ']'
        });

        return steps;
    }

    // Array of Products
    function generateArrayOfProductsSteps() {
        var arr = [5, 1, 4, 2];
        var steps = [];

        steps.push({
            array: arr,
            leftProducts: [],
            rightProducts: [],
            result: [],
            phase: 'init',
            vizType: 'array-products',
            status: 'Two-pass approach',
            explanation: '📋 <strong>Array of Products</strong><br><br>' +
                '<strong>Problem:</strong> Product of all except self (no division)<br>' +
                '<strong>Approach:</strong> Left products × Right products<br><br>' +
                '• Input: [' + arr.join(', ') + ']<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n)<br>' +
                '• Space: O(n)</div>'
        });

        // Left pass
        var left = [1, 5, 5, 20];
        steps.push({
            array: arr,
            leftProducts: left,
            phase: 'left',
            vizType: 'array-products',
            status: 'Left products computed',
            explanation: '⬅️ <strong>Left Pass</strong><br><br>' +
                '• left[0] = 1 (no elements to left)<br>' +
                '• left[1] = 5 (product: 5)<br>' +
                '• left[2] = 5×1 = 5<br>' +
                '• left[3] = 5×1×4 = 20'
        });

        // Right pass
        var right = [8, 8, 2, 1];
        steps.push({
            array: arr,
            leftProducts: left,
            rightProducts: right,
            phase: 'right',
            vizType: 'array-products',
            status: 'Right products computed',
            explanation: '➡️ <strong>Right Pass</strong><br><br>' +
                '• right[3] = 1 (no elements to right)<br>' +
                '• right[2] = 2<br>' +
                '• right[1] = 4×2 = 8<br>' +
                '• right[0] = 1×4×2 = 8'
        });

        // Result
        var result = [8, 40, 10, 20];
        steps.push({
            array: arr,
            leftProducts: left,
            rightProducts: right,
            result: result,
            phase: 'result',
            vizType: 'array-products',
            status: 'Result = left × right',
            explanation: '✅ <strong>Final Result</strong><br><br>' +
                '• result[i] = left[i] × right[i]<br>' +
                '• [8, 40, 10, 20]<br><br>' +
                '<code style="background:#21262d;padding:0.5rem;display:block;border-radius:4px;">' +
                'result[i] = left[i] * right[i]</code>'
        });

        return steps;
    }

    // Merge Overlapping Intervals
    function generateMergeIntervalsSteps() {
        var intervals = [[1,2],[3,5],[4,7],[6,8],[9,10]];
        var steps = [];

        steps.push({
            intervals: intervals,
            merged: [],
            current: -1,
            vizType: 'intervals',
            status: 'Sort by start time',
            explanation: '📋 <strong>Merge Overlapping Intervals</strong><br><br>' +
                '<strong>Problem:</strong> Merge all overlapping intervals<br>' +
                '<strong>Approach:</strong> Sort + Linear merge<br><br>' +
                '• Input: ' + JSON.stringify(intervals) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n log n)<br>' +
                '• Space: O(n)</div>'
        });

        steps.push({
            intervals: intervals,
            merged: [[1,2]],
            current: 0,
            vizType: 'intervals',
            status: 'Add [1,2]',
            explanation: '➕ Add first interval [1,2] to result'
        });

        steps.push({
            intervals: intervals,
            merged: [[1,2],[3,5]],
            current: 1,
            vizType: 'intervals',
            status: '[3,5] - no overlap',
            explanation: '➕ [3,5]: 3 > 2, no overlap → add new'
        });

        steps.push({
            intervals: intervals,
            merged: [[1,2],[3,7]],
            current: 2,
            vizType: 'intervals',
            status: '[4,7] overlaps → merge',
            explanation: '🔄 <strong>Merge!</strong><br><br>' +
                '• [4,7]: 4 ≤ 5 → overlaps with [3,5]<br>' +
                '• Merge to [3, max(5,7)] = [3,7]'
        });

        steps.push({
            intervals: intervals,
            merged: [[1,2],[3,8]],
            current: 3,
            vizType: 'intervals',
            status: '[6,8] overlaps → merge',
            explanation: '🔄 [6,8]: 6 ≤ 7 → merge to [3,8]'
        });

        steps.push({
            intervals: intervals,
            merged: [[1,2],[3,8],[9,10]],
            current: 4,
            vizType: 'intervals',
            status: 'Complete!',
            explanation: '✅ <strong>Result:</strong> [[1,2],[3,8],[9,10]]'
        });

        return steps;
    }

    // Move Element to End
    function generateMoveElementSteps() {
        var arr = [2, 1, 2, 2, 2, 3, 4, 2];
        var toMove = 2;
        var steps = [];

        steps.push({
            array: arr.slice(),
            left: 0,
            right: arr.length - 1,
            toMove: toMove,
            vizType: 'two-pointer',
            status: 'Move all 2s to end',
            explanation: '📋 <strong>Move Element To End</strong><br><br>' +
                '<strong>Problem:</strong> Move all instances of ' + toMove + ' to end<br>' +
                '<strong>Approach:</strong> Two Pointers (swap)<br><br>' +
                '• Input: [' + arr.join(', ') + ']<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n)<br>' +
                '• Space: O(1) in-place</div>'
        });

        // Simulate swaps
        var states = [
            { arr: [4, 1, 2, 2, 2, 3, 2, 2], l: 1, r: 6, action: 'Swap 2↔4' },
            { arr: [4, 1, 3, 2, 2, 2, 2, 2], l: 3, r: 4, action: 'Swap 2↔3' },
            { arr: [4, 1, 3, 2, 2, 2, 2, 2], l: 3, r: 2, action: 'Done!' }
        ];

        states.forEach(function(s, i) {
            steps.push({
                array: s.arr,
                left: s.l,
                right: s.r,
                toMove: toMove,
                vizType: 'two-pointer',
                status: s.action,
                explanation: i < 2 ?
                    '🔄 <strong>' + s.action + '</strong><br><br>' +
                    '• Left pointer at non-2, right at 2<br>' +
                    '• Swap and move pointers' :
                    '✅ <strong>Complete!</strong><br><br>' +
                    'Result: [' + s.arr.join(', ') + ']'
            });
        });

        return steps;
    }

    // Middle Node (Linked List)
    function generateMiddleNodeSteps() {
        var nodes = [1, 2, 3, 4, 5];
        var steps = [];

        steps.push({
            nodes: nodes,
            slow: 0,
            fast: 0,
            vizType: 'linked-list-pointers',
            status: 'Slow/Fast pointers at head',
            explanation: '📋 <strong>Middle Node</strong><br><br>' +
                '<strong>Problem:</strong> Find middle of linked list<br>' +
                '<strong>Approach:</strong> Slow & Fast Pointers<br><br>' +
                '• List: ' + nodes.join(' → ') + '<br>' +
                '• Slow moves 1 step, Fast moves 2 steps<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n)<br>' +
                '• Space: O(1)</div>'
        });

        var positions = [{s:0,f:0},{s:1,f:2},{s:2,f:4}];
        positions.forEach(function(p, i) {
            steps.push({
                nodes: nodes,
                slow: p.s,
                fast: p.f,
                vizType: 'linked-list-pointers',
                status: 'slow=' + nodes[p.s] + ', fast=' + (p.f < nodes.length ? nodes[p.f] : 'null'),
                explanation: i < 2 ?
                    '🏃 <strong>Step ' + (i+1) + '</strong><br><br>' +
                    '• Slow at node <span style="color:#58a6ff;">' + nodes[p.s] + '</span><br>' +
                    '• Fast at node <span style="color:#f0883e;">' + (p.f < nodes.length ? nodes[p.f] : 'end') + '</span>' :
                    '✅ <strong>Middle Found!</strong><br><br>' +
                    '• Fast reached end<br>' +
                    '• Middle: <span style="color:#3fb950;">' + nodes[p.s] + '</span>'
            });
        });

        return steps;
    }

    // Reverse Linked List
    function generateReverseLinkedListSteps() {
        var steps = [];

        steps.push({
            nodes: [1, 2, 3, 4, 5],
            prev: null,
            curr: 0,
            vizType: 'linked-list-reverse',
            status: 'Initialize: prev=null, curr=head',
            explanation: '📋 <strong>Reverse Linked List</strong><br><br>' +
                '<strong>Problem:</strong> Reverse a singly linked list<br>' +
                '<strong>Approach:</strong> Iterative pointer manipulation<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n)<br>' +
                '• Space: O(1)</div>'
        });

        var states = [
            { visual: '1←  2→3→4→5', curr: 1, desc: '1.next = null' },
            { visual: '1←2  3→4→5', curr: 2, desc: '2.next = 1' },
            { visual: '1←2←3  4→5', curr: 3, desc: '3.next = 2' },
            { visual: '1←2←3←4  5', curr: 4, desc: '4.next = 3' },
            { visual: '1←2←3←4←5', curr: 5, desc: '5.next = 4, Done!' }
        ];

        states.forEach(function(s, i) {
            steps.push({
                visual: s.visual,
                curr: s.curr,
                vizType: 'linked-list-reverse',
                status: s.desc,
                explanation: '🔄 <strong>Step ' + (i+1) + '</strong><br><br>' +
                    '• ' + s.desc + '<br>' +
                    '• ' + s.visual
            });
        });

        return steps;
    }

    // Branch Sums (Binary Tree)
    function generateBranchSumsSteps() {
        var steps = [];

        steps.push({
            tree: {val:1,left:{val:2,left:{val:4},right:{val:5}},right:{val:3,left:{val:6},right:{val:7}}},
            path: [1],
            sum: 1,
            sums: [],
            vizType: 'tree-path',
            status: 'Start at root: 1',
            explanation: '📋 <strong>Branch Sums</strong><br><br>' +
                '<strong>Problem:</strong> Sum of values in each root-to-leaf path<br>' +
                '<strong>Approach:</strong> DFS with running sum<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n)<br>' +
                '• Space: O(n) for result</div>'
        });

        var paths = [
            { path: [1,2,4], sum: 7, sums: [7] },
            { path: [1,2,5], sum: 8, sums: [7,8] },
            { path: [1,3,6], sum: 10, sums: [7,8,10] },
            { path: [1,3,7], sum: 11, sums: [7,8,10,11] }
        ];

        paths.forEach(function(p, i) {
            steps.push({
                path: p.path,
                sum: p.sum,
                sums: p.sums,
                vizType: 'tree-path',
                status: 'Path ' + (i+1) + ': sum=' + p.sum,
                explanation: '🌿 <strong>Leaf ' + (i+1) + '</strong><br><br>' +
                    '• Path: ' + p.path.join(' → ') + '<br>' +
                    '• Sum: <span style="color:#3fb950;">' + p.sum + '</span><br>' +
                    '• All sums: [' + p.sums.join(', ') + ']'
            });
        });

        return steps;
    }

    // Invert Binary Tree
    function generateInvertTreeSteps() {
        var steps = [];

        steps.push({
            before: '    1\n   / \\\n  2   3\n / \\\n4   5',
            after: '    1\n   / \\\n  3   2\n     / \\\n    5   4',
            vizType: 'tree-invert',
            status: 'Swap children at each node',
            explanation: '📋 <strong>Invert Binary Tree</strong><br><br>' +
                '<strong>Problem:</strong> Mirror the tree<br>' +
                '<strong>Approach:</strong> DFS, swap left↔right<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n)<br>' +
                '• Space: O(h) recursive stack</div>'
        });

        steps.push({
            node: 1,
            action: 'Swap children of 1: 2↔3',
            vizType: 'tree-invert',
            status: 'Swap at root',
            explanation: '🔄 Swap children of node 1<br>• Left: 2 → 3<br>• Right: 3 → 2'
        });

        steps.push({
            node: 2,
            action: 'Swap children of 2: 4↔5',
            vizType: 'tree-invert',
            status: 'Swap at node 2',
            explanation: '🔄 Swap children of node 2<br>• Left: 4 → 5<br>• Right: 5 → 4'
        });

        steps.push({
            vizType: 'tree-invert',
            status: 'Inversion complete!',
            explanation: '✅ <strong>Tree Inverted!</strong><br><br>' +
                '<code style="background:#21262d;padding:0.5rem;display:block;border-radius:4px;">' +
                'def invert(node):<br>' +
                '&nbsp;&nbsp;if not node: return<br>' +
                '&nbsp;&nbsp;node.left, node.right = node.right, node.left<br>' +
                '&nbsp;&nbsp;invert(node.left)<br>' +
                '&nbsp;&nbsp;invert(node.right)</code>'
        });

        return steps;
    }

    // Find Closest Value in BST
    function generateFindClosestValueSteps() {
        var target = 12;
        var steps = [];

        steps.push({
            nodes: [{v:10,x:200,y:30},{v:5,x:120,y:100},{v:15,x:280,y:100},{v:2,x:70,y:170},{v:13,x:230,y:170},{v:22,x:330,y:170}],
            target: target,
            closest: 10,
            current: 10,
            vizType: 'bst-search',
            status: 'Target: 12, Start at root: 10',
            explanation: '📋 <strong>Find Closest Value in BST</strong><br><br>' +
                '<strong>Target:</strong> 12<br>' +
                '<strong>Approach:</strong> BST traversal, track closest<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(log n) average<br>' +
                '• Space: O(1)</div>'
        });

        steps.push({
            current: 15,
            closest: 10,
            vizType: 'bst-search',
            status: '12 > 10, go right to 15',
            explanation: '➡️ 12 > 10 → go right<br>• Current: 15<br>• |15-12| = 3 > |10-12| = 2<br>• Closest stays 10'
        });

        steps.push({
            current: 13,
            closest: 13,
            vizType: 'bst-search',
            status: '12 < 15, go left to 13',
            explanation: '⬅️ 12 < 15 → go left<br>• Current: 13<br>• |13-12| = 1 < |10-12| = 2<br>• <span style="color:#3fb950;">Update closest = 13</span>'
        });

        steps.push({
            current: null,
            closest: 13,
            vizType: 'bst-search',
            status: 'Result: 13',
            explanation: '✅ <strong>Closest Value: 13</strong><br><br>• 13 has no left child<br>• Return closest = 13'
        });

        return steps;
    }

    // Validate BST
    function generateValidateBSTSteps() {
        var steps = [];

        steps.push({
            vizType: 'bst-validate',
            status: 'Validate BST property',
            explanation: '📋 <strong>Validate BST</strong><br><br>' +
                '<strong>Problem:</strong> Check if tree is valid BST<br>' +
                '<strong>Approach:</strong> DFS with min/max bounds<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n)<br>' +
                '• Space: O(d) depth</div>'
        });

        steps.push({
            node: 10,
            min: '-∞',
            max: '∞',
            valid: true,
            vizType: 'bst-validate',
            status: 'Root 10: (-∞, ∞) ✓',
            explanation: '✅ Node 10 in range (-∞, ∞)'
        });

        steps.push({
            node: 5,
            min: '-∞',
            max: '10',
            valid: true,
            vizType: 'bst-validate',
            status: 'Left 5: (-∞, 10) ✓',
            explanation: '✅ Node 5 in range (-∞, 10)'
        });

        steps.push({
            node: 15,
            min: '10',
            max: '∞',
            valid: true,
            vizType: 'bst-validate',
            status: 'Right 15: (10, ∞) ✓',
            explanation: '✅ Node 15 in range (10, ∞)<br><br>' +
                '<code style="background:#21262d;padding:0.5rem;display:block;border-radius:4px;">' +
                'def validate(node, min, max):<br>' +
                '&nbsp;&nbsp;if not node: return True<br>' +
                '&nbsp;&nbsp;if node.val <= min or node.val >= max:<br>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;return False<br>' +
                '&nbsp;&nbsp;return validate(node.left, min, node.val) and \\<br>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;validate(node.right, node.val, max)</code>'
        });

        return steps;
    }

    // Max Subset Sum No Adjacent (DP)
    function generateMaxSubsetSumSteps() {
        var arr = [7, 10, 12, 7, 9, 14];
        var steps = [];

        steps.push({
            array: arr,
            dp: [],
            vizType: 'dp-array',
            status: 'Max sum of non-adjacent elements',
            explanation: '📋 <strong>Max Subset Sum No Adjacent</strong><br><br>' +
                '<strong>Problem:</strong> Max sum where no two elements are adjacent<br>' +
                '<strong>Approach:</strong> DP with two variables<br><br>' +
                '• Input: [' + arr.join(', ') + ']<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n)<br>' +
                '• Space: O(1)</div>'
        });

        // Simulate DP
        var dpStates = [
            { prev: 0, curr: 7, choice: 'Take 7' },
            { prev: 7, curr: 10, choice: 'Take 10 (10 > 7)' },
            { prev: 10, curr: 19, choice: 'Take 12+7=19' },
            { prev: 19, curr: 19, choice: 'Skip 7' },
            { prev: 19, curr: 28, choice: 'Take 9+19=28' },
            { prev: 28, curr: 33, choice: 'Take 14+19=33' }
        ];

        dpStates.forEach(function(s, i) {
            steps.push({
                array: arr,
                idx: i,
                prev: s.prev,
                curr: s.curr,
                vizType: 'dp-array',
                status: s.choice,
                explanation: '📊 <strong>i=' + i + ' (arr[i]=' + arr[i] + ')</strong><br><br>' +
                    '• prev: ' + s.prev + ', curr: ' + s.curr + '<br>' +
                    '• Choice: ' + s.choice
            });
        });

        steps.push({
            array: arr,
            result: 33,
            vizType: 'dp-array',
            status: 'Result: 33',
            explanation: '✅ <strong>Max Sum: 33</strong><br><br>' +
                'Selected: 7 + 12 + 14 = 33<br><br>' +
                '<code style="background:#21262d;padding:0.5rem;display:block;border-radius:4px;">' +
                'prev, curr = 0, 0<br>' +
                'for num in arr:<br>' +
                '&nbsp;&nbsp;prev, curr = curr, max(curr, prev + num)</code>'
        });

        return steps;
    }

    // Min Coins (DP)
    function generateMinCoinsSteps() {
        var coins = [1, 2, 5];
        var amount = 11;
        var steps = [];

        steps.push({
            coins: coins,
            amount: amount,
            dp: [0],
            vizType: 'dp-coins',
            status: 'Min coins for amount 11',
            explanation: '📋 <strong>Min Number of Coins</strong><br><br>' +
                '<strong>Problem:</strong> Min coins to make amount<br>' +
                '<strong>Approach:</strong> Bottom-up DP<br><br>' +
                '• Coins: [' + coins.join(', ') + ']<br>' +
                '• Amount: ' + amount + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(amount × coins)<br>' +
                '• Space: O(amount)</div>'
        });

        var dp = [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3];
        for (var i = 1; i <= 5; i++) {
            steps.push({
                coins: coins,
                amount: i,
                dp: dp.slice(0, i + 1),
                current: i,
                vizType: 'dp-coins',
                status: 'dp[' + i + '] = ' + dp[i],
                explanation: '📊 <strong>Amount ' + i + '</strong><br><br>' +
                    '• dp[' + i + '] = ' + dp[i] + ' coin(s)<br>' +
                    '• DP so far: [' + dp.slice(0, i + 1).join(', ') + ']'
            });
        }

        steps.push({
            coins: coins,
            amount: amount,
            dp: dp,
            result: 3,
            vizType: 'dp-coins',
            status: 'Result: 3 coins (5+5+1)',
            explanation: '✅ <strong>Min Coins: 3</strong><br><br>' +
                '• 11 = 5 + 5 + 1<br>' +
                '• dp[11] = 3'
        });

        return steps;
    }

    // DFS
    function generateDFSSteps() {
        var steps = [];

        steps.push({
            graph: {A:['B','C'],B:['D'],C:['E'],D:[],E:[]},
            visited: [],
            stack: ['A'],
            vizType: 'graph-dfs',
            status: 'DFS from A',
            explanation: '📋 <strong>Depth First Search</strong><br><br>' +
                '<strong>Approach:</strong> Go deep before wide (stack/recursion)<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(V + E)<br>' +
                '• Space: O(V)</div>'
        });

        var dfsOrder = [
            { v: ['A'], s: ['B','C'], curr: 'A' },
            { v: ['A','B'], s: ['D','C'], curr: 'B' },
            { v: ['A','B','D'], s: ['C'], curr: 'D' },
            { v: ['A','B','D','C'], s: ['E'], curr: 'C' },
            { v: ['A','B','D','C','E'], s: [], curr: 'E' }
        ];

        dfsOrder.forEach(function(s, i) {
            steps.push({
                visited: s.v,
                stack: s.s,
                current: s.curr,
                vizType: 'graph-dfs',
                status: 'Visit ' + s.curr,
                explanation: '🔍 <strong>Visit ' + s.curr + '</strong><br><br>' +
                    '• Visited: [' + s.v.join(' → ') + ']<br>' +
                    '• Stack: [' + s.s.join(', ') + ']'
            });
        });

        return steps;
    }

    // BFS
    function generateBFSSteps() {
        var steps = [];

        steps.push({
            graph: {A:['B','C'],B:['D'],C:['E'],D:[],E:[]},
            visited: [],
            queue: ['A'],
            vizType: 'graph-bfs',
            status: 'BFS from A',
            explanation: '📋 <strong>Breadth First Search</strong><br><br>' +
                '<strong>Approach:</strong> Level by level (queue)<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(V + E)<br>' +
                '• Space: O(V)</div>'
        });

        var bfsOrder = [
            { v: ['A'], q: ['B','C'], curr: 'A' },
            { v: ['A','B'], q: ['C','D'], curr: 'B' },
            { v: ['A','B','C'], q: ['D','E'], curr: 'C' },
            { v: ['A','B','C','D'], q: ['E'], curr: 'D' },
            { v: ['A','B','C','D','E'], q: [], curr: 'E' }
        ];

        bfsOrder.forEach(function(s, i) {
            steps.push({
                visited: s.v,
                queue: s.q,
                current: s.curr,
                vizType: 'graph-bfs',
                status: 'Visit ' + s.curr,
                explanation: '🔍 <strong>Visit ' + s.curr + '</strong><br><br>' +
                    '• Visited: [' + s.v.join(' → ') + ']<br>' +
                    '• Queue: [' + s.q.join(', ') + ']'
            });
        });

        return steps;
    }

    // Fibonacci
    function generateFibonacciSteps() {
        var steps = [];
        var n = 6;

        steps.push({
            n: n,
            sequence: [0, 1],
            vizType: 'fib-sequence',
            status: 'Calculate Fib(6)',
            explanation: '📋 <strong>Nth Fibonacci</strong><br><br>' +
                '<strong>Approach:</strong> Iterative (optimized)<br><br>' +
                '• F(0) = 0, F(1) = 1<br>' +
                '• F(n) = F(n-1) + F(n-2)<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n)<br>' +
                '• Space: O(1)</div>'
        });

        var seq = [0, 1, 1, 2, 3, 5, 8];
        for (var i = 2; i <= n; i++) {
            steps.push({
                n: i,
                sequence: seq.slice(0, i + 1),
                prev: seq[i-1],
                prevPrev: seq[i-2],
                current: seq[i],
                vizType: 'fib-sequence',
                status: 'F(' + i + ') = ' + seq[i-1] + ' + ' + seq[i-2] + ' = ' + seq[i],
                explanation: '🔢 <strong>F(' + i + ')</strong><br><br>' +
                    '• F(' + (i-1) + ') + F(' + (i-2) + ') = ' + seq[i-1] + ' + ' + seq[i-2] + '<br>' +
                    '• = <span style="color:#3fb950;">' + seq[i] + '</span>'
            });
        }

        return steps;
    }

    // Permutations
    function generatePermutationsSteps() {
        var arr = [1, 2, 3];
        var steps = [];

        steps.push({
            array: arr,
            perms: [],
            current: [],
            vizType: 'permutations',
            status: 'Generate all permutations',
            explanation: '📋 <strong>Permutations</strong><br><br>' +
                '<strong>Problem:</strong> All arrangements of [1, 2, 3]<br>' +
                '<strong>Approach:</strong> Backtracking<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n! × n)<br>' +
                '• Space: O(n!)</div>'
        });

        var perms = [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]];
        perms.forEach(function(p, i) {
            steps.push({
                array: arr,
                perms: perms.slice(0, i + 1),
                current: p,
                vizType: 'permutations',
                status: 'Found: [' + p.join(', ') + ']',
                explanation: '✅ <strong>Permutation ' + (i+1) + '</strong><br><br>' +
                    '[' + p.join(', ') + ']<br>' +
                    '• Total found: ' + (i + 1)
            });
        });

        return steps;
    }

    // Tournament Winner
    function generateTournamentWinnerSteps() {
        var competitions = [['A','B'],['B','C'],['C','A']];
        var results = [0, 0, 1]; // 0=home wins, 1=away wins
        var steps = [];

        steps.push({
            competitions: competitions,
            results: results,
            scores: {},
            vizType: 'tournament',
            status: 'Track scores with hash map',
            explanation: '📋 <strong>Tournament Winner</strong><br><br>' +
                '<strong>Problem:</strong> Find team with most points<br>' +
                '<strong>Approach:</strong> Hash map for scores<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n)<br>' +
                '• Space: O(k) teams</div>'
        });

        var scoreStates = [
            { scores: {A:3}, game: 'A vs B → A wins' },
            { scores: {A:3,B:3}, game: 'B vs C → B wins' },
            { scores: {A:6,B:3}, game: 'C vs A → A wins' }
        ];

        scoreStates.forEach(function(s, i) {
            steps.push({
                game: i,
                scores: s.scores,
                vizType: 'tournament',
                status: s.game,
                explanation: '🏆 <strong>Game ' + (i+1) + '</strong><br><br>' +
                    '• ' + s.game + '<br>' +
                    '• Scores: ' + JSON.stringify(s.scores)
            });
        });

        steps.push({
            scores: {A:6,B:3},
            winner: 'A',
            vizType: 'tournament',
            status: 'Winner: Team A (6 points)',
            explanation: '✅ <strong>Winner: Team A</strong><br><br>' +
                '• A: 6 points<br>• B: 3 points<br>• C: 0 points'
        });

        return steps;
    }

    // Non-Constructible Change
    function generateNonConstructibleChangeSteps() {
        var coins = [5, 7, 1, 1, 2, 3, 22];
        var sorted = [1, 1, 2, 3, 5, 7, 22];
        var steps = [];

        steps.push({
            coins: coins,
            sorted: sorted,
            change: 0,
            vizType: 'coins-change',
            status: 'Sort coins first',
            explanation: '📋 <strong>Non-Constructible Change</strong><br><br>' +
                '<strong>Problem:</strong> Find min change we cannot create<br>' +
                '<strong>Approach:</strong> Sort + greedy<br><br>' +
                '• Sorted: [' + sorted.join(', ') + ']<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong><br>' +
                '• Time: O(n log n)<br>' +
                '• Space: O(1)</div>'
        });

        var changes = [0, 1, 2, 4, 7, 12, 19, 20];
        for (var i = 0; i < sorted.length; i++) {
            var canMake = sorted[i] <= changes[i] + 1;
            steps.push({
                sorted: sorted,
                idx: i,
                coin: sorted[i],
                change: changes[i],
                newChange: canMake ? changes[i+1] : changes[i],
                canMake: canMake,
                vizType: 'coins-change',
                status: canMake ? 'Can make 1-' + changes[i+1] : 'Cannot make ' + (changes[i] + 1),
                explanation: canMake ?
                    '✅ coin ' + sorted[i] + ' ≤ change+1 (' + (changes[i]+1) + ')<br>' +
                    '• New change: ' + changes[i+1] :
                    '❌ <strong>Found gap!</strong><br>' +
                    '• coin ' + sorted[i] + ' > change+1 (' + (changes[i]+1) + ')<br>' +
                    '• Cannot make: <span style="color:#3fb950;">' + (changes[i] + 1) + '</span>'
            });
            if (!canMake) break;
        }

        return steps;
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

        // Check step.vizType first for specific rendering (this is the key fix!)
        var vizType = step.vizType || '';

        // Route based on vizType first - this handles all algorithm-specific visualizations
        if (vizType === 'matrix' || vizType === 'bfs-matrix' || vizType === 'grid') {
            mainArea.innerHTML = renderMatrixViz(step);
        } else if (vizType === 'string-matching' || vizType === 'kmp' || vizType === 'pattern-match') {
            mainArea.innerHTML = renderStringMatchingViz(step);
        } else if (vizType === 'tree' || vizType === 'bst') {
            mainArea.innerHTML = renderTreeViz(step);
        } else if (vizType === 'linked-list') {
            mainArea.innerHTML = renderLinkedListViz(step);
        } else if (vizType === 'lru-cache') {
            mainArea.innerHTML = renderLRUCacheViz(step);
        } else if (vizType === 'recursion') {
            mainArea.innerHTML = renderRecursionViz(step);
        } else if (vizType === 'dp-table') {
            mainArea.innerHTML = renderDPTableViz(step);
        } else if (vizType === 'famous-algorithm') {
            mainArea.innerHTML = renderFamousAlgorithmViz(step);
        } else if (vizType === 'graph') {
            mainArea.innerHTML = renderGraphViz(step);
        } else if (vizType === 'array' || vizType.startsWith('array-') || vizType.startsWith('two-') || vizType.startsWith('three-') || vizType === 'spiral-matrix' || vizType === 'hash-table' || vizType === 'intervals') {
            // Array-based visualizations (handled by renderArrayVisualization switch)
            mainArea.innerHTML = renderArrayVisualization(step);
        } else if (problemId && problemId.includes('topological')) {
            // Problem ID specific (legacy support)
            mainArea.innerHTML = renderTopologicalSortVisualization(step);
        } else if (category === 'graphs' || category === 'famous-algorithms') {
            // Fallback to category-based rendering only if no specific vizType
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
        } else if (vizType === 'generic') {
            mainArea.innerHTML = renderGenericArrayViz(step);
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
        if (!step) return '<p>No data</p>';

        var vizType = step.vizType || 'generic';
        var html = '';

        // Handle different visualization types
        switch (vizType) {
            case 'array-hash':
                return renderArrayHashViz(step);
            case 'two-arrays':
                return renderTwoArraysViz(step);
            case 'two-pointer':
                return renderTwoPointerViz(step);
            case 'two-pointer-result':
                return renderTwoPointerResultViz(step);
            case 'three-pointer':
                return renderThreePointerViz(step);
            case 'spiral-matrix':
                return renderSpiralMatrixViz(step);
            case 'hash-table':
                return renderHashTableViz(step);
            case 'array-scan':
                return renderArrayScanViz(step);
            case 'matrix':
                return renderMatrixViz(step);
            case 'array-products':
                return renderArrayProductsViz(step);
            case 'array-marking':
                return renderArrayMarkingViz(step);
            case 'intervals':
                return renderIntervalsViz(step);
            // New visualization types
            case 'graph':
                return renderGraphViz(step);
            case 'linked-list':
                return renderLinkedListViz(step);
            case 'lru-cache':
                return renderLRUCacheViz(step);
            case 'tree':
                return renderTreeViz(step);
            case 'recursion':
                return renderRecursionViz(step);
            case 'dp-table':
                return renderDPTableViz(step);
            case 'famous-algorithm':
                return renderFamousAlgorithmViz(step);
            case 'generic':
            default:
                return renderGenericArrayViz(step);
        }
    }

    // =========================================================================
    // NEW VISUALIZATION RENDERERS
    // =========================================================================

    // Graph Visualization
    function renderGraphViz(step) {
        var html = '';
        var nodes = step.nodes || [];
        var edges = step.edges || [];
        var visited = step.visited || [];
        var current = step.current;

        // Handle empty or invalid nodes
        if (!nodes || nodes.length === 0) {
            return '<div style="text-align:center;padding:1rem;color:#8b949e;">No graph data available</div>';
        }

        html += '<div style="text-align:center;padding:1rem;">';

        // Draw nodes in a grid/tree layout
        html += '<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-bottom:1rem;">';
        nodes.forEach(function(node) {
            var isVisited = visited.indexOf(node.id) !== -1;
            var isCurrent = node.id === current;
            var bg = isCurrent ? 'linear-gradient(135deg,#238636,#2ea043)' :
                     (isVisited ? '#1f6feb' : '#21262d');
            var border = isCurrent ? '3px solid #3fb950' :
                        (isVisited ? '2px solid #58a6ff' : '2px solid #30363d');

            // Safely get displayable label - handle objects
            var nodeLabel = node.label || node.id || node.name;
            if (nodeLabel === undefined || nodeLabel === null) {
                nodeLabel = '?';
            } else if (typeof nodeLabel === 'object') {
                nodeLabel = nodeLabel.name || nodeLabel.value || JSON.stringify(nodeLabel);
            }

            html += '<div style="width:50px;height:50px;background:' + bg + ';border:' + border + ';border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;font-size:1.1rem;transition:all 0.3s;">';
            html += nodeLabel;
            html += '</div>';
        });
        html += '</div>';

        // Show queue/stack
        if (step.queue && step.queue.length > 0) {
            html += '<div style="margin-top:1rem;background:#21262d;border-radius:6px;padding:0.75rem;">';
            html += '<div style="color:#f0883e;font-size:0.8rem;margin-bottom:0.5rem;">Queue (FIFO):</div>';
            html += '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center;">';
            step.queue.forEach(function(item) {
                html += '<span style="background:#f0883e33;color:#f0883e;padding:0.3rem 0.6rem;border-radius:4px;font-family:monospace;">' + item + '</span>';
            });
            html += '</div></div>';
        }

        if (step.stack && step.stack.length > 0) {
            html += '<div style="margin-top:1rem;background:#21262d;border-radius:6px;padding:0.75rem;">';
            html += '<div style="color:#a371f7;font-size:0.8rem;margin-bottom:0.5rem;">Stack (LIFO):</div>';
            html += '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center;">';
            step.stack.forEach(function(item) {
                html += '<span style="background:#a371f733;color:#a371f7;padding:0.3rem 0.6rem;border-radius:4px;font-family:monospace;">' + item + '</span>';
            });
            html += '</div></div>';
        }

        // Show result
        if (step.result && step.result.length > 0) {
            html += '<div style="margin-top:1rem;background:#23863622;border-radius:6px;padding:0.75rem;">';
            html += '<div style="color:#3fb950;font-size:0.8rem;margin-bottom:0.5rem;">Result:</div>';
            html += '<div style="color:#3fb950;font-family:monospace;font-size:1rem;">[' + step.result.join(' → ') + ']</div>';
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    // Linked List Visualization
    function renderLinkedListViz(step) {
        var html = '';
        var nodes = step.nodes || [];
        var current = step.current;
        var pointers = step.pointers || {};

        // Handle empty or invalid nodes
        if (!nodes || nodes.length === 0) {
            return '<div style="text-align:center;padding:1rem;color:#8b949e;">No linked list data available</div>';
        }

        html += '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:0.25rem;padding:1rem;">';

        nodes.forEach(function(node, idx) {
            var isCurrent = idx === current;
            var isPointed = Object.values(pointers).indexOf(idx) !== -1;
            var bg = isCurrent ? 'linear-gradient(135deg,#238636,#2ea043)' :
                     (isPointed ? '#1f6feb' : '#21262d');
            var border = isCurrent ? '2px solid #3fb950' :
                        (isPointed ? '2px solid #58a6ff' : '2px solid #30363d');

            // Safely get displayable value - handle objects, undefined, etc.
            var displayValue = node.value;
            if (displayValue === undefined || displayValue === null) {
                displayValue = 'null';
            } else if (typeof displayValue === 'object') {
                displayValue = displayValue.value !== undefined ? displayValue.value : JSON.stringify(displayValue);
            }

            // Node box
            html += '<div style="display:flex;align-items:center;">';
            html += '<div style="background:' + bg + ';border:' + border + ';border-radius:6px;padding:0.5rem 0.75rem;display:flex;align-items:center;transition:all 0.3s;">';
            html += '<span style="color:#fff;font-weight:bold;font-size:1rem;min-width:30px;text-align:center;">' + displayValue + '</span>';
            html += '<span style="color:#8b949e;margin-left:0.5rem;">•</span>';
            html += '</div>';

            // Arrow to next
            if (node.next !== null && idx < nodes.length - 1) {
                html += '<div style="color:#58a6ff;margin:0 0.25rem;font-size:1.2rem;">→</div>';
            } else if (node.next === null) {
                html += '<span style="color:#da3633;margin-left:0.5rem;font-size:0.8rem;">null</span>';
            }
            html += '</div>';
        });

        html += '</div>';

        // Show pointer labels
        if (Object.keys(pointers).length > 0) {
            html += '<div style="display:flex;gap:1rem;justify-content:center;margin-top:0.5rem;">';
            Object.keys(pointers).forEach(function(name) {
                var color = name === 'current' ? '#3fb950' : (name === 'head' ? '#58a6ff' : '#f0883e');
                html += '<span style="color:' + color + ';font-size:0.85rem;">● ' + name + '</span>';
            });
            html += '</div>';
        }

        // Show result nodes if different
        if (step.resultNodes && step.resultNodes.length > 0) {
            html += '<div style="margin-top:1rem;padding-top:1rem;border-top:1px solid #30363d;">';
            html += '<div style="color:#3fb950;font-size:0.8rem;margin-bottom:0.5rem;">Result:</div>';
            html += '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:0.25rem;">';
            step.resultNodes.forEach(function(node, idx) {
                // Safely get displayable value
                var resultValue = node.value;
                if (resultValue === undefined || resultValue === null) {
                    resultValue = 'null';
                } else if (typeof resultValue === 'object') {
                    resultValue = resultValue.value !== undefined ? resultValue.value : JSON.stringify(resultValue);
                }

                html += '<div style="display:flex;align-items:center;">';
                html += '<div style="background:#238636;border:2px solid #3fb950;border-radius:6px;padding:0.4rem 0.6rem;">';
                html += '<span style="color:#fff;font-weight:bold;">' + resultValue + '</span>';
                html += '</div>';
                if (idx < step.resultNodes.length - 1) {
                    html += '<div style="color:#3fb950;margin:0 0.25rem;">→</div>';
                }
                html += '</div>';
            });
            html += '</div></div>';
        }

        return html;
    }

    // LRU Cache Visualization
    function renderLRUCacheViz(step) {
        var html = '';
        var items = step.items || [];
        var capacity = step.capacity || 0;
        var newItem = step.newItem !== undefined ? step.newItem : -1;
        var accessed = step.accessed !== undefined ? step.accessed : -1;
        var evicting = step.evicting !== undefined ? step.evicting : -1;

        html += '<div style="padding:1rem;">';

        // Cache header
        html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">';
        html += '<div style="display:flex;gap:1rem;align-items:center;">';
        html += '<div style="color:#58a6ff;font-size:0.85rem;font-weight:bold;">HEAD (MRU)</div>';
        html += '</div>';
        html += '<div style="display:flex;gap:1rem;align-items:center;">';
        html += '<div style="color:#f85149;font-size:0.85rem;font-weight:bold;">TAIL (LRU)</div>';
        html += '</div>';
        html += '</div>';

        // Cache items as linked list
        html += '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:0.5rem;min-height:60px;background:#161b22;border-radius:8px;padding:1rem;">';

        if (items.length === 0) {
            html += '<div style="color:#8b949e;font-style:italic;">Empty cache</div>';
        } else {
            items.forEach(function(item, idx) {
                var isNew = idx === newItem;
                var isAccessed = idx === accessed;
                var isEvicting = idx === evicting;

                var bg = isNew ? 'linear-gradient(135deg,#238636,#2ea043)' :
                         (isAccessed ? 'linear-gradient(135deg,#1f6feb,#388bfd)' :
                         (isEvicting ? 'linear-gradient(135deg,#da3633,#f85149)' : '#21262d'));
                var border = isNew ? '2px solid #3fb950' :
                            (isAccessed ? '2px solid #58a6ff' :
                            (isEvicting ? '2px solid #f85149' : '2px solid #30363d'));
                var glow = isNew ? 'box-shadow:0 0 10px rgba(63,185,80,0.5);' :
                          (isAccessed ? 'box-shadow:0 0 10px rgba(88,166,255,0.5);' :
                          (isEvicting ? 'box-shadow:0 0 10px rgba(248,81,73,0.5);' : ''));

                html += '<div style="display:flex;align-items:center;">';
                html += '<div style="background:' + bg + ';border:' + border + ';border-radius:8px;padding:0.5rem 0.75rem;display:flex;flex-direction:column;align-items:center;transition:all 0.3s;' + glow + '">';
                html += '<span style="color:#fff;font-weight:bold;font-size:1.1rem;">' + item.key + '</span>';
                html += '<span style="color:#8b949e;font-size:0.75rem;">:' + item.value + '</span>';
                html += '</div>';

                // Arrow to next
                if (idx < items.length - 1) {
                    html += '<div style="color:#58a6ff;margin:0 0.3rem;font-size:1.2rem;">⟷</div>';
                }
                html += '</div>';
            });
        }

        html += '</div>';

        // Empty slots indicator
        var emptySlots = capacity - items.length;
        if (emptySlots > 0) {
            html += '<div style="margin-top:0.5rem;text-align:center;color:#8b949e;font-size:0.8rem;">';
            html += emptySlots + ' empty slot' + (emptySlots > 1 ? 's' : '') + ' remaining';
            html += '</div>';
        }

        // Legend
        html += '<div style="display:flex;justify-content:center;gap:1.5rem;margin-top:1rem;flex-wrap:wrap;">';
        html += '<div style="display:flex;align-items:center;gap:0.3rem;"><div style="width:12px;height:12px;background:#238636;border-radius:3px;"></div><span style="color:#8b949e;font-size:0.75rem;">New</span></div>';
        html += '<div style="display:flex;align-items:center;gap:0.3rem;"><div style="width:12px;height:12px;background:#1f6feb;border-radius:3px;"></div><span style="color:#8b949e;font-size:0.75rem;">Accessed</span></div>';
        html += '<div style="display:flex;align-items:center;gap:0.3rem;"><div style="width:12px;height:12px;background:#da3633;border-radius:3px;"></div><span style="color:#8b949e;font-size:0.75rem;">Evicting</span></div>';
        html += '</div>';

        html += '</div>';
        return html;
    }

    // String Matching Visualization (KMP, etc.)
    function renderStringMatchingViz(step) {
        var html = '<div style="text-align:center;padding:1rem;">';

        var text = step.text || '';
        var pattern = step.pattern || '';
        var textIdx = step.textIdx !== undefined ? step.textIdx : -1;
        var patternIdx = step.patternIdx !== undefined ? step.patternIdx : -1;
        var matchedIndices = step.matchedIndices || [];
        var failureTable = step.failureTable || [];
        var result = step.result;

        // Handle empty data
        if (!text && !pattern) {
            html += '<div style="color:#8b949e;">No string matching data available</div>';
            if (result !== undefined) {
                html += '<div style="margin-top:1rem;"><span style="color:#8b949e;">Result: </span><span style="color:#3fb950;">' + JSON.stringify(result) + '</span></div>';
            }
            html += '</div>';
            return html;
        }

        // Show text string with highlighting
        html += '<div style="margin-bottom:1rem;">';
        html += '<div style="color:#8b949e;font-size:0.75rem;margin-bottom:0.25rem;">Text:</div>';
        html += '<div style="display:flex;flex-wrap:wrap;gap:2px;justify-content:center;">';
        for (var i = 0; i < text.length; i++) {
            var isCurrentText = i === textIdx;
            var isMatched = matchedIndices.indexOf(i) !== -1;
            var bg = isCurrentText ? 'linear-gradient(135deg,#238636,#2ea043)' :
                     (isMatched ? '#1f6feb' : '#21262d');
            var border = isCurrentText ? '2px solid #3fb950' :
                        (isMatched ? '2px solid #58a6ff' : '2px solid #30363d');
            html += '<div style="min-width:28px;height:32px;background:' + bg + ';border:' + border + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:4px;font-family:monospace;font-size:0.9rem;">' + text[i] + '</div>';
        }
        html += '</div>';
        html += '</div>';

        // Show pattern string with highlighting
        if (pattern) {
            html += '<div style="margin-bottom:1rem;">';
            html += '<div style="color:#8b949e;font-size:0.75rem;margin-bottom:0.25rem;">Pattern:</div>';
            html += '<div style="display:flex;flex-wrap:wrap;gap:2px;justify-content:center;">';
            for (var j = 0; j < pattern.length; j++) {
                var isCurrentPattern = j === patternIdx;
                var isMatchedPattern = j < patternIdx;
                var bgP = isCurrentPattern ? 'linear-gradient(135deg,#f0883e,#d29922)' :
                         (isMatchedPattern ? '#1f6feb' : '#21262d');
                var borderP = isCurrentPattern ? '2px solid #f0883e' :
                             (isMatchedPattern ? '2px solid #58a6ff' : '2px solid #30363d');
                html += '<div style="min-width:28px;height:32px;background:' + bgP + ';border:' + borderP + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:4px;font-family:monospace;font-size:0.9rem;">' + pattern[j] + '</div>';
            }
            html += '</div>';
            html += '</div>';
        }

        // Show failure/LPS table if available
        if (failureTable && failureTable.length > 0) {
            html += '<div style="margin-top:1rem;">';
            html += '<div style="color:#8b949e;font-size:0.75rem;margin-bottom:0.25rem;">Failure Table (LPS):</div>';
            html += '<div style="display:flex;flex-wrap:wrap;gap:2px;justify-content:center;">';
            for (var k = 0; k < failureTable.length; k++) {
                html += '<div style="min-width:28px;height:28px;background:#21262d;border:2px solid #30363d;color:#58a6ff;display:flex;align-items:center;justify-content:center;border-radius:4px;font-family:monospace;font-size:0.8rem;">' + failureTable[k] + '</div>';
            }
            html += '</div>';
            html += '</div>';
        }

        // Show result if available
        if (result !== undefined) {
            html += '<div style="margin-top:1rem;">';
            html += '<span style="color:#8b949e;">Result: </span>';
            html += '<span style="color:#3fb950;font-family:monospace;">' + JSON.stringify(result) + '</span>';
            html += '</div>';
        }

        // Legend
        html += '<div style="display:flex;justify-content:center;gap:1rem;margin-top:1rem;flex-wrap:wrap;">';
        html += '<div style="display:flex;align-items:center;gap:0.3rem;"><div style="width:12px;height:12px;background:#238636;border-radius:3px;"></div><span style="color:#8b949e;font-size:0.75rem;">Current (text)</span></div>';
        html += '<div style="display:flex;align-items:center;gap:0.3rem;"><div style="width:12px;height:12px;background:#f0883e;border-radius:3px;"></div><span style="color:#8b949e;font-size:0.75rem;">Current (pattern)</span></div>';
        html += '<div style="display:flex;align-items:center;gap:0.3rem;"><div style="width:12px;height:12px;background:#1f6feb;border-radius:3px;"></div><span style="color:#8b949e;font-size:0.75rem;">Matched</span></div>';
        html += '</div>';

        html += '</div>';
        return html;
    }

    // Tree Visualization
    function renderTreeViz(step) {
        var html = '';
        var nodes = step.nodes || [];
        var edges = step.edges || [];
        var visited = step.visited || [];
        var current = step.current;
        var previous = step.previous;
        var next = step.next;

        // Handle empty or invalid nodes
        if (!nodes || nodes.length === 0) {
            return '<div style="text-align:center;padding:1rem;color:#8b949e;">No tree data available</div>';
        }

        html += '<div style="text-align:center;padding:1rem;">';

        // Simple tree layout - show nodes in levels
        var levels = [];
        var levelMap = {};

        // Calculate levels based on edges
        if (nodes.length > 0) {
            levelMap[nodes[0].id] = 0;
            levels[0] = [nodes[0]];

            edges.forEach(function(edge) {
                var parentLevel = levelMap[edge.from];
                if (parentLevel !== undefined) {
                    var childLevel = parentLevel + 1;
                    levelMap[edge.to] = childLevel;
                    if (!levels[childLevel]) levels[childLevel] = [];
                    var childNode = nodes.find(function(n) { return n.id === edge.to; });
                    if (childNode) levels[childLevel].push(childNode);
                }
            });
        }

        // Render each level
        levels.forEach(function(level, levelIdx) {
            html += '<div style="display:flex;justify-content:center;gap:1rem;margin-bottom:0.5rem;">';
            level.forEach(function(node) {
                var isVisited = visited.indexOf(node.id) !== -1;
                var isCurrent = node.id === current;
                var isPrevious = node.id === previous;
                var isNext = node.id === next;

                // Color coding: current=green, previous=orange, next=blue
                var bg, border;
                if (isCurrent) {
                    bg = 'linear-gradient(135deg,#238636,#2ea043)';
                    border = '3px solid #3fb950';
                } else if (isPrevious) {
                    bg = '#f0883e';
                    border = '3px solid #fb923c';
                } else if (isNext) {
                    bg = '#58a6ff';
                    border = '3px solid #79c0ff';
                } else if (isVisited) {
                    bg = '#1f6feb';
                    border = '2px solid #58a6ff';
                } else {
                    bg = '#21262d';
                    border = '2px solid #30363d';
                }

                // Safely get displayable label - handle objects
                var nodeLabel = node.label || node.value || node.id;
                if (nodeLabel === undefined || nodeLabel === null) {
                    nodeLabel = '?';
                } else if (typeof nodeLabel === 'object') {
                    nodeLabel = nodeLabel.value !== undefined ? nodeLabel.value : (nodeLabel.name || JSON.stringify(nodeLabel));
                }

                html += '<div style="width:45px;height:45px;background:' + bg + ';border:' + border + ';border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;transition:all 0.3s;">';
                html += nodeLabel;
                html += '</div>';
            });
            html += '</div>';

            // Draw connector lines (simple)
            if (levelIdx < levels.length - 1) {
                html += '<div style="text-align:center;color:#30363d;margin:0.25rem 0;">│</div>';
            }
        });

        // Add legend for color coding when previous/current/next are present
        if (previous || current || next) {
            html += '<div style="display:flex;gap:1rem;margin-top:1rem;flex-wrap:wrap;justify-content:center;">';
            if (previous) {
                html += '<div style="display:flex;align-items:center;gap:0.3rem;"><div style="width:12px;height:12px;background:#f0883e;border-radius:50%;"></div><span style="color:#8b949e;font-size:0.75rem;">Previous</span></div>';
            }
            if (current) {
                html += '<div style="display:flex;align-items:center;gap:0.3rem;"><div style="width:12px;height:12px;background:#238636;border-radius:50%;"></div><span style="color:#8b949e;font-size:0.75rem;">Current</span></div>';
            }
            if (next) {
                html += '<div style="display:flex;align-items:center;gap:0.3rem;"><div style="width:12px;height:12px;background:#58a6ff;border-radius:50%;"></div><span style="color:#8b949e;font-size:0.75rem;">Next</span></div>';
            }
            html += '</div>';
        }

        // Show running sum or other state
        if (step.runningSum !== undefined) {
            html += '<div style="margin-top:1rem;background:#f0883e22;border-radius:6px;padding:0.5rem;">';
            html += '<span style="color:#f0883e;">Running sum: <strong>' + step.runningSum + '</strong></span>';
            html += '</div>';
        }

        // Show branch sums
        if (step.branchSums && step.branchSums.length > 0) {
            html += '<div style="margin-top:1rem;background:#23863622;border-radius:6px;padding:0.5rem;">';
            html += '<span style="color:#3fb950;">Branch sums: [' + step.branchSums.join(', ') + ']</span>';
            html += '</div>';
        }

        // Show queue for BFS
        if (step.queue && step.queue.length > 0) {
            html += '<div style="margin-top:1rem;background:#21262d;border-radius:6px;padding:0.5rem;">';
            html += '<div style="color:#f0883e;font-size:0.8rem;">Queue: ';
            html += step.queue.map(function(q) {
                var n = nodes.find(function(node) { return node.id === q; });
                return n ? n.label : q;
            }).join(', ');
            html += '</div></div>';
        }

        html += '</div>';
        return html;
    }

    // Recursion Visualization (Call Stack)
    function renderRecursionViz(step) {
        var html = '';
        var stack = step.stack || [];
        var result = step.result;
        var memo = step.memo || {};

        html += '<div style="text-align:center;padding:1rem;">';

        // Current call - ensure proper display value
        var callDisplay = step.call;
        if (callDisplay === undefined || callDisplay === null) {
            callDisplay = 'recursion()';
        } else if (typeof callDisplay === 'object') {
            callDisplay = JSON.stringify(callDisplay);
        }
        html += '<div style="font-size:1.5rem;color:#58a6ff;font-family:monospace;margin-bottom:1rem;">' + callDisplay + '</div>';

        // Call stack visualization
        if (stack.length > 0) {
            html += '<div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;">';
            stack.forEach(function(call, idx) {
                var isTop = idx === stack.length - 1;
                var indent = idx * 20;
                var bg = isTop ? '#238636' : '#21262d';
                var border = isTop ? '#3fb950' : '#30363d';

                // Safely display call
                var callStr = call;
                if (callStr === undefined || callStr === null) {
                    callStr = '?';
                } else if (typeof callStr === 'object') {
                    callStr = JSON.stringify(callStr);
                }

                html += '<div style="display:flex;align-items:center;gap:0.5rem;margin-left:' + indent + 'px;">';
                if (idx > 0) {
                    html += '<span style="color:#30363d;">↳</span>';
                }
                html += '<div style="background:' + bg + ';border:1px solid ' + border + ';border-radius:6px;padding:0.5rem 1rem;font-family:monospace;color:#c9d1d9;">';
                html += callStr;
                html += '</div></div>';
            });
            html += '</div>';
        }

        // Return value - handle all edge cases
        if (result !== null && result !== undefined) {
            var resultDisplay = result;
            if (typeof resultDisplay === 'object') {
                resultDisplay = JSON.stringify(resultDisplay);
            }
            html += '<div style="margin-top:1.5rem;padding:1rem;background:#1f6feb33;border:1px solid #58a6ff;border-radius:8px;">';
            html += '<span style="color:#3fb950;font-size:1.2rem;">Return: ' + resultDisplay + '</span>';
            if (step.memoHit || (step.memo && Object.keys(step.memo).length > 0)) {
                html += ' <span style="color:#f0883e;background:#f0883e22;padding:0.2rem 0.5rem;border-radius:4px;font-size:0.85rem;">📦 memoized</span>';
            }
            html += '</div>';
        }

        // Memo table
        if (memo && Object.keys(memo).length > 0) {
            html += '<div style="margin-top:1rem;background:#21262d;border-radius:6px;padding:0.5rem;">';
            html += '<div style="color:#f0883e;font-size:0.8rem;margin-bottom:0.25rem;">Memo:</div>';
            html += '<div style="color:#c9d1d9;font-family:monospace;font-size:0.85rem;">';
            html += '{' + Object.keys(memo).map(function(k) {
                var val = memo[k];
                if (val === undefined) val = 'undefined';
                else if (val === null) val = 'null';
                else if (typeof val === 'object') val = JSON.stringify(val);
                return k + ':' + val;
            }).join(', ') + '}';
            html += '</div></div>';
        }

        html += '</div>';
        return html;
    }

    // DP Table Visualization
    function renderDPTableViz(step) {
        var html = '';
        var table = step.table || [];
        var rowHeaders = step.rowHeaders || [];
        var colHeaders = step.colHeaders || [];
        var computing = step.computing;

        html += '<div style="overflow-x:auto;padding:0.5rem;">';
        html += '<table style="border-collapse:collapse;margin:0 auto;font-family:monospace;">';

        // Header row
        if (colHeaders.length > 0) {
            html += '<tr>';
            html += '<th style="padding:0.4rem;border:1px solid #30363d;background:#21262d;color:#8b949e;"></th>';
            colHeaders.forEach(function(h) {
                html += '<th style="padding:0.4rem;border:1px solid #30363d;background:#21262d;color:#58a6ff;min-width:35px;">' + h + '</th>';
            });
            html += '</tr>';
        }

        // Data rows
        table.forEach(function(row, i) {
            html += '<tr>';
            if (rowHeaders.length > i) {
                html += '<th style="padding:0.4rem;border:1px solid #30363d;background:#21262d;color:#58a6ff;">' + rowHeaders[i] + '</th>';
            }
            row.forEach(function(cell, j) {
                var isComputing = computing && computing[0] === i && computing[1] === j;
                var bg = isComputing ? '#238636' : '#161b22';
                var border = isComputing ? '2px solid #3fb950' : '1px solid #30363d';
                var color = isComputing ? '#fff' : '#c9d1d9';
                var displayVal = cell === Infinity ? '∞' : (cell === null ? '' : cell);
                html += '<td style="padding:0.4rem;border:' + border + ';background:' + bg + ';color:' + color + ';text-align:center;min-width:35px;transition:all 0.3s;">' + displayVal + '</td>';
            });
            html += '</tr>';
        });

        html += '</table>';

        // Show result
        if (step.result !== undefined) {
            html += '<div style="margin-top:1rem;text-align:center;">';
            html += '<span style="background:#23863622;color:#3fb950;padding:0.5rem 1rem;border-radius:6px;font-size:1.1rem;">Result: ' + step.result + '</span>';
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    // Famous Algorithm Visualization
    function renderFamousAlgorithmViz(step) {
        var html = '';
        var algorithm = step.algorithm || 'Algorithm';

        html += '<div style="text-align:center;padding:1.5rem;">';

        // Algorithm name badge
        html += '<div style="display:inline-block;background:linear-gradient(135deg,#1f6feb,#a371f7);color:#fff;padding:0.75rem 1.5rem;border-radius:8px;font-weight:bold;font-size:1.2rem;margin-bottom:1.5rem;">';
        html += algorithm.charAt(0).toUpperCase() + algorithm.slice(1);
        html += '</div>';

        // Phase indicator
        if (step.phase === 'processing') {
            html += '<div style="margin:1rem 0;">';
            html += '<div style="display:inline-block;background:#21262d;border-radius:8px;padding:1rem 2rem;">';
            html += '<div style="display:flex;align-items:center;gap:0.5rem;color:#f0883e;">';
            html += '<span style="animation:pulse 1.5s infinite;">⚙️</span>';
            html += '<span>Processing...</span>';
            html += '</div>';
            html += '</div></div>';
        }

        // Result
        if (step.result !== undefined) {
            html += '<div style="margin-top:1.5rem;padding:1rem;background:#23863622;border:1px solid #3fb950;border-radius:8px;">';
            html += '<div style="color:#3fb950;font-size:1.1rem;">';
            html += '✅ Result: <strong>' + JSON.stringify(step.result) + '</strong>';
            html += '</div></div>';
        }

        html += '</div>';
        return html;
    }

    // Array + Hash Table visualization (Two Sum style)
    function renderArrayHashViz(step) {
        if (!step.array) return '<p>No data</p>';
        var html = '';

        if (step.checking !== undefined) {
            html += '<div style="margin-bottom:1rem;">' +
                '<span style="color:#f0883e;font-weight:600;">Checking: ' + step.checking + '</span></div>';
        }

        html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Array:</div>';
        html += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1.5rem;">';
        step.array.forEach(function(val, idx) {
            var isActive = idx === step.currentIndex;
            var bg = isActive ? 'linear-gradient(135deg,#238636,#2ea043)' : '#21262d';
            var border = isActive ? '2px solid #3fb950' : '2px solid #30363d';
            html += '<div style="width:70px;height:50px;background:' + bg + ';border:' + border + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:bold;font-size:1.1rem;transition:all 0.3s;">' + val + '</div>';
        });
        html += '</div>';

        if (step.hashTable) {
            html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Hash Table:</div>';
            html += '<div style="display:inline-block;background:#21262d;border:2px solid #238636;border-radius:6px;padding:0.75rem 1rem;color:#3fb950;font-family:monospace;">';
            html += '{ ' + step.hashTable.join(', ') + ' }';
            html += '</div>';
        }

        return html;
    }

    // Two arrays visualization (Validate Subsequence style)
    function renderTwoArraysViz(step) {
        var html = '';

        // First array
        if (step.arr1 || step.array) {
            var arr = step.arr1 || step.array;
            html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Array:</div>';
            html += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:1rem;">';
            arr.forEach(function(val, idx) {
                var isActive = idx === step.arrIdx || idx === step.idx1;
                var bg = isActive ? 'linear-gradient(135deg,#238636,#2ea043)' : '#21262d';
                var border = isActive ? '2px solid #3fb950' : '2px solid #30363d';
                html += '<div style="width:50px;height:45px;background:' + bg + ';border:' + border + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:bold;font-size:1rem;">' + val + '</div>';
            });
            html += '</div>';
        }

        // Second array (sequence)
        if (step.arr2 || step.sequence) {
            var seq = step.arr2 || step.sequence;
            html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Sequence:</div>';
            html += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:1rem;">';
            seq.forEach(function(val, idx) {
                var isActive = idx === step.seqIdx || idx === step.idx2;
                var isMatched = idx < (step.seqIdx || 0);
                var bg = isActive ? 'linear-gradient(135deg,#1f6feb,#388bfd)' : (isMatched ? '#238636' : '#21262d');
                var border = isActive ? '2px solid #58a6ff' : (isMatched ? '2px solid #3fb950' : '2px solid #30363d');
                html += '<div style="width:50px;height:45px;background:' + bg + ';border:' + border + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:bold;font-size:1rem;">' + val + '</div>';
            });
            html += '</div>';
        }

        // Result array if present
        if (step.result && Array.isArray(step.result)) {
            html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Result:</div>';
            html += '<div style="display:flex;gap:6px;flex-wrap:wrap;">';
            step.result.forEach(function(val) {
                html += '<div style="width:50px;height:45px;background:#238636;border:2px solid #3fb950;color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:bold;font-size:1rem;">' + val + '</div>';
            });
            html += '</div>';
        }

        if (step.match !== undefined) {
            html += '<div style="margin-top:1rem;color:' + (step.match ? '#3fb950' : '#f0883e') + ';font-weight:600;">' + (step.match ? '✓ Match!' : '✗ No match') + '</div>';
        }

        return html;
    }

    // Two pointer visualization (Move Element to End style)
    function renderTwoPointerViz(step) {
        if (!step.array) return '<p>No data</p>';
        var html = '';

        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:1rem;">';
        step.array.forEach(function(val, idx) {
            var isLeft = idx === step.left;
            var isRight = idx === step.right;
            var isToMove = val === step.toMove;
            var bg = isLeft ? 'linear-gradient(135deg,#238636,#2ea043)' : (isRight ? 'linear-gradient(135deg,#1f6feb,#388bfd)' : (isToMove ? '#da363633' : '#21262d'));
            var border = isLeft ? '2px solid #3fb950' : (isRight ? '2px solid #58a6ff' : (isToMove ? '2px solid #da3633' : '2px solid #30363d'));
            html += '<div style="position:relative;width:50px;height:50px;background:' + bg + ';border:' + border + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:bold;font-size:1.1rem;">';
            html += val;
            if (isLeft) html += '<div style="position:absolute;top:-20px;color:#3fb950;font-size:0.7rem;">L</div>';
            if (isRight) html += '<div style="position:absolute;top:-20px;color:#58a6ff;font-size:0.7rem;">R</div>';
            html += '</div>';
        });
        html += '</div>';

        html += '<div style="display:flex;gap:1.5rem;margin-top:0.5rem;">';
        html += '<span style="color:#3fb950;">● Left pointer</span>';
        html += '<span style="color:#58a6ff;">● Right pointer</span>';
        html += '<span style="color:#da3633;">● To move: ' + step.toMove + '</span>';
        html += '</div>';

        return html;
    }

    // Two pointer with result visualization (Sorted Squared Array style)
    function renderTwoPointerResultViz(step) {
        if (!step.array) return '<p>No data</p>';
        var html = '';

        html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Input Array:</div>';
        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:1rem;">';
        step.array.forEach(function(val, idx) {
            var isLeft = idx === step.left;
            var isRight = idx === step.right;
            var bg = isLeft ? 'linear-gradient(135deg,#238636,#2ea043)' : (isRight ? 'linear-gradient(135deg,#1f6feb,#388bfd)' : '#21262d');
            var border = isLeft ? '2px solid #3fb950' : (isRight ? '2px solid #58a6ff' : '2px solid #30363d');
            html += '<div style="position:relative;width:50px;height:45px;background:' + bg + ';border:' + border + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:bold;">';
            html += val;
            if (isLeft) html += '<div style="position:absolute;top:-18px;color:#3fb950;font-size:0.65rem;">L</div>';
            if (isRight) html += '<div style="position:absolute;top:-18px;color:#58a6ff;font-size:0.65rem;">R</div>';
            html += '</div>';
        });
        html += '</div>';

        if (step.result) {
            html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Result Array:</div>';
            html += '<div style="display:flex;gap:6px;flex-wrap:wrap;">';
            step.result.forEach(function(val, idx) {
                var isInsert = idx === step.insertIdx;
                var bg = isInsert ? 'linear-gradient(135deg,#f0883e,#d29922)' : (val !== 0 ? '#238636' : '#21262d');
                var border = isInsert ? '2px solid #f0883e' : (val !== 0 ? '2px solid #3fb950' : '2px solid #30363d');
                html += '<div style="width:50px;height:45px;background:' + bg + ';border:' + border + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:bold;">' + val + '</div>';
            });
            html += '</div>';
        }

        return html;
    }

    // Three pointer visualization (Three Number Sum style)
    function renderThreePointerViz(step) {
        if (!step.array) return '<p>No data</p>';
        var html = '';

        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:1rem;">';
        step.array.forEach(function(val, idx) {
            var isI = idx === step.i;
            var isLeft = idx === step.left;
            var isRight = idx === step.right;
            var bg = isI ? 'linear-gradient(135deg,#f0883e,#d29922)' : (isLeft ? 'linear-gradient(135deg,#238636,#2ea043)' : (isRight ? 'linear-gradient(135deg,#1f6feb,#388bfd)' : '#21262d'));
            var border = isI ? '2px solid #f0883e' : (isLeft ? '2px solid #3fb950' : (isRight ? '2px solid #58a6ff' : '2px solid #30363d'));
            html += '<div style="position:relative;width:45px;height:45px;background:' + bg + ';border:' + border + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:bold;">';
            html += val;
            if (isI) html += '<div style="position:absolute;top:-18px;color:#f0883e;font-size:0.65rem;">i</div>';
            if (isLeft) html += '<div style="position:absolute;top:-18px;color:#3fb950;font-size:0.65rem;">L</div>';
            if (isRight) html += '<div style="position:absolute;top:-18px;color:#58a6ff;font-size:0.65rem;">R</div>';
            html += '</div>';
        });
        html += '</div>';

        if (step.sum !== undefined) {
            html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Sum: <span style="color:#c9d1d9;">' + step.sum + '</span></div>';
        }

        if (step.triplets && step.triplets.length > 0) {
            html += '<div style="margin-top:0.5rem;color:#8b949e;">Found triplets:</div>';
            html += '<div style="color:#3fb950;font-family:monospace;">' + JSON.stringify(step.triplets) + '</div>';
        }

        return html;
    }

    // Spiral matrix visualization
    function renderSpiralMatrixViz(step) {
        if (!step.matrix) return '<p>No data</p>';
        var html = '';

        html += '<div style="overflow-x:auto;margin-bottom:1rem;">';
        html += '<table style="border-collapse:collapse;">';
        step.matrix.forEach(function(row, rowIdx) {
            html += '<tr>';
            row.forEach(function(val, colIdx) {
                var isVisited = step.result && step.result.indexOf(val) !== -1;
                var isCurrent = step.currentCell && step.currentCell[0] === rowIdx && step.currentCell[1] === colIdx;
                var bg = isCurrent ? '#238636' : (isVisited ? '#1f6feb33' : '#21262d');
                var border = isCurrent ? '2px solid #3fb950' : '1px solid #30363d';
                html += '<td style="width:45px;height:45px;text-align:center;background:' + bg + ';border:' + border + ';color:#c9d1d9;font-weight:bold;">' + val + '</td>';
            });
            html += '</tr>';
        });
        html += '</table></div>';

        if (step.result) {
            html += '<div style="color:#8b949e;">Result: <span style="color:#3fb950;font-family:monospace;">[' + step.result.join(', ') + ']</span></div>';
        }

        return html;
    }

    // Hash table only visualization (Tournament Winner style)
    function renderHashTableViz(step) {
        var html = '';

        if (step.scores) {
            html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Scores:</div>';
            html += '<div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem;">';
            Object.keys(step.scores).forEach(function(team) {
                var isWinner = team === step.currentBest;
                var bg = isWinner ? 'linear-gradient(135deg,#238636,#2ea043)' : '#21262d';
                var border = isWinner ? '2px solid #3fb950' : '2px solid #30363d';
                html += '<div style="background:' + bg + ';border:' + border + ';border-radius:6px;padding:0.5rem 1rem;">';
                html += '<div style="color:#c9d1d9;font-weight:600;">' + team + '</div>';
                html += '<div style="color:#8b949e;font-size:0.85rem;">' + step.scores[team] + ' pts</div>';
                html += '</div>';
            });
            html += '</div>';
        }

        if (step.currentBest) {
            html += '<div style="color:#3fb950;font-weight:600;">Leader: ' + step.currentBest + '</div>';
        }

        return html;
    }

    // Array scan visualization (Non-Constructible Change, Monotonic Array style)
    function renderArrayScanViz(step) {
        if (!step.array) return '<p>No data</p>';
        var html = '';

        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:1rem;">';
        step.array.forEach(function(val, idx) {
            var isCurrent = idx === step.currentIdx;
            var isProcessed = idx < (step.currentIdx || 0);
            var bg = isCurrent ? 'linear-gradient(135deg,#238636,#2ea043)' : (isProcessed ? '#1f6feb33' : '#21262d');
            var border = isCurrent ? '2px solid #3fb950' : (isProcessed ? '2px solid #58a6ff' : '2px solid #30363d');
            html += '<div style="width:50px;height:50px;background:' + bg + ';border:' + border + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:bold;font-size:1.1rem;">' + val + '</div>';
        });
        html += '</div>';

        if (step.currentChange !== undefined) {
            html += '<div style="color:#8b949e;">Current change possible: <span style="color:#f0883e;font-weight:600;">' + step.currentChange + '</span></div>';
        }

        if (step.isIncreasing !== undefined || step.isDecreasing !== undefined) {
            html += '<div style="display:flex;gap:1rem;margin-top:0.5rem;">';
            if (step.isIncreasing !== undefined) {
                html += '<span style="color:' + (step.isIncreasing ? '#3fb950' : '#da3633') + ';">' + (step.isIncreasing ? '✓' : '✗') + ' Increasing</span>';
            }
            if (step.isDecreasing !== undefined) {
                html += '<span style="color:' + (step.isDecreasing ? '#3fb950' : '#da3633') + ';">' + (step.isDecreasing ? '✓' : '✗') + ' Decreasing</span>';
            }
            html += '</div>';
        }

        return html;
    }

    // Matrix visualization (Transpose Matrix style)
    function renderMatrixViz(step) {
        var html = '';

        if (step.matrix) {
            html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Matrix:</div>';
            html += '<div style="overflow-x:auto;margin-bottom:1rem;">';
            html += '<table style="border-collapse:collapse;">';
            step.matrix.forEach(function(row, rowIdx) {
                html += '<tr>';
                row.forEach(function(val, colIdx) {
                    var isCurrent = step.currentRow === rowIdx && step.currentCol === colIdx;
                    var bg = isCurrent ? '#238636' : '#21262d';
                    var border = isCurrent ? '2px solid #3fb950' : '1px solid #30363d';
                    html += '<td style="width:45px;height:45px;text-align:center;background:' + bg + ';border:' + border + ';color:#c9d1d9;font-weight:bold;">' + val + '</td>';
                });
                html += '</tr>';
            });
            html += '</table></div>';
        }

        if (step.result) {
            html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Result:</div>';
            html += '<div style="overflow-x:auto;">';
            html += '<table style="border-collapse:collapse;">';
            step.result.forEach(function(row) {
                html += '<tr>';
                row.forEach(function(val) {
                    html += '<td style="width:45px;height:45px;text-align:center;background:#238636;border:1px solid #3fb950;color:#c9d1d9;font-weight:bold;">' + val + '</td>';
                });
                html += '</tr>';
            });
            html += '</table></div>';
        }

        return html;
    }

    // Array products visualization
    function renderArrayProductsViz(step) {
        if (!step.array) return '<p>No data</p>';
        var html = '';

        html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Input Array:</div>';
        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:1rem;">';
        step.array.forEach(function(val, idx) {
            var isCurrent = idx === step.currentIdx;
            var bg = isCurrent ? 'linear-gradient(135deg,#238636,#2ea043)' : '#21262d';
            var border = isCurrent ? '2px solid #3fb950' : '2px solid #30363d';
            html += '<div style="width:50px;height:45px;background:' + bg + ';border:' + border + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:bold;">' + val + '</div>';
        });
        html += '</div>';

        if (step.result) {
            html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Products Array:</div>';
            html += '<div style="display:flex;gap:6px;flex-wrap:wrap;">';
            step.result.forEach(function(val, idx) {
                var isCurrent = idx === step.currentIdx;
                var bg = isCurrent ? 'linear-gradient(135deg,#1f6feb,#388bfd)' : (val !== 1 ? '#238636' : '#21262d');
                var border = isCurrent ? '2px solid #58a6ff' : (val !== 1 ? '2px solid #3fb950' : '2px solid #30363d');
                html += '<div style="width:60px;height:45px;background:' + bg + ';border:' + border + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:bold;font-size:0.9rem;">' + val + '</div>';
            });
            html += '</div>';
        }

        if (step.prefix !== undefined) {
            html += '<div style="margin-top:0.5rem;color:#8b949e;">Prefix: <span style="color:#f0883e;">' + step.prefix + '</span></div>';
        }
        if (step.suffix !== undefined) {
            html += '<div style="color:#8b949e;">Suffix: <span style="color:#58a6ff;">' + step.suffix + '</span></div>';
        }

        return html;
    }

    // Array marking visualization (First Duplicate Value style)
    function renderArrayMarkingViz(step) {
        if (!step.array) return '<p>No data</p>';
        var html = '';

        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:1rem;">';
        step.array.forEach(function(val, idx) {
            var isCurrent = idx === step.currentIdx;
            var isNegative = val < 0;
            var bg = isCurrent ? 'linear-gradient(135deg,#238636,#2ea043)' : (isNegative ? '#da363633' : '#21262d');
            var border = isCurrent ? '2px solid #3fb950' : (isNegative ? '2px solid #da3633' : '2px solid #30363d');
            html += '<div style="width:50px;height:50px;background:' + bg + ';border:' + border + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:bold;font-size:1rem;">' + val + '</div>';
        });
        html += '</div>';

        html += '<div style="display:flex;gap:1rem;">';
        html += '<span style="color:#3fb950;">● Current</span>';
        html += '<span style="color:#da3633;">● Marked (seen)</span>';
        html += '</div>';

        if (step.duplicateFound !== undefined) {
            html += '<div style="margin-top:0.5rem;color:' + (step.duplicateFound ? '#3fb950' : '#8b949e') + ';font-weight:600;">' + (step.duplicateFound ? '✓ Duplicate found: ' + step.duplicateFound : 'Searching...') + '</div>';
        }

        return html;
    }

    // Intervals visualization (Merge Overlapping Intervals style)
    function renderIntervalsViz(step) {
        if (!step.intervals) return '<p>No data</p>';
        var html = '';

        // Find min/max for scale
        var min = Infinity, max = -Infinity;
        step.intervals.forEach(function(interval) {
            min = Math.min(min, interval[0]);
            max = Math.max(max, interval[1]);
        });
        var range = max - min || 1;

        html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Intervals:</div>';
        html += '<div style="position:relative;padding:0.5rem 0;">';
        step.intervals.forEach(function(interval, idx) {
            var isCurrent = idx === step.currentIdx;
            var left = ((interval[0] - min) / range) * 80;
            var width = ((interval[1] - interval[0]) / range) * 80;
            var bg = isCurrent ? '#238636' : '#1f6feb';
            html += '<div style="position:relative;height:28px;margin-bottom:4px;">';
            html += '<div style="position:absolute;left:' + left + '%;width:' + Math.max(width, 5) + '%;height:100%;background:' + bg + ';border-radius:4px;display:flex;align-items:center;justify-content:center;">';
            html += '<span style="color:white;font-size:0.75rem;font-weight:600;">[' + interval[0] + ',' + interval[1] + ']</span>';
            html += '</div></div>';
        });
        html += '</div>';

        if (step.merged && step.merged.length > 0) {
            html += '<div style="margin-top:1rem;margin-bottom:0.5rem;color:#8b949e;">Merged:</div>';
            html += '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;">';
            step.merged.forEach(function(interval) {
                html += '<span style="background:#238636;color:white;padding:0.25rem 0.75rem;border-radius:4px;font-weight:600;">[' + interval[0] + ',' + interval[1] + ']</span>';
            });
            html += '</div>';
        }

        return html;
    }

    // Generic array visualization (fallback)
    function renderGenericArrayViz(step) {
        var html = '';

        // Handle input/output display for generic steps
        if (step.input !== undefined) {
            html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Input:</div>';
            html += '<div style="background:#21262d;border:1px solid #30363d;border-radius:6px;padding:0.75rem;margin-bottom:1rem;color:#c9d1d9;font-family:monospace;">' + (typeof step.input === 'object' ? JSON.stringify(step.input) : step.input) + '</div>';
        }

        if (step.output !== undefined) {
            html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Output:</div>';
            html += '<div style="background:#238636;border:1px solid #3fb950;border-radius:6px;padding:0.75rem;color:#c9d1d9;font-family:monospace;">' + (typeof step.output === 'object' ? JSON.stringify(step.output) : step.output) + '</div>';
        }

        // If there's an array, still show it
        if (step.array) {
            html += '<div style="margin-bottom:0.5rem;color:#8b949e;">Array:</div>';
            html += '<div style="display:flex;gap:6px;flex-wrap:wrap;">';
            step.array.forEach(function(val, idx) {
                var isActive = idx === step.currentIndex || idx === step.currentIdx;
                var bg = isActive ? 'linear-gradient(135deg,#238636,#2ea043)' : '#21262d';
                var border = isActive ? '2px solid #3fb950' : '2px solid #30363d';
                html += '<div style="width:50px;height:50px;background:' + bg + ';border:' + border + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:bold;font-size:1.1rem;">' + val + '</div>';
            });
            html += '</div>';
        }

        if (!step.input && !step.output && !step.array) {
            html += '<div style="color:#8b949e;text-align:center;padding:2rem;">' + (step.action || step.status || 'Processing...') + '</div>';
        }

        return html;
    }

    function renderTreeVisualization(step) {
        var stepNodes = step.nodes || [];
        var stepEdges = step.edges || [];
        var visited = step.visited || [];
        var current = step.current;

        // If no step.nodes provided, use default hardcoded tree for backward compatibility
        var useDefaultTree = stepNodes.length === 0;

        var html = '<svg viewBox="0 0 400 250" style="width:100%;max-width:500px;">';

        if (useDefaultTree) {
            // Default tree for backward compatibility
            var defaultEdges = [
                [200,40,120,100], [200,40,280,100],
                [120,120,70,180], [120,120,170,180],
                [280,120,230,180], [280,120,330,180]
            ];
            defaultEdges.forEach(function(e) {
                html += '<line x1="'+e[0]+'" y1="'+e[1]+'" x2="'+e[2]+'" y2="'+e[3]+'" stroke="#30363d" stroke-width="2"/>';
            });

            var defaultNodes = [
                {x:200,y:25,val:10}, {x:120,y:90,val:5}, {x:280,y:90,val:15},
                {x:70,y:165,val:2}, {x:170,y:165,val:7}, {x:230,y:165,val:13}, {x:330,y:165,val:20}
            ];

            defaultNodes.forEach(function(n) {
                var nodeVal = n.val;
                var nodeId = 'node_' + nodeVal;
                var isVisited = visited.indexOf(nodeId) !== -1 || visited.indexOf(nodeVal) !== -1 || visited.indexOf(String(nodeVal)) !== -1;
                var isCurrent = current === nodeId || current === nodeVal || current === String(nodeVal);
                var isActive = step.nodes && step.nodes.some(function(sn) { return sn.active && (sn.val === nodeVal || sn.value === nodeVal); });

                var fill = isCurrent ? '#238636' : (isActive ? '#238636' : (isVisited ? '#1f6feb' : '#21262d'));
                var stroke = isCurrent ? '#3fb950' : (isActive ? '#3fb950' : (isVisited ? '#58a6ff' : '#30363d'));

                html += '<circle cx="'+n.x+'" cy="'+n.y+'" r="22" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2"/>';
                html += '<text x="'+n.x+'" y="'+(n.y+5)+'" fill="white" text-anchor="middle" font-weight="bold" font-size="14">'+nodeVal+'</text>';
            });
        } else {
            // Use actual step.nodes and step.edges
            // Calculate positions based on tree structure
            var nodePositions = {};
            var levels = {};

            // Build level map from edges
            if (stepNodes.length > 0) {
                var rootNode = stepNodes[0];
                var rootId = rootNode.id || rootNode.label || rootNode.value || 0;
                levels[rootId] = 0;

                stepEdges.forEach(function(edge) {
                    var from = edge.from || edge[0];
                    var to = edge.to || edge[1];
                    if (levels[from] !== undefined) {
                        levels[to] = levels[from] + 1;
                    }
                });
            }

            // Group nodes by level
            var levelGroups = {};
            stepNodes.forEach(function(node) {
                var nodeId = node.id || node.label || node.value;
                var level = levels[nodeId] !== undefined ? levels[nodeId] : 0;
                if (!levelGroups[level]) levelGroups[level] = [];
                levelGroups[level].push(node);
            });

            // Calculate positions
            var maxLevel = Math.max.apply(null, Object.keys(levelGroups).map(Number)) || 0;
            var levelHeight = 200 / Math.max(maxLevel + 1, 3);

            Object.keys(levelGroups).forEach(function(levelStr) {
                var level = parseInt(levelStr);
                var nodesAtLevel = levelGroups[level];
                var levelWidth = 350 / Math.max(nodesAtLevel.length, 1);
                nodesAtLevel.forEach(function(node, idx) {
                    var nodeId = node.id || node.label || node.value;
                    nodePositions[nodeId] = {
                        x: 25 + levelWidth * (idx + 0.5),
                        y: 25 + level * levelHeight
                    };
                });
            });

            // Draw edges
            stepEdges.forEach(function(edge) {
                var from = edge.from || edge[0];
                var to = edge.to || edge[1];
                var p1 = nodePositions[from];
                var p2 = nodePositions[to];
                if (p1 && p2) {
                    html += '<line x1="'+p1.x+'" y1="'+p1.y+'" x2="'+p2.x+'" y2="'+p2.y+'" stroke="#30363d" stroke-width="2"/>';
                }
            });

            // Draw nodes
            stepNodes.forEach(function(node) {
                var nodeId = node.id || node.label || node.value;
                var nodeLabel = node.label || node.value || node.id || '?';
                var pos = nodePositions[nodeId];
                if (!pos) return;

                var isVisited = visited.indexOf(nodeId) !== -1 || visited.indexOf(String(nodeId)) !== -1;
                var isCurrent = current === nodeId || current === String(nodeId);
                var isActive = node.active === true;

                var fill = isCurrent ? '#238636' : (isActive ? '#238636' : (isVisited ? '#1f6feb' : '#21262d'));
                var stroke = isCurrent ? '#3fb950' : (isActive ? '#3fb950' : (isVisited ? '#58a6ff' : '#30363d'));

                html += '<circle cx="'+pos.x+'" cy="'+pos.y+'" r="22" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2"/>';
                var displayLabel = String(nodeLabel).substring(0, 3);
                var fontSize = displayLabel.length > 2 ? 11 : 14;
                html += '<text x="'+pos.x+'" y="'+(pos.y+5)+'" fill="white" text-anchor="middle" font-weight="bold" font-size="'+fontSize+'">'+displayLabel+'</text>';
            });
        }

        html += '</svg>';

        // Legend
        html += '<div style="display:flex;justify-content:center;gap:1rem;margin-top:0.5rem;flex-wrap:wrap;">';
        html += '<div style="display:flex;align-items:center;gap:0.3rem;"><div style="width:12px;height:12px;background:#238636;border-radius:50%;"></div><span style="color:#8b949e;font-size:0.75rem;">Current</span></div>';
        html += '<div style="display:flex;align-items:center;gap:0.3rem;"><div style="width:12px;height:12px;background:#1f6feb;border-radius:50%;"></div><span style="color:#8b949e;font-size:0.75rem;">Visited</span></div>';
        html += '<div style="display:flex;align-items:center;gap:0.3rem;"><div style="width:12px;height:12px;background:#21262d;border:1px solid #30363d;border-radius:50%;"></div><span style="color:#8b949e;font-size:0.75rem;">Unvisited</span></div>';
        html += '</div>';

        html += '<div style="margin-top:0.5rem;color:#8b949e;font-size:0.85rem;">' + (step.action || step.status || '') + '</div>';

        if (visited.length > 0) {
            html += '<div style="margin-top:0.25rem;color:#58a6ff;font-size:0.8rem;">Visited: [' + visited.map(function(v) { return typeof v === 'object' ? v.id || v.value : v; }).join(' → ') + ']</div>';
        }

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

        step.nodes.forEach(function(node, idx) {
            var isCurrent = step.pointers && step.pointers.current === idx;
            var isHead = step.pointers && step.pointers.head === idx;
            var isPrev = step.pointers && step.pointers.prev === idx;
            var isSlow = step.pointers && step.pointers.slow === idx;
            var isFast = step.pointers && step.pointers.fast === idx;

            // Determine background color based on pointer state
            var bg = isCurrent ? 'linear-gradient(135deg,#238636,#2ea043)' :
                     (isSlow ? '#a855f7' : (isFast ? '#f97316' : '#21262d'));
            var border = isCurrent ? '2px solid #3fb950' :
                        (isSlow ? '2px solid #c084fc' : (isFast ? '2px solid #fb923c' : '2px solid #30363d'));

            // Extract value from node object properly
            var displayValue = node;
            if (typeof node === 'object' && node !== null) {
                displayValue = node.value !== undefined ? node.value :
                              (node.val !== undefined ? node.val :
                              (node.data !== undefined ? node.data : JSON.stringify(node)));
            }
            if (displayValue === undefined || displayValue === null) {
                displayValue = 'null';
            }

            html += '<div style="display:flex;flex-direction:column;align-items:center;">';

            // Show pointer labels with priority order
            if (isHead) html += '<div style="color:#58a6ff;font-size:0.75rem;margin-bottom:4px;">HEAD</div>';
            else if (isSlow) html += '<div style="color:#a855f7;font-size:0.75rem;margin-bottom:4px;">SLOW</div>';
            else if (isFast) html += '<div style="color:#f97316;font-size:0.75rem;margin-bottom:4px;">FAST</div>';
            else if (isPrev) html += '<div style="color:#f0883e;font-size:0.75rem;margin-bottom:4px;">PREV</div>';
            else if (isCurrent) html += '<div style="color:#3fb950;font-size:0.75rem;margin-bottom:4px;">CURR</div>';
            else html += '<div style="height:18px;"></div>';

            html += '<div style="display:flex;align-items:center;">';
            html += '<div style="width:50px;height:50px;background:' + bg + ';border:' + border + ';color:#c9d1d9;display:flex;align-items:center;justify-content:center;border-radius:8px;font-weight:bold;font-size:1.2rem;">' + displayValue + '</div>';

            if (idx < step.nodes.length - 1) {
                html += '<div style="width:40px;height:3px;background:#30363d;position:relative;">' +
                    '<div style="position:absolute;right:-6px;top:-5px;width:0;height:0;border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:10px solid #30363d;"></div></div>';
            }
            html += '</div></div>';
        });

        html += '<div style="margin-left:8px;color:#3fb950;font-weight:bold;font-size:0.9rem;">NULL</div>';
        html += '</div>';

        // Show title/description
        if (step.status) {
            html += '<div style="margin-top:0.5rem;color:#c9d1d9;font-weight:500;">' + step.status + '</div>';
        }
        html += '<div style="margin-top:0.5rem;color:#8b949e;">' + (step.action || '') + '</div>';

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

        var nodes = step.nodes || [];
        var edges = step.edges || [];
        var visited = step.visited || [];
        var current = step.current;

        // Handle empty or invalid nodes
        if (!nodes || nodes.length === 0) {
            return '<div style="text-align:center;padding:1rem;color:#8b949e;">No graph data available</div>';
        }

        // Calculate dynamic positions for any node set
        var positions = {};
        var numNodes = nodes.length;

        if (numNodes <= 10) {
            // Circular layout for small graphs
            var centerX = 150, centerY = 130, radius = 90;
            nodes.forEach(function(node, idx) {
                var nodeId = typeof node === 'object' ? (node.id || node.label || idx) : node;
                var angle = (2 * Math.PI * idx / numNodes) - Math.PI / 2;
                positions[nodeId] = [
                    Math.round(centerX + radius * Math.cos(angle)),
                    Math.round(centerY + radius * Math.sin(angle))
                ];
            });
        } else {
            // Grid layout for larger graphs
            var cols = Math.ceil(Math.sqrt(numNodes));
            var spacing = 60;
            var startX = 40, startY = 40;
            nodes.forEach(function(node, idx) {
                var nodeId = typeof node === 'object' ? (node.id || node.label || idx) : node;
                var row = Math.floor(idx / cols);
                var col = idx % cols;
                positions[nodeId] = [startX + col * spacing, startY + row * spacing];
            });
        }

        // Calculate SVG viewBox dimensions
        var maxX = 300, maxY = 260;
        Object.values(positions).forEach(function(pos) {
            maxX = Math.max(maxX, pos[0] + 40);
            maxY = Math.max(maxY, pos[1] + 40);
        });

        var html = '<svg viewBox="0 0 ' + maxX + ' ' + maxY + '" style="width:100%;max-width:500px;">';

        // Arrow marker definition for directed edges
        html += '<defs><marker id="arrowhead-graph" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/></marker></defs>';

        // Draw edges
        edges.forEach(function(e) {
            var fromId = typeof e === 'object' ? (e.from || e[0]) : e[0];
            var toId = typeof e === 'object' ? (e.to || e[1]) : e[1];
            var p1 = positions[fromId];
            var p2 = positions[toId];
            if (p1 && p2) {
                // Calculate shorter line to not overlap with node circles
                var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
                var dist = Math.sqrt(dx * dx + dy * dy);
                var offset = 24; // node radius
                if (dist > 2 * offset) {
                    var x1 = p1[0] + (dx / dist) * offset;
                    var y1 = p1[1] + (dy / dist) * offset;
                    var x2 = p2[0] - (dx / dist) * offset;
                    var y2 = p2[1] - (dy / dist) * offset;
                    html += '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="#58a6ff" stroke-width="2" marker-end="url(#arrowhead-graph)"/>';
                }
            }
        });

        // Draw nodes
        nodes.forEach(function(n) {
            var nodeId = typeof n === 'object' ? (n.id || n.label || n.value) : n;
            var nodeLabel = typeof n === 'object' ? (n.label || n.id || n.value || '?') : n;
            if (typeof nodeLabel === 'object') {
                nodeLabel = nodeLabel.name || nodeLabel.value || JSON.stringify(nodeLabel);
            }
            var pos = positions[nodeId];
            if (!pos) return;

            var isVisited = visited.indexOf(nodeId) !== -1;
            var isCurrent = current === nodeId;
            var fill = isCurrent ? '#238636' : (isVisited ? '#1f6feb' : '#21262d');
            var stroke = isCurrent ? '#3fb950' : (isVisited ? '#58a6ff' : '#30363d');

            html += '<circle cx="'+pos[0]+'" cy="'+pos[1]+'" r="24" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2"/>';
            // Truncate long labels
            var displayLabel = String(nodeLabel).substring(0, 4);
            var fontSize = displayLabel.length > 2 ? 11 : 14;
            html += '<text x="'+pos[0]+'" y="'+(pos[1]+5)+'" fill="white" text-anchor="middle" font-weight="bold" font-size="'+fontSize+'">'+displayLabel+'</text>';
        });

        html += '</svg>';

        // Legend
        html += '<div style="display:flex;gap:1rem;margin-top:0.5rem;flex-wrap:wrap;justify-content:center;">';
        html += '<div style="display:flex;align-items:center;gap:0.3rem;"><div style="width:12px;height:12px;background:#238636;border-radius:50%;"></div><span style="color:#8b949e;font-size:0.75rem;">Current</span></div>';
        html += '<div style="display:flex;align-items:center;gap:0.3rem;"><div style="width:12px;height:12px;background:#1f6feb;border-radius:50%;"></div><span style="color:#8b949e;font-size:0.75rem;">Visited</span></div>';
        html += '<div style="display:flex;align-items:center;gap:0.3rem;"><div style="width:12px;height:12px;background:#21262d;border:1px solid #30363d;border-radius:50%;"></div><span style="color:#8b949e;font-size:0.75rem;">Unvisited</span></div>';
        html += '</div>';

        html += '<div style="margin-top:1rem;">';
        html += '<span style="color:#8b949e;">Queue: </span><span style="color:#f0883e;">[' + (step.queue || []).join(', ') + ']</span>';
        html += '</div>';

        // Show output if available
        if (step.output !== undefined) {
            html += '<div style="margin-top:0.5rem;"><span style="color:#8b949e;">Output: </span><span style="color:#3fb950;">' + step.output + '</span></div>';
        }

        html += '<div style="color:#8b949e;margin-top:0.5rem;">' + (step.action || '') + '</div>';

        return html;
    }

    function updateCallStack() {
        var callStackEl = document.getElementById('viz-call-stack');
        if (!callStackEl || vizState.steps.length === 0) return;

        var step = vizState.steps[vizState.currentStep];
        var category = currentProblem ? currentProblem.category : 'recursion';
        var vizType = step.vizType || '';
        var html = '';

        // Build stack history from step 0 to current step
        var historySteps = [];
        for (var i = 0; i <= vizState.currentStep; i++) {
            historySteps.push(vizState.steps[i]);
        }

        // Handle array algorithm states based on vizType first
        if (vizType === 'two-pointer' || vizType === 'two-pointer-result') {
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">POINTER STATE</div>';

            // Left pointer
            html += '<div style="background:#21262d;border-radius:4px;padding:0.4rem 0.5rem;margin-bottom:0.25rem;">';
            html += '<span style="color:#3fb950;font-size:0.8rem;">Left:</span> ';
            html += '<span style="color:#c9d1d9;font-family:monospace;">index ' + (step.left !== undefined ? step.left : '-') + '</span>';
            if (step.array && step.left !== undefined && step.array[step.left] !== undefined) {
                html += ' <span style="color:#8b949e;">= ' + step.array[step.left] + '</span>';
            }
            html += '</div>';

            // Right pointer
            html += '<div style="background:#21262d;border-radius:4px;padding:0.4rem 0.5rem;margin-bottom:0.25rem;">';
            html += '<span style="color:#58a6ff;font-size:0.8rem;">Right:</span> ';
            html += '<span style="color:#c9d1d9;font-family:monospace;">index ' + (step.right !== undefined ? step.right : '-') + '</span>';
            if (step.array && step.right !== undefined && step.array[step.right] !== undefined) {
                html += ' <span style="color:#8b949e;">= ' + step.array[step.right] + '</span>';
            }
            html += '</div>';

            if (step.toMove !== undefined) {
                html += '<div style="background:#da363622;border-radius:4px;padding:0.4rem 0.5rem;margin-top:0.5rem;">';
                html += '<span style="color:#da3633;font-size:0.8rem;">Moving: ' + step.toMove + '</span>';
                html += '</div>';
            }

        } else if (vizType === 'three-pointer') {
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">THREE POINTERS</div>';

            // i pointer (fixed)
            html += '<div style="background:#21262d;border-radius:4px;padding:0.4rem 0.5rem;margin-bottom:0.25rem;">';
            html += '<span style="color:#f0883e;font-size:0.8rem;">i (fixed):</span> ';
            html += '<span style="color:#c9d1d9;font-family:monospace;">index ' + (step.i !== undefined ? step.i : '-') + '</span>';
            if (step.array && step.i !== undefined && step.array[step.i] !== undefined) {
                html += ' <span style="color:#8b949e;">= ' + step.array[step.i] + '</span>';
            }
            html += '</div>';

            // Left pointer
            html += '<div style="background:#21262d;border-radius:4px;padding:0.4rem 0.5rem;margin-bottom:0.25rem;">';
            html += '<span style="color:#3fb950;font-size:0.8rem;">Left:</span> ';
            html += '<span style="color:#c9d1d9;font-family:monospace;">index ' + (step.left !== undefined ? step.left : '-') + '</span>';
            if (step.array && step.left !== undefined && step.array[step.left] !== undefined) {
                html += ' <span style="color:#8b949e;">= ' + step.array[step.left] + '</span>';
            }
            html += '</div>';

            // Right pointer
            html += '<div style="background:#21262d;border-radius:4px;padding:0.4rem 0.5rem;margin-bottom:0.25rem;">';
            html += '<span style="color:#58a6ff;font-size:0.8rem;">Right:</span> ';
            html += '<span style="color:#c9d1d9;font-family:monospace;">index ' + (step.right !== undefined ? step.right : '-') + '</span>';
            if (step.array && step.right !== undefined && step.array[step.right] !== undefined) {
                html += ' <span style="color:#8b949e;">= ' + step.array[step.right] + '</span>';
            }
            html += '</div>';

            if (step.sum !== undefined) {
                html += '<div style="background:#1f6feb22;border-radius:4px;padding:0.4rem 0.5rem;margin-top:0.5rem;">';
                html += '<span style="color:#58a6ff;font-size:0.8rem;">Sum: ' + step.sum + '</span>';
                html += '</div>';
            }

            if (step.triplets && step.triplets.length > 0) {
                html += '<div style="background:#23863622;border-radius:4px;padding:0.4rem 0.5rem;margin-top:0.25rem;">';
                html += '<span style="color:#3fb950;font-size:0.75rem;">Found: ' + step.triplets.length + ' triplets</span>';
                html += '</div>';
            }

        } else if (vizType === 'two-arrays') {
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">INDEX STATE</div>';

            // Array index
            html += '<div style="background:#21262d;border-radius:4px;padding:0.4rem 0.5rem;margin-bottom:0.25rem;">';
            html += '<span style="color:#3fb950;font-size:0.8rem;">Array idx:</span> ';
            html += '<span style="color:#c9d1d9;font-family:monospace;">' + (step.arrIdx !== undefined ? step.arrIdx : (step.idx1 !== undefined ? step.idx1 : '-')) + '</span>';
            html += '</div>';

            // Sequence index
            html += '<div style="background:#21262d;border-radius:4px;padding:0.4rem 0.5rem;margin-bottom:0.25rem;">';
            html += '<span style="color:#58a6ff;font-size:0.8rem;">Seq idx:</span> ';
            html += '<span style="color:#c9d1d9;font-family:monospace;">' + (step.seqIdx !== undefined ? step.seqIdx : (step.idx2 !== undefined ? step.idx2 : '-')) + '</span>';
            html += '</div>';

            if (step.match !== undefined) {
                html += '<div style="background:' + (step.match ? '#23863622' : '#f0883e22') + ';border-radius:4px;padding:0.4rem 0.5rem;margin-top:0.5rem;">';
                html += '<span style="color:' + (step.match ? '#3fb950' : '#f0883e') + ';font-size:0.8rem;">' + (step.match ? '✓ Match!' : '✗ No match') + '</span>';
                html += '</div>';
            }

        } else if (vizType === 'array-scan') {
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">SCAN STATE</div>';

            html += '<div style="background:#21262d;border-radius:4px;padding:0.4rem 0.5rem;margin-bottom:0.25rem;">';
            html += '<span style="color:#3fb950;font-size:0.8rem;">Current idx:</span> ';
            html += '<span style="color:#c9d1d9;font-family:monospace;">' + (step.currentIdx !== undefined ? step.currentIdx : '-') + '</span>';
            if (step.array && step.currentIdx !== undefined && step.array[step.currentIdx] !== undefined) {
                html += ' <span style="color:#8b949e;">= ' + step.array[step.currentIdx] + '</span>';
            }
            html += '</div>';

            if (step.currentChange !== undefined) {
                html += '<div style="background:#f0883e22;border-radius:4px;padding:0.4rem 0.5rem;margin-top:0.5rem;">';
                html += '<span style="color:#f0883e;font-size:0.8rem;">Can make: 1 to ' + step.currentChange + '</span>';
                html += '</div>';
            }

            if (step.isIncreasing !== undefined || step.isDecreasing !== undefined) {
                html += '<div style="display:flex;flex-direction:column;gap:0.25rem;margin-top:0.5rem;">';
                if (step.isIncreasing !== undefined) {
                    html += '<div style="background:' + (step.isIncreasing ? '#23863622' : '#da363622') + ';border-radius:4px;padding:0.3rem 0.5rem;">';
                    html += '<span style="color:' + (step.isIncreasing ? '#3fb950' : '#da3633') + ';font-size:0.75rem;">' + (step.isIncreasing ? '✓' : '✗') + ' Increasing</span>';
                    html += '</div>';
                }
                if (step.isDecreasing !== undefined) {
                    html += '<div style="background:' + (step.isDecreasing ? '#23863622' : '#da363622') + ';border-radius:4px;padding:0.3rem 0.5rem;">';
                    html += '<span style="color:' + (step.isDecreasing ? '#3fb950' : '#da3633') + ';font-size:0.75rem;">' + (step.isDecreasing ? '✓' : '✗') + ' Decreasing</span>';
                    html += '</div>';
                }
                html += '</div>';
            }

        } else if (vizType === 'array-products') {
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">PRODUCTS STATE</div>';

            html += '<div style="background:#21262d;border-radius:4px;padding:0.4rem 0.5rem;margin-bottom:0.25rem;">';
            html += '<span style="color:#3fb950;font-size:0.8rem;">Index:</span> ';
            html += '<span style="color:#c9d1d9;font-family:monospace;">' + (step.currentIdx !== undefined ? step.currentIdx : '-') + '</span>';
            html += '</div>';

            if (step.prefix !== undefined) {
                html += '<div style="background:#f0883e22;border-radius:4px;padding:0.4rem 0.5rem;margin-bottom:0.25rem;">';
                html += '<span style="color:#f0883e;font-size:0.8rem;">Prefix: ' + step.prefix + '</span>';
                html += '</div>';
            }

            if (step.suffix !== undefined) {
                html += '<div style="background:#1f6feb22;border-radius:4px;padding:0.4rem 0.5rem;">';
                html += '<span style="color:#58a6ff;font-size:0.8rem;">Suffix: ' + step.suffix + '</span>';
                html += '</div>';
            }

        } else if (vizType === 'array-marking') {
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">MARKING STATE</div>';

            html += '<div style="background:#21262d;border-radius:4px;padding:0.4rem 0.5rem;margin-bottom:0.25rem;">';
            html += '<span style="color:#3fb950;font-size:0.8rem;">Checking idx:</span> ';
            html += '<span style="color:#c9d1d9;font-family:monospace;">' + (step.currentIdx !== undefined ? step.currentIdx : '-') + '</span>';
            html += '</div>';

            if (step.targetIdx !== undefined) {
                html += '<div style="background:#1f6feb22;border-radius:4px;padding:0.4rem 0.5rem;margin-bottom:0.25rem;">';
                html += '<span style="color:#58a6ff;font-size:0.8rem;">Target idx: ' + step.targetIdx + '</span>';
                html += '</div>';
            }

            if (step.duplicateFound) {
                html += '<div style="background:#23863622;border-radius:4px;padding:0.4rem 0.5rem;margin-top:0.5rem;">';
                html += '<span style="color:#3fb950;font-size:0.8rem;">✓ Found: ' + step.duplicateFound + '</span>';
                html += '</div>';
            }

        } else if (vizType === 'intervals') {
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">MERGE STATE</div>';

            html += '<div style="background:#21262d;border-radius:4px;padding:0.4rem 0.5rem;margin-bottom:0.25rem;">';
            html += '<span style="color:#3fb950;font-size:0.8rem;">Current:</span> ';
            if (step.intervals && step.currentIdx !== undefined && step.intervals[step.currentIdx]) {
                html += '<span style="color:#c9d1d9;font-family:monospace;">[' + step.intervals[step.currentIdx].join(',') + ']</span>';
            } else {
                html += '<span style="color:#c9d1d9;font-family:monospace;">-</span>';
            }
            html += '</div>';

            if (step.merged && step.merged.length > 0) {
                html += '<div style="background:#23863622;border-radius:4px;padding:0.4rem 0.5rem;">';
                html += '<span style="color:#3fb950;font-size:0.75rem;">Merged: ' + step.merged.length + ' intervals</span>';
                html += '</div>';
            }

        } else if (vizType === 'spiral-matrix' || vizType === 'matrix') {
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">MATRIX STATE</div>';

            if (step.currentRow !== undefined && step.currentCol !== undefined) {
                html += '<div style="background:#21262d;border-radius:4px;padding:0.4rem 0.5rem;margin-bottom:0.25rem;">';
                html += '<span style="color:#3fb950;font-size:0.8rem;">Cell:</span> ';
                html += '<span style="color:#c9d1d9;font-family:monospace;">[' + step.currentRow + '][' + step.currentCol + ']</span>';
                html += '</div>';
            }

            if (step.bounds) {
                html += '<div style="background:#1f6feb22;border-radius:4px;padding:0.4rem 0.5rem;font-size:0.7rem;">';
                html += '<div style="color:#58a6ff;">Bounds:</div>';
                html += '<div style="color:#8b949e;">rows: ' + step.bounds.startRow + '-' + step.bounds.endRow + '</div>';
                html += '<div style="color:#8b949e;">cols: ' + step.bounds.startCol + '-' + step.bounds.endCol + '</div>';
                html += '</div>';
            }

            if (step.result && Array.isArray(step.result)) {
                html += '<div style="background:#23863622;border-radius:4px;padding:0.4rem 0.5rem;margin-top:0.5rem;">';
                html += '<span style="color:#3fb950;font-size:0.75rem;">Collected: ' + step.result.length + ' elements</span>';
                html += '</div>';
            }

        } else if (vizType === 'hash-table') {
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">SCORES STATE</div>';

            if (step.scores) {
                var scoreKeys = Object.keys(step.scores);
                scoreKeys.slice(0, 4).forEach(function(team) {
                    var isLeader = team === step.currentBest;
                    var bg = isLeader ? '#23863622' : '#21262d';
                    html += '<div style="background:' + bg + ';border-radius:4px;padding:0.3rem 0.5rem;margin-bottom:0.2rem;">';
                    html += '<span style="color:' + (isLeader ? '#3fb950' : '#c9d1d9') + ';font-size:0.8rem;">' + team + ': ' + step.scores[team] + '</span>';
                    if (isLeader) html += ' <span style="color:#3fb950;font-size:0.7rem;">★</span>';
                    html += '</div>';
                });
                if (scoreKeys.length > 4) {
                    html += '<div style="color:#8b949e;font-size:0.7rem;margin-top:0.25rem;">+' + (scoreKeys.length - 4) + ' more...</div>';
                }
            }

        } else if (vizType === 'graph') {
            // Graph state panel
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">GRAPH STATE</div>';

            if (step.current) {
                html += '<div style="background:#238636;border:1px solid #3fb950;border-radius:4px;padding:0.5rem;margin-bottom:0.5rem;">';
                html += '<div style="color:white;font-size:0.85rem;">Current: <span style="font-family:monospace;">' + step.current + '</span></div>';
                html += '</div>';
            }

            if (step.visited && step.visited.length > 0) {
                html += '<div style="background:#1f6feb22;border-radius:4px;padding:0.5rem;margin-bottom:0.5rem;">';
                html += '<div style="color:#58a6ff;font-size:0.7rem;">Visited: ' + step.visited.length + ' nodes</div>';
                html += '</div>';
            }

            if (step.queue && step.queue.length > 0) {
                html += '<div style="background:#21262d;border-radius:4px;padding:0.5rem;">';
                html += '<div style="color:#f0883e;font-size:0.7rem;">Queue: [' + step.queue.join(', ') + ']</div>';
                html += '</div>';
            }

            if (step.stack && step.stack.length > 0) {
                html += '<div style="background:#21262d;border-radius:4px;padding:0.5rem;">';
                html += '<div style="color:#a371f7;font-size:0.7rem;">Stack: [' + step.stack.join(', ') + ']</div>';
                html += '</div>';
            }

        } else if (vizType === 'linked-list') {
            // Linked list state panel
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">LINKED LIST STATE</div>';

            if (step.current !== undefined && step.current !== -1) {
                html += '<div style="background:#238636;border:1px solid #3fb950;border-radius:4px;padding:0.5rem;margin-bottom:0.5rem;">';
                html += '<div style="color:white;font-size:0.85rem;">Current node: ' + (step.nodes && step.nodes[step.current] ? step.nodes[step.current].value : step.current) + '</div>';
                html += '</div>';
            }

            if (step.pointers) {
                Object.keys(step.pointers).forEach(function(name) {
                    var color = name === 'current' ? '#3fb950' : (name === 'head' ? '#58a6ff' : '#f0883e');
                    html += '<div style="background:#21262d;border-radius:4px;padding:0.3rem 0.5rem;margin-bottom:0.25rem;">';
                    html += '<span style="color:' + color + ';font-size:0.8rem;">' + name + ':</span> ';
                    html += '<span style="color:#c9d1d9;font-family:monospace;">node[' + step.pointers[name] + ']</span>';
                    html += '</div>';
                });
            }

        } else if (vizType === 'lru-cache') {
            // LRU Cache state panel
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">LRU CACHE STATE</div>';

            // Stats row
            html += '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.5rem;">';
            html += '<div style="background:#21262d;border-radius:4px;padding:0.3rem 0.5rem;">';
            html += '<span style="color:#8b949e;font-size:0.7rem;">Capacity:</span> <span style="color:#58a6ff;">' + (step.capacity || 0) + '</span>';
            html += '</div>';
            html += '<div style="background:#21262d;border-radius:4px;padding:0.3rem 0.5rem;">';
            html += '<span style="color:#8b949e;font-size:0.7rem;">Size:</span> <span style="color:#58a6ff;">' + (step.items ? step.items.length : 0) + '</span>';
            html += '</div>';
            html += '<div style="background:#23863622;border-radius:4px;padding:0.3rem 0.5rem;">';
            html += '<span style="color:#8b949e;font-size:0.7rem;">Hits:</span> <span style="color:#3fb950;">' + (step.hits || 0) + '</span>';
            html += '</div>';
            html += '<div style="background:#f8514922;border-radius:4px;padding:0.3rem 0.5rem;">';
            html += '<span style="color:#8b949e;font-size:0.7rem;">Misses:</span> <span style="color:#f85149;">' + (step.misses || 0) + '</span>';
            html += '</div>';
            html += '</div>';

            // Current operation
            if (step.operation) {
                html += '<div style="background:#1f6feb22;border:1px solid #58a6ff;border-radius:4px;padding:0.5rem;margin-bottom:0.5rem;">';
                html += '<div style="color:#58a6ff;font-size:0.85rem;font-family:monospace;">' + step.operation + '</div>';
                html += '</div>';
            }

        } else if (vizType === 'tree' || vizType === 'bst') {
            // Tree state panel with call stack history
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">TREE STATE</div>';

            if (step.current) {
                var currentNode = step.nodes ? step.nodes.find(function(n) { return n.id === step.current; }) : null;
                html += '<div style="background:#238636;border:1px solid #3fb950;border-radius:4px;padding:0.5rem;margin-bottom:0.5rem;">';
                html += '<div style="color:white;font-size:0.85rem;">Current: ' + (currentNode ? currentNode.label || currentNode.value : step.current) + '</div>';
                html += '</div>';
            }

            if (step.visited && step.visited.length > 0) {
                html += '<div style="background:#1f6feb22;border-radius:4px;padding:0.5rem;margin-bottom:0.5rem;">';
                html += '<div style="color:#58a6ff;font-size:0.7rem;">Visited: ' + step.visited.length + ' nodes</div>';
                // Show visited path
                var visitedPath = step.visited.slice(-5).map(function(v) {
                    return typeof v === 'object' ? (v.label || v.value || v.id) : v;
                }).join(' → ');
                if (step.visited.length > 5) visitedPath = '... → ' + visitedPath;
                html += '<div style="color:#8b949e;font-size:0.65rem;margin-top:0.25rem;">' + visitedPath + '</div>';
                html += '</div>';
            }

            // Show call stack if available (for recursive tree algorithms)
            if (step.callStack && step.callStack.length > 0) {
                html += '<div style="font-size:0.7rem;color:#a371f7;margin-top:0.5rem;margin-bottom:0.25rem;">📚 CALL STACK</div>';
                var reversedCallStack = step.callStack.slice().reverse();
                reversedCallStack.slice(0, 5).forEach(function(call, idx) {
                    var isTop = idx === 0;
                    var bg = isTop ? '#238636' : '#21262d';
                    var border = isTop ? '#3fb950' : '#30363d';
                    var opacity = Math.max(0.5, 1 - idx * 0.15);
                    html += '<div style="background:' + bg + ';border:1px solid ' + border + ';border-radius:4px;padding:0.3rem 0.5rem;margin-bottom:0.15rem;opacity:' + opacity + ';">';
                    html += '<div style="color:#c9d1d9;font-family:monospace;font-size:0.75rem;">' + call + '</div>';
                    html += '</div>';
                });
                if (step.callStack.length > 5) {
                    html += '<div style="color:#8b949e;font-size:0.65rem;text-align:center;">+' + (step.callStack.length - 5) + ' more...</div>';
                }
            }

            // Show call stack history (backtracking visualization)
            if (step.callStackHistory && step.callStackHistory.length > 0) {
                html += '<div style="font-size:0.7rem;color:#f0883e;margin-top:0.5rem;margin-bottom:0.25rem;">📜 HISTORY</div>';
                html += '<div style="max-height:100px;overflow-y:auto;background:#21262d;border-radius:4px;padding:0.25rem;">';
                step.callStackHistory.slice(-8).forEach(function(entry, idx) {
                    var icon = entry.type === 'call' ? '→' : (entry.type === 'return' ? '←' : '•');
                    var color = entry.type === 'call' ? '#3fb950' : (entry.type === 'return' ? '#f85149' : '#8b949e');
                    html += '<div style="color:' + color + ';font-size:0.65rem;font-family:monospace;padding:0.1rem 0;">';
                    html += icon + ' ' + (entry.call || entry.action || entry);
                    html += '</div>';
                });
                html += '</div>';
            }

            if (step.runningSum !== undefined) {
                html += '<div style="background:#f0883e22;border-radius:4px;padding:0.5rem;margin-top:0.5rem;">';
                html += '<div style="color:#f0883e;font-size:0.8rem;">Running sum: ' + step.runningSum + '</div>';
                html += '</div>';
            }

            if (step.diameter !== undefined) {
                html += '<div style="background:#23863622;border-radius:4px;padding:0.5rem;margin-top:0.5rem;">';
                html += '<div style="color:#3fb950;font-size:0.8rem;">Max diameter: ' + step.diameter + '</div>';
                html += '</div>';
            }

            if (step.result !== undefined && step.result !== null) {
                html += '<div style="background:#23863622;border-radius:4px;padding:0.5rem;margin-top:0.5rem;">';
                html += '<div style="color:#3fb950;font-size:0.85rem;">Result: ' + (typeof step.result === 'object' ? JSON.stringify(step.result) : step.result) + '</div>';
                html += '</div>';
            }

        } else if (vizType === 'recursion') {
            // Recursion state panel (call stack)
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">CALL STACK</div>';

            if (step.stack && step.stack.length > 0) {
                var reversedStack = step.stack.slice().reverse();
                reversedStack.forEach(function(call, idx) {
                    var isTop = idx === 0;
                    var bg = isTop ? '#238636' : '#21262d';
                    var border = isTop ? '#3fb950' : '#30363d';
                    html += '<div style="background:' + bg + ';border:1px solid ' + border + ';border-radius:4px;padding:0.4rem;margin-bottom:0.2rem;">';
                    html += '<div style="color:#58a6ff;font-family:monospace;font-size:0.8rem;">' + call + '</div>';
                    html += '</div>';
                });
            }

            if (step.result !== null && step.result !== undefined) {
                html += '<div style="margin-top:0.5rem;background:#23863622;border-radius:4px;padding:0.5rem;">';
                html += '<div style="color:#3fb950;font-size:0.85rem;">Return: ' + step.result + '</div>';
                if (step.memoHit) html += '<div style="color:#f0883e;font-size:0.7rem;">📦 memoized</div>';
                html += '</div>';
            }

            if (step.memo && Object.keys(step.memo).length > 0) {
                html += '<div style="margin-top:0.5rem;background:#21262d;border-radius:4px;padding:0.5rem;">';
                html += '<div style="color:#f0883e;font-size:0.7rem;">Memo: {' + Object.keys(step.memo).slice(0, 5).map(function(k) { return k + ':' + step.memo[k]; }).join(', ') + '}</div>';
                html += '</div>';
            }

        } else if (vizType === 'dp-table') {
            // DP table state panel
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">DP TABLE STATE</div>';

            if (step.computing) {
                html += '<div style="background:#238636;border:1px solid #3fb950;border-radius:4px;padding:0.5rem;margin-bottom:0.5rem;">';
                html += '<div style="color:white;font-size:0.85rem;">Computing: dp[' + step.computing[0] + '][' + step.computing[1] + ']</div>';
                html += '</div>';
            }

            if (step.result !== undefined) {
                html += '<div style="background:#23863622;border-radius:4px;padding:0.5rem;">';
                html += '<div style="color:#3fb950;font-size:0.85rem;">Result: ' + step.result + '</div>';
                html += '</div>';
            }

        } else if (vizType === 'famous-algorithm') {
            // Famous algorithm state panel
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">ALGORITHM STATE</div>';

            html += '<div style="background:linear-gradient(135deg,#1f6feb22,#a371f722);border-radius:4px;padding:0.5rem;margin-bottom:0.5rem;">';
            html += '<div style="color:#a371f7;font-size:0.85rem;">' + (step.algorithm || 'Algorithm') + '</div>';
            html += '</div>';

            if (step.phase === 'processing') {
                html += '<div style="background:#21262d;border-radius:4px;padding:0.5rem;">';
                html += '<div style="color:#f0883e;font-size:0.8rem;">⚙️ Processing...</div>';
                html += '</div>';
            }

            if (step.result !== undefined) {
                html += '<div style="background:#23863622;border-radius:4px;padding:0.5rem;">';
                html += '<div style="color:#3fb950;font-size:0.85rem;">Result: ' + JSON.stringify(step.result) + '</div>';
                html += '</div>';
            }

        } else if (vizType === 'generic') {
            // Generic array viz fallback
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">STEP ' + (vizState.currentStep + 1) + ' / ' + vizState.totalSteps + '</div>';
            html += '<div style="background:#21262d;border:1px solid #30363d;border-radius:4px;padding:0.5rem;">';
            html += '<span style="color:#c9d1d9;font-size:0.85rem;">' + (step.status || step.action || 'Processing...') + '</span>';
            html += '</div>';

        } else if (category === 'recursion' && step.stack) {
            // Show stack frames with newest on top
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">STACK (top → bottom)</div>';

            // Reverse to show newest on top
            var reversedStack = step.stack.slice().reverse();
            reversedStack.forEach(function(call, idx) {
                var actualIdx = step.stack.length - 1 - idx;
                var isTop = idx === 0;
                var bg = isTop ? '#238636' : '#21262d';
                var border = isTop ? '#3fb950' : '#30363d';
                var opacity = isTop ? '1' : (0.7 - idx * 0.1);

                html += '<div style="background:' + bg + ';border:1px solid ' + border + ';border-radius:4px;padding:0.5rem;margin-bottom:0.25rem;opacity:' + Math.max(0.4, opacity) + ';">';
                html += '<div style="color:#58a6ff;font-family:monospace;font-size:0.85rem;">' + call + '</div>';
                html += '<div style="color:#8b949e;font-size:0.7rem;">depth: ' + actualIdx + '</div>';
                html += '</div>';

                if (idx < reversedStack.length - 1) {
                    html += '<div style="text-align:center;color:#30363d;font-size:0.7rem;">↑</div>';
                }
            });

            // Show return value if available
            if (step.result !== null && step.result !== undefined) {
                html += '<div style="margin-top:0.5rem;background:#1f6feb33;border:1px solid #58a6ff;border-radius:4px;padding:0.5rem;">';
                html += '<div style="color:#3fb950;font-size:0.85rem;">⬆ Return: <span style="font-family:monospace;">' + step.result + '</span></div>';
                if (step.memo) html += '<div style="color:#f0883e;font-size:0.7rem;">📦 memoized</div>';
                html += '</div>';
            }

        } else if (step.table !== undefined) {
            // DP Table - show current cell being computed and recent history
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">DP STATE</div>';

            // Current state
            html += '<div style="background:#238636;border:1px solid #3fb950;border-radius:4px;padding:0.5rem;margin-bottom:0.5rem;">';
            html += '<div style="color:white;font-size:0.8rem;font-weight:600;">Current: dp[' + step.row + '][' + step.col + ']</div>';
            if (step.char1 && step.char2) {
                html += '<div style="color:#c9d1d9;font-size:0.75rem;">Comparing: "' + step.char1 + '" vs "' + step.char2 + '"</div>';
            }
            html += '<div style="color:' + (step.match ? '#3fb950' : '#f0883e') + ';font-size:0.75rem;">' + (step.match ? '✓ Match!' : '✗ No match') + '</div>';
            html += '</div>';

            // Recent steps history (last 5)
            html += '<div style="font-size:0.7rem;color:#8b949e;margin:0.5rem 0 0.25rem 0;">Recent Steps:</div>';
            var recentSteps = historySteps.slice(-5);
            recentSteps.forEach(function(s, idx) {
                var isLast = idx === recentSteps.length - 1;
                var opacity = 0.4 + (idx / recentSteps.length) * 0.6;
                html += '<div style="background:#21262d;border-radius:3px;padding:0.3rem 0.5rem;margin-bottom:0.2rem;font-size:0.7rem;opacity:' + opacity + ';">';
                html += '<span style="color:#8b949e;">dp[' + s.row + '][' + s.col + ']=' + (s.table ? s.table[s.row][s.col] : '?') + '</span>';
                html += '</div>';
            });

        } else if (step.queue !== undefined && step.result !== undefined) {
            // Graph algorithms - show queue and visited state
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">ALGORITHM STATE</div>';

            // Current processing
            if (step.current) {
                html += '<div style="background:#238636;border:1px solid #3fb950;border-radius:4px;padding:0.5rem;margin-bottom:0.5rem;">';
                html += '<div style="color:white;font-size:0.85rem;">Processing: <span style="font-family:monospace;">' + step.current + '</span></div>';
                html += '</div>';
            }

            // Queue visualization (horizontal)
            html += '<div style="background:#21262d;border-radius:4px;padding:0.5rem;margin-bottom:0.5rem;">';
            html += '<div style="color:#f0883e;font-size:0.7rem;margin-bottom:0.25rem;">Queue (FIFO →):</div>';
            html += '<div style="display:flex;gap:0.25rem;flex-wrap:wrap;">';
            (step.queue || []).forEach(function(item, idx) {
                html += '<span style="background:#f0883e33;color:#f0883e;padding:0.15rem 0.4rem;border-radius:3px;font-family:monospace;font-size:0.8rem;">' + item + '</span>';
            });
            if (!step.queue || step.queue.length === 0) {
                html += '<span style="color:#8b949e;font-size:0.75rem;">empty</span>';
            }
            html += '</div></div>';

            // Result so far
            html += '<div style="background:#1f6feb22;border-radius:4px;padding:0.5rem;">';
            html += '<div style="color:#58a6ff;font-size:0.7rem;margin-bottom:0.25rem;">Result:</div>';
            html += '<div style="color:#c9d1d9;font-family:monospace;font-size:0.8rem;">[' + (step.result || []).join(' → ') + ']</div>';
            html += '</div>';

        } else if (step.hashTable !== undefined) {
            // Hash table operations (array-hash vizType)
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">HASH TABLE STATE</div>';

            // Current operation
            html += '<div style="background:#238636;border:1px solid #3fb950;border-radius:4px;padding:0.5rem;margin-bottom:0.5rem;">';
            html += '<div style="color:white;font-size:0.85rem;">Checking: <span style="font-family:monospace;">' + step.checking + '</span></div>';
            html += '<div style="color:#f0883e;font-size:0.75rem;">Need: ' + step.need + ' (target - current)</div>';
            html += '<div style="color:' + (step.found ? '#3fb950' : '#da3633') + ';font-size:0.75rem;">' + (step.found ? '✓ Found in hash!' : '✗ Not in hash') + '</div>';
            html += '</div>';

            // Hash table contents
            html += '<div style="background:#21262d;border-radius:4px;padding:0.5rem;">';
            html += '<div style="color:#3fb950;font-size:0.7rem;margin-bottom:0.25rem;">Hash Table:</div>';
            html += '<div style="display:flex;gap:0.25rem;flex-wrap:wrap;">';
            (step.hashTable || []).forEach(function(item) {
                html += '<span style="background:#3fb95033;color:#3fb950;padding:0.15rem 0.4rem;border-radius:3px;font-family:monospace;font-size:0.8rem;">' + item + '</span>';
            });
            if (!step.hashTable || step.hashTable.length === 0) {
                html += '<span style="color:#8b949e;font-size:0.75rem;">{ }</span>';
            }
            html += '</div></div>';

        } else if (step.pointers !== undefined) {
            // Linked list operations
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">POINTER STATE</div>';

            Object.keys(step.pointers).forEach(function(ptrName) {
                var ptrVal = step.pointers[ptrName];
                var color = ptrName === 'current' ? '#3fb950' : (ptrName === 'head' ? '#58a6ff' : '#f0883e');
                html += '<div style="background:#21262d;border-radius:4px;padding:0.4rem 0.5rem;margin-bottom:0.25rem;">';
                html += '<span style="color:' + color + ';font-size:0.8rem;">' + ptrName + ':</span> ';
                html += '<span style="color:#c9d1d9;font-family:monospace;">→ node[' + ptrVal + ']</span>';
                if (step.nodes && step.nodes[ptrVal] !== undefined) {
                    html += ' <span style="color:#8b949e;">= ' + step.nodes[ptrVal] + '</span>';
                }
                html += '</div>';
            });

        } else {
            // Generic display
            html += '<div style="font-size:0.75rem;color:#8b949e;margin-bottom:0.5rem;">STEP ' + (vizState.currentStep + 1) + ' / ' + vizState.totalSteps + '</div>';
            html += '<div style="background:#21262d;border:1px solid #30363d;border-radius:4px;padding:0.5rem;">';
            html += '<span style="color:#c9d1d9;font-size:0.85rem;">' + (step.action || 'Processing...') + '</span>';
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
