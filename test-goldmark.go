package main

import (
	"bytes"
	"fmt"
	"os"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/renderer/html"
)

func main() {
	md := goldmark.New(
		goldmark.WithExtensions(extension.GFM),
		goldmark.WithRendererOptions(
			html.WithHardWraps(),
			html.WithXHTML(),
			html.WithUnsafe(),
		),
	)

	source, err := os.ReadFile("test-goldmark.md")
	if err != nil {
		fmt.Printf("Error reading file: %v\n", err)
		return
	}

	var buf bytes.Buffer
	if err := md.Convert(source, &buf); err != nil {
		fmt.Printf("Error converting: %v\n", err)
		return
	}

	fmt.Println("=== RENDERED HTML ===")
	fmt.Println(buf.String())
}
