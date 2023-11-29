import { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=83a471512dcffa8098e5f1e4afd247df`;

const AddTest = () => {
    const location= useLocation();
    const navigate= useNavigate();
  
    const [error,setError] = useState("");
    const [testDate, setTestDate] = useState(null);

    const handleTest=async(e)=>{
        e.preventDefault();
    
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const description = form.get('description');
        
        const price = form.get('price');
        const slot = form.get('slot');
        const testDate = form.get('testDate');
        const imageFile = form.get('testImg');
        const imgbbFormData = new FormData();
         imgbbFormData.append('image', imageFile);
        
            const imgbbRes = await fetch(image_hosting_api, {
            method: 'POST',
            body: imgbbFormData,
            });
        
            const imgbbData = await imgbbRes.json();
            const imageUrl = imgbbData.data.url;
            const test = { name,description,testDate,price,slot,testImg:imageUrl};
            console.log(test)
            fetch('https://diagnostic-server-site.vercel.app/dashboard/addTest', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(test)
            })
            .then(res => res.json())
                .then(data => {
                    if(data.insertedId){
                        Swal.fire({
                            title: 'Success!',
                            text: 'Test added Successfully',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                        });
                      //  toast.success('Register & Database saved successful!'); 
                      navigate(location?.state?.from || '/dashboard/manageTest');
                    }
                    console.log(data)
                })
    }
    return (
        <div>
        <div className="bg-[#CBE4E9] p-4 md:p-4 lg:p-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-extrabold">
              Add Test
            </h2>
            <p className="text-right">
              
            </p>
          </div>
          <form onSubmit={handleTest} >
         
            <div className="md:flex  mb-4 lg:mb-8">
              <div className="form-control md:w-full lg:w-1/2">
                <label className="label">
                  <span className="label-text">Test Title</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Test Title"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <div className="form-control md:w-full lg:w-1/2 ml-0 lg:ml-4 mt-4 lg:mt-0">
                <label className="label">
                  <span className="label-text">Slots</span>
                </label>
                <label className="input-group">
                <input
                    type="text"
                    name="slot"
                    placeholder="Slots"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
            </div>
            <div className="md:flex mb-4 lg:mb-8">
              <div className="form-control md:w-full lg:w-1/2">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="price"
                    placeholder="Coupon Code"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <div className="form-control md:w-full lg:w-1/2 ml-0 lg:ml-4 mt-4 lg:mt-0">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <label className="input-group">
                <DatePicker
                selected={testDate} 
                onChange={(date) => setTestDate(date)} 
                placeholderText="Select a date"
                name="testDate"
                className="input input-bordered w-full"
                required
                />
                </label>
              </div>
            </div>
            <div className="md:flex  mb-4 lg:mb-8">
            <div className="form-control md:w-full lg:w-1/2">
                <label className="label">
                  <span className="label-text">DescripTion</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <div className="form-control md:w-full lg:w-1/2 ml-0 lg:ml-4 mt-4 lg:mt-0">
                <label className="label">
                  <span className="label-text">Test Image</span>
                </label>
                <label className="input-group">
                  <input
                    type="file"
                    name="testImg"
                    placeholder="Discount in Percentage"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
            </div>
            <input type="submit" value="Add Test" className="btn btn-block" />
            {/* <button onSubmit={handleBanner} className="btn btn-block" >Add Banner</button> */}
          </form>
        </div>
      </div>
    );
};

export default AddTest;