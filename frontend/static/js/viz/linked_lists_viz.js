/**
 * Linked List Algorithm Visualizations
 */
(function() {
    'use strict';

    if (!window.VizUtils) {
        console.error('[LinkedListsViz] VizUtils not loaded yet!');
        return;
    }

    // =========================================================================
    // LINKED LIST REMOVE DUPLICATES
    // =========================================================================
    function runLinkedListRemoveDuplicates(example, config, complexity) {
        const steps = [];
        const list = example.input.list;
        if (!list || !Array.isArray(list)) return window.VizUtils.runGenericVisualization(example, config, complexity);

        const nodes = list.map((val, idx) => ({
            value: val,
            next: idx < list.length - 1 ? idx + 1 : null
        }));

        steps.push({
            vizType: 'linked-list',
            nodes: nodes.map(n => ({ value: n.value, next: n.next })),
            current: -1,
            pointers: { current: 0 },
            status: 'Initialize',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> ' + (example.inputRaw || list.join(' -> ')) + '<br>' +
                '<strong>Expected:</strong> ' + (example.outputRaw || example.output.join(' -> ')) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        const resultNodes = [];
        let prevValue = null;
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].value !== prevValue) {
                resultNodes.push(nodes[i].value);
                prevValue = nodes[i].value;
                steps.push({
                    vizType: 'linked-list',
                    nodes: nodes.map(n => ({ value: n.value, next: n.next })),
                    current: i,
                    pointers: { current: i },
                    result: resultNodes.slice(),
                    status: 'Keep: ' + nodes[i].value,
                    explanation: '<strong>Keep node ' + nodes[i].value + '</strong><br>Result so far: ' + resultNodes.join(' -> ')
                });
            } else {
                steps.push({
                    vizType: 'linked-list',
                    nodes: nodes.map(n => ({ value: n.value, next: n.next })),
                    current: i,
                    pointers: { current: i },
                    result: resultNodes.slice(),
                    status: 'Skip duplicate: ' + nodes[i].value,
                    explanation: '<strong>Skip duplicate ' + nodes[i].value + '</strong>'
                });
            }
        }

        steps.push({
            vizType: 'linked-list',
            nodes: resultNodes.map((v, i) => ({ value: v, next: i < resultNodes.length - 1 ? i + 1 : null })),
            current: -1,
            status: 'Complete!',
            explanation: '<strong>Result:</strong> ' + resultNodes.join(' -> ')
        });

        return steps;
    }

    // =========================================================================
    // LINKED LIST REVERSE
    // =========================================================================
    function runLinkedListReverse(example, config, complexity) {
        const steps = [];
        const list = example.input.list || example.input.head;
        if (!list || !Array.isArray(list)) return window.VizUtils.runGenericVisualization(example, config, complexity);

        const nodes = list.map((val, idx) => ({
            value: val,
            next: idx < list.length - 1 ? idx + 1 : null
        }));

        steps.push({
            vizType: 'linked-list',
            nodes: nodes.map(n => ({ value: n.value, next: n.next })),
            current: 0,
            status: 'Initialize: Reverse linked list',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> ' + list.join(' -> ') + '<br>' +
                '<strong>Expected:</strong> ' + (example.outputRaw || example.output.join(' -> ')) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        const reversed = list.slice().reverse();
        for (let i = 0; i < Math.min(list.length, 6); i++) {
            steps.push({
                vizType: 'linked-list',
                nodes: nodes.map(n => ({ value: n.value, next: n.next })),
                current: i,
                status: 'Reversing pointer at ' + list[i],
                explanation: '<strong>Reverse pointer at node ' + list[i] + '</strong>'
            });
        }

        const reversedNodes = reversed.map((val, idx) => ({
            value: val,
            next: idx < reversed.length - 1 ? idx + 1 : null
        }));

        steps.push({
            vizType: 'linked-list',
            nodes: reversedNodes,
            current: -1,
            status: 'Complete!',
            explanation: '<strong>Result:</strong> ' + reversed.join(' -> ')
        });

        return steps;
    }

    // =========================================================================
    // GENERIC LINKED LIST
    // =========================================================================
    function runLinkedListGeneric(example, config, complexity) {
        const steps = [];
        const list = example.input.list || example.input.head || example.input.linkedList;

        if (!list || !Array.isArray(list)) {
            return window.VizUtils.runGenericVisualization(example, config, complexity);
        }

        const nodes = list.map((val, idx) => ({
            value: val,
            next: idx < list.length - 1 ? idx + 1 : null
        }));

        steps.push({
            vizType: 'linked-list',
            nodes: nodes.map(n => ({ value: n.value, next: n.next })),
            current: -1,
            status: config.name,
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                '<strong>Input:</strong> ' + list.join(' -> ') + '<br>' +
                '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        for (let i = 0; i < Math.min(nodes.length, 6); i++) {
            steps.push({
                vizType: 'linked-list',
                nodes: nodes.map(n => ({ value: n.value, next: n.next })),
                current: i,
                status: 'Process node ' + nodes[i].value,
                explanation: '<strong>Processing node ' + nodes[i].value + '</strong>'
            });
        }

        steps.push({
            vizType: 'linked-list',
            nodes: nodes.map(n => ({ value: n.value, next: n.next })),
            current: -1,
            status: 'Result: ' + (example.outputRaw || JSON.stringify(example.output)),
            explanation: '<strong>Result:</strong> ' + (example.outputRaw || JSON.stringify(example.output))
        });

        return steps;
    }

    // =========================================================================
    // REGISTER LINKED LIST VISUALIZATIONS
    // =========================================================================
    window.VizUtils.register('ll-remove-duplicates', runLinkedListRemoveDuplicates);
    window.VizUtils.register('ll-reverse', runLinkedListReverse);
    window.VizUtils.register('ll-merge', runLinkedListGeneric);
    window.VizUtils.register('ll-find-loop', runLinkedListGeneric);
    window.VizUtils.register('ll-remove', runLinkedListGeneric);
    window.VizUtils.register('ll-middle', runLinkedListGeneric);
    window.VizUtils.register('ll-construction', runLinkedListGeneric);
    window.VizUtils.register('ll-remove-kth', runLinkedListGeneric);
    window.VizUtils.register('ll-sum', runLinkedListGeneric);
    window.VizUtils.register('ll-shift', runLinkedListGeneric);
    window.VizUtils.register('ll-lru-cache', runLinkedListGeneric);
    window.VizUtils.register('ll-rearrange', runLinkedListGeneric);

    window.LinkedListsViz = {
        runLinkedListRemoveDuplicates,
        runLinkedListReverse,
        runLinkedListGeneric
    };

    console.log('[LinkedListsViz] Linked list visualization handlers loaded');

})();
