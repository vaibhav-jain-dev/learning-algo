package pdf

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
	"time"

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

// generatePDF uses wkhtmltopdf to generate PDF with full HTML/CSS support (colors, gradients, etc.)
func (m *Manager) generatePDF(jobID string, topicPaths []string, outputPath string) error {
	m.updateJob(jobID, "processing", 20, "Building PDF URL...", "")

	if len(topicPaths) == 0 {
		return fmt.Errorf("no topics provided")
	}

	// Build URL to print view
	topicsQuery := ""
	for i, path := range topicPaths {
		if i > 0 {
			topicsQuery += ","
		}
		topicsQuery += path
	}

	// Use baseURL to generate the print view URL
	printURL := fmt.Sprintf("%s/pdf/print?topics=%s", m.baseURL, topicsQuery)

	m.updateJob(jobID, "processing", 40, fmt.Sprintf("Generating PDF from %s...", printURL), "")

	// Use wkhtmltopdf to generate PDF (WebKit-based, NOT Chromium)
	// This preserves ALL colors, gradients, and CSS styling
	cmd := exec.Command("wkhtmltopdf",
		"--page-size", "A4",
		"--margin-top", "15mm",
		"--margin-bottom", "20mm",
		"--margin-left", "15mm",
		"--margin-right", "15mm",
		"--footer-center", "Page [page] of [topage]",
		"--footer-font-size", "8",
		"--footer-spacing", "5",
		"--enable-local-file-access",
		"--no-stop-slow-scripts",
		"--javascript-delay", "2000", // Wait 2s for content to load
		printURL,
		outputPath,
	)

	// Capture output for debugging
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("wkhtmltopdf failed: %w\nOutput: %s", err, string(output))
	}

	m.updateJob(jobID, "processing", 80, "Verifying PDF...", "")

	// Verify file was created and has content
	info, err := os.Stat(outputPath)
	if err != nil {
		return fmt.Errorf("PDF file not created: %w", err)
	}
	if info.Size() == 0 {
		return fmt.Errorf("PDF file is empty")
	}

	m.updateJob(jobID, "processing", 90, fmt.Sprintf("PDF created successfully (%d KB, %d topics)", info.Size()/1024, len(topicPaths)), "")

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
