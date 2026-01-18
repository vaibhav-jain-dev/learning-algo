# Design Slack

## Problem Statement

Design a real-time team communication platform with channels, direct messages, file sharing, and integrations.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #4a154b;">

### Core Requirements
- **Workspaces**: Multi-tenant team environments
- **Channels**: Public/private group conversations
- **Direct Messages**: 1-on-1 and group DMs
- **Real-time Messaging**: Instant message delivery
- **File Sharing**: Upload and share files
- **Search**: Full-text search across messages
- **Integrations**: Bots, apps, webhooks

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">SLACK SYSTEM ARCHITECTURE</h3>

```
                              ┌─────────────────┐
                              │    Clients      │
                              │ Web│iOS│Android │
                              └────────┬────────┘
                                       │
                                       │ WebSocket + REST
                                       ▼
                    ┌──────────────────────────────────┐
                    │        EDGE / API GATEWAY        │
                    │   (Auth, Rate Limit, Routing)    │
                    └──────────────────┬───────────────┘
                                       │
    ┌──────────────────────────────────┼──────────────────────────────────┐
    │                                  │                                  │
    ▼                                  ▼                                  ▼
┌─────────────┐              ┌─────────────────┐              ┌─────────────────┐
│  CHANNEL    │              │    MESSAGE      │              │   PRESENCE      │
│  SERVICE    │              │    SERVICE      │              │   SERVICE       │
│             │              │                 │              │                 │
│ - Create    │              │ - Send/Receive  │              │ - Online/Offline│
│ - Members   │              │ - Threading     │              │ - Typing        │
│ - Perms     │              │ - Reactions     │              │ - Status        │
└──────┬──────┘              └────────┬────────┘              └────────┬────────┘
       │                              │                               │
       │                              ▼                               │
       │                     ┌─────────────────┐                      │
       │                     │  REAL-TIME      │                      │
       │                     │  GATEWAY        │                      │
       │                     │                 │                      │
       │                     │ - WebSocket     │                      │
       │                     │ - Pub/Sub       │                      │
       │                     └────────┬────────┘                      │
       │                              │                               │
       └──────────────────────────────┼───────────────────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
             ┌───────────┐     ┌───────────┐     ┌───────────┐
             │ PostgreSQL│     │   Redis   │     │   S3      │
             │ (Messages)│     │ (Pub/Sub) │     │ (Files)   │
             └───────────┘     └───────────┘     └───────────┘
```

</div>

---

## Real-Time Messaging

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">MESSAGE DELIVERY FLOW</h4>

```
User A sends message in #general
           │
           ▼
┌─────────────────────────────────────────┐
│  1. HTTP POST /messages                  │
│     - Validate permissions               │
│     - Store in PostgreSQL                │
│     - Generate message_id                │
└─────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│  2. Publish to Redis Pub/Sub            │
│                                          │
│     PUBLISH channel:#general:messages   │
│     {                                    │
│       "id": "msg_123",                  │
│       "text": "Hello!",                 │
│       "user": "user_A",                 │
│       "ts": 1234567890.123              │
│     }                                    │
└─────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│  3. Real-time Gateway                    │
│                                          │
│     - Subscribed to channel:#general    │
│     - Receives message                   │
│     - Looks up connected members         │
└─────────────────────────────────────────┘
           │
    ┌──────┼──────┐
    ▼      ▼      ▼
┌──────┐ ┌──────┐ ┌──────┐
│User B│ │User C│ │User D│
│(WS)  │ │(WS)  │ │(WS)  │
└──────┘ └──────┘ └──────┘
```

</div>

---

## Phase 1: Starting Phase

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Workspaces**: 100 - 1,000
- **Users**: 5,000 - 50,000
- **Messages**: 100K - 1M/day
- **Budget**: $2,000 - $10,000/month

### Monolithic Architecture

