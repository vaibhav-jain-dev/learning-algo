# Design a Code Deployment System

## Problem Statement

Design a CI/CD platform that enables teams to build, test, and deploy code to production with features like automated pipelines, rollback capabilities, and canary deployments.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #58a6ff;">

### Core Requirements
- **Build Automation**: Compile code, run tests, create artifacts
- **Pipeline Orchestration**: Multi-stage workflows with dependencies
- **Deployment Strategies**: Rolling, blue-green, canary deployments
- **Rollback Capability**: Quick rollback to previous versions
- **Environment Management**: Dev, staging, production environments
- **Monitoring & Alerting**: Deployment health checks

</div>

---

## Functional Requirements

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #58a6ff; margin: 0 0 12px 0;">Developer Features</h4>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Trigger builds on git push</li>
<li>Define pipeline as code</li>
<li>View build logs in real-time</li>
<li>Deploy to specific environments</li>
<li>Manual approval gates</li>
<li>Rollback deployments</li>
</ul>
</div>

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #a371f7; margin: 0 0 12px 0;">Platform Features</h4>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Parallel build execution</li>
<li>Artifact caching</li>
<li>Secret management</li>
<li>Resource isolation</li>
<li>Auto-scaling build agents</li>
<li>Audit logging</li>
</ul>
</div>

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">CI/CD PIPELINE ARCHITECTURE</h3>

```
                    ┌─────────────────────────────────────────┐
                    │              GIT REPOSITORY              │
                    │         (GitHub/GitLab/Bitbucket)       │
                    └─────────────────────┬───────────────────┘
                                          │ webhook
                                          ▼
                    ┌─────────────────────────────────────────┐
                    │            PIPELINE CONTROLLER           │
                    │                                          │
                    │  ┌─────────────┐  ┌─────────────────┐   │
                    │  │  Webhook    │  │  Pipeline       │   │
                    │  │  Handler    │  │  Orchestrator   │   │
                    │  └─────────────┘  └─────────────────┘   │
                    │                                          │
                    │  ┌─────────────┐  ┌─────────────────┐   │
                    │  │  Scheduler  │  │  Queue Manager  │   │
                    │  └─────────────┘  └─────────────────┘   │
                    └─────────────────────┬───────────────────┘
                                          │
                        ┌─────────────────┼─────────────────┐
                        ▼                 ▼                 ▼
                ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
                │   BUILD     │   │   BUILD     │   │   BUILD     │
                │   AGENT 1   │   │   AGENT 2   │   │   AGENT N   │
                │             │   │             │   │             │
                │ ┌─────────┐ │   │ ┌─────────┐ │   │ ┌─────────┐ │
                │ │Container│ │   │ │Container│ │   │ │Container│ │
                │ │ Runtime │ │   │ │ Runtime │ │   │ │ Runtime │ │
                │ └─────────┘ │   │ └─────────┘ │   │ └─────────┘ │
                └──────┬──────┘   └──────┬──────┘   └──────┬──────┘
                       │                 │                 │
                       └─────────────────┼─────────────────┘
                                         │
    ┌────────────────────────────────────┼────────────────────────────────────┐
    │                                    │                                    │
    ▼                                    ▼                                    ▼
┌─────────────┐                  ┌─────────────────┐                  ┌─────────────┐
│  ARTIFACT   │                  │    SECRETS      │                  │    CACHE    │
│  STORAGE    │                  │    MANAGER      │                  │   STORAGE   │
│   (S3)      │                  │   (Vault)       │                  │   (S3)      │
└─────────────┘                  └─────────────────┘                  └─────────────┘
                                         │
                                         ▼
                    ┌─────────────────────────────────────────┐
                    │          DEPLOYMENT CONTROLLER           │
                    │                                          │
                    │  ┌─────────────┐  ┌─────────────────┐   │
                    │  │  Strategy   │  │  Health Check   │   │
                    │  │  Engine     │  │  Monitor        │   │
                    │  └─────────────┘  └─────────────────┘   │
                    └─────────────────────┬───────────────────┘
                                          │
                        ┌─────────────────┼─────────────────┐
                        ▼                 ▼                 ▼
                ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
                │    DEV      │   │   STAGING   │   │ PRODUCTION  │
                │   CLUSTER   │   │   CLUSTER   │   │   CLUSTER   │
                └─────────────┘   └─────────────┘   └─────────────┘
```

</div>

---

## Phase 1: Starting Phase (Low Budget)

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 5-20 developers, 1-5 applications
- **Builds**: 50-200 builds/day
- **Budget**: $100 - $500/month
- **Team**: 1-2 DevOps engineers

### Monolithic Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```
┌─────────────────────────────────────────────────────────────────┐
│                     CI/CD MONOLITH                               │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                      API LAYER                              │ │
│  │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │ │
│  │   │ Webhooks │  │ REST API │  │ WebSocket│  │   CLI    │  │ │
│  │   └──────────┘  └──────────┘  └──────────┘  └──────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   PIPELINE ENGINE                           │ │
│  │                                                             │ │
│  │  ┌───────────────┐  ┌───────────────┐  ┌────────────────┐ │ │
│  │  │ YAML Parser   │  │ DAG Builder   │  │ Step Executor  │ │ │
│  │  └───────────────┘  └───────────────┘  └────────────────┘ │ │
│  │                                                             │ │
│  │  ┌───────────────┐  ┌───────────────┐  ┌────────────────┐ │ │
│  │  │ Job Queue     │  │ Log Streamer  │  │ Artifact Mgr   │ │ │
│  │  └───────────────┘  └───────────────┘  └────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   BUILD EXECUTOR                            │ │
│  │   ┌──────────────────────────────────────────────────────┐ │ │
│  │   │           Docker-in-Docker / Podman                   │ │ │
│  │   │   ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐    │ │ │
│  │   │   │ Build  │  │ Build  │  │ Build  │  │ Build  │    │ │ │
│  │   │   │ Job 1  │  │ Job 2  │  │ Job 3  │  │ Job 4  │    │ │ │
│  │   │   └────────┘  └────────┘  └────────┘  └────────┘    │ │ │
│  │   └──────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
    ┌─────────┐          ┌─────────┐          ┌─────────┐
    │PostgreSQL│          │  Redis  │          │   S3    │
    │(Metadata)│          │ (Queue) │          │(Artifacts)│
    └─────────┘          └─────────┘          └─────────┘
