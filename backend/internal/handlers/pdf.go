package handlers

import (
	"fmt"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

// GeneratePDFRequest represents the request to generate a PDF
type GeneratePDFRequest struct {
	TopicPaths []string `json:"topicPaths"`
}

// GeneratePDFResponse represents the response from creating a PDF job
type GeneratePDFResponse struct {
	JobID string `json:"jobId"`
}

// GeneratePDF creates a new PDF generation job
func (h *Handlers) GeneratePDF(c *fiber.Ctx) error {
	var req GeneratePDFRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	if len(req.TopicPaths) == 0 {
		return c.Status(400).JSON(fiber.Map{"error": "No topics selected"})
	}

	// Create job
	job := h.pdfManager.CreateJob(req.TopicPaths)

	// Start processing in background (chromedp will navigate to /pdf/print route)
	h.pdfManager.ProcessJob(job.ID, req.TopicPaths)

	return c.JSON(GeneratePDFResponse{
		JobID: job.ID,
	})
}

// PDFWebSocket handles WebSocket connections for PDF job updates
func (h *Handlers) PDFWebSocket(c *websocket.Conn) {
	jobID := c.Params("jobId")

	// Subscribe to job updates
	updates, err := h.pdfManager.Subscribe(jobID)
	if err != nil {
		c.WriteJSON(fiber.Map{"error": "Job not found"})
		return
	}

	// Send updates to client
	for update := range updates {
		if err := c.WriteJSON(update); err != nil {
			break
		}

		// Close connection after completion or failure
		if update.Status == "completed" || update.Status == "failed" {
			break
		}
	}
}

// DownloadPDF serves the generated PDF file
func (h *Handlers) DownloadPDF(c *fiber.Ctx) error {
	jobID := c.Params("jobId")

	job, ok := h.pdfManager.GetJob(jobID)
	if !ok {
		return c.Status(404).JSON(fiber.Map{"error": "Job not found"})
	}

	status := job.GetStatus()
	filePath := job.GetFilePath()

	if status != "completed" {
		return c.Status(400).JSON(fiber.Map{"error": "PDF not ready yet"})
	}

	if filePath == "" {
		return c.Status(404).JSON(fiber.Map{"error": "PDF file not found"})
	}

	// Set headers for download
	c.Set("Content-Type", "application/pdf")
	c.Set("Content-Disposition", fmt.Sprintf("attachment; filename=%s", filepath.Base(filePath)))

	return c.SendFile(filePath)
}
