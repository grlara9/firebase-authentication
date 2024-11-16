import React from "react";


const Post = ({ post }) => {
   

    

    return (
        <article className="post container">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
        </article>
    );
};

export default Post;