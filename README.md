# 📓 AI-Powered Journal App

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.15.0-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=flat&logo=openai&logoColor=white)](https://openai.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=flat&logo=clerk&logoColor=white)](https://clerk.dev/)
![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-blueviolet?style=flat-square&logo=github)

## 🌟 Overview

**AI-Powered Journal App** is an intelligent journaling application that combines traditional diary writing with cutting-edge AI analysis. Built with modern web technologies, this app helps users track their thoughts, emotions, and daily experiences while providing insightful AI-driven analysis of their mental state and writing patterns.

### ✨ What Makes This Special?

This journal app goes beyond simple text entry by leveraging **OpenAI's GPT-4** to provide:

- 🧠 **Intelligent Mood Analysis** - Automatically detects and categorizes your emotional state
- 📊 **Content Summarization** - Generates concise summaries of your entries
- 🎨 **Visual Mood Representation** - Color-coded mood indicators for quick emotional tracking
- 🤖 **Q&A System** - Ask questions about your past entries and get AI-powered insights
- 🔄 **Real-time Updates** - Automatic analysis updates as you write

## 🛠️ Technology Stack

### **Frontend**

- **⚛️ React 19.1.0** - Modern UI library with latest features
- **🔷 Next.js 15.4.6** - Full-stack React framework with App Router
- **📘 TypeScript 5.0** - Type-safe development experience
- **🎨 Tailwind CSS 4.0** - Utility-first CSS framework for rapid styling

### **Backend & Database**

- **🗄️ PostgreSQL (Neon DB)** - Serverless PostgreSQL database platform
- **🔧 Prisma 6.15.0** - Next-generation ORM for type-safe database access
- **🌐 Next.js API Routes** - Serverless backend functionality
- **☁️ Neon DB** - Modern serverless Postgres with branching, autoscaling, and bottomless storage

### **AI & Machine Learning**

- **🤖 OpenAI GPT-4.1-mini** - Advanced language model for analysis
- **🔗 LangChain 0.3.34** - Framework for building AI applications
- **📄 Vector Store** - Semantic search capabilities for journal entries
- **🔍 Embeddings** - OpenAI embeddings for intelligent content analysis

### **Authentication & Security**

- **🔐 Clerk 6.31.5** - Complete authentication and user management
- **👤 User Profiles** - Secure user data management
- **🛡️ Protected Routes** - Authenticated access control

### **Development Tools**

- **📏 ESLint** - Code linting and quality assurance
- **⚡ React Autosave** - Automatic content saving functionality
- **📊 Zod** - Runtime type validation and schema parsing

## 🏗️ Application Architecture

### **Directory Structure**

```
journal-app/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📄 page.tsx           # Landing page
│   │   ├── 📁 (dashboard)/       # Protected dashboard routes
│   │   │   ├── 📄 layout.tsx     # Dashboard layout with sidebar
│   │   │   └── 📁 journal/       # Journal management
│   │   │       ├── 📄 page.tsx   # Journal list view
│   │   │       └── 📁 [journalId]/ # Individual entry editing
│   │   ├── 📁 api/               # Backend API routes
│   │   │   ├── 📁 journal/       # Journal CRUD operations
│   │   │   └── 📁 question/      # AI Q&A system
│   │   ├── 📁 sign-in/           # Authentication pages
│   │   └── 📁 sign-up/
│   ├── 📁 components/            # Reusable UI components
│   │   ├── 📄 Editor.jsx         # Rich text editor with analysis
│   │   ├── 📄 EntryCard.tsx      # Journal entry preview cards
│   │   ├── 📄 Question.jsx       # AI question interface
│   │   └── 📄 NewEntryCard.tsx   # New entry creation
│   └── 📁 utils/                 # Utility functions
│       ├── 📄 ai.ts              # AI analysis logic
│       ├── 📄 auth.ts            # Authentication helpers
│       ├── 📄 api.ts             # API client functions
│       └── 📄 db.ts              # Database connection
├── 📁 prisma/                    # Database schema and migrations
│   ├── 📄 schema.prisma          # Database models
│   └── 📁 migrations/            # Database migration history
└── 📄 package.json               # Dependencies and scripts
```

## 🗃️ Database Schema

### **User Model**

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  firstName String?
  lastName  String?
  clerkId   String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  journalEntries JournalEntry[]
}
```

### **Journal Entry Model**

```prisma
model JournalEntry {
  id        String   @id @default(cuid())
  content   String   @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  userId String
  user   User   @relation(fields: [userId], references: [id])
  analysis Analysis?
}
```

### **AI Analysis Model**

```prisma
model Analysis {
  id        String   @id @default(cuid())
  mood      String                    # Detected emotional state
  summery   String   @db.Text         # AI-generated summary
  subject   String   @db.Text         # Main topics/themes
  negative  Boolean                   # Negative sentiment indicator
  color     String                    # Mood color representation
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  entryId String       @unique
  entry   JournalEntry @relation(fields: [entryId], references: [id])
}
```

## 🚀 Key Features

### **📝 Smart Journal Editor**

- **Real-time Writing**: Seamless text editing experience
- **Auto-save Functionality**: Never lose your thoughts with automatic saving
- **Live Analysis**: AI analysis updates in real-time as you write
- **Rich Content Support**: Full text formatting capabilities

### **🧠 AI-Powered Analysis**

- **Mood Detection**: Automatically identifies emotional state from writing
- **Content Summarization**: Generates concise summaries of entries
- **Subject Identification**: Extracts main themes and topics
- **Sentiment Analysis**: Determines positive/negative emotional tone
- **Color Coding**: Visual mood representation with hex color codes

### **🤖 Intelligent Q&A System**

- **Natural Language Queries**: Ask questions about your journal history
- **Semantic Search**: Find relevant entries based on meaning, not just keywords
- **Pattern Recognition**: Discover trends and patterns in your writing
- **Contextual Responses**: Get answers based on your entire journal history

### **👤 User Management**

- **Secure Authentication**: Powered by Clerk for robust security
- **User Profiles**: Personalized experience for each user
- **Data Privacy**: Your journal entries are private and secure

### **📱 Modern UI/UX**

- **Responsive Design**: Works perfectly on desktop and mobile
- **Intuitive Navigation**: Clean, modern interface design
- **Dashboard Layout**: Organized sidebar navigation
- **Visual Feedback**: Loading states and real-time updates

## 📋 API Endpoints

### **Journal Management**

- `POST /api/journal` - Create new journal entry
- `GET /api/journal/[journalId]` - Retrieve specific entry
- `PATCH /api/journal/[journalId]` - Update entry content and trigger analysis

### **AI Features**

- `POST /api/question` - Ask questions about journal entries
- **Analysis Pipeline** - Automatic AI analysis on content updates

## 🔄 Development Timeline

Based on Git commit history, here's how the application evolved:

### **🎯 Phase 1: Foundation (Week 1)**

- **Initial Setup**: Created Next.js app with TypeScript foundation
- **Authentication**: Integrated Clerk for secure user management
- **Database**: Set up PostgreSQL with Prisma ORM

### **🏗️ Phase 2: Core Features (Week 2)**

- **Database Schema**: Implemented complete User and JournalEntry models
- **Dashboard Layout**: Created responsive sidebar navigation
- **Basic UI**: Built entry cards and navigation components

### **📝 Phase 3: Journal Functionality (Week 2)**

- **Journal Display**: Implemented journal entry listing and display
- **Entry Creation**: Added new journal entry functionality
- **Navigation**: Enhanced UI with entry navigation and routing

### **✨ Phase 4: Advanced Features (Week 3)**

- **Editor Implementation**: Built rich text editor with autosave
- **Real-time Updates**: Added live content editing capabilities

### **🤖 Phase 5: AI Integration (Week 3)**

- **AI Analysis**: Implemented OpenAI-powered mood and content analysis
- **Subject Detection**: Added subject field extraction
- **Visual Analysis**: Complete analysis display with color coding

### **🧠 Phase 6: Intelligence Layer (Week 4)**

- **Enhanced Editor**: Improved editing with real-time analysis updates
- **Better Navigation**: Streamlined user interface improvements

### **🎯 Phase 7: Q&A System (Week 4)**

- **Intelligent Queries**: Implemented AI-powered question answering
- **Semantic Search**: Added vector-based journal entry search
- **Knowledge Extraction**: Users can now ask questions about their writing patterns

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+ and npm/yarn
- Neon DB account (or PostgreSQL database)
- OpenAI API key
- Clerk authentication keys

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/biswajit-debnath/ai-journal-app.git
   cd journal-app
   ```

