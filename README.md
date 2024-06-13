# Node.js and Express.js and MongoDB API Starter Kit

This project is a starter kit for building APIs with Node.js and Express.js. It provides a basic setup including user authentication, routing, and a connection to MongoDB.

## Features

- User Registration and Login with JWT Authentication
- MongoDB Integration with Mongoose
- Middleware for Authentication
- Basic Error Handling
- Testing with Jest and Supertest

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)
- MongoDB (Local or Atlas)

## Getting Started

### Installation

1. Clone the repository:

```sh
   git clone https://github.com/yourusername/api-starter-kit.git
   cd api-starter-kit
```

2. Install the dependencies:

```sh
   npm install
```

3. Create a `.env` file in the root of the project and add the following environment variables:

```plaintext
  JWT_SECRET=your_jwt_secret_key
  mongoURI=your_mongo_database_uri
```

### Running the Server

To start the server in development mode:

```sh
npm run dev
```

The server will start on `http://localhost:3100`.

### API Endpoints

- `GET /` - Get the Hello World!
- `GET /api/users/profile` - Get the user profile (protected)
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Log in a user

### Testing

The project uses Jest and Supertest for testing. To run the tests:

```sh
npm test
```

### Project Structure

```
api-starter-kit/
│
├── src/
│   ├── controllers/
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── user.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── error.js
│   ├── app.js
│   └── server.js
│
├── test/
│   └── user.test.js
│   └── app.test.js
│
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── npx-create-api-starter-kit.js
```

### Example Usage

1. **Register a new user:**

```sh
  curl -X POST http://localhost:3100/api/users/register -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "johndoe@example.com", "password": "password123"}'
```

2. **Log in:**

```sh
   curl -X POST http://localhost:3100/api/users/login -H "Content-Type: application/json" -d '{"email": "johndoe@example.com", "password": "password123"}'
```

3. **Get user profile (requires token):**

```sh
   curl -H "Authorization: Bearer your_jwt_token" http://localhost:3100/api/users/profile
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Explanation

- **Introduction and Features:** Provide a brief overview of the project and its features.
- **Prerequisites:** List the software required to run the project.
- **Getting Started:** Include steps for cloning the repository, installing dependencies, and setting environment variables.
- **Running the Server:** Provide instructions for starting the server.
- **API Endpoints:** List the available API endpoints.
- **Testing:** Explain how to run the tests.
- **Project Structure:** Describe the project's directory structure.
- **Example Usage:** Give examples of how to use the API endpoints with `curl`.
- **Contributing and License:** Invite contributions and include licensing information.

This `README.md` file should help users understand how to set up and use your Node.js and Express.js API starter kit effectively.
