# Monolith to Microservices Migration: Deep Dive for System Design Interviews

## Overview

Monolith-to-microservices migration represents one of the most complex architectural transformations an organization can undertake. This guide provides **interview-depth** understanding of migration strategies, their internal mechanisms, failure modes, and the critical decisions that determine success or failure.

**Key Insight**: Migration is not a technical problem alone. It is an organizational, operational, and strategic transformation that happens to involve technology.

**Tags:** Migration, Strangler Fig, Domain Decomposition, Data Migration, Anti-Patterns

**Prerequisites:** [[Microservices Architecture]](/topics/microservices), [[Event-Driven Architecture]](/topics/system-design/event-sourcing), [[Domain-Driven Design]](/topics/ddd/bounded-contexts)

---

## Section 1: The Strangler Fig Pattern

### 1.1 Core Mechanism

The Strangler Fig Pattern derives its name from strangler fig trees that grow around host trees, eventually replacing them entirely. In software, this translates to **incrementally replacing monolith functionality with microservices while maintaining system operation**.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
<h3 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">STRANGLER FIG PATTERN: INTERNAL MECHANISM</h3>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;">
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 16px; text-align: center;">
<div style="color: #f97316; font-weight: 700; font-size: 1.5em; margin-bottom: 8px;">Phase 1</div>
<div style="color: #64748b; font-size: 0.9em;">Intercept Layer</div>
<div style="color: #58a6ff; font-size: 0.8em; margin-top: 8px;">Route 100% to monolith</div>
</div>
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 16px; text-align: center;">
<div style="color: #f97316; font-weight: 700; font-size: 1.5em; margin-bottom: 8px;">Phase 2</div>
<div style="color: #64748b; font-size: 0.9em;">Shadow Mode</div>
<div style="color: #58a6ff; font-size: 0.8em; margin-top: 8px;">Dual-write, compare results</div>
</div>
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 16px; text-align: center;">
<div style="color: #f97316; font-weight: 700; font-size: 1.5em; margin-bottom: 8px;">Phase 3</div>
<div style="color: #64748b; font-size: 0.9em;">Canary Release</div>
<div style="color: #58a6ff; font-size: 0.8em; margin-top: 8px;">Route N% to new service</div>
</div>
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 16px; text-align: center;">
<div style="color: #f97316; font-weight: 700; font-size: 1.5em; margin-bottom: 8px;">Phase 4</div>
<div style="color: #64748b; font-size: 0.9em;">Full Cutover</div>
<div style="color: #58a6ff; font-size: 0.8em; margin-top: 8px;">Decommission monolith path</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #fff; margin: 0 0 12px 0; text-align: center;">THE FACADE/PROXY LAYER</h4>
<div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 16px; align-items: center;">
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #d1fae5; font-weight: 600;">Clients</div>
<div style="color: #64748b; font-size: 0.8em;">Unchanged API contracts</div>
</div>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 16px;">
<div style="color: #fff; font-weight: 600; text-align: center; margin-bottom: 12px;">Routing Logic</div>
<div style="color: #d1fae5; font-size: 0.85em;">
<div style="margin-bottom: 4px;">if (feature_flag.enabled && user in canary_group)</div>
<div style="margin-bottom: 4px; padding-left: 16px;">route_to_microservice()</div>
<div style="margin-bottom: 4px;">else</div>
<div style="padding-left: 16px;">route_to_monolith()</div>
</div>
</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 8px; padding: 8px; text-align: center; color: #7ee787; font-size: 0.85em;">New Service</div>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 8px; padding: 8px; text-align: center; color: #f85149; font-size: 0.85em;">Monolith</div>
</div>
</div>
</div>
</div>

#### The Intercept Layer Implementation

The **intercept layer** (also called the strangler facade) is the critical infrastructure that enables incremental migration. It operates at one of three levels:

```go
// Level 1: HTTP/API Gateway Level (Most Common)
type StranglerProxy struct {
    monolithURL    string
    microserviceURL string
    routingRules   *RoutingEngine
    metrics        *MetricsCollector
}

func (p *StranglerProxy) HandleRequest(w http.ResponseWriter, r *http.Request) {
    route := p.routingRules.DetermineRoute(r)

    switch route.Strategy {
    case StrategyMonolithOnly:
        p.proxyToMonolith(w, r)

    case StrategyShadowMode:
        // Execute both, return monolith response, compare async
        monolithResp := p.proxyToMonolith(w, r)
        go p.shadowCompare(r, monolithResp)

    case StrategyCanary:
        if p.isInCanaryGroup(r) {
            p.proxyToMicroservice(w, r)
        } else {
            p.proxyToMonolith(w, r)
        }

    case StrategyMicroserviceOnly:
        p.proxyToMicroservice(w, r)
    }
}

// Level 2: Database Level (Change Data Capture)
// Intercept at the data layer using tools like Debezium
type CDCInterceptor struct {
    sourceDB      *sql.DB  // Monolith database
    targetService *grpc.ClientConn
    transformer   *EventTransformer
}

// Level 3: Message Queue Level
// Intercept domain events and route to appropriate handlers
type EventInterceptor struct {
    legacyHandler  EventHandler
    newHandler     EventHandler
    routingConfig  *DynamicConfig
}
```

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #fb923c; border-radius: 12px; padding: 20px; margin: 20px 0;">
<h4 style="color: #f97316; margin: 0 0 12px 0;">CRITICAL ASSUMPTION</h4>
<p style="color: #e2e8f0; margin: 0; line-height: 1.6;">
    The Strangler Fig pattern assumes you have a <strong>well-defined entry point</strong> where traffic can be intercepted. Systems with multiple entry points (batch jobs, direct database access, message queues, file imports) require multiple intercept layers, dramatically increasing complexity. <strong>Interview insight</strong>: Always ask about all entry points to the monolith before proposing this pattern.
</p>
</div>

### 1.2 Shadow Mode: The Verification Mechanism

Shadow mode (also called "dark launching") is where the new microservice processes **real production traffic** without affecting responses. This is essential for validating correctness before cutover.

```go
type ShadowModeComparator struct {
    monolithClient    *http.Client
    microserviceClient *http.Client
    diffStore         *DiffRepository
    alerting          *AlertService
}

func (s *ShadowModeComparator) Execute(ctx context.Context, req *http.Request) (*http.Response, error) {
    // Clone request for shadow execution
    shadowReq := cloneRequest(req)

    // Execute both in parallel
    var wg sync.WaitGroup
    var monolithResp, shadowResp *http.Response
    var monolithErr, shadowErr error

    wg.Add(2)
    go func() {
        defer wg.Done()
        monolithResp, monolithErr = s.monolithClient.Do(req)
    }()
    go func() {
        defer wg.Done()
        shadowResp, shadowErr = s.microserviceClient.Do(shadowReq)
    }()
    wg.Wait()

    // Always return monolith response to client
    // Compare results asynchronously
    go s.compareAndRecord(req, monolithResp, shadowResp, monolithErr, shadowErr)

    return monolithResp, monolithErr
}

func (s *ShadowModeComparator) compareAndRecord(
    req *http.Request,
    monolithResp, shadowResp *http.Response,
    monolithErr, shadowErr error,
) {
    diff := &ResponseDiff{
        RequestID:     extractRequestID(req),
        Timestamp:     time.Now(),
        Endpoint:      req.URL.Path,
    }

    // Compare status codes
    if monolithResp.StatusCode != shadowResp.StatusCode {
        diff.StatusCodeMismatch = true
        diff.MonolithStatus = monolithResp.StatusCode
        diff.ShadowStatus = shadowResp.StatusCode
    }

    // Compare response bodies (semantic comparison, not byte-for-byte)
    monolithBody := normalizeResponse(readBody(monolithResp))
    shadowBody := normalizeResponse(readBody(shadowResp))

    if !semanticallyEqual(monolithBody, shadowBody) {
        diff.BodyMismatch = true
        diff.MonolithBody = monolithBody
        diff.ShadowBody = shadowBody
        diff.Differences = computeDiff(monolithBody, shadowBody)
    }

    // Compare latency
    diff.LatencyDelta = shadowResp.Latency - monolithResp.Latency

    s.diffStore.Record(diff)

    // Alert on significant divergence
    if diff.StatusCodeMismatch || diff.BodyMismatch {
        s.alerting.NotifyDivergence(diff)
    }
}
```

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<h4 style="color: #f85149; margin: 0 0 16px 0;">EDGE CASES IN SHADOW MODE</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: rgba(248,81,73,0.1); border-radius: 8px; padding: 16px; border-left: 3px solid #f85149;">
<div style="color: #f85149; font-weight: 600; margin-bottom: 8px;">Write Operations</div>
<div style="color: #64748b; font-size: 0.9em;">Shadow writes cause data duplication. Must implement "dry-run" mode or isolated shadow database that gets periodically reset.</div>
</div>
<div style="background: rgba(248,81,73,0.1); border-radius: 8px; padding: 16px; border-left: 3px solid #f85149;">
<div style="color: #f85149; font-weight: 600; margin-bottom: 8px;">External Side Effects</div>
<div style="color: #64748b; font-size: 0.9em;">Shadow service calling payment APIs, sending emails, or triggering webhooks. Must stub all external integrations.</div>
</div>
<div style="background: rgba(248,81,73,0.1); border-radius: 8px; padding: 16px; border-left: 3px solid #f85149;">
<div style="color: #f85149; font-weight: 600; margin-bottom: 8px;">Time-Sensitive Data</div>
<div style="color: #64748b; font-size: 0.9em;">Responses containing timestamps, random IDs, or computed values that legitimately differ. Requires semantic comparison.</div>
</div>
<div style="background: rgba(248,81,73,0.1); border-radius: 8px; padding: 16px; border-left: 3px solid #f85149;">
<div style="color: #f85149; font-weight: 600; margin-bottom: 8px;">Race Conditions</div>
<div style="color: #64748b; font-size: 0.9em;">Monolith and microservice reading from shared database at different times, seeing different states.</div>
</div>
</div>
</div>

