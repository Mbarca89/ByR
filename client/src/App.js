import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Home from './components/Home/Home'
import Nav from './components/Nav/Nav'
import Properties from './components/Properties/Properties';
import Rates from './components/Rates/Rates';
import Detail from './components/Detail/Detail'
import About from './components/About/About'
import Admin from './components/Admin/Admin'
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={(
          <>
            <Nav />
            <Outlet />
          </>
        )}>
          <Route path='/' element={<Home />} />
          <Route path='/properties' element={<Properties />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/empresa' element={<About />} />
          <Route path='/tasaciones' element={<Rates />} />
        </Route>
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
