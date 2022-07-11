import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import User from './pages/user';
import UserList from './lists/userList';
import Move from './pages/move';
import MoveList from './lists/moveList';
import Statement from './lists/statement'
import Footer from './components/footer';
import Header from './components/header';
import Login from './components/login';
import UserContext from './contexts/UserContext';


const App = () => {
  const [ user, setUser ] = useState([]);

  return (
    <UserContext.Provider value={[ user, setUser ]}>

      <Router>
        <Header />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/user' element={<User />} />
            <Route path='/user/:id' element={<User />} />
            <Route path='/userlist' element={<UserList />} />
            <Route path='/move' element={<Move />} />
            <Route path='/move/:id' element={<Move />} />
            <Route path='/Movelist' element={<MoveList />} />
            <Route path='/statement' element={<Statement />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        <Footer />
      </Router>

    </UserContext.Provider>
  )
};

export default App;
