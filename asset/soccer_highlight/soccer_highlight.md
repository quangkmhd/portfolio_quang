# ⚽ AI-Powered Soccer Highlight Generator

> **Dự án Soccer Action Spotting**: Hệ thống AI tự động phát hiện các khoảnh khắc quan trọng trong trận đấu bóng đá và tạo highlight video tự động.

---

## 📌 1. TỔNG QUAN DỰ ÁN

### 🎯 Mục Tiêu Chính

Xây dựng pipeline **end-to-end** hoàn chỉnh để phát hiện sự kiện bóng đá từ video trận đấu đầy đủ (full match) và tự động tạo video highlight chuyên nghiệp:

- **Tự động tạo clips highlight**: Trích xuất các phân cảnh ghi bàn, phạm lỗi, sút bóng...
- **Phân loại & Chấm điểm**: Tự động xếp hạng các clips theo mức độ hấp dẫn/quan trọng.

---

## ⚙️ 2. CÁC THÀNH PHẦN CHÍNH

### 2.1 Xử Lý Dữ Liệu

| Thành phần                   | Đường dẫn file                                                | Chức năng & Tính năng                                                                    |
| :--------------------------- | :------------------------------------------------------------ | :--------------------------------------------------------------------------------------- |
| **NVDEC Frame Fetcher**      | `ball_action_spotting/src/frame_fetchers/nvdec.py`            | Giải mã video trên GPU (NVDEC). Tính năng: Clone tensor GPU tránh illegal memory access. |
| **Camera Feature Extractor** | `CALF_segmentation/Features/VideoFeatureExtractor_pytorch.py` | Trích xuất đặc trưng camera. Preprocessing: 224x224 (Resize+Padding), Backbone: ResNet.  |
| **Hậu Xử Lý**                | `utils/post_processing.py`                                    | Sử dụng Gaussian filter + `find_peaks` để chọn chính xác thời điểm sự kiện.              |

### 2.2 Hệ Thống Suy Luận (Inference)

- **Ball Action Prediction**:
  - _Function_: `ball_action_spotting.ball_action_predict.predict_on_video()`
  - Chạy `MultiDimStackerPredictor` cho cả ball-action và action.
- **Camera Prediction**:
  - _Function_: `CALF_segmentation.camera_predict_pytorch()`
  - Trích xuất đặc trưng và inference để phân loại các loại góc quay camera.
- **Prediction Merging**:
  - _File_: `rules/combine_predictions.py`
  - Gộp các kết quả dự đoán thành file output chuẩn: `<video>_predicted.json`.

### 2.3 Rules Engine & Scoring

- **Rules Engine (`rules/engine.py`)**: Logic xác định thời điểm bắt đầu (start), khoảnh khắc then chốt (key moment), và kết thúc (end).
- **Scoring System (`rules/rank_score.py`)**: Chấm điểm mức độ quan trọng cho từng clip.
  - **Công thức**: `Final Score = Base Score + Camera Bonus + Combo Bonus`.

---

## 🧠 3. MÔ HÌNH & THUẬT TOÁN

### 3.1 MultiDimStacker (Action/Ball-Action)

Kiến trúc kết hợp không gian và thời gian:

- **2.5D Component**: Trích xuất CNN features theo stacks (timm library).
- **3D Component**: `InvertedResidual3d` + SE blocks xử lý chuyển động.
- **Output**: Projection → GeM pooling → Classifier.

### 3.2 Camera Segmentation (PyTorch)

- **Backbone**: ResNet trích xuất đặc trưng hình ảnh.
- **Output**: Dự đoán lớp camera cho mỗi bước thời gian (timestep).

---

## 🔄 4. QUY TRÌNH HOẠT ĐỘNG (WORKFLOW)

### 4.1 Workflow Overview

`Input Video` ➔ `Parallel Prediction` ➔ `Combine` ➔ `Rules & Scoring` ➔ `Cut Clips` ➔ `Output`

### 4.2 Chi Tiết Các Bước

