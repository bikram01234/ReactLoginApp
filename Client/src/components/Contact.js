import React,{useEffect,useState} from 'react';
import Cookies from 'js-cookie';

function Contact() {

    const [userData, setUserData] = useState({name:"",email:"",message:""});
  
  
    const userContact = async () => {
      try {
        const jwt=Cookies.get('jwt');
        const res = await fetch("http://localhost:5000/getdata", {
          method: "GET",
          headers: {
            "Authorization":"Bearer " +jwt,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        setUserData({...userData,name:data.name,email:data.email});
        
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
        userContact();
    },[]);

     const handleInputs=(e)=>{
         const name=e.target.name;
         const value=e.target.value;
         setUserData({...userData,[name]:value});
     }
   
     const contactFormSub=async (e)=>{
        e.preventDefault();
        try{
          const  {name,email,message}=userData;
          const jwt=Cookies.get('jwt');
          const res=await fetch("http://localhost:5000/contact",{
            method:"POST",
            headers:{
              "Authorization":"Bearer " +jwt,
              "Content-Type":"application/json"
            },

            body:JSON.stringify({
              name,email,message,jwt
          })
          });
  
          const data =await res.json();
          console.log(data);
          if(data) {
            alert('Message sent');
            setUserData({...userData,message:""});
          }
          else {
            console.log('Message Not Sent');
          }
        } catch(error){
          console.log(error);
        }
      

     }

    return (
        <>
            <form id="contact-form"  method="POST">
    <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" name="name" value={userData.name} onChange={handleInputs}/>
    </div>
    <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" aria-describedby="emailHelp" name="email" value={userData.email} onChange={handleInputs}/>
    </div>
    <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea className="form-control" rows="5" name="message" value={userData.message} onChange={handleInputs}></textarea>
    </div>
    <button type="submit" className="btn btn-primary" onClick={contactFormSub}>Submit</button>
</form>
        </>
    )
}

export default Contact
