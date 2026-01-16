package elasticsearch

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"
)

// Client wraps the Elasticsearch HTTP client
type Client struct {
	baseURL    string
	httpClient *http.Client
}

// Config holds Elasticsearch configuration
type Config struct {
	Host string
	Port string
}

// QueryResult represents the result of an Elasticsearch query
type QueryResult struct {
	Query       string          `json:"query"`
	Response    json.RawMessage `json:"response"`
	Duration    int64           `json:"duration_ms"`
	Error       string          `json:"error,omitempty"`
	Success     bool            `json:"success"`
	Hits        int             `json:"hits,omitempty"`
	TotalHits   int64           `json:"total_hits,omitempty"`
	Took        int             `json:"took,omitempty"`
	QueryType   string          `json:"query_type"`
	Explanation string          `json:"explanation,omitempty"`
}

// IndexStats represents index statistics
type IndexStats struct {
	IndexName   string `json:"index_name"`
	DocsCount   int64  `json:"docs_count"`
	StoreSize   string `json:"store_size"`
	PrimarySize string `json:"primary_size"`
}

// IndexMapping represents index mapping information
type IndexMapping struct {
	IndexName  string                 `json:"index_name"`
	Mappings   map[string]interface{} `json:"mappings"`
	Settings   map[string]interface{} `json:"settings"`
	Properties []PropertyInfo         `json:"properties"`
}

// PropertyInfo represents a field property in a mapping
type PropertyInfo struct {
	Name     string `json:"name"`
	Type     string `json:"type"`
	Analyzer string `json:"analyzer,omitempty"`
	Index    bool   `json:"index"`
}

// ClusterHealth represents cluster health information
type ClusterHealth struct {
	ClusterName         string `json:"cluster_name"`
	Status              string `json:"status"`
	NumberOfNodes       int    `json:"number_of_nodes"`
	ActivePrimaryShards int    `json:"active_primary_shards"`
	ActiveShards        int    `json:"active_shards"`
}

// ConfigFromEnv creates config from environment variables
func ConfigFromEnv() Config {
	return Config{
		Host: getEnv("ES_HOST", "localhost"),
		Port: getEnv("ES_PORT", "9200"),
	}
}

func getEnv(key, defaultVal string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return defaultVal
}

// New creates a new Elasticsearch client
func New(cfg Config) (*Client, error) {
	baseURL := fmt.Sprintf("http://%s:%s", cfg.Host, cfg.Port)

	client := &Client{
		baseURL: baseURL,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
	}

	// Test connection
	if err := client.Ping(); err != nil {
		return nil, fmt.Errorf("failed to connect to Elasticsearch: %w", err)
	}

	return client, nil
}

// Ping checks if Elasticsearch is reachable
func (c *Client) Ping() error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, "GET", c.baseURL, nil)
	if err != nil {
		return err
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("elasticsearch returned status %d", resp.StatusCode)
	}

	return nil
}

// ExecuteQuery executes an Elasticsearch query
func (c *Client) ExecuteQuery(ctx context.Context, method, path, body string) *QueryResult {
	start := time.Now()
	result := &QueryResult{
		Query:     body,
		Success:   true,
		QueryType: detectESQueryType(method, path, body),
	}

	// Add timeout
	ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	url := c.baseURL + path

	var req *http.Request
	var err error
	if body != "" {
		req, err = http.NewRequestWithContext(ctx, method, url, strings.NewReader(body))
	} else {
		req, err = http.NewRequestWithContext(ctx, method, url, nil)
	}

	if err != nil {
		result.Error = err.Error()
		result.Success = false
		result.Duration = time.Since(start).Milliseconds()
		return result
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		result.Error = err.Error()
		result.Success = false
		result.Duration = time.Since(start).Milliseconds()
		return result
	}
	defer resp.Body.Close()

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		result.Error = fmt.Sprintf("failed to read response: %v", err)
		result.Success = false
		result.Duration = time.Since(start).Milliseconds()
		return result
	}

	result.Response = bodyBytes
	result.Duration = time.Since(start).Milliseconds()

	// Parse response for additional info
	var respData map[string]interface{}
	if err := json.Unmarshal(bodyBytes, &respData); err == nil {
		// Check for errors in response
		if errMsg, ok := respData["error"]; ok {
			result.Success = false
			if errMap, ok := errMsg.(map[string]interface{}); ok {
				if reason, ok := errMap["reason"].(string); ok {
					result.Error = reason
				} else {
					result.Error = fmt.Sprintf("%v", errMsg)
				}
			} else {
				result.Error = fmt.Sprintf("%v", errMsg)
			}
		}

		// Extract search results info
		if hits, ok := respData["hits"].(map[string]interface{}); ok {
			if total, ok := hits["total"].(map[string]interface{}); ok {
				if val, ok := total["value"].(float64); ok {
					result.TotalHits = int64(val)
				}
			}
			if hitList, ok := hits["hits"].([]interface{}); ok {
				result.Hits = len(hitList)
			}
		}

		// Extract took time
		if took, ok := respData["took"].(float64); ok {
			result.Took = int(took)
		}
	}

	// Check HTTP status
	if resp.StatusCode >= 400 {
		result.Success = false
		if result.Error == "" {
			result.Error = fmt.Sprintf("HTTP %d: %s", resp.StatusCode, http.StatusText(resp.StatusCode))
		}
	}

	return result
}

