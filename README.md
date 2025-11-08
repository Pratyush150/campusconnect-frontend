<div align="center">

# 🎓 CampusConnect Frontend

### **Modern React Frontend for Campus Social Networking**

![React](https://img.shields.io/badge/React-19.1-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

</div>

---

## 📖 Overview

The **frontend application** for CampusConnect - a modern, feature-rich social networking platform built with React 19, Vite, and a powerful UI component ecosystem.

### ✨ Key Features

- 🎨 **Modern UI** - Chakra UI + Mantine + Material-UI components
- 🔄 **Real-time Updates** - Socket.io integration
- 📱 **Fully Responsive** - Mobile-first design
- 🎭 **Beautiful Animations** - Framer Motion
- 📊 **Data Management** - TanStack React Query
- 🔐 **Form Validation** - Zod + React Hook Form
- 📸 **Media Upload** - Cloudinary integration
- 🔔 **Notifications** - React Toastify + Mantine Notifications
- ♾️ **Infinite Scroll** - Smooth content loading
- 💳 **Payment Integration** - Stripe

---

## 🚀 Tech Stack

### Core
- **React 19.1** - Latest React with concurrent features
- **Vite** - Lightning-fast build tool
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client

### UI Frameworks & Libraries
- **Chakra UI** - Accessible component library
- **Mantine** - Feature-rich React components
- **Material-UI** - Google's Material Design
- **Framer Motion** - Production-ready animations
- **Tabler Icons** - Beautiful icon set
- **Heroicons** - Tailwind CSS icons

### State & Data Management
- **TanStack React Query** - Server state management
- **Socket.io Client** - Real-time bidirectional communication
- **React Hook Form** - Performant forms
- **Zod** - TypeScript-first schema validation

### Utilities
- **date-fns** - Modern date utility
- **Cloudinary** - Media management
- **Stripe** - Payment processing

---

## 📦 Installation

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup

```bash
# Clone repository
git clone https://github.com/Pratyush150/campusconnect-frontend.git
cd campusconnect-frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API URLs and keys

# Start development server
npm run dev
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Stripe
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Other
VITE_APP_ENV=development
```

---

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 📁 Project Structure

```
campusconnect-frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route pages
│   ├── hooks/           # Custom React hooks
│   ├── contexts/        # React contexts
│   ├── services/        # API services
│   ├── utils/           # Utility functions
│   ├── styles/          # Global styles
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── .env                 # Environment variables
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

---

## 🎨 UI Components

This project uses multiple UI libraries for maximum flexibility:

- **Chakra UI** - For accessible, composable components
- **Mantine** - For advanced components (dates, dropzone, notifications)
- **Material-UI** - For Material Design components
- **Custom Components** - Built with Framer Motion for unique animations

---

## 🔗 Related Repositories

- **Main Project:** [CampusConnect](https://github.com/Pratyush150/CampusConnect) - Full monorepo
- **Backend:** Included in main CampusConnect repository

---

## 🚀 Features in Detail

### Real-time Communication
- Live chat with Socket.io
- Typing indicators
- Online status tracking
- Instant notifications

### Media Management
- Image uploads with Cloudinary
- Drag & drop file upload
- Image optimization
- Preview before upload

### Forms & Validation
- React Hook Form for performance
- Zod schema validation
- Custom error messages
- Auto-save functionality

### Infinite Scroll
- Smooth content loading
- Optimized performance
- Lazy loading images
- Pagination support

---

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 👨‍💻 Author

**Pratyush Vatsa**
- GitHub: [@Pratyush150](https://github.com/Pratyush150)
- Main Project: [CampusConnect](https://github.com/Pratyush150/CampusConnect)

---

## 📝 License

This project is part of the CampusConnect platform.

---

<div align="center">

⭐ **Star this repository if you find it useful!**

Made with ❤️ by [Pratyush Vatsa](https://github.com/Pratyush150)

</div>
