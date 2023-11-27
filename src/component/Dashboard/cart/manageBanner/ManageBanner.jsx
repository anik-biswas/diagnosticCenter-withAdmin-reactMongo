import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManageBanner = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [banners,setBanners]= useState([]);
    useEffect ( () => {
        fetch('http://localhost:5000/dashboard/banner')
        .then (res => res.json())
        .then(data =>setBanners(data))
        
    },[])
    useEffect(() => {
        fetchBanners();
      }, []); 
    
      const fetchBanners = () => {
        fetch('http://localhost:5000/dashboard/banner')
          .then(res => res.json())
          .then(data => setBanners(data))
          .catch(error => console.error('Error fetching banners:', error));
      };
    console.log(banners)
    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Delete Banner won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/dashboard/banner/${id}`, {
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
                            const remainingBanners = banners.filter(banner=> banner._id !== id);
                            setBanners(remainingBanners);
                    
                        }
                    })

            }
        })
    }
    const handleToggleActive = id => {
        
        fetch(`http://localhost:5000/dashboard/banner/toggle-active/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isActive: true }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
             
              fetchBanners();
            } else {
              console.error('Error toggling isActive status:', data.error);
            }
          })
          .catch(error => console.error('Error toggling isActive status:', error));
      };
    
    return (
        <div>
        
        <div className='overflow-x-auto justify-center items-center text-center px-5 md:px-10 lg:px-20'>
        
            <table className="table">
                        
                        <thead>
                            <tr>
                                <th></th>
                                <th className="text-red-400">Title</th>
                                <th className="text-red-400">Description </th>
                                <th className="text-red-400">coupon</th>
                                <th className="text-red-400">discount</th>
                                <th className="text-red-400">Banner</th>
                                <th className="text-red-400">Status</th>
                                <th className="text-red-400">Delete</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {banners.map((banner, index) => (
                                <tr key={banner._id}>
                                    <td>{index + 1}</td>
                                    <td className="text-xs">{banner.name}</td>
                                    {banner.description.length > 20
                                        ? `${banner.description.slice(0, 20)}...`
                                        : banner.description}
                                    <td>{banner.coupon}</td>
                                    <td>{banner.discount}</td>
                                    <td><img src={banner.bannerImg} alt=""  className="w-14 h-14"/></td>
                                    <button className='btn mt-5'><td onClick={() => handleToggleActive(banner._id, banner.isActive)}>
                                    {banner.isActive ? 'True' : 'False'}
                                    </td></button>
                                    
                                    <td>
                                    <FaTrash onClick={() => handleDelete(banner._id)}  className="text-red-500"></FaTrash>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   
        </div>
        </div>
    );
};

export default ManageBanner;