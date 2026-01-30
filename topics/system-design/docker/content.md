# Docker

## Overview

Docker is a platform for developing, shipping, and running applications in containers. <span style="background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); padding: 2px 6px; border-radius: 4px;">Containers package an application with all its dependencies, ensuring it runs consistently across any environment</span>.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Docker Architecture</h4>
<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
<div style="background: #3b82f6; color: white; padding: 16px 24px; border-radius: 8px; text-align: center;">
<div style="font-weight: 600;">Docker Client</div>
<div style="font-size: 12px; opacity: 0.9;">docker CLI</div>
</div>
<div style="display: flex; align-items: center; font-size: 24px;">→</div>
<div style="background: #8b5cf6; color: white; padding: 16px 24px; border-radius: 8px; text-align: center;">
<div style="font-weight: 600;">Docker Daemon</div>
<div style="font-size: 12px; opacity: 0.9;">dockerd</div>
</div>
<div style="display: flex; align-items: center; font-size: 24px;">→</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: #22c55e; color: white; padding: 8px 16px; border-radius: 6px; font-size: 13px;">Containers</div>
<div style="background: #f97316; color: white; padding: 8px 16px; border-radius: 6px; font-size: 13px;">Images</div>
<div style="background: #06b6d4; color: white; padding: 8px 16px; border-radius: 6px; font-size: 13px;">Volumes</div>
</div>
</div>
</div>

### Key Concepts

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<div style="background: #eff6ff; border-radius: 8px; padding: 16px;">
<div style="color: #1d4ed8; font-weight: 600; margin-bottom: 8px;">Image</div>
<div style="color: #475569; font-size: 14px;">Read-only template with instructions for creating a container. Built from Dockerfile.</div>
</div>
<div style="background: #f0fdf4; border-radius: 8px; padding: 16px;">
<div style="color: #15803d; font-weight: 600; margin-bottom: 8px;">Container</div>
<div style="color: #475569; font-size: 14px;">Running instance of an image. Isolated process with its own filesystem, networking.</div>
</div>
<div style="background: #fef3c7; border-radius: 8px; padding: 16px;">
<div style="color: #b45309; font-weight: 600; margin-bottom: 8px;">Volume</div>
<div style="color: #475569; font-size: 14px;">Persistent storage that exists outside container lifecycle. Data survives container deletion.</div>
</div>
</div>
</div>

---

## Essential Docker Commands

### Container Lifecycle

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Running Containers</h4>

  ```bash
  # Run a container (pulls image if not local)
  docker run nginx
  # What it does: Creates and starts a new container from the nginx image

  # Run in detached mode (background)
  docker run -d nginx
  # What it does: Runs container in background, returns container ID

  # Run with custom name
  docker run -d --name my-nginx nginx
  # What it does: Names the container "my-nginx" instead of random name

  # Run with port mapping
  docker run -d -p 8080:80 nginx
  # What it does: Maps host port 8080 to container port 80
  # Access via: http://localhost:8080

  # Run with multiple port mappings
  docker run -d -p 8080:80 -p 8443:443 nginx
  # What it does: Maps multiple ports

  # Run with environment variables
  docker run -d -e MYSQL_ROOT_PASSWORD=secret mysql
  # What it does: Sets environment variable inside container

  # Run with environment file
  docker run -d --env-file .env my-app
  # What it does: Loads all variables from .env file

  # Run interactively with terminal
  docker run -it ubuntu bash
  # What it does: -i = interactive, -t = pseudo-TTY, opens bash shell
  # Exit with: exit or Ctrl+D

  # Run and remove container when it exits
  docker run --rm nginx echo "hello"
  # What it does: Automatically removes container after it stops

  # Run with resource limits
  docker run -d --memory="512m" --cpus="1.0" nginx
  # What it does: Limits container to 512MB RAM and 1 CPU core

  # Run with restart policy
  docker run -d --restart=always nginx
  # What it does: Automatically restarts container if it crashes or host reboots
  # Options: no, on-failure, always, unless-stopped
  ```
</div>

