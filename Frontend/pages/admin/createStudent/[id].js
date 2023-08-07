import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createStudent } from '../../../utils/api';

export default function CreateStudent() {
  const router = useRouter();
  const { id } = router.query; // Obtener el ID de la sala desde la URL


  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [siblings, setSiblings] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Usar el valor de roomId directamente al crear el estudiante
      const newStudent = await createStudent({
        name,
        age: parseInt(age),
        gender,
        roomId: parseInt(id), // Usar el ID de la sala desde la URL
        siblings,
      });
      console.log('New student created:', newStudent);
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <div>
      <h1>Create Student</h1>
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
        <div style={{ display: 'inline-block', marginRight: '10px' }}>
         <label htmlFor="roomId">Room ID:</label>
        </div>
        <div style={{ display: 'inline-block' }}>
         <p>{id}</p> {/* Mostrar el ID de la sala */}
        </div>
        <div>
          <label htmlFor="siblings">Siblings:</label>
          <input type="text" id="siblings" value={siblings} onChange={(e) => setSiblings(e.target.value)} />
        </div>
        <button type="submit">Create Student</button>
      </form>
    </div>
  );
}

