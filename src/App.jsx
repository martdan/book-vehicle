import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import RentVehicle from './components/RentVehicle';
import BookVehicle from './components/BookVehicle';
import ManageBookings from './components/ManageBookings';

function App() {
  return (
    <Router>
      <div>
        {/* Main content of the application */}
        <Routes>
          {/* Route for the Main Page */}
          <Route path="/" element={<MainPage />} />

          {/* Route for Renting a Vehicle */}
          <Route path="/rent-vehicle" element={<RentVehicle />} />

          {/* Route for Booking a Vehicle */}
          <Route path="/book-vehicle" element={<BookVehicle />} />

          {/* Route for Managing Bookings (Update/Delete) */}
          <Route path="/manage-bookings" element={<ManageBookings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
