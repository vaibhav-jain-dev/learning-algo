# Storage

## Introduction

Storage is one of the most critical components in system design. The way data is stored, organized, and accessed directly impacts system performance, scalability, reliability, and cost. Understanding different storage types, database paradigms, and data modeling strategies is essential for designing robust systems.

---

## Storage Hierarchy

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #0f3460;">
<h3 style="color: #e94560; margin-top: 0; font-size: 1.3em;">Memory & Storage Pyramid</h3>
<div style="display: grid; gap: 8px; font-family: monospace; font-size: 0.85em;">
<div style="background: linear-gradient(90deg, #ff6b6b, #ee5a5a); color: white; padding: 10px 20px; border-radius: 6px; text-align: center; width: 30%; margin: 0 auto;">
<strong>CPU Registers</strong><br>
<span style="font-size: 0.8em;">~1ns | KB | $$$$</span>
</div>
<div style="background: linear-gradient(90deg, #ffa502, #ff7f50); color: white; padding: 10px 20px; border-radius: 6px; text-align: center; width: 45%; margin: 0 auto;">
<strong>L1/L2/L3 Cache</strong><br>
<span style="font-size: 0.8em;">1-10ns | MB | $$$</span>
</div>
<div style="background: linear-gradient(90deg, #7bed9f, #2ed573); color: #1a1a2e; padding: 10px 20px; border-radius: 6px; text-align: center; width: 60%; margin: 0 auto;">
<strong>RAM (Memory)</strong><br>
<span style="font-size: 0.8em;">~100ns | GB | $$</span>
</div>
<div style="background: linear-gradient(90deg, #70a1ff, #5352ed); color: white; padding: 10px 20px; border-radius: 6px; text-align: center; width: 75%; margin: 0 auto;">
<strong>SSD (Solid State Drive)</strong><br>
<span style="font-size: 0.8em;">~100μs | TB | $</span>
</div>
<div style="background: linear-gradient(90deg, #a29bfe, #6c5ce7); color: white; padding: 10px 20px; border-radius: 6px; text-align: center; width: 90%; margin: 0 auto;">
<strong>HDD (Hard Disk Drive)</strong><br>
<span style="font-size: 0.8em;">~10ms | TB | $</span>
</div>
<div style="background: linear-gradient(90deg, #636e72, #2d3436); color: white; padding: 10px 20px; border-radius: 6px; text-align: center; width: 100%; margin: 0 auto;">
<strong>Network Storage / Cloud</strong><br>
<span style="font-size: 0.8em;">10-100ms | PB | Variable</span>
</div>
</div>
<p style="color: #a0a0a0; font-size: 0.85em; margin-top: 15px; text-align: center;">↑ Faster, Smaller, More Expensive | ↓ Slower, Larger, Cheaper</p>
</div>

### Key Latency Numbers Every Developer Should Know

| Operation | Latency |
|-----------|---------|
| L1 cache reference | 0.5 ns |
| L2 cache reference | 7 ns |
| Main memory reference | 100 ns |
| SSD random read | 150 μs |
| HDD seek | 10 ms |
| Network round trip (same datacenter) | 0.5 ms |
| Network round trip (cross-continent) | 150 ms |

---

## Types of Storage Systems

### 1. Block Storage

Block storage divides data into fixed-size blocks and stores them with unique identifiers.

<div style="background: linear-gradient(135deg, #2d3436 0%, #000000 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #636e72;">
<h4 style="color: #74b9ff; margin-top: 0;">Block Storage Architecture</h4>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; font-family: monospace; font-size: 0.8em;">
<div style="background: #0984e3; color: white; padding: 15px; border-radius: 6px; text-align: center;">
Block 001<br>
<span style="font-size: 0.8em;">4KB</span>
</div>
<div style="background: #0984e3; color: white; padding: 15px; border-radius: 6px; text-align: center;">
Block 002<br>
<span style="font-size: 0.8em;">4KB</span>
</div>
<div style="background: #0984e3; color: white; padding: 15px; border-radius: 6px; text-align: center;">
Block 003<br>
<span style="font-size: 0.8em;">4KB</span>
</div>
<div style="background: #0984e3; color: white; padding: 15px; border-radius: 6px; text-align: center;">
Block 004<br>
<span style="font-size: 0.8em;">4KB</span>
</div>
</div>
<p style="color: #b2bec3; font-size: 0.85em; margin-top: 15px;">
<strong>Use Cases:</strong> Databases, VMs, High-performance applications<br>
<strong>Examples:</strong> AWS EBS, Azure Managed Disks, SAN
</p>
</div>

