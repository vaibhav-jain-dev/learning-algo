package redis

import (
	"bufio"
	"context"
	"errors"
	"fmt"
	"net"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"
)

// Client wraps a Redis connection
type Client struct {
	addr   string
	conn   net.Conn
	reader *bufio.Reader
	mu     sync.Mutex
}

// Config holds Redis configuration
type Config struct {
	URL string // Full URL (e.g., redis://localhost:6379)
}

// CommandResult represents the result of a Redis command
type CommandResult struct {
	Command  string      `json:"command"`
	Result   interface{} `json:"result"`
	Type     string      `json:"type"`
	Duration int64       `json:"duration_ms"`
	Error    string      `json:"error,omitempty"`
	Success  bool        `json:"success"`
}

// KeyInfo represents information about a Redis key
type KeyInfo struct {
	Key  string `json:"key"`
	Type string `json:"type"`
	TTL  int64  `json:"ttl"`
}

// ServerInfo represents Redis server information
type ServerInfo struct {
	Version       string `json:"version"`
	Mode          string `json:"mode"`
	UsedMemory    string `json:"used_memory"`
	ConnectedClients int `json:"connected_clients"`
	TotalKeys     int    `json:"total_keys"`
}

// ConfigFromEnv creates config from environment variables
func ConfigFromEnv() Config {
	url := os.Getenv("REDIS_URL")
	if url == "" {
		host := getEnv("REDIS_HOST", "localhost")
		port := getEnv("REDIS_PORT", "6379")
		url = fmt.Sprintf("redis://%s:%s", host, port)
	}

	return Config{
		URL: url,
	}
}

func getEnv(key, defaultVal string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return defaultVal
}

// parseRedisURL parses redis://host:port format
func parseRedisURL(url string) string {
	url = strings.TrimPrefix(url, "redis://")
	url = strings.TrimPrefix(url, "rediss://")
	// Remove any path or query params
	if idx := strings.Index(url, "/"); idx != -1 {
		url = url[:idx]
	}
	return url
}

// New creates a new Redis client
func New(cfg Config) (*Client, error) {
	addr := parseRedisURL(cfg.URL)

	client := &Client{
		addr: addr,
	}

	// Test connection
	if err := client.connect(); err != nil {
		return nil, fmt.Errorf("failed to connect to Redis: %w", err)
	}

	// Verify with PING
	if err := client.Ping(); err != nil {
		client.Close()
		return nil, fmt.Errorf("failed to ping Redis: %w", err)
	}

	return client, nil
}

func (c *Client) connect() error {
	conn, err := net.DialTimeout("tcp", c.addr, 5*time.Second)
	if err != nil {
		return err
	}
	c.conn = conn
	c.reader = bufio.NewReader(conn)
	return nil
}

// Close closes the Redis connection
func (c *Client) Close() error {
	c.mu.Lock()
	defer c.mu.Unlock()
	if c.conn != nil {
		return c.conn.Close()
	}
	return nil
}

// GetAddr returns the Redis server address
func (c *Client) GetAddr() string {
	return c.addr
}

// Ping checks if Redis is reachable
func (c *Client) Ping() error {
	result := c.Execute(context.Background(), "PING")
	if !result.Success {
		return errors.New(result.Error)
	}
	return nil
}

// Execute executes a Redis command
func (c *Client) Execute(ctx context.Context, command string) *CommandResult {
	start := time.Now()
	result := &CommandResult{
		Command: command,
		Success: true,
	}

	c.mu.Lock()
	defer c.mu.Unlock()

	// Reconnect if needed
	if c.conn == nil {
		if err := c.connect(); err != nil {
			result.Error = fmt.Sprintf("connection error: %v", err)
			result.Success = false
			result.Duration = time.Since(start).Milliseconds()
			return result
		}
	}

	// Set deadline
	deadline, ok := ctx.Deadline()
	if !ok {
		deadline = time.Now().Add(30 * time.Second)
	}
	c.conn.SetDeadline(deadline)

	// Parse and send command
	parts := parseCommand(command)
	if len(parts) == 0 {
		result.Error = "empty command"
		result.Success = false
		result.Duration = time.Since(start).Milliseconds()
		return result
	}

	// Send RESP protocol
	if err := c.sendCommand(parts); err != nil {
		c.conn = nil // Force reconnect
		result.Error = fmt.Sprintf("send error: %v", err)
		result.Success = false
		result.Duration = time.Since(start).Milliseconds()
		return result
	}

	// Read response
	resp, respType, err := c.readResponse()
	if err != nil {
		c.conn = nil // Force reconnect
		result.Error = fmt.Sprintf("read error: %v", err)
		result.Success = false
		result.Duration = time.Since(start).Milliseconds()
		return result
	}

	result.Result = resp
	result.Type = respType
	result.Duration = time.Since(start).Milliseconds()

	// Check for error response
	if respType == "error" {
		result.Error = fmt.Sprintf("%v", resp)
		result.Success = false
	}

	return result
}

