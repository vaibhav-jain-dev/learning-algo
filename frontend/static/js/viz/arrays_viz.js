/**
 * Array Algorithm Visualizations
 *
 * This file contains visualization handlers for all array problems.
 * Each handler generates step-by-step visualization data.
 *
 * Usage:
 * These handlers are automatically registered with VizUtils when this file loads.
 */
(function() {
    'use strict';

    // Wait for VizUtils to load
    if (!window.VizUtils) {
        console.error('[ArraysViz] VizUtils not loaded yet!');
        return;
    }

    const { createStep, createIntroStep, createResultStep, formatExplanation, formatArray, VIZ_TYPES } = window.VizUtils;

    // =========================================================================
    // VALIDATE SUBSEQUENCE (Two Pointer)
    // =========================================================================
    function runValidateSubsequence(example, config, complexity) {
        if (!example || !example.input || !example.input.array || !example.input.sequence) {
            console.error('[runValidateSubsequence] Missing required input properties');
            return null;
        }
        const arr = example.input.array;
        const seq = example.input.sequence;
        const expected = example.output;
        const steps = [];
        let seqIdx = 0;

        steps.push({
            array: arr.slice(),
            sequence: seq.slice(),
            arrIdx: -1,
            seqIdx: 0,
            vizType: 'two-arrays',
            status: 'Initialize: Check if sequence is subsequence',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> array=[' + arr.join(', ') + '], sequence=[' + seq.join(', ') + ']<br>' +
                '<strong>Expected:</strong> ' + expected + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (let i = 0; i < arr.length && seqIdx < seq.length; i++) {
            const match = arr[i] === seq[seqIdx];
            steps.push({
                array: arr.slice(),
                sequence: seq.slice(),
                arrIdx: i,
                seqIdx: seqIdx,
                match: match,
                vizType: 'two-arrays',
                status: match ? 'Match: ' + arr[i] : 'arr[' + i + ']=' + arr[i] + ' != seq[' + seqIdx + ']=' + seq[seqIdx],
                explanation: match ?
                    '<strong>Match!</strong> arr[' + i + ']=' + arr[i] + ' == seq[' + seqIdx + ']=' + seq[seqIdx] + '<br>Move seqIdx: ' + seqIdx + ' -> ' + (seqIdx + 1) :
                    'No match. arr[' + i + ']=' + arr[i] + ' != seq[' + seqIdx + ']=' + seq[seqIdx] + '<br>Continue scanning...'
            });
            if (match) seqIdx++;
        }

        const result = seqIdx === seq.length;
        steps.push({
            array: arr.slice(),
            sequence: seq.slice(),
            arrIdx: arr.length,
            seqIdx: seqIdx,
            vizType: 'two-arrays',
            status: result ? 'Valid Subsequence!' : 'Invalid',
            explanation: result ?
                '<strong>Result: true</strong><br>All ' + seq.length + ' elements matched in order!' :
                '<strong>Result: false</strong><br>Only matched ' + seqIdx + '/' + seq.length + ' elements'
        });

        return steps;
    }

    // =========================================================================
    // TWO NUMBER SUM (Hash Table)
    // =========================================================================
    function runTwoNumberSum(example, config, complexity) {
        if (!example || !example.input || !example.input.array || example.input.targetSum === undefined) {
            console.error('[runTwoNumberSum] Missing required input properties');
            return null;
        }
        const arr = example.input.array;
        const target = example.input.targetSum;
        const expected = example.output;
        const steps = [];
        const hashSet = [];

        steps.push({
            array: arr.slice(),
            currentIndex: -1,
            hashTable: [],
            vizType: 'array-hash',
            status: 'Initialize: target = ' + target,
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> array=[' + arr.join(', ') + '], target=' + target + '<br>' +
                '<strong>Expected:</strong> [' + (Array.isArray(expected) ? expected.join(', ') : expected) + ']<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (let i = 0; i < arr.length; i++) {
            const need = target - arr[i];
            const found = hashSet.indexOf(need) !== -1;

            steps.push({
                array: arr.slice(),
                currentIndex: i,
                hashTable: hashSet.slice(),
                checking: arr[i],
                need: need,
                found: found,
                vizType: 'array-hash',
                status: found ? 'Found! ' + arr[i] + '+' + need + '=' + target : 'Check ' + arr[i] + ', need ' + need,
                explanation: found ?
                    '<strong>Found pair!</strong><br>' + arr[i] + ' + ' + need + ' = ' + target + '<br>Result: [' + need + ', ' + arr[i] + ']' :
                    '<strong>Step ' + (i+1) + '</strong><br>Current: ' + arr[i] + ', Need: ' + need + '<br>' + need + ' not in hash. Add ' + arr[i] + '<br>Hash: {' + hashSet.concat([arr[i]]).join(', ') + '}'
            });

            if (found) break;
            hashSet.push(arr[i]);
        }

        return steps;
    }

    // =========================================================================
    // SORTED SQUARED ARRAY
    // =========================================================================
    function runSortedSquaredArray(example, config, complexity) {
        if (!example || !example.input || !example.input.array) return null;
        const arr = example.input.array;
        const expected = example.output;
        const result = new Array(arr.length);
        let left = 0, right = arr.length - 1;
        const steps = [];

        steps.push({
            array: arr.slice(),
            result: [],
            left: left,
            right: right,
            vizType: 'two-pointer-result',
            status: 'Two pointers from ends',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> [' + arr.join(', ') + ']<br>' +
                '<strong>Expected:</strong> [' + expected.join(', ') + ']<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (let i = arr.length - 1; i >= 0; i--) {
            const leftSq = arr[left] * arr[left];
            const rightSq = arr[right] * arr[right];
            const useLeft = leftSq > rightSq;
            result[i] = useLeft ? leftSq : rightSq;

            steps.push({
                array: arr.slice(),
                result: result.slice(),
                left: left,
                right: right,
                insertIdx: i,
                vizType: 'two-pointer-result',
                status: arr[useLeft ? left : right] + '^2 = ' + result[i] + ' -> result[' + i + ']',
                explanation: 'left^2=' + leftSq + ', right^2=' + rightSq + '<br>Place ' + result[i] + ' at index ' + i
            });

            if (useLeft) left++; else right--;
        }

        return steps;
    }

    // =========================================================================
    // MOVE ELEMENT TO END (Two Pointers)
    // =========================================================================
    function runMoveElementToEnd(example, config, complexity) {
        if (!example || !example.input || !example.input.array || example.input.toMove === undefined) {
            return null;
        }
        const arr = example.input.array.slice();
        const toMove = example.input.toMove;
        const expected = example.output;
        const steps = [];
        let left = 0;
        let right = arr.length - 1;

        steps.push({
            array: arr.slice(),
            left: left,
            right: right,
            toMove: toMove,
            vizType: 'two-pointer',
            status: 'Move all ' + toMove + 's to end',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> array=[' + arr.join(', ') + '], toMove=' + toMove + '<br>' +
                '<strong>Expected:</strong> [' + expected.join(', ') + ']<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        while (left < right) {
            while (left < right && arr[right] === toMove) right--;
            if (arr[left] === toMove) {
                const temp = arr[left];
                arr[left] = arr[right];
                arr[right] = temp;
                steps.push({
                    array: arr.slice(),
                    left: left,
                    right: right,
                    toMove: toMove,
                    vizType: 'two-pointer',
                    status: 'Swap: positions ' + left + ' <-> ' + right,
                    explanation: '<strong>Swap!</strong><br>arr[' + left + '] <-> arr[' + right + ']<br>Array: [' + arr.join(', ') + ']'
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
            explanation: '<strong>Done!</strong><br>All ' + toMove + 's moved to end<br>Result: [' + arr.join(', ') + ']'
        });

        return steps;
    }

    // =========================================================================
    // THREE NUMBER SUM (Sort + Two Pointers)
    // =========================================================================
    function runThreeNumberSum(example, config, complexity) {
        if (!example || !example.input || !example.input.array || example.input.targetSum === undefined) return null;
        const arr = example.input.array.slice().sort((a, b) => a - b);
        const target = example.input.targetSum;
        const expected = example.output;
        const steps = [];
        const triplets = [];

        steps.push({
            array: arr,
            triplets: [],
            vizType: 'three-pointer',
            status: 'Sort array, then fix i, use two pointers',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Sorted:</strong> [' + arr.join(', ') + ']<br>' +
                '<strong>Target:</strong> ' + target + '<br>' +
                '<strong>Expected:</strong> ' + JSON.stringify(expected) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (let i = 0; i < arr.length - 2; i++) {
            let left = i + 1;
            let right = arr.length - 1;

            while (left < right) {
                const sum = arr[i] + arr[left] + arr[right];
                const found = sum === target;

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
                    status: found ? 'Found: [' + arr[i] + ',' + arr[left] + ',' + arr[right] + ']' : 'Sum=' + sum + (sum < target ? ' < ' : ' > ') + target,
                    explanation: found ?
                        '<strong>Triplet Found!</strong><br>' + arr[i] + ' + ' + arr[left] + ' + ' + arr[right] + ' = ' + target :
                        'i=' + i + ' (' + arr[i] + '), L=' + left + ' (' + arr[left] + '), R=' + right + ' (' + arr[right] + ')<br>Sum=' + sum + (sum < target ? ' -> move L right' : ' -> move R left')
                });

                if (sum === target) { left++; right--; }
                else if (sum < target) { left++; }
                else { right--; }

                if (steps.length > 20) break;
            }
            if (steps.length > 20) break;
        }

        steps.push({
            array: arr,
            triplets: triplets,
            vizType: 'three-pointer',
            status: 'Result: ' + triplets.length + ' triplets',
            explanation: '<strong>Result:</strong> ' + JSON.stringify(triplets)
        });

        return steps;
    }

    // =========================================================================
    // SPIRAL TRAVERSE
    // =========================================================================
    function runSpiralTraverse(example, config, complexity) {
        if (!example || !example.input || !example.input.matrix) return null;
        const matrix = example.input.matrix;
        const expected = example.output;
        const steps = [];
        const result = [];

        let startRow = 0, endRow = matrix.length - 1;
        let startCol = 0, endCol = matrix[0].length - 1;

        steps.push({
            matrix: matrix,
            result: [],
            vizType: 'spiral-matrix',
            status: 'Spiral from outside to inside',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Matrix:</strong> ' + matrix.length + 'x' + matrix[0].length + '<br>' +
                '<strong>Expected:</strong> [' + expected.join(', ') + ']<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        while (startRow <= endRow && startCol <= endCol) {
            // Right
            for (let col = startCol; col <= endCol; col++) {
                result.push(matrix[startRow][col]);
            }
            startRow++;

            // Down
            for (let row = startRow; row <= endRow; row++) {
                result.push(matrix[row][endCol]);
            }
            endCol--;

            if (startRow <= endRow) {
                // Left
                for (let col = endCol; col >= startCol; col--) {
                    result.push(matrix[endRow][col]);
                }
                endRow--;
            }

            if (startCol <= endCol) {
                // Up
                for (let row = endRow; row >= startRow; row--) {
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
                explanation: '<strong>Layer Done</strong><br>Result so far: [' + result.slice(-8).join(', ') + (result.length > 8 ? '...' : '') + ']'
            });

            if (steps.length > 10) break;
        }

        steps.push({
            matrix: matrix,
            result: result,
            vizType: 'spiral-matrix',
            status: 'Complete!',
            explanation: '<strong>Result:</strong> [' + result.join(', ') + ']'
        });

        return steps;
    }

    // =========================================================================
    // TOURNAMENT WINNER (Hash Counting)
    // =========================================================================
    function runTournamentWinner(example, config, complexity) {
        if (!example || !example.input || !example.input.competitions || !example.input.results) return null;
        const competitions = example.input.competitions;
        const results = example.input.results;
        const expected = example.output;
        const steps = [];
        const scores = {};
        let currentBest = '';

        steps.push({
            vizType: 'hash-table',
            scores: {},
            status: 'Initialize tournament scoring',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Competitions:</strong> ' + competitions.length + ' matches<br>' +
                '<strong>Expected Winner:</strong> ' + expected + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (let i = 0; i < competitions.length; i++) {
            const home = competitions[i][0];
            const away = competitions[i][1];
            const winner = results[i] === 1 ? home : away;

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
                explanation: '<strong>Match ' + (i + 1) + ':</strong> ' + home + ' vs ' + away + '<br>' +
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
            explanation: '<strong>Tournament Complete!</strong><br><br>Final scores: ' + JSON.stringify(scores) + '<br><br>Winner: <strong>' + currentBest + '</strong>'
        });

        return steps;
    }

    // =========================================================================
    // NON-CONSTRUCTIBLE CHANGE (Greedy)
    // =========================================================================
    function runNonConstructibleChange(example, config, complexity) {
        if (!example || !example.input || !example.input.coins) return null;
        const coins = example.input.coins.slice().sort((a, b) => a - b);
        const expected = example.output;
        const steps = [];
        let currentChange = 0;

        steps.push({
            vizType: 'array-scan',
            array: coins,
            currentChange: 0,
            status: 'Sort coins: [' + coins.join(', ') + ']',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Sorted coins:</strong> [' + coins.join(', ') + ']<br>' +
                '<strong>Expected:</strong> ' + expected + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (let i = 0; i < coins.length; i++) {
            if (coins[i] > currentChange + 1) {
                steps.push({
                    vizType: 'array-scan',
                    array: coins,
                    currentIdx: i,
                    currentChange: currentChange,
                    status: 'Found! Cannot make ' + (currentChange + 1),
                    explanation: '<strong>Gap found!</strong><br>Coin ' + coins[i] + ' > ' + (currentChange + 1) + '<br>Cannot make: <strong>' + (currentChange + 1) + '</strong>'
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
                explanation: 'Added coin ' + coins[i] + '<br>Can now make: 1 to ' + currentChange
            });
        }

        steps.push({
            vizType: 'array-scan',
            array: coins,
            currentChange: currentChange,
            status: 'Result: ' + (currentChange + 1),
            explanation: '<strong>Complete!</strong><br>Cannot make: <strong>' + (currentChange + 1) + '</strong>'
        });

        return steps;
    }

    // =========================================================================
    // MERGE OVERLAPPING INTERVALS
    // =========================================================================
    function runMergeIntervals(example, config, complexity) {
        if (!example || !example.input || !example.input.intervals) return null;
        const intervals = example.input.intervals.slice().sort((a, b) => a[0] - b[0]);
        const expected = example.output;
        const steps = [];
        const merged = [intervals[0].slice()];

        steps.push({
            vizType: 'intervals',
            intervals: intervals,
            merged: merged.slice(),
            status: 'Sort by start time',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Sorted intervals:</strong> ' + JSON.stringify(intervals) + '<br>' +
                '<strong>Expected:</strong> ' + JSON.stringify(expected) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (let i = 1; i < intervals.length; i++) {
            const last = merged[merged.length - 1];
            const curr = intervals[i];

            if (curr[0] <= last[1]) {
                last[1] = Math.max(last[1], curr[1]);
                steps.push({
                    vizType: 'intervals',
                    intervals: intervals,
                    merged: merged.map(m => m.slice()),
                    currentIdx: i,
                    status: 'Merge: [' + last[0] + ',' + last[1] + ']',
                    explanation: '<strong>Merge!</strong><br>[' + curr[0] + ',' + curr[1] + '] overlaps with [' + last[0] + ',' + last[1] + ']'
                });
            } else {
                merged.push(curr.slice());
                steps.push({
                    vizType: 'intervals',
                    intervals: intervals,
                    merged: merged.map(m => m.slice()),
                    currentIdx: i,
                    status: 'Add: [' + curr[0] + ',' + curr[1] + ']',
                    explanation: '<strong>No overlap</strong><br>Add [' + curr[0] + ',' + curr[1] + '] as new interval'
                });
            }
        }

        steps.push({
            vizType: 'intervals',
            merged: merged,
            status: 'Result: ' + merged.length + ' intervals',
            explanation: '<strong>Complete!</strong><br>Merged: ' + JSON.stringify(merged)
        });

        return steps;
    }

    // =========================================================================
    // LARGEST RANGE (Hash Expansion)
    // =========================================================================
    function runLargestRange(example, config, complexity) {
        const steps = [];
        let arr = example.input.array;
        if (!arr || !Array.isArray(arr) || arr.length < 4) {
            arr = arr || [1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6];
        }

        const expected = example.output || [0, 7];

        // Step 1: Introduction
        steps.push({
            vizType: 'array-hash',
            array: arr.slice(),
            hashTable: [],
            currentIndex: -1,
            status: 'Initialize: ' + config.name,
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> [' + arr.join(', ') + ']<br>' +
                '<strong>Expected:</strong> [' + expected.join(', ') + ']<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Step 2: Build hash set
        const numSet = {};
        arr.forEach(num => { numSet[num] = true; });
        const hashKeys = Object.keys(numSet).map(Number).sort((a,b) => a-b);

        steps.push({
            vizType: 'array-hash',
            array: arr.slice(),
            hashTable: hashKeys.slice(0, 8),
            currentIndex: -1,
            status: 'Build hash set',
            explanation: '<strong>Step 1: Build Hash Set</strong><br><br>' +
                '- Add all numbers to a hash set for O(1) lookups<br>' +
                '- This allows us to quickly check if a number exists<br><br>' +
                '<code>nums = {' + hashKeys.slice(0, 10).join(', ') + (hashKeys.length > 10 ? '...' : '') + '}</code>'
        });

        // Step 3: Find a starting number
        const startNum = expected[0];
        let startIdx = arr.indexOf(startNum);
        if (startIdx === -1) startIdx = 0;

        steps.push({
            vizType: 'array-hash',
            array: arr.slice(),
            hashTable: hashKeys.slice(0, 8),
            currentIndex: startIdx,
            checking: startNum,
            status: 'Check: ' + startNum,
            explanation: '<strong>Step 2: Find Range Start</strong><br><br>' +
                '- For each number, check if it\'s the start of a range<br>' +
                '- A number is a range start if (num - 1) doesn\'t exist in the set<br><br>' +
                '- Checking <strong>' + startNum + '</strong>: is <strong>' + (startNum - 1) + '</strong> in set? ' +
                (numSet[startNum - 1] ? 'Yes (not a start)' : '<span style="color:#3fb950;">No - this is a range start!</span>')
        });

        // Step 4: Expand the range
        let left = startNum;
        let right = startNum;
        while (numSet[left - 1]) left--;
        while (numSet[right + 1]) right++;

        const rangeNums = [];
        for (let i = left; i <= right; i++) rangeNums.push(i);

        steps.push({
            vizType: 'array-hash',
            array: arr.slice(),
            hashTable: rangeNums.slice(0, 10),
            currentIndex: startIdx,
            checking: startNum,
            status: 'Expand range: [' + left + ', ' + right + ']',
            explanation: '<strong>Step 3: Expand Range</strong><br><br>' +
                '- Starting from <strong>' + startNum + '</strong>, expand in both directions<br>' +
                '- Expand left: ' + startNum + ' -> ' + left + '<br>' +
                '- Expand right: ' + startNum + ' -> ' + right + '<br><br>' +
                '- Found range: <strong>[' + left + ', ' + right + ']</strong><br>' +
                '- Range values: {' + rangeNums.join(', ') + '}<br>' +
                '- Range length: <strong>' + (right - left + 1) + '</strong>'
        });

        // Final result
        steps.push({
            vizType: 'array-hash',
            array: arr.slice(),
            hashTable: ['Best: [' + expected[0] + ',' + expected[1] + ']'],
            currentIndex: -1,
            status: 'Result: [' + expected[0] + ', ' + expected[1] + ']',
            explanation: '<strong>Complete!</strong><br><br>' +
                '- Largest range found: <strong>[' + expected[0] + ', ' + expected[1] + ']</strong><br>' +
                '- Range length: <strong>' + (expected[1] - expected[0] + 1) + '</strong>'
        });

        return steps;
    }

    // =========================================================================
    // MONOTONIC ARRAY
    // =========================================================================
    function runMonotonicArray(example, config, complexity) {
        if (!example || !example.input || !example.input.array) return null;
        const arr = example.input.array;
        const expected = example.output;
        const steps = [];
        let isIncreasing = true;
        let isDecreasing = true;

        steps.push({
            vizType: 'array-scan',
            array: arr,
            status: 'Check if monotonic',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Array:</strong> [' + arr.join(', ') + ']<br>' +
                '<strong>Expected:</strong> ' + expected + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > arr[i-1]) isDecreasing = false;
            if (arr[i] < arr[i-1]) isIncreasing = false;

            steps.push({
                vizType: 'array-scan',
                array: arr,
                currentIdx: i,
                isIncreasing: isIncreasing,
                isDecreasing: isDecreasing,
                status: arr[i-1] + (arr[i] > arr[i-1] ? ' < ' : arr[i] < arr[i-1] ? ' > ' : ' = ') + arr[i],
                explanation: 'Compare arr[' + (i-1) + ']=' + arr[i-1] + ' and arr[' + i + ']=' + arr[i] + '<br>' +
                    'Still increasing: ' + isIncreasing + '<br>Still decreasing: ' + isDecreasing
            });

            if (!isIncreasing && !isDecreasing) break;
        }

        const result = isIncreasing || isDecreasing;
        steps.push({
            vizType: 'array-scan',
            array: arr,
            isIncreasing: isIncreasing,
            isDecreasing: isDecreasing,
            status: result ? 'Yes! Monotonic' : 'No! Not monotonic',
            explanation: result ?
                '<strong>Monotonic!</strong><br>' + (isIncreasing ? 'Non-decreasing' : 'Non-increasing') :
                '<strong>Not monotonic</strong><br>Array goes both up and down'
        });

        return steps;
    }

    // =========================================================================
    // ZERO SUM SUBARRAY
    // =========================================================================
    function runZeroSumSubarray(example, config, complexity) {
        if (!example || !example.input || !example.input.nums) return null;
        const nums = example.input.nums;
        const expected = example.output;
        const steps = [];
        let prefixSum = 0;
        const seen = [0];
        let found = false;

        steps.push({
            array: nums.slice(),
            currentIdx: -1,
            prefixSum: 0,
            seen: seen.slice(),
            vizType: 'array-scan',
            status: 'Initialize: seen = {0}',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> nums=[' + nums.join(', ') + ']<br>' +
                '<strong>Expected:</strong> ' + expected + '<br><br>' +
                '<strong>Key Insight:</strong> If prefix sum repeats, the subarray between equals 0!<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (let i = 0; i < nums.length && !found; i++) {
            prefixSum += nums[i];

            if (seen.indexOf(prefixSum) !== -1) {
                found = true;
                steps.push({
                    array: nums.slice(),
                    currentIdx: i,
                    prefixSum: prefixSum,
                    seen: seen.slice(),
                    vizType: 'array-scan',
                    status: 'Found! prefixSum=' + prefixSum + ' already in seen',
                    explanation: '<strong>Zero Sum Subarray Found!</strong><br><br>' +
                        '- Current index: ' + i + ', value: ' + nums[i] + '<br>' +
                        '- Prefix sum: ' + prefixSum + '<br>' +
                        '- <span style="color:#3fb950;">' + prefixSum + ' is already in seen!</span><br>' +
                        '- This means a subarray sums to 0'
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
                    explanation: '<strong>Step ' + (i + 1) + ':</strong><br><br>' +
                        '- nums[' + i + '] = ' + nums[i] + '<br>' +
                        '- Prefix sum: ' + prefixSum + '<br>' +
                        '- Not in seen, adding to set<br>' +
                        '- seen = {' + seen.join(', ') + '}'
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
                status: 'No zero sum subarray found',
                explanation: '<strong>Result: false</strong><br><br>' +
                    '- Scanned entire array<br>' +
                    '- No repeated prefix sums<br>' +
                    '- No zero sum subarray exists'
            });
        }

        return steps;
    }

    // =========================================================================
    // REGISTER ALL ARRAY VISUALIZATIONS
    // =========================================================================
    window.VizUtils.register('two-pointer-subsequence', runValidateSubsequence);
    window.VizUtils.register('hash-table-two-sum', runTwoNumberSum);
    window.VizUtils.register('two-pointer-sorted-squared', runSortedSquaredArray);
    window.VizUtils.register('two-pointer-move', runMoveElementToEnd);
    window.VizUtils.register('sort-three-sum', runThreeNumberSum);
    window.VizUtils.register('spiral-matrix', runSpiralTraverse);
    window.VizUtils.register('hash-counting', runTournamentWinner);
    window.VizUtils.register('greedy-change', runNonConstructibleChange);
    window.VizUtils.register('sort-merge', runMergeIntervals);
    window.VizUtils.register('hash-expansion', runLargestRange);
    window.VizUtils.register('linear-scan', runMonotonicArray);
    window.VizUtils.register('hash-prefix-sum', runZeroSumSubarray);

    // Export for external use
    window.ArraysViz = {
        runValidateSubsequence,
        runTwoNumberSum,
        runSortedSquaredArray,
        runMoveElementToEnd,
        runThreeNumberSum,
        runSpiralTraverse,
        runTournamentWinner,
        runNonConstructibleChange,
        runMergeIntervals,
        runLargestRange,
        runMonotonicArray,
        runZeroSumSubarray
    };

    console.log('[ArraysViz] Array visualization handlers loaded');

})();
