-- ============================================================================
-- RESET FUNCTIONS for SQL Learning Dashboard
-- These functions allow resetting the database to initial state
-- ============================================================================

-- Function to reset all data to initial seed state
CREATE OR REPLACE FUNCTION reset_to_initial_state()
RETURNS TEXT AS $$
DECLARE
    result TEXT;
BEGIN
    -- Disable triggers temporarily for faster deletion
    SET session_replication_role = 'replica';

    -- Delete all transactional data in correct order (respecting foreign keys)
    DELETE FROM slot_status_history;
    DELETE FROM request_status_history;
    DELETE FROM slot_orders;
    DELETE FROM collection_slots;
    DELETE FROM order_items;
    DELETE FROM orders;
    DELETE FROM requests;
    DELETE FROM patients;
    DELETE FROM addresses;
    DELETE FROM logistics_slot_references;
    DELETE FROM user_references;
    DELETE FROM package_tests;
    DELETE FROM test_packages;
    DELETE FROM blood_tests;

    -- Reset all sequences
    ALTER SEQUENCE blood_tests_id_seq RESTART WITH 1;
    ALTER SEQUENCE test_packages_id_seq RESTART WITH 1;
    ALTER SEQUENCE package_tests_id_seq RESTART WITH 1;
    ALTER SEQUENCE user_references_id_seq RESTART WITH 1;
    ALTER SEQUENCE logistics_slot_references_id_seq RESTART WITH 1;
    ALTER SEQUENCE addresses_id_seq RESTART WITH 1;
    ALTER SEQUENCE patients_id_seq RESTART WITH 1;
    ALTER SEQUENCE requests_id_seq RESTART WITH 1;
    ALTER SEQUENCE orders_id_seq RESTART WITH 1;
    ALTER SEQUENCE order_items_id_seq RESTART WITH 1;
    ALTER SEQUENCE collection_slots_id_seq RESTART WITH 1;
    ALTER SEQUENCE slot_orders_id_seq RESTART WITH 1;
    ALTER SEQUENCE request_status_history_id_seq RESTART WITH 1;
    ALTER SEQUENCE slot_status_history_id_seq RESTART WITH 1;

    -- Re-enable triggers
    SET session_replication_role = 'origin';

    result := 'Database cleared successfully. Run seed data script to restore initial data.';
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to get database statistics
CREATE OR REPLACE FUNCTION get_database_stats()
RETURNS TABLE (
    table_name TEXT,
    row_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 'blood_tests'::TEXT, COUNT(*)::BIGINT FROM blood_tests
    UNION ALL
    SELECT 'test_packages', COUNT(*) FROM test_packages
    UNION ALL
    SELECT 'package_tests', COUNT(*) FROM package_tests
    UNION ALL
    SELECT 'user_references', COUNT(*) FROM user_references
    UNION ALL
    SELECT 'logistics_slot_references', COUNT(*) FROM logistics_slot_references
    UNION ALL
    SELECT 'addresses', COUNT(*) FROM addresses
    UNION ALL
    SELECT 'patients', COUNT(*) FROM patients
    UNION ALL
    SELECT 'requests', COUNT(*) FROM requests
    UNION ALL
    SELECT 'orders', COUNT(*) FROM orders
    UNION ALL
    SELECT 'order_items', COUNT(*) FROM order_items
    UNION ALL
    SELECT 'collection_slots', COUNT(*) FROM collection_slots
    UNION ALL
    SELECT 'slot_orders', COUNT(*) FROM slot_orders
    UNION ALL
    SELECT 'request_status_history', COUNT(*) FROM request_status_history
    UNION ALL
    SELECT 'slot_status_history', COUNT(*) FROM slot_status_history
    ORDER BY 1;
END;
$$ LANGUAGE plpgsql;

-- Function to preview a query without executing it (explains the query plan)
CREATE OR REPLACE FUNCTION preview_query(query_text TEXT)
RETURNS TABLE (
    query_plan TEXT
) AS $$
BEGIN
    RETURN QUERY EXECUTE 'EXPLAIN (FORMAT TEXT) ' || query_text;
END;
$$ LANGUAGE plpgsql;

-- Function to preview query with more details
CREATE OR REPLACE FUNCTION preview_query_detailed(query_text TEXT)
RETURNS TABLE (
    query_plan JSONB
) AS $$
BEGIN
    RETURN QUERY EXECUTE 'EXPLAIN (ANALYZE false, COSTS true, FORMAT JSON) ' || query_text;
END;
$$ LANGUAGE plpgsql;

-- Create a savepoint table for user sessions
CREATE TABLE IF NOT EXISTS user_savepoints (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    savepoint_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_snapshot JSONB,
    UNIQUE(session_id, savepoint_name)
);

-- Function to create a lightweight savepoint (stores counts only for demo)
CREATE OR REPLACE FUNCTION create_savepoint(p_session_id VARCHAR, p_name VARCHAR)
RETURNS TEXT AS $$
DECLARE
    stats_json JSONB;
BEGIN
    SELECT jsonb_object_agg(table_name, row_count)
    INTO stats_json
    FROM get_database_stats();

    INSERT INTO user_savepoints (session_id, savepoint_name, data_snapshot)
    VALUES (p_session_id, p_name, stats_json)
    ON CONFLICT (session_id, savepoint_name)
    DO UPDATE SET data_snapshot = stats_json, created_at = NOW();

    RETURN 'Savepoint "' || p_name || '" created for session ' || p_session_id;
END;
$$ LANGUAGE plpgsql;

-- Table to store query execution history for learning
CREATE TABLE IF NOT EXISTS query_history (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100),
    query_text TEXT NOT NULL,
    query_type VARCHAR(50), -- SELECT, INSERT, UPDATE, DELETE, etc.
    execution_time_ms NUMERIC,
    rows_affected INTEGER,
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for query history lookup
CREATE INDEX IF NOT EXISTS idx_query_history_session ON query_history(session_id);
CREATE INDEX IF NOT EXISTS idx_query_history_time ON query_history(executed_at);

-- Function to log query execution
CREATE OR REPLACE FUNCTION log_query(
    p_session_id VARCHAR,
    p_query TEXT,
    p_type VARCHAR,
    p_time_ms NUMERIC,
    p_rows INTEGER,
    p_success BOOLEAN,
    p_error TEXT DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    new_id INTEGER;
BEGIN
    INSERT INTO query_history (session_id, query_text, query_type, execution_time_ms, rows_affected, success, error_message)
    VALUES (p_session_id, p_query, p_type, p_time_ms, p_rows, p_success, p_error)
    RETURNING id INTO new_id;

    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get recent queries for a session
CREATE OR REPLACE FUNCTION get_recent_queries(p_session_id VARCHAR, p_limit INTEGER DEFAULT 20)
RETURNS TABLE (
    id INTEGER,
    query_text TEXT,
    query_type VARCHAR,
    execution_time_ms NUMERIC,
    rows_affected INTEGER,
    success BOOLEAN,
    executed_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT qh.id, qh.query_text, qh.query_type, qh.execution_time_ms, qh.rows_affected, qh.success, qh.executed_at
    FROM query_history qh
    WHERE qh.session_id = p_session_id
    ORDER BY qh.executed_at DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Comments
COMMENT ON FUNCTION reset_to_initial_state() IS 'Resets all data tables to empty state. Run seed data after this.';
COMMENT ON FUNCTION get_database_stats() IS 'Returns row counts for all tables';
COMMENT ON FUNCTION preview_query(TEXT) IS 'Shows query execution plan without running the query';
COMMENT ON FUNCTION log_query(VARCHAR, TEXT, VARCHAR, NUMERIC, INTEGER, BOOLEAN, TEXT) IS 'Logs query execution for learning history';
