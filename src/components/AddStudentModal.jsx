import StudentForm from "./StudentForm";

const AddStudentModal = ({
  isOpen,
  onClose,
  editingStudent,
  setEditingStudent,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 shadow-xl">
        <StudentForm
          editingStudent={editingStudent}
          setEditingStudent={setEditingStudent}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default AddStudentModal;
