import React, {useEffect, useState} from 'react';
import Iframe from 'react-iframe';
import {LoadingOutlined} from '@ant-design/icons';
import {Col, Row} from 'antd';

import './Map.scss';
import MapSidebar from './MapSidebar/MapSidebar';

const Map = () => {
  const [loader, setLoader] = useState(true);

  //TODO: Убрать фейковую задержку и сделать зависимость от подгрузки.
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  });

  return (
    <Row className='map'>
      <Col span={4} className='map__sidebar sidebar'>
        <MapSidebar />
      </Col>
      <Col span={20} className="map__content content">
        {loader ? <LoadingOutlined className="content__loader"/> :
          <Iframe url="http://37.230.196.15/arrangeKali/"
                  width="100%"
                  display="flex"
                  className="content__iFrame"
                  loading="eager"
          />
        }
      </Col>
    </Row>
  );
};

export default Map;