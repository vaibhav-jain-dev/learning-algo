/**
 * Dashboard - ADHD-Friendly Learning Interface
 *
 * Design principles:
 * - Progressive disclosure (expand when ready)
 * - Visual chunks (not walls of text)
 * - Clear navigation and progress
 * - Calming colors and animations
 */

// ==================== PAGE NAVIGATION ====================
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Show target page
    switch (page) {
        case 'home':
            document.getElementById('landingPage').classList.add('active');
            break;
        case 'system-design':
            document.getElementById('systemDesignPage').classList.add('active');
            initSystemDesignPage();
            break;
        case 'basic-problems':
            document.getElementById('basicProblemsPage').classList.add('active');
            initBasicProblemsPage();
            break;
        case 'complex-problems':
            document.getElementById('complexProblemsPage').classList.add('active');
            initComplexProblemsPage();
            break;
        case 'practice':
            document.getElementById('practicePage').classList.add('active');
            initPracticePage();
            break;
    }

    // Update URL hash
    window.location.hash = page;
}

// Handle browser back/forward
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1) || 'home';
    navigateTo(hash);
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.slice(1) || 'home';
    navigateTo(hash);
});

// ==================== SYSTEM DESIGN PAGE ====================
function initSystemDesignPage() {
    const nav = document.getElementById('sdTopicNav');
    const search = document.getElementById('sdSearch');

    // Group topics by category
    const categories = {};
    SYSTEM_DESIGN_TOPICS.forEach(topic => {
        if (!categories[topic.category]) {
            categories[topic.category] = [];
        }
        categories[topic.category].push(topic);
    });

    // Render navigation
    nav.innerHTML = '';
    Object.entries(categories).forEach(([category, topics]) => {
        nav.innerHTML += `<div class="topic-category">${category}</div>`;
        topics.forEach(topic => {
            nav.innerHTML += `
                <div class="topic-item" data-id="${topic.id}" onclick="showSystemDesignTopic('${topic.id}')">
                    <span class="topic-icon">${topic.icon}</span>
                    <span>${topic.title}</span>
                </div>
            `;
        });
    });

    // Search functionality
    search.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('#sdTopicNav .topic-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? '' : 'none';
        });
        // Show all categories that have visible items
        document.querySelectorAll('#sdTopicNav .topic-category').forEach(cat => {
            const next = cat.nextElementSibling;
            let hasVisible = false;
            let sibling = next;
            while (sibling && !sibling.classList.contains('topic-category')) {
                if (sibling.style.display !== 'none') hasVisible = true;
                sibling = sibling.nextElementSibling;
            }
            cat.style.display = hasVisible ? '' : 'none';
        });
    });
}

function showSystemDesignTopic(topicId) {
    const topic = SYSTEM_DESIGN_TOPICS.find(t => t.id === topicId);
    if (!topic) return;

    // Update active state
    document.querySelectorAll('#sdTopicNav .topic-item').forEach(item => {
        item.classList.toggle('active', item.dataset.id === topicId);
    });

    // Render topic content
    const content = document.getElementById('sdContent');
    content.innerHTML = renderSystemDesignTopic(topic);

    // Bind expand/collapse handlers
    bindExpandHandlers(content);

    // Scroll to top
    document.getElementById('sdMain').scrollTop = 0;

    // Close sidebar on mobile
    if (window.innerWidth < 768) {
        document.getElementById('sdSidebar').classList.remove('active');
    }
}

function renderSystemDesignTopic(topic) {
    let html = `
        <div class="topic-header">
            <h1>${topic.icon} ${topic.title}</h1>
            <div class="topic-meta">
                <span class="difficulty-badge ${topic.difficulty}">${topic.difficulty}</span>
            </div>
        </div>

        <!-- TL;DR Box - Always visible, calming green -->
        <div class="tldr-box">
            <div class="tldr-label">⚡ TL;DR</div>
            <p>${topic.tldr}</p>
        </div>

        <!-- Imagine Box - Visual analogy -->
        <div class="imagine-box">
            <div class="imagine-label">💭 Imagine This...</div>
            <p>${topic.imagine.replace(/\n/g, '<br>')}</p>
        </div>
    `;

    // Render sections
    topic.sections.forEach((section, idx) => {
        html += renderSection(section, idx);
    });

    // Related topics
    if (topic.relatedTopics && topic.relatedTopics.length > 0) {
        html += `
            <div class="related-topics">
                <h3>🔗 Related Topics</h3>
                <div class="related-links">
                    ${topic.relatedTopics.map(id => {
                        const related = SYSTEM_DESIGN_TOPICS.find(t => t.id === id);
                        return related ? `
                            <button class="related-link" onclick="showSystemDesignTopic('${id}')">
                                ${related.icon} ${related.title}
                            </button>
                        ` : '';
                    }).join('')}
                </div>
            </div>
        `;
    }

    return html;
}

