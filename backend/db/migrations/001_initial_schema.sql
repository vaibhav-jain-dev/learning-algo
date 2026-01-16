-- Order Management System Schema
-- This schema represents a healthcare order management system
-- with requests, orders, patients, slots, and addresses

-- ============================================================================
-- ENUMS - Status and State Types
-- ============================================================================

-- Request status enum - represents the lifecycle of a request
CREATE TYPE request_status AS ENUM (
    'draft',           -- Initial state, not yet submitted
    'submitted',       -- Submitted for processing
    'processing',      -- Being processed by the system
    'scheduled',       -- All slots are scheduled
    'in_progress',     -- Collection is in progress
    'completed',       -- All orders completed
    'cancelled',       -- Request was cancelled
    'failed'           -- Request failed (e.g., payment failed)
);

-- Order status enum - simpler lifecycle (only created, cancelled, completed)
CREATE TYPE order_status AS ENUM (
    'created',         -- Order has been created
    'cancelled',       -- Order was cancelled
    'completed'        -- Order has been completed (samples collected)
);

-- Slot status enum - represents collection slot lifecycle
CREATE TYPE slot_status AS ENUM (
    'scheduled',       -- Slot is scheduled
    'confirmed',       -- Patient confirmed the slot
    'in_transit',      -- Phlebotomist is on the way
    'arrived',         -- Phlebotomist has arrived
    'collection_started', -- Collection has started
    'completed',       -- Collection completed successfully
    'rescheduled',     -- Slot was rescheduled
    'cancelled',       -- Slot was cancelled
    'no_show'          -- Patient was not available
);

-- Test type enum
CREATE TYPE test_type AS ENUM (
    'blood_test',      -- Individual blood test
    'package'          -- Package of tests
);

-- ============================================================================
-- REFERENCE TABLES - External Service References
-- ============================================================================

