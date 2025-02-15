import React, { useState } from "react";
import axios from "axios";

function CourseRecommendations() {
    const [skills, setSkills] = useState("");
    const [recommendedCourses, setRecommendedCourses] = useState([]);

    const handleRecommend = async () => {
        try {
            const response = await axios.post("http://localhost:5000/recommend-courses", {
                skills: skills.split(",").map(skill => skill.trim())
            });
            setRecommendedCourses(response.data);
        } catch (error) {
            console.error("Error recommending courses:", error);
        }
    };

    return (
        <div>
            <h2>Course Recommendations</h2>
            <input
                type="text"
                placeholder="Enter skills (comma-separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
            />
            <button onClick={handleRecommend}>Recommend</button>
            <ul>
                {recommendedCourses.map((course, index) => (
                    <li key={index}>
                        <a href={course.url} target="_blank" rel="noopener noreferrer">
                            {course.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseRecommendations;
