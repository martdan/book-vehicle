import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = "https://81c3e655-8771-4d58-8071-c19b14dd237a-00-17frno3ktmdw1.pike.replit.dev"; // Replace with your backend URL

const RentVehicle = () => {
    // State to store form data
    const [vehicleType, setVehicleType] = useState('');
    const [chargePerHour, setChargePerHour] = useState('');
    const [userId, setUserId] = useState(1); // Assuming you have a logged-in user with ID 1 (change accordingly)

    // State for success/failure message
    const [message, setMessage] = useState('');

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data to be sent to the backend
        const vehicleData = {
            user_id: userId, // Assuming a logged-in user (replace with actual user data)
            type: vehicleType,
            charge_per_hour: chargePerHour
        };

        try {
            // Send data to the backend API using Axios
            const response = await axios.post(`${BACKEND_URL}/vehicles`, vehicleData);

            if (response.status === 200) {
                setMessage('Vehicle added successfully!');
                // Clear form fields after successful submission
                setVehicleType('');
                setChargePerHour('');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to add vehicle. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Rent a Vehicle to Someone</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>Type of Vehicle:</label>
                    <input
                        type="text"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Charge per Hour (in $):</label>
                    <input
                        type="number"
                        value={chargePerHour}
                        onChange={(e) => setChargePerHour(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Submit</button>
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

export default RentVehicle;
