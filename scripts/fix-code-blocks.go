package main

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

func main() {
	topicsDir := "./topics"

	var fixed int
	var totalCodeBlocks int

	err := filepath.Walk(topicsDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if info.Name() != "content.html" {
			return nil
		}

		content, err := os.ReadFile(path)
		if err != nil {
			return err
		}

		originalContent := string(content)
		fixedContent := fixCodeBlocks(originalContent)

		if fixedContent != originalContent {
			if err := os.WriteFile(path, []byte(fixedContent), 0644); err != nil {
				return err
			}
			fixed++
			fmt.Printf("Fixed: %s\n", path)
		}

		// Count code blocks for stats
		codeBlockCount := strings.Count(fixedContent, "<pre><code")
		totalCodeBlocks += codeBlockCount

		return nil
	})

	if err != nil {
		fmt.Printf("Error: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\n=== Summary ===\n")
	fmt.Printf("Files fixed: %d\n", fixed)
	fmt.Printf("Total code blocks: %d\n", totalCodeBlocks)
}

func fixCodeBlocks(html string) string {
	// Pattern to match <pre><code>...</code></pre> blocks
	// This regex captures the content between <pre><code> and </code></pre>
	preCodeRegex := regexp.MustCompile(`(?s)<pre><code([^>]*)>(.*?)</code></pre>`)

	return preCodeRegex.ReplaceAllStringFunc(html, func(match string) string {
		// Extract existing class if any
		classMatch := regexp.MustCompile(`class="([^"]*)"`)
		existingClass := ""
		if m := classMatch.FindStringSubmatch(match); len(m) > 1 {
			existingClass = m[1]
		}

		// Extract the content between <pre><code> and </code></pre>
		contentMatch := regexp.MustCompile(`(?s)<pre><code[^>]*>(.*?)</code></pre>`)
		contentMatches := contentMatch.FindStringSubmatch(match)
		if len(contentMatches) < 2 {
			return match
		}
		content := contentMatches[1]

		// Check if content starts with markdown fence (with potential whitespace)
		fenceRegex := regexp.MustCompile(`(?s)^[\s]*` + "```" + `(\w*)\s*\n(.*?)\n[\s]*` + "```" + `[\s]*$`)
		if fenceMatches := fenceRegex.FindStringSubmatch(content); len(fenceMatches) >= 3 {
			lang := fenceMatches[1]
			codeContent := fenceMatches[2]

			// Remove excessive leading whitespace from each line
			codeContent = removeExcessiveIndent(codeContent)

			// Determine the class attribute
			classAttr := ""
			if lang != "" {
				classAttr = fmt.Sprintf(` class="language-%s"`, lang)
			} else if existingClass != "" {
				classAttr = fmt.Sprintf(` class="%s"`, existingClass)
			}

			return fmt.Sprintf("<pre><code%s>%s</code></pre>", classAttr, codeContent)
		}

		// Check for just the opening fence at the start (incomplete fence detection)
		openFenceRegex := regexp.MustCompile(`(?s)^[\s]*` + "```" + `(\w*)\s*\n`)
		if openFenceMatches := openFenceRegex.FindStringSubmatch(content); len(openFenceMatches) >= 2 {
			lang := openFenceMatches[1]
			// Remove the opening fence
			codeContent := openFenceRegex.ReplaceAllString(content, "")

			// Also remove closing fence if present
			closeFenceRegex := regexp.MustCompile(`\n[\s]*` + "```" + `[\s]*$`)
			codeContent = closeFenceRegex.ReplaceAllString(codeContent, "")

			// Remove excessive leading whitespace from each line
			codeContent = removeExcessiveIndent(codeContent)

			// Determine the class attribute
			classAttr := ""
			if lang != "" {
				classAttr = fmt.Sprintf(` class="language-%s"`, lang)
			} else if existingClass != "" {
				classAttr = fmt.Sprintf(` class="%s"`, existingClass)
			}

			return fmt.Sprintf("<pre><code%s>%s</code></pre>", classAttr, codeContent)
		}

		// No fence found, but still remove excessive indentation
		codeContent := removeExcessiveIndent(content)
		if codeContent != content {
			classAttr := ""
			if existingClass != "" {
				classAttr = fmt.Sprintf(` class="%s"`, existingClass)
			}
			return fmt.Sprintf("<pre><code%s>%s</code></pre>", classAttr, codeContent)
		}

		return match
	})
}

func removeExcessiveIndent(code string) string {
	lines := strings.Split(code, "\n")
	if len(lines) == 0 {
		return code
	}

	// Find minimum indentation (ignoring empty lines)
	minIndent := -1
	for _, line := range lines {
		if strings.TrimSpace(line) == "" {
			continue
		}
		indent := len(line) - len(strings.TrimLeft(line, " \t"))
		if minIndent == -1 || indent < minIndent {
			minIndent = indent
		}
	}

	// If minimum indent is 0 or not found, return original
	if minIndent <= 0 {
		return code
	}

	// Only fix if there's significant indentation (more than 20 spaces indicates a problem)
	if minIndent < 20 {
		return code
	}

	// Remove the common indentation from all lines
	result := make([]string, len(lines))
	for i, line := range lines {
		if len(line) >= minIndent {
			result[i] = line[minIndent:]
		} else {
			result[i] = strings.TrimLeft(line, " \t")
		}
	}

	return strings.Join(result, "\n")
}
