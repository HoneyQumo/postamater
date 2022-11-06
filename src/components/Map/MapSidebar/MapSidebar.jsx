import React, {useRef, useState} from 'react';
import {Button, Checkbox, Divider, Form, InputNumber, Select, Slider} from 'antd';

import './MapSidebar.scss';
import {useSelector} from 'react-redux';
import ExportToCSV from '../../ExportCSV/ExportCSV';


const MapSidebar = () => {
  const AOData = useSelector(state => state.pointsList.AOData);
  const AOWithMOData = useSelector(state => state.pointsList.AOWithMOData);
  const [targetDistrictList, setTargetDistrictList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const typesObject = ['Киоски', 'МФЦ', 'Библиотеки', 'Дома культуры', 'Спортивные объекты'];
  const refForm = useRef(null);


  const handleAOInputSelect = (value) => {
    const findDist = AOWithMOData.find((item) => Object.keys(item)[0] === value);
    setTargetDistrictList(findDist[value].map((item) => ({value: item, label: item})));
  };

  const handleCheckboxToggle = (event) => {
    setSelectAll(event.target.checked);
  };

  const onReset = () => {
    refForm.current.resetFields();
  };

  const handleFormSubmit = (formData) => {
    console.log(formData);
    const {targetArea, targetDistrict, typeObject, targetDoorstep, targetCoverage, targetPostsNumber} = formData;

    if (selectAll) {
      refForm.current.setFieldValue('targetArea', AOData.name);
      const tempArr = [];
      AOWithMOData.forEach((item) => {
        const temp = Object.values(item)[0];
        tempArr.push(...temp);
      });
      refForm.current.setFieldValue('targetDistrict', tempArr);
      refForm.current.setFieldValue('typeObject', typesObject);

    }

    const fetchOrderId = async () => {
      const response = await fetch(`http://37.230.196.15/arrangeKali/api/v1/postArrangeOrder/?targetArea=${targetArea}&targetDistrict=${targetDistrict}&typeObject=${typeObject}&targetDoorstep=${targetDoorstep}&targetCoverage=${targetCoverage}&targetPostsNumber=${targetPostsNumber}`);
      const resData = await response.json();
      console.log(resData);
    };
    fetchOrderId();
    // refForm.current.resetFields();
  };

  return (
    <>
      <Form layout="vertical" className="mapForm" onFinish={handleFormSubmit} ref={refForm}>
        <Form.Item className="mapForm__item" name="selectAll">
          <Checkbox onChange={handleCheckboxToggle} checked={selectAll} value={selectAll}>Выбрать все</Checkbox>
        </Form.Item>
        <Form.Item className="mapForm__item" label="Административный округ" name="targetArea">
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
        <Form.Item className="mapForm__item" label="Тип объекта" name="typeObject">
          <Select
            mode="multiple"
            allowClear
            maxTagCount="responsive"
            placeholder="Выберите тип объекта"
            disabled={selectAll}
            options={typesObject.map((item) => {
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
                  marks={{0: {style: {color: 'black', paddingLeft: '15px'}, label: '0%'}, 100: {style: {color: 'black',  paddingRight: '15px'}, label: '100%'}}}
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
        <Form.Item className="mapForm__item"  >
          <div className=" mapForm__buttons">
            <Button type="primary"
                    htmlType="button"
                    className="mapForm__button-reset"
                    onClick={onReset}
            >
              Очистить
            </Button>
            <Button type="primary" htmlType="submit" className="mapForm__button">Отправить</Button>
          </div>
        </Form.Item>
      </Form>
      <Button type={'primary'} block ghost>
        <ExportToCSV />
      </Button>
    </>
  );
};

export default MapSidebar;