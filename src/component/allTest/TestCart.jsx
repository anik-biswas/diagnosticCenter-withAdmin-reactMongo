import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const TestCart = ({test}) => {
    const { _id,name,description,testDate,price,slot,testImg} = test;
    console.log(name)
    return (
        <Card sx={{ maxWidth: 330 }}>
      <CardMedia
  component="img"
  style={{ width: '100%', height: '50%', objectFit: 'cover' }}
  image={testImg}
/>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <div style={{ paddingBottom: '12px' }}>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Price: {price}$
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Slot: {slot}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {testDate}
          </span>
        </div>
        <Typography variant="body2" color="text.secondary">
          {description.slice(0, 17)}...{' '}
          <Link to={`/testDetails/${_id}`}>
            <Button variant="text" color="primary">
              Read More
            </Button>
          </Link>
        </Typography>
      </CardContent>
    </Card>
    );
};

export default TestCart;