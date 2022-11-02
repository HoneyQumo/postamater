import React, {useLayoutEffect} from 'react';
import {Layout} from 'antd';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import {useDispatch} from 'react-redux';
import {fetchPointsList} from './store/slices/pointsListSlice';

import './App.scss';

const App = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchPointsList());
  }, [dispatch]);

  return (
    <Layout className="app">
      <Header />
      <Main />
      <Footer />
    </Layout>
  );
};

export default App;