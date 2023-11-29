import { Button, Container, Paper, Typography } from '@mui/material';
import React from 'react';

const About = () => {
    return (
        <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod justo nec enim interdum, vel scelerisque
          lacus hendrerit. Phasellus non sagittis justo. Nullam facilisis sodales sagittis.
        </Typography>
        <Typography paragraph>
          Nunc nec eleifend libero. Morbi feugiat sapien sit amet nunc sollicitudin scelerisque. Nullam at risus a orci
          aliquet luctus. Proin consequat euismod metus, vel vestibulum metus hendrerit in. Duis hendrerit arcu eget
          elit accumsan hendrerit. Sed auctor mi vel lorem blandit, id varius neque convallis.
        </Typography>
        <Typography paragraph>
          Etiam euismod augue ut justo feugiat, a eleifend elit malesuada. Fusce non venenatis ligula. Ut ac mi nec
          purus cursus suscipit id ac arcu. Nullam commodo tellus vitae nulla consequat aliquam. Ut rhoncus tortor vel
          fermentum vestibulum.
        </Typography>
      </Paper>
    </Container>
    );
};

export default About;