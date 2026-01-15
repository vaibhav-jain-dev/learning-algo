package kernel

import (
	"context"
	"sync"
	"time"
)

// ExecutionMetrics holds performance metrics for code execution
type ExecutionMetrics struct {
	TimeMs        float64 `json:"time_ms"`
	MemoryCurrent int64   `json:"memory_current"`
	MemoryPeak    int64   `json:"memory_peak"`
	MemoryFmt     string  `json:"memory_fmt"`
	MemoryPeakFmt string  `json:"memory_peak_fmt"`
}

// ExecutionResult holds the result of code execution
type ExecutionResult struct {
	Output   string            `json:"output"`
	Error    string            `json:"error,omitempty"`
	ExitCode int               `json:"exit_code"`
	Duration time.Duration     `json:"duration_ms"`
	Metrics  *ExecutionMetrics `json:"metrics,omitempty"`
}

// ExecutionState tracks the current state of an execution
type ExecutionState string

const (
	StateIdle     ExecutionState = "idle"
	StateRunning  ExecutionState = "running"
	StateComplete ExecutionState = "complete"
	StateError    ExecutionState = "error"
	StateStopped  ExecutionState = "stopped"
)

// Execution represents an ongoing or completed code execution
type Execution struct {
	ID        string            `json:"id"`
	Code      string            `json:"code"`
	Language  string            `json:"language"`
	State     ExecutionState    `json:"state"`
	Output    string            `json:"output"`
	Error     string            `json:"error,omitempty"`
	ExitCode  int               `json:"exit_code"`
	StartedAt time.Time         `json:"started_at"`
	Duration  int64             `json:"duration_ms"`
	Metrics   *ExecutionMetrics `json:"metrics,omitempty"`
	cancel    context.CancelFunc
	mu        sync.RWMutex
}

// Update updates execution state safely
func (e *Execution) Update(state ExecutionState, output, errMsg string, exitCode int) {
	e.mu.Lock()
	defer e.mu.Unlock()
	e.State = state
	e.Output = output
	e.Error = errMsg
	e.ExitCode = exitCode
	if state == StateComplete || state == StateError || state == StateStopped {
		e.Duration = time.Since(e.StartedAt).Milliseconds()
	}
}

// UpdateWithMetrics updates execution state with metrics
func (e *Execution) UpdateWithMetrics(state ExecutionState, output, errMsg string, exitCode int, metrics *ExecutionMetrics) {
	e.mu.Lock()
	defer e.mu.Unlock()
	e.State = state
	e.Output = output
	e.Error = errMsg
	e.ExitCode = exitCode
	e.Metrics = metrics
	if state == StateComplete || state == StateError || state == StateStopped {
		e.Duration = time.Since(e.StartedAt).Milliseconds()
	}
}

// Stop cancels the execution
func (e *Execution) Stop() {
	e.mu.Lock()
	defer e.mu.Unlock()
	if e.cancel != nil {
		e.cancel()
		e.State = StateStopped
	}
}

// GetState returns current state safely
func (e *Execution) GetState() ExecutionState {
	e.mu.RLock()
	defer e.mu.RUnlock()
	return e.State
}

// ToJSON returns execution as a map for JSON response
func (e *Execution) ToJSON() map[string]interface{} {
	e.mu.RLock()
	defer e.mu.RUnlock()
	result := map[string]interface{}{
		"id":         e.ID,
		"state":      e.State,
		"output":     e.Output,
		"error":      e.Error,
		"exit_code":  e.ExitCode,
		"started_at": e.StartedAt,
		"duration":   e.Duration,
	}
	if e.Metrics != nil {
		result["metrics"] = e.Metrics
	}
	return result
}

// Kernel interface for language-specific kernels
type Kernel interface {
	Execute(ctx context.Context, code string) (*ExecutionResult, error)
	Reset() error
	IsHealthy() bool
	Stop() error
}

// KernelFactory creates new kernels
type KernelFactory func(id int, memoryLimit int64) (Kernel, error)

