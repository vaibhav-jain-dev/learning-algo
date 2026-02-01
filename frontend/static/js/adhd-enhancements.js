/* ============================================
   ADHD-FRIENDLY INTERACTIVE ENHANCEMENTS
   JavaScript for collapsibles, progress, and focus aids
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // COLLAPSIBLE SECTIONS
    // ============================================
    function initCollapsibles() {
        const collapsibles = document.querySelectorAll('.collapsible-section');

        collapsibles.forEach(section => {
            const header = section.querySelector('.collapsible-header');
            if (!header) return;

            header.addEventListener('click', () => {
                section.classList.toggle('expanded');

                // Save state in localStorage
                const sectionId = section.getAttribute('data-section-id');
                if (sectionId) {
                    const isExpanded = section.classList.contains('expanded');
                    localStorage.setItem(`collapsible-${sectionId}`, isExpanded);
                }
            });

            // Restore state from localStorage
            const sectionId = section.getAttribute('data-section-id');
            if (sectionId) {
                const savedState = localStorage.getItem(`collapsible-${sectionId}`);
                if (savedState === 'true') {
                    section.classList.add('expanded');
                }
            }
        });
    }

    // ============================================
    // READING PROGRESS TRACKER
    // ============================================
    function initProgressTracker() {
        const progressBar = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');

        if (!progressBar) return;

        function updateProgress() {
            const winHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            const totalScroll = docHeight - winHeight;
            const progress = (scrollTop / totalScroll) * 100;

            progressBar.style.width = `${Math.min(progress, 100)}%`;

            if (progressText) {
                progressText.textContent = `${Math.round(progress)}% complete`;
            }
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress(); // Initial call
    }

    // ============================================
    // AUTO-GENERATE QUICK REFERENCE FROM HEADINGS
    // ============================================
    function generateQuickRef() {
        const quickRefPanel = document.querySelector('.adhd-quick-ref');
        if (!quickRefPanel) return;

        // Check if quick ref already has content
        if (quickRefPanel.querySelector('.quick-ref-card')) return;

        const mainContent = document.querySelector('.adhd-main-content, .guide-content, .topic-content');
        if (!mainContent) return;

        const headings = mainContent.querySelectorAll('h2, h3');
        if (headings.length === 0) return;

        const quickRefCard = document.createElement('div');
        quickRefCard.className = 'quick-ref-card';
        quickRefCard.innerHTML = `
            <div class="quick-ref-header">Quick Navigation</div>
            <ul class="quick-ref-list"></ul>
        `;

        const list = quickRefCard.querySelector('.quick-ref-list');

        headings.forEach((heading, index) => {
            // Add ID if doesn't exist
            if (!heading.id) {
                heading.id = `section-${index}`;
            }

            const item = document.createElement('li');
            item.className = 'quick-ref-item';

            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.style.textDecoration = 'none';
            link.style.color = 'inherit';
            link.innerHTML = `
                <span class="quick-ref-key">${heading.tagName}</span>
                <span class="quick-ref-value">${heading.textContent}</span>
            `;

            item.appendChild(link);
            list.appendChild(item);

            // Smooth scroll on click
            link.addEventListener('click', (e) => {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Visual feedback
                heading.style.transition = 'background-color 0.3s';
                heading.style.backgroundColor = '#fef3c7';
                setTimeout(() => {
                    heading.style.backgroundColor = '';
                }, 1000);
            });
        });

        quickRefPanel.appendChild(quickRefCard);
    }

    // ============================================
    // AUTO-DETECT AND WRAP CODE+EXPLANATION PAIRS
    // ============================================
    function enhanceCodeExamples() {
        const codeBlocks = document.querySelectorAll('pre code');

        codeBlocks.forEach(codeBlock => {
            const pre = codeBlock.parentElement;

            // Check if there's a paragraph before or after
            const prevSibling = pre.previousElementSibling;
            const nextSibling = pre.nextElementSibling;

            // If there's explanatory text nearby, wrap them together
            if (prevSibling && prevSibling.tagName === 'P' && prevSibling.textContent.length > 50) {
                wrapCodeWithExplanation(prevSibling, pre, 'before');
            } else if (nextSibling && nextSibling.tagName === 'P' && nextSibling.textContent.length > 50) {
                wrapCodeWithExplanation(pre, nextSibling, 'after');
            }
        });
    }

    function wrapCodeWithExplanation(explanation, code, position) {
        // Check if already wrapped
        if (code.closest('.code-with-explanation')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'code-with-explanation';

        const explanationPanel = document.createElement('div');
        explanationPanel.className = 'explanation-panel';
        explanationPanel.innerHTML = `<h4>Explanation</h4>`;
        explanationPanel.appendChild(explanation.cloneNode(true));

        const codePanel = document.createElement('div');
        codePanel.className = 'code-panel';
        codePanel.appendChild(code.cloneNode(true));

        if (position === 'before') {
            wrapper.appendChild(explanationPanel);
            wrapper.appendChild(codePanel);
        } else {
            wrapper.appendChild(codePanel);
            wrapper.appendChild(explanationPanel);
        }

        // Replace original elements
        explanation.parentNode.replaceChild(wrapper, explanation);
        code.remove();
    }

    // ============================================
    // ADD TL;DR TO LONG SECTIONS
    // ============================================
    function addTLDRSections() {
        const sections = document.querySelectorAll('.concept-section, section');

        sections.forEach(section => {
            const content = section.textContent;
            const wordCount = content.split(/\s+/).length;

            // If section is long (>300 words) and doesn't have TL;DR
            if (wordCount > 300 && !section.querySelector('.tldr-box')) {
                const headings = section.querySelectorAll('h2, h3, h4');
                if (headings.length > 0) {
                    const firstHeading = headings[0];

                    // Create TL;DR box
                    const tldr = document.createElement('div');
                    tldr.className = 'tldr-box';
                    tldr.innerHTML = `
                        <div class="tldr-header">TL;DR</div>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--color-text-secondary);">
                            This section covers: ${firstHeading.textContent}.
                            Expand for full details or scroll for examples.
                        </p>
                    `;

                    firstHeading.after(tldr);
                }
            }
        });
    }

    // ============================================
    // HIGHLIGHT CURRENT SECTION IN QUICK REF
    // ============================================
    function highlightCurrentSection() {
        const quickRefLinks = document.querySelectorAll('.quick-ref-list a');
        if (quickRefLinks.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    quickRefLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${id}`) {
                            link.style.backgroundColor = '#dbeafe';
                            link.style.borderRadius = '6px';
                            link.style.padding = '0.25rem 0.5rem';
                        } else {
                            link.style.backgroundColor = '';
                            link.style.padding = '';
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('h2, h3').forEach(heading => {
            if (heading.id) {
                observer.observe(heading);
            }
        });
    }

    // ============================================
    // FOCUS MODE TOGGLE
    // ============================================
    function initFocusMode() {
        const focusToggle = document.querySelector('[data-focus-toggle]');
        if (!focusToggle) return;

        focusToggle.addEventListener('click', () => {
            document.body.classList.toggle('focus-mode');

            const isFocusMode = document.body.classList.contains('focus-mode');
            localStorage.setItem('focusMode', isFocusMode);

            // Hide sidebars in focus mode
            if (isFocusMode) {
                document.querySelectorAll('.adhd-nav-panel, .adhd-quick-ref, .guide-sidebar').forEach(el => {
                    el.style.opacity = '0.2';
                    el.style.pointerEvents = 'none';
                });
            } else {
                document.querySelectorAll('.adhd-nav-panel, .adhd-quick-ref, .guide-sidebar').forEach(el => {
                    el.style.opacity = '';
                    el.style.pointerEvents = '';
                });
            }
        });

        // Restore focus mode
        if (localStorage.getItem('focusMode') === 'true') {
            focusToggle.click();
        }
    }

    // ============================================
    // INITIALIZE ALL ENHANCEMENTS
    // ============================================
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        console.log('Initializing ADHD-friendly enhancements...');

        initCollapsibles();
        initProgressTracker();
        generateQuickRef();
        highlightCurrentSection();
        initFocusMode();

        // Optionally enhance code examples (might interfere with existing layouts)
        // enhanceCodeExamples();

        console.log('ADHD enhancements loaded ✓');
    }

    // Auto-initialize
    init();

    // Export for manual initialization if needed
    window.ADHDEnhancements = {
        init,
        initCollapsibles,
        initProgressTracker,
        generateQuickRef,
        highlightCurrentSection
    };
})();
