import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todos from './pages/Todos';
import Users from './pages/Users';
import Layout from './pages/Layout';
import Comments from './pages/Comments';

import { MainContext } from './context';
import { useState } from 'react';
const App = () => {
  const [globalState, setGlobalState] = useState({});

  const appendContext = newMethods => {
    setGlobalState({
      ...globalState,
      ...newMethods
    });
  };

  const data = {
    appendContext,
    ...globalState
  };
  return (
    <MainContext.Provider value={data}>
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Layout />}>
              <Route path="" element={<Todos />} />
              <Route path="users" element={<Users />} />
              <Route path="comments" element={<Comments />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </MainContext.Provider>
  );
};

export default App;
