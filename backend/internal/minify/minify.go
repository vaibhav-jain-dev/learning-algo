// Package minify provides asset minification for CSS, JS, and HTML.
// Compression (gzip/brotli) is handled by Cloudflare; this package
// only reduces payload size by stripping whitespace, comments, etc.
package minify

import (
	"bytes"
	"fmt"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/gofiber/fiber/v2"
	m "github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/css"
	"github.com/tdewolff/minify/v2/html"
	"github.com/tdewolff/minify/v2/js"
)

// Minifier wraps tdewolff/minify with convenience methods.
type Minifier struct {
	m *m.M
}

// New creates a Minifier configured for CSS, JS, and HTML.
func New() *Minifier {
	mi := m.New()
	mi.AddFunc("text/css", css.Minify)
	mi.AddFunc("text/html", html.Minify)
	mi.AddFunc("application/javascript", js.Minify)
	mi.AddFunc("text/javascript", js.Minify)
	return &Minifier{m: mi}
}

// MinifyStaticDir walks a directory and minifies all .css and .js files in-place.
// It logs a summary of how many files were processed and bytes saved.
func (mi *Minifier) MinifyStaticDir(dir string) {
	var totalFiles int
	var totalSaved int64

	err := filepath.WalkDir(dir, func(path string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return err
		}

		ext := strings.ToLower(filepath.Ext(path))
		var mediaType string
		switch ext {
		case ".css":
			mediaType = "text/css"
		case ".js":
			mediaType = "application/javascript"
		default:
			return nil
		}

		original, err := os.ReadFile(path)
		if err != nil {
			log.Printf("minify: skip %s: %v", path, err)
			return nil
		}

		minified, err := mi.m.Bytes(mediaType, original)
		if err != nil {
			log.Printf("minify: skip %s: %v", path, err)
			return nil
		}

		saved := int64(len(original)) - int64(len(minified))
		if saved <= 0 {
			return nil // already minimal
		}

		if err := os.WriteFile(path, minified, d.Type().Perm()); err != nil {
			log.Printf("minify: write %s: %v", path, err)
			return nil
		}

		totalFiles++
		totalSaved += saved
		return nil
	})

	if err != nil {
		log.Printf("minify: walk %s: %v", dir, err)
	}
	if totalFiles > 0 {
		log.Printf("Minified %d static files, saved %s", totalFiles, formatBytes(totalSaved))
	}
}

// HTMLMiddleware returns Fiber middleware that minifies HTML responses.
func (mi *Minifier) HTMLMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		if err := c.Next(); err != nil {
			return err
		}

		ct := string(c.Response().Header.ContentType())
		if !strings.Contains(ct, "text/html") {
			return nil
		}

		body := c.Response().Body()
		if len(body) == 0 {
			return nil
		}

		var buf bytes.Buffer
		buf.Grow(len(body))
		if err := mi.m.Minify("text/html", &buf, bytes.NewReader(body)); err != nil {
			// On error, serve unminified — don't break the page
			return nil
		}

		c.Response().SetBody(buf.Bytes())
		return nil
	}
}

func formatBytes(b int64) string {
	const unit = 1024
	if b < unit {
		return fmt.Sprintf("%d B", b)
	}
	div, exp := int64(unit), 0
	for n := b / unit; n >= unit; n /= unit {
		div *= unit
		exp++
	}
	return fmt.Sprintf("%.1f %cB", float64(b)/float64(div), "KMG"[exp])
}
