-- ============================================================================
-- SEED DATA for Order Management System
-- Sample data for SQL learning and testing
-- ============================================================================

-- ============================================================================
-- MASTER DATA: Blood Tests Catalog
-- ============================================================================

INSERT INTO blood_tests (code, name, description, sample_type, tube_type, fasting_required, price, turnaround_days) VALUES
-- Basic Tests
('CBC', 'Complete Blood Count', 'Measures red cells, white cells, hemoglobin, hematocrit, and platelets', 'whole_blood', 'EDTA', FALSE, 350.00, 1),
('FBS', 'Fasting Blood Sugar', 'Measures glucose levels after 8-12 hours of fasting', 'serum', 'SST', TRUE, 150.00, 1),
('PPBS', 'Post Prandial Blood Sugar', 'Measures glucose 2 hours after meal', 'serum', 'SST', FALSE, 150.00, 1),
('HBA1C', 'Glycated Hemoglobin', 'Average blood sugar over past 2-3 months', 'whole_blood', 'EDTA', FALSE, 450.00, 1),
('LIPID', 'Lipid Profile', 'Measures total cholesterol, HDL, LDL, triglycerides, VLDL', 'serum', 'SST', TRUE, 550.00, 1),

-- Thyroid Tests
('TSH', 'Thyroid Stimulating Hormone', 'Screens for thyroid disorders', 'serum', 'SST', FALSE, 350.00, 1),
('T3', 'Triiodothyronine', 'Measures T3 thyroid hormone', 'serum', 'SST', FALSE, 300.00, 1),
('T4', 'Thyroxine', 'Measures T4 thyroid hormone', 'serum', 'SST', FALSE, 300.00, 1),
('FT3', 'Free T3', 'Measures unbound T3 hormone', 'serum', 'SST', FALSE, 400.00, 2),
('FT4', 'Free T4', 'Measures unbound T4 hormone', 'serum', 'SST', FALSE, 400.00, 2),

-- Liver Function Tests
('LFT', 'Liver Function Test', 'Comprehensive liver panel including AST, ALT, ALP, bilirubin', 'serum', 'SST', TRUE, 650.00, 1),
('SGOT', 'Aspartate Aminotransferase (AST)', 'Liver enzyme test', 'serum', 'SST', FALSE, 200.00, 1),
('SGPT', 'Alanine Aminotransferase (ALT)', 'Liver enzyme test', 'serum', 'SST', FALSE, 200.00, 1),
('GGT', 'Gamma-Glutamyl Transferase', 'Liver and bile duct enzyme', 'serum', 'SST', FALSE, 250.00, 1),
('BILIRUBIN', 'Total Bilirubin', 'Measures bilirubin in blood', 'serum', 'SST', FALSE, 180.00, 1),

-- Kidney Function Tests
('KFT', 'Kidney Function Test', 'BUN, creatinine, uric acid, electrolytes', 'serum', 'SST', TRUE, 550.00, 1),
('CREATININE', 'Serum Creatinine', 'Kidney function marker', 'serum', 'SST', FALSE, 200.00, 1),
('BUN', 'Blood Urea Nitrogen', 'Kidney function marker', 'serum', 'SST', FALSE, 180.00, 1),
('URIC_ACID', 'Uric Acid', 'Measures uric acid levels', 'serum', 'SST', FALSE, 200.00, 1),

-- Vitamin Tests
('VITD', 'Vitamin D (25-OH)', 'Measures vitamin D levels', 'serum', 'SST', FALSE, 1200.00, 2),
('VITB12', 'Vitamin B12', 'Measures B12 levels', 'serum', 'SST', FALSE, 800.00, 2),
('FOLATE', 'Folic Acid', 'Measures folate levels', 'serum', 'SST', FALSE, 750.00, 2),
('IRON', 'Serum Iron', 'Measures iron levels', 'serum', 'SST', TRUE, 350.00, 1),
('FERRITIN', 'Ferritin', 'Measures iron stores', 'serum', 'SST', FALSE, 500.00, 2),

-- Hormone Tests
('TESTOSTERONE', 'Testosterone', 'Measures testosterone levels', 'serum', 'SST', TRUE, 650.00, 2),
('ESTROGEN', 'Estradiol (E2)', 'Measures estrogen levels', 'serum', 'SST', FALSE, 700.00, 2),
('PROLACTIN', 'Prolactin', 'Measures prolactin hormone', 'serum', 'SST', FALSE, 550.00, 2),
('CORTISOL', 'Cortisol Morning', 'Measures cortisol at 8am', 'serum', 'SST', TRUE, 600.00, 2),
('INSULIN', 'Fasting Insulin', 'Measures insulin levels', 'serum', 'SST', TRUE, 550.00, 2),

-- Cardiac Markers
('TROPONIN', 'Troponin I', 'Cardiac damage marker', 'serum', 'SST', FALSE, 1500.00, 1),
('BNP', 'Brain Natriuretic Peptide', 'Heart failure marker', 'plasma', 'EDTA', FALSE, 2000.00, 1),
('CRP', 'C-Reactive Protein', 'Inflammation marker', 'serum', 'SST', FALSE, 450.00, 1),
('HSCRP', 'High-Sensitivity CRP', 'Cardiac risk marker', 'serum', 'SST', FALSE, 650.00, 2),

-- Coagulation Tests
('PT', 'Prothrombin Time', 'Blood clotting test', 'plasma', 'Citrate', FALSE, 400.00, 1),
('APTT', 'Activated Partial Thromboplastin Time', 'Blood clotting test', 'plasma', 'Citrate', FALSE, 450.00, 1),
('DIMER', 'D-Dimer', 'Detects blood clots', 'plasma', 'Citrate', FALSE, 1200.00, 1),

