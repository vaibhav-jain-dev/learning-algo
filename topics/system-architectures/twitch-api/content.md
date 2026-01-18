# Design The Twitch API

## Problem Statement

Design a live streaming platform that enables creators to broadcast video content to millions of concurrent viewers with real-time chat.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #9146ff;">

### Core Requirements
- **Live Streaming**: Ingest, transcode, and deliver video
- **Real-time Chat**: Channel chat with moderation
- **Subscriptions**: Paid subscriber tiers
- **VOD**: Video on demand from past streams
- **Clips**: Short highlights from streams
- **Discovery**: Browse, categories, recommendations

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">TWITCH STREAMING ARCHITECTURE</h3>

```
                    BROADCASTER (OBS/Streamlabs)
                              │
                              │ RTMP Push
                              ▼
                    ┌─────────────────────┐
                    │    INGEST SERVERS   │
                    │   (Edge locations)  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   MEDIA PROCESSING  │
                    │                     │
                    │  ┌───────────────┐  │
                    │  │  Transcoder   │  │
                    │  │  (1080p→480p) │  │
                    │  └───────────────┘  │
                    │  ┌───────────────┐  │
                    │  │   Packager    │  │
                    │  │  (HLS/DASH)   │  │
                    │  └───────────────┘  │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
            ┌─────────────┐       ┌─────────────┐
            │   ORIGIN    │       │  VOD Store  │
            │   SERVERS   │       │    (S3)     │
            └──────┬──────┘       └─────────────┘
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
    ┌───────┐  ┌───────┐  ┌───────┐
    │  CDN  │  │  CDN  │  │  CDN  │
    │ Edge  │  │ Edge  │  │ Edge  │
    └───────┘  └───────┘  └───────┘
        │          │          │
        └──────────┼──────────┘
                   │
            ┌──────┴──────┐
            │   VIEWERS   │
            │ (Millions)  │
            └─────────────┘
```

</div>

---

## Live Streaming Pipeline

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">VIDEO PROCESSING PIPELINE</h4>

```
┌─────────────────────────────────────────────────────────────┐
│                 LIVE TRANSCODING PIPELINE                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  INGEST (from broadcaster):                                 │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ RTMP stream: 1080p60, 6000 kbps, x264                   ││
│  │                                                          ││
│  │ Stream key: live_abc123_xyz                             ││
│  │ Ingest server: ingest-nyc.twitch.tv                     ││
│  └─────────────────────────────────────────────────────────┘│
│                              │                               │
│                              ▼                               │
│  TRANSCODE (real-time):                                     │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Source → Multiple quality levels (ABR ladder)           ││
│  │                                                          ││
│  │ ┌───────────────────────────────────────────────────┐   ││
│  │ │ 1080p60 │ 6000 kbps │ Source quality              │   ││
│  │ ├─────────┼───────────┼─────────────────────────────┤   ││
│  │ │ 720p60  │ 3000 kbps │ Mid-tier quality            │   ││
│  │ ├─────────┼───────────┼─────────────────────────────┤   ││
│  │ │ 480p30  │ 1500 kbps │ Low bandwidth               │   ││
│  │ ├─────────┼───────────┼─────────────────────────────┤   ││
│  │ │ 360p30  │ 800 kbps  │ Mobile/poor connection      │   ││
│  │ ├─────────┼───────────┼─────────────────────────────┤   ││
│  │ │ 160p    │ 400 kbps  │ Audio only fallback         │   ││
│  │ └───────────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────┘│
│                              │                               │
│                              ▼                               │
│  PACKAGE (segmented for delivery):                          │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ HLS (.m3u8 + .ts segments)                              ││
│  │ - 2-4 second segments                                   ││
│  │ - ~10-15 second latency (normal)                        ││
│  │ - ~3-5 second latency (low-latency mode)                ││
│  │                                                          ││
│  │ segment_00001.ts, segment_00002.ts, ...                 ││
│  │ playlist.m3u8 (updated every segment)                   ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>

---

## Phase 1: Starting Phase

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Streamers**: 100 - 1,000 concurrent
- **Viewers**: 10K - 100K concurrent
- **Chat messages**: 10K - 100K/minute
- **Budget**: $10,000 - $50,000/month

### Simplified Architecture

```python
# Using cloud services for heavy lifting
class StreamService:
    def __init__(self, media_service, cdn):
        self.media = media_service  # AWS MediaLive/IVS
        self.cdn = cdn

    def create_stream(self, channel_id):
        # Create ingest endpoint
        ingest = self.media.create_channel(
            channel_id=channel_id,
            input_type='RTMP_PUSH',
            outputs=[
                {'resolution': '1080p', 'bitrate': 5000000},
                {'resolution': '720p', 'bitrate': 2500000},
                {'resolution': '480p', 'bitrate': 1200000},
            ]
        )

        return {
            'stream_key': ingest.stream_key,
            'rtmp_url': ingest.rtmp_url,
            'playback_url': f'{self.cdn.base_url}/{channel_id}/master.m3u8'
        }

    def go_live(self, channel_id):
        # Start transcoding pipeline
        self.media.start_channel(channel_id)

        # Update channel status
        Channel.update(channel_id, is_live=True, started_at=now())

        # Notify followers
        self.notify_followers(channel_id)