### 1.3 Interview Questions: Strangler Fig Pattern

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<h4 style="color: #fff; margin: 0 0 16px 0;">LEVEL 1: Conceptual Understanding</h4>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #dbeafe; font-weight: 600; margin-bottom: 8px;">Q: Why is the Strangler Fig pattern preferred over "big bang" rewrites?</div>
<div style="color: #bfdbfe; font-size: 0.9em; line-height: 1.6;">
<strong>Answer</strong>: Big bang rewrites carry extreme risk: (1) You must maintain two systems until cutover, doubling maintenance burden. (2) All bugs surface simultaneously at launch. (3) No production validation until complete. (4) Rollback means losing all progress. The Strangler pattern enables incremental value delivery, production validation at each step, and surgical rollback of individual components.
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<h4 style="color: #fff; margin: 0 0 16px 0;">LEVEL 2: Design Trade-offs</h4>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #ede9fe; font-weight: 600; margin-bottom: 8px;">Q: You're migrating a payment processing monolith. How would you handle the shadow mode phase for payment endpoints?</div>
<div style="color: #ddd6fe; font-size: 0.9em; line-height: 1.6;">
<strong>Answer</strong>: Payment endpoints are uniquely challenging because they: (1) Have external side effects (charging cards), (2) Must be idempotent, (3) Have strict consistency requirements. Strategy: Implement "verification mode" where the shadow service performs all logic EXCEPT the final payment gateway call. Instead, it validates that it would make the same call with the same parameters. Use idempotency keys to detect where the shadow service would have created different payment intents. For actual payment verification, use a sandbox/test mode on the payment gateway with synthetic test cards that mirror production patterns.
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<h4 style="color: #fff; margin: 0 0 16px 0;">LEVEL 3: Production Incident Scenarios</h4>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #fed7aa; font-weight: 600; margin-bottom: 8px;">Q: During canary rollout (10% traffic to microservice), you discover the new service has 2x latency. However, reverting causes data inconsistency because 10% of orders were created only in the microservice database. How do you handle this?</div>
<div style="color: #fde68a; font-size: 0.9em; line-height: 1.6;">
<strong>Answer</strong>: This reveals a critical migration anti-pattern - the microservice became the source of truth before validation completed. Immediate mitigation: (1) Route all NEW traffic to monolith. (2) Keep microservice running for existing sessions to complete. (3) For data reconciliation, export the 10% of orders from microservice database. (4) Transform and import into monolith database using the microservice as the authoritative source for those records. (5) Root cause: Should have maintained dual-write with monolith as source of truth until latency validation passed. Prevention: Implement "read from new, write to both" before "write to new only." Use correlation IDs to track which system is authoritative for each record.
</div>
</div>
</div>

---

## Section 2: Domain Decomposition

### 2.1 Identifying Service Boundaries

Domain decomposition determines **where to cut** the monolith. Poor boundaries create distributed monoliths - systems with all the complexity of microservices and none of the benefits.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
<h3 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">DOMAIN DECOMPOSITION DECISION FRAMEWORK</h3>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #fff; margin: 0 0 12px 0; text-align: center;">GOOD BOUNDARIES</h4>
<ul style="color: #d1fae5; margin: 0; padding-left: 18px; font-size: 0.9em; line-height: 1.8;">
<li>Aligned with business capabilities</li>
<li>Own their data completely</li>
<li>Communicate via well-defined contracts</li>
<li>Can be deployed independently</li>
<li>Team can understand entire service</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #f85149 0%, #da3633 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #fff; margin: 0 0 12px 0; text-align: center;">BAD BOUNDARIES</h4>
<ul style="color: #fecaca; margin: 0; padding-left: 18px; font-size: 0.9em; line-height: 1.8;">
<li>Based on technical layers (UI, API, DB)</li>
<li>Require synchronous calls for every operation</li>
<li>Share databases or tables</li>
<li>Require coordinated deployments</li>
<li>Change together frequently</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #fff; margin: 0 0 12px 0; text-align: center;">SIGNALS FOR BOUNDARIES</h4>
<ul style="color: #ede9fe; margin: 0; padding-left: 18px; font-size: 0.9em; line-height: 1.8;">
<li>Different rates of change</li>
<li>Different scaling requirements</li>
<li>Different security/compliance needs</li>
<li>Different team ownership</li>
<li>Natural transaction boundaries</li>
</ul>
</div>
</div>
</div>

#### Analyzing Coupling Patterns

Before decomposition, analyze your codebase to understand actual coupling:

```python
# Static analysis to identify coupling patterns
class CouplingAnalyzer:
    def __init__(self, codebase_path: str):
        self.call_graph = self._build_call_graph(codebase_path)
        self.data_access = self._build_data_access_map(codebase_path)

    def compute_module_coupling(self, module_a: str, module_b: str) -> CouplingMetrics:
        """
        Compute coupling between two potential service boundaries.
        Lower coupling = better service boundary.
        """
        metrics = CouplingMetrics()

        # 1. Afferent Coupling (incoming dependencies)
        # How many other modules depend on module_a?
        metrics.afferent_a = len([
            m for m in self.call_graph.modules
            if m != module_a and self.call_graph.has_edge(m, module_a)
        ])

        # 2. Efferent Coupling (outgoing dependencies)
        # How many modules does module_a depend on?
        metrics.efferent_a = len([
            m for m in self.call_graph.modules
            if m != module_a and self.call_graph.has_edge(module_a, m)
        ])

        # 3. Direct coupling between modules
        metrics.direct_calls = self.call_graph.edge_weight(module_a, module_b)

        # 4. Shared data coupling (most problematic)
        shared_tables = (
            self.data_access.tables_accessed_by(module_a) &
            self.data_access.tables_accessed_by(module_b)
        )
        metrics.shared_tables = len(shared_tables)
        metrics.shared_table_names = list(shared_tables)

        # 5. Transactional coupling
        # Do these modules participate in the same database transactions?
        metrics.shared_transactions = self._find_shared_transactions(module_a, module_b)

        return metrics

    def suggest_boundaries(self) -> List[ServiceBoundary]:
        """
        Use clustering algorithm to suggest service boundaries
        that minimize inter-service coupling.
        """
        # Build coupling matrix
        coupling_matrix = self._build_coupling_matrix()

        # Apply community detection (Louvain algorithm)
        # Groups highly-coupled modules together
        communities = self._detect_communities(coupling_matrix)

        boundaries = []
        for community in communities:
            boundary = ServiceBoundary(
                modules=community.modules,
                internal_coupling=community.internal_coupling_score,
                external_coupling=community.external_coupling_score,
                suggested_name=self._infer_domain_name(community.modules),
                data_ownership=self._determine_data_ownership(community.modules),
            )
            boundaries.append(boundary)

        return boundaries
```

