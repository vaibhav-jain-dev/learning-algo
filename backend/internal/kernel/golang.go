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

// Precompiled regex patterns for import validation
var (
	importRegex        = regexp.MustCompile(`import\s+(?:\(\s*([^)]+)\s*\)|"([^"]+)")`)
	quotedPackageRegex = regexp.MustCompile(`"([^"]+)"`)
)

// Blocked Go packages for security (as a map for O(1) lookup with prefix check)
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

// Allowed Go packages for algorithm problems and concurrency learning
var allowedGoPackages = map[string]bool{
	"fmt":            true,
	"math":           true,
	"math/rand":      true,
	"sort":           true,
	"strings":        true,
	"strconv":        true,
	"unicode":        true,
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
	"sync":           true,
	"sync/atomic":    true,
	"context":        true,
	"runtime":        true,
}

// Dangerous function calls that are blocked
var dangerousCalls = []string{
	"os.Exit", "os.Remove", "os.Rename", "os.Mkdir", "os.Create",
	"os.Open", "os.WriteFile", "os.ReadFile",
	"exec.Command", "exec.Run",
}

// Shared GOCACHE directory for faster compilation across all kernels
var (
	sharedGoCache     string
	sharedGoCacheOnce sync.Once
)

func getSharedGoCache() string {
	sharedGoCacheOnce.Do(func() {
		// Use a persistent cache directory
		homeDir, err := os.UserHomeDir()
		if err != nil {
			homeDir = "/tmp"
		}
		sharedGoCache = filepath.Join(homeDir, ".go-build-cache")
		os.MkdirAll(sharedGoCache, 0755)
	})
	return sharedGoCache
}

// GoKernel implements a Go execution environment with security sandbox
type GoKernel struct {
	workDir  string
	mu       sync.Mutex
	healthy  bool
	id       int
	memLimit int64
}

