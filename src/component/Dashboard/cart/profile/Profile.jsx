import React, { useContext, useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../firebase/AuthProvider';

const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const emails= user?.email;
    const [users, setUsers] = useState(useLoaderData());
    const userProfile = users.filter((user) => user.email === emails);
    //console.log(userProfile)
    const { name, image, email, district, upazila } = userProfile.length > 0 ? userProfile[0] : {};
    console.log(name,image,email,district,upazila)
    return (
        <div>
          <div className="p-16">
           <div className="p-8 bg-slate-950 bg-opacity-30 shadow mt-16">
           <div className="relative">
           <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 -top-10 -mt-24 flex items-center justify-center text-indigo-500">
           <img src={image} className='w-48 h-48 rounded-full' alt="" />
         </div>
         </div>
         <div className="mt-20 text-center border-b pb-12">
        <h1 className="text-4xl mt-6 font-medium text-gray-700">{name}</h1>
         <p className="font-semibold  mt-3">{upazila},{district}</p>

        <p className="mt-8 text-white ">Email : {email}</p>
         <p className="mt-2 text-white">University of Computer Science</p>
        </div>
                 
           </div>  
          </div>
        </div>
    );
};

export default Profile;