**Characteristics:**
- Low latency, high IOPS
- No metadata or file system overhead
- Requires a file system on top
- Excellent for databases and VMs

### 2. File Storage

File storage organizes data in a hierarchical structure of files and folders.

<div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #3498db;">
<h4 style="color: #f39c12; margin-top: 0;">File System Hierarchy</h4>
<pre style="color: #ecf0f1; font-size: 0.85em; margin: 0; line-height: 1.6;">
/root
├── /home
│   ├── /user1
│   │   ├── documents/
│   │   └── pictures/
│   └── /user2
│       └── projects/
├── /var
│   └── /logs
│       └── app.log
└── /etc
    └── config.yaml
</pre>
<p style="color: #bdc3c7; font-size: 0.85em; margin-top: 15px;">
<strong>Use Cases:</strong> Shared storage, content management, home directories<br>
<strong>Examples:</strong> AWS EFS, Azure Files, NFS, CIFS/SMB
</p>
</div>

**Characteristics:**
- Human-readable path structure
- Built-in metadata (permissions, timestamps)
- Easy sharing via network protocols
- Good for unstructured data

### 3. Object Storage

Object storage manages data as objects with metadata and unique identifiers.

<div style="background: linear-gradient(135deg, #134e5e 0%, #71b280 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #27ae60;">
<h4 style="color: #f1c40f; margin-top: 0;">Object Storage Structure</h4>
<div style="display: grid; gap: 15px; font-family: monospace; font-size: 0.85em;">
<div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #f1c40f;">
<strong style="color: #f1c40f;">Object: user-profile-12345.jpg</strong><br>
<span style="color: #ecf0f1;">Data: [Binary image data...]</span><br>
<span style="color: #95a5a6;">Metadata: {content-type: image/jpeg, size: 2.4MB, created: 2024-01-15}</span><br>
<span style="color: #3498db;">Key: s3://bucket/users/profiles/user-profile-12345.jpg</span>
</div>
<div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #e74c3c;">
<strong style="color: #e74c3c;">Object: backup-2024-01-15.tar.gz</strong><br>
<span style="color: #ecf0f1;">Data: [Compressed backup data...]</span><br>
<span style="color: #95a5a6;">Metadata: {content-type: application/gzip, size: 50GB, encrypted: true}</span><br>
<span style="color: #3498db;">Key: s3://bucket/backups/daily/backup-2024-01-15.tar.gz</span>
</div>
</div>
<p style="color: #bdc3c7; font-size: 0.85em; margin-top: 15px;">
<strong>Use Cases:</strong> Static assets, backups, data lakes, media storage<br>
<strong>Examples:</strong> AWS S3, Azure Blob, Google Cloud Storage, MinIO
</p>
</div>

**Characteristics:**
- Virtually unlimited scalability
- Rich metadata support
- HTTP/REST API access
- Eventual consistency (often)
- Cost-effective for large data

---

## Database Types

### Relational Databases (SQL)

