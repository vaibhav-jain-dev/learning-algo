package handlers

import (
	"bufio"
	"bytes"
	"context"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/renderer/html"

	"github.com/vaibhav-jain-dev/learning-algo/internal/kernel"
	"github.com/vaibhav-jain-dev/learning-algo/internal/models"
)

const problemsDir = "./problems"
const topicsDir = "../topics"

// Handlers holds all HTTP handlers
type Handlers struct {
	pythonPool  *kernel.PythonPool
	goPool      *kernel.GoPool
	execManager *kernel.ExecutionManager
	md          goldmark.Markdown
}

// New creates a new Handlers instance
func New(pythonPool *kernel.PythonPool, goPool *kernel.GoPool, execManager *kernel.ExecutionManager) *Handlers {
	md := goldmark.New(
		goldmark.WithExtensions(extension.GFM),
		goldmark.WithRendererOptions(
			html.WithHardWraps(),
			html.WithXHTML(),
		),
	)

	return &Handlers{
		pythonPool:  pythonPool,
		goPool:      goPool,
		execManager: execManager,
		md:          md,
	}
}

// Home renders the home page
func (h *Handlers) Home(c *fiber.Ctx) error {
	return c.Render("pages/home", fiber.Map{
		"Title": "DSAlgo Learning Platform",
	})
}

// Practice renders the practice page
func (h *Handlers) Practice(c *fiber.Ctx) error {
	return c.Render("pages/practice", fiber.Map{
		"Title": "Practice - Code Runner",
	})
}

// SystemDesign renders the system design page
func (h *Handlers) SystemDesign(c *fiber.Ctx) error {
	return c.Render("pages/system-design", fiber.Map{
		"Title": "System Design",
	})
}

// DesignPatterns renders the design patterns page
func (h *Handlers) DesignPatterns(c *fiber.Ctx) error {
	return c.Render("pages/design-patterns", fiber.Map{
		"Title": "Design Patterns",
	})
}

// MachineCoding renders the machine coding page
func (h *Handlers) MachineCoding(c *fiber.Ctx) error {
	return c.Render("pages/machine-coding", fiber.Map{
		"Title": "Machine Coding",
	})
}

// TopicDetail renders a specific topic page
func (h *Handlers) TopicDetail(c *fiber.Ctx) error {
	category := c.Params("category")
	topic := c.Params("topic")

	// Format the title
	title := formatName(topic)
	categoryTitle := formatName(category)

	// Try to load content from content.md file
	contentPath := filepath.Join(topicsDir, category, topic, "content.md")
	var contentHTML string
	var hasContent bool

	mdContent, err := os.ReadFile(contentPath)
	if err == nil && len(mdContent) > 0 {
		var buf bytes.Buffer
		if err := h.md.Convert(mdContent, &buf); err == nil {
			contentHTML = buf.String()
			hasContent = true
		}
	}

	return c.Render("pages/topic-detail", fiber.Map{
		"Title":         title + " - " + categoryTitle,
		"Topic":         title,
		"Category":      categoryTitle,
		"CategorySlug":  category,
		"TopicSlug":     topic,
		"Content":       contentHTML,
		"HasContent":    hasContent,
	})
}

// ListProblems returns all problems as JSON
func (h *Handlers) ListProblems(c *fiber.Ctx) error {
	tree := h.buildProblemTree(problemsDir)
	return c.JSON(tree)
}

// GetProblem returns a specific problem
func (h *Handlers) GetProblem(c *fiber.Ctx) error {
	path := c.Params("*")
	if path == "" {
		return c.Status(400).JSON(fiber.Map{"error": "path required"})
	}

	fullPath := filepath.Join(problemsDir, path)

	mdPath := filepath.Join(fullPath, "problem.md")
	mdContent, err := os.ReadFile(mdPath)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "problem not found"})
	}

	var buf bytes.Buffer
	if err := h.md.Convert(mdContent, &buf); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to parse markdown"})
	}

	pythonPath := filepath.Join(fullPath, "python_code.py")
	pythonCode, _ := os.ReadFile(pythonPath)

	goPath := filepath.Join(fullPath, "golang_code.go")
	goCode, _ := os.ReadFile(goPath)

	return c.JSON(fiber.Map{
		"description": buf.String(),
		"python_code": string(pythonCode),
		"golang_code": string(goCode),
		"path":        path,
	})
}

// RunCode executes code via API (async with execution manager)
func (h *Handlers) RunCode(c *fiber.Ctx) error {
	var req models.ExecuteRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid request"})
	}

	if req.Language != "python" && req.Language != "go" && req.Language != "golang" {
		return c.Status(400).JSON(fiber.Map{"error": "unsupported language"})
	}

	exec, err := h.execManager.Execute(req.Code, req.Language)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{
		"id":    exec.ID,
		"state": exec.State,
	})
}

// GetExecution returns execution status
func (h *Handlers) GetExecution(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return c.Status(400).JSON(fiber.Map{"error": "id required"})
	}

	exec := h.execManager.Get(id)
	if exec == nil {
		return c.Status(404).JSON(fiber.Map{"error": "execution not found"})
	}

	return c.JSON(exec.ToJSON())
}

// StopExecution stops a running execution
func (h *Handlers) StopExecution(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return c.Status(400).JSON(fiber.Map{"error": "id required"})
	}

	if err := h.execManager.Stop(id); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"status": "stopped"})
}

