import React,{useEffect,useContext} from 'react'
import { useHistory } from 'react-router-dom'
import {UserContext} from "../App";
const Logout = () => {
    const {state,dispatch} = useContext(UserContext);
    const history=useHistory();
    useEffect(()=>{
        fetch('http://localhost:5000/logout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>{
            dispatch({type:"USER",payload:false})
           history.push("/login");
           if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
          }
        }).catch((err)=>{
           console.log(err);
        })
    });
    return (
        <div>
            <h1>welcome to logout page</h1>
        </div>
    )
}

export default Logout
