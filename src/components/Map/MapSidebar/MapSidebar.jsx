import React from 'react';
import {Button, Divider, Form, InputNumber, Select, Slider} from 'antd';

import './MapSidebar.scss';
import {useSelector} from 'react-redux';


const MapSidebar = () => {
  const admAreas = useSelector(state => state.pointsList.admAreaList);
  const districtList = useSelector(state => state.pointsList.districtList);


  return (
    <>
      <Form layout="vertical" className="mapForm" onFinish={(e) => {console.log(e);}}>
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
            options={admAreas.map((item) => {
              return {value: item, label: item};
            })}
          />
        </Form.Item>
        <Divider className="mapForm__divider"/>
        <Form.Item className="mapForm__item" label="Муниципалитет" name="targetDistrict">
          <Select
            showSearch
            placeholder="Укажите район"
            optionFilterProp="item"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={districtList.map((item) => {
              return {value: item, label: item};
            })}
          />
        </Form.Item>
        <Divider className="mapForm__divider"/>
        <Form.Item className="mapForm__item" label="Доступность (в метрах)" name="targetDoorstep" initialValue={100}>
          <InputNumber min={1} max={3000} style={{width: '100%'}} addonAfter="метров"/>
        </Form.Item>
        <Divider className="mapForm__divider"/>
        <Form.Item className="mapForm__item" label="Охват населения Москвы (в %)" name="targetCoverage"
                   initialValue={10}>
          <Slider min={1} max={100} marks={{0: {style: {color: 'black'}, label: '0%'}, 100: {style: {color: 'black'}, label: '100%'}}}
                  trackStyle={{backgroundColor: '#cc2222'}}
                  handleStyle={{backgroundColor: '#cc2222', borderColor: 'lightgray'}}
          />
        </Form.Item>
        <Divider className="mapForm__divider"/>
        <Form.Item className="mapForm__item" label="Целевое количество постаматов" name="targetPostsNumber" initialValue={50}>
          <InputNumber min={1} max={4000} style={{width: '100%'}} addonAfter="шт"/>
        </Form.Item>
        <Divider className="mapForm__divider"/>
        <Form.Item className="mapForm__item mapForm__buttons">
          <Button type="primary" htmlType="submit" className="mapForm__button">Отправить</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default MapSidebar;