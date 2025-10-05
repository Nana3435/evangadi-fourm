import {Route,Routes} from 'react-router-dom'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import PostQuestion from './pages/PostQuestion/PostQuestion';
import PostAnswer from './components/PostAnswer/PostAnswer';
import Answers from './pages/Answers/Answers';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/post-question/:questionid" element={<PostQuestion />} />
        <Route path="/post-answer/:questionid" element={<Answers />} />
      </Routes>
    </>
  );
}

export default Router