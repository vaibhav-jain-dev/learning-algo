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

## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f0883e;">

### 1. "Why chunking instead of whole file upload?"

<div style="background: #0d1117; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Do you understand the trade-offs of complexity vs. efficiency at scale?

**Strong Answer**:
- **Resumability**: A 2GB upload that fails at 90% can resume from the last successful chunk, not restart
- **Deduplication**: Same chunk across users (think shared PDFs, OS files) stored once - saves 40%+ storage
- **Delta sync**: When a user edits byte 500 of a 1GB file, only that 4MB chunk re-uploads, not 1GB
- **Bandwidth**: Critical for mobile users on metered connections
- **Parallelization**: Upload 4 chunks simultaneously, 4x faster for large files

**When Simpler Works**:
> "For files under 100MB and < 10K total files, whole-file upload is fine. The complexity of chunking isn't worth it. S3's multipart upload handles resumability for larger files without custom chunking logic."

</div>
</div>

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #58a6ff;">

### 2. "How do you handle conflicts in collaborative editing?"

<div style="background: #0d1117; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Understanding of distributed systems, CAP theorem, and user experience trade-offs.

**Strong Answer**:
```
Strategy depends on file type:

Binary files (images, videos):
└── Last-write-wins OR create conflict copy
└── "photo.jpg" and "photo (conflict from Device B).jpg"
└── Let user decide - they know context

Text/documents:
└── Operational Transform (OT) for real-time collab
└── Three-way merge for offline edits
└── Character-level conflict resolution

Code files:
└── Git-style three-way merge
└── Mark conflicts, let developer resolve
```

**Key Insight**: "Google Docs uses Operational Transform because users expect real-time character-by-character sync. Dropbox uses conflict copies because file-level sync is simpler and users don't expect real-time binary file collaboration."

**When Simpler Works**:
> "For most apps, last-write-wins with a 'version history' feature is enough. Users rarely have true conflicts - most 'conflicts' are the same person on two devices. Version history lets them recover if needed."

</div>
</div>

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #238636;">

### 3. "Why not just use S3 directly for everything?"

<div style="background: #0d1117; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Do you understand why abstractions exist and when they're necessary?

