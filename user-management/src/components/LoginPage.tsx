import React, { useState, FC, useContext, FormEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../interfaces/AuthContext'
import { User, AuthContextType } from '../interfaces/Types';
import { getUserByUsername } from '../utils/LocalForage';
import Loading from '../utils/Loading';


const LoginPage: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext<AuthContextType>(AuthContext);
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // try {
    //   const user = await getUserByUsername(username); // Check user existence
    //   console.log(user,'5555')
    //   if (!user) {
    //     setMessage('Invalid username or password');
    //     return;
    //   }
    //   if (user.role === 'Admin' && user.password === password) {
    //     navigate('/admin');
    //   } else if(user.role === 'User' && user.password === password) {
    //     navigate(`/profile/${user.id}`);
    //   }
    // } catch (error: any) {
    //   setMessage('Invalid username or password');
    // }


    try {
      const user = await login(username, password);
      console.log(user)
      setTimeout(() => {
        setLoading(false)
        if (user.role === 'Admin') {
        navigate('/admin');
      } else {
        navigate(`/profile/${user.id}`);
      }
      }, 2000);
      
    } catch (error: any) {
      setMessage('Invalid username or password');
    }

  };
  return (
    <>
    { loading? (<Loading />):(
      <Box
      component="form"
      onSubmit={handleSubmit}
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
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Login
      </Button>
      {message && <p>{message}</p>}
    </Box>)}
    </>
  );
};

export default LoginPage;
