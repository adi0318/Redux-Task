import { useDispatch, useSelector } from "react-redux";
import { deleteStudent } from "../redux/studentSlice";

const StudentList = ({ setEditingStudent }) => {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students.students);

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  return (
    <div>
      <h1>Students Management System</h1>

      <h2>Students</h2>

      {students.map((student) => (
        <div key={student.id}>
          <h3>{student.name}</h3>
          <p>Email: {student.email}</p>
          <p>Course: {student.course}</p>
          <p>Year: {student.year}</p>
          <p>Status: {student.status}</p>
          <button onClick={() => handleEdit(student)}>Edit</button>
          <button onClick={() => handleDelete(student.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
