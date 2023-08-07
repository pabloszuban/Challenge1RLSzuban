import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getStudentById } from '../../utils/api';

export default function StudentDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchStudentDetails = async () => {
        try {
          const studentData = await getStudentById(id);
          setStudent(studentData);
        } catch (error) {
          console.error('Error fetching student details:', error);
        }
      };

      fetchStudentDetails();
    }
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }
  const handleEditLinkClick = () => {
    router.push(`/admin/editStud/${id}`);
  };

  return (
    <div>
      <h1>{student.name}</h1>
      <p>Age: {student.age}</p>
      <p>Gender: {student.gender}</p>
      <h2>Siblings:</h2>
      <ul>
  {student.siblings === "none" || student.siblings === "None" ? (
    <li>{student.siblings}</li>
  ) : (
    <li>{student.siblings}</li>
  )}
</ul>
      {/* Enlace para editar alumno */}
      <button onClick={handleEditLinkClick}>Editar Alumno</button>
    </div>
  );
}

