import React,{useState} from 'react';
import { NavLink,useHistory } from 'react-router-dom';

function Signup() {
    const history=useHistory();
     const [user,setUser]=useState({
        name:"",email:"",phone:"",work:"",password:"",cpassword:""
     });
     let name,value;
     const handleClick=(e)=>{
          name=e.target.name;
          value=e.target.value;
          setUser({...user,[name]:value});
     };
     const postData= async (e)=>{
              e.preventDefault();
              const {name,email,phone,work,password,cpassword}=user;
              try{
                const res=await fetch("http://localhost:5000/register",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        name,email,phone,work,password,cpassword
                    })
                });
                const data=await res.json();
                if(res.status===422 ||data.status===500 ||  !data) {
                    window.alert("Invalid Registration");
                    console.log("Invalid Registration");
                }
                else {
                  window.alert("Registration Succesfull ");
                  console.log("Registration Succesfull ");
                  console.log(data);
                  history.push("/login");
                }
              }
              catch(error) {
                  console.log(error);
              }
            
     }

    return (
        <>
            <div class="signup-form">
                <form action="/examples/actions/confirmation.php" method="POST" />
                <h2>Sign Up</h2>
                <p>Please fill in this form to create an account!</p>
                <hr />
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <span class="fa fa-user"></span>
                            </span>
                        </div>
                        <input type="text" class="form-control" name="name" placeholder="Username" required="required"
                        value={user.name}
                        onChange={handleClick}
                         />
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="fa fa-paper-plane"></i>
                            </span>
                        </div>
                        <input type="email" class="form-control" name="email" placeholder="Email Address" required="required" 
                             value={user.email}
                        onChange={handleClick}
                        />
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                            <i class="fa fa-phone"></i>
                            </span>
                        </div>
                        <input type="number" class="form-control" name="phone" placeholder="Phone Number" required="required" 
                             value={user.phone}
                        onChange={handleClick}

                        />
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                            <i class="fa fa-briefcase"></i>
                            </span>
                        </div>
                        <input type="text" class="form-control" name="work" placeholder="Your Profession" required="required" 
                            value={user.work}
                        onChange={handleClick}
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
                        <input type="text" class="form-control" name="password" placeholder="Password" required="required" 
                            value={user.password}
                        onChange={handleClick}
                        />
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="fa fa-lock"></i>
                                <i class="fa fa-check"></i>
                            </span>
                        </div>
                        <input type="text" class="form-control" name="cpassword" placeholder="Confirm Password" required="required" 
                            value={user.cpassword}
                        onChange={handleClick}
                        />
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-check-label"><input type="checkbox" required="required" /> I accept the <NavLink to="/login">Terms of Use</NavLink> &amp; <NavLink to="/login">Privacy Policy</NavLink></label>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-lg" onClick={postData}>Sign Up</button>
                </div>

                <div class="text-center">Already have an account? <NavLink to="/login">Login here</NavLink></div>

            </div>

        </>
    )
}

export default Signup
