# InsureAgent Dashboard Frontend | The Guild Buildathon

This repository contains the frontend application for the "InsureAgent" dashboard, a complete solution for **Problem Statement 2** of The Guild Buildathon. It is a modern, responsive, multi-page Next.js (React) application deployed on Vercel, designed to be the primary interface for insurance micro-entrepreneurs.

**Live Application URL:** [https://guild-buildathon-frontend.vercel.app](https://guild-buildathon-frontend.vercel.app)
**Live Backend API URL:** [https://guild-buildathon.onrender.com](https://guild-buildathon.onrender.com)

## ✨ Core Features

- **Professional UI/UX:** A sleek, multi-page dashboard inspired by the Turtlemint design aesthetic, built with standard CSS for maximum reliability and performance.
- **Functional Sidebar Navigation:** Uses Next.js App Router for seamless navigation between the Dashboard, Clients, and Documents pages.
- **Interactive Document Upload:**
  - Features a drag-and-drop file zone for uploading policy documents and images.
  - Communicates directly with the live Python/Flask backend to trigger the AI processing pipeline.
  - Displays real-time status updates (e.g., "Processing...", "Success!", "Error").
- **Dynamic Data Visualization:**
  - The "Documents" page fetches and displays a full list of all processed documents from the backend database.
  - Presents AI-generated analytics (summary, category, sentiment, action items) in a clean, interactive modal view.
- **Data-Driven Components:** The "Recent Clients" table on the dashboard fetches its data directly from the live `/api/clients` endpoint.

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js (with App Router)
- **Language:** TypeScript
- **Styling:** Standard CSS (No Tailwind CSS) for stability and performance.
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
    The application is configured to use the live production backend by default. For local development, you can create a `.env.local` file to point to a local backend instance if needed:
    ```.env.local
    NEXT_PUBLIC_RENDER_BACKEND_URL=http://127.0.0.1:5000
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    The dashboard will be available at `http://localhost:3000`.

