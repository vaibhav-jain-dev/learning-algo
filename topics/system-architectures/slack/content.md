# Design Slack

## Problem Statement

Design a real-time team communication platform with channels, direct messages, file sharing, and integrations.

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #4a154b;">

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #1d4ed8; text-align: center; margin: 0 0 24px 0;">SLACK SYSTEM ARCHITECTURE</h3>

<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">

<!-- Clients Layer -->
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 16px 32px; text-align: center; min-width: 200px;">
<div style="color: #ffffff; font-weight: bold; font-size: 14px;">CLIENTS</div>
<div style="color: #dcfce7; font-size: 12px; margin-top: 4px;">Web | iOS | Android</div>
</div>

<!-- Arrow -->
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="width: 2px; height: 20px; background: #58a6ff;"></div>
<div style="color: #475569; font-size: 11px; padding: 4px 8px;">WebSocket + REST</div>
<div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #58a6ff;"></div>
</div>

<!-- Edge/API Gateway -->
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 20px 40px; text-align: center; min-width: 400px;">
<div style="color: #1e293b; font-weight: bold; font-size: 14px;">EDGE / API GATEWAY</div>
<div style="color: #3b82f6; font-size: 12px; margin-top: 4px;">Auth, Rate Limit, Routing</div>
</div>

<!-- Arrow -->
<div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #58a6ff; margin: 8px 0;"></div>

<!-- Services Row -->
<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">

<div style="background: #f8fafc; border: 2px solid #f0883e; border-radius: 12px; padding: 16px; min-width: 150px;">
<div style="color: #f0883e; font-weight: bold; font-size: 13px; text-align: center;">CHANNEL SERVICE</div>
<div style="color: #475569; font-size: 11px; margin-top: 8px;">
<div>- Create channels</div>
<div>- Manage members</div>
<div>- Handle permissions</div>
</div>
</div>

<div style="background: #f8fafc; border: 2px solid #a371f7; border-radius: 12px; padding: 16px; min-width: 150px;">
<div style="color: #a371f7; font-weight: bold; font-size: 13px; text-align: center;">MESSAGE SERVICE</div>
<div style="color: #475569; font-size: 11px; margin-top: 8px;">
<div>- Send/Receive</div>
<div>- Threading</div>
<div>- Reactions</div>
</div>
</div>

<div style="background: #f8fafc; border: 2px solid #58a6ff; border-radius: 12px; padding: 16px; min-width: 150px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 13px; text-align: center;">PRESENCE SERVICE</div>
<div style="color: #475569; font-size: 11px; margin-top: 8px;">
<div>- Online/Offline</div>
<div>- Typing indicators</div>
<div>- Status updates</div>
</div>
</div>

</div>

<!-- Arrow -->
<div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #58a6ff; margin: 8px 0;"></div>

<!-- Real-time Gateway -->
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 20px 40px; text-align: center; min-width: 300px;">
<div style="color: #1e293b; font-weight: bold; font-size: 14px;">REAL-TIME GATEWAY</div>
<div style="color: #7c3aed; font-size: 12px; margin-top: 4px;">WebSocket Connections | Pub/Sub Routing</div>
</div>

<!-- Arrow -->
<div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #58a6ff; margin: 8px 0;"></div>

<!-- Data Stores Row -->
<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">

<div style="background: linear-gradient(135deg, #0969da 0%, #218bff 100%); border-radius: 10px; padding: 14px 20px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 12px;">PostgreSQL</div>
<div style="color: #3b82f6; font-size: 10px;">(Messages)</div>
</div>

<div style="background: linear-gradient(135deg, #b62324 0%, #da3633 100%); border-radius: 10px; padding: 14px 20px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 12px;">Redis</div>
<div style="color: #dc2626; font-size: 10px;">(Pub/Sub)</div>
</div>

<div style="background: linear-gradient(135deg, #f0883e 0%, #f9826c 100%); border-radius: 10px; padding: 14px 20px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 12px;">S3</div>
<div style="color: #ea580c; font-size: 10px;">(Files)</div>
</div>

</div>

</div>

</div>

---

## Real-Time Messaging

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">MESSAGE DELIVERY FLOW</h4>

<div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">

<!-- Trigger -->
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 12px 24px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 13px;">User A sends message in #general</div>
</div>

<!-- Arrow -->
<div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #58a6ff;"></div>

<!-- Step 1 -->
<div style="background: #f8fafc; border: 2px solid #58a6ff; border-radius: 12px; padding: 16px 24px; max-width: 450px; width: 100%;">
<div style="color: #58a6ff; font-weight: bold; font-size: 13px; margin-bottom: 8px;">1. HTTP POST /messages</div>
<div style="color: #475569; font-size: 12px; line-height: 1.6;">
<div>- Validate user permissions for channel</div>
<div>- Store message in PostgreSQL</div>
<div>- Generate unique message_id (timestamp-based)</div>
</div>
</div>

<!-- Arrow -->
<div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #58a6ff;"></div>

<!-- Step 2 -->
<div style="background: #f8fafc; border: 2px solid #a371f7; border-radius: 12px; padding: 16px 24px; max-width: 450px; width: 100%;">
<div style="color: #a371f7; font-weight: bold; font-size: 13px; margin-bottom: 8px;">2. Publish to Redis Pub/Sub</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 12px; margin-top: 8px; font-family: monospace; font-size: 11px; color: #16a34a;">
<div style="color: #ff7b72;">PUBLISH</div> channel:#general:messages
<div style="margin-top: 6px; color: #475569;">{</div>
<div style="padding-left: 12px; color: #2563eb;">"id": "msg_123",</div>
<div style="padding-left: 12px; color: #2563eb;">"text": "Hello!",</div>
<div style="padding-left: 12px; color: #2563eb;">"user": "user_A",</div>
<div style="padding-left: 12px; color: #2563eb;">"ts": 1234567890.123</div>
<div style="color: #475569;">}</div>
</div>
</div>

<!-- Arrow -->
<div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #58a6ff;"></div>

<!-- Step 3 -->
<div style="background: #f8fafc; border: 2px solid #f0883e; border-radius: 12px; padding: 16px 24px; max-width: 450px; width: 100%;">
<div style="color: #f0883e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">3. Real-time Gateway</div>
<div style="color: #475569; font-size: 12px; line-height: 1.6;">
<div>- Subscribed to channel:#general topic</div>
<div>- Receives message from Redis</div>
<div>- Looks up connected channel members</div>
</div>
</div>

<!-- Arrow -->
<div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #58a6ff;"></div>

