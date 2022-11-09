import React, {useEffect, useState} from 'react';
import {YMaps, Map as DMap, Placemark} from '@pbe/react-yandex-maps';

import './Map.scss';
import MapSidebar from './MapSidebar/MapSidebar';
import {useSelector} from 'react-redux';
import {DownOutlined} from '@ant-design/icons';

const Map = () => {
  const [dataOrderMap, setDataOrderMap] = useState([]);
  const dataOrder = useSelector(state => state.pointsList.dataOrder.map.features);
  console.log('dataOrder: ', dataOrder);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    if (dataOrder) {
      setDataOrderMap(dataOrder);
    }

  }, [dataOrder]);


  function showFilterToggle() {
    setShowFilters(prevState => !prevState);
  }

  return (
    <div className="map">
      <div className="map__sidebar sidebar">
        {/*TOGGLE FILTERS*/}
        <div onClick={showFilterToggle} style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 103,
          backgroundColor: '#fafafa', color: 'black', width: 250, height: 40, position: 'sticky',
          marginLeft: '-5px', border: '1px solid lightgray', borderRadius: '10px', marginBottom: '-20px',
          boxShadow: '0px 0px 5px 2px rgba(34, 60, 80, 0.2)', cursor: 'pointer', userSelect: 'none', padding: '0 20px'
        }}
        >
          <p style={{margin: 0, flex: '1 0 100%'}}>Фильтры</p>
          <DownOutlined style={{
            transform: showFilters ? 'rotate(0deg)' : 'rotate(90deg)',
            transition: 'transform .4s 0s',
            justifySelf: 'flex-end'
          }}/>
        </div>
        <MapSidebar showFilters={showFilters ? '550px' : '0px'}/>
        {/*=====================*/}
        {/*<MapSidebar/>*/}
      </div>
      <div className="map__YMaps">
        <YMaps>
          <DMap width={'100%'} height={'calc(100vh - 90px)'} defaultOptions={{copyrightLogoVisible: false, copyrightUaVisible: false, copyrightProvidersVisible: false}}
                defaultState={{center: [55.76, 37.64], zoom: 9, controls: []}} modules={['geoObject.addon.hint']} >
            {dataOrderMap.map((item) => {
              const coordTemp = item.geometry.coordinates.split(',');
              const trimCoord = coordTemp.map(item => item.trim());
              return <Placemark geometry={[trimCoord[1], trimCoord[0]]} key={item.id} options={{preset: 'islands#blueDotIcon'}} properties={{hintContent: item.properties.hintContent}} />;
            })}
          </DMap>
        </YMaps>
      </div>
    </div>
  );
};

export default Map;