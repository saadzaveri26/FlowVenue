# FlowVenue: Smart Stadium Kinetic Command Center

🚀 **Live Application:** [https://flowvenue-177261323794.us-central1.run.app/](https://flowvenue-177261323794.us-central1.run.app/)

FlowVenue is a next-generation web application designed for large-scale sporting and event venues. Moving away from standard flat dashboards, FlowVenue utilizes a "Kinetic Command Center" aesthetic—an authoritative, hyper-modern interface providing deep visibility into stadium operations for both attendees and staff.

## Features

- 🏟️ **Venue Live Map:** A high-end interactive stadium overview showing live heatmaps, user location, and optimal navigation paths.
- ⏳ **Real-Time Queues & Flow:** Live capacity tracking for gates, food stands, restrooms, and merchandise stores, with dynamic wait time estimations and density trend indicators.
- 🤖 **AI Co-pilot (Powered by Gemini):** An integrated stadium context-aware assistant. The AI dynamically pulls live queue data and wait times to answer user questions instantly ("Where's the quickest food?", "Which gate is least crowded?").
- 🚨 **Staff Command Dashboard:** A secure triage center providing operators with critical anomaly detection (e.g., Bottlenecks, Capacity Breaches), overall stadium occupancy, and 1-click broadcasts for staff deployment.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 (Custom Design System with Glassmorphism)
- **AI Integration:** Google Gemini 2.5 Pro via API
- **State Management:** React Context (Simulating Real-Time Firebase Database)
- **Deployment:** Google Cloud Run (Docker Containerized)

## Running Locally

To run the application locally on your machine:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Environment Variables:**
   Create a `.env.local` file and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

## Deployment (Google Cloud Run)

This project has been heavily optimized for Google Cloud Run deployment via Buildpacks / Docker standalone output. 

To deploy a new version via the Google Cloud CLI:
```bash
gcloud run deploy flowvenue --source . --region us-central1 --allow-unauthenticated --set-env-vars GEMINI_API_KEY="YOUR_ACTUAL_API_KEY"
```