-- Infection Markers
('ESR', 'Erythrocyte Sedimentation Rate', 'Inflammation indicator', 'whole_blood', 'EDTA', FALSE, 150.00, 1),
('WBC', 'White Blood Cell Count', 'Infection marker', 'whole_blood', 'EDTA', FALSE, 200.00, 1),
('PROCALCITONIN', 'Procalcitonin', 'Bacterial infection marker', 'serum', 'SST', FALSE, 1800.00, 1);

-- ============================================================================
-- MASTER DATA: Test Packages
-- ============================================================================

INSERT INTO test_packages (code, name, description, price) VALUES
('BASIC_HEALTH', 'Basic Health Checkup', 'CBC, FBS, Lipid Profile, LFT, KFT - Essential screening', 1999.00),
('COMPREHENSIVE', 'Comprehensive Health Checkup', 'All basic tests plus thyroid, vitamins, and cardiac markers', 4999.00),
('DIABETIC_PANEL', 'Diabetic Panel', 'FBS, PPBS, HBA1C, KFT, Lipid Profile - Complete diabetes monitoring', 1499.00),
('THYROID_COMPLETE', 'Complete Thyroid Panel', 'TSH, T3, T4, FT3, FT4 - Full thyroid assessment', 1299.00),
('CARDIAC_RISK', 'Cardiac Risk Panel', 'Lipid Profile, hsCRP, Troponin, BNP - Heart health assessment', 3499.00),
('ANEMIA_PANEL', 'Anemia Panel', 'CBC, Iron, Ferritin, Vitamin B12, Folate - Anemia workup', 2199.00),
('LIVER_COMPLETE', 'Complete Liver Panel', 'LFT, GGT, Bilirubin - Comprehensive liver assessment', 999.00),
('KIDNEY_COMPLETE', 'Complete Kidney Panel', 'KFT, Creatinine, BUN, Uric Acid - Kidney function assessment', 899.00),
('HORMONE_MALE', 'Male Hormone Panel', 'Testosterone, Prolactin, Cortisol, TSH', 1999.00),
('HORMONE_FEMALE', 'Female Hormone Panel', 'Estrogen, Prolactin, TSH, Cortisol', 2199.00),
('VITAMIN_PANEL', 'Vitamin Panel', 'Vitamin D, B12, Folate, Iron, Ferritin', 2999.00),
('SENIOR_CITIZEN', 'Senior Citizen Package', 'Comprehensive screening for 60+ age group', 5999.00),
('PRE_EMPLOYMENT', 'Pre-Employment Checkup', 'Basic health screening for job applicants', 1499.00),
('PREGNANCY_PANEL', 'Pregnancy Panel', 'Essential tests for pregnancy monitoring', 2499.00),
('IMMUNITY_PANEL', 'Immunity Panel', 'CBC, CRP, ESR, Vitamin D - Immune system assessment', 1799.00);

-- ============================================================================
-- Package-Test Relationships
-- ============================================================================

-- Basic Health Checkup: CBC, FBS, Lipid, LFT, KFT
INSERT INTO package_tests (package_id, blood_test_id)
SELECT p.id, bt.id FROM test_packages p, blood_tests bt
WHERE p.code = 'BASIC_HEALTH' AND bt.code IN ('CBC', 'FBS', 'LIPID', 'LFT', 'KFT');

-- Diabetic Panel
INSERT INTO package_tests (package_id, blood_test_id)
SELECT p.id, bt.id FROM test_packages p, blood_tests bt
WHERE p.code = 'DIABETIC_PANEL' AND bt.code IN ('FBS', 'PPBS', 'HBA1C', 'KFT', 'LIPID');

-- Thyroid Complete
INSERT INTO package_tests (package_id, blood_test_id)
SELECT p.id, bt.id FROM test_packages p, blood_tests bt
WHERE p.code = 'THYROID_COMPLETE' AND bt.code IN ('TSH', 'T3', 'T4', 'FT3', 'FT4');

-- Cardiac Risk Panel
INSERT INTO package_tests (package_id, blood_test_id)
SELECT p.id, bt.id FROM test_packages p, blood_tests bt
WHERE p.code = 'CARDIAC_RISK' AND bt.code IN ('LIPID', 'HSCRP', 'TROPONIN', 'BNP');

-- Anemia Panel
INSERT INTO package_tests (package_id, blood_test_id)
SELECT p.id, bt.id FROM test_packages p, blood_tests bt
WHERE p.code = 'ANEMIA_PANEL' AND bt.code IN ('CBC', 'IRON', 'FERRITIN', 'VITB12', 'FOLATE');

-- Liver Complete
INSERT INTO package_tests (package_id, blood_test_id)
SELECT p.id, bt.id FROM test_packages p, blood_tests bt
WHERE p.code = 'LIVER_COMPLETE' AND bt.code IN ('LFT', 'GGT', 'BILIRUBIN', 'SGOT', 'SGPT');

-- Kidney Complete
INSERT INTO package_tests (package_id, blood_test_id)
SELECT p.id, bt.id FROM test_packages p, blood_tests bt
WHERE p.code = 'KIDNEY_COMPLETE' AND bt.code IN ('KFT', 'CREATININE', 'BUN', 'URIC_ACID');

-- Male Hormone Panel
INSERT INTO package_tests (package_id, blood_test_id)
SELECT p.id, bt.id FROM test_packages p, blood_tests bt
WHERE p.code = 'HORMONE_MALE' AND bt.code IN ('TESTOSTERONE', 'PROLACTIN', 'CORTISOL', 'TSH');

