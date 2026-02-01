package pdf

import (
	"bytes"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/jung-kurt/gofpdf"
	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/ast"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/text"
)

// Job represents a PDF generation job
type Job struct {
	ID          string
	TopicPaths  []string
	Status      string // "pending", "processing", "completed", "failed"
	Progress    int    // 0-100
	Error       string
	FilePath    string
	CreatedAt   time.Time
	UpdatedAt   time.Time
	subscribers []chan JobUpdate
	mu          sync.RWMutex
}

// GetStatus returns the job status safely
func (j *Job) GetStatus() string {
	j.mu.RLock()
	defer j.mu.RUnlock()
	return j.Status
}

// GetFilePath returns the job file path safely
func (j *Job) GetFilePath() string {
	j.mu.RLock()
	defer j.mu.RUnlock()
	return j.FilePath
}

// JobUpdate represents a status update for a job
type JobUpdate struct {
	Status   string `json:"status"`
	Progress int    `json:"progress"`
	Message  string `json:"message"`
	Error    string `json:"error,omitempty"`
	FileURL  string `json:"fileUrl,omitempty"`
}

// Manager manages PDF generation jobs
type Manager struct {
	jobs    map[string]*Job
	mu      sync.RWMutex
	baseURL string
	pdfDir  string
}

// NewManager creates a new PDF job manager
func NewManager(baseURL, pdfDir string) *Manager {
	m := &Manager{
		jobs:    make(map[string]*Job),
		baseURL: baseURL,
		pdfDir:  pdfDir,
	}

	// Ensure PDF directory exists
	os.MkdirAll(pdfDir, 0755)

	// Start cleanup goroutine
	go m.cleanupExpiredJobs()

	return m
}

// CreateJob creates a new PDF generation job
func (m *Manager) CreateJob(topicPaths []string) *Job {
	m.mu.Lock()
	defer m.mu.Unlock()

	job := &Job{
		ID:          uuid.New().String(),
		TopicPaths:  topicPaths,
		Status:      "pending",
		Progress:    0,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
		subscribers: make([]chan JobUpdate, 0),
	}

	m.jobs[job.ID] = job
	return job
}

// GetJob retrieves a job by ID
func (m *Manager) GetJob(id string) (*Job, bool) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	job, ok := m.jobs[id]
	return job, ok
}

// Subscribe to job updates
func (m *Manager) Subscribe(jobID string) (chan JobUpdate, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	job, ok := m.jobs[jobID]
	if !ok {
		return nil, fmt.Errorf("job not found")
	}

	ch := make(chan JobUpdate, 10)
	job.mu.Lock()
	job.subscribers = append(job.subscribers, ch)
	job.mu.Unlock()

	return ch, nil
}

// ProcessJob starts processing a PDF generation job
func (m *Manager) ProcessJob(jobID string, topicPaths []string) {
	job, ok := m.GetJob(jobID)
	if !ok {
		return
	}

	go func() {
		defer func() {
			if r := recover(); r != nil {
				m.updateJob(jobID, "failed", 0, "", fmt.Sprintf("Panic: %v", r))
			}
		}()

		// Update to processing
		m.updateJob(jobID, "processing", 10, "Initializing PDF generation...", "")

		// Generate filename
		filename := "dsalgo-topics.pdf"
		if len(topicPaths) == 1 {
			parts := strings.Split(topicPaths[0], "/")
			if len(parts) == 2 {
				filename = strings.ToLower(strings.ReplaceAll(parts[1], " ", "-")) + ".pdf"
			}
		} else {
			filename = fmt.Sprintf("dsalgo-%d-topics.pdf", len(topicPaths))
		}

		// Generate PDF
		pdfPath := filepath.Join(m.pdfDir, filename)
		err := m.generatePDF(jobID, topicPaths, pdfPath)
		if err != nil {
			m.updateJob(jobID, "failed", 0, "", err.Error())
			return
		}

		// Complete
		job.mu.Lock()
		job.FilePath = pdfPath
		job.mu.Unlock()

		fileURL := fmt.Sprintf("/api/pdf/download/%s", jobID)
		m.updateJob(jobID, "completed", 100, "PDF generated successfully!", fileURL)
	}()
}

