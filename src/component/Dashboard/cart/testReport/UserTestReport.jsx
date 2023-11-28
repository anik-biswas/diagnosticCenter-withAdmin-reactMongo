import React, { useContext, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../firebase/AuthProvider';

const UserTestReport = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const email= user?.email;
    const [reserves, setReserve] = useState(useLoaderData());

    const userReserves = reserves.filter((reserve) => reserve.email === email && reserve.status === 'delivered');
     
    const handleDownload = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to download this ",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, download it!'
        })
        .then((result) => {
            if (result.isConfirmed) {

                            Swal.fire(
                                'Download',
                                'Your appointment has been download.',
                                'success'
                            )
                           
                        }
                    })

            }
       
    return (
        <div className='overflow-x-auto justify-center items-center text-center px-5 md:px-10 lg:px-20'>
        
            <table className="table">
                        
                        <thead>
                            <tr>
                                <th></th>
                                <th className="text-red-400">Test Name</th>
                                <th className="text-red-400">User Email</th>
                                <th className="text-red-400">TransId</th>
                                
                                <th className="text-red-400">Status</th>
                                
                                <th className="text-red-400">Download</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {userReserves.map((reserve, index) => (
                                <tr key={reserve._id}>
                                    <td>{index + 1}</td>
                                    <td className="text-xs">{reserve.testName}</td>
                                    <td>{reserve.email} </td>
                                    <td>{reserve.transactionId}</td>
                                    <td>{reserve.status}</td>
                                    
                                    <td><FaDownload onClick={() => handleDownload(reserve._id)} className="text-red-500"></FaDownload></td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
        </div>
    );
};

export default UserTestReport;