import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = "https://81c3e655-8771-4d58-8071-c19b14dd237a-00-17frno3ktmdw1.pike.replit.dev"; // Replace with your backend URL

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState('');
    const userId = 1; // Assuming a logged-in user with ID 1 (adjust as necessary)

    // Fetch bookings for the logged-in user
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/bookings/${userId}`);
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setMessage('Failed to load bookings.');
            }
        };

        fetchBookings();
    }, [userId]);

    // Handle update booking
    const handleUpdate = async (id, updatedBooking) => {
        try {
            console.log('Updating booking with ID:', id);
            console.log('Updated booking data:', updatedBooking);

            const response = await axios.put(`${BACKEND_URL}/bookings/${id}`, updatedBooking);

            if (response.status === 200) {
                setMessage('Booking updated successfully!');
                // Refresh the list of bookings
                const updatedBookings = bookings.map((booking) =>
                    booking.id === id ? response.data : booking
                );
                setBookings(updatedBookings);
            } else {
                console.log('Update failed:', response);
                setMessage('Failed to update booking.');
            }
        } catch (error) {
            console.error('Error updating booking:', error);
            setMessage('Failed to update booking. Please try again.');
        }
    };

    // Handle delete booking
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${BACKEND_URL}/bookings/${id}`);
            if (response.status === 200) {
                setMessage('Booking deleted successfully!');
                // Remove the deleted booking from the list
                const remainingBookings = bookings.filter((booking) => booking.id !== id);
                setBookings(remainingBookings);
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
            setMessage('Failed to delete booking. Please try again.');
        }
    };

    // Handle form changes for each booking
    const handleChange = (e, id, field) => {
        const updatedBookings = bookings.map((booking) =>
            booking.id === id ? { ...booking, [field]: e.target.value } : booking
        );
        console.log('Updated bookings state:', updatedBookings); // Debugging line
        setBookings(updatedBookings);
    };

    return (
        <div style={styles.container}>
            <h2>Manage Your Bookings</h2>
            {bookings.length > 0 ? (
                bookings.map((booking) => (
                    <div key={booking.id} style={styles.bookingCard}>
                        {/* Show vehicle type instead of vehicle ID */}
                        <h3>Booking for Vehicle: {booking.vehicle_type}</h3> {/* Assuming `vehicle_type` is the field for vehicle name */}

                        <label>Start Date:</label>
                        <input
                            type="date"
                            value={booking.start_date}
                            onChange={(e) => handleChange(e, booking.id, 'start_date')}
                            style={styles.input}
                        />

                        <label>Start Time:</label>
                        <input
                            type="time"
                            value={booking.start_time}
                            onChange={(e) => handleChange(e, booking.id, 'start_time')}
                            style={styles.input}
                        />

                        <label>End Date:</label>
                        <input
                            type="date"
                            value={booking.end_date}
                            onChange={(e) => handleChange(e, booking.id, 'end_date')}
                            style={styles.input}
                        />

                        <label>End Time:</label>
                        <input
                            type="time"
                            value={booking.end_time}
                            onChange={(e) => handleChange(e, booking.id, 'end_time')}
                            style={styles.input}
                        />

                        <div style={styles.buttonGroup}>
                            <button
                                onClick={() => handleUpdate(booking.id, {
                                    start_date: booking.start_date,
                                    start_time: booking.start_time,
                                    end_date: booking.end_date,
                                    end_time: booking.end_time
                                })}
                                style={styles.button}
                            >
                                Update Booking
                            </button>

                            <button
                                onClick={() => handleDelete(booking.id)}
                                style={styles.deleteButton}
                            >
                                Delete Booking
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No bookings found.</p>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    bookingCard: {
        border: '1px solid #ccc',
        padding: '20px',
        margin: '10px',
        width: '300px',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        width: '100%',
        fontSize: '16px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
    },
    deleteButton: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        backgroundColor: '#ff4d4d',
        color: '#fff',
        border: 'none',
    },
};

export default ManageBookings;