### Managing Containers

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Container Management</h4>

  ```bash
  # List running containers
  docker ps
  # What it does: Shows all running containers with ID, image, status, ports

  # List all containers (including stopped)
  docker ps -a
  # What it does: Shows all containers, including stopped ones

  # List container IDs only
  docker ps -q
  # What it does: Returns only container IDs (useful for scripting)

  # Stop a container
  docker stop <container_id or name>
    # What it does: Sends SIGTERM, waits 10s, then SIGKILL

    # Stop container immediately
    docker kill <container>
      # What it does: Sends SIGKILL immediately

      # Start a stopped container
      docker start <container>
        # What it does: Starts a previously stopped container

        # Restart a container
        docker restart <container>
          # What it does: Stops and starts the container

          # Remove a stopped container
          docker rm <container>
            # What it does: Deletes the container (must be stopped first)

            # Force remove running container
            docker rm -f <container>
              # What it does: Stops and removes container in one command

              # Remove all stopped containers
              docker container prune
              # What it does: Removes all containers that are not running

              # Remove all containers (running and stopped)
              docker rm -f $(docker ps -aq)
              # What it does: Force removes all containers
              ```
</div>

### Container Inspection & Debugging

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Debugging Commands</h4>

              ```bash
              # View container logs
              docker logs <container>
                # What it does: Shows stdout/stderr from container

                # Follow logs in real-time
                docker logs -f <container>
                  # What it does: Streams new log entries as they occur

                  # Show last N lines of logs
                  docker logs --tail 100 <container>
                    # What it does: Shows only last 100 lines

                    # Show logs with timestamps
                    docker logs -t <container>
                      # What it does: Prepends timestamp to each log line

                      # Execute command in running container
                      docker exec -it <container> bash
                        # What it does: Opens interactive bash shell in container

                        # Execute single command
                        docker exec <container> ls /app
                          # What it does: Runs ls /app and exits

                          # Inspect container details
                          docker inspect <container>
                            # What it does: Returns detailed JSON with all container config

                            # Get specific info with format
                            docker inspect --format='{{.NetworkSettings.IPAddress}}' <container>
                              # What it does: Returns only the container's IP address

                              # View container resource usage
                              docker stats
                              # What it does: Live stream of container CPU, memory, network I/O

                              # View stats for specific container
                              docker stats <container>
                                # What it does: Stats for one container only

                                # View running processes in container
                                docker top <container>
                                  # What it does: Shows processes running inside container

                                  # Copy files from container to host
                                  docker cp <container>:/path/to/file ./local-path
                                    # What it does: Copies file from container to local filesystem

                                    # Copy files from host to container
                                    docker cp ./local-file <container>:/path/in/container
                                      # What it does: Copies local file into container

                                      # View container filesystem changes
                                      docker diff <container>
                                        # What it does: Shows files added/changed/deleted since container started
                                        ```
</div>

### Working with Images

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Image Commands</h4>

                                        ```bash
                                        # List local images
                                        docker images
                                        # What it does: Shows all images stored locally

                                        # List images with filter
                                        docker images --filter "dangling=true"
                                        # What it does: Shows untagged images (can be cleaned up)

                                        # Pull image from registry
                                        docker pull nginx
                                        # What it does: Downloads nginx:latest from Docker Hub

                                        # Pull specific version
                                        docker pull nginx:1.21-alpine
                                        # What it does: Downloads specific tag

                                        # Push image to registry
                                        docker push myuser/myapp:1.0
                                        # What it does: Uploads image to registry (requires login)

                                        # Tag an image
                                        docker tag nginx:latest myregistry.com/nginx:v1
                                        # What it does: Creates new tag pointing to same image

                                        # Remove an image
                                        docker rmi nginx
                                        # What it does: Deletes image from local storage

                                        # Remove unused images
                                        docker image prune
                                        # What it does: Removes dangling (untagged) images

                                        # Remove all unused images
                                        docker image prune -a
                                        # What it does: Removes all images not used by containers

                                        # View image history/layers
                                        docker history nginx
                                        # What it does: Shows layers that make up the image

                                        # Inspect image details
                                        docker image inspect nginx
                                        # What it does: Returns detailed JSON about image

                                        # Save image to tar file
                                        docker save nginx > nginx.tar
                                        # What it does: Exports image to tar archive

                                        # Load image from tar file
                                        docker load < nginx.tar
                                        # What it does: Imports image from tar archive
                                        ```
