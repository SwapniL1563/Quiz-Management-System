import axios from "axios";

const API_URL = "https://quiz-management-system-backend.onrender.com";

// Login user
export const loginUser = async (username, password) =>
  fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then(res => res.json());

// Fetch All Quizzes
export const fetchQuizzes = async () => {
  try {
    const response = await axios.get(`${API_URL}/quizzes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return [];
  }
};

// Create a Quiz
export const createQuiz = async (quizData) => {
  try {
    const response = await axios.post(`${API_URL}/quizzes`, quizData);
    return response.data;
  } catch (error) {
    console.error("Error creating quiz:", error);
    return null;
  }
};

// Update a Quiz
export const updateQuiz = async (id, quizData) => {
  try {
    const response = await axios.put(`${API_URL}/quizzes/${id}`, quizData);
    return response.data;
  } catch (error) {
    console.error("Error updating quiz:", error);
    return null;
  }
};

// Delete a Quiz
export const deleteQuiz = async (id) => {
  try {
    await axios.delete(`${API_URL}/quizzes/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    return false;
  }
};
