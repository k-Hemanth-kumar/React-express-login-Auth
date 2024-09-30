export default function authToken(){
    const user=JSON.parse(localStorage.getItem('user'));
    if(user && user.accessToken){
        return {'x-access-token':'Bearer '+user.accessToken};
    }
    else{
        return {};
    }
}