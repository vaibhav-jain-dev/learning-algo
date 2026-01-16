package db

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"os"
	"regexp"
	"strings"
	"sync"
	"time"

	_ "github.com/lib/pq"
)

// DB wraps the database connection with additional functionality
type DB struct {
	conn       *sql.DB
	mu         sync.RWMutex
	migrations string
}

// Config holds database configuration
type Config struct {
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
	SSLMode  string
}

// QueryResult represents the result of a SQL query
type QueryResult struct {
	Columns      []string        `json:"columns"`
	Rows         [][]interface{} `json:"rows"`
	RowsAffected int64           `json:"rows_affected"`
	QueryType    string          `json:"query_type"`
	Duration     int64           `json:"duration_ms"`
	Error        string          `json:"error,omitempty"`
	Success      bool            `json:"success"`
}

// TableStats represents table statistics
type TableStats struct {
	TableName string `json:"table_name"`
	RowCount  int64  `json:"row_count"`
}

// SchemaInfo represents table schema information
type SchemaInfo struct {
	TableName   string       `json:"table_name"`
	Columns     []ColumnInfo `json:"columns"`
	Indexes     []IndexInfo  `json:"indexes"`
	ForeignKeys []FKInfo     `json:"foreign_keys"`
}

// ColumnInfo represents column information
type ColumnInfo struct {
	Name       string `json:"name"`
	DataType   string `json:"data_type"`
	IsNullable bool   `json:"is_nullable"`
	Default    string `json:"default,omitempty"`
	IsPrimary  bool   `json:"is_primary"`
}

// IndexInfo represents index information
type IndexInfo struct {
	Name       string   `json:"name"`
	Columns    []string `json:"columns"`
	IsUnique   bool     `json:"is_unique"`
	IsPrimary  bool     `json:"is_primary"`
	Definition string   `json:"definition"`
}

// FKInfo represents foreign key information
type FKInfo struct {
	Name            string `json:"name"`
	Column          string `json:"column"`
	ReferencesTable string `json:"references_table"`
	ReferencesCol   string `json:"references_column"`
}

// QueryPlan represents a query execution plan
type QueryPlan struct {
	Plan     interface{} `json:"plan"`
	Planning float64     `json:"planning_time_ms,omitempty"`
	Error    string      `json:"error,omitempty"`
}

// ConfigFromEnv creates config from environment variables
func ConfigFromEnv() Config {
	return Config{
		Host:     getEnv("DB_HOST", "localhost"),
		Port:     getEnv("DB_PORT", "5432"),
		User:     getEnv("DB_USER", "dsalgo"),
		Password: getEnv("DB_PASSWORD", "dsalgo_secret"),
		DBName:   getEnv("DB_NAME", "order_management"),
		SSLMode:  getEnv("DB_SSLMODE", "disable"),
	}
}

func getEnv(key, defaultVal string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return defaultVal
}

// New creates a new database connection
func New(cfg Config, migrationsPath string) (*DB, error) {
	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.DBName, cfg.SSLMode,
	)

	conn, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	// Configure connection pool
	conn.SetMaxOpenConns(25)
	conn.SetMaxIdleConns(5)
	conn.SetConnMaxLifetime(5 * time.Minute)

	// Test connection
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := conn.PingContext(ctx); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return &DB{
		conn:       conn,
		migrations: migrationsPath,
	}, nil
}

// Close closes the database connection
func (db *DB) Close() error {
	return db.conn.Close()
}

// Ping checks if the database is reachable
func (db *DB) Ping() error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	return db.conn.PingContext(ctx)
}

// ExecuteQuery executes a SQL query and returns results
func (db *DB) ExecuteQuery(ctx context.Context, query string) *QueryResult {
	start := time.Now()
	result := &QueryResult{
		Success: true,
	}

	// Determine query type
	result.QueryType = detectQueryType(query)

	// Add timeout
	ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	db.mu.Lock()
	defer db.mu.Unlock()

	switch result.QueryType {
	case "SELECT", "WITH", "EXPLAIN":
		rows, err := db.conn.QueryContext(ctx, query)
		if err != nil {
			result.Error = err.Error()
			result.Success = false
			result.Duration = time.Since(start).Milliseconds()
			return result
		}
		defer rows.Close()

		// Get column names
		cols, err := rows.Columns()
		if err != nil {
			result.Error = err.Error()
			result.Success = false
			result.Duration = time.Since(start).Milliseconds()
			return result
		}
		result.Columns = cols

		// Scan all rows
		for rows.Next() {
			values := make([]interface{}, len(cols))
			valuePtrs := make([]interface{}, len(cols))
			for i := range values {
				valuePtrs[i] = &values[i]
			}

			if err := rows.Scan(valuePtrs...); err != nil {
				result.Error = err.Error()
				result.Success = false
				break
			}

			// Convert values to JSON-safe types
			row := make([]interface{}, len(cols))
			for i, v := range values {
				row[i] = convertValue(v)
			}
			result.Rows = append(result.Rows, row)
		}

		if err := rows.Err(); err != nil {
			result.Error = err.Error()
			result.Success = false
		}

		// For SELECT queries, RowsAffected is not applicable (leave as 0)

	default:
		// For INSERT, UPDATE, DELETE, etc.
		res, err := db.conn.ExecContext(ctx, query)
		if err != nil {
			result.Error = err.Error()
			result.Success = false
			result.Duration = time.Since(start).Milliseconds()
			return result
		}

		rowsAffected, _ := res.RowsAffected()
		result.RowsAffected = rowsAffected
	}

	result.Duration = time.Since(start).Milliseconds()
	return result
}