// Search performs a search query
func (c *Client) Search(ctx context.Context, index, query string) *QueryResult {
	path := fmt.Sprintf("/%s/_search", index)
	return c.ExecuteQuery(ctx, "POST", path, query)
}

// GetIndexStats returns statistics for all indices
func (c *Client) GetIndexStats(ctx context.Context) ([]IndexStats, error) {
	path := "/_cat/indices?format=json&h=index,docs.count,store.size,pri.store.size"
	result := c.ExecuteQuery(ctx, "GET", path, "")

	if !result.Success {
		return nil, fmt.Errorf(result.Error)
	}

	var indices []struct {
		Index       string `json:"index"`
		DocsCount   string `json:"docs.count"`
		StoreSize   string `json:"store.size"`
		PrimarySize string `json:"pri.store.size"`
	}

	if err := json.Unmarshal(result.Response, &indices); err != nil {
		return nil, err
	}

	var stats []IndexStats
	for _, idx := range indices {
		// Skip system indices
		if strings.HasPrefix(idx.Index, ".") {
			continue
		}
		var docsCount int64
		fmt.Sscanf(idx.DocsCount, "%d", &docsCount)
		stats = append(stats, IndexStats{
			IndexName:   idx.Index,
			DocsCount:   docsCount,
			StoreSize:   idx.StoreSize,
			PrimarySize: idx.PrimarySize,
		})
	}

	return stats, nil
}

// GetIndexMapping returns mapping for an index
func (c *Client) GetIndexMapping(ctx context.Context, index string) (*IndexMapping, error) {
	path := fmt.Sprintf("/%s/_mapping", index)
	result := c.ExecuteQuery(ctx, "GET", path, "")

	if !result.Success {
		return nil, fmt.Errorf(result.Error)
	}

	var mappingResp map[string]struct {
		Mappings map[string]interface{} `json:"mappings"`
	}

	if err := json.Unmarshal(result.Response, &mappingResp); err != nil {
		return nil, err
	}

	mapping := &IndexMapping{
		IndexName: index,
	}

	if data, ok := mappingResp[index]; ok {
		mapping.Mappings = data.Mappings

		// Extract properties
		if props, ok := data.Mappings["properties"].(map[string]interface{}); ok {
			mapping.Properties = extractProperties(props, "")
		}
	}

	return mapping, nil
}

// GetClusterHealth returns cluster health information
func (c *Client) GetClusterHealth(ctx context.Context) (*ClusterHealth, error) {
	result := c.ExecuteQuery(ctx, "GET", "/_cluster/health", "")

	if !result.Success {
		return nil, fmt.Errorf(result.Error)
	}

	var health ClusterHealth
	if err := json.Unmarshal(result.Response, &health); err != nil {
		return nil, err
	}

	return &health, nil
}

// CreateIndex creates a new index with mappings
func (c *Client) CreateIndex(ctx context.Context, index, mappings string) error {
	path := fmt.Sprintf("/%s", index)
	result := c.ExecuteQuery(ctx, "PUT", path, mappings)

	if !result.Success {
		return fmt.Errorf(result.Error)
	}

	return nil
}

// DeleteIndex deletes an index
func (c *Client) DeleteIndex(ctx context.Context, index string) error {
	path := fmt.Sprintf("/%s", index)
	result := c.ExecuteQuery(ctx, "DELETE", path, "")

	if !result.Success {
		return fmt.Errorf(result.Error)
	}

	return nil
}

// IndexDocument indexes a single document
func (c *Client) IndexDocument(ctx context.Context, index, id, doc string) error {
	var path string
	if id != "" {
		path = fmt.Sprintf("/%s/_doc/%s", index, id)
	} else {
		path = fmt.Sprintf("/%s/_doc", index)
	}
	result := c.ExecuteQuery(ctx, "POST", path, doc)

	if !result.Success {
		return fmt.Errorf(result.Error)
	}

	return nil
}

