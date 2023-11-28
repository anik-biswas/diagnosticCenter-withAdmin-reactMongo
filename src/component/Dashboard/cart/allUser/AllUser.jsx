import { useEffect, useState } from "react";
import { FaDev, FaTrash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const AllUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [users,setUser]= useState([]);
    const [selectedUser, setSelectedUser] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    useEffect ( () => {
        fetch('http://localhost:5000/user')
        .then (res => res.json())
        .then(data =>setUser(data))
        
    },[])
    console.log(users)
    const openModal = (user) => {
        console.log(user)
        setSelectedUser(user);
        setIsModalOpen(true);
      };
      const openModal2 = (user) => {
        console.log(user)
        setSelectedUser(user);
        setIsModalOpen2(true);
      };
    
      const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
        setIsModalOpen2(false);
      };

      const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Delete Product won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/user/${id}`, {
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
                            const remainingUsers = users.filter(user => user._id !== id);
                            setUser(remainingUsers);
                    
                        }
                    })

            }
        })
    }
    const handleMakeAdmin = async (selectedUser) => {
        try {
            const response = await fetch(`http://localhost:5000/user/admin/${selectedUser._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                
            });
    
            if (!response.ok) {
                throw new Error(`Failed to update user role: ${response.statusText}`);
            }
    
            const updatedUserResponse = await fetch(`http://localhost:5000/user/admin/${selectedUser._id}`);
            const updatedUserData = await updatedUserResponse.json();

            setSelectedUser(updatedUserData);
            closeModal()
            console.log('User role updated to admin');
        } catch (error) {
           
            console.error(error.message);
        }
    };
    const handleMakeBlocked = async (selectedUser) => {
        try {
            const response = await fetch(`http://localhost:5000/user/adminBlock/${selectedUser._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                
            });
    
            if (!response.ok) {
                throw new Error(`Failed to update user role: ${response.statusText}`);
            }
    
            // Handle success, e.g., update the UI or show a success message
            const updatedUserResponse = await fetch(`http://localhost:5000/user/adminBlock/${selectedUser._id}`);
            const updatedUserData = await updatedUserResponse.json();

            setSelectedUser(updatedUserData);
            closeModal()
            console.log('User role updated Blocked');
        } catch (error) {
           
            console.error(error.message);
        }
    };
    return (
        <div>
        <div className=" my-4 mx-10 md:mx-20 lg:mx-24">
        {/* <input
            type="text"
            placeholder="Search by Job Title"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input input-bordered"
         /> */}
        </div>
        <div className='overflow-x-auto justify-center items-center text-center px-5 md:px-10 lg:px-20'>
        {isModalOpen && selectedUser && (
            <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex">
                <div className="relative p-4 max-w-xl m-auto bg-white w-full">
                {/* Modal content goes here */}
                <h2 className="text-2xl font-bold mb-4"> Name: {selectedUser.name} </h2>
                <div className="grid grid-cols-2 justify-items-center min-w-max">
                    <div>
                        <img src={selectedUser.image} className="w-24 h-24" alt="" />
                    </div>
                    <div className="ml-1">
                    <p className="text-lg mb-2">Blood Group: {selectedUser.blood}</p>
                    <p className="text-lg mb-2">District: {selectedUser.district}</p>
                    <p className="text-lg mb-2">Upazila: {selectedUser.upazila}</p>
                    </div>
                </div>
                
               {
                selectedUser.role==='admin'?"Admin" :
               
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => handleMakeAdmin(selectedUser)}
                >
                    Make Admin
                </button>
                }
                <button className="text-right btn ml-6" onClick={closeModal}>close</button>
                </div>
            </div>
            )}
            {isModalOpen2  && selectedUser &&  (
            <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex">
                 
                <div className="relative p-4 max-w-xl m-auto bg-white w-full">
                <p className='test-xl font-bold my-6'>User will Blocked </p>
                
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => handleMakeBlocked(selectedUser)}
                >
                    Blocked
                </button>
                <button className=" btn ml-20" onClick={closeModal}>close</button>
                </div>
                
            </div>
            )}

            <table className="table">
                        
                        <thead>
                            <tr>
                                <th></th>
                                <th className="text-red-400">Name</th>
                                <th className="text-red-400">Blood </th>
                                <th className="text-red-400">District</th>
                                <th className="text-red-400">Upazila</th>
                                <th className="text-red-400">Photo</th>
                                <th className="text-red-400">Status</th>
                                <th className="text-red-400">Action</th>
                                <th className="text-red-400">Delete</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td className="text-xs">{user.name}</td>
                                    <td>{user.blood} </td>
                                    <td>{user.district}</td>
                                    <td>{user.upazila}</td>
                                    <td><img src={user.image} alt=""  className="w-14 h-14"/></td>
                                    <td ><p  onClick={() => openModal2(user)} className="text-sky-600  underline">{user.status}</p></td>
                                    <td>
                                    <button onClick={() => openModal(user)} className="btn">
                                            See Info
                                        </button>
                                    </td>
                                    <td>
                                    <FaTrash onClick={() => handleDelete(user._id)} className="text-red-500"></FaTrash>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   
        </div>
        </div>
    );
};

export default AllUser;