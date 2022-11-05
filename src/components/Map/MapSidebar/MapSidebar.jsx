import React, {useEffect, useRef, useState} from 'react';
import {Button, Divider, Form, InputNumber, Select, Slider} from 'antd';

import './MapSidebar.scss';
import {useSelector} from 'react-redux';
import {logDOM} from '@testing-library/react';


const MapSidebar = () => {
  const AOData = useSelector(state => state.pointsList.AOData);
  const AOWithMOData = useSelector(state => state.pointsList.AOWithMOData);
  const [targetDistrict, setTargetDistrict] = useState([]);

  const handleAOInputSelect = (value) => {
    setTargetDistrict([]);
    const findDist = AOWithMOData.find((item) => Object.keys(item)[0] === value);
    setTargetDistrict(findDist[value].map((item) => ({value: item, label: item})));
  };


  const handleFormSubmit = (formData) => {
    console.log(formData);
    const {targetArea,targetDistrict, targetDoorstep, targetCoverage, targetPostsNumber } = formData;

    const fetchData = async () => {
      const response = await fetch(`http://37.230.196.15/arrangeKali/api/v1/postArrangeOrder/?targetArea=${targetArea}&targetDistrict=${targetDistrict}&targetDoorstep=${targetDoorstep}&targetCoverage=${targetCoverage}&targetPostsNumber=${targetPostsNumber}`);
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  };

  return (
    <>
      <Form layout="vertical" className="mapForm" onFinish={handleFormSubmit}>
        <Form.Item className="mapForm__item" label="Административный округ" name="targetArea">
          {/*TODO: Настроить поиск вне зависимости от регистра*/}
          <Select
            onSelect={handleAOInputSelect}
            showSearch
            placeholder="Введите административный округ"
            optionFilterProp="item"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={AOData.name.map((item, i) => {
              //TODO: АККУРАТНО value: AOData.name, label: AOData.name + AOData.abbrev[i]
              return {value: item, label: `${item} (${AOData.abbrev[i]})`};
            })}
          />
        </Form.Item>
        <Divider className="mapForm__divider"/>
        <Form.Item className="mapForm__item" label="Район" name="targetDistrict">
          <Select
            onClear={(e) => {console.log(e);}}
            mode="multiple"
            allowClear
            placeholder={targetDistrict.length === 0 ? 'Сначала выберите АО' : 'Укажите район(ы)'}
            disabled={targetDistrict.length === 0}
            options={targetDistrict}

          />
        </Form.Item>
        <Divider className="mapForm__divider"/>
        <Form.Item className="mapForm__item" label="Доступность (в метрах)" name="targetDoorstep" initialValue={100}>
          <InputNumber min={1} max={3000} style={{width: '100%'}} addonAfter="метров"/>
        </Form.Item>
        <Divider className="mapForm__divider"/>
        <Form.Item className="mapForm__item" label="Охват населения Москвы (в %)" name="targetCoverage"
                   initialValue={10}>
          <Slider min={1} max={100}
                  marks={{0: {style: {color: 'black'}, label: '0%'}, 100: {style: {color: 'black'}, label: '100%'}}}
                  trackStyle={{backgroundColor: '#cc2222'}}
                  handleStyle={{backgroundColor: '#cc2222', borderColor: 'lightgray'}}
          />
        </Form.Item>
        <Divider className="mapForm__divider"/>
        <Form.Item className="mapForm__item" label="Целевое количество постаматов" name="targetPostsNumber"
                   initialValue={50}>
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