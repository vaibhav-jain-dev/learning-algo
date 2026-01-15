package kernel

import (
	"bytes"
	"context"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
	"time"
)

// GoKernel implements a Go execution environment
// Go requires compilation, so we use a warm compiler approach
type GoKernel struct {
	workDir     string
	mu          sync.Mutex
	healthy     bool
	id          int
	memoryLimit int64
}

// NewGoKernel creates a new Go kernel
func NewGoKernel(id int, memoryLimit int64) (*GoKernel, error) {
	// Create working directory
	workDir, err := os.MkdirTemp("", fmt.Sprintf("go_kernel_%d_*", id))
	if err != nil {
		return nil, fmt.Errorf("failed to create work directory: %w", err)
	}

	k := &GoKernel{
		workDir:     workDir,
		id:          id,
		memoryLimit: memoryLimit,
		healthy:     true,
	}

	// Pre-warm Go compiler by compiling a simple program
	warmupCode := `package main
import "fmt"
func main() { fmt.Println("warmup") }
`
	if err := k.compile(warmupCode); err != nil {
		os.RemoveAll(workDir)
		return nil, fmt.Errorf("failed to warm up Go compiler: %w", err)
	}

	return k, nil
}

func (k *GoKernel) compile(code string) error {
	mainFile := filepath.Join(k.workDir, "main.go")
	if err := os.WriteFile(mainFile, []byte(code), 0644); err != nil {
		return fmt.Errorf("failed to write code: %w", err)
	}

	cmd := exec.Command("go", "build", "-o", "program", "main.go")
	cmd.Dir = k.workDir
	cmd.Env = append(os.Environ(),
		"GOCACHE="+filepath.Join(k.workDir, "cache"),
		"GOPATH="+filepath.Join(k.workDir, "gopath"),
	)

	var stderr bytes.Buffer
	cmd.Stderr = &stderr

	if err := cmd.Run(); err != nil {
		return fmt.Errorf("compilation failed: %s", stderr.String())
	}

	return nil
}

// Execute runs Go code
func (k *GoKernel) Execute(ctx context.Context, code string) (*ExecutionResult, error) {
	k.mu.Lock()
	defer k.mu.Unlock()

	if !k.healthy {
		return nil, fmt.Errorf("kernel is not healthy")
	}

	start := time.Now()

	// Compile the code
	if err := k.compile(code); err != nil {
		duration := time.Since(start)
		return &ExecutionResult{
			Error:    err.Error(),
			ExitCode: 1,
			Duration: duration,
		}, nil
	}

	// Run the compiled program
	programPath := filepath.Join(k.workDir, "program")
	cmd := exec.CommandContext(ctx, programPath)
	cmd.Dir = k.workDir

	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	// Set timeout
	done := make(chan error, 1)
	go func() {
		done <- cmd.Run()
	}()

	select {
	case <-ctx.Done():
		if cmd.Process != nil {
			cmd.Process.Kill()
		}
		return &ExecutionResult{
			Error:    "execution timed out",
			ExitCode: -1,
			Duration: time.Since(start),
		}, nil
	case err := <-done:
		duration := time.Since(start)

		result := &ExecutionResult{
			Duration: duration,
		}

		if err != nil {
			result.Error = stderr.String()
			if result.Error == "" {
				result.Error = err.Error()
			}
			result.ExitCode = 1
		} else {
			result.Output = strings.TrimSpace(stdout.String())
			result.ExitCode = 0
		}

		return result, nil
	}
}

// Reset cleans up the kernel workspace
func (k *GoKernel) Reset() error {
	k.mu.Lock()
	defer k.mu.Unlock()

	// Clean up old files but keep the directory
	entries, err := os.ReadDir(k.workDir)
	if err != nil {
		return err
	}

	for _, entry := range entries {
		if entry.Name() != "cache" && entry.Name() != "gopath" {
			os.RemoveAll(filepath.Join(k.workDir, entry.Name()))
		}
	}

	k.healthy = true
	return nil
}

// IsHealthy checks if the kernel is healthy
func (k *GoKernel) IsHealthy() bool {
	return k.healthy
}

// Stop terminates the kernel
func (k *GoKernel) Stop() error {
	k.mu.Lock()
	defer k.mu.Unlock()

	k.healthy = false
	return os.RemoveAll(k.workDir)
}

// GoPool manages a pool of Go kernels
type GoPool struct {
	*Pool
	memoryLimit int64
}

// NewGoPool creates a new Go kernel pool
func NewGoPool(size int, memoryLimit int64) *GoPool {
	return &GoPool{
		Pool:        NewPool(size, memoryLimit),
		memoryLimit: memoryLimit,
	}
}

// Start initializes all kernels in the pool
func (p *GoPool) Start() error {
	p.mu.Lock()
	defer p.mu.Unlock()

	for i := 0; i < p.size; i++ {
		k, err := NewGoKernel(i, p.memoryLimit)
		if err != nil {
			return fmt.Errorf("failed to create Go kernel %d: %w", i, err)
		}
		p.kernels = append(p.kernels, k)
		p.available <- k
	}

	p.running = true
	return nil
}

// Execute runs code using an available kernel
func (p *GoPool) Execute(ctx context.Context, code string) (*ExecutionResult, error) {
	kernel, err := p.Acquire(ctx)
	if err != nil {
		return nil, err
	}
	defer p.Release(kernel)

	return kernel.Execute(ctx, code)
}
