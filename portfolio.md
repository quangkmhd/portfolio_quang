# 👨‍💻 Nguyễn Hữu Quang

### **AI Engineer | Computer Vision & LLM & Agent Systems**

> Một năm kinh nghiệm thực chiến về Computer Vision, đang mở rộng sâu vào LLM & Autonomous Agents. Tập trung xây dựng giải pháp AI hiệu quả, tối ưu chi phí và sẵn sàng cho môi trường production.

---

## 🚀 **About Me**

**"Bắt đầu bằng vấn đề, kết thúc bằng con số."**

- **Focus**: Xây dựng hệ thống AI thực tế (Production-ready AI).
- **Core Values**: Quan tâm đến **Latency**, **Cost**, **Reliability**. AI là phần mềm (Software), không phải phép thuật (Magic).
- **Background**:
  - Sinh viên năm cuối Đại học FPT Hà Nội.
  - Gần 1 năm kinh nghiệm làm AI Engineer mảng Computer Vision tại FPT Software (Fsoft).
  - Định hướng trở thành AI Engineer đa năng, làm chủ cả Computer Vision, LLM và Agent Systems.

**Core Stack:**

- **Computer Vision**: OCR, Object Detection, Segmentation, Image Classification.
- **AI Solutions**: RAG, NLP, Autonomous Agents.
- **Production**: Model Optimization, Deployment, Monitoring, Scaling.

---

## 🛠️ **Core Expertise**

_Chia theo nhóm tư duy, tập trung vào ứng dụng thực tế._

### **a. Core AI & Science**

- **Machine Learning & Deep Learning**: Nền tảng vững chắc về ML/DL.
- **Optimization**: Tối ưu hóa mô hình cho hiệu năng cao nhất.

### **b. AI Domains**

- **Computer Vision**: Segmentation, Detection, VLM (Vision-Language Models), OCR...
- **NLP / LLM**: RAG (Retrieval-Augmented Generation), Agentic Workflows, Fine-tuning.
- **Multimodal**: Kết hợp xử lý dữ liệu từ nhiều nguồn khác nhau.

### **c. Engineering & MLOps**

- **Model Serving**: FastAPI, vLLM, TensorRT.
- **Data Pipeline**: Xây dựng quy trình xử lý dữ liệu tự động.
- **Infrastructure**: Docker, GPU Optimization, Scalable Deployment.
- **Performance**: Latency profiling & Bottleneck analysis.

---

## 📂 **Featured Projects (Case Studies)**

### **1. ⚽ AI-Powered Soccer Highlight Generator**

_Tự động hóa quy trình sản xuất video highlight bóng đá._

- **🎯 Bài toán**: Để có thể tạo một video highlight 5-20 phút từ một trận đấu kéo dài hơn 90 trong bóng đá cần rất nhiều thời gian và công sức xem lại. Làm highlight video bóng đá 90 phút có thể mất trung bình 6 tiếng. Vì vậy trận đấu vừa xong thì không thể có highlight này. Yêu cầu một AI có thể tự động hoặc bán tự động cho việc tạo highlight bóng đá, giảm từ 6 tiếng thành 30 phút.
- **💡 Approach & Architecture**: Thiết kế **End-to-End Pipeline** kết hợp 3 module chuyên biệt:
  1. **Ball Action Spotting Module**: Phát hiện và phân loại các hành động quan trọng (sút, chuyền, phạm lỗi...) bằng deep learning.
  2. **Camera View Segmentation**: Sử dụng ResNet + CALF để phân loại góc camera (sân chính, cận cảnh, góc khung thành...) nhằm lọc bỏ các cảnh không quan trọng.
  3. **Rule-Based Scoring Engine**: Gán điểm ưu tiên cho từng khoảnh khắc dựa trên sự kiện, góc camera và context để tạo ranking highlight.
- **🛠️ Tech Stack**:
  - **AI/ML**: PyTorch, CUDA, ResNet, Custom Deep Learning Models.
  - **Backend**: Python 3.10, FastAPI, Async/Await Pattern (Async job queue).
  - **Frontend**: Gradio (Web UI cho upload và xem trước kết quả), HTML/CSS/JavaScript.
  - **Video Processing**: FFmpeg, OpenCV.
  - **Infrastructure**: Docker, NVIDIA Container Toolkit, Scalable deployment.
  - **Storage**: JSON, YAML config, SRT/XML subtitle export ready cho broadcasting.
- **📊 Kết quả & Impact**:
  | **Metric** | **Kết quả** |
  | --- | --- |
  | **Tốc độ xử lý** | ~10-15 phút cho 1 trận đấu 90 phút (GPU enabled) |
  | **Độ chính xác** | 85-90% trong việc phát hiện các khoảnh khắc quan trọng |
  | **Tiết kiệm thời gian** | **90% so với biên tập thủ công** (từ 2-3 giờ → 10-15 phút) |
  | **Auto Ranking** | Tự động xếp hạng highlight theo độ quan trọng |
