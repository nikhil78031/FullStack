import React from 'react'
import axios from "axios";
import {useHistory} from 'react-router-dom'
import {useEffect,useState} from 'react';
function Home() {
    const [listofposts,setlistofposts] = useState([]);
let history = useHistory();

useEffect(()=>{
  axios.get("http://localhost:3001/posts").then((response)=>{
      setlistofposts(response.data);
  })
},[])



    return (
        <div>
            { listofposts.map((value,key)=>{
       return <div key={key} className="post" onClick={() => {history.push(`/post/${value.id}`)}}>
       <div className="title">   {value.title}   </div>
       <div className="body" >   {value.postText}   </div>
       <div className="footer" > {value.username}   </div>
       </div> 
    })}  
        </div>
    )
}

export default Home;
