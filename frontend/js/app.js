/**
 * DSAlgo Learn - Frontend Application
 * Mobile-first responsive learning platform
 */

// State
let editor = null;
let currentProblem = null;
let currentLanguage = 'python';
let hintsVisible = false;

// DOM Elements
const elements = {
    menuBtn: null,
    sidebar: null,
    navOverlay: null,
    searchInput: null,
    searchClear: null,
    problemNav: null,
    welcomeScreen: null,
    problemView: null,
    tabBtns: null,
    panels: null,
    langBtns: null,
    hintToggle: null,
    runBtn: null,
    resetBtn: null,
    clearBtn: null,
    startBtn: null,
    terminal: null,
    terminalContent: null,
    breadcrumb: null,
    problemTitle: null,
    problemDescription: null
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    initEditor();
    loadProblems();
    bindEvents();
});

function cacheElements() {
    elements.menuBtn = document.getElementById('menuBtn');
    elements.sidebar = document.getElementById('sidebar');
    elements.navOverlay = document.getElementById('navOverlay');
    elements.searchInput = document.getElementById('searchInput');
    elements.searchClear = document.getElementById('searchClear');
    elements.problemNav = document.getElementById('problemNav');
    elements.welcomeScreen = document.getElementById('welcomeScreen');
    elements.problemView = document.getElementById('problemView');
    elements.tabBtns = document.querySelectorAll('.tab-btn');
    elements.panels = {
        description: document.getElementById('descriptionPanel'),
        code: document.getElementById('codePanel'),
        output: document.getElementById('outputPanel')
    };
    elements.langBtns = document.querySelectorAll('.lang-btn');
    elements.hintToggle = document.getElementById('hintToggle');
    elements.runBtn = document.getElementById('runBtn');
    elements.resetBtn = document.getElementById('resetBtn');
    elements.clearBtn = document.getElementById('clearBtn');
    elements.startBtn = document.getElementById('startBtn');
    elements.terminal = document.getElementById('terminal');
    elements.terminalContent = document.getElementById('terminalContent');
    elements.breadcrumb = document.getElementById('breadcrumb');
    elements.problemTitle = document.getElementById('problemTitle');
    elements.problemDescription = document.getElementById('problemDescription');
}

function initEditor() {
    const textarea = document.getElementById('codeEditor');
    editor = CodeMirror.fromTextArea(textarea, {
        mode: 'python',
        theme: 'dracula',
        lineNumbers: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        lineWrapping: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        extraKeys: {
            'Ctrl-Enter': runCode,
            'Cmd-Enter': runCode,
            'Tab': (cm) => {
                if (cm.somethingSelected()) {
                    cm.indentSelection('add');
                } else {
                    cm.replaceSelection('    ', 'end');
                }
            }
        }
    });
}