<!-- Recipients -->
<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 8px; padding: 10px 16px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 12px;">User B</div>
<div style="color: #3b82f6; font-size: 10px;">(WebSocket)</div>
</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 8px; padding: 10px 16px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 12px;">User C</div>
<div style="color: #3b82f6; font-size: 10px;">(WebSocket)</div>
</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 8px; padding: 10px 16px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 12px;">User D</div>
<div style="color: #3b82f6; font-size: 10px;">(WebSocket)</div>
</div>
</div>

</div>

</div>

---

## Phase 1: Starting Phase

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

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
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### Microservices Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">

<!-- API Gateway -->
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px 32px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 14px;">API Gateway + WebSocket LB</div>
</div>

<!-- Arrow -->
<div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #58a6ff;"></div>

<!-- Services Row 1 -->
<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">

<div style="background: #f8fafc; border: 2px solid #f0883e; border-radius: 12px; padding: 16px; min-width: 160px;">
<div style="color: #f0883e; font-weight: bold; font-size: 13px; text-align: center;">WORKSPACE SERVICE</div>
<div style="color: #475569; font-size: 11px; margin-top: 8px;">
<div>- Workspaces</div>
<div>- Channels</div>
<div>- Members</div>
</div>
</div>

<div style="background: #f8fafc; border: 2px solid #a371f7; border-radius: 12px; padding: 16px; min-width: 160px;">
<div style="color: #a371f7; font-weight: bold; font-size: 13px; text-align: center;">MESSAGE SERVICE</div>
<div style="color: #475569; font-size: 11px; margin-top: 8px;">
<div>- Send/Receive</div>
<div>- Threads</div>
<div>- Reactions</div>
</div>
</div>

<div style="background: #f8fafc; border: 2px solid #58a6ff; border-radius: 12px; padding: 16px; min-width: 160px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 13px; text-align: center;">REALTIME GATEWAY</div>
<div style="color: #475569; font-size: 11px; margin-top: 8px;">
<div>- WebSocket</div>
<div>- Connections</div>
<div>- Routing</div>
</div>
</div>

</div>

<!-- Arrow -->
<div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #58a6ff; margin: 8px 0;"></div>

<!-- Kafka Event Bus -->
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 16px 40px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 14px;">Kafka Event Bus</div>
</div>

<!-- Arrow -->
<div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #58a6ff; margin: 8px 0;"></div>

<!-- Services Row 2 -->
<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">

<div style="background: #f8fafc; border: 2px solid #238636; border-radius: 12px; padding: 16px; min-width: 160px;">
<div style="color: #238636; font-weight: bold; font-size: 13px; text-align: center;">PRESENCE SERVICE</div>
<div style="color: #475569; font-size: 11px; margin-top: 8px;">
<div>- Online/Away</div>
<div>- Typing</div>
<div>- Status</div>
</div>
</div>

<div style="background: #f8fafc; border: 2px solid #f85149; border-radius: 12px; padding: 16px; min-width: 160px;">
<div style="color: #f85149; font-weight: bold; font-size: 13px; text-align: center;">SEARCH SERVICE</div>
<div style="color: #475569; font-size: 11px; margin-top: 8px;">
<div>- Elasticsearch</div>
<div>- Index msgs</div>
<div>- Query</div>
</div>
</div>

<div style="background: #f8fafc; border: 2px solid #d29922; border-radius: 12px; padding: 16px; min-width: 160px;">
<div style="color: #d29922; font-weight: bold; font-size: 13px; text-align: center;">FILE SERVICE</div>
<div style="color: #475569; font-size: 11px; margin-top: 8px;">
<div>- Upload</div>
<div>- Preview</div>
<div>- CDN</div>
</div>
</div>

</div>

</div>

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
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### Assumptions
- **Workspaces**: 750K+ paid
- **Users**: 20M+ daily active
- **Messages**: 1B+/day
- **Connections**: 10M+ concurrent WebSockets

### Global Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

<h4 style="color: #a371f7; text-align: center; margin: 0 0 24px 0;">SLACK GLOBAL ARCHITECTURE</h4>

<!-- Edge Layer -->
<div style="background: #f8fafc; border: 2px solid #58a6ff; border-radius: 16px; padding: 20px; margin-bottom: 16px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 16px;">EDGE LAYER</div>

<div style="background: #f1f5f9; border-radius: 12px; padding: 16px;">
<div style="color: #16a34a; font-weight: bold; font-size: 13px; margin-bottom: 12px;">WEBSOCKET EDGE SERVERS</div>
<div style="color: #475569; font-size: 12px; line-height: 1.8; margin-bottom: 16px;">
<div>- Terminate WebSocket connections at edge for low latency</div>
<div>- Reduce round-trip time for real-time messages</div>
<div>- Handle connection multiplexing (multiple channels per socket)</div>
</div>

<div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
<div style="background: #238636; border-radius: 8px; padding: 10px 16px; color: #1e293b; font-size: 12px; font-weight: bold;">US-EAST</div>
<div style="background: #1f6feb; border-radius: 8px; padding: 10px 16px; color: #1e293b; font-size: 12px; font-weight: bold;">US-WEST</div>
<div style="background: #a371f7; border-radius: 8px; padding: 10px 16px; color: #1e293b; font-size: 12px; font-weight: bold;">EU-WEST</div>
<div style="background: #f0883e; border-radius: 8px; padding: 10px 16px; color: #1e293b; font-size: 12px; font-weight: bold;">AP-SOUTH</div>
</div>
</div>
</div>

<!-- Arrow -->
<div style="display: flex; justify-content: center; margin: 8px 0;">
<div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #58a6ff;"></div>
</div>

<!-- Message Bus -->
<div style="background: #f8fafc; border: 2px solid #f0883e; border-radius: 16px; padding: 20px; margin-bottom: 16px;">
<div style="color: #f0883e; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 12px;">MESSAGE BUS (Kafka)</div>
<div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
<div style="background: #f1f5f9; border-radius: 6px; padding: 8px 12px; color: #2563eb; font-size: 11px; font-family: monospace;">messages.{workspace_id}</div>
<div style="background: #f1f5f9; border-radius: 6px; padding: 8px 12px; color: #2563eb; font-size: 11px; font-family: monospace;">presence.{workspace_id}</div>
<div style="background: #f1f5f9; border-radius: 6px; padding: 8px 12px; color: #2563eb; font-size: 11px; font-family: monospace;">notifications</div>
<div style="background: #f1f5f9; border-radius: 6px; padding: 8px 12px; color: #2563eb; font-size: 11px; font-family: monospace;">search.index</div>
</div>
</div>

<!-- Arrow -->
<div style="display: flex; justify-content: center; margin: 8px 0;">
<div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #58a6ff;"></div>
</div>

