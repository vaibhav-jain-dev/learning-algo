// PDF Export functionality for DSAlgo Learning Platform
// Topics are fetched dynamically from the server

// Currently selected topic
let selectedTopic = null;
let topicsLoaded = false;

// Initialize PDF modal functionality
function initPdfModal() {
    const printBtn = document.getElementById('print-pdf-btn');
    if (!printBtn) return;

    printBtn.addEventListener('click', openPdfModal);

    // Generate PDF button handler
    const generateBtn = document.getElementById('generate-pdf-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generatePdf);
    }
}

// Fetch topics from server API
async function fetchTopics() {
    if (topicsLoaded) return;

    try {
        const response = await fetch('/api/topics');
        if (!response.ok) throw new Error('Failed to fetch topics');

        const categories = await response.json();

        // Clear existing content and populate with fetched data
        const categoryList = document.querySelector('.pdf-category-list');
        if (!categoryList) return;

        categoryList.innerHTML = '';

        categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'pdf-category';
            categoryDiv.innerHTML = `
                <h3>${category.title}</h3>
                <div class="pdf-topics" id="pdf-${category.slug}-topics"></div>
            `;
            categoryList.appendChild(categoryDiv);

            // Populate topics
            const topicsContainer = categoryDiv.querySelector('.pdf-topics');
            category.topics.forEach(topic => {
                const label = document.createElement('label');
                label.className = 'pdf-topic-item';
                label.innerHTML = `
                    <input type="radio" name="pdf-topic" value="${category.slug}/${topic.slug}" data-name="${topic.title}">
                    <span>${topic.title}</span>
                `;
                topicsContainer.appendChild(label);

                // Add change listener
                label.querySelector('input').addEventListener('change', function() {
                    selectedTopic = {
                        path: this.value,
                        name: this.dataset.name
                    };
                    updateGenerateButton();
                });
            });
        });

        topicsLoaded = true;
    } catch (error) {
        console.error('Failed to fetch topics:', error);
        // Show error in modal
        const categoryList = document.querySelector('.pdf-category-list');
        if (categoryList) {
            categoryList.innerHTML = '<p class="error">Failed to load topics. Please try again.</p>';
        }
    }
}

// Update generate button state
function updateGenerateButton() {
    const generateBtn = document.getElementById('generate-pdf-btn');
    const btnText = document.getElementById('pdf-btn-text');

    if (generateBtn && btnText) {
        if (selectedTopic) {
            generateBtn.disabled = false;
            btnText.textContent = `Export "${selectedTopic.name}"`;
        } else {
            generateBtn.disabled = true;
            btnText.textContent = 'Select a topic';
        }
    }
}

// Open PDF modal
async function openPdfModal() {
    const modal = document.getElementById('pdf-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Fetch topics when modal opens
        await fetchTopics();
    }
}

