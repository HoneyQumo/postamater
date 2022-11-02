import React, {useEffect} from 'react';
import {Divider, Form, Input, Select} from 'antd';

import './MapSidebar.scss';
import {useDispatch, useSelector} from 'react-redux';
import {filterAdmArea} from '../../../store/slices/pointsListSlice';


const MapSidebar = () => {
  const admAreas = useSelector(state => state.pointsList.admAreaList);


  return (
    <>
      <Form layout="vertical" className="mapForm">
        <Form.Item className="mapForm__item" label="Административный округ" name="targetArea">
          {/*TODO: Настроить поиск вне зависимости от регистра*/}
          <Select
            showSearch
            placeholder="Введите административный округ"
            optionFilterProp="item"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={admAreas.map((item, i) => {
              return {value: i, label: item};
            })}
          />
        </Form.Item>
        <Divider className="mapForm__divider"/>
        <Form.Item className="mapForm__item" label="Муниципалитет" name="targetDistrict">
          <Input/>
        </Form.Item>
        <Divider className="mapForm__divider"/>
        <Form.Item className="mapForm__item" label="Доступность (в метрах)" name="targetDoorstep">
          <Input/>
        </Form.Item>
        <Divider className="mapForm__divider"/>
        <Form.Item className="mapForm__item" label="Доступность (в метрах)" name="targetDoorstep">
          <Input/>
        </Form.Item>
      </Form>
    </>
  );
};

export default MapSidebar;