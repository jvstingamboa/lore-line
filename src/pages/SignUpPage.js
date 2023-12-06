import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/loginPage.css';

const SignUpPage = () => 
{
    var emailAddress;
    var username;
    var password;
    var passwordConfirm;
    
    const [errorMessage,setMessage] = useState('');
    
    const doSignUp = async event =>{
      event.preventDefault();
      
      var obj = {email:emailAddress.value.toLowerCase(),user:username.value,pass:password.value,confirm:passwordConfirm.value};
      var js = JSON.stringify(obj);
      var err = 0;

      if (!/[^@]+@[^@]+\.[^@]+/.test(obj.email))
      {
        err = 1;
        setMessage("Please enter a valid e-mail address");
      }
      if (obj.user.length < 3)
      {
        err = 1;
        setMessage("Username must be at least 3 characters long");
      }
      if (!/\w*/.test(obj.user))
      {
        err = 1;
        setMessage("Username must contain only letters, digits, and underscores");
      }
      if (obj.pass.length < 8)
      {
        err = 1;
        setMessage("Password must be at least 8 characters");
      }
      if (obj.pass !== obj.confirm)
      {
        err = 1;
        setMessage("Passwords do not match");
      }
      if (err === 0)
      {
        try
        {
          const response = await fetch('http://localhost:5000/api/register', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
          var res = JSON.parse(await response.text());
          console.log(res);
          
          if (res.error !== "")
            setMessage(res.error);
          else
          {
            window.Email.send({
            Host : "smtp.elasticemail.com",
            Username : "steven.keppinger.jr@gmail.com",
            Password : "F391C15B33D4E45A08F93289AAC4D12D0E79",
            To : emailAddress.value,
            From : "lorelineblog@gmail.com",
            Subject : "Please verify your email",
            Body : "This is a verification email"
        }).then(
          message => alert(message)
        );
            setMessage("Registration success! Log in to view!");
          }
        }
        catch(e)
        {
          alert(e.toString());
          return;
        }
      }
    };

    return(
      <div className="signupAndLogin">
            <div className="signUpBox" style={{ position: 'relative', top: '250px', borderRadius: '1rem' }}>
              <form style={{ marginTop: '0px', marginLeft: '30px', maxWidth: '300px' }}>
                <div style={{ fontFamily: 'Goudy Old Style', fontSize: '36px' }} id="title">
                  <center>Fantasy Blogs</center>
                </div>
                <h2 className="h3 mb-6 font-weight-normal" id="title2">
                  <center>Sign Up Here</center>
                </h2>
  
                <label htmlFor="emailAddress">
                  <i className="fa fa-user icon"></i> Email Address:
                </label>
                <input type="email" id="emailAddress" className="form-control" placeholder="Email Address" required autoFocus ref={ (c) => emailAddress = c} />
                <label htmlFor="username">
                  <i className="fa fa-user icon"></i> Username:
                </label>
                <input type="text" id="username" className="form-control" placeholder="Username" required autoFocus ref={ (c) => username = c} />
                <div className="mt-2">
                  <label htmlFor="password">
                    <i className="fa fa-lock icon"></i> Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    autoFocus
  		              ref={ (c) => password = c}
                    />
                  <label htmlFor="passwordConfirm">
                    <i className="fa fa-lock icon"></i> Confirm Password:
                  </label>
                  <input
                    type="password"
                    id="passwordConfirm"
                    className="form-control"
                    placeholder="Confirm Password"
                    required
                    autoFocus
  		              ref={ (c) => passwordConfirm = c}
                    />
  		          <span id="signupError">{errorMessage}</span>
                </div>
  
                <div className="mt-4">
                  <button type="button" id="signupButton" className="btn btn-lg btn-primary w-100" onClick={doSignUp}>
                    Register <i className="fa fa-sign-in"></i>
                  </button>
                  <span id="signupError"></span>
                </div>
  
                <p className="form__text mt-2 mb-2">
                  <Link to={'/'} id="logInLink" className="form__link">Already have an account? Log in here.</Link>
                </p>
              </form>
            </div>
      </div>
    );
};

export default SignUpPage;