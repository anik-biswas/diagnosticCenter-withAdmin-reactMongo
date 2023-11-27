import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ManageTest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [tests,setTests]= useState([]);
    useEffect ( () => {
        fetch('http://localhost:5000/dashboard/test')
        .then (res => res.json())
        .then(data =>setTests(data))
        
    },[])
    useEffect(() => {
        fetchTests();
      }, []); 
    const fetchTests = () => {
        fetch('http://localhost:5000/dashboard/test')
          .then(res => res.json())
          .then(data => setTests(data))
          .catch(error => console.error('Error fetching banners:', error));
      };

      const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Delete Test won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/dashboard/test/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your Coffee has been deleted.',
                                'success'
                            )
                            const remainingTests = tests.filter(test=> test._id !== id);
                            setTests(remainingTests);
                    
                        }
                    })

            }
        })
    }
    return (
        <div>
        
        <div className='overflow-x-auto justify-center items-center text-center px-5 md:px-10 lg:px-20'>
        
            <table className="table">
                        
                        <thead>
                            <tr className="text-center">
                                <th></th>
                                <th className="text-red-400">Title</th>
                                <th className="text-red-400">Description </th>
                                <th className="text-red-400">Price</th>
                                <th className="text-red-400">Slots</th>
                                <th className="text-red-400">Image</th>
                                <th className="text-red-400">Test Date</th>
                                <th className="text-red-400">action</th>
                                <th className="text-red-400">Delete</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {tests.map((test, index) => (
                                <tr className="text-center" key={test._id}>
                                    <td>{index + 1}</td>
                                    <td className="text-xs">{test.name}</td>
                                    <td className="text-justify">
                                    {test.description.length > 20
                                        ? `${test.description.slice(0, 20)}...`
                                        : test.description}
                                    </td>
                                    <td>{test.price}</td>
                                    <td>{test.slot}</td>
                                    <td><img src={test.testImg} alt=""  className="w-14 h-14"/></td>
                                    <td>
                                    {test.testDate}
                                    </td>
                                    <td><button className="btn">Update</button></td>
                                    <td>
                                    <FaTrash  onClick={() => handleDelete(test._id)}  className="text-red-500"></FaTrash>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   
        </div>
        </div>
    );
};

export default ManageTest;