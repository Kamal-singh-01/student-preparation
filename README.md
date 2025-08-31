# PrepStudent - AI-Powered Learning Platform

PrepStudent is an AI-powered learning platform designed to help students master various subjects through interactive tutoring, math problem-solving, science concepts, and essay writing assistance. This project is structured as a monorepo, with a React frontend and a Node.js/Express backend.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation (Local Development)](#installation-local-development)
- [Deployment](#deployment)
  - [Backend (Render)](#backend-render)
  - [Frontend (Netlify)](#frontend-netlify)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **AI Tutoring**: Master any subject with AI-driven explanations and feedback.
- **Math Problem Solving**: Step-by-step solutions with detailed explanations.
- **Science Concepts**: Interactive explanations of complex theories.
- **Essay Writing**: Get assistance with grammar, structure, and style improvements.
- **User Authentication**: Secure signup and login powered by Firebase.

## Project Structure

This project is a monorepo containing two main applications:

- `backend/`: Node.js/Express application, serving as the API.
- `frontend/`: React application, serving as the user interface.

```
PrepStudent/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and Gemini AI configuration
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   └── index.js         # Backend entry point
│   └── package.json         # Backend dependencies and scripts
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # React contexts (e.g., AuthContext)
│   │   ├── firebase/        # Firebase configuration and authentication logic
│   │   ├── lib/             # Utility functions (e.g., Axios instance)
│   │   └── main.jsx         # Frontend entry point
│   ├── package.json         # Frontend dependencies and scripts
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   ├── postcss.config.js    # PostCSS configuration for Tailwind
│   └── netlify.toml         # Netlify deployment configuration
├── package.json             # Monorepo root package.json (for shared scripts, if any)
└── README.md                # Project README
```

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v18 or higher) and npm installed.
- MongoDB Atlas account (or a local MongoDB instance).
- Firebase Project configured for Authentication.
- Google Gemini API Key.

### Installation (Local Development)

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Kamal-singh-01/student-preparation.git
    cd student-preparation
    ```

2.  **Install Backend Dependencies:**

    ```bash
    cd backend
    npm install
    cd ..
    ```

3.  **Install Frontend Dependencies:**

    ```bash
    cd frontend
    npm install
    cd ..
    ```

4.  **Create `.env` files:**

    In `backend/`, create a `.env` file and add the following:

    ```
    PORT=3000
    MONGODB_URI=your_mongodb_atlas_connection_string
    GEMINI_API_KEY=your_google_gemini_api_key
    FRONTEND_URL=http://localhost:5173
    ```

    In `frontend/`, your environment variables are handled by Vite, and are typically prefixed with `VITE_`. You will configure these in Netlify for deployment. For local development, you might use a `.env.local` or similar, or directly define them if using a tool like `dotenv` for client-side (though Vite handles this).

5.  **Run Locally:**

    To start both frontend and backend concurrently (you'll need `concurrently` or similar, or run them in separate terminals):

    **In `backend/` directory:**

    ```bash
    npm run dev
    ```

    **In `frontend/` directory:**

    ```bash
    npm run dev
    ```

    The frontend should be accessible at `http://localhost:5173` and the backend at `http://localhost:3000`.

## Deployment

### Backend (Render)

1.  **Connect to Git:** Link your `student-preparation` GitHub repository to a new Web Service on Render.
2.  **Root Directory:** Set this to `backend`.
3.  **Build Command:** `npm install`
4.  **Start Command:** `npm start`
5.  **Environment Variables (on Render):**
    - `PORT`: `3000` (or desired port)
    - `MONGODB_URI`: Your MongoDB Atlas connection string.
    - `GEMINI_API_KEY`: Your Google Gemini API Key.
    - `FRONTEND_URL`: `https://your-netlify-frontend-url.netlify.app` (e.g., `https://studentpreparation.netlify.app`)

### Frontend (Netlify)

1.  **Connect to Git:** Link your `student-preparation` GitHub repository to a new site on Netlify.
2.  **Base Directory:** Set this to `frontend`.
3.  **Build Command:** `npm run build`
4.  **Publish Directory:** `dist`
5.  **Environment Variables (on Netlify):**
    - `VITE_BACKEND_URL`: Your deployed Render backend URL (e.g., `https://your-backend-name.onrender.com/`)
    - `VITE_FIREBASE_API_KEY`: Your Firebase API Key.
    - `VITE_FIREBASE_AUTH_DOMAIN`: Your Firebase Auth Domain.
    - `VITE_FIREBASE_PROJECT_ID`: Your Firebase Project ID.
    - `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase Storage Bucket.
    - `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase Messaging Sender ID.
    - `VITE_FIREBASE_APP_ID`: Your Firebase App ID.
    - `VITE_FIREBASE_MEASUREMENT_ID`: Your Firebase Measurement ID.

## Environment Variables

Ensure all necessary environment variables are set for both local development and deployment environments as described above.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
