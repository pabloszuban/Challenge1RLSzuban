import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getRoomById } from '../../utils/api';

export default function RoomDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomData = await getRoomById(parseInt(id));
        setRoom(roomData);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    if (id) {
      fetchRoomData();
    }
  }, [id]);

  const handleEditLinkClick = () => {
    router.push(`/admin/editRoom/${id}`);
  };

  const handleCreateStudentLinkClick = () => {
    router.push(`/admin/createStudent/${id}`);
  };

  const handleGoToRooms = () => {
    router.push('/DisplayRooms/rooms'); 
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Enlace para crear un nuevo estudiante */}
      <div>
        <button onClick={handleCreateStudentLinkClick}>Crear Nuevo Estudiante</button>
      </div>
      <h1>Room Details</h1>
      <p>Name: {room.name}</p>
      <p>Capacity: {room.capacity}</p>
      <h2>Students:</h2>
      <ul>
        {room.students.map((student) => (
          <li key={student.id}>
            <Link href={`/students/${student.id}`}>{student.name}</Link>
          </li>
        ))}
      </ul>
      {/* Enlace para editar la sala */}
      <button onClick={handleEditLinkClick}>Editar Sala</button>
      {/* Botón para mostrar salas */}
      <button onClick={handleGoToRooms}>Back</button>
    </div>
  );
}
