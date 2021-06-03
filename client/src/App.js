import './App.css';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'
import home from "./pages/home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";

function App() {
  return (
    <div className="App">
    <Router>
    <div className="navbar">
      <Link to="createpost">Create a Post</Link>
      <Link to="/">Home</Link>
      </div> 
      <Switch>
        <Route path ="/" exact component={home}/>
        <Route path ="/createpost" exact component={CreatePost}/>
        <Route path ="/post/:id" exact component={Post}/>   (// to rendering "Post" component imported from "./pages/Post")
      </Switch>
    </Router>
    </div>
  );
}

export default App;
