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

        // Create PDF container with A4 dimensions and inline styles (for html2canvas compatibility)
        // 794px width at 96 DPI = 210mm (A4 width)
        // Content area: 794 - 113 (margins) = 681px for 180mm content width
        const pdfContainer = document.createElement('div');
        pdfContainer.className = 'pdf-export-container';

        // Apply inline styles to container for html2canvas
        pdfContainer.style.fontFamily = "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
        pdfContainer.style.color = '#1a1a2e';
        pdfContainer.style.background = 'white';
        pdfContainer.style.width = '680px';
        pdfContainer.style.maxWidth = '680px';
        pdfContainer.style.margin = '0 auto';
        pdfContainer.style.padding = '0';
        pdfContainer.style.fontSize = '11pt';
        pdfContainer.style.lineHeight = '1.5';
        pdfContainer.style.boxSizing = 'border-box';

        // Create header
        const pdfHeader = document.createElement('div');
        pdfHeader.style.textAlign = 'center';
        pdfHeader.style.marginBottom = '24px';
        pdfHeader.style.paddingBottom = '16px';
        pdfHeader.style.borderBottom = '2px solid #0d6efd';

        const headerTitle = document.createElement('h1');
        headerTitle.textContent = documentTitle;
        headerTitle.style.fontSize = '22pt';
        headerTitle.style.margin = '0 0 8px 0';
        headerTitle.style.color = '#1a1a2e';
        headerTitle.style.fontWeight = '600';

        const headerSubtitle = document.createElement('p');
        headerSubtitle.textContent = 'DSAlgo Learning Platform';
        headerSubtitle.style.color = '#6c757d';
        headerSubtitle.style.margin = '0';
        headerSubtitle.style.fontSize = '10pt';

        pdfHeader.appendChild(headerTitle);
        pdfHeader.appendChild(headerSubtitle);

        // Create body wrapper
        const pdfBody = document.createElement('div');
        pdfBody.style.lineHeight = '1.6';
        pdfBody.appendChild(pdfContent);

        pdfContainer.appendChild(pdfHeader);
        pdfContainer.appendChild(pdfBody);

        // Apply inline styles to all content elements recursively
        function applyInlineStyles(element) {
            if (!element || !element.tagName) return;

            const tag = element.tagName.toLowerCase();

            // Headings
            if (tag === 'h1') {
                element.style.fontSize = '18pt';
                element.style.margin = '24px 0 12px 0';
                element.style.color = '#1a1a2e';
                element.style.fontWeight = '600';
                element.style.pageBreakAfter = 'avoid';
            } else if (tag === 'h2') {
                element.style.fontSize = '14pt';
                element.style.margin = '20px 0 10px 0';
                element.style.color = '#1a1a2e';
                element.style.borderBottom = '1px solid #dee2e6';
                element.style.paddingBottom = '6px';
                element.style.fontWeight = '600';
                element.style.pageBreakAfter = 'avoid';
            } else if (tag === 'h3') {
                element.style.fontSize = '12pt';
                element.style.margin = '16px 0 8px 0';
                element.style.color = '#1a1a2e';
                element.style.fontWeight = '600';
                element.style.pageBreakAfter = 'avoid';
            } else if (tag === 'h4') {
                element.style.fontSize = '11pt';
                element.style.margin = '12px 0 6px 0';
                element.style.color = '#495057';
                element.style.fontWeight = '600';
                element.style.pageBreakAfter = 'avoid';
            }
            // Paragraphs
            else if (tag === 'p') {
                element.style.margin = '0 0 10px 0';
                element.style.color = '#333';
                element.style.textAlign = 'justify';
            }
            // Lists
            else if (tag === 'ul' || tag === 'ol') {
                element.style.margin = '0 0 12px 0';
                element.style.paddingLeft = '24px';
            } else if (tag === 'li') {
                element.style.marginBottom = '4px';
                element.style.color = '#333';
            }
            // Code blocks
            else if (tag === 'pre') {
                element.style.background = '#f6f8fa';
                element.style.border = '1px solid #e1e4e8';
                element.style.borderRadius = '4px';
                element.style.padding = '12px';
                element.style.margin = '12px 0';
                element.style.fontSize = '9pt';
                element.style.lineHeight = '1.4';
                element.style.overflowX = 'visible';
                element.style.whiteSpace = 'pre-wrap';
                element.style.wordWrap = 'break-word';
                element.style.wordBreak = 'break-all';
                element.style.pageBreakInside = 'avoid';
                element.style.maxWidth = '100%';
            } else if (tag === 'code') {
                element.style.fontFamily = "'Consolas', 'Monaco', 'Courier New', monospace";
                element.style.fontSize = '9pt';
                if (element.parentElement?.tagName !== 'PRE') {
                    element.style.background = '#f0f0f0';
                    element.style.padding = '1px 4px';
                    element.style.borderRadius = '3px';
                }
            }
            // Tables
            else if (tag === 'table') {
                element.style.width = '100%';
                element.style.borderCollapse = 'collapse';
                element.style.margin = '12px 0';
                element.style.fontSize = '10pt';
                element.style.pageBreakInside = 'avoid';
            } else if (tag === 'th' || tag === 'td') {
                element.style.border = '1px solid #dee2e6';
                element.style.padding = '8px 10px';
                element.style.textAlign = 'left';
                element.style.wordWrap = 'break-word';
                if (tag === 'th') {
                    element.style.background = '#f8f9fa';
                    element.style.fontWeight = '600';
                    element.style.fontSize = '10pt';
                } else {
                    element.style.fontSize = '9pt';
                }
            }
            // Blockquotes
            else if (tag === 'blockquote') {
                element.style.borderLeft = '3px solid #0d6efd';
                element.style.margin = '12px 0';
                element.style.padding = '8px 16px';
                element.style.background = '#f8f9fa';
                element.style.pageBreakInside = 'avoid';
                element.style.fontStyle = 'italic';
                element.style.color = '#555';
            }
            // Links
            else if (tag === 'a') {
                element.style.color = '#0d6efd';
                element.style.textDecoration = 'none';
            }
            // Horizontal rules
            else if (tag === 'hr') {
                element.style.border = 'none';
                element.style.borderTop = '1px solid #dee2e6';
                element.style.margin = '16px 0';
            }
            // Strong/Bold
            else if (tag === 'strong' || tag === 'b') {
                element.style.fontWeight = '600';
            }
            // Emphasis/Italic
            else if (tag === 'em' || tag === 'i') {
                element.style.fontStyle = 'italic';
            }
            // SVG and images
            else if (tag === 'svg' || tag === 'img') {
                element.style.maxWidth = '100%';
                element.style.height = 'auto';
                element.style.pageBreakInside = 'avoid';
            }

            // Apply to children
            Array.from(element.children).forEach(child => applyInlineStyles(child));
        }

        // Apply inline styles to all content
        applyInlineStyles(pdfBody);

        // Also apply to topic headings if present
        pdfContainer.querySelectorAll('.pdf-topic-heading').forEach(heading => {
            heading.style.marginTop = '32px';
            heading.style.marginBottom = '20px';
            heading.style.paddingTop = '16px';
            heading.style.borderTop = '2px solid #0d6efd';
            const h1 = heading.querySelector('h1');
            if (h1) {
                h1.style.fontSize = '20pt';
                h1.style.margin = '0';
                h1.style.color = '#0d6efd';
                h1.style.fontWeight = '600';
            }
        });

        // Debug: log final container stats
        console.log('PDF Container created');
        console.log('Container HTML length:', pdfContainer.innerHTML.length);
        console.log('Container text length:', pdfContainer.textContent.length);
        console.log('Number of elements:', pdfContainer.querySelectorAll('*').length);

        // Make container visible but in the background (no overlay)
        // Position it in a way that html2canvas can capture it but user doesn't see it
        pdfContainer.style.position = 'absolute';
        pdfContainer.style.top = '-99999px'; // Far off screen but still in document flow
        pdfContainer.style.left = '0';
        pdfContainer.style.width = '680px';
        pdfContainer.style.backgroundColor = 'white';
        pdfContainer.style.visibility = 'hidden'; // Hidden but still rendered
        pdfContainer.style.pointerEvents = 'none';

        document.body.appendChild(pdfContainer);

        // Force browser to render and calculate all styles
        // Multiple techniques to ensure everything is ready
        await new Promise(resolve => setTimeout(resolve, 100));

        // Force reflow to ensure all styles are applied
        pdfContainer.offsetHeight; // This forces a reflow

        // Use requestAnimationFrame to ensure rendering is complete
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

        // Wait a bit more for any dynamic content
        await new Promise(resolve => setTimeout(resolve, 500));

        console.log('Container rendered, preparing for PDF capture...');

        // Make it visible for html2canvas (but still off-screen)
        pdfContainer.style.visibility = 'visible';

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
                logging: false,
                width: 680,
                windowWidth: 680,
                scrollY: -window.scrollY,
                scrollX: -window.scrollX,
                y: 0,
                x: 0
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
        if (pdfContainer && pdfContainer.parentNode) {
            document.body.removeChild(pdfContainer);
        }

        // Close modal on success
        closePdfModal();

    } catch (error) {
        console.error('PDF generation failed:', error);

        // Clean up container on error
        const existingContainer = document.querySelector('.pdf-export-container');
        if (existingContainer && existingContainer.parentNode) {
            document.body.removeChild(existingContainer);
        }

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
