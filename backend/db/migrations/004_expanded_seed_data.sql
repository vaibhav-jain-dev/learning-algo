-- ============================================================================
-- EXPANDED SEED DATA for SQL Learning
-- Additional data for more comprehensive query examples
-- ============================================================================

-- ============================================================================
-- MORE PATIENTS (Adding 30 more for better join/aggregation examples)
-- ============================================================================

INSERT INTO patients (first_name, last_name, date_of_birth, gender, phone, email, relationship_to_user, medical_conditions, allergies) VALUES
-- More self patients
('Aditya', 'Bansal', '1991-02-14', 'Male', '+91-9876543225', 'aditya.bansal@email.com', 'self', NULL, NULL),
('Ritu', 'Saxena', '1986-08-19', 'Female', '+91-9876543226', 'ritu.saxena@email.com', 'self', 'Migraine', NULL),
('Manish', 'Tiwari', '1979-11-30', 'Male', '+91-9876543227', 'manish.tiwari@email.com', 'self', 'Diabetes Type 1', 'Latex'),
('Sakshi', 'Dubey', '1994-05-07', 'Female', '+91-9876543228', 'sakshi.dubey@email.com', 'self', NULL, NULL),
('Rohan', 'Kapoor', '1988-03-25', 'Male', '+91-9876543229', 'rohan.kapoor@email.com', 'self', 'Hypertension', NULL),
('Nisha', 'Mehta', '1992-09-12', 'Female', '+91-9876543231', 'nisha.mehta@email.com', 'self', 'Thyroid', NULL),
('Vivek', 'Chauhan', '1976-12-08', 'Male', '+91-9876543233', 'vivek.chauhan@email.com', 'self', 'Heart Disease', 'Iodine'),
('Preeti', 'Sinha', '1989-07-16', 'Female', '+91-9876543235', 'preeti.sinha@email.com', 'self', 'PCOS', NULL),
('Gaurav', 'Mishra', '1984-01-22', 'Male', '+91-9876543236', 'gaurav.mishra@email.com', 'self', NULL, NULL),
('Swati', 'Rao', '1997-04-03', 'Female', '+91-9876543237', 'swati.rao@email.com', 'self', NULL, 'Penicillin'),
('Harsh', 'Pandey', '1981-06-28', 'Male', '+91-9876543239', 'harsh.pandey@email.com', 'self', 'Cholesterol', NULL),
('Anjali', 'Das', '1990-10-15', 'Female', '+91-9876543240', 'anjali.das@email.com', 'self', NULL, NULL),
('Siddharth', 'Bose', '1973-08-09', 'Male', '+91-9876543241', 'siddharth.bose@email.com', 'self', 'Kidney Disease', 'Contrast dye'),
('Divya', 'Sen', '1996-02-27', 'Female', '+91-9876543242', 'divya.sen@email.com', 'self', NULL, NULL),
('Rajat', 'Khanna', '1987-11-11', 'Male', '+91-9876543243', 'rajat.khanna@email.com', 'self', 'Asthma', NULL),
-- Family members
('Kamini', 'Bansal', '1993-04-18', 'Female', '+91-9876543244', 'kamini.bansal@email.com', 'spouse', NULL, NULL),
('Arush', 'Bansal', '2018-09-05', 'Male', NULL, NULL, 'child', NULL, 'Eggs'),
('Ramesh', 'Saxena', '1958-12-20', 'Male', '+91-9876543245', 'ramesh.saxena@email.com', 'parent', 'Diabetes, Arthritis', NULL),
('Suman', 'Tiwari', '1982-07-14', 'Female', '+91-9876543246', 'suman.tiwari@email.com', 'spouse', 'Anemia', NULL),
('Ishaan', 'Kapoor', '2012-03-30', 'Male', NULL, NULL, 'child', NULL, NULL),
('Geeta', 'Kapoor', '1960-01-08', 'Female', '+91-9876543247', 'geeta.kapoor@email.com', 'parent', 'Osteoporosis', NULL),
('Rakesh', 'Mehta', '1964-05-25', 'Male', '+91-9876543248', 'rakesh.mehta@email.com', 'parent', 'Heart Disease, Diabetes', NULL),
('Sarita', 'Chauhan', '1978-11-17', 'Female', '+91-9876543249', 'sarita.chauhan@email.com', 'spouse', NULL, NULL),
('Kunal', 'Sinha', '1987-02-09', 'Male', '+91-9876543250', 'kunal.sinha@email.com', 'spouse', NULL, NULL),
('Maya', 'Mishra', '1986-08-21', 'Female', '+91-9876543251', 'maya.mishra@email.com', 'spouse', 'Thyroid', NULL),
('Tanvi', 'Pandey', '2015-06-12', 'Female', NULL, NULL, 'child', NULL, NULL),
('Alok', 'Das', '1962-09-30', 'Male', '+91-9876543252', 'alok.das@email.com', 'parent', 'Diabetes', 'Sulfa'),
('Prerna', 'Bose', '1975-04-05', 'Female', '+91-9876543253', 'prerna.bose@email.com', 'spouse', NULL, NULL),
('Yash', 'Khanna', '2010-12-18', 'Male', NULL, NULL, 'child', 'Asthma', NULL),
('Neha', 'Khanna', '1989-07-22', 'Female', '+91-9876543254', 'neha.khanna@email.com', 'spouse', NULL, 'Aspirin');