<div style="background: linear-gradient(135deg, #0c2461 0%, #1e3799 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #3867d6;">
<h4 style="color: #fed330; margin-top: 0;">Relational Database Model</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div>
<h5 style="color: #45aaf2; margin-bottom: 10px;">Users Table</h5>
<table style="width: 100%; border-collapse: collapse; font-size: 0.8em;">
<tr style="background: #3867d6;">
<th style="padding: 8px; color: white; border: 1px solid #4a69bd;">id</th>
<th style="padding: 8px; color: white; border: 1px solid #4a69bd;">name</th>
<th style="padding: 8px; color: white; border: 1px solid #4a69bd;">email</th>
</tr>
<tr style="background: rgba(255,255,255,0.1);">
<td style="padding: 8px; color: #ecf0f1; border: 1px solid #4a69bd;">1</td>
<td style="padding: 8px; color: #ecf0f1; border: 1px solid #4a69bd;">Alice</td>
<td style="padding: 8px; color: #ecf0f1; border: 1px solid #4a69bd;">alice@ex.com</td>
</tr>
<tr style="background: rgba(255,255,255,0.05);">
<td style="padding: 8px; color: #ecf0f1; border: 1px solid #4a69bd;">2</td>
<td style="padding: 8px; color: #ecf0f1; border: 1px solid #4a69bd;">Bob</td>
<td style="padding: 8px; color: #ecf0f1; border: 1px solid #4a69bd;">bob@ex.com</td>
</tr>
</table>
</div>
<div>
<h5 style="color: #45aaf2; margin-bottom: 10px;">Orders Table</h5>
<table style="width: 100%; border-collapse: collapse; font-size: 0.8em;">
<tr style="background: #3867d6;">
<th style="padding: 8px; color: white; border: 1px solid #4a69bd;">id</th>
<th style="padding: 8px; color: white; border: 1px solid #4a69bd;">user_id</th>
<th style="padding: 8px; color: white; border: 1px solid #4a69bd;">total</th>
</tr>
<tr style="background: rgba(255,255,255,0.1);">
<td style="padding: 8px; color: #ecf0f1; border: 1px solid #4a69bd;">101</td>
<td style="padding: 8px; color: #ecf0f1; border: 1px solid #4a69bd;">1</td>
<td style="padding: 8px; color: #ecf0f1; border: 1px solid #4a69bd;">$150</td>
</tr>
<tr style="background: rgba(255,255,255,0.05);">
<td style="padding: 8px; color: #ecf0f1; border: 1px solid #4a69bd;">102</td>
<td style="padding: 8px; color: #ecf0f1; border: 1px solid #4a69bd;">1</td>
<td style="padding: 8px; color: #ecf0f1; border: 1px solid #4a69bd;">$75</td>
</tr>
</table>
</div>
</div>
<p style="color: #a0a0a0; font-size: 0.85em; margin-top: 15px; text-align: center;">
Foreign Key Relationship: Orders.user_id → Users.id
</p>
</div>

**ACID Properties:**
- **Atomicity**: All or nothing transactions
- **Consistency**: Data always in valid state
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed data survives failures

**Examples:** PostgreSQL, MySQL, Oracle, SQL Server

**Best For:**
- Complex queries and joins
- Transactions requiring ACID
- Structured, predictable data
- Financial systems, ERP, CRM

### NoSQL Databases

#### Document Databases

<div style="background: linear-gradient(135deg, #2d3436 0%, #636e72 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #b2bec3;">
<h4 style="color: #00b894; margin-top: 0;">Document Store (MongoDB-style)</h4>
<pre style="color: #dfe6e9; font-size: 0.85em; margin: 0; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "profile": {
    "age": 28,
    "city": "San Francisco",
    "interests": ["coding", "hiking", "photography"]
  },
  "orders": [
    {"id": 101, "total": 150, "items": ["laptop_stand", "mouse"]},
    {"id": 102, "total": 75, "items": ["keyboard"]}
  ]
}
</pre>
<p style="color: #b2bec3; font-size: 0.85em; margin-top: 15px;">
<strong>Examples:</strong> MongoDB, CouchDB, Amazon DocumentDB
</p>
</div>

**Best For:**
- Flexible, evolving schemas
- Content management systems
- Catalogs and user profiles
- Real-time analytics

#### Key-Value Stores