```python
# Simple messaging service
class MessageService:
    def __init__(self, db, redis, ws_manager):
        self.db = db
        self.redis = redis
        self.ws = ws_manager

    def send_message(self, user_id, channel_id, text, thread_ts=None):
        # Validate user is in channel
        if not self.is_member(user_id, channel_id):
            raise PermissionDenied()

        # Create message
        message = Message.create(
            channel_id=channel_id,
            user_id=user_id,
            text=text,
            thread_ts=thread_ts,
            ts=time.time()
        )

        # Publish to channel subscribers
        self.redis.publish(f'channel:{channel_id}', json.dumps({
            'type': 'message',
            'channel': channel_id,
            'message': message.to_dict()
        }))

        # Update channel's latest message timestamp
        self.db.update_channel(channel_id, last_message_ts=message.ts)

        return message

    def get_messages(self, channel_id, before_ts=None, limit=100):
        query = Message.query.filter_by(channel_id=channel_id)

        if before_ts:
            query = query.filter(Message.ts < before_ts)

        return query.order_by(Message.ts.desc()).limit(limit).all()


class WebSocketHandler:
    def __init__(self, redis_pubsub):
        self.connections = {}  # user_id -> websocket
        self.subscriptions = {}  # channel_id -> set(user_ids)
        self.pubsub = redis_pubsub

    async def handle_connection(self, websocket, user_id):
        self.connections[user_id] = websocket

        # Subscribe to user's channels
        channels = get_user_channels(user_id)
        for channel in channels:
            if channel.id not in self.subscriptions:
                self.subscriptions[channel.id] = set()
                self.pubsub.subscribe(f'channel:{channel.id}')
            self.subscriptions[channel.id].add(user_id)

        try:
            async for message in websocket:
                await self.handle_message(user_id, message)
        finally:
            self.cleanup(user_id)

    async def broadcast_to_channel(self, channel_id, message):
        user_ids = self.subscriptions.get(channel_id, set())
        for user_id in user_ids:
            ws = self.connections.get(user_id)
            if ws:
                await ws.send(json.dumps(message))
```

</div>
</div>

---

## Phase 2: Medium Scale

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Microservices Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                         ┌────────────────────┐
                         │    API Gateway     │
                         │   + WebSocket LB   │
                         └─────────┬──────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│    WORKSPACE    │       │     MESSAGE     │       │    REALTIME     │
│    SERVICE      │       │     SERVICE     │       │    GATEWAY      │
│                 │       │                 │       │                 │
│ - Workspaces    │       │ - Send/Receive  │       │ - WebSocket     │
│ - Channels      │       │ - Threads       │       │ - Connections   │
│ - Members       │       │ - Reactions     │       │ - Routing       │
└────────┬────────┘       └────────┬────────┘       └────────┬────────┘
         │                         │                         │
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   │
                           ┌───────▼───────┐
                           │    Kafka      │
                           │  Event Bus    │
                           └───────┬───────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│    PRESENCE     │       │     SEARCH      │       │      FILE       │
│    SERVICE      │       │    SERVICE      │       │    SERVICE      │
│                 │       │                 │       │                 │
│ - Online/Away   │       │ - Elasticsearch │       │ - Upload        │
│ - Typing        │       │ - Index msgs    │       │ - Preview       │
│ - Status        │       │ - Query         │       │ - CDN           │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

</div>

### Message Storage Schema

```sql
-- Partitioned by workspace and time
CREATE TABLE messages (
    id UUID PRIMARY KEY,
    workspace_id UUID NOT NULL,
    channel_id UUID NOT NULL,
    user_id UUID NOT NULL,
    text TEXT,
    thread_ts DECIMAL(16,6),  -- Parent message timestamp
    ts DECIMAL(16,6) NOT NULL,  -- Slack-style timestamp
    edited_ts DECIMAL(16,6),
    deleted BOOLEAN DEFAULT FALSE,
    reactions JSONB DEFAULT '{}',
    files JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT NOW()
) PARTITION BY RANGE (ts);

-- Create partitions by month
CREATE TABLE messages_2024_01 PARTITION OF messages
    FOR VALUES FROM (1704067200) TO (1706745600);

-- Index for channel message retrieval
CREATE INDEX idx_messages_channel_ts
    ON messages (channel_id, ts DESC);

-- Index for thread retrieval
CREATE INDEX idx_messages_thread
    ON messages (channel_id, thread_ts, ts)
    WHERE thread_ts IS NOT NULL;
```

### Handling Presence at Scale

