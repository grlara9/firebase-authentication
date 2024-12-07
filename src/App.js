import React, {  useState } from 'react'
import UserContext from './context/UserContext';
import Root from './components/Root';
import Posts from './components/Posts';
import Post from './components/Post';
import PostForm from './components/PostForm';
import NotFound from './components/NotFound';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate, useParams} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut  } from "firebase/auth";
import { auth, googleProvider } from './firebase';
function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      slug: 'Hello-React',
      title: 'Hello React',
      content: "The error you're seeing is because npm cannot locate a package.json file in your project directory The package.json file is necessary for npm to know what scripts to run and which dependencies to load."
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
    post.slug = getNewSlugFromTitle(post.title)
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

  const onRegister = async(email, password) => {
    try{
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registered user:", result.user);

      setUser({
        email: result.user.email,
        isAuthenticated: true,
      })
    }catch(error){
      console.error("Registration failed:", error.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // The signed-in user's info can be retrieved from result.user
      console.log("User Info:", result.user);
      setUser({
        email: result.user.email,
        isAuthenticated: true,
      });
  } catch (error) {
      console.error("Error during Google Sign-In:", error.message);
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

      <Route path="/register" element={ !user.isAuthenticated ? <Register /> : <Navigate to="/" replace /> } />
      <Route path='*' element={<NotFound />} />
    </Route>
  ))

  return (
    <UserContext.Provider value={{user, onLogin, onRegister, onLogout, handleGoogleSignIn}}>
      <RouterProvider router={router}/>
    </UserContext.Provider>
  );
}

export default App;