<!-- Cell Architecture -->
<div style="background: #f8fafc; border: 2px solid #a371f7; border-radius: 16px; padding: 20px;">
<div style="color: #a371f7; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 8px;">CELL ARCHITECTURE</div>
<div style="color: #475569; font-size: 12px; text-align: center; margin-bottom: 16px;">Each workspace assigned to a "cell" = independent stack of services</div>

<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 16px; min-width: 140px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 13px;">CELL-1</div>
<div style="color: #d4f8d4; font-size: 11px; margin-top: 8px;">100K workspaces</div>
<div style="border-top: 1px solid rgba(255,255,255,0.2); margin-top: 10px; padding-top: 10px; font-size: 10px; color: #d4f8d4;">
<div>Postgres</div>
<div>Redis</div>
<div>Services</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px; min-width: 140px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 13px;">CELL-2</div>
<div style="color: #3b82f6; font-size: 11px; margin-top: 8px;">100K workspaces</div>
<div style="border-top: 1px solid rgba(255,255,255,0.2); margin-top: 10px; padding-top: 10px; font-size: 10px; color: #3b82f6;">
<div>Postgres</div>
<div>Redis</div>
<div>Services</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 16px; min-width: 140px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 13px;">CELL-N</div>
<div style="color: #7c3aed; font-size: 11px; margin-top: 8px;">100K workspaces</div>
<div style="border-top: 1px solid rgba(255,255,255,0.2); margin-top: 10px; padding-top: 10px; font-size: 10px; color: #7c3aed;">
<div>Postgres</div>
<div>Redis</div>
<div>Services</div>
</div>
</div>

</div>
</div>

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### 1. Message Ordering

<div style="background: #f8fafc; border: 2px solid #58a6ff; border-radius: 16px; padding: 24px; margin: 16px 0;">

<h4 style="color: #58a6ff; margin: 0 0 16px 0; text-align: center;">GUARANTEED MESSAGE ORDERING</h4>

<div style="background: #f1f5f9; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 8px;">Challenge</div>
<div style="color: #475569; font-size: 13px;">Messages must appear in correct order per channel across distributed servers</div>
</div>

<div style="background: #f1f5f9; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
<div style="color: #16a34a; font-weight: bold; margin-bottom: 12px;">Solution: Slack Timestamp (ts)</div>
<div style="background: #f8fafc; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
<div style="color: #2563eb; font-family: monospace; font-size: 14px;">Format: "1234567890.123456"</div>
</div>
<div style="color: #475569; font-size: 12px; line-height: 1.8;">
<div style="margin-bottom: 8px;"><span style="color: #a371f7; font-weight: bold;">Components:</span></div>
<div style="padding-left: 16px;">- Unix timestamp (seconds): 1234567890</div>
<div style="padding-left: 16px;">- Microsecond precision: .123456</div>
<div style="padding-left: 16px;">- Unique within channel</div>
<div style="margin-top: 12px; margin-bottom: 8px;"><span style="color: #a371f7; font-weight: bold;">Properties:</span></div>
<div style="padding-left: 16px;">- Lexicographically sortable</div>
<div style="padding-left: 16px;">- Can be used as message ID</div>
<div style="padding-left: 16px;">- Enables cursor-based pagination</div>
</div>
</div>

<div style="background: #f1f5f9; border-radius: 12px; padding: 16px;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 8px;">Conflict Resolution</div>
<div style="color: #475569; font-size: 12px;">If ts collision (rare): append sequence number</div>
<div style="background: #f8fafc; border-radius: 6px; padding: 8px 12px; margin-top: 8px; font-family: monospace; font-size: 12px;">
<span style="color: #475569;">"1234567890.123456"</span> <span style="color: #f0883e;">-></span> <span style="color: #16a34a;">"1234567890.123456.1"</span>
</div>
</div>

</div>

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

<div style="background: #f8fafc; border: 2px solid #a371f7; border-radius: 16px; padding: 24px; margin: 16px 0;">

<h4 style="color: #a371f7; margin: 0 0 20px 0; text-align: center;">Message Indexing Pipeline</h4>

<div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">

<!-- Trigger -->
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 12px 24px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 13px;">Message Created</div>
</div>

<!-- Arrow -->
<div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #a371f7;"></div>

<!-- Kafka -->
<div style="background: #f1f5f9; border: 2px solid #f0883e; border-radius: 10px; padding: 14px 24px; text-align: center;">
<div style="color: #f0883e; font-weight: bold; font-size: 13px;">Kafka Topic: search.index</div>
</div>

<!-- Arrow -->
<div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #a371f7;"></div>

<!-- Indexer -->
<div style="background: #f1f5f9; border-radius: 12px; padding: 16px 24px; max-width: 400px; width: 100%;">
<div style="color: #58a6ff; font-weight: bold; font-size: 13px; margin-bottom: 10px; text-align: center;">Search Indexer (Consumer)</div>
<div style="color: #475569; font-size: 12px; line-height: 1.6;">
<div>- Extract text, mentions, links</div>
<div>- Enrich with user/channel metadata</div>
<div>- Handle edits (update doc)</div>
<div>- Handle deletes (remove doc)</div>
</div>
</div>

<!-- Arrow -->
<div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #a371f7;"></div>

<!-- Elasticsearch -->
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 10px; padding: 14px 24px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 13px;">Elasticsearch Index</div>
<div style="color: #3b82f6; font-size: 11px; margin-top: 4px;">Index per workspace | Sharded by channel_id</div>
</div>

</div>

</div>

</div>

---

## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">

### 1. "Why WebSocket over Long Polling?"

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Understanding of real-time protocol trade-offs and when complexity is justified.

**Strong Answer**:

WebSockets provide true bidirectional communication with significantly lower latency and overhead compared to alternatives. Here's the detailed breakdown:

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Step-by-Step Connection Comparison</div>

