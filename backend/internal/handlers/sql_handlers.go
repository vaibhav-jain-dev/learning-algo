package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vaibhav-jain-dev/learning-algo/internal/db"
)

// SQLHandlers holds SQL-related HTTP handlers
type SQLHandlers struct {
	db *db.DB
}

// NewSQLHandlers creates a new SQLHandlers instance
func NewSQLHandlers(database *db.DB) *SQLHandlers {
	return &SQLHandlers{db: database}
}

// SQLDashboard renders the SQL learning dashboard page
func (h *SQLHandlers) SQLDashboard(c *fiber.Ctx) error {
	return c.Render("pages/sql-dashboard", fiber.Map{
		"Title": "SQL Learning Dashboard",
	})
}

// SQLLessons renders the SQL lessons page
func (h *SQLHandlers) SQLLessons(c *fiber.Ctx) error {
	return c.Render("pages/sql-lessons", fiber.Map{
		"Title": "SQL Lessons",
	})
}

// ExecuteSQL handles SQL query execution
func (h *SQLHandlers) ExecuteSQL(c *fiber.Ctx) error {
	var req struct {
		Query   string `json:"query"`
		Preview bool   `json:"preview"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error":   "Invalid request body",
			"success": false,
		})
	}

	if req.Query == "" {
		return c.Status(400).JSON(fiber.Map{
			"error":   "Query is required",
			"success": false,
		})
	}

	// If preview mode, return execution plan only
	if req.Preview {
		plan := h.db.PreviewQuery(c.Context(), req.Query)
		return c.JSON(fiber.Map{
			"plan":    plan.Plan,
			"error":   plan.Error,
			"success": plan.Error == "",
		})
	}

	// Execute the query
	result := h.db.ExecuteQuery(c.Context(), req.Query)
	return c.JSON(result)
}

// GetSchema returns database schema information
func (h *SQLHandlers) GetSchema(c *fiber.Ctx) error {
	schema, err := h.db.GetSchema(c.Context())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   err.Error(),
			"success": false,
		})
	}

	return c.JSON(fiber.Map{
		"schema":  schema,
		"success": true,
	})
}

// GetTableStats returns row counts for all tables
func (h *SQLHandlers) GetTableStats(c *fiber.Ctx) error {
	stats, err := h.db.GetTableStats(c.Context())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   err.Error(),
			"success": false,
		})
	}

	return c.JSON(fiber.Map{
		"stats":   stats,
		"success": true,
	})
}

// ResetDatabase resets the database to initial state
func (h *SQLHandlers) ResetDatabase(c *fiber.Ctx) error {
	if err := h.db.ResetDatabase(c.Context()); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   err.Error(),
			"success": false,
		})
	}

	return c.JSON(fiber.Map{
		"message": "Database reset successfully",
		"success": true,
	})
}

// HealthCheck checks database connectivity
func (h *SQLHandlers) HealthCheck(c *fiber.Ctx) error {
	if err := h.db.Ping(); err != nil {
		return c.Status(503).JSON(fiber.Map{
			"status":  "unhealthy",
			"error":   err.Error(),
			"success": false,
		})
	}

	return c.JSON(fiber.Map{
		"status":  "healthy",
		"success": true,
	})
}

// GetERDiagram returns the ER diagram data for visualization
func (h *SQLHandlers) GetERDiagram(c *fiber.Ctx) error {
	schema, err := h.db.GetSchema(c.Context())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   err.Error(),
			"success": false,
		})
	}

	// Transform schema to ER diagram format
	var tables []fiber.Map
	var relationships []fiber.Map

	for _, table := range schema {
		// Skip utility tables
		if table.TableName == "user_savepoints" || table.TableName == "query_history" {
			continue
		}

		columns := make([]fiber.Map, len(table.Columns))
		for i, col := range table.Columns {
			columns[i] = fiber.Map{
				"name":     col.Name,
				"type":     col.DataType,
				"nullable": col.IsNullable,
				"primary":  col.IsPrimary,
			}
		}

		tables = append(tables, fiber.Map{
			"name":    table.TableName,
			"columns": columns,
		})

		// Add foreign key relationships
		for _, fk := range table.ForeignKeys {
			relationships = append(relationships, fiber.Map{
				"from_table":  table.TableName,
				"from_column": fk.Column,
				"to_table":    fk.ReferencesTable,
				"to_column":   fk.ReferencesCol,
				"name":        fk.Name,
			})
		}
	}

	return c.JSON(fiber.Map{
		"tables":        tables,
		"relationships": relationships,
		"success":       true,
	})
}
