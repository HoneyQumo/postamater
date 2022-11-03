import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchPointsList = createAsyncThunk(
  'pointsList/fetchPointsList',
  async function () {
    try {
      const response = await fetch('http://37.230.196.15/arrangeKali/api/v1/get_points_list/arrangeId')
      return await response.json()

    } catch (e) {
      throw new Error(e)
    }
  }
)

const pointsListSlice = createSlice({
  name: 'pointsList',
  initialState: {
    pointsListData: [],
    status: undefined,
    error: undefined,
    admAreaList: [],
    districtList: []
  },
  reducers: {},
  extraReducers: {
    [fetchPointsList.pending]: (state) => {
      state.error = ''
      state.status = 'pending'
    },
    [fetchPointsList.fulfilled]: (state, action) => {
      state.error = ''
      state.status = 'fulfilled'
      state.pointsListData = action.payload.data

      // Добавление в массив уникальных значений admArea
      state.pointsListData.map((point) => {
        if (!state.admAreaList.includes(point.admArea)) {
          state.admAreaList.push(point.admArea)
        }
        return undefined
      })

      state.pointsListData.map((point) => {
        if (!state.districtList.includes(point.district)) {
          state.districtList.push(point.district)
        }
        return undefined
      })

    },
    [fetchPointsList.rejected]: (state, action) => {
      state.error = action.payload
      state.status = 'rejected'
    }
  }
})

export const {filterAdmArea} = pointsListSlice.actions

export default pointsListSlice.reducer