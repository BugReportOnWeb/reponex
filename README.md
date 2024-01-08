# RepoNex

RepoNex is a centralized dashboard platform that serves as a comprehensive hub where users can track their ongoing PRs, manage issues, and monitor repositories of interest. It integrates a team-based system, enabling seamless collaboration and coordination among team members involved in various open-source projects.

## Getting Started

The project utilizes Docker to orchestrate both microservices within a single instance. However, if you prefer to run it without Docker, examine the scripts available under each service and proceed accordingly. Otherwise, follow these steps:

### Prerequisites

Ensure that you have [Docker](https://www.docker.com/get-started) installed on your system before proceeding.

### Environment Configuration

Before starting the Docker containers, create a `.env` file inside the `server` directory and set the following required environment variables:

```env
SERVER_PORT=3000
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=reponex
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

Replace `your_username` and `your_password` with the desired credentials for accessing the PostgreSQL database.

### Steps to Run the Application

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/BugReportOnWeb/reponex.git
    cd reponex
    ```

3. **Start the Docker Containers:**
    ```bash
    npm run docker:up
    ```

4. **Accessing the Application:**
    Once the containers are up and running, you can access the client application via `localhost:8000` and the server via `localhost:3000` in your web browser.

### Additional Docker Commands:

- To stop the running containers:
    ```bash
    npm run docker:stop
    ```

- To start stopped containers:
    ```bash
    npm run docker:start
    ```

- To completely shut down and remove containers:
    ```bash
    npm run docker:down
    ```
