package main

import (
	"bytes"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer/html"
)

func main() {
	topicsDir := "../topics"

	md := goldmark.New(
		goldmark.WithExtensions(extension.GFM),
		goldmark.WithParserOptions(
			parser.WithAutoHeadingID(),
		),
		goldmark.WithRendererOptions(
			html.WithHardWraps(),
			html.WithXHTML(),
			html.WithUnsafe(),
		),
	)

	var converted, failed int

	err := filepath.Walk(topicsDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if info.IsDir() || filepath.Ext(path) != ".md" {
			return nil
		}

		// Read markdown file
		mdContent, err := os.ReadFile(path)
		if err != nil {
			fmt.Printf("ERROR reading %s: %v\n", path, err)
			failed++
			return nil
		}

		// Convert to HTML
		var buf bytes.Buffer
		if err := md.Convert(mdContent, &buf); err != nil {
			fmt.Printf("ERROR converting %s: %v\n", path, err)
			failed++
			return nil
		}

		// Strip ONLY border styles, keep everything else (backgrounds, colors, grids, etc.)
		htmlContent := stripOnlyBorderStyles(buf.String())

		// Write HTML file (same name but .html extension)
		htmlPath := strings.TrimSuffix(path, ".md") + ".html"
		if err := os.WriteFile(htmlPath, []byte(htmlContent), 0644); err != nil {
			fmt.Printf("ERROR writing %s: %v\n", htmlPath, err)
			failed++
			return nil
		}

		fmt.Printf("Converted: %s -> %s\n", path, htmlPath)
		converted++
		return nil
	})

	if err != nil {
		fmt.Printf("Walk error: %v\n", err)
	}

	fmt.Printf("\n=== SUMMARY ===\n")
	fmt.Printf("Converted: %d files\n", converted)
	fmt.Printf("Failed: %d files\n", failed)
}

// stripOnlyBorderStyles removes ONLY border-related properties from inline styles
// Keeps: background, color, display, grid, flex, padding, margin, font, etc.
func stripOnlyBorderStyles(html string) string {
	styleRegex := regexp.MustCompile(`style\s*=\s*"([^"]*)"`)

	return styleRegex.ReplaceAllStringFunc(html, func(match string) string {
		styleMatch := styleRegex.FindStringSubmatch(match)
		if len(styleMatch) < 2 {
			return match
		}

		styleContent := styleMatch[1]

		// Remove ONLY border-related properties (but keep border-radius)
		// Match: border, border-top, border-right, border-bottom, border-left,
		// border-width, border-style, border-color
		borderRegex := regexp.MustCompile(`\s*border(?:-(?:top|right|bottom|left))?(?:-(?:width|style|color))?\s*:\s*[^;]+;?\s*`)

		cleanedStyle := borderRegex.ReplaceAllString(styleContent, "")

		// Trim whitespace and semicolons
		cleanedStyle = strings.TrimSpace(cleanedStyle)
		cleanedStyle = strings.Trim(cleanedStyle, ";")

		// If no styles remain, remove the style attribute entirely
		if cleanedStyle == "" {
			return ""
		}

		return `style="` + cleanedStyle + `"`
	})
}
