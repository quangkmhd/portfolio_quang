import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FiExternalLink, FiGithub, FiChevronDown, FiChevronUp, FiArrowRight } from 'react-icons/fi'
import ProjectDetailModal from './ProjectDetailModal'
import './Projects.css'

const projects = [
  {
    id: 'soccer-highlight',
    title: 'AI-Powered Soccer Highlight Generator',
    emoji: '⚽',
    tagline: 'Automated video editing for sports content',
    description: 'End-to-end pipeline that automates the creation of soccer highlight videos, reducing production time from 6 hours to 30 minutes.',
    problem: 'Manual highlight creation takes 6+ hours for a 90-minute match. Sports broadcasters and YouTube channels need faster turnaround.',
    solution: `Built an End-to-End Pipeline with 3 specialized AI models:
• Ball Action Spotting: Deep Learning for detecting key moments (shots, goals, fouls, cards)
• Camera View Segmentation: ResNet + CALF for filtering irrelevant scenes
• Rule-Based Scoring Engine: Context-aware ranking of highlight moments`,
    tech: ['PyTorch', 'CUDA', 'ResNet', 'FastAPI', 'FFmpeg', 'OpenCV', 'Docker'],
    results: [
      { label: 'Speed Improvement', value: '8x faster', detail: '10-15 min on RTX5090' },
      { label: 'Detection Accuracy', value: '85-90%', detail: 'Key action detection' },
      { label: 'Time Reduction', value: '90%', detail: 'Labor cost savings' },
    ],
    // demoUrl: 'https://example.com',
    // githubUrl: 'https://github.com/quangkmhd/soccer-highlight',
  },
  {
    id: 'iqmeet',
    title: 'IQMeet - AI Meeting Assistant',
    emoji: '🤖',
    tagline: 'Real-time transcription & intelligent summarization',
    description: 'Production SaaS platform for automated meeting notes, transcription, and AI-powered summarization with support for Vietnamese and English.',
    problem: 'Manual note-taking during meetings wastes time and misses important details. Existing solutions are expensive and lack Vietnamese support.',
    solution: `Built a full-stack real-time meeting assistant:
• Real-time Processing: WebSocket streaming instead of batch processing
• Microservices Architecture: Separate STT, Agent, Email services for scalability
• Cost Optimization: Soniox STT reduces costs by 60% vs Google/Azure
• Freemium Model: Pro Trial automation for conversion optimization`,
    tech: ['React', 'TypeScript', 'FastAPI', 'Supabase', 'WebSocket', 'Soniox', 'LLM Agent'],
    results: [
      { label: 'Real-time Latency', value: '<2s', detail: 'Live transcription' },
      { label: 'Vietnamese Accuracy', value: 'Up to 95%', detail: 'Optimized Model' },
      { label: 'Users', value: '500+', detail: 'Organic growth' },
    ],
    demoUrl: 'https://iqmeet.vn/',
    // githubUrl: 'https://github.com/quangnhvn34/IQMeet',
    featured: true,
  },
]

function ProjectCard({ project, index, onOpenModal }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div 
      className={`project-card card ${project.featured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="project-header">
        <span className="project-emoji">{project.emoji}</span>
        <div className="project-title-group">
          <h3>{project.title}</h3>
          <p className="project-tagline">{project.tagline}</p>
        </div>
        {project.featured && <span className="featured-badge">Featured</span>}
      </div>

      <p className="project-description">{project.description}</p>

      <div className="project-tech">
        {project.tech.map((tech) => (
          <span key={tech} className="tag">{tech}</span>
        ))}
      </div>

      <div className="project-results">
        {project.results.map((result) => (
          <div key={result.label} className="result-item">
            <span className="result-value">{result.value}</span>
            <span className="result-label">{result.label}</span>
          </div>
        ))}
      </div>

      <button 
        className="expand-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>Hide Details <FiChevronUp /></>
        ) : (
          <>View Case Study <FiChevronDown /></>
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="project-details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="detail-section">
              <h4>🎯 The Problem</h4>
              <p>{project.problem}</p>
            </div>
            <div className="detail-section">
              <h4>💡 Solution & Approach</h4>
              <p style={{ whiteSpace: 'pre-line' }}>{project.solution}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Case Study Button for projects with detailed blog */}
      {['soccer-highlight', 'iqmeet'].includes(project.id) && (
        <button 
          className="btn btn-primary full-case-study-btn"
          onClick={() => onOpenModal(project.id)}
        >
          <FiArrowRight /> View Full Case Study
        </button>
      )}

      <div className="project-links">
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <FiExternalLink /> Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <FiGithub /> GitHub
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  const handleOpenModal = (projectId) => {
    setSelectedProject(projectId)
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
  }

  return (
    <>
      <section id="projects" className="projects section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Case Studies</span>
            <h2 className="section-title">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="section-subtitle">
              Real problems solved with measurable impact
            </p>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                onOpenModal={handleOpenModal}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal 
        isOpen={selectedProject !== null}
        onClose={handleCloseModal}
        projectId={selectedProject}
      />
    </>
  )
}
