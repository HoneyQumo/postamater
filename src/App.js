import React from 'react';
import {Layout} from 'antd';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

import './App.scss';

const App = () => {
  return (
    <Layout className="app">
      <Header />
      <Main />
      <Footer />
    </Layout>
  );
};

export default App;