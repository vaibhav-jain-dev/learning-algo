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

// ==================== DESIGN PATTERNS ====================
const DESIGN_PATTERNS = [
    // ==================== CREATIONAL PATTERNS ====================
    {
        id: 'singleton',
        icon: '1️⃣',
        category: 'Creational',
        title: 'Singleton',
        tldr: 'Only ONE instance of a class ever exists. Global access point.',

        imagine: `There's only ONE president of a country at a time.
Anyone can ask "who's the president?" and get the same answer.
That's Singleton - one instance, global access.`,

        whenToUse: [
            'Database connection pool (one pool, many users)',
            'Configuration manager (one config for entire app)',
            'Logger (one logger instance)',
            'Cache manager'
        ],

        caveats: [
            'Hard to unit test (global state)',
            'Hides dependencies (not explicit in constructor)',
            'Thread safety issues if not careful',
            'Can become a "god object" antipattern'
        ],

        pythonCode: `class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.value = None
        return cls._instance

# Usage
s1 = Singleton()
s2 = Singleton()
print(s1 is s2)  # True - same instance!

# Thread-safe version
import threading

class ThreadSafeSingleton:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:  # Double-check
                    cls._instance = super().__new__(cls)
        return cls._instance`,

        goCode: `package main

import (
    "sync"
)

type Singleton struct {
    Value string
}

var (
    instance *Singleton
    once     sync.Once
)

// GetInstance returns the singleton instance
func GetInstance() *Singleton {
    once.Do(func() {
        instance = &Singleton{}
    })
    return instance
}

func main() {
    s1 := GetInstance()
    s2 := GetInstance()
    println(s1 == s2) // true - same instance
}`,

        pros: [
            'Guaranteed single instance',
            'Global access point',
            'Lazy initialization possible',
            'Saves memory for heavy objects'
        ],
        cons: [
            'Global state - hard to test',
            'Violates Single Responsibility Principle',
            'Tight coupling throughout codebase',
            'Concurrency issues without proper locking'
        ],

        realWorld: `**Database Connection Pool**: One pool shared by all requests.
**Logger**: One logger instance across entire application.
**Config Manager**: Read once, access everywhere.`,

        antipatterns: `⚠️ **Don't use Singleton for:**
- Objects that hold request-specific state
- Objects that need different configurations in tests
- Just because you want global access (use dependency injection instead)`
    },

    {
        id: 'factory-method',
        icon: '🏭',
        category: 'Creational',
        title: 'Factory Method',
        tldr: 'Subclasses decide which class to instantiate. Defers creation to child classes.',

        imagine: `A pizza restaurant has a "create pizza" method.
NYC branch creates thin crust, Chicago branch creates deep dish.
Same method name, different products based on who's calling.`,

        whenToUse: [
            'When you don\'t know exact types beforehand',
            'When subclasses should specify object types',
            'When you want to localize object creation logic',
            'Framework code where users extend your classes'
        ],

        caveats: [
            'Can lead to many subclasses',
            'Client must subclass creator to create new products',
            'Simple cases may be overengineered'
        ],

        pythonCode: `from abc import ABC, abstractmethod

# Product interface
class Button(ABC):
    @abstractmethod
    def render(self): pass

    @abstractmethod
    def on_click(self): pass

# Concrete products
class WindowsButton(Button):
    def render(self):
        return "Windows style button"
    def on_click(self):
        return "Windows click handler"

class MacButton(Button):
    def render(self):
        return "Mac style button"
    def on_click(self):
        return "Mac click handler"

# Creator (Factory)
class Dialog(ABC):
    @abstractmethod
    def create_button(self) -> Button:
        """Factory method - subclasses override this"""
        pass

    def render(self):
        button = self.create_button()  # Factory method call
        return button.render()

# Concrete creators
class WindowsDialog(Dialog):
    def create_button(self) -> Button:
        return WindowsButton()

class MacDialog(Dialog):
    def create_button(self) -> Button:
        return MacButton()

# Client code
def get_dialog(os_type: str) -> Dialog:
    if os_type == "windows":
        return WindowsDialog()
    elif os_type == "mac":
        return MacDialog()
    raise ValueError(f"Unknown OS: {os_type}")

# Usage
dialog = get_dialog("mac")
print(dialog.render())  # "Mac style button"`,

        goCode: `package main

import "fmt"

// Product interface
type Button interface {
    Render() string
    OnClick() string
}

// Concrete products
type WindowsButton struct{}
func (w *WindowsButton) Render() string { return "Windows button" }
func (w *WindowsButton) OnClick() string { return "Windows click" }

type MacButton struct{}
func (m *MacButton) Render() string { return "Mac button" }
func (m *MacButton) OnClick() string { return "Mac click" }

// Creator interface with factory method
type Dialog interface {
    CreateButton() Button
    Render() string
}

// Base dialog with common logic
type BaseDialog struct {
    factory func() Button
}

func (b *BaseDialog) Render() string {
    button := b.factory()
    return button.Render()
}

// Concrete creators
func NewWindowsDialog() Dialog {
    return &BaseDialog{factory: func() Button { return &WindowsButton{} }}
}

func NewMacDialog() Dialog {
    return &BaseDialog{factory: func() Button { return &MacButton{} }}
}

func main() {
    dialog := NewMacDialog()
    fmt.Println(dialog.Render()) // "Mac button"
}`,

        pros: [
            'Loose coupling between creator and products',
            'Single Responsibility - creation in one place',
            'Open/Closed - add new products without changing existing code',
            'Easier unit testing with mock products'
        ],
        cons: [
            'Can result in many subclasses',
            'Code complexity increases',
            'Requires inheritance hierarchy'
        ],

        realWorld: `**UI Frameworks**: Different button/dialog for each OS.
**Document Editors**: CreateDocument() returns Word, PDF, etc.
**Logistics**: CreateTransport() returns Truck, Ship, Plane.`
    },

    {
        id: 'abstract-factory',
        icon: '🏗️',
        category: 'Creational',
        title: 'Abstract Factory',
        tldr: 'Create families of related objects without specifying concrete classes.',

        imagine: `IKEA has furniture "families" - Modern, Victorian, Art Deco.
Each family has Chair + Sofa + Table that match each other.
Abstract Factory creates the whole matching set.`,

        whenToUse: [
            'Creating families of related objects (UI themes)',
            'System should be independent of how products are created',
            'Products from same family must be used together',
            'Cross-platform applications'
        ],

        caveats: [
            'Adding new product types requires changing all factories',
            'Can be overkill for simple cases',
            'Lots of interfaces and classes'
        ],

        pythonCode: `from abc import ABC, abstractmethod

# Abstract products
class Button(ABC):
    @abstractmethod
    def paint(self): pass

class Checkbox(ABC):
    @abstractmethod
    def paint(self): pass

# Concrete products - Windows family
class WindowsButton(Button):
    def paint(self): return "Windows Button"

class WindowsCheckbox(Checkbox):
    def paint(self): return "Windows Checkbox"

# Concrete products - Mac family
class MacButton(Button):
    def paint(self): return "Mac Button"

class MacCheckbox(Checkbox):
    def paint(self): return "Mac Checkbox"

# Abstract Factory
class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button: pass

    @abstractmethod
    def create_checkbox(self) -> Checkbox: pass

# Concrete factories
class WindowsFactory(GUIFactory):
    def create_button(self) -> Button:
        return WindowsButton()
    def create_checkbox(self) -> Checkbox:
        return WindowsCheckbox()

class MacFactory(GUIFactory):
    def create_button(self) -> Button:
        return MacButton()
    def create_checkbox(self) -> Checkbox:
        return MacCheckbox()

# Client code - works with ANY factory
class Application:
    def __init__(self, factory: GUIFactory):
        self.button = factory.create_button()
        self.checkbox = factory.create_checkbox()

    def render(self):
        return f"{self.button.paint()} + {self.checkbox.paint()}"

# Usage
factory = MacFactory()
app = Application(factory)
print(app.render())  # "Mac Button + Mac Checkbox"`,

        goCode: `package main

import "fmt"

// Abstract products
type Button interface { Paint() string }
type Checkbox interface { Paint() string }

// Windows family
type WinButton struct{}
func (w *WinButton) Paint() string { return "Windows Button" }

type WinCheckbox struct{}
func (w *WinCheckbox) Paint() string { return "Windows Checkbox" }

// Mac family
type MacButton struct{}
func (m *MacButton) Paint() string { return "Mac Button" }

type MacCheckbox struct{}
func (m *MacCheckbox) Paint() string { return "Mac Checkbox" }

// Abstract Factory interface
type GUIFactory interface {
    CreateButton() Button
    CreateCheckbox() Checkbox
}

// Concrete factories
type WindowsFactory struct{}
func (w *WindowsFactory) CreateButton() Button { return &WinButton{} }
func (w *WindowsFactory) CreateCheckbox() Checkbox { return &WinCheckbox{} }

type MacFactory struct{}
func (m *MacFactory) CreateButton() Button { return &MacButton{} }
func (m *MacFactory) CreateCheckbox() Checkbox { return &MacCheckbox{} }

// Client
type App struct {
    button   Button
    checkbox Checkbox
}

func NewApp(factory GUIFactory) *App {
    return &App{
        button:   factory.CreateButton(),
        checkbox: factory.CreateCheckbox(),
    }
}

func main() {
    factory := &MacFactory{}
    app := NewApp(factory)
    fmt.Println(app.button.Paint()) // "Mac Button"
}`,

        pros: [
            'Products from same factory are compatible',
            'Isolates concrete classes from client',
            'Easy to swap entire product families',
            'Single Responsibility for each factory'
        ],
        cons: [
            'Adding new product types is difficult',
            'Many interfaces and classes needed',
            'Can be complex for simple scenarios'
        ],

        realWorld: `**Cross-platform UI**: Windows/Mac/Linux widget families.
**Database Access**: MySQL/PostgreSQL/SQLite connection families.
**Document Generation**: PDF/HTML/Word document families.`
    },

    {
        id: 'builder',
        icon: '🔧',
        category: 'Creational',
        title: 'Builder',
        tldr: 'Construct complex objects step by step. Same process, different representations.',

        imagine: `Building a house: lay foundation, build walls, add roof, install doors.
Same steps, but you can build wooden house, stone house, or glass house.
Builder separates the HOW from the WHAT.`,

        whenToUse: [
            'Complex objects with many optional parameters',
            'Object creation involves many steps',
            'Need different representations of same object',
            'Avoid "telescoping constructor" antipattern'
        ],

        caveats: [
            'Adds complexity for simple objects',
            'Client must know steps to build',
            'Mutable builders can cause issues'
        ],

        pythonCode: `class Computer:
    def __init__(self):
        self.cpu = None
        self.ram = None
        self.storage = None
        self.gpu = None

    def __str__(self):
        return f"CPU: {self.cpu}, RAM: {self.ram}, Storage: {self.storage}, GPU: {self.gpu}"

class ComputerBuilder:
    def __init__(self):
        self.computer = Computer()

    def set_cpu(self, cpu: str) -> 'ComputerBuilder':
        self.computer.cpu = cpu
        return self  # Enable chaining

    def set_ram(self, ram: str) -> 'ComputerBuilder':
        self.computer.ram = ram
        return self

    def set_storage(self, storage: str) -> 'ComputerBuilder':
        self.computer.storage = storage
        return self

    def set_gpu(self, gpu: str) -> 'ComputerBuilder':
        self.computer.gpu = gpu
        return self

    def build(self) -> Computer:
        return self.computer

# Usage - fluent interface
gaming_pc = (ComputerBuilder()
    .set_cpu("Intel i9")
    .set_ram("32GB")
    .set_storage("2TB SSD")
    .set_gpu("RTX 4090")
    .build())

office_pc = (ComputerBuilder()
    .set_cpu("Intel i5")
    .set_ram("16GB")
    .set_storage("512GB SSD")
    .build())  # No GPU needed

print(gaming_pc)
print(office_pc)`,

        goCode: `package main

import "fmt"

type Computer struct {
    CPU     string
    RAM     string
    Storage string
    GPU     string
}

type ComputerBuilder struct {
    computer *Computer
}

func NewComputerBuilder() *ComputerBuilder {
    return &ComputerBuilder{computer: &Computer{}}
}

func (b *ComputerBuilder) SetCPU(cpu string) *ComputerBuilder {
    b.computer.CPU = cpu
    return b
}

func (b *ComputerBuilder) SetRAM(ram string) *ComputerBuilder {
    b.computer.RAM = ram
    return b
}

func (b *ComputerBuilder) SetStorage(storage string) *ComputerBuilder {
    b.computer.Storage = storage
    return b
}

func (b *ComputerBuilder) SetGPU(gpu string) *ComputerBuilder {
    b.computer.GPU = gpu
    return b
}

func (b *ComputerBuilder) Build() *Computer {
    return b.computer
}

func main() {
    gamingPC := NewComputerBuilder().
        SetCPU("Intel i9").
        SetRAM("32GB").
        SetStorage("2TB SSD").
        SetGPU("RTX 4090").
        Build()

    fmt.Printf("%+v\\n", gamingPC)
}`,

        pros: [
            'Construct objects step-by-step',
            'Reuse same construction code',
            'Single Responsibility - isolate complex construction',
            'Fluent interface is readable'
        ],
        cons: [
            'Code complexity increases',
            'Requires creating separate builder class',
            'Can be overkill for simple objects'
        ],

        realWorld: `**HTTP Requests**: Build headers, body, params step by step.
**SQL Queries**: SELECT().FROM().WHERE().ORDER_BY()
**UI Components**: Build complex forms with many fields.`
    },

    // ==================== STRUCTURAL PATTERNS ====================
    {
        id: 'adapter',
        icon: '🔌',
        category: 'Structural',
        title: 'Adapter',
        tldr: 'Convert interface of one class to interface client expects. Plug compatibility.',

        imagine: `US plug doesn't fit European socket.
Adapter converts one interface to another.
Same electricity, different shapes.`,

        whenToUse: [
            'Integrating legacy code with new systems',
            'Using third-party libraries with different interfaces',
            'Creating reusable classes that work with incompatible interfaces',
            'Wrapping external APIs'
        ],

        caveats: [
            'Adds extra layer of indirection',
            'Can hide complexity of adaptee',
            'Too many adapters = design smell'
        ],

        pythonCode: `# Target interface (what client expects)
class MediaPlayer:
    def play(self, filename: str): pass

# Adaptee (incompatible interface)
class VLCPlayer:
    def play_vlc(self, filename: str):
        return f"Playing {filename} with VLC"

class MPVPlayer:
    def play_mpv(self, filename: str):
        return f"Playing {filename} with MPV"

# Adapter
class MediaAdapter(MediaPlayer):
    def __init__(self, player_type: str):
        if player_type == "vlc":
            self.player = VLCPlayer()
            self.play_method = self.player.play_vlc
        elif player_type == "mpv":
            self.player = MPVPlayer()
            self.play_method = self.player.play_mpv

    def play(self, filename: str):
        return self.play_method(filename)

# Client code
class AudioPlayer(MediaPlayer):
    def play(self, filename: str):
        ext = filename.split('.')[-1]
        if ext == "mp3":
            return f"Playing {filename} natively"
        elif ext in ["vlc", "mpv"]:
            adapter = MediaAdapter(ext)
            return adapter.play(filename)
        return f"Unknown format: {ext}"

# Usage
player = AudioPlayer()
print(player.play("song.mp3"))  # Native
print(player.play("movie.vlc"))  # Through adapter`,

        goCode: `package main

import "fmt"

// Target interface
type MediaPlayer interface {
    Play(filename string) string
}

// Adaptee (incompatible)
type VLCPlayer struct{}
func (v *VLCPlayer) PlayVLC(filename string) string {
    return fmt.Sprintf("Playing %s with VLC", filename)
}

// Adapter
type VLCAdapter struct {
    vlc *VLCPlayer
}

func (a *VLCAdapter) Play(filename string) string {
    return a.vlc.PlayVLC(filename)
}

func NewVLCAdapter() MediaPlayer {
    return &VLCAdapter{vlc: &VLCPlayer{}}
}

// Client
type AudioPlayer struct{}

func (a *AudioPlayer) Play(filename string) string {
    // Use adapter for VLC files
    adapter := NewVLCAdapter()
    return adapter.Play(filename)
}

func main() {
    player := &AudioPlayer{}
    fmt.Println(player.Play("movie.mp4"))
}`,

        pros: [
            'Single Responsibility - separate interface conversion',
            'Open/Closed - add adapters without changing existing code',
            'Reuse existing classes',
            'Decouple client from adaptee'
        ],
        cons: [
            'Complexity increases with many adapters',
            'Sometimes simpler to change adaptee directly',
            'Performance overhead'
        ],

        realWorld: `**Database Drivers**: Same interface for MySQL, PostgreSQL, etc.
**Payment Gateways**: Unified interface for Stripe, PayPal, etc.
**API Wrappers**: Convert REST API to your internal interface.`
    },

    {
        id: 'decorator',
        icon: '🎀',
        category: 'Structural',
        title: 'Decorator',
        tldr: 'Add behavior to objects dynamically without changing their class.',

        imagine: `Plain coffee: $2. Add milk: +$0.5. Add sugar: +$0.2.
Each addition "decorates" the coffee with new behavior.
Same coffee object, enhanced dynamically.`,

        whenToUse: [
            'Add responsibilities dynamically',
            'When subclassing would create explosion of classes',
            'When you need to combine behaviors',
            'Adding features without modifying existing code'
        ],

        caveats: [
            'Many small objects can be confusing',
            'Order of decorators matters',
            'Removing specific decorator is hard'
        ],

        pythonCode: `from abc import ABC, abstractmethod

# Component interface
class Coffee(ABC):
    @abstractmethod
    def cost(self) -> float: pass

    @abstractmethod
    def description(self) -> str: pass

# Concrete component
class SimpleCoffee(Coffee):
    def cost(self) -> float:
        return 2.0
    def description(self) -> str:
        return "Simple coffee"

# Base decorator
class CoffeeDecorator(Coffee):
    def __init__(self, coffee: Coffee):
        self._coffee = coffee

    def cost(self) -> float:
        return self._coffee.cost()

    def description(self) -> str:
        return self._coffee.description()

# Concrete decorators
class MilkDecorator(CoffeeDecorator):
    def cost(self) -> float:
        return self._coffee.cost() + 0.5

    def description(self) -> str:
        return self._coffee.description() + ", milk"

class SugarDecorator(CoffeeDecorator):
    def cost(self) -> float:
        return self._coffee.cost() + 0.2

    def description(self) -> str:
        return self._coffee.description() + ", sugar"

class WhipDecorator(CoffeeDecorator):
    def cost(self) -> float:
        return self._coffee.cost() + 0.7

    def description(self) -> str:
        return self._coffee.description() + ", whip"

# Usage - stack decorators
coffee = SimpleCoffee()
coffee = MilkDecorator(coffee)
coffee = SugarDecorator(coffee)
coffee = WhipDecorator(coffee)

print(f"{coffee.description()} = ${coffee.cost()}")
# "Simple coffee, milk, sugar, whip = $3.4"`,

        goCode: `package main

import "fmt"

// Component interface
type Coffee interface {
    Cost() float64
    Description() string
}

// Concrete component
type SimpleCoffee struct{}
func (s *SimpleCoffee) Cost() float64 { return 2.0 }
func (s *SimpleCoffee) Description() string { return "Simple coffee" }

// Decorators
type MilkDecorator struct { coffee Coffee }
func (m *MilkDecorator) Cost() float64 { return m.coffee.Cost() + 0.5 }
func (m *MilkDecorator) Description() string {
    return m.coffee.Description() + ", milk"
}

type SugarDecorator struct { coffee Coffee }
func (s *SugarDecorator) Cost() float64 { return s.coffee.Cost() + 0.2 }
func (s *SugarDecorator) Description() string {
    return s.coffee.Description() + ", sugar"
}

func main() {
    var coffee Coffee = &SimpleCoffee{}
    coffee = &MilkDecorator{coffee: coffee}
    coffee = &SugarDecorator{coffee: coffee}

    fmt.Printf("%s = $%.2f\\n", coffee.Description(), coffee.Cost())
    // "Simple coffee, milk, sugar = $2.70"
}`,

        pros: [
            'More flexible than inheritance',
            'Add/remove behaviors at runtime',
            'Single Responsibility - each decorator does one thing',
            'Combine behaviors in many ways'
        ],
        cons: [
            'Many small objects',
            'Order of wrapping matters',
            'Hard to remove specific decorator later'
        ],

        realWorld: `**I/O Streams**: BufferedReader(FileReader(file))
**Web Middleware**: Auth(Logging(Compression(Handler)))
**UI Components**: ScrollableDecorator(BorderDecorator(TextArea))`
    },

    {
        id: 'facade',
        icon: '🏛️',
        category: 'Structural',
        title: 'Facade',
        tldr: 'Simple interface to complex subsystem. Hide complexity behind one class.',

        imagine: `Starting a car: turn key. Behind the scenes: battery, starter, fuel pump, ignition...
You don't care about all that - just turn the key.
Facade hides complexity.`,

        whenToUse: [
            'Simplify complex subsystem',
            'Layer your subsystems',
            'Reduce dependencies on external code',
            'Provide entry point to library'
        ],

        caveats: [
            'Can become "god object"',
            'May hide useful functionality',
            'Tight coupling to facade'
        ],

        pythonCode: `# Complex subsystem classes
class CPU:
    def freeze(self): return "CPU frozen"
    def jump(self, address): return f"CPU jumping to {address}"
    def execute(self): return "CPU executing"

class Memory:
    def load(self, address, data):
        return f"Memory loaded {data} at {address}"

class HardDrive:
    def read(self, sector, size):
        return f"HD read {size} bytes from sector {sector}"

# Facade
class ComputerFacade:
    def __init__(self):
        self.cpu = CPU()
        self.memory = Memory()
        self.hard_drive = HardDrive()

    def start(self):
        """Simple interface to complex boot process"""
        steps = []
        steps.append(self.cpu.freeze())
        steps.append(self.hard_drive.read(0, 1024))
        steps.append(self.memory.load(0, "boot data"))
        steps.append(self.cpu.jump(0))
        steps.append(self.cpu.execute())
        return steps

# Client code - simple!
computer = ComputerFacade()
for step in computer.start():
    print(step)`,

        goCode: `package main

import "fmt"

// Complex subsystem
type CPU struct{}
func (c *CPU) Freeze() string { return "CPU frozen" }
func (c *CPU) Execute() string { return "CPU executing" }

type Memory struct{}
func (m *Memory) Load(addr int, data string) string {
    return fmt.Sprintf("Memory loaded at %d", addr)
}

type HardDrive struct{}
func (h *HardDrive) Read(sector, size int) string {
    return fmt.Sprintf("HD read %d bytes", size)
}

// Facade
type ComputerFacade struct {
    cpu    *CPU
    memory *Memory
    hd     *HardDrive
}

func NewComputer() *ComputerFacade {
    return &ComputerFacade{
        cpu:    &CPU{},
        memory: &Memory{},
        hd:     &HardDrive{},
    }
}

func (c *ComputerFacade) Start() {
    fmt.Println(c.cpu.Freeze())
    fmt.Println(c.hd.Read(0, 1024))
    fmt.Println(c.memory.Load(0, "boot"))
    fmt.Println(c.cpu.Execute())
}

func main() {
    computer := NewComputer()
    computer.Start() // Simple!
}`,

        pros: [
            'Isolates client from complex subsystem',
            'Promotes weak coupling',
            'Single entry point',
            'Easier to use and understand'
        ],
        cons: [
            'Can become coupled to all subsystem classes',
            'May hide functionality users need',
            'Can grow into "god object"'
        ],

        realWorld: `**Video Conversion**: Convert() hides codecs, formats, bitrates.
**ORM Libraries**: save() hides SQL, connections, transactions.
**Payment Processing**: charge() hides gateways, validation, fraud checks.`
    },

    // ==================== BEHAVIORAL PATTERNS ====================
    {
        id: 'strategy',
        icon: '🎯',
        category: 'Behavioral',
        title: 'Strategy',
        tldr: 'Define family of algorithms, encapsulate each, make them interchangeable.',

        imagine: `Google Maps: driving, walking, cycling, public transit.
Same destination, different strategies to get there.
Swap algorithms without changing client code.`,

        whenToUse: [
            'Multiple algorithms for same task',
            'Need to switch algorithms at runtime',
            'Avoid conditional statements for algorithm selection',
            'Algorithm variations with similar interface'
        ],

        caveats: [
            'Client must know different strategies',
            'Overkill for few algorithms',
            'Increased number of objects'
        ],

        pythonCode: `from abc import ABC, abstractmethod
from typing import List

# Strategy interface
class SortStrategy(ABC):
    @abstractmethod
    def sort(self, data: List[int]) -> List[int]: pass

# Concrete strategies
class BubbleSort(SortStrategy):
    def sort(self, data: List[int]) -> List[int]:
        arr = data.copy()
        n = len(arr)
        for i in range(n):
            for j in range(0, n-i-1):
                if arr[j] > arr[j+1]:
                    arr[j], arr[j+1] = arr[j+1], arr[j]
        return arr

class QuickSort(SortStrategy):
    def sort(self, data: List[int]) -> List[int]:
        if len(data) <= 1:
            return data
        pivot = data[len(data) // 2]
        left = [x for x in data if x < pivot]
        middle = [x for x in data if x == pivot]
        right = [x for x in data if x > pivot]
        return self.sort(left) + middle + self.sort(right)

class MergeSort(SortStrategy):
    def sort(self, data: List[int]) -> List[int]:
        if len(data) <= 1:
            return data
        mid = len(data) // 2
        left = self.sort(data[:mid])
        right = self.sort(data[mid:])
        return self._merge(left, right)

    def _merge(self, left, right):
        result = []
        i = j = 0
        while i < len(left) and j < len(right):
            if left[i] < right[j]:
                result.append(left[i]); i += 1
            else:
                result.append(right[j]); j += 1
        result.extend(left[i:])
        result.extend(right[j:])
        return result

# Context
class Sorter:
    def __init__(self, strategy: SortStrategy):
        self._strategy = strategy

    def set_strategy(self, strategy: SortStrategy):
        self._strategy = strategy

    def sort(self, data: List[int]) -> List[int]:
        return self._strategy.sort(data)

# Usage
data = [64, 34, 25, 12, 22, 11, 90]

sorter = Sorter(QuickSort())
print(sorter.sort(data))

sorter.set_strategy(MergeSort())  # Switch at runtime!
print(sorter.sort(data))`,

        goCode: `package main

import "fmt"

// Strategy interface
type SortStrategy interface {
    Sort([]int) []int
}

// Concrete strategies
type BubbleSort struct{}
func (b *BubbleSort) Sort(data []int) []int {
    arr := make([]int, len(data))
    copy(arr, data)
    n := len(arr)
    for i := 0; i < n; i++ {
        for j := 0; j < n-i-1; j++ {
            if arr[j] > arr[j+1] {
                arr[j], arr[j+1] = arr[j+1], arr[j]
            }
        }
    }
    return arr
}

type QuickSort struct{}
func (q *QuickSort) Sort(data []int) []int {
    if len(data) <= 1 {
        return data
    }
    pivot := data[len(data)/2]
    var left, middle, right []int
    for _, x := range data {
        switch {
        case x < pivot:
            left = append(left, x)
        case x == pivot:
            middle = append(middle, x)
        default:
            right = append(right, x)
        }
    }
    result := q.Sort(left)
    result = append(result, middle...)
    result = append(result, q.Sort(right)...)
    return result
}

// Context
type Sorter struct {
    strategy SortStrategy
}

func (s *Sorter) SetStrategy(strategy SortStrategy) {
    s.strategy = strategy
}

func (s *Sorter) Sort(data []int) []int {
    return s.strategy.Sort(data)
}

func main() {
    data := []int{64, 34, 25, 12, 22, 11, 90}

    sorter := &Sorter{strategy: &QuickSort{}}
    fmt.Println(sorter.Sort(data))

    sorter.SetStrategy(&BubbleSort{})
    fmt.Println(sorter.Sort(data))
}`,

        pros: [
            'Swap algorithms at runtime',
            'Isolate algorithm implementation details',
            'Replace inheritance with composition',
            'Open/Closed principle'
        ],
        cons: [
            'Clients must be aware of strategies',
            'Increases number of objects',
            'Overkill for simple variations'
        ],

        realWorld: `**Payment Methods**: CreditCard, PayPal, Crypto strategies.
**Compression**: ZIP, RAR, GZIP strategies.
**Route Planning**: Fastest, Shortest, Scenic strategies.`
    },

    {
        id: 'observer',
        icon: '👁️',
        category: 'Behavioral',
        title: 'Observer',
        tldr: 'When one object changes, all dependents are notified automatically.',

        imagine: `YouTube subscription. When channel uploads, all subscribers get notified.
Channel doesn't know who subscribers are - just broadcasts.
Subscribers react to updates.`,

        whenToUse: [
            'Changes in one object affect others',
            'Number of dependent objects unknown/dynamic',
            'Loose coupling between objects',
            'Event handling systems'
        ],

        caveats: [
            'Subscribers notified in random order',
            'Memory leaks if observers not removed',
            'Can cause cascade of updates',
            'Hard to debug notification chains'
        ],

        pythonCode: `from abc import ABC, abstractmethod
from typing import List

# Observer interface
class Observer(ABC):
    @abstractmethod
    def update(self, message: str): pass

# Subject (Observable)
class Subject:
    def __init__(self):
        self._observers: List[Observer] = []
        self._state = None

    def attach(self, observer: Observer):
        self._observers.append(observer)

    def detach(self, observer: Observer):
        self._observers.remove(observer)

    def notify(self):
        for observer in self._observers:
            observer.update(self._state)

    def set_state(self, state: str):
        self._state = state
        self.notify()

# Concrete observers
class EmailSubscriber(Observer):
    def __init__(self, email: str):
        self.email = email

    def update(self, message: str):
        print(f"Email to {self.email}: {message}")

class SMSSubscriber(Observer):
    def __init__(self, phone: str):
        self.phone = phone

    def update(self, message: str):
        print(f"SMS to {self.phone}: {message}")

class SlackSubscriber(Observer):
    def __init__(self, channel: str):
        self.channel = channel

    def update(self, message: str):
        print(f"Slack #{self.channel}: {message}")

# Usage
news_agency = Subject()

# Add subscribers
news_agency.attach(EmailSubscriber("user@example.com"))
news_agency.attach(SMSSubscriber("+1234567890"))
news_agency.attach(SlackSubscriber("news"))

# Publish news - all subscribers notified
news_agency.set_state("Breaking: Design Patterns are awesome!")`,

        goCode: `package main

import "fmt"

// Observer interface
type Observer interface {
    Update(message string)
}

// Subject
type Subject struct {
    observers []Observer
    state     string
}

func (s *Subject) Attach(o Observer) {
    s.observers = append(s.observers, o)
}

func (s *Subject) Notify() {
    for _, o := range s.observers {
        o.Update(s.state)
    }
}

func (s *Subject) SetState(state string) {
    s.state = state
    s.Notify()
}

// Concrete observers
type EmailSubscriber struct{ email string }
func (e *EmailSubscriber) Update(msg string) {
    fmt.Printf("Email to %s: %s\\n", e.email, msg)
}

type SMSSubscriber struct{ phone string }
func (s *SMSSubscriber) Update(msg string) {
    fmt.Printf("SMS to %s: %s\\n", s.phone, msg)
}

func main() {
    news := &Subject{}

    news.Attach(&EmailSubscriber{email: "user@example.com"})
    news.Attach(&SMSSubscriber{phone: "+123456"})

    news.SetState("Breaking News!")
    // Both subscribers notified
}`,

        pros: [
            'Loose coupling between subject and observers',
            'Open/Closed - add observers without changing subject',
            'Dynamic relationships at runtime',
            'Broadcast communication'
        ],
        cons: [
            'Unexpected updates (order not guaranteed)',
            'Memory leaks if observers not unregistered',
            'Can cause cascade of updates',
            'Debugging can be difficult'
        ],

        realWorld: `**Event Systems**: DOM events, GUI frameworks.
**MVC Architecture**: Model notifies Views.
**Stock Tickers**: Price changes notify all watchers.
**Social Media**: Post notifies all followers.`
    },

    {
        id: 'command',
        icon: '📜',
        category: 'Behavioral',
        title: 'Command',
        tldr: 'Encapsulate request as object. Parameterize, queue, log, undo operations.',

        imagine: `Restaurant: waiter writes order on paper, gives to kitchen.
Order is a "command object" - can be queued, logged, undone.
Kitchen doesn't need to know who ordered.`,

        whenToUse: [
            'Parameterize objects with operations',
            'Queue, schedule, or log operations',
            'Support undo/redo',
            'Decouple sender from receiver'
        ],

        caveats: [
            'Increases number of classes',
            'Can be overkill for simple operations',
            'Undo can be complex for some operations'
        ],

        pythonCode: `from abc import ABC, abstractmethod
from typing import List

# Command interface
class Command(ABC):
    @abstractmethod
    def execute(self): pass

    @abstractmethod
    def undo(self): pass

# Receiver
class TextEditor:
    def __init__(self):
        self.text = ""

    def write(self, text: str):
        self.text += text

    def delete(self, count: int):
        self.text = self.text[:-count] if count <= len(self.text) else ""

    def __str__(self):
        return self.text

# Concrete commands
class WriteCommand(Command):
    def __init__(self, editor: TextEditor, text: str):
        self.editor = editor
        self.text = text

    def execute(self):
        self.editor.write(self.text)

    def undo(self):
        self.editor.delete(len(self.text))

class DeleteCommand(Command):
    def __init__(self, editor: TextEditor, count: int):
        self.editor = editor
        self.count = count
        self.deleted_text = ""

    def execute(self):
        self.deleted_text = self.editor.text[-self.count:]
        self.editor.delete(self.count)

    def undo(self):
        self.editor.write(self.deleted_text)

# Invoker with history
class CommandManager:
    def __init__(self):
        self.history: List[Command] = []
        self.redo_stack: List[Command] = []

    def execute(self, command: Command):
        command.execute()
        self.history.append(command)
        self.redo_stack.clear()

    def undo(self):
        if self.history:
            command = self.history.pop()
            command.undo()
            self.redo_stack.append(command)

    def redo(self):
        if self.redo_stack:
            command = self.redo_stack.pop()
            command.execute()
            self.history.append(command)

# Usage
editor = TextEditor()
manager = CommandManager()

manager.execute(WriteCommand(editor, "Hello "))
manager.execute(WriteCommand(editor, "World!"))
print(editor)  # "Hello World!"

manager.undo()
print(editor)  # "Hello "

manager.redo()
print(editor)  # "Hello World!"`,

        goCode: `package main

import "fmt"

// Command interface
type Command interface {
    Execute()
    Undo()
}

// Receiver
type Editor struct {
    text string
}

func (e *Editor) Write(text string) { e.text += text }
func (e *Editor) Delete(count int) {
    if count <= len(e.text) {
        e.text = e.text[:len(e.text)-count]
    }
}

// Concrete command
type WriteCommand struct {
    editor *Editor
    text   string
}

func (w *WriteCommand) Execute() { w.editor.Write(w.text) }
func (w *WriteCommand) Undo()    { w.editor.Delete(len(w.text)) }

// Invoker
type CommandManager struct {
    history []Command
}

func (m *CommandManager) Execute(cmd Command) {
    cmd.Execute()
    m.history = append(m.history, cmd)
}

func (m *CommandManager) Undo() {
    if len(m.history) > 0 {
        cmd := m.history[len(m.history)-1]
        m.history = m.history[:len(m.history)-1]
        cmd.Undo()
    }
}

func main() {
    editor := &Editor{}
    manager := &CommandManager{}

    manager.Execute(&WriteCommand{editor: editor, text: "Hello "})
    manager.Execute(&WriteCommand{editor: editor, text: "World!"})
    fmt.Println(editor.text) // "Hello World!"

    manager.Undo()
    fmt.Println(editor.text) // "Hello "
}`,

        pros: [
            'Decouple invoker from receiver',
            'Single Responsibility - each command is a class',
            'Support undo/redo',
            'Support queuing and logging'
        ],
        cons: [
            'Many command classes',
            'Complex undo logic',
            'Memory overhead for command history'
        ],

        realWorld: `**Text Editors**: Undo/redo operations.
**Transaction Systems**: Queue and execute transactions.
**GUI Actions**: Button clicks as command objects.
**Task Queues**: Background job processing.`
    },

    {
        id: 'state',
        icon: '🚦',
        category: 'Behavioral',
        title: 'State',
        tldr: 'Object changes behavior when internal state changes. Looks like class changed.',

        imagine: `Traffic light: Red, Yellow, Green states.
Same light, different behavior based on state.
Each state knows what to do and what comes next.`,

        whenToUse: [
            'Object behavior depends on state',
            'Many conditionals based on state',
            'State transitions are complex',
            'State-specific behavior should be isolated'
        ],

        caveats: [
            'Overkill for simple state machines',
            'Can be hard to see all states',
            'Tight coupling between states'
        ],

        pythonCode: `from abc import ABC, abstractmethod

# State interface
class State(ABC):
    @abstractmethod
    def handle(self, context: 'Document'): pass

    @abstractmethod
    def __str__(self): pass

# Concrete states
class DraftState(State):
    def handle(self, context: 'Document'):
        print("Document is being edited...")
        context.state = ModerationState()

    def __str__(self):
        return "Draft"

class ModerationState(State):
    def handle(self, context: 'Document'):
        if context.is_admin:
            print("Admin approved. Publishing...")
            context.state = PublishedState()
        else:
            print("Sent for moderation review...")

    def __str__(self):
        return "Moderation"

class PublishedState(State):
    def handle(self, context: 'Document'):
        print("Document is already published!")

    def __str__(self):
        return "Published"

# Context
class Document:
    def __init__(self):
        self.state: State = DraftState()
        self.is_admin = False

    def publish(self):
        print(f"Current state: {self.state}")
        self.state.handle(self)
        print(f"New state: {self.state}")
        print()

# Usage
doc = Document()
doc.publish()  # Draft -> Moderation

doc.publish()  # Moderation (no admin) -> stays Moderation

doc.is_admin = True
doc.publish()  # Moderation (admin) -> Published

doc.publish()  # Published -> stays Published`,

        goCode: `package main

import "fmt"

// State interface
type State interface {
    Handle(doc *Document)
    String() string
}

// Context
type Document struct {
    state   State
    IsAdmin bool
}

func (d *Document) SetState(s State) { d.state = s }
func (d *Document) Publish() {
    fmt.Printf("Current: %s\\n", d.state)
    d.state.Handle(d)
    fmt.Printf("New: %s\\n\\n", d.state)
}

// Concrete states
type DraftState struct{}
func (d *DraftState) Handle(doc *Document) {
    fmt.Println("Editing...")
    doc.SetState(&ModerationState{})
}
func (d *DraftState) String() string { return "Draft" }

type ModerationState struct{}
func (m *ModerationState) Handle(doc *Document) {
    if doc.IsAdmin {
        fmt.Println("Admin approved!")
        doc.SetState(&PublishedState{})
    } else {
        fmt.Println("Waiting for review...")
    }
}
func (m *ModerationState) String() string { return "Moderation" }

type PublishedState struct{}
func (p *PublishedState) Handle(doc *Document) {
    fmt.Println("Already published!")
}
func (p *PublishedState) String() string { return "Published" }

func main() {
    doc := &Document{state: &DraftState{}}
    doc.Publish()      // Draft -> Moderation
    doc.Publish()      // Stays Moderation
    doc.IsAdmin = true
    doc.Publish()      // Moderation -> Published
}`,

        pros: [
            'Organize state-specific code',
            'Simplify complex conditionals',
            'Open/Closed - add states without changing context',
            'State transitions explicit'
        ],
        cons: [
            'Can be overkill for simple state machines',
            'Many state classes',
            'States may be coupled'
        ],

        realWorld: `**Order Processing**: Pending → Processing → Shipped → Delivered.
**Media Player**: Playing, Paused, Stopped states.
**TCP Connection**: Listen, SynReceived, Established, Closed.
**Workflow Engines**: Approval states.`
    },

    {
        id: 'template-method',
        icon: '📋',
        category: 'Behavioral',
        title: 'Template Method',
        tldr: 'Define skeleton in base class. Subclasses override specific steps.',

        imagine: `Building a house: foundation, walls, roof, interior.
Same steps, but wooden house vs brick house have different implementations.
Base class defines the order, subclasses define specifics.`,

        whenToUse: [
            'Multiple classes with similar algorithms',
            'Control the algorithm extension points',
            'Avoid code duplication',
            'Framework development'
        ],

        caveats: [
            'Inheritance required',
            'Can violate Liskov Substitution',
            'Rigid structure',
            'Hard to understand for complex templates'
        ],

        pythonCode: `from abc import ABC, abstractmethod

# Abstract class with template method
class DataMiner(ABC):

    def mine(self, path: str):
        """Template method - defines the skeleton"""
        file = self.open_file(path)
        raw_data = self.extract_data(file)
        data = self.parse_data(raw_data)
        analysis = self.analyze_data(data)
        self.send_report(analysis)
        self.close_file(file)

    @abstractmethod
    def open_file(self, path: str): pass

    @abstractmethod
    def extract_data(self, file): pass

    @abstractmethod
    def parse_data(self, raw_data): pass

    # Hook - optional override
    def analyze_data(self, data):
        return f"Analyzed: {data}"

    def send_report(self, analysis):
        print(f"Report: {analysis}")

    @abstractmethod
    def close_file(self, file): pass

# Concrete implementations
class PDFMiner(DataMiner):
    def open_file(self, path: str):
        print(f"Opening PDF: {path}")
        return f"pdf_handle_{path}"

    def extract_data(self, file):
        return f"raw_pdf_data_from_{file}"

    def parse_data(self, raw_data):
        return f"parsed_pdf: {raw_data}"

    def close_file(self, file):
        print(f"Closing PDF: {file}")

class CSVMiner(DataMiner):
    def open_file(self, path: str):
        print(f"Opening CSV: {path}")
        return f"csv_handle_{path}"

    def extract_data(self, file):
        return f"raw_csv_data_from_{file}"

    def parse_data(self, raw_data):
        return f"parsed_csv: {raw_data}"

    def close_file(self, file):
        print(f"Closing CSV: {file}")

# Usage
pdf_miner = PDFMiner()
pdf_miner.mine("report.pdf")

print()

csv_miner = CSVMiner()
csv_miner.mine("data.csv")`,

        goCode: `package main

import "fmt"

// Template interface
type DataMiner interface {
    OpenFile(path string) string
    ExtractData(file string) string
    ParseData(raw string) string
    CloseFile(file string)
}

// Base template execution
func Mine(miner DataMiner, path string) {
    file := miner.OpenFile(path)
    raw := miner.ExtractData(file)
    data := miner.ParseData(raw)
    fmt.Printf("Report: Analyzed %s\\n", data)
    miner.CloseFile(file)
}

// PDF implementation
type PDFMiner struct{}
func (p *PDFMiner) OpenFile(path string) string {
    fmt.Printf("Opening PDF: %s\\n", path)
    return "pdf_handle"
}
func (p *PDFMiner) ExtractData(file string) string { return "pdf_raw" }
func (p *PDFMiner) ParseData(raw string) string { return "pdf_parsed" }
func (p *PDFMiner) CloseFile(file string) { fmt.Println("Closing PDF") }

// CSV implementation
type CSVMiner struct{}
func (c *CSVMiner) OpenFile(path string) string {
    fmt.Printf("Opening CSV: %s\\n", path)
    return "csv_handle"
}
func (c *CSVMiner) ExtractData(file string) string { return "csv_raw" }
func (c *CSVMiner) ParseData(raw string) string { return "csv_parsed" }
func (c *CSVMiner) CloseFile(file string) { fmt.Println("Closing CSV") }

func main() {
    Mine(&PDFMiner{}, "report.pdf")
    fmt.Println()
    Mine(&CSVMiner{}, "data.csv")
}`,

        pros: [
            'Code reuse in base class',
            'Control extension points',
            'Easy to create variants',
            'Enforces algorithm structure'
        ],
        cons: [
            'Requires inheritance',
            'Can violate Liskov Substitution',
            'Subclasses tightly coupled to base',
            'Complex templates hard to maintain'
        ],

        realWorld: `**Data Processing Pipelines**: Extract → Transform → Load.
**Testing Frameworks**: setUp() → test() → tearDown().
**Build Tools**: configure → compile → link → package.
**Game AI**: Think → Move → Attack loop.`
    }
];