// generatePDF creates a PDF directly from markdown files (no browser needed)
func (m *Manager) generatePDF(jobID string, topicPaths []string, outputPath string) error {
	m.updateJob(jobID, "processing", 20, "Reading topic content...", "")

	if len(topicPaths) == 0 {
		return fmt.Errorf("no topics provided")
	}

	// Create PDF with A4 size
	pdf := gofpdf.New("P", "mm", "A4", "")
	pdf.SetMargins(15, 15, 15)
	pdf.SetAutoPageBreak(true, 20)

	// Set up document metadata
	pdf.SetAuthor("DSAlgo Learning Platform", true)
	pdf.SetCreator("DSAlgo Platform", true)
	pdf.SetTitle("DSAlgo Topics Export", true)

	// Add page numbers in footer
	pdf.SetFooterFunc(func() {
		pdf.SetY(-15)
		pdf.SetFont("Arial", "I", 8)
		pdf.SetTextColor(128, 128, 128)
		pdf.CellFormat(0, 10, fmt.Sprintf("Page %d", pdf.PageNo()), "", 0, "C", false, 0, "")
	})

	processedTopics := 0

	// Process each topic
	for i, topicPath := range topicPaths {
		m.updateJob(jobID, "processing", 30+int(float64(i)/float64(len(topicPaths))*40),
			fmt.Sprintf("Processing topic %d/%d: %s", i+1, len(topicPaths), topicPath), "")

		// Read markdown content
		parts := strings.Split(topicPath, "/")
		if len(parts) != 2 {
			m.updateJob(jobID, "processing", 30+int(float64(i)/float64(len(topicPaths))*40),
				fmt.Sprintf("Skipping invalid topic path: %s", topicPath), "")
			continue
		}
		category := parts[0]
		topic := parts[1]

		contentPath := filepath.Join("./topics", category, topic, "content.md")
		mdContent, err := os.ReadFile(contentPath)
		if err != nil {
			return fmt.Errorf("failed to read %s at %s: %w", topicPath, contentPath, err)
		}

		if len(mdContent) == 0 {
			m.updateJob(jobID, "processing", 30+int(float64(i)/float64(len(topicPaths))*40),
				fmt.Sprintf("Warning: %s has no content", topicPath), "")
			continue
		}

		// Add new page for each topic
		pdf.AddPage()

		// Add topic title
		topicTitle := formatTopicName(topic)
		m.renderTopicToPDF(pdf, topicTitle, string(mdContent))
		processedTopics++
	}

	if processedTopics == 0 {
		return fmt.Errorf("no topics were successfully processed")
	}

	m.updateJob(jobID, "processing", 80, "Finalizing PDF...", "")

	// Check for PDF errors before saving
	if err := pdf.Error(); err != nil {
		return fmt.Errorf("PDF generation error: %w", err)
	}

	// Save PDF
	err := pdf.OutputFileAndClose(outputPath)
	if err != nil {
		return fmt.Errorf("failed to save PDF to %s: %w", outputPath, err)
	}

	// Verify file was created and has content
	info, err := os.Stat(outputPath)
	if err != nil {
		return fmt.Errorf("PDF file not created: %w", err)
	}
	if info.Size() == 0 {
		return fmt.Errorf("PDF file is empty")
	}

	m.updateJob(jobID, "processing", 90, fmt.Sprintf("PDF created successfully (%d KB, %d topics)", info.Size()/1024, processedTopics), "")

	return nil
}

