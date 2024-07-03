import React, { useState, FC, FormEvent } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { User } from '../interfaces/Types';
import { saveUser } from '../utils/LocalForage';
import { useNavigate } from 'react-router-dom'

const RegisterPage: FC=()=> {
    const [role, setRole] = React.useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

  const handleSubmit = async(e:any) => {
    e.preventDefault()
    // preventDefault()
    const user: User={
        id:0, username, password, name, address, phoneNumber, role
    }
    try {
        await saveUser(user)
        setMessage('User registered successfully!');
        console.log(user)
        navigate('/login')
    }
     catch (error: any) {
  setMessage(error.message);
}

  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 0.5, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '300px',
        margin: '0 auto',
        mt: '32px'
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="outlined-required"
        label="Username"
        onChange={(e)=>setUsername(e.target.value)}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Name"
        onChange={(e)=>setName(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Address"
        onChange={(e)=>setAddress(e.target.value)}
      />
      <TextField
        required
        id="outlined-number"
        label="Phone Number"
        type="number"
        onChange={(e)=>setPhoneNumber(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormControl sx={{ minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                onChange={(e)=>setRole(e.target.value)}
                sx={{ minWidth: 120,  mb: 2 }}
            >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
            </Select>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </FormControl>
    </Box>
  );
}

export default RegisterPage;
