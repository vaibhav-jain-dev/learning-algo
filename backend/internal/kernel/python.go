package kernel

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"os/exec"
	"strings"
	"sync"
	"time"
)

// Python kernel script with security sandbox and metrics
const pythonKernelScript = `
import sys
import json
import traceback
import signal
import builtins
import tracemalloc
import time as _time

# Security: Disable dangerous functions
BLOCKED_BUILTINS = ['eval', 'exec', 'compile', '__import__', 'open', 'input']
BLOCKED_MODULES = [
    'os', 'subprocess', 'shutil', 'pathlib',
    'socket', 'urllib', 'http', 'ftplib', 'smtplib',
    'pickle', 'shelve', 'marshal',
    'ctypes', 'multiprocessing', 'threading',
    'pty', 'fcntl', 'resource', 'grp', 'pwd',
    'importlib', 'pkgutil', 'zipimport',
    'sys', 'builtins',
]

# Allowed modules for algorithms
ALLOWED_MODULES = [
    'math', 'random', 'collections', 'heapq', 'bisect',
    'itertools', 'functools', 'operator', 'string',
    'copy', 'types', 're', 'json', 'datetime', 'time',
    'decimal', 'fractions', 'statistics',
    'dataclasses', 'enum', 'typing',
]

# Safe builtins
safe_builtins = {k: v for k, v in builtins.__dict__.items() if k not in BLOCKED_BUILTINS}

# Custom __import__ that blocks dangerous modules
original_import = builtins.__import__
def safe_import(name, globals=None, locals=None, fromlist=(), level=0):
    base_module = name.split('.')[0]
    if base_module in BLOCKED_MODULES:
        raise ImportError(f"Module '{name}' is not allowed for security reasons")
    if base_module not in ALLOWED_MODULES and not name.startswith('_'):
        raise ImportError(f"Module '{name}' is not in the allowed list")
    return original_import(name, globals, locals, fromlist, level)

safe_builtins['__import__'] = safe_import

def timeout_handler(signum, frame):
    raise TimeoutError("Execution timed out (10 second limit)")

signal.signal(signal.SIGALRM, timeout_handler)

def format_result(value):
    if value is None:
        return "None"
    if isinstance(value, (list, tuple, dict)):
        try:
            return json.dumps(value, indent=2, default=str)
        except:
            return str(value)
    return str(value)

def format_bytes(size):
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size < 1024:
            return f"{size:.2f} {unit}"
        size /= 1024
    return f"{size:.2f} TB"

while True:
    try:
        line = sys.stdin.readline()
        if not line:
            break

        data = json.loads(line.strip())
        code = data.get("code", "")
        timeout = min(data.get("timeout", 10), 10)

        signal.alarm(timeout)

        # Start memory tracking
        tracemalloc.start()
        start_time = _time.perf_counter()

        # Create restricted namespace
        namespace = {"__builtins__": safe_builtins}

        exec(code, namespace)

        result = None
        output_lines = []

        if "main" in namespace and callable(namespace["main"]):
            import io as _io
            old_stdout = sys.stdout
            sys.stdout = captured = _io.StringIO()
            try:
                result = namespace["main"]()
            finally:
                output_lines = captured.getvalue().split('\n')
                sys.stdout = old_stdout
        else:
            raise ValueError("Code must define a main() function that returns a value")

        # Get metrics
        end_time = _time.perf_counter()
        current, peak = tracemalloc.get_traced_memory()
        tracemalloc.stop()

        signal.alarm(0)

        exec_time_ms = (end_time - start_time) * 1000

        response = {
            "success": True,
            "result": format_result(result),
            "output": "\n".join(output_lines) if output_lines else "",
            "type": type(result).__name__ if result is not None else "None",
            "metrics": {
                "time_ms": round(exec_time_ms, 2),
                "memory_current": current,
                "memory_peak": peak,
                "memory_current_fmt": format_bytes(current),
                "memory_peak_fmt": format_bytes(peak)
            }
        }

    except TimeoutError as e:
        tracemalloc.stop() if tracemalloc.is_tracing() else None
        signal.alarm(0)
        response = {"success": False, "error": str(e), "error_type": "timeout"}
    except ImportError as e:
        tracemalloc.stop() if tracemalloc.is_tracing() else None
        signal.alarm(0)
        response = {"success": False, "error": str(e), "error_type": "security"}
    except SyntaxError as e:
        tracemalloc.stop() if tracemalloc.is_tracing() else None
        signal.alarm(0)
        response = {"success": False, "error": f"Syntax Error: {e.msg} at line {e.lineno}", "error_type": "syntax"}
    except Exception as e:
        tracemalloc.stop() if tracemalloc.is_tracing() else None
        signal.alarm(0)
        tb = traceback.format_exc()
        tb_lines = [l for l in tb.split('\n') if '<string>' in l or not l.strip().startswith('File')]
        response = {
            "success": False,
            "error": str(e),
            "traceback": '\n'.join(tb_lines[-5:]) if tb_lines else "",
            "error_type": type(e).__name__
        }

    print(json.dumps(response), flush=True)
`

