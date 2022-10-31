import React from 'react';
import {Typography} from 'antd';

import './Hello.scss'

const Hello = () => {
  return (
    <div className='hello'>
      <Typography.Title className='hello__title' >Добро пожаловать в Постаматчик</Typography.Title>
      <Typography.Text className='hello__text'>На данный момент приложение находится в режиме разработки.</Typography.Text>
    </div>
  );
};

export default Hello;