// renderTopicToPDF renders a single topic's markdown content to PDF
func (m *Manager) renderTopicToPDF(pdf *gofpdf.Fpdf, title, markdown string) {
	// Add topic title
	pdf.SetFont("Arial", "B", 16)
	pdf.SetTextColor(13, 110, 253) // Bootstrap blue
	pdf.CellFormat(0, 10, title, "", 1, "L", false, 0, "")
	pdf.Ln(5)

	// Parse markdown
	md := goldmark.New(
		goldmark.WithExtensions(extension.GFM),
	)

	reader := text.NewReader([]byte(markdown))
	doc := md.Parser().Parse(reader)

	// Walk the AST and render each node
	m.renderNode(pdf, doc, []byte(markdown))
}

// renderNode recursively renders markdown nodes to PDF
func (m *Manager) renderNode(pdf *gofpdf.Fpdf, node ast.Node, source []byte) {
	ast.Walk(node, func(n ast.Node, entering bool) (ast.WalkStatus, error) {
		if !entering {
			return ast.WalkContinue, nil
		}

		switch n := n.(type) {
		case *ast.Heading:
			level := n.Level
			text := m.sanitizeText(string(n.Text(source)))

			if text == "" {
				return ast.WalkSkipChildren, nil
			}

			pdf.Ln(3)
			switch level {
			case 1:
				pdf.SetFont("Arial", "B", 14)
				pdf.SetTextColor(26, 26, 46)
			case 2:
				pdf.SetFont("Arial", "B", 12)
				pdf.SetTextColor(26, 26, 46)
			default:
				pdf.SetFont("Arial", "B", 11)
				pdf.SetTextColor(73, 80, 87)
			}
			pdf.MultiCell(0, 6, text, "", "L", false)
			pdf.Ln(2)
			pdf.SetFont("Arial", "", 10)
			pdf.SetTextColor(51, 51, 51)
			return ast.WalkSkipChildren, nil

		case *ast.Paragraph:
			text := m.extractText(n, source)
			text = m.sanitizeText(text)

			if text == "" {
				return ast.WalkSkipChildren, nil
			}

			pdf.SetFont("Arial", "", 10)
			pdf.SetTextColor(51, 51, 51)
			pdf.MultiCell(0, 5, text, "", "J", false)
			pdf.Ln(2)
			return ast.WalkSkipChildren, nil

		case *ast.HTMLBlock:
			// Extract text from HTML blocks (strips tags)
			html := string(n.Text(source))
			text := m.stripHTML(html)
			text = m.sanitizeText(text)

			if text != "" {
				pdf.SetFont("Arial", "", 10)
				pdf.SetTextColor(51, 51, 51)
				pdf.MultiCell(0, 5, text, "", "L", false)
				pdf.Ln(1)
			}
			return ast.WalkSkipChildren, nil

		case *ast.RawHTML:
			// Handle inline HTML - extract text only
			html := string(n.Segments.Value(source))
			text := m.stripHTML(html)
			text = m.sanitizeText(text)

			if text != "" {
				pdf.SetFont("Arial", "", 10)
				pdf.SetTextColor(51, 51, 51)
				pdf.Write(5, text)
			}
			return ast.WalkSkipChildren, nil

		case *ast.CodeBlock:
			code := string(n.Text(source))
			pdf.Ln(2)
			pdf.SetFillColor(246, 248, 250)
			pdf.SetTextColor(33, 37, 41)
			pdf.SetFont("Courier", "", 9)

			// Split code into lines to handle long lines
			lines := strings.Split(code, "\n")
			for _, line := range lines {
				if line != "" {
					// Truncate very long lines
					if len(line) > 85 {
						line = line[:82] + "..."
					}
					pdf.CellFormat(0, 5, line, "", 1, "L", true, 0, "")
				}
			}
			pdf.Ln(2)
			pdf.SetFont("Arial", "", 10)
			pdf.SetTextColor(51, 51, 51)
			return ast.WalkSkipChildren, nil

		case *ast.FencedCodeBlock:
			code := string(n.Text(source))
			lang := string(n.Language(source))

			pdf.Ln(2)
			// Code block header with language
			if lang != "" {
				pdf.SetFont("Arial", "I", 8)
				pdf.SetTextColor(108, 117, 125)
				pdf.Cell(0, 4, lang)
				pdf.Ln(4)
			}

			pdf.SetFillColor(246, 248, 250)
			pdf.SetTextColor(33, 37, 41)
			pdf.SetFont("Courier", "", 9)

			lines := strings.Split(code, "\n")
			for _, line := range lines {
				if line != "" {
					if len(line) > 85 {
						line = line[:82] + "..."
					}
					pdf.CellFormat(0, 5, line, "", 1, "L", true, 0, "")
				}
			}
			pdf.Ln(2)
			pdf.SetFont("Arial", "", 10)
			pdf.SetTextColor(51, 51, 51)
			return ast.WalkSkipChildren, nil

		case *ast.List:
			pdf.Ln(1)
			return ast.WalkContinue, nil

		case *ast.ListItem:
			text := m.extractText(n, source)
			// Clean up the text
			text = strings.TrimSpace(text)
			text = strings.ReplaceAll(text, "\n", " ")

			pdf.SetFont("Arial", "", 10)
			pdf.SetTextColor(51, 51, 51)

			// Add bullet point
			currentX := pdf.GetX()
			pdf.SetX(currentX + 5)
			pdf.Cell(5, 5, "•")
			pdf.SetX(currentX + 10)

			// Handle multi-line list items
			pdf.MultiCell(0, 5, text, "", "L", false)
			return ast.WalkSkipChildren, nil

		case *ast.Blockquote:
			text := m.extractText(n, source)
			pdf.Ln(2)
			pdf.SetFillColor(248, 249, 250)
			pdf.SetTextColor(85, 85, 85)
			pdf.SetFont("Arial", "I", 10)
			pdf.SetLeftMargin(20)
			pdf.MultiCell(0, 5, text, "", "L", true)
			pdf.SetLeftMargin(15)
			pdf.Ln(2)
			pdf.SetFont("Arial", "", 10)
			pdf.SetTextColor(51, 51, 51)
			return ast.WalkSkipChildren, nil

		case *ast.ThematicBreak:
			pdf.Ln(2)
			pdf.SetDrawColor(222, 226, 230)
			pdf.SetLineWidth(0.5)
			pdf.Line(15, pdf.GetY(), 195, pdf.GetY())
			pdf.Ln(3)
			return ast.WalkContinue, nil
		}

		return ast.WalkContinue, nil
	})
}