- **🎬 Demo & Resources**:
  ![Soccer Highlight Demo 1](attachment:48ec42e7-ea1b-4e8a-8763-a96bf7f2903c:image.png)
  ![Soccer Highlight Demo 2](attachment:f07a691b-28b0-4396-aee8-44683d028c86:image.png)

---

### **2. 🤖 IQMeet - AI Meeting Assistant**

_Trợ lý cuộc họp thông minh: Transcription thời gian thực & Tóm tắt nội dung._

- **🎯 Bài toán**: Trong môi trường làm việc hiện đại, việc ghi chú cuộc họp thủ công gây lãng phí thời gian và dễ bỏ sót thông tin quan trọng. Các giải pháp có sẵn như Otter.ai thường tốn kém hoặc không hỗ trợ tốt tiếng Việt. Tự động hóa việc ghi chú, tóm tắt và trích xuất insight từ cuộc họp với độ chính xác cao, chi phí tối ưu và hỗ trợ đa ngôn ngữ.
- **💡 Approach & Architecture**:
  - **Real-time Processing**: Xử lý audio streaming qua WebSocket để giảm độ trễ thay vì chờ kết thúc cuộc họp.
  - **Microservices Architecture**: Tách biệt STT, AI Agent, Email services để dễ scale và maintain.
  - **Cost Optimization**: Sử dụng Soniox STT thay vì Google/Azure giúp giảm 60% chi phí.
  - **Multi-tier System**: Freemium model với Pro Trial tự động giúp tối ưu conversion rate.
- **🛠️ Tech Stack**:
  - **Frontend**: React, TypeScript, TanStack Query, Material UI v7, Responsive Design.
  - **Backend & AI**: Python FastAPI (Microservices), Soniox STT API, LLM Agent (Custom prompts, RAG Pipeline).
  - **Infrastructure**: Supabase (Postgres, Storage, Real-time), Row Level Security (RLS), Docker, Ngrok.
  - **MLOps**: Sentry (Error tracking), Usage logging (recordingSeconds, cost per meeting), A/B testing.
- **📈 Thành tích nổi bật (Latest Stats)**:
  - **Ra mắt**: 01/02/2026.
  - **Tăng trưởng**: Đạt gần **500 người dùng** chỉ trong 5 ngày (tính đến 06/02).
  - **Latency**: < 2s cho kết quả transcription.
  - **Accuracy**: 92% độ chính xác cho tiếng Việt & English.
  - **Conversion**: 23% trial-to-paid conversion rate.
- **🎬 Resources**:
  - **Live Demo**: [https://iqmeet.app](https://iqmeet.app)
  - **GitHub**: [github.com/quangnhvn34/IQMeet](https://github.com/quangnhvn34/IQMeet)
  - **Facebook**: [facebook.com/IQMeetOfficial](https://www.facebook.com/profile.php?id=61587283897490)
- **Key Features**:
  ✅ Real-time transcription (< 2s latency).
  ✅ AI-powered summary & action items extraction.
  ✅ Automatic email notes delivery.
  ✅ Admin dashboard & user analytics.
  ✅ Multi-tier pricing with trial automation.

---

## 💼 **Work Experience**

### **AI Engineer | [Công ty] | [Thời gian]**

- **Real-time Content Moderation**: Xây dựng hệ thống kiểm duyệt video: độ chính xác 95% @ 25 FPS, xử lý 500+ giờ/ngày.
- **Zero-shot Visual Prompt Detection**: Triển khai hệ thống phát hiện vật thể qua visual prompting: độ chính xác 87%, giảm thời gian deployment từ 2-3 ngày xuống **5 phút**.
- **Document Intelligence & OCR**: Phát triển OCR thông minh dựa trên Vision-Language Models (VLM): độ chính xác 96%, hỗ trợ đa ngôn ngữ, tăng 10x tốc độ xử lý.
- **Production Model Optimization**: Tối ưu hóa mô hình production 4x bằng quantization, cắt giảm 80% chi phí hạ tầng.
- **Compliance Automation**: Tự động hóa quy trình tuân thủ 1000+ video/ngày, giảm 90% nỗ lực thủ công.

**Tech used**: _PyTorch, TensorRT, Vision-Language Models (VLM), FastAPI, Docker._

---

## 📧 **Contact & Connect**

- **Emamonil**: [quangnhvn34@gmail.com](mailto:quangnhvn34@gmail.com)
- **GitHub**: [github.com/quangkmhd](https://github.com/quangkmhd)
- **LinkedIn**: [Link LinkedIn của bạn]

---

_(Bản portfolio cập nhật ngày 06/02/2026)_
