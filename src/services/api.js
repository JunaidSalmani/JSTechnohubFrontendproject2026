import axios from "axios";

// Automatically use local Spring Boot server when developing on localhost
const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
   window.location.hostname === "127.0.0.1");

const API_URL = isLocalhost
  ? "http://localhost:8080"
  : "https://api.jstechnohub.com";

const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper for automatic local fallback if remote API is down/unreachable
const executeWithFallback = async (requestFn, localEndpoint, method = "post", data = null) => {
  try {
    return await requestFn();
  } catch (err) {
    if (!API_URL.includes("localhost")) {
      console.warn(`Remote API failed (${err.message}). Falling back to local backend: http://localhost:8080${localEndpoint}`);
      if (method === "post") return await axios.post(`http://localhost:8080${localEndpoint}`, data);
      if (method === "get") return await axios.get(`http://localhost:8080${localEndpoint}`);
      if (method === "delete") return await axios.delete(`http://localhost:8080${localEndpoint}`);
      if (method === "patch") return await axios.patch(`http://localhost:8080${localEndpoint}`, data);
    }
    throw err;
  }
};

// ----------------- Courses -----------------
export const getAllCourses = () => executeWithFallback(() => api.get("/api/courses"), "/api/courses", "get");
export const getCourseById = (id) => executeWithFallback(() => api.get(`/api/courses/${id}`), `/api/courses/${id}`, "get");
export const createCourse = (course) => executeWithFallback(() => api.post("/api/courses", course), "/api/courses", "post", course);
export const updateCourse = (id, course) => executeWithFallback(() => api.put(`/api/courses/${id}`, course), `/api/courses/${id}`, "put", course);
export const deleteCourse = (id) => executeWithFallback(() => api.delete(`/api/courses/${id}`), `/api/courses/${id}`, "delete");

// ----------------- Training Batches -----------------
export const getAllBatches = () => executeWithFallback(() => api.get("/api/batches"), "/api/batches", "get");
export const getBatchById = (id) => executeWithFallback(() => api.get(`/api/batches/${id}`), `/api/batches/${id}`, "get");
export const createBatch = (batch) => executeWithFallback(() => api.post("/api/batches", batch), "/api/batches", "post", batch);
export const updateBatch = (id, batch) => executeWithFallback(() => api.put(`/api/batches/${id}`, batch), `/api/batches/${id}`, "put", batch);
export const deleteBatch = (id) => executeWithFallback(() => api.delete(`/api/batches/${id}`), `/api/batches/${id}`, "delete");

// ----------------- Enquiries -----------------
// Course enquiry
export const submitEnquiry = (enquiry) =>
  executeWithFallback(() => api.post("/api/enquiries", enquiry), "/api/enquiries", "post", enquiry);

// Certification enquiry
export const submitCertificationEnquiry = (enquiry) =>
  executeWithFallback(() => api.post("/api/enquiries/certification", enquiry), "/api/enquiries/certification", "post", enquiry);

// Consulting Services Enquiry
export const submitConsultingEnquiry = (enquiry) =>
  executeWithFallback(() => api.post("/api/consulting/enquiries", enquiry), "/api/consulting/enquiries", "post", enquiry);

// ----------------- Admin (Unified) -----------------
export const getAllEnquiries = () => executeWithFallback(() => api.get("/api/admin/enquiries"), "/api/admin/enquiries", "get");
export const toggleEnquiryClarified = (type, id) =>
  executeWithFallback(() => api.patch(`/api/admin/enquiries/${type}/${id}/toggle`), `/api/admin/enquiries/${type}/${id}/toggle`, "patch");

// ----------------- Reviews -----------------
export const getPublicReviews = () => executeWithFallback(() => api.get("/api/reviews/public"), "/api/reviews/public", "get");
export const getAllReviews = () => executeWithFallback(() => api.get("/api/reviews/admin"), "/api/reviews/admin", "get");
export const addReview = (reviewData) => executeWithFallback(() => api.post("/api/reviews", reviewData), "/api/reviews", "post", reviewData);
export const toggleReviewApproval = (reviewId) =>
  executeWithFallback(() => api.patch(`/api/reviews/${reviewId}/toggle`), `/api/reviews/${reviewId}/toggle`, "patch");

// ----------------- Interview Questions -----------------
export const addInterviewQuestion = (questionData) =>
  executeWithFallback(() => api.post("/api/interview-questions", questionData), "/api/interview-questions", "post", questionData);
export const getAllInterviewQuestions = () =>
  executeWithFallback(() => api.get("/api/interview-questions"), "/api/interview-questions", "get");
export const deleteInterviewQuestion = (id) =>
  executeWithFallback(() => api.delete(`/api/interview-questions/${id}`), `/api/interview-questions/${id}`, "delete");

// ----------------- OTP & User -----------------
export const sendOtp = (email) => executeWithFallback(() => api.post(`/send-otp?email=${email}`), `/send-otp?email=${email}`, "post");
export const verifyOtpApi = (email, otp) =>
  executeWithFallback(() => api.post(`/verify-otp?email=${email}&otp=${otp}`), `/verify-otp?email=${email}&otp=${otp}`, "post");

export const createUser = (userData) =>
  executeWithFallback(() => api.post("/user", userData), "/user", "post", userData);

// ----------------- Payment -----------------
export const createOrder = (paymentData) =>
  executeWithFallback(() => api.post("/create-order", paymentData), "/create-order", "post", paymentData);

export const verifyPayment = (data) =>
  executeWithFallback(() => api.post("/verify", data), "/verify", "post", data);

export const getAllPayments = () =>
  executeWithFallback(() => api.get("/api/admin/payments"), "/api/admin/payments", "get");

export default api;