<div style="background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e74c3c;">
<h4 style="color: #f1c40f; margin-top: 0;">Key-Value Store (Redis-style)</h4>
<div style="display: grid; gap: 10px; font-family: monospace; font-size: 0.85em;">
<div style="display: flex; background: rgba(0,0,0,0.2); border-radius: 6px; overflow: hidden;">
<span style="background: #f1c40f; color: #2d3436; padding: 10px 15px; min-width: 180px;">session:user:12345</span>
<span style="color: white; padding: 10px 15px;">{"userId": 12345, "token": "abc...", "expiry": 3600}</span>
</div>
<div style="display: flex; background: rgba(0,0,0,0.2); border-radius: 6px; overflow: hidden;">
<span style="background: #f1c40f; color: #2d3436; padding: 10px 15px; min-width: 180px;">cache:product:789</span>
<span style="color: white; padding: 10px 15px;">{"name": "Laptop", "price": 999, "stock": 50}</span>
</div>
<div style="display: flex; background: rgba(0,0,0,0.2); border-radius: 6px; overflow: hidden;">
<span style="background: #f1c40f; color: #2d3436; padding: 10px 15px; min-width: 180px;">rate:api:client:42</span>
<span style="color: white; padding: 10px 15px;">150</span>
</div>
</div>
<p style="color: #fadbd8; font-size: 0.85em; margin-top: 15px;">
<strong>Examples:</strong> Redis, Memcached, Amazon DynamoDB, etcd
</p>
</div>

**Best For:**
- Caching
- Session management
- Real-time leaderboards
- Rate limiting
- Pub/Sub messaging

#### Column-Family Databases

<div style="background: linear-gradient(135deg, #5b2c6f 0%, #8e44ad 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #9b59b6;">
<h4 style="color: #f5b041; margin-top: 0;">Wide-Column Store (Cassandra-style)</h4>
<table style="width: 100%; border-collapse: collapse; font-size: 0.8em; margin-top: 10px;">
<tr>
<th style="padding: 10px; background: #6c3483; color: white; border: 1px solid #8e44ad;">Row Key</th>
<th style="padding: 10px; background: #6c3483; color: white; border: 1px solid #8e44ad;">Column Family: Profile</th>
<th style="padding: 10px; background: #6c3483; color: white; border: 1px solid #8e44ad;">Column Family: Activity</th>
</tr>
<tr>
<td style="padding: 10px; background: rgba(255,255,255,0.1); color: #f5b041; border: 1px solid #8e44ad;">user:1001</td>
<td style="padding: 10px; background: rgba(255,255,255,0.1); color: #ecf0f1; border: 1px solid #8e44ad;">name: Alice<br>email: alice@ex.com</td>
<td style="padding: 10px; background: rgba(255,255,255,0.1); color: #ecf0f1; border: 1px solid #8e44ad;">last_login: 2024-01-15<br>actions: 1547</td>
</tr>
<tr>
<td style="padding: 10px; background: rgba(255,255,255,0.05); color: #f5b041; border: 1px solid #8e44ad;">user:1002</td>
<td style="padding: 10px; background: rgba(255,255,255,0.05); color: #ecf0f1; border: 1px solid #8e44ad;">name: Bob<br>city: NYC</td>
<td style="padding: 10px; background: rgba(255,255,255,0.05); color: #ecf0f1; border: 1px solid #8e44ad;">last_login: 2024-01-14</td>
</tr>
</table>
<p style="color: #d7bde2; font-size: 0.85em; margin-top: 15px;">
<strong>Examples:</strong> Apache Cassandra, HBase, ScyllaDB
</p>
</div>

**Best For:**
- Time-series data
- IoT sensor data
- Write-heavy workloads
- High availability requirements

#### Graph Databases