// Close PDF modal
function closePdfModal() {
    const modal = document.getElementById('pdf-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
    // Reset selection
    selectedTopic = null;
    document.querySelectorAll('input[name="pdf-topic"]').forEach(r => r.checked = false);
    updateGenerateButton();
}

// Generate PDF
async function generatePdf() {
    if (!selectedTopic) return;

    const generateBtn = document.getElementById('generate-pdf-btn');
    const btnText = document.getElementById('pdf-btn-text');
    const loading = document.getElementById('pdf-loading');

    // Show loading state
    if (btnText) btnText.classList.add('hidden');
    if (loading) loading.classList.remove('hidden');
    if (generateBtn) generateBtn.disabled = true;

    try {
        // Fetch the topic content
        const response = await fetch(`/topic/${selectedTopic.path}`);
        const html = await response.text();

        // Parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Get the topic content
        let content = doc.querySelector('.topic-content') || doc.querySelector('.topic-detail-page');

        if (!content) {
            throw new Error('Could not find topic content');
        }

        // Clone the content for PDF processing
        const pdfContent = content.cloneNode(true);

        // Remove elements not suitable for PDF
        const elementsToRemove = [
            '.code-run-btn',           // Run buttons
            '.code-copy-btn',          // Copy buttons
            '.code-block-wrapper button', // All code block buttons
            '.viz-controls',           // Visualization controls
            '.viz-controls button',    // Viz control buttons
            '.playground',             // Playground elements
            '.editor-container',       // Code editors
            '.CodeMirror',             // CodeMirror instances
            '.output-area',            // Output areas
            '#code-editor-wrapper',    // Editor wrappers
            '.execution-metrics',      // Execution metrics
            '.actions',                // Action buttons
            '.btn-primary:not(.pdf-keep)', // Primary buttons (except marked ones)
            '.btn-secondary',          // Secondary buttons
            '.btn-danger',             // Danger buttons
            'button',                  // All remaining buttons
            '.collapsible-heading .collapse-icon', // Collapse icons
            'script',                  // Scripts
            'style:not(.pdf-styles)', // Inline styles (except PDF styles)
        ];

        elementsToRemove.forEach(selector => {
            pdfContent.querySelectorAll(selector).forEach(el => el.remove());
        });

        // Expand all collapsed sections
        pdfContent.querySelectorAll('.collapsible-content.collapsed').forEach(el => {
            el.classList.remove('collapsed');
            el.style.display = '';
            el.style.maxHeight = 'none';
            el.style.opacity = '1';
        });

        // Show all hidden elements that should be visible in PDF
        pdfContent.querySelectorAll('[style*="display: none"]').forEach(el => {
            // Check if it's content that should be shown
            if (!el.classList.contains('code-run-btn') &&
                !el.classList.contains('code-copy-btn') &&
                !el.classList.contains('playground')) {
                el.style.display = '';
            }
        });

        // Create PDF container
        const pdfContainer = document.createElement('div');
        pdfContainer.className = 'pdf-export-container';
        pdfContainer.innerHTML = `
            <div class="pdf-header">
                <h1>${selectedTopic.name}</h1>
                <p class="pdf-subtitle">DSAlgo Learning Platform</p>
            </div>
            <div class="pdf-body"></div>
            <div class="pdf-footer">
                <p>Generated from DSAlgo Learning Platform</p>
            </div>
        `;
        pdfContainer.querySelector('.pdf-body').appendChild(pdfContent);

        // Add PDF-specific styles
        const pdfStyles = document.createElement('style');
        pdfStyles.className = 'pdf-styles';
        pdfStyles.textContent = `
            .pdf-export-container {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                color: #1a1a2e;
                background: white;
                padding: 20mm;
                max-width: 210mm;
                margin: 0 auto;
            }
            .pdf-header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #0d6efd;
            }
            .pdf-header h1 {
                font-size: 28px;
                margin: 0 0 10px 0;
                color: #1a1a2e;
            }
            .pdf-subtitle {
                color: #6c757d;
                margin: 0;
                font-size: 14px;
            }
            .pdf-body {
                line-height: 1.6;
            }
            .pdf-body h1 { font-size: 24px; margin-top: 30px; color: #1a1a2e; }
            .pdf-body h2 { font-size: 20px; margin-top: 25px; color: #1a1a2e; border-bottom: 1px solid #dee2e6; padding-bottom: 8px; }
            .pdf-body h3 { font-size: 16px; margin-top: 20px; color: #1a1a2e; }
            .pdf-body h4 { font-size: 14px; margin-top: 15px; color: #495057; }
            .pdf-body p { margin-bottom: 12px; color: #495057; }
            .pdf-body ul, .pdf-body ol { margin-bottom: 12px; padding-left: 25px; }
            .pdf-body li { margin-bottom: 6px; color: #495057; }
            .pdf-body pre {
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 6px;
                padding: 15px;
                overflow-x: auto;
                font-size: 12px;
                line-height: 1.5;
                page-break-inside: avoid;
            }
            .pdf-body code {
                font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
                font-size: 12px;
                background: #e9ecef;
                padding: 2px 6px;
                border-radius: 3px;
            }
            .pdf-body pre code {
                background: none;
                padding: 0;
            }
            .pdf-body table {
                width: 100%;
                border-collapse: collapse;
                margin: 15px 0;
                page-break-inside: avoid;
            }
            .pdf-body th, .pdf-body td {
                border: 1px solid #dee2e6;
                padding: 10px;
                text-align: left;
            }
            .pdf-body th {
                background: #f8f9fa;
                font-weight: 600;
            }
            .pdf-body blockquote {
                border-left: 4px solid #0d6efd;
                margin: 15px 0;
                padding: 10px 20px;
                background: #f8f9fa;
                page-break-inside: avoid;
            }
            .pdf-body .diagram-container,
            .pdf-body .circuit-diagram,
            .pdf-body .state-diagram,
            .pdf-body .lb-architecture {
                page-break-inside: avoid;
                margin: 20px 0;
            }
            .pdf-body img {
                max-width: 100%;
                height: auto;
            }
            .pdf-footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #dee2e6;
                text-align: center;
                color: #6c757d;
                font-size: 12px;
            }
            .code-block-wrapper {
                position: relative;
                margin: 15px 0;
            }
            /* Hide any remaining interactive elements */
            button, .btn, input, select, textarea {
                display: none !important;
            }
            /* Ensure collapsible content is visible */
            .collapsible-content {
                display: block !important;
                max-height: none !important;
                opacity: 1 !important;
                overflow: visible !important;
            }
            .collapsible-heading {
                cursor: default;
            }
            .collapse-icon {
                display: none !important;
            }
        `;
        pdfContainer.prepend(pdfStyles);

        // PDF options
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `${selectedTopic.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                logging: false
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // Generate PDF
        await html2pdf().set(opt).from(pdfContainer).save();

        // Close modal on success
        closePdfModal();

    } catch (error) {
        console.error('PDF generation failed:', error);
        alert('Failed to generate PDF. Please try again.');
    } finally {
        // Reset button state
        if (btnText) btnText.classList.remove('hidden');
        if (loading) loading.classList.add('hidden');
        updateGenerateButton();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPdfModal);
} else {
    initPdfModal();
}

// Re-initialize after HTMX swaps (for SPA navigation)
document.body.addEventListener('htmx:afterSwap', function() {
    topicsLoaded = false; // Reset so topics are fetched fresh
    initPdfModal();
});

// Make closePdfModal globally accessible
window.closePdfModal = closePdfModal;
