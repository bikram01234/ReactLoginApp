import React, { useState,useEffect } from 'react'
import Cookies from 'js-cookie';

function Home() {

    const [UserName,setUserName]=useState('');
    const [show,setShow]=useState(false);
    const userHomePage = async () => {
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
          setUserName(data.name);
          setShow(true);
          
         
        } catch (err) {
          console.log(err);
        }
      };
    
      useEffect(() => {
          userHomePage();
      },[]);

    return (
     <>
       <div class="bgimg">
        <div class="middle bgimg">
            <p>WELCOME {UserName}</p>
            <h1>{show?"Hope to See You Back":"It is a Home Page"}</h1>
        </div>
        </div>
       </>
    )
}

export default Home