### 2.2 The Bounded Context Mapping

[[Bounded Contexts]](/topics/ddd/bounded-contexts) from Domain-Driven Design provide the theoretical framework for service boundaries. Each microservice should align with exactly one bounded context.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">CONTEXT MAPPING PATTERNS</h3>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #7ee787; margin: 0 0 12px 0;">Partnership</h4>
<div style="color: #64748b; font-size: 0.9em; margin-bottom: 12px;">Two teams collaborate closely, models evolve together</div>
<div style="background: rgba(126,231,135,0.1); border-radius: 8px; padding: 12px;">
<div style="color: #7ee787; font-size: 0.85em;"><strong>Use when:</strong> Same organization, shared goals, similar release cadence</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #58a6ff; margin: 0 0 12px 0;">Customer-Supplier</h4>
<div style="color: #64748b; font-size: 0.9em; margin-bottom: 12px;">Upstream provides what downstream needs</div>
<div style="background: rgba(88,166,255,0.1); border-radius: 8px; padding: 12px;">
<div style="color: #58a6ff; font-size: 0.85em;"><strong>Use when:</strong> Clear dependency direction, upstream can accommodate downstream</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #f97316; margin: 0 0 12px 0;">Conformist</h4>
<div style="color: #64748b; font-size: 0.9em; margin-bottom: 12px;">Downstream adopts upstream's model as-is</div>
<div style="background: rgba(249,115,22,0.1); border-radius: 8px; padding: 12px;">
<div style="color: #f97316; font-size: 0.85em;"><strong>Use when:</strong> Upstream is external/legacy, no negotiation possible</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #a371f7; margin: 0 0 12px 0;">Anti-Corruption Layer</h4>
<div style="color: #64748b; font-size: 0.9em; margin-bottom: 12px;">Translation layer isolates domain from external models</div>
<div style="background: rgba(163,113,247,0.1); border-radius: 8px; padding: 12px;">
<div style="color: #a371f7; font-size: 0.85em;"><strong>Use when:</strong> Upstream model is incompatible, legacy integration</div>
</div>
</div>
</div>
</div>

#### Anti-Corruption Layer Implementation

The **Anti-Corruption Layer (ACL)** prevents legacy models from "leaking" into your clean domain model. This is essential during migration when services must interact with unreformed monolith components.

```go
// Anti-Corruption Layer for Order Service consuming legacy User data
package acl

// Legacy monolith user representation (what the monolith returns)
type LegacyUserDTO struct {
    UserID         int       `json:"user_id"`        // Integer IDs
    EmailAddr      string    `json:"email_addr"`     // Different field name
    FirstNm        string    `json:"first_nm"`       // Abbreviated naming
    LastNm         string    `json:"last_nm"`
    PhoneNum       string    `json:"phone_num"`
    AcctStatus     string    `json:"acct_status"`    // "A" = Active, "I" = Inactive
    AddrLine1      string    `json:"addr_line_1"`
    AddrLine2      string    `json:"addr_line_2"`
    CityNm         string    `json:"city_nm"`
    StateCd        string    `json:"state_cd"`       // State codes vs names
    PostalCd       string    `json:"postal_cd"`
    CntryIsoAlpha2 string    `json:"cntry_iso_alpha_2"`
    CreateDt       string    `json:"create_dt"`      // String date format
}

// Clean domain model (what your service uses internally)
type Customer struct {
    ID          uuid.UUID
    Email       string
    FullName    string
    Phone       string
    IsActive    bool
    Address     Address
    CreatedAt   time.Time
}

type Address struct {
    Line1      string
    Line2      string
    City       string
    State      string
    PostalCode string
    Country    string
}

// Anti-Corruption Layer
type UserServiceACL struct {
    legacyClient  *LegacyUserClient
    idMappingRepo *IDMappingRepository  // Maps legacy int IDs to UUIDs
    stateCodeMap  map[string]string     // Maps "CA" -> "California"
    countryCodeMap map[string]string    // Maps "US" -> "United States"
}

func (acl *UserServiceACL) GetCustomer(ctx context.Context, customerID uuid.UUID) (*Customer, error) {
    // 1. Translate UUID to legacy integer ID
    legacyID, err := acl.idMappingRepo.GetLegacyID(ctx, customerID)
    if err != nil {
        return nil, fmt.Errorf("customer not found in legacy system: %w", err)
    }

    // 2. Call legacy service
    legacyUser, err := acl.legacyClient.GetUser(ctx, legacyID)
    if err != nil {
        return nil, fmt.Errorf("legacy service error: %w", err)
    }

    // 3. Translate to domain model
    return acl.translateToDomain(legacyUser)
}

func (acl *UserServiceACL) translateToDomain(legacy *LegacyUserDTO) (*Customer, error) {
    // Parse legacy date format
    createdAt, err := time.Parse("2006-01-02", legacy.CreateDt)
    if err != nil {
        createdAt = time.Now() // Default for malformed dates
    }

    // Translate status codes to boolean
    isActive := legacy.AcctStatus == "A"

    // Expand state and country codes
    stateName := acl.stateCodeMap[legacy.StateCd]
    if stateName == "" {
        stateName = legacy.StateCd // Fall back to code if unknown
    }

    countryName := acl.countryCodeMap[legacy.CntryIsoAlpha2]
    if countryName == "" {
        countryName = legacy.CntryIsoAlpha2
    }

    // Get or create UUID mapping
    customerUUID, err := acl.idMappingRepo.GetOrCreateUUID(legacy.UserID)
    if err != nil {
        return nil, err
    }

    return &Customer{
        ID:       customerUUID,
        Email:    legacy.EmailAddr,
        FullName: strings.TrimSpace(legacy.FirstNm + " " + legacy.LastNm),
        Phone:    normalizePhoneNumber(legacy.PhoneNum),
        IsActive: isActive,
        Address: Address{
            Line1:      legacy.AddrLine1,
            Line2:      legacy.AddrLine2,
            City:       legacy.CityNm,
            State:      stateName,
            PostalCode: legacy.PostalCd,
            Country:    countryName,
        },
        CreatedAt: createdAt,
    }, nil
}
```

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #a371f7; border-radius: 12px; padding: 20px; margin: 20px 0;">
<h4 style="color: #a371f7; margin: 0 0 12px 0;">DESIGN CHOICE: ACL Placement</h4>
<p style="color: #e2e8f0; margin: 0 0 12px 0; line-height: 1.6;">
    The ACL should live in the <strong>consuming service</strong>, not the producing service. This keeps the new service's domain model clean while the producer remains unchanged. The ACL is temporary scaffolding removed once the legacy system is decommissioned.
</p>
<p style="color: #e2e8f0; margin: 0; line-height: 1.6;">
<strong>Trade-off</strong>: Multiple consumers means multiple ACLs with duplicated translation logic. Alternative: Create a dedicated "adapter service" that presents the legacy system through a clean API. This centralizes translation but adds another network hop.
</p>
</div>

