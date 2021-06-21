import React,{useEffect,useState,useContext} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from "../helpers/AuthContext"

function Post() {
  let history = useHistory();
    let {id} = useParams()
    const [postObject,setPostObject] = useState({});
    const [comments,setComments] = useState([]);
    const [newComment,setNewComments] = useState("");
    const {authState} = useContext(AuthContext);
useEffect(()=>{
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response)=>{
        setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response)=>{
        setComments(response.data);
    });

},[id]);

const addComment = () => {

    axios.post(`http://localhost:3001/comments`,{commentBody:newComment ,postId :id},{headers:{accessToken:localStorage.getItem("accessToken")}}).then((response)=>{
        if(response.data.error)
        {
            alert("You need to log in to add comment")
            setNewComments("");
        }    
        else{
            const commentToAdd = {commentBody: newComment,username : response.data.username};
            setComments([...comments,commentToAdd])
            setNewComments("");
        }    
    
    });
};

const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  const deletePost = (id) => {
    axios.delete(`http://localhost:3001/posts/${id}`,{headers: { accessToken: localStorage.getItem("accessToken")},}).then(()=>{
      alert("Post Deleted");
      history.push("/")
    })

  }
const editPost = (option) =>{
  if(option === "title")
  {
    let newTitle = prompt("Enter the new Title: ")
    axios.put("http://localhost:3001/posts/title",{newtitle:newTitle,id:id},{headers: { accessToken: localStorage.getItem("accessToken")},})
    setPostObject({...postObject,title:newTitle})
  }
  else
  {
    let newPostText = prompt("Enter the new Text: ")
    axios.put("http://localhost:3001/posts/postText",{newText:newPostText,id:id},{headers: { accessToken: localStorage.getItem("accessToken")},})
    setPostObject({...postObject,postText:newPostText})
  } 
}
    return (
        <div className="postPage">
            <div className="leftSide">
                <div className = "post" id = "individual">
                    <div className="title" onClick={() => {if(authState.username === postObject.username)editPost("title")}}> {postObject.title}</div>
                    <div className="body" onClick={() => {if(authState.username === postObject.username)editPost("body")}}> {postObject.postText}</div>
                    <div className="footer"> {postObject.username} {authState.username === postObject.username && <button onClick={()=> {deletePost(postObject.id)}}>Delete Post</button>}</div>
                </div>    
            </div>    
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input type="text" placeholder="Comment..." autoComplete="off" onChange={(event)=>{setNewComments(event.target.value)}} value={newComment}  />  (// catch value directly from input and set themm into state)
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label> Username: {comment.username}</label>
                {authState.username === comment.username && (
                  <button
                    onClick={() => {deleteComment(comment.id);}}> X </button>
                )}
              </div>
            );
          })}
        </div>
            </div>

        </div>
    )
}

export default Post       
