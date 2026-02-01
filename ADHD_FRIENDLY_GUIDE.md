# ADHD-Friendly Content Layout System

## Overview

This system implements ADHD-optimized design patterns to reduce cognitive load, improve focus, and enhance the learning experience. The system automatically activates on all pages and provides interactive features like collapsible sections, progress tracking, and always-visible quick navigation.

---

## What's Been Implemented

### 1. **Automatic Features** (No code changes needed)

These features work automatically on all pages:

✅ **Auto-Generated Quick Navigation**
- Extracts all H2 and H3 headings
- Creates sticky sidebar with jump links
- Highlights current section as you scroll

✅ **Reading Progress Tracker**
- Shows percentage of page completed
- Sticky progress bar at top
- Helpful for long articles

✅ **Collapsible Sections**
- Sections with `collapsible-section` class can expand/collapse
- State persists in localStorage
- Reduces visual overwhelm

✅ **Focus Mode Toggle**
- Toggle button (when added) hides sidebars
- Distraction-free reading
- Preference saved in localStorage

✅ **Current Section Highlighting**
- IntersectionObserver tracks visible headings
- Active section highlighted in quick nav
- Visual feedback for location awareness

---

## How to Use ADHD-Friendly Patterns

### Pattern 1: Visual Chunking with Concept Sections

**Use Case:** Break up long content into digestible chunks with clear visual boundaries.

```html
<!-- Basic concept section -->
<div class="concept-section">
    <h3>Concept Title</h3>
    <p>Explanation of the concept...</p>
</div>

<!-- Color-coded by type -->
<div class="concept-section type-definition">
    <h3>What is a Binary Tree?</h3>
    <p>A hierarchical data structure...</p>
</div>

<div class="concept-section type-example">
    <h3>Example: Finding the Maximum</h3>
    <pre><code>...</code></pre>
</div>

<div class="concept-section type-warning">
    <h3>Common Pitfall</h3>
    <p>Be careful not to...</p>
</div>

<div class="concept-section type-important">
    <h3>Key Takeaway</h3>
    <p>Remember to always...</p>
</div>
```

**Color Scheme:**
- `type-definition` = Blue border (learning/theory)
- `type-example` = Green border (practice/examples)
- `type-warning` = Orange border (caution/pitfalls)
- `type-important` = Red border (critical concepts)

---

### Pattern 2: TL;DR Summary Boxes

**Use Case:** Provide quick summaries at the start of long sections.

```html
<div class="tldr-box">
    <div class="tldr-header">TL;DR</div>
    <ul class="tldr-list">
        <li>Graphs have nodes (vertices) and edges (connections)</li>
        <li>Can be directed or undirected</li>
        <li>Common representations: adjacency list, adjacency matrix</li>
        <li>Time complexity varies by representation</li>
    </ul>
</div>
```

**Result:** Blue gradient box with checkmarks, easy to scan.

---

### Pattern 3: Side-by-Side Code + Explanation

**Use Case:** Eliminate scrolling back and forth between code and explanation.

```html
<div class="code-with-explanation">
    <div class="explanation-panel">
        <h4>Explanation</h4>
        <p>This function performs a depth-first search by:</p>
        <ul>
            <li>Marking current node as visited</li>
            <li>Processing the node</li>
            <li>Recursively visiting neighbors</li>
        </ul>
    </div>

    <div class="code-panel">
        <pre><code class="language-python">
def dfs(node, visited):
    visited.add(node)
    process(node)
    for neighbor in node.neighbors:
        if neighbor not in visited:
            dfs(neighbor, visited)
        </code></pre>
    </div>
</div>
```

**Layout:**
- Desktop: Side-by-side (50/50)
- Mobile: Stacks vertically (explanation first)

---

### Pattern 4: Collapsible Sections

**Use Case:** Hide complex details until user is ready.

```html
<div class="collapsible-section" data-section-id="advanced-details">
    <div class="collapsible-header">
        <h3>Advanced Implementation Details</h3>
        <span class="collapsible-icon">▼</span>
    </div>
    <div class="collapsible-content">
        <p>Detailed explanation that might overwhelm beginners...</p>
        <pre><code>Complex code here...</code></pre>
    </div>
</div>
```