// extractText extracts plain text from a node and its children
func (m *Manager) extractText(node ast.Node, source []byte) string {
	var buf bytes.Buffer

	ast.Walk(node, func(n ast.Node, entering bool) (ast.WalkStatus, error) {
		if !entering {
			return ast.WalkContinue, nil
		}

		switch n := n.(type) {
		case *ast.Text:
			buf.Write(n.Segment.Value(source))
			if n.HardLineBreak() || n.SoftLineBreak() {
				buf.WriteString(" ")
			}
		case *ast.String:
			buf.Write(n.Value)
		case *ast.CodeSpan:
			buf.Write(n.Text(source))
		}

		return ast.WalkContinue, nil
	})

	text := buf.String()
	// Clean up text
	text = regexp.MustCompile(`\s+`).ReplaceAllString(text, " ")
	text = strings.TrimSpace(text)

	return text
}

// formatTopicName converts a slug to a readable title
func formatTopicName(slug string) string {
	words := strings.Split(slug, "-")
	for i, word := range words {
		if len(word) > 0 {
			words[i] = strings.ToUpper(word[:1]) + word[1:]
		}
	}
	return strings.Join(words, " ")
}

// stripHTML removes HTML tags from text while preserving content
func (m *Manager) stripHTML(html string) string {
	// Remove style blocks entirely
	html = regexp.MustCompile(`(?s)<style[^>]*>.*?</style>`).ReplaceAllString(html, "")

	// Remove script blocks entirely
	html = regexp.MustCompile(`(?s)<script[^>]*>.*?</script>`).ReplaceAllString(html, "")

	// Remove HTML comments
	html = regexp.MustCompile(`(?s)<!--.*?-->`).ReplaceAllString(html, "")

	// Replace <br> and <br/> with newlines
	html = regexp.MustCompile(`<br\s*/?>`).ReplaceAllString(html, "\n")

	// Replace </li>, </p>, </div>, </h1-6> with newlines
	html = regexp.MustCompile(`</(li|p|div|h[1-6]|tr)>`).ReplaceAllString(html, "\n")

	// Remove all other HTML tags
	html = regexp.MustCompile(`<[^>]+>`).ReplaceAllString(html, " ")

	// Decode common HTML entities
	html = strings.ReplaceAll(html, "&nbsp;", " ")
	html = strings.ReplaceAll(html, "&amp;", "&")
	html = strings.ReplaceAll(html, "&lt;", "<")
	html = strings.ReplaceAll(html, "&gt;", ">")
	html = strings.ReplaceAll(html, "&quot;", "\"")
	html = strings.ReplaceAll(html, "&#8226;", "•")
	html = strings.ReplaceAll(html, "&#8595;", "↓")
	html = strings.ReplaceAll(html, "&rarr;", "→")
	html = strings.ReplaceAll(html, "&larr;", "←")

	return html
}

