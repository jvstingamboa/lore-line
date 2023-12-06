import React, { useState } from 'react';
import '../styles/createPost.css';
import Header from '../components/Header.js';

const ArticleTemplate = () => {

    var post = JSON.parse(localStorage.getItem('view_post'));
    
    return(
        <div className="article-template">

        <Header />  
        <div className="article-container">
        <div className="article-box">

            <h1 className="article-template-title">{post.title}</h1>
            <h2 className ="article-info">Date: {post.date} By: {post.author}</h2>
        <hr></hr>

            <div className="article-text-holder">
              {post.content}
            </div>

        </div>
        
    </div>
    </div>

    );
};
 export default ArticleTemplate;