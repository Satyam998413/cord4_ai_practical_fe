# AI Image → Video Generator (Frontend)

This is the frontend application for the AI Image to Video Generator project.  
It allows users to enter a prompt, generate an AI image, and then generate a short AI video from that image.

## Tech Stack

- React.js (Functional Components + Hooks)
- Tailwind CSS
- Axios / Fetch API
- Vite
- Deployed on Vercel

## Features

- Prompt-based image generation
- Image preview
- Image → Video generation
- Video preview
- Loading state handling
- Minimal ChatGPT-style UI

## Project Structure

src/
├── components/
│   └── AIDashboard.jsx
├── App.jsx
├── main.jsx
└── index.css

## Environment Variables

Create a `.env` file in the root:

VITE_API_URL=http://localhost:5000/api

(For production, this should point to the deployed backend URL.)

## Running Locally

```bash
npm install
npm run dev
