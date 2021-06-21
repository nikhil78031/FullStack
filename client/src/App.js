import './App.css';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'
import home from "./pages/home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import ChangePassword from "./pages/ChangePassword"
import {AuthContext} from "./helpers/AuthContext";
import {useState,useEffect} from 'react';
import axios from 'axios'
function App() {
  const [authState , setAuthState] = useState({username :"",id : 0,status:false});

  useEffect(()=>{
    if(localStorage.getItem("accessToken"))
    {
      axios.get("http://localhost:3001/auth/auth",{headers:{accessToken:localStorage.getItem("accessToken")}}).then((response)=>{
        if(response.data.error)
          setAuthState({...authState,status:false});
        else
        {setAuthState({username :response.data.username,id : response.data.id,status:true});
         
       } 
      })
      
    }
  },[]);

    const logout=() =>{
      setAuthState({username :"",id : 0,status:false});
        localStorage.removeItem("accessToken");
        
    }

  return (
    <div className="App">
    <AuthContext.Provider value={{authState,setAuthState}}>
        <Router>
      <div className="navbar">
      
        {!authState.status  ? (
          <> <Link to="/login">Login</Link>
        <Link to="/registration">Registration</Link></>
        ):(
          <>
          <Link to="/">Home</Link>
        <Link to="/createpost">Create a Post</Link>
        </>
        )}
        <div className="loggedInContainer">
        <h2>{authState.username}</h2>
        <>
        {authState.status && <button onClick={logout}> Logout</button>}</>
        </div>
        </div> 
        <Switch>
          <Route path ="/" exact component={home}/>
          <Route path ="/createpost" exact component={CreatePost}/>
          <Route path ="/post/:id" exact component={Post}/>   (// to rendering "Post" component imported from "./pages/Post")
          <Route path ="/login" exact component={Login}/>
          <Route path ="/registration" exact component={Registration}/>
          <Route path ="/profile/:id" exact component={Profile}/>
          <Route path ="/changepassword" exact component={ChangePassword}/>
          <Route path="*" exact component={PageNotFound} />
        </Switch>
      </Router>
      </AuthContext.Provider>  
    </div>
  );
}

export default App;
