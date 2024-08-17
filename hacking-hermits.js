
// DOM Utils
const dom = {
    getEl: id => document.getElementById(id),
    createEl: type => document.createElement(type),
    appendEl: (parentId, el) => {
        let parent = dom.getEl(parentId)
        parent.appendChild(el)
    },
    getCursor: event => {
        return {
            x: event.clientX,
            y: event.clientY
        }
    },
    getBodyWidth: () => document.body.clientWidth
}


const CONFIG = {
}

// DOM Elements
const beginButton = dom.getEl('load-arena-button')
const gameStats = dom.getEl('game-stats')
const actionBox = dom.getEl('action-box')
const actionBoxContent = dom.getEl('action-box-content')
const clearActionButton = dom.getEl('clear-action-button')

// Event Listeners
beginButton.addEventListener('click', () => {
    beginButton.style.display = 'none'
    gameStats.style.display='block'
    game.init()
}, false)

clearActionButton.addEventListener('click', () => {
    actionBox.style.display = 'none'
}, false)


const game = {

    playerStats: {
    },

    gameStats: {
    },

    dialog: {
 	instructions: {
  	    intro: "Inroduction Text",
            howTo: "How To"
	}
    },

    init() {

    },

    updateStats: () => {
    },

    // Display action box pop up.
    // promptMode can be 'mine' or 'kit'
    displayActionBox: (promptMode, x, y) => {

    // If action box X > 2/3 * 2 of screen, subtract action box width 
    x -= x > (Math.floor(dom.getBodyWidth() / 3) * 2) ? 300 : 0
        actionBox.style.display = "block"
        actionBox.style.position = "fixed"
        actionBox.style.left = `${x}px`
        actionBox.style.top = `${y}px`

    }

}