</div>

### Building Images

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Build Commands</h4>

                                        ```bash
                                        # Build image from Dockerfile in current directory
                                        docker build -t myapp:1.0 .
                                        # What it does: Builds image tagged "myapp:1.0" from ./Dockerfile

                                        # Build with different Dockerfile
                                        docker build -t myapp -f Dockerfile.prod .
                                        # What it does: Uses Dockerfile.prod instead of Dockerfile

                                        # Build with build arguments
                                        docker build --build-arg VERSION=1.0 -t myapp .
                                        # What it does: Passes build-time variable to Dockerfile ARG

                                        # Build without cache
                                        docker build --no-cache -t myapp .
                                        # What it does: Forces rebuild of all layers

                                        # Build for different platform
                                        docker build --platform linux/amd64 -t myapp .
                                        # What it does: Builds for specific architecture (useful on M1 Macs)

                                        # Build and push in one command (buildx)
                                        docker buildx build --push -t myuser/myapp:1.0 .
                                        # What it does: Builds and pushes to registry

                                        # View build cache
                                        docker builder prune
                                        # What it does: Removes build cache to free space
                                        ```
</div>

### Volumes & Storage

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Volume Commands</h4>

                                        ```bash
                                        # Create a volume
                                        docker volume create mydata
                                        # What it does: Creates named volume for persistent storage

                                        # List volumes
                                        docker volume ls
                                        # What it does: Shows all volumes

                                        # Inspect volume
                                        docker volume inspect mydata
                                        # What it does: Shows volume details including mount point

                                        # Remove volume
                                        docker volume rm mydata
                                        # What it does: Deletes volume (must not be in use)

                                        # Remove unused volumes
                                        docker volume prune
                                        # What it does: Removes all volumes not attached to containers

                                        # Run container with volume
                                        docker run -d -v mydata:/app/data nginx
                                        # What it does: Mounts named volume "mydata" at /app/data

                                        # Run with bind mount (host directory)
                                        docker run -d -v /host/path:/container/path nginx
                                        # What it does: Mounts host directory into container

                                        # Run with read-only mount
                                        docker run -d -v /host/path:/container/path:ro nginx
                                        # What it does: Mounts as read-only

                                        # Run with tmpfs mount (memory)
                                        docker run -d --tmpfs /tmp nginx
                                        # What it does: Creates temporary filesystem in memory
                                        ```
</div>

### Networking

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Network Commands</h4>

                                        ```bash
                                        # List networks
                                        docker network ls
                                        # What it does: Shows all Docker networks

                                        # Create network
                                        docker network create mynet
                                        # What it does: Creates bridge network for container communication

                                        # Create network with subnet
                                        docker network create --subnet=172.20.0.0/16 mynet
                                        # What it does: Creates network with specific IP range

                                        # Run container on specific network
                                        docker run -d --network mynet nginx
                                        # What it does: Attaches container to custom network

                                        # Connect running container to network
                                        docker network connect mynet <container>
                                          # What it does: Adds container to additional network

                                          # Disconnect from network
                                          docker network disconnect mynet <container>
                                            # What it does: Removes container from network

                                            # Inspect network
                                            docker network inspect mynet
                                            # What it does: Shows network details and connected containers

                                            # Remove network
                                            docker network rm mynet
                                            # What it does: Deletes network (must have no containers)

                                            # Remove unused networks
                                            docker network prune
                                            # What it does: Removes all unused networks
                                            ```

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin-top: 16px;">
<div style="font-weight: 600; color: #1e293b; margin-bottom: 8px;">Network Types</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;"><strong>bridge:</strong> Default. Containers can communicate via IP or container name</div>
<div style="padding: 4px 0;"><strong>host:</strong> Container shares host's network stack directly</div>
<div style="padding: 4px 0;"><strong>none:</strong> No networking</div>
<div style="padding: 4px 0;"><strong>overlay:</strong> Multi-host networking (Docker Swarm)</div>
</div>
</div>
</div>

