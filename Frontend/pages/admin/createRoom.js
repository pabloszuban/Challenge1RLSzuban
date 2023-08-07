// createRoom.js
import { useState } from 'react';
import { createRoom } from '../../utils/api';

export default function CreateRoom() {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRoom = await createRoom({ name, capacity: parseInt(capacity) });
      console.log('New room created:', newRoom);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div>
      <h1>Create Room</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="capacity">Capacity:</label>
          <input type="number" id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        </div>
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
}