### 2.3 Interview Questions: Domain Decomposition

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<h4 style="color: #fff; margin: 0 0 16px 0;">LEVEL 1: Conceptual Understanding</h4>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #dbeafe; font-weight: 600; margin-bottom: 8px;">Q: What is a "distributed monolith" and how does it arise from poor decomposition?</div>
<div style="color: #bfdbfe; font-size: 0.9em; line-height: 1.6;">
<strong>Answer</strong>: A distributed monolith occurs when services are technically separate but operationally coupled. Symptoms: (1) Services must deploy together due to tight API coupling. (2) A change in one service requires changes in multiple others. (3) Services share database tables or schemas. (4) Synchronous call chains mean one service failure cascades to all. This typically arises from decomposing by technical layer (frontend service, backend service, database service) rather than business capability, or from extracting services before understanding true boundaries.
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<h4 style="color: #fff; margin: 0 0 16px 0;">LEVEL 2: Design Trade-offs</h4>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #ede9fe; font-weight: 600; margin-bottom: 8px;">Q: You're decomposing an e-commerce monolith. The "Product" concept is used by Catalog (for display), Inventory (for stock), Pricing (for costs), and Orders (for line items). How do you handle this shared concept?</div>
<div style="color: #ddd6fe; font-size: 0.9em; line-height: 1.6;">
<strong>Answer</strong>: This is the classic "shared kernel" problem. Solutions in order of preference: (1) <strong>Different bounded contexts</strong>: Each service has its own Product representation. Catalog has ProductDisplay (name, description, images), Inventory has StockItem (SKU, quantity, warehouse), Pricing has PricedItem (SKU, cost, margins), Orders has OrderLineItem (SKU, quantity, unit price at time of order). These are synchronized via events (ProductCreated, PriceChanged). (2) <strong>Product Service</strong>: If genuinely one concept, create a dedicated Product Service that owns the canonical product data. Other services either call it synchronously (cache heavily) or subscribe to its events and maintain local projections. (3) <strong>Shared Library</strong>: Last resort - a shared library with Product DTOs. This creates coupling but may be acceptable for truly stable concepts. The key insight is that "Product" is likely NOT one concept - it means different things in different contexts.
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<h4 style="color: #fff; margin: 0 0 16px 0;">LEVEL 3: Production Incident Scenarios</h4>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #fed7aa; font-weight: 600; margin-bottom: 8px;">Q: After decomposition, you discover that Order Service and Inventory Service have a circular dependency: orders check inventory, but inventory reserves are tied to orders. Breaking one causes the other to fail. How do you resolve this?</div>
<div style="color: #fde68a; font-size: 0.9em; line-height: 1.6;">
<strong>Answer</strong>: Circular dependencies indicate incorrect boundaries - the services are actually one logical unit split artificially. Resolution options: (1) <strong>Merge services</strong>: If they truly can't function independently, they're one service. Combine into "Order Fulfillment Service." (2) <strong>Event-driven decoupling</strong>: Replace synchronous calls with events. Order Service publishes OrderCreated, Inventory subscribes and publishes InventoryReserved. Order Service subscribes and updates order status. Neither directly calls the other. (3) <strong>Introduce mediator</strong>: Create an "Order Orchestration Service" (saga) that coordinates between them. Order and Inventory become simple state machines responding to commands. (4) <strong>Extract shared concept</strong>: The "reservation" might be its own bounded context - a Reservation Service that both Order and Inventory interact with. Root cause analysis: This usually happens when decomposing by nouns (Order, Inventory) rather than verbs/capabilities (Place Order, Fulfill Order, Manage Stock).
</div>
</div>
</div>

---

## Section 3: Data Migration Strategies

### 3.1 The Data Sovereignty Challenge

Data migration is often the **hardest part** of microservices migration. The monolith's shared database must be split into service-owned databases while maintaining:
- **Referential integrity** across service boundaries (without foreign keys)
- **Consistency** during the transition period
- **Zero downtime** for production systems
- **Rollback capability** if migration fails

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">DATA MIGRATION PATTERNS</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #fff; margin: 0 0 12px 0;">Pattern 1: Database View Abstraction</h4>
<div style="color: #d1fae5; font-size: 0.9em; line-height: 1.6; margin-bottom: 12px;">
        Create database views that present the data as if it were already split. Services read from views. Actual table migration happens transparently.
</div>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 12px;">
<div style="color: #7ee787; font-size: 0.85em;"><strong>Best for:</strong> Early migration phases, read-heavy workloads</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #fff; margin: 0 0 12px 0;">Pattern 2: Change Data Capture (CDC)</h4>
<div style="color: #dbeafe; font-size: 0.9em; line-height: 1.6; margin-bottom: 12px;">
        Use tools like Debezium to stream changes from monolith DB to new service databases. Enables real-time sync without application changes.
</div>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 12px;">
<div style="color: #58a6ff; font-size: 0.85em;"><strong>Best for:</strong> Zero-downtime migration, gradual cutover</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #fff; margin: 0 0 12px 0;">Pattern 3: Dual-Write with Reconciliation</h4>
<div style="color: #ede9fe; font-size: 0.9em; line-height: 1.6; margin-bottom: 12px;">
        Application writes to both old and new databases. Background job reconciles differences. Eventual cutover to new database only.
</div>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 12px;">
<div style="color: #a371f7; font-size: 0.85em;"><strong>Best for:</strong> Critical data requiring verification</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #fff; margin: 0 0 12px 0;">Pattern 4: Event-Sourced Migration</h4>
<div style="color: #fed7aa; font-size: 0.9em; line-height: 1.6; margin-bottom: 12px;">
        Replay historical events to build new service's state. New service becomes the event-sourced source of truth going forward.
</div>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 12px;">
<div style="color: #f97316; font-size: 0.85em;"><strong>Best for:</strong> Systems with event logs, audit requirements</div>
</div>
</div>
</div>
</div>

### 3.2 Change Data Capture Implementation

CDC is the most robust approach for zero-downtime migration. It captures row-level changes from the source database's transaction log (WAL/binlog) and streams them to consumers.

```yaml
# Debezium connector configuration for PostgreSQL
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaConnector
metadata:
  name: monolith-user-connector
spec:
  class: io.debezium.connector.postgresql.PostgresConnector
  tasksMax: 1
  config:
    # Source database connection
    database.hostname: monolith-db.internal
    database.port: 5432
    database.user: cdc_user
    database.password: ${CDC_PASSWORD}
    database.dbname: monolith

    # Logical replication slot
    slot.name: user_service_slot
    publication.name: user_tables_pub

    # Tables to capture
    table.include.list: public.users,public.addresses

    # Output configuration
    topic.prefix: cdc.monolith

    # Transform timestamps to UTC
    transforms: unwrap,timestamp
    transforms.unwrap.type: io.debezium.transforms.ExtractNewRecordState
    transforms.timestamp.type: org.apache.kafka.connect.transforms.TimestampConverter$Value
    transforms.timestamp.target.type: string
    transforms.timestamp.field: updated_at
    transforms.timestamp.format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'

    # Snapshot configuration
    snapshot.mode: initial  # Full snapshot then streaming
    snapshot.locking.mode: none  # No locks during snapshot
```

```go
// CDC consumer that populates the new User Service database
type CDCConsumer struct {
    consumer     *kafka.Consumer
    userRepo     *UserRepository
    transformer  *LegacyTransformer
    idempotency  *IdempotencyStore
}

func (c *CDCConsumer) ProcessMessage(ctx context.Context, msg *kafka.Message) error {
    // Parse CDC event
    var event CDCEvent
    if err := json.Unmarshal(msg.Value, &event); err != nil {
        return fmt.Errorf("failed to parse CDC event: %w", err)
    }

    // Idempotency check - CDC can replay events
    eventKey := fmt.Sprintf("%s:%s:%d", event.Source.Table, event.Key, event.Source.LSN)
    if c.idempotency.HasProcessed(ctx, eventKey) {
        return nil // Already processed
    }

    // Route by operation type
    switch event.Operation {
    case "c": // Create
        return c.handleCreate(ctx, event, eventKey)
    case "u": // Update
        return c.handleUpdate(ctx, event, eventKey)
    case "d": // Delete
        return c.handleDelete(ctx, event, eventKey)
    case "r": // Read (snapshot)
        return c.handleSnapshot(ctx, event, eventKey)
    default:
        return fmt.Errorf("unknown operation: %s", event.Operation)
    }
}

func (c *CDCConsumer) handleCreate(ctx context.Context, event CDCEvent, eventKey string) error {
    // Transform legacy schema to new domain model
    user, err := c.transformer.TransformUser(event.After)
    if err != nil {
        return fmt.Errorf("transform failed: %w", err)
    }

    // Upsert to handle out-of-order delivery
    if err := c.userRepo.Upsert(ctx, user); err != nil {
        return fmt.Errorf("upsert failed: %w", err)
    }

    // Mark as processed
    c.idempotency.MarkProcessed(ctx, eventKey)
    return nil
}

type CDCEvent struct {
    Operation string                 `json:"op"`       // c, u, d, r
    Before    map[string]interface{} `json:"before"`   // Previous state
    After     map[string]interface{} `json:"after"`    // New state
    Source    CDCSource              `json:"source"`
    Key       map[string]interface{} `json:"key"`      // Primary key
}

type CDCSource struct {
    Table   string `json:"table"`
    LSN     int64  `json:"lsn"`      // Log Sequence Number for ordering
    TxID    int64  `json:"txId"`     // Transaction ID
}
```

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #f85149; border-radius: 12px; padding: 20px; margin: 20px 0;">
<h4 style="color: #f85149; margin: 0 0 12px 0;">CDC EDGE CASES AND PITFALLS</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: rgba(248,81,73,0.1); border-radius: 8px; padding: 12px;">
<div style="color: #f85149; font-weight: 600; margin-bottom: 6px;">Out-of-Order Delivery</div>
<div style="color: #64748b; font-size: 0.85em;">Kafka partitioning may reorder events. Use LSN or version numbers, not timestamps, for ordering. Implement "last-write-wins" with version comparison.</div>
</div>
<div style="background: rgba(248,81,73,0.1); border-radius: 8px; padding: 12px;">
<div style="color: #f85149; font-weight: 600; margin-bottom: 6px;">Schema Evolution</div>
<div style="color: #64748b; font-size: 0.85em;">Monolith schema changes break CDC transforms. Use schema registry, version transforms, and have rollback plans for each schema change.</div>
</div>
<div style="background: rgba(248,81,73,0.1); border-radius: 8px; padding: 12px;">
<div style="color: #f85149; font-weight: 600; margin-bottom: 6px;">Large Snapshots</div>
<div style="color: #64748b; font-size: 0.85em;">Initial snapshot of millions of rows can take hours and impact source DB performance. Use snapshot.select.statement.overrides to batch or filter.</div>
</div>
<div style="background: rgba(248,81,73,0.1); border-radius: 8px; padding: 12px;">
<div style="color: #f85149; font-weight: 600; margin-bottom: 6px;">Replication Lag</div>
<div style="color: #64748b; font-size: 0.85em;">CDC introduces latency (seconds to minutes). Queries that require real-time consistency cannot use CDC-populated replicas.</div>
</div>
</div>
</div>