1. **Bước 0: Chuẩn Bị**: Cấu hình file `inference/inference_config.yaml`.
2. **Bước 1: Suy Luận Song Song**: Chạy đồng thời `ball_action` và `camera` prediction.
3. **Bước 2: Gộp Dự Đoán**: Tạo file JSON tổng hợp.
4. **Bước 3: Rules & Scoring**: Áp dụng luật (rules) và chấm điểm (ranking).
5. **Bước 4: Cắt Clip**: Sử dụng `ffmpeg` để cắt video mà không cần re-encode (tốc độ cực nhanh).
6. **Bước 5: Gộp Clips (Optional)**: Ghép các clips nhỏ thành một video highlight hoàn chỉnh.

### 4.3 Cách Gọi Lệnh (CLI)

```bash
python main.py "path/to/video.mp4" --config inference/inference_config.yaml
```

---

## 📈 5. HIỆU NĂNG & KẾT QUẢ

### 5.1 Độ Chính Xác

| Model                  | Metric (mAP@1) |
| :--------------------- | :------------: |
| **Action Model**       |     0.797      |
| **Ball Action Model**  |     0.864      |
| **Camera Model**       |     0.910      |
| **Tổng thể (Overall)** |   **0.857**    |

### 5.2 Hiệu Năng Thực Tế

- **Thiết bị**: RTX 5090.
- **Thời gian xử lý**: ~15 phút cho một trận đấu 90 phút.
- **RAM sử dụng**: 1.5 - 2 GB.
- **Optimizations**:
  - Tối ưu VRAM (cleanup giữa các model).
  - Sử dụng NVDEC cho tốc độ decoding GPU vượt trội.
  - `ffmpeg -c copy` giúp cắt clip tức thì.

---

## 🌐 6. THIẾT KẾ API (FastAPI)

Hệ thống được thiết kế để dễ dàng tích hợp vào ứng dụng web/mobile:

1.  **POST `/upload`**: Người dùng upload video gốc.
2.  **GET `/video/{video_id}`**: Lấy metadata (thời lượng, FPS, độ phân giải).
3.  **POST `/process/{video_id}`**: Bắt đầu chạy pipeline AI.
4.  **GET `/status/{job_id}`**: Theo dõi tiến độ (% hoàn thành).
5.  **GET `/results/{job_id}`**: Trả về danh sách clips kèm labels (Goal, Penalty...).
6.  **GET `/clips/{clip_id}`**: Stream video clip cụ thể.
7.  **POST `/select_clips`**: Lưu danh sách clips user chọn.
8.  **GET `/download/clips`**: Tải xuống file .zip chứa highlight.
9.  **GET `/download/metadata`**: Xuất metadata (SRT/XML) cho phần mềm chuyên dụng.
10. **Monitoring**: `/health`, `/queue/status`, `/metrics`.

---

## 🏆 7. THÀNH TỰU & TỐI ƯU

### ✅ Tính Năng Hoàn Thành

- Parallel Processing (Multiprocessing) tối ưu tài nguyên.
- Peak Detection cho event extraction chính xác.
- Context-aware Rules Engine & Multi-factor Scoring.
- Unified Config (YAML) và CLI/Web Demo (Gradio).

### 🚀 Tối Ưu Đỉnh Cao

- **VRAM Management**: Tự động cleanup và cấp phát thông minh cho parallel processing.
- **GPU Decoding**: Tích hợp PyNvVideoCodec cho hiệu suất tối đa.
- **Long Video Handling**: Xử lý mượt mà video kéo dài trên 2 tiếng.
- **Overlap Handling**: Thuật toán gộp thông minh tránh lặp lại nội dung.

---

## 🏁 8. KẾT LUẬN

Dự án **Soccer Action Spotting** đã thành công trong việc tạo ra một pipeline hoàn chỉnh, ổn định và chính xác cao. Sự kết hợp giữa **Deep Learning**, **Computer Vision** và **Logic Rules** mang lại giải pháp tự động hóa tối ưu cho ngành truyền thông thể thao.

---

_(Bản tài liệu cập nhật ngày 06/02/2026)_
