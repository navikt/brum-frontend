## Docker Deployment (Local)

1. Build the Docker image:
   ```bash
   docker buildx build --secret id=NODE_AUTH_TOKEN --output type=docker . -t golden-frontend
   ```
2. Run the Docker container:
   ```bash
   docker run -it -p 3000:3000 golden-frontend
   ```