// ==================== MACHINE CODING PROBLEMS ====================
const MACHINE_CODING = [
    {
        id: 'parking-lot',
        icon: '🅿️',
        title: 'Parking Lot System',
        difficulty: 'Medium',
        timeLimit: '45-60 mins',
        patternsUsed: ['Singleton', 'Factory', 'Strategy', 'Observer'],

        tldr: 'Design a multi-floor parking lot with different vehicle types and pricing strategies.',

        requirements: `**Functional:**
- Park vehicles (Car, Motorcycle, Truck)
- Different spot sizes (Small, Medium, Large)
- Find available spot
- Calculate parking fee
- Display availability

**Non-functional:**
- Support multiple floors
- Different pricing strategies
- Real-time availability updates`,

        designDecisions: [
            {
                decision: 'How to manage the single parking lot instance?',
                pattern: 'Singleton',
                reason: 'Only one parking lot exists. Global access needed.'
            },
            {
                decision: 'How to create different vehicle types?',
                pattern: 'Factory',
                reason: 'Decouple vehicle creation from parking logic.'
            },
            {
                decision: 'How to handle different pricing strategies?',
                pattern: 'Strategy',
                reason: 'Hourly, daily, membership pricing - swap at runtime.'
            },
            {
                decision: 'How to notify when spot becomes available?',
                pattern: 'Observer',
                reason: 'Display boards subscribe to availability changes.'
            }
        ],

        pythonCode: `from abc import ABC, abstractmethod
from enum import Enum
from datetime import datetime
from typing import List, Optional, Dict
import threading

# ==================== ENUMS ====================
class VehicleType(Enum):
    MOTORCYCLE = 1
    CAR = 2
    TRUCK = 3

class SpotSize(Enum):
    SMALL = 1    # Motorcycle
    MEDIUM = 2   # Car
    LARGE = 3    # Truck

# ==================== VEHICLE (Factory Pattern) ====================
class Vehicle(ABC):
    def __init__(self, license_plate: str):
        self.license_plate = license_plate
        self.entry_time: Optional[datetime] = None

    @abstractmethod
    def get_type(self) -> VehicleType: pass

    @abstractmethod
    def get_required_spot_size(self) -> SpotSize: pass

class Motorcycle(Vehicle):
    def get_type(self) -> VehicleType:
        return VehicleType.MOTORCYCLE
    def get_required_spot_size(self) -> SpotSize:
        return SpotSize.SMALL

class Car(Vehicle):
    def get_type(self) -> VehicleType:
        return VehicleType.CAR
    def get_required_spot_size(self) -> SpotSize:
        return SpotSize.MEDIUM

class Truck(Vehicle):
    def get_type(self) -> VehicleType:
        return VehicleType.TRUCK
    def get_required_spot_size(self) -> SpotSize:
        return SpotSize.LARGE

class VehicleFactory:
    @staticmethod
    def create(vehicle_type: str, license_plate: str) -> Vehicle:
        if vehicle_type.lower() == "motorcycle":
            return Motorcycle(license_plate)
        elif vehicle_type.lower() == "car":
            return Car(license_plate)
        elif vehicle_type.lower() == "truck":
            return Truck(license_plate)
        raise ValueError(f"Unknown vehicle type: {vehicle_type}")

# ==================== PRICING (Strategy Pattern) ====================
class PricingStrategy(ABC):
    @abstractmethod
    def calculate(self, hours: float, vehicle_type: VehicleType) -> float: pass

class HourlyPricing(PricingStrategy):
    RATES = {
        VehicleType.MOTORCYCLE: 10,
        VehicleType.CAR: 20,
        VehicleType.TRUCK: 30,
    }

    def calculate(self, hours: float, vehicle_type: VehicleType) -> float:
        return hours * self.RATES[vehicle_type]

class FlatRatePricing(PricingStrategy):
    RATES = {
        VehicleType.MOTORCYCLE: 50,
        VehicleType.CAR: 100,
        VehicleType.TRUCK: 150,
    }

    def calculate(self, hours: float, vehicle_type: VehicleType) -> float:
        return self.RATES[vehicle_type]

# ==================== OBSERVER (Observer Pattern) ====================
class Observer(ABC):
    @abstractmethod
    def update(self, available_spots: Dict[SpotSize, int]): pass

class DisplayBoard(Observer):
    def __init__(self, floor: int):
        self.floor = floor

    def update(self, available_spots: Dict[SpotSize, int]):
        print(f"Floor {self.floor} - Available: {dict(available_spots)}")

# ==================== PARKING SPOT ====================
class ParkingSpot:
    def __init__(self, spot_id: str, size: SpotSize, floor: int):
        self.spot_id = spot_id
        self.size = size
        self.floor = floor
        self.vehicle: Optional[Vehicle] = None

    def is_available(self) -> bool:
        return self.vehicle is None

    def can_fit(self, vehicle: Vehicle) -> bool:
        return self.is_available() and self.size.value >= vehicle.get_required_spot_size().value

    def park(self, vehicle: Vehicle) -> bool:
        if self.can_fit(vehicle):
            self.vehicle = vehicle
            vehicle.entry_time = datetime.now()
            return True
        return False

    def remove_vehicle(self) -> Optional[Vehicle]:
        vehicle = self.vehicle
        self.vehicle = None
        return vehicle

# ==================== PARKING LOT (Singleton Pattern) ====================
class ParkingLot:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return

        self._initialized = True
        self.spots: List[ParkingSpot] = []
        self.vehicles: Dict[str, ParkingSpot] = {}  # license -> spot
        self.observers: List[Observer] = []
        self.pricing_strategy: PricingStrategy = HourlyPricing()

    def add_spots(self, floor: int, small: int, medium: int, large: int):
        for i in range(small):
            self.spots.append(ParkingSpot(f"F{floor}-S{i}", SpotSize.SMALL, floor))
        for i in range(medium):
            self.spots.append(ParkingSpot(f"F{floor}-M{i}", SpotSize.MEDIUM, floor))
        for i in range(large):
            self.spots.append(ParkingSpot(f"F{floor}-L{i}", SpotSize.LARGE, floor))

    def set_pricing(self, strategy: PricingStrategy):
        self.pricing_strategy = strategy

    def attach_observer(self, observer: Observer):
        self.observers.append(observer)

    def notify_observers(self):
        available = self.get_availability()
        for observer in self.observers:
            observer.update(available)

    def get_availability(self) -> Dict[SpotSize, int]:
        counts = {SpotSize.SMALL: 0, SpotSize.MEDIUM: 0, SpotSize.LARGE: 0}
        for spot in self.spots:
            if spot.is_available():
                counts[spot.size] += 1
        return counts

    def park_vehicle(self, vehicle: Vehicle) -> Optional[str]:
        for spot in self.spots:
            if spot.can_fit(vehicle):
                spot.park(vehicle)
                self.vehicles[vehicle.license_plate] = spot
                self.notify_observers()
                return spot.spot_id
        return None

    def unpark_vehicle(self, license_plate: str) -> Optional[float]:
        if license_plate not in self.vehicles:
            return None

        spot = self.vehicles[license_plate]
        vehicle = spot.remove_vehicle()
        del self.vehicles[license_plate]

        # Calculate fee
        hours = (datetime.now() - vehicle.entry_time).seconds / 3600
        hours = max(1, hours)  # Minimum 1 hour
        fee = self.pricing_strategy.calculate(hours, vehicle.get_type())

        self.notify_observers()
        return fee

# ==================== USAGE ====================
if __name__ == "__main__":
    # Get singleton instance
    lot = ParkingLot()

    # Setup parking lot
    lot.add_spots(floor=1, small=5, medium=10, large=3)
    lot.add_spots(floor=2, small=5, medium=10, large=3)

    # Add display board observer
    lot.attach_observer(DisplayBoard(floor=1))

    # Create vehicles using factory
    car = VehicleFactory.create("car", "ABC-123")
    bike = VehicleFactory.create("motorcycle", "XYZ-789")

    # Park vehicles
    spot1 = lot.park_vehicle(car)
    print(f"Car parked at: {spot1}")

    spot2 = lot.park_vehicle(bike)
    print(f"Bike parked at: {spot2}")

    # Change pricing strategy
    lot.set_pricing(FlatRatePricing())

    # Unpark and pay
    fee = lot.unpark_vehicle("ABC-123")
    print(f"Parking fee: ${fee}")`,

        goCode: `package main

import (
    "fmt"
    "sync"
    "time"
)

// ==================== ENUMS ====================
type VehicleType int
const (
    Motorcycle VehicleType = iota
    Car
    Truck
)

type SpotSize int
const (
    Small SpotSize = iota
    Medium
    Large
)

// ==================== VEHICLE ====================
type Vehicle interface {
    GetType() VehicleType
    GetRequiredSize() SpotSize
    GetLicensePlate() string
    SetEntryTime(t time.Time)
    GetEntryTime() time.Time
}

type BaseVehicle struct {
    LicensePlate string
    EntryTime    time.Time
}

func (b *BaseVehicle) GetLicensePlate() string { return b.LicensePlate }
func (b *BaseVehicle) SetEntryTime(t time.Time) { b.EntryTime = t }
func (b *BaseVehicle) GetEntryTime() time.Time { return b.EntryTime }

type CarVehicle struct{ BaseVehicle }
func (c *CarVehicle) GetType() VehicleType { return Car }
func (c *CarVehicle) GetRequiredSize() SpotSize { return Medium }

type MotorcycleVehicle struct{ BaseVehicle }
func (m *MotorcycleVehicle) GetType() VehicleType { return Motorcycle }
func (m *MotorcycleVehicle) GetRequiredSize() SpotSize { return Small }

// Factory
func CreateVehicle(vType string, plate string) Vehicle {
    switch vType {
    case "car":
        return &CarVehicle{BaseVehicle{LicensePlate: plate}}
    case "motorcycle":
        return &MotorcycleVehicle{BaseVehicle{LicensePlate: plate}}
    }
    return nil
}

// ==================== PRICING STRATEGY ====================
type PricingStrategy interface {
    Calculate(hours float64, vType VehicleType) float64
}

type HourlyPricing struct{}
func (h *HourlyPricing) Calculate(hours float64, vType VehicleType) float64 {
    rates := map[VehicleType]float64{Motorcycle: 10, Car: 20, Truck: 30}
    return hours * rates[vType]
}

type FlatPricing struct{}
func (f *FlatPricing) Calculate(hours float64, vType VehicleType) float64 {
    rates := map[VehicleType]float64{Motorcycle: 50, Car: 100, Truck: 150}
    return rates[vType]
}

// ==================== OBSERVER ====================
type Observer interface {
    Update(available map[SpotSize]int)
}

type DisplayBoard struct {
    Floor int
}
func (d *DisplayBoard) Update(available map[SpotSize]int) {
    fmt.Printf("Floor %d - Available: %v\\n", d.Floor, available)
}

// ==================== PARKING SPOT ====================
type ParkingSpot struct {
    ID      string
    Size    SpotSize
    Floor   int
    Vehicle Vehicle
}

func (p *ParkingSpot) IsAvailable() bool { return p.Vehicle == nil }
func (p *ParkingSpot) CanFit(v Vehicle) bool {
    return p.IsAvailable() && p.Size >= v.GetRequiredSize()
}
func (p *ParkingSpot) Park(v Vehicle) bool {
    if p.CanFit(v) {
        v.SetEntryTime(time.Now())
        p.Vehicle = v
        return true
    }
    return false
}

// ==================== SINGLETON PARKING LOT ====================
type ParkingLot struct {
    spots    []*ParkingSpot
    vehicles map[string]*ParkingSpot
    observers []Observer
    pricing  PricingStrategy
}

var (
    lotInstance *ParkingLot
    once        sync.Once
)

func GetParkingLot() *ParkingLot {
    once.Do(func() {
        lotInstance = &ParkingLot{
            vehicles: make(map[string]*ParkingSpot),
            pricing:  &HourlyPricing{},
        }
    })
    return lotInstance
}

func (p *ParkingLot) AddSpots(floor, small, medium, large int) {
    for i := 0; i < small; i++ {
        p.spots = append(p.spots, &ParkingSpot{
            ID: fmt.Sprintf("F%d-S%d", floor, i), Size: Small, Floor: floor,
        })
    }
    for i := 0; i < medium; i++ {
        p.spots = append(p.spots, &ParkingSpot{
            ID: fmt.Sprintf("F%d-M%d", floor, i), Size: Medium, Floor: floor,
        })
    }
}

func (p *ParkingLot) AttachObserver(o Observer) {
    p.observers = append(p.observers, o)
}

func (p *ParkingLot) NotifyObservers() {
    available := p.GetAvailability()
    for _, o := range p.observers {
        o.Update(available)
    }
}

func (p *ParkingLot) GetAvailability() map[SpotSize]int {
    counts := map[SpotSize]int{Small: 0, Medium: 0, Large: 0}
    for _, spot := range p.spots {
        if spot.IsAvailable() {
            counts[spot.Size]++
        }
    }
    return counts
}

func (p *ParkingLot) ParkVehicle(v Vehicle) string {
    for _, spot := range p.spots {
        if spot.Park(v) {
            p.vehicles[v.GetLicensePlate()] = spot
            p.NotifyObservers()
            return spot.ID
        }
    }
    return ""
}

func (p *ParkingLot) SetPricing(strategy PricingStrategy) {
    p.pricing = strategy
}

func main() {
    lot := GetParkingLot()
    lot.AddSpots(1, 5, 10, 3)
    lot.AttachObserver(&DisplayBoard{Floor: 1})

    car := CreateVehicle("car", "ABC-123")
    spot := lot.ParkVehicle(car)
    fmt.Printf("Car parked at: %s\\n", spot)

    lot.SetPricing(&FlatPricing{})
}`,

        complexity: 'Space: O(n) spots, Time: O(n) for finding spot (can optimize with heaps)',

        extensions: [
            'Add reservation system (time slots)',
            'Electric vehicle charging spots',
            'VIP parking with priority',
            'Valet parking service',
            'Monthly subscription plans'
        ]
    },

    {
        id: 'rate-limiter',
        icon: '🚦',
        title: 'Rate Limiter',
        difficulty: 'Medium',
        timeLimit: '30-45 mins',
        patternsUsed: ['Singleton', 'Strategy', 'Factory'],

        tldr: 'Implement rate limiting with multiple algorithms (Token Bucket, Sliding Window).',

        requirements: `**Functional:**
- Limit requests per user/IP
- Multiple rate limiting algorithms
- Configurable limits per endpoint
- Return rate limit headers

**Non-functional:**
- Thread-safe
- O(1) time complexity
- Support distributed systems`,

        designDecisions: [
            {
                decision: 'How to implement different limiting algorithms?',
                pattern: 'Strategy',
                reason: 'Token Bucket, Sliding Window, Fixed Window - swap algorithms.'
            },
            {
                decision: 'How to create limiters for different endpoints?',
                pattern: 'Factory',
                reason: 'Create appropriate limiter based on endpoint config.'
            },
            {
                decision: 'How to manage limiter instance?',
                pattern: 'Singleton',
                reason: 'Single rate limiter service across application.'
            }
        ],

        pythonCode: `from abc import ABC, abstractmethod
from collections import defaultdict
from dataclasses import dataclass
from time import time
import threading
from typing import Dict, Optional

@dataclass
class RateLimitResult:
    allowed: bool
    remaining: int
    reset_time: float
    retry_after: Optional[float] = None

# ==================== STRATEGY PATTERN ====================
class RateLimitStrategy(ABC):
    @abstractmethod
    def is_allowed(self, key: str) -> RateLimitResult: pass

    @abstractmethod
    def get_limit(self) -> int: pass

class TokenBucket(RateLimitStrategy):
    """
    Tokens added at fixed rate. Request consumes token.
    Allows burst up to bucket capacity.
    """
    def __init__(self, capacity: int, refill_rate: float):
        self.capacity = capacity
        self.refill_rate = refill_rate  # tokens per second
        self.buckets: Dict[str, dict] = defaultdict(
            lambda: {"tokens": capacity, "last_refill": time()}
        )
        self.lock = threading.Lock()

    def is_allowed(self, key: str) -> RateLimitResult:
        with self.lock:
            bucket = self.buckets[key]
            now = time()

            # Refill tokens
            elapsed = now - bucket["last_refill"]
            refill = elapsed * self.refill_rate
            bucket["tokens"] = min(self.capacity, bucket["tokens"] + refill)
            bucket["last_refill"] = now

            if bucket["tokens"] >= 1:
                bucket["tokens"] -= 1
                return RateLimitResult(
                    allowed=True,
                    remaining=int(bucket["tokens"]),
                    reset_time=now + (self.capacity - bucket["tokens"]) / self.refill_rate
                )
            else:
                retry_after = (1 - bucket["tokens"]) / self.refill_rate
                return RateLimitResult(
                    allowed=False,
                    remaining=0,
                    reset_time=now + retry_after,
                    retry_after=retry_after
                )

    def get_limit(self) -> int:
        return self.capacity

class SlidingWindowLog(RateLimitStrategy):
    """
    Track timestamps of requests in a sliding window.
    More accurate but uses more memory.
    """
    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window = window_seconds
        self.requests: Dict[str, list] = defaultdict(list)
        self.lock = threading.Lock()

    def is_allowed(self, key: str) -> RateLimitResult:
        with self.lock:
            now = time()
            window_start = now - self.window

            # Remove old requests
            self.requests[key] = [
                t for t in self.requests[key] if t > window_start
            ]

            if len(self.requests[key]) < self.limit:
                self.requests[key].append(now)
                return RateLimitResult(
                    allowed=True,
                    remaining=self.limit - len(self.requests[key]),
                    reset_time=now + self.window
                )
            else:
                oldest = min(self.requests[key])
                retry_after = oldest + self.window - now
                return RateLimitResult(
                    allowed=False,
                    remaining=0,
                    reset_time=oldest + self.window,
                    retry_after=retry_after
                )

    def get_limit(self) -> int:
        return self.limit

class FixedWindowCounter(RateLimitStrategy):
    """
    Simple counter reset every window.
    Can allow 2x burst at window boundaries.
    """
    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window = window_seconds
        self.counters: Dict[str, dict] = {}
        self.lock = threading.Lock()

    def _get_window_key(self) -> int:
        return int(time() // self.window)

    def is_allowed(self, key: str) -> RateLimitResult:
        with self.lock:
            window_key = self._get_window_key()
            now = time()

            if key not in self.counters or self.counters[key]["window"] != window_key:
                self.counters[key] = {"window": window_key, "count": 0}

            if self.counters[key]["count"] < self.limit:
                self.counters[key]["count"] += 1
                return RateLimitResult(
                    allowed=True,
                    remaining=self.limit - self.counters[key]["count"],
                    reset_time=(window_key + 1) * self.window
                )
            else:
                reset_time = (window_key + 1) * self.window
                return RateLimitResult(
                    allowed=False,
                    remaining=0,
                    reset_time=reset_time,
                    retry_after=reset_time - now
                )

    def get_limit(self) -> int:
        return self.limit

# ==================== FACTORY PATTERN ====================
class RateLimiterFactory:
    @staticmethod
    def create(algorithm: str, **kwargs) -> RateLimitStrategy:
        if algorithm == "token_bucket":
            return TokenBucket(
                capacity=kwargs.get("capacity", 100),
                refill_rate=kwargs.get("refill_rate", 10)
            )
        elif algorithm == "sliding_window":
            return SlidingWindowLog(
                limit=kwargs.get("limit", 100),
                window_seconds=kwargs.get("window", 60)
            )
        elif algorithm == "fixed_window":
            return FixedWindowCounter(
                limit=kwargs.get("limit", 100),
                window_seconds=kwargs.get("window", 60)
            )
        raise ValueError(f"Unknown algorithm: {algorithm}")

# ==================== RATE LIMITER SERVICE (Singleton) ====================
class RateLimiterService:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self._initialized = True
        self.limiters: Dict[str, RateLimitStrategy] = {}

    def configure_endpoint(self, endpoint: str, algorithm: str, **kwargs):
        self.limiters[endpoint] = RateLimiterFactory.create(algorithm, **kwargs)

    def check(self, endpoint: str, client_id: str) -> RateLimitResult:
        if endpoint not in self.limiters:
            return RateLimitResult(allowed=True, remaining=-1, reset_time=0)

        key = f"{endpoint}:{client_id}"
        return self.limiters[endpoint].is_allowed(key)

# ==================== USAGE ====================
if __name__ == "__main__":
    service = RateLimiterService()

    # Configure different endpoints
    service.configure_endpoint(
        "/api/search", "token_bucket",
        capacity=10, refill_rate=1
    )

    service.configure_endpoint(
        "/api/login", "fixed_window",
        limit=5, window=60
    )

    # Simulate requests
    for i in range(15):
        result = service.check("/api/search", "user123")
        status = "✓" if result.allowed else "✗"
        print(f"Request {i+1}: {status} (remaining: {result.remaining})")`,

        goCode: `package main

import (
    "fmt"
    "sync"
    "time"
)

// RateLimitResult holds the result of a rate limit check
type RateLimitResult struct {
    Allowed    bool
    Remaining  int
    ResetTime  float64
    RetryAfter float64
}

// Strategy interface
type RateLimitStrategy interface {
    IsAllowed(key string) RateLimitResult
    GetLimit() int
}

// ==================== TOKEN BUCKET ====================
type TokenBucket struct {
    capacity   int
    refillRate float64
    buckets    map[string]*bucket
    mu         sync.Mutex
}

type bucket struct {
    tokens     float64
    lastRefill time.Time
}

func NewTokenBucket(capacity int, refillRate float64) *TokenBucket {
    return &TokenBucket{
        capacity:   capacity,
        refillRate: refillRate,
        buckets:    make(map[string]*bucket),
    }
}

func (t *TokenBucket) IsAllowed(key string) RateLimitResult {
    t.mu.Lock()
    defer t.mu.Unlock()

    now := time.Now()

    if _, exists := t.buckets[key]; !exists {
        t.buckets[key] = &bucket{
            tokens:     float64(t.capacity),
            lastRefill: now,
        }
    }

    b := t.buckets[key]
    elapsed := now.Sub(b.lastRefill).Seconds()
    b.tokens = min(float64(t.capacity), b.tokens+elapsed*t.refillRate)
    b.lastRefill = now

    if b.tokens >= 1 {
        b.tokens--
        return RateLimitResult{
            Allowed:   true,
            Remaining: int(b.tokens),
        }
    }

    return RateLimitResult{
        Allowed:    false,
        Remaining:  0,
        RetryAfter: (1 - b.tokens) / t.refillRate,
    }
}

func (t *TokenBucket) GetLimit() int { return t.capacity }

// ==================== FACTORY ====================
func CreateLimiter(algorithm string, limit int, window int) RateLimitStrategy {
    switch algorithm {
    case "token_bucket":
        return NewTokenBucket(limit, float64(limit)/float64(window))
    default:
        return NewTokenBucket(100, 10)
    }
}

// ==================== SINGLETON SERVICE ====================
type RateLimiterService struct {
    limiters map[string]RateLimitStrategy
    mu       sync.RWMutex
}

var (
    serviceInstance *RateLimiterService
    serviceOnce     sync.Once
)

func GetRateLimiterService() *RateLimiterService {
    serviceOnce.Do(func() {
        serviceInstance = &RateLimiterService{
            limiters: make(map[string]RateLimitStrategy),
        }
    })
    return serviceInstance
}

func (r *RateLimiterService) Configure(endpoint, algorithm string, limit, window int) {
    r.mu.Lock()
    defer r.mu.Unlock()
    r.limiters[endpoint] = CreateLimiter(algorithm, limit, window)
}

func (r *RateLimiterService) Check(endpoint, clientID string) RateLimitResult {
    r.mu.RLock()
    limiter, exists := r.limiters[endpoint]
    r.mu.RUnlock()

    if !exists {
        return RateLimitResult{Allowed: true, Remaining: -1}
    }

    key := endpoint + ":" + clientID
    return limiter.IsAllowed(key)
}

func min(a, b float64) float64 {
    if a < b { return a }
    return b
}

func main() {
    service := GetRateLimiterService()
    service.Configure("/api/search", "token_bucket", 10, 60)

    for i := 0; i < 15; i++ {
        result := service.Check("/api/search", "user123")
        status := "✓"
        if !result.Allowed {
            status = "✗"
        }
        fmt.Printf("Request %d: %s (remaining: %d)\\n", i+1, status, result.Remaining)
    }
}`,

        complexity: 'Token Bucket: O(1), Sliding Window: O(n) cleanup, Fixed Window: O(1)',

        extensions: [
            'Redis-based distributed rate limiting',
            'Per-user and per-IP limits',
            'Rate limit headers middleware',
            'Graceful degradation',
            'Rate limit bypass for admins'
        ]
    },

    {
        id: 'cache-system',
        icon: '💾',
        title: 'LRU Cache with TTL',
        difficulty: 'Medium',
        timeLimit: '45 mins',
        patternsUsed: ['Singleton', 'Decorator', 'Strategy'],

        tldr: 'Build an LRU cache with TTL support, eviction policies, and cache statistics.',

        requirements: `**Functional:**
- Get/Set with TTL
- LRU eviction when full
- Cache statistics (hits, misses)
- Different eviction strategies

**Non-functional:**
- O(1) get/set operations
- Thread-safe
- Memory efficient`,

        designDecisions: [
            {
                decision: 'How to add TTL to existing cache?',
                pattern: 'Decorator',
                reason: 'Wrap cache entries with TTL metadata without changing core logic.'
            },
            {
                decision: 'How to support different eviction policies?',
                pattern: 'Strategy',
                reason: 'LRU, LFU, FIFO - swap eviction algorithms.'
            },
            {
                decision: 'How to manage cache instance?',
                pattern: 'Singleton',
                reason: 'Single cache instance shared across application.'
            }
        ],

        pythonCode: `from abc import ABC, abstractmethod
from collections import OrderedDict
from dataclasses import dataclass, field
from time import time
from typing import Any, Dict, Optional
import threading

@dataclass
class CacheEntry:
    value: Any
    created_at: float = field(default_factory=time)
    ttl: Optional[float] = None
    access_count: int = 0

    def is_expired(self) -> bool:
        if self.ttl is None:
            return False
        return time() > self.created_at + self.ttl

@dataclass
class CacheStats:
    hits: int = 0
    misses: int = 0
    evictions: int = 0

    @property
    def hit_rate(self) -> float:
        total = self.hits + self.misses
        return self.hits / total if total > 0 else 0.0

# ==================== EVICTION STRATEGY ====================
class EvictionStrategy(ABC):
    @abstractmethod
    def evict(self, cache: Dict[str, CacheEntry]) -> Optional[str]: pass

    @abstractmethod
    def on_access(self, key: str, cache: Dict[str, CacheEntry]): pass

class LRUEviction(EvictionStrategy):
    def __init__(self):
        self.order: OrderedDict = OrderedDict()

    def evict(self, cache: Dict[str, CacheEntry]) -> Optional[str]:
        if self.order:
            key, _ = self.order.popitem(last=False)
            return key
        return None

    def on_access(self, key: str, cache: Dict[str, CacheEntry]):
        if key in self.order:
            self.order.move_to_end(key)
        else:
            self.order[key] = True

class LFUEviction(EvictionStrategy):
    def evict(self, cache: Dict[str, CacheEntry]) -> Optional[str]:
        if not cache:
            return None
        # Find least frequently used
        return min(cache.keys(), key=lambda k: cache[k].access_count)

    def on_access(self, key: str, cache: Dict[str, CacheEntry]):
        if key in cache:
            cache[key].access_count += 1

class FIFOEviction(EvictionStrategy):
    def __init__(self):
        self.order = []

    def evict(self, cache: Dict[str, CacheEntry]) -> Optional[str]:
        while self.order:
            key = self.order.pop(0)
            if key in cache:
                return key
        return None

    def on_access(self, key: str, cache: Dict[str, CacheEntry]):
        if key not in self.order:
            self.order.append(key)

# ==================== CACHE ====================
class Cache:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance

    def __init__(self, capacity: int = 100, eviction: str = "lru"):
        if self._initialized:
            return

        self._initialized = True
        self.capacity = capacity
        self.cache: Dict[str, CacheEntry] = {}
        self.stats = CacheStats()
        self.lock = threading.RLock()

        # Strategy pattern
        if eviction == "lru":
            self.eviction_strategy = LRUEviction()
        elif eviction == "lfu":
            self.eviction_strategy = LFUEviction()
        else:
            self.eviction_strategy = FIFOEviction()

    def get(self, key: str) -> Optional[Any]:
        with self.lock:
            if key not in self.cache:
                self.stats.misses += 1
                return None

            entry = self.cache[key]

            # Check TTL
            if entry.is_expired():
                del self.cache[key]
                self.stats.misses += 1
                return None

            self.stats.hits += 1
            self.eviction_strategy.on_access(key, self.cache)
            return entry.value

    def set(self, key: str, value: Any, ttl: Optional[float] = None):
        with self.lock:
            # Evict if at capacity
            while len(self.cache) >= self.capacity:
                evict_key = self.eviction_strategy.evict(self.cache)
                if evict_key and evict_key in self.cache:
                    del self.cache[evict_key]
                    self.stats.evictions += 1
                else:
                    break

            self.cache[key] = CacheEntry(value=value, ttl=ttl)
            self.eviction_strategy.on_access(key, self.cache)

    def delete(self, key: str) -> bool:
        with self.lock:
            if key in self.cache:
                del self.cache[key]
                return True
            return False

    def clear(self):
        with self.lock:
            self.cache.clear()
            self.stats = CacheStats()

    def get_stats(self) -> CacheStats:
        return self.stats

# ==================== USAGE ====================
if __name__ == "__main__":
    cache = Cache(capacity=3, eviction="lru")

    # Set some values
    cache.set("a", "value_a")
    cache.set("b", "value_b")
    cache.set("c", "value_c")

    # Access 'a' to make it recently used
    print(cache.get("a"))  # value_a

    # Add new value - should evict 'b' (least recently used)
    cache.set("d", "value_d")

    print(cache.get("b"))  # None (evicted)
    print(cache.get("a"))  # value_a (still there)

    # With TTL
    cache.set("temp", "temporary", ttl=2)
    print(cache.get("temp"))  # temporary

    import time; time.sleep(3)
    print(cache.get("temp"))  # None (expired)

    # Stats
    stats = cache.get_stats()
    print(f"Hit rate: {stats.hit_rate:.2%}")
    print(f"Evictions: {stats.evictions}")`,

        goCode: `package main

import (
    "container/list"
    "fmt"
    "sync"
    "time"
)

type CacheEntry struct {
    Value     interface{}
    CreatedAt time.Time
    TTL       time.Duration
}

func (e *CacheEntry) IsExpired() bool {
    if e.TTL == 0 {
        return false
    }
    return time.Now().After(e.CreatedAt.Add(e.TTL))
}

type CacheStats struct {
    Hits      int64
    Misses    int64
    Evictions int64
}

type LRUCache struct {
    capacity int
    cache    map[string]*list.Element
    order    *list.List
    stats    CacheStats
    mu       sync.RWMutex
}

type entry struct {
    key   string
    value *CacheEntry
}

var (
    cacheInstance *LRUCache
    cacheOnce     sync.Once
)

func GetCache(capacity int) *LRUCache {
    cacheOnce.Do(func() {
        cacheInstance = &LRUCache{
            capacity: capacity,
            cache:    make(map[string]*list.Element),
            order:    list.New(),
        }
    })
    return cacheInstance
}

func (c *LRUCache) Get(key string) (interface{}, bool) {
    c.mu.Lock()
    defer c.mu.Unlock()

    elem, exists := c.cache[key]
    if !exists {
        c.stats.Misses++
        return nil, false
    }

    ent := elem.Value.(*entry)
    if ent.value.IsExpired() {
        c.removeElement(elem)
        c.stats.Misses++
        return nil, false
    }

    c.order.MoveToFront(elem)
    c.stats.Hits++
    return ent.value.Value, true
}

func (c *LRUCache) Set(key string, value interface{}, ttl time.Duration) {
    c.mu.Lock()
    defer c.mu.Unlock()

    if elem, exists := c.cache[key]; exists {
        c.order.MoveToFront(elem)
        ent := elem.Value.(*entry)
        ent.value = &CacheEntry{Value: value, CreatedAt: time.Now(), TTL: ttl}
        return
    }

    for len(c.cache) >= c.capacity {
        c.evict()
    }

    ent := &entry{
        key:   key,
        value: &CacheEntry{Value: value, CreatedAt: time.Now(), TTL: ttl},
    }
    elem := c.order.PushFront(ent)
    c.cache[key] = elem
}

func (c *LRUCache) evict() {
    elem := c.order.Back()
    if elem != nil {
        c.removeElement(elem)
        c.stats.Evictions++
    }
}

func (c *LRUCache) removeElement(elem *list.Element) {
    c.order.Remove(elem)
    ent := elem.Value.(*entry)
    delete(c.cache, ent.key)
}

func (c *LRUCache) Stats() CacheStats {
    c.mu.RLock()
    defer c.mu.RUnlock()
    return c.stats
}

func main() {
    cache := GetCache(3)

    cache.Set("a", "value_a", 0)
    cache.Set("b", "value_b", 0)
    cache.Set("c", "value_c", 0)

    if v, ok := cache.Get("a"); ok {
        fmt.Println("a:", v)
    }

    cache.Set("d", "value_d", 0) // Evicts 'b'

    if _, ok := cache.Get("b"); !ok {
        fmt.Println("b: evicted")
    }

    stats := cache.Stats()
    fmt.Printf("Hits: %d, Misses: %d, Evictions: %d\\n",
        stats.Hits, stats.Misses, stats.Evictions)
}`,

        complexity: 'Get/Set: O(1) with hash map + doubly linked list',

        extensions: [
            'Write-through/write-behind to DB',
            'Cache warming on startup',
            'Distributed cache with consistent hashing',
            'Memory-based size limits',
            'Cache groups with different policies'
        ]
    },

    {
        id: 'task-scheduler',
        icon: '⏰',
        title: 'Task Scheduler',
        difficulty: 'Hard',
        timeLimit: '60 mins',
        patternsUsed: ['Singleton', 'Command', 'Observer', 'Strategy', 'Factory'],

        tldr: 'Build a task scheduler with cron-like scheduling, retry logic, and multiple executors.',

        requirements: `**Functional:**
- Schedule one-time and recurring tasks
- Support cron expressions
- Retry failed tasks with backoff
- Task priorities
- Cancel scheduled tasks

**Non-functional:**
- Concurrent task execution
- Persistent task queue (survive restarts)
- Distributed execution support`,

        designDecisions: [
            {
                decision: 'How to represent tasks?',
                pattern: 'Command',
                reason: 'Encapsulate task logic as objects for queueing, retry, undo.'
            },
            {
                decision: 'How to notify on task completion?',
                pattern: 'Observer',
                reason: 'Multiple listeners for task status changes.'
            },
            {
                decision: 'How to handle different retry strategies?',
                pattern: 'Strategy',
                reason: 'Exponential, linear, fixed backoff strategies.'
            },
            {
                decision: 'How to create different task types?',
                pattern: 'Factory',
                reason: 'Create HTTP, Email, Custom tasks uniformly.'
            },
            {
                decision: 'How to manage scheduler instance?',
                pattern: 'Singleton',
                reason: 'Single scheduler coordinating all tasks.'
            }
        ],

        pythonCode: `from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from enum import Enum
from typing import Any, Callable, Dict, List, Optional
from uuid import uuid4
import heapq
import threading
import time

class TaskStatus(Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

# ==================== COMMAND PATTERN ====================
class Task(ABC):
    def __init__(self, task_id: str = None, priority: int = 0):
        self.task_id = task_id or str(uuid4())
        self.priority = priority
        self.status = TaskStatus.PENDING
        self.result: Any = None
        self.error: Optional[str] = None
        self.attempts = 0
        self.max_attempts = 3
        self.created_at = datetime.now()
        self.scheduled_at: Optional[datetime] = None
        self.completed_at: Optional[datetime] = None

    @abstractmethod
    def execute(self) -> Any:
        pass

    def __lt__(self, other):
        # For heap comparison (higher priority = lower number)
        if self.scheduled_at and other.scheduled_at:
            if self.scheduled_at != other.scheduled_at:
                return self.scheduled_at < other.scheduled_at
        return self.priority < other.priority

class HttpTask(Task):
    def __init__(self, url: str, method: str = "GET", **kwargs):
        super().__init__(**kwargs)
        self.url = url
        self.method = method

    def execute(self) -> Any:
        # Simulated HTTP call
        print(f"HTTP {self.method} {self.url}")
        return {"status": 200, "url": self.url}

class EmailTask(Task):
    def __init__(self, to: str, subject: str, body: str, **kwargs):
        super().__init__(**kwargs)
        self.to = to
        self.subject = subject
        self.body = body

    def execute(self) -> Any:
        print(f"Sending email to {self.to}: {self.subject}")
        return {"sent": True, "to": self.to}

class CallableTask(Task):
    def __init__(self, func: Callable, args: tuple = (), kwargs: dict = None, **task_kwargs):
        super().__init__(**task_kwargs)
        self.func = func
        self.args = args
        self.kwargs = kwargs or {}

    def execute(self) -> Any:
        return self.func(*self.args, **self.kwargs)

# ==================== FACTORY PATTERN ====================
class TaskFactory:
    @staticmethod
    def create(task_type: str, **kwargs) -> Task:
        if task_type == "http":
            return HttpTask(**kwargs)
        elif task_type == "email":
            return EmailTask(**kwargs)
        elif task_type == "callable":
            return CallableTask(**kwargs)
        raise ValueError(f"Unknown task type: {task_type}")

# ==================== RETRY STRATEGY ====================
class RetryStrategy(ABC):
    @abstractmethod
    def get_delay(self, attempt: int) -> float:
        pass

class ExponentialBackoff(RetryStrategy):
    def __init__(self, base_delay: float = 1.0, max_delay: float = 60.0):
        self.base_delay = base_delay
        self.max_delay = max_delay

    def get_delay(self, attempt: int) -> float:
        delay = self.base_delay * (2 ** attempt)
        return min(delay, self.max_delay)

class LinearBackoff(RetryStrategy):
    def __init__(self, delay: float = 5.0):
        self.delay = delay

    def get_delay(self, attempt: int) -> float:
        return self.delay * attempt

class FixedBackoff(RetryStrategy):
    def __init__(self, delay: float = 5.0):
        self.delay = delay

    def get_delay(self, attempt: int) -> float:
        return self.delay

# ==================== OBSERVER PATTERN ====================
class TaskObserver(ABC):
    @abstractmethod
    def on_task_started(self, task: Task): pass

    @abstractmethod
    def on_task_completed(self, task: Task): pass

    @abstractmethod
    def on_task_failed(self, task: Task): pass

class LoggingObserver(TaskObserver):
    def on_task_started(self, task: Task):
        print(f"[LOG] Task {task.task_id} started")

    def on_task_completed(self, task: Task):
        print(f"[LOG] Task {task.task_id} completed: {task.result}")

    def on_task_failed(self, task: Task):
        print(f"[LOG] Task {task.task_id} failed: {task.error}")

class MetricsObserver(TaskObserver):
    def __init__(self):
        self.total = 0
        self.completed = 0
        self.failed = 0

    def on_task_started(self, task: Task):
        self.total += 1

    def on_task_completed(self, task: Task):
        self.completed += 1

    def on_task_failed(self, task: Task):
        self.failed += 1

    def get_stats(self):
        return {
            "total": self.total,
            "completed": self.completed,
            "failed": self.failed,
            "success_rate": self.completed / self.total if self.total > 0 else 0
        }

# ==================== SCHEDULER (Singleton) ====================
class TaskScheduler:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return

        self._initialized = True
        self.task_queue: List[Task] = []  # Min heap
        self.tasks: Dict[str, Task] = {}
        self.observers: List[TaskObserver] = []
        self.retry_strategy: RetryStrategy = ExponentialBackoff()
        self.running = False
        self.workers: List[threading.Thread] = []
        self.queue_lock = threading.Lock()
        self.num_workers = 4

    def set_retry_strategy(self, strategy: RetryStrategy):
        self.retry_strategy = strategy

    def add_observer(self, observer: TaskObserver):
        self.observers.append(observer)

    def notify_started(self, task: Task):
        for observer in self.observers:
            observer.on_task_started(task)

    def notify_completed(self, task: Task):
        for observer in self.observers:
            observer.on_task_completed(task)

    def notify_failed(self, task: Task):
        for observer in self.observers:
            observer.on_task_failed(task)

    def schedule(self, task: Task, delay: float = 0) -> str:
        task.scheduled_at = datetime.now() + timedelta(seconds=delay)

        with self.queue_lock:
            heapq.heappush(self.task_queue, task)
            self.tasks[task.task_id] = task

        return task.task_id

    def schedule_recurring(self, task_factory: Callable[[], Task],
                          interval: float, times: int = -1) -> str:
        """Schedule recurring task"""
        recurring_id = str(uuid4())
        count = [0]

        def schedule_next():
            if times > 0 and count[0] >= times:
                return

            task = task_factory()
            task.task_id = f"{recurring_id}-{count[0]}"
            count[0] += 1

            # Schedule next occurrence
            original_execute = task.execute
            def wrapped_execute():
                result = original_execute()
                self.schedule(task_factory(), delay=interval)
                schedule_next()
                return result
            task.execute = wrapped_execute

            self.schedule(task, delay=interval if count[0] > 1 else 0)

        schedule_next()
        return recurring_id

    def cancel(self, task_id: str) -> bool:
        with self.queue_lock:
            if task_id in self.tasks:
                self.tasks[task_id].status = TaskStatus.CANCELLED
                return True
        return False

    def _worker(self):
        while self.running:
            task = None

            with self.queue_lock:
                if self.task_queue:
                    # Check if next task is ready
                    next_task = self.task_queue[0]
                    if next_task.scheduled_at <= datetime.now():
                        task = heapq.heappop(self.task_queue)

            if task is None:
                time.sleep(0.1)
                continue

            if task.status == TaskStatus.CANCELLED:
                continue

            # Execute task
            task.status = TaskStatus.RUNNING
            task.attempts += 1
            self.notify_started(task)

            try:
                task.result = task.execute()
                task.status = TaskStatus.COMPLETED
                task.completed_at = datetime.now()
                self.notify_completed(task)

            except Exception as e:
                task.error = str(e)

                if task.attempts < task.max_attempts:
                    # Retry with backoff
                    delay = self.retry_strategy.get_delay(task.attempts)
                    task.status = TaskStatus.PENDING
                    task.scheduled_at = datetime.now() + timedelta(seconds=delay)

                    with self.queue_lock:
                        heapq.heappush(self.task_queue, task)
                else:
                    task.status = TaskStatus.FAILED
                    self.notify_failed(task)

    def start(self):
        self.running = True
        for _ in range(self.num_workers):
            worker = threading.Thread(target=self._worker, daemon=True)
            worker.start()
            self.workers.append(worker)

    def stop(self):
        self.running = False
        for worker in self.workers:
            worker.join(timeout=1)
        self.workers.clear()

    def get_task(self, task_id: str) -> Optional[Task]:
        return self.tasks.get(task_id)

# ==================== USAGE ====================
if __name__ == "__main__":
    scheduler = TaskScheduler()

    # Add observers
    logger = LoggingObserver()
    metrics = MetricsObserver()
    scheduler.add_observer(logger)
    scheduler.add_observer(metrics)

    # Set retry strategy
    scheduler.set_retry_strategy(ExponentialBackoff(base_delay=1.0))

    # Start scheduler
    scheduler.start()

    # Schedule tasks
    http_task = TaskFactory.create("http", url="https://api.example.com/data")
    scheduler.schedule(http_task, delay=1)

    email_task = TaskFactory.create(
        "email",
        to="user@example.com",
        subject="Hello",
        body="World"
    )
    scheduler.schedule(email_task, delay=2)

    # Custom callable
    def my_job(x, y):
        return x + y

    custom_task = TaskFactory.create(
        "callable",
        func=my_job,
        args=(10, 20)
    )
    scheduler.schedule(custom_task)

    # Wait and check results
    time.sleep(5)

    print(f"\\nMetrics: {metrics.get_stats()}")

    scheduler.stop()`,

        goCode: `// Due to length, showing key components
package main

import (
    "fmt"
    "sync"
    "time"
)

type TaskStatus string
const (
    Pending   TaskStatus = "pending"
    Running   TaskStatus = "running"
    Completed TaskStatus = "completed"
    Failed    TaskStatus = "failed"
)

type Task interface {
    Execute() (interface{}, error)
    GetID() string
    GetStatus() TaskStatus
    SetStatus(TaskStatus)
}

type BaseTask struct {
    ID          string
    Status      TaskStatus
    ScheduledAt time.Time
    Attempts    int
    MaxAttempts int
}

func (t *BaseTask) GetID() string { return t.ID }
func (t *BaseTask) GetStatus() TaskStatus { return t.Status }
func (t *BaseTask) SetStatus(s TaskStatus) { t.Status = s }

// Observer
type TaskObserver interface {
    OnStarted(task Task)
    OnCompleted(task Task, result interface{})
    OnFailed(task Task, err error)
}

// Retry Strategy
type RetryStrategy interface {
    GetDelay(attempt int) time.Duration
}

type ExponentialBackoff struct {
    BaseDelay time.Duration
}

func (e *ExponentialBackoff) GetDelay(attempt int) time.Duration {
    return e.BaseDelay * time.Duration(1<<attempt)
}

// Scheduler (Singleton)
type Scheduler struct {
    tasks     map[string]Task
    observers []TaskObserver
    retry     RetryStrategy
    mu        sync.Mutex
    running   bool
}

var (
    schedulerInstance *Scheduler
    schedulerOnce     sync.Once
)

func GetScheduler() *Scheduler {
    schedulerOnce.Do(func() {
        schedulerInstance = &Scheduler{
            tasks:  make(map[string]Task),
            retry:  &ExponentialBackoff{BaseDelay: time.Second},
        }
    })
    return schedulerInstance
}

func (s *Scheduler) Schedule(task Task, delay time.Duration) {
    s.mu.Lock()
    s.tasks[task.GetID()] = task
    s.mu.Unlock()

    go func() {
        time.Sleep(delay)
        s.executeTask(task)
    }()
}

func (s *Scheduler) executeTask(task Task) {
    task.SetStatus(Running)
    for _, o := range s.observers {
        o.OnStarted(task)
    }

    result, err := task.Execute()

    if err != nil {
        task.SetStatus(Failed)
        for _, o := range s.observers {
            o.OnFailed(task, err)
        }
    } else {
        task.SetStatus(Completed)
        for _, o := range s.observers {
            o.OnCompleted(task, result)
        }
    }
}

func main() {
    scheduler := GetScheduler()
    fmt.Println("Scheduler ready:", scheduler != nil)
}`,

        complexity: 'Schedule: O(log n), Execute: O(1), Worker threads: configurable',

        extensions: [
            'Persist tasks to database',
            'Distributed task queue (Redis)',
            'Task dependencies (DAG)',
            'Task timeout handling',
            'Dead letter queue for failed tasks',
            'Web UI for monitoring'
        ]
    }
];

// Export for use in dashboard.js
window.SYSTEM_DESIGN_TOPICS = SYSTEM_DESIGN_TOPICS;
window.BASIC_PROBLEMS = BASIC_PROBLEMS;
window.COMPLEX_PROBLEMS = COMPLEX_PROBLEMS;
window.DESIGN_PATTERNS = DESIGN_PATTERNS;
window.MACHINE_CODING = MACHINE_CODING;
