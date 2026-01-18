# Design Netflix

## Problem Statement

Design a video streaming platform that serves millions of concurrent viewers with personalized content recommendations.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #e50914;">

### Core Requirements
- **Video Streaming**: Adaptive bitrate streaming
- **Content Delivery**: Global CDN with low latency
- **Transcoding**: Multiple formats and resolutions
- **Recommendations**: Personalized content discovery
- **User Profiles**: Multiple profiles per account
- **Offline Download**: Download for offline viewing

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">NETFLIX STREAMING ARCHITECTURE</h3>

```
                                    ┌─────────────────┐
                                    │  DNS (Route53)  │
                                    │  GeoDNS Routing │
                                    └────────┬────────┘
                                             │
                    ┌────────────────────────┼────────────────────────┐
                    ▼                        ▼                        ▼
             ┌───────────┐            ┌───────────┐            ┌───────────┐
             │   OPEN    │            │   OPEN    │            │   OPEN    │
             │  CONNECT  │            │  CONNECT  │            │  CONNECT  │
             │  US-EAST  │            │  EU-WEST  │            │  AP-SOUTH │
             └─────┬─────┘            └─────┬─────┘            └─────┬─────┘
                   │                        │                        │
                   │    OPEN CONNECT CDN (ISP-Embedded Servers)     │
                   └────────────────────────┼────────────────────────┘
                                            │
                                            │ Cache Miss?
                                            ▼
                              ┌──────────────────────────┐
                              │      AWS REGION          │
                              │                          │
                              │  ┌────────────────────┐  │
                              │  │   API Gateway      │  │
                              │  │   (Zuul)           │  │
                              │  └─────────┬──────────┘  │
                              │            │             │
                              │  ┌─────────┴─────────┐   │
                              │  │                   │   │
                              │  ▼                   ▼   │
                              │┌─────────┐     ┌─────────┐│
                              ││ Playback│     │ Content ││
                              ││ Service │     │ Service ││
                              │└─────────┘     └─────────┘│
                              │                          │
                              │  ┌─────────────────────┐ │
                              │  │       S3            │ │
                              │  │   (Video Storage)   │ │
                              │  └─────────────────────┘ │
                              └──────────────────────────┘
```

</div>

---

## Video Transcoding Pipeline

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">CONTENT PROCESSING PIPELINE</h4>

```
Original Video (4K Master)
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│                    TRANSCODING PIPELINE                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Step 1: Ingest & Validate                                  │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ - Check codec compatibility                              ││
│  │ - Validate audio tracks (5.1, stereo)                   ││
│  │ - Extract subtitles                                      ││
│  │ - Generate thumbnail sprites                             ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Step 2: Encode Multiple Profiles                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                          ││
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐        ││
│  │  │  4K HDR    │  │  1080p     │  │  720p      │        ││
│  │  │  25 Mbps   │  │  8 Mbps    │  │  4 Mbps    │        ││
│  │  └────────────┘  └────────────┘  └────────────┘        ││
│  │                                                          ││
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐        ││
│  │  │  480p      │  │  360p      │  │  240p      │        ││
│  │  │  2 Mbps    │  │  1 Mbps    │  │  0.5 Mbps  │        ││
│  │  └────────────┘  └────────────┘  └────────────┘        ││
│  │                                                          ││
│  │  Encoding: H.264, H.265, VP9, AV1                       ││
│  │  Audio: AAC, Dolby Digital, Dolby Atmos                 ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Step 3: Segment for Streaming                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                          ││
│  │  Split into 4-second chunks (MPEG-DASH / HLS)           ││
│  │                                                          ││
│  │  segment_001.m4s  segment_002.m4s  segment_003.m4s ...  ││
│  │                                                          ││
│  │  Generate manifest files:                                ││
│  │  - master.m3u8 (HLS)                                    ││
│  │  - manifest.mpd (DASH)                                  ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Step 4: Distribute to CDN                                  │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Push to S3 → Replicate to Open Connect appliances     ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘

Processing Time: ~4 hours for a 2-hour movie
Storage: ~50-100GB per title (all formats)
```

</div>

---

## Phase 1: Starting Phase

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 1,000 - 50,000
- **Videos**: 100 - 1,000 titles
- **Concurrent streams**: 100 - 5,000
- **Budget**: $5,000 - $20,000/month

