# API Gateway

## Overview

An API Gateway is a unified entry point that mediates between external clients and internal microservices. It functions as a reverse proxy that handles cross-cutting concerns, enabling backend services to focus exclusively on business logic. At its core, an API Gateway performs request routing, protocol translation, authentication, rate limiting, and response aggregation.

<div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: #f8fafc; font-size: 18px;">Core Equation</h4>
  <div style="font-family: 'Courier New', monospace; font-size: 16px; background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px; text-align: center;">
    API Gateway = Reverse Proxy + Authentication + Rate Limiting + Protocol Translation + Service Discovery + Observability
  </div>
</div>

**Critical Assumption**: The API Gateway assumes that backend services are stateless and horizontally scalable. If services maintain session state, the gateway must implement sticky sessions or session affinity, which complicates load balancing and failover.

**Key Trade-off**: Centralization vs. Resilience. A gateway provides a single control point but introduces a potential single point of failure. This trade-off drives most architectural decisions around gateway design.

---

## Section 1: Request Routing

### Deep Mechanics

Request routing is the process of mapping incoming HTTP requests to appropriate backend services based on configurable rules. The routing engine operates as a decision tree that evaluates multiple dimensions: URL path, HTTP method, headers, query parameters, and request body content.

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #166534; margin-top: 0;">Routing Decision Hierarchy</h4>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
      <strong style="color: #166534;">1. Path Matching</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Exact match > Prefix match > Regex match > Wildcard. Order determines performance - exact matches use O(1) hash lookup, while regex requires O(n) evaluation.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #16a34a;">
      <strong style="color: #166534;">2. Method Filtering</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">After path match, filter by HTTP method. Critical for RESTful APIs where same path handles different operations.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #15803d;">
      <strong style="color: #166534;">3. Header-Based Routing</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Content-Type, Accept headers, custom headers for versioning (X-API-Version) or tenant isolation (X-Tenant-ID).</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #14532d;">
      <strong style="color: #166534;">4. Content-Based Routing</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Inspect request body to route based on payload structure. Expensive - requires buffering and parsing.</p>
    </div>
  </div>
</div>

### Internal Route Table Architecture

```python
class RouteTable:
    """
    Production route table implementation.

    Internal Structure:
    - Trie for path prefix matching (O(m) where m = path length)
    - HashMap for exact matches (O(1) average)
    - Compiled regex cache with LRU eviction
    """

    def __init__(self, max_regex_cache: int = 1000):
        self.exact_routes: Dict[str, Route] = {}
        self.prefix_trie: PrefixTrie = PrefixTrie()
        self.regex_routes: List[Tuple[Pattern, Route]] = []
        self.regex_cache: LRUCache = LRUCache(max_regex_cache)
        self._route_priority: List[Route] = []  # Ordered by specificity

    def match(self, path: str, method: str, headers: Dict[str, str]) -> Optional[Route]:
        """
        Route matching with priority: exact > prefix > regex

        Edge Case: Multiple prefix matches
        - /api/users/premium and /api/users both match /api/users/premium/123
        - Longest prefix wins (most specific)

        Edge Case: Regex ambiguity
        - /api/v[0-9]+ and /api/v1-beta both could match /api/v1
        - First registered wins - order matters in configuration
        """
        # Fast path: exact match
        cache_key = f"{method}:{path}"
        if cache_key in self.exact_routes:
            return self.exact_routes[cache_key]

        # Prefix matching via trie
        prefix_matches = self.prefix_trie.find_all_matching(path)
        if prefix_matches:
            # Return longest matching prefix
            route = max(prefix_matches, key=lambda r: len(r.path_prefix))
            if method in route.allowed_methods:
                return self._apply_header_predicates(route, headers)

        # Regex matching (expensive - check cache first)
        if path in self.regex_cache:
            return self.regex_cache[path]

        for pattern, route in self.regex_routes:
            if pattern.match(path) and method in route.allowed_methods:
                self.regex_cache[path] = route
                return route

        return None

    def _apply_header_predicates(self, route: Route, headers: Dict[str, str]) -> Optional[Route]:
        """Evaluate header-based routing predicates."""
        for predicate in route.header_predicates:
            header_value = headers.get(predicate.header_name)
            if not predicate.evaluate(header_value):
                return None
        return route
```

### Edge Cases and Failure Modes

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #92400e; margin-top: 0;">Critical Edge Cases</h4>
  <div style="display: grid; gap: 12px;">
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #92400e;">Path Normalization Attacks</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;"><code>/api/users/../admin/secrets</code> may bypass path-based access control. Gateway MUST normalize paths before routing. URL-decode, remove <code>..</code> sequences, collapse multiple slashes.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #92400e;">Trailing Slash Ambiguity</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;"><code>/api/users</code> vs <code>/api/users/</code> - these may route to different backends or cause cache fragmentation. Define canonical form and redirect or normalize.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #92400e;">Query String Ordering</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;"><code>?a=1&b=2</code> vs <code>?b=2&a=1</code> - if using query params for routing or caching, normalize parameter order to prevent cache fragmentation.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #92400e;">Unicode Normalization</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">URL-encoded unicode can be represented multiple ways. <code>%C3%A9</code> (NFC) vs <code>e%CC%81</code> (NFD) both represent 'e'. Normalize to single form.</p>
    </div>
  </div>
</div>

### Routing Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: How does an API Gateway route requests to backend services?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> The gateway maintains a routing table that maps incoming request patterns (path, method, headers) to backend service endpoints. When a request arrives, the routing engine evaluates rules in priority order - typically exact matches first, then prefix matches, then regex patterns. The matched route contains the target service URL, and the gateway forwards the request after applying any configured transformations.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you handle route priority conflicts when multiple patterns match?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Route conflicts are resolved through a specificity hierarchy. The gateway assigns priority scores based on pattern type: exact matches score highest, followed by longer prefix matches, then regex patterns by registration order. For paths like <code>/api/v1/users/123</code>, a route for <code>/api/v1/users/{id}</code> beats <code>/api/v1/*</code> because parameterized paths are more specific than wildcards. Some gateways (Kong, NGINX) use explicit priority weights; others (AWS API Gateway) require unique patterns. The key is deterministic behavior - given any input, routing must produce the same output.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: How would you implement hot-reloading of routing rules without dropping connections or causing routing errors during transition?</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> This requires atomic route table swapping with graceful transition. The implementation uses double-buffering: maintain two route table instances (active and staging). Configuration changes are applied to the staging table, validated, then atomically swapped using a pointer/reference swap. In-flight requests continue using the old table (tracked via reference counting), while new requests use the new table. For validation, the gateway compiles routes and checks for conflicts before activation. Edge case: if a route is removed while requests are in-flight, those requests complete normally but new requests get 404. Some systems implement a brief overlap period where both old and new routes are valid. Implementation detail: use RCU (Read-Copy-Update) pattern for lock-free reads during the swap. Related: [[blue-green-deployment]](/topic/system-design/deployment-strategies) patterns apply here.</p>
    </div>
  </div>
</div>

---

## Section 2: Authentication and Authorization

### Deep Mechanics

Authentication at the gateway level validates client identity before requests reach backend services. This creates a security perimeter where all traffic is verified at a single point, eliminating the need for each microservice to implement authentication logic.