function renderSection(section, idx) {
    const isCollapsed = section.collapsed !== false;
    const collapseClass = isCollapsed ? 'collapsed' : 'expanded';

    let content = '';

    switch (section.type) {
        case 'whatif':
            content = renderWhatIfSection(section);
            break;
        case 'examples':
            content = `<div class="examples-content">${formatContent(section.content)}</div>`;
            break;
        case 'tradeoffs':
            content = renderTradeoffsSection(section);
            break;
        case 'diagram':
            content = `<div class="diagram-box"><pre>${section.content}</pre></div>`;
            break;
        default:
            content = `<div class="section-content">${formatContent(section.content)}</div>`;
    }

    return `
        <div class="topic-section ${collapseClass}" data-section="${idx}">
            <div class="section-header" onclick="toggleSection(this)">
                <span class="section-icon">${getSectionIcon(section.type)}</span>
                <h2>${section.title}</h2>
                <span class="expand-icon">${isCollapsed ? '▶' : '▼'}</span>
            </div>
            <div class="section-body">
                ${content}
            </div>
        </div>
    `;
}

function renderWhatIfSection(section) {
    return `
        <div class="whatif-container">
            ${section.items.map((item, idx) => `
                <div class="whatif-item" data-idx="${idx}">
                    <div class="whatif-question" onclick="toggleWhatIf(this)">
                        <span class="whatif-icon">🤔</span>
                        <span>${item.question}</span>
                        <span class="whatif-expand">+</span>
                    </div>
                    <div class="whatif-answer">
                        ${formatContent(item.answer)}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderTradeoffsSection(section) {
    return `
        <div class="tradeoffs-grid">
            <div class="pros-box">
                <h4>✅ Pros</h4>
                <ul>
                    ${section.pros.map(pro => `<li>${pro}</li>`).join('')}
                </ul>
            </div>
            <div class="cons-box">
                <h4>❌ Cons</h4>
                <ul>
                    ${section.cons.map(con => `<li>${con}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function getSectionIcon(type) {
    const icons = {
        'whatif': '🤔',
        'examples': '🌍',
        'tradeoffs': '⚖️',
        'diagram': '📊',
        'default': '📖'
    };
    return icons[type] || icons.default;
}

// ==================== BASIC PROBLEMS PAGE ====================
function initBasicProblemsPage() {
    const nav = document.getElementById('bpTopicNav');
    const search = document.getElementById('bpSearch');

    // Group by category
    const categories = {};
    BASIC_PROBLEMS.forEach(problem => {
        if (!categories[problem.category]) {
            categories[problem.category] = [];
        }
        categories[problem.category].push(problem);
    });

    // Render navigation
    nav.innerHTML = '';
    Object.entries(categories).forEach(([category, problems]) => {
        nav.innerHTML += `<div class="topic-category">${category}</div>`;
        problems.forEach(problem => {
            nav.innerHTML += `
                <div class="topic-item" data-id="${problem.id}" onclick="showBasicProblem('${problem.id}')">
                    <span class="topic-icon">${problem.icon}</span>
                    <span>${problem.title}</span>
                    <span class="difficulty-tag ${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
                </div>
            `;
        });
    });

    // Search
    search.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('#bpTopicNav .topic-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? '' : 'none';
        });
    });
}

function showBasicProblem(problemId) {
    const problem = BASIC_PROBLEMS.find(p => p.id === problemId);
    if (!problem) return;

    // Update active state
    document.querySelectorAll('#bpTopicNav .topic-item').forEach(item => {
        item.classList.toggle('active', item.dataset.id === problemId);
    });

    const content = document.getElementById('bpContent');
    content.innerHTML = renderBasicProblem(problem);
    bindExpandHandlers(content);

    document.getElementById('bpMain').scrollTop = 0;

    if (window.innerWidth < 768) {
        document.getElementById('bpSidebar').classList.remove('active');
    }
}

