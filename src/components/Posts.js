import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Posts = ({posts, handleEdit, deletePost}) => {

    const {user} =useContext(UserContext);

    return (
        <article className='posts container'>
            <h1>Posts</h1>
            <ul>
             {posts.length === 0 && 
             <li key="empty">No Posts Available!</li>
            }  
            {
                posts.map(post => (
                    <li key={post.id}>
                        <h2>
                            <Link to={`/post/${post.slug}`}>{post.title}</Link>
                        </h2>
                        {user.isAuthenticated && (
                        <p>
                            <Link to={`/edit/${post.slug}`}
                            onClick={()=> handleEdit(post)}
                            >Edit</Link>
                            {" | "}
                            <button className='linkLike' onClick={()=> deletePost(post)}>Delete</button>
                        </p>
                        )}
                    </li>
                ))
            }
            </ul>
        </article>
    )}


export default Posts;