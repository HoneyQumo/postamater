import React, {useEffect, useState} from 'react';
import Iframe from 'react-iframe';
import {LoadingOutlined} from '@ant-design/icons';

import './Map.scss';

const Map = () => {
  const [loader, setLoader] = useState(true);

  //TODO: Убрать фейковую задержку и сделать зависимость от подгрузки.
  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  })

  return (
    <div className="map">
      {loader ? <LoadingOutlined className='map__loader' /> :
        <Iframe url="http://37.230.196.15/arrangeKali/"
                width="100%"
                display="flex"
                className="map__iFrame"
                loading='eager'
        />
      }
    </div>
  );
};

export default Map;