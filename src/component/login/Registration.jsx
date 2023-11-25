import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../firebase/AuthProvider";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 

const image_hosting_api = `https://api.imgbb.com/1/upload?key=83a471512dcffa8098e5f1e4afd247df`;

const Registration = () => {
    const {signUp} = useContext(AuthContext);
    const location= useLocation();
    const navigate= useNavigate();
  
    const [error,setError] = useState("");
    const [bloods, setBloods] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/bloodGroup')
          .then(res => res.json())
          .then(data => {
            setBloods(data);
          });
      }, []);
    
      useEffect(() => {
        fetch('http://localhost:5000/district')
          .then(res => res.json())
          .then(data => {
            setDistricts(data);
          });
      }, []);
    
      useEffect(() => {
        fetch('http://localhost:5000/upazila')
          .then(res => res.json())
          .then(data => {
            setUpazilas(data);
            
          });
      }, []);
   const handleRegister =async(e)=>{
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const email = form.get('email');
    const password = form.get('password');
    const bloodGroup = form.get('bloodGroup');
    const imageFile = form.get('image');
  
    // Host image on imgbb
    const imgbbFormData = new FormData();
    imgbbFormData.append('image', imageFile);
  
    const imgbbRes = await fetch(image_hosting_api, {
      method: 'POST',
      body: imgbbFormData,
    });
  
    const imgbbData = await imgbbRes.json();
    const imageUrl = imgbbData.data.url;
  
    // Continue with your registration logic, including imageUrl in the data
    const user = {
      name,
      email,
      password,
      bloodGroup,
      image: imageUrl, // Include the hosted image URL
    };
    console.log(user)
    //   if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
    //      setError("Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character");
        
    //  }
    //  else{
    //     setError("");
    //      if(email,name,image)
    //      {
            
    //         signUp(email,password)
    //         .then(result=>{
    //             console.log(result.user);
                
    //             const createdAt = result.user?.metadata?.creationTime;
    //             const user = { email,name,image, createdAt: createdAt };
               
    //             fetch('https://job-server-topaz.vercel.app/user', {
    //                 method: 'POST',
    //                 headers: {
    //                     'content-type': 'application/json'
    //                 },
    //                 body: JSON.stringify(user)
    //             })
    //                 .then(res => res.json())
    //                 .then(data => {
    //                     if(data.insertedId){
    //                       //  toast.success('Register & Database saved successful!'); 
    //                     }
    //                     console.log(data)
    //                 })

    //             navigate(location?.state ? location.state : '/',{state: {name}});
    //             // navigate('/', { state: { name } });
    //             toast.success('Register successful!'); 
    //             //console.log(name,email,image,password);
    //         })
    //         .catch(error=>{
    //             console.error(error);
    //             toast.error('Registration failed. Please check your credentials.');
    //         })
    //     }
       
    //  }
   }
    return (
        <div>
            <div className="hero min-h-screen bg-[#e3f9f6]">
                <div className="hero-content flex-col ">
                    <div className="text-center ">
                        <h1 className="text-xl md:text-2xl lg:text-5xl font-bold">Register now!</h1>
                    </div>
                    <div className="card flex-shrink-0  w-64 md:w-full max-w-lg shadow-2xl bg-[#50e6da]">
                        <form onSubmit={handleRegister} className="card-body">
                        <div>
                                <p>{error}</p>
                        </div>
                        <div className="md:flex mb-4 lg:mb-8">
            <div className="form-control md:w-full lg:w-1/2">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
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
                  placeholder="Email"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
          </div>
                            
            <div className="md:flex mb-4 lg:mb-8">
            <div className="form-control md:w-full lg:w-1/2">
              <label className="label">
                <span className="label-text">blood Group</span>
              </label>
              <label className="input-group">
                <select
                  className="select input input-bordered w-full"
                  id="bloodGroupSelect"
                  required
                >
                     <option value="" disabled selected>
                        Select Blood Group
                      </option>
                  {bloods.map((blood, index) => (
                    <option key={index} value={blood.name}>
                      {blood.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-control md:w-full lg:w-1/2 ml-0 lg:ml-4 mt-4 lg:mt-0">
              <label className="label">
                <span className="label-text">image</span>
              </label>
              <label className="input-group">
                <input
                  type="file"
                  name="image"
                  className="input input-bordered w-full max-w-sm"
                  required
                />
              </label>
            </div>
          </div>
          <div className="md:flex mb-4 lg:mb-8">
            <div className="form-control md:w-full lg:w-1/2">
              <label className="label">
                <span className="label-text">Salary Range</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="salary"
                  placeholder="Salary Range"
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
                  placeholder="Description"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
          </div> 
          <div className="md:flex mb-4 lg:mb-8">
             <div className="form-control md:w-full lg:w-1/2">
                 <label className="label">
                 <span className="label-text">Password</span>
                  </label>
                  <input type="password"  placeholder="password" className="input input-bordered" name='password' required/>
             </div>
             <div className="form-control md:w-full lg:w-1/2">
                 <label className="label">
                 <span className="label-text">Password</span>
                  </label>
                  <input type="password"  placeholder="password" className="input input-bordered" name='password' required/>
             </div>

            </div>
                            <div className="form-control mt-6 p-0">
                                <button  className="btn btn-neutral" >Register</button>
                            </div>
                            <label className="label">
                                Have an account? <Link to="/login" className="label-text-alt link link-hover">Please Login</Link>
                            </label>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;