<div style="background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: #f8fafc;">Authentication Flow Decision Tree</h4>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 16px;">
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: #f8fafc;">JWT Validation</strong>
      <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 13px;">Signature verification, expiry check, issuer validation. Stateless - no backend call needed. O(1) validation time.</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: #f8fafc;">OAuth2 Introspection</strong>
      <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 13px;">Call authorization server to validate opaque tokens. Allows token revocation. Adds latency per request.</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: #f8fafc;">API Key Lookup</strong>
      <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 13px;">Hash-based lookup in distributed cache. Simple but requires secure key generation and rotation.</p>
    </div>
  </div>
</div>

### JWT Processing Pipeline

```python
class JWTAuthenticator:
    """
    Production JWT authentication with security hardening.

    Security Considerations:
    - Algorithm confusion attacks: explicitly validate 'alg' header
    - Key confusion: separate keys for signing vs encryption
    - Clock skew: allow configurable leeway for 'exp' and 'nbf'
    """

    def __init__(
        self,
        public_keys: Dict[str, RSAPublicKey],  # kid -> key mapping
        allowed_algorithms: List[str] = ["RS256", "ES256"],
        allowed_issuers: List[str] = None,
        clock_skew_seconds: int = 30,
    ):
        self.public_keys = public_keys
        self.allowed_algorithms = allowed_algorithms
        self.allowed_issuers = allowed_issuers or []
        self.clock_skew = timedelta(seconds=clock_skew_seconds)

        # CRITICAL: Never allow 'none' algorithm
        if "none" in [a.lower() for a in allowed_algorithms]:
            raise SecurityError("Algorithm 'none' is not permitted")

    def authenticate(self, token: str) -> AuthResult:
        """
        Validate JWT and extract claims.

        Validation Order (fail fast):
        1. Structural validation (3 parts, base64 decodable)
        2. Algorithm check (before signature verification!)
        3. Key selection via 'kid' header
        4. Signature verification
        5. Time-based claims (exp, nbf, iat)
        6. Issuer validation
        7. Custom claims validation
        """
        try:
            # Step 1: Decode header without verification to get 'alg' and 'kid'
            unverified_header = jwt.get_unverified_header(token)

            # Step 2: Algorithm validation BEFORE any crypto operations
            alg = unverified_header.get("alg")
            if alg not in self.allowed_algorithms:
                return AuthResult.failure(
                    "INVALID_ALGORITHM",
                    f"Algorithm {alg} not permitted"
                )

            # Step 3: Key selection
            kid = unverified_header.get("kid")
            if kid not in self.public_keys:
                return AuthResult.failure(
                    "UNKNOWN_KEY",
                    f"Key ID {kid} not found"
                )

            public_key = self.public_keys[kid]

            # Step 4-6: Full verification
            claims = jwt.decode(
                token,
                public_key,
                algorithms=[alg],  # Only allow the declared algorithm
                options={
                    "require": ["exp", "iat", "sub"],
                    "verify_exp": True,
                    "verify_iat": True,
                },
                leeway=self.clock_skew,
                issuer=self.allowed_issuers if self.allowed_issuers else None,
            )

            return AuthResult.success(
                user_id=claims["sub"],
                claims=claims,
                token_id=claims.get("jti"),
            )

        except jwt.ExpiredSignatureError:
            return AuthResult.failure("TOKEN_EXPIRED", "Token has expired")
        except jwt.InvalidIssuerError:
            return AuthResult.failure("INVALID_ISSUER", "Token issuer not trusted")
        except jwt.InvalidSignatureError:
            return AuthResult.failure("INVALID_SIGNATURE", "Signature verification failed")
        except Exception as e:
            # Log for debugging but return generic error to client
            logger.error(f"JWT validation error: {e}")
            return AuthResult.failure("INVALID_TOKEN", "Token validation failed")

    def refresh_keys(self, jwks_url: str) -> None:
        """
        Fetch updated public keys from JWKS endpoint.

        Critical for key rotation without downtime.
        Cache keys with TTL, but validate new keys before replacing old ones.
        """
        response = requests.get(jwks_url, timeout=5)
        jwks = response.json()

        new_keys = {}
        for key_data in jwks.get("keys", []):
            kid = key_data.get("kid")
            if kid:
                # Convert JWK to public key object
                new_keys[kid] = jwt.algorithms.RSAAlgorithm.from_jwk(key_data)

        # Atomic replacement
        self.public_keys = new_keys
```

