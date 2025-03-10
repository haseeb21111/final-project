import React from 'react';
import AppointmentForm from './Appointment/Appointment';
import AppointmentList from './AppointmentList/AppointmentList';

function App() {
  const [refreshList, setRefreshList] = useState(false);

  const refreshAppointments = () => {
    setRefreshList(!refreshList); // Triggers a re-fetch of data
  };
  return (
    <div className="App">
      <h1>Appointment System</h1>
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
}

export default App;