```python
class PresenceService:
    """
    Track user online status efficiently.
    """

    def __init__(self, redis):
        self.redis = redis
        self.heartbeat_interval = 30  # seconds
        self.offline_threshold = 60  # seconds

    def heartbeat(self, user_id, workspace_id):
        """Called every 30 seconds from client."""
        now = time.time()

        pipe = self.redis.pipeline()

        # Update user's last seen
        pipe.zadd(f'presence:{workspace_id}', {user_id: now})

        # Set online status
        pipe.setex(f'online:{user_id}', self.offline_threshold, '1')

        pipe.execute()

    def get_online_users(self, workspace_id):
        """Get currently online users."""
        threshold = time.time() - self.offline_threshold

        return self.redis.zrangebyscore(
            f'presence:{workspace_id}',
            threshold,
            '+inf'
        )

    def notify_status_change(self, user_id, status):
        """Notify workspace members of status change."""
        workspaces = self.get_user_workspaces(user_id)

        for ws_id in workspaces:
            self.redis.publish(f'presence:{ws_id}', json.dumps({
                'user_id': user_id,
                'status': status  # 'online', 'away', 'offline'
            }))
```

</div>
</div>

---

## Phase 3: Slack Scale

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Workspaces**: 750K+ paid
- **Users**: 20M+ daily active
- **Messages**: 1B+/day
- **Connections**: 10M+ concurrent WebSockets

### Global Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                         SLACK GLOBAL ARCHITECTURE
    ┌────────────────────────────────────────────────────────────────┐
    │                                                                │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                    EDGE LAYER                             │ │
    │  │                                                           │ │
    │  │  ┌──────────────────────────────────────────────────────┐│ │
    │  │  │              WEBSOCKET EDGE SERVERS                   ││ │
    │  │  │                                                       ││ │
    │  │  │  - Terminate WebSocket connections at edge           ││ │
    │  │  │  - Reduce latency for real-time messages             ││ │
    │  │  │  - Handle connection multiplexing                    ││ │
    │  │  │                                                       ││ │
    │  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     ││ │
    │  │  │  │US-EAST  │ │US-WEST  │ │EU-WEST  │ │AP-SOUTH │     ││ │
    │  │  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘     ││ │
    │  │  └──────────────────────────────────────────────────────┘│ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                  MESSAGE BUS (Kafka)                      │ │
    │  │                                                           │ │
    │  │  Topics:                                                  │ │
    │  │  - messages.{workspace_id}                               │ │
    │  │  - presence.{workspace_id}                               │ │
    │  │  - notifications                                          │ │
    │  │  - search.index                                          │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                  CELL ARCHITECTURE                        │ │
    │  │                                                           │ │
    │  │  Each workspace assigned to a "cell"                     │ │
    │  │  Cell = independent stack of services                    │ │
    │  │                                                           │ │
    │  │  ┌────────────┐  ┌────────────┐  ┌────────────┐          │ │
    │  │  │  CELL-1    │  │  CELL-2    │  │  CELL-N    │          │ │
    │  │  │            │  │            │  │            │          │ │
    │  │  │ 100K       │  │ 100K       │  │ 100K       │          │ │
    │  │  │ workspaces │  │ workspaces │  │ workspaces │          │ │
    │  │  │            │  │            │  │            │          │ │
    │  │  │ Postgres   │  │ Postgres   │  │ Postgres   │          │ │
    │  │  │ Redis      │  │ Redis      │  │ Redis      │          │ │
    │  │  │ Services   │  │ Services   │  │ Services   │          │ │
    │  │  └────────────┘  └────────────┘  └────────────┘          │ │
    │  └──────────────────────────────────────────────────────────┘ │
    └────────────────────────────────────────────────────────────────┘
```

</div>

### Channel Fanout Optimization

```go
// Slack's channel member routing
type ChannelRouter struct {
    memberIndex map[string][]string  // channel_id -> user_ids
    userConns   map[string][]string  // user_id -> websocket_server_ids
}

func (r *ChannelRouter) RouteMessage(channelID string, msg Message) {
    // Get channel members
    members := r.memberIndex[channelID]

    // Group by WebSocket server
    serverMessages := make(map[string][]string)
    for _, userID := range members {
        servers := r.userConns[userID]
        for _, server := range servers {
            serverMessages[server] = append(serverMessages[server], userID)
        }
    }

    // Send one message per server (batched)
    for serverID, users := range serverMessages {
        r.sendToServer(serverID, RoutedMessage{
            Channel:    channelID,
            Message:    msg,
            Recipients: users,
        })
    }
}

