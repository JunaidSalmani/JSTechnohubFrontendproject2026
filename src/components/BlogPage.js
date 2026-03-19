import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from './blogData';
import BlogPostCard from './BlogPostCard';
import './Blog.css'; 

function BlogPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // --- Data Preparation ---
    const featuredPost = blogPosts[0]; 
    const otherPosts = blogPosts.slice(1); 
    const categories = ['All', ...new Set(blogPosts.map(p => p.category))]; 

    // --- Filtering Logic ---
    const filteredPosts = otherPosts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="blog-container">
            <header className="blog-header">
                <h1>The JSTechnoHub Blog</h1>
                <p>Insights, strategies, and stories for your career journey.</p>
            </header>

            {/* --- Featured Post Section --- */}
            <section className="featured-post-section">
                <div className="featured-post-image">
                    <img src={featuredPost.image} alt={featuredPost.title} />
                </div>
                <div className="featured-post-content">
                    <span className="featured-tag">Featured Article</span>
                    <h2>{featuredPost.title}</h2>
                    <p>{featuredPost.excerpt}</p>
                    <Link to={`/blog/${featuredPost.slug}`} className="btn-read-featured">
                        Read Full Story &rarr;
                    </Link>
                </div>
            </section>

            {/* --- Main Content: Filters + Grid --- */}
            <div className="blog-main-content">
                {/* Sidebar */}
                <aside className="blog-sidebar">
                    <div className="sidebar-widget">
                        <h3 className="sidebar-title">Search Articles</h3>
                        <input 
                            type="text" 
                            placeholder="Type to search..." 
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="sidebar-widget">
                        <h3 className="sidebar-title">Categories</h3>
                        <div className="category-filters">
                            {categories.map(category => (
                                <button 
                                    key={category}
                                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Blog Grid */}
                <main className="blog-grid-container">
                    <h2>Latest Posts</h2>
                    <div className="blog-grid">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map(post => <BlogPostCard key={post.id} post={post} />)
                        ) : (
                            <p className="no-posts-message">No posts found matching your criteria.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default BlogPage;