```

</div>

#### Tech Stack
- **Backend**: Go/Python (single service)
- **Database**: PostgreSQL (pipelines, builds, logs)
- **Queue**: Redis (job queue)
- **Storage**: S3/MinIO (artifacts, caches)
- **Container Runtime**: Docker-in-Docker
- **Hosting**: Single EC2/VM with Docker

#### Pipeline Definition (YAML)

```yaml
# .pipeline.yml
name: Build and Deploy
trigger:
  branches: [main, develop]

stages:
  - name: build
    steps:
      - name: checkout
        uses: git-checkout

      - name: install
        run: npm install

      - name: test
        run: npm test

      - name: build
        run: npm run build

      - name: docker-build
        run: docker build -t myapp:$BUILD_ID .

  - name: deploy
    needs: [build]
    environment: production
    steps:
      - name: deploy
        run: kubectl apply -f k8s/
```

#### Abstract Code Structure

```python
# Monolithic CI/CD Engine
class PipelineEngine:
    def __init__(self, db, queue, storage):
        self.db = db
        self.queue = queue
        self.storage = storage

    def on_webhook(self, payload):
        # Parse webhook from GitHub/GitLab
        repo = payload['repository']
        branch = payload['ref'].split('/')[-1]
        commit = payload['head_commit']['id']

        # Load pipeline config
        config = self.load_pipeline_config(repo, commit)

        # Create pipeline run
        pipeline_run = PipelineRun.create(
            repo=repo, branch=branch, commit=commit,
            config=config, status='pending'
        )

        # Build execution DAG
        dag = self.build_dag(config)

        # Queue initial jobs
        for job in dag.get_ready_jobs():
            self.queue.push('builds', {
                'pipeline_id': pipeline_run.id,
                'job': job.to_dict()
            })

        return pipeline_run

    def execute_job(self, job_data):
        job = Job.from_dict(job_data)

        # Create isolated container
        container = docker.create(
            image=job.image,
            env=self.get_secrets(job),
            volumes={
                self.workspace: '/workspace',
                self.cache: '/cache'
            }
        )

        try:
            for step in job.steps:
                result = container.exec(step.command)
                self.stream_logs(job.id, result.output)

                if result.exit_code != 0:
                    raise StepFailedError(step, result)

            self.on_job_success(job)
        except Exception as e:
            self.on_job_failure(job, e)
        finally:
            container.remove()

class DeploymentController:
    def deploy(self, environment, artifact):
        # Simple kubectl apply
        kubeconfig = self.get_kubeconfig(environment)
        subprocess.run([
            'kubectl', '--kubeconfig', kubeconfig,
            'apply', '-f', artifact.manifest_path
        ])
```

</div>
</div>

---

## Phase 2: Medium User Phase

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 100-500 developers, 50-200 applications
- **Builds**: 2,000-10,000 builds/day
- **Budget**: $5,000 - $30,000/month
- **Team**: 5-10 platform engineers

### Microservices Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                              ┌────────────────────┐
                              │    API Gateway     │
                              └─────────┬──────────┘
                                        │
            ┌───────────────────────────┼───────────────────────────┐
            │                           │                           │
            ▼                           ▼                           ▼
    ┌───────────────┐          ┌───────────────┐          ┌───────────────┐
    │   PIPELINE    │          │   WEBHOOK     │          │     UI        │
    │   SERVICE     │          │   SERVICE     │          │   SERVICE     │
    │               │          │               │          │               │
    │ - CRUD        │◀─────────│ - Parse       │          │ - Dashboard   │
    │ - Trigger     │          │ - Validate    │          │ - Logs View   │
    │ - Status      │          │ - Route       │          │ - Settings    │
    └───────┬───────┘          └───────────────┘          └───────────────┘
            │
            ▼
    ┌───────────────┐          ┌───────────────┐
    │  SCHEDULER    │─────────▶│   MESSAGE     │
    │   SERVICE     │          │    QUEUE      │
    │               │          │   (RabbitMQ)  │
    │ - DAG Exec    │          │               │
    │ - Dependencies│          │ - Job Queue   │
    │ - Priorities  │          │ - Events      │
    └───────────────┘          └───────┬───────┘
                                       │
                   ┌───────────────────┼───────────────────┐
                   ▼                   ▼                   ▼
           ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
           │   BUILD     │     │   BUILD     │     │   BUILD     │
           │  WORKER 1   │     │  WORKER 2   │     │  WORKER N   │
           │             │     │             │     │             │
           │ - Executor  │     │ - Executor  │     │ - Executor  │
           │ - Isolation │     │ - Isolation │     │ - Isolation │
           └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
                  │                   │                   │
                  └───────────────────┼───────────────────┘
                                      │
                              ┌───────▼───────┐
                              │  DEPLOYMENT   │
                              │   SERVICE     │
                              │               │
                              │ - Rolling     │
                              │ - Blue-Green  │
                              │ - Canary      │
                              └───────────────┘
```

</div>

### Deployment Strategies

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">
<h4 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">DEPLOYMENT STRATEGIES VISUALIZATION</h4>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">

<!-- Rolling -->
<div style="background: rgba(35, 134, 54, 0.1); border: 1px solid #238636; border-radius: 12px; padding: 16px;">
<h5 style="color: #7ee787; margin: 0 0 12px 0; text-align: center;">Rolling Update</h5>

