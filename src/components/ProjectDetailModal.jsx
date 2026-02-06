import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FiX, FiChevronLeft, FiChevronRight, FiExternalLink, FiGithub, FiZap, FiCpu, FiActivity, FiServer, FiCode, FiLayers, FiMic, FiDatabase, FiGlobe, FiShield, FiSearch, FiFolder, FiClock, FiCheckCircle } from 'react-icons/fi'
import './ProjectDetailModal.css'

// Soccer Highlight Project Data
const soccerHighlightData = {
  title: 'AI-Powered Soccer Highlight Generator',
  emoji: '⚽',
  tagline: 'Automated video editing for sports content',
  overview: 'Hệ thống AI tự động phát hiện các khoảnh khắc quan trọng trong trận đấu bóng đá và tạo highlight video tự động. Xây dựng pipeline end-to-end hoàn chỉnh từ video trận đấu đầy đủ (full match) đến video highlight chuyên nghiệp.',
  
  goals: [
    'Tự động tạo clips highlight: Trích xuất các phân cảnh ghi bàn, phạm lỗi, sút bóng...',
    'Phân loại & Chấm điểm: Tự động xếp hạng các clips theo mức độ hấp dẫn/quan trọng',
  ],
  
  components: [
    {
      icon: FiCpu,
      name: 'NVDEC Frame Fetcher',
      description: 'Giải mã video trên GPU (NVDEC). Clone tensor GPU tránh illegal memory access.'
    },
    {
      icon: FiLayers,
      name: 'Camera Feature Extractor',
      description: 'Trích xuất đặc trưng camera. Preprocessing: 224x224 (Resize+Padding), Backbone: ResNet.'
    },
    {
      icon: FiActivity,
      name: 'Hậu Xử Lý',
      description: 'Sử dụng Gaussian filter + find_peaks để chọn chính xác thời điểm sự kiện.'
    },
    {
      icon: FiServer,
      name: 'Ball Action Prediction',
      description: 'Chạy MultiDimStackerPredictor cho cả ball-action và action detection.'
    },
    {
      icon: FiCode,
      name: 'Rules Engine',
      description: 'Logic xác định thời điểm bắt đầu, khoảnh khắc then chốt, và kết thúc.'
    },
    {
      icon: FiZap,
      name: 'Scoring System',
      description: 'Final Score = Base Score + Camera Bonus + Combo Bonus'
    },
  ],
  
  models: [
    {
      name: 'MultiDimStacker (Action/Ball-Action)',
      details: [
        '2.5D Component: Trích xuất CNN features theo stacks (timm library)',
        '3D Component: InvertedResidual3d + SE blocks xử lý chuyển động',
        'Output: Projection → GeM pooling → Classifier'
      ]
    },
    {
      name: 'Camera Segmentation (PyTorch)',
      details: [
        'Backbone: ResNet trích xuất đặc trưng hình ảnh',
        'Output: Dự đoán lớp camera cho mỗi timestep'
      ]
    }
  ],
  
  workflow: [
    { step: 1, title: 'Chuẩn Bị', desc: 'Cấu hình file inference/inference_config.yaml' },
    { step: 2, title: 'Suy Luận Song Song', desc: 'Chạy đồng thời ball_action và camera prediction' },
    { step: 3, title: 'Gộp Dự Đoán', desc: 'Tạo file JSON tổng hợp' },
    { step: 4, title: 'Rules & Scoring', desc: 'Áp dụng luật và chấm điểm' },
    { step: 5, title: 'Cắt Clip', desc: 'Sử dụng ffmpeg cắt video không cần re-encode' },
  ],
  
  accuracy: [
    { model: 'Action Model', map: '0.797' },
    { model: 'Ball Action Model', map: '0.864' },
    { model: 'Camera Model', map: '0.910' },
    { model: 'Tổng thể (Overall)', map: '0.857', highlight: true },
  ],
  
  performance: [
    { label: 'Thiết bị', value: 'RTX 5090' },
    { label: 'Thời gian xử lý', value: '~15 phút', detail: 'cho 90 phút match' },
    { label: 'RAM sử dụng', value: '7 - 8 GB' },
  ],
  
  optimizations: [
    'VRAM Management: Tự động cleanup và cấp phát thông minh',
    'GPU Decoding: Tích hợp PyNvVideoCodec cho hiệu suất tối đa',
    'Long Video Handling: Xử lý mượt mà video > 2 tiếng',
    'Overlap Handling: Thuật toán gộp thông minh tránh lặp lại',
  ],
  
  apiEndpoints: [
    { method: 'POST', path: '/upload', desc: 'Upload video gốc' },
    { method: 'GET', path: '/video/{video_id}', desc: 'Lấy metadata (thời lượng, FPS, độ phân giải)' },
    { method: 'POST', path: '/process/{video_id}', desc: 'Bắt đầu chạy pipeline AI' },
    { method: 'GET', path: '/status/{job_id}', desc: 'Theo dõi tiến độ (% hoàn thành)' },
    { method: 'GET', path: '/results/{job_id}', desc: 'Danh sách clips kèm labels' },
    { method: 'GET', path: '/clips/{clip_id}', desc: 'Stream video clip' },
    { method: 'POST', path: '/select_clips', desc: 'Lưu danh sách clips user chọn' },
    { method: 'GET', path: '/download/clips', desc: 'Tải xuống file .zip highlight' },
  ],
  
  achievements: [
    'Parallel Processing (Multiprocessing) tối ưu tài nguyên',
    'Peak Detection cho event extraction chính xác',
    'Context-aware Rules Engine & Multi-factor Scoring',
    'Unified Config (YAML) và CLI/Web Demo (Gradio)',
  ],
  
  tech: ['PyTorch', 'CUDA', 'ResNet', 'FastAPI', 'FFmpeg', 'OpenCV', 'Docker', 'Gradio'],
  
  images: [
    { 
      src: '/projects/soccer-highlight/problem.png', 
      title: 'Giới thiệu bài toán',
      description: 'Video highlight là những đoạn nội dung hấp dẫn nhất từ các trận đấu thể thao. Mục tiêu: Ứng dụng AI để tự động trích xuất highlight từ video gốc.'
    },
    { 
      src: '/projects/soccer-highlight/solution.png', 
      title: 'Giải pháp Pipeline',
      description: '5 bước: Input Video → Event Extractor (AI Model) → Highlight Filter (AI + Rule base) → Highlight Selection → Output'
    },
    { 
      src: '/projects/soccer-highlight/step_1.png', 
      title: 'Demo - Input Video',
      description: 'Giao diện upload video: Có 2 cách nhập video - Upload file hoặc nhập đường dẫn trên máy.'
    },
    { 
      src: '/projects/soccer-highlight/step_2.png', 
      title: 'Demo - Processing',
      description: 'Bước 1: Chọn InputMethod → Bước 2: Upload video → Bước 3: Click Start Processing'
    },
    { 
      src: '/projects/soccer-highlight/step_3.png', 
      title: 'Demo - Highlight Clips',
      description: 'Các Video Highlight sau khi xử lý được hiển thị với nhãn (Goal, Foul, Free-kick...) và Score (0-100).'
    },
    { 
      src: '/projects/soccer-highlight/step_4.png', 
      title: 'Demo - Download Options',
      description: 'Có thể chọn tất cả để tải về, định dạng SRT cho metadata, và download clips hoặc metadata file.'
    },
    { 
      src: '/projects/soccer-highlight/step_5.png', 
      title: 'Demo - Video Editor Integration',
      description: 'Sau khi import video và file metadata vào phần mềm chỉnh sửa video, tên Highlight và thời gian được hiển thị ở caption.'
    },
  ]
}

