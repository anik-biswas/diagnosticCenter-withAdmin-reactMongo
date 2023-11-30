import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Feature = () => {
    const [reserves,setReserves] = useState([]);
    useEffect(() => {
        fetch('https://diagnostic-server-site.vercel.app/reserve')
          .then(res => res.json())
          .then(data => {
            // Count occurrences of each test name
            const testNameCount = {};
            data.forEach(item => {
              const testName = item.testName;
              testNameCount[testName] = (testNameCount[testName] || 0) + 1;
            });
    
            // Create an array of objects with testName and count properties
            const countedReserves = Object.keys(testNameCount).map(testName => ({
              testName,
              count: testNameCount[testName],
            }));
    
            // Sort the array by count in ascending order
            const sortedReserves = countedReserves.sort((a, b) => b.count - a.count);
    
            setReserves(sortedReserves);
          });
      }, []);
    console.log(reserves)
    return (
        <div className='my-5'>
            
    <Grid container justifyContent="center" alignItems="center" >
      <Grid item xs={12} textAlign="center">
        <h2 style={{ fontSize:'2em', marginTop:'40px' }}>Feature Test</h2>
      </Grid>
      <Grid item xs={12} textAlign="center">
        {reserves.map(reserve => (
          
          <Link key={reserve.testName} to={'/allTest'}><Button
          
          variant="contained"
         
          style={{ margin: '8px' }}
        >
          {reserve.testName}
        </Button></Link>
        ))}
      </Grid>
      </Grid>
        </div>
    );
};

export default Feature;