### Docker Compose

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Compose Commands</h4>

                                            ```bash
                                            # Start services defined in docker-compose.yml
                                            docker compose up
                                            # What it does: Creates and starts all services

                                            # Start in detached mode
                                            docker compose up -d
                                            # What it does: Runs services in background

                                            # Start specific service
                                            docker compose up -d web
                                            # What it does: Starts only the "web" service

                                            # Build and start
                                            docker compose up -d --build
                                            # What it does: Rebuilds images before starting

                                            # Stop services
                                            docker compose down
                                            # What it does: Stops and removes containers, networks

                                            # Stop and remove volumes too
                                            docker compose down -v
                                            # What it does: Also removes volumes (data loss!)

                                            # View service logs
                                            docker compose logs
                                            docker compose logs -f web
                                            # What it does: Shows logs for all or specific service

                                            # List running services
                                            docker compose ps
                                            # What it does: Shows status of services

                                            # Execute command in service
                                            docker compose exec web bash
                                            # What it does: Opens shell in running service container

                                            # Run one-off command
                                            docker compose run web npm test
                                            # What it does: Runs command in new container

                                            # Scale service
                                            docker compose up -d --scale web=3
                                            # What it does: Runs 3 instances of web service

                                            # Pull latest images
                                            docker compose pull
                                            # What it does: Pulls latest versions of all images

                                            # Validate compose file
                                            docker compose config
                                            # What it does: Validates and shows resolved config
                                            ```
</div>

  ---

## Dockerfile Best Practices

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Example Dockerfile</h4>

                                            ```dockerfile
                                            # Use specific version, prefer slim/alpine images
                                            FROM node:18-alpine

                                            # Set working directory
                                            WORKDIR /app

                                            # Copy package files first (better layer caching)
                                            COPY package*.json ./

                                            # Install dependencies
                                            RUN npm ci --only=production

                                            # Copy application code
                                            COPY . .

                                            # Create non-root user for security
                                            RUN addgroup -S appgroup && adduser -S appuser -G appgroup
                                            USER appuser

                                            # Expose port (documentation)
                                            EXPOSE 3000

                                            # Health check
                                            HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
                                            CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

                                            # Start command
                                            CMD ["node", "server.js"]
                                            ```

<div style="background: #f0fdf4; border-radius: 8px; padding: 16px; margin-top: 16px;">
<div style="font-weight: 600; color: #15803d; margin-bottom: 8px;">Key Dockerfile Instructions</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;"><strong>FROM:</strong> Base image to build upon</div>
<div style="padding: 4px 0;"><strong>WORKDIR:</strong> Set working directory for subsequent commands</div>
<div style="padding: 4px 0;"><strong>COPY:</strong> Copy files from host to image</div>
<div style="padding: 4px 0;"><strong>RUN:</strong> Execute command during build (creates layer)</div>
<div style="padding: 4px 0;"><strong>ENV:</strong> Set environment variable</div>
<div style="padding: 4px 0;"><strong>ARG:</strong> Build-time variable</div>
<div style="padding: 4px 0;"><strong>EXPOSE:</strong> Document which ports the container listens on</div>
<div style="padding: 4px 0;"><strong>CMD:</strong> Default command when container starts</div>
<div style="padding: 4px 0;"><strong>ENTRYPOINT:</strong> Configure container as executable</div>
</div>
</div>
</div>

### Multi-Stage Build

<span style="background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); padding: 2px 6px; border-radius: 4px;">Multi-stage builds reduce final image size by separating build and runtime environments</span>.

                                          ```dockerfile
                                          # Build stage
                                          FROM node:18 AS builder
                                          WORKDIR /app
                                          COPY package*.json ./
                                          RUN npm ci
                                          COPY . .
                                          RUN npm run build

                                          # Production stage
                                          FROM node:18-alpine
                                          WORKDIR /app
                                          COPY --from=builder /app/dist ./dist
                                          COPY --from=builder /app/node_modules ./node_modules
                                          USER node
                                          CMD ["node", "dist/server.js"]
                                          ```

  ---

