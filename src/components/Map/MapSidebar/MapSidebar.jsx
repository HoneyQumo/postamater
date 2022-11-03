import React, {useEffect, useState} from 'react';
import {Button, Divider, Form, InputNumber, Select, Slider} from 'antd';

import './MapSidebar.scss';
import {useSelector} from 'react-redux';


const MapSidebar = () => {
  const AOData = useSelector(state => state.pointsList.AOData)
  const AOWithMOData = useSelector(state => state.pointsList.AOWithMOData)
  const [districtList, setDistrictList] = useState([])

  const handleAOInputSelect = (value) => {
    AOWithMOData.forEach((item) => {
      if (Object.keys(item)[0] === value) {
        setDistrictList(item[value]);
      }
    })
  }


  const handleFormSubmit = (data) => {
    console.log(data);
    // const targetArea = data.targetArea;
    // const targetDistrict = data.targetDistrict;
    // const targetDoorstep = data.targetDoorstep;
    // const targetCoverage = data.targetCoverage;
    // const targetPostsNumber = data.targetPostsNumber;
    //
    // const fetchData = async () => {
    //   const response = await fetch(`http://37.230.196.15/arrangeKali/api/v1/postArrangeOrder/?targetArea=${targetArea}&targetDistrict=${targetDistrict}&targetDoorstep=${targetDoorstep}&targetCoverage=${targetCoverage}&targetPostsNumber=${targetPostsNumber}`);
    //   const data = await response.json()
    //   console.log(data);
    // };
    // fetchData()
  };


  return (
    <>
      <Form layout="vertical" className="mapForm" onFinish={handleFormSubmit}>
        <Form.Item className="mapForm__item" label="Административный округ" name="targetArea" >
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
            showSearch
            disabled={districtList.length === 0}
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