// Stats returns kernel pool statistics
func (h *Handlers) Stats(c *fiber.Ctx) error {
	return c.JSON(h.execManager.Stats())
}

// ProblemTree returns HTMX partial for problem tree
func (h *Handlers) ProblemTree(c *fiber.Ctx) error {
	tree := h.buildProblemTree(problemsDir)
	return c.Render("partials/problem-tree", fiber.Map{
		"Tree": tree,
	}, "")
}

// ProblemContent returns HTMX partial for problem content
func (h *Handlers) ProblemContent(c *fiber.Ctx) error {
	path := c.Params("*")
	if path == "" {
		return c.Status(400).SendString("path required")
	}

	fullPath := filepath.Join(problemsDir, path)

	mdPath := filepath.Join(fullPath, "problem.md")
	mdContent, err := os.ReadFile(mdPath)
	if err != nil {
		return c.Status(404).SendString("problem not found")
	}

	var buf bytes.Buffer
	if err := h.md.Convert(mdContent, &buf); err != nil {
		return c.Status(500).SendString("failed to parse markdown")
	}

	pythonPath := filepath.Join(fullPath, "python_code.py")
	pythonCode, _ := os.ReadFile(pythonPath)

	goPath := filepath.Join(fullPath, "golang_code.go")
	goCode, _ := os.ReadFile(goPath)

	return c.Render("partials/problem-content", fiber.Map{
		"Description": buf.String(),
		"PythonCode":  string(pythonCode),
		"GolangCode":  string(goCode),
		"Path":        path,
	}, "")
}

// Execute handles HTMX code execution (returns execution ID for WebSocket tracking)
func (h *Handlers) Execute(c *fiber.Ctx) error {
	code := c.FormValue("code")
	language := c.FormValue("language")

	if code == "" {
		return c.Render("partials/output", fiber.Map{
			"Error":   "No code provided",
			"Loading": false,
		}, "")
	}

	// For HTMX fallback (non-WebSocket), do synchronous execution
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	var result *kernel.ExecutionResult
	var err error

	switch language {
	case "python":
		result, err = h.pythonPool.Execute(ctx, code)
	case "go", "golang":
		result, err = h.goPool.Execute(ctx, code)
	default:
		return c.Render("partials/output", fiber.Map{
			"Error":   "Unsupported language: " + language,
			"Loading": false,
		}, "")
	}

	if err != nil {
		return c.Render("partials/output", fiber.Map{
			"Error":   err.Error(),
			"Loading": false,
		}, "")
	}

	return c.Render("partials/output", fiber.Map{
		"Output":   result.Output,
		"Error":    result.Error,
		"Duration": result.Duration.Milliseconds(),
		"ExitCode": result.ExitCode,
		"Loading":  false,
	}, "")
}

// GetOutput returns execution output by ID
func (h *Handlers) GetOutput(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return c.Render("partials/output", fiber.Map{
			"Error": "No execution ID provided",
		}, "")
	}

	exec := h.execManager.Get(id)
	if exec == nil {
		return c.Render("partials/output", fiber.Map{
			"Error": "Execution not found",
		}, "")
	}

	state := exec.GetState()
	loading := state == kernel.StateRunning

	return c.Render("partials/output", fiber.Map{
		"Output":   exec.Output,
		"Error":    exec.Error,
		"Duration": exec.Duration,
		"ExitCode": exec.ExitCode,
		"Loading":  loading,
		"ID":       exec.ID,
	}, "")
}

// buildProblemTree recursively builds the problem tree
func (h *Handlers) buildProblemTree(dir string) []*models.TreeNode {
	entries, err := os.ReadDir(dir)
	if err != nil {
		return nil
	}

	var nodes []*models.TreeNode

	for _, entry := range entries {
		if !entry.IsDir() || strings.HasPrefix(entry.Name(), ".") {
			continue
		}

		path := filepath.Join(dir, entry.Name())
		relPath, _ := filepath.Rel(problemsDir, path)

		if _, err := os.Stat(filepath.Join(path, "problem.md")); err == nil {
			title := h.getProblemTitle(filepath.Join(path, "problem.md"))
			nodes = append(nodes, &models.TreeNode{
				Name: title,
				Type: "problem",
				Path: relPath,
			})
		} else {
			children := h.buildProblemTree(path)
			if len(children) > 0 {
				nodes = append(nodes, &models.TreeNode{
					Name:     formatName(entry.Name()),
					Type:     "folder",
					Children: children,
				})
			}
		}
	}

	sort.Slice(nodes, func(i, j int) bool {
		if nodes[i].Type != nodes[j].Type {
			return nodes[i].Type == "folder"
		}
		return nodes[i].Name < nodes[j].Name
	})

	return nodes
}

func (h *Handlers) getProblemTitle(path string) string {
	file, err := os.Open(path)
	if err != nil {
		return filepath.Base(filepath.Dir(path))
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	if scanner.Scan() {
		line := scanner.Text()
		line = strings.TrimPrefix(line, "# ")
		line = strings.TrimPrefix(line, "## ")
		return strings.TrimSpace(line)
	}

	return filepath.Base(filepath.Dir(path))
}

func formatName(name string) string {
	words := strings.Split(name, "-")
	for i, word := range words {
		if len(word) > 0 {
			words[i] = strings.ToUpper(word[:1]) + word[1:]
		}
	}
	return strings.Join(words, " ")
}