function renderBasicProblem(problem) {
    let html = `
        <div class="topic-header">
            <h1>${problem.icon} ${problem.title}</h1>
            <div class="topic-meta">
                <span class="difficulty-badge ${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
                <span class="category-badge">${problem.category}</span>
            </div>
        </div>

        <!-- TL;DR -->
        <div class="tldr-box">
            <div class="tldr-label">⚡ TL;DR</div>
            <p>${problem.tldr}</p>
        </div>

        <!-- Problem Statement -->
        <div class="problem-statement">
            <h2>📋 Problem</h2>
            <div class="problem-text">${formatContent(problem.problem)}</div>
        </div>

        <!-- Intuition Box -->
        <div class="imagine-box">
            <div class="imagine-label">💡 Intuition</div>
            <p>${problem.intuition.replace(/\n/g, '<br>')}</p>
        </div>

        <!-- Solutions - 3 approaches -->
        <div class="solutions-section">
            <h2>🛠️ Solutions (3 Approaches)</h2>
            <p class="solutions-intro">Click each solution to expand. Compare trade-offs to pick the right one.</p>

            ${problem.solutions.map((sol, idx) => renderSolution(sol, idx)).join('')}
        </div>

        <!-- Follow-up Questions -->
        ${problem.followUp ? `
            <div class="followup-section">
                <h2>🎯 Follow-up Questions</h2>
                <ul class="followup-list">
                    ${problem.followUp.map(q => `<li>${q}</li>`).join('')}
                </ul>
            </div>
        ` : ''}
    `;

    return html;
}

function renderSolution(solution, idx) {
    const colors = ['solution-green', 'solution-yellow', 'solution-blue'];
    const labels = ['Approach 1', 'Approach 2', 'Approach 3'];

    return `
        <div class="solution-card ${colors[idx]}" data-solution="${idx}">
            <div class="solution-header" onclick="toggleSolution(this)">
                <span class="solution-number">${idx + 1}</span>
                <div class="solution-meta">
                    <span class="solution-name">${solution.name}</span>
                    <span class="solution-complexity">${solution.complexity}</span>
                </div>
                <span class="solution-expand">▶</span>
            </div>
            <div class="solution-body">
                <!-- Approach -->
                <div class="approach-box">
                    <h4>💭 Approach</h4>
                    <p>${solution.approach}</p>
                </div>

                <!-- Code -->
                <div class="code-block">
                    <div class="code-header">
                        <span>Python</span>
                        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                    </div>
                    <pre><code>${escapeHtml(solution.code)}</code></pre>
                </div>

                <!-- Pros & Cons with details -->
                <div class="pros-cons-detailed">
                    <div class="pros-detailed">
                        <h4>✅ Pros</h4>
                        <ul>
                            ${solution.pros.map(pro => `
                                <li>
                                    <strong>${pro}</strong>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="cons-detailed">
                        <h4>❌ Cons</h4>
                        <ul>
                            ${solution.cons.map(con => `
                                <li>
                                    <strong>${con}</strong>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>

                <!-- When to Use -->
                <div class="when-to-use">
                    <h4>🎯 When to Use</h4>
                    <p>${solution.whenToUse}</p>
                </div>
            </div>
        </div>
    `;
}

// ==================== COMPLEX PROBLEMS PAGE ====================
function initComplexProblemsPage() {
    const nav = document.getElementById('cpTopicNav');
    const search = document.getElementById('cpSearch');

    // Group by category
    const categories = {};
    COMPLEX_PROBLEMS.forEach(problem => {
        if (!categories[problem.category]) {
            categories[problem.category] = [];
        }
        categories[problem.category].push(problem);
    });

    // Render navigation
    nav.innerHTML = '';
    Object.entries(categories).forEach(([category, problems]) => {
        nav.innerHTML += `<div class="topic-category">${category}</div>`;
        problems.forEach(problem => {
            nav.innerHTML += `
                <div class="topic-item" data-id="${problem.id}" onclick="showComplexProblem('${problem.id}')">
                    <span class="topic-icon">${problem.icon}</span>
                    <span>${problem.title}</span>
                </div>
            `;
        });
    });

    // Search
    search.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('#cpTopicNav .topic-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? '' : 'none';
        });
    });
}

