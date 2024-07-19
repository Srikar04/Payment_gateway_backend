# Payment Gateway Service

## Tech Stack

- Node JS with MySQL database
- Swagger UI (API Documentation) at /docs endpoint
- Dockerized setup for both application and database
- Prisma ORM
- CI/CD pipeline with GitHub Actions
- Hosted on AWS EC2

## Prerequisites

1. **Docker:**  Ensure Docker is installed on your system.
2. Docker Compose : Ensure Docker Compose is installed on your system.
3. AWS Account: For deploying on EC2.

# Setup and Installation

## Clone the Repository

```java
git clone https://github.com/Srikar04/Payment_gateway_backend.git
cd Payment_gateway_backend
```

## Environment Configuration

Create a `.env` file in the root directory of the project with the following content:

```java
PORT=3000
DATABASE_URL="mysql://root:password@localhost:3306/payment_gateway"
```

Replace `password` with the root password for your MySQL database.

## Docker Setup

1. **Build and Run Containers**
    
    Build and start the Docker containers using Docker Compose:
    
    ```java
    docker-compose up --build
    ```
    
2. **Access the Application**
    
    The application will be available at `http://localhost:3000`
    

## Running migrations

Ensure your `package.json` includes the following scripts:

```java
"scripts": {
  "start": "npx prisma migrate deploy && node index.js",
  "migrate": "npx prisma migrate deploy"
}
```

Run the following command to apply migrations:

```java
npm run migrate
```

## GitHub Actions CI/CD

The project uses GitHub Actions for CI/CD. The workflow is defined in `.github/workflows/ec2-deploy.yml` and performs the following tasks:

1. **Builds**: Creates and pushes Docker image for the application.
2. **Deploys**: Deploys the Docker image to an AWS EC2 instance using a self-hosted runner.

### Deployment on AWS EC2

1. **EC2 Setup**
    - Ensure Docker and Docker Compose are installed on the EC2 instance.
    - Add the EC2 user to the Docker group:
        
        ```java
        sudo usermod -aG docker $USER
        ```
        
    - Restart Docker and the GitHub Actions runner:
        
        ```java
        sudo systemctl restart docker
        sudo systemctl restart actions.runner.<your-runner-name>.service
        ```
    
    - Refer to this website for better idea [Link](https://medium.com/@rahulvikhe25/deployment-of-node-js-application-on-ec2-with-ci-cd-using-github-actions-and-docker-container-46c3efa2905f)!
        
2. **Docker compose file**
    
    Ensure your `docker-compose.yml` file is correctly set up on the EC2 instance:
    
    ```java
    version: '3.6'
    
    services:
      app:
        image: srikar9/paymentgateway-app:latest
        ports:
          - "3000:3000"
        depends_on:
          - db
        environment:
          PORT: 3000
          DATABASE_URL: "mysql://root:password@db:3306/payment_gateway"
        volumes:
          - .:/usr/src/app
    
      db:
        image: mysql:latest
        restart: always
        environment:
          MYSQL_ROOT_PASSWORD: password
          MYSQL_DATABASE: payment_gateway
        volumes:
          - mysql_data:/var/lib/mysql
    
    volumes:
      mysql_data:
    ```
    

1. **Accessing the Application**
    
    After deployment, you can access the application via the public URL of your EC2 instance at `http://<ec2-public-ip>:3000`.