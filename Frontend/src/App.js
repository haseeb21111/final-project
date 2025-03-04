import React from 'react';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';

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
