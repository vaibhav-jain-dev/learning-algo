// PDF Export functionality for DSAlgo Learning Platform
// Topics are fetched dynamically from the server

// Prevent duplicate declarations on HTMX navigation
if (typeof window._pdfExportLoaded === 'undefined') {
window._pdfExportLoaded = true;

// Currently selected topics (can be multiple or all)
var selectedTopics = [];
var selectAllChecked = true;
var topicsLoaded = false;
var html2pdfLoaded = false;
var allTopics = [];

// Load html2pdf via lazy loader
function loadHtml2PdfLib() {
    if (html2pdfLoaded || typeof html2pdf !== 'undefined') {
        return Promise.resolve();
    }

    if (typeof LazyLoader !== 'undefined') {
        return LazyLoader.loadHtml2Pdf().then(function() {
            html2pdfLoaded = true;
        });
    }

    // Fallback: direct script loading
    return new Promise(function(resolve, reject) {
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = function() {
            html2pdfLoaded = true;
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// A4 paper dimensions in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MARGIN_MM = 15;
const CONTENT_WIDTH_MM = A4_WIDTH_MM - (MARGIN_MM * 2); // 180mm

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
        allTopics = [];

        categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'pdf-category';
            categoryDiv.innerHTML = `
                <h3>${category.title}</h3>
                <div class="pdf-topics" id="pdf-${category.slug}-topics"></div>
            `;
            categoryList.appendChild(categoryDiv);

            // Populate topics with checkboxes
            const topicsContainer = categoryDiv.querySelector('.pdf-topics');
            category.topics.forEach(topic => {
                const topicData = {
                    path: `${category.slug}/${topic.slug}`,
                    name: topic.title
                };
                allTopics.push(topicData);

                const label = document.createElement('label');
                label.className = 'pdf-topic-item';
                label.innerHTML = `
                    <input type="checkbox" name="pdf-topic" value="${topicData.path}" data-name="${topic.title}" checked>
                    <span>${topic.title}</span>
                `;
                topicsContainer.appendChild(label);

                // Add change listener
                label.querySelector('input').addEventListener('change', function() {
                    updateSelectedTopics();
                    updateSelectAllCheckbox();
                });
            });
        });

        // Setup select all checkbox handler
        const selectAllCheckbox = document.getElementById('select-all-topics');
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', function() {
                selectAllChecked = this.checked;
                document.querySelectorAll('input[name="pdf-topic"]').forEach(cb => {
                    cb.checked = selectAllChecked;
                });
                updateSelectedTopics();
            });
        }

        topicsLoaded = true;
        updateSelectedTopics();
    } catch (error) {
        console.error('Failed to fetch topics:', error);
        // Show error in modal
        const categoryList = document.querySelector('.pdf-category-list');
        if (categoryList) {
            categoryList.innerHTML = '<p class="error">Failed to load topics. Please try again.</p>';
        }
    }
}

// Update selected topics array from checkboxes
function updateSelectedTopics() {
    selectedTopics = [];
    document.querySelectorAll('input[name="pdf-topic"]:checked').forEach(cb => {
        selectedTopics.push({
            path: cb.value,
            name: cb.dataset.name
        });
    });
    updateGenerateButton();
}

// Update select all checkbox state based on individual selections
function updateSelectAllCheckbox() {
    const selectAllCheckbox = document.getElementById('select-all-topics');
    const allCheckboxes = document.querySelectorAll('input[name="pdf-topic"]');
    const checkedCheckboxes = document.querySelectorAll('input[name="pdf-topic"]:checked');

    if (selectAllCheckbox) {
        selectAllCheckbox.checked = allCheckboxes.length === checkedCheckboxes.length;
        selectAllCheckbox.indeterminate = checkedCheckboxes.length > 0 && checkedCheckboxes.length < allCheckboxes.length;
    }
}

// Update generate button state
function updateGenerateButton() {
    const generateBtn = document.getElementById('generate-pdf-btn');
    const btnText = document.getElementById('pdf-btn-text');
    const printBtn = document.getElementById('browser-print-btn');

    if (generateBtn && btnText) {
        if (selectedTopics.length > 0) {
            generateBtn.disabled = false;
            if (selectedTopics.length === allTopics.length) {
                btnText.textContent = 'Export All Topics';
            } else if (selectedTopics.length === 1) {
                btnText.textContent = `Export "${selectedTopics[0].name}"`;
            } else {
                btnText.textContent = `Export ${selectedTopics.length} Topics`;
            }
        } else {
            generateBtn.disabled = true;
            btnText.textContent = 'Select topics';
        }
    }

    if (printBtn) {
        printBtn.disabled = selectedTopics.length === 0;
    }
}

