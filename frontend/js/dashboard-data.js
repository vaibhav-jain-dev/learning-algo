/**
 * Dashboard Data - ADHD-Friendly Deep Learning Content
 *
 * Structure Philosophy:
 * - TL;DR first (3 seconds to understand)
 * - "Imagine..." for visual learners
 * - "What if..." for intuition building
 * - Chunked sections (expand when ready)
 * - Real examples from companies you know
 */

const SYSTEM_DESIGN_TOPICS = [
    // ==================== FUNDAMENTALS ====================
    {
        id: 'scalability',
        icon: '📈',
        category: 'Fundamentals',
        title: 'Scalability',
        tldr: 'How to handle more users without your system dying.',

        imagine: `You run a lemonade stand. 5 customers? Easy.
500 customers all at once? You need more tables, more workers, maybe multiple stands.
That's scalability.`,

        sections: [
            {
                title: 'The Core Idea',
                content: `Your system will get more users. Plan for it now, not when everything crashes.

Two ways to scale:
• **Vertical (Scale Up)**: Bigger machine (like buying a bigger blender)
• **Horizontal (Scale Out)**: More machines (like opening more lemonade stands)`,
                collapsed: false
            },
            {
                title: 'What If Scenarios',
                type: 'whatif',
                items: [
                    {
                        question: 'What if traffic suddenly 10x?',
                        answer: `Vertical scaling FAILS here. You can't instantly buy a bigger server.
Horizontal scaling WINS - just spin up more servers.
This is why Netflix, Uber, everyone uses horizontal scaling.`
                    },
                    {
                        question: 'What if one server dies?',
                        answer: `Vertical: Your entire system is down. Game over.
Horizontal: Other servers handle the load. Users don't even notice.`
                    },
                    {
                        question: 'What if you need to update code?',
                        answer: `Vertical: Take down the whole system to update.
Horizontal: Update servers one by one. Zero downtime.`
                    }
                ],
                collapsed: true
            },
            {
                title: 'Real World Examples',
                type: 'examples',
                content: `**Netflix**: Horizontal scaling. They have thousands of servers. When you watch a show, you're probably hitting different servers every few minutes.

**Early Twitter**: Started vertical. "The Fail Whale" was famous - their single server couldn't handle load. Switched to horizontal.

**Your Bank**: Probably still vertical for core systems. That's why "scheduled maintenance" exists at 2am.`,
                collapsed: true
            },
            {
                title: 'The Trade-offs',
                type: 'tradeoffs',
                pros: [
                    'Handle millions of users',
                    'No single point of failure',
                    'Update without downtime'
                ],
                cons: [
                    'More complex to build',
                    'Need load balancers',
                    'Data consistency gets tricky'
                ],
                collapsed: true
            }
        ],
        relatedTopics: ['load-balancing', 'database-sharding', 'caching'],
        difficulty: 'beginner'
    },

    {
        id: 'load-balancing',
        icon: '⚖️',
        category: 'Fundamentals',
        title: 'Load Balancing',
        tldr: 'Traffic cop for your servers. Sends requests to whoever is free.',

        imagine: `Airport security with 10 lines. Without a coordinator, everyone picks line 1.
With a coordinator (load balancer), they point you to the shortest line.`,

        sections: [
            {
                title: 'The Core Idea',
                content: `You have multiple servers. Load balancer decides which one handles each request.

Common strategies:
• **Round Robin**: Server 1, then 2, then 3, repeat
• **Least Connections**: Send to whoever has fewest active users
• **IP Hash**: Same user always goes to same server (useful for sessions)`,
                collapsed: false
            },
            {
                title: 'What If Scenarios',
                type: 'whatif',
                items: [
                    {
                        question: 'What if one server is slower than others?',
                        answer: `Round Robin fails here - slow server gets same traffic but handles it worse.
Use "Weighted Round Robin" - give slow server fewer requests.
Or use "Least Connections" - it naturally sends less to slow server.`
                    },
                    {
                        question: 'What if a server crashes mid-request?',
                        answer: `Good load balancers have health checks. They ping servers every few seconds.
Dead server? Remove from rotation. User gets auto-retried to healthy server.`
                    },
                    {
                        question: 'What if user session is on server A but next request goes to B?',
                        answer: `Server B doesn't know who the user is! Session is lost.
Fix 1: Sticky sessions (IP hash) - same user always same server
Fix 2: Store sessions externally (Redis) - any server can read it`
                    }
                ],
                collapsed: true
            },
            {
                title: 'Real World Examples',
                type: 'examples',
                content: `**Google Search**: Uses geographic load balancing. Your request goes to nearest data center.

**Amazon**: Layer 7 load balancing. They look at the URL - /checkout goes to payment servers, /browse goes to catalog servers.

**Cloudflare**: Acts as load balancer for millions of websites. Also blocks attacks before they reach you.`,
                collapsed: true
            },
            {
                title: 'Visual: How It Works',
                type: 'diagram',
                content: `
    [Users] ──→ [Load Balancer] ──┬──→ [Server 1] ──→ [Database]
                                  ├──→ [Server 2] ──→ [Database]
                                  └──→ [Server 3] ──→ [Database]

    Health Check: LB pings each server every 5 seconds
    Dead server? Removed from rotation automatically
`,
                collapsed: true
            }
        ],
        relatedTopics: ['scalability', 'reverse-proxy', 'high-availability'],
        difficulty: 'beginner'
    },

    {
        id: 'caching',
        icon: '⚡',
        category: 'Fundamentals',
        title: 'Caching',
        tldr: 'Remember expensive answers so you don\'t recompute them.',

        imagine: `You're a waiter. Customer asks "What's today's soup?"
You could run to the kitchen every time... OR remember the answer for the whole day.
That's caching.`,

        sections: [
            {
                title: 'The Core Idea',
                content: `Database queries are slow (disk). Memory is fast.
Store frequently accessed data in memory.

Cache types:
• **Application Cache**: Your code stores things in memory (dict/map)
• **Distributed Cache**: Separate service like Redis or Memcached
• **CDN**: Cache static files (images, JS) close to users geographically`,
                collapsed: false
            },
            {
                title: 'What If Scenarios',
                type: 'whatif',
                items: [
                    {
                        question: 'What if cached data becomes outdated?',
                        answer: `This is the #1 caching problem. Options:
1. TTL (Time To Live): Cache expires after X seconds
2. Write-through: Update cache when you update database
3. Cache invalidation: Explicitly delete stale cache

"There are only two hard things in CS: cache invalidation and naming things."`
                    },
                    {
                        question: 'What if cache crashes?',
                        answer: `If everything goes to database at once = "Cache Stampede"
Database overloads and crashes too.

Fix: "Warm up" cache before directing traffic. Or use cache replicas.`
                    },
                    {
                        question: 'What if you cache wrong data?',
                        answer: `Caching write-heavy data = wasted effort (changes too often)
Caching user-specific data = cache gets huge

Good to cache: Homepage data, product catalog, config
Bad to cache: Shopping cart, real-time stock prices`
                    }
                ],
                collapsed: true
            },
            {
                title: 'Real World Examples',
                type: 'examples',
                content: `**Twitter**: Timeline is cached. When you open Twitter, it doesn't query for every tweet - pre-computed timeline served from cache.

**Netflix**: Caches video metadata. When you browse, you're seeing cached movie info. Actual video? CDN caches that globally.

**Stack Overflow**: Caches rendered HTML. Page doesn't re-render for every visitor.`,
                collapsed: true
            },
            {
                title: 'Cache Strategies Cheat Sheet',
                type: 'diagram',
                content: `
    CACHE-ASIDE (Most Common):
    1. Check cache first
    2. Miss? Query DB, store in cache
    3. Return data

    WRITE-THROUGH:
    1. Write to cache
    2. Cache writes to DB
    3. Always consistent, but slower writes

    WRITE-BEHIND:
    1. Write to cache only
    2. Cache batches writes to DB later
    3. Fast writes, risk of data loss
`,
                collapsed: true
            }
        ],
        relatedTopics: ['database-design', 'cdn', 'redis'],
        difficulty: 'beginner'
    },

    // ==================== DATABASES ====================
    {
        id: 'database-design',
        icon: '🗄️',
        category: 'Databases',
        title: 'SQL vs NoSQL',
        tldr: 'SQL = structured, reliable, slower. NoSQL = flexible, fast, less guarantees.',

        imagine: `SQL is like a filing cabinet with labeled folders. Everything has its place.
NoSQL is like a box where you throw things in. Faster to add stuff, harder to find specific items.`,

        sections: [
            {
                title: 'The Core Idea',
                content: `**SQL (PostgreSQL, MySQL):**
- Fixed schema - define columns upfront
- ACID guarantees - data is always consistent
- Good for: Banking, inventory, anything where accuracy > speed

**NoSQL (MongoDB, Cassandra, DynamoDB):**
- Flexible schema - store anything
- Eventually consistent - data might lag briefly
- Good for: Social media, logs, real-time analytics`,
                collapsed: false
            },
            {
                title: 'What If Scenarios',
                type: 'whatif',
                items: [
                    {
                        question: 'What if you pick SQL and data structure changes?',
                        answer: `Migrations are painful. Adding a column to a billion-row table can take hours.
NoSQL shines here - just start storing new fields.

But! SQL migrations are predictable. NoSQL "flexibility" can become chaos.`
                    },
                    {
                        question: 'What if two users buy the last item at the same time?',
                        answer: `SQL handles this with transactions - one succeeds, one fails.
NoSQL might sell it twice (eventually consistent).

For inventory/money: Always SQL.`
                    },
                    {
                        question: 'What if you need to scale to millions of writes per second?',
                        answer: `SQL struggles here. Even sharded SQL is complex.
NoSQL (Cassandra, DynamoDB) built for this. Netflix writes millions of events/second to Cassandra.`
                    }
                ],
                collapsed: true
            },
            {
                title: 'Real World Examples',
                type: 'examples',
                content: `**Uber**: PostgreSQL for trips/payments (needs accuracy), Cassandra for location pings (high volume, okay if one ping lost)

**Facebook**: MySQL for user data, but heavily modified. Uses Cassandra for inbox.

**Shopify**: MySQL for everything. They shard heavily instead of using NoSQL.`,
                collapsed: true
            },
            {
                title: 'Quick Decision Guide',
                type: 'diagram',
                content: `
    Need transactions? ──────────────→ SQL
    Need flexibility? ───────────────→ NoSQL
    Need crazy write scale? ─────────→ NoSQL (Cassandra/DynamoDB)
    Need complex queries/joins? ─────→ SQL
    Don't know requirements yet? ────→ SQL (safer default)

    Many companies use BOTH:
    - SQL for core business data
    - NoSQL for analytics, logs, sessions
`,
                collapsed: true
            }
        ],
        relatedTopics: ['database-sharding', 'cap-theorem', 'acid-transactions'],
        difficulty: 'beginner'
    },

    {
        id: 'database-sharding',
        icon: '🔀',
        category: 'Databases',
        title: 'Database Sharding',
        tldr: 'Split one huge database into many smaller ones by some key.',

        imagine: `Library with 1 million books on one shelf = nightmare.
Same library with books split A-M in room 1, N-Z in room 2 = manageable.
That's sharding.`,

        sections: [
            {
                title: 'The Core Idea',
                content: `One database can only handle so much. Solution: split data across multiple databases.

**Shard Key**: How you decide which database gets which data.
- By user_id: User 1-1000 → DB1, User 1001-2000 → DB2
- By geography: US users → US database, EU users → EU database
- By hash: hash(user_id) % num_shards = target shard`,
                collapsed: false
            },
            {
                title: 'What If Scenarios',
                type: 'whatif',
                items: [
                    {
                        question: 'What if one shard gets way more traffic (hot shard)?',
                        answer: `Example: Shard by first letter of username.
"J" shard has John, James, Jennifer... overloaded!

Fix: Use hash-based sharding. Distributes evenly.
Or: Split hot shard into sub-shards.`
                    },
                    {
                        question: 'What if you need data from multiple shards?',
                        answer: `Cross-shard queries are EXPENSIVE. Query each shard, combine results.

Design your shard key so common queries hit ONE shard.
Example: Shard by user_id → all of a user's data on one shard.`
                    },
                    {
                        question: 'What if you need to add more shards?',
                        answer: `Resharding is painful. Data must move between shards.

Consistent hashing helps - only some data moves.
Or over-provision initially (create 100 shards, even if you only need 10).`
                    }
                ],
                collapsed: true
            },
            {
                title: 'Real World Examples',
                type: 'examples',
                content: `**Discord**: Shards by server (guild) ID. All messages for a server on one shard.

**Instagram**: Shards by user ID. Your photos, followers, all on one shard.

**Notion**: Started unsharded. Had to reshard as they grew - took months of careful migration.`,
                collapsed: true
            },
            {
                title: 'Visual: Sharding Strategies',
                type: 'diagram',
                content: `
    RANGE SHARDING:
    User 1-1000 → Shard A
    User 1001-2000 → Shard B
    ⚠️ Problem: New users all hit latest shard

    HASH SHARDING:
    hash(user_id) % 3 = 0 → Shard A
    hash(user_id) % 3 = 1 → Shard B
    hash(user_id) % 3 = 2 → Shard C
    ✅ Even distribution

    GEOGRAPHIC SHARDING:
    US users → US datacenter
    EU users → EU datacenter
    ✅ Low latency, ⚠️ cross-region queries slow
`,
                collapsed: true
            }
        ],
        relatedTopics: ['database-design', 'scalability', 'consistent-hashing'],
        difficulty: 'intermediate'
    },

    {
        id: 'cap-theorem',
        icon: '🔺',
        category: 'Databases',
        title: 'CAP Theorem',
        tldr: 'Pick 2: Consistency, Availability, Partition Tolerance. You can\'t have all 3.',

        imagine: `You have two bank branches with a phone line between them.
Phone line breaks (partition).
Do you: Refuse all transactions (consistent but unavailable)?
Or: Allow transactions but balances might differ (available but inconsistent)?`,

        sections: [
            {
                title: 'The Core Idea',
                content: `**C - Consistency**: Every read gets the most recent write
**A - Availability**: Every request gets a response (not an error)
**P - Partition Tolerance**: System works even if network between nodes fails

In distributed systems, partitions WILL happen. So you really choose between C and A.`,
                collapsed: false
            },
            {
                title: 'What If Scenarios',
                type: 'whatif',
                items: [
                    {
                        question: 'What if you choose Consistency (CP)?',
                        answer: `During partition, some requests fail/timeout.
Banking systems do this - better to reject transaction than allow wrong balance.

Example: You try to withdraw, system says "try again later" instead of risking overdraft.`
                    },
                    {
                        question: 'What if you choose Availability (AP)?',
                        answer: `During partition, you get data but it might be stale.
Social media does this - seeing a slightly old like count is fine.

Example: Facebook shows your friend has 99 likes, actually has 102. No one cares.`
                    },
                    {
                        question: 'What if there\'s no partition?',
                        answer: `When network is fine, you CAN have both C and A!
CAP only forces the choice during failures.

Design for the failure case, enjoy both during normal operation.`
                    }
                ],
                collapsed: true
            },
            {
                title: 'Real World Examples',
                type: 'examples',
                content: `**CP Systems (Consistency over Availability):**
- Google Spanner (strongly consistent global database)
- MongoDB with majority write concern
- Bank transaction systems

**AP Systems (Availability over Consistency):**
- Cassandra (always writable, eventually consistent)
- DynamoDB (configurable, defaults to AP)
- DNS (returns cached result even if stale)`,
                collapsed: true
            },
            {
                title: 'Decision Guide',
                type: 'diagram',
                content: `
    "What happens if user sees stale data?"

    Bad things (wrong money, sold-out item sold) → Choose CP
    Minor annoyance (old like count, cached page) → Choose AP

    Rule of thumb:
    - Financial data → CP
    - User content/social → AP
    - Inventory → CP
    - Analytics → AP
`,
                collapsed: true
            }
        ],
        relatedTopics: ['database-design', 'eventual-consistency', 'distributed-systems'],
        difficulty: 'intermediate'
    },

    // ==================== COMMUNICATION ====================
    {
        id: 'message-queues',
        icon: '📬',
        category: 'Communication',
        title: 'Message Queues',
        tldr: 'Async task processing. Producer adds tasks, Consumer processes later.',

        imagine: `Restaurant kitchen. Waiter (producer) puts order tickets in queue.
Cook (consumer) takes tickets when ready.
Kitchen overwhelmed? Tickets wait. Cook is free? Processes immediately.`,

        sections: [
            {
                title: 'The Core Idea',
                content: `Instead of processing immediately, queue the work.

**Why?**
- Decouple components (producer doesn't wait for consumer)
- Handle traffic spikes (queue absorbs burst)
- Retry failed jobs (message stays in queue until processed)

**Popular Options:**
- **RabbitMQ**: Traditional, feature-rich
- **Apache Kafka**: High throughput, event streaming
- **AWS SQS**: Managed, simple`,
                collapsed: false
            },
            {
                title: 'What If Scenarios',
                type: 'whatif',
                items: [
                    {
                        question: 'What if consumer crashes mid-processing?',
                        answer: `Message acknowledgment! Consumer only marks "done" after completing.
Crash = no ack = message goes back to queue = another consumer picks it up.

Make processing idempotent! Might run twice.`
                    },
                    {
                        question: 'What if queue grows faster than consumers process?',
                        answer: `Options:
1. Add more consumers (scale out)
2. Prioritize important messages
3. Drop old messages (if acceptable)
4. Back-pressure: Tell producers to slow down

Monitor queue depth! Alert when it grows too fast.`
                    },
                    {
                        question: 'What if message order matters?',
                        answer: `Most queues don't guarantee order (for performance).
Need order? Use partitioning - same user's messages to same partition.
Kafka does this well with partition keys.`
                    }
                ],
                collapsed: true
            },
            {
                title: 'Real World Examples',
                type: 'examples',
                content: `**YouTube**: Video upload → Queue → Encoding workers process async
You get "processing" message while workers handle transcoding.

**Uber**: Ride request → Queue → Matching service finds driver
Decoupled so ride requests don't slow down during matching computation.

**Slack**: Message → Queue → Delivery service sends to all connected clients
Handles thousands of concurrent messages this way.`,
                collapsed: true
            },
            {
                title: 'Visual: Queue Architecture',
                type: 'diagram',
                content: `
    [Producer A] ───┐
    [Producer B] ───┼──→ [Message Queue] ──┬──→ [Consumer 1]
    [Producer C] ───┘         │            ├──→ [Consumer 2]
                              │            └──→ [Consumer 3]
                              ↓
                        [Dead Letter Queue]
                        (failed messages go here)
`,
                collapsed: true
            }
        ],
        relatedTopics: ['kafka', 'microservices', 'async-processing'],
        difficulty: 'intermediate'
    },

    {
        id: 'api-design',
        icon: '🔌',
        category: 'Communication',
        title: 'API Design (REST vs GraphQL vs gRPC)',
        tldr: 'REST = simple & universal. GraphQL = flexible queries. gRPC = fast internal calls.',

        imagine: `REST: Restaurant with fixed menu. Order item #5, get exactly that.
GraphQL: Buffet. Take exactly what you want, no more, no less.
gRPC: Kitchen staff yelling orders. Fast but only works inside the kitchen.`,

        sections: [
            {
                title: 'The Core Idea',
                content: `**REST**: HTTP verbs (GET, POST, PUT, DELETE) on resources
- Simple, cacheable, everyone knows it
- Can over-fetch (get whole user when you need just name)

**GraphQL**: Single endpoint, query language
- Get exactly what you need
- More complex, harder to cache

**gRPC**: Binary protocol, typed schemas
- Super fast (binary, not JSON)
- Great for service-to-service, not browsers`,
                collapsed: false
            },
            {
                title: 'What If Scenarios',
                type: 'whatif',
                items: [
                    {
                        question: 'What if mobile app needs minimal data?',
                        answer: `REST: Makes multiple calls or gets too much data → slow, battery drain
GraphQL: One call, exact fields needed → perfect for mobile

This is why Facebook created GraphQL - mobile app performance.`
                    },
                    {
                        question: 'What if services need to talk to each other super fast?',
                        answer: `REST JSON parsing is slow at scale.
gRPC is 7-10x faster (binary, protobuf).

Google uses gRPC internally for billions of calls/day between services.`
                    },
                    {
                        question: 'What if you need caching at the edge?',
                        answer: `REST: CDN caches GET /users/123 easily
GraphQL: POST with query body - CDN can't cache by default

For public APIs with heavy caching needs, REST wins.`
                    }
                ],
                collapsed: true
            },
            {
                title: 'Real World Examples',
                type: 'examples',
                content: `**REST**: Twitter API, Stripe API, GitHub API (v3)
Public APIs love REST - universal, documented, easy to use.

**GraphQL**: GitHub API (v4), Shopify, Facebook
When clients need flexibility in what data they fetch.

**gRPC**: Google internal, Netflix microservices, Kubernetes internals
When speed matters more than simplicity.`,
                collapsed: true
            },
            {
                title: 'Quick Decision Guide',
                type: 'diagram',
                content: `
    Public API? ───────────────────→ REST (universal)
    Mobile app with complex data? ─→ GraphQL (efficient)
    Microservices internal calls? ─→ gRPC (fast)
    Simple CRUD app? ──────────────→ REST (simplest)
    Real-time streaming? ──────────→ gRPC or WebSockets

    Many companies mix all three:
    REST for public API
    GraphQL for frontend
    gRPC for service-to-service
`,
                collapsed: true
            }
        ],
        relatedTopics: ['microservices', 'scalability', 'rate-limiting'],
        difficulty: 'intermediate'
    },

    // ==================== ARCHITECTURE PATTERNS ====================
    {
        id: 'microservices',
        icon: '🧩',
        category: 'Architecture',
        title: 'Microservices vs Monolith',
        tldr: 'Monolith = one big app. Microservices = many small apps that talk to each other.',

        imagine: `Monolith: One chef cooks entire meal. Simple, but if chef is sick, no food.
Microservices: One chef for appetizers, one for mains, one for desserts.
More coordination needed, but dessert chef sick? Others still work.`,

        sections: [
            {
                title: 'The Core Idea',
                content: `**Monolith:**
- Single deployable unit
- Shared database, shared code
- Simple to develop, deploy, debug

**Microservices:**
- Many small, independent services
- Each has own database
- Deploy, scale, fail independently`,
                collapsed: false
            },
            {
                title: 'What If Scenarios',
                type: 'whatif',
                items: [
                    {
                        question: 'What if one feature needs 10x more capacity?',
                        answer: `Monolith: Scale entire app (wasteful)
Microservices: Scale just that service

Example: Black Friday sales spike? Scale only checkout service, not user profiles.`
                    },
                    {
                        question: 'What if you have 5 developers?',
                        answer: `Microservices are OVERKILL for small teams.
You'll spend more time on infrastructure than features.

Rule: Start monolith, extract services when you feel the pain.
Amazon, Netflix, Uber all started as monoliths.`
                    },
                    {
                        question: 'What if Service A needs data from Service B?',
                        answer: `Network call = latency + potential failure
This is microservices tax. Need retry logic, circuit breakers.

One feature that was one function call is now distributed systems problem.`
                    }
                ],
                collapsed: true
            },
            {
                title: 'Real World Examples',
                type: 'examples',
                content: `**Shopify**: Monolith (heavily modularized).
Serves millions of stores from one codebase. They call it "modular monolith."

**Netflix**: 700+ microservices.
Can update recommendation engine without touching streaming service.

**Amazon**: Started monolith in 2001. By 2009, had "two-pizza teams" each owning services.
Took 8 years of evolution, not day 1 architecture.`,
                collapsed: true
            },
            {
                title: 'Decision Guide',
                type: 'diagram',
                content: `
    Team size < 10? ───────────────→ Monolith
    Just starting? ────────────────→ Monolith
    Need independent deployments? ─→ Consider microservices
    Different scaling needs? ──────→ Consider microservices

    Migration path:
    Monolith → Modular Monolith → Extract hot services → Full microservices

    ⚠️ Don't start with microservices unless you've built them before
`,
                collapsed: true
            }
        ],
        relatedTopics: ['api-design', 'message-queues', 'service-discovery'],
        difficulty: 'intermediate'
    },

    {
        id: 'event-driven',
        icon: '⚡',
        category: 'Architecture',
        title: 'Event-Driven Architecture',
        tldr: 'Components react to events, not direct calls. Loose coupling, high scalability.',

        imagine: `Traditional: You call pizza place, they make pizza, deliver, you eat.
Event-driven: You post "I want pizza" on a board. Pizza place sees it, makes it, posts "pizza ready". Delivery sees that, picks up. You see "delivered", go get it.
No one waits for anyone.`,

        sections: [
            {
                title: 'The Core Idea',
                content: `Services emit events (things that happened).
Other services subscribe to events they care about.

**Benefits:**
- Decoupling: Emitter doesn't know/care who's listening
- Scalability: Add consumers without changing producer
- Resilience: Consumers can catch up after being down`,
                collapsed: false
            },
            {
                title: 'What If Scenarios',
                type: 'whatif',
                items: [
                    {
                        question: 'What if you need immediate response?',
                        answer: `Events are async - no response expected.
For user-facing "I need result now" flows, use request-response.

Events are great for "notify others" use cases:
- Order placed → Notify inventory, shipping, email service`
                    },
                    {
                        question: 'What if events arrive out of order?',
                        answer: `Very common problem!
"Item shipped" arrives before "Order placed"?

Solutions:
1. Include sequence numbers
2. Idempotent processing (safe to replay)
3. Event sourcing (rebuild state from events)`
                    },
                    {
                        question: 'What if debugging spans many services?',
                        answer: `Request-response: Follow the call chain
Event-driven: Who published what when?

Must have distributed tracing (Jaeger, Zipkin).
Include correlation ID in all events.`
                    }
                ],
                collapsed: true
            },
            {
                title: 'Real World Examples',
                type: 'examples',
                content: `**Uber**: Ride completed event triggers:
- Payment service charges card
- Rating service prompts for review
- Analytics records the trip
All independently, all decoupled.

**LinkedIn**: Profile update event triggers:
- Search index update
- Connection notifications
- Feed generation
Services don't call each other - all react to events.`,
                collapsed: true
            },
            {
                title: 'Visual: Event Flow',
                type: 'diagram',
                content: `
    [Order Service] ──publishes──→ "OrderPlaced" event
                                         │
         ┌───────────────────────────────┴───────────────────────────┐
         ↓                               ↓                           ↓
    [Inventory]                    [Shipping]                   [Email]
    reserves items                prepares label              sends confirmation
         │                               │                           │
         ↓                               ↓                           ↓
    "ItemsReserved"              "LabelCreated"              "EmailSent"

    Services don't know about each other!
`,
                collapsed: true
            }
        ],
        relatedTopics: ['message-queues', 'kafka', 'cqrs'],
        difficulty: 'advanced'
    },

    // ==================== RELIABILITY ====================
    {
        id: 'high-availability',
        icon: '🛡️',
        category: 'Reliability',
        title: 'High Availability',
        tldr: 'System stays up even when things fail. Measured in "nines" (99.9%, 99.99%).',

        imagine: `Hospital emergency room must always be open.
One doctor sick? Others cover. Power out? Backup generators.
Building collapsed? Other hospitals nearby.
That's high availability.`,

        sections: [
            {
                title: 'The Core Idea',
                content: `**The Nines:**
- 99% = 3.65 days downtime/year (bad)
- 99.9% = 8.76 hours/year (typical)
- 99.99% = 52.6 minutes/year (good)
- 99.999% = 5.26 minutes/year (excellent)

**How to achieve:**
- Redundancy (multiple of everything)
- No single point of failure
- Automatic failover`,
                collapsed: false
            },
            {
                title: 'What If Scenarios',
                type: 'whatif',
                items: [
                    {
                        question: 'What if your database server dies?',
                        answer: `Without HA: Site is down until you fix it (hours?)
With HA: Standby replica takes over (seconds)

Replication modes:
- Sync: Standby always up to date, but slower writes
- Async: Faster writes, but might lose last few seconds of data`
                    },
                    {
                        question: 'What if entire data center goes down?',
                        answer: `Multi-region deployment! Data replicated to another datacenter.

But: More latency for writes (data must travel far)
And: Way more expensive

Most companies: Multi-AZ (same region, different buildings)
Big companies: Multi-region for critical services`
                    },
                    {
                        question: 'What if the failover itself fails?',
                        answer: `This happens! Untested failover = no failover.

Chaos engineering: Netflix "Chaos Monkey" randomly kills servers in production.
If your system survives random failures daily, it'll survive real outages.`
                    }
                ],
                collapsed: true
            },
            {
                title: 'Real World Examples',
                type: 'examples',
                content: `**Google**: Data replicated across continents. You're reading from nearest copy.
Global load balancing routes around failures automatically.

**AWS S3**: 99.999999999% durability (11 nines).
They replicate your file across multiple data centers before saying "upload complete."

**Stripe**: Payment processing must be always up.
Multiple database replicas, multiple regions, automatic failover.`,
                collapsed: true
            },
            {
                title: 'HA Architecture Pattern',
                type: 'diagram',
                content: `
    [Users] → [Load Balancer] ─┬→ [Server A] ──┐
                 (active)      │               │
                               └→ [Server B]  ─┼→ [Primary DB]
                                               │      ↓ sync
    [Load Balancer]                            │   [Replica DB]
       (standby)                               │      ↓ async
                                               └→ [DR Site]

    Primary LB fails → Standby takes over (DNS or IP failover)
    Primary DB fails → Replica promoted
    Region fails → DR site activated
`,
                collapsed: true
            }
        ],
        relatedTopics: ['load-balancing', 'database-replication', 'disaster-recovery'],
        difficulty: 'intermediate'
    },

    {
        id: 'rate-limiting',
        icon: '🚦',
        category: 'Reliability',
        title: 'Rate Limiting',
        tldr: 'Cap how many requests a user/client can make. Prevents abuse and overload.',

        imagine: `Theme park: Only 100 people per hour on the rollercoaster.
More want to ride? They wait. Prevents accidents and breakdowns.
Rate limiting for your API.`,

        sections: [
            {
                title: 'The Core Idea',
                content: `**Why rate limit:**
- Prevent abuse (spam, scraping)
- Protect your servers from overload
- Fair usage (one user shouldn't hog resources)

**Common limits:**
- Per user: 100 requests/minute
- Per IP: 1000 requests/minute
- Per endpoint: /search gets stricter limit than /profile`,
                collapsed: false
            },
            {
                title: 'What If Scenarios',
                type: 'whatif',
                items: [
                    {
                        question: 'What if legitimate users get rate limited?',
                        answer: `Return helpful error: "Rate limited. Retry after 60 seconds."
Include headers: X-RateLimit-Remaining, X-RateLimit-Reset

Offer higher tiers for power users (paid plans).`
                    },
                    {
                        question: 'What if attacker uses many IPs?',
                        answer: `IP-based limiting isn't enough.
Combine with:
- API key limits
- User account limits
- Behavioral analysis (bot detection)

Cloudflare does sophisticated bot detection.`
                    },
                    {
                        question: 'What if you have multiple servers?',
                        answer: `Local counting doesn't work - user hits different servers.
Use distributed counter:
- Redis (fast, common choice)
- Or each server reports to central limiter

Trade-off: Extra latency for every request to check limit.`
                    }
                ],
                collapsed: true
            },
            {
                title: 'Algorithms',
                type: 'diagram',
                content: `
    TOKEN BUCKET (most common):
    - Bucket holds 100 tokens
    - Each request takes 1 token
    - Bucket refills at 10 tokens/second
    - Empty bucket = rate limited
    ✅ Allows short bursts

    SLIDING WINDOW:
    - Count requests in last N seconds
    - Over limit = rejected
    ✅ Smooth limiting
    ⚠️ More memory (store timestamps)

    FIXED WINDOW:
    - Count resets every minute
    ⚠️ Allows burst at window edge
`,
                collapsed: true
            },
            {
                title: 'Real World Examples',
                type: 'examples',
                content: `**GitHub API**: 5000 requests/hour authenticated, 60/hour unauthenticated.
Clear headers show remaining quota.

**Twitter**: 300 tweets/3 hours, 1000 DMs/day.
Prevents spam while allowing normal use.

**Stripe**: Allows bursts but has daily caps.
Different limits for test vs live mode.`,
                collapsed: true
            }
        ],
        relatedTopics: ['api-design', 'caching', 'security'],
        difficulty: 'intermediate'
    },

    // ==================== REAL SYSTEMS ====================
    {
        id: 'design-url-shortener',
        icon: '🔗',
        category: 'Real Systems',
        title: 'Design: URL Shortener (bit.ly)',
        tldr: 'Generate short codes for long URLs. Store mapping, redirect when accessed.',

        imagine: `Library card catalog. Long book title → Short call number.
You give call number, librarian finds exact book.`,

        sections: [
            {
                title: 'Requirements',
                content: `**Functional:**
- Shorten long URL → short code
- Redirect short code → original URL
- (Optional) Custom short codes, analytics

**Non-functional:**
- Very low latency (redirect must be instant)
- High availability (links can't break)
- Scale: 100M URLs, 1B redirects/day`,
                collapsed: false
            },
            {
                title: 'Core Design',
                type: 'diagram',
                content: `
    CREATE SHORT URL:
    [Client] → POST /shorten {url: "long..."} → [App Server]
         ↓
    Generate unique code (base62: a-zA-Z0-9)
         ↓
    Store in DB: {code: "abc123", url: "https://long...", created: ...}
         ↓
    Return: "https://short.url/abc123"

    REDIRECT:
    [Client] → GET /abc123 → [App Server] → [Cache/DB lookup]
         ↓
    HTTP 301/302 Redirect to original URL
`,
                collapsed: false
            },
            {
                title: 'Key Decisions',
                type: 'whatif',
                items: [
                    {
                        question: 'How to generate unique short codes?',
                        answer: `Option 1: Random + check collision
- Generate random 6-char code
- Check if exists, retry if collision
- Works at small scale, slows with more URLs

Option 2: Counter + Base62
- Distributed counter (Redis INCR)
- Convert to base62: 12345 → "dnh"
- No collisions, predictable
- Sequential = might expose volume

Option 3: Hash + truncate
- MD5/SHA of URL, take first 6 chars
- Same URL = same code (dedup!)
- Still check collisions`
                    },
                    {
                        question: 'How to handle 1B redirects/day?',
                        answer: `Heavy caching! Most URLs are accessed repeatedly.
- Cache: code → url mapping
- 80% of traffic hits 20% of URLs
- Cache those hot URLs, DB handles rest

CDN for global low latency
- Geographic distribution
- Edge caches short code mappings`
                    },
                    {
                        question: '301 vs 302 redirect?',
                        answer: `301 (Permanent): Browser caches, never asks again
- Less load on you
- But: Can't track analytics, can't change destination

302 (Temporary): Browser always asks
- More load
- But: Full analytics, can update destination

bit.ly uses 301 with separate analytics beacon.`
                    }
                ],
                collapsed: true
            },
            {
                title: 'Full Architecture',
                type: 'diagram',
                content: `
    [Users] → [CDN/Load Balancer]
                    ↓
            [App Servers] ←→ [Redis Cache]
                    ↓            (hot URLs)
            [Database]
            (sharded by code prefix)

    Sharding: codes a-m → Shard A, n-z → Shard B

    For 100M URLs, 7-char codes = 62^7 = 3.5 trillion possibilities
    6 chars = 56 billion, plenty for most use cases
`,
                collapsed: true
            }
        ],
        relatedTopics: ['caching', 'database-sharding', 'load-balancing'],
        difficulty: 'intermediate'
    },

    {
        id: 'design-rate-limiter',
        icon: '⏱️',
        category: 'Real Systems',
        title: 'Design: Distributed Rate Limiter',
        tldr: 'Count requests across many servers. Reject when over limit.',

        imagine: `Concert with multiple entrances. Each gate has a clicker.
Central display shows total. Hit 50,000? All gates stop admitting.`,

        sections: [
            {
                title: 'Requirements',
                content: `**Functional:**
- Limit requests per user/IP/API key
- Different limits for different endpoints
- Return meaningful error when limited

**Non-functional:**
- Low latency (check must be fast)
- Accurate (can't have significant over/under counting)
- Distributed (work across many servers)`,
                collapsed: false
            },
            {
                title: 'Core Design',
                type: 'diagram',
                content: `
    Request flow:
    [Client] → [Load Balancer] → [Rate Limiter] → [App Server]
                                      ↓
                                 [Redis]
                                 (counter storage)

    Per request:
    1. Extract identifier (user_id, IP, API key)
    2. Check counter in Redis
    3. Under limit? Increment and proceed
    4. Over limit? Return 429 Too Many Requests
`,
                collapsed: false
            },
            {
                title: 'Algorithm Implementation',
                type: 'whatif',
                items: [
                    {
                        question: 'Token Bucket in Redis?',
                        answer: `Simple approach with Lua script:
\`\`\`
tokens = GET user:123:tokens
last_refill = GET user:123:last_refill
now = current_time()

# Refill tokens based on time passed
elapsed = now - last_refill
new_tokens = min(tokens + elapsed * refill_rate, max_tokens)

if new_tokens >= 1:
  SET user:123:tokens = new_tokens - 1
  return ALLOWED
else:
  return DENIED
\`\`\`
Lua script = atomic, no race conditions.`
                    },
                    {
                        question: 'Sliding Window in Redis?',
                        answer: `Use sorted set with timestamps:
\`\`\`
ZADD user:123:requests <timestamp> <request_id>
ZREMRANGEBYSCORE user:123:requests 0 <now - window_size>
count = ZCARD user:123:requests

if count < limit:
  return ALLOWED
else:
  return DENIED
\`\`\`
More memory but precise counting.`
                    },
                    {
                        question: 'What if Redis is slow/down?',
                        answer: `Options:
1. Fail open: Allow request (dangerous)
2. Fail closed: Reject request (safer for protecting backend)
3. Local fallback: Each server does local limiting (allows over-limit)

Best practice: Fail closed with local cache.
Cached recent limits, refresh periodically.`
                    }
                ],
                collapsed: true
            },
            {
                title: 'Scale Considerations',
                content: `**Single Redis**: Fine up to ~100K checks/second
**Redis Cluster**: Shard by user_id for higher scale
**Local + Central**: Local approximate limiting, periodic sync to central

**Headers to return:**
- X-RateLimit-Limit: 100
- X-RateLimit-Remaining: 45
- X-RateLimit-Reset: 1609459200 (Unix timestamp)

**Response when limited:**
- 429 Too Many Requests
- Retry-After: 60`,
                collapsed: true
            }
        ],
        relatedTopics: ['rate-limiting', 'redis', 'api-design'],
        difficulty: 'intermediate'
    },

    {
        id: 'design-notification-system',
        icon: '🔔',
        category: 'Real Systems',
        title: 'Design: Notification System',
        tldr: 'Send push, email, SMS to millions of users. Handle preferences and failures.',

        imagine: `Post office that handles letters, packages, and telegrams.
User says "letters only to this address."
System routes each message correctly.`,

        sections: [
            {
                title: 'Requirements',
                content: `**Functional:**
- Send notifications via push, email, SMS
- User preferences (channels, frequency, opt-out)
- Template management
- Delivery tracking

**Non-functional:**
- Scale: 10M notifications/day
- Low latency for critical alerts
- Reliability (notifications must not be lost)`,
                collapsed: false
            },
            {
                title: 'Core Architecture',
                type: 'diagram',
                content: `
    [Services] → POST /notify {user_id, type, data}
                            ↓
                    [Notification Service]
                            ↓
                    [Message Queue]
            ┌───────────┼───────────┐
            ↓           ↓           ↓
       [Push Worker] [Email Worker] [SMS Worker]
            ↓           ↓           ↓
         [APNs/FCM]  [SendGrid]  [Twilio]
`,
                collapsed: false
            },
            {
                title: 'Key Design Decisions',
                type: 'whatif',
                items: [
                    {
                        question: 'How to handle user preferences?',
                        answer: `User preference service:
\`\`\`
{
  user_id: 123,
  channels: {
    push: true,
    email: true,
    sms: false
  },
  quiet_hours: {start: "22:00", end: "08:00"},
  frequency: "instant" | "daily_digest" | "weekly"
}
\`\`\`
Check preferences before queueing. Cache heavily.`
                    },
                    {
                        question: 'What if external service (SendGrid) is down?',
                        answer: `Retry with exponential backoff:
- Attempt 1: Immediate
- Attempt 2: 1 minute
- Attempt 3: 5 minutes
- Attempt 4: 30 minutes
- Then: Move to dead letter queue, alert ops

Important notifications: Try backup provider.`
                    },
                    {
                        question: 'How to send 10M notifications fast?',
                        answer: `Parallel workers + batching:
- Email: SendGrid batch API (1000 per call)
- Push: FCM topic messaging (multicast)
- Queue partitioned by priority

High priority (security alert): Dedicated fast lane
Low priority (marketing): Batch and throttle`
                    }
                ],
                collapsed: true
            },
            {
                title: 'Detailed Flow',
                content: `**Trigger notification:**
1. Service calls POST /notify
2. Validate payload, check rate limits
3. Fetch user preferences (cached)
4. Apply quiet hours, frequency rules
5. Queue to appropriate channel workers

**Worker processing:**
1. Dequeue batch of notifications
2. Render template with user data
3. Call external API (with retry)
4. Log delivery status
5. Update analytics

**Templates:**
Store templates with variables:
"Hello {{user.name}}, your order {{order.id}} shipped!"`,
                collapsed: true
            }
        ],
        relatedTopics: ['message-queues', 'scalability', 'high-availability'],
        difficulty: 'intermediate'
    },

    {
        id: 'design-chat-system',
        icon: '💬',
        category: 'Real Systems',
        title: 'Design: Real-Time Chat (WhatsApp/Slack)',
        tldr: 'Persistent connections, message routing, presence detection, offline sync.',

        imagine: `Telephone switchboard operator.
Alice calls, operator connects to Bob's line.
Bob offline? Message waits. Bob comes online? All pending messages delivered.`,

        sections: [
            {
                title: 'Requirements',
                content: `**Functional:**
- 1:1 and group chat
- Online/offline presence
- Message delivery status (sent, delivered, read)
- Message history and search

**Non-functional:**
- Real-time: <100ms latency
- Scale: 50M concurrent users
- Reliability: Messages must not be lost`,
                collapsed: false
            },
            {
                title: 'Core Architecture',
                type: 'diagram',
                content: `
    [Users] ←WebSocket→ [Chat Servers] ←→ [Message Queue]
                              ↓               ↓
                        [User Location     [Message
                          Service]          Storage]
                              ↓
                          [Redis]
                        (who's where)

    Message flow:
    1. Alice sends message
    2. Chat server looks up Bob's location
    3. If online: Route to Bob's chat server
    4. If offline: Store, deliver when online
`,
                collapsed: false
            },
            {
                title: 'Key Design Decisions',
                type: 'whatif',
                items: [
                    {
                        question: 'How to maintain millions of connections?',
                        answer: `WebSocket servers with sticky sessions:
- Each server holds ~100K connections
- User connects to one server, stays there
- Redis tracks: user_123 → server_5

On server failure:
- Clients auto-reconnect (built into WebSocket libs)
- New server assigned
- Fetch missed messages from storage`
                    },
                    {
                        question: 'How does Bob know Alice is typing?',
                        answer: `Presence/typing indicators are "ephemeral" - don't store.
Send directly via WebSocket, no persistence.

Alice types → Alice's server → Bob's server → Bob
If lost, no big deal (just UI nicety).

Presence: Heartbeat every 30 seconds.
No heartbeat for 1 minute = offline.`
                    },
                    {
                        question: 'How to guarantee message delivery?',
                        answer: `Message states:
1. Sent (to server) - Alice sees single check
2. Delivered (to Bob's device) - Alice sees double check
3. Read (Bob opened) - Alice sees blue checks

Ack protocol:
- Server acks when stored
- Bob's client acks when received
- Retry until acked`
                    },
                    {
                        question: 'How to handle group chat with 1000 members?',
                        answer: `Fan-out approaches:

Push (WhatsApp style):
- Store once, push to each online member
- Good for small groups
- Expensive for large groups

Pull (Slack style):
- Store once, members fetch on demand
- Good for large groups, less real-time

Hybrid:
- Push for small groups (<100)
- Pull + notification for large groups`
                    }
                ],
                collapsed: true
            },
            {
                title: 'Message Storage',
                type: 'diagram',
                content: `
    For 1:1 chat:
    - Key: conversation_id (sorted user IDs)
    - Value: messages array

    For group chat:
    - Key: group_id
    - Value: messages array

    Storage: Cassandra or similar (write-heavy, time-sorted)

    Message schema:
    {
      id: uuid,
      sender_id: 123,
      conversation_id: "conv_456",
      content: "Hello!",
      timestamp: 1609459200,
      status: "delivered"
    }
`,
                collapsed: true
            }
        ],
        relatedTopics: ['websockets', 'message-queues', 'database-design'],
        difficulty: 'advanced'
    }
];

