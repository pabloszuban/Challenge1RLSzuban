const rooms = [
  { id: 1, name: 'Room A', capacity: 2 },
  { id: 2, name: 'Room B', capacity: 2 },
];

const students = [
  { id: 1, name: 'Pablo Szuban', age: 16, gender: 'Male', siblings: 'Ela Lumno', roomId: 1 },
  { id: 2, name: 'Juan Perez', age: 15, gender: 'Male', siblings: 'None', roomId: 1 },
  { id: 3, name: 'Lionel Messi', age: 17, gender: 'Male', siblings: 'None', roomId: 2 },
  { id: 4, name: 'Ela Lumno', age: 17, gender: 'Female', siblings: 'Pablo Szuban', roomId: 2 },
];

module.exports = {
  rooms,
  students,
};