**Behavior:**
- Click header to expand/collapse
- Icon rotates (▼ → ▲)
- State saved in localStorage (persists across page reloads)
- Use `data-section-id` for unique identification

---

### Pattern 5: Sticky Quick Reference Panel

**Use Case:** Always-visible cheat sheet for key concepts.

```html
<div class="adhd-layout">
    <aside class="adhd-nav-panel">
        <!-- Left sidebar navigation -->
    </aside>

    <main class="adhd-main-content">
        <!-- Your main content here -->
    </main>

    <aside class="adhd-quick-ref">
        <div class="quick-ref-card">
            <div class="quick-ref-header">Quick Reference</div>
            <ul class="quick-ref-list">
                <li class="quick-ref-item">
                    <span class="quick-ref-key">DFS</span>
                    <span class="quick-ref-value">Depth-First Search - explores deep before wide</span>
                </li>
                <li class="quick-ref-item">
                    <span class="quick-ref-key">BFS</span>
                    <span class="quick-ref-value">Breadth-First Search - explores level by level</span>
                </li>
            </ul>
        </div>
    </aside>
</div>
```

**Auto-Generated Alternative:**
If you include `<aside class="adhd-quick-ref"></aside>` with no content, the JavaScript will automatically populate it with headings from your main content!

---

### Pattern 6: Step-by-Step Visual Flow

**Use Case:** Show algorithms as step-by-step processes.

```html
<div class="step-flow">
    <div class="step-item">
        <div class="step-number">1</div>
        <div class="step-content">
            <h4>Initialize</h4>
            <p>Create empty visited set and stack</p>
        </div>
    </div>

    <div class="step-item">
        <div class="step-number">2</div>
        <div class="step-content">
            <h4>Push Root</h4>
            <p>Add starting node to stack</p>
        </div>
    </div>

    <div class="step-item">
        <div class="step-number">3</div>
        <div class="step-content">
            <h4>Process</h4>
            <p>While stack not empty, pop and visit neighbors</p>
        </div>
    </div>
</div>
```

**Result:** Numbered steps with connecting lines (on desktop).

---

### Pattern 7: Comparison Tables

**Use Case:** Compare different approaches or algorithms.

```html
<div class="comparison-table-wrapper">
    <table class="comparison-table">
        <thead>
            <tr>
                <th>Aspect</th>
                <th class="comparison-col-a">Approach A</th>
                <th class="comparison-col-b">Approach B</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Time Complexity</strong></td>
                <td class="comparison-col-a">O(n log n)</td>
                <td class="comparison-col-b">O(n²)</td>
            </tr>
            <tr>
                <td><strong>Space Complexity</strong></td>
                <td class="comparison-col-a">O(n)</td>
                <td class="comparison-col-b">O(1)</td>
            </tr>
        </tbody>
    </table>
</div>
```

**Result:** Color-coded columns (blue vs green) for easy comparison.

---

## Layout Structure

### Desktop (1400px+)

```
┌────────────────────────────────────────────────────┐
│  Nav Panel  │    Main Content (800px)   │  Quick   │
│   (280px)   │                            │  Ref     │
│             │   Comfortable reading      │  (320px) │
│   Sticky    │   width, never too wide    │          │
│   sidebar   │                            │  Sticky  │
│             │   Text, code, diagrams     │  cheat   │
│             │   properly sized           │  sheet   │
└────────────────────────────────────────────────────┘
```

### Tablet (768-1399px)

```
┌─────────────────────────────────┐
│  Nav  │    Main Content          │
│ (240) │    (flexible width)      │
│       │                          │
│ Sticky│    Quick ref at top      │
└─────────────────────────────────┘
```

### Mobile (<768px)

```
┌─────────────────┐
│  Quick Ref      │  ← Horizontal scroll
├─────────────────┤
│  Main Content   │
│  (full width)   │
│                 │
│  Stacked        │
│  vertically     │
└─────────────────┘
```

---

## Example Page Template

Here's a complete example of an ADHD-friendly page:

```html
<div class="adhd-layout">
    <!-- Left navigation (optional, can be auto-generated) -->
    <aside class="adhd-nav-panel">
        <nav class="topic-nav">
            <a href="#intro">Introduction</a>
            <a href="#basics">Basics</a>
            <a href="#examples">Examples</a>
        </nav>
    </aside>

    <!-- Main content area -->
    <main class="adhd-main-content">
        <!-- TL;DR at the top -->
        <div class="tldr-box">
            <div class="tldr-header">TL;DR</div>
            <ul class="tldr-list">
                <li>Key point 1</li>
                <li>Key point 2</li>
                <li>Key point 3</li>
            </ul>
        </div>

        <!-- Progress indicator (auto-generated by JS) -->
        <div class="progress-indicator">
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <div class="progress-text">0% complete</div>
        </div>

        <!-- Concept sections with visual chunking -->
        <div class="concept-section type-definition" id="intro">
            <h2>What is a Graph?</h2>
            <p>A graph is a data structure consisting of nodes and edges...</p>
        </div>

        <!-- Code + Explanation side-by-side -->
        <div class="code-with-explanation">
            <div class="explanation-panel">
                <h4>Explanation</h4>
                <p>This creates an adjacency list representation...</p>
            </div>
            <div class="code-panel">
                <pre><code class="language-python">
graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D', 'E']
}
                </code></pre>
            </div>
        </div>

        <!-- Collapsible advanced details -->
        <div class="collapsible-section" data-section-id="advanced">
            <div class="collapsible-header">
                <h3>Advanced Optimization Techniques</h3>
                <span class="collapsible-icon">▼</span>
            </div>
            <div class="collapsible-content">
                <p>For large graphs, consider using...</p>
            </div>
        </div>

        <!-- Step-by-step algorithm -->
        <div class="concept-section type-example" id="examples">
            <h2>DFS Algorithm Steps</h2>
            <div class="step-flow">
                <div class="step-item">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>Mark as Visited</h4>
                        <p>Add current node to visited set</p>
                    </div>
                </div>
                <div class="step-item">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4>Process Node</h4>
                        <p>Perform operation on current node</p>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Right quick reference (can be empty, will auto-populate) -->
    <aside class="adhd-quick-ref">
        <!-- JS will auto-generate from H2/H3 headings -->
    </aside>
</div>
```

---

## JavaScript Features (Automatic)

All JavaScript features are initialized automatically on page load:

### 1. Collapsibles
```javascript
// Automatically finds all .collapsible-section elements
// Adds click handlers to .collapsible-header
// Saves/restores state from localStorage
```

### 2. Progress Tracker
```javascript
// Automatically finds .progress-fill element
// Updates width based on scroll position
// Shows percentage in .progress-text
```

### 3. Quick Navigation
```javascript
// Finds all H2 and H3 elements in main content
// Generates navigation links in .adhd-quick-ref
// Adds smooth scroll and visual feedback
```

### 4. Current Section Highlight
```javascript
// Uses IntersectionObserver to detect visible headings
// Highlights corresponding link in quick ref
// Provides visual feedback for location awareness
```

---

## Browser Console Commands

You can manually trigger features in the browser console:

```javascript
// Manually initialize all enhancements
ADHDEnhancements.init();

// Initialize specific features
ADHDEnhancements.initCollapsibles();
ADHDEnhancements.initProgressTracker();
ADHDEnhancements.generateQuickRef();
ADHDEnhancements.highlightCurrentSection();
```

---

## Color Scheme Reference

```css
/* Concept section types */
.type-definition    → Blue border (#3b82f6)   - Learning/Theory
.type-example      → Green border (#10b981)  - Practice/Examples
.type-warning      → Orange border (#f59e0b) - Caution/Pitfalls
.type-important    → Red border (#ef4444)    - Critical Concepts

/* Comparison table */
.comparison-col-a  → Light blue (#dbeafe)    - Option A
.comparison-col-b  → Light green (#d1fae5)   - Option B

/* TL;DR box */
Background: Blue gradient (#eff6ff → #dbeafe)
Border: Blue (#3b82f6)

/* Progress indicator */
Background: Light gray (#f1f5f9)
Fill: Blue gradient (#3b82f6 → #2563eb)
```

