import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PropertySearch from './components/PropertySearch';
import './styles/App.css';

function Home() {
    return (
        <div className="home-container">
            <h1>🏡 Real Estate Finder</h1>
            <nav>
                <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </nav>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<PropertySearch />} />
            </Routes>
        </Router>
    );
}

export default App;