## Docker Compose Example

                                          ```yaml
                                          version: '3.8'

                                          services:
                                          web:
                                          build: .
                                          ports:
                                          - "3000:3000"
                                          environment:
                                          - NODE_ENV=production
                                          - DATABASE_URL=postgres://db:5432/myapp
                                          depends_on:
                                          - db
                                          - redis
                                          restart: unless-stopped
                                          healthcheck:
                                          test: ["CMD", "wget", "-q", "--spider", "http://localhost:3000/health"]
                                          interval: 30s
                                          timeout: 10s
                                          retries: 3

                                          db:
                                          image: postgres:15-alpine
                                          volumes:
                                          - postgres_data:/var/lib/postgresql/data
                                          environment:
                                          - POSTGRES_DB=myapp
                                          - POSTGRES_USER=user
                                          - POSTGRES_PASSWORD_FILE=/run/secrets/db_password
                                          secrets:
                                          - db_password

                                          redis:
                                          image: redis:7-alpine
                                          volumes:
                                          - redis_data:/data
                                          command: redis-server --appendonly yes

                                          volumes:
                                          postgres_data:
                                          redis_data:

                                          secrets:
                                          db_password:
                                          file: ./secrets/db_password.txt

                                          networks:
                                          default:
                                          driver: bridge
                                          ```

  ---

## System Cleanup

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Cleanup Commands</h4>

                                            ```bash
                                            # View Docker disk usage
                                            docker system df
                                            # What it does: Shows space used by images, containers, volumes

                                            # Remove all unused data
                                            docker system prune
                                            # What it does: Removes stopped containers, unused networks, dangling images

                                            # Remove everything unused (aggressive)
                                            docker system prune -a --volumes
                                            # What it does: Also removes unused images and volumes (careful!)

                                            # Clean specific resources
                                            docker container prune   # Remove stopped containers
                                            docker image prune -a    # Remove unused images
                                            docker volume prune      # Remove unused volumes
                                            docker network prune     # Remove unused networks
                                            docker builder prune     # Remove build cache
                                            ```
</div>

  ---

## Interview Deep Dive

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

### Q1: What's the difference between CMD and ENTRYPOINT?

**Answer:**

  | Aspect | CMD | ENTRYPOINT |
  |--------|-----|------------|
  | Purpose | Provides default arguments | Defines the executable |
  | Override | Replaced entirely by run args | Run args appended to it |
  | Use case | Default command, easily overridable | Container as specific tool |

                                            ```dockerfile
                                            # CMD only - easily overridden
                                            FROM ubuntu
                                            CMD ["echo", "hello"]
                                            # docker run myimage         → "hello"
                                            # docker run myimage ls      → runs "ls" instead

                                            # ENTRYPOINT + CMD combo
                                            FROM ubuntu
                                            ENTRYPOINT ["echo"]
                                            CMD ["hello"]
                                            # docker run myimage         → "hello"
                                            # docker run myimage world   → "world" (replaces CMD)

                                            # ENTRYPOINT exec form for signals
                                            ENTRYPOINT ["python", "app.py"]  # Correct - receives SIGTERM
                                            ENTRYPOINT python app.py         # Wrong - runs in shell, no signals
                                            ```

<span style="background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); padding: 2px 6px; border-radius: 4px;">Key insight: Use exec form ["cmd", "arg"] for proper signal handling and PID 1</span>.

</div>

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

### Q2: How do containers achieve isolation?

**Answer:**

  Docker uses Linux kernel features for isolation:

  1. **Namespaces** - Isolate system resources
                                            - PID: Process isolation
                                            - NET: Network isolation
                                            - MNT: Filesystem mount points
                                            - UTS: Hostname and domain
                                            - IPC: Inter-process communication
                                            - USER: User/group IDs

  2. **Cgroups** - Limit resource usage
                                            - CPU, memory, disk I/O limits
                                            - Prevent container from consuming all host resources

  3. **Union Filesystem** - Layered filesystem
                                            - Copy-on-write for efficiency
                                            - Shared base layers between containers