---

## Migration Guide

### Converting Existing Content

**Before (standard layout):**
```html
<div class="guide-content">
    <h2>Introduction</h2>
    <p>Long paragraph...</p>
    <pre><code>Code here</code></pre>
    <p>Explanation here</p>
</div>
```

**After (ADHD-friendly):**
```html
<div class="adhd-layout">
    <aside class="adhd-nav-panel"></aside>

    <main class="adhd-main-content">
        <div class="tldr-box">
            <div class="tldr-header">TL;DR</div>
            <ul class="tldr-list">
                <li>Quick summary points</li>
            </ul>
        </div>

        <div class="concept-section type-definition">
            <h2>Introduction</h2>
            <p>Long paragraph...</p>
        </div>

        <div class="code-with-explanation">
            <div class="explanation-panel">
                <h4>Explanation</h4>
                <p>Explanation here</p>
            </div>
            <div class="code-panel">
                <pre><code>Code here</code></pre>
            </div>
        </div>
    </main>

    <aside class="adhd-quick-ref"></aside>
</div>
```

---

## Testing Checklist

After applying ADHD-friendly patterns to a page:

### Visual Tests
- [ ] Concept sections have clear borders and spacing
- [ ] Color-coding is consistent (blue/green/orange/red)
- [ ] TL;DR box stands out at top of sections
- [ ] Code and explanation are side-by-side on desktop
- [ ] Quick reference panel is sticky and visible
- [ ] Progress bar updates on scroll

### Interaction Tests
- [ ] Collapsible sections expand/collapse on click
- [ ] Collapsible state persists after page reload
- [ ] Quick ref links scroll smoothly to sections
- [ ] Clicked sections get visual highlight feedback
- [ ] Current section highlighted in quick ref as you scroll

### Responsive Tests
- [ ] Mobile: Content stacks vertically
- [ ] Mobile: Quick ref shows horizontally at top
- [ ] Tablet: 2-column layout works
- [ ] Desktop: 3-column layout (nav + content + ref)
- [ ] No horizontal scrolling on any device

---

## Performance Notes

- All CSS is loaded synchronously (critical CSS)
- JavaScript is deferred (loads after HTML parsing)
- IntersectionObserver is performant (no scroll listeners)
- localStorage operations are minimal
- Sticky elements use GPU acceleration (`transform: translateZ(0)`)

---

## Accessibility

- Collapsible sections can be toggled with Enter/Space keys
- ARIA attributes added automatically by JS
- Focus states clearly visible
- Color is not the only indicator (borders, icons also used)
- Text maintains adequate contrast ratios

---

## Future Enhancements

Potential features to add:

1. **Focus Timer**: Pomodoro-style timer in quick ref panel
2. **Reading Speed Estimator**: "5 min read" based on word count
3. **Bookmark Progress**: Save reading position across sessions
4. **Custom Color Themes**: User-selectable color schemes
5. **Font Size Controls**: User-adjustable text size
6. **Dark Mode**: ADHD-friendly dark theme

---

## Summary

The ADHD-friendly layout system provides:

✅ **Visual Chunking** - Clear section boundaries reduce overwhelm
✅ **Quick Scanning** - TL;DR boxes and color-coding help skim
✅ **Reduced Scrolling** - Side-by-side layouts keep context visible
✅ **Progress Feedback** - Always know where you are
✅ **Collapsible Details** - Hide complexity until needed
✅ **Always-Visible Reference** - Key concepts always accessible

All features work automatically once the CSS and JS files are loaded (already added to main.html).

To apply to your pages, simply use the HTML patterns documented above!

---

**Files:**
- CSS: `frontend/static/css/adhd-friendly-layout.css`
- JS: `frontend/static/js/adhd-enhancements.js`
- Template: `frontend/templates/layouts/main.html`

**Branch:** `claude/ai-agent-test-runner-72tti`
**Commit:** d7f017d
**Date:** 2026-02-01