2. **Checkout to dev branch**

   ```bash
   git checkout dev
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Environment Setup**
   Create a `.env.local` file:

   ```env
   # Database (Neon DB)
   DATABASE_URL="postgresql://username:password@ep-example.us-east-1.aws.neon.tech/journal_db?sslmode=require"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key
   ```

5. **Database Setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev
   ```

6. **Start Development Server**

   ```bash
   npm run dev
   ```

7. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage Guide

### **Getting Started**

1. **Sign Up/Sign In**: Create an account or log in using Clerk authentication
2. **Dashboard Access**: Navigate to the main dashboard after authentication
3. **Create Entry**: Click "New Entry" to start your first journal entry

### **Writing & Analysis**

1. **Write Freely**: Type your thoughts in the editor
2. **Auto Analysis**: Watch as AI analyzes your mood and content in real-time
3. **Review Insights**: Check the analysis panel for mood, summary, and themes
4. **Auto Save**: Your content is automatically saved as you write

### **Exploring Your Journal**

1. **Browse Entries**: View all your entries on the main journal page
2. **Edit Entries**: Click on any entry to edit and see updated analysis
3. **Ask Questions**: Use the Q&A feature to query your journal history
4. **Discover Patterns**: Ask about mood trends, recurring themes, or writing patterns