// Trigger browser print dialog
function triggerBrowserPrint() {
    closePdfModal();
    setTimeout(() => {
        window.print();
    }, 100);
}

// Make triggerBrowserPrint globally accessible
window.triggerBrowserPrint = triggerBrowserPrint;

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
}

// Fetch a single topic's content
async function fetchTopicContent(topicPath) {
    const response = await fetch(`/topic/${topicPath}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch topic: ${topicPath} (Status: ${response.status})`);
    }
    const html = await response.text();

    // Parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Get the topic content - prefer .topic-content which contains the actual markdown content
    let content = doc.querySelector('.topic-content');

    if (!content) {
        // Fallback to the entire page if topic-content not found
        content = doc.querySelector('.topic-detail-page');
    }

    if (!content) {
        throw new Error(`Could not find topic content for: ${topicPath}`);
    }

    // Clone the content
    const clonedContent = content.cloneNode(true);

    // Debug: log content size
    console.log(`Topic content found for ${topicPath}:`, clonedContent.textContent.length, 'characters');

    // Check if content is actually there
    if (clonedContent.textContent.trim().length === 0) {
        console.warn(`Warning: Topic ${topicPath} has empty content`);
    } else {
        console.log(`First 100 chars:`, clonedContent.textContent.trim().substring(0, 100));
    }

    return clonedContent;
}