function showComplexProblem(problemId) {
    const problem = COMPLEX_PROBLEMS.find(p => p.id === problemId);
    if (!problem) return;

    document.querySelectorAll('#cpTopicNav .topic-item').forEach(item => {
        item.classList.toggle('active', item.dataset.id === problemId);
    });

    const content = document.getElementById('cpContent');
    content.innerHTML = renderComplexProblem(problem);
    bindExpandHandlers(content);

    document.getElementById('cpMain').scrollTop = 0;

    if (window.innerWidth < 768) {
        document.getElementById('cpSidebar').classList.remove('active');
    }
}

function renderComplexProblem(problem) {
    return `
        <div class="topic-header">
            <h1>${problem.icon} ${problem.title}</h1>
            <div class="topic-meta">
                <span class="difficulty-badge hard">${problem.difficulty}</span>
                <span class="category-badge">${problem.category}</span>
                <span class="source-badge">📍 ${problem.source}</span>
            </div>
        </div>

        <!-- TL;DR -->
        <div class="tldr-box">
            <div class="tldr-label">⚡ TL;DR</div>
            <p>${problem.tldr}</p>
        </div>

        <!-- Problem -->
        <div class="problem-statement">
            <h2>📋 Problem</h2>
            <div class="problem-text">${formatContent(problem.problem)}</div>
        </div>

        <!-- Approach -->
        <div class="topic-section expanded">
            <div class="section-header">
                <span class="section-icon">💡</span>
                <h2>Approach</h2>
            </div>
            <div class="section-body">
                ${formatContent(problem.approach)}
            </div>
        </div>

        <!-- Code -->
        <div class="topic-section expanded">
            <div class="section-header">
                <span class="section-icon">💻</span>
                <h2>Solution Code</h2>
            </div>
            <div class="section-body">
                <div class="code-block">
                    <div class="code-header">
                        <span>Python</span>
                        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                    </div>
                    <pre><code>${escapeHtml(problem.code)}</code></pre>
                </div>
                <div class="complexity-badge">
                    <strong>Complexity:</strong> ${problem.complexity}
                </div>
            </div>
        </div>

        <!-- Optimization / Alternatives -->
        ${problem.optimization ? `
            <div class="topic-section collapsed">
                <div class="section-header" onclick="toggleSection(this)">
                    <span class="section-icon">🚀</span>
                    <h2>Optimizations</h2>
                    <span class="expand-icon">▶</span>
                </div>
                <div class="section-body">
                    ${formatContent(problem.optimization)}
                </div>
            </div>
        ` : ''}

        ${problem.alternatives ? `
            <div class="topic-section collapsed">
                <div class="section-header" onclick="toggleSection(this)">
                    <span class="section-icon">🔄</span>
                    <h2>Alternative Approaches</h2>
                    <span class="expand-icon">▶</span>
                </div>
                <div class="section-body">
                    ${formatContent(problem.alternatives)}
                </div>
            </div>
        ` : ''}

        ${problem.scaleUp ? `
            <div class="topic-section collapsed">
                <div class="section-header" onclick="toggleSection(this)">
                    <span class="section-icon">📈</span>
                    <h2>Scaling Up</h2>
                    <span class="expand-icon">▶</span>
                </div>
                <div class="section-body">
                    ${formatContent(problem.scaleUp)}
                </div>
            </div>
        ` : ''}

        ${problem.intuition ? `
            <div class="imagine-box">
                <div class="imagine-label">💭 Intuition</div>
                <p>${problem.intuition.replace(/\n/g, '<br>')}</p>
            </div>
        ` : ''}

        <!-- Follow-up -->
        ${problem.followUp ? `
            <div class="followup-section">
                <h2>🎯 Follow-up Questions</h2>
                <ul class="followup-list">
                    ${problem.followUp.map(q => `<li>${q}</li>`).join('')}
                </ul>
            </div>
        ` : ''}
    `;
}

