import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
 import { AuthContext } from "../../firebase/AuthProvider";
//import { toast } from "react-toastify";

 //import 'react-toastify/dist/ReactToastify.css'; 

const Login = () => {

    const {googleSignIn,signIn} = useContext(AuthContext);
    const location= useLocation();
    const navigate= useNavigate();
    const [error,setError] = useState("");
   
    const handleGoogle = () => {
        googleSignIn().then((result) =>{
            const createdAt = result.user?.metadata?.creationTime;
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                image: result.user?.photoURL,
                status: "active",
                createdAt: createdAt
            }
            fetch('https://diagnostic-server-site.vercel.app/user', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.insertedId){
                          //  toast.success('Register & Database saved successful!'); 
                        }
                        console.log(data)
                    })
            
            console.log(result.user);
        
            navigate(location?.state?.from || '/dashboard');

           //toast.success('You Login with Google');

        });
    };
    const handleLogin =async(e) => {
       e.preventDefault();
      
        console.log(e.currentTarget);
        const form= new FormData(e.currentTarget);
        const email =form.get('email');
        const password =form.get('password');
        console.log(form.get("email"));
        const userResponse = await fetch(`https://diagnostic-server-site.vercel.app/user/email?email=${email}`);
        const userData = await userResponse.json();
        console.log(userData)
        if (userData?.length > 0) {
          const user = userData[0];
    
          // Check if the user is active
          if (user.status === 'active') {
            // Proceed with login
            signIn(email, password)
              .then((result) => {
                console.log(result.user);
                setError("")
                navigate(location?.state?.from || '/dashboard');
                //navigate(location?.state ? location.state : '/');
                // toast.success('Login successful!');
              })
              .catch((error) => {
                setError("Email or password does not match");
                //setError(error)
                // toast.error('Login failed. Please check your credentials.');
              });
          } else {
            // User is not active, show an error
            setError('Your account is not active. Please contact the administrator.');
          }
        } else {
          // User not found, show an error
          setError('User not found. Please check your credentials.');
        }
       //setError("")
    };

    return (
        <div>
            <div className="hero min-h-screen bg-[#e3f9f6] ">
                <div className="hero-content flex-col ">
                    <div className="text-center ">
                        <h1 className="text-xl md:text-2xl lg:text-5xl font-bold">Login now!</h1>
                        
                    </div>
                    <div className="card flex-shrink-0 w-60 md:w-full bg-[#e9edc9] max-w-sm shadow-2xl ">
                        <form  onSubmit={handleLogin}  className="card-body">
                            <p>{error}</p>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input  type="email" placeholder="email" className="input input-bordered" name='email'  required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"  placeholder="password" className="input input-bordered" name='password' />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6 p-0">
                                <button   className="btn btn-neutral">Login</button>
                            </div>
                            <label className="label">
                                <button onClick={handleGoogle} className="grid grid-cols-2  justify-items-center"> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path> 
                                </svg></button>
                                 <Link to="/registration" className="label-text-alt text-base link link-hover underline">Register</Link>
                            </label>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;