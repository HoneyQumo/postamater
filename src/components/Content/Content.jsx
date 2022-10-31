import React from 'react';
import {Layout} from 'antd';
import {Route, Routes} from 'react-router-dom';

import Map from '../Map/Map';
import PointsList from '../PointsList/PointsList';
import Hello from '../Hello/Hello';

import './Content.scss'

const Content = () => {
  return (
    <Layout.Content className="app__content">
      <Routes>
        <Route index element={<Hello />} />
        <Route to='/map' element={<Map />} />
        <Route to='/points-list' element={<PointsList />} />
      </Routes>
    </Layout.Content>
  );
};

export default Content;