import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from './blogData';
import './Blog.css';

function SinglePostPage() {
    const { slug } = useParams();
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="single-post-container post-not-found">
                <h2>Post Not Found</h2>
                <p>Sorry, we couldn't find the post you're looking for.</p>
                <Link to="/blog" className="back-to-blog-link">← Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className="single-post-wrapper">
            <Link to="/blog" className="back-to-blog-link">← Back to All Posts</Link>

            <div className="single-post-container">
                <article className="single-post">
                    <header className="single-post-header">
                        <span className="single-post-category">{post.category}</span>
                        <h1>{post.title}</h1>
                        <div className="single-post-meta">
                      <span>By {post.author}</span> | <span>{post.date}</span>
                        </div>
                    </header>

                    <img src={post.image} alt={post.title} className="single-post-image" />

                    {/* --- THIS IS THE CORRECTED LINE --- */}
                    <div 
                        className="single-post-content"
                        dangerouslySetInnerHTML={{ __html: post.content }} 
                    />
                </article>
            </div>
        </div>
    );
}

export default SinglePostPage;