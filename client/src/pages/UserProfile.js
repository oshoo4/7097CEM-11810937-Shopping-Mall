import React, { useState, useEffect, useContext } from 'react';
import apiService from '../services/api';
import { AuthContext } from '../context/AuthContext';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await apiService.getProfile();
                setProfile(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
          fetchProfile();
        }
    }, [user]);

    if (loading) {
        return <div>Loading profile...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!user) {
      return <div>You must be logged in to view this page.</div>;
    }

    if (!profile) {
        return <div>No profile data found.</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
        </div>
    );
};

export default UserProfile;