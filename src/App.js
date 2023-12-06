import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
import ArticleTemplate from './pages/ArticleTemplate';
import EditPage from './pages/EditPage';
import DeleteConfirmationPopup from './pages/DoYouWannaDelete';

function App()
{
  
  return(
    

    <BrowserRouter>
        <Routes>
          <Route path="/" index element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/setting" element={<SettingsPage />} />
          <Route path="/view" element={<ArticleTemplate />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/delete" element={<DeleteConfirmationPopup />} />


        </Routes>
        
      </BrowserRouter>

    
  );
};

export default App;
