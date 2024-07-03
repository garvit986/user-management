import React, { useState, useEffect, useContext, FC, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { AuthContext } from '../interfaces/AuthContext';
import { User, AuthContextType } from '../interfaces/Types';
import { getUserById, saveUser } from '../utils/LocalForage';

const UserProfile: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoggedIn } = useContext<AuthContextType>(AuthContext);
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      if (id && (parseInt(id) === user.id || user.role === 'Admin')) {
        const fetchedUser = await getUserById(parseInt(id));
        setProfileUser(fetchedUser || null);
      } else {
        navigate('/login');
      }
    };
    fetchUser();
  }, [id, user, navigate]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (profileUser) {
      try {
        await saveUser(profileUser);
        setMessage('Profile updated successfully.');
      } catch (error) {
        setMessage('Error updating profile.');
      }
    }
  };

  if (!isLoggedIn || !profileUser) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSave}
      sx={{
        '& .MuiTextField-root': { m: 0.5, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '300px',
        margin: '0 auto',
        mt: '32px'
      }}
    >
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <TextField
        label="Username"
        value={profileUser.username}
        disabled
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Name"
        value={profileUser.name}
        onChange={(e) => setProfileUser({ ...profileUser, name: e.target.value })}
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Address"
        value={profileUser.address}
        onChange={(e) => setProfileUser({ ...profileUser, address: e.target.value })}
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Phone Number"
        value={profileUser.phoneNumber}
        onChange={(e) => setProfileUser({ ...profileUser, phoneNumber: e.target.value })}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Save
      </Button>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default UserProfile;
