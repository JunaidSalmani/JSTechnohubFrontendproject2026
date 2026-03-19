// src/components/Layout.js

import React from 'react';
import Footer from './Footer'; 


function Layout({ children }) {
    return (
        <div className="site-container">
            <main className="main-content">
                {children}  
            </main>
            <Footer />
        </div>
    );
}

export default Layout;