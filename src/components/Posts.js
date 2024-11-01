import React from 'react';
import { Link } from 'react-router-dom';

const Posts = ({posts}) => (
    
        <article className='posts container'>
            <h1>Posts</h1>
            <ul>
             {posts.length < 0 && 
             <li key="empty">No Posts Available!</li>
            }  
            {
                posts.map(post => (
                    <li key={post.id}>
                        <h2>
                            <Link to={`/post/${post.slug}`}>{post.title}</Link>
                        </h2>
                    </li>
                ))
            }
            </ul>
        </article>
    )


export default Posts;