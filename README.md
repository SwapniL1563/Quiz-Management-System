# Quizo - Quiz Management System

Quizo is a **quiz management system** that allows teachers to create, edit, and delete quizzes.  
Built using **React (Frontend), Express (Backend), Prisma (ORM), & PostgreSQL (Database).**

##  Features
- User authentication with static credentials
- Create, edit, view, and delete quizzes
- Multiple-choice questions with correct answers
- Fully responsive UI with TailwindCSS

## User Login Credentials
username: admin <br>
password: password123

---

## How to setup the project locally 

### **1️) Clone the Repository**
git clone https://github.com/your-username/quizo.git <br>
cd quizo

### **2) Backend Setup**
cd quizo-backend <br>
npm install

### **3) Configure Database** 
Ensure PostgreSQL is running. <br>
Update .env with your database credentials: <br>
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/quizo_db"

**Initialize Database** <br>
npx prisma migrate dev --name init <br>
npx prisma generate

**Start Backend:**
npx ts-node src/index.ts <br>

Backend runs at: **http://localhost:3000**

### 4) Frontend Setup 
cd ../quizo-frontend <br>
npm install

**Start Frontend:** 
npm run dev

Frontend runs at: **http://localhost:5173**

## **API Documentation**
### **1) User Login**
     POST /login
     
**Request Body:**
{
  "username": "admin",
  "password": "password123"
}

**Response:**
{
  "message": "Login successful"
}

**Error Response:**
{
  "message": "Invalid username or password"
}

### 2)Get All Quizzes
    GET /quizzes
    
**Response:**
[
  {
    "id": 1,
    "title": "JavaScript Basics",
    "description": "A quiz to test JavaScript knowledge.",
    "questions": [
      {
        "id": 101,
        "text": "What is the output of `typeof null`?",
        "options": [
          { "id": 1, "text": "null" },
          { "id": 2, "text": "undefined" },
          { "id": 3, "text": "object" },
          { "id": 4, "text": "string" }
        ],
        "correctOptionId": 3
      }
    ]
  }
]


### **3) Get a Single Quiz**
   GET /quizzes/:id
   
**Response:**
{
  "id": 1,
  "title": "JavaScript Basics",
  "description": "A quiz to test JavaScript knowledge.",
  "questions": [...]
}


### **4) Create a New Quiz**
    POST /quizzes

**Request Body:**
{
  "title": "Python Basics",
  "description": "Test Python knowledge",
  "questions": [
    {
      "text": "What is the output of `print(2**3)`?",
      "options": ["4", "6", "8", "10"],
      "correctOption": 2
    }
  ]
}

This returns the created quiz.

### **5) Update a Quiz**
    PUT /quizzes/:id
    
**Request Body:**
{
  "title": "Updated Quiz",
  "description": "Updated description",
  "questions": [...]
}

This returns the updated quiz.

### **6) Delete a Quiz**
DELETE /quizzes/:id

Deletes the quiz and returns a success message.

## **Technologies Used**
Frontend: React, TailwindCSS, Axios , Shadcn <br>
Backend: Express, TypeScript, Prisma <br>
Database: PostgreSQL <br>
Tools: Vite, Postman, VS Code

