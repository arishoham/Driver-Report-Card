import React, {useEffect, useRef} from 'react';
import {Box, Typography, TextField, Button, Card, CardContent} from '@mui/material';

export default function Login({handleSubmitLogin, handleChangeUsername, handleChangePassword, status, setAccount}) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setAccount('');
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        position: 'fixed',
        zIndex: 100,
        right: 20,
        top: 80,
        maxWidth: 400
      }}
      ref={wrapperRef}
      // onBlur={handleBlur}
    >
      <CardContent>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmitLogin}
          id="login-form"
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="Username"
            autoComplete="username"
            // autoFocus
            onChange={handleChangeUsername}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChangePassword}
          />
          <div>{status}</div>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
              Sign In
          </Button>
        </Box >
      </CardContent>
    </Card>
  );
}