import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import StudentDetails from "./components/StudentDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Student Management System</h1>
          <nav>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/add" className="nav-link">
              Add Student
            </Link>
          </nav>
        </header>
        <main className="app-content">
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/add" element={<StudentForm />} />
            <Route path="/student/:id" element={<StudentDetails />} />
            <Route path="/edit/:id" element={<StudentForm />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>Student Management System &copy; 2025</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