// PreviewQuery returns the execution plan without running the query
func (db *DB) PreviewQuery(ctx context.Context, query string) *QueryPlan {
	plan := &QueryPlan{}

	// Wrap query with EXPLAIN ANALYZE (but don't actually execute via ANALYZE false)
	explainQuery := fmt.Sprintf("EXPLAIN (COSTS true, FORMAT JSON) %s", query)

	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	var planJSON string
	err := db.conn.QueryRowContext(ctx, explainQuery).Scan(&planJSON)
	if err != nil {
		plan.Error = err.Error()
		return plan
	}

	// Parse JSON plan
	if err := json.Unmarshal([]byte(planJSON), &plan.Plan); err != nil {
		plan.Error = fmt.Sprintf("failed to parse plan: %v", err)
	}

	return plan
}

// GetTableStats returns row counts for all tables
func (db *DB) GetTableStats(ctx context.Context) ([]TableStats, error) {
	query := `SELECT * FROM get_database_stats()`

	rows, err := db.conn.QueryContext(ctx, query)
	if err != nil {
		// Fallback if function doesn't exist
		return db.getTableStatsManual(ctx)
	}
	defer rows.Close()

	var stats []TableStats
	for rows.Next() {
		var s TableStats
		if err := rows.Scan(&s.TableName, &s.RowCount); err != nil {
			return nil, err
		}
		stats = append(stats, s)
	}

	return stats, rows.Err()
}

func (db *DB) getTableStatsManual(ctx context.Context) ([]TableStats, error) {
	query := `
		SELECT table_name::text
		FROM information_schema.tables
		WHERE table_schema = 'public'
		  AND table_type = 'BASE TABLE'
		  AND table_name NOT IN ('user_savepoints', 'query_history')
		ORDER BY table_name`

	rows, err := db.conn.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var stats []TableStats
	for rows.Next() {
		var tableName string
		if err := rows.Scan(&tableName); err != nil {
			return nil, err
		}

		// Get count for each table
		var count int64
		countQuery := fmt.Sprintf("SELECT COUNT(*) FROM %s", tableName)
		db.conn.QueryRowContext(ctx, countQuery).Scan(&count)

		stats = append(stats, TableStats{
			TableName: tableName,
			RowCount:  count,
		})
	}

	return stats, nil
}

// GetSchema returns schema information for all tables
func (db *DB) GetSchema(ctx context.Context) ([]SchemaInfo, error) {
	// Get all tables
	tablesQuery := `
		SELECT table_name
		FROM information_schema.tables
		WHERE table_schema = 'public'
		  AND table_type = 'BASE TABLE'
		ORDER BY table_name`

	rows, err := db.conn.QueryContext(ctx, tablesQuery)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var schemas []SchemaInfo
	var tableNames []string

	for rows.Next() {
		var name string
		if err := rows.Scan(&name); err != nil {
			return nil, err
		}
		tableNames = append(tableNames, name)
	}

	for _, tableName := range tableNames {
		schema := SchemaInfo{TableName: tableName}

		// Get columns
		schema.Columns, _ = db.getTableColumns(ctx, tableName)

		// Get indexes
		schema.Indexes, _ = db.getTableIndexes(ctx, tableName)

		// Get foreign keys
		schema.ForeignKeys, _ = db.getTableForeignKeys(ctx, tableName)

		schemas = append(schemas, schema)
	}

	return schemas, nil
}

func (db *DB) getTableColumns(ctx context.Context, tableName string) ([]ColumnInfo, error) {
	query := `
		SELECT
			c.column_name,
			c.data_type,
			c.is_nullable = 'YES' as is_nullable,
			COALESCE(c.column_default, '') as column_default,
			COALESCE(tc.constraint_type = 'PRIMARY KEY', false) as is_primary
		FROM information_schema.columns c
		LEFT JOIN information_schema.key_column_usage kcu
			ON c.table_name = kcu.table_name
			AND c.column_name = kcu.column_name
		LEFT JOIN information_schema.table_constraints tc
			ON kcu.constraint_name = tc.constraint_name
			AND tc.constraint_type = 'PRIMARY KEY'
		WHERE c.table_schema = 'public'
		  AND c.table_name = $1
		ORDER BY c.ordinal_position`

	rows, err := db.conn.QueryContext(ctx, query, tableName)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var columns []ColumnInfo
	for rows.Next() {
		var col ColumnInfo
		if err := rows.Scan(&col.Name, &col.DataType, &col.IsNullable, &col.Default, &col.IsPrimary); err != nil {
			return nil, err
		}
		columns = append(columns, col)
	}

	return columns, nil
}

