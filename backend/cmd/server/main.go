package main

import (
	"html/template"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/template/html/v2"

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

	// Initialize kernel pools
	pythonPool := kernel.NewPythonPool(3, 256*1024*1024) // 3 kernels, 256MB each
	goPool := kernel.NewGoPool(2, 256*1024*1024)        // 2 kernels, 256MB each

	// Start kernel pools
	if err := pythonPool.Start(); err != nil {
		log.Fatalf("Failed to start Python pool: %v", err)
	}
	if err := goPool.Start(); err != nil {
		log.Fatalf("Failed to start Go pool: %v", err)
	}

	// Create handlers
	h := handlers.New(pythonPool, goPool)

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

	// HTMX partial routes
	htmx := app.Group("/htmx")
	htmx.Get("/problem-tree", h.ProblemTree)
	htmx.Get("/problem-content/*", h.ProblemContent)
	htmx.Post("/execute", h.Execute)
	htmx.Get("/output/:id", h.GetOutput)

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

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := app.Listen(":" + port); err != nil {
		log.Fatalf("Server error: %v", err)
	}
}