<div style="background: linear-gradient(135deg, #1a5276 0%, #2e86ab 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #3498db;">
<h4 style="color: #f39c12; margin-top: 0;">Graph Database Model</h4>
<div style="display: flex; justify-content: center; align-items: center; gap: 20px; flex-wrap: wrap; padding: 20px;">
<div style="background: #e74c3c; color: white; padding: 15px 20px; border-radius: 50%; text-align: center; min-width: 70px;">
<strong>Alice</strong><br>
<span style="font-size: 0.7em;">User</span>
</div>
<div style="display: flex; flex-direction: column; align-items: center;">
<span style="color: #f1c40f; font-size: 0.8em;">FRIENDS_WITH</span>
<span style="color: #f1c40f;">→→→→→→</span>
</div>
<div style="background: #27ae60; color: white; padding: 15px 20px; border-radius: 50%; text-align: center; min-width: 70px;">
<strong>Bob</strong><br>
<span style="font-size: 0.7em;">User</span>
</div>
<div style="display: flex; flex-direction: column; align-items: center;">
<span style="color: #3498db; font-size: 0.8em;">WORKS_AT</span>
<span style="color: #3498db;">→→→→→→</span>
</div>
<div style="background: #9b59b6; color: white; padding: 15px 20px; border-radius: 8px; text-align: center; min-width: 70px;">
<strong>TechCo</strong><br>
<span style="font-size: 0.7em;">Company</span>
</div>
</div>
<p style="color: #aed6f1; font-size: 0.85em; text-align: center;">
<strong>Examples:</strong> Neo4j, Amazon Neptune, JanusGraph
</p>
</div>

**Best For:**
- Social networks
- Recommendation engines
- Fraud detection
- Knowledge graphs

---

## Database Comparison

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #0f3460;">
<h4 style="color: #e94560; margin-top: 0;">When to Use Which Database?</h4>
<table style="width: 100%; border-collapse: collapse; font-size: 0.85em;">
<tr style="background: #0f3460;">
<th style="padding: 12px; color: #e94560; text-align: left; border-bottom: 2px solid #e94560;">Use Case</th>
<th style="padding: 12px; color: #e94560; text-align: left; border-bottom: 2px solid #e94560;">Recommended DB</th>
<th style="padding: 12px; color: #e94560; text-align: left; border-bottom: 2px solid #e94560;">Why</th>
</tr>
<tr style="border-bottom: 1px solid #0f3460;">
<td style="padding: 12px; color: #a0a0a0;">E-commerce transactions</td>
<td style="padding: 12px; color: #4fc3f7;">PostgreSQL/MySQL</td>
<td style="padding: 12px; color: #a0a0a0;">ACID compliance, complex joins</td>
</tr>
<tr style="border-bottom: 1px solid #0f3460;">
<td style="padding: 12px; color: #a0a0a0;">User sessions/caching</td>
<td style="padding: 12px; color: #4fc3f7;">Redis</td>
<td style="padding: 12px; color: #a0a0a0;">Sub-ms latency, in-memory</td>
</tr>
<tr style="border-bottom: 1px solid #0f3460;">
<td style="padding: 12px; color: #a0a0a0;">Product catalog</td>
<td style="padding: 12px; color: #4fc3f7;">MongoDB</td>
<td style="padding: 12px; color: #a0a0a0;">Flexible schema, nested data</td>
</tr>
<tr style="border-bottom: 1px solid #0f3460;">
<td style="padding: 12px; color: #a0a0a0;">IoT time-series</td>
<td style="padding: 12px; color: #4fc3f7;">Cassandra/TimescaleDB</td>
<td style="padding: 12px; color: #a0a0a0;">Write-optimized, partitioning</td>
</tr>
<tr style="border-bottom: 1px solid #0f3460;">
<td style="padding: 12px; color: #a0a0a0;">Social connections</td>
<td style="padding: 12px; color: #4fc3f7;">Neo4j</td>
<td style="padding: 12px; color: #a0a0a0;">Efficient graph traversal</td>
</tr>
<tr>
<td style="padding: 12px; color: #a0a0a0;">Full-text search</td>
<td style="padding: 12px; color: #4fc3f7;">Elasticsearch</td>
<td style="padding: 12px; color: #a0a0a0;">Inverted index, fuzzy matching</td>
</tr>
</table>
</div>

---

## Replication Strategies

### Single-Leader (Master-Slave)

