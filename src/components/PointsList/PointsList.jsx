import React, {useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table} from 'antd';

import {fetchPointsList} from '../../store/slices/pointsListSlice';

import './PointsList.scss';


const PointsList = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchPointsList());
  }, [dispatch]);

  const pointsList = useSelector(state => state.pointsList.pointsListData);
  console.log(pointsList);

  // const columns = [
  //   {Title: 'admArea', dataIndex: 'admArea', key: 'admArea'},
  //   {Title: 'district', dataIndex: 'district', key: 'district'},
  //   {Title: 'modelPointRate', dataIndex: 'modelPointRate', key: 'modelPointRate'},
  //   {Title: 'nearestAddress', dataIndex: 'nearestAddress', key: 'nearestAddress'},
  //   {Title: 'nearestObject', dataIndex: 'nearestObject', key: 'nearestObject'},
  //   {Title: 'nearestVisitors', dataIndex: 'nearestVisitors', key: 'nearestVisitors'},
  //   {Title: 'nearestWorkingTime', dataIndex: 'nearestWorkingTime', key: 'nearestWorkingTime'},
  // ];

  const data = [...pointsList.map(points => ({
    admArea: points.admArea,
    district: points.district,
    modelPointRate: points.modelPointRate,
    nearestAddress: points.nearestAddress,
    nearestObject: points.nearestObject,
    nearestVisitors: points.nearestVisitors,
    nearestWorkingTime: points.nearestWorkingTime,
    key: points.point_id
  }))];

  //TODO: Изменить ширину ячеек таблицы
  return (
    <Table dataSource={data} scroll={{y: 'calc(100vh - 250px)'}} bordered pagination={{position: ['bottomCenter']}} >
      <Table.Column title="Административный округ" dataIndex="admArea" key="admArea" />
      <Table.Column title="Район" dataIndex="district" key="district"/>
      <Table.Column title="Показатель востребованности" dataIndex="modelPointRate" key="modelPointRate"/>
      <Table.Column title="Адрес" dataIndex="nearestAddress" key="nearestAddress"/>
      <Table.Column title="Название" dataIndex="nearestObject" key="nearestObject"/>
      <Table.Column title="Кол-во посетителей" dataIndex="nearestVisitors" key="nearestVisitors"/>
      <Table.Column title="Время работы" dataIndex="nearestWorkingTime" key="nearestWorkingTime"
                    render={(_, record) => {
                      const timeSplitted = record.nearestWorkingTime.split(',');
                      return (
                        <>
                          {timeSplitted.map(time => (
                            <p style={{margin: 0}}>{`${time}\n`}</p>
                          ))}
                        </>
                      );
                    }}/>
    </Table>
  );
};

export default PointsList;