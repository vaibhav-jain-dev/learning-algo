package handlers

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

const maxSavedVersions = 10

// CodeSaveHandlers manages saving and loading user code
type CodeSaveHandlers struct {
	storageDir string
	mu         sync.RWMutex
}

// SavedCode represents a saved code version
type SavedCode struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Code      string    `json:"code"`
	Language  string    `json:"language"`
	ProblemID string    `json:"problem_id"`
	Category  string    `json:"category"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	IsAuto    bool      `json:"is_auto"`
}

// SavedCodeList represents the list of saved codes for a language+problem combo
type SavedCodeList struct {
	Versions []SavedCode `json:"versions"`
}

// NewCodeSaveHandlers creates a new code save handler
func NewCodeSaveHandlers(baseDir string) *CodeSaveHandlers {
	storageDir := filepath.Join(baseDir, "user-code")
	os.MkdirAll(storageDir, 0755)
	return &CodeSaveHandlers{
		storageDir: storageDir,
	}
}

// getListFilePath returns the path to the saved versions list file
func (h *CodeSaveHandlers) getListFilePath(language, category, problemID string) string {
	// Sanitize to prevent path traversal
	lang := sanitizePath(language)
	cat := sanitizePath(category)
	pid := sanitizePath(strings.ReplaceAll(problemID, "/", "__"))

	dir := filepath.Join(h.storageDir, lang, cat)
	os.MkdirAll(dir, 0755)
	return filepath.Join(dir, pid+".json")
}

// sanitizePath removes path traversal characters
func sanitizePath(s string) string {
	s = strings.ReplaceAll(s, "..", "")
	s = strings.ReplaceAll(s, "/", "_")
	s = strings.ReplaceAll(s, "\\", "_")
	s = strings.TrimSpace(s)
	if s == "" {
		s = "_default"
	}
	return s
}

// loadList reads the saved code list from disk
func (h *CodeSaveHandlers) loadList(language, category, problemID string) (*SavedCodeList, error) {
	filePath := h.getListFilePath(language, category, problemID)

	data, err := os.ReadFile(filePath)
	if err != nil {
		if os.IsNotExist(err) {
			return &SavedCodeList{Versions: []SavedCode{}}, nil
		}
		return nil, err
	}

	var list SavedCodeList
	if err := json.Unmarshal(data, &list); err != nil {
		return &SavedCodeList{Versions: []SavedCode{}}, nil
	}
	return &list, nil
}

// saveList writes the saved code list to disk
func (h *CodeSaveHandlers) saveList(language, category, problemID string, list *SavedCodeList) error {
	filePath := h.getListFilePath(language, category, problemID)

	data, err := json.MarshalIndent(list, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(filePath, data, 0644)
}

// SaveCode saves user code (POST /api/code/save)
func (h *CodeSaveHandlers) SaveCode(c *fiber.Ctx) error {
	h.mu.Lock()
	defer h.mu.Unlock()

	var req struct {
		Code      string `json:"code"`
		Language  string `json:"language"`
		ProblemID string `json:"problem_id"`
		Category  string `json:"category"`
		Name      string `json:"name"`
		ID        string `json:"id"`
		IsAuto    bool   `json:"is_auto"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	if req.Code == "" || req.Language == "" {
		return c.Status(400).JSON(fiber.Map{"error": "code and language are required"})
	}

	if req.Category == "" {
		req.Category = "_global"
	}
	if req.ProblemID == "" {
		req.ProblemID = "_global"
	}

	list, err := h.loadList(req.Language, req.Category, req.ProblemID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to load saved codes"})
	}

	now := time.Now()

	// If ID provided, update existing entry
	if req.ID != "" {
		for i, v := range list.Versions {
			if v.ID == req.ID {
				list.Versions[i].Code = req.Code
				list.Versions[i].UpdatedAt = now
				if req.Name != "" {
					list.Versions[i].Name = req.Name
				}
				list.Versions[i].IsAuto = req.IsAuto

				if err := h.saveList(req.Language, req.Category, req.ProblemID, list); err != nil {
					return c.Status(500).JSON(fiber.Map{"error": "Failed to save"})
				}
				return c.JSON(fiber.Map{
					"success": true,
					"version": list.Versions[i],
					"message": "Code updated",
				})
			}
		}
	}

	// Create new entry
	name := req.Name
	if name == "" {
		if req.IsAuto {
			name = fmt.Sprintf("Auto-save %s", now.Format("Jan 2 15:04"))
		} else {
			name = fmt.Sprintf("Save %d", len(list.Versions)+1)
		}
	}

	newVersion := SavedCode{
		ID:        uuid.New().String()[:8],
		Name:      name,
		Code:      req.Code,
		Language:  req.Language,
		ProblemID: req.ProblemID,
		Category:  req.Category,
		CreatedAt: now,
		UpdatedAt: now,
		IsAuto:    req.IsAuto,
	}

	// Add to the beginning (most recent first)
	list.Versions = append([]SavedCode{newVersion}, list.Versions...)

	// Enforce max limit - remove oldest (from the end)
	if len(list.Versions) > maxSavedVersions {
		list.Versions = list.Versions[:maxSavedVersions]
	}

	if err := h.saveList(req.Language, req.Category, req.ProblemID, list); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to save"})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"version": newVersion,
		"message": "Code saved",
	})
}

