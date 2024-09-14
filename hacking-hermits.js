
// DOM Utils
const dom = {
    byEl: id => document.getElementById(id),
    byClass: name => document.getElementsByClassName(name),
    createEl: type => document.createElement(type),
    assignClass: (el, name) => el.className = name,
    assignId: (el, name) => el.id = name,
    appendEl: (parentId, el) => {
        let parent = dom.byEl(parentId)
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
    nodeAmount: 16
}

// DOM Elements
const menu = dom.byEl('menu')
const beginButton = dom.byEl('load-arena-button')
const gameStats = dom.byEl('game-stats')
const actionBox = dom.byEl('action-box')
const actionBoxContent = dom.byEl('action-box-content')
const clearActionButton = dom.byEl('clear-action-button')
const crabLogo = dom.byEl('crab-logo')

// Event Listeners
beginButton.addEventListener('click', () => {
    beginButton.style.display = 'none'
    // gameStats.style.display='block'
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

        crabNode.addEventListener('click', () => {
            game.enlargeCrabNode(crabNode)
        }, false)

        return crabNode
    },

    parseCrabId: idName => idName.split('-')[0],
    getCrabNodeByClassIndex: (name, index) => dom.byClass(name)[index],

    enlargeCrabNode: crabNodeElement => {
        let id = game.parseCrabId(crabNodeElement.id)
        console.log(id)
        crabNodeElement.className = 'large-crab-node'

        // .screen
        const screen = game.getCrabNodeByClassIndex('screen', id)
        screen.className = 'large-screen'

        // .node-input
        const textarea = game.getCrabNodeByClassIndex('node-input', id)
        textarea.className = 'large-node-input'

        // .crab-char
        const char = game.getCrabNodeByClassIndex('crab-char', id)
        char.className = 'large-crab-char'
    },

    updateStats: () => {},

    // Display action box pop up.
    // Note: x, and y are the current cursor click coords (reused from mine game)
    displayActionBox: (promptMode, x, y) => {

        // If action box X > 2/3 * 2 of screen, subtract action box width 
        x -= x > (Math.floor(dom.getBodyWidth() / 3) * 2) ? 300 : 0
        actionBox.style.display = "block"
        actionBox.style.position = "fixed"
        actionBox.style.left = `${x}px`
        actionBox.style.top = `${y}px`
    },

}
