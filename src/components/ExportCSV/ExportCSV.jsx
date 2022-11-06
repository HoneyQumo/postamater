import React from 'react';
import CSVDownload from 'react-csv/src/components/Download';
import {CSVLink} from 'react-csv';
import {useSelector} from 'react-redux';

const ExportToCSV = () => {
  const pointsList = useSelector(state => state.pointsList.pointsListData);

  const headers = [
    {label: 'Административный округ', key: 'admArea'},
    {label: 'Район', key: 'district'},
    {label: 'Показатель востребованности', key: 'modelPointRate'},
    {label: 'Адрес', key: 'nearestAddress'},
    {label: 'Название', key: 'nearestAddress'},
    {label: 'Кол-во посетителей', key: 'nearestVisitors'},
    {label: 'Время работы', key: 'nearestWorkingTime'},
  ];

  const data = [...pointsList.map(points => ({
    admArea: points.admArea,
    district: points.district,
    modelPointRate: points.modelPointRate,
    nearestAddress: points.nearestAddress,
    nearestObject: points.nearestObject,
    nearestVisitors: points.nearestVisitors,
    nearestWorkingTime: points.nearestWorkingTime,
  }))];

  return (
    <CSVLink data={data} headers={headers} filename={`${Date.now()}.csv`} target="_blank">
      Выгрузить данные
    </CSVLink>
  );
};

export default ExportToCSV;