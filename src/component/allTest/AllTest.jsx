import React, { useEffect, useState } from 'react';
import TestCart from './TestCart';

const AllTest = () => {
    const [tests,setTests] = useState([]);
    useEffect ( () => {
        fetch('https://diagnostic-server-site.vercel.app/test')
        .then (res => res.json())
        .then(data =>setTests(data))
        
    },[])
    console.log(tests)
    return (
        <div>
            <h2 className='text-3xl mt-5 text-center'>All Test</h2>
            <div className="px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-2 justify-items-center  my-10">
            {tests.map((test) => (
                <TestCart test={test} key={test._id} ></TestCart>
               // console.log(job)
            ))}

            </div>
        </div>
    );
};

export default AllTest;