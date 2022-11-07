import React, {useRef, useState} from 'react';
import {Button, Checkbox, Divider, Form, InputNumber, Select, Slider} from 'antd';

import './MapSidebar.scss';
import {useDispatch, useSelector} from 'react-redux';
import ExportToCSV from '../../ExportCSV/ExportCSV';
import {fetchOrderId} from '../../../store/slices/pointsListSlice';


const MapSidebar = () => {
  const AOData = useSelector(state => state.pointsList.AOData);
  const AOWithMOData = useSelector(state => state.pointsList.AOWithMOData);
  const statusOrder = useSelector(state => state.pointsList.statusOrder);
  const [targetDistrictList, setTargetDistrictList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const typesObject = ['Киоски', 'МФЦ', 'Библиотеки', 'Дома культуры', 'Спортивные объекты'];
  const refForm = useRef(null);
  const dispatch = useDispatch();

  const handleAOInputSelect = (value) => {
    refForm.current.setFieldValue('targetDistrict', undefined);
    const findDist = AOWithMOData.find((item) => Object.keys(item)[0] === value);
    setTargetDistrictList(findDist[value].map((item) => ({value: item, label: item})));
  };

  const handleCheckboxToggle = (event) => {
    setSelectAll(event.target.checked);

    if (event.target.checked) {
      refForm.current.setFieldValue('targetArea', AOData.name);
      const tempArr = [];
      AOWithMOData.forEach((item) => {
        const temp = Object.values(item)[0];
        tempArr.push(...temp);
      });
      refForm.current.setFieldValue('targetDistrict', tempArr);
      refForm.current.setFieldValue('typeObject', typesObject);
    } else {
      refForm.current.resetFields();
    }
  };

  const onReset = () => {
    refForm.current.resetFields();
  };

  const handleFormSubmit = (formData) => {
    let {targetArea, targetDistrict, typeObject, targetDoorstep, targetCoverage, targetPostsNumber} = formData;

    const formDataTemp = {
      targetArea,
      targetDistrict,
      typeObject,
      targetDoorstep,
      targetCoverage,
      targetPostsNumber
    };

    if (selectAll) {
      formDataTemp.targetDistrict = '';
    }

    if (typeof formDataTemp.targetArea === 'undefined') {
      formDataTemp.targetArea = '';
    }
    if (typeof formDataTemp.targetDistrict === 'undefined') {
      formDataTemp.targetDistrict = '';
    }
    if (typeof formDataTemp.typeObject === 'undefined') {
      formDataTemp.typeObject = '';
    }
    if (typeof formDataTemp.targetDoorstep === 'undefined') {
      formDataTemp.targetDoorstep = '';
    }
    if (typeof formDataTemp.targetCoverage === 'undefined') {
      formDataTemp.targetCoverage = '';
    }
    if (typeof formDataTemp.targetPostsNumber === 'undefined') {
      formDataTemp.targetPostsNumber = '';
    }

    dispatch(fetchOrderId(formDataTemp))
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
        <Form.Item className="mapForm__item" label="Доступность (в метрах)" name="targetDoorstep" initialValue={400} >
          <InputNumber min={1} max={3000} style={{width: '100%'}} addonAfter="метров" disabled />
        </Form.Item>
        <Divider className="mapForm__divider"/>
        <Form.Item className="mapForm__item" label="Охват населения Москвы (в %)" name="targetCoverage"
                   initialValue={10}>
          <Slider min={1} max={100}
                  marks={{
                    0: {style: {color: 'black', paddingLeft: '15px'}, label: '0%'},
                    100: {style: {color: 'black', paddingRight: '15px'}, label: '100%'}
                  }}
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
        <Form.Item className="mapForm__item">
          <div className=" mapForm__buttons">
            <Button type="primary"
                    htmlType="button"
                    className="mapForm__button-reset"
                    onClick={onReset}
            >
              Очистить
            </Button>
            <Button type="primary" htmlType="submit" className="mapForm__button" loading={statusOrder === 'pending'} >Отправить</Button>
          </div>
        </Form.Item>
      </Form>
      <Button type={'primary'} block ghost>
        <ExportToCSV/>
      </Button>
    </>
  );
};

export default MapSidebar;