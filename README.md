# CourseGPT

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Backend CI](https://img.shields.io/github/actions/workflow/status/HARSHSINGH3118/Course-GPT/backend-ci.yml?branch=main)](https://github.com/HARSHSINGH3118/Course-GPT/actions)
[![Frontend CI](https://img.shields.io/github/actions/workflow/status/HARSHSINGH3118/Course-GPT/frontend-ci.yml?branch=main)](https://github.com/HARSHSINGH3118/Course-GPT/actions)

CourseGPT is an AI-powered course authoring tool that empowers educators to rapidly create, organize, and enhance educational content. Leveraging a modern MERN stack backend and a responsive React/Vite frontend, CourseGPT integrates with AI providers to generate lesson plans, tutorials, and more from customizable templates.

---

## 🚀 Features

* **User Authentication**: Secure JWT-based login & registration.
* **Course Management**: Create, view, and edit courses with rich content.
* **AI-Assisted Generation**: Plug-and-play templates with placeholder variables (e.g., `{{topic}}`) for dynamic content generation.
* **Template Library**: Predefined and custom templates for lesson plans, quizzes, and summaries.
* **Modern UI**: Responsive layout with sidebar navigation, cards, and editing modals.

---

## 🛠 Tech Stack

* **Backend**: Node.js, Express, MongoDB, Mongoose, Cohere AI (or Hugging Face)
* **Frontend**: React, Vite, React Router, Tailwind CSS, React Icons
* **Auth**: bcryptjs, JSON Web Tokens (JWT)
* **Styling**: TailwindCSS

---

## 📸 Demo

 ![image](https://github.com/user-attachments/assets/1b257dd4-46af-47a0-b32f-c46c98487cc0)
 ![image](https://github.com/user-attachments/assets/b7b20c6f-b1c6-40b2-98bc-79ae25aa04a5)



---

## 💻 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) v14 or higher
* [MongoDB](https://www.mongodb.com/) Atlas or local instance
* [Cohere](https://dashboard.cohere.ai/) or [Hugging Face](https://huggingface.co/) API key

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/HARSHSINGH3118/Course-GPT.git
cd Course-GPT

# 2. Backend setup
cd backend
npm install
cp .env.example .env       # copy and update .env with your credentials
npm run dev                 # runs with nodemon on port 5000

# 3. Frontend setup
cd ../frontend
npm install
npm run dev                 # start Vite dev server on port 5173
```

### Configuration

Copy and update `backend/.env.example`:

```ini
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
COHERE_API_KEY=<your_cohere_api_key>
# or HF_API_TOKEN=<your_huggingface_token>
PORT=5000
```

---

## 🗂️ Folder Structure

```
Course-GPT/
├── backend/              # Express + MongoDB + AI integration
│   ├── config/           # Database connection
│   ├── controllers/      # Route logic
│   ├── middleware/       # Auth middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routers
│   ├── scripts/          # Seed & utility scripts
│   ├── server.js         # Entry point
│   └── .env.example      # Env vars template
└── frontend/             # React + Vite + Tailwind UI
    ├── public/
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── context/      # React context for Auth
    │   ├── pages/        # Route-level pages
    │   ├── services/     # API helper
    │   ├── App.jsx       # App entry & routing
    │   └── main.jsx      # Mount React
    └── index.html        # HTML template
```

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "feat: add my feature"`)
4. Push to branch (`git push origin feature/my-feature`)
5. Open a Pull Request

Please adhere to the existing code style and include tests/validation as needed.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📧 Contact

Created by **Harsh Singh** – [GitHub](https://github.com/HARSHSINGH3118) | [Email](mailto:youremail@example.com)