-- ============================================================================
-- MORE ADDRESSES (Adding 15 more for diversity)
-- ============================================================================

INSERT INTO addresses (address_line1, address_line2, city, state, postal_code, landmark, latitude, longitude, address_type) VALUES
('123, Rajouri Garden', 'Block B', 'New Delhi', 'Delhi', '110027', 'Near Metro Station', 28.6448, 77.1198, 'home'),
('456, MG Road', 'Brigade Road Cross', 'Bangalore', 'Karnataka', '560001', 'Near Garuda Mall', 12.9756, 77.6064, 'office'),
('789, Park Street', 'Near Flurys', 'Kolkata', 'West Bengal', '700016', 'Opposite Quest Mall', 22.5530, 88.3510, 'home'),
('234, Banjara Hills', 'Road No. 12', 'Hyderabad', 'Telangana', '500034', 'Near GVK One Mall', 17.4156, 78.4347, 'home'),
('567, Marine Drive', 'Churchgate', 'Mumbai', 'Maharashtra', '400020', 'Near NCPA', 18.9432, 72.8235, 'home'),
('890, Ashram Road', 'Near Income Tax', 'Ahmedabad', 'Gujarat', '380009', 'Opposite Riverfront', 23.0258, 72.5873, 'office'),
('321, MG Road', 'Camp Area', 'Pune', 'Maharashtra', '411001', 'Near Jehangir Hospital', 18.5163, 73.8768, 'home'),
('654, Hazratganj', 'Mahatma Gandhi Marg', 'Lucknow', 'Uttar Pradesh', '226001', 'Near Sahara Ganj', 26.8514, 80.9460, 'home'),
('987, Camac Street', 'Park Circus', 'Kolkata', 'West Bengal', '700017', 'Near South City Mall', 22.5385, 88.3631, 'office'),
('147, Brigade Road', 'Church Street', 'Bangalore', 'Karnataka', '560025', 'Near UB City', 12.9716, 77.5946, 'home'),
('258, Linking Road', 'Khar West', 'Mumbai', 'Maharashtra', '400052', 'Near Shoppers Stop', 19.0726, 72.8361, 'home'),
('369, Connaught Place', 'Block F', 'New Delhi', 'Delhi', '110001', 'Near PVR Plaza', 28.6315, 77.2167, 'office'),
('741, T Nagar', 'Pondy Bazaar', 'Chennai', 'Tamil Nadu', '600017', 'Near Panagal Park', 13.0418, 80.2341, 'home'),
('852, Electronic City', 'Phase 1', 'Bangalore', 'Karnataka', '560100', 'Near Infosys Campus', 12.8458, 77.6712, 'office'),
('963, Satellite', 'Near Jodhpur Cross', 'Ahmedabad', 'Gujarat', '380015', 'Near Iscon Mega Mall', 23.0276, 72.5070, 'home');

-- ============================================================================
-- MORE USER REFERENCES (Adding 15 more)
-- ============================================================================