// sanitizeText removes or replaces problematic characters for PDF rendering
func (m *Manager) sanitizeText(text string) string {
	// Remove null bytes and other control characters except newlines and tabs
	text = strings.Map(func(r rune) rune {
		if r == '\n' || r == '\t' || r == '\r' {
			return r
		}
		if r < 32 {
			return -1 // Remove control characters
		}
		// Replace common problematic characters
		switch r {
		case '\u0000': // NULL
			return -1
		case '\ufeff': // BOM
			return -1
		case '\u200b', '\u200c', '\u200d': // Zero-width characters
			return -1
		}
		return r
	}, text)

	// Clean up excessive whitespace
	text = regexp.MustCompile(`\s+`).ReplaceAllString(text, " ")
	text = strings.TrimSpace(text)

	return text
}

// updateJob updates a job's status and notifies subscribers
func (m *Manager) updateJob(jobID, status string, progress int, message, errorMsg string) {
	m.mu.Lock()
	job, ok := m.jobs[jobID]
	m.mu.Unlock()

	if !ok {
		return
	}

	job.mu.Lock()
	job.Status = status
	job.Progress = progress
	job.UpdatedAt = time.Now()
	if errorMsg != "" {
		job.Error = errorMsg
	}

	update := JobUpdate{
		Status:   status,
		Progress: progress,
		Message:  message,
		Error:    errorMsg,
	}

	if status == "completed" && job.FilePath != "" {
		update.FileURL = fmt.Sprintf("/api/pdf/download/%s", jobID)
	}

	// Notify all subscribers
	for _, ch := range job.subscribers {
		select {
		case ch <- update:
		default:
			// Channel full, skip
		}
	}
	job.mu.Unlock()
}

// cleanupExpiredJobs removes jobs older than 5 minutes
func (m *Manager) cleanupExpiredJobs() {
	ticker := time.NewTicker(1 * time.Minute)
	defer ticker.Stop()

	for range ticker.C {
		m.mu.Lock()
		now := time.Now()
		for id, job := range m.jobs {
			job.mu.RLock()
			age := now.Sub(job.CreatedAt)
			filePath := job.FilePath
			job.mu.RUnlock()

			if age > 5*time.Minute {
				// Close all subscriber channels
				job.mu.Lock()
				for _, ch := range job.subscribers {
					close(ch)
				}
				job.subscribers = nil
				job.mu.Unlock()

				// Delete PDF file if exists
				if filePath != "" {
					os.Remove(filePath)
				}

				// Remove job
				delete(m.jobs, id)
			}
		}
		m.mu.Unlock()
	}
}
