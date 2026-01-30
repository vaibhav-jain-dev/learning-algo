# Kubernetes (K8s)

## Overview

Kubernetes is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications. <span style="background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); padding: 2px 6px; border-radius: 4px;">Understanding K8s is essential for modern system design interviews as it's the de-facto standard for container orchestration</span>.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Kubernetes Architecture</h4>
  <div style="display: flex; gap: 24px; flex-wrap: wrap;">
    <div style="flex: 1; min-width: 280px;">
      <div style="background: #3b82f6; color: white; padding: 12px 16px; border-radius: 8px 8px 0 0; font-weight: 600;">Control Plane</div>
      <div style="background: #eff6ff; padding: 16px; border-radius: 0 0 8px 8px; font-size: 14px;">
        <div style="padding: 6px 0; border-bottom: 1px solid #bfdbfe;"><strong>API Server:</strong> Frontend for K8s control plane</div>
        <div style="padding: 6px 0; border-bottom: 1px solid #bfdbfe;"><strong>etcd:</strong> Distributed key-value store for cluster state</div>
        <div style="padding: 6px 0; border-bottom: 1px solid #bfdbfe;"><strong>Scheduler:</strong> Assigns pods to nodes</div>
        <div style="padding: 6px 0;"><strong>Controller Manager:</strong> Runs controller processes</div>
      </div>
    </div>
    <div style="flex: 1; min-width: 280px;">
      <div style="background: #22c55e; color: white; padding: 12px 16px; border-radius: 8px 8px 0 0; font-weight: 600;">Worker Nodes</div>
      <div style="background: #f0fdf4; padding: 16px; border-radius: 0 0 8px 8px; font-size: 14px;">
        <div style="padding: 6px 0; border-bottom: 1px solid #bbf7d0;"><strong>kubelet:</strong> Agent ensuring containers run in pods</div>
        <div style="padding: 6px 0; border-bottom: 1px solid #bbf7d0;"><strong>kube-proxy:</strong> Network proxy for service networking</div>
        <div style="padding: 6px 0;"><strong>Container Runtime:</strong> Docker, containerd, CRI-O</div>
      </div>
    </div>
  </div>
</div>

---

## Core Concepts

### Pods

<span style="background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); padding: 2px 6px; border-radius: 4px;">A Pod is the smallest deployable unit in Kubernetes - one or more containers that share storage and network</span>.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Pod Structure</h4>
  <div style="background: #f1f5f9; border-radius: 8px; padding: 20px; display: flex; flex-direction: column; gap: 12px;">
    <div style="background: white; border: 2px solid #3b82f6; border-radius: 8px; padding: 16px;">
      <div style="color: #3b82f6; font-weight: 600; margin-bottom: 12px;">Pod</div>
      <div style="display: flex; gap: 12px;">
        <div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 4px; padding: 8px 12px; font-size: 13px;">Container 1</div>
        <div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 4px; padding: 8px 12px; font-size: 13px;">Container 2 (sidecar)</div>
      </div>
      <div style="margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap;">
        <div style="background: #fef3c7; border-radius: 4px; padding: 4px 8px; font-size: 12px;">Shared Network (localhost)</div>
        <div style="background: #fef3c7; border-radius: 4px; padding: 4px 8px; font-size: 12px;">Shared Volumes</div>
        <div style="background: #fef3c7; border-radius: 4px; padding: 4px 8px; font-size: 12px;">Same IP Address</div>
      </div>
    </div>
  </div>
</div>

### Deployments

Deployments manage ReplicaSets and provide declarative updates for Pods.

### Services

Services expose pods to network traffic - ClusterIP, NodePort, LoadBalancer, ExternalName.

### ConfigMaps & Secrets

Store configuration data and sensitive information separately from container images.

---

## Essential kubectl Commands

