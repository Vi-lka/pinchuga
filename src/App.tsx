import './fonts/FoglihtenNo06/stylesheet.css'
import './fonts/Lato/stylesheet.css'
import './App.css'
import Home from './components/Home/Home'
import HomeMobile from './components/HomeMobile/HomeMobile'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={window.innerWidth <= 1100 ? <HomeMobile /> : <Home />} />
          <Route path="/low" element={<HomeMobile />} />
        </Routes>
    </BrowserRouter>
    )

}
export default App;
