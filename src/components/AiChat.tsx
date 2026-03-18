import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Sparkles, User, Loader2 } from 'lucide-react'

const SYSTEM_PROMPT = `You are Yogesh AI — an intelligent assistant representing Yogesh Mahawar's portfolio. You answer questions about Yogesh in a professional, friendly, and concise tone.

=== ABOUT YOGESH ===
Name: Yogesh Mahawar
Role: Full-Stack Developer & AI Engineer
Location: Jaipur, Rajasthan, India
Email: myogesh729@gmail.com
Phone: 8505072814
LinkedIn: linkedin.com/in/yogesh-mahawar-831977272
Experience: 3+ years

=== CURRENT ROLE ===
PHP Laravel Developer at 99isolutions (May 2024 – Present)
- Built AI Agent for WhatsApp: automated intelligent customer support with NLP-powered responses
- Developed AI Answer Node for WhatsApp & website to handle dynamic query resolution
- Created Shopify App integrating WhatsApp Business API for real-time order notifications
- Built embeddable 99Pandit booking widget with WhatsApp OTP verification and dynamic dropdowns
- Maintained getgabs.com, 99pandit.com, avislease.in, and thecandidhouse.com
- Built custom WordPress plugin for abandoned cart recovery with dynamic discount codes
- Integrated external platforms (GoTab) and worked on REST API + GraphQL services

=== PREVIOUS ROLE ===
Jr. Software Developer at SKYRED THAILAND (May 2023 – May 2024)
- Created websites and admin panels using HTML, PHP, and Laravel
- Designed and optimized MySQL databases
- Integrated Laravel Breeze for authentication and authorization

=== TECHNICAL SKILLS ===
Languages: PHP, JavaScript, TypeScript, SQL
Frameworks: Laravel, React, Next.js, Node.js, Inertia.js, Remix, CakePHP, jQuery
AI/GenAI: LLM Integration, GenAI, AI Agent Development, Prompt Engineering, AI Answer Node, OpenAI API
WhatsApp: WhatsApp Business API, AI Agent for WhatsApp, AI Answer Node, Webhook Handling
CMS/Ecom: Shopify App Development, WordPress, WooCommerce, GraphQL, REST API
Architecture: System Design, System Architecture, Microservices, Database Optimization
Frontend: HTML5, CSS3, Bootstrap, TailwindCSS, AJAX, Responsive Design
Database: MySQL, SQL, Git, GitHub

=== EDUCATION ===
- Agentic AI Course — Coursera & Coding Ninja (Dec 2025 – Present)
- B.C.A. — University of Technology, Jaipur (2023 – Present)
- Full Stack Development Certification — Matrix Computers, Jaipur (2022)
- B.A. — Kota University (2018–2021)

=== PROJECTS ===
1. AI WhatsApp Agent — NLP-powered automated customer support on WhatsApp using LLM
2. Shopify WhatsApp Integration — Real-time order notifications via WhatsApp Business API
3. 99Pandit Booking Widget — Embeddable widget with OTP verification and dynamic dropdowns
4. WordPress Abandoned Cart Plugin — Cart recovery with dynamic discount codes via WhatsApp/email
5. AI Answer Node for Website — Embeddable AI assistant with multi-knowledge base support
6. Web Admin Panel Suite — Enterprise admin panels with CRUD, RBAC, Eloquent ORM

=== AVAILABILITY ===
Open to freelance projects, AI integrations, full-stack development work, and collaborations.

=== INSTRUCTIONS ===
- Answer questions about Yogesh's skills, projects, experience, and availability
- Be warm, professional, and concise (2-4 sentences max per answer)
- If asked about hiring, direct them to email myogesh729@gmail.com
- If asked something unrelated to Yogesh, politely redirect: "I'm here to tell you about Yogesh! Ask me about his skills, projects, or experience."
- Never make up information not provided above
- Respond in the same language the visitor uses (Hindi or English)`

