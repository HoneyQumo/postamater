import React from 'react';
import {Divider, InputNumber, Select} from 'antd';

import './MapSidebar.scss'

const {Option} = Select

const MapSidebar = () => {
  return (
    <>
      <Divider plain orientation="left" style={{margin: '5px 0'}}>Административный округ</Divider>
      <Select showSearch placeholder="Укажите адм. округ"
              className="sidebar__selectRegion"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
      >
        <Option value="1">Центральный административный округ</Option>
        <Option value="2">Северный административный округ</Option>
        <Option value="3">Северо-Восточный административный округ</Option>
        <Option value="4">Восточный административный округ</Option>
        <Option value="5">Юго-Восточный административный округ</Option>
        <Option value="6">Южный административный округ</Option>
      </Select>
      <Divider plain orientation="left" style={{margin: '5px 0'}}>Муниципалитет</Divider>
      <div className='sidebar__inputAccessibility-block' >
        <Divider plain orientation="left" style={{margin: '5px 0 '}} >Доступность (в метрах)</Divider>
        <InputNumber min={0} className='sidebar__inputAccessibility' />
        <Divider style={{marginTop: '5px'}} />
      </div>
      <Divider plain orientation="left" style={{margin: '5px 0'}}>Охват населения г.Москва (%)</Divider>
      <Divider plain orientation="left" style={{margin: '5px 0'}}>Целевое количество постаматов</Divider>

    </>
  );
};

export default MapSidebar;