class ChatService:
    def __init__(self, redis):
        self.redis = redis
        self.rate_limits = {}

    def send_message(self, channel_id, user_id, message):
        # Rate limit: 1 message per second per user
        if not self.check_rate_limit(user_id):
            raise RateLimitExceeded()

        # Check if user is banned/timed out
        if self.is_restricted(channel_id, user_id):
            raise UserRestricted()

        # Publish to channel
        msg = {
            'id': uuid4(),
            'user_id': user_id,
            'message': message,
            'timestamp': time.time()
        }
        self.redis.publish(f'chat:{channel_id}', json.dumps(msg))

        return msg
```

</div>
</div>

---

## Phase 2: Medium Scale

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Chat at Scale

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
CHAT ARCHITECTURE FOR 100K+ VIEWERS

┌─────────────────────────────────────────────────────────────┐
│                    CHAT SYSTEM                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Challenge: 100K viewers, 1K messages/second per channel   │
│                                                              │
│  Solution: Hierarchical message distribution                │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │           CHAT INGEST SERVERS                           ││
│  │  (Validate, rate-limit, moderate)                       ││
│  └────────────────────────┬────────────────────────────────┘│
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐│
│  │           MESSAGE QUEUE (Kafka)                         ││
│  │  Topic: chat.{channel_id}                               ││
│  │  Partitioned by user_id % N                             ││
│  └────────────────────────┬────────────────────────────────┘│
│                           │                                  │
│           ┌───────────────┼───────────────┐                 │
│           ▼               ▼               ▼                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Edge Server │  │ Edge Server │  │ Edge Server │         │
│  │    (WS)     │  │    (WS)     │  │    (WS)     │         │
│  │             │  │             │  │             │         │
│  │ 10K conns   │  │ 10K conns   │  │ 10K conns   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                              │
│  Message Flow:                                               │
│  1. User sends message → Chat Ingest                        │
│  2. Ingest validates, writes to Kafka                       │
│  3. Edge servers consume from Kafka                         │
│  4. Edge broadcasts to connected users                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>

### Emotes and Badges

```python
class EmoteService:
    """
    Twitch has millions of emotes - efficient rendering matters.
    """

    def process_message(self, message, channel_context):
        # Parse emote tags from IRC message
        emotes = self.parse_emotes(message.tags.get('emotes', ''))

        # Build emote data for client
        emote_data = []
        for emote_id, positions in emotes.items():
            emote_data.append({
                'id': emote_id,
                'positions': positions,  # [(start, end), ...]
                'url': f'https://static-cdn.jtvnw.net/emotes/{emote_id}/1.0'
            })

        return {
            'text': message.text,
            'emotes': emote_data,
            'badges': self.get_user_badges(message.user_id, channel_context)
        }

    def get_user_badges(self, user_id, channel_id):
        badges = []

        # Global badges
        if self.is_twitch_staff(user_id):
            badges.append('staff')
        if self.is_partner(user_id):
            badges.append('partner')

        # Channel-specific badges
        sub_info = self.get_subscription(user_id, channel_id)
        if sub_info:
            badges.append(f'subscriber/{sub_info.months}')

        if self.is_moderator(user_id, channel_id):
            badges.append('moderator')
        if self.is_vip(user_id, channel_id):
            badges.append('vip')

        return badges
