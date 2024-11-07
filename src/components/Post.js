import React from "react";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

const Post = ({ post }) => {
    // Check if post content is defined and contains ops
    if (!post || !post.content ) {
        return <p>Content not available</p>; // Fallback message
    }

    const converter = new QuillDeltaToHtmlConverter(
        post.content.ops,
        {}
    );
    const contentHTML = converter.convert();

    return (
        <article className="post container">
            <h1>{post.title}</h1>
            <div
                className="content"
                dangerouslySetInnerHTML={{__html: contentHTML}}
            />
        </article>
    );
};

export default Post;