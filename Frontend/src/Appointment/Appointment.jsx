
import React, { useState } from 'react';
import axios from 'axios';
import "./Appointment.css"

const AppointmentForm = ({ onAppointmentAdded }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointmentData = { name, date, time, description };

    axios
      .post('http://localhost:5000/api/appointments', appointmentData)
      .then((response) => {
        alert('Appointment created successfully');
        setName('');
        setDate('');
        setTime('');
        setDescription('');
      })
      .catch((error) => {
        console.error('There was an error creating the appointment!', error);
      });
  };

  return (
    <div>
      <h2>Create Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
