# Design Google Drive

## Problem Statement

Design a cloud file storage and synchronization service that allows users to store, share, and sync files across devices.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #4285f4;">

### Core Requirements
- **File Storage**: Upload, download, organize files
- **Sync**: Real-time synchronization across devices
- **Sharing**: Share files/folders with permissions
- **Versioning**: File history and rollback
- **Collaboration**: Real-time editing (Google Docs style)
- **Offline Access**: Work without internet

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">CLOUD STORAGE ARCHITECTURE</h3>

```
                              ┌─────────────────┐
                              │   Desktop App   │
                              │   (Sync Client) │
                              └────────┬────────┘
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            ▼                          ▼                          ▼
     ┌───────────┐              ┌───────────┐              ┌───────────┐
     │  Mobile   │              │  Web App  │              │   API     │
     │   Apps    │              │           │              │  Clients  │
     └─────┬─────┘              └─────┬─────┘              └─────┬─────┘
           │                          │                          │
           └──────────────────────────┼──────────────────────────┘
                                      │
                         ┌────────────▼────────────┐
                         │       API Gateway       │
                         │   (Auth, Rate Limit)    │
                         └────────────┬────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         │                            │                            │
         ▼                            ▼                            ▼
  ┌─────────────┐            ┌─────────────┐            ┌─────────────┐
  │   Metadata  │            │    Sync     │            │   Upload/   │
  │   Service   │            │   Service   │            │  Download   │
  │             │            │             │            │   Service   │
  │ - File info │            │ - Conflict  │            │             │
  │ - Folders   │            │ - Delta     │            │ - Chunking  │
  │ - Sharing   │            │ - Merge     │            │ - Resume    │
  └──────┬──────┘            └──────┬──────┘            └──────┬──────┘
         │                          │                          │
         │                          │                          │
         ▼                          ▼                          ▼
  ┌─────────────┐            ┌─────────────┐            ┌─────────────┐
  │  PostgreSQL │            │   Redis     │            │     S3      │
  │  (Metadata) │            │ (Sync State)│            │ (File Blobs)│
  └─────────────┘            └─────────────┘            └─────────────┘
```

</div>

---

## File Chunking Strategy

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">BLOCK-LEVEL DEDUPLICATION</h4>

```
File: large_video.mp4 (1GB)
                │
                ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                    CHUNKING PROCESS                          │
    ├─────────────────────────────────────────────────────────────┤
    │                                                              │
    │  1. Split into 4MB chunks                                    │
    │     ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ... ┌────┐           │
    │     │ C1 │ │ C2 │ │ C3 │ │ C4 │ │ C5 │     │C256│           │
    │     └────┘ └────┘ └────┘ └────┘ └────┘     └────┘           │
    │                                                              │
    │  2. Calculate SHA-256 hash for each chunk                   │
    │     Hash(C1) = abc123                                        │
    │     Hash(C2) = def456                                        │
    │     ...                                                      │
    │                                                              │
    │  3. Check if chunk already exists (dedup)                   │
    │     ┌─────────────────────────────────────────┐             │
    │     │ abc123 → Already exists, skip upload    │             │
    │     │ def456 → New chunk, upload to S3        │             │
    │     └─────────────────────────────────────────┘             │
    │                                                              │
    │  4. Store file manifest                                      │
    │     {                                                        │
    │       "file_id": "xyz789",                                  │
    │       "chunks": ["abc123", "def456", "ghi789", ...]         │
    │     }                                                        │
    └─────────────────────────────────────────────────────────────┘

Benefits:
- Deduplication across all users (save 40%+ storage)
- Resumable uploads (only upload remaining chunks)
- Efficient sync (only sync changed chunks)
```

</div>

---

## Phase 1: Starting Phase

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 1,000 - 50,000
- **Storage**: 100GB - 10TB total
- **Files**: Mostly small files (< 100MB)
- **Budget**: $500 - $3,000/month

### Monolithic Architecture

