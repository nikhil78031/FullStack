import React ,{useContext}from 'react'
import axios from "axios";
import {useHistory,Link} from 'react-router-dom'
import {useEffect,useState} from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import {AuthContext} from "../helpers/AuthContext"
//import { post } from '../../../server/routes/Likes';
function Home() {
    const [listofposts,setlistofposts] = useState([]);
    const [likedposts,setlikedposts] = useState([]);
    const {authState} = useContext(AuthContext);
let history = useHistory();

useEffect(()=>{
    if(!localStorage.getItem("accessToken"))
    {
        history.push("/login");
    }
    else
    {
        axios.get("http://localhost:3001/posts",{headers:{accessToken:localStorage.getItem("accessToken")}}).then((response)=>{
      setlistofposts(response.data.listofposts);
      listofposts.sort();
      listofposts.reverse();
      setlikedposts(
          response.data.likedposts.map((like) =>{
              return like.postId;
          })
      );
      
  })
}
    }
  ,[])

const likeAPost = (postId) => {
    axios.post("http://localhost:3001/likes",{postId:postId},{headers:{accessToken:localStorage.getItem("accessToken")}}).then((response)=>{
        
        setlistofposts(listofposts.map((post) => {
            if(post.id === postId)
            {
                if(response.data.liked)
                {
                    return {...post,Likes:[...post.Likes,0]};
                }
                else 
                {const likeArray = post.Likes;
                    likeArray.pop();
                    return {...post,Likes:likeArray};
                }   
            }
            else
            {
                return post;
            }
        }));

        if(likedposts.includes(postId))
        {
            setlikedposts(likedposts.filter((id)=>{
                return id!= postId
            }))
        }
        else
        {
            setlikedposts([...likedposts,postId]);
        }
    })

}

    return (
        <div>
            { 
                listofposts.slice(0).reverse().map((value,key)=>{
       return <div key={key} className="post" >
       <div className="title">   {value.title}   </div>
       <div className="body" onClick={() => {history.push(`/post/${value.id}`)}}>   {value.postText}   </div>
       <div className="footer" > 
       <div className="username">
            <Link to={`/profile/${value.UserId}`}>
            {value.username}
            </Link>
       </div> 
       <div className="buttons">  
       <ThumbUpAltIcon onClick={() => likeAPost(value.id)} 
        className={likedposts.includes(value.id) ? "unlikeBttn" : "likeBttn" }
       
       ></ThumbUpAltIcon>
       <label>{value.Likes.length}</label></div></div>
       </div> 
    })}  
        </div>
    )
}

export default Home;
