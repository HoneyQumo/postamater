import React, {useEffect, useState} from 'react';
import {YMaps, Map as DMap, Placemark} from '@pbe/react-yandex-maps';

import './Map.scss';
import MapSidebar from './MapSidebar/MapSidebar';
import {useSelector} from 'react-redux';

const Map = () => {
  const [dataOrderMap, setDataOrderMap] = useState([]);
  const dataOrder = useSelector(state => state.pointsList.dataOrder.map.features);
  console.log('dataOrder: ', dataOrder);

  useEffect(() => {
    if (dataOrder) {
      setDataOrderMap(dataOrder);
    }

  }, [dataOrder]);


  return (
    <div className="map">
      <div className="map__sidebar sidebar">
        <MapSidebar/>
      </div>
      <div className="map__YMaps">
        <YMaps>
          <DMap width={'100%'} height={'calc(100vh - 90px)'}
                defaultState={{center: [55.76, 37.64], zoom: 9, controls: []}}>
            {dataOrderMap.map((item) => {
              const coordTemp = item.geometry.coordinates.split(',');
              const trimCoord = coordTemp.map(item => item.trim());
              return <Placemark geometry={[trimCoord[1], trimCoord[0]]} properties={{}} key={item.id}
                                options={{preset: 'islands#dotIcon'}}/>;
            })}
          </DMap>
        </YMaps>
      </div>
    </div>
  );
};

export default Map;