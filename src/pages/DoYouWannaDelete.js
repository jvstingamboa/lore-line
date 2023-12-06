import React, { useState } from 'react';

function DeleteConfirmationPopup(props) {
  
  var post = JSON.parse(localStorage.getItem('delete_post'));

  const doDelete = async event =>{
    var obj = {id: post.postID, title: post.title, content:post.content, author:post.author};
    var js = JSON.stringify(obj);

    try{
      const response = await fetch('http://localhost:5000/api/delete', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

      alert("Post deleted!");
      var _ud = localStorage.getItem('user_data');
      var username = JSON.parse(_ud).username;
      var obj2 = {author:username};
      var js2 = JSON.stringify(obj2);
      try
      {
        const response = await fetch('http://localhost:5000/api/myPosts', {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});
        var res = JSON.parse(await response.text());
        localStorage.setItem('my_posts', JSON.stringify(res.results));
      }
      catch (e)
      {
        alert(e.toString());
      }
      window.location.href = "/setting";
    }
    catch(e)
    {
      alert(e.toString());
    }
  }

  const backPage = async event =>{
    window.location.href = "/setting";
  }

  return (
    <div>
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to delete {post.title}?</p>
            <button onClick={doDelete}>Yes</button>
            <button onClick={backPage}>No</button>
          </div>
        </div>
    </div>
  );
}

export default DeleteConfirmationPopup;
