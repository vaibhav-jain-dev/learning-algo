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

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Pipeline as Code**: Explain benefits of version-controlled pipelines
2. **Build Isolation**: Security implications of shared build infrastructure
3. **Deployment Strategies**: When to use rolling vs canary vs blue-green
4. **Rollback Speed**: Importance of fast rollback capability
5. **Secret Management**: How to handle sensitive data in pipelines

### Common Follow-ups

- How do you handle flaky tests?
- How do you manage database migrations during deployments?
- How do you implement feature flags?
- How do you handle rollback of stateful services?

</div>