INSERT INTO user_references (external_user_id, cached_name, cached_email, cached_phone) VALUES
('USR-016', 'Aditya Bansal', 'aditya.bansal@email.com', '+91-9876543225'),
('USR-017', 'Ritu Saxena', 'ritu.saxena@email.com', '+91-9876543226'),
('USR-018', 'Manish Tiwari', 'manish.tiwari@email.com', '+91-9876543227'),
('USR-019', 'Sakshi Dubey', 'sakshi.dubey@email.com', '+91-9876543228'),
('USR-020', 'Rohan Kapoor', 'rohan.kapoor@email.com', '+91-9876543229'),
('USR-021', 'Nisha Mehta', 'nisha.mehta@email.com', '+91-9876543231'),
('USR-022', 'Vivek Chauhan', 'vivek.chauhan@email.com', '+91-9876543233'),
('USR-023', 'Preeti Sinha', 'preeti.sinha@email.com', '+91-9876543235'),
('USR-024', 'Gaurav Mishra', 'gaurav.mishra@email.com', '+91-9876543236'),
('USR-025', 'Swati Rao', 'swati.rao@email.com', '+91-9876543237'),
('USR-026', 'Harsh Pandey', 'harsh.pandey@email.com', '+91-9876543239'),
('USR-027', 'Anjali Das', 'anjali.das@email.com', '+91-9876543240'),
('USR-028', 'Siddharth Bose', 'siddharth.bose@email.com', '+91-9876543241'),
('USR-029', 'Divya Sen', 'divya.sen@email.com', '+91-9876543242'),
('USR-030', 'Rajat Khanna', 'rajat.khanna@email.com', '+91-9876543243');

-- ============================================================================
-- MORE REQUESTS (Adding 35 more with varied statuses and dates)
-- ============================================================================

