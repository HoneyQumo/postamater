import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchOrderId = createAsyncThunk(
  'pointsList/fetchOrderId',
  async function(formData) {
    try {
      console.log(formData);
      const {targetArea, targetDistrict, typeObject, targetDoorstep, targetCoverage, targetPostsNumber} = formData;
      const response = await fetch(`http://37.230.196.15/arrangeKali/api/v1/postArrangeOrder/?targetArea=${targetArea}&targetDistrict=${targetDistrict}&typeObject=${typeObject}&targetDoorstep=${targetDoorstep}&targetCoverage=${targetCoverage}&targetPostsNumber=${targetPostsNumber}`);
      const resData = await response.json();
      console.log(resData);
      return resData
    }catch (e) {
      throw new Error(e)
    }
  }
)

const pointsListSlice = createSlice({
  name: 'pointsList',
  initialState: {
    AOData: {name: [], abbrev: []},
    AOWithMOData: [],
    orderId: undefined,
    dataOrder: [],
    statusOrder: undefined,
    errorOrder: undefined
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
    [fetchOrderId.pending]: (state, action) => {
      state.errorOrder = ''
      state.statusOrder = 'pending'
    },
    [fetchOrderId.fulfilled]: (state, action) => {
      state.errorOrder = ''
      state.statusOrder = 'fulfilled'
      state.orderId = action.payload.arrangeId
      state.dataOrder = action.payload.data


    },
    [fetchOrderId.rejected]: (state, action) => {
      state.errorOrder = action.payload
      state.statusOrder = 'rejected'
    },
  }
})

export const {getAODataFromGeoJSON, setAOWithMODataFromGeoJSON} = pointsListSlice.actions

export default pointsListSlice.reducer