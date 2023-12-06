import React, { useState } from 'react';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/loginPage.css';
import '../pages/SignUpPage';


const LoginPage = () => {

  var emailAddress;
  var loginPassword;

  const [message,setMessage] = useState('');
  
  // var _ud = localStorage.getItem('user_data');
  // if (_ud != null)
  //   window.location.replace(urlBase + "/home");

  const doLogin = async event =>{
    event.preventDefault();

    var obj = {email:emailAddress.value,password:loginPassword.value};
    var js = JSON.stringify(obj);

    try
    {
       const response = await fetch('http://localhost:5000/api/login', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

       var res = JSON.parse(await response.text());

       console.log("res.id" + res.id);

       if (res.id <= 0)
       {
          setMessage('Email/Password combination incorrect');
       }
       else
       {
          var user = {id:res.id,username:res.username};
          localStorage.setItem('user_data', JSON.stringify(user));
          var obj2 = {author:user.username};
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
          window.location.href = "/home";
       }
    }
    catch(e)
    {
      alert(e.toString());
      return;
    }
  };
  
  return (
    <div className="signupAndLogin">
          <div className="loginBox" style={{ position: 'relative', top: '250px', borderRadius: '1rem' }}>
            <form style={{ marginTop: '0px', marginLeft: '30px', maxWidth: '300px' }}>
              <div style={{ fontFamily: 'Goudy Old Style', fontSize: '36px' }} id="title">
                <center>Fantasy Blogs</center>
              </div>
              <h2 className="h3 mb-6 font-weight-normal" id="title2">
                <center>Log In Here</center>
              </h2>

              <label htmlFor="emailAddress">
                <i className="fa fa-user icon"></i> Email Address:
              </label>
              <input type="email" id="emailAddress" className="form-control" placeholder="Email Address" required autoFocus ref={ (c) => emailAddress = c} />
              <div className="mt-2">
                <label htmlFor="loginPassword">
                  <i className="fa fa-lock icon"></i> Password:
                </label>
                <input
                  type="password"
                  id="loginPassword"
                  className="form-control"
                  placeholder="Password"
                  required
                  autoFocus
		              ref={ (c) => loginPassword = c}
                  />
		          <span id="loginResult">{message}</span>
              </div>

              <div className="mt-4">
                <button type="button" id="loginButton" className="btn btn-lg btn-primary w-100" onClick={doLogin}>
                  Sign In <i className="fa fa-sign-in"></i>
                </button>
                <span id="loginResult"></span>
              </div>

              <p className="form__text mt-2 mb-2">
                <Link to='/signup' id="signUpLink" className="form__link">Don't have an account? Sign up here.</Link>

              </p>
            </form>
          </div>
    </div>
  );
};

export default LoginPage;