### 3.3 Dual-Write Pattern with Reconciliation

For critical data where CDC lag is unacceptable, dual-write ensures both databases are updated synchronously. However, this pattern has significant complexity.

```go
// Dual-write service with reconciliation
type DualWriteUserService struct {
    monolithRepo   *MonolithUserRepository  // Old database
    microserviceRepo *UserRepository         // New database
    reconciler     *ReconciliationService
    writeMode      WriteMode  // MONOLITH_PRIMARY, DUAL_WRITE, MICROSERVICE_PRIMARY
}

type WriteMode int
const (
    MonolithPrimary WriteMode = iota  // Write to monolith, async sync to new
    DualWrite                          // Write to both, reconcile
    MicroservicePrimary               // Write to new, async sync to monolith (rollback capability)
)

func (s *DualWriteUserService) CreateUser(ctx context.Context, user *User) error {
    switch s.writeMode {
    case MonolithPrimary:
        // Write to monolith first (source of truth)
        if err := s.monolithRepo.Create(ctx, user); err != nil {
            return err
        }
        // Async sync to microservice DB
        go s.syncToMicroservice(ctx, user)
        return nil

    case DualWrite:
        // Write to both databases
        // Use distributed transaction or accept inconsistency window
        monolithErr := s.monolithRepo.Create(ctx, user)
        microErr := s.microserviceRepo.Create(ctx, user)

        if monolithErr != nil && microErr != nil {
            return fmt.Errorf("both writes failed: monolith=%v, micro=%v", monolithErr, microErr)
        }

        if monolithErr != nil || microErr != nil {
            // One failed - schedule reconciliation
            s.reconciler.ScheduleReconciliation(user.ID, ReconciliationPriorityHigh)
            // Return success if primary (monolith) succeeded
            if monolithErr == nil {
                return nil
            }
            return monolithErr
        }

        return nil

    case MicroservicePrimary:
        // Write to microservice first (new source of truth)
        if err := s.microserviceRepo.Create(ctx, user); err != nil {
            return err
        }
        // Sync to monolith for rollback capability
        go s.syncToMonolith(ctx, user)
        return nil
    }
    return fmt.Errorf("unknown write mode")
}

// Reconciliation job that runs continuously
type ReconciliationService struct {
    monolithRepo     *MonolithUserRepository
    microserviceRepo *UserRepository
    conflictResolver *ConflictResolver
}

func (r *ReconciliationService) ReconcileUser(ctx context.Context, userID uuid.UUID) error {
    monolithUser, monolithErr := r.monolithRepo.FindByID(ctx, userID)
    microUser, microErr := r.microserviceRepo.FindByID(ctx, userID)

    // Case 1: Both have the record
    if monolithErr == nil && microErr == nil {
        if !r.areEqual(monolithUser, microUser) {
            // Conflict - use resolution strategy
            resolved := r.conflictResolver.Resolve(monolithUser, microUser)
            r.monolithRepo.Update(ctx, resolved)
            r.microserviceRepo.Update(ctx, resolved)
        }
        return nil
    }

    // Case 2: Only monolith has record
    if monolithErr == nil && microErr == ErrNotFound {
        transformed := r.transform(monolithUser)
        return r.microserviceRepo.Create(ctx, transformed)
    }

    // Case 3: Only microservice has record
    if monolithErr == ErrNotFound && microErr == nil {
        // Depends on migration phase - might be expected or an error
        if r.isMicroservicePrimary() {
            return r.monolithRepo.Create(ctx, r.reverseTransform(microUser))
        }
        // Orphaned record in microservice - alert
        return fmt.Errorf("orphaned record in microservice: %s", userID)
    }

    // Case 4: Neither has record
    return fmt.Errorf("record not found in either database: %s", userID)
}

type ConflictResolver struct {
    strategy ConflictStrategy // LAST_WRITE_WINS, MONOLITH_WINS, MERGE
}

func (c *ConflictResolver) Resolve(monolith, micro *User) *User {
    switch c.strategy {
    case LastWriteWins:
        if monolith.UpdatedAt.After(micro.UpdatedAt) {
            return monolith
        }
        return micro

    case MonolithWins:
        // During migration, trust monolith
        return monolith

    case Merge:
        // Field-level merge with conflict detection
        return c.mergeFields(monolith, micro)
    }
    return monolith
}
```

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #fb923c; border-radius: 12px; padding: 20px; margin: 20px 0;">
<h4 style="color: #f97316; margin: 0 0 12px 0;">TRADE-OFF: Dual-Write Consistency</h4>
<p style="color: #e2e8f0; margin: 0; line-height: 1.6;">
    Dual-write without distributed transactions (2PC) means you <strong>will have inconsistency windows</strong>. If write to DB1 succeeds but DB2 fails, you have divergent state until reconciliation runs. Options: (1) Accept eventual consistency with reconciliation. (2) Use XA transactions (complex, slow, limited database support). (3) Use the [[Saga Pattern]](/topics/microservices/saga-pattern) with compensation. (4) Use [[Outbox Pattern]](/topics/microservices/outbox-pattern) - write to one DB plus outbox table atomically, process outbox to sync. Option 4 is generally preferred.
</p>
</div>