INSERT INTO requests (request_number, user_ref_id, address_id, status, total_amount, discount_amount, final_amount, payment_status, payment_reference, notes, submitted_at, completed_at) VALUES
-- Historical completed requests (for trend analysis)
('REQ-2024-00016', 16, 16, 'completed', 1999.00, 100.00, 1899.00, 'paid', 'PAY-016-ABC', 'Basic health checkup', CURRENT_TIMESTAMP - INTERVAL '45 days', CURRENT_TIMESTAMP - INTERVAL '44 days'),
('REQ-2024-00017', 17, 17, 'completed', 2999.00, 200.00, 2799.00, 'paid', 'PAY-017-DEF', 'Vitamin panel', CURRENT_TIMESTAMP - INTERVAL '42 days', CURRENT_TIMESTAMP - INTERVAL '41 days'),
('REQ-2024-00018', 18, 18, 'completed', 1499.00, 0.00, 1499.00, 'paid', 'PAY-018-GHI', 'Diabetic monitoring', CURRENT_TIMESTAMP - INTERVAL '38 days', CURRENT_TIMESTAMP - INTERVAL '37 days'),
('REQ-2024-00019', 19, 19, 'completed', 3499.00, 350.00, 3149.00, 'paid', 'PAY-019-JKL', 'Cardiac checkup', CURRENT_TIMESTAMP - INTERVAL '35 days', CURRENT_TIMESTAMP - INTERVAL '34 days'),
('REQ-2024-00020', 20, 20, 'completed', 5999.00, 500.00, 5499.00, 'paid', 'PAY-020-MNO', 'Senior citizen package', CURRENT_TIMESTAMP - INTERVAL '32 days', CURRENT_TIMESTAMP - INTERVAL '31 days'),
('REQ-2024-00021', 21, 21, 'completed', 1299.00, 0.00, 1299.00, 'paid', 'PAY-021-PQR', 'Thyroid panel', CURRENT_TIMESTAMP - INTERVAL '30 days', CURRENT_TIMESTAMP - INTERVAL '29 days'),
('REQ-2024-00022', 22, 22, 'completed', 2199.00, 100.00, 2099.00, 'paid', 'PAY-022-STU', 'Anemia panel', CURRENT_TIMESTAMP - INTERVAL '28 days', CURRENT_TIMESTAMP - INTERVAL '27 days'),
('REQ-2024-00023', 23, 23, 'completed', 4999.00, 400.00, 4599.00, 'paid', 'PAY-023-VWX', 'Comprehensive checkup', CURRENT_TIMESTAMP - INTERVAL '25 days', CURRENT_TIMESTAMP - INTERVAL '24 days'),
('REQ-2024-00024', 24, 24, 'completed', 1799.00, 0.00, 1799.00, 'paid', 'PAY-024-YZA', 'Immunity panel', CURRENT_TIMESTAMP - INTERVAL '22 days', CURRENT_TIMESTAMP - INTERVAL '21 days'),
('REQ-2024-00025', 25, 25, 'completed', 999.00, 50.00, 949.00, 'paid', 'PAY-025-BCD', 'Liver panel', CURRENT_TIMESTAMP - INTERVAL '20 days', CURRENT_TIMESTAMP - INTERVAL '19 days'),
-- More recent completed
('REQ-2024-00026', 26, 26, 'completed', 1999.00, 150.00, 1849.00, 'paid', 'PAY-026-EFG', 'Basic health', CURRENT_TIMESTAMP - INTERVAL '18 days', CURRENT_TIMESTAMP - INTERVAL '17 days'),
('REQ-2024-00027', 27, 27, 'completed', 2499.00, 0.00, 2499.00, 'paid', 'PAY-027-HIJ', 'Pregnancy panel', CURRENT_TIMESTAMP - INTERVAL '15 days', CURRENT_TIMESTAMP - INTERVAL '14 days'),
('REQ-2024-00028', 28, 28, 'completed', 899.00, 0.00, 899.00, 'paid', 'PAY-028-KLM', 'Kidney panel', CURRENT_TIMESTAMP - INTERVAL '13 days', CURRENT_TIMESTAMP - INTERVAL '12 days'),
('REQ-2024-00029', 29, 29, 'completed', 1499.00, 100.00, 1399.00, 'paid', 'PAY-029-NOP', 'Pre-employment', CURRENT_TIMESTAMP - INTERVAL '11 days', CURRENT_TIMESTAMP - INTERVAL '10 days'),
('REQ-2024-00030', 30, 30, 'completed', 3499.00, 300.00, 3199.00, 'paid', 'PAY-030-QRS', 'Male hormone panel', CURRENT_TIMESTAMP - INTERVAL '9 days', CURRENT_TIMESTAMP - INTERVAL '8 days'),
-- Cancelled requests
('REQ-2024-00031', 16, 16, 'cancelled', 2999.00, 0.00, 2999.00, 'refunded', 'PAY-031-TUV', 'Patient travelling', CURRENT_TIMESTAMP - INTERVAL '15 days', NULL),
('REQ-2024-00032', 20, 20, 'cancelled', 1299.00, 0.00, 1299.00, 'refunded', 'PAY-032-WXY', 'Rescheduled to next month', CURRENT_TIMESTAMP - INTERVAL '8 days', NULL),
-- In progress
('REQ-2024-00033', 17, 17, 'in_progress', 4999.00, 500.00, 4499.00, 'paid', 'PAY-033-ZAB', 'Comprehensive', CURRENT_TIMESTAMP - INTERVAL '2 days', NULL),
('REQ-2024-00034', 21, 21, 'in_progress', 5999.00, 0.00, 5999.00, 'paid', 'PAY-034-CDE', 'Senior citizen', CURRENT_TIMESTAMP - INTERVAL '2 days', NULL),
('REQ-2024-00035', 25, 25, 'in_progress', 1999.00, 200.00, 1799.00, 'paid', 'PAY-035-FGH', 'Basic health', CURRENT_TIMESTAMP - INTERVAL '1 day', NULL),
-- Scheduled
('REQ-2024-00036', 18, 18, 'scheduled', 1499.00, 0.00, 1499.00, 'paid', 'PAY-036-IJK', 'Diabetic panel', CURRENT_TIMESTAMP - INTERVAL '18 hours', NULL),
('REQ-2024-00037', 22, 22, 'scheduled', 2199.00, 100.00, 2099.00, 'paid', 'PAY-037-LMN', 'Female hormone', CURRENT_TIMESTAMP - INTERVAL '12 hours', NULL),
('REQ-2024-00038', 26, 26, 'scheduled', 3499.00, 0.00, 3499.00, 'paid', 'PAY-038-OPQ', 'Cardiac risk', CURRENT_TIMESTAMP - INTERVAL '8 hours', NULL),
-- Processing
('REQ-2024-00039', 19, 19, 'processing', 1999.00, 100.00, 1899.00, 'paid', 'PAY-039-RST', 'Basic health', CURRENT_TIMESTAMP - INTERVAL '4 hours', NULL),
('REQ-2024-00040', 23, 23, 'processing', 2999.00, 150.00, 2849.00, 'paid', 'PAY-040-UVW', 'Vitamin panel', CURRENT_TIMESTAMP - INTERVAL '3 hours', NULL),
-- Submitted
('REQ-2024-00041', 24, 24, 'submitted', 899.00, 0.00, 899.00, 'paid', 'PAY-041-XYZ', 'Kidney panel', CURRENT_TIMESTAMP - INTERVAL '2 hours', NULL),
('REQ-2024-00042', 27, 27, 'submitted', 1299.00, 50.00, 1249.00, 'paid', 'PAY-042-ABC', 'Thyroid panel', CURRENT_TIMESTAMP - INTERVAL '1 hour', NULL),
('REQ-2024-00043', 28, 28, 'submitted', 1799.00, 0.00, 1799.00, 'paid', 'PAY-043-DEF', 'Immunity panel', CURRENT_TIMESTAMP - INTERVAL '45 minutes', NULL),
-- Draft
('REQ-2024-00044', 29, 29, 'draft', 4999.00, 0.00, 4999.00, 'pending', NULL, 'Comprehensive - considering', NULL, NULL),
('REQ-2024-00045', 30, 30, 'draft', 1999.00, 0.00, 1999.00, 'pending', NULL, 'Basic health - draft', NULL, NULL),
-- Family/multi-patient requests
('REQ-2024-00046', 16, 16, 'scheduled', 8500.00, 1000.00, 7500.00, 'paid', 'PAY-046-GHI', 'Family package - 3 members', CURRENT_TIMESTAMP - INTERVAL '6 hours', NULL),
('REQ-2024-00047', 20, 20, 'completed', 12000.00, 1500.00, 10500.00, 'paid', 'PAY-047-JKL', 'Extended family checkup - 4 members', CURRENT_TIMESTAMP - INTERVAL '20 days', CURRENT_TIMESTAMP - INTERVAL '19 days'),
('REQ-2024-00048', 26, 28, 'in_progress', 6000.00, 500.00, 5500.00, 'paid', 'PAY-048-MNO', 'Couple checkup', CURRENT_TIMESTAMP - INTERVAL '1 day', NULL),
-- High value requests
('REQ-2024-00049', 22, 22, 'completed', 15000.00, 2000.00, 13000.00, 'paid', 'PAY-049-PQR', 'Executive health package', CURRENT_TIMESTAMP - INTERVAL '25 days', CURRENT_TIMESTAMP - INTERVAL '24 days'),
('REQ-2024-00050', 28, 28, 'scheduled', 18000.00, 2500.00, 15500.00, 'paid', 'PAY-050-STU', 'Premium comprehensive', CURRENT_TIMESTAMP - INTERVAL '5 hours', NULL);

