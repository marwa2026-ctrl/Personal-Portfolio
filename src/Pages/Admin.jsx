import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FiMail, 
  FiMessageSquare, 
  FiSettings, 
  FiLock, 
  FiGlobe, 
  FiTrash2,
  FiLogOut
} from "react-icons/fi";

// 🔐 Simple Password for security (You can change this to whatever you want)
const ADMIN_PASSWORD = "admin123";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("messages");

  // State to hold the data
  const [feedbacks, setFeedbacks] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);

  // Load data from localStorage when logged in
  useEffect(() => {
    if (isAuthenticated) {
      const savedFeedback = localStorage.getItem("marwa-about-feedback-v1");
      if (savedFeedback) setFeedbacks(JSON.parse(savedFeedback));

      const savedMessages = localStorage.getItem("marwa-contact-messages");
      if (savedMessages) setContactMessages(JSON.parse(savedMessages));
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to delete all messages and feedback? This cannot be undone.")) {
      localStorage.removeItem("marwa-about-feedback-v1");
      localStorage.removeItem("marwa-contact-messages");
      setFeedbacks([]);
      setContactMessages([]);
    }
  };

  // 🔒 LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-4 transition-colors duration-300">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-[2rem] border border-line bg-surface p-8 shadow-[0_0_50px_rgba(238,144,150,0.05)]"
        >
          <div className="mb-8 flex flex-col items-center text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EE9096]/10 text-[#EE9096] shadow-[0_0_20px_rgba(238,144,150,0.2)]">
              <FiLock size={32} />
            </span>
            <h1 className="mt-5 text-2xl font-bold text-cream">Admin Access</h1>
            <p className="mt-2 text-sm text-ink-soft">Enter your password to view the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full rounded-2xl border border-line bg-surface-2 px-5 py-4 text-cream outline-none transition-all placeholder:text-muted focus:border-[#147CBF] focus:shadow-[0_0_0_3px_rgba(20,124,191,0.15)]"
            />
            <button 
              type="submit" 
              className="w-full rounded-2xl bg-gradient-to-r from-[#EE9096] to-[#147CBF] py-4 font-bold text-white transition-all hover:opacity-90 hover:shadow-[0_0_20px_rgba(20,124,191,0.4)]"
            >
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // 🚀 ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-bg px-4 py-10 sm:px-8 transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row">
        
        {/* Sidebar */}
        <div className="w-full shrink-0 md:w-72">
          <div className="rounded-[2rem] border border-line bg-surface p-5 shadow-lg">
            <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#EE9096]">
                Admin Panel
              </h2>
              <button onClick={handleLogout} className="text-muted hover:text-[#B60300] transition-colors" title="Logout">
                <FiLogOut size={18} />
              </button>
            </div>
            
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab("messages")} 
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-all ${
                  activeTab === "messages" 
                    ? "bg-[#147CBF]/10 text-[#147CBF]" 
                    : "text-cream hover:bg-surface-2"
                }`}
              >
                <FiMail size={18} /> Contact Messages
                <span className="ml-auto rounded-full bg-[#147CBF]/20 px-2.5 py-0.5 text-xs text-[#147CBF]">
                  {contactMessages.length}
                </span>
              </button>
              
              <button 
                onClick={() => setActiveTab("feedback")} 
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-all ${
                  activeTab === "feedback" 
                    ? "bg-[#EE9096]/10 text-[#EE9096]" 
                    : "text-cream hover:bg-surface-2"
                }`}
              >
                <FiMessageSquare size={18} /> Feedback
                <span className="ml-auto rounded-full bg-[#EE9096]/20 px-2.5 py-0.5 text-xs text-[#EE9096]">
                  {feedbacks.length}
                </span>
              </button>
              
              <button 
                onClick={() => setActiveTab("settings")} 
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-all ${
                  activeTab === "settings" 
                    ? "bg-[#FDC700]/10 text-[#FDC700]" 
                    : "text-cream hover:bg-surface-2"
                }`}
              >
                <FiSettings size={18} /> Settings
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 rounded-[2rem] border border-line bg-surface p-6 shadow-lg sm:p-8">
          <AnimatePresence mode="wait">
            
            {/* 📩 Contact Messages Tab */}
            {activeTab === "messages" && (
              <motion.div key="messages" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h1 className="mb-6 font-display text-2xl font-bold text-cream">Contact Messages</h1>
                {contactMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center">
                    <FiMail size={32} className="mb-4 text-muted" />
                    <p className="font-bold text-cream">No messages yet</p>
                    <p className="text-sm text-ink-soft">Messages sent from the Contact page will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contactMessages.map((msg, i) => (
                      <div key={i} className="rounded-2xl border border-line bg-surface-2 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3 mb-3">
                          <p className="font-bold text-[#147CBF]">{msg.name} <span className="text-sm font-normal text-muted">({msg.email})</span></p>
                          <p className="text-xs text-muted">{new Date(msg.date).toLocaleString()}</p>
                        </div>
                        <p className="text-sm font-semibold text-cream">Subject: {msg.subject}</p>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* 💬 Feedback Tab */}
            {activeTab === "feedback" && (
              <motion.div key="feedback" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h1 className="mb-6 font-display text-2xl font-bold text-cream">Visitor Feedback</h1>
                {feedbacks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center">
                    <FiMessageSquare size={32} className="mb-4 text-muted" />
                    <p className="font-bold text-cream">No feedback yet</p>
                    <p className="text-sm text-ink-soft">Feedback submitted on the About page will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {feedbacks.map((fb, i) => (
                      <div key={i} className="rounded-2xl border border-line bg-surface-2 p-5">
                        <div className="flex items-center justify-between border-b border-line pb-3 mb-3">
                          <p className="font-bold text-[#EE9096]">Anonymous Visitor</p>
                          <p className="text-xs text-muted">{new Date(fb.createdAt).toLocaleString()}</p>
                        </div>
                        <p className="text-sm leading-relaxed text-cream">{fb.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ⚙️ Settings Tab */}
            {activeTab === "settings" && (
              <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h1 className="mb-6 font-display text-2xl font-bold text-cream">Settings</h1>
                
                <div className="space-y-8">
                  {/* Language Selector */}
                  <div className="rounded-2xl border border-line bg-surface-2 p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-cream">
                      <FiGlobe className="text-[#FDC700]" /> Portfolio Language
                    </h3>
                    <p className="mb-5 text-sm text-ink-soft">Select the language you want your portfolio to display.</p>
                    <div className="flex flex-wrap gap-3">
                      <button className="rounded-full border border-[#147CBF] bg-[#147CBF]/10 px-6 py-2.5 text-sm font-bold text-[#147CBF]">English</button>
                      <button className="rounded-full border border-line bg-surface px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:text-cream hover:border-[#EE9096]">Dari (دری)</button>
                      <button className="rounded-full border border-line bg-surface px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:text-cream hover:border-[#EE9096]">Pashto (پښتو)</button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="rounded-2xl border border-[#B60300]/30 bg-[#B60300]/5 p-6">
                    <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-[#B60300]">
                      <FiTrash2 /> Danger Zone
                    </h3>
                    <p className="mb-5 text-sm text-ink-soft">
                      This will permanently delete all saved Contact Messages and Feedback from this browser. 
                      This action cannot be undone.
                    </p>
                    <button 
                      onClick={clearAllData}
                      className="rounded-xl bg-[#B60300] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-red-700 hover:shadow-[0_0_20px_rgba(182,3,0,0.4)]"
                    >
                      Clear All Saved Data
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}