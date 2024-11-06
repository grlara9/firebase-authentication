import Root from './components/Root';
import Header from './components/Header';
import Posts from './components/Posts';
import Post from './components/Post';
import PostForm from './components/PostForm';

import NotFound from './components/NotFound';
/*import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes,
} from "react-router-dom";*/
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useParams } from 'react-router-dom';
import './App.css';
import { useState } from 'react';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      slug: 'Hello-React',
      title: 'Hello React',
      content: "The error you're seeing is because npm cannot locate a package.json file in your project directory (C:\Users\ROBERTO\Documents\code__projects). The package.json file is necessary for npm to know what scripts to run and which dependencies to load."
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
  const [message, setMessage] = useState(null)
  
  
  const setFlashMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null);
    }, 1600)
  }

  const addNewPost =(post) =>{
    post.id = posts.length + 1;
    post.slug = encodeURIComponent(
      post.title.toLowerCase().split(" ").join("-")
    );
    setPosts([...posts, post])
    setFlashMessage(`saved`)
  }



  const router = createBrowserRouter( createRoutesFromElements(
    <Route path="/" element={ <Root  message={message}/> }>
      
      <Route index element={<Posts posts={posts}/>} />
      <Route path='/new' element={<PostForm addNewPost={addNewPost}/>} />
      <Route path='/post/:postSlug' element={<PostWithParams posts={posts}/>}/>
      <Route path='*' element={<NotFound />} />

    </Route>
  ))

  function PostWithParams({posts}){
    const { postSlug } = useParams();
    const post = posts.find((post) => post.slug === postSlug);
    //if no posts match the slug accessed, updated the post route to return NotFound
    return post ? <Post post={post} /> : <NotFound />
   
  }

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
