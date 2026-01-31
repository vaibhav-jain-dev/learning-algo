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

        // Create PDF generation job
        const response = await fetch('/api/pdf/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ topicPaths })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create PDF job');
        }

        const { jobId } = await response.json();
        console.log('PDF job created:', jobId);

        // Connect to WebSocket for progress updates
        const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${location.host}/ws/pdf/${jobId}`;

        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log('WebSocket connected for job:', jobId);
        };

        ws.onmessage = (event) => {
            try {
                const update = JSON.parse(event.data);
                console.log('PDF progress update:', update);

                // Handle completion
                if (update.status === 'completed') {
                    console.log('PDF generation completed!');

                    // Download the PDF
                    if (update.fileUrl) {
                        const link = document.createElement('a');
                        link.href = update.fileUrl;
                        link.download = '';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        closePdfModal();
                    }

                    if (ws) {
                        ws.close();
                    }
                }

                // Handle failure
                if (update.status === 'failed') {
                    throw new Error(update.error || 'PDF generation failed');
                }
            } catch (err) {
                console.error('Error processing WebSocket message:', err);
                throw err;
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            throw new Error('WebSocket connection failed');
        };

        ws.onclose = () => {
            console.log('WebSocket closed');
        };

    } catch (error) {
        console.error('PDF generation failed:', error);

        // Close WebSocket if open
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close();
        }

        // Show error to user
        alert(`Failed to generate PDF: ${error.message}\n\nPlease try again or select fewer topics.`);
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