<div style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #7f8c8d;">
<h4 style="color: #1abc9c; margin-top: 0;">Single-Leader Replication</h4>
<div style="display: flex; justify-content: center; align-items: center; gap: 30px; flex-wrap: wrap;">
<div style="text-align: center;">
<div style="background: #e74c3c; color: white; padding: 20px; border-radius: 8px; min-width: 100px;">
<strong>Leader</strong><br>
<span style="font-size: 0.8em;">(Read/Write)</span>
</div>
</div>
<div style="display: flex; flex-direction: column; gap: 10px;">
<span style="color: #3498db;">──→ Async Replication ──→</span>
<span style="color: #3498db;">──→ Async Replication ──→</span>
</div>
<div style="display: flex; flex-direction: column; gap: 10px;">
<div style="background: #3498db; color: white; padding: 15px; border-radius: 8px; text-align: center;">
<strong>Follower 1</strong><br>
<span style="font-size: 0.8em;">(Read Only)</span>
</div>
<div style="background: #3498db; color: white; padding: 15px; border-radius: 8px; text-align: center;">
<strong>Follower 2</strong><br>
<span style="font-size: 0.8em;">(Read Only)</span>
</div>
</div>
</div>
<p style="color: #95a5a6; font-size: 0.85em; margin-top: 15px; text-align: center;">
<strong>Pros:</strong> Simple, no write conflicts | <strong>Cons:</strong> Single point of failure for writes
</p>
</div>

### Multi-Leader

<div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #3498db;">
<h4 style="color: #f39c12; margin-top: 0;">Multi-Leader Replication</h4>
<div style="display: flex; justify-content: center; align-items: center; gap: 40px; flex-wrap: wrap;">
<div style="text-align: center;">
<div style="background: #e74c3c; color: white; padding: 15px; border-radius: 8px;">
<strong>Leader A</strong><br>
<span style="font-size: 0.8em;">US-East</span>
</div>
</div>
<div style="color: #f1c40f; font-size: 1.5em;">⟷</div>
<div style="text-align: center;">
<div style="background: #e74c3c; color: white; padding: 15px; border-radius: 8px;">
<strong>Leader B</strong><br>
<span style="font-size: 0.8em;">EU-West</span>
</div>
</div>
<div style="color: #f1c40f; font-size: 1.5em;">⟷</div>
<div style="text-align: center;">
<div style="background: #e74c3c; color: white; padding: 15px; border-radius: 8px;">
<strong>Leader C</strong><br>
<span style="font-size: 0.8em;">AP-Tokyo</span>
</div>
</div>
</div>
<p style="color: #aed6f1; font-size: 0.85em; margin-top: 15px; text-align: center;">
<strong>Pros:</strong> Geographic distribution, write availability | <strong>Cons:</strong> Conflict resolution complexity
</p>
</div>

### Leaderless (Peer-to-Peer)

<div style="background: linear-gradient(135deg, #0a3d62 0%, #1e5f74 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #3c6382;">
<h4 style="color: #f8c291; margin-top: 0;">Leaderless Replication (Dynamo-style)</h4>
<div style="display: flex; justify-content: center; align-items: center; gap: 20px; flex-wrap: wrap; padding: 20px;">
<div style="background: #78e08f; color: #1e272e; padding: 15px; border-radius: 50%; text-align: center; min-width: 80px;">
<strong>Node 1</strong>
</div>
<div style="background: #78e08f; color: #1e272e; padding: 15px; border-radius: 50%; text-align: center; min-width: 80px;">
<strong>Node 2</strong>
</div>
<div style="background: #78e08f; color: #1e272e; padding: 15px; border-radius: 50%; text-align: center; min-width: 80px;">
<strong>Node 3</strong>
</div>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px; margin-top: 10px;">
<p style="color: #f8c291; margin: 0; font-size: 0.9em;"><strong>Quorum Formula: W + R > N</strong></p>
<p style="color: #a0a0a0; margin: 5px 0 0 0; font-size: 0.85em;">
W=2, R=2, N=3 → Write to 2 nodes, Read from 2 nodes, guarantees consistency
</p>
</div>
</div>

---

## Partitioning (Sharding)

### Horizontal Partitioning