// ListSavedCode lists saved code versions (GET /api/code/list)
func (h *CodeSaveHandlers) ListSavedCode(c *fiber.Ctx) error {
	h.mu.RLock()
	defer h.mu.RUnlock()

	language := c.Query("language")
	category := c.Query("category", "_global")
	problemID := c.Query("problem_id", "_global")

	if language == "" {
		return c.Status(400).JSON(fiber.Map{"error": "language parameter required"})
	}

	list, err := h.loadList(language, category, problemID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to load saved codes"})
	}

	// Sort by updated_at descending (most recent first)
	sort.Slice(list.Versions, func(i, j int) bool {
		return list.Versions[i].UpdatedAt.After(list.Versions[j].UpdatedAt)
	})

	return c.JSON(fiber.Map{
		"versions": list.Versions,
		"count":    len(list.Versions),
	})
}

// LoadCode loads a specific saved code version (GET /api/code/load/:id)
func (h *CodeSaveHandlers) LoadCode(c *fiber.Ctx) error {
	h.mu.RLock()
	defer h.mu.RUnlock()

	id := c.Params("id")
	language := c.Query("language")
	category := c.Query("category", "_global")
	problemID := c.Query("problem_id", "_global")

	if id == "" || language == "" {
		return c.Status(400).JSON(fiber.Map{"error": "id and language are required"})
	}

	list, err := h.loadList(language, category, problemID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to load saved codes"})
	}

	for _, v := range list.Versions {
		if v.ID == id {
			return c.JSON(fiber.Map{
				"version": v,
				"success": true,
			})
		}
	}

	return c.Status(404).JSON(fiber.Map{"error": "Version not found"})
}

// DeleteCode deletes a saved code version (DELETE /api/code/:id)
func (h *CodeSaveHandlers) DeleteCode(c *fiber.Ctx) error {
	h.mu.Lock()
	defer h.mu.Unlock()

	id := c.Params("id")
	language := c.Query("language")
	category := c.Query("category", "_global")
	problemID := c.Query("problem_id", "_global")

	if id == "" || language == "" {
		return c.Status(400).JSON(fiber.Map{"error": "id and language are required"})
	}

	list, err := h.loadList(language, category, problemID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to load saved codes"})
	}

	for i, v := range list.Versions {
		if v.ID == id {
			list.Versions = append(list.Versions[:i], list.Versions[i+1:]...)
			if err := h.saveList(language, category, problemID, list); err != nil {
				return c.Status(500).JSON(fiber.Map{"error": "Failed to save"})
			}
			return c.JSON(fiber.Map{
				"success": true,
				"message": "Deleted",
			})
		}
	}

	return c.Status(404).JSON(fiber.Map{"error": "Version not found"})
}

// RenameCode renames a saved code version (PUT /api/code/:id/rename)
func (h *CodeSaveHandlers) RenameCode(c *fiber.Ctx) error {
	h.mu.Lock()
	defer h.mu.Unlock()

	id := c.Params("id")
	var req struct {
		Name      string `json:"name"`
		Language  string `json:"language"`
		Category  string `json:"category"`
		ProblemID string `json:"problem_id"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	if req.Category == "" {
		req.Category = "_global"
	}
	if req.ProblemID == "" {
		req.ProblemID = "_global"
	}

	list, err := h.loadList(req.Language, req.Category, req.ProblemID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to load"})
	}

	for i, v := range list.Versions {
		if v.ID == id {
			list.Versions[i].Name = req.Name
			list.Versions[i].UpdatedAt = time.Now()
			if err := h.saveList(req.Language, req.Category, req.ProblemID, list); err != nil {
				return c.Status(500).JSON(fiber.Map{"error": "Failed to save"})
			}
			return c.JSON(fiber.Map{
				"success": true,
				"version": list.Versions[i],
			})
		}
	}

	return c.Status(404).JSON(fiber.Map{"error": "Version not found"})
}