-- Female Hormone Panel
INSERT INTO package_tests (package_id, blood_test_id)
SELECT p.id, bt.id FROM test_packages p, blood_tests bt
WHERE p.code = 'HORMONE_FEMALE' AND bt.code IN ('ESTROGEN', 'PROLACTIN', 'TSH', 'CORTISOL');

-- Vitamin Panel
INSERT INTO package_tests (package_id, blood_test_id)
SELECT p.id, bt.id FROM test_packages p, blood_tests bt
WHERE p.code = 'VITAMIN_PANEL' AND bt.code IN ('VITD', 'VITB12', 'FOLATE', 'IRON', 'FERRITIN');

-- Comprehensive (all basic + more)
INSERT INTO package_tests (package_id, blood_test_id)
SELECT p.id, bt.id FROM test_packages p, blood_tests bt
WHERE p.code = 'COMPREHENSIVE' AND bt.code IN ('CBC', 'FBS', 'HBA1C', 'LIPID', 'LFT', 'KFT', 'TSH', 'VITD', 'VITB12', 'CRP');

-- Immunity Panel
INSERT INTO package_tests (package_id, blood_test_id)
SELECT p.id, bt.id FROM test_packages p, blood_tests bt
WHERE p.code = 'IMMUNITY_PANEL' AND bt.code IN ('CBC', 'CRP', 'ESR', 'VITD');

-- Senior Citizen Package
INSERT INTO package_tests (package_id, blood_test_id)
SELECT p.id, bt.id FROM test_packages p, blood_tests bt
WHERE p.code = 'SENIOR_CITIZEN' AND bt.code IN ('CBC', 'FBS', 'HBA1C', 'LIPID', 'LFT', 'KFT', 'TSH', 'VITD', 'VITB12', 'HSCRP', 'PT');

-- ============================================================================
-- USER REFERENCES (External User Service)
-- ============================================================================

INSERT INTO user_references (external_user_id, cached_name, cached_email, cached_phone) VALUES
('USR-001', 'Rahul Sharma', 'rahul.sharma@email.com', '+91-9876543210'),
('USR-002', 'Priya Patel', 'priya.patel@email.com', '+91-9876543211'),
('USR-003', 'Amit Kumar', 'amit.kumar@email.com', '+91-9876543212'),
('USR-004', 'Sneha Reddy', 'sneha.reddy@email.com', '+91-9876543213'),
('USR-005', 'Vikram Singh', 'vikram.singh@email.com', '+91-9876543214'),
('USR-006', 'Ananya Gupta', 'ananya.gupta@email.com', '+91-9876543215'),
('USR-007', 'Rajesh Iyer', 'rajesh.iyer@email.com', '+91-9876543216'),
('USR-008', 'Kavitha Nair', 'kavitha.nair@email.com', '+91-9876543217'),
('USR-009', 'Suresh Menon', 'suresh.menon@email.com', '+91-9876543218'),
('USR-010', 'Deepika Joshi', 'deepika.joshi@email.com', '+91-9876543219'),
('USR-011', 'Arjun Malhotra', 'arjun.malhotra@email.com', '+91-9876543220'),
('USR-012', 'Meera Krishnan', 'meera.krishnan@email.com', '+91-9876543221'),
('USR-013', 'Karthik Rajan', 'karthik.rajan@email.com', '+91-9876543222'),
('USR-014', 'Pooja Verma', 'pooja.verma@email.com', '+91-9876543223'),
('USR-015', 'Nikhil Agarwal', 'nikhil.agarwal@email.com', '+91-9876543224');

-- ============================================================================
-- LOGISTICS SLOT REFERENCES (External Logistics Service)
-- ============================================================================

