import React from 'react';
import Iframe from 'react-iframe';

import './Map.scss'

const Map = () => {
  return (
    <div className='map'>
      <Iframe url='http://37.230.196.15/arrangeKali/'
              width='100%'
              display='flex'
              className='map__iFrame'
      />
    </div>
  );
};

export default Map;