<div style="background: linear-gradient(135deg, #355c7d 0%, #6c5b7b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #c06c84;">
<h4 style="color: #f8b500; margin-top: 0;">Sharding Strategies</h4>
<div style="display: grid; gap: 15px;">
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
<h5 style="color: #f67280; margin: 0 0 10px 0;">Range-Based Sharding</h5>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 0.85em;">
<div style="background: #e74c3c; color: white; padding: 10px; border-radius: 4px; text-align: center;">
Shard 1<br>
<span style="font-size: 0.8em;">Users A-H</span>
</div>
<div style="background: #f39c12; color: white; padding: 10px; border-radius: 4px; text-align: center;">
Shard 2<br>
<span style="font-size: 0.8em;">Users I-P</span>
</div>
<div style="background: #27ae60; color: white; padding: 10px; border-radius: 4px; text-align: center;">
Shard 3<br>
<span style="font-size: 0.8em;">Users Q-Z</span>
</div>
</div>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
<h5 style="color: #f67280; margin: 0 0 10px 0;">Hash-Based Sharding</h5>
<div style="color: #ecf0f1; font-family: monospace; font-size: 0.85em;">
shard_id = hash(user_id) % num_shards
</div>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
<h5 style="color: #f67280; margin: 0 0 10px 0;">Directory-Based Sharding</h5>
<div style="color: #ecf0f1; font-size: 0.85em;">
Lookup service maps keys → shards (flexible but adds latency)
</div>
</div>
</div>
</div>

### Consistent Hashing

<div style="background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #5b4e8d;">
<h4 style="color: #00d9ff; margin-top: 0;">Consistent Hashing Ring</h4>
<div style="text-align: center; padding: 20px;">
<div style="position: relative; width: 200px; height: 200px; margin: 0 auto; border: 3px solid #00d9ff; border-radius: 50%;">
<div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #e74c3c; color: white; padding: 5px 10px; border-radius: 4px; font-size: 0.8em;">Node A</div>
<div style="position: absolute; top: 50%; right: -40px; transform: translateY(-50%); background: #27ae60; color: white; padding: 5px 10px; border-radius: 4px; font-size: 0.8em;">Node B</div>
<div style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); background: #3498db; color: white; padding: 5px 10px; border-radius: 4px; font-size: 0.8em;">Node C</div>
<div style="position: absolute; top: 50%; left: -40px; transform: translateY(-50%); background: #9b59b6; color: white; padding: 5px 10px; border-radius: 4px; font-size: 0.8em;">Node D</div>
</div>
</div>
<p style="color: #a0a0a0; font-size: 0.85em; text-align: center; margin-top: 15px;">
Keys are hashed to positions on the ring → Assigned to next node clockwise<br>
Adding/removing nodes only affects neighboring keys
</p>
</div>

---

## Data Modeling Patterns

### Denormalization

```
NORMALIZED (3NF):                    DENORMALIZED:
┌─────────┐    ┌─────────┐          ┌─────────────────────────────┐
│ Orders  │    │ Users   │          │ Orders                      │
├─────────┤    ├─────────┤          ├─────────────────────────────┤
│ id      │───→│ id      │   →→→    │ id                          │
│ user_id │    │ name    │          │ user_id                     │
│ total   │    │ email   │          │ user_name  (denormalized)   │
└─────────┘    └─────────┘          │ user_email (denormalized)   │
                                    │ total                       │
       Requires JOIN                └─────────────────────────────┘
                                          No JOIN needed
```

### Event Sourcing

<div style="background: linear-gradient(135deg, #232526 0%, #414345 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #636e72;">
<h4 style="color: #00cec9; margin-top: 0;">Event Sourcing Pattern</h4>
<div style="display: flex; align-items: center; gap: 15px; overflow-x: auto; padding: 10px 0;">
<div style="background: #0984e3; color: white; padding: 10px 15px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 0.85em;">
AccountCreated<br>
<span style="font-size: 0.8em; opacity: 0.8;">balance: $0</span>
</div>
<span style="color: #74b9ff;">→</span>
<div style="background: #00b894; color: white; padding: 10px 15px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 0.85em;">
MoneyDeposited<br>
<span style="font-size: 0.8em; opacity: 0.8;">amount: $100</span>
</div>
<span style="color: #74b9ff;">→</span>
<div style="background: #e17055; color: white; padding: 10px 15px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 0.85em;">
MoneyWithdrawn<br>
<span style="font-size: 0.8em; opacity: 0.8;">amount: $30</span>
</div>
<span style="color: #74b9ff;">→</span>
<div style="background: #6c5ce7; color: white; padding: 10px 15px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 0.85em;">
Current State<br>
<span style="font-size: 0.8em; opacity: 0.8;">balance: $70</span>
</div>
</div>
<p style="color: #b2bec3; font-size: 0.85em; margin-top: 15px;">
Store events, not state. Replay events to rebuild current state. Perfect audit trail.
</p>
</div>