### 3.4 Interview Questions: Data Migration

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<h4 style="color: #fff; margin: 0 0 16px 0;">LEVEL 1: Conceptual Understanding</h4>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #dbeafe; font-weight: 600; margin-bottom: 8px;">Q: Why can't you simply copy the database tables to the new service and redirect traffic?</div>
<div style="color: #bfdbfe; font-size: 0.9em; line-height: 1.6;">
<strong>Answer</strong>: Point-in-time copy creates immediate divergence. From copy completion to traffic redirect, all writes go to the old database. You'd lose that data. Additionally: (1) Foreign key relationships span service boundaries - you can't copy the orders table without users. (2) Schema transformations (INT to UUID, denormalization) require logic, not just copying. (3) There's no rollback path if the new service has issues. (4) Indexes, sequences, and constraints need recreation. (5) Large tables take hours to copy, extending the divergence window.
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<h4 style="color: #fff; margin: 0 0 16px 0;">LEVEL 2: Design Trade-offs</h4>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #ede9fe; font-weight: 600; margin-bottom: 8px;">Q: You're migrating a table with 500 million rows. CDC initial snapshot will take 8 hours and degrade source database performance. How do you approach this?</div>
<div style="color: #ddd6fe; font-size: 0.9em; line-height: 1.6;">
<strong>Answer</strong>: Multi-pronged approach: (1) <strong>Read replica</strong>: Point CDC at a read replica to avoid impacting production. Accept slight lag. (2) <strong>Filtered snapshot</strong>: Use snapshot.select.statement.overrides to snapshot only recent data (e.g., last 2 years). Older data migrated via batch job during off-peak. (3) <strong>Chunked migration</strong>: Snapshot in chunks using WHERE clauses (id BETWEEN x AND y), process incrementally. (4) <strong>Hybrid approach</strong>: One-time batch load from backup/dump, then CDC catches up from a known LSN position. (5) <strong>Parallel processing</strong>: Multiple connector tasks, each handling a partition of the data. Monitor replication lag on source; pause if it grows. For the new service, batch inserts and disable indexes during initial load, rebuild indexes after.
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<h4 style="color: #fff; margin: 0 0 16px 0;">LEVEL 3: Production Incident Scenarios</h4>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #fed7aa; font-weight: 600; margin-bottom: 8px;">Q: During dual-write migration, you discover that 0.1% of records have different values between old and new databases. Reconciliation keeps "fixing" them, but they diverge again. What's happening and how do you fix it?</div>
<div style="color: #fde68a; font-size: 0.9em; line-height: 1.6;">
<strong>Answer</strong>: This is a "reconciliation loop" - a symptom of an underlying sync issue. Likely causes: (1) <strong>Race condition</strong>: Write to DB1, reconciliation reads DB1, concurrent write to DB2, reconciliation writes to DB2 overwriting the new value, triggering another reconciliation. Fix: Use optimistic locking with version numbers; reconciliation only updates if version matches. (2) <strong>Transformation asymmetry</strong>: Data transforms differently in each direction. Transform(ReverseTransform(x)) != x. Fix: Ensure transformations are bijective or store canonical form. (3) <strong>Precision loss</strong>: Float/decimal handling differs between databases. 1.005 becomes 1.00 in one, 1.01 in other. Fix: Standardize precision, use integer cents instead of decimal dollars. (4) <strong>Timezone issues</strong>: One DB stores UTC, other stores local. Comparison fails. Fix: Normalize to UTC everywhere. (5) <strong>Triggered updates</strong>: Database trigger in one system updates a timestamp on every write, including reconciliation writes. Fix: Disable triggers or use special "reconciliation" flag to skip them. Debugging: Add extensive logging to reconciliation showing before/after values and diff. Track the specific 0.1% of records - likely share a common characteristic.
</div>
</div>
</div>

---

## Section 4: The Shared Database Anti-Pattern

### 4.1 Why Shared Databases Undermine Microservices

The shared database anti-pattern occurs when multiple services read from and write to the same database tables. This fundamentally violates microservices principles and creates a **distributed monolith**.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #f85149; margin: 0 0 20px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">SHARED DATABASE: FAILURE MODES</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #f85149; margin: 0 0 12px 0;">1. Schema Coupling</h4>
<div style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
        Any schema change requires coordinating all services. Adding a column to `users` table requires updating Order Service, Notification Service, Analytics Service simultaneously. <strong>Result:</strong> Big-bang deployments, change freeze periods.
</div>
</div>
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #f85149; margin: 0 0 12px 0;">2. Encapsulation Violation</h4>
<div style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
        Services bypass each other's APIs and access data directly. Business logic gets duplicated or contradicted across services. <strong>Result:</strong> Data corruption, inconsistent business rules.
</div>
</div>
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #f85149; margin: 0 0 12px 0;">3. Scalability Bottleneck</h4>
<div style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
        Database becomes the scaling constraint. Can't scale Order Service writes without scaling the shared database. <strong>Result:</strong> Expensive vertical scaling, single point of failure.
</div>
</div>
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #f85149; margin: 0 0 12px 0;">4. Technology Lock-in</h4>
<div style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
        Can't use the best database for each service's needs. Order Service needs transactions, Analytics needs columnar storage, Search needs inverted indexes. <strong>Result:</strong> Suboptimal data access patterns.
</div>
</div>
</div>
</div>

```sql
-- Anti-pattern: Multiple services querying the same tables
-- This creates implicit coupling and prevents independent evolution

-- Order Service does this:
SELECT o.*, u.email, u.name
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.id = $1;

-- Notification Service does this (same tables!):
SELECT u.email, u.notification_preferences
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.status = 'shipped' AND o.shipped_at > NOW() - INTERVAL '1 hour';

-- Analytics Service does this:
SELECT DATE(o.created_at), COUNT(*), SUM(o.total)
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE u.country = 'US'
GROUP BY DATE(o.created_at);

-- PROBLEM: If User Service needs to rename 'email' to 'email_address',
-- or change 'notification_preferences' from JSON to a separate table,
-- ALL THREE services must change simultaneously.
```

### 4.2 Gradual Decoupling from Shared Database

Decoupling from a shared database requires a systematic approach. You cannot simply "stop using" the shared database.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #7ee787; margin: 0 0 20px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">DECOUPLING STRATEGY: PHASED APPROACH</h3>
<div style="display: flex; flex-direction: column; gap: 16px;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 20px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<span style="background: rgba(255,255,255,0.2); padding: 6px 14px; border-radius: 20px; color: #fff; font-weight: 600;">Phase 1</span>
<span style="color: #fff; font-weight: 600;">Establish Service APIs</span>
</div>
<div style="color: #dbeafe; font-size: 0.9em; line-height: 1.6;">
        Create API endpoints in each service for data it "owns." Other services call APIs instead of querying tables directly. Database access still shared, but access is now through defined interfaces.
</div>
</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 20px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<span style="background: rgba(255,255,255,0.2); padding: 6px 14px; border-radius: 20px; color: #fff; font-weight: 600;">Phase 2</span>
<span style="color: #fff; font-weight: 600;">Introduce Data Replication</span>
</div>
<div style="color: #d1fae5; font-size: 0.9em; line-height: 1.6;">
        Services that need other services' data subscribe to events and maintain local read replicas. Order Service keeps a copy of user data it needs, updated via UserUpdated events.
</div>
</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 20px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<span style="background: rgba(255,255,255,0.2); padding: 6px 14px; border-radius: 20px; color: #fff; font-weight: 600;">Phase 3</span>
<span style="color: #fff; font-weight: 600;">Split Physical Database</span>
</div>
<div style="color: #ede9fe; font-size: 0.9em; line-height: 1.6;">
        Move tables to service-owned databases. User tables move to User Service DB. Order tables move to Order Service DB. Services can no longer JOIN across boundaries.
</div>
</div>
<div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 12px; padding: 20px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<span style="background: rgba(255,255,255,0.2); padding: 6px 14px; border-radius: 20px; color: #fff; font-weight: 600;">Phase 4</span>
<span style="color: #fff; font-weight: 600;">Remove Cross-Service Foreign Keys</span>
</div>
<div style="color: #fed7aa; font-size: 0.9em; line-height: 1.6;">
        Replace FK constraints with application-level validation. Order Service validates user exists by calling User Service API before creating order. Referential integrity maintained through service contracts.
</div>
</div>
</div>
</div>

#### Implementing Local Read Replicas

When a service needs data from another service for read-heavy operations (e.g., Order Service displaying customer name), maintaining a local projection avoids runtime API calls.

