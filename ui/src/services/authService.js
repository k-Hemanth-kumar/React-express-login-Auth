import Axios from "axios";
const API_URL = 'http://localhost:5000/auth/';

const LoginAuth = async (username, password,redirect) => {
    try {
        const url = new URL(`${API_URL}login`);
        url.searchParams.append('redirect', redirect);
        url.searchParams.append('name', username); // Add name parameter
        url.searchParams.append('username', username);
        let res = await Axios({
          method: 'post',
          url: url,
          data: JSON.stringify({username,password}),
          headers:{
            'Content-Type':'application/json',
          }
        });
      
        return res.data;
    } catch (error) {
        if (error.response) {
            // Server responded with a status outside the range of 2xx
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else if (error.request) {
            // No response was received from the server
            console.error('Error request:', error.request);
        } else {
            // Something happened while setting up the request
            console.error('Error message:', error.message);
        }
        console.error('Config:', error.config);
        return error.response;
    }
};

const registerAuth=async (credentials)=>{
    try{
        const res=await Axios({
            method:"post",
            url:`${API_URL}signup`,
            data:JSON.stringify(credentials)
        });
        if(res.data.accessToken){
            localStorage.setItem('user',JSON.stringify(res.data));
        }
        return res.data;
    }
    catch(error){
        if (error.response) {
            // Server responded with a status outside the range of 2xx
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else if (error.request) {
            // No response was received from the server
            console.error('Error request:', error.request);
        } else {
            // Something happened while setting up the request
            console.error('Error message:', error.message);
        }
        console.error('Config:', error.config);
        return error.response;
    }
}
const logOutAuth=()=>{
    localStorage.removeItem('user');
}

const getCurrentUser=()=>{
    return JSON.parse(localStorage.getItem('user'))
}
export { LoginAuth ,registerAuth,logOutAuth,getCurrentUser};
