import React, { useState } from "react";
import { redirect } from "react-router-dom";
import { Quill } from "react-quill";

const PostForm = (props)=>{
    const [title, setTitle] = useState('');
    const [content, setcontent] = useState('')

    return(
        <form className="container">
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
                <Quill 
                    onChange={(content, delta, source, editor) => {
                        setcontent(editor.getContents());
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