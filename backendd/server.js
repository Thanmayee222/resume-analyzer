const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Multer Storage (Handles Resume Upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Resume Schema
const ResumeSchema = new mongoose.Schema({
    fileName: String,
    skills: [String]
});
const Resume = mongoose.model("Resume", ResumeSchema);

// ✅ Read Jobs Data
let jobsData = { jobs: [] };
try {
    const jobsFile = fs.readFileSync("jobs.json", "utf-8");
    jobsData = JSON.parse(jobsFile);
    console.log("✅ Loaded jobs.json");
} catch (error) {
    console.error("❌ Error loading jobs.json:", error);
}

// ✅ API to Upload and Analyze Resume
app.post("/api/upload", upload.single("resume"), async (req, res) => {
    const jobDescription = req.body.jobDescription?.toLowerCase() || "";

    if (!req.file) {
        return res.status(400).json({ error: "No resume uploaded." });
    }

    // 🔥 Simulated Resume Skills (Replace with NLP parsing logic if needed)
    const resumeSkills = ["Python", "TensorFlow", "Keras", "Deep Learning", "SQL"];

    // ✅ Save Resume to Database
    const newResume = new Resume({ fileName: req.file.originalname, skills: resumeSkills });
    await newResume.save();

    let bestMatch = null;
    let bestMatchCount = 0;

    // ✅ Find the Best Job Match
    jobsData.jobs.forEach(job => {
        const matchedSkills = job.requiredSkills.filter(skill => resumeSkills.includes(skill));

        if (matchedSkills.length > bestMatchCount) {
            bestMatch = job;
            bestMatchCount = matchedSkills.length;
        }
    });

    if (!bestMatch) {
        return res.json({
            resumeScore: 0,
            extractedSkills: [],
            missingSkills: [],
            recommendedCourses: []
        });
    }

    // ✅ Find Missing Skills
    const missingSkills = bestMatch.requiredSkills.filter(skill => !resumeSkills.includes(skill));
    const resumeScore = Math.round((bestMatchCount / bestMatch.requiredSkills.length) * 100);

    // ✅ Debugging Output
    console.log("🔍 Best Matched Job:", bestMatch.title);
    console.log("✅ Extracted Skills:", resumeSkills);
    console.log("❌ Missing Skills:", missingSkills);
    console.log("🎓 Suggested Courses:", bestMatch.courses || []);

    res.json({
        jobTitle: bestMatch.title,
        resumeScore: resumeScore,
        extractedSkills: resumeSkills,
        missingSkills: missingSkills,
        recommendedCourses: bestMatch.courses || []
    });
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
