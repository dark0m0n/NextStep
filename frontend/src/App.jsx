import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage'; 
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import CreateProfile from './pages/CreateProfile';
import CreateProject from'./pages/CreateProject';
import ProjectPage from './pages/ProjectPage';
import SearchEmp from './pages/SearchEmp';
import SearchProject from './pages/SearchProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/log" element={<LoginPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/createprof" element={<CreateProfile/>}/> 
        <Route path="/createproj" element={<CreateProject/>}/>
        <Route path="/project" element={<ProjectPage/>}/>
        <Route path="/searchemp" element={<SearchEmp/>}/>
        <Route path="/searchproj" element={<SearchProject/>}/>
        {/* Додайте інші маршрути тут */}
      </Routes>
    </Router>
  );
}

export default App;