```
Time →
┌──────────────────────┐
│ v1 │ v1 │ v1 │ v1   │ Start
├──────────────────────┤
│ v2 │ v1 │ v1 │ v1   │ 25%
├──────────────────────┤
│ v2 │ v2 │ v1 │ v1   │ 50%
├──────────────────────┤
│ v2 │ v2 │ v2 │ v1   │ 75%
├──────────────────────┤
│ v2 │ v2 │ v2 │ v2   │ Done
└──────────────────────┘
```

<p style="color: #8b949e; font-size: 12px; text-align: center;">Gradual replacement</p>
</div>

<!-- Blue-Green -->
<div style="background: rgba(31, 111, 235, 0.1); border: 1px solid #1f6feb; border-radius: 12px; padding: 16px;">
<h5 style="color: #58a6ff; margin: 0 0 12px 0; text-align: center;">Blue-Green</h5>

```
     Load Balancer
          │
    ┌─────┴─────┐
    ▼           ▼
┌───────┐  ┌───────┐
│ BLUE  │  │ GREEN │
│  v1   │  │  v2   │
│(live) │  │(idle) │
└───────┘  └───────┘
          ↓
    Switch traffic
          ↓
┌───────┐  ┌───────┐
│ BLUE  │  │ GREEN │
│  v1   │  │  v2   │
│(idle) │  │(live) │
└───────┘  └───────┘
```

<p style="color: #8b949e; font-size: 12px; text-align: center;">Instant switch</p>
</div>

<!-- Canary -->
<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #8957e5; border-radius: 12px; padding: 16px;">
<h5 style="color: #a371f7; margin: 0 0 12px 0; text-align: center;">Canary</h5>

```
Traffic Split:
┌──────────────────────┐
│ 95% → v1 (stable)    │
│  5% → v2 (canary)    │
└──────────────────────┘
     Monitor metrics
          ↓
┌──────────────────────┐
│ 50% → v1             │
│ 50% → v2             │
└──────────────────────┘
     If healthy...
          ↓
┌──────────────────────┐
│ 100% → v2            │
└──────────────────────┘
```

<p style="color: #8b949e; font-size: 12px; text-align: center;">Gradual traffic shift</p>
</div>

</div>
</div>

### Build Agent Auto-Scaling

```python
# Kubernetes-based auto-scaling
class BuildAgentScaler:
    def __init__(self, k8s_client, metrics_client):
        self.k8s = k8s_client
        self.metrics = metrics_client

    def scale(self):
        # Get queue depth
        pending_jobs = self.get_pending_jobs()
        active_agents = self.get_active_agents()

        # Calculate desired replicas
        jobs_per_agent = 2
        desired = min(
            max(1, pending_jobs // jobs_per_agent),
            self.max_agents
        )

        if desired != active_agents:
            self.k8s.scale_deployment(
                'build-agents',
                replicas=desired
            )

    def provision_agent(self):
        # Create ephemeral build agent pod
        return self.k8s.create_pod({
            'name': f'build-agent-{uuid4()}',
            'image': 'build-agent:latest',
            'resources': {
                'requests': {'cpu': '2', 'memory': '4Gi'},
                'limits': {'cpu': '4', 'memory': '8Gi'}
            },
            'volumes': [
                {'name': 'docker-socket', 'hostPath': '/var/run/docker.sock'},
                {'name': 'cache', 'persistentVolumeClaim': 'build-cache'}
            ]
        })
```

</div>
</div>

---

## Phase 3: High User Base Phase

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 5,000+ developers, 1,000+ applications
- **Builds**: 100,000+ builds/day
- **Budget**: $200,000+/month
- **Team**: 30+ platform engineers

### Enterprise Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                         ENTERPRISE CI/CD PLATFORM
    ┌────────────────────────────────────────────────────────────────┐
    │                                                                │
    │   ┌──────────────────────────────────────────────────────────┐│
    │   │                    CONTROL PLANE                         ││
    │   │                                                          ││
    │   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  ││
    │   │  │  Pipeline   │  │  Identity   │  │   Policy        │  ││
    │   │  │  Controller │  │  Service    │  │   Engine        │  ││
    │   │  └─────────────┘  └─────────────┘  └─────────────────┘  ││
    │   │                                                          ││
    │   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  ││
    │   │  │  Scheduler  │  │  Quota      │  │   Audit         │  ││
    │   │  │  (Global)   │  │  Manager    │  │   Logger        │  ││
    │   │  └─────────────┘  └─────────────┘  └─────────────────┘  ││
    │   └──────────────────────────────────────────────────────────┘│
    │                              │                                │
    │   ┌──────────────────────────┼───────────────────────────────┐│
    │   │                          │                               ││
    │   │     ┌────────────────────┼────────────────────┐          ││
    │   │     ▼                    ▼                    ▼          ││
    │   │ ┌─────────┐        ┌─────────┐        ┌─────────┐       ││
    │   │ │ REGION  │        │ REGION  │        │ REGION  │       ││
    │   │ │ US-EAST │        │ EU-WEST │        │ AP-SOUTH│       ││
    │   │ │         │        │         │        │         │       ││
    │   │ │┌───────┐│        │┌───────┐│        │┌───────┐│       ││
    │   │ ││ Build ││        ││ Build ││        ││ Build ││       ││
    │   │ ││ Pool  ││        ││ Pool  ││        ││ Pool  ││       ││
    │   │ │└───────┘│        │└───────┘│        │└───────┘│       ││
    │   │ │         │        │         │        │         │       ││
    │   │ │┌───────┐│        │┌───────┐│        │┌───────┐│       ││
    │   │ ││Deploy ││        ││Deploy ││        ││Deploy ││       ││
    │   │ ││Targets││        ││Targets││        ││Targets││       ││
    │   │ │└───────┘│        │└───────┘│        │└───────┘│       ││
    │   │ └─────────┘        └─────────┘        └─────────┘       ││
    │   │                                                          ││
    │   │                    DATA PLANE                            ││
    │   └──────────────────────────────────────────────────────────┘│
    │                                                                │
    │   ┌──────────────────────────────────────────────────────────┐│
    │   │                    DATA LAYER                            ││
    │   │                                                          ││
    │   │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ ││
    │   │  │ Aurora   │  │  Kafka   │  │   S3     │  │  Vault   │ ││
    │   │  │ Global   │  │ Cluster  │  │ (Global) │  │ (Secrets)│ ││
    │   │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ ││
    │   └──────────────────────────────────────────────────────────┘│
    └────────────────────────────────────────────────────────────────┘
