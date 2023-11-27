import React from 'react';
import { Link } from 'react-router-dom';

const TestCart = ({test}) => {
    const { _id,name,description,testDate,price,slot,testImg} = test;
    console.log(name)
    return (
        <div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full h-44" src={testImg} alt="Sunset in the mountains"></img>
            <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{name}</div>
            <div className=" pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price:{price}$</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Slot :{slot}</span>
            
            </div>
            <p className="text-gray-700 text-justify text-base">
            {description.slice(0, 22)}... <Link to={`/testDetails/${_id}`}><button className="text-sky-600">Read More</button></Link>
            </p>
            </div>
            
        </div>
        </div>
    );
};

export default TestCart;