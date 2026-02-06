import { motion } from 'motion/react'
import { FiTarget, FiCpu, FiCode } from 'react-icons/fi'
import './About.css'

const highlights = [
  {
    icon: FiTarget,
    title: 'Production-First Mindset',
    description: 'Focus on Latency, Cost, and Reliability. Every solution is built to scale.'
  },
  {
    icon: FiCpu,
    title: 'End-to-End AI Systems',
    description: 'From data pipelines to model deployment, monitoring, and optimization.'
  },
  {
    icon: FiCode,
    title: 'Problem-Driven Approach',
    description: '"Start with problem, end with metrics." AI is software, not magic.'
  }
]

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">About Me</span>
          <h2 className="section-title">
            Building AI that <span className="text-gradient">works</span>
          </h2>
        </motion.div>

        <div className="about-grid">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="about-intro">
              I'm <strong>Nguyễn Hữu Quang</strong>, an AI Engineer specializing in 
              Computer Vision and LLM Agents. Currently a senior at FPT University, Hanoi, 
              with nearly 1 year of production experience at FPT Software.
            </p>
            
            <p>
              My philosophy is simple: <em>"Start with the problem, end with the metrics."</em> 
              I believe AI should be treated as software engineering, with clear goals, 
              measurable outcomes, and production-grade quality.
            </p>

            <p>
              My goal is to become a versatile AI Engineer, mastering Computer Vision, 
              LLM systems, and Agentic AI to build solutions that truly impact users.
            </p>

            <div className="about-quote glass">
              <blockquote>
                "AI is software, not magic."
              </blockquote>
            </div>
          </motion.div>

          <div className="about-highlights">
            {highlights.map((item, index) => (
              <motion.div 
                key={item.title}
                className="highlight-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="highlight-icon">
                  <item.icon />
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
