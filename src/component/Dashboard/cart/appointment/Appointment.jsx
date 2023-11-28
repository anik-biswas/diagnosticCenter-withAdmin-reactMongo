import React, { useState } from 'react';
import { FaTrash, FaUpload } from 'react-icons/fa';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Appointment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [reserves, setReserve] = useState(useLoaderData());
    console.log(reserves)

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Delete appointment won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/reserve/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your appointment has been deleted.',
                                'success'
                            )
                            const remainingApps = reserves.filter(reserve => reserve._id !== id);
                            setReserve(remainingApps);
                    
                        }
                    })

            }
        })
    }

    return (
        <div>
            <table className="table">
                        
                        <thead>
                            <tr>
                                <th></th>
                                <th className="text-red-400">Test Name</th>
                                <th className="text-red-400">User Email</th>
                                <th className="text-red-400">TransId</th>
                                
                                <th className="text-red-400">Status</th>
                                <th className="text-red-400">Upload</th>
                                <th className="text-red-400">Delete</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {reserves.map((reserve, index) => (
                                <tr key={reserve._id}>
                                    <td>{index + 1}</td>
                                    <td className="text-xs">{reserve.testName}</td>
                                    <td>{reserve.email} </td>
                                    <td>{reserve.transactionId}</td>
                                    <td>{reserve.status}</td>
                                    <td><FaUpload></FaUpload></td>
                                    <td><FaTrash onClick={() => handleDelete(reserve._id)} className="text-red-500"></FaTrash></td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
        </div>
    );
};

export default Appointment;