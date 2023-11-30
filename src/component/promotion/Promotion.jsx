import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

const promotions = [
  {
    title: 'Comprehensive Health Check',
    description: 'Our comprehensive health check package covers a range of diagnostic tests to ensure your overall well-being.',
    imageUrl: 'https://i.ibb.co/cXW2XPJ/images-5.jpg',
  },
  {
    title: 'Specialized Cardiac Screening',
    description: 'Take care of your heart with our specialized cardiac screening package. Early detection can save lives.',
    imageUrl: 'https://i.ibb.co/sHT6xmh/stock-photo.jpg',
  },
  {
    title: 'Advanced Imaging Services',
    description: 'Experience advanced imaging services for accurate diagnosis. Our state-of-the-art technology ensures precision in results.',
    imageUrl: 'https://i.ibb.co/tCCZ0Nj/images-4.jpg',
  },
];

const Promotion = () => {
  return (
    <Grid style={{marginBottom:40}} container spacing={{ xs: 2, sm: 2, md: 3, lg: 4 }} justifyContent="center">
      {promotions.map((promo, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              style={{ width: '100%', flex: '1', objectFit: 'cover' }}
              image={promo.imageUrl}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {promo.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {promo.description}
              </Typography>
              <Button variant="contained" color="primary">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Promotion;