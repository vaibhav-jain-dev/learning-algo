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

	var filesModified int
	var totalQAAdded int
	var totalFilesProcessed int

	err := filepath.Walk(topicsDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if info.Name() != "content.html" {
			return nil
		}

		totalFilesProcessed++

		content, err := os.ReadFile(path)
		if err != nil {
			return err
		}

		originalContent := string(content)
		modifiedContent, qaCount := addQASections(originalContent)

		if modifiedContent != originalContent {
			if err := os.WriteFile(path, []byte(modifiedContent), 0644); err != nil {
				return err
			}
			filesModified++
			totalQAAdded += qaCount
			fmt.Printf("Updated: %s (+%d Q&A sections)\n", path, qaCount)
		}

		return nil
	})

	if err != nil {
		fmt.Printf("Error: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\n=== Summary ===\n")
	fmt.Printf("Files processed: %d\n", totalFilesProcessed)
	fmt.Printf("Files modified: %d\n", filesModified)
	fmt.Printf("Total Q&A sections added: %d\n", totalQAAdded)
}

// addQASections processes the HTML content and adds Q&A sections after H3 sections
func addQASections(html string) (string, int) {
	// Skip if already has qa-sections (at least some)
	if strings.Count(html, `class="qa-section"`) > 5 {
		return html, 0
	}

	// Find all H3 headings with their positions
	h3Regex := regexp.MustCompile(`<h3[^>]*id="([^"]*)"[^>]*>([^<]*)</h3>`)
	matches := h3Regex.FindAllStringSubmatchIndex(html, -1)

	if len(matches) == 0 {
		return html, 0
	}

	// Find positions of all H2 and H3 tags to determine section boundaries
	sectionBoundaryRegex := regexp.MustCompile(`<h[23][^>]*>`)
	boundaries := sectionBoundaryRegex.FindAllStringIndex(html, -1)

	// Create a map of boundary positions
	boundaryPositions := make([]int, len(boundaries))
	for i, b := range boundaries {
		boundaryPositions[i] = b[0]
	}

	qaCount := 0
	result := html
	offset := 0 // Track offset as we insert content

	for _, match := range matches {
		h3Start := match[0]
		h3End := match[1]
		h3ID := html[match[2]:match[3]]
		h3Title := html[match[4]:match[5]]

		// Clean up the title (remove any HTML entities)
		h3Title = cleanTitle(h3Title)

		// Skip if title is empty or too short
		if len(h3Title) < 3 {
			continue
		}

		// Skip H3s that are inside diagram/styled divs
		if isInsideDiagram(html, h3Start) {
			continue
		}

		// Find where to insert the Q&A section (before next H2 or H3)
		insertPos := findInsertPosition(html, h3End, boundaryPositions)

		// Check if there's already a qa-section near this position
		searchArea := ""
		if insertPos < len(html) {
			endSearch := insertPos + 500
			if endSearch > len(html) {
				endSearch = len(html)
			}
			searchArea = html[h3End:endSearch]
		}
		if strings.Contains(searchArea, `class="qa-section"`) {
			continue
		}

		// Check if there's substantial content between H3 and next section
		if !hasSubstantialContent(html, h3End, insertPos) {
			continue
		}

		// Generate the Q&A section
		qaSection := generateQASection(h3Title, h3ID)

		// Insert the Q&A section at the calculated position with offset
		adjustedPos := insertPos + offset
		result = result[:adjustedPos] + qaSection + result[adjustedPos:]
		offset += len(qaSection)
		qaCount++
	}

	return result, qaCount
}

// cleanTitle removes HTML entities and extra whitespace from title
func cleanTitle(title string) string {
	title = strings.TrimSpace(title)
	// Decode common HTML entities
	title = strings.ReplaceAll(title, "&amp;", "&")
	title = strings.ReplaceAll(title, "&lt;", "<")
	title = strings.ReplaceAll(title, "&gt;", ">")
	title = strings.ReplaceAll(title, "&quot;", "\"")
	title = strings.ReplaceAll(title, "&#39;", "'")
	return title
}