// ==================== BASIC PROBLEMS ====================
const BASIC_PROBLEMS = [
    {
        id: 'two-sum',
        icon: '➕',
        title: 'Two Sum',
        category: 'Arrays',
        difficulty: 'Easy',
        tldr: 'Find two numbers that add up to target.',

        problem: `Given an array of integers and a target, return indices of two numbers that add up to target.

**Example:**
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1] (because nums[0] + nums[1] = 2 + 7 = 9)`,

        solutions: [
            {
                name: 'Brute Force',
                complexity: 'O(n²) time, O(1) space',
                approach: `Check every pair of numbers.`,
                code: `def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
                pros: ['Simple to understand', 'No extra space', 'Works in-place'],
                cons: ['Very slow for large arrays', 'Checks same pairs multiple times'],
                whenToUse: 'Small arrays (<100 elements), interviews as starting point'
            },
            {
                name: 'Hash Map (Optimal)',
                complexity: 'O(n) time, O(n) space',
                approach: `For each number, check if (target - number) exists in hash map.`,
                code: `def two_sum(nums, target):
    seen = {}  # number -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
                pros: ['Fast - single pass', 'Handles duplicates correctly'],
                cons: ['Uses extra memory', 'Slightly more complex'],
                whenToUse: 'Large arrays, when speed matters (default choice)'
            },
            {
                name: 'Two Pointers (Sorted)',
                complexity: 'O(n log n) time, O(1) space',
                approach: `Sort array, use two pointers from ends moving inward.`,
                code: `def two_sum_sorted(nums, target):
    # Note: Returns values, not indices
    sorted_nums = sorted(nums)
    left, right = 0, len(sorted_nums) - 1

    while left < right:
        current_sum = sorted_nums[left] + sorted_nums[right]
        if current_sum == target:
            return [sorted_nums[left], sorted_nums[right]]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return []`,
                pros: ['No extra space (if sorting in-place)', 'Elegant approach'],
                cons: ['Loses original indices', 'Sorting adds overhead'],
                whenToUse: 'When array is already sorted, or you need values not indices'
            }
        ],

        intuition: `Think of it like finding a partner at a dance.
Brute force: Ask every person "Are you my partner?"
Hash map: Write your number on a board. Check if your partner's number is already there.`,

        followUp: [
            'What if array is sorted? → Two pointers',
            'What if multiple pairs exist? → Return all pairs',
            'Three Sum? → Fix one number, Two Sum on rest'
        ]
    },

    {
        id: 'valid-parentheses',
        icon: '🔗',
        title: 'Valid Parentheses',
        category: 'Stacks',
        difficulty: 'Easy',
        tldr: 'Check if brackets are balanced and properly nested.',

        problem: `Given string with (){}[], determine if brackets are valid.

**Example:**
Input: "([{}])"  → Output: true
Input: "([)]"    → Output: false (wrong nesting)
Input: "((("     → Output: false (unclosed)`,

        solutions: [
            {
                name: 'Stack (Optimal)',
                complexity: 'O(n) time, O(n) space',
                approach: `Push opening brackets. For closing, pop and check match.`,
                code: `def is_valid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in '({[':
            stack.append(char)
        elif char in ')}]':
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()

    return len(stack) == 0`,
                pros: ['Clean and intuitive', 'Handles all edge cases'],
                cons: ['Uses extra space'],
                whenToUse: 'Default approach - this is the standard solution'
            },
            {
                name: 'Counter (Limited)',
                complexity: 'O(n) time, O(1) space',
                approach: `Count opens/closes. Works only for single bracket type.`,
                code: `def is_valid_parens_only(s):
    count = 0
    for char in s:
        if char == '(':
            count += 1
        elif char == ')':
            count -= 1
        if count < 0:  # More closes than opens
            return False
    return count == 0`,
                pros: ['No extra space', 'Very simple'],
                cons: ['Only works for ONE bracket type', 'Can\'t check nesting'],
                whenToUse: 'When you only have parentheses (), not mixed brackets'
            },
            {
                name: 'Replace Until Empty',
                complexity: 'O(n²) time, O(n) space',
                approach: `Repeatedly remove valid pairs "()", "{}", "[]" until empty or stuck.`,
                code: `def is_valid_replace(s):
    while '()' in s or '{}' in s or '[]' in s:
        s = s.replace('()', '')
        s = s.replace('{}', '')
        s = s.replace('[]', '')
    return s == ''`,
                pros: ['Very intuitive to understand', 'No stack needed'],
                cons: ['Very slow - O(n²)', 'Creates many string copies'],
                whenToUse: 'Never in production - only to explain concept'
            }
        ],

        intuition: `Think of Russian nesting dolls.
Each opening bracket starts a doll.
Each closing bracket closes the MOST RECENT doll.
At the end, all dolls must be closed.`,

        followUp: [
            'Minimum insertions to make valid?',
            'Longest valid substring?',
            'Generate all valid combinations of n pairs?'
        ]
    },

    {
        id: 'reverse-linked-list',
        icon: '🔄',
        title: 'Reverse Linked List',
        category: 'Linked Lists',
        difficulty: 'Easy',
        tldr: 'Point each node to its previous instead of next.',

        problem: `Reverse a singly linked list.

**Example:**
Input: 1 → 2 → 3 → 4 → 5
Output: 5 → 4 → 3 → 2 → 1`,

        solutions: [
            {
                name: 'Iterative (Optimal)',
                complexity: 'O(n) time, O(1) space',
                approach: `Track prev, curr, next. Reverse pointers one by one.`,
                code: `def reverse_list(head):
    prev = None
    curr = head

    while curr:
        next_temp = curr.next  # Save next
        curr.next = prev       # Reverse pointer
        prev = curr            # Move prev forward
        curr = next_temp       # Move curr forward

    return prev`,
                pros: ['Constant space', 'Single pass', 'In-place'],
                cons: ['Pointer manipulation can be confusing'],
                whenToUse: 'Default approach - most efficient'
            },
            {
                name: 'Recursive',
                complexity: 'O(n) time, O(n) space (call stack)',
                approach: `Reverse rest of list, then fix current node.`,
                code: `def reverse_list_recursive(head):
    # Base case
    if not head or not head.next:
        return head

    # Reverse the rest
    new_head = reverse_list_recursive(head.next)

    # Fix pointers
    head.next.next = head  # Next node points back to us
    head.next = None       # We point to nothing

    return new_head`,
                pros: ['Elegant', 'Good for understanding recursion'],
                cons: ['Uses call stack space', 'Stack overflow for long lists'],
                whenToUse: 'When recursion is required, or for learning'
            },
            {
                name: 'Using Stack',
                complexity: 'O(n) time, O(n) space',
                approach: `Push all nodes to stack, pop to rebuild.`,
                code: `def reverse_list_stack(head):
    if not head:
        return None

    stack = []
    curr = head
    while curr:
        stack.append(curr)
        curr = curr.next

    new_head = stack.pop()
    curr = new_head
    while stack:
        curr.next = stack.pop()
        curr = curr.next
    curr.next = None

    return new_head`,
                pros: ['Very intuitive', 'Easy to understand'],
                cons: ['Extra space', 'Two passes'],
                whenToUse: 'When clarity matters more than efficiency'
            }
        ],

        intuition: `Imagine a conga line changing direction.
Each person needs to turn around AND grab the person who was behind them.
You process one person at a time, front to back.`,

        followUp: [
            'Reverse in groups of k?',
            'Reverse between positions m and n?',
            'Is it a palindrome? (reverse half, compare)'
        ]
    },

    {
        id: 'binary-search',
        icon: '🔍',
        title: 'Binary Search',
        category: 'Searching',
        difficulty: 'Easy',
        tldr: 'Cut search space in half each step. Requires sorted array.',

        problem: `Find target in sorted array. Return index or -1.

**Example:**
Input: nums = [1, 3, 5, 7, 9, 11], target = 7
Output: 3`,

        solutions: [
            {
                name: 'Iterative (Optimal)',
                complexity: 'O(log n) time, O(1) space',
                approach: `Maintain left/right bounds. Check middle, adjust bounds.`,
                code: `def binary_search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2  # Avoid overflow

        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`,
                pros: ['Constant space', 'No recursion overhead'],
                cons: ['Off-by-one errors common'],
                whenToUse: 'Default approach - most practical'
            },
            {
                name: 'Recursive',
                complexity: 'O(log n) time, O(log n) space',
                approach: `Recursively search left or right half.`,
                code: `def binary_search_recursive(nums, target, left=0, right=None):
    if right is None:
        right = len(nums) - 1

    if left > right:
        return -1

    mid = left + (right - left) // 2

    if nums[mid] == target:
        return mid
    elif nums[mid] < target:
        return binary_search_recursive(nums, target, mid + 1, right)
    else:
        return binary_search_recursive(nums, target, left, mid - 1)`,
                pros: ['Clean and elegant', 'Easy to reason about'],
                cons: ['Call stack space', 'Slightly slower'],
                whenToUse: 'When recursive thinking fits the problem better'
            },
            {
                name: 'Linear Search (Baseline)',
                complexity: 'O(n) time, O(1) space',
                approach: `Check every element.`,
                code: `def linear_search(nums, target):
    for i, num in enumerate(nums):
        if num == target:
            return i
    return -1`,
                pros: ['Works on unsorted arrays', 'Simple'],
                cons: ['Very slow for large arrays'],
                whenToUse: 'When array is unsorted or very small'
            }
        ],

        intuition: `Phone book lookup. Looking for "Smith"?
Open to middle. "M"? Too early, go to second half.
Open that middle. "T"? Too late, go to first half of that.
Each step eliminates half the remaining pages.`,

        followUp: [
            'Find first/last occurrence?',
            'Find insertion point?',
            'Search in rotated sorted array?'
        ]
    },

    {
        id: 'merge-sorted-arrays',
        icon: '🔀',
        title: 'Merge Two Sorted Arrays',
        category: 'Arrays',
        difficulty: 'Easy',
        tldr: 'Use two pointers to pick smaller element each step.',

        problem: `Merge two sorted arrays into one sorted array.

**Example:**
Input: [1, 3, 5], [2, 4, 6]
Output: [1, 2, 3, 4, 5, 6]`,

        solutions: [
            {
                name: 'Two Pointers (Optimal)',
                complexity: 'O(n + m) time, O(n + m) space',
                approach: `Compare front of both arrays, pick smaller, advance that pointer.`,
                code: `def merge(nums1, nums2):
    result = []
    i, j = 0, 0

    while i < len(nums1) and j < len(nums2):
        if nums1[i] <= nums2[j]:
            result.append(nums1[i])
            i += 1
        else:
            result.append(nums2[j])
            j += 1

    # Add remaining elements
    result.extend(nums1[i:])
    result.extend(nums2[j:])

    return result`,
                pros: ['Optimal time', 'Clean logic', 'Stable'],
                cons: ['Requires extra space for result'],
                whenToUse: 'Default approach for merging sorted arrays'
            },
            {
                name: 'In-Place (For merge into nums1)',
                complexity: 'O(n + m) time, O(1) space',
                approach: `Start from end of both arrays, fill nums1 from back.`,
                code: `def merge_in_place(nums1, m, nums2, n):
    # nums1 has extra space at end
    p1, p2, p = m - 1, n - 1, m + n - 1

    while p1 >= 0 and p2 >= 0:
        if nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1

    # Copy remaining from nums2 (nums1 elements already in place)
    nums1[:p2 + 1] = nums2[:p2 + 1]`,
                pros: ['No extra space', 'In-place modification'],
                cons: ['Trickier logic', 'Needs nums1 to have space'],
                whenToUse: 'When merging into first array (LeetCode problem 88)'
            },
            {
                name: 'Concatenate and Sort',
                complexity: 'O((n+m) log(n+m)) time, O(n+m) space',
                approach: `Join arrays and sort.`,
                code: `def merge_naive(nums1, nums2):
    return sorted(nums1 + nums2)`,
                pros: ['One-liner', 'Hard to get wrong'],
                cons: ['Wastes the sorted property', 'Slower'],
                whenToUse: 'Quick and dirty, when performance doesn\'t matter'
            }
        ],

        intuition: `Two lines of people sorted by height merging into one line.
Compare the shortest person from each line.
Shorter one joins merged line. Repeat.`,

        followUp: [
            'Merge k sorted arrays? → Min heap',
            'Find median of two sorted arrays? → Binary search',
            'Merge with limited memory? → External merge sort'
        ]
    },

    {
        id: 'max-subarray',
        icon: '📈',
        title: 'Maximum Subarray (Kadane\'s)',
        category: 'Dynamic Programming',
        difficulty: 'Medium',
        tldr: 'Track best sum ending at each position. Reset if negative.',

        problem: `Find contiguous subarray with largest sum.

**Example:**
Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6 (subarray [4, -1, 2, 1])`,

        solutions: [
            {
                name: 'Kadane\'s Algorithm (Optimal)',
                complexity: 'O(n) time, O(1) space',
                approach: `At each position: extend previous subarray or start fresh?`,
                code: `def max_subarray(nums):
    max_sum = current_sum = nums[0]

    for num in nums[1:]:
        # Either extend previous subarray or start new one
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)

    return max_sum`,
                pros: ['Optimal time and space', 'Single pass', 'Elegant'],
                cons: ['Takes time to understand intuition'],
                whenToUse: 'Always - this is THE solution for this problem'
            },
            {
                name: 'Divide and Conquer',
                complexity: 'O(n log n) time, O(log n) space',
                approach: `Max is either in left half, right half, or crosses middle.`,
                code: `def max_subarray_dc(nums):
    def helper(left, right):
        if left == right:
            return nums[left]

        mid = (left + right) // 2

        # Max in left half
        left_max = helper(left, mid)
        # Max in right half
        right_max = helper(mid + 1, right)
        # Max crossing middle
        cross_max = max_crossing(left, mid, right)

        return max(left_max, right_max, cross_max)

    def max_crossing(left, mid, right):
        left_sum = float('-inf')
        curr = 0
        for i in range(mid, left - 1, -1):
            curr += nums[i]
            left_sum = max(left_sum, curr)

        right_sum = float('-inf')
        curr = 0
        for i in range(mid + 1, right + 1):
            curr += nums[i]
            right_sum = max(right_sum, curr)

        return left_sum + right_sum

    return helper(0, len(nums) - 1)`,
                pros: ['Good for learning D&C', 'Parallelizable'],
                cons: ['More complex', 'Slower than Kadane'],
                whenToUse: 'Learning divide and conquer, or when parallelization matters'
            },
            {
                name: 'Brute Force',
                complexity: 'O(n²) time, O(1) space',
                approach: `Try every possible subarray.`,
                code: `def max_subarray_brute(nums):
    max_sum = float('-inf')

    for i in range(len(nums)):
        current_sum = 0
        for j in range(i, len(nums)):
            current_sum += nums[j]
            max_sum = max(max_sum, current_sum)

    return max_sum`,
                pros: ['Easy to understand', 'Can find actual subarray easily'],
                cons: ['Very slow'],
                whenToUse: 'Only to verify Kadane\'s on small inputs'
            }
        ],

        intuition: `You're walking collecting coins (positive) and paying tolls (negative).
At each step: Is my current pocket money positive? Keep walking.
Negative? Drop everything, start fresh from here.
Track the best pocket money you ever had.`,

        followUp: [
            'Return the actual subarray? → Track start/end indices',
            'Maximum product subarray? → Track min too (negatives flip)',
            'Maximum sum with at most k elements? → Sliding window'
        ]
    },

    {
        id: 'lru-cache',
        icon: '📦',
        title: 'LRU Cache',
        category: 'Design',
        difficulty: 'Medium',
        tldr: 'Hash map for O(1) lookup + doubly linked list for O(1) ordering.',

        problem: `Design a cache that evicts least recently used items when full.

**Operations:**
- get(key): Return value or -1
- put(key, value): Insert/update. Evict LRU if full.

Both operations must be O(1).`,

        solutions: [
            {
                name: 'Hash Map + Doubly Linked List (Optimal)',
                complexity: 'O(1) for both operations',
                approach: `Hash map: key → node. DLL maintains access order.`,
                code: `class Node:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}  # key -> node

        # Dummy head and tail
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_to_front(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key):
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._remove(node)
        self._add_to_front(node)  # Mark as recently used
        return node.val

    def put(self, key, val):
        if key in self.cache:
            self._remove(self.cache[key])

        node = Node(key, val)
        self.cache[key] = node
        self._add_to_front(node)

        if len(self.cache) > self.capacity:
            # Remove LRU (node before tail)
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]`,
                pros: ['O(1) everything', 'Industry standard'],
                cons: ['More complex to implement'],
                whenToUse: 'Production systems, interviews - this is THE answer'
            },
            {
                name: 'OrderedDict (Python)',
                complexity: 'O(1) for both operations',
                approach: `Python's OrderedDict maintains insertion order. Move to end on access.`,
                code: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key, val):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = val
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove first (oldest)`,
                pros: ['Very clean', 'Less code', 'Built-in optimization'],
                cons: ['Python-specific', 'Hides complexity'],
                whenToUse: 'Python interviews where brevity matters'
            },
            {
                name: 'Simple Dict + Timestamp (Slow)',
                complexity: 'O(n) eviction',
                approach: `Store timestamp with each entry. Scan for oldest on evict.`,
                code: `import time

class LRUCacheSlow:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}  # key -> (value, timestamp)

    def get(self, key):
        if key not in self.cache:
            return -1
        val, _ = self.cache[key]
        self.cache[key] = (val, time.time())
        return val

    def put(self, key, val):
        self.cache[key] = (val, time.time())
        if len(self.cache) > self.capacity:
            # Find and remove oldest
            oldest_key = min(self.cache, key=lambda k: self.cache[k][1])
            del self.cache[oldest_key]`,
                pros: ['Simple to understand'],
                cons: ['O(n) eviction', 'Not acceptable in interviews'],
                whenToUse: 'Never - just to understand the problem'
            }
        ],

        intuition: `Browser history. Recent pages at front.
Click a link? Add to front.
Click old link? Move it to front.
Too many pages? Remove last one (oldest).
Hash map lets you find any page instantly.`,

        followUp: [
            'LFU Cache (Least Frequently Used)?',
            'Time-based expiration (TTL)?',
            'Thread-safe version?'
        ]
    },

    {
        id: 'bfs-tree',
        icon: '🌳',
        title: 'BFS Level Order Traversal',
        category: 'Trees',
        difficulty: 'Medium',
        tldr: 'Use queue. Process level by level.',

        problem: `Return tree values level by level (top to bottom, left to right).

**Example:**
     3
    / \\
   9  20
      / \\
     15  7

Output: [[3], [9, 20], [15, 7]]`,

        solutions: [
            {
                name: 'BFS with Queue (Optimal)',
                complexity: 'O(n) time, O(n) space',
                approach: `Use queue. Process all nodes at current level before moving to next.`,
                code: `from collections import deque

def level_order(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level = []

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)

    return result`,
                pros: ['Natural level separation', 'Easy to understand', 'Iterative'],
                cons: ['Queue space'],
                whenToUse: 'Default approach for level-order problems'
            },
            {
                name: 'DFS with Level Tracking',
                complexity: 'O(n) time, O(n) space',
                approach: `DFS but track depth. Add to correct level in result.`,
                code: `def level_order_dfs(root):
    result = []

    def dfs(node, level):
        if not node:
            return

        # Expand result if needed
        if level >= len(result):
            result.append([])

        result[level].append(node.val)
        dfs(node.left, level + 1)
        dfs(node.right, level + 1)

    dfs(root, 0)
    return result`,
                pros: ['Uses recursion naturally', 'Same complexity'],
                cons: ['Not intuitive for "level" concept', 'Call stack'],
                whenToUse: 'When you\'re already doing DFS and need levels'
            },
            {
                name: 'Two Lists (No Queue)',
                complexity: 'O(n) time, O(n) space',
                approach: `Alternate between two lists for current and next level.`,
                code: `def level_order_two_lists(root):
    if not root:
        return []

    result = []
    current_level = [root]

    while current_level:
        result.append([node.val for node in current_level])
        next_level = []

        for node in current_level:
            if node.left:
                next_level.append(node.left)
            if node.right:
                next_level.append(node.right)

        current_level = next_level

    return result`,
                pros: ['No deque import needed', 'Clear level separation'],
                cons: ['Creates new list each level'],
                whenToUse: 'When deque isn\'t available'
            }
        ],

        intuition: `Processing a queue at DMV. Everyone who arrived at 9am gets processed before 9:15 arrivals.
Tree BFS: Process all floor 1 offices before floor 2.
Queue ensures FIFO - first in, first out.`,

        followUp: [
            'Zigzag level order? → Reverse alternate levels',
            'Right side view? → Last node of each level',
            'Average of levels? → Sum/count per level'
        ]
    }
];

// ==================== COMPLEX PROBLEMS ====================
const COMPLEX_PROBLEMS = [
    {
        id: 'word-ladder',
        icon: '🪜',
        title: 'Word Ladder',
        category: 'BFS + Graph',
        difficulty: 'Hard',
        source: 'Google, Amazon, Facebook',

        tldr: 'BFS where each word is a node, edges connect words differing by one letter.',

        problem: `Transform beginWord to endWord, changing one letter at a time. Each intermediate word must be in wordList. Return minimum transformations.

**Example:**
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5 (hit → hot → dot → dog → cog)`,

        approach: `Model as unweighted graph. BFS finds shortest path.

**Key insight:** Don't try all word pairs. For each word, generate all possible one-letter variants and check if in wordList.`,

        code: `from collections import deque

def ladder_length(begin, end, word_list):
    word_set = set(word_list)
    if end not in word_set:
        return 0

    queue = deque([(begin, 1)])
    visited = {begin}

    while queue:
        word, length = queue.popleft()

        if word == end:
            return length

        # Try changing each position
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                next_word = word[:i] + c + word[i+1:]

                if next_word in word_set and next_word not in visited:
                    visited.add(next_word)
                    queue.append((next_word, length + 1))

    return 0`,

        complexity: 'O(M² × N) where M = word length, N = wordList size',

        optimization: `**Bidirectional BFS**: Start from both ends, meet in middle.
Reduces time from O(b^d) to O(b^(d/2)) where b = branching factor, d = depth.

**Pattern matching**: Pre-process wordList into patterns.
"hot" → ["*ot", "h*t", "ho*"]
Words matching same pattern are neighbors.`,

        followUp: [
            'Return all shortest paths? → BFS + track parents + backtrack',
            'What if wordList has 1M words? → Bidirectional BFS essential',
            'Weighted transformations? → Dijkstra instead of BFS'
        ]
    },

    {
        id: 'alien-dictionary',
        icon: '👽',
        title: 'Alien Dictionary',
        category: 'Topological Sort',
        difficulty: 'Hard',
        source: 'Facebook, Google, Airbnb',

        tldr: 'Build directed graph from word ordering, then topological sort.',

        problem: `Given sorted list of words in alien language, derive character ordering.

**Example:**
words = ["wrt", "wrf", "er", "ett", "rftt"]
Output: "wertf"

Explanation: From "wrt" < "wrf", we know t < f
From "wrt" < "er", we know w < e
etc.`,

        approach: `1. Compare adjacent words to find ordering rules
2. Build directed graph: edge a→b means a comes before b
3. Topological sort the graph
4. If cycle exists, no valid ordering

**Key insight:** Only first different character between adjacent words tells us ordering.`,

        code: `from collections import defaultdict, deque

def alien_order(words):
    # Build graph
    graph = defaultdict(set)
    in_degree = {c: 0 for word in words for c in word}

    # Compare adjacent words
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]

        # Invalid: prefix comes after longer word
        if len(w1) > len(w2) and w1.startswith(w2):
            return ""

        # Find first difference
        for c1, c2 in zip(w1, w2):
            if c1 != c2:
                if c2 not in graph[c1]:
                    graph[c1].add(c2)
                    in_degree[c2] += 1
                break

    # Topological sort (Kahn's algorithm)
    queue = deque([c for c in in_degree if in_degree[c] == 0])
    result = []

    while queue:
        c = queue.popleft()
        result.append(c)

        for neighbor in graph[c]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # Check for cycle
    if len(result) < len(in_degree):
        return ""

    return "".join(result)`,

        complexity: 'O(C) where C = total characters across all words',

        followUp: [
            'Multiple valid orderings? → Track all in topo sort',
            'Verify if given ordering is valid? → Check all constraints',
            'What if some orderings are contradictory? → Detect cycle'
        ]
    },

    {
        id: 'serialize-deserialize-tree',
        icon: '📝',
        title: 'Serialize/Deserialize Binary Tree',
        category: 'Trees + Design',
        difficulty: 'Hard',
        source: 'Google, Facebook, Microsoft',

        tldr: 'Convert tree to string (preorder with nulls) and back.',

        problem: `Design algorithm to serialize binary tree to string and deserialize back.

Tree:
    1
   / \\
  2   3
     / \\
    4   5

Serialized: "1,2,null,null,3,4,null,null,5,null,null"`,

        approach: `Use preorder traversal. Mark nulls explicitly.
- Serialize: Preorder DFS, add "null" for missing children
- Deserialize: Read values in same order, build tree recursively`,

        code: `class Codec:
    def serialize(self, root):
        def dfs(node):
            if not node:
                return ["null"]
            return [str(node.val)] + dfs(node.left) + dfs(node.right)

        return ",".join(dfs(root))

    def deserialize(self, data):
        values = iter(data.split(","))

        def build():
            val = next(values)
            if val == "null":
                return None

            node = TreeNode(int(val))
            node.left = build()
            node.right = build()
            return node

        return build()`,

        complexity: 'O(n) time and space for both operations',

        alternatives: `**Level-order (BFS):**
Serialize: BFS, include nulls
Better for complete trees, worse for sparse

**Parentheses notation:**
"1(2()())(3(4()())(5()()))"
Human readable but more complex parsing`,

        followUp: [
            'Serialize BST more efficiently? → No nulls needed, use bounds',
            'Serialize N-ary tree? → Store child count or use delimiters',
            'Compress the serialized format? → Use binary encoding'
        ]
    },

    {
        id: 'meeting-rooms-ii',
        icon: '🏢',
        title: 'Meeting Rooms II (Min Rooms)',
        category: 'Intervals + Heap',
        difficulty: 'Medium',
        source: 'Google, Facebook, Bloomberg',

        tldr: 'Sort by start time. Use min-heap to track room end times.',

        problem: `Given meeting time intervals, find minimum conference rooms required.

**Example:**
intervals = [[0,30], [5,10], [15,20]]
Output: 2

Timeline:
Room 1: [0----30]
Room 2:   [5-10]  [15-20]`,

        approach: `Sort meetings by start time. For each meeting:
- If a room is free (earliest end ≤ current start), reuse it
- Otherwise, allocate new room

Min-heap tracks end times. Heap top = earliest available room.`,

        code: `import heapq

def min_meeting_rooms(intervals):
    if not intervals:
        return 0

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    # Min-heap of end times
    heap = []

    for start, end in intervals:
        # If room available (ended before this meeting starts)
        if heap and heap[0] <= start:
            heapq.heappop(heap)  # Reuse room

        heapq.heappush(heap, end)  # Assign room

    return len(heap)`,

        complexity: 'O(n log n) time, O(n) space',

        alternative: `**Chronological ordering:**
Separate starts and ends, sort, sweep through.
+1 at each start, -1 at each end.
Max concurrent = answer.

\`\`\`python
def min_rooms_sweep(intervals):
    events = []
    for start, end in intervals:
        events.append((start, 1))   # +1 room needed
        events.append((end, -1))    # -1 room freed

    events.sort()
    rooms = max_rooms = 0

    for time, delta in events:
        rooms += delta
        max_rooms = max(max_rooms, rooms)

    return max_rooms
\`\`\``,

        followUp: [
            'Return which meetings go in which room?',
            'Find the first free slot of given duration?',
            'What if rooms have different capacities?'
        ]
    },

    {
        id: 'trapping-rain-water',
        icon: '🌧️',
        title: 'Trapping Rain Water',
        category: 'Two Pointers / DP',
        difficulty: 'Hard',
        source: 'Amazon, Google, Goldman Sachs',

        tldr: 'Water at each position = min(maxLeft, maxRight) - height',

        problem: `Given elevation map, compute how much water can be trapped.

**Example:**
height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6

Visual:
       #
   #~~~##~#
 #~##~######
[0,1,0,2,1,0,1,3,2,1,2,1]`,

        approach: `For each position, water level = min of (tallest bar on left, tallest bar on right).
Water trapped = water level - bar height.

Three approaches:
1. **Precompute**: Two passes for maxLeft[], maxRight[]
2. **Two Pointers**: Process from shorter side inward
3. **Stack**: Track bars that could trap water`,

        code: `# Two Pointers - O(n) time, O(1) space
def trap(height):
    if not height:
        return 0

    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
    water = 0

    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1

    return water`,

        intuition: `Water finds its level. At any position, water rises until it hits:
- The tallest wall on left, OR
- The tallest wall on right (whichever is shorter)

If you're at the shorter side, you know exactly how much water can be there.
Process from the shorter side; the taller side is guaranteed higher.`,

        complexity: 'O(n) time, O(1) space',

        followUp: [
            '2D version (trapping water in 3D)? → BFS from edges inward',
            'Container with most water? → Two pointers, different logic',
            'Minimum platforms for trains? → Similar interval problem'
        ]
    },

    {
        id: 'lru-cache-complex',
        icon: '💾',
        title: 'Design LRU Cache (System)',
        category: 'Design + Data Structures',
        difficulty: 'Hard',
        source: 'All FAANG',

        tldr: 'Hash map + doubly linked list for O(1) get/put with eviction.',

        problem: `Design thread-safe LRU cache with:
- get(key): O(1) return value
- put(key, value): O(1) insert, evict LRU if full
- Thread safety for concurrent access`,

        approach: `**Data structures:**
- HashMap: key → DLL node (O(1) lookup)
- Doubly Linked List: ordering (O(1) move/remove)

**Thread safety:**
- Read-write lock for concurrent reads
- Or lock-free with CAS operations`,

        code: `import threading
from collections import OrderedDict

class ThreadSafeLRU:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()
        self.lock = threading.RLock()

    def get(self, key):
        with self.lock:
            if key not in self.cache:
                return -1
            self.cache.move_to_end(key)
            return self.cache[key]

    def put(self, key, value):
        with self.lock:
            if key in self.cache:
                self.cache.move_to_end(key)
            self.cache[key] = value
            if len(self.cache) > self.capacity:
                self.cache.popitem(last=False)`,

        scaleUp: `**For distributed systems:**
1. **Consistent hashing**: Partition cache across nodes
2. **Replication**: Each partition on multiple nodes
3. **Coordination**: Use Redis or Memcached

**Optimizations:**
- Segment locks (lock only affected bucket)
- Read-copy-update for read-heavy workloads
- Bloom filter to avoid cache misses`,

        followUp: [
            'LFU Cache (Least Frequently Used)?',
            'TTL-based expiration?',
            'Distributed across 100 servers?'
        ]
    },

    {
        id: 'merge-k-sorted-lists',
        icon: '🔗',
        title: 'Merge K Sorted Lists',
        category: 'Heap + Linked Lists',
        difficulty: 'Hard',
        source: 'Amazon, Google, Facebook',

        tldr: 'Min-heap to always pick smallest among k list heads.',

        problem: `Merge k sorted linked lists into one sorted list.

**Example:**
lists = [[1,4,5], [1,3,4], [2,6]]
Output: [1,1,2,3,4,4,5,6]`,

        approach: `**Min-Heap approach:**
1. Add first node from each list to min-heap
2. Pop smallest, add to result
3. Push next node from that list
4. Repeat until heap empty

**Why heap?** Always O(log k) to get smallest among k elements.`,

        code: `import heapq

def merge_k_lists(lists):
    # Handle comparison for heap
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))

    dummy = ListNode(0)
    current = dummy

    while heap:
        val, i, node = heapq.heappop(heap)
        current.next = node
        current = current.next

        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return dummy.next`,

        complexity: 'O(N log k) where N = total nodes, k = number of lists',

        alternatives: `**Divide and Conquer:**
Merge lists pairwise repeatedly.
Round 1: k lists → k/2 lists
Round 2: k/2 → k/4
...until 1 list

Same O(N log k) complexity, but might be faster due to cache locality.

**Sequential merge:**
Merge list 1 and 2, then result with 3, etc.
O(kN) - much slower.`,

        followUp: [
            'K sorted arrays instead of lists? → Same approach',
            'External sort (data doesn\'t fit in memory)? → K-way merge',
            'Streaming data from k sources? → Same pattern'
        ]
    },

    {
        id: 'word-search-ii',
        icon: '🔤',
        title: 'Word Search II (Multiple Words)',
        category: 'Trie + Backtracking',
        difficulty: 'Hard',
        source: 'Amazon, Google, Microsoft',

        tldr: 'Build Trie from words. DFS on board, checking Trie at each step.',

        problem: `Given m×n board and list of words, find all words on board.
Words formed from adjacent cells (up/down/left/right), each cell used once per word.

**Example:**
board = [["o","a","a","n"],
         ["e","t","a","e"],
         ["i","h","k","r"],
         ["i","f","l","v"]]
words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]`,

        approach: `**Naive:** For each word, DFS on board → O(W × M × N × 4^L)
**Optimized:** Build Trie, single DFS checks all words simultaneously

1. Build Trie from all words
2. DFS from each cell, traverse Trie in parallel
3. When reaching word end in Trie, add to result
4. Prune: If no Trie path, stop exploring`,

        code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None  # Store complete word at end

def find_words(board, words):
    # Build Trie
    root = TrieNode()
    for word in words:
        node = root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.word = word

    result = []
    rows, cols = len(board), len(board[0])

    def dfs(r, c, node):
        char = board[r][c]
        if char not in node.children:
            return

        next_node = node.children[char]

        if next_node.word:
            result.append(next_node.word)
            next_node.word = None  # Avoid duplicates

        # Mark visited
        board[r][c] = '#'

        # Explore neighbors
        for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != '#':
                dfs(nr, nc, next_node)

        # Restore
        board[r][c] = char

        # Prune empty branches
        if not next_node.children:
            del node.children[char]

    for r in range(rows):
        for c in range(cols):
            dfs(r, c, root)

    return result`,

        complexity: 'O(M × N × 4^L) but with heavy pruning',

        followUp: [
            'Single word search? → Simple DFS, no Trie needed',
            'Stream of words to search? → Keep Trie, reuse',
            'Find longest word on board? → Track length during DFS'
        ]
    }
];

// Export for use in dashboard.js
window.SYSTEM_DESIGN_TOPICS = SYSTEM_DESIGN_TOPICS;
window.BASIC_PROBLEMS = BASIC_PROBLEMS;
window.COMPLEX_PROBLEMS = COMPLEX_PROBLEMS;
