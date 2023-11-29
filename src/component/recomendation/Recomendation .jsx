import { Slider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Recomendation = () => {
  const [recomendations, setRecomendation] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    fetch('https://diagnostic-server-site.vercel.app/recomendation')
      .then(res => res.json())
      .then(data => setRecomendation(data))

  }, [])
  const handleSlideChange = (event, newValue) => {
    setCurrentSlide(newValue);
  };
  console.log(recomendations)
  return (
    <div className="flex flex-col items-center">
      <Typography variant="h4" gutterBottom>
        Health Recommendations
      </Typography>
      <div className="w-2/3 h-2/3 relative">
        <Slider
          value={currentSlide}
          onChange={handleSlideChange}
          max={recomendations.length - 1}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => value + 1}
        />
        {recomendations.map((recomendation, index) => (
          <div key={recomendation._id} className={`carousel-item relative min-w-full ${index === currentSlide ? '' : 'hidden'}`}>
            <img src={recomendation.image} alt={`Recomendation ${recomendation._id}`} className="w-full" />
            <div className="absolute flex flex-col items-center justify-center w-full h-full text-white">
              <h3 className='text-sm md:text-2xl text-red-400'>{recomendation.healthtips}</h3>
              <p className='text-sm md:text-2xl mt-5 text-red-400'>{recomendation.healthcareprofessionals}</p>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <button onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))} className="btn btn-circle">❮</button>
              <button onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, recomendations.length - 1))} className="btn btn-circle">❯</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Recomendation;