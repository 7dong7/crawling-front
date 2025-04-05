// css
import './App.css'

// hook
import { Routes,Route} from "react-router-dom";

// pages
import Crawling from "./pages/Crawling.jsx";

// component

function App() {
  return (
      <>
        <Routes>
          <Route path={"/"} element={<Crawling />}/> {/* 기본 경로 등록 */}
        </Routes>
      </>
  )
}

export default App
