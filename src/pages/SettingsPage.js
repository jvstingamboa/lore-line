import React, { useState } from 'react';
import '../styles/createPost.css';
import Header from '../components/Header.js';
import DeletePopup from '../components/DeletePopup.js'

const SettingsPage = () =>{

  function editPost(post)
  {
    localStorage.setItem('edit_post', JSON.stringify(post));
    window.location.href = "/edit";
  }

  function deletePost(post)
  {
    localStorage.setItem('delete_post', JSON.stringify(post));
    window.location.href = "/delete";
  }

  var myPosts = JSON.parse(localStorage.getItem('my_posts'));

    return(
        <div className="settingsPage">
            <Header/>
            <div className ="post-box">
      <div className="settings-title">Your Posts</div>
        <div className="post-container">
        <div className = "row g-5 justify-content-evenly">

      {myPosts.map(post =>(
        <div className="card">
              
              
          <div className = "image-box">
            <img src ="images/MagicBook.jpg" alt=""/>
          </div>
          <div className ="profile-details">
            <div className = "name-job">
              <h3 className ="name">{post.title}</h3>
              <h4 className="job">By: {post.author}</h4>
              <h5 className ="date">Date Published: {post.date}</h5>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => editPost(post)}>Edit</button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => deletePost(post)}>Delete</button>
            </div>
          </div>
     
        </div>
      ))}

      </div>
      </div>
        </div>
        </div>
        
    );
}

export default SettingsPage;