INSERT INTO logistics_slot_references (external_slot_id, slot_date, slot_time_start, slot_time_end, zone_id, phlebotomist_id, cached_phlebotomist_name) VALUES
-- Today's slots
('LOG-SLT-001', CURRENT_DATE, '07:00', '09:00', 'ZONE-A1', 'PHB-001', 'Dr. Sanjay Kumar'),
('LOG-SLT-002', CURRENT_DATE, '09:00', '11:00', 'ZONE-A1', 'PHB-001', 'Dr. Sanjay Kumar'),
('LOG-SLT-003', CURRENT_DATE, '11:00', '13:00', 'ZONE-A2', 'PHB-002', 'Ms. Rekha Sharma'),
('LOG-SLT-004', CURRENT_DATE, '14:00', '16:00', 'ZONE-A2', 'PHB-002', 'Ms. Rekha Sharma'),
('LOG-SLT-005', CURRENT_DATE, '16:00', '18:00', 'ZONE-B1', 'PHB-003', 'Mr. Vijay Patil'),
-- Tomorrow's slots
('LOG-SLT-006', CURRENT_DATE + 1, '07:00', '09:00', 'ZONE-A1', 'PHB-001', 'Dr. Sanjay Kumar'),
('LOG-SLT-007', CURRENT_DATE + 1, '09:00', '11:00', 'ZONE-B1', 'PHB-003', 'Mr. Vijay Patil'),
('LOG-SLT-008', CURRENT_DATE + 1, '11:00', '13:00', 'ZONE-B2', 'PHB-004', 'Ms. Anita Singh'),
('LOG-SLT-009', CURRENT_DATE + 1, '14:00', '16:00', 'ZONE-C1', 'PHB-005', 'Dr. Mohan Rao'),
('LOG-SLT-010', CURRENT_DATE + 1, '16:00', '18:00', 'ZONE-C1', 'PHB-005', 'Dr. Mohan Rao'),
-- Day after tomorrow
('LOG-SLT-011', CURRENT_DATE + 2, '07:00', '09:00', 'ZONE-A1', 'PHB-001', 'Dr. Sanjay Kumar'),
('LOG-SLT-012', CURRENT_DATE + 2, '09:00', '11:00', 'ZONE-A2', 'PHB-002', 'Ms. Rekha Sharma'),
('LOG-SLT-013', CURRENT_DATE + 2, '11:00', '13:00', 'ZONE-B1', 'PHB-003', 'Mr. Vijay Patil'),
('LOG-SLT-014', CURRENT_DATE + 2, '14:00', '16:00', 'ZONE-B2', 'PHB-004', 'Ms. Anita Singh'),
('LOG-SLT-015', CURRENT_DATE + 2, '16:00', '18:00', 'ZONE-C1', 'PHB-005', 'Dr. Mohan Rao'),
-- Past slots (for historical data)
('LOG-SLT-016', CURRENT_DATE - 7, '07:00', '09:00', 'ZONE-A1', 'PHB-001', 'Dr. Sanjay Kumar'),
('LOG-SLT-017', CURRENT_DATE - 7, '09:00', '11:00', 'ZONE-A2', 'PHB-002', 'Ms. Rekha Sharma'),
('LOG-SLT-018', CURRENT_DATE - 5, '11:00', '13:00', 'ZONE-B1', 'PHB-003', 'Mr. Vijay Patil'),
('LOG-SLT-019', CURRENT_DATE - 3, '14:00', '16:00', 'ZONE-B2', 'PHB-004', 'Ms. Anita Singh'),
('LOG-SLT-020', CURRENT_DATE - 1, '16:00', '18:00', 'ZONE-C1', 'PHB-005', 'Dr. Mohan Rao');

-- ============================================================================
-- ADDRESSES
-- ============================================================================

INSERT INTO addresses (address_line1, address_line2, city, state, postal_code, landmark, latitude, longitude, address_type) VALUES
('123, Green Park Colony', 'Near Metro Station', 'New Delhi', 'Delhi', '110016', 'Opposite Green Park Market', 28.5590, 77.2068, 'home'),
('456, Bandra West', 'Hill Road', 'Mumbai', 'Maharashtra', '400050', 'Near Linking Road', 19.0596, 72.8295, 'home'),
('789, Koramangala 4th Block', 'Sony World Junction', 'Bangalore', 'Karnataka', '560034', 'Near Forum Mall', 12.9352, 77.6245, 'home'),
('234, Anna Nagar East', 'Main Road', 'Chennai', 'Tamil Nadu', '600102', 'Near Shanti Colony', 13.0878, 80.2204, 'home'),
('567, Salt Lake City', 'Sector V', 'Kolkata', 'West Bengal', '700091', 'Near Technopolis', 22.5726, 88.4321, 'office'),
('890, Jubilee Hills', 'Road No. 36', 'Hyderabad', 'Telangana', '500033', 'Near KBR Park', 17.4326, 78.4071, 'home'),
('123, Vastrapur', 'SG Highway', 'Ahmedabad', 'Gujarat', '380015', 'Near Vastrapur Lake', 23.0305, 72.5297, 'home'),
('456, Aundh', 'Near ITI Road', 'Pune', 'Maharashtra', '411007', 'Opposite Aundh Hospital', 18.5597, 73.8076, 'home'),
('789, Gomti Nagar', 'Vibhuti Khand', 'Lucknow', 'Uttar Pradesh', '226010', 'Near Phoenix Mall', 26.8467, 80.9462, 'home'),
('234, Sector 62', 'Industrial Area', 'Noida', 'Uttar Pradesh', '201301', 'Near Metro Station', 28.6273, 77.3714, 'office'),
('567, Indiranagar', '100 Feet Road', 'Bangalore', 'Karnataka', '560038', 'Near Sony Signal', 12.9716, 77.6412, 'home'),
('890, Whitefield', 'ITPL Main Road', 'Bangalore', 'Karnataka', '560066', 'Near Phoenix Mall', 12.9698, 77.7500, 'office'),
('321, Andheri East', 'MIDC Area', 'Mumbai', 'Maharashtra', '400093', 'Near Chakala Metro', 19.1136, 72.8697, 'office'),
('654, Viman Nagar', 'Near Airport', 'Pune', 'Maharashtra', '411014', 'Opposite Phoenix Mall', 18.5679, 73.9143, 'home'),
('987, Gachibowli', 'Financial District', 'Hyderabad', 'Telangana', '500032', 'Near DLF Cyber City', 17.4401, 78.3489, 'office');

-- ============================================================================
-- PATIENTS
-- ============================================================================

