# URL Shortener

## Problem Statement

Design a URL shortening service like TinyURL or bit.ly that converts long URLs to short, unique codes and redirects users to the original URL.

## Requirements

- Generate short, unique codes for long URLs
- Redirect short URLs to original URLs
- Handle high read traffic (more reads than writes)
- Optional: Custom short codes, analytics, expiration

---

## Solution Breakdown

### Part 1: Understanding the Scale

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

**Traffic Estimation (for design decisions):**
- 100M new URLs/month → ~40 URLs/second (write)
- Read:Write ratio ~100:1 → 4000 reads/second
- 5 years storage → 6 billion URLs
- Each URL ~500 bytes → 3 TB storage

**Key Insight**: This is a **read-heavy** system. Optimize for reads!

</div>

### Part 2: The Core Problem - Generating Short Codes

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d;">

**How short can we go?**

```
Base62 alphabet: a-z, A-Z, 0-9 = 62 characters

Length | Combinations    | Enough for
-------|-----------------|------------------
   5   | 62^5 = 916M     | Small scale
   6   | 62^6 = 56B      | Medium scale
   7   | 62^7 = 3.5T     | Large scale (TinyURL)
   8   | 62^8 = 218T     | Massive scale
```

**7 characters** gives us 3.5 trillion unique URLs - enough for most use cases!

</div>

### Part 3: ID Generation Strategies

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">

**Strategy 1: Auto-Increment Counter**
```
Counter: 1000001 → Base62: "4c92" → short.url/4c92
Counter: 1000002 → Base62: "4c93" → short.url/4c93
```
- **Pros**: Simple, sequential, no collisions
- **Cons**: Predictable (security concern), single point of failure

**Strategy 2: Hash-based**
```
MD5("https://example.com/long/path") = "5d41402abc4b2a76"
Take first 7 chars → "5d41402"
```
- **Pros**: Deterministic, distributed-friendly
- **Cons**: Collisions possible, need collision handling

**Strategy 3: Pre-generated Key Pool**
```
Generate millions of unique keys offline
Store in database, mark as "used" when assigned
```
- **Pros**: Fast, no runtime computation
- **Cons**: Complexity, key exhaustion management

**Strategy 4: Snowflake ID**
```
| Timestamp (41 bits) | Machine ID (10 bits) | Sequence (12 bits) |
```
- **Pros**: Distributed, time-sorted, unique
- **Cons**: Complex setup, 64-bit number

</div>

### Part 4: System Architecture

```
                                     WRITE PATH
┌──────────┐    ┌──────────────┐    ┌───────────────┐    ┌─────────────┐
│  Client  │───►│ Load Balancer │───►│   App Server  │───►│  Database   │
└──────────┘    └──────────────┘    │               │    │ (Cassandra) │
                                    │ 1. Validate   │    └─────────────┘
                                    │ 2. Generate ID│           │
                                    │ 3. Store      │           │
                                    └───────────────┘           │
                                                                │
                                     READ PATH                  │
┌──────────┐    ┌──────────────┐    ┌───────────────┐    ┌─────▼───────┐
│  Client  │◄───│ Load Balancer │◄───│   App Server  │◄───│    Cache    │
└──────────┘    └──────────────┘    │               │    │   (Redis)   │
      │                             │ 1. Check cache│    └─────────────┘
      │         ┌──────────────┐    │ 2. DB if miss │
      └────────►│     CDN      │    │ 3. 301/302    │
                └──────────────┘    └───────────────┘
```

### Part 5: 301 vs 302 Redirect - Why It Matters

<div style="background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

| Status Code | Name | Browser Behavior | Use Case |
|-------------|------|------------------|----------|
| **301** | Moved Permanently | Caches redirect | SEO, permanent URLs |
| **302** | Found (Temporary) | Always hits server | Analytics tracking |

**For URL shorteners:**
- Use **302** if you need analytics (track every click)
- Use **301** if you want lower server load (browser caches)

**Pro tip**: bit.ly uses 301 for performance, tracks via JavaScript pixel

</div>

---

## Alternative Approaches

### Alternative 1: Zookeeper for Distributed Counter

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px; margin: 16px 0;">