// isInsideDiagram checks if the H3 is inside a styled div (diagram/complex layout)
func isInsideDiagram(html string, pos int) bool {
	// Look backwards to find the most recent div opening
	searchStart := pos - 500
	if searchStart < 0 {
		searchStart = 0
	}
	prefix := html[searchStart:pos]

	// Check for styled divs that typically contain diagrams
	diagramPatterns := []string{
		`style="display: grid`,
		`style="display: flex`,
		`style="background: linear-gradient`,
		`style="background-color:`,
	}

	// Count open vs closed divs to see if we're inside one
	openDivs := strings.Count(prefix, "<div")
	closeDivs := strings.Count(prefix, "</div>")

	if openDivs > closeDivs {
		// We're inside a div, check if it's a styled one
		for _, pattern := range diagramPatterns {
			// Find the last occurrence of an opening div with this pattern
			if strings.Contains(prefix, pattern) {
				lastDivIdx := strings.LastIndex(prefix, "<div")
				patternIdx := strings.LastIndex(prefix, pattern)
				// If the pattern is near the last div opening, we're in a diagram
				if patternIdx > lastDivIdx-50 && patternIdx < lastDivIdx+200 {
					return true
				}
			}
		}
	}

	return false
}

// findInsertPosition finds where to insert the Q&A section
func findInsertPosition(html string, h3End int, boundaries []int) int {
	// Find the next H2 or H3 boundary after our H3
	for _, pos := range boundaries {
		if pos > h3End {
			// Insert just before the next section, with a newline
			return pos
		}
	}
	// No next section found, insert at end (before closing tags if any)
	return len(html)
}

// hasSubstantialContent checks if there's meaningful content between H3 and next section
func hasSubstantialContent(html string, start, end int) bool {
	if end <= start {
		return false
	}

	content := html[start:end]

	// Remove HTML tags to count actual text
	tagRegex := regexp.MustCompile(`<[^>]+>`)
	textOnly := tagRegex.ReplaceAllString(content, " ")
	textOnly = strings.TrimSpace(textOnly)

	// Check for substantial content indicators
	hasCode := strings.Contains(content, "<pre>") || strings.Contains(content, "<code>")
	hasParagraphs := strings.Contains(content, "<p>")
	hasLists := strings.Contains(content, "<li>")

	// Must have either significant text or structural elements
	return len(textOnly) > 100 || hasCode || (hasParagraphs && len(textOnly) > 50) || hasLists
}

// generateQASection creates the Q&A HTML section for a given topic
func generateQASection(title, id string) string {
	// Generate questions based on the title
	q1, a1 := generateDefinitionQA(title)
	q2, a2 := generateApplicationQA(title)
	q3, a3 := generateAnalysisQA(title)

	return fmt.Sprintf(`
<div class="qa-section" style="background: linear-gradient(135deg, #f0f9ff 0%%, #e0f2fe 100%%); border-radius: 12px; padding: 20px; margin: 20px 0;">
<h4 style="color: #0369a1; margin-top: 0;">Check Your Understanding</h4>
<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b;">Q1: %s</summary>
<div style="padding: 12px; background: white; border-radius: 8px; margin-top: 8px;">
<p>%s</p>
</div>
</details>
<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b;">Q2: %s</summary>
<div style="padding: 12px; background: white; border-radius: 8px; margin-top: 8px;">
<p>%s</p>
</div>
</details>
<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b;">Q3: %s</summary>
<div style="padding: 12px; background: white; border-radius: 8px; margin-top: 8px;">
<p>%s</p>
</div>
</details>
</div>
`, q1, a1, q2, a2, q3, a3)
}

// generateDefinitionQA creates a definition question and answer
func generateDefinitionQA(title string) (string, string) {
	// Clean up title for question generation
	cleanedTitle := strings.ToLower(title)

	// Determine article (a vs an)
	article := "a"
	vowels := "aeiou"
	if len(cleanedTitle) > 0 && strings.ContainsAny(string(cleanedTitle[0]), vowels) {
		article = "an"
	}

	// Check for special patterns in title
	if strings.HasPrefix(cleanedTitle, "the ") {
		question := fmt.Sprintf("What is %s and what problem does it solve?", title)
		answer := fmt.Sprintf("Think about %s in terms of its core purpose. Consider what specific problem it was designed to address and how it differs from simpler approaches. Try to explain it as if teaching someone who has never encountered this concept before.", title)
		return question, answer
	}

	if strings.Contains(cleanedTitle, "vs") || strings.Contains(cleanedTitle, "versus") {
		question := fmt.Sprintf("What are the key differences between the concepts compared in %s?", title)
		answer := "Consider each concept independently first, then identify the specific dimensions where they differ - performance, use cases, complexity, and trade-offs. Understanding both sides helps you choose the right approach for your specific situation."
		return question, answer
	}

	if strings.Contains(cleanedTitle, "pattern") || strings.Contains(cleanedTitle, "approach") {
		question := fmt.Sprintf("What is the %s and when should you use it?", title)
		answer := fmt.Sprintf("The %s addresses a specific category of problems. Think about the conditions that make this pattern valuable - what symptoms in your code suggest you need it? Also consider what alternatives exist and why you might choose this approach over others.", title)
		return question, answer
	}

	if strings.HasSuffix(cleanedTitle, "s") && !strings.HasSuffix(cleanedTitle, "ss") {
		question := fmt.Sprintf("What are %s and why are they important?", title)
		answer := fmt.Sprintf("Consider the different types or categories of %s and what distinguishes them. Think about real-world examples where each type would be most appropriate. Understanding the variety helps you select the right tool for each situation.", title)
		return question, answer
	}

	question := fmt.Sprintf("What is %s %s?", article, title)
	answer := fmt.Sprintf("Think about %s in terms of its fundamental definition and purpose. Consider what makes it unique compared to related concepts. Try to identify the key characteristics that define it and the problems it was designed to solve.", title)
	return question, answer
}