### **Sample Questions to Try**

- "What were my main concerns this week?"
- "How has my mood changed over time?"
- "What topics do I write about most often?"
- "When was I feeling most positive?"

## 🔮 Future Enhancements

### **Planned Features**

- 📊 **Analytics Dashboard**: Visual charts of mood trends and writing patterns
- 📈 **Goal Tracking**: Set and monitor personal development goals
- 🎨 **Custom Themes**: Personalized UI themes based on mood preferences
- 🔊 **Voice Entries**: Speech-to-text for hands-free journaling
- 📚 **Entry Templates**: Guided prompts for different types of reflection

### **Technical Improvements**

- ⚡ **Performance**: Enhanced loading speeds and caching
- 🔒 **Security**: Advanced encryption for journal content
- 🌍 **Internationalization**: Multi-language support
- 🔄 **Offline Mode**: Write entries without internet connection
- 📦 **Export Features**: Backup and export journal data

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

### **Development Guidelines**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Biswajit Debnath**

- GitHub: [@biswajit-debnath](https://github.com/biswajit-debnath)

## 🙏 Acknowledgments

- **OpenAI** for providing powerful language models
- **Clerk** for seamless authentication solutions
- **Neon DB** for modern serverless PostgreSQL database platform
- **Prisma** for excellent database tooling
- **Next.js** team for the amazing framework
- **LangChain** for AI application development tools

---

**💡 Start your intelligent journaling journey today!**

This AI-powered journal app is designed to help you better understand your thoughts, emotions, and personal growth patterns. Whether you're looking to track your mental health, reflect on daily experiences, or discover insights about yourself, this app provides the tools and intelligence to make your journaling more meaningful and insightful.

_Built with ❤️ using modern web technologies and artificial intelligence._
