package kernel

import (
	"bytes"
	"context"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"
	"sync"
	"time"
)

// Blocked Go packages for security
var blockedGoPackages = []string{
	"os/exec",
	"net", "net/http", "net/url", "net/smtp", "net/rpc",
	"syscall",
	"unsafe",
	"plugin",
	"runtime/debug",
	"reflect",
	"os/signal",
	"debug/",
	"go/",
	"internal/",
	"testing",
	"crypto/",
	"encoding/gob",
	"encoding/xml",
	"html/template",
	"text/template",
	"database/sql",
	"log/syslog",
	"mime",
	"path/filepath",
}

// Allowed Go packages for algorithm problems
var allowedGoPackages = map[string]bool{
	"fmt":           true,
	"math":          true,
	"math/rand":     true,
	"sort":          true,
	"strings":       true,
	"strconv":       true,
	"unicode":       true,
	"container/heap": true,
	"container/list": true,
	"container/ring": true,
	"encoding/json":  true,
	"time":           true,
	"errors":         true,
	"bytes":          true,
	"bufio":          true,
	"io":             true,
	"regexp":         true,
	"slices":         true,
	"maps":           true,
	"cmp":            true,
}

// GoKernel implements a Go execution environment with security sandbox
type GoKernel struct {
	workDir   string
	mu        sync.Mutex
	healthy   bool
	id        int
	memLimit  int64
}

// NewGoKernel creates a new Go kernel (implements KernelFactory)
func NewGoKernel(id int, memoryLimit int64) (Kernel, error) {
	// Use /app/go-kernels instead of /tmp to avoid noexec restrictions on Docker tmpfs
	baseDir := os.Getenv("GO_KERNEL_DIR")
	if baseDir == "" {
		baseDir = "/app/go-kernels"
	}
	// Ensure base directory exists
	os.MkdirAll(baseDir, 0755)

	workDir, err := os.MkdirTemp(baseDir, fmt.Sprintf("kernel_%d_*", id))
	if err != nil {
		// Fallback to system temp if custom dir fails
		workDir, err = os.MkdirTemp("", fmt.Sprintf("go_kernel_%d_*", id))
		if err != nil {
			return nil, fmt.Errorf("failed to create work directory: %w", err)
		}
	}

	k := &GoKernel{
		workDir:  workDir,
		id:       id,
		memLimit: memoryLimit,
		healthy:  true,
	}

	// No warmup - compile on first actual use
	// This avoids permission issues during initialization

	return k, nil
}

// validateCode checks code for blocked packages
func (k *GoKernel) validateCode(code string) error {
	// Extract imports
	importRegex := regexp.MustCompile(`import\s+(?:\(\s*([^)]+)\s*\)|"([^"]+)")`)
	matches := importRegex.FindAllStringSubmatch(code, -1)

	var imports []string
	for _, match := range matches {
		if match[1] != "" {
			// Multi-line import
			lines := strings.Split(match[1], "\n")
			for _, line := range lines {
				line = strings.TrimSpace(line)
				if line != "" {
					// Extract package from quotes
					pkgMatch := regexp.MustCompile(`"([^"]+)"`).FindStringSubmatch(line)
					if len(pkgMatch) > 1 {
						imports = append(imports, pkgMatch[1])
					}
				}
			}
		} else if match[2] != "" {
			imports = append(imports, match[2])
		}
	}

	// Check for blocked packages
	for _, pkg := range imports {
		for _, blocked := range blockedGoPackages {
			if strings.HasPrefix(pkg, blocked) || pkg == blocked {
				return fmt.Errorf("package '%s' is not allowed for security reasons", pkg)
			}
		}
		// Check if package is in allowed list (or is a standard allowed one)
		basePackage := strings.Split(pkg, "/")[0]
		if !allowedGoPackages[pkg] && !allowedGoPackages[basePackage] {
			return fmt.Errorf("package '%s' is not in the allowed list", pkg)
		}
	}

	// Check for dangerous function calls
	dangerousCalls := []string{
		"os.Exit", "os.Remove", "os.Rename", "os.Mkdir", "os.Create",
		"os.Open", "os.WriteFile", "os.ReadFile",
		"exec.Command", "exec.Run",
	}
	for _, call := range dangerousCalls {
		if strings.Contains(code, call) {
			return fmt.Errorf("function '%s' is not allowed for security reasons", call)
		}
	}

	return nil
}

func (k *GoKernel) writeCode(code string) (string, error) {
	mainFile := filepath.Join(k.workDir, "main.go")
	if err := os.WriteFile(mainFile, []byte(code), 0644); err != nil {
		return "", fmt.Errorf("failed to write code: %w", err)
	}
	return mainFile, nil
}

// Execute runs Go code using 'go run' to avoid binary permission issues
func (k *GoKernel) Execute(ctx context.Context, code string) (*ExecutionResult, error) {
	k.mu.Lock()
	defer k.mu.Unlock()

	if !k.healthy {
		return nil, fmt.Errorf("kernel is not healthy")
	}

	start := time.Now()

	// Validate code for security
	if err := k.validateCode(code); err != nil {
		return &ExecutionResult{
			Error:    err.Error(),
			ExitCode: 1,
			Duration: time.Since(start),
		}, nil
	}

	// Write code to file
	mainFile, err := k.writeCode(code)
	if err != nil {
		return &ExecutionResult{
			Error:    err.Error(),
			ExitCode: 1,
			Duration: time.Since(start),
		}, nil
	}

	// Use 'go run' instead of separate compile + execute
	// Set GOTMPDIR to workDir to avoid noexec issues on /tmp
	cmd := exec.CommandContext(ctx, "go", "run", mainFile)
	cmd.Dir = k.workDir
	cmd.Env = append(os.Environ(),
		"CGO_ENABLED=0",
		"GOTMPDIR="+k.workDir,
	)

	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	execStart := time.Now()
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
			Error:    "Execution cancelled or timed out",
			ExitCode: -1,
			Duration: time.Since(start),
		}, nil
	case err := <-done:
		execTime := time.Since(execStart)
		duration := time.Since(start)
		result := &ExecutionResult{Duration: duration}

		// Add metrics for Go execution
		result.Metrics = &ExecutionMetrics{
			TimeMs:        float64(execTime.Microseconds()) / 1000.0,
			MemoryCurrent: 0,
			MemoryPeak:    0,
			MemoryFmt:     fmt.Sprintf("Total: %.2fms", float64(execTime.Microseconds())/1000.0),
			MemoryPeakFmt: "go run (compile+run)",
		}

		if err != nil {
			errStr := stderr.String()
			if errStr == "" {
				errStr = err.Error()
			}
			// Clean up error paths
			errStr = strings.ReplaceAll(errStr, k.workDir+"/", "")
			errStr = strings.ReplaceAll(errStr, k.workDir, "")
			result.Error = errStr
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

// GoPool manages a pool of Go kernels with standby mode
type GoPool struct {
	*Pool
}

// NewGoPool creates a new Go kernel pool
func NewGoPool(maxSize int, memoryLimit int64, idleTimeout time.Duration) *GoPool {
	return &GoPool{
		Pool: NewPool(PoolConfig{
			MaxSize:     maxSize,
			MemoryLimit: memoryLimit,
			IdleTimeout: idleTimeout,
			Factory:     NewGoKernel,
		}),
	}
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
