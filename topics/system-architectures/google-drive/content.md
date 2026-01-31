# Design Google Drive

<nav class="toc" style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #4285f4;">

## Table of Contents

- [Problem Statement](#problem-statement)
- [High-Level Architecture](#high-level-architecture)
- [File Chunking Strategy](#file-chunking-strategy)
- [Phase 1: Starting Phase](#phase-1-starting-phase)
- [Phase 2: Medium Scale](#phase-2-medium-scale)
- [Phase 3: High Scale (Google Drive Scale)](#phase-3-high-scale)
- [AWS Technologies & Alternatives](#aws-technologies-alternatives)
- [Distributed Systems Considerations](#distributed-systems-considerations)
- [Interview Deep Dive Questions](#interview-deep-dive-questions)
- [Why This Technology?](#why-this-technology)
- [When Simpler Solutions Work](#when-simpler-solutions-work)
- [Trade-off Analysis & Mitigation](#trade-off-analysis)
- [Edge Cases & Failure Modes](#edge-cases-failure-modes)
- [Scaling Strategies](#scaling-strategies)
- [Interview Tips](#interview-tips)

</nav>

---

## Problem Statement {#problem-statement}

Design a cloud file storage and synchronization service that allows users to store, share, and sync files across devices.

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #4285f4;">

### Core Requirements
  - **File Storage**: Upload, download, organize files
  - **Sync**: Real-time synchronization across devices
  - **Sharing**: Share files/folders with permissions
  - **Versioning**: File history and rollback
  - **Collaboration**: Real-time editing (Google Docs style)
  - **Offline Access**: Work without internet

</div>

---

## High-Level Architecture {#high-level-architecture}

<div class="flow-diagram" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #1d4ed8; text-align: center; margin: 0 0 24px 0;">CLOUD STORAGE ARCHITECTURE</h3>

  <!-- Client Layer -->
<div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 24px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 140px;">
<div style="font-weight: bold; color: #ffffff;">Desktop App</div>
<div style="font-size: 12px; color: #e5e7eb;">(Sync Client)</div>
</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 140px;">
<div style="font-weight: bold; color: #ffffff;">Mobile Apps</div>
<div style="font-size: 12px; color: #e5e7eb;">iOS / Android</div>
</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 140px;">
<div style="font-weight: bold; color: #ffffff;">Web App</div>
<div style="font-size: 12px; color: #e5e7eb;">React SPA</div>
</div>
<div style="background: linear-gradient(135deg, #f0883e 0%, #f79862 100%); border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 140px;">
<div style="font-weight: bold; color: #ffffff;">API Clients</div>
<div style="font-size: 12px; color: #e5e7eb;">Third-party</div>
</div>
</div>

  <!-- Arrow -->
<div style="text-align: center; font-size: 24px; color: #1d4ed8; margin: 16px 0;">
<div style="border-left: 3px solid #58a6ff; height: 30px; margin: 0 auto; width: 0;"></div>
</div>

  <!-- API Gateway -->
<div style="display: flex; justify-content: center; margin-bottom: 24px;">
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); border-radius: 12px; padding: 20px 40px; text-align: center;">
<div style="font-weight: bold; color: #ffffff; font-size: 18px;">API Gateway</div>
<div style="font-size: 12px; color: #f87171;">Auth, Rate Limiting, Routing</div>
</div>
</div>

  <!-- Arrow -->
<div style="text-align: center; font-size: 24px; color: #1d4ed8; margin: 16px 0;">
<div style="border-left: 3px solid #58a6ff; height: 30px; margin: 0 auto; width: 0;"></div>
</div>

  <!-- Services Layer -->
<div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 24px; flex-wrap: wrap;">
<div style="background: #f1f5f9; border: 2px solid #f0883e; border-radius: 12px; padding: 20px; text-align: center; min-width: 160px;">
<div style="font-weight: bold; color: #f0883e; margin-bottom: 8px;">Metadata Service</div>
<div style="font-size: 11px; color: #475569; text-align: left;">
        - File info & paths<br>
          - Folder hierarchy<br>
            - Sharing & permissions
</div>
</div>
<div style="background: #f1f5f9; border: 2px solid #58a6ff; border-radius: 12px; padding: 20px; text-align: center; min-width: 160px;">
<div style="font-weight: bold; color: #1d4ed8; margin-bottom: 8px;">Sync Service</div>
<div style="font-size: 11px; color: #475569; text-align: left;">
            - Conflict detection<br>
              - Delta calculation<br>
                - Merge operations
</div>
</div>
<div style="background: #f1f5f9; border: 2px solid #238636; border-radius: 12px; padding: 20px; text-align: center; min-width: 160px;">
<div style="font-weight: bold; color: #238636; margin-bottom: 8px;">Upload/Download</div>
<div style="font-size: 11px; color: #475569; text-align: left;">
                - Chunking logic<br>
                  - Resume support<br>
                    - Progress tracking
</div>
</div>
</div>

  <!-- Arrow -->
<div style="text-align: center; font-size: 24px; color: #1d4ed8; margin: 16px 0;">
<div style="border-left: 3px solid #58a6ff; height: 30px; margin: 0 auto; width: 0;"></div>
</div>

  <!-- Data Layer -->
<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 140px;">
<div style="font-weight: bold; color: #ffffff;">PostgreSQL</div>
<div style="font-size: 11px; color: #e5e7eb;">(Metadata)</div>
</div>
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 140px;">
<div style="font-weight: bold; color: #ffffff;">Redis</div>
<div style="font-size: 11px; color: #e5e7eb;">(Sync State)</div>
</div>
<div style="background: linear-gradient(135deg, #f0883e 0%, #f79862 100%); border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 140px;">
<div style="font-weight: bold; color: #ffffff;">S3</div>
<div style="font-size: 11px; color: #e5e7eb;">(File Blobs)</div>
</div>
</div>

</div>

  ---

## File Chunking Strategy {#file-chunking-strategy}

<div class="flow-diagram" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">BLOCK-LEVEL DEDUPLICATION</h4>

  <!-- File Input -->
<div style="display: flex; justify-content: center; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 16px 32px; text-align: center;">
<div style="font-weight: bold; color: #ffffff;">File: large_video.mp4</div>
<div style="font-size: 14px; color: #7c3aed;">(1GB)</div>
</div>
</div>

  <!-- Arrow -->
<div style="text-align: center; color: #1d4ed8; margin: 16px 0;">
<div style="border-left: 3px solid #58a6ff; height: 30px; margin: 0 auto; width: 0;"></div>
</div>

  <!-- Chunking Process Box -->
<div style="background: #f1f5f9; border: 2px solid #f0883e; border-radius: 16px; padding: 24px; margin: 16px 0;">
<div style="text-align: center; font-weight: bold; color: #f0883e; margin-bottom: 20px; font-size: 16px;">CHUNKING PROCESS</div>

  <!-- Step 1 -->
<div style="margin-bottom: 24px;">
<div style="color: #1d4ed8; font-weight: bold; margin-bottom: 12px;">1. Split into 4MB chunks</div>
<div style="display: flex; gap: 8px; flex-wrap: wrap;">
<div style="background: #238636; color: white; padding: 8px 16px; border-radius: 6px; font-size: 12px;">C1</div>
<div style="background: #238636; color: white; padding: 8px 16px; border-radius: 6px; font-size: 12px;">C2</div>
<div style="background: #238636; color: white; padding: 8px 16px; border-radius: 6px; font-size: 12px;">C3</div>
<div style="background: #238636; color: white; padding: 8px 16px; border-radius: 6px; font-size: 12px;">C4</div>
<div style="background: #238636; color: white; padding: 8px 16px; border-radius: 6px; font-size: 12px;">C5</div>
<div style="color: #475569; padding: 8px;">...</div>
<div style="background: #238636; color: white; padding: 8px 16px; border-radius: 6px; font-size: 12px;">C256</div>
</div>
</div>

  <!-- Step 2 -->
<div style="margin-bottom: 24px;">
<div style="color: #1d4ed8; font-weight: bold; margin-bottom: 12px;">2. Calculate SHA-256 hash for each chunk</div>
<div style="background: #f8fafc; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 13px; color: #475569;">
Hash(C1) = <span style="color: #16a34a;">abc123</span><br>
Hash(C2) = <span style="color: #16a34a;">def456</span><br>
  ...
</div>
</div>

  <!-- Step 3 -->
<div style="margin-bottom: 24px;">
<div style="color: #1d4ed8; font-weight: bold; margin-bottom: 12px;">3. Check if chunk already exists (dedup)</div>
<div style="background: #f8fafc; border-radius: 8px; padding: 12px;">
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<span style="color: #16a34a; font-family: monospace;">abc123</span>
<span style="color: #f0883e;">Already exists, skip upload</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #16a34a; font-family: monospace;">def456</span>
<span style="color: #1d4ed8;">New chunk, upload to S3</span>
</div>
</div>
</div>

  <!-- Step 4 -->
<div>
<div style="color: #1d4ed8; font-weight: bold; margin-bottom: 12px;">4. Store file manifest</div>
<div style="background: #f8fafc; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 13px; color: #7c3aed;">
  {<br>
&nbsp;&nbsp;"file_id": "<span style="color: #16a34a;">xyz789</span>",<br>
&nbsp;&nbsp;"chunks": ["<span style="color: #2563eb;">abc123</span>", "<span style="color: #2563eb;">def456</span>", "<span style="color: #2563eb;">ghi789</span>", ...]<br>
  }
</div>
</div>
</div>

  <!-- Benefits -->
<div style="display: flex; gap: 16px; flex-wrap: wrap; margin-top: 20px;">
<div style="flex: 1; min-width: 200px; background: #f1f5f9; border-left: 3px solid #238636; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #238636; font-weight: bold;">Deduplication</div>
<div style="color: #475569; font-size: 13px;">Save 40%+ storage across all users</div>
</div>
<div style="flex: 1; min-width: 200px; background: #f1f5f9; border-left: 3px solid #58a6ff; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #1d4ed8; font-weight: bold;">Resumable Uploads</div>
<div style="color: #475569; font-size: 13px;">Only upload remaining chunks</div>
</div>
<div style="flex: 1; min-width: 200px; background: #f1f5f9; border-left: 3px solid #f0883e; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #f0883e; font-weight: bold;">Efficient Sync</div>
<div style="color: #475569; font-size: 13px;">Only sync changed chunks</div>
</div>
</div>

</div>

  ---

## Phase 1: Starting Phase {#phase-1-starting-phase}

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### Assumptions {#phase1-assumptions}
                          - **Users**: 1,000 - 50,000
                          - **Storage**: 100GB - 10TB total
                          - **Files**: Mostly small files (< 100MB)
                          - **Budget**: $500 - $3,000/month

### Monolithic Architecture {#monolithic-architecture}

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

#### Simple Sync Protocol {#simple-sync-protocol}

<div style="background: #f1f5f9; border: 2px solid #58a6ff; border-radius: 16px; padding: 24px; margin: 16px 0;">
<div style="text-align: center; font-weight: bold; color: #1d4ed8; margin-bottom: 20px; font-size: 16px;">POLLING-BASED SYNC</div>

<div style="color: #475569; margin-bottom: 16px;">Client polls every 30 seconds:</div>

<div style="background: #f8fafc; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 13px; margin-bottom: 16px;">
<span style="color: #16a34a;">GET</span> <span style="color: #2563eb;">/api/sync/changes?since=timestamp</span>
</div>

<div style="color: #475569; margin-bottom: 8px;">Response:</div>
<div style="background: #f8fafc; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 13px; color: #7c3aed;">
  {<br>
  &nbsp;&nbsp;"changes": [<br>
&nbsp;&nbsp;&nbsp;&nbsp;{"path": "<span style="color: #16a34a;">/docs/a.txt</span>", "action": "<span style="color: #f0883e;">modify</span>"},<br>
&nbsp;&nbsp;&nbsp;&nbsp;{"path": "<span style="color: #16a34a;">/images/b.png</span>", "action": "<span style="color: #f85149;">delete</span>"}<br>
  &nbsp;&nbsp;],<br>
&nbsp;&nbsp;"cursor": "<span style="color: #2563eb;">new_timestamp</span>"<br>
  }
</div>

<div style="color: #1d4ed8; margin-top: 16px; font-style: italic;">Client downloads changed files based on response</div>
</div>

</div>
</div>

  ---

## Phase 2: Medium Scale {#phase-2-medium-scale}

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### Assumptions {#phase2-assumptions}
                                      - **Users**: 1M - 10M
                                      - **Storage**: 100PB+
                                      - **Uploads**: 10K files/second
                                      - **Budget**: $200K - $1M/month

### Microservices with Chunking {#microservices-with-chunking}

<div class="flow-diagram" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

  <!-- API Gateway -->
<div style="display: flex; justify-content: center; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); border-radius: 12px; padding: 16px 32px; text-align: center;">
<div style="font-weight: bold; color: #ffffff;">API Gateway</div>
</div>
</div>

  <!-- Arrow -->
<div style="text-align: center; margin: 12px 0;">
<div style="border-left: 3px solid #58a6ff; height: 24px; margin: 0 auto; width: 0;"></div>
</div>

  <!-- Services Row -->
<div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 20px; flex-wrap: wrap;">
<div style="background: #f1f5f9; border: 2px solid #f0883e; border-radius: 12px; padding: 16px; text-align: center; min-width: 120px;">
<div style="font-weight: bold; color: #f0883e;">Metadata</div>
<div style="font-size: 11px; color: #475569;">Service</div>
</div>
<div style="background: #f1f5f9; border: 2px solid #58a6ff; border-radius: 12px; padding: 16px; text-align: center; min-width: 120px;">
<div style="font-weight: bold; color: #1d4ed8;">Upload</div>
<div style="font-size: 11px; color: #475569;">Service</div>
</div>
<div style="background: #f1f5f9; border: 2px solid #238636; border-radius: 12px; padding: 16px; text-align: center; min-width: 120px;">
<div style="font-weight: bold; color: #238636;">Sync</div>
<div style="font-size: 11px; color: #475569;">Service</div>
</div>
</div>

  <!-- Arrow -->
<div style="text-align: center; margin: 12px 0;">
<div style="border-left: 3px solid #58a6ff; height: 24px; margin: 0 auto; width: 0;"></div>
</div>

  <!-- Chunk Service -->
<div style="display: flex; justify-content: center; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 16px 32px; text-align: center;">
<div style="font-weight: bold; color: #ffffff;">Chunk Service</div>
</div>
</div>

  <!-- Arrow -->
<div style="text-align: center; margin: 12px 0;">
<div style="border-left: 3px solid #58a6ff; height: 24px; margin: 0 auto; width: 0;"></div>
</div>

  <!-- Blob Storage -->
<div style="background: #f1f5f9; border: 2px solid #f0883e; border-radius: 12px; padding: 20px; text-align: center;">
<div style="font-weight: bold; color: #f0883e; margin-bottom: 12px;">BLOB STORAGE</div>
<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #f0883e; color: #0d1117; padding: 8px 16px; border-radius: 8px; font-weight: bold;">S3 US</div>
<div style="background: #f0883e; color: #0d1117; padding: 8px 16px; border-radius: 8px; font-weight: bold;">S3 EU</div>
<div style="background: #f0883e; color: #0d1117; padding: 8px 16px; border-radius: 8px; font-weight: bold;">S3 AP</div>
</div>
</div>

  <!-- Bottom Data Stores -->
<div style="display: flex; justify-content: space-between; margin-top: 20px; flex-wrap: wrap; gap: 16px;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 12px 24px; text-align: center;">
<div style="font-weight: bold; color: #ffffff;">PostgreSQL</div>
<div style="font-size: 11px; color: #e5e7eb;">Cluster</div>
</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 12px 24px; text-align: center;">
<div style="font-weight: bold; color: #ffffff;">Kafka</div>
<div style="font-size: 11px; color: #e5e7eb;">Events</div>
</div>
</div>

</div>

### Delta Sync Algorithm {#delta-sync-algorithm}

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

### Conflict Resolution {#conflict-resolution}

<div class="flow-diagram" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

  <!-- Three-way diagram -->
<div style="display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap: 16px; align-items: start; margin-bottom: 24px;">

  <!-- Device A -->
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 12px; margin-bottom: 12px;">
<div style="font-weight: bold; color: #ffffff;">Device A</div>
</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 12px; font-size: 12px; color: #475569;">
  Edit file.txt<br>
<span style="color: #16a34a;">"Hello World"</span>
</div>
</div>

  <!-- Arrow -->
<div style="color: #1d4ed8; font-size: 24px; padding-top: 40px;">--></div>

  <!-- Server -->
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); border-radius: 12px; padding: 12px; margin-bottom: 12px;">
<div style="font-weight: bold; color: #ffffff;">Server</div>
</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 12px; font-size: 12px;">
<div style="color: #16a34a;">Accept A (v1 -> v2)</div>
<div style="color: #f85149; margin-top: 8px; font-weight: bold;">CONFLICT!</div>
</div>
</div>

  <!-- Arrow -->
<div style="color: #1d4ed8; font-size: 24px; padding-top: 40px;"><--</div>

  <!-- Device B -->
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 12px; margin-bottom: 12px;">
<div style="font-weight: bold; color: #ffffff;">Device B</div>
</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 12px; font-size: 12px; color: #475569;">
  Edit file.txt<br>
<span style="color: #2563eb;">"Hello Earth"</span>
</div>
</div>
</div>

  <!-- Resolution Strategies -->
<div style="display: flex; gap: 16px; flex-wrap: wrap;">
<div style="flex: 1; min-width: 200px; background: #f1f5f9; border-left: 3px solid #238636; padding: 16px; border-radius: 0 8px 8px 0;">
<div style="color: #238636; font-weight: bold; margin-bottom: 8px;">Strategy 1: Keep Both</div>
<div style="font-size: 12px; color: #475569;">
  file.txt<br>
  file (conflict from Device B).txt
</div>
</div>
<div style="flex: 1; min-width: 200px; background: #f1f5f9; border-left: 3px solid #f0883e; padding: 16px; border-radius: 0 8px 8px 0;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 8px;">Strategy 2: Last Write Wins</div>
<div style="font-size: 12px; color: #475569;">
  Use timestamp to determine winner<br>
  (with warning to other user)
</div>
</div>
</div>

</div>

</div>
</div>

  ---

## Phase 3: High Scale (Google Drive Scale) {#phase-3-high-scale}

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### Assumptions {#phase3-assumptions}
                                              - **Users**: 1B+
                                              - **Storage**: Exabytes
                                              - **Uploads**: 1M files/second
                                              - **Team**: 500+ engineers

### Global Architecture {#global-architecture}

<div class="flow-diagram" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

<div style="text-align: center; font-weight: bold; color: #a371f7; font-size: 18px; margin-bottom: 24px;">GLOBAL FILE STORAGE INFRASTRUCTURE</div>

  <!-- Edge Layer -->
<div style="background: #f1f5f9; border: 2px solid #58a6ff; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
<div style="text-align: center; font-weight: bold; color: #1d4ed8; margin-bottom: 16px;">EDGE LAYER</div>
<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 16px;">
<div style="background: #58a6ff; color: #0d1117; padding: 8px 16px; border-radius: 8px; font-weight: bold; font-size: 12px;">Edge US-East</div>
<div style="background: #58a6ff; color: #0d1117; padding: 8px 16px; border-radius: 8px; font-weight: bold; font-size: 12px;">Edge EU-West</div>
<div style="background: #58a6ff; color: #0d1117; padding: 8px 16px; border-radius: 8px; font-weight: bold; font-size: 12px;">Edge AP-South</div>
<div style="background: #58a6ff; color: #0d1117; padding: 8px 16px; border-radius: 8px; font-weight: bold; font-size: 12px;">Edge SA-East</div>
</div>
<div style="text-align: center; font-size: 12px; color: #475569;">
  Upload acceleration | Hot file caching | Thumbnail serving
</div>
</div>

  <!-- Arrow -->
<div style="text-align: center; margin: 12px 0;">
<div style="border-left: 3px solid #a371f7; height: 24px; margin: 0 auto; width: 0;"></div>
</div>

  <!-- Control Plane -->
<div style="background: #f1f5f9; border: 2px solid #f0883e; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
<div style="text-align: center; font-weight: bold; color: #f0883e; margin-bottom: 16px;">CONTROL PLANE</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px;">
<div style="background: #f8fafc; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #f0883e; font-weight: bold; font-size: 12px;">Metadata</div>
<div style="color: #475569; font-size: 10px;">Service</div>
</div>
<div style="background: #f8fafc; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #f0883e; font-weight: bold; font-size: 12px;">Quota</div>
<div style="color: #475569; font-size: 10px;">Service</div>
</div>
<div style="background: #f8fafc; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #f0883e; font-weight: bold; font-size: 12px;">Permission</div>
<div style="color: #475569; font-size: 10px;">Service</div>
</div>
<div style="background: #f8fafc; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #f0883e; font-weight: bold; font-size: 12px;">Sync</div>
<div style="color: #475569; font-size: 10px;">Service</div>
</div>
<div style="background: #f8fafc; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #f0883e; font-weight: bold; font-size: 12px;">Collab</div>
<div style="color: #475569; font-size: 10px;">Service</div>
</div>
<div style="background: #f8fafc; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #f0883e; font-weight: bold; font-size: 12px;">Search</div>
<div style="color: #475569; font-size: 10px;">Service</div>
</div>
</div>
</div>

  <!-- Arrow -->
<div style="text-align: center; margin: 12px 0;">
<div style="border-left: 3px solid #a371f7; height: 24px; margin: 0 auto; width: 0;"></div>
</div>

  <!-- Data Plane -->
<div style="background: #f1f5f9; border: 2px solid #238636; border-radius: 12px; padding: 20px;">
<div style="text-align: center; font-weight: bold; color: #238636; margin-bottom: 16px;">DATA PLANE - DISTRIBUTED BLOB STORE</div>

<div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #ffffff; font-weight: bold;">Cold Storage</div>
<div style="font-size: 10px; color: #e5e7eb;">(Glacier)</div>
</div>
<div style="background: linear-gradient(135deg, #f0883e 0%, #f79862 100%); border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #ffffff; font-weight: bold;">Warm Storage</div>
<div style="font-size: 10px; color: #e5e7eb;">(S3)</div>
</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #ffffff; font-weight: bold;">Hot Storage</div>
<div style="font-size: 10px; color: #e5e7eb;">(SSD)</div>
</div>
</div>

<div style="text-align: center; font-size: 12px; color: #475569;">
  3+ replicas across regions | Erasure coding: 1.5x overhead | 11 nines durability
</div>
</div>

</div>

### Storage Tiering {#storage-tiering}

<div style="background: #f1f5f9; border: 2px solid #8957e5; border-radius: 16px; padding: 24px; margin: 16px 0;">
<div style="text-align: center; font-weight: bold; color: #a371f7; margin-bottom: 20px; font-size: 16px;">INTELLIGENT TIERING</div>

<div style="display: flex; flex-direction: column; gap: 16px;">
  <!-- Hot Tier -->
<div style="background: linear-gradient(90deg, #238636 0%, transparent 100%); border-radius: 8px; padding: 16px;">
<div style="display: flex; justify-content: space-between; align-items: center;">
<div>
<div style="color: #16a34a; font-weight: bold;">HOT TIER (SSD, Edge Cache)</div>
<div style="font-size: 12px; color: #475569; margin-top: 4px;">Recently accessed files (< 7 days), frequently accessed files</div>
</div>
<div style="color: #16a34a; font-weight: bold;">$0.10/GB/mo</div>
</div>
</div>

  <!-- Warm Tier -->
<div style="background: linear-gradient(90deg, #f0883e 0%, transparent 100%); border-radius: 8px; padding: 16px;">
<div style="display: flex; justify-content: space-between; align-items: center;">
<div>
<div style="color: #f0883e; font-weight: bold;">WARM TIER (Standard S3)</div>
<div style="font-size: 12px; color: #475569; margin-top: 4px;">Occasional access (7-90 days), user's active files</div>
</div>
<div style="color: #f0883e; font-weight: bold;">$0.023/GB/mo</div>
</div>
</div>

  <!-- Cold Tier -->
<div style="background: linear-gradient(90deg, #1f6feb 0%, transparent 100%); border-radius: 8px; padding: 16px;">
<div style="display: flex; justify-content: space-between; align-items: center;">
<div>
<div style="color: #1d4ed8; font-weight: bold;">COLD TIER (S3 Glacier)</div>
<div style="font-size: 12px; color: #475569; margin-top: 4px;">Rarely accessed (> 90 days), archived files</div>
</div>
<div style="color: #1d4ed8; font-weight: bold;">$0.004/GB/mo</div>
</div>
</div>

  <!-- Archive Tier -->
<div style="background: linear-gradient(90deg, #8957e5 0%, transparent 100%); border-radius: 8px; padding: 16px;">
<div style="display: flex; justify-content: space-between; align-items: center;">
<div>
<div style="color: #a371f7; font-weight: bold;">ARCHIVE TIER (Glacier Deep Archive)</div>
<div style="font-size: 12px; color: #475569; margin-top: 4px;">Compliance/legal hold, 12+ hour retrieval time</div>
</div>
<div style="color: #a371f7; font-weight: bold;">$0.001/GB/mo</div>
</div>
</div>
</div>
</div>

</div>
</div>

  ---

## AWS Technologies & Alternatives {#aws-technologies-alternatives}

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

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

## Distributed Systems Considerations {#distributed-systems-considerations}

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### 1. Consistency Model {#consistency-model}

<div style="background: #f1f5f9; border: 2px solid #58a6ff; border-radius: 16px; padding: 24px; margin: 16px 0;">
<div style="text-align: center; font-weight: bold; color: #1d4ed8; margin-bottom: 20px; font-size: 16px;">CONSISTENCY GUARANTEES</div>

<div style="display: flex; flex-direction: column; gap: 16px;">
<div style="background: #f8fafc; border-left: 3px solid #238636; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #238636; font-weight: bold;">Metadata (PostgreSQL)</div>
<div style="font-size: 12px; color: #475569; margin-top: 4px;">Strong consistency | Synchronous replication</div>
</div>

<div style="background: #f8fafc; border-left: 3px solid #f0883e; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #f0883e; font-weight: bold;">File Content (S3)</div>
<div style="font-size: 12px; color: #475569; margin-top: 4px;">Read-after-write consistency | Eventual consistency for listing</div>
</div>

<div style="background: #f8fafc; border-left: 3px solid #da3633; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #f85149; font-weight: bold;">Sync State (Redis)</div>
<div style="font-size: 12px; color: #475569; margin-top: 4px;">Best-effort delivery | Client reconciliation</div>
</div>
</div>
</div>

### 2. Deduplication at Scale {#deduplication-at-scale}

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

### 3. Quota Management {#quota-management}

<div style="background: #f1f5f9; border: 2px solid #f0883e; border-radius: 16px; padding: 24px; margin: 16px 0;">
<div style="text-align: center; font-weight: bold; color: #f0883e; margin-bottom: 20px; font-size: 16px;">QUOTA SERVICE</div>

<div style="display: flex; flex-direction: column; gap: 16px;">
<div style="background: #f8fafc; border-radius: 8px; padding: 16px;">
<div style="color: #16a34a; font-weight: bold; margin-bottom: 8px;">Pre-upload check:</div>
<div style="font-family: monospace; font-size: 13px; color: #2563eb; background: #f1f5f9; padding: 8px; border-radius: 4px;">
  current_usage + file_size <= quota
</div>
</div>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 8px;">Async usage calculation:</div>
<div style="font-size: 12px; color: #475569;">
                                                    - Background job recalculates usage<br>
                                                      - Handles dedup credits<br>
                                                        - Syncs with billing
</div>
</div>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px;">
<div style="color: #1d4ed8; font-weight: bold; margin-bottom: 8px;">Redis for fast checks:</div>
<div style="font-family: monospace; font-size: 13px; color: #f85149;">
  INCRBY user:quota:123 file_size
</div>
</div>
</div>
</div>

</div>

  ---

## Interview Deep Dive Questions {#interview-deep-dive-questions}

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f0883e;">

### 1. "Why chunking instead of whole file upload?" {#q1-chunking}

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Do you understand the trade-offs of complexity vs. efficiency at scale?

**Strong Answer - Step by Step Explanation**:

**Step 1: Understanding the Problem with Whole-File Uploads**

  When a user uploads a 500MB video file over a typical home connection (50 Mbps), it takes approximately 80 seconds. If the connection drops at 90% (450MB uploaded), the user must restart from zero - wasting both time and bandwidth.

**Step 2: How Chunking Solves Resumability**

  With 4MB chunks, that 500MB file becomes 125 chunks. Here's what happens:
                                                  - Chunk 1 uploads successfully -> Server confirms receipt
                                                  - Chunk 2 uploads successfully -> Server confirms receipt
                                                  - ... Connection drops at chunk 113 (452MB transferred)
                                                  - User reconnects -> Client asks "which chunks do you have?"
                                                  - Server responds "chunks 1-112" -> Client resumes from chunk 113
                                                  - Only 48MB remaining instead of restarting 500MB

**Real-world Example**: When a user edits a 10MB PowerPoint document and adds one slide, without chunking we re-upload all 10MB. With 4MB chunks:
                                                  - Original file: 3 chunks [A, B, C]
                                                  - After edit: 3 chunks [A, B', C] - only chunk B changed
                                                  - Delta sync uploads only chunk B' (4MB) instead of 10MB = 60% bandwidth savings

**Step 3: Deduplication Math**

  Block size of 4MB means:
                                                  - A 1GB file = 256 chunks
                                                  - SHA-256 hash for each chunk = 32 bytes per chunk identifier
                                                  - Chunk manifest = 256 * 32 = 8KB metadata overhead per file

**Cross-user deduplication scenario**:
                                                  - Company sends 50MB PDF to 1,000 employees via Google Drive share
                                                  - Without dedup: 50GB stored (50MB x 1,000 copies)
                                                  - With dedup: 50MB stored (one copy, 1,000 pointers)
                                                  - Storage savings: 99.9%

**Industry data**: Dropbox reported 75% of uploaded chunks already exist in their storage, reducing storage costs from $23/GB to effectively $5.75/GB.

**Step 4: Parallel Upload Benefits**

  With chunking, a 100MB file (25 chunks) can upload 4 chunks simultaneously:
                                                  - Sequential upload at 50 Mbps: 16 seconds
                                                  - 4-parallel upload: 4 seconds
                                                  - This is why Dropbox feels faster than FTP

**When Simpler Works**:
  > "For files under 100MB and < 10K total files, whole-file upload is fine. The complexity of chunking isn't worth it. S3's multipart upload handles resumability for larger files without custom chunking logic. I'd only implement custom chunking when we have:
  > - Users uploading files > 100MB regularly
  > - Need for cross-user deduplication (saves 40%+ at scale)
  > - Requirement for delta sync (frequently edited files)"

</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #58a6ff;">

### 2. "How do you handle conflicts in collaborative editing?" {#q2-conflicts}

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Understanding of distributed systems, CAP theorem, and user experience trade-offs.

**Strong Answer - Real Conflict Scenarios**:

**Scenario 1: The Classic Two-Device Conflict**

  Alice has "report.docx" open on her laptop and phone:
  1. **11:00 AM** - Both devices sync, have version v5 (base version)
  2. **11:05 AM** - Alice edits on laptop while on train (offline), saves as v6-laptop
  3. **11:10 AM** - Alice edits on phone (has cell signal), saves as v6-phone -> Server accepts this as v6
  4. **11:30 AM** - Laptop reconnects, tries to push v6-laptop

**Conflict detected!** Server has v6-phone, laptop is pushing v6-laptop, both based on v5.

**Resolution Strategy by File Type**:

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 16px 0;">
<div style="display: grid; grid-template-columns: 1fr 2fr; gap: 12px;">
<div style="color: #f0883e; font-weight: bold;">Binary files (images, videos):</div>
<div style="color: #475569;">
  Create conflict copy: "report.docx" and "report (conflict from MacBook).docx"<br>
  Why: Binary diffs are meaningless to users, let them manually choose
</div>
<div style="color: #1d4ed8; font-weight: bold;">Text/documents:</div>
<div style="color: #475569;">
  Three-way merge: Compare v5 (base), v6-laptop, v6-phone<br>
  Auto-merge non-overlapping changes, mark conflicts for overlapping
</div>
<div style="color: #238636; font-weight: bold;">Real-time docs (Google Docs):</div>
<div style="color: #475569;">
  Operational Transform (OT): Every keystroke is an operation with position<br>
  Operations transform against each other to maintain consistency
</div>
</div>
</div>

**Scenario 2: Delete vs Edit Conflict**

  1. Bob opens "budget.xlsx" on his laptop
  2. While Bob is editing, Alice deletes the file from web UI
  3. Bob saves his changes

**Resolution options**:
                                                        - **Option A (Dropbox style)**: Bob's edit "resurrects" the file - his version wins
                                                        - **Option B (Google Drive style)**: File stays deleted, Bob sees "File no longer exists" error
                                                        - **Option C (Hybrid)**: Move Bob's version to his trash with message "This file was deleted while you were editing"

**Scenario 3: Folder Rename + File Edit**

  1. File is at `/Projects/Q1/report.docx`
  2. Alice renames folder to `/Projects/2024-Q1/`
  3. Meanwhile Bob (offline) edits `/Projects/Q1/report.docx`
  4. Bob reconnects

**The path no longer exists!** Resolution:
                                                        - Track files by unique ID, not path
                                                        - When Bob syncs, server says "file abc123 moved to /Projects/2024-Q1/"
                                                        - Bob's edit applies to new path automatically

**Conflict Resolution Code Example**:

                                                        ```python
                                                        def resolve_conflict(base_version, version_a, version_b, file_type):
                                                        if file_type in ['jpg', 'png', 'mp4', 'pdf']:
                                                        # Binary: create conflict copy
                                                        return ConflictCopy(version_a, version_b)

                                                        if file_type in ['txt', 'md', 'json']:
                                                        # Text: attempt three-way merge
                                                        merged, conflicts = three_way_merge(base_version, version_a, version_b)
                                                        if conflicts:
                                                        return MergeWithConflictMarkers(merged, conflicts)
                                                        return merged

                                                        # Default: last-write-wins with notification
                                                        winner = version_a if version_a.timestamp > version_b.timestamp else version_b
                                                        loser = version_b if winner == version_a else version_a
                                                        notify_user(loser.author, f"Your changes were superseded by {winner.author}")
                                                        return winner
                                                        ```

**Key Insight**: "Google Docs uses Operational Transform because users expect real-time character-by-character sync. Dropbox uses conflict copies because file-level sync is simpler and users don't expect real-time binary file collaboration. The choice depends on user expectations, not technical elegance."

**When Simpler Works**:
  > "For most apps, last-write-wins with a 'version history' feature is enough. Users rarely have true conflicts - most 'conflicts' are the same person on two devices. Version history lets them recover if needed. Only invest in OT/CRDT if real-time collaboration is core to your product."

</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #238636;">

### 3. "Why not just use S3 directly for everything?" {#q3-s3-directly}

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Do you understand why abstractions exist and when they're necessary?

**Strong Answer - S3 Limitations Explained**:

**Limitation 1: No Real File Hierarchy**

  S3 is a flat key-value store. When you see "folders" in S3, it's a UI illusion:
                                                        - Key: `users/alice/documents/report.docx`
                                                        - This is ONE key, not a folder structure

**Real-world problem**: "List all files in Alice's documents folder"
                                                        - S3 approach: `LIST Prefix=users/alice/documents/` - scans ALL matching keys
                                                        - Cost: $0.005 per 1,000 LIST requests
                                                        - At 1 million files per user: listing one folder = $5 and 10+ seconds

**With metadata database**:
                                                        ```sql
                                                        SELECT * FROM files WHERE user_id = 'alice' AND parent_folder_id = 'doc-folder-123'
                                                        -- Returns in 5ms using index, costs nothing extra
                                                        ```

**Limitation 2: No Native Sharing/Permissions**

  Scenario: Alice shares a folder with Bob (read-only) and Carol (can edit)

  S3 has no concept of this. You'd need to:
                                                        - Store ACLs somewhere (where? Another S3 object? Slow to check)
                                                        - Generate presigned URLs for every access (expires, can be shared)
                                                        - Implement permission checks in every API call

**With proper metadata layer**:
                                                        ```sql
                                                        -- One query to check permission
                                                        SELECT permission FROM shares
                                                        WHERE resource_id = 'file-123' AND user_id = 'bob'
                                                        -- Returns 'read' in 2ms
                                                        ```

**Limitation 3: No Content Search**

  User types "quarterly revenue" in search box:
                                                        - S3: No capability to search file contents
                                                        - You must: Download every file, extract text, build search index elsewhere
                                                        - At scale (1 billion files), this is a separate ElasticSearch cluster anyway

**Limitation 4: Sync State is Impossible in S3**

  Client asks: "What changed since my last sync (timestamp: 2024-01-15T10:30:00Z)?"

  S3 has no "get objects modified after X" query:
                                                        - You'd LIST all objects and filter by LastModified - extremely slow at scale
                                                        - No way to get deleted objects (they're gone!)

**With metadata database + change log**:
                                                        ```sql
                                                        SELECT * FROM file_changes
                                                        WHERE user_id = 'alice' AND changed_at > '2024-01-15T10:30:00Z'
                                                        ORDER BY changed_at
                                                        -- Returns changes in 10ms, includes deletions
                                                        ```

**However, S3 is Perfect For**:

  | Use Case | Why S3 Excels |
  |----------|---------------|
  | Blob storage | 11 nines durability, infinite scale, $0.023/GB |
  | Direct downloads | Signed URLs offload bandwidth from your servers |
  | Archive/backup | Glacier at $0.004/GB is cheapest reliable storage |
  | Static assets | CloudFront + S3 for global distribution |

**Architecture Split**:
                                                        - **S3**: Store the actual file bytes (chunks)
                                                        - **PostgreSQL**: Store metadata (paths, permissions, versions, sync state)
                                                        - **Redis**: Cache hot sync state for real-time updates
                                                        - **ElasticSearch**: Full-text search of file contents

**When S3 Alone Works**:
  > "For a simple file sharing app with < 100K files, you CAN use S3 directly with DynamoDB for metadata. No chunking, no sync service. Just presigned URLs for upload/download. This handles 90% of use cases for $150/month. I'd only add complexity when we need real sync, dedup, or search."

</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #8957e5;">

### 4. "How would you implement offline support?" {#q4-offline-support}

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Client-side architecture, eventual consistency, and sync complexity.

**Strong Answer - Complete Offline Architecture**:

**The Three Components of Offline Support**:

<div style="display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0;">
<div style="flex: 1; min-width: 200px; background: #f1f5f9; border: 2px solid #238636; border-radius: 12px; padding: 16px;">
<div style="color: #16a34a; font-weight: bold; margin-bottom: 8px;">1. Local Metadata Store</div>
<div style="font-size: 12px; color: #475569;">SQLite database tracking file state</div>
</div>
<div style="flex: 1; min-width: 200px; background: #f1f5f9; border: 2px solid #58a6ff; border-radius: 12px; padding: 16px;">
<div style="color: #1d4ed8; font-weight: bold; margin-bottom: 8px;">2. File System Watcher</div>
<div style="font-size: 12px; color: #475569;">Detects local changes in real-time</div>
</div>
<div style="flex: 1; min-width: 200px; background: #f1f5f9; border: 2px solid #f0883e; border-radius: 12px; padding: 16px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 8px;">3. Sync Queue</div>
<div style="font-size: 12px; color: #475569;">Pending changes to upload on reconnect</div>
</div>
</div>

**Step 1: Local SQLite Database Schema**

                                                        ```sql
                                                        CREATE TABLE local_files (
                                                        file_path TEXT PRIMARY KEY,
                                                        local_hash TEXT,           -- Hash of local file
                                                        server_hash TEXT,          -- Last known server hash
                                                        server_version INTEGER,    -- Server version number
                                                        sync_status TEXT,          -- 'synced', 'pending_upload', 'pending_download', 'conflict'
                                                        last_modified TIMESTAMP,
                                                        last_sync TIMESTAMP
                                                        );

                                                        CREATE TABLE pending_changes (
                                                        id INTEGER PRIMARY KEY,
                                                        file_path TEXT,
                                                        change_type TEXT,          -- 'create', 'modify', 'delete', 'move'
                                                        old_path TEXT,             -- For moves/renames
                                                        queued_at TIMESTAMP,
                                                        retry_count INTEGER DEFAULT 0
                                                        );
                                                        ```

**Step 2: File System Watcher Implementation**

                                                        ```python
                                                        # Using FSEvents (Mac), inotify (Linux), or ReadDirectoryChangesW (Windows)

                                                        class FileWatcher:
                                                        def __init__(self, sync_folder, db):
                                                        self.sync_folder = sync_folder
                                                        self.db = db

                                                        def on_file_changed(self, event_path, event_type):
                                                        # Debounce: wait 500ms for file to stop changing
                                                        time.sleep(0.5)

                                                        local_hash = calculate_hash(event_path)
                                                        server_hash = self.db.get_server_hash(event_path)

                                                        if local_hash != server_hash:
                                                        # File has local changes not on server
                                                        self.db.execute("""
                                                        INSERT INTO pending_changes (file_path, change_type, queued_at)
                                                        VALUES (?, 'modify', datetime('now'))
                                                        """, event_path)

                                                        self.db.execute("""
                                                        UPDATE local_files SET sync_status = 'pending_upload'
                                                        WHERE file_path = ?
                                                        """, event_path)
                                                        ```

**Step 3: Sync Engine on Reconnect**

  When network comes back, the sync engine runs this algorithm:

                                                        ```python
                                                        def sync_on_reconnect(self):
                                                        # Step 1: Get server changes since last sync
                                                        last_sync = self.db.get_last_sync_timestamp()
                                                        server_changes = self.api.get_changes(since=last_sync)

                                                        # Step 2: Get local pending changes
                                                        local_changes = self.db.query("SELECT * FROM pending_changes ORDER BY queued_at")

                                                        # Step 3: Detect conflicts
                                                        for server_change in server_changes:
                                                        local_change = find_matching_local_change(server_change.path, local_changes)

                                                        if local_change:
                                                        # CONFLICT: Both server and local changed same file
                                                        if server_change.type == 'delete' and local_change.type == 'modify':
                                                        # Server deleted, user edited -> User probably wants to keep their edit
                                                        # Re-upload as new file
                                                        self.upload_as_new(local_change.path)
                                                        elif server_change.type == 'modify' and local_change.type == 'modify':
                                                        # Both modified -> Create conflict copy
                                                        self.create_conflict_copy(local_change.path, server_change.version)
                                                        elif server_change.type == 'modify' and local_change.type == 'delete':
                                                        # Server modified, user deleted -> Restore server version
                                                        self.download_server_version(server_change)

                                                        # Step 4: Apply non-conflicting changes
                                                        for server_change in server_changes:
                                                        if not has_conflict(server_change):
                                                        if server_change.type == 'modify':
                                                        self.download_file(server_change)
                                                        elif server_change.type == 'delete':
                                                        self.delete_local_file(server_change.path)

                                                        for local_change in local_changes:
                                                        if not has_conflict(local_change):
                                                        self.upload_file(local_change)
                                                        ```

**Real-World Scenario: 2 Hours Offline on a Flight**

  1. User boards plane with laptop, internet disconnects
  2. User edits 5 documents, creates 2 new files, deletes 1 folder
  3. Meanwhile, teammate makes changes to 2 of those same documents
  4. Plane lands, laptop reconnects

**What happens**:
                                                        - Sync engine detects 8 pending local changes
                                                        - Fetches 15 server changes (teammate's edits + other team activity)
                                                        - Finds 2 conflicts (same documents edited)
                                                        - Downloads 13 non-conflicting server changes
                                                        - Uploads 6 non-conflicting local changes
                                                        - Creates 2 conflict copies with clear naming
                                                        - Shows notification: "2 files had conflicts - copies created"

**Key Insight**: "The hard part isn't the offline editing - it's the reconnection. You need to handle: files edited on both sides, files deleted remotely but edited locally, folder renames that conflict, and atomic moves. Dropbox spent years perfecting this and still has edge cases."

**When Simpler Works**:
  > "For web-only apps, skip offline entirely. For mobile apps, cache recently accessed files read-only. Full offline editing with sync is a massive engineering investment (6+ months for 2 engineers) - only build it if it's core to your product."

</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f78166;">

### 5. "How do you ensure durability and prevent data loss?" {#q5-durability}

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Understanding of storage reliability, replication strategies, and failure modes.

**Strong Answer - Defense in Depth**:

**Layer 1: S3's Built-in Durability (11 nines)**

  What does "11 nines durability" actually mean?
                                                        - 99.999999999% durability = lose 1 file per 10 billion files per year
                                                        - If you store 1 million files, expect to lose 0.0001 files per year
                                                        - In practice: you won't lose data to S3 failure

**How S3 achieves this**:
                                                        - Every object replicated to 3+ availability zones
                                                        - Each AZ is a separate data center with independent power, cooling, networking
                                                        - Checksums on every read/write operation
                                                        - Automatic corruption detection and healing

**Layer 2: Application-Level Protection**

                                                        ```python
                                                        class DurableUploadService:
                                                        def upload_chunk(self, chunk_hash, chunk_data):
                                                        # Step 1: Calculate checksum before upload
                                                        expected_checksum = md5(chunk_data)

                                                        # Step 2: Upload with checksum verification
                                                        response = self.s3.put_object(
                                                        Bucket='chunks',
                                                        Key=chunk_hash,
                                                        Body=chunk_data,
                                                        ContentMD5=base64.b64encode(expected_checksum)
                                                        # S3 rejects if checksum doesn't match!
                                                        )

                                                        # Step 3: Verify upload succeeded
                                                        if response['ResponseMetadata']['HTTPStatusCode'] != 200:
                                                        raise UploadFailedException()

                                                        # Step 4: Only NOW update metadata
                                                        # This ensures we never have metadata pointing to non-existent chunk
                                                        self.db.execute("""
                                                        UPDATE file_manifests
                                                        SET chunks = array_append(chunks, %s)
                                                        WHERE file_id = %s
                                                        """, chunk_hash, file_id)

                                                        return True
                                                        ```

**Layer 3: Write-Ahead Logging for Metadata**

  PostgreSQL already does this, but here's the concept:
  1. Before any metadata change, write to log
  2. Apply change to database
  3. Mark log entry as applied

  If crash between steps 1 and 2: replay log on restart
  If crash between steps 2 and 3: log entry replayed (idempotent operation)

**Layer 4: Cross-Region Replication**

  For critical data (enterprise tier):

                                                        ```
                                                        Primary Region (us-east-1)          Backup Region (eu-west-1)
                                                        ┌──────────────────────┐            ┌──────────────────────┐
                                                        │  S3 Bucket           │───sync───> │  S3 Bucket (replica) │
                                                        │  Aurora PostgreSQL   │───sync───> │  Aurora Read Replica │
                                                        └──────────────────────┘            └──────────────────────┘
                                                        │                                    │
                                                        │         If us-east-1 fails         │
                                                        └──────── Failover to eu-west-1 ─────┘
                                                        ```

**Cost consideration**: Cross-region replication doubles storage cost. Only enable for:
                                                        - Enterprise customers paying premium
                                                        - Compliance requirements (GDPR, HIPAA)
                                                        - Data that cannot be recreated (user uploads, not cached thumbnails)

**Layer 5: Soft Deletes (Most Important!)**

                                                        ```sql
                                                        -- Don't do this:
                                                        DELETE FROM files WHERE id = 'abc123';

                                                        -- Do this instead:
                                                        UPDATE files SET
                                                        deleted_at = NOW(),
                                                        scheduled_purge = NOW() + INTERVAL '30 days'
                                                        WHERE id = 'abc123';
                                                        ```

**Why soft deletes prevent more data loss than replication**:
                                                        - Most data loss is user error (accidental delete) or application bugs
                                                        - Cross-region replication faithfully replicates your mistake
                                                        - Soft deletes give 30-day recovery window

**Real Scenario**: Company CFO accidentally deletes "2023 Financials" folder
                                                        - With hard deletes + replication: Data is gone from both regions immediately
                                                        - With soft deletes: IT admin restores folder in 5 minutes

**Layer 6: Version History**

                                                        ```sql
                                                        CREATE TABLE file_versions (
                                                        file_id UUID,
                                                        version_number INTEGER,
                                                        chunk_manifest JSONB,      -- Which chunks make up this version
                                                        created_at TIMESTAMP,
                                                        created_by UUID,
                                                        change_description TEXT    -- "Edited by John at 3:45 PM"
                                                        );
                                                        ```

  User can browse version history and restore any previous version. This catches:
                                                        - Accidental overwrites ("I pasted the wrong data")
                                                        - Ransomware (restore pre-encryption versions)
                                                        - Collaborative mistakes ("Who broke the formatting?")

**Key Insight**: "Most data loss isn't hardware failure - it's user error or application bugs. Soft deletes and version history prevent more data loss than fancy replication schemes. S3's durability handles hardware; our job is handling human error."

**When Simpler Works**:
  > "S3's built-in durability is enough for most apps. Cross-region replication is expensive and adds latency. Only add it for compliance requirements or if you're storing irreplaceable data worth the 2x cost."

</div>
</div>

  ---

## Why This Technology? {#why-this-technology}

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Technology Decision Matrix {#technology-decision-matrix}

  | Decision | Why This Choice | Alternative Considered | When Alternative Wins |
  |----------|-----------------|----------------------|----------------------|
  | **S3 for blobs** | 11 nines durability, infinite scale, $0.023/GB | Self-hosted Ceph/Minio | Need on-prem, extreme cost optimization at 10PB+ |
  | **PostgreSQL for metadata** | ACID transactions, complex queries (sharing, search), mature tooling | DynamoDB | Need unlimited scale without sharding headaches |
  | **Redis for sync state** | Sub-millisecond latency for "what changed" queries | Kafka | Need event replay, audit log, or ordered delivery |
  | **DynamoDB for chunk index** | Consistent hashing, auto-scaling, single-digit ms | PostgreSQL | Already have Postgres, < 1B chunks |
  | **Kafka for events** | Ordered event delivery, replay capability, decoupling | Redis Pub/Sub | Simple real-time only, no replay needed |

### S3 vs Alternatives Deep Dive {#s3-vs-alternatives}

<div style="background: #f1f5f9; border-radius: 10px; padding: 20px; margin: 16px 0;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
<div style="background: #f8fafc; border: 2px solid #f0883e; border-radius: 12px; padding: 16px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">S3</div>
<div style="font-size: 12px; color: #475569;">
  Durability: 11 nines<br>
  Cost: $0.023/GB<br>
  Ecosystem: Best<br>
  Multi-region: Built-in
</div>
<div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #30363d; font-size: 11px; color: #16a34a;">
  CHOOSE WHEN: AWS ecosystem, mature tooling, global reach
</div>
</div>

<div style="background: #f8fafc; border: 2px solid #58a6ff; border-radius: 12px; padding: 16px;">
<div style="color: #1d4ed8; font-weight: bold; margin-bottom: 12px;">GCS</div>
<div style="font-size: 12px; color: #475569;">
  Durability: 11 nines<br>
  Cost: $0.020/GB<br>
  Ecosystem: Good<br>
  Multi-region: Built-in
</div>
<div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #30363d; font-size: 11px; color: #16a34a;">
  CHOOSE WHEN: GCP ecosystem, BigQuery integration, ML workloads
</div>
</div>

<div style="background: #f8fafc; border: 2px solid #8957e5; border-radius: 12px; padding: 16px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 12px;">Minio (Self-hosted)</div>
<div style="font-size: 12px; color: #475569;">
  Durability: You manage<br>
  Cost: Hardware + ops<br>
  Ecosystem: S3-compatible<br>
  Multi-region: Manual
</div>
<div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #30363d; font-size: 11px; color: #16a34a;">
  CHOOSE WHEN: On-premise required, data sovereignty, cost at 10PB+
</div>
</div>
</div>

</div>

### DynamoDB vs PostgreSQL for Metadata {#dynamodb-vs-postgresql}

<div style="background: #f1f5f9; border-radius: 10px; padding: 20px; margin: 16px 0;">

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<div style="color: #1d4ed8; font-weight: bold; margin-bottom: 12px; font-size: 16px;">PostgreSQL</div>
<div style="font-size: 13px; color: #475569; line-height: 1.6;">
<strong>Queries:</strong> Complex joins, full-text search<br>
<strong>Scale:</strong> Sharding required at 10TB+<br>
<strong>Cost:</strong> Predictable<br>
<strong>Transactions:</strong> Full ACID
</div>
<div style="margin-top: 16px; padding: 12px; background: #f8fafc; border-left: 3px solid #238636; border-radius: 0 8px 8px 0; font-size: 12px;">
<strong style="color: #16a34a;">CHOOSE WHEN:</strong><br>
  Complex permission queries, full-text search, team knows SQL, < 10TB metadata
</div>
</div>

<div>
<div style="color: #f0883e; font-weight: bold; margin-bottom: 12px; font-size: 16px;">DynamoDB</div>
<div style="font-size: 13px; color: #475569; line-height: 1.6;">
<strong>Queries:</strong> Key-value, limited<br>
<strong>Scale:</strong> Unlimited, automatic<br>
<strong>Cost:</strong> Per-request (can spike)<br>
<strong>Transactions:</strong> Limited
</div>
<div style="margin-top: 16px; padding: 12px; background: #f8fafc; border-left: 3px solid #238636; border-radius: 0 8px 8px 0; font-size: 12px;">
<strong style="color: #16a34a;">CHOOSE WHEN:</strong><br>
  Simple access patterns, extreme scale (1M+ RPS), unpredictable traffic, global tables needed
</div>
</div>
</div>

<div style="margin-top: 16px; padding: 12px; background: #f8fafc; border-radius: 8px; font-size: 13px; color: #f0883e;">
<strong>Recommendation:</strong> Start with PostgreSQL. It handles 99% of file storage apps. Migrate specific tables to DynamoDB only when you hit scaling limits.
</div>

</div>
</div>

  ---

## When Simpler Solutions Work {#when-simpler-solutions-work}

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### The "$150/month File Storage" Architecture {#simple-architecture}

<div style="background: #f1f5f9; border-radius: 10px; padding: 20px; margin: 16px 0;">

**For: < 10K files, < 1TB storage, < 1K users**

  <!-- Simple Architecture Diagram -->
<div style="background: #f8fafc; border: 2px solid #238636; border-radius: 16px; padding: 24px; margin: 16px 0;">
<div style="text-align: center; font-weight: bold; color: #16a34a; margin-bottom: 20px; font-size: 16px;">SIMPLE FILE STORAGE</div>

  <!-- Client -->
<div style="display: flex; justify-content: center; margin-bottom: 16px;">
<div style="background: #238636; color: white; padding: 12px 24px; border-radius: 8px; font-weight: bold;">Client</div>
</div>

  <!-- Arrow -->
<div style="text-align: center; margin: 8px 0;">
<div style="border-left: 2px solid #7ee787; height: 20px; margin: 0 auto; width: 0;"></div>
</div>

  <!-- Services Row -->
<div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 16px; flex-wrap: wrap;">
<div style="background: #f1f5f9; border: 2px solid #58a6ff; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #1d4ed8; font-weight: bold;">API</div>
<div style="font-size: 10px; color: #475569;">(Express)</div>
</div>
<div style="background: #f1f5f9; border: 2px solid #f0883e; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #f0883e; font-weight: bold;">Postgres</div>
<div style="font-size: 10px; color: #475569;">(Metadata)</div>
</div>
<div style="background: #f1f5f9; border: 2px solid #7ee787; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #16a34a; font-weight: bold;">S3</div>
<div style="font-size: 10px; color: #475569;">(Files)</div>
</div>
</div>

  <!-- Upload Flow -->
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin-top: 16px;">
<div style="color: #16a34a; font-weight: bold; margin-bottom: 8px;">Upload flow:</div>
<div style="font-size: 12px; color: #475569;">
  1. API creates presigned S3 URL<br>
  2. Client uploads directly to S3<br>
  3. API stores metadata in Postgres
</div>
</div>

  <!-- Cost Breakdown -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-top: 16px;">
<div style="background: #f1f5f9; padding: 8px 12px; border-radius: 6px; text-align: center;">
<div style="color: #16a34a; font-weight: bold;">S3 (1TB)</div>
<div style="font-size: 12px; color: #475569;">$23/mo</div>
</div>
<div style="background: #f1f5f9; padding: 8px 12px; border-radius: 6px; text-align: center;">
<div style="color: #1d4ed8; font-weight: bold;">RDS Postgres</div>
<div style="font-size: 12px; color: #475569;">$15/mo</div>
</div>
<div style="background: #f1f5f9; padding: 8px 12px; border-radius: 6px; text-align: center;">
<div style="color: #f0883e; font-weight: bold;">EC2</div>
<div style="font-size: 12px; color: #475569;">$15/mo</div>
</div>
<div style="background: #f1f5f9; padding: 8px 12px; border-radius: 6px; text-align: center;">
<div style="color: #a371f7; font-weight: bold;">Data Transfer</div>
<div style="font-size: 12px; color: #475569;">~$50/mo</div>
</div>
</div>

<div style="text-align: center; margin-top: 16px; color: #16a34a; font-weight: bold; font-size: 18px;">
  Total: ~$100-150/month
</div>
</div>

**What You Skip**:
                                                                                                - No chunking (S3 multipart handles large files)
                                                                                                - No delta sync (re-upload whole file - it's fine for occasional changes)
                                                                                                - No real-time collaboration (use Google Docs integration instead)
                                                                                                - No offline support (web-only is fine)

</div>

### When You Don't Need Delta Sync {#when-no-delta-sync}

<div style="background: #f1f5f9; border-radius: 10px; padding: 20px; margin: 16px 0;">

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

### Simpler Alternatives Table {#simpler-alternatives}

<div style="background: #f1f5f9; border-radius: 10px; padding: 20px; margin: 16px 0;">

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

### Decision Framework: Build vs. Buy {#build-vs-buy}

<div style="background: #f1f5f9; border-radius: 10px; padding: 20px; margin: 16px 0;">

  <!-- Decision Tree -->
<div style="background: #f8fafc; border-radius: 12px; padding: 24px;">

  <!-- Question 1 -->
<div style="text-align: center; margin-bottom: 20px;">
<div style="background: #8957e5; color: white; padding: 12px 24px; border-radius: 8px; display: inline-block; font-weight: bold;">
  Is file storage core to your product?
</div>
</div>

<div style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap;">
  <!-- YES Branch -->
<div style="text-align: center;">
<div style="color: #16a34a; font-weight: bold; margin-bottom: 12px;">YES</div>
<div style="border-left: 2px solid #7ee787; height: 20px; margin: 0 auto 12px; width: 0;"></div>

<div style="background: #238636; color: white; padding: 12px 20px; border-radius: 8px; margin-bottom: 12px;">
  Do you have 6+ months<br>and 2+ engineers?
</div>

<div style="display: flex; gap: 20px; justify-content: center;">
<div style="text-align: center;">
<div style="color: #16a34a; font-size: 12px; margin-bottom: 8px;">YES</div>
<div style="background: #f1f5f9; border: 2px solid #7ee787; padding: 8px 16px; border-radius: 6px; font-size: 12px; color: #16a34a;">
  Build custom<br>(this design)
</div>
</div>
<div style="text-align: center;">
<div style="color: #f85149; font-size: 12px; margin-bottom: 8px;">NO</div>
<div style="background: #f1f5f9; border: 2px solid #f0883e; padding: 8px 16px; border-radius: 6px; font-size: 12px; color: #f0883e;">
  Dropbox API,<br>Box API, Amplify
</div>
</div>
</div>
</div>

  <!-- NO Branch -->
<div style="text-align: center;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 12px;">NO</div>
<div style="border-left: 2px solid #f85149; height: 20px; margin: 0 auto 12px; width: 0;"></div>

<div style="background: #f1f5f9; border: 2px solid #58a6ff; padding: 12px 20px; border-radius: 8px; font-size: 13px; color: #1d4ed8;">
  Use Firebase Storage,<br>Cloudinary, or S3 + SDK
</div>
</div>
</div>
</div>

</div>
</div>
</div>

  ---

## Trade-off Analysis & Mitigation {#trade-off-analysis}

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Core Trade-offs {#core-trade-offs}

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f0883e;">

#### 1. Consistency vs. Availability {#tradeoff-consistency}

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

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #58a6ff;">

#### 2. Storage Cost vs. Access Speed {#tradeoff-storage-cost}

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

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #238636;">

#### 3. Deduplication vs. Privacy {#tradeoff-dedup-privacy}

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

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #8957e5;">

#### 4. Sync Speed vs. Battery/Bandwidth {#tradeoff-sync-speed}

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

### Risk Mitigation Matrix {#risk-mitigation}

<div style="background: #f1f5f9; border-radius: 10px; padding: 20px; margin: 16px 0;">

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

## Interview Tips {#interview-tips}

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points {#key-discussion-points}

  1. **Start simple, add complexity**: "For a startup, I'd use S3 + PostgreSQL. Here's when I'd add chunking..."
  2. **Chunking strategy**: Explain block-level dedup, resumability, delta sync - and when to skip it
  3. **Sync protocol**: Polling vs. push, delta sync vs. whole file, conflict resolution
  4. **Storage tiering**: Hot/warm/cold storage, cost optimization at scale
  5. **Security**: Encryption at rest (S3 SSE), in transit (TLS), client-side for sensitive

### Red Flags (What NOT to Say) {#red-flags}

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

### Impressive Statements (What TO Say) {#impressive-statements}

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

### Common Follow-up Questions {#common-follow-up}

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 16px 0;">

                                                                                                      - **How do you handle large files (10GB+)?** Chunking with parallel upload, resumability
                                                                                                      - **How do you ensure 11 nines durability?** S3's built-in replication, cross-region for critical data
                                                                                                      - **How do you implement real-time collaboration?** Operational Transform or CRDT, separate problem from file sync
                                                                                                      - **How do you handle offline editing?** Local SQLite + file watcher, queue changes, reconcile on reconnect
                                                                                                      - **How do you prevent malware uploads?** Async virus scanning, quarantine until scanned, signed URLs expire
                                                                                                      - **How do you handle quota?** Pre-check before upload, atomic increment, background recalculation for dedup credits

</div>
</div>
