import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='h-screen justify-center items-center text-center'>
        <div className='text-xl font-bold '>
            <h2 className='my-5'>OPPS! </h2>
            <div className="flex justify-center items-center h-full">
          <img className='mx-auto my-5' src="https://i.ibb.co/pz8JwJQ/download-3.jpg" alt="" />
            </div>
           <Link to="/"><button className='btn my-5'>Home</button></Link> 
        </div>
        </div>
    );
};

export default ErrorPage;