// Pool manages a pool of on-demand kernels with standby mode
type Pool struct {
	mu            sync.Mutex
	kernels       []Kernel
	available     chan Kernel
	maxSize       int
	currentSize   int
	memoryLimit   int64
	idleTimeout   time.Duration
	lastUsed      time.Time
	running       bool
	factory       KernelFactory
	stopChan      chan struct{}
	idleTimer     *time.Timer
}

// PoolConfig configures the kernel pool
type PoolConfig struct {
	MaxSize     int
	MemoryLimit int64
	IdleTimeout time.Duration
	Factory     KernelFactory
}

// NewPool creates a new kernel pool with standby mode
func NewPool(config PoolConfig) *Pool {
	if config.IdleTimeout == 0 {
		config.IdleTimeout = 5 * time.Minute // Default 5 min idle timeout
	}
	return &Pool{
		kernels:     make([]Kernel, 0, config.MaxSize),
		available:   make(chan Kernel, config.MaxSize),
		maxSize:     config.MaxSize,
		memoryLimit: config.MemoryLimit,
		idleTimeout: config.IdleTimeout,
		factory:     config.Factory,
		stopChan:    make(chan struct{}),
		running:     true,
	}
}

// startKernel starts a new kernel on demand
func (p *Pool) startKernel() (Kernel, error) {
	p.mu.Lock()
	defer p.mu.Unlock()

	if p.currentSize >= p.maxSize {
		return nil, nil // Pool is at capacity
	}

	k, err := p.factory(p.currentSize, p.memoryLimit)
	if err != nil {
		return nil, err
	}

	p.kernels = append(p.kernels, k)
	p.currentSize++
	return k, nil
}

// Acquire gets a kernel from the pool, starting one if needed
func (p *Pool) Acquire(ctx context.Context) (Kernel, error) {
	p.mu.Lock()
	p.lastUsed = time.Now()
	// Reset idle timer
	if p.idleTimer != nil {
		p.idleTimer.Stop()
	}
	p.mu.Unlock()

	// Try to get from available pool first
	select {
	case k := <-p.available:
		if !k.IsHealthy() {
			k.Reset()
		}
		return k, nil
	default:
		// No available kernel, try to start a new one
	}

	// Try to start a new kernel
	k, err := p.startKernel()
	if err != nil {
		return nil, err
	}
	if k != nil {
		return k, nil
	}

	// Pool at capacity, wait for available kernel
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
	p.mu.Lock()
	p.lastUsed = time.Now()
	p.startIdleTimer()
	p.mu.Unlock()

	select {
	case p.available <- k:
	default:
		// Pool is full, stop the kernel
		k.Stop()
		p.mu.Lock()
		p.currentSize--
		p.mu.Unlock()
	}
}

// startIdleTimer starts timer to stop idle kernels
func (p *Pool) startIdleTimer() {
	if p.idleTimer != nil {
		p.idleTimer.Stop()
	}
	p.idleTimer = time.AfterFunc(p.idleTimeout, func() {
		p.stopIdleKernels()
	})
}

// stopIdleKernels stops all kernels after idle timeout
func (p *Pool) stopIdleKernels() {
	p.mu.Lock()
	defer p.mu.Unlock()

	if time.Since(p.lastUsed) < p.idleTimeout {
		// Still being used, reschedule
		p.startIdleTimer()
		return
	}

	// Stop all available kernels
	for {
		select {
		case k := <-p.available:
			k.Stop()
			p.currentSize--
		default:
			return
		}
	}
}

// ActiveCount returns number of active kernels
func (p *Pool) ActiveCount() int {
	p.mu.Lock()
	defer p.mu.Unlock()
	return p.currentSize
}

// Stop stops all kernels in the pool
func (p *Pool) Stop() {
	p.mu.Lock()
	defer p.mu.Unlock()

	p.running = false
	if p.idleTimer != nil {
		p.idleTimer.Stop()
	}
	close(p.stopChan)

	// Stop all kernels
	for _, k := range p.kernels {
		k.Stop()
	}

	// Drain available channel
	for {
		select {
		case <-p.available:
		default:
			return
		}
	}
}
