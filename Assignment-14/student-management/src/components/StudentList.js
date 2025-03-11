import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState("");

  // Load students from local storage on component mount
  useEffect(() => {
    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);

  // Handle student deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const updatedStudents = students.filter((student) => student.id !== id);
      setStudents(updatedStudents);

      // Update local storage
      localStorage.setItem("students", JSON.stringify(updatedStudents));
    }
  };

  // Filter students based on search term and grade filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === "" || student.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  // Get unique grades for filter dropdown
  const uniqueGrades = [
    ...new Set(students.map((student) => student.grade)),
  ].sort();

  return (
    <div>
      <h2>Student Directory</h2>

      <div className="card">
        <div className="filter-controls">
          <div className="form-group">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="form-group">
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="grade-filter"
            >
              <option value="">All Grades</option>
              {uniqueGrades.map((grade) => (
                <option key={grade} value={grade}>
                  Grade {grade}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="empty-state">
          <h3>No students found</h3>
          <p className="para">
            Add new students to get started or try a different search term.
          </p>
          <Link to="/add" className="btn btn-primary">
            Add Student
          </Link>
        </div>
      ) : (
        <div className="student-list">
          {filteredStudents.map((student) => (
            <div key={student.id} className="card student-card">
              <div className="student-header">
                <h3 className="card-title">{student.name}</h3>
                <span className="badge">Grade {student.grade}</span>
              </div>

              <div className="student-info">
                <p>
                  <strong>Age:</strong> {student.age}
                </p>
                <p>
                  <strong>Email:</strong> {student.email || "Not provided"}
                </p>
              </div>

              <div className="student-actions">
                <Link to={`/student/${student.id}`} className="btn btn-primary">
                  View Details
                </Link>
                <Link to={`/edit/${student.id}`} className="btn btn-secondary">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
