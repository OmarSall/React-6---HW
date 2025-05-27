import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header"
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage/ArticleDetailsPage";
import NewArticlePage from "./pages/NewArticlePage/NewArticlePage";
import EditArticlePage from "./pages/EditArticlePage/EditArticlePage";
import { useState } from 'react'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetailsPage />} />
        <Route path="/articles/:id/modify" element={<EditArticlePage />} />
        <Route path="/new-article" element={<NewArticlePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
