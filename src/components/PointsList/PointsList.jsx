import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Table, Typography} from 'antd';


import './PointsList.scss';

const PointsList = () => {
  const dataOrder = useSelector(state => state.pointsList.dataOrder.table);
  const [dataOrderTable, setDataOrderTable] = useState([])
  console.log('dataOrder: ',dataOrder);

  useEffect(() => {
    if (dataOrder) {
      setDataOrderTable(dataOrder)
    }
  }, [dataOrder])

  const data = [...dataOrderTable.map((points,i) => ({
    category: points.category,
    commonName: points.commonname,
    flatsVolume: points.flatsvolume,
    trafficRate: points.trafficrate,
    key: i
  }))];

  //TODO: Изменить ширину ячеек таблицы

  return (
    <Table dataSource={data} scroll={{y: 'calc(100vh - 244px)'}} bordered pagination={{position: ['bottomCenter'], simple: true }} loading={dataOrderTable.length === 0} >
      {/*<Table.Column title="Административный округ" dataIndex="admArea" key="admArea"/>*/}
      {/*<Table.Column title="Район" dataIndex="district" key="district"/>*/}
      {/*<Table.Column title="Показатель востребованности" dataIndex="modelPointRate" key="modelPointRate" sorter={(a,b) => a.modelPointRate - b.modelPointRate} showSorterTooltip={false} />*/}
      {/*<Table.Column title="Адрес" dataIndex="nearestAddress" key="nearestAddress"/>*/}
      {/*<Table.Column title="Название" dataIndex="nearestObject" key="nearestObject"/>*/}
      {/*<Table.Column title="Кол-во посетителей" dataIndex="nearestVisitors" key="nearestVisitors" />*/}
      {/*<Table.Column title="Время работы" dataIndex="nearestWorkingTime" key="nearestWorkingTime"*/}
      {/*              render={(_, record) => {*/}
      {/*                const timeSplitted = record.nearestWorkingTime.split(',');*/}
      {/*                return (*/}
      {/*                  <Typography.Paragraph*/}
      {/*                    ellipsis={{expandable: true, rows: 1, symbol: 'раскрыть'}}*/}
      {/*                    style={{margin: 0}}*/}
      {/*                  >*/}
      {/*                    {timeSplitted.map((time,i) => (*/}
      {/*                      <p style={{margin: 0}} key={i}>*/}
      {/*                        {`${time}`} <br/>*/}
      {/*                      </p>*/}
      {/*                    ))}*/}
      {/*                  </Typography.Paragraph>*/}
      {/*                );*/}
      {/*              }}/>*/}
      {dataOrderTable.length === 0 ? null : (
        <>
          <Table.Column title="Тип объекта" dataIndex="category" key="category"/>
          <Table.Column title="Полное название" dataIndex="commonName" key="commonName"/>
          <Table.Column title="Трафик (Целевой показатель)" dataIndex="flatsVolume" key="flatsVolume" sorter={(a,b) => a.flatsVolume - b.flatsVolume} showSorterTooltip={false} />
          <Table.Column title="Показатель востребованности" dataIndex="trafficRate" key="trafficRate" sorter={(a,b) => a.trafficRate - b.trafficRate} showSorterTooltip={false} />
        </>
      )
      }
    </Table>
  );
};

export default PointsList;