// BulkIndex indexes multiple documents
func (c *Client) BulkIndex(ctx context.Context, index string, docs []map[string]interface{}) error {
	var buf bytes.Buffer
	for _, doc := range docs {
		// Index action
		meta := map[string]interface{}{
			"index": map[string]interface{}{
				"_index": index,
			},
		}
		metaLine, _ := json.Marshal(meta)
		buf.Write(metaLine)
		buf.WriteByte('\n')

		// Document
		docLine, _ := json.Marshal(doc)
		buf.Write(docLine)
		buf.WriteByte('\n')
	}

	result := c.ExecuteQuery(ctx, "POST", "/_bulk", buf.String())

	if !result.Success {
		return fmt.Errorf(result.Error)
	}

	// Check for errors in bulk response
	var bulkResp struct {
		Errors bool `json:"errors"`
		Items  []struct {
			Index struct {
				Error interface{} `json:"error"`
			} `json:"index"`
		} `json:"items"`
	}

	if err := json.Unmarshal(result.Response, &bulkResp); err == nil && bulkResp.Errors {
		for _, item := range bulkResp.Items {
			if item.Index.Error != nil {
				return fmt.Errorf("bulk indexing error: %v", item.Index.Error)
			}
		}
	}

	return nil
}

// RefreshIndex refreshes an index to make documents searchable
func (c *Client) RefreshIndex(ctx context.Context, index string) error {
	path := fmt.Sprintf("/%s/_refresh", index)
	result := c.ExecuteQuery(ctx, "POST", path, "")

	if !result.Success {
		return fmt.Errorf(result.Error)
	}

	return nil
}

// IndexExists checks if an index exists
func (c *Client) IndexExists(ctx context.Context, index string) (bool, error) {
	path := fmt.Sprintf("/%s", index)

	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, "HEAD", c.baseURL+path, nil)
	if err != nil {
		return false, err
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return false, err
	}
	defer resp.Body.Close()

	return resp.StatusCode == http.StatusOK, nil
}

// ResetIndices deletes and recreates all learning indices
func (c *Client) ResetIndices(ctx context.Context, initFunc func(context.Context, *Client) error) error {
	// Delete existing indices
	indices := []string{"tests", "packages"}
	for _, idx := range indices {
		exists, _ := c.IndexExists(ctx, idx)
		if exists {
			if err := c.DeleteIndex(ctx, idx); err != nil {
				return fmt.Errorf("failed to delete index %s: %w", idx, err)
			}
		}
	}

	// Re-initialize
	if initFunc != nil {
		return initFunc(ctx, c)
	}

	return nil
}

// Helper functions

func detectESQueryType(method, path, body string) string {
	path = strings.ToLower(path)

	if strings.Contains(path, "_search") {
		if strings.Contains(body, "aggs") || strings.Contains(body, "aggregations") {
			return "AGGREGATION"
		}
		return "SEARCH"
	}
	if strings.Contains(path, "_bulk") {
		return "BULK"
	}
	if strings.Contains(path, "_mapping") {
		return "MAPPING"
	}
	if strings.Contains(path, "_analyze") {
		return "ANALYZE"
	}
	if strings.Contains(path, "_explain") {
		return "EXPLAIN"
	}
	if strings.Contains(path, "_count") {
		return "COUNT"
	}
	if strings.Contains(path, "_cluster") {
		return "CLUSTER"
	}
	if strings.Contains(path, "_cat") {
		return "CAT"
	}

	switch method {
	case "GET":
		return "GET"
	case "POST":
		if strings.Contains(path, "_doc") {
			return "INDEX"
		}
		return "POST"
	case "PUT":
		if strings.Contains(path, "_doc") {
			return "INDEX"
		}
		return "CREATE"
	case "DELETE":
		return "DELETE"
	}

	return "UNKNOWN"
}

func extractProperties(props map[string]interface{}, prefix string) []PropertyInfo {
	var properties []PropertyInfo

	for name, val := range props {
		prop := PropertyInfo{
			Name:  prefix + name,
			Index: true,
		}

		if propMap, ok := val.(map[string]interface{}); ok {
			if t, ok := propMap["type"].(string); ok {
				prop.Type = t
			}
			if a, ok := propMap["analyzer"].(string); ok {
				prop.Analyzer = a
			}
			if idx, ok := propMap["index"].(bool); ok {
				prop.Index = idx
			}

			// Handle nested properties
			if nestedProps, ok := propMap["properties"].(map[string]interface{}); ok {
				properties = append(properties, extractProperties(nestedProps, prefix+name+".")...)
				continue
			}
		}

		properties = append(properties, prop)
	}

	return properties
}
