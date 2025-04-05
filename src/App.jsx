// css
import './App.css'

// hook
import { Routes,Route} from "react-router-dom";

// pages
import Crawling from "./pages/Crawling.jsx";
import {PublicApiProvider} from "./api/publicApi.jsx";

// component

function App() {
    return (
        <>
            <PublicApiProvider>
                <Routes>
                    <Route path={"/"} element={<Crawling/>}/> {/* 기본 경로 등록 */}
                </Routes>
            </PublicApiProvider>
        </>
    );
}

export default App