// ==================== PRACTICE PAGE (Original) ====================
function initPracticePage() {
    // The original app.js handles this
    if (typeof loadProblems === 'function') {
        loadProblems();
    }
}

// ==================== BRAIN DIAGRAM ====================
function toggleBrainDiagram() {
    const modal = document.getElementById('brainModal');
    modal.classList.toggle('active');

    if (modal.classList.contains('active')) {
        renderBrainDiagram();
    }
}

function renderBrainDiagram() {
    const diagram = document.getElementById('brainDiagram');

    // Simple relationship visualization
    const nodes = [
        { id: 'scalability', label: 'Scalability', x: 50, y: 50, central: true },
        { id: 'load-balancing', label: 'Load Balancing', x: 20, y: 30 },
        { id: 'caching', label: 'Caching', x: 80, y: 30 },
        { id: 'database-design', label: 'Databases', x: 50, y: 80 },
        { id: 'database-sharding', label: 'Sharding', x: 20, y: 70 },
        { id: 'message-queues', label: 'Queues', x: 80, y: 70 },
        { id: 'microservices', label: 'Microservices', x: 35, y: 50 },
        { id: 'high-availability', label: 'High Availability', x: 65, y: 50 }
    ];

    diagram.innerHTML = nodes.map(node => `
        <div class="brain-node ${node.central ? 'central' : ''}"
             style="left: ${node.x}%; top: ${node.y}%"
             onclick="navigateToBrainTopic('${node.id}')">
            ${node.label}
        </div>
    `).join('');
}

function navigateToBrainTopic(topicId) {
    toggleBrainDiagram();
    showSystemDesignTopic(topicId);
}

// ==================== UTILITY FUNCTIONS ====================
function toggleSection(header) {
    const section = header.closest('.topic-section');
    const isCollapsed = section.classList.contains('collapsed');

    section.classList.toggle('collapsed', !isCollapsed);
    section.classList.toggle('expanded', isCollapsed);

    const icon = header.querySelector('.expand-icon');
    if (icon) {
        icon.textContent = isCollapsed ? '▼' : '▶';
    }
}

function toggleWhatIf(questionEl) {
    const item = questionEl.closest('.whatif-item');
    item.classList.toggle('expanded');

    const icon = questionEl.querySelector('.whatif-expand');
    icon.textContent = item.classList.contains('expanded') ? '−' : '+';
}

function toggleSolution(header) {
    const card = header.closest('.solution-card');
    card.classList.toggle('expanded');

    const icon = header.querySelector('.solution-expand');
    icon.textContent = card.classList.contains('expanded') ? '▼' : '▶';
}

function bindExpandHandlers(container) {
    // Solutions auto-expand first one
    const firstSolution = container.querySelector('.solution-card');
    if (firstSolution) {
        firstSolution.classList.add('expanded');
        const icon = firstSolution.querySelector('.solution-expand');
        if (icon) icon.textContent = '▼';
    }
}

function formatContent(text) {
    if (!text) return '';

    // Convert markdown-like syntax
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre><code>$2</code></pre>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n- /g, '</p><ul><li>')
        .replace(/\n• /g, '</p><ul><li>')
        .replace(/<\/li>\n/g, '</li>')
        .split('\n').join('<br>');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function copyCode(btn) {
    const code = btn.closest('.code-block').querySelector('code').textContent;
    navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy', 2000);
    });
}

// Mobile sidebar toggle
document.addEventListener('click', (e) => {
    if (e.target.closest('.dash-header .back-btn')) return;

    // Toggle sidebar on mobile when clicking menu area
    if (window.innerWidth < 768) {
        const sidebar = document.querySelector('.dashboard-page.active .dash-sidebar');
        if (sidebar && !sidebar.contains(e.target) && !e.target.closest('.topic-item')) {
            // Don't close if clicking content
        }
    }
});

