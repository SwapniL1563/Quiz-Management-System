import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const app: Application = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "https://quiz-management-system-frontend.vercel.app", // Update with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// User Authentication 
app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Static Credentials
  const validUsername = "admin";
  const validPassword = "password123";

  if (username === validUsername && password === validPassword) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});


// GET all quizzes endpoint
app.get("/quizzes", async (_req: Request, res: Response): Promise<void> => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: { questions: { include: { options: true } } },
    });

    if (quizzes.length === 0) {
      res.status(404).json({ message: "No quizzes found" });
      return;
    }

    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Error fetching quizzes", error });
  }
});

// GET a single quiz by ID
app.get("/quizzes/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(req.params.id) },
      include: { questions: { include: { options: true } } },
    });

    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ message: "Error fetching quiz", error });
  }
});

// CREATE a new quiz
app.post("/quizzes", async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, questions } = req.body;

    // to prevent duplicate quizzes
    const existingQuiz = await prisma.quiz.findFirst({
      where: { title: title.trim() },
    });

    if (existingQuiz) {
      res.status(400).json({ message: "A quiz with this title already exists!" });
      return;
    }

    const newQuiz = await prisma.quiz.create({
      data: {
        title,
        description,
        questions: {
          create: questions.map((q: any) => ({
            text: q.text,
            correctOptionId: q.correctOption + 1,
            options: { create: q.options.map((o: string) => ({ text: o })) },
          })),
        },
      },
    });

    res.status(201).json(newQuiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Error creating quiz", error });
  }
});

//  UPDATE a single quiz
app.put("/quizzes/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const quizId: number = Number(req.params.id);
    const { title, description, questions } = req.body;

    // Delete existing quizzes questions & options
    await prisma.question.deleteMany({ where: { quizId } });

    const updatedQuiz = await prisma.quiz.update({
      where: { id: quizId },
      data: {
        title,
        description,
        questions: {
          create: questions.map((q: any) => ({
            text: q.text,
            correctOptionId: q.correctOption + 1,
            options: { create: q.options.map((o: string) => ({ text: o })) },
          })),
        },
      },
    });

    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ message: "Error updating quiz", error });
  }
});

// DELETE a single quiz with given id
app.delete("/quizzes/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const quizId: number = Number(req.params.id);

    await prisma.quiz.delete({ where: { id: quizId } });

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ message: "Error deleting quiz", error });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