```
┌─────────────────────────────────────────────────────────────┐
│                      Zookeeper                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ Range: 1-1M │  │ Range: 1M-2M│  │ Range: 2M-3M│          │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘          │
│         │                │                │                  │
└─────────┼────────────────┼────────────────┼──────────────────┘
          │                │                │
          ▼                ▼                ▼
    ┌──────────┐     ┌──────────┐     ┌──────────┐
    │ Server 1 │     │ Server 2 │     │ Server 3 │
    │ Uses 1-1M│     │ Uses 1M-2M│    │ Uses 2M-3M│
    └──────────┘     └──────────┘     └──────────┘
```

**How it works:**
1. Each server requests a range from Zookeeper (e.g., 1 million IDs)
2. Server uses IDs locally without coordination
3. When range exhausted, request new range

**Pros**: No per-request coordination
**Cons**: Zookeeper complexity, range waste on server restart

</div>

### Alternative 2: Hash with Collision Resolution

```python
def generate_short_code(url: str) -> str:
    # Try original hash
    code = hash_to_base62(url)[:7]

    # Handle collision
    attempt = 0
    while code_exists(code):
        attempt += 1
        code = hash_to_base62(f"{url}{attempt}")[:7]

    return code
```

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ff6b6b;">

**Collision probability with 7 chars:**
- At 1M URLs: ~0.03% collision rate
- At 100M URLs: ~3% collision rate
- At 1B URLs: ~30% collision rate

**Birthday paradox** - collisions happen sooner than you think!

</div>

### Alternative 3: KGS (Key Generation Service)

```
┌─────────────────────────────────────────────────────────────┐
│                 Key Generation Service                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Pre-generated Keys Table                            │    │
│  │  ┌──────────┬────────┐                              │    │
│  │  │   Key    │  Used  │                              │    │
│  │  ├──────────┼────────┤                              │    │
│  │  │  a7Bc3Df │   No   │ ← Available                  │    │
│  │  │  x9Yz2Qw │   No   │                              │    │
│  │  │  k3Mn8Pv │   Yes  │ ← Already used               │    │
│  │  └──────────┴────────┘                              │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘

Flow:
1. KGS generates keys offline (batch job)
2. App server requests key from KGS
3. KGS marks key as used, returns it
4. App server maps URL to key
```

---

## Pros and Cons Analysis

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px;">

### Counter-based Pros

- **No collisions** - guaranteed unique
- **Predictable** - easy capacity planning
- **Simple** - easy to implement
- **Fast** - O(1) generation
- **Sortable** - by creation time

</div>

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px;">

### Counter-based Cons

- **Predictable URLs** - security concern
- **Single point of failure** - counter service
- **Coordination needed** - for distribution
- **Sequential** - reveals creation order
- **Range exhaustion** - need monitoring

</div>

</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px;">

### Hash-based Pros

- **Distributed** - no coordination
- **Idempotent** - same URL = same code
- **Random-looking** - better security
- **Stateless** - no counter to maintain

</div>

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px;">

### Hash-based Cons

- **Collisions** - need handling
- **Longer codes** - to reduce collisions
- **DB lookup** - to check existence
- **No ordering** - can't sort by time

</div>

</div>

---

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| `shorten(url)` | O(1) avg, O(k) with collisions | O(1) |
| `expand(code)` | O(1) with cache | O(1) |
| **Storage per URL** | - | ~500 bytes |

**Database choice:**
- **Cassandra**: Great for write-heavy, distributed
- **Redis**: For caching hot URLs
- **PostgreSQL**: If you need transactions

---

## Common Extensions

1. **Custom aliases**: `short.url/my-brand` instead of random
2. **Analytics**: Click count, geographic distribution, referrers
3. **Expiration**: Auto-delete after N days
4. **Rate limiting**: Prevent abuse
5. **API keys**: Track usage per customer

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

1. **Start with estimation** - Show you think at scale
2. **Discuss read vs write** - 100:1 ratio is key insight
3. **Compare ID strategies** - Show depth of knowledge
4. **Mention caching** - Redis for hot URLs
5. **Database choice** - Why NoSQL makes sense
6. **301 vs 302** - Shows attention to detail

**Common Follow-ups:**
- How to prevent malicious URLs?
- How to handle analytics at scale?
- How to ensure high availability?
- How to implement custom aliases?

</div>

---

## Implementation

### Python

