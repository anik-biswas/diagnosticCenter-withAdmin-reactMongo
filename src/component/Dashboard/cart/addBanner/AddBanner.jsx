import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const image_hosting_api = `https://api.imgbb.com/1/upload?key=83a471512dcffa8098e5f1e4afd247df`;
const AddBanner = () => {
    const location= useLocation();
    const navigate= useNavigate();
  
    const [error,setError] = useState("");
    const handleBanner =async(e)=>{
        e.preventDefault();
    
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const description = form.get('description');
        
        const coupon = form.get('coupon');
        const discount = form.get('discount');
        const imageFile = form.get('bannerImg');
        const imgbbFormData = new FormData();
         imgbbFormData.append('image', imageFile);
  
            const imgbbRes = await fetch(image_hosting_api, {
            method: 'POST',
            body: imgbbFormData,
            });
        
            const imgbbData = await imgbbRes.json();
            const imageUrl = imgbbData.data.url;
            const banner = { name,description,discount,coupon,bannerImg:imageUrl,isActive:false};
            console.log(banner)
            fetch('https://diagnostic-server-site.vercel.app/dashboard/addBanner', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(banner)
                })
                .then(res => res.json())
                    .then(data => {
                        if(data.insertedId){
                          //  toast.success('Register & Database saved successful!'); 
                          navigate(location?.state?.from || '/dashboard/manageBanner');
                        }
                        console.log(data)
                    })
                    
        }
       
    return (
        <div>
      <div className="bg-[#CBE4E9] p-4 lg:p-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-extrabold">
            Add Banner
          </h2>
          <p className="text-right">
            
          </p>
        </div>
        <form  onSubmit={handleBanner}>
       
          <div className="md:flex mb-4 lg:mb-8">
            <div className="form-control md:w-full lg:w-1/2">
              <label className="label">
                <span className="label-text">Banner Title</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Banner Title"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
            <div className="form-control md:w-full lg:w-1/2 ml-0 lg:ml-4 mt-4 lg:mt-0">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <label className="input-group">
              <input
                  type="text"
                  name="description"
                  placeholder="Banner Description"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
          </div>
          <div className="md:flex mb-4 lg:mb-8">
            <div className="form-control md:w-full lg:w-1/2">
              <label className="label">
                <span className="label-text">Coupon Code</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="coupon"
                  placeholder="Coupon Code"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
            <div className="form-control md:w-full lg:w-1/2 ml-0 lg:ml-4 mt-4 lg:mt-0">
              <label className="label">
                <span className="label-text">Discount</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="discount"
                  placeholder="Discount in Percentage"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
          </div>
          <div className="mb-4 lg:mb-8">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Banner image</span>
              </label>
              <label className="input-group">
                <input
                  type="file"
                  name="bannerImg"
                  placeholder="Banner Image"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
          </div>
          <input type="submit" value="Add Banner" className="btn btn-block" />
          {/* <button onSubmit={handleBanner} className="btn btn-block" >Add Banner</button> */}
        </form>
      </div>
    </div>
    );
};

export default AddBanner;