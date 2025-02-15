import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, CircularProgress, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SchoolIcon from "@mui/icons-material/School";

const UploadContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f0f4f8",
});

const UploadBox = styled(Box)({
  padding: "25px",
  borderRadius: "12px",
  backgroundColor: "white",
  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
  width: "450px",
  textAlign: "center",
});

const CourseCard = styled(Card)({
  marginTop: "10px",
  padding: "10px",
  borderLeft: "5px solid #007bff",
});

function UploadResume() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => setResume(e.target.files[0]);
  const handleJobDescChange = (e) => setJobDescription(e.target.value);

  const handleUpload = async () => {
    if (!resume || !jobDescription) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/upload", formData);
      setResult(data);
    } catch (error) {
      console.error("Upload error:", error);
    }
    setLoading(false);
  };

  return (
    <UploadContainer>
      <UploadBox>
        <Typography variant="h5" fontWeight="bold" color="#007bff" gutterBottom>
          📄 Smart Resume Analyzer
        </Typography>

        <label htmlFor="resume-upload">
          <input
            id="resume-upload"
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            component="span"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            style={{ marginBottom: "10px", backgroundColor: "#007bff" }}
          >
            Upload Resume
          </Button>
        </label>

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Enter Job Description"
          variant="outlined"
          value={jobDescription}
          onChange={handleJobDescChange}
          style={{ marginBottom: "15px" }}
        />

        <Button variant="contained" color="success" fullWidth onClick={handleUpload}>
          Analyze Resume
        </Button>

        {loading && <CircularProgress style={{ marginTop: "15px" }} />}

        {result && (
          <Box mt={2}>
            <Typography variant="h6" color="primary">
              📊 Resume Score: <strong>{result.resumeScore}%</strong>
            </Typography>

            <Typography variant="h6">🛠 Skills Matched:</Typography>
            <Typography>{result.extractedSkills?.join(", ") || "No skills extracted"}</Typography>

            <Typography variant="h6" mt={2}>
              ❌ Missing Skills:
            </Typography>
            <Typography>{result.missingSkills?.join(", ") || "No missing skills"}</Typography>

            <Typography variant="h6" mt={2}>
              🎓 Recommended Courses:
            </Typography>
            {result.recommendedCourses?.length > 0 ? (
              result.recommendedCourses.map((course, index) => (
                <CourseCard key={index}>
                  <CardContent>
                    <Typography variant="body1">
                      <SchoolIcon color="primary" />{" "}
                      <a href={course.link} target="_blank" rel="noopener noreferrer">
                        {course.title}
                      </a>
                    </Typography>
                  </CardContent>
                </CourseCard>
              ))
            ) : (
              <Typography>No courses found.</Typography>
            )}
          </Box>
        )}
      </UploadBox>
    </UploadContainer>
  );
}

export default UploadResume;
