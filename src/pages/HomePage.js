import React, {useState, useEffect} from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/homePage.css'; 
import '../images/FairyPic.jpg';
import '../images/wizard.jpg';
import Header from '../components/Header.js';
import HomePageImg from '../images/HomePageBackGround.jpg';
import LoginImg from '../images/LoginBackGround.jpg';
import Potion from '../images/Potion.jpg';
import BlogPost from '../components/BlogPost.js';
import '../styles/BlogPost.css';



const HomePage = () => {

  return (
    <div className="homePage"style={{height: '100vh'}} >
      <Header />
      <div className="leftBox">
        <div className="bigCard">
          <h6 className="feature-article">
            
            <BlogPost title= "New Elden Ring DLC When?" image="https://picsum.photos/200/300" description="This is my first post on this platform." />
          </h6>

        </div>
      </div>

      <div className="rightBox">
        <h1 className="side-article-title">Top Rated Articles</h1>
        <div className="card-column">
          <img src= {Potion} alt="" className="side-card" />
          <h3 className="side-article">An article about potions</h3>
        </div>
        <div className="card-column">
          <img src={HomePageImg} alt="" className="side-card" />
          <h3 className="side-article">This is our background image</h3>
        </div>
        <div className="card-column">
          <img src={LoginImg} alt="" className="side-card" />
          <h3 className="side-article">Can this semester end already?</h3>
        </div>
      </div>

      
    </div>
  );
};

export default HomePage;
