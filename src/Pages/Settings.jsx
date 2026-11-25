import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FiMail, 
  FiMessageSquare, 
  FiLock, 
  FiGlobe, 
  FiTrash2,
  FiLogOut,
  FiSun,
  FiMoon,
  FiBookOpen,
  FiFolder,
  FiPlus,
  FiX,
  FiEdit2,
  FiCheck,
  FiUser,
  FiKey,
  FiCheckCircle,
  FiRefreshCw
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("messages");

  // 🔐 Password State
  const [adminPassword, setAdminPassword] = useState(() => {
    const saved = localStorage.getItem("admin-password");
    if (saved) return saved;
    localStorage.setItem("admin-password", "admin123");
    return "admin123";
  });
  
  // Change Password States
  const [passwordForm, setPasswordForm] = useState({ current: "", new: "", confirm: "" });
  const [passwordStatus, setPasswordStatus] = useState({ type: "", msg: "" });

  // Theme
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Data States
  const [feedbacks, setFeedbacks] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem("app-lang") || "en");

  // 👇 EDUCATION STATE (Now includes ALL your current items as defaults)
  const [educationData, setEducationData] = useState(() => {
    const saved = localStorage.getItem("custom-education");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map(item => ({ ...item, visible: item.visible !== false }));
    }
    return [
      { id: 1, title: "Netlinks", sub: "Frontend Development", year: "Completed 2025", desc: "Learned UI/UX fundamentals, responsive layouts, and project collaboration.", visible: true },
      { id: 2, title: "Top In Town", sub: "HTML, CSS, JavaScript & React", year: "Completed 2025", desc: "Focused on semantic page structure, DOM manipulation, and building reusable React components.", visible: true },
      { id: 3, title: "High School", sub: "Graduated", year: "2025", desc: "Developed strong communication, research, and time management skills.", visible: true },
      { id: 4, title: "Upskill Center", sub: "Backend Development", year: "Current", desc: "Currently studying backend development at Upskill Center.", visible: true },
      { id: 5, title: "Code to Inspire", sub: "Self Study", year: "Current", desc: "Self-studying web development through Code to Inspire.", visible: true },
      { id: 6, title: "Codomax", sub: "Self Study", year: "Current", desc: "Self-studying programming through Codomax.", visible: true },
    ];
  });
  const [newEdu, setNewEdu] = useState({ title: "", sub: "", year: "", desc: "" });
  const [editingEduId, setEditingEduId] = useState(null);

  // 👇 PROJECTS STATE (Now includes ALL your current items as defaults)
  const [projectsData, setProjectsData] = useState(() => {
    const saved = localStorage.getItem("custom-projects");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map(item => ({ ...item, visible: item.visible !== false }));
    }
    return [
      { id: 1, title: "Graphic Designer Portfolio", tech: "React • Tailwind • Framer Motion", desc: "A visually striking portfolio showcasing creative design work and branding.", visible: true },
      { id: 2, title: "Personal Portfolio", tech: "React • Vite • Tailwind", desc: "My personal portfolio website built to showcase my skills and projects.", visible: true },
      { id: 3, title: "DR Portfolio", tech: "React • CSS", desc: "A professional portfolio website with a clean and modern aesthetic.", visible: true },
      { id: 4, title: "Tailwind CSS Presentation", tech: "HTML • CSS • JS", desc: "An interactive presentation explaining the power of Tailwind CSS.", visible: true },
      { id: 5, title: "Luméa", tech: "UI/UX • Web Design", desc: "Beauty in its purest form.", visible: true },
    ];
  });
  const [newProj, setNewProj] = useState({ title: "", tech: "", desc: "" });
  const [editingProjId, setEditingProjId] = useState(null);

  // Load messages
  useEffect(() => {
    if (isAuthenticated) {
      const savedFeedback = localStorage.getItem("marwa-about-feedback-v1");
      if (savedFeedback) setFeedbacks(JSON.parse(savedFeedback));
      const savedMessages = localStorage.getItem("marwa-contact-messages");
      if (savedMessages) setContactMessages(JSON.parse(savedMessages));
    }
  }, [isAuthenticated]);

  // 🔐 Security Check Function
  const requirePassword = () => {
    const entered = window.prompt("Enter admin password to make this change:");
    if (entered === adminPassword) return true;
    if (entered !== null) alert("Incorrect password!");
    return false;
  };

  // --- Handlers ---
  const saveLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("app-lang", lang);
  };

  const handleSaveEdu = () => {
    if (!newEdu.title) return;
    let updatedList;
    if (editingEduId) {
      updatedList = educationData.map(item => item.id === editingEduId ? { ...newEdu, id: editingEduId, visible: item.visible } : item);
      setEditingEduId(null);
    } else {
      updatedList = [...educationData, { ...newEdu, id: Date.now(), visible: true }];
    }
    setEducationData(updatedList);
    localStorage.setItem("custom-education", JSON.stringify(updatedList));
    setNewEdu({ title: "", sub: "", year: "", desc: "" });
  };

  const handleEditEdu = (item) => {
    if (!requirePassword()) return;
    setNewEdu(item);
    setEditingEduId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleEdu = (id) => {
    if (!requirePassword()) return;
    const updated = educationData.map(item => 
      item.id === id ? { ...item, visible: !item.visible } : item
    );
    setEducationData(updated);
    localStorage.setItem("custom-education", JSON.stringify(updated));
  };

  const handleSaveProj = () => {
    if (!newProj.title) return;
    let updatedList;
    if (editingProjId) {
      updatedList = projectsData.map(item => item.id === editingProjId ? { ...newProj, id: editingProjId, visible: item.visible } : item);
      setEditingProjId(null);
    } else {
      updatedList = [...projectsData, { ...newProj, id: Date.now(), visible: true }];
    }
    setProjectsData(updatedList);
    localStorage.setItem("custom-projects", JSON.stringify(updatedList));
    setNewProj({ title: "", tech: "", desc: "" });
  };

  const handleEditProj = (item) => {
    if (!requirePassword()) return;
    setNewProj(item);
    setEditingProjId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleProj = (id) => {
    if (!requirePassword()) return;
    const updated = projectsData.map(item => 
      item.id === id ? { ...item, visible: !item.visible } : item
    );
    setProjectsData(updated);
    localStorage.setItem("custom-projects", JSON.stringify(updated));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordStatus({ type: "", msg: "" });

    if (passwordForm.current !== adminPassword) {
      setPasswordStatus({ type: "error", msg: "Current password is incorrect." });
      return;
    }
    if (passwordForm.new.length < 4) {
      setPasswordStatus({ type: "error", msg: "New password must be at least 4 characters." });
      return;
    }
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordStatus({ type: "error", msg: "New passwords do not match." });
      return;
    }

    setAdminPassword(passwordForm.new);
    localStorage.setItem("admin-password", passwordForm.new);
    setPasswordForm({ current: "", new: "", confirm: "" });
    setPasswordStatus({ type: "success", msg: "Password updated successfully!" });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === adminPassword) setIsAuthenticated(true);
    else alert("Incorrect password!");
  };

  // 🔒 LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-4 transition-colors duration-300">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-4xl border border-line bg-surface p-8 shadow-lg">
          <div className="mb-8 flex flex-col items-center text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-neon-blue/10 text-neon-blue">
              <FiUser size={32} />
            </span>
            <h1 className="mt-5 text-2xl font-bold text-cream">Admin Access</h1>
            <p className="mt-2 text-sm text-ink-soft">Enter password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password..." className="w-full rounded-2xl border border-line bg-surface-2 px-5 py-4 text-cream outline-none focus:border-neon-blue" />
            <button type="submit" className="w-full rounded-2xl bg-linear-to-r from-neon-pink to-neon-blue py-4 font-bold text-white hover:opacity-90">Unlock Dashboard</button>
          </form>
        </motion.div>
      </div>
    );
  }

  // 🚀 DASHBOARD
  return (
    <div className="min-h-screen bg-bg px-4 py-10 sm:px-8 transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row">
        
        {/* Sidebar */}
        <div className="w-full shrink-0 md:w-64">
          <div className="flex h-full flex-col rounded-4xl border border-line bg-surface p-5 shadow-lg">
            <div className="mb-6 border-b border-line pb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-neon-pink">Admin Menu</h2>
            </div>
            
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
              <button onClick={() => setActiveTab("messages")} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${activeTab === "messages" ? "bg-neon-blue/10 text-neon-blue" : "text-cream hover:bg-surface-2"}`}>
                <FiMail size={18} /> Messages
              </button>
              <button onClick={() => setActiveTab("feedback")} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${activeTab === "feedback" ? "bg-neon-pink/10 text-neon-pink" : "text-cream hover:bg-surface-2"}`}>
                <FiMessageSquare size={18} /> Feedback
              </button>
              <button onClick={() => setActiveTab("education")} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${activeTab === "education" ? "bg-neon-green/10 text-neon-green" : "text-cream hover:bg-surface-2"}`}>
                <FiBookOpen size={18} /> Education
              </button>
              <button onClick={() => setActiveTab("projects")} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${activeTab === "projects" ? "bg-neon-orange/10 text-neon-orange" : "text-cream hover:bg-surface-2"}`}>
                <FiFolder size={18} /> Projects
              </button>
              <button onClick={() => setActiveTab("preferences")} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${activeTab === "preferences" ? "bg-neon-yellow/10 text-neon-yellow" : "text-cream hover:bg-surface-2"}`}>
                <FiGlobe size={18} /> Preferences
              </button>
              <button onClick={() => setActiveTab("password")} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${activeTab === "password" ? "bg-neon-blue/10 text-neon-blue" : "text-cream hover:bg-surface-2"}`}>
                <FiKey size={18} /> Security
              </button>
            </div>

            <div className="mt-6 border-t border-line pt-4">
              <button onClick={() => setIsAuthenticated(false)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon-red/10 px-4 py-3 text-sm font-bold text-neon-red transition-colors hover:bg-neon-red hover:text-white">
                <FiLogOut size={18} /> Log Out
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 rounded-4xl border border-line bg-surface p-6 shadow-lg sm:p-8">
          <AnimatePresence mode="wait">
            
            {/* 📩 Messages Tab */}
            {activeTab === "messages" && (
              <motion.div key="messages" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="mb-6 font-display text-2xl font-bold text-cream">Contact Messages</h1>
                {contactMessages.length === 0 ? <p className="text-muted">No messages yet.</p> : (
                  <div className="space-y-4">
                    {contactMessages.map((msg, i) => (
                      <div key={i} className="rounded-2xl border border-line bg-surface-2 p-5">
                        <p className="font-bold text-neon-blue">{msg.name} ({msg.email})</p>
                        <p className="text-xs text-muted">Subject: {msg.subject}</p>
                        <p className="mt-2 text-sm text-cream">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* 💬 Feedback Tab */}
            {activeTab === "feedback" && (
              <motion.div key="feedback" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="mb-6 font-display text-2xl font-bold text-cream">Visitor Feedback</h1>
                {feedbacks.length === 0 ? <p className="text-muted">No feedback yet.</p> : (
                  <div className="space-y-4">
                    {feedbacks.map((fb, i) => (
                      <div key={i} className="rounded-2xl border border-line bg-surface-2 p-5">
                        <p className="text-xs text-muted">{new Date(fb.createdAt).toLocaleString()}</p>
                        <p className="mt-2 text-sm text-cream">{fb.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* 📚 Manage Education Tab */}
            {activeTab === "education" && (
              <motion.div key="education" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="mb-6 flex items-center gap-2 font-display text-2xl font-bold text-cream">
                  <FiBookOpen className="text-neon-green" /> Manage Education
                </h1>
                
                <div className="mb-8 rounded-2xl border border-line bg-surface-2 p-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input type="text" placeholder="School/Platform" className="rounded-xl border border-line bg-surface px-4 py-2 text-sm text-cream outline-none focus:border-neon-green" onChange={(e) => setNewEdu({...newEdu, title: e.target.value})} value={newEdu.title} />
                    <input type="text" placeholder="Course/Subject" className="rounded-xl border border-line bg-surface px-4 py-2 text-sm text-cream outline-none focus:border-neon-green" onChange={(e) => setNewEdu({...newEdu, sub: e.target.value})} value={newEdu.sub} />
                    <input type="text" placeholder="Year" className="rounded-xl border border-line bg-surface px-4 py-2 text-sm text-cream outline-none focus:border-neon-green" onChange={(e) => setNewEdu({...newEdu, year: e.target.value})} value={newEdu.year} />
                    <input type="text" placeholder="Short Description" className="rounded-xl border border-line bg-surface px-4 py-2 text-sm text-cream outline-none focus:border-neon-green" onChange={(e) => setNewEdu({...newEdu, desc: e.target.value})} value={newEdu.desc} />
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button onClick={handleSaveEdu} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-neon-green py-2.5 text-sm font-bold text-white hover:opacity-90">
                      {editingEduId ? <><FiCheck /> Save Changes</> : <><FiPlus /> Add Education</>}
                    </button>
                    {editingEduId && (
                      <button onClick={() => { setEditingEduId(null); setNewEdu({ title: "", sub: "", year: "", desc: "" }); }} className="rounded-xl border border-line px-4 py-2.5 text-sm font-bold text-muted hover:text-cream">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {educationData.map(edu => (
                    <div key={edu.id} className={`flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between transition-all ${edu.visible ? 'border-line bg-surface' : 'border-line/50 bg-surface/50 opacity-60'}`}>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-cream">{edu.title} <span className="text-neon-green">- {edu.sub}</span></p>
                          {!edu.visible && <span className="rounded bg-neon-red/20 px-2 py-0.5 text-[10px] font-bold text-neon-red uppercase">Hidden</span>}
                        </div>
                        <p className="text-xs text-muted">{edu.year} | {edu.desc}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditEdu(edu)} className="flex items-center gap-1 rounded-lg bg-neon-yellow/10 px-3 py-1.5 text-xs font-bold text-neon-yellow hover:bg-neon-yellow hover:text-bg transition-colors">
                          <FiEdit2 size={14} /> Edit
                        </button>
                        <button onClick={() => handleToggleEdu(edu.id)} className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${edu.visible ? 'bg-neon-red/10 text-neon-red hover:bg-neon-red hover:text-white' : 'bg-neon-green/10 text-neon-green hover:bg-neon-green hover:text-white'}`}>
                          {edu.visible ? <><FiX size={14} /> Remove</> : <><FiRefreshCw size={14} /> Restore</>}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 🗂️ Manage Projects Tab */}
            {activeTab === "projects" && (
              <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="mb-6 flex items-center gap-2 font-display text-2xl font-bold text-cream">
                  <FiFolder className="text-neon-orange" /> Manage Projects
                </h1>
                
                <div className="mb-8 rounded-2xl border border-line bg-surface-2 p-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input type="text" placeholder="Project Title" className="rounded-xl border border-line bg-surface px-4 py-2 text-sm text-cream outline-none focus:border-neon-orange" onChange={(e) => setNewProj({...newProj, title: e.target.value})} value={newProj.title} />
                    <input type="text" placeholder="Tech Stack" className="rounded-xl border border-line bg-surface px-4 py-2 text-sm text-cream outline-none focus:border-neon-orange" onChange={(e) => setNewProj({...newProj, tech: e.target.value})} value={newProj.tech} />
                    <input type="text" placeholder="Short Description" className="rounded-xl border border-line bg-surface px-4 py-2 text-sm text-cream outline-none focus:border-neon-orange sm:col-span-2" onChange={(e) => setNewProj({...newProj, desc: e.target.value})} value={newProj.desc} />
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button onClick={handleSaveProj} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-neon-orange py-2.5 text-sm font-bold text-white hover:opacity-90">
                      {editingProjId ? <><FiCheck /> Save Changes</> : <><FiPlus /> Add Project</>}
                    </button>
                    {editingProjId && (
                      <button onClick={() => { setEditingProjId(null); setNewProj({ title: "", tech: "", desc: "" }); }} className="rounded-xl border border-line px-4 py-2.5 text-sm font-bold text-muted hover:text-cream">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {projectsData.map(proj => (
                    <div key={proj.id} className={`flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between transition-all ${proj.visible ? 'border-line bg-surface' : 'border-line/50 bg-surface/50 opacity-60'}`}>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-cream">{proj.title}</p>
                          {!proj.visible && <span className="rounded bg-neon-red/20 px-2 py-0.5 text-[10px] font-bold text-neon-red uppercase">Hidden</span>}
                        </div>
                        <p className="text-xs text-neon-orange">{proj.tech}</p>
                        <p className="text-sm text-muted mt-1">{proj.desc}</p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button onClick={() => handleEditProj(proj)} className="flex items-center gap-1 rounded-lg bg-neon-yellow/10 px-3 py-1.5 text-xs font-bold text-neon-yellow hover:bg-neon-yellow hover:text-bg transition-colors">
                          <FiEdit2 size={14} /> Edit
                        </button>
                        <button onClick={() => handleToggleProj(proj.id)} className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${proj.visible ? 'bg-neon-red/10 text-neon-red hover:bg-neon-red hover:text-white' : 'bg-neon-green/10 text-neon-green hover:bg-neon-green hover:text-white'}`}>
                          {proj.visible ? <><FiX size={14} /> Remove</> : <><FiRefreshCw size={14} /> Restore</>}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ⚙️ Preferences Tab */}
            {activeTab === "preferences" && (
              <motion.div key="preferences" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
                <div className="flex items-center justify-between rounded-2xl border border-line bg-surface-2 p-6">
                  <div>
                    <h3 className="text-lg font-bold text-cream">Appearance</h3>
                    <p className="text-sm text-ink-soft">Toggle between light and dark mode.</p>
                  </div>
                  <button onClick={toggleTheme} className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-cream transition-all hover:border-neon-yellow hover:text-neon-yellow">
                    {isDark ? <FiSun size={24} /> : <FiMoon size={24} />}
                  </button>
                </div>
                <div className="rounded-2xl border border-line bg-surface-2 p-6">
                  <h3 className="mb-4 text-lg font-bold text-cream">Language Preference</h3>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => saveLanguage("en")} className={`rounded-full border px-6 py-2.5 text-sm font-bold transition-all ${language === "en" ? "border-neon-blue bg-neon-blue/10 text-neon-blue" : "border-line text-muted hover:text-cream"}`}>English</button>
                    <button onClick={() => saveLanguage("dr")} className={`rounded-full border px-6 py-2.5 text-sm font-bold transition-all ${language === "dr" ? "border-neon-blue bg-neon-blue/10 text-neon-blue" : "border-line text-muted hover:text-cream"}`}>Dari (دری)</button>
                    <button onClick={() => saveLanguage("ps")} className={`rounded-full border px-6 py-2.5 text-sm font-bold transition-all ${language === "ps" ? "border-neon-blue bg-neon-blue/10 text-neon-blue" : "border-line text-muted hover:text-cream"}`}>Pashto (پښتو)</button>
                  </div>
                </div>
                <div className="mt-8 rounded-2xl border border-neon-red/30 bg-neon-red/5 p-6">
                  <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-neon-red"><FiTrash2 /> Danger Zone</h3>
                  <button onClick={() => {
                    if(window.confirm("Delete ALL data including hidden items? This cannot be undone.")) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }} className="rounded-xl bg-neon-red px-6 py-3 text-sm font-bold text-white hover:bg-red-700">
                    Reset All Website Data
                  </button>
                </div>
              </motion.div>
            )}

            {/* 🔐 Change Password Tab */}
            {activeTab === "password" && (
              <motion.div key="password" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="mb-6 flex items-center gap-2 font-display text-2xl font-bold text-cream">
                  <FiKey className="text-neon-blue" /> Security Settings
                </h1>
                <div className="rounded-2xl border border-line bg-surface-2 p-6 max-w-lg">
                  <form onSubmit={handleChangePassword} className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-cream">Current Password</label>
                      <input type="password" value={passwordForm.current} onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})} className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-cream outline-none focus:border-neon-blue" placeholder="Enter current password..." required />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-cream">New Password</label>
                      <input type="password" value={passwordForm.new} onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})} className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-cream outline-none focus:border-neon-blue" placeholder="Enter new password..." required />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-cream">Confirm New Password</label>
                      <input type="password" value={passwordForm.confirm} onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})} className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-cream outline-none focus:border-neon-blue" placeholder="Confirm new password..." required />
                    </div>
                    {passwordStatus.msg && (
                      <div className={`flex items-center gap-2 rounded-xl p-4 text-sm font-medium ${passwordStatus.type === "error" ? "bg-neon-red/10 text-neon-red" : "bg-neon-green/10 text-neon-green"}`}>
                        {passwordStatus.type === "success" ? <FiCheckCircle /> : <FiX />}
                        {passwordStatus.msg}
                      </div>
                    )}
                    <button type="submit" className="w-full rounded-xl bg-neon-blue py-3 text-sm font-bold text-white hover:bg-[#1168a0] transition-colors">
                      Update Password
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}