```python
# Simple file storage service
class FileService:
    def __init__(self, s3_client, db):
        self.s3 = s3_client
        self.db = db

    def upload_file(self, user_id, file_path, content):
        # Generate unique file ID
        file_id = str(uuid4())

        # Upload to S3 (single file, no chunking yet)
        s3_key = f"{user_id}/{file_id}"
        self.s3.put_object(
            Bucket='files',
            Key=s3_key,
            Body=content
        )

        # Store metadata
        self.db.execute("""
            INSERT INTO files (id, user_id, path, s3_key, size, created_at)
            VALUES (%s, %s, %s, %s, %s, NOW())
        """, file_id, user_id, file_path, s3_key, len(content))

        return file_id

    def download_file(self, user_id, file_id):
        # Check permission
        file = self.db.query_one(
            "SELECT * FROM files WHERE id = %s AND user_id = %s",
            file_id, user_id
        )

        if not file:
            raise PermissionError()

        # Get from S3
        response = self.s3.get_object(Bucket='files', Key=file.s3_key)
        return response['Body'].read()
```

#### Simple Sync Protocol

```
┌─────────────────────────────────────────┐
│         POLLING-BASED SYNC              │
├─────────────────────────────────────────┤
│                                          │
│  Client polls every 30 seconds:          │
│                                          │
│  GET /api/sync/changes?since=timestamp   │
│                                          │
│  Response:                               │
│  {                                        │
│    "changes": [                          │
│      {"path": "/docs/a.txt", "action": "modify"},
│      {"path": "/images/b.png", "action": "delete"}
│    ],                                    │
│    "cursor": "new_timestamp"             │
│  }                                        │
│                                          │
│  Client downloads changed files          │
│                                          │
└─────────────────────────────────────────┘
```

</div>
</div>

---

## Phase 2: Medium Scale

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 1M - 10M
- **Storage**: 100PB+
- **Uploads**: 10K files/second
- **Budget**: $200K - $1M/month

### Microservices with Chunking

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                         ┌────────────────────┐
                         │    API Gateway     │
                         └─────────┬──────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
  ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
  │  Metadata   │          │   Upload    │          │   Sync      │
  │   Service   │          │   Service   │          │  Service    │
  └──────┬──────┘          └──────┬──────┘          └──────┬──────┘
         │                        │                        │
         │                        ▼                        │
         │                 ┌─────────────┐                 │
         │                 │   Chunk     │                 │
         │                 │  Service    │                 │
         │                 └──────┬──────┘                 │
         │                        │                        │
         │                        ▼                        │
         │                 ┌─────────────────────┐         │
         │                 │  BLOB STORAGE       │         │
         │                 │                     │         │
         │                 │  ┌───┐ ┌───┐ ┌───┐ │         │
         │                 │  │ S3│ │ S3│ │ S3│ │         │
         │                 │  │US │ │EU │ │AP │ │         │
         │                 │  └───┘ └───┘ └───┘ │         │
         │                 └─────────────────────┘         │
         │                                                 │
         ▼                                                 ▼
  ┌─────────────┐                                   ┌─────────────┐
  │ PostgreSQL  │                                   │   Kafka     │
  │  Cluster    │                                   │ (Events)    │
  └─────────────┘                                   └─────────────┘
```

</div>

### Delta Sync Algorithm

```python
class DeltaSyncService:
    """
    Only sync changed bytes, not entire files.
    Uses rolling checksum (rsync algorithm).
    """

    def calculate_delta(self, old_chunks, new_content):
        """
        Compare new content against old chunks.
        Return only the differences.
        """
        CHUNK_SIZE = 4 * 1024 * 1024  # 4MB

        old_hashes = {chunk.hash: chunk for chunk in old_chunks}
        new_chunks = []
        delta = []

        # Rolling hash to find matching blocks
        for i in range(0, len(new_content), CHUNK_SIZE):
            chunk_data = new_content[i:i + CHUNK_SIZE]
            chunk_hash = sha256(chunk_data)

            if chunk_hash in old_hashes:
                # Reuse existing chunk
                new_chunks.append(old_hashes[chunk_hash])
            else:
                # New chunk, need to upload
                new_chunks.append(Chunk(hash=chunk_hash, data=chunk_data))
                delta.append({
                    'offset': i,
                    'hash': chunk_hash,
                    'data': chunk_data
                })

        return new_chunks, delta

    def apply_delta(self, file_id, delta):
        """
        Apply delta to reconstruct file on client.
        """
        for change in delta:
            # Upload new chunk to S3
            self.s3.put_object(
                Bucket='chunks',
                Key=change['hash'],
                Body=change['data']
            )

        # Update file manifest
        self.update_manifest(file_id, delta)
