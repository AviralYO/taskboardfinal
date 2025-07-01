# 🚀 TaskFlow - Task Management Dashboard

A modern, responsive task management application built with React, Next.js, and TypeScript. Streamline your workflow, organize projects, and boost productivity with an intuitive interface.

![TaskFlow Dashboard](https://via.placeholder.com/800x400/3b82f6/ffffff?text=TaskFlow+Dashboard)

## ✨ Features

### 🎯 Core Functionality
- **Project Management**: Create, edit, and delete projects with custom colors
- **Task Management**: Full CRUD operations with priorities, status, assignees, and due dates
- **Kanban Board**: Drag-and-drop tasks between To Do, In Progress, and Done columns
- **Advanced Filtering**: Filter by project, priority, assignee, and search functionality
- **Data Persistence**: All data saved to localStorage - no data loss on refresh

### 🎨 Design & UX
- **Dark/Light Mode**: Complete theme support with system preference detection
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Smooth Animations**: Hover effects, transitions, and drag-and-drop feedback
- **Color System**: Comprehensive color palette with accessibility considerations

### 🔧 Technical Excellence
- **React Best Practices**: Functional components, custom hooks, proper state management
- **TypeScript**: Full type safety throughout the application
- **Performance Optimized**: Efficient re-renders and optimized bundle size
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **Clean Architecture**: Well-organized components and separation of concerns

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/taskflow-dashboard.git
   cd taskflow-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

## 📱 Usage

### Getting Started
1. **Create a Project**: Start by creating your first project with a name, description, and color
2. **Add Tasks**: Create tasks within projects with titles, descriptions, priorities, and assignees
3. **Organize**: Use the Kanban board to drag tasks between status columns
4. **Filter & Search**: Use the powerful filtering system to find specific tasks
5. **Track Progress**: Monitor project completion with visual progress bars

### Key Features
- **Drag & Drop**: Move tasks between columns seamlessly
- **Quick Edit**: Click any task to edit details instantly  
- **Smart Filters**: Combine multiple filters for precise task management
- **Dark Mode**: Toggle between light and dark themes
- **Responsive**: Works on all device sizes

## 🎨 Color Palette

Visit `/colors` in the application to see the complete color system with:
- Primary blues for main interface elements
- Success greens for completed tasks
- Warning yellows for medium priority items
- Danger reds for high priority tasks
- Purple accents for secondary actions

## 🏗️ Project Structure

\`\`\`
taskflow-dashboard/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── projects/          # Projects page  
│   ├── colors/           # Color palette page
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
│   ├── ui/              # shadcn/ui components
│   ├── task-dialog.tsx  # Task creation/editing
│   ├── project-dialog.tsx # Project management
│   └── theme-toggle.tsx # Dark mode toggle
├── hooks/               # Custom React hooks
│   └── use-local-storage.ts
└── lib/                # Utility functions
    └── utils.ts
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/taskflow-dashboard)

### Other Options
- **Netlify**: Connect your GitHub repo for automatic deployments
- **Docker**: Use the included Dockerfile for containerized deployment
- **Static Export**: Configure for GitHub Pages or any static host

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🛠️ Development

### Available Scripts
\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
\`\`\`

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React hooks + localStorage
- **Drag & Drop**: @hello-pangea/dnd
- **Icons**: Lucide React
- **Theme**: next-themes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention
This project uses conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Lucide](https://lucide.dev/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Next.js](https://nextjs.org/) for the React framework

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the [deployment guide](./DEPLOYMENT.md)
- Review the [color palette](http://localhost:3000/colors) for design consistency

---

**Built with ❤️ for productive teams everywhere**

🌟 **Star this repo if you found it helpful!**