// PythonKernel implements a persistent Python execution environment
type PythonKernel struct {
	cmd        *exec.Cmd
	stdin      io.WriteCloser
	stdout     *bufio.Reader
	mu         sync.Mutex
	healthy    bool
	id         int
	memLimit   int64
	scriptPath string
}

// NewPythonKernel creates a new Python kernel (implements KernelFactory)
func NewPythonKernel(id int, memoryLimit int64) (Kernel, error) {
	k := &PythonKernel{id: id, memLimit: memoryLimit}
	if err := k.start(); err != nil {
		return nil, err
	}
	return k, nil
}

func (k *PythonKernel) start() error {
	tmpFile, err := os.CreateTemp("", "python_kernel_*.py")
	if err != nil {
		return fmt.Errorf("failed to create kernel script: %w", err)
	}
	k.scriptPath = tmpFile.Name()

	if _, err := tmpFile.WriteString(pythonKernelScript); err != nil {
		os.Remove(k.scriptPath)
		return fmt.Errorf("failed to write kernel script: %w", err)
	}
	tmpFile.Close()

	k.cmd = exec.Command("python3", "-u", "-B", k.scriptPath)
	k.cmd.Env = append(os.Environ(),
		"PYTHONUNBUFFERED=1",
		"PYTHONDONTWRITEBYTECODE=1",
		"PYTHONHASHSEED=0",
	)

	stdin, err := k.cmd.StdinPipe()
	if err != nil {
		os.Remove(k.scriptPath)
		return fmt.Errorf("failed to get stdin: %w", err)
	}
	k.stdin = stdin

	stdout, err := k.cmd.StdoutPipe()
	if err != nil {
		os.Remove(k.scriptPath)
		return fmt.Errorf("failed to get stdout: %w", err)
	}
	k.stdout = bufio.NewReader(stdout)

	if err := k.cmd.Start(); err != nil {
		os.Remove(k.scriptPath)
		return fmt.Errorf("failed to start Python: %w", err)
	}

	k.healthy = true
	return nil
}

