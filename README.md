# 🏥 MediVox AI - AI Medical Voice Agent

An AI-powered healthcare platform that enables voice-based medical consultations with intelligent symptom analysis and automated report generation.

## 📸 Screenshots

### Dashboard View
![Dashboard Screenshot](https://raw.githubusercontent.com/bit-milind42/MediVox-AI-Medical-Voice-Agent/main/Landing-Page.png)

### Voice Consultation Interface
![Voice Consultation Screenshot](https://raw.githubusercontent.com/bit-milind42/MediVox-AI-Medical-Voice-Agent/main/AI%20Medical%20agent.png)

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

[![Deploy with Vercel](https://vercel.com/button)](https://medi-vox-ai-medical-voice-agent.vercel.app/)

## ⚠️ Disclaimer

This AI assistant is for informational purposes only and should not replace professional medical advice.

---

**Built with ❤️ for better healthcare**
