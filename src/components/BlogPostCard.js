import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css'; // We will create one shared CSS file

function BlogPostCard({ post }) {
    const { slug, image, date, author, title, excerpt } = post;

    return (
        <article className="post-card">
            <Link to={`/blog/${slug}`} className="post-card-image-link">
                <img src={image} alt={title} className="post-card-image" />
            </Link>
            <div className="post-card-content">
                <div className="post-card-meta">
                    <span>By {author}</span> | <span>{date}</span>
                </div>
                <h3 className="post-card-title">
                    <Link to={`/blog/${slug}`}>{title}</Link>
                </h3>
                <p className="post-card-excerpt">{excerpt}</p>
                <Link to={`/blog/${slug}`} className="post-card-read-more">
                    Read More &rarr;
                </Link>
            </div>
        </article>
    );
}

export default BlogPostCard;