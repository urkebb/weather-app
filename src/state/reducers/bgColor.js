import { createSlice } from '@reduxjs/toolkit';
import { changeBgColorAction } from '../actions';


const bgColorSlice = createSlice({
    name: "color",
    initialState: {
        gradientColors: null,
        allColors: [
            'rgb(11, 0, 114)', // -40
            'rgb(0, 116, 170)', // -30
            'rgb(0, 174, 255)', // -20
            'rgba(0, 174, 255, 0.55)', // -10
            'rgba(0, 217, 255, 0.3)', // 0
            'rgba(255, 238, 0, 0.2)', // 10
            'rgba(255, 196, 0, 0.6)', // 20
            'rgba(255, 145, 0, 0.8)', // 30
            'rgba(255, 115, 0, 1)' // 40
        ]
    },
    reducers: {
        changeBgColor: changeBgColorAction
    }
})



export const { changeBgColor } = bgColorSlice.actions;
export default bgColorSlice.reducer;