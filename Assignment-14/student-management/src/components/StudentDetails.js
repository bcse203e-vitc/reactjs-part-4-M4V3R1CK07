import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get students from local storage
    const storedStudents = localStorage.getItem("students");

    if (storedStudents) {
      const parsedStudents = JSON.parse(storedStudents);
      const foundStudent = parsedStudents.find((student) => student.id === id);

      if (foundStudent) {
        setStudent(foundStudent);
        setLoading(false);
      } else {
        setError("Student not found");
        setLoading(false);
      }
    } else {
      setError("No student data available");
      setLoading(false);
    }
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const storedStudents = localStorage.getItem("students");
      if (storedStudents) {
        const parsedStudents = JSON.parse(storedStudents);
        const updatedStudents = parsedStudents.filter(
          (student) => student.id !== id
        );

        // Update local storage
        localStorage.setItem("students", JSON.stringify(updatedStudents));

        // Navigate back to list
        navigate("/");
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading student information...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/" className="btn btn-primary">
          Back to Student List
        </Link>
      </div>
    );
  }

  return (
    <div className="student-details">
      <div className="card">
        <div className="card-header">
          <h2>{student.name}'s Profile</h2>
          <div className="badge">Grade {student.grade}</div>
        </div>

        <div className="detail-section">
          <h3>Basic Information</h3>

          <div className="detail-row">
            <div className="detail-label">Age:</div>
            <div className="detail-value">{student.age} years</div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Join Date:</div>
            <div className="detail-value">
              {student.joinDate
                ? new Date(student.joinDate).toLocaleDateString()
                : "Not specified"}
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>Contact Information</h3>

          <div className="detail-row">
            <div className="detail-label">Email:</div>
            <div className="detail-value">
              {student.email || "Not provided"}
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Phone:</div>
            <div className="detail-value">
              {student.phone || "Not provided"}
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Address:</div>
            <div className="detail-value">
              {student.address || "Not provided"}
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Parent/Guardian:</div>
            <div className="detail-value">
              {student.parentName || "Not provided"}
            </div>
          </div>
        </div>

        <div className="student-actions">
          <Link to={`/edit/${student.id}`} className="btn btn-primary">
            Edit Information
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Student
          </button>
          <Link to="/" className="btn btn-secondary">
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
