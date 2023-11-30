import React, { useState } from 'react';
import { FaTrash, FaUpload } from 'react-icons/fa';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Appointment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [reserves, setReserve] = useState(useLoaderData());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReserve, setSelectedReserve] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    console.log(reserves)
    const openModal = (reserve) => {
        setSelectedReserve(reserve);
        setIsModalOpen(true);
      };
      const closeModal = () => {
        setSelectedReserve(null);
        setIsModalOpen(false);
      };

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

                fetch(`https://diagnostic-server-site.vercel.app/reserve/${id}`, {
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
    console.log(selectedReserve)
    const handleReportSubmit = async () => {
        try {
          const pdfLinkInput = document.getElementById('pdfInput'); 
          const pdfLink = pdfLinkInput.value.trim();
      
          if (!pdfLink) {
            console.error('PDF link is required.');
            return;
          }
      
          const status = 'delivered';
      
          const response = await fetch(`https://diagnostic-server-site.vercel.app/reserve/${selectedReserve._id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pdfLink, status }), // Include the data payload
          });
      
          if (!response.ok) {
            throw new Error(`Failed to update status: ${response.statusText}`);
          }
      
          // Handle success, e.g., update the UI or show a success message
          const updatedReserve = await fetch(`https://diagnostic-server-site.vercel.app/reserve`);
          const updatedReserveData = await updatedReserve.json();
      
          setReserve(updatedReserveData);
          closeModal()
          Swal.fire({text:'Reservation status updated to delivered'});
        } catch (error) {
          console.error(error.message);
        }
      };

      const filteredAppoint = reserves.filter((reserve) =>
  reserve.email.toLowerCase().includes(searchQuery.toLowerCase())
);
      
    return (
        <div className='overflow-x-auto justify-center items-center text-center px-5 md:px-10 lg:px-20'>
        {isModalOpen  && (
            <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex">
                 
                <div className="relative p-4 max-w-xl m-auto bg-white w-full">
                <p className='test-xl font-bold my-6'>Please  Provide Paitent Report</p>
                
                {/* Modal content goes here */}
                <input className='border-2 mx-5' name='file' type="text" id="pdfInput" placeholder="PDF link" />
                
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => handleReportSubmit()}
                >
                    Report Submit
                </button>
                <button className="ml-20" onClick={closeModal}>X</button>
                </div>
                
            </div>
            )}
               <form>
        <div className="my-4 mx-4">
          <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700">
            Search by User Email
          </label>
          <input
            type="text"
            id="searchQuery"
            placeholder="Search by Test Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-1 p-2 border rounded-md"
          />
        </div>
      </form>
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
                            {filteredAppoint.map((reserve, index) => (
                                <tr key={reserve._id}>
                                    <td>{index + 1}</td>
                                    <td className="text-xs">{reserve.testName}</td>
                                    <td>{reserve.email} </td>
                                    <td>{reserve.transactionId}</td>
                                    <td>{reserve.status}</td>
                                    <td><FaUpload onClick={() => openModal(reserve)}></FaUpload></td>
                                    <td><FaTrash onClick={() => handleDelete(reserve._id)} className="text-red-500"></FaTrash></td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
        </div>
    );
};

export default Appointment;