import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuizzes, deleteQuiz } from "../api";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader,
     CardTitle } from "../components/ui/card";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadQuizzes() {
      const data = await fetchQuizzes();
      setQuizzes(data);
    }
    loadQuizzes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await deleteQuiz(id);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-3 md:p-6 bg-gray-100">
      {/* Navbar */}
      <div className="flex justify-between px-4  items-center border-b-2 py-3">
     
      {/* Logo */}
     <div className="flex justify-center gap-1">
     <svg className="w-7 md:w-8 lucide lucide-podcast " xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#30b2ad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.85 18.58a9 9 0 1 0-9.7 0"/><path d="M8 14a5 5 0 1 1 8 0"/><circle cx="12" cy="11" r="1"/><path d="M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z"/></svg>
     <h1 className="text-lg md:text-xl font-semibold ">Quizo</h1>
     </div>
      
      <h1 className="hidden md:block text-xl font-semibold ">Dashboard</h1>
      <Button className="text-sm md:text-base bg-[#30B2AD]" onClick={() => navigate("/quiz")}>Create Quiz</Button>
      </div>

      {/* Quizzes Edit , Delete */}
      <div className="grid gap-4">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="p-4">
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{quiz.description}</p>
              <div className="flex gap-2 mt-2">
                <Button className="bg-[#30B2AD]" onClick={() => navigate(`/quiz/${quiz.id}`)}>Edit</Button>
                <Button className="bg-[#292929] hover:bg-black" onClick={() => handleDelete(quiz.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
