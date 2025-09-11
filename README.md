# 🎥 Meeting.in - Video Conference App

> **Modern video conferencing made simple** | [Live Demo](https://meeting-in.vercel.app/)

A feature-rich video conference application built with Next.js 15, TypeScript, and Stream's real-time technology. This project demonstrates modern web development practices and real-time communication implementation.

**🎯 Inspired by**: [JavaScript Mastery Tutorial](https://www.youtube.com/watch?v=R8CIO1DZ2b8)

---

## ✨ Features

🔐 **Secure Authentication** - Complete user auth system with Clerk  
⚡ **Instant Meetings** - Create and join rooms in seconds  
📅 **Smart Scheduling** - Plan meetings for future dates  
🏠 **Personal Rooms** - Each user gets a unique meeting space  
📹 **Meeting Recording** - Record and replay sessions  
🎛️ **Flexible Layouts** - Switch between grid and speaker view  
🚀 **Real-time Communication** - Ultra-low latency with Stream Video SDK

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15.5.0 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Shadcn UI |
| **Authentication** | Clerk |
| **Video/Real-time** | Stream Video React SDK |
| **State Management** | React Hooks |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd meeting-in
npm install
```

### 2. Environment Setup
Create `.env.local`:
```env
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stream Configuration
NEXT_PUBLIC_STREAM_API_KEY=...
STREAM_SECRET_KEY=...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```
🌐 Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
meeting-in/
├── app/                 # Next.js App Router
├── components/          # Reusable UI components
├── providers/           # Context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── public/              # Static assets
```

---

## 🎯 Key Learning Outcomes

- ✅ **Modern React Patterns** - Hooks, Context API, Server Components
- ✅ **Real-time Applications** - WebRTC, Stream SDK integration
- ✅ **Authentication Flow** - Secure user management with Clerk
- ✅ **Responsive Design** - Mobile-first approach with Tailwind
- ✅ **TypeScript Best Practices** - Type safety and developer experience
- ✅ **Next.js App Router** - Latest routing and data fetching patterns

---

## 🙏 Credits

This project was built following the excellent tutorial by [**JavaScript Mastery**](https://www.youtube.com/watch?v=R8CIO1DZ2b8). Special thanks for providing comprehensive guidance on modern web development practices.

---

## 🔗 Links

- 🌐 **Live Demo**: [meeting-in.vercel.app](https://meeting-in.vercel.app/)
- 📺 **Tutorial**: [YouTube - JavaScript Mastery](https://www.youtube.com/watch?v=R8CIO1DZ2b8)
- 📚 **Documentation**: [Stream Video SDK](https://getstream.io/video/docs/)

---

<div align="center">

**Made with ❤️ using Next.js & Stream**

[⭐ Star this repo](https://github.com/yourusername/meeting-in) if you found it helpful!

</div>