```

</div>

### Pipeline Execution DAG

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">
<h4 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">COMPLEX PIPELINE DAG</h4>

```
                              ┌──────────┐
                              │  START   │
                              └────┬─────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
              ┌──────────┐  ┌──────────┐  ┌──────────┐
              │  Lint    │  │  Unit    │  │ Security │
              │  Check   │  │  Tests   │  │   Scan   │
              └────┬─────┘  └────┬─────┘  └────┬─────┘
                   │             │             │
                   └──────────┬──┴─────────────┘
                              │
                         (all pass)
                              │
                    ┌─────────▼─────────┐
                    │   Build Artifacts │
                    │   (Docker Image)  │
                    └─────────┬─────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        ┌──────────┐    ┌──────────┐    ┌──────────┐
        │Integration│    │  E2E     │    │ Perf     │
        │  Tests   │    │  Tests   │    │ Tests    │
        └────┬─────┘    └────┬─────┘    └────┬─────┘
             │               │               │
             └───────────────┼───────────────┘
                             │
                        (all pass)
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │ Deploy   │   │ Deploy   │   │ Deploy   │
        │ Dev      │   │ Staging  │   │ Prod     │
        └──────────┘   └────┬─────┘   │(approval)│
                            │         └────┬─────┘
                            │              │
                       ┌────▼────┐    ┌────▼────┐
                       │Smoke    │    │ Canary  │
                       │Tests    │    │ Deploy  │
                       └─────────┘    └────┬────┘
                                           │
                                      ┌────▼────┐
                                      │ Full    │
                                      │ Rollout │
                                      └─────────┘
```

</div>

### Progressive Delivery Controller

```go
// Canary deployment controller
type CanaryController struct {
    k8s      kubernetes.Client
    metrics  prometheus.Client
    config   CanaryConfig
}

func (c *CanaryController) Deploy(ctx context.Context, release Release) error {
    stages := []struct {
        weight   int
        duration time.Duration
    }{
        {5, 5 * time.Minute},    // 5% for 5 min
        {25, 10 * time.Minute},  // 25% for 10 min
        {50, 15 * time.Minute},  // 50% for 15 min
        {100, 0},                // Full rollout
    }

    for _, stage := range stages {
        // Update traffic weight
        if err := c.updateTrafficSplit(release, stage.weight); err != nil {
            return c.rollback(release, err)
        }

        // Wait and monitor
        if stage.duration > 0 {
            healthy, err := c.monitorHealth(ctx, release, stage.duration)
            if err != nil || !healthy {
                return c.rollback(release, fmt.Errorf("unhealthy canary"))
            }
        }
    }

    // Cleanup old version
    return c.finalizeDeployment(release)
}

func (c *CanaryController) monitorHealth(ctx context.Context, release Release, duration time.Duration) (bool, error) {
    ticker := time.NewTicker(30 * time.Second)
    deadline := time.After(duration)

    for {
        select {
        case <-ticker.C:
            metrics := c.metrics.Query(fmt.Sprintf(
                `rate(http_requests_total{version="%s",status=~"5.."}[1m]) /
                 rate(http_requests_total{version="%s"}[1m])`,
                release.Version, release.Version,
            ))

            // Check error rate threshold
            if metrics.Value > c.config.ErrorRateThreshold {
                return false, nil
            }

            // Check latency threshold
            p99 := c.metrics.Query(fmt.Sprintf(
                `histogram_quantile(0.99, rate(http_request_duration_seconds_bucket{version="%s"}[1m]))`,
                release.Version,
            ))
            if p99.Value > c.config.LatencyThreshold {
                return false, nil
            }

        case <-deadline:
            return true, nil

        case <-ctx.Done():
            return false, ctx.Err()
        }
    }
}
```

</div>
</div>

---

## AWS Technologies & Alternatives

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

| Component | AWS Service | Alternative | Trade-offs |
|-----------|-------------|-------------|------------|
| **Build Execution** | CodeBuild | GitHub Actions, Jenkins | CodeBuild: Pay-per-build, Jenkins: Self-managed |
| **Pipeline** | CodePipeline | GitLab CI, CircleCI | CodePipeline: AWS-native, Others: Better UX |
| **Container Registry** | ECR | Docker Hub, Harbor | ECR: AWS integration, Harbor: On-prem |
| **Secrets** | Secrets Manager | HashiCorp Vault | SM: Simpler, Vault: More features |
| **Artifact Storage** | S3 | Artifactory, Nexus | S3: Cheaper, Others: Better metadata |
| **Kubernetes** | EKS | GKE, Self-managed | EKS: AWS integration, GKE: Better K8s |
| **Deployment** | CodeDeploy | Argo CD, Spinnaker | CodeDeploy: Simple, Argo: GitOps native |

### Why Argo CD for GitOps?

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 16px 0;">

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 16px;">
<h5 style="color: #7ee787; margin: 0 0 8px 0;">Advantages</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Git as single source of truth</li>
<li>Automatic sync detection</li>
<li>Declarative configuration</li>
<li>Built-in rollback</li>
<li>Multi-cluster support</li>
</ul>
</div>

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 16px;">
<h5 style="color: #f85149; margin: 0 0 8px 0;">Disadvantages</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Learning curve for GitOps</li>
<li>Requires Git repo for manifests</li>
<li>Complex for stateful apps</li>
<li>Secret management challenges</li>
</ul>
</div>

</div>

</div>

---

## Distributed Systems Considerations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### 1. Build Isolation

```
Security Boundary per Build:

┌─────────────────────────────────────────────────────┐
│                   HOST MACHINE                       │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │              BUILD CONTAINER                  │   │
│  │                                               │   │
│  │  - Ephemeral (destroyed after build)         │   │
│  │  - No network access to other builds         │   │
│  │  - Resource limits (CPU, memory)             │   │
│  │  - Read-only root filesystem                 │   │
│  │  - No privileged mode                        │   │
│  │                                               │   │
│  │  ┌─────────────────────────────────────────┐ │   │
│  │  │        NESTED CONTAINER (DinD)          │ │   │
│  │  │                                         │ │   │
│  │  │  - Separate Docker daemon               │ │   │
│  │  │  - Isolated image cache                 │ │   │
│  │  └─────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### 2. Idempotent Deployments

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 20px; margin: 16px 0;">

```yaml
# Deployment with idempotency key
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    deployment-id: "build-12345"  # Idempotency key
spec:
  replicas: 3
  template:
    metadata:
      labels:
        version: "v1.2.3"
        commit: "abc123"
    spec:
      containers:
      - name: app
        image: myapp:build-12345  # Immutable tag
```

</div>

### 3. Distributed Locking for Deployments

```python
# Prevent concurrent deployments to same environment
class DeploymentLock:
    def __init__(self, redis):
        self.redis = redis

    def acquire(self, environment, deployment_id, ttl=300):
        key = f"deploy_lock:{environment}"
        result = self.redis.set(
            key, deployment_id,
            nx=True,  # Only if not exists
            ex=ttl    # Expire after TTL
        )
        return result is not None

    def release(self, environment, deployment_id):
        key = f"deploy_lock:{environment}"
        # Only release if we own the lock
        script = """
        if redis.call("get", KEYS[1]) == ARGV[1] then
            return redis.call("del", KEYS[1])
        else
            return 0
        end
        """
        return self.redis.eval(script, 1, key, deployment_id)
```

### 4. Rollback Strategy

```
Rollback Decision Tree:

        ┌─────────────────────┐
        │ Deployment Started  │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Health Check Pass?  │
        └──────────┬──────────┘
               Y/  \N
              /    \
             ▼      ▼
     ┌──────────┐  ┌──────────────┐
     │ Continue │  │ Auto Rollback │
     └────┬─────┘  └──────────────┘
          │
          ▼
     ┌─────────────────────┐
     │ Error Rate < 1%?    │
     └──────────┬──────────┘
            Y/  \N
           /    \
          ▼      ▼
   ┌──────────┐  ┌──────────────┐
   │ Complete │  │ Auto Rollback │
   └──────────┘  └──────────────┘

Rollback = kubectl rollout undo deployment/myapp
```

</div>

---

## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f0883e;">

### 1. "Why Kubernetes over just Docker Compose for deployments?"

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 20px; margin: 16px 0;">

**What they're probing**: Do you understand operational complexity vs. actual need? Can you match tooling to team size and requirements?

**Strong Answer**:
> "Docker Compose is actually perfect for many scenarios - a 5-person team running 3 services on 2 servers doesn't need Kubernetes. You'd use K8s when you need: auto-scaling based on load, multi-region deployments, self-healing across many nodes, or when you have 15+ microservices. The operational overhead of K8s (etcd clusters, control plane management, networking complexity) only pays off at scale. For a startup doing 100 builds/day, Docker Compose with a simple load balancer is faster to set up and debug."

**When Simpler Works**:
- Under 10 services: Docker Compose + systemd
- Single region: Docker Swarm is simpler than K8s
- 1-5 developers: Just deploy to Heroku or Railway

</div>

### 2. "When is blue-green deployment overkill?"

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px; margin: 16px 0;">

**What they're probing**: Can you evaluate trade-offs between deployment safety and resource cost?

**Strong Answer**:
> "Blue-green doubles your infrastructure cost during deployments and requires instant traffic switching capability. It's overkill when: you deploy less than once a day, your service handles gradual rollouts well, or you can't afford 2x infrastructure. Rolling deployments with good health checks cover 80% of use cases. Blue-green shines for: stateless services needing instant rollback, critical payment flows, or when you need to test the exact production environment before switching. For most teams, Kubernetes rolling deployments with `maxUnavailable: 0` gives you safe deployments without the cost."

**When Rolling is Enough**:
- Stateless web services with good health probes
- Internal tools with tolerant users
- Services where 30-second rollback is acceptable

</div>

### 3. "Why not just use Jenkins? Everyone knows it."

<div style="background: rgba(163, 113, 247, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 20px; margin: 16px 0;">

**What they're probing**: Are you choosing tools based on hype or real technical merit? Do you understand maintenance burden?

**Strong Answer**:
> "Jenkins is actually a great choice for teams that have Jenkins expertise and need maximum customization. The issues are: plugin compatibility hell (I've spent days debugging plugin conflicts), security patching burden (you own it all), and the Groovy DSL learning curve. GitHub Actions or GitLab CI give you: zero infrastructure to manage, native git integration, and pre-built marketplace actions. But Jenkins wins when you need: air-gapped environments, custom hardware (like Mac build machines for iOS), or complex approval workflows your compliance team requires. For a team of 20 doing standard web apps, I'd pick GitHub Actions. For a 200-person enterprise with 10 years of Jenkins pipelines, migrating would cost more than maintaining."

**When Jenkins Makes Sense**:
- Air-gapped/on-premise requirements
- Complex multi-stage approvals
- Existing Jenkins expertise on team
- Need for specific hardware build agents

</div>

### 4. "How would you handle a deployment that breaks production but passes all tests?"

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px; margin: 16px 0;">

**What they're probing**: Do you understand the gap between test environments and production? What's your incident response?

**Strong Answer**:
> "First, immediate rollback - this should take under 60 seconds with `kubectl rollout undo` or switching blue-green environments. Then: investigate why tests passed. Common causes: production-only data patterns, third-party API differences, load-related race conditions, or feature flag states. I'd add: canary deployments to catch issues with real traffic before full rollout, synthetic monitoring that runs against production, and chaos engineering tests. Long-term fix: improve staging data to mirror production patterns, add production smoke tests that run immediately post-deploy, and implement feature flags so code changes can be toggled off without redeployment."