```go
// Order Service maintains a projection of user data it needs
// Updated via events from User Service

type UserProjection struct {
    UserID    uuid.UUID `db:"user_id"`
    Email     string    `db:"email"`
    FullName  string    `db:"full_name"`
    Phone     string    `db:"phone"`
    UpdatedAt time.Time `db:"updated_at"`
    Version   int64     `db:"version"`
}

type UserProjectionRepository struct {
    db *sql.DB
}

// Called when UserCreated or UserUpdated events are received
func (r *UserProjectionRepository) UpsertFromEvent(ctx context.Context, event *UserEvent) error {
    // Optimistic concurrency - only update if version is newer
    query := `
        INSERT INTO user_projections (user_id, email, full_name, phone, updated_at, version)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (user_id) DO UPDATE SET
            email = EXCLUDED.email,
            full_name = EXCLUDED.full_name,
            phone = EXCLUDED.phone,
            updated_at = EXCLUDED.updated_at,
            version = EXCLUDED.version
        WHERE user_projections.version < EXCLUDED.version
    `
    _, err := r.db.ExecContext(ctx, query,
        event.UserID,
        event.Email,
        event.FullName,
        event.Phone,
        event.Timestamp,
        event.Version,
    )
    return err
}

// Order creation uses local projection
func (s *OrderService) CreateOrder(ctx context.Context, req *CreateOrderRequest) (*Order, error) {
    // Get user from local projection (fast, no network call)
    user, err := s.userProjectionRepo.FindByID(ctx, req.UserID)
    if err != nil {
        if errors.Is(err, ErrNotFound) {
            // Projection might be stale - try API call as fallback
            user, err = s.userServiceClient.GetUser(ctx, req.UserID)
            if err != nil {
                return nil, fmt.Errorf("user not found: %w", err)
            }
            // Update projection for future queries
            go s.userProjectionRepo.UpsertFromAPI(ctx, user)
        } else {
            return nil, err
        }
    }

    // Create order with denormalized user data
    order := &Order{
        ID:            uuid.New(),
        UserID:        req.UserID,
        CustomerEmail: user.Email,     // Denormalized
        CustomerName:  user.FullName,  // Denormalized
        // ... rest of order
    }

    return s.orderRepo.Create(ctx, order)
}
```

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #58a6ff; border-radius: 12px; padding: 20px; margin: 20px 0;">
<h4 style="color: #58a6ff; margin: 0 0 12px 0;">ASSUMPTION: Eventual Consistency Acceptable</h4>
<p style="color: #e2e8f0; margin: 0; line-height: 1.6;">
    Local projections introduce <strong>eventual consistency</strong>. User changes their email, but orders created in the next few seconds still show old email. This is usually acceptable for display data. For critical operations (authentication, authorization, payment validation), always call the authoritative service synchronously. The [[CQRS Pattern]](/topics/microservices/cqrs) formalizes this separation between read projections and write operations.
</p>
</div>

### 4.3 When Shared Database Is (Temporarily) Acceptable

Despite being an anti-pattern, there are legitimate transitional scenarios:

```go
// Acceptable temporary patterns during migration

// 1. Read-only access to legacy tables
// New microservice reads from legacy table but never writes
// Plan: Replace with event-driven sync within 6 months
type LegacyReadOnlyAccess struct {
    legacyDB *sql.DB  // Read-only connection
    // ... no write methods
}

// 2. Database views as abstraction layer
// Services access views, not tables
// Tables can be moved without service changes
/*
CREATE VIEW user_service.users_api AS
SELECT id, email, full_name, phone
FROM shared_schema.users;  -- Actual table location hidden
*/

// 3. Schema-per-service in same database instance
// Services have separate schemas, no cross-schema access
// Database instance shared for cost, but logically separate
/*
CREATE SCHEMA user_service;
CREATE SCHEMA order_service;
-- No foreign keys between schemas
-- Services cannot query other schemas
*/
```

### 4.4 Interview Questions: Shared Database Anti-Pattern

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<h4 style="color: #fff; margin: 0 0 16px 0;">LEVEL 1: Conceptual Understanding</h4>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #dbeafe; font-weight: 600; margin-bottom: 8px;">Q: If shared databases are an anti-pattern, how do microservices achieve data consistency without distributed transactions?</div>
<div style="color: #bfdbfe; font-size: 0.9em; line-height: 1.6;">
<strong>Answer</strong>: Microservices embrace eventual consistency through: (1) <strong>Saga pattern</strong> - sequence of local transactions with compensating actions on failure. (2) <strong>Event-driven architecture</strong> - services publish events, others react and update their local state. (3) <strong>Denormalization</strong> - services copy the data they need at transaction time (e.g., order captures customer name, not just ID). (4) <strong>API composition</strong> - aggregating service queries multiple services and combines results. The key insight is that most business processes don't actually require immediate consistency - an order being processed while user profile update is propagating is fine for most use cases. Where strong consistency is truly required, you either keep those operations in a single service or accept the complexity of distributed transactions.
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<h4 style="color: #fff; margin: 0 0 16px 0;">LEVEL 2: Design Trade-offs</h4>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #ede9fe; font-weight: 600; margin-bottom: 8px;">Q: Your company has 50 microservices, but they all connect to the same PostgreSQL database. Management says splitting databases would be expensive (50x the cost). How do you argue for or against database-per-service?</div>
<div style="color: #ddd6fe; font-size: 0.9em; line-height: 1.6;">
<strong>Answer</strong>: First, challenge the cost assumption: 50 services don't need 50 managed database instances. Options: (1) <strong>Schema-per-service</strong> in same instance - logical separation, same cost. (2) <strong>Bounded context groupings</strong> - 50 services might map to 5-8 bounded contexts, each with own database. (3) <strong>Shared instances with isolated databases</strong> - RDS instance can host multiple databases cheaply. However, if truly keeping shared database, enforce strict rules: (1) Services can only access their own schema. (2) No cross-schema foreign keys. (3) No cross-schema queries. (4) Database access exclusively through service APIs (use views or row-level security to enforce). The real cost of shared databases is operational: coordinated deployments, schema migration complexity, blast radius of database issues. Calculate the engineering time spent on these vs. infrastructure cost savings.
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<h4 style="color: #fff; margin: 0 0 16px 0;">LEVEL 3: Production Incident Scenarios</h4>
<div style="background: rgba(59, 130, 246, 0.06); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #fed7aa; font-weight: 600; margin-bottom: 8px;">Q: Analytics team runs a heavy query against the shared database during peak hours, causing connection pool exhaustion for all services. This has happened 3 times this quarter. How do you permanently solve this?</div>
<div style="color: #fde68a; font-size: 0.9em; line-height: 1.6;">
<strong>Answer</strong>: This is a classic "noisy neighbor" problem that shared databases create. Immediate mitigations: (1) <strong>Read replicas</strong> - point analytics at replica, isolating read load. (2) <strong>Connection limits per service</strong> - use pgbouncer with per-service pools, analytics gets fixed limit. (3) <strong>Query timeouts</strong> - configure statement_timeout for analytics connections. Long-term solutions: (1) <strong>Extract analytics data</strong> - CDC to dedicated analytics database (data warehouse/lake). Analytics team queries their own system. (2) <strong>Event streaming</strong> - publish events to Kafka, analytics builds its own projections. (3) <strong>CQRS</strong> - separate read models optimized for analytics queries. (4) <strong>Database splitting</strong> - move each service to own database, analytics gets read replicas of relevant databases only. Organizational fix: Analytics team should own their data infrastructure. They receive data via events/CDC, not direct database access. This also solves data governance - they get the data they're authorized to see, properly transformed.
</div>
</div>
</div>

---

## Section 5: Migration Execution Framework