```python
import hashlib
import time
import string
from dataclasses import dataclass, field
from typing import Optional, Dict
from datetime import datetime, timedelta

BASE62 = string.ascii_letters + string.digits


@dataclass
class URLEntry:
    original_url: str
    short_code: str
    created_at: datetime = field(default_factory=datetime.now)
    expires_at: Optional[datetime] = None
    click_count: int = 0

    def is_expired(self) -> bool:
        if self.expires_at is None:
            return False
        return datetime.now() > self.expires_at


class URLShortener:
    def __init__(self, domain: str = "short.url"):
        self.domain = domain
        self.code_to_url: Dict[str, URLEntry] = {}
        self.url_to_code: Dict[str, str] = {}  # Avoid duplicates
        self.counter = 1000000  # Start with 7-digit codes

    def _encode_base62(self, num: int) -> str:
        """Convert number to base62 string."""
        if num == 0:
            return BASE62[0]

        result = []
        while num > 0:
            result.append(BASE62[num % 62])
            num //= 62
        return ''.join(reversed(result))

    def _decode_base62(self, code: str) -> int:
        """Convert base62 string to number."""
        num = 0
        for char in code:
            num = num * 62 + BASE62.index(char)
        return num

    def _generate_code(self) -> str:
        """Generate unique short code using counter."""
        code = self._encode_base62(self.counter)
        self.counter += 1
        return code

    def _hash_based_code(self, url: str, length: int = 7) -> str:
        """Generate code using MD5 hash of URL + timestamp."""
        data = f"{url}{time.time()}"
        hash_digest = hashlib.md5(data.encode()).hexdigest()
        # Convert hex to base62
        num = int(hash_digest[:12], 16)
        code = self._encode_base62(num)[:length]
        return code

    def shorten(self, url: str, custom_code: Optional[str] = None,
                ttl_days: Optional[int] = None) -> str:
        # Check if URL already shortened
        if url in self.url_to_code:
            existing_code = self.url_to_code[url]
            return f"https://{self.domain}/{existing_code}"

        # Use custom code or generate new one
        if custom_code:
            if custom_code in self.code_to_url:
                raise ValueError(f"Code '{custom_code}' already exists")
            code = custom_code
        else:
            code = self._generate_code()
            # Ensure uniqueness
            while code in self.code_to_url:
                code = self._generate_code()

        # Set expiration
        expires_at = None
        if ttl_days:
            expires_at = datetime.now() + timedelta(days=ttl_days)

        # Store mapping
        entry = URLEntry(
            original_url=url,
            short_code=code,
            expires_at=expires_at
        )
        self.code_to_url[code] = entry
        self.url_to_code[url] = code

        return f"https://{self.domain}/{code}"

    def expand(self, short_url: str) -> Optional[str]:
        """Get original URL from short code."""
        # Extract code from URL
        code = short_url.split('/')[-1]

        entry = self.code_to_url.get(code)
        if not entry:
            return None

        if entry.is_expired():
            # Clean up expired entry
            del self.code_to_url[code]
            del self.url_to_code[entry.original_url]
            return None

        entry.click_count += 1
        return entry.original_url

    def get_stats(self, code: str) -> Optional[Dict]:
        """Get analytics for a short URL."""
        entry = self.code_to_url.get(code)
        if not entry:
            return None

        return {
            'original_url': entry.original_url,
            'short_code': entry.short_code,
            'created_at': entry.created_at.isoformat(),
            'expires_at': entry.expires_at.isoformat() if entry.expires_at else None,
            'click_count': entry.click_count,
            'is_expired': entry.is_expired()
        }

    def delete(self, code: str) -> bool:
        """Delete a short URL."""
        entry = self.code_to_url.get(code)
        if not entry:
            return False

        del self.code_to_url[code]
        del self.url_to_code[entry.original_url]
        return True


# Usage
shortener = URLShortener("tiny.url")

# Create short URLs
url1 = shortener.shorten("https://example.com/very/long/path/to/resource")
url2 = shortener.shorten("https://another.com/page", custom_code="mylink")
url3 = shortener.shorten("https://temp.com/promo", ttl_days=7)

print(f"Short URL 1: {url1}")
print(f"Short URL 2: {url2}")
print(f"Short URL 3: {url3}")

# Expand URLs
original = shortener.expand(url1)
print(f"Original: {original}")

# Get stats
stats = shortener.get_stats("mylink")
print(f"Stats: {stats}")
```

### Go