const iqMeetData = {
  title: 'IQMeet - Nền Tảng Trí Tuệ Nhân Tạo Tác Vụ (Agentic AI)',
  emoji: '🎙️',
  tagline: 'Ghi âm, Tóm tắt & Phân tích chuyên sâu với công nghệ State-of-the-Art',
  overview: 'IQMeet là giải pháp AI Meeting Assistant toàn diện, tích hợp Agentic Intelligence để tự động hóa quy trình ghi chú và phân tích cuộc họp. Khác với các công cụ truyền thống, IQMeet sở hữu "bộ não" trung tâm biết tư duy lựa chọn công cụ (RAG/Transcript), giúp trích xuất insight chính xác và hỗ trợ vận hành doanh nghiệp hiệu quả. Được phát hành từ ngày 20/01, hiện tại hệ thống đã có hơn 500 người dùng đang sử dụng và truy cập.',
  
  goals: [
    'Agentic Intelligence: Bộ não điều phối thông minh, tự động chọn công cụ phân tích & trích dẫn nguồn minh bạch.',
    'Ghi âm & Chuyển văn bản: Real-time Transcription (<2s), nhận diện giọng Việt vùng miền & chuyên ngành.',
    'Phân tích chuyên sâu: Tóm tắt tự động, phát hiện Action Items & đánh dấu sự kiện quan trọng trên Timeline.',
    'Quản lý & Tổ chức: Knowledge Base (RAG) từ tài liệu upload, Workspace riêng biệt & Dashboard trực quan.'
  ],
  
  // Mapped from Image 2: Kiến trúc Hệ thống IQMeet - Công nghệ State-of-the-Art
  components: [
    { 
      icon: FiMic, 
      name: 'Vietnamese ASR', 
      description: 'Fine-tuned model. Tối ưu nhận diện tiếng Việt cho các vùng miền & chuyên ngành.' 
    },
    { 
      icon: FiSearch, 
      name: 'Advanced RAG', 
      description: 'Hybrid Search & Contextual Retrieval. Truy xuất ngữ cảnh chính xác.' 
    },
    { 
      icon: FiCpu, 
      name: 'Agentic AI', 
      description: 'Tự động hóa sử dụng tool để lựa chọn truy xuất cuộc họp hiện tại hay dùng RAG.' 
    },

  ],
  
  models: [
    { 
      name: 'Hệ Thống Nhận Diện Giọng Nói (ASR)', 
      details: [
        'Model: Conformer Fine-tuned',
        'Tính năng: Nhận diện đa vùng miền, thuật ngữ chuyên ngành (Y tế, Luật)',
        'Hiệu suất: WER < 15%, Độ trễ < 2s'
      ] 
    },
    { 
      name: 'Hệ Thống Xử Lý & Suy Luận (Agentic Core)', 
      details: [
        'Pattern: ReAct (Reasoning + Acting) & Reflection',
        'Orchestrator: Điều phối giữa RAG Tool (Quá khứ) và Transcript Tool (Hiện tại)',
        'Output: Tóm tắt context-aware, Action Items, Timeline Events'
      ] 
    }
  ],
  
  workflow: [
    { step: 1, title: 'Input & Stream', desc: 'Audio từ mic/file được stream qua WebSocket chunks' },
    { step: 2, title: 'ASR Engine', desc: 'Speech-to-Text realtime' },
    { step: 3, title: 'Agent Orchestrator', desc: 'Phân tích ngữ cảnh, gọi Tools (RAG/Search) nếu cần' },
    { step: 4, title: 'Insight Generation', desc: 'Tổng hợp Note, Task list, Timeline events' },

  ],
  
  roadmap: [
    { quarter: 'Q1: Foundation', content: 'Thu thập data & Fine-tune Whisper VN. Đạt mốc WER < 15%.' },
    { quarter: 'Q2: Enhancement', content: 'Phủ sóng giọng miền Trung. Domain Fine-tuning (Y tế, Luật).' },
    { quarter: 'Q3: Scale', content: 'Graph RAG cho quan hệ thực thể. Triển khai Enterprise SSO.' },
    { quarter: 'Q4: Market', content: 'On-premise deployment. Mở rộng đa ngôn ngữ (EN, CN).' }
  ],
  
  accuracy: [
    { model: 'ASR Accuracy (WER)', map: '< 15%' },
    { model: 'Real-time Latency', map: '< 2s' },
    { model: 'Cost Reduc.', map: '60%', highlight: true },

  ],
  
  performance: [
    { label: 'Latency', value: '< 2s', detail: 'Real-time stream' },
    { label: 'WER', value: '< 15%', detail: 'Word Error Rate' },

  ],
  
  optimizations: [
    'Hybrid Search RAG: Kết hợp Keyword + Semantic Search',
    'Dynamic Chunking: Tối ưu lồng tiếng & ngắt nghỉ',
    'Caching Layer: Giảm tải cho các truy vấn lặp lại',
    'Self-hosted LLMs: Tùy chọn triển khai On-premise'
  ],
  
  achievements: [
    'Triển khai thành công công nghệ Agentic AI tiên tiến',
    'Làm chủ công nghệ lõi ASR tiếng Việt',
    'Hệ thống RAG 2024 Tech (Hybrid + Contextual)',
    'Đáp ứng tiêu chuẩn bảo mật dữ liệu doanh nghiệp',
    'Đạt mốc 500+ người dùng kể từ khi phát hành (20/01)'
  ],
  
  tech: ['Whisper V3', 'Conformer', 'LangChain', 'FastAPI', 'Qdrant (Vector DB)', 'React', 'Docker'],
  
  images: [
    { src: '/projects/iqmeet/0_landingpage.png', title: 'Landing Page', description: 'Giao diện giới thiệu hiện đại và trực quan.' },
    { src: '/projects/iqmeet/1_dashboard.png', title: 'User Dashboard', description: 'Quản lý danh sách các cuộc họp và trạng thái.' },
    { src: '/projects/iqmeet/3_meetingpage_transcript.png', title: 'Live Transcript', description: 'Hiển thị nội dung hội thoại theo thời gian thực.' },
    { src: '/projects/iqmeet/6_recording.png', title: 'Recording Interface', description: 'Giao diện ghi âm trực quan với visualizer.' },
    { src: '/projects/iqmeet/7_summary.png', title: 'AI Summary', description: 'Tóm tắt thông minh và trích xuất nhiệm vụ.' },
    { src: '/projects/iqmeet/4_chatbot_panel.png', title: 'AI Chat Assistant', description: 'Hỏi đáp chi tiết về nội dung cuộc họp.' },
    { src: '/projects/iqmeet/5_timeline.png', title: 'Timeline View', description: 'Xem lại diễn biến cuộc họp theo thời gian.' },
    { src: '/projects/iqmeet/9_chatbotpage.png', title: 'Chatbot Interface', description: 'Giao diện tương tác chuyên sâu với AI.' },
    { src: '/projects/iqmeet/8_mail.png', title: 'Email Report', description: 'Báo cáo cuộc họp được gửi tự động qua email.' }
  ]
}

