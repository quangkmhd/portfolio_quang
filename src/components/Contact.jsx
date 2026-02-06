import { motion } from 'motion/react'
import { FiMail, FiGithub, FiLinkedin, FiExternalLink, FiSend, FiPhone } from 'react-icons/fi'
import './Contact.css'

const socialLinks = [
  {
    name: 'Email',
    icon: FiMail,
    href: 'mailto:quangnhvn34@gmail.com',
    label: 'quangnhvn34@gmail.com',
    primary: true,
  },
  {
    name: 'GitHub (Main)',
    icon: FiGithub,
    href: 'https://github.com/quangkmhd',
    label: 'github.com/quangkmhd',
  },
  {
    name: 'Phone',
    icon: FiPhone,
    href: 'tel:0967829623',
    label: '0967829623',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="section-subtitle">
            Open to opportunities, collaborations, and interesting projects
          </p>
        </motion.div>

        <motion.div 
          className="contact-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="contact-card glass">
            <div className="contact-header">
              <div className="contact-avatar">
                <span>Q</span>
              </div>
              <div className="contact-info">
                <h3>Nguyễn Hữu Quang</h3>
                <p>AI Engineer</p>
              </div>
            </div>

            <div className="contact-links">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('mailto') || link.href.startsWith('tel') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className={`contact-link ${link.primary ? 'primary' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <div className="link-icon">
                    <link.icon />
                  </div>
                  <div className="link-content">
                    <span className="link-name">{link.name}</span>
                    <span className="link-label">{link.label}</span>
                  </div>
                  <FiExternalLink className="link-arrow" />
                </motion.a>
              ))}
            </div>


          </div>

          <div className="contact-decoration">
            <div className="decoration-circle circle-1" />
            <div className="decoration-circle circle-2" />
            <div className="decoration-circle circle-3" />
          </div>
        </motion.div>

        <motion.footer 
          className="footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="footer-contact-info">
            <div className="footer-item">
              <span className="footer-label">Email:</span>
              <a href="mailto:quangnhvn34@gmail.com" className="footer-link">quangnhvn34@gmail.com</a>
            </div>
            <div className="footer-item">
              <span className="footer-label">GitHub:</span>
              <a href="https://github.com/quangkmhd" target="_blank" rel="noopener noreferrer" className="footer-link">github.com/quangkmhd</a>
            </div>
            <div className="footer-item">
              <span className="footer-label">Phone:</span>
              <a href="tel:0967829623" className="footer-link">0967829623</a>
            </div>
          </div>
          <p className="copyright">
            Designed & Built by <span className="text-gradient">Quang</span>
          </p>
        </motion.footer>
      </div>
    </section>
  )
}
