window.saveDataAcrossSessions = true

const LEFT_SIDE = window.innerWidth / 3
const RIGHT_SIDE = window.innerWidth - LEFT_SIDE

const TOP_SIDE = window.innerHeight / 3
const BOTTOM_SIDE = window.innerHeight - TOP_SIDE

let horizontal_look_direction = null
let vertical_look_direction = null

webgazer
    .setGazeListener((data, timestamp) => {

        if (data == null) return
        // console.log(data)

        if (data.x < LEFT_SIDE) {
            if (data.y < TOP_SIDE) {
                console.log("Pic 1")
            } else if (data.y >= BOTTOM_SIDE) {
                console.log("Pic 7")
            } else {
                console.log("Pic 4")
            }
        } else if (data.x >= RIGHT_SIDE) {
            if (data.y < TOP_SIDE) {
                console.log("Pic 3")
            } else if (data.y >= BOTTOM_SIDE) {
                console.log("Pic 9")
            } else {
                console.log("Pic 6")
            }
        } else {
            if (data.y < TOP_SIDE) {
                console.log("Pic 2")
            } else if (data.y >= BOTTOM_SIDE) {
                console.log("Pic 5")
            } else {
                console.log("Pic 8")
            }
        } 
    })
    .begin()