### 5.1 The Complete Migration Playbook

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">E-COMMERCE MONOLITH MIGRATION: EXECUTION TIMELINE</h3>
<div style="display: flex; flex-direction: column; gap: 16px;">
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
<span style="color: #7ee787; font-weight: 600; font-size: 1.1em;">Month 1-2: Foundation</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">Low Risk</span>
</div>
<ul style="color: #64748b; margin: 0; padding-left: 20px; font-size: 0.9em; line-height: 1.8;">
<li>Deploy API Gateway as strangler facade</li>
<li>Set up event infrastructure (Kafka/RabbitMQ)</li>
<li>Implement observability (distributed tracing, metrics)</li>
<li>Create service templates and CI/CD pipelines</li>
<li>Document domain boundaries with domain experts</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
<span style="color: #58a6ff; font-weight: 600; font-size: 1.1em;">Month 3-4: User Service Extraction</span>
<span style="background: rgba(88,166,255,0.2); color: #58a6ff; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">Medium Risk</span>
</div>
<ul style="color: #64748b; margin: 0; padding-left: 20px; font-size: 0.9em; line-height: 1.8;">
<li>Build User Service with new database schema</li>
<li>Implement CDC from monolith user tables</li>
<li>Shadow mode: compare User Service responses with monolith</li>
<li>Canary rollout: 1% to 10% to 50% traffic to User Service</li>
<li>Monolith calls User Service API instead of direct DB access</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
<span style="color: #f97316; font-weight: 600; font-size: 1.1em;">Month 5-7: Order Service Extraction</span>
<span style="background: rgba(249,115,22,0.2); color: #f97316; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">High Risk</span>
</div>
<ul style="color: #64748b; margin: 0; padding-left: 20px; font-size: 0.9em; line-height: 1.8;">
<li>Build Order Service; denormalize user data into orders</li>
<li>Implement Order Saga for distributed transaction handling</li>
<li>Dual-write phase: orders written to both DBs</li>
<li>Reconciliation job validates consistency</li>
<li>Gradual cutover with instant rollback capability</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
<span style="color: #a371f7; font-weight: 600; font-size: 1.1em;">Month 8-9: Logistics Service Extraction</span>
<span style="background: rgba(163,113,247,0.2); color: #a371f7; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">Medium Risk</span>
</div>
<ul style="color: #64748b; margin: 0; padding-left: 20px; font-size: 0.9em; line-height: 1.8;">
<li>Logistics Service subscribes to Order events</li>
<li>Shipment data migrated with order context denormalized</li>
<li>Integration with external carrier APIs moved to new service</li>
<li>Monolith logistics code deprecated</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
<span style="color: #f85149; font-weight: 600; font-size: 1.1em;">Month 10-12: Decommissioning</span>
<span style="background: rgba(248,81,73,0.2); color: #f85149; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">Critical</span>
</div>
<ul style="color: #64748b; margin: 0; padding-left: 20px; font-size: 0.9em; line-height: 1.8;">
<li>All traffic routes to microservices</li>
<li>Monolith database in read-only mode (backup)</li>
<li>Remove monolith code and infrastructure</li>
<li>Archive monolith database for compliance (if required)</li>
<li>Retrospective and documentation</li>
</ul>
</div>
</div>
</div>

### 5.2 Rollback Strategies at Each Phase

```go
// Rollback controller for migration phases
type MigrationRollbackController struct {
    featureFlags  *FeatureFlagService
    routingConfig *RoutingConfigService
    metrics       *MetricsService
}

type RollbackTrigger struct {
    ErrorRateThreshold    float64       // e.g., 0.01 = 1%
    LatencyP99Threshold   time.Duration // e.g., 500ms
    AvailabilityThreshold float64       // e.g., 0.999
    EvaluationWindow      time.Duration // e.g., 5 minutes
}

func (c *MigrationRollbackController) MonitorAndRollback(
    ctx context.Context,
    serviceName string,
    trigger RollbackTrigger,
) {
    ticker := time.NewTicker(30 * time.Second)
    defer ticker.Stop()

    for {
        select {
        case <-ctx.Done():
            return
        case <-ticker.C:
            metrics := c.metrics.GetServiceMetrics(serviceName, trigger.EvaluationWindow)

            shouldRollback := false
            reason := ""

            if metrics.ErrorRate > trigger.ErrorRateThreshold {
                shouldRollback = true
                reason = fmt.Sprintf("error rate %.2f%% exceeds threshold %.2f%%",
                    metrics.ErrorRate*100, trigger.ErrorRateThreshold*100)
            }

            if metrics.LatencyP99 > trigger.LatencyP99Threshold {
                shouldRollback = true
                reason = fmt.Sprintf("P99 latency %v exceeds threshold %v",
                    metrics.LatencyP99, trigger.LatencyP99Threshold)
            }

            if metrics.Availability < trigger.AvailabilityThreshold {
                shouldRollback = true
                reason = fmt.Sprintf("availability %.3f%% below threshold %.3f%%",
                    metrics.Availability*100, trigger.AvailabilityThreshold*100)
            }

            if shouldRollback {
                c.executeRollback(ctx, serviceName, reason)
            }
        }
    }
}

func (c *MigrationRollbackController) executeRollback(
    ctx context.Context,
    serviceName string,
    reason string,
) error {
    log.Warn("Initiating rollback",
        "service", serviceName,
        "reason", reason)

    // 1. Disable feature flag immediately
    if err := c.featureFlags.Disable(ctx, serviceName+"_enabled"); err != nil {
        return fmt.Errorf("failed to disable feature flag: %w", err)
    }

    // 2. Update routing to send all traffic to monolith
    if err := c.routingConfig.SetRoute(ctx, serviceName, RouteToMonolith); err != nil {
        return fmt.Errorf("failed to update routing: %w", err)
    }

    // 3. Alert on-call team
    c.alerting.SendCritical(fmt.Sprintf(
        "Migration rollback triggered for %s: %s",
        serviceName, reason))

    // 4. Start data reconciliation (new service might have diverged)
    go c.reconciliation.StartEmergencyReconciliation(ctx, serviceName)

    return nil
}
```

### 5.3 Success Metrics and Validation

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">MIGRATION SUCCESS CRITERIA</h3>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #fff; margin: 0 0 12px 0; text-align: center;">Functional Parity</h4>
<ul style="color: #d1fae5; margin: 0; padding-left: 18px; font-size: 0.85em; line-height: 1.8;">
<li>100% API compatibility</li>
<li>Shadow mode divergence &lt; 0.01%</li>
<li>All integration tests pass</li>
<li>No data loss during migration</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #fff; margin: 0 0 12px 0; text-align: center;">Performance</h4>
<ul style="color: #dbeafe; margin: 0; padding-left: 18px; font-size: 0.85em; line-height: 1.8;">
<li>Latency P50 within 10% of monolith</li>
<li>Latency P99 within 20% of monolith</li>
<li>Throughput equal or better</li>
<li>No increase in error rate</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #fff; margin: 0 0 12px 0; text-align: center;">Operational</h4>
<ul style="color: #ede9fe; margin: 0; padding-left: 18px; font-size: 0.85em; line-height: 1.8;">
<li>Independent deployability proven</li>
<li>Rollback tested and documented</li>
<li>On-call runbooks updated</li>
<li>Team trained on new architecture</li>
</ul>
</div>
</div>
</div>

---

## Key Takeaways

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #7ee787; margin: 0 0 16px 0;">Strangler Fig Pattern</h4>
<ul style="color: #64748b; margin: 0; padding-left: 18px; font-size: 0.9em; line-height: 1.8;">
<li>Incremental migration reduces risk</li>
<li>Requires well-defined intercept point</li>
<li>Shadow mode validates before cutover</li>
<li>Always maintain rollback capability</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #58a6ff; margin: 0 0 16px 0;">Domain Decomposition</h4>
<ul style="color: #64748b; margin: 0; padding-left: 18px; font-size: 0.9em; line-height: 1.8;">
<li>Boundaries based on business capabilities</li>
<li>Anti-corruption layers isolate legacy</li>
<li>Same noun can mean different things in different contexts</li>
<li>Circular dependencies indicate wrong boundaries</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #f97316; margin: 0 0 16px 0;">Data Migration</h4>
<ul style="color: #64748b; margin: 0; padding-left: 18px; font-size: 0.9em; line-height: 1.8;">
<li>CDC enables zero-downtime migration</li>
<li>Dual-write needs reconciliation</li>
<li>Denormalize data at service boundaries</li>
<li>Accept eventual consistency for most use cases</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #f85149; margin: 0 0 16px 0;">Shared Database Anti-Pattern</h4>
<ul style="color: #64748b; margin: 0; padding-left: 18px; font-size: 0.9em; line-height: 1.8;">
<li>Creates distributed monolith</li>
<li>Schema coupling prevents independence</li>
<li>Decouple via events and local projections</li>
<li>Schema-per-service as transitional step</li>
</ul>
</div>
</div>
</div>

---

## Related Topics

- [[Saga Pattern]](/topics/microservices/saga-pattern) - Distributed transaction management
- [[Event Sourcing]](/topics/system-design/event-sourcing) - Event-driven state management
- [[CQRS]](/topics/microservices/cqrs) - Separating read and write models
- [[API Gateway]](/topics/system-design/api-gateway) - Strangler facade implementation
- [[Bounded Contexts]](/topics/ddd/bounded-contexts) - Domain decomposition theory
- [[Outbox Pattern]](/topics/microservices/outbox-pattern) - Reliable event publishing
- [[Database Per Service]](/topics/microservices/database-per-service) - Data sovereignty patterns