func (db *DB) getTableIndexes(ctx context.Context, tableName string) ([]IndexInfo, error) {
	query := `
		SELECT
			indexname,
			indexdef
		FROM pg_indexes
		WHERE schemaname = 'public'
		  AND tablename = $1`

	rows, err := db.conn.QueryContext(ctx, query, tableName)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var indexes []IndexInfo
	for rows.Next() {
		var idx IndexInfo
		var indexDef string
		if err := rows.Scan(&idx.Name, &indexDef); err != nil {
			return nil, err
		}
		idx.Definition = indexDef
		idx.IsUnique = strings.Contains(strings.ToUpper(indexDef), "UNIQUE")
		idx.IsPrimary = strings.Contains(idx.Name, "_pkey")
		indexes = append(indexes, idx)
	}

	return indexes, nil
}

func (db *DB) getTableForeignKeys(ctx context.Context, tableName string) ([]FKInfo, error) {
	query := `
		SELECT
			tc.constraint_name,
			kcu.column_name,
			ccu.table_name AS foreign_table_name,
			ccu.column_name AS foreign_column_name
		FROM information_schema.table_constraints AS tc
		JOIN information_schema.key_column_usage AS kcu
			ON tc.constraint_name = kcu.constraint_name
		JOIN information_schema.constraint_column_usage AS ccu
			ON ccu.constraint_name = tc.constraint_name
		WHERE tc.constraint_type = 'FOREIGN KEY'
		  AND tc.table_name = $1`

	rows, err := db.conn.QueryContext(ctx, query, tableName)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var fks []FKInfo
	for rows.Next() {
		var fk FKInfo
		if err := rows.Scan(&fk.Name, &fk.Column, &fk.ReferencesTable, &fk.ReferencesCol); err != nil {
			return nil, err
		}
		fks = append(fks, fk)
	}

	return fks, nil
}

// ResetDatabase resets the database to initial state
func (db *DB) ResetDatabase(ctx context.Context) error {
	db.mu.Lock()
	defer db.mu.Unlock()

	// Read and execute migration files
	files := []string{
		"001_initial_schema.sql",
		"002_seed_data.sql",
		"003_reset_functions.sql",
	}

	// First, drop all existing data
	dropQuery := `
		DO $$
		DECLARE
			r RECORD;
		BEGIN
			-- Disable foreign key checks
			SET session_replication_role = 'replica';

			-- Drop all tables
			FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
				EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
			END LOOP;

			-- Drop all types
			FOR r IN (SELECT typname FROM pg_type WHERE typnamespace = 'public'::regnamespace AND typtype = 'e') LOOP
				EXECUTE 'DROP TYPE IF EXISTS ' || quote_ident(r.typname) || ' CASCADE';
			END LOOP;

			-- Re-enable foreign key checks
			SET session_replication_role = 'origin';
		END $$;
	`

	if _, err := db.conn.ExecContext(ctx, dropQuery); err != nil {
		return fmt.Errorf("failed to drop tables: %w", err)
	}

	// Execute migration files
	for _, file := range files {
		content, err := os.ReadFile(fmt.Sprintf("%s/%s", db.migrations, file))
		if err != nil {
			return fmt.Errorf("failed to read migration %s: %w", file, err)
		}

		if _, err := db.conn.ExecContext(ctx, string(content)); err != nil {
			return fmt.Errorf("failed to execute migration %s: %w", file, err)
		}
	}

	return nil
}

// Helper functions

func detectQueryType(query string) string {
	query = strings.TrimSpace(strings.ToUpper(query))

	patterns := map[string]*regexp.Regexp{
		"SELECT":  regexp.MustCompile(`^SELECT\b`),
		"INSERT":  regexp.MustCompile(`^INSERT\b`),
		"UPDATE":  regexp.MustCompile(`^UPDATE\b`),
		"DELETE":  regexp.MustCompile(`^DELETE\b`),
		"CREATE":  regexp.MustCompile(`^CREATE\b`),
		"ALTER":   regexp.MustCompile(`^ALTER\b`),
		"DROP":    regexp.MustCompile(`^DROP\b`),
		"WITH":    regexp.MustCompile(`^WITH\b`),
		"EXPLAIN": regexp.MustCompile(`^EXPLAIN\b`),
		"TRUNCATE": regexp.MustCompile(`^TRUNCATE\b`),
	}

	for queryType, pattern := range patterns {
		if pattern.MatchString(query) {
			return queryType
		}
	}

	return "UNKNOWN"
}

func convertValue(v interface{}) interface{} {
	switch val := v.(type) {
	case []byte:
		return string(val)
	case time.Time:
		return val.Format(time.RFC3339)
	case nil:
		return nil
	default:
		return val
	}
}
