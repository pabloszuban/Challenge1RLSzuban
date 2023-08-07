import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getRoomById, editRoom } from '../../../utils/api';

export default function EditRoom() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');

  useEffect(() => {
    if (id) {
      const fetchRoomDetails = async () => {
        try {
          const roomData = await getRoomById(id);
          setName(roomData.name);
          setCapacity(roomData.capacity);
        } catch (error) {
          console.error('Error fetching room details:', error);
        }
      };

      fetchRoomDetails();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRoom = await editRoom(id, { name, capacity: parseInt(capacity) });
      console.log('Room updated:', updatedRoom);
      router.push(`/rooms/${id}`);
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  return (
    <div>
      <h1>Edit Room</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="capacity">Capacity:</label>
          <input type="number" id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

