package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/vaibhav-jain-dev/learning-algo/internal/elasticsearch"
)

// ElasticsearchHandlers handles Elasticsearch-related HTTP requests
type ElasticsearchHandlers struct {
	es *elasticsearch.Client
}

// NewElasticsearchHandlers creates new Elasticsearch handlers
func NewElasticsearchHandlers(es *elasticsearch.Client) *ElasticsearchHandlers {
	return &ElasticsearchHandlers{es: es}
}

// ExecuteQuery handles POST /api/elasticsearch/execute
func (h *ElasticsearchHandlers) ExecuteQuery(c *fiber.Ctx) error {
	var req struct {
		Method string `json:"method"`
		Path   string `json:"path"`
		Body   string `json:"body"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	// Default method to GET
	if req.Method == "" {
		req.Method = "GET"
	}

	// Ensure path starts with /
	if !strings.HasPrefix(req.Path, "/") {
		req.Path = "/" + req.Path
	}

	ctx, cancel := context.WithTimeout(c.Context(), 30*time.Second)
	defer cancel()

	result := h.es.ExecuteQuery(ctx, req.Method, req.Path, req.Body)

	// Format response JSON for display
	if result.Success && len(result.Response) > 0 {
		var prettyJSON bytes.Buffer
		if json.Indent(&prettyJSON, result.Response, "", "  ") == nil {
			result.Response = prettyJSON.Bytes()
		}
	}

	return c.JSON(result)
}

// Search handles POST /api/elasticsearch/search
func (h *ElasticsearchHandlers) Search(c *fiber.Ctx) error {
	var req struct {
		Index string `json:"index"`
		Query string `json:"query"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	if req.Index == "" {
		req.Index = "_all"
	}

	ctx, cancel := context.WithTimeout(c.Context(), 30*time.Second)
	defer cancel()

	result := h.es.Search(ctx, req.Index, req.Query)

	return c.JSON(result)
}

// GetStats handles GET /api/elasticsearch/stats
func (h *ElasticsearchHandlers) GetStats(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(c.Context(), 10*time.Second)
	defer cancel()

	stats, err := h.es.GetIndexStats(ctx)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"indices": stats,
	})
}

// GetMapping handles GET /api/elasticsearch/mapping/:index
func (h *ElasticsearchHandlers) GetMapping(c *fiber.Ctx) error {
	index := c.Params("index")
	if index == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Index name required",
		})
	}

	ctx, cancel := context.WithTimeout(c.Context(), 10*time.Second)
	defer cancel()

	mapping, err := h.es.GetIndexMapping(ctx, index)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(mapping)
}

// GetAllMappings handles GET /api/elasticsearch/mappings
func (h *ElasticsearchHandlers) GetAllMappings(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(c.Context(), 10*time.Second)
	defer cancel()

	stats, err := h.es.GetIndexStats(ctx)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	var mappings []*elasticsearch.IndexMapping
	for _, stat := range stats {
		mapping, err := h.es.GetIndexMapping(ctx, stat.IndexName)
		if err == nil {
			mappings = append(mappings, mapping)
		}
	}

	return c.JSON(fiber.Map{
		"mappings": mappings,
	})
}

// HealthCheck handles GET /api/elasticsearch/health
func (h *ElasticsearchHandlers) HealthCheck(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(c.Context(), 5*time.Second)
	defer cancel()

	health, err := h.es.GetClusterHealth(ctx)
	if err != nil {
		return c.Status(fiber.StatusServiceUnavailable).JSON(fiber.Map{
			"status":     "unhealthy",
			"error":      err.Error(),
			"message":    "Elasticsearch is not available",
			"kibana_url": h.es.GetKibanaURL(),
			"es_url":     h.es.GetBaseURL(),
		})
	}

	return c.JSON(fiber.Map{
		"status":        "healthy",
		"cluster":       health,
		"message":       "Elasticsearch is running",
		"indices_ready": true,
		"kibana_url":    h.es.GetKibanaURL(),
		"es_url":        h.es.GetBaseURL(),
	})
}

// ResetIndices handles POST /api/elasticsearch/reset
func (h *ElasticsearchHandlers) ResetIndices(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(c.Context(), 60*time.Second)
	defer cancel()

	if err := h.es.ResetIndices(ctx, InitializeElasticsearch); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   err.Error(),
			"message": "Failed to reset indices",
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"message": "Indices reset successfully",
	})
}

// Analyze handles POST /api/elasticsearch/analyze
func (h *ElasticsearchHandlers) Analyze(c *fiber.Ctx) error {
	var req struct {
		Index    string `json:"index"`
		Analyzer string `json:"analyzer"`
		Text     string `json:"text"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	path := "/_analyze"
	if req.Index != "" {
		path = fmt.Sprintf("/%s/_analyze", req.Index)
	}

	body := map[string]string{
		"text": req.Text,
	}
	if req.Analyzer != "" {
		body["analyzer"] = req.Analyzer
	}

	bodyJSON, _ := json.Marshal(body)

	ctx, cancel := context.WithTimeout(c.Context(), 10*time.Second)
	defer cancel()

	result := h.es.ExecuteQuery(ctx, "POST", path, string(bodyJSON))

	return c.JSON(result)
}

// Explain handles POST /api/elasticsearch/explain
func (h *ElasticsearchHandlers) Explain(c *fiber.Ctx) error {
	var req struct {
		Index string `json:"index"`
		ID    string `json:"id"`
		Query string `json:"query"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	if req.Index == "" || req.ID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Index and document ID required",
		})
	}

	path := fmt.Sprintf("/%s/_explain/%s", req.Index, req.ID)

	ctx, cancel := context.WithTimeout(c.Context(), 10*time.Second)
	defer cancel()

	result := h.es.ExecuteQuery(ctx, "POST", path, req.Query)

	return c.JSON(result)
}

