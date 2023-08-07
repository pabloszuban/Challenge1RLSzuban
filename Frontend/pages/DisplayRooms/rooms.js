import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllRooms } from '../../utils/api';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await getAllRooms();
        setRooms(roomsData);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div> {/* Agrega el contenedor div para envolver la lista de salas */}
      <ul> {/* Agrega la etiqueta ul para la lista de salas */}
        {rooms.map((room) => (
          <li key={room.id}>
            {/*vamos a los detalles de la sala donde tambien agrego el boton de editar*/}
            <Link href={`/rooms/${room.id}`}>{room.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
