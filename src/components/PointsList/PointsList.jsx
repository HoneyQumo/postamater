import React, {useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {fetchPointsList} from '../../store/slices/pointsListSlice';

const PointsList = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchPointsList());
  }, [dispatch]);

  const pointsList = useSelector(state => state.pointsList.pointsListData);
  console.log(pointsList);

  return (
    <div>
      <table>
        <tbody>
        <tr>
          <td>Округ</td>
          <td>Район</td>
          <td>Показатель востребованности</td>
          <td>Адрес</td>
          <td>Название места</td>
          <td>Кол-во посетителей</td>
          <td>Время работы</td>
        </tr>
          {pointsList.map(point => (
            <tr key={point.point_id}>
              <td>{point.admArea}</td>
              <td>{point.district}</td>
              <td>{point.modelPointRate}</td>
              <td>{point.nearestAddress}</td>
              <td>{point.nearestObject}</td>
              <td>{point.nearestVisitors}</td>
              <td>{point.nearestWorkingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PointsList;