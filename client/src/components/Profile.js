import React, { useContext } from 'react';
import { useSelector } from 'react-redux'; 

export default function Profile() {
    const email = useSelector((state) => state.email.email);
    const imageUrl = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'; // Replace with your image URL

    return (
        <div>
            <img src={imageUrl} alt="Profile" /> {/* Image added here */}
            <h1>Profile</h1>
            <h2>Email: {email}</h2>
        </div>
    );
}

