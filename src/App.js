import React, {  useState } from 'react'
import UserContext from './context/UserContext';
import Root from './components/Root';
import Posts from './components/Posts';
import Post from './components/Post';
import PostForm from './components/PostForm';
import NotFound from './components/NotFound';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate, useParams} from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import { signOut } from "firebase/auth";
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      slug: 'Hello-React',
      title: 'Hello React',
      content: "The error you're seeing is because npm cannot locate a package.json file in your project directory The package.json file is necessary for npm to know what scripts to run and which dependencies to load."
    },
    {
      id: 2,
      slug: 'Second-posts', 
      title: 'Second posts',
      content: "Simple SDK Integration: The Firebase SDK makes it easy to connect to your React app and provides simple methods for signing in, signing up, and managing user sessions."
    },
    {
      id: 3,
      slug: 'Third-post',
      title: 'Third post',
      content: "Set up a login and register form and use Firebase’s signInWithEmailAndPassword and createUserWithEmailAndPassword methods."
    },
  ])
  const [postToEdit, setPostToEdit] = useState(null)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState({})


  const setFlashMessage = (message) => {
    
    setMessage(message)
    setTimeout(() => {
      setMessage(null);
    }, 1600)
    
  }

  const getNewSlugFromTitle = (title) => {

    return encodeURIComponent(title.toLowerCase().split(" ").join("-"))
  }

  const addNewPost =(post) =>{
    
    post.id = posts.length + 1;
    post.slug = encodeURIComponent(
    post.title.toLowerCase().split(" ").join("-")
    );
    setPosts([...posts, post])
    setFlashMessage(`saved`)
    
  }

  const handleEdit = (post) =>{
    
    setPostToEdit(post);
    
  }
  

  const updatePost = (post)=>{
    
    post.slug = getNewSlugFromTitle(post.title);
    const index = posts.findIndex((p) => p.id === post.id);
    const oldPosts = posts.slice(0, index).concat(posts.slice(index + 1));
    const updatedPosts = [...oldPosts, post].sort((a, b) => a.id - b.id);
    setPosts(updatedPosts);
    setFlashMessage(`updated`);
    
  }

  

  const deletePost = (post) => {
    
    const confirmDelete = window.confirm('Delete this post?');
    if(!confirmDelete) return;
    const updatedPosts = posts.filter((p) => p.id !== post.id);
      setPosts(updatedPosts);
      setFlashMessage(`deleted`);
      
  }
  const onLogin = async(email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in as:", response.user);
  
      // Update UserContext
      setUser({
        email: response.user.email,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const onLogout = async() => {
    try {
      await signOut(auth);
      setUser({ 
        isAuthenticated: false 
      });
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  function PostWithParams({posts}){
    
      const { postSlug } = useParams();
      const post = posts.find((post) => post.slug === postSlug);
      //if no posts match the slug accessed, updated the post route to return NotFound
      return post ? <Post post={post} /> : <NotFound />
    } 
  
    function EditWithParams({posts}){
      const { postSlug } = useParams();
      const post = posts.find((post) => post.slug === postSlug);
        if(!post){
          return <NotFound />
        }
      
      //if no posts match the slug accessed, updated the post route to return NotFound
      return post ? <PostForm post={post} 
      updatePost={updatePost} postToEdit={post} setPostToEdit={() => {}}/> :  null;
    }

  

  const router = createBrowserRouter( createRoutesFromElements(
    <Route path="/" element={ <Root  message={message}/> }>
      <Route 
      index element={
        
          <Posts posts={posts} handleEdit={handleEdit} deletePost={deletePost}/>
       
      }
      />

      <Route 
      path='/new' 
      element={
        user.isAuthenticated ? (
          <PostForm 
            addNewPost={addNewPost}  
            updatePost={updatePost} 
            postToEdit={null} 
            setPostToEdit={setPostToEdit}  
          /> 
        ):(
          <Navigate to='/login' replace />
        )
       } 
      />
      <Route 
        path='/post/:postSlug' 
        element={
          
            <PostWithParams posts={posts} /> 
          } 
      />
      <Route 
        path='/edit/:postSlug' 
        element={
          user.isAuthenticated ? (
              <EditWithParams posts={posts} updatePost={updatePost}/> 
          ):(
            <Navigate to="/login" replace />
          )
          } 
      />
      
      <Route path='/login' 
          element={ 
            !user.isAuthenticated ? <Login /> : <Navigate to="/" replace />
        } 
      />
      
      <Route path='*' element={<NotFound />} />
    </Route>
  ))

  return (
    <UserContext.Provider value={{user, onLogin, onLogout}}>
      <RouterProvider router={router}/>
    </UserContext.Provider>
  );
}

export default App;