INSERT INTO patients (first_name, last_name, date_of_birth, gender, phone, email, relationship_to_user, medical_conditions, allergies) VALUES
('Rahul', 'Sharma', '1985-03-15', 'Male', '+91-9876543210', 'rahul.sharma@email.com', 'self', NULL, NULL),
('Sunita', 'Sharma', '1987-07-22', 'Female', '+91-9876543230', 'sunita.sharma@email.com', 'spouse', 'Diabetes Type 2', NULL),
('Aryan', 'Sharma', '2015-11-10', 'Male', NULL, NULL, 'child', NULL, 'Penicillin'),
('Priya', 'Patel', '1990-05-08', 'Female', '+91-9876543211', 'priya.patel@email.com', 'self', 'Thyroid', NULL),
('Amit', 'Kumar', '1982-09-20', 'Male', '+91-9876543212', 'amit.kumar@email.com', 'self', 'Hypertension', NULL),
('Kamla', 'Kumar', '1955-02-14', 'Female', '+91-9876543232', 'kamla.kumar@email.com', 'parent', 'Diabetes, Arthritis', NULL),
('Sneha', 'Reddy', '1995-12-03', 'Female', '+91-9876543213', 'sneha.reddy@email.com', 'self', NULL, NULL),
('Vikram', 'Singh', '1978-06-28', 'Male', '+91-9876543214', 'vikram.singh@email.com', 'self', 'Heart Disease', 'Sulfa drugs'),
('Meera', 'Singh', '1980-04-17', 'Female', '+91-9876543234', 'meera.singh@email.com', 'spouse', NULL, NULL),
('Ananya', 'Gupta', '1992-08-09', 'Female', '+91-9876543215', 'ananya.gupta@email.com', 'self', 'PCOS', NULL),
('Rajesh', 'Iyer', '1975-01-30', 'Male', '+91-9876543216', 'rajesh.iyer@email.com', 'self', 'Kidney Disease', NULL),
('Kavitha', 'Nair', '1988-10-25', 'Female', '+91-9876543217', 'kavitha.nair@email.com', 'self', NULL, 'Aspirin'),
('Suresh', 'Menon', '1965-07-12', 'Male', '+91-9876543218', 'suresh.menon@email.com', 'self', 'Diabetes, Hypertension', NULL),
('Lakshmi', 'Menon', '1968-03-05', 'Female', '+91-9876543238', 'lakshmi.menon@email.com', 'spouse', 'Thyroid', NULL),
('Deepika', 'Joshi', '1993-04-18', 'Female', '+91-9876543219', 'deepika.joshi@email.com', 'self', NULL, NULL),
('Arjun', 'Malhotra', '1980-11-22', 'Male', '+91-9876543220', 'arjun.malhotra@email.com', 'self', 'Asthma', NULL),
('Meera', 'Krishnan', '1985-06-14', 'Female', '+91-9876543221', 'meera.krishnan@email.com', 'self', 'Anemia', NULL),
('Karthik', 'Rajan', '1970-09-08', 'Male', '+91-9876543222', 'karthik.rajan@email.com', 'self', 'Liver Disease', 'Contrast dye'),
('Pooja', 'Verma', '1998-02-27', 'Female', '+91-9876543223', 'pooja.verma@email.com', 'self', NULL, NULL),
('Nikhil', 'Agarwal', '1983-12-11', 'Male', '+91-9876543224', 'nikhil.agarwal@email.com', 'self', 'Cholesterol', NULL);

-- ============================================================================
-- REQUESTS (Various statuses for testing)
-- ============================================================================

-- Manually set request numbers since trigger won't work on explicit inserts
INSERT INTO requests (request_number, user_ref_id, address_id, status, total_amount, discount_amount, final_amount, payment_status, payment_reference, notes, submitted_at, completed_at) VALUES
-- Completed requests (historical)
('REQ-2024-00001', 1, 1, 'completed', 2500.00, 250.00, 2250.00, 'paid', 'PAY-001-ABC', 'Regular checkup', CURRENT_TIMESTAMP - INTERVAL '10 days', CURRENT_TIMESTAMP - INTERVAL '9 days'),
('REQ-2024-00002', 2, 2, 'completed', 1499.00, 0.00, 1499.00, 'paid', 'PAY-002-DEF', 'Diabetic monitoring', CURRENT_TIMESTAMP - INTERVAL '8 days', CURRENT_TIMESTAMP - INTERVAL '7 days'),
('REQ-2024-00003', 3, 3, 'completed', 4999.00, 500.00, 4499.00, 'paid', 'PAY-003-GHI', 'Annual health checkup', CURRENT_TIMESTAMP - INTERVAL '6 days', CURRENT_TIMESTAMP - INTERVAL '5 days'),
-- Cancelled request
('REQ-2024-00004', 4, 4, 'cancelled', 1299.00, 0.00, 1299.00, 'refunded', 'PAY-004-JKL', 'Thyroid follow-up - cancelled by patient', CURRENT_TIMESTAMP - INTERVAL '5 days', NULL),
-- In progress requests
('REQ-2024-00005', 5, 5, 'in_progress', 3499.00, 350.00, 3149.00, 'paid', 'PAY-005-MNO', 'Cardiac checkup', CURRENT_TIMESTAMP - INTERVAL '1 day', NULL),
('REQ-2024-00006', 6, 6, 'in_progress', 5999.00, 600.00, 5399.00, 'paid', 'PAY-006-PQR', 'Senior citizen package', CURRENT_TIMESTAMP - INTERVAL '1 day', NULL),
-- Scheduled requests
('REQ-2024-00007', 7, 7, 'scheduled', 1999.00, 200.00, 1799.00, 'paid', 'PAY-007-STU', 'Basic health checkup', CURRENT_TIMESTAMP - INTERVAL '12 hours', NULL),
('REQ-2024-00008', 8, 8, 'scheduled', 2199.00, 0.00, 2199.00, 'paid', 'PAY-008-VWX', 'Anemia panel', CURRENT_TIMESTAMP - INTERVAL '6 hours', NULL),
-- Processing requests
('REQ-2024-00009', 9, 9, 'processing', 2999.00, 300.00, 2699.00, 'paid', 'PAY-009-YZA', 'Vitamin panel', CURRENT_TIMESTAMP - INTERVAL '3 hours', NULL),
('REQ-2024-00010', 10, 10, 'processing', 1499.00, 150.00, 1349.00, 'paid', 'PAY-010-BCD', 'Pre-employment checkup', CURRENT_TIMESTAMP - INTERVAL '2 hours', NULL),
-- Submitted requests
('REQ-2024-00011', 11, 11, 'submitted', 1799.00, 0.00, 1799.00, 'paid', 'PAY-011-EFG', 'Immunity panel', CURRENT_TIMESTAMP - INTERVAL '1 hour', NULL),
('REQ-2024-00012', 12, 12, 'submitted', 999.00, 100.00, 899.00, 'paid', 'PAY-012-HIJ', 'Liver panel', CURRENT_TIMESTAMP - INTERVAL '30 minutes', NULL),
-- Draft requests
('REQ-2024-00013', 13, 13, 'draft', 899.00, 0.00, 899.00, 'pending', NULL, 'Kidney panel - not yet submitted', NULL, NULL),
('REQ-2024-00014', 14, 14, 'draft', 4999.00, 0.00, 4999.00, 'pending', NULL, 'Comprehensive checkup - draft', NULL, NULL),
-- Multi-patient request (family checkup)
('REQ-2024-00015', 1, 1, 'scheduled', 7500.00, 1000.00, 6500.00, 'paid', 'PAY-015-KLM', 'Family health checkup - 3 members', CURRENT_TIMESTAMP - INTERVAL '4 hours', NULL);

