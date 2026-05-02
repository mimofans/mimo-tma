# 🤖 MIMO Telegram Mini App

**Telegram Mini App chatbot powered by MIMO LLM API — fully serverless on Cloudflare.**

> Seamless AI conversations inside Telegram. No database, no VPS, zero maintenance.

---

## 🚀 Features

- ✅ **One-click deployment** — Cloudflare Pages + Workers
- ✅ **Serverless architecture** — 100% free tier eligible
- ✅ **MIMO LLM integration** — pay-per-use AI responses
- ✅ **Telegram-native UX** — WebApp JS SDK, theme-aware
- ✅ **Persistent chat history** — optional Cloudflare KV storage
- ✅ **Typing indicators** — real-time bot status
- ✅ **Markdown support** — rich text formatting in responses

---

## 📦 Prerequisites

| Tool | Purpose | Link |
|------|---------|------|
| **GitHub account** | Code repository | [github.com](https://github.com) |
| **Cloudflare account** | Hosting (Pages + Workers) | [cloudflare.com](https://cloudflare.com) |
| **Telegram Bot Token** | Bot identity | [@BotFather](https://t.me/BotFather) |
| **MIMO LLM API Key** | AI brain | MIMO dashboard |

---

## ⚡ Quick Deploy (5 minutes)

### **1. Fork & Clone**
```bash
git clone https://github.com/mimofans/mimo-tma.git
cd mimo-tma
```

### **2. Deploy Worker**
```bash
cd backend
npm install -g wrangler
wrangler login
wrangler deploy
# → Copy the workers.dev URL
```

### **3. Deploy Pages**
- Cloudflare Dashboard → Pages → Create Project
- Connect GitHub → Select `mimo-tma`
- Build settings: None (static)
- Deploy → Copy pages.dev URL

### **4. Set Environment Variables**
Worker → Settings → Variables:
```
BOT_TOKEN = your-telegram-bot-token
MIMO_LLM_API_KEY = your-mimo-api-key
```

### **5. Configure @BotFather**
```
/setwebhook → <worker-url>
/setmenubutton → <pages-url>
```

---

## 📂 Structure

```
mimo-tma/
├── frontend/
│   └── index.html      # Mini App UI
├── backend/
│   └── worker.js       # Cloudflare Worker
└── README.md
```

---

## 💰 Cost

| Service | Free Tier | Cost |
|---------|-----------|------|
| Cloudflare Pages | Unlimited | $0 |
| Cloudflare Workers | 100K req/day | $0 |
| MIMO LLM API | — | ~$0.002 / 1K tokens |

---

## 🙏 Credits

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [MIMO LLM](https://mimo-llm.io)

---

**Made by the community. Fork & enjoy! 🔥**