// Result: Instead of N messages for N members,
// send M messages where M = number of unique servers
```

</div>
</div>

---

## AWS Technologies & Alternatives

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

| Component | AWS Service | Slack Uses | Trade-offs |
|-----------|-------------|------------|------------|
| **Database** | Aurora | Vitess (MySQL) | Vitess: Horizontal scaling |
| **Cache** | ElastiCache | Memcached/Redis | Standard choices |
| **Search** | OpenSearch | Elasticsearch | ES: More mature |
| **Files** | S3 + CloudFront | S3 + CDN | Standard |
| **Realtime** | API Gateway WS | Custom | Custom: Scale/control |
| **Queue** | SQS/Kinesis | Kafka + Flink | Kafka: Better for streams |

</div>

---

## Distributed Systems Considerations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### 1. Message Ordering

```
┌─────────────────────────────────────────────────────────────┐
│            GUARANTEED MESSAGE ORDERING                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Challenge: Messages must appear in order per channel       │
│                                                              │
│  Solution: Slack Timestamp (ts)                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Format: "1234567890.123456"                             ││
│  │                                                          ││
│  │ Components:                                              ││
│  │ - Unix timestamp (seconds): 1234567890                  ││
│  │ - Microsecond precision: .123456                        ││
│  │ - Unique within channel                                  ││
│  │                                                          ││
│  │ Properties:                                              ││
│  │ - Lexicographically sortable                            ││
│  │ - Can be used as message ID                             ││
│  │ - Enables cursor-based pagination                       ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Conflict Resolution:                                        │
│  If ts collision (rare): append sequence number             │
│  "1234567890.123456" → "1234567890.123456.1"               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2. Typing Indicators

```python
# Efficient typing indicator with debouncing
class TypingService:
    def __init__(self, redis):
        self.redis = redis
        self.typing_ttl = 5  # seconds

    def set_typing(self, user_id, channel_id):
        """Mark user as typing in channel."""
        key = f'typing:{channel_id}'
        now = time.time()

        # Add to sorted set with timestamp
        self.redis.zadd(key, {user_id: now})

        # Set expiry on key
        self.redis.expire(key, self.typing_ttl)

        # Publish typing event (debounced on client)
        self.redis.publish(f'channel:{channel_id}:typing', user_id)

    def get_typing_users(self, channel_id):
        """Get users currently typing."""
        key = f'typing:{channel_id}'
        threshold = time.time() - self.typing_ttl

        # Remove expired entries
        self.redis.zremrangebyscore(key, 0, threshold)

        # Return current typers
        return self.redis.zrange(key, 0, -1)
```

### 3. Search Indexing

```
Message Indexing Pipeline:

Message Created
      │
      ▼
┌─────────────────┐
│ Kafka Topic:    │
│ search.index    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Search Indexer (Consumer)                │
│                                          │
│ - Extract text, mentions, links          │
│ - Enrich with user/channel metadata      │
│ - Handle edits (update doc)              │
│ - Handle deletes (remove doc)            │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Elasticsearch Index                      │
│                                          │
│ Index per workspace (isolation)          │
│ Sharded by channel_id                    │
└─────────────────────────────────────────┘
```

</div>

---

## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">

### 1. "Why WebSocket over Long Polling?"

<div style="background: #0d1117; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Understanding of real-time protocol trade-offs and when complexity is justified.

**Strong Answer**:
> "WebSockets provide true bidirectional communication with lower latency and overhead. Long polling creates a new HTTP connection for each message, adding ~100-200ms latency plus TCP handshake overhead. For a chat app where users expect sub-100ms message delivery, WebSocket's persistent connection is essential. However, we still need HTTP fallback for corporate firewalls that block WebSocket upgrades."

**When Simpler Works**:
- Long polling is fine for notifications (email-style, seconds-tolerance)
- Server-Sent Events (SSE) work for one-way real-time (dashboards, feeds)
- For < 100 concurrent users, long polling simplicity may win

</div>

### 2. "How do you handle message ordering across distributed servers?"

<div style="background: #0d1117; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Distributed systems fundamentals - can you reason about consistency?

**Strong Answer**:
> "We use Slack-style timestamps: `{unix_seconds}.{microseconds}` like `1234567890.123456`. These are generated at the message service (single point per channel), not the client. For ordering, we rely on:
> 1. Single-writer per channel (all messages for a channel go through one partition)
> 2. Kafka partition ordering guarantees delivery order
> 3. Client-side sorting by timestamp for display
>
> For rare collisions, we append a sequence number. True global ordering across channels isn't needed - users only see one channel at a time."

**When Simpler Works**:
- Single server? Auto-increment IDs are fine
- < 10K messages/day? Database timestamp is sufficient
- Discord uses Snowflake IDs (Twitter-style) - simpler than you'd think

