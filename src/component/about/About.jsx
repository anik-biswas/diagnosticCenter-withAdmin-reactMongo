import { Button, Typography } from '@mui/material';
import React from 'react';

const About = () => {
    return (
        <div>
            <Typography variant="h1" color="primary">
        Welcome to My App
      </Typography>
      <Button variant="contained" color="secondary">
        Click Me
      </Button>
        </div>
    );
};

export default About;