// Generate PDF
async function generatePdf() {
    if (selectedTopics.length === 0) return;

    const generateBtn = document.getElementById('generate-pdf-btn');
    const btnText = document.getElementById('pdf-btn-text');
    const loading = document.getElementById('pdf-loading');

    // Show loading state
    if (btnText) btnText.classList.add('hidden');
    if (loading) loading.classList.remove('hidden');
    if (generateBtn) generateBtn.disabled = true;

    try {
        // Load html2pdf library first
        await loadHtml2PdfLib();

        // Fetch all selected topics content
        console.log('Fetching content for', selectedTopics.length, 'topic(s)...');
        const topicContents = [];

        for (let i = 0; i < selectedTopics.length; i++) {
            const topic = selectedTopics[i];
            try {
                console.log(`Fetching topic ${i + 1}/${selectedTopics.length}: ${topic.name}`);
                const content = await fetchTopicContent(topic.path);
                topicContents.push({
                    name: topic.name,
                    content: content
                });
            } catch (error) {
                console.error(`Failed to fetch topic ${topic.name}:`, error);
                throw new Error(`Failed to fetch "${topic.name}": ${error.message}`);
            }
        }

        // Create a combined content container
        const combinedContent = document.createElement('div');
        combinedContent.className = 'pdf-combined-content';

        topicContents.forEach((topicData, index) => {
            // Add page break before each topic (except the first)
            if (index > 0) {
                const pageBreak = document.createElement('div');
                pageBreak.className = 'page-break';
                combinedContent.appendChild(pageBreak);
            }

            // Add topic heading if multiple topics
            if (topicContents.length > 1) {
                const topicHeading = document.createElement('div');
                topicHeading.className = 'pdf-topic-heading';
                topicHeading.innerHTML = `<h1>${topicData.name}</h1>`;
                combinedContent.appendChild(topicHeading);
            }

            combinedContent.appendChild(topicData.content);
        });

        // Use the combined content for PDF processing
        const pdfContent = combinedContent;

        console.log('Combined content created with', topicContents.length, 'topics');
        console.log('Total combined text length:', pdfContent.textContent.length, 'characters');

        // Remove elements not suitable for PDF
        const elementsToRemove = [
            '.code-run-btn',
            '.code-copy-btn',
            '.code-block-wrapper button',
            '.viz-controls',
            '.viz-controls button',
            '.playground',
            '.editor-container',
            '.CodeMirror',
            '.output-area',
            '#code-editor-wrapper',
            '.execution-metrics',
            '.actions',
            '.btn-primary:not(.pdf-keep)',
            '.btn-secondary',
            '.btn-danger',
            'button',
            '.collapsible-heading .collapse-icon',
            'script',
            'style:not(.pdf-styles)',
            'nav.breadcrumb', // Remove breadcrumb navigation
            '.topic-badge', // Remove topic badges
        ];

        let removedCount = 0;
        elementsToRemove.forEach(selector => {
            const elements = pdfContent.querySelectorAll(selector);
            removedCount += elements.length;
            elements.forEach(el => el.remove());
        });

        console.log('Removed', removedCount, 'unwanted elements');
        console.log('Content after cleanup:', pdfContent.textContent.length, 'characters');

        // Expand all collapsed sections
        pdfContent.querySelectorAll('.collapsible-content.collapsed').forEach(el => {
            el.classList.remove('collapsed');
            el.style.display = '';
            el.style.maxHeight = 'none';
            el.style.opacity = '1';
        });

        // Show all hidden elements that should be visible in PDF
        pdfContent.querySelectorAll('[style*="display: none"]').forEach(el => {
            if (!el.classList.contains('code-run-btn') &&
                !el.classList.contains('code-copy-btn') &&
                !el.classList.contains('playground')) {
                el.style.display = '';
            }
        });

        // Determine document title
        let documentTitle;
        if (selectedTopics.length === 1) {
            documentTitle = selectedTopics[0].name;
        } else if (selectedTopics.length === allTopics.length) {
            documentTitle = 'All Topics';
        } else {
            documentTitle = `${selectedTopics.length} Selected Topics`;
        }

        // Create PDF container with A4 dimensions
        // 794px width at 96 DPI = 210mm (A4 width)
        // Content area: 794 - 113 (margins) = 681px for 180mm content width
        const pdfContainer = document.createElement('div');
        pdfContainer.className = 'pdf-export-container';
        pdfContainer.innerHTML = `
            <div class="pdf-header">
                <h1>${documentTitle}</h1>
                <p class="pdf-subtitle">DSAlgo Learning Platform</p>
            </div>
            <div class="pdf-body"></div>
        `;
        pdfContainer.querySelector('.pdf-body').appendChild(pdfContent);

        // Add PDF-specific styles optimized for A4
        const pdfStyles = document.createElement('style');
        pdfStyles.className = 'pdf-styles';
        pdfStyles.textContent = `
            /* A4 optimized container */
            .pdf-export-container {
                font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                color: #1a1a2e;
                background: white;
                width: 680px;
                max-width: 680px;
                margin: 0 auto;
                padding: 0;
                font-size: 11pt;
                line-height: 1.5;
                box-sizing: border-box;
            }

            /* Header styling */
            .pdf-header {
                text-align: center;
                margin-bottom: 24px;
                padding-bottom: 16px;
                border-bottom: 2px solid #0d6efd;
            }
            .pdf-header h1 {
                font-size: 22pt;
                margin: 0 0 8px 0;
                color: #1a1a2e;
                font-weight: 600;
            }
            .pdf-subtitle {
                color: #6c757d;
                margin: 0;
                font-size: 10pt;
            }

            /* Topic heading for multiple topics */
            .pdf-topic-heading {
                margin-top: 32px;
                margin-bottom: 20px;
                padding-top: 16px;
                border-top: 2px solid #0d6efd;
            }
            .pdf-topic-heading h1 {
                font-size: 20pt;
                margin: 0;
                color: #0d6efd;
                font-weight: 600;
            }

            /* Body content */
            .pdf-body {
                line-height: 1.6;
            }
            .pdf-body * {
                max-width: 100%;
                box-sizing: border-box;
            }

            /* Headings - sized for A4 readability */
            .pdf-body h1 {
                font-size: 18pt;
                margin: 24px 0 12px 0;
                color: #1a1a2e;
                font-weight: 600;
                page-break-after: avoid;
            }
            .pdf-body h2 {
                font-size: 14pt;
                margin: 20px 0 10px 0;
                color: #1a1a2e;
                border-bottom: 1px solid #dee2e6;
                padding-bottom: 6px;
                font-weight: 600;
                page-break-after: avoid;
            }
            .pdf-body h3 {
                font-size: 12pt;
                margin: 16px 0 8px 0;
                color: #1a1a2e;
                font-weight: 600;
                page-break-after: avoid;
            }
            .pdf-body h4 {
                font-size: 11pt;
                margin: 12px 0 6px 0;
                color: #495057;
                font-weight: 600;
                page-break-after: avoid;
            }

            /* Paragraphs and text */
            .pdf-body p {
                margin: 0 0 10px 0;
                color: #333;
                text-align: justify;
                orphans: 3;
                widows: 3;
            }

            /* Lists */
            .pdf-body ul, .pdf-body ol {
                margin: 0 0 12px 0;
                padding-left: 24px;
            }
            .pdf-body li {
                margin-bottom: 4px;
                color: #333;
            }
            .pdf-body li > ul, .pdf-body li > ol {
                margin-top: 4px;
                margin-bottom: 4px;
            }

            /* Code blocks - optimized for A4 */
            .pdf-body pre {
                background: #f6f8fa;
                border: 1px solid #e1e4e8;
                border-radius: 4px;
                padding: 12px;
                margin: 12px 0;
                font-size: 9pt;
                line-height: 1.4;
                overflow-x: visible;
                white-space: pre-wrap;
                word-wrap: break-word;
                word-break: break-all;
                page-break-inside: avoid;
                max-width: 100%;
            }
            .pdf-body code {
                font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                font-size: 9pt;
                background: #f0f0f0;
                padding: 1px 4px;
                border-radius: 3px;
            }
            .pdf-body pre code {
                background: none;
                padding: 0;
                font-size: 9pt;
            }

            /* Tables - fit A4 width */
            .pdf-body table {
                width: 100%;
                border-collapse: collapse;
                margin: 12px 0;
                font-size: 10pt;
                page-break-inside: avoid;
            }
            .pdf-body th, .pdf-body td {
                border: 1px solid #dee2e6;
                padding: 8px 10px;
                text-align: left;
                word-wrap: break-word;
            }
            .pdf-body th {
                background: #f8f9fa;
                font-weight: 600;
                font-size: 10pt;
            }
            .pdf-body td {
                font-size: 9pt;
            }

            /* Blockquotes */
            .pdf-body blockquote {
                border-left: 3px solid #0d6efd;
                margin: 12px 0;
                padding: 8px 16px;
                background: #f8f9fa;
                page-break-inside: avoid;
                font-style: italic;
                color: #555;
            }

            /* Diagrams and images */
            .pdf-body .diagram-container,
            .pdf-body .circuit-diagram,
            .pdf-body .state-diagram,
            .pdf-body .lb-architecture,
            .pdf-body .flow-diagram,
            .pdf-body svg {
                page-break-inside: avoid;
                margin: 16px 0;
                max-width: 100%;
                height: auto;
            }
            .pdf-body img {
                max-width: 100%;
                height: auto;
                page-break-inside: avoid;
            }

            /* Code block wrapper */
            .code-block-wrapper {
                position: relative;
                margin: 12px 0;
                page-break-inside: avoid;
            }

            /* Info boxes and callouts */
            .pdf-body .info-box,
            .pdf-body .warning-box,
            .pdf-body .note {
                padding: 10px 14px;
                margin: 12px 0;
                border-radius: 4px;
                page-break-inside: avoid;
            }

            /* Hide interactive elements */
            button, .btn, input, select, textarea,
            .code-run-btn, .code-copy-btn {
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

            /* Page break helpers */
            .page-break {
                page-break-before: always;
            }
            .no-break {
                page-break-inside: avoid;
            }

            /* Strong and emphasis */
            .pdf-body strong, .pdf-body b {
                font-weight: 600;
            }
            .pdf-body em, .pdf-body i {
                font-style: italic;
            }

            /* Links */
            .pdf-body a {
                color: #0d6efd;
                text-decoration: none;
            }

            /* Horizontal rules */
            .pdf-body hr {
                border: none;
                border-top: 1px solid #dee2e6;
                margin: 16px 0;
            }
        `;
        pdfContainer.prepend(pdfStyles);

        // Debug: log final container stats
        console.log('PDF Container created');
        console.log('Container HTML length:', pdfContainer.innerHTML.length);
        console.log('Container text length:', pdfContainer.textContent.length);
        console.log('Number of elements:', pdfContainer.querySelectorAll('*').length);

        // Temporarily add to DOM for rendering (hidden but on-screen for html2canvas)
        // Using opacity:0 and pointer-events:none instead of positioning off-screen
        // because html2canvas may not render off-screen content properly
        pdfContainer.style.position = 'fixed';
        pdfContainer.style.top = '0';
        pdfContainer.style.left = '50%';
        pdfContainer.style.transform = 'translateX(-50%)';
        pdfContainer.style.width = '680px';
        pdfContainer.style.opacity = '0';
        pdfContainer.style.pointerEvents = 'none';
        pdfContainer.style.backgroundColor = 'white';
        pdfContainer.style.zIndex = '-1000';
        document.body.appendChild(pdfContainer);

        // Give browser time to render and calculate layout
        await new Promise(resolve => setTimeout(resolve, 300));

        // DEBUG MODE: Uncomment to see content before PDF generation
        // pdfContainer.style.opacity = '1';
        // pdfContainer.style.zIndex = '10000';
        // pdfContainer.style.transform = 'translateX(-50%)';
        // return; // Stop here to inspect content

        // Generate filename
        let filename;
        if (selectedTopics.length === 1) {
            filename = `${selectedTopics[0].name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`;
        } else if (selectedTopics.length === allTopics.length) {
            filename = 'dsalgo-all-topics.pdf';
        } else {
            filename = `dsalgo-${selectedTopics.length}-topics.pdf`;
        }

        // PDF options optimized for A4
        const opt = {
            margin: [15, 15, 20, 15], // top, left, bottom, right - extra bottom for page number
            filename: filename,
            image: {
                type: 'jpeg',
                quality: 0.95
            },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                logging: true, // Enable logging for debugging
                width: 680,
                windowWidth: 680,
                scrollY: 0,
                scrollX: 0
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait',
                compress: true
            },
            pagebreak: {
                mode: ['avoid-all', 'css', 'legacy'],
                before: '.page-break',
                after: [],
                avoid: ['pre', 'blockquote', 'table', 'h1', 'h2', 'h3', 'h4', '.diagram-container', '.no-break', 'svg']
            }
        };

        // Generate PDF with page numbers
        console.log('Starting PDF generation...');
        const worker = html2pdf().set(opt).from(pdfContainer);

        // Convert to PDF and add page numbers
        await worker.toPdf().get('pdf').then(function(pdf) {
            console.log('PDF generated, adding page numbers...');
            const totalPages = pdf.internal.getNumberOfPages();
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            console.log(`Total pages: ${totalPages}`);

            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.setFontSize(9);
                pdf.setTextColor(128, 128, 128);

                // Add page number at bottom center
                const pageText = `Page ${i} of ${totalPages}`;
                const textWidth = pdf.getStringUnitWidth(pageText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
                const xPos = (pageWidth - textWidth) / 2;
                pdf.text(pageText, xPos, pageHeight - 10);

                // Add document title at bottom left (optional footer)
                pdf.setFontSize(8);
                const leftText = documentTitle.length > 40 ? documentTitle.substring(0, 37) + '...' : documentTitle;
                pdf.text(leftText, 15, pageHeight - 10);

                // Add "DSAlgo" at bottom right
                const rightText = 'DSAlgo Learning Platform';
                const rightTextWidth = pdf.getStringUnitWidth(rightText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
                pdf.text(rightText, pageWidth - rightTextWidth - 15, pageHeight - 10);
            }

            // Save the PDF
            console.log('Saving PDF as:', filename);
            pdf.save(filename);
        });

        // Remove temporary container
        document.body.removeChild(pdfContainer);

        // Close modal on success
        closePdfModal();

    } catch (error) {
        console.error('PDF generation failed:', error);

        // Show detailed error message to user
        let errorMessage = 'Failed to generate PDF.\n\n';
        if (error.message) {
            errorMessage += `Error: ${error.message}\n\n`;
        }
        errorMessage += 'Please check:\n';
        errorMessage += '- Your internet connection\n';
        errorMessage += '- The selected topics are accessible\n';
        errorMessage += '- Browser console for more details\n\n';
        errorMessage += 'If the problem persists, try selecting fewer topics or a single topic.';

        alert(errorMessage);
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

} // End of _pdfExportLoaded check
