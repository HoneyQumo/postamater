import React, {useRef, useState} from 'react';
import {Button, Checkbox, Divider, Form, InputNumber, Select, Slider} from 'antd';

import './MapSidebar.scss';
import {useSelector} from 'react-redux';


const MapSidebar = () => {
  const AOData = useSelector(state => state.pointsList.AOData);
  const AOWithMOData = useSelector(state => state.pointsList.AOWithMOData);
  const [targetDistrictList, setTargetDistrictList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const refForm = useRef(null);


  const handleAOInputSelect = (value) => {
    const findDist = AOWithMOData.find((item) => Object.keys(item)[0] === value);
    setTargetDistrictList(findDist[value].map((item) => ({value: item, label: item})));
  };

  const handleCheckboxToggle = (event) => {
    setSelectAll(event.target.checked);
  };

  const handleFormSubmit = (formData) => {
    console.log(formData);
    const {targetArea, targetDistrict, targetDoorstep, targetCoverage, targetPostsNumber} = formData;

    if (selectAll) {
      refForm.current.setFieldValue('targetArea', AOData.name);
      const tempArr = [];
      AOWithMOData.forEach((item) => {
        const temp = Object.values(item)[0];
        tempArr.push(...temp);
      });
      refForm.current.setFieldValue('targetDistrict', tempArr);
    }

    const fetchOrderId = async () => {
      const response = await fetch(`http://37.230.196.15/arrangeKali/api/v1/postArrangeOrder/?targetArea=${targetArea}&targetDistrict=${targetDistrict}&targetDoorstep=${targetDoorstep}&targetCoverage=${targetCoverage}&targetPostsNumber=${targetPostsNumber}`);
      const resData = await response.json();
      console.log(resData);
    };
    fetchOrderId();
    // refForm.current.resetFields();
  };


  return (
    <>
      <Form layout="vertical" className="mapForm" onFinish={handleFormSubmit} ref={refForm}>
        <Form.Item className="mapForm__item" label="Административный округ" name="targetArea">
          {/*<Checkbox onChange={handleCheckboxToggle} checked={selectAll}>Выбрать все АО</Checkbox>*/}
          <Select
            disabled={selectAll}
            onSelect={handleAOInputSelect}
            showSearch
            placeholder="Введите административный округ"
            optionFilterProp="item"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={AOData.name.map((item, i) => {
              // АККУРАТНО value: AOData.name, label: AOData.name + AOData.abbrev[i]
              return {value: item, label: `${item} (${AOData.abbrev[i]})`};
            })}
          />
        </Form.Item>
        <Divider className="mapForm__divider"/>
        <Form.Item className="mapForm__item" label="Район" name="targetDistrict">
          <Select
            mode="multiple"
            allowClear
            maxTagCount="responsive"
            placeholder={targetDistrictList.length === 0 ? 'Сначала выберите АО' : 'Укажите район(ы)'}
            disabled={selectAll}
            options={targetDistrictList}
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