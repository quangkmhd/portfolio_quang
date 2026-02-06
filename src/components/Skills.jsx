import { motion } from 'motion/react'
import './Skills.css'

const skillCategories = [
  {
    title: 'Core AI',
    icon: '🧠',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'Mathematical Optimization',
    ]
  },
  {
    title: 'Computer Vision',
    icon: '👁️',
    skills: [
      'Object Detection',
      'Segmentation',
      'OCR & Document AI',
      'VLM (Vision-Language)',
      'Image Classification',
    ]
  },
  {
    title: 'NLP & LLM',
    icon: '💬',
    skills: [
      'RAG Pipelines',
      'AI Agents',
      'Fine-tuning',
      'Prompt Engineering',
      'Multimodal AI',
    ]
  },
  {
    title: 'MLOps & Systems',
    icon: '⚙️',
    skills: [
      'FastAPI',
      'vLLM',
      'TensorRT',
      'Docker',
      'GPU Optimization',
    ]
  },
  {
    title: 'Tools & Frameworks',
    icon: '🛠️',
    skills: [
      'PyTorch',
      'OpenCV',
      'LangChain',
      'Supabase',
      'React/TypeScript',
    ]
  },
  {
    title: 'Production Skills',
    icon: '🚀',
    skills: [
      'Latency Profiling',
      'Model Quantization',
      'Scalable Pipelines',
      'Monitoring & Metrics',
      'Cost Optimization',
    ]
  },
]

export default function Skills() {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Technical Stack</span>
          <h2 className="section-title">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((category, catIndex) => (
            <motion.div 
              key={category.title}
              className="skill-category card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <div className="skill-tags">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span 
                    key={skill}
                    className="tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.3, 
                      delay: catIndex * 0.1 + skillIndex * 0.05 
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
