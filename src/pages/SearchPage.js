import React, {useState, useEffect} from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/createPost.css';
import Forest from '../images/card-image1.jpg';
import Header from '../components/Header.js';

const SearchPage = () =>{

    function viewPost(post)
    {
      localStorage.setItem('view_post', JSON.stringify(post));
      window.location.href = "/view";
    }


    const [cards, setCards] = useState([]);

    useEffect(() => {
      setCards(JSON.parse(localStorage.getItem('search_results')));
    }, []);

    const doView = async event =>{
      event.preventDefault();

    };

    return(

    <div className="search-page">

    
    <Header />

    <div className ="search-box">
      <p className="search-title">Search Results</p>
        <div className = "search-container">
        <div className = "row g-5 justify-content-evenly">
        
        {cards.map(result => (
          <div className ="col-lg-6">
            <div className ="card">
              <div className ="row g-0">
                <div className ="col-6 col-md-5">
                <img src={Forest} className = "card-img img-fluid" alt=""/>
                </div>
                <div className="col-6 col-md-7">
                  <div className="h-100">
                    <h2 className ="card-title">{result.title}</h2>
                    <div className="card-text">{result.author}</div>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => viewPost(result)}>View</button>
                  </div>
                </div>
              
              </div>
              
            </div>
          </div>
        ))}

          
        </div>
        </div>
    </div>


    </div>
    );
};

export default SearchPage;