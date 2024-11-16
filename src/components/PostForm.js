import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const PostForm = ({ addNewPost, updatePost, postToEdit, setPostToEdit }) => { 
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      if (postToEdit) {
        setTitle(postToEdit.title || '');
        setContent(postToEdit.content || '');
        setImage(null); // reset the image since it was previously uploaded
      }
    }, [postToEdit]);

    const handleImageChange=(e)=>{
      setImage(e.target.files[0])
    };

    const handlePostForm =(e)=> {
        e.preventDefault();
        if(title && content){
            const updatedPost = {
              ...postToEdit,
              title: title,
              content: content,
              imageUrl: image ? URL.createObjectURL(image) : postToEdit?.imageUrl,
            }
              //console.log(updatePost)
              if(postToEdit){
                updatePost(updatedPost)
                setPostToEdit(null)
              }else{
                addNewPost({ ...updatedPost, id: Date.now() }); // Add mode
                setSaved(true)
              }
              setTitle('');
              setContent('');
              setImage(null);
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
            <h1>{postToEdit ? 'Edit Post' : 'add a new post'}</h1>
            <p>
                <label htmlFor="form-title">Title:</label><br />
                <input 
                    type="text"
                    id="form-title" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                />
            </p>
            <p>
                <label htmlFor="form-content">Content:</label><br />
                <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
      />
            </p>
            <p>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            </p>
            <p>
            <button type="submit">{postToEdit ? 'Update Post' : 'Add Post'}</button>
            {postToEdit && <button onClick={() => setPostToEdit(null)}>Cancel</button>}
            </p>
        </form>
    )

}

export default PostForm;