// Execute runs code in the Python kernel
func (k *PythonKernel) Execute(ctx context.Context, code string) (*ExecutionResult, error) {
	k.mu.Lock()
	defer k.mu.Unlock()

	if !k.healthy {
		return nil, fmt.Errorf("kernel is not healthy")
	}

	start := time.Now()

	request := map[string]interface{}{
		"code":    code,
		"timeout": 10,
	}
	reqBytes, _ := json.Marshal(request)
	reqBytes = append(reqBytes, '\n')

	if _, err := k.stdin.Write(reqBytes); err != nil {
		k.healthy = false
		return nil, fmt.Errorf("failed to send code: %w", err)
	}

	type readResult struct {
		line string
		err  error
	}
	resultCh := make(chan readResult, 1)

	go func() {
		line, err := k.stdout.ReadString('\n')
		resultCh <- readResult{line, err}
	}()

	select {
	case <-ctx.Done():
		k.healthy = false
		return &ExecutionResult{
			Error:    "Execution cancelled",
			ExitCode: -1,
			Duration: time.Since(start),
		}, nil
	case result := <-resultCh:
		if result.err != nil {
			k.healthy = false
			return nil, fmt.Errorf("failed to read response: %w", result.err)
		}

		var response struct {
			Success   bool   `json:"success"`
			Result    string `json:"result"`
			Output    string `json:"output"`
			Error     string `json:"error"`
			Traceback string `json:"traceback"`
			ErrorType string `json:"error_type"`
			Type      string `json:"type"`
			Metrics   struct {
				TimeMs        float64 `json:"time_ms"`
				MemoryCurrent int64   `json:"memory_current"`
				MemoryPeak    int64   `json:"memory_peak"`
				MemoryFmt     string  `json:"memory_current_fmt"`
				MemoryPeakFmt string  `json:"memory_peak_fmt"`
			} `json:"metrics"`
		}

		if err := json.Unmarshal([]byte(result.line), &response); err != nil {
			return nil, fmt.Errorf("failed to parse response: %w", err)
		}

		duration := time.Since(start)
		execResult := &ExecutionResult{Duration: duration}

		// Include metrics if available
		if response.Metrics.TimeMs > 0 || response.Metrics.MemoryPeak > 0 {
			execResult.Metrics = &ExecutionMetrics{
				TimeMs:        response.Metrics.TimeMs,
				MemoryCurrent: response.Metrics.MemoryCurrent,
				MemoryPeak:    response.Metrics.MemoryPeak,
				MemoryFmt:     response.Metrics.MemoryFmt,
				MemoryPeakFmt: response.Metrics.MemoryPeakFmt,
			}
		}

		if response.Success {
			var output strings.Builder
			if response.Output != "" {
				output.WriteString(response.Output)
				output.WriteString("\n")
			}
			if response.Result != "" && response.Result != "None" {
				output.WriteString("Return value (")
				output.WriteString(response.Type)
				output.WriteString("): ")
				output.WriteString(response.Result)
			}
			execResult.Output = strings.TrimSpace(output.String())
			execResult.ExitCode = 0
		} else {
			var errMsg strings.Builder
			errMsg.WriteString(response.Error)
			if response.Traceback != "" {
				errMsg.WriteString("\n")
				errMsg.WriteString(response.Traceback)
			}
			execResult.Error = errMsg.String()
			execResult.ExitCode = 1
		}

		return execResult, nil
	}
}

// Reset restarts the kernel
func (k *PythonKernel) Reset() error {
	k.mu.Lock()
	defer k.mu.Unlock()

	if k.scriptPath != "" {
		os.Remove(k.scriptPath)
	}
	if k.cmd != nil && k.cmd.Process != nil {
		k.cmd.Process.Kill()
		k.cmd.Wait()
	}

	return k.start()
}

// IsHealthy checks if the kernel is healthy
func (k *PythonKernel) IsHealthy() bool {
	return k.healthy
}

// Stop terminates the kernel
func (k *PythonKernel) Stop() error {
	k.mu.Lock()
	defer k.mu.Unlock()

	k.healthy = false
	if k.scriptPath != "" {
		os.Remove(k.scriptPath)
	}
	if k.stdin != nil {
		k.stdin.Close()
	}
	if k.cmd != nil && k.cmd.Process != nil {
		k.cmd.Process.Kill()
		return k.cmd.Wait()
	}
	return nil
}

// PythonPool manages a pool of Python kernels with standby mode
type PythonPool struct {
	*Pool
}

// NewPythonPool creates a new Python kernel pool
func NewPythonPool(maxSize int, memoryLimit int64, idleTimeout time.Duration) *PythonPool {
	return &PythonPool{
		Pool: NewPool(PoolConfig{
			MaxSize:     maxSize,
			MemoryLimit: memoryLimit,
			IdleTimeout: idleTimeout,
			Factory:     NewPythonKernel,
		}),
	}
}

// Execute runs code using an available kernel
func (p *PythonPool) Execute(ctx context.Context, code string) (*ExecutionResult, error) {
	kernel, err := p.Acquire(ctx)
	if err != nil {
		return nil, err
	}
	defer p.Release(kernel)

	return kernel.Execute(ctx, code)
}
