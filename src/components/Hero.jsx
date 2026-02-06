import { motion } from 'motion/react'
import { FiGithub, FiMail, FiArrowDown } from 'react-icons/fi'
import './Hero.css'

export default function Hero() {
  const handleScrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero section">
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="badge-dot" />
            Open to Opportunities
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Nguyễn Hữu<br />
            <span className="text-gradient">Quang</span>
          </motion.h1>

          <motion.div 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="subtitle-role">AI Engineer</span>
            <span className="subtitle-divider">/</span>
            <span className="subtitle-stack">
              Computer Vision • LLM • Agent Systems
            </span>
          </motion.div>

          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Building production-ready AI systems that solve real problems.
            <br />
            <span className="description-highlight">AI is software, not magic.</span>
          </motion.p>

          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button className="btn btn-primary" onClick={handleScrollToProjects}>
              View My Work
              <FiArrowDown />
            </button>
            <button className="btn btn-secondary" onClick={handleScrollToContact}>
              <FiMail />
              Contact Me
            </button>
          </motion.div>

          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="stat">
              <span className="stat-value">1+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">500+</span>
              <span className="stat-label">Users on IQMeet</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">95%</span>
              <span className="stat-label">Model Accuracy</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="hero-code-block glass">
            <div className="code-header">
              <div className="code-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="code-filename">profile.py</span>
            </div>
            <pre className="code-content">
              <code>
{`class AIEngineer:
    def __init__(self):
        self.name = "Quang"
        self.focus = [
            "Computer Vision",
            "LLM & RAG",
            "Agent Systems"
        ]
        self.mindset = "Production-first"

    def solve(self, problem):
        """Start with problem,
        end with metrics."""
        return self.build_and_deploy(
            optimize_for="latency",
            measure="impact"
        )`}
              </code>
            </pre>
          </div>
        </motion.div>

        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  )
}
