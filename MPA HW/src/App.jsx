import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ArticlesList from "./assets/pages/ArticlesList/ArticlesList";
import ArticleDetailsPage from "./assets/pages/ArticleDetailsPage/ArticleDetailsPage";
import NewArticlePage from "./assets/pages/NewArticlePage/NewArticlePage";
import EditArticlePage from "./assets/pages/EditArticlePage/EditArticlePage";
import {ROUTES} from "./assets/constants/routes";
import "./App.css"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.ARTICLES}/>}/>
                <Route path={ROUTES.ARTICLES} element={<ArticlesList/>}/>
                <Route path={ROUTES.ARTICLE_DETAILS} element={<ArticleDetailsPage/>}/>
                <Route path={ROUTES.ARTICLE_MODIFY} element={<EditArticlePage/>}/>
                <Route path={ROUTES.NEW_ARTICLE} element={<NewArticlePage/>}/>
                <Route path="*" element={<Navigate to={ROUTES.ARTICLES}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