</div>

### 3. "Why cell architecture for multi-tenancy?"

<div style="background: #0d1117; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Do you understand isolation, blast radius, and operational complexity trade-offs?

**Strong Answer**:
> "Cells provide fault isolation - if Cell-3's database fails, only those 100K workspaces are affected, not all 750K. It also enables:
> - Independent scaling (enterprise cell can have beefier hardware)
> - Compliance isolation (EU data stays in EU cell)
> - Gradual rollouts (test on one cell first)
>
> The trade-off is operational complexity - you're running N copies of everything. Cross-cell features (like Slack Connect between workspaces) require careful design."

**When Simpler Works**:
- < 1000 workspaces: Single tenant database with workspace_id column
- < 10K workspaces: Schema-per-tenant in shared database
- Cell architecture typically needed at 100K+ tenants or strict compliance requirements

</div>

### 4. "How would you handle a channel with 50,000 members?"

<div style="background: #0d1117; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Fanout problem understanding and creative solutions.

**Strong Answer**:
> "Large channels are a fanout nightmare. Solutions:
> 1. **Server-side batching**: Group recipients by WebSocket server, send one message per server
> 2. **Lazy delivery**: Only send to currently-connected users; offline users fetch on reconnect
> 3. **Tiered channels**: Archive messages aggressively, limit history depth
> 4. **Read receipts sampling**: Don't track reads for every user, sample or skip
>
> Slack actually limits public channels to 10K members for this reason. Discord handles 500K+ member servers by treating them as 'announcement' channels with restricted posting."

**When Simpler Works**:
- < 1000 members: Direct fanout is fine
- Pub/Sub (Redis) handles moderate fanout well
- Consider whether you really need 50K-member channels or if broadcast/announcement model works

</div>

### 5. "How do you ensure message delivery when a user is temporarily offline?"

<div style="background: #0d1117; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: At-least-once delivery, sync protocols, and state reconciliation.

**Strong Answer**:
> "We use a hybrid approach:
> 1. **Last-read pointer**: Track each user's last-seen message timestamp per channel
> 2. **Reconnection sync**: On WebSocket reconnect, client sends last-seen ts, server sends delta
> 3. **Push notifications**: For mobile, queue notifications and batch-deliver
> 4. **Unread counts**: Maintained separately in Redis for fast access
>
> We don't guarantee delivery of every real-time event (typing indicators are fire-and-forget), but messages are durable in the database and always available via fetch."

**When Simpler Works**:
- For MVP: Just refetch last N messages on reconnect
- Mobile apps can use simple pull-to-refresh
- Firebase handles offline sync automatically

</div>

</div>

---

## Why This Technology?

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Decision Matrix

| Decision | Options Considered | Choice | Rationale |
|----------|-------------------|--------|-----------|
| **Real-time Protocol** | WebSocket vs SSE vs Long Polling | WebSocket | Bidirectional, low latency, efficient for high-frequency updates |
| **Message Queue** | Kafka vs RabbitMQ vs SQS | Kafka | Ordered partitions, replay capability, high throughput |
| **Primary Database** | PostgreSQL vs MySQL vs DynamoDB | PostgreSQL (Vitess for Slack) | Strong consistency, rich queries, proven at scale |
| **Pub/Sub Layer** | Redis vs Kafka vs Custom | Redis Pub/Sub | Low latency, simple, ephemeral (perfect for presence/typing) |
| **Search** | Elasticsearch vs Algolia vs PostgreSQL FTS | Elasticsearch | Scales independently, rich query DSL, handles message volume |
| **File Storage** | S3 vs GCS vs Custom | S3 + CDN | Proven, cheap, integrates with everything |
| **Connection Management** | API Gateway WS vs Custom | Custom Gateway | Fine-grained control over 10M+ connections, cost at scale |

### Key Technology Trade-offs

```
WebSocket Gateway: Custom vs Managed (AWS API Gateway)
+------------------------------------------------------------------+
|  Managed (API Gateway WebSocket)                                 |
|  + No infrastructure to manage                                   |
|  + Auto-scaling                                                  |
|  - $1.00 per million connection-minutes                         |
|  - 10M concurrent = ~$300K/month just for connections           |
|  - Limited customization (no custom protocols)                   |
|                                                                  |
|  Custom (like Slack)                                             |
|  + Full control over protocol and optimization                   |
|  + Predictable costs at scale (~$50K/month for 10M connections) |
|  + Can implement custom batching, compression                    |
|  - Engineering cost to build and maintain                        |
|  - Need expertise in connection handling at scale                |
|                                                                  |
|  Decision Point: Custom makes sense at > 100K concurrent         |
+------------------------------------------------------------------+
```

