import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const PostForm = ({ addNewPost }) => { 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

    const handlePostForm =(e)=> {
        e.preventDefault();
        if(title){
            const post = 
            {
                title: title,
                content: content
            }
            addNewPost(post)
            console.log(post)
            setSaved(true)
           
        }
        else{
            alert("Title Required")
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
                    id="form-title" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                />
            </p>
            <p>
                <label htmlFor="form-content">Content:</label><br />
                <ReactQuill 
                    /*
                    onChange={(content, delta, source, editor) => {
                        setcontent(editor.getContents());
                    }}
                    */
                    value={content}
                    onChange={(value) => setContent(value)} 
                />
            </p>
            <p>
                <button type="submit">Save</button>
            </p>
        </form>
    )

}

export default PostForm;