-- ============================================================================
-- ORDERS (with various statuses)
-- ============================================================================

-- Orders for completed requests
INSERT INTO orders (order_number, request_id, patient_id, status, subtotal, completed_at) VALUES
('ORD-2024-00001', 1, 1, 'completed', 2500.00, CURRENT_TIMESTAMP - INTERVAL '9 days'),
('ORD-2024-00002', 2, 4, 'completed', 1499.00, CURRENT_TIMESTAMP - INTERVAL '7 days'),
('ORD-2024-00003', 3, 5, 'completed', 2499.00, CURRENT_TIMESTAMP - INTERVAL '5 days'),
('ORD-2024-00004', 3, 6, 'completed', 2500.00, CURRENT_TIMESTAMP - INTERVAL '5 days'),
-- Cancelled order
('ORD-2024-00005', 4, 4, 'cancelled', 1299.00, NULL),
-- In progress orders
('ORD-2024-00006', 5, 8, 'created', 3499.00, NULL),
('ORD-2024-00007', 6, 13, 'created', 2999.00, NULL),
('ORD-2024-00008', 6, 14, 'created', 3000.00, NULL),
-- Scheduled orders
('ORD-2024-00009', 7, 1, 'created', 1999.00, NULL),
('ORD-2024-00010', 8, 17, 'created', 2199.00, NULL),
-- Processing orders
('ORD-2024-00011', 9, 15, 'created', 2999.00, NULL),
('ORD-2024-00012', 10, 16, 'created', 1499.00, NULL),
-- Submitted orders
('ORD-2024-00013', 11, 16, 'created', 1799.00, NULL),
('ORD-2024-00014', 12, 18, 'created', 999.00, NULL),
-- Draft orders
('ORD-2024-00015', 13, 18, 'created', 899.00, NULL),
('ORD-2024-00016', 14, 19, 'created', 4999.00, NULL),
-- Multi-patient family request
('ORD-2024-00017', 15, 1, 'created', 2500.00, NULL),
('ORD-2024-00018', 15, 2, 'created', 2500.00, NULL),
('ORD-2024-00019', 15, 3, 'created', 2500.00, NULL);

-- ============================================================================
-- ORDER ITEMS (tests and packages)
-- ============================================================================

-- Order 1: Basic Health Package
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 1, 'package', id, 1999.00, 1999.00 FROM test_packages WHERE code = 'BASIC_HEALTH';
INSERT INTO order_items (order_id, item_type, blood_test_id, unit_price, total_price)
SELECT 1, 'blood_test', id, 350.00, 350.00 FROM blood_tests WHERE code = 'TSH';

-- Order 2: Diabetic Panel
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 2, 'package', id, 1499.00, 1499.00 FROM test_packages WHERE code = 'DIABETIC_PANEL';

-- Order 3: Comprehensive Package
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 3, 'package', id, 4999.00, 4999.00 FROM test_packages WHERE code = 'COMPREHENSIVE';

-- Order 4: Individual tests for elderly patient
INSERT INTO order_items (order_id, item_type, blood_test_id, unit_price, total_price)
SELECT 4, 'blood_test', id, price, price FROM blood_tests WHERE code IN ('CBC', 'FBS', 'KFT', 'LFT', 'TSH');

-- Order 5 (cancelled): Thyroid Complete
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 5, 'package', id, 1299.00, 1299.00 FROM test_packages WHERE code = 'THYROID_COMPLETE';

-- Order 6: Cardiac Risk Panel
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 6, 'package', id, 3499.00, 3499.00 FROM test_packages WHERE code = 'CARDIAC_RISK';

-- Orders 7-8: Senior Citizen Package split
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 7, 'package', id, 5999.00, 5999.00 FROM test_packages WHERE code = 'SENIOR_CITIZEN';
INSERT INTO order_items (order_id, item_type, blood_test_id, unit_price, total_price)
SELECT 8, 'blood_test', id, price, price FROM blood_tests WHERE code IN ('VITD', 'VITB12', 'FOLATE');

-- Order 9: Basic Health
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 9, 'package', id, 1999.00, 1999.00 FROM test_packages WHERE code = 'BASIC_HEALTH';

