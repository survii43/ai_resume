# ResumeAI - AI-Powered Resume Builder

A modern, privacy-first resume builder powered by AI. Create professional, ATS-optimized resumes with the help of local AI models.

## Features

- 🤖 **AI-Powered Content Generation**: Generate professional summaries and improve bullet points
- 🎯 **ATS Optimization**: Real-time ATS score feedback and keyword suggestions
- 🔒 **Privacy-First**: Your data stays on your device with local AI models
- ⚡ **Lightning Fast**: Build resumes in minutes with real-time preview
- 📄 **Multiple Templates**: Classic, Modern, and Creative designs
- 📤 **Export Options**: PDF, DOCX, and JSON formats
- 👥 **Collaboration**: Share resumes for feedback and comments
- 🎮 **Gamification**: Progress tracking and achievement system

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Authentication**: NextAuth.js with Google/GitHub providers
- **Database**: Prisma with SQLite (local dev) / PostgreSQL (production)
- **AI**: Ollama for local AI processing
- **UI Components**: Custom components with Lucide React icons
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Ollama (for AI features) - [Install Ollama](https://ollama.ai/)

### Ollama Setup for AI Features

To use AI features, you need to have Ollama running locally:

1. **Install Ollama**: Download from [ollama.ai](https://ollama.ai)
2. **Start Ollama Service**: Run `ollama serve` in your terminal
3. **Pull a Model**: Run `ollama pull llama2` (or any other model)
4. **Verify Connection**: Ensure Ollama is running on `http://localhost:11434`

**Note**: If Ollama is not running, the application will show a warning banner and disable AI features. You can still use all other resume builder features without AI.

### Troubleshooting AI Features

- **"Ollama is not running"**: Start Ollama service with `ollama serve`
- **"Model not found"**: Pull a model with `ollama pull llama2`
- **Connection errors**: Check if Ollama is accessible at `http://localhost:11434`
- **AI features not working**: Check the browser console for error messages

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"

   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # GitHub OAuth (optional)
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"

   # Ollama (for AI features)
   OLLAMA_BASE_URL="http://localhost:11434"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start Ollama (for AI features)**
   ```bash
   # Install a model (e.g., llama3.2)
   ollama pull llama3.2
   
   # Start Ollama server
   ollama serve
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## OAuth Setup (Optional)

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs

### GitHub OAuth
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to `http://localhost:3000/api/auth/callback/github`

## AI Features Setup

1. **Install Ollama**
   - Visit [ollama.ai](https://ollama.ai/) and download for your platform
   - Install a model: `ollama pull llama3.2`

2. **Start Ollama server**
   ```bash
   ollama serve
   ```

3. **Verify connection**
   - The app will automatically connect to `http://localhost:11434`
   - AI features will be available in the resume builder

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── builder/           # Resume builder
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── forms/             # Form components
│   ├── preview/           # Resume preview
│   └── ui/                # UI components
├── contexts/              # React contexts
├── lib/                   # Utility functions
└── types/                 # TypeScript types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema to database

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@resumeai.com
- 💬 Discord: [Join our community](https://discord.gg/resumeai)
- 📖 Documentation: [docs.resumeai.com](https://docs.resumeai.com)

## Roadmap

- [ ] Voice input for resume content
- [ ] Advanced ATS scoring
- [ ] Resume templates marketplace
- [ ] Team collaboration features
- [ ] Mobile app
- [ ] Integration with job boards
- [ ] Advanced analytics

---

Made with ❤️ by the ResumeAI team