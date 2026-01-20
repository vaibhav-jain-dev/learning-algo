/*
Generate Div Tags - Go Solution

Generate all valid combinations of matched <div></div> tags.
*/

package main

import (
	"fmt"
	"strings"
)

// GenerateDivTags generates all valid div tag combinations using backtracking.
func GenerateDivTags(numberOfTags int) []string {
	result := []string{}
	current := []string{}

	var backtrack func(opening, closing int)
	backtrack = func(opening, closing int) {
		// Base case: all tags used
		if opening == numberOfTags && closing == numberOfTags {
			result = append(result, strings.Join(current, ""))
			return
		}

		// Can add opening tag if we haven't used all
		if opening < numberOfTags {
			current = append(current, "<div>")
			backtrack(opening+1, closing)
			current = current[:len(current)-1]
		}

		// Can add closing tag if there are unclosed opening tags
		if closing < opening {
			current = append(current, "</div>")
			backtrack(opening, closing+1)
			current = current[:len(current)-1]
		}
	}

	backtrack(0, 0)
	return result
}

// GenerateDivTagsBuilder uses strings.Builder for efficiency.
func GenerateDivTagsBuilder(numberOfTags int) []string {
	result := []string{}

	var generate func(builder *strings.Builder, opening, closing int)
	generate = func(builder *strings.Builder, opening, closing int) {
		if opening == numberOfTags && closing == numberOfTags {
			result = append(result, builder.String())
			return
		}

		if opening < numberOfTags {
			builder.WriteString("<div>")
			generate(builder, opening+1, closing)
			// Remove last 5 characters "<div>"
			str := builder.String()
			builder.Reset()
			builder.WriteString(str[:len(str)-5])
		}

		if closing < opening {
			builder.WriteString("</div>")
			generate(builder, opening, closing+1)
			// Remove last 6 characters "</div>"
			str := builder.String()
			builder.Reset()
			builder.WriteString(str[:len(str)-6])
		}
	}

	var builder strings.Builder
	generate(&builder, 0, 0)
	return result
}

// GenerateDivTagsIterative uses an iterative stack-based approach.
func GenerateDivTagsIterative(numberOfTags int) []string {
	if numberOfTags == 0 {
		return []string{}
	}

	type state struct {
		current  string
		opening  int
		closing  int
	}

	result := []string{}
	stack := []state{{"", 0, 0}}

	for len(stack) > 0 {
		// Pop from stack
		s := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if s.opening == numberOfTags && s.closing == numberOfTags {
			result = append(result, s.current)
			continue
		}

		// Add closing tag option
		if s.closing < s.opening {
			stack = append(stack, state{
				current: s.current + "</div>",
				opening: s.opening,
				closing: s.closing + 1,
			})
		}

		// Add opening tag option
		if s.opening < numberOfTags {
			stack = append(stack, state{
				current: s.current + "<div>",
				opening: s.opening + 1,
				closing: s.closing,
			})
		}
	}

	return result
}

func main() {
	// Test case 1
	n1 := 2
	fmt.Printf("Number of tags: %d\n", n1)
	fmt.Printf("Backtracking: %v\n", GenerateDivTags(n1))
	fmt.Printf("Iterative:    %v\n", GenerateDivTagsIterative(n1))

	// Test case 2
	n2 := 1
	fmt.Printf("\nNumber of tags: %d\n", n2)
	fmt.Printf("Output: %v\n", GenerateDivTags(n2))

	// Test case 3
	n3 := 3
	fmt.Printf("\nNumber of tags: %d\n", n3)
	result := GenerateDivTags(n3)
	for _, combo := range result {
		fmt.Printf("  %s\n", combo)
	}
	fmt.Printf("Total: %d combinations\n", len(result))

	// Test case 4: Catalan numbers
	fmt.Println("\nCatalan number sequence (number of valid combinations):")
	for i := 1; i <= 5; i++ {
		fmt.Printf("  n=%d: %d combinations\n", i, len(GenerateDivTags(i)))
	}
}
