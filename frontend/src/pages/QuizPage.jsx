import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { createQuiz, fetchQuizzes, updateQuiz } from "../api";

const QuizPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([
      { text: "", options: ["", "", "", ""], correctOption: 0 },
    ]);
    const [showAnswers, setShowAnswers] = useState(false);
  
    useEffect(() => {
        if (id) {
          async function loadQuiz() {
            try {
              const quizzes = await fetchQuizzes();
      
              const quiz = quizzes.find((q) => q.id === Number(id));
      
              if (!quiz) {
                console.error("Quiz not found");
                return;
              }
      
              setTitle(quiz.title);
              setDescription(quiz.description);
      
              if (!quiz.questions || !Array.isArray(quiz.questions)) {
                console.error("Questions array is missing or invalid:", quiz.questions);
                setQuestions([]); 
                return;
              }
              
              // map the question 
              const formattedQuestions = quiz.questions.map((q) => ({
                text: q.text,
                options: q.options ? q.options.map((o) => o.text) : ["", "", "", ""], // ✅ Ensure options exist
                correctOption: q.options
                  ? q.options.findIndex((o) => o.id === q.correctOptionId)
                  : 0, 
              }));
      
              setQuestions(formattedQuestions);
            } catch (error) {
              console.error("Error loading quiz data:", error);
            }
          }
      
          loadQuiz();
        }
      }, [id]);
      
      
    const handleQuestionChange = (index, text) => {
      const updatedQuestions = [...questions];
      updatedQuestions[index].text = text;
      setQuestions(updatedQuestions);
    };
  
    const handleOptionChange = (qIndex, oIndex, text) => {
      const updatedQuestions = [...questions];
      updatedQuestions[qIndex].options[oIndex] = text;
      setQuestions(updatedQuestions);
    };
  
    const handleCorrectOptionChange = (qIndex, oIndex) => {
      const updatedQuestions = [...questions];
      updatedQuestions[qIndex].correctOption = oIndex;
      setQuestions(updatedQuestions);
    };
  
    const addQuestion = () => {
      setQuestions([...questions, { text: "", options: ["", "", "", ""], correctOption: 0 }]);
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || questions.some(q => !q.text || q.options.some(o => !o))) {
          alert("Please fill all fields");
          return;
        }
      
        try {
          const quizData = { title, description, questions };
      
          if (id) {
            await updateQuiz(id, quizData);
          } else {
            
            const existingQuizzes = await fetchQuizzes();
            const duplicate = existingQuizzes.find(q => q.title === title);
            if (duplicate) {
              alert("A quiz with this title already exists!");
              return;
            }
      
            await createQuiz(quizData);
          }
          
          navigate("/dashboard");
        } catch (error) {
          console.error("Error saving quiz:", error);
        }
      };
      
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        {/* Quizzes Card */}
        <Card className="w-[30rem] shadow-lg ">
          <CardHeader>
            <CardTitle className="text-center text-xl">{id ? "Edit Quiz" : "Create Quiz"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="text" placeholder="Quiz Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <Input type="text" placeholder="Quiz Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
  
              {questions.map((q, qIndex) => (
                <div key={qIndex} className="border p-4 rounded-md">
                  <Input
                    type="text"
                    placeholder={`Question ${qIndex + 1}`}
                    value={q.text}
                    onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                    required
                  />
                  {q.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-option-${qIndex}`}
                        checked={q.correctOption === oIndex}
                        onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                      />
                      <Input
                        type="text"
                        placeholder={`Option ${oIndex + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                  {showAnswers && (
                    <p className="text-[#30B2AD] font-bold">Correct Answer: {q.options[q.correctOption]}</p>
                  )}
                </div>
              ))}
              <Button type="button" className="w-full bg-[#30B2AD]" onClick={addQuestion}>Add Question</Button>
              <Button type="submit" className="w-full bg-[#30B2AD]">{id ? "Update Quiz" : "Create Quiz"}</Button>
            </form>
            <Button type="button" className="w-full mt-4 bg-[#292929] hover:bg-black" onClick={() => setShowAnswers(!showAnswers)}>
              {showAnswers ? "Hide Answers" : "Show Answers"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default QuizPage;
  