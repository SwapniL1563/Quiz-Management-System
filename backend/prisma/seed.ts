import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // Created sample quizzes with questions and options
  const quiz1 = await prisma.quiz.create({
    data: {
      title: "JavaScript Basics",
      description: "A quiz to test your basic JavaScript knowledge.",
      questions: {
        create: [
          {
            text: "What is the output of `typeof null` in JavaScript?",
            options: {
              create: [
                { text: "null" },
                { text: "undefined" },
                { text: "object" }, 
                { text: "string" }
              ]
            },
            correctOptionId: 3 
          },
          {
            text: "Which keyword is used to declare a variable in JavaScript?",
            options: {
              create: [
                { text: "var" },
                { text: "let" },
                { text: "const" },
                { text: "define" }
              ]
            },
            correctOptionId: 1
          }
        ]
      }
    }
  });

  const quiz2 = await prisma.quiz.create({
    data: {
      title: "Python Fundamentals",
      description: "Test your understanding of Python basics.",
      questions: {
        create: [
          {
            text: "Which data type is mutable in Python?",
            options: {
              create: [
                { text: "Tuple" },
                { text: "List" }, 
                { text: "String" },
                { text: "Integer" }
              ]
            },
            correctOptionId: 2
          },
          {
            text: "What is the output of `print(2**3)` in Python?",
            options: {
              create: [
                { text: "5" },
                { text: "6" },
                { text: "7" },
                { text: "8" } 
              ]
            },
            correctOptionId: 4
          }
        ]
      }
    }
  });
}

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
