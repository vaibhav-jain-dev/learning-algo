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

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Live vs VOD**: Different latency requirements
2. **CDN architecture**: Edge caching for popular streams
3. **Chat scale**: Handling millions of messages
4. **Transcoding**: Real-time vs pre-processed
5. **Low latency**: HLS vs WebRTC trade-offs

### Common Follow-ups

- How do you handle stream drops/reconnects?
- How do you implement channel points/predictions?
- How do you moderate chat at scale?
- How do you handle raid functionality?

</div>
