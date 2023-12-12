import React from 'react';
import Banner from '../banner/Banner';
import Feature from '../feature/Feature';
import Promotion from '../promotion/Promotion';
import Recomendation from '../recomendation/Recomendation ';

const Home = () => {
    return (
        <div className='px-10  '>
            <Banner></Banner>
            <Feature ></Feature>
            <Promotion ></Promotion>
            <Recomendation ></Recomendation>
        </div>
    );
};

export default Home;