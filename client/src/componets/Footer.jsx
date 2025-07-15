import React from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/astrologoC.png"

import '../styles/footer.css'
 

export default function Footer () {
    return (
       <div className="container-fluid">
                <nav className="row p-5 pb-1 text-white">
                    <ul className="h5 col-xs-12 col-md-6 col-lg-3">
                         <Link to="/" >
                              <img src={logo}  alt="img logo"  height='150' />
                         </Link> 
                   </ul>
                   <ul className="col-xs-12 col-md-6 col-lg-3 list-unstyled">
                        <li className="h5 mb-2">Address</li>
                        <li className="">Austin, Texas 78701, EE. UU.</li>
                   </ul>
                   <ul  className="col-xs-12 col-md-6 col-lg-3 list-unstyled">
                        <li className="h5 mb-2">Contact</li>
                        <li className="mb-2">+1 345 678 999 923</li>
                        <li className="mb-2">astrogamer@gmail.com</li>
                   </ul>
                   <ul className="col-xs-12 col-md-6 col-lg-3 list-unstyled  ">
                        <li className="h5 mb-2">Social Media</li>
                        <li className="mb-1">
                           <Link to='/facebook' className="text-reset text-decoration-none" >
                           <i className="bi bi-facebook"> Facebook</i>
                            </Link> 
                         </li>
                         <li className="mb-1">
                           <Link to='/github' className="text-reset text-decoration-none">
                           <i className="bi bi-github "> GitHub</i>
                            </Link> 
                         </li>
                         <li className="mb-1">
                           <Link to='/instagram' className="text-reset text-decoration-none" >
                           <i className="bi bi-instagram"> Instagram</i>
                            </Link> 
                        </li>
                   </ul>
                    <div className="col-xs-12">
                    <p className="text-white text-center" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexWrap: 'wrap'}}>
  Copyright - All rights reserved © {new Date().getFullYear()}
  <span>|</span>
  Developed by <a href="https://github.com/miguelbel00" target="_blank" rel="noopener noreferrer" style={{color: 'white', textDecoration: 'underline', marginLeft: '5px'}}>Miguel Beltran</a>
</p>
                    </div>
                </nav>
            </div>

    )
}

