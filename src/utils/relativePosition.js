// local imports
import { sidebarWidth } from 'interface/Sidebar/styles'

// this function takes coordinates in the browser, and returns their location relative
// to the upper left corner of the diagram
const relativePosition = ({x, y}, info) => {
    if (!info) {
        info = {pan: {x: 0, y:0}}
    }

    // for now, just incorporate the sidebar
    return {
        x: x - sidebarWidth - info.pan.x,
        y: y - info.pan.y,
    }
}

export default relativePosition