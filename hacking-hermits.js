
// DOM Utils
const dom = {
    getEl: id => document.getElementById(id),
    createEl: type => document.createElement(type),
    assignClass: (el, name) => el.className = name,
    assignId: (el, name) => el.id = name,
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
    crabImagePath: 'hermit-crab.webp',
    nodeAmount: 15
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

    crabNodes: [],
    playerStats: {},
    gameStats: {},

    dialog: {
 	    instructions: {
  	        intro: "Inroduction Text",
            howTo: "How To"
	    },
    },

    init() {
        for (let i = 0; i < CONFIG.nodeAmount; i++) {
            game.crabNodes.push(game.generateNode(i)) // i is used for node ids
        }
    },

    generateNode: id => {

        const crabNode =  dom.createEl('div')
        dom.assignClass(crabNode, 'crab-node')
        dom.appendEl('arena', crabNode)

        const screen = dom.createEl('div')
        dom.assignClass(screen, 'screen')

        const screenTopBar = dom.createEl('p')        
        dom.assignClass(screenTopBar, 'screen-top-bar')

        const menu = dom.createEl('span')
        const help = dom.createEl('span')
        menu.innerText = 'Menu'
        help.innerText = 'Help'

        const nodeInput = dom.createEl('textarea')
        dom.assignClass(nodeInput, 'node-input')

        const crabChar = dom.createEl('div')
        dom.assignClass(crabChar, 'crab-char')

        const crabImg = dom.createEl('img')
        crabImg.src = CONFIG.crabImagePath

        crabNode.appendChild(screen)
        screen.appendChild(screenTopBar)
        screenTopBar.appendChild(menu)
        screenTopBar.appendChild(help)
        screen.appendChild(nodeInput)
        crabNode.appendChild(crabChar)
        crabChar.appendChild(crabImg)
        
        crabNode.id = `${id}-crab-node`
        return crabNode
    },


    updateStats: () => {},

    // Display action box pop up.
    // promptMode can be 'mine' or 'kit'
    displayActionBox: (promptMode, x, y) => {

    // If action box X > 2/3 * 2 of screen, subtract action box width 
    x -= x > (Math.floor(dom.getBodyWidth() / 3) * 2) ? 300 : 0
        actionBox.style.display = "block"
        actionBox.style.position = "fixed"
        actionBox.style.left = `${x}px`
        actionBox.style.top = `${y}px`
    },

}
