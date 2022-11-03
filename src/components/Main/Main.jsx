import React, {useEffect} from 'react';
import {Layout} from 'antd';

import Content from '../Content/Content';

import './Main.scss';
import {useSelector} from 'react-redux';

// import mo from '../../geojson/mo.json';


const Main = () => {
  // const nameAO = useSelector(state => state.pointsList.AOData.name);
  //
  // useEffect(() => {
  //   const MOData = [];
  //   nameAO.forEach((AO, i) => {
  //     MOData.push({[AO]: []});
  //
  //     for (let a = 0; a < mo.features.length; a++) {
  //       if (mo.features[a].properties.NAME_AO === AO) {
  //         MOData[i][AO].push(mo.features[a].properties.NAME)
  //       }
  //     }
  //   });
  //   console.log(MOData);
  // }, [nameAO]);


  return (
    <Layout className="main">
      <Content/>
    </Layout>
  );
};

export default Main;