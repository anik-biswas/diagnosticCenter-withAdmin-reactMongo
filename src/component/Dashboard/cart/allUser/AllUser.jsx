import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AllUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [users,setUser]= useState([]);
    const [selectedUser, setSelectedUser] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);

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
    
      const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
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
                
                {/* Add more user information as needed */}
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={closeModal}
                >
                    Close Modal
                </button>
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
                                    <td>{user.status}</td>
                                    <td>
                                    <button onClick={() => openModal(user)} className="btn">
                                            See Info
                                        </button>
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