### Monolithic Architecture

```python
# Simple video streaming service
class VideoService:
    def __init__(self, s3, cdn, db):
        self.s3 = s3
        self.cdn = cdn
        self.db = db

    def get_playback_info(self, user_id, video_id):
        # Check subscription
        user = self.db.get_user(user_id)
        if not user.has_active_subscription():
            raise PaymentRequired()

        # Get video metadata
        video = self.db.get_video(video_id)

        # Generate signed URLs for CDN
        manifest_url = self.cdn.sign_url(
            f"videos/{video_id}/manifest.m3u8",
            expires_in=3600
        )

        # Track viewing history
        self.db.update_viewing_history(user_id, video_id)

        return {
            'manifest_url': manifest_url,
            'subtitles': video.subtitle_tracks,
            'audio_tracks': video.audio_tracks,
            'resume_position': user.get_resume_position(video_id)
        }

    def transcode_video(self, source_path, video_id):
        # Simple FFmpeg transcoding
        profiles = [
            {'resolution': '1080p', 'bitrate': '5000k'},
            {'resolution': '720p', 'bitrate': '3000k'},
            {'resolution': '480p', 'bitrate': '1500k'},
        ]

        for profile in profiles:
            output_path = f"videos/{video_id}/{profile['resolution']}"
            subprocess.run([
                'ffmpeg', '-i', source_path,
                '-c:v', 'libx264', '-b:v', profile['bitrate'],
                '-hls_time', '4', '-hls_playlist_type', 'vod',
                f"{output_path}/playlist.m3u8"
            ])
```

</div>
</div>

---

## Phase 2: Medium Scale

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 10M - 100M
- **Videos**: 10,000 - 50,000 titles
- **Concurrent streams**: 1M - 10M
- **Budget**: $5M - $50M/month

### Microservices Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                         ┌────────────────────┐
                         │    Zuul Gateway    │
                         │   (API Gateway)    │
                         └─────────┬──────────┘
                                   │
      ┌────────────────────────────┼────────────────────────────┐
      │                            │                            │
      ▼                            ▼                            ▼
┌───────────┐              ┌───────────┐              ┌───────────┐
│ Playback  │              │  User     │              │ Recommend │
│ Service   │              │ Service   │              │  Service  │
│           │              │           │              │           │
│ - Stream  │              │ - Profiles│              │ - ML      │
│ - DRM     │              │ - History │              │ - Ranking │
│ - ABR     │              │ - Billing │              │ - Trending│
└─────┬─────┘              └─────┬─────┘              └─────┬─────┘
      │                          │                          │
      └──────────────────────────┼──────────────────────────┘
                                 │
                         ┌───────▼───────┐
                         │    Kafka      │
                         │  Event Bus    │
                         └───────┬───────┘
                                 │
      ┌──────────────────────────┼──────────────────────────┐
      │                          │                          │
      ▼                          ▼                          ▼
┌───────────┐              ┌───────────┐              ┌───────────┐
│ Transcode │              │ Analytics │              │   Search  │
│ Service   │              │ Service   │              │  Service  │
│           │              │           │              │           │
│ - Encoder │              │ - Views   │              │ - Elastic │
│ - Queue   │              │ - Metrics │              │ - Titles  │
│ - Worker  │              │ - ML Train│              │ - Actors  │
└───────────┘              └───────────┘              └───────────┘
```

</div>

### Adaptive Bitrate Streaming

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```
┌─────────────────────────────────────────────────────────────┐
│              ADAPTIVE BITRATE (ABR) ALGORITHM                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Client continuously monitors:                               │
│  ├── Buffer level (current playback buffer)                 │
│  ├── Download speed (recent chunk download time)            │
│  └── Latency (round-trip time to CDN)                       │
│                                                              │
│  Decision Logic:                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                          ││
│  │  if buffer_level < 5s:                                  ││
│  │      # Emergency - drop to lowest quality               ││
│  │      select_quality('240p')                             ││
│  │                                                          ││
│  │  elif estimated_bandwidth > current_bitrate * 1.5:      ││
│  │      # Good connection - try higher quality             ││
│  │      upgrade_quality()                                   ││
│  │                                                          ││
│  │  elif estimated_bandwidth < current_bitrate * 0.8:      ││
│  │      # Degrading connection - reduce quality            ││
│  │      downgrade_quality()                                 ││
│  │                                                          ││
│  │  else:                                                   ││
│  │      # Stable - maintain current quality                ││
│  │      keep_current()                                      ││
│  │                                                          ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Quality Ladder:                                             │
│  4K (25Mbps) ↔ 1080p (8Mbps) ↔ 720p (4Mbps) ↔ 480p (2Mbps) │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>

