package topics

import (
	"bufio"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"sync"
	"time"
)

// Topic represents a single topic with metadata
type Topic struct {
	Slug        string   `json:"slug"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Tags        []string `json:"tags"`
	Category    string   `json:"category"`
	HasContent  bool     `json:"has_content"`
}

// Category represents a topic category
type Category struct {
	Slug        string   `json:"slug"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Topics      []*Topic `json:"topics"`
}

// TopicIndexer manages dynamic topic indexing
type TopicIndexer struct {
	basePath   string
	categories map[string]*Category
	mu         sync.RWMutex
	lastScan   time.Time
	scanTTL    time.Duration
}

// Category metadata
var categoryMeta = map[string]struct {
	Title       string
	Description string
	Order       int
}{
	"system-design": {
		Title:       "System Design",
		Description: "Master distributed systems concepts with real-world examples",
		Order:       1,
	},
	"design-patterns": {
		Title:       "Design Patterns",
		Description: "Learn classic software design patterns with practical implementations",
		Order:       2,
	},
	"machine-coding": {
		Title:       "Machine Coding",
		Description: "Practice implementing real-world systems from scratch",
		Order:       3,
	},
	"microservices": {
		Title:       "Microservices",
		Description: "Master microservices architecture patterns and best practices",
		Order:       4,
	},
}

// NewTopicIndexer creates a new topic indexer
func NewTopicIndexer(basePath string, scanTTL time.Duration) *TopicIndexer {
	idx := &TopicIndexer{
		basePath:   basePath,
		categories: make(map[string]*Category),
		scanTTL:    scanTTL,
	}
	// Initial scan
	idx.Scan()
	return idx
}

// Scan scans all topics directory and builds the index
func (idx *TopicIndexer) Scan() error {
	idx.mu.Lock()
	defer idx.mu.Unlock()

	categories := make(map[string]*Category)

	// Read category directories
	entries, err := os.ReadDir(idx.basePath)
	if err != nil {
		return err
	}

	// Use worker pool for parallel scanning
	type scanResult struct {
		category string
		topic    *Topic
	}

	// Collect all topic paths first
	var topicPaths []struct {
		category string
		topicDir string
		path     string
	}

	for _, entry := range entries {
		if !entry.IsDir() {
			continue
		}
		categorySlug := entry.Name()

		// Initialize category
		meta, ok := categoryMeta[categorySlug]
		if !ok {
			continue // Skip unknown categories
		}

		categories[categorySlug] = &Category{
			Slug:        categorySlug,
			Title:       meta.Title,
			Description: meta.Description,
			Topics:      make([]*Topic, 0),
		}

		// Read topic directories
		categoryPath := filepath.Join(idx.basePath, categorySlug)
		topicEntries, err := os.ReadDir(categoryPath)
		if err != nil {
			continue
		}

		for _, topicEntry := range topicEntries {
			if !topicEntry.IsDir() {
				continue
			}
			topicPaths = append(topicPaths, struct {
				category string
				topicDir string
				path     string
			}{
				category: categorySlug,
				topicDir: topicEntry.Name(),
				path:     filepath.Join(categoryPath, topicEntry.Name(), "content.md"),
			})
		}
	}

	// Process topics in parallel with limited concurrency
	results := make(chan scanResult, len(topicPaths))
	sem := make(chan struct{}, 10) // Limit to 10 concurrent file reads
	var wg sync.WaitGroup

	for _, tp := range topicPaths {
		wg.Add(1)
		go func(category, topicDir, path string) {
			defer wg.Done()
			sem <- struct{}{}        // Acquire
			defer func() { <-sem }() // Release

			topic := idx.parseTopicFile(category, topicDir, path)
			results <- scanResult{category: category, topic: topic}
		}(tp.category, tp.topicDir, tp.path)
	}

	// Close results when all workers done
	go func() {
		wg.Wait()
		close(results)
	}()

	// Collect results
	for result := range results {
		if cat, ok := categories[result.category]; ok {
			cat.Topics = append(cat.Topics, result.topic)
		}
	}

	// Sort topics alphabetically within each category
	for _, cat := range categories {
		sort.Slice(cat.Topics, func(i, j int) bool {
			return cat.Topics[i].Title < cat.Topics[j].Title
		})
	}

	idx.categories = categories
	idx.lastScan = time.Now()
	return nil
}

// parseTopicFile reads and parses a topic's content.md file
func (idx *TopicIndexer) parseTopicFile(category, topicDir, path string) *Topic {
	topic := &Topic{
		Slug:       topicDir,
		Title:      formatTitle(topicDir),
		Category:   category,
		HasContent: false,
		Tags:       []string{},
	}

	file, err := os.Open(path)
	if err != nil {
		return topic
	}
	defer file.Close()

	topic.HasContent = true

	// Read only first 50 lines for metadata extraction
	scanner := bufio.NewScanner(file)
	lineCount := 0
	var description strings.Builder
	inDescription := false
	foundTitle := false

	// Regex patterns
	titleRegex := regexp.MustCompile(`^#\s+(.+)$`)
	tagRegex := regexp.MustCompile(`\*\*(.+?)\*\*`)

	for scanner.Scan() && lineCount < 50 {
		line := scanner.Text()
		lineCount++

		// Extract title from first H1
		if !foundTitle {
			if matches := titleRegex.FindStringSubmatch(line); matches != nil {
				topic.Title = strings.TrimSpace(matches[1])
				foundTitle = true
				continue
			}
		}

		// Look for Overview/Description section
		if strings.Contains(strings.ToLower(line), "## overview") ||
			strings.Contains(strings.ToLower(line), "## problem statement") {
			inDescription = true
			continue
		}

		// End description at next heading
		if inDescription && strings.HasPrefix(line, "##") {
			inDescription = false
		}

		// Collect description lines
		if inDescription && len(line) > 0 && !strings.HasPrefix(line, "#") {
			if description.Len() > 0 {
				description.WriteString(" ")
			}
			description.WriteString(strings.TrimSpace(line))
			// Limit description length
			if description.Len() > 200 {
				break
			}
		}

		// Extract tags from bold text in first few lines
		if lineCount < 20 && len(topic.Tags) < 4 {
			if matches := tagRegex.FindAllStringSubmatch(line, -1); matches != nil {
				for _, m := range matches {
					tag := strings.TrimSpace(m[1])
					if len(tag) > 0 && len(tag) < 20 && !containsTag(topic.Tags, tag) {
						topic.Tags = append(topic.Tags, tag)
					}
				}
			}
		}
	}

	// Set description
	desc := description.String()
	if len(desc) > 150 {
		desc = desc[:147] + "..."
	}
	topic.Description = desc

	// Generate default tags from category if none found
	if len(topic.Tags) == 0 {
		topic.Tags = generateDefaultTags(category, topicDir)
	}

	return topic
}

