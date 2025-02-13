# Running the application

Docker is used to build and run this project.

## On development mode

The `Dockerfile` file in each directory and `docker-compose.yml` file in root directory will be used to configure the build image on `development` mode.

To start the running app, at the root directory
```bash
docker compose up
```
To stop the running app
```bash
docker compose down
```

To restart the app
```bash
docker compose up
```

The application can be accessed at localhost:7800

### To run the e2e test

```bash
docker compose up

# Run the test script on the other terminal
docker compose run --rm --entrypoint=npx e2e-playwright playwright test
```

### To run K6 performance test

Assuming the K6 package was installed on your local device.

```bash
# To test the loading of main page
cd k6 && k6 run performance-test-load-course.js

# To test the loading of course page
cd k6 && k6 run performance-test-load-question.js

# To test the loading of question page
cd k6 && k6 run performance-test-load-answer.js

# To test adding the question
cd k6 && k6 run performance-test-add-question.js

# To test adding the answer
cd k6 && k6 run performance-test-add-answer.js
```

## On production mode

The `Dockerfile.prod` file in each directory and `docker-compose.prod.yml` file in root directory will be employed to set up the production mode settings of the build image.

To start the running app, at the root directory
```bash
docker compose -f docker-compose.prod.yml up -d 
```
To stop the running app
```bash
docker compose down
```

To restart the app
```bash
docker compose -f docker-compose.prod.yml up -d 
```

The application can be accessed at localhost:7800


## Deploy using Kubernetes
### Requirements
The prerequisites of this setup are
- minikube (https://minikube.sigs.k8s.io/docs/start/)
- kubernetes (https://kubernetes.io/)


The setup steps are as follow, at the root folder of the project

1. Start `minikube` and enable `metrics-server`
```bash
minikube start
minikube addons enable metrics-server
```

2. Build the images
```bash
minikube image build -t flyway-migrations flyway/ .
cd qa-api
minikube image build -t qa-api -f ./Dockerfile.prod .
cd ..
cd qa-ui
minikube image build -t qa-ui -f ./Dockerfile.prod .
cd ..
cd llm-api
minikube image build -t llm-api -f ./Dockerfile.prod . 
```

3. Install the CloudNativePG operator, create the database cluster and start the migration job
```bash
kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.19/releases/cnpg-1.19.6.yaml
# Wait about 10 seconds before creating the database cluster
kubectl apply -f kubernetes/database-cluster.yaml
# Check status to make sure the database cluster is started successfully. It often takes several minutes
kubectl cnpg status database-cluster
# Start the migration job
kubectl apply -f kubernetes/database-migration-job.yaml
```

4. Create deployments, services, and auto-scalers.
```bash
kubectl apply -f kubernetes/redis.yaml

kubectl apply -f kubernetes/llm-api-deployment.yaml
kubectl apply -f kubernetes/llm-api-deployment-hpa.yaml

kubectl apply -f kubernetes/qa-api-deployment.yaml
kubectl apply -f kubernetes/qa-api-deployment-hpa.yaml
kubectl apply -f kubernetes/qa-ui-deployment.yaml

kubectl apply -f kubernetes/nginx.yaml
```

5. Expose the `nginx` service
```bash
minikube service nginx --url
```

### Monitoring the application with Prometheus and Granafa
Install Prometheus and Granafa with configuration files
```bash
kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/bundle.yaml --force-conflicts=true --server-side=true
kubectl apply -f kubernetes/prometheus_rbac.yaml
kubectl apply -f kubernetes/prometheus_instance.yaml
kubectl apply -f kubernetes/service_monitor.yaml
kubectl port-forward svc/prometheus-operated 9090:9090
```

```bash
kubectl create deployment grafana --image=docker.io/grafana/grafana:latest 
kubectl expose deployment grafana --port 3000
kubectl apply -f kubernetes/expose_prometheus.yaml
kubectl port-forward svc/grafana 3000:3000
```

Now, you can access Prometheus dashboard and Grafana dashboard at localhost:9090 and localhost:3000, respectively.