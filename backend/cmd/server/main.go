package main

import (
	"encoding/json"
	"html/template"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/template/html/v2"
	"github.com/gofiber/websocket/v2"

	"github.com/vaibhav-jain-dev/learning-algo/internal/handlers"
	"github.com/vaibhav-jain-dev/learning-algo/internal/kernel"
)

func main() {
	// Initialize template engine
	engine := html.New("./frontend/templates", ".html")
	engine.Reload(true)

	// Add custom template functions
	engine.AddFunc("safeHTML", func(s string) template.HTML {
		return template.HTML(s)
	})
	engine.AddFunc("safeJS", func(s string) template.JS {
		return template.JS(s)
	})

	// Create Fiber app
	app := fiber.New(fiber.Config{
		Views:       engine,
		ViewsLayout: "layouts/main",
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
			}
			return c.Status(code).JSON(fiber.Map{
				"error": err.Error(),
			})
		},
	})

	// Middleware
	app.Use(recover.New())
	app.Use(logger.New(logger.Config{
		Format: "[${time}] ${status} - ${method} ${path} (${latency})\n",
	}))
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH",
		AllowHeaders: "Origin,Content-Type,Accept,HX-Request,HX-Trigger,HX-Target",
	}))

	// Initialize kernel pools with standby mode (starts on-demand)
	idleTimeout := 5 * time.Minute
	pythonPool := kernel.NewPythonPool(3, 256*1024*1024, idleTimeout)
	goPool := kernel.NewGoPool(2, 256*1024*1024, idleTimeout)

	// Initialize execution manager with state persistence
	stateDir := os.Getenv("STATE_DIR")
	if stateDir == "" {
		stateDir = "/tmp/dsalgo-state"
	}
	execManager := kernel.NewExecutionManager(pythonPool, goPool, stateDir)

	// Create handlers
	h := handlers.New(pythonPool, goPool, execManager)

	// Static files
	app.Static("/static", "./frontend/static")

	// Page routes (HTMX)
	app.Get("/", h.Home)
	app.Get("/practice", h.Practice)
	app.Get("/system-design", h.SystemDesign)
	app.Get("/design-patterns", h.DesignPatterns)
	app.Get("/machine-coding", h.MachineCoding)

	// API routes
	api := app.Group("/api")
	api.Get("/problems", h.ListProblems)
	api.Get("/problem/*", h.GetProblem)
	api.Post("/run", h.RunCode)
	api.Get("/execution/:id", h.GetExecution)
	api.Post("/execution/:id/stop", h.StopExecution)
	api.Get("/stats", h.Stats)

	// HTMX partial routes
	htmx := app.Group("/htmx")
	htmx.Get("/problem-tree", h.ProblemTree)
	htmx.Get("/problem-content/*", h.ProblemContent)
	htmx.Post("/execute", h.Execute)
	htmx.Get("/output/:id", h.GetOutput)

	// WebSocket for real-time execution updates
	app.Use("/ws", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})

	app.Get("/ws/execute", websocket.New(func(c *websocket.Conn) {
		defer c.Close()

		for {
			// Read execution request
			_, msg, err := c.ReadMessage()
			if err != nil {
				return
			}

			var req struct {
				Action   string `json:"action"`
				Code     string `json:"code"`
				Language string `json:"language"`
				ID       string `json:"id"`
			}

			if err := json.Unmarshal(msg, &req); err != nil {
				c.WriteJSON(fiber.Map{"error": "invalid request"})
				continue
			}

			switch req.Action {
			case "execute":
				// Start execution
				exec, err := execManager.Execute(req.Code, req.Language)
				if err != nil {
					c.WriteJSON(fiber.Map{
						"type":  "error",
						"error": err.Error(),
					})
					continue
				}

				// Send initial state
				c.WriteJSON(fiber.Map{
					"type": "started",
					"id":   exec.ID,
				})

				// Subscribe to updates
				ch := execManager.Subscribe(exec.ID)
				defer execManager.Unsubscribe(exec.ID, ch)

				// Send updates until complete
				for update := range ch {
					state := update.GetState()
					c.WriteJSON(fiber.Map{
						"type":     "update",
						"id":       update.ID,
						"state":    state,
						"output":   update.Output,
						"error":    update.Error,
						"duration": update.Duration,
					})

					if state != kernel.StateRunning {
						break
					}
				}

			case "stop":
				if req.ID != "" {
					execManager.Stop(req.ID)
					c.WriteJSON(fiber.Map{
						"type": "stopped",
						"id":   req.ID,
					})
				}

			case "status":
				if req.ID != "" {
					exec := execManager.Get(req.ID)
					if exec != nil {
						c.WriteJSON(exec.ToJSON())
					} else {
						c.WriteJSON(fiber.Map{
							"type":  "error",
							"error": "execution not found",
						})
					}
				}

			case "reconnect":
				// Reconnect to running execution
				if req.ID != "" {
					exec := execManager.Get(req.ID)
					if exec != nil {
						c.WriteJSON(exec.ToJSON())

						if exec.GetState() == kernel.StateRunning {
							ch := execManager.Subscribe(exec.ID)
							defer execManager.Unsubscribe(exec.ID, ch)

							for update := range ch {
								state := update.GetState()
								c.WriteJSON(fiber.Map{
									"type":     "update",
									"id":       update.ID,
									"state":    state,
									"output":   update.Output,
									"error":    update.Error,
									"duration": update.Duration,
								})

								if state != kernel.StateRunning {
									break
								}
							}
						}
					}
				}
			}
		}
	}))

	// Graceful shutdown
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	go func() {
		<-c
		log.Println("Shutting down...")
		pythonPool.Stop()
		goPool.Stop()
		app.Shutdown()
	}()

	// Periodic cleanup of old executions
	go func() {
		ticker := time.NewTicker(1 * time.Hour)
		defer ticker.Stop()
		for range ticker.C {
			execManager.Cleanup(24 * time.Hour)
		}
	}()

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s (kernels start on-demand)", port)
	if err := app.Listen(":" + port); err != nil {
		log.Fatalf("Server error: %v", err)
	}
}
