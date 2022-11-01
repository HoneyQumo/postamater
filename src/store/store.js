import {configureStore} from '@reduxjs/toolkit';
import pointsListSlice from './slices/pointsListSlice';


export const store = configureStore({
  reducer: {
    pointsList: pointsListSlice
  }
});

