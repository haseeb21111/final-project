import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentList.css';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    date: '',
    time: '',
    description: ''
  });

  const fetchAppointments = () => {
    axios.get('http://localhost:5000/api/appointments')
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error('Error fetching appointments!', err));
  };

  useEffect(() => fetchAppointments(), []);

  const handleUpdate = (id) => {
    axios.put(`http://localhost:5000/api/appointments/${id}`, editData)
      .then(() => {
        alert('Appointment updated!');
        setEditingId(null);
        fetchAppointments(); // نئی لسٹ لے کر آئے
      })
      .catch((err) => console.error('Error updating!', err));
  };

  const handleEdit = (appointment) => {
    setEditingId(appointment.id);
  }

  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.length === 0 ? <p>No appointments found.</p> : null}
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <strong>{appointment.name}</strong> - 
            <span> {new Date(appointment.date).toLocaleDateString()} </span> 
            <span> {appointment.time} </span>
            <p>{appointment.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
