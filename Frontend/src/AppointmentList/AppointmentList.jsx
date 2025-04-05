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
        fetchAppointments(); 
      })
      .catch((err) => console.error('Error updating!', err));
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      axios.delete(`http://localhost:5000/api/appointments/${id}`)
        .then(() => {
          alert("Appointment deleted successfully!");
          fetchAppointments();
        })
        .catch((err) => console.error("Error deleting appointment!", err));
    }
  };
 
  const handleEdit = (appointment) => {
    setEditingId(appointment.id);
    setEditData({
      name: appointment.name,
      date: appointment.date.split('T')[0], 
      time: appointment.time,
      description: appointment.description
    });
  };

  // ان پٹ میں تبدیلی کا فنکشن
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="appointment-list">
      <h2>Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              {editingId === appointment.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                  />
                  <input
                    type="date"
                    name="date"
                    value={editData.date}
                    onChange={handleEditChange}
                  />
                  <input
                    type="time"
                    name="time"
                    value={editData.time}
                    onChange={handleEditChange}
                  />
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                  />
                  <button onClick={() => handleUpdate(appointment.id)}>
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <strong>{appointment.name}</strong> - 
                  <span> {new Date(appointment.date).toLocaleDateString()} </span>
                  <span> {appointment.time} </span>
                  <p>{appointment.description}</p>
                  <button onClick={() => handleEdit(appointment)}>
                    Edit
                  </button>
                  <button
                  onClick={() => handleDelete(appointment.id)} >Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentList;