// GetCategory returns topics for a specific category
func (idx *TopicIndexer) GetCategory(slug string) *Category {
	idx.maybeRescan()
	idx.mu.RLock()
	defer idx.mu.RUnlock()
	return idx.categories[slug]
}

// GetAllCategories returns all categories
func (idx *TopicIndexer) GetAllCategories() []*Category {
	idx.maybeRescan()
	idx.mu.RLock()
	defer idx.mu.RUnlock()

	cats := make([]*Category, 0, len(idx.categories))
	for _, cat := range idx.categories {
		cats = append(cats, cat)
	}

	// Sort by order
	sort.Slice(cats, func(i, j int) bool {
		return categoryMeta[cats[i].Slug].Order < categoryMeta[cats[j].Slug].Order
	})

	return cats
}

// maybeRescan rescans if TTL has expired
func (idx *TopicIndexer) maybeRescan() {
	idx.mu.RLock()
	needsScan := time.Since(idx.lastScan) > idx.scanTTL
	idx.mu.RUnlock()

	if needsScan {
		idx.Scan()
	}
}

// ForceRescan forces a rescan of topics
func (idx *TopicIndexer) ForceRescan() error {
	return idx.Scan()
}

// Helper functions
func formatTitle(slug string) string {
	words := strings.Split(slug, "-")
	for i, word := range words {
		if len(word) > 0 {
			words[i] = strings.ToUpper(word[:1]) + word[1:]
		}
	}
	return strings.Join(words, " ")
}

func containsTag(tags []string, tag string) bool {
	for _, t := range tags {
		if strings.EqualFold(t, tag) {
			return true
		}
	}
	return false
}

func generateDefaultTags(category, topic string) []string {
	tagMap := map[string]map[string][]string{
		"system-design": {
			"load-balancing":       {"Scalability", "High Availability"},
			"caching":              {"Performance", "Redis"},
			"database-sharding":    {"Databases", "Partitioning"},
			"message-queues":       {"Async", "Decoupling"},
			"cap-theorem":          {"Theory", "Distributed"},
			"microservices":        {"Architecture", "Services"},
			"api-gateway":          {"APIs", "Security"},
			"cdn":                  {"Performance", "Global"},
			"database-replication": {"Databases", "Reliability"},
			"rate-limiting":        {"Security", "Throttling"},
			"consensus-algorithms": {"Distributed", "Coordination"},
			"event-sourcing":       {"Architecture", "CQRS"},
		},
		"design-patterns": {
			"singleton":               {"Creational", "GoF"},
			"factory-method":          {"Creational", "GoF"},
			"abstract-factory":        {"Creational", "GoF"},
			"builder":                 {"Creational", "GoF"},
			"prototype":               {"Creational", "GoF"},
			"adapter":                 {"Structural", "GoF"},
			"bridge":                  {"Structural", "GoF"},
			"composite":               {"Structural", "GoF"},
			"decorator":               {"Structural", "GoF"},
			"facade":                  {"Structural", "GoF"},
			"flyweight":               {"Structural", "GoF"},
			"proxy":                   {"Structural", "GoF"},
			"chain-of-responsibility": {"Behavioral", "GoF"},
			"command":                 {"Behavioral", "GoF"},
			"iterator":                {"Behavioral", "GoF"},
			"mediator":                {"Behavioral", "GoF"},
			"memento":                 {"Behavioral", "GoF"},
			"observer":                {"Behavioral", "GoF"},
			"state":                   {"Behavioral", "GoF"},
			"strategy":                {"Behavioral", "GoF"},
			"template-method":         {"Behavioral", "GoF"},
			"visitor":                 {"Behavioral", "GoF"},
			"dependency-injection":    {"SOLID", "DI"},
		},
		"machine-coding": {
			"lru-cache":          {"Data Structures", "Cache"},
			"rate-limiter":       {"System Design", "Algorithms"},
			"parking-lot":        {"OOP", "Design"},
			"url-shortener":      {"System Design", "Hashing"},
			"task-scheduler":     {"Concurrency", "Scheduling"},
			"in-memory-database": {"Databases", "Key-Value"},
			"file-system":        {"OS", "Design"},
			"elevator-system":    {"OOP", "Simulation"},
			"snake-game":         {"Games", "State"},
			"tic-tac-toe":        {"Games", "AI"},
			"logger-library":     {"Utilities", "Design"},
			"pub-sub-system":     {"Messaging", "Events"},
		},
	}

	if catTags, ok := tagMap[category]; ok {
		if tags, ok := catTags[topic]; ok {
			return tags
		}
	}

	// Fallback tags
	return []string{formatTitle(category)}
}
