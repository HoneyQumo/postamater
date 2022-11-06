import React, {useEffect, useState} from 'react';
import {Col, Row} from 'antd';
import {YMaps, Map as DMap, Placemark} from '@pbe/react-yandex-maps';

import './Map.scss';
import MapSidebar from './MapSidebar/MapSidebar';
import {useSelector} from 'react-redux';

const Map = () => {
  // const [loader, setLoader] = useState(true);
  const [dataOrderMap, setDataOrderMap] = useState([]);
  const dataOrder = useSelector(state => state.pointsList.dataOrder.map.features);
  console.log('dataOrder: ', dataOrder);

  useEffect(() => {
    // setLoader(true);
    if (dataOrder) {
      setDataOrderMap(dataOrder);
    }

  }, [dataOrder]);


  return (
    <Row className="map" wrap={false}>
      <Col flex="200px" className="map__sidebar sidebar">
        <MapSidebar/>
      </Col>
      <Col flex="auto" className="map__content content">
        <YMaps>
          <DMap width={'100%'} height={'calc(100vh - 132px)'} defaultState={{center: [55.76, 37.64], zoom: 9, controls: []}}>
            {dataOrderMap.map((item) => {
              const coordTemp = item.geometry.coordinates.split(',')
              const trimCoord = coordTemp.map(item => item.trim())
              return <Placemark geometry={[trimCoord[1], trimCoord[0]]} properties={{}} key={item.id} options={{preset: 'islands#dotIcon'}}/>
            })}
          </DMap>
        </YMaps>
      </Col>
    </Row>
  );
};

export default Map;