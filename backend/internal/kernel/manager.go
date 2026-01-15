package kernel

import (
	"context"
	"encoding/json"
	"os"
	"path/filepath"
	"sync"
	"time"

	"github.com/google/uuid"
)

// ExecutionManager manages all code executions with state persistence
type ExecutionManager struct {
	pythonPool  *PythonPool
	goPool      *GoPool
	executions  map[string]*Execution
	mu          sync.RWMutex
	stateFile   string
	subscribers map[string][]chan *Execution
	subMu       sync.RWMutex
}

// NewExecutionManager creates a new execution manager
func NewExecutionManager(pythonPool *PythonPool, goPool *GoPool, stateDir string) *ExecutionManager {
	em := &ExecutionManager{
		pythonPool:  pythonPool,
		goPool:      goPool,
		executions:  make(map[string]*Execution),
		stateFile:   filepath.Join(stateDir, "executions.json"),
		subscribers: make(map[string][]chan *Execution),
	}

	// Load persisted state
	em.loadState()

	return em
}

// Execute starts a new code execution
func (em *ExecutionManager) Execute(code, language string) (*Execution, error) {
	// Set timeout based on language (Go needs more time for compilation)
	timeout := 10 * time.Second
	if language == "go" || language == "golang" {
		timeout = 30 * time.Second
	}
	ctx, cancel := context.WithTimeout(context.Background(), timeout)

	exec := &Execution{
		ID:        uuid.New().String(),
		Code:      code,
		Language:  language,
		State:     StateRunning,
		StartedAt: time.Now(),
		cancel:    cancel,
	}

	// Store execution
	em.mu.Lock()
	em.executions[exec.ID] = exec
	em.mu.Unlock()

	// Notify subscribers
	em.notifySubscribers(exec.ID, exec)

	// Run in background
	go em.runExecution(ctx, exec)

	return exec, nil
}

func (em *ExecutionManager) runExecution(ctx context.Context, exec *Execution) {
	defer func() {
		em.saveState()
	}()

	var result *ExecutionResult
	var err error

	switch exec.Language {
	case "python":
		result, err = em.pythonPool.Execute(ctx, exec.Code)
	case "go", "golang":
		result, err = em.goPool.Execute(ctx, exec.Code)
	default:
		exec.Update(StateError, "", "Unsupported language: "+exec.Language, 1)
		em.notifySubscribers(exec.ID, exec)
		return
	}

	if err != nil {
		exec.Update(StateError, "", err.Error(), 1)
	} else if result.Error != "" {
		exec.UpdateWithMetrics(StateError, result.Output, result.Error, result.ExitCode, result.Metrics)
	} else {
		exec.UpdateWithMetrics(StateComplete, result.Output, "", result.ExitCode, result.Metrics)
	}

	em.notifySubscribers(exec.ID, exec)
}

// Stop cancels an execution
func (em *ExecutionManager) Stop(id string) error {
	em.mu.RLock()
	exec, exists := em.executions[id]
	em.mu.RUnlock()

	if !exists {
		return nil
	}

	exec.Stop()
	em.notifySubscribers(id, exec)
	em.saveState()
	return nil
}

// Get retrieves an execution by ID
func (em *ExecutionManager) Get(id string) *Execution {
	em.mu.RLock()
	defer em.mu.RUnlock()
	return em.executions[id]
}

// Subscribe adds a subscriber for execution updates
func (em *ExecutionManager) Subscribe(id string) chan *Execution {
	ch := make(chan *Execution, 10)

	em.subMu.Lock()
	em.subscribers[id] = append(em.subscribers[id], ch)
	em.subMu.Unlock()

	// Send current state immediately
	if exec := em.Get(id); exec != nil {
		select {
		case ch <- exec:
		default:
		}
	}

	return ch
}

