import React from 'react';

const TestCart = ({test}) => {
    const { name,description,testDate,price,slot,testImg} = test;
    console.log(name)
    return (
        <div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full h-44" src={testImg} alt="Sunset in the mountains"></img>
            <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{name}</div>
            <p className="text-gray-700 text-justify text-base">
            {description.slice(0, 30)}
            </p>
        </div>
        
            </div>
        </div>
    );
};

export default TestCart;