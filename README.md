# EnxtAI Mini Financial App 📈

A full-stack financial trading application built with the MERN stack, designed to showcase modern web development practices from a secure backend API to a polished, reactive frontend.

This project was built as a part of the Full-Stack Developer assignment for EnxtAI. It demonstrates the ability to design secure APIs, manage application state, and create an intuitive user experience.

---

### 🎥 Video Walkthrough

[**Link to your 3-5 minute demo video will go here!**]

---

## ✨ Key Features

- **Secure User Authentication**: Full registration and login flow using JWTs for secure, stateless authentication.
- **Dynamic Portfolio Dashboard**: A central hub for users to view their financial standing at a glance, including:
  - Total amount invested, current portfolio value, and profit/loss.
  - Remaining virtual wallet balance.
- **Live Trading Simulation**: Users can "buy" stocks and mutual funds from a pre-seeded list, with transactions impacting their wallet in real-time.
- **Interactive Watchlist**: Add interesting products to a personal watchlist and remove them as needed.
- **Product Details**: Dive deeper into each investment product on a dedicated page with more information.
- **Modern UI/UX**: A clean, responsive, and intuitive interface built with React and Tailwind CSS, featuring toast notifications for a smooth user experience.

---

## 🛠️ Tech Stack

| Backend                                                                                                        | Frontend                                                                                                                |
| -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)       | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)                      |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                         |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)       | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| Mongoose                                                                                                       | React Router                                                                                                            |
| JSON Web Token (JWT)                                                                                           | Axios                                                                                                                   |

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later is recommended)
- A MongoDB Atlas account or a local MongoDB server instance.

### 1. Setting Up the Backend

```bash
# 1. Navigate to the backend directory
cd enxtai-backend

# 2. Install dependencies
npm install

# 3. Create a .env file in this directory and add your variables:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=a_very_strong_secret_for_your_tokens
# PORT=5001

# 4. Start the server
npm start
```

Your backend API should now be running on `http://localhost:5001`.

### 2. Setting Up the Frontend

_Open a new terminal for this step._

```bash
# 1. Navigate to the frontend directory
cd enxtai-frontend

# 2. Install dependencies
npm install

# 3. Start the React development server
npm run dev
```

Your frontend should now be running on `http://localhost:5173`. Open this URL in your browser to use the app!
