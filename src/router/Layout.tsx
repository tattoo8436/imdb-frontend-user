import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import NotFound from "../pages/not-found/NotFound";
import Register from "../pages/register";
import Search from "../pages/search";
import Movie from "../pages/movie";
import Actor from "../pages/actor";
import Director from "../pages/director";

const Layout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/actor" element={<Actor />} />
        <Route path="/director" element={<Director />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
