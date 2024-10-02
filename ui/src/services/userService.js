import axios from "axios";
const API_URL = "http://localhost:5000/api/test/";

const getContent=(query)=>{
    try {
        return axios.get(`${API_URL+query}`);
        
    } catch (error) {
        console.log(error)
    }
}
const getUserContent=async()=>{
    try {
        const res=await axios.get(`${API_URL}user`);
        return res;
        
    } catch (error) {
        console.log(error);
        return;
    }
}
const getAdminContent=async()=>{
    try {
        const res=await axios.get(`${API_URL}admin`);
        return res;
    } catch (error) {
        console.log(error);
        return;
    }
}

const getModeratorContent=async()=>{
    try {
        const res=await axios.get(`${API_URL}mod`);
        return res;
    } catch (error) {
        console.log(error);
        return;
    }
}
export {getContent};

