import React,{useContext, useState,useEffect} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import axios  from 'axios'
import useAuth from '../../CustomHooks/useAuth'
import AuthContext  from '../../contexts/AuthProvider'
import TWHImage from '../../assets/true.png'
import './../LoginPage/login.css'

const roleMap={
  admin: 'admin',
  salesman:'sales-man',
  installer:'installer',
  customer:'customer'
}

const LoginPage = () => {
    const navigate=useNavigate();
    const location = useLocation();
    const[userName, setUserName] =useState("");
    const[password,setPassword]=useState("");
    const[loginStatus,setLoginStatus]=useState(false);
    const[err,setErr]=useState("")
    const[role,setRole]=useState("");
    const {auth,setAuth}=useAuth();
    
    //* For Debugging value of Auth
    useEffect(() => {
      console.log("Auth state updated:", auth);
    }, [auth]);
    //* Handling Submit and Sending Request to Backend
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
        try{
            const response = await axios.post('http://localhost:8080/login',{
             "userName": userName,
            "userPassword":password           
    });
    if(response.data!=null){
        console.log(response.data)
        console.log(response.data.role)
        setRole(response.data.role)
        setLoginStatus(true)
        setUserName("")
        setPassword("")
        try{

          setAuth({role:response.data.role,userName:userName});
          
          const temp=response.data.role
          const path=roleMap[temp];
          const from=location.state?.from?.pathname || '/'+path
          navigate(from,{replace:true})

          // console.log(msg);
          console.log("Path"+path)
        }catch(e){
          console.error("Error while setting roles ")
        }
        // setAuth({role:role,userName:userName,password:password})
        console.log("UserName"+userName)
        console.log("Password"+password)
        // console.log(auth)

    }
    else
    {
         console.error("Incorrect Submission !!!")
        setErr("Error in Data Recieved")
    }
        }
        catch(err){
          if(!err?.response){
            setErr('no server response');
            console.error("no server response");
          }
          else {
            setErr('registeration failed')
            console.error("registeration failed");
        }
        }
    }
    // console.log(auth);
    // console.log(userName)
  return  (
    
    <>
        <section
        className="bg-image"
        style={{
          backgroundImage: "linear-gradient(#141e30 , #6dd5ed)",
          backgroundRepeat: "no-repeat",
          height: 931,
          backgroundSize: "cover"

        }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-1">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <center><img src={TWHImage} style={{ width: 350 }} alt="logo" /></center>
                      </div>


                      <form id="login-form" onSubmit={handleSubmit}>

                        <p>Please login to your account</p>
                        <label className="form-label" htmlFor="userName">
                          User Name
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="userName"
                            id="userName"
                            name="userName"
                            value={userName}
                            className="form-control"
                            placeholder="Username..."
                            onChange={(e) => setUserName(e.target.value)}

                          />
                        </div>
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            className="form-control"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}

                          />

                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            id="button"
                            className="btn btn-primary btn-block fa-lg back_color mb-3"
                            type="submit"
                            disabled={(!userName && !password ) ? true : false}
                          >
                            Login
                          </button>
                          <p className="d-flex align-items-center justify-content-left pb-4">
                            {" "}
                            <input id="lRemember" type="checkbox" /> Remember Me
                          </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <a className="text-muted" href="#">
                            Forgot password?
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center back_color">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-2">
                      <h4 className="mb-9">Welcome to True Hot Water,</h4>
                      <p className="med mb-0">
                        Our people, clients, and consultants matter to us more than
                        anything. We are driven by a culture of purpose, shared
                        values, and growth. See who we are and how we roll. It’s
                        pretty unique.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LoginPage