</div>
</div>

---

## Phase 3: Netflix Scale

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 250M+ subscribers
- **Videos**: 100,000+ titles
- **Concurrent streams**: 50M+
- **15% of global internet traffic**

### Open Connect CDN

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                    OPEN CONNECT ARCHITECTURE
    ┌─────────────────────────────────────────────────────────┐
    │                                                         │
    │               AWS (Control Plane)                       │
    │  ┌─────────────────────────────────────────────────────┐│
    │  │  - Playback API                                      ││
    │  │  - Content steering (which server to use)           ││
    │  │  - DRM license servers                              ││
    │  │  - User authentication                              ││
    │  └─────────────────────────────────────────────────────┘│
    │                                                         │
    └─────────────────────────────────────────────────────────┘
                               │
                               │ Control messages
                               ▼
    ┌─────────────────────────────────────────────────────────┐
    │                                                         │
    │           OPEN CONNECT APPLIANCES                       │
    │           (Deployed inside ISPs)                        │
    │                                                         │
    │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
    │  │  AT&T   │  │ Comcast │  │ Verizon │  │Vodafone │    │
    │  │  OCA    │  │  OCA    │  │   OCA   │  │   OCA   │    │
    │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘    │
    │       │            │            │            │          │
    │  ┌────▼────────────▼────────────▼────────────▼────┐    │
    │  │                                                 │    │
    │  │  Each OCA:                                      │    │
    │  │  - 100+ TB SSD storage                         │    │
    │  │  - Serves video directly to ISP customers      │    │
    │  │  - 90%+ cache hit rate                         │    │
    │  │  - < 1ms latency to user                       │    │
    │  │                                                 │    │
    │  └─────────────────────────────────────────────────┘    │
    │                                                         │
    └─────────────────────────────────────────────────────────┘
                               │
                               │ Video streams
                               ▼
    ┌─────────────────────────────────────────────────────────┐
    │                                                         │
    │                    END USERS                            │
    │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
    │  │  📺 TV  │  │ 💻 Web  │  │ 📱 Mobile│  │ 🎮 Game │    │
    │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │
    │                                                         │
    └─────────────────────────────────────────────────────────┘
```

</div>

### Recommendation System

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">
<h4 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">PERSONALIZATION PIPELINE</h4>

```
User Signals                        Content Features
     │                                    │
     │  - Watch history                   │  - Genre, actors, director
     │  - Ratings                         │  - Language, country
     │  - Search queries                  │  - Release year
     │  - Browse patterns                 │  - Popularity
     │  - Time of day                     │  - Duration
     │  - Device type                     │
     │                                    │
     └──────────────┬─────────────────────┘
                    │
                    ▼
         ┌─────────────────────────────────────┐
         │       ML MODEL ENSEMBLE             │
         │                                     │
         │  ┌─────────────────────────────────┐│
         │  │ Collaborative Filtering         ││
         │  │ "Users like you watched..."     ││
         │  └─────────────────────────────────┘│
         │  ┌─────────────────────────────────┐│
         │  │ Content-Based Filtering         ││
         │  │ "Because you watched X..."      ││
         │  └─────────────────────────────────┘│
         │  ┌─────────────────────────────────┐│
         │  │ Deep Learning (Neural Nets)     ││
         │  │ Complex pattern recognition     ││
         │  └─────────────────────────────────┘│
         │  ┌─────────────────────────────────┐│
         │  │ Trending / Popular              ││
         │  │ What's hot right now            ││
         │  └─────────────────────────────────┘│
         └─────────────────────────────────────┘
                    │
                    ▼
         ┌─────────────────────────────────────┐
         │     RANKING & DIVERSITY             │
         │                                     │
         │  - A/B tested ranking algorithms   │
         │  - Ensure genre diversity           │
         │  - Avoid filter bubbles             │
         │  - Fresh content boost              │
         └─────────────────────────────────────┘
                    │
                    ▼
         ┌─────────────────────────────────────┐
         │     PERSONALIZED ROWS              │
         │                                     │
         │  "Continue Watching"               │
         │  "Because you watched Stranger..." │
         │  "Trending Now"                    │
         │  "New Releases"                    │
         │  "Top Picks for You"               │
         └─────────────────────────────────────┘
