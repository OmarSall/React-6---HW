import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./assets/components/Header/Header";
// import ArticlesPage from "./assets/pages/ArticlePage/ArticlePage";
// import ArticleDetailsPage from "./assets/pages/ArticleDetailsPage/ArticleDetailsPage";
// import NewArticlePage from "./assets/pages/NewArticlePage/NewArticlePage";
// import EditArticlePage from "./assets/pages/EditArticlePage/EditArticlePage";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/articles" />} />
        {/*<Route path="/articles" element={<ArticlesPage />} />*/}
        {/*<Route path="/articles/:id" element={<ArticleDetailsPage />} />*/}
        {/*<Route path="/articles/:id/modify" element={<EditArticlePage />} />*/}
        {/*<Route path="/new-article" element={<NewArticlePage />} />*/}
      </Routes>
    </BrowserRouter>
  )
}

export default App