function bindEvents() {
    // Menu toggle
    elements.menuBtn.addEventListener('click', toggleSidebar);
    elements.navOverlay.addEventListener('click', closeSidebar);

    // Search
    elements.searchInput.addEventListener('input', handleSearch);
    elements.searchClear.addEventListener('click', clearSearch);

    // Tab navigation (mobile)
    elements.tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Language switcher
    elements.langBtns.forEach(btn => {
        btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });

    // Actions
    elements.hintToggle.addEventListener('click', toggleHints);
    elements.runBtn.addEventListener('click', runCode);
    elements.resetBtn.addEventListener('click', resetCode);
    elements.clearBtn.addEventListener('click', clearOutput);
    elements.startBtn.addEventListener('click', () => {
        toggleSidebar();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);

    // Handle resize
    window.addEventListener('resize', handleResize);
}

// Sidebar functions
function toggleSidebar() {
    elements.menuBtn.classList.toggle('active');
    elements.sidebar.classList.toggle('active');
    elements.navOverlay.classList.toggle('active');
    document.body.style.overflow = elements.sidebar.classList.contains('active') ? 'hidden' : '';
}

function closeSidebar() {
    elements.menuBtn.classList.remove('active');
    elements.sidebar.classList.remove('active');
    elements.navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Problem loading
async function loadProblems() {
    try {
        const response = await fetch('/api/problems');
        const problems = await response.json();
        renderProblemTree(problems);
    } catch (error) {
        console.error('Failed to load problems:', error);
        elements.problemNav.innerHTML = `
            <div class="loading-spinner">
                <p style="color: var(--error);">Failed to load problems</p>
                <button onclick="loadProblems()" class="cta-btn" style="margin-top: 16px; padding: 10px 20px;">
                    Retry
                </button>
            </div>
        `;
    }
}

function renderProblemTree(items, container = null) {
    if (!container) {
        container = elements.problemNav;
        container.innerHTML = '';
    }

    items.forEach(item => {
        if (item.type === 'category') {
            const categoryEl = document.createElement('div');
            categoryEl.className = 'nav-category';

            const problemCount = countProblems(item.children);

            categoryEl.innerHTML = `
                <div class="category-header">
                    <svg class="category-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                    <span>${item.name}</span>
                    <span class="category-count">${problemCount}</span>
                </div>
                <div class="category-children"></div>
            `;

            const header = categoryEl.querySelector('.category-header');
            const children = categoryEl.querySelector('.category-children');

            header.addEventListener('click', () => {
                header.classList.toggle('expanded');
                children.classList.toggle('expanded');
            });

            if (item.children && item.children.length > 0) {
                renderProblemTree(item.children, children);
            }

            container.appendChild(categoryEl);
        } else if (item.type === 'problem') {
            const problemEl = document.createElement('div');
            problemEl.className = 'problem-item';
            problemEl.textContent = item.name;
            problemEl.dataset.path = item.path;

            problemEl.addEventListener('click', () => {
                loadProblem(item.path, problemEl);
                if (window.innerWidth < 768) {
                    closeSidebar();
                }
            });

            container.appendChild(problemEl);
        }
    });
}

function countProblems(items) {
    let count = 0;
    items.forEach(item => {
        if (item.type === 'problem') {
            count++;
        } else if (item.children) {
            count += countProblems(item.children);
        }
    });
    return count;
}

async function loadProblem(path, element) {
    // Update active state
    document.querySelectorAll('.problem-item').forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');

    try {
        const response = await fetch(`/api/problem/${path}`);
        const problem = await response.json();

        if (problem.error) {
            alert('Failed to load problem: ' + problem.error);
            return;
        }

        currentProblem = problem;
        displayProblem(problem, path);
    } catch (error) {
        console.error('Failed to load problem:', error);
        alert('Failed to load problem. Please try again.');
    }
}

function displayProblem(problem, path) {
    // Show problem view
    elements.welcomeScreen.style.display = 'none';
    elements.problemView.classList.add('active');

    // Set breadcrumb and title
    const parts = path.split('/');
    const title = parts[parts.length - 1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    elements.breadcrumb.innerHTML = parts.slice(0, -1).map(p =>
        `<span>${p.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>`
    ).join(' / ');

    elements.problemTitle.textContent = title;

    // Set description
    elements.problemDescription.innerHTML = problem.content_html || '<p>No description available.</p>';

    // Update language buttons
    elements.langBtns.forEach(btn => {
        const lang = btn.dataset.lang;
        btn.disabled = !(lang === 'python' ? problem.has_python : problem.has_golang);
    });

    // Set initial language and code
    if (problem.has_python) {
        switchLanguage('python');
    } else if (problem.has_golang) {
        switchLanguage('golang');
    }

    // Reset hints
    hintsVisible = false;
    elements.hintToggle.classList.remove('active');

    // Clear output
    clearOutput();

    // Switch to description tab on mobile
    if (window.innerWidth < 768) {
        switchTab('description');
    }
}

// Search functions
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();

    if (query) {
        elements.searchClear.classList.add('visible');
    } else {
        elements.searchClear.classList.remove('visible');
    }

    const items = document.querySelectorAll('.problem-item');
    const categories = document.querySelectorAll('.nav-category');

    items.forEach(item => {
        const match = item.textContent.toLowerCase().includes(query);
        item.style.display = match ? '' : 'none';
    });

    categories.forEach(cat => {
        const header = cat.querySelector('.category-header');
        const children = cat.querySelector('.category-children');
        const hasVisible = cat.querySelectorAll('.problem-item:not([style*="display: none"])').length > 0;

        if (query) {
            header.classList.add('expanded');
            children.classList.add('expanded');
        }

        cat.style.display = hasVisible ? '' : 'none';
    });
}

function clearSearch() {
    elements.searchInput.value = '';
    elements.searchClear.classList.remove('visible');

    document.querySelectorAll('.problem-item, .nav-category').forEach(el => {
        el.style.display = '';
    });
}

// Tab navigation (mobile)
function switchTab(tab) {
    elements.tabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    Object.entries(elements.panels).forEach(([key, panel]) => {
        panel.classList.toggle('active', key === tab);
    });
}

// Language switching
function switchLanguage(lang) {
    if (!currentProblem) return;

    currentLanguage = lang;

    elements.langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    if (lang === 'python') {
        editor.setOption('mode', 'python');
        editor.setValue(currentProblem?.python_code || '# No Python code available');
    } else {
        editor.setOption('mode', 'go');
        editor.setValue(currentProblem?.golang_code || '// No Go code available');
    }
}

// Hints
function toggleHints() {
    hintsVisible = !hintsVisible;
    elements.hintToggle.classList.toggle('active', hintsVisible);

    const details = elements.problemDescription.querySelectorAll('details');
    details.forEach(d => {
        if (hintsVisible) {
            d.setAttribute('open', '');
        } else {
            d.removeAttribute('open');
        }
    });
}

// Code execution
async function runCode() {
    const code = editor.getValue();

    elements.runBtn.classList.add('running');
    elements.runBtn.innerHTML = `
        <svg class="spinner" viewBox="0 0 24 24" style="width:18px;height:18px;animation:spin 0.8s linear infinite">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="30 60"/>
        </svg>
        <span>Running...</span>
    `;

    elements.terminalContent.innerHTML = '<span class="terminal-prompt">$</span> Executing code...\n';

    // Switch to output tab on mobile
    if (window.innerWidth < 768) {
        switchTab('output');
    }

    try {
        const response = await fetch('/api/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, language: currentLanguage })
        });

        const result = await response.json();
        displayOutput(result);
    } catch (error) {
        elements.terminalContent.innerHTML = `<span class="terminal-error">Error: ${escapeHtml(error.message)}</span>`;
    } finally {
        elements.runBtn.classList.remove('running');
        elements.runBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>Run Code</span>
        `;
    }
}

function displayOutput(result) {
    const cmd = currentLanguage === 'python' ? 'python3 code.py' : 'go run main.go';
    let output = `<span class="terminal-prompt">$</span> ${cmd}\n`;

    if (result.success) {
        output += escapeHtml(result.output || '(no output)');
        output += `\n\n<span class="terminal-success">✓ Process exited with code ${result.return_code}</span>`;
    } else {
        output += `<span class="terminal-error">${escapeHtml(result.output || result.error || 'Unknown error')}</span>`;
        output += `\n\n<span class="terminal-error">✗ Process exited with code ${result.return_code}</span>`;
    }

    elements.terminalContent.innerHTML = output;
}

function resetCode() {
    if (!currentProblem) return;

    if (currentLanguage === 'python') {
        editor.setValue(currentProblem.python_code || '');
    } else {
        editor.setValue(currentProblem.golang_code || '');
    }
}

function clearOutput() {
    elements.terminalContent.innerHTML = '<span class="terminal-prompt">$</span> Click "Run Code" to execute...';
}

// Utilities
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function handleKeyboard(e) {
    // Ctrl/Cmd + Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
    }

    // Escape to close sidebar
    if (e.key === 'Escape' && elements.sidebar.classList.contains('active')) {
        closeSidebar();
    }
}

function handleResize() {
    if (window.innerWidth >= 768) {
        closeSidebar();
    }
}
