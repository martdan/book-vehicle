import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div style={styles.container}>
            <h1>Vehicle Booking System</h1>

            <div style={styles.buttonContainer}>
                <Link to="/rent-vehicle" style={styles.link}>
                    <button style={styles.button}>Rent a Vehicle to Someone</button>
                </Link>
                <Link to="/book-vehicle" style={styles.link}>
                    <button style={styles.button}>Book a Vehicle</button>
                </Link>
                <Link to="/manage-bookings" style={styles.link}>
                    <button style={styles.button}>Update/Delete Bookings</button>
                </Link>
            </div>
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
        backgroundColor: '#f5f5f5'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    link: {
        textDecoration: 'none'
    },
    button: {
        padding: '15px 30px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        width: '250px'
    }
};

export default MainPage;
