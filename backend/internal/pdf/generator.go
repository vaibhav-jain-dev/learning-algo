package pdf

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
	"github.com/google/uuid"
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
				m.updateJob(jobID, "failed", 0, fmt.Sprintf("Panic: %v", r), "")
			}
		}()

		// Update to processing
		m.updateJob(jobID, "processing", 10, "Initializing PDF generation...", "")

		// Build URL to print view
		topicsQuery := ""
		for i, path := range topicPaths {
			if i > 0 {
				topicsQuery += ","
			}
			topicsQuery += path
		}
		printURL := fmt.Sprintf("%s/pdf/print?topics=%s", m.baseURL, topicsQuery)

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
		err := m.generatePDF(jobID, printURL, pdfPath)
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

// generatePDF uses chromedp to navigate to URL and generate PDF
func (m *Manager) generatePDF(jobID, url, outputPath string) error {
	m.updateJob(jobID, "processing", 30, "Launching browser...", "")

	// Create context
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	// Set timeout
	ctx, cancel = context.WithTimeout(ctx, 2*time.Minute)
	defer cancel()

	m.updateJob(jobID, "processing", 50, "Rendering content...", "")

	var buf []byte
	err := chromedp.Run(ctx,
		chromedp.Navigate(url),
		chromedp.Sleep(2*time.Second), // Let content render fully
		chromedp.ActionFunc(func(ctx context.Context) error {
			var err error
			buf, _, err = page.PrintToPDF().
				WithPrintBackground(true).
				WithPreferCSSPageSize(true).
				WithPaperWidth(8.27).  // A4 width in inches
				WithPaperHeight(11.69). // A4 height in inches
				WithMarginTop(0.59).    // 15mm
				WithMarginBottom(0.79). // 20mm
				WithMarginLeft(0.59).   // 15mm
				WithMarginRight(0.59).  // 15mm
				WithDisplayHeaderFooter(true).
				WithHeaderTemplate("<div></div>"). // Empty header
				WithFooterTemplate(`<div style="font-size:8px; text-align:center; width:100%; margin:0 auto;">
					<span style="float:left; margin-left:15mm;"></span>
					<span style="margin:0 auto;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
					<span style="float:right; margin-right:15mm;">DSAlgo Learning Platform</span>
				</div>`).
				Do(ctx)
			return err
		}),
	)

	if err != nil {
		return fmt.Errorf("chromedp error: %w", err)
	}

	m.updateJob(jobID, "processing", 80, "Saving PDF file...", "")

	// Write PDF to file
	if err := os.WriteFile(outputPath, buf, 0644); err != nil {
		return fmt.Errorf("failed to write PDF: %w", err)
	}

	return nil
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
