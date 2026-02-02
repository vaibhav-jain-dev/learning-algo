package main

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

func main() {
	topicsDir := "../topics"

	var processed, failed int

	err := filepath.Walk(topicsDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if info.IsDir() || filepath.Ext(path) != ".html" {
			return nil
		}

		// Read HTML file
		content, err := os.ReadFile(path)
		if err != nil {
			fmt.Printf("ERROR reading %s: %v\n", path, err)
			failed++
			return nil
		}

		// Strip ALL inline styles
		cleanedContent := stripAllInlineStyles(string(content))

		// Write back
		if err := os.WriteFile(path, []byte(cleanedContent), 0644); err != nil {
			fmt.Printf("ERROR writing %s: %v\n", path, err)
			failed++
			return nil
		}

		fmt.Printf("Cleaned: %s\n", path)
		processed++
		return nil
	})

	if err != nil {
		fmt.Printf("Walk error: %v\n", err)
	}

	fmt.Printf("\n=== SUMMARY ===\n")
	fmt.Printf("Processed: %d files\n", processed)
	fmt.Printf("Failed: %d files\n", failed)
}

// stripAllInlineStyles removes ALL style attributes from HTML
func stripAllInlineStyles(html string) string {
	// Remove style="..." attributes entirely
	styleRegex := regexp.MustCompile(`\s*style\s*=\s*"[^"]*"`)
	html = styleRegex.ReplaceAllString(html, "")

	// Also remove style='...' (single quotes)
	styleSingleRegex := regexp.MustCompile(`\s*style\s*=\s*'[^']*'`)
	html = styleSingleRegex.ReplaceAllString(html, "")

	// Clean up any resulting empty tag attributes
	html = strings.ReplaceAll(html, "  >", ">")
	html = strings.ReplaceAll(html, " >", ">")

	return html
}
