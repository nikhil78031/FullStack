import React,{useState} from 'react'
import axios from 'axios'
function ChangePassword() {

    const [oldPassword,setoldPassword] = useState("");
    const [newPassword,setnewPassword] = useState("");

    const changePassword = () =>{
        axios.put("http://localhost:3001/auth/changepassword", {oldPassword:oldPassword,newPassword:newPassword},{headers:{accessToken:localStorage.getItem("accessToken")},})
        .then((response)=>{
            if(response.data.error)
                alert(response.data.error)
            else
                alert(response.data);    

        })
    }
    return (
        <div>
            <h1>change password</h1>
            <input type="password" placeholder="Old password" onChange={(event) =>{setoldPassword(event.target.value)}}></input>
            <input type="password" placeholder="New password" onChange={(event) =>{setnewPassword(event.target.value)}} ></input>
            <button onClick={changePassword}>Change password</button>
        </div>
    )
} 

export default ChangePassword
