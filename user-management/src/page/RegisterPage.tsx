import React, { useState, FC, FormEvent } from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  Button,
  FormControl,
  Grid,
  Typography,
} from "@mui/material";
import { User } from "../interfaces/Types";
import { saveUser } from "../utils/LocalForage";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const RegisterPage: FC = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    if (!name) errors.name = "Name is required";
    if (!address) errors.address = "Address is required";
    if (!phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!role) errors.role = "Role is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      const user: User = {
        id: 0,
        username,
        password,
        name,
        address,
        phoneNumber,
        role,
      };
      await saveUser(user);
      setTimeout(() => {
        setLoading(false); // Hide loader after 2 seconds
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            maxWidth: 600,
            mx: "auto",
            p: 2,
            mt: 4,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Register
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-password-input"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-name-input"
                label="Name"
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-address-input"
                label="Address"
                onChange={(e) => setAddress(e.target.value)}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-phone-input"
                label="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Register
              </Button>
            </Grid>
          </Grid>
          {message && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default RegisterPage;
