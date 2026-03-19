// ── Consulting Services Enquiry  ───────────────────────
/**
 * Sends the EnquiryModal form data to:
 *   POST /api/consulting/enquiries
 *
 
 * {
 *   firstName          : string   ← required
 *   lastName           : string   ← required
 *   email              : string   ← required
 *   company            : string   ← required
 *   jobTitle           : string   ← optional
 *   phone              : string   ← required (digits only, e.g. "919876543210")
 *   serviceRequired    : string   ← required
 *   positionsRange     : string   ← optional ("1 – 10", "10 – 50" …)
 *   requirementLocation: string   ← optional
 *   message            : string   ← optional
 *   heardFrom          : string   ← optional
 *   termsAccepted      : boolean  ← required (must be true)
 *   marketingOptedIn   : boolean  ← optional
 * }
 */
import axios from "axios";

// const API_URL = "https://jstechnohub-backend.onrender.com";
const API_URL = "https://coachingwebsite-production.up.railway.app";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------------- Courses -----------------
export const getAllCourses = () => api.get("/api/courses");
export const getCourseById = (id) => api.get(`/api/courses/${id}`);
export const createCourse = (course) => api.post("/api/courses", course);
export const updateCourse = (id, course) =>
  api.put(`/api/courses/${id}`, course);
export const deleteCourse = (id) => api.delete(`/api/courses/${id}`);

// ----------------- Enquiries -----------------
// Course enquiry
export const submitEnquiry = (enquiry) => api.post("/api/enquiries", enquiry);

// Certification enquiry
export const submitCertificationEnquiry = (enquiry) =>
  api.post("/api/enquiries/certification", enquiry);

// Consulting Services Enquiry
export const submitConsultingEnquiry = (enquiry) =>
  api.post("/api/consulting/enquiries", enquiry);

// ----------------- Admin (Unified) -----------------
// This now fetches Courses, Certs, and Consulting combined thanks to your new Backend Controller
export const getAllEnquiries = () => api.get("/api/admin/enquiries");

// Toggles course/certification "clarified" status
export const toggleEnquiryClarified = (type, id) =>
  api.patch(`/api/admin/enquiries/${type}/${id}/toggle`);

// export const getAllConsultingEnquiries = () => api.get("/api/enquiries");
// export const getConsultingEnquiriesByStatus = (status) =>
//   api.get(`/api/enquiries/status/${status}`);

// ----------------- Reviews -----------------
export const getPublicReviews = () => api.get("/api/reviews/public");
export const getAllReviews = () => api.get("/api/reviews/admin");
export const addReview = (reviewData) => api.post("/api/reviews", reviewData);
export const toggleReviewApproval = (reviewId) =>
  api.patch(`/api/reviews/${reviewId}/toggle`);

// ----------------- Interview Questions -----------------
export const addInterviewQuestion = (questionData) =>
  api.post("/api/interview-questions", questionData);
export const getAllInterviewQuestions = () =>
  api.get("/api/interview-questions");

// ----------------- OTP & User -----------------
export const sendOtp = (email) => api.post(`/send-otp?email=${email}`);
export const verifyOtpApi = (email, otp) =>
  api.post(`/verify-otp?email=${email}&otp=${otp}`);
export const createUser = (userData) => api.post("/user", userData);

// ----------------- Payment -----------------
export const createOrder = (paymentData) =>
  api.post("/create-order", paymentData);
export const verifyPayment = (data) => api.post("/verify", data);

export default api;