-- Order 10: Anemia Panel
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 10, 'package', id, 2199.00, 2199.00 FROM test_packages WHERE code = 'ANEMIA_PANEL';

-- Order 11: Vitamin Panel
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 11, 'package', id, 2999.00, 2999.00 FROM test_packages WHERE code = 'VITAMIN_PANEL';

-- Order 12: Pre-Employment
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 12, 'package', id, 1499.00, 1499.00 FROM test_packages WHERE code = 'PRE_EMPLOYMENT';

-- Order 13: Immunity Panel
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 13, 'package', id, 1799.00, 1799.00 FROM test_packages WHERE code = 'IMMUNITY_PANEL';

-- Order 14: Liver Complete
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 14, 'package', id, 999.00, 999.00 FROM test_packages WHERE code = 'LIVER_COMPLETE';

-- Order 15: Kidney Complete
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 15, 'package', id, 899.00, 899.00 FROM test_packages WHERE code = 'KIDNEY_COMPLETE';

-- Order 16: Comprehensive
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 16, 'package', id, 4999.00, 4999.00 FROM test_packages WHERE code = 'COMPREHENSIVE';

-- Family orders (17, 18, 19): Basic Health for each member
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 17, 'package', id, 1999.00, 1999.00 FROM test_packages WHERE code = 'BASIC_HEALTH';
INSERT INTO order_items (order_id, item_type, blood_test_id, unit_price, total_price)
SELECT 17, 'blood_test', id, 350.00, 350.00 FROM blood_tests WHERE code = 'TSH';

INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 18, 'package', id, 1999.00, 1999.00 FROM test_packages WHERE code = 'BASIC_HEALTH';
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 18, 'package', id, 1499.00, 1499.00 FROM test_packages WHERE code = 'DIABETIC_PANEL';

INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 19, 'package', id, 1999.00, 1999.00 FROM test_packages WHERE code = 'BASIC_HEALTH';
INSERT INTO order_items (order_id, item_type, blood_test_id, unit_price, total_price)
SELECT 19, 'blood_test', id, price, price FROM blood_tests WHERE code IN ('CBC', 'VITD');

-- ============================================================================
-- COLLECTION SLOTS
-- ============================================================================

INSERT INTO collection_slots (slot_number, request_id, logistics_slot_ref_id, status, scheduled_date, scheduled_time_start, scheduled_time_end, fasting_required, special_instructions, actual_arrival_time, collection_start_time, collection_end_time) VALUES
-- Completed slots (historical)
('SLT-2024-00001', 1, 16, 'completed', CURRENT_DATE - 7, '07:00', '09:00', TRUE, 'Patient prefers early morning', CURRENT_TIMESTAMP - INTERVAL '7 days' + INTERVAL '7 hours', CURRENT_TIMESTAMP - INTERVAL '7 days' + INTERVAL '7 hours 15 minutes', CURRENT_TIMESTAMP - INTERVAL '7 days' + INTERVAL '7 hours 45 minutes'),
('SLT-2024-00002', 2, 17, 'completed', CURRENT_DATE - 7, '09:00', '11:00', TRUE, 'Diabetic patient - handle with care', CURRENT_TIMESTAMP - INTERVAL '7 days' + INTERVAL '9 hours', CURRENT_TIMESTAMP - INTERVAL '7 days' + INTERVAL '9 hours 10 minutes', CURRENT_TIMESTAMP - INTERVAL '7 days' + INTERVAL '9 hours 40 minutes'),
('SLT-2024-00003', 3, 18, 'completed', CURRENT_DATE - 5, '11:00', '13:00', TRUE, 'Two patients - elderly mother included', CURRENT_TIMESTAMP - INTERVAL '5 days' + INTERVAL '11 hours', CURRENT_TIMESTAMP - INTERVAL '5 days' + INTERVAL '11 hours 20 minutes', CURRENT_TIMESTAMP - INTERVAL '5 days' + INTERVAL '12 hours 30 minutes'),
-- Cancelled slot
('SLT-2024-00004', 4, 19, 'cancelled', CURRENT_DATE - 3, '14:00', '16:00', FALSE, 'Patient cancelled due to travel', NULL, NULL, NULL),
-- In progress slots
('SLT-2024-00005', 5, 20, 'in_transit', CURRENT_DATE, '16:00', '18:00', TRUE, 'Cardiac patient - ECG also scheduled', NULL, NULL, NULL),
('SLT-2024-00006', 6, 1, 'arrived', CURRENT_DATE, '07:00', '09:00', TRUE, 'Senior citizen couple - take time', CURRENT_TIMESTAMP, NULL, NULL),
-- Scheduled slots (future)
('SLT-2024-00007', 7, 6, 'scheduled', CURRENT_DATE + 1, '07:00', '09:00', TRUE, 'Early morning preferred', NULL, NULL, NULL),
('SLT-2024-00008', 8, 7, 'scheduled', CURRENT_DATE + 1, '09:00', '11:00', FALSE, 'No fasting required for this panel', NULL, NULL, NULL),
('SLT-2024-00009', 9, 11, 'confirmed', CURRENT_DATE + 2, '07:00', '09:00', FALSE, 'Patient confirmed via SMS', NULL, NULL, NULL),
('SLT-2024-00010', 10, 12, 'scheduled', CURRENT_DATE + 2, '09:00', '11:00', TRUE, 'Office collection', NULL, NULL, NULL),
-- Rescheduled slot example
('SLT-2024-00011', 11, 8, 'scheduled', CURRENT_DATE + 1, '11:00', '13:00', FALSE, NULL, NULL, NULL, NULL),
('SLT-2024-00012', 12, 9, 'scheduled', CURRENT_DATE + 1, '14:00', '16:00', TRUE, 'Rescheduled from morning slot', NULL, NULL, NULL),
-- Multi-patient request - single slot for family
('SLT-2024-00013', 15, 10, 'scheduled', CURRENT_DATE + 1, '16:00', '18:00', TRUE, 'Family of 3 - father, mother, child', NULL, NULL, NULL);

