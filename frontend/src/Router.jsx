
import {Route,Routes,Navigate} from 'react-router-dom'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import PostQuestion from './pages/PostQuestion/PostQuestion';
import Answers from './pages/Answers/Answers';



const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post-question" element={<PostQuestion />} />
        <Route path="/answers/:questionid" element={<Answers />} />
      </Routes>
    </>
  );
};

export default Router;
