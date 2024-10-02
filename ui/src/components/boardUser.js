///import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getContent } from "../services/userService";
export default function BoardUser(){
    const [content,setContent]=useState("");

    useEffect(()=>{
        getContent('user').then((res)=>{
            setContent(res.data);
        }).catch((error)=>{
            const data=(error.response&&error.response.data&&error.response.data.message)||error.message||error.toString();
            setContent(data)
        })
    },[]);
    return(
        <div className="container">
            <div className="jumbotron">
                {content}
            </div>
        </div>
    )
}