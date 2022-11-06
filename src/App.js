import React, {useLayoutEffect} from 'react';
import {Layout} from 'antd';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import {useDispatch} from 'react-redux';
import {getAODataFromGeoJSON, setAOWithMODataFromGeoJSON} from './store/slices/pointsListSlice';

import './App.scss';
import ao from './geojson/ao.json';
import mo from './geojson/mo.json';

const App = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getAODataFromGeoJSON(ao))
    dispatch(setAOWithMODataFromGeoJSON(mo))
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