// NewGoKernel creates a new Go kernel (implements KernelFactory)
func NewGoKernel(id int, memoryLimit int64) (Kernel, error) {
	// Use user home directory to avoid noexec restrictions
	// Try multiple locations in order of preference
	baseDir := os.Getenv("GO_KERNEL_DIR")
	if baseDir == "" {
		// Try home directory first (most likely to have exec permissions)
		homeDir, err := os.UserHomeDir()
		if err == nil {
			baseDir = filepath.Join(homeDir, ".go-kernels")
		} else {
			baseDir = "/home/dsalgo/.go-kernels"
		}
	}
	// Ensure base directory exists
	os.MkdirAll(baseDir, 0755)

	workDir, err := os.MkdirTemp(baseDir, fmt.Sprintf("kernel_%d_*", id))
	if err != nil {
		// Fallback to /app/go-kernels
		baseDir = "/app/go-kernels"
		os.MkdirAll(baseDir, 0755)
		workDir, err = os.MkdirTemp(baseDir, fmt.Sprintf("kernel_%d_*", id))
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

// validateCode checks code for blocked packages and dangerous calls
func (k *GoKernel) validateCode(code string) error {
	// Extract imports using precompiled regex
	matches := importRegex.FindAllStringSubmatch(code, -1)

	var imports []string
	for _, match := range matches {
		if match[1] != "" {
			// Multi-line import block - split and extract packages
			lines := strings.Split(match[1], "\n")
			for _, line := range lines {
				line = strings.TrimSpace(line)
				if line != "" {
					// Extract package from quotes using precompiled regex
					pkgMatch := quotedPackageRegex.FindStringSubmatch(line)
					if len(pkgMatch) > 1 {
						imports = append(imports, pkgMatch[1])
					}
				}
			}
		} else if match[2] != "" {
			// Single-line import
			imports = append(imports, match[2])
		}
	}

	// Check for blocked and disallowed packages
	for _, pkg := range imports {
		// Check blocked packages first (most important for security)
		for _, blocked := range blockedGoPackages {
			if strings.HasPrefix(pkg, blocked) || pkg == blocked {
				return fmt.Errorf("package '%s' is not allowed for security reasons", pkg)
			}
		}
		// Check if package is in allowed list
		basePackage := strings.Split(pkg, "/")[0]
		if !allowedGoPackages[pkg] && !allowedGoPackages[basePackage] {
			return fmt.Errorf("package '%s' is not in the allowed list", pkg)
		}
	}

	// Check for dangerous function calls
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

// Execute runs Go code by compiling to binary then executing (optimized compile-once approach)
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

	// Use shared GOCACHE for faster compilation
	goCache := getSharedGoCache()

	// Binary output path - put in goCache dir to ensure exec permissions
	binaryPath := filepath.Join(goCache, fmt.Sprintf("prog_%d", k.id))

	// Step 1: Compile with 'go build' (uses cached artifacts)
	compileStart := time.Now()
	buildCmd := exec.CommandContext(ctx, "go", "build", "-o", binaryPath, mainFile)
	buildCmd.Dir = k.workDir
	buildCmd.Env = append(os.Environ(),
		"CGO_ENABLED=0",
		"GOCACHE="+goCache,
	)

	var buildStderr bytes.Buffer
	buildCmd.Stderr = &buildStderr

	if err := buildCmd.Run(); err != nil {
		errStr := buildStderr.String()
		if errStr == "" {
			errStr = err.Error()
		}
		// Clean up error paths
		errStr = strings.ReplaceAll(errStr, k.workDir+"/", "")
		errStr = strings.ReplaceAll(errStr, k.workDir, "")
		return &ExecutionResult{
			Error:    errStr,
			ExitCode: 1,
			Duration: time.Since(start),
		}, nil
	}
	compileTime := time.Since(compileStart)

	// Ensure binary is executable
	os.Chmod(binaryPath, 0755)

	// Step 2: Execute the compiled binary (very fast!)
	execStart := time.Now()
	runCmd := exec.CommandContext(ctx, binaryPath)
	runCmd.Dir = k.workDir

	var stdout, stderr bytes.Buffer
	runCmd.Stdout = &stdout
	runCmd.Stderr = &stderr

	runErr := runCmd.Run()
	execTime := time.Since(execStart)

	// Check for permission denied - fallback to go run if needed
	if runErr != nil && (strings.Contains(runErr.Error(), "permission denied") ||
		strings.Contains(runErr.Error(), "operation not permitted")) {
		// Fallback: use go run (slower but works on noexec filesystems)
		return k.executeWithGoRun(ctx, mainFile, goCache, start)
	}

	duration := time.Since(start)
	result := &ExecutionResult{Duration: duration}

	// Add metrics for Go execution - show actual run time (not compile time)
	result.Metrics = &ExecutionMetrics{
		TimeMs:        float64(execTime.Microseconds()) / 1000.0,
		MemoryCurrent: 0,
		MemoryPeak:    0,
		MemoryFmt:     fmt.Sprintf("Compile: %.2fms", float64(compileTime.Microseconds())/1000.0),
		MemoryPeakFmt: fmt.Sprintf("Run: %.2fms", float64(execTime.Microseconds())/1000.0),
	}

	if runErr != nil {
		errStr := stderr.String()
		if errStr == "" {
			errStr = runErr.Error()
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

// executeWithGoRun is a fallback for systems with noexec restrictions
func (k *GoKernel) executeWithGoRun(ctx context.Context, mainFile, goCache string, start time.Time) (*ExecutionResult, error) {
	execStart := time.Now()
	cmd := exec.CommandContext(ctx, "go", "run", mainFile)
	cmd.Dir = k.workDir
	cmd.Env = append(os.Environ(),
		"CGO_ENABLED=0",
		"GOCACHE="+goCache,
	)

	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	err := cmd.Run()
	execTime := time.Since(execStart)
	duration := time.Since(start)

	result := &ExecutionResult{Duration: duration}
	result.Metrics = &ExecutionMetrics{
		TimeMs:        float64(execTime.Microseconds()) / 1000.0,
		MemoryCurrent: 0,
		MemoryPeak:    0,
		MemoryFmt:     fmt.Sprintf("Total: %.2fms", float64(execTime.Microseconds())/1000.0),
		MemoryPeakFmt: "go run (fallback)",
	}

	if err != nil {
		errStr := stderr.String()
		if errStr == "" {
			errStr = err.Error()
		}
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