-- Users reference table (data comes from User Service microservice)
-- We only store the reference ID and cached data for performance
CREATE TABLE user_references (
    id SERIAL PRIMARY KEY,
    external_user_id VARCHAR(100) UNIQUE NOT NULL,  -- ID from User Service
    cached_name VARCHAR(255),                        -- Cached for display
    cached_email VARCHAR(255),                       -- Cached for notifications
    cached_phone VARCHAR(20),                        -- Cached for contact
    last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Logistics slot references (data comes from Logistics Service)
CREATE TABLE logistics_slot_references (
    id SERIAL PRIMARY KEY,
    external_slot_id VARCHAR(100) UNIQUE NOT NULL,  -- ID from Logistics Service
    slot_date DATE NOT NULL,
    slot_time_start TIME NOT NULL,
    slot_time_end TIME NOT NULL,
    zone_id VARCHAR(50),
    phlebotomist_id VARCHAR(100),                   -- External phlebotomist reference
    cached_phlebotomist_name VARCHAR(255),
    last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- MASTER DATA TABLES
-- ============================================================================

-- Blood tests catalog
CREATE TABLE blood_tests (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sample_type VARCHAR(100) NOT NULL,              -- e.g., 'serum', 'whole_blood', 'plasma'
    tube_type VARCHAR(100),                         -- e.g., 'EDTA', 'SST', 'Citrate'
    fasting_required BOOLEAN DEFAULT FALSE,
    price DECIMAL(10, 2) NOT NULL,
    turnaround_days INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test packages (bundles of blood tests)
CREATE TABLE test_packages (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,                  -- Package price (usually discounted)
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Many-to-many: packages contain multiple tests
CREATE TABLE package_tests (
    id SERIAL PRIMARY KEY,
    package_id INTEGER NOT NULL REFERENCES test_packages(id) ON DELETE CASCADE,
    blood_test_id INTEGER NOT NULL REFERENCES blood_tests(id) ON DELETE CASCADE,
    UNIQUE(package_id, blood_test_id)
);

-- ============================================================================
-- CORE DOMAIN TABLES
-- ============================================================================

-- Addresses table (one-to-one with request)
CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    landmark VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    address_type VARCHAR(50) DEFAULT 'home',        -- home, office, other
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Requests table - main entity containing multiple orders
CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    request_number VARCHAR(50) UNIQUE NOT NULL,     -- Human readable request ID (e.g., REQ-2024-00001)
    user_ref_id INTEGER NOT NULL REFERENCES user_references(id),
    address_id INTEGER REFERENCES addresses(id),     -- One-to-one with address
    status request_status DEFAULT 'draft',
    total_amount DECIMAL(10, 2) DEFAULT 0,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    final_amount DECIMAL(10, 2) DEFAULT 0,
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_reference VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    submitted_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Patients table (one-to-one with order, multiple per request)
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    date_of_birth DATE,
    gender VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(255),
    relationship_to_user VARCHAR(50),               -- self, spouse, child, parent, other
    medical_conditions TEXT,
    allergies TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table - each order is for one patient
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,       -- Human readable order ID (e.g., ORD-2024-00001)
    request_id INTEGER NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
    patient_id INTEGER NOT NULL REFERENCES patients(id),  -- One-to-one with patient
    status order_status DEFAULT 'created',
    subtotal DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Order items - blood tests and packages in an order
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    item_type test_type NOT NULL,
    blood_test_id INTEGER REFERENCES blood_tests(id),
    package_id INTEGER REFERENCES test_packages(id),
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT item_reference_check CHECK (
        (item_type = 'blood_test' AND blood_test_id IS NOT NULL AND package_id IS NULL) OR
        (item_type = 'package' AND package_id IS NOT NULL AND blood_test_id IS NULL)
    )
);

-- Collection slots - based on unique combination of tests/packages
-- A request can have multiple slots (one-to-many with request)
CREATE TABLE collection_slots (
    id SERIAL PRIMARY KEY,
    slot_number VARCHAR(50) UNIQUE NOT NULL,        -- Human readable slot ID
    request_id INTEGER NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
    logistics_slot_ref_id INTEGER REFERENCES logistics_slot_references(id),
    status slot_status DEFAULT 'scheduled',
    scheduled_date DATE NOT NULL,
    scheduled_time_start TIME NOT NULL,
    scheduled_time_end TIME NOT NULL,
    actual_arrival_time TIMESTAMP WITH TIME ZONE,
    collection_start_time TIMESTAMP WITH TIME ZONE,
    collection_end_time TIMESTAMP WITH TIME ZONE,
    fasting_required BOOLEAN DEFAULT FALSE,
    special_instructions TEXT,
    cancellation_reason TEXT,
    rescheduled_from_id INTEGER REFERENCES collection_slots(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Many-to-many: which orders are covered by which slot
CREATE TABLE slot_orders (
    id SERIAL PRIMARY KEY,
    slot_id INTEGER NOT NULL REFERENCES collection_slots(id) ON DELETE CASCADE,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    UNIQUE(slot_id, order_id)
);

-- ============================================================================
-- AUDIT AND HISTORY TABLES
-- ============================================================================

-- Request status history
CREATE TABLE request_status_history (
    id SERIAL PRIMARY KEY,
    request_id INTEGER NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
    old_status request_status,
    new_status request_status NOT NULL,
    changed_by VARCHAR(100),
    change_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Slot status history
CREATE TABLE slot_status_history (
    id SERIAL PRIMARY KEY,
    slot_id INTEGER NOT NULL REFERENCES collection_slots(id) ON DELETE CASCADE,
    old_status slot_status,
    new_status slot_status NOT NULL,
    changed_by VARCHAR(100),
    change_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES for Query Performance
-- ============================================================================

-- User references indexes
CREATE INDEX idx_user_references_external_id ON user_references(external_user_id);

-- Logistics slot indexes
CREATE INDEX idx_logistics_slot_date ON logistics_slot_references(slot_date);
CREATE INDEX idx_logistics_slot_external ON logistics_slot_references(external_slot_id);

-- Requests indexes
CREATE INDEX idx_requests_user ON requests(user_ref_id);
CREATE INDEX idx_requests_status ON requests(status);
CREATE INDEX idx_requests_created ON requests(created_at);
CREATE INDEX idx_requests_number ON requests(request_number);

-- Orders indexes
CREATE INDEX idx_orders_request ON orders(request_id);
CREATE INDEX idx_orders_patient ON orders(patient_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_number ON orders(order_number);

-- Order items indexes
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_blood_test ON order_items(blood_test_id);
CREATE INDEX idx_order_items_package ON order_items(package_id);

-- Collection slots indexes
CREATE INDEX idx_slots_request ON collection_slots(request_id);
CREATE INDEX idx_slots_status ON collection_slots(status);
CREATE INDEX idx_slots_date ON collection_slots(scheduled_date);
CREATE INDEX idx_slots_logistics ON collection_slots(logistics_slot_ref_id);

-- Composite indexes for common queries
CREATE INDEX idx_requests_user_status ON requests(user_ref_id, status);
CREATE INDEX idx_orders_request_status ON orders(request_id, status);
CREATE INDEX idx_slots_request_date ON collection_slots(request_id, scheduled_date);

-- ============================================================================
-- VIEWS for Common Queries
-- ============================================================================

-- View: Request summary with order count and slot count
CREATE VIEW v_request_summary AS
SELECT
    r.id,
    r.request_number,
    r.status,
    r.total_amount,
    r.final_amount,
    r.created_at,
    ur.cached_name as user_name,
    ur.cached_email as user_email,
    a.city,
    a.postal_code,
    COUNT(DISTINCT o.id) as order_count,
    COUNT(DISTINCT cs.id) as slot_count,
    COUNT(DISTINCT p.id) as patient_count
FROM requests r
LEFT JOIN user_references ur ON r.user_ref_id = ur.id
LEFT JOIN addresses a ON r.address_id = a.id
LEFT JOIN orders o ON o.request_id = r.id
LEFT JOIN collection_slots cs ON cs.request_id = r.id
LEFT JOIN patients p ON o.patient_id = p.id
GROUP BY r.id, r.request_number, r.status, r.total_amount, r.final_amount,
         r.created_at, ur.cached_name, ur.cached_email, a.city, a.postal_code;

-- View: Order details with patient and test info
CREATE VIEW v_order_details AS
SELECT
    o.id as order_id,
    o.order_number,
    o.status as order_status,
    o.subtotal,
    r.id as request_id,
    r.request_number,
    r.status as request_status,
    p.first_name || ' ' || COALESCE(p.last_name, '') as patient_name,
    p.date_of_birth,
    p.gender,
    COUNT(oi.id) as item_count,
    SUM(CASE WHEN oi.item_type = 'blood_test' THEN 1 ELSE 0 END) as test_count,
    SUM(CASE WHEN oi.item_type = 'package' THEN 1 ELSE 0 END) as package_count
FROM orders o
JOIN requests r ON o.request_id = r.id
JOIN patients p ON o.patient_id = p.id
LEFT JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id, o.order_number, o.status, o.subtotal, r.id, r.request_number,
         r.status, p.first_name, p.last_name, p.date_of_birth, p.gender;

-- View: Slot schedule with phlebotomist info
CREATE VIEW v_slot_schedule AS
SELECT
    cs.id as slot_id,
    cs.slot_number,
    cs.status,
    cs.scheduled_date,
    cs.scheduled_time_start,
    cs.scheduled_time_end,
    cs.fasting_required,
    r.request_number,
    a.city,
    a.address_line1,
    a.postal_code,
    lsr.cached_phlebotomist_name,
    COUNT(DISTINCT so.order_id) as orders_in_slot
FROM collection_slots cs
JOIN requests r ON cs.request_id = r.id
LEFT JOIN addresses a ON r.address_id = a.id
LEFT JOIN logistics_slot_references lsr ON cs.logistics_slot_ref_id = lsr.id
LEFT JOIN slot_orders so ON so.slot_id = cs.id
GROUP BY cs.id, cs.slot_number, cs.status, cs.scheduled_date,
         cs.scheduled_time_start, cs.scheduled_time_end, cs.fasting_required,
         r.request_number, a.city, a.address_line1, a.postal_code,
         lsr.cached_phlebotomist_name;

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to generate request number
CREATE OR REPLACE FUNCTION generate_request_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.request_number := 'REQ-' || TO_CHAR(NOW(), 'YYYY') || '-' ||
                          LPAD(NEW.id::TEXT, 5, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYY') || '-' ||
                        LPAD(NEW.id::TEXT, 5, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate slot number
CREATE OR REPLACE FUNCTION generate_slot_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.slot_number := 'SLT-' || TO_CHAR(NOW(), 'YYYY') || '-' ||
                       LPAD(NEW.id::TEXT, 5, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to track request status changes
CREATE OR REPLACE FUNCTION track_request_status()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO request_status_history (request_id, old_status, new_status)
        VALUES (NEW.id, OLD.status, NEW.status);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to track slot status changes
CREATE OR REPLACE FUNCTION track_slot_status()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO slot_status_history (slot_id, old_status, new_status)
        VALUES (NEW.id, OLD.status, NEW.status);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-generate numbers (using BEFORE INSERT to set before validation)
CREATE TRIGGER trg_request_number
    BEFORE INSERT ON requests
    FOR EACH ROW
    WHEN (NEW.request_number IS NULL OR NEW.request_number = '')
    EXECUTE FUNCTION generate_request_number();

CREATE TRIGGER trg_order_number
    BEFORE INSERT ON orders
    FOR EACH ROW
    WHEN (NEW.order_number IS NULL OR NEW.order_number = '')
    EXECUTE FUNCTION generate_order_number();

CREATE TRIGGER trg_slot_number
    BEFORE INSERT ON collection_slots
    FOR EACH ROW
    WHEN (NEW.slot_number IS NULL OR NEW.slot_number = '')
    EXECUTE FUNCTION generate_slot_number();

-- Auto-update timestamps
CREATE TRIGGER trg_user_references_updated
    BEFORE UPDATE ON user_references
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_addresses_updated
    BEFORE UPDATE ON addresses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_requests_updated
    BEFORE UPDATE ON requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_patients_updated
    BEFORE UPDATE ON patients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_orders_updated
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_slots_updated
    BEFORE UPDATE ON collection_slots
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Status change tracking
CREATE TRIGGER trg_request_status_track
    AFTER UPDATE ON requests
    FOR EACH ROW
    EXECUTE FUNCTION track_request_status();

CREATE TRIGGER trg_slot_status_track
    AFTER UPDATE ON collection_slots
    FOR EACH ROW
    EXECUTE FUNCTION track_slot_status();

-- ============================================================================
-- COMMENTS for Documentation
-- ============================================================================

COMMENT ON TABLE requests IS 'Main request table - contains multiple orders for blood tests';
COMMENT ON TABLE orders IS 'Individual orders within a request - one order per patient';
COMMENT ON TABLE patients IS 'Patient information - linked one-to-one with orders';
COMMENT ON TABLE collection_slots IS 'Time slots for sample collection - one request can have multiple slots';
COMMENT ON TABLE addresses IS 'Collection address - one-to-one with request';
COMMENT ON TABLE user_references IS 'Reference to users from external User Service';
COMMENT ON TABLE logistics_slot_references IS 'Reference to slots from external Logistics Service';
COMMENT ON TABLE blood_tests IS 'Master catalog of available blood tests';
COMMENT ON TABLE test_packages IS 'Bundled packages of blood tests';

COMMENT ON COLUMN requests.status IS 'Request lifecycle: draft → submitted → processing → scheduled → in_progress → completed';
COMMENT ON COLUMN orders.status IS 'Order lifecycle: created → completed or cancelled';
COMMENT ON COLUMN collection_slots.status IS 'Slot lifecycle with rescheduling and cancellation support';
