import React,{useState,useContext} from 'react'
import { NavLink,useHistory } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
import {UserContext} from "../App";
function Login() {
    const {state,dispatch} = useContext(UserContext);


    axios.defaults.withCredentials = true;
    const history=useHistory();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const loginUser= async (e)=>{
        e.preventDefault();
        try{
          const res=await fetch("http://localhost:5000/signin",{
              method:"POST",
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify({
                  email,password
              })
          });
          const data=await res.json();
          console.log(data);
          if(res.status===200 ) {
            Cookies.set("jwt",data.userLogin);
            dispatch({type:"USER",payload:true})
            window.alert("login Succesfull ");
            console.log("login Succesfull");

           history.push("/");
             
          }
          else {
            window.alert("Invalid credentials");
            console.log("Invalid credentials");
          }
        }
        catch(error) {
            console.log(error);
        }
      
}

/*
const loginUser = () => {
    axios
        .post('hoshttp://localt:5000/signin', {
            email,password,
            withCredentials: true
        })
        .then(function(res) {
            console.log(res.data);
            window.location.reload();
            history.push("/");
        })
        .catch(function(error) {
            console.log(error);
        });
};*/

    return (
        <>
       <div class="login-form">
    <form action="/examples/actions/confirmation.php" method="POST">
        <h2 class="text-center">Log in</h2>   
        <div class="form-group">
        	<div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <span class="fa fa-user"></span>
                    </span>                    
                </div>
                <input type="text" class="form-control" name="email" placeholder="Username" required="required"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />				
            </div>
        </div>
		<div class="form-group">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <i class="fa fa-lock"></i>
                    </span>                    
                </div>
                <input type="password" class="form-control" name="password" placeholder="Password" required="required"
                     value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />				
            </div>
        </div>        
        <div class="form-group">
            <button type="submit" class="btn btn-primary login-btn btn-block" onClick={loginUser}>Log in</button>
        </div>
        <div class="clearfix">
            <label class="float-left form-check-label"><input type="checkbox"/> Remember me</label>
            <NavLink to="#" class="float-right">Forgot Password?</NavLink>
        </div>
		<div class="or-seperator"><i>or</i></div>
        <p class="text-center">Login with your social media account</p>
        <div class="text-center social-btn">
            <NavLink to="/" class="btn btn-secondary"><i class="fa fa-facebook"></i>&nbsp; Facebook</NavLink>
            <NavLink to="/" class="btn btn-info"><i class="fa fa-twitter"></i>&nbsp; Twitter</NavLink>
			<NavLink to="/" class="btn btn-danger"><i class="fa fa-google"></i>&nbsp; Google</NavLink>
        </div>
    </form>
    <p class="text-center text-muted small">Don't have an account? <NavLink to="/signup">Sign up here!</NavLink></p>
</div>
        </>
    )
}

export default Login