**Long Polling Flow (when user sends message to #general):**
1. Client sends HTTP POST with message
2. Server processes and stores message (~10-20ms)
3. For each recipient: they're holding an open HTTP request
4. When message arrives, server responds to their pending request
5. Client immediately opens a NEW HTTP connection (TCP handshake: ~50-100ms)
6. Add TLS negotiation for HTTPS: another ~50-100ms
7. **Total latency per message: 100-200ms minimum**

**WebSocket Flow (same scenario):**
1. Client sends message over existing WebSocket connection (~1-2ms)
2. Server processes and publishes to Redis Pub/Sub (~5-10ms)
3. Real-time gateway pushes to all connected recipients (~2-5ms)
4. **Total latency: 10-20ms typical, sub-100ms P99**
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #16a34a; font-weight: bold; margin-bottom: 12px;">Real Numbers from Production Systems</div>

- **Slack's WebSocket**: Maintains ~10 million concurrent connections across their fleet
- **Connection overhead**: Each WebSocket uses ~2-4KB of memory server-side vs ~10-20KB for HTTP keep-alive connections
- **Message throughput**: Single WebSocket server can handle 50,000+ connections with proper tuning (epoll/kqueue)
- **Heartbeat interval**: Slack sends ping every 30 seconds to detect dead connections
- **Reconnection**: On average, 2-5% of connections reconnect per minute due to network changes
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">WebSocket Connection Handling Details</div>

**Initial Connection Flow:**
1. Client initiates HTTP request with `Upgrade: websocket` header
2. Server validates auth token in query string or header
3. Server responds with `101 Switching Protocols`
4. Connection promoted to WebSocket, TCP socket kept open
5. Server subscribes client to relevant Redis Pub/Sub channels based on user's workspace/channel membership

**Connection State Management:**
- Gateway maintains in-memory map: `user_id -> [websocket_connections]`
- User can have multiple connections (web, mobile, desktop)
- Each connection tracked with unique `connection_id`
- On message send, gateway looks up all active connections for recipients
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 12px;">Failure Scenarios & Handling</div>

**Scenario 1: WebSocket server crashes**
- Client detects via missed heartbeat (no pong in 60 seconds)
- Client attempts reconnect with exponential backoff: 1s, 2s, 4s, 8s... max 30s
- On reconnect, client sends `last_event_ts` to sync missed messages
- Server queries messages with `ts > last_event_ts` and sends catch-up batch

**Scenario 2: Client network switch (WiFi to cellular)**
- TCP connection silently dies (no FIN packet)
- Server's heartbeat timeout (60s) eventually detects dead connection
- Client's OS notifies of network change, triggers immediate reconnect
- Messages during gap (~0-60s) caught up via sync

**Scenario 3: Corporate firewall blocks WebSocket**
- Initial upgrade request returns 403 or times out
- Client falls back to long-polling with exponential backoff between polls
- Long-poll endpoint: `GET /rtm.poll?ts=last_seen_ts`
- Latency degrades to 1-3 seconds but functionality preserved
</div>

**When Simpler Works**:
- Long polling is fine for notifications (email-style, seconds-tolerance acceptable)
- Server-Sent Events (SSE) work for one-way real-time (dashboards, live feeds)
- For < 100 concurrent users, long polling simplicity may win over WebSocket complexity
- Firebase/Pusher handle WebSocket complexity for you under 10K concurrent users

</div>

### 2. "How do you handle message ordering across distributed servers?"

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Distributed systems fundamentals - can you reason about consistency?

**Strong Answer**:

Message ordering in a distributed chat system is solved through careful timestamp generation and channel-level partitioning. Here's how Slack approaches this:

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Slack Timestamp Format Deep Dive</div>

**Format**: `{unix_seconds}.{microseconds}` e.g., `1705619234.847293`

**Why this format works:**
- **Lexicographically sortable**: String comparison gives correct chronological order
- **Unique within channel**: Microsecond precision + sequence suffix handles collisions
- **Double duty as ID**: The timestamp IS the message ID - no separate ID generation needed
- **Cursor-friendly**: "Give me messages before ts=1705619234.847293" is a simple range query

**Generation Process (when user sends "Hello" to #general):**
1. Message service receives HTTP POST at timestamp 1705619234.847293
2. Service checks: does message with this exact ts already exist in channel?
3. If yes (collision): append sequence `.1`, `.2`, etc. -> `1705619234.847293.1`
4. Store in PostgreSQL with ts as indexed column
5. Return ts to client as message identifier

**Collision probability**: At 1000 messages/second in a single channel, ~0.1% chance of same-microsecond collision. Sequence suffix handles this cleanly.
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #16a34a; font-weight: bold; margin-bottom: 12px;">Channel-Level Ordering Guarantees</div>

**Key insight**: We only need ordering WITHIN a channel, not globally.

**Implementation:**
1. **Kafka partition by channel_id**: All messages for #general go to same Kafka partition
2. **Kafka guarantees**: Messages within a partition are strictly ordered
3. **Single consumer per partition**: Only one message service instance processes #general at a time
4. **Result**: Messages processed in exact send order

**Example flow for #general channel:**
```
User A sends "Hello" at t=100.001 -> Kafka partition 7
User B sends "Hi" at t=100.002 -> Kafka partition 7
User C sends "Hey" at t=100.001 -> Kafka partition 7 (same microsecond!)
```

Consumer processes in order: Hello, Hi, Hey (C's message gets ts=100.001.1)
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">Real Scenario: Message Ordering Edge Cases</div>

**Scenario: User sends 2 messages rapidly**
1. User types "Hello" and hits enter at t=100.001
2. User types "World" and hits enter at t=100.002
3. Network hiccup: "World" arrives at server BEFORE "Hello"

**How we handle this:**
- Server timestamps on receipt, not client timestamp
- "World" gets ts=100.050 (when server received it)
- "Hello" gets ts=100.051 (when server received it)
- **Result**: Messages appear in receipt order, which may differ from user's intent

**Alternative approach (what Slack actually does):**
- Client sends sequence number with each message
- Server uses sequence to detect out-of-order delivery
- Server can reorder within small window (100ms) before committing
- Trade-off: Adds complexity but preserves user intent
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 12px;">Failure Scenarios</div>

**Scenario 1: Message service crashes mid-processing**
- Kafka retains message (hasn't been acknowledged)
- New service instance picks up from last committed offset
- Message processed exactly once (idempotency via ts-based dedup)

**Scenario 2: Database write fails after Kafka ack**
- Message lost! Kafka thinks it's processed.
- **Mitigation**: Use transactional outbox pattern
- Write message to DB and outbox table in same transaction
- Separate process reads outbox, publishes to Kafka, marks as sent

**Scenario 3: Clock skew between servers**
- Server A's clock is 500ms behind Server B
- Messages from A appear "older" than they should
- **Mitigation**: NTP synchronization with < 10ms tolerance
- Use Hybrid Logical Clocks (HLC) for stronger guarantees
</div>

**When Simpler Works**:
- Single server? Auto-increment IDs are perfectly fine
- < 10K messages/day? Database timestamp + sequence is sufficient
- Discord uses Snowflake IDs (Twitter-style) - simpler 64-bit integers with embedded timestamp

</div>

### 3. "Why cell architecture for multi-tenancy?"

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Do you understand isolation, blast radius, and operational complexity trade-offs?

**Strong Answer**:

Cell architecture is Slack's approach to achieving fault isolation and operational flexibility at massive scale. Let me break down how it works and when you actually need it.

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">What is a Cell?</div>

A "cell" is a complete, independent deployment of all services needed to run workspaces:

**Cell-1 contains:**
- PostgreSQL cluster (primary + 2 replicas)
- Redis cluster (for pub/sub and caching)
- Message service instances (3-5 pods)
- Channel service instances (2-3 pods)
- Search service + dedicated Elasticsearch cluster
- File service with S3 bucket prefix isolation

**Each cell serves ~100,000 workspaces completely independently.**

When you join Acme Corp's Slack workspace, your requests go to Cell-7 (for example). Another company's workspace might be on Cell-12. You never interact.
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #16a34a; font-weight: bold; margin-bottom: 12px;">Real Scenario: Why Cells Save You</div>

**Scenario: Database corruption in Cell-3**

**Without cells (shared database):**
- All 750,000 workspaces affected
- Recovery time: 4-8 hours for full database restore
- Data loss: potentially all recent messages
- Impact: Complete Slack outage, front-page news

**With cells:**
- Only 100,000 workspaces in Cell-3 affected
- Other 650,000 workspaces continue normally
- Recovery: Restore Cell-3 from backup (2-3 hours)
- Impact: "Some users experienced issues" - manageable PR

**Real numbers**: If Slack's availability target is 99.99% (52 minutes downtime/year), cells let them have a 4-hour outage affecting 13% of users while still meeting SLA globally.
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">Cell Benefits Beyond Fault Isolation</div>

**1. Compliance Isolation**
- EU workspaces: Cell-EU-1, Cell-EU-2 (data stays in Frankfurt)
- US Government: Cell-GOV-1 with FedRAMP compliance
- Healthcare: Cell-HIPAA with additional audit logging

**2. Independent Scaling**
- Enterprise cell with large workspaces: 32-core database, 10 message service replicas
- SMB cell with many small workspaces: 8-core database, 3 message service replicas
- Cells scale independently based on their workload profile

**3. Gradual Rollouts**
- Deploy new feature to Cell-1 (internal testing)
- Expand to Cell-2, Cell-3 (1% of users)
- Monitor for 24 hours
- Roll out to remaining cells over 1 week
- If bug found: only affected cells need rollback

**4. Maintenance Windows**
- Upgrade Cell-1's PostgreSQL to v15 on Tuesday
- If issues: other cells unaffected
- Spread upgrades across cells over 2 weeks
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 12px;">The Complexity Cost</div>

**What you're signing up for with cells:**

1. **N copies of everything**: 10 cells = 10 PostgreSQL clusters to manage
2. **Cross-cell features are hard**: Slack Connect (channels across workspaces) requires careful design
3. **Deployment complexity**: Must deploy to all cells, handle version skew
4. **Monitoring multiplication**: 10x the dashboards, alerts, on-call runbooks
5. **Data locality decisions**: Which cell for new workspace? Migration between cells?

**Operational overhead estimate:**
- Single deployment: 1 SRE can manage
- 10 cells: Need 3-5 SREs dedicated to infrastructure
- Cost: ~$500K-1M/year in additional engineering
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 12px;">When You DON'T Need Cells</div>

**Simpler alternatives that scale further than you'd think:**

| Approach | Works Until | Complexity |
|----------|-------------|------------|
| Single database + workspace_id column | 1,000 workspaces, 1TB data | Low |
| PostgreSQL schema-per-workspace | 10,000 workspaces | Medium |
| Read replicas + sharding by workspace | 100,000 workspaces | Medium-High |
| Cell architecture | 1,000,000+ workspaces | High |

**Decision triggers for cells:**
- Compliance requirement (EU data residency, HIPAA)
- Single database exceeds 5TB or 100K TPS
- Need to offer different SLAs to different customers
- Blast radius of any outage must be < 20% of users
</div>

**When Simpler Works**:
- < 1000 workspaces: Single tenant database with workspace_id column
- < 10K workspaces: Schema-per-tenant in shared database
- Cell architecture typically needed at 100K+ tenants or strict compliance requirements

</div>

### 4. "How would you handle a channel with 50,000 members?"

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Fanout problem understanding and creative solutions.

**Strong Answer**:

Large channels represent one of the hardest problems in chat systems - the fanout problem. Here's how to think about it systematically:

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">The Math Problem</div>

**Scenario: CEO posts "Happy Friday!" to #all-hands (50,000 members)**

**Naive approach:**
- 50,000 WebSocket messages to send
- Each message: ~500 bytes (JSON wrapper + metadata)
- Total bandwidth: 25MB for one message
- If 100 messages/minute in channel: 2.5GB/minute bandwidth
- Plus: 50,000 database reads to check "is user online?"

**This doesn't scale.** At Slack's size with channels like #random in large companies, you'd melt servers.
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #16a34a; font-weight: bold; margin-bottom: 12px;">Solution 1: Server-Side Batching (What Slack Does)</div>

**Key insight**: Users connect to WebSocket servers. Batch by server, not by user.

**Flow when CEO posts to #all-hands:**
1. Message service receives post, stores in DB
2. Publishes to Kafka topic: `messages.workspace_123`
3. Router service consumes message, looks up #all-hands members
4. Groups members by their WebSocket server connection:
   - WS-Server-1: 3,000 users in this channel
   - WS-Server-2: 2,500 users in this channel
   - ... (20 servers total)
5. Sends ONE message to each WS server with recipient list
6. Each WS server locally fans out to its connected users

**Result**: 20 inter-service messages instead of 50,000!

```python
# Server-side routing
def route_to_channel(channel_id, message):
    members = get_channel_members(channel_id)  # From cache

    # Group by WebSocket server
    server_recipients = defaultdict(list)
    for user_id in members:
        ws_server = get_user_ws_server(user_id)  # From Redis
        if ws_server:  # Only online users
            server_recipients[ws_server].append(user_id)

    # Batch send to each server
    for server, users in server_recipients.items():
        send_to_server(server, {
            'message': message,
            'recipients': users  # Server handles local fanout
        })
```
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">Solution 2: Lazy Delivery</div>

**Key insight**: Only 10-20% of members are online at any time.

**Implementation:**
1. On message post: only deliver to ONLINE users (~5,000-10,000)
2. Track: "last_delivered_ts" per user per channel
3. On user reconnect: "give me messages since last_delivered_ts"
4. Server sends catch-up batch

**Benefits:**
- 80% reduction in real-time fanout
- Offline users fetch on demand (spreads load over time)
- Natural batching: user gets 50 messages in one fetch vs 50 pushes

**Trade-off**: Slight delay for users opening app. Mitigated by:
- Pre-fetch on app backgrounding
- Push notification triggers background sync on mobile
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 12px;">Solution 3: Tiered Channel Behavior</div>

**Slack's actual limits and behaviors:**

| Channel Size | Behavior |
|--------------|----------|
| < 1,000 members | Full real-time: typing indicators, read receipts |
| 1,000 - 10,000 | Reduced: No typing indicators, sampled read receipts |
| > 10,000 | Announcement mode: Restricted posting, no presence |

**Why this works:**
- 50,000 person channel is essentially a broadcast
- Nobody expects to see "John is typing..." with 50K people
- Read receipts at scale are meaningless anyway
- Restricting who can post reduces message volume dramatically
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 12px;">Failure Scenarios</div>

**Scenario: WebSocket server handling 5,000 channel members crashes**

1. Those 5,000 users disconnect, attempt reconnect
2. Load balancer routes them to surviving servers
3. Surviving servers handle 5,000 new connections (thundering herd!)
4. **Mitigation**: Jittered reconnect (random 0-30s delay on client)
5. Users sync missed messages via catch-up fetch
6. Gap typically < 60 seconds

**Scenario: Redis pub/sub falls behind during viral message**

1. CEO posts to #all-hands, gets 10,000 reactions in 1 minute
2. Each reaction = fanout to 50,000 users
3. 500 million delivery events/minute!
4. **Mitigation**: Aggregate reactions, send "5,234 people reacted" every 5 seconds
5. Client renders animation, fetches full reaction list on demand
</div>

**When Simpler Works**:
- < 1,000 members: Direct fanout is fine, no batching needed
- Pub/Sub (Redis) handles moderate fanout well up to 10K recipients
- Consider whether you really need 50K-member channels or if broadcast/announcement model works

</div>

### 5. "How do you ensure message delivery when a user is temporarily offline?"

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 16px 0;">

**What They're Probing**: At-least-once delivery, sync protocols, and state reconciliation.

**Strong Answer**:

Offline message handling requires distinguishing between "guaranteed message persistence" and "real-time delivery." Here's the comprehensive approach:

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">The Two Guarantees</div>

**Guarantee 1: Message Persistence (Strong)**
- Every message is written to PostgreSQL before sender gets "sent" confirmation
- Database has synchronous replication to standby
- Message survives any single server failure
- Recovery Point Objective (RPO): 0 messages lost

**Guarantee 2: Real-time Delivery (Best Effort)**
- WebSocket push is fire-and-forget
- If user offline, message not delivered in real-time
- No retry queue for real-time events
- Client responsible for catching up
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #16a34a; font-weight: bold; margin-bottom: 12px;">Sync Protocol: How Catch-Up Works</div>

**When user reconnects to WebSocket:**

```python
# Client sends on reconnect
{
    "type": "sync_request",
    "channels": {
        "C123": {"last_seen_ts": "1705619234.847293"},
        "C456": {"last_seen_ts": "1705618000.123456"},
        # ... all subscribed channels
    }
}

# Server responds with delta
{
    "type": "sync_response",
    "channels": {
        "C123": {
            "messages": [...],  # Messages after last_seen_ts
            "unread_count": 47,
            "has_more": true  # Pagination needed
        },
        "C456": {
            "messages": [...],
            "unread_count": 3,
            "has_more": false
        }
    }
}
```

**Optimization: Prioritized sync**
1. First: Channels with mentions (@user)
2. Second: DMs and small groups
3. Third: Large channels (can be lazy-loaded)
4. Client shows "Loading..." spinner per channel during sync
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">Unread Count Management</div>

**Challenge**: Computing "47 unread messages" requires counting DB rows - expensive at scale.

**Solution: Maintained counter in Redis**

```python
# When message posted to channel
def on_message_posted(channel_id, message_ts):
    members = get_channel_members(channel_id)

    pipe = redis.pipeline()
    for user_id in members:
        # Increment unread count
        pipe.hincrby(f"unreads:{user_id}", channel_id, 1)
        # Track latest message ts
        pipe.hset(f"latest:{user_id}", channel_id, message_ts)
    pipe.execute()

# When user reads channel
def on_channel_read(user_id, channel_id, read_ts):
    # Reset unread count to 0
    redis.hset(f"unreads:{user_id}", channel_id, 0)
    # Update read position
    redis.hset(f"read_pos:{user_id}", channel_id, read_ts)
```

**Numbers**:
- Redis HINCRBY: ~0.1ms per operation
- 50,000 member channel: ~5 seconds to update all counters (pipelined)
- User with 500 channels: Fetch all unreads in ~2ms
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 12px;">Mobile Push Notifications</div>

**Flow when user is completely offline (app killed):**

1. Message posted mentioning @john
2. Real-time gateway: John not connected
3. Queue notification to push service
4. Push service checks: John's last activity > 5 minutes ago?
5. If yes: Send APNs/FCM push notification

**Aggregation for noisy channels:**
- First message: Push immediately
- Subsequent messages within 30 seconds: Aggregate
- Push: "3 new messages in #general"
- Prevents phone buzzing 50 times

**Badge count sync:**
- Push payload includes total unread count
- iOS/Android update app badge without opening app
- Separate counter maintained: `total_unreads:{user_id}`

**DND (Do Not Disturb) handling:**
- User sets DND schedule: 10pm - 8am
- Push service checks DND before sending
- Messages still persisted, delivered when app opens
- Exception: "@channel" in emergency channels always push
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 12px;">Failure Scenarios</div>

**Scenario 1: User offline for 7 days, then reconnects**
- 500 channels, potentially 50,000 messages
- Can't sync all at once (timeout, memory)
- **Solution**: Paginated sync, max 100 messages per channel initially
- "Load more" button in UI, background fetch for rest
- Trade-off: Initial load is fast, history loads progressively

**Scenario 2: Redis unread counters get corrupted**
- Counter shows "0 unread" but channel has messages
- **Mitigation**: Nightly reconciliation job
- Compares Redis counters with actual DB message counts
- Fixes discrepancies during low-traffic hours

**Scenario 3: Push notification delivery fails (APNs error)**
- Push service logs failure, doesn't retry immediately
- User might miss urgent message
- **Mitigation**:
  - Retry with exponential backoff (3 attempts)
  - Email fallback after 1 hour for mentions
  - User can configure email digest frequency
</div>

**When Simpler Works**:
- For MVP: Just refetch last N messages on reconnect (no counters)
- Mobile apps can use simple pull-to-refresh
- Firebase handles offline sync automatically including conflict resolution
- Under 10K users: Full message history sync on connect is feasible

</div>

</div>

---

## Why This Technology?

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

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

<div style="background: #f8fafc; border: 2px solid #58a6ff; border-radius: 16px; padding: 24px; margin: 16px 0;">

<h4 style="color: #58a6ff; margin: 0 0 20px 0; text-align: center;">WebSocket Gateway: Custom vs Managed (AWS API Gateway)</h4>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">

<div style="background: #f1f5f9; border-radius: 12px; padding: 16px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">Managed (API Gateway WebSocket)</div>
<div style="color: #16a34a; font-size: 12px; margin-bottom: 4px;">+ No infrastructure to manage</div>
<div style="color: #16a34a; font-size: 12px; margin-bottom: 4px;">+ Auto-scaling built in</div>
<div style="color: #f85149; font-size: 12px; margin-bottom: 4px;">- $1.00 per million connection-minutes</div>
<div style="color: #f85149; font-size: 12px; margin-bottom: 4px;">- 10M concurrent = ~$300K/month</div>
<div style="color: #f85149; font-size: 12px;">- Limited customization</div>
</div>

<div style="background: #f1f5f9; border-radius: 12px; padding: 16px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 12px;">Custom (like Slack)</div>
<div style="color: #16a34a; font-size: 12px; margin-bottom: 4px;">+ Full protocol control</div>
<div style="color: #16a34a; font-size: 12px; margin-bottom: 4px;">+ ~$50K/month for 10M connections</div>
<div style="color: #16a34a; font-size: 12px; margin-bottom: 4px;">+ Custom batching, compression</div>
<div style="color: #f85149; font-size: 12px; margin-bottom: 4px;">- Engineering cost to build</div>
<div style="color: #f85149; font-size: 12px;">- Need deep expertise</div>
</div>

</div>

<div style="background: #f8fafc; border-radius: 8px; padding: 12px; margin-top: 16px; text-align: center;">
<span style="color: #58a6ff; font-weight: bold;">Decision Point:</span> <span style="color: #475569;">Custom makes sense at > 100K concurrent connections</span>
</div>

</div>

</div>

---

## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### The $100/month Chat App

<div style="background: #f1f5f9; border-radius: 8px; padding: 20px; margin: 16px 0;">

**Scenario**: Startup building team chat for < 1000 concurrent users

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px;">

<div style="background: #f8fafc; border-radius: 10px; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Architecture</div>
<div style="color: #475569; font-size: 12px; line-height: 1.8;">
<div>- Single Node.js + Socket.io</div>
<div>- PostgreSQL on RDS ($50/mo)</div>
<div>- Redis for pub/sub ($25/mo)</div>
<div>- S3 for files ($10/mo)</div>
<div>- EC2 t3.medium ($30/mo)</div>
</div>
<div style="color: #16a34a; font-weight: bold; margin-top: 12px;">Total: ~$115/month</div>
</div>

<div style="background: #f8fafc; border-radius: 10px; padding: 16px;">
<div style="color: #16a34a; font-weight: bold; margin-bottom: 12px;">This Handles</div>
<div style="color: #475569; font-size: 12px; line-height: 1.8;">
<div>- 1000 concurrent WebSockets</div>
<div>- 100K messages/day</div>
<div>- Basic presence/typing</div>
<div>- File uploads</div>
</div>
<div style="color: #f85149; font-weight: bold; margin-top: 12px; font-size: 12px;">You do NOT need: Kafka, Elasticsearch, Cell architecture, Custom gateway, Microservices</div>
</div>

</div>

</div>

### When Firebase/Pusher is Enough

<div style="background: #f1f5f9; border-radius: 8px; padding: 20px; margin: 16px 0;">

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

<div style="background: #f1f5f9; border-radius: 8px; padding: 20px; margin: 16px 0;">

<div style="display: flex; flex-direction: column; gap: 12px;">

<div style="background: #f8fafc; border-left: 4px solid #238636; border-radius: 0 8px 8px 0; padding: 12px 16px;">
<div style="color: #238636; font-weight: bold; font-size: 13px;">Single-tenant database (workspace_id column)</div>
<div style="color: #475569; font-size: 12px; margin-top: 4px;">Works until: Individual workspace needs isolation, DB > 5TB, or 10K+ workspaces</div>
</div>

<div style="background: #f8fafc; border-left: 4px solid #1f6feb; border-radius: 0 8px 8px 0; padding: 12px 16px;">
<div style="color: #1f6feb; font-weight: bold; font-size: 13px;">Schema-per-tenant (Postgres schemas)</div>
<div style="color: #475569; font-size: 12px; margin-top: 4px;">Works until: 100+ schemas (migrations painful), connection pooling complex</div>
</div>

<div style="background: #f8fafc; border-left: 4px solid #a371f7; border-radius: 0 8px 8px 0; padding: 12px 16px;">
<div style="color: #a371f7; font-weight: bold; font-size: 13px;">Cell architecture needed when</div>
<div style="color: #475569; font-size: 12px; margin-top: 4px;">Fault isolation critical (enterprise SLA), regulatory requirements (EU vs US), 100K+ tenants</div>
</div>

</div>

</div>

### Discord's Surprisingly Simple Architecture

<div style="background: #f1f5f9; border-radius: 8px; padding: 20px; margin: 16px 0;">

> "Discord uses a single process per guild (server). Each guild runs on one machine. For huge guilds (500K+ members), they just use a beefier machine."

**Key Insight**: Sharding by organizational unit (guild/workspace) is simpler than you think.

<div style="background: #f8fafc; border-radius: 10px; padding: 16px; margin-top: 16px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Discord's approach:</div>
<div style="color: #475569; font-size: 12px; line-height: 1.8;">
<div>- Guild ID determines which process handles it</div>
<div>- No complex distributed transactions within a guild</div>
<div>- Cross-guild features are eventually consistent</div>
<div>- Scaling = add more machines, assign new guilds to them</div>
</div>
</div>

<div style="background: #f8fafc; border-radius: 8px; padding: 12px; margin-top: 12px;">
<span style="color: #f0883e; font-weight: bold;">For your design:</span> <span style="color: #475569; font-size: 13px;">Consider whether workspace-per-process could simplify your architecture before jumping to distributed everything.</span>
</div>

</div>

</div>
</div>

---

## Trade-off Analysis & Mitigation

<div style="background: linear-gradient(135deg, #f0883e 0%, #f9826c 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### Critical Trade-offs

| Trade-off | Option A | Option B | Mitigation |
|-----------|----------|----------|------------|
| **Consistency vs Latency** | Strong consistency (all replicas) | Eventual consistency (single write) | Use eventual for messages, strong for auth/permissions |
| **Storage vs Query Speed** | Normalized schema | Denormalized/materialized | Denormalize read-heavy paths (channel list, unreads) |
| **Reliability vs Cost** | Multi-region active-active | Single region + DR | Start single region, add DR, then active-active |
| **Features vs Complexity** | Full Slack clone | MVP subset | Ship DMs + channels first, add threads/reactions later |

### Detailed Trade-off: Real-time Consistency

<div style="background: #f1f5f9; border-radius: 8px; padding: 20px; margin: 16px 0;">

<div style="color: #f0883e; font-weight: bold; margin-bottom: 16px;">Problem: User A sends message, User B should see it immediately</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">

<div style="background: #f8fafc; border: 2px solid #f85149; border-radius: 12px; padding: 16px;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 12px;">Option 1: Synchronous</div>
<div style="color: #475569; font-size: 11px; margin-bottom: 8px;">Send -> Store -> Publish -> Wait for ACKs -> Respond</div>
<div style="color: #16a34a; font-size: 11px; margin-bottom: 2px;">+ Guaranteed delivery before response</div>
<div style="color: #16a34a; font-size: 11px; margin-bottom: 8px;">+ Simpler mental model</div>
<div style="color: #f85149; font-size: 11px; margin-bottom: 2px;">- Slow (P99 = slowest recipient)</div>
<div style="color: #f85149; font-size: 11px;">- Doesn't scale</div>
</div>

<div style="background: #f8fafc; border: 2px solid #7ee787; border-radius: 12px; padding: 16px;">
<div style="color: #16a34a; font-weight: bold; margin-bottom: 12px;">Option 2: Asynchronous</div>
<div style="color: #475569; font-size: 11px; margin-bottom: 8px;">Send -> Store -> Respond -> (async) Publish</div>
<div style="color: #16a34a; font-size: 11px; margin-bottom: 2px;">+ Fast response to sender</div>
<div style="color: #16a34a; font-size: 11px; margin-bottom: 8px;">+ Scales well</div>
<div style="color: #f85149; font-size: 11px; margin-bottom: 2px;">- Recipient might not receive immediately</div>
<div style="color: #f85149; font-size: 11px;">- Need separate delivery tracking</div>
</div>

</div>

<div style="background: #f8fafc; border: 2px solid #a371f7; border-radius: 12px; padding: 16px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 12px;">Slack's Approach: Optimistic + Verification</div>
<div style="color: #475569; font-size: 12px; line-height: 1.8;">
<div>1. Sender gets immediate "sent" confirmation</div>
<div>2. Message stored durably (source of truth)</div>
<div>3. Real-time delivery is best-effort</div>
<div>4. Clients periodically sync to catch missed messages</div>
<div>5. Mobile uses push notifications as backup</div>
</div>
</div>

</div>

### Mitigating WebSocket Complexity

<div style="background: #f1f5f9; border-radius: 8px; padding: 20px; margin: 16px 0;">

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

<div style="background: #f1f5f9; border-radius: 8px; padding: 20px; margin: 16px 0;">

<div style="color: #58a6ff; font-weight: bold; margin-bottom: 16px;">10M Daily Active Users - Cost Breakdown & Optimization</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">

<div style="background: #f8fafc; border-radius: 10px; padding: 16px;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 12px;">Before Optimization</div>
<div style="color: #475569; font-size: 12px; line-height: 1.8;">
<div>Compute: $150K/mo</div>
<div>Database: $80K/mo</div>
<div>Bandwidth: $50K/mo</div>
<div>Search: $40K/mo</div>
</div>
<div style="color: #f85149; font-weight: bold; margin-top: 12px;">Total: $320K/month</div>
</div>

<div style="background: #f8fafc; border-radius: 10px; padding: 16px;">
<div style="color: #16a34a; font-weight: bold; margin-bottom: 12px;">After Optimization</div>
<div style="color: #475569; font-size: 12px; line-height: 1.8;">
<div>Compute: $80K/mo (auto-scaling, spot)</div>
<div>Database: $45K/mo (hot/cold tiering)</div>
<div>Bandwidth: $25K/mo (compression, CDN)</div>
<div>Search: $20K/mo (index last 90 days)</div>
</div>
<div style="color: #16a34a; font-weight: bold; margin-top: 12px;">Total: $170K/month</div>
</div>

</div>

<div style="background: #f8fafc; border-radius: 8px; padding: 12px; margin-top: 16px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 8px;">Key Optimizations:</div>
<div style="color: #475569; font-size: 12px; line-height: 1.6;">
1. Message archival: Move messages > 90 days to cold storage |
2. Spot instances: Use for stateless workers |
3. Reserved instances: For predictable base load |
4. Connection multiplexing: Multiple channels per WebSocket |
5. Batch operations: Group typing indicators, presence updates
</div>
</div>

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

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 16px 0;">

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

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 16px 0;">

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

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 16px 0;">

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">

<div style="background: #f8fafc; border-left: 4px solid #238636; border-radius: 0 8px 8px 0; padding: 16px;">
<div style="color: #238636; font-weight: bold; margin-bottom: 8px;">Phase 1: Clarify & Scope (2-3 min)</div>
<div style="color: #475569; font-size: 12px; line-height: 1.6;">
- "Is this B2B like Slack or B2C like Discord?"<br>
- "What's our scale target? 10K or 10M users?"<br>
- "Any specific features to focus on?"<br>
- "Real-time critical or slight delays OK?"
</div>
</div>

<div style="background: #f8fafc; border-left: 4px solid #1f6feb; border-radius: 0 8px 8px 0; padding: 16px;">
<div style="color: #1f6feb; font-weight: bold; margin-bottom: 8px;">Phase 2: High-Level Design (10 min)</div>
<div style="color: #475569; font-size: 12px; line-height: 1.6;">
- Draw box diagram (clients, gateway, services, data)<br>
- Identify core message flow<br>
- Call out hard parts: "The challenge here is..."
</div>
</div>

<div style="background: #f8fafc; border-left: 4px solid #a371f7; border-radius: 0 8px 8px 0; padding: 16px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 8px;">Phase 3: Deep Dive (15-20 min)</div>
<div style="color: #475569; font-size: 12px; line-height: 1.6;">
- Pick 2-3 components to detail<br>
- Discuss trade-offs explicitly<br>
- Show evolution: "At 10K... at 1M users..."
</div>
</div>

<div style="background: #f8fafc; border-left: 4px solid #f0883e; border-radius: 0 8px 8px 0; padding: 16px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 8px;">Phase 4: Extensions & Edge Cases (5-10 min)</div>
<div style="color: #475569; font-size: 12px; line-height: 1.6;">
- How does this handle failure?<br>
- What about mobile/offline?<br>
- How would we add feature X?
</div>
</div>

</div>

</div>

</div>