```

### Conflict Resolution

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```
Conflict Scenario:

Device A                    Server                    Device B
   │                           │                           │
   │ Edit file.txt             │         Edit file.txt     │
   │ "Hello World"             │         "Hello Earth"     │
   │                           │                           │
   │ Sync ──────────────────▶  │                           │
   │                           │ Accept (v1 → v2)          │
   │                           │                           │
   │                           │  ◀────────────────── Sync │
   │                           │                           │
   │                           │  CONFLICT DETECTED!       │
   │                           │                           │
   │                           │  Resolution Strategy:     │
   │                           │  1. Keep both versions    │
   │                           │     file.txt              │
   │                           │     file (conflict).txt   │
   │                           │                           │
   │                           │  OR                       │
   │                           │                           │
   │                           │  2. Last-write-wins       │
   │                           │     (with warning)        │
   │                           │                           │
   │  ◀──── Notify conflict ────┤                           │
   │                           ├──── Notify conflict ─────▶ │
```

</div>

</div>
</div>

---

## Phase 3: High Scale (Google Drive Scale)

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 1B+
- **Storage**: Exabytes
- **Uploads**: 1M files/second
- **Team**: 500+ engineers

### Global Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                         GLOBAL FILE STORAGE INFRASTRUCTURE
    ┌────────────────────────────────────────────────────────────────┐
    │                                                                │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                    EDGE LAYER                             │ │
    │  │                                                           │ │
    │  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐      │ │
    │  │  │ Edge    │  │ Edge    │  │ Edge    │  │ Edge    │      │ │
    │  │  │ US-East │  │ EU-West │  │ AP-South│  │ SA-East │      │ │
    │  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘      │ │
    │  │                                                           │ │
    │  │  - Upload acceleration                                    │ │
    │  │  - Hot file caching                                       │ │
    │  │  - Thumbnail serving                                      │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                    CONTROL PLANE                          │ │
    │  │                                                           │ │
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │ │
    │  │  │  Metadata   │  │   Quota     │  │   Permission    │   │ │
    │  │  │  Service    │  │   Service   │  │   Service       │   │ │
    │  │  └─────────────┘  └─────────────┘  └─────────────────┘   │ │
    │  │                                                           │ │
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │ │
    │  │  │   Sync      │  │  Collab     │  │   Search        │   │ │
    │  │  │  Service    │  │  Service    │  │   Service       │   │ │
    │  │  └─────────────┘  └─────────────┘  └─────────────────┘   │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                    DATA PLANE                             │ │
    │  │                                                           │ │
    │  │  ┌───────────────────────────────────────────────────┐   │ │
    │  │  │              DISTRIBUTED BLOB STORE                │   │ │
    │  │  │                                                    │   │ │
    │  │  │   ┌────────────┐  ┌────────────┐  ┌────────────┐  │   │ │
    │  │  │   │   Cold     │  │   Warm     │  │   Hot      │  │   │ │
    │  │  │   │  Storage   │  │  Storage   │  │  Storage   │  │   │ │
    │  │  │   │ (Glacier)  │  │   (S3)     │  │  (SSD)     │  │   │ │
    │  │  │   └────────────┘  └────────────┘  └────────────┘  │   │ │
    │  │  │                                                    │   │ │
    │  │  │   Data placement: 3+ replicas across regions      │   │ │
    │  │  │   Erasure coding: 1.5x storage overhead           │   │ │
    │  │  │   11 nines durability                             │   │ │
    │  │  └───────────────────────────────────────────────────┘   │ │
    │  └──────────────────────────────────────────────────────────┘ │
    └────────────────────────────────────────────────────────────────┘
```

</div>

### Storage Tiering