-- ============================================================================
-- MORE ORDERS (Adding orders for new requests)
-- ============================================================================

INSERT INTO orders (order_number, request_id, patient_id, status, subtotal, completed_at) VALUES
-- Orders for completed requests
('ORD-2024-00020', 16, 21, 'completed', 1999.00, CURRENT_TIMESTAMP - INTERVAL '44 days'),
('ORD-2024-00021', 17, 22, 'completed', 2999.00, CURRENT_TIMESTAMP - INTERVAL '41 days'),
('ORD-2024-00022', 18, 23, 'completed', 1499.00, CURRENT_TIMESTAMP - INTERVAL '37 days'),
('ORD-2024-00023', 19, 24, 'completed', 3499.00, CURRENT_TIMESTAMP - INTERVAL '34 days'),
('ORD-2024-00024', 20, 25, 'completed', 5999.00, CURRENT_TIMESTAMP - INTERVAL '31 days'),
('ORD-2024-00025', 21, 26, 'completed', 1299.00, CURRENT_TIMESTAMP - INTERVAL '29 days'),
('ORD-2024-00026', 22, 27, 'completed', 2199.00, CURRENT_TIMESTAMP - INTERVAL '27 days'),
('ORD-2024-00027', 23, 28, 'completed', 4999.00, CURRENT_TIMESTAMP - INTERVAL '24 days'),
('ORD-2024-00028', 24, 29, 'completed', 1799.00, CURRENT_TIMESTAMP - INTERVAL '21 days'),
('ORD-2024-00029', 25, 30, 'completed', 999.00, CURRENT_TIMESTAMP - INTERVAL '19 days'),
('ORD-2024-00030', 26, 31, 'completed', 1999.00, CURRENT_TIMESTAMP - INTERVAL '17 days'),
('ORD-2024-00031', 27, 32, 'completed', 2499.00, CURRENT_TIMESTAMP - INTERVAL '14 days'),
('ORD-2024-00032', 28, 33, 'completed', 899.00, CURRENT_TIMESTAMP - INTERVAL '12 days'),
('ORD-2024-00033', 29, 34, 'completed', 1499.00, CURRENT_TIMESTAMP - INTERVAL '10 days'),
('ORD-2024-00034', 30, 35, 'completed', 3499.00, CURRENT_TIMESTAMP - INTERVAL '8 days'),
-- Cancelled
('ORD-2024-00035', 31, 21, 'cancelled', 2999.00, NULL),
('ORD-2024-00036', 32, 25, 'cancelled', 1299.00, NULL),
-- In progress
('ORD-2024-00037', 33, 22, 'created', 4999.00, NULL),
('ORD-2024-00038', 34, 26, 'created', 5999.00, NULL),
('ORD-2024-00039', 35, 30, 'created', 1999.00, NULL),
-- Scheduled
('ORD-2024-00040', 36, 23, 'created', 1499.00, NULL),
('ORD-2024-00041', 37, 27, 'created', 2199.00, NULL),
('ORD-2024-00042', 38, 31, 'created', 3499.00, NULL),
-- Processing
('ORD-2024-00043', 39, 24, 'created', 1999.00, NULL),
('ORD-2024-00044', 40, 28, 'created', 2999.00, NULL),
-- Submitted
('ORD-2024-00045', 41, 29, 'created', 899.00, NULL),
('ORD-2024-00046', 42, 32, 'created', 1299.00, NULL),
('ORD-2024-00047', 43, 33, 'created', 1799.00, NULL),
-- Draft
('ORD-2024-00048', 44, 34, 'created', 4999.00, NULL),
('ORD-2024-00049', 45, 35, 'created', 1999.00, NULL),
-- Family orders (multiple patients per request)
('ORD-2024-00050', 46, 21, 'created', 2500.00, NULL),
('ORD-2024-00051', 46, 36, 'created', 2500.00, NULL),
('ORD-2024-00052', 46, 37, 'created', 3500.00, NULL),
('ORD-2024-00053', 47, 25, 'completed', 3000.00, CURRENT_TIMESTAMP - INTERVAL '19 days'),
('ORD-2024-00054', 47, 40, 'completed', 3000.00, CURRENT_TIMESTAMP - INTERVAL '19 days'),
('ORD-2024-00055', 47, 41, 'completed', 3000.00, CURRENT_TIMESTAMP - INTERVAL '19 days'),
('ORD-2024-00056', 47, 42, 'completed', 3000.00, CURRENT_TIMESTAMP - INTERVAL '19 days'),
-- Couple checkup
('ORD-2024-00057', 48, 31, 'created', 3000.00, NULL),
('ORD-2024-00058', 48, 43, 'created', 3000.00, NULL),
-- High value orders
('ORD-2024-00059', 49, 27, 'completed', 15000.00, CURRENT_TIMESTAMP - INTERVAL '24 days'),
('ORD-2024-00060', 50, 33, 'created', 18000.00, NULL);

