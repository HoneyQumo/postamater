import React, {useEffect, useState} from 'react';
import Iframe from 'react-iframe';
import {LoadingOutlined} from '@ant-design/icons';
import {Col, Row} from 'antd';
import {YMaps, Map as Mapy, Placemark} from '@pbe/react-yandex-maps';

import './Map.scss';
import MapSidebar from './MapSidebar/MapSidebar';
import {useSelector} from 'react-redux';

const Map = () => {
  const [loader, setLoader] = useState(true);
  const pointsList = useSelector(state => state.pointsList.pointsListData);


  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      const response = await fetch('http://37.230.196.15/arrangeKali/');
      if (response.ok) {
        setLoader(prevState => !prevState);
      }
    };
    fetchData();
  }, []);


  return (
    <Row className="map" wrap={false}>
      <Col flex='200px' className="map__sidebar sidebar">
        <MapSidebar/>
      </Col>
      <Col flex='auto' className="map__content content">
        {loader ? <LoadingOutlined className="content__loader"/> :
          <Iframe url="http://37.230.196.15/arrangeKali/"
                  width="100%"
                  display="flex"
                  className="content__iFrame"
                  loading="eager"
          />
        }
        {/*<YMaps query={{ load: "package.full" }}>*/}
        {/*  <Mapy width={'100%'} height={'calc(100vh - 132px)'} defaultState={{center: [55.76, 37.64], zoom: 9, controls: []}}>*/}
        {/*    /!*{pointsList.map((item) => {*!/*/}
        {/*    /!*  return <Placemark defaultGeometry={[...item.coordinates]} />*!/*/}
        {/*    /!*})}*!/*/}
        {/*    <Placemark geometry={[55.76, 37.64]} properties={{hintContent: 'Библа'}} />*/}
        {/*  </Mapy>*/}
        {/*</YMaps>*/}

      </Col>
    </Row>
  );
};

export default Map;