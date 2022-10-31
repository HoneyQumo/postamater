import React from 'react';
import {Layout} from 'antd';

import Content from '../Content/Content';

import './Main.scss'
import {Route, Routes} from 'react-router-dom';

const Main = () => {
  return (
    <Layout className='main'>
      <Content />
    </Layout>
  );
};

export default Main;