**Key Response Steps**:
1. Rollback immediately (don't debug while on fire)
2. Identify the failure mode
3. Add specific test/monitoring to prevent recurrence
4. Post-mortem to improve the process

</div>

### 5. "Your CI pipeline takes 45 minutes. The team is frustrated. What do you do?"

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 20px; margin: 16px 0;">

**What they're probing**: Can you systematically diagnose and optimize? Do you understand the build speed vs. safety trade-off?

**Strong Answer**:
> "First, measure - where's the time going? Usually it's: dependency installation (add caching), test suite (parallelize), or Docker builds (multi-stage + layer caching). Quick wins: aggressive caching for npm/pip/gradle, parallel test execution across containers, only run relevant tests on file changes. Harder fixes: split the monolith test suite, use test impact analysis to run affected tests only, or move slow integration tests to a separate pipeline that runs post-merge. A realistic target is 10 minutes for PR builds. But be careful - I've seen teams skip tests to go faster and then spend 2 days debugging production issues. The real goal is fast feedback, not just fast builds. Sometimes that means better local testing tools so developers don't wait for CI."

**Optimization Priority**:
1. Add dependency caching (saves 5-10 min typically)
2. Parallelize tests (cut time by 50-70%)
3. Use incremental/affected-only testing
4. Move slow tests to post-merge pipeline

</div>

</div>

---

## Why This Technology?

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### CI/CD Technology Decision Matrix

<div style="overflow-x: auto; margin: 20px 0;">

| Scenario | Recommendation | Why Not Alternatives |
|----------|----------------|---------------------|
| **5-person startup, 3 services** | GitHub Actions + Heroku/Railway | Jenkins: overkill maintenance. K8s: unnecessary complexity |
| **20-person team, 15 services** | GitHub Actions + ECS or GKE Autopilot | Self-managed K8s: too much ops burden. Heroku: gets expensive |
| **50+ devs, microservices** | GitLab CI + Argo CD + EKS | GitHub Actions: limited self-hosted options. Jenkins: scaling pain |
| **Enterprise, compliance needs** | Jenkins/GitLab + Spinnaker | SaaS options: data residency concerns. Argo: less audit features |
| **ML/Data pipelines** | GitHub Actions + Argo Workflows | Standard CI: not designed for DAG workflows and long-running jobs |

</div>

### Deep Dive: Why These Choices?

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #58a6ff; margin: 0 0 12px 0;">GitHub Actions Wins When...</h4>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Your code is already on GitHub</li>
<li>You want zero infrastructure to manage</li>
<li>Team is < 50 developers</li>
<li>Standard language ecosystems (JS, Python, Go, Java)</li>
<li>You can tolerate occasional runner delays</li>
</ul>
<p style="color: #7ee787; font-size: 12px; margin-top: 12px;"><strong>Cost reality</strong>: Free tier covers most startups. $20-100/month for active teams.</p>
</div>

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #a371f7; margin: 0 0 12px 0;">Argo CD Wins When...</h4>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li>You have 20+ services to deploy</li>
<li>Multiple Kubernetes clusters</li>
<li>Team has K8s expertise already</li>
<li>You want GitOps (git as truth)</li>
<li>Need audit trail for deployments</li>
</ul>
<p style="color: #f0883e; font-size: 12px; margin-top: 12px;"><strong>Honest take</strong>: Don't use Argo CD until you have 20+ services or multi-cluster needs.</p>
</div>

<div style="background: linear-gradient(135deg, #3d2e1f 0%, #5d4a3a 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #f0883e; margin: 0 0 12px 0;">Jenkins Still Makes Sense When...</h4>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Air-gapped or strict compliance environment</li>
<li>Need Mac/Windows/custom hardware builds</li>
<li>Have 5+ years of existing pipelines</li>
<li>Team has deep Jenkins expertise</li>
<li>Complex manual approval workflows</li>
</ul>
<p style="color: #8b949e; font-size: 12px; margin-top: 12px;"><strong>Hidden cost</strong>: 0.5-1 FTE just for Jenkins maintenance at scale.</p>
</div>

<div style="background: linear-gradient(135deg, #1f3d2d 0%, #3a5d4a 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #7ee787; margin: 0 0 12px 0;">ECS/Fargate Over K8s When...</h4>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Team lacks K8s expertise</li>
<li>You're AWS-only (no multi-cloud)</li>
<li>5-30 services (K8s overhead not worth it)</li>
<li>Want simpler networking model</li>
<li>Don't need K8s ecosystem tools</li>
</ul>
<p style="color: #58a6ff; font-size: 12px; margin-top: 12px;"><strong>Real talk</strong>: ECS is "boring" but boring is good for startups.</p>
</div>

</div>

</div>

---

## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### You Don't Need Kubernetes If...

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px; margin: 16px 0;">

```
K8s Necessity Checklist (need 3+ to justify K8s):

[ ] 15+ microservices
[ ] Auto-scaling based on traffic (not just scheduled)
[ ] Multi-region deployment requirements
[ ] Team has dedicated platform/SRE engineers
[ ] Need service mesh features (mTLS, traffic splitting)
[ ] Compliance requires specific infrastructure controls

If you checked < 3, consider:
├── Docker Compose + systemd (< 5 services)
├── ECS/Fargate (5-15 services, AWS shop)
├── Cloud Run/App Engine (stateless services)
├── Heroku/Railway/Render (just ship it)
└── Fly.io (need edge deployment, simple model)
```

</div>

### GitHub Actions Alone is Enough When...

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px; margin: 16px 0;">

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">

<div>
<h5 style="color: #58a6ff; margin: 0 0 8px 0;">Perfectly Fine Scenarios</h5>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Deploying to Vercel/Netlify/Heroku</li>
<li>Pushing Docker images to registry</li>
<li>Running Terraform for infrastructure</li>
<li>Simple kubectl apply deployments</li>
<li>Lambda/Cloud Functions deployment</li>
<li>Static site builds</li>
</ul>
</div>

<div>
<h5 style="color: #f0883e; margin: 0 0 8px 0;">When You Need More</h5>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Complex deployment orchestration</li>
<li>Multi-cluster K8s rollouts</li>
<li>Canary with automatic rollback</li>
<li>Deployment approval workflows</li>
<li>GitOps with drift detection</li>
<li>Blue-green with traffic management</li>
</ul>
</div>

</div>

</div>

### The "$100/month CI/CD Stack" (Real Example)

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```
Company: 5-person SaaS startup, 3 services, 50 deployments/month

Stack (Total: ~$85/month):
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  GitHub (Free tier)                              $0/month   │
│    └── Actions: 2000 mins/month free                       │
│                                                             │
│  Railway (Hobby → Team)                         $20/month   │
│    └── API service + background worker                     │
│                                                             │
│  Vercel (Pro)                                   $20/month   │
│    └── Next.js frontend                                    │
│                                                             │
│  PlanetScale (Scaler)                           $29/month   │
│    └── MySQL with branching for DB migrations              │
│                                                             │
│  Upstash Redis (Free → Pay as you go)           $10/month   │
│    └── Caching + job queues                                │
│                                                             │
│  Sentry (Team)                                   $0/month   │
│    └── Error tracking (free tier)                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

CI/CD Flow:
  Push to main → GitHub Actions runs tests (3 mins)
               → Vercel auto-deploys frontend
               → Railway auto-deploys backend
               → PlanetScale promotes DB branch

What you DON'T need:
  ✗ Kubernetes            ✗ Argo CD
  ✗ Self-hosted Jenkins   ✗ Terraform (yet)
  ✗ Docker registry       ✗ Secrets manager (use env vars)
```

</div>

### Simpler Alternatives Comparison

<div style="overflow-x: auto; margin: 16px 0;">

| Complex Tool | Simpler Alternative | When Simpler Works |
|--------------|--------------------|--------------------|
| **Kubernetes** | Docker Compose + systemd | < 10 services, single region |
| **Argo CD** | GitHub Actions kubectl | < 15 services, single cluster |
| **Spinnaker** | GitHub Actions + Helm | Not Netflix-scale |
| **HashiCorp Vault** | AWS Secrets Manager / 1Password | < 100 secrets, single cloud |
| **Terraform** | Pulumi / CDK / Click-ops | < 20 resources, fast iteration |
| **Jenkins** | GitHub Actions | Standard builds, no special hardware |
| **Prometheus + Grafana** | Datadog / New Relic | Team < 20, SaaS budget available |

</div>

</div>
</div>

---

## Trade-off Analysis & Mitigation

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Deployment Strategy Trade-offs

<div style="overflow-x: auto; margin: 20px 0;">

| Strategy | Pros | Cons | Mitigation |
|----------|------|------|------------|
| **Rolling** | Low resource cost, simple | Brief mixed versions, slower rollback | Use readiness probes, keep N-1 compatible |
| **Blue-Green** | Instant rollback, clean testing | 2x resources, database complexity | Use for stateless only, schedule off-peak |
| **Canary** | Real traffic validation, safe | Complex traffic splitting, slow | Automate metrics-based promotion |
| **Recreate** | Simple, clean slate | Downtime | Only for dev/internal tools |

</div>

### Build Speed vs. Safety Trade-offs

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0;">

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px;">
<h4 style="color: #7ee787; margin: 0 0 12px 0;">Going Faster</h4>

```
Optimization                Risk           Mitigation
─────────────────────────────────────────────────────
Skip tests on docs-only  → Low          → Path filters
Parallel test execution  → Flaky tests  → Retry logic
Cache aggressively       → Stale deps   → Weekly clean build
Run subset of tests      → Miss bugs    → Full suite on main
Skip E2E on feature PR   → Integration  → Required on main
```

</div>

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 20px;">
<h4 style="color: #f85149; margin: 0 0 12px 0;">Going Safer</h4>

```
Safety Measure           Cost           When Worth It
─────────────────────────────────────────────────────
Full E2E on every PR   → +15 min      → Payment flows
Security scan          → +5 min       → Always
SAST/DAST             → +10 min       → Public APIs
Load testing          → +20 min       → Before major release
Canary deploy         → +30 min       → User-facing services
Manual approval       → Hours/days    → Production, compliance
```

</div>

</div>

### GitOps vs. Push-based Deployment

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 20px; margin: 20px 0;">

```
PUSH-BASED (CI runs kubectl apply)          PULL-BASED (GitOps with Argo CD)
────────────────────────────────────        ────────────────────────────────────
✓ Simpler to understand                     ✓ Git is single source of truth
✓ Works with any CI system                  ✓ Automatic drift detection
✓ Faster for small teams                    ✓ Built-in audit trail
✓ No additional infrastructure              ✓ Multi-cluster from one repo

✗ CI needs cluster credentials              ✗ Learning curve for team
✗ No drift detection                        ✗ Another system to manage
✗ Manual audit trail                        ✗ Secret management complexity
✗ Hard to track "what's deployed"           ✗ Slower feedback loop

RECOMMENDATION:
├── < 10 services, 1 cluster  → Push-based (GitHub Actions + kubectl)
├── 10-30 services            → Consider GitOps, evaluate team readiness
└── 30+ services, multi-cluster → GitOps strongly recommended
```

</div>

### Monorepo vs. Polyrepo CI/CD

<div style="background: rgba(163, 113, 247, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 20px; margin: 20px 0;">

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

<div>
<h5 style="color: #a371f7; margin: 0 0 8px 0;">Monorepo CI Challenges</h5>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Build times grow with repo size</li>
<li>Need affected-target detection</li>
<li>CI minutes can get expensive</li>
<li>Complex caching strategies</li>
<li>All services share CI config</li>
</ul>
<p style="color: #8b949e; font-size: 12px; margin-top: 12px;"><strong>Mitigations</strong>: Nx/Turborepo, path-based triggers, remote caching</p>
</div>

<div>
<h5 style="color: #58a6ff; margin: 0 0 8px 0;">Polyrepo CI Challenges</h5>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Duplicate CI configs across repos</li>
<li>Cross-repo dependency hell</li>
<li>Hard to do atomic multi-service changes</li>
<li>Version matrix complexity</li>
<li>Inconsistent tooling</li>
</ul>
<p style="color: #8b949e; font-size: 12px; margin-top: 12px;"><strong>Mitigations</strong>: Shared workflow templates, service versioning strategy</p>
</div>

</div>

</div>

</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Pipeline as Code**: Explain benefits of version-controlled pipelines - reproducibility, review process, history
2. **Build Isolation**: Security implications of shared build infrastructure - credential leakage, crypto mining
3. **Deployment Strategies**: When to use rolling vs canary vs blue-green - match to risk tolerance and resources
4. **Rollback Speed**: Importance of fast rollback capability - should be < 60 seconds
5. **Secret Management**: How to handle sensitive data in pipelines - never in code, rotate regularly

### Common Follow-ups

- **Flaky tests**: Quarantine, retry logic, track flake rate, fix or delete
- **Database migrations**: Run before deployment, backward compatible, separate from app deploy
- **Feature flags**: Decouple deploy from release, canary by user segment
- **Stateful rollback**: Requires data migration rollback plan, often can't fully rollback

</div>

<div style="background: linear-gradient(135deg, #3d1f1f 0%, #5d3a3a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #f85149;">

### Red Flags (What NOT to Say)

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;">

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 8px; padding: 16px;">
<h5 style="color: #f85149; margin: 0 0 8px 0;">Avoid Saying</h5>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li>"We should use Kubernetes for everything"</li>
<li>"Jenkins is dead, never use it"</li>
<li>"Canary deployment for all services"</li>
<li>"Skip tests to deploy faster"</li>
<li>"Manual deployments are fine for prod"</li>
<li>"We don't need rollback, our code is tested"</li>
</ul>
</div>

<div style="background: rgba(248, 81, 73, 0.15); border: 1px solid #f85149; border-radius: 8px; padding: 16px;">
<h5 style="color: #f85149; margin: 0 0 8px 0;">Why It's a Red Flag</h5>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Shows inability to match tools to needs</li>
<li>Indicates hype-driven decisions</li>
<li>Ignores resource/complexity costs</li>
<li>Prioritizes speed over reliability</li>
<li>Doesn't understand human error risk</li>
<li>Overconfidence, lacks defensive thinking</li>
</ul>
</div>

</div>

</div>

<div style="background: linear-gradient(135deg, #1f3d2d 0%, #3a5d4a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #7ee787;">

### Impressive Statements

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px; margin: 16px 0;">

**Show Trade-off Thinking**:
> "For a 5-person team, I'd start with GitHub Actions deploying to Railway or Heroku. Once we hit 15+ services or need multi-region, then we'd evaluate Kubernetes. The ops overhead of K8s isn't worth it until you have the team to support it."

**Demonstrate Real Experience**:
> "We reduced our CI time from 45 minutes to 12 by: aggressive npm caching (saved 8 min), parallelizing tests across 4 runners (saved 20 min), and moving E2E tests to post-merge (saved 5 min). The trade-off was accepting slightly higher risk on feature branches."

**Show You Understand Failure**:
> "Our canary deployment saved us last quarter - we pushed a memory leak that only appeared under production load. The canary's memory growth triggered automatic rollback at 5% traffic. Without it, we'd have had a full outage."

**Acknowledge Complexity**:
> "GitOps with Argo CD sounds great, but it added 2 weeks of learning curve for our team and introduced secret management complexity we didn't have with simple kubectl. It was worth it at 25 services, but I wouldn't recommend it for a team just starting out."

**Cost-Aware Thinking**:
> "Blue-green deployments would double our infrastructure costs. For most of our services, rolling deployments with proper health checks are sufficient. We only use blue-green for our payment service where instant rollback is critical."

</div>

### Questions to Ask the Interviewer

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px; margin: 16px 0;">

<ul style="color: #c9d1d9; font-size: 14px; margin: 0; padding-left: 16px;">
<li>"What's your current deployment frequency and what's blocking you from going faster?"</li>
<li>"How long does a typical rollback take today?"</li>
<li>"What percentage of your deployments require manual intervention?"</li>
<li>"How do you handle database migrations in your deployment process?"</li>
<li>"What's your biggest CI/CD pain point right now?"</li>
</ul>

</div>

</div>

---

## Quick Reference: Scaling Stages

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

```
TEAM SIZE       RECOMMENDED STACK                      MONTHLY COST
─────────────────────────────────────────────────────────────────────
1-5 devs        GitHub Actions + Heroku/Railway        $50-200
                └── "Just ship it" - minimize ops

5-20 devs       GitHub Actions + ECS/Cloud Run         $500-2,000
                └── Managed containers, no K8s ops

20-50 devs      GitLab CI + EKS/GKE Autopilot         $2,000-10,000
                └── Start considering GitOps

50-200 devs     GitLab/GitHub + Argo CD + K8s         $10,000-50,000
                └── Full GitOps, dedicated platform team

200+ devs       Custom platform + Spinnaker           $50,000+
                └── Internal developer platform
─────────────────────────────────────────────────────────────────────

DEPLOYMENT STRATEGY BY RISK:
─────────────────────────────────────────────────────────────────────
Low risk (internal tools)     → Rolling, 100% at once
Medium risk (user-facing)     → Rolling with health checks
High risk (payments, auth)    → Canary 5% → 25% → 100%
Critical (financial, health)  → Blue-green + manual approval
```

</div>
