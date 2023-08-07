// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; //URL del backend

// Obtener todas las salas
export const getAllRooms = async () => {
  const response = await axios.get(`${BASE_URL}/api/rooms`);
  return response.data;
};

// Obtener detalles de una sala por ID
export const getRoomById = async (roomId) => {
  const response = await axios.get(`${BASE_URL}/api/rooms/${roomId}`);
  return response.data;
};

// Crear una nueva sala
export const createRoom = async (newRoom) => {
  const response = await axios.post(`${BASE_URL}/api/rooms`, newRoom);
  return response.data;
};

// Editar una sala existente por ID
export const editRoom = async (roomId, updatedRoom) => {
  const response = await axios.put(`${BASE_URL}/api/rooms/${roomId}`, updatedRoom);
  return response.data;
};

// Eliminar una sala por ID
export const deleteRoom = async (roomId) => {
  const response = await axios.delete(`${BASE_URL}/api/rooms/${roomId}`);
  return response.data;
};

// Obtener detalles de un estudiante por ID
export const getStudentById = async (studentId) => {
  const response = await axios.get(`${BASE_URL}/api/students/${studentId}`);
  return response.data;
};

// Crear un nuevo estudiante
export const createStudent = async (newStudent) => {
  const response = await axios.post(`${BASE_URL}/api/students`, newStudent);
  return response.data;
};

// Editar un estudiante existente por ID
export const editStudent = async (studentId, updatedStudent) => {
  const response = await axios.put(`${BASE_URL}/api/students/${studentId}`, updatedStudent);
  return response.data;
};

// Eliminar un estudiante por ID
export const deleteStudent = async (studentId) => {
  const response = await axios.delete(`${BASE_URL}/api/students/${studentId}`);
  return response.data;
};

