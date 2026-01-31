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
	"github.com/vaibhav-jain-dev/learning-algo/internal/topics"
)

const problemsDir = "./problems"
const topicsDir = "./topics"

// Handlers holds all HTTP handlers
type Handlers struct {
	pythonPool   *kernel.PythonPool
	goPool       *kernel.GoPool
	execManager  *kernel.ExecutionManager
	topicIndexer *topics.TopicIndexer
	md           goldmark.Markdown
}

// New creates a new Handlers instance
func New(pythonPool *kernel.PythonPool, goPool *kernel.GoPool, execManager *kernel.ExecutionManager) *Handlers {
	md := goldmark.New(
		goldmark.WithExtensions(extension.GFM),
		goldmark.WithRendererOptions(
			html.WithHardWraps(),
			html.WithXHTML(),
			html.WithUnsafe(),
		),
	)

	// Initialize topic indexer with 5 minute cache TTL
	topicIndexer := topics.NewTopicIndexer(topicsDir, 5*time.Minute)

	return &Handlers{
		pythonPool:   pythonPool,
		goPool:       goPool,
		execManager:  execManager,
		topicIndexer: topicIndexer,
		md:           md,
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

// MustSolveProblems renders the 200 must solve problems page (topic overview)
func (h *Handlers) MustSolveProblems(c *fiber.Ctx) error {
	category := h.topicIndexer.GetCategory("must-solve-problems")
	return c.Render("pages/must-solve-problems", fiber.Map{
		"Title":        "200 Must Solve Problems",
		"Category":     category,
		"CategorySlug": "must-solve-problems",
	})
}

// TwoHundredProblems renders the dedicated 200 problems practice page
func (h *Handlers) TwoHundredProblems(c *fiber.Ctx) error {
	return c.Render("pages/200-problems", fiber.Map{
		"Title": "200 Must Solve Problems - Practice",
	})
}

// LearnSubject renders the learn subject page with algorithms, data structures, and terminologies
func (h *Handlers) LearnSubject(c *fiber.Ctx) error {
	return c.Render("pages/learn-subject", fiber.Map{
		"Title": "Learn Subject - Algorithms, Data Structures & Terminologies",
	})
}

// TwoHundredProblemsTree returns HTMX partial for 200 problems tree
func (h *Handlers) TwoHundredProblemsTree(c *fiber.Ctx) error {
	tree := h.buildProblemTreeFrom("./problems/200-must-solve")
	return c.Render("partials/problem-tree", fiber.Map{
		"Tree": tree,
	}, "")
}

// TwoHundredProblemContent returns HTMX partial for 200 problem content
func (h *Handlers) TwoHundredProblemContent(c *fiber.Ctx) error {
	path := c.Params("*")
	if path == "" {
		return c.Status(400).SendString("path required")
	}

	fullPath := filepath.Join("./problems/200-must-solve", path)

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

// buildProblemTreeFrom builds problem tree from a specific directory
func (h *Handlers) buildProblemTreeFrom(dir string) []*models.TreeNode {
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
		relPath, _ := filepath.Rel(dir, path)

		if _, err := os.Stat(filepath.Join(path, "problem.md")); err == nil {
			title := h.getProblemTitle(filepath.Join(path, "problem.md"))
			nodes = append(nodes, &models.TreeNode{
				Name: title,
				Type: "problem",
				Path: relPath,
			})
		} else {
			children := h.buildProblemTreeFromRecursive(path, dir)
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

func (h *Handlers) buildProblemTreeFromRecursive(dir, baseDir string) []*models.TreeNode {
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
		relPath, _ := filepath.Rel(baseDir, path)

		if _, err := os.Stat(filepath.Join(path, "problem.md")); err == nil {
			title := h.getProblemTitle(filepath.Join(path, "problem.md"))
			nodes = append(nodes, &models.TreeNode{
				Name: title,
				Type: "problem",
				Path: relPath,
			})
		} else {
			children := h.buildProblemTreeFromRecursive(path, baseDir)
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

// Golang renders the Go API development guide page
func (h *Handlers) Golang(c *fiber.Ctx) error {
	return c.Render("pages/golang", fiber.Map{
		"Title": "Go API Development Guide",
	})
}

// PythonAsyncio renders the Python asyncio guide page
func (h *Handlers) PythonAsyncio(c *fiber.Ctx) error {
	return c.Render("pages/python-asyncio", fiber.Map{
		"Title": "Python 3.10 Asyncio Guide",
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
		"Title":        title + " - " + categoryTitle,
		"Topic":        title,
		"Category":     categoryTitle,
		"CategorySlug": category,
		"TopicSlug":    topic,
		"Content":      contentHTML,
		"HasContent":   hasContent,
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

// GetAllTopics returns all topics organized by category for PDF export
func (h *Handlers) GetAllTopics(c *fiber.Ctx) error {
	categories := h.topicIndexer.GetAllCategories()
	return c.JSON(categories)
}

// DebugTopics returns debug info about topics
func (h *Handlers) DebugTopics(c *fiber.Ctx) error {
	cwd, _ := os.Getwd()

	// Check if topics directory exists
	topicsExists := false
	if _, err := os.Stat(topicsDir); err == nil {
		topicsExists = true
	}

	// List topics directory contents
	var topicsDirContents []string
	entries, err := os.ReadDir(topicsDir)
	if err == nil {
		for _, e := range entries {
			topicsDirContents = append(topicsDirContents, e.Name())
		}
	}

	// Get indexed categories
	categories := h.topicIndexer.GetAllCategories()
	var categoryInfo []fiber.Map
	for _, cat := range categories {
		topicNames := []string{}
		for _, t := range cat.Topics {
			topicNames = append(topicNames, t.Slug)
		}
		categoryInfo = append(categoryInfo, fiber.Map{
			"slug":       cat.Slug,
			"title":      cat.Title,
			"topicCount": len(cat.Topics),
			"topics":     topicNames,
		})
	}

	// Test specific file
	testPath := filepath.Join(topicsDir, "design-patterns", "factory-method", "content.md")
	testFileExists := false
	var testFileSize int64
	if info, err := os.Stat(testPath); err == nil {
		testFileExists = true
		testFileSize = info.Size()
	}

	return c.JSON(fiber.Map{
		"cwd":               cwd,
		"topicsDir":         topicsDir,
		"topicsExists":      topicsExists,
		"topicsDirContents": topicsDirContents,
		"categories":        categoryInfo,
		"testFile": fiber.Map{
			"path":   testPath,
			"exists": testFileExists,
			"size":   testFileSize,
		},
	})
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

	// Set timeout based on language (Go needs more time for compilation)
	timeout := 20 * time.Second
	if language == "go" || language == "golang" {
		timeout = 45 * time.Second
	}

	// For HTMX fallback (non-WebSocket), do synchronous execution
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
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
// Excludes 200-must-solve folder which has its own dedicated page
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

		// Skip 200-must-solve folder - it has its own dedicated page at /200-problems
		if entry.Name() == "200-must-solve" {
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

// Microservices renders the microservices architecture page
func (h *Handlers) Microservices(c *fiber.Ctx) error {
	return c.Render("pages/microservices", fiber.Map{
		"Title": "Microservices",
	})
}

// SystemArchitectures renders the system architectures page
func (h *Handlers) SystemArchitectures(c *fiber.Ctx) error {
	return c.Render("pages/system-architectures", fiber.Map{
		"Title": "System Architectures",
	})
}

// SQLDashboard renders the SQL learning dashboard page
func (h *Handlers) SQLDashboard(c *fiber.Ctx) error {
	return c.Render("pages/sql-dashboard", fiber.Map{
		"Title": "SQL Learning Dashboard",
	})
}

// SQLLessons renders the SQL lessons page
func (h *Handlers) SQLLessons(c *fiber.Ctx) error {
	return c.Render("pages/sql-lessons", fiber.Map{
		"Title": "SQL Lessons",
	})
}

// ElasticsearchDashboard renders the Elasticsearch learning dashboard page
func (h *Handlers) ElasticsearchDashboard(c *fiber.Ctx) error {
	return c.Render("pages/elasticsearch-dashboard", fiber.Map{
		"Title": "Elasticsearch Learning Dashboard",
	})
}

// ElasticsearchLessons renders the Elasticsearch lessons page
func (h *Handlers) ElasticsearchLessons(c *fiber.Ctx) error {
	return c.Render("pages/elasticsearch-lessons", fiber.Map{
		"Title": "Elasticsearch Lessons",
	})
}

// RedisDashboard renders the Redis learning dashboard page
func (h *Handlers) RedisDashboard(c *fiber.Ctx) error {
	return c.Render("pages/redis-dashboard", fiber.Map{
		"Title": "Redis Learning Dashboard",
	})
}

// RedisLessons renders the Redis lessons page
func (h *Handlers) RedisLessons(c *fiber.Ctx) error {
	return c.Render("pages/redis-lessons", fiber.Map{
		"Title": "Redis Lessons",
	})
}

// SQL renders the unified SQL page with dashboard and lessons tabs
func (h *Handlers) SQL(c *fiber.Ctx) error {
	return c.Render("pages/sql-unified", fiber.Map{
		"Title":        "SQL - Playground & Lessons",
		"HasDashboard": true,
		"HasLessons":   true,
	})
}

// Elasticsearch renders the unified Elasticsearch page with dashboard and lessons tabs
func (h *Handlers) Elasticsearch(c *fiber.Ctx) error {
	return c.Render("pages/elasticsearch-unified", fiber.Map{
		"Title":        "Elasticsearch - Playground & Lessons",
		"HasDashboard": true,
		"HasLessons":   true,
	})
}

// SearchArchitecture renders the Search Architecture Evolution page (real-world ES implementation)
func (h *Handlers) SearchArchitecture(c *fiber.Ctx) error {
	return c.Render("pages/search-architecture", fiber.Map{
		"Title": "Search Architecture Evolution - Real-World Implementation",
	})
}

// Redis renders the unified Redis page with dashboard and lessons tabs
func (h *Handlers) Redis(c *fiber.Ctx) error {
	return c.Render("pages/redis-unified", fiber.Map{
		"Title":        "Redis - Playground & Lessons",
		"HasDashboard": true,
		"HasLessons":   true,
	})
}

// DeploymentGuide renders the SSH deployment guide page
func (h *Handlers) DeploymentGuide(c *fiber.Ctx) error {
	// Read the SSH setup guide markdown from docs directory
	mdContent, err := os.ReadFile("./docs/SSH-SETUP-GUIDE.md")
	if err != nil {
		// Fallback to .github/workflows location
		mdContent, err = os.ReadFile("./.github/workflows/SSH-SETUP-GUIDE.md")
		if err != nil {
			return c.Status(404).SendString("Deployment guide not found")
		}
	}

	var buf bytes.Buffer
	if err := h.md.Convert(mdContent, &buf); err != nil {
		return c.Status(500).SendString("Failed to parse guide")
	}

	return c.Render("pages/deployment-guide", fiber.Map{
		"Title":   "Deployment Instructions",
		"Content": buf.String(),
	})
}

// Roadmap renders the 7-day study roadmap page
func (h *Handlers) Roadmap(c *fiber.Ctx) error {
	roadmap := h.buildSmartRoadmap()
	return c.Render("pages/roadmap", fiber.Map{
		"Title":   "7-Day Study Roadmap",
		"Roadmap": roadmap,
	})
}

// buildSmartRoadmap creates an intelligent 7-day study plan
// buildSmartRoadmap creates an ADHD-friendly 7-day study plan with short sessions and frequent topic switches
func (h *Handlers) buildSmartRoadmap() []models.DayPlan {
	return []models.DayPlan{
		{
			Day:   1,
			Title: "Foundation - Arrays & System Design Fundamentals",
			Sessions: []models.StudySession{
				{
					ID:          "d1s1",
					Time:        "09:00 - 10:30",
					Duration:    "1.5 hours",
					Topic:       "Array Basics",
					Description: "Two pointers, sliding window, prefix sums",
					Link:        "/200-problems",
					Icon:        "📊",
					Category:    "DSA",
					SubTopics: []models.SubTopic{
						{Name: "Two Sum Problem", Link: "/200-problems"},
						{Name: "Container With Most Water", Link: "/200-problems"},
						{Name: "Subarray Sum Equals K", Link: "/200-problems"},
					},
				},
				{
					ID:          "d1s2",
					Time:        "10:45 - 12:00",
					Duration:    "1.25 hours",
					Topic:       "Load Balancing",
					Description: "Distribution algorithms and strategies",
					Link:        "/topic/system-design/load-balancing",
					Icon:        "⚖️",
					Category:    "System Design",
					SubTopics: []models.SubTopic{
						{Name: "Round Robin", Link: "/topic/system-design/load-balancing#round-robin"},
						{Name: "Least Connections", Link: "/topic/system-design/load-balancing#least-connections"},
						{Name: "Consistent Hashing", Link: "/topic/system-design/load-balancing#consistent-hashing"},
					},
				},
				{
					ID:          "d1s3",
					Time:        "13:00 - 14:00",
					Duration:    "1 hour",
					Topic:       "String Problems",
					Description: "Pattern matching and manipulation",
					Link:        "/200-problems",
					Icon:        "🔤",
					Category:    "DSA",
					SubTopics: []models.SubTopic{
						{Name: "Longest Substring Without Repeating", Link: "/200-problems"},
						{Name: "Valid Palindrome", Link: "/200-problems"},
						{Name: "Group Anagrams", Link: "/200-problems"},
					},
				},
				{
					ID:          "d1s4",
					Time:        "14:15 - 15:30",
					Duration:    "1.25 hours",
					Topic:       "Singleton & Factory Patterns",
					Description: "Essential creational patterns",
					Link:        "/design-patterns",
					Icon:        "🏭",
					Category:    "Design Patterns",
					SubTopics: []models.SubTopic{
						{Name: "Singleton Pattern", Link: "/topic/design-patterns/singleton"},
						{Name: "Factory Method", Link: "/topic/design-patterns/factory-method"},
						{Name: "Abstract Factory", Link: "/topic/design-patterns/abstract-factory"},
					},
				},
				{
					ID:          "d1s5",
					Time:        "15:45 - 17:00",
					Duration:    "1.25 hours",
					Topic:       "Caching Fundamentals",
					Description: "Cache strategies and eviction policies",
					Link:        "/topic/system-design/caching",
					Icon:        "💾",
					Category:    "System Design",
					SubTopics: []models.SubTopic{
						{Name: "Cache Strategies", Link: "/topic/system-design/caching#strategies"},
						{Name: "LRU Implementation", Link: "/topic/system-design/caching#lru"},
						{Name: "Write Policies", Link: "/topic/system-design/caching#write-policies"},
					},
				},
				{
					ID:          "d1s6",
					Time:        "17:15 - 18:00",
					Duration:    "45 mins",
					Topic:       "Practice & Review",
					Description: "Solve 2-3 mixed problems",
					Link:        "/practice",
					Icon:        "🔄",
					Category:    "Review",
					SubTopics: []models.SubTopic{
						{Name: "Code Runner Practice", Link: "/practice"},
						{Name: "Review Notes", Link: "/"},
					},
				},
			},
		},
		{
			Day:   2,
			Title: "Trees, Databases & Behavioral Patterns",
			Sessions: []models.StudySession{
				{
					ID:          "d2s1",
					Time:        "09:00 - 10:30",
					Duration:    "1.5 hours",
					Topic:       "Binary Trees",
					Description: "Traversals, BST operations, recursion",
					Link:        "/200-problems",
					Icon:        "🌳",
					Category:    "DSA",
					SubTopics: []models.SubTopic{
						{Name: "Tree Traversals (In/Pre/Post)", Link: "/200-problems"},
						{Name: "Maximum Depth", Link: "/200-problems"},
						{Name: "Validate BST", Link: "/200-problems"},
						{Name: "Lowest Common Ancestor", Link: "/200-problems"},
					},
				},
				{
					ID:          "d2s2",
					Time:        "10:45 - 12:00",
					Duration:    "1.25 hours",
					Topic:       "SQL Essentials",
					Description: "Joins, aggregations, subqueries",
					Link:        "/sql",
					Icon:        "🗄️",
					Category:    "Database",
					SubTopics: []models.SubTopic{
						{Name: "Inner/Outer Joins", Link: "/sql#joins"},
						{Name: "GROUP BY & HAVING", Link: "/sql#aggregation"},
						{Name: "Subqueries", Link: "/sql#subqueries"},
					},
				},
				{
					ID:          "d2s3",
					Time:        "13:00 - 14:15",
					Duration:    "1.25 hours",
					Topic:       "Database Design",
					Description: "Replication, sharding, CAP theorem",
					Link:        "/topic/system-design/database-replication",
					Icon:        "💿",
					Category:    "System Design",
					SubTopics: []models.SubTopic{
						{Name: "Master-Slave Replication", Link: "/topic/system-design/database-replication#master-slave"},
						{Name: "Database Sharding", Link: "/topic/system-design/database-sharding"},
						{Name: "CAP Theorem", Link: "/topic/system-design/cap-theorem"},
					},
				},
				{
					ID:          "d2s4",
					Time:        "14:30 - 15:45",
					Duration:    "1.25 hours",
					Topic:       "Observer & Strategy Patterns",
					Description: "Behavioral design patterns",
					Link:        "/design-patterns",
					Icon:        "👁️",
					Category:    "Design Patterns",
					SubTopics: []models.SubTopic{
						{Name: "Observer Pattern", Link: "/topic/design-patterns/observer"},
						{Name: "Strategy Pattern", Link: "/topic/design-patterns/strategy"},
						{Name: "Command Pattern", Link: "/topic/design-patterns/command"},
					},
				},
				{
					ID:          "d2s5",
					Time:        "16:00 - 17:15",
					Duration:    "1.25 hours",
					Topic:       "SQL Practice",
					Description: "Hands-on query writing",
					Link:        "/sql",
					Icon:        "⚡",
					Category:    "Database",
					SubTopics: []models.SubTopic{
						{Name: "Complex Joins Practice", Link: "/sql"},
						{Name: "Window Functions", Link: "/sql"},
						{Name: "Query Optimization", Link: "/sql"},
					},
				},
				{
					ID:          "d2s6",
					Time:        "17:30 - 18:00",
					Duration:    "30 mins",
					Topic:       "Review Day 1 & 2",
					Description: "Quick recap of key concepts",
					Link:        "/",
					Icon:        "🔄",
					Category:    "Review",
					SubTopics: []models.SubTopic{
						{Name: "Arrays & Strings Review", Link: "/200-problems"},
						{Name: "Trees Review", Link: "/200-problems"},
					},
				},
			},
		},
		{
			Day:   3,
			Title: "Dynamic Programming & Microservices",
			Sessions: []models.StudySession{
				{
					ID:          "d3s1",
					Time:        "09:00 - 10:30",
					Duration:    "1.5 hours",
					Topic:       "DP Fundamentals",
					Description: "Memoization and tabulation basics",
					Link:        "/200-problems",
					Icon:        "🎯",
					Category:    "DSA",
					SubTopics: []models.SubTopic{
						{Name: "Fibonacci (Top-down)", Link: "/200-problems"},
						{Name: "Climbing Stairs", Link: "/200-problems"},
						{Name: "Coin Change", Link: "/200-problems"},
					},
				},
				{
					ID:          "d3s2",
					Time:        "10:45 - 12:00",
					Duration:    "1.25 hours",
					Topic:       "Microservices Architecture",
					Description: "Service design and communication",
					Link:        "/microservices",
					Icon:        "📦",
					Category:    "Architecture",
					SubTopics: []models.SubTopic{
						{Name: "Service Decomposition", Link: "/microservices#decomposition"},
						{Name: "API Gateway", Link: "/topic/system-design/api-gateway"},
						{Name: "Service Mesh", Link: "/microservices#service-mesh"},
					},
				},
				{
					ID:          "d3s3",
					Time:        "13:00 - 14:00",
					Duration:    "1 hour",
					Topic:       "More DP Patterns",
					Description: "Knapsack, longest subsequence",
					Link:        "/200-problems",
					Icon:        "💼",
					Category:    "DSA",
					SubTopics: []models.SubTopic{
						{Name: "0/1 Knapsack", Link: "/200-problems"},
						{Name: "Longest Common Subsequence", Link: "/200-problems"},
						{Name: "Longest Increasing Subsequence", Link: "/200-problems"},
					},
				},
				{
					ID:          "d3s4",
					Time:        "14:15 - 15:30",
					Duration:    "1.25 hours",
					Topic:       "Decorator & Adapter Patterns",
					Description: "Structural patterns",
					Link:        "/design-patterns",
					Icon:        "🎨",
					Category:    "Design Patterns",
					SubTopics: []models.SubTopic{
						{Name: "Decorator Pattern", Link: "/topic/design-patterns/decorator"},
						{Name: "Adapter Pattern", Link: "/topic/design-patterns/adapter"},
						{Name: "Facade Pattern", Link: "/topic/design-patterns/facade"},
					},
				},
				{
					ID:          "d3s5",
					Time:        "15:45 - 17:15",
					Duration:    "1.5 hours",
					Topic:       "Redis Deep Dive",
					Description: "Data structures and patterns",
					Link:        "/redis",
					Icon:        "⚡",
					Category:    "Cache",
					SubTopics: []models.SubTopic{
						{Name: "Strings & Hashes", Link: "/redis#strings"},
						{Name: "Lists & Sets", Link: "/redis#lists"},
						{Name: "Sorted Sets", Link: "/redis#sorted-sets"},
						{Name: "Pub/Sub", Link: "/redis#pubsub"},
					},
				},
				{
					ID:          "d3s6",
					Time:        "17:30 - 18:00",
					Duration:    "30 mins",
					Topic:       "DP Practice",
					Description: "Solve one more DP problem",
					Link:        "/practice",
					Icon:        "🔄",
					Category:    "Review",
					SubTopics: []models.SubTopic{
						{Name: "Practice Problems", Link: "/practice"},
					},
				},
			},
		},
		{
			Day:   4,
			Title: "Graphs & Real-World Architectures",
			Sessions: []models.StudySession{
				{
					ID:          "d4s1",
					Time:        "09:00 - 10:30",
					Duration:    "1.5 hours",
					Topic:       "Graph Traversal",
					Description: "BFS, DFS, and applications",
					Link:        "/200-problems",
					Icon:        "🕸️",
					Category:    "DSA",
					SubTopics: []models.SubTopic{
						{Name: "Number of Islands", Link: "/200-problems"},
						{Name: "Clone Graph", Link: "/200-problems"},
						{Name: "Course Schedule", Link: "/200-problems"},
					},
				},
				{
					ID:          "d4s2",
					Time:        "10:45 - 12:00",
					Duration:    "1.25 hours",
					Topic:       "System Architectures",
					Description: "Study real-world systems",
					Link:        "/system-architectures",
					Icon:        "🏛️",
					Category:    "Architecture",
					SubTopics: []models.SubTopic{
						{Name: "Netflix Architecture", Link: "/system-architectures#netflix"},
						{Name: "Uber Architecture", Link: "/system-architectures#uber"},
						{Name: "Twitter Architecture", Link: "/system-architectures#twitter"},
					},
				},
				{
					ID:          "d4s3",
					Time:        "13:00 - 14:00",
					Duration:    "1 hour",
					Topic:       "Graph Algorithms",
					Description: "Shortest paths and spanning trees",
					Link:        "/200-problems",
					Icon:        "🗺️",
					Category:    "DSA",
					SubTopics: []models.SubTopic{
						{Name: "Dijkstra's Algorithm", Link: "/200-problems"},
						{Name: "Bellman-Ford", Link: "/200-problems"},
						{Name: "Minimum Spanning Tree", Link: "/200-problems"},
					},
				},
				{
					ID:          "d4s4",
					Time:        "14:15 - 15:30",
					Duration:    "1.25 hours",
					Topic:       "Proxy & Builder Patterns",
					Description: "Advanced structural patterns",
					Link:        "/design-patterns",
					Icon:        "🔨",
					Category:    "Design Patterns",
					SubTopics: []models.SubTopic{
						{Name: "Proxy Pattern", Link: "/topic/design-patterns/proxy"},
						{Name: "Builder Pattern", Link: "/topic/design-patterns/builder"},
						{Name: "Prototype Pattern", Link: "/topic/design-patterns/prototype"},
					},
				},
				{
					ID:          "d4s5",
					Time:        "15:45 - 17:15",
					Duration:    "1.5 hours",
					Topic:       "Elasticsearch Fundamentals",
					Description: "Search, mappings, analyzers",
					Link:        "/elasticsearch",
					Icon:        "🔍",
					Category:    "Search",
					SubTopics: []models.SubTopic{
						{Name: "Query DSL", Link: "/elasticsearch#query-dsl"},
						{Name: "Mappings & Types", Link: "/elasticsearch#mappings"},
						{Name: "Analyzers", Link: "/elasticsearch#analyzers"},
						{Name: "Aggregations", Link: "/elasticsearch#aggregations"},
					},
				},
				{
					ID:          "d4s6",
					Time:        "17:30 - 18:00",
					Duration:    "30 mins",
					Topic:       "Graph Review",
					Description: "Recap graph concepts",
					Link:        "/",
					Icon:        "🔄",
					Category:    "Review",
					SubTopics: []models.SubTopic{
						{Name: "BFS vs DFS", Link: "/200-problems"},
					},
				},
			},
		},
		{
			Day:   5,
			Title: "Advanced Topics & Rate Limiting",
			Sessions: []models.StudySession{
				{
					ID:          "d5s1",
					Time:        "09:00 - 10:30",
					Duration:    "1.5 hours",
					Topic:       "Heaps & Priority Queues",
					Description: "Min/max heaps and applications",
					Link:        "/200-problems",
					Icon:        "📈",
					Category:    "DSA",
					SubTopics: []models.SubTopic{
						{Name: "Kth Largest Element", Link: "/200-problems"},
						{Name: "Merge K Sorted Lists", Link: "/200-problems"},
						{Name: "Top K Frequent Elements", Link: "/200-problems"},
					},
				},
				{
					ID:          "d5s2",
					Time:        "10:45 - 12:00",
					Duration:    "1.25 hours",
					Topic:       "Rate Limiting",
					Description: "Token bucket, leaky bucket, sliding window",
					Link:        "/topic/system-design/rate-limiting",
					Icon:        "🚦",
					Category:    "System Design",
					SubTopics: []models.SubTopic{
						{Name: "Token Bucket", Link: "/topic/system-design/rate-limiting#token-bucket"},
						{Name: "Leaky Bucket", Link: "/topic/system-design/rate-limiting#leaky-bucket"},
						{Name: "Sliding Window", Link: "/topic/system-design/rate-limiting#sliding-window"},
					},
				},
				{
					ID:          "d5s3",
					Time:        "13:00 - 14:15",
					Duration:    "1.25 hours",
					Topic:       "Sorting Algorithms",
					Description: "Quick sort, merge sort, heap sort",
					Link:        "/200-problems",
					Icon:        "🔢",
					Category:    "DSA",
					SubTopics: []models.SubTopic{
						{Name: "Quick Sort", Link: "/200-problems"},
						{Name: "Merge Sort", Link: "/200-problems"},
						{Name: "Counting Sort", Link: "/200-problems"},
					},
				},
				{
					ID:          "d5s4",
					Time:        "14:30 - 15:45",
					Duration:    "1.25 hours",
					Topic:       "Circuit Breaker Pattern",
					Description: "Fault tolerance and resilience",
					Link:        "/topic/system-design/circuit-breaker",
					Icon:        "🔌",
					Category:    "System Design",
					SubTopics: []models.SubTopic{
						{Name: "Circuit States", Link: "/topic/system-design/circuit-breaker#states"},
						{Name: "Implementation", Link: "/topic/system-design/circuit-breaker#implementation"},
						{Name: "Hystrix Pattern", Link: "/topic/system-design/circuit-breaker#hystrix"},
					},
				},
				{
					ID:          "d5s5",
					Time:        "16:00 - 17:15",
					Duration:    "1.25 hours",
					Topic:       "Build Rate Limiter",
					Description: "Hands-on implementation",
					Link:        "/machine-coding",
					Icon:        "⚙️",
					Category:    "Machine Coding",
					SubTopics: []models.SubTopic{
						{Name: "Token Bucket Implementation", Link: "/machine-coding"},
						{Name: "Distributed Rate Limiter", Link: "/machine-coding"},
					},
				},
				{
					ID:          "d5s6",
					Time:        "17:30 - 18:00",
					Duration:    "30 mins",
					Topic:       "Practice Session",
					Description: "Mixed problems",
					Link:        "/practice",
					Icon:        "🔄",
					Category:    "Review",
					SubTopics: []models.SubTopic{
						{Name: "Code Runner", Link: "/practice"},
					},
				},
			},
		},
		{
			Day:   6,
			Title: "Concurrency & Distributed Systems",
			Sessions: []models.StudySession{
				{
					ID:          "d6s1",
					Time:        "09:00 - 10:30",
					Duration:    "1.5 hours",
					Topic:       "Concurrency Problems",
					Description: "Locks, semaphores, monitors",
					Link:        "/200-problems",
					Icon:        "🔀",
					Category:    "DSA",
					SubTopics: []models.SubTopic{
						{Name: "Producer-Consumer", Link: "/200-problems"},
						{Name: "Reader-Writer Lock", Link: "/200-problems"},
						{Name: "Dining Philosophers", Link: "/200-problems"},
					},
				},
				{
					ID:          "d6s2",
					Time:        "10:45 - 12:00",
					Duration:    "1.25 hours",
					Topic:       "Distributed Consensus",
					Description: "Paxos, Raft, leader election",
					Link:        "/topic/system-design/consensus-algorithms",
					Icon:        "🔐",
					Category:    "System Design",
					SubTopics: []models.SubTopic{
						{Name: "Raft Consensus", Link: "/topic/system-design/consensus-algorithms#raft"},
						{Name: "Paxos", Link: "/topic/system-design/consensus-algorithms#paxos"},
						{Name: "Leader Election", Link: "/topic/system-design/consensus-algorithms#leader-election"},
					},
				},
				{
					ID:          "d6s3",
					Time:        "13:00 - 14:15",
					Duration:    "1.25 hours",
					Topic:       "Go Concurrency",
					Description: "Goroutines, channels, select",
					Link:        "/golang",
					Icon:        "🐹",
					Category:    "Language",
					SubTopics: []models.SubTopic{
						{Name: "Goroutines Basics", Link: "/golang#goroutines"},
						{Name: "Channels", Link: "/golang#channels"},
						{Name: "Select Statement", Link: "/golang#select"},
						{Name: "Worker Pools", Link: "/golang#worker-pools"},
					},
				},
				{
					ID:          "d6s4",
					Time:        "14:30 - 15:45",
					Duration:    "1.25 hours",
					Topic:       "State & Template Method",
					Description: "Behavioral patterns",
					Link:        "/design-patterns",
					Icon:        "🎬",
					Category:    "Design Patterns",
					SubTopics: []models.SubTopic{
						{Name: "State Pattern", Link: "/topic/design-patterns/state"},
						{Name: "Template Method", Link: "/topic/design-patterns/template-method"},
						{Name: "Visitor Pattern", Link: "/topic/design-patterns/visitor"},
					},
				},
				{
					ID:          "d6s5",
					Time:        "16:00 - 17:15",
					Duration:    "1.25 hours",
					Topic:       "Distributed Locking",
					Description: "Redlock, ZooKeeper",
					Link:        "/topic/system-design/distributed-locking",
					Icon:        "🔒",
					Category:    "System Design",
					SubTopics: []models.SubTopic{
						{Name: "Redlock Algorithm", Link: "/topic/system-design/distributed-locking#redlock"},
						{Name: "ZooKeeper Locks", Link: "/topic/system-design/distributed-locking#zookeeper"},
						{Name: "Etcd Locks", Link: "/topic/system-design/distributed-locking#etcd"},
					},
				},
				{
					ID:          "d6s6",
					Time:        "17:30 - 18:00",
					Duration:    "30 mins",
					Topic:       "Concurrency Practice",
					Description: "Go exercises",
					Link:        "/golang",
					Icon:        "🔄",
					Category:    "Review",
					SubTopics: []models.SubTopic{
						{Name: "Channel Exercises", Link: "/golang"},
					},
				},
			},
		},
		{
			Day:   7,
			Title: "Mock Interviews & Integration",
			Sessions: []models.StudySession{
				{
					ID:          "d7s1",
					Time:        "09:00 - 10:30",
					Duration:    "1.5 hours",
					Topic:       "Mixed DSA Problems",
					Description: "Interview simulation - timed practice",
					Link:        "/200-problems",
					Icon:        "🎓",
					Category:    "DSA",
					SubTopics: []models.SubTopic{
						{Name: "Easy Problem (10 min)", Link: "/200-problems"},
						{Name: "Medium Problem (25 min)", Link: "/200-problems"},
						{Name: "Hard Problem (45 min)", Link: "/200-problems"},
					},
				},
				{
					ID:          "d7s2",
					Time:        "10:45 - 12:00",
					Duration:    "1.25 hours",
					Topic:       "System Design Interview",
					Description: "Design Twitter/WhatsApp/YouTube",
					Link:        "/system-design",
					Icon:        "🎯",
					Category:    "System Design",
					SubTopics: []models.SubTopic{
						{Name: "Design Twitter", Link: "/system-design#twitter"},
						{Name: "Design WhatsApp", Link: "/system-design#whatsapp"},
						{Name: "Design YouTube", Link: "/system-design#youtube"},
					},
				},
				{
					ID:          "d7s3",
					Time:        "13:00 - 14:00",
					Duration:    "1 hour",
					Topic:       "More Mock Problems",
					Description: "Practice with variety",
					Link:        "/200-problems",
					Icon:        "💪",
					Category:    "DSA",
					SubTopics: []models.SubTopic{
						{Name: "Backtracking Problem", Link: "/200-problems"},
						{Name: "DP Problem", Link: "/200-problems"},
						{Name: "Graph Problem", Link: "/200-problems"},
					},
				},
				{
					ID:          "d7s4",
					Time:        "14:15 - 15:30",
					Duration:    "1.25 hours",
					Topic:       "Python Asyncio",
					Description: "Event loops and coroutines",
					Link:        "/python-asyncio",
					Icon:        "🐍",
					Category:    "Language",
					SubTopics: []models.SubTopic{
						{Name: "Async/Await Basics", Link: "/python-asyncio#async-await"},
						{Name: "Event Loop", Link: "/python-asyncio#event-loop"},
						{Name: "Asyncio Patterns", Link: "/python-asyncio#patterns"},
						{Name: "GIL Explained", Link: "/python-asyncio#gil"},
					},
				},
				{
					ID:          "d7s5",
					Time:        "15:45 - 17:00",
					Duration:    "1.25 hours",
					Topic:       "Design Patterns Review",
					Description: "Recap all 23 patterns",
					Link:        "/design-patterns",
					Icon:        "📚",
					Category:    "Review",
					SubTopics: []models.SubTopic{
						{Name: "Creational Patterns", Link: "/design-patterns#creational"},
						{Name: "Structural Patterns", Link: "/design-patterns#structural"},
						{Name: "Behavioral Patterns", Link: "/design-patterns#behavioral"},
					},
				},
				{
					ID:          "d7s6",
					Time:        "17:15 - 18:00",
					Duration:    "45 mins",
					Topic:       "Week Reflection & Planning",
					Description: "Review progress and set next goals",
					Link:        "/",
					Icon:        "✅",
					Category:    "Complete",
					SubTopics: []models.SubTopic{
						{Name: "Review Weak Areas", Link: "/"},
						{Name: "Plan Next Steps", Link: "/"},
						{Name: "Celebrate Progress!", Link: "/"},
					},
				},
			},
		},
	}
}