```

</div>
</div>

---

## Phase 3: Twitch Scale

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Concurrent streamers**: 100K+
- **Concurrent viewers**: 15M+ peak
- **Chat messages**: 10M+/minute
- **Video bandwidth**: 100+ Tbps

### Global CDN Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                    TWITCH GLOBAL VIDEO DELIVERY
    ┌────────────────────────────────────────────────────────────────┐
    │                                                                │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                    INGEST LAYER                           │ │
    │  │                                                           │ │
    │  │  Regional ingest points close to streamers               │ │
    │  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐      │ │
    │  │  │ US-EAST │  │ US-WEST │  │ EU-WEST │  │ AP-NE   │      │ │
    │  │  │ Ingest  │  │ Ingest  │  │ Ingest  │  │ Ingest  │      │ │
    │  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘      │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │                              ▼                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                  TRANSCODING LAYER                        │ │
    │  │                                                           │ │
    │  │  GPU clusters for real-time transcoding                  │ │
    │  │  - Partner streamers: Full quality ladder                │ │
    │  │  - Regular streamers: Limited transcodes                 │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │                              ▼                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                    ORIGIN LAYER                           │ │
    │  │                                                           │ │
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │ │
    │  │  │  Origin US  │  │  Origin EU  │  │  Origin AP  │       │ │
    │  │  │  (S3+cache) │  │  (S3+cache) │  │  (S3+cache) │       │ │
    │  │  └─────────────┘  └─────────────┘  └─────────────┘       │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │                              ▼                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                    EDGE CDN LAYER                         │ │
    │  │                                                           │ │
    │  │  100+ PoPs globally                                      │ │
    │  │  Cache popular streams at edge                           │ │
    │  │  ~95% cache hit rate for popular streams                 │ │
    │  │                                                           │ │
    │  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │ │
    │  │  │Edge │ │Edge │ │Edge │ │Edge │ │Edge │ │Edge │ ...    │ │
    │  │  │PoP 1│ │PoP 2│ │PoP 3│ │PoP 4│ │PoP 5│ │PoP N│        │ │
    │  │  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘        │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │                         VIEWERS                                │
    └────────────────────────────────────────────────────────────────┘
```

</div>

### Clip Creation

```go
// Real-time clip extraction
type ClipService struct {
    segmentStore SegmentStore
    vodStore     VODStore
}

func (c *ClipService) CreateClip(channelID string, clipperID string, duration int) (*Clip, error) {
    // Get recent segments from buffer (kept for ~2 hours)
    now := time.Now()
    startTime := now.Add(-time.Duration(duration) * time.Second)

    segments, err := c.segmentStore.GetRange(channelID, startTime, now)
    if err != nil {
        return nil, err
    }

    // Create clip metadata
    clip := &Clip{
        ID:        uuid.New().String(),
        ChannelID: channelID,
        ClipperID: clipperID,
        Duration:  duration,
        CreatedAt: now,
        Segments:  segments,
    }

    // Queue for processing (combine segments into single video)
    c.processQueue.Push(clip)

    // Return immediately with clip ID
    return clip, nil
}
```

</div>
</div>

---

## AWS Technologies & Alternatives

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

| Component | AWS Service | Twitch Uses | Trade-offs |
|-----------|-------------|-------------|------------|
| **Ingest** | MediaLive | Custom RTMP | Custom: More control |
| **Transcode** | MediaConvert | Custom (GPU) | Custom: Real-time |
| **CDN** | CloudFront | Custom CDN | Custom: Scale/control |
| **Chat** | API Gateway WS | IRC + Custom | IRC: Proven, extensible |
| **VOD** | S3 | S3 | Standard |
| **Analytics** | Kinesis | Kafka + Flink | Kafka: Throughput |

</div>

---

## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #9146ff;">

### 1. "Why HLS over WebRTC for streaming?"

**What They're Probing**: Understanding of streaming protocols, latency vs. scalability trade-offs, and real-world constraints.

