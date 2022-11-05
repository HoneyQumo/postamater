import React, {useEffect} from 'react';
import {Layout} from 'antd';

import Content from '../Content/Content';

import './Main.scss';

const Main = () => {

  return (
    <Layout className="main">
      <Content/>
    </Layout>
  );
};

export default Main;