import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    const [banners, setBanners] = useState({ banners: [] });

    useEffect(() => {
      const fetchBanners = () => {
        fetch('https://diagnostic-server-site.vercel.app/active-banners')
          .then((res) => res.json())
          .then((data) => setBanners(data))
          .catch((error) => console.error('Error fetching banners:', error));
      };
  
      fetchBanners();
    }, []);
  
     // This useEffect will re-run whenever banners changes
  
      if (banners.banners.length > 0) {
        const { name, bannerImg ,description,coupon,discount} = banners.banners[0];
    
        return (
          <div className="hero min-h-screen" style={{ backgroundImage: `url(${bannerImg})` }}>
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">{name}</h1>
                <p className="mb-5">
                 {description}
                </p>
                <button className=" text-lg text-violet-100  mx-5">Get <span className='text-red-500 text-xl font-extrabold'>{discount} %</span> with Coupon: <span className='text-red-500 text-lg font-extrabold'>{coupon}</span></button>
                <Link to={'/allTest'}> <button className="btn btn-primary">All Test</button></Link>
              </div>
            </div>
          </div>
        );
      }
    
      // Fallback or loading state
      return <div></div>;
    };

export default Banner;
