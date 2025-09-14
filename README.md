# Insure-Agent AI Dashboard | The Guild Buildathon

This repository contains the frontend application for the "Insure-Agent AI" platform, a complete solution for **Problem Statement 2** of The Guild Buildathon. It is a modern, responsive, multi-page Next.js (React) application deployed on Vercel, designed as the primary interface for the intelligent insurance agent.

**Live Application URL:** [https://guild-buildathon-frontend.vercel.app](https://guild-buildathon-frontend.vercel.app)
**Live Backend API URL:** [https://guild-buildathon.onrender.com](https://guild-buildathon.onrender.com)

## ✨ Core Features

- **Smart AI Form Filling Flow:**
  - Users upload a KYC or policy document on the dashboard.
  - The app calls the backend, which uses Gemini AI to extract all relevant data.
  - The user is automatically redirected to a dedicated `/onboarding` page where the entire client form is pre-filled with the AI-extracted data for verification.

- **Fully Functional Client CRM:**
  - The "Clients" section in the sidebar features dropdowns to filter clients by status (`Active`, `Engaged`, `Prospective`).
  - The main clients page is a powerful dashboard with dynamic filtering, searching, and the ability to add new clients via a modal form or delete existing ones.

- **Automatic Reconciliation Dashboard:**
  - A dedicated page for uploading bank and policy PDFs.
  - After the backend's AI engine processes the files, the frontend displays a clear summary of matched transactions and highlights the exceptions that require manual review.

- **Dynamic & Responsive UI/UX:**
  - A professional, mobile-first design that looks great on all devices.
  - Features a collapsible sidebar for enhanced screen real-estate.
  - Includes a user-friendly light/dark mode theme toggle.
  - The dashboard is powered by real-time data from the backend, including a conversions chart and a list of today's follow-ups.

- **AI Chatbot Assistant:**
  - An integrated, pop-out chatbot powered by the Gemini API.
  - The chatbot is context-aware and can answer user questions about how to use the application's features.

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js (with App Router)
- **Language:** TypeScript
- **Styling:** Standard CSS for maximum reliability and performance.
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Deployment:** Vercel

