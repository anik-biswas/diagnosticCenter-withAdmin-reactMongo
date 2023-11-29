import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
const Blog = () => {
    const blogPosts = [
        {
          title: 'The Importance of Regular Checkups',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod justo nec enim interdum...',
        },
        {
          title: 'How Diagnostic Tests Can Save Lives',
          content:
            'Nunc nec eleifend libero. Morbi feugiat sapien sit amet nunc sollicitudin scelerisque. Nullam at risus...',
        },
        {
          title: 'Choosing the Right Diagnostic Center for You',
          content:
            'Etiam euismod augue ut justo feugiat, a eleifend elit malesuada. Fusce non venenatis ligula...',
        },
      ];
    return (
        <Container>
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
        Diagnostic Center Blog
      </Typography>
      <Grid container spacing={3}>
        {blogPosts.map((post, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                {post.title}
              </Typography>
              <Typography paragraph>{post.content}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
    );
};

export default Blog;