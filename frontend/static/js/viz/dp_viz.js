/**
 * Dynamic Programming Algorithm Visualizations
 */
(function() {
    'use strict';

    if (!window.VizUtils) {
        console.error('[DPViz] VizUtils not loaded yet!');
        return;
    }

    function runDPCoinChange(example, config, complexity) {
        const steps = [];
        const coins = example.input.denominations || example.input.coins;
        const target = example.input.n || example.input.amount || example.input.target;
        const expected = example.output;

        if (!coins || target === undefined) return window.VizUtils.runGenericVisualization(example, config, complexity);

        steps.push({
            vizType: 'dp-table',
            coins: coins,
            target: target,
            dp: [],
            status: 'Coin Change: target = ' + target,
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Coins:</strong> [' + coins.join(', ') + ']<br>' +
                '<strong>Target:</strong> ' + target + '<br>' +
                '<strong>Expected:</strong> ' + expected + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Build DP table
        const dp = new Array(target + 1).fill(0);
        dp[0] = 1;

        for (let i = 0; i < coins.length; i++) {
            const coin = coins[i];
            for (let amount = coin; amount <= target; amount++) {
                dp[amount] += dp[amount - coin];
            }
            steps.push({
                vizType: 'dp-table',
                coins: coins,
                target: target,
                dp: dp.slice(),
                currentCoin: coin,
                status: 'After coin ' + coin + ': dp[' + target + '] = ' + dp[target],
                explanation: '<strong>Processing coin ' + coin + '</strong><br>dp[' + target + '] = ' + dp[target]
            });
        }

        steps.push({
            vizType: 'dp-table',
            coins: coins,
            target: target,
            dp: dp,
            status: 'Result: ' + dp[target] + ' ways',
            explanation: '<strong>Result:</strong> ' + dp[target] + ' ways to make ' + target
        });

        return steps;
    }

    function runDPLCS(example, config, complexity) {
        const steps = [];
        const str1 = example.input.str1 || example.input.s1 || '';
        const str2 = example.input.str2 || example.input.s2 || '';
        const expected = example.output;

        steps.push({
            vizType: 'dp-table',
            str1: str1,
            str2: str2,
            status: 'LCS: "' + str1 + '" vs "' + str2 + '"',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>String 1:</strong> "' + str1 + '"<br>' +
                '<strong>String 2:</strong> "' + str2 + '"<br>' +
                '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(expected)) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Build DP table visualization
        const m = str1.length;
        const n = str2.length;
        const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

        for (let i = 1; i <= Math.min(m, 5); i++) {
            for (let j = 1; j <= Math.min(n, 5); j++) {
                if (str1[i-1] === str2[j-1]) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                }
            }
            steps.push({
                vizType: 'dp-table',
                str1: str1,
                str2: str2,
                dp: dp.map(row => row.slice()),
                currentRow: i,
                status: 'Row ' + i + ': processing "' + str1[i-1] + '"',
                explanation: '<strong>Processing row ' + i + '</strong><br>Character: "' + str1[i-1] + '"'
            });
        }

        steps.push({
            vizType: 'dp-table',
            str1: str1,
            str2: str2,
            dp: dp,
            status: 'Result: ' + (example.outputRaw || JSON.stringify(expected)),
            explanation: '<strong>Result:</strong> ' + (example.outputRaw || JSON.stringify(expected))
        });

        return steps;
    }

    function runDPGeneric(example, config, complexity) {
        const steps = [];
        const inputStr = JSON.stringify(example.input, null, 2);
        const outputStr = JSON.stringify(example.output);

        steps.push({
            vizType: 'dp-table',
            status: config.name,
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                '<strong>Input:</strong><br><pre style="background:#161b22;padding:0.5rem;border-radius:4px;font-size:0.85em;">' + inputStr.substring(0, 200) + '</pre>' +
                '<strong>Expected:</strong> ' + (example.outputRaw || outputStr) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        steps.push({
            vizType: 'dp-table',
            status: 'Building DP table...',
            explanation: '<strong>Dynamic Programming</strong><br>Building optimal substructure table...'
        });

        steps.push({
            vizType: 'dp-table',
            status: 'Computing optimal solution...',
            explanation: '<strong>Computing...</strong><br>Finding optimal value from DP table.'
        });

        steps.push({
            vizType: 'dp-table',
            status: 'Result: ' + (example.outputRaw || outputStr),
            explanation: '<strong>Result:</strong> ' + (example.outputRaw || outputStr)
        });

        return steps;
    }

    // Register DP visualizations
    window.VizUtils.register('dp-coin-change', runDPCoinChange);
    window.VizUtils.register('dp-lcs', runDPLCS);
    window.VizUtils.register('dp-edit', runDPGeneric);
    window.VizUtils.register('dp-edit-distance', runDPGeneric);
    window.VizUtils.register('dp-knapsack', runDPGeneric);
    window.VizUtils.register('dp-max-sum', runDPGeneric);
    window.VizUtils.register('dp-max-subset', runDPGeneric);
    window.VizUtils.register('dp-lis', runDPGeneric);
    window.VizUtils.register('dp-increasing-subseq', runDPGeneric);
    window.VizUtils.register('dp-matrix', runDPGeneric);
    window.VizUtils.register('dp-disk-stacking', runDPGeneric);
    window.VizUtils.register('dp-pi-numbers', runDPGeneric);
    window.VizUtils.register('dp-transactions', runDPGeneric);
    window.VizUtils.register('dp-palindrome', runDPGeneric);
    window.VizUtils.register('dp-string-chain', runDPGeneric);
    window.VizUtils.register('dp-square-zeroes', runDPGeneric);
    window.VizUtils.register('dp-graph-traversal', runDPGeneric);
    window.VizUtils.register('dp-jumps', runDPGeneric);

    window.DPViz = { runDPCoinChange, runDPLCS, runDPGeneric };
    console.log('[DPViz] Dynamic Programming visualization handlers loaded');
})();