**Strong Answer**:
- **S3 limitations**: No built-in file hierarchy (it's flat key-value), expensive listing operations at scale, no native sharing/permissions
- **Metadata overhead**: Storing file trees, sharing permissions, version history, user quotas in S3 metadata is inefficient
- **Search**: S3 has no content search - need separate indexing layer
- **Sync state**: Tracking "what changed since last sync" requires a separate database

**However, S3 is Perfect For**:
- The actual blob storage (it's incredibly durable and cheap)
- Serving downloads via signed URLs (offload bandwidth)
- Backup and archive storage

**When S3 Alone Works**:
> "For a simple file sharing app with < 100K files, you CAN use S3 directly with DynamoDB for metadata. No chunking, no sync service. Just presigned URLs for upload/download. This handles 90% of use cases for $150/month."

</div>
</div>

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #8957e5;">

### 4. "How would you implement offline support?"

<div style="background: #0d1117; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Client-side architecture, eventual consistency, and sync complexity.

**Strong Answer**:
```
Client-side architecture:

┌─────────────────────────────────────────┐
│         LOCAL FILE SYSTEM               │
├─────────────────────────────────────────┤
│                                          │
│  SQLite DB (local metadata):             │
│  - file_path, local_hash, server_hash   │
│  - last_sync_time, pending_changes      │
│                                          │
│  File Watcher:                           │
│  - FSEvents (Mac), inotify (Linux)      │
│  - Queue changes to sync service        │
│                                          │
│  Sync Engine:                            │
│  - Compare local vs server state        │
│  - Queue uploads/downloads              │
│  - Handle conflicts on reconnect        │
│                                          │
└─────────────────────────────────────────┘
```

**Key Insight**: "The hard part isn't the offline editing - it's the reconnection. You need to handle: files edited on both sides, files deleted remotely but edited locally, folder renames that conflict. Dropbox spent years perfecting this."

**When Simpler Works**:
> "For web-only apps, skip offline entirely. For mobile apps, cache recently accessed files read-only. Full offline editing with sync is a massive engineering investment - only build it if it's core to your product."

</div>
</div>

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f78166;">

### 5. "How do you ensure durability and prevent data loss?"

<div style="background: #0d1117; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Understanding of storage reliability, replication strategies, and failure modes.

**Strong Answer**:
```
Multiple layers of protection:

1. S3 (11 nines durability):
   └── Automatically replicates across 3+ AZs
   └── Checksums on every read/write
   └── Versioning enabled for accidental deletes

2. Cross-region replication:
   └── Critical data copied to second region
   └── Protects against region-wide outages

3. Application-level:
   └── Don't confirm upload until S3 confirms
   └── Idempotent operations (safe to retry)
   └── Write-ahead logging for metadata

4. Soft deletes:
   └── 30-day trash before permanent deletion
   └── Version history for recovery
```

**Key Insight**: "Most data loss isn't hardware failure - it's user error or application bugs. Soft deletes and version history prevent more data loss than fancy replication schemes."

**When Simpler Works**:
> "S3's built-in durability is enough for most apps. Cross-region replication is expensive and adds latency. Only add it for compliance requirements or if you're storing irreplaceable data."

</div>
</div>

---

## Why This Technology?

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Technology Decision Matrix

| Decision | Why This Choice | Alternative Considered | When Alternative Wins |
|----------|-----------------|----------------------|----------------------|
| **S3 for blobs** | 11 nines durability, infinite scale, $0.023/GB | Self-hosted Ceph/Minio | Need on-prem, extreme cost optimization at 10PB+ |
| **PostgreSQL for metadata** | ACID transactions, complex queries (sharing, search), mature tooling | DynamoDB | Need unlimited scale without sharding headaches |
| **Redis for sync state** | Sub-millisecond latency for "what changed" queries | Kafka | Need event replay, audit log, or ordered delivery |
| **DynamoDB for chunk index** | Consistent hashing, auto-scaling, single-digit ms | PostgreSQL | Already have Postgres, < 1B chunks |
| **Kafka for events** | Ordered event delivery, replay capability, decoupling | Redis Pub/Sub | Simple real-time only, no replay needed |

### S3 vs Alternatives Deep Dive

<div style="background: #161b22; border-radius: 10px; padding: 20px; margin: 16px 0;">

```
S3                          GCS                         Minio (Self-hosted)
───────────────────────────────────────────────────────────────────────────
Durability: 11 nines        Durability: 11 nines        Durability: You manage
Cost: $0.023/GB             Cost: $0.020/GB             Cost: Hardware + ops
Ecosystem: Best             Ecosystem: Good              Ecosystem: S3-compatible
Multi-region: Built-in      Multi-region: Built-in      Multi-region: Manual

CHOOSE S3 WHEN:             CHOOSE GCS WHEN:            CHOOSE MINIO WHEN:
- AWS ecosystem             - GCP ecosystem             - On-premise required
- Need mature tooling       - BigQuery integration      - Data sovereignty
- Global reach              - ML workloads              - Cost at 10PB+ scale
```

</div>

### DynamoDB vs PostgreSQL for Metadata

<div style="background: #161b22; border-radius: 10px; padding: 20px; margin: 16px 0;">

```
PostgreSQL                              DynamoDB
────────────────────────────────────────────────────────────────────
Queries: Complex joins, full-text       Queries: Key-value, limited
Scale: Sharding required at 10TB+       Scale: Unlimited, automatic
Cost: Predictable                       Cost: Per-request (can spike)
Transactions: Full ACID                 Transactions: Limited

CHOOSE POSTGRES WHEN:                   CHOOSE DYNAMO WHEN:
- Complex permission queries            - Simple access patterns
- Full-text search needed               - Extreme scale (1M+ RPS)
- Team knows SQL                        - Unpredictable traffic
- < 10TB metadata                       - Global tables needed
```

**Recommendation**: Start with PostgreSQL. It handles 99% of file storage apps. Migrate specific tables to DynamoDB only when you hit scaling limits.

</div>
</div>

---

## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### The "$150/month File Storage" Architecture

<div style="background: #161b22; border-radius: 10px; padding: 20px; margin: 16px 0;">

**For: < 10K files, < 1TB storage, < 1K users**

```
┌──────────────────────────────────────────────────────────────┐
│                    SIMPLE FILE STORAGE                        │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│   Client                                                      │
│     │                                                         │
│     ▼                                                         │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐    │
│   │   API       │────▶│  Postgres   │     │     S3      │    │
│   │  (Express)  │     │  (Metadata) │     │   (Files)   │    │
│   └─────────────┘     └─────────────┘     └─────────────┘    │
│                                                  ▲            │
│   Upload flow:                                   │            │
│   1. API creates presigned S3 URL               │            │
│   2. Client uploads directly to S3 ─────────────┘            │
│   3. API stores metadata in Postgres                         │
│                                                               │
│   Cost breakdown:                                             │
│   - S3 (1TB): $23/month                                      │
│   - RDS Postgres (db.t3.micro): $15/month                    │
│   - EC2 (t3.small): $15/month                                │
│   - Data transfer: ~$50/month                                │
│   - Total: ~$100-150/month                                   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

**What You Skip**:
- No chunking (S3 multipart handles large files)
- No delta sync (re-upload whole file - it's fine for occasional changes)
- No real-time collaboration (use Google Docs integration instead)
- No offline support (web-only is fine)

</div>

### When You Don't Need Delta Sync

<div style="background: #161b22; border-radius: 10px; padding: 20px; margin: 16px 0;">

| Scenario | Delta Sync Needed? | Why |
|----------|-------------------|-----|
| Document storage (PDFs, images) | No | Files don't change often, whole upload is fine |
| Code repositories | No | Git handles this better |
| Video hosting | No | Videos are rarely edited, re-encode anyway |
| Real-time collaboration | No | Use OT/CRDT instead, different problem |
| Backup service | No | Whole-file versioning is simpler |
| **Dropbox-style sync** | **Yes** | Users edit same file repeatedly across devices |

**Key Insight**:
> "Dropbox's delta sync is overkill for most apps. They built it because their core use case is syncing files you edit constantly (documents, code). If your users upload once and share, skip it entirely."

</div>

### Simpler Alternatives Table

<div style="background: #161b22; border-radius: 10px; padding: 20px; margin: 16px 0;">

| Complex Feature | Simpler Alternative | When to Use Alternative |
|-----------------|--------------------|-----------------------|
| Custom chunking | S3 multipart upload | Files < 5GB, no dedup needed |
| Delta sync | Whole file re-upload | Files change < 1x/day per user |
| Real-time collaboration | Google Docs/Office 365 embed | Not core to your product |
| Offline desktop sync | Web-only + mobile cache | Users have reliable internet |
| Custom search | PostgreSQL full-text + S3 metadata | < 1M files |
| Multi-region storage | Single region + backups | Users in one geography |
| Custom CDN | CloudFront/Cloudflare | Not serving 10K+ req/sec |

</div>

### Decision Framework: Build vs. Buy

<div style="background: #161b22; border-radius: 10px; padding: 20px; margin: 16px 0;">

```
                     Is file storage core to your product?
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                   YES                              NO
                    │                               │
                    ▼                               ▼
        Do you have 6+ months              Use Firebase Storage,
        and 2+ engineers?                  Cloudinary, or S3 + SDK
                    │                               │
         ┌─────────┴─────────┐                     │
         │                   │                     │
        YES                  NO                    │
         │                   │                     │
         ▼                   ▼                     │
    Build custom        Use Dropbox API,          │
    (this design)       Box API, or               │
                        AWS Amplify Storage        │
```

</div>
</div>
</div>

---

## Trade-off Analysis & Mitigation

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Core Trade-offs

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f0883e;">

#### 1. Consistency vs. Availability

| Choice | Consistency | Availability | Use When |
|--------|-------------|--------------|----------|
| Sync writes to all replicas | Strong | Lower (fails if replica down) | Financial data, permissions |
| Async replication | Eventual | Higher | File content, thumbnails |
| Optimistic concurrency | Eventual with conflicts | Highest | Collaborative editing |

**Mitigation**:
- Use strong consistency for metadata (permissions, sharing)
- Use eventual consistency for blobs (content doesn't change)
- Handle conflicts gracefully in UI (don't lose user work)

</div>

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #58a6ff;">

#### 2. Storage Cost vs. Access Speed

| Tier | Cost/GB/month | Access Time | Use For |
|------|---------------|-------------|---------|
| SSD/Edge Cache | $0.10+ | <10ms | Hot files, thumbnails |
| S3 Standard | $0.023 | 50-100ms | Active files |
| S3 Infrequent | $0.0125 | 50-100ms | Files > 30 days old |
| Glacier | $0.004 | 3-5 hours | Files > 90 days old |

**Mitigation**:
- Intelligent tiering based on access patterns
- Pre-warm files when user opens folder
- Cache thumbnails aggressively (they're accessed 100x more than files)

</div>

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #238636;">

#### 3. Deduplication vs. Privacy

| Approach | Storage Savings | Privacy | Complexity |
|----------|-----------------|---------|------------|
| No dedup | 0% | Full isolation | Low |
| Per-user dedup | 10-20% | Full isolation | Medium |
| Global dedup | 40-60% | Shared chunks | High |
| Convergent encryption | 40-60% | Encrypted + dedup | Very High |

**Mitigation**:
- Use global dedup only for hash (not content inspection)
- Encrypt chunks with per-user keys for sensitive content
- For enterprise: offer per-tenant isolation as premium feature

</div>

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #8957e5;">

#### 4. Sync Speed vs. Battery/Bandwidth

| Strategy | Sync Speed | Battery Impact | Bandwidth |
|----------|------------|----------------|-----------|
| Real-time (WebSocket) | Instant | High (constant connection) | Low |
| Frequent polling (30s) | Near-instant | Medium | Medium |
| Lazy polling (5min) | Minutes | Low | Low |
| Manual sync | User-initiated | Minimal | Minimal |

**Mitigation**:
- WebSocket when app is focused, long-polling in background
- Batch changes and sync on network change (WiFi vs. cellular)
- Let users configure sync frequency for mobile

</div>

### Risk Mitigation Matrix

<div style="background: #161b22; border-radius: 10px; padding: 20px; margin: 16px 0;">

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| S3 region outage | High | Very Low | Cross-region replication for critical data |
| Metadata DB corruption | Critical | Low | Point-in-time recovery, read replicas |
| Sync conflict data loss | High | Medium | Keep both versions, version history |
| Quota exceeded mid-upload | Medium | Medium | Pre-check quota, graceful rollback |
| Chunk index inconsistency | High | Low | Background consistency checker, reconciliation job |
| Upload stuck/orphaned | Medium | Medium | Timeout + cleanup job for incomplete uploads |

</div>
</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Start simple, add complexity**: "For a startup, I'd use S3 + PostgreSQL. Here's when I'd add chunking..."
2. **Chunking strategy**: Explain block-level dedup, resumability, delta sync - and when to skip it
3. **Sync protocol**: Polling vs. push, delta sync vs. whole file, conflict resolution
4. **Storage tiering**: Hot/warm/cold storage, cost optimization at scale
5. **Security**: Encryption at rest (S3 SSE), in transit (TLS), client-side for sensitive

### Red Flags (What NOT to Say)

<div style="background: linear-gradient(135deg, #3d1f1f 0%, #5d3a3a 100%); border-radius: 10px; padding: 20px; margin: 16px 0;">

| Red Flag Statement | Why It's Wrong | Better Answer |
|-------------------|----------------|---------------|
| "I'd build everything from scratch" | Ignores existing solutions | "I'd use S3 for storage, but build custom sync logic because..." |
| "Just use MongoDB for everything" | Wrong tool for relational data | "Metadata needs joins for permissions, so PostgreSQL. Chunks are key-value, so DynamoDB" |
| "We need microservices from day one" | Premature optimization | "I'd start monolithic, extract services when we hit specific scaling issues" |
| "Eventual consistency is fine everywhere" | Ignores permission sensitivity | "Blob content can be eventual, but permissions need strong consistency" |
| "4MB chunks always" | Shows lack of understanding | "Chunk size depends on use case - smaller for text (more dedup), larger for video (less overhead)" |
| "Just store files on the server filesystem" | Doesn't scale | "Local filesystem for caching, S3 for durable storage" |

</div>

### Impressive Statements (What TO Say)

<div style="background: linear-gradient(135deg, #1f3d1f 0%, #3a5d3a 100%); border-radius: 10px; padding: 20px; margin: 16px 0;">

| Topic | Impressive Statement |
|-------|---------------------|
| **Pragmatism** | "For < 10K files, just store in S3 with PostgreSQL metadata - no chunking needed. Chunking adds complexity that only pays off at scale." |
| **Trade-off awareness** | "Dropbox's delta sync is overkill for most apps. It's critical for their use case of syncing frequently-edited files, but for a document management system, whole-file sync is fine." |
| **Cost consciousness** | "At Google Drive scale, the difference between 4MB and 8MB chunks saves petabytes. At startup scale, it's a premature optimization." |
| **Security depth** | "We encrypt at rest with S3 SSE-KMS, but for truly sensitive files, we'd offer client-side encryption where we never see the plaintext." |
| **Failure modes** | "The hardest part isn't the upload - it's handling a partial upload that crashes. We need idempotent chunk uploads and a background job to clean up orphaned chunks." |
| **User empathy** | "Conflict resolution isn't a technical problem, it's a UX problem. Users don't care about vector clocks - they care about not losing their work." |

</div>

### Common Follow-up Questions

<div style="background: #0d1117; border-radius: 10px; padding: 20px; margin: 16px 0;">

- **How do you handle large files (10GB+)?** Chunking with parallel upload, resumability
- **How do you ensure 11 nines durability?** S3's built-in replication, cross-region for critical data
- **How do you implement real-time collaboration?** Operational Transform or CRDT, separate problem from file sync
- **How do you handle offline editing?** Local SQLite + file watcher, queue changes, reconcile on reconnect
- **How do you prevent malware uploads?** Async virus scanning, quarantine until scanned, signed URLs expire
- **How do you handle quota?** Pre-check before upload, atomic increment, background recalculation for dedup credits

</div>
</div>
