import React, { useState} from 'react';
import {Box, Typography, TextField, Button, Card, CardContent} from '@mui/material';
import { maxWidth } from '@mui/system';

export default function Signup({handleSubmitSignup, handleChangeUsername, handleChangePassword, handleChangeEmail, status, handleBlur}) {

  return (
    <Card
      variant="outlined"
      sx={{
        position: 'fixed',
        bgcolor: 'white',
        zIndex: 100,
        right: 0,
        maxWidth: 400
      }}
      // onBlur={handleBlur}
    >
      <CardContent>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmitSignup}
          id="signup-form"
        >
          <Typography component="h1" variant="h5">
          Sign up
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
            id="email"
            label="Email"
            name="email"
            autoComplete="Email"
            onChange={handleChangeEmail}
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
            Sign up
          </Button>
        </Box >
      </CardContent>
    </Card>
  );
}