</div>

---

## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### The $100/month Chat App

<div style="background: #161b22; border-radius: 8px; padding: 20px; margin: 16px 0;">

**Scenario**: Startup building team chat for < 1000 concurrent users

```
Architecture:
- Single Node.js server with Socket.io
- PostgreSQL on RDS ($50/month)
- Redis for pub/sub ($25/month)
- S3 for files ($10/month)
- Single EC2 t3.medium ($30/month)

Total: ~$115/month

This handles:
- 1000 concurrent WebSocket connections (Socket.io is fine)
- 100K messages/day (PostgreSQL easily handles this)
- Basic presence and typing indicators
- File uploads up to reasonable limits

You do NOT need:
- Kafka (Redis pub/sub is plenty)
- Elasticsearch (PostgreSQL ILIKE or pg_trgm)
- Cell architecture (single database)
- Custom WebSocket gateway (Socket.io works)
- Microservices (monolith is faster to build)
```

</div>

### When Firebase/Pusher is Enough

<div style="background: #161b22; border-radius: 8px; padding: 20px; margin: 16px 0;">

| Use Case | Firebase Realtime DB | Pusher | Custom |
|----------|---------------------|--------|--------|
| Concurrent users < 1K | Yes | Yes | Overkill |
| Concurrent users 1K-10K | Maybe | Yes | Consider |
| Concurrent users > 10K | No | Maybe | Yes |
| Need message history | Limited | No | Yes |
| Need search | No | No | Yes |
| Need compliance (SOC2) | Limited | Yes | Yes |
| Cost at 100K MAU | ~$500/mo | ~$400/mo | ~$200/mo |

**Firebase is perfect for**:
- MVPs and prototypes
- Mobile-first apps with offline sync
- Real-time dashboards
- Collaborative features (like Google Docs cursors)

**Pusher is perfect for**:
- Adding real-time to existing apps
- Notifications and activity feeds
- Live updates without WebSocket complexity

</div>

### When You Don't Need Cell Architecture

<div style="background: #161b22; border-radius: 8px; padding: 20px; margin: 16px 0;">

```
Single-tenant database (workspace_id column) works until:
- Individual workspace needs isolation (compliance)
- Database size exceeds single-node capacity (~5TB practical)
- You have > 10K workspaces with varying load patterns

Schema-per-tenant (Postgres schemas) works until:
- Schema migrations become painful (100+ schemas)
- Connection pooling becomes complex
- You need different hardware for different tenants

Cell architecture is needed when:
- Fault isolation is critical (enterprise SLA)
- Regulatory requirements (EU vs US data)
- Scale exceeds what shared infra can handle
- You have > 100K tenants
```

</div>

### Discord's Surprisingly Simple Architecture

<div style="background: #161b22; border-radius: 8px; padding: 20px; margin: 16px 0;">

> "Discord uses a single process per guild (server). Each guild runs on one machine. For huge guilds (500K+ members), they just use a beefier machine."

**Key Insight**: Sharding by organizational unit (guild/workspace) is simpler than you think.

```
Discord's approach:
- Guild ID determines which process handles it
- No complex distributed transactions within a guild
- Cross-guild features are eventually consistent
- Scaling = add more machines, assign new guilds to them

This works because:
- Guilds are naturally isolated
- Most operations are within one guild
- Users accept slight delays for cross-guild features
```

**For your design**: Consider whether workspace-per-process could simplify your architecture before jumping to distributed everything.

</div>

</div>
</div>

---

## Trade-off Analysis & Mitigation

<div style="background: linear-gradient(135deg, #f0883e 0%, #f9826c 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Critical Trade-offs

| Trade-off | Option A | Option B | Mitigation |
|-----------|----------|----------|------------|
| **Consistency vs Latency** | Strong consistency (all replicas) | Eventual consistency (single write) | Use eventual for messages, strong for auth/permissions |
| **Storage vs Query Speed** | Normalized schema | Denormalized/materialized | Denormalize read-heavy paths (channel list, unreads) |
| **Reliability vs Cost** | Multi-region active-active | Single region + DR | Start single region, add DR, then active-active |
| **Features vs Complexity** | Full Slack clone | MVP subset | Ship DMs + channels first, add threads/reactions later |

