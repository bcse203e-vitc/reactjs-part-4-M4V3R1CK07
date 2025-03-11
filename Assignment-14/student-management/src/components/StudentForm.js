import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentForm = () => {
  const { id } = useParams(); // Get id if we're in edit mode
  const navigate = useNavigate();
  const isEditMode = !!id; // Check if we're in edit mode based on presence of id

  // Initial form state
  const initialFormState = {
    name: "",
    age: "",
    grade: "",
    email: "",
    phone: "",
    address: "",
    parentName: "",
    joinDate: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [notFound, setNotFound] = useState(false);

  // Load student data on component mount if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const storedStudents = localStorage.getItem("students");

      if (storedStudents) {
        const parsedStudents = JSON.parse(storedStudents);
        const student = parsedStudents.find((student) => student.id === id);

        if (student) {
          setFormData(student);
        } else {
          setNotFound(true);
        }
      } else {
        setNotFound(true);
      }
    }
  }, [id, isEditMode]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    if (!formData.grade.trim()) newErrors.grade = "Grade is required";

    // Age validation
    if (
      formData.age &&
      (isNaN(formData.age) ||
        parseInt(formData.age) < 5 ||
        parseInt(formData.age) > 21)
    ) {
      newErrors.age = "Age must be a number between 5 and 21";
    }

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Get existing students from local storage
      const storedStudents = localStorage.getItem("students");
      const students = storedStudents ? JSON.parse(storedStudents) : [];

      if (isEditMode) {
        // Update existing student
        const updatedStudents = students.map((student) =>
          student.id === id ? { ...formData, id } : student
        );

        // Save to local storage
        localStorage.setItem("students", JSON.stringify(updatedStudents));

        // Show success message
        setSuccessMessage("Student information updated successfully!");

        // Redirect after a short delay
        setTimeout(() => {
          navigate(`/student/${id}`);
        }, 1500);
      } else {
        // Create new student with unique ID
        const newStudent = {
          ...formData,
          id: Date.now().toString(),
          joinDate: formData.joinDate || new Date().toISOString().split("T")[0],
        };

        // Add new student to array
        const updatedStudents = [...students, newStudent];

        // Save to local storage
        localStorage.setItem("students", JSON.stringify(updatedStudents));

        // Show success message
        setSuccessMessage("Student added successfully!");

        // Reset form if adding new student
        setFormData(initialFormState);

        // Redirect after a short delay
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    }
  };

  if (notFound && isEditMode) {
    return (
      <div className="not-found">
        <h2>Student Not Found</h2>
        <p>The student you are trying to edit does not exist.</p>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Back to Student List
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>{isEditMode ? "Edit Student Information" : "Add New Student"}</h2>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <h3>Basic Information</h3>

          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={errors.age ? "error" : ""}
              />
              {errors.age && <div className="error-message">{errors.age}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="grade">Grade *</label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className={errors.grade ? "error" : ""}
              >
                <option value="">Select Grade</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {errors.grade && (
                <div className="error-message">{errors.grade}</div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <h3>Contact Information</h3>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "error" : ""}
              placeholder="e.g., XXXXXXXXXX"
            />
            {errors.phone && (
              <div className="error-message">{errors.phone}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
            />
          </div>

          {/* Additional Information */}
          <div className="form-group">
            <label htmlFor="parentName">Parent/Guardian Name</label>
            <input
              type="text"
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="joinDate">Join Date</label>
            <input
              type="date"
              id="joinDate"
              name="joinDate"
              value={formData.joinDate || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {isEditMode ? "Update Student" : "Add Student"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(isEditMode ? `/student/${id}` : "/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
