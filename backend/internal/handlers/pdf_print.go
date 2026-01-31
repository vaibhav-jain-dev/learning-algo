package handlers

import (
	"bytes"
	"os"
	"path/filepath"
	"strings"

	"github.com/gofiber/fiber/v2"
)

// PDFPrintView renders topics in a print-optimized format for chromedp
func (h *Handlers) PDFPrintView(c *fiber.Ctx) error {
	// Get topic paths from query parameter
	paths := c.Query("topics")
	if paths == "" {
		return c.Status(400).SendString("No topics specified")
	}

	topicPaths := strings.Split(paths, ",")

	// Build content for each topic
	var topics []fiber.Map
	for _, topicPath := range topicPaths {
		parts := strings.Split(topicPath, "/")
		if len(parts) != 2 {
			continue
		}

		category := parts[0]
		topic := parts[1]

		// Load markdown content
		contentPath := filepath.Join(topicsDir, category, topic, "content.md")
		mdContent, err := os.ReadFile(contentPath)
		if err != nil {
			continue
		}

		// Convert to HTML
		var buf bytes.Buffer
		if err := h.md.Convert(mdContent, &buf); err != nil {
			continue
		}

		topics = append(topics, fiber.Map{
			"Title":   formatName(topic),
			"Content": buf.String(),
		})
	}

	if len(topics) == 0 {
		return c.Status(404).SendString("No topics found")
	}

	// Determine document title
	var documentTitle string
	if len(topics) == 1 {
		documentTitle = topics[0]["Title"].(string)
	} else {
		documentTitle = formatName(topicPaths[0])
		if len(topics) > 1 {
			documentTitle = documentTitle + " and " + formatName(topicPaths[len(topicPaths)-1])
		}
		if len(topics) > 2 {
			documentTitle = formatName(topicPaths[0]) + " +" + string(rune(len(topics)-1)) + " more"
		}
	}

	return c.Render("pages/pdf-print", fiber.Map{
		"Title":         documentTitle,
		"DocumentTitle": documentTitle,
		"Topics":        topics,
		"TopicCount":    len(topics),
	}, "layouts/pdf")
}