**Strong Answer**:
> "HLS (and DASH) uses HTTP-based segment delivery, which means it works seamlessly with existing CDN infrastructure. A popular streamer with 100K viewers needs each video segment cached and served from edge locations globally. WebRTC is peer-to-peer and designed for 1:1 or small group calls - it doesn't have the CDN caching layer. The trade-off is latency: HLS typically has 10-30 second delay (3-5s with low-latency HLS), while WebRTC can achieve sub-second. But for broadcast streaming where you're sending one stream to millions, HTTP-based delivery with CDN caching is the only economically viable approach. The math: serving 100K viewers at 5Mbps via WebRTC from origin = 500 Gbps from your servers. With CDN + HLS, that's distributed across hundreds of edge PoPs with 95%+ cache hit rates."

**When Simpler Works**:
For small interactive sessions (webinars, video calls with < 50 participants), WebRTC is actually the better choice. Don't over-engineer a 10-person meeting room with HLS infrastructure.

---

### 2. "How do you scale chat for 100K+ concurrent viewers?"

**What They're Probing**: Understanding of fan-out patterns, WebSocket management, and message queue architecture.

**Strong Answer**:
> "The core challenge is fan-out: one message needs to reach 100K connected clients. You can't have one server holding 100K WebSocket connections. The architecture is hierarchical:
>
> 1. **Chat Ingest Layer**: Receives messages, validates, rate-limits (1 msg/sec/user), applies moderation rules
> 2. **Message Queue (Kafka)**: Topic per channel, ordered delivery, handles burst writes
> 3. **Edge WebSocket Servers**: Each holds ~10K connections. Consume from Kafka, broadcast to connected users
>
> For a 100K viewer stream, you need ~10 edge servers just for that channel. Key insight: chat is eventually consistent - if message delivery is delayed by 100ms between edge servers, nobody notices. This relaxed consistency requirement is what makes the architecture feasible."

**When Simpler Works**:
Most streams have < 100 viewers. A single Redis pub/sub with one WebSocket server handles this trivially. Don't build Kafka infrastructure for a 50-viewer stream.

---

### 3. "Why segment-based streaming instead of continuous?"

**What They're Probing**: Deep understanding of how live streaming actually works, CDN mechanics, and adaptive bitrate.

**Strong Answer**:
> "Segments are the key to making live streaming work at scale. Three critical reasons:
>
> 1. **CDN Caching**: A 4-second segment is a discrete file that can be cached. CDNs can't cache a continuous stream - they need finite, addressable objects.
>
> 2. **Adaptive Bitrate (ABR)**: When network conditions change, the player can switch quality at segment boundaries. Continuous streams would require complex mid-stream quality switching.
>
> 3. **Fault Tolerance**: If a viewer loses connection, they can resume from the next segment. The playlist file tells them exactly where to pick up.
>
> The trade-off is latency: each segment adds delay (segment duration + encoding time + delivery). That's why low-latency modes use smaller segments (1-2 seconds) and techniques like Chunked Transfer Encoding to start delivery before the segment is complete."

**When Simpler Works**:
For recorded video (VOD), you can pre-segment everything and not worry about real-time constraints. The complexity is in live - if you're only doing VOD, use a managed service.

---

### 4. "How do you handle a streamer going from 100 to 1M viewers in minutes?"

**What They're Probing**: Understanding of auto-scaling, CDN behavior under load, and capacity planning.

**Strong Answer**:
> "This is the 'raid' or viral moment problem. The key insight is that CDN edge caching handles most of this automatically - more viewers requesting the same segments just means higher cache hit rates at the edge.
>
> What actually breaks:
> 1. **Chat infrastructure**: Need to spin up WebSocket servers fast. Pre-provision capacity for top streamers.
> 2. **Origin servers**: First request to each edge PoP goes to origin. 100 PoPs suddenly requesting = origin spike.
> 3. **Metadata services**: Everyone loading the stream page, fetching emotes, badges, etc.
>
> Mitigations: Aggressive TTLs on static content, pre-warming CDN edges for scheduled events, capacity reservations for partner streamers, and graceful degradation (disable chat features before video)."

**When Simpler Works**:
If your max expected audience is 10K, you don't need complex auto-scaling. Pre-provision for your peak and use managed services that handle the complexity.

---

### 5. "How do you implement sub-5-second latency for live streaming?"

**What They're Probing**: Knowledge of Low-Latency HLS/DASH, chunked transfer, and the latency stack.

