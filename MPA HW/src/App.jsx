import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ArticlesList from "./assets/pages/ArticlesList/ArticlesList";
// import ArticleDetailsPage from "./assets/pages/ArticleDetailsPage/ArticleDetailsPage";
import NewArticlePage from "./assets/pages/NewArticlePage/NewArticlePage";
// import EditArticlePage from "./assets/pages/EditArticlePage/EditArticlePage";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route path="/articles" element={<ArticlesList />} />
        {/*<Route path="/articles/:id" element={<ArticleDetailsPage />} />*/}
        {/*<Route path="/articles/:id/modify" element={<EditArticlePage />} />*/}
        <Route path="/new-article" element={<NewArticlePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
