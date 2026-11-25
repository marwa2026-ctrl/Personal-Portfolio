
import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";

import { ThemeProvider } from "./context/ThemeContext";

import Footer from "./components/Footer";
import Navbar from "./Components/Navbar";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Education from "./Pages/Education";
import Contact from "./Pages/Contact";
import Resume from "./Pages/Resume";
import Admin from "./components/Footer";
import Settings from "./Pages/Settings";

export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-bg text-cream transition-colors duration-300">
        <Navbar />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/education" element={<Education />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/settings" element={<Settings />} />

            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