// Import bytes for JSON formatting
import "bytes"

// InitializeElasticsearch creates the learning indices with sample data
func InitializeElasticsearch(ctx context.Context, es *elasticsearch.Client) error {
	// Create tests index
	testsMapping := `{
		"settings": {
			"number_of_shards": 1,
			"number_of_replicas": 0,
			"analysis": {
				"analyzer": {
					"test_analyzer": {
						"type": "custom",
						"tokenizer": "standard",
						"filter": ["lowercase", "asciifolding", "test_synonym"]
					},
					"autocomplete": {
						"type": "custom",
						"tokenizer": "autocomplete_tokenizer",
						"filter": ["lowercase"]
					}
				},
				"tokenizer": {
					"autocomplete_tokenizer": {
						"type": "edge_ngram",
						"min_gram": 2,
						"max_gram": 20,
						"token_chars": ["letter", "digit"]
					}
				},
				"filter": {
					"test_synonym": {
						"type": "synonym",
						"synonyms": [
							"cbc, complete blood count, blood test",
							"hb, haemoglobin, hemoglobin",
							"wbc, white blood cell, leucocyte",
							"rbc, red blood cell, erythrocyte"
						]
					}
				}
			}
		},
		"mappings": {
			"properties": {
				"id": { "type": "integer" },
				"testName": {
					"type": "text",
					"analyzer": "test_analyzer",
					"fields": {
						"keyword": { "type": "keyword" },
						"autocomplete": {
							"type": "text",
							"analyzer": "autocomplete",
							"search_analyzer": "standard"
						}
					}
				},
				"requisite": { "type": "text" },
				"groupTests": { "type": "text" },
				"testAlias": {
					"type": "text",
					"analyzer": "test_analyzer",
					"fields": {
						"keyword": { "type": "keyword" }
					}
				},
				"genderDescription": { "type": "keyword" },
				"cityCode": { "type": "keyword" },
				"consumerPrice": { "type": "float" },
				"frequency": { "type": "integer" }
			}
		}
	}`

	if err := es.CreateIndex(ctx, "tests", testsMapping); err != nil {
		return fmt.Errorf("failed to create tests index: %w", err)
	}

	// Create packages index
	packagesMapping := `{
		"settings": {
			"number_of_shards": 1,
			"number_of_replicas": 0,
			"analysis": {
				"analyzer": {
					"package_analyzer": {
						"type": "custom",
						"tokenizer": "standard",
						"filter": ["lowercase", "asciifolding"]
					}
				}
			}
		},
		"mappings": {
			"properties": {
				"id": { "type": "integer" },
				"packageName": {
					"type": "text",
					"analyzer": "package_analyzer",
					"fields": {
						"keyword": { "type": "keyword" },
						"suggest": {
							"type": "completion"
						}
					}
				},
				"requisite": { "type": "text" },
				"genderDescription": { "type": "keyword" },
				"cityCode": { "type": "keyword" },
				"consumerPrice": { "type": "float" },
				"frequency": { "type": "integer" },
				"tests": {
					"type": "nested",
					"properties": {
						"id": { "type": "integer" },
						"testName": { "type": "text" },
						"requisite": { "type": "text" },
						"groupTests": { "type": "text" },
						"testAlias": { "type": "text" },
						"genderDescription": { "type": "keyword" },
						"cityCode": { "type": "keyword" },
						"consumerPrice": { "type": "float" },
						"frequency": { "type": "integer" }
					}
				}
			}
		}
	}`

	if err := es.CreateIndex(ctx, "packages", packagesMapping); err != nil {
		return fmt.Errorf("failed to create packages index: %w", err)
	}

	return nil
}

// LoadSampleData loads sample data from JSON files into Elasticsearch
func LoadSampleData(ctx context.Context, es *elasticsearch.Client, testsJSON, packagesJSON []byte) error {
	// Parse and index tests
	var tests []map[string]interface{}
	if err := json.Unmarshal(testsJSON, &tests); err != nil {
		return fmt.Errorf("failed to parse tests JSON: %w", err)
	}

	if len(tests) > 0 {
		if err := es.BulkIndex(ctx, "tests", tests); err != nil {
			return fmt.Errorf("failed to index tests: %w", err)
		}
	}

	// Parse and index packages
	var packages []map[string]interface{}
	if err := json.Unmarshal(packagesJSON, &packages); err != nil {
		return fmt.Errorf("failed to parse packages JSON: %w", err)
	}

	if len(packages) > 0 {
		if err := es.BulkIndex(ctx, "packages", packages); err != nil {
			return fmt.Errorf("failed to index packages: %w", err)
		}
	}

	// Refresh indices to make documents searchable
	es.RefreshIndex(ctx, "tests")
	es.RefreshIndex(ctx, "packages")

	return nil
}
