import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchPointsList = createAsyncThunk(
  'pointsList/fetchPointsList',
  async function () {
    try {
      const response = await fetch('http://au-yakovlevnote.mipcnet.org:5000/arrangeKali/api/v1/get_points_list/arrangeId')
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
    error: undefined
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
    },
    [fetchPointsList.rejected]: (state, action) => {
      state.error = action.payload
      state.status = 'rejected'
    }
  }
})

export default pointsListSlice.reducer