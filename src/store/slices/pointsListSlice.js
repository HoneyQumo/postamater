import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import mo from '../../geojson/mo.json';

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
    AOData: {name: [], abbrev: []},
    AOWithMOData: []
  },
  reducers: {
    getAODataFromGeoJSON(state, action) {
      action.payload.features.forEach((item) => {
        state.AOData.name.push(item.properties.NAME)
        state.AOData.abbrev.push(item.properties.ABBREV)
      })
    },
    setAOWithMODataFromGeoJSON(state, action) {
      const MOData = [];
      state.AOData.name.forEach((AO, i) => {
        MOData.push({[AO]: []});

        for (let a = 0; a < action.payload.features.length; a++) {
          if (action.payload.features[a].properties.NAME_AO === AO) {
            MOData[i][AO].push(action.payload.features[a].properties.NAME)
          }
        }
      });
      state.AOWithMOData = MOData
    }
  },
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

export const {filterAdmArea, getAODataFromGeoJSON, setAOWithMODataFromGeoJSON} = pointsListSlice.actions

export default pointsListSlice.reducer