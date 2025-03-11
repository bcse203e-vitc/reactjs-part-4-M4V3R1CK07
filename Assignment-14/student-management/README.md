# Student Management System

A React-based student management system that allows users to manage student information with features like adding, viewing, editing, and deleting student records.

## Features

- **Student List**: View all students with basic information
- **Student Details**: View comprehensive student information
- **Add Student**: Form to add new students to the system
- **Edit Student**: Update existing student information
- **Delete Student**: Remove students from the system
- **Data Persistence**: Student data is saved in local storage
- **Responsive Design**: Works well on different screen sizes

## Project Structure

```
📦 student-management
┣ 📂 src
┃ ┣ 📂 components
┃ ┃ ┣ 📜 StudentList.js - List of all students
┃ ┃ ┣ 📜 StudentForm.js - Form to add new students
┃ ┃ ┣ 📜 StudentDetails.js - Detailed view of a student
┃ ┃ ┣ 📜 EditStudent.js - Form to edit existing student
┃ ┣ 📜 App.js - Main component with routing
┃ ┣ 📜 App.css - Styles for the application
┃ ┣ 📜 index.js - Entry point for React
┣ 📜 package.json - Project dependencies
┣ 📜 README.md - Project documentation
```

## Technologies Used

- React
- React Router
- Local Storage API
- CSS for styling

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open your browser and go to `http://localhost:3000`

## Usage

1. **View Students**: The home page displays a list of all students
2. **Add a Student**: Click on "Add Student" in the navigation menu
3. **View Student Details**: Click on "View Details" button on a student card
4. **Edit Student Information**: Click on "Edit" button either on student card or details page
5. **Delete a Student**: Click on "Delete" button either on student card or details page

## Local Storage

The application uses the browser's Local Storage to persist student data. This means:

- Data will be preserved even after closing the browser
- Data is stored locally and not sent to any server
- Clearing browser data will erase all student records
