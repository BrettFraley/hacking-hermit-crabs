/**
 *  HACKING HERMIT CRABS by haxxr492 (Brett Fraley) Copyright 2024
 *  Unlicensed until hermit crabs are hacking their way to survive.
 */


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
    nodeAmount: 16,
    crabNodeClassNames: ['screen', 'node-input', 'crab-area'],
    waterSupply: 0,
    waterHealth: 100,
    foodSupply: 0,
    foodHealth: 100,
    shellSupply: 1,
    crabSizeGoal: 10,

    timing: {
        tick: 30000,
        food: 60000,
        water: 30000,  
        shell: 1
    }
}

class CrabNode {
    constructor(id, crab) {
        this.id = id
        this.crab = crab
    }
    waterSupply = CONFIG.waterSupply
    foodSupply = CONFIG.waterHealth
    shellSupply = CONFIG.shellSupply
    UI = {
        statusColor: '#008',
    }
}

class Crab {
    waterHealth = CONFIG.waterHealth
    foodHealth = CONFIG.foodHealth
    size = 1
    alive = true
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
    crabLogo.style.display = 'none'
    game.init()
}, false)

const game = {

    crabNodes: [],
    playerStats: {},
    gameStats: {
        time: {
            totalMins: 0,
        }
    },

    dialog: {
 	    instructions: {
  	        intro: "Inroduction Text",
            howTo: "How To"
	    },
    },

    worldClock: {
        start: () => {
            let flip = false // Flips every minute

            setInterval(() => {
                const totalMins = game.gameStats.time.totalMins
                flip = flip ? false : true

                // Food health
                if (flip) {
                    game.crabNodes.map(each => each.node.crab.foodHealth -= 10)
                    game.gameStats.time.totalMins += 1
                    console.log('Game Mins: ', game.gameStats.time.totalMins)
                }

                // Shell (it's time to molt)
                if (totalMins > 0 && totalMins % CONFIG.timing.shell === 0) {
                    console.log('Molting Time!')
                    game.crabNodes.map(each => game.moltCrab(each.node))
                }

                // Water health (fastest consumed, @ each 'CONFIG.tick')
                game.crabNodes.map(each => each.node.crab.waterHealth -= 10)

                console.table(game.crabNodes[0].node.crab)
            }, 5000) // CONFIG.timing.tick
        }  
    },

    init() {

        game.worldClock.start()

        for (let i = 0; i < CONFIG.nodeAmount; i++) {
            game.crabNodes.push({
                node: new CrabNode(i, new Crab()),
                el: game.generateNode(i)
            })
        }
    },

    generateNode: id => {

        const crabNode =  dom.createEl('div')
        dom.assignClass(crabNode, 'crab-node sm')

        const screen = dom.createEl('div')
        dom.assignClass(screen, 'screen sm')

        const screenTopBar = dom.createEl('p')        
        dom.assignClass(screenTopBar, 'screen-top-bar')

        const menu = dom.createEl('span')
        const help = dom.createEl('span')
        menu.innerText = 'Menu'
        help.innerText = 'Help'

        const nodeInput = dom.createEl('textarea')
        nodeInput.placeholder = `CRAB STATION: NO: ${id}`
        dom.assignClass(nodeInput, 'node-input sm')

        const crabChar = dom.createEl('div')
        dom.assignClass(crabChar, 'crab-area sm')

        const crabImg = dom.createEl('img')
        crabImg.src = CONFIG.crabImagePath

        screen.appendChild(screenTopBar)
        screenTopBar.appendChild(menu)
        screenTopBar.appendChild(help)
        screen.appendChild(nodeInput)
        
        crabNode.id = `${id}-crab-node`

        // NOTE: It matters that crabNode appends to arena last.
        crabNode.appendChild(screen)
        crabNode.appendChild(crabChar)
        crabChar.appendChild(crabImg)
        dom.appendEl('arena', crabNode)

        crabNode.addEventListener('click', () => {
            game.resizeCrabNode(crabNode)
        }, false)

        return crabNode
    },

    // Parse out the crab node index id from id name eg: '9-crab-node'
    parseCrabId: idName => idName.split('-')[0],

    resizeCrabNode: crabNodeElement => {

        // Get the single 'active crab node'
        const currentCrabNode = dom.byClass('crab-node lg')[0] || null

        if (currentCrabNode && currentCrabNode.id !== crabNodeElement.id) {
            game.resizeCrabNode(currentCrabNode)
        }
        
        const id = game.parseCrabId(crabNodeElement.id)
        const isSmall = crabNodeElement.classList.contains('sm')
        const size = isSmall ? ['sm', 'lg'] : ['lg', 'sm']
        
        crabNodeElement.classList.replace(size[0], size[1])

        CONFIG.crabNodeClassNames.forEach(name => {
            crabNodeElement.getElementsByClassName(name)[0]
                .classList.replace(size[0], size[1])
        })
    },

    moltCrab: crabNode => {
        
        if (crabNode.shellSupply > 0) {
            crabNode.crab.size += 1
            crabNode.shellSupply -= 1
        }
        else {
            crabNode.crab.alive = false
        }
    }

}