### CQRS (Command Query Responsibility Segregation)

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #0f3460;">
<h4 style="color: #e94560; margin-top: 0;">CQRS Architecture</h4>
<div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 20px; align-items: center;">
<div style="text-align: center;">
<div style="background: #e74c3c; color: white; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
<strong>Write Model</strong><br>
<span style="font-size: 0.8em;">Commands</span>
</div>
<div style="background: #c0392b; color: white; padding: 10px; border-radius: 6px; font-size: 0.85em;">
Normalized DB<br>
(PostgreSQL)
</div>
</div>
<div style="text-align: center; color: #f39c12;">
<div>Events</div>
<div style="font-size: 1.5em;">⟷</div>
<div style="font-size: 0.8em;">Event Bus</div>
</div>
<div style="text-align: center;">
<div style="background: #27ae60; color: white; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
<strong>Read Model</strong><br>
<span style="font-size: 0.8em;">Queries</span>
</div>
<div style="background: #229954; color: white; padding: 10px; border-radius: 6px; font-size: 0.85em;">
Denormalized DB<br>
(Elasticsearch)
</div>
</div>
</div>
</div>

---

## Storage Best Practices

### Choosing the Right Storage

1. **Understand access patterns first**
   - Read-heavy vs write-heavy?
   - Random vs sequential access?
   - Query complexity?

2. **Consider consistency requirements**
   - Strong consistency needed? → RDBMS
   - Eventual consistency OK? → NoSQL

3. **Plan for scale**
   - Will you need horizontal scaling?
   - What's your data growth rate?

4. **Don't over-optimize early**
   - Start simple (often PostgreSQL)
   - Add caching layer when needed
   - Shard only when necessary

### Common Anti-Patterns to Avoid

<div style="background: linear-gradient(135deg, #b71540 0%, #e74c3c 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #c0392b;">
<h4 style="color: #f1c40f; margin-top: 0;">Storage Anti-Patterns</h4>
<ul style="color: #fadbd8; margin: 0; padding-left: 20px; line-height: 1.8;">
<li><strong>Storing blobs in databases</strong> - Use object storage instead</li>
<li><strong>Over-normalization</strong> - Causes excessive JOINs</li>
<li><strong>Under-indexing</strong> - Leads to full table scans</li>
<li><strong>Over-indexing</strong> - Slows down writes</li>
<li><strong>Ignoring connection pooling</strong> - Connection overhead kills performance</li>
<li><strong>No backup strategy</strong> - Data loss is catastrophic</li>
<li><strong>Premature sharding</strong> - Adds complexity before needed</li>
</ul>
</div>

---

## Summary

<div style="background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #5b4e8d;">
<h4 style="color: #00d9ff; margin-top: 0;">Key Takeaways</h4>
<div style="display: grid; gap: 10px; color: #a0a0a0;">
<div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px;">
<strong style="color: #00d9ff;">Storage Types:</strong> Block (VMs, DBs), File (shared), Object (scalable, cheap)
</div>
<div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px;">
<strong style="color: #00d9ff;">SQL vs NoSQL:</strong> ACID + complex queries vs flexibility + scale
</div>
<div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px;">
<strong style="color: #00d9ff;">Replication:</strong> Single-leader (simple), Multi-leader (geo), Leaderless (availability)
</div>
<div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px;">
<strong style="color: #00d9ff;">Sharding:</strong> Range, Hash, or Directory-based partitioning
</div>
<div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px;">
<strong style="color: #00d9ff;">Patterns:</strong> Denormalization, Event Sourcing, CQRS for specific use cases
</div>
</div>
</div>
