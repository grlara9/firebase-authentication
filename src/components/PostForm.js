import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Quill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const PostForm = ({ post:propsPost, addNewPost, updatePost }) => { 
    const [post, setPost] = useState({ ...propsPost });
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

  const prevPostRef = useRef();
  useEffect(() => {
    prevPostRef.current = post;
  }, [post]);
  const prevPost = prevPostRef.current;

  const quillRef = React.useRef();
  useEffect(() => {
    if (prevPost && quillRef.current) {
      if (propsPost.id !== prevPost.id) {
        setPost({ ...propsPost });
        quillRef.current.getEditor().setContents(``);
      }
    }
  }, [prevPost, propsPost]);

    const handlePostForm =(e)=> {
        e.preventDefault();
        if(post.title){
            if (updatePost) {
                updatePost(post);
              } else {
                addNewPost(post);
              }
              setSaved(true);
            } else {
              alert("Title required");
            }
    }
    /*
    The navigate() function should not be called directly inside the return statement 
    because it is not meant to be rendered as part of the JSX. It should be called conditionally 
    or after an action within a useEffect or after a state update.
    */
     useEffect(()=>{
        if(saved){
            navigate('/')
        }
     }, [saved, navigate]) // The effect re-runs whenever 'saved' or 'navigate' changes
     /*
        Empty Array []: If you pass an empty array, useEffect runs only once when the component mounts and never again.
        No Dependency Array: Without a dependency array, useEffect runs after every render, which can lead to performance issues or unwanted behavior.
     */

    return(
        <form className="container" onSubmit={handlePostForm}>
            <h1>add a new post</h1>
            <p>
                <label htmlFor="form-title">Title:</label><br />
                <input 
                    defautValue={post.title}
                    id="form-title" 
                    value={post.title} 
                    onChange={e => setPost({...post, title: e.target.value})} 
                />
            </p>
            <p>
                <label htmlFor="form-content">Content:</label><br />
                <Quill
                ref={quillRef}
                defaultValue={post.content}
                onChange={(content, delta, source, editor) => {
                setPost({...post, content: editor.getContents(),
          });
        }}
      />
            </p>
            <p>
                <button type="submit">Save</button>
            </p>
        </form>
    )

}

export default PostForm;