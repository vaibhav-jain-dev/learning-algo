# URL Shortener

## Problem Statement

Design a URL shortening service like TinyURL or bit.ly that converts long URLs to short, unique codes and redirects users to the original URL.

## Requirements

- Generate short, unique codes for long URLs
- Redirect short URLs to original URLs
- Handle high read traffic (more reads than writes)
- Optional: Custom short codes, analytics, expiration

## Design

### Key Decisions

1. **Code Generation**: Base62 encoding (a-z, A-Z, 0-9) = 62^7 = 3.5 trillion combinations
2. **Storage**: Key-value store (code -> URL)
3. **ID Generation**: Auto-increment, UUID, or hash-based

## Solution

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

## Scalability Considerations

### Distributed System

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│ Load Balancer│────▶│  App Server │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                    ┌──────────────────────────┼──────────────────────────┐
                    │                          │                          │
              ┌─────▼─────┐            ┌───────▼───────┐         ┌───────▼───────┐
              │   Cache   │            │   Database    │         │  Counter Svc  │
              │  (Redis)  │            │  (Cassandra)  │         │  (Zookeeper)  │
              └───────────┘            └───────────────┘         └───────────────┘
```

### ID Generation Strategies

| Strategy | Pros | Cons |
|----------|------|------|
| Auto-increment | Simple, sequential | Single point of failure |
| UUID | No coordination | Long, not URL-friendly |
| Hash | Deterministic | Collisions possible |
| Snowflake ID | Distributed, sorted | Complex setup |

## Interview Tips

- Discuss read vs write ratio (100:1 typical)
- Consider caching strategy (read-heavy workload)
- Handle collision resolution
- Discuss analytics requirements
- Mention 301 vs 302 redirects