### Detailed Trade-off: Real-time Consistency

<div style="background: #161b22; border-radius: 8px; padding: 20px; margin: 16px 0;">

```
Problem: User A sends message, User B should see it immediately

Option 1: Synchronous (wait for delivery confirmation)
+------------------------------------------------------------------+
|  Flow: Send -> Store -> Publish -> Wait for ACKs -> Respond      |
|                                                                  |
|  Pros:                                                           |
|  - Guaranteed delivery before response                           |
|  - Simpler mental model                                          |
|                                                                  |
|  Cons:                                                           |
|  - Slow (P99 latency = slowest recipient)                       |
|  - One slow client blocks sender                                 |
|  - Doesn't scale                                                 |
+------------------------------------------------------------------+

Option 2: Asynchronous (fire and forget)
+------------------------------------------------------------------+
|  Flow: Send -> Store -> Respond -> (async) Publish to recipients |
|                                                                  |
|  Pros:                                                           |
|  - Fast response to sender                                       |
|  - Scales well                                                   |
|  - Slow recipients don't affect sender                           |
|                                                                  |
|  Cons:                                                           |
|  - Recipient might not receive immediately                       |
|  - Need separate delivery tracking                               |
+------------------------------------------------------------------+

Slack's Approach: Optimistic + Verification
+------------------------------------------------------------------+
|  1. Sender gets immediate "sent" confirmation                    |
|  2. Message stored durably (source of truth)                     |
|  3. Real-time delivery is best-effort                            |
|  4. Clients periodically sync to catch missed messages           |
|  5. Mobile uses push notifications as backup                     |
+------------------------------------------------------------------+
```

</div>

### Mitigating WebSocket Complexity

<div style="background: #161b22; border-radius: 8px; padding: 20px; margin: 16px 0;">

| Challenge | Mitigation Strategy |
|-----------|---------------------|
| Connection drops | Automatic reconnect with exponential backoff |
| Load balancer stickiness | Use connection ID routing, not IP affinity |
| Server restarts | Graceful drain: stop new connections, wait for existing to migrate |
| Memory per connection | Minimize per-connection state; use shared subscription pools |
| Thundering herd on reconnect | Jittered reconnection delays (random 0-30s) |
| Corporate firewalls | HTTP long-polling fallback |

</div>

### Cost Optimization at Scale

<div style="background: #161b22; border-radius: 8px; padding: 20px; margin: 16px 0;">

```
10M Daily Active Users - Cost Breakdown & Optimization

Before Optimization:
- Compute: $150K/month (over-provisioned for peak)
- Database: $80K/month (all data in hot storage)
- Bandwidth: $50K/month (no compression)
- Search: $40K/month (indexing everything)
Total: $320K/month

After Optimization:
- Compute: $80K/month (auto-scaling, spot instances for workers)
- Database: $45K/month (hot/cold tiering, archive old messages)
- Bandwidth: $25K/month (WebSocket compression, CDN for static)
- Search: $20K/month (index last 90 days, archive older)
Total: $170K/month

Key Optimizations:
1. Message archival: Move messages > 90 days to cold storage
2. Spot instances: Use for stateless workers (search indexer, etc.)
3. Reserved instances: For predictable base load
4. Connection multiplexing: Multiple channels per WebSocket
5. Batch operations: Group typing indicators, presence updates
```

</div>

</div>
</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Real-time delivery**: WebSocket + Pub/Sub pattern
2. **Message ordering**: Timestamp-based IDs (Snowflake or Slack-style)
3. **Search**: Async indexing pipeline with Elasticsearch
4. **Presence**: Heartbeat with TTL in Redis
5. **Multi-tenancy**: Start simple, cell architecture at scale

### What Makes a Strong Answer

<div style="background: #0d1117; border-radius: 10px; padding: 20px; margin: 16px 0;">

**Demonstrate judgment, not just knowledge**:
- "At this scale, I would... but if we grow to X, we'd need to..."
- "The trade-off here is... so I'd choose... because..."
- "This is actually simpler than it seems because..."

**Show you understand real systems**:
- "Slack uses cell architecture, but Discord shards by guild with single processes"
- "Firebase would work until about 10K concurrent users"
- "For < 1000 users, Socket.io on one server is totally fine"

