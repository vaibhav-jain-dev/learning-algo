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

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Real-time delivery**: WebSocket + Pub/Sub
2. **Message ordering**: Timestamp-based IDs
3. **Search**: Async indexing pipeline
4. **Presence**: Heartbeat with TTL
5. **Multi-tenancy**: Cell architecture

### Common Follow-ups

- How do you handle message editing/deletion?
- How do you implement threads?
- How do you handle large channels (10K+ members)?
- How do you implement search with permissions?

</div>
