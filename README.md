# Nexus: The Digital Second Brain

<p align="center">
  <a href="https://nexus-the-digital-second-brain.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live-Demo-6a5af9?style=for-the-badge&logo=vercel" alt="Live Demo"/>
  </a>
</p>

![Nexus Dashboard Screenshot](Brainlyfrontend/public/brainlyy.jpeg)

**Nexus** is a modern, full-stack MERN application designed to be your "Second Brain"—a digital space to capture, organize, and rediscover your most important information. From tweets and YouTube videos to personal documents and links, Nexus provides an intelligent and beautiful interface to manage your digital life.

This project is built with a focus on a professional, industry-level user experience, featuring a dynamic, animated UI, robust backend services, and a seamless deployment pipeline.

---

### ✨ Key Features

* **Multi-Content Organization:** Save and categorize different types of content, including Tweets, YouTube videos, documents, and external links.
* **Dynamic Content Embedding:** Automatically embeds playable YouTube videos and interactive tweets directly into content cards for a rich user experience.
* **Intelligent Filtering & Tagging:** Organize your notes with custom tags and filter your dashboard view by content type or by specific tags.
* **Secure Authentication:** A complete user authentication system with JWT-based sign-up and sign-in flows.
* **Cloud Deployed:** Fully deployed with a professional MERN stack workflow (Vercel, Render, MongoDB Atlas).
* **Modern, Animated UI:** Built with Framer Motion, the UI features fluid animations, a 3D interactive login screen, and a polished design system created with Tailwind CSS.
* **Sharing Functionality:** Generate unique, shareable links to your entire "brain" to showcase your curated content.

---

### 🚀 Tech Stack

The application is built using the MERN stack with a modern, type-safe toolchain.

**Frontend:**
<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion"/>
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js"/>
</p>

**Backend:**
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
</p>

---

### 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

#### **Prerequisites**

* Node.js (v18 or later recommended)
* npm or yarn
* A local MongoDB instance (or a free MongoDB Atlas account)

#### **Installation & Setup**

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/SHAHZEB28/Nexus-The_Digital_Second_Brain.git](https://github.com/SHAHZEB28/Nexus-The_Digital_Second_Brain.git)
    cd Nexus-The_Digital_Second_Brain
    ```

2.  **Setup the Backend:**
    * Navigate to the backend directory: `cd Brainlybackend`
    * Install dependencies: `npm install`
    * Create a `.env` file and add your `DATABASE_URL` and `JWT_PASSWORD`.
    * Start the server: `npm run dev`
    * The backend will be running on `http://localhost:3000`.

3.  **Setup the Frontend:**
    * Navigate to the frontend directory: `cd ../Brainlyfrontend`
    * Install dependencies: `npm install`
    * Start the development server: `npm run dev`
    * Open your browser and go to `http://localhost:5173` (or whatever port is specified).

---

### 🌐 Deployment

This project is configured for a seamless deployment experience:
* The **backend** is ready to be deployed as a Web Service on **Render**.
* The **frontend** is optimized for deployment on **Vercel**, with a `vercel.json` file for proxying API requests.
