# 🧠 InsiderJobs – Full Stack Job Portal

**InsiderJobs** is a full-stack job portal where **users** can register, browse, and apply for jobs, while **companies** can post and manage openings.  
Built with the **MERN stack**, featuring modern authentication, cloud integration, and a responsive UI.

---

## 🌟 Table of Contents
- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Setup Instructions](#-setup-instructions)
- [Environment Variables](#-environment-variables)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Author](#-author)

---

## 📋 Overview

InsiderJobs streamlines the hiring process by connecting job seekers and companies.  
- 👨‍💼 **Job Seekers:** Register, update profiles, and apply to jobs.  
- 🏢 **Companies:** Post, edit, and manage job listings.  
- 🔒 **Authentication:** Powered by Clerk.  
- ☁️ **Storage:** Cloudinary for secure file handling.

---

## 🛠️ Tech Stack

### **Frontend**
- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 🔑 Clerk (Authentication)
- 🌐 Axios
- 🖋️ Quill (Rich Text Editor)
- 🧭 React Router DOM
- 🔔 React Toastify
- 🕓 Moment.js

### **Backend**
- 🧱 Express.js
- 🍃 MongoDB + Mongoose
- 🔐 Clerk Express & JWT
- ☁️ Cloudinary + Multer
- 🧂 dotenv
- 🧮 bcrypt
- 🧰 Sentry, Nodemon

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
git clone https://github.com/yourusername/InsiderJobs.git  
cd InsiderJobs

### 2️⃣ Install dependencies
cd client && npm install  
cd ../server && npm install

### 3️⃣ Run the app
# Start backend  
npm run server  

# Start frontend  
cd client  
npm run dev

---

## 🔐 Environment Variables

### Server `.env`
PORT=5000  
MONGO_URI=your_mongodb_url  
JWT_SECRET=your_secret  
CLOUDINARY_CLOUD_NAME=your_cloud_name  
CLOUDINARY_API_KEY=your_api_key  
CLOUDINARY_API_SECRET=your_api_secret  
CLERK_SECRET_KEY=your_clerk_secret  
SVIX_SECRET=your_svix_secret

### Client `.env`
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key  
VITE_API_URL=http://localhost:5000

---

## ✨ Features

- 👤 User & Company Authentication (Clerk)  
- 🧾 Job Posting & Application System  
- 🖋️ Rich Job Descriptions (Quill)  
- ☁️ Cloud Uploads (Cloudinary)  
- 🔔 Toast Notifications  
- 📱 Fully Responsive UI  
- 💾 MongoDB Integration  

---

## 📂 Project Structure

InsiderJobs/  
├── client/      # React + Vite frontend  
├── server/      # Express + MongoDB backend  
└── README.md  

---

## 🚀 Deployment

- **Frontend:** Vercel / Netlify  
- **Backend:** Render / Railway  
- **Database:** MongoDB Atlas  

---

## 👨‍💻 Author

**Durgesh Chaurasia**  
💼 [LinkedIn](https://linkedin.com/in/yourprofile)  
🌐 [Portfolio](https://yourportfolio.com)  
⭐ If you like this project, give it a star on GitHub!

---
