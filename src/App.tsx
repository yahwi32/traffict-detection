import React, { createContext, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HomePage, ManagePage, SearchPage } from './pages';
import Layout from './layout';
import { UserType } from './type';
import { Toaster } from 'react-hot-toast';
import RetrainPage from './pages/retrain';

export const APP_CONTEXT = createContext<{
  address?: string;
  setAddress: (address: string) => void;
  user: UserType;
  setUser: (user: UserType) => void;
}>({
  address: undefined,
  setAddress: () => {},
  user: {
    username: '',
    password: '',
  },
  setUser: () => {},
});

function App() {
  const [address, setAddress] = useState<string>();
  const [user, setUser] = useState<UserType>({
    username: '',
    password: '',
  });
  return (
    <APP_CONTEXT.Provider value={{ address, setAddress, user, setUser }}>
      <div className="App">
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="manage" element={<ManagePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="retrain" element={<RetrainPage />} />
          </Route>
        </Routes>
      </div>
    </APP_CONTEXT.Provider>
  );
}

export default App;
