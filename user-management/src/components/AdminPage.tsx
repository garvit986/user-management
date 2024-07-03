import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField } from '@mui/material';
import { getUsers, saveUser, Users } from '../utils/LocalForage';

const AdminPage = () => {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  const handleEdit = async (editedUser: Users) => {
    try {
      await saveUser(editedUser);
      // Show success message or update state
    } catch (error) {
      console.error('Error saving user:', error);
      // Handle error state or show error message
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Admin Page
      </Typography>
      {users.map((user) => (
        <Card key={user.id} sx={{ width: 400, margin: '10px', padding: '10px' }}>
          <CardContent>
            <Typography variant="h6">{user.name}</Typography>
            <TextField
              label="Username"
              defaultValue={user.username}
              disabled
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              label="Name"
              defaultValue={user.name}
              fullWidth
              onChange={(e) =>
                handleEdit({ ...user, name: e.target.value } as Users)
              }
              sx={{ mb: 1 }}
            />
            <TextField
              label="Address"
              defaultValue={user.address}
              fullWidth
              onChange={(e) =>
                handleEdit({ ...user, address: e.target.value } as Users)
              }
              sx={{ mb: 1 }}
            />
            <TextField
              label="Phone Number"
              defaultValue={user.phoneNumber}
              fullWidth
              onChange={(e) =>
                handleEdit({ ...user, phoneNumber: e.target.value } as Users)
              }
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={() => handleEdit(user)}
              sx={{ mt: 1 }}
            >
              Save
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default AdminPage;
