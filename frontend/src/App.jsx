import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import MainPage from './pages/MainPage'; 
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import CreateProfile from './pages/CreateProfile';
import CreateProject from'./pages/CreateProject';
import ProjectPage from './pages/ProjectPage';
import SearchEmp from './pages/SearchEmp';
import SearchProject from './pages/SearchProject';
import ChatPage from './pages/Chat';
import EditProfile from './pages/EditProfile';
import EditProject from './pages/EditProject';
import SearchRes from './pages/SearchRes';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/log" element={<LoginPage/>}/>
        <Route path="/profile/:username" element={<ProfilePage/>}/>
        <Route path="/createprof" element={<CreateProfile/>}/> 
        <Route path="/createproj" element={<CreateProject/>}/>
        <Route path="/project/:id" element={<ProjectPage/>}/>
        <Route path="/searchemp" element={<SearchEmp/>}/>
        <Route path="/searchproj" element={<SearchProject/>}/>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:userId" element={<ChatPage />} /> 
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/editproject/:id" element={<EditProject />} />
        <Route path="/search" element={<SearchRes />} />
        <Route path='/*' element={<ErrorPage/>} />
      </Routes>
    </Router>
  );
}

export default App;