<span style="background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); padding: 2px 6px; border-radius: 4px;">Trade-off: Containers share kernel with host - less isolation than VMs but more efficient</span>.

</div>

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

### Q3: How do you optimize Docker image size?

**Answer:**

  1. **Use slim/alpine base images**: `node:18-alpine` vs `node:18`
  2. **Multi-stage builds**: Separate build and runtime
  3. **Order Dockerfile commands**: Put frequently changing last
  4. **Combine RUN commands**: Reduce layers
  5. **Clean up in same layer**: `RUN apt-get update && apt-get install -y pkg && rm -rf /var/lib/apt/lists/*`
  6. **Use .dockerignore**: Exclude unnecessary files
  7. **Don't install dev dependencies**: `npm ci --only=production`

                                            ```dockerfile
                                            # Bad - 1.2GB
                                            FROM node:18
                                            COPY . .
                                            RUN npm install

                                            # Good - 180MB
                                            FROM node:18-alpine AS builder
                                            WORKDIR /app
                                            COPY package*.json ./
                                            RUN npm ci
                                            COPY . .
                                            RUN npm run build

                                            FROM node:18-alpine
                                            WORKDIR /app
                                            COPY --from=builder /app/dist ./dist
                                            COPY --from=builder /app/package*.json ./
                                            RUN npm ci --only=production
                                            CMD ["node", "dist/index.js"]
                                            ```

</div>

  ---

## Quick Reference Card

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Docker Cheat Sheet</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Container Commands</div>
<div style="font-size: 13px; color: #475569; font-family: monospace;">
<div style="padding: 4px 0;">docker run -d -p 80:80 nginx</div>
<div style="padding: 4px 0;">docker ps / docker ps -a</div>
<div style="padding: 4px 0;">docker logs -f &lt;container&gt;</div>
<div style="padding: 4px 0;">docker exec -it &lt;container&gt; sh</div>
<div style="padding: 4px 0;">docker stop/start/restart</div>
<div style="padding: 4px 0;">docker rm &lt;container&gt;</div>
</div>
</div>
<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Image Commands</div>
<div style="font-size: 13px; color: #475569; font-family: monospace;">
<div style="padding: 4px 0;">docker build -t name:tag .</div>
<div style="padding: 4px 0;">docker images</div>
<div style="padding: 4px 0;">docker pull/push</div>
<div style="padding: 4px 0;">docker tag source target</div>
<div style="padding: 4px 0;">docker rmi &lt;image&gt;</div>
<div style="padding: 4px 0;">docker image prune -a</div>
</div>
</div>
<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Compose Commands</div>
<div style="font-size: 13px; color: #475569; font-family: monospace;">
<div style="padding: 4px 0;">docker compose up -d</div>
<div style="padding: 4px 0;">docker compose down</div>
<div style="padding: 4px 0;">docker compose logs -f</div>
<div style="padding: 4px 0;">docker compose ps</div>
<div style="padding: 4px 0;">docker compose exec svc sh</div>
<div style="padding: 4px 0;">docker compose build</div>
</div>
</div>
<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Cleanup Commands</div>
<div style="font-size: 13px; color: #475569; font-family: monospace;">
<div style="padding: 4px 0;">docker system df</div>
<div style="padding: 4px 0;">docker system prune -a</div>
<div style="padding: 4px 0;">docker volume prune</div>
<div style="padding: 4px 0;">docker network prune</div>
<div style="padding: 4px 0;">docker container prune</div>
<div style="padding: 4px 0;">docker builder prune</div>
</div>
</div>
</div>
</div>

  ---

## Related Topics

                                          - [[Kubernetes]](/topic/system-design/kubernetes) - Container orchestration
                                          - [[Microservices]](/topic/system-design/microservices) - Service architecture
                                          - [[CI/CD]](/topic/system-design/code-deployment) - Deployment pipelines
