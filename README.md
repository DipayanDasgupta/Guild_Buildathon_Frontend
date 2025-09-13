# InsureAgent Dashboard Frontend

This is the frontend for the "InsureAgent" dashboard, a submission for **Problem Statement 2** of The Guild Buildathon. It's a modern, responsive Next.js (React) application deployed on Vercel.

**Live Application URL:** [https://guild-buildathon-frontend.vercel.app](https://guild-buildathon-frontend.vercel.app)

## ✨ Features

- **Professional UI/UX:** A sleek, dark-themed dashboard designed for insurance agents.
- **Interactive Document Upload:** Features a drag-and-drop file zone for uploading policy documents and images.
- **Real-time API Communication:** Communicates with the live Python/Flask backend to process documents using Gemini AI.
- **Dynamic Results:** Displays the status of the upload and the results from the AI in real-time.
- **Client Management View:** Includes a table to display and search for processed clients.

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Standard CSS (No Tailwind CSS)
- **Deployment:** Vercel

## 🚀 Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later) and npm.

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/DipayanDasgupta/Guild_Buildathon_Frontend.git
    cd Guild_Buildathon_Frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    The application is hardcoded to use the live production backend. No environment variables are needed for local development to work out-of-the-box.

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    The dashboard will be available at `http://localhost:3000`.