```go
package main

import (
	"crypto/md5"
	"encoding/hex"
	"errors"
	"fmt"
	"strings"
	"sync"
	"time"
)

const base62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

type URLEntry struct {
	OriginalURL string
	ShortCode   string
	CreatedAt   time.Time
	ExpiresAt   *time.Time
	ClickCount  int64
}

func (e *URLEntry) IsExpired() bool {
	if e.ExpiresAt == nil {
		return false
	}
	return time.Now().After(*e.ExpiresAt)
}

type URLShortener struct {
	domain     string
	codeToURL  map[string]*URLEntry
	urlToCode  map[string]string
	counter    int64
	mu         sync.RWMutex
}

func NewURLShortener(domain string) *URLShortener {
	return &URLShortener{
		domain:    domain,
		codeToURL: make(map[string]*URLEntry),
		urlToCode: make(map[string]string),
		counter:   1000000,
	}
}

func (s *URLShortener) encodeBase62(num int64) string {
	if num == 0 {
		return string(base62[0])
	}

	var result []byte
	for num > 0 {
		result = append([]byte{base62[num%62]}, result...)
		num /= 62
	}
	return string(result)
}

func (s *URLShortener) decodeBase62(code string) int64 {
	var num int64
	for _, c := range code {
		num = num*62 + int64(strings.IndexRune(base62, c))
	}
	return num
}

func (s *URLShortener) generateCode() string {
	s.counter++
	return s.encodeBase62(s.counter)
}

func (s *URLShortener) hashBasedCode(url string) string {
	data := fmt.Sprintf("%s%d", url, time.Now().UnixNano())
	hash := md5.Sum([]byte(data))
	hexStr := hex.EncodeToString(hash[:6])
	// Convert to number and encode
	var num int64
	for _, c := range hexStr[:10] {
		if c >= '0' && c <= '9' {
			num = num*16 + int64(c-'0')
		} else {
			num = num*16 + int64(c-'a'+10)
		}
	}
	code := s.encodeBase62(num)
	if len(code) > 7 {
		code = code[:7]
	}
	return code
}

func (s *URLShortener) Shorten(url string, customCode string, ttlDays int) (string, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	// Check if URL already shortened
	if existingCode, exists := s.urlToCode[url]; exists {
		return fmt.Sprintf("https://%s/%s", s.domain, existingCode), nil
	}

	var code string
	if customCode != "" {
		if _, exists := s.codeToURL[customCode]; exists {
			return "", errors.New("custom code already exists")
		}
		code = customCode
	} else {
		code = s.generateCode()
		for _, exists := s.codeToURL[code]; exists; {
			code = s.generateCode()
		}
	}

	entry := &URLEntry{
		OriginalURL: url,
		ShortCode:   code,
		CreatedAt:   time.Now(),
	}

	if ttlDays > 0 {
		expires := time.Now().AddDate(0, 0, ttlDays)
		entry.ExpiresAt = &expires
	}

	s.codeToURL[code] = entry
	s.urlToCode[url] = code

	return fmt.Sprintf("https://%s/%s", s.domain, code), nil
}

func (s *URLShortener) Expand(shortURL string) (string, error) {
	parts := strings.Split(shortURL, "/")
	code := parts[len(parts)-1]

	s.mu.Lock()
	defer s.mu.Unlock()

	entry, exists := s.codeToURL[code]
	if !exists {
		return "", errors.New("URL not found")
	}

	if entry.IsExpired() {
		delete(s.codeToURL, code)
		delete(s.urlToCode, entry.OriginalURL)
		return "", errors.New("URL expired")
	}

	entry.ClickCount++
	return entry.OriginalURL, nil
}

func (s *URLShortener) GetStats(code string) (*URLEntry, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	entry, exists := s.codeToURL[code]
	if !exists {
		return nil, errors.New("URL not found")
	}
	return entry, nil
}

func (s *URLShortener) Delete(code string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()

	entry, exists := s.codeToURL[code]
	if !exists {
		return false
	}

	delete(s.codeToURL, code)
	delete(s.urlToCode, entry.OriginalURL)
	return true
}

func main() {
	shortener := NewURLShortener("tiny.url")

	// Create short URLs
	url1, _ := shortener.Shorten("https://example.com/very/long/path", "", 0)
	url2, _ := shortener.Shorten("https://another.com/page", "mylink", 0)
	url3, _ := shortener.Shorten("https://temp.com/promo", "", 7)

	fmt.Println("Short URL 1:", url1)
	fmt.Println("Short URL 2:", url2)
	fmt.Println("Short URL 3:", url3)

	// Expand
	original, _ := shortener.Expand(url1)
	fmt.Println("Original:", original)

	// Stats
	stats, _ := shortener.GetStats("mylink")
	fmt.Printf("Clicks: %d\n", stats.ClickCount)
}
```