export default function ProjectDetailModal({ isOpen, onClose, projectId }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')
  
  // Lock body scroll and hide navbar when modal is open
  useEffect(() => {
    const navbar = document.querySelector('.navbar')
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      if (navbar) navbar.style.display = 'none'
    } else {
      document.body.style.overflow = 'unset'
      if (navbar) navbar.style.display = 'flex'
    }
    return () => {
      document.body.style.overflow = 'unset'
      if (navbar) navbar.style.display = 'flex'
    }
  }, [isOpen])

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!isOpen) return null

  const data = projectId === 'soccer-highlight' ? soccerHighlightData : 
               projectId === 'iqmeet' ? iqMeetData : null
  
  if (!data) return null

  const images = data.images

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const tabs = [
    { id: 'overview', label: '📌 Tổng Quan' },
    { id: 'architecture', label: '⚙️ Kiến Trúc' },
    { id: 'models', label: '🧠 AI Models' },
    { id: 'demo', label: '🎬 Demo' },
    (data.apiEndpoints && { id: 'api', label: '🌐 API' }),
    { id: 'performance', label: '📈 Hiệu Năng' },
  ].filter(Boolean)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="modal-container"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button className="modal-close" onClick={onClose}>
              <FiX />
            </button>


            {/* Tabs */}
            <div className="modal-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="modal-content">
              <AnimatePresence mode="wait">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="tab-content"
                  >
                    <div className="content-section">
                      <h3>🎯 Mục Tiêu Chính</h3>
                      <p className="overview-text">{data.overview}</p>
                      <ul className="goals-list">
                        {data.goals.map((goal, i) => (
                          <li key={i}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="content-section">
                      <h3>🏆 Thành Tựu Nổi Bật</h3>
                      <div className="achievements-grid">
                        {data.achievements.map((achievement, i) => (
                          <div key={i} className="achievement-item">
                            <span className="achievement-icon">✅</span>
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {data.roadmap && (
                      <div className="content-section">
                        <h3>📅 Lộ Trình Phát Triển 2025</h3>
                        <div className="achievements-grid" style={{ gridTemplateColumns: '1fr' }}>
                          {data.roadmap.map((item, i) => (
                            <div key={i} className="achievement-item" style={{ alignItems: 'flex-start' }}>
                              <span className="achievement-icon" style={{ marginTop: '0.2rem' }}>📌</span>
                              <div>
                                <strong style={{ display: 'block', marginBottom: '0.2rem' }}>{item.quarter}</strong>
                                <span style={{ opacity: 0.9 }}>{item.content}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="content-section">
                      <h3>🚀 Tối Ưu Đỉnh Cao</h3>
                      <div className="optimizations-list">
                        {data.optimizations.map((opt, i) => (
                          <div key={i} className="optimization-item">
                            <FiZap className="opt-icon" />
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Architecture Tab */}
                {activeTab === 'architecture' && (
                  <motion.div
                    key="architecture"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="tab-content"
                  >
                    <div className="content-section">
                      <h3>⚙️ Các Thành Phần Chính</h3>
                      <div className="components-grid">
                        {data.components.map((comp, i) => (
                          <div key={i} className="component-card">
                            <div className="component-icon">
                              <comp.icon />
                            </div>
                            <h4>{comp.name}</h4>
                            <p>{comp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="content-section">
                      <h3>🔄 Quy Trình Hoạt Động</h3>
                      <div className="workflow-pipeline">
                        {data.workflow.map((step, i) => (
                          <div key={i} className="workflow-step">
                            <div className="step-number">{step.step}</div>
                            <div className="step-content">
                              <h4>{step.title}</h4>
                              <p>{step.desc}</p>
                            </div>
                            {i < data.workflow.length - 1 && (
                              <div className="step-arrow">→</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Models Tab */}
                {activeTab === 'models' && (
                  <motion.div
                    key="models"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="tab-content"
                  >
                    <div className="content-section">
                      <h3>🧠 Mô Hình & Thuật Toán</h3>
                      <div className="models-list">
                        {data.models.map((model, i) => (
                          <div key={i} className="model-card">
                            <h4>{model.name}</h4>
                            <ul>
                              {model.details.map((detail, j) => (
                                <li key={j}>{detail}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="content-section">
                      <h3>📊 Độ Chính Xác (mAP@1)</h3>
                      <div className="accuracy-table">
                        {data.accuracy.map((item, i) => (
                          <div key={i} className={`accuracy-row ${item.highlight ? 'highlight' : ''}`}>
                            <span className="model-name">{item.model}</span>
                            <span className="model-score">{item.map}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Demo Tab */}
                {activeTab === 'demo' && (
                  <motion.div
                    key="demo"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="tab-content"
                  >
                    <div className="content-section">
                      <h3>🎬 Demo Trực Quan</h3>
                      
                      {/* Image Gallery */}
                      <div className="image-gallery">
                        <div className="gallery-main">
                          <button className="gallery-nav prev" onClick={prevImage}>
                            <FiChevronLeft />
                          </button>
                          <div className="gallery-image-container">
                            <img 
                              src={images[currentImageIndex].src} 
                              alt={images[currentImageIndex].title}
                              className="gallery-image"
                            />
                          </div>
                          <button className="gallery-nav next" onClick={nextImage}>
                            <FiChevronRight />
                          </button>
                        </div>
                        
                        <div className="gallery-info">
                          <h4>{images[currentImageIndex].title}</h4>
                          <p>{images[currentImageIndex].description}</p>
                        </div>

                        <div className="gallery-thumbnails">
                          {images.map((img, i) => (
                            <button
                              key={i}
                              className={`thumbnail ${i === currentImageIndex ? 'active' : ''}`}
                              onClick={() => setCurrentImageIndex(i)}
                            >
                              <img src={img.src} alt={img.title} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* API Tab */}
                {activeTab === 'api' && (
                  <motion.div
                    key="api"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="tab-content"
                  >
                    <div className="content-section">
                      <h3>🌐 Thiết Kế API (FastAPI)</h3>
                      <p className="api-intro">Hệ thống được thiết kế để dễ dàng tích hợp vào ứng dụng web/mobile:</p>
                      
                      <div className="api-endpoints">
                        {data.apiEndpoints.map((endpoint, i) => (
                          <div key={i} className="endpoint-row">
                            <span className={`method ${endpoint.method.toLowerCase()}`}>
                              {endpoint.method}
                            </span>
                            <code className="endpoint-path">{endpoint.path}</code>
                            <span className="endpoint-desc">{endpoint.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Performance Tab */}
                {activeTab === 'performance' && (
                  <motion.div
                    key="performance"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="tab-content"
                  >
                    <div className="content-section">
                      <h3>📈 Hiệu Năng Thực Tế</h3>
                      <div className="performance-cards">
                        {data.performance.map((perf, i) => (
                          <div key={i} className="perf-card">
                            <span className="perf-label">{perf.label}</span>
                            <span className="perf-value">{perf.value}</span>
                            {perf.detail && <span className="perf-detail">{perf.detail}</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="content-section">
                      <h3>🚀 Tối Ưu Hiệu Suất</h3>
                      <div className="optimizations-list">
                        {data.optimizations.map((opt, i) => (
                          <div key={i} className="optimization-item">
                            <FiZap className="opt-icon" />
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="content-section conclusion">
                      <h3>🏁 Kết Luận</h3>
                      <p>
                        Dự án <strong>Soccer Action Spotting</strong> đã thành công trong việc tạo ra một pipeline hoàn chỉnh, 
                        ổn định và chính xác cao. Sự kết hợp giữa <strong>Deep Learning</strong>, <strong>Computer Vision</strong> 
                        và <strong>Logic Rules</strong> mang lại giải pháp tự động hóa tối ưu cho ngành truyền thông thể thao.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
