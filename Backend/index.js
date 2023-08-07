// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { rooms, students } = require('./data');//sacamos de data todas las salas y estudiantes existentes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Endpoints para obtener información de las salas y estudiantes

app.get('/api/rooms', (req, res) => {
//Si se recibe una solicitud a la ruta /api/rooms, se ejecuta la funcion de manejo de la solicitud con el parámetro res. La funcion de manejo responde con un JSON contiene todas las salas almacenadas en la variable rooms
  res.json(rooms);//enviamos la respuesta al cliente con esto
});//Este es el endpoint para obtener todas las salas existentes.

app.get('/api/rooms/:id', (req, res) => {//Con esto obtenemos detalles de una sala en específico y para eso solicitamos a la ruta /api/rooms/:id, donde :id es un parámetro que permite recibir el ID de la sala a la que le queremos ver los detalles
  const roomId = parseInt(req.params.id);//Asignamos a roomId el valor del ID de la sala solicitada. Usamos req.params que contiene los parametros de la solicitud, que en este caso es una ruta en específico
  const room = rooms.find((r) => r.id === roomId);//Como la variable rooms almacenamos enteros, convertimos el ID a entero
//Ahora buscamos la sala correspondiente en la variable rooms 
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
//Si se encuentra la sala, entonces se filtran a los estudiantes que sólo pertenecen a esa sala y se los devuelve al cliente con un json
  const roomStudents = students.filter((student) => student.roomId === roomId);
  res.json({ ...room, students: roomStudents });
});

app.get('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  res.json(student);
});


// Agregar aquí los endpoints para crear, editar y eliminar salas y estudiantes.
// Endpoint para crear una nueva sala
app.post('/api/rooms', (req, res) => {
  const { name, capacity } = req.body;
  const newRoom = {
    id: rooms.length + 1,
    name,
    capacity,
  };
  rooms.push(newRoom);
  res.json(newRoom);
});

// Endpoint para editar una sala existente
app.put('/api/rooms/:id', (req, res) => {
  const roomId = parseInt(req.params.id);//extraemos el id de la solicitud PUT y lo convertimos a entero
  const { name, capacity } = req.body;//utilizamos destructuring para obtener adicionalmente  los campos name y capacity del cuerpo de la solicitud y asignarselos a la room que queremos editar
  const roomIndex = rooms.findIndex((r) => r.id === roomId);//si la sala no se encuentra devuelve -1

  if (roomIndex === -1) {
    res.set('Console-Message', 'Room not found');
    return res.status(404).json({ error: 'Room not found' });
  }

  rooms[roomIndex].name = name;
  rooms[roomIndex].capacity = capacity;
  res.set('Console-Message', 'Room successfully updated');
  res.json(rooms[roomIndex]);
});

// Endpoint para eliminar una sala
app.delete('/api/rooms/:id', (req, res) => {
  const roomId = parseInt(req.params.id);
  const roomIndex = rooms.findIndex((r) => r.id === roomId);

  if (roomIndex === -1) {
    return res.status(404).json({ error: 'Room not found' });
  }

  rooms.splice(roomIndex, 1);
  res.json({ message: 'Room deleted successfully' });
});

app.post('/api/students', (req, res) => {
  const { name, age, gender, roomId, siblings } = req.body;
  const newStudent = {
    id: students.length + 1,
    name,
    age,
    gender,
    roomId,
    siblings,
  };
  students.push(newStudent);

  const roomIndex = rooms.findIndex((r) => r.id === roomId);

  if (roomIndex !== -1) {
    rooms[roomIndex].capacity += 1;
  } else {
    return res.status(404).json({ error: 'Room not found' });
  }

  res.json(newStudent);
});

// Endpoint para editar un estudiante existente
app.put('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, age, gender, roomId, siblings } = req.body;
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  students[studentIndex].name = name;
  students[studentIndex].age = age;
  students[studentIndex].gender = gender;
  students[studentIndex].roomId = roomId;
  students[studentIndex].siblings = siblings;
  res.json(students[studentIndex]);
});

// Endpoint para eliminar un estudiante
app.delete('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  students.splice(studentIndex, 1);
  res.json({ message: 'Student deleted successfully' });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

