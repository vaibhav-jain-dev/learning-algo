package models

// Problem represents a coding problem
type Problem struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Path        string `json:"path"`
	Category    string `json:"category"`
	Subcategory string `json:"subcategory"`
}

// ProblemContent holds the full content of a problem
type ProblemContent struct {
	Problem
	Description string `json:"description"`
	PythonCode  string `json:"python_code"`
	GolangCode  string `json:"golang_code"`
}

// TreeNode represents a node in the problem tree
type TreeNode struct {
	Name     string      `json:"name"`
	Type     string      `json:"type"` // "folder" or "problem"
	Path     string      `json:"path,omitempty"`
	Children []*TreeNode `json:"children,omitempty"`
}

// ExecuteRequest represents a code execution request
type ExecuteRequest struct {
	Code     string `json:"code" form:"code"`
	Language string `json:"language" form:"language"`
}

// ExecuteResponse represents the execution result
type ExecuteResponse struct {
	Output   string `json:"output"`
	Error    string `json:"error,omitempty"`
	ExitCode int    `json:"exit_code"`
	Duration int64  `json:"duration_ms"`
}
