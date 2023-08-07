import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getStudentById, editStudent } from '../../../utils/api';

export default function EditStudent() {
  const router = useRouter();
  const { id } = router.query; // Obtenemos el ID del estudiante desde la URL
  const [student, setStudent] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [roomId, setRoomId] = useState('');
  const [siblings, setSiblings] = useState('');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentData = await getStudentById(id);
        setStudent(studentData);
        setName(studentData.name);
        setAge(studentData.age.toString());
        setGender(studentData.gender);
        setRoomId(studentData.roomId.toString());
        setSiblings(studentData.siblings);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    if (id) {
      fetchStudentData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedStudent = await editStudent(id, {
        name,
        age: parseInt(age),
        gender,
        roomId: parseInt(roomId),
        siblings,
      });
      console.log('Student updated:', updatedStudent);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
        </div>
        <div>
          <label htmlFor="roomId">Room ID:</label>
          <input type="number" id="roomId" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
        </div>
        <div>
          <label htmlFor="siblings">Siblings:</label>
          <input type="text" id="siblings" value={siblings} onChange={(e) => setSiblings(e.target.value)} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