### Cluster Information

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Cluster Commands</h4>

  ```bash
  # View cluster info
  kubectl cluster-info

  # View all nodes in cluster
  kubectl get nodes
  kubectl get nodes -o wide    # More details (IP, OS, etc.)

  # View node details
  kubectl describe node <node-name>

    # Check kubectl config/context
    kubectl config view
    kubectl config current-context
    kubectl config get-contexts

    # Switch context (different clusters)
    kubectl config use-context <context-name>

      # View API resources available
      kubectl api-resources
      kubectl api-versions
      ```
    </div>

    ### Working with Pods

    <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
      <h4 style="color: #1e293b; margin-top: 0;">Pod Commands</h4>

      ```bash
      # List pods
      kubectl get pods                         # Current namespace
      kubectl get pods -A                      # All namespaces
      kubectl get pods -n <namespace>          # Specific namespace
        kubectl get pods -o wide                 # More details
        kubectl get pods --show-labels           # Show labels
        kubectl get pods -l app=nginx            # Filter by label
        kubectl get pods -w                      # Watch for changes

        # Pod details
        kubectl describe pod <pod-name>
          kubectl describe pod <pod-name> -n <namespace>

              # Create pod from YAML
              kubectl apply -f pod.yaml
              kubectl create -f pod.yaml

              # Delete pod
              kubectl delete pod <pod-name>
                kubectl delete pod <pod-name> --grace-period=0 --force  # Force delete
                  kubectl delete pods --all                # Delete all pods in namespace

                  # Run pod directly (for testing)
                  kubectl run nginx --image=nginx
                  kubectl run nginx --image=nginx --dry-run=client -o yaml  # Generate YAML

                  # Execute command in pod
                  kubectl exec -it <pod-name> -- /bin/bash
                    kubectl exec -it <pod-name> -c <container-name> -- /bin/sh  # Specific container
                        kubectl exec <pod-name> -- ls /app       # Non-interactive command

                          # Copy files to/from pod
                          kubectl cp <pod-name>:/path/to/file ./local-file
                            kubectl cp ./local-file <pod-name>:/path/to/file
                              ```
                            </div>

                            ### Pod Logs

                            <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
                              <h4 style="color: #1e293b; margin-top: 0;">Log Commands</h4>

                              ```bash
                              # View logs
                              kubectl logs <pod-name>
                                kubectl logs <pod-name> -c <container-name>    # Specific container
                                    kubectl logs <pod-name> --all-containers=true  # All containers
                                      kubectl logs -f <pod-name>                     # Follow/stream logs
                                        kubectl logs <pod-name> --tail=100             # Last 100 lines
                                          kubectl logs <pod-name> --since=1h             # Logs from last hour
                                            kubectl logs <pod-name> --previous             # Previous container instance
                                              kubectl logs -l app=nginx                      # Logs by label selector

                                              # Logs from all pods in deployment
                                              kubectl logs deployment/<deployment-name>
                                                kubectl logs -f deployment/<deployment-name> --all-containers=true
                                                  ```
                                                </div>

                                                ### Working with Deployments

                                                <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
                                                  <h4 style="color: #1e293b; margin-top: 0;">Deployment Commands</h4>

                                                  ```bash
                                                  # List deployments
                                                  kubectl get deployments
                                                  kubectl get deploy                       # Short form
                                                  kubectl get deploy -o wide

                                                  # Create deployment
                                                  kubectl create deployment nginx --image=nginx
                                                  kubectl create deployment nginx --image=nginx --replicas=3
                                                  kubectl apply -f deployment.yaml

                                                  # Deployment details
                                                  kubectl describe deployment <name>

                                                    # Scale deployment
                                                    kubectl scale deployment <name> --replicas=5

                                                      # Update deployment image
                                                      kubectl set image deployment/<name> <container>=<image>:<tag>
                                                              kubectl set image deployment/nginx nginx=nginx:1.21

                                                              # Rollout management
                                                              kubectl rollout status deployment/<name>      # Watch rollout progress
                                                                kubectl rollout history deployment/<name>     # View rollout history
                                                                  kubectl rollout undo deployment/<name>        # Rollback to previous
                                                                    kubectl rollout undo deployment/<name> --to-revision=2  # Specific revision
                                                                      kubectl rollout restart deployment/<name>     # Restart all pods
                                                                        kubectl rollout pause deployment/<name>       # Pause rollout
                                                                          kubectl rollout resume deployment/<name>      # Resume rollout

                                                                            # Delete deployment
                                                                            kubectl delete deployment <name>
                                                                              ```
                                                                            </div>

                                                                            ### Working with Services

                                                                            <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
                                                                              <h4 style="color: #1e293b; margin-top: 0;">Service Commands</h4>

                                                                              ```bash
                                                                              # List services
                                                                              kubectl get services
                                                                              kubectl get svc                          # Short form
                                                                              kubectl get svc -o wide

                                                                              # Create service
                                                                              kubectl expose deployment <name> --port=80 --target-port=8080
                                                                                kubectl expose deployment <name> --type=LoadBalancer --port=80
                                                                                  kubectl expose deployment <name> --type=NodePort --port=80

                                                                                    # Service types
                                                                                    # ClusterIP   - Internal only (default)
                                                                                    # NodePort    - Expose on each node's IP at static port
                                                                                    # LoadBalancer - Provision external load balancer
                                                                                    # ExternalName - Map to external DNS name

                                                                                    # Service details
                                                                                    kubectl describe service <name>

                                                                                      # Delete service
                                                                                      kubectl delete service <name>
                                                                                        ```
                                                                                      </div>

                                                                                      ### Working with ConfigMaps & Secrets

                                                                                      <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
                                                                                        <h4 style="color: #1e293b; margin-top: 0;">ConfigMap & Secret Commands</h4>

                                                                                        ```bash
                                                                                        # ConfigMaps
                                                                                        kubectl get configmaps
                                                                                        kubectl get cm                           # Short form

                                                                                        kubectl create configmap <name> --from-literal=key=value
                                                                                          kubectl create configmap <name> --from-file=config.properties
                                                                                            kubectl create configmap <name> --from-env-file=.env

                                                                                              kubectl describe configmap <name>
                                                                                                kubectl get configmap <name> -o yaml     # View contents

                                                                                                  # Secrets
                                                                                                  kubectl get secrets
                                                                                                  kubectl create secret generic <name> --from-literal=password=secret123
                                                                                                    kubectl create secret generic <name> --from-file=ssh-key=~/.ssh/id_rsa
                                                                                                      kubectl create secret docker-registry regcred \
                                                                                                      --docker-server=<server> \
                                                                                                        --docker-username=<user> \
                                                                                                          --docker-password=<pass>

                                                                                                            kubectl describe secret <name>
                                                                                                              kubectl get secret <name> -o yaml
                                                                                                                kubectl get secret <name> -o jsonpath='{.data.password}' | base64 -d  # Decode
                                                                                                                  ```
                                                                                                                </div>

                                                                                                                ### Namespaces

                                                                                                                <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
                                                                                                                  <h4 style="color: #1e293b; margin-top: 0;">Namespace Commands</h4>

                                                                                                                  ```bash
                                                                                                                  # List namespaces
                                                                                                                  kubectl get namespaces
                                                                                                                  kubectl get ns                           # Short form

                                                                                                                  # Create namespace
                                                                                                                  kubectl create namespace <name>
                                                                                                                    kubectl create ns <name>

                                                                                                                      # Set default namespace for context
                                                                                                                      kubectl config set-context --current --namespace=<name>

                                                                                                                        # Delete namespace (deletes all resources in it!)
                                                                                                                        kubectl delete namespace <name>

                                                                                                                          # View resources in all namespaces
                                                                                                                          kubectl get all -A
                                                                                                                          kubectl get pods,svc,deploy -A
                                                                                                                          ```
                                                                                                                        </div>

                                                                                                                        ### Resource Management

                                                                                                                        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
                                                                                                                          <h4 style="color: #1e293b; margin-top: 0;">Resource Commands</h4>

                                                                                                                          ```bash
                                                                                                                          # View resource usage (requires metrics-server)
                                                                                                                          kubectl top nodes
                                                                                                                          kubectl top pods
                                                                                                                          kubectl top pods --containers=true

                                                                                                                          # Resource quotas
                                                                                                                          kubectl get resourcequotas
                                                                                                                          kubectl describe resourcequota <name>

                                                                                                                            # Limit ranges
                                                                                                                            kubectl get limitranges
                                                                                                                            kubectl describe limitrange <name>

                                                                                                                              # Horizontal Pod Autoscaler
                                                                                                                              kubectl get hpa
                                                                                                                              kubectl autoscale deployment <name> --min=2 --max=10 --cpu-percent=80
                                                                                                                                kubectl describe hpa <name>
                                                                                                                                  kubectl delete hpa <name>
                                                                                                                                    ```
                                                                                                                                  </div>

                                                                                                                                  ### Debugging & Troubleshooting

                                                                                                                                  <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
                                                                                                                                    <h4 style="color: #1e293b; margin-top: 0;">Debug Commands</h4>

                                                                                                                                    ```bash
                                                                                                                                    # Debug pod issues
                                                                                                                                    kubectl describe pod <name>              # Check Events section
                                                                                                                                      kubectl logs <name> --previous           # Previous container logs
                                                                                                                                        kubectl get events --sort-by=.metadata.creationTimestamp

                                                                                                                                        # Get pod status reasons
                                                                                                                                        kubectl get pods -o custom-columns=NAME:.metadata.name,STATUS:.status.phase,REASON:.status.reason

                                                                                                                                        # Debug networking
                                                                                                                                        kubectl run debug --image=busybox -it --rm -- /bin/sh
                                                                                                                                        # Inside: nslookup <service-name>, wget -qO- <service>:port

                                                                                                                                            # Port forwarding (local debugging)
                                                                                                                                            kubectl port-forward pod/<name> 8080:80
                                                                                                                                              kubectl port-forward svc/<name> 8080:80
                                                                                                                                                kubectl port-forward deployment/<name> 8080:80

                                                                                                                                                  # Proxy to API server
                                                                                                                                                  kubectl proxy --port=8001
                                                                                                                                                  # Then: curl http://localhost:8001/api/v1/namespaces/default/pods

                                                                                                                                                  # Debug with ephemeral container (K8s 1.23+)
                                                                                                                                                  kubectl debug <pod-name> -it --image=busybox

                                                                                                                                                    # Check pod resources
                                                                                                                                                    kubectl get pod <name> -o jsonpath='{.spec.containers[*].resources}'
                                                                                                                                                      ```
                                                                                                                                                    </div>

                                                                                                                                                    ### YAML Output & Editing

                                                                                                                                                    <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
                                                                                                                                                      <h4 style="color: #1e293b; margin-top: 0;">YAML Commands</h4>

                                                                                                                                                      ```bash
                                                                                                                                                      # Output as YAML
                                                                                                                                                      kubectl get pod <name> -o yaml
                                                                                                                                                        kubectl get deployment <name> -o yaml > deployment.yaml

                                                                                                                                                          # Generate YAML without creating resource
                                                                                                                                                          kubectl create deployment nginx --image=nginx --dry-run=client -o yaml
                                                                                                                                                          kubectl run nginx --image=nginx --dry-run=client -o yaml > pod.yaml

                                                                                                                                                          # Edit resource directly
                                                                                                                                                          kubectl edit deployment <name>
                                                                                                                                                            kubectl edit pod <name>

                                                                                                                                                              # Apply changes from file
                                                                                                                                                              kubectl apply -f deployment.yaml
                                                                                                                                                              kubectl apply -f ./manifests/            # Apply all in directory
                                                                                                                                                              kubectl apply -f https://raw.githubusercontent.com/.../deployment.yaml

                                                                                                                                                              # Replace resource
                                                                                                                                                              kubectl replace -f deployment.yaml
                                                                                                                                                              kubectl replace --force -f pod.yaml      # Force replace (delete + create)

                                                                                                                                                              # Diff before applying
                                                                                                                                                              kubectl diff -f deployment.yaml
                                                                                                                                                              ```
                                                                                                                                                            </div>

                                                                                                                                                            ### Labels & Selectors

                                                                                                                                                            <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
                                                                                                                                                              <h4 style="color: #1e293b; margin-top: 0;">Label Commands</h4>

                                                                                                                                                              ```bash
                                                                                                                                                              # Add/update labels
                                                                                                                                                              kubectl label pods <name> env=prod
                                                                                                                                                                kubectl label pods <name> env=prod --overwrite
                                                                                                                                                                  kubectl label nodes <name> disktype=ssd

                                                                                                                                                                    # Remove label
                                                                                                                                                                    kubectl label pods <name> env-

                                                                                                                                                                      # Select by label
                                                                                                                                                                      kubectl get pods -l env=prod
                                                                                                                                                                      kubectl get pods -l 'env in (prod, staging)'
                                                                                                                                                                      kubectl get pods -l env=prod,tier=frontend
                                                                                                                                                                      kubectl get pods -l 'env!=test'

                                                                                                                                                                      # Annotate resources
                                                                                                                                                                      kubectl annotate pod <name> description="My app"
                                                                                                                                                                        kubectl annotate pod <name> description-          # Remove annotation
                                                                                                                                                                          ```
                                                                                                                                                                        </div>

                                                                                                                                                                        ---

                                                                                                                                                                        ## Common YAML Manifests

                                                                                                                                                                        ### Deployment Example

                                                                                                                                                                        ```yaml
                                                                                                                                                                        apiVersion: apps/v1
                                                                                                                                                                        kind: Deployment
                                                                                                                                                                        metadata:
                                                                                                                                                                        name: my-app
                                                                                                                                                                        labels:
                                                                                                                                                                        app: my-app
                                                                                                                                                                        spec:
                                                                                                                                                                        replicas: 3
                                                                                                                                                                        selector:
                                                                                                                                                                        matchLabels:
                                                                                                                                                                        app: my-app
                                                                                                                                                                        template:
                                                                                                                                                                        metadata:
                                                                                                                                                                        labels:
                                                                                                                                                                        app: my-app
                                                                                                                                                                        spec:
                                                                                                                                                                        containers:
                                                                                                                                                                        - name: my-app
                                                                                                                                                                        image: my-app:1.0.0
                                                                                                                                                                        ports:
                                                                                                                                                                        - containerPort: 8080
                                                                                                                                                                        resources:
                                                                                                                                                                        requests:
                                                                                                                                                                        memory: "128Mi"
                                                                                                                                                                        cpu: "100m"
                                                                                                                                                                        limits:
                                                                                                                                                                        memory: "256Mi"
                                                                                                                                                                        cpu: "500m"
                                                                                                                                                                        env:
                                                                                                                                                                        - name: DATABASE_URL
                                                                                                                                                                        valueFrom:
                                                                                                                                                                        secretKeyRef:
                                                                                                                                                                        name: db-secret
                                                                                                                                                                        key: url
                                                                                                                                                                        livenessProbe:
                                                                                                                                                                        httpGet:
                                                                                                                                                                        path: /health
                                                                                                                                                                        port: 8080
                                                                                                                                                                        initialDelaySeconds: 30
                                                                                                                                                                        periodSeconds: 10
                                                                                                                                                                        readinessProbe:
                                                                                                                                                                        httpGet:
                                                                                                                                                                        path: /ready
                                                                                                                                                                        port: 8080
                                                                                                                                                                        initialDelaySeconds: 5
                                                                                                                                                                        periodSeconds: 5
                                                                                                                                                                        ```

                                                                                                                                                                        ### Service Example

                                                                                                                                                                        ```yaml
                                                                                                                                                                        apiVersion: v1
                                                                                                                                                                        kind: Service
                                                                                                                                                                        metadata:
                                                                                                                                                                        name: my-app-service
                                                                                                                                                                        spec:
                                                                                                                                                                        selector:
                                                                                                                                                                        app: my-app
                                                                                                                                                                        ports:
                                                                                                                                                                        - protocol: TCP
                                                                                                                                                                        port: 80
                                                                                                                                                                        targetPort: 8080
                                                                                                                                                                        type: ClusterIP
                                                                                                                                                                        ---
                                                                                                                                                                        # LoadBalancer for external access
                                                                                                                                                                        apiVersion: v1
                                                                                                                                                                        kind: Service
                                                                                                                                                                        metadata:
                                                                                                                                                                        name: my-app-lb
                                                                                                                                                                        spec:
                                                                                                                                                                        selector:
                                                                                                                                                                        app: my-app
                                                                                                                                                                        ports:
                                                                                                                                                                        - port: 80
                                                                                                                                                                        targetPort: 8080
                                                                                                                                                                        type: LoadBalancer
                                                                                                                                                                        ```

                                                                                                                                                                        ### Ingress Example

                                                                                                                                                                        ```yaml
                                                                                                                                                                        apiVersion: networking.k8s.io/v1
                                                                                                                                                                        kind: Ingress
                                                                                                                                                                        metadata:
                                                                                                                                                                        name: my-app-ingress
                                                                                                                                                                        annotations:
                                                                                                                                                                        nginx.ingress.kubernetes.io/rewrite-target: /
                                                                                                                                                                        spec:
                                                                                                                                                                        ingressClassName: nginx
                                                                                                                                                                        rules:
                                                                                                                                                                        - host: myapp.example.com
                                                                                                                                                                        http:
                                                                                                                                                                        paths:
                                                                                                                                                                        - path: /
                                                                                                                                                                        pathType: Prefix
                                                                                                                                                                        backend:
                                                                                                                                                                        service:
                                                                                                                                                                        name: my-app-service
                                                                                                                                                                        port:
                                                                                                                                                                        number: 80
                                                                                                                                                                        tls:
                                                                                                                                                                        - hosts:
                                                                                                                                                                        - myapp.example.com
                                                                                                                                                                        secretName: myapp-tls
                                                                                                                                                                        ```

                                                                                                                                                                        ---

                                                                                                                                                                        ## Interview Deep Dive

                                                                                                                                                                        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

                                                                                                                                                                          ### Q1: How does Kubernetes handle pod scheduling?

                                                                                                                                                                          **Answer:**

                                                                                                                                                                          The kube-scheduler watches for newly created Pods with no assigned node and selects a node for them to run on through:

                                                                                                                                                                          1. **Filtering**: Eliminate nodes that don't meet requirements (resources, taints, affinity)
                                                                                                                                                                          2. **Scoring**: Rank remaining nodes by factors (resource balance, locality, etc.)
                                                                                                                                                                          3. **Binding**: Assign Pod to highest-scored node

                                                                                                                                                                          <span style="background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); padding: 2px 6px; border-radius: 4px;">Key insight: Scheduler decisions are point-in-time; resource availability may change</span>.

                                                                                                                                                                          #### Level 2 Follow-ups:

                                                                                                                                                                          **Q1.1: How do you ensure pods land on specific nodes?**

                                                                                                                                                                          Use nodeSelector, node affinity, or taints/tolerations:

                                                                                                                                                                          ```yaml
                                                                                                                                                                          # nodeSelector - simple key-value matching
                                                                                                                                                                          spec:
                                                                                                                                                                          nodeSelector:
                                                                                                                                                                          disktype: ssd

                                                                                                                                                                          # nodeAffinity - more expressive
                                                                                                                                                                          spec:
                                                                                                                                                                          affinity:
                                                                                                                                                                          nodeAffinity:
                                                                                                                                                                          requiredDuringSchedulingIgnoredDuringExecution:
                                                                                                                                                                          nodeSelectorTerms:
                                                                                                                                                                          - matchExpressions:
                                                                                                                                                                          - key: gpu
                                                                                                                                                                          operator: In
                                                                                                                                                                          values:
                                                                                                                                                                          - nvidia-a100
                                                                                                                                                                          ```

                                                                                                                                                                          ##### Level 3 Follow-ups:

                                                                                                                                                                          **Q1.1.1: What's the difference between required and preferred affinity?**

                                                                                                                                                                          - **Required**: Pod won't schedule if no matching node exists (hard constraint)
                                                                                                                                                                          - **Preferred**: Scheduler tries but will place elsewhere if needed (soft constraint)

                                                                                                                                                                          **Q1.1.2: How do taints and tolerations work?**

                                                                                                                                                                          Taints on nodes repel pods; tolerations on pods allow scheduling on tainted nodes:

                                                                                                                                                                          ```bash
                                                                                                                                                                          # Taint a node
                                                                                                                                                                          kubectl taint nodes node1 gpu=true:NoSchedule

                                                                                                                                                                          # Pod must have toleration:
                                                                                                                                                                          tolerations:
                                                                                                                                                                          - key: "gpu"
                                                                                                                                                                          operator: "Equal"
                                                                                                                                                                          value: "true"
                                                                                                                                                                          effect: "NoSchedule"
                                                                                                                                                                          ```

                                                                                                                                                                          ---

                                                                                                                                                                          **Q1.2: What happens when a node fails?**

                                                                                                                                                                          1. Node controller marks node as NotReady after --node-monitor-grace-period (40s default)
                                                                                                                                                                          2. After --pod-eviction-timeout (5min default), pods are evicted
                                                                                                                                                                          3. Deployment controller creates replacement pods on healthy nodes
                                                                                                                                                                          4. StatefulSet pods wait longer due to persistent storage considerations

                                                                                                                                                                        </div>

                                                                                                                                                                        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

                                                                                                                                                                          ### Q2: How do you handle zero-downtime deployments in Kubernetes?

                                                                                                                                                                          **Answer:**

                                                                                                                                                                          1. **Rolling Update Strategy** (default):
                                                                                                                                                                          ```yaml
                                                                                                                                                                          spec:
                                                                                                                                                                          strategy:
                                                                                                                                                                          type: RollingUpdate
                                                                                                                                                                          rollingUpdate:
                                                                                                                                                                          maxUnavailable: 25%  # Max pods that can be unavailable
                                                                                                                                                                          maxSurge: 25%        # Max pods over desired count
                                                                                                                                                                          ```

                                                                                                                                                                          2. **Readiness Probes**: Ensure traffic only goes to ready pods
                                                                                                                                                                          3. **PodDisruptionBudget**: Prevent too many pods going down simultaneously
                                                                                                                                                                          4. **PreStop Hooks**: Graceful shutdown handling

                                                                                                                                                                          <span style="background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); padding: 2px 6px; border-radius: 4px;">Trade-off: Faster rollouts risk stability; slower rollouts mean longer deployment times</span>.

                                                                                                                                                                          #### Level 2 Follow-ups:

                                                                                                                                                                          **Q2.1: How do readiness and liveness probes differ?**

                                                                                                                                                                          | Probe | Purpose | Failure Action |
                                                                                                                                                                          |-------|---------|----------------|
                                                                                                                                                                          | Liveness | Is container healthy? | Restart container |
                                                                                                                                                                          | Readiness | Can container serve traffic? | Remove from service endpoints |
                                                                                                                                                                          | Startup | Has container started? | Block other probes |

                                                                                                                                                                          **Q2.2: What's a PodDisruptionBudget?**

                                                                                                                                                                          Limits voluntary disruptions (drains, upgrades):

                                                                                                                                                                          ```yaml
                                                                                                                                                                          apiVersion: policy/v1
                                                                                                                                                                          kind: PodDisruptionBudget
                                                                                                                                                                          metadata:
                                                                                                                                                                          name: my-app-pdb
                                                                                                                                                                          spec:
                                                                                                                                                                          minAvailable: 2      # Or maxUnavailable: 1
                                                                                                                                                                          selector:
                                                                                                                                                                          matchLabels:
                                                                                                                                                                          app: my-app
                                                                                                                                                                          ```

                                                                                                                                                                        </div>

                                                                                                                                                                        ---

                                                                                                                                                                        ## Quick Reference Card

                                                                                                                                                                        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
                                                                                                                                                                          <h4 style="color: #1e293b; margin-top: 0;">kubectl Cheat Sheet</h4>
                                                                                                                                                                          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                                                                                                                                                                            <div>
                                                                                                                                                                              <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Most Used Commands</div>
                                                                                                                                                                              <div style="font-size: 13px; color: #475569; font-family: monospace;">
                                                                                                                                                                                <div style="padding: 4px 0;">kubectl get pods -A</div>
                                                                                                                                                                                <div style="padding: 4px 0;">kubectl describe pod &lt;name&gt;</div>
                                                                                                                                                                                <div style="padding: 4px 0;">kubectl logs -f &lt;pod&gt;</div>
                                                                                                                                                                                <div style="padding: 4px 0;">kubectl exec -it &lt;pod&gt; -- /bin/sh</div>
                                                                                                                                                                                <div style="padding: 4px 0;">kubectl apply -f &lt;file&gt;</div>
                                                                                                                                                                                <div style="padding: 4px 0;">kubectl delete &lt;resource&gt; &lt;name&gt;</div>
                                                                                                                                                                              </div>
                                                                                                                                                                            </div>
                                                                                                                                                                            <div>
                                                                                                                                                                              <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Resource Shortcuts</div>
                                                                                                                                                                              <div style="font-size: 13px; color: #475569;">
                                                                                                                                                                                <div style="padding: 4px 0;"><strong>po</strong> = pods</div>
                                                                                                                                                                                <div style="padding: 4px 0;"><strong>deploy</strong> = deployments</div>
                                                                                                                                                                                <div style="padding: 4px 0;"><strong>svc</strong> = services</div>
                                                                                                                                                                                <div style="padding: 4px 0;"><strong>ns</strong> = namespaces</div>
                                                                                                                                                                                <div style="padding: 4px 0;"><strong>cm</strong> = configmaps</div>
                                                                                                                                                                                <div style="padding: 4px 0;"><strong>pv/pvc</strong> = persistentvolumes/claims</div>
                                                                                                                                                                              </div>
                                                                                                                                                                            </div>
                                                                                                                                                                            <div>
                                                                                                                                                                              <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Output Formats</div>
                                                                                                                                                                              <div style="font-size: 13px; color: #475569; font-family: monospace;">
                                                                                                                                                                                <div style="padding: 4px 0;">-o wide (more columns)</div>
                                                                                                                                                                                <div style="padding: 4px 0;">-o yaml (YAML output)</div>
                                                                                                                                                                                <div style="padding: 4px 0;">-o json (JSON output)</div>
                                                                                                                                                                                <div style="padding: 4px 0;">-o name (resource names only)</div>
                                                                                                                                                                                <div style="padding: 4px 0;">-o jsonpath='{...}'</div>
                                                                                                                                                                              </div>
                                                                                                                                                                            </div>
                                                                                                                                                                            <div>
                                                                                                                                                                              <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Common Flags</div>
                                                                                                                                                                              <div style="font-size: 13px; color: #475569; font-family: monospace;">
                                                                                                                                                                                <div style="padding: 4px 0;">-n &lt;namespace&gt;</div>
                                                                                                                                                                                <div style="padding: 4px 0;">-A (all namespaces)</div>
                                                                                                                                                                                <div style="padding: 4px 0;">-l &lt;label&gt; (label selector)</div>
                                                                                                                                                                                <div style="padding: 4px 0;">-w (watch)</div>
                                                                                                                                                                                <div style="padding: 4px 0;">--dry-run=client -o yaml</div>
                                                                                                                                                                              </div>
                                                                                                                                                                            </div>
                                                                                                                                                                          </div>
                                                                                                                                                                        </div>

                                                                                                                                                                        ---

                                                                                                                                                                        ## Related Topics

                                                                                                                                                                        - [[Docker]](/topic/system-design/docker) - Container fundamentals
                                                                                                                                                                        - [[Microservices]](/topic/system-design/microservices) - Service architecture
                                                                                                                                                                        - [[Load Balancing]](/topic/system-design/load-balancing) - Traffic distribution
                                                                                                                                                                        - [[Availability]](/topic/system-design/availability) - High availability patterns