```

</div>

</div>
</div>

---

## AWS Technologies & Alternatives

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

| Component | AWS Service | Netflix Uses | Trade-offs |
|-----------|-------------|--------------|------------|
| **CDN** | CloudFront | Open Connect | Custom: Better peering, Higher cost |
| **Compute** | EC2/EKS | EC2 + Titus | Titus: Container orchestration |
| **Storage** | S3 | S3 | Standard choice for video |
| **Database** | DynamoDB | Cassandra | Cassandra: Multi-region writes |
| **Cache** | ElastiCache | EVCache | EVCache: Memcached-based |
| **ML** | SageMaker | Custom | Netflix: Metaflow, etc. |
| **Streaming** | Kinesis | Kafka | Kafka: Better for Netflix scale |

### Netflix OSS Stack

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 16px 0;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 16px;">
<h5 style="color: #58a6ff; margin: 0 0 8px 0;">Zuul</h5>
<p style="color: #8b949e; font-size: 12px;">API Gateway with dynamic routing</p>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 16px;">
<h5 style="color: #7ee787; margin: 0 0 8px 0;">Eureka</h5>
<p style="color: #8b949e; font-size: 12px;">Service discovery</p>
</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 16px;">
<h5 style="color: #f0883e; margin: 0 0 8px 0;">Hystrix</h5>
<p style="color: #8b949e; font-size: 12px;">Circuit breaker pattern</p>
</div>

</div>

</div>

---

## Distributed Systems Considerations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### 1. Chaos Engineering

```
┌─────────────────────────────────────────────────────────────┐
│                 CHAOS MONKEY (Netflix)                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Philosophy: "The best way to avoid failure is to fail     │
│              constantly"                                     │
│                                                              │
│  Chaos Tools:                                                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Chaos Monkey    - Randomly kills instances              ││
│  │ Chaos Gorilla   - Kills entire availability zone        ││
│  │ Chaos Kong      - Kills entire region                   ││
│  │ Latency Monkey  - Injects network delays                ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Result: Netflix stays up even during AWS outages          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2. DRM & Content Protection

```python
class DRMService:
    """
    Multi-DRM support for different platforms.
    """

    def get_license(self, user_id, video_id, drm_type):
        # Verify subscription
        if not self.verify_subscription(user_id):
            raise PaymentRequired()

        # Generate license based on DRM type
        if drm_type == 'widevine':  # Android, Chrome
            return self.widevine_server.generate_license(video_id)
        elif drm_type == 'fairplay':  # Apple devices
            return self.fairplay_server.generate_license(video_id)
        elif drm_type == 'playready':  # Windows, Xbox
            return self.playready_server.generate_license(video_id)
```

### 3. Content Steering

```
┌─────────────────────────────────────────────────────────────┐
│              INTELLIGENT CDN ROUTING                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  When user requests video:                                  │
│                                                              │
│  1. Playback API receives request                          │
│  2. Evaluate available OCAs:                                │
│     - Geographic proximity                                  │
│     - Current load                                          │
│     - Health status                                         │
│     - ISP relationship                                      │
│                                                              │
│  3. Return ranked list of servers                          │
│     manifest.m3u8 contains:                                │
│     - Primary server URL                                   │
│     - Fallback server URLs                                 │
│                                                              │
│  4. Client switches servers if:                            │
│     - Current server becomes slow                          │
│     - Connection drops                                      │
│     - Buffer runs low                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **CDN architecture**: Why Netflix built Open Connect
2. **Transcoding**: Multiple formats, parallel processing
3. **ABR streaming**: Client-side adaptation
4. **Recommendations**: ML-based personalization
5. **Chaos engineering**: Building resilience

### Common Follow-ups

- How do you handle live streaming (like sports)?
- How do you prevent password sharing?
- How do you optimize for mobile networks?
- How do you handle regional content licensing?

</div>