// sendCommand sends a command in RESP protocol
func (c *Client) sendCommand(parts []string) error {
	// RESP array format: *<count>\r\n$<len>\r\n<data>\r\n...
	cmd := fmt.Sprintf("*%d\r\n", len(parts))
	for _, part := range parts {
		cmd += fmt.Sprintf("$%d\r\n%s\r\n", len(part), part)
	}
	_, err := c.conn.Write([]byte(cmd))
	return err
}

// readResponse reads a RESP response
func (c *Client) readResponse() (interface{}, string, error) {
	line, err := c.reader.ReadString('\n')
	if err != nil {
		return nil, "", err
	}
	line = strings.TrimSuffix(line, "\r\n")

	if len(line) == 0 {
		return nil, "", errors.New("empty response")
	}

	switch line[0] {
	case '+': // Simple string
		return line[1:], "string", nil

	case '-': // Error
		return line[1:], "error", nil

	case ':': // Integer
		n, _ := strconv.ParseInt(line[1:], 10, 64)
		return n, "integer", nil

	case '$': // Bulk string
		length, _ := strconv.Atoi(line[1:])
		if length == -1 {
			return nil, "nil", nil
		}
		data := make([]byte, length+2) // +2 for \r\n
		_, err := c.reader.Read(data)
		if err != nil {
			return nil, "", err
		}
		return string(data[:length]), "bulk", nil

	case '*': // Array
		count, _ := strconv.Atoi(line[1:])
		if count == -1 {
			return nil, "nil", nil
		}
		arr := make([]interface{}, count)
		for i := 0; i < count; i++ {
			item, _, err := c.readResponse()
			if err != nil {
				return nil, "", err
			}
			arr[i] = item
		}
		return arr, "array", nil

	default:
		return line, "unknown", nil
	}
}

// parseCommand parses a command string into parts
func parseCommand(cmd string) []string {
	cmd = strings.TrimSpace(cmd)
	if cmd == "" {
		return nil
	}

	var parts []string
	var current strings.Builder
	inQuote := false
	quoteChar := byte(0)

	for i := 0; i < len(cmd); i++ {
		ch := cmd[i]

		if inQuote {
			if ch == quoteChar {
				inQuote = false
			} else {
				current.WriteByte(ch)
			}
		} else {
			if ch == '"' || ch == '\'' {
				inQuote = true
				quoteChar = ch
			} else if ch == ' ' || ch == '\t' {
				if current.Len() > 0 {
					parts = append(parts, current.String())
					current.Reset()
				}
			} else {
				current.WriteByte(ch)
			}
		}
	}

	if current.Len() > 0 {
		parts = append(parts, current.String())
	}

	return parts
}