### Authorization Patterns

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Gateway vs Service Authorization</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div>
      <div style="background: #dbeafe; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
        <strong style="color: #1e40af;">Coarse-Grained (Gateway)</strong>
        <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
          <li>Route-level access control</li>
          <li>Role-based path restrictions</li>
          <li>IP allowlisting/blocklisting</li>
          <li>API key scope validation</li>
        </ul>
      </div>
      <p style="color: #64748b; font-size: 13px; font-style: italic;">Example: Only 'admin' role can access /api/admin/*</p>
    </div>
    <div>
      <div style="background: #dcfce7; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
        <strong style="color: #166534;">Fine-Grained (Service)</strong>
        <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
          <li>Resource-level permissions</li>
          <li>Attribute-based access (ABAC)</li>
          <li>Business rule evaluation</li>
          <li>Dynamic permission checks</li>
        </ul>
      </div>
      <p style="color: #64748b; font-size: 13px; font-style: italic;">Example: User can only view their own orders</p>
    </div>
  </div>
  <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin-top: 16px;">
    <strong style="color: #92400e;">Design Trade-off:</strong>
    <p style="color: #78350f; margin: 8px 0 0 0; font-size: 14px;">Pushing authorization to gateway simplifies services but limits flexibility. Gateway doesn't have business context (e.g., "is this the order owner?"). Hybrid approach: gateway handles authentication + coarse authorization, services handle fine-grained authorization using claims passed from gateway.</p>
  </div>
</div>

### Authentication Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: How does API Gateway authentication work with JWT tokens?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> The gateway intercepts incoming requests and extracts the JWT from the Authorization header. It validates the token's signature using public keys (typically fetched from a JWKS endpoint), checks expiration time, verifies the issuer claim, and extracts user claims. If validation succeeds, the gateway forwards the request with claims attached (often as headers). Backend services trust these headers because they trust the gateway.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you handle JWT revocation since JWTs are stateless?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Since JWTs are self-contained, true instant revocation is impossible without introducing state. Common strategies: (1) <strong>Short expiry times</strong> (5-15 minutes) with refresh tokens - limits exposure window. (2) <strong>Token blacklist</strong> in distributed cache (Redis) - gateway checks blacklist before accepting token; only need to store revoked tokens until their natural expiry. (3) <strong>Token versioning</strong> - store token version per user in cache; increment on logout/password change; reject tokens with old version. (4) <strong>Refresh token rotation</strong> - each refresh invalidates the previous refresh token chain. Trade-off: blacklist adds latency and state; short expiry increases auth server load. See [[distributed-caching]](/topic/system-design/caching) for blacklist implementation.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: How would you design the gateway to handle a compromised signing key without service disruption?</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> This requires a key rotation strategy that maintains backward compatibility during transition. Implementation: (1) <strong>Multiple active keys</strong> - gateway accepts tokens signed by any key in the current key set (identified by 'kid' header). (2) <strong>Overlap period</strong> - when rotating, add new key to set before removing old key; auth server switches to new key; old tokens remain valid until expiry. (3) <strong>Compromise response</strong> - for compromised key: immediately remove from gateway's key set (blocking new validations), force re-authentication for all users with tokens signed by compromised key (blacklist by 'kid'), issue new tokens with new key. Edge case: if attacker has stolen the key, they can mint tokens - use very short blacklist window where ALL tokens from that key are rejected regardless of claims. (4) <strong>HSM integration</strong> - store signing keys in Hardware Security Module for production; keys never leave the HSM; reduces compromise risk. Monitoring: alert on unusual token patterns (bulk minting, unusual claims) as early compromise indicator.</p>
    </div>
  </div>
</div>

---

## Section 3: Rate Limiting

### Deep Mechanics

Rate limiting controls request throughput to protect backend services from overload and ensure fair resource allocation among clients. The gateway enforces limits based on various dimensions: client identity, endpoint, HTTP method, or combinations thereof.

<div style="background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: white;">Rate Limiting Algorithms Compared</h4>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px;">
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: white;">Token Bucket</strong>
      <p style="color: #fed7aa; margin: 8px 0 0 0; font-size: 13px;">Allows bursts up to bucket capacity. Tokens refill at fixed rate. Smooth average rate with burst tolerance. Best for: APIs with variable traffic patterns.</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: white;">Leaky Bucket</strong>
      <p style="color: #fed7aa; margin: 8px 0 0 0; font-size: 13px;">Queue-based, processes at constant rate. Smooths traffic but adds latency during bursts. Best for: Strict rate enforcement, traffic shaping.</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: white;">Fixed Window</strong>
      <p style="color: #fed7aa; margin: 8px 0 0 0; font-size: 13px;">Count requests per time window. Simple but allows 2x burst at window boundaries. Best for: Simple use cases, billing.</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: white;">Sliding Window Log</strong>
      <p style="color: #fed7aa; margin: 8px 0 0 0; font-size: 13px;">Track timestamp of each request. Most accurate but memory-intensive. Best for: Precise limiting, small request volumes.</p>
    </div>
  </div>
</div>

### Sliding Window Counter Implementation

```python
class SlidingWindowCounter:
    """
    Hybrid sliding window rate limiter.

    Combines fixed window efficiency with sliding window accuracy.
    Memory: O(1) per key (stores only 2 counters + timestamp)

    Algorithm:
    - Maintain counters for current and previous fixed windows
    - Calculate weighted average based on current position in window
    - Approximates sliding window with minimal memory

    Example: 100 req/min limit, currently 30 seconds into current minute
    - Previous window: 80 requests
    - Current window: 40 requests
    - Weighted count: 40 + (80 * 0.5) = 80 requests (50% of prev window)
    - Remaining: 100 - 80 = 20 requests allowed
    """

    def __init__(self, redis_client: Redis, window_size_ms: int = 60000):
        self.redis = redis_client
        self.window_size_ms = window_size_ms

    def is_allowed(self, key: str, limit: int) -> RateLimitResult:
        """
        Check if request is allowed under rate limit.

        Returns:
        - allowed: bool
        - remaining: int (requests remaining in window)
        - reset_at: int (unix timestamp when window resets)
        - retry_after: int (seconds to wait if denied, 0 if allowed)
        """
        now_ms = int(time.time() * 1000)
        current_window = now_ms // self.window_size_ms
        window_position = (now_ms % self.window_size_ms) / self.window_size_ms

        prev_key = f"{key}:{current_window - 1}"
        curr_key = f"{key}:{current_window}"

        # Atomic read of both counters
        pipe = self.redis.pipeline()
        pipe.get(prev_key)
        pipe.get(curr_key)
        prev_count, curr_count = pipe.execute()

        prev_count = int(prev_count or 0)
        curr_count = int(curr_count or 0)

        # Weighted count: current + (previous * remaining fraction of previous window)
        weighted_count = curr_count + (prev_count * (1 - window_position))

        if weighted_count >= limit:
            retry_after = int((1 - window_position) * self.window_size_ms / 1000)
            return RateLimitResult(
                allowed=False,
                remaining=0,
                reset_at=(current_window + 1) * self.window_size_ms // 1000,
                retry_after=max(1, retry_after)
            )

        # Increment current window counter atomically
        pipe = self.redis.pipeline()
        pipe.incr(curr_key)
        pipe.expire(curr_key, self.window_size_ms // 1000 * 2)  # Keep for 2 windows
        pipe.execute()

        return RateLimitResult(
            allowed=True,
            remaining=int(limit - weighted_count - 1),
            reset_at=(current_window + 1) * self.window_size_ms // 1000,
            retry_after=0
        )


class DistributedRateLimiter:
    """
    Production rate limiter with multi-dimensional limiting.

    Dimensions:
    - Per-user: Prevent single user from consuming all resources
    - Per-IP: Stop DDoS from single source
    - Per-endpoint: Protect expensive operations
    - Global: Overall service protection

    Race Condition Handling:
    - Use Redis MULTI/EXEC for atomic operations
    - Accept slight over-admission during failover (fail-open)
    - Log exceeded limits for post-hoc analysis
    """

    def __init__(self, redis_client: Redis, config: RateLimitConfig):
        self.redis = redis_client
        self.config = config
        self.local_cache = TTLCache(maxsize=10000, ttl=1)  # 1-second local cache

    def check_limits(self, request: Request) -> RateLimitDecision:
        """
        Check all applicable rate limits.

        Order matters for performance:
        1. Check local cache for recently denied clients
        2. Check cheapest dimensions first (user, IP)
        3. Check global limit last (contended key)
        """
        client_id = request.user_id or request.client_ip

        # Fast path: recently denied
        if client_id in self.local_cache and self.local_cache[client_id] == "denied":
            return RateLimitDecision(allowed=False, reason="recently_denied")

        dimensions = [
            ("user", f"rl:user:{request.user_id}", self.config.per_user_limit),
            ("ip", f"rl:ip:{request.client_ip}", self.config.per_ip_limit),
            ("endpoint", f"rl:ep:{request.endpoint}", self.config.per_endpoint_limit),
            ("global", "rl:global", self.config.global_limit),
        ]

        limiter = SlidingWindowCounter(self.redis, self.config.window_ms)

        for dimension_name, key, limit in dimensions:
            if limit is None:
                continue

            result = limiter.is_allowed(key, limit)

            if not result.allowed:
                self.local_cache[client_id] = "denied"
                return RateLimitDecision(
                    allowed=False,
                    dimension=dimension_name,
                    retry_after=result.retry_after,
                    headers={
                        "X-RateLimit-Limit": str(limit),
                        "X-RateLimit-Remaining": "0",
                        "X-RateLimit-Reset": str(result.reset_at),
                        "Retry-After": str(result.retry_after),
                    }
                )

        # All limits passed
        return RateLimitDecision(allowed=True)
```

### Edge Cases in Distributed Rate Limiting

<div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #991b1b; margin-top: 0;">Critical Distributed Rate Limiting Challenges</h4>
  <div style="display: grid; gap: 16px;">
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b;">Redis Failure Modes</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;"><strong>Fail-open:</strong> Allow requests when Redis unavailable (availability over protection). <strong>Fail-closed:</strong> Deny requests when Redis unavailable (protection over availability). Most systems choose fail-open with local rate limiting fallback and aggressive alerting.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b;">Clock Drift</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Gateway instances may have slight clock differences. If instance A is 100ms ahead, it may start a new window before instance B, causing temporary over-admission. Use NTP sync with tight tolerances; use Redis server time (TIME command) for window boundaries.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b;">Thundering Herd at Window Reset</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Clients waiting for window reset may all send requests simultaneously. Add jitter to Retry-After header (e.g., base_wait + random(0, 5 seconds)). Consider exponential backoff hints for repeated denials.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b;">Hot Keys</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Global rate limit key becomes bottleneck under high traffic. Use local counting with periodic sync (eventual consistency), or shard the key across multiple Redis keys with client-side aggregation.</p>
    </div>
  </div>
</div>

### Rate Limiting Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: What is the difference between token bucket and sliding window rate limiting?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Token bucket allows bursts up to bucket capacity while maintaining an average rate - tokens accumulate when unused and can be spent in bursts. Sliding window counts requests in a moving time window, providing more consistent rate enforcement without burst allowance. Token bucket is better for traffic with natural variation; sliding window is better when strict per-second limits are required.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you implement rate limiting across multiple gateway instances without creating a bottleneck?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Use a distributed counter in Redis with the sliding window counter algorithm. Each gateway instance atomically increments the counter using INCR command. For high-throughput scenarios, batch local counts and sync to Redis periodically (every 100ms) to reduce Redis calls - this trades precision for performance. For extreme scale, use Redis Cluster with key sharding, or implement hierarchical rate limiting: local limits (strict) + global limits (approximate via sampling). Monitor with [[distributed-systems]](/topic/system-design/distributed-systems) observability patterns.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: A sophisticated client is bypassing your rate limits by rotating through a pool of API keys. How do you detect and mitigate this?</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> This requires multi-signal abuse detection. (1) <strong>Behavioral fingerprinting:</strong> Track request patterns beyond API key - User-Agent, request timing patterns, endpoint access sequences. Cluster similar behaviors; if multiple keys show identical patterns, treat as single entity for rate limiting. (2) <strong>IP correlation:</strong> If multiple keys originate from same IP or IP block, apply aggregate limits. Consider ASN-level limits for coordinated attacks. (3) <strong>Device fingerprinting:</strong> For browser clients, use TLS fingerprinting (JA3 hash), canvas fingerprinting, or require client-side proof-of-work. (4) <strong>Anomaly detection:</strong> ML model trained on normal usage patterns; flag statistical outliers (unusual endpoint ratios, time-of-day patterns, geographic impossibility). (5) <strong>Proof-of-work challenges:</strong> Return CAPTCHA or computational puzzle when abuse suspected - legitimate users solve once, attackers must solve per-request. Trade-off: false positives harm legitimate users; start with soft limits (warn/log) before hard enforcement.</p>
    </div>
  </div>
</div>

---

## Section 4: Request Transformation

### Deep Mechanics

Request transformation modifies requests before forwarding to backend services. This decouples external API contracts from internal service interfaces, enabling independent evolution of public APIs and internal implementations.

<div style="background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #0369a1; margin-top: 0;">Transformation Pipeline</h4>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #0ea5e9; color: white; min-width: 100px; padding: 8px 16px; border-radius: 8px; text-align: center; font-weight: bold;">Ingress</div>
      <div style="flex: 1; background: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #bae6fd;">
        <span style="color: #475569; font-size: 14px;">Header injection (X-Request-ID, X-Forwarded-For), body parsing, validation, schema transformation</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #0ea5e9; color: white; min-width: 100px; padding: 8px 16px; border-radius: 8px; text-align: center; font-weight: bold;">Forward</div>
      <div style="flex: 1; background: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #bae6fd;">
        <span style="color: #475569; font-size: 14px;">Protocol translation (REST to gRPC), URL rewriting, authentication header mutation</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #0ea5e9; color: white; min-width: 100px; padding: 8px 16px; border-radius: 8px; text-align: center; font-weight: bold;">Egress</div>
      <div style="flex: 1; background: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #bae6fd;">
        <span style="color: #475569; font-size: 14px;">Response filtering, field masking, error translation, CORS header injection</span>
      </div>
    </div>
  </div>
</div>

### Request Transformation Implementation

```python
class RequestTransformer:
    """
    Production request/response transformer.

    Design Principles:
    - Transformations are composable and ordered
    - Each transformation is idempotent (can be retried safely)
    - Streaming support for large payloads
    - Schema validation before and after transformation
    """

    def __init__(self, transformations: List[Transformation]):
        self.transformations = transformations
        self.json_parser = orjson  # Fast JSON parser

    async def transform_request(
        self,
        request: GatewayRequest,
        route: Route
    ) -> TransformedRequest:
        """
        Apply ingress transformations.

        Transformation Types:
        1. Header manipulation (add, remove, rename)
        2. Path rewriting (strip prefix, add prefix)
        3. Query parameter modification
        4. Body transformation (field mapping, type conversion)
        5. Protocol translation
        """
        ctx = TransformationContext(
            original_request=request,
            route=route,
            start_time=time.monotonic(),
        )

        result = TransformedRequest.from_original(request)

        for transform in self.transformations:
            if transform.applies_to(request, route):
                try:
                    result = await transform.apply(result, ctx)
                except TransformationError as e:
                    # Transformation failed - return 400 Bad Request
                    raise BadRequestError(
                        f"Request transformation failed: {e.message}",
                        details={"transformation": transform.name, "error": str(e)}
                    )

        return result

    async def transform_response(
        self,
        response: BackendResponse,
        request: GatewayRequest,
        route: Route
    ) -> GatewayResponse:
        """
        Apply egress transformations.

        Common transformations:
        - Error code normalization (internal errors -> generic 500)
        - Sensitive field removal (internal IDs, debug info)
        - Response envelope wrapping
        - Pagination header extraction
        """
        ctx = TransformationContext(
            original_request=request,
            route=route,
            backend_response=response,
        )

        result = GatewayResponse.from_backend(response)

        for transform in self.transformations:
            if transform.applies_to_response(response, route):
                result = await transform.apply_response(result, ctx)

        return result


class BodyTransformer(Transformation):
    """
    JSON body transformation using JSONPath mappings.

    Example mapping:
    {
        "$.user.firstName": "$.first_name",
        "$.user.lastName": "$.last_name",
        "$.user.emailAddress": "$.email"
    }

    This transforms:
    {"user": {"firstName": "John", "lastName": "Doe", "emailAddress": "john@example.com"}}

    Into:
    {"first_name": "John", "last_name": "Doe", "email": "john@example.com"}
    """

    def __init__(self, field_mappings: Dict[str, str], version_header: str = None):
        self.field_mappings = field_mappings
        self.version_header = version_header
        self._compiled_paths = {
            source: jsonpath_ng.parse(source)
            for source in field_mappings.keys()
        }

    async def apply(self, request: TransformedRequest, ctx: TransformationContext) -> TransformedRequest:
        """Apply field mappings to request body."""
        if not request.body:
            return request

        try:
            source_body = orjson.loads(request.body)
        except orjson.JSONDecodeError:
            raise TransformationError("Invalid JSON in request body")

        target_body = {}

        for source_path, target_path in self.field_mappings.items():
            compiled = self._compiled_paths[source_path]
            matches = compiled.find(source_body)

            if matches:
                value = matches[0].value
                self._set_nested(target_body, target_path, value)

        request.body = orjson.dumps(target_body)
        return request

    def _set_nested(self, obj: dict, path: str, value: Any) -> None:
        """Set value at nested path (e.g., '$.user.name')."""
        parts = path.replace("$.", "").split(".")
        current = obj
        for part in parts[:-1]:
            if part not in current:
                current[part] = {}
            current = current[part]
        current[parts[-1]] = value


class ProtocolTranslator:
    """
    Translate between REST and gRPC protocols.

    Use Case: Public REST API backed by internal gRPC services.

    Mapping:
    - HTTP method + path -> gRPC service/method
    - JSON body -> Protobuf message
    - HTTP status codes <- gRPC status codes
    """

    def __init__(self, proto_descriptors: Dict[str, FileDescriptor]):
        self.descriptors = proto_descriptors
        self.grpc_channels: Dict[str, grpc.Channel] = {}

    async def rest_to_grpc(
        self,
        request: TransformedRequest,
        grpc_service: str,
        grpc_method: str
    ) -> GrpcRequest:
        """
        Convert REST request to gRPC call.

        Edge Cases:
        - Streaming requests: Buffer or stream-through
        - Binary fields: Base64 decode from JSON
        - Repeated fields: JSON arrays -> protobuf repeated
        - Oneof fields: Only one can be set
        """
        # Parse JSON body
        json_body = orjson.loads(request.body) if request.body else {}

        # Get method descriptor
        service_desc = self.descriptors[grpc_service]
        method_desc = service_desc.methods_by_name[grpc_method]
        input_type = method_desc.input_type

        # Convert JSON to protobuf
        message = json_format.ParseDict(json_body, input_type._concrete_class())

        return GrpcRequest(
            service=grpc_service,
            method=grpc_method,
            message=message,
            metadata=self._extract_metadata(request.headers),
        )

    async def grpc_to_rest(self, grpc_response: GrpcResponse) -> GatewayResponse:
        """
        Convert gRPC response to REST response.

        Status Code Mapping:
        - OK (0) -> 200
        - INVALID_ARGUMENT (3) -> 400
        - NOT_FOUND (5) -> 404
        - PERMISSION_DENIED (7) -> 403
        - UNAUTHENTICATED (16) -> 401
        - INTERNAL (13) -> 500
        """
        status_mapping = {
            grpc.StatusCode.OK: 200,
            grpc.StatusCode.INVALID_ARGUMENT: 400,
            grpc.StatusCode.NOT_FOUND: 404,
            grpc.StatusCode.PERMISSION_DENIED: 403,
            grpc.StatusCode.UNAUTHENTICATED: 401,
            grpc.StatusCode.RESOURCE_EXHAUSTED: 429,
            grpc.StatusCode.INTERNAL: 500,
            grpc.StatusCode.UNAVAILABLE: 503,
        }

        http_status = status_mapping.get(grpc_response.status, 500)

        # Convert protobuf to JSON
        if grpc_response.message:
            json_body = json_format.MessageToDict(
                grpc_response.message,
                preserving_proto_field_name=True,  # Keep snake_case
            )
        else:
            json_body = {"error": grpc_response.details}

        return GatewayResponse(
            status=http_status,
            body=orjson.dumps(json_body),
            headers={"Content-Type": "application/json"},
        )
```

### Request Transformation Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: Why would you transform requests at the API Gateway level?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Request transformation decouples external API contracts from internal service implementations. This allows the public API to remain stable while internal services evolve independently. Common use cases include API versioning (transform v1 requests to v2 format), protocol translation (REST to gRPC), and adding system headers (correlation IDs, forwarded-for addresses).</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you handle request transformation for streaming/large payloads without memory issues?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> For large payloads, avoid buffering the entire request in memory. Use streaming transformation with chunked processing: (1) Parse headers and make routing decision first. (2) For body transformation, use SAX-style JSON parsing that emits events as it parses, transforming and forwarding chunks incrementally. (3) For protocol translation (REST to gRPC), buffer only the minimum needed - if transforming a 1GB file upload, the gateway should stream directly to the storage service without holding it in memory. (4) Set explicit body size limits and reject oversized requests early. Related: [[streaming-architectures]](/topic/system-design/streaming).</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: You need to support 3 API versions simultaneously. V1 and V2 have different field names, V3 adds new required fields. How do you design the transformation layer?</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> Design a version normalization pipeline that transforms all versions to a canonical internal format. (1) <strong>Version detection:</strong> Extract version from URL (/v1/), header (Accept: application/vnd.api.v1+json), or query param. Default to latest version for unspecified. (2) <strong>Canonical model:</strong> Internal services always receive the latest (V3) format. Gateway transforms: V1->V3 and V2->V3. (3) <strong>Field mapping:</strong> V1 uses 'name', V2 uses 'full_name', V3 uses 'display_name' - map all to 'display_name'. (4) <strong>Required field handling:</strong> V3 requires 'locale' field not in V1/V2 - gateway adds default value or returns 400 if truly required. (5) <strong>Response transformation:</strong> Reverse the process - transform V3 responses back to requested version format. (6) <strong>Testing:</strong> Property-based tests ensuring roundtrip: transform(V1->V3)->transform(V3->V1) == original. (7) <strong>Deprecation:</strong> Add Sunset header to V1 responses with deprecation date; log V1 usage for migration tracking.</p>
    </div>
  </div>
</div>

---

## Section 5: Service Discovery

### Deep Mechanics

Service discovery enables the gateway to locate backend service instances dynamically, essential for containerized and auto-scaling environments where instance addresses change frequently. The gateway must maintain an up-to-date registry of healthy service endpoints.

<div style="background: linear-gradient(135deg, #059669 0%, #34d399 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: white;">Service Discovery Patterns</h4>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px;">
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: white;">Client-Side Discovery</strong>
      <p style="color: #a7f3d0; margin: 8px 0 0 0; font-size: 13px;">Gateway queries registry directly, caches results, handles load balancing. More control but tighter coupling. Examples: Netflix Eureka, Consul.</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: white;">Server-Side Discovery</strong>
      <p style="color: #a7f3d0; margin: 8px 0 0 0; font-size: 13px;">Gateway calls load balancer, which handles discovery. Simpler gateway but additional hop. Examples: AWS ELB, Kubernetes Services.</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: white;">DNS-Based Discovery</strong>
      <p style="color: #a7f3d0; margin: 8px 0 0 0; font-size: 13px;">Service names resolve to instance IPs via DNS. Simple but limited health checking, TTL-based staleness. Examples: Kubernetes CoreDNS.</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: white;">Service Mesh Sidecar</strong>
      <p style="color: #a7f3d0; margin: 8px 0 0 0; font-size: 13px;">Sidecar proxy handles discovery transparently. Gateway routes to service name, sidecar resolves. Examples: Istio, Linkerd.</p>
    </div>
  </div>
</div>

### Service Discovery Implementation

```python
class ServiceRegistry:
    """
    Client-side service discovery with health checking.

    Architecture:
    - Watch-based updates from Consul/etcd (no polling)
    - Local cache with TTL and health status
    - Circuit breaker integration per instance
    - Load balancing strategies per service
    """

    def __init__(
        self,
        consul_client: ConsulClient,
        health_check_interval: float = 5.0,
        cache_ttl: float = 30.0
    ):
        self.consul = consul_client
        self.health_check_interval = health_check_interval
        self.cache_ttl = cache_ttl

        # Service name -> List of healthy instances
        self.services: Dict[str, List[ServiceInstance]] = {}

        # Instance -> health status
        self.health_status: Dict[str, InstanceHealth] = {}

        # Load balancing state
        self.round_robin_counters: Dict[str, int] = defaultdict(int)

        # Watch handles for cleanup
        self._watch_handles: List[asyncio.Task] = []

    async def start(self, services: List[str]) -> None:
        """Start watching specified services for changes."""
        for service_name in services:
            # Initial fetch
            instances = await self._fetch_service_instances(service_name)
            self.services[service_name] = instances

            # Start watch for updates (non-blocking)
            handle = asyncio.create_task(
                self._watch_service(service_name)
            )
            self._watch_handles.append(handle)

        # Start health checker
        asyncio.create_task(self._health_check_loop())

    async def _watch_service(self, service_name: str) -> None:
        """
        Watch service for changes using long-polling.

        Consul blocking queries:
        - Include 'index' parameter
        - Request blocks until change or timeout
        - On change, update local cache
        """
        index = 0
        while True:
            try:
                # Blocking query - returns immediately on change
                index, instances = await self.consul.health.service(
                    service_name,
                    passing=True,
                    index=index,
                    wait="30s"
                )

                # Atomic update
                self.services[service_name] = [
                    ServiceInstance(
                        id=inst["Service"]["ID"],
                        address=inst["Service"]["Address"],
                        port=inst["Service"]["Port"],
                        metadata=inst["Service"].get("Meta", {}),
                        weight=int(inst["Service"].get("Meta", {}).get("weight", 100)),
                    )
                    for inst in instances
                ]

                logger.info(f"Service {service_name} updated: {len(instances)} instances")

            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"Watch error for {service_name}: {e}")
                await asyncio.sleep(5)  # Back off on error

    def get_instance(
        self,
        service_name: str,
        strategy: LoadBalanceStrategy = LoadBalanceStrategy.ROUND_ROBIN
    ) -> Optional[ServiceInstance]:
        """
        Select a healthy instance for the service.

        Strategies:
        - ROUND_ROBIN: Cycle through instances evenly
        - LEAST_CONNECTIONS: Route to instance with fewest active requests
        - WEIGHTED: Respect instance weight metadata
        - RANDOM: Random selection (useful for testing)
        - CONSISTENT_HASH: Same client -> same instance (for caching)
        """
        instances = self.services.get(service_name, [])

        # Filter to healthy instances only
        healthy = [
            inst for inst in instances
            if self.health_status.get(inst.id, InstanceHealth.UNKNOWN) == InstanceHealth.HEALTHY
        ]

        if not healthy:
            # Fall back to all instances if none marked healthy
            # (health check may not have run yet)
            healthy = instances

        if not healthy:
            return None

        if strategy == LoadBalanceStrategy.ROUND_ROBIN:
            idx = self.round_robin_counters[service_name] % len(healthy)
            self.round_robin_counters[service_name] += 1
            return healthy[idx]

        elif strategy == LoadBalanceStrategy.WEIGHTED:
            # Weighted random selection
            total_weight = sum(inst.weight for inst in healthy)
            r = random.randint(1, total_weight)
            cumulative = 0
            for inst in healthy:
                cumulative += inst.weight
                if r <= cumulative:
                    return inst
            return healthy[-1]

        elif strategy == LoadBalanceStrategy.LEAST_CONNECTIONS:
            return min(healthy, key=lambda i: self._active_connections.get(i.id, 0))

        elif strategy == LoadBalanceStrategy.CONSISTENT_HASH:
            # Uses request context - caller must provide hash key
            raise ValueError("Consistent hash requires explicit key - use get_instance_by_hash()")

        else:  # RANDOM
            return random.choice(healthy)

    def get_instance_by_hash(
        self,
        service_name: str,
        hash_key: str
    ) -> Optional[ServiceInstance]:
        """
        Consistent hash-based instance selection.

        Use case: Route requests for same user to same instance
        to maximize cache hit rates.

        Implementation: Jump consistent hash (Google paper)
        - O(ln n) time complexity
        - Minimal remapping when instances change
        """
        instances = self.services.get(service_name, [])
        healthy = [
            inst for inst in instances
            if self.health_status.get(inst.id, InstanceHealth.UNKNOWN) == InstanceHealth.HEALTHY
        ]

        if not healthy:
            return None

        # Sort by ID for deterministic ordering
        sorted_instances = sorted(healthy, key=lambda i: i.id)

        # Jump consistent hash
        hash_value = xxhash.xxh64(hash_key.encode()).intdigest()
        bucket = self._jump_consistent_hash(hash_value, len(sorted_instances))

        return sorted_instances[bucket]

    def _jump_consistent_hash(self, key: int, num_buckets: int) -> int:
        """
        Google's jump consistent hash algorithm.

        Properties:
        - Only 1/n keys remap when adding nth bucket
        - Deterministic
        - O(ln n) iterations
        """
        b, j = -1, 0
        while j < num_buckets:
            b = j
            key = ((key * 2862933555777941757) + 1) & 0xFFFFFFFFFFFFFFFF
            j = int((b + 1) * (float(1 << 31) / float((key >> 33) + 1)))
        return b

    async def _health_check_loop(self) -> None:
        """
        Active health checking of cached instances.

        Why: Consul health checks may have delay.
        Gateway performs its own checks for faster failover.
        """
        while True:
            for service_name, instances in self.services.items():
                for instance in instances:
                    try:
                        # TCP connect check
                        _, writer = await asyncio.wait_for(
                            asyncio.open_connection(instance.address, instance.port),
                            timeout=2.0
                        )
                        writer.close()
                        await writer.wait_closed()

                        self.health_status[instance.id] = InstanceHealth.HEALTHY

                    except (asyncio.TimeoutError, ConnectionError):
                        current = self.health_status.get(instance.id)
                        if current == InstanceHealth.HEALTHY:
                            # First failure - mark as degraded
                            self.health_status[instance.id] = InstanceHealth.DEGRADED
                        else:
                            # Repeated failure - mark as unhealthy
                            self.health_status[instance.id] = InstanceHealth.UNHEALTHY
                            logger.warning(f"Instance {instance.id} marked unhealthy")

            await asyncio.sleep(self.health_check_interval)
```

### Service Discovery Edge Cases

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #92400e; margin-top: 0;">Critical Edge Cases</h4>
  <div style="display: grid; gap: 12px;">
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #92400e;">Split Brain</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Network partition causes gateway to see different instances than registry. Solution: Use quorum-based registry (Consul Raft), implement staleness detection on cached data, fail-open or fail-closed based on criticality.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #92400e;">Thundering Herd on Recovery</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">When a service recovers, all gateways may route traffic simultaneously. Solution: Implement warm-up period where new instances receive gradually increasing traffic (weight ramping).</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #92400e;">Stale DNS Cache</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">DNS-based discovery caches IPs at multiple layers (OS, JVM, resolver). Old IPs route to terminated instances. Solution: Use low TTLs (5-10s), implement connection-level health checks, prefer HTTP-based discovery over DNS.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #92400e;">Zero Instances Available</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">All instances are unhealthy or deregistered. Gateway must decide: fail immediately (503), retry with exponential backoff, or serve stale cached response if available. Consider [[circuit-breaker]](/topic/design-patterns/circuit-breaker) integration.</p>
    </div>
  </div>
</div>

### Service Discovery Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: What is service discovery and why is it needed in an API Gateway?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Service discovery enables the gateway to dynamically locate backend service instances. In containerized environments, services scale up/down and instances get new IP addresses frequently. Instead of hardcoding addresses, the gateway queries a service registry (Consul, etcd, Kubernetes) to find current healthy instances. This enables auto-scaling, rolling deployments, and failover without gateway reconfiguration.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you handle the latency added by service discovery lookups on every request?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Avoid per-request registry lookups through local caching with background refresh. The gateway maintains a local cache of service instances, updated via push (registry watch/subscription) or pull (periodic polling). Requests use the local cache, which adds sub-millisecond overhead. For Consul, use blocking queries (long-polling) that return immediately on change. For Kubernetes, watch the Endpoints API. Cache TTL should be short enough to detect failures (5-30s) but long enough to not overwhelm the registry. Combine with active health checks from the gateway for faster failure detection than registry-based checks. See [[caching-strategies]](/topic/system-design/caching) for cache invalidation patterns.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: A critical service is experiencing a rolling deployment. During deployment, some requests fail because they're routed to terminating instances. How do you achieve zero-downtime deployments with service discovery?</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> This requires coordinated graceful shutdown between deployment orchestrator, service instances, and gateway. (1) <strong>Pre-shutdown deregistration:</strong> Before terminating, instance deregisters from service registry. Gateway stops routing new requests to it. (2) <strong>Connection draining:</strong> Instance continues serving in-flight requests for a drain period (e.g., 30 seconds) before actual shutdown. Gateway maintains connection until response received. (3) <strong>Health check integration:</strong> Instance returns unhealthy to health probes before deregistration, giving gateway time to mark it down. (4) <strong>Retry with different instance:</strong> If request to old instance fails with connection refused, gateway retries to a different instance (idempotent requests only). (5) <strong>Readiness vs liveness:</strong> New instances only appear in registry after passing readiness checks (warmup complete). (6) <strong>Version-aware routing:</strong> During canary deployments, route specific percentage to new version using instance metadata. (7) <strong>Implementation:</strong> Kubernetes does this with preStop hook + terminationGracePeriodSeconds + readiness probes. For non-K8s, implement in application: receive SIGTERM -> deregister -> wait drain period -> shutdown. Monitor: track 5xx rates during deployments to verify zero-downtime.</p>
    </div>
  </div>
</div>

---

## Unified Architecture: Putting It Together

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
  <h4 style="color: #1e293b; margin-top: 0; font-size: 20px;">Complete Request Flow Architecture</h4>

  <div style="display: grid; gap: 16px; margin-top: 20px;">
    <div style="display: flex; gap: 16px; align-items: stretch;">
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px; border-radius: 12px; min-width: 140px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <strong style="font-size: 16px;">INGRESS</strong>
        <span style="font-size: 12px; opacity: 0.9;">TLS Termination</span>
      </div>
      <div style="flex: 1; background: #eff6ff; padding: 16px; border-radius: 12px; border-left: 4px solid #3b82f6;">
        <p style="margin: 0; color: #475569; font-size: 14px;"><strong style="color: #1e293b;">TLS Handshake</strong> - Decrypt HTTPS, validate client certificates if mTLS enabled. Extract SNI for multi-tenant routing.</p>
      </div>
    </div>

    <div style="display: flex; gap: 16px; align-items: stretch;">
      <div style="background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); color: white; padding: 16px; border-radius: 12px; min-width: 140px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <strong style="font-size: 16px;">AUTH</strong>
        <span style="font-size: 12px; opacity: 0.9;">Identity Verification</span>
      </div>
      <div style="flex: 1; background: #f5f3ff; padding: 16px; border-radius: 12px; border-left: 4px solid #8b5cf6;">
        <p style="margin: 0; color: #475569; font-size: 14px;"><strong style="color: #1e293b;">Authentication</strong> - Validate JWT/API key, extract claims. <strong>Authorization</strong> - Check route-level permissions. Fail fast on auth errors.</p>
      </div>
    </div>

    <div style="display: flex; gap: 16px; align-items: stretch;">
      <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 16px; border-radius: 12px; min-width: 140px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <strong style="font-size: 16px;">RATE LIMIT</strong>
        <span style="font-size: 12px; opacity: 0.9;">Traffic Control</span>
      </div>
      <div style="flex: 1; background: #fffbeb; padding: 16px; border-radius: 12px; border-left: 4px solid #f59e0b;">
        <p style="margin: 0; color: #475569; font-size: 14px;"><strong style="color: #1e293b;">Multi-Dimensional Limiting</strong> - Check per-user, per-IP, per-endpoint limits. Add rate limit headers to response.</p>
      </div>
    </div>

    <div style="display: flex; gap: 16px; align-items: stretch;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 16px; border-radius: 12px; min-width: 140px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <strong style="font-size: 16px;">ROUTING</strong>
        <span style="font-size: 12px; opacity: 0.9;">Service Selection</span>
      </div>
      <div style="flex: 1; background: #ecfdf5; padding: 16px; border-radius: 12px; border-left: 4px solid #10b981;">
        <p style="margin: 0; color: #475569; font-size: 14px;"><strong style="color: #1e293b;">Route Match</strong> - Match path/method to route config. <strong>Service Discovery</strong> - Select healthy backend instance via load balancing strategy.</p>
      </div>
    </div>

    <div style="display: flex; gap: 16px; align-items: stretch;">
      <div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 16px; border-radius: 12px; min-width: 140px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <strong style="font-size: 16px;">TRANSFORM</strong>
        <span style="font-size: 12px; opacity: 0.9;">Request Mutation</span>
      </div>
      <div style="flex: 1; background: #ecfeff; padding: 16px; border-radius: 12px; border-left: 4px solid #06b6d4;">
        <p style="margin: 0; color: #475569; font-size: 14px;"><strong style="color: #1e293b;">Ingress Transform</strong> - Add headers (X-Request-ID, X-User-ID), rewrite paths, translate protocols. Inject claims as headers.</p>
      </div>
    </div>

    <div style="display: flex; gap: 16px; align-items: stretch;">
      <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 16px; border-radius: 12px; min-width: 140px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <strong style="font-size: 16px;">FORWARD</strong>
        <span style="font-size: 12px; opacity: 0.9;">Backend Call</span>
      </div>
      <div style="flex: 1; background: #fef2f2; padding: 16px; border-radius: 12px; border-left: 4px solid #ef4444;">
        <p style="margin: 0; color: #475569; font-size: 14px;"><strong style="color: #1e293b;">Circuit Breaker Check</strong> - Verify circuit is closed. <strong>HTTP Forward</strong> - Call backend with timeout. Record success/failure for circuit breaker.</p>
      </div>
    </div>

    <div style="display: flex; gap: 16px; align-items: stretch;">
      <div style="background: linear-gradient(135deg, #64748b 0%, #475569 100%); color: white; padding: 16px; border-radius: 12px; min-width: 140px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <strong style="font-size: 16px;">EGRESS</strong>
        <span style="font-size: 12px; opacity: 0.9;">Response Processing</span>
      </div>
      <div style="flex: 1; background: #f8fafc; padding: 16px; border-radius: 12px; border-left: 4px solid #64748b;">
        <p style="margin: 0; color: #475569; font-size: 14px;"><strong style="color: #1e293b;">Egress Transform</strong> - Add CORS headers, strip internal headers, add timing headers. <strong>Log</strong> - Record request metrics, trace spans.</p>
      </div>
    </div>
  </div>
</div>

---

## Production Considerations

<div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #991b1b; margin-top: 0;">Critical Production Failures and Mitigations</h4>
  <div style="display: grid; gap: 16px;">
    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b; font-size: 16px;">Single Point of Failure</strong>
      <p style="color: #475569; margin: 8px 0 0 0;"><strong>Problem:</strong> Gateway crash takes down all services. <strong>Mitigation:</strong> Deploy multiple gateway instances behind L4 load balancer (HAProxy, NLB). Ensure gateway is stateless - no local session state. Use distributed cache for rate limit counters. Test with chaos engineering.</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b; font-size: 16px;">Memory Exhaustion</strong>
      <p style="color: #475569; margin: 8px 0 0 0;"><strong>Problem:</strong> Large request/response bodies exhaust heap. <strong>Mitigation:</strong> Enforce body size limits, stream large payloads instead of buffering, set aggressive timeouts, implement back-pressure when memory high. Monitor heap usage with alerts.</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b; font-size: 16px;">Connection Pool Exhaustion</strong>
      <p style="color: #475569; margin: 8px 0 0 0;"><strong>Problem:</strong> Slow backend consumes all outbound connections. <strong>Mitigation:</strong> Implement per-service connection limits with [[circuit-breaker]](/topic/design-patterns/circuit-breaker). Set aggressive connection timeouts. Monitor connection pool metrics. Use connection pooling with keep-alive.</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b; font-size: 16px;">Cascading Failures</strong>
      <p style="color: #475569; margin: 8px 0 0 0;"><strong>Problem:</strong> One failing service causes gateway to slow down, affecting all services. <strong>Mitigation:</strong> Bulkhead pattern - separate thread/connection pools per service. Circuit breakers fail fast. Implement request prioritization during overload. See [[fault-tolerance]](/topic/system-design/fault-tolerance).</p>
    </div>
  </div>
</div>

### Key Metrics to Monitor

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Gateway Observability Checklist</h4>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
    <div>
      <h5 style="color: #334155; margin-bottom: 12px;">RED Metrics (per-route)</h5>
      <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
        <li><strong>Rate:</strong> Requests per second</li>
        <li><strong>Errors:</strong> 4xx and 5xx percentages</li>
        <li><strong>Duration:</strong> P50, P95, P99 latency</li>
      </ul>
    </div>
    <div>
      <h5 style="color: #334155; margin-bottom: 12px;">USE Metrics (gateway resources)</h5>
      <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
        <li><strong>Utilization:</strong> CPU, memory, connections</li>
        <li><strong>Saturation:</strong> Queue depths, rejected connections</li>
        <li><strong>Errors:</strong> Connection failures, timeouts</li>
      </ul>
    </div>
    <div>
      <h5 style="color: #334155; margin-bottom: 12px;">Business Metrics</h5>
      <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
        <li>Rate limit rejections per client</li>
        <li>Auth failures by type</li>
        <li>Cache hit ratio</li>
        <li>Circuit breaker state changes</li>
      </ul>
    </div>
    <div>
      <h5 style="color: #334155; margin-bottom: 12px;">Distributed Tracing</h5>
      <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
        <li>Inject trace ID at gateway</li>
        <li>Propagate via headers (W3C Trace Context)</li>
        <li>Span for each middleware stage</li>
        <li>Trace sampling configuration</li>
      </ul>
    </div>
  </div>
</div>

---

## Real-World Failure Story: Netflix Zuul (2015)

<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: #f8fafc; font-size: 18px;">The Incident</h4>

  <p style="color: #cbd5e1; line-height: 1.7;">Netflix's Zuul gateway became a single point of failure when a memory leak caused 45 minutes of streaming outage affecting millions of users.</p>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
    <div>
      <h5 style="color: #fbbf24; margin-bottom: 12px;">Timeline</h5>
      <ol style="color: #e2e8f0; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
        <li>Logging middleware stored full request bodies in memory</li>
        <li>No size limits on buffered requests</li>
        <li>Heap memory grew over hours</li>
        <li>GC pauses caused request timeouts</li>
        <li>Health checks failed, instances killed</li>
        <li>New instances hit same issue immediately</li>
      </ol>
    </div>
    <div>
      <h5 style="color: #34d399; margin-bottom: 12px;">Fixes Implemented</h5>
      <ol style="color: #e2e8f0; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
        <li>Request body size limits enforced</li>
        <li>Streaming for large payloads</li>
        <li>Circuit breakers on gateway itself</li>
        <li>Memory-based autoscaling alerts</li>
        <li>Chaos engineering (Chaos Monkey)</li>
        <li>Load testing with production-size payloads</li>
      </ol>
    </div>
  </div>

  <div style="background: rgba(239, 68, 68, 0.2); border-radius: 8px; padding: 16px; margin-top: 20px; border: 1px solid rgba(239, 68, 68, 0.3);">
    <strong style="color: #fca5a5;">Key Lesson:</strong>
    <span style="color: #fecaca;"> The gateway must be the most reliable component. If it goes down, everything goes down. Design for the gateway to gracefully degrade rather than fail completely.</span>
  </div>
</div>

---

## Related Topics

- [[load-balancing]](/topic/system-design/load-balancing) - Layer 4/7 traffic distribution
- [[rate-limiting]](/topic/system-design/rate-limiting) - Throttling algorithms in depth
- [[circuit-breaker]](/topic/design-patterns/circuit-breaker) - Failure isolation patterns
- [[distributed-caching]](/topic/system-design/caching) - Redis/Memcached for rate limits
- [[service-mesh]](/topic/system-design/service-mesh) - Istio, Linkerd comparison
- [[oauth2-oidc]](/topic/security/oauth2) - Authentication protocol details
- [[microservices]](/topic/system-design/microservices) - Service decomposition patterns