// ==================== ADDITIONAL STYLES (injected) ====================
const additionalStyles = `
<style>
/* TL;DR Box */
.tldr-box {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 24px;
}

.tldr-label {
    font-weight: 700;
    color: #10b981;
    margin-bottom: 8px;
    font-size: 0.9rem;
}

.tldr-box p {
    margin: 0;
    line-height: 1.6;
    color: var(--text-primary);
}

/* Imagine Box */
.imagine-box {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05));
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 24px;
}

.imagine-label {
    font-weight: 700;
    color: #8b5cf6;
    margin-bottom: 8px;
    font-size: 0.9rem;
}

.imagine-box p {
    margin: 0;
    line-height: 1.8;
    color: var(--text-secondary);
    font-style: italic;
}

/* Sections */
.topic-section {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    margin-bottom: 16px;
    overflow: hidden;
}

.section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    cursor: pointer;
    transition: background 0.2s;
}

.section-header:hover {
    background: var(--bg-tertiary);
}

.section-icon {
    font-size: 1.2rem;
}

.section-header h2 {
    flex: 1;
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
}

.expand-icon {
    color: var(--text-muted);
    font-size: 0.8rem;
}

.section-body {
    padding: 0 20px 20px;
    display: none;
}

.topic-section.expanded .section-body {
    display: block;
}

.topic-section.collapsed .section-body {
    display: none;
}

/* What-If Sections */
.whatif-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.whatif-item {
    background: var(--bg-secondary);
    border-radius: 8px;
    overflow: hidden;
}

.whatif-question {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    cursor: pointer;
    transition: background 0.2s;
}

.whatif-question:hover {
    background: var(--bg-tertiary);
}

.whatif-icon {
    font-size: 1.1rem;
}

.whatif-question span:nth-child(2) {
    flex: 1;
    font-weight: 500;
}

.whatif-expand {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-primary);
    border-radius: 50%;
    font-weight: bold;
    color: var(--text-muted);
}

.whatif-answer {
    padding: 0 16px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s, padding 0.3s;
}

.whatif-item.expanded .whatif-answer {
    padding: 16px;
    max-height: 500px;
}

.whatif-answer p {
    margin: 0;
    line-height: 1.7;
    color: var(--text-secondary);
}

/* Trade-offs Grid */
.tradeoffs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.pros-box, .cons-box {
    padding: 16px;
    border-radius: 8px;
}

.pros-box {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
}

.cons-box {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
}

.pros-box h4 { color: #10b981; }
.cons-box h4 { color: #ef4444; }

.tradeoffs-grid ul {
    margin: 12px 0 0;
    padding-left: 20px;
}

.tradeoffs-grid li {
    margin-bottom: 8px;
    line-height: 1.5;
}

/* Solution Cards */
.solution-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    margin-bottom: 16px;
    overflow: hidden;
}

.solution-card.solution-green { border-left: 4px solid #10b981; }
.solution-card.solution-yellow { border-left: 4px solid #f59e0b; }
.solution-card.solution-blue { border-left: 4px solid #6366f1; }

.solution-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    cursor: pointer;
    background: var(--bg-secondary);
}

.solution-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: white;
}

.solution-green .solution-number { background: #10b981; }
.solution-yellow .solution-number { background: #f59e0b; }
.solution-blue .solution-number { background: #6366f1; }

.solution-meta {
    flex: 1;
}

.solution-name {
    display: block;
    font-weight: 600;
}

.solution-complexity {
    font-size: 0.85rem;
    color: var(--text-muted);
    font-family: 'JetBrains Mono', monospace;
}

.solution-expand {
    color: var(--text-muted);
}

.solution-body {
    padding: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s;
}

.solution-card.expanded .solution-body {
    padding: 20px;
    max-height: 2000px;
}

.approach-box {
    background: var(--bg-secondary);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
}

.approach-box h4 {
    margin: 0 0 8px;
    color: var(--accent-primary);
}

.approach-box p {
    margin: 0;
    line-height: 1.6;
}

.pros-cons-detailed {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin: 16px 0;
}

.pros-detailed, .cons-detailed {
    padding: 16px;
    border-radius: 8px;
}

.pros-detailed {
    background: rgba(16, 185, 129, 0.1);
}

.cons-detailed {
    background: rgba(239, 68, 68, 0.1);
}

.pros-detailed h4 { color: #10b981; margin: 0 0 12px; }
.cons-detailed h4 { color: #ef4444; margin: 0 0 12px; }

.pros-detailed ul, .cons-detailed ul {
    margin: 0;
    padding-left: 20px;
}

.pros-detailed li, .cons-detailed li {
    margin-bottom: 8px;
}

.when-to-use {
    background: rgba(99, 102, 241, 0.1);
    padding: 16px;
    border-radius: 8px;
    border: 1px solid rgba(99, 102, 241, 0.3);
}

.when-to-use h4 {
    color: #6366f1;
    margin: 0 0 8px;
}

.when-to-use p {
    margin: 0;
    line-height: 1.6;
}

/* Problem Statement */
.problem-statement {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 24px;
}

.problem-statement h2 {
    margin: 0 0 16px;
    color: var(--accent-primary);
}

.problem-text {
    line-height: 1.7;
}

.problem-text code {
    background: var(--bg-tertiary);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9em;
}

/* Code Block */
.code-block {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
    margin: 16px 0;
}

.code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    background: var(--bg-tertiary);
    border-bottom: 1px solid var(--border-color);
    font-size: 0.85rem;
    color: var(--text-muted);
}

.copy-btn {
    padding: 4px 12px;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 0.8rem;
}

.copy-btn:hover {
    background: var(--accent-primary);
    color: white;
}

.code-block pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;
}

.code-block code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    line-height: 1.6;
}

/* Complexity Badge */
.complexity-badge {
    display: inline-block;
    padding: 8px 16px;
    background: var(--bg-tertiary);
    border-radius: 8px;
    font-size: 0.9rem;
    margin-top: 12px;
}

/* Follow-up Section */
.followup-section {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
    margin-top: 24px;
}

.followup-section h2 {
    margin: 0 0 16px;
    color: var(--accent-secondary);
}

.followup-list {
    margin: 0;
    padding-left: 24px;
}

.followup-list li {
    margin-bottom: 10px;
    line-height: 1.6;
    color: var(--text-secondary);
}

/* Related Topics */
.related-topics {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid var(--border-color);
}

.related-topics h3 {
    margin: 0 0 16px;
    color: var(--text-muted);
}

.related-links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.related-link {
    padding: 10px 16px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s;
}

.related-link:hover {
    background: var(--accent-primary);
    color: white;
    border-color: var(--accent-primary);
}

/* Difficulty Badges */
.difficulty-badge {
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
}

.difficulty-badge.beginner, .difficulty-badge.easy {
    background: rgba(16, 185, 129, 0.2);
    color: #10b981;
}

.difficulty-badge.intermediate, .difficulty-badge.medium {
    background: rgba(245, 158, 11, 0.2);
    color: #f59e0b;
}

.difficulty-badge.advanced, .difficulty-badge.hard {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
}

.category-badge {
    padding: 4px 10px;
    background: var(--bg-tertiary);
    border-radius: 12px;
    font-size: 0.75rem;
    color: var(--text-muted);
}

.source-badge {
    font-size: 0.85rem;
    color: var(--text-muted);
}

.difficulty-tag {
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.7rem;
    margin-left: auto;
}

.difficulty-tag.easy { background: rgba(16, 185, 129, 0.2); color: #10b981; }
.difficulty-tag.medium { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
.difficulty-tag.hard { background: rgba(239, 68, 68, 0.2); color: #ef4444; }

/* Mobile Responsive */
@media (max-width: 768px) {
    .tradeoffs-grid,
    .pros-cons-detailed {
        grid-template-columns: 1fr;
    }

    .solution-header {
        flex-wrap: wrap;
    }

    .solution-meta {
        order: 3;
        width: 100%;
        margin-top: 8px;
    }

    .brain-node {
        font-size: 0.75rem;
        padding: 8px 12px;
    }
}

/* Smooth scroll */
.dash-main {
    scroll-behavior: smooth;
}

/* Print styles */
@media print {
    .section-body {
        display: block !important;
        max-height: none !important;
    }

    .expand-icon,
    .copy-btn,
    .back-btn,
    .brain-btn {
        display: none !important;
    }
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Make functions globally available
window.navigateTo = navigateTo;
window.showSystemDesignTopic = showSystemDesignTopic;
window.showBasicProblem = showBasicProblem;
window.showComplexProblem = showComplexProblem;
window.toggleBrainDiagram = toggleBrainDiagram;
window.toggleSection = toggleSection;
window.toggleWhatIf = toggleWhatIf;
window.toggleSolution = toggleSolution;
window.copyCode = copyCode;