// GetServerInfo returns server information
func (c *Client) GetServerInfo(ctx context.Context) (*ServerInfo, error) {
	result := c.Execute(ctx, "INFO server")
	if !result.Success {
		return nil, errors.New(result.Error)
	}

	info := &ServerInfo{}
	if str, ok := result.Result.(string); ok {
		lines := strings.Split(str, "\n")
		for _, line := range lines {
			line = strings.TrimSpace(line)
			if strings.HasPrefix(line, "redis_version:") {
				info.Version = strings.TrimPrefix(line, "redis_version:")
			} else if strings.HasPrefix(line, "redis_mode:") {
				info.Mode = strings.TrimPrefix(line, "redis_mode:")
			}
		}
	}

	// Get memory info
	memResult := c.Execute(ctx, "INFO memory")
	if memResult.Success {
		if str, ok := memResult.Result.(string); ok {
			lines := strings.Split(str, "\n")
			for _, line := range lines {
				line = strings.TrimSpace(line)
				if strings.HasPrefix(line, "used_memory_human:") {
					info.UsedMemory = strings.TrimPrefix(line, "used_memory_human:")
				}
			}
		}
	}

	// Get client info
	clientResult := c.Execute(ctx, "INFO clients")
	if clientResult.Success {
		if str, ok := clientResult.Result.(string); ok {
			lines := strings.Split(str, "\n")
			for _, line := range lines {
				line = strings.TrimSpace(line)
				if strings.HasPrefix(line, "connected_clients:") {
					val := strings.TrimPrefix(line, "connected_clients:")
					info.ConnectedClients, _ = strconv.Atoi(val)
				}
			}
		}
	}

	// Get keyspace info
	dbResult := c.Execute(ctx, "DBSIZE")
	if dbResult.Success {
		if n, ok := dbResult.Result.(int64); ok {
			info.TotalKeys = int(n)
		}
	}

	return info, nil
}

// GetKeys returns keys matching a pattern
func (c *Client) GetKeys(ctx context.Context, pattern string) ([]string, error) {
	if pattern == "" {
		pattern = "*"
	}
	result := c.Execute(ctx, fmt.Sprintf("KEYS %s", pattern))
	if !result.Success {
		return nil, errors.New(result.Error)
	}

	var keys []string
	if arr, ok := result.Result.([]interface{}); ok {
		for _, item := range arr {
			if str, ok := item.(string); ok {
				keys = append(keys, str)
			}
		}
	}

	return keys, nil
}

// FlushDB clears the current database
func (c *Client) FlushDB(ctx context.Context) error {
	result := c.Execute(ctx, "FLUSHDB")
	if !result.Success {
		return errors.New(result.Error)
	}
	return nil
}

// LoadSampleData loads sample data for learning
func (c *Client) LoadSampleData(ctx context.Context) error {
	commands := []string{
		// Strings
		`SET greeting "Hello, Redis!"`,
		`SET counter 100`,
		`SET user:1:name "John Doe"`,
		`SET user:1:email "john@example.com"`,
		`SET user:2:name "Jane Smith"`,
		`SET user:2:email "jane@example.com"`,
		`SETEX session:abc123 3600 "user:1"`,

		// Lists
		`RPUSH tasks "Learn Redis basics"`,
		`RPUSH tasks "Practice data structures"`,
		`RPUSH tasks "Build a cache layer"`,
		`RPUSH tasks "Implement pub/sub"`,
		`LPUSH recent:pages "/home" "/about" "/contact"`,

		// Sets
		`SADD tags:redis "database" "cache" "nosql" "fast"`,
		`SADD tags:postgres "database" "sql" "relational"`,
		`SADD online:users "user:1" "user:2" "user:3"`,

		// Sorted Sets
		`ZADD leaderboard 1500 "player:1"`,
		`ZADD leaderboard 2300 "player:2"`,
		`ZADD leaderboard 1800 "player:3"`,
		`ZADD leaderboard 3100 "player:4"`,
		`ZADD leaderboard 950 "player:5"`,

		// Hashes
		`HSET product:1 name "Laptop" price 999 stock 50`,
		`HSET product:2 name "Mouse" price 29 stock 200`,
		`HSET product:3 name "Keyboard" price 79 stock 150`,
		`HSET config:app debug "true" max_connections "100" timeout "30"`,

		// More complex examples
		`SET rate:limit:user:1 10`,
		`EXPIRE rate:limit:user:1 60`,
		`PFADD visitors:today "192.168.1.1" "192.168.1.2" "192.168.1.3"`,
	}

	for _, cmd := range commands {
		result := c.Execute(ctx, cmd)
		if !result.Success {
			return fmt.Errorf("failed to execute %s: %s", cmd, result.Error)
		}
	}

	return nil
}
