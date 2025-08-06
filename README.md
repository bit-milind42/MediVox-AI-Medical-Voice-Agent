# 🏥 MediVox AI - AI Medical Voice Agent

An AI-powered healthcare platform that enables voice-based medical consultations with intelligent symptom analysis and automated report generation.

## 📸 Screenshots

> 📷 **Screenshots coming soon!** 
> 
> We're working on adding visual demonstrations of our platform. This section will showcase:
> - Dashboard interface with medical agent selection
> - Voice consultation interface in action
> - Medical report generation process
> 
> *To add screenshots: Place your images in the root directory and update the image paths below.*

<!-- 
### Dashboard View
![Dashboard Screenshot](./Landing-Page.png)

### Voice Consultation Interface  
![Voice Consultation Screenshot](./AI-Medical-agent.png)
-->

## ✨ Key Features

- **AI Voice Consultations** - Real-time conversations with specialized medical AI agents
- **Smart Report Generation** - Automated medical reports with symptom analysis
- **Multiple Specialties** - 10+ medical specialists available
- **Session History** - Track and manage consultation history
- **Secure Authentication** - Protected user data and sessions

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: PostgreSQL, Drizzle ORM
- **AI Services**: OpenAI GPT-4, Vapi Voice AI
- **Authentication**: Clerk
- **Deployment**: Vercel

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your API keys
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000)

## � Environment Variables

```bash
DATABASE_URL=your_postgresql_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
OPEN_ROUTER_API_KEY=your_openai_key
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_key
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/ai-medical-voice-agent)

## ⚠️ Disclaimer

This AI assistant is for informational purposes only and should not replace professional medical advice.

---

**Built with ❤️ for better healthcare**
