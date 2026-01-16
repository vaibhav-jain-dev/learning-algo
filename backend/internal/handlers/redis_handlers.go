package handlers

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/vaibhav-jain-dev/learning-algo/internal/redis"
)

// RedisHandlers handles Redis-related HTTP requests
type RedisHandlers struct {
	redis *redis.Client
}

// NewRedisHandlers creates new Redis handlers
func NewRedisHandlers(redis *redis.Client) *RedisHandlers {
	return &RedisHandlers{redis: redis}
}

// ExecuteCommand handles POST /api/redis/execute
func (h *RedisHandlers) ExecuteCommand(c *fiber.Ctx) error {
	var req struct {
		Command string `json:"command"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	if req.Command == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Command is required",
		})
	}

	ctx, cancel := context.WithTimeout(c.Context(), 30*time.Second)
	defer cancel()

	result := h.redis.Execute(ctx, req.Command)

	return c.JSON(result)
}

// GetKeys handles GET /api/redis/keys
func (h *RedisHandlers) GetKeys(c *fiber.Ctx) error {
	pattern := c.Query("pattern", "*")

	ctx, cancel := context.WithTimeout(c.Context(), 10*time.Second)
	defer cancel()

	keys, err := h.redis.GetKeys(ctx, pattern)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"keys":  keys,
		"count": len(keys),
	})
}

// GetServerInfo handles GET /api/redis/info
func (h *RedisHandlers) GetServerInfo(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(c.Context(), 10*time.Second)
	defer cancel()

	info, err := h.redis.GetServerInfo(ctx)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(info)
}

// HealthCheck handles GET /api/redis/health
func (h *RedisHandlers) HealthCheck(c *fiber.Ctx) error {
	if err := h.redis.Ping(); err != nil {
		return c.Status(fiber.StatusServiceUnavailable).JSON(fiber.Map{
			"status":    "unhealthy",
			"error":     err.Error(),
			"message":   "Redis is not available",
			"redis_url": h.redis.GetAddr(),
		})
	}

	ctx, cancel := context.WithTimeout(c.Context(), 5*time.Second)
	defer cancel()

	info, _ := h.redis.GetServerInfo(ctx)

	return c.JSON(fiber.Map{
		"status":    "healthy",
		"message":   "Redis is running",
		"redis_url": h.redis.GetAddr(),
		"info":      info,
	})
}

// ResetData handles POST /api/redis/reset
func (h *RedisHandlers) ResetData(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(c.Context(), 30*time.Second)
	defer cancel()

	// Clear existing data
	if err := h.redis.FlushDB(ctx); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   err.Error(),
			"message": "Failed to clear database",
		})
	}

	// Load sample data
	if err := h.redis.LoadSampleData(ctx); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   err.Error(),
			"message": "Failed to load sample data",
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"message": "Database reset with sample data",
	})
}

// LoadSampleData handles POST /api/redis/load-sample
func (h *RedisHandlers) LoadSampleData(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(c.Context(), 30*time.Second)
	defer cancel()

	if err := h.redis.LoadSampleData(ctx); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   err.Error(),
			"message": "Failed to load sample data",
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"message": "Sample data loaded successfully",
	})
}