-- ============================================================================
-- MORE ORDER ITEMS (Adding items for new orders)
-- ============================================================================

-- Basic Health packages
INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 20, 'package', id, 1999.00, 1999.00 FROM test_packages WHERE code = 'BASIC_HEALTH';

INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 21, 'package', id, 2999.00, 2999.00 FROM test_packages WHERE code = 'VITAMIN_PANEL';

INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 22, 'package', id, 1499.00, 1499.00 FROM test_packages WHERE code = 'DIABETIC_PANEL';

INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 23, 'package', id, 3499.00, 3499.00 FROM test_packages WHERE code = 'CARDIAC_RISK';

INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 24, 'package', id, 5999.00, 5999.00 FROM test_packages WHERE code = 'SENIOR_CITIZEN';

INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 25, 'package', id, 1299.00, 1299.00 FROM test_packages WHERE code = 'THYROID_COMPLETE';

INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 26, 'package', id, 2199.00, 2199.00 FROM test_packages WHERE code = 'ANEMIA_PANEL';

INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 27, 'package', id, 4999.00, 4999.00 FROM test_packages WHERE code = 'COMPREHENSIVE';

INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 28, 'package', id, 1799.00, 1799.00 FROM test_packages WHERE code = 'IMMUNITY_PANEL';

INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 29, 'package', id, 999.00, 999.00 FROM test_packages WHERE code = 'LIVER_COMPLETE';

INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 30, 'package', id, 1999.00, 1999.00 FROM test_packages WHERE code = 'BASIC_HEALTH';

INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 31, 'package', id, 2499.00, 2499.00 FROM test_packages WHERE code = 'PREGNANCY_PANEL';

INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 32, 'package', id, 899.00, 899.00 FROM test_packages WHERE code = 'KIDNEY_COMPLETE';

INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 33, 'package', id, 1499.00, 1499.00 FROM test_packages WHERE code = 'PRE_EMPLOYMENT';

INSERT INTO order_items (order_id, item_type, package_id, unit_price, total_price)
SELECT 34, 'package', id, 1999.00, 1999.00 FROM test_packages WHERE code = 'HORMONE_MALE';

-- Add individual tests to some orders for variety
INSERT INTO order_items (order_id, item_type, blood_test_id, unit_price, total_price)
SELECT 34, 'blood_test', id, price, price FROM blood_tests WHERE code = 'TESTOSTERONE';

INSERT INTO order_items (order_id, item_type, blood_test_id, unit_price, total_price)
SELECT 34, 'blood_test', id, price, price FROM blood_tests WHERE code = 'CORTISOL';

-- ============================================================================
-- MORE COLLECTION SLOTS (Adding for new requests)
-- ============================================================================

INSERT INTO collection_slots (slot_number, request_id, logistics_slot_ref_id, status, scheduled_date, scheduled_time_start, scheduled_time_end, fasting_required, special_instructions, actual_arrival_time, collection_start_time, collection_end_time) VALUES
-- Historical completed
('SLT-2024-00014', 16, 16, 'completed', CURRENT_DATE - 44, '07:00', '09:00', TRUE, NULL, CURRENT_TIMESTAMP - INTERVAL '44 days' + INTERVAL '7 hours', CURRENT_TIMESTAMP - INTERVAL '44 days' + INTERVAL '7 hours 10 minutes', CURRENT_TIMESTAMP - INTERVAL '44 days' + INTERVAL '7 hours 40 minutes'),
('SLT-2024-00015', 17, 17, 'completed', CURRENT_DATE - 41, '09:00', '11:00', FALSE, NULL, CURRENT_TIMESTAMP - INTERVAL '41 days' + INTERVAL '9 hours', CURRENT_TIMESTAMP - INTERVAL '41 days' + INTERVAL '9 hours 15 minutes', CURRENT_TIMESTAMP - INTERVAL '41 days' + INTERVAL '9 hours 45 minutes'),
('SLT-2024-00016', 18, 18, 'completed', CURRENT_DATE - 37, '11:00', '13:00', TRUE, 'Diabetic patient', CURRENT_TIMESTAMP - INTERVAL '37 days' + INTERVAL '11 hours', CURRENT_TIMESTAMP - INTERVAL '37 days' + INTERVAL '11 hours 20 minutes', CURRENT_TIMESTAMP - INTERVAL '37 days' + INTERVAL '11 hours 50 minutes'),
('SLT-2024-00017', 19, 19, 'completed', CURRENT_DATE - 34, '14:00', '16:00', TRUE, 'Cardiac patient', CURRENT_TIMESTAMP - INTERVAL '34 days' + INTERVAL '14 hours', CURRENT_TIMESTAMP - INTERVAL '34 days' + INTERVAL '14 hours 10 minutes', CURRENT_TIMESTAMP - INTERVAL '34 days' + INTERVAL '15 hours'),
('SLT-2024-00018', 20, 20, 'completed', CURRENT_DATE - 31, '07:00', '09:00', TRUE, 'Senior citizen', CURRENT_TIMESTAMP - INTERVAL '31 days' + INTERVAL '7 hours', CURRENT_TIMESTAMP - INTERVAL '31 days' + INTERVAL '7 hours 30 minutes', CURRENT_TIMESTAMP - INTERVAL '31 days' + INTERVAL '8 hours 30 minutes'),
-- Current/upcoming
('SLT-2024-00019', 33, 1, 'in_transit', CURRENT_DATE, '07:00', '09:00', TRUE, NULL, NULL, NULL, NULL),
('SLT-2024-00020', 34, 2, 'arrived', CURRENT_DATE, '09:00', '11:00', TRUE, 'Senior couple', CURRENT_TIMESTAMP, NULL, NULL),
('SLT-2024-00021', 36, 6, 'scheduled', CURRENT_DATE + 1, '07:00', '09:00', TRUE, NULL, NULL, NULL, NULL),
('SLT-2024-00022', 37, 7, 'scheduled', CURRENT_DATE + 1, '09:00', '11:00', FALSE, NULL, NULL, NULL, NULL),
('SLT-2024-00023', 38, 8, 'scheduled', CURRENT_DATE + 1, '11:00', '13:00', TRUE, 'Cardiac patient', NULL, NULL, NULL),
('SLT-2024-00024', 46, 9, 'scheduled', CURRENT_DATE + 1, '14:00', '16:00', TRUE, 'Family of 3', NULL, NULL, NULL),
('SLT-2024-00025', 50, 10, 'scheduled', CURRENT_DATE + 2, '07:00', '09:00', TRUE, 'Premium package', NULL, NULL, NULL);

