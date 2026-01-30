package main

import (
	"context"
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

	"github.com/vaibhav-jain-dev/learning-algo/internal/db"
	"github.com/vaibhav-jain-dev/learning-algo/internal/elasticsearch"
	"github.com/vaibhav-jain-dev/learning-algo/internal/handlers"
	"github.com/vaibhav-jain-dev/learning-algo/internal/kernel"
	"github.com/vaibhav-jain-dev/learning-algo/internal/redis"
)

func main() {
	// Check if running in production mode
	isProd := os.Getenv("GO_ENV") == "production"

	// Initialize template engine
	engine := html.New("./frontend/templates", ".html")
	// Only reload templates in development (improves performance in production)
	engine.Reload(!isProd)

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

	// Note: Compression and ETag disabled for now - was causing CSS issues
	// Can be re-enabled in production after testing
	// app.Use(compress.New(compress.Config{
	// 	Level: compress.LevelBestSpeed,
	// }))
	// app.Use(etag.New())

	app.Use(logger.New(logger.Config{
		Format: "[${time}] ${status} - ${method} ${path} (${latency})\n",
	}))

	// CORS configuration - supports custom domains via ALLOWED_ORIGINS env var
	// Default allows localhost and *.arvaibhav.cloud domains
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")
	if allowedOrigins == "" {
		// Default origins: localhost variants + *.arvaibhav.cloud subdomains
		allowedOrigins = "http://localhost:8080,http://localhost:3000,http://127.0.0.1:8080,https://learn.arvaibhav.cloud,https://learn-api.arvaibhav.cloud,https://*.arvaibhav.cloud,*"
	}
	app.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins,
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
		AllowHeaders:     "Origin,Content-Type,Accept,HX-Request,HX-Trigger,HX-Target,Authorization,X-Requested-With",
		AllowCredentials: true,
		MaxAge:           86400,
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

	// Warmup Go kernel in background (pre-populates build cache for faster first execution)
	go goPool.Warmup()

	// Create handlers
	h := handlers.New(pythonPool, goPool, execManager)

	// Initialize database connection (optional - graceful if not available)
	var sqlHandlers *handlers.SQLHandlers
	dbConfig := db.ConfigFromEnv()
	database, err := db.New(dbConfig, "./backend/db/migrations")
	if err != nil {
		log.Printf("Warning: Database connection failed: %v (SQL features disabled)", err)
	} else {
		log.Println("Database connected successfully")
		sqlHandlers = handlers.NewSQLHandlers(database)
		defer database.Close()
	}

	// Initialize Elasticsearch connection (optional - graceful if not available)
	var esHandlers *handlers.ElasticsearchHandlers
	esConfig := elasticsearch.ConfigFromEnv()
	esClient, err := elasticsearch.New(esConfig)
	if err != nil {
		log.Printf("Warning: Elasticsearch connection failed: %v (Elasticsearch features disabled)", err)
	} else {
		log.Println("Elasticsearch connected successfully")
		esHandlers = handlers.NewElasticsearchHandlers(esClient)

		// Initialize indices if they don't exist
		go func() {
			ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
			defer cancel()

			testsExists, _ := esClient.IndexExists(ctx, "tests")
			packagesExists, _ := esClient.IndexExists(ctx, "packages")

			if !testsExists || !packagesExists {
				log.Println("Initializing Elasticsearch indices...")
				if err := handlers.InitializeElasticsearch(ctx, esClient); err != nil {
					log.Printf("Warning: Failed to initialize Elasticsearch indices: %v", err)
					return
				}

				// Load sample data
				testsJSON, err := os.ReadFile("./samples_dataset/tests.json")
				if err != nil {
					log.Printf("Warning: Failed to read tests.json: %v", err)
				}
				packagesJSON, err := os.ReadFile("./samples_dataset/packages.json")
				if err != nil {
					log.Printf("Warning: Failed to read packages.json: %v", err)
				}

				if testsJSON != nil || packagesJSON != nil {
					if err := handlers.LoadSampleData(ctx, esClient, testsJSON, packagesJSON); err != nil {
						log.Printf("Warning: Failed to load sample data: %v", err)
					} else {
						log.Println("Elasticsearch sample data loaded successfully")
					}
				}
			} else {
				log.Println("Elasticsearch indices already exist")
			}
		}()
	}

	// Initialize Redis connection (optional - graceful if not available)
	var redisHandlers *handlers.RedisHandlers
	redisConfig := redis.ConfigFromEnv()
	redisClient, err := redis.New(redisConfig)
	if err != nil {
		log.Printf("Warning: Redis connection failed: %v (Redis features disabled)", err)
	} else {
		log.Println("Redis connected successfully")
		redisHandlers = handlers.NewRedisHandlers(redisClient)
		defer redisClient.Close()

		// Load sample data if database is empty
		go func() {
			ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
			defer cancel()

			keys, _ := redisClient.GetKeys(ctx, "*")
			if len(keys) == 0 {
				log.Println("Loading Redis sample data...")
				if err := redisClient.LoadSampleData(ctx); err != nil {
					log.Printf("Warning: Failed to load Redis sample data: %v", err)
				} else {
					log.Println("Redis sample data loaded successfully")
				}
			} else {
				log.Printf("Redis already has %d keys", len(keys))
			}
		}()
	}

	// Static files - simple config for development
	app.Static("/static", "./frontend/static")
	app.Static("/assets", "./frontend/assets")
	app.Static("/problems", "./problems")

	// Note: Page-level caching can be enabled for production by uncommenting below
	// For development, it's disabled to allow live changes
	// app.Use(cache.New(cache.Config{
	// 	Next: func(c *fiber.Ctx) bool {
	// 		path := c.Path()
	// 		return c.Method() != "GET" ||
	// 			strings.HasPrefix(path, "/api/") ||
	// 			strings.HasPrefix(path, "/ws/") ||
	// 			strings.HasPrefix(path, "/htmx/") ||
	// 			strings.HasPrefix(path, "/static/") ||
	// 			strings.HasPrefix(path, "/assets/")
	// 	},
	// 	Expiration:   5 * time.Minute,
	// 	CacheControl: true,
	// }))

	// Page routes (HTMX) - Unified routes with tab navigation
	app.Get("/", h.Home)
	app.Get("/practice", h.Practice)
	app.Get("/roadmap", h.Roadmap) // 7-day study roadmap

	// Unified database learning routes (dashboard + lessons in tabs)
	app.Get("/sql", h.SQL)                      // Combined SQL playground and lessons
	app.Get("/elasticsearch", h.Elasticsearch)  // Combined Elasticsearch playground and lessons
	app.Get("/elasticsearch/search-architecture", h.SearchArchitecture) // Real-world search implementation case study
	app.Get("/redis", h.Redis)                  // Combined Redis playground and lessons

	// Other learning routes
	app.Get("/must-solve-problems", h.MustSolveProblems) // 200 Must Solve Problems (topic overview)
	app.Get("/200-problems", h.TwoHundredProblems)        // 200 Problems Practice Page
	app.Get("/200-problems/*", h.TwoHundredProblems)      // 200 Problems with direct URL (e.g., /200-problems/validate-subsequence)
	app.Get("/learn-subject", h.LearnSubject)            // Learn Subject - Algorithms, Data Structures & Terminologies
	app.Get("/system-design", h.SystemDesign)
	app.Get("/design-patterns", h.DesignPatterns)
	app.Get("/machine-coding", h.MachineCoding)
	app.Get("/microservices", h.Microservices)
	app.Get("/system-architectures", h.SystemArchitectures)
	app.Get("/golang", h.Golang)
	app.Get("/python", h.Python)
	app.Get("/python-asyncio", h.PythonAsyncio)
	app.Get("/deployment-guide", h.DeploymentGuide)
	app.Get("/topic/:category/:topic", h.TopicDetail)

	// API routes
	api := app.Group("/api")
	api.Get("/problems", h.ListProblems)
	api.Get("/problem/*", h.GetProblem)
	api.Post("/run", h.RunCode)
	api.Get("/execution/:id", h.GetExecution)
	api.Post("/execution/:id/stop", h.StopExecution)
	api.Get("/stats", h.Stats)
	api.Get("/topics", h.GetAllTopics)
	api.Get("/debug/topics", h.DebugTopics)

	// HTMX partial routes
	htmx := app.Group("/htmx")
	htmx.Get("/problem-tree", h.ProblemTree)
	htmx.Get("/problem-content/*", h.ProblemContent)
	htmx.Post("/execute", h.Execute)
	htmx.Get("/output/:id", h.GetOutput)
	// 200 Problems HTMX routes
	htmx.Get("/200-problems-tree", h.TwoHundredProblemsTree)
	htmx.Get("/200-problem-content/*", h.TwoHundredProblemContent)

	// SQL API routes (only if database is available)
	if sqlHandlers != nil {
		sqlAPI := app.Group("/api/sql")
		sqlAPI.Post("/execute", sqlHandlers.ExecuteSQL)
		sqlAPI.Get("/schema", sqlHandlers.GetSchema)
		sqlAPI.Get("/stats", sqlHandlers.GetTableStats)
		sqlAPI.Post("/reset", sqlHandlers.ResetDatabase)
		sqlAPI.Get("/health", sqlHandlers.HealthCheck)
		sqlAPI.Get("/er-diagram", sqlHandlers.GetERDiagram)
	}

	// Elasticsearch API routes (only if Elasticsearch is available)
	if esHandlers != nil {
		esAPI := app.Group("/api/elasticsearch")
		esAPI.Post("/execute", esHandlers.ExecuteQuery)
		esAPI.Post("/search", esHandlers.Search)
		esAPI.Get("/stats", esHandlers.GetStats)
		esAPI.Get("/mapping/:index", esHandlers.GetMapping)
		esAPI.Get("/mappings", esHandlers.GetAllMappings)
		esAPI.Get("/health", esHandlers.HealthCheck)
		esAPI.Post("/reset", esHandlers.ResetIndices)
		esAPI.Post("/analyze", esHandlers.Analyze)
		esAPI.Post("/explain", esHandlers.Explain)
	}

	// Redis API routes (only if Redis is available)
	if redisHandlers != nil {
		redisAPI := app.Group("/api/redis")
		redisAPI.Post("/execute", redisHandlers.ExecuteCommand)
		redisAPI.Get("/keys", redisHandlers.GetKeys)
		redisAPI.Get("/info", redisHandlers.GetServerInfo)
		redisAPI.Get("/health", redisHandlers.HealthCheck)
		redisAPI.Post("/reset", redisHandlers.ResetData)
		redisAPI.Post("/load-sample", redisHandlers.LoadSampleData)
	}

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
					msg := fiber.Map{
						"type":     "update",
						"id":       update.ID,
						"state":    state,
						"output":   update.Output,
						"error":    update.Error,
						"duration": update.Duration,
					}
					if update.Metrics != nil {
						msg["metrics"] = update.Metrics
					}
					c.WriteJSON(msg)

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
								msg := fiber.Map{
									"type":     "update",
									"id":       update.ID,
									"state":    state,
									"output":   update.Output,
									"error":    update.Error,
									"duration": update.Duration,
								}
								if update.Metrics != nil {
									msg["metrics"] = update.Metrics
								}
								c.WriteJSON(msg)

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
