# Kareem Ayman Ghabayen — Personal Portfolio 🚀

Welcome to my personal full-stack portfolio website. This project is built using a modern, high-performance, and **Data-Driven Architecture** that decouples content from the presentation layer.

## 🛠️ Tech Stack & Architecture

- **Frontend Core:** React (Vite)
- **Styling & UI/UX:** Custom CSS Tokens (Premium Dark Minimalist Theme with glassmorphism and scroll-reveal effects)
- **Content Management:** Decoupled Architecture utilizing a zero-dependency custom Markdown (`.md`) parser to dynamically fetch and inject resume/project data seamlessly.

## 📂 Project Structure

- `public/data/` — Contains all content files (`about.md`, `education.md`, and project case studies).
- `src/utils/mdParser.js` — Core lightweight parser separating YAML front-matter from the Markdown body.
- `src/hooks/useMarkdown.js` — Custom React hooks handling dynamic data fetching.
- `src/App.jsx` — The core UI hub styled with precise UX/UI principles.

## 🚀 How to Run Locally

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the local server: `npm run dev`
🔗 **Live Demo:** [kareem-portfolio-steel.vercel.app](https://kareem-portfolio-steel.vercel.app)