-- ============================================================================
-- MORE STATUS HISTORY (for analytics)
-- ============================================================================

INSERT INTO request_status_history (request_id, old_status, new_status, changed_by, change_reason, created_at) VALUES
-- Request 16 history
(16, NULL, 'draft', 'system', 'Request created', CURRENT_TIMESTAMP - INTERVAL '46 days'),
(16, 'draft', 'submitted', 'user', 'User submitted', CURRENT_TIMESTAMP - INTERVAL '45 days 23 hours'),
(16, 'submitted', 'processing', 'system', 'Payment confirmed', CURRENT_TIMESTAMP - INTERVAL '45 days 22 hours'),
(16, 'processing', 'scheduled', 'system', 'Slot assigned', CURRENT_TIMESTAMP - INTERVAL '45 days 12 hours'),
(16, 'scheduled', 'in_progress', 'system', 'Collection started', CURRENT_TIMESTAMP - INTERVAL '44 days 2 hours'),
(16, 'in_progress', 'completed', 'phlebotomist', 'Collection completed', CURRENT_TIMESTAMP - INTERVAL '44 days'),
-- Request 31 (cancelled)
(31, NULL, 'draft', 'system', 'Request created', CURRENT_TIMESTAMP - INTERVAL '16 days'),
(31, 'draft', 'submitted', 'user', 'User submitted', CURRENT_TIMESTAMP - INTERVAL '15 days 20 hours'),
(31, 'submitted', 'cancelled', 'user', 'Patient travelling - cancelled', CURRENT_TIMESTAMP - INTERVAL '15 days'),
-- Request 33 (in progress)
(33, NULL, 'draft', 'system', 'Request created', CURRENT_TIMESTAMP - INTERVAL '3 days'),
(33, 'draft', 'submitted', 'user', 'User submitted', CURRENT_TIMESTAMP - INTERVAL '2 days 22 hours'),
(33, 'submitted', 'processing', 'system', 'Payment confirmed', CURRENT_TIMESTAMP - INTERVAL '2 days 20 hours'),
(33, 'processing', 'scheduled', 'system', 'Slot assigned', CURRENT_TIMESTAMP - INTERVAL '2 days 12 hours'),
(33, 'scheduled', 'in_progress', 'system', 'Collection started', CURRENT_TIMESTAMP - INTERVAL '2 days');

-- ============================================================================
-- End of Expanded Seed Data
-- Additional records created:
-- - Patients: 30
-- - Addresses: 15
-- - User References: 15
-- - Requests: 35
-- - Orders: 40+
-- - Order Items: 20+
-- - Collection Slots: 12
-- - Status History: 15+
-- ============================================================================
