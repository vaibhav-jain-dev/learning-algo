// 200 Must Solve Problems - Interactive Features
(function() {
    'use strict';

    // Problem data structure
    let currentCategory = null;
    let currentProblem = null;
    let codeEditorInstance = null;

    // Problem categories mapping
    const categories = {
        'arrays': { name: 'Arrays', problems: [] },
        'binary-search-trees': { name: 'Binary Search Trees', problems: [] },
        'binary-trees': { name: 'Binary Trees', problems: [] },
        'dynamic-programming': { name: 'Dynamic Programming', problems: [] },
        'graphs': { name: 'Graphs', problems: [] },
        'linked-lists': { name: 'Linked Lists', problems: [] },
        'recursion': { name: 'Recursion', problems: [] },
        'famous-algorithms': { name: 'Famous Algorithms', problems: [] }
    };

    /**
     * Show a category's problems
     */
    window.showCategory = function(categorySlug) {
        currentCategory = categorySlug;
        const panelEl = document.getElementById('problem-panel');
        const titleEl = document.getElementById('panel-title');
        const contentEl = document.getElementById('panel-content');

        if (!panelEl) return;

        titleEl.textContent = categories[categorySlug]?.name || categorySlug;

        // Simulate loading problems from API or local data
        const problems = generateSampleProblems(categorySlug);

        contentEl.innerHTML = problems.map(problem => `
            <div class="problem-item" style="
                padding: 1rem;
                border-bottom: 1px solid #eee;
                cursor: pointer;
                transition: background 0.2s;
            " onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background='white'"
                onclick="window.showProblem('${problem.id}')">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h3 style="margin: 0; font-weight: 600;">${problem.title}</h3>
                        <p style="margin: 0.25rem 0 0 0; color: #999; font-size: 0.9rem;">${problem.description}</p>
                    </div>
                    <span class="difficulty-badge" style="
                        padding: 0.3rem 0.8rem;
                        border-radius: 20px;
                        background: ${getDifficultyColor(problem.difficulty)};
                        color: white;
                        font-size: 0.85rem;
                        font-weight: 600;
                    ">${problem.difficulty}</span>
                </div>
            </div>
        `).join('');

        panelEl.classList.add('active');
    };

    /**
     * Hide category problems panel
     */
    window.hideCategory = function() {
        const panelEl = document.getElementById('problem-panel');
        if (panelEl) {
            panelEl.classList.remove('active');
        }
        currentCategory = null;
    };

    /**
     * Show a specific problem
     */
    window.showProblem = function(problemId) {
        currentProblem = problemId;
        const editorViewEl = document.getElementById('editor-view');
        const titleEl = document.getElementById('problem-title');
        const difficultyEl = document.getElementById('problem-difficulty');
        const descriptionEl = document.getElementById('description-content');

        if (!editorViewEl) return;

        // Simulate fetching problem details
        const problem = {
            title: `Problem: ${problemId}`,
            difficulty: 'Medium',
            description: `This is a ${currentCategory} problem.`,
            hints: ['Hint 1', 'Hint 2'],
            solutions: ['Solution 1', 'Solution 2']
        };

        titleEl.textContent = problem.title;
        difficultyEl.textContent = problem.difficulty;
        difficultyEl.className = `problem-difficulty ${problem.difficulty.toLowerCase()}`;
        descriptionEl.innerHTML = `<p>${problem.description}</p>`;

        editorViewEl.classList.add('active');
        if (document.getElementById('problem-panel')) {
            document.getElementById('problem-panel').classList.add('active');
        }
    };

    /**
     * Hide editor view
     */
    window.hideEditor = function() {
        const editorViewEl = document.getElementById('editor-view');
        if (editorViewEl) {
            editorViewEl.classList.remove('active');
        }
        currentProblem = null;
    };

    /**
     * Show description tab
     */
    window.showDescTab = function(tabName) {
        const tabs = document.querySelectorAll('.desc-tab');
        const contents = document.querySelectorAll('[id$="-content"]');

        tabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            }
        });

        // Show/hide content based on tab
        const descContent = document.getElementById('description-content');
        const solutionsContent = document.getElementById('solutions-content');
        const vizContent = document.getElementById('visualization-content');

        if (descContent) descContent.style.display = 'none';
        if (solutionsContent) solutionsContent.style.display = 'none';
        if (vizContent) vizContent.style.display = 'none';

        switch(tabName) {
            case 'problem':
                if (descContent) descContent.style.display = 'block';
                break;
            case 'solutions':
                if (solutionsContent) solutionsContent.style.display = 'block';
                break;
            case 'visualize':
                if (vizContent) vizContent.style.display = 'block';
                break;
            case 'hints':
                if (descContent) {
                    descContent.style.display = 'block';
                    descContent.innerHTML = '<div><h3>Hints</h3><ul><li>Hint 1</li><li>Hint 2</li></ul></div>';
                }
                break;
        }
    };

    /**
     * Set programming language
     */
    window.setLanguage = function(language) {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === language) {
                btn.classList.add('active');
            }
        });

        // Switch code editor to selected language
        console.log(`Switched to ${language}`);
    };

    /**
     * Format code
     */
    window.formatCode = function() {
        console.log('Formatting code...');
        // Placeholder for code formatter integration
    };

    /**
     * Reset code to default
     */
    window.resetCode = function() {
        const codeEditor = document.getElementById('code-editor-wrapper');
        if (codeEditor) {
            codeEditor.innerHTML = '';
        }
        console.log('Code reset');
    };

    /**
     * Run code
     */
    window.runCode = function() {
        console.log('Running code...');
        const outputPanel = document.getElementById('output-content');
        if (outputPanel) {
            outputPanel.innerHTML = '<div style="color: #999;">Running code...</div>';

            // Simulate code execution
            setTimeout(() => {
                outputPanel.innerHTML = `<div>
                    <div style="color: #4caf50; font-weight: 600;">✓ Output:</div>
                    <div style="margin-top: 0.5rem;">Test passed!</div>
                </div>`;
            }, 1000);
        }
    };

    /**
     * Clear output
     */
    window.clearOutput = function() {
        const outputPanel = document.getElementById('output-content');
        if (outputPanel) {
            outputPanel.innerHTML = '<div class="output-placeholder">Run your code to see output here</div>';
        }
    };

    /**
     * Helper: Get difficulty color
     */
    function getDifficultyColor(difficulty) {
        const colors = {
            'Easy': '#4caf50',
            'Medium': '#ffc107',
            'Hard': '#ff6f00',
            'Very Hard': '#9c27b0'
        };
        return colors[difficulty] || '#999';
    }

    /**
     * Generate sample problems for a category
     */
    function generateSampleProblems(categorySlug) {
        const problemLists = {
            'arrays': [
                { id: 'arr-1', title: 'Two Sum', description: 'Find two numbers that add up to target', difficulty: 'Easy' },
                { id: 'arr-2', title: 'Container With Most Water', description: 'Maximize the area of water container', difficulty: 'Medium' },
            ],
            'binary-search-trees': [
                { id: 'bst-1', title: 'Validate BST', description: 'Check if binary tree is a valid BST', difficulty: 'Medium' },
            ],
            'graphs': [
                { id: 'gr-1', title: 'Number of Islands', description: 'Count connected components in grid', difficulty: 'Medium' },
            ]
        };

        return problemLists[categorySlug] || [
            { id: 'prob-1', title: 'Sample Problem', description: 'This is a sample problem', difficulty: 'Medium' }
        ];
    }

    /**
     * Initialize page on load
     */
    function init() {
        // Set up event listeners
        const problemPanel = document.getElementById('problem-panel');
        if (problemPanel) {
            const backBtn = problemPanel.querySelector('.back-btn');
            if (backBtn) {
                backBtn.addEventListener('click', window.hideCategory);
            }
        }

        const editorView = document.getElementById('editor-view');
        if (editorView) {
            const backBtn = editorView.querySelector('.back-btn');
            if (backBtn) {
                backBtn.addEventListener('click', window.hideEditor);
            }
        }

        // Initialize language selector
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach((btn, idx) => {
            if (idx === 0) btn.classList.add('active');
        });

        console.log('200 Problems page initialized');
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