**Strong Answer**:
> "Standard HLS has 10-30 second latency because you wait for: segment encoding (2-4s) + segment upload + CDN propagation + player buffer (2-3 segments). Low-latency HLS (LL-HLS) attacks each component:
>
> 1. **Partial Segments**: Instead of waiting for full 4s segment, emit 200ms 'parts' using Chunked Transfer Encoding
> 2. **Playlist Delta Updates**: Instead of re-fetching entire playlist, server pushes just the delta
> 3. **Reduced Buffering**: Player buffers 2-3 parts instead of 2-3 full segments
>
> Trade-off: Lower latency = more origin requests, less cache efficiency, more rebuffering on poor connections. That's why Twitch offers it as an opt-in mode. Most viewers prefer stable playback over 5 seconds of latency."

**When Simpler Works**:
For most use cases, 10-15 second latency is fine. Viewers don't notice unless they're also in chat. Only optimize latency if interaction (polls, predictions, Q&A) is core to the experience.

</div>

---

## Why This Technology?

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Decision Matrix: When to Build vs Buy

| Requirement | Build Custom | Use Managed Service | Key Decision Factor |
|-------------|--------------|---------------------|---------------------|
| **< 100 concurrent streamers** | No | **Yes** (Mux, Cloudflare Stream) | Cost of engineering > service fees |
| **Custom transcoding profiles** | Maybe | Start managed | Only build if quality differentiation is core to product |
| **< 1000 viewers per stream** | No | **Yes** | Simple WebSocket + Redis handles this |
| **100K+ viewers per stream** | **Yes** | No | No managed service scales economically |
| **Sub-3s latency required** | **Yes** | Limited options | Most managed services are 10-15s |
| **Global audience** | Hybrid | CDN required | Use CDN for delivery, custom for ingest/transcode |
| **Chat with moderation** | Start simple | Stream Chat (e.g., PubNub) | Build custom only at scale |
| **VOD/Clips** | No | **Yes** (S3 + CloudFront) | Solved problem, don't reinvent |

### Technology Selection Rationale

```
STREAMING PROTOCOL DECISION TREE

                    What's your use case?
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
      Broadcast        Interactive      Video Call
      (1 to many)      (few to few)    (1 to 1)
           │               │               │
           ▼               ▼               ▼
    ┌──────────────┐  WebRTC or      WebRTC
    │ How many     │  LiveKit
    │ viewers?     │
    └──────┬───────┘
           │
     ┌─────┴─────┐
     ▼           ▼
  < 1000      > 1000
     │           │
     ▼           ▼
  Managed     HLS/DASH
  Service     + CDN
  (Mux, IVS)
```

### Why Twitch Built Custom Infrastructure

| Component | Why Not Managed? | The Tipping Point |
|-----------|------------------|-------------------|
| **Ingest** | Need 50+ global ingest points, custom RTMP extensions | > 10K concurrent streamers |
| **Transcoding** | Cost at scale, quality control, real-time requirements | > $50K/month in transcoding fees |
| **CDN** | 100+ Tbps bandwidth, custom caching rules, cost | > $100K/month in CDN fees |
| **Chat** | IRC protocol compatibility, custom features (emotes, badges) | > 1M concurrent chat users |

</div>

---

## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### The Reality Check

> **"For < 100 concurrent streamers, use Mux or Cloudflare Stream - don't build transcoding infrastructure."**

> **"Most streams have < 100 viewers - simple Redis pub/sub chat works perfectly."**

> **"The median Twitch stream has 0-2 viewers. Your architecture should handle the common case efficiently."**

### When YouTube Live Embed is Enough

Use YouTube/Vimeo embed when:
- You don't need custom player UI
- Latency of 20-30 seconds is acceptable
- You don't need chat integration with your platform
- You don't need viewer analytics beyond what YouTube provides
- Your business model doesn't require owning the video experience

**Cost**: Free (YouTube) to $200/month (Vimeo Premium)

### When You Don't Need Custom Transcoding

Skip building transcoding when:
- You have < 100 concurrent streamers
- You're okay with 3-4 quality levels (not custom ABR ladders)
- You don't need real-time transcoding analytics
- Standard encoding settings work for your content

**Alternative**: AWS IVS at ~$0.20/hour per channel, Mux at ~$0.05/minute

### The "$200/month Streaming Platform" Example

