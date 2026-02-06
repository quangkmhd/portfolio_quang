import { motion } from 'motion/react'
import { FiCheck } from 'react-icons/fi'
import './Experience.css'

const experiences = [
  {
    title: 'AI Engineer',
    company: 'FPT Software',
    period: '05/2025 - Present',
    current: true,
    achievements: [
      {
        title: 'Zero-shot Visual Prompt Detection',
        description: 'Implemented reference-based zero-shot system detecting targets from sample images without training. Achieved 91% accuracy after 6 optimization rounds.',
        impact: '91% Acc, 6 Rounds Opt'
      },
      {
        title: 'Document Intelligence & OCR',
        description: 'Researched and fine-tuned models for enterprise needs. Implemented edge deployment on camera devices using llama.cpp.',
        impact: 'Fine-tune & llama.cpp'
      },
      {
        title: 'Production Model Optimization',
        description: 'Optimized model performance using Quantization techniques and TensorRT algorithms.',
        impact: 'Quantization & TensorRT'
      },
      {
        title: 'Automated Data Labeling Tool',
        description: 'Designed and developed an automated data labeling tool, increasing individual labeling speed by 10x.',
        impact: '10x labeling speed'
      },
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="experience section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Career</span>
          <h2 className="section-title">
            Work <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.company}
              className="experience-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="timeline-marker">
                <div className={`marker-dot ${exp.current ? 'active' : ''}`} />
                <div className="marker-line" />
              </div>

              <div className="experience-content card">
                <div className="experience-header">
                  <div>
                    <h3>{exp.title}</h3>
                    <p className="company">{exp.company}</p>
                  </div>
                  <div className="period-badge">
                    {exp.current && <span className="current-indicator" />}
                    {exp.period}
                  </div>
                </div>

                <div className="achievements-list">
                  {exp.achievements.map((achievement, achIndex) => (
                    <motion.div 
                      key={achievement.title}
                      className="achievement-item"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + achIndex * 0.1 }}
                    >
                      <div className="achievement-icon">
                        <FiCheck />
                      </div>
                      <div className="achievement-content">
                        <h4>{achievement.title}</h4>
                        <p>{achievement.description}</p>
                        <span className="achievement-impact">{achievement.impact}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
