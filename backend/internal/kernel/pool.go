package kernel

import (
	"context"
	"sync"
	"time"
)

// ExecutionResult holds the result of code execution
type ExecutionResult struct {
	Output   string        `json:"output"`
	Error    string        `json:"error,omitempty"`
	ExitCode int           `json:"exit_code"`
	Duration time.Duration `json:"duration_ms"`
}

// Kernel interface for language-specific kernels
type Kernel interface {
	Execute(ctx context.Context, code string) (*ExecutionResult, error)
	Reset() error
	IsHealthy() bool
	Stop() error
}

// Pool manages a pool of reusable kernels
type Pool struct {
	kernels     []Kernel
	available   chan Kernel
	mu          sync.Mutex
	size        int
	memoryLimit int64
	running     bool
}

// NewPool creates a new kernel pool
func NewPool(size int, memoryLimit int64) *Pool {
	return &Pool{
		kernels:     make([]Kernel, 0, size),
		available:   make(chan Kernel, size),
		size:        size,
		memoryLimit: memoryLimit,
	}
}

// Acquire gets a kernel from the pool
func (p *Pool) Acquire(ctx context.Context) (Kernel, error) {
	select {
	case k := <-p.available:
		if !k.IsHealthy() {
			k.Reset()
		}
		return k, nil
	case <-ctx.Done():
		return nil, ctx.Err()
	}
}

// Release returns a kernel to the pool
func (p *Pool) Release(k Kernel) {
	select {
	case p.available <- k:
	default:
		// Pool is full, stop the kernel
		k.Stop()
	}
}

// Stop stops all kernels in the pool
func (p *Pool) Stop() {
	p.mu.Lock()
	defer p.mu.Unlock()

	p.running = false
	for _, k := range p.kernels {
		k.Stop()
	}
	close(p.available)
}
