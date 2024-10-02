///import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getContent } from "../services/userService";
export default function Home(){
    const [content,setContent]=useState("");

    useEffect(()=>{
        getContent('all').then((res)=>{
            setContent(res.data);
        }).catch((error)=>{
            const data=error.response||error.response.data||error.message||error.toString();
            setContent(data)
        })
    },[]);
    return(
        <div className="container">
            <div className="jumbotron">
                {''}
            </div>
        </div>
    )
}