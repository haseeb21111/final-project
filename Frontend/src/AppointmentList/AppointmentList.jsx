import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentList.css';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/appointments')
      .then((response) => {
        console.log('Fetched Appointments:', response.data);
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching appointments!', error);
      });
  }, []);

  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <strong>{appointment.name}</strong> - {appointment.date} {appointment.time}
            <p>{appointment.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
