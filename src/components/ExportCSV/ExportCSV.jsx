import React, {useEffect, useState} from 'react';
import CSVDownload from 'react-csv/src/components/Download';
import {CSVLink} from 'react-csv';
import {useSelector} from 'react-redux';
import {Table} from 'antd';

const ExportToCSV = () => {
  const dataOrder = useSelector(state => state.pointsList.dataOrder.table);
  const [dataOrderTable, setDataOrderTable] = useState([])

  useEffect(() => {
    if (dataOrder) {
      setDataOrderTable(dataOrder)
    }
  }, [dataOrder])


  const headers = [
    {label: 'Тип объекта', key: 'category'},
    {label: 'Полное название', key: 'commonName'},
    {label: 'Трафик (Целевой показатель)', key: 'flatsVolume'},
    {label: 'Показатель востребованности', key: 'trafficRate'},
  ];

  const data = [...dataOrderTable.map(points => ({
    category: points.category,
    commonName: points.commonname,
    flatsVolume: points.flatsvolume,
    trafficRate: points.trafficrate,
  }))];

  return (
    <CSVLink data={data} headers={headers} filename={`${Date.now()}.csv`} target="_blank">
      Выгрузить данные
    </CSVLink>
  );
};

export default ExportToCSV;