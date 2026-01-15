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

const pythonKernelScript = `
import sys
import json
import traceback
import signal

def timeout_handler(signum, frame):
    raise TimeoutError("Execution timed out")

signal.signal(signal.SIGALRM, timeout_handler)

def format_result(value):
    """Format the result for display"""
    if value is None:
        return "None"
    if isinstance(value, (list, tuple, dict)):
        return json.dumps(value, indent=2, default=str)
    return str(value)

while True:
    try:
        line = sys.stdin.readline()
        if not line:
            break

        data = json.loads(line.strip())
        code = data.get("code", "")
        timeout = data.get("timeout", 10)

        # Set timeout
        signal.alarm(timeout)

        # Create execution namespace
        namespace = {"__builtins__": __builtins__}

        # Execute user code
        exec(code, namespace)

        # Call main() if it exists
        result = None
        output_lines = []

        if "main" in namespace and callable(namespace["main"]):
            # Capture print output
            import io
            old_stdout = sys.stdout
            sys.stdout = captured = io.StringIO()

            try:
                result = namespace["main"]()
            finally:
                output_lines = captured.getvalue().split('\n')
                sys.stdout = old_stdout

        signal.alarm(0)  # Cancel timeout

        response = {
            "success": True,
            "result": format_result(result),
            "output": "\n".join(output_lines) if output_lines else "",
            "type": type(result).__name__ if result is not None else "None"
        }

    except TimeoutError as e:
        response = {
            "success": False,
            "error": str(e),
            "error_type": "timeout"
        }
    except SyntaxError as e:
        response = {
            "success": False,
            "error": f"Syntax Error: {e.msg} at line {e.lineno}",
            "error_type": "syntax"
        }
    except Exception as e:
        response = {
            "success": False,
            "error": str(e),
            "traceback": traceback.format_exc(),
            "error_type": type(e).__name__
        }

    print(json.dumps(response), flush=True)
`

// PythonKernel implements a persistent Python execution environment
type PythonKernel struct {
	cmd     *exec.Cmd
	stdin   io.WriteCloser
	stdout  *bufio.Reader
	mu      sync.Mutex
	healthy bool
	id      int
}

// NewPythonKernel creates a new Python kernel
func NewPythonKernel(id int, memoryLimit int64) (*PythonKernel, error) {
	k := &PythonKernel{id: id}
	if err := k.start(memoryLimit); err != nil {
		return nil, err
	}
	return k, nil
}

func (k *PythonKernel) start(memoryLimit int64) error {
	// Create temp file for kernel script
	tmpFile, err := os.CreateTemp("", "python_kernel_*.py")
	if err != nil {
		return fmt.Errorf("failed to create kernel script: %w", err)
	}
	defer os.Remove(tmpFile.Name())

	if _, err := tmpFile.WriteString(pythonKernelScript); err != nil {
		return fmt.Errorf("failed to write kernel script: %w", err)
	}
	tmpFile.Close()

	// Start Python process
	k.cmd = exec.Command("python3", "-u", tmpFile.Name())
	k.cmd.Env = append(os.Environ(),
		"PYTHONUNBUFFERED=1",
		"PYTHONDONTWRITEBYTECODE=1",
	)

	stdin, err := k.cmd.StdinPipe()
	if err != nil {
		return fmt.Errorf("failed to get stdin: %w", err)
	}
	k.stdin = stdin

	stdout, err := k.cmd.StdoutPipe()
	if err != nil {
		return fmt.Errorf("failed to get stdout: %w", err)
	}
	k.stdout = bufio.NewReader(stdout)

	if err := k.cmd.Start(); err != nil {
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

	// Send code to kernel
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

	// Read response with timeout
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
		return nil, ctx.Err()
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
		}

		if err := json.Unmarshal([]byte(result.line), &response); err != nil {
			return nil, fmt.Errorf("failed to parse response: %w", err)
		}

		duration := time.Since(start)

		execResult := &ExecutionResult{
			Duration: duration,
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
				errMsg.WriteString("\n\n")
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

	if k.cmd != nil && k.cmd.Process != nil {
		k.cmd.Process.Kill()
		k.cmd.Wait()
	}

	return k.start(0)
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
	if k.stdin != nil {
		k.stdin.Close()
	}
	if k.cmd != nil && k.cmd.Process != nil {
		k.cmd.Process.Kill()
		return k.cmd.Wait()
	}
	return nil
}

// PythonPool manages a pool of Python kernels
type PythonPool struct {
	*Pool
	memoryLimit int64
}

// NewPythonPool creates a new Python kernel pool
func NewPythonPool(size int, memoryLimit int64) *PythonPool {
	return &PythonPool{
		Pool:        NewPool(size, memoryLimit),
		memoryLimit: memoryLimit,
	}
}

// Start initializes all kernels in the pool
func (p *PythonPool) Start() error {
	p.mu.Lock()
	defer p.mu.Unlock()

	for i := 0; i < p.size; i++ {
		k, err := NewPythonKernel(i, p.memoryLimit)
		if err != nil {
			return fmt.Errorf("failed to create Python kernel %d: %w", i, err)
		}
		p.kernels = append(p.kernels, k)
		p.available <- k
	}

	p.running = true
	return nil
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
