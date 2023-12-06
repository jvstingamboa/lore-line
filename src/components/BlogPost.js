import React from 'react';


const BlogPost = ({ title, image, description }) => {
  return (
    <div className="post">
      <h4 class ="feature-title">{title}</h4>
      <img class="feature-pic" src={image} alt={title} />
      <p class="feature-description">{description}</p>
    </div>
  );
};

export default BlogPost;