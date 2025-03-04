import React from 'react';
import AppointmentForm from './Appointment/Appointment';
import AppointmentList from '../src/AppointmentList';

function App() {
  return (
    <div className="App">
      <h1>Appointment System</h1>
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
}

export default App;