// Unsubscribe removes a subscriber
func (em *ExecutionManager) Unsubscribe(id string, ch chan *Execution) {
	em.subMu.Lock()
	defer em.subMu.Unlock()

	subs := em.subscribers[id]
	for i, sub := range subs {
		if sub == ch {
			em.subscribers[id] = append(subs[:i], subs[i+1:]...)
			close(ch)
			break
		}
	}
}

func (em *ExecutionManager) notifySubscribers(id string, exec *Execution) {
	em.subMu.RLock()
	defer em.subMu.RUnlock()

	for _, ch := range em.subscribers[id] {
		select {
		case ch <- exec:
		default:
		}
	}
}

// saveState persists executions to disk
func (em *ExecutionManager) saveState() {
	em.mu.RLock()
	defer em.mu.RUnlock()

	// Only save recent executions (last 100)
	type savedExecution struct {
		ID        string         `json:"id"`
		Language  string         `json:"language"`
		State     ExecutionState `json:"state"`
		Output    string         `json:"output"`
		Error     string         `json:"error,omitempty"`
		ExitCode  int            `json:"exit_code"`
		StartedAt time.Time      `json:"started_at"`
		Duration  int64          `json:"duration_ms"`
	}

	var toSave []savedExecution
	for _, exec := range em.executions {
		// Only save completed/error/stopped
		if exec.GetState() != StateRunning {
			toSave = append(toSave, savedExecution{
				ID:        exec.ID,
				Language:  exec.Language,
				State:     exec.State,
				Output:    exec.Output,
				Error:     exec.Error,
				ExitCode:  exec.ExitCode,
				StartedAt: exec.StartedAt,
				Duration:  exec.Duration,
			})
		}
	}

	// Limit to last 100
	if len(toSave) > 100 {
		toSave = toSave[len(toSave)-100:]
	}

	data, err := json.Marshal(toSave)
	if err != nil {
		return
	}

	os.MkdirAll(filepath.Dir(em.stateFile), 0755)
	os.WriteFile(em.stateFile, data, 0644)
}

// loadState loads persisted executions
func (em *ExecutionManager) loadState() {
	data, err := os.ReadFile(em.stateFile)
	if err != nil {
		return
	}

	type savedExecution struct {
		ID        string         `json:"id"`
		Language  string         `json:"language"`
		State     ExecutionState `json:"state"`
		Output    string         `json:"output"`
		Error     string         `json:"error,omitempty"`
		ExitCode  int            `json:"exit_code"`
		StartedAt time.Time      `json:"started_at"`
		Duration  int64          `json:"duration_ms"`
	}

	var saved []savedExecution
	if err := json.Unmarshal(data, &saved); err != nil {
		return
	}

	em.mu.Lock()
	defer em.mu.Unlock()

	for _, s := range saved {
		em.executions[s.ID] = &Execution{
			ID:        s.ID,
			Language:  s.Language,
			State:     s.State,
			Output:    s.Output,
			Error:     s.Error,
			ExitCode:  s.ExitCode,
			StartedAt: s.StartedAt,
			Duration:  s.Duration,
		}
	}
}

// Cleanup removes old executions
func (em *ExecutionManager) Cleanup(maxAge time.Duration) {
	em.mu.Lock()
	defer em.mu.Unlock()

	cutoff := time.Now().Add(-maxAge)
	for id, exec := range em.executions {
		if exec.StartedAt.Before(cutoff) && exec.GetState() != StateRunning {
			delete(em.executions, id)
		}
	}

	em.saveState()
}

// Stats returns pool statistics
func (em *ExecutionManager) Stats() map[string]interface{} {
	em.mu.RLock()
	running := 0
	completed := 0
	for _, exec := range em.executions {
		switch exec.GetState() {
		case StateRunning:
			running++
		case StateComplete, StateError, StateStopped:
			completed++
		}
	}
	em.mu.RUnlock()

	return map[string]interface{}{
		"python_kernels": em.pythonPool.ActiveCount(),
		"go_kernels":     em.goPool.ActiveCount(),
		"running":        running,
		"completed":      completed,
	}
}
