import React from 'react';
import {NavLink} from "react-router-dom";
const Errorpage = () => {
    return (
        <>
          <div  >
                <div className="notfound">
                        <div >
                              <h1>404</h1>
                        </div>
                        <h2>we are sorry,page not found!</h2>
                        <p >The page you are Looking for mignt have been removed</p>
                        <NavLink to="/">Back to HomePage</NavLink>
                </div>
          </div>

        </>
    )
}

export default Errorpage
