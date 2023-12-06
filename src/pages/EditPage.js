import React, { useState } from 'react';
import '../styles/createPost.css';
import Header from '../components/Header.js';

const EditPage = () => {

  var title;
  var content;
  var post = JSON.parse(localStorage.getItem('edit_post'));
  const [message,setMessage] = useState('');

  const [file,setFile] = useState();

  function showPreview(e){
    e.preventDefault();
    
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));

    return(0);

  }

  const doEdit = async event =>{
    event.preventDefault();
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userID = ud.id;
    var username = ud.username;
  
    var obj = {id:post.postID,title:title.value,content:content.value,author:username};
    console.log(obj);
    var js = JSON.stringify(obj);
    
    var err = 0;
    
    if (obj.title.length < 1)
    {
      setMessage("Your post must have a title");
      err = 1;
    }
    if (obj.content.length < 1)
    {
      setMessage("Your post must have content");
      err = 1;
    }
    
    if (err === 0)
    {
      try
      {
         const response = await fetch('http://localhost:5000/api/edit', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

         var res = JSON.parse(await response.text());
         
         alert("Post \"" + title.value +"\" edited!");
         window.location.href = "/home";
      }
      catch(e)
      {
        alert(e.toString());
        return;
      }
    }
  };

  return (
    <div className ="createPost">
    <Header />  
    <blogPost/>
    
    <div className ="post-area">
    
        <div className = "postBox">
        
         <h1 className ="postBox-title">Edit Your Post Here!</h1>   
        <input className ="create-post-title" type="text" id="title" size={33} placeholder="Title" defaultValue={post.title} ref={ (c) => title = c }></input>
        <hr />
        <h2 className ="upload-title">Upload Article Image</h2>
        <div className ="image-placeholder">
          
          <img className="default-img1" id="default-img" src ={file} alt=""/>
           
        </div>
        <input type ="file" className ="upload-image" id="myFile" onChange={showPreview} />
        
        <textarea className ="create-post-content" id="content" rows={12} cols={36} placeholder="And so your journey begins..." defaultValue={post.content} ref={ (c) => content = c}></textarea>
        <br />
        <span id="postResult">{message}</span>
        <br />
        <button className="btn btn-primary" type="button" id="postButton"onClick={doEdit}>Edit</button>
        </div>
        
      </div>


    </div>
    
  );
};

export default EditPage;