-- Update slot 12 to show it was rescheduled from slot 11
UPDATE collection_slots SET rescheduled_from_id = 11, status = 'rescheduled' WHERE slot_number = 'SLT-2024-00011';

-- ============================================================================
-- SLOT-ORDER RELATIONSHIPS
-- ============================================================================

-- Single order slots
INSERT INTO slot_orders (slot_id, order_id) VALUES
(1, 1),  -- REQ-1 slot covers order 1
(2, 2),  -- REQ-2 slot covers order 2
(3, 3),  -- REQ-3 slot covers orders 3 and 4 (mother-son)
(3, 4),
(4, 5),  -- Cancelled
(5, 6),  -- Cardiac patient
(6, 7),  -- Senior citizen couple - first order
(6, 8),  -- Senior citizen couple - second order
(7, 9),  -- Scheduled
(8, 10), -- Scheduled
(9, 11), -- Confirmed
(10, 12), -- Scheduled
(11, 13), -- Rescheduled from
(12, 13), -- Rescheduled to
(13, 17), -- Family slot - all 3 family members
(13, 18),
(13, 19);

-- ============================================================================
-- STATUS HISTORY (simulated history)
-- ============================================================================

-- Request 1 history (completed)
INSERT INTO request_status_history (request_id, old_status, new_status, changed_by, change_reason, created_at) VALUES
(1, NULL, 'draft', 'system', 'Request created', CURRENT_TIMESTAMP - INTERVAL '11 days'),
(1, 'draft', 'submitted', 'user', 'User submitted request', CURRENT_TIMESTAMP - INTERVAL '10 days 23 hours'),
(1, 'submitted', 'processing', 'system', 'Payment confirmed', CURRENT_TIMESTAMP - INTERVAL '10 days 22 hours'),
(1, 'processing', 'scheduled', 'system', 'Slot assigned', CURRENT_TIMESTAMP - INTERVAL '10 days 20 hours'),
(1, 'scheduled', 'in_progress', 'system', 'Collection started', CURRENT_TIMESTAMP - INTERVAL '9 days 5 hours'),
(1, 'in_progress', 'completed', 'phlebotomist', 'Collection completed', CURRENT_TIMESTAMP - INTERVAL '9 days 4 hours');

-- Request 4 history (cancelled)
INSERT INTO request_status_history (request_id, old_status, new_status, changed_by, change_reason, created_at) VALUES
(4, NULL, 'draft', 'system', 'Request created', CURRENT_TIMESTAMP - INTERVAL '6 days'),
(4, 'draft', 'submitted', 'user', 'User submitted request', CURRENT_TIMESTAMP - INTERVAL '5 days 23 hours'),
(4, 'submitted', 'processing', 'system', 'Payment confirmed', CURRENT_TIMESTAMP - INTERVAL '5 days 22 hours'),
(4, 'processing', 'scheduled', 'system', 'Slot assigned', CURRENT_TIMESTAMP - INTERVAL '5 days 20 hours'),
(4, 'scheduled', 'cancelled', 'user', 'Patient travelling - requested cancellation', CURRENT_TIMESTAMP - INTERVAL '5 days');

-- Slot history for slot 11-12 (rescheduled)
INSERT INTO slot_status_history (slot_id, old_status, new_status, changed_by, change_reason, created_at) VALUES
(11, NULL, 'scheduled', 'system', 'Slot created', CURRENT_TIMESTAMP - INTERVAL '2 days'),
(11, 'scheduled', 'rescheduled', 'user', 'Patient requested afternoon slot', CURRENT_TIMESTAMP - INTERVAL '1 day'),
(12, NULL, 'scheduled', 'system', 'New slot created from reschedule', CURRENT_TIMESTAMP - INTERVAL '1 day');

-- ============================================================================
-- SAMPLE ANALYTICS DATA (Additional records for complex queries)
-- ============================================================================

-- Add more varied test data for analytics
INSERT INTO blood_tests (code, name, description, sample_type, tube_type, fasting_required, price, turnaround_days) VALUES
('COVID_AB', 'COVID-19 Antibody Test', 'Detects antibodies against SARS-CoV-2', 'serum', 'SST', FALSE, 800.00, 1),
('COVID_RT', 'COVID-19 RT-PCR', 'Detects active COVID-19 infection', 'swab', 'VTM', FALSE, 500.00, 1),
('ALLERGY_PANEL', 'Allergy Panel', 'Tests for common allergens', 'serum', 'SST', FALSE, 3500.00, 3),
('GENETIC_SCREEN', 'Basic Genetic Screening', 'Common genetic markers', 'whole_blood', 'EDTA', FALSE, 8000.00, 7);

-- End of seed data
-- Total Records Created:
-- - Blood Tests: 40+
-- - Test Packages: 15
-- - User References: 15
-- - Logistics Slot References: 20
-- - Addresses: 15
-- - Patients: 20
-- - Requests: 15
-- - Orders: 19
-- - Order Items: 30+
-- - Collection Slots: 13
-- - Status History: 15+
