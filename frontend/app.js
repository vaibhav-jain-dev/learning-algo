// DS/Algo Learning Platform - Frontend Application

let editor = null;
let currentProblem = null;
let currentLanguage = 'python';
let hintsVisible = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initEditor();
    loadProblems();
    setupSearch();
});

// Initialize CodeMirror editor
function initEditor() {
    editor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
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

// Load problems from API
async function loadProblems() {
    try {
        const response = await fetch('/api/problems');
        const problems = await response.json();
        renderProblemTree(problems);
    } catch (error) {
        console.error('Failed to load problems:', error);
        document.getElementById('problemTree').innerHTML =
            '<div class="loading">Failed to load problems. Please refresh.</div>';
    }
}

// Render the problem tree in sidebar
function renderProblemTree(items, container = null) {
    if (!container) {
        container = document.getElementById('problemTree');
        container.innerHTML = '';
    }

    items.forEach(item => {
        if (item.type === 'category') {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'tree-category';

            const header = document.createElement('div');
            header.className = 'category-header';
            header.innerHTML = `<span class="arrow">▶</span>${item.name}`;
            header.onclick = () => toggleCategory(header);

            const children = document.createElement('div');
            children.className = 'category-children';

            if (item.children && item.children.length > 0) {
                renderProblemTree(item.children, children);
            }

            categoryDiv.appendChild(header);
            categoryDiv.appendChild(children);
            container.appendChild(categoryDiv);
        } else if (item.type === 'problem') {
            const problemDiv = document.createElement('div');
            problemDiv.className = 'problem-item';
            problemDiv.textContent = item.name;
            problemDiv.dataset.path = item.path;
            problemDiv.onclick = () => loadProblem(item.path, problemDiv);
            container.appendChild(problemDiv);
        }
    });
}

// Toggle category expansion
function toggleCategory(header) {
    header.classList.toggle('expanded');
    const children = header.nextElementSibling;
    children.classList.toggle('expanded');
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.problem-item');
        const categories = document.querySelectorAll('.tree-category');

        items.forEach(item => {
            const match = item.textContent.toLowerCase().includes(query);
            item.style.display = match ? 'block' : 'none';
        });

        // Show/hide categories based on visible children
        categories.forEach(cat => {
            const visibleChildren = cat.querySelectorAll('.problem-item[style="display: block"], .problem-item:not([style])');
            const hasVisible = Array.from(visibleChildren).some(child =>
                child.style.display !== 'none'
            );

            if (query) {
                // Expand all categories during search
                cat.querySelector('.category-header').classList.add('expanded');
                cat.querySelector('.category-children').classList.add('expanded');
            }
        });
    });
}

// Load a specific problem
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

// Display problem content
function displayProblem(problem, path) {
    // Hide welcome screen, show problem view
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('problemView').style.display = 'flex';

    // Set title and breadcrumb
    const parts = path.split('/');
    const title = parts[parts.length - 1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    document.getElementById('problemTitle').textContent = title;

    const breadcrumb = parts.slice(0, -1).map(p =>
        p.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    ).join(' <span>›</span> ');
    document.getElementById('breadcrumb').innerHTML = breadcrumb;

    // Set problem description
    document.getElementById('problemDescription').innerHTML = problem.content_html ||
        '<p>No description available.</p>';

    // Update language buttons
    const pythonBtn = document.querySelector('[data-lang="python"]');
    const golangBtn = document.querySelector('[data-lang="golang"]');

    pythonBtn.disabled = !problem.has_python;
    golangBtn.disabled = !problem.has_golang;

    // Set initial language and code
    if (problem.has_python) {
        switchLanguage('python');
    } else if (problem.has_golang) {
        switchLanguage('golang');
    }

    // Reset hints
    hintsVisible = false;
    document.getElementById('hintBtn').classList.remove('active');
    document.getElementById('hintBtn').textContent = '💡 Show Hints';

    // Clear output
    clearOutput();
}

// Switch programming language
function switchLanguage(lang) {
    currentLanguage = lang;

    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update editor mode and content
    if (lang === 'python') {
        editor.setOption('mode', 'python');
        editor.setValue(currentProblem?.python_code || '# No Python code available');
    } else if (lang === 'golang') {
        editor.setOption('mode', 'go');
        editor.setValue(currentProblem?.golang_code || '// No Go code available');
    }
}

// Toggle hints visibility
function toggleHints() {
    hintsVisible = !hintsVisible;
    const hintBtn = document.getElementById('hintBtn');

    // Find hints section in the rendered HTML
    const hintsSection = document.querySelector('.hints-section');
    if (hintsSection) {
        hintsSection.classList.toggle('visible', hintsVisible);
    }

    // Also toggle any elements with class containing 'hint'
    const hintElements = document.querySelectorAll('[class*="hint"], .hint, #hints');
    hintElements.forEach(el => {
        if (el !== hintBtn) {
            el.style.display = hintsVisible ? 'block' : 'none';
        }
    });

    // Find details elements that might contain hints
    const details = document.querySelectorAll('details');
    details.forEach(d => {
        if (hintsVisible) {
            d.setAttribute('open', '');
        } else {
            d.removeAttribute('open');
        }
    });

    hintBtn.classList.toggle('active', hintsVisible);
    hintBtn.textContent = hintsVisible ? '💡 Hide Hints' : '💡 Show Hints';
}

// Run code
async function runCode() {
    const code = editor.getValue();
    const runBtn = document.querySelector('.run-btn');
    const terminal = document.getElementById('terminalContent');

    // Show running state
    runBtn.classList.add('running');
    runBtn.textContent = '⏳ Running...';

    terminal.innerHTML = '<span class="terminal-prompt">$</span> Executing code...\n';

    try {
        const response = await fetch('/api/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
                language: currentLanguage
            })
        });

        const result = await response.json();

        let output = '';
        if (result.success) {
            output = `<span class="terminal-prompt">$</span> ${currentLanguage === 'python' ? 'python3' : 'go run'} code.${currentLanguage === 'python' ? 'py' : 'go'}\n`;
            output += `<span class="terminal-output">${escapeHtml(result.output || '(no output)')}</span>\n`;
            output += `<span class="terminal-success">✓ Process exited with code ${result.return_code}</span>`;
        } else {
            output = `<span class="terminal-prompt">$</span> ${currentLanguage === 'python' ? 'python3' : 'go run'} code.${currentLanguage === 'python' ? 'py' : 'go'}\n`;
            output += `<span class="terminal-error">${escapeHtml(result.output || result.error || 'Unknown error')}</span>\n`;
            output += `<span class="terminal-error">✗ Process exited with code ${result.return_code}</span>`;
        }

        terminal.innerHTML = output;
    } catch (error) {
        terminal.innerHTML = `<span class="terminal-error">Error: ${escapeHtml(error.message)}</span>`;
    } finally {
        runBtn.classList.remove('running');
        runBtn.textContent = '▶ Run Code';
    }
}

// Reset code to original
function resetCode() {
    if (currentProblem) {
        if (currentLanguage === 'python') {
            editor.setValue(currentProblem.python_code || '');
        } else {
            editor.setValue(currentProblem.golang_code || '');
        }
    }
}

// Clear output terminal
function clearOutput() {
    document.getElementById('terminalContent').innerHTML =
        '<span class="terminal-prompt">$</span> Click "Run Code" to execute...';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
    }
});
