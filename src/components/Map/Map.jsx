import React, {useEffect, useState} from 'react';
import Iframe from 'react-iframe';
import {LoadingOutlined} from '@ant-design/icons';
import {Col, Row} from 'antd';
import {useDispatch} from 'react-redux';

import './Map.scss';
import ao from '../../geojson/ao.json';
import mo from '../../geojson/mo.json';
import MapSidebar from './MapSidebar/MapSidebar';
import {getAODataFromGeoJSON, setAOWithMODataFromGeoJSON} from '../../store/slices/pointsListSlice';

const Map = () => {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAODataFromGeoJSON(ao))
    dispatch(setAOWithMODataFromGeoJSON(mo))
  }, [ao])

  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch('http://37.230.196.15/arrangeKali/')
      if (response.ok) {
        setLoader(prevState => !prevState)
      }
    }
    fetchData()
  },[])

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