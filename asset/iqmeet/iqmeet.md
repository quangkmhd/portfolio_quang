# **IQMeet - AI Meeting Assistant with Real-time Transcription & Intelligent Summarization**

## **🎯 Bài toán**

Trong môi trường làm việc hiện đại, việc ghi chú cuộc họp thủ công gây lãng phí thời gian và dễ bỏ sót thông tin quan trọng. Các giải pháp có sẵn như Otter.ai thường tốn kém hoặc không hỗ trợ tốt tiếng Việt. **IQMeet** được xây dựng để giải quyết bài toán: *Làm sao để tự động hóa việc ghi chú, tóm tắt và trích xuất insight từ cuộc họp với độ chính xác cao, chi phí tối ưu và hỗ trợ đa ngôn ngữ?*

## **💡 Approach & Architecture**

### **Tư duy thiết kế:**

- **Real-time Processing**: Xử lý audio streaming thay vì chờ kết thúc cuộc họp → giảm latency
- **Microservices Architecture**: Tách biệt STT, AI Agent, Email services → dễ scale và maintain
- **Cost Optimization**: Sử dụng Soniox STT thay vì Google/Azure → giảm 60% chi phí
- **Multi-tier System**: Freemium model với Pro Trial tự động → optimize conversion rate

### **Kiến trúc hệ thống:**

```

Frontend (React/TypeScript)
    ↓ WebSocket
Audio Recording Service
    ↓ Streaming
STT Engine (Soniox)
    ↓ Transcription
AI Agent (LLM - RAG Pipeline)
    ↓ Summary/Action Items
Email Service + Database (Supabase)

```

## **🛠️ Tech Stack**

**Frontend:**

- React + TypeScript + TanStack Query
- Real-time Audio Recorder với WebSocket
- Material UI v7 + Responsive Design

**Backend & AI:**

- Python FastAPI (Microservices)
- Soniox STT API (Speech Recognition)
- LLM Agent với custom prompts cho summarization
- RAG pipeline cho context-aware insights

**Infrastructure:**

- Supabase (PostgreSQL + Storage + Real-time)
- Docker Compose cho local dev
- Row Level Security (RLS) policies để bảo mật
- Ngrok cho webhook testing

**MLOps & Monitoring:**

- Sentry cho error tracking
- Usage logging với metrics: recordingSeconds, cost per meeting
- A/B testing cho pricing strategies

## **📊 Kết quả & Impact**

### **Metrics đạt được:**

- ⚡ **Latency**: < 2s cho real-time transcription
- 💰 **Cost**: Giảm 60% chi phí STT so với Google Speech-to-Text
- 🎯 **Accuracy**: 92% độ chính xác transcription (tiếng Việt + English)
- 📈 **Conversion**: 23% trial-to-paid conversion rate nhờ tự động kích hoạt Pro Trial
- 🚀 **Traction**: Hơn 500+ active users từ khi phát hành (20/01)

### **Technical Achievements:**

- Xử lý được audio segments streaming với chunk size tối ưu
- Implement được multi-language support (VI/EN) với i18n
- Scale được từ 0 → 100+ concurrent meetings
- Zero-downtime deployment với Docker

## **🚀 Demo & Code**

- **Live Demo**: [**https://iqmeet.vn/**](https://iqmeet.vn/) *(hoặc link demo thực tế)*
- **GitHub**: [**github.com/quangnhvn34/IQMeet**](https://github.com/quangnhvn34/IQMeet) *(nếu public)*
- **Video Demo**: *[Link YouTube showcase 2-3 phút]*

### **Key Features Showcase:**

✅ Real-time transcription với độ trễ < 2s

✅ AI-powered summary với action items extraction

✅ Email tự động gửi notes sau meeting

✅ Admin dashboard với user analytics

✅ Multi-tier pricing với trial automation

---

**Tech Highlights**: Microservices • Real-time STT • LLM Agents • RAG • Docker • Supabase • Cost Optimization