</div>

### Red Flags (What NOT to Say)

<div style="background: linear-gradient(135deg, #d73a49 0%, #cb2431 100%); border-radius: 8px; padding: 20px; margin: 16px 0;">

| Red Flag | Why It's Bad | Better Alternative |
|----------|--------------|-------------------|
| "We need microservices from day one" | Over-engineering; shows lack of pragmatism | "Start monolith, extract services as needed" |
| "We'll use Kafka for everything" | Cargo culting; Kafka is overkill for small scale | "Redis pub/sub until we need replay/durability" |
| "Eventual consistency is always fine" | Ignores cases where strong consistency matters | "Eventual for messages, strong for auth/permissions" |
| "We'll build custom everything" | NIH syndrome; wastes time | "Use managed services, build custom where we differentiate" |
| "Real-time is easy, just use WebSockets" | Underestimates complexity | "WebSockets plus reconnection, ordering, and sync" |
| "We need exactly-once delivery" | Usually unnecessary and very expensive | "At-least-once with idempotency is usually sufficient" |

</div>

### Impressive Statements (What TO Say)

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 20px; margin: 16px 0;">

| Statement | Why It Impresses |
|-----------|------------------|
| "For < 1000 concurrent users, Socket.io on a single server handles this fine" | Shows pragmatism and scale awareness |
| "Discord uses a single process per guild - simpler than distributed transactions" | Demonstrates knowledge of real-world patterns |
| "Cell architecture adds operational complexity; I'd defer until we hit compliance or 100K+ tenants" | Shows understanding of when complexity is justified |
| "We don't need message ordering across channels - users view one channel at a time" | Identifies where we can relax constraints |
| "Typing indicators can be fire-and-forget; they're ephemeral and losing one doesn't matter" | Distinguishes between different reliability needs |
| "I'd start with PostgreSQL ILIKE, add pg_trgm extension, and only move to Elasticsearch at 10M+ messages" | Progressive complexity approach |
| "The real challenge isn't sending messages - it's the presence/typing fanout for large channels" | Identifies the actual hard problem |

</div>

### Common Follow-up Questions

<div style="background: #0d1117; border-radius: 10px; padding: 20px; margin: 16px 0;">

| Question | Key Points to Cover |
|----------|-------------------|
| "How do you handle message editing/deletion?" | Soft delete flag, propagate update event, handle in-flight messages |
| "How do you implement threads?" | thread_ts reference, separate query path, reply broadcast to thread subscribers |
| "How do you handle large channels (10K+ members)?" | Server-side batching, lazy delivery, consider if you even need channels this big |
| "How do you implement search with permissions?" | Index with channel_id, filter at query time, cache channel membership |
| "How do you handle a user in 500 channels?" | Lazy-load channel data, aggregate unread counts, prioritize active channels |
| "What happens when a WebSocket server crashes?" | Clients reconnect to different server, sync missed messages via last-seen pointer |
| "How do you handle mobile push notifications?" | Aggregate notifications, respect DND settings, badge counts via separate counter |

</div>

### Interview Framework: The 4-Phase Approach

<div style="background: #0d1117; border-radius: 10px; padding: 20px; margin: 16px 0;">

```
Phase 1: Clarify & Scope (2-3 minutes)
+------------------------------------------------------------------+
| - "Is this B2B like Slack or B2C like Discord?"                  |
| - "What's our scale target? 10K users or 10M?"                   |
| - "Any specific features to focus on or skip?"                   |
| - "Real-time critical or can we have slight delays?"             |
+------------------------------------------------------------------+

Phase 2: High-Level Design (10 minutes)
+------------------------------------------------------------------+
| - Draw the box diagram (clients, gateway, services, data stores) |
| - Identify the core message flow                                 |
| - Call out the hard parts: "The challenge here is..."           |
+------------------------------------------------------------------+

Phase 3: Deep Dive (15-20 minutes)
+------------------------------------------------------------------+
| - Pick 2-3 components to detail                                  |
| - Discuss trade-offs explicitly                                  |
| - Show evolution: "At 10K users... at 1M users..."              |
+------------------------------------------------------------------+

Phase 4: Extensions & Edge Cases (5-10 minutes)
+------------------------------------------------------------------+
| - How does this handle failure?                                  |
| - What about mobile/offline?                                     |
| - How would we add feature X?                                    |
+------------------------------------------------------------------+
```

</div>

</div>
