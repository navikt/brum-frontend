# Brum Frontend

## Getting Started

1. Clone the repository.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```

## Docker Deployment (Local)

1. Build the Docker image:
    ```bash
    docker buildx build --secret id=NODE_AUTH_TOKEN --output type=docker . -t golden-frontend
    ```
2. Run the Docker container:
    ```bash
    docker run -it -p 3000:3000 golden-frontend
    ```
3. Access the app at [http://localhost:3000](http://localhost:3000)
