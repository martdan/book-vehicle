import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = "https://81c3e655-8771-4d58-8071-c19b14dd237a-00-17frno3ktmdw1.pike.replit.dev"; // Replace with your backend URL

const BookVehicle = () => {
    // State for available vehicles
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Fetch available vehicles on component mount
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/vehicles`);
                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
                setMessage('Failed to load available vehicles.');
            }
        };

        fetchVehicles();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookingData = {
            vehicle_id: selectedVehicle,
            user_id: 1, // Assuming logged-in user with ID 1 (update this accordingly)
            start_date: startDate,
            start_time: startTime,
            end_date: endDate,
            end_time: endTime,
            phone_number: phoneNumber,
            name: name,  // User's name
            email: email,
        };

        try {
            const response = await axios.post(`${BACKEND_URL}/bookings`, bookingData);
            if (response.status === 200) {
                setMessage('Vehicle booked successfully!');
                // Clear form fields
                setSelectedVehicle('');
                setStartDate('');
                setStartTime('');
                setEndDate('');
                setEndTime('');
                setPhoneNumber('');
                setName('');  // Clear name input
                setEmail('');
            }
        } catch (error) {
            console.error('Error booking vehicle:', error);
            setMessage('Failed to book vehicle. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Book a Vehicle</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>Select Vehicle:</label>
                    <select
                        value={selectedVehicle}
                        onChange={(e) => setSelectedVehicle(e.target.value)}
                        required
                        style={styles.input}
                    >
                        <option value="">-- Select a Vehicle --</option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>
                                {vehicle.type} - ${vehicle.charge_per_hour} per hour
                            </option>
                        ))}
                    </select>
                </div>

                <div style={styles.inputGroup}>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Start Time:</label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>End Time:</label>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Name:</label> {/* New Name input field */}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <button type="submit" style={styles.button}>Submit Booking</button>
            </form>

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
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '300px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
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
};

export default BookVehicle;
