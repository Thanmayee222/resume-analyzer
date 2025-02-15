# Smart Resume Analyzer

## 📌 Overview
The **Smart Resume Analyzer** is an AI-powered tool that scans resumes and provides job recommendations based on the applicant's skills and experience. It is built using a **React frontend** and a **Node.js backend** with AI-based resume parsing capabilities.

---

## 📁 Project Structure
```
root/
│── backendd/            # Backend service (Node.js + Express)
│   │── jobs.json        # Job data for recommendations
│   │── server.js        # Main server file
│   │── package.json     # Dependencies
│   └── uploads/        # Uploaded resumes
│
│── frontend/           # Frontend (React.js)
│   │── src/
│   │   │── components/ # UI Components
│   │   ├── App.js      # Main App Component
│   │   ├── UploadResume.js  # Resume Upload Component
│   │── public/
│   │── package.json    # Dependencies
│
│── .gitignore          # Files to ignore in Git
│── README.md           # Project Documentation
```

---

## 🚀 Features
✅ Upload resume in **PDF format**
✅ Extracts **skills, experience, and qualifications**
✅ Matches candidates with relevant **job openings**
✅ Provides job recommendations using **AI-based analysis**
✅ Frontend built with **React.js** for a smooth user experience
✅ Backend powered by **Node.js & Express.js**

---

## 🛠️ Tech Stack
- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **AI Resume Parsing:** NLP libraries (e.g., spaCy, NLTK)
- **Database (Optional):** MongoDB or Firebase (for storing job listings and user data)

---

## 📦 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Thanmayee222/resume-analyzer.git
cd resume-analyzer
```

### 2️⃣ Backend Setup
```sh
cd backendd
npm install  # Install dependencies
node server.js  # Start the server
```

### 3️⃣ Frontend Setup
```sh
cd ../frontend
npm install  # Install dependencies
npm start    # Start the React frontend
```

---

## 🏃‍♂️ Usage
1. Open the **React app** in your browser.
2. Upload a **PDF resume**.
3. The system extracts **skills, experience, and education**.
4. Get **job recommendations** based on resume analysis.

---

## 🤝 Contribution Guidelines
Contributions are welcome! Follow these steps:
1. **Fork** the repository.
2. Create a **new branch**: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m "Added a new feature"`
4. Push to the branch: `git push origin feature-branch`
5. Open a **Pull Request**.

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 🔗 Links
- **GitHub Repo:** [Smart Resume Analyzer](https://github.com/Thanmayee222/resume-analyzer)
- **Developers:** [Thanmayee Karanam](https://github.com/Thanmayee222) , [Anurag](https://github.com/Anurag9725)

---

⭐ If you like this project, give it a **star** on GitHub!

