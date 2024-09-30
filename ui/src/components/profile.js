import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import {Navigate} from "react-router-dom";
export default function Profile(){
    const [userInfo,setUserInfo]=useState({redirect:null,userReady:false,currentUser:{}});

    useEffect(()=>{
        const Currentuser=getCurrentUser();
        setUserInfo((user)=>({...user,userReady:true,currentUser:Currentuser}));
    },[]);

    if(userInfo.redirect){
        return <Navigate to={userInfo.redirect}/>
    }
    return(
        <div className="container">
            {userInfo.userReady?(
                <div className="bg-light shadow-3">
                    <header className="jumbotron">
                        <h3><strong>{userInfo.currentUser}</strong> Profile</h3>
                    </header>
                    <p>
                        <strong>Token: </strong>
                        {userInfo.currentUser.accessToken.substring(0,20)} ... {" "}
                        {userInfo.currentUser.accessToken.substring(userInfo.currentUser.accessToken.length-20)}
                    </p>
                    <p>
                        <strong>Email Id:</strong>
                        {userInfo.email}
                    </p>
                    <p>
                        <strong>Authorities:</strong>
                        {userInfo.currentUser.roles && userInfo.currentUser.roles.map((role,index)=>{
                            return <li key={index}>{role}</li>
                        })}
                    </p>
                </div>
            ):("")}
        </div>
    )
}