# TaskManager 📝

Modern task management application built with React, TypeScript, and Tailwind CSS. Features user authentication, dark mode, and a beautiful UI with smooth animations.

## ✨ Features

### Core Functionality

- **User Authentication** - Secure registration and login system
- **Task Management** - Create, edit, delete, and mark tasks as complete
- **Priority Levels** - Organize tasks by Low, Medium, and High priority
- **Tags System** - Categorize tasks with Work and Personal tags
- **Advanced Filtering** - Filter by priority, status (active/completed), and tags
- **Progress Tracking** - Visual progress bar showing completion percentage

### UI/UX

- **Dark Mode** - Toggle between light and dark themes with persistent storage
- **Smooth Animations** - Powered by Framer Motion for delightful interactions
- **Toast Notifications** - Real-time feedback for all actions
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Modern Design** - Clean interface with Tailwind CSS and FontAwesome icons

### Technical Features

- **RESTful API** - Backend powered by json-server
- **Local Storage** - Persistent theme and filter preferences
- **Type Safety** - Full TypeScript implementation
- **User Isolation** - Each user sees only their own tasks

## 🚀 Live Demo

- **Frontend**: [\[Vercel URL\]](https://task-manager-mocha-phi.vercel.app/)
- **Backend API**: [\[Render URL\]](https://taskmanager-server-ua0a.onrender.com/)

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **React Router DOM** - Navigation
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **React Toastify** - Notifications
- **FontAwesome** - Icons

### Backend

- **json-server** - REST API mock server
- **Node.js** - Runtime environment

### Development Tools

- **ESLint** - Code linting
- **Concurrently** - Run multiple scripts
- **TypeScript ESLint** - TypeScript linting

## 📦 Installation

### Prerequisites

- Node.js >= 14.0.0
- npm or yarn

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/TaskManager.git
cd TaskManager
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

This will start both the Vite dev server (port 5173) and json-server (port 3001).

4. **Open in browser**

```
http://localhost:5173
```

## 📜 Available Scripts

- `npm run dev` - Start development server with json-server
- `npm run vite` - Start only Vite dev server
- `npm run server` - Start only json-server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variable: `VITE_API_URL=<your-render-api-url>`
4. Deploy

### Backend (Render.com)

See separate repository: [TaskManager-Server](https://github.com/blessedSir/TaskManager-Server)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001
```

For production, set this to your deployed API URL.

## 📁 Project Structure

```
TaskManager/
├── src/
│   ├── components/      # React components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── TaskForm.tsx
│   │   └── TaskItem.tsx
│   ├── pages/          # Page components
│   │   ├── AuthPage.tsx
│   │   └── TaskPage.tsx
│   ├── types/          # TypeScript types
│   │   └── Task.ts
│   ├── utils/          # Utility functions
│   │   └── api.ts
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── db.json             # json-server database
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## 🔐 API Endpoints

### Authentication

- `GET /users?email=<email>&password=<password>` - Login
- `POST /users` - Register new user

### Tasks

- `GET /tasks?userId=<userId>` - Get user's tasks
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## 🎨 Features in Detail

### Task Properties

- **Title** - Task description
- **Priority** - Low, Medium, or High
- **Tags** - Work or Personal
- **Completed** - Boolean status
- **User ID** - Owner reference

### Filters

- Filter by priority level
- Filter by completion status
- Filter by tags
- Filters persist in localStorage

### Theme

- Light and dark mode
- Synced across login and task pages
- Saved to localStorage

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

Sergey Levkovskiy

- GitHub: [@blessedSir](https://github.com/blessedSir)
- LinkedIn: [Profile](https://linkedin.com/in/blessedsir/)

## 🙏 Acknowledgments

- React team for the amazing library
- Tailwind CSS for the utility-first CSS framework
- json-server for easy API mocking
- Vercel and Render for free hosting