```
┌─────────────────────────────────────────────────────────────┐
│                    INTELLIGENT TIERING                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  HOT TIER (SSD, Edge Cache)                                 │
│  └── Recently accessed files (< 7 days)                     │
│  └── Frequently accessed files                              │
│  └── Cost: $0.10/GB/month                                   │
│                                                              │
│  WARM TIER (Standard S3)                                    │
│  └── Occasional access (7-90 days)                          │
│  └── User's active files                                    │
│  └── Cost: $0.023/GB/month                                  │
│                                                              │
│  COLD TIER (S3 Glacier)                                     │
│  └── Rarely accessed (> 90 days)                            │
│  └── Archived files                                         │
│  └── Cost: $0.004/GB/month                                  │
│                                                              │
│  ARCHIVE TIER (Glacier Deep Archive)                        │
│  └── Compliance/legal hold                                  │
│  └── 12+ hour retrieval time                                │
│  └── Cost: $0.001/GB/month                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>
</div>

---

## AWS Technologies & Alternatives

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

| Component | AWS Service | Alternative | Trade-offs |
|-----------|-------------|-------------|------------|
| **Blob Storage** | S3 | GCS, Minio, Ceph | S3: Mature ecosystem, Others: Cost/control |
| **Metadata DB** | Aurora PostgreSQL | CockroachDB, Vitess | Aurora: Managed, Cockroach: Multi-region |
| **Sync State** | ElastiCache Redis | DynamoDB Streams | Redis: Speed, DynamoDB: Durability |
| **Search** | OpenSearch | Elasticsearch | OpenSearch: Managed, ES: More features |
| **CDN** | CloudFront | Cloudflare | CloudFront: Integration, CF: Edge compute |
| **Archive** | Glacier | Backblaze B2 | Glacier: Integration, B2: Cost |

</div>

---

## Distributed Systems Considerations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### 1. Consistency Model

```
┌─────────────────────────────────────────────────────────────┐
│               CONSISTENCY GUARANTEES                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Metadata (PostgreSQL):                                     │
│  └── Strong consistency                                     │
│  └── Synchronous replication                                │
│                                                              │
│  File Content (S3):                                         │
│  └── Read-after-write consistency                           │
│  └── Eventual consistency for listing                       │
│                                                              │
│  Sync State (Redis):                                        │
│  └── Best-effort delivery                                   │
│  └── Client reconciliation                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2. Deduplication at Scale

```python
class GlobalDeduplicationService:
    """
    Cross-user deduplication saves 40%+ storage.
    Uses content-addressable storage.
    """

    def store_chunk(self, chunk_hash, chunk_data, uploader_id):
        # Check if chunk already exists
        existing = self.chunk_index.get(chunk_hash)

        if existing:
            # Increment reference count
            self.chunk_index.increment_refs(chunk_hash)
            return existing.s3_key
        else:
            # Store new chunk
            s3_key = f"chunks/{chunk_hash[:2]}/{chunk_hash}"
            self.s3.put_object(Bucket='chunks', Key=s3_key, Body=chunk_data)

            # Index the chunk
            self.chunk_index.set(chunk_hash, {
                's3_key': s3_key,
                'ref_count': 1,
                'size': len(chunk_data)
            })

            return s3_key

    def delete_chunk_reference(self, chunk_hash):
        # Decrement reference count
        refs = self.chunk_index.decrement_refs(chunk_hash)

        if refs == 0:
            # No more references, schedule deletion
            self.deletion_queue.add(chunk_hash)
```

### 3. Quota Management

```
Per-user quota enforcement:

┌─────────────────────────────────────────┐
│            QUOTA SERVICE                 │
├─────────────────────────────────────────┤
│                                          │
│  Pre-upload check:                       │
│  ┌────────────────────────────────────┐ │
│  │ current_usage + file_size <= quota │ │
│  └────────────────────────────────────┘ │
│                                          │
│  Async usage calculation:                │
│  - Background job recalculates usage    │
│  - Handles dedup credits                 │
│  - Syncs with billing                   │
│                                          │
│  Redis for fast checks:                  │
│  INCRBY user:quota:123 file_size        │
│                                          │
└─────────────────────────────────────────┘
```

</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Chunking strategy**: Block-level dedup vs file-level
2. **Sync protocol**: Delta sync for efficiency
3. **Conflict resolution**: Multiple strategies available
4. **Storage tiering**: Cost optimization
5. **Security**: Encryption at rest and in transit

### Common Follow-ups

- How do you handle large files (10GB+)?
- How do you ensure 11 nines durability?
- How do you implement real-time collaboration?
- How do you handle offline editing?

</div>