```
MINIMAL VIABLE STREAMING ARCHITECTURE

For: 50 concurrent streamers, 5000 total viewers, basic chat

┌─────────────────────────────────────────────────────────────┐
│                    YOUR PLATFORM                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Ingest + Transcode:    Mux or Cloudflare Stream            │
│                         ~$100/month for 50 streamers        │
│                                                              │
│  Video Delivery:        Included with Mux/CF Stream         │
│                         (they handle CDN)                   │
│                                                              │
│  Chat:                  Ably or PubNub                      │
│                         ~$50/month for 5K concurrent        │
│                         OR                                  │
│                         Single Redis + WebSocket server     │
│                         ~$20/month (DigitalOcean)           │
│                                                              │
│  User Auth + DB:        Supabase or Firebase                │
│                         ~$25/month                          │
│                                                              │
│  Hosting:               Vercel/Railway                      │
│                         ~$20/month                          │
│                                                              │
│  TOTAL:                 ~$200/month                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘

What you DON'T build:
- RTMP ingest servers
- Transcoding pipeline
- CDN infrastructure
- WebSocket scaling infrastructure
- Video player from scratch (use hls.js/video.js)
```

### Signals You've Over-Engineered

- You have Kafka for < 1000 messages/second
- You built custom transcoding for < 50 streamers
- You have multiple WebSocket server types for < 10K concurrent users
- You're managing your own CDN origin servers
- You built custom RTMP ingest before hitting managed service limits

</div>
</div>

---

## Trade-off Analysis & Mitigation

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Core Trade-offs in Live Streaming

| Trade-off | Option A | Option B | Twitch's Choice |
|-----------|----------|----------|-----------------|
| **Latency vs. Stability** | Low latency (3-5s), more rebuffering | Higher latency (15-30s), stable playback | User-selectable, default to stability |
| **Transcoding Cost vs. Quality** | Transcode all streams (expensive) | Only transcode partners (cheaper) | Tiered: Partners get all qualities |
| **Chat Consistency vs. Performance** | Strong ordering (slower) | Eventually consistent (faster) | Eventually consistent is fine for chat |
| **CDN Cost vs. Latency** | More PoPs, lower latency, higher cost | Fewer PoPs, higher latency, lower cost | Invest heavily (video is core product) |
| **Stream Key Security vs. UX** | Rotate keys frequently (secure, annoying) | Long-lived keys (convenient, riskier) | Long-lived with ability to reset |

### Mitigation Strategies

```
HANDLING COMMON FAILURE MODES

┌─────────────────────────────────────────────────────────────┐
│ FAILURE: Streamer's connection drops                         │
├─────────────────────────────────────────────────────────────┤
│ Impact: Viewers see frozen frame or error                   │
│                                                              │
│ Mitigation:                                                  │
│ 1. Keep stream "live" for 30-60 seconds (reconnect window) │
│ 2. Show "Streamer is reconnecting..." overlay               │
│ 3. Play last few seconds on loop OR show slate              │
│ 4. Allow seamless reconnect with same stream key            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FAILURE: CDN edge PoP goes down                              │
├─────────────────────────────────────────────────────────────┤
│ Impact: Viewers in that region can't load stream            │
│                                                              │
│ Mitigation:                                                  │
│ 1. DNS-based failover to next-closest PoP                   │
│ 2. Player retries with different CDN endpoint               │
│ 3. Health checks remove bad PoPs from rotation              │
│ 4. Multi-CDN for critical streams                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FAILURE: Chat message storm (viral moment)                   │
├─────────────────────────────────────────────────────────────┤
│ Impact: Chat becomes unusable, backend overloaded           │
│                                                              │
│ Mitigation:                                                  │
│ 1. Slow mode: Force N seconds between messages              │
│ 2. Sub-only mode: Reduce eligible senders                   │
│ 3. Client-side throttling: Show subset of messages          │
│ 4. R9K mode: Block duplicate/similar messages               │
│ 5. Graceful degradation: Delay messages vs. drop them       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FAILURE: Transcoding server overload                         │
├─────────────────────────────────────────────────────────────┤
│ Impact: New streams can't start or quality degrades         │
│                                                              │
│ Mitigation:                                                  │
│ 1. Queue streams by priority (partners first)               │
│ 2. Reduce quality ladder under load (skip 1080p)            │
│ 3. Auto-scale transcoding capacity                          │
│ 4. Passthrough mode: Serve source quality only              │
└─────────────────────────────────────────────────────────────┘
```

