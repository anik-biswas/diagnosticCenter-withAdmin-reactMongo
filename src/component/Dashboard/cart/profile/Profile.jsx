import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../firebase/AuthProvider';

const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const email = user?.email;
  
    const [users, setUsers] = useState(useLoaderData());
    const userProfile = users.filter((user) => user.email === email);
  
    const selectedUser = userProfile.length > 0 ? userProfile[0] : {};
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bloods, setBloods] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
  
    useEffect(() => {
      fetch('https://diagnostic-server-site.vercel.app/bloodGroup')
        .then((res) => res.json())
        .then((data) => {
          setBloods(data);
        });
    }, []);
  
    useEffect(() => {
      fetch('https://diagnostic-server-site.vercel.app/district')
        .then((res) => res.json())
        .then((data) => {
          setDistricts(data);
        });
    }, []);
  
    useEffect(() => {
      fetch('https://diagnostic-server-site.vercel.app/upazila')
        .then((res) => res.json())
        .then((data) => {
          setUpazilas(data);
        });
    }, []);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const handleUpdateProfile = (event) => {
      event.preventDefault();
  
      const form = new FormData(event.currentTarget);
      const selectBlood = document.getElementById("bloodSelect");
      const selectDistrict = document.getElementById("districtSelect");
      const selectUpazila = document.getElementById("upazilaSelect");
      const name = form.get('name');
      const email = form.get('email');
      const blood = selectBlood.value;
      const district = selectDistrict.value;
      const upazila = selectUpazila.value;
  
      const updateUser = { name, email, blood, district, upazila };
  
      fetch(`https://diagnostic-server-site.vercel.app/userUpdate/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(updateUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
  
          // Refetch the updated user data
          fetch(`https://diagnostic-server-site.vercel.app/user/admin/${selectedUser._id}`)
            .then((res) => res.json())
            .then((updatedUserData) => {
              // Update state with the new user data
              setUsers((prevUsers) => {
                const updatedUsers = prevUsers.map((user) =>
                  user._id === updatedUserData._id ? updatedUserData : user
                );
                return updatedUsers;
              });
            });
  
          navigate('/dashboard/profile');
          closeModal();
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
          // Handle error scenarios, such as displaying an error message to the user
        });
    };

    return (
        <div>

          <div className="p-16">
           
          {isModalOpen  && selectedUser &&  (
           <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex">    
           <div className="relative p-4 max-w-xl m-auto bg-white w-full">
           <div className='text-right mr-10'>
                    <button className=" test-xl" onClick={closeModal}>X</button>
                    </div>
           <div className="hero-content flex-col ">
                <div className="text-center ">
                    <h1 className="text-xl md:text-2xl lg:text-5xl font-bold">Profile Update</h1>
                </div>
             
                <div className="card flex-shrink-0  w-64 md:w-full max-w-lg shadow-2xl bg-[#e9edc9]">
                    <form  onSubmit={handleUpdateProfile}  className="card-body">
                    
                    <div className="md:flex mb-4 lg:mb-8">
        <div className="form-control md:w-full lg:w-1/2">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              name="name"
              defaultValue={selectedUser.name}
              placeholder=""
              className="input input-bordered w-full"
              required
            />
          </label>
        </div>
        <div className="form-control md:w-full lg:w-1/2 ml-0 lg:ml-4 mt-4 lg:mt-0">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              name="email"
              defaultValue={selectedUser.email}
              placeholder=""
              className="input input-bordered w-full"
              required
            />
          </label>
        </div>
      </div>
                        
        <div className="md:flex mb-4 lg:mb-8">
        <div className="form-control md:w-full lg:w-full">
          <label className="label">
            <span className="label-text">blood Group</span>
          </label>
          <label className="input-group">
            <select
              className="select input input-bordered w-full"
              id="bloodSelect"
              defaultValue={selectedUser.blood}
              required
            >
               
              {bloods.map((blood, index) => (
                <option key={index} value={blood.name}>
                  {blood.name}
                </option>
              ))}
            </select>
          </label>
        </div>
       
      </div>
      <div className="md:flex mb-4 lg:mb-8">
        <div className="form-control md:w-full lg:w-1/2">
          <label className="label">
            <span className="label-text">District</span>
          </label>
          <label className="input-group">
          <select
              className="select input input-bordered w-full max-w-sm"
              id="districtSelect"
              defaultValue={selectedUser.district}
              required
            >
                 
                  {districts
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((district) => (
                      <option key={district._id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
            </select>
          </label>
        </div>
        <div className="form-control md:w-full lg:w-1/2">
          <label className="label">
            <span className="label-text">Upazila</span>
          </label>
          <label className="input-group">
          <select
              className="select input input-bordered w-full max-w-sm"
              id="upazilaSelect"
              defaultValue={selectedUser.upazila}
              required
            >
                 
                  {upazilas
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((upazila) => (
                      <option key={upazila._id} value={upazila.name}>
                        {upazila.name}
                      </option>
                    ))}
            </select>
          </label>
        </div>
      </div> 
     
                        <div className="form-control mt-6 p-0">
                            <button  className="btn btn-neutral" >Update</button>
                        </div>
                       
                    </form>
                </div>
            </div>

            </div>
            </div>
            )}

           <div className="p-8 bg-slate-950 bg-opacity-30 shadow mt-16">
           <div className="relative">
           <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 -top-10 -mt-24 flex items-center justify-center text-indigo-500">
           <img src={selectedUser.image} className='w-48 h-48 rounded-full' alt="" />
         </div>
         </div>
         <div className="mt-20 text-center border-b pb-12">
        <h1 className="text-4xl mt-6 font-medium text-gray-700">{selectedUser.name}</h1>
         <p className="font-semibold  mt-3">{selectedUser.upazila},{selectedUser.district}</p>

        <p className="mt-8 text-white ">Email : {selectedUser.email}</p>
         <p className="mt-2 text-white">University of Computer Science</p>
         <button onClick={() => openModal(selectedUser)} className="btn">
                                            Update 
                            </button>
        </div>
                 
           </div>  
          </div>
        </div>
    );
};

export default Profile;