const SUGGESTED_QUESTIONS = [
  "What are Yogesh's main skills?",
  "Tell me about his AI projects",
  "Is he available for freelance?",
  "What's his experience with WhatsApp API?",
]

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AiChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey there! 👋 I'm **Yogesh AI** — ask me anything about Yogesh's skills, projects, experience, or availability. I'll answer right away!",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    setShowSuggestions(false)

    const userMsg: Message = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Keep last 6 messages only (3 exchanges) to limit token usage
    const allMessages = [...messages, userMsg]
    const recentMessages = allMessages.slice(-6)
    const history = recentMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }))

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
          max_tokens: 300,
          temperature: 0.7,
          stream: true,
        }),
      })

      if (!response.ok) throw new Error('API error')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''

      // Add empty assistant message to stream into
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter((l) => l.startsWith('data: '))

        for (const line of lines) {
          const data = line.slice(6)
          if (data === '[DONE]') break
          try {
            const parsed = JSON.parse(data)
            const delta = parsed.choices?.[0]?.delta?.content
            if (delta) {
              assistantText += delta
              setMessages((prev) => {
                const updated = [...prev]
                updated[updated.length - 1] = { role: 'assistant', content: assistantText }
                return updated
              })
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Oops, something went wrong. Please try again in a moment!",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const renderContent = (text: string) => {
    // Render **bold** markdown
    return text.split(/(\*\*.*?\*\*)/).map((part, i) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={i} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      )
    )
  }

  return (
    <>
      {/* Floating trigger button + label */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 300 }}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 ${
          open ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } transition-opacity duration-200`}
      >
        {/* Label bubble */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.6, duration: 0.4 }}
          className="flex flex-col items-end"
        >
          <div className="bg-dark-700 border border-white/10 rounded-2xl rounded-br-sm px-4 py-2.5 shadow-xl shadow-black/30">
            <p className="text-white text-sm font-semibold leading-tight">Ask anything</p>
            <p className="text-primary-300 text-xs font-medium">Yogesh AI · Online</p>
          </div>
          {/* Small triangle pointer */}
          <div className="w-3 h-3 bg-dark-700 border-r border-b border-white/10 rotate-45 -mt-1.5 mr-3 shadow-sm" />
        </motion.div>

        {/* Button */}
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-2xl shadow-primary-500/40 flex-shrink-0"
          aria-label="Open AI Chat"
        >
          <Bot size={24} className="text-white" />
          <span className="absolute inset-0 rounded-2xl animate-ping bg-primary-500/30" />
        </motion.button>
      </motion.div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[400px] h-[560px] flex flex-col rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10"
            style={{ background: '#0f0f1a' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-primary-600/20 to-accent-500/10 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-lg">
                  <Bot size={18} className="text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-dark-800" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Yogesh AI</p>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online · Ask me anything
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-md mt-1 ${
                      msg.role === 'assistant'
                        ? 'bg-gradient-to-br from-primary-600 to-accent-500 text-white'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {msg.role === 'assistant' ? <Sparkles size={13} /> : <User size={13} />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'assistant'
                        ? 'bg-white/5 border border-white/8 text-slate-200 rounded-tl-none'
                        : 'bg-gradient-to-br from-primary-600 to-primary-500 text-white rounded-tr-none shadow-lg shadow-primary-500/20'
                    }`}
                  >
                    {msg.content === '' && loading ? (
                      <span className="flex gap-1 items-center h-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    ) : (
                      renderContent(msg.content)
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator when first waiting */}
              {loading && messages[messages.length - 1]?.role === 'user' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                    <Loader2 size={13} className="text-white animate-spin" />
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl rounded-tl-none bg-white/5 border border-white/8 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions */}
            <AnimatePresence>
              {showSuggestions && messages.length <= 2 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-2 flex flex-wrap gap-1.5"
                >
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 hover:bg-primary-500/20 hover:border-primary-400/50 transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-white/5">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage(input)
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Yogesh..."
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-primary-400/60 focus:bg-primary-500/5 transition-all duration-200 disabled:opacity-50"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white disabled:opacity-40 shadow-lg shadow-primary-500/20 transition-opacity"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