### Cost-Performance Trade-offs

| Monthly Scale | Architecture Approach | Approx. Monthly Cost |
|---------------|----------------------|---------------------|
| 10 streamers, 500 viewers | Fully managed (Mux/IVS) | $50-200 |
| 100 streamers, 5K viewers | Managed + custom chat | $500-2,000 |
| 1K streamers, 50K viewers | Hybrid (managed transcode, custom delivery) | $5,000-20,000 |
| 10K streamers, 500K viewers | Mostly custom | $50,000-200,000 |
| 100K streamers, 5M viewers | Fully custom | $500,000+ |

</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Live vs VOD**: Live requires real-time transcoding, tighter latency budgets, and different caching strategies
2. **CDN architecture**: Edge caching is what makes streaming economically viable at scale
3. **Chat scale**: The fan-out problem - one message to millions of recipients
4. **Transcoding economics**: Why partners get quality options and regular streamers don't
5. **Low latency trade-offs**: Understand the full latency stack, not just "use WebRTC"

### Common Follow-up Questions

- **"How do you handle stream drops/reconnects?"** - Reconnect window, seamless handoff, keeping stream "warm"
- **"How do you implement channel points/predictions?"** - Event-driven architecture, eventual consistency, settlement at stream end
- **"How do you moderate chat at scale?"** - AutoMod (ML-based), configurable word filters, mod tools, slow mode
- **"How do you handle raid functionality?"** - Rate limiting, capacity pre-warming, coordinated metadata update

---

### Red Flags in Your Answer

<div style="background: #3d1f1f; border-radius: 8px; padding: 16px; margin: 16px 0; border-left: 4px solid #f85149;">

- **"Use WebRTC for the main broadcast stream"** - Shows lack of understanding of scale requirements
- **"Store chat messages in SQL database"** - Missed the real-time/ephemeral nature of chat
- **"Build custom CDN from scratch"** - Unless you're at Twitch scale, this is over-engineering
- **"Single WebSocket server for all users"** - Doesn't understand connection limits (~65K per server)
- **"Transcode to all qualities for every streamer"** - Ignores cost constraints
- **"Use REST polling for chat"** - Doesn't understand real-time requirements
- **"Same architecture for 100 viewers and 100K viewers"** - Missing scale awareness

</div>

---

### Impressive Statements

<div style="background: #1f3d1f; border-radius: 8px; padding: 16px; margin: 16px 0; border-left: 4px solid #3fb950;">

- **"For < 100 concurrent streamers, I'd use Mux or AWS IVS rather than building transcoding infrastructure"** - Shows pragmatism and cost awareness
- **"The median stream has very few viewers, so the architecture should optimize for the common case while handling viral moments"** - Demonstrates understanding of real workload distribution
- **"Chat can be eventually consistent because viewers don't notice 100ms delay between edge servers"** - Shows understanding of acceptable consistency trade-offs
- **"I'd start with managed services and only build custom when we hit their limits or costs become prohibitive"** - Shows maturity and business awareness
- **"HLS latency comes from segment duration + encoding + CDN propagation + player buffer - each can be optimized independently"** - Shows deep understanding of the latency stack
- **"The key insight is that CDN caching converts an O(n) bandwidth problem into O(1) for popular content"** - Demonstrates understanding of why CDNs matter
- **"Transcoding is where Twitch differentiates - partners get priority access to limited GPU resources"** - Shows understanding of product/business constraints on architecture

</div>

---

### 30-Second Summary for Interviews

> "A streaming platform has four core systems: **Ingest** (receive RTMP from broadcasters), **Transcode** (convert to multiple qualities in real-time), **Delivery** (HLS segments via CDN), and **Chat** (WebSocket fan-out with hierarchical distribution). The key architectural insight is that video scales via CDN caching - popular streams are served from edge, making the cost per-viewer approach zero. Chat scales via hierarchical fan-out - Kafka for durability, edge WebSocket servers for connections. Start with managed services (Mux, IVS) and only build custom when you hit scale limits or need features they don't support."

</div>
