import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlus, faGear } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Header()
{

  var query;
  var _ud = localStorage.getItem('user_data');
  var username = JSON.parse(_ud).username;

  const doLogout = () =>	
  {
    localStorage.removeItem("user_data");
    window.location.href = "/";
  };
  
  const doSearch = async event =>
  {
    event.preventDefault();
    var obj = {query:query.value};
    var js = JSON.stringify(obj);
    
    try
    {
      const response = await fetch("http://localhost:5000/api/search", {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
      var res = JSON.parse(await response.text());
      localStorage.setItem('search_results', JSON.stringify(res.results));
      window.location.href = "/search";
    } 
    catch(e)
    {
      alert(e.toString());
    }
  };

  return(
  	<header>
        <div className="container">
          <div className="col-div-6">
            <p className="blogName">LoreLine</p>
          </div>
          <div className="col-div-6">
            <ul className="nav">
              <li><Link to='/home'>Home</Link></li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="col-div-7">
            <div className="form-outline">
              <input type="text" id="form1" placeholder="Search" className="form-control" ref={(c) => query = c}/>
            </div>
            <div className="search-button">
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={doSearch}><FontAwesomeIcon icon={faMagnifyingGlass} beat style={{color: "#ffffff",}} />
              </button>
            </div>
          </div>
  
          <div className ="col-div-8">
            
            <div className="dropdown">
                <i className ="fa fa-bars fa-lg" data-fa-transform="up-9" ></i>
              
              <div className="dropdown-options">
                <h6 id="userName">{username}</h6>
                <Link to='/create'>New Post <FontAwesomeIcon icon={faPlus} beat/></Link>
                <Link to='/setting'>Settings <FontAwesomeIcon icon={faGear} spin/></Link>
                
                <button class="logout" onClickCapture={doLogout} >Logout <FontAwesomeIcon icon={faRightFromBracket} beat />  </button> 
              </div>
            </div>
              
          </div>
  
        </div>
        <div className="clearfix"></div>
    </header>
  );
};

export default Header; 
