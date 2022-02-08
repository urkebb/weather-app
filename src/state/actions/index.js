
export const changeBgColorAction = (state, action) => {

    const { payload } = action;
    console.log(payload)
    const res = Math.floor(4 - (Math.abs(payload) / 10))

    // if temp is greater than 40
    if (payload > 40) {
        state.gradientColors = [
            state.allColors[state.allColors.length - 2],
            state.allColors[state.allColors.length - 1]
        ]
    }
    // if temp is less than -40
    else if (payload < -40) {
        state.gradientColors = [
            state.allColors[0],
            state.allColors[1]
        ]
    }
    // if temperature is greater than 0

    else if (payload > 0) {

        state.gradientColors = [
            state.allColors[state.allColors.length - 1 - res - 1],
            state.allColors[state.allColors.length - 1 - res]
        ]
    }
    // if temperature is smaller then 0 
    else if (payload < 0) {

        state.gradientColors = [
            state.allColors[res],
            state.allColors[res + 1]
        ]
    }
    // if temperature is 0
    else if (payload === 0) {
        state.gradientColors = [
            state.allColors[res],
            state.allColors[res + 1]
        ]
    }
    else {
        state.gradientColors = null
    }

}