// generateApplicationQA creates an application/usage question and answer
func generateApplicationQA(title string) (string, string) {
	cleanedTitle := strings.ToLower(title)

	if strings.Contains(cleanedTitle, "implementation") || strings.Contains(cleanedTitle, "how to") {
		question := fmt.Sprintf("What are the key steps to implement %s correctly?", title)
		answer := "Focus on the sequence of operations and critical decisions at each step. Consider what invariants must be maintained throughout the implementation. Think about edge cases and how they should be handled. A correct implementation handles both the common case and the exceptional cases gracefully."
		return question, answer
	}

	if strings.Contains(cleanedTitle, "problem") || strings.Contains(cleanedTitle, "challenge") {
		question := fmt.Sprintf("How would you approach solving a problem related to %s?", title)
		answer := "Start by clearly defining the problem constraints and requirements. Consider what makes this problem challenging and what techniques apply. Think about how you would break it down into smaller subproblems. Remember that recognizing the problem pattern is often the hardest part."
		return question, answer
	}

	if strings.Contains(cleanedTitle, "optimization") || strings.Contains(cleanedTitle, "performance") {
		question := fmt.Sprintf("When and why should you apply %s?", title)
		answer := fmt.Sprintf("Optimization should be driven by measured bottlenecks, not assumptions. Consider what metrics would indicate a need for %s. Think about the cost-benefit ratio - does the complexity introduced by optimization justify the performance gains? Remember: premature optimization is the root of all evil.", title)
		return question, answer
	}

	question := fmt.Sprintf("In what scenarios would you apply %s?", title)
	answer := fmt.Sprintf("Think about the characteristics of problems where %s provides the most value. Consider both the technical requirements (data structures, algorithms needed) and the business context (scalability, performance constraints). Real-world applications often require adapting the theoretical approach to practical constraints.", title)
	return question, answer
}

// generateAnalysisQA creates an analysis/trade-off question and answer
func generateAnalysisQA(title string) (string, string) {
	cleanedTitle := strings.ToLower(title)

	if strings.Contains(cleanedTitle, "trade") || strings.Contains(cleanedTitle, "vs") {
		question := fmt.Sprintf("What factors should you consider when evaluating %s?", title)
		answer := fmt.Sprintf("Every technical decision involves trade-offs across multiple dimensions: time complexity, space complexity, implementation complexity, maintainability, and scalability. Consider how %s performs across these dimensions and in what contexts each trade-off is acceptable. There is rarely a universally 'best' solution.", title)
		return question, answer
	}

	if strings.Contains(cleanedTitle, "complexity") || strings.Contains(cleanedTitle, "analysis") {
		question := fmt.Sprintf("How do you analyze the complexity implications of %s?", title)
		answer := "Start with the theoretical analysis - what is the time and space complexity in best, average, and worst cases? Then consider practical factors: constant factors matter for small inputs, cache behavior matters for large inputs. Real performance often differs from theoretical analysis due to hardware and implementation details."
		return question, answer
	}

	if strings.Contains(cleanedTitle, "best practice") || strings.Contains(cleanedTitle, "recommendation") {
		question := fmt.Sprintf("What are the potential pitfalls when implementing %s?", title)
		answer := "Best practices exist because people have made mistakes. Consider what could go wrong: edge cases, concurrency issues, resource leaks, or maintenance challenges. Think about how to test for these issues and what safeguards can prevent them. Learning from others' mistakes is more efficient than making them yourself."
		return question, answer
	}

	question := fmt.Sprintf("What are the trade-offs involved in using %s?", title)
	answer := fmt.Sprintf("Consider %s from multiple perspectives: What do you gain? What do you sacrifice? Think about time vs. space trade-offs, simplicity vs. flexibility, and short-term convenience vs. long-term maintainability. The best engineers understand these trade-offs deeply and make informed decisions based on their specific context.", title)
	return question, answer
}
